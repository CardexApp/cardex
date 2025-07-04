# Generated by Django 5.2.1 on 2025-05-18 15:33

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='CardDetails',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name_on_card', models.CharField(max_length=100)),
                ('card_number', models.CharField(max_length=16)),
                ('expiry_date', models.DateField()),
                ('cvv', models.CharField(max_length=4)),
                ('guest_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='store.guestcustomer')),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
