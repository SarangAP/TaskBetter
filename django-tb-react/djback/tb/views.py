from django.shortcuts import render
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

from django.http import JsonResponse
from django.http import HttpResponse
from django.db import connection
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
import json
from django.contrib.auth import authenticate
from django.contrib.auth import login
from django.contrib.auth.models import User
# Create your views here.
class TestView(APIView):
    def get(self, request):
        return Response({'message' : 'test'}, status=status.HTTP_200_OK)

@csrf_exempt
def login_view(request):
    if request.method == 'OPTIONS':
        response = HttpResponse(status=204)
        response['Access-Control-Allow-Origin'] = 'http://localhost:3000'
        response['Access-Control-Allow-Methods'] = 'POST, OPTIONS'  
        response['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
        response['Access-Control-Allow-Credentials'] = 'true'  
        return response
    
    elif request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        username = data.get('username')
        password = data.get('password')

        user = authenticate(request, username=username,password=password)
        if user is not None:
            login(request, user)
            response = JsonResponse({'message': 'Login successful'})
        else:
            response =  JsonResponse({'message': 'Invalid credentials testing'}, status=401)
    else:
       response =  JsonResponse({'message': 'Invalid method'}, status=405)
      
    response['Access-Control-Allow-Origin'] = 'http://localhost:3000'
    response['Access-Control-Allow-Methods'] = 'POST, OPTIONS'
    response['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
    response['Access-Control-Allow-Credentials'] = 'true'
    
    return response