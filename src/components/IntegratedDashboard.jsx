import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, TrendingDown, Brain, Target, Users, DollarSign,
  AlertTriangle, CheckCircle, Clock, Zap, ArrowRight, Plus,
  Rocket, Gauge, Heart, BarChart3, Activity, Eye, MessageCircle,
  Star, Award, Calendar, FileText, Lightbulb, ChevronRight
} from 'lucide-react';

const IntegratedDashboard = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('week');

  // Critical Health Metrics - The 4 Core Scores
  const healthMetrics = useMemo(() => [
    {
      id: 'runway',
      label: 'Runway Health',
      score: 8.2,
      maxScore: 12,
      unit: 'months',
      status: 'warning',
      change: -0.3,
      icon: Gauge,
      color: 'orange',
      insight: 'Burn rate increased 8% this month',
      action: 'Review expense optimization',
      link: '/runway'
    },
    {
      id: 'pmf',
      label: 'PMF Score',
      score: 68,
      maxScore: 100,
      unit: '%',
      status: 'good',
      change: +5,
      icon: Target,
      color: 'green',
      insight: 'Strong retention signals detected',
      action: 'Launch NPS survey to validate',
      link: '/pmf'
    },
    {
      id: 'impacts',
      label: 'Goals Health',
      score: 73,
      maxScore: 100,
      unit: '%',
      status: 'good',
      change: +8,
      icon: Rocket,
      color: 'purple',
      insight: '3 objectives on track, 1 at risk',
      action: 'Review Q1 Marketing OKR',
      link: '/impacts'
    },
    {
      id: 'customers',
      label: 'Customer Sentiment',
      score: 4.2,
      maxScore: 5,
      unit: '/5',
      status: 'excellent',
      change: +0.3,
      icon: Heart,
      color: 'indigo',
      insight: 'NPS increased to 42 (+8 points)',
      action: 'Capture case studies from promoters',
      link: '/customers'
    }
  ], []);

  // AI-Powered Priority Actions - Aggregated from all modules
  const priorityActions = useMemo(() => [
    {
      id: 1,
      priority: 'critical',
      module: 'Runway',
      title: 'Cash runway dropping below 9 months',
      description: 'Current burn rate: $42K/mo. Projected runway: 8.2 months. Consider cost optimization or fundraising.',
      impact: 'high',
      effort: 'medium',
      deadline: '3 days',
      aiConfidence: 94,
      actions: ['Review Q1 budget', 'Start fundraising prep', 'Cut non-essential costs']
    },
    {
      id: 2,
      priority: 'high',
      module: 'IMPACTS',
      title: 'Q1 Marketing OKR at risk (52% complete)',
      description: 'User acquisition target is 25% behind. Recommend reallocating budget to top-performing channels.',
      impact: 'high',
      effort: 'low',
      deadline: '1 week',
      aiConfidence: 87,
      actions: ['Analyze channel ROI', 'Pause underperforming ads', 'Double down on organic']
    },
    {
      id: 3,
      priority: 'medium',
      module: 'PMF Validation',
      title: 'Retention cohort showing early drop-off',
      description: 'Week 2 retention dropped from 65% to 58%. Users citing onboarding complexity.',
      impact: 'high',
      effort: 'medium',
      deadline: '2 weeks',
      aiConfidence: 91,
      actions: ['Simplify onboarding', 'Add product tours', 'Schedule user interviews']
    },
    {
      id: 4,
      priority: 'medium',
      module: 'Customer Intelligence',
      title: 'Feature request trending: Mobile app',
      description: '23 requests in past week. 67% from power users. High revenue impact potential.',
      impact: 'medium',
      effort: 'high',
      deadline: 'This quarter',
      aiConfidence: 78,
      actions: ['Validate demand with survey', 'Estimate development cost', 'Add to roadmap']
    },
    {
      id: 5,
      priority: 'low',
      module: 'Decision Intelligence',
      title: 'Hiring window opening for Q2 goals',
      description: 'Based on current trajectory, recommend hiring 2 engineers in 45 days to hit Q2 targets.',
      impact: 'medium',
      effort: 'high',
      deadline: '1 month',
      aiConfidence: 82,
      actions: ['Define job requirements', 'Start sourcing candidates', 'Prepare interview process']
    }
  ], []);

  // Quick Insights - Real-time data across modules
  const quickInsights = useMemo(() => [
    {
      module: 'Revenue',
      value: '$124.5K',
      change: '+12.3%',
      trend: 'up',
      icon: DollarSign,
      color: 'green',
      subtext: 'MRR this month'
    },
    {
      module: 'Active Goals',
      value: '12',
      change: '4 at risk',
      trend: 'neutral',
      icon: Target,
      color: 'purple',
      subtext: 'Across 3 objectives'
    },
    {
      module: 'Customer Feedback',
      value: '23',
      change: '+8 new',
      trend: 'up',
      icon: MessageCircle,
      color: 'blue',
      subtext: 'This week'
    },
    {
      module: 'Decisions Made',
      value: '7',
      change: '3 pending',
      trend: 'neutral',
      icon: Brain,
      color: 'indigo',
      subtext: 'Using AI advisor'
    },
    {
      module: 'Team Velocity',
      value: '89%',
      change: '+5%',
      trend: 'up',
      icon: Zap,
      color: 'yellow',
      subtext: 'Sprint completion'
    },
    {
      module: 'Investor Updates',
      value: '2',
      change: 'Due soon',
      trend: 'neutral',
      icon: FileText,
      color: 'orange',
      subtext: 'Monthly reports'
    }
  ], []);

  // Recent Activity Feed
  const recentActivity = useMemo(() => [
    {
      id: 1,
      type: 'objective',
      title: 'New objective created: "Launch Enterprise Plan"',
      user: 'Sarah Chen',
      time: '2 hours ago',
      icon: Target,
      color: 'purple'
    },
    {
      id: 2,
      type: 'feedback',
      title: '5 new customer feedback items reviewed',
      user: 'AI System',
      time: '3 hours ago',
      icon: MessageCircle,
      color: 'blue'
    },
    {
      id: 3,
      type: 'decision',
      title: 'Decision logged: "Pricing strategy for Q2"',
      user: 'Michael Rodriguez',
      time: '5 hours ago',
      icon: Brain,
      color: 'indigo'
    },
    {
      id: 4,
      type: 'milestone',
      title: 'Milestone completed: "Beta launch"',
      user: 'Product Team',
      time: '1 day ago',
      icon: CheckCircle,
      color: 'green'
    }
  ], []);

  const getStatusColor = (status) => {
    const colors = {
      critical: { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', badge: 'bg-red-100' },
      high: { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-700', badge: 'bg-orange-100' },
      medium: { bg: 'bg-yellow-50', border: 'border-yellow-200', text: 'text-yellow-700', badge: 'bg-yellow-100' },
      low: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700', badge: 'bg-blue-100' }
    };
    return colors[status] || colors.low;
  };

  const getHealthColor = (status) => {
    const colors = {
      excellent: { bg: 'bg-green-500', text: 'text-green-600', ring: 'ring-green-200' },
      good: { bg: 'bg-blue-500', text: 'text-blue-600', ring: 'ring-blue-200' },
      warning: { bg: 'bg-orange-500', text: 'text-orange-600', ring: 'ring-orange-200' },
      critical: { bg: 'bg-red-500', text: 'text-red-600', ring: 'ring-red-200' }
    };
    return colors[status] || colors.good;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header with Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-2"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Command Center</h1>
          </div>
          
          <div className="flex items-center space-x-3">
            <select
              value={selectedTimeframe}
              onChange={(e) => setSelectedTimeframe(e.target.value)}
              className="px-4 py-2.5 border border-gray-300 rounded-xl bg-white text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all"
            >
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
            </select>
            
            <button className="flex items-center space-x-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-medium transition-all shadow-sm hover:shadow">
              <Plus size={20} />
              <span>Quick Add</span>
            </button>
          </div>
        </motion.div>

        {/* Critical Health Scores - Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-4 gap-4"
        >
          {healthMetrics.map((metric, index) => {
            const Icon = metric.icon;
            const colors = getHealthColor(metric.status);
            const percentage = (metric.score / metric.maxScore) * 100;
            
            return (
              <motion.div
                key={metric.id}
                whileHover={{ scale: 1.02, translateY: -4 }}
                className="bg-white rounded-xl p-5 shadow-sm border border-gray-200 cursor-pointer group hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="text-sm font-medium text-gray-600">{metric.label}</div>
                  <div className="flex items-center space-x-1">
                    {metric.change > 0 ? (
                      <TrendingUp size={16} className="text-green-600" />
                    ) : (
                      <TrendingDown size={16} className="text-red-600" />
                    )}
                    <span className={`text-sm font-semibold ${metric.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {metric.change > 0 ? '+' : ''}{metric.change}{metric.unit}
                    </span>
                  </div>
                </div>
                
                <div className="mb-3">
                  <div className="flex items-baseline space-x-1.5">
                    <span className="text-3xl font-bold text-gray-900">{metric.score}</span>
                    <span className="text-base text-gray-500 font-medium">/ {metric.maxScore}</span>
                  </div>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                  <div 
                    className={`${colors.bg} h-2 rounded-full transition-all duration-500`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>

                <div className="space-y-1.5 text-xs">
                  <div className="text-gray-700 font-medium leading-relaxed">{metric.insight}</div>
                  <div className={`${colors.text} flex items-center space-x-1 group-hover:translate-x-1 transition-transform font-medium`}>
                    <span>{metric.action}</span>
                    <ArrowRight size={12} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <div className="grid grid-cols-3 gap-6">
          
          {/* AI Priority Actions - Main Column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="col-span-2 space-y-4"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">AI Priority Actions</h2>
              <span className="px-3 py-1.5 bg-purple-100 text-purple-700 text-sm font-semibold rounded-lg">
                {priorityActions.length} actions
              </span>
            </div>

            <div className="space-y-3">
              {priorityActions.map((action, index) => {
                const statusColors = getStatusColor(action.priority);
                
                return (
                  <motion.div
                    key={action.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className={`bg-white rounded-xl p-5 border-2 ${statusColors.border} shadow-sm hover:shadow-md transition-all cursor-pointer group`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className={`px-2 py-1 ${statusColors.badge} ${statusColors.text} text-xs font-bold rounded uppercase`}>
                            {action.priority}
                          </span>
                          <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded">
                            {action.module}
                          </span>
                          <span className="text-xs text-gray-500">• {action.deadline}</span>
                        </div>
                        <h3 className="text-base font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                          {action.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-3">{action.description}</p>
                        
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <span className="flex items-center space-x-1">
                            <AlertTriangle size={12} />
                            <span>Impact: {action.impact}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Clock size={12} />
                            <span>Effort: {action.effort}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Brain size={12} />
                            <span>AI: {action.aiConfidence}%</span>
                          </span>
                        </div>
                      </div>
                      
                      <ChevronRight className="text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" size={20} />
                    </div>

                    <div className="border-t border-gray-200 pt-3 mt-3">
                      <div className="text-xs font-semibold text-gray-700 mb-2">Recommended Actions:</div>
                      <div className="flex flex-wrap gap-2">
                        {action.actions.map((act, idx) => (
                          <span key={idx} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full border border-blue-200">
                            {act}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Right Sidebar - Quick Insights & Activity */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            
            {/* Quick Insights */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Insights</h3>
              <div className="space-y-3">
                {quickInsights.map((insight, index) => {
                  return (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                      <div>
                        <div className="text-xs font-medium text-gray-600 mb-1">{insight.module}</div>
                        <div className="text-lg font-bold text-gray-900">{insight.value}</div>
                        <div className="text-xs text-gray-500 mt-0.5">{insight.subtext}</div>
                      </div>
                      <div className={`text-xs font-semibold ${
                        insight.trend === 'up' ? 'text-green-600' : 
                        insight.trend === 'down' ? 'text-red-600' : 
                        'text-gray-600'
                      }`}>
                        {insight.change}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {recentActivity.map((activity) => {
                  const Icon = activity.icon;
                  const getColorClasses = (color) => {
                    const colorMap = {
                      purple: { bg: 'bg-purple-100', text: 'text-purple-600' },
                      blue: { bg: 'bg-blue-100', text: 'text-blue-600' },
                      indigo: { bg: 'bg-indigo-100', text: 'text-indigo-600' },
                      green: { bg: 'bg-green-100', text: 'text-green-600' }
                    };
                    return colorMap[color] || colorMap.blue;
                  };
                  const colors = getColorClasses(activity.color);
                  
                  return (
                    <div key={activity.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                      <div className={`w-9 h-9 ${colors.bg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                        <Icon className={colors.text} size={18} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-gray-900 leading-snug">{activity.title}</div>
                        <div className="flex items-center space-x-2 text-xs text-gray-500 mt-1.5">
                          <span>{activity.user}</span>
                          <span>•</span>
                          <span>{activity.time}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <button className="w-full mt-4 py-2 text-sm text-blue-600 hover:text-blue-700 font-semibold transition-colors">
                View All Activity →
              </button>
            </div>

          </motion.div>
        </div>

      </div>
    </div>
  );
};

export default IntegratedDashboard;
