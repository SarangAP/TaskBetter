import json

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token

from django.http import JsonResponse
from django.http import HttpResponse
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils import timezone
from django.utils.decorators import method_decorator
from django.shortcuts import render, get_object_or_404
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.db.models import Count, Q
from django.core.exceptions import ValidationError

from .models import *
from .serializers import *


# Create your views here.
class TaskView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        tasks = Task.objects.filter(user_id=request.user.id)
        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        req_data = request.data.copy()
        req_data['user'] = request.user.id
        serializer = TaskSerializer(data=req_data)
        if serializer.is_valid():
            serializer.save()
            print(request.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            print(serializer.errors)
            print(request.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request):
        if 'task_id' not in request.data.keys():
            return Response({'error' : 'Please provide a task id'}, status=status.HTTP_400_BAD_REQUEST)
        task = get_object_or_404(Task, task_id=request.data['task_id'])
        if request.user != task.user:
            return Response({'error' : 'User does not own this task'}, status=status.HTTP_401_UNAUTHORIZED)
            
        serializer = TaskSerializer(task, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request):
        task = get_object_or_404(Task, task_id=request.data['task_id'])
        if request.user != task.user:
            return Response({'error' : 'User does not own this task'}, status=status.HTTP_401_UNAUTHORIZED)
        task.delete()
        return Response(status=status.HTTP_200_OK)

class SearchTaskView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        tasks = Task.objects.filter(user_id=request.user.id)
        parameters = self.request.query_params

        priority = parameters.get("priority")
        if priority is not None:
            try:
                priority = int(priority)
            except:
                return Response({'error' : 'Invalid value for priority'}, status=status.HTTP_400_BAD_REQUEST)

            tasks = tasks.filter(priority__gte=priority)

        completed = parameters.get("completed")
        if completed is not None:
            try:
                completed = int(completed)
            except:
                return Response({'error' : 'Invalid value for completed'}, status=status.HTTP_400_BAD_REQUEST)

            tasks = tasks.filter(completed=completed)

        created = parameters.get("created")
        if created is not None:
            try:
                tasks = tasks.filter(created=created)
            except ValidationError as e:
                return Response({"error" : e}, status=status.HTTP_400_BAD_REQUEST)

        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class LoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(request, username=username,password=password)
        # Token.objects.get_or_create(user=user)
        if user is not None:
            token, _ = Token.objects.get_or_create(user=user) #Token generation upon successful authentication
            serializer = UserSerializer(user)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({'message' : 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

class RegisterView(APIView):
    @csrf_exempt 
    def post(self, request):
        data = json.loads(request.body.decode('utf-8'))
        username = data.get('username', '')
        first_name = data.get('firstName', '')
        last_name = data.get('lastName', '')
        email = data.get('email', '')
        password = data.get('password', '')

        try:
            if User.objects.filter(username = username).exists():
                return Response({'message': 'Choose a different username'}, status=status.HTTP_400_BAD_REQUEST)
            
            elif User.objects.filter(email = email).exists():
                return Response({'message': 'Email is in use already'}, status=status.HTTP_400_BAD_REQUEST)
                
            user = User.objects.create_user(username = username, first_name = first_name, last_name = last_name, email = email, password = password)

            return Response({'message': 'Registration was successful!'}, status=status.HTTP_201_CREATED)
        
        except Exception as event:
            return Response({'message': f'Registration failed: {str(event)}'}, status=status.HTTP_400_BAD_REQUEST)
        
class ProfileView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    @csrf_exempt
    def get(self, request):
        user = request.user
        print(f'Who is trying to see: {user}')
        serializer = UserSerializer(user)

        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request):
        user = request.user
        serializer = UserSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class LogoutView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            token = Token.objects.get(user=request.user)
            token.delete()
            return Response(status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response({'error' : 'Invalid Token'}, status=status.HTTP_401_UNAUTHORIZED)

class LeaderboardView(APIView):
    def get(self, request, count=10):
        top_users = User.objects.annotate(completed_tasks=Count("task", filter=Q(task__completed=True))).order_by("-completed_tasks")[:count]
        serializer = LeaderboardSerializer(top_users, many=True, context={'top_users' : top_users})
        return Response(serializer.data, status=status.HTTP_200_OK)
