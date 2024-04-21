"""
URL configuration for djback project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path
from tb.views import *

urlpatterns = [
    path('admin/', admin.site.urls),
    path('login/', LoginView.as_view(), name='login'),
    path('tasks/', TaskView.as_view(), name='tasks'),
    path('profile/', ProfileView.as_view(), name='profile_view'),
    path('register/', RegisterView.as_view(), name='register'),
    path('logout/', LogoutView.as_view(), name="logout"),
    path('leaderboard/', LeaderboardView.as_view(), name='leaderboard'),
    path('leaderboard/<int:count>', LeaderboardView.as_view(), name='leaderboard_with_count'),
    path('search/', SearchTaskView.as_view()),
]
