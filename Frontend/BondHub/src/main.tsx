import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react'; // Importa ChakraProvider
import App from './App.tsx';
import theme from './theme/theme.ts'; // Importa el tema personalizado
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ChakraProvider theme={theme}> {/* Envuélvelo con ChakraProvider y aplica el tema */}
      <App />
    </ChakraProvider>
  </StrictMode>,
);
