import { GameMode } from '../types';

// Definición de paleta de colores por modo
interface ColorPalette {
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
}

// Paletas de colores para cada modo
export const colorPalettes: Record<GameMode, ColorPalette> = {
  soft: {
    primary: '#FF9AA2',      // Rosa pastel
    secondary: '#FFB7B2',    // Rosa claro
    background: '#FFF5F7',   // Fondo rosa muy claro
    surface: '#FFDFD3',      // Superficie rosa pálido
    text: '#4A4A4A',         // Texto gris oscuro
    textSecondary: '#757575' // Texto secundario gris
  },
  horny: {
    primary: '#FF6B9D',      // Rosa vibrante
    secondary: '#C44569',    // Rosa/rojo intenso
    background: '#FFF0F5',   // Fondo rosa lavanda
    surface: '#FFE4E9',      // Superficie rosa suave
    text: '#2C2C2C',         // Texto casi negro
    textSecondary: '#5A5A5A' // Texto secundario oscuro
  },
  hot: {
    primary: '#C72C41',      // Rojo intenso
    secondary: '#8B0000',    // Rojo oscuro
    background: '#1A0000',   // Fondo casi negro
    surface: '#2D0A0A',      // Superficie rojo muy oscuro
    text: '#FFFFFF',         // Texto blanco
    textSecondary: '#E0E0E0' // Texto secundario gris claro
  }
};

// Función helper para obtener colores por modo
export const getColorPalette = (mode: GameMode): ColorPalette => {
  return colorPalettes[mode];
};
