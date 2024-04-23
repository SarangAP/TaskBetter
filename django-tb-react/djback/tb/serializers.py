from rest_framework import serializers
from django.conf import settings
from django.core.exceptions import ValidationError
from .models import *
from django.contrib.auth.models import User
from django.utils import timezone

class TaskSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField(source='user.username')
    due_date = serializers.DateField(format='iso-8601')

    class Meta:
        model = Task
        fields = ['task_id', 'title', 'description', 'created', 'modified', 'completed', 'user','username', 'due_date', 'priority', 'completed_date']

    def update(self, instance, validated_data):
        instance.title = validated_data.get('title', instance.title)
        instance.description = validated_data.get('description', instance.description)
        instance.priority = validated_data.get('priority', instance.priority)
        instance.due_date = validated_data.get('due_date', instance.due_date)

        new_completed = validated_data.get('completed', instance.completed)
        if new_completed != instance.completed:
            if new_completed == 2 and instance.completed != 2:
                instance.completed_date = timezone.now()
            if new_completed != 2 and instance.completed == 2:
                instance.completed_date = None
            instance.completed = new_completed

        instance.save()
        return instance

class UserSerializer(serializers.ModelSerializer):
    token = serializers.ReadOnlyField(source='auth_token.key')
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'email', 'date_joined', 'last_login', 'token']

class LeaderboardSerializer(serializers.ModelSerializer):
    rank = serializers.SerializerMethodField()
    completed_tasks = serializers.IntegerField()
    total_score = serializers.SerializerMethodField()

    def get_rank(self, obj):
        top_users = self.context.get('top_users')
        rank = list(top_users).index(obj) + 1
        return rank

    def get_total_score(self, obj):
        completed_tasks = obj.task_set.filter(completed=2)
        total_score = sum(
            {
                #Priority 1-4 point assignments
                1: 13,
                2: 7,   
                3: 4,
                4: 1
            }.get(task.priority, 0) for task in completed_tasks
        )
        return total_score
    
    class Meta:
        model = User
        fields = ("rank", "username", "completed_tasks", "total_score")
