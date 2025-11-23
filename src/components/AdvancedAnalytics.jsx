import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users, 
  Target, 
  Calendar,
  Filter,
  Download,
  RefreshCw,
  Eye,
  Zap,
  AlertTriangle,
  CheckCircle,
  Clock,
  ArrowUp,
  ArrowDown,
  PieChart,
  Activity,
  Globe,
  Smartphone,
  Monitor
} from 'lucide-react';

const AdvancedAnalytics = () => {
  const [timeRange, setTimeRange] = useState('30d');
  const [selectedMetric, setSelectedMetric] = useState('revenue');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Sample data for different metrics
  const revenueData = [
    { month: 'Jan', revenue: 12000, target: 15000, growth: 8.5 },
    { month: 'Feb', revenue: 18000, target: 18000, growth: 12.3 },
    { month: 'Mar', revenue: 25000, target: 22000, growth: 15.7 },
    { month: 'Apr', revenue: 32000, target: 28000, growth: 18.2 },
    { month: 'May', revenue: 45000, target: 35000, growth: 22.1 },
    { month: 'Jun', revenue: 52000, target: 42000, growth: 25.4 },
  ];

  const userAcquisitionData = [
    { week: 'W1', organic: 120, paid: 80, referral: 45, total: 245 },
    { week: 'W2', organic: 135, paid: 95, referral: 52, total: 282 },
    { week: 'W3', organic: 158, paid: 110, referral: 48, total: 316 },
    { week: 'W4', organic: 180, paid: 125, referral: 65, total: 370 },
  ];

  const conversionFunnelData = [
    { stage: 'Visitors', count: 10000, percentage: 100 },
    { stage: 'Sign-ups', count: 1200, percentage: 12 },
    { stage: 'Trials', count: 480, percentage: 4.8 },
    { stage: 'Paid', count: 120, percentage: 1.2 },
  ];

  const cohortData = [
    { cohort: 'Jan 2024', month0: 100, month1: 85, month2: 72, month3: 65, month4: 58, month5: 52 },
    { cohort: 'Feb 2024', month0: 100, month1: 88, month2: 75, month3: 68, month4: 61, month5: null },
    { cohort: 'Mar 2024', month0: 100, month1: 90, month2: 78, month3: 71, month4: null, month5: null },
    { cohort: 'Apr 2024', month0: 100, month1: 92, month2: 80, month3: null, month4: null, month5: null },
    { cohort: 'May 2024', month0: 100, month1: 94, month2: null, month3: null, month4: null, month5: null },
    { cohort: 'Jun 2024', month0: 100, month1: null, month2: null, month3: null, month4: null, month5: null },
  ];

  const deviceData = [
    { name: 'Desktop', value: 45, color: 'rgb(59 130 246)' },
    { name: 'Mobile', value: 35, color: 'rgb(34 197 94)' },
    { name: 'Tablet', value: 20, color: 'rgb(251 146 60)' },
  ];

  const geographicData = [
    { country: 'United States', users: 1250, revenue: 28000, growth: 15.2 },
    { country: 'United Kingdom', users: 680, revenue: 15200, growth: 12.8 },
    { country: 'Canada', users: 420, revenue: 9800, growth: 18.5 },
    { country: 'Germany', users: 380, revenue: 8900, growth: 10.3 },
    { country: 'Australia', users: 290, revenue: 6700, growth: 22.1 },
  ];

  const kpiMetrics = [
    {
      title: 'Monthly Recurring Revenue',
      value: '$52,000',
      change: '+23.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'green',
      target: '$60,000',
      progress: 87
    },
    {
      title: 'Customer Acquisition Cost',
      value: '$125',
      change: '-8.2%',
      trend: 'down',
      icon: Target,
      color: 'blue',
      target: '$100',
      progress: 80
    },
    {
      title: 'Lifetime Value',
      value: '$1,250',
      change: '+12.8%',
      trend: 'up',
      icon: TrendingUp,
      color: 'purple',
      target: '$1,500',
      progress: 83
    },
    {
      title: 'Churn Rate',
      value: '3.2%',
      change: '-1.1%',
      trend: 'down',
      icon: Users,
      color: 'orange',
      target: '2.5%',
      progress: 78
    }
  ];

  const insights = [
    {
      id: 1,
      type: 'opportunity',
      title: 'Revenue Acceleration',
      description: 'Your MRR growth rate is 23% above industry average. Consider increasing marketing spend to capitalize on this momentum.',
      impact: 'High',
      action: 'Increase marketing budget by 30%',
      priority: 'high'
    },
    {
      id: 2,
      type: 'warning',
      title: 'Customer Acquisition Efficiency',
      description: 'CAC payback period has increased to 8 months. Review marketing channel performance and optimize spend allocation.',
      impact: 'Medium',
      action: 'Audit marketing channels',
      priority: 'medium'
    },
    {
      id: 3,
      type: 'success',
      title: 'Retention Improvement',
      description: 'Customer retention has improved by 12% this quarter. Your product improvements are showing positive results.',
      impact: 'High',
      action: 'Document successful strategies',
      priority: 'low'
    }
  ];

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 2000);
  };

  const getInsightColor = (type) => {
    switch (type) {
      case 'opportunity': return 'bg-blue-50 border-blue-200';
      case 'warning': return 'bg-orange-50 border-orange-200';
      case 'success': return 'bg-green-50 border-green-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  const getInsightIcon = (type) => {
    switch (type) {
      case 'opportunity': return <TrendingUp size={16} className="text-blue-600" />;
      case 'warning': return <AlertTriangle size={16} className="text-orange-600" />;
      case 'success': return <CheckCircle size={16} className="text-green-600" />;
      default: return <Activity size={16} className="text-gray-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 flex justify-end"
        >
          <div className="flex items-center justify-between">
            <div>
            </div>
            <div className="flex items-center space-x-3">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="border border-gray-300 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none font-medium transition-all"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="1y">Last year</option>
              </select>
              <button
                onClick={handleRefresh}
                className="flex items-center space-x-2 px-4 py-2.5 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors font-medium"
              >
                <RefreshCw size={16} className={isRefreshing ? 'animate-spin' : ''} />
                <span>Refresh</span>
              </button>
              <button
                className="flex items-center space-x-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all font-medium shadow-sm hover:shadow"
              >
                <Download size={16} />
                <span>Export</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {kpiMetrics.map((kpi, index) => {
            return (
              <motion.div
                key={kpi.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-5"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="text-sm font-medium text-gray-600">{kpi.title}</div>
                  <div className={`flex items-center space-x-1 text-sm font-semibold ${
                    kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {kpi.trend === 'up' ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
                    <span>{kpi.change}</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{kpi.value}</h3>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="text-gray-500">Target: {kpi.target}</span>
                    <span className="text-gray-600 font-medium">{kpi.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full bg-blue-600"
                      style={{ width: `${kpi.progress}%` }}
                    ></div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Revenue Analytics */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Revenue Analytics</h3>
              <div className="flex items-center space-x-2">
                <button className="text-sm text-blue-600 hover:underline">View Details</button>
              </div>
            </div>
            <div className="h-80 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center">
                <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Revenue chart would be here</p>
              </div>
            </div>
          </motion.div>

          {/* AI Insights */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="mb-6">
              <h3 className="text-lg font-bold text-gray-900">AI Insights</h3>
            </div>
            <div className="space-y-3">
              {insights.map((insight) => (
                <div
                  key={insight.id}
                  className={`p-4 rounded-lg border ${getInsightColor(insight.type)}`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="mt-0.5">
                      {getInsightIcon(insight.type)}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm text-gray-900 mb-1">{insight.title}</h4>
                      <p className="text-xs text-gray-600 mb-2">{insight.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-gray-700">Impact: {insight.impact}</span>
                        <button className="text-xs text-blue-600 hover:underline font-medium">Take Action</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* User Acquisition */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-6">User Acquisition Channels</h3>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center">
                <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">User acquisition chart would be here</p>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-6 mt-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Organic</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                <span className="text-sm text-gray-600">Paid</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                <span className="text-sm text-gray-600">Referral</span>
              </div>
            </div>
          </motion.div>

          {/* Device Analytics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Device Usage</h3>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center">
                <PieChart className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Device usage chart would be here</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-4">
              {deviceData.map((device, index) => (
                <div key={device.name} className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    {device.name === 'Desktop' && <Monitor size={20} style={{ color: device.color }} />}
                    {device.name === 'Mobile' && <Smartphone size={20} style={{ color: device.color }} />}
                    {device.name === 'Tablet' && <Smartphone size={20} style={{ color: device.color }} />}
                  </div>
                  <p className="text-sm font-medium text-gray-900">{device.value}%</p>
                  <p className="text-xs text-gray-600">{device.name}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Geographic Analytics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Geographic Performance</h3>
            <div className="flex items-center space-x-2">
              <Globe size={16} className="text-gray-400" />
              <span className="text-sm text-gray-600">Top 5 Countries</span>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Country</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Users</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Revenue</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Growth</th>
                </tr>
              </thead>
              <tbody>
                {geographicData.map((country, index) => (
                  <motion.tr
                    key={country.country}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-6 bg-gray-200 rounded"></div>
                        <span className="font-medium text-gray-900">{country.country}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-600">{country.users.toLocaleString()}</td>
                    <td className="py-4 px-4 text-gray-600">${country.revenue.toLocaleString()}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-1">
                        <ArrowUp size={14} className="text-blue-600" />
                        <span className="text-blue-600 font-medium">{country.growth}%</span>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Conversion Funnel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Conversion Funnel</h3>
          <div className="space-y-4">
            {conversionFunnelData.map((stage, index) => (
              <motion.div
                key={stage.stage}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-900">{stage.stage}</span>
                  <div className="flex items-center space-x-4">
                    <span className="text-gray-600">{stage.count.toLocaleString()}</span>
                    <span className="text-gray-500">{stage.percentage}%</span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-blue-600 h-3 rounded-full transition-all duration-1000"
                    style={{ width: `${stage.percentage}%` }}
                  ></div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdvancedAnalytics;

