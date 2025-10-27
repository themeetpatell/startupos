import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, Target, Users, Settings, Sparkles, 
  ArrowRight, ArrowLeft, CheckCircle, Star, 
  TrendingUp, Zap, Shield, Lightbulb, Rocket,
  Globe, Calendar, DollarSign, BarChart3,
  Briefcase, Code, Database, Smartphone,
  Bell, Eye, MessageSquare, FileText
} from 'lucide-react';
import { useOnboarding, validateStep } from '../contexts/OnboardingContext';

const EnhancedOnboarding = ({ onComplete }) => {
  const { state, actions } = useOnboarding();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Step configurations
  const steps = [
    {
      id: 'company',
      title: 'Company Profile',
      subtitle: 'Tell us about your startup',
      icon: Building2,
      color: 'blue',
      description: 'Help us understand your company structure and industry focus'
    },
    {
      id: 'goals',
      title: 'Goals & Metrics',
      subtitle: 'Define your success metrics',
      icon: Target,
      color: 'green',
      description: 'Set clear objectives and track your progress'
    },
    {
      id: 'team',
      title: 'Team & Roles',
      subtitle: 'Build your dream team',
      icon: Users,
      color: 'purple',
      description: 'Configure team structure and hiring needs'
    },
    {
      id: 'technology',
      title: 'Technology Stack',
      subtitle: 'Choose your tools',
      icon: Settings,
      color: 'orange',
      description: 'Select integrations and technical preferences'
    },
    {
      id: 'preferences',
      title: 'Platform Setup',
      subtitle: 'Personalize your experience',
      icon: Sparkles,
      color: 'pink',
      description: 'Customize your dashboard and notifications'
    }
  ];

  // Data options
  const industries = [
    'SaaS', 'E-commerce', 'FinTech', 'HealthTech', 'EdTech', 
    'AI/ML', 'Blockchain', 'Gaming', 'Media', 'Real Estate', 'Other'
  ];
  
  const stages = [
    'Idea Stage', 'MVP Development', 'Early Stage', 'Growth Stage', 'Scale Stage', 'IPO Ready'
  ];
  
  const teamSizes = ['1-5', '6-10', '11-25', '26-50', '51-100', '100+'];
  
  const primaryGoals = [
    'Raise Funding', 'Grow User Base', 'Increase Revenue', 'Build Team', 
    'Launch Product', 'Expand Market', 'Improve Operations', 'Scale Technology'
  ];
  
  const secondaryGoals = [
    'Improve Customer Experience', 'Reduce Costs', 'Increase Efficiency', 
    'Build Partnerships', 'Enter New Markets', 'Develop New Features'
  ];
  
  const roles = [
    'CEO/Founder', 'CTO', 'CMO', 'CFO', 'COO', 'Product Manager', 
    'Engineering Lead', 'Sales Lead', 'Marketing Lead', 'Design Lead'
  ];
  
  const hiringNeeds = [
    'Software Engineers', 'Product Managers', 'Sales Reps', 'Marketing Specialists',
    'Designers', 'Data Scientists', 'DevOps Engineers', 'Customer Success'
  ];
  
  const currentTools = [
    'Slack', 'Microsoft Teams', 'Zoom', 'Google Workspace', 'Notion', 'Asana',
    'Trello', 'Jira', 'GitHub', 'Figma', 'Salesforce', 'HubSpot'
  ];
  
  const integrations = [
    'CRM Systems', 'Email Marketing', 'Analytics Tools', 'Payment Processing',
    'Social Media', 'Project Management', 'Customer Support', 'Accounting'
  ];

  const handleInputChange = (section, field, value) => {
    actions.updateData(section, { [field]: value });
    // Clear errors when user starts typing
    if (state.ui.errors[field]) {
      actions.clearErrors();
    }
  };

  const handleArrayToggle = (section, field, value) => {
    const currentArray = state.data[section]?.[field] || [];
    const newArray = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value];
    handleInputChange(section, field, newArray);
  };

  const handleNext = async () => {
    const errors = validateStep(state.currentStep, state.data);
    
    if (Object.keys(errors).length > 0) {
      actions.setErrors(errors);
      return;
    }
    
    actions.clearErrors();
    
    if (state.currentStep < steps.length - 1) {
      actions.nextStep();
    } else {
      await handleComplete();
    }
  };

  const handleComplete = async () => {
    setIsSubmitting(true);
    actions.setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Store onboarding data
      localStorage.setItem('startupos_onboarding_data', JSON.stringify(state.data));
      localStorage.setItem('onboardingComplete', 'true');
      
      actions.completeOnboarding();
      
      if (onComplete) {
        onComplete(state.data);
      }
    } catch (error) {
      console.error('Onboarding completion error:', error);
    } finally {
      setIsSubmitting(false);
      actions.setLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (state.currentStep) {
      case 0: return renderCompanyProfile();
      case 1: return renderGoalsMetrics();
      case 2: return renderTeamRoles();
      case 3: return renderTechnologyStack();
      case 4: return renderPlatformPreferences();
      default: return renderCompanyProfile();
    }
  };

  const renderCompanyProfile = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Company Name *
          </label>
          <input
            type="text"
            value={state.data.company?.name || ''}
            onChange={(e) => handleInputChange('company', 'name', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              state.ui.errors.companyName ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter your company name"
          />
          {state.ui.errors.companyName && (
            <p className="text-red-500 text-sm mt-1">{state.ui.errors.companyName}</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Industry *
          </label>
          <select
            value={state.data.company?.industry || ''}
            onChange={(e) => handleInputChange('company', 'industry', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white ${
              state.ui.errors.industry ? 'border-red-500' : 'border-gray-300'
            }`}
            style={{
              backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
              backgroundPosition: 'right 12px center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: '16px'
            }}
          >
            <option value="">Select industry</option>
            {industries.map(industry => (
              <option key={industry} value={industry}>{industry}</option>
            ))}
          </select>
          {state.ui.errors.industry && (
            <p className="text-red-500 text-sm mt-1">{state.ui.errors.industry}</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Stage *
          </label>
          <select
            value={state.data.company?.stage || ''}
            onChange={(e) => handleInputChange('company', 'stage', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white ${
              state.ui.errors.stage ? 'border-red-500' : 'border-gray-300'
            }`}
            style={{
              backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
              backgroundPosition: 'right 12px center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: '16px'
            }}
          >
            <option value="">Select stage</option>
            {stages.map(stage => (
              <option key={stage} value={stage}>{stage}</option>
            ))}
          </select>
          {state.ui.errors.stage && (
            <p className="text-red-500 text-sm mt-1">{state.ui.errors.stage}</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Team Size *
          </label>
          <select
            value={state.data.company?.teamSize || ''}
            onChange={(e) => handleInputChange('company', 'teamSize', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white ${
              state.ui.errors.teamSize ? 'border-red-500' : 'border-gray-300'
            }`}
            style={{
              backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
              backgroundPosition: 'right 12px center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: '16px'
            }}
          >
            <option value="">Select team size</option>
            {teamSizes.map(size => (
              <option key={size} value={size}>{size} people</option>
            ))}
          </select>
          {state.ui.errors.teamSize && (
            <p className="text-red-500 text-sm mt-1">{state.ui.errors.teamSize}</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Founded Year
          </label>
          <input
            type="number"
            value={state.data.company?.foundedYear || ''}
            onChange={(e) => handleInputChange('company', 'foundedYear', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="2024"
            min="1900"
            max="2024"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Location
          </label>
          <input
            type="text"
            value={state.data.company?.location || ''}
            onChange={(e) => handleInputChange('company', 'location', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="San Francisco, CA"
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Company Description
        </label>
        <textarea
          value={state.data.company?.description || ''}
          onChange={(e) => handleInputChange('company', 'description', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          rows={3}
          placeholder="Briefly describe your company and what you do..."
        />
      </div>
    </div>
  );

  const renderGoalsMetrics = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-4">
          Primary Goals *
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {primaryGoals.map(goal => (
            <button
              key={goal}
              onClick={() => handleArrayToggle('goals', 'primary', goal)}
              className={`p-3 rounded-lg border-2 text-center transition-all ${
                state.data.goals?.primary?.includes(goal)
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              {goal}
            </button>
          ))}
        </div>
        {state.ui.errors.primaryGoals && (
          <p className="text-red-500 text-sm mt-2">{state.ui.errors.primaryGoals}</p>
        )}
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-4">
          Secondary Goals
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {secondaryGoals.map(goal => (
            <button
              key={goal}
              onClick={() => handleArrayToggle('goals', 'secondary', goal)}
              className={`p-3 rounded-lg border-2 text-center transition-all ${
                state.data.goals?.secondary?.includes(goal)
                  ? 'border-green-500 bg-green-50 text-green-700'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              {goal}
            </button>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Timeline *
          </label>
          <select
            value={state.data.goals?.timeline || ''}
            onChange={(e) => handleInputChange('goals', 'timeline', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white ${
              state.ui.errors.timeline ? 'border-red-500' : 'border-gray-300'
            }`}
            style={{
              backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
              backgroundPosition: 'right 12px center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: '16px'
            }}
          >
            <option value="">Select timeline</option>
            <option value="3-months">3 months</option>
            <option value="6-months">6 months</option>
            <option value="1-year">1 year</option>
            <option value="2-years">2 years</option>
            <option value="5-years">5+ years</option>
          </select>
          {state.ui.errors.timeline && (
            <p className="text-red-500 text-sm mt-1">{state.ui.errors.timeline}</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Budget Range
          </label>
          <select
            value={state.data.goals?.budget || ''}
            onChange={(e) => handleInputChange('goals', 'budget', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
              backgroundPosition: 'right 12px center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: '16px'
            }}
          >
            <option value="">Select budget</option>
            <option value="0-10k">$0 - $10K</option>
            <option value="10k-50k">$10K - $50K</option>
            <option value="50k-100k">$50K - $100K</option>
            <option value="100k-500k">$100K - $500K</option>
            <option value="500k+">$500K+</option>
          </select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Metrics</h3>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Revenue</label>
              <input
                type="text"
                value={state.data.goals?.currentMetrics?.revenue || ''}
                onChange={(e) => handleInputChange('goals', 'currentMetrics', { 
                  ...state.data.goals?.currentMetrics, 
                  revenue: e.target.value 
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="$0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Active Users</label>
              <input
                type="text"
                value={state.data.goals?.currentMetrics?.users || ''}
                onChange={(e) => handleInputChange('goals', 'currentMetrics', { 
                  ...state.data.goals?.currentMetrics, 
                  users: e.target.value 
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="0"
              />
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Target Metrics</h3>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Target Revenue</label>
              <input
                type="text"
                value={state.data.goals?.targetMetrics?.revenue || ''}
                onChange={(e) => handleInputChange('goals', 'targetMetrics', { 
                  ...state.data.goals?.targetMetrics, 
                  revenue: e.target.value 
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="$0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Target Users</label>
              <input
                type="text"
                value={state.data.goals?.targetMetrics?.users || ''}
                onChange={(e) => handleInputChange('goals', 'targetMetrics', { 
                  ...state.data.goals?.targetMetrics, 
                  users: e.target.value 
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="0"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTeamRoles = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-4">
          Current Roles *
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {roles.map(role => (
            <button
              key={role}
              onClick={() => handleArrayToggle('team', 'currentRoles', role)}
              className={`p-3 rounded-lg border-2 text-center transition-all ${
                state.data.team?.currentRoles?.includes(role)
                  ? 'border-purple-500 bg-purple-50 text-purple-700'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              {role}
            </button>
          ))}
        </div>
        {state.ui.errors.currentRoles && (
          <p className="text-red-500 text-sm mt-2">{state.ui.errors.currentRoles}</p>
        )}
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-4">
          Hiring Needs
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {hiringNeeds.map(need => (
            <button
              key={need}
              onClick={() => handleArrayToggle('team', 'hiringNeeds', need)}
              className={`p-3 rounded-lg border-2 text-center transition-all ${
                state.data.team?.hiringNeeds?.includes(need)
                  ? 'border-orange-500 bg-orange-50 text-orange-700'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              {need}
            </button>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Experience Level *
          </label>
          <select
            value={state.data.team?.experience || ''}
            onChange={(e) => handleInputChange('team', 'experience', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white ${
              state.ui.errors.experience ? 'border-red-500' : 'border-gray-300'
            }`}
            style={{
              backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
              backgroundPosition: 'right 12px center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: '16px'
            }}
          >
            <option value="">Select experience</option>
            <option value="early">Early career (0-3 years)</option>
            <option value="mid">Mid-level (3-7 years)</option>
            <option value="senior">Senior (7-15 years)</option>
            <option value="executive">Executive (15+ years)</option>
          </select>
          {state.ui.errors.experience && (
            <p className="text-red-500 text-sm mt-1">{state.ui.errors.experience}</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Work Style
          </label>
          <select
            value={state.data.team?.workStyle || ''}
            onChange={(e) => handleInputChange('team', 'workStyle', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
              backgroundPosition: 'right 12px center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: '16px'
            }}
          >
            <option value="">Select work style</option>
            <option value="remote">Fully Remote</option>
            <option value="hybrid">Hybrid</option>
            <option value="office">Office-based</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderTechnologyStack = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-4">
          Current Tools *
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {currentTools.map(tool => (
            <button
              key={tool}
              onClick={() => handleArrayToggle('technology', 'currentTools', tool)}
              className={`p-3 rounded-lg border-2 text-center transition-all ${
                state.data.technology?.currentTools?.includes(tool)
                  ? 'border-orange-500 bg-orange-50 text-orange-700'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              {tool}
            </button>
          ))}
        </div>
        {state.ui.errors.currentTools && (
          <p className="text-red-500 text-sm mt-2">{state.ui.errors.currentTools}</p>
        )}
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-4">
          Integration Needs
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {integrations.map(integration => (
            <button
              key={integration}
              onClick={() => handleArrayToggle('technology', 'integrations', integration)}
              className={`p-3 rounded-lg border-2 text-center transition-all ${
                state.data.technology?.integrations?.includes(integration)
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              {integration}
            </button>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Scalability Needs *
          </label>
          <select
            value={state.data.technology?.scalability || ''}
            onChange={(e) => handleInputChange('technology', 'scalability', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white ${
              state.ui.errors.scalability ? 'border-red-500' : 'border-gray-300'
            }`}
            style={{
              backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
              backgroundPosition: 'right 12px center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: '16px'
            }}
          >
            <option value="">Select scalability needs</option>
            <option value="startup">Startup (1-100 users)</option>
            <option value="growth">Growth (100-10K users)</option>
            <option value="scale">Scale (10K-100K users)</option>
            <option value="enterprise">Enterprise (100K+ users)</option>
          </select>
          {state.ui.errors.scalability && (
            <p className="text-red-500 text-sm mt-1">{state.ui.errors.scalability}</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Technology Budget
          </label>
          <select
            value={state.data.technology?.budget || ''}
            onChange={(e) => handleInputChange('technology', 'budget', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
              backgroundPosition: 'right 12px center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: '16px'
            }}
          >
            <option value="">Select budget</option>
            <option value="0-1k">$0 - $1K/month</option>
            <option value="1k-5k">$1K - $5K/month</option>
            <option value="5k-10k">$5K - $10K/month</option>
            <option value="10k+">$10K+/month</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderPlatformPreferences = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-4">
          Dashboard Preferences *
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { id: 'revenue', label: 'Revenue Tracking', icon: DollarSign },
            { id: 'users', label: 'User Analytics', icon: Users },
            { id: 'goals', label: 'Goal Tracking', icon: Target },
            { id: 'team', label: 'Team Performance', icon: Briefcase },
            { id: 'tasks', label: 'Task Management', icon: CheckCircle },
            { id: 'ai', label: 'AI Assistant', icon: Sparkles }
          ].map(pref => (
            <button
              key={pref.id}
              onClick={() => handleArrayToggle('preferences', 'dashboard', pref.id)}
              className={`p-4 rounded-lg border-2 text-left transition-all flex items-center space-x-3 ${
                state.data.preferences?.dashboard?.includes(pref.id)
                  ? 'border-pink-500 bg-pink-50 text-pink-700'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <pref.icon className="h-5 w-5" />
              <span>{pref.label}</span>
            </button>
          ))}
        </div>
        {state.ui.errors.dashboard && (
          <p className="text-red-500 text-sm mt-2">{state.ui.errors.dashboard}</p>
        )}
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-4">
          Feature Preferences *
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { id: 'analytics', label: 'Advanced Analytics', icon: BarChart3 },
            { id: 'ai-cobuilder', label: 'AI Co-Builder', icon: Brain },
            { id: 'community', label: 'Community Hub', icon: MessageSquare },
            { id: 'ma', label: 'M&A Tools', icon: TrendingUp },
            { id: 'billing', label: 'Billing Management', icon: FileText },
            { id: 'support', label: 'Help & Support', icon: Bell }
          ].map(feature => (
            <button
              key={feature.id}
              onClick={() => handleArrayToggle('preferences', 'features', feature.id)}
              className={`p-4 rounded-lg border-2 text-left transition-all flex items-center space-x-3 ${
                state.data.preferences?.features?.includes(feature.id)
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <feature.icon className="h-5 w-5" />
              <span>{feature.label}</span>
            </button>
          ))}
        </div>
        {state.ui.errors.features && (
          <p className="text-red-500 text-sm mt-2">{state.ui.errors.features}</p>
        )}
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-4">
          Notification Preferences
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { id: 'email', label: 'Email Notifications', icon: Bell },
            { id: 'push', label: 'Push Notifications', icon: Smartphone },
            { id: 'dashboard', label: 'Dashboard Alerts', icon: Eye }
          ].map(notif => (
            <button
              key={notif.id}
              onClick={() => handleArrayToggle('preferences', 'notifications', notif.id)}
              className={`p-4 rounded-lg border-2 text-left transition-all flex items-center space-x-3 ${
                state.data.preferences?.notifications?.includes(notif.id)
                  ? 'border-green-500 bg-green-50 text-green-700'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <notif.icon className="h-5 w-5" />
              <span>{notif.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const progress = ((state.currentStep + 1) / steps.length) * 100;
  const currentStepData = steps[state.currentStep];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Step {state.currentStep + 1} of {steps.length}
            </span>
            <span className="text-sm font-medium text-gray-700">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <motion.div
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Step Header */}
        <div className="text-center mb-8">
          <motion.div
            key={state.currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className={`w-20 h-20 bg-gradient-to-r ${
              currentStepData.color === 'blue' ? 'from-blue-500 to-blue-600' :
              currentStepData.color === 'green' ? 'from-green-500 to-green-600' :
              currentStepData.color === 'purple' ? 'from-purple-500 to-purple-600' :
              currentStepData.color === 'orange' ? 'from-orange-500 to-orange-600' :
              'from-pink-500 to-pink-600'
            } rounded-full flex items-center justify-center mx-auto`}>
              {React.createElement(currentStepData.icon, { className: "h-10 w-10 text-white" })}
            </div>
            <h1 className="text-4xl font-bold text-gray-900">{currentStepData.title}</h1>
            <p className="text-xl text-gray-600">{currentStepData.subtitle}</p>
            <p className="text-gray-500 max-w-2xl mx-auto">{currentStepData.description}</p>
          </motion.div>
        </div>

        {/* Step Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={state.currentStep}
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
          <button
            onClick={actions.prevStep}
            disabled={state.currentStep === 0}
            className="flex items-center space-x-2 px-6 py-3 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Previous</span>
          </button>

          <div className="flex space-x-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full ${
                  index <= state.currentStep ? 'bg-blue-500' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            disabled={state.ui.isLoading || isSubmitting}
            className="enterprise-button-primary flex items-center space-x-2 px-6 py-3 disabled:opacity-50"
          >
            {state.ui.isLoading || isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Processing...</span>
              </>
            ) : (
              <>
                <span>{state.currentStep === steps.length - 1 ? 'Complete Setup' : 'Next'}</span>
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EnhancedOnboarding;
