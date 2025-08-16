import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus,
  Search,
  Filter,
  Calendar,
  DollarSign,
  Users,
  TrendingUp,
  BarChart3,
  FileText,
  MessageSquare,
  Phone,
  Mail,
  Clock,
  CheckCircle,
  AlertCircle,
  Star,
  Eye,
  Edit,
  Trash2,
  Download,
  Share2,
  MoreVertical,
  ArrowRight,
  ArrowLeft,
  Target,
  Building,
  MapPin,
  Activity,
  PieChart,
  LineChart,
  Zap,
  Lock,
  Shield,
  Award,
  X,
  PlusCircle,
  Settings,
  Bell,
  Bookmark,
  Heart
} from 'lucide-react';

const DealPipeline = () => {
  const [activeStage, setActiveStage] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddDeal, setShowAddDeal] = useState(false);
  const [selectedDeal, setSelectedDeal] = useState(null);
  const [showDealModal, setShowDealModal] = useState(false);
  const [sortBy, setSortBy] = useState('date');

  const stages = [
    { id: 'discovery', name: 'Discovery', count: 2847, color: 'blue', description: 'Targets identified' },
    { id: 'contacted', name: 'Contacted', count: 156, color: 'yellow', description: 'Initial outreach' },
    { id: 'qualified', name: 'Qualified', count: 73, color: 'orange', description: 'In pipeline' },
    { id: 'nda', name: 'NDA Signed', count: 45, color: 'purple', description: 'Under NDA' },
    { id: 'duediligence', name: 'Due Diligence', count: 28, color: 'indigo', description: 'DD in progress' },
    { id: 'negotiation', name: 'Negotiation', count: 15, color: 'pink', description: 'Terms discussion' },
    { id: 'closing', name: 'Closing', count: 8, color: 'red', description: 'Final stages' },
    { id: 'closed', name: 'Closed', count: 12, color: 'green', description: 'Successful deals' }
  ];

  const deals = [
    {
      id: 1,
      name: 'TechFlow Solutions',
      stage: 'qualified',
      value: '$25M',
      probability: 75,
      expectedClose: 'Q2 2024',
      lastActivity: '2 days ago',
      nextAction: 'Schedule management meeting',
      assignedTo: 'Sarah Chen',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      industry: 'SaaS',
      revenue: '$12.5M',
      employees: 85,
      location: 'San Francisco, CA',
      contact: {
        name: 'Sarah Johnson',
        title: 'CEO',
        email: 'sarah@techflow.com',
        phone: '+1 (415) 555-0123'
      },
      activities: [
        { date: '2024-01-15', type: 'call', description: 'Initial discovery call', outcome: 'Positive' },
        { date: '2024-01-20', type: 'meeting', description: 'Management presentation', outcome: 'Scheduled' },
        { date: '2024-01-25', type: 'document', description: 'NDA signed', outcome: 'Completed' }
      ],
      documents: ['Financial Model', 'Pitch Deck', 'Customer List', 'Tech Stack'],
      risks: ['High valuation expectations', 'Competition from Microsoft'],
      opportunities: ['Strong product-market fit', 'Growing market'],
      notes: 'Strong interest from both parties. Need to address valuation gap.',
      tags: ['automation', 'enterprise', 'b2b']
    },
    {
      id: 2,
      name: 'DataViz Analytics',
      stage: 'duediligence',
      value: '$18M',
      probability: 85,
      expectedClose: 'Q1 2024',
      lastActivity: '1 day ago',
      nextAction: 'Complete financial DD',
      assignedTo: 'Michael Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      industry: 'Analytics',
      revenue: '$8.2M',
      employees: 45,
      location: 'Austin, TX',
      contact: {
        name: 'Michael Chen',
        title: 'CEO',
        email: 'michael@dataviz.com',
        phone: '+1 (512) 555-0456'
      },
      activities: [
        { date: '2024-01-10', type: 'meeting', description: 'Management presentation', outcome: 'Positive' },
        { date: '2024-01-15', type: 'document', description: 'NDA signed', outcome: 'Completed' },
        { date: '2024-01-20', type: 'meeting', description: 'Due diligence kickoff', outcome: 'In Progress' }
      ],
      documents: ['Financial Model', 'Pitch Deck', 'Customer List', 'Tech Stack'],
      risks: ['Dependency on AWS', 'Limited moat'],
      opportunities: ['AI features', 'Enterprise sales'],
      notes: 'Due diligence progressing well. Financials look solid.',
      tags: ['analytics', 'ai', 'b2b']
    },
    {
      id: 3,
      name: 'CloudSecure',
      stage: 'negotiation',
      value: '$45M',
      probability: 60,
      expectedClose: 'Q2 2024',
      lastActivity: '3 days ago',
      nextAction: 'Finalize term sheet',
      assignedTo: 'David Kim',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      industry: 'Cybersecurity',
      revenue: '$15.8M',
      employees: 120,
      location: 'Boston, MA',
      contact: {
        name: 'David Rodriguez',
        title: 'CEO',
        email: 'david@cloudsecure.com',
        phone: '+1 (617) 555-0789'
      },
      activities: [
        { date: '2024-01-05', type: 'meeting', description: 'Term sheet discussion', outcome: 'In Progress' },
        { date: '2024-01-10', type: 'call', description: 'Valuation discussion', outcome: 'Positive' },
        { date: '2024-01-15', type: 'meeting', description: 'Legal review', outcome: 'Scheduled' }
      ],
      documents: ['Financial Model', 'Pitch Deck', 'Customer List', 'Tech Stack'],
      risks: ['High competition', 'Regulatory changes'],
      opportunities: ['International expansion', 'Product portfolio'],
      notes: 'Valuation gap needs to be addressed. Strong strategic fit.',
      tags: ['security', 'cloud', 'enterprise']
    },
    {
      id: 4,
      name: 'HealthTech Pro',
      stage: 'closing',
      value: '$12M',
      probability: 90,
      expectedClose: 'Q1 2024',
      lastActivity: '5 hours ago',
      nextAction: 'Sign final documents',
      assignedTo: 'Emily Watson',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      industry: 'Healthcare',
      revenue: '$6.8M',
      employees: 65,
      location: 'Nashville, TN',
      contact: {
        name: 'Emily Watson',
        title: 'CEO',
        email: 'emily@healthtechpro.com',
        phone: '+1 (615) 555-0321'
      },
      activities: [
        { date: '2024-01-01', type: 'meeting', description: 'Final terms agreement', outcome: 'Completed' },
        { date: '2024-01-05', type: 'document', description: 'Purchase agreement drafted', outcome: 'Completed' },
        { date: '2024-01-10', type: 'meeting', description: 'Legal review completed', outcome: 'Completed' }
      ],
      documents: ['Financial Model', 'Pitch Deck', 'Customer List', 'Tech Stack'],
      risks: ['Regulatory compliance', 'Long sales cycles'],
      opportunities: ['Telemedicine expansion', 'AI integration'],
      notes: 'Deal is in final stages. All major terms agreed upon.',
      tags: ['healthcare', 'digital', 'compliance']
    }
  ];

  const filteredDeals = deals.filter(deal => {
    const matchesSearch = deal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         deal.industry.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStage = activeStage === 'all' || deal.stage === activeStage;
    return matchesSearch && matchesStage;
  });

  const sortedDeals = [...filteredDeals].sort((a, b) => {
    switch (sortBy) {
      case 'date':
        return new Date(b.lastActivity) - new Date(a.lastActivity);
      case 'value':
        return parseInt(b.value.replace('$', '').replace('M', '')) - parseInt(a.value.replace('$', '').replace('M', ''));
      case 'probability':
        return b.probability - a.probability;
      default:
        return new Date(b.lastActivity) - new Date(a.lastActivity);
    }
  });

  const getStageColor = (stage) => {
    const stageConfig = stages.find(s => s.id === stage);
    return stageConfig ? stageConfig.color : 'gray';
  };

  const getStageName = (stage) => {
    const stageConfig = stages.find(s => s.id === stage);
    return stageConfig ? stageConfig.name : stage;
  };

  const renderDealCard = (deal) => (
    <motion.div
      key={deal.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all cursor-pointer"
      onClick={() => {
        setSelectedDeal(deal);
        setShowDealModal(true);
      }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start space-x-3">
          <img 
            src={deal.avatar} 
            alt={deal.assignedTo}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{deal.name}</h3>
            <p className="text-sm text-gray-600">{deal.industry}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium bg-${getStageColor(deal.stage)}-100 text-${getStageColor(deal.stage)}-800`}>
            {getStageName(deal.stage)}
          </span>
          <div className="flex items-center space-x-1">
            <TrendingUp className="text-green-500" size={16} />
            <span className="text-sm font-medium">{deal.probability}%</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-xs text-gray-500">Deal Value</p>
          <p className="text-sm font-semibold">{deal.value}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Expected Close</p>
          <p className="text-sm font-semibold">{deal.expectedClose}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Revenue</p>
          <p className="text-sm font-semibold">{deal.revenue}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Employees</p>
          <p className="text-sm font-semibold">{deal.employees}</p>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-xs text-gray-500 mb-1">Next Action</p>
        <p className="text-sm text-gray-700">{deal.nextAction}</p>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Clock size={14} />
          <span>{deal.lastActivity}</span>
        </div>
        <div className="flex items-center space-x-2">
          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              // Add activity
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
              // Contact
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

  const renderDealModal = () => (
    <AnimatePresence>
      {showDealModal && selectedDeal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowDealModal(false)}
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
                  <h2 className="text-2xl font-bold text-gray-900">{selectedDeal.name}</h2>
                  <p className="text-gray-600">{selectedDeal.industry} • {getStageName(selectedDeal.stage)}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <motion.button
                    onClick={() => setShowDealModal(false)}
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
              {/* Deal Overview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-900 mb-2">Deal Value</h4>
                  <p className="text-2xl font-bold text-blue-900">{selectedDeal.value}</p>
                  <p className="text-sm text-blue-700">{selectedDeal.probability}% probability</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-900 mb-2">Expected Close</h4>
                  <p className="text-2xl font-bold text-green-900">{selectedDeal.expectedClose}</p>
                  <p className="text-sm text-green-700">Target date</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-900 mb-2">Assigned To</h4>
                  <div className="flex items-center space-x-2">
                    <img 
                      src={selectedDeal.avatar} 
                      alt={selectedDeal.assignedTo}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="font-medium">{selectedDeal.assignedTo}</span>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Contact Information</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Primary Contact</p>
                      <p className="font-medium">{selectedDeal.contact.name}</p>
                      <p className="text-sm text-gray-600">{selectedDeal.contact.title}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Contact Details</p>
                      <p className="text-sm">{selectedDeal.contact.email}</p>
                      <p className="text-sm">{selectedDeal.contact.phone}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Activities Timeline */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Recent Activities</h3>
                <div className="space-y-3">
                  {selectedDeal.activities.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="font-medium">{activity.description}</p>
                          <span className="text-sm text-gray-500">{activity.date}</span>
                        </div>
                        <p className="text-sm text-gray-600">Outcome: {activity.outcome}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Risks & Opportunities */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Risks</h3>
                  <div className="space-y-2">
                    {selectedDeal.risks.map((risk, index) => (
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
                    {selectedDeal.opportunities.map((opportunity, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <CheckCircle size={16} className="text-green-500" />
                        <span className="text-sm text-gray-700">{opportunity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Notes</h3>
                <div className="bg-yellow-50 rounded-lg p-4">
                  <p className="text-gray-700">{selectedDeal.notes}</p>
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
                    <span>Contact</span>
                  </motion.button>
                  <motion.button
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Plus size={16} />
                    <span>Add Activity</span>
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
      {/* Header with Stats */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Deal Pipeline</h2>
            <p className="text-gray-600">Track and manage your M&A deals</p>
          </div>
          <motion.button
            onClick={() => setShowAddDeal(true)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus size={16} />
            <span>Add Deal</span>
          </motion.button>
        </div>

        {/* Pipeline Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {stages.map((stage) => (
            <div key={stage.id} className="text-center">
              <div className={`w-12 h-12 rounded-lg bg-${stage.color}-100 flex items-center justify-center mx-auto mb-2`}>
                <span className={`text-${stage.color}-600 font-bold text-lg`}>{stage.count}</span>
              </div>
              <p className="text-xs font-medium text-gray-900">{stage.name}</p>
              <p className="text-xs text-gray-500">{stage.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search deals by name, industry, or assigned to..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={activeStage}
              onChange={(e) => setActiveStage(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Stages</option>
              {stages.map(stage => (
                <option key={stage.id} value={stage.id}>{stage.name}</option>
              ))}
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="date">Sort by Date</option>
              <option value="value">Sort by Value</option>
              <option value="probability">Sort by Probability</option>
            </select>
          </div>
        </div>
      </div>

      {/* Deals Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {sortedDeals.map(renderDealCard)}
      </div>

      {/* Deal Detail Modal */}
      {renderDealModal()}
    </div>
  );
};

export default DealPipeline; 