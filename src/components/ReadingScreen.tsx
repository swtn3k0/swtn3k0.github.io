import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SpreadType, ReadingTheme, DrawnCard, TarotCard as TarotCardType, UserInfo, DeckType } from '../types';
import { tarotCards } from '../data/tarotCards';
import { playingCards } from '../data/playingCards';
import ShuffleDeck from './ShuffleDeck';
import TarotCard from './TarotCard';
import { interpretReading } from '../services/geminiService';
import { Sparkles, Heart, Book, Briefcase, Globe, ArrowLeft, Send } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface ReadingScreenProps {
  userInfo: UserInfo;
  deckType: DeckType;
  onReset: () => void;
}

const ReadingScreen: React.FC<ReadingScreenProps> = ({ userInfo, deckType, onReset }) => {
  const [step, setStep] = useState<'question' | 'spread' | 'shuffle' | 'result'>(
    userInfo.request?.trim() ? 'spread' : 'question'
  );
  const [theme] = useState<ReadingTheme>(ReadingTheme.OVERVIEW);
  const [question, setQuestion] = useState(userInfo.request || '');
  const [spreadType, setSpreadType] = useState<SpreadType>(SpreadType.ONE_CARD);
  const [drawnCards, setDrawnCards] = useState<DrawnCard[]>([]);
  const [isShuffling, setIsShuffling] = useState(false);
  const [aiInterpretation, setAiInterpretation] = useState<string | null>(null);
  const [isInterpreting, setIsInterpreting] = useState(false);

  const handleThemeSelect = (t: ReadingTheme) => {
    setTheme(t);
    setStep('question');
  };

  const handleQuestionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (question.trim()) {
      setStep('spread');
    }
  };

  const handleSpreadSelect = (s: SpreadType) => {
    setSpreadType(s);
    setStep('shuffle');
    setIsShuffling(true);
    setTimeout(() => setIsShuffling(false), 3000);
  };

  const handleDraw = () => {
    const count = spreadType === SpreadType.ONE_CARD ? 1 : spreadType === SpreadType.THREE_CARDS ? 3 : 10;
    const deck = deckType === DeckType.TAROT ? tarotCards : playingCards;
    const shuffled = [...deck].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, count).map((card, i) => {
      const isReversed = Math.random() > 0.7;
      let positionName = '';
      if (spreadType === SpreadType.THREE_CARDS) {
        positionName = i === 0 ? 'Past' : i === 1 ? 'Present' : 'Future';
      }
      return { card, isReversed, positionName };
    });
    setDrawnCards(selected);
    setStep('result');
    
    // Start AI interpretation
    setIsInterpreting(true);
    interpretReading(question, theme, spreadType, selected, deckType, userInfo).then((res) => {
      setAiInterpretation(res);
      setIsInterpreting(false);
    });
  };

  const reset = () => {
    setStep(userInfo.request?.trim() ? 'spread' : 'question');
    setQuestion(userInfo.request || '');
    setDrawnCards([]);
    setAiInterpretation(null);
    onReset();
  };

  return (
    <div className="min-h-screen pt-20 pb-10 px-4 max-w-4xl mx-auto flex flex-col items-center">
      <AnimatePresence mode="wait">
        {step === 'question' && (
          <motion.div
            key="question"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="w-full max-w-md"
          >
            <h2 className="text-3xl font-serif mb-4 text-purple-200">Bạn đang nghĩ gì?</h2>
            <p className="text-purple-300/60 mb-8 text-sm italic">Hãy tập trung vào câu hỏi của bạn...</p>
            <form onSubmit={handleQuestionSubmit} className="relative">
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Nhập câu hỏi của bạn tại đây..."
                className="w-full h-32 bg-white/5 border border-white/10 rounded-2xl p-4 text-white placeholder-white/20 focus:outline-none focus:border-purple-500/50 transition-colors resize-none"
                autoFocus
              />
              <button
                type="submit"
                disabled={!question.trim()}
                className="absolute bottom-4 right-4 p-2 rounded-full bg-purple-600 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-purple-500 transition-colors"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
          </motion.div>
        )}

        {step === 'spread' && (
          <motion.div
            key="spread"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="w-full text-center"
          >
            <button onClick={() => setStep('question')} className="flex items-center text-purple-300 mb-6 hover:text-purple-100 transition-colors mx-auto">
              <ArrowLeft className="w-4 h-4 mr-2" /> Chỉnh sửa câu hỏi
            </button>
            <h2 className="text-3xl font-serif mb-8 text-purple-200">Chọn kiểu trải bài</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { type: SpreadType.ONE_CARD, label: 'Một lá bài', desc: 'Lời khuyên nhanh', count: 1 },
                { type: SpreadType.THREE_CARDS, label: 'Ba lá bài', desc: 'Quá khứ, Hiện tại, Tương lai', count: 3 },
                { type: SpreadType.CELTIC_CROSS, label: 'Celtic Cross', desc: 'Phân tích chuyên sâu', count: 10 },
              ].map((item) => (
                <button
                  key={item.type}
                  onClick={() => handleSpreadSelect(item.type)}
                  className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-purple-500/50 transition-all group text-left"
                >
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-2xl font-serif text-purple-300">{item.count}</span>
                    <Sparkles className="w-5 h-5 text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <h3 className="text-xl font-serif mb-2">{item.label}</h3>
                  <p className="text-sm text-purple-300/60">{item.desc}</p>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 'shuffle' && (
          <motion.div
            key="shuffle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full flex flex-col items-center"
          >
            <h2 className="text-3xl font-serif mb-4 text-purple-200">Các lá bài đang kết nối...</h2>
            <p className="text-purple-300/60 mb-12 italic">Hãy thả lỏng tâm trí và tập trung vào năng lượng của bạn.</p>
            <ShuffleDeck
              isShuffling={isShuffling}
              count={spreadType === SpreadType.ONE_CARD ? 1 : spreadType === SpreadType.THREE_CARDS ? 3 : 10}
              onDraw={handleDraw}
              deckType={deckType}
            />
          </motion.div>
        )}

        {step === 'result' && (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full"
          >
            <div className="flex justify-between items-center mb-12">
              <h2 className="text-3xl font-serif text-purple-200">Kết quả trải bài</h2>
              <button onClick={reset} className="text-sm text-purple-400 hover:text-purple-300 uppercase tracking-widest font-bold">
                Trải bài mới
              </button>
            </div>

            <div className="flex flex-wrap justify-center gap-8 mb-16">
              {drawnCards.map((drawn, i) => (
                <div key={i} className="flex flex-col items-center">
                  {drawn.positionName && (
                    <span className="text-xs text-purple-400 uppercase tracking-widest mb-4 font-bold">
                      {drawn.positionName === 'Past' ? 'Quá khứ' : drawn.positionName === 'Present' ? 'Hiện tại' : 'Tương lai'}
                    </span>
                  )}
                  <TarotCard
                    card={drawn.card}
                    isReversed={drawn.isReversed}
                    isFlipped={true}
                    deckType={deckType}
                    className="scale-90 md:scale-100"
                  />
                  <div className="mt-6 text-center max-w-[200px]">
                    <h4 className="text-lg font-serif text-purple-200 mb-2">{drawn.card.name}</h4>
                    <p className="text-xs text-purple-300/70 italic">
                      {drawn.isReversed ? 'Ý nghĩa ngược' : 'Ý nghĩa xuôi'}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
              <div className="flex items-center mb-6">
                <Sparkles className="w-6 h-6 text-purple-400 mr-3" />
                <h3 className="text-2xl font-serif text-purple-200">Lời giải từ Vũ trụ</h3>
              </div>
              
              <div className="prose prose-invert prose-purple max-w-none">
                {isInterpreting ? (
                  <div className="space-y-4 animate-pulse">
                    <div className="h-4 bg-white/10 rounded w-3/4" />
                    <div className="h-4 bg-white/10 rounded w-full" />
                    <div className="h-4 bg-white/10 rounded w-5/6" />
                    <div className="h-4 bg-white/10 rounded w-2/3" />
                  </div>
                ) : (
                  <div className="text-purple-100/90 leading-relaxed markdown-body">
                    <ReactMarkdown>{aiInterpretation || ''}</ReactMarkdown>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ReadingScreen;
