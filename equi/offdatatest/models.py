from django.db import models

# Create your models here.

class Offline_data(models.Model):
   offline_data = models.TextField()

   def _str_(self):
     return self.offline_data