import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TarotCard as TarotCardType } from '../types';

interface TarotCardProps {
  card?: TarotCardType;
  isReversed?: boolean;
  isFlipped: boolean;
  onClick?: () => void;
  className?: string;
  index?: number;
}

const TarotCard: React.FC<TarotCardProps> = ({
  card,
  isReversed = false,
  isFlipped,
  onClick,
  className = '',
  index = 0,
}) => {
  return (
    <div
      className={`relative w-48 h-72 cursor-pointer perspective-1000 ${className}`}
      onClick={onClick}
    >
      <motion.div
        className="w-full h-full relative preserve-3d"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 260, damping: 20 }}
      >
        {/* Back of the card */}
        <div className="absolute inset-0 w-full h-full backface-hidden rounded-xl border-2 border-purple-500/30 bg-gradient-to-br from-indigo-900 to-purple-900 flex items-center justify-center p-4 shadow-2xl overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-[url('https://picsum.photos/seed/tarot-pattern/400/600')] bg-cover bg-center mix-blend-overlay" />
          <div className="relative z-10 w-full h-full border border-purple-400/20 rounded-lg flex items-center justify-center">
            <div className="w-16 h-16 border-2 border-purple-400/40 rounded-full flex items-center justify-center">
              <div className="w-10 h-10 border border-purple-400/60 rounded-full animate-pulse" />
            </div>
          </div>
        </div>

        {/* Front of the card */}
        <div
          className="absolute inset-0 w-full h-full backface-hidden rounded-xl border-2 border-purple-400 bg-black flex flex-col items-center p-2 shadow-2xl overflow-hidden"
          style={{ transform: 'rotateY(180deg)' }}
        >
          {card && (
            <>
              <div className={`w-full h-full relative overflow-hidden rounded-lg ${isReversed ? 'rotate-180' : ''}`}>
                <img
                  src={card.image}
                  alt={card.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-2 left-0 right-0 text-center">
                  <h3 className="text-white font-serif text-sm tracking-widest uppercase drop-shadow-lg">
                    {card.name}
                  </h3>
                  {isReversed && (
                    <span className="text-[10px] text-purple-300 uppercase tracking-tighter">Reversed</span>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default TarotCard;
