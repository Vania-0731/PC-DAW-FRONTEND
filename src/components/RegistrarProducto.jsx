import React, { useState, useEffect } from 'react';
import productoService from '../services/productoService';
import categoriaService from '../services/categoriaService';
import { useNavigate, useParams } from 'react-router-dom';

const RegistrarProducto = () => {
  const [producto, setProducto] = useState({ nombre: '', precio: '', categoria: '' });
  const [categorias, setCategorias] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  // Llamada para cargar las categorías
  useEffect(() => {
    categoriaService.obtenerCategorias().then(response => {
      setCategorias(response.data);
    }).catch(err => {
      setError('Error al cargar las categorías.');
      console.error(err);
    });

    // Si estamos editando, obtenemos los datos del producto
    if (id) {
      productoService.obtenerProductoPorId(id).then(response => {
        setProducto(response.data);
      }).catch(err => {
        setError('No se pudo cargar el producto para editar.');
        console.error(err);
      });
    }
  }, [id]);

  const handleChange = (e) => {
    setProducto({ ...producto, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Asegúrate de que el producto tenga el formato correcto antes de enviarlo
    const productoConCategoria = {
      ...producto,
      categoria: { id: producto.categoria }
    };

    try {
      if (id) {
        await productoService.actualizarProducto(id, productoConCategoria);
        navigate('/');
      } else {
        await productoService.agregarProducto(productoConCategoria);
        navigate('/');
      }
    } catch (err) {
      setError('Hubo un error al procesar la solicitud. Inténtalo de nuevo.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid py-4" style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      minHeight: '100vh'
    }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-xl-6">
            <div className="card border-0 shadow-lg" style={{
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              borderRadius: '20px'
            }}>
              <div className="card-header text-center py-4" style={{
                background: 'linear-gradient(45deg, #667eea, #764ba2)',
                color: 'white',
                borderRadius: '20px 20px 0 0',
                border: 'none'
              }}>
                <h2 className="mb-0 display-6">
                  {id ? '✏️ Actualizar Producto' : '📦 Registrar Producto'}
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
                      📝 Nombre del Producto
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      id="nombre"
                      name="nombre"
                      value={producto.nombre}
                      onChange={handleChange}
                      required
                      disabled={loading}
                      placeholder="Ingresa el nombre del producto"
                      style={{
                        borderRadius: '15px',
                        border: '2px solid #e9ecef',
                        transition: 'all 0.3s ease'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#667eea';
                        e.target.style.boxShadow = '0 0 0 0.2rem rgba(102, 126, 234, 0.25)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#e9ecef';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="precio" className="form-label fw-bold text-dark">
                      💰 Precio
                    </label>
                    <input
                      type="number"
                      className="form-control form-control-lg"
                      id="precio"
                      name="precio"
                      value={producto.precio}
                      onChange={handleChange}
                      required
                      disabled={loading}
                      placeholder="0.00"
                      step="0.01"
                      min="0"
                      style={{
                        borderRadius: '15px',
                        border: '2px solid #e9ecef',
                        transition: 'all 0.3s ease'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#667eea';
                        e.target.style.boxShadow = '0 0 0 0.2rem rgba(102, 126, 234, 0.25)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#e9ecef';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="categoria" className="form-label fw-bold text-dark">
                      🏷️ Categoría
                    </label>
                    <select
                      className="form-select form-select-lg"
                      id="categoria"
                      name="categoria"
                      value={producto.categoria}
                      onChange={handleChange}
                      required
                      disabled={loading}
                      style={{
                        borderRadius: '15px',
                        border: '2px solid #e9ecef',
                        transition: 'all 0.3s ease'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#667eea';
                        e.target.style.boxShadow = '0 0 0 0.2rem rgba(102, 126, 234, 0.25)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#e9ecef';
                        e.target.style.boxShadow = 'none';
                      }}
                    >
                      <option value="">Seleccione una categoría</option>
                      {categorias.map((categoria) => (
                        <option key={categoria.id} value={categoria.id}>
                          {categoria.nombre}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="text-center">
                    <button 
                      type="submit" 
                      className="btn btn-lg px-5 py-3" 
                      disabled={loading}
                      style={{
                        background: loading ? '#6c757d' : 'linear-gradient(45deg, #667eea, #764ba2)',
                        border: 'none',
                        borderRadius: '25px',
                        color: 'white',
                        fontWeight: 'bold',
                        transition: 'all 0.3s ease',
                        minWidth: '200px'
                      }}
                      onMouseEnter={(e) => {
                        if (!loading) {
                          e.target.style.transform = 'scale(1.05)';
                          e.target.style.boxShadow = '0 10px 20px rgba(102, 126, 234, 0.3)';
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrarProducto;