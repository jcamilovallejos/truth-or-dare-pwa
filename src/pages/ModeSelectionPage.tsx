import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardActionArea,
  Stack,
  Chip,
} from '@mui/material';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import FavoriteIcon from '@mui/icons-material/Favorite';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import { useGame } from '../context/GameContext';
import { GameMode } from '../types';

interface ModeCardProps {
  mode: GameMode;
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  onClick: () => void;
}

function ModeCard({ mode, icon, title, description, color, onClick }: ModeCardProps) {
  return (
    <Card
      sx={{
        background: `linear-gradient(135deg, ${color}15 0%, ${color}30 100%)`,
        border: `2px solid ${color}`,
        transition: 'all 0.3s',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: `0 8px 24px ${color}40`,
        },
      }}
    >
      <CardActionArea onClick={onClick} sx={{ p: 3 }}>
        <CardContent>
          <Box textAlign="center">
            <Box sx={{ fontSize: '3rem', mb: 2, color }}>
              {icon}
            </Box>
            <Typography variant="h5" fontWeight={600} gutterBottom color={color}>
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ minHeight: 60 }}>
              {description}
            </Typography>
            <Chip
              label={mode.toUpperCase()}
              sx={{
                mt: 2,
                bgcolor: color,
                color: 'white',
                fontWeight: 600,
              }}
            />
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default function ModeSelectionPage() {
  const navigate = useNavigate();
  const { setGameMode } = useGame();

  const handleModeSelect = (mode: GameMode) => {
    setGameMode(mode);
    navigate('/participants');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.default',
        py: 4,
      }}
    >
      <Container maxWidth="md">
        <Stack spacing={4}>
          {/* Título */}
          <Box textAlign="center">
            <Typography variant="h3" fontWeight={700} gutterBottom color="text.primary">
              Selecciona el Modo de Juego
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Cada modo mezcla automáticamente verdades y retos
            </Typography>
          </Box>

          {/* Cards de modos */}
          <Stack spacing={3}>
            <ModeCard
              mode="soft"
              icon={<FavoriteIcon sx={{ fontSize: 48 }} />}
              title="🌸 Suave"
              description="Rompehielos picantes, besos suaves, caricias sensuales. Perfecto para calentar motores sin llegar muy lejos."
              color="#FF9AA2"
              onClick={() => handleModeSelect('soft')}
            />

            <ModeCard
              mode="horny"
              icon={<LocalFireDepartmentIcon sx={{ fontSize: 48 }} />}
              title="🔥 Caliente"
              description="Toques íntimos, desnudez parcial, besos apasionados, masturbación mutua. Las cosas se ponen muy calientes."
              color="#FF6B9D"
              onClick={() => handleModeSelect('horny')}
            />

            <ModeCard
              mode="hot"
              icon={<WhatshotIcon sx={{ fontSize: 48 }} />}
              title="💋 Extremo"
              description="Sexo explícito, oral, penetración, sin límites. Solo para quienes están listos para TODO."
              color="#C72C41"
              onClick={() => handleModeSelect('hot')}
            />
          </Stack>

          {/* Nota informativa */}
          <Typography
            variant="caption"
            align="center"
            color="text.secondary"
            sx={{ display: 'block', mt: 2 }}
          >
            💡 Puedes cambiar el modo en cualquier momento reiniciando el juego
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}
