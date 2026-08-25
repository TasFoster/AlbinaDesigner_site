import json
import logging
from urllib import request as urlrequest
from urllib.error import URLError

from django.conf import settings

logger = logging.getLogger(__name__)


def send_admin_message(chat_id, text):
    """Direct HTTPS call to the Telegram Bot API — no need for the bot
    process to be running, sendMessage works from any process that has
    the token."""
    token = settings.TELEGRAM_BOT_TOKEN
    if not token or not chat_id:
        return False

    url = f"https://api.telegram.org/bot{token}/sendMessage"
    payload = json.dumps({"chat_id": chat_id, "text": text}).encode("utf-8")
    req = urlrequest.Request(url, data=payload, headers={"Content-Type": "application/json"})

    try:
        with urlrequest.urlopen(req, timeout=5) as resp:
            return resp.status == 200
    except URLError:
        logger.exception("Failed to notify Telegram admin about a new lead")
        return False
