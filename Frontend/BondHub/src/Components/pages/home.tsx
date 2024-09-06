import React from "react";
import { Link } from "react-router-dom";
import { Box, Text, Button } from "@chakra-ui/react";
import generalBg from "../../assets/images/generalbg.png";

const Home: React.FC = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minH="100vh"
      color="white"
      bgImage={generalBg}
      bgRepeat={"no-repeat"}
      bgSize={"cover"}
    >
      <Box textAlign="center" maxW="600px" p="20px">
        <Text as="h1">Bondhub</Text>
        <Text as="h2" fontSize="xl">
          Build Robust Treasuries and Empower Your Token Holders
        </Text>
        <Box mt="4">
          <Link to="/marketlab">
            <Button
              variant="solid"
              colorScheme="brand" // Usa los estilos definidos en el tema
              margin="10px"
            >
              Markets Lab
            </Button>
          </Link>
          <Link to="/marketplace">
            <Button
              variant="solid"
              colorScheme="brand" // Usa los estilos definidos en el tema
              margin="10px"
            >
              Marketplace
            </Button>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
