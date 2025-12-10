import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Stack,
  ToggleButtonGroup,
  ToggleButton,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  IconButton,
  Alert,
  Divider,
} from '@mui/material';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import DeleteIcon from '@mui/icons-material/Delete';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { useGame } from '../context/GameContext';
import { Sex } from '../types';

export default function ParticipantsPage() {
  const navigate = useNavigate();
  const { gameMode, participants, addParticipant, removeParticipant } = useGame();
  
  const [name, setName] = useState('');
  const [sex, setSex] = useState<Sex | null>(null);

  // Validar si hay al menos un hombre y una mujer
  const hasMale = participants.some((p) => p.sex === 'masculino');
  const hasFemale = participants.some((p) => p.sex === 'femenino');
  const canStart = participants.length >= 2 && hasMale && hasFemale;

  const handleAddParticipant = () => {
    if (name.trim() && sex) {
      addParticipant({ name: name.trim(), sex });
      setName('');
      setSex(null);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && name.trim() && sex) {
      handleAddParticipant();
    }
  };

  const handleStartGame = () => {
    if (canStart) {
      navigate('/game');
    }
  };

  // Redirigir si no hay modo seleccionado
  if (!gameMode) {
    navigate('/mode');
    return null;
  }

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
          {/* Título */}
          <Box textAlign="center">
            <Typography variant="h4" fontWeight={700} gutterBottom color="text.primary">
              Agrega los Participantes
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Modo: <strong>{gameMode.toUpperCase()}</strong>
            </Typography>
          </Box>

          {/* Advertencia */}
          <Alert severity="info">
            La aplicación solo permite interacciones entre participantes de sexos opuestos
          </Alert>

          {/* Formulario */}
          <Card>
            <CardContent>
              <Stack spacing={2.5}>
                <TextField
                  label="Nombre o Apodo"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyPress={handleKeyPress}
                  fullWidth
                  variant="outlined"
                  autoComplete="off"
                />

                <Box>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Sexo:
                  </Typography>
                  <ToggleButtonGroup
                    value={sex}
                    exclusive
                    onChange={(_, newSex) => setSex(newSex)}
                    fullWidth
                  >
                    <ToggleButton value="masculino" sx={{ py: 1.5 }}>
                      <MaleIcon sx={{ mr: 1 }} />
                      Masculino
                    </ToggleButton>
                    <ToggleButton value="femenino" sx={{ py: 1.5 }}>
                      <FemaleIcon sx={{ mr: 1 }} />
                      Femenino
                    </ToggleButton>
                  </ToggleButtonGroup>
                </Box>

                <Button
                  variant="contained"
                  onClick={handleAddParticipant}
                  disabled={!name.trim() || !sex}
                  fullWidth
                  size="large"
                >
                  Agregar Participante
                </Button>
              </Stack>
            </CardContent>
          </Card>

          {/* Lista de participantes */}
          {participants.length > 0 && (
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Participantes ({participants.length})
                </Typography>

                <List>
                  {participants.map((participant, index) => (
                    <React.Fragment key={participant.id}>
                      <ListItem
                        secondaryAction={
                          <IconButton
                            edge="end"
                            onClick={() => removeParticipant(participant.id)}
                            color="error"
                          >
                            <DeleteIcon />
                          </IconButton>
                        }
                      >
                        <ListItemAvatar>
                          <Avatar
                            sx={{
                              bgcolor: participant.sex === 'masculino' ? 'primary.main' : 'secondary.main',
                            }}
                          >
                            {participant.sex === 'masculino' ? <MaleIcon /> : <FemaleIcon />}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={participant.name}
                          secondary={participant.sex === 'masculino' ? 'Masculino' : 'Femenino'}
                        />
                      </ListItem>
                      {index < participants.length - 1 && <Divider variant="inset" component="li" />}
                    </React.Fragment>
                  ))}
                </List>
              </CardContent>
            </Card>
          )}

          {/* Validaciones */}
          {participants.length > 0 && !canStart && (
            <Alert severity="warning">
              {participants.length < 2 && '⚠️ Necesitas al menos 2 participantes'}
              {participants.length >= 2 && !hasMale && '⚠️ Necesitas al menos 1 participante masculino'}
              {participants.length >= 2 && !hasFemale && '⚠️ Necesitas al menos 1 participante femenino'}
            </Alert>
          )}

          {/* Botón iniciar juego */}
          <Button
            variant="contained"
            size="large"
            onClick={handleStartGame}
            disabled={!canStart}
            endIcon={<PlayArrowIcon />}
            fullWidth
            sx={{ py: 2 }}
          >
            Iniciar Juego
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}
