import { useEffect } from 'react';
import GameBoard from './GameBoard';
import ScorePanel from './ScorePanel';
import GameControls from './GameControls';
import { useSnakeGame } from '../hooks/useSnakeGame';
import { Gamepad2 } from 'lucide-react';

export default function Game() {
  const {
    gameState,
    snake,
    food,
    score,
    highScore,
    startGame,
    pauseGame,
    resumeGame,
    changeDirection
  } = useSnakeGame();

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === ' ') {
        e.preventDefault();
        if (gameState === 'playing') {
          pauseGame();
        } else if (gameState === 'paused') {
          resumeGame();
        } else if (gameState === 'idle' || gameState === 'gameOver') {
          startGame();
        }
      } else {
        changeDirection(e.key);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameState, changeDirection, startGame, pauseGame, resumeGame]);

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8 shadow-2xl max-w-4xl w-full">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Gamepad2 className="w-10 h-10 text-green-500" />
          <h1 className="text-5xl font-bold bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">
            ЗМЕЙКА
          </h1>
        </div>
        <p className="text-gray-400">Классическая игра в современном исполнении</p>
      </div>

      <div className="grid lg:grid-cols-[1fr_300px] gap-8">
        <div className="space-y-4">
          <GameBoard snake={snake} food={food} gameState={gameState} />
          <GameControls
            gameState={gameState}
            onStart={startGame}
            onPause={pauseGame}
            onResume={resumeGame}
            onDirectionChange={changeDirection}
          />
        </div>
        
        <div className="space-y-6">
          <ScorePanel score={score} highScore={highScore} />
          
          <div className="bg-gray-700/50 rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-4 text-green-400">Управление</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <kbd className="px-3 py-1 bg-gray-600 rounded">↑</kbd>
                <span>Вверх</span>
              </div>
              <div className="flex items-center gap-3">
                <kbd className="px-3 py-1 bg-gray-600 rounded">↓</kbd>
                <span>Вниз</span>
              </div>
              <div className="flex items-center gap-3">
                <kbd className="px-3 py-1 bg-gray-600 rounded">←</kbd>
                <span>Влево</span>
              </div>
              <div className="flex items-center gap-3">
                <kbd className="px-3 py-1 bg-gray-600 rounded">→</kbd>
                <span>Вправо</span>
              </div>
              <div className="flex items-center gap-3">
                <kbd className="px-3 py-1 bg-gray-600 rounded">Пробел</kbd>
                <span>Старт/Пауза</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-700/50 rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-4 text-yellow-400">Правила</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>• Управляй змейкой стрелками</li>
              <li>• Собирай красную еду</li>
              <li>• Избегай столкновений со стенами</li>
              <li>• Не врезайся в свой хвост</li>
              <li>• Чем длиннее змейка, тем больше очков</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}