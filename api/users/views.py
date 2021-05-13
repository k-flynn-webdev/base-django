from django.http import HttpResponse
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response

from .serializers import CustomUserSerializer
from .models import CustomUser


class WhoAmIView(APIView):
    # authentication_classes = [SessionAuthentication, BasicAuthentication]
    # permission_classes = [IsAuthenticated]
    permission_classes = []

    def get(self, request, format=None):
        try:
            request.user.meta
        except:
            return Response({
                'detail': 'No user logged in.',
                'data': {}
            })

        serializer = CustomUserSerializer(request.user)
        return Response({
            'detail': 'success',
            'data': serializer.data
        })

