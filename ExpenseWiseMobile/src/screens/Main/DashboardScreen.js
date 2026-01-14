import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import api from '../../config/api';
import { COLORS, SIZES, SHADOWS } from '../../constants/theme';

export default function DashboardScreen({ navigation }) {
  const [expenses, setExpenses] = useState([]);
  const [income, setIncome] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [totalExpense, setTotalExpense] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [expensesRes, incomeRes] = await Promise.all([
        api.get('/api/expenses/'),
        api.get('/api/income/'),
      ]);

      const expensesData = expensesRes.data.results || expensesRes.data || [];
      const incomeData = incomeRes.data.results || incomeRes.data || [];
      
      setExpenses(expensesData);
      setIncome(incomeData);
      
      // Calculate category data from expenses
      const categoryTotals = {};
      expensesData.forEach(expense => {
        const cat = expense.category || 'Uncategorized';
        categoryTotals[cat] = (categoryTotals[cat] || 0) + parseFloat(expense.amount);
      });
      
      if (Object.keys(categoryTotals).length > 0) {
        const chartData = Object.entries(categoryTotals).map(
          ([name, amount], index) => ({
            name,
            amount,
            color: getColor(index),
            legendFontColor: '#7F7F7F',
            legendFontSize: 12,
          })
        );
        setCategoryData(chartData);
      }

      const expenseTotal = expensesData.reduce(
        (sum, exp) => sum + parseFloat(exp.amount || 0),
        0
      );
      const incomeTotal = incomeData.reduce(
        (sum, inc) => sum + parseFloat(inc.amount || 0),
        0
      );

      setTotalExpense(expenseTotal);
      setTotalIncome(incomeTotal);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchDashboardData();
    setRefreshing(false);
  };

  const getColor = (index) => {
    const colors = [COLORS.primary, COLORS.accent, COLORS.success, COLORS.error, COLORS.info, '#6f42c1'];
    return colors[index % colors.length];
  };

  const balance = totalIncome - totalExpense;

  return (
    <View style={styles.container}>
      <LinearGradient 
        colors={[COLORS.primary, COLORS.accent]} 
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={styles.headerTitle}>Dashboard</Text>
        <Text style={styles.headerSubtitle}>Welcome back! Here's your financial overview</Text>
      </LinearGradient>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        showsVerticalScrollIndicator={false}
      >
        {/* Balance Card */}
        <View style={styles.balanceCard}>
          <LinearGradient 
            colors={balance >= 0 ? [COLORS.success, COLORS.success + '80'] : [COLORS.error, COLORS.error + '80']} 
            style={styles.balanceGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.balanceLabel}>Current Balance</Text>
            <Text style={styles.balanceAmount}>
              ${Math.abs(balance).toFixed(2)}
            </Text>
            {balance < 0 && <Text style={styles.negativeIndicator}>Deficit</Text>}
          </LinearGradient>
          
          <View style={styles.balanceRow}>
            <View style={styles.balanceItem}>
              <View style={[styles.balanceIcon, { backgroundColor: COLORS.success + '20' }]}>
                <Icon name="trending-up" size={24} color={COLORS.success} />
              </View>
              <Text style={styles.balanceItemLabel}>Income</Text>
              <Text style={[styles.balanceItemAmount, { color: COLORS.success }]}>
                ${totalIncome.toFixed(2)}
              </Text>
            </View>
            <View style={styles.balanceItem}>
              <View style={[styles.balanceIcon, { backgroundColor: COLORS.error + '20' }]}>
                <Icon name="trending-down" size={24} color={COLORS.error} />
              </View>
              <Text style={styles.balanceItemLabel}>Expenses</Text>
              <Text style={[styles.balanceItemAmount, { color: COLORS.error }]}>
                ${totalExpense.toFixed(2)}
              </Text>
            </View>
          </View>
        </View>

        {/* Chart Card */}
        {categoryData.length > 0 && (
          <View style={styles.chartCard}>
            <View style={styles.cardHeader}>
              <Icon name="chart-pie" size={24} color={COLORS.primary} />
              <Text style={styles.chartTitle}>Expense Categories</Text>
            </View>
            <PieChart
              data={categoryData}
              width={Dimensions.get('window').width - 80}
              height={220}
              chartConfig={{
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              }}
              accessor="amount"
              backgroundColor="transparent"
              paddingLeft="15"
              absolute
            />
          </View>
        )}

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionGrid}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => navigation.navigate('Expenses', { screen: 'AddExpense' })}
            >
              <LinearGradient 
                colors={[COLORS.error, COLORS.error + '80']} 
                style={styles.actionGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Icon name="minus-circle" size={32} color={COLORS.textWhite} />
              </LinearGradient>
              <Text style={styles.actionText}>Add Expense</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => navigation.navigate('Income', { screen: 'AddIncome' })}
            >
              <LinearGradient 
                colors={[COLORS.success, COLORS.success + '80']} 
                style={styles.actionGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Icon name="plus-circle" size={32} color={COLORS.textWhite} />
              </LinearGradient>
              <Text style={styles.actionText}>Add Income</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => navigation.navigate('Goals')}
            >
              <LinearGradient 
                colors={[COLORS.primary, COLORS.primary + '80']} 
                style={styles.actionGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Icon name="target" size={32} color={COLORS.textWhite} />
              </LinearGradient>
              <Text style={styles.actionText}>View Goals</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => navigation.navigate('More')}
            >
              <LinearGradient 
                colors={[COLORS.accent, COLORS.accent + '80']} 
                style={styles.actionGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Icon name="chart-line" size={32} color={COLORS.textWhite} />
              </LinearGradient>
              <Text style={styles.actionText}>Reports</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    paddingTop: SIZES.xxl + 20,
    paddingBottom: SIZES.xl,
    paddingHorizontal: SIZES.lg,
  },
  headerTitle: {
    fontSize: SIZES.h2,
    fontWeight: 'bold',
    color: COLORS.textWhite,
  },
  headerSubtitle: {
    fontSize: SIZES.bodySmall,
    color: COLORS.textWhite + 'CC',
    marginTop: SIZES.xs,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: SIZES.xl,
  },
  balanceCard: {
    backgroundColor: COLORS.surface,
    margin: SIZES.lg,
    marginTop: -SIZES.xl,
    borderRadius: SIZES.radiusXL,
    ...SHADOWS.large,
    overflow: 'hidden',
  },
  balanceGradient: {
    padding: SIZES.xl,
    alignItems: 'center',
  },
  balanceLabel: {
    fontSize: SIZES.bodySmall,
    color: COLORS.textWhite + 'CC',
    marginBottom: SIZES.xs,
    fontWeight: '500',
  },
  balanceAmount: {
    fontSize: SIZES.h1 + 8,
    fontWeight: 'bold',
    color: COLORS.textWhite,
  },
  negativeIndicator: {
    fontSize: SIZES.caption,
    color: COLORS.textWhite + 'CC',
    marginTop: SIZES.xs,
    fontWeight: '500',
  },
  balanceRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: SIZES.lg,
    paddingHorizontal: SIZES.md,
  },
  balanceItem: {
    alignItems: 'center',
    flex: 1,
  },
  balanceIcon: {
    width: 48,
    height: 48,
    borderRadius: SIZES.radius,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SIZES.sm,
  },
  balanceItemLabel: {
    fontSize: SIZES.caption,
    color: COLORS.textSecondary,
    marginBottom: SIZES.xs,
    fontWeight: '500',
  },
  balanceItemAmount: {
    fontSize: SIZES.h5,
    fontWeight: 'bold',
  },
  chartCard: {
    backgroundColor: COLORS.surface,
    margin: SIZES.lg,
    marginTop: 0,
    padding: SIZES.lg,
    borderRadius: SIZES.radiusLarge,
    ...SHADOWS.medium,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.lg,
  },
  chartTitle: {
    fontSize: SIZES.h5,
    fontWeight: 'bold',
    color: COLORS.text,
    marginLeft: SIZES.sm,
  },
  quickActions: {
    padding: SIZES.lg,
  },
  sectionTitle: {
    fontSize: SIZES.h5,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SIZES.md,
  },
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionButton: {
    alignItems: 'center',
    width: '48%',
    marginBottom: SIZES.md,
  },
  actionGradient: {
    width: 64,
    height: 64,
    borderRadius: SIZES.radiusLarge,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SIZES.sm,
    ...SHADOWS.medium,
  },
  actionText: {
    fontSize: SIZES.bodySmall,
    fontWeight: '600',
    color: COLORS.text,
    textAlign: 'center',
  },
});
