from django.test import RequestFactory, TestCase
from django.utils.http import base36_to_int, int_to_base36
import requests
import json
from .views import get_csrf

# Create your tests here.
class BasicTests(TestCase):
    print('started')
    # def setUp(self):
    #     self.factory = RequestFactory()

    # def test_int_to_base36(self):
    #     n = 55798679658823689999
    #     b36 = "brxk553wvxbf3"
    #     assert int_to_base36(n) == b36
    #     assert base36_to_int(b36) == n

    # def test_get_csrf_on_request(self):
        # Generate a fictitious GET request
        # request = self.factory.get()
        # response = get_csrf(request)
        # print(response)


        # Simulate a CSRF failure by calling the View directly
        # This template is using the `provider_login_url` templatetag
        # response = csrf.csrf_failure(request, template_name="tests/test_403_csrf.html")
        # Ensure that CSRF failures with this template
        # tag succeed with the expected 403 response
        # self.assertEqual(response.status_code, 403)
