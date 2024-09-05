import React, { useState } from "react";
import { ethers } from "ethers";
import { Link } from "react-router-dom";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  Heading,
  Grid,
  GridItem,
  Input,
  Divider,
  Spinner,
  useDisclosure,
  VStack
} from "@chakra-ui/react";
import { abiBond } from "../utils/bondExchangeABI";

interface BondModalProps {
  price: number;
  tokenAddress: string;
  tokenAvailable: number;
  bondName: string;
  discountPercentage: number;
}

const BondModal: React.FC<BondModalProps> = ({
  price,
  tokenAddress,
  tokenAvailable,
  bondName,
  discountPercentage
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [txStatus, setTxStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const OverlayOne = () => (
    <ModalOverlay bg="blackAlpha.800" backdropFilter="blur(10px)" />
  );

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const calculateTotalAmount = () => {
    if (!amount || isNaN(Number(amount))) return "0";
    return (Number(amount) * price).toFixed(4);
  };

  const callBuyBond = async () => {
    if (!amount || isNaN(Number(amount))) {
      alert("Please enter a valid amount");
      return;
    }

    setIsLoading(true);
    setTxStatus('idle');
    setErrorMessage(null);

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contractBONDS = new ethers.Contract(
        "0x5Cf4EaF7dF69440671cB38A06a60EBB0ff86618c",
        abiBond,
        signer
      );

      const amountInWei = ethers.parseEther(amount);
      
      console.log("Amount in wei:", amountInWei.toString());
      console.log("Token address:", tokenAddress);

      const tx = await contractBONDS.buyBond(tokenAddress, {
        value: amountInWei
      });

      console.log("Transaction hash:", tx.hash);
      
      await tx.wait();
      console.log("Transaction confirmed");
      setTxStatus('success');
    } catch (error) {
      console.error("Error calling buyBond:", error);
      setTxStatus('error');
      if (error.reason) {
        console.error("Error reason:", error.reason);
        setErrorMessage(error.reason);
      } else if (error.message) {
        setErrorMessage(error.message);
      }
      if (error.code) console.error("Error code:", error.code);
      if (error.transaction) console.error("Failed transaction:", error.transaction);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button onClick={onOpen}>View Bond</Button>

      <Modal size="lg" isCentered isOpen={isOpen} onClose={onClose}>
        <OverlayOne />
        <ModalContent bgColor="#2d3748">
          <ModalHeader>
            <Heading as="h3" size="lg">{bondName}</Heading>
            <Text>{tokenAddress}</Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Grid templateColumns="repeat(2, 1fr)" gap={6} mb={4}>
              <GridItem>
                <Text fontWeight="bold">Payout token</Text>
                <Text>ETH</Text>
              </GridItem>
              <GridItem>
                <Text fontWeight="bold">Blockchain</Text>
                <Text>Kakarot</Text>
              </GridItem>
              <GridItem>
                <Text fontWeight="bold">Price</Text>
                <Text>{price} ETH</Text>
              </GridItem>
              <GridItem>
                <Text fontWeight="bold">% Discount</Text>
                <Text>{discountPercentage}%</Text>
              </GridItem>
              <GridItem>
                <Text fontWeight="bold">Vesting</Text>
                <Text>7 Days</Text>
              </GridItem>
              <GridItem>
                <Text fontWeight="bold">Available Tokens</Text>
                <Text>{tokenAvailable}</Text>
              </GridItem>
            </Grid>

            <Divider mb={4} />

            <Grid templateColumns="repeat(2, 1fr)" gap={6} alignItems="center">
              <GridItem>
                <Text fontWeight="bold">Qty to buy</Text>
                <Input
                  placeholder="Enter quantity"
                  bg="gray.700"
                  color="white"
                  borderRadius="md"
                  value={amount}
                  onChange={handleAmountChange}
                  _hover={{ borderColor: "gray.500" }}
                  _focus={{
                    borderColor: "white",
                    boxShadow: "0 0 0 1px white",
                  }}
                />
              </GridItem>
              <GridItem>
                <Text fontWeight="bold">Total Amount</Text>
                <Text>{calculateTotalAmount()} ETH</Text>
              </GridItem>
            </Grid>
          </ModalBody>

          <ModalFooter>
            <VStack align="stretch" width="100%">
              {isLoading ? (
                <Spinner size="lg" color="yellow.500" alignSelf="center" />
              ) : txStatus === 'success' ? (
                <>
                  <Button colorScheme="green" width="100%">
                    <Link to="/claimtokens">View My Bonds</Link>
                  </Button>
                  <Text color="green.400" fontWeight="bold" alignSelf="center">
                    Transaction Successful!
                  </Text>
                </>
              ) : (
                <>
                  <Button
                    onClick={callBuyBond}
                    colorScheme="blue"
                    width="100%"
                    isDisabled={isLoading || !amount}
                  >
                    Buy Bond
                  </Button>
                  {txStatus === 'error' && errorMessage && (
                    <Text color="red.400" fontWeight="bold" alignSelf="center">
                      Error: {errorMessage}
                    </Text>
                  )}
                </>
              )}
            </VStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default BondModal;