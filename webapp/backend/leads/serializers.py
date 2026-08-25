from rest_framework import serializers

from .models import Lead


class LeadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lead
        fields = ["id", "name", "phone", "service", "message", "status", "source", "created_at"]
        read_only_fields = ["id", "status", "created_at"]
