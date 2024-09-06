import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useDisclosure,
} from "@chakra-ui/react";
import { ethers } from "ethers";
import { abiBond } from "../utils/bondExchangeABI";

import NavBar from "../navbar";
import EarningsModal from "../molecules/earningsModal";
import generalBg from "../../assets/images/generalbg.png";

const Earnings: React.FC = () => {
  const [address, setAddress] = useState("");
  const [data, setData] = useState({});
  useEffect(() => {
    async function getAllBonds() {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        setAddress(address);

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
    <Box
      bgImage={generalBg}
      bgRepeat={"no-repeat"}
      bgSize={"cover"}
      minH="100vh"
      color="white"
      display="flex"
      flexDirection="column"
    >
      <NavBar /> {/* Barra de navegación */}
      <Box flex="1" maxW="60rem" mx="auto" mt="10rem" textAlign="center">
        <Heading as="h2" mb="1.5rem">
          Claim & transfer bond sales earnings
        </Heading>

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
            {bonds.map((bond, index) => (
              <Tr key={index}>
                <Td>{bond.address1}</Td>
                <Td>{bond.value1}</Td>
                <Td>{bond.value2}</Td>
                <Td>{bond.value3}</Td>
                <Td>
                  <EarningsModal
                    token={bond.address1}
                    availableQuantity={bond.value3}
                    owner={bond.address2}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default Earnings;
