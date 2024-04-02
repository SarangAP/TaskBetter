# Generated by Django 5.0.2 on 2024-03-21 18:37

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tb', '0003_alter_task_created'),
    ]

    operations = [
        migrations.AlterField(
            model_name='task',
            name='completed',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='task',
            name='created',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
    ]
