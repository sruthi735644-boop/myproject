from django.urls import path
from .views import RegisterView, LoginView,UserProfileView,SendMessageView,ChatMessagesView,SuggestedUsersView,PostListCreateView

# from .views import MyPostsView
from .views import (
    ToggleLikeAPIView,
    AddCommentAPIView,
    CommentListAPIView,
)

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('profile/', UserProfileView.as_view(), name='profile'),
    path("send-message/", SendMessageView.as_view()),
    path("chat/<int:user_id>/", ChatMessagesView.as_view()),
    path("users/suggested/", SuggestedUsersView.as_view(),name='users'),
     path('posts/', PostListCreateView.as_view(), name='post-list-create'),
    

# path("my-posts/", MyPostsView.as_view()),
 

    path("posts/<int:post_id>/like/", ToggleLikeAPIView.as_view()),
    path("posts/<int:post_id>/comment/", AddCommentAPIView.as_view()),
    path("posts/<int:post_id>/comments/", CommentListAPIView.as_view()),



     


]
