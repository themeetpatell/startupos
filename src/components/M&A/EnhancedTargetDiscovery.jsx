import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Filter, MapPin, TrendingUp, Star, Eye, Bookmark, 
  Heart, MessageSquare, Phone, Mail, Globe, Linkedin, Twitter,
  Building, DollarSign, Users, Calendar, Award, Shield, Zap,
  ChevronDown, X, Target, BarChart3, CheckCircle, AlertCircle,
  ExternalLink, Download, Share, MoreVertical, Clock, Activity
} from 'lucide-react';

const EnhancedTargetDiscovery = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    industry: 'all',
    geography: 'all',
    valuation: 'all',
    growth: 'all',
    strategicFit: 'all',
    stage: 'all'
  });
  const [sortBy, setSortBy] = useState('strategicFit');
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedTarget, setSelectedTarget] = useState(null);
  const [pipeline, setPipeline] = useState([]);
  const [savedTargets, setSavedTargets] = useState([]);

  // Enhanced startup data with more comprehensive information
  const startups = [
    {
      id: 1,
      name: 'TechFlow Solutions',
      logo: 'https://ui-avatars.com/api/?name=TechFlow&background=6366f1&color=fff',
      sector: 'AI/ML',
      revenue: '$12.5M',
      valuation: '$45M',
      growth: '+340%',
      location: 'San Francisco, CA',
      founded: '2022',
      employees: '28',
      tags: ['AI', 'Automation', 'B2B', 'SaaS'],
      status: 'Active',
      contacted: false,
      qualified: false,
      investorBacked: true,
      strategicFit: 92,
      description: 'AI-powered workflow automation platform for enterprise customers. Strong growth trajectory with 500+ enterprise clients.',
      metrics: {
        revenue: '$12.5M ARR',
        growth: '+340% YoY',
        customers: '500+',
        team: '28',
        funding: '$15M raised'
      },
      investors: ['Sequoia Capital', 'Andreessen Horowitz', 'Y Combinator'],
      highlights: [
        'Featured in TechCrunch',
        'Y Combinator W22',
        '500+ Enterprise Customers',
        'Patent-pending technology'
      ],
      contact: {
        email: 'contact@techflow.ai',
        phone: '+1 (555) 123-4567',
        website: 'https://techflow.ai',
        linkedin: 'https://linkedin.com/company/techflow-ai'
      }
    },
    {
      id: 2,
      name: 'DataViz Analytics',
      logo: 'https://ui-avatars.com/api/?name=DataViz&background=10b981&color=fff',
      sector: 'Data & Analytics',
      revenue: '$8.2M',
      valuation: '$32M',
      growth: '+180%',
      location: 'New York, NY',
      founded: '2021',
      employees: '45',
      tags: ['Data', 'Analytics', 'B2B', 'Visualization'],
      status: 'Contacted',
      contacted: true,
      qualified: false,
      investorBacked: true,
      strategicFit: 78,
      description: 'Advanced data visualization and analytics platform for mid-market companies. Strong customer retention and growth.',
      metrics: {
        revenue: '$8.2M ARR',
        growth: '+180% YoY',
        customers: '200+',
        team: '45',
        funding: '$8M raised'
      },
      investors: ['Kleiner Perkins', 'General Catalyst'],
      highlights: [
        'Forbes Cloud 100',
        'Strong customer retention',
        'Patent portfolio',
        'Enterprise security certified'
      ],
      contact: {
        email: 'hello@dataviz.com',
        phone: '+1 (555) 987-6543',
        website: 'https://dataviz.com',
        linkedin: 'https://linkedin.com/company/dataviz-analytics'
      }
    },
    {
      id: 3,
      name: 'GreenTech Innovations',
      logo: 'https://ui-avatars.com/api/?name=GreenTech&background=059669&color=fff',
      sector: 'CleanTech',
      revenue: '$3.8M',
      valuation: '$18M',
      growth: '+120%',
      location: 'Austin, TX',
      founded: '2023',
      employees: '22',
      tags: ['CleanTech', 'Energy', 'Sustainability', 'Hardware'],
      status: 'Qualified',
      contacted: true,
      qualified: true,
      investorBacked: false,
      strategicFit: 65,
      description: 'Next-generation solar panel technology with improved efficiency and lower costs. Early stage but promising technology.',
      metrics: {
        revenue: '$3.8M ARR',
        growth: '+120% YoY',
        customers: '50+',
        team: '22',
        funding: '$5M raised'
      },
      investors: ['Breakthrough Energy', 'CleanTech Ventures'],
      highlights: [
        'Breakthrough Energy Fellowship',
        'Patent-pending technology',
        'Pilot with Tesla',
        'Climate tech award winner'
      ],
      contact: {
        email: 'info@greentech.io',
        phone: '+1 (555) 456-7890',
        website: 'https://greentech.io',
        linkedin: 'https://linkedin.com/company/greentech-innovations'
      }
    },
    {
      id: 4,
      name: 'HealthTech Pro',
      logo: 'https://ui-avatars.com/api/?name=HealthTech&background=dc2626&color=fff',
      sector: 'HealthTech',
      revenue: '$15.2M',
      valuation: '$68M',
      growth: '+280%',
      location: 'Boston, MA',
      founded: '2020',
      employees: '65',
      tags: ['HealthTech', 'AI', 'B2B', 'Healthcare'],
      status: 'Active',
      contacted: false,
      qualified: false,
      investorBacked: true,
      strategicFit: 85,
      description: 'AI-powered diagnostic tools for healthcare providers. Strong regulatory compliance and growing market presence.',
      metrics: {
        revenue: '$15.2M ARR',
        growth: '+280% YoY',
        customers: '300+',
        team: '65',
        funding: '$25M raised'
      },
      investors: ['GV (Google Ventures)', 'Andreessen Horowitz', 'Sequoia Capital'],
      highlights: [
        'FDA approved technology',
        'HIPAA compliant',
        '300+ healthcare providers',
        'AI breakthrough award'
      ],
      contact: {
        email: 'contact@healthtechpro.com',
        phone: '+1 (555) 234-5678',
        website: 'https://healthtechpro.com',
        linkedin: 'https://linkedin.com/company/healthtech-pro'
      }
    },
    {
      id: 5,
      name: 'FinTech Solutions',
      logo: 'https://ui-avatars.com/api/?name=FinTech&background=7c3aed&color=fff',
      sector: 'FinTech',
      revenue: '$22.1M',
      valuation: '$95M',
      growth: '+420%',
      location: 'San Francisco, CA',
      founded: '2019',
      employees: '89',
      tags: ['FinTech', 'Payments', 'B2B', 'Banking'],
      status: 'Contacted',
      contacted: true,
      qualified: true,
      investorBacked: true,
      strategicFit: 88,
      description: 'Enterprise payment processing platform with advanced fraud detection and compliance features.',
      metrics: {
        revenue: '$22.1M ARR',
        growth: '+420% YoY',
        customers: '800+',
        team: '89',
        funding: '$40M raised'
      },
      investors: ['Stripe', 'Square', 'PayPal Ventures'],
      highlights: [
        'PCI DSS compliant',
        '800+ enterprise clients',
        '99.9% uptime',
        'Industry security leader'
      ],
      contact: {
        email: 'hello@fintechsolutions.com',
        phone: '+1 (555) 345-6789',
        website: 'https://fintechsolutions.com',
        linkedin: 'https://linkedin.com/company/fintech-solutions'
      }
    }
  ];

  const filteredStartups = useMemo(() => {
    let filtered = startups;

    // Search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(startup =>
        startup.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        startup.sector.toLowerCase().includes(searchQuery.toLowerCase()) ||
        startup.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
        startup.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Other filters
    if (filters.industry !== 'all') {
      filtered = filtered.filter(startup => startup.sector === filters.industry);
    }
    if (filters.geography !== 'all') {
      filtered = filtered.filter(startup => startup.location.includes(filters.geography));
    }
    if (filters.valuation !== 'all') {
      const valuation = parseFloat(startup.valuation.replace('$', '').replace('M', ''));
      if (filters.valuation === 'under-25m') filtered = filtered.filter(startup => valuation < 25);
      if (filters.valuation === '25m-50m') filtered = filtered.filter(startup => valuation >= 25 && valuation < 50);
      if (filters.valuation === '50m-100m') filtered = filtered.filter(startup => valuation >= 50 && valuation < 100);
      if (filters.valuation === 'over-100m') filtered = filtered.filter(startup => valuation >= 100);
    }
    if (filters.growth !== 'all') {
      const growth = parseFloat(startup.growth.replace('+', '').replace('%', ''));
      if (filters.growth === 'under-100') filtered = filtered.filter(startup => growth < 100);
      if (filters.growth === '100-200') filtered = filtered.filter(startup => growth >= 100 && growth < 200);
      if (filters.growth === '200-300') filtered = filtered.filter(startup => growth >= 200 && growth < 300);
      if (filters.growth === 'over-300') filtered = filtered.filter(startup => growth >= 300);
    }
    if (filters.strategicFit !== 'all') {
      if (filters.strategicFit === 'high') filtered = filtered.filter(startup => startup.strategicFit >= 80);
      if (filters.strategicFit === 'medium') filtered = filtered.filter(startup => startup.strategicFit >= 60 && startup.strategicFit < 80);
      if (filters.strategicFit === 'low') filtered = filtered.filter(startup => startup.strategicFit < 60);
    }

    // Sort
    switch (sortBy) {
      case 'strategicFit':
        filtered.sort((a, b) => b.strategicFit - a.strategicFit);
        break;
      case 'valuation':
        filtered.sort((a, b) => parseFloat(b.valuation.replace('$', '').replace('M', '')) - parseFloat(a.valuation.replace('$', '').replace('M', '')));
        break;
      case 'growth':
        filtered.sort((a, b) => parseFloat(b.growth.replace('+', '').replace('%', '')) - parseFloat(a.growth.replace('+', '').replace('%', '')));
        break;
      case 'revenue':
        filtered.sort((a, b) => parseFloat(b.revenue.replace('$', '').replace('M', '')) - parseFloat(a.revenue.replace('$', '').replace('M', '')));
        break;
      default:
        break;
    }

    return filtered;
  }, [searchQuery, filters, sortBy]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800 border-green-200';
      case 'Contacted': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Qualified': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStrategicFitColor = (score) => {
    if (score >= 80) return 'text-green-600 bg-green-50';
    if (score >= 60) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const handleViewProfile = (startup, e) => {
    e.stopPropagation();
    setSelectedTarget(startup);
  };

  const handleAddToPipeline = (startup, e) => {
    e.stopPropagation();
    if (!pipeline.find(item => item.id === startup.id)) {
      setPipeline(prev => [...prev, { ...startup, addedAt: new Date().toISOString() }]);
      // Show success notification
      console.log(`Added ${startup.name} to pipeline`);
    }
  };

  const handleSave = (startup, e) => {
    e.stopPropagation();
    if (!savedTargets.find(item => item.id === startup.id)) {
      setSavedTargets(prev => [...prev, { ...startup, savedAt: new Date().toISOString() }]);
      // Show success notification
      console.log(`Saved ${startup.name}`);
    }
  };

  const handleScheduleMeeting = (startup, e) => {
    e.stopPropagation();
    // Show meeting scheduling modal or redirect to calendar
    console.log(`Scheduling meeting with ${startup.name}`);
    // This could open a calendar booking modal or redirect to a scheduling page
  };

  const renderStartupCard = (startup) => (
    <motion.div
      key={startup.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, shadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}
      className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 cursor-pointer group"
      onClick={() => setSelectedTarget(startup)}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <img
            src={startup.logo}
            alt={startup.name}
            className="w-12 h-12 rounded-lg object-cover"
          />
          <div>
            <h3 className="text-lg font-bold text-gray-900">{startup.name}</h3>
            <p className="text-sm text-gray-600">{startup.sector}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(startup.status)}`}>
            {startup.status}
          </span>
          {startup.investorBacked && (
            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
              <Award className="w-3 h-3 text-blue-600" />
            </div>
          )}
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <div className="text-2xl font-bold text-gray-900">{startup.revenue}</div>
          <div className="text-sm text-gray-600">Revenue</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-gray-900">{startup.valuation}</div>
          <div className="text-sm text-gray-600">Valuation</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-green-600">{startup.growth}</div>
          <div className="text-sm text-gray-600">Growth</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-blue-600">{startup.employees}</div>
          <div className="text-sm text-gray-600">Employees</div>
        </div>
      </div>

      {/* Strategic Fit Score */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Strategic Fit</span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStrategicFitColor(startup.strategicFit)}`}>
            {startup.strategicFit}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full ${
              startup.strategicFit >= 80 ? 'bg-green-500' :
              startup.strategicFit >= 60 ? 'bg-yellow-500' : 'bg-red-500'
            }`}
            style={{ width: `${startup.strategicFit}%` }}
          ></div>
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {startup.tags.slice(0, 3).map((tag, index) => (
          <span
            key={index}
            className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
          >
            {tag}
          </span>
        ))}
        {startup.tags.length > 3 && (
          <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
            +{startup.tags.length - 3}
          </span>
        )}
      </div>

      {/* Location and Founded */}
      <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
        <div className="flex items-center space-x-1">
          <MapPin size={14} />
          <span>{startup.location}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Calendar size={14} />
          <span>Founded {startup.founded}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center space-x-2">
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={(e) => handleViewProfile(startup, e)}
          className="flex-1 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
        >
          View Profile
        </motion.button>
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={(e) => handleAddToPipeline(startup, e)}
          disabled={pipeline.find(item => item.id === startup.id)}
          className={`px-4 py-2 text-sm rounded-lg transition-colors flex items-center space-x-2 ${
            pipeline.find(item => item.id === startup.id)
              ? 'bg-green-100 text-green-700 border border-green-200 cursor-not-allowed'
              : 'border border-gray-200 text-gray-700 hover:bg-gray-50'
          }`}
        >
          <Target size={16} />
          <span>{pipeline.find(item => item.id === startup.id) ? 'In Pipeline' : 'Add to Pipeline'}</span>
        </motion.button>
      </div>
    </motion.div>
  );

  const renderDetailedProfile = (startup) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={() => setSelectedTarget(null)}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-start space-x-6">
              <img
                src={startup.logo}
                alt={startup.name}
                className="w-24 h-24 rounded-2xl object-cover"
              />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{startup.name}</h1>
                <p className="text-xl text-gray-600 mt-1">{startup.sector}</p>
                <div className="flex items-center space-x-4 mt-4">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <MapPin size={16} />
                    <span>{startup.location}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Calendar size={16} />
                    <span>Founded {startup.founded}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Users size={16} />
                    <span>{startup.employees} employees</span>
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={() => setSelectedTarget(null)}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
            >
              <X size={24} />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">About</h2>
                <p className="text-gray-600 leading-relaxed">{startup.description}</p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Key Metrics</h2>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(startup.metrics).map(([key, value]) => (
                    <div key={key} className="bg-gray-50 rounded-lg p-4">
                      <div className="text-sm text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1')}</div>
                      <div className="text-lg font-bold text-gray-900">{value}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Highlights</h2>
                <ul className="space-y-2">
                  {startup.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <CheckCircle size={16} className="text-green-500" />
                      <span className="text-gray-600">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Investors</h2>
                <div className="flex flex-wrap gap-2">
                  {startup.investors.map((investor, index) => (
                    <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                      {investor}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-4">Strategic Fit</h3>
                <div className="text-center">
                  <div className="text-4xl font-bold text-gray-900 mb-2">{startup.strategicFit}%</div>
                  <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                    <div
                      className={`h-3 rounded-full ${
                        startup.strategicFit >= 80 ? 'bg-green-500' :
                        startup.strategicFit >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${startup.strategicFit}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600">
                    {startup.strategicFit >= 80 ? 'Excellent strategic fit' :
                     startup.strategicFit >= 60 ? 'Good strategic fit' : 'Consider carefully'}
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-4">Contact</h3>
                <div className="space-y-3">
                  <a href={`mailto:${startup.contact.email}`} className="flex items-center space-x-2 text-blue-600 hover:text-blue-700">
                    <Mail size={16} />
                    <span className="text-sm">{startup.contact.email}</span>
                  </a>
                  <a href={`tel:${startup.contact.phone}`} className="flex items-center space-x-2 text-blue-600 hover:text-blue-700">
                    <Phone size={16} />
                    <span className="text-sm">{startup.contact.phone}</span>
                  </a>
                  <a href={startup.contact.website} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-blue-600 hover:text-blue-700">
                    <Globe size={16} />
                    <span className="text-sm">Website</span>
                  </a>
                  <a href={startup.contact.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-blue-600 hover:text-blue-700">
                    <Linkedin size={16} />
                    <span className="text-sm">LinkedIn</span>
                  </a>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={(e) => handleAddToPipeline(startup, e)}
                    disabled={pipeline.find(item => item.id === startup.id)}
                    className={`w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-lg transition-colors ${
                      pipeline.find(item => item.id === startup.id)
                        ? 'bg-green-600 text-white cursor-not-allowed'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    <Target size={16} />
                    <span>{pipeline.find(item => item.id === startup.id) ? 'In Pipeline' : 'Add to Pipeline'}</span>
                  </motion.button>
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={(e) => handleSave(startup, e)}
                    disabled={savedTargets.find(item => item.id === startup.id)}
                    className={`w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-lg transition-colors ${
                      savedTargets.find(item => item.id === startup.id)
                        ? 'bg-green-600 text-white cursor-not-allowed'
                        : 'bg-purple-600 text-white hover:bg-purple-700'
                    }`}
                  >
                    <Bookmark size={16} />
                    <span>{savedTargets.find(item => item.id === startup.id) ? 'Saved' : 'Save'}</span>
                  </motion.button>
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={(e) => handleScheduleMeeting(startup, e)}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Calendar size={16} />
                    <span>Schedule Meeting</span>
                  </motion.button>
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
      {/* Search and Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search startups by name, sector, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
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
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="strategicFit">Sort by Strategic Fit</option>
              <option value="valuation">Sort by Valuation</option>
              <option value="growth">Sort by Growth</option>
              <option value="revenue">Sort by Revenue</option>
            </select>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <Target size={20} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <Activity size={20} />
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
              <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
                  <select
                    value={filters.industry}
                    onChange={(e) => setFilters(prev => ({ ...prev, industry: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="all">All Industries</option>
                    <option value="AI/ML">AI/ML</option>
                    <option value="Data & Analytics">Data & Analytics</option>
                    <option value="CleanTech">CleanTech</option>
                    <option value="HealthTech">HealthTech</option>
                    <option value="FinTech">FinTech</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Geography</label>
                  <select
                    value={filters.geography}
                    onChange={(e) => setFilters(prev => ({ ...prev, geography: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="all">All Locations</option>
                    <option value="San Francisco">San Francisco</option>
                    <option value="New York">New York</option>
                    <option value="Austin">Austin</option>
                    <option value="Boston">Boston</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Valuation</label>
                  <select
                    value={filters.valuation}
                    onChange={(e) => setFilters(prev => ({ ...prev, valuation: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="all">All Valuations</option>
                    <option value="under-25m">Under $25M</option>
                    <option value="25m-50m">$25M - $50M</option>
                    <option value="50m-100m">$50M - $100M</option>
                    <option value="over-100m">Over $100M</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Growth</label>
                  <select
                    value={filters.growth}
                    onChange={(e) => setFilters(prev => ({ ...prev, growth: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="all">All Growth</option>
                    <option value="under-100">Under 100%</option>
                    <option value="100-200">100% - 200%</option>
                    <option value="200-300">200% - 300%</option>
                    <option value="over-300">Over 300%</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Strategic Fit</label>
                  <select
                    value={filters.strategicFit}
                    onChange={(e) => setFilters(prev => ({ ...prev, strategicFit: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="all">All Scores</option>
                    <option value="high">High (80%+)</option>
                    <option value="medium">Medium (60-79%)</option>
                    <option value="low">Low (Under 60%)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Stage</label>
                  <select
                    value={filters.stage}
                    onChange={(e) => setFilters(prev => ({ ...prev, stage: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="all">All Stages</option>
                    <option value="Active">Active</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Qualified">Qualified</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Results */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-gray-600">
          Showing {filteredStartups.length} startups out of {startups.length}
        </p>
        <div className="flex items-center space-x-2">
          {pipeline.length > 0 && (
            <div className="flex items-center space-x-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
              <Target size={16} />
              <span>{pipeline.length} in Pipeline</span>
            </div>
          )}
          {savedTargets.length > 0 && (
            <div className="flex items-center space-x-2 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
              <Bookmark size={16} />
              <span>{savedTargets.length} Saved</span>
            </div>
          )}
        </div>
      </div>

      {/* Startups Grid */}
      <div className={`grid gap-6 ${
        viewMode === 'grid' 
          ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
          : 'grid-cols-1'
      }`}>
        {filteredStartups.map(renderStartupCard)}
      </div>

      {/* Empty State */}
      {filteredStartups.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search size={32} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No startups found</h3>
          <p className="text-gray-600">Try adjusting your search or filters</p>
        </div>
      )}

      {/* Detailed Profile Modal */}
      <AnimatePresence>
        {selectedTarget && renderDetailedProfile(selectedTarget)}
      </AnimatePresence>
    </div>
  );
};

export default EnhancedTargetDiscovery;
