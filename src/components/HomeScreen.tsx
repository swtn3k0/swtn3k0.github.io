import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Moon, Star, Sun, User, Calendar, MessageSquare, ChevronRight } from 'lucide-react';
import { DeckType, UserInfo } from '../types';
import { useSettings } from '../contexts/SettingsContext';

interface HomeScreenProps {
  onStart: (userInfo: UserInfo, deckType: DeckType) => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onStart }) => {
  const [step, setStep] = useState<'welcome' | 'form'>('welcome');
  const [deckType, setDeckType] = useState<DeckType>(DeckType.TAROT);
  const { settings } = useSettings();
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
              initial={settings.effectsEnabled ? { opacity: 0, scale: 0.8 } : { opacity: 1, scale: 1 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="relative mb-12"
            >
              {settings.effectsEnabled && <div className="absolute inset-0 bg-purple-500/20 blur-3xl rounded-full animate-pulse" />}
              <div className="relative z-10 w-32 h-32 border-2 border-purple-400/30 rounded-full flex items-center justify-center">
                <Moon className={`w-16 h-16 text-purple-300 ${settings.effectsEnabled ? 'animate-bounce' : ''}`} />
              </div>
              <motion.div
                animate={settings.effectsEnabled ? { rotate: 360 } : {}}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute -top-4 -right-4"
              >
                <Star className="w-8 h-8 text-yellow-400 fill-yellow-400/20" />
              </motion.div>
              <motion.div
                animate={settings.effectsEnabled ? { rotate: -360 } : {}}
                transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                className="absolute -bottom-4 -left-4"
              >
                <Star className="w-8 h-8 text-orange-400 fill-orange-400/20" />
              </motion.div>
            </motion.div>

            <motion.h1
              initial={settings.effectsEnabled ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className={`text-5xl md:text-7xl font-serif mb-6 tracking-tight bg-clip-text text-transparent transition-all duration-300 ${
                settings.theme === 'dark' 
                  ? 'bg-gradient-to-b from-white via-purple-200 to-purple-400' 
                  : 'bg-gradient-to-b from-purple-950 via-purple-800 to-purple-600'
              }`}
            >
              Tarot Thiên Không
            </motion.h1>

            <motion.p
              initial={settings.effectsEnabled ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className={`text-lg md:text-xl mb-12 max-w-md font-light tracking-wide italic transition-colors duration-300 ${
                settings.theme === 'dark' ? 'text-purple-300/60' : 'text-purple-900/80'
              }`}
            >
              "Các vì sao dẫn lối, nhưng không trói buộc. Hãy tìm kiếm trí tuệ của vũ trụ bên trong chính bạn."
            </motion.p>

            <motion.div
              initial={settings.effectsEnabled ? { opacity: 0, scale: 0.9 } : { opacity: 1, scale: 1 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="flex flex-col md:flex-row gap-4"
            >
              <motion.button
                whileHover={settings.effectsEnabled ? { scale: 1.05 } : {}}
                whileTap={settings.effectsEnabled ? { scale: 0.95 } : {}}
                onClick={() => {
                  setDeckType(DeckType.TAROT);
                  setStep('form');
                }}
                className="px-12 py-4 rounded-full bg-purple-600 text-white font-bold tracking-widest uppercase shadow-lg shadow-purple-600/20 hover:bg-purple-700 transition-all flex items-center justify-center"
              >
                Bói Bài Tarot <Sparkles className="ml-2 w-5 h-5" />
              </motion.button>

              <motion.button
                whileHover={settings.effectsEnabled ? { scale: 1.05 } : {}}
                whileTap={settings.effectsEnabled ? { scale: 0.95 } : {}}
                onClick={() => {
                  setDeckType(DeckType.PLAYING_CARDS);
                  setStep('form');
                }}
                className="px-12 py-4 rounded-full bg-purple-600 text-white font-bold tracking-widest uppercase shadow-lg shadow-purple-600/20 hover:bg-purple-700 transition-all flex items-center justify-center"
              >
                Bói Bài Tây <Star className="ml-2 w-5 h-5" />
              </motion.button>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={`w-full max-w-lg backdrop-blur-xl border rounded-[2rem] p-8 md:p-12 shadow-2xl transition-colors duration-300 ${
              settings.theme === 'dark' 
                ? 'bg-zinc-900/40 border-purple-500/20' 
                : 'bg-white border-purple-200'
            }`}
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className={`text-3xl font-serif transition-colors duration-300 ${
                settings.theme === 'dark' ? 'text-purple-100' : 'text-purple-950'
              }`}>
                Thông tin của bạn
              </h2>
              <div className={`px-4 py-1 rounded-full border text-[10px] uppercase tracking-widest font-bold transition-colors duration-300 ${
                settings.theme === 'dark' 
                  ? 'bg-purple-500/20 border-purple-500/30 text-purple-300' 
                  : 'bg-purple-600 border-purple-600 text-white'
              }`}>
                {deckType === DeckType.TAROT ? 'Bài Tarot' : 'Bài Tây'}
              </div>
            </div>

            <div className="space-y-6 text-left">
              <div className="space-y-2">
                <label className={`text-xs uppercase tracking-[0.2em] ml-1 flex items-center font-bold transition-colors duration-300 ${
                  settings.theme === 'dark' ? 'text-purple-400/60' : 'text-purple-900'
                }`}>
                  <User className="w-3 h-3 mr-2" /> Họ và tên
                </label>
                <input
                  type="text"
                  value={userInfo.fullName}
                  onChange={(e) => setUserInfo({ ...userInfo, fullName: e.target.value })}
                  placeholder="Nhập tên của bạn..."
                  className={`w-full border rounded-2xl px-5 py-4 transition-all focus:outline-none focus:border-purple-500/50 ${
                    settings.theme === 'dark'
                      ? 'bg-black/40 border-purple-500/20 text-purple-100 placeholder:text-purple-500/30'
                      : 'bg-white border-purple-200 text-purple-950 placeholder:text-purple-400'
                  }`}
                />
              </div>

              <div className="space-y-2">
                <label className={`text-xs uppercase tracking-[0.2em] ml-1 flex items-center font-bold transition-colors duration-300 ${
                  settings.theme === 'dark' ? 'text-purple-400/60' : 'text-purple-900'
                }`}>
                  <Calendar className="w-3 h-3 mr-2" /> Năm sinh
                </label>
                <input
                  type="number"
                  value={userInfo.birthYear}
                  onChange={(e) => setUserInfo({ ...userInfo, birthYear: e.target.value })}
                  placeholder="Ví dụ: 1995"
                  className={`w-full border rounded-2xl px-5 py-4 transition-all focus:outline-none focus:border-purple-500/50 ${
                    settings.theme === 'dark'
                      ? 'bg-black/40 border-purple-500/20 text-purple-100 placeholder:text-purple-500/30'
                      : 'bg-white border-purple-200 text-purple-950 placeholder:text-purple-400'
                  }`}
                />
              </div>

              <div className="space-y-2">
                <label className={`text-xs uppercase tracking-[0.2em] ml-1 flex items-center font-bold transition-colors duration-300 ${
                  settings.theme === 'dark' ? 'text-purple-400/60' : 'text-purple-900'
                }`}>
                  <MessageSquare className="w-3 h-3 mr-2" /> Nhu cầu / Câu hỏi (Tùy chọn)
                </label>
                <textarea
                  value={userInfo.request}
                  onChange={(e) => setUserInfo({ ...userInfo, request: e.target.value })}
                  placeholder="Bạn muốn biết điều gì về tương lai?..."
                  rows={3}
                  className={`w-full border rounded-2xl px-5 py-4 transition-all focus:outline-none focus:border-purple-500/50 resize-none ${
                    settings.theme === 'dark'
                      ? 'bg-black/40 border-purple-500/20 text-purple-100 placeholder:text-purple-500/30'
                      : 'bg-white border-purple-200 text-purple-950 placeholder:text-purple-400'
                  }`}
                />
              </div>

              <div className="pt-4 flex gap-4">
                <button
                  onClick={() => setStep('welcome')}
                  className="flex-1 py-4 rounded-2xl border border-purple-500/20 text-purple-700 dark:text-purple-300 font-medium hover:bg-purple-500/5 dark:hover:bg-white/5 transition-all"
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
        className={`mt-12 text-xs tracking-[0.3em] uppercase font-bold transition-colors duration-300 ${
          settings.theme === 'dark' ? 'text-purple-400/40' : 'text-purple-900/40'
        }`}
      >
        Chạm để khám phá điều chưa biết
      </motion.div>
    </div>
  );
};

export default HomeScreen;
