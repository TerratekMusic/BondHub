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
  Divider,
} from "@chakra-ui/react";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { abiBond } from "../utils/bondExchangeABI";

interface ClaimModalProps {
  token: string;
  availableQuantity: number;
  userAddress: string;
  onClose: () => void;
}

export default function ClaimModal({
  token,
  availableQuantity,
  userAddress,
  onClose,
}: ClaimModalProps) {
  const [balance, setBalance] = useState("0");

  useEffect(() => {
    async function getBalance() {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const contract = new ethers.Contract(
          "0x5Cf4EaF7dF69440671cB38A06a60EBB0ff86618c",
          abiBond,
          provider
        );
        const balance = await contract.getBalance(userAddress, token);
        const balanceString = balance.toString();
        setBalance(balanceString);
        console.log(`Balance: ${balance.toString()}`);
      } catch (error) {
        console.error("Error calling getBalance:", error);
      }
    }
    getBalance();
  }, []);

  async function claimTokens() {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        "0x5Cf4EaF7dF69440671cB38A06a60EBB0ff86618c",
        abiBond,
        signer
      );

      const tx = await contract.withdrawTokens(token);
      console.log("Transaction hash:", tx.hash);
    } catch (error) {
      console.error("Error calling withdrawTokens:", error);
    }
  }

  return (
    <Modal size="lg" isCentered isOpen={true} onClose={onClose}>
      <ModalOverlay backdropFilter="blur(10px)" />
      <ModalContent bgColor="#2d3748">
        <ModalHeader>
          <Heading as="h3" size="lg">
            Claim {token}
          </Heading>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Grid templateColumns="repeat(2, 1fr)" gap={6} mb={4}>
            <GridItem>
              <Text fontWeight="bold">User Address</Text>
              <Text>{userAddress}</Text>
            </GridItem>
            <GridItem>
              <Text fontWeight="bold">Available Quantity</Text>
              <Text>{balance}</Text>
            </GridItem>
          </Grid>

          <Divider mb={4} />

          {/* <Grid templateColumns="repeat(2, 1fr)" gap={6} alignItems="center">
            <GridItem>
              <Text>{balance}</Text>{" "}
            
            </GridItem>
          </Grid> */}
        </ModalBody>

        <ModalFooter justifyContent="flex-start">
          <Button colorScheme="blue" mr={3} onClick={claimTokens}>
            Claim
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
