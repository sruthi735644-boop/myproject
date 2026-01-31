from django.shortcuts import render

# Create your views here.
from django.contrib.auth import authenticate
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from .serializers import RegisterSerializer,ProfileSerializer

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import UserChat
from .serializers import UserChatSerializer,CommentSerializer

from django.contrib.auth.models import User

from django.contrib.auth import get_user_model
# backend/myapp/views.py
from rest_framework import generics, permissions
from .models import Post,Like,Comment
from .serializers import PostSerializer,NotificationSerializer


from rest_framework.generics import ListAPIView

class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "User registered successfully"},
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(username=username, password=password)

        if user is not None:
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }, status=status.HTTP_200_OK)

        return Response(
            {'error': 'Invalid credentials'},
            status=status.HTTP_401_UNAUTHORIZED
        )

class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = ProfileSerializer(request.user)
        return Response(serializer.data)


    def patch(self, request):
        user = request.user
        if "bio" in request.data:
            user.bio = request.data["bio"]
        if "profile_image" in request.FILES:
            user.profile_image = request.FILES["profile_image"]
        user.save()
        serializer = ProfileSerializer(user)
        return Response(serializer.data)

class SendMessageView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = UserChatSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(sender=request.user)

        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED
        )



class ChatMessagesView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, user_id):
        chats = UserChat.objects.filter(
            sender=request.user,
            receiver_id=user_id
        ) | UserChat.objects.filter(
            sender_id=user_id,
            receiver=request.user
        )

        chats = chats.order_by("created_at")
        serializer = UserChatSerializer(chats, many=True)
        return Response(serializer.data)





User = get_user_model()

class SuggestedUsersView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        users = User.objects.exclude(id=request.user.id)

        data = []
        for user in users:
            data.append({
                "id": user.id,
                "username": user.username,
                "profile_image": (
                    user.profile_image.url if user.profile_image else None
                )
            })

        return Response(data)





class PostListCreateView(generics.ListCreateAPIView):
    queryset = Post.objects.select_related("author").all().order_by("-created_at")
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticated]  # only logged-in users

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)





class MyPostsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        posts = Post.objects.filter(
            author=request.user
        ).order_by('-created_at')
        serializer = PostSerializer(posts, many=True)
        return Response(serializer.data)



from .models import Notification

class ToggleLikeAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, post_id):
        post = get_object_or_404(Post, id=post_id)

        # prevent self-like
        if post.author == request.user:
            return Response({"error": "Cannot like own post"}, status=400)

        like = Like.objects.filter(user=request.user, post=post)

        if like.exists():
            like.delete()
            liked = False
        else:
            Like.objects.create(user=request.user, post=post)
            liked = True

            # 🔔 CREATE NOTIFICATION
            Notification.objects.create(
                user=post.author,
                sender=request.user,
                post=post,
                message=f"{request.user.username} liked your post"
            )

        return Response({
            "liked": liked,
            "likes_count": post.likes.count()
        })

class AddCommentAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, post_id):
        post = get_object_or_404(Post, id=post_id)
        text = request.data.get("text")

        if not text:
            return Response({"error": "Comment required"}, status=400)

        comment = Comment.objects.create(
            user=request.user,
            post=post,
            text=text
        )

        # 🔔 CREATE NOTIFICATION (if not own post)
        if post.author != request.user:
            Notification.objects.create(
                user=post.author,
                sender=request.user,
                post=post,
                message=f"{request.user.username} commented on your post"
            )

        return Response(CommentSerializer(comment).data)

class CommentListAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, post_id):
        comments = Comment.objects.filter(post_id=post_id).order_by("-created_at")
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data)


class NotificationListAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        notifications = Notification.objects.filter(
            user=request.user
        ).order_by("-created_at")

        serializer = NotificationSerializer(notifications, many=True)
        return Response(serializer.data)


class MarkNotificationsReadAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        Notification.objects.filter(
            user=request.user,
            is_read=False
        ).update(is_read=True)

        return Response({"status": "success"})
