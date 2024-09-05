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
} from "@chakra-ui/react";
import { abiBond } from "../utils/bondExchangeABI";
import { ethers } from "ethers";
import React from "react";
import { useDisclosure } from "@chakra-ui/react"; // Asegúrate de importar useDisclosure

interface BondModalProps {
  price: number;
  tokenAddress: string;
  tokenAvailable: number;
}

const BondModal: React.FC<BondModalProps> = ({
  price,
  tokenAddress,
  tokenAvailable,
}) => {
  const OverlayOne = () => (
    <ModalOverlay bg="blackAlpha.800" backdropFilter="blur(10px)" />
  );

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = React.useState(<OverlayOne />);
  const [amount, setAmount] = React.useState("");
  const [token, setToken] = React.useState("");

  // Define the function to call buyBond
  async function callBuyBond(tokenAddress, amount) {
    try {
      console.log("Calling buyBond");
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contractBONDS = new ethers.Contract(
        "0x5Cf4EaF7dF69440671cB38A06a60EBB0ff86618c",
        abiBond,
        signer
      );

      setToken(tokenAddress);

      // Validate and checksum the token address
      // const checksummedAddress = ethers.utils.getAddress(tokenAddress);

      const tx = await contractBONDS.buyBond(token, {
        value: amount,
      });
      await tx.wait();
      console.log("Transaction hash:", tx.hash);
      await tx.wait();
      console.log("Transaction confirmed");
    } catch (error) {
      console.error("Error calling buyBond:", error);
    }
  }

  console.log("Amount:", amount);
  console.log("Token Address:", tokenAddress);

  return (
    <>
      <Button
        onClick={() => {
          setOverlay(<OverlayOne />);
          onOpen();
        }}
      >
        View Bond
      </Button>

      <Modal size="lg" isCentered isOpen={isOpen} onClose={onClose}>
        {overlay}
        <ModalContent bgColor="#2d3748">
          <ModalHeader>
            <Heading as="h3" size="lg">
              BondName
            </Heading>
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
                <Text>{price}</Text>
              </GridItem>
              <GridItem>
                <Text fontWeight="bold">% Discount</Text>
                <Text>X%</Text>
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
                  _hover={{ borderColor: "gray.500" }}
                  _focus={{
                    borderColor: "white",
                    boxShadow: "0 0 0 1px white",
                  }}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </GridItem>
              <GridItem>
                <Text fontWeight="bold">Total Amount</Text>
                <Text>X</Text>
              </GridItem>
            </Grid>
          </ModalBody>

          <ModalFooter justifyContent="flex-start">
            {" "}
            {/* Alinea a la izquierda */}
            <Button
              onClick={() => callBuyBond(tokenAddress, amount)}
              colorScheme="blue"
              mr={3}
            >
              Buy Bond
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default BondModal;
