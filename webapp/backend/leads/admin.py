from django.contrib import admin

from .models import Lead, TelegramSubscriber


@admin.register(Lead)
class LeadAdmin(admin.ModelAdmin):
    list_display = ("name", "service", "phone", "status", "source", "created_at")
    list_editable = ("status",)
    list_filter = ("status", "service", "source")
    search_fields = ("name", "phone")


@admin.register(TelegramSubscriber)
class TelegramSubscriberAdmin(admin.ModelAdmin):
    list_display = ("username", "first_name", "chat_id", "source", "is_active", "subscribed_at")
    list_filter = ("source", "is_active")
    search_fields = ("username", "first_name", "chat_id")
