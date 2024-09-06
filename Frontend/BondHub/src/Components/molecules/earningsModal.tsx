import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Text,
  Grid,
  GridItem,
  Divider,
} from "@chakra-ui/react";
import { ethers } from "ethers";
import { abiBond } from "../utils/bondExchangeABI";

import { useDisclosure } from "@chakra-ui/react"; // Asegúrate de importar useDisclosure

interface EarningsModalProps {
  token: string;
  availableQuantity: number;
  owner: string;
}

export default function EarningsModal({
  token,
  availableQuantity,
  owner,
}: EarningsModalProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  function shortenString(str: string): string {
    if (str.length > 4) {
      return `...${str.slice(-4)}`;
    }
    return str;
  }

  async function claimEarnings() {
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
    <>
      <Button onClick={onOpen} colorScheme="blue">
        Claim Earnings
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered size="lg">
        <ModalOverlay backdropFilter="blur(10px)" />
        <ModalContent bgColor="#2d3748">
          <ModalHeader bgColor="#2d3748">
            <Text fontSize="lg" fontWeight="bold">
              Claim Earnings
            </Text>
            <Text>{token}</Text>
          </ModalHeader>
          <ModalCloseButton />

          <ModalBody bgColor="#2d3748">
            <Grid templateColumns="repeat(2, 1fr)" gap={6} mb={4}>
              <GridItem>
                <Text fontWeight="bold">Market</Text>
              </GridItem>
              <GridItem>
                <Text fontWeight="bold">Asset to claim</Text>
                <Text>$ETH</Text>
              </GridItem>
              <GridItem>
                <Text fontWeight="bold">Total Amount in gwei</Text>
                <Text>{availableQuantity}</Text>
              </GridItem>
              <GridItem>
                <Text fontWeight="bold">Treasury Address</Text>
                <Text>{shortenString(owner)}</Text>
              </GridItem>
            </Grid>

            <Divider mb={4} />
          </ModalBody>

          <ModalFooter justifyContent="center">
            <Button colorScheme="blue" onClick={claimEarnings}>
              Claim
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
