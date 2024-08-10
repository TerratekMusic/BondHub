// Ejemplo de NavBar con React Router y tres columnas
import React from 'react';
import { Link } from 'react-router-dom';

const NavBar: React.FC = () => {
  const navStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'fixed' as 'fixed', // Specify the position as 'fixed'
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#000',
    color: 'white',
    padding: '1rem 2rem',
    zIndex: 1000,
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)'
  };

  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px'
  };

  return (
    <nav style={navStyle}>
      <div style={{ flexGrow: 0 }}> {/* Logo section */}
        <img src="/path/to/your/logo.png" alt="Logo" style={{ height: '50px' }} />
      </div>
      <div style={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}> {/* Navigation links section */}
        <Link to="/" style={linkStyle}>Home</Link>
        <Link to="/dapp" style={linkStyle}>Markets Lab</Link>
        <Link to="/marketplace" style={linkStyle}>Marketplace</Link>
      </div>
      <div style={{ flexGrow: 0, color: 'white' }}> {/* Wallet connect section */}
        Connect Wallet
      </div>
    </nav>
  );
};

export default NavBar;
