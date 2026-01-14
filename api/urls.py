# api/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    PredictCategory, UpdateDataset, login_api, register_api,
    ExpenseViewSet, CategoryViewSet, IncomeViewSet, GoalViewSet
)

router = DefaultRouter()
router.register(r'expenses', ExpenseViewSet, basename='expense')
router.register(r'categories', CategoryViewSet, basename='category')
router.register(r'income', IncomeViewSet, basename='income')
router.register(r'goals', GoalViewSet, basename='goal')

urlpatterns = [
    path('', include(router.urls)),
    path('login/', login_api, name='api-login'),
    path('register/', register_api, name='api-register'),
    path('predict-category/', PredictCategory.as_view(), name='predict-category'),
    path('update-dataset/', UpdateDataset.as_view(), name='update-dataset'),
]
