from django.shortcuts import render
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

from django.http import HttpResponse
from django.db import connection
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

# Create your views here.
class TestView(APIView):
    def get(self, request):
        return Response({'message' : 'test'}, status=status.HTTP_200_OK)
    
def authenticate_user(username, password):
    with connection.cursor() as cursor:
        query = "SELECT COUNT(*) FROM user WHERE username = %s AND password = %s"
        cursor.execute(query, [username, password])
        result = cursor.fetchone()
        print(f"Input username: {username}, Input password: {password}")

        return result[0] == 1
    
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
        username = request.POST.get('username')
        password = request.POST.get('password')

        if authenticate_user(username, password):
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