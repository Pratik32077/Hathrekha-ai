/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
