import React, { useState, useEffect, Suspense, lazy, useMemo, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { GamificationProvider } from './contexts/GamificationContext';
import { AppStateProvider, useAppState } from './contexts/AppStateContext';
import { OnboardingProvider } from './contexts/OnboardingContext';
import ErrorBoundary from './components/ErrorBoundary';
import { ToastProvider } from './components/Toast';
import Navigation from './components/Navigation';
import SEOHead from './components/SEOHead';
import PerformanceOptimizer from './components/PerformanceOptimizer';
import { useAnalytics, usePerformanceMonitor } from './hooks/useAnalytics';
import { generatePageTitle, generatePageDescription, generatePageKeywords, trackPagePerformance } from './utils/seoUtils';
import { initializePersonalizedPlatform } from './utils/onboardingPersonalization';

// Lazy load components for better performance
const Dashboard = lazy(() => import('./components/IntegratedDashboard'));
const AICoBuilder = lazy(() => import('./components/EnhancedAICoBuilder'));
const OpenCommunity = lazy(() => import('./components/OpenCommunity'));
const MAndA = lazy(() => import('./components/M&A/M&A'));
const AdvancedAnalytics = lazy(() => import('./components/AdvancedAnalytics'));
const EcosystemHub = lazy(() => import('./components/EnhancedEcosystemHub'));
const WorkHub = lazy(() => import('./components/EnhancedWorkHub'));
const PeopleManagement = lazy(() => import('./components/PeopleManagement'));
const Billing = lazy(() => import('./components/Billing'));
const HelpSupport = lazy(() => import('./components/HelpSupport'));
const StartupOnboarding = lazy(() => import('./components/RoleBasedOnboarding'));
const Profile = lazy(() => import('./components/Profile'));
const UserProfile = lazy(() => import('./components/UserProfile'));
const StartupRoadmap = lazy(() => import('./components/StartupRoadmap'));
const GamificationDashboard = lazy(() => import('./components/GamificationDashboard'));
const Login = lazy(() => import('./components/auth/Login'));
const Signup = lazy(() => import('./components/auth/Signup'));
const ForgotPassword = lazy(() => import('./components/auth/ForgotPassword'));
const CreditStore = lazy(() => import('./components/CreditStore'));

import './App.css';

// Optimized loading screen component
const LoadingScreen = () => (
  <div className="fixed inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 flex items-center justify-center z-50">
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center"
    >
      <div className="enterprise-spinner w-12 h-12 mb-4"></div>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-3xl font-bold text-white mb-2 mt-4"
      >
        StartupOS
      </motion.h1>
      <p className="text-white text-lg">Initializing your startup operating system...</p>
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
  const [error, setError] = useState(null);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [onboardingComplete, setOnboardingComplete] = useState(false);
  const { user, logout } = useAuth();
  const { actions: appActions } = useAppState();
  
  // Analytics tracking
  const { trackPageView, trackUserAction, trackOnboardingStep, trackError } = useAnalytics();
  usePerformanceMonitor();

  useEffect(() => {
    // Track page view
    trackPageView('app');
    trackPagePerformance('app');
    
    // Load existing onboarding data if available
    const existingOnboardingData = localStorage.getItem('startupos_onboarding_data');
    if (existingOnboardingData) {
      try {
        const data = JSON.parse(existingOnboardingData);
        const personalizedConfig = initializePersonalizedPlatform(data);
        appActions.setOnboardingData(data);
        appActions.setPersonalizedConfig(personalizedConfig);
      } catch (error) {
        console.error('Error loading onboarding data:', error);
      }
    }
    
    // Optimized loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Check if user needs onboarding
      const hasCompletedOnboarding = localStorage.getItem('onboardingComplete');
      if (!hasCompletedOnboarding) {
        setShowOnboarding(true);
        trackOnboardingStep('start');
      }
    }, 1000); // Reduced from 1500ms

    return () => clearTimeout(timer);
  }, [trackPageView, trackOnboardingStep, appActions]);

  // Error boundary effect
  useEffect(() => {
    const handleError = (error) => {
      console.error('App Error:', error);
      trackError(error, { context: 'app' });
      setError(error.message || 'An unexpected error occurred');
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, [trackError]);

  const renderComponent = useCallback((Component) => {
    if (!Component) {
      console.error('Component is undefined');
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Component Not Found</h2>
            <p className="text-gray-600 mb-4">The requested component could not be loaded.</p>
            <button
              onClick={() => setCurrentView('dashboard')}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      );
    }
    
    return (
      <Suspense fallback={<LoadingScreen />}>
        <Component />
      </Suspense>
    );
  }, []);

  const renderCurrentView = () => {
    try {
      console.log('Rendering view:', currentView);
      trackPageView(currentView);
      trackPagePerformance(currentView);
      
      switch (currentView) {
        case 'dashboard':
          return renderComponent(Dashboard);
        case 'ai-cobuilder':
          return renderComponent(AICoBuilder);
        case 'community':
          return renderComponent(OpenCommunity);
        case 'ma':
          return renderComponent(MAndA);
        case 'analytics':
          return renderComponent(AdvancedAnalytics);
        case 'ecosystem':
          return renderComponent(EcosystemHub);
        case 'workhub':
          return renderComponent(WorkHub);
        case 'people':
          return renderComponent(PeopleManagement);
        case 'billing':
          return renderComponent(Billing);
        case 'support':
          return renderComponent(HelpSupport);
        case 'profile':
          return renderComponent(UserProfile);
        case 'roadmap':
          return renderComponent(StartupRoadmap);
        case 'gamification':
          return renderComponent(GamificationDashboard);
        case 'credit-store':
          return renderComponent(CreditStore);
        default:
          console.warn('Unknown view:', currentView);
          return renderComponent(Dashboard);
      }
    } catch (error) {
      console.error('Error rendering view:', error);
      setError(`Failed to load ${currentView} page: ${error.message}`);
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Something went wrong</h2>
            <p className="text-gray-600 mb-4">Error: {error.message}</p>
            <p className="text-sm text-gray-500 mb-4">View: {currentView}</p>
            <button
              onClick={() => {
                setError(null);
                setCurrentView('dashboard');
              }}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      );
    }
  };

  const handleOnboardingComplete = (data) => {
    console.log('Onboarding completed with data:', data);
    trackOnboardingStep('complete', data);
    
    // Store comprehensive onboarding data for platform personalization
    localStorage.setItem('startupos_onboarding_data', JSON.stringify(data));
    localStorage.setItem('onboardingComplete', 'true');
    
    // Initialize personalized platform configuration
    const personalizedConfig = initializePersonalizedPlatform(data);
    appActions.setOnboardingData(data);
    appActions.setPersonalizedConfig(personalizedConfig);
    
    setOnboardingComplete(true);
    setShowOnboarding(false);
    setCurrentView('dashboard');
    
    // Show success notification
    setTimeout(() => {
      alert('Welcome to StartupOS! Your platform has been personalized based on your preferences.');
    }, 1000);
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (showOnboarding) {
    return (
      <OnboardingProvider>
        <StartupOnboarding onComplete={handleOnboardingComplete} />
      </OnboardingProvider>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
      {/* Performance Optimizer */}
      <PerformanceOptimizer />
      
      {/* SEO Head */}
      <SEOHead 
        title={generatePageTitle(currentView)}
        description={generatePageDescription(currentView)}
        keywords={generatePageKeywords(currentView)}
        url={`https://startupos.com/${currentView}`}
      />
      
      {/* Error Toast */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-4 right-4 z-50 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-3"
        >
          <span>{error}</span>
          <button
            onClick={() => setError(null)}
            className="text-white hover:text-red-200"
          >
            ×
          </button>
        </motion.div>
      )}

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
    <ErrorBoundary>
      <HelmetProvider>
        <AuthProvider>
          <AppStateProvider>
            <ToastProvider>
              <Router>
                <Routes>
              {/* Public Routes */}
              <Route path="/login" element={
                <Suspense fallback={<LoadingScreen />}>
                  <Login />
                </Suspense>
              } />
              <Route path="/signup" element={
                <Suspense fallback={<LoadingScreen />}>
                  <Signup />
                </Suspense>
              } />
              <Route path="/forgot-password" element={
                <Suspense fallback={<LoadingScreen />}>
                  <ForgotPassword />
                </Suspense>
              } />
              
              {/* Protected Routes - Dashboard as default */}
              <Route path="/" element={
                <ProtectedRoute>
                  <GamificationProvider>
                    <AppContent />
                  </GamificationProvider>
                </ProtectedRoute>
              } />
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
        </ToastProvider>
      </AppStateProvider>
    </AuthProvider>
    </HelmetProvider>
  </ErrorBoundary>
  );
}

export default App;