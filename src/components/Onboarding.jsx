import React, { useState, useEffect } from 'react';
import { 
  Target, 
  TrendingUp, 
  Users, 
  BookOpen, 
  Lightbulb, 
  CheckCircle, 
  ArrowRight,
  Play,
  Pause,
  RotateCcw,
  Calendar,
  Award,
  Zap,
  Heart,
  Shield,
  Rocket,
  Globe,
  DollarSign,
  Building,
  UserCheck,
  FileText,
  Video,
  ExternalLink,
  Star,
  Clock,
  CheckSquare,
  Square
} from 'lucide-react';

const Onboarding = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [startupData, setStartupData] = useState({
    name: '',
    industry: '',
    stage: '',
    teamSize: '',
    fundingStage: '',
    targetMarket: '',
    problem: '',
    solution: '',
    okrs: [],
    goals: []
  });

  const steps = [
    {
      id: 'welcome',
      title: 'Welcome to StartupOS',
      subtitle: 'Let\'s set up your startup for success',
      description: 'We\'ll help you create a personalized roadmap to reduce failure rates and accelerate growth.',
      icon: Rocket
    },
    {
      id: 'startup-info',
      title: 'Tell us about your startup',
      subtitle: 'Basic information to personalize your experience',
      description: 'This helps us tailor resources and recommendations specifically for your startup.',
      icon: Building
    },
    {
      id: 'problem-solution',
      title: 'Problem & Solution',
      subtitle: 'Define your core value proposition',
      description: 'Clearly articulating your problem and solution is crucial for success.',
      icon: Lightbulb
    },
    {
      id: 'okrs',
      title: 'Set Your OKRs',
      subtitle: 'Define your Objectives and Key Results',
      description: 'OKRs help you stay focused and measure progress effectively.',
      icon: Target
    },
    {
      id: 'goals',
      title: 'Your Goals',
      subtitle: 'What do you want to achieve?',
      description: 'Set clear, measurable goals for your startup journey.',
      icon: TrendingUp
    },
    {
      id: 'roadmap',
      title: 'Your Personalized Roadmap',
      subtitle: 'Your journey to success',
      description: 'Based on your inputs, we\'ve created a personalized roadmap.',
      icon: Award
    }
  ];

  const industries = [
    'SaaS', 'E-commerce', 'Fintech', 'Healthtech', 'Edtech', 
    'AI/ML', 'Marketplace', 'B2B', 'Consumer', 'Other'
  ];

  const stages = [
    'Idea Stage', 'MVP Development', 'Early Traction', 
    'Product-Market Fit', 'Scaling', 'Growth'
  ];

  const fundingStages = [
    'Bootstrapped', 'Friends & Family', 'Angel Investment', 
    'Seed Round', 'Series A', 'Series B+'
  ];

  const teamSizes = [
    '1-5', '6-10', '11-25', '26-50', '51-100', '100+'
  ];

  const handleInputChange = (field, value) => {
    setStartupData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleOKRAdd = () => {
    setStartupData(prev => ({
      ...prev,
      okrs: [...prev.okrs, { objective: '', keyResults: [''] }]
    }));
  };

  const handleOKRChange = (index, field, value) => {
    setStartupData(prev => ({
      ...prev,
      okrs: prev.okrs.map((okr, i) => 
        i === index ? { ...okr, [field]: value } : okr
      )
    }));
  };

  const handleKeyResultChange = (okrIndex, krIndex, value) => {
    setStartupData(prev => ({
      ...prev,
      okrs: prev.okrs.map((okr, i) => 
        i === okrIndex ? {
          ...okr,
          keyResults: okr.keyResults.map((kr, j) => 
            j === krIndex ? value : kr
          )
        } : okr
      )
    }));
  };

  const handleGoalAdd = () => {
    setStartupData(prev => ({
      ...prev,
      goals: [...prev.goals, { title: '', timeline: '', priority: 'medium' }]
    }));
  };

  const handleGoalChange = (index, field, value) => {
    setStartupData(prev => ({
      ...prev,
      goals: prev.goals.map((goal, i) => 
        i === index ? { ...goal, [field]: value } : goal
      )
    }));
  };

  const generateRoadmap = () => {
    // Generate personalized roadmap based on startup data
    const roadmap = {
      currentPhase: startupData.stage === 'Idea Stage' ? 'ideation' : 
                   startupData.stage === 'MVP Development' ? 'mvp' : 'growth',
      recommendations: [
        {
          title: 'Complete Market Research',
          description: 'Based on your stage, focus on understanding your market',
          priority: 'high',
          timeline: '2-3 weeks'
        },
        {
          title: 'Validate Your Solution',
          description: 'Test your solution with potential customers',
          priority: 'high',
          timeline: '1-2 weeks'
        },
        {
          title: 'Build MVP',
          description: 'Create a minimum viable product',
          priority: 'medium',
          timeline: '4-6 weeks'
        }
      ],
      milestones: [
        {
          title: 'Market Validation',
          description: 'Interview 50 potential customers',
          status: 'in-progress',
          points: 100
        },
        {
          title: 'MVP Development',
          description: 'Build core features',
          status: 'locked',
          points: 200
        },
        {
          title: 'First Customers',
          description: 'Get 10 paying customers',
          status: 'locked',
          points: 300
        }
      ]
    };
    return roadmap;
  };

  const renderStep = () => {
    const step = steps[currentStep];
    const StepIcon = step.icon;

    switch (step.id) {
      case 'welcome':
        return (
          <div className="text-center space-y-6">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto">
              <StepIcon className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">{step.title}</h2>
            <p className="text-xl text-gray-600">{step.subtitle}</p>
            <p className="text-gray-500 max-w-2xl mx-auto">{step.description}</p>
            <div className="flex justify-center space-x-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">90%</div>
                <div className="text-sm text-gray-500">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">50%</div>
                <div className="text-sm text-gray-500">Faster Growth</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">24/7</div>
                <div className="text-sm text-gray-500">Support</div>
              </div>
            </div>
          </div>
        );

      case 'startup-info':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900">{step.title}</h2>
              <p className="text-gray-600">{step.subtitle}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Startup Name</label>
                <input
                  type="text"
                  value={startupData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your startup name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
                <select
                  value={startupData.industry}
                  onChange={(e) => handleInputChange('industry', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select industry</option>
                  {industries.map(industry => (
                    <option key={industry} value={industry}>{industry}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Current Stage</label>
                <select
                  value={startupData.stage}
                  onChange={(e) => handleInputChange('stage', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select stage</option>
                  {stages.map(stage => (
                    <option key={stage} value={stage}>{stage}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Team Size</label>
                <select
                  value={startupData.teamSize}
                  onChange={(e) => handleInputChange('teamSize', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select team size</option>
                  {teamSizes.map(size => (
                    <option key={size} value={size}>{size}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Funding Stage</label>
                <select
                  value={startupData.fundingStage}
                  onChange={(e) => handleInputChange('fundingStage', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select funding stage</option>
                  {fundingStages.map(stage => (
                    <option key={stage} value={stage}>{stage}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Target Market</label>
                <input
                  type="text"
                  value={startupData.targetMarket}
                  onChange={(e) => handleInputChange('targetMarket', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Small businesses in US"
                />
              </div>
            </div>
          </div>
        );

      case 'problem-solution':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900">{step.title}</h2>
              <p className="text-gray-600">{step.subtitle}</p>
            </div>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">What problem are you solving?</label>
                <textarea
                  value={startupData.problem}
                  onChange={(e) => handleInputChange('problem', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={4}
                  placeholder="Describe the problem your startup is solving..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">What's your solution?</label>
                <textarea
                  value={startupData.solution}
                  onChange={(e) => handleInputChange('solution', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={4}
                  placeholder="Describe your solution and how it addresses the problem..."
                />
              </div>
            </div>
          </div>
        );

      case 'okrs':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900">{step.title}</h2>
              <p className="text-gray-600">{step.subtitle}</p>
            </div>
            <div className="space-y-4">
              {startupData.okrs.map((okr, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Objective {index + 1}
                    </label>
                    <input
                      type="text"
                      value={okr.objective}
                      onChange={(e) => handleOKRChange(index, 'objective', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., Achieve product-market fit"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Key Results</label>
                    {okr.keyResults.map((kr, krIndex) => (
                      <div key={krIndex} className="flex items-center space-x-2 mb-2">
                        <CheckSquare className="w-4 h-4 text-blue-600" />
                        <input
                          type="text"
                          value={kr}
                          onChange={(e) => handleKeyResultChange(index, krIndex, e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="e.g., Interview 50 customers"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              <button
                onClick={handleOKRAdd}
                className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-600 transition-colors"
              >
                + Add Another OKR
              </button>
            </div>
          </div>
        );

      case 'goals':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900">{step.title}</h2>
              <p className="text-gray-600">{step.subtitle}</p>
            </div>
            <div className="space-y-4">
              {startupData.goals.map((goal, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Goal</label>
                      <input
                        type="text"
                        value={goal.title}
                        onChange={(e) => handleGoalChange(index, 'title', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="e.g., Launch MVP"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Timeline</label>
                      <input
                        type="text"
                        value={goal.timeline}
                        onChange={(e) => handleGoalChange(index, 'timeline', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="e.g., 3 months"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                      <select
                        value={goal.priority}
                        onChange={(e) => handleGoalChange(index, 'priority', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
              <button
                onClick={handleGoalAdd}
                className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-600 transition-colors"
              >
                + Add Another Goal
              </button>
            </div>
          </div>
        );

      case 'roadmap':
        const roadmap = generateRoadmap();
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900">{step.title}</h2>
              <p className="text-gray-600">{step.subtitle}</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Your Recommendations</h3>
                {roadmap.recommendations.map((rec, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{rec.title}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        rec.priority === 'high' ? 'bg-red-100 text-red-800' :
                        rec.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {rec.priority}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{rec.description}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>⏱️ {rec.timeline}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Your Milestones</h3>
                {roadmap.milestones.map((milestone, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{milestone.title}</h4>
                      <div className="text-lg font-bold text-purple-600">{milestone.points}</div>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{milestone.description}</p>
                    <div className="flex items-center space-x-2">
                      {milestone.status === 'completed' ? (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      ) : milestone.status === 'in-progress' ? (
                        <Clock className="w-4 h-4 text-blue-500" />
                      ) : (
                        <Square className="w-4 h-4 text-gray-400" />
                      )}
                      <span className="text-xs text-gray-500 capitalize">{milestone.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const canProceed = () => {
    switch (steps[currentStep].id) {
      case 'startup-info':
        return startupData.name && startupData.industry && startupData.stage;
      case 'problem-solution':
        return startupData.problem && startupData.solution;
      case 'okrs':
        return startupData.okrs.length > 0 && startupData.okrs.every(okr => okr.objective && okr.keyResults.some(kr => kr));
      case 'goals':
        return startupData.goals.length > 0 && startupData.goals.every(goal => goal.title && goal.timeline);
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(startupData);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl p-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  index <= currentStep 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {index + 1}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-1 mx-2 ${
                    index < currentStep ? 'bg-blue-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="mb-8">
          {renderStep()}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={handleBack}
            disabled={currentStep === 0}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              currentStep === 0
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Back
          </button>
          
          <button
            onClick={handleNext}
            disabled={!canProceed()}
            className={`px-8 py-3 rounded-lg font-medium transition-colors ${
              canProceed()
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {currentStep === steps.length - 1 ? 'Complete Setup' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding; 