import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import Constants from 'expo-constants';

// Auto-detect the best API URL based on platform and environment
const getApiUrl = () => {
  // For production, use your production URL
  const PRODUCTION_URL = 'https://your-production-api.com';
  
  // Check if running in production
  if (__DEV__ === false) {
    return PRODUCTION_URL;
  }
  
  // Development URLs
  const localhost = Platform.OS === 'ios' ? 'localhost' : '10.0.2.2';
  
  // Try to get the host IP from Expo manifest (works for physical devices)
  const debuggerHost = Constants.expoConfig?.hostUri?.split(':').shift();
  
  if (debuggerHost && Platform.OS !== 'web') {
    // Use the detected IP for physical devices
    return `http://${debuggerHost}:8000`;
  }
  
  // Fallback to localhost/emulator address
  return `http://${localhost}:8000`;
};

export const API_BASE_URL = getApiUrl();

console.log('🌐 API Base URL:', API_BASE_URL);

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('userToken');
    if (token) {
      config.headers.Authorization = `Token ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
