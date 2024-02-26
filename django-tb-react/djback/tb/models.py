from django.db import models
from django.utils import timezone
from django.conf import settings

# Create your models here.
class Task(models.Model):
    task_id = Models.AutoField(primary_key=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    title = models.CharField(max_length=128)
    description = models.CharField(max_length=128) 
    created = models.DateTimeField(default=timezone.now)
    modified = models.DateTimeField(default=timezone.now)
    completed = models.DateTimeField(null=True)

    class Meta:
        managed = True
        db_table = 'task'
