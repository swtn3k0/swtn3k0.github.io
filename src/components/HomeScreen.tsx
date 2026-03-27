import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Moon, Star, Sun } from 'lucide-react';

interface HomeScreenProps {
  onStart: () => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="relative mb-12"
      >
        <div className="absolute inset-0 bg-purple-500/20 blur-3xl rounded-full animate-pulse" />
        <div className="relative z-10 w-32 h-32 border-2 border-purple-400/30 rounded-full flex items-center justify-center">
          <Moon className="w-16 h-16 text-purple-300 animate-bounce" />
        </div>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute -top-4 -right-4"
        >
          <Star className="w-8 h-8 text-yellow-400 fill-yellow-400/20" />
        </motion.div>
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
          className="absolute -bottom-4 -left-4"
        >
          <Sun className="w-8 h-8 text-orange-400 fill-orange-400/20" />
        </motion.div>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="text-5xl md:text-7xl font-serif mb-6 tracking-tight bg-gradient-to-b from-white via-purple-200 to-purple-400 bg-clip-text text-transparent"
      >
        Tarot Thiên Không
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.8 }}
        className="text-lg md:text-xl text-purple-300/60 mb-12 max-w-md font-light tracking-wide italic"
      >
        "Các vì sao dẫn lối, nhưng không trói buộc. Hãy tìm kiếm trí tuệ của vũ trụ bên trong chính bạn."
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.9, duration: 0.5 }}
        className="flex flex-col md:flex-row gap-4"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onStart}
          className="group relative px-12 py-4 rounded-full bg-white/5 border border-white/20 text-white font-bold tracking-widest uppercase overflow-hidden transition-all hover:bg-white/10"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-indigo-600/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          <span className="relative z-10 flex items-center">
            Bắt đầu hành trình <Sparkles className="ml-2 w-5 h-5 text-purple-400" />
          </span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onStart} // For now, just start a reading
          className="group relative px-12 py-4 rounded-full bg-purple-600/20 border border-purple-500/30 text-purple-200 font-bold tracking-widest uppercase overflow-hidden transition-all hover:bg-purple-600/30"
        >
          <span className="relative z-10 flex items-center">
            Trải bài hàng ngày <Star className="ml-2 w-5 h-5 text-yellow-400" />
          </span>
        </motion.button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 2 }}
        className="absolute bottom-10 text-xs text-purple-400/40 tracking-[0.3em] uppercase"
      >
        Chạm để khám phá điều chưa biết
      </motion.div>
    </div>
  );
};

export default HomeScreen;
