import os
from pathlib import Path
from dotenv import load_dotenv

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent
PARENT_DIR = Path(__file__).resolve().parent.parent.parent

"""
Expose Vars for templates here
"""
def export_vars(request):
    load_dotenv(os.path.join(PARENT_DIR, '.env'))
    data = {}
    data['NAME'] = os.getenv("WEB_NAME")
    data['APP_NAME'] = os.getenv("APP_NAME")
    data['APP_AUTHOR'] = os.getenv("APP_AUTHOR")
    data['APP_DESCRIPTION'] = os.getenv("APP_DESCRIPTION")
    data['SETTING_TYPE'] = os.environ['DJANGO_SETTINGS_MODULE']
    return data