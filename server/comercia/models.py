from django.db import models
from pygments.lexers import get_all_lexers
from pygments.styles import get_all_styles
from django.contrib.auth.models import User, Group

LEXERS = [item for item in get_all_lexers() if item[1]]
LANGUAGE_CHOICES = sorted([(item[1][0], item[0]) for item in LEXERS])
STYLE_CHOICES = sorted([(item, item) for item in get_all_styles()])


class Product(models.Model):
    name = models.CharField(max_length=100, blank=False)
    price = models.FloatField()
    brand = models.CharField(max_length=100, blank=True, default='')
    store = models.CharField(max_length=100, blank=True, default='')
    description = models.TextField(default='')
    rating = models.IntegerField(default=0)
    location = models.CharField(max_length=300, blank=True, default='')
    image = models.CharField(max_length=300, blank=True, default='')
    date = models.DateTimeField(auto_now_add=True)
    is_archived = models.BooleanField(default=False)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, default=1)# quitar luego el default

    class Meta:
        ordering = ['date']