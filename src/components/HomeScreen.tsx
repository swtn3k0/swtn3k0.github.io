import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Moon, Star, Sun, User, Calendar, MessageSquare, ChevronRight } from 'lucide-react';
import { DeckType, UserInfo } from '../types';

interface HomeScreenProps {
  onStart: (userInfo: UserInfo, deckType: DeckType) => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onStart }) => {
  const [step, setStep] = useState<'welcome' | 'form'>('welcome');
  const [deckType, setDeckType] = useState<DeckType>(DeckType.TAROT);
  const [userInfo, setUserInfo] = useState<UserInfo>({
    fullName: '',
    birthYear: '',
    request: '',
  });

  const handleStart = () => {
    if (userInfo.fullName && userInfo.birthYear) {
      onStart(userInfo, deckType);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-20 text-center">
      <AnimatePresence mode="wait">
        {step === 'welcome' ? (
          <motion.div
            key="welcome"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center"
          >
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
                onClick={() => {
                  setDeckType(DeckType.TAROT);
                  setStep('form');
                }}
                className="group relative px-12 py-4 rounded-full bg-white/5 border border-white/20 text-white font-bold tracking-widest uppercase overflow-hidden transition-all hover:bg-white/10"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-indigo-600/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative z-10 flex items-center">
                  Bói Bài Tarot <Sparkles className="ml-2 w-5 h-5 text-purple-400" />
                </span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setDeckType(DeckType.PLAYING_CARDS);
                  setStep('form');
                }}
                className="group relative px-12 py-4 rounded-full bg-purple-600/20 border border-purple-500/30 text-purple-200 font-bold tracking-widest uppercase overflow-hidden transition-all hover:bg-purple-600/30"
              >
                <span className="relative z-10 flex items-center">
                  Bói Bài Tây <Star className="ml-2 w-5 h-5 text-yellow-400" />
                </span>
              </motion.button>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full max-w-lg bg-zinc-900/40 backdrop-blur-xl border border-purple-500/20 rounded-[2rem] p-8 md:p-12 shadow-2xl"
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-serif text-purple-100">Thông tin của bạn</h2>
              <div className="px-4 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-[10px] uppercase tracking-widest text-purple-300">
                {deckType === DeckType.TAROT ? 'Bài Tarot' : 'Bài Tây'}
              </div>
            </div>

            <div className="space-y-6 text-left">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-[0.2em] text-purple-400/60 ml-1 flex items-center">
                  <User className="w-3 h-3 mr-2" /> Họ và tên
                </label>
                <input
                  type="text"
                  value={userInfo.fullName}
                  onChange={(e) => setUserInfo({ ...userInfo, fullName: e.target.value })}
                  placeholder="Nhập tên của bạn..."
                  className="w-full bg-black/40 border border-purple-500/20 rounded-2xl px-5 py-4 text-purple-100 placeholder:text-purple-500/30 focus:outline-none focus:border-purple-500/50 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-[0.2em] text-purple-400/60 ml-1 flex items-center">
                  <Calendar className="w-3 h-3 mr-2" /> Năm sinh
                </label>
                <input
                  type="number"
                  value={userInfo.birthYear}
                  onChange={(e) => setUserInfo({ ...userInfo, birthYear: e.target.value })}
                  placeholder="Ví dụ: 1995"
                  className="w-full bg-black/40 border border-purple-500/20 rounded-2xl px-5 py-4 text-purple-100 placeholder:text-purple-500/30 focus:outline-none focus:border-purple-500/50 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-[0.2em] text-purple-400/60 ml-1 flex items-center">
                  <MessageSquare className="w-3 h-3 mr-2" /> Nhu cầu / Câu hỏi (Tùy chọn)
                </label>
                <textarea
                  value={userInfo.request}
                  onChange={(e) => setUserInfo({ ...userInfo, request: e.target.value })}
                  placeholder="Bạn muốn biết điều gì về tương lai?..."
                  rows={3}
                  className="w-full bg-black/40 border border-purple-500/20 rounded-2xl px-5 py-4 text-purple-100 placeholder:text-purple-500/30 focus:outline-none focus:border-purple-500/50 transition-all resize-none"
                />
              </div>

              <div className="pt-4 flex gap-4">
                <button
                  onClick={() => setStep('welcome')}
                  className="flex-1 py-4 rounded-2xl border border-purple-500/20 text-purple-300 font-medium hover:bg-white/5 transition-all"
                >
                  Quay lại
                </button>
                <button
                  onClick={handleStart}
                  disabled={!userInfo.fullName || !userInfo.birthYear}
                  className="flex-[2] bg-purple-600 hover:bg-purple-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 rounded-2xl transition-all flex items-center justify-center shadow-lg shadow-purple-600/20"
                >
                  Bắt đầu xem bài <ChevronRight className="ml-2 w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 2 }}
        className="mt-12 text-xs text-purple-400/40 tracking-[0.3em] uppercase"
      >
        Chạm để khám phá điều chưa biết
      </motion.div>
    </div>
  );
};

export default HomeScreen;
