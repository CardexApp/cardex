# Generated by Django 5.2.1 on 2025-05-18 16:37

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0002_carddetails'),
    ]

    operations = [
        migrations.RenameField(
            model_name='carddetails',
            old_name='guest_id',
            new_name='guest_customer',
        ),
        migrations.RenameField(
            model_name='carddetails',
            old_name='user_id',
            new_name='user',
        ),
    ]
