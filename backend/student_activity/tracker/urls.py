from django.urls import path
from .views import ActivityListCreateView,SummaryView

urlpatterns = [
    path('activities/',ActivityListCreateView.as_view()),
    path('summary/',SummaryView.as_view()),
]
