from django.contrib import admin
from django.shortcuts import redirect

from .models import SiteProfile


@admin.register(SiteProfile)
class SiteProfileAdmin(admin.ModelAdmin):
    fieldsets = (
        ("О себе", {"fields": ("about_title", "about_intro", "about_paragraphs", "about_quote")}),
        ("Контакты (только Telegram)", {"fields": ("telegram_channel_url", "telegram_bot_url")}),
        (
            "Лид-магнит (PDF-гайд)",
            {
                "fields": (
                    "lead_magnet_label",
                    "lead_magnet_heading",
                    "lead_magnet_text",
                    "lead_magnet_note",
                    "lead_magnet_file",
                    "lead_magnet_deep_link_param",
                )
            },
        ),
        (
            "Бот: админ-доступ",
            {
                "fields": ("admin_claim_secret", "owner_telegram_chat_id"),
                "description": (
                    "Чтобы бот присылал уведомления о заявках Альбине — она один раз пишет боту "
                    "«/claim_admin &lt;секрет&gt;» (секрет ниже). После этого chat_id заполнится "
                    "автоматически."
                ),
            },
        ),
    )
    readonly_fields = ("owner_telegram_chat_id",)

    def has_add_permission(self, request):
        return not SiteProfile.objects.exists()

    def has_delete_permission(self, request, obj=None):
        return False

    def changelist_view(self, request, extra_context=None):
        profile = SiteProfile.load()
        return redirect("admin:core_siteprofile_change", profile.pk)
