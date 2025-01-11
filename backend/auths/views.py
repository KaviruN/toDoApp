from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework import status
from rest_framework.response import Response
from rest_framework import generics
from django.contrib.auth.models import User
from .serializers import UserSerializer

# class CustomTokenObtainPairView(TokenObtainPairView):
#     def post(self, request, *args, **kwargs):
#         response = super().post(request, *args, **kwargs)
#         data = response.data
#         access_token = data.get('access')
#         refresh_token = data.get('refresh')

#         response_data = {'message': 'Login successful'}
#         if access_token:
#             response.set_cookie(
#                 key='access_token',
#                 value=access_token,
#                 httponly=False,  # Remove HttpOnly attribute
#                 secure=True,
#                 samesite='Lax',
#             )
#             response_data['access'] = access_token
#         if refresh_token:
#             response.set_cookie(
#                 key='refresh_token',
#                 value=refresh_token,
#                 httponly=False,  # Remove HttpOnly attribute
#                 secure=True,
#                 samesite='Lax',
#             )
#             response_data['refresh'] = refresh_token

#         return Response(response_data, status=status.HTTP_200_OK)


# class CustomTokenRefreshView(TokenRefreshView):
#     def post(self, request, *args, **kwargs):
#         response = super().post(request, *args, **kwargs)
#         data = response.data
#         access_token = data.get('access')

#         response_data = {'message': 'Token refreshed'}
#         if access_token:
#             response.set_cookie(
#                 key='access_token',
#                 value=access_token,
#                 httponly=False,  # Remove HttpOnly attribute
#                 secure=True,
#                 samesite='Lax',
#             )
#             response_data['access'] = access_token

#         return Response(response_data, status=status.HTTP_200_OK)

class UserCreate(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer