import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Text } from '@chakra-ui/react';

const Home: React.FC = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minH="100vh"
      bg="linear-gradient(to right, #24243e, #302b63, #0f0c29)" // Aplica el degradado
      color="white"
    >
      <Box textAlign="center" maxW="600px" p="20px">
        <Text as="h1" fontSize="4xl" mb="4">
          BondHub
        </Text>
        <Text fontSize="xl" mb="8">
          Build Robust Treasuries and Empower Your Token Holders with Bondhub.
        </Text>
        <Box>
          <Link to="/marketplace">
            <Box
              as="button"
              backgroundColor="#333"
              color="white"
              padding="10px 20px"
              margin="10px"
              borderRadius="5px"
              fontSize="16px"
              cursor="pointer"
              textDecoration="none"
              _hover={{ backgroundColor: "#555" }}
            >
              Marketplace
            </Box>
          </Link>
          <Link to="/marketlab">
            <Box
              as="button"
              backgroundColor="#333"
              color="white"
              padding="10px 20px"
              margin="10px"
              borderRadius="5px"
              fontSize="16px"
              cursor="pointer"
              textDecoration="none"
              _hover={{ backgroundColor: "#555" }}
            >
              MarketLab
            </Box>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
