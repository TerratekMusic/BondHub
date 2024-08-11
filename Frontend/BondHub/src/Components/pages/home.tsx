// src/Components/pages/home.tsx
import React from 'react';
import { Link } from 'react-router-dom';


const Home: React.FC = () => {
  const containerStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center', // Asegura que el contenido se centre horizontalmente
    alignItems: 'center',     // Centra el contenido verticalmente
    height: '100vh',          // Altura completa de la ventana
    width: '100vw',           // Ancho completo de la ventana
  };

  const contentStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    textAlign: 'center',
    width: '100%',            // Ocupa solo el ancho necesario
    maxWidth: '600px',        // Máximo ancho para el contenido central
  };

  const buttonStyle = {
    margin: '10px',
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    background: '#333',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '5px',
  };

  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        <h1>BondHub</h1>
        <p>Build Robust Treasuries and Empower Your Token Holders with Bondhub.</p>
        <div>
          <Link to="/marketplace" style={buttonStyle}>Marketplace</Link>
          <Link to="/marketlab" style={buttonStyle}>MarketLab</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
