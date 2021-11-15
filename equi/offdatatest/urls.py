from django.conf.urls import include, url
from .views import collect_offdata


urlpatterns = [
    url(r'^collect_offdata$', collect_offdata),
]