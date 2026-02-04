import { useState, useEffect, useCallback, useRef } from 'react';
import { Position, Direction, GameState } from '../types/game';

const BOARD_SIZE = 20;
const INITIAL_SNAKE: Position[] = [
  { x: 10, y: 10 },
  { x: 9, y: 10 },
  { x: 8, y: 10 },
];
const INITIAL_FOOD: Position = { x: 15, y: 10 };
const INITIAL_SPEED = 150;
const SPEED_INCREMENT = 5;
const SCORE_INCREMENT = 10;

export default function useSnakeGame() {
  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE);
  const [food, setFood] = useState<Position>(INITIAL_FOOD);
  const [direction, setDirection] = useState<Direction>('RIGHT');
  const [gameState, setGameState] = useState<GameState>(GameState.IDLE);
  const [score, setScore] = useState(0);
  const [speed, setSpeed] = useState(INITIAL_SPEED);
  
  const directionRef = useRef(direction);
  const nextDirectionRef = useRef(direction);

  const generateRandomFood = useCallback((currentSnake: Position[]): Position => {
    let newFood: Position;
    do {
      newFood = {
        x: Math.floor(Math.random() * BOARD_SIZE),
        y: Math.floor(Math.random() * BOARD_SIZE),
      };
    } while (currentSnake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
    return newFood;
  }, []);

  const checkCollision = useCallback((head: Position, snakeBody: Position[]): boolean => {
    // Check walls
    if (head.x < 0 || head.x >= BOARD_SIZE || head.y < 0 || head.y >= BOARD_SIZE) {
      return true;
    }
    
    // Check self collision (skip head)
    for (let i = 1; i < snakeBody.length; i++) {
      if (head.x === snakeBody[i].x && head.y === snakeBody[i].y) {
        return true;
      }
    }
    
    return false;
  }, []);

  const moveSnake = useCallback(() => {
    if (gameState !== GameState.PLAYING) return;

    setSnake(currentSnake => {
      const newSnake = [...currentSnake];
      const head = { ...newSnake[0] };
      
      // Update direction from the queue
      directionRef.current = nextDirectionRef.current;
      
      // Move head based on direction
      switch (directionRef.current) {
        case 'UP':
          head.y -= 1;
          break;
        case 'DOWN':
          head.y += 1;
          break;
        case 'LEFT':
          head.x -= 1;
          break;
        case 'RIGHT':
          head.x += 1;
          break;
      }

      // Check collision
      if (checkCollision(head, currentSnake)) {
        setGameState(GameState.GAME_OVER);
        return currentSnake;
      }

      newSnake.unshift(head);

      // Check if food is eaten
      if (head.x === food.x && head.y === food.y) {
        setScore(s => s + SCORE_INCREMENT);
        setFood(generateRandomFood(newSnake));
        
        // Increase speed every 5 foods
        if ((score + SCORE_INCREMENT) % 50 === 0) {
          setSpeed(s => Math.max(50, s - SPEED_INCREMENT));
        }
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [gameState, food, checkCollision, generateRandomFood, score]);

  const changeDirection = useCallback((newDirection: Direction) => {
    if (gameState !== GameState.PLAYING) return;

    const opposites: Record<Direction, Direction> = {
      UP: 'DOWN',
      DOWN: 'UP',
      LEFT: 'RIGHT',
      RIGHT: 'LEFT',
    };

    // Prevent reversing into yourself
    if (newDirection !== opposites[directionRef.current]) {
      nextDirectionRef.current = newDirection;
    }
  }, [gameState]);

  const startGame = useCallback(() => {
    setSnake(INITIAL_SNAKE);
    setFood(INITIAL_FOOD);
    setDirection('RIGHT');
    directionRef.current = 'RIGHT';
    nextDirectionRef.current = 'RIGHT';
    setScore(0);
    setSpeed(INITIAL_SPEED);
    setGameState(GameState.PLAYING);
  }, []);

  const pauseGame = useCallback(() => {
    if (gameState === GameState.PLAYING) {
      setGameState(GameState.PAUSED);
    }
  }, [gameState]);

  const resumeGame = useCallback(() => {
    if (gameState === GameState.PAUSED) {
      setGameState(GameState.PLAYING);
    }
  }, [gameState]);

  // Game loop
  useEffect(() => {
    if (gameState !== GameState.PLAYING) return;

    const gameInterval = setInterval(moveSnake, speed);
    return () => clearInterval(gameInterval);
  }, [gameState, speed, moveSnake]);

  return {
    snake,
    food,
    direction: directionRef.current,
    gameState,
    score,
    speed,
    startGame,
    pauseGame,
    resumeGame,
    changeDirection,
  };
}