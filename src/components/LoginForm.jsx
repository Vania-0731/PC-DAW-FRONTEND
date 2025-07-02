// src/components/LoginForm.jsx
import React, { useState } from 'react';
import useAuthStore from '../store/authStore';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Limpiar errores previos

    const result = await login(username, password);

    if (result.success) {
      navigate('/'); // Redirige a la página de inicio o dashboard
    } else {
      setError(result.message); // Muestra el mensaje de error del backend
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100" style={{
        background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
    }}>
      <div className="card shadow-lg p-4" style={{ borderRadius: '15px', maxWidth: '400px', width: '100%' }}>
        <div className="card-body">
          <h2 className="card-title text-center mb-4 text-primary">Iniciar Sesión</h2>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Nombre de Usuario:</label>
              <input
                type="text"
                className="form-control"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Contraseña:</label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="d-grid gap-2">
              <button type="submit" className="btn btn-primary btn-lg" style={{
                background: 'linear-gradient(45deg, #007bff, #0056b3)',
                border: 'none',
                borderRadius: '25px',
                transition: 'all 0.3s ease'
              }}>
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;