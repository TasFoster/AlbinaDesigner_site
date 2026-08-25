from rest_framework.routers import DefaultRouter

from .views import ReviewViewSet, ServiceViewSet

router = DefaultRouter()
router.register("services", ServiceViewSet, basename="service")
router.register("reviews", ReviewViewSet, basename="review")

urlpatterns = router.urls
