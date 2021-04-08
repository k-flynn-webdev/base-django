import json

from django.contrib.auth import authenticate, login, logout, get_user_model
# from django.http import JsonResponse
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
# from rest_framework.decorators import api_view
from rest_framework.response import Response


User = get_user_model()
from users.serializers import UserSerializer


# @api_view(['POST'])
def register_view(request):
#     serializer = UserSerializer(data=request.data)
#     if serializer.is_valid():
#         serializer.save()
#         return Response(serializer.data, status=status.HTTP_201_CREATED)
#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#     serializer = UserSerializer(data=request.data)
#     print (serializer)
    data = json.loads(request.POST)
    email = data.get('email')
    password = data.get('password')
#     if serializer.is_valid():
#         print (serializer.data)
#     if email is None or password is None:
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.create_user(email=email, password=password)
    user.save()
    serializer = UserSerializer(user)
# #     user = authenticate(email=email, password=password)
#
    if user is None:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    login(request, user)
    return Response(serializer.data, status=status.HTTP_201_CREATED)
