from rest_framework import viewsets

from .models import BlogPost
from .serializers import BlogPostDetailSerializer, BlogPostListSerializer


class BlogPostViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = BlogPost.objects.filter(status=BlogPost.Status.PUBLISHED)
    lookup_field = "slug"

    def get_serializer_class(self):
        if self.action == "retrieve":
            return BlogPostDetailSerializer
        return BlogPostListSerializer
