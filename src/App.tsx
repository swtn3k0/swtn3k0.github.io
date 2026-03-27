import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import CosmicBackground from './components/CosmicBackground';
import HomeScreen from './components/HomeScreen';
import ReadingScreen from './components/ReadingScreen';
import { Sparkles, Info } from 'lucide-react';
import { DeckType, UserInfo } from './types';

export default function App() {
  const [view, setView] = useState<'home' | 'reading'>('home');
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [deckType, setDeckType] = useState<DeckType>(DeckType.TAROT);

  const handleStart = (info: UserInfo, type: DeckType) => {
    setUserInfo(info);
    setDeckType(type);
    setView('reading');
  };

  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-purple-500/30">
      <CosmicBackground />
      
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-6 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent backdrop-blur-sm">
        <div 
          className="flex items-center cursor-pointer group"
          onClick={() => setView('home')}
        >
          <div className="w-10 h-10 rounded-full border border-purple-500/30 flex items-center justify-center mr-3 group-hover:border-purple-500 transition-colors">
            <Sparkles className="w-5 h-5 text-purple-400" />
          </div>
          <span className="text-xl font-serif tracking-widest uppercase text-purple-100">Thiên Không</span>
        </div>
        
        <div className="flex items-center space-x-6">
          <button className="p-2 rounded-full transition-all hover:bg-white/5 text-purple-100/60">
            <Info className="w-6 h-6" />
          </button>
        </div>
      </nav>

      <main className="relative z-10">
        <AnimatePresence mode="wait">
          {view === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <HomeScreen onStart={handleStart} />
            </motion.div>
          )}

          {view === 'reading' && userInfo && (
            <motion.div
              key="reading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ReadingScreen 
                userInfo={userInfo} 
                deckType={deckType} 
                onReset={() => setView('home')}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-10 text-center text-[10px] text-purple-400/30 uppercase tracking-[0.5em]">
        &copy; 2026 Celestial Tarot &bull; Dẫn lối bởi Vũ trụ
      </footer>
    </div>
  );
}
