"""
WSGI config for wedlock_app project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/2.2/howto/deployment/wsgi/
"""
# Reference: https://buildmedia.readthedocs.org/media/pdf/django-tastypie/latest/django-tastypie.pdf
# Primary deployment platform
# It overrides the environment by specifying the ‘wedlock_app.settings’.

import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'wedlock_app.settings')

application = get_wsgi_application()
