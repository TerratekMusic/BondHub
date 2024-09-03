import React, { useState } from "react";
import { Box, Button, Input, TagLabel, Text, VStack } from "@chakra-ui/react";
import { ethers } from "ethers";
import abipToken from "../utils/pToken1ABI"; // Asegúrate de que la ruta sea correcta
import NavBar from "../navbar"; // Asegúrate de que la ruta sea correcta

const TokenFaucet: React.FC = () => {
  const [contractAddress, setContractAddress] = useState("");
  const [recipientAddress, setRecipientAddress] = useState("");
  const [mintAmount, setMintAmount] = useState<string>("100"); // Puedes establecer un valor predeterminado
  const [message, setMessage] = useState<string>("");

  const handleMint = async () => {
    try {
      if (!recipientAddress) {
        setMessage("Please enter a valid address");
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress, // dirección del contrato
        abipToken,
        signer
      );

      const tx = await contract.mint(recipientAddress, mintAmount);
      await tx.wait();
      setMessage("Mint successful!");
    } catch (error) {
      console.error("Minting error:", error);
      setMessage("Mint failed. Please try again.");
    }
  };

  async function getBalance() {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    // const address = await signer.getAddress();

    const contract = new ethers.Contract(contractAddress, abipToken, signer);
    const balance = await contract.balanceOf(recipientAddress);
    console.log("balance 1", balance);
    console.log(`Raw balance: ${balance.toString()}`);
    const formattedBalance = ethers.utils.formatUnits(balance, "gwei");
    console.log(formattedBalance);
    // console.log(`Balance: ${ethers.utils.formatUnits(balance, 18)} tokens`);
  }

  return (
    <Box minH="100vh" color="white">
      <NavBar /> {/* Barra de navegación */}
      <Box maxW="500px" mx="auto" mt="8rem" textAlign="center">
        <Text as="h2" mb="4">
          Token Faucet
        </Text>
        <VStack spacing="4">
          <Text>Enter the recipient or user address </Text>
          <Input
            placeholder="Enter recipient address"
            value={recipientAddress}
            onChange={(e) => setRecipientAddress(e.target.value)}
            bg="transparent"
            color="white"
            border="1px solid white"
            _hover={{ borderColor: "gray.500" }}
            _focus={{ borderColor: "white", boxShadow: "0 0 0 1px white" }}
          />
          <label>Enter the contract address</label>
          <Input
            placeholder="Enter contract address"
            value={contractAddress}
            onChange={(e) => setContractAddress(e.target.value)}
            bg="transparent"
            color="white"
            border="1px solid white"
            _hover={{ borderColor: "gray.500" }}
            _focus={{ borderColor: "white", boxShadow: "0 0 0 1px white" }}
          />
          <Text>Amount</Text>
          <Input
            placeholder="Enter mint amount"
            value={mintAmount}
            onChange={(e) => setMintAmount(e.target.value)}
            bg="transparent"
            color="white"
            border="1px solid white"
            _hover={{ borderColor: "gray.500" }}
            _focus={{ borderColor: "white", boxShadow: "0 0 0 1px white" }}
          />
          <Button colorScheme="blue" onClick={handleMint}>
            Mint pToken2
          </Button>
          <Button colorScheme="blue" onClick={getBalance}>
            Balance pToken2
          </Button>
          {message && <Text mt="4">{message}</Text>}
        </VStack>
      </Box>
    </Box>
  );
};

export default TokenFaucet;
