"use client";
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, RotateCcw, Play, Pause, ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

const GRID_SIZE = 20;
const INITIAL_SNAKE = [{ x: 10, y: 10 }, { x: 10, y: 11 }, { x: 10, y: 12 }];
const INITIAL_DIRECTION = { x: 0, y: -1 };
const SPEED = 150;

export default function SnakeGame() {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isPaused, setIsPaused] = useState(true);

  // Game Logic
  const moveSnake = useCallback(() => {
    if (isGameOver || isPaused) return;

    setSnake((prevSnake) => {
      const newHead = {
        x: (prevSnake[0].x + direction.x + GRID_SIZE) % GRID_SIZE,
        y: (prevSnake[0].y + direction.y + GRID_SIZE) % GRID_SIZE,
      };

      // Collision Check
      if (prevSnake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
        setIsGameOver(true);
        return prevSnake;
      }

      const newSnake = [newHead, ...prevSnake];

      // Eat Food Check
      if (newHead.x === food.x && newHead.y === food.y) {
        setScore(s => s + 10);
        generateFood();
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [direction, food, isGameOver, isPaused]);

  const generateFood = () => {
    setFood({
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    });
  };

  // Controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp': if (direction.y === 0) setDirection({ x: 0, y: -1 }); break;
        case 'ArrowDown': if (direction.y === 0) setDirection({ x: 0, y: 1 }); break;
        case 'ArrowLeft': if (direction.x === 0) setDirection({ x: -1, y: 0 }); break;
        case 'ArrowRight': if (direction.x === 0) setDirection({ x: 1, y: 0 }); break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [direction]);

  useEffect(() => {
    const gameLoop = setInterval(moveSnake, SPEED);
    return () => clearInterval(gameLoop);
  }, [moveSnake]);

  const resetGame = () => {
    if (score > highScore) setHighScore(score);
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setScore(0);
    setIsGameOver(false);
    setIsPaused(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950 text-white p-4 font-sans">
      {/* Header Section */}
      <div className="flex gap-8 mb-6 bg-slate-900/50 p-6 rounded-2xl border border-slate-800 backdrop-blur-sm shadow-xl">
        <div className="text-center">
          <p className="text-slate-400 text-xs uppercase tracking-widest mb-1">Score</p>
          <motion.p key={score} initial={{ scale: 1.5 }} animate={{ scale: 1 }} className="text-3xl font-bold text-cyan-400">{score}</motion.p>
        </div>
        <div className="w-px bg-slate-800" />
        <div className="text-center">
          <p className="text-slate-400 text-xs uppercase tracking-widest mb-1">High Score</p>
          <div className="flex items-center gap-2">
            <Trophy size={20} className="text-yellow-500" />
            <p className="text-3xl font-bold">{highScore}</p>
          </div>
        </div>
      </div>

      {/* Game Board */}
      <div 
        className="relative bg-slate-900 rounded-lg overflow-hidden border-4 border-slate-800 shadow-[0_0_50px_-12px_rgba(34,211,238,0.3)]"
        style={{ 
          display: 'grid', 
          gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
          width: 'min(90vw, 500px)',
          height: 'min(90vw, 500px)' 
        }}
      >
        {/* Snake Rendering */}
        <AnimatePresence>
          {snake.map((segment, i) => (
            <motion.div
              key={`${i}-${segment.x}-${segment.y}`}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="absolute rounded-sm"
              style={{
                width: `${100 / GRID_SIZE}%`,
                height: `${100 / GRID_SIZE}%`,
                left: `${(segment.x / GRID_SIZE) * 100}%`,
                top: `${(segment.y / GRID_SIZE) * 100}%`,
                backgroundColor: i === 0 ? '#22d3ee' : '#0891b2',
                zIndex: snake.length - i,
                boxShadow: i === 0 ? '0 0 15px #22d3ee' : 'none'
              }}
            />
          ))}
        </AnimatePresence>

        {/* Food Rendering */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ repeat: Infinity, duration: 1 }}
          className="absolute bg-rose-500 rounded-full shadow-[0_0_15px_#f43f5e]"
          style={{
            width: `${100 / GRID_SIZE}%`,
            height: `${100 / GRID_SIZE}%`,
            left: `${(food.x / GRID_SIZE) * 100}%`,
            top: `${(food.y / GRID_SIZE) * 100}%`,
          }}
        />

        {/* Overlays */}
        {(isGameOver || isPaused) && (
          <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-slate-950/80 backdrop-blur-md">
            <h2 className="text-4xl font-black mb-6 tracking-tighter">
              {isGameOver ? 'GAME OVER' : 'READY?'}
            </h2>
            <button 
              onClick={isGameOver ? resetGame : () => setIsPaused(false)}
              className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-8 py-3 rounded-full font-bold transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-cyan-500/20"
            >
              {isGameOver ? <RotateCcw size={20} /> : <Play size={20} />}
              {isGameOver ? 'Try Again' : 'Start Game'}
            </button>
          </div>
        )}
      </div>

      {/* Control Hint (Mobile Friendly) */}
      <div className="mt-8 grid grid-cols-3 gap-2 opacity-50">
        <div /> <button className="p-3 bg-slate-800 rounded-lg"><ChevronUp /></button> <div />
        <button className="p-3 bg-slate-800 rounded-lg"><ChevronLeft /></button>
        <button className="p-3 bg-slate-800 rounded-lg"><ChevronDown /></button>
        <button className="p-3 bg-slate-800 rounded-lg"><ChevronRight /></button>
      </div>
    </div>
  );
}