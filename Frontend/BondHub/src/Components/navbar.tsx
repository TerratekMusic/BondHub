import React from 'react';
import { Link } from 'react-router-dom';

const NavBar: React.FC = () => {
  const navStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center', // Centrar elementos verticalmente
    position: 'fixed' as 'fixed', // Especifica la posición como 'fixed'
    top: 10,
    left: 30,
    right: 30,
    height: '60px', // Ajusta la altura según sea necesario
    backgroundColor: 'transparent', // Hacer transparente el fondo
    color: 'white',
    padding: '0', // Eliminar padding
    zIndex: 1000,
    boxShadow: 'none' // Eliminar sombra
  };

  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px'
  };

  return (
    <nav style={navStyle}>
      <div style={{ flexGrow: 0 }}> {/* Sección del logo */}
        <img src="/path/to/your/logo.png" alt="Logo" style={{ height: '50px' }} />
      </div>
      <div style={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}> {/* Sección de enlaces de navegación */}
        <Link to="/" style={linkStyle}>Home</Link>
        <Link to="/Marketlab" style={linkStyle}>Lab</Link>
        <Link to="/marketplace" style={linkStyle}>Marketplace</Link>
      </div>
      <div style={{ flexGrow: 0, color: 'white' }}> {/* Sección de conexión de la billetera */}
        Connect Wallet
      </div>
    </nav>
  );
};

export default NavBar;
