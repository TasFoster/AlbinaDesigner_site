from rest_framework import viewsets

from .models import Review, Service
from .serializers import ReviewSerializer, ServiceSerializer


class ServiceViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Service.objects.filter(is_active=True)
    serializer_class = ServiceSerializer
    lookup_field = "slug"


class ReviewViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Review.objects.filter(is_published=True)
    serializer_class = ReviewSerializer
