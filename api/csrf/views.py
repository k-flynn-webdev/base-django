from django.views.decorators.http import require_GET, require_POST
from django.http import HttpResponse
from django.middleware.csrf import get_token

@require_GET
def get(request):
    response = HttpResponse(status=204)
    response['HTTP_X_CSRFTOKEN'] = get_token(request)
    return response
