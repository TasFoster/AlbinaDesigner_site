from rest_framework import serializers

from .models import SiteProfile


class SiteProfileSerializer(serializers.ModelSerializer):
    lead_magnet_url = serializers.SerializerMethodField()
    lead_magnet_bot_link = serializers.SerializerMethodField()

    class Meta:
        model = SiteProfile
        # Deliberately excludes admin_claim_secret / owner_telegram_chat_id —
        # this serializer backs a public, unauthenticated endpoint.
        fields = [
            "about_title",
            "about_intro",
            "about_paragraphs",
            "about_quote",
            "telegram_channel_url",
            "telegram_bot_url",
            "lead_magnet_label",
            "lead_magnet_heading",
            "lead_magnet_text",
            "lead_magnet_note",
            "lead_magnet_url",
            "lead_magnet_bot_link",
        ]

    def get_lead_magnet_url(self, obj):
        if not obj.lead_magnet_file:
            return None
        request = self.context.get("request")
        url = obj.lead_magnet_file.url
        return request.build_absolute_uri(url) if request else url

    def get_lead_magnet_bot_link(self, obj):
        if not obj.telegram_bot_url or not obj.lead_magnet_deep_link_param:
            return obj.telegram_bot_url or None
        return f"{obj.telegram_bot_url}?start={obj.lead_magnet_deep_link_param}"
