import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Star, 
  MapPin, 
  Calendar, 
  DollarSign, 
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
  Shield
} from 'lucide-react';
import '../App.css';

const ExpertNetwork = () => {
  const [experts, setExperts] = useState([
    {
      id: 1,
      name: 'Sarah Chen',
      title: 'Fractional CTO',
      company: 'Former Google, Stripe',
      avatar: '👩‍💻',
      rating: 4.9,
      reviews: 47,
      hourlyRate: 250,
      location: 'San Francisco, CA',
      expertise: ['Technical Leadership', 'Scaling Engineering', 'AI/ML'],
      availability: 'Available',
      responseTime: '< 2 hours',
      completedProjects: 23,
      description: 'Experienced CTO with 15+ years building scalable systems at top tech companies. Specialized in helping startups scale their engineering teams and technical infrastructure.',
      skills: ['Python', 'React', 'AWS', 'Kubernetes', 'Team Leadership'],
      languages: ['English', 'Mandarin'],
      timezone: 'PST',
      verified: true
    },
    {
      id: 2,
      name: 'Marcus Rodriguez',
      title: 'Fractional CMO',
      company: 'Former Airbnb, Uber',
      avatar: '👨‍💼',
      rating: 4.8,
      reviews: 62,
      hourlyRate: 200,
      location: 'Austin, TX',
      expertise: ['Growth Marketing', 'Brand Strategy', 'Performance Marketing'],
      availability: 'Available',
      responseTime: '< 1 hour',
      completedProjects: 31,
      description: 'Growth marketing expert who has scaled user acquisition at unicorn startups. Specialized in building marketing funnels that drive sustainable growth.',
      skills: ['Growth Hacking', 'SEO/SEM', 'Analytics', 'Content Strategy'],
      languages: ['English', 'Spanish'],
      timezone: 'CST',
      verified: true
    },
    {
      id: 3,
      name: 'Emily Watson',
      title: 'Fractional CFO',
      company: 'Former Goldman Sachs',
      avatar: '👩‍💼',
      rating: 5.0,
      reviews: 28,
      hourlyRate: 300,
      location: 'New York, NY',
      expertise: ['Financial Planning', 'Fundraising', 'M&A'],
      availability: 'Busy',
      responseTime: '< 4 hours',
      completedProjects: 18,
      description: 'Former investment banker turned fractional CFO. Helped 50+ startups raise over $500M in funding and optimize their financial operations.',
      skills: ['Financial Modeling', 'Fundraising', 'Due Diligence', 'Strategic Planning'],
      languages: ['English', 'French'],
      timezone: 'EST',
      verified: true
    },
    {
      id: 4,
      name: 'David Kim',
      title: 'Fractional CPO',
      company: 'Former Meta, Netflix',
      avatar: '👨‍🎨',
      rating: 4.7,
      reviews: 35,
      hourlyRate: 220,
      location: 'Seattle, WA',
      expertise: ['Product Strategy', 'User Experience', 'Product-Market Fit'],
      availability: 'Available',
      responseTime: '< 3 hours',
      completedProjects: 26,
      description: 'Product leader with experience building products used by millions. Specialized in helping startups find product-market fit and scale their product teams.',
      skills: ['Product Management', 'UX Design', 'Data Analysis', 'A/B Testing'],
      languages: ['English', 'Korean'],
      timezone: 'PST',
      verified: true
    }
  ]);

  const [selectedExpert, setSelectedExpert] = useState(null);
  const [filterRole, setFilterRole] = useState('all');
  const [filterAvailability, setFilterAvailability] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('rating');

  const roles = ['all', 'CTO', 'CMO', 'CFO', 'CPO', 'COO', 'CHRO'];
  const availabilityOptions = ['all', 'Available', 'Busy'];

  const getAvailabilityColor = (availability) => {
    switch (availability) {
      case 'Available': return 'text-green-600 bg-green-50 border-green-200';
      case 'Busy': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'Unavailable': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const filteredExperts = experts.filter(expert => {
    const matchesRole = filterRole === 'all' || expert.title.includes(filterRole);
    const matchesAvailability = filterAvailability === 'all' || expert.availability === filterAvailability;
    const matchesSearch = expert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         expert.expertise.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesRole && matchesAvailability && matchesSearch;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'rating': return b.rating - a.rating;
      case 'rate': return a.hourlyRate - b.hourlyRate;
      case 'projects': return b.completedProjects - a.completedProjects;
      default: return 0;
    }
  });

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
                <h1 className="text-3xl font-bold startupos-gradient-text">Expert Network</h1>
              </div>
              <p className="text-gray-600">
                Connect with world-class fractional CXOs and industry experts to accelerate your growth
              </p>
            </div>
            <motion.button
              className="flex items-center space-x-2 px-6 py-3 startupos-gradient text-white rounded-xl hover:shadow-lg transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <MessageSquare size={20} />
              <span>Post Project</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { title: 'Expert Network', value: '2,500+', change: '+150', icon: Users, color: 'blue' },
            { title: 'Avg Rating', value: '4.8/5', change: '+0.2', icon: Star, color: 'yellow' },
            { title: 'Projects Completed', value: '1,847', change: '+89', icon: CheckCircle, color: 'green' },
            { title: 'Response Time', value: '< 2h', change: '-15m', icon: Clock, color: 'purple' }
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
                    stat.color === 'yellow' ? 'bg-yellow-50 text-yellow-600' :
                    stat.color === 'green' ? 'bg-green-50 text-green-600' :
                    'bg-purple-50 text-purple-600'
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
                  placeholder="Search experts by name or skill..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full md:w-64"
                />
              </div>
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {roles.map(role => (
                  <option key={role} value={role}>
                    {role === 'all' ? 'All Roles' : `Fractional ${role}`}
                  </option>
                ))}
              </select>
              <select
                value={filterAvailability}
                onChange={(e) => setFilterAvailability(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {availabilityOptions.map(option => (
                  <option key={option} value={option}>
                    {option === 'all' ? 'All Availability' : option}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="rating">Rating</option>
                  <option value="rate">Hourly Rate</option>
                  <option value="projects">Projects</option>
                </select>
              </div>
              <span className="text-sm text-gray-600">
                {filteredExperts.length} expert{filteredExperts.length !== 1 ? 's' : ''}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Experts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AnimatePresence>
            {filteredExperts.map((expert, index) => (
              <motion.div
                key={expert.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover-lift cursor-pointer"
                onClick={() => setSelectedExpert(expert)}
              >
                <div className="flex items-start space-x-4">
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-2xl">
                      {expert.avatar}
                    </div>
                    {expert.verified && (
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                        <Shield size={12} className="text-white" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{expert.name}</h3>
                        <p className="text-blue-600 font-medium">{expert.title}</p>
                        <p className="text-gray-600 text-sm">{expert.company}</p>
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getAvailabilityColor(expert.availability)}`}>
                        {expert.availability}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Star size={14} className="text-yellow-500 fill-current" />
                        <span>{expert.rating}</span>
                        <span>({expert.reviews} reviews)</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin size={14} />
                        <span>{expert.location}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mt-4 line-clamp-2">{expert.description}</p>

                <div className="flex flex-wrap gap-2 mt-4">
                  {expert.expertise.slice(0, 3).map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="px-2 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                  {expert.expertise.length > 3 && (
                    <span className="px-2 py-1 bg-gray-50 text-gray-600 text-xs font-medium rounded-full">
                      +{expert.expertise.length - 3} more
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <DollarSign size={14} />
                      <span>${expert.hourlyRate}/hr</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock size={14} />
                      <span>{expert.responseTime}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <CheckCircle size={14} />
                      <span>{expert.completedProjects} projects</span>
                    </div>
                  </div>
                  <ArrowRight size={16} className="text-gray-400" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Expert Detail Modal */}
        <AnimatePresence>
          {selectedExpert && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
              onClick={() => setSelectedExpert(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-start space-x-4">
                    <div className="relative">
                      <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-3xl">
                        {selectedExpert.avatar}
                      </div>
                      {selectedExpert.verified && (
                        <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                          <Shield size={16} className="text-white" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h2 className="text-2xl font-bold text-gray-900">{selectedExpert.name}</h2>
                          <p className="text-blue-600 font-medium text-lg">{selectedExpert.title}</p>
                          <p className="text-gray-600">{selectedExpert.company}</p>
                        </div>
                        <span className={`px-3 py-1 text-sm font-medium rounded-full border ${getAvailabilityColor(selectedExpert.availability)}`}>
                          {selectedExpert.availability}
                        </span>
                      </div>
                      <div className="flex items-center space-x-6 mt-3 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Star size={16} className="text-yellow-500 fill-current" />
                          <span className="font-medium">{selectedExpert.rating}</span>
                          <span>({selectedExpert.reviews} reviews)</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin size={16} />
                          <span>{selectedExpert.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Globe size={16} />
                          <span>{selectedExpert.timezone}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">About</h3>
                        <p className="text-gray-600">{selectedExpert.description}</p>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Expertise</h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedExpert.expertise.map((skill, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-blue-50 text-blue-600 text-sm font-medium rounded-full"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Skills</h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedExpert.skills.map((skill, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-gray-50 text-gray-600 text-sm rounded-full"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Languages</h3>
                        <div className="flex space-x-4">
                          {selectedExpert.languages.map((language, index) => (
                            <span key={index} className="text-gray-600">{language}</span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="bg-gray-50 rounded-xl p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">Hourly Rate</span>
                            <span className="font-semibold">${selectedExpert.hourlyRate}/hr</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">Response Time</span>
                            <span className="font-semibold">{selectedExpert.responseTime}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">Projects</span>
                            <span className="font-semibold">{selectedExpert.completedProjects}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">Rating</span>
                            <div className="flex items-center space-x-1">
                              <Star size={16} className="text-yellow-500 fill-current" />
                              <span className="font-semibold">{selectedExpert.rating}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <motion.button
                          className="w-full flex items-center justify-center space-x-2 px-6 py-3 startupos-gradient text-white rounded-xl hover:shadow-lg transition-all"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <MessageSquare size={20} />
                          <span>Send Message</span>
                        </motion.button>
                        <motion.button
                          className="w-full flex items-center justify-center space-x-2 px-6 py-3 border border-blue-600 text-blue-600 rounded-xl hover:bg-blue-50 transition-all"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Video size={20} />
                          <span>Schedule Call</span>
                        </motion.button>
                        <motion.button
                          className="w-full flex items-center justify-center space-x-2 px-6 py-3 border border-gray-300 text-gray-600 rounded-xl hover:bg-gray-50 transition-all"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Star size={20} />
                          <span>Save Expert</span>
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ExpertNetwork;

