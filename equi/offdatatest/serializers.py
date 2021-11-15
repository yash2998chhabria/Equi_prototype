from rest_framework import serializers
from .models import Offline_data

class Offline_dataSerializer(serializers.ModelSerializer):
    class Meta:
        model = Offline_data
        fields = ('id' ,'offline_data')