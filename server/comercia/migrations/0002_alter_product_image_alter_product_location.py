# Generated by Django 4.0.2 on 2022-06-24 22:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('comercia', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='image',
            field=models.CharField(blank=True, default='', max_length=200),
        ),
        migrations.AlterField(
            model_name='product',
            name='location',
            field=models.CharField(blank=True, default='', max_length=200),
        ),
    ]
