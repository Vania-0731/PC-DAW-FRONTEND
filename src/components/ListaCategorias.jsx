import React, { useEffect, useState } from 'react';
import categoriaService from '../services/categoriaService';
import { Link } from 'react-router-dom';
import useAuthStore from '../store/authStore'; // Importar el store

const ListaCategorias = () => {
  const [categorias, setCategorias] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Obtener la función hasRole del store de autenticación
  const { hasRole } = useAuthStore();
  
  // Verificar si el usuario es admin
  const isAdmin = hasRole('ROLE_ADMIN');

  useEffect(() => {
    categoriaService.obtenerCategorias()
      .then(response => {
        setCategorias(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError('No se pudieron cargar las categorías. Inténtalo más tarde.');
        setLoading(false);
        console.error(err);
      });
  }, []);

  const eliminarCategoria = (id) => {
    const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar esta categoría?');
    if (confirmDelete) {
      categoriaService.eliminarCategoria(id)
        .then(() => {
          setCategorias(categorias.filter(categoria => categoria.id !== id));
        })
        .catch(err => {
          setError('Error al eliminar la categoría. Inténtalo más tarde.');
          console.error(err);
        });
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '50vh' }}>
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid py-4" style={{
      background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
      minHeight: '100vh'
    }}>
      <div className="container">
        {/* Header */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="card border-0 shadow-sm" style={{
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)'
            }}>
              <div className="card-body text-center py-4">
                <h2 className="display-6 text-success mb-3">
                  🏷️ Lista de Categorías
                </h2>
                {/* Solo mostrar el botón de registrar si es admin */}
                {isAdmin && (
                  <Link 
                    to="/registrar-categoria" 
                    className="btn btn-success btn-lg px-4"
                    style={{
                      background: 'linear-gradient(45deg, #28a745, #1e7e34)',
                      border: 'none',
                      borderRadius: '25px',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'scale(1.05)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'scale(1)';
                    }}
                  >
                    ➕ Registrar Categoría
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="alert alert-danger d-flex align-items-center mb-4" style={{
            border: 'none',
            borderRadius: '15px'
          }}>
            <span className="me-2">⚠️</span>
            {error}
          </div>
        )}

        {/* Categories Table */}
        <div className="card border-0 shadow-lg" style={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          borderRadius: '20px'
        }}>
          <div className="card-body p-0">
            {categorias.length === 0 ? (
              <div className="text-center py-5">
                <div style={{ fontSize: '4rem' }}>🏷️</div>
                <h4 className="text-muted">No hay categorías registradas</h4>
                {isAdmin ? (
                  <p className="text-muted">¡Comienza agregando tu primera categoría!</p>
                ) : (
                  <p className="text-muted">No hay categorías disponibles en este momento.</p>
                )}
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead style={{
                    background: 'linear-gradient(45deg, #28a745, #20c997)',
                    color: 'white'
                  }}>
                    <tr>
                      <th className="border-0 py-3" style={{ borderRadius: '20px 0 0 0' }}>ID</th>
                      <th className="border-0 py-3">Nombre</th>
                      {/* Solo mostrar columna de acciones si es admin */}
                      {isAdmin && (
                        <th className="border-0 py-3 text-center" style={{ borderRadius: '0 20px 0 0' }}>Acciones</th>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {categorias.map((categoria, index) => (
                      <tr 
                        key={categoria.id}
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
                            #{categoria.id}
                          </span>
                        </td>
                        <td className="align-middle py-3">
                          <strong>{categoria.nombre}</strong>
                        </td>
                        {/* Solo mostrar acciones si es admin */}
                        {isAdmin && (
                          <td className="align-middle py-3 text-center">
                            <div className="btn-group" role="group">
                              <Link 
                                to={`/actualizar-categoria/${categoria.id}`} 
                                className="btn btn-warning btn-sm me-2"
                                style={{
                                  borderRadius: '10px',
                                  transition: 'all 0.3s ease'
                                }}
                                onMouseEnter={(e) => {
                                  e.target.style.transform = 'translateY(-2px)';
                                }}
                                onMouseLeave={(e) => {
                                  e.target.style.transform = 'translateY(0)';
                                }}
                              >
                                ✏️ Editar
                              </Link>
                              <button 
                                className="btn btn-danger btn-sm"
                                style={{
                                  borderRadius: '10px',
                                  transition: 'all 0.3s ease'
                                }}
                                onClick={() => eliminarCategoria(categoria.id)}
                                onMouseEnter={(e) => {
                                  e.target.style.transform = 'translateY(-2px)';
                                }}
                                onMouseLeave={(e) => {
                                  e.target.style.transform = 'translateY(0)';
                                }}
                              >
                                🗑️ Eliminar
                              </button>
                            </div>
                          </td>
                        )}
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

export default ListaCategorias;