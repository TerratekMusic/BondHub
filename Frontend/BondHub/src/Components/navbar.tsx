// Ejemplo de NavBar con React Router y tres columnas
import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";
// Import everything
import { ethers } from "ethers";

const NavBar: React.FC = () => {
  const navStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center", // Centrar elementos verticalmente
    position: "fixed" as "fixed", // Especifica la posición como 'fixed'
    top: 10,

    left: 30,
    right: 30,
    height: "60px", // Ajusta la altura según sea necesario
    backgroundColor: "transparent", // Hacer transparente el fondo
    color: "white",
    padding: "0", // Eliminar padding
    zIndex: 1000,
    boxShadow: "none", // Eliminar sombra
  };

  const linkStyle = {
    color: "white",
    textDecoration: "none",
    padding: "0.5rem 1rem",
    borderRadius: "4px",
  };

  const [address, setAddress] = React.useState<string>("");

  const loginWithMetaMask = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const address = await signer.getAddress();

    setAddress(address);
  };

  console.log(address);

  return (
    <nav style={navStyle}>
      <div style={{ flexGrow: 0 }}>
        {" "}
        {/* Sección del logo */}
        <img src={logo} alt="Logo" style={{ height: "50px" }} />
      </div>
      <div style={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
        {" "}
        {/* Sección de enlaces de navegación */}
        <Link to="/" style={linkStyle}>
          Home
        </Link>
        <Link to="/Marketlab" style={linkStyle}>
          Lab
        </Link>
        <Link to="/marketplace" style={linkStyle}>
          Marketplace
        </Link>
        <Link to="/claimTokens" style={linkStyle}>
          Claim
        </Link>
        <Link to="/earnings" style={linkStyle}>
          Earnings
        </Link>
        <Link to="/tokenFaucet" style={linkStyle}>
          Faucet
        </Link>
      </div>
      <div style={linkStyle}>
        <p>{address}</p>
      </div>
      <button onClick={loginWithMetaMask}>
        {" "}
        {/* Wallet connect section */}
        Connect Wallet
      </button>
    </nav>
  );
};

export default NavBar;
