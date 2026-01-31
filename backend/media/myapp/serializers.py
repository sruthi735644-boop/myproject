from rest_framework import serializers
from .models import User,UserChat,Post,Like,Comment


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user
    


class ProfileSerializer(serializers.ModelSerializer):
    followers_count = serializers.SerializerMethodField()
    following_count = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = [
            "username",
            "email",
            "bio",
            "profile_image",
            "date_joined",
            "followers_count",
            "following_count",
        ]

    def get_followers_count(self, obj):
        return obj.followers.count()

    def get_following_count(self, obj):
        return obj.following.count()
    

class UserChatSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserChat
        fields = "__all__"
read_only_fields = ["sender", "created_at"]




class PostSerializer(serializers.ModelSerializer):
    author_username = serializers.CharField(
        source="author.username",
        read_only=True
    )
    author_profile_image = serializers.SerializerMethodField()
    likes_count = serializers.SerializerMethodField()
    comments_count = serializers.SerializerMethodField()
    image = serializers.ImageField(required=False)

    class Meta:
        model = Post
        fields = [
            "id",
            "title",
            "content",
            "image",
            "created_at",
            "author_username",
            "author_profile_image",
            "likes_count",
            "comments_count",
        ]

    def get_author_profile_image(self, obj):
        if obj.author.profile_image:
            return obj.author.profile_image.url
        return None

    def get_likes_count(self, obj):
        return obj.likes.count()

    def get_comments_count(self, obj):
        return obj.comments.count()



class SuggestedUserSerializer(serializers.ModelSerializer):
    profile_image = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ["id", "username", "profile_image"]

    def get_profile_image(self, obj):
        if hasattr(obj, "userprofile") and obj.userprofile.profile_image:
            return obj.userprofile.profile_image.url
        return None





class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = ["id", "user", "post", "created_at"]
        read_only_fields = ["user", "created_at"]


class CommentSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source="user.username", read_only=True)

    class Meta:
        model = Comment
        fields = [
            "id",
            "post",
            "text",
            "created_at",
            "username",
        ]
        read_only_fields = ["created_at"]
