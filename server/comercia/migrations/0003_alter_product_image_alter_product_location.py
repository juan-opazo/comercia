# Generated by Django 4.0.2 on 2022-06-24 22:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('comercia', '0002_alter_product_image_alter_product_location'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='image',
            field=models.CharField(blank=True, default='', max_length=300),
        ),
        migrations.AlterField(
            model_name='product',
            name='location',
            field=models.CharField(blank=True, default='', max_length=300),
        ),
    ]
