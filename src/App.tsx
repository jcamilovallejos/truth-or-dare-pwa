import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { Box, CssBaseline } from '@mui/material';
import { useGame } from './context/GameContext';
import { createGameTheme } from './theme/theme';
import InstallPWA from './components/InstallPWA';

// Importar páginas
import HomePage from './pages/HomePage';
import ModeSelectionPage from './pages/ModeSelectionPage';
import ParticipantsPage from './pages/ParticipantsPage';
import GamePage from './pages/GamePage';

// Componente principal de rutas
function AppRoutes() {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/mode" element={<ModeSelectionPage />} />
        <Route path="/participants" element={<ParticipantsPage />} />
        <Route path="/game" element={<GamePage />} />
      </Routes>
      <InstallPWA />
    </Box>
  );
}

// Componente App principal
function App() {
  const { gameMode } = useGame();
  const theme = createGameTheme(gameMode || 'soft');

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
