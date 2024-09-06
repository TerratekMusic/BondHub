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
  Button,
} from "@chakra-ui/react";
import NavBar from "../navbar"; // Asegúrate de que la ruta de importación sea correcta
import ClaimModal from "../molecules/claimModal";
import generalBg from "../../assets/images/generalbg.png";
import { abiBond } from "../utils/bondExchangeABI"; // Asegúrate de que la ruta de importación sea correcta
import { ethers } from "ethers";
const ClaimTokens: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedToken, setSelectedToken] = useState<string | null>(null);
  const [address, setAddress] = useState("");
  const [data, setData] = useState({});

  useEffect(() => {
    // async function getBalance() {
    //   try {
    //     const provider = new ethers.BrowserProvider(window.ethereum);
    //     const signer = await provider.getSigner();
    //     const address = await signer.getAddress();
    //     const contract = new ethers.Contract(
    //       "0x5Cf4EaF7dF69440671cB38A06a60EBB0ff86618c",
    //       abiBond,
    //       signer
    //     );
    //     const balance = await contract.getBalance(
    //       "0x20D330A4C3a913b5915e899B8F5eeD3aA3915823",
    //       " 0xc9483CA310EA13D4248620e9D1e1EB935edb8765"
    //     );
    //     console.log("Balance", balance);
    //   } catch (error) {
    //     console.error("Error fetching bonds:", error);
    //   }
    // }
    // getBalance();
  }, []);

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

  const handleClaim = (token: string) => {
    setSelectedToken(token);
    setIsModalOpen(true); // Abrir el modal
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedToken(null);
  };

  return (
    <Box
      bgImage={generalBg}
      bgRepeat={"no-repeat"}
      bgSize={"cover"}
      height="100vh"
      color="white"
      display="flex"
      flexDirection="column"
    >
      <NavBar /> {/* Barra de navegación */}
      <Box flex="1" maxW="40rem" mx="auto" mt="10rem" textAlign="center">
        <Heading as="h2" mb="1.5rem">
          Claim your available tokens
        </Heading>

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
            {bonds.map((bond, index) => (
              <Tr key={index}>
                <Td>{bond.address1}</Td>
                <Td>{bond.value1}</Td>

                <Td>
                  <Button
                    colorScheme="blue"
                    onClick={() => handleClaim(bond.address1)}
                  >
                    Claim
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
      {/* Modal de claim */}
      {isModalOpen && selectedToken && (
        <ClaimModal
          availableQuantity={45}
          token={selectedToken}
          userAddress={address}
          onClose={closeModal}
        />
      )}
    </Box>
  );
};

export default ClaimTokens;
