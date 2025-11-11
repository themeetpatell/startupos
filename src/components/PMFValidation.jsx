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
  const [interviews, setInterviews] = useState([]);
  const [signals, setSignals] = useState([]);
  const [showInterviewModal, setShowInterviewModal] = useState(false);
  const [showSignalModal, setShowSignalModal] = useState(false);
  const [showMetricModal, setShowMetricModal] = useState(false);
  const [showStepModal, setShowStepModal] = useState(false);
  const [showTranscriptModal, setShowTranscriptModal] = useState(false);
  const [selectedInterview, setSelectedInterview] = useState(null);
  const [selectedMetric, setSelectedMetric] = useState(null);
  const [selectedStep, setSelectedStep] = useState(null);
  const [metrics, setMetrics] = useState([]);
  const [steps, setSteps] = useState([]);
  
  const [interviewForm, setInterviewForm] = useState({
    name: '',
    company: '',
    role: '',
    date: '',
    time: '',
    notes: ''
  });

  const [signalForm, setSignalForm] = useState({
    signal: '',
    category: 'retention',
    type: 'positive',
    strength: 'medium'
  });

  const [metricUpdateForm, setMetricUpdateForm] = useState({
    current: 0
  });

  useEffect(() => {
    const mockInterviews = [
      {
        id: 1,
        name: 'Sarah Chen',
        company: 'TechCorp',
        role: 'VP Product',
        date: '2025-01-18',
        duration: 45,
        status: 'completed',
        transcript: 'Interview transcript:\n\nQ: How would you feel if you could no longer use our product?\nA: Very disappointed! It\'s become essential for our product workflow. We use it every day.\n\nQ: What\'s the main benefit you get?\nA: It saves us about 10 hours per week on manual processes. The automation features are incredible.\n\nQ: What would make it better?\nA: Better integrations with Slack and Jira would be amazing.',
        insights: ['Must-have for her team', 'Pricing is acceptable', 'Needs better integrations'],
        pmfSignals: { mustHave: true, paymentIntent: 'high', frequency: 'daily' }
      },
      {
        id: 2,
        name: 'Michael Rodriguez',
        company: 'StartupX',
        role: 'Founder',
        date: '2025-01-17',
        duration: 32,
        status: 'completed',
        transcript: 'Interview transcript:\n\nQ: How often do you use the product?\nA: About once a week, mainly for reporting.\n\nQ: Would you be disappointed without it?\nA: Somewhat. I could probably find alternatives, but it\'s convenient.\n\nQ: Price point feedback?\nA: A bit expensive for our stage. Would love a startup discount.',
        insights: ['Would use weekly', 'Price sensitivity high', 'Loves core features'],
        pmfSignals: { mustHave: false, paymentIntent: 'medium', frequency: 'weekly' }
      },
      {
        id: 3,
        name: 'Emily Watson',
        company: 'ScaleUp Inc',
        role: 'COO',
        date: '2025-01-20',
        duration: 0,
        status: 'scheduled',
        transcript: null,
        insights: [],
        pmfSignals: null
      }
    ];
    setInterviews(mockInterviews);

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

  const tabs = [
    { id: 'score', label: 'PMF Score', icon: Target, description: 'Overall health' },
    { id: 'signals', label: 'Signals', icon: Activity, description: 'Key indicators' },
    { id: 'interviews', label: 'Customer Interviews', icon: MessageCircle, description: 'Qualitative research' },
    { id: 'validation', label: 'Validation Framework', icon: CheckCircle, description: 'Step-by-step' },
    { id: 'insights', label: 'AI Insights', icon: Brain, description: 'What to do next' }
  ];


  const getScoreColor = (score) => {
    if (score >= 80) return { bg: 'bg-green-500', text: 'text-green-600', status: 'Strong PMF' };
    if (score >= 60) return { bg: 'bg-yellow-500', text: 'text-yellow-600', status: 'Getting Close' };
    if (score >= 40) return { bg: 'bg-orange-500', text: 'text-orange-600', status: 'Early Signs' };
    return { bg: 'bg-red-500', text: 'text-red-600', status: 'Keep Searching' };
  };

  const getMetricStatus = (status) => {
    switch (status) {
      case 'good': return { color: 'green', icon: CheckCircle };
      case 'warning': return { color: 'yellow', icon: AlertTriangle };
      case 'close': return { color: 'blue', icon: TrendingUp };
      default: return { color: 'gray', icon: AlertTriangle };
    }
  };

  const getStepStatus = (status) => {
    switch (status) {
      case 'completed': return { color: 'green', icon: CheckCircle, text: 'Completed' };
      case 'in-progress': return { color: 'blue', icon: RefreshCw, text: 'In Progress' };
      case 'not-started': return { color: 'gray', icon: Clock, text: 'Not Started' };
      default: return { color: 'gray', icon: Clock, text: 'Pending' };
    }
  };

  const scoreColor = getScoreColor(pmfScore);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                <Target className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Product-Market Fit</h1>
                <p className="text-gray-600">Systematic validation framework</p>
              </div>
            </div>
            
            <button 
              onClick={() => setShowInterviewModal(true)}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:shadow-lg transition-all font-medium"
            >
              <Plus size={20} />
              <span>Schedule Interview</span>
            </button>
          </div>

          {/* PMF Score Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="relative w-32 h-32">
                  <svg className="transform -rotate-90 w-32 h-32">
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="#f3f4f6"
                      strokeWidth="12"
                      fill="none"
                    />
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke={scoreColor.bg.replace('bg-', '#')}
                      strokeWidth="12"
                      fill="none"
                      strokeDasharray={`${(pmfScore / 100) * 352} 352`}
                      strokeLinecap="round"
                      className={scoreColor.bg}
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
                <div className="flex items-center space-x-2 text-green-600">
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
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md'
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
                              <StatusIcon size={20} className={`text-${status.color}-600`} />
                              <div>
                                <div className="font-medium text-gray-900">{metric.name}</div>
                                <div className="text-xs text-gray-500">{metric.description}</div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className={`text-xl font-bold text-${status.color}-600`}>
                                {metric.current}%
                              </div>
                              <div className="text-xs text-gray-500">Target: {metric.target}%</div>
                            </div>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className={`bg-${status.color}-500 h-2 rounded-full transition-all`} 
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
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:shadow-lg transition-all font-medium text-sm"
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
                    className={`p-4 rounded-xl border-2 ${
                      signal.type === 'positive' ? 'bg-green-50 border-green-200' : 'bg-yellow-50 border-yellow-200'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3 flex-1">
                        {signal.type === 'positive' ? (
                          <ThumbsUp className="text-green-600 mt-1" size={20} />
                        ) : (
                          <AlertTriangle className="text-yellow-600 mt-1" size={20} />
                        )}
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="px-2 py-0.5 bg-white text-gray-700 text-xs font-medium rounded">
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

          {activeTab === 'interviews' && (
            <motion.div
              key="interviews"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="space-y-4">
                {interviews.map((interview, index) => (
                  <motion.div
                    key={interview.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-white font-bold">
                          {interview.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">{interview.name}</h3>
                          <div className="text-sm text-gray-600">{interview.role} at {interview.company}</div>
                          <div className="flex items-center space-x-3 mt-2">
                            <span className={`px-2 py-1 text-xs font-medium rounded ${
                              interview.status === 'completed' ? 'bg-green-100 text-green-700' :
                              interview.status === 'scheduled' ? 'bg-blue-100 text-blue-700' :
                              'bg-gray-100 text-gray-700'
                            }`}>
                              {interview.status}
                            </span>
                            <span className="text-xs text-gray-500 flex items-center space-x-1">
                              <Calendar size={12} />
                              <span>{interview.date}</span>
                            </span>
                            {interview.duration > 0 && (
                              <span className="text-xs text-gray-500 flex items-center space-x-1">
                                <Clock size={12} />
                                <span>{interview.duration} min</span>
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        {interview.status === 'completed' && interview.pmfSignals && interview.pmfSignals.mustHave && (
                          <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full flex items-center space-x-1">
                            <Heart size={12} />
                            <span>Must-Have</span>
                          </span>
                        )}
                        <button
                          onClick={() => handleDeleteInterview(interview.id)}
                          className="text-gray-400 hover:text-red-600 transition-colors p-1"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>

                    {interview.insights.length > 0 && (
                      <div className="bg-gray-50 p-4 rounded-lg mb-3">
                        <h4 className="text-sm font-semibold text-gray-900 mb-2">Key Insights</h4>
                        <ul className="space-y-1">
                          {interview.insights.map((insight, idx) => (
                            <li key={idx} className="text-sm text-gray-700 flex items-start space-x-2">
                              <span className="text-blue-600 mt-1">•</span>
                              <span>{insight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="flex items-center space-x-3">
                      {interview.status === 'scheduled' && (
                        <>
                          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium">
                            Join Call
                          </button>
                          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm font-medium">
                            Reschedule
                          </button>
                        </>
                      )}
                      {interview.status === 'completed' && interview.transcript && (
                        <button 
                          onClick={() => {
                            setSelectedInterview(interview);
                            setShowTranscriptModal(true);
                          }}
                          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm font-medium flex items-center space-x-2"
                        >
                          <FileText size={16} />
                          <span>View Transcript</span>
                        </button>
                      )}
                    </div>
                  </motion.div>
                ))}
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
                        <div className={`w-12 h-12 bg-${status.color}-100 rounded-full flex items-center justify-center flex-shrink-0`}>
                          <StatusIcon size={20} className={`text-${status.color}-600`} />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-3">
                              <h3 className="text-lg font-bold text-gray-900">{step.title}</h3>
                              <span className={`px-2 py-1 text-xs font-medium rounded bg-${status.color}-100 text-${status.color}-700`}>
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
                                className="text-sm text-purple-600 hover:text-purple-700 font-medium flex items-center space-x-1"
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
                                      <CheckCircle size={14} className="text-green-600 mt-0.5 flex-shrink-0" />
                                      <span>{item}</span>
                                    </div>
                                    <button
                                      onClick={() => handleDeleteEvidence(step.id, idx)}
                                      className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-600 transition-all ml-2"
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

          {activeTab === 'insights' && (
            <motion.div
              key="insights"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center space-x-3 mb-6">
                  <Brain className="text-purple-600" size={32} />
                  <h2 className="text-2xl font-bold text-gray-900">AI Recommendations</h2>
                </div>

                <div className="space-y-6">
                  <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
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

                  <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
                    <h3 className="text-lg font-bold text-gray-900 mb-3">✅ Strength: Must-Have Score</h3>
                    <p className="text-gray-700">
                      42% of users say your product is "must-have" (target: 40%+). This is a strong signal! Double down on what's working for these users.
                    </p>
                  </div>

                  <div className="p-6 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl">
                    <h3 className="text-lg font-bold text-gray-900 mb-3">⚠️ Watch: Conversion to Paid</h3>
                    <p className="text-gray-700 mb-4">
                      Only 8% are upgrading to paid (target: 15%+). This could be a pricing or value communication issue.
                    </p>
                    <div className="bg-white p-4 rounded-lg">
                      <div className="font-semibold text-gray-900 mb-2">Next Steps:</div>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li className="flex items-start space-x-2">
                          <ChevronRight size={16} className="text-orange-600 mt-0.5" />
                          <span>Test different pricing tiers (consider lower entry point)</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <ChevronRight size={16} className="text-orange-600 mt-0.5" />
                          <span>Add clear value prop on upgrade page</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <ChevronRight size={16} className="text-orange-600 mt-0.5" />
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

        {/* Schedule Interview Modal */}
        <AnimatePresence>
          {showInterviewModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
              onClick={() => setShowInterviewModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              >
                <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white z-10">
                  <h2 className="text-2xl font-bold text-gray-900">Schedule Customer Interview</h2>
                  <button
                    onClick={() => setShowInterviewModal(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="p-6 space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Name *
                      </label>
                      <input
                        type="text"
                        value={interviewForm.name}
                        onChange={(e) => setInterviewForm({ ...interviewForm, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Company
                      </label>
                      <input
                        type="text"
                        value={interviewForm.company}
                        onChange={(e) => setInterviewForm({ ...interviewForm, company: e.target.value })}
                        placeholder="Acme Inc"
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Role
                    </label>
                    <input
                      type="text"
                      value={interviewForm.role}
                      onChange={(e) => setInterviewForm({ ...interviewForm, role: e.target.value })}
                      placeholder="Product Manager"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Date *
                      </label>
                      <input
                        type="date"
                        value={interviewForm.date}
                        onChange={(e) => setInterviewForm({ ...interviewForm, date: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Time
                      </label>
                      <input
                        type="time"
                        value={interviewForm.time}
                        onChange={(e) => setInterviewForm({ ...interviewForm, time: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Notes
                    </label>
                    <textarea
                      value={interviewForm.notes}
                      onChange={(e) => setInterviewForm({ ...interviewForm, notes: e.target.value })}
                      placeholder="Prep notes, questions to ask..."
                      rows="4"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none text-gray-900"
                    />
                  </div>
                </div>

                <div className="p-6 border-t border-gray-200 flex items-center justify-end space-x-3 sticky bottom-0 bg-white">
                  <button
                    onClick={() => setShowInterviewModal(false)}
                    className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleScheduleInterview}
                    disabled={!interviewForm.name.trim() || !interviewForm.date}
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                  >
                    Schedule Interview
                  </button>
                </div>
              </motion.div>
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
                className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full"
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
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none text-gray-900"
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
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 font-medium"
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
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 font-medium"
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
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 font-medium"
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
                    className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddSignal}
                    disabled={!signalForm.signal.trim()}
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium"
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
                className="bg-white rounded-2xl shadow-2xl max-w-md w-full"
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
                            className="w-full p-4 text-left border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all"
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
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
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
                    className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  {selectedMetric && (
                    <button
                      onClick={handleUpdateMetric}
                      className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:shadow-lg transition-all font-medium"
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
                className="bg-white rounded-2xl shadow-2xl max-w-md w-full"
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
                  <div className="bg-purple-50 p-4 rounded-lg">
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
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 resize-none text-gray-900"
                    />
                  </div>
                </div>

                <div className="p-6 border-t border-gray-200 flex items-center justify-end space-x-3">
                  <button
                    onClick={() => {
                      setShowStepModal(false);
                      setSelectedStep(null);
                    }}
                    className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
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
                    className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl hover:shadow-lg transition-all font-medium"
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
                className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
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

