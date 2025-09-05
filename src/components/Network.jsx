import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Building, 
  User, 
  DollarSign, 
  Star, 
  MapPin, 
  Calendar, 
  MessageSquare, 
  Video, 
  Phone, 
  Mail, 
  Filter, 
  Search, 
  Award, 
  Briefcase, 
  Clock, 
  CheckCircle, 
  ArrowRight,
  TrendingUp,
  Target,
  Zap,
  Globe,
  BookOpen,
  Shield,
  Plus,
  Eye,
  Heart,
  Share2,
  ExternalLink,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import ExpertNetwork from './ExpertNetwork';
import '../App.css';

const Network = () => {
  const [activeTab, setActiveTab] = useState('startups');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLocation, setFilterLocation] = useState('all');
  const [filterStage, setFilterStage] = useState('all');
  const [sortBy, setSortBy] = useState('recent');

  const tabs = [
    { id: 'startups', label: 'Startups', icon: Building, count: 1247 },
    { id: 'founders', label: 'Founders', icon: User, count: 3421 },
    { id: 'investors', label: 'Investors', icon: DollarSign, count: 892 },
    { id: 'experts', label: 'Experts', icon: Award, count: 156 },
    { id: 'mentors', label: 'Mentors', icon: BookOpen, count: 234 }
  ];

  const startups = [
    {
      id: 1,
      name: 'TechFlow AI',
      description: 'AI-powered workflow automation for enterprise teams',
      logo: '🤖',
      stage: 'Series A',
      funding: '$12M',
      location: 'San Francisco, CA',
      founded: '2021',
      employees: '25-50',
      industry: 'AI/ML',
      tags: ['AI', 'Enterprise', 'Automation'],
      founders: ['Sarah Chen', 'Marcus Rodriguez'],
      investors: ['Andreessen Horowitz', 'Sequoia Capital'],
      website: 'https://techflow.ai',
      social: { twitter: '@techflowai', linkedin: 'techflow-ai' },
      description_long: 'TechFlow AI is revolutionizing enterprise workflow management through intelligent automation. Our platform helps teams streamline processes, reduce manual work, and increase productivity by 40%.',
      metrics: {
        revenue: '$2.1M ARR',
        growth: '+180% YoY',
        customers: '150+',
        satisfaction: '4.8/5'
      },
      recent_news: [
        'Raised $12M Series A led by a16z',
        'Launched new AI workflow templates',
        'Expanded to European markets'
      ]
    },
    {
      id: 2,
      name: 'GreenTech Solutions',
      description: 'Sustainable energy management for smart cities',
      logo: '🌱',
      stage: 'Seed',
      funding: '$3.2M',
      location: 'Austin, TX',
      founded: '2022',
      employees: '10-25',
      industry: 'CleanTech',
      tags: ['Sustainability', 'Energy', 'Smart Cities'],
      founders: ['Emily Watson', 'David Kim'],
      investors: ['Kleiner Perkins', 'Climate Capital'],
      website: 'https://greentech-solutions.com',
      social: { twitter: '@greentechsol', linkedin: 'greentech-solutions' },
      description_long: 'GreenTech Solutions provides comprehensive energy management platforms for smart cities, helping municipalities reduce carbon footprint and optimize energy consumption.',
      metrics: {
        revenue: '$850K ARR',
        growth: '+320% YoY',
        customers: '45+',
        satisfaction: '4.9/5'
      },
      recent_news: [
        'Closed $3.2M seed round',
        'Partnered with 5 major cities',
        'Won CleanTech Innovation Award'
      ]
    },
    {
      id: 3,
      name: 'HealthConnect',
      description: 'Telemedicine platform connecting patients with specialists',
      logo: '🏥',
      stage: 'Series B',
      funding: '$28M',
      location: 'New York, NY',
      founded: '2020',
      employees: '50-100',
      industry: 'HealthTech',
      tags: ['Healthcare', 'Telemedicine', 'AI'],
      founders: ['Dr. Lisa Park', 'James Wilson'],
      investors: ['General Catalyst', 'GV', 'Bessemer Ventures'],
      website: 'https://healthconnect.com',
      social: { twitter: '@healthconnect', linkedin: 'healthconnect' },
      description_long: 'HealthConnect is transforming healthcare delivery through AI-powered telemedicine, making specialist care accessible to patients everywhere.',
      metrics: {
        revenue: '$8.5M ARR',
        growth: '+150% YoY',
        customers: '500+',
        satisfaction: '4.7/5'
      },
      recent_news: [
        'Raised $28M Series B',
        'Launched AI diagnostic tools',
        'Expanded to 15 states'
      ]
    }
  ];

  const founders = [
    {
      id: 1,
      name: 'Sarah Chen',
      title: 'CEO & Co-founder',
      company: 'TechFlow AI',
      avatar: '👩‍💻',
      location: 'San Francisco, CA',
      experience: '15 years',
      previous_companies: ['Google', 'Stripe', 'Airbnb'],
      expertise: ['AI/ML', 'Product Strategy', 'Team Building'],
      education: 'Stanford CS, MBA',
      social: { twitter: '@sarahchen', linkedin: 'sarah-chen-ai' },
      bio: 'Serial entrepreneur with 15 years in tech. Previously led AI teams at Google and built products used by millions at Stripe.',
      achievements: ['Forbes 30 Under 30', 'Built 3 successful exits', 'Mentored 50+ founders'],
      availability: 'Available for mentoring',
      interests: ['AI', 'Climate Tech', 'Diversity in Tech']
    },
    {
      id: 2,
      name: 'Marcus Rodriguez',
      title: 'CTO & Co-founder',
      company: 'TechFlow AI',
      avatar: '👨‍💼',
      location: 'San Francisco, CA',
      experience: '12 years',
      previous_companies: ['Meta', 'Netflix', 'Uber'],
      expertise: ['Engineering', 'Scalability', 'AI Systems'],
      education: 'MIT CS, MS AI',
      social: { twitter: '@marcusrod', linkedin: 'marcus-rodriguez-cto' },
      bio: 'Engineering leader who has scaled systems to serve billions of users. Expert in building robust, scalable AI infrastructure.',
      achievements: ['Built systems at 3 unicorns', 'Open source contributor', 'Technical advisor to 10+ startups'],
      availability: 'Available for technical consulting',
      interests: ['Open Source', 'AI Ethics', 'Developer Tools']
    },
    {
      id: 3,
      name: 'Emily Watson',
      title: 'CEO & Founder',
      company: 'GreenTech Solutions',
      avatar: '👩‍💼',
      location: 'Austin, TX',
      experience: '8 years',
      previous_companies: ['Tesla', 'SolarCity', 'Clean Energy Labs'],
      expertise: ['CleanTech', 'Sustainability', 'Government Relations'],
      education: 'UC Berkeley Environmental Engineering',
      social: { twitter: '@emilywatson', linkedin: 'emily-watson-cleantech' },
      bio: 'Environmental engineer turned entrepreneur. Passionate about using technology to solve climate challenges.',
      achievements: ['Climate Tech Pioneer', 'Policy advisor', 'Built 2 successful exits'],
      availability: 'Available for climate tech mentoring',
      interests: ['Climate Action', 'Policy', 'Sustainable Cities']
    }
  ];

  const investors = [
    {
      id: 1,
      name: 'Andreessen Horowitz',
      type: 'VC Firm',
      logo: '🏛️',
      location: 'Menlo Park, CA',
      founded: '2009',
      aum: '$35B',
      focus: ['Enterprise Software', 'AI/ML', 'Fintech'],
      stages: ['Seed', 'Series A', 'Series B', 'Growth'],
      portfolio_size: '500+',
      notable_investments: ['Stripe', 'Coinbase', 'Airbnb', 'GitHub'],
      description: 'Leading venture capital firm focused on technology companies. Known for backing category-defining companies.',
      contact: 'partners@a16z.com',
      website: 'https://a16z.com',
      social: { twitter: '@a16z', linkedin: 'andreessen-horowitz' },
      recent_investments: ['TechFlow AI', 'HealthConnect', 'DataVault'],
      investment_criteria: {
        stage: 'Series A+',
        check_size: '$5M - $50M',
        geography: 'Global',
        sectors: 'Technology'
      }
    },
    {
      id: 2,
      name: 'Kleiner Perkins',
      type: 'VC Firm',
      logo: '🌲',
      location: 'Menlo Park, CA',
      founded: '1972',
      aum: '$8B',
      focus: ['CleanTech', 'Healthcare', 'Enterprise'],
      stages: ['Seed', 'Series A', 'Series B'],
      portfolio_size: '300+',
      notable_investments: ['Google', 'Amazon', 'Genentech', 'Netscape'],
      description: 'Pioneering venture capital firm with 50+ years of experience backing transformative companies.',
      contact: 'info@kpcb.com',
      website: 'https://kpcb.com',
      social: { twitter: '@kleinerperkins', linkedin: 'kleiner-perkins' },
      recent_investments: ['GreenTech Solutions', 'BioMed AI', 'CleanEnergy Corp'],
      investment_criteria: {
        stage: 'Seed+',
        check_size: '$2M - $25M',
        geography: 'US Focus',
        sectors: 'Technology, Healthcare, CleanTech'
      }
    }
  ];

  const mentors = [
    {
      id: 1,
      name: 'Dr. Lisa Park',
      title: 'Healthcare Innovation Advisor',
      company: 'Former Johnson & Johnson',
      avatar: '👩‍⚕️',
      location: 'Boston, MA',
      experience: '20 years',
      expertise: ['Healthcare', 'Regulatory', 'Product Development'],
      availability: 'Available',
      hourly_rate: '$300',
      rating: 4.9,
      reviews: 45,
      bio: 'Former VP of Innovation at J&J with deep expertise in healthcare product development and regulatory affairs.',
      specializations: ['FDA Approval', 'Clinical Trials', 'Healthcare Partnerships'],
      languages: ['English', 'Korean'],
      timezone: 'EST'
    },
    {
      id: 2,
      name: 'James Wilson',
      title: 'Growth Strategy Mentor',
      company: 'Former HubSpot',
      avatar: '👨‍💼',
      location: 'Cambridge, MA',
      experience: '12 years',
      expertise: ['Growth Marketing', 'Sales Strategy', 'Team Building'],
      availability: 'Available',
      hourly_rate: '$250',
      rating: 4.8,
      reviews: 38,
      bio: 'Former VP of Growth at HubSpot who scaled the company from startup to IPO. Expert in B2B growth strategies.',
      specializations: ['Inbound Marketing', 'Sales Funnels', 'Customer Success'],
      languages: ['English'],
      timezone: 'EST'
    }
  ];

  const getFilteredData = () => {
    let data = [];
    switch (activeTab) {
      case 'startups':
        data = startups;
        break;
      case 'founders':
        data = founders;
        break;
      case 'investors':
        data = investors;
        break;
      case 'mentors':
        data = mentors;
        break;
      default:
        data = [];
    }

    return data.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesLocation = filterLocation === 'all' || 
                             (item.location && item.location.toLowerCase().includes(filterLocation.toLowerCase()));
      return matchesSearch && matchesLocation;
    });
  };

  const renderStartupCard = (startup) => (
    <motion.div
      key={startup.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover-lift cursor-pointer"
    >
      <div className="flex items-start space-x-4">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-2xl">
          {startup.logo}
        </div>
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{startup.name}</h3>
              <p className="text-gray-600 text-sm mt-1">{startup.description}</p>
              <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-medium">
                  {startup.stage}
                </span>
                <span className="flex items-center space-x-1">
                  <DollarSign size={14} />
                  <span>{startup.funding}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <MapPin size={14} />
                  <span>{startup.location}</span>
                </span>
              </div>
            </div>
            <div className="flex space-x-2">
              <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                <Heart size={16} />
              </button>
              <button className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors">
                <Share2 size={16} />
              </button>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-4">
            {startup.tags.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-50 text-gray-600 text-xs font-medium rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <span>Founded {startup.founded}</span>
              <span>{startup.employees} employees</span>
              <span>{startup.industry}</span>
            </div>
            <div className="flex space-x-2">
              <button className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                View Details
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Connect
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const renderFounderCard = (founder) => (
    <motion.div
      key={founder.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover-lift cursor-pointer"
    >
      <div className="flex items-start space-x-4">
        <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center text-2xl">
          {founder.avatar}
        </div>
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{founder.name}</h3>
              <p className="text-green-600 font-medium">{founder.title}</p>
              <p className="text-gray-600 text-sm">{founder.company}</p>
              <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                <span className="flex items-center space-x-1">
                  <MapPin size={14} />
                  <span>{founder.location}</span>
                </span>
                <span>{founder.experience} experience</span>
              </div>
            </div>
            <span className="px-2 py-1 bg-green-50 text-green-600 rounded-full text-xs font-medium">
              {founder.availability}
            </span>
          </div>
          
          <p className="text-gray-600 text-sm mt-3 line-clamp-2">{founder.bio}</p>

          <div className="flex flex-wrap gap-2 mt-4">
            {founder.expertise.slice(0, 3).map((skill, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-green-50 text-green-600 text-xs font-medium rounded-full"
              >
                {skill}
              </span>
            ))}
            {founder.expertise.length > 3 && (
              <span className="px-2 py-1 bg-gray-50 text-gray-600 text-xs font-medium rounded-full">
                +{founder.expertise.length - 3} more
              </span>
            )}
          </div>

          <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <span>Previous: {founder.previous_companies.join(', ')}</span>
            </div>
            <div className="flex space-x-2">
              <button className="px-4 py-2 text-green-600 border border-green-600 rounded-lg hover:bg-green-50 transition-colors">
                View Profile
              </button>
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                Connect
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const renderInvestorCard = (investor) => (
    <motion.div
      key={investor.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover-lift cursor-pointer"
    >
      <div className="flex items-start space-x-4">
        <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center text-2xl">
          {investor.logo}
        </div>
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{investor.name}</h3>
              <p className="text-purple-600 font-medium">{investor.type}</p>
              <p className="text-gray-600 text-sm">{investor.location}</p>
              <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                <span className="flex items-center space-x-1">
                  <DollarSign size={14} />
                  <span>{investor.aum} AUM</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Building size={14} />
                  <span>{investor.portfolio_size} portfolio</span>
                </span>
              </div>
            </div>
            <div className="flex space-x-2">
              <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                <Heart size={16} />
              </button>
              <button className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors">
                <Share2 size={16} />
              </button>
            </div>
          </div>
          
          <p className="text-gray-600 text-sm mt-3 line-clamp-2">{investor.description}</p>

          <div className="flex flex-wrap gap-2 mt-4">
            {investor.focus.slice(0, 3).map((focus, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-purple-50 text-purple-600 text-xs font-medium rounded-full"
              >
                {focus}
              </span>
            ))}
            {investor.focus.length > 3 && (
              <span className="px-2 py-1 bg-gray-50 text-gray-600 text-xs font-medium rounded-full">
                +{investor.focus.length - 3} more
              </span>
            )}
          </div>

          <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <span>Founded {investor.founded}</span>
              <span>Stages: {investor.stages.join(', ')}</span>
            </div>
            <div className="flex space-x-2">
              <button className="px-4 py-2 text-purple-600 border border-purple-600 rounded-lg hover:bg-purple-50 transition-colors">
                View Details
              </button>
              <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                Contact
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const renderMentorCard = (mentor) => (
    <motion.div
      key={mentor.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover-lift cursor-pointer"
    >
      <div className="flex items-start space-x-4">
        <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center text-2xl">
          {mentor.avatar}
        </div>
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{mentor.name}</h3>
              <p className="text-orange-600 font-medium">{mentor.title}</p>
              <p className="text-gray-600 text-sm">{mentor.company}</p>
              <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                <span className="flex items-center space-x-1">
                  <MapPin size={14} />
                  <span>{mentor.location}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Star size={14} className="text-yellow-500 fill-current" />
                  <span>{mentor.rating} ({mentor.reviews} reviews)</span>
                </span>
              </div>
            </div>
            <span className="px-2 py-1 bg-orange-50 text-orange-600 rounded-full text-xs font-medium">
              {mentor.availability}
            </span>
          </div>
          
          <p className="text-gray-600 text-sm mt-3 line-clamp-2">{mentor.bio}</p>

          <div className="flex flex-wrap gap-2 mt-4">
            {mentor.expertise.slice(0, 3).map((skill, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-orange-50 text-orange-600 text-xs font-medium rounded-full"
              >
                {skill}
              </span>
            ))}
            {mentor.expertise.length > 3 && (
              <span className="px-2 py-1 bg-gray-50 text-gray-600 text-xs font-medium rounded-full">
                +{mentor.expertise.length - 3} more
              </span>
            )}
          </div>

          <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <span className="flex items-center space-x-1">
                <DollarSign size={14} />
                <span>${mentor.hourly_rate}/hr</span>
              </span>
              <span>{mentor.experience} experience</span>
            </div>
            <div className="flex space-x-2">
              <button className="px-4 py-2 text-orange-600 border border-orange-600 rounded-lg hover:bg-orange-50 transition-colors">
                View Profile
              </button>
              <button className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
                Book Session
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  if (activeTab === 'experts') {
    return <ExpertNetwork />;
  }

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
                  <Users className="text-white" size={20} />
                </div>
                <h1 className="text-3xl font-bold startupos-gradient-text">Network</h1>
              </div>
              <p className="text-gray-600">
                Connect with startups, founders, investors, and mentors in the ecosystem
              </p>
            </div>
            <motion.button
              className="flex items-center space-x-2 px-6 py-3 startupos-gradient text-white rounded-xl hover:shadow-lg transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Plus size={20} />
              <span>Add to Network</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-2 mb-8"
        >
          <div className="flex space-x-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-3 px-6 py-3 rounded-lg transition-all duration-300 font-medium ${
                    isActive
                      ? 'bg-blue-500 text-white shadow-lg'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon size={18} />
                  <span>{tab.label}</span>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    isActive ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {tab.count}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
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
                value={filterLocation}
                onChange={(e) => setFilterLocation(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Locations</option>
                <option value="san francisco">San Francisco</option>
                <option value="new york">New York</option>
                <option value="austin">Austin</option>
                <option value="boston">Boston</option>
              </select>
              {activeTab === 'startups' && (
                <select
                  value={filterStage}
                  onChange={(e) => setFilterStage(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Stages</option>
                  <option value="seed">Seed</option>
                  <option value="series a">Series A</option>
                  <option value="series b">Series B</option>
                </select>
              )}
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="recent">Most Recent</option>
                  <option value="popular">Most Popular</option>
                  <option value="name">Name</option>
                </select>
              </div>
              <span className="text-sm text-gray-600">
                {getFilteredData().length} {activeTab}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AnimatePresence>
            {getFilteredData().map((item, index) => {
              switch (activeTab) {
                case 'startups':
                  return renderStartupCard(item);
                case 'founders':
                  return renderFounderCard(item);
                case 'investors':
                  return renderInvestorCard(item);
                case 'mentors':
                  return renderMentorCard(item);
                default:
                  return null;
              }
            })}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {getFilteredData().length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search size={32} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No {activeTab} found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setFilterLocation('all');
                setFilterStage('all');
              }}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Clear Filters
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Network;
