from django.shortcuts import render
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication

from django.http import JsonResponse
from django.http import HttpResponse
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
import json
from django.contrib.auth import authenticate
from django.contrib.auth.models import User

from .models import *
from .serializers import *

from rest_framework.authtoken.models import Token
'''
Just to create tokens for existing users. Delete after we all have tokens for our existing super users
Only uncomment after running `python manage.py migrate authtoken`
'''
from rest_framework.authtoken.models import Token

for user in User.objects.all():
    Token.objects.get_or_create(user=user)



# Create your views here.
class TestView(APIView):
    def get(self, request):
        return Response({'message' : 'test'}, status=status.HTTP_200_OK)

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
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            print(serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request):
        try:
            task = Task.objects.get(task_id=request.data['task_id'], user_id=request.user.id)
        except Task.DoesNotExist:
            return Response({"error": "Task not found"}, status=status.HTTP_404_NOT_FOUND)
            
        serializer = TaskSerializer(task, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(request, username=username,password=password)
        Token.objects.get_or_create(user=user)
        if user is not None:
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
    
class LogoutView(APIView):
    def post(self, request):
        # Get the token from the Authorization header
        auth_header = request.META.get('HTTP_AUTHORIZATION')
        if auth_header and auth_header.startswith('Token '):
            token = auth_header.split(' ')[1]
            try:
                # Retrieve the user associated with the token
                user = Token.objects.get(key=token).user
                # Delete the token
                Token.objects.get(key=token).delete()
                return Response({'message': 'Logout was successful'}, status=status.HTTP_200_OK)
            except Token.DoesNotExist:
                return Response({'error': 'Invalid token'}, status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response({'error': 'Token not provided'}, status=status.HTTP_400_BAD_REQUEST)

#@csrf_exempt
#def login_view(request):
#    if request.method == 'OPTIONS':
#        response = HttpResponse(status=204)
#        response['Access-Control-Allow-Origin'] = 'http://localhost:3000'
#        response['Access-Control-Allow-Methods'] = 'POST, OPTIONS'  
#        response['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
#        response['Access-Control-Allow-Credentials'] = 'true'  
#        return response
#    
#    elif request.method == 'POST':
#        data = json.loads(request.body.decode('utf-8'))
#        username = data.get('username')
#        password = data.get('password')
#
#        user = authenticate(request, username=username,password=password)
#        if user is not None:
#            login(request, user)
#            response = JsonResponse({'message': 'Login successful'})
#        else:
#            response =  JsonResponse({'message': 'Invalid credentials testing'}, status=401)
#    else:
#       response =  JsonResponse({'message': 'Invalid method'}, status=405)
#      
#    response['Access-Control-Allow-Origin'] = 'http://localhost:3000'
#    response['Access-Control-Allow-Methods'] = 'POST, OPTIONS'
#    response['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
#    response['Access-Control-Allow-Credentials'] = 'true'
#    
#    return response
