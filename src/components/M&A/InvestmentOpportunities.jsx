import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  DollarSign, 
  TrendingUp, 
  Target, 
  Star, 
  Eye, 
  Heart, 
  Share2, 
  Download,
  Filter,
  Search,
  Plus,
  ArrowRight,
  BarChart3,
  Building,
  Globe,
  Calendar,
  Users,
  Zap,
  Award,
  Shield,
  CheckCircle,
  AlertCircle,
  Clock,
  MapPin,
  Briefcase,
  PieChart,
  Activity,
  X,
  Phone,
  Mail,
  ExternalLink,
  FileText,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

const InvestmentOpportunities = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);
  const [viewMode, setViewMode] = useState('grid');

  const opportunities = [
    {
      id: 1,
      name: 'TechFlow Solutions',
      description: 'AI-powered workflow automation platform with 300% growth in the last year',
      category: 'Technology',
      stage: 'Series A',
      valuation: '$15M',
      askingAmount: '$3M',
      equity: '20%',
      location: 'San Francisco, CA',
      founded: '2020',
      employees: 45,
      revenue: '$2.1M',
      growth: '+300%',
      rating: 4.8,
      investors: ['Sequoia Capital', 'Andreessen Horowitz'],
      tags: ['AI', 'SaaS', 'B2B'],
      status: 'Active',
      deadline: '2024-03-15',
      color: 'blue',
      risk: 'Medium',
      return: 'High'
    },
    {
      id: 2,
      name: 'DataViz Analytics',
      description: 'Advanced data visualization tools for enterprise clients',
      category: 'Analytics',
      stage: 'Seed',
      valuation: '$8M',
      askingAmount: '$1.5M',
      equity: '18%',
      location: 'New York, NY',
      founded: '2021',
      employees: 28,
      revenue: '$1.2M',
      growth: '+150%',
      rating: 4.6,
      investors: ['Y Combinator', 'First Round Capital'],
      tags: ['Data', 'Visualization', 'Enterprise'],
      status: 'Hot',
      deadline: '2024-02-28',
      color: 'red',
      risk: 'Low',
      return: 'Medium'
    },
    {
      id: 3,
      name: 'CloudTech Systems',
      description: 'Cloud infrastructure solutions for mid-market companies',
      category: 'Cloud Services',
      stage: 'Series B',
      valuation: '$45M',
      askingAmount: '$8M',
      equity: '18%',
      location: 'Austin, TX',
      founded: '2019',
      employees: 120,
      revenue: '$8.5M',
      growth: '+85%',
      rating: 4.9,
      investors: ['Bessemer Venture Partners', 'GV'],
      tags: ['Cloud', 'Infrastructure', 'B2B'],
      status: 'Active',
      deadline: '2024-04-01',
      color: 'green',
      risk: 'Low',
      return: 'High'
    },
    {
      id: 4,
      name: 'HealthTech Innovations',
      description: 'Telemedicine platform with AI-powered diagnostics',
      category: 'Healthcare',
      stage: 'Series A',
      valuation: '$25M',
      askingAmount: '$5M',
      equity: '20%',
      location: 'Boston, MA',
      founded: '2020',
      employees: 65,
      revenue: '$3.2M',
      growth: '+200%',
      rating: 4.7,
      investors: ['General Catalyst', 'Kleiner Perkins'],
      tags: ['Healthcare', 'AI', 'Telemedicine'],
      status: 'Active',
      deadline: '2024-03-30',
      color: 'purple',
      risk: 'Medium',
      return: 'High'
    },
    {
      id: 5,
      name: 'FinTech Solutions',
      description: 'Blockchain-based payment processing for small businesses',
      category: 'FinTech',
      stage: 'Seed',
      valuation: '$12M',
      askingAmount: '$2M',
      equity: '17%',
      location: 'Miami, FL',
      founded: '2021',
      employees: 35,
      revenue: '$1.8M',
      growth: '+180%',
      rating: 4.5,
      investors: ['Coinbase Ventures', 'a16z crypto'],
      tags: ['Blockchain', 'Payments', 'SMB'],
      status: 'Hot',
      deadline: '2024-02-20',
      color: 'yellow',
      risk: 'High',
      return: 'Very High'
    },
    {
      id: 6,
      name: 'EcoTech Ventures',
      description: 'Sustainable energy solutions for commercial buildings',
      category: 'CleanTech',
      stage: 'Series A',
      valuation: '$30M',
      askingAmount: '$6M',
      equity: '20%',
      location: 'Seattle, WA',
      founded: '2019',
      employees: 80,
      revenue: '$4.1M',
      growth: '+120%',
      rating: 4.8,
      investors: ['Breakthrough Energy', 'Kleiner Perkins'],
      tags: ['CleanTech', 'Energy', 'Sustainability'],
      status: 'Active',
      deadline: '2024-04-15',
      color: 'emerald',
      risk: 'Medium',
      return: 'High'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Opportunities', count: opportunities.length, color: 'gray' },
    { id: 'technology', name: 'Technology', count: opportunities.filter(o => o.category === 'Technology').length, color: 'blue' },
    { id: 'analytics', name: 'Analytics', count: opportunities.filter(o => o.category === 'Analytics').length, color: 'purple' },
    { id: 'cloud services', name: 'Cloud Services', count: opportunities.filter(o => o.category === 'Cloud Services').length, color: 'green' },
    { id: 'healthcare', name: 'Healthcare', count: opportunities.filter(o => o.category === 'Healthcare').length, color: 'red' },
    { id: 'fintech', name: 'FinTech', count: opportunities.filter(o => o.category === 'FinTech').length, color: 'yellow' },
    { id: 'cleantech', name: 'CleanTech', count: opportunities.filter(o => o.category === 'CleanTech').length, color: 'emerald' }
  ];

  const filteredOpportunities = opportunities.filter(opportunity => {
    const matchesFilter = activeFilter === 'all' || opportunity.category.toLowerCase().replace(' ', '') === activeFilter;
    const matchesSearch = opportunity.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         opportunity.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         opportunity.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Hot': return 'text-red-600 bg-red-50 border-red-200';
      case 'Active': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'Closed': return 'text-gray-600 bg-gray-50 border-gray-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'Low': return 'text-green-600 bg-green-50 border-green-200';
      case 'Medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'High': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getReturnColor = (returnType) => {
    switch (returnType) {
      case 'Very High': return 'text-purple-600 bg-purple-50 border-purple-200';
      case 'High': return 'text-green-600 bg-green-50 border-green-200';
      case 'Medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'Low': return 'text-gray-600 bg-gray-50 border-gray-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Investment Opportunities</h2>
          <p className="text-gray-600">Discover and evaluate investment opportunities</p>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-emerald-100 text-emerald-600' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <BarChart3 size={20} />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-emerald-100 text-emerald-600' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <Activity size={20} />
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Opportunities</p>
              <p className="text-2xl font-bold text-emerald-600">128</p>
            </div>
            <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
              <Target className="w-6 h-6 text-emerald-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Evaluated</p>
              <p className="text-2xl font-bold text-blue-600">45</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Eye className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Invested</p>
              <p className="text-2xl font-bold text-green-600">12</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg. Return</p>
              <p className="text-2xl font-bold text-purple-600">24%</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search opportunities by name, description, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
              />
            </div>
          </div>
        </div>
        
        {/* Category Filters */}
        <div className="mt-4">
          <div className="relative">
            <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 pb-2">
              <div className="flex space-x-3 min-w-max">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveFilter(category.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap flex items-center space-x-2 ${
                      activeFilter === category.id
                        ? 'bg-emerald-600 text-white shadow-lg transform scale-105'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'
                    }`}
                  >
                    <span>{category.name}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      activeFilter === category.id
                        ? 'bg-white/20 text-white'
                        : 'bg-white text-gray-600'
                    }`}>
                      {category.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>
            
            {/* Scroll Indicators */}
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent pointer-events-none z-10"></div>
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none z-10"></div>
          </div>
        </div>
      </div>

      {/* Opportunities Grid */}
      <div className={`grid gap-6 ${
        viewMode === 'grid' 
          ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
          : 'grid-cols-1'
      }`}>
        {filteredOpportunities.map((opportunity) => (
          <motion.div
            key={opportunity.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -4, scale: 1.02 }}
            onClick={() => setSelectedOpportunity(opportunity)}
            className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 cursor-pointer"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  opportunity.color === 'blue' ? 'bg-blue-100' :
                  opportunity.color === 'red' ? 'bg-red-100' :
                  opportunity.color === 'green' ? 'bg-green-100' :
                  opportunity.color === 'purple' ? 'bg-purple-100' :
                  opportunity.color === 'yellow' ? 'bg-yellow-100' :
                  opportunity.color === 'emerald' ? 'bg-emerald-100' : 'bg-gray-100'
                }`}>
                  <Building className={`w-6 h-6 ${
                    opportunity.color === 'blue' ? 'text-blue-600' :
                    opportunity.color === 'red' ? 'text-red-600' :
                    opportunity.color === 'green' ? 'text-green-600' :
                    opportunity.color === 'purple' ? 'text-purple-600' :
                    opportunity.color === 'yellow' ? 'text-yellow-600' :
                    opportunity.color === 'emerald' ? 'text-emerald-600' : 'text-gray-600'
                  }`} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{opportunity.name}</h3>
                  <p className="text-sm text-gray-600">{opportunity.category} • {opportunity.stage}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(opportunity.status)}`}>
                  {opportunity.status}
                </span>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium text-gray-900">{opportunity.rating}</span>
                </div>
              </div>
            </div>

            <p className="text-gray-600 text-sm mb-4 line-clamp-2">{opportunity.description}</p>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-xs text-gray-500">Valuation</p>
                <p className="text-lg font-semibold text-gray-900">{opportunity.valuation}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Asking Amount</p>
                <p className="text-lg font-semibold text-gray-900">{opportunity.askingAmount}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Equity</p>
                <p className="text-lg font-semibold text-gray-900">{opportunity.equity}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Revenue</p>
                <p className="text-lg font-semibold text-gray-900">{opportunity.revenue}</p>
              </div>
            </div>

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded text-xs font-medium border ${getRiskColor(opportunity.risk)}`}>
                  Risk: {opportunity.risk}
                </span>
                <span className={`px-2 py-1 rounded text-xs font-medium border ${getReturnColor(opportunity.return)}`}>
                  Return: {opportunity.return}
                </span>
              </div>
              <div className="flex items-center space-x-1 text-sm text-gray-500">
                <MapPin size={14} />
                <span>{opportunity.location}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {opportunity.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <Users size={14} />
                  <span>{opportunity.employees} employees</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar size={14} />
                  <span>Founded {opportunity.founded}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                >
                  <Heart size={18} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Share2 size={18} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                >
                  <Eye size={18} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Investment Opportunity Detail Modal */}
      <AnimatePresence>
        {selectedOpportunity && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedOpportunity(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-emerald-600 to-blue-600 p-6 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`w-16 h-16 rounded-xl flex items-center justify-center ${
                      selectedOpportunity.color === 'blue' ? 'bg-blue-100' :
                      selectedOpportunity.color === 'red' ? 'bg-red-100' :
                      selectedOpportunity.color === 'green' ? 'bg-green-100' :
                      selectedOpportunity.color === 'purple' ? 'bg-purple-100' :
                      selectedOpportunity.color === 'yellow' ? 'bg-yellow-100' :
                      selectedOpportunity.color === 'emerald' ? 'bg-emerald-100' : 'bg-gray-100'
                    }`}>
                      <Building className={`w-8 h-8 ${
                        selectedOpportunity.color === 'blue' ? 'text-blue-600' :
                        selectedOpportunity.color === 'red' ? 'text-red-600' :
                        selectedOpportunity.color === 'green' ? 'text-green-600' :
                        selectedOpportunity.color === 'purple' ? 'text-purple-600' :
                        selectedOpportunity.color === 'yellow' ? 'text-yellow-600' :
                        selectedOpportunity.color === 'emerald' ? 'text-emerald-600' : 'text-gray-600'
                      }`} />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold">{selectedOpportunity.name}</h2>
                      <p className="text-emerald-100 text-lg">{selectedOpportunity.category} • {selectedOpportunity.stage}</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <div className="flex items-center space-x-1">
                          <Star className="w-5 h-5 text-yellow-400 fill-current" />
                          <span className="font-medium">{selectedOpportunity.rating}</span>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium border ${
                          selectedOpportunity.status === 'Hot' ? 'bg-red-100 text-red-800 border-red-200' :
                          selectedOpportunity.status === 'Active' ? 'bg-blue-100 text-blue-800 border-blue-200' :
                          'bg-gray-100 text-gray-800 border-gray-200'
                        }`}>
                          {selectedOpportunity.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedOpportunity(null)}
                    className="text-white hover:text-emerald-200 transition-colors p-2 hover:bg-white/20 rounded-lg"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 overflow-y-auto max-h-[70vh]">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Left Column - Main Info */}
                  <div className="lg:col-span-2 space-y-6">
                    {/* Description */}
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">About the Company</h3>
                      <p className="text-gray-700 leading-relaxed text-lg">{selectedOpportunity.description}</p>
                    </div>

                    {/* Financial Overview */}
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Financial Overview</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-gray-50 rounded-xl p-4 text-center">
                          <p className="text-sm text-gray-600 mb-1">Valuation</p>
                          <p className="text-2xl font-bold text-gray-900">{selectedOpportunity.valuation}</p>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-4 text-center">
                          <p className="text-sm text-gray-600 mb-1">Asking Amount</p>
                          <p className="text-2xl font-bold text-gray-900">{selectedOpportunity.askingAmount}</p>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-4 text-center">
                          <p className="text-sm text-gray-600 mb-1">Equity Offered</p>
                          <p className="text-2xl font-bold text-gray-900">{selectedOpportunity.equity}</p>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-4 text-center">
                          <p className="text-sm text-gray-600 mb-1">Annual Revenue</p>
                          <p className="text-2xl font-bold text-gray-900">{selectedOpportunity.revenue}</p>
                        </div>
                      </div>
                    </div>

                    {/* Growth Metrics */}
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Growth Metrics</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm text-green-600 font-medium">Growth Rate</p>
                              <p className="text-2xl font-bold text-green-900">{selectedOpportunity.growth}</p>
                            </div>
                            <TrendingUp className="w-8 h-8 text-green-600" />
                          </div>
                        </div>
                        <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm text-blue-600 font-medium">Team Size</p>
                              <p className="text-2xl font-bold text-blue-900">{selectedOpportunity.employees}</p>
                            </div>
                            <Users className="w-8 h-8 text-blue-600" />
                          </div>
                        </div>
                        <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm text-purple-600 font-medium">Founded</p>
                              <p className="text-2xl font-bold text-purple-900">{selectedOpportunity.founded}</p>
                            </div>
                            <Calendar className="w-8 h-8 text-purple-600" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Risk & Return Analysis */}
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Risk & Return Analysis</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-yellow-900">Risk Level</h4>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRiskColor(selectedOpportunity.risk)}`}>
                              {selectedOpportunity.risk}
                            </span>
                          </div>
                          <p className="text-sm text-yellow-700">
                            {selectedOpportunity.risk === 'Low' && 'Conservative investment with stable returns and minimal volatility.'}
                            {selectedOpportunity.risk === 'Medium' && 'Moderate risk with balanced potential for growth and stability.'}
                            {selectedOpportunity.risk === 'High' && 'Higher risk investment with potential for significant returns.'}
                          </p>
                        </div>
                        <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-green-900">Expected Return</h4>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getReturnColor(selectedOpportunity.return)}`}>
                              {selectedOpportunity.return}
                            </span>
                          </div>
                          <p className="text-sm text-green-700">
                            {selectedOpportunity.return === 'Low' && 'Conservative returns with capital preservation focus.'}
                            {selectedOpportunity.return === 'Medium' && 'Moderate returns with steady growth potential.'}
                            {selectedOpportunity.return === 'High' && 'High growth potential with strong market positioning.'}
                            {selectedOpportunity.return === 'Very High' && 'Exceptional growth potential with innovative technology.'}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Technology & Tags */}
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Technology & Focus Areas</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedOpportunity.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-4 py-2 bg-emerald-100 text-emerald-800 text-sm font-medium rounded-full border border-emerald-200"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Sidebar */}
                  <div className="space-y-6">
                    {/* Investment Actions */}
                    <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-200">
                      <h3 className="text-lg font-bold text-gray-900 mb-4">Investment Actions</h3>
                      <div className="space-y-3">
                        <button className="w-full px-4 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium flex items-center justify-center space-x-2">
                          <DollarSign className="w-5 h-5" />
                          <span>Express Interest</span>
                        </button>
                        <button className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center space-x-2">
                          <FileText className="w-5 h-5" />
                          <span>Request Details</span>
                        </button>
                        <button className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center justify-center space-x-2">
                          <Phone className="w-5 h-5" />
                          <span>Contact Team</span>
                        </button>
                      </div>
                    </div>

                    {/* Company Details */}
                    <div className="bg-gray-50 rounded-xl p-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-4">Company Details</h3>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <MapPin className="w-5 h-5 text-gray-400" />
                          <span className="text-gray-700">{selectedOpportunity.location}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Calendar className="w-5 h-5 text-gray-400" />
                          <span className="text-gray-700">Founded {selectedOpportunity.founded}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Users className="w-5 h-5 text-gray-400" />
                          <span className="text-gray-700">{selectedOpportunity.employees} employees</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Clock className="w-5 h-5 text-gray-400" />
                          <span className="text-gray-700">Deadline: {selectedOpportunity.deadline}</span>
                        </div>
                      </div>
                    </div>

                    {/* Key Investors */}
                    <div className="bg-blue-50 rounded-xl p-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-4">Key Investors</h3>
                      <div className="space-y-2">
                        {selectedOpportunity.investors.map((investor, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                            <span className="text-sm text-gray-700">{investor}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white rounded-xl p-6 border border-gray-200">
                      <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
                      <div className="grid grid-cols-2 gap-2">
                        <button className="p-3 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors flex flex-col items-center space-y-1">
                          <Heart className="w-5 h-5" />
                          <span className="text-xs">Save</span>
                        </button>
                        <button className="p-3 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors flex flex-col items-center space-y-1">
                          <Share2 className="w-5 h-5" />
                          <span className="text-xs">Share</span>
                        </button>
                        <button className="p-3 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors flex flex-col items-center space-y-1">
                          <Download className="w-5 h-5" />
                          <span className="text-xs">Export</span>
                        </button>
                        <button className="p-3 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors flex flex-col items-center space-y-1">
                          <ExternalLink className="w-5 h-5" />
                          <span className="text-xs">Website</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InvestmentOpportunities;
