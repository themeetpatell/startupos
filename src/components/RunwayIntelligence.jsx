import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  DollarSign, TrendingUp, TrendingDown, AlertTriangle, CheckCircle,
  Clock, Calendar, Target, Zap, Brain, RefreshCw, Plus, Edit,
  Trash2, X, Save, ChevronDown, ChevronUp, BarChart3, PieChart,
  ArrowUp, ArrowDown, Flame, Droplet, Wind, Gauge, Activity,
  Shield, Eye, EyeOff, Download, Share, Settings, Lightbulb,
  Users, Briefcase, CreditCard, TrendingDown as TrendDown
} from 'lucide-react';

const RunwayIntelligence = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [timeRange, setTimeRange] = useState('12m');
  const [showScenarioModal, setShowScenarioModal] = useState(false);
  const [scenarios, setScenarios] = useState([]);
  const [selectedScenario, setSelectedScenario] = useState(null);

  useEffect(() => {
    const mockScenarios = [
      {
        id: 1,
        name: 'Current Plan',
        type: 'baseline',
        runway: 14.2,
        monthlyBurn: 42000,
        cashBalance: 595000,
        projectedCash: [595, 553, 511, 469, 427, 385, 343, 301, 259, 217, 175, 133, 91],
        assumptions: {
          revenue: { current: 35000, growth: 18 },
          expenses: { current: 77000, growth: 5 },
          hiring: [{ month: 6, role: 'Sales', cost: 120000 }]
        }
      },
      {
        id: 2,
        name: 'Aggressive Growth',
        type: 'optimistic',
        runway: 11.5,
        monthlyBurn: 58000,
        cashBalance: 595000,
        projectedCash: [595, 537, 479, 421, 363, 305, 247, 189, 131, 73, 15, -43],
        assumptions: {
          revenue: { current: 35000, growth: 25 },
          expenses: { current: 93000, growth: 8 },
          hiring: [
            { month: 3, role: 'Sales', cost: 120000 },
            { month: 4, role: 'Engineer', cost: 140000 },
            { month: 6, role: 'Marketer', cost: 90000 }
          ]
        }
      },
      {
        id: 3,
        name: 'Conservative',
        type: 'conservative',
        runway: 18.7,
        monthlyBurn: 32000,
        cashBalance: 595000,
        projectedCash: [595, 563, 531, 499, 467, 435, 403, 371, 339, 307, 275, 243, 211],
        assumptions: {
          revenue: { current: 35000, growth: 12 },
          expenses: { current: 67000, growth: 2 },
          hiring: []
        }
      }
    ];
    setScenarios(mockScenarios);
    setSelectedScenario(mockScenarios[0]);
  }, []);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Gauge, description: 'Runway health' },
    { id: 'forecast', label: 'Forecast', icon: TrendingUp, description: '12-month projection' },
    { id: 'scenarios', label: 'Scenarios', icon: BarChart3, description: 'What-if analysis' },
    { id: 'decisions', label: 'Smart Decisions', icon: Brain, description: 'AI advisor' },
    { id: 'optimize', label: 'Optimize', icon: Zap, description: 'Cost savings' }
  ];

  const decisions = [
    {
      id: 1,
      question: 'Should I hire a sales person now?',
      recommendation: 'Wait 2 months',
      impact: { runway: -3, monthly: +5000 },
      confidence: 82,
      reasoning: 'Your runway would drop to 11mo. Wait until $45K MRR for safer hire.'
    },
    {
      id: 2,
      question: 'Should I raise funding now?',
      recommendation: 'Wait 3 months',
      impact: { runway: +12, valuation: '+40%' },
      confidence: 78,
      reasoning: 'With 14mo runway, you have time. Your metrics will be 40% better in 3 months.'
    },
    {
      id: 3,
      question: 'Can I afford this $500/mo tool?',
      recommendation: 'Yes, but negotiate',
      impact: { runway: -0.1, annual: -6000 },
      confidence: 90,
      reasoning: 'ROI is positive. Try to negotiate annual plan for 20% discount.'
    }
  ];

  const costOptimizations = [
    {
      id: 1,
      category: 'Software',
      item: 'Zoom Pro',
      current: 149,
      potential: 0,
      savings: 149,
      recommendation: 'Switch to Google Meet (included in Workspace)',
      impact: 'low',
      effort: 'easy'
    },
    {
      id: 2,
      category: 'Infrastructure',
      item: 'AWS',
      current: 2400,
      potential: 1600,
      savings: 800,
      recommendation: 'Enable auto-scaling, use reserved instances',
      impact: 'high',
      effort: 'medium'
    },
    {
      id: 3,
      category: 'Marketing',
      item: 'Google Ads',
      current: 5000,
      potential: 3500,
      savings: 1500,
      recommendation: 'CAC is $450, LTV is $2400. Reduce spend by 30%, focus on organic',
      impact: 'high',
      effort: 'easy'
    },
    {
      id: 4,
      category: 'Software',
      item: 'Hubspot',
      current: 890,
      potential: 0,
      savings: 890,
      recommendation: 'Your usage is low. Switch to free CRM for 6 months',
      impact: 'medium',
      effort: 'medium'
    }
  ];

  const metrics = [
    {
      label: 'Runway',
      value: '14.2 months',
      subtext: 'Based on current burn',
      trend: 'stable',
      icon: Clock,
      color: 'yellow',
      status: 'warning'
    },
    {
      label: 'Cash Balance',
      value: '$595,000',
      subtext: '+$28K this month',
      trend: 'up',
      icon: DollarSign,
      color: 'green',
      status: 'good'
    },
    {
      label: 'Monthly Burn',
      value: '$42,000',
      subtext: 'Decreased 8% vs last mo',
      trend: 'down',
      icon: Flame,
      color: 'green',
      status: 'good'
    },
    {
      label: 'Break-even',
      value: '8.3 months',
      subtext: 'At current growth rate',
      trend: 'improving',
      icon: Target,
      color: 'blue',
      status: 'neutral'
    }
  ];

  const alerts = [
    {
      id: 1,
      type: 'warning',
      title: 'Time to start fundraising conversations',
      message: 'With 14mo runway, optimal time to raise is in 3 months. Start building relationships now.',
      action: 'View fundraising plan',
      priority: 'high'
    },
    {
      id: 2,
      type: 'info',
      title: 'Burn rate decreased',
      message: 'Your monthly burn dropped 8% this month. Great cost management!',
      action: 'See breakdown',
      priority: 'low'
    },
    {
      id: 3,
      type: 'success',
      title: 'Optimization opportunity',
      message: 'We identified $3.3K/month in potential savings with low effort.',
      action: 'Review recommendations',
      priority: 'medium'
    }
  ];

  const getRunwayColor = (months) => {
    if (months >= 18) return 'text-green-600 bg-green-100';
    if (months >= 12) return 'text-yellow-600 bg-yellow-100';
    if (months >= 6) return 'text-orange-600 bg-orange-100';
    return 'text-red-600 bg-red-100';
  };

  const getAlertIcon = (type) => {
    switch (type) {
      case 'warning': return AlertTriangle;
      case 'success': return CheckCircle;
      case 'info': return Lightbulb;
      default: return AlertTriangle;
    }
  };

  const getAlertColor = (type) => {
    switch (type) {
      case 'warning': return 'border-yellow-200 bg-yellow-50';
      case 'success': return 'border-green-200 bg-green-50';
      case 'info': return 'border-blue-200 bg-blue-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-green-50 p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-green-500 rounded-xl flex items-center justify-center">
                <Gauge className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Runway Intelligence</h1>
                <p className="text-gray-600">Never run out of cash unexpectedly</p>
              </div>
            </div>
            
            <button className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-yellow-500 to-green-500 text-white rounded-xl hover:shadow-lg transition-all">
              <Plus size={20} />
              <span>Add Scenario</span>
            </button>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-4 gap-4">
            {metrics.map((metric, index) => {
              const Icon = metric.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white p-4 rounded-xl shadow-sm border border-gray-200"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className={`w-10 h-10 bg-${metric.color}-100 rounded-lg flex items-center justify-center`}>
                      <Icon size={20} className={`text-${metric.color}-600`} />
                    </div>
                    {metric.trend === 'up' && <TrendingUp size={16} className="text-green-600" />}
                    {metric.trend === 'down' && <TrendingDown size={16} className="text-green-600" />}
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{metric.value}</div>
                  <div className="text-sm text-gray-600">{metric.label}</div>
                  <div className="text-xs text-gray-500 mt-1">{metric.subtext}</div>
                </motion.div>
              );
            })}
          </div>

          {/* Alerts */}
          <div className="mt-6 space-y-3">
            {alerts.map((alert) => {
              const Icon = getAlertIcon(alert.type);
              return (
                <motion.div
                  key={alert.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`p-4 rounded-xl border-2 ${getAlertColor(alert.type)}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <Icon size={20} className="mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-gray-900">{alert.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{alert.message}</p>
                      </div>
                    </div>
                    <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
                      {alert.action} →
                    </button>
                  </div>
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
                      ? 'bg-gradient-to-r from-yellow-500 to-green-500 text-white shadow-md'
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
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="grid grid-cols-2 gap-6">
                {/* Runway Gauge */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Runway Status</h3>
                  <div className="flex items-center justify-center mb-6">
                    <div className="relative w-48 h-48">
                      <svg className="transform -rotate-90 w-48 h-48">
                        <circle
                          cx="96"
                          cy="96"
                          r="88"
                          stroke="#f3f4f6"
                          strokeWidth="16"
                          fill="none"
                        />
                        <circle
                          cx="96"
                          cy="96"
                          r="88"
                          stroke="url(#gradient)"
                          strokeWidth="16"
                          fill="none"
                          strokeDasharray={`${(14.2 / 24) * 553} 553`}
                          strokeLinecap="round"
                        />
                        <defs>
                          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#eab308" />
                            <stop offset="100%" stopColor="#22c55e" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <div className="text-4xl font-bold text-gray-900">14.2</div>
                        <div className="text-sm text-gray-600">months</div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Target: 18+ months</span>
                      <span className="font-medium text-yellow-600">78% of target</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-gradient-to-r from-yellow-500 to-green-500 h-2 rounded-full" style={{ width: '78%' }}></div>
                    </div>
                  </div>
                </div>

                {/* Cash Flow */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Monthly Cash Flow</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-gray-600">Revenue</span>
                        <span className="text-sm font-bold text-green-600">+$35,000</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-gray-600">Expenses</span>
                        <span className="text-sm font-bold text-red-600">-$77,000</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-red-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                      </div>
                    </div>
                    <div className="pt-4 border-t border-gray-200">
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-900">Net Burn</span>
                        <span className="font-bold text-orange-600">-$42,000/mo</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-start space-x-2">
                      <Lightbulb size={18} className="text-blue-600 mt-0.5" />
                      <div className="text-sm text-gray-700">
                        <span className="font-medium">Insight:</span> You're on track to break-even in 8.3 months at current 18% MoM growth.
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expense Breakdown */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Expense Breakdown</h3>
                  <div className="space-y-3">
                    {[
                      { label: 'Salaries', amount: 45000, percent: 58, color: 'blue' },
                      { label: 'Marketing', amount: 12000, percent: 16, color: 'purple' },
                      { label: 'Infrastructure', amount: 8000, percent: 10, color: 'green' },
                      { label: 'Software', amount: 7000, percent: 9, color: 'yellow' },
                      { label: 'Other', amount: 5000, percent: 7, color: 'gray' }
                    ].map((expense, index) => (
                      <div key={index}>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-gray-600">{expense.label}</span>
                          <span className="text-sm font-medium text-gray-900">
                            ${expense.amount.toLocaleString()} ({expense.percent}%)
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className={`bg-${expense.color}-500 h-2 rounded-full`} style={{ width: `${expense.percent}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Fundraising Timeline */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Fundraising Timeline</h3>
                  <div className="relative">
                    <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                    <div className="space-y-6">
                      {[
                        { label: 'Start Conversations', date: 'Now', status: 'current', color: 'blue' },
                        { label: 'Active Pitching', date: 'Month 3', status: 'upcoming', color: 'purple' },
                        { label: 'Target Close', date: 'Month 5', status: 'upcoming', color: 'green' },
                        { label: 'Cash Out (no raise)', date: 'Month 14', status: 'danger', color: 'red' }
                      ].map((milestone, index) => (
                        <div key={index} className="relative flex items-start space-x-4">
                          <div className={`w-12 h-12 bg-${milestone.color}-100 rounded-full flex items-center justify-center border-4 border-white z-10`}>
                            <Calendar size={20} className={`text-${milestone.color}-600`} />
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{milestone.label}</div>
                            <div className="text-sm text-gray-600">{milestone.date}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'decisions' && (
            <motion.div
              key="decisions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="space-y-4">
                {decisions.map((decision, index) => (
                  <motion.div
                    key={decision.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 mb-2">{decision.question}</h3>
                        <div className="flex items-center space-x-3">
                          <span className="px-3 py-1 bg-gradient-to-r from-yellow-500 to-green-500 text-white text-sm font-medium rounded-full">
                            {decision.recommendation}
                          </span>
                          <span className="text-sm text-gray-600">
                            {decision.confidence}% confidence
                          </span>
                        </div>
                      </div>
                      <Brain className="text-purple-600" size={24} />
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg mb-4">
                      <div className="text-sm text-gray-700">{decision.reasoning}</div>
                    </div>

                    <div className="flex items-center space-x-6">
                      <div>
                        <div className="text-xs text-gray-600">Runway Impact</div>
                        <div className={`text-lg font-bold ${decision.impact.runway > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {decision.impact.runway > 0 ? '+' : ''}{decision.impact.runway} months
                        </div>
                      </div>
                      {decision.impact.monthly && (
                        <div>
                          <div className="text-xs text-gray-600">Monthly Impact</div>
                          <div className="text-lg font-bold text-gray-900">
                            {decision.impact.monthly > 0 ? '+' : ''}{decision.impact.monthly}
                          </div>
                        </div>
                      )}
                      {decision.impact.valuation && (
                        <div>
                          <div className="text-xs text-gray-600">Valuation Impact</div>
                          <div className="text-lg font-bold text-green-600">
                            {decision.impact.valuation}
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'optimize' && (
            <motion.div
              key="optimize"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Potential Savings</h3>
                    <p className="text-gray-600">Extend runway with smart optimizations</p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-green-600">$3,339/mo</div>
                    <div className="text-sm text-gray-600">= +0.8 months runway</div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {costOptimizations.map((opt, index) => (
                  <motion.div
                    key={opt.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded">
                            {opt.category}
                          </span>
                          <span className={`px-2 py-1 text-xs font-medium rounded ${
                            opt.impact === 'high' ? 'bg-red-100 text-red-700' :
                            opt.impact === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-green-100 text-green-700'
                          }`}>
                            {opt.impact} impact
                          </span>
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded">
                            {opt.effort} effort
                          </span>
                        </div>
                        <h4 className="text-lg font-bold text-gray-900">{opt.item}</h4>
                        <p className="text-sm text-gray-600 mt-1">{opt.recommendation}</p>
                      </div>
                      <div className="text-right ml-4">
                        <div className="text-2xl font-bold text-green-600">
                          ${opt.savings}
                        </div>
                        <div className="text-xs text-gray-600">per month</div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 pt-3 border-t border-gray-200">
                      <div className="text-sm text-gray-600">
                        Current: <span className="font-medium">${opt.current}/mo</span>
                      </div>
                      <ArrowRight size={16} className="text-gray-400" />
                      <div className="text-sm text-gray-600">
                        Optimized: <span className="font-medium text-green-600">${opt.potential}/mo</span>
                      </div>
                    </div>
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

export default RunwayIntelligence;

