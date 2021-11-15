from django.contrib import admin
from .models import Offline_data

class Offline_dataAdmin(admin.ModelAdmin):
  list = ('offline_data')


admin.site.register(Offline_data, Offline_dataAdmin)