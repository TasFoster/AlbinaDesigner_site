from django.db import models

from services.models import Service


class Lead(models.Model):
    class Status(models.TextChoices):
        NEW = "new", "Новая"
        IN_PROGRESS = "in_progress", "В работе"
        CONFIRMED = "confirmed", "Подтверждена"
        COMPLETED = "completed", "Завершена"
        CANCELLED = "cancelled", "Отменена"

    name = models.CharField(max_length=255)
    phone = models.CharField(max_length=32)
    service = models.ForeignKey(Service, on_delete=models.SET_NULL, null=True, blank=True, related_name="leads")
    message = models.TextField(blank=True)
    status = models.CharField(max_length=16, choices=Status.choices, default=Status.NEW)
    source = models.CharField(max_length=64, default="website", help_text='Например: "website", "telegram"')
    internal_note = models.TextField(blank=True, help_text="Заметка для Альбины, клиенту не видна")

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]
        verbose_name = "заявка"
        verbose_name_plural = "заявки"

    def __str__(self):
        return f"{self.name} — {self.service or 'без услуги'}"


class TelegramSubscriber(models.Model):
    """Кто подписался на лид-магнит (PDF-гайд) через Telegram-бота."""

    chat_id = models.BigIntegerField(unique=True)
    username = models.CharField(max_length=255, blank=True)
    first_name = models.CharField(max_length=255, blank=True)
    source = models.CharField(
        max_length=64, default="wardrobe_guide", help_text="Deep-link параметр /start, за что подписался"
    )
    is_active = models.BooleanField(default=True)
    subscribed_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-subscribed_at"]
        verbose_name = "подписчик Telegram"
        verbose_name_plural = "подписчики Telegram"

    def __str__(self):
        return self.username or str(self.chat_id)
