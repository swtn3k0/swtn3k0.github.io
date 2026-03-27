import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import CosmicBackground from './components/CosmicBackground';
import HomeScreen from './components/HomeScreen';
import ReadingScreen from './components/ReadingScreen';
import { Sparkles, Settings, Moon, Sun, Zap, ZapOff, X } from 'lucide-react';
import { DeckType, UserInfo } from './types';
import { SettingsProvider, useSettings } from './contexts/SettingsContext';

function AppContent() {
  const [view, setView] = useState<'home' | 'reading'>('home');
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [deckType, setDeckType] = useState<DeckType>(DeckType.TAROT);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const { settings, toggleTheme, toggleEffects } = useSettings();

  const handleStart = (info: UserInfo, type: DeckType) => {
    setUserInfo(info);
    setDeckType(type);
    setView('reading');
  };

  return (
    <div className={`relative min-h-screen selection:bg-purple-500/30 transition-colors duration-300 ${settings.theme === 'dark' ? 'bg-black text-white' : 'bg-white text-gray-900'}`}>
      {settings.effectsEnabled && <CosmicBackground />}
      
      {/* Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 px-6 py-6 flex justify-between items-center backdrop-blur-sm transition-colors duration-300 ${settings.theme === 'dark' ? 'bg-black/40' : 'bg-white/40 border-b border-gray-200'}`}>
        <div 
          className="flex items-center cursor-pointer group"
          onClick={() => setView('home')}
        >
          <div className={`w-10 h-10 rounded-full border flex items-center justify-center mr-3 transition-colors ${settings.theme === 'dark' ? 'border-purple-500/30 group-hover:border-purple-500' : 'border-purple-200 group-hover:border-purple-400'}`}>
            <Sparkles className={`w-5 h-5 ${settings.theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`} />
          </div>
          <span className={`text-xl font-serif tracking-widest uppercase transition-colors ${settings.theme === 'dark' ? 'text-purple-100' : 'text-purple-900'}`}>Thiên Không</span>
        </div>
        
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setIsSettingsOpen(true)}
            className={`p-2 rounded-full transition-all hover:bg-white/10 ${settings.theme === 'dark' ? 'text-purple-100/60' : 'text-purple-900/60'}`}
          >
            <Settings className="w-6 h-6" />
          </button>
        </div>
      </nav>

      <main className="relative z-10">
        <AnimatePresence mode="wait">
          {view === 'home' && (
            <motion.div
              key="home"
              initial={settings.effectsEnabled ? { opacity: 0 } : { opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={settings.effectsEnabled ? { opacity: 0 } : { opacity: 1 }}
            >
              <HomeScreen onStart={handleStart} />
            </motion.div>
          )}

          {view === 'reading' && userInfo && (
            <motion.div
              key="reading"
              initial={settings.effectsEnabled ? { opacity: 0 } : { opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={settings.effectsEnabled ? { opacity: 0 } : { opacity: 1 }}
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

      {/* Settings Modal */}
      <AnimatePresence>
        {isSettingsOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={settings.effectsEnabled ? { opacity: 0 } : { opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={settings.effectsEnabled ? { opacity: 0 } : { opacity: 1 }}
              onClick={() => setIsSettingsOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />
            <motion.div
              initial={settings.effectsEnabled ? { opacity: 0, scale: 0.9, y: 20 } : { opacity: 1, scale: 1, y: 0 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={settings.effectsEnabled ? { opacity: 0, scale: 0.9, y: 20 } : { opacity: 1, scale: 1, y: 0 }}
              className={`relative w-full max-w-sm rounded-3xl p-8 shadow-2xl border transition-colors duration-300 ${settings.theme === 'dark' ? 'bg-gray-900 border-white/10 text-white' : 'bg-white border-gray-200 text-gray-900'}`}
            >
              <button 
                onClick={() => setIsSettingsOpen(false)}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-black/5 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <h2 className="text-2xl font-serif mb-8">Cài đặt</h2>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {settings.theme === 'dark' ? <Moon className="w-5 h-5 text-purple-400" /> : <Sun className="w-5 h-5 text-yellow-500" />}
                    <span className="font-medium">Chế độ {settings.theme === 'dark' ? 'Tối' : 'Sáng'}</span>
                  </div>
                  <button 
                    onClick={toggleTheme}
                    className={`w-12 h-6 rounded-full relative transition-colors ${settings.theme === 'dark' ? 'bg-purple-600' : 'bg-gray-200'}`}
                  >
                    <motion.div 
                      animate={{ x: settings.theme === 'dark' ? 26 : 2 }}
                      transition={settings.effectsEnabled ? undefined : { duration: 0 }}
                      className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm"
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {settings.effectsEnabled ? <Zap className="w-5 h-5 text-blue-400" /> : <ZapOff className="w-5 h-5 text-gray-400" />}
                    <div className="flex flex-col">
                      <span className="font-medium">Hiệu ứng hình ảnh</span>
                      <span className="text-[10px] opacity-50 uppercase tracking-wider">Tắt cho máy yếu</span>
                    </div>
                  </div>
                  <button 
                    onClick={toggleEffects}
                    className={`w-12 h-6 rounded-full relative transition-colors ${settings.effectsEnabled ? 'bg-blue-600' : 'bg-gray-200'}`}
                  >
                    <motion.div 
                      animate={{ x: settings.effectsEnabled ? 26 : 2 }}
                      transition={settings.effectsEnabled ? undefined : { duration: 0 }}
                      className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm"
                    />
                  </button>
                </div>
              </div>

              <div className="mt-10 pt-6 border-t border-gray-100 dark:border-white/5 text-center">
                <p className="text-[10px] opacity-30 uppercase tracking-[0.2em]">Celestial Tarot v1.0</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className={`relative z-10 py-10 text-center text-[10px] uppercase tracking-[0.5em] transition-colors ${settings.theme === 'dark' ? 'text-purple-400/30' : 'text-purple-900/30'}`}>
        &copy; 2026 Celestial Tarot &bull; Dẫn lối bởi Vũ trụ
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <SettingsProvider>
      <AppContent />
    </SettingsProvider>
  );
}
