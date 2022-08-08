from django.contrib.auth.models import User, Group
from rest_framework import serializers
from .models import Product

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'groups']


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'name', 'price', 'brand', 'store', 'description', 'rating', 'location', 'image', 'date', 'created_by']

# class ProductSerializer(serializers.Serializer):
#     id = serializers.IntegerField(read_only=True)
#     name = serializers.CharField(blank=True, default='')
#     price = serializers.FloatField()
#     brand = serializers.CharField(blank=True, default='')
#     store = serializers.CharField(blank=True, default='')
#     description = serializers.CharField()
#     rating = serializers.IntegerField(default=0)
#     location = serializers.CharField(blank=True, default='')
#     image = serializers.CharField(blank=True, default='')
#     date = serializers.DateTimeField(auto_now_add=True)
#     created_by = serializers.ForeignKey(User, on_delete=models.CASCADE)

#     def create(self, validated_data):
#         """
#         Create and return a new `Product` instance, given the validated data.
#         """
#         return Product.objects.create(**validated_data)

#     # def update(self, instance, validated_data):
#     #     """
#     #     Update and return an existing `Product` instance, given the validated data.
#     #     """
#     #     instance.title = validated_data.get('title', instance.title)
#     #     instance.code = validated_data.get('code', instance.code)
#     #     instance.linenos = validated_data.get('linenos', instance.linenos)
#     #     instance.language = validated_data.get('language', instance.language)
#     #     instance.style = validated_data.get('style', instance.style)
#     #     instance.save()
#     #     return instance