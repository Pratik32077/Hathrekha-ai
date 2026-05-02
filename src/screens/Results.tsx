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
      <div className="h-screen bg-void-black flex flex-col items-center justify-center p-6 text-center space-y-8">
        <div className="relative">
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute inset-0 bg-mystic-purple rounded-full blur-3xl"
          />
          <Sparkles className="w-16 h-16 text-cosmic-gold relative z-10 animate-pulse" />
        </div>
        <div className="space-y-4 relative z-10">
          <h2 className="font-serif text-3xl gold-gradient bg-clip-text text-transparent">Report is Manifesting</h2>
          <p className="text-slate-400 text-sm max-w-xs mx-auto italic">"Patience is the companion of wisdom. The stars are weaving your destiny as we speak..."</p>
        </div>
        <button 
          onClick={() => navigate('/dashboard')}
          className="px-8 py-3 glass-card rounded-full text-xs font-bold uppercase tracking-widest text-cosmic-gold"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  const handleShare = async () => {
    if (!currentReport) return;

    const shareText = `🔮 My HathRekha AI Destiny Report:
✨ Destiny Score: ${currentReport.scores.destiny}/100
❤️ Love: ${currentReport.scores.love} | 💰 Wealth: ${currentReport.scores.wealth}
🌟 Aura: ${currentReport.luckyTraits.auraColor}
🌍 Ruling Planet: ${currentReport.luckyTraits.rulingPlanet}

"${currentReport.insights.personality.substring(0, 100)}..."

Discover your own destiny at HathRekha AI!`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My HathRekha AI Reading',
          text: shareText,
          url: window.location.origin
        });
      } catch (err) {
        console.log("Share cancelled or failed");
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareText);
        alert("Destiny summary copied to clipboard! Paste it on WhatsApp or Instagram.");
      } catch (err) {
        alert("Unable to share at this time.");
      }
    }
  };

  return (
    <div className="min-h-screen pb-48">
      <header className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-4 bg-void-black/40 backdrop-blur-xl border-b border-white/10">
        <div className="flex items-center gap-3">
          <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAE6UppOrLWwZYYAKQmCQV2dBBb-WFenuHwXc4XCZjPlHC65CVFNxw5z7lu93SVqiqlwIZhxVxECwpVGWCVhFNuMykaY5ws8PxeqvAg6EnoRMmlhe5AJlHxc0if4PuJ76rxtYoBCYWMBUsBslBNNSVP_OeMR4by2DpenOE87zZOYYNt83J3K0ejc8xaY4LIV-iqywNyAUB9yLrZ6iGMC-o4jaMVXYJkaaWOOHsbPG8upZAPSo0jtTUFVnqR4LM8uwL0Zd0u-VDP3hLl" className="w-8 h-8 rounded-full shadow-[0_0_10px_#9d50bb]" alt="" />
          <h1 className="font-serif font-bold text-lg gold-gradient bg-clip-text text-transparent">HathRekha AI</h1>
        </div>
        <MapPin className="w-5 h-5 text-mystic-purple" />
      </header>

      <main className="pt-24 px-6 space-y-12 max-w-4xl mx-auto">
        {/* Destiny Score Hero */}
        <section className="flex flex-col items-center justify-center text-center space-y-8 py-12">
           <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90">
                 <circle cx="50%" cy="50%" r="45%" className="stroke-white/10 fill-none" strokeWidth="8" />
                 <motion.circle 
                    cx="50%" cy="50%" r="45%" 
                    className="stroke-cosmic-gold fill-none" 
                    strokeWidth="8" 
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: currentReport.scores.destiny / 100 }}
                    transition={{ duration: 2, ease: "easeOut" }}
                 />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                 <motion.span 
                   initial={{ opacity: 0, scale: 0.5 }}
                   animate={{ opacity: 1, scale: 1 }}
                   className="font-serif text-6xl md:text-8xl text-cosmic-gold"
                 >
                   {currentReport.scores.destiny}
                 </motion.span>
                 <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-on-surface-variant">Destiny Score</span>
              </div>
              <div className="absolute inset-0 gold-glow rounded-full opacity-20"></div>
           </div>
           <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="font-sans text-lg md:text-2xl text-on-surface leading-relaxed italic max-w-2xl"
           >
             "{currentReport.insights.personality}"
           </motion.p>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-12">
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
                       <stat.icon className="w-5 h-5 flex-shrink-0" />
                    </div>
                    <span className="text-[8px] uppercase font-bold tracking-[0.15em] text-on-surface-variant">{stat.label}</span>
                    <span className={`text-xl font-bold font-serif ${stat.color}`}>{stat.score}%</span>
                 </motion.div>
               ))}
            </section>

            {/* Dynamic Insights */}
            <section className="space-y-6">
               {[
                 { label: "Wealth Forecast", text: currentReport.insights.wealthForecast, color: "border-cosmic-gold/10", icon: Zap, iconColor: "text-cosmic-gold" },
                 { label: "Love Destiny", text: currentReport.insights.loveDestiny, color: "border-pink-500/10", icon: Heart, iconColor: "text-pink-500" },
                 { label: "Career Path", text: currentReport.insights.careerPath, color: "border-mystic-purple/10", icon: Briefcase, iconColor: "text-mystic-purple" }
               ].map((insight, i) => (
                 <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`glass-card p-8 rounded-3xl space-y-4 ${insight.color}`}
                 >
                    <h3 className={`font-serif text-2xl ${insight.iconColor} flex items-center gap-3`}>
                       <insight.icon className="w-6 h-6 flex-shrink-0" /> {insight.label}
                    </h3>
                    <p className="text-on-surface-variant text-sm leading-relaxed">{insight.text}</p>
                 </motion.div>
               ))}
            </section>
          </div>

          <div className="space-y-12">
            {/* Timeline Predictions */}
            <section className="space-y-6">
               <h3 className="font-serif text-2xl">Timeline Predictions</h3>
               <div className="space-y-8 relative">
                  <div className="absolute left-1.5 top-2 bottom-2 w-px bg-white/10" />
                  {[
                    { period: "Short Term", text: currentReport.timelinePredictions.shortTerm },
                    { period: "Medium Term", text: currentReport.timelinePredictions.mediumTerm },
                    { period: "Long Term", text: currentReport.timelinePredictions.longTerm }
                  ].map((item, i) => (
                    <motion.div 
                      key={i} 
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      className="relative pl-10"
                    >
                       <div className="absolute left-0 top-2 w-3 h-3 rounded-full bg-mystic-purple shadow-[0_0_15px_#9d50bb]"></div>
                       <p className="text-[10px] uppercase tracking-widest font-bold text-mystic-purple mb-2">{item.period}</p>
                       <p className="text-on-surface-variant text-sm leading-relaxed">{item.text}</p>
                    </motion.div>
                  ))}
               </div>
            </section>

            {/* Lucky Traits */}
            <section className="space-y-6">
               <h3 className="font-serif text-2xl">Lucky Traits</h3>
               <div className="grid grid-cols-2 gap-4">
                  <motion.div 
                    whileInView={{ scale: [0.95, 1], opacity: [0, 1] }}
                    className="glass-card p-6 rounded-3xl space-y-2"
                  >
                     <Star className="w-5 h-5 text-cosmic-gold" />
                     <p className="text-[10px] uppercase font-bold text-on-surface-variant">Aura Color</p>
                     <p className="text-xl font-bold text-cosmic-gold">{currentReport.luckyTraits.auraColor}</p>
                  </motion.div>
                  <motion.div 
                    whileInView={{ scale: [0.95, 1], opacity: [0, 1] }}
                    className="glass-card p-6 rounded-3xl space-y-2"
                  >
                     <Zap className="w-5 h-5 text-mystic-purple" />
                     <p className="text-[10px] uppercase font-bold text-on-surface-variant">Lucky Gem</p>
                     <p className="text-xl font-bold text-mystic-purple">{currentReport.luckyTraits.luckyGem}</p>
                  </motion.div>
                  <motion.div 
                    whileInView={{ y: [10, 0], opacity: [0, 1] }}
                    className="col-span-2 glass-card p-6 rounded-3xl flex justify-between items-center"
                  >
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
                  </motion.div>
               </div>
            </section>

            {/* Warnings & Remedies */}
            <section className="space-y-6">
               <h3 className="font-serif text-2xl">Warnings & Remedies</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
                  <div className="space-y-4">
                    {currentReport.insights.growthWarnings.map((w, i) => (
                      <motion.div 
                        key={i} 
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="bg-red-500/10 border border-red-500/20 p-4 rounded-2xl flex gap-3 italic text-xs text-red-200"
                      >
                         <span className="text-red-500 font-bold flex-shrink-0">!</span> {w}
                      </motion.div>
                    ))}
                  </div>
                  <div className="space-y-4">
                    {currentReport.insights.remedies.map((r, i) => (
                      <motion.div 
                        key={i} 
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="bg-cosmic-gold/10 border border-cosmic-gold/20 p-4 rounded-2xl flex gap-3 text-xs text-cosmic-gold"
                      >
                         <Sparkles className="w-4 h-4 flex-shrink-0" /> {r}
                      </motion.div>
                    ))}
                  </div>
               </div>
            </section>
          </div>
        </div>

        {/* Action Buttons */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 py-8">
           <button 
            onClick={handleShare}
            className="w-full p-6 glass-card rounded-3xl flex items-center justify-between group active:scale-95 transition-all"
           >
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
