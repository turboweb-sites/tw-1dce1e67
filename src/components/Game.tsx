import { useEffect } from 'react';
import GameBoard from './GameBoard';
import GameControls from './GameControls';
import ScoreBoard from './ScoreBoard';
import useSnakeGame from '../hooks/useSnakeGame';
import { GameState } from '../types/game';

interface GameProps {
  onNewHighScore: (score: number) => void;
  highScore: number;
}

export default function Game({ onNewHighScore, highScore }: GameProps) {
  const {
    snake,
    food,
    direction,
    gameState,
    score,
    speed,
    startGame,
    pauseGame,
    resumeGame,
    changeDirection,
  } = useSnakeGame();

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          e.preventDefault();
          changeDirection('UP');
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          e.preventDefault();
          changeDirection('DOWN');
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          e.preventDefault();
          changeDirection('LEFT');
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          e.preventDefault();
          changeDirection('RIGHT');
          break;
        case ' ':
          e.preventDefault();
          if (gameState === GameState.PLAYING) {
            pauseGame();
          } else if (gameState === GameState.PAUSED) {
            resumeGame();
          }
          break;
        case 'Enter':
          if (gameState === GameState.IDLE || gameState === GameState.GAME_OVER) {
            startGame();
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameState, changeDirection, pauseGame, resumeGame, startGame]);

  useEffect(() => {
    if (gameState === GameState.GAME_OVER) {
      onNewHighScore(score);
    }
  }, [gameState, score, onNewHighScore]);

  return (
    <div className="flex flex-col items-center gap-6">
      <ScoreBoard score={score} level={Math.floor(score / 50) + 1} />
      
      <div className="relative">
        <GameBoard 
          snake={snake} 
          food={food} 
          gameState={gameState}
        />
        
        {gameState === GameState.GAME_OVER && (
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm rounded-lg flex items-center justify-center">
            <div className="text-center text-white p-8">
              <h2 className="text-4xl font-bold mb-2">Game Over!</h2>
              <p className="text-xl mb-4">Final Score: {score}</p>
              {score === highScore && score > 0 && (
                <p className="text-yellow-400 text-lg mb-4">🎉 New High Score! 🎉</p>
              )}
              <button
                onClick={startGame}
                className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors"
              >
                Play Again
              </button>
            </div>
          </div>
        )}
      </div>
      
      <GameControls
        gameState={gameState}
        onStart={startGame}
        onPause={pauseGame}
        onResume={resumeGame}
        onDirectionChange={changeDirection}
      />
    </div>
  );
}