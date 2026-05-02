import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Award, CheckCircle, X, Sparkles, FileText, Zap, Shield, HelpCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Premium() {
  const navigate = useNavigate();
  const { user, upgradeToPremium } = useApp();

  const handleUpgrade = async () => {
    if (user) {
      await upgradeToPremium();
      setTimeout(() => navigate('/dashboard'), 500);
    }
  };

  return (
    <div className="min-h-screen bg-void-black text-white relative">
      {/* Background Glows */}
      <div className="fixed top-0 left-0 w-full h-[60vh] bg-gradient-to-b from-mystic-purple/20 to-transparent pointer-events-none"></div>
      
      <header className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-4 bg-void-black/40 backdrop-blur-xl border-b border-white/10">
        <div className="flex items-center gap-3">
          <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAE6UppOrLWwZYYAKQmCQV2dBBb-WFenuHwXc4XCZjPlHC65CVFNxw5z7lu93SVqiqlwIZhxVxECwpVGWCVhFNuMykaY5ws8PxeqvAg6EnoRMmlhe5AJlHxc0if4PuJ76rxtYoBCYWMBUsBslBNNSVP_OeMR4by2DpenOE87zZOYYNt83J3K0ejc8xaY4LIV-iqywNyAUB9yLrZ6iGMC-o4jaMVXYJkaaWOOHsbPG8upZAPSo0jtTUFVnqR4LM8uwL0Zd0u-VDP3hLl" className="w-8 h-8 rounded-full shadow-[0_0_10px_#ffd70044]" alt="" />
          <h1 className="font-serif font-bold text-lg gold-gradient bg-clip-text text-transparent">HathRekha AI</h1>
        </div>
        <button onClick={() => navigate(-1)} className="text-slate-500 hover:text-white transition-colors">
          <X className="w-6 h-6" />
        </button>
      </header>

      <main className="pt-24 pb-32 px-6 max-w-6xl mx-auto space-y-12 shrink-0">
        {/* Hero Section */}
        <section className="text-center space-y-8 flex flex-col items-center">
           <motion.div 
            animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="w-32 h-32 md:w-48 md:h-48 relative flex items-center justify-center"
           >
              <div className="absolute inset-0 gold-glow bg-cosmic-gold/20 rounded-full blur-3xl scale-125"></div>
              <Award className="w-20 h-20 md:w-32 md:h-32 text-cosmic-gold relative z-10" />
           </motion.div>
           <div className="space-y-4 max-w-2xl">
              <h2 className="font-serif text-5xl md:text-7xl font-bold bg-gradient-to-b from-white to-slate-500 bg-clip-text text-transparent tracking-tight">HathRekha Pro</h2>
              <p className="font-sans text-lg md:text-xl text-slate-400 max-w-xl mx-auto leading-relaxed">
                Unlock the ultimate mystical roadmap. High-fidelity palmistry analysis powered by celestial algorithms for the chosen ones.
              </p>
           </div>
        </section>

        {/* Pricing Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
           {/* Free Plan */}
           <div className="glass-card p-10 rounded-[40px] flex flex-col justify-between space-y-10 opacity-60 border-white/5">
              <div className="space-y-6">
                 <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-slate-500">Standard</span>
                 <h3 className="text-5xl font-serif">Free</h3>
                 <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.4em]">Basic pathfinding</p>
                 <ul className="space-y-5">
                    <li className="flex items-center gap-4 text-sm text-slate-400">
                       <CheckCircle className="w-5 h-5 text-slate-600" /> 1 Scan per day
                    </li>
                    <li className="flex items-center gap-4 text-sm text-slate-400">
                       <CheckCircle className="w-5 h-5 text-slate-600" /> Summary results (Text only)
                    </li>
                 </ul>
              </div>
              <button disabled className="w-full py-5 border border-white/10 rounded-full text-[10px] uppercase tracking-[0.2em] font-bold text-slate-500 bg-white/5">
                Current Plan
              </button>
           </div>

           {/* Pro Plan */}
           <div className="glass-card p-10 rounded-[40px] relative border-cosmic-gold/40 border-2 shadow-[0_0_60px_rgba(255,215,0,0.15)] flex flex-col justify-between space-y-10 group overflow-hidden bg-void-black/80">
              <div className="absolute -top-3 right-8 bg-cosmic-gold text-void-black px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-2xl z-20">Most Mystical</div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-cosmic-gold/10 blur-3xl pointer-events-none"></div>
              
              <div className="space-y-6 relative z-10">
                 <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-cosmic-gold">Destiny Unlocked</span>
                 <div className="flex items-baseline gap-2">
                   <h3 className="text-5xl font-serif gold-gradient bg-clip-text text-transparent">$14.99</h3>
                   <span className="text-lg text-slate-500 font-sans">/mo</span>
                 </div>
                 <p className="text-[10px] text-cosmic-gold font-bold uppercase tracking-[0.4em]">The complete cosmic vision</p>
                 <ul className="space-y-5">
                    <li className="flex items-center gap-4 text-sm text-white">
                       <Sparkles className="w-6 h-6 text-cosmic-gold" /> Unlimited Scans
                    </li>
                    <li className="flex items-center gap-4 text-sm text-white">
                       <FileText className="w-6 h-6 text-cosmic-gold" /> 50+ Page Personal Reports
                    </li>
                    <li className="flex items-center gap-4 text-sm text-white">
                       <Zap className="w-6 h-6 text-cosmic-gold" /> HD Results & High-Detail Analysis
                    </li>
                    <li className="flex items-center gap-4 text-sm text-white">
                       <Award className="w-6 h-6 text-cosmic-gold" /> Daily Astro-Predictions
                    </li>
                 </ul>
              </div>
              <button 
                onClick={handleUpgrade} 
                disabled={user?.isPremium}
                className="w-full py-6 gold-gradient rounded-full text-void-black font-bold text-xs uppercase tracking-[0.2em] gold-glow transition-all hover:scale-[1.02] active:scale-95 disabled:grayscale shadow-2xl"
              >
                {user?.isPremium ? 'Already Pro' : 'Unlock My Destiny'}
              </button>
           </div>
        </div>

        {/* Why Pro? Bento Grid */}
        <section className="space-y-8">
           <h3 className="font-serif text-3xl text-center">Why HathRekha Pro?</h3>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 glass-card p-10 rounded-3xl flex items-center gap-8 border-mystic-purple/10">
                 <div className="hidden sm:flex w-24 h-24 rounded-full glass-purple flex items-center justify-center text-mystic-purple flex-shrink-0">
                   <Sparkles className="w-10 h-10" />
                 </div>
                 <div className="space-y-2">
                    <h4 className="text-xl font-bold font-serif">Deep Neural Analysis</h4>
                    <p className="text-sm text-on-surface-variant leading-relaxed">Our Pro engine uses proprietary computer vision to analyze micro-creases invisible to the naked eye.</p>
                 </div>
              </div>
              <div className="glass-card p-10 rounded-3xl flex flex-col justify-center items-center text-center space-y-4 border-mystic-purple/10">
                 <Zap className="w-10 h-10 text-cosmic-gold mb-2" />
                 <h4 className="text-xl font-bold font-serif">Instant Insight</h4>
                 <p className="text-sm text-on-surface-variant leading-relaxed">0.4s Processing time.</p>
              </div>
           </div>
        </section>

        {/* Security Footer */}
        <section className="text-center pt-12 space-y-8 opacity-60">
           <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-500">Secured by Cosmic Encryption</p>
           <div className="flex justify-center gap-12 text-slate-500">
              <Shield className="w-6 h-6 transition-colors hover:text-cosmic-gold" />
              <CheckCircle className="w-6 h-6 transition-colors hover:text-cosmic-gold" />
              <HelpCircle className="w-6 h-6 transition-colors hover:text-cosmic-gold" />
           </div>
        </section>
      </main>

      {/* Floating Status */}
      <div className="fixed bottom-12 left-1/2 -translate-x-1/2 w-max px-8 py-4 bg-void-black shadow-2xl rounded-full border border-white/10 flex items-center gap-4 group">
         <motion.div animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 2, repeat: Infinity }} className="w-2 h-2 rounded-full bg-cosmic-gold" />
         <span className="text-xs font-bold text-on-surface-variant">3,402 people unlocked their fate today</span>
      </div>
    </div>
  );
}
