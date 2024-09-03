import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Text,
  Heading,
} from "@chakra-ui/react";
import React from "react";

export default function BondModal() {
  const OverlayOne = () => (
    <ModalOverlay
      bg="blackAlpha.300"
      backdropFilter="blur(10px) hue-rotate(90deg)"
    />
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

      <Modal size="3xl" isCentered isOpen={isOpen} onClose={onClose}>
        {overlay}
        <ModalContent w="45rem">
          <ModalHeader>Modal Title</ModalHeader>
          <Heading>{"pToken3"}</Heading>

          <ModalCloseButton />
          <ModalBody>
            <Button>Buy Bond</Button>
            <Text>Custom backdrop filters!</Text>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
