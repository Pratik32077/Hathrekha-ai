import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, MapPin, User, PlusCircle, Sparkles } from 'lucide-react';
import { chatWithAstro } from '../services/aiService';
import BottomNav from '../components/BottomNav';

interface Message {
  role: 'ai' | 'user';
  text: string;
  time: string;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', text: "Welcome, seeker. I have mapped the celestial alignment of your life lines. Your fate is shifting with the rising moon. What truth do you wish to unveil today?", time: "10:24 AM" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: Message = { role: 'user', text: input, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await chatWithAstro(input, messages);
      const aiMsg: Message = { role: 'ai', text: response, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
      setMessages(prev => [...prev, aiMsg]);
    } catch (e) {
      console.error(e);
      const errorMsg: Message = { role: 'ai', text: "The stars are obscured for a moment. Please try again soon.", time: "Now" };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="h-screen bg-void-black text-white flex flex-col relative overflow-hidden">
      <div className="fixed inset-0 cosmic-dust opacity-10 pointer-events-none"></div>
      
      <header className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-4 bg-void-black/40 backdrop-blur-xl border-b border-white/10 max-w-6xl mx-auto left-1/2 -translate-x-1/2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full border border-mystic-purple/30 overflow-hidden bg-slate-900 p-1 hidden sm:block">
             <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAE6UppOrLWwZYYAKQmCQV2dBBb-WFenuHwXc4XCZjPlHC65CVFNxw5z7lu93SVqiqlwIZhxVxECwpVGWCVhFNuMykaY5ws8PxeqvAg6EnoRMmlhe5AJlHxc0if4PuJ76rxtYoBCYWMBUsBslBNNSVP_OeMR4by2DpenOE87zZOYYNt83J3K0ejc8xaY4LIV-iqywNyAUB9yLrZ6iGMC-o4jaMVXYJkaaWOOHsbPG8upZAPSo0jtTUFVnqR4LM8uwL0Zd0u-VDP3hLl" className="w-full h-full rounded-full" alt="" />
          </div>
          <div>
            <h1 className="font-serif font-bold text-lg gold-gradient bg-clip-text text-transparent">Astro AI Guide</h1>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em]">Divine Intelligence at your service</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
           <div className="hidden md:flex flex-col items-end">
              <span className="text-[8px] uppercase tracking-widest text-slate-500 font-bold">Signal Strength</span>
              <div className="flex gap-1 h-1 mt-1">
                 <div className="w-3 bg-cosmic-gold rounded-full"></div>
                 <div className="w-3 bg-cosmic-gold rounded-full"></div>
                 <div className="w-3 bg-cosmic-gold rounded-full"></div>
              </div>
           </div>
           <div className="w-10 h-10 rounded-full bg-mystic-purple/10 flex items-center justify-center border border-mystic-purple/30 shadow-lg">
              <User className="w-5 h-5 text-mystic-purple" />
           </div>
        </div>
      </header>

      <main className="flex-1 pt-24 pb-48 overflow-y-auto px-6">
        <div className="max-w-4xl mx-auto space-y-8">
           <AnimatePresence initial={false}>
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className={`flex flex-col ${msg.role === 'ai' ? 'items-start' : 'items-end'}`}
              >
                <div className={`max-w-[85%] md:max-w-[70%] p-6 rounded-[32px] space-y-2 shadow-2xl relative ${msg.role === 'ai' ? 'rounded-tl-none glass-purple border-white/10' : 'rounded-tr-none bg-white text-void-black'}`}>
                   {msg.role === 'ai' && <div className="absolute -left-2 -top-2 text-cosmic-gold"><Sparkles className="w-5 h-5" /></div>}
                   <p className="text-sm md:text-base leading-relaxed tracking-wide">{msg.text}</p>
                </div>
                <span className="text-[8px] md:text-[10px] uppercase tracking-[0.3em] font-bold text-slate-600 mt-3 mx-4">{msg.time}</span>
              </motion.div>
            ))}
           </AnimatePresence>
           
           {isTyping && (
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2 p-4">
                <div className="w-1.5 h-1.5 bg-mystic-purple rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-mystic-purple rounded-full animate-bounce delay-75"></div>
                <div className="w-1.5 h-1.5 bg-mystic-purple rounded-full animate-bounce delay-150"></div>
             </motion.div>
           )}
           <div ref={scrollRef}></div>

           <div className="pt-8 pb-4 space-y-4">
              <p className="text-center text-[8px] uppercase tracking-[0.3em] text-slate-600 font-bold">Seek immediate guidance</p>
              <div className="flex flex-wrap justify-center gap-2">
                 {['Will I be rich?', 'When will I find love?', 'Career advice'].map((q) => (
                   <button 
                    key={q}
                    onClick={() => setInput(q)}
                    className="px-4 py-2 rounded-full glass-card border-mystic-purple/20 text-[10px] font-bold text-mystic-purple hover:border-mystic-purple transition-all"
                   >
                     {q}
                   </button>
                 ))}
              </div>
           </div>
        </div>
      </main>

      {/* Input Overlay */}
      <div className="fixed bottom-0 left-0 w-full z-40 bg-gradient-to-t from-void-black via-void-black to-transparent pt-12 pb-6 px-6">
         <div className="max-w-4xl mx-auto mb-20">
            <div className="relative glass-card rounded-full p-1.5 border border-white/10 group focus-within:border-mystic-purple transition-all shadow-[0_20px_60px_rgba(0,0,0,0.8)] backdrop-blur-2xl">
               <div className="flex items-center">
                  <button className="p-4 text-slate-500 hover:text-mystic-purple transition-colors">
                     <PlusCircle className="w-7 h-7" />
                  </button>
                  <input 
                    type="text" 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Whisper your question to the cosmic consciousness..." 
                    className="flex-1 bg-transparent border-none focus:ring-0 text-sm md:text-base placeholder:text-slate-600 text-white py-4"
                  />
                  <button 
                    onClick={handleSend}
                    disabled={!input.trim()}
                    className={`px-6 py-4 rounded-full transition-all flex items-center justify-center gap-2 ${input.trim() ? 'bg-cosmic-gold text-void-black gold-glow scale-100' : 'text-slate-600 grayscale scale-95 opacity-50'}`}
                  >
                     <span className="hidden sm:block text-[10px] font-bold uppercase tracking-widest">Transmit</span>
                     <Send className="w-5 h-5" />
                  </button>
               </div>
            </div>
         </div>
         <div className="max-w-4xl mx-auto">
           <BottomNav />
         </div>
      </div>
    </div>
  );
}
