from django.db import models

# Create your models here.

class Offline_data(models.Model):
   offline_data = models.TextField()
   id_check = models.IntegerField(null=True) 

   def _str_(self):
     return self.offline_data