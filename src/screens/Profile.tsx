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

      <main className="pt-24 px-6 space-y-12 max-w-4xl mx-auto">
        {/* User Profile Info */}
        <section className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-8 md:gap-12">
           <div className="relative shrink-0">
              <div className="w-40 h-40 md:w-56 md:h-56 rounded-[40px] md:rounded-[60px] border-2 border-mystic-purple/30 p-2 shadow-[0_0_50px_#9d50bb33] rotate-3 bg-void-black overflow-hidden group">
                 <img src={user.photoURL || 'https://lh3.googleusercontent.com/aida-public/AB6AXuDdOowMuSd2yKN3lTbLtf7cghWRknyJGJ-lXuYOqIkFAi6g_ifoUF473np1rEG-3b4UtVtv9LmZeCsw-Jd0RPC7MKT3maA7pmtMQ-cocItG9QDGTWXJ3HJX9mcd12Vm9JQDic-ipTWOHYT0_xuPc3RvaMXRG0A6jkTFUDaIAvP07s_BhyAsgYPLIgSSAVTaaFW-tVaW2w2fZBVNzLdfDD2s9c2WLIhiimzuM8pHf-yp_9w3gyHRl7xYW4eVr1IAFzUqXlTElPbTQOa7'} alt="" className="w-full h-full rounded-[32px] md:rounded-[48px] object-cover opacity-80 group-hover:scale-110 transition-transform duration-700" />
              </div>
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 gold-gradient text-void-black px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] shadow-2xl z-20 whitespace-nowrap">
                 {user.isPremium ? 'HathRekha Pro Member' : 'Universal Seeker'}
              </div>
           </div>
           <div className="space-y-6 pt-4">
              <div className="space-y-1">
                 <h2 className="font-serif text-4xl md:text-6xl text-white font-bold tracking-tight">{user.displayName}</h2>
                 <p className="text-sm md:text-lg text-slate-400 font-sans tracking-wide uppercase font-medium">Seeker of Digital Truth • Astral Level 42</p>
              </div>
              
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <div className="px-6 py-3 rounded-2xl glass-card flex items-center gap-3">
                   <div className="w-2 h-2 rounded-full bg-cosmic-gold shadow-[0_0_10px_#ffdb3c]"></div>
                   <span className="text-[10px] font-bold uppercase tracking-widest text-slate-300">{reports.length} Reports</span>
                </div>
                <div className="px-6 py-3 rounded-2xl glass-card flex items-center gap-3">
                   <div className="w-2 h-2 rounded-full bg-mystic-purple shadow-[0_0_10px_#9d50bb]"></div>
                   <span className="text-[10px] font-bold uppercase tracking-widest text-slate-300">Verified Path</span>
                </div>
              </div>
           </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            {/* Recent Reports */}
            <section className="space-y-6">
               <div className="flex justify-between items-center px-2">
                  <h3 className="font-serif text-3xl">Cosmic Timeline</h3>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {reports.length > 0 ? reports.map((report, i) => (
                    <motion.div 
                      key={i} 
                      whileHover={{ y: -5 }}
                      onClick={() => handleViewReport(report)}
                      className="glass-card p-6 rounded-[32px] flex items-center gap-6 group hover:border-mystic-purple/30 transition-all cursor-pointer border-white/5 shadow-xl"
                    >
                       <div className="w-14 h-14 rounded-2xl glass-purple flex items-center justify-center text-mystic-purple shadow-inner">
                          <FileText className="w-6 h-6" />
                       </div>
                       <div className="flex-1">
                          <h4 className="font-bold text-sm">Path Reading #{report.id}</h4>
                          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">{report.date}</p>
                       </div>
                       <ChevronRight className="w-5 h-5 text-slate-600 group-hover:translate-x-1 transition-transform" />
                    </motion.div>
                  )) : (
                    <div className="col-span-2 p-12 text-center glass-card rounded-[40px] text-sm text-slate-500 italic border-dashed border-white/10">
                      No reports in your timeline yet. Scan your palm to begin.
                    </div>
                  )}
               </div>
            </section>
          </div>

          <div className="space-y-12">
            {/* Preferences */}
            <section className="space-y-6">
               <h3 className="font-serif text-2xl px-2">Preferences</h3>
               <div className="glass-card rounded-[40px] overflow-hidden divide-y divide-white/5 border-white/5 shadow-2xl">
                  <div className="p-8 flex justify-between items-center group cursor-pointer hover:bg-white/5 transition-all">
                     <div className="flex items-center gap-4">
                        <Globe className="w-6 h-6 text-mystic-purple" />
                        <div>
                           <p className="text-sm font-bold">Language Settings</p>
                           <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Divine Voice</p>
                        </div>
                     </div>
                     <div className="bg-void-black p-1 rounded-full flex gap-1 border border-white/5">
                        <button className="px-5 py-2 text-[10px] font-bold bg-mystic-purple rounded-full shadow-lg">EN</button>
                        <button className="px-5 py-2 text-[10px] font-bold text-slate-500">HI</button>
                     </div>
                  </div>
                  <div className="p-8 flex justify-between items-center group cursor-pointer hover:bg-white/5 transition-all">
                     <div className="flex items-center gap-4">
                        <Settings className="w-6 h-6 text-mystic-purple" />
                        <p className="text-sm font-bold">System Calibration</p>
                     </div>
                     <ChevronRight className="w-5 h-5 text-slate-600 group-hover:translate-x-1 transition-transform" />
                  </div>
                  <div className="p-8 flex justify-between items-center group cursor-pointer hover:bg-white/5 transition-all">
                     <div className="flex items-center gap-4">
                        <Shield className="w-6 h-6 text-mystic-purple" />
                        <p className="text-sm font-bold">Spiritual Privacy</p>
                     </div>
                     <ChevronRight className="w-5 h-5 text-slate-600 group-hover:translate-x-1 transition-transform" />
                  </div>
               </div>
            </section>

            {/* Logout */}
            <button 
               onClick={handleSignOut}
               className="w-full py-6 glass-card rounded-[40px] text-[10px] uppercase tracking-[0.3em] font-bold text-red-500 flex items-center justify-center gap-3 hover:bg-red-500/10 transition-all active:scale-95 border-red-500/20 shadow-xl"
            >
               <LogOut className="w-5 h-5" />
               Sever Connection
            </button>
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
