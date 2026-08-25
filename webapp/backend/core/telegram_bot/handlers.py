import logging
from urllib.parse import urlparse

from aiogram import Bot, F, Router
from aiogram.filters import Command, CommandObject, CommandStart
from aiogram.types import (
    CallbackQuery,
    FSInputFile,
    InlineKeyboardButton,
    InlineKeyboardMarkup,
    Message,
)
from asgiref.sync import sync_to_async

from core.models import SiteProfile
from leads.models import Lead, TelegramSubscriber

from .blog_sync import sync_channel_post

logger = logging.getLogger(__name__)
router = Router()


# --- sync Django ORM helpers, wrapped for the async bot ---------------------

@sync_to_async
def _load_profile():
    return SiteProfile.load()


@sync_to_async
def _save_subscriber(chat_id, username, first_name, source):
    TelegramSubscriber.objects.update_or_create(
        chat_id=chat_id,
        defaults={
            "username": username or "",
            "first_name": first_name or "",
            "source": source,
            "is_active": True,
        },
    )


@sync_to_async
def _try_claim_admin(secret, chat_id, username, first_name):
    profile = SiteProfile.load()
    if not secret or secret != profile.admin_claim_secret:
        return False
    # Secret is intentionally reusable — Albina can hand it to assistants to
    # make them admins too, so this can grant admin to more than one person.
    TelegramSubscriber.objects.update_or_create(
        chat_id=chat_id,
        defaults={
            "username": username or "",
            "first_name": first_name or "",
            "is_admin": True,
            "is_active": True,
        },
    )
    return True


@sync_to_async
def _is_admin(chat_id):
    return TelegramSubscriber.objects.filter(chat_id=chat_id, is_admin=True).exists()


@sync_to_async
def _recent_leads(limit=5):
    return list(Lead.objects.select_related("service").order_by("-created_at")[:limit])


# --- helpers ------------------------------------------------------------

def _channel_username(profile):
    if not profile.telegram_channel_url:
        return None
    return urlparse(profile.telegram_channel_url).path.strip("/").lower() or None


def _welcome_keyboard(profile):
    buttons = [[InlineKeyboardButton(text="📄 Получить гайд", callback_data="get_guide")]]
    if profile.telegram_channel_url:
        buttons.append([InlineKeyboardButton(text="📢 Канал Альбины", url=profile.telegram_channel_url)])
    return InlineKeyboardMarkup(inline_keyboard=buttons)


async def _send_lead_magnet(bot: Bot, chat_id: int, profile):
    if profile.lead_magnet_file:
        await bot.send_document(
            chat_id,
            FSInputFile(profile.lead_magnet_file.path),
            caption=f"{profile.lead_magnet_heading}\n\n{profile.lead_magnet_text}",
        )
    else:
        await bot.send_message(chat_id, "Гайд скоро будет готов — загляни чуть позже 🙂")


async def _download_largest_photo(message: Message):
    photo = message.photo[-1]
    file = await message.bot.get_file(photo.file_id)
    buf = await message.bot.download_file(file.file_path)
    return buf.read()


# --- regular-user flow: lead magnet + channel redirect -------------------

@router.message(CommandStart())
async def start_handler(message: Message, command: CommandObject, bot: Bot):
    profile = await _load_profile()
    payload = (command.args or "").strip()
    await _save_subscriber(
        message.chat.id, message.from_user.username, message.from_user.first_name, payload or "start"
    )

    if payload and payload == profile.lead_magnet_deep_link_param:
        await _send_lead_magnet(bot, message.chat.id, profile)
        return

    await message.answer(
        "Привет! Я бот Альбины — она подбирает образы, а не разбирает гардероб "
        "целиком. Здесь можно забрать бесплатный гайд или заглянуть в канал.",
        reply_markup=_welcome_keyboard(profile),
    )


@router.callback_query(F.data == "get_guide")
async def get_guide_callback(callback: CallbackQuery, bot: Bot):
    profile = await _load_profile()
    await _send_lead_magnet(bot, callback.message.chat.id, profile)
    await callback.answer()


# --- admin bootstrap + admin mode ----------------------------------------

@router.message(Command("claim_admin"))
async def claim_admin(message: Message, command: CommandObject):
    ok = await _try_claim_admin(
        (command.args or "").strip(), message.chat.id, message.from_user.username, message.from_user.first_name
    )
    if ok:
        await message.answer("Готово — теперь заявки с сайта будут приходить сюда. Команда /leads покажет последние заявки.")
    else:
        await message.answer("Неверный секрет.")


@router.message(Command("leads"))
async def list_leads(message: Message):
    if not await _is_admin(message.chat.id):
        return

    leads = await _recent_leads()
    if not leads:
        await message.answer("Заявок пока нет.")
        return

    lines = ["Последние заявки:\n"]
    for lead in leads:
        service = lead.service.title if lead.service else "без услуги"
        lines.append(f"• {lead.name} — {lead.phone} — {service} — {lead.get_status_display()}")
    await message.answer("\n".join(lines))


# --- channel monitoring: mirror posts into the blog -----------------------

async def _handle_channel_message(message: Message):
    profile = await _load_profile()
    expected = _channel_username(profile)
    actual = (message.chat.username or "").lower()
    if not expected or actual != expected:
        return

    photo_bytes = await _download_largest_photo(message) if message.photo else None
    await sync_to_async(sync_channel_post)(message, photo_bytes)


@router.channel_post()
async def on_channel_post(message: Message):
    await _handle_channel_message(message)


@router.edited_channel_post()
async def on_edited_channel_post(message: Message):
    await _handle_channel_message(message)
