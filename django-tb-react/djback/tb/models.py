from django.db import models
from django.utils import timezone
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User

# Create your models here.
class Task(models.Model):
    task_id = models.AutoField(primary_key=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    title = models.CharField(max_length=128)
    description = models.CharField(max_length=256) 
    due_date = models.DateField(null=False)
    priority = models.IntegerField(null=False, default=1)
    created = models.DateTimeField(default=timezone.now)
    modified = models.DateTimeField(default=timezone.now)
    completed = models.BooleanField(default=False)

    def save(self, *args, **kwargs):
        self.modified = timezone.now()
        super(Task, self).save(*args, **kwargs)

    class Meta:
        managed = True
        db_table = 'task'

@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)
