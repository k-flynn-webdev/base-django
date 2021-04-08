from django.contrib import admin
from django.shortcuts import render
from django.urls import path, include
from django.conf.urls import url

from users import urls as userUrls


urlpatterns = [
    path('admin', admin.site.urls),
    path('config/', include('config.urls')),
    path('api/track', include('track.urls')),
    path('api/tag', include('tag.urls')),
#     path('rest-auth/', include('rest_auth.urls')),
    path('rest-auth/', include(userUrls)),
]
