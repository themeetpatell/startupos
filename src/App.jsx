import React, { useState, useEffect, Suspense, lazy, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { GamificationProvider } from './contexts/GamificationContext';
import { AppStateProvider, useAppState } from './contexts/AppStateContext';
import { OnboardingProvider } from './contexts/OnboardingContext';
import ErrorBoundary from './components/ErrorBoundary';
import { ToastProvider } from './components/Toast';
import Navigation from './components/Navigation';
import { useAnalytics } from './hooks/useAnalytics';
import { initializePersonalizedPlatform } from './utils/onboardingPersonalization';

// Lazy load components for better performance
const Dashboard = lazy(() => import('./components/IntegratedDashboard'));
const AICoBuilder = lazy(() => import('./components/EnhancedAICoBuilder'));
const MAndA = lazy(() => import('./components/M&A/M&A'));
const AdvancedAnalytics = lazy(() => import('./components/AdvancedAnalytics'));
const EcosystemHub = lazy(() => import('./components/EnhancedEcosystemHub'));
const WorkHub = lazy(() => import('./components/EnhancedWorkHub'));
const PeopleManagement = lazy(() => import('./components/PeopleManagement'));
const Billing = lazy(() => import('./components/Billing'));
const HelpSupport = lazy(() => import('./components/HelpSupport'));
const StartupOnboarding = lazy(() => import('./components/RoleBasedOnboarding'));
const UserProfile = lazy(() => import('./components/UserProfile'));
const StartupRoadmap = lazy(() => import('./components/StartupRoadmap'));
const GamificationDashboard = lazy(() => import('./components/GamificationDashboard'));
const Login = lazy(() => import('./components/auth/Login'));
const Signup = lazy(() => import('./components/auth/Signup'));
const ForgotPassword = lazy(() => import('./components/auth/ForgotPassword'));

import './App.css';

const LoadingScreen = () => (
  <div className="fixed inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 flex items-center justify-center z-50">
    <div className="text-center">
      <div className="w-12 h-12 mb-4 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
      <h1 className="text-3xl font-bold text-white mb-2 mt-4">StartupOS</h1>
      <p className="text-white text-lg">Initializing your startup operating system...</p>
    </div>
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
  const [error, setError] = useState(null);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const { user, logout } = useAuth();
  const { actions: appActions } = useAppState();
  
  const { trackOnboardingStep } = useAnalytics();

  useEffect(() => {
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
    
    const hasCompletedOnboarding = localStorage.getItem('onboardingComplete');
    if (!hasCompletedOnboarding) {
      setShowOnboarding(true);
      trackOnboardingStep('start');
    }
  }, [trackOnboardingStep, appActions]);

  useEffect(() => {
    const handleError = (error) => {
      console.error('App Error:', error);
      setError(error.message || 'An unexpected error occurred');
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

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
      switch (currentView) {
        case 'dashboard':
          return renderComponent(Dashboard);
        case 'ai-cobuilder':
          return renderComponent(AICoBuilder);
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
    trackOnboardingStep('complete', data);
    localStorage.setItem('startupos_onboarding_data', JSON.stringify(data));
    localStorage.setItem('onboardingComplete', 'true');
    const personalizedConfig = initializePersonalizedPlatform(data);
    appActions.setOnboardingData(data);
    appActions.setPersonalizedConfig(personalizedConfig);
    setShowOnboarding(false);
    setCurrentView('dashboard');
  };

  if (showOnboarding) {
    return (
      <OnboardingProvider>
        <StartupOnboarding onComplete={handleOnboardingComplete} />
      </OnboardingProvider>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {error && (
        <div className="fixed top-4 right-4 z-50 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-3">
          <span>{error}</span>
          <button
            onClick={() => setError(null)}
            className="text-white hover:text-red-200"
          >
            ×
          </button>
        </div>
      )}

      <Navigation 
        currentView={currentView} 
        setCurrentView={setCurrentView}
        user={user}
        onLogout={logout}
      />

      <div className="transition-all duration-200">
        {renderCurrentView()}
      </div>
    </div>
  );
};

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <AppStateProvider>
          <ToastProvider>
            <Router>
              <Routes>
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
                
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Router>
          </ToastProvider>
        </AppStateProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;