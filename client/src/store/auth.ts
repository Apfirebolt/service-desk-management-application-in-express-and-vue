import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import axios from 'axios';

// Define User interface matching your backend schema/responses
export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  isAdmin: boolean;
  userType?: string;
  token?: string;
}

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref<User | null>(JSON.parse(localStorage.getItem('userInfo') || 'null'));
  const token = ref<string | null>(localStorage.getItem('userToken') || user.value?.token || null);
  const loading = ref<boolean>(false);
  const error = ref<string | null>(null);

  // Getters
  const isAuthenticated = computed(() => !!token.value);
  const isAdmin = computed(() => !!user.value?.isAdmin);

  // Configure default Axios instance / headers helper
  const getAuthHeaders = () => ({
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
  });

  // Actions
  
  // 1. Login Action
  const login = async (credentials: { email: string; password: string }) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await axios.post<User>('/api/users/login', credentials);
      const data = response.data;

      user.value = data;
      if (data.token) {
        token.value = data.token;
        localStorage.setItem('userToken', data.token);
      }
      localStorage.setItem('userInfo', JSON.stringify(data));
      return data;
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Failed to sign in';
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // 2. Register Action
  const register = async (userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    userType?: string;
  }) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await axios.post<User>('/api/users', userData);
      const data = response.data;

      user.value = data;
      if (data.token) {
        token.value = data.token;
        localStorage.setItem('userToken', data.token);
      }
      localStorage.setItem('userInfo', JSON.stringify(data));
      return data;
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Failed to register account';
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // 3. Fetch User Profile
  const fetchProfile = async () => {
    if (!token.value) return;
    loading.value = true;
    try {
      const response = await axios.get<User>('/api/users/profile', getAuthHeaders());
      user.value = { ...user.value, ...response.data };
      localStorage.setItem('userInfo', JSON.stringify(user.value));
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Failed to fetch profile';
      if (err.response?.status === 401) {
        logout(); // Auto-logout on token expiration/failure
      }
    } finally {
      loading.value = false;
    }
  };

  // 4. Update User Profile
  const updateProfile = async (updateData: { firstName?: string; lastName?: string; password?: string }) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await axios.patch<User>('/api/users/profile', updateData, getAuthHeaders());
      const data = response.data;

      user.value = data;
      if (data.token) {
        token.value = data.token;
        localStorage.setItem('userToken', data.token);
      }
      localStorage.setItem('userInfo', JSON.stringify(data));
      return data;
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Failed to update profile';
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // 5. Logout Action
  const logout = () => {
    user.value = null;
    token.value = null;
    localStorage.removeItem('userInfo');
    localStorage.removeItem('userToken');
  };

  return {
    user,
    token,
    loading,
    error,
    isAuthenticated,
    isAdmin,
    login,
    register,
    fetchProfile,
    updateProfile,
    logout,
  };
});