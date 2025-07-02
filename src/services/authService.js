// src/services/authService.js
import axios from 'axios';

const API_AUTH_URL = 'http://localhost:8080/api/v1/auth/';

const login = (username, password) => {
  return axios.post(API_AUTH_URL + 'login', {
    username,
    password,
  });
};

const register = (username, email, password, roles) => {
  return axios.post(API_AUTH_URL + 'register', {
    username,
    email,
    password,
    roles, // Esto es un array de strings, por ejemplo: ["admin"] o ["user"]
  });
};

// Función para guardar el token y los datos del usuario en localStorage
// Esto es opcional si el store de Zustand se encarga de la persistencia,
// pero es una buena práctica tenerlo aquí si se decide persistir manualmente.
const saveUserData = (data) => {
  localStorage.setItem('user', JSON.stringify(data));
};

// Función para obtener el token del localStorage
const getToken = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user ? user.token : null;
};

// Función para obtener todos los datos del usuario del localStorage
const getUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};

// Función para eliminar el token y los datos del usuario del localStorage
const logout = () => {
  localStorage.removeItem('user');
};

export default {
  login,
  register,
  saveUserData,
  getToken,
  getUser,
  logout,
};