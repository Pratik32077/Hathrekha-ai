import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, Sparkles, Heart, Briefcase, Zap } from 'lucide-react';

const steps = [
  {
    title: "AI Palm Scan",
    description: "Experience the fusion of ancient wisdom and futuristic AI. Our precision scanners map every detail of your palm.",
    icon: <Sparkles className="w-12 h-12 text-mystic-purple" />,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBJHBYd2Gju53_aHCuBPwx_gPigmYB8Nyy9lbAdjhyIuMJm4RLb8D2Mk3zWosZLZ2-G7GxaxHBGlpzOT-PTIfWuUIgZJwJ04dew317M9Od2EejBx6TT4lWxWy-Sj9-NGyGHThH78D3ABojiEhkPfoe8AkbmyHB1XC4OXgGtRXyINYppT8THTWxYiDPNZ5xMXBfLODARXoBCFbLfjbzYElz1EDwi-jgPYQ-ek_f-_7roGzaxls15F0da3vI6HJ_d1zpzSRP67SqvJCOj"
  },
  {
    title: "Beautiful Insights",
    description: "Receive elegant, gold-themed reports detailing your professional growth, romantic destiny, and financial abundance.",
    icon: <Heart className="w-12 h-12 text-pink-500" />,
    grid: [
       { label: "Career", icon: <Briefcase className="w-6 h-6" /> },
       { label: "Love", icon: <Heart className="w-6 h-6" /> },
       { label: "Wealth", icon: <Zap className="w-6 h-6" /> }
    ]
  },
  {
    title: "Astro AI Chat",
    description: "Consult with your personal celestial AI. Ask questions about your future and navigate your destiny.",
    icon: <Sparkles className="w-12 h-12 text-cosmic-gold" />,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAE6UppOrLWwZYYAKQmCQV2dBBb-WFenuHwXc4XCZjPlHC65CVFNxw5z7lu93SVqiqlwIZhxVxECwpVGWCVhFNuMykaY5ws8PxeqvAg6EnoRMmlhe5AJlHxc0if4PuJ76rxtYoBCYWMBUsBslBNNSVP_OeMR4by2DpenOE87zZOYYNt83J3K0ejc8xaY4LIV-iqywNyAUB9yLrZ6iGMC-o4jaMVXYJkaaWOOHsbPG8upZAPSo0jtTUFVnqR4LM8uwL0Zd0u-VDP3hLl"
  }
];

export default function Onboarding() {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    if (current < steps.length - 1) {
      setCurrent(current + 1);
    } else {
      navigate('/auth');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-between py-12 px-6 max-w-4xl mx-auto overflow-hidden">
      <div className="w-full flex justify-end">
        <button onClick={() => navigate('/auth')} className="text-on-surface-variant text-[10px] font-sans uppercase tracking-[0.3em] font-bold">Skip</button>
      </div>

      <div className="flex-1 w-full flex flex-col items-center justify-center py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.1, y: -20 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="w-full flex flex-col items-center text-center space-y-12"
          >
            {steps[current].image ? (
               <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-[60px] overflow-hidden border-2 border-white/10 p-2 shadow-2xl rotate-3">
                  <div className="absolute inset-0 bg-gradient-to-tr from-mystic-purple/40 to-transparent blur-3xl opacity-50"></div>
                  <img src={steps[current].image} alt="" className="w-full h-full object-cover rounded-[48px] opacity-70 transition-transform duration-700 hover:scale-110" />
                  <div className="absolute inset-0 flex items-center justify-center p-8">
                    <div className="w-full h-1 bg-gradient-to-r from-transparent via-mystic-purple to-transparent shadow-[0_0_30px_#9d50bb] animate-scan opacity-80"></div>
                  </div>
               </div>
            ) : steps[current].grid ? (
               <div className="grid grid-cols-3 gap-6 w-full max-w-sm">
                  {steps[current].grid?.map((item, i) => (
                    <motion.div 
                      key={i} 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="glass-card aspect-square rounded-3xl flex flex-col items-center justify-center space-y-3 border-cosmic-gold/20 shadow-xl"
                    >
                      <div className="text-cosmic-gold group-hover:scale-110 transition-transform">{item.icon}</div>
                      <span className="text-[10px] uppercase font-bold tracking-widest text-cosmic-gold">{item.label}</span>
                    </motion.div>
                  ))}
               </div>
            ) : null}

            <div className="space-y-6 max-w-[280px] md:max-w-md">
              <h1 className="font-serif text-4xl md:text-5xl font-bold gold-gradient bg-clip-text text-transparent">{steps[current].title}</h1>
              <p className="font-sans text-slate-400 leading-relaxed text-sm md:text-lg">
                {steps[current].description}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="w-full max-w-sm space-y-10">
        <div className="flex justify-center gap-3">
          {steps.map((_, i) => (
            <motion.div 
              key={i} 
              animate={{ width: i === current ? 48 : 8 }}
              className={`h-2 rounded-full transition-all duration-500 ease-out ${i === current ? 'bg-cosmic-gold shadow-[0_0_15px_#ffdb3c]' : 'bg-white/10'}`}
            ></motion.div>
          ))}
        </div>

        <button 
          onClick={handleNext}
          className="w-full py-6 gold-gradient rounded-full font-bold text-void-black gold-glow flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-95 shadow-2xl"
        >
          <span className="uppercase tracking-[0.2em]">{current === steps.length - 1 ? 'Unlock My Future' : 'Next Insight'}</span>
          <ChevronRight className="w-5 h-5" />
        </button>

        <p className="text-center text-[10px] text-slate-500 font-sans uppercase tracking-[0.3em] font-medium">
          Already a believer? <span onClick={() => navigate('/auth')} className="text-cosmic-gold cursor-pointer font-bold border-b border-cosmic-gold/30 pb-0.5 ml-1">Sign In</span>
        </p>
      </div>
    </div>
  );
}
