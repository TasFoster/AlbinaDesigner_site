import logging
import re

from django.core.files.base import ContentFile
from django.utils import timezone

from blog.models import BlogPost

logger = logging.getLogger(__name__)

_TRANSLIT = {
    "а": "a", "б": "b", "в": "v", "г": "g", "д": "d", "е": "e", "ё": "e",
    "ж": "zh", "з": "z", "и": "i", "й": "y", "к": "k", "л": "l", "м": "m",
    "н": "n", "о": "o", "п": "p", "р": "r", "с": "s", "т": "t", "у": "u",
    "ф": "f", "х": "h", "ц": "ts", "ч": "ch", "ш": "sh", "щ": "sch", "ъ": "",
    "ы": "y", "ь": "", "э": "e", "ю": "yu", "я": "ya",
}


def transliterate_slug(text, max_length=60):
    lowered = text.lower()
    transliterated = "".join(_TRANSLIT.get(ch, ch) for ch in lowered)
    slug = re.sub(r"[^a-z0-9]+", "-", transliterated).strip("-")
    return slug[:max_length].strip("-") or "post"


def _split_title_excerpt(text):
    lines = [line.strip() for line in text.strip().splitlines() if line.strip()]
    if not lines:
        return "Без названия", ""
    title = lines[0]
    if len(title) > 90:
        title = title[:87].rstrip() + "…"
    rest = " ".join(lines[1:]) if len(lines) > 1 else text.strip()
    excerpt = rest[:220].rstrip()
    if len(rest) > 220:
        excerpt = excerpt.rsplit(" ", 1)[0] + "…"
    return title, excerpt or title


def sync_channel_post(message, photo_bytes=None):
    """Create or update a BlogPost from an aiogram Message (channel_post or
    edited_channel_post). Returns the BlogPost, or None if there was nothing
    worth saving (no text at all)."""

    text = message.text or message.caption or ""
    if not text.strip():
        logger.info("Skipping channel post %s: no text/caption", message.message_id)
        return None

    title, excerpt = _split_title_excerpt(text)
    word_count = len(text.split())
    read_minutes = max(1, round(word_count / 200))

    existing = BlogPost.objects.filter(telegram_message_id=message.message_id).first()

    defaults = {
        "title": title,
        "excerpt": excerpt,
        "body": text.strip(),
        "tag": "Канал",
        "read_minutes": read_minutes,
        "status": BlogPost.Status.PUBLISHED,
        "published_at": message.date or timezone.now(),
    }

    if existing:
        for field, value in defaults.items():
            setattr(existing, field, value)
        post = existing
    else:
        slug_base = transliterate_slug(title)
        slug = f"{slug_base}-{message.message_id}"
        post = BlogPost(slug=slug, telegram_message_id=message.message_id, **defaults)

    if photo_bytes:
        post.cover_image.save(f"tg-{message.message_id}.jpg", ContentFile(photo_bytes), save=False)

    post.save()
    logger.info("Synced channel post %s -> BlogPost %s (%s)", message.message_id, post.pk, post.slug)
    return post
