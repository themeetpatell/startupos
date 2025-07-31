import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  Users, 
  Calendar, 
  MessageSquare, 
  FileText, 
  BarChart3, 
  Settings, 
  Bell, 
  Search, 
  Plus, 
  Filter, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  TrendingUp, 
  DollarSign, 
  Target, 
  Zap, 
  Activity, 
  Star, 
  Eye, 
  Edit3, 
  Share2, 
  Download, 
  Upload, 
  Link, 
  Mail, 
  Phone, 
  Video, 
  Briefcase, 
  Award, 
  Rocket, 
  Heart, 
  Globe, 
  Shield, 
  Lock, 
  Unlock,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  MoreHorizontal,
  Bookmark,
  Flag,
  Archive,
  Trash2
} from 'lucide-react';
import '../App.css';

const DigitalHQ = () => {
  const [activeView, setActiveView] = useState('overview');
  const [notifications, setNotifications] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);

  const quickActions = [
    { id: 1, title: 'Schedule Team Meeting', icon: Calendar, color: 'blue', action: 'meeting' },
    { id: 2, title: 'Create New Project', icon: Plus, color: 'green', action: 'project' },
    { id: 3, title: 'Review Analytics', icon: BarChart3, color: 'purple', action: 'analytics' },
    { id: 4, title: 'Send Team Update', icon: MessageSquare, color: 'orange', action: 'message' },
    { id: 5, title: 'Upload Documents', icon: Upload, color: 'pink', action: 'upload' },
    { id: 6, title: 'Invite Team Member', icon: Users, color: 'indigo', action: 'invite' }
  ];

  const dashboardStats = [
    { title: 'Active Projects', value: '12', change: '+3', icon: Briefcase, color: 'blue' },
    { title: 'Team Members', value: '24', change: '+2', icon: Users, color: 'green' },
    { title: 'This Month Revenue', value: '$52K', change: '+23%', icon: DollarSign, color: 'purple' },
    { title: 'Tasks Completed', value: '89%', change: '+5%', icon: CheckCircle, color: 'orange' }
  ];

  const recentProjects = [
    {
      id: 1,
      name: 'AI Workflow Engine',
      status: 'in-progress',
      progress: 75,
      team: ['👩‍💼', '👨‍💻', '👩‍🎨'],
      dueDate: '2024-02-15',
      priority: 'high'
    },
    {
      id: 2,
      name: 'Mobile App Launch',
      status: 'review',
      progress: 90,
      team: ['👨‍🔬', '👩‍💻'],
      dueDate: '2024-02-20',
      priority: 'medium'
    },
    {
      id: 3,
      name: 'Customer Onboarding',
      status: 'planning',
      progress: 25,
      team: ['👩‍💼', '👨‍💼'],
      dueDate: '2024-03-01',
      priority: 'low'
    }
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: 'Weekly Team Standup',
      time: '9:00 AM',
      date: 'Today',
      type: 'meeting',
      attendees: 8
    },
    {
      id: 2,
      title: 'Product Demo Review',
      time: '2:00 PM',
      date: 'Today',
      type: 'review',
      attendees: 5
    },
    {
      id: 3,
      title: 'Investor Pitch Prep',
      time: '10:00 AM',
      date: 'Tomorrow',
      type: 'presentation',
      attendees: 3
    },
    {
      id: 4,
      title: 'Q1 Planning Session',
      time: '1:00 PM',
      date: 'Friday',
      type: 'planning',
      attendees: 12
    }
  ];

  const teamUpdates = [
    {
      id: 1,
      author: 'Sarah Chen',
      avatar: '👩‍💼',
      action: 'completed',
      target: 'AI model training',
      time: '2 hours ago',
      type: 'completion'
    },
    {
      id: 2,
      author: 'Marcus Rodriguez',
      avatar: '👨‍💻',
      action: 'deployed',
      target: 'new API endpoints',
      time: '4 hours ago',
      type: 'deployment'
    },
    {
      id: 3,
      author: 'Emily Watson',
      avatar: '👩‍🎨',
      action: 'updated',
      target: 'user interface designs',
      time: '6 hours ago',
      type: 'update'
    },
    {
      id: 4,
      author: 'David Kim',
      avatar: '👨‍🔬',
      action: 'fixed',
      target: 'critical bug in payment system',
      time: '8 hours ago',
      type: 'fix'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'in-progress': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'review': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'planning': return 'text-gray-600 bg-gray-50 border-gray-200';
      case 'completed': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'completion': return CheckCircle;
      case 'deployment': return Rocket;
      case 'update': return Edit3;
      case 'fix': return Shield;
      default: return Activity;
    }
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
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-10 h-10 startupos-gradient rounded-xl flex items-center justify-center">
                  <Home className="text-white" size={20} />
                </div>
                <h1 className="text-3xl font-bold startupos-gradient-text">Digital HQ</h1>
              </div>
              <p className="text-gray-600">
                Your startup's command center - manage everything from one place
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <motion.button
                className="p-3 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors relative"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Bell size={20} className="text-gray-600" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </motion.button>
              <motion.button
                className="flex items-center space-x-2 px-4 py-3 startupos-gradient text-white rounded-xl hover:shadow-lg transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Plus size={20} />
                <span>Quick Action</span>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {dashboardStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover-lift"
              >
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    stat.color === 'blue' ? 'bg-blue-50 text-blue-600' :
                    stat.color === 'green' ? 'bg-green-50 text-green-600' :
                    stat.color === 'purple' ? 'bg-purple-50 text-purple-600' :
                    'bg-orange-50 text-orange-600'
                  }`}>
                    <Icon size={24} />
                  </div>
                  <span className="text-sm font-medium text-green-600">{stat.change}</span>
                </div>
                <div className="mt-4">
                  <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                  <p className="text-gray-600 text-sm mt-1">{stat.title}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Quick Actions</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {quickActions.map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <motion.button
                      key={action.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className={`flex flex-col items-center space-y-3 p-4 rounded-xl border-2 border-transparent hover:border-${action.color}-200 hover:bg-${action.color}-50 transition-all group`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center bg-${action.color}-50 text-${action.color}-600 group-hover:bg-${action.color}-100 transition-colors`}>
                        <Icon size={24} />
                      </div>
                      <span className="text-sm font-medium text-gray-700 text-center">{action.title}</span>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>

            {/* Recent Projects */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Recent Projects</h2>
                <motion.button
                  className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center space-x-1"
                  whileHover={{ scale: 1.05 }}
                >
                  <span>View All</span>
                  <ChevronRight size={16} />
                </motion.button>
              </div>
              <div className="space-y-4">
                {recentProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-medium text-gray-900">{project.name}</h3>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(project.status)}`}>
                          {project.status.replace('-', ' ')}
                        </span>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(project.priority)}`}>
                          {project.priority}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <div className="flex -space-x-1">
                            {project.team.map((avatar, avatarIndex) => (
                              <div
                                key={avatarIndex}
                                className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-xs border-2 border-white"
                              >
                                {avatar}
                              </div>
                            ))}
                          </div>
                          <span className="text-sm text-gray-500">{project.team.length} members</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full transition-all"
                              style={{ width: `${project.progress}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-500">{project.progress}%</span>
                        </div>
                        <span className="text-sm text-gray-500">Due {project.dueDate}</span>
                      </div>
                    </div>
                    <motion.button
                      className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <MoreHorizontal size={16} />
                    </motion.button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Upcoming Events */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Upcoming Events</h2>
                <motion.button
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Plus size={16} />
                </motion.button>
              </div>
              <div className="space-y-4">
                {upcomingEvents.map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
                      <Calendar size={16} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 text-sm">{event.title}</h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-xs text-gray-500">{event.date}</span>
                        <span className="text-xs text-gray-500">•</span>
                        <span className="text-xs text-gray-500">{event.time}</span>
                        <span className="text-xs text-gray-500">•</span>
                        <span className="text-xs text-gray-500">{event.attendees} attendees</span>
                      </div>
                    </div>
                    <motion.button
                      className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ExternalLink size={14} />
                    </motion.button>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Team Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Team Activity</h2>
                <motion.button
                  className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                  whileHover={{ scale: 1.05 }}
                >
                  View All
                </motion.button>
              </div>
              <div className="space-y-4">
                {teamUpdates.map((update, index) => {
                  const Icon = getActivityIcon(update.type);
                  return (
                    <motion.div
                      key={update.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start space-x-3"
                    >
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-sm">
                        {update.avatar}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">
                          <span className="font-medium">{update.author}</span>
                          <span className="text-gray-600"> {update.action} </span>
                          <span className="font-medium">{update.target}</span>
                        </p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Icon size={12} className="text-gray-400" />
                          <span className="text-xs text-gray-500">{update.time}</span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DigitalHQ;

