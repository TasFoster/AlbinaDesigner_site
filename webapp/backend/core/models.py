import secrets

from django.db import models


class SiteProfile(models.Model):
    """Singleton: site-wide bio, contacts and lead-magnet copy editable from admin."""

    about_title = models.CharField(max_length=255)
    about_intro = models.TextField()
    about_paragraphs = models.JSONField(default=list, blank=True, help_text="Список абзацев (строки)")
    about_quote = models.TextField(blank=True)

    # Only Telegram is offered as a contact method on the site (client's decision).
    telegram_channel_url = models.URLField(blank=True, help_text="Публичный канал Альбины, например https://t.me/nadevai_24")
    telegram_bot_url = models.URLField(blank=True, help_text="Ссылка на бота, например https://t.me/AlbinaDesigner_bot")

    lead_magnet_label = models.CharField(max_length=255, default="Бесплатно, без обязательств")
    lead_magnet_heading = models.CharField(max_length=255)
    lead_magnet_text = models.TextField()
    lead_magnet_note = models.CharField(max_length=255, blank=True)
    lead_magnet_file = models.FileField(upload_to="lead-magnets/", blank=True, null=True)
    lead_magnet_deep_link_param = models.CharField(
        max_length=64, default="wardrobe_guide", help_text='Параметр /start в боте, например "wardrobe_guide"'
    )

    # Bot admin bootstrap: whoever DMs the bot "/claim_admin <secret>" first
    # becomes the owner and starts receiving lead notifications. Telegram bots
    # cannot message a user first, so this is how the bot learns her chat_id.
    owner_telegram_chat_id = models.BigIntegerField(null=True, blank=True)
    admin_claim_secret = models.CharField(max_length=64, default=secrets.token_urlsafe)

    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "профиль сайта"
        verbose_name_plural = "профиль сайта"

    def __str__(self):
        return "Профиль сайта"

    def save(self, *args, **kwargs):
        self.pk = 1
        super().save(*args, **kwargs)

    @classmethod
    def load(cls):
        obj, _ = cls.objects.get_or_create(pk=1)
        return obj
