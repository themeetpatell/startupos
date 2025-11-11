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
  const [activeTab, setActiveTab] = useState('insights');
  const [selectedSegment, setSelectedSegment] = useState('all');
  
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

  const interviews = [
    {
      id: 1,
      participant: 'Sarah Chen',
      company: 'TechCorp',
      date: '2025-01-18',
      duration: 45,
      status: 'completed',
      tags: ['feature-request', 'pricing', 'integration'],
      sentiment: 'positive',
      keyInsights: [
        'Loves core features',
        'Wants API access',
        'Price is acceptable'
      ],
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
      keyInsights: [
        'Struggled with initial setup',
        'Wants better documentation',
        'Happy after onboarding'
      ],
      transcript: 'Available'
    }
  ];

  const feedback = [
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
      description: 'Would love a dark mode option for late night work',
      user: 'emma@example.com',
      date: '2025-01-18',
      status: 'planned',
      priority: 'medium',
      sentiment: 'positive'
    },
    {
      id: 3,
      source: 'in-app',
      type: 'praise',
      title: 'Love the new dashboard!',
      description: 'The redesign is beautiful and so much easier to use',
      user: 'alex@example.com',
      date: '2025-01-17',
      status: 'closed',
      priority: 'low',
      sentiment: 'very-positive'
    }
  ];

  const segments = [
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-6">
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
            
            <button className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl hover:shadow-lg transition-all">
              <Plus size={20} />
              <span>New Interview</span>
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
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white p-4 rounded-xl shadow-sm border border-gray-200"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className={`w-10 h-10 bg-${stat.color}-100 rounded-lg flex items-center justify-center`}>
                      <Icon size={20} className={`text-${stat.color}-600`} />
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
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md'
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
                              <TrendingUp size={16} className="text-red-600" />
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
                              <div key={idx} className="text-sm text-gray-700 italic border-l-2 border-indigo-400 pl-3">
                                {quote}
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="bg-indigo-50 p-4 rounded-lg">
                          <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center space-x-2">
                            <Brain size={16} className="text-indigo-600" />
                            <span>AI Recommendations:</span>
                          </h4>
                          <ul className="space-y-1">
                            {insight.recommendations.map((rec, idx) => (
                              <li key={idx} className="text-sm text-gray-700 flex items-start space-x-2">
                                <ChevronRight size={14} className="text-indigo-600 mt-0.5 flex-shrink-0" />
                                <span>{rec}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3 pt-4 border-t border-gray-200">
                        <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700">
                          View All Feedback →
                        </button>
                        <button className="text-sm font-medium text-gray-600 hover:text-gray-700">
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
                          <div className="w-12 h-12 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full flex items-center justify-center text-white font-bold">
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
                              <span className="text-indigo-600 mt-1">•</span>
                              <span>{insight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex items-center space-x-3">
                        <button className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm font-medium">
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
                {feedback.map((item, index) => {
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
                              'bg-green-100 text-green-700'
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
                            <span className="font-medium">{item.status}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
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
                              <CheckCircle size={14} className="text-indigo-600 mt-0.5 flex-shrink-0" />
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
                                className="bg-gradient-to-r from-indigo-500 to-purple-500 h-3 rounded-full" 
                                style={{ width: `${segment.retention}%` }}
                              ></div>
                            </div>
                          </div>
                          <span className="text-lg font-bold text-gray-900">{segment.retention}%</span>
                        </div>
                      </div>
                    </div>

                    <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700">
                      View All Users in Segment →
                    </button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CustomerIntelligence;

