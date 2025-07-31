import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Globe, 
  Zap, 
  DollarSign, 
  Users, 
  Building, 
  Handshake, 
  TrendingUp, 
  Star, 
  Plus, 
  Search, 
  Filter, 
  ExternalLink, 
  CheckCircle, 
  Clock, 
  ArrowRight,
  Briefcase,
  CreditCard,
  Mail,
  MessageSquare,
  Phone,
  Video,
  FileText,
  Settings,
  Shield,
  Award,
  Target,
  Rocket,
  Heart,
  Eye,
  Download
} from 'lucide-react';
import '../App.css';

const EcosystemHub = () => {
  const [activeTab, setActiveTab] = useState('investors');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const tabs = [
    { id: 'investors', label: 'Investors', icon: DollarSign, count: 1250 },
    { id: 'partners', label: 'Partners', icon: Handshake, count: 850 },
    { id: 'services', label: 'Services', icon: Building, count: 2100 },
    { id: 'integrations', label: 'Integrations', icon: Zap, count: 450 }
  ];

  const investors = [
    {
      id: 1,
      name: 'Sequoia Capital',
      type: 'VC Fund',
      stage: 'Series A-C',
      checkSize: '$5M - $50M',
      sectors: ['SaaS', 'AI/ML', 'Fintech'],
      location: 'Menlo Park, CA',
      portfolio: 200,
      exits: 45,
      rating: 4.9,
      logo: '🏛️',
      status: 'Active',
      lastActivity: '2 days ago',
      description: 'Leading venture capital firm focused on technology companies with global impact potential.',
      requirements: 'Series A+ companies with $1M+ ARR and strong growth metrics',
      contact: {
        email: 'partners@sequoiacap.com',
        website: 'sequoiacap.com'
      }
    },
    {
      id: 2,
      name: 'Andreessen Horowitz',
      type: 'VC Fund',
      stage: 'Seed - Series B',
      checkSize: '$1M - $25M',
      sectors: ['Enterprise', 'Consumer', 'Crypto'],
      location: 'San Francisco, CA',
      portfolio: 180,
      exits: 38,
      rating: 4.8,
      logo: '🚀',
      status: 'Active',
      lastActivity: '1 week ago',
      description: 'Venture capital firm that backs bold entrepreneurs building the future.',
      requirements: 'Strong technical team with innovative product and clear market opportunity',
      contact: {
        email: 'info@a16z.com',
        website: 'a16z.com'
      }
    },
    {
      id: 3,
      name: 'First Round Capital',
      type: 'VC Fund',
      stage: 'Pre-Seed - Series A',
      checkSize: '$500K - $15M',
      sectors: ['B2B SaaS', 'Marketplace', 'Developer Tools'],
      location: 'Philadelphia, PA',
      portfolio: 150,
      exits: 42,
      rating: 4.7,
      logo: '⭐',
      status: 'Active',
      lastActivity: '3 days ago',
      description: 'Early-stage venture capital firm focused on helping entrepreneurs build great companies.',
      requirements: 'Pre-revenue to $5M ARR with strong founder-market fit',
      contact: {
        email: 'team@firstround.com',
        website: 'firstround.com'
      }
    }
  ];

  const partners = [
    {
      id: 1,
      name: 'AWS Activate',
      type: 'Cloud Credits',
      category: 'Infrastructure',
      benefit: 'Up to $100K credits',
      logo: '☁️',
      description: 'Cloud computing credits and technical support for startups',
      requirements: 'Early-stage startup with less than $1M funding',
      status: 'Available',
      rating: 4.8,
      users: 15000
    },
    {
      id: 2,
      name: 'Stripe Atlas',
      type: 'Business Formation',
      category: 'Legal',
      benefit: 'Company incorporation',
      logo: '💳',
      description: 'Complete toolkit for starting an internet business',
      requirements: 'New business formation needed',
      status: 'Available',
      rating: 4.9,
      users: 25000
    },
    {
      id: 3,
      name: 'HubSpot for Startups',
      type: 'CRM & Marketing',
      category: 'Sales & Marketing',
      benefit: '90% discount',
      logo: '📊',
      description: 'CRM, marketing, and sales software for growing companies',
      requirements: 'Less than $2M in funding, less than $100K ARR',
      status: 'Available',
      rating: 4.6,
      users: 8500
    }
  ];

  const services = [
    {
      id: 1,
      name: 'Wilson Sonsini',
      type: 'Legal Services',
      category: 'Legal',
      specialties: ['Corporate Law', 'IP', 'Employment'],
      location: 'Palo Alto, CA',
      rating: 4.9,
      clients: 500,
      logo: '⚖️',
      pricing: '$500-800/hr',
      description: 'Premier legal services for technology companies and startups',
      contact: {
        phone: '+1 (650) 493-9300',
        email: 'info@wsgr.com'
      }
    },
    {
      id: 2,
      name: 'PwC Startup Services',
      type: 'Accounting & Tax',
      category: 'Financial',
      specialties: ['Tax Planning', 'Audit', 'Advisory'],
      location: 'Multiple Locations',
      rating: 4.7,
      clients: 1200,
      logo: '💼',
      pricing: '$200-400/hr',
      description: 'Comprehensive financial services for high-growth startups',
      contact: {
        phone: '+1 (646) 471-4000',
        email: 'startup@pwc.com'
      }
    },
    {
      id: 3,
      name: 'Brex',
      type: 'Financial Services',
      category: 'Banking',
      specialties: ['Corporate Cards', 'Banking', 'Expense Management'],
      location: 'San Francisco, CA',
      rating: 4.8,
      clients: 8000,
      logo: '💳',
      pricing: 'Free + transaction fees',
      description: 'Modern financial services built for startups and scale-ups',
      contact: {
        phone: '+1 (855) 739-6739',
        email: 'support@brex.com'
      }
    }
  ];

  const integrations = [
    {
      id: 1,
      name: 'Slack',
      category: 'Communication',
      type: 'Team Collaboration',
      logo: '💬',
      description: 'Connect your startup operations with team communication',
      features: ['Workflow notifications', 'Team updates', 'AI insights'],
      status: 'Available',
      users: 45000,
      rating: 4.8
    },
    {
      id: 2,
      name: 'Salesforce',
      category: 'CRM',
      type: 'Customer Management',
      logo: '☁️',
      description: 'Sync customer data and sales pipeline with StartupOS',
      features: ['Lead tracking', 'Pipeline sync', 'Revenue analytics'],
      status: 'Available',
      users: 28000,
      rating: 4.6
    },
    {
      id: 3,
      name: 'QuickBooks',
      category: 'Accounting',
      type: 'Financial Management',
      logo: '📊',
      description: 'Integrate financial data for comprehensive business insights',
      features: ['Expense tracking', 'Financial reporting', 'Tax preparation'],
      status: 'Available',
      users: 35000,
      rating: 4.7
    }
  ];

  const getCurrentData = () => {
    switch (activeTab) {
      case 'investors': return investors;
      case 'partners': return partners;
      case 'services': return services;
      case 'integrations': return integrations;
      default: return [];
    }
  };

  const filteredData = getCurrentData().filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || 
                           (item.category && item.category === selectedCategory) ||
                           (item.type && item.type === selectedCategory);
    return matchesSearch && matchesCategory;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
      case 'Available': return 'text-green-600 bg-green-50 border-green-200';
      case 'Busy': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'Closed': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
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
                  <Globe className="text-white" size={20} />
                </div>
                <h1 className="text-3xl font-bold startupos-gradient-text">Ecosystem Hub</h1>
              </div>
              <p className="text-gray-600">
                Connect with investors, partners, and service providers to accelerate your startup growth
              </p>
            </div>
            <motion.button
              className="flex items-center space-x-2 px-6 py-3 startupos-gradient text-white rounded-xl hover:shadow-lg transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Plus size={20} />
              <span>Submit Resource</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { title: 'Total Connections', value: '4,650+', change: '+250', icon: Users, color: 'blue' },
            { title: 'Active Partnerships', value: '127', change: '+18', icon: Handshake, color: 'green' },
            { title: 'Funding Raised', value: '$2.8B', change: '+$450M', icon: DollarSign, color: 'purple' },
            { title: 'Success Rate', value: '73%', change: '+8%', icon: TrendingUp, color: 'orange' }
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

        {/* Navigation Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-2 mb-8"
        >
          <div className="flex space-x-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-blue-50 text-blue-600 border border-blue-200'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon size={18} />
                  <span>{tab.label}</span>
                  <span className={`px-2 py-0.5 text-xs rounded-full ${
                    activeTab === tab.id
                      ? 'bg-blue-100 text-blue-600'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {tab.count}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
              <div className="relative">
                <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder={`Search ${activeTab}...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full md:w-64"
                />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                {activeTab === 'investors' && (
                  <>
                    <option value="VC Fund">VC Fund</option>
                    <option value="Angel">Angel Investor</option>
                    <option value="Corporate">Corporate VC</option>
                  </>
                )}
                {activeTab === 'partners' && (
                  <>
                    <option value="Infrastructure">Infrastructure</option>
                    <option value="Legal">Legal</option>
                    <option value="Sales & Marketing">Sales & Marketing</option>
                  </>
                )}
                {activeTab === 'services' && (
                  <>
                    <option value="Legal">Legal</option>
                    <option value="Financial">Financial</option>
                    <option value="Marketing">Marketing</option>
                  </>
                )}
                {activeTab === 'integrations' && (
                  <>
                    <option value="Communication">Communication</option>
                    <option value="CRM">CRM</option>
                    <option value="Accounting">Accounting</option>
                  </>
                )}
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">
                {filteredData.length} result{filteredData.length !== 1 ? 's' : ''}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AnimatePresence>
            {filteredData.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover-lift cursor-pointer"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-2xl">
                    {item.logo}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                        <p className="text-blue-600 font-medium">{item.type}</p>
                        {item.location && (
                          <p className="text-gray-600 text-sm">{item.location}</p>
                        )}
                      </div>
                      {item.status && (
                        <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(item.status)}`}>
                          {item.status}
                        </span>
                      )}
                    </div>
                    
                    {item.rating && (
                      <div className="flex items-center space-x-2 mt-2">
                        <div className="flex items-center space-x-1">
                          <Star size={14} className="text-yellow-500 fill-current" />
                          <span className="text-sm font-medium">{item.rating}</span>
                        </div>
                        {(item.portfolio || item.users || item.clients) && (
                          <span className="text-sm text-gray-600">
                            • {item.portfolio || item.users || item.clients} {item.portfolio ? 'portfolio' : item.users ? 'users' : 'clients'}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <p className="text-gray-600 text-sm mt-4 line-clamp-2">{item.description}</p>

                {/* Specific content based on tab */}
                {activeTab === 'investors' && (
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Stage:</span>
                      <span className="font-medium">{item.stage}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Check Size:</span>
                      <span className="font-medium">{item.checkSize}</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {item.sectors.slice(0, 3).map((sector, sectorIndex) => (
                        <span
                          key={sectorIndex}
                          className="px-2 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded-full"
                        >
                          {sector}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'partners' && (
                  <div className="mt-4">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-gray-600">Benefit:</span>
                      <span className="font-medium text-green-600">{item.benefit}</span>
                    </div>
                    <div className="text-xs text-gray-500">{item.requirements}</div>
                  </div>
                )}

                {activeTab === 'services' && (
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Pricing:</span>
                      <span className="font-medium">{item.pricing}</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {item.specialties.slice(0, 3).map((specialty, specialtyIndex) => (
                        <span
                          key={specialtyIndex}
                          className="px-2 py-1 bg-purple-50 text-purple-600 text-xs font-medium rounded-full"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'integrations' && (
                  <div className="mt-4">
                    <div className="flex flex-wrap gap-1 mb-2">
                      {item.features.slice(0, 3).map((feature, featureIndex) => (
                        <span
                          key={featureIndex}
                          className="px-2 py-1 bg-green-50 text-green-600 text-xs font-medium rounded-full"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-2">
                    {item.lastActivity && (
                      <span className="text-xs text-gray-500">Last active: {item.lastActivity}</span>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <motion.button
                      className="flex items-center space-x-1 px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Eye size={14} />
                      <span>View</span>
                    </motion.button>
                    <motion.button
                      className="flex items-center space-x-1 px-3 py-1 text-sm text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <MessageSquare size={14} />
                      <span>Connect</span>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-8"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <motion.button
              className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
                <Rocket size={20} />
              </div>
              <div className="text-left">
                <h4 className="font-medium text-gray-900">Submit for Funding</h4>
                <p className="text-sm text-gray-600">Apply to investor programs</p>
              </div>
            </motion.button>
            
            <motion.button
              className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="w-10 h-10 bg-green-50 text-green-600 rounded-lg flex items-center justify-center">
                <Handshake size={20} />
              </div>
              <div className="text-left">
                <h4 className="font-medium text-gray-900">Partner Request</h4>
                <p className="text-sm text-gray-600">Request partnership access</p>
              </div>
            </motion.button>
            
            <motion.button
              className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-lg flex items-center justify-center">
                <Zap size={20} />
              </div>
              <div className="text-left">
                <h4 className="font-medium text-gray-900">Add Integration</h4>
                <p className="text-sm text-gray-600">Connect new tools</p>
              </div>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default EcosystemHub;

