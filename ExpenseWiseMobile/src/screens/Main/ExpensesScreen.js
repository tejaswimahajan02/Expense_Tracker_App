import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  Alert,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { FAB } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import api from '../../config/api';
import { COLORS, SIZES, SHADOWS } from '../../constants/theme';

export default function ExpensesScreen({ navigation }) {
  const [expenses, setExpenses] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      fetchExpenses();
    }, [])
  );

  const fetchExpenses = async () => {
    try {
      const response = await api.get('/api/expenses/');
      setExpenses(response.data.results || response.data || []);
    } catch (error) {
      console.error('Error fetching expenses:', error);
      Alert.alert('Error', 'Failed to fetch expenses');
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchExpenses();
    setRefreshing(false);
  };

  const handleDelete = (id) => {
    Alert.alert('Delete Expense', 'Are you sure you want to delete this expense?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            await api.delete(`/api/expenses/${id}/`);
            fetchExpenses();
          } catch (error) {
            Alert.alert('Error', 'Failed to delete expense');
          }
        },
      },
    ]);
  };

  const renderExpense = ({ item }) => (
    <TouchableOpacity
      style={styles.expenseCard}
      onPress={() => navigation.navigate('EditExpense', { expense: item })}
      activeOpacity={0.7}
    >
      <View style={styles.expenseHeader}>
        <LinearGradient 
          colors={[COLORS.primary, COLORS.primaryLight]} 
          style={styles.categoryBadge}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={styles.categoryText}>{item.category}</Text>
        </LinearGradient>
        <View style={styles.amountContainer}>
          <Text style={styles.amount}>-${parseFloat(item.amount).toFixed(2)}</Text>
        </View>
      </View>
      <Text style={styles.description} numberOfLines={2}>{item.description}</Text>
      <View style={styles.expenseFooter}>
        <View style={styles.dateContainer}>
          <Icon name="calendar" size={16} color={COLORS.textSecondary} />
          <Text style={styles.date}>{new Date(item.date).toLocaleDateString()}</Text>
        </View>
        <TouchableOpacity 
          onPress={() => handleDelete(item.id)}
          style={styles.deleteButton}
        >
          <Icon name="delete-outline" size={20} color={COLORS.error} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={expenses}
        renderItem={renderExpense}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIconContainer}>
              <Icon name="receipt-outline" size={80} color={COLORS.textLight} />
            </View>
            <Text style={styles.emptyText}>No expenses yet</Text>
            <Text style={styles.emptySubtext}>Start tracking your spending by adding your first expense</Text>
          </View>
        }
      />
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => navigation.navigate('AddExpense')}
        color={COLORS.textWhite}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  list: {
    padding: SIZES.md,
  },
  expenseCard: {
    backgroundColor: COLORS.surface,
    padding: SIZES.lg,
    borderRadius: SIZES.radiusLarge,
    marginBottom: SIZES.md,
    ...SHADOWS.medium,
  },
  expenseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.sm,
  },
  categoryBadge: {
    paddingHorizontal: SIZES.md,
    paddingVertical: SIZES.xs,
    borderRadius: SIZES.radiusFull,
  },
  categoryText: {
    color: COLORS.textWhite,
    fontSize: SIZES.caption,
    fontWeight: 'bold',
  },
  amountContainer: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: SIZES.h4,
    fontWeight: 'bold',
    color: COLORS.error,
  },
  description: {
    fontSize: SIZES.body,
    color: COLORS.text,
    marginBottom: SIZES.sm,
    lineHeight: 22,
  },
  expenseFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  date: {
    fontSize: SIZES.bodySmall,
    color: COLORS.textSecondary,
    marginLeft: SIZES.xs,
  },
  deleteButton: {
    padding: SIZES.xs,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: SIZES.xxl * 2,
    paddingHorizontal: SIZES.xl,
  },
  emptyIconContainer: {
    width: 120,
    height: 120,
    borderRadius: SIZES.radiusFull,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SIZES.lg,
  },
  emptyText: {
    fontSize: SIZES.h4,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SIZES.sm,
  },
  emptySubtext: {
    fontSize: SIZES.bodySmall,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  fab: {
    position: 'absolute',
    margin: SIZES.lg,
    right: 0,
    bottom: 0,
    backgroundColor: COLORS.primary,
  },
});
