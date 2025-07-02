// src/services/userService.js
import api from '../api'; // Usamos la instancia de axios configurada con el interceptor


const API_USERS_URL = '/users'; 

const getAllUsers = () => {
  // Este endpoint necesitará ser protegido en el backend para ROLE_ADMIN
  return api.get(API_USERS_URL);
};

const updateUserRoles = (userId, roles) => {
  // roles debe ser un array de strings, ej: ["ROLE_USER", "ROLE_ADMIN"]
  // Este endpoint necesitará ser protegido en el backend para ROLE_ADMIN
  return api.put(`${API_USERS_URL}/${userId}/roles`, { roles });
};

const deleteUser = (userId) => {
  // Este endpoint necesitará ser protegido en el backend para ROLE_ADMIN
  return api.delete(`${API_USERS_URL}/${userId}`);
};

export default {
  getAllUsers,
  updateUserRoles,
  deleteUser,
};