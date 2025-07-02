// src/components/RegisterForm.jsx
import React, { useState } from 'react';
import useAuthStore from '../store/authStore';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // Cambiado a un solo rol
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const register = useAuthStore((state) => state.register);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    // Convertir el rol individual a array para mantener compatibilidad con el store
    const result = await register(username, email, password, [role]);

    if (result.success) {
      setMessage('¡Usuario registrado exitosamente! Redirigiendo a login...');
      setTimeout(() => {
        navigate('/login');
      }, 2000); // Redirige después de 2 segundos
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100" style={{
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
    }}>
      <div className="card shadow-lg p-4" style={{ borderRadius: '15px', maxWidth: '450px', width: '100%' }}>
        <div className="card-body">
          <h2 className="card-title text-center mb-4 text-success">Registrar Usuario</h2>
          {message && <div className="alert alert-success">{message}</div>}
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="regUsername" className="form-label">Nombre de Usuario:</label>
              <input
                type="text"
                className="form-control"
                id="regUsername"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="regEmail" className="form-label">Email:</label>
              <input
                type="email"
                className="form-control"
                id="regEmail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="regPassword" className="form-label">Contraseña:</label>
              <input
                type="password"
                className="form-control"
                id="regPassword"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {/* Select mejorado - solo permite seleccionar un rol */}
            <div className="mb-3">
              <label htmlFor="role" className="form-label">Rol:</label>
              <select
                className="form-select"
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                style={{
                  borderRadius: '8px',
                  border: '1px solid #ced4da',
                  transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out'
                }}
              >
                <option value="user">Usuario</option>
                <option value="admin">Administrador</option>
              </select>
              <small className="form-text text-muted">Selecciona el tipo de usuario a registrar.</small>
            </div>

            <div className="d-grid gap-2">
              <button type="submit" className="btn btn-success btn-lg" style={{
                background: 'linear-gradient(45deg, #28a745, #1e7e34)',
                border: 'none',
                borderRadius: '25px',
                transition: 'all 0.3s ease'
              }}>
                Registrar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;