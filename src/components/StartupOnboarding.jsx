import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, 
  Users, 
  Target, 
  CheckCircle, 
  ArrowRight, 
  ArrowLeft, 
  Upload, 
  Globe, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  DollarSign,
  Award,
  TrendingUp,
  FileText,
  Settings,
  Zap,
  Star,
  Rocket,
  Shield,
  Lightbulb,
  Heart,
  Briefcase,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react';

const StartupOnboarding = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    // Company Information
    companyName: '',
    tagline: '',
    industry: '',
    stage: '',
    founded: '',
    website: '',
    email: '',
    phone: '',
    address: '',
    description: '',
    mission: '',
    vision: '',
    values: [],
    
    // Team Information
    teamSize: '',
    founders: [],
    keyMembers: [],
    
    // Business Information
    businessModel: '',
    targetMarket: '',
    revenue: '',
    funding: '',
    investors: [],
    
    // Goals and Preferences
    goals: [],
    priorities: [],
    preferences: {}
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const steps = [
    {
      id: 'welcome',
      title: 'Welcome to StartupOS',
      subtitle: 'Let\'s get your startup set up in just a few minutes',
      icon: Rocket,
      color: 'blue'
    },
    {
      id: 'company',
      title: 'Company Information',
      subtitle: 'Tell us about your startup',
      icon: Building2,
      color: 'green'
    },
    {
      id: 'team',
      title: 'Team Setup',
      subtitle: 'Add your founding team and key members',
      icon: Users,
      color: 'purple'
    },
    {
      id: 'business',
      title: 'Business Details',
      subtitle: 'Share your business model and market focus',
      icon: Target,
      color: 'orange'
    },
    {
      id: 'goals',
      title: 'Goals & Priorities',
      subtitle: 'What do you want to achieve?',
      icon: Star,
      color: 'pink'
    },
    {
      id: 'preferences',
      title: 'Preferences',
      subtitle: 'Customize your experience',
      icon: Settings,
      color: 'indigo'
    },
    {
      id: 'complete',
      title: 'All Set!',
      subtitle: 'Your startup is ready to go',
      icon: CheckCircle,
      color: 'green'
    }
  ];

  const industries = [
    'SaaS', 'E-commerce', 'FinTech', 'HealthTech', 'EdTech', 'AI/ML', 
    'Blockchain', 'CleanTech', 'PropTech', 'FoodTech', 'Other'
  ];

  const stages = [
    'Idea Stage', 'MVP', 'Early Stage', 'Growth Stage', 'Scale Stage', 'Mature'
  ];

  const businessModels = [
    'Subscription', 'Marketplace', 'Freemium', 'Transaction-based', 
    'Advertising', 'Licensing', 'Consulting', 'Other'
  ];

  const goals = [
    'Raise Funding', 'Grow User Base', 'Increase Revenue', 'Build Team', 
    'Launch Product', 'Expand Market', 'Improve Operations', 'Exit Strategy'
  ];

  const priorities = [
    'Product Development', 'Sales & Marketing', 'Operations', 'Finance', 
    'HR & Talent', 'Technology', 'Customer Success', 'Partnerships'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleArrayChange = (field, value, action) => {
    setFormData(prev => ({
      ...prev,
      [field]: action === 'add' 
        ? [...prev[field], value]
        : prev[field].filter(item => item !== value)
    }));
  };

  const validateStep = (stepId) => {
    const newErrors = {};
    
    switch (stepId) {
      case 'company':
        if (!formData.companyName) newErrors.companyName = 'Company name is required';
        if (!formData.industry) newErrors.industry = 'Industry is required';
        if (!formData.stage) newErrors.stage = 'Stage is required';
        if (!formData.description) newErrors.description = 'Description is required';
        break;
      case 'team':
        if (!formData.teamSize) newErrors.teamSize = 'Team size is required';
        if (formData.founders.length === 0) newErrors.founders = 'At least one founder is required';
        break;
      case 'business':
        if (!formData.businessModel) newErrors.businessModel = 'Business model is required';
        if (!formData.targetMarket) newErrors.targetMarket = 'Target market is required';
        break;
      case 'goals':
        if (formData.goals.length === 0) newErrors.goals = 'Please select at least one goal';
        if (formData.priorities.length === 0) newErrors.priorities = 'Please select at least one priority';
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

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleComplete = async () => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsLoading(false);
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
          The complete operating system for modern startups. Let's get you set up with everything you need to succeed.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <div className="enterprise-card p-6 text-center">
          <Zap className="h-8 w-8 text-blue-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Quick Setup</h3>
          <p className="text-gray-600">Get started in minutes with our guided onboarding</p>
        </div>
        
        <div className="enterprise-card p-6 text-center">
          <Shield className="h-8 w-8 text-green-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Secure & Private</h3>
          <p className="text-gray-600">Your data is protected with enterprise-grade security</p>
        </div>
        
        <div className="enterprise-card p-6 text-center">
          <Lightbulb className="h-8 w-8 text-purple-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">AI-Powered</h3>
          <p className="text-gray-600">Leverage AI to accelerate your startup's growth</p>
        </div>
      </div>
    </div>
  );

  const renderCompanyInfo = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Company Information</h2>
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
            Tagline
          </label>
          <input
            type="text"
            value={formData.tagline}
            onChange={(e) => handleInputChange('tagline', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="What does your company do?"
          />
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
            Founded Year
          </label>
          <input
            type="number"
            value={formData.founded}
            onChange={(e) => handleInputChange('founded', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="2024"
            min="1900"
            max="2024"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Website
          </label>
          <input
            type="url"
            value={formData.website}
            onChange={(e) => handleInputChange('website', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="https://yourcompany.com"
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Company Description *
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          rows={4}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            errors.description ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Describe what your company does, your mission, and what makes you unique..."
        />
        {errors.description && (
          <p className="text-red-500 text-sm mt-1">{errors.description}</p>
        )}
      </div>
    </div>
  );

  const renderTeamSetup = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Team Setup</h2>
        <p className="text-gray-600">Add your founding team and key members</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            <option value="1-5">1-5 people</option>
            <option value="6-10">6-10 people</option>
            <option value="11-25">11-25 people</option>
            <option value="26-50">26-50 people</option>
            <option value="50+">50+ people</option>
          </select>
          {errors.teamSize && (
            <p className="text-red-500 text-sm mt-1">{errors.teamSize}</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Number of Founders
          </label>
          <select
            value={formData.founders.length}
            onChange={(e) => {
              const count = parseInt(e.target.value);
              const newFounders = Array(count).fill('').map((_, i) => 
                formData.founders[i] || { name: '', role: '', email: '' }
              );
              handleInputChange('founders', newFounders);
            }}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="0">Select number of founders</option>
            <option value="1">1 founder</option>
            <option value="2">2 founders</option>
            <option value="3">3 founders</option>
            <option value="4">4+ founders</option>
          </select>
        </div>
      </div>
      
      {formData.founders.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Founders</h3>
          {formData.founders.map((founder, index) => (
            <div key={index} className="enterprise-card p-4">
              <h4 className="font-medium text-gray-900 mb-4">Founder {index + 1}</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={founder.name || ''}
                  onChange={(e) => {
                    const newFounders = [...formData.founders];
                    newFounders[index] = { ...newFounders[index], name: e.target.value };
                    handleInputChange('founders', newFounders);
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="text"
                  placeholder="Role (CEO, CTO, etc.)"
                  value={founder.role || ''}
                  onChange={(e) => {
                    const newFounders = [...formData.founders];
                    newFounders[index] = { ...newFounders[index], role: e.target.value };
                    handleInputChange('founders', newFounders);
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={founder.email || ''}
                  onChange={(e) => {
                    const newFounders = [...formData.founders];
                    newFounders[index] = { ...newFounders[index], email: e.target.value };
                    handleInputChange('founders', newFounders);
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderBusinessDetails = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Business Details</h2>
        <p className="text-gray-600">Share your business model and market focus</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Business Model *
          </label>
          <select
            value={formData.businessModel}
            onChange={(e) => handleInputChange('businessModel', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.businessModel ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Select business model</option>
            {businessModels.map(model => (
              <option key={model} value={model}>{model}</option>
            ))}
          </select>
          {errors.businessModel && (
            <p className="text-red-500 text-sm mt-1">{errors.businessModel}</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Target Market *
          </label>
          <input
            type="text"
            value={formData.targetMarket}
            onChange={(e) => handleInputChange('targetMarket', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.targetMarket ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Who are your customers?"
          />
          {errors.targetMarket && (
            <p className="text-red-500 text-sm mt-1">{errors.targetMarket}</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Annual Revenue
          </label>
          <select
            value={formData.revenue}
            onChange={(e) => handleInputChange('revenue', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select revenue range</option>
            <option value="0-10k">$0 - $10K</option>
            <option value="10k-50k">$10K - $50K</option>
            <option value="50k-100k">$50K - $100K</option>
            <option value="100k-500k">$100K - $500K</option>
            <option value="500k-1m">$500K - $1M</option>
            <option value="1m+">$1M+</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Funding Raised
          </label>
          <select
            value={formData.funding}
            onChange={(e) => handleInputChange('funding', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select funding stage</option>
            <option value="bootstrap">Bootstrap</option>
            <option value="pre-seed">Pre-seed</option>
            <option value="seed">Seed</option>
            <option value="series-a">Series A</option>
            <option value="series-b">Series B</option>
            <option value="series-c+">Series C+</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderGoals = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Goals & Priorities</h2>
        <p className="text-gray-600">What do you want to achieve with StartupOS?</p>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-4">
          Select Your Goals *
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {goals.map(goal => (
            <button
              key={goal}
              onClick={() => handleArrayChange('goals', goal, 
                formData.goals.includes(goal) ? 'remove' : 'add'
              )}
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
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-4">
          Select Your Priorities *
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {priorities.map(priority => (
            <button
              key={priority}
              onClick={() => handleArrayChange('priorities', priority, 
                formData.priorities.includes(priority) ? 'remove' : 'add'
              )}
              className={`p-4 rounded-lg border-2 text-center transition-all ${
                formData.priorities.includes(priority)
                  ? 'border-purple-500 bg-purple-50 text-purple-700'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              {priority}
            </button>
          ))}
        </div>
        {errors.priorities && (
          <p className="text-red-500 text-sm mt-2">{errors.priorities}</p>
        )}
      </div>
    </div>
  );

  const renderPreferences = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Preferences</h2>
        <p className="text-gray-600">Customize your StartupOS experience</p>
      </div>
      
      <div className="space-y-6">
        <div className="enterprise-card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Preferences</h3>
          <div className="space-y-3">
            <label className="flex items-center">
              <input type="checkbox" className="mr-3" defaultChecked />
              <span>Email notifications for important updates</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-3" defaultChecked />
              <span>Weekly progress reports</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-3" />
              <span>Marketing and promotional emails</span>
            </label>
          </div>
        </div>
        
        <div className="enterprise-card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Dashboard Layout</h3>
          <div className="space-y-3">
            <label className="flex items-center">
              <input type="radio" name="layout" value="compact" className="mr-3" defaultChecked />
              <span>Compact view</span>
            </label>
            <label className="flex items-center">
              <input type="radio" name="layout" value="detailed" className="mr-3" />
              <span>Detailed view</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderComplete = () => (
    <div className="text-center space-y-8">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="w-24 h-24 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto"
      >
        <CheckCircle className="h-12 w-12 text-white" />
      </motion.div>
      
      <div className="space-y-4">
        <h2 className="text-4xl font-bold text-gray-900">Welcome to StartupOS!</h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Your startup is now set up and ready to go. You can start exploring all the features and tools available to help you succeed.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <div className="enterprise-card p-6 text-center">
          <Briefcase className="h-8 w-8 text-blue-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Start Building</h3>
          <p className="text-gray-600">Access your dashboard and start using our tools</p>
        </div>
        
        <div className="enterprise-card p-6 text-center">
          <Users className="h-8 w-8 text-green-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Invite Team</h3>
          <p className="text-gray-600">Add your team members to collaborate</p>
        </div>
        
        <div className="enterprise-card p-6 text-center">
          <BarChart3 className="h-8 w-8 text-purple-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Track Progress</h3>
          <p className="text-gray-600">Monitor your startup's growth and metrics</p>
        </div>
      </div>
    </div>
  );

  const renderStepContent = () => {
    switch (steps[currentStep].id) {
      case 'welcome': return renderWelcome();
      case 'company': return renderCompanyInfo();
      case 'team': return renderTeamSetup();
      case 'business': return renderBusinessDetails();
      case 'goals': return renderGoals();
      case 'preferences': return renderPreferences();
      case 'complete': return renderComplete();
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
              steps[currentStep].color === 'purple' ? 'from-purple-500 to-purple-600' :
              steps[currentStep].color === 'orange' ? 'from-orange-500 to-orange-600' :
              steps[currentStep].color === 'pink' ? 'from-pink-500 to-pink-600' :
              'from-indigo-500 to-indigo-600'
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
          <button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${
              currentStep === 0
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Previous</span>
          </button>

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
            disabled={isLoading}
            className="enterprise-button-primary flex items-center space-x-2 px-6 py-3"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Setting up...</span>
              </>
            ) : (
              <>
                <span>{currentStep === steps.length - 1 ? 'Complete' : 'Next'}</span>
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default StartupOnboarding;
