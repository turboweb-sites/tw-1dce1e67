export type GameState = 'idle' | 'playing' | 'paused' | 'gameOver';

export type Direction = 'up' | 'down' | 'left' | 'right';

export interface Position {
  x: number;
  y: number;
}

export const BOARD_SIZE = 20;
export const INITIAL_SPEED = 150;