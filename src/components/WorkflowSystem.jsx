import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Workflow, 
  Plus, 
  Play, 
  Pause, 
  Square, 
  Edit3, 
  Trash2, 
  Copy, 
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  Users,
  Target,
  BarChart3,
  Settings,
  Filter,
  Search,
  ArrowRight,
  Zap,
  GitBranch,
  Timer,
  Flag
} from 'lucide-react';
import '../App.css';

const WorkflowSystem = () => {
  const [workflows, setWorkflows] = useState([
    {
      id: 1,
      name: 'Customer Onboarding',
      description: 'Automated process for new customer setup and welcome sequence',
      status: 'active',
      trigger: 'New customer signup',
      steps: 8,
      completedRuns: 45,
      successRate: 94,
      avgDuration: '2.5 hours',
      lastRun: '2 hours ago',
      category: 'Customer Success',
      priority: 'high'
    },
    {
      id: 2,
      name: 'Lead Qualification',
      description: 'Automated lead scoring and qualification workflow',
      status: 'active',
      trigger: 'New lead captured',
      steps: 6,
      completedRuns: 128,
      successRate: 87,
      avgDuration: '45 minutes',
      lastRun: '15 minutes ago',
      category: 'Sales',
      priority: 'high'
    },
    {
      id: 3,
      name: 'Employee Onboarding',
      description: 'Complete new hire setup and training workflow',
      status: 'draft',
      trigger: 'New hire confirmed',
      steps: 12,
      completedRuns: 8,
      successRate: 100,
      avgDuration: '3 days',
      lastRun: '1 week ago',
      category: 'HR',
      priority: 'medium'
    },
    {
      id: 4,
      name: 'Product Launch',
      description: 'Coordinated product launch across all channels',
      status: 'paused',
      trigger: 'Manual trigger',
      steps: 15,
      completedRuns: 2,
      successRate: 100,
      avgDuration: '2 weeks',
      lastRun: '1 month ago',
      category: 'Product',
      priority: 'low'
    }
  ]);

  const [selectedWorkflow, setSelectedWorkflow] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [filterCategory, setFilterCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['all', 'Customer Success', 'Sales', 'HR', 'Product', 'Marketing', 'Operations'];

  const workflowTemplates = [
    {
      id: 'customer-onboarding',
      name: 'Customer Onboarding',
      description: 'Welcome new customers with automated email sequences and setup tasks',
      category: 'Customer Success',
      steps: ['Send welcome email', 'Create account', 'Schedule demo', 'Follow up']
    },
    {
      id: 'lead-nurturing',
      name: 'Lead Nurturing',
      description: 'Automated lead qualification and nurturing sequence',
      category: 'Sales',
      steps: ['Score lead', 'Send content', 'Schedule call', 'Update CRM']
    },
    {
      id: 'content-approval',
      name: 'Content Approval',
      description: 'Streamlined content review and approval process',
      category: 'Marketing',
      steps: ['Submit content', 'Review', 'Approve/Reject', 'Publish']
    },
    {
      id: 'bug-triage',
      name: 'Bug Triage',
      description: 'Automated bug reporting and assignment workflow',
      category: 'Product',
      steps: ['Report bug', 'Categorize', 'Assign developer', 'Track progress']
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-50 border-green-200';
      case 'paused': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'draft': return 'text-gray-600 bg-gray-50 border-gray-200';
      case 'error': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-blue-600';
      default: return 'text-gray-600';
    }
  };

  const filteredWorkflows = workflows.filter(workflow => {
    const matchesCategory = filterCategory === 'all' || workflow.category === filterCategory;
    const matchesSearch = workflow.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         workflow.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleWorkflowAction = (workflowId, action) => {
    setWorkflows(prev => prev.map(workflow => {
      if (workflow.id === workflowId) {
        switch (action) {
          case 'play':
            return { ...workflow, status: 'active' };
          case 'pause':
            return { ...workflow, status: 'paused' };
          case 'stop':
            return { ...workflow, status: 'draft' };
          default:
            return workflow;
        }
      }
      return workflow;
    }));
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
                  <Workflow className="text-white" size={20} />
                </div>
                <h1 className="text-3xl font-bold startupos-gradient-text">Workflow Automation</h1>
              </div>
              <p className="text-gray-600">
                Automate your startup operations with intelligent workflows and process automation
              </p>
            </div>
            <motion.button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center space-x-2 px-6 py-3 startupos-gradient text-white rounded-xl hover:shadow-lg transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Plus size={20} />
              <span>Create Workflow</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { title: 'Active Workflows', value: '12', change: '+3', icon: Workflow, color: 'blue' },
            { title: 'Total Runs', value: '1,247', change: '+156', icon: Play, color: 'green' },
            { title: 'Success Rate', value: '94.2%', change: '+2.1%', icon: CheckCircle, color: 'purple' },
            { title: 'Time Saved', value: '48h', change: '+12h', icon: Timer, color: 'orange' }
          ].map((stat, index) => {
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

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search workflows..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Filter size={20} className="text-gray-400" />
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">
                {filteredWorkflows.length} workflow{filteredWorkflows.length !== 1 ? 's' : ''}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Workflows Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <AnimatePresence>
            {filteredWorkflows.map((workflow, index) => (
              <motion.div
                key={workflow.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover-lift cursor-pointer"
                onClick={() => setSelectedWorkflow(workflow)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{workflow.name}</h3>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(workflow.status)}`}>
                        {workflow.status}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">{workflow.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span className="flex items-center space-x-1">
                        <GitBranch size={14} />
                        <span>{workflow.steps} steps</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Play size={14} />
                        <span>{workflow.completedRuns} runs</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Target size={14} />
                        <span>{workflow.successRate}% success</span>
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1 ml-4">
                    <Flag size={16} className={getPriorityColor(workflow.priority)} />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span className="flex items-center space-x-1">
                      <Clock size={14} />
                      <span>Avg: {workflow.avgDuration}</span>
                    </span>
                    <span>Last run: {workflow.lastRun}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <motion.button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleWorkflowAction(workflow.id, workflow.status === 'active' ? 'pause' : 'play');
                      }}
                      className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {workflow.status === 'active' ? <Pause size={16} /> : <Play size={16} />}
                    </motion.button>
                    <motion.button
                      onClick={(e) => {
                        e.stopPropagation();
                        // Edit workflow
                      }}
                      className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Edit3 size={16} />
                    </motion.button>
                    <motion.button
                      onClick={(e) => {
                        e.stopPropagation();
                        // Delete workflow
                      }}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Trash2 size={16} />
                    </motion.button>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Category: {workflow.category}</span>
                    <span className="text-gray-600">Trigger: {workflow.trigger}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Workflow Templates */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Workflow Templates</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {workflowTemplates.map((template, index) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all cursor-pointer group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-gray-900 group-hover:text-blue-600">{template.name}</h4>
                  <ArrowRight size={16} className="text-gray-400 group-hover:text-blue-600" />
                </div>
                <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">{template.category}</span>
                  <span className="text-xs text-gray-500">{template.steps.length} steps</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Create Workflow Modal */}
        <AnimatePresence>
          {showCreateModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
              onClick={() => setShowCreateModal(false)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Create New Workflow</h3>
                  <p className="text-gray-600 mt-1">Choose a template or start from scratch</p>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {workflowTemplates.map((template) => (
                      <div
                        key={template.id}
                        className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all cursor-pointer"
                      >
                        <h4 className="font-medium text-gray-900 mb-2">{template.name}</h4>
                        <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">{template.category}</span>
                          <button className="text-sm text-blue-600 hover:underline">Use Template</button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <button className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-300 hover:text-blue-600 transition-colors">
                      <Plus size={24} className="mx-auto mb-2" />
                      <span className="block font-medium">Start from Scratch</span>
                      <span className="block text-sm">Build a custom workflow</span>
                    </button>
                  </div>
                </div>
                <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
                  <button
                    onClick={() => setShowCreateModal(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default WorkflowSystem;

