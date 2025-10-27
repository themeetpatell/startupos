import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  CheckCircle, 
  AlertCircle, 
  Clock, 
  Users, 
  Building, 
  DollarSign,
  Shield,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  Plus,
  ArrowRight,
  BarChart3,
  Target,
  TrendingUp,
  Calendar,
  Star,
  Award,
  Zap,
  Globe,
  Lock,
  Unlock
} from 'lucide-react';

const DueDiligence = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDeal, setSelectedDeal] = useState(null);

  const deals = [
    {
      id: 1,
      name: 'TechFlow Solutions',
      status: 'In Progress',
      progress: 75,
      priority: 'High',
      dueDate: '2024-02-15',
      value: '$2.5M',
      category: 'Technology',
      team: ['Sarah Chen', 'Mike Rodriguez', 'Lisa Wang'],
      documents: 45,
      completed: 34,
      pending: 11,
      lastUpdate: '2 hours ago',
      color: 'blue'
    },
    {
      id: 2,
      name: 'DataViz Analytics',
      status: 'Completed',
      progress: 100,
      priority: 'Medium',
      dueDate: '2024-01-30',
      value: '$1.8M',
      category: 'Analytics',
      team: ['David Kim', 'Emma Thompson'],
      documents: 32,
      completed: 32,
      pending: 0,
      lastUpdate: '1 day ago',
      color: 'green'
    },
    {
      id: 3,
      name: 'CloudTech Systems',
      status: 'Pending',
      progress: 25,
      priority: 'Low',
      dueDate: '2024-03-01',
      value: '$3.2M',
      category: 'Cloud Services',
      team: ['Alex Johnson', 'Maria Garcia'],
      documents: 28,
      completed: 7,
      pending: 21,
      lastUpdate: '3 days ago',
      color: 'orange'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Deals', count: deals.length, color: 'gray' },
    { id: 'in-progress', name: 'In Progress', count: deals.filter(d => d.status === 'In Progress').length, color: 'blue' },
    { id: 'completed', name: 'Completed', count: deals.filter(d => d.status === 'Completed').length, color: 'green' },
    { id: 'pending', name: 'Pending', count: deals.filter(d => d.status === 'Pending').length, color: 'orange' }
  ];

  const filteredDeals = deals.filter(deal => {
    const matchesFilter = activeFilter === 'all' || deal.status.toLowerCase().replace(' ', '-') === activeFilter;
    const matchesSearch = deal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         deal.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Due Diligence Management</h2>
          <p className="text-gray-600">Comprehensive due diligence processes and tools</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-indigo-700 transition-colors"
        >
          <Plus size={20} />
          <span>New Due Diligence</span>
        </motion.button>
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

      {/* Filters */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search deals..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
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
        </div>
      </div>

      {/* Deals List */}
      <div className="space-y-4">
        {filteredDeals.map((deal) => (
          <motion.div
            key={deal.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  deal.color === 'blue' ? 'bg-blue-100' :
                  deal.color === 'green' ? 'bg-green-100' :
                  deal.color === 'orange' ? 'bg-orange-100' : 'bg-gray-100'
                }`}>
                  <Building className={`w-6 h-6 ${
                    deal.color === 'blue' ? 'text-blue-600' :
                    deal.color === 'green' ? 'text-green-600' :
                    deal.color === 'orange' ? 'text-orange-600' : 'text-gray-600'
                  }`} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{deal.name}</h3>
                  <p className="text-gray-600">{deal.category} • {deal.value}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(deal.status)}`}>
                  {deal.status}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getPriorityColor(deal.priority)}`}>
                  {deal.priority}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-600">Progress</p>
                <div className="flex items-center space-x-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${deal.progress}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{deal.progress}%</span>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600">Documents</p>
                <p className="text-lg font-semibold text-gray-900">{deal.completed}/{deal.documents}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Due Date</p>
                <p className="text-lg font-semibold text-gray-900">{deal.dueDate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Team</p>
                <p className="text-lg font-semibold text-gray-900">{deal.team.length} members</p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex -space-x-2">
                  {deal.team.slice(0, 3).map((member, index) => (
                    <div
                      key={index}
                      className="w-8 h-8 bg-gray-300 rounded-full border-2 border-white flex items-center justify-center text-xs font-medium text-gray-700"
                    >
                      {member.split(' ').map(n => n[0]).join('')}
                    </div>
                  ))}
                  {deal.team.length > 3 && (
                    <div className="w-8 h-8 bg-gray-200 rounded-full border-2 border-white flex items-center justify-center text-xs font-medium text-gray-600">
                      +{deal.team.length - 3}
                    </div>
                  )}
                </div>
                <span className="text-sm text-gray-500">Last updated {deal.lastUpdate}</span>
              </div>
              <div className="flex items-center space-x-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                >
                  <Eye size={18} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                >
                  <Edit size={18} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Download size={18} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default DueDiligence;
