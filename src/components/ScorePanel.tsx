import { Trophy, Target } from 'lucide-react';

interface ScorePanelProps {
  score: number;
  highScore: number;
}

export default function ScorePanel({ score, highScore }: ScorePanelProps) {
  return (
    <div className="bg-gray-700/50 rounded-xl p-6 space-y-4">
      <h2 className="text-2xl font-bold text-center mb-4">Счёт</h2>
      
      <div className="bg-gray-800/70 rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-blue-400" />
            <span className="text-gray-400">Текущий счёт</span>
          </div>
          <span className="text-3xl font-bold text-blue-400">{score}</span>
        </div>
      </div>
      
      <div className="bg-gray-800/70 rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-400" />
            <span className="text-gray-400">Рекорд</span>
          </div>
          <span className="text-3xl font-bold text-yellow-400">{highScore}</span>
        </div>
      </div>
      
      <div className="text-center pt-4">
        <div className="text-sm text-gray-400">Длина змейки</div>
        <div className="text-2xl font-semibold text-green-400">{score / 10 + 3}</div>
      </div>
    </div>
  );
}