import React, { useState } from "react";
import { ethers } from "ethers";
import abipToken from "../utils/pToken1ABI";
import { abiBond } from "../utils/bondExchangeABI";
import {
  Box,
  Text,
  Button,
  Select,
  Divider,
  Heading,
  Input,
  VStack,
  HStack,
} from "@chakra-ui/react";
import NavBar from "../navbar";

const MarketLab: React.FC = () => {
  // Estado para almacenar los valores seleccionados por el usuario
  const [projectToken, setProjectToken] = useState("");
  const [blockchain, setBlockchain] = useState("");
  const [payoutToken, setPayoutToken] = useState("ETH");
  const [vestingPeriod, setVestingPeriod] = useState("7 days");
  const [quantity, setQuantity] = useState("");
  const [tokenPrice, setTokenPrice] = useState("");
  const [treasuryAddress, setTreasuryAddress] = useState("");

  //blockchain data
  const [address, setAddress] = useState<string>("");
  const [contractBondAddress, setContractBond] =
    useState<ethers.Contract | null>(null);
  const pTokenABI = abipToken;

  async function getBalance() {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const address = await signer.getAddress();

    setAddress(address);
    const contract = new ethers.Contract(
      "0x75cA8EDB2003744D23FE61658e472943D85Bb3dB",
      abipToken,
      signer
    );
    const balance = await contract.balanceOf(address);
    console.log("balance 1", balance);
    console.log(`Raw balance: ${balance.toString()}`);
    const formattedBalance = ethers.utils.formatUnits(balance, "gwei");
    console.log(formattedBalance);
    // console.log(`Balance: ${ethers.utils.formatUnits(balance, 18)} tokens`);
  }

  async function getBalanceBondContract(address: string) {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    setAddress(address);
    const contract = new ethers.Contract(
      "0x75cA8EDB2003744D23FE61658e472943D85Bb3dB",
      abipToken,
      signer
    );
    const balance = await contract.balanceOf(address);
    console.log("balance 1", balance);
    console.log(`Raw balance: ${balance.toString()}`);
    const formattedBalance = ethers.utils.formatUnits(balance, "gwei");
    console.log(formattedBalance);
    // console.log(`Balance: ${ethers.utils.formatUnits(balance, 18)} tokens`);
  }

  const approveTokens = async (spenderAddress: string, amount: string) => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();

      setAddress(address);
      const contract = new ethers.Contract(
        "0x75cA8EDB2003744D23FE61658e472943D85Bb3dB",
        abipToken,
        signer
      );
      const tx = await contract.approve(spenderAddress, amount);
      await tx.wait();
      console.log("Tokens approved successfully");
    } catch (error) {
      console.error("Error approving tokens:", error);
    }
  };

  const handleLaunchMarket = () => {
    console.log("Launching market with:", {
      projectToken,
      blockchain,
      payoutToken,
      vestingPeriod,
      quantity,
      tokenPrice,
    });
    // Aquí se integraría la lógica para interactuar con el contrato inteligente
  };

  console.log("address", address);
  console.log("quanity", quantity);
  console.log("tokenAddress", projectToken);

  return (
    <Box minH="100vh" color="white" padding="2rem">
      <NavBar /> {/* Barra de navegación */}
      <Box maxW="800px" mx="auto" mt="4rem">
        {" "}
        {/* Contenedor centralizado */}
        <Heading as="h2" size="xl" mb="1.5rem" textAlign="center">
          Create a Bond Market
        </Heading>
        <VStack spacing="6" align="stretch">
          {" "}
          {/* Contenedor vertical para alinear los elementos */}
          {/* Selección del Token del Proyecto */}
          <Box>
            <Text as="h6" mb="2">
              Project Token
            </Text>
            <Input
              bg="transparent"
              color="white"
              border="1px solid white"
              _hover={{ borderColor: "gray.500" }}
              _focus={{ borderColor: "white", boxShadow: "0 0 0 1px white" }}
              value={projectToken}
              onChange={(e) => setProjectToken(e.target.value)}
            ></Input>
          </Box>
          {/* Selección de la Blockchain */}
          {/* <Box>
            <Text as="h6" mb="2">
              Blockchain
            </Text>
            <Select
              bg="transparent"
              color="white"
              border="1px solid white"
              _hover={{ borderColor: "gray.500" }}
              _focus={{ borderColor: "white", boxShadow: "0 0 0 1px white" }}
              value={blockchain}
              onChange={(e) => setBlockchain(e.target.value)}
            >
              <option style={{ color: "black" }} value="Kakarot">
                Kakarot
              </option>
              <option style={{ color: "black" }} value="Starknet">
                Starknet
              </option>
            </Select>
          </Box> */}
          {/* Seteo smart contract treasury */}
          {/* <Box>
            <Text as="h6" mb="2">
              Treasury Address
            </Text>
            <Input
              bg="transparent"
              color="white"
              border="1px solid white"
              _hover={{ borderColor: "gray.500" }}
              _focus={{ borderColor: "white", boxShadow: "0 0 0 1px white" }}
              value={blockchain}
              onChange={(e) => setTreasuryAddress(e.target.value)}
            ></Input>
          </Box> */}
          <Divider borderColor="gray.600" />
          {/* Detalles del Mercado */}
          <HStack spacing="4">
            {/* Selección del Payout Token */}
            <Box flex="1">
              <Text as="h6" mb="2">
                Payout Token
              </Text>
              <Select
                bg="transparent"
                color="white"
                border="1px solid white"
                _hover={{ borderColor: "gray.500" }}
                _focus={{ borderColor: "white", boxShadow: "0 0 0 1px white" }}
                value={payoutToken}
                onChange={(e) => setPayoutToken(e.target.value)}
              >
                <option style={{ color: "black" }} value="ETH">
                  ETH
                </option>
                <option style={{ color: "black" }} value="STRK">
                  STRK
                </option>
              </Select>
            </Box>

            {/* Período de Vesting */}
            {/* <Box flex="1">
              <Text as="h6" mb="2">
                Vesting Period
              </Text>
              <Select
                bg="transparent"
                color="white"
                border="1px solid white"
                _hover={{ borderColor: "gray.500" }}
                _focus={{ borderColor: "white", boxShadow: "0 0 0 1px white" }}
                value={vestingPeriod}
                onChange={(e) => setVestingPeriod(e.target.value)}
              >
                <option style={{ color: "black" }} value="7 days">
                  7 days
                </option>
                <option style={{ color: "black" }} value="15 days">
                  15 days
                </option>
              </Select>
            </Box> */}

            {/* Cantidad de Tokens */}
            <Box flex="1">
              <Text as="h6" mb="2">
                Quantity
              </Text>
              <Input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                bg="transparent"
                color="white"
                borderRadius="5px"
                border="1px solid white"
                outline="none"
                _focus={{ borderColor: "white", boxShadow: "0 0 0 1px white" }}
              />
            </Box>

            {/* Precio del Token */}
            {/* <Box flex="1">
              <Text as="h6" mb="2">
                Token Price
              </Text>
              <Input
                type="number"
                value={tokenPrice}
                onChange={(e) => setTokenPrice(e.target.value)}
                bg="transparent"
                color="white"
                borderRadius="5px"
                border="1px solid white"
                outline="none"
                _focus={{ borderColor: "white", boxShadow: "0 0 0 1px white" }}
              />
            </Box> */}
          </HStack>
          {/* <Box textAlign="center">
            <Button colorScheme="yellow" mt="4" onClick={handleLaunchMarket}>
              Launch market
            </Button>
          </Box> */}
          <Divider borderColor="gray.600" />
          <Box textAlign="center">
            <Button
              onClick={() =>
                approveTokens(
                  "0xcD0B16Ef43eD4213bd3FFAB27170101F1b237f17",
                  quantity
                )
              }
              colorScheme="gray"
              mt="4"
            >
              Add new market "approve"
            </Button>
          </Box>
          <Text>ESTo DE ABAJO ES para pruebas</Text>
          <Box textAlign="center">
            <Button onClick={getBalance}>getBalance</Button>
          </Box>
          <Box textAlign="center">
            <Button onClick={() => getBalanceBondContract(projectToken)}>
              getBalanceBond
            </Button>
          </Box>
        </VStack>
      </Box>
    </Box>
  );
};

export default MarketLab;
