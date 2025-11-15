import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  DollarSign, TrendingUp, TrendingDown, AlertTriangle, CheckCircle,
  Clock, Calendar, Target, Zap, Brain, RefreshCw, Plus, Edit,
  Trash2, X, Save, ChevronDown, ChevronUp, BarChart3, PieChart,
  ArrowUp, ArrowDown, ArrowRight, Flame, Droplet, Wind, Gauge, Activity,
  Shield, Eye, EyeOff, Download, Share, Settings, Lightbulb,
  Users, Briefcase, CreditCard, TrendingDown as TrendDown
} from 'lucide-react';

const RunwayIntelligence = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [timeRange, setTimeRange] = useState('12m');
  const [showScenarioModal, setShowScenarioModal] = useState(false);
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [scenarios, setScenarios] = useState([]);
  const [selectedScenario, setSelectedScenario] = useState(null);
  const [editingMetric, setEditingMetric] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [userQuestions, setUserQuestions] = useState([]);
  const [appliedOptimizations, setAppliedOptimizations] = useState([]);
  
  const [financialData, setFinancialData] = useState({
    cashBalance: 595000,
    monthlyRevenue: 35000,
    monthlyExpenses: 77000,
    revenueGrowth: 18,
    expenseGrowth: 5
  });

  const [expenseForm, setExpenseForm] = useState({
    label: '',
    amount: '',
    category: 'Software'
  });

  const [scenarioForm, setScenarioForm] = useState({
    name: '',
    revenueGrowth: 18,
    expenseGrowth: 5,
    hires: []
  });

  const [questionForm, setQuestionForm] = useState('');

  // Helper function to get full Tailwind classes for colors
  const getColorClasses = (color) => {
    const colorMap = {
      emerald: { bg: 'bg-blue-600', text: 'text-blue-600', bgBar: 'bg-blue-600' },
      green: { bg: 'bg-blue-600', text: 'text-blue-600', bgBar: 'bg-blue-600' },
      blue: { bg: 'bg-blue-100', text: 'text-blue-600', bgBar: 'bg-blue-500' },
      purple: { bg: 'bg-blue-600', text: 'text-blue-600', bgBar: 'bg-blue-600' },
      orange: { bg: 'bg-blue-600', text: 'text-blue-600', bgBar: 'bg-blue-600' },
      red: { bg: 'bg-blue-600', text: 'text-black', bgBar: 'bg-blue-600' },
      yellow: { bg: 'bg-blue-600', text: 'text-blue-600', bgBar: 'bg-blue-600' },
      indigo: { bg: 'bg-blue-600', text: 'text-blue-600', bgBar: 'bg-blue-600' }
    };
    return colorMap[color] || { bg: 'bg-gray-100', text: 'text-gray-600', bgBar: 'bg-gray-500' };
  };

  useEffect(() => {
    const mockExpenses = [
      { id: 1, label: 'Salaries', amount: 45000, percent: 58, gradient: 'from-blue-500 to-blue-600', category: 'Payroll' },
      { id: 2, label: 'Marketing', amount: 12000, percent: 16, gradient: 'from-purple-500 to-indigo-600', category: 'Marketing' },
      { id: 3, label: 'Infrastructure', amount: 8000, percent: 10, gradient: 'from-green-500 to-emerald-600', category: 'Infrastructure' },
      { id: 4, label: 'Software', amount: 7000, percent: 9, gradient: 'from-amber-500 to-orange-600', category: 'Software' },
      { id: 5, label: 'Other', amount: 5000, percent: 7, gradient: 'from-gray-400 to-gray-600', category: 'Other' }
    ];
    setExpenses(mockExpenses);
  }, []);

  // Calculate runway based on current financial data
  const calculateRunway = (cash, revenue, expenses) => {
    const monthlyBurn = expenses - revenue;
    if (monthlyBurn <= 0) return 999; // Infinite runway
    return (cash / monthlyBurn).toFixed(1);
  };

  // Generate cash forecast for 12 months
  const generateForecast = (cash, revenue, expenses, revGrowth, expGrowth) => {
    const forecast = [cash];
    let currentCash = cash;
    let currentRevenue = revenue;
    let currentExpenses = expenses;

    for (let month = 1; month <= 12; month++) {
      currentRevenue = currentRevenue * (1 + revGrowth / 100);
      currentExpenses = currentExpenses * (1 + expGrowth / 100);
      currentCash = currentCash + currentRevenue - currentExpenses;
      forecast.push(Math.round(currentCash / 1000));
    }
    return forecast;
  };

  const currentRunway = calculateRunway(
    financialData.cashBalance,
    financialData.monthlyRevenue,
    financialData.monthlyExpenses
  );

  const monthlyBurn = financialData.monthlyExpenses - financialData.monthlyRevenue;

  const handleUpdateFinancials = (field, value) => {
    setFinancialData(prev => ({ ...prev, [field]: parseFloat(value) || 0 }));
  };

  const handleAddExpense = () => {
    if (!expenseForm.label || !expenseForm.amount) {
      alert('Please fill in all fields');
      return;
    }

    const categoryGradients = {
      'Payroll': 'from-blue-500 to-blue-600',
      'Marketing': 'from-purple-500 to-indigo-600',
      'Infrastructure': 'from-green-500 to-emerald-600',
      'Software': 'from-amber-500 to-orange-600',
      'Other': 'from-gray-400 to-gray-600'
    };

    const newExpense = {
      id: Date.now(),
      label: expenseForm.label,
      amount: parseFloat(expenseForm.amount),
      category: expenseForm.category,
      gradient: categoryGradients[expenseForm.category] || 'from-blue-500 to-blue-600',
      percent: 0
    };

    setExpenses(prev => {
      const updated = [...prev, newExpense];
      const total = updated.reduce((sum, e) => sum + e.amount, 0);
      return updated.map(e => ({ ...e, percent: Math.round((e.amount / total) * 100) }));
    });

    setExpenseForm({ label: '', amount: '', category: 'Software' });
    setShowExpenseModal(false);
  };

  const handleDeleteExpense = (id) => {
    setExpenses(prev => {
      const updated = prev.filter(e => e.id !== id);
      const total = updated.reduce((sum, e) => sum + e.amount, 0);
      return updated.map(e => ({ ...e, percent: Math.round((e.amount / total) * 100) }));
    });
  };

  const handleAskQuestion = () => {
    if (!questionForm.trim()) return;

    const mockResponse = {
      id: Date.now(),
      question: questionForm,
      recommendation: 'AI is analyzing...',
      reasoning: 'Based on your current metrics and industry benchmarks...',
      confidence: 85,
      impact: { runway: 0 }
    };

    setUserQuestions(prev => [...prev, mockResponse]);
    setQuestionForm('');
    setShowQuestionModal(false);

    // Simulate AI response after 2 seconds
    setTimeout(() => {
      setUserQuestions(prev => prev.map(q => 
        q.id === mockResponse.id ? {
          ...q,
          recommendation: questionForm.toLowerCase().includes('hire') ? 'Wait 2-3 months' :
                        questionForm.toLowerCase().includes('raise') ? 'Start conversations now' :
                        questionForm.toLowerCase().includes('tool') || questionForm.toLowerCase().includes('cost') ? 'Analyze ROI first' :
                        'Proceed with caution',
          reasoning: `Based on your ${currentRunway} months runway and $${monthlyBurn.toLocaleString()} monthly burn, this decision impacts your financial position. Consider current growth rate (${financialData.revenueGrowth}% MoM) and expense trajectory.`,
          impact: { runway: Math.random() > 0.5 ? -2 : 1 }
        } : q
      ));
    }, 2000);
  };

  const handleApplyOptimization = (id) => {
    setAppliedOptimizations(prev => [...prev, id]);
  };

  const handleCreateScenario = () => {
    if (!scenarioForm.name) {
      alert('Please name your scenario');
      return;
    }

    const forecast = generateForecast(
      financialData.cashBalance,
      financialData.monthlyRevenue,
      financialData.monthlyExpenses,
      parseFloat(scenarioForm.revenueGrowth),
      parseFloat(scenarioForm.expenseGrowth)
    );

    const newRevenue = financialData.monthlyRevenue * (1 + scenarioForm.revenueGrowth / 100);
    const newExpenses = financialData.monthlyExpenses * (1 + scenarioForm.expenseGrowth / 100);
    const newBurn = newExpenses - newRevenue;

    const newScenario = {
      id: Date.now(),
      name: scenarioForm.name,
      type: 'custom',
      runway: calculateRunway(financialData.cashBalance, newRevenue, newExpenses),
      monthlyBurn: newBurn,
      cashBalance: financialData.cashBalance,
      projectedCash: forecast,
      assumptions: {
        revenue: { current: financialData.monthlyRevenue, growth: scenarioForm.revenueGrowth },
        expenses: { current: financialData.monthlyExpenses, growth: scenarioForm.expenseGrowth },
        hiring: scenarioForm.hires || []
      }
    };

    setScenarios(prev => [...prev, newScenario]);
    setScenarioForm({ name: '', revenueGrowth: 18, expenseGrowth: 5, hires: [] });
    setShowScenarioModal(false);
  };

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
      value: `${currentRunway} months`,
      subtext: 'Based on current burn',
      trend: 'stable',
      icon: Clock,
      gradient: 'from-blue-500 to-blue-600',
      iconBg: 'bg-white',
      iconColor: 'text-blue-600',
      borderColor: 'border-blue-200',
      status: 'warning',
      editable: false
    },
    {
      label: 'Cash Balance',
      value: `$${financialData.cashBalance.toLocaleString()}`,
      subtext: 'Click to edit',
      trend: 'up',
      icon: DollarSign,
      gradient: 'from-green-500 to-emerald-600',
      iconBg: 'bg-white',
      iconColor: 'text-green-600',
      borderColor: 'border-green-200',
      status: 'good',
      editable: true,
      field: 'cashBalance'
    },
    {
      label: 'Monthly Burn',
      value: `$${Math.abs(monthlyBurn).toLocaleString()}`,
      subtext: monthlyBurn < 0 ? 'Profitable!' : 'Click to edit expenses',
      trend: monthlyBurn < 0 ? 'up' : 'down',
      icon: Flame,
      gradient: monthlyBurn < 0 ? 'from-green-500 to-emerald-600' : 'from-red-500 to-orange-600',
      iconBg: 'bg-white',
      iconColor: monthlyBurn < 0 ? 'text-green-600' : 'text-orange-600',
      borderColor: monthlyBurn < 0 ? 'border-green-200' : 'border-orange-200',
      status: 'good',
      editable: false
    },
    {
      label: 'Revenue Growth',
      value: `${financialData.revenueGrowth}% MoM`,
      subtext: 'Click to edit',
      trend: 'improving',
      icon: TrendingUp,
      gradient: 'from-purple-500 to-indigo-600',
      iconBg: 'bg-white',
      iconColor: 'text-purple-600',
      borderColor: 'border-purple-200',
      status: 'neutral',
      editable: true,
      field: 'revenueGrowth'
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
    if (months >= 18) return 'text-blue-600 bg-blue-600';
    if (months >= 12) return 'text-blue-600 bg-blue-600';
    if (months >= 6) return 'text-blue-600 bg-blue-600';
    return 'text-black bg-blue-600';
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
      case 'warning': return 'bg-gradient-to-br from-amber-500 to-orange-600 border-amber-200';
      case 'success': return 'bg-gradient-to-br from-green-500 to-emerald-600 border-green-200';
      case 'info': return 'bg-gradient-to-br from-blue-100 to-blue-50 border-blue-200';
      default: return 'bg-gray-50 border-gray-200';
    }
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
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                <Gauge className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Runway Intelligence</h1>
                <p className="text-gray-600">Never run out of cash unexpectedly</p>
              </div>
            </div>
            
            <button 
              onClick={() => setShowScenarioModal(true)}
              className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:shadow-lg transition-all"
            >
              <Plus size={20} />
              <span>Add Scenario</span>
            </button>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-4 gap-4">
            {metrics.map((metric, index) => {
              const Icon = metric.icon;
              const isEditing = editingMetric === metric.field;
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`bg-gradient-to-br ${metric.gradient} p-4 rounded-xl shadow-lg border-2 ${metric.borderColor} transition-all hover:shadow-xl ${
                    metric.editable ? 'cursor-pointer hover:scale-105' : ''
                  }`}
                  onClick={() => metric.editable && setEditingMetric(metric.field)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className={`w-12 h-12 ${metric.iconBg} rounded-xl flex items-center justify-center shadow-md`}>
                      <Icon size={24} className={metric.iconColor} />
                    </div>
                    <div className="flex items-center space-x-1">
                      {metric.trend === 'up' && <TrendingUp size={18} className="text-white" />}
                      {metric.trend === 'down' && <TrendingDown size={18} className="text-white" />}
                      {metric.editable && !isEditing && <Edit size={16} className="text-white/80" />}
                    </div>
                  </div>
                  
                  {isEditing ? (
                    <div className="space-y-2" onClick={(e) => e.stopPropagation()}>
                      <input
                        type="number"
                        defaultValue={financialData[metric.field]}
                        onBlur={(e) => {
                          handleUpdateFinancials(metric.field, e.target.value);
                          setEditingMetric(null);
                        }}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            handleUpdateFinancials(metric.field, e.target.value);
                            setEditingMetric(null);
                          }
                        }}
                        autoFocus
                        className="w-full px-3 py-2 text-xl font-bold text-gray-900 border-2 border-white rounded-lg"
                      />
                      <button
                        onClick={() => setEditingMetric(null)}
                        className="text-xs text-white hover:text-white/80"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="text-3xl font-bold text-white mb-1">{metric.value}</div>
                      <div className="text-sm font-medium text-white/90">{metric.label}</div>
                      <div className="text-xs text-white/70 mt-1">{metric.subtext}</div>
                    </>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Alerts */}
          <div className="mt-6 space-y-3">
            {alerts.map((alert) => {
              const Icon = getAlertIcon(alert.type);
              const isInfo = alert.type === 'info';
              return (
                <motion.div
                  key={alert.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`p-4 rounded-xl border-2 shadow-md ${getAlertColor(alert.type)}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <Icon size={22} className={`mt-0.5 flex-shrink-0 ${isInfo ? 'text-blue-600' : 'text-white'}`} />
                      <div>
                        <h3 className={`font-bold ${isInfo ? 'text-gray-900' : 'text-white'}`}>{alert.title}</h3>
                        <p className={`text-sm mt-1 ${isInfo ? 'text-gray-700' : 'text-white/90'}`}>{alert.message}</p>
                      </div>
                    </div>
                    <button className={`text-sm font-bold whitespace-nowrap ml-4 ${
                      isInfo ? 'text-blue-600 hover:text-blue-700' : 'text-white hover:text-white/80'
                    }`}>
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
                          stroke="rgb(229 231 235)"
                          strokeWidth="16"
                          fill="none"
                        />
                        <motion.circle
                          cx="96"
                          cy="96"
                          r="88"
                          stroke="url(#runwayGradient)"
                          strokeWidth="16"
                          fill="none"
                          strokeDasharray={`${(14.2 / 24) * 553} 553`}
                          strokeLinecap="round"
                          initial={{ strokeDasharray: '0 553' }}
                          animate={{ strokeDasharray: `${(14.2 / 24) * 553} 553` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                        />
                        <defs>
                          <linearGradient id="runwayGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="rgb(59 130 246)" />
                            <stop offset="50%" stopColor="rgb(99 102 241)" />
                            <stop offset="100%" stopColor="rgb(139 92 246)" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <div className="text-5xl font-bold bg-gradient-to-br from-blue-600 to-purple-600 bg-clip-text text-transparent">14.2</div>
                        <div className="text-sm font-medium text-gray-600 mt-1">months</div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm items-center">
                      <span className="text-gray-700 font-medium">Target: 18+ months</span>
                      <span className="font-bold text-blue-600">78%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '78%' }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 h-3 rounded-full"
                      ></motion.div>
                    </div>
                  </div>
                </div>

                {/* Cash Flow */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Monthly Cash Flow</h3>
                  <div className="space-y-5">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                    >
                      <div className="flex justify-between mb-2 items-center">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full"></div>
                          <span className="text-sm font-medium text-gray-900">Revenue</span>
                        </div>
                        <span className="text-sm font-bold text-green-600">+$35,000</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: '45%' }}
                          transition={{ duration: 0.5, ease: "easeOut" }}
                          className="bg-gradient-to-r from-green-500 to-emerald-600 h-3 rounded-full"
                        ></motion.div>
                      </div>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <div className="flex justify-between mb-2 items-center">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-gradient-to-r from-red-500 to-orange-600 rounded-full"></div>
                          <span className="text-sm font-medium text-gray-900">Expenses</span>
                        </div>
                        <span className="text-sm font-bold text-red-600">-$77,000</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: '100%' }}
                          transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
                          className="bg-gradient-to-r from-red-500 to-orange-600 h-3 rounded-full"
                        ></motion.div>
                      </div>
                    </motion.div>
                    <div className="pt-4 border-t-2 border-gray-200">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-gray-900">Net Burn</span>
                        <span className="text-lg font-bold text-red-600">-$42,000<span className="text-sm text-gray-600">/mo</span></span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                    <div className="flex items-start space-x-3">
                      <Lightbulb size={20} className="text-blue-600 mt-0.5 flex-shrink-0" />
                      <div className="text-sm text-gray-800">
                        <span className="font-bold text-blue-600">Insight:</span> You're on track to break-even in 8.3 months at current 18% MoM growth.
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expense Breakdown */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-900">Expense Breakdown</h3>
                    <button
                      onClick={() => setShowExpenseModal(true)}
                      className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-md hover:shadow-lg"
                    >
                      <Plus size={18} />
                    </button>
                  </div>
                  <div className="space-y-4">
                    {expenses.map((expense) => {
                      return (
                        <motion.div
                          key={expense.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="group"
                        >
                          <div className="flex justify-between mb-2 items-center">
                            <span className="text-sm font-medium text-gray-900">{expense.label}</span>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-bold text-gray-900">
                                ${expense.amount.toLocaleString()} <span className="text-gray-600">({expense.percent}%)</span>
                              </span>
                              <button
                                onClick={() => handleDeleteExpense(expense.id)}
                                className="opacity-0 group-hover:opacity-100 p-1.5 text-red-600 hover:bg-red-50 rounded transition-all"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${expense.percent}%` }}
                              transition={{ duration: 0.5, ease: "easeOut" }}
                              className={`bg-gradient-to-r ${expense.gradient} h-3 rounded-full shadow-sm`}
                            ></motion.div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                {/* Fundraising Timeline */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Fundraising Timeline</h3>
                  <div className="relative">
                    <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 via-green-500 to-red-500"></div>
                    <div className="space-y-6">
                      {[
                        { label: 'Start Conversations', date: 'Now', status: 'current', gradient: 'from-blue-500 to-blue-600', icon: Calendar, iconColor: 'text-blue-600', badge: 'bg-blue-100 text-blue-700' },
                        { label: 'Active Pitching', date: 'Month 3', status: 'upcoming', gradient: 'from-purple-500 to-indigo-600', icon: TrendingUp, iconColor: 'text-purple-600', badge: 'bg-purple-100 text-purple-700' },
                        { label: 'Target Close', date: 'Month 5', status: 'upcoming', gradient: 'from-green-500 to-emerald-600', icon: Target, iconColor: 'text-green-600', badge: 'bg-green-100 text-green-700' },
                        { label: 'Cash Out (no raise)', date: 'Month 14', status: 'danger', gradient: 'from-red-500 to-red-600', icon: AlertTriangle, iconColor: 'text-red-600', badge: 'bg-red-100 text-red-700' }
                      ].map((milestone, index) => {
                        const Icon = milestone.icon;
                        return (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="relative flex items-start space-x-4"
                          >
                            <div className={`w-12 h-12 bg-gradient-to-br ${milestone.gradient} rounded-full flex items-center justify-center border-4 border-white shadow-lg z-10`}>
                              <Icon size={22} className="text-white" />
                            </div>
                            <div className="flex-1">
                              <div className="font-bold text-gray-900 mb-1">{milestone.label}</div>
                              <div className="flex items-center space-x-2">
                                <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${milestone.badge}`}>
                                  {milestone.date}
                                </span>
                                {milestone.status === 'current' && (
                                  <span className="flex items-center space-x-1 text-xs text-blue-600">
                                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse"></div>
                                    <span>Active</span>
                                  </span>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'forecast' && (
            <motion.div
              key="forecast"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-900">12-Month Cash Forecast</h3>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="text-xs text-gray-600">Current Revenue</div>
                      <input
                        type="number"
                        value={financialData.monthlyRevenue}
                        onChange={(e) => handleUpdateFinancials('monthlyRevenue', e.target.value)}
                        className="w-32 px-2 py-1 text-sm font-medium text-blue-600 border border-gray-200 rounded"
                      />
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-gray-600">Current Expenses</div>
                      <input
                        type="number"
                        value={financialData.monthlyExpenses}
                        onChange={(e) => handleUpdateFinancials('monthlyExpenses', e.target.value)}
                        className="w-32 px-2 py-1 text-sm font-medium text-black border border-gray-200 rounded"
                      />
                    </div>
                  </div>
                </div>

                {/* Chart */}
                <div className="relative h-80 mb-6">
                  <div className="absolute inset-0 flex items-end justify-between space-x-2">
                    {generateForecast(
                      financialData.cashBalance,
                      financialData.monthlyRevenue,
                      financialData.monthlyExpenses,
                      financialData.revenueGrowth,
                      financialData.expenseGrowth
                    ).map((value, index) => {
                      const maxValue = Math.max(...generateForecast(
                        financialData.cashBalance,
                        financialData.monthlyRevenue,
                        financialData.monthlyExpenses,
                        financialData.revenueGrowth,
                        financialData.expenseGrowth
                      ));
                      const height = Math.max((value / maxValue) * 100, value < 0 ? 5 : 0);
                      const isNegative = value < 0;
                      
                      return (
                        <motion.div
                          key={index}
                          initial={{ height: 0 }}
                          animate={{ height: '100%' }}
                          transition={{ delay: index * 0.05, duration: 0.3 }}
                          className="flex-1 flex flex-col items-center justify-end h-full group relative"
                        >
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: `${Math.abs(height)}%` }}
                            transition={{ delay: index * 0.05, duration: 0.5, ease: "easeOut" }}
                            className={`w-full rounded-t-lg transition-all shadow-md ${
                              isNegative ? 'bg-gradient-to-t from-red-600 to-red-500' : 'bg-gradient-to-t from-blue-600 to-blue-500'
                            } hover:shadow-lg hover:scale-105`}
                          >
                            <div className="opacity-0 group-hover:opacity-100 absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-3 py-1.5 rounded-lg shadow-lg whitespace-nowrap z-10">
                              ${value.toLocaleString()}K
                            </div>
                          </motion.div>
                          <div className="text-xs font-medium text-gray-600 mt-2">{index === 0 ? 'Now' : `M${index}`}</div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                {/* Zero line indicator if going negative */}
                <div className="border-t-2 border-dashed border-gray-200 -mt-6 mb-6"></div>

                {/* Growth Controls */}
                <div className="grid grid-cols-2 gap-6 p-4 bg-gray-50 rounded-lg">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Revenue Growth (MoM %)
                    </label>
                    <input
                      type="range"
                      min="-10"
                      max="50"
                      value={financialData.revenueGrowth}
                      onChange={(e) => handleUpdateFinancials('revenueGrowth', e.target.value)}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-600 mt-1">
                      <span>-10%</span>
                      <span className="font-bold text-gray-900">{financialData.revenueGrowth}%</span>
                      <span>+50%</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Expense Growth (MoM %)
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="30"
                      value={financialData.expenseGrowth}
                      onChange={(e) => handleUpdateFinancials('expenseGrowth', e.target.value)}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-600 mt-1">
                      <span>0%</span>
                      <span className="font-bold text-gray-900">{financialData.expenseGrowth}%</span>
                      <span>+30%</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <Lightbulb size={18} className="text-blue-600 mt-0.5" />
                    <div className="text-sm text-gray-700">
                      <span className="font-medium">Projection:</span> At current growth rates, you'll {
                        generateForecast(
                          financialData.cashBalance,
                          financialData.monthlyRevenue,
                          financialData.monthlyExpenses,
                          financialData.revenueGrowth,
                          financialData.expenseGrowth
                        )[12] > 0 ? 
                        `have $${generateForecast(
                          financialData.cashBalance,
                          financialData.monthlyRevenue,
                          financialData.monthlyExpenses,
                          financialData.revenueGrowth,
                          financialData.expenseGrowth
                        )[12]}K in 12 months` : 
                        'run out of cash before 12 months'
                      }.
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'scenarios' && (
            <motion.div
              key="scenarios"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="space-y-6">
                {scenarios.length === 0 ? (
                  <div className="bg-white p-12 rounded-xl shadow-sm border-2 border-dashed border-gray-300 text-center">
                    <BarChart3 className="mx-auto text-gray-400 mb-4" size={48} />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">No Scenarios Yet</h3>
                    <p className="text-gray-600 mb-4">Create different scenarios to model various outcomes</p>
                    <button
                      onClick={() => setShowScenarioModal(true)}
                      className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:shadow-lg transition-all"
                    >
                      Create First Scenario
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-4">
                    {scenarios.map((scenario) => (
                      <div key={scenario.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="text-xl font-bold text-gray-900">{scenario.name}</h3>
                              <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                                scenario.type === 'baseline' ? 'bg-blue-100 text-blue-700' :
                                scenario.type === 'optimistic' ? 'bg-blue-600 text-blue-600' :
                                scenario.type === 'conservative' ? 'bg-blue-600 text-blue-600' :
                                'bg-blue-600 text-blue-600'
                              }`}>
                                {scenario.type}
                              </span>
                            </div>
                            <div className="text-sm text-gray-600">
                              Revenue: {scenario.assumptions.revenue.current.toLocaleString()} @ {scenario.assumptions.revenue.growth}% growth • 
                              Expenses: {scenario.assumptions.expenses.current.toLocaleString()} @ {scenario.assumptions.expenses.growth}% growth
                            </div>
                          </div>
                          <div className="text-right">
                            <div className={`text-3xl font-bold ${getRunwayColor(scenario.runway)}`}>
                              {scenario.runway} mo
                            </div>
                            <div className="text-sm text-gray-600">runway</div>
                          </div>
                        </div>

                        {/* Mini forecast chart */}
                        <div className="flex items-end space-x-1 h-20 mt-4">
                          {scenario.projectedCash.map((value, index) => {
                            const maxValue = Math.max(...scenario.projectedCash);
                            const height = (value / maxValue) * 100;
                            return (
                              <motion.div
                                key={index}
                                initial={{ height: 0 }}
                                animate={{ height: `${height}%` }}
                                transition={{ delay: index * 0.05, duration: 0.3 }}
                                className="flex-1 bg-gradient-to-t from-blue-600 to-blue-500 rounded-t shadow-sm"
                              ></motion.div>
                            );
                          })}
                        </div>

                        <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                          <div>
                            <div className="text-xs text-gray-600">Monthly Burn</div>
                            <div className="font-bold text-gray-900">${Math.abs(scenario.monthlyBurn).toLocaleString()}</div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-600">Cash @ Month 12</div>
                            <div className="font-bold text-gray-900">${scenario.projectedCash[12]}K</div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-600">Hires Planned</div>
                            <div className="font-bold text-gray-900">{scenario.assumptions.hiring.length}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
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
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">Ask AI Advisor</h3>
                      <p className="text-sm text-gray-600">Get instant answers based on your runway metrics</p>
                    </div>
                    <button
                      onClick={() => setShowQuestionModal(true)}
                      className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:shadow-lg transition-all flex items-center space-x-2"
                    >
                      <Brain size={20} />
                      <span>Ask Question</span>
                    </button>
                  </div>
                </div>

                {userQuestions.map((decision, index) => (
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
                          <span className="px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-full">
                            {decision.recommendation}
                          </span>
                          <span className="text-sm text-gray-600">
                            {decision.confidence}% confidence
                          </span>
                        </div>
                      </div>
                      <Brain className="text-blue-600" size={24} />
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg mb-4">
                      <div className="text-sm text-gray-700">{decision.reasoning}</div>
                    </div>

                    <div className="flex items-center space-x-6">
                      <div>
                        <div className="text-xs text-gray-600">Runway Impact</div>
                        <div className={`text-lg font-bold ${decision.impact.runway > 0 ? 'text-blue-600' : 'text-black'}`}>
                          {decision.impact.runway > 0 ? '+' : ''}{decision.impact.runway} months
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}

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
                          <span className="px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-full">
                            {decision.recommendation}
                          </span>
                          <span className="text-sm text-gray-600">
                            {decision.confidence}% confidence
                          </span>
                        </div>
                      </div>
                      <Brain className="text-blue-600" size={24} />
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg mb-4">
                      <div className="text-sm text-gray-700">{decision.reasoning}</div>
                    </div>

                    <div className="flex items-center space-x-6">
                      <div>
                        <div className="text-xs text-gray-600">Runway Impact</div>
                        <div className={`text-lg font-bold ${decision.impact.runway > 0 ? 'text-blue-600' : 'text-black'}`}>
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
                          <div className="text-lg font-bold text-blue-600">
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
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-br from-green-500 to-emerald-600 p-6 rounded-xl shadow-lg border-2 border-green-200 mb-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-white">Potential Savings</h3>
                    <p className="text-white/90 mt-1">Extend runway with smart optimizations</p>
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-bold text-white">$3,339<span className="text-xl">/mo</span></div>
                    <div className="flex items-center justify-end space-x-2 mt-1">
                      <Zap className="text-white" size={18} />
                      <span className="text-sm font-medium text-white">+0.8 months runway</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              <div className="space-y-4">
                {costOptimizations.map((opt, index) => {
                  const isApplied = appliedOptimizations.includes(opt.id);
                  
                  return (
                    <motion.div
                      key={opt.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ delay: index * 0.1 }}
                      className={`bg-white p-6 rounded-xl border-2 transition-all ${
                        isApplied ? 'border-green-200 bg-green-50 shadow-md' : 'border-gray-200 shadow-sm hover:shadow-md'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-3">
                            <span className="px-3 py-1 bg-gray-100 text-gray-800 text-xs font-bold rounded-full">
                              {opt.category}
                            </span>
                            <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                              opt.impact === 'high' ? 'bg-gradient-to-r from-red-500 to-orange-600 text-white' :
                              opt.impact === 'medium' ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white' :
                              'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                            }`}>
                              {opt.impact} impact
                            </span>
                            <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                              opt.effort === 'easy' ? 'bg-green-100 text-green-700' :
                              opt.effort === 'medium' ? 'bg-amber-100 text-amber-700' :
                              'bg-red-100 text-red-700'
                            }`}>
                              {opt.effort} effort
                            </span>
                            {isApplied && (
                              <span className="px-3 py-1 bg-green-600 text-white text-xs font-bold rounded-full flex items-center space-x-1">
                                <CheckCircle size={14} />
                                <span>Applied</span>
                              </span>
                            )}
                          </div>
                          <h4 className="text-lg font-bold text-gray-900 mb-2">{opt.item}</h4>
                          <p className="text-sm text-gray-700">{opt.recommendation}</p>
                        </div>
                        <div className="text-right ml-6">
                          <div className="text-3xl font-bold text-green-600">
                            ${opt.savings}
                          </div>
                          <div className="text-xs font-medium text-gray-600 mt-1">per month</div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t-2 border-gray-200">
                        <div className="flex items-center space-x-3">
                          <div className="text-sm">
                            <span className="text-gray-600">Current:</span> <span className="font-bold text-gray-900">${opt.current}/mo</span>
                          </div>
                          <ArrowRight size={18} className="text-gray-400" />
                          <div className="text-sm">
                            <span className="text-gray-600">Optimized:</span> <span className="font-bold text-green-600">${opt.potential}/mo</span>
                          </div>
                        </div>
                        
                        {!isApplied && (
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleApplyOptimization(opt.id)}
                              className="px-5 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg text-sm font-bold hover:shadow-lg transition-all"
                            >
                              Apply
                            </button>
                            <button
                              onClick={() => setAppliedOptimizations(prev => [...prev, opt.id])}
                              className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-all"
                            >
                              Dismiss
                            </button>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {/* Scenario Modal */}
        {showScenarioModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowScenarioModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full"
            >
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">Create Scenario</h2>
              </div>

              <div className="p-6 space-y-4">
                <input
                  type="text"
                  placeholder="Scenario Name"
                  value={scenarioForm.name}
                  onChange={(e) => setScenarioForm({ ...scenarioForm, name: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-gray-200 focus:ring-0"
                />

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Revenue Growth (%)
                  </label>
                  <input
                    type="number"
                    value={scenarioForm.revenueGrowth}
                    onChange={(e) => setScenarioForm({ ...scenarioForm, revenueGrowth: parseFloat(e.target.value) })}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-gray-200 focus:ring-0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Expense Growth (%)
                  </label>
                  <input
                    type="number"
                    value={scenarioForm.expenseGrowth}
                    onChange={(e) => setScenarioForm({ ...scenarioForm, expenseGrowth: parseFloat(e.target.value) })}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-gray-200 focus:ring-0"
                  />
                </div>
              </div>

              <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
                <button
                  onClick={() => setShowScenarioModal(false)}
                  className="px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateScenario}
                  className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:shadow-lg"
                >
                  Create Scenario
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Expense Modal */}
        {showExpenseModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowExpenseModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full"
            >
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">Add Expense</h2>
              </div>

              <div className="p-6 space-y-4">
                <input
                  type="text"
                  placeholder="Expense Name"
                  value={expenseForm.label}
                  onChange={(e) => setExpenseForm({ ...expenseForm, label: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-gray-200 focus:ring-0"
                />

                <input
                  type="number"
                  placeholder="Monthly Amount"
                  value={expenseForm.amount}
                  onChange={(e) => setExpenseForm({ ...expenseForm, amount: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-gray-200 focus:ring-0"
                />

                <select
                  value={expenseForm.category}
                  onChange={(e) => setExpenseForm({ ...expenseForm, category: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-gray-200 focus:ring-0"
                >
                  <option value="Software">Software</option>
                  <option value="Infrastructure">Infrastructure</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Payroll">Payroll</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
                <button
                  onClick={() => setShowExpenseModal(false)}
                  className="px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddExpense}
                  className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-600"
                >
                  Add Expense
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Question Modal */}
        {showQuestionModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowQuestionModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl max-w-lg w-full"
            >
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">Ask AI Advisor</h2>
                <p className="text-sm text-gray-600 mt-1">Get instant decision advice based on your metrics</p>
              </div>

              <div className="p-6">
                <textarea
                  placeholder="E.g., Should I hire a developer now? Can I afford this marketing campaign?"
                  value={questionForm}
                  onChange={(e) => setQuestionForm(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-gray-200 focus:ring-0 resize-none"
                />
                
                <div className="mt-4 p-4 bg-white rounded-lg">
                  <div className="flex items-start space-x-2">
                    <Brain size={18} className="text-blue-600 mt-0.5" />
                    <div className="text-sm text-gray-700">
                      <span className="font-medium">Current Context:</span> {currentRunway} months runway • ${Math.abs(monthlyBurn).toLocaleString()}/mo burn • {financialData.revenueGrowth}% MoM growth
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
                <button
                  onClick={() => setShowQuestionModal(false)}
                  className="px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAskQuestion}
                  disabled={!questionForm.trim()}
                  className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Get AI Advice
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RunwayIntelligence;

