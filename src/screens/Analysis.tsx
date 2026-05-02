import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Sparkles, MapPin } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { interpretPalm } from '../services/aiService';

const stats = [
  { label: "Reading Life Line...", progress: 30 },
  { label: "Reading Fate Line...", progress: 20 },
  { label: "Consulting Star Charts...", progress: 10 },
];

export default function Analysis() {
  const navigate = useNavigate();
  const [loadingText, setLoadingText] = useState("Aligning Cosmic Data...");
  const { currentImage, setCurrentReport, addReport } = useApp();

  useEffect(() => {
    async function runAnalysis() {
      if (!currentImage) {
        navigate('/scan');
        return;
      }

      try {
        setLoadingText("Invoking Divine AI...");
        const report = await interpretPalm(currentImage);
        
        const finalReport = {
          ...report,
          id: Math.random().toString(36).substr(2, 9),
          date: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })
        };

        setCurrentReport(finalReport);
        addReport(finalReport);
        navigate('/results');
      } catch (error) {
        console.error(error);
        setLoadingText("The stars are cloudy. Retrying...");
        setTimeout(() => navigate('/dashboard'), 2000);
      }
    }

    runAnalysis();
  }, [currentImage, navigate, setCurrentReport, addReport]);

  return (
    <div className="min-h-screen flex flex-col items-center py-12 px-6">
      <header className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-4 bg-void-black/40 backdrop-blur-xl border-b border-white/10">
        <div className="flex items-center gap-3">
          <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAE6UppOrLWwZYYAKQmCQV2dBBb-WFenuHwXc4XCZjPlHC65CVFNxw5z7lu93SVqiqlwIZhxVxECwpVGWCVhFNuMykaY5ws8PxeqvAg6EnoRMmlhe5AJlHxc0if4PuJ76rxtYoBCYWMBUsBslBNNSVP_OeMR4by2DpenOE87zZOYYNt83J3K0ejc8xaY4LIV-iqywNyAUB9yLrZ6iGMC-o4jaMVXYJkaaWOOHsbPG8upZAPSo0jtTUFVnqR4LM8uwL0Zd0u-VDP3hLl" className="w-8 h-8 rounded-full shadow-[0_0_10px_#9d50bb]" alt="" />
          <h1 className="font-serif font-bold text-lg gold-gradient bg-clip-text text-transparent">HathRekha AI</h1>
        </div>
        <div className="flex items-center gap-4">
           <MapPin className="w-5 h-5 text-mystic-purple" />
           <div className="w-10 h-10 rounded-full border border-mystic-purple/30 overflow-hidden bg-void-black"></div>
        </div>
      </header>

      <main className="flex-1 w-full max-w-4xl mt-16 flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24 py-12">
        <div className="relative w-full max-w-xs md:max-w-md aspect-[3/4] rounded-[40px] md:rounded-[60px] overflow-hidden glass-card border border-mystic-purple/20 shadow-2xl group">
           {currentImage ? (
             <img src={currentImage} alt="Scan" className="w-full h-full object-cover opacity-60 transition-transform duration-1000 group-hover:scale-110" />
           ) : (
             <div className="w-full h-full bg-void-black flex items-center justify-center text-slate-700 italic">No Image Detected</div>
           )}
           <div className="absolute inset-0 bg-gradient-to-b from-transparent via-void-black/20 to-void-black"></div>
           
           <motion.div 
            animate={{ top: ['0%', '100%', '0%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-cosmic-gold to-transparent shadow-[0_0_30px_#ffdb3c] z-20"
           />

           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <motion.div 
                animate={{ scale: [1, 2, 1], opacity: [0.1, 0.3, 0.1] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute inset-0 bg-mystic-purple rounded-full blur-[100px] shadow-[0_0_80px_#9d50bb]"
              />
              <Sparkles className="w-16 h-16 md:w-24 md:h-24 text-cosmic-gold relative z-30 drop-shadow-[0_0_20px_rgba(255,219,60,0.8)]" />
           </div>

           {/* Viewfinder Brackets */}
           <div className="absolute top-8 left-8 w-12 h-12 border-t-2 border-l-2 border-white/20 rounded-tl-3xl"></div>
           <div className="absolute top-8 right-8 w-12 h-12 border-t-2 border-r-2 border-white/20 rounded-tr-3xl"></div>
           <div className="absolute bottom-8 left-8 w-12 h-12 border-b-2 border-l-2 border-white/20 rounded-bl-3xl"></div>
           <div className="absolute bottom-8 right-8 w-12 h-12 border-b-2 border-r-2 border-white/20 rounded-br-3xl"></div>
        </div>

        <div className="flex-1 w-full max-w-md space-y-12">
            <div className="text-center lg:text-left space-y-4">
               <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-serif text-4xl md:text-5xl gold-gradient bg-clip-text text-transparent"
               >
                 {loadingText}
               </motion.h1>
               <p className="text-slate-400 text-sm md:text-base leading-relaxed italic">
                 "Ancient algorithms are deciphering the lines of your palm. The cosmic tapestry is revealing your hidden potential."
               </p>
            </div>

            <div className="w-full space-y-6">
               {stats.map((stat, i) => (
                 <motion.div 
                  key={i} 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.2 }}
                  className="glass-card p-6 rounded-[28px] space-y-4 border-white/5 hover:border-mystic-purple/20 transition-colors"
                 >
                    <div className="flex justify-between items-center text-[10px] uppercase tracking-[0.2em] font-bold">
                       <span className="text-on-surface-variant">{stat.label}</span>
                       <span className="text-cosmic-gold/80 animate-pulse">Calculating...</span>
                    </div>
                    <div className="w-full h-2 bg-void-black rounded-full overflow-hidden p-0.5 border border-white/5">
                       <motion.div 
                        animate={{ width: ['0%', '80%', '40%', '100%'] }}
                        transition={{ duration: 5, repeat: Infinity, delay: i * 0.5 }}
                        className="h-full rounded-full bg-gradient-to-r from-mystic-purple via-cosmic-gold to-mystic-purple shadow-[0_0_15px_#9d50bb]"
                       />
                    </div>
                 </motion.div>
               ))}
            </div>
        </div>
      </main>
    </div>
  );
}
