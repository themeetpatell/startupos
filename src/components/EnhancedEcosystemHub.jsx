import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Filter, MapPin, Calendar, Users, TrendingUp, 
  Star, MessageCircle, Phone, Mail, Globe, Linkedin,
  Twitter, Github, Building, User, Award, Target,
  DollarSign, Clock, CheckCircle, ArrowRight, Plus,
  Eye, Heart, Share, MoreVertical, ChevronDown,
  Briefcase, GraduationCap, Zap, Shield, Lightbulb,
  X, Crown, Verified, TrendingDown, Activity,
  Bookmark, Send, ExternalLink, UserPlus, Handshake
} from 'lucide-react';

const EnhancedEcosystemHub = () => {
  const [activeTab, setActiveTab] = useState('startups');
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  
  // Tab-specific state
  const [tabStates, setTabStates] = useState({
    startups: {
      searchQuery: '',
      filters: { stage: 'all', industry: 'all', location: 'all', funding: 'all' },
      sort: 'trending',
      showFilters: false
    },
    founders: {
      searchQuery: '',
      filters: { experience: 'all', expertise: 'all', location: 'all', availability: 'all' },
      sort: 'trending',
      showFilters: false
    },
    investors: {
      searchQuery: '',
      filters: { stage: 'all', focus: 'all', location: 'all', checkSize: 'all' },
      sort: 'trending',
      showFilters: false
    },
    cxos: {
      searchQuery: '',
      filters: { role: 'all', expertise: 'all', location: 'all', availability: 'all' },
      sort: 'trending',
      showFilters: false
    },
    employees: {
      searchQuery: '',
      filters: { skills: 'all', experience: 'all', location: 'all', availability: 'all' },
      sort: 'trending',
      showFilters: false
    }
  });

  const tabs = [
    { id: 'startups', label: 'Startups', icon: Building, count: 1247 },
    { id: 'founders', label: 'Founders', icon: User, count: 892 },
    { id: 'investors', label: 'Investors', icon: DollarSign, count: 156 },
    { id: 'cxos', label: 'CXOs', icon: Crown, count: 234 },
    { id: 'employees', label: 'Employees', icon: Users, count: 89 }
  ];

  // Enhanced data with unified structure
  const startups = [
    {
      id: 1,
      type: 'startup',
      name: 'TechFlow AI',
      tagline: 'AI-powered workflow automation for SMBs',
      description: 'We build intelligent automation tools that help businesses streamline their operations and increase productivity by 300%.',
      logo: 'https://ui-avatars.com/api/?name=TechFlow+AI&background=2563EB&color=fff',
      location: 'San Francisco, CA',
      founded: '2022',
      tags: ['AI', 'Automation', 'B2B', 'SaaS'],
      stage: 'Series A',
      industry: 'AI/ML',
      funding: '$12.5M',
      valuation: '$45M',
      employees: '25-50',
      verified: true,
      trending: true,
      metrics: {
        revenue: '$2.1M ARR',
        growth: '+340% YoY',
        customers: '500+',
        team: '28'
      },
      socialProof: {
        customers: ['Microsoft', 'Google', 'Amazon'],
        awards: ['Best AI Startup 2023', 'Innovation Award'],
        press: ['TechCrunch', 'Forbes', 'Wired']
      },
      cta: {
        primary: 'View Profile',
        secondary: 'Follow'
      }
    },
    {
      id: 2,
      type: 'startup',
      name: 'GreenTech Solutions',
      tagline: 'Sustainable energy for the future',
      description: 'Developing next-generation solar panels and energy storage solutions to accelerate the transition to renewable energy.',
      logo: 'https://ui-avatars.com/api/?name=GreenTech&background=2563EB&color=fff',
      location: 'Austin, TX',
      founded: '2023',
      tags: ['CleanTech', 'Energy', 'Sustainability', 'Hardware'],
      stage: 'Seed',
      industry: 'CleanTech',
      funding: '$3.2M',
      valuation: '$15M',
      employees: '10-25',
      verified: false,
      trending: false,
      metrics: {
        revenue: '$450K ARR',
        growth: '+180% YoY',
        customers: '25+',
        team: '18'
      },
      cta: {
        primary: 'View Profile',
        secondary: 'Follow'
      }
    }
  ];

  const founders = [
    {
      id: 1,
      type: 'founder',
      name: 'Sarah Chen',
      tagline: 'Founder @ TechFlow AI',
      description: 'Ex-Google AI researcher with 8+ years in machine learning. Led teams that built products used by 1B+ users.',
      avatar: 'https://ui-avatars.com/api/?name=Sarah+Chen&background=2563EB&color=fff',
      location: 'San Francisco, CA',
      founded: '2022',
      tags: ['AI/ML', 'Product Strategy', 'Team Building'],
      experience: '8 years',
      education: 'Stanford CS, MIT PhD',
      previousCompanies: ['Google', 'OpenAI', 'DeepMind'],
      verified: true,
      trending: true,
      achievements: [
        'Built Google\'s ML infrastructure',
        'Published 15+ research papers',
        'Forbes 30 Under 30'
      ],
      cta: {
        primary: 'View Profile',
        secondary: 'Connect'
      }
    },
    {
      id: 2,
      type: 'founder',
      name: 'Michael Rodriguez',
      tagline: 'Founder @ TechFlow AI',
      description: 'Serial entrepreneur with 3 successful exits. Expert in scaling engineering teams and building enterprise software.',
      avatar: 'https://ui-avatars.com/api/?name=Michael+Rodriguez&background=2563EB&color=fff',
      location: 'San Francisco, CA',
      founded: '2022',
      tags: ['Engineering', 'Scaling', 'Enterprise Sales'],
      experience: '12 years',
      education: 'Berkeley EECS',
      previousCompanies: ['Stripe', 'Twilio', 'Salesforce'],
      verified: true,
      trending: false,
      achievements: [
        '3 successful exits',
        'Built Stripe\'s payments API',
        'Y Combinator Partner'
      ],
      cta: {
        primary: 'View Profile',
        secondary: 'Connect'
      }
    }
  ];

  const investors = [
    {
      id: 1,
      type: 'investor',
      name: 'Jennifer Walsh',
      tagline: 'Partner @ Sequoia Capital',
      description: 'Leading investor in AI and enterprise software. Has invested in 50+ companies with 15+ unicorns.',
      avatar: 'https://ui-avatars.com/api/?name=Jennifer+Walsh&background=2563EB&color=fff',
      location: 'Menlo Park, CA',
      founded: '2010',
      tags: ['AI/ML', 'Enterprise Software', 'SaaS'],
      experience: '15 years',
      education: 'Harvard MBA, Stanford BS',
      focus: ['AI/ML', 'Enterprise Software', 'SaaS'],
      portfolio: ['Stripe', 'Airbnb', 'Zoom', 'Snowflake'],
      checkSize: '$1M - $50M',
      stage: 'Seed to Series B',
      verified: true,
      trending: true,
      cta: {
        primary: 'View Profile',
        secondary: 'Follow'
      }
    },
    {
      id: 2,
      type: 'investor',
      name: 'David Park',
      tagline: 'Managing Partner @ Andreessen Horowitz',
      description: 'Former founder turned investor. Focus on consumer and marketplace businesses. 20+ years in tech.',
      avatar: 'https://ui-avatars.com/api/?name=David+Park&background=2563EB&color=fff',
      location: 'San Francisco, CA',
      founded: '2008',
      tags: ['Consumer', 'Marketplace', 'Mobile'],
      experience: '20 years',
      education: 'Stanford MBA, MIT BS',
      focus: ['Consumer', 'Marketplace', 'Mobile'],
      portfolio: ['Uber', 'Lyft', 'DoorDash', 'Instacart'],
      checkSize: '$5M - $100M',
      stage: 'Series A to Growth',
      verified: true,
      trending: false,
      cta: {
        primary: 'View Profile',
        secondary: 'Follow'
      }
    }
  ];

  const cxos = [
    {
      id: 1,
      type: 'cxo',
      name: 'Dr. Lisa Thompson',
      tagline: 'Fractional CTO, ex-Google',
      description: '20+ years building and scaling engineering teams. Expert in AI/ML, distributed systems, and technical leadership.',
      avatar: 'https://ui-avatars.com/api/?name=Lisa+Thompson&background=2563EB&color=fff',
      location: 'Palo Alto, CA',
      founded: '2005',
      tags: ['Engineering Leadership', 'AI/ML', 'Distributed Systems'],
      experience: '20 years',
      education: 'Stanford PhD, MIT BS',
      expertise: ['Engineering Leadership', 'AI/ML', 'Distributed Systems'],
      previousRoles: ['VP Engineering at Google', 'Principal Engineer at Facebook'],
      availability: 'Open',
      verified: true,
      trending: true,
      achievements: [
        'Built Google\'s search infrastructure',
        'Led 500+ person engineering team',
        'Technical advisor to 20+ startups'
      ],
      cta: {
        primary: 'View Profile',
        secondary: 'Invite to Startup'
      }
    },
    {
      id: 2,
      type: 'cxo',
      name: 'Robert Chen',
      tagline: 'Fractional CMO, ex-Salesforce',
      description: 'Marketing executive with 15+ years experience scaling B2B SaaS companies. Expert in growth marketing and brand building.',
      avatar: 'https://ui-avatars.com/api/?name=Robert+Chen&background=2563EB&color=fff',
      location: 'San Francisco, CA',
      founded: '2008',
      tags: ['Growth Marketing', 'Brand Strategy', 'B2B Sales'],
      experience: '15 years',
      education: 'Wharton MBA, Berkeley BS',
      expertise: ['Growth Marketing', 'Brand Strategy', 'B2B Sales'],
      previousRoles: ['CMO at Salesforce', 'VP Marketing at HubSpot'],
      availability: 'Busy',
      verified: true,
      trending: false,
      achievements: [
        'Scaled Salesforce to $20B+ revenue',
        'Built HubSpot\'s growth engine',
        'Advisor to 30+ startups'
      ],
      cta: {
        primary: 'View Profile',
        secondary: 'Invite to Startup'
      }
    }
  ];

  const employees = [
    {
      id: 1,
      type: 'employee',
      name: 'Alex Kumar',
      tagline: 'Growth Marketer',
      description: 'Expert in growth marketing and user acquisition. 5+ years scaling B2B SaaS companies from 0 to $10M ARR.',
      avatar: 'https://ui-avatars.com/api/?name=Alex+Kumar&background=2563EB&color=fff',
      location: 'San Francisco, CA',
      founded: '2019',
      tags: ['Growth Marketing', 'User Acquisition', 'B2B SaaS'],
      experience: '5 years',
      education: 'Berkeley Marketing',
      currentAffiliation: 'TechFlow AI',
      skills: ['Growth Marketing', 'User Acquisition', 'B2B SaaS'],
      verified: false,
      trending: true,
      cta: {
        primary: 'View Profile',
        secondary: 'Hire/Connect'
      }
    },
    {
      id: 2,
      type: 'employee',
      name: 'Maria Garcia',
      tagline: 'UI/UX Designer',
      description: 'Creative designer specializing in user experience and interface design. Expert in Figma, Adobe Creative Suite.',
      avatar: 'https://ui-avatars.com/api/?name=Maria+Garcia&background=2563EB&color=fff',
      location: 'Austin, TX',
      founded: '2020',
      tags: ['UI/UX Design', 'Figma', 'Adobe Creative Suite'],
      experience: '4 years',
      education: 'Art Center College of Design',
      currentAffiliation: 'GreenTech Solutions',
      skills: ['UI/UX Design', 'Figma', 'Adobe Creative Suite'],
      verified: false,
      trending: false,
      cta: {
        primary: 'View Profile',
        secondary: 'Hire/Connect'
      }
    }
  ];

  const getDataByTab = () => {
    switch (activeTab) {
      case 'startups': return startups;
      case 'founders': return founders;
      case 'investors': return investors;
      case 'cxos': return cxos;
      case 'employees': return employees;
      default: return [];
    }
  };

  const filteredData = useMemo(() => {
    let data = getDataByTab();
    const currentTabState = tabStates[activeTab];
    
    // Search filter
    if (currentTabState.searchQuery.trim()) {
      data = data.filter(item => 
        item.name.toLowerCase().includes(currentTabState.searchQuery.toLowerCase()) ||
        item.tagline?.toLowerCase().includes(currentTabState.searchQuery.toLowerCase()) ||
        item.description?.toLowerCase().includes(currentTabState.searchQuery.toLowerCase()) ||
        item.tags?.some(tag => tag.toLowerCase().includes(currentTabState.searchQuery.toLowerCase()))
      );
    }
    
    // Tab-specific filters
    const filters = currentTabState.filters;
    
    if (activeTab === 'startups') {
      if (filters.stage !== 'all') data = data.filter(item => item.stage === filters.stage);
      if (filters.industry !== 'all') data = data.filter(item => item.industry === filters.industry);
      if (filters.location !== 'all') data = data.filter(item => item.location?.includes(filters.location));
      if (filters.funding !== 'all') {
        data = data.filter(item => {
          const funding = parseFloat(item.funding?.replace('$', '').replace('M', ''));
          if (filters.funding === 'under-1m') return funding < 1;
          if (filters.funding === '1m-10m') return funding >= 1 && funding < 10;
          if (filters.funding === 'over-10m') return funding >= 10;
          return true;
        });
      }
    } else if (activeTab === 'founders') {
      if (filters.experience !== 'all') data = data.filter(item => item.experience === filters.experience);
      if (filters.expertise !== 'all') data = data.filter(item => item.tags?.includes(filters.expertise));
      if (filters.location !== 'all') data = data.filter(item => item.location?.includes(filters.location));
      if (filters.availability !== 'all') data = data.filter(item => item.availability === filters.availability);
    } else if (activeTab === 'investors') {
      if (filters.stage !== 'all') data = data.filter(item => item.stage === filters.stage);
      if (filters.focus !== 'all') data = data.filter(item => item.focus?.includes(filters.focus));
      if (filters.location !== 'all') data = data.filter(item => item.location?.includes(filters.location));
      if (filters.checkSize !== 'all') data = data.filter(item => item.checkSize === filters.checkSize);
    } else if (activeTab === 'cxos') {
      if (filters.role !== 'all') data = data.filter(item => item.tagline?.toLowerCase().includes(filters.role.toLowerCase()));
      if (filters.expertise !== 'all') data = data.filter(item => item.tags?.includes(filters.expertise));
      if (filters.location !== 'all') data = data.filter(item => item.location?.includes(filters.location));
      if (filters.availability !== 'all') data = data.filter(item => item.availability === filters.availability);
    } else if (activeTab === 'employees') {
      if (filters.skills !== 'all') data = data.filter(item => item.tags?.includes(filters.skills));
      if (filters.experience !== 'all') data = data.filter(item => item.experience === filters.experience);
      if (filters.location !== 'all') data = data.filter(item => item.location?.includes(filters.location));
      if (filters.availability !== 'all') data = data.filter(item => item.availability === filters.availability);
    }
    
    // Sort
    switch (currentTabState.sort) {
      case 'trending':
        data = data.sort((a, b) => (b.trending ? 1 : 0) - (a.trending ? 1 : 0));
        break;
      case 'newest':
        data = data.sort((a, b) => new Date(b.founded) - new Date(a.founded));
        break;
      case 'verified':
        data = data.sort((a, b) => (b.verified ? 1 : 0) - (a.verified ? 1 : 0));
        break;
      default:
        break;
    }
    
    return data;
  }, [activeTab, tabStates]);

  const getAvailabilityColor = (availability) => {
    switch (availability) {
      case 'Open': return 'text-white bg-blue-600 border-blue-600';
      case 'Busy': return 'text-black bg-gray-200 border-gray-200';
      case 'Limited': return 'text-blue-600 bg-blue-50 border-blue-600';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const updateTabState = (tabId, updates) => {
    setTabStates(prev => ({
      ...prev,
      [tabId]: { ...prev[tabId], ...updates }
    }));
  };

  const getCurrentTabState = () => tabStates[activeTab];

  const renderTabSpecificFilters = () => {
    const currentState = getCurrentTabState();
    const filters = currentState.filters;

    if (activeTab === 'startups') {
      return (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Stage</label>
            <select
              value={filters.stage}
              onChange={(e) => updateTabState(activeTab, { filters: { ...filters, stage: e.target.value } })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Stages</option>
              <option value="Pre-Seed">Pre-Seed</option>
              <option value="Seed">Seed</option>
              <option value="Series A">Series A</option>
              <option value="Series B">Series B</option>
              <option value="Series C+">Series C+</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
            <select
              value={filters.industry}
              onChange={(e) => updateTabState(activeTab, { filters: { ...filters, industry: e.target.value } })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Industries</option>
              <option value="AI/ML">AI/ML</option>
              <option value="CleanTech">CleanTech</option>
              <option value="Fintech">Fintech</option>
              <option value="HealthTech">HealthTech</option>
              <option value="EdTech">EdTech</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
            <select
              value={filters.location}
              onChange={(e) => updateTabState(activeTab, { filters: { ...filters, location: e.target.value } })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Locations</option>
              <option value="San Francisco">San Francisco</option>
              <option value="New York">New York</option>
              <option value="Austin">Austin</option>
              <option value="Remote">Remote</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Funding</label>
            <select
              value={filters.funding}
              onChange={(e) => updateTabState(activeTab, { filters: { ...filters, funding: e.target.value } })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Funding</option>
              <option value="under-1m">Under $1M</option>
              <option value="1m-10m">$1M - $10M</option>
              <option value="over-10m">Over $10M</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
            <select
              value={currentState.sort}
              onChange={(e) => updateTabState(activeTab, { sort: e.target.value })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="trending">Trending</option>
              <option value="newest">Newest</option>
              <option value="verified">Verified</option>
            </select>
          </div>
        </div>
      );
    } else if (activeTab === 'founders') {
      return (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Experience</label>
            <select
              value={filters.experience}
              onChange={(e) => updateTabState(activeTab, { filters: { ...filters, experience: e.target.value } })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Experience</option>
              <option value="0-2 years">0-2 years</option>
              <option value="3-5 years">3-5 years</option>
              <option value="6-10 years">6-10 years</option>
              <option value="10+ years">10+ years</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Expertise</label>
            <select
              value={filters.expertise}
              onChange={(e) => updateTabState(activeTab, { filters: { ...filters, expertise: e.target.value } })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Expertise</option>
              <option value="AI/ML">AI/ML</option>
              <option value="Product Strategy">Product Strategy</option>
              <option value="Engineering">Engineering</option>
              <option value="Marketing">Marketing</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
            <select
              value={filters.location}
              onChange={(e) => updateTabState(activeTab, { filters: { ...filters, location: e.target.value } })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Locations</option>
              <option value="San Francisco">San Francisco</option>
              <option value="New York">New York</option>
              <option value="Austin">Austin</option>
              <option value="Remote">Remote</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Availability</label>
            <select
              value={filters.availability}
              onChange={(e) => updateTabState(activeTab, { filters: { ...filters, availability: e.target.value } })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Availability</option>
              <option value="Available for mentoring">Available for mentoring</option>
              <option value="Available for advising">Available for advising</option>
              <option value="Limited availability">Limited availability</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
            <select
              value={currentState.sort}
              onChange={(e) => updateTabState(activeTab, { sort: e.target.value })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="trending">Trending</option>
              <option value="newest">Newest</option>
              <option value="verified">Verified</option>
            </select>
          </div>
        </div>
      );
    } else if (activeTab === 'investors') {
      return (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Stage</label>
            <select
              value={filters.stage}
              onChange={(e) => updateTabState(activeTab, { filters: { ...filters, stage: e.target.value } })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Stages</option>
              <option value="Seed to Series B">Seed to Series B</option>
              <option value="Series A to Growth">Series A to Growth</option>
              <option value="Growth">Growth</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Focus</label>
            <select
              value={filters.focus}
              onChange={(e) => updateTabState(activeTab, { filters: { ...filters, focus: e.target.value } })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Focus</option>
              <option value="AI/ML">AI/ML</option>
              <option value="Enterprise Software">Enterprise Software</option>
              <option value="Consumer">Consumer</option>
              <option value="Marketplace">Marketplace</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
            <select
              value={filters.location}
              onChange={(e) => updateTabState(activeTab, { filters: { ...filters, location: e.target.value } })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Locations</option>
              <option value="Menlo Park">Menlo Park</option>
              <option value="San Francisco">San Francisco</option>
              <option value="New York">New York</option>
              <option value="Remote">Remote</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Check Size</label>
            <select
              value={filters.checkSize}
              onChange={(e) => updateTabState(activeTab, { filters: { ...filters, checkSize: e.target.value } })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Check Sizes</option>
              <option value="$1M - $50M">$1M - $50M</option>
              <option value="$5M - $100M">$5M - $100M</option>
              <option value="$100M+">$100M+</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
            <select
              value={currentState.sort}
              onChange={(e) => updateTabState(activeTab, { sort: e.target.value })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="trending">Trending</option>
              <option value="newest">Newest</option>
              <option value="verified">Verified</option>
            </select>
          </div>
        </div>
      );
    } else if (activeTab === 'cxos') {
      return (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
            <select
              value={filters.role}
              onChange={(e) => updateTabState(activeTab, { filters: { ...filters, role: e.target.value } })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Roles</option>
              <option value="CTO">CTO</option>
              <option value="CMO">CMO</option>
              <option value="CFO">CFO</option>
              <option value="COO">COO</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Expertise</label>
            <select
              value={filters.expertise}
              onChange={(e) => updateTabState(activeTab, { filters: { ...filters, expertise: e.target.value } })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Expertise</option>
              <option value="Engineering Leadership">Engineering Leadership</option>
              <option value="Growth Marketing">Growth Marketing</option>
              <option value="Brand Strategy">Brand Strategy</option>
              <option value="B2B Sales">B2B Sales</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
            <select
              value={filters.location}
              onChange={(e) => updateTabState(activeTab, { filters: { ...filters, location: e.target.value } })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Locations</option>
              <option value="Palo Alto">Palo Alto</option>
              <option value="San Francisco">San Francisco</option>
              <option value="New York">New York</option>
              <option value="Remote">Remote</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Availability</label>
            <select
              value={filters.availability}
              onChange={(e) => updateTabState(activeTab, { filters: { ...filters, availability: e.target.value } })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Availability</option>
              <option value="Open">Open</option>
              <option value="Busy">Busy</option>
              <option value="Limited">Limited</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
            <select
              value={currentState.sort}
              onChange={(e) => updateTabState(activeTab, { sort: e.target.value })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="trending">Trending</option>
              <option value="newest">Newest</option>
              <option value="verified">Verified</option>
            </select>
          </div>
        </div>
      );
    } else if (activeTab === 'employees') {
      return (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Skills</label>
            <select
              value={filters.skills}
              onChange={(e) => updateTabState(activeTab, { filters: { ...filters, skills: e.target.value } })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Skills</option>
              <option value="Growth Marketing">Growth Marketing</option>
              <option value="UI/UX Design">UI/UX Design</option>
              <option value="Engineering">Engineering</option>
              <option value="Sales">Sales</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Experience</label>
            <select
              value={filters.experience}
              onChange={(e) => updateTabState(activeTab, { filters: { ...filters, experience: e.target.value } })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Experience</option>
              <option value="0-2 years">0-2 years</option>
              <option value="3-5 years">3-5 years</option>
              <option value="6-10 years">6-10 years</option>
              <option value="10+ years">10+ years</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
            <select
              value={filters.location}
              onChange={(e) => updateTabState(activeTab, { filters: { ...filters, location: e.target.value } })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Locations</option>
              <option value="San Francisco">San Francisco</option>
              <option value="Austin">Austin</option>
              <option value="New York">New York</option>
              <option value="Remote">Remote</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Availability</label>
            <select
              value={filters.availability}
              onChange={(e) => updateTabState(activeTab, { filters: { ...filters, availability: e.target.value } })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Availability</option>
              <option value="Available">Available</option>
              <option value="Busy">Busy</option>
              <option value="Limited">Limited</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
            <select
              value={currentState.sort}
              onChange={(e) => updateTabState(activeTab, { sort: e.target.value })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="trending">Trending</option>
              <option value="newest">Newest</option>
              <option value="verified">Verified</option>
            </select>
          </div>
        </div>
      );
    }
  };

  const renderUnifiedCard = (item) => (
    <motion.div
      key={item.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, shadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}
      className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 cursor-pointer group"
      onClick={() => setSelectedProfile(item)}
    >
      {/* Header with Avatar/Logo and Badges */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <img
              src={item.logo || item.avatar}
              alt={item.name}
              className="w-16 h-16 rounded-xl object-cover"
            />
            {item.verified && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                <Verified className="w-3 h-3 text-white" />
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2">
              <h3 className="text-lg font-bold text-gray-900 truncate">{item.name}</h3>
              {item.trending && (
                <div className="flex items-center space-x-1 text-blue-600">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-xs font-medium">Trending</span>
                </div>
              )}
            </div>
            <p className="text-sm text-gray-600 mt-1 line-clamp-1">{item.tagline}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button className="p-2 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
            <Heart size={16} />
          </button>
          <button className="p-2 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
            <Share size={16} />
          </button>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
        {item.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {item.tags?.slice(0, 3).map((tag, index) => (
          <span
            key={index}
            className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full hover:bg-gray-200 transition-colors"
          >
            {tag}
          </span>
        ))}
        {item.tags?.length > 3 && (
          <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
            +{item.tags.length - 3} more
          </span>
        )}
      </div>

      {/* Location and other info */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4 text-sm text-gray-500">
          {item.location && (
            <div className="flex items-center space-x-1">
              <MapPin size={14} />
              <span>{item.location}</span>
            </div>
          )}
          {item.founded && (
            <div className="flex items-center space-x-1">
              <Calendar size={14} />
              <span>{item.founded}</span>
            </div>
          )}
          {item.experience && (
            <div className="flex items-center space-x-1">
              <Clock size={14} />
              <span>{item.experience}</span>
            </div>
          )}
        </div>
        {item.availability && (
          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getAvailabilityColor(item.availability)}`}>
            {item.availability}
          </span>
        )}
      </div>

      {/* CTA Buttons */}
      <div className="flex items-center space-x-2">
        <button className="flex-1 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors">
          {item.cta.primary}
        </button>
        <button className="px-4 py-2 border border-gray-200 text-gray-700 text-sm rounded-lg hover:bg-gray-50 transition-colors">
          {item.cta.secondary}
        </button>
      </div>
    </motion.div>
  );

  const renderDetailedProfile = (item) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={() => setSelectedProfile(null)}
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
              <div className="relative">
                <img
                  src={item.logo || item.avatar}
                  alt={item.name}
                  className="w-24 h-24 rounded-2xl object-cover"
                />
                {item.verified && (
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                    <Verified className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h1 className="text-3xl font-bold text-gray-900">{item.name}</h1>
                  {item.trending && (
                    <div className="flex items-center space-x-1 text-blue-600">
                      <TrendingUp className="w-5 h-5" />
                      <span className="text-sm font-medium">Trending</span>
                    </div>
                  )}
                </div>
                <p className="text-xl text-gray-600 mt-1">{item.tagline}</p>
                <div className="flex items-center space-x-4 mt-4">
                  {item.location && (
                    <div className="flex items-center space-x-2 text-gray-600">
                      <MapPin size={16} />
                      <span>{item.location}</span>
                    </div>
                  )}
                  {item.founded && (
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Calendar size={16} />
                      <span>{item.founded}</span>
                    </div>
                  )}
                  {item.experience && (
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Clock size={16} />
                      <span>{item.experience} experience</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <button
              onClick={() => setSelectedProfile(null)}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
            >
              <X size={24} />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">About</h2>
                <p className="text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {item.metrics && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Key Metrics</h2>
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(item.metrics).map(([key, value]) => (
                      <div key={key} className="bg-gray-50 rounded-lg p-4">
                        <div className="text-sm text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1')}</div>
                        <div className="text-lg font-bold text-gray-900">{value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {item.achievements && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Achievements</h2>
                  <ul className="space-y-2">
                    {item.achievements.map((achievement, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <CheckCircle size={16} className="text-blue-600" />
                        <span className="text-gray-600">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {item.tags && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Tags & Skills</h2>
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag, index) => (
                      <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <MessageCircle size={16} />
                    <span>Send Message</span>
                  </button>
                  <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <Calendar size={16} />
                    <span>Schedule Meeting</span>
                  </button>
                  <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <Heart size={16} />
                    <span>Add to Favorites</span>
                  </button>
                </div>
              </div>

              {item.availability && (
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="font-bold text-gray-900 mb-4">Availability</h3>
                  <span className={`px-3 py-2 rounded-full text-sm font-medium border ${getAvailabilityColor(item.availability)}`}>
                    {item.availability}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Tab-specific Search and Filters */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder={`Search ${activeTab}...`}
                  value={getCurrentTabState().searchQuery}
                  onChange={(e) => updateTabState(activeTab, { searchQuery: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                />
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => updateTabState(activeTab, { showFilters: !getCurrentTabState().showFilters })}
                className="flex items-center space-x-2 px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <Filter size={20} />
                <span>Filters</span>
                <ChevronDown size={16} className={`transition-transform ${getCurrentTabState().showFilters ? 'rotate-180' : ''}`} />
              </button>
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

          {/* Tab-specific Filters Panel */}
          <AnimatePresence>
            {getCurrentTabState().showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 pt-4 border-t border-gray-200"
              >
                {renderTabSpecificFilters()}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-white rounded-2xl border border-gray-200 p-2 mb-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-xl transition-all duration-300 ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{tab.label}</span>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  isActive ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-600'
                }`}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Results */}
        <div className="mb-4">
          <p className="text-gray-600">
            Showing {filteredData.length} {activeTab} out of {getDataByTab().length}
          </p>
        </div>

        {/* Cards Grid */}
        <div className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
            : 'grid-cols-1'
        }`}>
          {filteredData.map(renderUnifiedCard)}
        </div>

        {/* Empty State */}
        {filteredData.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search size={32} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* Profile Modal */}
      <AnimatePresence>
        {selectedProfile && renderDetailedProfile(selectedProfile)}
      </AnimatePresence>
    </div>
  );
};

export default EnhancedEcosystemHub;
