# Generated by Django 5.0.3 on 2024-03-25 22:24

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_monthmetrics_quartermetrics'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='MonthMetrics',
            new_name='MonthMetric',
        ),
        migrations.RenameModel(
            old_name='QuarterMetrics',
            new_name='QuarterMetric',
        ),
    ]
