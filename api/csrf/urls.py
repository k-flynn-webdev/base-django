from django.urls import path

from . import views

urlpatterns = [
    path('csrf', views.get_csrf, name='api-csrf'),
]
