import React, { useState, useEffect } from 'react';
import categoriaService from '../services/categoriaService';
import { useNavigate, useParams } from 'react-router-dom';

const RegistrarCategoria = () => {
  const [categoria, setCategoria] = useState({ nombre: '' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      categoriaService.obtenerCategoriaPorId(id)
        .then((response) => {
          setCategoria(response.data);
        })
        .catch((err) => {
          setError('No se pudo cargar la categoría para editar.');
          console.error(err);
        });
    }
  }, [id]);

  const handleChange = (e) => {
    setCategoria({ ...categoria, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (id) {
        await categoriaService.actualizarCategoria(id, categoria);
        navigate('/');
      } else {
        await categoriaService.agregarCategoria(categoria);
        navigate('/');
      }
    } catch (err) {
      setError('Hubo un error al procesar la solicitud. Inténtalo de nuevo.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="container-fluid py-4" style={{
      background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
      minHeight: '100vh'
    }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-xl-5">
            <div className="card border-0 shadow-lg" style={{
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              borderRadius: '20px'
            }}>
              <div className="card-header text-center py-4" style={{
                background: 'linear-gradient(45deg, #28a745, #20c997)',
                color: 'white',
                borderRadius: '20px 20px 0 0',
                border: 'none'
              }}>
                <h2 className="mb-0 display-6">
                  {id ? '✏️ Actualizar Categoría' : '🏷️ Registrar Categoría'}
                </h2>
              </div>
              
              <div className="card-body p-5">
                <form onSubmit={handleSubmit}>
                  {error && (
                    <div className="alert alert-danger d-flex align-items-center mb-4" style={{
                      border: 'none',
                      borderRadius: '15px'
                    }}>
                      <span className="me-2">⚠️</span>
                      {error}
                    </div>
                  )}

                  <div className="mb-4">
                    <label htmlFor="nombre" className="form-label fw-bold text-dark">
                      📝 Nombre de la Categoría
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      id="nombre"
                      name="nombre"
                      value={categoria.nombre}
                      onChange={handleChange}
                      required
                      disabled={loading}
                      placeholder="Ingresa el nombre de la categoría"
                      style={{
                        borderRadius: '15px',
                        border: '2px solid #e9ecef',
                        transition: 'all 0.3s ease'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#28a745';
                        e.target.style.boxShadow = '0 0 0 0.2rem rgba(40, 167, 69, 0.25)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#e9ecef';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>

                  <div className="d-flex gap-3 justify-content-center">
                    <button 
                      type="button" 
                      className="btn btn-lg px-4 py-3" 
                      onClick={handleCancel}
                      disabled={loading}
                      style={{
                        background: 'linear-gradient(45deg, #6c757d, #5a6268)',
                        border: 'none',
                        borderRadius: '25px',
                        color: 'white',
                        fontWeight: 'bold',
                        transition: 'all 0.3s ease',
                        minWidth: '140px'
                      }}
                      onMouseEnter={(e) => {
                        if (!loading) {
                          e.target.style.transform = 'scale(1.05)';
                          e.target.style.boxShadow = '0 8px 16px rgba(108, 117, 125, 0.3)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = 'scale(1)';
                        e.target.style.boxShadow = 'none';
                      }}
                    >
                      ❌ Cancelar
                    </button>

                    <button 
                      type="submit" 
                      className="btn btn-lg px-4 py-3" 
                      disabled={loading}
                      style={{
                        background: loading ? '#6c757d' : 'linear-gradient(45deg, #28a745, #20c997)',
                        border: 'none',
                        borderRadius: '25px',
                        color: 'white',
                        fontWeight: 'bold',
                        transition: 'all 0.3s ease',
                        minWidth: '160px'
                      }}
                      onMouseEnter={(e) => {
                        if (!loading) {
                          e.target.style.transform = 'scale(1.05)';
                          e.target.style.boxShadow = '0 10px 20px rgba(40, 167, 69, 0.3)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = 'scale(1)';
                        e.target.style.boxShadow = 'none';
                      }}
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                          Procesando...
                        </>
                      ) : (
                        <>
                          {id ? '✅ Actualizar' : '💾 Registrar'}
                        </>
                      )}
                    </button>
                  </div>
                </form>

                {/* Información adicional */}
                <div className="mt-4 p-3" style={{
                  background: 'rgba(40, 167, 69, 0.1)',
                  borderRadius: '15px',
                  border: '1px solid rgba(40, 167, 69, 0.2)'
                }}>
                  <div className="d-flex align-items-center">
                    <span className="me-2">💡</span>
                    <small className="text-muted">
                      {id 
                        ? 'Estás editando una categoría existente. Los cambios se aplicarán inmediatamente.'
                        : 'Crea una nueva categoría para organizar mejor tus productos.'
                      }
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrarCategoria;