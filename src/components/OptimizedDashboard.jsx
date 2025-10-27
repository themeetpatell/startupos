import React, { useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, Users, Brain, BarChart3, Zap, Shield, 
  ArrowUpRight, ArrowDownRight, Star, Clock, Target,
  CheckCircle, AlertCircle, Plus, DollarSign, Award
} from 'lucide-react';

const OptimizedDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [timeRange, setTimeRange] = useState('7d');

  // Memoized stats to prevent unnecessary re-renders
  const stats = useMemo(() => [
    {
      title: "Total Revenue",
      value: "$124,500",
      change: "+12.5%",
      changeType: "positive",
      icon: TrendingUp
    },
    {
      title: "Active Users",
      value: "2,847",
      change: "+8.2%",
      changeType: "positive",
      icon: Users
    },
    {
      title: "AI Employees",
      value: "23",
      change: "+3 new",
      changeType: "positive",
      icon: Brain
    },
    {
      title: "Tasks Completed",
      value: "1,247",
      change: "+15.3%",
      changeType: "positive",
      icon: CheckCircle
    }
  ], []);

  // Memoized recent activities
  const recentActivities = useMemo(() => [
    {
      id: 1,
      type: 'ai_task',
      title: 'Marketing campaign completed',
      description: 'Alex AI finished the Q1 social media strategy',
      time: '2 minutes ago',
      status: 'completed',
      icon: Brain
    },
    {
      id: 2,
      type: 'user_signup',
      title: 'New user registered',
      description: 'Sarah Chen joined your startup network',
      time: '15 minutes ago',
      status: 'new',
      icon: Users
    },
    {
      id: 3,
      type: 'analytics',
      title: 'Weekly report ready',
      description: 'Your performance analytics are available',
      time: '1 hour ago',
      status: 'info',
      icon: BarChart3
    },
    {
      id: 4,
      type: 'alert',
      title: 'Budget alert',
      description: 'You\'re approaching 80% of your monthly budget',
      time: '2 hours ago',
      status: 'warning',
      icon: AlertCircle
    }
  ], []);

  // Memoized AI employees
  const aiEmployees = useMemo(() => [
    {
      id: 1,
      name: 'Alex AI',
      role: 'Marketing Specialist',
      status: 'active',
      tasksCompleted: 45,
      rating: 4.9,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
    },
    {
      id: 2,
      name: 'Sarah AI',
      role: 'Data Analyst',
      status: 'active',
      tasksCompleted: 32,
      rating: 4.8,
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face'
    },
    {
      id: 3,
      name: 'Mike AI',
      role: 'Customer Support',
      status: 'idle',
      tasksCompleted: 28,
      rating: 4.7,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
    }
  ], []);

  // Memoized quick actions
  const quickActions = useMemo(() => [
    {
      title: 'Hire AI Employee',
      description: 'Add a new AI team member',
      icon: Plus,
      color: 'blue',
      action: () => console.log('Hire AI Employee')
    },
    {
      title: 'View Analytics',
      description: 'Check performance metrics',
      icon: BarChart3,
      color: 'green',
      action: () => console.log('View Analytics')
    },
    {
      title: 'Create Task',
      description: 'Assign work to AI employees',
      icon: Target,
      color: 'purple',
      action: () => console.log('Create Task')
    },
    {
      title: 'Network',
      description: 'Connect with experts',
      icon: Users,
      color: 'orange',
      action: () => console.log('Network')
    }
  ], []);

  const tabs = useMemo(() => [
    { id: 'overview', label: 'Overview' },
    { id: 'ai-employees', label: 'AI Employees' },
    { id: 'analytics', label: 'Analytics' },
    { id: 'ecosystem', label: 'Ecosystem' }
  ], []);

  // Memoized status helpers
  const getStatusColor = useCallback((status) => {
    switch (status) {
      case 'completed': return 'success';
      case 'new': return 'primary';
      case 'info': return 'primary';
      case 'warning': return 'warning';
      case 'active': return 'success';
      case 'idle': return 'gray';
      default: return 'gray';
    }
  }, []);

  const getStatusIcon = useCallback((status) => {
    switch (status) {
      case 'completed': return CheckCircle;
      case 'new': return Plus;
      case 'info': return BarChart3;
      case 'warning': return AlertCircle;
      case 'active': return CheckCircle;
      case 'idle': return Clock;
      default: return Clock;
    }
  }, []);

  // Memoized tab content renderer
  const renderTabContent = useCallback(() => {
    switch (activeTab) {
      case 'overview':
        return (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="enterprise-stats-card">
                    <div className="enterprise-stats-card-header">
                      <h3 className="enterprise-stats-card-title">{stat.title}</h3>
                      <stat.icon className="w-6 h-6 text-slate-600" />
                    </div>
                    <h2 className="enterprise-stats-card-value">{stat.value}</h2>
                    <div className={`enterprise-stats-card-change ${stat.changeType === 'positive' ? 'positive' : 'negative'}`}>
                      {stat.changeType === 'positive' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                      {stat.change}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
              {/* Recent Activity */}
              <div className="xl:col-span-2">
                <div className="enterprise-card p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="enterprise-text-title-3 text-gray-900">Recent Activity</h3>
                    <button className="enterprise-button-tertiary enterprise-button-sm">
                      View All
                    </button>
                  </div>
                  
                  <div className="enterprise-list">
                    {recentActivities.map((activity) => {
                      const StatusIcon = getStatusIcon(activity.status);
                      return (
                        <div className="enterprise-list-item" key={activity.id}>
                          <div className="flex items-start space-x-4">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              activity.status === 'completed' ? 'bg-green-100' :
                              activity.status === 'new' ? 'bg-blue-100' :
                              activity.status === 'info' ? 'bg-blue-100' :
                              activity.status === 'warning' ? 'bg-yellow-100' :
                              'bg-gray-100'
                            }`}>
                              <StatusIcon className={`w-5 h-5 ${
                                activity.status === 'completed' ? 'text-green-600' :
                                activity.status === 'new' ? 'text-blue-600' :
                                activity.status === 'info' ? 'text-blue-600' :
                                activity.status === 'warning' ? 'text-yellow-600' :
                                'text-gray-600'
                              }`} />
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <h4 className="enterprise-text-callout text-gray-900 font-medium">
                                {activity.title}
                              </h4>
                              <p className="enterprise-text-caption-1 text-gray-600 mt-1">
                                {activity.description}
                              </p>
                              <div className="flex items-center mt-2 space-x-2">
                                <span className={`enterprise-badge ${
                                  getStatusColor(activity.status) === 'success' ? 'enterprise-badge-success' :
                                  getStatusColor(activity.status) === 'primary' ? 'enterprise-badge-primary' :
                                  getStatusColor(activity.status) === 'warning' ? 'enterprise-badge-warning' :
                                  'enterprise-badge-gray'
                                }`}>
                                  {activity.status}
                                </span>
                                <span className="enterprise-text-caption-2 text-gray-500">
                                  {activity.time}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* AI Employees */}
              <div>
                <div className="enterprise-card p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="enterprise-text-title-3 text-gray-900">AI Employees</h3>
                    <button className="enterprise-button-tertiary enterprise-button-sm">
                      Manage
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    {aiEmployees.map((employee) => (
                      <div key={employee.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                        <img
                          src={employee.avatar}
                          alt={employee.name}
                          className="w-10 h-10 rounded-full"
                          loading="lazy"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="enterprise-text-callout text-gray-900 font-medium">
                            {employee.name}
                          </h4>
                          <p className="enterprise-text-caption-1 text-gray-600">
                            {employee.role}
                          </p>
                          <div className="flex items-center mt-1 space-x-2">
                            <span className="enterprise-badge enterprise-badge-primary" 
                              variant={getStatusColor(employee.status)} 
                              size="small"
                            >
                              {employee.status}
                            </span>
                            <span className="enterprise-text-caption-2 text-gray-500">
                              {employee.tasksCompleted} tasks
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="enterprise-text-caption-1 text-gray-600">
                            {employee.rating}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      
      case 'ai-employees':
        return (
          <div className="enterprise-card p-6">
            <h3 className="enterprise-text-title-3 text-gray-900 mb-6">AI Employee Management</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {aiEmployees.map((employee) => (
                <div key={employee.id} className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-3 mb-4">
                    <img
                      src={employee.avatar}
                      alt={employee.name}
                      className="w-12 h-12 rounded-full"
                      loading="lazy"
                    />
                    <div>
                      <h4 className="enterprise-text-body font-semibold text-gray-900">
                        {employee.name}
                      </h4>
                      <p className="enterprise-text-body-sm text-gray-600">
                        {employee.role}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Status:</span>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        employee.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {employee.status}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Tasks:</span>
                      <span className="font-medium">{employee.tasksCompleted}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Rating:</span>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="font-medium">{employee.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'analytics':
        return (
          <div className="enterprise-card p-6">
            <h3 className="enterprise-text-title-3 text-gray-900 mb-6">Analytics Dashboard</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-50 rounded-lg p-6">
                <h4 className="enterprise-text-body font-semibold text-blue-900 mb-2">Performance Metrics</h4>
                <p className="enterprise-text-body-sm text-blue-700">Track your startup's key performance indicators and growth metrics.</p>
              </div>
              <div className="bg-green-50 rounded-lg p-6">
                <h4 className="enterprise-text-body font-semibold text-green-900 mb-2">Revenue Analytics</h4>
                <p className="enterprise-text-body-sm text-green-700">Monitor revenue trends, customer acquisition costs, and lifetime value.</p>
              </div>
              <div className="bg-purple-50 rounded-lg p-6">
                <h4 className="enterprise-text-body font-semibold text-purple-900 mb-2">User Engagement</h4>
                <p className="enterprise-text-body-sm text-purple-700">Analyze user behavior, feature adoption, and retention rates.</p>
              </div>
              <div className="bg-orange-50 rounded-lg p-6">
                <h4 className="enterprise-text-body font-semibold text-orange-900 mb-2">Market Analysis</h4>
                <p className="enterprise-text-body-sm text-orange-700">Compare your performance against industry benchmarks and competitors.</p>
              </div>
            </div>
          </div>
        );
      
      case 'ecosystem':
        return (
          <div className="enterprise-card p-6">
            <h3 className="enterprise-text-title-3 text-gray-900 mb-6">Ecosystem Overview</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 border border-slate-200 rounded-lg">
                <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h4 className="enterprise-text-body font-semibold text-gray-900 mb-2">Startups</h4>
                <p className="enterprise-text-body-sm text-gray-600">3,200+ companies in our network</p>
              </div>
              <div className="text-center p-6 border border-slate-200 rounded-lg">
                <DollarSign className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h4 className="enterprise-text-body font-semibold text-gray-900 mb-2">Investors</h4>
                <p className="enterprise-text-body-sm text-gray-600">1,250+ funding partners</p>
              </div>
              <div className="text-center p-6 border border-slate-200 rounded-lg">
                <Award className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h4 className="enterprise-text-body font-semibold text-gray-900 mb-2">Mentors</h4>
                <p className="enterprise-text-body-sm text-gray-600">234+ expert advisors</p>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  }, [activeTab, stats, recentActivities, aiEmployees, getStatusColor, getStatusIcon]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="enterprise-page-header">
          <h1 className="enterprise-page-header-title">Dashboard</h1>
          <p className="enterprise-page-header-subtitle">Welcome back! Here's what's happening with your startup.</p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mt-4">
            <select 
              value={timeRange} 
              onChange={(e) => setTimeRange(e.target.value)}
              className="enterprise-input px-4 py-2 text-sm min-w-[140px]"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
            </select>
            <button className="enterprise-button-primary enterprise-button-sm flex items-center gap-2 hover:scale-105 transition-transform">
              <Plus size={16} />
              Quick Action
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="enterprise-tabs overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`enterprise-tab whitespace-nowrap ${activeTab === tab.id ? 'active' : ''}`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {renderTabContent()}

        {/* Quick Actions */}
        <div className="mt-8">
          <div className="enterprise-card p-6">
            <h3 className="enterprise-text-title-3 text-gray-900 mb-6">Quick Actions</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickActions.map((action, index) => (
                <motion.button
                  key={index}
                  onClick={action.action}
                  className="p-6 rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-lg transition-all text-left group bg-white hover:bg-slate-50"
                  whileHover={{ y: -4, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className={`w-12 h-12 rounded-xl ${
                    action.color === 'blue' ? 'bg-gradient-to-br from-blue-500 to-blue-600' :
                    action.color === 'green' ? 'bg-gradient-to-br from-green-500 to-green-600' :
                    action.color === 'purple' ? 'bg-gradient-to-br from-purple-500 to-purple-600' :
                    'bg-gradient-to-br from-orange-500 to-orange-600'
                  } flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                    <action.icon className="w-6 h-6 text-white" />
                  </div>
                  
                  <h4 className="enterprise-text-body font-semibold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {action.title}
                  </h4>
                  <p className="enterprise-text-body-sm text-slate-600 leading-relaxed">
                    {action.description}
                  </p>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OptimizedDashboard;

