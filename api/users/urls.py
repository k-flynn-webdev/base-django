# from allauth.account.views import confirm_email
from django.conf.urls import url
from django.contrib import admin
from django.urls import path, include

from . import views


urlpatterns = [
    path('register', views.register_view, name='user-register'),
    path('login', views.login_view, name='api-login'),
    path('logout', views.logout_view, name='api-logout'),
    path('session', views.SessionView.as_view(), name='api-session'),
    path('whoami', views.WhoAmIView.as_view(), name='api-whoami'),
]