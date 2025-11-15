import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, MessageCircle, Video, Mic, FileText, TrendingUp,
  Heart, ThumbsUp, ThumbsDown, Star, AlertCircle, CheckCircle,
  Plus, Play, Pause, Download, Share, Search, Filter, Eye,
  Brain, Zap, Target, BarChart3, PieChart, Activity, Clock,
  Calendar, Send, Edit, Trash2, X, ChevronRight, Sparkles,
  Tag, Hash, AtSign, Lightbulb, Award, TrendingDown, RefreshCw
} from 'lucide-react';

const CustomerIntelligence = () => {
  const [activeTab, setActiveTab] = useState('interviews');
  const [selectedSegment, setSelectedSegment] = useState('all');
  
  // State management
  const [interviews, setInterviews] = useState([]);
  const [feedbackItems, setFeedbackItems] = useState([]);
  const [segments, setSegments] = useState([]);
  const [surveys, setSurveys] = useState([]);
  
  // Modal states
  const [showInterviewModal, setShowInterviewModal] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [showSegmentModal, setShowSegmentModal] = useState(false);
  const [showSurveyModal, setShowSurveyModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  
  // Form states
  const [interviewForm, setInterviewForm] = useState({
    participant: '',
    company: '',
    date: '',
    duration: '',
    tags: []
  });
  
  const [feedbackForm, setFeedbackForm] = useState({
    source: 'intercom',
    type: 'feature',
    title: '',
    description: '',
    user: ''
  });
  
  const [segmentForm, setSegmentForm] = useState({
    name: '',
    description: '',
    criteria: '',
    size: ''
  });
  
  const [surveyForm, setSurveyForm] = useState({
    title: '',
    type: 'nps',
    questions: []
  });
  
  // Helper function to get full Tailwind classes for colors
  const getColorClasses = (color) => {
    const colorMap = {
      purple: { bg: 'bg-purple-100', text: 'text-purple-600' },
      blue: { bg: 'bg-blue-100', text: 'text-blue-600' },
      green: { bg: 'bg-green-100', text: 'text-green-600' },
      orange: { bg: 'bg-orange-100', text: 'text-orange-600' },
      red: { bg: 'bg-red-100', text: 'text-red-600' },
      yellow: { bg: 'bg-yellow-100', text: 'text-yellow-600' },
      indigo: { bg: 'bg-indigo-100', text: 'text-indigo-600' }
    };
    return colorMap[color] || { bg: 'bg-gray-100', text: 'text-gray-600' };
  };

  const tabs = [
    { id: 'insights', label: 'AI Insights', icon: Brain, description: 'Auto-generated' },
    { id: 'interviews', label: 'Interviews', icon: MessageCircle, description: 'Customer calls' },
    { id: 'feedback', label: 'Feedback Hub', icon: Lightbulb, description: 'All feedback' },
    { id: 'segments', label: 'Segments', icon: Users, description: 'Customer groups' },
    { id: 'surveys', label: 'Surveys', icon: FileText, description: 'Create & analyze' }
  ];

  const insights = [
    {
      id: 1,
      type: 'pain-point',
      title: 'Top Pain Point: Slow Export Speed',
      description: 'Mentioned by 23 customers in last 30 days',
      impact: 'high',
      sentiment: 'negative',
      trend: 'increasing',
      quotes: [
        '"Export takes forever, I just gave up"',
        '"Can you please speed up the export?"',
        '"This is my biggest frustration with the tool"'
      ],
      recommendations: [
        'Prioritize export speed optimization',
        'Add progress indicator during export',
        'Allow background exports'
      ]
    },
    {
      id: 2,
      type: 'feature-request',
      title: 'Most Requested: Slack Integration',
      description: '18 requests in last 30 days',
      impact: 'high',
      sentiment: 'positive',
      trend: 'stable',
      quotes: [
        '"Would love to get notifications in Slack"',
        '"Slack integration would be perfect"',
        '"Any plans for Slack?"'
      ],
      recommendations: [
        'Add to roadmap for next quarter',
        'Estimated 2-3 weeks dev time',
        'Could increase activation by 15%'
      ]
    },
    {
      id: 3,
      type: 'delight',
      title: 'Users Love: Bulk Edit Feature',
      description: '42 positive mentions',
      impact: 'medium',
      sentiment: 'very-positive',
      trend: 'increasing',
      quotes: [
        '"Bulk edit saves me so much time!"',
        '"This feature is a game-changer"',
        '"Exactly what I needed"'
      ],
      recommendations: [
        'Promote this feature more in onboarding',
        'Create tutorial video',
        'Add to marketing messaging'
      ]
    }
  ];

  const segmentList = [
    {
      id: 1,
      name: 'Power Users',
      description: 'Use product daily, high engagement',
      count: 142,
      growth: '+15%',
      characteristics: [
        'Login 5+ times/week',
        'Use 80%+ of features',
        'High NPS (9-10)'
      ],
      value: 'high',
      retention: 95
    },
    {
      id: 2,
      name: 'At-Risk Users',
      description: 'Declining usage, churn risk',
      count: 38,
      growth: '+22%',
      characteristics: [
        'Haven\'t logged in 7+ days',
        'Support tickets unresolved',
        'Low feature adoption'
      ],
      value: 'medium',
      retention: 30
    },
    {
      id: 3,
      name: 'New Users',
      description: 'Signed up in last 30 days',
      count: 89,
      growth: '+45%',
      characteristics: [
        'In onboarding flow',
        'Trial period',
        'High support needs'
      ],
      value: 'potential',
      retention: 65
    }
  ];

  const getImpactColor = (impact) => {
    switch (impact) {
      case 'high': return 'bg-red-100 text-red-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'low': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getSentimentIcon = (sentiment) => {
    switch (sentiment) {
      case 'very-positive': return { icon: Heart, color: 'text-green-600' };
      case 'positive': return { icon: ThumbsUp, color: 'text-green-600' };
      case 'mixed': return { icon: AlertCircle, color: 'text-yellow-600' };
      case 'negative': return { icon: ThumbsDown, color: 'text-red-600' };
      default: return { icon: AlertCircle, color: 'text-gray-600' };
    }
  };

  // Initialize mock data
  useEffect(() => {
    if (interviews.length === 0) {
      setInterviews([
        {
          id: 1,
          participant: 'Sarah Chen',
          company: 'TechCorp',
          date: '2025-01-18',
          duration: 45,
          status: 'completed',
          tags: ['feature-request', 'pricing', 'integration'],
          sentiment: 'positive',
          keyInsights: ['Loves core features', 'Wants API access', 'Price is acceptable'],
          transcript: 'Available'
        },
        {
          id: 2,
          participant: 'Michael Rodriguez',
          company: 'StartupX',
          date: '2025-01-17',
          duration: 32,
          status: 'completed',
          tags: ['pain-point', 'onboarding'],
          sentiment: 'mixed',
          keyInsights: ['Struggled with initial setup', 'Wants better documentation', 'Happy after onboarding'],
          transcript: 'Available'
        }
      ]);
    }

    if (feedbackItems.length === 0) {
      setFeedbackItems([
        {
          id: 1,
          source: 'intercom',
          type: 'bug',
          title: 'Export button not working on mobile',
          description: 'When I try to export on my iPhone, nothing happens',
          user: 'john@example.com',
          date: '2025-01-19',
          status: 'open',
          priority: 'high',
          sentiment: 'negative'
        },
        {
          id: 2,
          source: 'email',
          type: 'feature',
          title: 'Please add dark mode',
          description: 'Would love a dark mode option for night time use',
          user: 'emma@example.com',
          date: '2025-01-18',
          status: 'planned',
          priority: 'medium',
          sentiment: 'positive'
        }
      ]);
    }

    if (segments.length === 0) {
      setSegments([
        {
          id: 1,
          name: 'Power Users',
          description: 'Use product daily, high engagement',
          count: 234,
          growth: '+12%',
          characteristics: ['Login 5+ times/week', 'Use 3+ features', 'Referred others', 'High NPS (9-10)'],
          value: 'high',
          retention: 94
        },
        {
          id: 2,
          name: 'At Risk',
          description: 'Declining usage, churn risk',
          count: 89,
          growth: '+23%',
          characteristics: ['No login in 14 days', 'Single feature use', 'Support tickets', 'Low engagement'],
          value: 'medium',
          retention: 34
        },
        {
          id: 3,
          name: 'New Users',
          description: 'Recently onboarded, in trial',
          count: 156,
          growth: '+45%',
          characteristics: ['In onboarding flow', 'Trial period', 'High support needs', 'Exploring features'],
          value: 'potential',
          retention: 65
        }
      ]);
    }

    if (surveys.length === 0) {
      setSurveys([
        {
          id: 1,
          title: 'Q1 2025 NPS Survey',
          type: 'nps',
          status: 'active',
          sent: 1200,
          responses: 847,
          score: 42
        },
        {
          id: 2,
          title: 'Feature Feedback Survey',
          type: 'csat',
          status: 'completed',
          sent: 500,
          responses: 342,
          score: 4.2
        }
      ]);
    }
  }, []);

  // Interview Handlers
  const handleScheduleInterview = () => {
    if (!interviewForm.participant) return;

    const newInterview = {
      id: Date.now(),
      ...interviewForm,
      status: 'scheduled',
      sentiment: 'neutral',
      keyInsights: []
    };

    setInterviews(prev => [...prev, newInterview]);
    setInterviewForm({ participant: '', company: '', date: '', duration: '', tags: [] });
    setShowInterviewModal(false);
  };

  const handleDeleteInterview = (id) => {
    setInterviews(prev => prev.filter(item => item.id !== id));
  };

  // Feedback Handlers
  const handleAddFeedback = () => {
    if (!feedbackForm.title) return;

    const newFeedback = {
      id: Date.now(),
      ...feedbackForm,
      date: new Date().toISOString().split('T')[0],
      status: 'open',
      sentiment: 'neutral'
    };

    setFeedbackItems(prev => [...prev, newFeedback]);
    setFeedbackForm({ source: 'intercom', type: 'feature', title: '', description: '', user: '' });
    setShowFeedbackModal(false);
  };

  const handleUpdateFeedbackStatus = (id, status) => {
    setFeedbackItems(prev => prev.map(item =>
      item.id === id ? { ...item, status } : item
    ));
  };

  const handleDeleteFeedback = (id) => {
    setFeedbackItems(prev => prev.filter(item => item.id !== id));
  };

  // Segment Handlers
  const handleAddSegment = () => {
    if (!segmentForm.name) return;

    const newSegment = {
      id: Date.now(),
      name: segmentForm.name,
      description: segmentForm.description || 'Custom segment',
      count: parseInt(segmentForm.size) || 0,
      growth: '+0%',
      characteristics: segmentForm.criteria.split(',').map(c => c.trim()).filter(c => c),
      value: 'medium',
      retention: 50
    };

    setSegments(prev => [...prev, newSegment]);
    setSegmentForm({ name: '', criteria: '', size: '', description: '' });
    setShowSegmentModal(false);
  };

  const handleDeleteSegment = (id) => {
    setSegments(prev => prev.filter(item => item.id !== id));
  };

  // Survey Handlers
  const handleCreateSurvey = () => {
    if (!surveyForm.title) return;

    const newSurvey = {
      id: Date.now(),
      ...surveyForm,
      status: 'draft',
      sent: 0,
      responses: 0,
      score: 0
    };

    setSurveys(prev => [...prev, newSurvey]);
    setSurveyForm({ title: '', type: 'nps', questions: [] });
    setShowSurveyModal(false);
  };

  const handleLaunchSurvey = (id) => {
    setSurveys(prev => prev.map(survey =>
      survey.id === id ? { ...survey, status: 'active' } : survey
    ));
  };

  const handleDeleteSurvey = (id) => {
    setSurveys(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
                <Users className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Customer Intelligence</h1>
                <p className="text-gray-600">Centralize all customer research</p>
              </div>
            </div>
            
            <button 
              onClick={() => {
                if (activeTab === 'interviews') setShowInterviewModal(true);
                else if (activeTab === 'feedback') setShowFeedbackModal(true);
                else if (activeTab === 'segments') setShowSegmentModal(true);
                else if (activeTab === 'surveys') setShowSurveyModal(true);
              }}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl hover:shadow-lg transition-all"
            >
              <Plus size={20} />
              <span>
                {activeTab === 'interviews' ? 'Schedule Interview' :
                 activeTab === 'feedback' ? 'Add Feedback' :
                 activeTab === 'segments' ? 'Create Segment' :
                 activeTab === 'surveys' ? 'Create Survey' : 'Add New'}
              </span>
            </button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-4 gap-4">
            {[
              { label: 'Total Insights', value: '247', icon: Sparkles, color: 'purple', trend: '+12%' },
              { label: 'Interviews', value: '34', icon: MessageCircle, color: 'blue', trend: '+5' },
              { label: 'Feedback Items', value: '89', icon: Lightbulb, color: 'green', trend: '+23' },
              { label: 'Customer Segments', value: '8', icon: Users, color: 'indigo', trend: '+2' }
            ].map((stat, index) => {
              const Icon = stat.icon;
              const colors = getColorClasses(stat.color);
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white p-4 rounded-xl shadow-sm border border-gray-200"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className={`w-10 h-10 ${colors.bg} rounded-lg flex items-center justify-center`}>
                      <Icon size={20} className={colors.text} />
                    </div>
                    <span className="text-xs font-medium text-green-600">{stat.trend}</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Navigation Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <div className="flex space-x-1">
            {tabs.filter(tab => tab.id !== 'insights').map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-3 border-b-2 transition-all relative ${
                    activeTab === tab.id
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                  }`}
                >
                  <Icon size={18} className={activeTab === tab.id ? 'text-blue-600' : 'text-gray-500'} />
                  <div className="flex flex-col items-start">
                    <span className={`font-semibold text-sm ${activeTab === tab.id ? 'text-blue-600' : 'text-gray-900'}`}>
                      {tab.label}
                    </span>
                    <span className="text-xs text-gray-500">
                      {tab.description}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'insights' && (
            <motion.div
              key="insights"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="space-y-6">
                {insights.map((insight, index) => {
                  const sentiment = getSentimentIcon(insight.sentiment);
                  const SentimentIcon = sentiment.icon;
                  
                  return (
                    <motion.div
                      key={insight.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <SentimentIcon size={20} className={sentiment.color} />
                            <h3 className="text-lg font-bold text-gray-900">{insight.title}</h3>
                            <span className={`px-2 py-1 text-xs font-medium rounded ${getImpactColor(insight.impact)}`}>
                              {insight.impact} impact
                            </span>
                            {insight.trend === 'increasing' && (
                              <TrendingUp size={16} className="text-black" />
                            )}
                          </div>
                          <p className="text-gray-600">{insight.description}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="text-sm font-semibold text-gray-900 mb-2">Customer Quotes:</h4>
                          <div className="space-y-2">
                            {insight.quotes.map((quote, idx) => (
                              <div key={idx} className="text-sm text-gray-700 italic border-l-2 border-gray-200 pl-3">
                                {quote}
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="bg-white p-4 rounded-lg">
                          <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center space-x-2">
                            <Brain size={16} className="text-blue-600" />
                            <span>AI Recommendations:</span>
                          </h4>
                          <ul className="space-y-1">
                            {insight.recommendations.map((rec, idx) => (
                              <li key={idx} className="text-sm text-gray-700 flex items-start space-x-2">
                                <ChevronRight size={14} className="text-blue-600 mt-0.5 flex-shrink-0" />
                                <span>{rec}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3 pt-4 border-t border-gray-200">
                        <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
                          View All Feedback →
                        </button>
                        <button className="text-sm font-medium text-gray-600 hover:text-gray-900">
                          Add to Roadmap
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
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
                {interviews.map((interview, index) => {
                  const sentiment = getSentimentIcon(interview.sentiment);
                  const SentimentIcon = sentiment.icon;
                  
                  return (
                    <motion.div
                      key={interview.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                            {interview.participant.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-gray-900">{interview.participant}</h3>
                            <div className="text-sm text-gray-600">{interview.company}</div>
                            <div className="flex items-center space-x-3 mt-2">
                              <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded">
                                {interview.status}
                              </span>
                              <span className="text-xs text-gray-500 flex items-center space-x-1">
                                <Calendar size={12} />
                                <span>{interview.date}</span>
                              </span>
                              <span className="text-xs text-gray-500 flex items-center space-x-1">
                                <Clock size={12} />
                                <span>{interview.duration} min</span>
                              </span>
                            </div>
                          </div>
                        </div>

                        <SentimentIcon size={24} className={sentiment.color} />
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {interview.tags.map((tag, idx) => (
                          <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg mb-4">
                        <h4 className="text-sm font-semibold text-gray-900 mb-2">Key Insights:</h4>
                        <ul className="space-y-1">
                          {interview.keyInsights.map((insight, idx) => (
                            <li key={idx} className="text-sm text-gray-700 flex items-start space-x-2">
                              <span className="text-blue-600 mt-1">•</span>
                              <span>{insight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex items-center space-x-3">
                        <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium shadow-sm">
                          <Eye size={16} />
                          <span>View Transcript</span>
                        </button>
                        <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm font-medium">
                          <Video size={16} />
                          <span>Watch Recording</span>
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {activeTab === 'feedback' && (
            <motion.div
              key="feedback"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="space-y-4">
                {feedbackItems.map((item, index) => {
                  const sentiment = getSentimentIcon(item.sentiment);
                  const SentimentIcon = sentiment.icon;
                  
                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <span className={`px-2 py-1 text-xs font-medium rounded ${
                              item.type === 'bug' ? 'bg-red-100 text-red-700' :
                              item.type === 'feature' ? 'bg-blue-100 text-blue-700' :
                              item.type === 'praise' ? 'bg-green-100 text-green-700' :
                              'bg-orange-100 text-orange-700'
                            }`}>
                              {item.type}
                            </span>
                            <span className={`px-2 py-1 text-xs font-medium rounded ${
                              item.priority === 'high' ? 'bg-red-100 text-red-700' :
                              item.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-gray-100 text-gray-700'
                            }`}>
                              {item.priority}
                            </span>
                            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded">
                              {item.source}
                            </span>
                            <SentimentIcon size={16} className={sentiment.color} />
                          </div>
                          <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                          <p className="text-gray-600 mb-3">{item.description}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span>{item.user}</span>
                            <span>•</span>
                            <span>{item.date}</span>
                            <span>•</span>
                            <select
                              value={item.status}
                              onChange={(e) => handleUpdateFeedbackStatus(item.id, e.target.value)}
                              className="font-medium bg-transparent border-0 cursor-pointer hover:text-gray-700"
                            >
                              <option value="open">Open</option>
                              <option value="planned">Planned</option>
                              <option value="in-progress">In Progress</option>
                              <option value="closed">Closed</option>
                            </select>
                          </div>
                        </div>
                        <button
                          onClick={() => handleDeleteFeedback(item.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg ml-4"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </motion.div>
                  );
                })}

                {feedbackItems.length === 0 && (
                  <div className="text-center py-12 bg-white rounded-xl border-2 border-dashed border-gray-300">
                    <Lightbulb className="mx-auto mb-4 text-gray-400" size={48} />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No Feedback Yet</h3>
                    <p className="text-gray-600 mb-4">Start collecting customer feedback</p>
                    <button
                      onClick={() => setShowFeedbackModal(true)}
                      className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:shadow-lg"
                    >
                      <Plus size={20} />
                      <span>Add Feedback</span>
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {activeTab === 'segments' && (
            <motion.div
              key="segments"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="grid grid-cols-1 gap-6">
                {segments.map((segment, index) => (
                  <motion.div
                    key={segment.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{segment.name}</h3>
                        <p className="text-gray-600">{segment.description}</p>
                      </div>
                        <div className="text-right">
                          <div className="text-3xl font-bold text-indigo-600">{segment.count}</div>
                          <div className="text-sm text-green-600 font-medium">{segment.growth}</div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <h4 className="text-sm font-semibold text-gray-900 mb-2">Characteristics:</h4>
                        <ul className="space-y-1">
                          {segment.characteristics.map((char, idx) => (
                            <li key={idx} className="text-sm text-gray-700 flex items-start space-x-2">
                              <CheckCircle size={14} className="text-blue-600 mt-0.5 flex-shrink-0" />
                              <span>{char}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold text-gray-900 mb-2">Retention Rate:</h4>
                        <div className="flex items-center space-x-3">
                          <div className="flex-1">
                            <div className="w-full bg-gray-200 rounded-full h-3">
                              <div 
                                className="bg-blue-600 h-3 rounded-full" 
                                style={{ width: `${segment.retention}%` }}
                              ></div>
                            </div>
                          </div>
                          <span className="text-lg font-bold text-gray-900">{segment.retention}%</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
                        View All Users in Segment →
                      </button>
                      <button
                        onClick={() => handleDeleteSegment(segment.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </motion.div>
                ))}

                {segments.length === 0 && (
                  <div className="text-center py-12 bg-white rounded-xl border-2 border-dashed border-gray-300">
                    <Users className="mx-auto mb-4 text-gray-400" size={48} />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No Segments Yet</h3>
                    <p className="text-gray-600 mb-4">Create customer segments to better understand your users</p>
                    <button
                      onClick={() => setShowSegmentModal(true)}
                      className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:shadow-lg"
                    >
                      <Plus size={20} />
                      <span>Create Segment</span>
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {activeTab === 'surveys' && (
            <motion.div
              key="surveys"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="grid grid-cols-1 gap-6">
                {surveys.map((survey, index) => (
                  <motion.div
                    key={survey.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{survey.title}</h3>
                        <div className="flex items-center space-x-3">
                          <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                            survey.status === 'active' ? 'bg-green-100 text-green-700' :
                            survey.status === 'draft' ? 'bg-gray-100 text-gray-700' :
                            'bg-blue-100 text-blue-700'
                          }`}>
                            {survey.status}
                          </span>
                          <span className="px-3 py-1 bg-purple-100 text-purple-700 text-sm font-medium rounded-full">
                            {survey.type.toUpperCase()}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-indigo-600">{survey.score || 0}</div>
                        <div className="text-sm text-gray-600">Score</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-gray-900">{survey.sent || 0}</div>
                        <div className="text-sm text-gray-600">Sent</div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-gray-900">{survey.responses || 0}</div>
                        <div className="text-sm text-gray-600">Responses</div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">
                          {survey.sent > 0 ? ((survey.responses / survey.sent) * 100).toFixed(0) : 0}%
                        </div>
                        <div className="text-sm text-gray-600">Response Rate</div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      {survey.status === 'draft' && (
                        <button
                          onClick={() => handleLaunchSurvey(survey.id)}
                          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium shadow-sm"
                        >
                          <Play size={16} />
                          <span>Launch Survey</span>
                        </button>
                      )}
                      <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium">
                        <Eye size={16} />
                        <span>View Results</span>
                      </button>
                      <button
                        onClick={() => handleDeleteSurvey(survey.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </motion.div>
                ))}

                {surveys.length === 0 && (
                  <div className="text-center py-12 bg-white rounded-xl border-2 border-dashed border-gray-300">
                    <FileText className="mx-auto mb-4 text-gray-400" size={48} />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No Surveys Yet</h3>
                    <p className="text-gray-600 mb-4">Create your first survey to gather customer insights</p>
                    <button
                      onClick={() => setShowSurveyModal(true)}
                      className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:shadow-lg"
                    >
                      <Plus size={20} />
                      <span>Create Survey</span>
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Interview Modal */}
        {showInterviewModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl p-8 max-w-md w-full"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Schedule Interview</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  value={interviewForm.participant}
                  onChange={(e) => setInterviewForm({ ...interviewForm, participant: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none"
                  placeholder="Participant Name"
                />
                <input
                  type="text"
                  value={interviewForm.company}
                  onChange={(e) => setInterviewForm({ ...interviewForm, company: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none"
                  placeholder="Company"
                />
                <input
                  type="date"
                  value={interviewForm.date}
                  onChange={(e) => setInterviewForm({ ...interviewForm, date: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none"
                />
                <input
                  type="number"
                  value={interviewForm.duration}
                  onChange={(e) => setInterviewForm({ ...interviewForm, duration: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none"
                  placeholder="Duration (minutes)"
                />
              </div>
              <div className="flex space-x-3 mt-6">
                <button
                  onClick={() => setShowInterviewModal(false)}
                  className="flex-1 px-6 py-3 border-2 border-gray-200 rounded-xl font-medium hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleScheduleInterview}
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
                >
                  Schedule
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Feedback Modal */}
        {showFeedbackModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl p-8 max-w-md w-full"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Add Feedback</h3>
              <div className="space-y-4">
                <select
                  value={feedbackForm.source}
                  onChange={(e) => setFeedbackForm({ ...feedbackForm, source: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none"
                >
                  <option value="intercom">Intercom</option>
                  <option value="email">Email</option>
                  <option value="survey">Survey</option>
                  <option value="call">Call</option>
                </select>
                <select
                  value={feedbackForm.type}
                  onChange={(e) => setFeedbackForm({ ...feedbackForm, type: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none"
                >
                  <option value="feature">Feature Request</option>
                  <option value="bug">Bug Report</option>
                  <option value="praise">Praise</option>
                  <option value="complaint">Complaint</option>
                </select>
                <input
                  type="text"
                  value={feedbackForm.title}
                  onChange={(e) => setFeedbackForm({ ...feedbackForm, title: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none"
                  placeholder="Title"
                />
                <textarea
                  value={feedbackForm.description}
                  onChange={(e) => setFeedbackForm({ ...feedbackForm, description: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none"
                  rows="3"
                  placeholder="Description"
                />
                <input
                  type="email"
                  value={feedbackForm.user}
                  onChange={(e) => setFeedbackForm({ ...feedbackForm, user: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none"
                  placeholder="User Email"
                />
              </div>
              <div className="flex space-x-3 mt-6">
                <button
                  onClick={() => setShowFeedbackModal(false)}
                  className="flex-1 px-6 py-3 border-2 border-gray-200 rounded-xl font-medium hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddFeedback}
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
                >
                  Add Feedback
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Segment Modal */}
        {showSegmentModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl p-8 max-w-md w-full"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Create Segment</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  value={segmentForm.name}
                  onChange={(e) => setSegmentForm({ ...segmentForm, name: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none"
                  placeholder="Segment Name"
                />
                <input
                  type="text"
                  value={segmentForm.description}
                  onChange={(e) => setSegmentForm({ ...segmentForm, description: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none"
                  placeholder="Description"
                />
                <input
                  type="text"
                  value={segmentForm.criteria}
                  onChange={(e) => setSegmentForm({ ...segmentForm, criteria: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none"
                  placeholder="Characteristics (comma-separated)"
                />
                <input
                  type="number"
                  value={segmentForm.size}
                  onChange={(e) => setSegmentForm({ ...segmentForm, size: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none"
                  placeholder="Estimated Size"
                />
              </div>
              <div className="flex space-x-3 mt-6">
                <button
                  onClick={() => setShowSegmentModal(false)}
                  className="flex-1 px-6 py-3 border-2 border-gray-200 rounded-xl font-medium hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddSegment}
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
                >
                  Create Segment
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Survey Modal */}
        {showSurveyModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl p-8 max-w-md w-full"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Create Survey</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  value={surveyForm.title}
                  onChange={(e) => setSurveyForm({ ...surveyForm, title: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none"
                  placeholder="Survey Title"
                />
                <select
                  value={surveyForm.type}
                  onChange={(e) => setSurveyForm({ ...surveyForm, type: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none"
                >
                  <option value="nps">NPS Survey</option>
                  <option value="csat">CSAT Survey</option>
                  <option value="ces">Customer Effort Score</option>
                  <option value="custom">Custom Survey</option>
                </select>
              </div>
              <div className="flex space-x-3 mt-6">
                <button
                  onClick={() => setShowSurveyModal(false)}
                  className="flex-1 px-6 py-3 border-2 border-gray-200 rounded-xl font-medium hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateSurvey}
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
                >
                  Create Survey
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerIntelligence;

