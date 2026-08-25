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
            "Бот: секрет для назначения админов",
            {
                "fields": ("admin_claim_secret",),
                "description": (
                    "Любой, кто напишет боту «/claim_admin &lt;секрет&gt;» (секрет ниже), станет "
                    "админом — будет получать уведомления о заявках и сможет смотреть /leads в боте. "
                    "Секрет можно давать нескольким людям (Альбине, помощникам). Список текущих "
                    "админов — в разделе Leads → Подписчики Telegram (галочка «is admin»)."
                ),
            },
        ),
    )

    def has_add_permission(self, request):
        return not SiteProfile.objects.exists()

    def has_delete_permission(self, request, obj=None):
        return False

    def changelist_view(self, request, extra_context=None):
        profile = SiteProfile.load()
        return redirect("admin:core_siteprofile_change", profile.pk)
