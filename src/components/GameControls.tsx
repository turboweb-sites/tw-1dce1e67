import { Play, Pause, RotateCcw, ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';
import { GameState } from '../types/game';

interface GameControlsProps {
  gameState: GameState;
  onStart: () => void;
  onPause: () => void;
  onResume: () => void;
  onDirectionChange: (key: string) => void;
}

export default function GameControls({ 
  gameState, 
  onStart, 
  onPause, 
  onResume,
  onDirectionChange 
}: GameControlsProps) {
  const handleDirectionClick = (direction: string) => {
    if (gameState === 'playing') {
      onDirectionChange(direction);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-4 justify-center">
        {gameState === 'idle' || gameState === 'gameOver' ? (
          <button
            onClick={onStart}
            className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors"
          >
            <Play className="w-5 h-5" />
            Новая игра
          </button>
        ) : gameState === 'playing' ? (
          <button
            onClick={onPause}
            className="flex items-center gap-2 px-6 py-3 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold rounded-lg transition-colors"
          >
            <Pause className="w-5 h-5" />
            Пауза
          </button>
        ) : (
          <button
            onClick={onResume}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
          >
            <Play className="w-5 h-5" />
            Продолжить
          </button>
        )}
        
        {gameState === 'gameOver' && (
          <button
            onClick={onStart}
            className="flex items-center gap-2 px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
            Заново
          </button>
        )}
      </div>

      {/* Mobile controls */}
      <div className="grid grid-cols-3 gap-2 max-w-[200px] mx-auto lg:hidden">
        <div />
        <button
          onClick={() => handleDirectionClick('ArrowUp')}
          className="p-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
        >
          <ArrowUp className="w-6 h-6 mx-auto" />
        </button>
        <div />
        
        <button
          onClick={() => handleDirectionClick('ArrowLeft')}
          className="p-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-6 h-6 mx-auto" />
        </button>
        <div />
        <button
          onClick={() => handleDirectionClick('ArrowRight')}
          className="p-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
        >
          <ArrowRight className="w-6 h-6 mx-auto" />
        </button>
        
        <div />
        <button
          onClick={() => handleDirectionClick('ArrowDown')}
          className="p-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
        >
          <ArrowDown className="w-6 h-6 mx-auto" />
        </button>
        <div />
      </div>
    </div>
  );
}