import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, Users, Target, CheckCircle, ArrowRight, 
  Zap, Shield, Lightbulb, Rocket, Star, TrendingUp
} from 'lucide-react';

const OptimizedOnboarding = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    companyName: '',
    industry: '',
    stage: '',
    teamSize: '',
    goals: []
  });

  const [errors, setErrors] = useState({});

  // Streamlined steps - reduced from 7 to 3
  const steps = [
    {
      id: 'welcome',
      title: 'Welcome to StartupOS',
      subtitle: 'Let\'s get you set up in 2 minutes',
      icon: Rocket,
      color: 'blue'
    },
    {
      id: 'company',
      title: 'Company Details',
      subtitle: 'Tell us about your startup',
      icon: Building2,
      color: 'green'
    },
    {
      id: 'goals',
      title: 'Your Goals',
      subtitle: 'What do you want to achieve?',
      icon: Target,
      color: 'purple'
    }
  ];

  const industries = ['SaaS', 'E-commerce', 'FinTech', 'HealthTech', 'EdTech', 'AI/ML', 'Other'];
  const stages = ['Idea Stage', 'MVP', 'Early Stage', 'Growth Stage', 'Scale Stage'];
  const teamSizes = ['1-5', '6-10', '11-25', '26-50', '50+'];
  const goals = ['Raise Funding', 'Grow User Base', 'Increase Revenue', 'Build Team', 'Launch Product'];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleGoalToggle = (goal) => {
    setFormData(prev => ({
      ...prev,
      goals: prev.goals.includes(goal) 
        ? prev.goals.filter(g => g !== goal)
        : [...prev.goals, goal]
    }));
  };

  const validateStep = (stepId) => {
    const newErrors = {};
    
    switch (stepId) {
      case 'company':
        if (!formData.companyName) newErrors.companyName = 'Company name is required';
        if (!formData.industry) newErrors.industry = 'Industry is required';
        if (!formData.stage) newErrors.stage = 'Stage is required';
        if (!formData.teamSize) newErrors.teamSize = 'Team size is required';
        break;
      case 'goals':
        if (formData.goals.length === 0) newErrors.goals = 'Please select at least one goal';
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      const currentStepId = steps[currentStep].id;
      if (validateStep(currentStepId)) {
        setCurrentStep(prev => prev + 1);
      }
    } else {
      handleComplete();
    }
  };

  const handleComplete = async () => {
    // Simulate API call with reduced time
    await new Promise(resolve => setTimeout(resolve, 1000));
    if (onComplete) {
      onComplete(formData);
    }
  };

  const renderWelcome = () => (
    <div className="text-center space-y-8">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto"
      >
        <Rocket className="h-12 w-12 text-white" />
      </motion.div>
      
      <div className="space-y-4">
        <h2 className="text-4xl font-bold text-gray-900">Welcome to StartupOS</h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          The complete operating system for modern startups. Get started in minutes.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <div className="enterprise-card p-6 text-center">
          <Zap className="h-8 w-8 text-blue-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Quick Setup</h3>
          <p className="text-gray-600">Get started in 2 minutes</p>
        </div>
        
        <div className="enterprise-card p-6 text-center">
          <Shield className="h-8 w-8 text-green-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Secure & Private</h3>
          <p className="text-gray-600">Enterprise-grade security</p>
        </div>
        
        <div className="enterprise-card p-6 text-center">
          <Lightbulb className="h-8 w-8 text-purple-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">AI-Powered</h3>
          <p className="text-gray-600">Leverage AI for growth</p>
        </div>
      </div>
    </div>
  );

  const renderCompanyDetails = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Company Details</h2>
        <p className="text-gray-600">Tell us about your startup</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Company Name *
          </label>
          <input
            type="text"
            value={formData.companyName}
            onChange={(e) => handleInputChange('companyName', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.companyName ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter your company name"
          />
          {errors.companyName && (
            <p className="text-red-500 text-sm mt-1">{errors.companyName}</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Industry *
          </label>
          <select
            value={formData.industry}
            onChange={(e) => handleInputChange('industry', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.industry ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Select industry</option>
            {industries.map(industry => (
              <option key={industry} value={industry}>{industry}</option>
            ))}
          </select>
          {errors.industry && (
            <p className="text-red-500 text-sm mt-1">{errors.industry}</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Stage *
          </label>
          <select
            value={formData.stage}
            onChange={(e) => handleInputChange('stage', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.stage ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Select stage</option>
            {stages.map(stage => (
              <option key={stage} value={stage}>{stage}</option>
            ))}
          </select>
          {errors.stage && (
            <p className="text-red-500 text-sm mt-1">{errors.stage}</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Team Size *
          </label>
          <select
            value={formData.teamSize}
            onChange={(e) => handleInputChange('teamSize', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.teamSize ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Select team size</option>
            {teamSizes.map(size => (
              <option key={size} value={size}>{size} people</option>
            ))}
          </select>
          {errors.teamSize && (
            <p className="text-red-500 text-sm mt-1">{errors.teamSize}</p>
          )}
        </div>
      </div>
    </div>
  );

  const renderGoals = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Your Goals</h2>
        <p className="text-gray-600">What do you want to achieve with StartupOS?</p>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-4">
          Select Your Goals *
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {goals.map(goal => (
            <button
              key={goal}
              onClick={() => handleGoalToggle(goal)}
              className={`p-4 rounded-lg border-2 text-center transition-all ${
                formData.goals.includes(goal)
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              {goal}
            </button>
          ))}
        </div>
        {errors.goals && (
          <p className="text-red-500 text-sm mt-2">{errors.goals}</p>
        )}
      </div>
    </div>
  );

  const renderStepContent = () => {
    switch (steps[currentStep].id) {
      case 'welcome': return renderWelcome();
      case 'company': return renderCompanyDetails();
      case 'goals': return renderGoals();
      default: return renderWelcome();
    }
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Step {currentStep + 1} of {steps.length}
            </span>
            <span className="text-sm font-medium text-gray-700">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Step Header */}
        <div className="text-center mb-8">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className={`w-16 h-16 bg-gradient-to-r ${
              steps[currentStep].color === 'blue' ? 'from-blue-500 to-blue-600' :
              steps[currentStep].color === 'green' ? 'from-green-500 to-green-600' :
              'from-purple-500 to-purple-600'
            } rounded-full flex items-center justify-center mx-auto`}>
                {React.createElement(steps[currentStep].icon, { className: "h-8 w-8 text-white" })}
            </div>
            <h1 className="text-3xl font-bold text-gray-900">{steps[currentStep].title}</h1>
            <p className="text-lg text-gray-600">{steps[currentStep].subtitle}</p>
          </motion.div>
        </div>

        {/* Step Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="enterprise-card p-8 mb-8"
          >
            {renderStepContent()}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <div></div>

          <div className="flex space-x-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index <= currentStep ? 'bg-blue-500' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="enterprise-button-primary flex items-center space-x-2 px-6 py-3"
          >
            <span>{currentStep === steps.length - 1 ? 'Complete' : 'Next'}</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OptimizedOnboarding;

