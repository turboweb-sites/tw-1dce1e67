import { useState, useEffect, useRef, useCallback } from 'react';
import { GameState, Position, Direction, BOARD_SIZE, INITIAL_SPEED } from '../types/game';

let gameInstance: ReturnType<typeof useSnakeGame> | null = null;

export function useSnakeGame() {
  // Return singleton instance if it exists
  if (gameInstance) {
    return gameInstance;
  }

  const [gameState, setGameState] = useState<GameState>('idle');
  const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Position>({ x: 15, y: 15 });
  const [direction, setDirection] = useState<Direction>('right');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    const saved = localStorage.getItem('snakeHighScore');
    return saved ? parseInt(saved) : 0;
  });
  const [speed, setSpeed] = useState(INITIAL_SPEED);

  const gameLoopRef = useRef<number>();
  const directionRef = useRef<Direction>(direction);

  const generateRandomFood = useCallback((): Position => {
    let newFood: Position;
    do {
      newFood = {
        x: Math.floor(Math.random() * BOARD_SIZE),
        y: Math.floor(Math.random() * BOARD_SIZE)
      };
    } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
    return newFood;
  }, [snake]);

  const moveSnake = useCallback(() => {
    setSnake(currentSnake => {
      if (gameState !== 'playing') return currentSnake;

      const head = currentSnake[0];
      const newHead = { ...head };

      switch (directionRef.current) {
        case 'up':
          newHead.y -= 1;
          break;
        case 'down':
          newHead.y += 1;
          break;
        case 'left':
          newHead.x -= 1;
          break;
        case 'right':
          newHead.x += 1;
          break;
      }

      // Check wall collision
      if (newHead.x < 0 || newHead.x >= BOARD_SIZE || 
          newHead.y < 0 || newHead.y >= BOARD_SIZE) {
        setGameState('gameOver');
        return currentSnake;
      }

      // Check self collision
      if (currentSnake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
        setGameState('gameOver');
        return currentSnake;
      }

      const newSnake = [newHead, ...currentSnake];

      // Check food collision
      if (newHead.x === food.x && newHead.y === food.y) {
        setScore(prevScore => {
          const newScore = prevScore + 10;
          if (newScore > highScore) {
            setHighScore(newScore);
            localStorage.setItem('snakeHighScore', newScore.toString());
          }
          return newScore;
        });
        setFood(generateRandomFood());
        setSpeed(prev => Math.max(50, prev - 5));
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [gameState, food, generateRandomFood, highScore]);

  const startGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setFood({ x: 15, y: 15 });
    setDirection('right');
    directionRef.current = 'right';
    setScore(0);
    setSpeed(INITIAL_SPEED);
    setGameState('playing');
  };

  const pauseGame = () => {
    if (gameState === 'playing') {
      setGameState('paused');
    }
  };

  const resumeGame = () => {
    if (gameState === 'paused') {
      setGameState('playing');
    }
  };

  const changeDirection = (key: string) => {
    if (gameState !== 'playing') return;

    const newDirection = (() => {
      switch (key) {
        case 'ArrowUp':
          return directionRef.current !== 'down' ? 'up' : directionRef.current;
        case 'ArrowDown':
          return directionRef.current !== 'up' ? 'down' : directionRef.current;
        case 'ArrowLeft':
          return directionRef.current !== 'right' ? 'left' : directionRef.current;
        case 'ArrowRight':
          return directionRef.current !== 'left' ? 'right' : directionRef.current;
        default:
          return directionRef.current;
      }
    })();

    directionRef.current = newDirection;
    setDirection(newDirection);
  };

  useEffect(() => {
    if (gameState === 'playing') {
      gameLoopRef.current = window.setInterval(moveSnake, speed);
    } else {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
    }

    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
    };
  }, [gameState, speed, moveSnake]);

  gameInstance = {
    gameState,
    snake,
    food,
    direction,
    score,
    highScore,
    startGame,
    pauseGame,
    resumeGame,
    changeDirection
  };

  return gameInstance;
}