from django.db import models

# Create your models here.
from django.contrib.auth.models import User
class Task(models.Model):


    STATUS=(('pending','Pending'),
            ('completed','Completed'),)
    

    user=models.ForeignKey(User,on_delete=models.CASCADE)
    title=models.CharField(max_length=100)
    description=models.TextField(blank=True)
    status=models.CharField(max_length=30,choices=STATUS,default='pending')
    date=models.DateField(null=True,blank=True)
    created_at=models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
    