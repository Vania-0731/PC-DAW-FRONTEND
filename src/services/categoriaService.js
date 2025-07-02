// src/services/categoriaService.js
import api from '../api'; // Importa la instancia de axios configurada

const API_CATEGORIAS_URL = '/categorias'; // Solo la parte específica de la URL

const obtenerCategorias = () => {
  return api.get(API_CATEGORIAS_URL);
};

const obtenerCategoriaPorId = (id) => {
  return api.get(`${API_CATEGORIAS_URL}/${id}`);
};

const agregarCategoria = (categoria) => {
  return api.post(API_CATEGORIAS_URL, categoria);
};

const actualizarCategoria = (id, categoria) => {
  return api.put(`${API_CATEGORIAS_URL}/${id}`, categoria);
};

const eliminarCategoria = (id) => {
  return api.delete(`${API_CATEGORIAS_URL}/${id}`);
};

export default {
  obtenerCategorias,
  obtenerCategoriaPorId,
  agregarCategoria,
  actualizarCategoria,
  eliminarCategoria,
};