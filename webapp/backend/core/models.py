from django.db import models


class SiteProfile(models.Model):
    """Singleton: site-wide bio, contacts and lead-magnet copy editable from admin."""

    about_title = models.CharField(max_length=255)
    about_intro = models.TextField()
    about_paragraphs = models.JSONField(default=list, blank=True, help_text="Список абзацев (строки)")
    about_quote = models.TextField(blank=True)

    phone = models.CharField(max_length=32, blank=True)
    telegram_url = models.URLField(blank=True)
    instagram_url = models.URLField(blank=True)

    lead_magnet_label = models.CharField(max_length=255, default="Бесплатно, без обязательств")
    lead_magnet_heading = models.CharField(max_length=255)
    lead_magnet_text = models.TextField()
    lead_magnet_note = models.CharField(max_length=255, blank=True)

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
