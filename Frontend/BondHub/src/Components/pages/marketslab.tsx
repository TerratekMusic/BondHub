import React, { useState } from "react";
import { ethers } from "ethers";
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
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Center,
} from "@chakra-ui/react";
import NavBar from "../navbar";
import { Link } from "react-router-dom";

const MarketLab: React.FC = () => {
  const [projectToken, setProjectToken] = useState("");
  const [blockchain, setBlockchain] = useState("");
  const [quantity, setQuantity] = useState("");
  const [payoutToken, setPayoutToken] = useState("ETH");
  const [vestingPeriod, setVestingPeriod] = useState("7 days");
  const [tokenPrice, setTokenPrice] = useState("");
  const [treasuryAddress, setTreasuryAddress] = useState("");
  const [marketLaunched, setMarketLaunched] = useState(false);

  const approveTokens = async (spenderAddress: string, amount: string) => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();

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
      treasuryAddress,
    });
    setMarketLaunched(true); // Actualiza el estado para mostrar el contenido del Tab 3
  };

  return (
    <Box minH="100vh" color="white" padding="2rem">
      <NavBar /> {/* Barra de navegación */}
      <Box maxW="800px" mx="auto" mt="4rem">
        <Heading as="h2" size="xl" mb="1.5rem" textAlign="center">
          Create a Bond Market
        </Heading>

        <Tabs isFitted variant="enclosed">
          <TabList mb="1em">
            <Tab>Step 1</Tab>
            <Tab>Step 2</Tab> 
            <Tab>Step 3</Tab> 
          </TabList>
          <TabPanels>
            <TabPanel>
              <VStack spacing="6" align="stretch">
                <Box>
                  <Text as="h6" mb="2">Project Token</Text>
                  <Input
                    bg="transparent"
                    color="white"
                    border="1px solid white"
                    _hover={{ borderColor: "gray.500" }}
                    _focus={{ borderColor: "white", boxShadow: "0 0 0 1px white" }}
                    value={projectToken}
                    onChange={(e) => setProjectToken(e.target.value)}
                  />
                </Box>
                <Box>
                  <Text as="h6" mb="2">Blockchain</Text>
                  <Select
                    bg="transparent"
                    color="white"
                    border="1px solid white"
                    _hover={{ borderColor: "gray.500" }}
                    _focus={{ borderColor: "white", boxShadow: "0 0 0 1px white" }}
                    value={blockchain}
                    onChange={(e) => setBlockchain(e.target.value)}
                  >
                    <option style={{ color: "black" }} value="Kakarot">Kakarot</option>
                    <option style={{ color: "black" }} value="Starknet">Starknet</option>
                  </Select>
                </Box>
                <Box>
                  <Text as="h6" mb="2">Quantity</Text>
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
                <Box textAlign="center">
                  <Button
                    onClick={() => approveTokens("0xcD0B16Ef43eD4213bd3FFAB27170101F1b237f17", quantity)}
                    colorScheme="yellow"
                    mt="4"
                  >
                    Approve
                  </Button>
                </Box>
              </VStack>
            </TabPanel>
            <TabPanel>
              <VStack spacing="6" align="stretch">
                <Box>
                  <Text as="h6" mb="2">Payout Token</Text>
                  <Select
                    bg="transparent"
                    color="white"
                    border="1px solid white"
                    _hover={{ borderColor: "gray.500" }}
                    _focus={{ borderColor: "white", boxShadow: "0 0 0 1px white" }}
                    value={payoutToken}
                    onChange={(e) => setPayoutToken(e.target.value)}
                  >
                    <option style={{ color: "black" }} value="ETH">ETH</option>
                    <option style={{ color: "black" }} value="STRK">STRK</option>
                  </Select>
                </Box>
                <Box>
                  <Text as="h6" mb="2">Vesting Period</Text>
                  <Select
                    bg="transparent"
                    color="white"
                    border="1px solid white"
                    _hover={{ borderColor: "gray.500" }}
                    _focus={{ borderColor: "white", boxShadow: "0 0 0 1px white" }}
                    value={vestingPeriod}
                    onChange={(e) => setVestingPeriod(e.target.value)}
                  >
                    <option style={{ color: "black" }} value="7 days">7 days</option>
                    <option style={{ color: "black" }} value="15 days">15 days</option>
                  </Select>
                </Box>
                <Box>
                  <Text as="h6" mb="2">Token Price</Text>
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
                </Box>
                <Box>
                  <Text as="h6" mb="2">Treasury Address</Text>
                  <Input
                    bg="transparent"
                    color="white"
                    border="1px solid white"
                    _hover={{ borderColor: "gray.500" }}
                    _focus={{ borderColor: "white", boxShadow: "0 0 0 1px white" }}
                    value={treasuryAddress}
                    onChange={(e) => setTreasuryAddress(e.target.value)}
                  />
                </Box>
                <Box textAlign="center">
                  <Button colorScheme="yellow" mt="4" onClick={handleLaunchMarket}>
                    Launch Market
                  </Button>
                </Box>
              </VStack>
            </TabPanel>
            <TabPanel>
              <Center flexDirection="column" height="100%">
                <Heading as="h3" mb="2rem" color="green.400">
                  Success!
                </Heading>
                <Text as="h4" mb="4rem">
                  Bond market launched successfully.
                </Text>
                <Link to="/marketplace">
                  <Button colorScheme="teal">View Live Markets</Button>
                </Link>
              </Center>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
};

export default MarketLab;
