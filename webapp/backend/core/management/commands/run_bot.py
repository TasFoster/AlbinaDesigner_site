import asyncio
import logging

from aiogram import Bot, Dispatcher
from aiogram.client.default import DefaultBotProperties
from aiogram.enums import ParseMode
from django.conf import settings
from django.core.management.base import BaseCommand, CommandError

from core.telegram_bot.handlers import router

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class Command(BaseCommand):
    help = "Запускает Telegram-бота (long polling). Тот же venv/БД, что у Django."

    def handle(self, *args, **options):
        if not settings.TELEGRAM_BOT_TOKEN:
            raise CommandError("TELEGRAM_BOT_TOKEN не задан в .env")

        asyncio.run(self._run())

    async def _run(self):
        bot = Bot(
            token=settings.TELEGRAM_BOT_TOKEN,
            default=DefaultBotProperties(parse_mode=ParseMode.HTML),
        )
        dp = Dispatcher()
        dp.include_router(router)

        me = await bot.get_me()
        logger.info("Бот запущен: @%s", me.username)

        await dp.start_polling(bot, allowed_updates=["message", "callback_query", "channel_post", "edited_channel_post"])
