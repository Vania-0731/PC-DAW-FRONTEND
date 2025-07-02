// src/services/productoService.js
import api from '../api'; // Importa la instancia de axios configurada

const API_PRODUCTOS_URL = '/productos'; // Solo la parte específica de la URL

const obtenerProductos = () => {
  return api.get(API_PRODUCTOS_URL);
};

const obtenerProductoPorId = (id) => {
  return api.get(`${API_PRODUCTOS_URL}/${id}`);
};

const agregarProducto = (producto) => {
  return api.post(API_PRODUCTOS_URL, producto);
};

const actualizarProducto = (id, producto) => {
  return api.put(`${API_PRODUCTOS_URL}/${id}`, producto);
};

const eliminarProducto = (id) => {
  return api.delete(`${API_PRODUCTOS_URL}/${id}`);
};

export default {
  obtenerProductos,
  obtenerProductoPorId,
  agregarProducto,
  actualizarProducto,
  eliminarProducto,
};