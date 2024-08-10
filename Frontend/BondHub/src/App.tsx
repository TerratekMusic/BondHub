// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/navbar';
import Home from './Components/pages/home';
import MarketLab from './Components/pages/marketslab';

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dapp" element={<MarketLab />} />
      </Routes>
    </Router>
  );
};

export default App;
