import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';

export default function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/onboarding');
    }, 4000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden relative">
      {/* Background Particles (Simulated) */}
      <div className="absolute inset-0 cosmic-dust opacity-30"></div>
      
      <motion.div
        initial={{ scale: 0.8, opacity: 0, rotate: -5 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
        className="relative mb-16"
      >
        <div className="absolute inset-0 bg-mystic-purple/40 blur-[100px] rounded-full scale-150 animate-pulse"></div>
        <div className="relative z-10 w-56 h-56 md:w-72 md:h-72 p-2 glass-card rounded-[60px] flex items-center justify-center overflow-hidden border-white/20 shadow-[0_0_100px_rgba(157,80,187,0.3)] rotate-12">
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAE6UppOrLWwZYYAKQmCQV2dBBb-WFenuHwXc4XCZjPlHC65CVFNxw5z7lu93SVqiqlwIZhxVxECwpVGWCVhFNuMykaY5ws8PxeqvAg6EnoRMmlhe5AJlHxc0if4PuJ76rxtYoBCYWMBUsBslBNNSVP_OeMR4by2DpenOE87zZOYYNt83J3K0ejc8xaY4LIV-iqywNyAUB9yLrZ6iGMC-o4jaMVXYJkaaWOOHsbPG8upZAPSo0jtTUFVnqR4LM8uwL0Zd0u-VDP3hLl" 
            alt="HathRekha AI" 
            className="w-full h-full object-cover rounded-[48px] opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-void-black/60 to-transparent"></div>
        </div>
      </motion.div>

      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 1.2 }}
        className="space-y-4 z-10"
      >
        <h1 className="font-serif text-5xl md:text-7xl font-bold bg-gradient-to-b from-white via-cosmic-gold to-[#725f00] bg-clip-text text-transparent tracking-tight">
          HathRekha AI
        </h1>
        <p className="font-sans text-[10px] md:text-xs tracking-[0.5em] uppercase text-slate-400 font-bold">
          Empowering Your Path with Artificial Astrology
        </p>
      </motion.div>

      <div className="absolute bottom-24 w-full max-w-xs space-y-6 px-8">
        <div className="relative h-1 w-full bg-white/5 rounded-full overflow-hidden shadow-inner">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 4, ease: "easeInOut" }}
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-mystic-purple via-cosmic-gold to-mystic-purple"
          ></motion.div>
        </div>
        <div className="flex justify-between items-center text-[8px] md:text-[10px] font-sans tracking-[0.3em] text-slate-500 uppercase font-bold">
          <span>Mapping Astral Coordinates</span>
          <motion.span 
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-cosmic-gold"
          >
            Processing...
          </motion.span>
        </div>
      </div>
    </div>
  );
}
