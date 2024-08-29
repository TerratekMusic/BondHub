// Ejemplo de NavBar con React Router y tres columnas
import React from "react";
import { Link } from "react-router-dom";
// Import everything
import { ethers } from "ethers";

const NavBar: React.FC = () => {
  const navStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    position: "fixed" as "fixed", // Specify the position as 'fixed'
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "#000",
    color: "white",
    padding: "1rem 2rem",
    zIndex: 1000,
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
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
        {/* Logo section */}
        <img
          src="/path/to/your/logo.png"
          alt="Logo"
          style={{ height: "50px" }}
        />
      </div>
      <div style={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
        {" "}
        {/* Navigation links section */}
        <Link to="/" style={linkStyle}>
          Home
        </Link>
        <Link to="/dapp" style={linkStyle}>
          Markets Lab
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
