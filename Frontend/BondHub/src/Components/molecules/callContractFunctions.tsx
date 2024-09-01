// import { useState } from "react";
// import { ethers } from "ethers";

// function CallContractFunctions() {
//   const [address, setAddress] = useState<string>("");
//   const [contract, setContract] = useState<ethers.Contract | null>(null);
//   const contractABI = [
//     // Add your contract's ABI here
//     "function setTokenDetails(address _tokenAddress, uint256 _tokenPrice, uint256 _tokenAmount) public payable",
//     "function buyBond(address token) external payable",
//     "function withdrawTokens(address token) external",
//     "function getTokenDetails(address _tokenAddress) public view returns (address, uint256, address)",
//     "function getBalance(address user, address token) public view returns (uint256)",
//     "function getTokenHolders(address token) public view returns (address[] memory)",
//   ];

//   const contractAddress = "YOUR_CONTRACT_ADDRESS_HERE";

//   const loginWithMetaMask = async () => {
//     const provider = new ethers.BrowserProvider(window.ethereum);
//     const signer = await provider.getSigner();
//     const address = await signer.getAddress();

//     setAddress(address);

//     // Instantiate the contract
//     const contractInstance = new ethers.Contract(
//       contractAddress,
//       contractABI,
//       signer
//     );
//     setContract(contractInstance);
//   };

//   const setTokenDetails = async (
//     tokenAddress: string,
//     tokenPrice: number,
//     tokenAmount: number
//   ) => {
//     if (!contract) return;
//     const tx = await contract.setTokenDetails(
//       tokenAddress,
//       tokenPrice,
//       tokenAmount,
//       {
//         value: ethers.utils.parseEther("0.1"), // Example value, adjust as needed
//       }
//     );
//     await tx.wait();
//     console.log("Token details set successfully");
//   };

//   const buyBond = async (token: string) => {
//     if (!contract) return;
//     const tx = await contract.buyBond(token, {
//       value: ethers.utils.parseEther("1"), // Example value, adjust as needed
//     });
//     await tx.wait();
//     console.log("Bond purchased successfully");
//   };

//   const withdrawTokens = async (token: string) => {
//     if (!contract) return;
//     const tx = await contract.withdrawTokens(token);
//     await tx.wait();
//     console.log("Tokens withdrawn successfully");
//   };

//   const getTokenDetails = async (tokenAddress: string) => {
//     if (!contract) return;
//     const details = await contract.getTokenDetails(tokenAddress);
//     console.log("Token Details:", details);
//     return details;
//   };

//   const getBalance = async (user: string, token: string) => {
//     if (!contract) return;
//     const balance = await contract.getBalance(user, token);
//     console.log("Balance:", balance);
//     return balance;
//   };

//   const getTokenHolders = async (token: string) => {
//     if (!contract) return;
//     const holders = await contract.getTokenHolders(token);
//     console.log("Token Holders:", holders);
//     return holders;
//   };
// }

// export { callContractFunctions };
