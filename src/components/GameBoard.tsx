import { Position, GameState } from '../types/game';

interface GameBoardProps {
  snake: Position[];
  food: Position;
  gameState: GameState;
}

export default function GameBoard({ snake, food, gameState }: GameBoardProps) {
  const BOARD_SIZE = 20;
  const CELL_SIZE = 20;

  return (
    <div 
      className={`game-board ${gameState === GameState.GAME_OVER ? 'game-over' : ''}`}
      style={{
        width: BOARD_SIZE * CELL_SIZE,
        height: BOARD_SIZE * CELL_SIZE,
      }}
    >
      {/* Snake */}
      {snake.map((segment, index) => (
        <div
          key={index}
          className={`game-cell ${index === 0 ? 'snake-head' : 'snake-segment'}`}
          style={{
            left: segment.x * CELL_SIZE,
            top: segment.y * CELL_SIZE,
            width: CELL_SIZE - 2,
            height: CELL_SIZE - 2,
          }}
        />
      ))}
      
      {/* Food */}
      <div
        className="game-cell food"
        style={{
          left: food.x * CELL_SIZE + 2,
          top: food.y * CELL_SIZE + 2,
          width: CELL_SIZE - 4,
          height: CELL_SIZE - 4,
        }}
      />
    </div>
  );
}