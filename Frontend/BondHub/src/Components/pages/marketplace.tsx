// src/components/pages/Marketplace.tsx
import React from "react";
import { useState } from "react";
import { ethers } from "ethers";
import { abiBond } from "../utils/bondExchangeABI";
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
  Input,
} from "@chakra-ui/react";

const Marketplace: React.FC = () => {
  const [projectToken2, setProjectToken2] = useState("");
  const getTokenDetails = async (tokenAddress: string) => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        "0xcD0B16Ef43eD4213bd3FFAB27170101F1b237f17",
        abiBond,
        signer
      );
      const tx = await contract.getTokenDetails(tokenAddress);

      console.log("Token details get successfully", tx);
    } catch (error) {
      console.log("Error getting token details:", error);
    }
  };
  const markets = [
    {
      id: 1,
      name: "$pToken",
      price: "SXXX",
      ecosystem: "Kakarot",
      vesting: "7 days",
    },
    {
      id: 2,
      name: "Ekubo",
      price: "SXXX",
      ecosystem: "Starknet",
      vesting: "15 days",
    },
  ];

  return (
    <Box padding="10.5rem">
      <Heading as="h2" mb="2rem">
        Live markets
      </Heading>
      <Table
        variant="simple"
        size="md"
        backgroundColor="transparent"
        color="white"
        borderRadius="10px"
      >
        <Thead>
          <Tr>
            <Th>Bond</Th>
            <Th>Bond Price</Th>
            <Th>Blockchain</Th>
            <Th>Vesting</Th>
            <Th></Th> {/* For the view more button */}
          </Tr>
        </Thead>
        <Tbody>
          {markets.map((market) => (
            <Tr key={market.id}>
              <Td>{market.name}</Td>
              <Td>{market.price}</Td>
              <Td>{market.ecosystem}</Td>
              <Td>{market.vesting}</Td>
              <Td>
                <Button colorScheme="teal">View more</Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
        <Box textAlign="center">
          <Input
            placeholder="Token Address"
            value={projectToken2}
            onChange={(e) => setProjectToken2(e.target.value)}
          />
          <Button onClick={() => getTokenDetails(projectToken2)}>
            getBondDetails
          </Button>
        </Box>
      </Table>
    </Box>
  );
};

export default Marketplace;
