import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Stack,
  Avatar,
  Chip,
  Collapse,
  List,
  ListItem,
  ListItemText,
  Divider,
  Alert,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import HomeIcon from '@mui/icons-material/Home';
import { useGame } from '../context/GameContext';
import truthsAndDaresData from '../data/truthsAndDares.json';
import { GameData, TruthOrDare, TargetGender } from '../types';

export default function GamePage() {
  const navigate = useNavigate();
  const {
    gameMode,
    participants,
    currentPlayerIndex,
    gameHistory,
    nextTurn,
    addToHistory,
  } = useGame();

  const [currentAction, setCurrentAction] = useState<string | null>(null);
  const [currentPartner, setCurrentPartner] = useState<string | null>(null);
  const [currentType, setCurrentType] = useState<'truth' | 'dare' | null>(null);
  const [showHistory, setShowHistory] = useState(false);

  const data = truthsAndDaresData as GameData;

  // Redirigir si no hay participantes o modo
  useEffect(() => {
    if (!gameMode || participants.length < 2) {
      navigate('/participants');
    }
  }, [gameMode, participants, navigate]);

  if (!gameMode || participants.length === 0) {
    return null;
  }

  const currentPlayer = participants[currentPlayerIndex];

  // Función para generar acción
  const generateAction = () => {
    if (!currentPlayer) return;

    const mode = gameMode;
    const modeData = data[mode];

    // Decidir random entre verdad o reto (50/50)
    const type: 'truth' | 'dare' = Math.random() < 0.5 ? 'truth' : 'dare';
    const contentArray = type === 'truth' ? modeData.truths : modeData.dares;

    // Determinar categoría según el sexo del jugador actual
    let targetGender: TargetGender;
    if (currentPlayer.sex === 'masculino') {
      targetGender = 'male';
    } else {
      targetGender = 'female';
    }

    // Combinar las opciones: específicas para el género + genéricas
    const specificOptions = contentArray[
      targetGender === 'male' ? 'forMale' : 'forFemale'
    ] as TruthOrDare[];
    const anyOptions = contentArray.forAny as TruthOrDare[];
    const allOptions = [...specificOptions, ...anyOptions];

    // Seleccionar una acción random
    const selectedAction = allOptions[Math.floor(Math.random() * allOptions.length)];

    let finalAction = selectedAction.content;
    let partner: string | null = null;

    // Si requiere pareja, seleccionar del sexo opuesto
    if (selectedAction.requiresPartner) {
      const oppositeSexParticipants = participants.filter(
        (p) => p.sex !== currentPlayer.sex && p.id !== currentPlayer.id
      );

      if (oppositeSexParticipants.length > 0) {
        const randomPartner =
          oppositeSexParticipants[
            Math.floor(Math.random() * oppositeSexParticipants.length)
          ];
        partner = randomPartner.name;
        finalAction = finalAction.replace('{partner}', partner);
      }
    }

    // Guardar en el estado
    setCurrentAction(finalAction);
    setCurrentPartner(partner);
    setCurrentType(type);

    // Agregar al historial
    addToHistory({
      player: currentPlayer.name,
      action: finalAction,
      target: partner || undefined,
      type,
      mode,
      timestamp: Date.now(),
    });
  };

  // Función para siguiente turno
  const handleNextTurn = () => {
    setCurrentAction(null);
    setCurrentPartner(null);
    setCurrentType(null);
    nextTurn();
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.default',
        py: 4,
      }}
    >
      <Container maxWidth="sm">
        <Stack spacing={3}>
          {/* Header con jugador actual */}
          <Card
            sx={{
              background: `linear-gradient(135deg, ${'primary.main'} 0%, ${'secondary.main'} 100%)`,
            }}
          >
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Avatar
                  sx={{
                    width: 56,
                    height: 56,
                    bgcolor: 'white',
                    color: 'primary.main',
                  }}
                >
                  {currentPlayer.sex === 'masculino' ? <MaleIcon /> : <FemaleIcon />}
                </Avatar>
                <Box flex={1}>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                    Turno de:
                  </Typography>
                  <Typography variant="h5" fontWeight={700} color="white">
                    {currentPlayer.name}
                  </Typography>
                </Box>
                <Chip
                  label={gameMode.toUpperCase()}
                  sx={{
                    bgcolor: 'white',
                    color: 'primary.main',
                    fontWeight: 600,
                  }}
                />
              </Stack>
            </CardContent>
          </Card>

          {/* Botón generar */}
          {!currentAction && (
            <Button
              variant="contained"
              size="large"
              onClick={generateAction}
              fullWidth
              sx={{ py: 2.5, fontSize: '1.1rem', fontWeight: 600 }}
            >
              🎲 Generar Verdad o Reto
            </Button>
          )}

          {/* Mostrar acción generada */}
          {currentAction && (
            <Card
              sx={{
                borderLeft: '4px solid',
                borderColor: currentType === 'truth' ? 'primary.main' : 'secondary.main',
              }}
            >
              <CardContent>
                <Stack spacing={2}>
                  <Chip
                    label={currentType === 'truth' ? '💭 VERDAD' : '🎯 RETO'}
                    color={currentType === 'truth' ? 'primary' : 'secondary'}
                    sx={{ alignSelf: 'flex-start' }}
                  />

                  <Typography variant="h6" color="text.primary" sx={{ lineHeight: 1.6 }}>
                    {currentAction}
                  </Typography>

                  {currentPartner && (
                    <>
                      <Divider />
                      <Box>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          Con:
                        </Typography>
                        <Typography variant="h6" color="secondary.main">
                          {currentPartner}
                        </Typography>
                      </Box>
                    </>
                  )}

                  <Button
                    variant="contained"
                    onClick={handleNextTurn}
                    fullWidth
                    size="large"
                    sx={{ mt: 2 }}
                  >
                    Siguiente Turno
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          )}

          {/* Historial */}
          <Card>
            <CardContent>
              <Button
                onClick={() => setShowHistory(!showHistory)}
                endIcon={showHistory ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                fullWidth
                sx={{ justifyContent: 'space-between' }}
              >
                <Typography variant="body1" fontWeight={600}>
                  Historial ({gameHistory.length})
                </Typography>
              </Button>

              <Collapse in={showHistory}>
                {gameHistory.length === 0 ? (
                  <Alert severity="info" sx={{ mt: 2 }}>
                    Aún no hay acciones en el historial
                  </Alert>
                ) : (
                  <List sx={{ mt: 2 }}>
                    {gameHistory
                      .slice()
                      .reverse()
                      .map((item, index) => (
                        <React.Fragment key={item.timestamp}>
                          <ListItem alignItems="flex-start">
                            <ListItemText
                              primary={
                                <Stack direction="row" spacing={1} alignItems="center">
                                  <Typography variant="body1" fontWeight={600}>
                                    {item.player}
                                  </Typography>
                                  <Chip
                                    label={item.type === 'truth' ? 'V' : 'R'}
                                    size="small"
                                    color={item.type === 'truth' ? 'primary' : 'secondary'}
                                  />
                                </Stack>
                              }
                              secondary={
                                <>
                                  <Typography variant="body2" color="text.secondary">
                                    {item.action}
                                  </Typography>
                                  {item.target && (
                                    <Typography variant="caption" color="secondary.main">
                                      Con: {item.target}
                                    </Typography>
                                  )}
                                </>
                              }
                            />
                          </ListItem>
                          {index < gameHistory.length - 1 && <Divider />}
                        </React.Fragment>
                      ))}
                  </List>
                )}
              </Collapse>
            </CardContent>
          </Card>

          {/* Botón volver al inicio */}
          <Button
            variant="outlined"
            startIcon={<HomeIcon />}
            onClick={() => navigate('/')}
            fullWidth
          >
            Terminar Juego
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}
