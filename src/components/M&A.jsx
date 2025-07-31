import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Target, 
  TrendingUp, 
  Shield, 
  Users, 
  Building, 
  DollarSign,
  Calendar,
  MapPin,
  Star,
  Eye,
  Plus,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Lock,
  BarChart3,
  FileText,
  Briefcase,
  Globe,
  Zap
} from 'lucide-react';

const MAndA = () => {
  const [activeTab, setActiveTab] = useState('discovery');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    industry: 'all',
    size: 'all',
    stage: 'all',
    region: 'all'
  });

  const tabs = [
    { id: 'discovery', label: 'Target Discovery', icon: Target, count: 2847 },
    { id: 'pipeline', label: 'Deal Flow', icon: TrendingUp, count: 73 },
    { id: 'readiness', label: 'Readiness Check', icon: Shield, count: 12 },
    { id: 'advisors', label: 'M&A Advisors', icon: Users, count: 156 }
  ];

  const targets = [
    {
      id: 1,
      name: 'TechFlow Solutions',
      industry: 'SaaS',
      description: 'Enterprise workflow automation platform with 500+ enterprise customers',
      revenue: '$12.5M',
      employees: 85,
      stage: 'Series B',
      location: 'San Francisco, CA',
      valuation: '$45M',
      growth: '+127%',
      status: 'active',
      matchScore: 94,
      lastContact: '2 days ago',
      tags: ['automation', 'enterprise', 'b2b']
    },
    {
      id: 2,
      name: 'DataViz Analytics',
      industry: 'Analytics',
      description: 'AI-powered business intelligence platform with strong retention',
      revenue: '$8.2M',
      employees: 45,
      stage: 'Series A',
      location: 'Austin, TX',
      valuation: '$28M',
      growth: '+89%',
      status: 'contacted',
      matchScore: 87,
      lastContact: '1 week ago',
      tags: ['analytics', 'ai', 'b2b']
    },
    {
      id: 3,
      name: 'CloudSecure',
      industry: 'Cybersecurity',
      description: 'Zero-trust security platform for cloud infrastructure',
      revenue: '$15.8M',
      employees: 120,
      stage: 'Series C',
      location: 'Boston, MA',
      valuation: '$75M',
      growth: '+156%',
      status: 'qualified',
      matchScore: 92,
      lastContact: '3 days ago',
      tags: ['security', 'cloud', 'enterprise']
    }
  ];

  const advisors = [
    {
      id: 1,
      name: 'Sarah Chen',
      title: 'Managing Director',
      company: 'Goldman Sachs',
      experience: '15+ years',
      deals: 47,
      value: '$12.8B',
      rating: 4.9,
      specialties: ['SaaS', 'FinTech', 'Enterprise'],
      availability: 'Available',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 2,
      name: 'Michael Rodriguez',
      title: 'Partner',
      company: 'Morgan Stanley',
      experience: '12+ years',
      deals: 34,
      value: '$8.9B',
      rating: 4.8,
      specialties: ['Healthcare', 'Biotech', 'AI'],
      availability: 'Available',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    }
  ];

  const renderTargetDiscovery = () => (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search targets by name, industry, or keywords..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={selectedFilters.industry}
              onChange={(e) => setSelectedFilters({...selectedFilters, industry: e.target.value})}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Industries</option>
              <option value="saas">SaaS</option>
              <option value="analytics">Analytics</option>
              <option value="cybersecurity">Cybersecurity</option>
            </select>
            <select
              value={selectedFilters.size}
              onChange={(e) => setSelectedFilters({...selectedFilters, size: e.target.value})}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Sizes</option>
              <option value="small">Small (1-50)</option>
              <option value="medium">Medium (51-200)</option>
              <option value="large">Large (200+)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Targets Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {targets.map((target) => (
          <motion.div
            key={target.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{target.name}</h3>
                <p className="text-sm text-gray-600">{target.industry}</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  target.status === 'active' ? 'bg-green-100 text-green-800' :
                  target.status === 'contacted' ? 'bg-blue-100 text-blue-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {target.status}
                </span>
                <div className="flex items-center space-x-1">
                  <Star className="text-yellow-400" size={16} />
                  <span className="text-sm font-medium">{target.matchScore}%</span>
                </div>
              </div>
            </div>

            <p className="text-gray-600 text-sm mb-4">{target.description}</p>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-xs text-gray-500">Revenue</p>
                <p className="text-sm font-semibold">{target.revenue}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Valuation</p>
                <p className="text-sm font-semibold">{target.valuation}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Growth</p>
                <p className="text-sm font-semibold text-green-600">{target.growth}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Employees</p>
                <p className="text-sm font-semibold">{target.employees}</p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <MapPin size={14} />
                <span>{target.location}</span>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 font-medium"
              >
                <span>View Details</span>
                <ArrowRight size={16} />
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderDealFlow = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Deal Pipeline</h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all flex items-center space-x-2"
          >
            <Plus size={16} />
            <span>Add Deal</span>
          </motion.button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2">Discovery</h3>
            <p className="text-2xl font-bold text-blue-900">2847</p>
            <p className="text-sm text-blue-700">Targets identified</p>
          </div>
          <div className="bg-yellow-50 rounded-lg p-4">
            <h3 className="font-semibold text-yellow-900 mb-2">Contacted</h3>
            <p className="text-2xl font-bold text-yellow-900">156</p>
            <p className="text-sm text-yellow-700">Initial outreach</p>
          </div>
          <div className="bg-orange-50 rounded-lg p-4">
            <h3 className="font-semibold text-orange-900 mb-2">Qualified</h3>
            <p className="text-2xl font-bold text-orange-900">73</p>
            <p className="text-sm text-orange-700">In pipeline</p>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <h3 className="font-semibold text-green-900 mb-2">Closed</h3>
            <p className="text-2xl font-bold text-green-900">12</p>
            <p className="text-sm text-green-700">Successful deals</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderReadinessCheck = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Shield className="text-blue-600" size={24} />
          <h2 className="text-xl font-semibold text-gray-900">M&A Readiness Assessment</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Compliance & Legal</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium">Financial Audits</span>
                <CheckCircle className="text-green-600" size={20} />
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium">Legal Structure</span>
                <CheckCircle className="text-green-600" size={20} />
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium">IP Protection</span>
                <AlertCircle className="text-yellow-600" size={20} />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Operational</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium">Financial Systems</span>
                <CheckCircle className="text-green-600" size={20} />
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium">Customer Contracts</span>
                <CheckCircle className="text-green-600" size={20} />
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium">Employee Agreements</span>
                <AlertCircle className="text-yellow-600" size={20} />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center space-x-3">
            <Lock className="text-blue-600" size={20} />
            <div>
              <h4 className="font-semibold text-blue-900">SOC 2 Compliance</h4>
              <p className="text-sm text-blue-700">Enterprise-grade security and data protection</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAdvisors = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {advisors.map((advisor) => (
          <motion.div
            key={advisor.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-start space-x-4">
              <img 
                src={advisor.avatar} 
                alt={advisor.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{advisor.name}</h3>
                    <p className="text-sm text-gray-600">{advisor.title} at {advisor.company}</p>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="text-yellow-400" size={16} />
                    <span className="text-sm font-medium">{advisor.rating}</span>
                  </div>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Experience</p>
                    <p className="font-medium">{advisor.experience}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Deals Closed</p>
                    <p className="font-medium">{advisor.deals}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Total Value</p>
                    <p className="font-medium">{advisor.value}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Status</p>
                    <span className="text-green-600 font-medium">{advisor.availability}</span>
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-sm text-gray-500 mb-2">Specialties:</p>
                  <div className="flex flex-wrap gap-2">
                    {advisor.specialties.map((specialty) => (
                      <span key={specialty} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-4 w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all flex items-center justify-center space-x-2"
                >
                  <span>Contact Advisor</span>
                  <ArrowRight size={16} />
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
      case 'discovery':
        return renderTargetDiscovery();
      case 'pipeline':
        return renderDealFlow();
      case 'readiness':
        return renderReadinessCheck();
      case 'advisors':
        return renderAdvisors();
      default:
        return renderTargetDiscovery();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold startupos-gradient-text mb-2">M&A Module</h1>
          <p className="text-gray-600 text-lg">
            Bank-level security with AI-powered target discovery and expert advisors
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-2 mb-8">
          <div className="flex space-x-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-lg transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-sm'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon size={18} />
                  <span className="font-medium">{tab.label}</span>
                  <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
                    {tab.count}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderCurrentTab()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MAndA; 