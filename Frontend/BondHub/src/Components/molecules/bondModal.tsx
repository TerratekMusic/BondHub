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
import React from "react";
import { useDisclosure } from "@chakra-ui/react"; // Asegúrate de importar useDisclosure

export default function BondModal() {
  const OverlayOne = () => (
    <ModalOverlay bg="blackAlpha.800" backdropFilter="blur(10px)" />
  );

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = React.useState(<OverlayOne />);

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
              Bond Name
            </Heading>
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
                <Text>X</Text>
              </GridItem>
              <GridItem>
                <Text fontWeight="bold">% Discount</Text>
                <Text>X%</Text>
              </GridItem>
              <GridItem>
                <Text fontWeight="bold">Vesting</Text>
                <Text>7 Days</Text>
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
            <Button colorScheme="blue" mr={3}>
              Buy Bond
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
