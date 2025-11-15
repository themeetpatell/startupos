import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, Lightbulb, Target, TrendingUp, AlertTriangle,
  CheckCircle, X, Clock, Sparkles, Zap, Scale, GitBranch,
  Plus, BarChart3, DollarSign, Users, Award, MessageSquare, 
  ThumbsUp, ThumbsDown, ChevronDown, ChevronUp, Info, 
  Shuffle, Activity, Eye, Filter, Calendar, ArrowRight,
  Coins, TrendingDown, PieChart, LineChart, Layers,
  Link, Copy, Share, Download, Edit, Trash2, MoreVertical,
  Play, AlertCircle, CheckSquare, Square, Timer, Percent,
  FileText, BookOpen, Rocket, Map, Network, Boxes, Crosshair
} from 'lucide-react';

const DecisionIntelligence = () => {
  const [activeView, setActiveView] = useState('active');
  const [decisions, setDecisions] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedDecision, setSelectedDecision] = useState(null);
  const [showPlaybook, setShowPlaybook] = useState(false);
  const [selectedPlaybook, setSelectedPlaybook] = useState(null);
  
  const [decisionForm, setDecisionForm] = useState({
    title: '',
    context: '',
    category: 'hiring',
    deadline: '',
    options: [{ id: 1, title: '', impact: {} }],
    constraints: {},
    linkedMetrics: []
  });

  const [startupMetrics, setStartupMetrics] = useState({
    mrr: 35000,
    growth: 18,
    runway: 14,
    burn: 25000,
    cac: 425,
    ltv: 2400,
    retention: 65,
    teamSize: 5
  });

  useEffect(() => {
    const mockDecisions = [
      {
        id: 1,
        title: 'Hire first sales person',
        context: 'Current MRR: $35K, Target: $50K. Closing 35% of demos myself.',
        category: 'hiring',
        status: 'active',
        createdAt: '2025-01-15',
        deadline: '2025-02-15',
        priority: 'high',
        stakeholders: ['CEO', 'CFO', 'CTO'],
        linkedMetrics: ['mrr', 'runway', 'burn'],
        options: [
          {
            id: 1,
            title: 'Hire now at $35K MRR',
            impact: { revenue: '+25%', runway: '-3mo', cost: '$120K/yr', risk: 'medium' },
            votes: 2,
            confidence: 65
      },
      {
        id: 2,
            title: 'Wait until $50K MRR',
            impact: { revenue: '+10%', runway: '0mo', cost: '$0', risk: 'low' },
            votes: 1,
            confidence: 75
      },
      {
        id: 3,
            title: 'Hire SDR first ($60K)',
            impact: { revenue: '+15%', runway: '-1.5mo', cost: '$60K/yr', risk: 'low' },
            votes: 5,
            confidence: 87,
            recommended: true
          }
        ],
        aiAnalysis: {
          recommendation: 'Hire SDR first ($60K)',
          confidence: 87,
          reasoning: [
            'MRR 30% below threshold',
            'Strong founder close rate',
            'Runway impact manageable'
          ],
          financialModel: {
            breakEvenMonths: 6,
            expectedROI: '2.5x',
            riskLevel: 'low'
          },
          similarDecisions: 12,
          successRate: 78
        },
        dependencies: ['Reach $40K MRR', 'Document sales process'],
        comments: [
          { user: 'John (CEO)', text: 'Option 3 feels right', time: '2h ago', avatar: 'J' },
          { user: 'Sarah (CFO)', text: 'Need runway model', time: '1h ago', avatar: 'S' }
        ]
      },
      {
        id: 2,
        title: 'Pivot to B2B or stay B2C',
        context: 'Getting 4.5x more qualified leads from B2B. ACV: B2B $2,400 vs B2C $120',
        category: 'strategy',
        status: 'decided',
        decision: 'Pivot to B2B',
        createdAt: '2025-01-10',
        decidedAt: '2025-01-12',
        priority: 'critical',
        outcome: 'positive',
        results: 'First B2B customer at $4,800/yr in 3 weeks',
        aiAnalysis: {
          recommendation: 'Full pivot to B2B',
          confidence: 94,
          reasoning: ['4.5x higher intent', '20x higher ACV', 'Team B2B experience']
        }
      }
    ];
    setDecisions(mockDecisions);
  }, []);

  const playbooks = [
    {
      id: 'hiring',
      title: 'First Sales Hire',
      category: 'hiring',
      icon: Users,
      description: 'When and how to hire your first sales person',
      triggers: ['MRR > $40K', 'Founder closing rate > 30%', 'CAC:LTV > 1:3'],
      steps: [
        'Document current sales process',
        'Define ideal sales hire profile',
        'Set clear success metrics',
        'Create 90-day ramp plan'
      ],
      considerations: [
        'SDR vs AE decision',
        'Runway impact calculation',
        'Sales compensation structure',
        'Onboarding timeline'
      ],
      timingGuidance: 'Hire when MRR is $40-50K with 15%+ monthly growth',
      commonMistakes: [
        'Hiring too early (before PMF)',
        'Wrong compensation structure',
        'No defined sales process',
        'Unrealistic ramp expectations'
      ]
    },
    {
      id: 'pricing',
      title: 'Pricing Strategy Change',
      category: 'product',
      icon: DollarSign,
      description: 'How to optimize your pricing model',
      triggers: ['Low conversion rate', 'High churn', 'Expansion opportunity'],
      steps: [
        'Analyze current pricing performance',
        'Survey customers on willingness to pay',
        'Design new pricing tiers',
        'A/B test new pricing'
      ]
    },
    {
      id: 'pivot',
      title: 'Pivot or Persevere',
      category: 'strategy',
      icon: GitBranch,
      description: 'Critical framework for pivot decisions',
      triggers: ['Stalled growth >3 months', 'Retention < 40%', 'Market feedback shift'],
      timingGuidance: 'Consider pivot when key metrics stall for 3+ months despite iterations'
    },
    {
      id: 'fundraising',
      title: 'Fundraising Timing',
      category: 'fundraising',
      icon: Coins,
      description: 'When to raise and how much',
      triggers: ['Runway < 12 months', 'Strong growth metrics', 'Market opportunity'],
      timingGuidance: 'Start when you have 12+ months runway and strong momentum'
    },
    {
      id: 'expansion',
      title: 'Market Expansion',
      category: 'strategy',
      icon: Map,
      description: 'Geographic or segment expansion decisions',
      triggers: ['Strong product-market fit', 'Established operations', 'Demand signals']
    }
  ];

  const categories = [
    { id: 'all', label: 'All', count: decisions.length },
    { id: 'hiring', label: 'Hiring', count: decisions.filter(d => d.category === 'hiring').length, color: 'blue' },
    { id: 'strategy', label: 'Strategy', count: decisions.filter(d => d.category === 'strategy').length, color: 'purple' },
    { id: 'fundraising', label: 'Fundraising', count: decisions.filter(d => d.category === 'fundraising').length, color: 'green' },
    { id: 'product', label: 'Product', count: decisions.filter(d => d.category === 'product').length, color: 'orange' },
    { id: 'operations', label: 'Operations', count: decisions.filter(d => d.category === 'operations').length, color: 'pink' }
  ];

  const handleCreateFromPlaybook = (playbook) => {
    setSelectedPlaybook(playbook);
    setDecisionForm({
      ...decisionForm,
      title: playbook.title,
      category: playbook.category
    });
    setShowPlaybook(false);
    setShowCreateModal(true);
  };

  const handleQuickCreate = () => {
    setSelectedPlaybook(null);
    setShowCreateModal(true);
  };

  const handleSaveDecision = () => {
    const newDecision = {
      id: Date.now(),
      ...decisionForm,
      status: 'active',
      createdAt: new Date().toISOString().split('T')[0],
      comments: [],
      linkedMetrics: decisionForm.linkedMetrics
    };
      setDecisions([newDecision, ...decisions]);
    setShowCreateModal(false);
    setDecisionForm({
      title: '',
      context: '',
      category: 'hiring',
      deadline: '',
      options: [{ id: 1, title: '', impact: {} }],
      constraints: {},
      linkedMetrics: []
    });
  };

  const addOption = () => {
    setDecisionForm({
      ...decisionForm,
      options: [...decisionForm.options, { id: decisionForm.options.length + 1, title: '', impact: {} }]
    });
  };

  const calculateImpact = (decision) => {
    if (!decision.options) return null;
    const recommended = decision.options.find(o => o.recommended);
    return recommended || decision.options[0];
  };

  const getStatusColor = (status) => {
    const colors = {
      active: 'bg-blue-100 text-blue-700 border-blue-200',
      review: 'bg-purple-100 text-purple-700 border-purple-200',
      decided: 'bg-green-100 text-green-700 border-green-200',
      archived: 'bg-gray-100 text-gray-700 border-gray-200'
    };
    return colors[status] || colors.active;
  };

  const getPriorityColor = (priority) => {
    const colors = {
      critical: 'bg-red-100 text-red-700 border-red-200',
      high: 'bg-orange-100 text-orange-700 border-orange-200',
      medium: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      low: 'bg-blue-100 text-blue-700 border-blue-200'
    };
    return colors[priority] || colors.medium;
  };

  const renderMetricsWidget = () => (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-5 border border-blue-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-gray-900 flex items-center space-x-2">
          <Activity size={18} className="text-blue-600" />
          <span>Live Metrics</span>
        </h3>
        <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">
          Connect Data
        </button>
      </div>
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: 'MRR', value: `$${(startupMetrics.mrr / 1000).toFixed(0)}K`, change: `+${startupMetrics.growth}%`, positive: true },
          { label: 'Runway', value: `${startupMetrics.runway}mo`, change: 'Healthy', positive: true },
          { label: 'Burn', value: `$${(startupMetrics.burn / 1000).toFixed(0)}K`, change: '/mo', positive: false },
          { label: 'LTV:CAC', value: `${(startupMetrics.ltv / startupMetrics.cac).toFixed(1)}x`, change: 'Good', positive: true }
        ].map((metric, idx) => (
          <div key={idx} className="bg-white p-3 rounded-lg border border-gray-200">
            <div className="text-xs text-gray-600 mb-1">{metric.label}</div>
            <div className="text-lg font-bold text-gray-900">{metric.value}</div>
            <div className={`text-xs font-medium ${metric.positive ? 'text-green-600' : 'text-gray-600'}`}>
              {metric.change}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-[1600px] mx-auto">
        
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <Brain className="text-white" size={24} />
                </div>
                <span>Decision Intelligence</span>
              </h1>
              <p className="text-gray-600 mt-1">Data-driven decision-making operating system</p>
            </div>
            
            <div className="flex items-center space-x-3">
            <button
                onClick={() => setShowPlaybook(true)}
                className="flex items-center space-x-2 px-4 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-xl hover:border-gray-400 transition-all font-medium"
              >
                <BookOpen size={18} />
                <span>Decision Playbooks</span>
              </button>
              <button
                onClick={handleQuickCreate}
                className="flex items-center space-x-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all font-medium shadow-sm hover:shadow-lg"
            >
              <Plus size={20} />
                <span>New Decision</span>
            </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-6 gap-3 mb-6">
            {[
              { label: 'Active', value: decisions.filter(d => d.status === 'active').length, icon: Activity, color: 'blue' },
              { label: 'This Week', value: '3', icon: Clock, color: 'purple' },
              { label: 'Decided', value: decisions.filter(d => d.status === 'decided').length, icon: CheckCircle, color: 'green' },
              { label: 'Avg Time', value: '3.2 days', icon: Timer, color: 'orange' },
              { label: 'Success Rate', value: '92%', icon: Award, color: 'yellow' },
              { label: 'Team Input', value: '127', icon: Users, color: 'pink' }
            ].map((stat, idx) => {
              const StatIcon = stat.icon;
              return (
              <motion.div
                  key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-white p-4 rounded-xl shadow-sm border border-gray-200"
              >
                  <div className="flex items-center space-x-2 mb-1">
                    <StatIcon size={14} className={`text-${stat.color}-600`} />
                    <span className="text-xs font-medium text-gray-600">{stat.label}</span>
                  </div>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              </motion.div>
              );
            })}
          </div>

          {/* Metrics Widget */}
          {renderMetricsWidget()}
        </div>

        {/* View Tabs */}
        <div className="bg-white rounded-xl border border-gray-200 p-1.5 shadow-sm mb-6">
          <nav className="flex space-x-1">
            {[
              { id: 'active', label: 'Active Decisions', icon: Activity, count: decisions.filter(d => d.status === 'active').length },
              { id: 'decided', label: 'Decided', icon: CheckCircle, count: decisions.filter(d => d.status === 'decided').length },
              { id: 'insights', label: 'Insights & Learning', icon: Lightbulb },
              { id: 'templates', label: 'Templates', icon: FileText }
            ].map(tab => {
              const TabIcon = tab.icon;
              return (
              <button
                key={tab.id}
                  onClick={() => setActiveView(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg font-medium text-sm transition-all ${
                    activeView === tab.id
                    ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <TabIcon size={16} />
                  <span>{tab.label}</span>
                  {tab.count !== undefined && (
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                      activeView === tab.id ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-600'
                    }`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Category Filter */}
        {activeView === 'active' && (
          <div className="flex items-center space-x-2 mb-6">
            {categories.map(cat => (
              <button
                key={cat.id}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  cat.id === 'all'
                    ? 'bg-gray-900 text-white'
                    : `bg-white border border-gray-200 text-gray-700 hover:border-${cat.color}-300`
                }`}
              >
                {cat.label}
                {cat.count > 0 && (
                  <span className="ml-2 px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-xs">
                    {cat.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        )}

        {/* Active Decisions View */}
        {activeView === 'active' && (
          <div className="space-y-4">
            {decisions.filter(d => d.status === 'active').map(decision => {
              const recommendedOption = calculateImpact(decision);
              
              return (
            <motion.div
                  key={decision.id}
                  layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-xl font-bold text-gray-900">{decision.title}</h3>
                          <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold border ${getPriorityColor(decision.priority)}`}>
                            {decision.priority}
                          </span>
                          <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold border ${getStatusColor(decision.status)}`}>
                            {decision.status}
                          </span>
                          </div>
                        <p className="text-gray-600 mb-3">{decision.context}</p>
                        
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span className="flex items-center space-x-1">
                            <Calendar size={14} />
                            <span>Created {decision.createdAt}</span>
                          </span>
                          {decision.deadline && (
                            <span className="flex items-center space-x-1 text-orange-600">
                              <Clock size={14} />
                              <span>Due {decision.deadline}</span>
                            </span>
                          )}
                          {decision.stakeholders && (
                            <span className="flex items-center space-x-1">
                              <Users size={14} />
                              <span>{decision.stakeholders.length} stakeholders</span>
                            </span>
                          )}
                          {decision.linkedMetrics && decision.linkedMetrics.length > 0 && (
                            <span className="flex items-center space-x-1 text-blue-600">
                              <Link size={14} />
                              <span>{decision.linkedMetrics.length} metrics linked</span>
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <MoreVertical size={18} className="text-gray-400" />
                      </button>
                    </div>

                    {/* AI Recommendation */}
                    {decision.aiAnalysis && (
                      <div className="bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-5 mb-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center space-x-2">
                            <Brain className="text-blue-600" size={20} />
                            <h4 className="font-bold text-gray-900">AI Recommendation</h4>
                          </div>
                          <div className="flex items-center space-x-3">
                            <span className="text-sm font-semibold text-blue-700 bg-blue-100 px-3 py-1 rounded-lg">
                              {decision.aiAnalysis.confidence}% confidence
                            </span>
                            {decision.aiAnalysis.successRate && (
                              <span className="text-xs text-gray-600">
                                {decision.aiAnalysis.successRate}% success rate ({decision.aiAnalysis.similarDecisions} similar)
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="bg-white p-4 rounded-lg mb-3">
                          <div className="text-lg font-bold text-gray-900 mb-2">
                            {decision.aiAnalysis.recommendation}
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {decision.aiAnalysis.reasoning.map((reason, idx) => (
                              <span key={idx} className="text-sm bg-green-50 text-green-700 px-3 py-1 rounded-lg border border-green-200">
                                ✓ {reason}
                              </span>
                            ))}
                          </div>
                        </div>

                        {decision.aiAnalysis.financialModel && (
                          <div className="grid grid-cols-3 gap-3">
                            <div className="bg-white p-3 rounded-lg text-center">
                              <div className="text-xs text-gray-600 mb-1">Break-even</div>
                              <div className="text-lg font-bold text-gray-900">
                                {decision.aiAnalysis.financialModel.breakEvenMonths}mo
                              </div>
                            </div>
                            <div className="bg-white p-3 rounded-lg text-center">
                              <div className="text-xs text-gray-600 mb-1">Expected ROI</div>
                              <div className="text-lg font-bold text-green-600">
                                {decision.aiAnalysis.financialModel.expectedROI}
                              </div>
                            </div>
                            <div className="bg-white p-3 rounded-lg text-center">
                              <div className="text-xs text-gray-600 mb-1">Risk Level</div>
                              <div className={`text-lg font-bold ${
                                decision.aiAnalysis.financialModel.riskLevel === 'low' ? 'text-green-600' :
                                decision.aiAnalysis.financialModel.riskLevel === 'medium' ? 'text-yellow-600' :
                                'text-red-600'
                              }`}>
                                {decision.aiAnalysis.financialModel.riskLevel}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Options */}
                    {decision.options && decision.options.length > 0 && (
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-900 mb-3">Options</h4>
                        <div className="space-y-3">
                          {decision.options.map(option => (
                            <div
                              key={option.id}
                              className={`p-4 rounded-xl border-2 transition-all ${
                                option.recommended
                                  ? 'bg-blue-50 border-blue-300'
                                  : 'bg-gray-50 border-gray-200 hover:border-gray-300'
                              }`}
                            >
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <div className="flex items-center space-x-3 mb-2">
                                    <h5 className="font-bold text-gray-900">{option.title}</h5>
                                    {option.recommended && (
                                      <span className="px-2 py-1 bg-blue-600 text-white text-xs font-semibold rounded-lg">
                                        Recommended
                                      </span>
                                    )}
                                    {option.confidence && (
                                      <span className="text-xs text-gray-600">
                                        {option.confidence}% confidence
                                      </span>
                                    )}
                        </div>
                                  
                                  {option.impact && Object.keys(option.impact).length > 0 && (
                                    <div className="flex items-center space-x-4 text-sm">
                                      {Object.entries(option.impact).map(([key, value]) => (
                                        <span key={key} className="flex items-center space-x-1">
                                          <span className="text-gray-600 capitalize">{key}:</span>
                                          <span className="font-semibold text-gray-900">{value}</span>
                                        </span>
                            ))}
                          </div>
                        )}
                      </div>
                                
                                {option.votes !== undefined && (
                                  <div className="flex items-center space-x-2 px-3 py-1.5 bg-white rounded-lg border border-gray-200">
                                    <ThumbsUp size={14} className="text-green-600" />
                                    <span className="font-bold text-gray-900">{option.votes}</span>
                    </div>
                                )}
                        </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}

                    {/* Dependencies */}
                    {decision.dependencies && decision.dependencies.length > 0 && (
                      <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
                        <h4 className="font-semibold text-gray-900 mb-2 flex items-center space-x-2">
                          <AlertCircle size={16} className="text-yellow-600" />
                          <span>Dependencies</span>
                        </h4>
                        <div className="space-y-1">
                          {decision.dependencies.map((dep, idx) => (
                            <div key={idx} className="flex items-center space-x-2 text-sm">
                              <Square size={14} className="text-yellow-600" />
                              <span className="text-gray-700">{dep}</span>
                </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Comments */}
                    {decision.comments && decision.comments.length > 0 && (
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                          <MessageSquare size={16} />
                          <span>Team Discussion ({decision.comments.length})</span>
                        </h4>
                        <div className="space-y-2">
                          {decision.comments.slice(0, 2).map(comment => (
                            <div key={comment.time} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold text-sm">
                                {comment.avatar}
                  </div>
                              <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-1">
                                  <span className="font-semibold text-gray-900 text-sm">{comment.user}</span>
                                  <span className="text-xs text-gray-500">{comment.time}</span>
                </div>
                                <p className="text-sm text-gray-700">{comment.text}</p>
              </div>
                            </div>
                          ))}
                          {decision.comments.length > 2 && (
                            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                              View all {decision.comments.length} comments →
                            </button>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div className="flex items-center space-x-2">
                        <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all text-sm font-medium">
                          <MessageSquare size={16} />
                          <span>Comment</span>
                        </button>
                        <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all text-sm font-medium">
                          <ThumbsUp size={16} />
                          <span>Vote</span>
                        </button>
                        <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all text-sm font-medium">
                          <Share size={16} />
                          <span>Share</span>
                        </button>
                  </div>
                      
                      <div className="flex items-center space-x-2">
                  <button
                          onClick={() => setSelectedDecision(decision)}
                          className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all text-sm font-medium"
                        >
                          <Eye size={16} />
                          <span>View Details</span>
                        </button>
                        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all text-sm font-medium">
                          Mark as Decided
                  </button>
                </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Decided View */}
        {activeView === 'decided' && (
                <div className="space-y-4">
            {decisions.filter(d => d.status === 'decided').map(decision => (
              <div key={decision.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-start justify-between">
                      <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <CheckCircle className="text-green-600" size={20} />
                          <h3 className="text-lg font-bold text-gray-900">{decision.title}</h3>
                      <span className="px-2.5 py-1 bg-green-100 text-green-700 rounded-lg text-xs font-semibold">
                        Decided
                          </span>
                        </div>
                    <p className="text-gray-600 mb-3">{decision.context}</p>
                    
                    <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg mb-3">
                      <div className="text-sm text-gray-600 mb-1">Decision Made</div>
                      <div className="text-lg font-bold text-gray-900">{decision.decision}</div>
                      </div>

                    {decision.outcome && (
                      <div className={`p-4 rounded-lg border ${
                        decision.outcome === 'positive'
                          ? 'bg-green-50 border-green-200'
                          : decision.outcome === 'negative'
                          ? 'bg-red-50 border-red-200'
                          : 'bg-yellow-50 border-yellow-200'
                      }`}>
                        <div className="flex items-center space-x-2 mb-2">
                          <Award className={decision.outcome === 'positive' ? 'text-green-600' : 'text-yellow-600'} size={18} />
                          <span className="font-semibold text-gray-900">Outcome</span>
                      </div>
                        <p className="text-sm text-gray-700">{decision.results}</p>
                    </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Insights View */}
        {activeView === 'insights' && (
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Decision Patterns</h3>
              <div className="space-y-4">
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-green-900">Fast Decisions (Type 2)</span>
                    <span className="text-sm text-green-700">2.1 days avg</span>
                  </div>
                  <p className="text-sm text-green-700">You're great at making reversible decisions quickly</p>
                </div>
                
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-yellow-900">Hiring Decisions</span>
                    <span className="text-sm text-yellow-700">7.5 days avg</span>
                  </div>
                  <p className="text-sm text-yellow-700">Consider creating a hiring framework to speed up</p>
                </div>

                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-blue-900">Team Alignment</span>
                    <span className="text-sm text-blue-700">92% consensus</span>
                  </div>
                  <p className="text-sm text-blue-700">Strong team alignment on major decisions</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Success Metrics</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Decision Quality</span>
                    <span className="text-lg font-bold text-green-600">9.2/10</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-green-600 rounded-full" style={{ width: '92%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Success Rate</span>
                    <span className="text-lg font-bold text-blue-600">92%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 rounded-full" style={{ width: '92%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Team Satisfaction</span>
                    <span className="text-lg font-bold text-purple-600">4.8/5</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-600 rounded-full" style={{ width: '96%' }} />
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-3">Recent Wins</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-sm">
                      <CheckCircle size={14} className="text-green-600" />
                      <span className="text-gray-700">B2B pivot: +$4.8K ARR in 3 weeks</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <CheckCircle size={14} className="text-green-600" />
                      <span className="text-gray-700">Pricing change: +40% conversion</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Templates View */}
        {activeView === 'templates' && (
          <div className="grid grid-cols-2 gap-6">
            {playbooks.map(playbook => {
              const PlaybookIcon = playbook.icon;
              return (
                <motion.div
                  key={playbook.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md hover:border-blue-200 transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-4 flex-1">
                      <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <PlaybookIcon className="text-blue-600" size={28} />
                        </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{playbook.title}</h3>
                        <p className="text-sm text-gray-600 mb-3">{playbook.description}</p>
                        </div>
                            </div>
                  </div>

                  {playbook.triggers && (
                    <div className="mb-4">
                      <div className="text-xs font-semibold text-gray-700 mb-2 flex items-center space-x-2">
                        <Zap size={14} className="text-orange-600" />
                        <span>When to use:</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {playbook.triggers.map((trigger, idx) => (
                          <span key={idx} className="text-xs bg-orange-50 text-orange-700 px-3 py-1 rounded-lg border border-orange-200">
                            {trigger}
                          </span>
                          ))}
                        </div>
                      </div>
                    )}

                  {playbook.timingGuidance && (
                    <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex items-start space-x-2">
                        <Clock size={16} className="text-blue-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="text-xs font-semibold text-blue-900 mb-1">Timing Guidance</div>
                          <p className="text-sm text-blue-700">{playbook.timingGuidance}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {playbook.steps && (
                    <div className="mb-4">
                      <div className="text-xs font-semibold text-gray-700 mb-2">Key Steps:</div>
                      <div className="space-y-2">
                        {playbook.steps.slice(0, 3).map((step, idx) => (
                          <div key={idx} className="flex items-start space-x-2 text-sm text-gray-700">
                            <CheckCircle size={14} className="text-green-600 mt-0.5 flex-shrink-0" />
                            <span>{step}</span>
                          </div>
                        ))}
                        </div>
                      </div>
                    )}

                  {playbook.commonMistakes && (
                    <div className="mb-4 p-3 bg-red-50 rounded-lg border border-red-200">
                      <div className="flex items-start space-x-2">
                        <AlertTriangle size={14} className="text-red-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="text-xs font-semibold text-red-900 mb-1">Common Mistakes</div>
                          <div className="text-xs text-red-700 space-y-1">
                            {playbook.commonMistakes.slice(0, 2).map((mistake, idx) => (
                              <div key={idx}>• {mistake}</div>
                            ))}
                          </div>
                        </div>
                      </div>
                </div>
              )}

                  <button
                    onClick={() => handleCreateFromPlaybook(playbook)}
                    className="w-full flex items-center justify-center space-x-2 px-5 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all font-medium shadow-sm hover:shadow"
                  >
                    <Plus size={18} />
                    <span>Use This Template</span>
                    <ArrowRight size={16} />
                  </button>
            </motion.div>
              );
            })}
          </div>
          )}

        {/* Playbook Modal */}
        <AnimatePresence>
          {showPlaybook && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
              onClick={() => setShowPlaybook(false)}
            >
                  <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto"
              >
                <div className="p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Decision Playbooks</h2>
                      <p className="text-gray-600 mt-1">Proven frameworks for common startup decisions</p>
                    </div>
                    <button
                      onClick={() => setShowPlaybook(false)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <X size={24} />
                    </button>
              </div>
                </div>

                <div className="p-6">
                  <div className="grid grid-cols-2 gap-4">
                    {playbooks.map(playbook => {
                      const PlaybookIcon = playbook.icon;
                      return (
                        <div
                          key={playbook.id}
                          className="p-5 border-2 border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-md transition-all cursor-pointer"
                          onClick={() => handleCreateFromPlaybook(playbook)}
                        >
                          <div className="flex items-start space-x-4 mb-4">
                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                              <PlaybookIcon className="text-blue-600" size={24} />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-bold text-gray-900 mb-1">{playbook.title}</h3>
                              <p className="text-sm text-gray-600">{playbook.description}</p>
                            </div>
                          </div>

                          {playbook.triggers && (
                            <div className="mb-3">
                              <div className="text-xs font-semibold text-gray-700 mb-2">When to use:</div>
                              <div className="flex flex-wrap gap-1">
                                {playbook.triggers.slice(0, 2).map((trigger, idx) => (
                                  <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                                    {trigger}
                                  </span>
                                ))}
                </div>
                            </div>
                          )}

                          {playbook.timingGuidance && (
                            <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                              <div className="text-xs font-semibold text-blue-900 mb-1">Timing Guidance</div>
                              <p className="text-xs text-blue-700">{playbook.timingGuidance}</p>
                </div>
                          )}

                          <button className="mt-4 w-full flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all text-sm font-medium">
                            <span>Use This Playbook</span>
                            <ArrowRight size={16} />
                          </button>
                        </div>
                      );
                    })}
                </div>
              </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Create Decision Modal */}
        <AnimatePresence>
          {showCreateModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
              onClick={() => setShowCreateModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
              >
                <div className="p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">New Decision</h2>
                      {selectedPlaybook && (
                        <p className="text-sm text-blue-600 mt-1">Using: {selectedPlaybook.title} Playbook</p>
                      )}
                    </div>
                  <button
                      onClick={() => setShowCreateModal(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X size={24} />
                  </button>
                  </div>
                </div>

                <div className="p-6 space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Decision Title *</label>
                    <input
                      type="text"
                      value={decisionForm.title}
                      onChange={(e) => setDecisionForm({ ...decisionForm, title: e.target.value })}
                      placeholder="e.g., Should we hire our first sales person?"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Context & Details</label>
                    <textarea
                      value={decisionForm.context}
                      onChange={(e) => setDecisionForm({ ...decisionForm, context: e.target.value })}
                      placeholder="Current situation, relevant metrics, constraints..."
                      rows="4"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none text-gray-900"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                  <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                    <select
                      value={decisionForm.category}
                      onChange={(e) => setDecisionForm({ ...decisionForm, category: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
                    >
                      <option value="hiring">Hiring</option>
                        <option value="strategy">Strategy</option>
                      <option value="fundraising">Fundraising</option>
                        <option value="product">Product</option>
                        <option value="operations">Operations</option>
                    </select>
                  </div>

                  <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Decision Deadline</label>
                      <input
                        type="date"
                        value={decisionForm.deadline}
                        onChange={(e) => setDecisionForm({ ...decisionForm, deadline: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900"
                      />
                  </div>
                  </div>

                <div>
                    <div className="flex items-center justify-between mb-3">
                      <label className="block text-sm font-semibold text-gray-700">Options to Consider</label>
                  <button
                        onClick={addOption}
                        className="flex items-center space-x-1 px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-medium"
                      >
                        <Plus size={16} />
                        <span>Add Option</span>
                  </button>
                </div>
                    
                    <div className="space-y-3">
                      {decisionForm.options.map((option, idx) => (
                        <div key={option.id} className="border-2 border-gray-200 rounded-lg p-4">
                          <input
                            type="text"
                            value={option.title}
                            onChange={(e) => {
                              const newOptions = [...decisionForm.options];
                              newOptions[idx].title = e.target.value;
                              setDecisionForm({ ...decisionForm, options: newOptions });
                            }}
                            placeholder={`Option ${idx + 1}`}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900"
                          />
                  </div>
                      ))}
                    </div>
                </div>

                  {selectedPlaybook && selectedPlaybook.considerations && (
                    <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl">
                      <h4 className="font-semibold text-blue-900 mb-3">Key Considerations</h4>
                      <div className="space-y-2">
                        {selectedPlaybook.considerations.map((item, idx) => (
                          <div key={idx} className="flex items-start space-x-2">
                            <Info size={16} className="text-blue-600 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-blue-800">{item}</span>
                    </div>
                        ))}
                      </div>
                    </div>
                  )}
                  </div>

                <div className="p-6 border-t border-gray-200 bg-gray-50 flex items-center justify-end space-x-3">
                  <button
                    onClick={() => setShowCreateModal(false)}
                    className="px-5 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveDecision}
                    disabled={!decisionForm.title.trim()}
                    className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                  >
                    Create & Get AI Analysis
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

export default DecisionIntelligence;
