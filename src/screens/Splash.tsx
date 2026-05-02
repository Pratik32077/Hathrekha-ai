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
    <div className="h-screen flex flex-col items-center justify-center text-center px-6">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="relative mb-12"
      >
        <div className="absolute inset-0 bg-mystic-purple/30 blur-3xl rounded-full scale-125"></div>
        <div className="relative z-10 w-48 h-48 md:w-56 md:h-56 p-2 glass-card rounded-full flex items-center justify-center overflow-hidden border-white/20">
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAE6UppOrLWwZYYAKQmCQV2dBBb-WFenuHwXc4XCZjPlHC65CVFNxw5z7lu93SVqiqlwIZhxVxECwpVGWCVhFNuMykaY5ws8PxeqvAg6EnoRMmlhe5AJlHxc0if4PuJ76rxtYoBCYWMBUsBslBNNSVP_OeMR4by2DpenOE87zZOYYNt83J3K0ejc8xaY4LIV-iqywNyAUB9yLrZ6iGMC-o4jaMVXYJkaaWOOHsbPG8upZAPSo0jtTUFVnqR4LM8uwL0Zd0u-VDP3hLl" 
            alt="HathRekha AI" 
            className="w-full h-full object-cover rounded-full"
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="space-y-2"
      >
        <h1 className="font-serif text-4xl md:text-5xl font-bold bg-gradient-to-b from-cosmic-gold via-[#e9c400] to-[#725f00] bg-clip-text text-transparent">
          HathRekha AI
        </h1>
        <p className="font-sans text-sm tracking-[0.3em] uppercase text-on-surface-variant">
          Scan Your Palm. Decode Your Destiny.
        </p>
      </motion.div>

      <div className="absolute bottom-24 w-64 space-y-4">
        <div className="relative h-[2px] w-full bg-white/10 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 3.5, ease: "linear" }}
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-mystic-purple via-cosmic-gold to-mystic-purple"
          ></motion.div>
        </div>
        <div className="flex justify-between items-center text-[10px] font-sans tracking-widest text-on-surface-variant/60 uppercase">
          <span>Aligning Cosmic Data</span>
          <span className="text-cosmic-gold">75%</span>
        </div>
      </div>
    </div>
  );
}
