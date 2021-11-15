from django.shortcuts import render
from .serializers import Offline_dataSerializer 
from rest_framework import viewsets, status 
from .models import Offline_data 
from rest_framework.decorators import api_view
from rest_framework.response import Response
import json          

class Offline_dataView(viewsets.ModelViewSet):  
    serializer_class = Offline_dataSerializer   
    queryset = Offline_data.objects.all()     


@api_view(['POST'])
def collect_offdata(request):
    """
    This API is used to collect 
    """
    try:
        response_body = {
            "data": None
        }

        offline_data_list= json.loads(request.data['offline_data'])
        for item in offline_data_list:
            id = int(item['id'])
            if Offline_data.objects.filter(id_check = id).exists():
                return Response("duplicate_item", status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            else:
                new_object= Offline_data()
                new_object.offline_data = item
                new_object.id_check = id
                new_object.save()
            
        response_body['data'] = "data saved successfully"       
        return Response(response_body, status=status.HTTP_200_OK)
                
    except Exception as e:
        return Response("something went wrong", status=status.HTTP_500_INTERNAL_SERVER_ERROR)
