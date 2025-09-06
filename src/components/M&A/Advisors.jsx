import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search,
  Filter,
  Star,
  Users,
  Building,
  DollarSign,
  Calendar,
  MapPin,
  MessageSquare,
  Phone,
  Mail,
  Globe,
  Award,
  Shield,
  TrendingUp,
  BarChart3,
  FileText,
  Briefcase,
  Clock,
  CheckCircle,
  AlertCircle,
  Eye,
  Plus,
  ArrowRight,
  ArrowLeft,
  X,
  Heart,
  Share2,
  Download,
  Bookmark,
  Settings,
  MoreVertical,
  Grid,
  List,
  Star as StarIcon,
  Award as AwardIcon,
  Users as UsersIcon,
  Building as BuildingIcon,
  DollarSign as DollarSignIcon,
  Calendar as CalendarIcon,
  MapPin as MapPinIcon,
  MessageSquare as MessageSquareIcon,
  Phone as PhoneIcon,
  Mail as MailIcon,
  Globe as GlobeIcon,
  Award as AwardIcon2,
  Shield as ShieldIcon,
  TrendingUp as TrendingUpIcon,
  BarChart3 as BarChart3Icon,
  FileText as FileTextIcon,
  Briefcase as BriefcaseIcon,
  Clock as ClockIcon,
  CheckCircle as CheckCircleIcon,
  AlertCircle as AlertCircleIcon,
  Eye as EyeIcon,
  Plus as PlusIcon,
  ArrowRight as ArrowRightIcon,
  ArrowLeft as ArrowLeftIcon,
  X as XIcon,
  Heart as HeartIcon,
  Share2 as Share2Icon,
  Download as DownloadIcon,
  Bookmark as BookmarkIcon,
  Settings as SettingsIcon,
  MoreVertical as MoreVerticalIcon
} from 'lucide-react';

const Advisors = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    specialty: 'all',
    experience: 'all',
    location: 'all',
    availability: 'all'
  });
  const [selectedAdvisor, setSelectedAdvisor] = useState(null);
  const [showAdvisorModal, setShowAdvisorModal] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [sortBy, setSortBy] = useState('rating');
  const [viewMode, setViewMode] = useState('grid');

  const specialties = [
    'SaaS', 'FinTech', 'Healthcare', 'E-commerce', 'Cybersecurity', 
    'AI/ML', 'EdTech', 'PropTech', 'CleanTech', 'Biotech', 'Manufacturing'
  ];

  const advisors = [
    {
      id: 1,
      name: 'Sarah Chen',
      title: 'Managing Director',
      company: 'Goldman Sachs',
      experience: '15+ years',
      deals: 47,
      value: '$12.8B',
      rating: 4.9,
      reviews: 23,
      specialties: ['SaaS', 'FinTech', 'Enterprise'],
      availability: 'Available',
      location: 'New York, NY',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      contact: {
        email: 'sarah.chen@goldmansachs.com',
        phone: '+1 (212) 555-0123',
        linkedin: 'linkedin.com/in/sarahchen',
        website: 'goldmansachs.com'
      },
      bio: 'Sarah is a seasoned M&A advisor with over 15 years of experience in technology and financial services. She has led numerous high-profile transactions and specializes in SaaS and FinTech companies.',
      recentDeals: [
        { name: 'TechFlow Acquisition', value: '$450M', date: '2023' },
        { name: 'DataViz Merger', value: '$280M', date: '2023' },
        { name: 'CloudSecure Sale', value: '$1.2B', date: '2022' }
      ],
      certifications: ['CFA', 'Series 7', 'Series 63'],
      languages: ['English', 'Mandarin'],
      responseTime: '2 hours',
      successRate: 94,
      avgDealSize: '$275M',
      industries: ['Technology', 'Financial Services', 'Healthcare']
    },
    {
      id: 2,
      name: 'Michael Rodriguez',
      title: 'Partner',
      company: 'Morgan Stanley',
      experience: '12+ years',
      deals: 34,
      value: '$8.9B',
      rating: 4.8,
      reviews: 18,
      specialties: ['Healthcare', 'Biotech', 'AI'],
      availability: 'Available',
      location: 'San Francisco, CA',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      contact: {
        email: 'michael.rodriguez@morganstanley.com',
        phone: '+1 (415) 555-0456',
        linkedin: 'linkedin.com/in/michaelrodriguez',
        website: 'morganstanley.com'
      },
      bio: 'Michael specializes in healthcare and biotechnology M&A transactions. He has extensive experience in cross-border deals and has advised on some of the largest healthcare acquisitions.',
      recentDeals: [
        { name: 'HealthTech Merger', value: '$850M', date: '2023' },
        { name: 'BioGen Acquisition', value: '$420M', date: '2023' },
        { name: 'MedTech Sale', value: '$650M', date: '2022' }
      ],
      certifications: ['CFA', 'Series 7', 'Series 63'],
      languages: ['English', 'Spanish'],
      responseTime: '4 hours',
      successRate: 91,
      avgDealSize: '$320M',
      industries: ['Healthcare', 'Biotechnology', 'Technology']
    },
    {
      id: 3,
      name: 'Emily Watson',
      title: 'Senior Vice President',
      company: 'JP Morgan',
      experience: '18+ years',
      deals: 62,
      value: '$15.2B',
      rating: 4.9,
      reviews: 31,
      specialties: ['E-commerce', 'Retail', 'Consumer'],
      availability: 'Limited',
      location: 'Chicago, IL',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      contact: {
        email: 'emily.watson@jpmorgan.com',
        phone: '+1 (312) 555-0789',
        linkedin: 'linkedin.com/in/emilywatson',
        website: 'jpmorgan.com'
      },
      bio: 'Emily is a veteran M&A advisor with deep expertise in consumer and retail sectors. She has successfully closed deals ranging from $50M to $2B+ and is known for her strategic approach.',
      recentDeals: [
        { name: 'RetailTech Acquisition', value: '$1.1B', date: '2023' },
        { name: 'E-commerce Merger', value: '$750M', date: '2023' },
        { name: 'Consumer Brand Sale', value: '$950M', date: '2022' }
      ],
      certifications: ['CFA', 'Series 7', 'Series 63', 'MBA'],
      languages: ['English', 'French'],
      responseTime: '6 hours',
      successRate: 96,
      avgDealSize: '$420M',
      industries: ['Consumer', 'Retail', 'E-commerce']
    },
    {
      id: 4,
      name: 'David Kim',
      title: 'Managing Director',
      company: 'Credit Suisse',
      experience: '14+ years',
      deals: 41,
      value: '$9.8B',
      rating: 4.7,
      reviews: 15,
      specialties: ['Cybersecurity', 'Enterprise Software', 'Cloud'],
      availability: 'Available',
      location: 'Boston, MA',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      contact: {
        email: 'david.kim@creditsuisse.com',
        phone: '+1 (617) 555-0321',
        linkedin: 'linkedin.com/in/davidkim',
        website: 'creditsuisse.com'
      },
      bio: 'David focuses on technology M&A, particularly in cybersecurity and enterprise software. He has advised on numerous high-profile tech acquisitions and has deep relationships in the sector.',
      recentDeals: [
        { name: 'CyberTech Acquisition', value: '$680M', date: '2023' },
        { name: 'CloudSoft Merger', value: '$520M', date: '2023' },
        { name: 'SecurityPro Sale', value: '$890M', date: '2022' }
      ],
      certifications: ['CFA', 'Series 7', 'Series 63'],
      languages: ['English', 'Korean'],
      responseTime: '3 hours',
      successRate: 89,
      avgDealSize: '$310M',
      industries: ['Technology', 'Cybersecurity', 'Enterprise Software']
    },
    {
      id: 5,
      name: 'Jennifer Law',
      title: 'Partner',
      company: 'Lazard',
      experience: '16+ years',
      deals: 38,
      value: '$7.5B',
      rating: 4.8,
      reviews: 22,
      specialties: ['Manufacturing', 'Industrial', 'Energy'],
      availability: 'Available',
      location: 'Houston, TX',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
      contact: {
        email: 'jennifer.law@lazard.com',
        phone: '+1 (713) 555-0987',
        linkedin: 'linkedin.com/in/jenniferlaw',
        website: 'lazard.com'
      },
      bio: 'Jennifer specializes in industrial and manufacturing M&A transactions. She has extensive experience in complex cross-border deals and has advised on numerous strategic acquisitions.',
      recentDeals: [
        { name: 'ManufacturingCorp Acquisition', value: '$450M', date: '2023' },
        { name: 'IndustrialTech Merger', value: '$320M', date: '2023' },
        { name: 'EnergySolutions Sale', value: '$680M', date: '2022' }
      ],
      certifications: ['CFA', 'Series 7', 'Series 63', 'MBA'],
      languages: ['English', 'German'],
      responseTime: '5 hours',
      successRate: 92,
      avgDealSize: '$280M',
      industries: ['Manufacturing', 'Industrial', 'Energy']
    },
    {
      id: 6,
      name: 'Alex Thompson',
      title: 'Senior Managing Director',
      company: 'Evercore',
      experience: '20+ years',
      deals: 73,
      value: '$18.5B',
      rating: 4.9,
      reviews: 28,
      specialties: ['Cross-border', 'Strategic Advisory', 'Large Cap'],
      availability: 'Limited',
      location: 'New York, NY',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face',
      contact: {
        email: 'alex.thompson@evercore.com',
        phone: '+1 (212) 555-0654',
        linkedin: 'linkedin.com/in/alexthompson',
        website: 'evercore.com'
      },
      bio: 'Alex is a senior M&A advisor with over 20 years of experience in complex cross-border transactions. He has advised on some of the largest deals in recent years and specializes in strategic advisory.',
      recentDeals: [
        { name: 'GlobalTech Acquisition', value: '$2.1B', date: '2023' },
        { name: 'International Merger', value: '$1.8B', date: '2023' },
        { name: 'Strategic Sale', value: '$3.2B', date: '2022' }
      ],
      certifications: ['CFA', 'Series 7', 'Series 63', 'MBA', 'JD'],
      languages: ['English', 'Spanish', 'French'],
      responseTime: '8 hours',
      successRate: 97,
      avgDealSize: '$650M',
      industries: ['Cross-border', 'Strategic', 'Large Cap']
    }
  ];

  const filteredAdvisors = advisors.filter(advisor => {
    const matchesSearch = advisor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         advisor.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         advisor.specialties.some(specialty => specialty.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesSpecialty = selectedFilters.specialty === 'all' || 
                            advisor.specialties.includes(selectedFilters.specialty);
    const matchesAvailability = selectedFilters.availability === 'all' || 
                               advisor.availability.toLowerCase() === selectedFilters.availability;
    
    return matchesSearch && matchesSpecialty && matchesAvailability;
  });

  const sortedAdvisors = [...filteredAdvisors].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'deals':
        return b.deals - a.deals;
      case 'value':
        return parseInt(b.value.replace('$', '').replace('B', '')) - parseInt(a.value.replace('$', '').replace('B', ''));
      case 'experience':
        return parseInt(b.experience.replace('+ years', '')) - parseInt(a.experience.replace('+ years', ''));
      default:
        return b.rating - a.rating;
    }
  });

  const toggleFavorite = (advisorId) => {
    setFavorites(prev => 
      prev.includes(advisorId) 
        ? prev.filter(id => id !== advisorId)
        : [...prev, advisorId]
    );
  };

  const renderAdvisorCard = (advisor) => (
    <motion.div
      key={advisor.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all cursor-pointer"
      onClick={() => {
        setSelectedAdvisor(advisor);
        setShowAdvisorModal(true);
      }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start space-x-4">
          <img 
            src={advisor.avatar} 
            alt={advisor.name}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{advisor.name}</h3>
            <p className="text-sm text-gray-600">{advisor.title} at {advisor.company}</p>
            <div className="flex items-center space-x-2 mt-1">
              <div className="flex items-center space-x-1">
                <Star className="text-yellow-400" size={16} />
                <span className="text-sm font-medium">{advisor.rating}</span>
                <span className="text-sm text-gray-500">({advisor.reviews})</span>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                advisor.availability === 'Available' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
              }`}>
                {advisor.availability}
              </span>
            </div>
          </div>
        </div>
        <motion.button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(advisor.id);
          }}
          className={`p-2 rounded-full transition-colors ${
            favorites.includes(advisor.id) ? 'text-red-500 bg-red-50' : 'text-gray-400 hover:text-red-500'
          }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Heart size={16} className={favorites.includes(advisor.id) ? 'fill-current' : ''} />
        </motion.button>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-xs text-gray-500">Experience</p>
          <p className="text-sm font-semibold">{advisor.experience}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Deals Closed</p>
          <p className="text-sm font-semibold">{advisor.deals}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Total Value</p>
          <p className="text-sm font-semibold">{advisor.value}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Location</p>
          <p className="text-sm font-semibold">{advisor.location}</p>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-xs text-gray-500 mb-2">Specialties:</p>
        <div className="flex flex-wrap gap-2">
          {advisor.specialties.slice(0, 3).map((specialty) => (
            <span key={specialty} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
              {specialty}
            </span>
          ))}
          {advisor.specialties.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
              +{advisor.specialties.length - 3}
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Clock size={14} />
          <span>Response: {advisor.responseTime}</span>
        </div>
        <div className="flex items-center space-x-2">
          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              // Contact advisor
            }}
            className="p-1 text-blue-600 hover:text-blue-700"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <MessageSquare size={16} />
          </motion.button>
          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              // View profile
            }}
            className="p-1 text-green-600 hover:text-green-700"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Eye size={16} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );

  const renderAdvisorModal = () => (
    <AnimatePresence>
      {showAdvisorModal && selectedAdvisor && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowAdvisorModal(false)}
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
                  <img 
                    src={selectedAdvisor.avatar} 
                    alt={selectedAdvisor.name}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedAdvisor.name}</h2>
                    <p className="text-gray-600">{selectedAdvisor.title} at {selectedAdvisor.company}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <div className="flex items-center space-x-1">
                        <Star className="text-yellow-400" size={16} />
                        <span className="font-medium">{selectedAdvisor.rating}</span>
                        <span className="text-gray-500">({selectedAdvisor.reviews} reviews)</span>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        selectedAdvisor.availability === 'Available' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {selectedAdvisor.availability}
                      </span>
                    </div>
                  </div>
                </div>
                <motion.button
                  onClick={() => setShowAdvisorModal(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-lg transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X size={20} />
                </motion.button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Bio */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">About</h3>
                <p className="text-gray-700 leading-relaxed">{selectedAdvisor.bio}</p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-blue-50 rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold text-blue-900">{selectedAdvisor.deals}</p>
                  <p className="text-sm text-blue-700">Deals Closed</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold text-green-900">{selectedAdvisor.value}</p>
                  <p className="text-sm text-green-700">Total Value</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold text-purple-900">{selectedAdvisor.successRate}%</p>
                  <p className="text-sm text-purple-700">Success Rate</p>
                </div>
                <div className="bg-orange-50 rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold text-orange-900">{selectedAdvisor.avgDealSize}</p>
                  <p className="text-sm text-orange-700">Avg Deal Size</p>
                </div>
              </div>

              {/* Recent Deals */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Recent Deals</h3>
                <div className="space-y-3">
                  {selectedAdvisor.recentDeals.map((deal, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{deal.name}</p>
                        <p className="text-sm text-gray-600">{deal.date}</p>
                      </div>
                      <span className="font-semibold text-gray-900">{deal.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Mail className="text-gray-400" size={16} />
                      <span className="text-sm">{selectedAdvisor.contact.email}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="text-gray-400" size={16} />
                      <span className="text-sm">{selectedAdvisor.contact.phone}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <MapPin className="text-gray-400" size={16} />
                      <span className="text-sm">{selectedAdvisor.location}</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Globe className="text-gray-400" size={16} />
                      <span className="text-sm">{selectedAdvisor.contact.website}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Users className="text-gray-400" size={16} />
                      <span className="text-sm">{selectedAdvisor.contact.linkedin}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Clock className="text-gray-400" size={16} />
                      <span className="text-sm">Response: {selectedAdvisor.responseTime}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Specialties & Industries */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Specialties</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedAdvisor.specialties.map((specialty) => (
                      <span key={specialty} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Industries</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedAdvisor.industries.map((industry) => (
                      <span key={industry} className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                        {industry}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                <div className="flex items-center space-x-3">
                  <motion.button
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <MessageSquare size={16} />
                    <span>Contact Advisor</span>
                  </motion.button>
                  <motion.button
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Calendar size={16} />
                    <span>Schedule Meeting</span>
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
              placeholder="Search advisors by name, company, or specialty..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={selectedFilters.specialty}
              onChange={(e) => setSelectedFilters({...selectedFilters, specialty: e.target.value})}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Specialties</option>
              {specialties.map(specialty => (
                <option key={specialty} value={specialty}>{specialty}</option>
              ))}
            </select>
            <select
              value={selectedFilters.availability}
              onChange={(e) => setSelectedFilters({...selectedFilters, availability: e.target.value})}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Availability</option>
              <option value="available">Available</option>
              <option value="limited">Limited</option>
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="rating">Sort by Rating</option>
              <option value="deals">Sort by Deals</option>
              <option value="value">Sort by Value</option>
              <option value="experience">Sort by Experience</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <p className="text-gray-600">
          Showing {sortedAdvisors.length} of {advisors.length} advisors
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

      {/* Advisors Grid */}
      <div className={`grid gap-6 ${
        viewMode === 'grid' 
          ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' 
          : 'grid-cols-1'
      }`}>
        {sortedAdvisors.map(renderAdvisorCard)}
      </div>

      {/* Advisor Detail Modal */}
      {renderAdvisorModal()}
    </div>
  );
};

export default Advisors; 