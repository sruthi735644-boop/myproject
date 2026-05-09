
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import Activity
from .serializers import ActivitySerializer


class ActivityListCreateView(APIView):
    def get(self,request):
        activities=Activity.objects.all()
        serializer=ActivitySerializer(activities,many=True)
        return Response(serializer.data)
    

    def post(self,request):
        serializer=ActivitySerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()

            return Response(serializer.data,status=status.HTTP_201_CREATED)
    
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

        
class SummaryView(APIView):

    def get(self, request):

        activities = Activity.objects.all()

        total_entries = activities.count()

        total_hours = sum(item.hours for item in activities)

        user_hours = {}

        for item in activities:

            user_hours[item.name] = (
                user_hours.get(item.name, 0)
                + item.hours
            )

        most_active_user = (
            max(user_hours, key=user_hours.get)
            if user_hours else ""
        )

        data = {
            "total_entries": total_entries,
            "total_hours": total_hours,
            "most_active_user": most_active_user
        }

        return Response(data)