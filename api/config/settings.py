"""
Django settings for config project.

Generated by 'django-admin startproject' using Django 3.1.4.

For more information on this file, see
https://docs.djangoproject.com/en/3.1/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/3.1/ref/settings/
"""

import os
from pathlib import Path
from dotenv import load_dotenv


# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent
PARENT_DIR = Path(__file__).resolve().parent.parent.parent


# MODE
DEBUG = os.getenv("APP_MODE") == 'DEBUG'

# ENVS
load_dotenv(os.path.join(PARENT_DIR, '.env'))

# APP
APPEND_SLASH = False
ROOT_URLCONF = 'config.urls'
WSGI_APPLICATION = 'config.wsgi.application'
ALLOWED_HOSTS = ['localhost', '127.0.0.1']


# SECURITY
SITE_ID = 1
SECRET_KEY = os.getenv("APP_SECRET")
CSRF_HEADER_NAME = 'HTTP_X_CSRFTOKEN'
CSRF_COOKIE_HTTPONLY = False        # todo: this breaks the vue spa in develop when true
CSRF_COOKIE_SAMESITE = 'Strict'
SESSION_COOKIE_AGE = 1209600
SESSION_COOKIE_HTTPONLY = True
SESSION_COOKIE_SAMESITE = 'Strict'

# PRODUCTION
if os.getenv("APP_MODE") == 'PRODUCTION':
    CSRF_COOKIE_SECURE = True           # requires https
    SESSION_COOKIE_SECURE = True        # requires https


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.1/howto/deployment/checklist/


# USER
AUTH_USER_MODEL = 'user.CustomUser'
# ALLAUTH
ACCOUNT_SESSION_REMEMBER = None  # User must allow "remember" cookie on login!
ACCOUNT_AUTHENTICATION_METHOD = 'email'
ACCOUNT_EMAIL_REQUIRED = True
ACCOUNT_USERNAME_REQUIRED = False
ACCOUNT_CONFIRM_EMAIL_ON_GET = True
ACCOUNT_SIGNUP_PASSWORD_ENTER_TWICE = False
ACCOUNT_SIGNUP_PASSWORD_VERIFICATION = False

LOGIN_URL = os.getenv("WEB_ADDRESS_LOGIN")
LOGIN_REDIRECT_URL = os.getenv("WEB_ADDRESS")
ACCOUNT_LOGOUT_ON_GET = False


# Application definition
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.sites',
    'django.contrib.staticfiles',

    # 'django.contrib.auth.backends.ModelBackend',

    # MAIL
    'anymail',

    # REST API
    'rest_framework',
    'rest_framework.authtoken',

    # ACCOUNT APIS
    'allauth',
    'allauth.account',
    'allauth.socialaccount',
    # 'dj_rest_auth',
    # 'dj_rest_auth.registration',

    # CUSTOM
    'csrf',
    'user',
]


MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# ALLOW STATIC SERVE !DEBUG ONLY!
if os.getenv("APP_MODE") == 'DEBUG':
    MIDDLEWARE.insert(1, 'whitenoise.middleware.WhiteNoiseMiddleware')
    # STATICFILES_STORAGE = "whitenoise.storage.CompressedManifestStaticFilesStorage"

    # Add app before django.contrib.staticfiles to enable Whitenoise in development
    # insert_point = -1
    # for i, app in enumerate(INSTALLED_APPS):
    #     if app == 'django.contrib.staticfiles':
    #         insert_point = i
    # INSTALLED_APPS.insert(insert_point, 'whitenoise.runserver_nostatic')


TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [
            os.path.join(BASE_DIR, 'templates'),
            os.path.join(BASE_DIR, 'user', 'templates'),
        ],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',

                # ADD ENV VARS
                'user.context_processors.template_vars',
            ],
        },
    },
]

# MAIL
ANYMAIL = {
    # (exact settings here depend on your ESP...)
    "MAILGUN_API_KEY": os.getenv("MAIL_API"),
    "MAILGUN_API_URL": os.getenv("MAIL_HOST"),
    "MAILGUN_SENDER_DOMAIN": os.getenv("MAIL_DOMAIN"),
}
SERVER_EMAIL = os.getenv("MAIL_FROM")  # ditto (default from-email for Django errors)
DEFAULT_FROM_EMAIL = os.getenv("MAIL_FROM")  # if you don't already have this in settings
EMAIL_BACKEND = "anymail.backends.mailgun.EmailBackend"  # or sendgrid.EmailBackend, or...
EMAIL_USE_TLS = True
EMAIL_PORT = 587


# AUTH
AUTHENTICATION_BACKENDS = [
    # Needed to login by username in Django admin, regardless of `allauth`
    'django.contrib.auth.backends.ModelBackend',
    # `allauth` specific authentication methods, such as login by e-mail
    'allauth.account.auth_backends.AuthenticationBackend',
]


# REST
REST_FRAMEWORK = {
    'DEFAULT_RENDERER_CLASSES': [
        'rest_framework.renderers.JSONRenderer',
    ],
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.SessionAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': 'rest_framework.permissions.IsAuthenticated',
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.LimitOffsetPagination',
    'PAGE_SIZE': 30,
}

# ALLOW BROWSABLE API !DEBUG ONLY!
if os.getenv("APP_MODE") == 'DEBUG':
    REST_FRAMEWORK['DEFAULT_RENDERER_CLASSES'] += 'rest_framework.renderers.BrowsableAPIRenderer',

REST_AUTH_SERIALIZERS = {
    'USER_DETAILS_SERIALIZER': 'user.serializers.UserSerializer',
}


# Database
# https://docs.djangoproject.com/en/3.1/ref/settings/#databases
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}


# Password validation
# https://docs.djangoproject.com/en/3.1/ref/settings/#auth-password-validators
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
    # {
    #     'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    # },
]


# Internationalization
# https://docs.djangoproject.com/en/3.1/topics/i18n/
LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.1/howto/static-files/

# ASSETS
STATIC_URL = '/static/'
MEDIA_URL = '/media/'
STATIC_ROOT = os.path.join(PARENT_DIR, 'static')

# Vue project location
APP_DIR = os.path.join(PARENT_DIR, 'app')

# Vue assets directory (assetsDir)
STATICFILES_DIRS = [
    os.path.join(APP_DIR, 'dist/static'),
]

# todo this might be broken ;O
# Webpack output location containing Vue index.html file (outputDir)
# TEMPLATES[0]['DIRS'] += [
#     os.path.join(APP_DIR, 'dist'),
# ]


