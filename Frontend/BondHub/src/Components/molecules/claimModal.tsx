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
  import React from "react";
  
  interface ClaimModalProps {
    token: string;
    availableQuantity: number;
    onClose: () => void;
  }
  
  export default function ClaimModal({ token, availableQuantity, onClose }: ClaimModalProps) {
    return (
      <Modal size="lg" isCentered isOpen={true} onClose={onClose}>
        <ModalOverlay bg="blackAlpha.800" backdropFilter="blur(10px)" />
        <ModalContent>
          <ModalHeader>
            <Heading as="h3" size="lg">Claim {token}</Heading>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Grid templateColumns="repeat(2, 1fr)" gap={6} mb={4}>
              <GridItem>
                <Text fontWeight="bold">Asset</Text>
                <Text>{token}</Text>
              </GridItem>
              <GridItem>
                <Text fontWeight="bold">Available Quantity</Text>
                <Text>{availableQuantity}</Text>
              </GridItem>
            </Grid>
  
            <Divider mb={4} />
  
            <Grid templateColumns="repeat(2, 1fr)" gap={6} alignItems="center">
              <GridItem>
                <Text>{availableQuantity}</Text> {/* Aquí puedes agregar lógica para ajustar la cantidad a reclamar */}
              </GridItem>
            </Grid>
          </ModalBody>
  
          <ModalFooter justifyContent="flex-start">
            <Button colorScheme="blue" mr={3} onClick={() => console.log(`Claiming ${token}`)}>
              Claim
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  }
  