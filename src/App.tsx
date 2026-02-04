import { useState, useEffect } from 'react';
import Game from './components/Game';
import { Trophy, Gamepad2, Zap } from 'lucide-react';

export default function App() {
  const [highScore, setHighScore] = useState(() => {
    const saved = localStorage.getItem('snakeHighScore');
    return saved ? parseInt(saved, 10) : 0;
  });

  const handleNewHighScore = (score: number) => {
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('snakeHighScore', score.toString());
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex flex-col items-center justify-center p-4">
      {/* Title */}
      <div className="text-center mb-8">
        <h1 className="text-6xl font-bold text-white mb-2 flex items-center justify-center gap-3">
          <Gamepad2 className="w-12 h-12 text-green-400" />
          Snake Game
          <Zap className="w-12 h-12 text-yellow-400" />
        </h1>
        <p className="text-gray-400 text-lg">Use arrow keys or WASD to control the snake</p>
      </div>

      {/* High Score */}
      <div className="mb-6 bg-gray-800/50 backdrop-blur-sm px-6 py-3 rounded-full flex items-center gap-3">
        <Trophy className="w-6 h-6 text-yellow-500" />
        <span className="text-white font-semibold">High Score:</span>
        <span className="text-yellow-400 font-bold text-xl">{highScore}</span>
      </div>

      {/* Game */}
      <Game onNewHighScore={handleNewHighScore} highScore={highScore} />

      {/* Instructions */}
      <div className="mt-8 text-center max-w-md">
        <h3 className="text-white font-semibold mb-2">How to Play:</h3>
        <div className="text-gray-400 text-sm space-y-1">
          <p>• Use arrow keys (↑ ↓ ← →) or WASD to move</p>
          <p>• Eat the red food to grow and score points</p>
          <p>• Don't hit the walls or yourself!</p>
          <p>• Press Space to pause/resume</p>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-12 text-center text-gray-500 text-sm">
        <p>Built with React + TypeScript + Tailwind CSS</p>
      </footer>
    </div>
  );
}