import React, { useState } from 'react';
import { Box, Button, Input, Text, VStack } from '@chakra-ui/react';
import { ethers } from 'ethers';
import abipToken from '../utils/pToken1ABI'; // Asegúrate de que la ruta sea correcta
import NavBar from '../navbar'; // Asegúrate de que la ruta sea correcta

const TokenFaucet: React.FC = () => {
  const [recipientAddress, setRecipientAddress] = useState<string>('');
  const [mintAmount, setMintAmount] = useState<string>('100'); // Puedes establecer un valor predeterminado
  const [message, setMessage] = useState<string>('');

  const handleMint = async () => {
    try {
      if (!recipientAddress) {
        setMessage('Please enter a valid address');
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        '0xc9483ca310ea13d4248620e9d1e1eb935edb8765', // dirección del contrato
        abipToken,
        signer
      );

      const tx = await contract.mint(recipientAddress, ethers.utils.parseUnits(mintAmount, 18));
      await tx.wait();
      setMessage('Mint successful!');
    } catch (error) {
      console.error('Minting error:', error);
      setMessage('Mint failed. Please try again.');
    }
  };

  return (
    <Box minH="100vh" color="white">
      <NavBar /> {/* Barra de navegación */}
      <Box maxW="500px" mx="auto" mt="8rem" textAlign="center">
        <Text as="h2" mb="4">Token Faucet</Text>
        <VStack spacing="4">
          <Input
            placeholder="Enter recipient address"
            value={recipientAddress}
            onChange={(e) => setRecipientAddress(e.target.value)}
            bg="transparent"
            color="white"
            border="1px solid white"
            _hover={{ borderColor: 'gray.500' }}
            _focus={{ borderColor: 'white', boxShadow: '0 0 0 1px white' }}
          />
          <Button colorScheme="blue" onClick={handleMint}>
            Mint pToken2
          </Button>
          {message && <Text mt="4">{message}</Text>}
        </VStack>
      </Box>
    </Box>
  );
};

export default TokenFaucet;
