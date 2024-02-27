from rest_framework import serializers
from django.conf import settings
from django.core.exceptions import ValidationError
from .models import *

class TaskSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = Task
        fields = ['task_id', 'title', 'description', 'created', 'modified', 'completed', 'username']
