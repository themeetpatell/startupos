import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, ArrowLeft, CheckCircle, TrendingUp, Rocket, Wrench,
  User, Building2, DollarSign, Globe, Linkedin, Target, Zap
} from 'lucide-react';
import { useOnboarding, validateStep } from '../contexts/OnboardingContext';
import { useAuth } from '../contexts/AuthContext';

const RoleBasedOnboarding = ({ onComplete }) => {
  const { state, actions } = useOnboarding();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Step configurations
  const steps = [
    {
      id: 'identify',
      title: 'Identify',
      subtitle: 'Tell us who you are',
      icon: User,
      color: 'blue'
    },
    {
      id: 'craft',
      title: 'Craft',
      subtitle: 'Build your profile',
      icon: Target,
      color: 'green'
    },
    {
      id: 'activate',
      title: 'Activate',
      subtitle: 'Launch your journey',
      icon: Zap,
      color: 'purple'
    }
  ];

  // Role configurations
  const roles = [
    {
      id: 'founder',
      title: "I'm a Founder",
      icon: Rocket,
      color: 'blue'
    },
    {
      id: 'investor',
      title: "I'm an Investor",
      icon: TrendingUp,
      color: 'green'
    },
    {
      id: 'builder',
      title: "I'm a Builder",
      icon: Wrench,
      color: 'purple'
    }
  ];

  // Stage options by role
  const stageOptions = {
    founder: [
      { id: 'idea', label: 'Idea', description: 'Just getting started' },
      { id: 'mvp', label: 'MVP', description: 'Building the product' },
      { id: 'pre-seed', label: 'Pre-Seed', description: 'Early validation' },
      { id: 'seed', label: 'Seed', description: 'Proven traction' },
      { id: 'series-a', label: 'Series A+', description: 'Scaling up' }
    ],
    investor: [
      { id: 'exploring', label: 'Exploring', description: 'Learning the space' },
      { id: 'active', label: 'Active', description: 'Making investments' },
      { id: 'leading', label: 'Leading Rounds', description: 'Leading deals' }
    ],
    builder: [
      { id: 'student', label: 'Student', description: 'Learning and growing' },
      { id: 'early-career', label: 'Early Career', description: '0-3 years experience' },
      { id: 'experienced', label: 'Experienced', description: '3-10 years experience' },
      { id: 'cxo', label: 'CXO Level', description: 'Executive leadership' }
    ]
  };

  // Countries list (top 20 for now)
  const countries = [
    'United States', 'United Kingdom', 'Canada', 'Germany', 'France',
    'Australia', 'Netherlands', 'Sweden', 'Singapore', 'Israel',
    'India', 'China', 'Japan', 'South Korea', 'Brazil',
    'Mexico', 'Spain', 'Italy', 'Switzerland', 'Other'
  ];

  // Industries list
  const industries = [
    'SaaS', 'E-commerce', 'FinTech', 'HealthTech', 'EdTech', 'AI/ML',
    'Blockchain', 'Cybersecurity', 'Gaming', 'Media & Entertainment',
    'Real Estate', 'Transportation', 'Food & Beverage', 'Fashion',
    'Travel & Tourism', 'Energy', 'Agriculture', 'Manufacturing',
    'Retail', 'Professional Services', 'Other'
  ];

  // Domain-specific skills for builders
  const domainSkills = {
    tech: [
      'React', 'Python', 'Node.js', 'JavaScript', 'TypeScript', 'Go',
      'Rust', 'Swift', 'Kotlin', 'Flutter', 'React Native', 'Vue.js',
      'Angular', 'Django', 'Flask', 'Express', 'Laravel', 'Rails',
      'PostgreSQL', 'MongoDB', 'Redis', 'AWS', 'Docker', 'Kubernetes',
      'DevOps', 'Security', 'Mobile Development', 'Web Development',
      'Backend Development', 'Frontend Development', 'Full Stack',
      'Cloud Architecture', 'Database Design', 'API Development'
    ],
    finance: [
      'Financial Modeling', 'FP&A', 'Accounting', 'Budgeting', 'Forecasting',
      'Risk Management', 'Investment Analysis', 'Valuation', 'Excel Advanced',
      'SQL', 'Power BI', 'Tableau', 'Python', 'R', 'SAP', 'QuickBooks',
      'Tax Planning', 'Audit', 'Compliance', 'Treasury Management',
      'Corporate Finance', 'M&A', 'Due Diligence', 'Financial Reporting'
    ],
    marketing: [
      'Digital Marketing', 'SEO', 'SEM', 'Social Media Marketing', 'Content Marketing',
      'Email Marketing', 'PPC', 'Google Analytics', 'Facebook Ads', 'Instagram Marketing',
      'LinkedIn Marketing', 'Marketing Automation', 'HubSpot', 'Salesforce',
      'Brand Strategy', 'Market Research', 'Customer Acquisition', 'Growth Hacking',
      'Conversion Optimization', 'A/B Testing', 'Marketing Analytics', 'CRM'
    ],
    ops: [
      'Project Management', 'Agile', 'Scrum', 'Process Improvement', 'Supply Chain',
      'Operations Management', 'Quality Assurance', 'Six Sigma', 'Lean Manufacturing',
      'Vendor Management', 'Contract Management', 'Risk Management', 'Compliance',
      'Data Analysis', 'Excel', 'Power BI', 'Process Mapping', 'Workflow Design',
      'Change Management', 'Team Leadership', 'Strategic Planning', 'KPI Management'
    ],
    design: [
      'UI/UX Design', 'Figma', 'Sketch', 'Adobe XD', 'Photoshop', 'Illustrator',
      'InDesign', 'Prototyping', 'User Research', 'Wireframing', 'Visual Design',
      'Interaction Design', 'Design Systems', 'Brand Design', 'Logo Design',
      'Print Design', 'Web Design', 'Mobile Design', 'Motion Graphics',
      'After Effects', 'Principle', 'Framer', 'Design Thinking', 'Usability Testing'
    ]
  };

  // Initialize with user data from signup
  useEffect(() => {
    if (user) {
      actions.updateData('profile', {
        name: user.name || '',
        email: user.email || '',
        role: user.role || ''
      });
    }
  }, [user, actions]);

  // Debug state changes
  useEffect(() => {
    console.log('State changed:', state);
  }, [state]);

  const handleInputChange = (field, value) => {
    console.log('handleInputChange called with:', field, value);
    console.log('Current state before update:', state.data);
    
    // Handle role separately as it's stored in data.role, not data.profile.role
    if (field === 'role') {
      actions.updateData('role', value);
    } else {
      // Clear skills when domain changes to avoid irrelevant selections
      if (field === 'domain') {
        actions.updateData('profile', { 
          [field]: value, 
          skills: [] // Clear skills when domain changes
        });
      } else {
    actions.updateData('profile', { [field]: value });
      }
    }
    if (state.ui.errors[field]) {
      actions.clearErrors();
    }
  };

  const handleArrayToggle = (field, value) => {
    const currentArray = state.data.profile?.[field] || [];
    const newArray = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value];
    handleInputChange(field, newArray);
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


  // Step 1: Identify
  const renderIdentifyStep = () => (
    <div className="space-y-8">
      {/* Role Selection */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Select your role</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {roles.map((role) => (
          <button
            key={role.id}
            onClick={() => {
              console.log('Role button clicked:', role.id);
              handleInputChange('role', role.id);
            }}
            className={`p-6 rounded-xl border-2 text-center transition-all hover:scale-105 ${
              state.data.role === role.id
                ? 'border-blue-500 bg-blue-50 shadow-lg'
                : 'border-gray-300 hover:border-gray-400 hover:shadow-md'
            }`}
          >
              <div className={`w-12 h-12 bg-gradient-to-r ${
                role.color === 'blue' ? 'from-blue-500 to-blue-600' :
                role.color === 'green' ? 'from-green-500 to-green-600' :
                'from-purple-500 to-purple-600'
              } rounded-full flex items-center justify-center mx-auto mb-3`}>
                <role.icon className="h-6 w-6 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900">{role.title}</h4>
            </button>
          ))}
        </div>
        {state.ui.errors.role && (
          <p className="text-red-500 text-sm mt-2">{state.ui.errors.role}</p>
        )}
              </div>
              
      {/* Stage Selection */}
      {state.data.role && (
        <div>
          <label className="block text-xl font-semibold text-gray-900 mb-4">
            Which stage are you currently in? *
          </label>
          <select
            value={state.data.profile?.stage || ''}
            onChange={(e) => handleInputChange('stage', e.target.value)}
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
            <option value="">Select your current stage</option>
            {stageOptions[state.data.role]?.map((stage) => (
              <option key={stage.id} value={stage.id}>
                {stage.label} - {stage.description}
              </option>
            ))}
          </select>
          {state.ui.errors.stage && (
            <p className="text-red-500 text-sm mt-2">{state.ui.errors.stage}</p>
          )}
        </div>
      )}

      {/* LinkedIn ID */}
      <div>
        <label className="block text-xl font-semibold text-gray-900 mb-4">
          LinkedIn ID
        </label>
        <div className="flex items-center space-x-3">
          <Linkedin className="h-6 w-6 text-blue-600" />
          <input
            type="text"
            value={state.data.profile?.linkedinId || ''}
            onChange={(e) => handleInputChange('linkedinId', e.target.value)}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="linkedin.com/in/yourprofile"
          />
              </div>
        <p className="text-sm text-gray-600 mt-2">
          We'll use this to autofill your name, photo, and network credibility
        </p>
        {state.ui.errors.linkedinId && (
          <p className="text-red-500 text-sm mt-1">{state.ui.errors.linkedinId}</p>
        )}
            </div>

      {/* Country */}
      <div>
        <label className="block text-xl font-semibold text-gray-900 mb-4">
          Country
        </label>
        <select
          value={state.data.profile?.country || ''}
          onChange={(e) => handleInputChange('country', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
            backgroundPosition: 'right 12px center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '16px'
          }}
        >
          <option value="">Select country</option>
          {countries.map(country => (
            <option key={country} value={country}>{country}</option>
          ))}
        </select>
        <p className="text-sm text-gray-600 mt-2">
          For localization and ecosystem relevance
        </p>
        {state.ui.errors.country && (
          <p className="text-red-500 text-sm mt-1">{state.ui.errors.country}</p>
        )}
      </div>
    </div>
  );

  // Step 2: Craft - Role-specific setup
  const renderCraftStep = () => {
    const role = state.data.role;
    
    if (role === 'founder') {
      return renderFounderCraft();
    } else if (role === 'investor') {
      return renderInvestorCraft();
    } else if (role === 'builder') {
      return renderBuilderCraft();
    }
    
    return <div>Please select a role first</div>;
  };

  const renderFounderCraft = () => (
      <div className="space-y-8">
        <div className="text-center mb-8">
        <Rocket className="h-12 w-12 text-blue-600 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-gray-900 mb-2">🧠 Founder Setup</h3>
        <p className="text-gray-600">Tell us about your startup</p>
        </div>
        
      {/* Startup Identity */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
          <label className="block text-lg font-semibold text-gray-900 mb-2">
            Startup Name *
            </label>
            <input
              type="text"
            value={state.data.profile?.startupName || ''}
            onChange={(e) => handleInputChange('startupName', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your startup name"
          />
          {state.ui.errors.startupName && (
            <p className="text-red-500 text-sm mt-1">{state.ui.errors.startupName}</p>
            )}
          </div>
          
          <div>
          <label className="block text-lg font-semibold text-gray-900 mb-2">
            Industry / Sector *
                </label>
                <select
                  value={state.data.profile?.industry || ''}
                  onChange={(e) => handleInputChange('industry', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
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
          <label className="block text-lg font-semibold text-gray-900 mb-2">
            Team Size
          </label>
          <select
            value={state.data.profile?.teamSize || ''}
            onChange={(e) => handleInputChange('teamSize', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
              backgroundPosition: 'right 12px center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: '16px'
            }}
          >
            <option value="">Select team size</option>
            <option value="1">Just me</option>
            <option value="2-5">2-5 people</option>
            <option value="6-10">6-10 people</option>
            <option value="11-25">11-25 people</option>
            <option value="26-50">26-50 people</option>
            <option value="50+">50+ people</option>
          </select>
        </div>

        <div>
          <label className="block text-lg font-semibold text-gray-900 mb-2">
            Founding Structure
          </label>
          <select
            value={state.data.profile?.foundingStructure || ''}
            onChange={(e) => handleInputChange('foundingStructure', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
              backgroundPosition: 'right 12px center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: '16px'
            }}
          >
            <option value="">Select structure</option>
            <option value="solo">Solo Founder</option>
            <option value="co-founders">Co-Founders</option>
            <option value="team-forming">Team Forming</option>
          </select>
        </div>
      </div>

      {/* Startup Description */}
              <div>
        <label className="block text-lg font-semibold text-gray-900 mb-2">
          What are you building? *
                </label>
        <textarea
          value={state.data.profile?.startupDescription || ''}
          onChange={(e) => handleInputChange('startupDescription', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="One-line mission or elevator summary"
          rows={3}
        />
        <p className="text-sm text-gray-600 mt-2">
          Describe your startup in one compelling sentence
        </p>
        {state.ui.errors.startupDescription && (
          <p className="text-red-500 text-sm mt-1">{state.ui.errors.startupDescription}</p>
        )}
      </div>
    </div>
  );

  const renderInvestorCraft = () => (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <TrendingUp className="h-12 w-12 text-green-600 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-gray-900 mb-2">💰 Investor Setup</h3>
        <p className="text-gray-600">Tell us about your investment focus</p>
      </div>

      {/* Investor Identity */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-lg font-semibold text-gray-900 mb-2">
            Investor Type *
          </label>
          <select
            value={state.data.profile?.investorType || ''}
            onChange={(e) => handleInputChange('investorType', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
              backgroundPosition: 'right 12px center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: '16px'
            }}
          >
            <option value="">Select type</option>
            <option value="angel">Angel Investor</option>
            <option value="vc">VC</option>
            <option value="family-office">Family Office</option>
            <option value="accelerator">Accelerator</option>
          </select>
          {state.ui.errors.investorType && (
            <p className="text-red-500 text-sm mt-1">{state.ui.errors.investorType}</p>
          )}
              </div>
              
              <div>
          <label className="block text-lg font-semibold text-gray-900 mb-2">
            Fund Size or Avg Check Size
                </label>
                <select
            value={state.data.profile?.fundSize || ''}
            onChange={(e) => handleInputChange('fundSize', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                    backgroundPosition: 'right 12px center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '16px'
                  }}
                >
            <option value="">Select range</option>
            <option value="10k-50k">$10K - $50K</option>
            <option value="50k-100k">$50K - $100K</option>
            <option value="100k-500k">$100K - $500K</option>
            <option value="500k-1m">$500K - $1M</option>
            <option value="1m-5m">$1M - $5M</option>
            <option value="5m+">$5M+</option>
                </select>
              </div>
      </div>

      {/* Investment Focus */}
      <div>
        <label className="block text-lg font-semibold text-gray-900 mb-4">
          Industries of Interest *
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {industries.map(industry => (
            <button
              key={industry}
              onClick={() => handleArrayToggle('investmentIndustries', industry)}
              className={`p-3 rounded-lg border-2 text-center transition-all ${
                state.data.profile?.investmentIndustries?.includes(industry)
                  ? 'border-green-500 bg-green-50 text-green-700'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              {industry}
            </button>
          ))}
        </div>
        {state.ui.errors.investmentIndustries && (
          <p className="text-red-500 text-sm mt-2">{state.ui.errors.investmentIndustries}</p>
        )}
      </div>

      {/* Engagement Intent */}
      <div>
        <label className="block text-lg font-semibold text-gray-900 mb-4">
          Engagement Intent *
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { id: 'invest', label: 'Invest', description: 'Make direct investments' },
            { id: 'mentor', label: 'Mentor', description: 'Provide guidance and advice' },
            { id: 'co-invest', label: 'Co-Invest', description: 'Partner on deals' },
            { id: 'partner', label: 'Partner with CXOs', description: 'Strategic partnerships' }
          ].map(intent => (
            <button
              key={intent.id}
              onClick={() => handleArrayToggle('engagementIntent', intent.id)}
              className={`p-4 rounded-lg border-2 text-left transition-all ${
                state.data.profile?.engagementIntent?.includes(intent.id)
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <div className="font-semibold text-gray-900">{intent.label}</div>
              <div className="text-sm text-gray-600">{intent.description}</div>
            </button>
          ))}
        </div>
        {state.ui.errors.engagementIntent && (
          <p className="text-red-500 text-sm mt-2">{state.ui.errors.engagementIntent}</p>
        )}
      </div>
    </div>
  );

  const renderBuilderCraft = () => (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <Wrench className="h-12 w-12 text-purple-600 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-gray-900 mb-2">⚡ Builder Setup</h3>
        <p className="text-gray-600">Tell us about your expertise</p>
      </div>

      {/* Profile Basics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-lg font-semibold text-gray-900 mb-2">
            Domain *
          </label>
          <select
            value={state.data.profile?.domain || ''}
            onChange={(e) => handleInputChange('domain', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
              backgroundPosition: 'right 12px center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: '16px'
            }}
          >
            <option value="">Select domain</option>
            <option value="tech">Tech</option>
            <option value="finance">Finance</option>
            <option value="marketing">Marketing</option>
            <option value="ops">Operations</option>
            <option value="design">Design</option>
          </select>
          {state.ui.errors.domain && (
            <p className="text-red-500 text-sm mt-1">{state.ui.errors.domain}</p>
          )}
        </div>

              <div>
          <label className="block text-lg font-semibold text-gray-900 mb-2">
            Experience Level *
                </label>
                <select
            value={state.data.profile?.experienceLevel || ''}
            onChange={(e) => handleInputChange('experienceLevel', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                    backgroundPosition: 'right 12px center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '16px'
                  }}
                >
            <option value="">Select level</option>
            <option value="junior">Junior (0-2 years)</option>
            <option value="mid">Mid-level (2-5 years)</option>
            <option value="senior">Senior (5-10 years)</option>
            <option value="lead">Lead (10+ years)</option>
                </select>
          {state.ui.errors.experienceLevel && (
            <p className="text-red-500 text-sm mt-1">{state.ui.errors.experienceLevel}</p>
          )}
              </div>
              
              <div>
          <label className="block text-lg font-semibold text-gray-900 mb-2">
            Availability *
                </label>
                <select
            value={state.data.profile?.availability || ''}
            onChange={(e) => handleInputChange('availability', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                    backgroundPosition: 'right 12px center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '16px'
                  }}
                >
            <option value="">Select availability</option>
            <option value="full-time">Full-time</option>
            <option value="fractional">Fractional</option>
            <option value="consulting">Consulting</option>
            <option value="freelance">Freelance</option>
                </select>
          {state.ui.errors.availability && (
            <p className="text-red-500 text-sm mt-1">{state.ui.errors.availability}</p>
          )}
        </div>
      </div>

      {/* Skills */}
      <div>
        <label className="block text-lg font-semibold text-gray-900 mb-4">
          Skills *
        </label>
        {state.data.profile?.domain ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {domainSkills[state.data.profile.domain]?.map(skill => (
              <button
                key={skill}
                onClick={() => handleArrayToggle('skills', skill)}
                className={`p-2 rounded-lg border text-center transition-all text-sm ${
                  state.data.profile?.skills?.includes(skill)
                    ? 'border-purple-500 bg-purple-50 text-purple-700'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                {skill}
              </button>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p className="text-lg mb-2">Please select a domain first</p>
            <p className="text-sm">Skills will appear based on your selected domain</p>
          </div>
        )}
        <p className="text-sm text-gray-600 mt-2">
          Select all that apply to your expertise
        </p>
        {state.ui.errors.skills && (
          <p className="text-red-500 text-sm mt-2">{state.ui.errors.skills}</p>
        )}
      </div>

      {/* Engagement Intent */}
      <div>
        <label className="block text-lg font-semibold text-gray-900 mb-4">
          Engagement Intent *
            </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { id: 'join-startup', label: 'Join a Startup', description: 'Full-time or part-time role' },
            { id: 'fractional', label: 'Offer Fractional Services', description: 'Part-time executive services' },
            { id: 'consult', label: 'Consult', description: 'Project-based consulting' },
            { id: 'mentor', label: 'Mentor', description: 'Guide other builders' }
          ].map(intent => (
                <button
              key={intent.id}
              onClick={() => handleArrayToggle('builderEngagementIntent', intent.id)}
              className={`p-4 rounded-lg border-2 text-left transition-all ${
                state.data.profile?.builderEngagementIntent?.includes(intent.id)
                  ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
              <div className="font-semibold text-gray-900">{intent.label}</div>
              <div className="text-sm text-gray-600">{intent.description}</div>
                </button>
              ))}
            </div>
        {state.ui.errors.builderEngagementIntent && (
          <p className="text-red-500 text-sm mt-2">{state.ui.errors.builderEngagementIntent}</p>
        )}
      </div>
    </div>
  );

  // Step 3: Activate
  const renderActivateStep = () => (
    <div className="relative bg-white rounded-[28px] shadow-[0_40px_80px_-12px_rgba(0,0,0,0.12)] border border-gray-100/60 w-[440px] h-[260px] mx-auto overflow-hidden">
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50/20 to-white opacity-70"></div>
      
      {/* Card Content */}
      <div className="relative p-10 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[14px] flex items-center justify-center shadow-sm">
              <Rocket className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900 tracking-[-0.02em]">StartupOS</h2>
              <p className="text-sm text-gray-500 font-medium">Operating System</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full shadow-sm"></div>
            <p className="text-sm text-gray-500 font-medium">Live</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex items-center justify-between">
          {/* Profile Section */}
          <div className="flex items-center space-x-5">
            <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center shadow-sm border border-gray-200/50">
              <span className="text-xl font-bold text-gray-700">
                {state.data.profile?.name?.charAt(0) || 'U'}
              </span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 tracking-[-0.02em] mb-1">
                {state.data.profile?.name || 'Your Name'}
              </h3>
              <p className="text-sm text-gray-600 font-medium mb-3 capitalize">{state.data.role}</p>
              
              {/* Role-specific info */}
              {state.data.role === 'founder' && state.data.profile?.startupName && (
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-gray-900">{state.data.profile.startupName}</p>
                  <p className="text-xs text-gray-500 font-medium">{state.data.profile?.industry}</p>
                </div>
              )}

              {state.data.role === 'investor' && state.data.profile?.investorType && (
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-gray-900 capitalize">{state.data.profile.investorType}</p>
                  <p className="text-xs text-gray-500 font-medium">{state.data.profile?.investmentIndustries?.slice(0, 1).join(', ')}</p>
                </div>
              )}

              {state.data.role === 'builder' && state.data.profile?.domain && (
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-gray-900 capitalize">{state.data.profile.domain}</p>
                  <p className="text-xs text-gray-500 font-medium">{state.data.profile?.skills?.slice(0, 2).join(', ')}</p>
                </div>
              )}
            </div>
          </div>

          {/* Country & Stage Section */}
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                <Globe className="h-4 w-4 text-gray-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Location</p>
                <p className="text-sm font-semibold text-gray-900">{state.data.profile?.country || 'Not specified'}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                <TrendingUp className="h-4 w-4 text-gray-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Stage</p>
                <p className="text-sm font-semibold text-gray-900 capitalize">{state.data.profile?.stage || 'Not specified'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-6 mt-6 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-400 font-medium">startupos.com</p>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
              <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            </div>
            </div>
          </div>
        </div>
      </div>
    );


  const renderStepContent = () => {
    switch (steps[state.currentStep].id) {
      case 'identify': return renderIdentifyStep();
      case 'craft': return renderCraftStep();
      case 'activate': return renderActivateStep();
      default: return renderIdentifyStep();
    }
  };

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
              'from-purple-500 to-purple-600'
            } rounded-full flex items-center justify-center mx-auto`}>
              {React.createElement(currentStepData.icon, { className: "h-10 w-10 text-white" })}
            </div>
            <h1 className="text-4xl font-bold text-gray-900">{currentStepData.title}</h1>
            <p className="text-xl text-gray-600">{currentStepData.subtitle}</p>
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
            className="enterprise-button-primary flex items-center space-x-2 px-8 py-4 rounded-full disabled:opacity-50"
            >
              {state.ui.isLoading || isSubmitting ? (
                <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                <span>{state.currentStep === steps.length - 1 ? 'Activate Account' : 'Next'}</span>
                <ArrowRight className="h-5 w-5" />
                </>
              )}
            </button>
        </div>
      </div>
    </div>
  );
};

export default RoleBasedOnboarding;
