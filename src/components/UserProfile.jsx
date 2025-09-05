import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Settings, Edit3, Save, X, Upload, Camera, Mail, Phone, MapPin, 
  Calendar, Globe, Linkedin, Twitter, Github, ExternalLink, Shield, Key, 
  Bell, BellOff, Eye, EyeOff, Lock, Unlock, Trash2, Download, Share2, 
  Copy, Check, AlertCircle, Info, Star, Award, Briefcase, GraduationCap, 
  Target, TrendingUp, Activity, BarChart3, PieChart, Clock, Users, 
  MessageSquare, FileText, Folder, Tag, Hash, AtSign, Plus, Minus, 
  ChevronRight, ChevronDown, MoreHorizontal, Palette, Monitor, Smartphone, 
  Tablet, Moon, Sun, Volume2, VolumeX, Wifi, WifiOff, Database, Server, 
  Cloud, HardDrive, Zap, Brain, Rocket, Building, DollarSign, Lightbulb,
  Heart, MessageCircle, Target as TargetIcon, TrendingUp as TrendingUpIcon,
  Users as UsersIcon, Building as BuildingIcon, DollarSign as DollarSignIcon,
  Calendar as CalendarIcon, MapPin as MapPinIcon, Star as StarIcon,
  Eye as EyeIcon, Plus as PlusIcon, ArrowRight, CheckCircle, AlertCircle as AlertCircleIcon,
  Lock as LockIcon, BarChart3 as BarChart3Icon, FileText as FileTextIcon,
  Briefcase as BriefcaseIcon, Globe as GlobeIcon, Zap as ZapIcon, Search,
  Filter, Bookmark, BookmarkPlus, ThumbsUp, Grid3X3, Grid, List, Play,
  Pause, MoreVertical, Code, Store, MessageCircle as MessageCircleIcon,
  Brain as BrainIcon, Rocket as RocketIcon, Shield as ShieldIcon,
  Lightbulb as LightbulbIcon, Heart as HeartIcon, Target as TargetIcon2,
  TrendingUp as TrendingUpIcon2, Users as UsersIcon2, Building as BuildingIcon2,
  DollarSign as DollarSignIcon2, Calendar as CalendarIcon2, MapPin as MapPinIcon2,
  Star as StarIcon2, Eye as EyeIcon2, Plus as PlusIcon2, ArrowRight as ArrowRightIcon,
  CheckCircle as CheckCircleIcon2, AlertCircle as AlertCircleIcon2,
  Lock as LockIcon2, BarChart3 as BarChart3Icon2, FileText as FileTextIcon2,
  Briefcase as BriefcaseIcon2, Globe as GlobeIcon2, Zap as ZapIcon2,
  Search as SearchIcon, Filter as FilterIcon, Bookmark as BookmarkIcon,
  BookmarkPlus as BookmarkPlusIcon, ThumbsUp as ThumbsUpIcon, Grid3X3 as Grid3X3Icon,
  Grid as GridIcon, List as ListIcon, Play as PlayIcon, Pause as PauseIcon,
  MoreVertical as MoreVerticalIcon, Code as CodeIcon, Store as StoreIcon
} from 'lucide-react';
import '../App.css';

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [viewMode, setViewMode] = useState('startupos');
  const [showAIInsights, setShowAIInsights] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [createType, setCreateType] = useState('task');
  const [showCreateModal, setShowCreateModal] = useState(false);



  const tabs = [
    { id: 'overview', label: 'StartupOS Profile', icon: User, color: 'blue' },
    { id: 'startup', label: 'Startup Portfolio', icon: Building, color: 'green' },
    { id: 'ecosystem', label: 'Ecosystem Impact', icon: Globe, color: 'purple' },
    { id: 'ai-tools', label: 'AI Tools Created', icon: Brain, color: 'orange' },

    { id: 'network', label: 'Startup Network', icon: Users, color: 'indigo' },
    { id: 'achievements', label: 'Achievements', icon: Award, color: 'yellow' },
    { id: 'analytics', label: 'Profile Analytics', icon: BarChart3, color: 'red' },
    { id: 'settings', label: 'Settings', icon: Settings, color: 'gray' }
  ];

  const [userProfile, setUserProfile] = useState({
    // Core Identity
    firstName: 'Meet',
    lastName: 'Patel',
    email: 'meet@biggbizz.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    timezone: 'Pacific Time (PT)',
    bio: 'A part business mind, part startup therapist, and full-time problem-solver. Serial entrepreneur who\'s built and scaled startups from college dorm to serving hundreds of people. Expert in turning chaos into streamlined growth machines.',
    title: 'CEO & Co-founder',
    company: 'Mindmate',
    website: 'https://mindmate.ai',
    avatar: '👩‍💼',
    joinDate: '2023-01-01',
    lastActive: '2 minutes ago',
    
    // StartupOS Specific
    startupStage: 'Series A',
    startupExperience: '8 years',
    industries: ['SaaS', 'AI/ML', 'Enterprise Software'],
    startupRoles: ['Founder', 'CEO', 'CTO', 'Product Lead'],
    fundingRaised: '$15.2M',
    exits: 2,
    teamSize: 45,
    
    // Skills & Expertise
    skills: ['Product Management', 'Growth Strategy', 'Team Building', 'Fundraising', 'AI Integration'],
    interests: ['Growth and Branding', 'Startup Ecosystem', 'Product Innovation', 'AI Tools', 'M&A'],
    
    // Social & Professional
    social: {
      linkedin: 'https://linkedin.com/in/themeetpatel',
      twitter: 'https://twitter.com/the_meetpatel',
      github: 'https://github.com/themeetpatel'
    },
    
    // StartupOS Achievements
    achievements: [
      { title: 'StartupOS Pioneer', description: 'Early adopter and power user', icon: '🚀', category: 'platform' },
      { title: 'AI Tool Creator', description: 'Built 15+ AI-powered tools', icon: '🤖', category: 'ai' },
      { title: 'Ecosystem Connector', description: 'Connected 200+ startups', icon: '🌐', category: 'network' },

      { title: 'M&A Expert', description: 'Completed 3 successful acquisitions', icon: '💼', category: 'm&a' },
      { title: 'Team Builder', description: 'Built teams of 100+ members', icon: '👥', category: 'leadership' }
    ],
    
    // StartupOS Stats
    stats: {
      projectsCompleted: 18,
      teamMembers: 45,
      successRate: 96.8,
      aiToolsBuilt: 15,
      startupsConnected: 200,
      dealsFacilitated: 12,
      ecosystemScore: 94.2
    },
    
    // Startup Portfolio
    startups: [
      {
        name: 'Mindmate',
        role: 'CEO & Co-founder',
        stage: 'Series A',
        description: 'AI-powered mental health platform',
        equity: '45%',
        status: 'active',
        valuation: '$25M',
        teamSize: 45,
        funding: '$8.2M'
      },
      {
        name: 'TechFlow',
        role: 'CTO',
        stage: 'Acquired',
        description: 'Enterprise automation platform',
        equity: '15%',
        status: 'exited',
        exitValue: '$45M',
        teamSize: 85,
        funding: '$12.5M'
      }
    ],
    
    // AI Tools Created
    aiTools: [
      {
        name: 'Growth Analytics AI',
        category: 'Analytics',
        downloads: 1250,
        rating: 4.8,
        description: 'AI-powered growth metrics analyzer',
        status: 'published'
      },
      {
        name: 'Team Performance AI',
        category: 'HR',
        downloads: 890,
        rating: 4.6,
        description: 'AI-driven team productivity insights',
        status: 'published'
      }
    ],
    
    // Network Connections
    connections: {
      founders: 150,
      investors: 45,
      advisors: 23,
      mentors: 12,
      startups: 200,
      corporates: 35
    }
  });



  const [projects, setProjects] = useState([
    {
      id: 1,
              name: 'AI Automation Engine',
        description: 'Build next-generation AI-powered automation platform',
      status: 'in-progress',
      priority: 'high',
      startDate: '2024-01-15',
      endDate: '2024-06-30',
      progress: 65,
      budget: '$250K',
      spent: '$162K',
      team: ['Meet Patel', 'Sarah Chen', 'Mike Rodriguez', 'Dev Team'],
      
      tasks: [1, 2, 3]
    },
    {
      id: 2,
      name: 'Mobile App Launch',
      description: 'Launch mobile app for iOS and Android platforms',
      status: 'completed',
      priority: 'medium',
      startDate: '2023-10-01',
      endDate: '2024-01-25',
      progress: 100,
      budget: '$120K',
      spent: '$118K',
      team: ['Meet Patel', 'Design Team', 'Mobile Devs'],
      
      tasks: [4, 5]
    },
    {
      id: 3,
      name: 'Customer Portal',
      description: 'Build customer self-service portal with analytics',
      status: 'planning',
      priority: 'medium',
      startDate: '2024-02-01',
      endDate: '2024-05-31',
      progress: 15,
      budget: '$180K',
      spent: '$27K',
      team: ['Meet Patel', 'UX Team', 'Backend Devs'],
      
      tasks: [6, 7, 8]
    }
  ]);

  const [tasks, setTasks] = useState([
    {
      id: 1,
      name: 'Implement AI model training pipeline',
      description: 'Set up automated ML model training and validation pipeline',
      status: 'in-progress',
      priority: 'high',
              project: 'AI Automation Engine',
      assignee: 'Mike Rodriguez',
      dueDate: '2024-02-05',
      estimatedHours: 16,
      actualHours: 12,
      dependencies: ['Data preprocessing', 'Model architecture'],
      subtasks: [
        { id: 1, name: 'Set up training environment', completed: true },
        { id: 2, name: 'Implement data pipeline', completed: true },
        { id: 3, name: 'Create validation framework', completed: false },
        { id: 4, name: 'Set up monitoring', completed: false }
      ],
      tags: ['AI', 'ML', 'Pipeline']
    },
    {
      id: 2,
      name: 'Design mobile app onboarding flow',
      description: 'Create user-friendly onboarding experience for mobile app',
      status: 'completed',
      priority: 'medium',
      project: 'Mobile App Launch',
      assignee: 'Sarah Chen',
      dueDate: '2024-01-25',
      estimatedHours: 8,
      actualHours: 6,
      dependencies: ['User research'],
      subtasks: [
        { id: 1, name: 'User research', completed: true },
        { id: 2, name: 'Wireframes', completed: true },
        { id: 3, name: 'UI design', completed: true }
      ],
      tags: ['Design', 'UX', 'Mobile']
    },
    {
      id: 3,
      name: 'Set up customer feedback system',
      description: 'Implement automated customer feedback collection and analysis',
      status: 'pending',
      priority: 'medium',
      project: 'Customer Portal',
      assignee: 'Meet Patel',
      dueDate: '2024-02-10',
      estimatedHours: 12,
      actualHours: 0,
      dependencies: ['Portal infrastructure'],
      subtasks: [
        { id: 1, name: 'Design feedback forms', completed: false },
        { id: 2, name: 'Set up database', completed: false },
        { id: 3, name: 'Implement analytics', completed: false },
        { id: 4, name: 'Create dashboard', completed: false },
        { id: 5, name: 'Test integration', completed: false }
      ],
      tags: ['Feedback', 'Analytics', 'Portal']
    }
  ]);

  const [templates, setTemplates] = useState([
    {
      id: 1,
      name: 'Startup Launch Template',
      description: 'Complete template for launching a new startup',
      category: 'Startup',
      projects: 8,
      tasks: 45,
      usage: 156,
      rating: 4.8,
      author: 'Meet Patel',
      lastUpdated: '2024-01-20',
              tags: ['startup', 'launch']
    },
    {
      id: 2,
      name: 'Product Development Sprint',
      description: 'Agile sprint template for product development teams',
      category: 'Product',

      projects: 4,
      tasks: 28,
      usage: 89,
      rating: 4.6,
      author: 'Sarah Chen',
      lastUpdated: '2024-01-18',
      tags: ['agile', 'sprint', 'product']
    },
    {
      id: 3,
      name: 'Customer Success Operations',
              description: 'End-to-end customer success template',
      category: 'Customer Success',
      projects: 5,
      tasks: 32,
      usage: 234,
      rating: 4.9,
      author: 'Mike Rodriguez',
      lastUpdated: '2024-01-22',
      tags: ['customer', 'success', 'operations']
    }
  ]);

  const [preferences, setPreferences] = useState({
    theme: 'light',
    language: 'en',
    profileVisibility: 'ecosystem',
    dataSharing: true,
    aiInsights: true,
    notifications: {
      startupUpdates: true,
      networkActivity: true,
      aiRecommendations: true,
      ecosystemNews: true
    }
  });

  const handleProfileUpdate = (field, value) => {
    setUserProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-2xl p-8 text-white relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-4xl border-2 border-white/30">
                  {userProfile.avatar}
                </div>
                <motion.button
                  className="absolute -bottom-2 -right-2 w-10 h-10 bg-white text-blue-600 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors shadow-lg"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Camera size={18} />
                </motion.button>
              </div>
              <div>
                <h1 className="text-4xl font-bold mb-2">{userProfile.firstName} {userProfile.lastName}</h1>
                <p className="text-xl text-blue-100 mb-1">{userProfile.title}</p>
                <p className="text-lg text-blue-100">{userProfile.company}</p>
                <div className="flex items-center space-x-4 mt-3 text-sm">
                  <div className="flex items-center space-x-2 bg-white/20 px-3 py-1 rounded-full">
                    <MapPin size={14} />
                    <span>{userProfile.location}</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-white/20 px-3 py-1 rounded-full">
                    <Calendar size={14} />
                    <span>StartupOS since {userProfile.joinDate}</span>
                  </div>
                </div>
              </div>
            </div>
            <motion.button
              onClick={() => setIsEditing(!isEditing)}
              className="bg-white/20 backdrop-blur-sm text-white border border-white/30 px-6 py-3 rounded-xl hover:bg-white/30 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isEditing ? <Save size={18} className="mr-2" /> : <Edit3 size={18} className="mr-2" />}
              {isEditing ? 'Save Changes' : 'Edit Profile'}
            </motion.button>
          </div>
          
          {/* Bio */}
          <div className="mb-6">
            <p className="text-lg text-blue-100 leading-relaxed">{userProfile.bio}</p>
          </div>
        </div>
      </motion.div>

      {/* StartupOS Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
          <div className="flex items-center justify-between mb-2">
            <div className="text-3xl font-bold text-blue-600">{userProfile.stats.ecosystemScore}</div>
            <div className="text-2xl">🏆</div>
          </div>
          <div className="text-sm text-blue-700 font-medium">Ecosystem Score</div>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
          <div className="flex items-center justify-between mb-2">
            <div className="text-3xl font-bold text-green-600">{userProfile.stats.aiToolsBuilt}</div>
            <div className="text-2xl">🤖</div>
          </div>
          <div className="text-sm text-green-700 font-medium">AI Tools Built</div>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200">
          <div className="flex items-center justify-between mb-2">
            <div className="text-3xl font-bold text-purple-600">{userProfile.stats.startupsConnected}</div>
            <div className="text-2xl">🌐</div>
          </div>
          <div className="text-sm text-purple-700 font-medium">Startups Connected</div>
        </div>
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl border border-orange-200">
          <div className="flex items-center justify-between mb-2">
            <div className="text-3xl font-bold text-orange-600">{userProfile.stats.successRate}%</div>
            <div className="text-2xl">📈</div>
          </div>
          <div className="text-sm text-orange-700 font-medium">Success Rate</div>
        </div>
      </motion.div>

      {/* StartupOS Achievements */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">StartupOS Achievements</h3>
          <button className="text-blue-600 hover:text-blue-700 font-medium">View All</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {userProfile.achievements.slice(0, 6).map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center space-x-3 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg hover:shadow-md transition-all"
            >
              <div className="text-2xl">{achievement.icon}</div>
              <div>
                <h4 className="font-medium text-gray-900">{achievement.title}</h4>
                <p className="text-sm text-gray-600">{achievement.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* AI Insights Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-200 p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
              <Brain className="text-white" size={20} />
            </div>
            <h3 className="text-xl font-bold text-gray-900">AI-Powered Insights</h3>
          </div>
          <motion.button
            onClick={() => setShowAIInsights(!showAIInsights)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {showAIInsights ? 'Hide' : 'Show'} Insights
          </motion.button>
        </div>
        
        {showAIInsights && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg border border-indigo-200">
                <h4 className="font-medium text-gray-900 mb-2">🚀 Growth Opportunity</h4>
                <p className="text-sm text-gray-600">Based on your profile, you could expand into the fintech space. 78% of founders with your background succeed in this sector.</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-indigo-200">
                <h4 className="font-medium text-gray-900 mb-2">🤝 Network Expansion</h4>
                <p className="text-sm text-gray-600">You have strong connections in SaaS but could benefit from more healthcare startup connections for Mindmate.</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-indigo-200">
                <h4 className="font-medium text-gray-900 mb-2">💡 AI Tool Potential</h4>
        
              </div>
              <div className="bg-white p-4 rounded-lg border border-indigo-200">
                <h4 className="font-medium text-gray-900 mb-2">📊 Performance Trend</h4>
                <p className="text-sm text-gray-600">Your ecosystem score has increased 12% this quarter, putting you in the top 5% of StartupOS users.</p>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );

  const renderStartupPortfolio = () => (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">Startup Portfolio</h3>
          <motion.button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus size={16} />
            <span>Add Startup</span>
          </motion.button>
        </div>
        
        <div className="space-y-4">
          {userProfile.startups.map((startup, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <h4 className="text-xl font-bold text-gray-900">{startup.name}</h4>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      startup.status === 'active' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-blue-100 text-blue-700'
                    }`}>
                      {startup.status === 'active' ? 'Active' : 'Exited'}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-3">{startup.description}</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <div className="text-sm text-gray-500">Role</div>
                      <div className="font-medium">{startup.role}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Stage</div>
                      <div className="font-medium">{startup.stage}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Equity</div>
                      <div className="font-medium">{startup.equity}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Team Size</div>
                      <div className="font-medium">{startup.teamSize}</div>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-600 mb-1">
                    {startup.status === 'active' ? startup.valuation : startup.exitValue}
                  </div>
                  <div className="text-sm text-gray-500">
                    {startup.status === 'active' ? 'Current Valuation' : 'Exit Value'}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );

  const renderEcosystemImpact = () => (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      >
        <h3 className="text-xl font-bold text-gray-900 mb-6">Ecosystem Impact</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Network Reach</h4>
            <div className="space-y-3">
              {Object.entries(userProfile.connections).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="capitalize text-gray-700">{key}</span>
                  <span className="font-bold text-blue-600">{value}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Industry Influence</h4>
            <div className="space-y-3">
              {userProfile.industries.map((industry, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-700">{industry}</span>
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${Math.random() * 40 + 60}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );

  const renderAITools = () => (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">AI Tools Created</h3>
          <motion.button
            className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Brain size={16} />
            <span>Create New Tool</span>
          </motion.button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {userProfile.aiTools.map((tool, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <h4 className="text-lg font-bold text-gray-900">{tool.name}</h4>
                <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium">
                  {tool.category}
                </span>
              </div>
              <p className="text-gray-600 mb-4">{tool.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Download size={14} className="text-gray-400" />
                    <span className="text-sm text-gray-600">{tool.downloads}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star size={14} className="text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600">{tool.rating}</span>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  tool.status === 'published' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {tool.status}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );







  const renderTasks = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      {/* Search and Filter */}
      <div className="flex items-center space-x-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <motion.button
          onClick={() => {
            setCreateType('task');
            setShowCreateModal(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Plus size={16} />
          <span>New Task</span>
        </motion.button>
      </div>

      <div className="text-sm text-gray-500 mb-4">{tasks.length} tasks</div>

      {/* Tasks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tasks
          .filter(t => 
            (statusFilter === 'all' || t.status === statusFilter) &&
            (searchQuery === '' || t.name.toLowerCase().includes(searchQuery.toLowerCase()))
          )
          .map((task) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <h4 className="text-lg font-bold text-gray-900">{task.name}</h4>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    task.priority === 'high' ? 'bg-red-100 text-red-700' :
                    task.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {task.priority}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    task.status === 'completed' ? 'bg-green-100 text-green-700' :
                    task.status === 'in-progress' ? 'bg-blue-100 text-blue-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {task.status}
                  </span>
                </div>
              </div>
              
              <p className="text-gray-600 text-sm mb-4">{task.description}</p>
              
              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Project:</span>
                  <span className="text-blue-600 font-medium">{task.project}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Assignee:</span>
                  <span className="font-medium">{task.assignee}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Due Date:</span>
                  <span className="font-medium">{task.dueDate}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Hours:</span>
                  <span className="font-medium">{task.actualHours}/{task.estimatedHours}h</span>
                </div>
              </div>

              {task.dependencies && task.dependencies.length > 0 && (
                <div className="mb-4">
                  <div className="text-sm text-gray-500 mb-2">Dependencies:</div>
                  <div className="flex flex-wrap gap-1">
                    {task.dependencies.map((dep, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                        {dep}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="mb-4">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-gray-500">Subtasks</span>
                  <span className="font-medium">
                    {task.subtasks.filter(s => s.completed).length}/{task.subtasks.length} completed
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-600 h-2 rounded-full transition-all duration-300" 
                    style={{ 
                      width: `${(task.subtasks.filter(s => s.completed).length / task.subtasks.length) * 100}%` 
                    }}
                  ></div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button className="flex-1 bg-blue-50 text-blue-600 px-3 py-2 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium">
                  Start
                </button>
                <button className="flex-1 bg-green-50 text-green-600 px-3 py-2 rounded-lg hover:bg-green-100 transition-colors text-sm font-medium">
                  Complete
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                  <MoreHorizontal size={16} />
                </button>
              </div>
            </motion.div>
          ))}
      </div>
    </motion.div>
  );

  const renderTemplates = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      {/* Search and Filter */}
      <div className="flex items-center space-x-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">All Categories</option>
          <option value="Startup">Startup</option>
          <option value="Product">Product</option>
          <option value="Customer Success">Customer Success</option>
        </select>
        <motion.button
          onClick={() => {
            setCreateType('template');
            setShowCreateModal(true);
          }}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Plus size={16} />
          <span>New Template</span>
        </motion.button>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates
          .filter(t => 
            (statusFilter === 'all' || t.category === statusFilter) &&
            (searchQuery === '' || t.name.toLowerCase().includes(searchQuery.toLowerCase()))
          )
          .map((template) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <h4 className="text-lg font-bold text-gray-900">{template.name}</h4>
                <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                  {template.category}
                </span>
              </div>
              
              <p className="text-gray-600 text-sm mb-4">{template.description}</p>
              
              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between text-sm">
                  
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Projects:</span>
                  <span className="font-medium">{template.projects}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Tasks:</span>
                  <span className="font-medium">{template.tasks}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Usage:</span>
                  <span className="font-medium">{template.usage} times</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Rating:</span>
                  <div className="flex items-center space-x-1">
                    <Star size={14} className="text-yellow-400 fill-current" />
                    <span className="font-medium">{template.rating}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
                <span>By {template.author}</span>
                <span>Updated {template.lastUpdated}</span>
              </div>

              <div className="flex items-center space-x-2">
                <button className="flex-1 bg-purple-50 text-purple-600 px-3 py-2 rounded-lg hover:bg-purple-100 transition-colors text-sm font-medium">
                  Use Template
                </button>
                <button className="flex-1 bg-gray-50 text-gray-600 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors text-sm font-medium">
                  Preview
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                  <MoreHorizontal size={16} />
                </button>
              </div>
            </motion.div>
          ))}
      </div>
    </motion.div>
  );

  const renderCreateModal = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={() => setShowCreateModal(false)}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-xl p-6 w-full max-w-md mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900">
            Create New {createType === 'task' ? 'Task' : 'Template'}
          </h3>
          <button
            onClick={() => setShowCreateModal(false)}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder={`Enter ${createType} name...`}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows={3}
              placeholder={`Enter ${createType} description...`}
            />
          </div>

          {createType === 'task' && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                  <select className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                  <input
                    type="date"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Project</label>
                <select className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="">Select Project</option>
                  {projects.map(project => (
                    <option key={project.id} value={project.id}>{project.name}</option>
                  ))}
                </select>
              </div>
            </>
          )}

          <div className="flex items-center space-x-3 pt-4">
            <button
              onClick={() => setShowCreateModal(false)}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Create {createType === 'task' ? 'Task' : 'Template'}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  const renderCurrentTab = () => {
    switch (activeTab) {
      case 'overview': return renderOverview();
      case 'startup': return renderStartupPortfolio();
      case 'ecosystem': return renderEcosystemImpact();
      case 'ai-tools': return renderAITools();

      case 'network': return <div className="text-center py-12">Network visualization coming soon...</div>;
      case 'achievements': return <div className="text-center py-12">Achievements gallery coming soon...</div>;
      case 'analytics': return <div className="text-center py-12">Profile analytics coming soon...</div>;
      case 'settings': return <div className="text-center py-12">Settings panel coming soon...</div>;
      default: return renderOverview();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-12 h-12 startupos-gradient rounded-xl flex items-center justify-center">
              <User className="text-white" size={24} />
            </div>
            <h1 className="text-4xl font-bold startupos-gradient-text">StartupOS Profile</h1>
          </div>
          <p className="text-gray-600 text-lg">
            Your comprehensive startup ecosystem profile - 100x better than LinkedIn
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sticky top-24">
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <motion.button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-all text-left ${
                        activeTab === tab.id
                          ? 'bg-blue-50 text-blue-600 border border-blue-200'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Icon size={18} />
                      <span>{tab.label}</span>
                    </motion.button>
                  );
                })}
              </nav>
            </div>
          </motion.div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                {renderCurrentTab()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Create Modal */}
        {showCreateModal && renderCreateModal()}
      </div>
    </div>
  );
};

export default UserProfile;

