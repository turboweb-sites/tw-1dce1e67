import { BOARD_SIZE } from '../types/game';
import { GameState, Position } from '../types/game';

interface GameBoardProps {
  snake: Position[];
  food: Position;
  gameState: GameState;
}

export default function GameBoard({ snake, food, gameState }: GameBoardProps) {
  const renderCell = (row: number, col: number) => {
    const isSnakeHead = snake[0]?.x === col && snake[0]?.y === row;
    const isSnakeBody = snake.slice(1).some(segment => segment.x === col && segment.y === row);
    const isFood = food?.x === col && food?.y === row;

    return (
      <div
        key={`${row}-${col}`}
        className="relative bg-gray-700/30 border border-gray-600/20 aspect-square"
      >
        {isSnakeHead && (
          <div className="snake-head game-cell animate-glow" />
        )}
        {isSnakeBody && (
          <div className="snake-segment game-cell" />
        )}
        {isFood && (
          <div className="food game-cell" />
        )}
      </div>
    );
  };

  return (
    <div className="relative">
      <div 
        className="grid bg-gray-800/80 rounded-xl overflow-hidden shadow-inner"
        style={{
          gridTemplateColumns: `repeat(${BOARD_SIZE}, 1fr)`,
          gridTemplateRows: `repeat(${BOARD_SIZE}, 1fr)`,
          aspectRatio: '1 / 1'
        }}
      >
        {Array.from({ length: BOARD_SIZE }, (_, row) =>
          Array.from({ length: BOARD_SIZE }, (_, col) => renderCell(row, col))
        )}
      </div>
      
      {gameState === 'gameOver' && (
        <div className="absolute inset-0 bg-black/70 rounded-xl flex items-center justify-center backdrop-blur-sm">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-red-500 mb-2">ИГРА ОКОНЧЕНА</h2>
            <p className="text-gray-300">Нажмите пробел для новой игры</p>
          </div>
        </div>
      )}
      
      {gameState === 'paused' && (
        <div className="absolute inset-0 bg-black/70 rounded-xl flex items-center justify-center backdrop-blur-sm">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-yellow-500 mb-2">ПАУЗА</h2>
            <p className="text-gray-300">Нажмите пробел для продолжения</p>
          </div>
        </div>
      )}
      
      {gameState === 'idle' && (
        <div className="absolute inset-0 bg-black/70 rounded-xl flex items-center justify-center backdrop-blur-sm">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-green-500 mb-2">ЗМЕЙКА</h2>
            <p className="text-gray-300">Нажмите пробел для начала игры</p>
          </div>
        </div>
      )}
    </div>
  );
}