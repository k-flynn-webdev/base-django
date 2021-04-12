from django.urls import path

from . import views

urlpatterns = [
    path('csrf', views.get, name='api-csrf'),
]
