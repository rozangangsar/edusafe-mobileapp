import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import Constants from 'expo-constants';

const API_URL = Constants.expoConfig.extra.apiUrl || 'http://localhost:3001';

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

// Tambahkan token ke setiap request
api.interceptors.request.use(
  async (config) => {
    try {
      const token = await SecureStore.getItemAsync('userToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error retrieving token:', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Token expired atau tidak valid
      await SecureStore.deleteItemAsync('userToken');
    }
    return Promise.reject(error);
  }
);

export default api;
