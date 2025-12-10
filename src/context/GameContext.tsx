import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { GameMode, Participant, GameAction } from '../types';

// Interfaz del contexto
interface GameContextType {
  // Estado
  gameMode: GameMode | null;
  participants: Participant[];
  currentPlayerIndex: number;
  gameHistory: GameAction[];
  
  // Funciones
  setGameMode: (mode: GameMode) => void;
  addParticipant: (participant: Omit<Participant, 'id'>) => void;
  removeParticipant: (id: string) => void;
  nextTurn: () => void;
  addToHistory: (action: GameAction) => void;
  resetGame: () => void;
  resetParticipants: () => void;
}

// Crear contexto con valor por defecto
const GameContext = createContext<GameContextType | undefined>(undefined);

// Clave para localStorage
const STORAGE_KEY = 'truth-or-dare-data';

// Interfaz de datos guardados en localStorage
interface StoredData {
  participants: Participant[];
  gameMode: GameMode | null;
}

// Provider del contexto
export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Estados
  const [gameMode, setGameModeState] = useState<GameMode | null>(null);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState<number>(0);
  const [gameHistory, setGameHistory] = useState<GameAction[]>([]);

  // Cargar datos del localStorage al iniciar
  useEffect(() => {
    try {
      const storedData = localStorage.getItem(STORAGE_KEY);
      if (storedData) {
        const parsed: StoredData = JSON.parse(storedData);
        setParticipants(parsed.participants || []);
        setGameModeState(parsed.gameMode || null);
      }
    } catch (error) {
      console.error('Error loading data from localStorage:', error);
    }
  }, []);

  // Guardar en localStorage cuando cambian participantes o modo
  useEffect(() => {
    try {
      const dataToStore: StoredData = {
        participants,
        gameMode,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToStore));
    } catch (error) {
      console.error('Error saving data to localStorage:', error);
    }
  }, [participants, gameMode]);

  // Función para establecer el modo de juego
  const setGameMode = (mode: GameMode) => {
    setGameModeState(mode);
  };

  // Función para agregar participante
  const addParticipant = (participant: Omit<Participant, 'id'>) => {
    const newParticipant: Participant = {
      ...participant,
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    };
    setParticipants((prev) => [...prev, newParticipant]);
  };

  // Función para eliminar participante
  const removeParticipant = (id: string) => {
    setParticipants((prev) => prev.filter((p) => p.id !== id));
    // Si eliminamos al jugador actual, ajustar el índice
    if (currentPlayerIndex >= participants.length - 1) {
      setCurrentPlayerIndex(Math.max(0, participants.length - 2));
    }
  };

  // Función para pasar al siguiente turno
  const nextTurn = () => {
    setCurrentPlayerIndex((prev) => {
      if (participants.length === 0) return 0;
      return (prev + 1) % participants.length;
    });
  };

  // Función para agregar acción al historial
  const addToHistory = (action: GameAction) => {
    setGameHistory((prev) => [...prev, action]);
  };

  // Función para resetear el juego completo
  const resetGame = () => {
    setGameModeState(null);
    setParticipants([]);
    setCurrentPlayerIndex(0);
    setGameHistory([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  // Función para resetear solo participantes (mantener modo)
  const resetParticipants = () => {
    setParticipants([]);
    setCurrentPlayerIndex(0);
    setGameHistory([]);
  };

  const value: GameContextType = {
    gameMode,
    participants,
    currentPlayerIndex,
    gameHistory,
    setGameMode,
    addParticipant,
    removeParticipant,
    nextTurn,
    addToHistory,
    resetGame,
    resetParticipants,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

// Hook personalizado para usar el contexto
export const useGame = (): GameContextType => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame debe usarse dentro de un GameProvider');
  }
  return context;
};
