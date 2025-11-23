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
const Impacts = lazy(() => import('./components/Impacts'));
const DecisionIntelligence = lazy(() => import('./components/DecisionIntelligence'));
const RunwayIntelligence = lazy(() => import('./components/RunwayIntelligence'));
const PMFValidation = lazy(() => import('./components/PMFValidation'));
const CustomerIntelligence = lazy(() => import('./components/CustomerIntelligence'));
const CapTableFundraising = lazy(() => import('./components/CapTableFundraising'));
const Login = lazy(() => import('./components/auth/Login'));
const Signup = lazy(() => import('./components/auth/Signup'));
const ForgotPassword = lazy(() => import('./components/auth/ForgotPassword'));

import './styles/design-system.css';

const LoadingScreen = () => (
  <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
    <div className="text-center">
      <div className="w-12 h-12 mb-4 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
      <h1 className="text-3xl font-bold text-black mb-2 mt-4">StartupOS</h1>
      <p className="text-gray-600 text-lg">Initializing your startup operating system...</p>
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
        // Error loading onboarding data
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
      setError(error.message || 'An unexpected error occurred');
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  const renderComponent = useCallback((Component) => {
    return (
      <Suspense fallback={<LoadingScreen />}>
        <Component />
      </Suspense>
    );
  }, []);

  const viewComponents = {
    dashboard: Dashboard,
    analytics: AdvancedAnalytics,
    ecosystem: EcosystemHub,
    workhub: WorkHub,
    people: PeopleManagement,
    billing: Billing,
    support: HelpSupport,
    profile: UserProfile,
    roadmap: StartupRoadmap,
    gamification: GamificationDashboard,
    impacts: Impacts,
    decisions: DecisionIntelligence,
    runway: RunwayIntelligence,
    pmf: PMFValidation,
    customers: CustomerIntelligence,
    captable: CapTableFundraising
  };

  const CurrentComponent = viewComponents[currentView] || Dashboard;

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
    <div className="min-h-screen bg-white">
      {error && (
        <div className="fixed top-4 right-4 z-50 bg-white text-black border-2 border-black px-6 py-3 rounded-lg shadow-lg flex items-center space-x-3">
          <span>{error}</span>
          <button
            onClick={() => setError(null)}
            className="text-black hover:text-gray-600"
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
        {renderComponent(CurrentComponent)}
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
                <Route path="/" element={<Navigate to="/login" replace />} />
                
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
                
                <Route path="/app" element={
                  <ProtectedRoute>
                    <GamificationProvider>
                      <AppContent />
                    </GamificationProvider>
                  </ProtectedRoute>
                } />
                
                <Route path="*" element={<Navigate to="/login" replace />} />
              </Routes>
            </Router>
          </ToastProvider>
        </AppStateProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;