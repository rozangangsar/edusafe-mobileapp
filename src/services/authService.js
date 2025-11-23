import api from './api';
import * as SecureStore from 'expo-secure-store';

export const authService = {
  // Login untuk Parent
  loginParent: async (email, password) => {
    try {
      const response = await api.post('/api/auth/login', {
        email,
        password,
        role: 'parent',
      });

      if (response.data.token) {
        await SecureStore.setItemAsync('userToken', response.data.token);
        await SecureStore.setItemAsync('userRole', 'parent');
      }

      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Login untuk Teacher
  loginTeacher: async (email, password) => {
    try {
      const response = await api.post('/api/auth/login', {
        email,
        password,
        role: 'teacher',
      });

      if (response.data.token) {
        await SecureStore.setItemAsync('userToken', response.data.token);
        await SecureStore.setItemAsync('userRole', 'teacher');
      }

      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Logout
  logout: async () => {
    try {
      await SecureStore.deleteItemAsync('userToken');
      await SecureStore.deleteItemAsync('userRole');
    } catch (error) {
      console.error('Logout error:', error);
    }
  },

  // Get current user
  getCurrentUser: async () => {
    try {
      const response = await api.get('/api/auth/me');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};
