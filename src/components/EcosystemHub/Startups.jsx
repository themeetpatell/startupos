import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Rocket, 
  Users, 
  DollarSign, 
  TrendingUp, 
  Star, 
  Eye, 
  MessageSquare, 
  Heart,
  MapPin,
  Calendar,
  Award,
  Target,
  Zap,
  Globe,
  Building,
  CheckCircle,
  Clock,
  AlertCircle,
  XCircle,
  Plus,
  Search,
  Filter,
  ArrowRight,
  ExternalLink,
  Download,
  Share2,
  Grid,
  List,
  Mail
} from 'lucide-react';

const Startups = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStage, setSelectedStage] = useState('all');
  const [selectedIndustry, setSelectedIndustry] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedStartup, setSelectedStartup] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const startups = [
    {
      id: 1,
      name: 'TechFlow AI',
              tagline: 'Revolutionizing enterprise automation with AI',
      stage: 'Series A',
      industry: 'SaaS',
      location: 'San Francisco, CA',
      founded: '2022',
      teamSize: 45,
      funding: '$12.5M',
      valuation: '$85M',
      growth: '+320%',
      customers: 250,
      revenue: '$2.8M ARR',
      logo: '🤖',
      status: 'Growing',
              description: 'AI-powered enterprise automation platform that helps businesses streamline operations and increase productivity.',
      highlights: [
        'Featured in TechCrunch',
        'Y Combinator Alumni',
        '500+ enterprise customers',
        '95% customer retention'
      ],
      team: [
        { name: 'Sarah Chen', role: 'CEO', experience: 'Ex-Google, Ex-Stripe' },
        { name: 'Mike Rodriguez', role: 'CTO', experience: 'Ex-Uber, Stanford CS' },
        { name: 'Lisa Park', role: 'CPO', experience: 'Ex-Facebook, Harvard MBA' }
      ],
      investors: ['Sequoia Capital', 'Andreessen Horowitz', 'First Round'],
      metrics: {
        mrr: '$230K',
        growth: '320%',
        churn: '2.1%',
        ltv: '$45K'
      },
      contact: {
        email: 'hello@techflow.ai',
        website: 'techflow.ai',
        linkedin: 'linkedin.com/company/techflow-ai'
      }
    },
    {
      id: 2,
      name: 'GreenEnergy Solutions',
      tagline: 'Sustainable energy for tomorrow',
      stage: 'Series B',
      industry: 'CleanTech',
      location: 'Austin, TX',
      founded: '2021',
      teamSize: 78,
      funding: '$28M',
      valuation: '$180M',
      growth: '+180%',
      customers: 120,
      revenue: '$5.2M ARR',
      logo: '🌱',
      status: 'Scaling',
      description: 'Innovative clean energy solutions for commercial and residential applications.',
      highlights: [
        'EPA Innovation Award',
        '500MW capacity installed',
        'Partnership with Tesla',
        'Carbon neutral operations'
      ],
      team: [
        { name: 'David Kim', role: 'CEO', experience: 'Ex-SolarCity, MIT Engineering' },
        { name: 'Emma Wilson', role: 'CTO', experience: 'Ex-Tesla, Stanford PhD' },
        { name: 'James Lee', role: 'COO', experience: 'Ex-GE, Harvard MBA' }
      ],
      investors: ['Kleiner Perkins', 'Breakthrough Energy', 'Union Square'],
      metrics: {
        mrr: '$430K',
        growth: '180%',
        churn: '1.8%',
        ltv: '$85K'
      },
      contact: {
        email: 'contact@greenenergy.com',
        website: 'greenenergy.com',
        linkedin: 'linkedin.com/company/greenenergy-solutions'
      }
    },
    {
      id: 3,
      name: 'HealthTech Pro',
      tagline: 'Digital health for everyone',
      stage: 'Seed',
      industry: 'HealthTech',
      location: 'Boston, MA',
      founded: '2023',
      teamSize: 23,
      funding: '$3.2M',
      valuation: '$18M',
      growth: '+450%',
      customers: 85,
      revenue: '$680K ARR',
      logo: '🏥',
      status: 'Growing',
      description: 'AI-powered health monitoring and telemedicine platform.',
      highlights: [
        'FDA approved',
        'HIPAA compliant',
        '50K+ active users',
        '95% accuracy rate'
      ],
      team: [
        { name: 'Dr. Maria Garcia', role: 'CEO', experience: 'Ex-Mayo Clinic, Harvard Med' },
        { name: 'Alex Thompson', role: 'CTO', experience: 'Ex-Google Health, MIT' },
        { name: 'Rachel Chen', role: 'CPO', experience: 'Ex-Zocdoc, Stanford' }
      ],
      investors: ['Rock Health', 'Andreessen Horowitz', 'Y Combinator'],
      metrics: {
        mrr: '$57K',
        growth: '450%',
        churn: '3.2%',
        ltv: '$2.5K'
      },
      contact: {
        email: 'hello@healthtechpro.com',
        website: 'healthtechpro.com',
        linkedin: 'linkedin.com/company/healthtech-pro'
      }
    },
    {
      id: 4,
      name: 'FinFlow',
      tagline: 'Next-generation fintech platform',
      stage: 'Series C',
      industry: 'FinTech',
      location: 'New York, NY',
      founded: '2020',
      teamSize: 156,
      funding: '$45M',
      valuation: '$320M',
      growth: '+210%',
      customers: 450,
      revenue: '$12.8M ARR',
      logo: '💳',
      status: 'Scaling',
      description: 'Comprehensive financial services platform for small businesses.',
      highlights: [
        'SOC 2 Type II certified',
        '$2B+ processed',
        'Partnership with Chase',
        '99.9% uptime'
      ],
      team: [
        { name: 'Jennifer Wong', role: 'CEO', experience: 'Ex-Stripe, Ex-PayPal' },
        { name: 'Marcus Johnson', role: 'CTO', experience: 'Ex-Square, Berkeley CS' },
        { name: 'Sophie Lee', role: 'CFO', experience: 'Ex-Goldman Sachs, Wharton' }
      ],
      investors: ['Stripe', 'Tiger Global', 'Sequoia Capital'],
      metrics: {
        mrr: '$1.07M',
        growth: '210%',
        churn: '1.5%',
        ltv: '$28K'
      },
      contact: {
        email: 'partnerships@finflow.com',
        website: 'finflow.com',
        linkedin: 'linkedin.com/company/finflow'
      }
    }
  ];

  const stages = ['all', 'Pre-Seed', 'Seed', 'Series A', 'Series B', 'Series C', 'Series D+'];
  const industries = ['all', 'SaaS', 'FinTech', 'HealthTech', 'CleanTech', 'AI/ML', 'E-commerce', 'EdTech'];
  const locations = ['all', 'San Francisco, CA', 'New York, NY', 'Austin, TX', 'Boston, MA', 'Seattle, WA'];

  const filteredStartups = startups.filter(startup => {
    const matchesSearch = startup.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         startup.tagline.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStage = selectedStage === 'all' || startup.stage === selectedStage;
    const matchesIndustry = selectedIndustry === 'all' || startup.industry === selectedIndustry;
    const matchesLocation = selectedLocation === 'all' || startup.location === selectedLocation;
    
    return matchesSearch && matchesStage && matchesIndustry && matchesLocation;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Growing': return 'text-green-600 bg-green-50 border-green-200';
      case 'Scaling': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'Launching': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const renderStartupCard = (startup) => (
    <motion.div
      key={startup.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover-lift cursor-pointer"
      onClick={() => {
        setSelectedStartup(startup);
        setShowDetailModal(true);
      }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-xl">
            {startup.logo}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{startup.name}</h3>
            <p className="text-sm text-gray-600">{startup.tagline}</p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(startup.status)}`}>
          {startup.status}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-xs text-gray-500">Stage</p>
          <p className="text-sm font-medium text-gray-900">{startup.stage}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Industry</p>
          <p className="text-sm font-medium text-gray-900">{startup.industry}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Team Size</p>
          <p className="text-sm font-medium text-gray-900">{startup.teamSize}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Funding</p>
          <p className="text-sm font-medium text-gray-900">{startup.funding}</p>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <MapPin size={14} className="text-gray-400" />
          <span className="text-sm text-gray-600">{startup.location}</span>
        </div>
        <div className="flex items-center space-x-2">
          <TrendingUp size={14} className="text-green-500" />
          <span className="text-sm font-medium text-green-600">{startup.growth}</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <motion.button
            className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation();
              // Handle view action
            }}
          >
            <Eye size={16} />
          </motion.button>
          <motion.button
            className="p-2 text-gray-400 hover:text-green-600 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation();
              // Handle connect action
            }}
          >
            <MessageSquare size={16} />
          </motion.button>
        </div>
        <motion.button
          className="p-2 text-gray-400 hover:text-red-500 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={(e) => {
            e.stopPropagation();
            // Handle favorite action
          }}
        >
          <Heart size={16} />
        </motion.button>
      </div>
    </motion.div>
  );

  const renderDetailModal = () => (
    <AnimatePresence>
      {showDetailModal && selectedStartup && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowDetailModal(false)}
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
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-2xl">
                    {selectedStartup.logo}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedStartup.name}</h2>
                    <p className="text-gray-600">{selectedStartup.tagline}</p>
                  </div>
                </div>
                <motion.button
                  onClick={() => setShowDetailModal(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-lg transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <XCircle size={24} />
                </motion.button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Key Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900">{selectedStartup.funding}</div>
                  <div className="text-sm text-gray-600">Total Funding</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900">{selectedStartup.valuation}</div>
                  <div className="text-sm text-gray-600">Valuation</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900">{selectedStartup.customers}</div>
                  <div className="text-sm text-gray-600">Customers</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900">{selectedStartup.revenue}</div>
                  <div className="text-sm text-gray-600">Revenue</div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">About</h3>
                <p className="text-gray-600">{selectedStartup.description}</p>
              </div>

              {/* Highlights */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Highlights</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {selectedStartup.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle size={16} className="text-green-500" />
                      <span className="text-sm text-gray-600">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Team */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Leadership Team</h3>
                <div className="space-y-3">
                  {selectedStartup.team.map((member, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium text-gray-900">{member.name}</div>
                        <div className="text-sm text-gray-600">{member.role}</div>
                      </div>
                      <div className="text-sm text-gray-500">{member.experience}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Investors */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Investors</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedStartup.investors.map((investor, index) => (
                    <span key={index} className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm">
                      {investor}
                    </span>
                  ))}
                </div>
              </div>

              {/* Contact */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Contact</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-2">
                    <Mail size={16} className="text-gray-400" />
                    <span className="text-sm text-gray-600">{selectedStartup.contact.email}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Globe size={16} className="text-gray-400" />
                    <span className="text-sm text-gray-600">{selectedStartup.contact.website}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <ExternalLink size={16} className="text-gray-400" />
                    <span className="text-sm text-gray-600">LinkedIn</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                <div className="flex space-x-3">
                  <motion.button
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Download size={16} className="mr-2" />
                    Download Profile
                  </motion.button>
                  <motion.button
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Share2 size={16} className="mr-2" />
                    Share
                  </motion.button>
                </div>
                <motion.button
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <MessageSquare size={16} className="mr-2" />
                  Connect
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
            <div className="relative">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search startups..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full md:w-64"
              />
            </div>
            
            <select
              value={selectedStage}
              onChange={(e) => setSelectedStage(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {stages.map(stage => (
                <option key={stage} value={stage}>
                  {stage === 'all' ? 'All Stages' : stage}
                </option>
              ))}
            </select>

            <select
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {industries.map(industry => (
                <option key={industry} value={industry}>
                  {industry === 'all' ? 'All Industries' : industry}
                </option>
              ))}
            </select>

            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {locations.map(location => (
                <option key={location} value={location}>
                  {location === 'all' ? 'All Locations' : location}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">{filteredStartups.length} results</span>
            <div className="flex border border-gray-300 rounded-lg">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'bg-blue-50 text-blue-600' : 'text-gray-600'}`}
              >
                <Grid size={16} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'bg-blue-50 text-blue-600' : 'text-gray-600'}`}
              >
                <List size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
        {filteredStartups.map(startup => renderStartupCard(startup))}
      </div>

      {/* Detail Modal */}
      {renderDetailModal()}
    </div>
  );
};

export default Startups; 