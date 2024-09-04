import React, { useState } from 'react';
import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import NavBar from '../navbar'; // Asegúrate de que la ruta de importación sea correcta

const Earnings: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedMarket, setSelectedMarket] = useState<string | null>(null);
  const [selectedAsset, setSelectedAsset] = useState<string | null>(null);
  const [selectedAmount, setSelectedAmount] = useState<string | null>(null);
  const [selectedTreasury, setSelectedTreasury] = useState<string | null>(null);

  const handleClaim = (market: string, asset: string, amount: string, treasury: string) => {
    setSelectedMarket(market);
    setSelectedAsset(asset);
    setSelectedAmount(amount);
    setSelectedTreasury(treasury);
    onOpen();
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
                  onClick={() => handleClaim('$pToken', '$ETH', '0.01', '0x00000')}
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
                  onClick={() => handleClaim('$EKUBO', '$STRK', '1000', '0x00000')}
                >
                  Claim
                </Button>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </Box>

      {/* Modal for Claiming Earnings */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Claim Earnings</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontWeight="bold">Market</Text>
            <Text mb="1rem">{selectedMarket}</Text>

            <Text fontWeight="bold">Asset to claim</Text>
            <Text mb="1rem">{selectedAsset}</Text>

            <Text fontWeight="bold">Total Amount</Text>
            <Text mb="1rem">{selectedAmount}</Text>

            <Text fontWeight="bold">Treasury Address</Text>
            <Text mb="1rem">{selectedTreasury}</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3}>
              Claim
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Earnings;
