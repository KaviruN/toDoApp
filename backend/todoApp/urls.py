from django.contrib import admin
from django.urls import include, path
from rest_framework import routers

from todo import views
from auths.views import UserCreate, MyTokenObtainPairView

router = routers.DefaultRouter()
router.register(r'api/todo', views.TodoViewSet, basename='todo')

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('admin/', admin.site.urls),
    # path('', include(router.urls)),
    path('api/', include('rest_framework.urls', namespace='rest_framework')),
    path('api/token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/register/', UserCreate.as_view()),
]