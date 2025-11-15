import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Target, TrendingUp, Users, Heart, MessageCircle, CheckCircle,
  AlertTriangle, X, Plus, Play, Pause, Calendar, Clock, 
  Lightbulb, Brain, Zap, Activity, BarChart3, Eye, Star,
  ThumbsUp, ThumbsDown, ArrowRight, FileText, Video, Mic,
  Send, Download, Share, Edit, Trash2, Filter, Search,
  Award, Shield, Flame, TrendingDown, RefreshCw, ChevronRight
} from 'lucide-react';

const PMFValidation = () => {
  const [activeTab, setActiveTab] = useState('score');
  const [pmfScore, setPmfScore] = useState(68);
  const [signals, setSignals] = useState([]);
  const [showSignalModal, setShowSignalModal] = useState(false);
  const [showMetricModal, setShowMetricModal] = useState(false);
  const [showStepModal, setShowStepModal] = useState(false);
  const [showPollModal, setShowPollModal] = useState(false);
  const [showSurveyModal, setShowSurveyModal] = useState(false);
  const [showTranscriptModal, setShowTranscriptModal] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState(null);
  const [selectedStep, setSelectedStep] = useState(null);
  const [selectedInterview, setSelectedInterview] = useState(null);
  const [metrics, setMetrics] = useState([]);
  const [steps, setSteps] = useState([]);
  const [polls, setPolls] = useState([]);
  const [surveys, setSurveys] = useState([]);
  const [frameworks, setFrameworks] = useState([]);
  
  const [signalForm, setSignalForm] = useState({
    signal: '',
    category: 'retention',
    type: 'positive',
    strength: 'medium'
  });

  const [metricUpdateForm, setMetricUpdateForm] = useState({
    current: 0
  });

  const [pollForm, setPollForm] = useState({
    question: '',
    options: ['', ''],
    target: 'all_users'
  });

  const [surveyForm, setSurveyForm] = useState({
    title: '',
    framework: 'sean_ellis',
    target: 'active_users'
  });

  const [interviews, setInterviews] = useState([]);
  const [interviewForm, setInterviewForm] = useState({
    name: '',
    company: '',
    role: '',
    date: '',
    time: '',
    notes: ''
  });

  useEffect(() => {
    const mockPolls = [
      {
        id: 1,
        question: 'How disappointed would you be if you could no longer use our product?',
        options: [
          { id: 1, text: 'Very disappointed', votes: 42, percent: 58 },
          { id: 2, text: 'Somewhat disappointed', votes: 18, percent: 25 },
          { id: 3, text: 'Not disappointed', votes: 12, percent: 17 }
        ],
        totalResponses: 72,
        status: 'active',
        createdAt: '2025-01-15',
        target: 'active_users',
        framework: 'Sean Ellis Test'
      },
      {
        id: 2,
        question: 'What is the ONE thing we should improve?',
        options: [
          { id: 1, text: 'Better integrations', votes: 28, percent: 45 },
          { id: 2, text: 'Mobile app', votes: 22, percent: 35 },
          { id: 3, text: 'Pricing', votes: 12, percent: 20 }
        ],
        totalResponses: 62,
        status: 'completed',
        createdAt: '2025-01-10',
        target: 'all_users',
        framework: 'Custom'
      }
    ];
    setPolls(mockPolls);

    const mockSurveys = [
      {
        id: 1,
        title: 'Product-Market Fit Survey',
        framework: 'sean_ellis',
        questions: 3,
        responses: 89,
        status: 'active',
        createdAt: '2025-01-12',
        completionRate: 67,
        results: {
          mustHave: 58,
          someDisappointment: 25,
          noDisappointment: 17
        }
      },
      {
        id: 2,
        title: 'Net Promoter Score',
        framework: 'nps',
        questions: 2,
        responses: 124,
        status: 'completed',
        createdAt: '2025-01-05',
        completionRate: 78,
        results: {
          nps: 42,
          promoters: 56,
          passives: 30,
          detractors: 14
        }
      }
    ];
    setSurveys(mockSurveys);

    const mockFrameworks = [
      {
        id: 'sean_ellis',
        name: 'Sean Ellis Test',
        description: 'Measure must-have sentiment. 40%+ "very disappointed" indicates strong PMF',
        question: 'How would you feel if you could no longer use this product?',
        options: ['Very disappointed', 'Somewhat disappointed', 'Not disappointed'],
        benchmark: '40% very disappointed',
        difficulty: 'easy',
        timeToComplete: '2 min',
        icon: Target,
        color: 'blue'
      },
      {
        id: 'nps',
        name: 'Net Promoter Score',
        description: 'Measure customer loyalty and likelihood to recommend. 50+ is excellent',
        question: 'How likely are you to recommend us to a friend? (0-10)',
        benchmark: 'NPS > 50',
        difficulty: 'easy',
        timeToComplete: '1 min',
        icon: Heart,
        color: 'pink'
      },
      {
        id: 'retention_cohort',
        name: 'Retention Cohort',
        description: 'Track user retention over time. Strong PMF shows >40% retention at Month 3',
        benchmark: '40%+ at Month 3',
        difficulty: 'medium',
        timeToComplete: '5 min',
        icon: TrendingUp,
        color: 'green'
      },
      {
        id: 'engagement_depth',
        name: 'Engagement Depth',
        description: 'Measure how deeply users engage with your product features',
        benchmark: '3+ features used regularly',
        difficulty: 'medium',
        timeToComplete: '10 min',
        icon: Activity,
        color: 'purple'
      },
      {
        id: 'problem_validation',
        name: 'Problem Validation',
        description: 'Validate if you\'re solving a real, urgent problem',
        question: 'How urgent is solving this problem for you?',
        options: ['Critical - need solution now', 'Important - within 3 months', 'Nice to have'],
        benchmark: '60%+ critical',
        difficulty: 'easy',
        timeToComplete: '3 min',
        icon: AlertTriangle,
        color: 'orange'
      },
      {
        id: 'csat',
        name: 'Customer Satisfaction',
        description: 'Measure satisfaction with specific features or experiences',
        question: 'How satisfied are you with [feature]?',
        options: ['Very satisfied', 'Satisfied', 'Neutral', 'Dissatisfied', 'Very dissatisfied'],
        benchmark: '80%+ satisfied',
        difficulty: 'easy',
        timeToComplete: '2 min',
        icon: Star,
        color: 'yellow'
      }
    ];
    setFrameworks(mockFrameworks);

    const mockSignals = [
      {
        id: 1,
        type: 'positive',
        category: 'retention',
        signal: '40% of users return daily',
        strength: 'strong',
        date: '2025-01-18'
      },
      {
        id: 2,
        type: 'positive',
        category: 'engagement',
        signal: 'Average session: 18 minutes (target: 10+)',
        strength: 'strong',
        date: '2025-01-17'
      },
      {
        id: 3,
        type: 'warning',
        category: 'retention',
        signal: 'Week 2 retention: 45% (target: 60%+)',
        strength: 'weak',
        date: '2025-01-16'
      },
      {
        id: 4,
        type: 'positive',
        category: 'word-of-mouth',
        signal: '25% of signups from referrals',
        strength: 'medium',
        date: '2025-01-15'
      },
      {
        id: 5,
        type: 'warning',
        category: 'willingness-to-pay',
        signal: 'Only 8% upgrade to paid (target: 15%+)',
        strength: 'weak',
        date: '2025-01-14'
      }
    ];
    setSignals(mockSignals);

    const initialMetrics = [
      {
        id: 1,
        name: 'Must-Have Score',
        current: 42,
        target: 40,
        status: 'good',
        description: '% who say product is "must-have"'
      },
      {
        id: 2,
        name: 'Retention (Week 2)',
        current: 45,
        target: 60,
        status: 'warning',
        description: '% still active after 2 weeks'
      },
      {
        id: 3,
        name: 'NPS Score',
        current: 38,
        target: 50,
        status: 'warning',
        description: 'Net Promoter Score'
      },
      {
        id: 4,
        name: 'Active Usage',
        current: 65,
        target: 50,
        status: 'good',
        description: '% who use 3+ times/week'
      },
      {
        id: 5,
        name: 'Organic Growth',
        current: 25,
        target: 30,
        status: 'close',
        description: '% from word-of-mouth'
      }
    ];
    setMetrics(initialMetrics);

    const initialSteps = [
      {
        id: 1,
        title: 'Define Your ICP',
        description: 'Who is your ideal customer?',
        status: 'completed',
        evidence: ['Created 3 detailed personas', 'Validated with 10 customers']
      },
      {
        id: 2,
        title: 'Identify Core Problem',
        description: 'What problem are you solving?',
        status: 'completed',
        evidence: ['Documented top 3 pain points', 'Confirmed with customer interviews']
      },
      {
        id: 3,
        title: 'Build Minimum Viable Product',
        description: 'Core features only',
        status: 'completed',
        evidence: ['V1.0 shipped with 5 core features', 'Beta testing with 50 users']
      },
      {
        id: 4,
        title: 'Measure "Must-Have"',
        description: 'Would users be disappointed without it?',
        status: 'in-progress',
        evidence: ['42% say "very disappointed" (target: 40%+)', 'Surveyed 120 users']
      },
      {
        id: 5,
        title: 'Validate Willingness to Pay',
        description: 'Will they actually pay?',
        status: 'in-progress',
        evidence: ['8% conversion to paid (target: 15%)', 'Testing new pricing']
      },
      {
        id: 6,
        title: 'Prove Retention',
        description: 'Do they stick around?',
        status: 'in-progress',
        evidence: ['45% week-2 retention (need 60%+)', 'Improving onboarding']
      },
      {
        id: 7,
        title: 'Organic Growth Test',
        description: 'Are they telling others?',
        status: 'not-started',
        evidence: []
      },
      {
        id: 8,
        title: 'Scale & Iterate',
        description: 'Double down on what works',
        status: 'not-started',
        evidence: []
      }
    ];
    setSteps(initialSteps);
  }, []);

  // Calculate PMF score dynamically
  useEffect(() => {
    if (metrics.length > 0) {
      const totalWeight = metrics.reduce((sum, m) => {
        const progress = Math.min((m.current / m.target) * 100, 100);
        return sum + progress;
      }, 0);
      const avgScore = Math.round(totalWeight / metrics.length);
      setPmfScore(avgScore);
    }
  }, [metrics]);

  // Handler functions
  const handleScheduleInterview = () => {
    if (!interviewForm.name.trim() || !interviewForm.date) return;
    
    const newInterview = {
      id: Date.now(),
      name: interviewForm.name,
      company: interviewForm.company,
      role: interviewForm.role,
      date: interviewForm.date,
      duration: 0,
      status: 'scheduled',
      transcript: null,
      insights: [],
      pmfSignals: null,
      notes: interviewForm.notes
    };

    setInterviews([newInterview, ...interviews]);
    setShowInterviewModal(false);
    setInterviewForm({ name: '', company: '', role: '', date: '', time: '', notes: '' });
  };

  const handleDeleteInterview = (id) => {
    setInterviews(interviews.filter(i => i.id !== id));
  };

  const handleAddSignal = () => {
    if (!signalForm.signal.trim()) return;

    const newSignal = {
      id: Date.now(),
      type: signalForm.type,
      category: signalForm.category,
      signal: signalForm.signal,
      strength: signalForm.strength,
      date: new Date().toISOString().split('T')[0]
    };

    setSignals([newSignal, ...signals]);
    setShowSignalModal(false);
    setSignalForm({ signal: '', category: 'retention', type: 'positive', strength: 'medium' });
  };

  const handleDeleteSignal = (id) => {
    setSignals(signals.filter(s => s.id !== id));
  };

  const handleUpdateMetric = () => {
    const updated = metrics.map(m => {
      if (m.id === selectedMetric.id) {
        const newCurrent = parseInt(metricUpdateForm.current);
        let newStatus = 'warning';
        if (newCurrent >= m.target) newStatus = 'good';
        else if (newCurrent >= m.target * 0.8) newStatus = 'close';
        
        return { ...m, current: newCurrent, status: newStatus };
      }
      return m;
    });

    setMetrics(updated);
    setShowMetricModal(false);
    setSelectedMetric(null);
  };

  const handleUpdateStepStatus = (stepId, newStatus) => {
    const updated = steps.map(s => 
      s.id === stepId ? { ...s, status: newStatus } : s
    );
    setSteps(updated);
  };

  const handleAddEvidence = (evidence) => {
    const updated = steps.map(s => {
      if (s.id === selectedStep.id) {
        return { ...s, evidence: [...s.evidence, evidence] };
      }
      return s;
    });
    setSteps(updated);
  };

  const handleDeleteEvidence = (stepId, evidenceIndex) => {
    const updated = steps.map(s => {
      if (s.id === stepId) {
        return { ...s, evidence: s.evidence.filter((_, idx) => idx !== evidenceIndex) };
      }
      return s;
    });
    setSteps(updated);
  };

  const handleCreatePoll = () => {
    if (!pollForm.question || pollForm.options.some(opt => !opt.trim())) {
      alert('Please fill in all fields');
      return;
    }

    const newPoll = {
      id: Date.now(),
      question: pollForm.question,
      options: pollForm.options.map((text, index) => ({
        id: index + 1,
        text,
        votes: 0,
        percent: 0
      })),
      totalResponses: 0,
      status: 'active',
      createdAt: new Date().toISOString().split('T')[0],
      target: pollForm.target,
      framework: 'Custom'
    };

    setPolls(prev => [newPoll, ...prev]);
    setPollForm({ question: '', options: ['', ''], target: 'all_users' });
    setShowPollModal(false);
  };

  const handleCreateSurvey = () => {
    if (!surveyForm.title) {
      alert('Please enter survey title');
      return;
    }

    const framework = frameworks.find(f => f.id === surveyForm.framework);
    const newSurvey = {
      id: Date.now(),
      title: surveyForm.title,
      framework: surveyForm.framework,
      questions: framework?.id === 'nps' ? 2 : 3,
      responses: 0,
      status: 'active',
      createdAt: new Date().toISOString().split('T')[0],
      completionRate: 0,
      results: null
    };

    setSurveys(prev => [newSurvey, ...prev]);
    setSurveyForm({ title: '', framework: 'sean_ellis', target: 'active_users' });
    setShowSurveyModal(false);
  };

  const handleLaunchFramework = (frameworkId) => {
    const framework = frameworks.find(f => f.id === frameworkId);
    setSurveyForm({ ...surveyForm, framework: frameworkId, title: framework.name });
    setShowSurveyModal(true);
  };

  const handleAddPollOption = () => {
    setPollForm(prev => ({ ...prev, options: [...prev.options, ''] }));
  };

  const handleRemovePollOption = (index) => {
    if (pollForm.options.length > 2) {
      setPollForm(prev => ({
        ...prev,
        options: prev.options.filter((_, i) => i !== index)
      }));
    }
  };

  const handleUpdatePollOption = (index, value) => {
    setPollForm(prev => ({
      ...prev,
      options: prev.options.map((opt, i) => i === index ? value : opt)
    }));
  };

  const tabs = [
    { id: 'score', label: 'PMF Score', icon: Target, description: 'Overall health' },
    { id: 'signals', label: 'Signals', icon: Activity, description: 'Key indicators' },
    { id: 'methods', label: 'Validation Methods', icon: CheckCircle, description: 'Frameworks & Surveys' },
    { id: 'polls', label: 'Audience Polls', icon: MessageCircle, description: 'Quick user feedback' },
    { id: 'insights', label: 'AI Insights', icon: Brain, description: 'What to do next' }
  ];


  const getScoreColor = (score) => {
    if (score >= 80) return { bg: 'bg-green-500', text: 'text-green-600', status: 'Strong PMF', stroke: '#22c55e' };
    if (score >= 60) return { bg: 'bg-blue-500', text: 'text-blue-600', status: 'Getting Close', stroke: '#3b82f6' };
    if (score >= 40) return { bg: 'bg-orange-500', text: 'text-orange-600', status: 'Early Signs', stroke: '#f97316' };
    return { bg: 'bg-red-500', text: 'text-red-600', status: 'Keep Searching', stroke: '#ef4444' };
  };

  const getMetricStatus = (status) => {
    switch (status) {
      case 'good': return { 
        color: 'green', 
        icon: CheckCircle,
        textColor: 'text-green-600',
        bgColor: 'bg-green-500'
      };
      case 'warning': return { 
        color: 'yellow', 
        icon: AlertTriangle,
        textColor: 'text-orange-600',
        bgColor: 'bg-orange-500'
      };
      case 'close': return { 
        color: 'blue', 
        icon: TrendingUp,
        textColor: 'text-blue-600',
        bgColor: 'bg-blue-500'
      };
      default: return { 
        color: 'gray', 
        icon: AlertTriangle,
        textColor: 'text-gray-600',
        bgColor: 'bg-gray-500'
      };
    }
  };

  const getStepStatus = (status) => {
    switch (status) {
      case 'completed': return { 
        color: 'green', 
        icon: CheckCircle, 
        text: 'Completed',
        bgColor: 'bg-green-500',
        iconColor: 'text-green-600',
        badgeBg: 'bg-green-100',
        badgeText: 'text-green-700'
      };
      case 'in-progress': return { 
        color: 'blue', 
        icon: RefreshCw, 
        text: 'In Progress',
        bgColor: 'bg-blue-100',
        iconColor: 'text-blue-600',
        badgeBg: 'bg-blue-100',
        badgeText: 'text-blue-700'
      };
      case 'not-started': return { 
        color: 'gray', 
        icon: Clock, 
        text: 'Not Started',
        bgColor: 'bg-gray-100',
        iconColor: 'text-gray-600',
        badgeBg: 'bg-gray-100',
        badgeText: 'text-gray-700'
      };
      default: return { 
        color: 'gray', 
        icon: Clock, 
        text: 'Pending',
        bgColor: 'bg-gray-100',
        iconColor: 'text-gray-600',
        badgeBg: 'bg-gray-100',
        badgeText: 'text-gray-700'
      };
    }
  };

  const scoreColor = getScoreColor(pmfScore);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Product-Market Fit</h1>
              <p className="text-gray-600">Systematic validation framework</p>
            </div>
            
            <button 
              onClick={() => setShowSurveyModal(true)}
              className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-medium"
            >
              <Plus size={20} />
              <span>Launch Survey</span>
            </button>
          </div>

          {/* PMF Score Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-8 rounded-xl shadow-sm border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="relative w-32 h-32">
                  <svg className="transform -rotate-90 w-32 h-32">
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="rgb(243 244 246)"
                      strokeWidth="12"
                      fill="none"
                    />
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke={scoreColor.stroke}
                      strokeWidth="12"
                      fill="none"
                      strokeDasharray={`${(pmfScore / 100) * 352} 352`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className={`text-3xl font-bold ${scoreColor.text}`}>{pmfScore}</div>
                    <div className="text-xs text-gray-600">PMF Score</div>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{scoreColor.status}</h3>
                  <p className="text-gray-600 max-w-md">
                    {pmfScore >= 80 && 'You have strong product-market fit! Focus on scaling.'}
                    {pmfScore >= 60 && pmfScore < 80 && 'You\'re getting close to PMF. Keep iterating on key metrics.'}
                    {pmfScore >= 40 && pmfScore < 60 && 'Early signs of PMF. Focus on retention and must-have score.'}
                    {pmfScore < 40 && 'Keep searching for PMF. Talk to more customers and iterate quickly.'}
                  </p>
                </div>
              </div>

              <div className="text-right space-y-2">
                <div className="flex items-center space-x-2 text-blue-600">
                  <TrendingUp size={20} />
                  <span className="font-bold">+12 points</span>
                </div>
                <div className="text-sm text-gray-600">vs last month</div>
                <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                  View History →
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6 p-2">
          <div className="flex space-x-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-all flex-1 ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon size={18} />
                  <div className="text-left">
                    <div className="font-medium text-sm">{tab.label}</div>
                    <div className={`text-xs ${activeTab === tab.id ? 'text-white/80' : 'text-gray-500'}`}>
                      {tab.description}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'score' && (
            <motion.div
              key="score"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="grid grid-cols-1 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-900">Key PMF Metrics</h3>
                    <button
                      onClick={() => setShowMetricModal(true)}
                      className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center space-x-1"
                    >
                      <Edit size={16} />
                      <span>Update Metrics</span>
                    </button>
                  </div>
                  <div className="space-y-4">
                    {metrics.map((metric) => {
                      const status = getMetricStatus(metric.status);
                      const StatusIcon = status.icon;
                      const progress = Math.min((metric.current / metric.target) * 100, 100);
                      
                      return (
                        <div key={metric.id} className="border-b border-gray-100 pb-4 last:border-0">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-3">
                              <StatusIcon size={20} className={status.textColor} />
                              <div>
                                <div className="font-medium text-gray-900">{metric.name}</div>
                                <div className="text-xs text-gray-500">{metric.description}</div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className={`text-xl font-bold ${status.textColor}`}>
                                {metric.current}%
                              </div>
                              <div className="text-xs text-gray-500">Target: {metric.target}%</div>
                            </div>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className={`${status.bgColor} h-2 rounded-full transition-all`} 
                              style={{ width: `${progress}%` }}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'signals' && (
            <motion.div
              key="signals"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="mb-4 flex justify-end">
                <button
                  onClick={() => setShowSignalModal(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-medium text-sm"
                >
                  <Plus size={18} />
                  <span>Add Signal</span>
                </button>
              </div>
              <div className="space-y-4">
                {signals.map((signal, index) => (
                  <motion.div
                    key={signal.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-4 rounded-xl border shadow-sm ${
                      signal.type === 'positive' ? 'bg-white border-gray-200' : 'bg-white border-gray-200'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3 flex-1">
                        {signal.type === 'positive' ? (
                          <ThumbsUp className="text-green-600 mt-1" size={20} />
                        ) : (
                          <AlertTriangle className="text-orange-600 mt-1" size={20} />
                        )}
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs font-medium rounded">
                              {signal.category}
                            </span>
                            <span className={`px-2 py-0.5 text-xs font-medium rounded ${
                              signal.strength === 'strong' ? 'bg-green-100 text-green-700' :
                              signal.strength === 'medium' ? 'bg-blue-100 text-blue-700' :
                              'bg-gray-100 text-gray-700'
                            }`}>
                              {signal.strength} signal
                            </span>
                          </div>
                          <div className="font-medium text-gray-900">{signal.signal}</div>
                          <div className="text-xs text-gray-500 mt-1">{signal.date}</div>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDeleteSignal(signal.id)}
                        className="text-gray-400 hover:text-red-600 transition-colors p-1"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'methods' && (
            <motion.div
              key="methods"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Validation Frameworks</h2>
                <p className="text-gray-600">Choose a proven framework to validate your product-market fit</p>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-8">
                {frameworks.map((framework) => {
                  const Icon = framework.icon;
                  const colorClasses = {
                    blue: { bg: 'bg-blue-100', text: 'text-blue-600', border: 'border-blue-200' },
                    pink: { bg: 'bg-pink-100', text: 'text-pink-600', border: 'border-gray-200' },
                    green: { bg: 'bg-green-100', text: 'text-green-600', border: 'border-gray-200' },
                    purple: { bg: 'bg-purple-100', text: 'text-purple-600', border: 'border-gray-200' },
                    orange: { bg: 'bg-orange-100', text: 'text-orange-600', border: 'border-gray-200' },
                    yellow: { bg: 'bg-yellow-100', text: 'text-yellow-600', border: 'border-gray-200' }
                  };
                  const colors = colorClasses[framework.color] || colorClasses.blue;

                  return (
                    <div key={framework.id} className={`bg-white p-6 rounded-xl shadow-sm border ${colors.border} hover:shadow-md transition-all`}>
                      <div className="flex items-start justify-between mb-4">
                        <div className={`w-12 h-12 ${colors.bg} rounded-lg flex items-center justify-center`}>
                          <Icon size={24} className={colors.text} />
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded">
                            {framework.difficulty}
                          </span>
                          <span className="text-xs text-gray-600 flex items-center space-x-1">
                            <Clock size={12} />
                            <span>{framework.timeToComplete}</span>
                          </span>
                        </div>
                      </div>

                      <h3 className="text-lg font-bold text-gray-900 mb-2">{framework.name}</h3>
                      <p className="text-sm text-gray-600 mb-4">{framework.description}</p>

                      {framework.question && (
                        <div className="bg-gray-50 p-3 rounded-lg mb-4">
                          <div className="text-xs font-semibold text-gray-700 mb-1">Sample Question:</div>
                          <div className="text-sm text-gray-900">"{framework.question}"</div>
                        </div>
                      )}

                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-xs text-gray-600">Benchmark</div>
                          <div className="text-sm font-bold text-gray-900">{framework.benchmark}</div>
                        </div>
                        <button
                          onClick={() => handleLaunchFramework(framework.id)}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all text-sm font-medium"
                        >
                          Launch Survey
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mb-4">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Active Surveys</h2>
                <p className="text-gray-600">Track your ongoing validation efforts</p>
              </div>

              <div className="space-y-4">
                {surveys.length === 0 ? (
                  <div className="bg-white p-12 rounded-xl text-center border-2 border-dashed border-gray-300 shadow-sm">
                    <BarChart3 className="mx-auto text-gray-400 mb-4" size={48} />
                    <h3 className="text-lg font-bold text-gray-900 mb-2">No Active Surveys</h3>
                    <p className="text-gray-600">Launch a framework above to start collecting data</p>
                  </div>
                ) : (
                  surveys.map((survey, index) => (
                    <motion.div
                      key={survey.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-lg font-bold text-gray-900">{survey.title}</h3>
                            <span className={`px-3 py-1 text-xs font-medium rounded ${
                              survey.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                            }`}>
                              {survey.status}
                            </span>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span className="flex items-center space-x-1">
                              <Calendar size={14} />
                              <span>{survey.createdAt}</span>
                            </span>
                            <span>{survey.questions} questions</span>
                            <span>{survey.responses} responses</span>
                            <span>{survey.completionRate}% completion rate</span>
                          </div>
                        </div>
                      </div>

                      {survey.results && (
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="text-sm font-semibold text-gray-900 mb-3">Results:</h4>
                          <div className="grid grid-cols-3 gap-4">
                            {survey.framework === 'sean_ellis' && (
                              <>
                                <div className="text-center">
                                  <div className="text-2xl font-bold text-blue-600">{survey.results.mustHave}%</div>
                                  <div className="text-xs text-gray-600">Very Disappointed</div>
                                </div>
                                <div className="text-center">
                                  <div className="text-2xl font-bold text-blue-600">{survey.results.someDisappointment}%</div>
                                  <div className="text-xs text-gray-600">Somewhat Disappointed</div>
                                </div>
                                <div className="text-center">
                                  <div className="text-2xl font-bold text-gray-600">{survey.results.noDisappointment}%</div>
                                  <div className="text-xs text-gray-600">Not Disappointed</div>
                                </div>
                              </>
                            )}
                            {survey.framework === 'nps' && (
                              <>
                                <div className="text-center">
                                  <div className="text-2xl font-bold text-blue-600">{survey.results.nps}</div>
                                  <div className="text-xs text-gray-600">NPS Score</div>
                                </div>
                                <div className="text-center">
                                  <div className="text-2xl font-bold text-blue-600">{survey.results.promoters}%</div>
                                  <div className="text-xs text-gray-600">Promoters</div>
                                </div>
                                <div className="text-center">
                                  <div className="text-2xl font-bold text-red-600">{survey.results.detractors}%</div>
                                  <div className="text-xs text-gray-600">Detractors</div>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ))
                )}
              </div>
            </motion.div>
          )}

          {activeTab === 'validation' && (
            <motion.div
              key="validation"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="space-y-4">
                {steps.map((step, index) => {
                  const status = getStepStatus(step.status);
                  const StatusIcon = status.icon;
                  
                  return (
                    <motion.div
                      key={step.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
                    >
                      <div className="flex items-start space-x-4">
                        <div className={`w-12 h-12 ${status.bgColor} rounded-full flex items-center justify-center flex-shrink-0`}>
                          <StatusIcon size={20} className={status.iconColor} />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-3">
                              <h3 className="text-lg font-bold text-gray-900">{step.title}</h3>
                              <span className={`px-2 py-1 text-xs font-medium rounded ${status.badgeBg} ${status.badgeText}`}>
                                {status.text}
                              </span>
                            </div>
                            <div className="flex items-center space-x-2">
                              {step.status !== 'completed' && (
                                <button
                                  onClick={() => handleUpdateStepStatus(step.id, step.status === 'not-started' ? 'in-progress' : 'completed')}
                                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                                >
                                  {step.status === 'not-started' ? 'Start' : 'Complete'}
                                </button>
                              )}
                              <button
                                onClick={() => {
                                  setSelectedStep(step);
                                  setShowStepModal(true);
                                }}
                                className="text-sm text-blue-600 hover:text-blue-600 font-medium flex items-center space-x-1"
                              >
                                <Plus size={14} />
                                <span>Add Evidence</span>
                              </button>
                            </div>
                          </div>
                          <p className="text-gray-600 mb-3">{step.description}</p>
                          
                          {step.evidence.length > 0 && (
                            <div className="bg-gray-50 p-3 rounded-lg">
                              <div className="text-xs font-semibold text-gray-700 mb-2">Evidence:</div>
                              <ul className="space-y-1">
                                {step.evidence.map((item, idx) => (
                                  <li key={idx} className="text-sm text-gray-600 flex items-start justify-between group">
                                    <div className="flex items-start space-x-2 flex-1">
                                      <CheckCircle size={14} className="text-blue-600 mt-0.5 flex-shrink-0" />
                                      <span>{item}</span>
                                    </div>
                                    <button
                                      onClick={() => handleDeleteEvidence(step.id, idx)}
                                      className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-black transition-all ml-2"
                                    >
                                      <X size={14} />
                                    </button>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {activeTab === 'polls' && (
            <motion.div
              key="polls"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Audience Polls</h2>
                    <p className="text-gray-600">Quick user feedback</p>
                  </div>
                  <button
                    onClick={() => setShowPollModal(true)}
                    className="flex items-center space-x-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-medium"
                  >
                    <Plus size={18} />
                    <span>Add Poll</span>
                  </button>
                </div>

                {polls.length === 0 ? (
                  <div className="bg-white p-12 rounded-xl shadow-sm border-2 border-dashed border-gray-300 text-center">
                    <MessageCircle className="mx-auto text-gray-400 mb-4" size={48} />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">No Polls Yet</h3>
                    <p className="text-gray-600 mb-4">Create your first poll to get quick feedback from your users</p>
                    <button
                      onClick={() => setShowPollModal(true)}
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
                    >
                      Create First Poll
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-6">
                    {polls.map((poll) => (
                      <div key={poll.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h3 className="text-lg font-bold text-gray-900">{poll.question}</h3>
                              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                poll.status === 'active' 
                                  ? 'bg-green-100 text-green-700' 
                                  : 'bg-gray-100 text-gray-700'
                              }`}>
                                {poll.status === 'active' ? 'Active' : 'Completed'}
                              </span>
                            </div>
                            <div className="flex items-center space-x-4 text-sm text-gray-600">
                              <span className="flex items-center space-x-1">
                                <Users size={14} />
                                <span>{poll.totalResponses} responses</span>
                              </span>
                              <span className="flex items-center space-x-1">
                                <Calendar size={14} />
                                <span>{new Date(poll.createdAt).toLocaleDateString()}</span>
                              </span>
                              <span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-xs font-medium">
                                {poll.framework}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                              <Share size={18} />
                            </button>
                            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                              <Download size={18} />
                            </button>
                            <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </div>

                        <div className="space-y-3">
                          {poll.options.map((option) => (
                            <div key={option.id}>
                              <div className="flex items-center justify-between mb-1.5">
                                <span className="text-sm font-medium text-gray-900">{option.text}</span>
                                <span className="text-sm font-bold text-blue-600">{option.percent}%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div 
                                  className="bg-blue-600 h-2.5 rounded-full transition-all" 
                                  style={{ width: `${option.percent}%` }}
                                ></div>
                              </div>
                              <div className="text-xs text-gray-500 mt-1">{option.votes} votes</div>
                            </div>
                          ))}
                        </div>

                        {poll.status === 'active' && (
                          <div className="mt-4 pt-4 border-t border-gray-200">
                            <button className="flex items-center space-x-2 text-sm text-blue-600 hover:text-blue-700 font-medium">
                              <Eye size={16} />
                              <span>View All Responses</span>
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {activeTab === 'insights' && (
            <motion.div
              key="insights"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center space-x-3 mb-6">
                  <Brain className="text-blue-600" size={32} />
                  <h2 className="text-2xl font-bold text-gray-900">AI Recommendations</h2>
                </div>

                <div className="space-y-6">
                  <div className="p-6 bg-white rounded-xl">
                    <h3 className="text-lg font-bold text-gray-900 mb-3">🎯 Priority #1: Improve Week-2 Retention</h3>
                    <p className="text-gray-700 mb-4">
                      Your retention at 45% is below the 60% threshold for PMF. This is the biggest blocker to achieving product-market fit.
                    </p>
                    <div className="bg-white p-4 rounded-lg">
                      <div className="font-semibold text-gray-900 mb-2">Recommended Actions:</div>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li className="flex items-start space-x-2">
                          <ChevronRight size={16} className="text-blue-600 mt-0.5" />
                          <span>Improve onboarding: Add product tour and quick-win moments in first session</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <ChevronRight size={16} className="text-blue-600 mt-0.5" />
                          <span>Add email reminders on days 3, 7, and 14 with value props</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <ChevronRight size={16} className="text-blue-600 mt-0.5" />
                          <span>Interview 10 churned users to understand why they left</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="p-6 bg-white rounded-xl">
                    <h3 className="text-lg font-bold text-gray-900 mb-3">✅ Strength: Must-Have Score</h3>
                    <p className="text-gray-700">
                      42% of users say your product is "must-have" (target: 40%+). This is a strong signal! Double down on what's working for these users.
                    </p>
                  </div>

                  <div className="p-6 bg-white rounded-xl">
                    <h3 className="text-lg font-bold text-gray-900 mb-3">⚠️ Watch: Conversion to Paid</h3>
                    <p className="text-gray-700 mb-4">
                      Only 8% are upgrading to paid (target: 15%+). This could be a pricing or value communication issue.
                    </p>
                    <div className="bg-white p-4 rounded-lg">
                      <div className="font-semibold text-gray-900 mb-2">Next Steps:</div>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li className="flex items-start space-x-2">
                          <ChevronRight size={16} className="text-blue-600 mt-0.5" />
                          <span>Test different pricing tiers (consider lower entry point)</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <ChevronRight size={16} className="text-blue-600 mt-0.5" />
                          <span>Add clear value prop on upgrade page</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <ChevronRight size={16} className="text-blue-600 mt-0.5" />
                          <span>Interview users who didn't upgrade to understand objections</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Add Signal Modal */}
        <AnimatePresence>
          {showSignalModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
              onClick={() => setShowSignalModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-xl shadow-lg max-w-2xl w-full"
              >
                <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">Add PMF Signal</h2>
                  <button
                    onClick={() => setShowSignalModal(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="p-6 space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Signal Description *
                    </label>
                    <textarea
                      value={signalForm.signal}
                      onChange={(e) => setSignalForm({ ...signalForm, signal: e.target.value })}
                      placeholder="e.g., Users spending 20+ minutes per session"
                      rows="3"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none text-gray-900"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Type
                      </label>
                      <select
                        value={signalForm.type}
                        onChange={(e) => setSignalForm({ ...signalForm, type: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 font-medium"
                      >
                        <option value="positive">Positive</option>
                        <option value="warning">Warning</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Category
                      </label>
                      <select
                        value={signalForm.category}
                        onChange={(e) => setSignalForm({ ...signalForm, category: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 font-medium"
                      >
                        <option value="retention">Retention</option>
                        <option value="engagement">Engagement</option>
                        <option value="word-of-mouth">Word of Mouth</option>
                        <option value="willingness-to-pay">Willingness to Pay</option>
                        <option value="usage">Usage</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Strength
                      </label>
                      <select
                        value={signalForm.strength}
                        onChange={(e) => setSignalForm({ ...signalForm, strength: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 font-medium"
                      >
                        <option value="strong">Strong</option>
                        <option value="medium">Medium</option>
                        <option value="weak">Weak</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="p-6 border-t border-gray-200 flex items-center justify-end space-x-3">
                  <button
                    onClick={() => setShowSignalModal(false)}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddSignal}
                    disabled={!signalForm.signal.trim()}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                  >
                    Add Signal
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Update Metric Modal */}
        <AnimatePresence>
          {showMetricModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
              onClick={() => setShowMetricModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-xl shadow-lg max-w-md w-full"
              >
                <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">Update Metric</h2>
                  <button
                    onClick={() => setShowMetricModal(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="p-6 space-y-5">
                  {!selectedMetric ? (
                    <>
                      <p className="text-gray-600 mb-4">Select a metric to update:</p>
                      <div className="space-y-2">
                        {metrics.map((metric) => (
                          <button
                            key={metric.id}
                            onClick={() => {
                              setSelectedMetric(metric);
                              setMetricUpdateForm({ current: metric.current });
                            }}
                            className="w-full p-4 text-left border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all"
                          >
                            <div className="font-semibold text-gray-900">{metric.name}</div>
                            <div className="text-sm text-gray-600">Current: {metric.current}% (Target: {metric.target}%)</div>
                          </button>
                        ))}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <div className="font-semibold text-gray-900 mb-1">{selectedMetric.name}</div>
                        <div className="text-sm text-gray-600">{selectedMetric.description}</div>
                        <div className="text-sm text-gray-600 mt-2">Target: {selectedMetric.target}%</div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          New Value (%)
                        </label>
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={metricUpdateForm.current}
                          onChange={(e) => setMetricUpdateForm({ current: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                        />
                      </div>
                    </>
                  )}
                </div>

                <div className="p-6 border-t border-gray-200 flex items-center justify-end space-x-3">
                  {selectedMetric && (
                    <button
                      onClick={() => setSelectedMetric(null)}
                      className="px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors font-medium"
                    >
                      ← Back
                    </button>
                  )}
                  <button
                    onClick={() => {
                      setShowMetricModal(false);
                      setSelectedMetric(null);
                    }}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  {selectedMetric && (
                    <button
                      onClick={handleUpdateMetric}
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-medium"
                    >
                      Update
                    </button>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Add Evidence Modal */}
        <AnimatePresence>
          {showStepModal && selectedStep && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
              onClick={() => {
                setShowStepModal(false);
                setSelectedStep(null);
              }}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-xl shadow-lg max-w-md w-full"
              >
                <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">Add Evidence</h2>
                  <button
                    onClick={() => {
                      setShowStepModal(false);
                      setSelectedStep(null);
                    }}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="p-6 space-y-4">
                  <div className="bg-white p-4 rounded-lg">
                    <div className="font-semibold text-gray-900">{selectedStep.title}</div>
                    <div className="text-sm text-gray-600 mt-1">{selectedStep.description}</div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Evidence Description
                    </label>
                    <textarea
                      id="evidence-input"
                      placeholder="e.g., Completed 15 customer interviews"
                      rows="3"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none text-gray-900"
                    />
                  </div>
                </div>

                <div className="p-6 border-t border-gray-200 flex items-center justify-end space-x-3">
                  <button
                    onClick={() => {
                      setShowStepModal(false);
                      setSelectedStep(null);
                    }}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      const input = document.getElementById('evidence-input');
                      if (input.value.trim()) {
                        handleAddEvidence(input.value.trim());
                        input.value = '';
                        setShowStepModal(false);
                        setSelectedStep(null);
                      }
                    }}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-medium"
                  >
                    Add Evidence
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Transcript Modal */}
        <AnimatePresence>
          {showTranscriptModal && selectedInterview && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
              onClick={() => {
                setShowTranscriptModal(false);
                setSelectedInterview(null);
              }}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-xl shadow-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto"
              >
                <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white z-10">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedInterview.name}</h2>
                    <p className="text-sm text-gray-600">{selectedInterview.role} at {selectedInterview.company}</p>
                  </div>
                  <button
                    onClick={() => {
                      setShowTranscriptModal(false);
                      setSelectedInterview(null);
                    }}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="p-6">
                  <div className="bg-gray-50 p-6 rounded-lg whitespace-pre-wrap text-gray-800 font-mono text-sm">
                    {selectedInterview.transcript}
                  </div>
                </div>

                <div className="p-6 border-t border-gray-200 flex items-center justify-end">
                  <button
                    onClick={() => {
                      setShowTranscriptModal(false);
                      setSelectedInterview(null);
                    }}
                    className="px-6 py-3 bg-gray-800 text-white rounded-xl hover:bg-gray-900 transition-colors font-medium"
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PMFValidation;

