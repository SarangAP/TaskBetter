# Generated by Django 5.0.2 on 2024-02-27 18:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tb', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='task',
            name='description',
            field=models.CharField(max_length=256),
        ),
    ]
