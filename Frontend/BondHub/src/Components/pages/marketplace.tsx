// src/components/pages/Marketplace.tsx
import React, { useEffect } from "react";
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
} from "@chakra-ui/react";
import BondModal from "../molecules/bondModal";

const Marketplace: React.FC = () => {
  // const [projectToken2, setProjectToken2] = useState(
  //   "0xc9483ca310ea13d4248620e9d1e1eb935edb8765"
  // );

  const [data, setData] = useState({});

  useEffect(() => {
    async function getAllBonds() {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(
          "0x5Cf4EaF7dF69440671cB38A06a60EBB0ff86618c", // dirección del contrato
          abiBond,
          signer
        );
        // Call the getAllBonds function
        const bonds = await contract.getAllBonds();
        // Extract the target objects from the Proxy
        const extractedBonds = bonds.map((bond) => ({
          address1: bond[0],
          value1: bond[1],
          address2: bond[2],
          value2: bond[3],
          value3: bond[4],
        }));

        // Format the extracted data into the required string format
        const formattedData = extractedBonds
          .map(
            (bond) =>
              `${bond.address1},${bond.value1},${bond.address2},${bond.value2},${bond.value3}`
          )
          .join(",");

        setData({
          "0": `tuple(address,uint256,address,uint256,uint256)[]: ${formattedData}`,
        });
      } catch (error) {
        console.error("Error fetching bonds:", error);
      }
    }

    getAllBonds();
  }, []);
  const parseBondsData = (data) => {
    if (!data || !data["0"]) {
      return [];
    }

    const bondsString = data["0"];
    const bondsArray = bondsString.split(":")[1].split(",");

    const bonds = [];
    for (let i = 0; i < bondsArray.length; i += 5) {
      bonds.push({
        address1: bondsArray[i],
        value1: bondsArray[i + 1],
        address2: bondsArray[i + 2],
        value2: bondsArray[i + 3],
        value3: bondsArray[i + 4],
      });
    }

    return bonds;
  };

  const bonds = parseBondsData(data);

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
            <Th>Bond Address</Th>
            <Th>Bond Price</Th>
            <Th>Tokens Available</Th>
            <Th>Total gWei Collected</Th>
            <Th></Th>
            {/* For the view more button */}
          </Tr>
        </Thead>
        <Tbody>
          {bonds.map((bond, index) => (
            <Tr key={index}>
              <Td>{bond.address1}</Td>
              <Td>{bond.value1}</Td>
              <Td>{bond.value2}</Td>
              <Td>{bond.value3}</Td>
              <Td>
                <BondModal
                  price={bond.value1}
                  tokenAddress={bond.address1}
                  tokenAvailable={bond.value2}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default Marketplace;
