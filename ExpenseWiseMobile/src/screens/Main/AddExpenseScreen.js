import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Platform,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import api from '../../config/api';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { COLORS, SIZES, SHADOWS } from '../../constants/theme';

export default function AddExpenseScreen({ navigation }) {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [loading, setLoading] = useState(false);
  const [predictedCategory, setPredictedCategory] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (description.length > 3) {
      predictCategory();
    }
  }, [description]);

  const fetchCategories = async () => {
    try {
      const response = await api.get('/api/categories/');
      const categoriesData = response.data.results || response.data || [];
      const validCategories = Array.isArray(categoriesData) ? categoriesData : [];
      
      // If no categories from API, use default ones
      if (validCategories.length === 0) {
        const defaultCategories = [
          { id: 'food', name: 'Food & Dining' },
          { id: 'transport', name: 'Transportation' },
          { id: 'shopping', name: 'Shopping' },
          { id: 'entertainment', name: 'Entertainment' },
          { id: 'bills', name: 'Bills & Utilities' },
          { id: 'health', name: 'Healthcare' },
          { id: 'other', name: 'Other' },
        ];
        setCategories(defaultCategories);
      } else {
        setCategories(validCategories);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      // Set default categories on error
      setCategories([
        { id: 'food', name: 'Food & Dining' },
        { id: 'transport', name: 'Transportation' },
        { id: 'shopping', name: 'Shopping' },
        { id: 'entertainment', name: 'Entertainment' },
        { id: 'bills', name: 'Bills & Utilities' },
        { id: 'health', name: 'Healthcare' },
        { id: 'other', name: 'Other' },
      ]);
    }
  };

  const predictCategory = async () => {
    try {
      const response = await api.post('/api/predict-category/', { description });
      if (response.data.predicted_category) {
        setPredictedCategory(response.data.predicted_category);
        setCategory(response.data.predicted_category);
      }
    } catch (error) {
      console.error('Error predicting category:', error);
    }
  };

  const handleSubmit = async () => {
    if (!amount || !description || !category) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    setLoading(true);
    try {
      await api.post('/api/expenses/', {
        amount: parseFloat(amount),
        description,
        category,
        date: date.toISOString().split('T')[0],
      });

      Alert.alert('Success', 'Expense added successfully', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      Alert.alert('Error', error.response?.data?.message || 'Failed to add expense');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.form}>
        <View style={styles.header}>
          <Icon name="cash-minus" size={32} color={COLORS.error} />
          <Text style={styles.headerTitle}>Add New Expense</Text>
          <Text style={styles.headerSubtitle}>Track your spending to stay on budget</Text>
        </View>

        <View style={styles.formCard}>
          <Input
            label="Amount *"
            value={amount}
            onChangeText={setAmount}
            placeholder="0.00"
            keyboardType="decimal-pad"
            icon="currency-usd"
          />

          <Input
            label="Description *"
            value={description}
            onChangeText={setDescription}
            placeholder="What did you spend on?"
            icon="text"
            multiline
            numberOfLines={3}
          />

          {predictedCategory && (
            <View style={styles.predictionContainer}>
              <Icon name="lightbulb-outline" size={16} color={COLORS.accent} />
              <Text style={styles.prediction}>
                Suggested: {predictedCategory}
              </Text>
            </View>
          )}

          <Text style={styles.label}>Category *</Text>
          <View style={styles.pickerContainer}>
            <Icon name="tag" size={20} color={COLORS.textSecondary} style={styles.pickerIcon} />
            <Picker
              selectedValue={category}
              onValueChange={(itemValue) => setCategory(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Select Category" value="" />
              {categories.map((cat) => (
                <Picker.Item key={cat.id} label={cat.name} value={cat.name} />
              ))}
            </Picker>
          </View>

          <Text style={styles.label}>Date *</Text>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setShowDatePicker(true)}
          >
            <Icon name="calendar" size={20} color={COLORS.textSecondary} />
            <Text style={styles.dateText}>{date.toLocaleDateString()}</Text>
            <Icon name="chevron-down" size={20} color={COLORS.textSecondary} />
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={(event, selectedDate) => {
                setShowDatePicker(Platform.OS === 'ios');
                if (selectedDate) {
                  setDate(selectedDate);
                }
              }}
              maximumDate={new Date()}
            />
          )}

          <Button
            title={loading ? 'Adding Expense...' : 'Add Expense'}
            onPress={handleSubmit}
            loading={loading}
            variant="primary"
            size="large"
            fullWidth
            icon="plus-circle"
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  form: {
    padding: SIZES.lg,
  },
  header: {
    alignItems: 'center',
    marginBottom: SIZES.xl,
  },
  headerTitle: {
    fontSize: SIZES.h3,
    fontWeight: 'bold',
    color: COLORS.text,
    marginTop: SIZES.sm,
  },
  headerSubtitle: {
    fontSize: SIZES.bodySmall,
    color: COLORS.textSecondary,
    marginTop: SIZES.xs,
    textAlign: 'center',
  },
  formCard: {
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radiusXL,
    padding: SIZES.xl,
    ...SHADOWS.medium,
  },
  label: {
    fontSize: SIZES.bodySmall,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SIZES.xs,
    marginTop: SIZES.md,
  },
  predictionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.accent + '20',
    padding: SIZES.sm,
    borderRadius: SIZES.radius,
    marginBottom: SIZES.md,
  },
  prediction: {
    fontSize: SIZES.bodySmall,
    color: COLORS.accent,
    fontWeight: '500',
    marginLeft: SIZES.xs,
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radius,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    paddingHorizontal: SIZES.md,
    marginBottom: SIZES.md,
  },
  pickerIcon: {
    marginRight: SIZES.sm,
  },
  picker: {
    flex: 1,
    height: 50,
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.surface,
    padding: SIZES.md,
    borderRadius: SIZES.radius,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    marginBottom: SIZES.xl,
  },
  dateText: {
    fontSize: SIZES.body,
    color: COLORS.text,
    flex: 1,
    marginLeft: SIZES.sm,
  },
});
