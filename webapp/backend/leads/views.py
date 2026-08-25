from rest_framework import mixins, permissions, viewsets

from .models import Lead
from .serializers import LeadSerializer


class LeadViewSet(mixins.CreateModelMixin, mixins.ListModelMixin, mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    """Anyone can submit a booking request; only staff can list/view them."""

    queryset = Lead.objects.all()
    serializer_class = LeadSerializer

    def get_permissions(self):
        if self.action == "create":
            return [permissions.AllowAny()]
        return [permissions.IsAdminUser()]
