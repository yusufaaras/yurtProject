import axios from 'axios';

// ✅ Ortama göre API URL belirle
const getApiBaseUrl = () => {
  // Development (lokal)
  if (import.meta.env.MODE === 'development') {
    return 'http://localhost:3000/api'; // Lokal backend
  }
  
  // Production (cPanel)
  return 'https://ankayurtlari.yusufaras.online/api'; // ← BURASI ÖNEMLİ!
};

const api = axios.create({
  baseURL: getApiBaseUrl(),
  headers: {
    'Content-Type': 'application/json',
  },
});

console.log('🔗 API Base URL:', api.defaults.baseURL);

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;