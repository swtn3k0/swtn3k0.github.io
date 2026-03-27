import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TarotCard as TarotCardType, DeckType } from '../types';
import TarotCard from './TarotCard';

interface ShuffleDeckProps {
  onDraw: (count: number) => void;
  count: number;
  isShuffling: boolean;
  deckType?: DeckType;
}

const ShuffleDeck: React.FC<ShuffleDeckProps> = ({ onDraw, count, isShuffling, deckType }) => {
  const [cards, setCards] = useState<number[]>(Array.from({ length: 22 }, (_, i) => i));
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    if (isShuffling) {
      const interval = setInterval(() => {
        setCards((prev) => [...prev].sort(() => Math.random() - 0.5));
      }, 200);
      return () => clearInterval(interval);
    }
  }, [isShuffling]);

  const handleDraw = () => {
    if (isShuffling || isDrawing) return;
    setIsDrawing(true);
    setTimeout(() => {
      onDraw(count);
      setIsDrawing(false);
    }, 1000);
  };

  return (
    <div className="relative h-96 w-full flex items-center justify-center">
      <AnimatePresence>
        {cards.slice(0, 10).map((id, index) => (
          <motion.div
            key={id}
            className="absolute"
            initial={{ x: 0, y: 0, rotate: 0 }}
            animate={{
              x: isShuffling ? (Math.random() - 0.5) * 300 : index * 2,
              y: isShuffling ? (Math.random() - 0.5) * 100 : index * -1,
              rotate: isShuffling ? (Math.random() - 0.5) * 45 : index * 0.5,
              zIndex: index,
            }}
            transition={{
              type: 'spring',
              stiffness: 100,
              damping: 10,
              mass: 1,
            }}
          >
            <TarotCard isFlipped={false} className="w-40 h-60" deckType={deckType} />
          </motion.div>
        ))}
      </AnimatePresence>

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-50">
        <button
          onClick={handleDraw}
          disabled={isShuffling || isDrawing}
          className={`px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold tracking-widest uppercase shadow-lg shadow-purple-500/30 transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {isShuffling ? 'Đang xào bài...' : isDrawing ? 'Đang rút bài...' : `Rút ${count} lá bài`}
        </button>
      </div>
    </div>
  );
};

export default ShuffleDeck;
