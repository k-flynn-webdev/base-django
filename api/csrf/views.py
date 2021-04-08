from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from django.views.decorators.http import require_GET, require_POST
from django.views.decorators.csrf import ensure_csrf_cookie
from django.contrib.auth import authenticate, login, logout
from rest_framework.permissions import IsAuthenticated
from django.utils.decorators import method_decorator
from django.http import JsonResponse, HttpResponse
from django.middleware.csrf import get_token
from rest_framework.views import APIView
from django.views.generic import View

@require_GET
def get_csrf(request):
    response = HttpResponse(status=204)
    response['HTTP_X_CSRFTOKEN'] = get_token(request)
    print(response['HTTP_X_CSRFTOKEN'])
    return response
