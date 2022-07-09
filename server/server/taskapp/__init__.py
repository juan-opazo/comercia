from .celery import app as celery_app
from configurations import importer
importer.install()

__all__ = ['celery_app']
