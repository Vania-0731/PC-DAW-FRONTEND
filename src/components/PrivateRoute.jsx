// src/components/PrivateRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';

const PrivateRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, hasRole } = useAuthStore();

  if (!isAuthenticated) {
    // Si no está autenticado, redirige a la página de login
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && allowedRoles.length > 0) {
    // Si se especifican roles permitidos, verifica si el usuario tiene alguno de ellos
    const userHasRequiredRole = allowedRoles.some(role => hasRole(role));
    if (!userHasRequiredRole) {
      // Si no tiene el rol requerido, redirige a una página de acceso denegado o al home
      // Puedes crear una página /unauthorized si lo deseas.
      console.warn("Acceso denegado: El usuario no tiene los roles requeridos.");
      return <Navigate to="/" replace />; // Redirige al home o a una página de error
    }
  }

  return children; // Si está autenticado y tiene los roles, renderiza el componente hijo
};

export default PrivateRoute;