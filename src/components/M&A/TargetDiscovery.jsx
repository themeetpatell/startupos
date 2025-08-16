import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Target, 
  TrendingUp, 
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
  Zap,
  Users,
  Activity,
  PieChart,
  LineChart,
  Phone,
  Mail,
  MessageSquare,
  Bookmark,
  Share2,
  Download,
  Heart,
  Clock,
  Award,
  Shield,
  Target as TargetIcon,
  X,
  Grid,
  List
} from 'lucide-react';

const TargetDiscovery = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    industry: 'all',
    size: 'all',
    stage: 'all',
    region: 'all',
    revenue: 'all',
    growth: 'all'
  });
  const [viewMode, setViewMode] = useState('grid');
  const [selectedTarget, setSelectedTarget] = useState(null);
  const [showTargetModal, setShowTargetModal] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [sortBy, setSortBy] = useState('match');

  const industries = [
    'SaaS', 'FinTech', 'Healthcare', 'E-commerce', 'Cybersecurity', 
    'AI/ML', 'EdTech', 'PropTech', 'CleanTech', 'Biotech'
  ];

  const targets = [
    {
      id: 1,
      name: 'TechFlow Solutions',
      industry: 'SaaS',
              description: 'Enterprise automation platform with 500+ enterprise customers and strong recurring revenue model',
      revenue: '$12.5M',
      revenueGrowth: '+45%',
      employees: 85,
      stage: 'Series B',
      location: 'San Francisco, CA',
      valuation: '$45M',
      growth: '+127%',
      status: 'active',
      matchScore: 94,
      lastContact: '2 days ago',
      tags: ['automation', 'enterprise', 'b2b'],
      financials: {
        revenue: 12500000,
        growth: 45,
        margin: 68,
        churn: 3.2,
        ltv: 45000,
        cac: 8500
      },
      metrics: {
        customers: 500,
        mrr: 1042000,
        arr: 12500000,
        netRetention: 112
      },
      contact: {
        ceo: 'Sarah Johnson',
        email: 'sarah@techflow.com',
        phone: '+1 (415) 555-0123',
        linkedin: 'linkedin.com/in/sarahjohnson'
      },
      documents: ['Financial Model', 'Pitch Deck', 'Customer List', 'Tech Stack'],
      risks: ['High CAC', 'Competition from Microsoft'],
      opportunities: ['International expansion', 'Product expansion'],
      timeline: 'Q2 2024',
      dealSize: '$25M - $35M'
    },
    {
      id: 2,
      name: 'DataViz Analytics',
      industry: 'Analytics',
      description: 'AI-powered business intelligence platform with strong retention and growing enterprise adoption',
      revenue: '$8.2M',
      revenueGrowth: '+67%',
      employees: 45,
      stage: 'Series A',
      location: 'Austin, TX',
      valuation: '$28M',
      growth: '+89%',
      status: 'contacted',
      matchScore: 87,
      lastContact: '1 week ago',
      tags: ['analytics', 'ai', 'b2b'],
      financials: {
        revenue: 8200000,
        growth: 67,
        margin: 72,
        churn: 2.8,
        ltv: 52000,
        cac: 7200
      },
      metrics: {
        customers: 320,
        mrr: 683000,
        arr: 8200000,
        netRetention: 118
      },
      contact: {
        ceo: 'Michael Chen',
        email: 'michael@dataviz.com',
        phone: '+1 (512) 555-0456',
        linkedin: 'linkedin.com/in/michaelchen'
      },
      documents: ['Financial Model', 'Pitch Deck', 'Customer List', 'Tech Stack'],
      risks: ['Dependency on AWS', 'Limited moat'],
      opportunities: ['AI features', 'Enterprise sales'],
      timeline: 'Q3 2024',
      dealSize: '$15M - $22M'
    },
    {
      id: 3,
      name: 'CloudSecure',
      industry: 'Cybersecurity',
      description: 'Zero-trust security platform for cloud infrastructure with SOC 2 compliance and enterprise focus',
      revenue: '$15.8M',
      revenueGrowth: '+89%',
      employees: 120,
      stage: 'Series C',
      location: 'Boston, MA',
      valuation: '$75M',
      growth: '+156%',
      status: 'qualified',
      matchScore: 92,
      lastContact: '3 days ago',
      tags: ['security', 'cloud', 'enterprise'],
      financials: {
        revenue: 15800000,
        growth: 89,
        margin: 65,
        churn: 4.1,
        ltv: 78000,
        cac: 12000
      },
      metrics: {
        customers: 180,
        mrr: 1317000,
        arr: 15800000,
        netRetention: 105
      },
      contact: {
        ceo: 'David Rodriguez',
        email: 'david@cloudsecure.com',
        phone: '+1 (617) 555-0789',
        linkedin: 'linkedin.com/in/davidrodriguez'
      },
      documents: ['Financial Model', 'Pitch Deck', 'Customer List', 'Tech Stack'],
      risks: ['High competition', 'Regulatory changes'],
      opportunities: ['International expansion', 'Product portfolio'],
      timeline: 'Q1 2024',
      dealSize: '$40M - $60M'
    },
    {
      id: 4,
      name: 'HealthTech Pro',
      industry: 'Healthcare',
      description: 'Digital health platform connecting patients with providers, with strong regulatory compliance',
      revenue: '$6.8M',
      revenueGrowth: '+112%',
      employees: 65,
      stage: 'Series A',
      location: 'Nashville, TN',
      valuation: '$22M',
      growth: '+134%',
      status: 'active',
      matchScore: 89,
      lastContact: '5 days ago',
      tags: ['healthcare', 'digital', 'compliance'],
      financials: {
        revenue: 6800000,
        growth: 112,
        margin: 58,
        churn: 5.2,
        ltv: 38000,
        cac: 9500
      },
      metrics: {
        customers: 420,
        mrr: 567000,
        arr: 6800000,
        netRetention: 108
      },
      contact: {
        ceo: 'Emily Watson',
        email: 'emily@healthtechpro.com',
        phone: '+1 (615) 555-0321',
        linkedin: 'linkedin.com/in/emilywatson'
      },
      documents: ['Financial Model', 'Pitch Deck', 'Customer List', 'Tech Stack'],
      risks: ['Regulatory compliance', 'Long sales cycles'],
      opportunities: ['Telemedicine expansion', 'AI integration'],
      timeline: 'Q4 2024',
      dealSize: '$12M - $18M'
    },
    {
      id: 5,
      name: 'FinFlow',
      industry: 'FinTech',
      description: 'Payment processing and financial infrastructure platform with strong merchant network',
      revenue: '$18.2M',
      revenueGrowth: '+78%',
      employees: 95,
      stage: 'Series B',
      location: 'Miami, FL',
      valuation: '$65M',
      growth: '+98%',
      status: 'contacted',
      matchScore: 91,
      lastContact: '1 day ago',
      tags: ['fintech', 'payments', 'b2b'],
      financials: {
        revenue: 18200000,
        growth: 78,
        margin: 62,
        churn: 2.9,
        ltv: 65000,
        cac: 11000
      },
      metrics: {
        customers: 280,
        mrr: 1517000,
        arr: 18200000,
        netRetention: 115
      },
      contact: {
        ceo: 'Alex Thompson',
        email: 'alex@finflow.com',
        phone: '+1 (305) 555-0987',
        linkedin: 'linkedin.com/in/alexthompson'
      },
      documents: ['Financial Model', 'Pitch Deck', 'Customer List', 'Tech Stack'],
      risks: ['Regulatory changes', 'Competition from Stripe'],
      opportunities: ['International expansion', 'Product diversification'],
      timeline: 'Q2 2024',
      dealSize: '$30M - $45M'
    }
  ];

  const filteredTargets = targets.filter(target => {
    const matchesSearch = target.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         target.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         target.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesIndustry = selectedFilters.industry === 'all' || target.industry.toLowerCase() === selectedFilters.industry;
    const matchesSize = selectedFilters.size === 'all' || 
                       (selectedFilters.size === 'small' && target.employees <= 50) ||
                       (selectedFilters.size === 'medium' && target.employees > 50 && target.employees <= 200) ||
                       (selectedFilters.size === 'large' && target.employees > 200);
    
    return matchesSearch && matchesIndustry && matchesSize;
  });

  const sortedTargets = [...filteredTargets].sort((a, b) => {
    switch (sortBy) {
      case 'match':
        return b.matchScore - a.matchScore;
      case 'revenue':
        return b.financials.revenue - a.financials.revenue;
      case 'growth':
        return b.financials.growth - a.financials.growth;
      case 'valuation':
        return parseInt(b.valuation.replace('$', '').replace('M', '')) - parseInt(a.valuation.replace('$', '').replace('M', ''));
      default:
        return b.matchScore - a.matchScore;
    }
  });

  const toggleFavorite = (targetId) => {
    setFavorites(prev => 
      prev.includes(targetId) 
        ? prev.filter(id => id !== targetId)
        : [...prev, targetId]
    );
  };

  const renderTargetCard = (target) => (
    <motion.div
      key={target.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all cursor-pointer"
      onClick={() => {
        setSelectedTarget(target);
        setShowTargetModal(true);
      }}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{target.name}</h3>
          <p className="text-sm text-gray-600">{target.industry}</p>
        </div>
        <div className="flex items-center space-x-2">
          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(target.id);
            }}
            className={`p-1 rounded-full transition-colors ${
              favorites.includes(target.id) ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Heart size={16} className={favorites.includes(target.id) ? 'fill-current' : ''} />
          </motion.button>
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

      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{target.description}</p>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-xs text-gray-500">Revenue</p>
          <p className="text-sm font-semibold">{target.revenue}</p>
          <p className="text-xs text-green-600">{target.revenueGrowth}</p>
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
        <div className="flex items-center space-x-2">
          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              // Add to pipeline
            }}
            className="p-1 text-blue-600 hover:text-blue-700"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Plus size={16} />
          </motion.button>
          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              // Contact target
            }}
            className="p-1 text-green-600 hover:text-green-700"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <MessageSquare size={16} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );

  const renderTargetModal = () => (
    <AnimatePresence>
      {showTargetModal && selectedTarget && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowTargetModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedTarget.name}</h2>
                  <p className="text-gray-600">{selectedTarget.industry} • {selectedTarget.stage}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <motion.button
                    onClick={() => toggleFavorite(selectedTarget.id)}
                    className={`p-2 rounded-lg transition-colors ${
                      favorites.includes(selectedTarget.id) ? 'text-red-500 bg-red-50' : 'text-gray-400 hover:text-red-500'
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Heart size={20} className={favorites.includes(selectedTarget.id) ? 'fill-current' : ''} />
                  </motion.button>
                  <motion.button
                    onClick={() => setShowTargetModal(false)}
                    className="p-2 text-gray-400 hover:text-gray-600 rounded-lg transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X size={20} />
                  </motion.button>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Overview */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Overview</h3>
                <p className="text-gray-700">{selectedTarget.description}</p>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-900 mb-2">Financial Metrics</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Revenue:</span>
                      <span className="font-medium">{selectedTarget.revenue}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Growth:</span>
                      <span className="font-medium text-green-600">{selectedTarget.revenueGrowth}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Valuation:</span>
                      <span className="font-medium">{selectedTarget.valuation}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-900 mb-2">Business Metrics</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Customers:</span>
                      <span className="font-medium">{selectedTarget.metrics.customers}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>MRR:</span>
                      <span className="font-medium">${(selectedTarget.metrics.mrr / 1000).toFixed(0)}k</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Net Retention:</span>
                      <span className="font-medium">{selectedTarget.metrics.netRetention}%</span>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-50 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-900 mb-2">Deal Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Timeline:</span>
                      <span className="font-medium">{selectedTarget.timeline}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Deal Size:</span>
                      <span className="font-medium">{selectedTarget.dealSize}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Match Score:</span>
                      <span className="font-medium">{selectedTarget.matchScore}%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Users size={16} className="text-gray-400" />
                      <span className="text-sm">{selectedTarget.contact.ceo}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail size={16} className="text-gray-400" />
                      <span className="text-sm">{selectedTarget.contact.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone size={16} className="text-gray-400" />
                      <span className="text-sm">{selectedTarget.contact.phone}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <MapPin size={16} className="text-gray-400" />
                      <span className="text-sm">{selectedTarget.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Building size={16} className="text-gray-400" />
                      <span className="text-sm">{selectedTarget.employees} employees</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar size={16} className="text-gray-400" />
                      <span className="text-sm">{selectedTarget.stage}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Risks & Opportunities */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Risks</h3>
                  <div className="space-y-2">
                    {selectedTarget.risks.map((risk, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <AlertCircle size={16} className="text-red-500" />
                        <span className="text-sm text-gray-700">{risk}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Opportunities</h3>
                  <div className="space-y-2">
                    {selectedTarget.opportunities.map((opportunity, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <CheckCircle size={16} className="text-green-500" />
                        <span className="text-sm text-gray-700">{opportunity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                <div className="flex items-center space-x-3">
                  <motion.button
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <MessageSquare size={16} />
                    <span>Contact Target</span>
                  </motion.button>
                  <motion.button
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Plus size={16} />
                    <span>Add to Pipeline</span>
                  </motion.button>
                </div>
                <div className="flex items-center space-x-2">
                  <motion.button
                    className="p-2 text-gray-400 hover:text-gray-600 rounded-lg transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Download size={16} />
                  </motion.button>
                  <motion.button
                    className="p-2 text-gray-400 hover:text-gray-600 rounded-lg transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Share2 size={16} />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
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
              {industries.map(industry => (
                <option key={industry} value={industry.toLowerCase()}>{industry}</option>
              ))}
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
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="match">Sort by Match</option>
              <option value="revenue">Sort by Revenue</option>
              <option value="growth">Sort by Growth</option>
              <option value="valuation">Sort by Valuation</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <p className="text-gray-600">
          Showing {sortedTargets.length} of {targets.length} targets
        </p>
        <div className="flex items-center space-x-2">
          <motion.button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-400'}`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Grid size={18} />
          </motion.button>
          <motion.button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-400'}`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <List size={18} />
          </motion.button>
        </div>
      </div>

      {/* Targets Grid */}
      <div className={`grid gap-6 ${
        viewMode === 'grid' 
          ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' 
          : 'grid-cols-1'
      }`}>
        {sortedTargets.map(renderTargetCard)}
      </div>

      {/* Target Detail Modal */}
      {renderTargetModal()}
    </div>
  );
};

export default TargetDiscovery; 