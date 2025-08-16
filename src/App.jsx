import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { GamificationProvider } from './contexts/GamificationContext';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import AICoBuilder from './components/AICoBuilder';
import OpenCommunity from './components/OpenCommunity';

import MAndA from './components/M&A/M&A';
import AdvancedAnalytics from './components/AdvancedAnalytics';
import EcosystemHub from './components/EcosystemHub';
import StartupProfile from './components/StartupProfile';
import DigitalHQ from './components/DigitalHQ';
import PeopleManagement from './components/PeopleManagement';

import UserProfile from './components/UserProfile';
import StartupRoadmap from './components/StartupRoadmap';
import GamificationDashboard from './components/GamificationDashboard';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import ForgotPassword from './components/auth/ForgotPassword';
import Landing from './components/Landing';
import './App.css';

// Loading screen component
const LoadingScreen = () => (
  <div className="fixed inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 flex items-center justify-center z-50">
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center"
    >
      <motion.div
        className="w-20 h-20 border-4 border-white border-t-transparent rounded-full mx-auto mb-6"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-3xl font-bold text-white mb-2"
      >
        StartupOS
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="text-white/80"
      >
        Initializing your startup operating system...
      </motion.p>
    </motion.div>
  </div>
);

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <LoadingScreen />;
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

// Main App Component
const AppContent = () => {
  const [currentView, setCurrentView] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(true);
  const [userMode, setUserMode] = useState('startup');
  const { user, logout } = useAuth();

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'ai-cobuilder':
        return <AICoBuilder />;
      case 'community':
        return <OpenCommunity />;

      case 'ma':
        return <MAndA />;
      case 'analytics':
        return <AdvancedAnalytics />;
      case 'ecosystem':
        return <EcosystemHub />;
      case 'startup-profile':
        return <StartupProfile />;
      case 'digital-hq':
        return <DigitalHQ />;
      case 'people':
        return <PeopleManagement />;
      case 'profile':
        return <UserProfile />;
      case 'roadmap':
        return <StartupRoadmap />;
      case 'gamification':
        return <GamificationDashboard />;
      default:
        return <Dashboard />;
    }
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
      {/* Navigation */}
      <Navigation 
        currentView={currentView} 
        setCurrentView={setCurrentView}
        userMode={userMode}
        user={user}
        onLogout={logout}
      />

      {/* Main Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentView}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {renderCurrentView()}
        </motion.div>
      </AnimatePresence>

      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>
    </div>
  );
};

// Root App Component with Router and Auth Provider
function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          
          {/* Protected Routes */}
          <Route path="/app" element={
            <ProtectedRoute>
              <GamificationProvider>
                <AppContent />
              </GamificationProvider>
            </ProtectedRoute>
          } />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <GamificationProvider>
                <AppContent />
              </GamificationProvider>
            </ProtectedRoute>
          } />
          

          
          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

