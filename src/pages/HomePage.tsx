import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Stack,
  Alert,
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { useGame } from '../context/GameContext';

export default function HomePage() {
  const navigate = useNavigate();
  const { resetGame } = useGame();

  const handleStart = () => {
    // Resetear todo al comenzar un nuevo juego
    resetGame();
    // Navegar a selección de modo
    navigate('/mode');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #FF9AA2 0%, #FFB7B2 100%)',
        py: 4,
      }}
    >
      <Container maxWidth="sm">
        <Stack spacing={4}>
          {/* Logo/Título principal */}
          <Box textAlign="center">
            <Typography
              variant="h2"
              sx={{
                fontWeight: 700,
                color: 'white',
                textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
                mb: 1,
              }}
            >
              💋 Verdad o Reto
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: 'rgba(255,255,255,0.9)',
                fontWeight: 300,
              }}
            >
              El juego más picante para adultos
            </Typography>
          </Box>

          {/* Card de advertencia */}
          <Card
            sx={{
              bgcolor: 'rgba(255,255,255,0.95)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <CardContent>
              <Alert severity="warning" sx={{ mb: 2 }}>
                <Typography variant="body2" fontWeight={600}>
                  🔞 CONTENIDO PARA ADULTOS
                </Typography>
              </Alert>

              <Stack spacing={1.5}>
                <Typography variant="body2" color="text.secondary">
                  ⚠️ Esta aplicación es <strong>solo para mayores de 18 años</strong>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  💑 Orientada a parejas y grupos heterosexuales
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  🔒 Todo el contenido es local y privado
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  🎮 Las interacciones son siempre entre sexos opuestos
                </Typography>
              </Stack>
            </CardContent>
          </Card>

          {/* Botón de comenzar */}
          <Button
            variant="contained"
            size="large"
            onClick={handleStart}
            endIcon={<PlayArrowIcon />}
            sx={{
              py: 2,
              fontSize: '1.2rem',
              fontWeight: 600,
              bgcolor: 'white',
              color: '#FF6B9D',
              '&:hover': {
                bgcolor: 'rgba(255,255,255,0.9)',
                transform: 'scale(1.05)',
              },
              transition: 'all 0.2s',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            }}
          >
            Comenzar Juego
          </Button>

          {/* Footer info */}
          <Typography
            variant="caption"
            align="center"
            sx={{
              color: 'rgba(255,255,255,0.8)',
              display: 'block',
            }}
          >
            Al continuar, confirmas que eres mayor de edad y aceptas el contenido adulto
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}
