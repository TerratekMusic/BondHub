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
  Spinner,
} from "@chakra-ui/react";
import NavBar from "../navbar";
import { Link } from "react-router-dom";
import abipToken from "../utils/pToken1ABI";
import { abiBond } from "../utils/bondExchangeABI";
import generalBg from "../../assets/images/generalbg.png";

const MarketLab: React.FC = () => {
  const [projectToken, setProjectToken] = useState("");
  const [blockchain, setBlockchain] = useState("");
  const [quantity, setQuantity] = useState("");
  const [payoutToken, setPayoutToken] = useState("ETH");
  const [vestingPeriod, setVestingPeriod] = useState("7 days");
  const [tokenPrice, setTokenPrice] = useState("");
  const [selectedTab, setSelectedTab] = useState(0);
  const [signer, setSigner] = useState<any>();
  const [isLoading, setIsLoading] = useState(false); // Estado para manejar el spinner

  useEffect(() => {
    async function connectToWallet() {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      setSigner(signer);
    }
    connectToWallet();
  }, []);

  const approveTokens = async (spenderAddress: string, amount: string) => {
    setIsLoading(true); // Activa el spinner
    try {
      const contractERC20 = new ethers.Contract(
        projectToken,
        abipToken,
        signer
      );
      const tx = await contractERC20.approve(spenderAddress, amount);
      await tx.wait();
      console.log("Tokens approved successfully");
      goToNextTab();
    } catch (error) {
      console.error("Error approving tokens:", error);
    } finally {
      setIsLoading(false); // Desactiva el spinner
    }
  };

  const setTokenDetails = async (
    tokenAddress: string,
    tokenPrice: string,
    tokenAmount: string
  ) => {
    setIsLoading(true); // Activa el spinner
    try {
      const contract = new ethers.Contract(
        "0x5Cf4EaF7dF69440671cB38A06a60EBB0ff86618c",
        abiBond,
        signer
      );
      const tx = await contract.setTokenDetails(
        tokenAddress,
        tokenPrice,
        tokenAmount,
        { value: "0", gasLimit: 220000 }
      );
      await tx.wait();
      console.log("Token details set successfully");
      goToNextTab();
    } catch (error) {
      console.log("Error setting token details:", error);
    } finally {
      setIsLoading(false); // Desactiva el spinner
    }
  };

  const goToNextTab = () => {
    setSelectedTab((prevTab) => prevTab + 1);
  };

  return (
    <Box
      bgImage={generalBg}
      bgRepeat={"no-repeat"}
      bgSize={"cover"}
      minH="100vh"
      color="white"
      padding="2rem"
    >
      <NavBar /> {/* Barra de navegación */}
      <Box maxW="800px" mx="auto" mt="4rem">
        <Heading as="h2" size="xl" mb="1.5rem" textAlign="center">
          Create a Bond Market
        </Heading>

        <Tabs index={selectedTab} isFitted variant="enclosed">
          <TabList mb="1em">
            <Tab>Step 1</Tab>
            <Tab isDisabled={selectedTab < 1}>Step 2</Tab>
            <Tab isDisabled={selectedTab < 2}>Step 3</Tab>
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
                  {isLoading ? (
                    <Spinner size="lg" color="yellow.500" /> // Spinner mientras carga
                  ) : (
                    <Button
                      onClick={() =>
                        approveTokens(
                          "0x5Cf4EaF7dF69440671cB38A06a60EBB0ff86618c",
                          quantity
                        )
                      }
                      colorScheme="yellow"
                      mt="4"
                      isDisabled={isLoading} // Desactiva el botón mientras carga
                    >
                      Approve
                    </Button>
                  )}
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
                    onChange={(e) => setTokenPrice(e.target.value)}
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
                  {isLoading ? (
                    <Spinner size="lg" color="yellow.500" /> // Spinner mientras carga
                  ) : (
                    <Button
                      colorScheme="yellow"
                      mt="4"
                      onClick={() =>
                        setTokenDetails(projectToken, tokenPrice, quantity)
                      }
                      isDisabled={isLoading} // Desactiva el botón mientras carga
                    >
                      Launch Market
                    </Button>
                  )}
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
