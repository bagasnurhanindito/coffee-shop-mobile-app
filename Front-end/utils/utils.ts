import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// Update with your backend IP and port
const API_BASE = 'http://192.168.43.73:5000'; // Pastikan URL ini benar dan server backend berjalan

// Interfaces for user data
interface RegisterData {
  username: string;
  password: string;
  fullName: string;
  phone: string;
  email: string; // Added email property
}

interface LoginData {
  username: string;
  password: string;
}

interface ProfileData {
  username?: string;
  email?: string;
}

interface OrderData {
  user: string;
  order: any;  // Can be the menu or other order object
  totalPrice: number;
  paymentMethod: string;
  status: string;
}

// User Authentication APIs
export const registerUser = async (userData: RegisterData) => {
  try {
    const response = await axios.post(`${API_BASE}/user/register`, userData);
    return response.data;
  } catch (error: any) {
    console.error('Error registering user:', error.response?.data || error.message);
    throw error;
  }
};

export const loginUser = async (userData: LoginData) => {
  try {
    const response = await axios.post(`${API_BASE}/user/login`, userData);
    return response.data;
  } catch (error: any) {
    console.error('Error logging in:', error.response?.data || error.message);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    const response = await axios.post(`${API_BASE}/logout`);
    return response.data;
  } catch (error: any) {
    console.error('Error logging out:', error.response?.data || error.message);
    throw error;
  }
};

// Get user profile
export const getProfile = async (token: string) => {
  try {
    const response = await axios.get(`${API_BASE}/user/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error: any) {
    console.error('Error fetching profile:', error.response?.data || error.message);
    throw new Error(error.response?.data?.error || 'Error fetching profile');
  }
};

// Update user profile
export const updateProfile = async (token: string, profileData: ProfileData) => {
  try {
    const response = await axios.put(`${API_BASE}/user/profile`, profileData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.user; // Backend returns updated user object
  } catch (error: any) {
    console.error('Error updating profile:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Error updating profile');
  }
};

// Menu APIs
export const fetchMenus = async () => {
  try {
    const response = await axios.get(`${API_BASE}/menu`);
    return response.data;
  } catch (error: any) {
    console.error('Error fetching menus:', error.response?.data || error.message);
    throw error;
  }
};

// Order APIs
export const createOrder = async (orderData: OrderData) => {
  try {
    const response = await axios.post(`${API_BASE}/history/order`, orderData);
    return response.data;
  } catch (error: any) {
    console.error('Error creating order and saving to history:', error.response?.data || error.message);
    throw new Error('Failed to create order and save to history');
  }
};

// History APIs
export const fetchHistory = async (userId: string) => {
  try {
    const response = await axios.get(`${API_BASE}/history/${userId}`);
    return response.data;
  } catch (error: any) {
    console.error('Error fetching history:', error.response?.data || error.message);
    throw error;
  }
};