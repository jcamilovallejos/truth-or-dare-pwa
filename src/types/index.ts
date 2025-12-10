// Tipos de modos de juego
export type GameMode = 'soft' | 'horny' | 'hot';

// Tipos de contenido
export type ContentType = 'truth' | 'dare';

// Sexo de participantes
export type Sex = 'masculino' | 'femenino';

// Género objetivo para preguntas/retos
export type TargetGender = 'male' | 'female' | 'any';

// Interfaz de Participante
export interface Participant {
  id: string;
  name: string;
  sex: Sex;
}

// Interfaz de Verdad o Reto
export interface TruthOrDare {
  type: ContentType;
  content: string;
  requiresPartner: boolean;
  targetGender: TargetGender; // A quién va dirigida la pregunta/reto
}

// Interfaz de Acción del Juego (para historial)
export interface GameAction {
  player: string;
  action: string;
  target?: string; // Nombre de la pareja si aplica
  type: ContentType;
  mode: GameMode;
  timestamp: number;
}

// Interfaz de datos del juego por categoría de género
export interface GenderCategorizedContent {
  forMale: TruthOrDare[];    // Para que hagan/respondan hombres
  forFemale: TruthOrDare[];  // Para que hagan/respondan mujeres
  forAny: TruthOrDare[];     // Para cualquier género
}

// Interfaz de un modo completo
export interface ModeContent {
  truths: GenderCategorizedContent;
  dares: GenderCategorizedContent;
}

// Interfaz de todos los datos del juego
export interface GameData {
  soft: ModeContent;
  horny: ModeContent;
  hot: ModeContent;
}
