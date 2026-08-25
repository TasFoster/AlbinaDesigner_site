from django.db.models.signals import post_save
from django.dispatch import receiver

from .models import Lead, TelegramSubscriber
from .telegram_notify import send_admin_message


@receiver(post_save, sender=Lead)
def notify_admin_of_new_lead(sender, instance, created, **kwargs):
    if not created:
        return

    admin_chat_ids = TelegramSubscriber.objects.filter(is_admin=True, is_active=True).values_list(
        "chat_id", flat=True
    )
    if not admin_chat_ids:
        return

    service = instance.service.title if instance.service else "без указания услуги"
    text = (
        "🔔 Новая заявка с сайта\n\n"
        f"Имя: {instance.name}\n"
        f"Телефон: {instance.phone}\n"
        f"Услуга: {service}\n"
    )
    if instance.message:
        text += f"Сообщение: {instance.message}\n"

    for chat_id in admin_chat_ids:
        send_admin_message(chat_id, text)
