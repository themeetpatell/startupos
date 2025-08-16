import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
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
  Mail,
  Briefcase,
  GraduationCap,
  Linkedin,
  Twitter,
  Github,
  Globe as GlobeIcon
} from 'lucide-react';

const Founders = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedExperience, setSelectedExperience] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedIndustry, setSelectedIndustry] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedFounder, setSelectedFounder] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const founders = [
    {
      id: 1,
      name: 'Sarah Chen',
      title: 'CEO & Co-Founder',
      company: 'TechFlow AI',
      experience: '10+ years',
      location: 'San Francisco, CA',
      industry: 'SaaS',
      education: 'Stanford University',
      degree: 'Computer Science, MBA',
      previousCompanies: ['Google', 'Stripe', 'Uber'],
      achievements: [
        'Built and sold 2 companies',
        'Featured in Forbes 30 Under 30',
        'Y Combinator Alumni',
        '500+ team members managed'
      ],
      expertise: ['Product Strategy', 'Team Building', 'Fundraising', 'AI/ML'],
      network: {
        linkedin: 'linkedin.com/in/sarahchen',
        twitter: '@sarahchen',
        github: 'github.com/sarahchen',
        website: 'sarahchen.com'
      },
      contact: {
        email: 'sarah@techflow.ai',
        phone: '+1 (415) 555-0123'
      },
      avatar: '👩‍💼',
      status: 'Available',
      bio: 'Serial entrepreneur with a passion for building AI-powered products that solve real-world problems.',
      interests: ['AI/ML', 'Product Management', 'Startup Mentoring', 'Women in Tech'],
      availability: 'Open to advising and board positions'
    },
    {
      id: 2,
      name: 'Mike Rodriguez',
      title: 'CTO & Co-Founder',
      company: 'TechFlow AI',
      experience: '8+ years',
      location: 'San Francisco, CA',
      industry: 'SaaS',
      education: 'Stanford University',
      degree: 'Computer Science',
      previousCompanies: ['Uber', 'Google', 'Microsoft'],
      achievements: [
        'Led engineering teams of 100+',
        'Architected systems at scale',
        'Open source contributor',
        'Technical advisor to 5 startups'
      ],
      expertise: ['System Architecture', 'Machine Learning', 'Cloud Infrastructure', 'Team Leadership'],
      network: {
        linkedin: 'linkedin.com/in/mikerodriguez',
        twitter: '@mikerodriguez',
        github: 'github.com/mikerodriguez',
        website: 'mikerodriguez.dev'
      },
      contact: {
        email: 'mike@techflow.ai',
        phone: '+1 (415) 555-0124'
      },
      avatar: '👨‍💻',
      status: 'Available',
      bio: 'Engineering leader focused on building scalable systems and mentoring technical teams.',
      interests: ['System Design', 'Open Source', 'Technical Mentoring', 'Cloud Computing'],
      availability: 'Open to technical advising and speaking'
    },
    {
      id: 3,
      name: 'David Kim',
      title: 'CEO & Founder',
      company: 'GreenEnergy Solutions',
      experience: '12+ years',
      location: 'Austin, TX',
      industry: 'CleanTech',
      education: 'MIT',
      degree: 'Mechanical Engineering, MBA',
      previousCompanies: ['SolarCity', 'Tesla', 'GE'],
      achievements: [
        'Led $500M+ renewable energy projects',
        'EPA Innovation Award winner',
        'Board member at 3 companies',
        'Published 15+ technical papers'
      ],
      expertise: ['Clean Energy', 'Project Management', 'Regulatory Affairs', 'Strategic Partnerships'],
      network: {
        linkedin: 'linkedin.com/in/davidkim',
        twitter: '@davidkim',
        github: 'github.com/davidkim',
        website: 'davidkim.com'
      },
      contact: {
        email: 'david@greenenergy.com',
        phone: '+1 (512) 555-0125'
      },
      avatar: '👨‍🔬',
      status: 'Available',
      bio: 'Clean energy entrepreneur with deep expertise in renewable energy and sustainability.',
      interests: ['Sustainability', 'Climate Tech', 'Energy Policy', 'Green Innovation'],
      availability: 'Open to board positions and strategic partnerships'
    },
    {
      id: 4,
      name: 'Dr. Maria Garcia',
      title: 'CEO & Founder',
      company: 'HealthTech Pro',
      experience: '15+ years',
      location: 'Boston, MA',
      industry: 'HealthTech',
      education: 'Harvard Medical School',
      degree: 'MD, MBA',
      previousCompanies: ['Mayo Clinic', 'Johnson & Johnson', 'Pfizer'],
      achievements: [
        'Board certified physician',
        'FDA advisory committee member',
        'Published 50+ research papers',
        'Led clinical trials for 10+ drugs'
      ],
      expertise: ['Clinical Research', 'Regulatory Affairs', 'Healthcare Innovation', 'Digital Health'],
      network: {
        linkedin: 'linkedin.com/in/mariagarcia',
        twitter: '@mariagarcia',
        github: 'github.com/mariagarcia',
        website: 'mariagarcia.com'
      },
      contact: {
        email: 'maria@healthtechpro.com',
        phone: '+1 (617) 555-0126'
      },
      avatar: '👩‍⚕️',
      status: 'Available',
      bio: 'Physician-entrepreneur bridging the gap between healthcare and technology.',
      interests: ['Digital Health', 'Clinical Innovation', 'Healthcare Policy', 'Patient Advocacy'],
      availability: 'Open to healthcare advisory and speaking'
    }
  ];

  const experienceLevels = ['all', '0-2 years', '3-5 years', '6-10 years', '10+ years'];
  const locations = ['all', 'San Francisco, CA', 'New York, NY', 'Austin, TX', 'Boston, MA', 'Seattle, WA'];
  const industries = ['all', 'SaaS', 'FinTech', 'HealthTech', 'CleanTech', 'AI/ML', 'E-commerce', 'EdTech'];

  const filteredFounders = founders.filter(founder => {
    const matchesSearch = founder.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         founder.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         founder.expertise.some(exp => exp.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesExperience = selectedExperience === 'all' || founder.experience.includes(selectedExperience);
    const matchesLocation = selectedLocation === 'all' || founder.location === selectedLocation;
    const matchesIndustry = selectedIndustry === 'all' || founder.industry === selectedIndustry;
    
    return matchesSearch && matchesExperience && matchesLocation && matchesIndustry;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Available': return 'text-green-600 bg-green-50 border-green-200';
      case 'Busy': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'Unavailable': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const renderFounderCard = (founder) => (
    <motion.div
      key={founder.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover-lift cursor-pointer"
      onClick={() => {
        setSelectedFounder(founder);
        setShowDetailModal(true);
      }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center text-white text-xl">
            {founder.avatar}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{founder.name}</h3>
            <p className="text-sm text-gray-600">{founder.title} at {founder.company}</p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(founder.status)}`}>
          {founder.status}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-xs text-gray-500">Experience</p>
          <p className="text-sm font-medium text-gray-900">{founder.experience}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Industry</p>
          <p className="text-sm font-medium text-gray-900">{founder.industry}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Education</p>
          <p className="text-sm font-medium text-gray-900">{founder.education}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Location</p>
          <p className="text-sm font-medium text-gray-900">{founder.location}</p>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-xs text-gray-500 mb-2">Expertise</p>
        <div className="flex flex-wrap gap-1">
          {founder.expertise.slice(0, 3).map((skill, index) => (
            <span key={index} className="px-2 py-1 bg-blue-50 text-blue-600 rounded-full text-xs">
              {skill}
            </span>
          ))}
          {founder.expertise.length > 3 && (
            <span className="px-2 py-1 bg-gray-50 text-gray-600 rounded-full text-xs">
              +{founder.expertise.length - 3}
            </span>
          )}
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
      {showDetailModal && selectedFounder && (
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
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center text-white text-2xl">
                    {selectedFounder.avatar}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedFounder.name}</h2>
                    <p className="text-gray-600">{selectedFounder.title} at {selectedFounder.company}</p>
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
              {/* Bio */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">About</h3>
                <p className="text-gray-600">{selectedFounder.bio}</p>
              </div>

              {/* Key Info */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900">{selectedFounder.experience}</div>
                  <div className="text-sm text-gray-600">Experience</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900">{selectedFounder.education}</div>
                  <div className="text-sm text-gray-600">Education</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900">{selectedFounder.location}</div>
                  <div className="text-sm text-gray-600">Location</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900">{selectedFounder.industry}</div>
                  <div className="text-sm text-gray-600">Industry</div>
                </div>
              </div>

              {/* Previous Experience */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Previous Experience</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedFounder.previousCompanies.map((company, index) => (
                    <span key={index} className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm">
                      {company}
                    </span>
                  ))}
                </div>
              </div>

              {/* Achievements */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Achievements</h3>
                <div className="space-y-2">
                  {selectedFounder.achievements.map((achievement, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Award size={16} className="text-yellow-500" />
                      <span className="text-sm text-gray-600">{achievement}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Expertise */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Areas of Expertise</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedFounder.expertise.map((skill, index) => (
                    <span key={index} className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Interests */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Interests & Availability</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-gray-900 mb-2">Interests:</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedFounder.interests.map((interest, index) => (
                        <span key={index} className="px-2 py-1 bg-purple-50 text-purple-600 rounded-full text-xs">
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 mb-2">Availability:</p>
                    <p className="text-sm text-gray-600">{selectedFounder.availability}</p>
                  </div>
                </div>
              </div>

              {/* Contact & Social */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Contact & Social</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Mail size={16} className="text-gray-400" />
                      <span className="text-sm text-gray-600">{selectedFounder.contact.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone size={16} className="text-gray-400" />
                      <span className="text-sm text-gray-600">{selectedFounder.contact.phone}</span>
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <motion.button
                      className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Linkedin size={20} />
                    </motion.button>
                    <motion.button
                      className="p-2 text-gray-400 hover:text-blue-400 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Twitter size={20} />
                    </motion.button>
                    <motion.button
                      className="p-2 text-gray-400 hover:text-gray-800 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Github size={20} />
                    </motion.button>
                    <motion.button
                      className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <GlobeIcon size={20} />
                    </motion.button>
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
                placeholder="Search founders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full md:w-64"
              />
            </div>
            
            <select
              value={selectedExperience}
              onChange={(e) => setSelectedExperience(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {experienceLevels.map(level => (
                <option key={level} value={level}>
                  {level === 'all' ? 'All Experience' : level}
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
            <span className="text-sm text-gray-600">{filteredFounders.length} results</span>
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
        {filteredFounders.map(founder => renderFounderCard(founder))}
      </div>

      {/* Detail Modal */}
      {renderDetailModal()}
    </div>
  );
};

export default Founders; 