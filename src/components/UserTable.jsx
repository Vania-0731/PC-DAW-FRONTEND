// src/components/UserTable.jsx
import React, { useEffect, useState } from 'react';
import userService from '../services/userService';
import useAuthStore from '../store/authStore'; // Para verificar roles

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { hasRole } = useAuthStore(); // Obtener la función hasRole del store

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await userService.getAllUsers();
      setUsers(response.data);
    } catch (err) {
      console.error("Error fetching users:", err.response?.data || err.message);
      setError("No se pudieron cargar los usuarios. Asegúrate de tener permisos.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId, username) => {
    if (!hasRole('ROLE_ADMIN')) {
      alert("No tienes permisos para eliminar usuarios.");
      return;
    }
    if (window.confirm(`¿Estás seguro de que deseas eliminar al usuario ${username}?`)) {
      try {
        await userService.deleteUser(userId);
        alert(`Usuario ${username} eliminado exitosamente.`);
        fetchUsers(); // Recargar la lista de usuarios
      } catch (err) {
        console.error("Error deleting user:", err.response?.data || err.message);
        setError("Error al eliminar el usuario. Inténtalo de nuevo.");
      }
    }
  };

  const handleUpdateRoles = async (userId, currentRoles, username) => {
    if (!hasRole('ROLE_ADMIN')) {
      alert("No tienes permisos para actualizar roles.");
      return;
    }
    // Implementación simple: pedir los nuevos roles.
    // En una aplicación real, usarías un modal o un formulario más interactivo.
    const newRolesInput = prompt(`Introduce los nuevos roles para ${username} (separados por coma, ej: user,admin):`, currentRoles.join(', '));
    
    if (newRolesInput !== null) {
      const newRoles = newRolesInput.split(',').map(role => role.trim().toUpperCase());
      // Asegurarse de que los roles empiecen con "ROLE_" si tu backend lo espera así
      const formattedRoles = newRoles.map(role => role.startsWith('ROLE_') ? role : `ROLE_${role}`);

      try {
        await userService.updateUserRoles(userId, formattedRoles);
        alert(`Roles de ${username} actualizados exitosamente a: ${formattedRoles.join(', ')}.`);
        fetchUsers(); // Recargar la lista de usuarios
      } catch (err) {
        console.error("Error updating user roles:", err.response?.data || err.message);
        setError("Error al actualizar los roles. Inténtalo de nuevo.");
      }
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '50vh' }}>
        <div className="spinner-border text-info" role="status">
          <span className="visually-hidden">Cargando usuarios...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger d-flex align-items-center mx-auto mt-4" style={{
        border: 'none',
        borderRadius: '15px',
        maxWidth: '600px'
      }}>
        <span className="me-2">⚠️</span>
        {error}
      </div>
    );
  }

  return (
    <div className="container-fluid py-4" style={{
      background: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)',
      minHeight: '100vh'
    }}>
      <div className="container">
        <div className="row mb-4">
          <div className="col-12">
            <div className="card border-0 shadow-sm" style={{
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)'
            }}>
              <div className="card-body text-center py-4">
                <h2 className="display-6 text-info mb-3">
                  👥 Gestión de Usuarios
                </h2>
                <p className="lead text-muted">Administra los usuarios del sistema.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card border-0 shadow-lg" style={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          borderRadius: '20px'
        }}>
          <div className="card-body p-0">
            {users.length === 0 ? (
              <div className="text-center py-5">
                <div style={{ fontSize: '4rem' }}>😔</div>
                <h4 className="text-muted">No hay usuarios registrados</h4>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead style={{
                    background: 'linear-gradient(45deg, #4facfe, #00f2fe)',
                    color: 'white'
                  }}>
                    <tr>
                      <th className="border-0 py-3" style={{ borderRadius: '20px 0 0 0' }}>ID</th>
                      <th className="border-0 py-3">Nombre de Usuario</th>
                      <th className="border-0 py-3">Email</th>
                      <th className="border-0 py-3">Roles</th>
                      <th className="border-0 py-3 text-center" style={{ borderRadius: '0 20px 0 0' }}>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user, index) => (
                      <tr 
                        key={user.id}
                        style={{
                          transition: 'all 0.3s ease',
                          animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#f8f9fa';
                          e.currentTarget.style.transform = 'scale(1.01)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                          e.currentTarget.style.transform = 'scale(1)';
                        }}
                      >
                        <td className="align-middle py-3">
                          <span className="badge bg-light text-dark px-3 py-2" style={{ borderRadius: '10px' }}>
                            #{user.id}
                          </span>
                        </td>
                        <td className="align-middle py-3">
                          <strong>{user.username}</strong>
                        </td>
                        <td className="align-middle py-3">
                          {user.email}
                        </td>
                        <td className="align-middle py-3">
                          {user.roles && user.roles.length > 0 ? (
                            user.roles.map((role, i) => (
                              <span 
                                key={i} 
                                className={`badge ${role === 'ROLE_ADMIN' ? 'bg-danger' : 'bg-primary'} text-white me-1`} 
                                style={{ borderRadius: '10px', padding: '0.4em 0.7em' }}
                              >
                                {role.replace('ROLE_', '')}
                              </span>
                            ))
                          ) : (
                            <span className="badge bg-secondary text-white" style={{ borderRadius: '10px', padding: '0.4em 0.7em' }}>
                              N/A
                            </span>
                          )}
                        </td>
                        <td className="align-middle py-3 text-center">
                          <div className="btn-group" role="group">
                            <button 
                              className="btn btn-danger btn-sm"
                              style={{
                                borderRadius: '10px',
                                transition: 'all 0.3s ease'
                              }}
                              onClick={() => handleDeleteUser(user.id, user.username)}
                              onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                              onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                            >
                              🗑️ Eliminar
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default UserTable;