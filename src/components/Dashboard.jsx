import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  Target, 
  Calendar,
  Clock,
  AlertCircle,
  CheckCircle,
  ArrowUp,
  ArrowDown,
  Brain,
  Workflow,
  BarChart3,
  Zap,
  Star,
  MessageSquare,
  FileText,
  Globe
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import '../App.css';

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState('30d');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Sample data
  const revenueData = [
    { month: 'Jan', revenue: 12000, target: 15000 },
    { month: 'Feb', revenue: 18000, target: 18000 },
    { month: 'Mar', revenue: 25000, target: 22000 },
    { month: 'Apr', revenue: 32000, target: 28000 },
    { month: 'May', revenue: 45000, target: 35000 },
    { month: 'Jun', revenue: 52000, target: 42000 },
  ];

  const userGrowthData = [
    { week: 'W1', users: 1200 },
    { week: 'W2', users: 1350 },
    { week: 'W3', users: 1580 },
    { week: 'W4', users: 1820 },
  ];

  const metricsData = [
    { name: 'Active Users', value: 85, color: '#3B82F6' },
    { name: 'Conversion', value: 12, color: '#10B981' },
    { name: 'Churn Rate', value: 3, color: '#EF4444' },
  ];

  const kpis = [
    {
      title: 'Monthly Revenue',
      value: '$52,000',
      change: '+23%',
      trend: 'up',
      icon: DollarSign,
      color: 'green'
    },
    {
      title: 'Active Users',
      value: '1,820',
      change: '+15%',
      trend: 'up',
      icon: Users,
      color: 'blue'
    },
    {
      title: 'Conversion Rate',
      value: '12.5%',
      change: '+2.1%',
      trend: 'up',
      icon: Target,
      color: 'purple'
    },
    {
      title: 'Burn Rate',
      value: '$28,000',
      change: '-5%',
      trend: 'down',
      icon: TrendingUp,
      color: 'orange'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'ai_suggestion',
      title: 'AI Copilot Recommendation',
      description: 'New funding strategy suggestion available',
      time: '2 minutes ago',
      icon: Brain,
      color: 'blue'
    },
    {
      id: 2,
      type: 'workflow',
      title: 'Workflow Completed',
      description: 'Customer onboarding process finished successfully',
      time: '15 minutes ago',
      icon: CheckCircle,
      color: 'green'
    },
    {
      id: 3,
      type: 'expert',
      title: 'Expert Match Found',
      description: 'Perfect CTO candidate identified for your startup',
      time: '1 hour ago',
      icon: Users,
      color: 'purple'
    },
    {
      id: 4,
      type: 'alert',
      title: 'Metric Alert',
      description: 'Customer acquisition cost increased by 15%',
      time: '2 hours ago',
      icon: AlertCircle,
      color: 'orange'
    }
  ];

  const upcomingTasks = [
    {
      id: 1,
      title: 'Investor Meeting Prep',
      description: 'Prepare pitch deck for Series A meeting',
      dueDate: 'Today, 3:00 PM',
      priority: 'high',
      completed: false
    },
    {
      id: 2,
      title: 'Product Roadmap Review',
      description: 'Quarterly product planning session',
      dueDate: 'Tomorrow, 10:00 AM',
      priority: 'medium',
      completed: false
    },
    {
      id: 3,
      title: 'Team Performance Review',
      description: 'Monthly team evaluation and feedback',
      dueDate: 'Friday, 2:00 PM',
      priority: 'medium',
      completed: true
    },
    {
      id: 4,
      title: 'Market Research Analysis',
      description: 'Analyze competitor landscape and positioning',
      dueDate: 'Next Monday',
      priority: 'low',
      completed: false
    }
  ];

  const quickActions = [
    { id: 'ai_chat', title: 'Ask AI Copilot', icon: Brain, color: 'blue' },
    { id: 'create_workflow', title: 'Create Workflow', icon: Workflow, color: 'purple' },
    { id: 'view_analytics', title: 'View Analytics', icon: BarChart3, color: 'green' },
    { id: 'find_expert', title: 'Find Expert', icon: Users, color: 'orange' },
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-blue-600 bg-blue-50 border-blue-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getActivityColor = (color) => {
    const colors = {
      blue: 'text-blue-600 bg-blue-50',
      green: 'text-green-600 bg-green-50',
      purple: 'text-purple-600 bg-purple-50',
      orange: 'text-orange-600 bg-orange-50',
    };
    return colors[color] || 'text-gray-600 bg-gray-50';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600 mt-1">
                Welcome back! Here's what's happening with your startup today.
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Current Time</p>
              <p className="text-lg font-semibold text-gray-900">
                {currentTime.toLocaleTimeString()}
              </p>
              <p className="text-sm text-gray-600">
                {currentTime.toLocaleDateString()}
              </p>
            </div>
          </div>
        </motion.div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {kpis.map((kpi, index) => {
            const Icon = kpi.icon;
            return (
              <motion.div
                key={kpi.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover-lift"
              >
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    kpi.color === 'green' ? 'bg-green-50 text-green-600' :
                    kpi.color === 'blue' ? 'bg-blue-50 text-blue-600' :
                    kpi.color === 'purple' ? 'bg-purple-50 text-purple-600' :
                    'bg-orange-50 text-orange-600'
                  }`}>
                    <Icon size={24} />
                  </div>
                  <div className={`flex items-center space-x-1 text-sm font-medium ${
                    kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {kpi.trend === 'up' ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
                    <span>{kpi.change}</span>
                  </div>
                </div>
                <div className="mt-4">
                  <h3 className="text-2xl font-bold text-gray-900">{kpi.value}</h3>
                  <p className="text-gray-600 text-sm mt-1">{kpi.title}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Revenue Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Revenue Growth</h3>
              <div className="flex items-center space-x-2">
                <select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="text-sm border border-gray-300 rounded-lg px-3 py-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="7d">7 days</option>
                  <option value="30d">30 days</option>
                  <option value="90d">90 days</option>
                  <option value="1y">1 year</option>
                </select>
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#3B82F6" 
                    strokeWidth={2}
                    fill="url(#revenueGradient)" 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="target" 
                    stroke="#10B981" 
                    strokeWidth={2}
                    strokeDasharray="5 5"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Quick Actions</h3>
            <div className="space-y-3">
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <motion.button
                    key={action.id}
                    className={`w-full flex items-center space-x-3 p-4 rounded-lg border border-gray-200 hover:border-${action.color}-300 hover:bg-${action.color}-50 transition-all group`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      action.color === 'blue' ? 'bg-blue-50 text-blue-600 group-hover:bg-blue-100' :
                      action.color === 'purple' ? 'bg-purple-50 text-purple-600 group-hover:bg-purple-100' :
                      action.color === 'green' ? 'bg-green-50 text-green-600 group-hover:bg-green-100' :
                      'bg-orange-50 text-orange-600 group-hover:bg-orange-100'
                    }`}>
                      <Icon size={20} />
                    </div>
                    <span className="font-medium text-gray-900 group-hover:text-gray-700">
                      {action.title}
                    </span>
                  </motion.button>
                );
              })}
            </div>

            {/* AI Insights Widget */}
            <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
              <div className="flex items-center space-x-2 mb-2">
                <Zap size={16} className="text-blue-600" />
                <span className="text-sm font-medium text-blue-900">AI Insight</span>
              </div>
              <p className="text-sm text-blue-800">
                Your revenue growth is 23% above target. Consider increasing marketing spend to capitalize on this momentum.
              </p>
              <button className="text-xs text-blue-600 font-medium mt-2 hover:underline">
                View detailed analysis →
              </button>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activities */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Activities</h3>
            <div className="space-y-4">
              {recentActivities.map((activity) => {
                const Icon = activity.icon;
                return (
                  <motion.div
                    key={activity.id}
                    className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getActivityColor(activity.color)}`}>
                      <Icon size={18} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{activity.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                      <span className="text-xs text-gray-500 mt-2 block">{activity.time}</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Upcoming Tasks */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Upcoming Tasks</h3>
            <div className="space-y-4">
              {upcomingTasks.map((task) => (
                <motion.div
                  key={task.id}
                  className={`p-4 rounded-lg border transition-all ${
                    task.completed ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200 hover:border-gray-300'
                  }`}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h4 className={`font-medium ${task.completed ? 'text-green-800 line-through' : 'text-gray-900'}`}>
                          {task.title}
                        </h4>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getPriorityColor(task.priority)}`}>
                          {task.priority}
                        </span>
                      </div>
                      <p className={`text-sm mt-1 ${task.completed ? 'text-green-600' : 'text-gray-600'}`}>
                        {task.description}
                      </p>
                      <div className="flex items-center space-x-2 mt-2">
                        <Clock size={14} className="text-gray-400" />
                        <span className="text-xs text-gray-500">{task.dueDate}</span>
                      </div>
                    </div>
                    <div className="ml-3">
                      {task.completed ? (
                        <CheckCircle size={20} className="text-green-600" />
                      ) : (
                        <div className="w-5 h-5 border-2 border-gray-300 rounded-full"></div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {/* User Growth */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">User Growth</h3>
            <div className="h-32">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={userGrowthData}>
                  <Bar dataKey="users" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                  <XAxis dataKey="week" axisLine={false} tickLine={false} />
                  <Tooltip />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Metrics Breakdown */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Metrics</h3>
            <div className="h-32">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={metricsData}
                    cx="50%"
                    cy="50%"
                    innerRadius={30}
                    outerRadius={50}
                    dataKey="value"
                  >
                    {metricsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Platform Status */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Platform Status</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">AI Copilot</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-green-600">Online</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Workflows</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-green-600">Active</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Expert Network</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-green-600">Available</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Analytics</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm text-yellow-600">Updating</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;

