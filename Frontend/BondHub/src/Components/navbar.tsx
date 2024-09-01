// Ejemplo de NavBar con React Router y tres columnas
import React from "react";
import { Link } from "react-router-dom";
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
  const [contract, setContract] = React.useState<ethers.Contract | null>(null);

  const contractABI = [
    // Add your contract's ABI here
    "function setTokenDetails(address _tokenAddress, uint256 _tokenPrice, uint256 _tokenAmount) public payable",
    "function buyBond(address token) external payable",
    "function withdrawTokens(address token) external",
    "function getTokenDetails(address _tokenAddress) public view returns (address, uint256, address)",
    "function getBalance(address user, address token) public view returns (uint256)",
    "function getTokenHolders(address token) public view returns (address[] memory)",
  ];

  const contractAddress = "YOUR_CONTRACT_ADDRESS_HERE";

  const loginWithMetaMask = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const address = await signer.getAddress();

    setAddress(address);

    // Instantiate the contract
    const contractInstance = new ethers.Contract(
      contractAddress,
      contractABI,
      signer
    );
    setContract(contractInstance);
  };

  const setTokenDetails = async (
    tokenAddress: string,
    tokenPrice: number,
    tokenAmount: number
  ) => {
    if (!contract) return;
    const tx = await contract.setTokenDetails(
      tokenAddress,
      tokenPrice,
      tokenAmount,
      {
        value: ethers.utils.parseEther("0.1"), // Example value, adjust as needed
      }
    );
    await tx.wait();
    console.log("Token details set successfully");
  };

  const buyBond = async (token: string) => {
    if (!contract) return;
    const tx = await contract.buyBond(token, {
      value: ethers.utils.parseEther("1"), // Example value, adjust as needed
    });
    await tx.wait();
    console.log("Bond purchased successfully");
  };

  const withdrawTokens = async (token: string) => {
    if (!contract) return;
    const tx = await contract.withdrawTokens(token);
    await tx.wait();
    console.log("Tokens withdrawn successfully");
  };

  const getTokenDetails = async (tokenAddress: string) => {
    if (!contract) return;
    const details = await contract.getTokenDetails(tokenAddress);
    console.log("Token Details:", details);
    return details;
  };

  const getBalance = async (user: string, token: string) => {
    if (!contract) return;
    const balance = await contract.getBalance(user, token);
    console.log("Balance:", balance);
    return balance;
  };

  const getTokenHolders = async (token: string) => {
    if (!contract) return;
    const holders = await contract.getTokenHolders(token);
    console.log("Token Holders:", holders);
    return holders;
  };

  console.log(address);

  return (
    <nav style={navStyle}>
      <div style={{ flexGrow: 0 }}>
        {" "}
        {/* Sección del logo */}
        <img
          src="/src/assets/images/logo.png"
          alt="Logo"
          style={{ height: "50px" }}
        />
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
