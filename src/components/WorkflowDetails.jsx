import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Workflow, 
  Play, 
  Pause, 
  Square, 
  RotateCcw, 
  Settings, 
  Plus, 
  Edit3, 
  Trash2, 
  Copy, 
  Share2, 
  Download, 
  Upload, 
  Search, 
  Filter, 
  Calendar, 
  Clock, 
  Users, 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  Circle, 
  ArrowRight, 
  ArrowDown, 
  ArrowUp, 
  MoreHorizontal, 
  Eye, 
  EyeOff, 
  Star, 
  Flag, 
  Tag, 
  Hash, 
  AtSign, 
  MessageSquare, 
  FileText, 
  Folder, 
  Link, 
  Zap, 
  Target, 
  TrendingUp, 
  BarChart3, 
  PieChart, 
  Activity, 
  Bell, 
  BellOff, 
  Lock, 
  Unlock, 
  Shield, 
  Key, 
  Database, 
  Server, 
  Code, 
  GitBranch, 
  Layers, 
  Box, 
  Grid, 
  List, 
  Kanban,
  History,
  BarChart
} from 'lucide-react';
import '../App.css';

const WorkflowDetails = () => {
  const [activeTab, setActiveTab] = useState('workflows');
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedWorkflow, setSelectedWorkflow] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const tabs = [
    { id: 'workflows', label: 'Workflows', icon: Workflow, count: 12 },
    { id: 'projects', label: 'Projects', icon: Folder, count: 8 },
    { id: 'tasks', label: 'Tasks', icon: CheckCircle, count: 47 },
    { id: 'templates', label: 'Templates', icon: Copy, count: 15 }
  ];

  const workflows = [
    {
      id: 1,
      name: 'Customer Onboarding',
      description: 'Automated workflow for new customer onboarding process',
      status: 'active',
      category: 'Customer Success',
      trigger: 'New customer signup',
      steps: 8,
      completedRuns: 156,
      successRate: 94.2,
      avgDuration: '2.5 hours',
      lastRun: '2 hours ago',
      nextRun: 'On trigger',
      assignees: ['👩‍💼', '👨‍💻', '👩‍🎨'],
      tags: ['automation', 'customer', 'onboarding'],
      priority: 'high',
      created: '2023-06-15',
      updated: '2024-01-20'
    },
    {
      id: 2,
      name: 'Lead Qualification',
      description: 'Automated lead scoring and qualification process',
      status: 'active',
      category: 'Sales',
      trigger: 'New lead captured',
      steps: 6,
      completedRuns: 234,
      successRate: 87.5,
      avgDuration: '45 minutes',
      lastRun: '30 minutes ago',
      nextRun: 'On trigger',
      assignees: ['👨‍💼', '👩‍💼'],
      tags: ['sales', 'leads', 'qualification'],
      priority: 'high',
      created: '2023-07-01',
      updated: '2024-01-18'
    },
    {
      id: 3,
      name: 'Employee Onboarding',
      description: 'Complete new employee onboarding and setup process',
      status: 'active',
      category: 'HR',
      trigger: 'New hire confirmed',
      steps: 12,
      completedRuns: 24,
      successRate: 100,
      avgDuration: '3 days',
      lastRun: '1 day ago',
      nextRun: 'Manual',
      assignees: ['👩‍💼', '👨‍🔬', '👩‍🎨'],
      tags: ['hr', 'onboarding', 'employees'],
      priority: 'medium',
      created: '2023-08-10',
      updated: '2024-01-15'
    },
    {
      id: 4,
      name: 'Product Release',
      description: 'End-to-end product release and deployment workflow',
      status: 'paused',
      category: 'Engineering',
      trigger: 'Release approved',
      steps: 15,
      completedRuns: 8,
      successRate: 75,
      avgDuration: '4 hours',
      lastRun: '3 days ago',
      nextRun: 'Paused',
      assignees: ['👨‍💻', '👨‍🔬', '👩‍💻'],
      tags: ['engineering', 'release', 'deployment'],
      priority: 'high',
      created: '2023-09-05',
      updated: '2024-01-10'
    },
    {
      id: 5,
      name: 'Content Publishing',
      description: 'Automated content review, approval, and publishing workflow',
      status: 'active',
      category: 'Marketing',
      trigger: 'Content submitted',
      steps: 5,
      completedRuns: 89,
      successRate: 92.1,
      avgDuration: '1.5 hours',
      lastRun: '4 hours ago',
      nextRun: 'On trigger',
      assignees: ['👩‍🎨', '👨‍💼'],
      tags: ['marketing', 'content', 'publishing'],
      priority: 'medium',
      created: '2023-10-12',
      updated: '2024-01-12'
    },
    {
      id: 6,
      name: 'Bug Triage',
      description: 'Automated bug report triage and assignment process',
      status: 'active',
      category: 'Engineering',
      trigger: 'Bug reported',
      steps: 4,
      completedRuns: 167,
      successRate: 89.8,
      avgDuration: '15 minutes',
      lastRun: '1 hour ago',
      nextRun: 'On trigger',
      assignees: ['👨‍💻', '👨‍🔬'],
      tags: ['engineering', 'bugs', 'triage'],
      priority: 'medium',
      created: '2023-11-20',
      updated: '2024-01-08'
    }
  ];

  const projects = [
    {
      id: 1,
      name: 'AI Workflow Engine',
      description: 'Core AI-powered workflow automation engine',
      status: 'in-progress',
      progress: 75,
      startDate: '2023-12-01',
      endDate: '2024-02-15',
      team: ['👩‍💼', '👨‍💻', '👩‍🎨', '👨‍🔬'],
      tasks: {
        total: 24,
        completed: 18,
        inProgress: 4,
        pending: 2
      },
      priority: 'high',
      budget: '$150K',
      category: 'Product Development'
    },
    {
      id: 2,
      name: 'Mobile App Launch',
      description: 'Native mobile application development and launch',
      status: 'review',
      progress: 90,
      startDate: '2023-11-15',
      endDate: '2024-02-20',
      team: ['👨‍🔬', '👩‍💻', '👩‍🎨'],
      tasks: {
        total: 18,
        completed: 16,
        inProgress: 1,
        pending: 1
      },
      priority: 'high',
      budget: '$120K',
      category: 'Product Development'
    },
    {
      id: 3,
      name: 'Customer Portal',
      description: 'Self-service customer portal and dashboard',
      status: 'planning',
      progress: 25,
      startDate: '2024-01-15',
      endDate: '2024-04-30',
      team: ['👩‍💼', '👨‍💼', '👩‍🎨'],
      tasks: {
        total: 32,
        completed: 8,
        inProgress: 6,
        pending: 18
      },
      priority: 'medium',
      budget: '$80K',
      category: 'Customer Success'
    }
  ];

  const tasks = [
    {
      id: 1,
      title: 'Implement AI model training pipeline',
      description: 'Set up automated ML model training and validation pipeline',
      status: 'in-progress',
      priority: 'high',
      assignee: '👨‍💻',
      project: 'AI Workflow Engine',
      dueDate: '2024-02-05',
      estimatedHours: 16,
      actualHours: 12,
      tags: ['ai', 'ml', 'pipeline'],
      dependencies: ['Data preprocessing', 'Model architecture'],
      subtasks: 4,
      completedSubtasks: 2
    },
    {
      id: 2,
      title: 'Design mobile app onboarding flow',
      description: 'Create user-friendly onboarding experience for mobile app',
      status: 'completed',
      priority: 'medium',
      assignee: '👩‍🎨',
      project: 'Mobile App Launch',
      dueDate: '2024-01-25',
      estimatedHours: 8,
      actualHours: 6,
      tags: ['design', 'ux', 'mobile'],
      dependencies: [],
      subtasks: 3,
      completedSubtasks: 3
    },
    {
      id: 3,
      title: 'Set up customer feedback system',
      description: 'Implement automated customer feedback collection and analysis',
      status: 'pending',
      priority: 'medium',
      assignee: '👩‍💼',
      project: 'Customer Portal',
      dueDate: '2024-02-10',
      estimatedHours: 12,
      actualHours: 0,
      tags: ['feedback', 'automation', 'customer'],
      dependencies: ['Portal infrastructure'],
      subtasks: 5,
      completedSubtasks: 0
    }
  ];

  const templates = [
    {
      id: 1,
      name: 'Customer Onboarding Template',
      description: 'Standard template for customer onboarding workflows',
      category: 'Customer Success',
      steps: 8,
      estimatedDuration: '2-3 hours',
      usageCount: 15,
      rating: 4.8,
      tags: ['customer', 'onboarding', 'automation'],
      created: '2023-06-15',
      lastUsed: '2024-01-20'
    },
    {
      id: 2,
      name: 'Product Launch Template',
      description: 'Complete product launch workflow template',
      category: 'Product',
      steps: 12,
      estimatedDuration: '1-2 weeks',
      usageCount: 3,
      rating: 4.9,
      tags: ['product', 'launch', 'marketing'],
      created: '2023-09-01',
      lastUsed: '2024-01-15'
    },
    {
      id: 3,
      name: 'Bug Fix Template',
      description: 'Standard bug fix and deployment workflow',
      category: 'Engineering',
      steps: 6,
      estimatedDuration: '2-4 hours',
      usageCount: 28,
      rating: 4.6,
      tags: ['engineering', 'bugs', 'deployment'],
      created: '2023-07-20',
      lastUsed: '2024-01-22'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
      case 'in-progress':
      case 'completed': return 'text-green-600 bg-green-50 border-green-200';
      case 'paused':
      case 'review': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'planning':
      case 'pending': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'stopped':
      case 'cancelled': return 'text-red-600 bg-red-50 border-red-200';
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

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active':
      case 'in-progress': return Play;
      case 'paused': return Pause;
      case 'completed': return CheckCircle;
      case 'stopped':
      case 'cancelled': return XCircle;
      default: return Circle;
    }
  };

  const filteredWorkflows = workflows.filter(workflow => {
    const matchesSearch = workflow.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         workflow.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         workflow.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || workflow.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const renderWorkflows = () => (
    <div className="space-y-6">
      {/* Filters and Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
            <div className="relative">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search workflows..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full md:w-64"
              />
            </div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="paused">Paused</option>
              <option value="stopped">Stopped</option>
            </select>
            <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-white shadow-sm' : 'text-gray-500'}`}
              >
                <Grid size={16} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors ${viewMode === 'list' ? 'bg-white shadow-sm' : 'text-gray-500'}`}
              >
                <List size={16} />
              </button>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <motion.button
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Upload size={16} />
              <span>Import</span>
            </motion.button>
            <motion.button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center space-x-2 px-4 py-2 startupos-gradient text-white rounded-lg hover:shadow-lg transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Plus size={16} />
              <span>Create Workflow</span>
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Workflows Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWorkflows.map((workflow, index) => {
            const StatusIcon = getStatusIcon(workflow.status);
            return (
              <motion.div
                key={workflow.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover-lift cursor-pointer"
                onClick={() => setSelectedWorkflow(workflow)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getStatusColor(workflow.status)}`}>
                      <StatusIcon size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{workflow.name}</h3>
                      <p className="text-blue-600 text-sm font-medium">{workflow.category}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(workflow.priority)}`}>
                    {workflow.priority}
                  </span>
                </div>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{workflow.description}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Success Rate:</span>
                    <span className="font-medium text-green-600">{workflow.successRate}%</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Completed Runs:</span>
                    <span className="font-medium text-gray-900">{workflow.completedRuns}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Avg Duration:</span>
                    <span className="font-medium text-gray-900">{workflow.avgDuration}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex -space-x-1">
                    {workflow.assignees.map((avatar, avatarIndex) => (
                      <div
                        key={avatarIndex}
                        className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-xs border-2 border-white"
                      >
                        {avatar}
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center space-x-2">
                    <motion.button
                      className="p-1 text-gray-400 hover:text-green-600 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Play size={14} />
                    </motion.button>
                    <motion.button
                      className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Edit3 size={14} />
                    </motion.button>
                    <motion.button
                      className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <MoreHorizontal size={14} />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Workflow</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Status</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Success Rate</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Runs</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Last Run</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredWorkflows.map((workflow, index) => (
                  <motion.tr
                    key={workflow.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getStatusColor(workflow.status)}`}>
                          <Workflow size={20} />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{workflow.name}</h4>
                          <p className="text-sm text-gray-500">{workflow.category}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(workflow.status)}`}>
                        {workflow.status}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-sm font-medium text-green-600">{workflow.successRate}%</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-sm font-medium text-gray-900">{workflow.completedRuns}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-sm text-gray-600">{workflow.lastRun}</span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <motion.button
                          className="p-1 text-gray-400 hover:text-green-600 transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Play size={14} />
                        </motion.button>
                        <motion.button
                          className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Edit3 size={14} />
                        </motion.button>
                        <motion.button
                          className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <MoreHorizontal size={14} />
                        </motion.button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}
    </div>
  );

  const renderProjects = () => (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Projects</h2>
          <p className="text-gray-600 mt-1">Track and manage your startup projects</p>
        </div>
        <motion.button
          className="flex items-center space-x-2 px-4 py-2 startupos-gradient text-white rounded-lg hover:shadow-lg transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Plus size={16} />
          <span>New Project</span>
        </motion.button>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover-lift"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
                <p className="text-blue-600 font-medium">{project.category}</p>
              </div>
              <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(project.status)}`}>
                {project.status.replace('-', ' ')}
              </span>
            </div>
            
            <p className="text-gray-600 text-sm mb-4">{project.description}</p>
            
            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Progress:</span>
                <span className="font-medium text-gray-900">{project.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all"
                  style={{ width: `${project.progress}%` }}
                ></div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Start:</span>
                  <span className="font-medium text-gray-900">{project.startDate}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">End:</span>
                  <span className="font-medium text-gray-900">{project.endDate}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex -space-x-1">
                {project.team.map((avatar, avatarIndex) => (
                  <div
                    key={avatarIndex}
                    className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-sm border-2 border-white"
                  >
                    {avatar}
                  </div>
                ))}
              </div>
              <div className="text-sm text-gray-600">
                {project.tasks.completed}/{project.tasks.total} tasks
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderTasks = () => (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Tasks</h2>
          <p className="text-gray-600 mt-1">Manage individual tasks and assignments</p>
        </div>
        <motion.button
          className="flex items-center space-x-2 px-4 py-2 startupos-gradient text-white rounded-lg hover:shadow-lg transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Plus size={16} />
          <span>New Task</span>
        </motion.button>
      </motion.div>

      <div className="space-y-4">
        {tasks.map((task, index) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover-lift"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="font-semibold text-gray-900">{task.title}</h3>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(task.status)}`}>
                    {task.status.replace('-', ' ')}
                  </span>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(task.priority)}`}>
                    {task.priority}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-3">{task.description}</p>
                <div className="flex items-center space-x-6 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Calendar size={14} />
                    <span>Due: {task.dueDate}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock size={14} />
                    <span>{task.actualHours}h / {task.estimatedHours}h</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <CheckCircle size={14} />
                    <span>{task.completedSubtasks}/{task.subtasks} subtasks</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-lg">
                  {task.assignee}
                </div>
                <motion.button
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <MoreHorizontal size={16} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderTemplates = () => (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Workflow Templates</h2>
          <p className="text-gray-600 mt-1">Pre-built workflow templates for common processes</p>
        </div>
        <motion.button
          className="flex items-center space-x-2 px-4 py-2 startupos-gradient text-white rounded-lg hover:shadow-lg transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Plus size={16} />
          <span>Create Template</span>
        </motion.button>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template, index) => (
          <motion.div
            key={template.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover-lift"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-lg flex items-center justify-center">
                  <Copy size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{template.name}</h3>
                  <p className="text-purple-600 text-sm font-medium">{template.category}</p>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <Star size={14} className="text-yellow-500 fill-current" />
                <span className="text-sm font-medium">{template.rating}</span>
              </div>
            </div>
            
            <p className="text-gray-600 text-sm mb-4">{template.description}</p>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Steps:</span>
                <span className="font-medium text-gray-900">{template.steps}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Duration:</span>
                <span className="font-medium text-gray-900">{template.estimatedDuration}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Used:</span>
                <span className="font-medium text-gray-900">{template.usageCount} times</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <motion.button
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Use Template
              </motion.button>
              <div className="flex items-center space-x-2">
                <motion.button
                  className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Eye size={14} />
                </motion.button>
                <motion.button
                  className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <MoreHorizontal size={14} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderCurrentTab = () => {
    switch (activeTab) {
      case 'workflows': return renderWorkflows();
      case 'projects': return renderProjects();
      case 'tasks': return renderTasks();
      case 'templates': return renderTemplates();
      default: return renderWorkflows();
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
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-10 h-10 startupos-gradient rounded-xl flex items-center justify-center">
              <Workflow className="text-white" size={20} />
            </div>
            <h1 className="text-3xl font-bold startupos-gradient-text">Workflow Management</h1>
          </div>
          <p className="text-gray-600">
            Manage workflows, projects, tasks, and automation templates
          </p>
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-2 mb-8"
        >
          <div className="flex space-x-2 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-blue-50 text-blue-600 border border-blue-200'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon size={18} />
                  <span>{tab.label}</span>
                  {tab.count && (
                    <span className={`px-2 py-0.5 text-xs rounded-full ${
                      activeTab === tab.id
                        ? 'bg-blue-100 text-blue-600'
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {tab.count}
                    </span>
                  )}
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            {renderCurrentTab()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default WorkflowDetails;

