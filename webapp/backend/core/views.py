from django.db import connection
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import SiteProfile
from .serializers import SiteProfileSerializer


@api_view(['GET'])
def health(request):
    with connection.cursor() as cursor:
        cursor.execute('SELECT 1')
        cursor.fetchone()

    return Response({
        'status': 'ok',
        'database': connection.vendor,
    })


@api_view(['GET'])
def profile(request):
    return Response(SiteProfileSerializer(SiteProfile.load(), context={'request': request}).data)
