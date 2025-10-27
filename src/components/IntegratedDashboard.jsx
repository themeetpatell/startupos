import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, Users, Brain, BarChart3, Zap, Shield, 
  ArrowUpRight, ArrowDownRight, Star, Clock, Target,
  CheckCircle, AlertCircle, Plus, DollarSign, Award,
  Calendar, FileText, Settings, Bell, Search, Eye,
  Activity, PieChart, LineChart, BarChart, TrendingDown,
  Lightbulb, AlertTriangle, CheckCircle2, XCircle,
  Play, Pause, RefreshCw, ExternalLink, Download
} from 'lucide-react';

const IntegratedDashboard = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const [selectedKPI, setSelectedKPI] = useState('revenue');

  // OKR Progress & KPIs tracking
  const okrs = useMemo(() => [
    {
      id: 1,
      title: 'Increase Monthly Recurring Revenue',
      target: '$150,000',
      current: '$124,500',
      progress: 83,
      deadline: '2024-03-31',
      status: 'on-track',
      owner: 'Sarah Chen',
      keyResults: [
        { title: 'Acquire 50 new customers', progress: 75, target: 50, current: 38 },
        { title: 'Increase average deal size by 20%', progress: 60, target: 20, current: 12 },
        { title: 'Reduce churn rate to <5%', progress: 90, target: 5, current: 4.2 }
      ]
    },
    {
      id: 2,
      title: 'Improve Product Engagement',
      target: '85%',
      current: '72%',
      progress: 85,
      deadline: '2024-02-28',
      status: 'at-risk',
      owner: 'Michael Rodriguez',
      keyResults: [
        { title: 'Increase daily active users by 30%', progress: 45, target: 30, current: 13.5 },
        { title: 'Achieve 4.5+ app store rating', progress: 80, target: 4.5, current: 4.2 },
        { title: 'Reduce support tickets by 40%', progress: 70, target: 40, current: 28 }
      ]
    },
    {
      id: 3,
      title: 'Build Strong Team Culture',
      target: '90%',
      current: '87%',
      progress: 97,
      deadline: '2024-04-15',
      status: 'exceeding',
      owner: 'Lisa Wang',
      keyResults: [
        { title: 'Achieve 90% employee satisfaction', progress: 95, target: 90, current: 87 },
        { title: 'Reduce turnover to <10%', progress: 85, target: 10, current: 8.5 },
        { title: 'Complete team training programs', progress: 100, target: 100, current: 100 }
      ]
    }
  ], []);

  // Analytics data (merged from analytics page)
  const analytics = useMemo(() => ({
    revenue: {
      current: 124500,
      previous: 110800,
      change: 12.3,
      trend: 'up',
      monthly: [85000, 92000, 105000, 110800, 124500],
      forecast: [130000, 138000, 145000]
    },
    users: {
      total: 2847,
      active: 2156,
      new: 234,
      retention: 78.5,
      growth: 8.2
    },
    engagement: {
      dailyActive: 2156,
      weeklyActive: 2456,
      monthlyActive: 2847,
      sessionDuration: 12.5,
      pagesPerSession: 4.8
    },
    performance: {
      conversionRate: 3.2,
      bounceRate: 42.1,
      avgOrderValue: 156.80,
      customerLifetimeValue: 1240.50
    }
  }), []);

  // Insights & Next tasks suggested
  const insights = useMemo(() => [
    {
      id: 1,
      type: 'insight',
      title: 'Revenue Growth Opportunity',
      description: 'Your MRR is growing 12.3% month-over-month. Consider increasing marketing spend to accelerate growth.',
      priority: 'high',
      action: 'Increase marketing budget by 25%',
      impact: 'Could increase MRR by $15,000',
      icon: TrendingUp,
      color: 'green'
    },
    {
      id: 2,
      type: 'alert',
      title: 'Customer Churn Risk',
      description: '5 customers haven\'t logged in for 14+ days. Immediate follow-up recommended.',
      priority: 'urgent',
      action: 'Send re-engagement campaign',
      impact: 'Prevent $2,400 in lost revenue',
      icon: AlertTriangle,
      color: 'red'
    },
    {
      id: 3,
      type: 'suggestion',
      title: 'Team Performance',
      description: 'AI employees are 95% utilized. Consider hiring additional AI support.',
      priority: 'medium',
      action: 'Hire 2 more AI employees',
      impact: 'Increase productivity by 30%',
      icon: Users,
      color: 'blue'
    },
    {
      id: 4,
      type: 'opportunity',
      title: 'Feature Request',
      description: '3 customers requested custom reporting. High-value feature opportunity.',
      priority: 'medium',
      action: 'Add to product roadmap',
      impact: 'Potential $5,000 ARR increase',
      icon: Lightbulb,
      color: 'yellow'
    }
  ], []);

  const immediateAttention = useMemo(() => [
    {
      id: 1,
      title: 'Budget Overrun Risk',
      description: 'Marketing spend at 78% of monthly budget with 10 days remaining',
      severity: 'high',
      action: 'Review and adjust spending',
      icon: DollarSign
    },
    {
      id: 2,
      title: 'Server Performance',
      description: 'Response times increased by 40% in the last hour',
      severity: 'critical',
      action: 'Check server status immediately',
      icon: Activity
    },
    {
      id: 3,
      title: 'Team Meeting Overdue',
      description: 'Weekly team sync is 2 days overdue',
      severity: 'medium',
      action: 'Schedule team meeting',
      icon: Calendar
    }
  ], []);

  const getStatusColor = useCallback((status) => {
    switch (status) {
      case 'on-track': return 'text-green-600 bg-green-100';
      case 'at-risk': return 'text-yellow-600 bg-yellow-100';
      case 'exceeding': return 'text-blue-600 bg-blue-100';
      case 'success': return 'text-green-600 bg-green-100';
      case 'completed': return 'text-green-600 bg-green-100';
      case 'new': return 'text-blue-600 bg-blue-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'urgent': return 'text-red-600 bg-red-100';
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'critical': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  }, []);

  const getPriorityColor = useCallback((priority) => {
    switch (priority) {
      case 'urgent': return 'border-red-500 bg-red-50';
      case 'high': return 'border-orange-500 bg-orange-50';
      case 'medium': return 'border-yellow-500 bg-yellow-50';
      case 'low': return 'border-green-500 bg-green-50';
      default: return 'border-gray-500 bg-gray-50';
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="mb-6 flex justify-end">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
        </div>

        {/* 1. OKR Progress & KPIs tracking */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">OKR Progress & KPIs</h2>
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Plus className="w-5 h-5" />
              <span>Add OKR</span>
            </button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {okrs.map((okr, index) => (
              <motion.div
                key={okr.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{okr.title}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>Target: {okr.target}</span>
                      <span>Current: {okr.current}</span>
                    </div>
                  </div>
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(okr.status)}`}>
                    {okr.status.replace('-', ' ')}
                  </span>
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-medium">{okr.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full transition-all duration-300 ${
                        okr.progress >= 90 ? 'bg-green-500' :
                        okr.progress >= 70 ? 'bg-blue-500' :
                        okr.progress >= 50 ? 'bg-yellow-500' :
                        'bg-red-500'
                      }`}
                      style={{ width: `${okr.progress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-gray-700">Key Results:</h4>
                  {okr.keyResults.map((kr, krIndex) => (
                    <div key={krIndex} className="text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">{kr.title}</span>
                        <span className="font-medium">{kr.current}/{kr.target}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: `${(kr.current / kr.target) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between text-sm text-gray-500">
                  <span>Owner: {okr.owner}</span>
                  <span>Due: {new Date(okr.deadline).toLocaleDateString()}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 2. Analytics (merged from analytics page) */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Analytics</h2>
            <div className="flex items-center space-x-2">
              <button className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <Download className="w-5 h-5" />
                <span>Export</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <BarChart3 className="w-5 h-5" />
                <span>View Details</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Revenue Card */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Revenue</h3>
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">
                ${analytics.revenue.current.toLocaleString()}
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-green-600" />
                <span className="text-green-600 font-medium">+{analytics.revenue.change}%</span>
                <span className="text-gray-500 text-sm">vs last month</span>
              </div>
            </div>

            {/* Users Card */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Users</h3>
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">
                {analytics.users.total.toLocaleString()}
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-green-600" />
                <span className="text-green-600 font-medium">+{analytics.users.growth}%</span>
                <span className="text-gray-500 text-sm">growth</span>
              </div>
            </div>

            {/* Engagement Card */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Engagement</h3>
                <Activity className="w-6 h-6 text-purple-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">
                {analytics.engagement.dailyActive.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">
                Daily Active Users
              </div>
            </div>

            {/* Performance Card */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Conversion</h3>
                <Target className="w-6 h-6 text-orange-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">
                {analytics.performance.conversionRate}%
              </div>
              <div className="text-sm text-gray-600">
                Conversion Rate
              </div>
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Trend</h3>
              <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                <div className="text-center">
                  <BarChart className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">Revenue chart would be here</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">User Growth</h3>
              <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                <div className="text-center">
                  <LineChart className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">User growth chart would be here</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Insights & Next tasks suggested, immediate attention required */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Insights & Recommendations</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Insights */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Insights & Suggestions</h3>
              <div className="space-y-4">
                {insights.map((insight, index) => (
                  <motion.div
                    key={insight.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-4 rounded-xl border-l-4 ${getPriorityColor(insight.priority)}`}
                  >
                    <div className="flex items-start space-x-3">
                      <insight.icon className={`w-5 h-5 mt-1 ${
                        insight.color === 'green' ? 'text-green-600' :
                        insight.color === 'red' ? 'text-red-600' :
                        insight.color === 'blue' ? 'text-blue-600' :
                        'text-yellow-600'
                      }`} />
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-2">{insight.title}</h4>
                        <p className="text-gray-600 text-sm mb-3">{insight.description}</p>
                        <div className="space-y-2">
                          <div className="text-sm">
                            <span className="font-medium text-gray-700">Action: </span>
                            <span className="text-gray-600">{insight.action}</span>
                          </div>
                          <div className="text-sm">
                            <span className="font-medium text-gray-700">Impact: </span>
                            <span className="text-gray-600">{insight.impact}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Immediate Attention Required */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Immediate Attention Required</h3>
              <div className="space-y-4">
                {immediateAttention.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-4 rounded-xl border ${
                      item.severity === 'critical' ? 'border-red-200 bg-red-50' :
                      item.severity === 'high' ? 'border-orange-200 bg-orange-50' :
                      'border-yellow-200 bg-yellow-50'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <item.icon className={`w-5 h-5 mt-1 ${
                        item.severity === 'critical' ? 'text-red-600' :
                        item.severity === 'high' ? 'text-orange-600' :
                        'text-yellow-600'
                      }`} />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-gray-900">{item.title}</h4>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            item.severity === 'critical' ? 'bg-red-100 text-red-800' :
                            item.severity === 'high' ? 'bg-orange-100 text-orange-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {item.severity}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                        <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
                          {item.action} →
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntegratedDashboard;
