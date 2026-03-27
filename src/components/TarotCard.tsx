import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TarotCard as TarotCardType, DeckType } from '../types';

interface TarotCardProps {
  card?: TarotCardType;
  isReversed?: boolean;
  isFlipped: boolean;
  deckType?: DeckType;
  onClick?: () => void;
  className?: string;
  index?: number;
}

const TarotCard: React.FC<TarotCardProps> = ({
  card,
  isReversed = false,
  isFlipped,
  deckType = DeckType.TAROT,
  onClick,
  className = '',
  index = 0,
}) => {
  const isPlayingCard = deckType === DeckType.PLAYING_CARDS;

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
        <div className={`absolute inset-0 w-full h-full backface-hidden rounded-xl border-2 flex items-center justify-center p-4 shadow-2xl overflow-hidden ${
          isPlayingCard 
            ? 'border-blue-500/30 bg-gradient-to-br from-blue-900 to-indigo-900' 
            : 'border-purple-500/30 bg-gradient-to-br from-indigo-900 to-purple-900'
        }`}>
          <div className={`absolute inset-0 opacity-20 bg-cover bg-center mix-blend-overlay ${
            isPlayingCard 
              ? "bg-[url('https://picsum.photos/seed/playing-card-pattern/400/600')]" 
              : "bg-[url('https://picsum.photos/seed/tarot-pattern/400/600')]"
          }`} />
          <div className={`relative z-10 w-full h-full border rounded-lg flex items-center justify-center ${
            isPlayingCard ? 'border-blue-400/20' : 'border-purple-400/20'
          }`}>
            <div className={`w-16 h-16 border-2 rounded-full flex items-center justify-center ${
              isPlayingCard ? 'border-blue-400/40' : 'border-purple-400/40'
            }`}>
              <div className={`w-10 h-10 border rounded-full animate-pulse ${
                isPlayingCard ? 'border-blue-400/60' : 'border-purple-400/60'
              }`} />
            </div>
          </div>
        </div>

        {/* Front of the card */}
        <div
          className={`absolute inset-0 w-full h-full backface-hidden rounded-xl border-2 flex flex-col items-center p-2 shadow-2xl overflow-hidden ${
            isPlayingCard ? 'border-blue-400 bg-white' : 'border-purple-400 bg-black'
          }`}
          style={{ transform: 'rotateY(180deg)' }}
        >
          {card && (
            <>
              <div className={`w-full h-full relative overflow-hidden rounded-lg ${isReversed ? 'rotate-180' : ''}`}>
                <img
                  src={card.image}
                  alt={card.name}
                  className={`w-full h-full ${isPlayingCard ? 'object-contain' : 'object-cover'}`}
                  referrerPolicy="no-referrer"
                />
                {!isPlayingCard && <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />}
                <div className={`absolute bottom-2 left-0 right-0 text-center ${isPlayingCard ? 'hidden' : ''}`}>
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
