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
    <div className="min-h-screen flex flex-col items-center justify-between py-12 px-6">
      <div className="w-full flex justify-end">
        <button onClick={() => navigate('/auth')} className="text-on-surface-variant text-sm font-sans uppercase tracking-widest">Skip</button>
      </div>

      <div className="flex-1 w-full max-w-md flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
            className="w-full flex flex-col items-center text-center space-y-8"
          >
            {steps[current].image ? (
               <div className="relative w-64 h-64 rounded-full overflow-hidden border-2 border-mystic-purple/20 p-2">
                  <div className="absolute inset-0 bg-mystic-purple/20 blur-3xl"></div>
                  <img src={steps[current].image} alt="" className="w-full h-full object-cover rounded-full opacity-60" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full h-[2px] bg-mystic-purple shadow-[0_0_15px_#9d50bb] animate-scan"></div>
                  </div>
               </div>
            ) : steps[current].grid ? (
               <div className="grid grid-cols-3 gap-4 w-full">
                  {steps[current].grid?.map((item, i) => (
                    <div key={i} className="glass-card aspect-square rounded-2xl flex flex-col items-center justify-center space-y-2 border-cosmic-gold/20">
                      <div className="text-cosmic-gold">{item.icon}</div>
                      <span className="text-[10px] uppercase font-bold tracking-widest text-cosmic-gold">{item.label}</span>
                    </div>
                  ))}
               </div>
            ) : null}

            <div className="glass-card p-8 rounded-3xl space-y-4">
              <h1 className="font-serif text-3xl font-bold">{steps[current].title}</h1>
              <p className="font-sans text-on-surface-variant leading-relaxed">
                {steps[current].description}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="w-full max-w-md space-y-8">
        <div className="flex justify-center gap-2">
          {steps.map((_, i) => (
            <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? 'w-8 bg-mystic-purple' : 'w-2 bg-white/10'}`}></div>
          ))}
        </div>

        <button 
          onClick={handleNext}
          className="w-full py-5 gold-gradient rounded-full font-bold text-void-black gold-glow flex items-center justify-center gap-2 transition-transform active:scale-95"
        >
          {current === steps.length - 1 ? 'Get Started' : 'Next'}
          <ChevronRight className="w-5 h-5" />
        </button>

        <p className="text-center text-xs text-on-surface-variant/60 font-sans uppercase tracking-[0.2em]">
          Already have an account? <span onClick={() => navigate('/auth')} className="text-cosmic-gold cursor-pointer">Sign In</span>
        </p>
      </div>
    </div>
  );
}
