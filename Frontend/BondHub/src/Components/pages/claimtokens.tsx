import React, { useState } from 'react';
import { Box, Heading, Table, Thead, Tbody, Tr, Th, Td, Button } from '@chakra-ui/react';
import NavBar from '../navbar';  // Asegúrate de que la ruta de importación sea correcta
import ClaimModal from '../molecules/claimModal';  // Asegúrate de que la ruta de importación sea correcta

const ClaimTokens: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedToken, setSelectedToken] = useState<string | null>(null);

  const handleClaim = (token: string) => {
    setSelectedToken(token);
    setIsModalOpen(true);  // Abrir el modal
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedToken(null);
  };

  return (
    <Box height="100vh" color="white" display="flex" flexDirection="column">
      <NavBar /> {/* Barra de navegación */}

      <Box flex="1" maxW="40rem" mx="auto" mt="10rem" textAlign="center">
        <Heading as="h2" mb="1.5rem">Claim your available tokens</Heading>
        
        <Table variant="simple" size="md" mt="3rem">
          <Thead>
            <Tr>
              <Th>Bond</Th>
              <Th>Quantity</Th>
              <Th>Status</Th>
              <Th></Th> {/* Columna para el botón */}
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>$pToken</Td>
              <Td>1</Td>
              <Td>Available</Td>
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
              <Td>Locked</Td>
              <Td>
                <Button
                  colorScheme="brand"
                  onClick={() => handleClaim('$EKUBO')}
                  isDisabled={true} // Botón deshabilitado si está bloqueado
                >
                  Claim
                </Button>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </Box>

      {/* Modal de claim */}
      {isModalOpen && selectedToken && (
        <ClaimModal token={selectedToken} onClose={closeModal} />
      )}
    </Box>
  );
};

export default ClaimTokens;
