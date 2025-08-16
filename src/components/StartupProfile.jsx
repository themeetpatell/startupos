import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Edit, 
  Save, 
  X, 
  Plus, 
  Users, 
  DollarSign, 
  TrendingUp, 
  Target, 
  Calendar,
  MapPin,
  Globe,
  Mail, 
  Phone, 
  Linkedin, 
  Twitter, 
  Github, 
  Building,
  Award,
  Star,
  ArrowRight,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
  Clock,
  BarChart3,
  PieChart,
  Activity,
  Zap,
  Shield,
  Briefcase,
  GraduationCap,
  Heart,
  MessageSquare,
  Share2,
  Download,
  Upload
} from 'lucide-react';
import '../App.css';

const StartupProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('hub');
  const [showTeamModal, setShowTeamModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [showConnectionModal, setShowConnectionModal] = useState(false);
  const [selectedConnection, setSelectedConnection] = useState(null);

  const tabs = [
    { id: 'hub', label: 'Startup Hub', icon: Building },
    { id: 'team', label: 'Team Network', icon: Users },
    { id: 'ecosystem', label: 'Ecosystem', icon: Globe },
    { id: 'funding', label: 'Funding Hub', icon: DollarSign },
    { id: 'milestones', label: 'Achievements', icon: Award },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'connections', label: 'Connections', icon: Share2 }
  ];

  const companyData = {
    name: 'TechFlow Solutions',
            tagline: 'Revolutionizing enterprise automation for enterprises',
    description: 'TechFlow Solutions is a leading enterprise automation platform that helps companies streamline their operations, reduce manual work, and increase productivity. Our AI-powered platform has been adopted by over 500 enterprise customers worldwide.',
    industry: 'SaaS / Enterprise Software',
    founded: '2020',
    location: 'San Francisco, CA',
    website: 'https://techflow.com',
    employees: 85,
    stage: 'Series B',
    valuation: '$45M',
    revenue: '$12.5M',
    customers: 500,
    logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=150&h=150&fit=crop',
    social: {
      linkedin: 'https://linkedin.com/company/techflow',
      twitter: 'https://twitter.com/techflow',
      github: 'https://github.com/techflow'
    }
  };

  const teamMembers = [
      {
        id: 1,
        name: 'Sarah Chen',
      role: 'CEO & Co-Founder',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      email: 'sarah@techflow.com',
        linkedin: 'https://linkedin.com/in/sarahchen',
      skills: ['Leadership', 'Product Strategy', 'Sales'],
      equity: '25%',
      joined: '2020',
      bio: 'Former VP of Product at Google. Led teams of 100+ engineers. Expert in B2B SaaS growth.',
      achievements: ['Raised $25M Series B', '500+ enterprise customers', 'Team of 85 employees']
      },
      {
        id: 2,
      name: 'Michael Rodriguez',
      role: 'CTO & Co-Founder',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      email: 'michael@techflow.com',
      linkedin: 'https://linkedin.com/in/michaelrodriguez',
      skills: ['Engineering', 'Architecture', 'AI/ML'],
      equity: '20%',
      joined: '2020',
      bio: 'Former Senior Engineer at Facebook. Built scalable systems serving millions of users.',
      achievements: ['Built core platform', '99.9% uptime', 'AI-powered automation']
      },
      {
        id: 3,
      name: 'Emily Johnson',
      role: 'VP of Sales',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      email: 'emily@techflow.com',
      linkedin: 'https://linkedin.com/in/emilyjohnson',
      skills: ['Sales', 'Enterprise', 'Customer Success'],
      equity: '5%',
      joined: '2021',
      bio: 'Former Director of Sales at Salesforce. Expert in enterprise sales and customer success.',
      achievements: ['$12.5M ARR', '500+ customers', '95% retention rate']
    }
  ];

  const fundingHistory = [
    {
      id: 1,
      round: 'Seed',
      amount: '$2M',
      date: '2020-03',
      investors: ['Y Combinator', 'Sequoia Capital'],
      valuation: '$8M',
      use: 'Product development and initial team'
    },
    {
      id: 2,
      round: 'Series A',
      amount: '$8M',
      date: '2021-06',
      investors: ['Andreessen Horowitz', 'Sequoia Capital'],
      valuation: '$32M',
      use: 'Team expansion and market expansion'
    },
    {
      id: 3,
      round: 'Series B',
      amount: '$25M',
      date: '2023-01',
      investors: ['Tiger Global', 'Andreessen Horowitz'],
      valuation: '$45M',
      use: 'Product development and international expansion'
    }
  ];

  const milestones = [
      {
        id: 1,
        title: 'Company Founded',
      date: '2020-01-15',
      description: 'TechFlow Solutions officially incorporated',
      category: 'company',
      achieved: true
      },
      {
        id: 2,
      title: 'First Customer',
      date: '2020-06-20',
      description: 'Secured first enterprise customer - $50K ARR',
      category: 'business',
      achieved: true
      },
      {
        id: 3,
        title: 'Series A Funding',
      date: '2021-06-15',
      description: 'Raised $8M Series A led by Andreessen Horowitz',
      category: 'funding',
      achieved: true
      },
      {
        id: 4,
      title: '100 Customers',
      date: '2022-03-10',
      description: 'Reached 100 enterprise customers milestone',
      category: 'business',
      achieved: true
      },
      {
        id: 5,
      title: 'Series B Funding',
      date: '2023-01-20',
      description: 'Raised $25M Series B at $45M valuation',
      category: 'funding',
      achieved: true
      },
      {
        id: 6,
      title: '500 Customers',
      date: '2023-12-01',
      description: 'Reached 500 enterprise customers',
      category: 'business',
      achieved: true
    },
    {
      id: 7,
      title: 'IPO Preparation',
      date: '2024-06-01',
      description: 'Begin IPO preparation process',
      category: 'company',
      achieved: false
    }
  ];

  const metrics = {
    revenue: {
      current: '$12.5M',
      growth: '+127%',
      target: '$15M',
      progress: 83
    },
    customers: {
      current: 500,
      growth: '+89%',
      target: 600,
      progress: 83
    },
    retention: {
      current: '95%',
      growth: '+2%',
      target: '96%',
      progress: 83
    },
    burnRate: {
      current: '$2.8M',
      growth: '-15%',
      target: '$2.5M',
      progress: 89
    }
  };

  const renderHub = () => (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg p-8 text-white">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-6">
            <img 
              src={companyData.logo} 
              alt={companyData.name}
              className="w-24 h-24 rounded-xl object-cover border-4 border-white/20"
            />
            <div>
              <h2 className="text-3xl font-bold mb-2">{companyData.name}</h2>
              <p className="text-xl text-blue-100 mb-4">{companyData.tagline}</p>
              <div className="flex items-center space-x-6 text-blue-100">
                <div className="flex items-center space-x-2">
                  <MapPin size={18} />
                  <span>{companyData.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar size={18} />
                  <span>Founded {companyData.founded}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users size={18} />
                  <span>{companyData.employees} employees</span>
                </div>
              </div>
            </div>
          </div>
          <motion.button
            onClick={() => setIsEditing(!isEditing)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-all"
          >
            {isEditing ? <Save size={16} /> : <Edit size={16} />}
            <span>{isEditing ? 'Save' : 'Edit'}</span>
          </motion.button>
        </div>
              </div>
              
      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <DollarSign className="text-blue-600" size={24} />
            </div>
            <span className="text-sm font-medium text-green-600">+127%</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">{companyData.valuation}</h3>
          <p className="text-sm text-gray-600">Valuation</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
              <TrendingUp className="text-green-600" size={24} />
            </div>
            <span className="text-sm font-medium text-green-600">+89%</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">{companyData.revenue}</h3>
          <p className="text-sm text-gray-600">Revenue</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
              <Users className="text-purple-600" size={24} />
            </div>
            <span className="text-sm font-medium text-green-600">+156%</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">{companyData.customers}</h3>
          <p className="text-sm text-gray-600">Customers</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center">
              <Zap className="text-orange-600" size={24} />
            </div>
            <span className="text-sm font-medium text-green-600">95%</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">Retention</h3>
          <p className="text-sm text-gray-600">Customer Success</p>
        </motion.div>
      </div>

      {/* About & Mission */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center space-x-2">
            <Building size={20} />
            <span>About</span>
          </h3>
          <p className="text-gray-600 leading-relaxed">{companyData.description}</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center space-x-2">
            <Target size={20} />
            <span>Mission</span>
          </h3>
          <p className="text-gray-600 leading-relaxed">
            To democratize enterprise automation for enterprises of all sizes, enabling teams to focus on what matters most while our AI handles the rest.
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex flex-col items-center space-y-2 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all"
          >
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <Users className="text-blue-600" size={24} />
            </div>
            <span className="text-sm font-medium">Team</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex flex-col items-center space-y-2 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all"
          >
            <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
              <DollarSign className="text-green-600" size={24} />
        </div>
            <span className="text-sm font-medium">Funding</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex flex-col items-center space-y-2 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all"
          >
            <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
              <Globe className="text-purple-600" size={24} />
                </div>
            <span className="text-sm font-medium">Ecosystem</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex flex-col items-center space-y-2 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all"
          >
            <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center">
              <Share2 className="text-orange-600" size={24} />
              </div>
            <span className="text-sm font-medium">Connect</span>
          </motion.button>
              </div>
      </div>
    </div>
  );

  const renderTeam = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Team Management</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all flex items-center space-x-2"
        >
          <Plus size={16} />
          <span>Add Member</span>
        </motion.button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {teamMembers.map((member) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all cursor-pointer"
            onClick={() => {
              setSelectedMember(member);
              setShowTeamModal(true);
            }}
          >
            <div className="flex items-start space-x-4">
              <img 
                src={member.avatar} 
                alt={member.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{member.role}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">{member.equity} equity</span>
                  <span className="text-gray-500">Joined {member.joined}</span>
                </div>
                <div className="mt-3 flex flex-wrap gap-1">
                  {member.skills.slice(0, 3).map((skill) => (
                    <span key={skill} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Team Modal */}
      <AnimatePresence>
        {showTeamModal && selectedMember && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-start space-x-4">
                    <img 
                      src={selectedMember.avatar} 
                      alt={selectedMember.name}
                      className="w-20 h-20 rounded-full object-cover"
                    />
                  <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-1">{selectedMember.name}</h2>
                      <p className="text-lg text-gray-600 mb-2">{selectedMember.role}</p>
                      <p className="text-sm text-gray-500">{selectedMember.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowTeamModal(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Bio</h3>
                    <p className="text-gray-600">{selectedMember.bio}</p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Key Achievements</h3>
                    <ul className="space-y-2">
                      {selectedMember.achievements.map((achievement, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <CheckCircle className="text-green-600" size={16} />
                          <span className="text-gray-600">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedMember.skills.map((skill) => (
                        <span key={skill} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                          {skill}
                  </span>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Equity</p>
                      <p className="font-semibold">{selectedMember.equity}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Joined</p>
                      <p className="font-semibold">{selectedMember.joined}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );

  const renderFunding = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Funding History</h2>
        <div className="space-y-4">
          {fundingHistory.map((round, index) => (
            <motion.div
              key={round.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                  {round.round.charAt(0)}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{round.round} Round</h3>
                  <p className="text-sm text-gray-600">{round.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-gray-900">{round.amount}</p>
                <p className="text-sm text-gray-600">Valuation: {round.valuation}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderMilestones = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Company Milestones</h2>
        <div className="space-y-4">
          {milestones.map((milestone, index) => (
            <motion.div
              key={milestone.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`flex items-center space-x-4 p-4 rounded-lg ${
                milestone.achieved ? 'bg-green-50 border border-green-200' : 'bg-gray-50 border border-gray-200'
              }`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                milestone.achieved ? 'bg-green-600' : 'bg-gray-400'
              }`}>
                {milestone.achieved ? (
                  <CheckCircle className="text-white" size={20} />
                ) : (
                  <Clock className="text-white" size={20} />
                )}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{milestone.title}</h3>
                <p className="text-sm text-gray-600">{milestone.description}</p>
                <p className="text-xs text-gray-500 mt-1">{milestone.date}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                milestone.category === 'company' ? 'bg-blue-100 text-blue-800' :
                milestone.category === 'business' ? 'bg-green-100 text-green-800' :
                'bg-purple-100 text-purple-800'
              }`}>
                {milestone.category}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderMetrics = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(metrics).map(([key, metric]) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900 capitalize">{key.replace(/([A-Z])/g, ' $1')}</h3>
              <span className={`text-sm font-medium ${
                metric.growth.startsWith('+') ? 'text-green-600' : 'text-red-600'
              }`}>
                {metric.growth}
              </span>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-gray-900">{metric.current}</span>
                <span className="text-sm text-gray-500">Target: {metric.target}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all"
                  style={{ width: `${metric.progress}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500">Progress: {metric.progress}%</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderEcosystem = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Ecosystem Partners</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <Building className="text-white" size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">VCs & Accelerators</h3>
                <p className="text-sm text-gray-600">847 top-tier firms</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Andreessen Horowitz</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">Partner</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Sequoia Capital</span>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Investor</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Y Combinator</span>
                <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">Alumni</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                <Zap className="text-white" size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Tools & Services</h3>
                <p className="text-sm text-gray-600">1,247 startup tools</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">AWS</span>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Partner</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Stripe</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">Integration</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Notion</span>
                <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">Tool</span>
              </div>
            </div>
          </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200"
      >
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                <Users className="text-white" size={24} />
              </div>
        <div>
                <h3 className="font-semibold text-gray-900">Communities</h3>
                <p className="text-sm text-gray-600">423 startup networks</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Startup Grind</span>
                <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">Member</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">TechCrunch</span>
                <span className="text-xs bg-pink-100 text-pink-800 px-2 py-1 rounded-full">Featured</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Product Hunt</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">Launch</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );

  const renderConnections = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Network Connections</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all flex items-center space-x-2"
        >
          <Plus size={16} />
            <span>Add Connection</span>
        </motion.button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              name: 'Sarah Johnson',
              role: 'CEO at DataFlow',
              avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
              type: 'Founder',
              mutual: 12,
              lastContact: '2 days ago'
            },
            {
              name: 'Michael Chen',
              role: 'Partner at Sequoia',
              avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
              type: 'Investor',
              mutual: 8,
              lastContact: '1 week ago'
            },
            {
              name: 'Emily Rodriguez',
              role: 'CTO at CloudTech',
              avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
              type: 'Technical',
              mutual: 15,
              lastContact: '3 days ago'
            }
          ].map((connection, index) => (
              <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-all cursor-pointer"
              onClick={() => {
                setSelectedConnection(connection);
                setShowConnectionModal(true);
              }}
            >
              <div className="flex items-start space-x-3">
                <img 
                  src={connection.avatar} 
                  alt={connection.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{connection.name}</h3>
                  <p className="text-sm text-gray-600">{connection.role}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      connection.type === 'Founder' ? 'bg-blue-100 text-blue-800' :
                      connection.type === 'Investor' ? 'bg-green-100 text-green-800' :
                      'bg-purple-100 text-purple-800'
                    }`}>
                      {connection.type}
                    </span>
                    <span className="text-xs text-gray-500">{connection.mutual} mutual</span>
                  </div>
                </div>
                      </div>
            </motion.div>
          ))}
                        </div>
                      </div>

      {/* Connection Modal */}
      <AnimatePresence>
        {showConnectionModal && selectedConnection && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-xl shadow-xl max-w-md w-full"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-start space-x-4">
                    <img 
                      src={selectedConnection.avatar} 
                      alt={selectedConnection.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 mb-1">{selectedConnection.name}</h2>
                      <p className="text-gray-600">{selectedConnection.role}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowConnectionModal(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-600">Mutual Connections</span>
                    <span className="font-semibold">{selectedConnection.mutual}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-600">Last Contact</span>
                    <span className="font-semibold">{selectedConnection.lastContact}</span>
                  </div>
                </div>

                <div className="flex space-x-3 mt-6">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all"
                  >
                    Message
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-50 transition-all"
                  >
                    Schedule Call
                  </motion.button>
        </div>
      </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );

  const renderCurrentTab = () => {
    switch (activeTab) {
      case 'hub':
        return renderHub();
      case 'team':
        return renderTeam();
      case 'ecosystem':
        return renderEcosystem();
      case 'funding':
        return renderFunding();
      case 'milestones':
        return renderMilestones();
      case 'analytics':
        return renderMetrics();
      case 'connections':
        return renderConnections();
      default:
        return renderHub();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold startupos-gradient-text mb-2">Startup Hub</h1>
          <p className="text-gray-600 text-lg">
            Digital workspace for startups and teams - 100x better than LinkedIn/Crunchbase
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-2 mb-8">
          <div className="flex space-x-1 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-all duration-200 whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-sm'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon size={18} />
                  <span className="font-medium">{tab.label}</span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderCurrentTab()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default StartupProfile;

