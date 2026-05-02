import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Sparkles, MapPin, ChevronRight, Briefcase, Heart, Zap, Award } from 'lucide-react';
import BottomNav from '../components/BottomNav';
import { useApp } from '../context/AppContext';

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useApp();

  if (!user) return null;

  return (
    <div className="min-h-screen pb-32">
      {/* Top Bar */}
      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 py-4 bg-void-black/40 backdrop-blur-xl border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full border border-mystic-purple/30 overflow-hidden p-1 bg-void-black">
            <img src={user.photoURL || 'https://lh3.googleusercontent.com/aida-public/AB6AXuAE6UppOrLWwZYYAKQmCQV2dBBb-WFenuHwXc4XCZjPlHC65CVFNxw5z7lu93SVqiqlwIZhxVxECwpVGWCVhFNuMykaY5ws8PxeqvAg6EnoRMmlhe5AJlHxc0if4PuJ76rxtYoBCYWMBUsBslBNNSVP_OeMR4by2DpenOE87zZOYYNt83J3K0ejc8xaY4LIV-iqywNyAUB9yLrZ6iGMC-o4jaMVXYJkaaWOOHsbPG8upZAPSo0jtTUFVnqR4LM8uwL0Zd0u-VDP3hLl'} alt="" className="w-full h-full rounded-full object-cover" />
          </div>
          <h1 className="font-serif font-bold text-lg gold-gradient bg-clip-text text-transparent">HathRekha AI</h1>
        </div>
        <div className="flex items-center gap-2 text-mystic-purple">
          <MapPin className="w-4 h-4" />
          <span className="text-[10px] uppercase tracking-widest font-bold">New Delhi</span>
        </div>
      </header>

      <main className="pt-24 px-6 space-y-8 max-w-lg mx-auto">
        {/* Welcome Section */}
        <section className="space-y-1">
           <h2 className="text-on-surface-variant font-sans text-sm uppercase tracking-[0.2em]">Seeker of Destiny</h2>
           <p className="font-serif text-3xl font-bold">Welcome, {user.displayName.split(' ')[0]}</p>
        </section>

        {/* Hero CTA */}
        <motion.section 
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate('/scan')}
          className="relative aspect-[4/5] rounded-3xl overflow-hidden glass-card p-8 flex flex-col items-center justify-center text-center space-y-6 cursor-pointer group border-mystic-purple/20"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-mystic-purple/20 to-transparent opacity-60"></div>
          <div className="relative z-10 space-y-6">
            <div className="w-48 h-48 mx-auto relative flex items-center justify-center">
              <motion.div 
                animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute inset-0 bg-mystic-purple/30 rounded-full blur-3xl shadow-[0_0_60px_#9d50bb]"
              ></motion.div>
              <Sparkles className="w-32 h-32 text-mystic-purple relative z-20" />
            </div>
            
            <div className="space-y-4">
              <h3 className="font-serif text-3xl">Your Destiny is in Your Hands</h3>
              <p className="text-on-surface-variant text-sm max-w-[240px] mx-auto">AI-powered palmistry reveals the secrets of your future with 99% precision.</p>
              <button className="bg-gradient-to-r from-cosmic-gold via-[#e9c400] to-[#b8860b] px-10 py-5 rounded-full text-void-black font-bold text-sm gold-glow flex items-center gap-2 mx-auto transition-all group-hover:scale-105">
                <Sparkles className="w-4 h-4" />
                SCAN PALM NOW
              </button>
            </div>
          </div>
        </motion.section>

        {/* Bento Grid Insights Teasers */}
        <div className="grid grid-cols-2 gap-4">
           <div className="glass-card p-6 rounded-3xl space-y-4 flex flex-col justify-between min-h-[160px]">
              <div className="w-10 h-10 rounded-full bg-mystic-purple/10 flex items-center justify-center text-mystic-purple">
                 <Briefcase className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm">Career Destiny</h4>
                <p className="text-[10px] text-on-surface-variant leading-tight">Professional growth & success paths.</p>
              </div>
           </div>
           
           <div className="glass-card p-6 rounded-3xl space-y-4 flex flex-col justify-between min-h-[160px]">
              <div className="w-10 h-10 rounded-full bg-pink-500/10 flex items-center justify-center text-pink-500">
                 <Heart className="w-5 h-5 fill-pink-500" />
              </div>
              <div>
                <h4 className="font-bold text-sm">Love Insights</h4>
                <p className="text-[10px] text-on-surface-variant leading-tight">Soulmate timing & harmony.</p>
              </div>
           </div>

           <div className="col-span-2 glass-card p-6 rounded-3xl flex items-center gap-6 group cursor-pointer hover:border-cosmic-gold/30 transition-all">
              <div className="w-16 h-16 rounded-full bg-cosmic-gold/10 flex items-center justify-center flex-shrink-0 text-cosmic-gold">
                <Zap className="w-8 h-8" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold">Wealth Potential</h4>
                <p className="text-xs text-on-surface-variant leading-relaxed">Fortune outlook for the next 5 years.</p>
              </div>
              <ChevronRight className="w-6 h-6 text-on-surface-variant group-hover:translate-x-1 transition-transform" />
           </div>
        </div>

        {/* Premium Banner */}
        <div className="relative overflow-hidden rounded-3xl glass-purple p-8 group cursor-pointer">
           <div className="absolute top-0 right-0 p-4 opacity-10">
              <Sparkles className="w-32 h-32" />
           </div>
           <div className="relative z-10 space-y-4">
              <span className="inline-block px-3 py-1 bg-white/10 rounded-full text-[8px] font-bold uppercase tracking-widest">Premium Service</span>
              <h3 className="font-serif text-3xl">Full Life Report</h3>
              <p className="text-on-primary-container text-sm max-w-[80%]">A 50-page deep dive into your astrological and palmistry synthesis.</p>
              <button className="font-bold text-sm underline underline-offset-8 decoration-mystic-purple">Explore Analysis</button>
           </div>
        </div>

        {/* Daily Destiny Card */}
        <section className="space-y-4">
          <h3 className="font-serif text-2xl px-2">Daily Destiny Card</h3>
          <div className="glass-card rounded-3xl p-2">
            <div className="aspect-[3/4] w-full rounded-2xl bg-void-black relative overflow-hidden group">
               <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuB7utiyNs2T8VdpprWNLMoaoOeaBLK22BhR390JV1bBuTIn3t09JHgibA8Tp2fpAbtiQpvtaKhKvi7w-fuJRBoHFHnIsv9G8pVH1aNodLaAD6wLml2c_tqCY3hA_Fio46x0bKYZSzS5bFCVouhgHyt73fAahUiVj5Xmg-aKDrc-YqyFIoSUF5cG2ofKbqMRlvs_J2BNs5JE_MfdOSa6ElE_cY7jpqMNBwrts3DIi3ZKl7GgkJT0kHKmNRwc-KKMPcj_InN8tHLoDBje" alt="Card" className="w-full h-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-110" />
               <div className="absolute inset-0 bg-gradient-to-t from-void-black via-transparent to-transparent z-10"></div>
               <div className="absolute bottom-0 left-0 w-full p-8 z-20 space-y-2">
                  <p className="text-cosmic-gold text-[10px] font-bold uppercase tracking-[0.2em]">Card of the Day</p>
                  <h4 className="text-2xl font-serif">The Stellar Navigator</h4>
                  <p className="text-on-surface-variant text-xs italic line-clamp-2">Today, your path is illuminated by the alignment of Mars and Venus. Precision leads to harmony.</p>
               </div>
            </div>
          </div>
        </section>

        {/* Upgrade Pro Footer */}
        <div className="glass-card p-6 rounded-3xl flex items-center justify-between border-cosmic-gold/20 gold-glow">
           <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-cosmic-gold/20 flex items-center justify-center text-cosmic-gold">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-sm">HathRekha Pro</h4>
                <p className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">Unlimited Scans • HD Reports</p>
              </div>
           </div>
           <button onClick={() => navigate('/premium')} className="bg-cosmic-gold text-void-black px-6 py-2 rounded-full font-bold text-xs">JOIN</button>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
