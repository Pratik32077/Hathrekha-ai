import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Image as ImageIcon, MapPin, Sparkles } from 'lucide-react';
import BottomNav from '../components/BottomNav';
import { useApp } from '../context/AppContext';

export default function Scan() {
  const [selectedSide, setSelectedSide] = useState<'left' | 'right'>('left');
  const [isCapturing, setIsCapturing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { setCurrentImage } = useApp();

  const handleCapture = () => {
    setIsCapturing(true);
    // Use a placeholder for internal "capture"
    setCurrentImage('data:image/jpeg;base64,mock'); 
    setTimeout(() => {
      navigate('/analysis');
    }, 1500);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setCurrentImage(reader.result as string);
        navigate('/analysis');
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="h-screen bg-void-black text-white overflow-hidden relative">
      <header className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-4 bg-void-black/40 backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="text-slate-400">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="font-serif font-bold text-lg gold-gradient bg-clip-text text-transparent">HathRekha AI</h1>
        </div>
        <div className="flex items-center gap-3">
          <MapPin className="w-5 h-5 text-mystic-purple" />
          <div className="w-8 h-8 rounded-full border border-mystic-purple p-1">
             <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAE6UppOrLWwZYYAKQmCQV2dBBb-WFenuHwXc4XCZjPlHC65CVFNxw5z7lu93SVqiqlwIZhxVxECwpVGWCVhFNuMykaY5ws8PxeqvAg6EnoRMmlhe5AJlHxc0if4PuJ76rxtYoBCYWMBUsBslBNNSVP_OeMR4by2DpenOE87zZOYYNt83J3K0ejc8xaY4LIV-iqywNyAUB9yLrZ6iGMC-o4jaMVXYJkaaWOOHsbPG8upZAPSo0jtTUFVnqR4LM8uwL0Zd0u-VDP3hLl" className="w-full h-full rounded-full" alt="" />
          </div>
        </div>
      </header>

      <main className="min-h-screen pt-20 pb-40 relative flex flex-col items-center max-w-4xl mx-auto overflow-y-auto">
        {/* Viewfinder Background (Simulated) */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="w-full h-full grayscale opacity-30 bg-[url('https://images.unsplash.com/photo-1512756290469-ec264b7fbf87?auto=format&fit=crop&q=80&w=1000')] bg-cover bg-center"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-void-black via-transparent to-void-black/80"></div>
        </div>

        <div className="relative z-10 w-full px-6 flex flex-col items-center space-y-8 md:space-y-12">
           <div className="text-center space-y-4">
              <motion.p 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-cosmic-gold text-[10px] font-bold uppercase tracking-[0.3em] gold-glow inline-block px-4 py-2 rounded-full bg-cosmic-gold/10 backdrop-blur-md border border-cosmic-gold/20"
              >
                Scan your {selectedSide} palm for reading
              </motion.p>
              
              <div className="flex p-1.5 bg-void-black/80 backdrop-blur-2xl rounded-full border border-white/10 w-fit mx-auto shadow-2xl">
                 <button 
                  onClick={() => setSelectedSide('left')}
                  className={`px-6 md:px-8 py-2 md:py-2.5 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest transition-all ${selectedSide === 'left' ? 'bg-mystic-purple text-white shadow-[0_0_20px_rgba(157,80,187,0.4)]' : 'text-slate-500 hover:text-slate-300'}`}
                 >
                   Left
                 </button>
                 <button 
                  onClick={() => setSelectedSide('right')}
                  className={`px-6 md:px-8 py-2 md:py-2.5 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest transition-all ${selectedSide === 'right' ? 'bg-mystic-purple text-white shadow-[0_0_20px_rgba(157,80,187,0.4)]' : 'text-slate-500 hover:text-slate-300'}`}
                 >
                   Right
                 </button>
              </div>
           </div>

           {/* Palm Overlay Viewfinder */}
           <div className="relative w-full max-w-[280px] md:max-w-xs aspect-[3/4] flex items-center justify-center p-6 md:p-8 glass-card rounded-[40px] md:rounded-[60px] border-white/10 group shadow-2xl">
              <div className="absolute inset-3 md:inset-4 border border-white/10 rounded-[32px] md:rounded-[48px] pointer-events-none group-hover:border-mystic-purple/30 transition-colors"></div>
              
              <svg className={`w-full h-full text-cosmic-gold/40 transition-all duration-700 ${selectedSide === 'right' ? 'scale-x-[-1]' : ''}`} viewBox="0 0 200 300">
                <path className="stroke-current fill-none stroke-[1.5] transition-all duration-1000" d="M50,280 Q30,250 30,180 Q30,120 45,100 Q60,80 70,100 Q75,120 75,180" opacity="0.6" strokeDasharray="8 8" />
                <path className="stroke-current fill-none stroke-[1.5] transition-all duration-1000" d="M85,280 Q75,220 75,120 Q75,50 90,40 Q105,30 110,40 Q115,50 110,120" opacity="0.8" strokeDasharray="8 8" />
                <path className="stroke-current fill-none stroke-[1.5] transition-all duration-1000" d="M125,280 Q120,220 125,140 Q125,70 140,65 Q155,60 160,75 Q165,90 155,140" opacity="0.6" strokeDasharray="8 8" />
                <path className="stroke-current fill-none stroke-[1.5] transition-all duration-1000" d="M165,280 Q160,250 165,200 Q165,130 175,130 Q185,130 185,150 Q185,200 175,280" opacity="0.4" strokeDasharray="8 8" />
                <path className="stroke-current fill-none stroke-[2] shadow-[0_0_20px_rgba(255,219,60,0.5)]" d="M40,290 Q20,290 20,200 Q20,150 60,130 Q100,110 140,110 Q180,110 180,200 Q180,290 160,290" opacity="0.5" strokeDasharray="10 10" />
              </svg>

              <div className="absolute inset-x-8 w-[calc(100%-64px)] h-[2px] bg-gradient-to-r from-transparent via-cosmic-gold to-transparent shadow-[0_0_30px_#ffdb3c] animate-scan opacity-80"></div>
              
              {/* Corner Brackets */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cosmic-gold/40 rounded-tl-2xl md:rounded-tl-3xl"></div>
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cosmic-gold/40 rounded-tr-2xl md:rounded-tr-3xl"></div>
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-cosmic-gold/40 rounded-bl-2xl md:rounded-bl-3xl"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cosmic-gold/40 rounded-br-2xl md:rounded-br-3xl"></div>
           </div>

           <div className="flex flex-col items-center gap-8 md:gap-12 w-full">
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="px-8 py-3.5 bg-white/5 backdrop-blur-3xl border border-white/10 rounded-full flex items-center gap-3 font-bold text-[10px] md:text-xs uppercase tracking-widest hover:bg-white/10 transition-all group active:scale-95 shadow-xl"
              >
                <ImageIcon className="w-5 h-5 text-mystic-purple group-hover:rotate-12 transition-transform" />
                Upload from Gallery
              </button>

              <div className="relative group">
                <motion.div 
                  animate={{ scale: [1, 1.25, 1], opacity: [0.1, 0.3, 0.1] }} 
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute inset-0 bg-cosmic-gold/30 rounded-full blur-2xl"
                />
                <button 
                  onClick={handleCapture}
                  className="relative z-10 w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-tr from-cosmic-gold via-white to-[#b8860b] p-1 shadow-[0_0_50px_rgba(255,219,60,0.5)] active:scale-90 transition-all"
                >
                  <div className="w-full h-full rounded-full border-[4px] md:border-[6px] border-void-black/20 flex items-center justify-center bg-void-black/10 backdrop-blur-sm shadow-inner transition-transform group-hover:scale-95">
                    <Sparkles className="w-8 h-8 md:w-10 md:h-10 text-void-black p-0.5" />
                  </div>
                </button>
              </div>
           </div>
        </div>
      </main>

      <input 
        type="file" 
        hidden 
        ref={fileInputRef} 
        accept="image/*" 
        onChange={handleFileUpload}
      />

      <BottomNav />
      
      {isCapturing && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-[100] bg-white pointer-events-none"
        ></motion.div>
      )}
    </div>
  );
}
