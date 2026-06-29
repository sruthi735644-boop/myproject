from django.urls import path
from .views import TaskList,TaskDetail,RegisterView

urlpatterns = [
    path("tasks/",TaskList.as_view(),name="tasks"),
    path("tasks/<int:id>/",TaskDetail.as_view(),name="task-detail"),
    path("register/",RegisterView.as_view(),name='register'),
]