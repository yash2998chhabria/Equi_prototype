from django.shortcuts import render
from .serializers import Offline_dataSerializer 
from rest_framework import viewsets      
from .models import Offline_data                 

class Offline_dataView(viewsets.ModelViewSet):  
    serializer_class = Offline_dataSerializer   
    queryset = Offline_data.objects.all()     
