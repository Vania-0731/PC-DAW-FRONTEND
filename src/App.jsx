// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ListaProductos from './components/ListaProductos';
import RegistrarProducto from './components/RegistrarProducto';
import ListaCategorias from './components/ListaCategorias';
import RegistrarCategoria from './components/RegistrarCategoria';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import UserManagementPage from './pages/UserManagementPage'; // Nueva importación
import useAuthStore from './store/authStore';

const App = () => {
  React.useEffect(() => {
    useAuthStore.getState().initializeAuth();
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        
        {/* La ruta de registro ahora puede ser para administradores que registran a otros */}
        <Route 
          path="/register" 
          element={
            <PrivateRoute allowedRoles={['ROLE_ADMIN']}>
              <RegisterPage />
            </PrivateRoute>
          } 
        />

        {/* Nueva ruta para la gestión de usuarios, solo accesible por ADMIN */}
        <Route
          path="/admin/users"
          element={
            <PrivateRoute allowedRoles={['ROLE_ADMIN']}>
              <UserManagementPage />
            </PrivateRoute>
          }
        />

        {/* Rutas Protegidas para Productos y Categorías (accesibles por USER y ADMIN) */}
        <Route
          path="/productos"
          element={
            <PrivateRoute allowedRoles={['ROLE_USER', 'ROLE_ADMIN']}>
              <ListaProductos />
            </PrivateRoute>
          }
        />
        <Route
          path="/registrar-producto"
          element={
            <PrivateRoute allowedRoles={['ROLE_ADMIN']}>
              <RegistrarProducto />
            </PrivateRoute>
          }
        />
        <Route
          path="/actualizar-producto/:id"
          element={
            <PrivateRoute allowedRoles={['ROLE_ADMIN']}>
              <RegistrarProducto />
            </PrivateRoute>
          }
        />

        <Route
          path="/categorias"
          element={
            <PrivateRoute allowedRoles={['ROLE_USER', 'ROLE_ADMIN']}>
              <ListaCategorias />
            </PrivateRoute>
          }
        />
        <Route
          path="/registrar-categoria"
          element={
            <PrivateRoute allowedRoles={['ROLE_ADMIN']}>
              <RegistrarCategoria />
            </PrivateRoute>
          }
        />
        <Route
          path="/actualizar-categoria/:id"
          element={
            <PrivateRoute allowedRoles={['ROLE_ADMIN']}>
              <RegistrarCategoria />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<h2>404 Not Found</h2>} />
      </Routes>
    </Router>
  );
};

export default App;