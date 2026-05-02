import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Mail, Lock, Smartphone, Github, Chrome, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';

import { signInWithGoogle } from '../lib/firebase';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { user } = useApp();

  // Redirect if already logged in
  React.useEffect(() => {
    if (user) navigate('/dashboard');
  }, [user, navigate]);

  const handleGoogleLogin = async () => {
    try {
      setError(null);
      await signInWithGoogle();
      navigate('/dashboard');
    } catch (err: any) {
      setError("Failed to align with the stars. Try again.");
    }
  };

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setError("Traditional paths are currently blocked by celestial alignment. Please use Google Login.");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 relative">
      <div className="fixed top-20 right-10 w-64 h-64 bg-mystic-purple/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="fixed bottom-20 left-10 w-80 h-80 bg-cosmic-gold/5 blur-[120px] rounded-full pointer-events-none"></div>

      <header className="fixed top-0 left-0 w-full z-50 flex items-center px-6 py-4 bg-void-black/40 backdrop-blur-xl border-b border-white/10">
        <div className="flex items-center gap-3">
          <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAE6UppOrLWwZYYAKQmCQV2dBBb-WFenuHwXc4XCZjPlHC65CVFNxw5z7lu93SVqiqlwIZhxVxECwpVGWCVhFNuMykaY5ws8PxeqvAg6EnoRMmlhe5AJlHxc0if4PuJ76rxtYoBCYWMBUsBslBNNSVP_OeMR4by2DpenOE87zZOYYNt83J3K0ejc8xaY4LIV-iqywNyAUB9yLrZ6iGMC-o4jaMVXYJkaaWOOHsbPG8upZAPSo0jtTUFVnqR4LM8uwL0Zd0u-VDP3hLl" className="w-8 h-8 rounded-full" alt="" />
          <span className="font-serif font-bold text-xl gold-gradient bg-clip-text text-transparent">HathRekha AI</span>
        </div>
      </header>

      <div className="w-full max-w-md pt-16">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="glass-card rounded-3xl p-8 space-y-8"
        >
          <div className="text-center space-y-2">
            <h1 className="font-serif text-4xl text-mystic-purple">The Stars Await</h1>
            <p className="text-on-surface-variant text-sm">Sign in to decode your destiny with elite AI precision.</p>
          </div>

          <div className="space-y-3">
            <button onClick={handleAuth} className="w-full py-4 glass-card rounded-full flex items-center justify-center gap-3 hover:bg-white/10 transition-all">
              <Github className="w-5 h-5 text-on-surface" />
              <span className="font-bold">Continue with GitHub</span>
            </button>
            <button onClick={handleGoogleLogin} className="w-full py-4 glass-card rounded-full flex items-center justify-center gap-3 hover:bg-white/10 transition-all">
              <Chrome className="w-5 h-5 text-on-surface" />
              <span className="font-bold">Continue with Google</span>
            </button>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-200 text-[10px] uppercase font-bold p-3 rounded-xl text-center animate-pulse">
              {error}
            </div>
          )}

          <div className="flex items-center gap-4 py-2">
            <div className="flex-1 h-px bg-white/10"></div>
            <span className="text-[10px] uppercase tracking-widest text-on-surface-variant/60 font-bold">or email</span>
            <div className="flex-1 h-px bg-white/10"></div>
          </div>

          <form onSubmit={handleAuth} className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant ml-4">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-mystic-purple/50" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="destiny@cosmos.com" 
                  className="w-full bg-void-black/50 border border-white/10 rounded-full py-4 pl-12 pr-6 focus:border-mystic-purple focus:ring-1 focus:ring-mystic-purple outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant ml-4">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-mystic-purple/50" />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••" 
                  className="w-full bg-void-black/50 border border-white/10 rounded-full py-4 pl-12 pr-6 focus:border-mystic-purple focus:ring-1 focus:ring-mystic-purple outline-none transition-all"
                />
              </div>
            </div>

            <div className="flex justify-between items-center px-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-white/10 bg-void-black/50 text-mystic-purple focus:ring-mystic-purple" />
                <span className="text-xs text-on-surface-variant">Remember me</span>
              </label>
              <button type="button" className="text-xs text-mystic-purple font-bold">Forgot?</button>
            </div>

            <button type="submit" className="w-full py-5 gold-gradient rounded-full font-bold text-void-black gold-glow transition-transform active:scale-95 flex items-center justify-center gap-2">
              Analyze My Path
              <Sparkles className="w-5 h-5" />
            </button>
          </form>

          <div className="text-center space-y-4 pt-4">
            <button className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant hover:text-mystic-purple flex items-center justify-center gap-2 mx-auto">
              <Smartphone className="w-4 h-4" />
              Log in with Mobile OTP
            </button>
            <p className="text-sm text-on-surface-variant">
              Don't have an account? <span className="text-cosmic-gold font-bold cursor-pointer">Create Account</span>
            </p>
          </div>
        </motion.div>

        <p className="mt-12 text-center text-[10px] uppercase tracking-[0.2em] text-on-surface-variant/40 leading-relaxed max-w-xs mx-auto">
          Precision Palmistry meets Artificial Intelligence. Securely encrypted and privacy focused.
        </p>
      </div>
    </div>
  );
}
