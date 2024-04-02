from rest_framework import serializers
from django.conf import settings
from django.core.exceptions import ValidationError
from .models import *
from django.contrib.auth.models import User

class TaskSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField(source='user.username')
    due_date = serializers.DateField(format='iso-8601')

    class Meta:
        model = Task
        fields = ['task_id', 'title', 'description', 'created', 'modified', 'completed', 'user','username', 'due_date', 'priority']

class UserSerializer(serializers.ModelSerializer):
    token = serializers.ReadOnlyField(source='auth_token.key')
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'email', 'date_joined', 'last_login', 'token']

class LeaderboardSerializer(serializers.ModelSerializer):
    rank = serializers.SerializerMethodField()
    completed_tasks = serializers.IntegerField()

    def get_rank(self, obj):
        top_users = self.context.get('top_users')
        rank = list(top_users).index(obj) + 1
        return rank

    class Meta:
        model = User
        fields = ("rank", "username", "completed_tasks")
