import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import {
  Box,
  Text,
  Button,
  Select,
  Heading,
  Input,
  VStack,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Center,
} from "@chakra-ui/react";
import NavBar from "../navbar";
import { Link } from "react-router-dom";
import abipToken from "../utils/pToken1ABI";
import { abiBond } from "../utils/bondExchangeABI";

const MarketLab: React.FC = () => {
  const [projectToken, setProjectToken] = useState("");
  const [blockchain, setBlockchain] = useState("");
  const [quantity, setQuantity] = useState("");
  const [payoutToken, setPayoutToken] = useState("ETH");
  const [vestingPeriod, setVestingPeriod] = useState("7 days");
  const [tokenPrice, setTokenPrice] = useState(0);
  const [treasuryAddress, setTreasuryAddress] = useState("");
  const [amount, setAmount] = useState(0);
  const [selectedTab, setSelectedTab] = useState(0);
  const [provider, setProvider] = useState<any>();
  const [signer, setSigner] = useState<any>();
  const [address, setAddress] = useState<any>();

  useEffect(() => {
    async function connectToWallet() {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();

      setProvider(provider);
      setSigner(signer);
      setAddress(address);
    }
    connectToWallet();
  }, []);

  const approveTokens = async (spenderAddress: string, amount: string) => {
    try {
      const contractERC20 = new ethers.Contract(
        projectToken,
        abipToken,
        signer
      );
      const tx = await contractERC20.approve(spenderAddress, amount);
      await tx.wait();
      console.log("Tokens approved successfully");
      // setTokenApproved(true);
      goToNextTab();
    } catch (error) {
      console.error("Error approving tokens:", error);
    }
  };

  const goToNextTab = () => {
    setSelectedTab((prevTab) => prevTab + 1);
  };

  const setTokenDetails = async (
    tokenAddress: string,
    tokenPrice: number,
    tokenAmount: number
  ) => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        "0xcD0B16Ef43eD4213bd3FFAB27170101F1b237f17",
        abiBond,
        signer
      );
      const tx = await contract.setTokenDetails(
        tokenAddress,
        tokenPrice,
        tokenAmount,
        { value: "0", gasLimit: 160000 }
      );
      await tx.wait();
      console.log("Token details set successfully");
      goToNextTab();
    } catch (error) {
      console.log("Error setting token details:", error);
    }
  };

  console.log("projectToken", projectToken);
  console.log("price", tokenPrice);
  console.log("amount", amount);

  return (
    <Box minH="100vh" color="white" padding="2rem">
      <NavBar /> {/* Barra de navegación */}
      <Box maxW="800px" mx="auto" mt="4rem">
        <Heading as="h2" size="xl" mb="1.5rem" textAlign="center">
          Create a Bond Market
        </Heading>

        <Tabs index={selectedTab} isFitted variant="enclosed">
          <TabList mb="1em">
            <Tab>Step 1</Tab>
            {/* <Tab>Step 2</Tab>
            <Tab>Step 3</Tab> */}
          </TabList>
          <TabPanels>
            <TabPanel>
              <VStack spacing="6" align="stretch">
                <Box>
                  <Text as="h6" mb="2">
                    Project Token
                  </Text>
                  <Input
                    bg="transparent"
                    color="white"
                    border="1px solid white"
                    _hover={{ borderColor: "gray.500" }}
                    _focus={{
                      borderColor: "white",
                      boxShadow: "0 0 0 1px white",
                    }}
                    value={projectToken}
                    onChange={(e) => setProjectToken(e.target.value)}
                  />
                </Box>
                <Box>
                  <Text as="h6" mb="2">
                    Blockchain
                  </Text>
                  <Select
                    bg="transparent"
                    color="white"
                    border="1px solid white"
                    _hover={{ borderColor: "gray.500" }}
                    _focus={{
                      borderColor: "white",
                      boxShadow: "0 0 0 1px white",
                    }}
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
                </Box>
                <Box>
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
                    _focus={{
                      borderColor: "white",
                      boxShadow: "0 0 0 1px white",
                    }}
                  />
                </Box>
                <Box textAlign="center">
                  <Button
                    onClick={() =>
                      approveTokens(
                        "0xcD0B16Ef43eD4213bd3FFAB27170101F1b237f17",
                        quantity
                      )
                    }
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
                  <Text as="h6" mb="2">
                    Payout Token
                  </Text>
                  <Select
                    bg="transparent"
                    color="white"
                    border="1px solid white"
                    _hover={{ borderColor: "gray.500" }}
                    _focus={{
                      borderColor: "white",
                      boxShadow: "0 0 0 1px white",
                    }}
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
                <Box>
                  <Text as="h6" mb="2">
                    Vesting Period
                  </Text>
                  <Select
                    bg="transparent"
                    color="white"
                    border="1px solid white"
                    _hover={{ borderColor: "gray.500" }}
                    _focus={{
                      borderColor: "white",
                      boxShadow: "0 0 0 1px white",
                    }}
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
                </Box>
                <Box>
                  <Text as="h6" mb="2">
                    Token Price
                  </Text>
                  <Input
                    type="number"
                    value={tokenPrice}
                    onChange={(e) => setTokenPrice(Number(e.target.value))}
                    bg="transparent"
                    color="white"
                    borderRadius="5px"
                    border="1px solid white"
                    outline="none"
                    _focus={{
                      borderColor: "white",
                      boxShadow: "0 0 0 1px white",
                    }}
                  />
                </Box>
                <Box>
                  <Text as="h6" mb="2">
                    Treasury Address
                  </Text>
                  <Input
                    bg="transparent"
                    color="white"
                    border="1px solid white"
                    _hover={{ borderColor: "gray.500" }}
                    _focus={{
                      borderColor: "white",
                      boxShadow: "0 0 0 1px white",
                    }}
                    value={treasuryAddress}
                    onChange={(e) => setTreasuryAddress(e.target.value)}
                  />
                </Box>
                <Box textAlign="center">
                  <Text as="h6" mb="2">
                    Token Address
                  </Text>
                  <Input
                    bg="transparent"
                    color="white"
                    border="1px solid white"
                    _hover={{ borderColor: "gray.500" }}
                    _focus={{
                      borderColor: "white",
                      boxShadow: "0 0 0 1px white",
                    }}
                    value={projectToken}
                    onChange={(e) => setProjectToken(e.target.value)}
                  />
                  <Text as="h6" mb="2">
                    amount
                  </Text>
                  <Input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    bg="transparent"
                    color="white"
                    borderRadius="5px"
                    border="1px solid white"
                    outline="none"
                    _focus={{
                      borderColor: "white",
                      boxShadow: "0 0 0 1px white",
                    }}
                  />
                  <Button
                    colorScheme="yellow"
                    mt="4"
                    onClick={() => setTokenDetails(projectToken, 3, 450)}
                  >
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
