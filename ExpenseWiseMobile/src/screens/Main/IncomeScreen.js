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
import api from '../../config/api';

export default function IncomeScreen({ navigation }) {
  const [income, setIncome] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useFocusEffect(
    useCallback(() => {
      fetchIncome();
    }, [])
  );

  const fetchIncome = async () => {
    try {
      const response = await api.get('/api/income/');
      setIncome(response.data.results || response.data || []);
    } catch (error) {
      console.error('Error fetching income:', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchIncome();
    setRefreshing(false);
  };

  const handleDelete = (id) => {
    Alert.alert('Delete Income', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            await api.delete(`/api/income/${id}/`);
            fetchIncome();
          } catch (error) {
            Alert.alert('Error', 'Failed to delete income');
          }
        },
      },
    ]);
  };

  const renderIncome = ({ item }) => (
    <TouchableOpacity
      style={styles.incomeCard}
      onPress={() => navigation.navigate('EditIncome', { income: item })}
    >
      <View style={styles.incomeHeader}>
        <View style={styles.sourceBadge}>
          <Text style={styles.sourceText}>{item.source}</Text>
        </View>
        <Text style={styles.amount}>${parseFloat(item.amount).toFixed(2)}</Text>
      </View>
      <Text style={styles.description}>{item.description}</Text>
      <View style={styles.incomeFooter}>
        <Text style={styles.date}>{new Date(item.date).toLocaleDateString()}</Text>
        <TouchableOpacity onPress={() => handleDelete(item.id)}>
          <Icon name="delete" size={20} color="#fa709a" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={income}
        renderItem={renderIncome}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Icon name="cash-plus" size={80} color="#ccc" />
            <Text style={styles.emptyText}>No income yet</Text>
          </View>
        }
      />
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => navigation.navigate('AddIncome')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  list: {
    padding: 15,
  },
  incomeCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },
  incomeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sourceBadge: {
    backgroundColor: '#43e97b',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 15,
  },
  sourceText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  amount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#43e97b',
  },
  description: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  incomeFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  date: {
    fontSize: 14,
    color: '#666',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#666',
    marginTop: 20,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#43e97b',
  },
});
