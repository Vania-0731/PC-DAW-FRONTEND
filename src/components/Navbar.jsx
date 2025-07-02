// src/components/Navbar.jsx
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';

const Navbar = () => {
  const { isAuthenticated, user, logout, initializeAuth, hasRole } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{ 
      background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
    }}>
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" to="/">
          🛍️ Gestión de Productos
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {isAuthenticated && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/productos">
                    Productos
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/categorias">
                    Categorías
                  </Link>
                </li>
                {hasRole('ROLE_ADMIN') && (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/register">
                        Registrar Usuario
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/admin/users">
                        Gestión de Usuarios
                      </Link>
                    </li>
                  </>
                )}
              </>
            )}
          </ul>
          <ul className="navbar-nav">
            {isAuthenticated ? (
              <>
                <li className="nav-item">
                  <span className="nav-link text-white-50">
                    Bienvenido, {user?.username} ({user?.roles?.map(role => role.replace('ROLE_', '')).join(', ')})
                  </span>
                </li>
                <li className="nav-item">
                  <button onClick={handleLogout} className="btn btn-outline-light ms-2">
                    Cerrar Sesión
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Iniciar Sesión
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;