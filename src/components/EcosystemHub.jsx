import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Filter, MapPin, Calendar, Users, TrendingUp, 
  Star, MessageCircle, Phone, Mail, Globe, Linkedin,
  Twitter, Github, Building, User, Award, Target,
  DollarSign, Clock, CheckCircle, ArrowRight, Plus,
  Eye, Heart, Share, MoreVertical, ChevronDown,
  Briefcase, GraduationCap, Zap, Shield, Lightbulb
} from 'lucide-react';

const EcosystemHub = () => {
  const [activeTab, setActiveTab] = useState('startups');
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    stage: 'all',
    industry: 'all',
    location: 'all',
    funding: 'all'
  });
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  const tabs = [
    { id: 'startups', label: 'Startups', icon: Building, count: 1247 },
    { id: 'founders', label: 'Founders', icon: User, count: 892 },
    { id: 'investors', label: 'Investors', icon: DollarSign, count: 156 },
    { id: 'mentors', label: 'Mentors', icon: Award, count: 234 },
    { id: 'experts', label: 'Experts', icon: Lightbulb, count: 89 },
    { id: 'advisors', label: 'Advisors', icon: Shield, count: 67 }
  ];

  const startups = [
    {
      id: 1,
      name: 'TechFlow AI',
      tagline: 'Revolutionizing workflow automation with AI',
      description: 'We build intelligent automation tools that help businesses streamline their operations and increase productivity by 300%.',
      logo: 'https://ui-avatars.com/api/?name=TechFlow+AI&background=6366f1&color=fff',
      stage: 'Series A',
      industry: 'AI/ML',
      location: 'San Francisco, CA',
      founded: '2022',
      employees: '25-50',
      funding: '$12.5M',
      valuation: '$45M',
      investors: ['Sequoia Capital', 'Andreessen Horowitz', 'Y Combinator'],
      founders: ['Sarah Chen', 'Michael Rodriguez'],
      website: 'https://techflow.ai',
      linkedin: 'https://linkedin.com/company/techflow-ai',
      twitter: '@techflow_ai',
      tags: ['AI', 'Automation', 'B2B', 'SaaS'],
      highlights: [
        'Featured in TechCrunch',
        'Y Combinator W22',
        '500+ Enterprise Customers'
      ],
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
      }
    },
    {
      id: 2,
      name: 'GreenTech Solutions',
      tagline: 'Sustainable energy for the future',
      description: 'Developing next-generation solar panels and energy storage solutions to accelerate the transition to renewable energy.',
      logo: 'https://ui-avatars.com/api/?name=GreenTech&background=10b981&color=fff',
      stage: 'Seed',
      industry: 'CleanTech',
      location: 'Austin, TX',
      founded: '2023',
      employees: '10-25',
      funding: '$3.2M',
      valuation: '$15M',
      investors: ['Kleiner Perkins', 'Breakthrough Energy'],
      founders: ['David Kim', 'Lisa Wang'],
      website: 'https://greentech.solutions',
      linkedin: 'https://linkedin.com/company/greentech-solutions',
      twitter: '@greentech_sol',
      tags: ['CleanTech', 'Energy', 'Sustainability', 'Hardware'],
      highlights: [
        'Breakthrough Energy Fellowship',
        'Patent Pending Technology',
        'Pilot with Tesla'
      ],
      metrics: {
        revenue: '$450K ARR',
        growth: '+180% YoY',
        customers: '25+',
        team: '18'
      },
      socialProof: {
        customers: ['Tesla', 'SolarCity', 'Enphase'],
        awards: ['CleanTech Innovation Award'],
        press: ['MIT Technology Review', 'GreenBiz']
      }
    }
  ];

  const founders = [
    {
      id: 1,
      name: 'Sarah Chen',
      title: 'CEO & Co-Founder',
      company: 'TechFlow AI',
      bio: 'Former Google AI researcher with 8+ years in machine learning. Led teams that built products used by 1B+ users.',
      avatar: 'https://ui-avatars.com/api/?name=Sarah+Chen&background=6366f1&color=fff',
      location: 'San Francisco, CA',
      experience: '8 years',
      education: 'Stanford CS, MIT PhD',
      previousCompanies: ['Google', 'OpenAI', 'DeepMind'],
      expertise: ['AI/ML', 'Product Strategy', 'Team Building'],
      achievements: [
        'Built Google\'s ML infrastructure',
        'Published 15+ research papers',
        'Forbes 30 Under 30'
      ],
      social: {
        linkedin: 'https://linkedin.com/in/sarahchen',
        twitter: '@sarahchen_ai',
        github: 'sarahchen'
      },
      availability: 'Available for mentoring',
      interests: ['AI Ethics', 'Women in Tech', 'Climate Tech']
    },
    {
      id: 2,
      name: 'Michael Rodriguez',
      title: 'CTO & Co-Founder',
      company: 'TechFlow AI',
      bio: 'Serial entrepreneur with 3 successful exits. Expert in scaling engineering teams and building enterprise software.',
      avatar: 'https://ui-avatars.com/api/?name=Michael+Rodriguez&background=8b5cf6&color=fff',
      location: 'San Francisco, CA',
      experience: '12 years',
      education: 'Berkeley EECS',
      previousCompanies: ['Stripe', 'Twilio', 'Salesforce'],
      expertise: ['Engineering', 'Scaling', 'Enterprise Sales'],
      achievements: [
        '3 successful exits',
        'Built Stripe\'s payments API',
        'Y Combinator Partner'
      ],
      social: {
        linkedin: 'https://linkedin.com/in/michaelrodriguez',
        twitter: '@mrodriguez',
        github: 'mrodriguez'
      },
      availability: 'Available for advising',
      interests: ['Fintech', 'Developer Tools', 'Open Source']
    }
  ];

  const investors = [
    {
      id: 1,
      name: 'Jennifer Walsh',
      title: 'Partner',
      firm: 'Sequoia Capital',
      bio: 'Leading investor in AI and enterprise software. Has invested in 50+ companies with 15+ unicorns.',
      avatar: 'https://ui-avatars.com/api/?name=Jennifer+Walsh&background=f59e0b&color=fff',
      location: 'Menlo Park, CA',
      experience: '15 years',
      education: 'Harvard MBA, Stanford BS',
      focus: ['AI/ML', 'Enterprise Software', 'SaaS'],
      portfolio: ['Stripe', 'Airbnb', 'Zoom', 'Snowflake'],
      checkSize: '$1M - $50M',
      stage: 'Seed to Series B',
      social: {
        linkedin: 'https://linkedin.com/in/jenniferwalsh',
        twitter: '@jenniferwalsh'
      },
      availability: 'Taking meetings',
      interests: ['AI Ethics', 'Climate Tech', 'Diversity']
    },
    {
      id: 2,
      name: 'David Park',
      title: 'Managing Partner',
      firm: 'Andreessen Horowitz',
      bio: 'Former founder turned investor. Focus on consumer and marketplace businesses. 20+ years in tech.',
      avatar: 'https://ui-avatars.com/api/?name=David+Park&background=ef4444&color=fff',
      location: 'San Francisco, CA',
      experience: '20 years',
      education: 'Stanford MBA, MIT BS',
      focus: ['Consumer', 'Marketplace', 'Mobile'],
      portfolio: ['Uber', 'Lyft', 'DoorDash', 'Instacart'],
      checkSize: '$5M - $100M',
      stage: 'Series A to Growth',
      social: {
        linkedin: 'https://linkedin.com/in/davidpark',
        twitter: '@davidpark'
      },
      availability: 'Limited availability',
      interests: ['Consumer Tech', 'Marketplace', 'Mobile']
    }
  ];

  const mentors = [
    {
      id: 1,
      name: 'Dr. Lisa Thompson',
      title: 'Former VP Engineering',
      company: 'Google',
      bio: '20+ years building and scaling engineering teams. Expert in AI/ML, distributed systems, and technical leadership.',
      avatar: 'https://ui-avatars.com/api/?name=Lisa+Thompson&background=06b6d4&color=fff',
      location: 'Palo Alto, CA',
      experience: '20 years',
      education: 'Stanford PhD, MIT BS',
      expertise: ['Engineering Leadership', 'AI/ML', 'Distributed Systems'],
      previousRoles: ['VP Engineering at Google', 'Principal Engineer at Facebook'],
      achievements: [
        'Built Google\'s search infrastructure',
        'Led 500+ person engineering team',
        'Technical advisor to 20+ startups'
      ],
      social: {
        linkedin: 'https://linkedin.com/in/lisathompson',
        twitter: '@lisathompson'
      },
      availability: 'Available for mentoring',
      specialties: ['Technical Leadership', 'AI Strategy', 'Team Building']
    }
  ];

  const experts = [
    {
      id: 1,
      name: 'Dr. Alex Kumar',
      title: 'AI Research Scientist',
      company: 'OpenAI',
      bio: 'Leading researcher in large language models and AI safety. Published 50+ papers in top-tier conferences.',
      avatar: 'https://ui-avatars.com/api/?name=Alex+Kumar&background=8b5cf6&color=fff',
      location: 'San Francisco, CA',
      experience: '10 years',
      education: 'Stanford PhD, Cambridge MS',
      expertise: ['Large Language Models', 'AI Safety', 'NLP'],
      research: ['GPT models', 'AI alignment', 'Multimodal AI'],
      publications: '50+ papers',
      citations: '5000+',
      social: {
        linkedin: 'https://linkedin.com/in/alexkumar',
        twitter: '@alexkumar_ai',
        github: 'alexkumar'
      },
      availability: 'Available for consulting',
      interests: ['AI Safety', 'Open Source', 'Education']
    }
  ];

  const advisors = [
    {
      id: 1,
      name: 'Robert Chen',
      title: 'Former CMO',
      company: 'Salesforce',
      bio: 'Marketing executive with 15+ years experience scaling B2B SaaS companies. Expert in growth marketing and brand building.',
      avatar: 'https://ui-avatars.com/api/?name=Robert+Chen&background=10b981&color=fff',
      location: 'San Francisco, CA',
      experience: '15 years',
      education: 'Wharton MBA, Berkeley BS',
      expertise: ['Growth Marketing', 'Brand Strategy', 'B2B Sales'],
      previousRoles: ['CMO at Salesforce', 'VP Marketing at HubSpot'],
      achievements: [
        'Scaled Salesforce to $20B+ revenue',
        'Built HubSpot\'s growth engine',
        'Advisor to 30+ startups'
      ],
      social: {
        linkedin: 'https://linkedin.com/in/robertchen',
        twitter: '@robertchen'
      },
      availability: 'Available for advising',
      specialties: ['Growth Marketing', 'Brand Strategy', 'B2B Sales']
    }
  ];

  const getDataByTab = () => {
    switch (activeTab) {
      case 'startups': return startups;
      case 'founders': return founders;
      case 'investors': return investors;
      case 'mentors': return mentors;
      case 'experts': return experts;
      case 'advisors': return advisors;
      default: return [];
    }
  };

  const filteredData = getDataByTab().filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.bio?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStage = filters.stage === 'all' || item.stage === filters.stage;
    const matchesIndustry = filters.industry === 'all' || item.industry === filters.industry;
    const matchesLocation = filters.location === 'all' || item.location?.includes(filters.location);
    const matchesFunding = filters.funding === 'all' || 
      (filters.funding === 'under-1m' && parseFloat(item.funding?.replace('$', '').replace('M', '')) < 1) ||
      (filters.funding === '1m-10m' && parseFloat(item.funding?.replace('$', '').replace('M', '')) >= 1 && parseFloat(item.funding?.replace('$', '').replace('M', '')) < 10) ||
      (filters.funding === 'over-10m' && parseFloat(item.funding?.replace('$', '').replace('M', '')) >= 10);

    return matchesSearch && matchesStage && matchesIndustry && matchesLocation && matchesFunding;
  });

  const renderProfileCard = (item) => (
        <motion.div
      key={item.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, shadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}
      className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 cursor-pointer"
      onClick={() => setSelectedProfile(item)}
    >
      <div className="flex items-start space-x-4">
        <img
          src={item.logo || item.avatar}
          alt={item.name}
          className="w-16 h-16 rounded-xl object-cover"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-bold text-gray-900 truncate">{item.name}</h3>
              <p className="text-sm text-gray-600 mt-1">{item.tagline || item.title}</p>
              {item.company && (
                <p className="text-sm text-blue-600 font-medium">{item.company}</p>
              )}
                </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50">
                <Heart size={16} />
              </button>
              <button className="p-2 text-gray-400 hover:text-blue-500 rounded-lg hover:bg-blue-50">
                <Share size={16} />
              </button>
            </div>
          </div>
          
          <p className="text-sm text-gray-600 mt-3 line-clamp-2">
            {item.description || item.bio}
          </p>
          
          <div className="flex flex-wrap gap-2 mt-4">
            {item.tags?.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
              >
                {tag}
              </span>
            ))}
            {item.expertise?.slice(0, 2).map((skill, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
              >
                {skill}
              </span>
            ))}
                  </div>
          
          <div className="flex items-center justify-between mt-4">
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
                  <span>Founded {item.founded}</span>
                </div>
              )}
              {item.experience && (
                <div className="flex items-center space-x-1">
                  <Clock size={14} />
                  <span>{item.experience}</span>
        </div>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors">
                View Profile
              </button>
            </div>
          </div>
        </div>
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
              <img
                src={item.logo || item.avatar}
                alt={item.name}
                className="w-24 h-24 rounded-2xl object-cover"
              />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{item.name}</h1>
                <p className="text-xl text-gray-600 mt-1">{item.tagline || item.title}</p>
                {item.company && (
                  <p className="text-lg text-blue-600 font-medium mt-1">{item.company}</p>
                )}
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
                      <span>Founded {item.founded}</span>
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
                  {item.description || item.bio}
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
                        <CheckCircle size={16} className="text-green-500" />
                        <span className="text-gray-600">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {item.socialProof && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Social Proof</h2>
                  <div className="space-y-4">
                    {item.socialProof.customers && (
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Notable Customers</h3>
                        <div className="flex flex-wrap gap-2">
                          {item.socialProof.customers.map((customer, index) => (
                            <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                              {customer}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {item.socialProof.awards && (
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Awards</h3>
                        <div className="flex flex-wrap gap-2">
                          {item.socialProof.awards.map((award, index) => (
                            <span key={index} className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                              {award}
                        </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
                </div>

            <div className="space-y-6">
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-4">Contact</h3>
                <div className="space-y-3">
                  {item.website && (
                    <a href={item.website} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-blue-600 hover:text-blue-700">
                      <Globe size={16} />
                      <span className="text-sm">Website</span>
                    </a>
                  )}
                  {item.linkedin && (
                    <a href={item.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-blue-600 hover:text-blue-700">
                      <Linkedin size={16} />
                      <span className="text-sm">LinkedIn</span>
                    </a>
                  )}
                  {item.twitter && (
                    <a href={`https://twitter.com/${item.twitter.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-blue-600 hover:text-blue-700">
                      <Twitter size={16} />
                      <span className="text-sm">Twitter</span>
                    </a>
                  )}
                  {item.github && (
                    <a href={`https://github.com/${item.github}`} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-gray-600 hover:text-gray-700">
                      <Github size={16} />
                      <span className="text-sm">GitHub</span>
                    </a>
                  )}
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <MessageCircle size={16} />
                    <span>Send Message</span>
                  </button>
                  <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                    <Calendar size={16} />
                    <span>Schedule Meeting</span>
                  </button>
                  <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                    <Heart size={16} />
                    <span>Add to Favorites</span>
                  </button>
                    </div>
                    </div>

              {item.tags && (
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="font-bold text-gray-900 mb-4">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-white text-gray-700 text-xs rounded-full border">
                        {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
            </div>
                    </div>
                  </div>
      </motion.div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Ecosystem Hub</h1>
          <p className="text-gray-600">Connect with startups, founders, investors, and experts in the ecosystem</p>
                    </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search ecosystem..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                />
                    </div>
                  </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <Filter size={20} />
              <span>Filters</span>
              <ChevronDown size={16} className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
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
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Stage</label>
                    <select
                      value={filters.stage}
                      onChange={(e) => setFilters(prev => ({ ...prev, stage: e.target.value }))}
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
                      onChange={(e) => setFilters(prev => ({ ...prev, industry: e.target.value }))}
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
                      onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
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
                      onChange={(e) => setFilters(prev => ({ ...prev, funding: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="all">All Funding</option>
                      <option value="under-1m">Under $1M</option>
                      <option value="1m-10m">$1M - $10M</option>
                      <option value="over-10m">Over $10M</option>
                    </select>
                  </div>
                </div>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredData.map(renderProfileCard)}
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

export default EcosystemHub;