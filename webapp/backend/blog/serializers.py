from rest_framework import serializers

from .models import BlogPost


class BlogPostListSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogPost
        fields = ["slug", "tag", "title", "excerpt", "cover_image", "read_minutes", "published_at"]


class BlogPostDetailSerializer(BlogPostListSerializer):
    class Meta(BlogPostListSerializer.Meta):
        fields = BlogPostListSerializer.Meta.fields + ["body"]
