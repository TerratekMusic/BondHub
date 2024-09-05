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
import React from "react";
import { useDisclosure } from "@chakra-ui/react"; // Asegúrate de importar useDisclosure

export default function EarningsModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();

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
          </ModalHeader>
          <ModalCloseButton />

          <ModalBody bgColor="#2d3748">
            <Grid templateColumns="repeat(2, 1fr)" gap={6} mb={4}>
              <GridItem>
                <Text fontWeight="bold">Market</Text>
                <Text>$pToken</Text>
              </GridItem>
              <GridItem>
                <Text fontWeight="bold">Asset to claim</Text>
                <Text>$ETH</Text>
              </GridItem>
              <GridItem>
                <Text fontWeight="bold">Total Amount</Text>
                <Text>0.01</Text>
              </GridItem>
              <GridItem>
                <Text fontWeight="bold">Treasury Address</Text>
                <Text>0x00000</Text>
              </GridItem>
            </Grid>

            <Divider mb={4} />
          </ModalBody>

          <ModalFooter justifyContent="center">
            <Button colorScheme="blue" onClick={onClose}>
              Claim
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
