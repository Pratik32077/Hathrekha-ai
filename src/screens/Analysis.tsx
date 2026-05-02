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

      <main className="flex-1 w-full max-w-lg mt-16 flex flex-col items-center justify-center space-y-12">
        <div className="relative w-full aspect-[3/4] rounded-3xl overflow-hidden glass-card border border-mystic-purple/20">
           {currentImage ? (
             <img src={currentImage} alt="Scan" className="w-full h-full object-cover opacity-60" />
           ) : (
             <div className="w-full h-full bg-void-black flex items-center justify-center text-slate-700 italic">No Image Detected</div>
           )}
           <div className="absolute inset-0 bg-gradient-to-b from-transparent via-void-black/20 to-void-black"></div>
           
           <motion.div 
            animate={{ top: ['0%', '100%', '0%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-0 w-full h-[2px] bg-cosmic-gold shadow-[0_0_20px_#ffdb3c] z-20"
           />

           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <motion.div 
                animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 bg-mystic-purple rounded-full blur-3xl shadow-[0_0_60px_#9d50bb]"
              />
              <Sparkles className="w-16 h-16 text-cosmic-gold relative z-30" />
           </div>
        </div>

        <div className="w-full text-center space-y-2">
           <h1 className="font-serif text-3xl text-mystic-purple">{loadingText}</h1>
           <p className="text-on-surface-variant text-sm max-w-xs mx-auto">Connecting to the Great Neural Akashic Records...</p>
        </div>

        <div className="w-full space-y-4">
           {stats.map((stat, i) => (
             <div key={i} className="glass-card p-6 rounded-2xl space-y-4">
                <div className="flex justify-between items-center text-[10px] uppercase tracking-widest font-bold">
                   <span className="text-tertiary">{stat.label}</span>
                   <span className="text-cosmic-gold animate-pulse">Scanning...</span>
                </div>
                <div className="w-full h-1.5 bg-void-black rounded-full overflow-hidden">
                   <motion.div 
                    animate={{ width: ['0%', '80%', '40%', '100%'] }}
                    transition={{ duration: 5, repeat: Infinity }}
                    className="h-full bg-gradient-to-r from-mystic-purple via-cosmic-gold to-mystic-purple shadow-[0_0_10px_rgba(157,80,187,0.5)]"
                   />
                </div>
             </div>
           ))}
        </div>
      </main>
    </div>
  );
}
