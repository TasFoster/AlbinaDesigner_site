from rest_framework import serializers

from .models import Review, Service


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ["id", "author", "quote", "service"]


class ServiceSerializer(serializers.ModelSerializer):
    reviews = serializers.SerializerMethodField()

    class Meta:
        model = Service
        fields = [
            "slug",
            "title",
            "price_display",
            "short_desc",
            "long_desc",
            "features",
            "cta_label",
            "duration",
            "examples_label",
            "steps",
            "for_whom",
            "what_you_get",
            "cta_dark_label",
            "cta_dark_heading",
            "cta_dark_text",
            "reviews",
        ]

    def get_reviews(self, obj):
        return ReviewSerializer(obj.reviews.filter(is_published=True), many=True).data
