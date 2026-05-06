/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Splash from './screens/Splash';
import Onboarding from './screens/Onboarding';
import Auth from './screens/Auth';
import Dashboard from './screens/Dashboard';
import Scan from './screens/Scan';
import Analysis from './screens/Analysis';
import Results from './screens/Results';
import Chat from './screens/Chat';
import Profile from './screens/Profile';
import Premium from './screens/Premium';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Cosmic breakdown detected:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-void-black flex flex-col items-center justify-center p-6 text-center">
          <div className="w-16 h-16 bg-mystic-purple/20 rounded-full flex items-center justify-center mb-6">
            <span className="text-2xl">âœ¨</span>
          </div>
          <h1 className="text-2xl font-serif text-white mb-4">Celestial Alignment Interrupted</h1>
          <p className="text-slate-400 mb-8 max-w-md">Our cosmic sensors detected a disturbance in the software fabric. Please try refreshing your path.</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-8 py-3 gold-gradient rounded-full text-void-black font-bold uppercase tracking-widest text-xs"
          >
            Reconnect to Universe
          </button>
          {process.env.NODE_ENV === 'development' && (
            <pre className="mt-8 p-4 bg-white/5 border border-white/10 rounded-xl text-left text-xs text-mystic-purple overflow-auto max-w-full">
              {this.state.error?.toString()}
            </pre>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

function AppContent() {
  const { user } = useApp();

  return (
    <Router>
      <div className="relative min-h-screen bg-deep-space text-white overflow-x-hidden">
        <div className="fixed inset-0 cosmic-dust pointer-events-none opacity-20"></div>
        
        <Routes>
          <Route path="/" element={<Splash />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/auth" element={<Auth />} />
          
          <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/auth" />} />
          <Route path="/scan" element={user ? <Scan /> : <Navigate to="/auth" />} />
          <Route path="/analysis" element={user ? <Analysis /> : <Navigate to="/auth" />} />
          <Route path="/results" element={user ? <Results /> : <Navigate to="/auth" />} />
          <Route path="/chat" element={user ? <Chat /> : <Navigate to="/auth" />} />
          <Route path="/profile" element={user ? <Profile /> : <Navigate to="/auth" />} />
          <Route path="/premium" element={user ? <Premium /> : <Navigate to="/auth" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </ErrorBoundary>
  );
}
