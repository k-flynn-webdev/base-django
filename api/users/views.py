from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from django.contrib.auth import authenticate, login, logout, get_user_model
from django.contrib.auth.password_validation import validate_password
from rest_framework.permissions import IsAuthenticated
from django.core.validators import validate_email
from django.core.exceptions import ValidationError
from django.views.decorators.http import require_POST
from django.http import JsonResponse
from rest_framework.views import APIView
import json


from users.serializers import UserSerializer
User = get_user_model()


@require_POST
def register_view(request):
    data = json.loads(request.body)
    email = data.get('email')
    password = data.get('password')

    if email is None or password is None:
        return JsonResponse({'detail': 'Please provide email and password.'}, status=400)

    userEmailFound = User.objects.filter(email=email)
    if userEmailFound.count() > 0:
        return JsonResponse({'detail': 'Email is invalid'}, status=400)

    try:
        validate_email(email)
    except ValidationError as error:
        return JsonResponse({'detail': error.messages}, status=400)

    try:
        validate_password(password)
    except ValidationError as error:
        return JsonResponse({'detail': error.messages}, status=400)

    user = User.objects.create_user(email=email, password=password)
    user.save()

    if user is None:
        return JsonResponse({'detail': 'Invalid credentials.'}, status=400)

    login(request, user)
    userDetails = UserSerializer(user)

    return JsonResponse({
        'detail': 'Successfully logged in.',
        'results': userDetails.data
    })


@require_POST
def login_view(request):
    data = json.loads(request.body)
    email = data.get('email')
    password = data.get('password')

    if email is None or password is None:
        return JsonResponse({'detail': 'Please provide email and password.'}, status=400)

    user = authenticate(email=email, password=password)

    if user is None:
        return JsonResponse({'detail': 'Invalid credentials.'}, status=400)

    login(request, user)
    userDetails = UserSerializer(user)
    return JsonResponse({
        'detail': 'Successfully logged in.',
        'results': userDetails.data
    })


def logout_view(request):
    if not request.user.is_authenticated:
        return JsonResponse({'detail': 'You\'re not logged in.'}, status=400)

    logout(request)
    return JsonResponse({'detail': 'Successfully logged out.'})


class SessionView(APIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]

    @staticmethod
    def get(request, format=None):
        return JsonResponse({'isAuthenticated': True})


class WhoAmIView(APIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        print(request.user)
        userDetails = UserSerializer(request.user)
        return JsonResponse({
            'detail': 'Successfully found.',
            'results': userDetails.data
        })
