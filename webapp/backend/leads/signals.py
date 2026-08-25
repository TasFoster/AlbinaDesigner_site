from django.db.models.signals import post_save
from django.dispatch import receiver

from core.models import SiteProfile

from .models import Lead
from .telegram_notify import send_admin_message


@receiver(post_save, sender=Lead)
def notify_admin_of_new_lead(sender, instance, created, **kwargs):
    if not created:
        return

    profile = SiteProfile.load()
    if not profile.owner_telegram_chat_id:
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

    send_admin_message(profile.owner_telegram_chat_id, text)
