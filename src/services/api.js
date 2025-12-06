import axios from 'axios';
import { mockAuthAPI, mockProductAPI, mockCategoryAPI } from './mockApi';

// Choose between real API and mock API
const USE_MOCK_API = true; // Set to false when you have real backend

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Real API setup
const realApi = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for real API
realApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for real API
realApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Choose which API to use
const api = USE_MOCK_API ? { 
  post: async (url, data) => {
    // Route mock API calls
    if (url === '/auth/login') return mockAuthAPI.login(data);
    if (url === '/auth/register') return mockAuthAPI.register(data);
    if (url === '/auth/forgot-password') return mockAuthAPI.forgotPassword(data.email);
    if (url.startsWith('/auth/reset-password/')) {
      const token = url.split('/').pop();
      return mockAuthAPI.resetPassword(token, data.password);
    }
    throw new Error(`Mock API route not found: ${url}`);
  },
  get: async (url) => {
    if (url === '/auth/me') return mockAuthAPI.getProfile();
    if (url === '/products') return mockProductAPI.getAll();
    if (url === '/products/my-products') return mockProductAPI.getUserProducts();
    if (url.startsWith('/products/')) {
      const id = parseInt(url.split('/').pop());
      return mockProductAPI.getById(id);
    }
    if (url === '/categories') return mockCategoryAPI.getAll();
    throw new Error(`Mock API route not found: ${url}`);
  },
  put: async (url, data) => {
    if (url === '/auth/update-profile') return { data: { success: true, user: data } };
    throw new Error(`Mock API route not found: ${url}`);
  },
  delete: async (url) => {
    throw new Error(`Mock API route not found: ${url}`);
  }
} : realApi;

// Auth API calls
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  forgotPassword: (email) => api.post('/auth/forgot-password', { email }),
  resetPassword: (token, password) => api.put(`/auth/reset-password/${token}`, { password }),
  getProfile: () => api.get('/auth/me'),
  updateProfile: (userData) => api.put('/auth/update-profile', userData),
};

// Product API calls
export const productAPI = {
  getAll: (params) => api.get('/products', { params }),
  getById: (id) => api.get(`/products/${id}`),
  create: (productData) => api.post('/products', productData),
  update: (id, productData) => api.put(`/products/${id}`, productData),
  delete: (id) => api.delete(`/products/${id}`),
  getUserProducts: () => api.get('/products/my-products'),
};

// Category API calls
export const categoryAPI = {
  getAll: () => api.get('/categories'),
};

export default api;