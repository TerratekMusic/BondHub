// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react"; // Importa ChakraProvider
import theme from "./theme/theme"; // Importa tu tema personalizado
import Navbar from "./Components/navbar";
import Home from "./Components/pages/home";
import MarketLab from "./Components/pages/marketslab";
import Marketplace from "./Components/pages/marketplace";
import ClaimTokens from "./Components/pages/ClaimTokens";
import Earnings from "./Components/pages/earnings";
import TokenFaucet from "./Components/pages/tokenfaucet";

const App: React.FC = () => {
  return (
    <ChakraProvider theme={theme}>
      {" "}
      {/* Envolver la aplicación con ChakraProvider */}
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/marketLab" element={<MarketLab />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/claimtokens" element={<ClaimTokens />} />
          <Route path="/earnings" element={<Earnings />} />
          <Route path="/tokenfaucet" element={<TokenFaucet />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
};

export default App;
