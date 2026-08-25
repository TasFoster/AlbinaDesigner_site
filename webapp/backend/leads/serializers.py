from rest_framework import serializers

from services.models import Service

from .models import Lead


class LeadSerializer(serializers.ModelSerializer):
    # Public API identifies services by slug, not internal PK.
    service = serializers.SlugRelatedField(
        slug_field="slug", queryset=Service.objects.filter(is_active=True), required=False, allow_null=True
    )

    class Meta:
        model = Lead
        fields = ["id", "name", "phone", "service", "message", "status", "source", "created_at"]
        read_only_fields = ["id", "status", "created_at"]
