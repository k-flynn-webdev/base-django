"""config URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
# from dj_rest_auth.views import LoginView
from django.contrib import admin
from django.urls import path, include, re_path
# from dj_rest_auth.registration.views import VerifyEmailView, ConfirmEmailView
#
# urlpatterns = [
#     path('admin/', admin.site.urls),
#     # Replaced with `dj_rest_auth`
#     # path('accounts/', include('allauth.urls')),
#     # DJ Rest Auth
#     path('dj-rest-auth/', include('dj_rest_auth.urls')),
#     path('dj-rest-auth/registration/account-confirm-email/<str:key>/', ConfirmEmailView.as_view()),  # Needs to be defined before the registration path
#     path('dj-rest-auth/registration/', include('dj_rest_auth.registration.urls')),
#     path('dj-rest-auth/account-confirm-email/', VerifyEmailView.as_view(), name='account_email_verification_sent'),
# ]

from dj_rest_auth.registration.views import VerifyEmailView, RegisterView


urlpatterns = [
    path('admin/', admin.site.urls),
    path('accounts/', include('allauth.urls')),

    # path('', include('dj_rest_auth.urls')),
    # path('login/', LoginView.as_view(), name='account_login'),
    # path('registration/', include('dj_rest_auth.registration.urls')),
    # path('registration/', RegisterView.as_view(), name='account_signup'),
    # re_path(r'^account-confirm-email/', VerifyEmailView.as_view(), name='account_email_verification_sent'),
    # re_path(r'^account-confirm-email/(?P<key>[-:\w]+)/$', VerifyEmailView.as_view(), name='account_confirm_email'),
]
