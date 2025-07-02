// src/api.js
import axios from 'axios';
import useAuthStore from './store/authStore';

const api = axios.create({
  baseURL: 'https://pc-daw-backend-app.onrender.com/api/v1', // Base URL para todas tus APIs
});

// Interceptor de solicitud para añadir el token JWT
api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token; // Obtiene el token del store de Zustand
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor de respuesta para manejar errores de autenticación (ej. 401 Unauthorized)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Si recibimos 401 Unauthorized, intentamos refrescar el token o hacemos logout
      // Para este ejemplo simple, haremos logout y redirigiremos al login
      useAuthStore.getState().logout();
      // Opcional: redirigir al usuario, pero es mejor que el componente se encargue de la navegación
      // window.location.href = '/login'; 
    }
    return Promise.reject(error);
  }
);

export default api;