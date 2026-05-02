import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Share2, FileText, ChevronRight, MapPin, Sparkles, Heart, Briefcase, Zap, Star } from 'lucide-react';
import BottomNav from '../components/BottomNav';
import { useApp } from '../context/AppContext';

export default function Results() {
  const navigate = useNavigate();
  const { currentReport } = useApp();

  if (!currentReport) {
    return (
      <div className="h-screen flex items-center justify-center text-on-surface-variant italic">
        Report is manifesting...
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-48">
      <header className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-4 bg-void-black/40 backdrop-blur-xl border-b border-white/10">
        <div className="flex items-center gap-3">
          <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAE6UppOrLWwZYYAKQmCQV2dBBb-WFenuHwXc4XCZjPlHC65CVFNxw5z7lu93SVqiqlwIZhxVxECwpVGWCVhFNuMykaY5ws8PxeqvAg6EnoRMmlhe5AJlHxc0if4PuJ76rxtYoBCYWMBUsBslBNNSVP_OeMR4by2DpenOE87zZOYYNt83J3K0ejc8xaY4LIV-iqywNyAUB9yLrZ6iGMC-o4jaMVXYJkaaWOOHsbPG8upZAPSo0jtTUFVnqR4LM8uwL0Zd0u-VDP3hLl" className="w-8 h-8 rounded-full shadow-[0_0_10px_#9d50bb]" alt="" />
          <h1 className="font-serif font-bold text-lg gold-gradient bg-clip-text text-transparent">HathRekha AI</h1>
        </div>
        <MapPin className="w-5 h-5 text-mystic-purple" />
      </header>

      <main className="pt-24 px-6 space-y-12 max-w-lg mx-auto">
        {/* Destiny Score Hero */}
        <section className="flex flex-col items-center justify-center text-center space-y-8 py-12">
           <div className="relative w-64 h-64 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90">
                 <circle cx="128" cy="128" r="120" className="stroke-white/10 fill-none" strokeWidth="8" />
                 <motion.circle 
                    cx="128" cy="128" r="120" 
                    className="stroke-cosmic-gold fill-none" 
                    strokeWidth="8" 
                    strokeLinecap="round"
                    initial={{ strokeDasharray: "0 754" }}
                    animate={{ strokeDasharray: `${(currentReport.scores.destiny / 100) * 754} 754` }}
                    transition={{ duration: 2, ease: "easeOut" }}
                 />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                 <motion.span 
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="font-serif text-6xl text-cosmic-gold"
                >
                  {currentReport.scores.destiny}
                </motion.span>
                 <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-on-surface-variant">Destiny Score</span>
              </div>
              <div className="absolute inset-0 gold-glow rounded-full opacity-20"></div>
           </div>
           <p className="font-sans text-lg text-on-surface leading-relaxed italic">"{currentReport.insights.personality}"</p>
        </section>

        {/* Triple Stats */}
        <section className="grid grid-cols-3 gap-4">
           {[
             { label: "Wealth", score: currentReport.scores.wealth, color: "text-cosmic-gold", icon: Zap },
             { label: "Love", score: currentReport.scores.love, color: "text-pink-500", icon: Heart },
             { label: "Career", score: currentReport.scores.career, color: "text-mystic-purple", icon: Briefcase }
           ].map((stat, i) => (
             <motion.div 
              key={i}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1 + (i * 0.2) }}
              className="glass-card p-4 rounded-2xl flex flex-col items-center space-y-2 text-center"
             >
                <div className={`w-10 h-10 rounded-full border border-current flex items-center justify-center ${stat.color} opacity-40`}>
                   <stat.icon className="w-5 h-5" />
                </div>
                <span className="text-[8px] uppercase font-bold tracking-[0.15em] text-on-surface-variant">{stat.label}</span>
                <span className={`text-xl font-bold font-serif ${stat.color}`}>{stat.score}%</span>
             </motion.div>
           ))}
        </section>

        {/* Dynamic Insights */}
        <section className="space-y-6">
           <div className="glass-card p-8 rounded-3xl space-y-4 border-cosmic-gold/10">
              <h3 className="font-serif text-2xl text-cosmic-gold flex items-center gap-3">
                 <Zap className="w-6 h-6" /> Wealth Forecast
              </h3>
              <p className="text-on-surface-variant text-sm leading-relaxed">{currentReport.insights.wealthForecast}</p>
           </div>
           
           <div className="glass-card p-8 rounded-3xl space-y-4 border-pink-500/10">
              <h3 className="font-serif text-2xl text-pink-500 flex items-center gap-3">
                 <Heart className="w-6 h-6" /> Love Destiny
              </h3>
              <p className="text-on-surface-variant text-sm leading-relaxed">{currentReport.insights.loveDestiny}</p>
           </div>

           <div className="glass-card p-8 rounded-3xl space-y-4 border-mystic-purple/10">
              <h3 className="font-serif text-2xl text-mystic-purple flex items-center gap-3">
                 <Briefcase className="w-6 h-6" /> Career Path
              </h3>
              <p className="text-on-surface-variant text-sm leading-relaxed">{currentReport.insights.careerPath}</p>
           </div>
        </section>

        {/* Timeline Predictions */}
        <section className="space-y-6">
           <h3 className="font-serif text-2xl">Timeline Predictions</h3>
           <div className="space-y-6">
              {[
                { period: "Short Term", text: currentReport.timelinePredictions.shortTerm },
                { period: "Medium Term", text: currentReport.timelinePredictions.mediumTerm },
                { period: "Long Term", text: currentReport.timelinePredictions.longTerm }
              ].map((item, i) => (
                <div key={i} className="relative pl-8 border-l border-mystic-purple/30">
                   <div className="absolute -left-1.5 top-2 w-3 h-3 rounded-full bg-mystic-purple purple-glow"></div>
                   <p className="text-[10px] uppercase tracking-widest font-bold text-mystic-purple mb-2">{item.period}</p>
                   <p className="text-on-surface-variant text-sm leading-relaxed">{item.text}</p>
                </div>
              ))}
           </div>
        </section>

        {/* Lucky Traits */}
        <section className="space-y-6">
           <h3 className="font-serif text-2xl">Lucky Traits</h3>
           <div className="grid grid-cols-2 gap-4">
              <div className="glass-card p-6 rounded-3xl space-y-2">
                 <Star className="w-5 h-5 text-cosmic-gold" />
                 <p className="text-[10px] uppercase font-bold text-on-surface-variant">Aura Color</p>
                 <p className="text-xl font-bold text-cosmic-gold">{currentReport.luckyTraits.auraColor}</p>
              </div>
              <div className="glass-card p-6 rounded-3xl space-y-2">
                 <Zap className="w-5 h-5 text-mystic-purple" />
                 <p className="text-[10px] uppercase font-bold text-on-surface-variant">Lucky Gem</p>
                 <p className="text-xl font-bold text-mystic-purple">{currentReport.luckyTraits.luckyGem}</p>
              </div>
              <div className="col-span-2 glass-card p-6 rounded-3xl flex justify-between items-center">
                 <div>
                    <p className="text-[10px] uppercase font-bold text-on-surface-variant mb-2">Power Numbers</p>
                    <div className="flex gap-2">
                       {currentReport.luckyTraits.powerNumbers.map(n => (
                         <span key={n} className="w-8 h-8 rounded-full glass-card flex items-center justify-center font-bold text-xs">{n}</span>
                       ))}
                    </div>
                 </div>
                 <div className="text-right">
                    <p className="text-[10px] uppercase font-bold text-on-surface-variant mb-2">Ruling Planet</p>
                    <p className="text-xl font-bold text-mystic-purple">{currentReport.luckyTraits.rulingPlanet}</p>
                 </div>
              </div>
           </div>
        </section>

        {/* Warnings & Remedies */}
        <section className="space-y-6">
           <h3 className="font-serif text-2xl">Warnings & Remedies</h3>
           <div className="space-y-4">
              {currentReport.insights.growthWarnings.map((w, i) => (
                <div key={i} className="bg-red-500/10 border border-red-500/20 p-4 rounded-2xl flex gap-3 italic text-xs text-red-200">
                   <span className="text-red-500 font-bold">!</span> {w}
                </div>
              ))}
              {currentReport.insights.remedies.map((r, i) => (
                <div key={i} className="bg-cosmic-gold/10 border border-cosmic-gold/20 p-4 rounded-2xl flex gap-3 text-xs text-cosmic-gold">
                   <Sparkles className="w-4 h-4" /> {r}
                </div>
              ))}
           </div>
        </section>

        {/* Action Buttons */}
        <section className="space-y-4 py-8">
           <button className="w-full p-6 glass-card rounded-3xl flex items-center justify-between group active:scale-95 transition-all">
              <div className="flex items-center gap-4">
                 <div className="w-14 h-14 rounded-2xl gold-gradient flex items-center justify-center text-void-black">
                    <Share2 className="w-6 h-6" />
                 </div>
                 <div className="text-left">
                    <h4 className="font-bold">Share My Destiny</h4>
                    <p className="text-[10px] text-on-surface-variant">Download your cosmic blueprint</p>
                 </div>
              </div>
              <ChevronRight className="w-6 h-6 text-slate-500 group-hover:translate-x-1 transition-transform" />
           </button>

           <button className="w-full py-6 gold-gradient rounded-full text-void-black font-bold text-sm gold-glow flex items-center justify-center gap-2 transition-transform active:scale-95">
              Unlock Full Life Report (50+ Pages)
              <FileText className="w-5 h-5" />
           </button>
        </section>
      </main>

      <BottomNav />
    </div>
  );
}
