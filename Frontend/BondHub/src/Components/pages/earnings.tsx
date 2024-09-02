import React from 'react';
import { Box, Heading, Table, Thead, Tbody, Tr, Th, Td, Button } from '@chakra-ui/react';
import NavBar from '../navbar';  // Asegúrate de que la ruta de importación sea correcta

const Earnings: React.FC = () => {
  const handleClaim = (market: string) => {
    console.log(`Claiming earnings for ${market}`);
    // Aquí iría la lógica para reclamar las ganancias del bono
  };

  return (
    <Box minH="100vh" color="white" display="flex" flexDirection="column">
      <NavBar /> {/* Barra de navegación */}

      <Box flex="1" maxW="60rem" mx="auto" mt="10rem" textAlign="center">
        <Heading as="h2" mb="1.5rem">Claim & transfer bond sales earnings</Heading>
        
        <Table variant="simple" size="md" mt="3rem">
          <Thead>
            <Tr>
              <Th>Market</Th>
              <Th>Sales</Th>
              <Th>Asset</Th>
              <Th>Amount</Th>
              <Th>Treasury</Th>
              <Th></Th> {/* Columna para el botón */}
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>$pToken</Td>
              <Td>5</Td>
              <Td>$ETH</Td>
              <Td>0.01</Td>
              <Td>0x00000</Td>
              <Td>
                <Button
                  colorScheme="brand" 
                  onClick={() => handleClaim('$pToken')}
                >
                  Claim
                </Button>
              </Td>
            </Tr>
            <Tr>
              <Td>$EKUBO</Td>
              <Td>10</Td>
              <Td>$STRK</Td>
              <Td>1000</Td>
              <Td>0x00000</Td>
              <Td>
                <Button
                  colorScheme="brand"
                  onClick={() => handleClaim('$EKUBO')}
                >
                  Claim
                </Button>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default Earnings;
