from rest_framework import serializers
from expenses.models import Expense, Category
from userincome.models import UserIncome, Source
from goals.models import Goal
from django.contrib.auth.models import User

class YourDataSerializer(serializers.Serializer):
    description = serializers.CharField()
    category = serializers.CharField()

class ExpenseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Expense
        fields = ['id', 'amount', 'date', 'description', 'category', 'owner']
        read_only_fields = ['owner']

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']

class IncomeSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserIncome
        fields = ['id', 'amount', 'date', 'description', 'source', 'owner']
        read_only_fields = ['owner']

class SourceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Source
        fields = ['id', 'name']

class GoalSerializer(serializers.ModelSerializer):
    progress = serializers.SerializerMethodField()
    
    class Meta:
        model = Goal
        fields = ['id', 'name', 'start_date', 'end_date', 'amount_to_save', 
                  'current_saved_amount', 'owner', 'progress']
        read_only_fields = ['owner']
    
    def get_progress(self, obj):
        return obj.calculate_progress()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']
