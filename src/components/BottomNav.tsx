import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Camera, MessageSquare, FileText, User } from 'lucide-react';
import { motion } from 'motion/react';

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    { id: 'home', path: '/dashboard', icon: Home, label: 'Home' },
    { id: 'scan', path: '/scan', icon: Camera, label: 'Scan' },
    { id: 'chat', path: '/chat', icon: MessageSquare, label: 'AstroBot' },
    { id: 'reports', path: '/results', icon: FileText, label: 'Reports' },
    { id: 'profile', path: '/profile', icon: User, label: 'Profile' },
  ];

  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-md z-50">
      <div className="bg-void-black/80 backdrop-blur-2xl rounded-full border border-white/10 p-2 flex justify-between items-center shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
        {tabs.map((tab) => {
          const isActive = location.pathname === tab.path;
          return (
            <button
              key={tab.id}
              onClick={() => navigate(tab.path)}
              className="relative flex flex-col items-center justify-center p-3 transition-all rounded-full group"
            >
              {isActive && (
                <motion.div
                   layoutId="nav-glow"
                   className="absolute inset-0 bg-mystic-purple/20 rounded-full blur-xl scale-125"
                />
              )}
              <tab.icon className={`w-6 h-6 transition-colors ${isActive ? 'text-cosmic-gold' : 'text-slate-500 group-hover:text-mystic-purple'}`} />
              <span className={`text-[8px] uppercase tracking-widest mt-1 font-bold ${isActive ? 'text-cosmic-gold' : 'text-slate-500'}`}>
                {tab.label}
              </span>
              {isActive && (
                <motion.div 
                  layoutId="active-dot"
                  className="absolute -top-1 w-1 h-1 bg-cosmic-gold rounded-full"
                />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
