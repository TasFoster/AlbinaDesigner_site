from rest_framework import serializers

from .models import SiteProfile


class SiteProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteProfile
        fields = [
            "about_title",
            "about_intro",
            "about_paragraphs",
            "about_quote",
            "phone",
            "telegram_url",
            "instagram_url",
            "lead_magnet_label",
            "lead_magnet_heading",
            "lead_magnet_text",
            "lead_magnet_note",
        ]
