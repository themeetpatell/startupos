import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, Users, Brain, BarChart3, Zap, Shield, 
  ArrowUpRight, ArrowDownRight, Star, Clock, Target,
  CheckCircle, AlertCircle, Plus, MoreHorizontal
} from 'lucide-react';
import { 
  AppleCard, 
  AppleButton, 
  AppleBadge, 
  AppleStatsCard,
  ApplePageHeader,
  AppleList,
  AppleListItem,
  AppleTabs
} from './AppleDesignSystem';

const AppleDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [timeRange, setTimeRange] = useState('7d');

  const stats = [
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
  ];

  const recentActivities = [
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
  ];

  const aiEmployees = [
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
  ];

  const quickActions = [
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
  ];

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'ai-employees', label: 'AI Employees' },
    { id: 'analytics', label: 'Analytics' },
    { id: 'network', label: 'Network' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'success';
      case 'new': return 'primary';
      case 'info': return 'primary';
      case 'warning': return 'warning';
      case 'active': return 'success';
      case 'idle': return 'gray';
      default: return 'gray';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return CheckCircle;
      case 'new': return Plus;
      case 'info': return BarChart3;
      case 'warning': return AlertCircle;
      case 'active': return CheckCircle;
      case 'idle': return Clock;
      default: return Clock;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <ApplePageHeader
          title="Dashboard"
          subtitle="Welcome back! Here's what's happening with your startup."
          action={
            <div className="flex items-center space-x-3">
              <select 
                value={timeRange} 
                onChange={(e) => setTimeRange(e.target.value)}
                className="apple-input px-3 py-2 text-sm"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
              </select>
              <AppleButton size="small" icon={<Plus size={16} />}>
                Quick Action
              </AppleButton>
            </div>
          }
        />

        {/* Tabs */}
        <div className="mb-8">
          <AppleTabs 
            tabs={tabs} 
            activeTab={activeTab} 
            onTabChange={setActiveTab}
          />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <AppleStatsCard
                title={stat.title}
                value={stat.value}
                change={stat.change}
                changeType={stat.changeType}
                icon={<stat.icon className="w-6 h-6" />}
              />
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <AppleCard className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="apple-text-title-3 text-gray-900">Recent Activity</h3>
                <AppleButton variant="tertiary" size="small">
                  View All
                </AppleButton>
              </div>
              
              <AppleList>
                {recentActivities.map((activity) => {
                  const StatusIcon = getStatusIcon(activity.status);
                  return (
                    <AppleListItem key={activity.id} className="p-4">
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
                          <h4 className="apple-text-callout text-gray-900 font-medium">
                            {activity.title}
                          </h4>
                          <p className="apple-text-caption-1 text-gray-600 mt-1">
                            {activity.description}
                          </p>
                          <div className="flex items-center mt-2 space-x-2">
                            <AppleBadge 
                              variant={getStatusColor(activity.status)} 
                              size="small"
                            >
                              {activity.status}
                            </AppleBadge>
                            <span className="apple-text-caption-2 text-gray-500">
                              {activity.time}
                            </span>
                          </div>
                        </div>
                      </div>
                    </AppleListItem>
                  );
                })}
              </AppleList>
            </AppleCard>
          </div>

          {/* AI Employees */}
          <div>
            <AppleCard className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="apple-text-title-3 text-gray-900">AI Employees</h3>
                <AppleButton variant="tertiary" size="small">
                  Manage
                </AppleButton>
              </div>
              
              <div className="space-y-4">
                {aiEmployees.map((employee) => (
                  <div key={employee.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <img
                      src={employee.avatar}
                      alt={employee.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="apple-text-callout text-gray-900 font-medium">
                        {employee.name}
                      </h4>
                      <p className="apple-text-caption-1 text-gray-600">
                        {employee.role}
                      </p>
                      <div className="flex items-center mt-1 space-x-2">
                        <AppleBadge 
                          variant={getStatusColor(employee.status)} 
                          size="small"
                        >
                          {employee.status}
                        </AppleBadge>
                        <span className="apple-text-caption-2 text-gray-500">
                          {employee.tasksCompleted} tasks
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="apple-text-caption-1 text-gray-600">
                        {employee.rating}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </AppleCard>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <AppleCard className="p-6">
            <h3 className="apple-text-title-3 text-gray-900 mb-6">Quick Actions</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickActions.map((action, index) => (
                <motion.button
                  key={index}
                  onClick={action.action}
                  className="p-6 rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all text-left group"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${
                    action.color === 'blue' ? 'from-blue-500 to-blue-600' :
                    action.color === 'green' ? 'from-green-500 to-green-600' :
                    action.color === 'purple' ? 'from-purple-500 to-purple-600' :
                    'from-orange-500 to-orange-600'
                  } flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <action.icon className="w-6 h-6 text-white" />
                  </div>
                  
                  <h4 className="apple-text-callout text-gray-900 font-medium mb-1">
                    {action.title}
                  </h4>
                  <p className="apple-text-caption-1 text-gray-600">
                    {action.description}
                  </p>
                </motion.button>
              ))}
            </div>
          </AppleCard>
        </div>
      </div>
    </div>
  );
};

export default AppleDashboard;
