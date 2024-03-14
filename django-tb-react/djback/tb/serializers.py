from rest_framework import serializers
from django.conf import settings
from django.core.exceptions import ValidationError
from .models import *
from django.contrib.auth.models import User

class TaskSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = Task
        fields = ['task_id', 'title', 'description', 'created', 'modified', 'completed', 'username']

class UserSerializer(serializers.ModelSerializer):
    token = serializers.ReadOnlyField(source='auth_token.key')
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'email', 'date_joined', 'last_login', 'token']

