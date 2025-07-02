import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-vh-100 d-flex flex-column" style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }}>
      {/* Header */}
      <header className="text-white text-center py-5" style={{
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.2)'
      }}>
        <div className="container">
          <h1 className="display-4 fw-bold mb-3" style={{
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
            animation: 'fadeInDown 1s ease-out'
          }}>
            🛍️ Gestión de Productos
          </h1>
          <p className="lead" style={{ animation: 'fadeInUp 1s ease-out 0.3s both' }}>
            Administra tus productos y categorías de forma fácil y eficiente
          </p>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-grow-1 d-flex align-items-center">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <h2 className="text-white text-center mb-5" style={{
                animation: 'fadeIn 1s ease-out 0.6s both'
              }}>
                ¿Qué deseas gestionar hoy?
              </h2>
              
              <div className="row g-4">
                {/* Card Productos */}
                <div className="col-md-6" style={{ animation: 'slideInLeft 1s ease-out 0.9s both' }}>
                  <div className="card h-100 border-0 shadow-lg" style={{
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(10px)',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
                  }}>
                    <div className="card-body text-center p-5">
                      <div className="mb-4" style={{ fontSize: '4rem' }}>📦</div>
                      <h3 className="card-title text-primary mb-3">Productos</h3>
                      <p className="card-text text-muted mb-4">
                        Gestiona tu inventario, precios y detalles de productos
                      </p>
                      <Link to="/productos" className="btn btn-primary btn-lg px-4" style={{
                        background: 'linear-gradient(45deg, #007bff, #0056b3)',
                        border: 'none',
                        borderRadius: '25px',
                        transition: 'all 0.3s ease'
                      }}>
                        Ver Productos
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Card Categorías */}
                <div className="col-md-6" style={{ animation: 'slideInRight 1s ease-out 0.9s both' }}>
                  <div className="card h-100 border-0 shadow-lg" style={{
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(10px)',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
                  }}>
                    <div className="card-body text-center p-5">
                      <div className="mb-4" style={{ fontSize: '4rem' }}>🏷️</div>
                      <h3 className="card-title text-success mb-3">Categorías</h3>
                      <p className="card-text text-muted mb-4">
                        Organiza y clasifica tus productos por categorías
                      </p>
                      <Link to="/categorias" className="btn btn-success btn-lg px-4" style={{
                        background: 'linear-gradient(45deg, #28a745, #1e7e34)',
                        border: 'none',
                        borderRadius: '25px',
                        transition: 'all 0.3s ease'
                      }}>
                        Ver Categorías
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-white text-center py-4" style={{
        background: 'rgba(0, 0, 0, 0.2)',
        backdropFilter: 'blur(10px)',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <div className="container">
          <p className="mb-0">&copy; 2025 Tu Empresa | Todos los derechos reservados ❤️</p>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
};

export default Home;