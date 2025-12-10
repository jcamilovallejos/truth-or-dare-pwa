import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { defaultTheme } from './theme/theme.ts';
import { GameProvider } from './context/GameContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GameProvider>
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </GameProvider>
  </React.StrictMode>,
);

// Registrar Service Worker para PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js', { scope: '/' })
      .then((registration) => {
        console.log('✅ Service Worker registrado:', registration);
      })
      .catch((error) => {
        console.log('❌ Error al registrar Service Worker:', error);
      });
  });
}
