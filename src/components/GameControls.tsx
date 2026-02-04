import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Play, Pause, RotateCcw } from 'lucide-react';
import { GameState, Direction } from '../types/game';

interface GameControlsProps {
  gameState: GameState;
  onStart: () => void;
  onPause: () => void;
  onResume: () => void;
  onDirectionChange: (direction: Direction) => void;
}

export default function GameControls({
  gameState,
  onStart,
  onPause,
  onResume,
  onDirectionChange,
}: GameControlsProps) {
  const isPlaying = gameState === GameState.PLAYING;
  const isPaused = gameState === GameState.PAUSED;
  const isGameOver = gameState === GameState.GAME_OVER;
  const isIdle = gameState === GameState.IDLE;

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Game Control Buttons */}
      <div className="flex gap-4">
        {(isIdle || isGameOver) && (
          <button
            onClick={onStart}
            className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors"
          >
            <Play className="w-5 h-5" />
            {isGameOver ? 'Play Again' : 'Start Game'}
          </button>
        )}
        
        {isPlaying && (
          <button
            onClick={onPause}
            className="flex items-center gap-2 px-6 py-3 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold rounded-lg transition-colors"
          >
            <Pause className="w-5 h-5" />
            Pause
          </button>
        )}
        
        {isPaused && (
          <button
            onClick={onResume}
            className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors"
          >
            <Play className="w-5 h-5" />
            Resume
          </button>
        )}
      </div>

      {/* Direction Controls (for mobile) */}
      <div className="grid grid-cols-3 gap-2 md:hidden">
        <div />
        <button
          onClick={() => onDirectionChange('UP')}
          disabled={!isPlaying}
          className="p-4 bg-gray-800 hover:bg-gray-700 disabled:bg-gray-900 disabled:opacity-50 text-white rounded-lg transition-colors"
        >
          <ArrowUp className="w-6 h-6" />
        </button>
        <div />
        
        <button
          onClick={() => onDirectionChange('LEFT')}
          disabled={!isPlaying}
          className="p-4 bg-gray-800 hover:bg-gray-700 disabled:bg-gray-900 disabled:opacity-50 text-white rounded-lg transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <button
          onClick={() => onDirectionChange('DOWN')}
          disabled={!isPlaying}
          className="p-4 bg-gray-800 hover:bg-gray-700 disabled:bg-gray-900 disabled:opacity-50 text-white rounded-lg transition-colors"
        >
          <ArrowDown className="w-6 h-6" />
        </button>
        <button
          onClick={() => onDirectionChange('RIGHT')}
          disabled={!isPlaying}
          className="p-4 bg-gray-800 hover:bg-gray-700 disabled:bg-gray-900 disabled:opacity-50 text-white rounded-lg transition-colors"
        >
          <ArrowRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}