import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import DashboardScreen from '../screens/Main/DashboardScreen';
import ExpensesScreen from '../screens/Main/ExpensesScreen';
import AddExpenseScreen from '../screens/Main/AddExpenseScreen';
import EditExpenseScreen from '../screens/Main/EditExpenseScreen';
import IncomeScreen from '../screens/Main/IncomeScreen';
import AddIncomeScreen from '../screens/Main/AddIncomeScreen';
import EditIncomeScreen from '../screens/Main/EditIncomeScreen';
import ForecastScreen from '../screens/Main/ForecastScreen';
import GoalsScreen from '../screens/Main/GoalsScreen';
import AddGoalScreen from '../screens/Main/AddGoalScreen';
import ReportsScreen from '../screens/Main/ReportsScreen';
import SettingsScreen from '../screens/Main/SettingsScreen';
import ProfileScreen from '../screens/Main/ProfileScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function ExpenseStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ExpensesList" component={ExpensesScreen} options={{ title: 'Expenses' }} />
      <Stack.Screen name="AddExpense" component={AddExpenseScreen} options={{ title: 'Add Expense' }} />
      <Stack.Screen name="EditExpense" component={EditExpenseScreen} options={{ title: 'Edit Expense' }} />
    </Stack.Navigator>
  );
}

function IncomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="IncomeList" component={IncomeScreen} options={{ title: 'Income' }} />
      <Stack.Screen name="AddIncome" component={AddIncomeScreen} options={{ title: 'Add Income' }} />
      <Stack.Screen name="EditIncome" component={EditIncomeScreen} options={{ title: 'Edit Income' }} />
    </Stack.Navigator>
  );
}

function GoalsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="GoalsList" component={GoalsScreen} options={{ title: 'Goals' }} />
      <Stack.Screen name="AddGoal" component={AddGoalScreen} options={{ title: 'Add Goal' }} />
    </Stack.Navigator>
  );
}

export default function MainNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Dashboard') {
            iconName = focused ? 'view-dashboard' : 'view-dashboard-outline';
          } else if (route.name === 'Expenses') {
            iconName = focused ? 'cash-minus' : 'cash-minus';
          } else if (route.name === 'Income') {
            iconName = focused ? 'cash-plus' : 'cash-plus';
          } else if (route.name === 'Goals') {
            iconName = focused ? 'target' : 'target';
          } else if (route.name === 'More') {
            iconName = focused ? 'menu' : 'menu';
          }

          return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#4B3FFF',
        tabBarInactiveTintColor: '#B2BEC3',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E5E7EB',
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        headerStyle: {
          backgroundColor: '#4B3FFF',
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Expenses" component={ExpenseStack} options={{ headerShown: false }} />
      <Tab.Screen name="Income" component={IncomeStack} options={{ headerShown: false }} />
      <Tab.Screen name="Goals" component={GoalsStack} options={{ headerShown: false }} />
      <Tab.Screen name="More" component={SettingsScreen} options={{ title: 'More' }} />
    </Tab.Navigator>
  );
}
