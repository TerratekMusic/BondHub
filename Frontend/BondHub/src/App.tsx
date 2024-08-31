// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box } from '@chakra-ui/react'; // Importa el contenedor Box de Chakra UI
import Navbar from './Components/navbar';
import Home from './Components/pages/home';
import MarketLab from './Components/pages/marketslab';
import Marketplace from './Components/pages/marketplace'; // Asegúrate de que la ruta del import es correcta

const App: React.FC = () => {
  return (
    <Box bg="gray.100" minH="100vh"> {/* Aplica estilos globales con Chakra UI */}
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dapp" element={<MarketLab />} />
          <Route path="/marketplace" element={<Marketplace />} /> {/* Nueva ruta para Marketplace */}
        </Routes>
      </Router>
    </Box>
  );
};

export default App;
