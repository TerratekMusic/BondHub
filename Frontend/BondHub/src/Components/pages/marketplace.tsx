// src/components/pages/Marketplace.tsx
import React from 'react';
import { Box, Heading, Table, Thead, Tbody, Tr, Th, Td, Button } from '@chakra-ui/react';

const Marketplace: React.FC = () => {
  const markets = [
    { id: 1, name: "X Token", price: "SXXX", ecosystem: "Kakarot", discount: "X%", vesting: "7 days" },
    { id: 2, name: "Ekubo", price: "SXXX", ecosystem: "Starknet", discount: "X%", vesting: "15 days" }
  ];

  return (
    <Box padding="10.5rem">
      <Heading as="h2" mb="2rem">Live markets</Heading>
      <Table variant="simple" size="md" backgroundColor="transparent" color="white" borderRadius="10px">
        <Thead>
          <Tr>
            <Th>Bond</Th>
            <Th>Bond Price</Th>
            <Th>Ecosystem</Th>
            <Th>Discount</Th>
            <Th>Vesting</Th>
            <Th></Th> {/* For the view more button */}
          </Tr>
        </Thead>
        <Tbody>
          {markets.map(market => (
            <Tr key={market.id}>
              <Td>{market.name}</Td>
              <Td>{market.price}</Td>
              <Td>{market.ecosystem}</Td>
              <Td>{market.discount}</Td>
              <Td>{market.vesting}</Td>
              <Td><Button colorScheme="teal">View more</Button></Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default Marketplace;
