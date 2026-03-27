import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import CosmicBackground from './components/CosmicBackground';
import HomeScreen from './components/HomeScreen';
import ReadingScreen from './components/ReadingScreen';
import { Sparkles, Settings, X, Check } from 'lucide-react';

export default function App() {
  const [view, setView] = useState<'home' | 'reading'>('home');
  const [showSettings, setShowSettings] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const savedKey = localStorage.getItem('gemini_api_key');
    if (savedKey) {
      setApiKey(savedKey);
    } else {
      // If no key, show settings automatically on first load
      setShowSettings(true);
    }
  }, []);

  const saveApiKey = () => {
    localStorage.setItem('gemini_api_key', apiKey.trim());
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      setShowSettings(false);
    }, 1500);
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
          <button 
            className="p-2 rounded-full transition-all hover:bg-white/5 text-purple-100/60"
            onClick={() => setShowSettings(true)}
          >
            <Settings className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Settings Modal */}
      <AnimatePresence>
        {showSettings && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center px-6 bg-black/90 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-md bg-zinc-900/50 border border-purple-500/30 rounded-3xl p-8 relative"
            >
              <button 
                className="absolute top-4 right-4 text-purple-300/50 hover:text-white"
                onClick={() => setShowSettings(false)}
              >
                <X className="w-6 h-6" />
              </button>

              <h2 className="text-2xl font-serif text-purple-100 mb-6 flex items-center">
                <Settings className="w-5 h-5 mr-3 text-purple-400" />
                Cấu hình Vũ trụ
              </h2>

              <p className="text-sm text-purple-200/60 mb-6 leading-relaxed">
                Để kết nối với trí tuệ AI, vui lòng nhập khóa Gemini API của bạn. Khóa này sẽ được lưu an toàn trên thiết bị của bạn.
              </p>

              <div className="space-y-4">
                <div className="relative">
                  <input 
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="Nhập API Key của bạn..."
                    className="w-full bg-black/50 border border-purple-500/20 rounded-xl px-4 py-3 text-purple-100 placeholder:text-purple-500/30 focus:outline-none focus:border-purple-500/50 transition-all"
                  />
                </div>

                <button 
                  onClick={saveApiKey}
                  disabled={!apiKey.trim()}
                  className="w-full bg-purple-600 hover:bg-purple-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-3 rounded-xl transition-all flex items-center justify-center"
                >
                  {isSaved ? (
                    <>
                      <Check className="w-5 h-5 mr-2" />
                      Đã lưu thành công
                    </>
                  ) : (
                    "Lưu cấu hình"
                  )}
                </button>

                <div className="pt-4 text-center">
                  <a 
                    href="https://aistudio.google.com/app/apikey" 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-xs text-purple-400 hover:text-purple-300 underline underline-offset-4"
                  >
                    Lấy khóa API mới tại đây
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="relative z-10">
        <AnimatePresence mode="wait">
          {view === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <HomeScreen onStart={() => setView('reading')} />
            </motion.div>
          )}

          {view === 'reading' && (
            <motion.div
              key="reading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ReadingScreen />
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
