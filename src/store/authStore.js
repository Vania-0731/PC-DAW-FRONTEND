// src/store/authStore.js
import { create } from 'zustand';
import authService from '../services/authService';

// Función para cargar el estado inicial desde localStorage
const getInitialState = () => {
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    return {
      user: user || null,
      token: user ? user.token : null,
      isAuthenticated: !!user,
      roles: user ? user.roles : [],
    };
  } catch (e) {
    console.error("Error al parsear user de localStorage:", e);
    return {
      user: null,
      token: null,
      isAuthenticated: false,
      roles: [],
    };
  }
};

const useAuthStore = create((set) => ({
  ...getInitialState(), // Carga el estado inicial
  
  login: async (username, password) => {
    try {
      const response = await authService.login(username, password);
      const { token, id, username: fetchedUsername, email, roles } = response.data;

      const userData = { token, id, username: fetchedUsername, email, roles };
      authService.saveUserData(userData); // Guarda en localStorage

      set({
        user: userData,
        token: token,
        isAuthenticated: true,
        roles: roles,
      });
      return { success: true };
    } catch (error) {
      console.error("Error en el login:", error.response?.data || error.message);
      return { success: false, message: error.response?.data?.message || 'Error de login' };
    }
  },

  register: async (username, email, password, roles) => {
    try {
      const response = await authService.register(username, email, password, roles);
      return { success: true, message: response.data };
    } catch (error) {
      console.error("Error en el registro:", error.response?.data || error.message);
      return { success: false, message: error.response?.data?.mensaje || 'Error de registro' };
    }
  },

  logout: () => {
    authService.logout(); // Elimina de localStorage
    set({
      user: null,
      token: null,
      isAuthenticated: false,
      roles: [],
    });
  },

  // Función para verificar si el usuario tiene un rol específico
  hasRole: (requiredRole) => {
    const { roles } = useAuthStore.getState(); // Obtiene el estado actual del store
    return roles.includes(requiredRole);
  },

  // Función para inicializar el estado (útil para cargar desde localStorage al inicio de la app)
  initializeAuth: () => {
    set(getInitialState());
  },
}));

export default useAuthStore;