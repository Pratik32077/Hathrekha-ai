import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Award, LogOut, Settings, Shield, Globe, FileText, ChevronRight, MapPin } from 'lucide-react';
import BottomNav from '../components/BottomNav';
import { useApp } from '../context/AppContext';

import { auth } from '../lib/firebase';

export default function Profile() {
  const navigate = useNavigate();
  const { user, reports, setCurrentReport } = useApp();

  if (!user) return null;

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      navigate('/auth');
    } catch (error) {
      console.error("Sign out error", error);
    }
  };

  const handleViewReport = (report: any) => {
    setCurrentReport(report);
    navigate('/results');
  };

  return (
    <div className="min-h-screen pb-48">
      {/* Top Bar */}
      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 py-4 bg-void-black/40 backdrop-blur-xl border-b border-white/10">
        <div className="flex items-center gap-3">
          <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAE6UppOrLWwZYYAKQmCQV2dBBb-WFenuHwXc4XCZjPlHC65CVFNxw5z7lu93SVqiqlwIZhxVxECwpVGWCVhFNuMykaY5ws8PxeqvAg6EnoRMmlhe5AJlHxc0if4PuJ76rxtYoBCYWMBUsBslBNNSVP_OeMR4by2DpenOE87zZOYYNt83J3K0ejc8xaY4LIV-iqywNyAUB9yLrZ6iGMC-o4jaMVXYJkaaWOOHsbPG8upZAPSo0jtTUFVnqR4LM8uwL0Zd0u-VDP3hLl" className="w-8 h-8 rounded-full" alt="" />
          <h1 className="font-serif font-bold text-lg gold-gradient bg-clip-text text-transparent">HathRekha AI</h1>
        </div>
        <MapPin className="w-5 h-5 text-mystic-purple" />
      </header>

      <main className="pt-24 px-6 space-y-12 max-w-lg mx-auto">
        {/* User Profile Info */}
        <section className="flex flex-col items-center text-center space-y-4">
           <div className="relative">
              <div className="w-32 h-32 rounded-full border-2 border-mystic-purple p-1 shadow-[0_0_30px_#9d50bb44]">
                 <img src={user.photoURL || 'https://lh3.googleusercontent.com/aida-public/AB6AXuDdOowMuSd2yKN3lTbLtf7cghWRknyJGJ-lXuYOqIkFAi6g_ifoUF473np1rEG-3b4UtVtv9LmZeCsw-Jd0RPC7MKT3maA7pmtMQ-cocItG9QDGTWXJ3HJX9mcd12Vm9JQDic-ipTWOHYT0_xuPc3RvaMXRG0A6jkTFUDaIAvP07s_BhyAsgYPLIgSSAVTaaFW-tVaW2w2fZBVNzLdfDD2s9c2WLIhiimzuM8pHf-yp_9w3gyHRl7xYW4eVr1IAFzUqXlTElPbTQOa7'} alt="" className="w-full h-full rounded-full object-cover" />
              </div>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 gold-gradient text-void-black px-4 py-1 rounded-full text-[8px] font-bold uppercase tracking-widest shadow-xl">
                 {user.isPremium ? 'HathRekha Pro' : 'Free Seeker'}
              </div>
           </div>
           <div>
              <h2 className="font-serif text-3xl text-mystic-purple">{user.displayName}</h2>
              <p className="text-sm text-on-surface-variant font-sans tracking-wide uppercase">Seeker of Digital Truth</p>
           </div>
        </section>

        {/* Subscription Info */}
        {user.isPremium && (
           <motion.section 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="glass-card p-6 rounded-3xl relative overflow-hidden group border-cosmic-gold/20"
           >
              <div className="absolute top-0 right-0 w-32 h-32 bg-cosmic-gold/5 blur-3xl"></div>
              <div className="flex justify-between items-center relative z-10">
                 <div className="space-y-1">
                    <h3 className="font-bold text-cosmic-gold flex items-center gap-2 capitalize">
                       <Award className="w-4 h-4" /> Pro Subscription
                    </h3>
                    <p className="text-[10px] text-on-surface-variant uppercase tracking-widest">Valid until Oct 2026</p>
                 </div>
                 <button className="gold-gradient text-void-black text-xs font-bold px-6 py-2 rounded-full gold-glow">Manage</button>
              </div>
           </motion.section>
        )}

        {/* Recent Reports */}
        <section className="space-y-6">
           <div className="flex justify-between items-center">
              <h3 className="font-serif text-2xl">My Destiny Reports</h3>
           </div>
           <div className="space-y-4">
              {reports.length > 0 ? reports.map((report, i) => (
                <div 
                  key={i} 
                  onClick={() => handleViewReport(report)}
                  className="glass-card p-6 rounded-3xl flex items-center gap-6 group hover:bg-white/10 transition-all cursor-pointer"
                >
                   <div className="w-12 h-12 rounded-2xl glass-purple flex items-center justify-center text-mystic-purple">
                      <FileText className="w-5 h-5" />
                   </div>
                   <div className="flex-1">
                      <h4 className="font-bold text-sm">Life Map #{report.id}</h4>
                      <p className="text-[10px] text-on-surface-variant">Generated: {report.date}</p>
                   </div>
                   <ChevronRight className="w-5 h-5 text-slate-500 group-hover:translate-x-1 transition-transform" />
                </div>
              )) : (
                <div className="p-8 text-center glass-card rounded-3xl text-sm text-on-surface-variant italic">
                  No reports in your timeline yet.
                </div>
              )}
           </div>
        </section>

        {/* Preferences */}
        <section className="space-y-6">
           <h3 className="font-serif text-2xl">Preferences</h3>
           <div className="glass-card rounded-3xl overflow-hidden divide-y divide-white/5">
              <div className="p-6 flex justify-between items-center">
                 <div className="flex items-center gap-4">
                    <Globe className="w-5 h-5 text-mystic-purple" />
                    <div>
                       <p className="text-sm font-bold">Language Settings</p>
                       <p className="text-[10px] text-on-surface-variant uppercase tracking-widest">Choose destiny's voice</p>
                    </div>
                 </div>
                 <div className="bg-void-black/50 p-1 rounded-full flex gap-1">
                    <button className="px-5 py-1 text-[10px] font-bold bg-mystic-purple rounded-full">EN</button>
                    <button className="px-5 py-1 text-[10px] font-bold text-on-surface-variant">HI</button>
                 </div>
              </div>
              <div className="p-6 flex justify-between items-center group cursor-pointer hover:bg-white/5 transition-all">
                 <div className="flex items-center gap-4">
                    <Settings className="w-5 h-5 text-mystic-purple" />
                    <p className="text-sm font-bold">App Settings</p>
                 </div>
                 <ChevronRight className="w-5 h-5 text-slate-500 group-hover:translate-x-1 transition-transform" />
              </div>
              <div className="p-6 flex justify-between items-center group cursor-pointer hover:bg-white/5 transition-all">
                 <div className="flex items-center gap-4">
                    <Shield className="w-5 h-5 text-mystic-purple" />
                    <p className="text-sm font-bold">Privacy & Security</p>
                 </div>
                 <ChevronRight className="w-5 h-5 text-slate-500 group-hover:translate-x-1 transition-transform" />
              </div>
           </div>
        </section>

        {/* Logout */}
        <button 
           onClick={handleSignOut}
           className="w-full py-5 glass-card rounded-3xl text-sm font-bold text-red-500 flex items-center justify-center gap-3 hover:bg-red-500/10 transition-all active:scale-95 border-red-500/20"
        >
           <LogOut className="w-5 h-5" />
           Sign Out
        </button>
      </main>

      <BottomNav />
    </div>
  );
}
