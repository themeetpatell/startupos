import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, CheckCircle, AlertCircle, Clock, Users, Building, 
  DollarSign, Shield, Search, Filter, Download, Eye, Edit, 
  Trash2, Plus, ArrowRight, BarChart3, Target, TrendingUp, 
  Calendar, Star, Award, Zap, Globe, Lock, Unlock, X,
  ChevronDown, Upload, Share, Bookmark, Heart, MessageSquare,
  Phone, Mail, ExternalLink, MoreVertical, Copy, Archive, Flag
} from 'lucide-react';

const EnhancedDueDiligence = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDeal, setSelectedDeal] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState('grid');

  const deals = [
    {
      id: 1,
      name: 'TechFlow Solutions',
      status: 'In Progress',
      progress: 75,
      priority: 'High',
      dueDate: '2024-02-15',
      value: '$45M',
      category: 'Technology',
      team: [
        { name: 'Sarah Chen', role: 'Lead', avatar: 'https://ui-avatars.com/api/?name=Sarah+Chen&background=6366f1&color=fff' },
        { name: 'Mike Rodriguez', role: 'Legal', avatar: 'https://ui-avatars.com/api/?name=Mike+Rodriguez&background=10b981&color=fff' },
        { name: 'Lisa Wang', role: 'Finance', avatar: 'https://ui-avatars.com/api/?name=Lisa+Wang&background=8b5cf6&color=fff' }
      ],
      documents: 45,
      completed: 34,
      pending: 11,
      lastUpdate: '2 hours ago',
      color: 'blue',
      company: {
        name: 'TechFlow Solutions',
        logo: 'https://ui-avatars.com/api/?name=TechFlow&background=6366f1&color=fff',
        sector: 'AI/ML',
        location: 'San Francisco, CA',
        employees: 28,
        revenue: '$12.5M'
      },
      checklist: [
        { category: 'Financial', items: 12, completed: 10, status: 'in-progress' },
        { category: 'Legal', items: 8, completed: 6, status: 'in-progress' },
        { category: 'Technical', items: 15, completed: 12, status: 'in-progress' },
        { category: 'HR', items: 6, completed: 4, status: 'pending' },
        { category: 'Compliance', items: 4, completed: 2, status: 'pending' }
      ],
      risks: [
        { type: 'High', description: '2 IP filings expired', category: 'Legal' },
        { type: 'Medium', description: 'Employee contracts missing clauses', category: 'HR' },
        { type: 'Low', description: 'Financial statements need updating', category: 'Financial' }
      ],
      nextActions: [
        { title: 'Schedule management meeting', dueDate: '2024-01-20', assignee: 'Sarah Chen', priority: 'high' },
        { title: 'Review financial statements', dueDate: '2024-01-22', assignee: 'Lisa Wang', priority: 'medium' },
        { title: 'Complete IP audit', dueDate: '2024-01-25', assignee: 'Mike Rodriguez', priority: 'high' }
      ],
      notes: 'Strong strategic fit with our AI portfolio. Management team is experienced and committed to the acquisition. Some concerns about IP protection and employee retention.',
      tags: ['AI', 'Strategic', 'High Value', 'Tech'],
      createdAt: '2023-11-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 2,
      name: 'DataViz Analytics',
      status: 'Completed',
      progress: 100,
      priority: 'Medium',
      dueDate: '2024-01-30',
      value: '$32M',
      category: 'Analytics',
      team: [
        { name: 'David Kim', role: 'Lead', avatar: 'https://ui-avatars.com/api/?name=David+Kim&background=06b6d4&color=fff' },
        { name: 'Emma Thompson', role: 'Legal', avatar: 'https://ui-avatars.com/api/?name=Emma+Thompson&background=ef4444&color=fff' }
      ],
      documents: 32,
      completed: 32,
      pending: 0,
      lastUpdate: '1 day ago',
      color: 'green',
      company: {
        name: 'DataViz Analytics',
        logo: 'https://ui-avatars.com/api/?name=DataViz&background=10b981&color=fff',
        sector: 'Data & Analytics',
        location: 'New York, NY',
        employees: 45,
        revenue: '$8.2M'
      },
      checklist: [
        { category: 'Financial', items: 10, completed: 10, status: 'completed' },
        { category: 'Legal', items: 6, completed: 6, status: 'completed' },
        { category: 'Technical', items: 12, completed: 12, status: 'completed' },
        { category: 'HR', items: 4, completed: 4, status: 'completed' }
      ],
      risks: [],
      nextActions: [
        { title: 'Finalize integration plan', dueDate: '2024-02-05', assignee: 'David Kim', priority: 'medium' }
      ],
      notes: 'Due diligence completed successfully. All major risks identified and mitigated. Ready for final negotiations.',
      tags: ['Data', 'Analytics', 'Completed', 'Medium Value'],
      createdAt: '2023-10-20',
      updatedAt: '2024-01-30'
    },
    {
      id: 3,
      name: 'CloudTech Systems',
      status: 'Pending',
      progress: 25,
      priority: 'Low',
      dueDate: '2024-03-01',
      value: '$18M',
      category: 'Cloud Services',
      team: [
        { name: 'Alex Johnson', role: 'Lead', avatar: 'https://ui-avatars.com/api/?name=Alex+Johnson&background=f59e0b&color=fff' },
        { name: 'Maria Garcia', role: 'Finance', avatar: 'https://ui-avatars.com/api/?name=Maria+Garcia&background=ec4899&color=fff' }
      ],
      documents: 28,
      completed: 7,
      pending: 21,
      lastUpdate: '3 days ago',
      color: 'orange',
      company: {
        name: 'CloudTech Systems',
        logo: 'https://ui-avatars.com/api/?name=CloudTech&background=8b5cf6&color=fff',
        sector: 'Cloud Services',
        location: 'Austin, TX',
        employees: 22,
        revenue: '$3.8M'
      },
      checklist: [
        { category: 'Financial', items: 8, completed: 2, status: 'pending' },
        { category: 'Legal', items: 6, completed: 1, status: 'pending' },
        { category: 'Technical', items: 10, completed: 3, status: 'pending' },
        { category: 'HR', items: 4, completed: 1, status: 'pending' }
      ],
      risks: [
        { type: 'High', description: 'Security audit required', category: 'Technical' },
        { type: 'Medium', description: 'Financial records incomplete', category: 'Financial' }
      ],
      nextActions: [
        { title: 'Initiate security audit', dueDate: '2024-01-25', assignee: 'Alex Johnson', priority: 'high' },
        { title: 'Request financial documents', dueDate: '2024-01-28', assignee: 'Maria Garcia', priority: 'medium' }
      ],
      notes: 'Early stage due diligence. Company shows promise but requires significant documentation and security improvements.',
      tags: ['Cloud', 'Early Stage', 'Low Value', 'Pending'],
      createdAt: '2023-12-01',
      updatedAt: '2024-01-12'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Deals', count: deals.length, color: 'gray' },
    { id: 'in-progress', name: 'In Progress', count: deals.filter(d => d.status === 'In Progress').length, color: 'blue' },
    { id: 'completed', name: 'Completed', count: deals.filter(d => d.status === 'Completed').length, color: 'green' },
    { id: 'pending', name: 'Pending', count: deals.filter(d => d.status === 'Pending').length, color: 'orange' }
  ];

  const filteredDeals = useMemo(() => {
    let filtered = deals;

    // Search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(deal =>
        deal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        deal.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        deal.company.sector.toLowerCase().includes(searchQuery.toLowerCase()) ||
        deal.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Status filter
    if (activeFilter !== 'all') {
      filtered = filtered.filter(deal => deal.status.toLowerCase().replace(' ', '-') === activeFilter);
    }

    return filtered;
  }, [searchQuery, activeFilter]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'In Progress': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'Completed': return 'text-green-600 bg-green-50 border-green-200';
      case 'Pending': return 'text-orange-600 bg-orange-50 border-orange-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'text-red-600 bg-red-50 border-red-200';
      case 'Medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'Low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getRiskColor = (type) => {
    switch (type) {
      case 'High': return 'text-red-600 bg-red-50';
      case 'Medium': return 'text-yellow-600 bg-yellow-50';
      case 'Low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const renderDealCard = (deal) => (
    <motion.div
      key={deal.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, shadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}
      className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 cursor-pointer group"
      onClick={() => setSelectedDeal(deal)}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <img
            src={deal.company.logo}
            alt={deal.company.name}
            className="w-12 h-12 rounded-lg object-cover"
          />
          <div>
            <h3 className="text-lg font-bold text-gray-900">{deal.name}</h3>
            <p className="text-sm text-gray-600">{deal.company.sector} • {deal.value}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(deal.status)}`}>
            {deal.status}
          </span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(deal.priority)}`}>
            {deal.priority}
          </span>
        </div>
      </div>

      {/* Progress */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Progress</span>
          <span className="text-sm text-gray-600">{deal.progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-300 ${
              deal.color === 'blue' ? 'bg-blue-500' :
              deal.color === 'green' ? 'bg-green-500' :
              deal.color === 'orange' ? 'bg-orange-500' : 'bg-gray-500'
            }`}
            style={{ width: `${deal.progress}%` }}
          ></div>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <div className="text-2xl font-bold text-gray-900">{deal.completed}/{deal.documents}</div>
          <div className="text-sm text-gray-600">Documents</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-blue-600">{deal.team.length}</div>
          <div className="text-sm text-gray-600">Team Members</div>
        </div>
      </div>

      {/* Checklist Preview */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Checklist</span>
          <span className="text-sm text-gray-600">
            {deal.checklist.reduce((acc, cat) => acc + cat.completed, 0)}/{deal.checklist.reduce((acc, cat) => acc + cat.items, 0)}
          </span>
        </div>
        <div className="space-y-1">
          {deal.checklist.slice(0, 3).map((category, index) => (
            <div key={index} className="flex items-center justify-between text-xs">
              <span className="text-gray-600">{category.category}</span>
              <div className="flex items-center space-x-2">
                <div className="w-16 bg-gray-200 rounded-full h-1">
                  <div
                    className={`h-1 rounded-full ${
                      category.status === 'completed' ? 'bg-green-500' :
                      category.status === 'in-progress' ? 'bg-yellow-500' : 'bg-gray-400'
                    }`}
                    style={{ width: `${(category.completed / category.items) * 100}%` }}
                  ></div>
                </div>
                <span className="text-gray-500">{category.completed}/{category.items}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Team */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Users size={16} className="text-gray-400" />
          <span className="text-sm text-gray-600">Team</span>
        </div>
        <div className="flex -space-x-2">
          {deal.team.slice(0, 3).map((member, index) => (
            <img
              key={index}
              src={member.avatar}
              alt={member.name}
              className="w-6 h-6 rounded-full border-2 border-white"
            />
          ))}
          {deal.team.length > 3 && (
            <div className="w-6 h-6 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-xs text-gray-600">
              +{deal.team.length - 3}
            </div>
          )}
        </div>
      </div>

      {/* Risks */}
      {deal.risks.length > 0 && (
        <div className="mb-4">
          <div className="flex items-center space-x-2 mb-2">
            <AlertCircle size={16} className="text-red-500" />
            <span className="text-sm font-medium text-gray-700">Risks ({deal.risks.length})</span>
          </div>
          <div className="space-y-1">
            {deal.risks.slice(0, 2).map((risk, index) => (
              <div key={index} className="flex items-center space-x-2">
                <span className={`w-2 h-2 rounded-full ${
                  risk.type === 'High' ? 'bg-red-500' :
                  risk.type === 'Medium' ? 'bg-yellow-500' : 'bg-green-500'
                }`}></span>
                <span className="text-xs text-gray-600 truncate">{risk.description}</span>
              </div>
            ))}
            {deal.risks.length > 2 && (
              <span className="text-xs text-gray-500">+{deal.risks.length - 2} more</span>
            )}
          </div>
        </div>
      )}

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {deal.tags.slice(0, 3).map((tag, index) => (
          <span
            key={index}
            className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
          >
            {tag}
          </span>
        ))}
        {deal.tags.length > 3 && (
          <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
            +{deal.tags.length - 3}
          </span>
        )}
      </div>
    </motion.div>
  );

  const renderDetailedDeal = (deal) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={() => setSelectedDeal(null)}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-start space-x-6">
              <img
                src={deal.company.logo}
                alt={deal.company.name}
                className="w-24 h-24 rounded-2xl object-cover"
              />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{deal.name}</h1>
                <p className="text-xl text-gray-600 mt-1">{deal.company.sector}</p>
                <div className="flex items-center space-x-4 mt-4">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Building size={16} />
                    <span>{deal.company.location}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Users size={16} />
                    <span>{deal.company.employees} employees</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <DollarSign size={16} />
                    <span>{deal.company.revenue} revenue</span>
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={() => setSelectedDeal(null)}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
            >
              <X size={24} />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* Progress Overview */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Progress Overview</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm text-gray-600">Overall Progress</div>
                    <div className="text-2xl font-bold text-gray-900">{deal.progress}%</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm text-gray-600">Documents</div>
                    <div className="text-2xl font-bold text-gray-900">{deal.completed}/{deal.documents}</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm text-gray-600">Due Date</div>
                    <div className="text-lg font-bold text-gray-900">{deal.dueDate}</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm text-gray-600">Team Size</div>
                    <div className="text-2xl font-bold text-gray-900">{deal.team.length}</div>
                  </div>
                </div>
              </div>

              {/* Checklist */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Due Diligence Checklist</h2>
                <div className="space-y-4">
                  {deal.checklist.map((category, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-gray-900">{category.category}</h3>
                        <span className="text-sm text-gray-600">{category.completed}/{category.items}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                        <div
                          className={`h-2 rounded-full ${
                            category.status === 'completed' ? 'bg-green-500' :
                            category.status === 'in-progress' ? 'bg-yellow-500' : 'bg-gray-400'
                          }`}
                          style={{ width: `${(category.completed / category.items) * 100}%` }}
                        ></div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          category.status === 'completed' ? 'bg-green-100 text-green-800' :
                          category.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {category.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Risks */}
              {deal.risks.length > 0 && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Identified Risks</h2>
                  <div className="space-y-3">
                    {deal.risks.map((risk, index) => (
                      <div key={index} className="flex items-start space-x-3 p-3 bg-red-50 rounded-lg">
                        <AlertCircle size={16} className="text-red-500 mt-0.5" />
                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(risk.type)}`}>
                              {risk.type}
                            </span>
                            <span className="text-sm text-gray-600">{risk.category}</span>
                          </div>
                          <p className="text-sm text-gray-700">{risk.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Next Actions */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Next Actions</h2>
                <div className="space-y-3">
                  {deal.nextActions.map((action, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div>
                        <h3 className="font-medium text-gray-900">{action.title}</h3>
                        <p className="text-sm text-gray-600">Assigned to: {action.assignee}</p>
                      </div>
                      <div className="text-right">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(action.priority)}`}>
                          {action.priority}
                        </span>
                        <p className="text-sm text-gray-600 mt-1">Due: {action.dueDate}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Notes</h2>
                <p className="text-gray-600 leading-relaxed">{deal.notes}</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-4">Team</h3>
                <div className="space-y-3">
                  {deal.team.map((member, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-8 h-8 rounded-full"
                      />
                      <div>
                        <div className="font-medium text-gray-900">{member.name}</div>
                        <div className="text-sm text-gray-600">{member.role}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <MessageSquare size={16} />
                    <span>Send Message</span>
                  </button>
                  <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                    <Calendar size={16} />
                    <span>Schedule Meeting</span>
                  </button>
                  <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                    <FileText size={16} />
                    <span>Add Document</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Due Diligence Management</h2>
          <p className="text-gray-600">Comprehensive due diligence processes and tools</p>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
          <Plus size={20} />
          <span>New Due Diligence</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Deals</p>
              <p className="text-2xl font-bold text-indigo-600">15</p>
            </div>
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-indigo-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-green-600">8</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-orange-600">7</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg. Completion</p>
              <p className="text-2xl font-bold text-blue-600">78%</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search deals by name, sector, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
              />
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <Filter size={20} />
              <span>Filters</span>
              <ChevronDown size={16} className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-indigo-100 text-indigo-600' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <Target size={20} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-indigo-100 text-indigo-600' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <BarChart3 size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Filters Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 pt-4 border-t border-gray-200"
            >
              <div className="flex space-x-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveFilter(category.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeFilter === category.id
                        ? 'bg-indigo-100 text-indigo-700 border border-indigo-200'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {category.name} ({category.count})
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Results */}
      <div className="mb-4">
        <p className="text-gray-600">
          Showing {filteredDeals.length} deals out of {deals.length}
        </p>
      </div>

      {/* Deals Grid */}
      <div className={`grid gap-6 ${
        viewMode === 'grid' 
          ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
          : 'grid-cols-1'
      }`}>
        {filteredDeals.map(renderDealCard)}
      </div>

      {/* Empty State */}
      {filteredDeals.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search size={32} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No deals found</h3>
          <p className="text-gray-600">Try adjusting your search or filters</p>
        </div>
      )}

      {/* Detailed Deal Modal */}
      <AnimatePresence>
        {selectedDeal && renderDetailedDeal(selectedDeal)}
      </AnimatePresence>
    </div>
  );
};

export default EnhancedDueDiligence;
