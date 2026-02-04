import { Trophy, Zap } from 'lucide-react';

interface ScoreBoardProps {
  score: number;
  level: number;
}

export default function ScoreBoard({ score, level }: ScoreBoardProps) {
  return (
    <div className="flex gap-6">
      <div className="bg-gray-800/50 backdrop-blur-sm px-6 py-3 rounded-lg flex items-center gap-3">
        <Trophy className="w-5 h-5 text-yellow-500" />
        <span className="text-gray-400 font-medium">Score:</span>
        <span className="text-white font-bold text-xl">{score}</span>
      </div>
      
      <div className="bg-gray-800/50 backdrop-blur-sm px-6 py-3 rounded-lg flex items-center gap-3">
        <Zap className="w-5 h-5 text-purple-500" />
        <span className="text-gray-400 font-medium">Level:</span>
        <span className="text-white font-bold text-xl">{level}</span>
      </div>
    </div>
  );
}