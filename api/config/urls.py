from django.contrib import admin
from django.urls import path, include

from users import urls as userUrls


urlpatterns = [
    path('admin', admin.site.urls),
    # path('config/', include('config.urls')),??
    path('rest-auth/', include(userUrls)),
]
