# api/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, viewsets
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.authtoken.models import Token
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics.pairwise import cosine_similarity
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
import nltk
import json
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from expenses.models import Expense, Category
from userincome.models import UserIncome, Source
from goals.models import Goal
from .serializers import (
    YourDataSerializer, ExpenseSerializer, CategorySerializer,
    IncomeSerializer, SourceSerializer, GoalSerializer, UserSerializer
)

nltk.download('punkt')
nltk.download('stopwords')


@api_view(['POST'])
@permission_classes([AllowAny])
def login_api(request):
    username = request.data.get('username')
    password = request.data.get('password')
    
    user = authenticate(username=username, password=password)
    if user:
        if user.is_active:
            token, created = Token.objects.get_or_create(user=user)
            return Response({
                'token': token.key,
                'user': UserSerializer(user).data
            })
        return Response({'message': 'Account not active'}, status=status.HTTP_403_FORBIDDEN)
    return Response({'message': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)


@api_view(['POST'])
@permission_classes([AllowAny])
def register_api(request):
    username = request.data.get('username')
    email = request.data.get('email')
    password = request.data.get('password')
    
    if User.objects.filter(username=username).exists():
        return Response({'message': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)
    
    if User.objects.filter(email=email).exists():
        return Response({'message': 'Email already exists'}, status=status.HTTP_400_BAD_REQUEST)
    
    user = User.objects.create_user(username=username, email=email, password=password)
    user.is_active = True  # For mobile, activate immediately
    user.save()
    
    token = Token.objects.create(user=user)
    return Response({
        'token': token.key,
        'user': UserSerializer(user).data
    }, status=status.HTTP_201_CREATED)


class ExpenseViewSet(viewsets.ModelViewSet):
    serializer_class = ExpenseSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return Expense.objects.filter(owner=self.request.user).order_by('-date')
    
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticated]


class IncomeViewSet(viewsets.ModelViewSet):
    serializer_class = IncomeSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return UserIncome.objects.filter(owner=self.request.user).order_by('-date')
    
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class GoalViewSet(viewsets.ModelViewSet):
    serializer_class = GoalSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return Goal.objects.filter(owner=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class PredictCategory(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user_input = request.data.get('description')
        data = pd.read_csv('dataset.csv')
        tfidf_vectorizer = TfidfVectorizer()
        X = tfidf_vectorizer.fit_transform(data['clean_description'])
        model = RandomForestClassifier()
        model.fit(X, data['category'])
        user_input = preprocess_text(user_input)
        user_input_vector = tfidf_vectorizer.transform([user_input])
        similarities = cosine_similarity(user_input_vector, X)
        closest_match_index = similarities.argmax()
        predicted_category = model.predict(X[closest_match_index])

        return Response({'predicted_category': predicted_category[0]}, status=status.HTTP_200_OK)


class UpdateDataset(APIView):
    def post(self, request):
       new_data = request.data.get('new_data')

       if 'description' in new_data and 'category' in new_data:
            try:
                data = pd.read_csv('dataset.csv')
                new_category = new_data['category']
                new_description = new_data['description']

                new_row = {'description': new_description, 'category': new_category, 'clean_description': preprocess_text(new_description)}
                data = pd.concat([data, pd.DataFrame([new_row])], ignore_index=True)
                data.to_csv('dataset.csv', index=False)
                
                # Retrain the model with updated dataset
                tfidf_vectorizer = TfidfVectorizer()
                X = tfidf_vectorizer.fit_transform(data['clean_description'])
                model = RandomForestClassifier()
                model.fit(X, data['category'])
                
                return Response({'message': 'Dataset updated'}, status=status.HTTP_200_OK)
            except Exception as e:
                return Response({'message': f'Error updating dataset: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
       return Response({'message': 'Invalid data'}, status=status.HTTP_400_BAD_REQUEST)


def preprocess_text(text):
    stop_words = set(stopwords.words('english'))
    tokens = word_tokenize(text.lower())
    tokens = [t for t in tokens if t.isalnum() and t not in stop_words]
    return ' '.join(tokens)
