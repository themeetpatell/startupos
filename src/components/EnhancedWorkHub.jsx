import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppState } from '../contexts/AppStateContext';
import { 
  Home, Users, BarChart3, Target, Calendar, FileText, 
  Settings, Bell, Search, Plus, TrendingUp, Zap,
  CheckCircle, Clock, AlertCircle, Star, Award,
  MessageCircle, Phone, Mail, Globe, Linkedin,
  Twitter, Github, Building, User, DollarSign,
  Briefcase, GraduationCap, Lightbulb, Shield,
  ArrowRight, ArrowUp, ArrowDown, Filter,
  MoreVertical, Edit, Trash2, Eye, Share,
  Download, Upload, Copy, ExternalLink,
  Play, Pause, Square, RefreshCw, Save, X,
  Building2, FolderOpen, MapPin, PieChart,
  Activity, Flag, UserPlus, BookOpen, Compass,
  TrendingDown, PieChart as PieChartIcon, 
  CreditCard, Handshake, Rocket, Brain,
  Database, Layers, Workflow, Headphones,
  Mic, Video, Camera, Monitor, Smartphone,
  Wifi, Cloud, Lock, Unlock, Key, ShieldCheck,
  AlertTriangle, Info, HelpCircle, ChevronRight,
  ChevronDown, ChevronUp, Maximize2, Minimize2,
  RotateCcw, RotateCw, Move, GripVertical,
  MousePointer, Hand, EyeOff, Eye as EyeIcon,
  Heart, Bookmark, ThumbsUp, MessageSquare,
  Send, Reply, Forward, Archive, Trash,
  Flag as FlagIcon, Tag, Hash, AtSign,
  Percent, DollarSign as Dollar, Euro,
  Bitcoin, Coins, Wallet, PiggyBank, 
  CreditCard as Card, Receipt, Calculator, 
  PieChart as Chart, BarChart, LineChart, 
  AreaChart, ScatterChart, Gauge, 
  Thermometer, Droplet, Flame, Snowflake, 
  CloudRain, CloudSnow, CloudLightning, 
  CloudDrizzle, CloudHail, Wind, 
  Zap as Lightning, Sun, Moon, Sunrise, 
  Sunset, CloudSun, CloudMoon
} from 'lucide-react';

const EnhancedWorkHub = () => {
  // Get user type from context
  const { state, actions } = useAppState();
  const { userType } = state.user;
  const [activeTab, setActiveTab] = useState('overview');
  const [activeSubTab, setActiveSubTab] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mock data for different user types
  const mockData = {
    founder: {
      name: "Alex Chen",
      company: "TechFlow Solutions",
      role: "Founder & CEO",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      metrics: {
        revenue: "$2.4M",
        growth: "+24%",
        users: "15.2K",
        funding: "$5.8M"
      },
      recentActivities: [
        { id: 1, type: 'funding', title: 'Series A completed', time: '2 hours ago', status: 'success' },
        { id: 2, type: 'team', title: 'New CTO hired', time: '1 day ago', status: 'info' },
        { id: 3, type: 'product', title: 'Beta launch successful', time: '3 days ago', status: 'success' }
      ]
    },
    employee: {
      name: "Sarah Johnson",
      company: "DataTech Corp",
      role: "Senior Developer",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      metrics: {
        projects: "12",
        performance: "4.8/5",
        skills: "8",
        experience: "5 years"
      },
      recentActivities: [
        { id: 1, type: 'project', title: 'Project Alpha completed', time: '1 hour ago', status: 'success' },
        { id: 2, type: 'meeting', title: 'Team standup', time: '2 hours ago', status: 'info' },
        { id: 3, type: 'learning', title: 'New certification earned', time: '1 week ago', status: 'success' }
      ]
    },
    investor: {
      name: "Michael Rodriguez",
      company: "Venture Capital Partners",
      role: "Managing Partner",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      metrics: {
        portfolio: "45",
        investments: "$12.5M",
        exits: "8",
        returns: "3.2x"
      },
      recentActivities: [
        { id: 1, type: 'investment', title: 'New deal closed', time: '3 hours ago', status: 'success' },
        { id: 2, type: 'meeting', title: 'Board meeting', time: '1 day ago', status: 'info' },
        { id: 3, type: 'exit', title: 'Portfolio company IPO', time: '1 week ago', status: 'success' }
      ]
    },
    unemployed: {
      name: "Emma Wilson",
      company: "Seeking Opportunities",
      role: "Software Engineer",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      metrics: {
        applications: "47",
        interviews: "8",
        offers: "2",
        skills: "12"
      },
      recentActivities: [
        { id: 1, type: 'application', title: 'Applied to TechCorp', time: '2 hours ago', status: 'info' },
        { id: 2, type: 'interview', title: 'Interview scheduled', time: '1 day ago', status: 'success' },
        { id: 3, type: 'skill', title: 'Completed React course', time: '3 days ago', status: 'success' }
      ]
    }
  };

  // Role-based navigation tabs
  const getNavigationTabs = () => {
    const baseTabs = {
      founder: [
        { 
          id: 'overview', 
          label: 'Dashboard', 
          icon: Home, 
          count: null,
          type: 'single'
        },
        { 
          id: 'business', 
          label: 'Business Operations', 
          icon: Building, 
          count: 27,
          type: 'group',
          subtabs: [
            { id: 'startup', label: 'Startup Management', icon: Building, count: 12 },
            { id: 'financial', label: 'Financial Dashboard', icon: PieChart, count: null },
            { id: 'legal', label: 'Legal & Compliance', icon: Shield, count: 2 }
          ]
        },
        { 
          id: 'growth-marketing', 
          label: 'Growth & Marketing', 
          icon: TrendingUp, 
          count: 16,
          type: 'group',
          subtabs: [
            { id: 'growth', label: 'Growth Strategy', icon: TrendingUp, count: 6 },
            { id: 'marketing', label: 'Marketing & PR', icon: MessageSquare, count: 7 },
            { id: 'market', label: 'Market Research', icon: BarChart3, count: 3 }
          ]
        },
        { 
          id: 'funding-investment', 
          label: 'Funding & Investment', 
          icon: DollarSign, 
          count: 13,
          type: 'group',
          subtabs: [
            { id: 'fundraising', label: 'Fundraising', icon: DollarSign, count: 5 },
            { id: 'investors', label: 'Investor Relations', icon: Handshake, count: 8 }
          ]
        },
        { 
          id: 'team-people', 
          label: 'Team & People', 
          icon: Users, 
          count: 27,
          type: 'group',
          subtabs: [
            { id: 'team', label: 'Team Collaboration', icon: Users, count: 15 },
            { id: 'hiring', label: 'Hiring & Talent', icon: UserPlus, count: 12 }
          ]
        },
        { 
          id: 'community', 
          label: 'Community & Mentorship', 
          icon: Globe, 
          count: 4,
          type: 'single'
        }
      ],
      employee: [
        { 
          id: 'overview', 
          label: 'My Dashboard', 
          icon: Home, 
          count: null,
          type: 'single'
        },
        { 
          id: 'work-projects', 
          label: 'Work & Projects', 
          icon: FolderOpen, 
          count: 20,
          type: 'group',
          subtabs: [
            { id: 'projects', label: 'My Projects', icon: FolderOpen, count: 8 },
            { id: 'company', label: 'Company Hub', icon: Building, count: 12 }
          ]
        },
        { 
          id: 'career-development', 
          label: 'Career Development', 
          icon: TrendingUp, 
          count: 13,
          type: 'group',
          subtabs: [
            { id: 'career', label: 'Career Development', icon: TrendingUp, count: 5 },
            { id: 'learning', label: 'Learning & Skills', icon: GraduationCap, count: 6 },
            { id: 'performance', label: 'Performance', icon: Target, count: 2 }
          ]
        },
        { 
          id: 'people-networking', 
          label: 'People & Networking', 
          icon: Users, 
          count: 18,
          type: 'group',
          subtabs: [
            { id: 'hr', label: 'HR Services', icon: Users, count: 3 },
            { id: 'networking', label: 'Networking', icon: Globe, count: 15 }
          ]
        }
      ],
      investor: [
        { 
          id: 'overview', 
          label: 'Command Center', 
          icon: Home, 
          count: null,
          type: 'single'
        },
        { 
          id: 'deal-sourcing', 
          label: 'Deal Sourcing & Pipeline', 
          icon: Target, 
          count: 47,
          type: 'group',
          subtabs: [
            { id: 'pipeline', label: 'Deal Pipeline', icon: Workflow, count: 23 },
            { id: 'sourcing', label: 'Deal Sourcing', icon: Search, count: 12 },
            { id: 'due-diligence', label: 'Due Diligence', icon: ShieldCheck, count: 8 },
            { id: 'term-sheets', label: 'Term Sheets', icon: FileText, count: 4 }
          ]
        },
        { 
          id: 'portfolio-management', 
          label: 'Portfolio Management', 
          icon: PieChart, 
          count: 89,
          type: 'group',
          subtabs: [
            { id: 'portfolio', label: 'Portfolio Overview', icon: PieChart, count: 45 },
            { id: 'board-management', label: 'Board Management', icon: Users, count: 28 },
            { id: 'value-creation', label: 'Value Creation', icon: TrendingUp, count: 16 }
          ]
        },
        { 
          id: 'lp-fund-management', 
          label: 'LP Relations & Fund Management', 
          icon: Handshake, 
          count: 34,
          type: 'group',
          subtabs: [
            { id: 'lp-relations', label: 'LP Relations', icon: Handshake, count: 18 },
            { id: 'fund-management', label: 'Fund Management', icon: DollarSign, count: 12 },
            { id: 'reporting', label: 'LP Reporting', icon: BarChart3, count: 4 }
          ]
        },
        { 
          id: 'market-intelligence', 
          label: 'Market Intelligence', 
          icon: Brain, 
          count: 67,
          type: 'group',
          subtabs: [
            { id: 'research', label: 'Market Research', icon: BarChart3, count: 23 },
            { id: 'trends', label: 'Trend Analysis', icon: TrendingUp, count: 18 },
            { id: 'competition', label: 'Competitive Intel', icon: Eye, count: 26 }
          ]
        },
        { 
          id: 'network-ecosystem', 
          label: 'Network & Ecosystem', 
          icon: Globe, 
          count: 234,
          type: 'group',
          subtabs: [
            { id: 'founder-network', label: 'Founder Network', icon: Users, count: 156 },
            { id: 'co-investors', label: 'Co-Investors', icon: Building, count: 45 },
            { id: 'events', label: 'Events & Conferences', icon: Calendar, count: 33 }
          ]
        },
        { 
          id: 'operations', 
          label: 'Operations & Analytics', 
          icon: Settings, 
          count: 23,
          type: 'group',
          subtabs: [
            { id: 'analytics', label: 'Analytics & Reports', icon: BarChart3, count: 12 },
            { id: 'compliance', label: 'Compliance & Legal', icon: Shield, count: 8 },
            { id: 'team', label: 'Team Management', icon: Users, count: 3 }
          ]
        }
      ],
      unemployed: [
        { 
          id: 'overview', 
          label: 'Job Search Hub', 
          icon: Home, 
          count: null,
          type: 'single'
        },
        { 
          id: 'job-opportunities', 
          label: 'Job Opportunities', 
          icon: Briefcase, 
          count: 62,
          type: 'group',
          subtabs: [
            { id: 'jobs', label: 'Job Opportunities', icon: Briefcase, count: 47 },
            { id: 'gigs', label: 'Gig Economy', icon: Zap, count: 15 }
          ]
        },
        { 
          id: 'career-development', 
          label: 'Career Development', 
          icon: TrendingUp, 
          count: 20,
          type: 'group',
          subtabs: [
            { id: 'career', label: 'Career Development', icon: TrendingUp, count: 8 },
            { id: 'skills', label: 'Skills & Learning', icon: GraduationCap, count: 12 }
          ]
        },
        { 
          id: 'networking-entrepreneurship', 
          label: 'Networking & Entrepreneurship', 
          icon: Globe, 
          count: 28,
          type: 'group',
          subtabs: [
            { id: 'networking', label: 'Networking', icon: Globe, count: 25 },
            { id: 'entrepreneurship', label: 'Entrepreneurship', icon: Rocket, count: 3 }
          ]
        },
        { 
          id: 'resources', 
          label: 'Resources', 
          icon: BookOpen, 
          count: 20,
          type: 'single'
        }
      ]
    };
    return baseTabs[userType] || baseTabs.founder;
  };

  // Role-based quick actions
  const getQuickActions = () => {
    const actions = {
      founder: [
        { id: 'pitch', label: 'Create Pitch Deck', icon: FileText, color: 'blue' },
        { id: 'funding', label: 'Track Fundraising', icon: DollarSign, color: 'green' },
        { id: 'team', label: 'Hire Team Member', icon: UserPlus, color: 'purple' },
        { id: 'metrics', label: 'Update Metrics', icon: BarChart3, color: 'orange' }
      ],
      employee: [
        { id: 'project', label: 'Start New Project', icon: Plus, color: 'blue' },
        { id: 'learning', label: 'Enroll in Course', icon: GraduationCap, color: 'green' },
        { id: 'network', label: 'Connect with Colleagues', icon: Users, color: 'purple' },
        { id: 'feedback', label: 'Request Feedback', icon: MessageSquare, color: 'orange' }
      ],
      investor: [
        { id: 'deal', label: 'Review New Deal', icon: Eye, color: 'blue' },
        { id: 'portfolio', label: 'Update Portfolio', icon: PieChart, color: 'green' },
        { id: 'network', label: 'Connect with Founders', icon: Globe, color: 'purple' },
        { id: 'research', label: 'Market Research', icon: BarChart3, color: 'orange' }
      ],
      unemployed: [
        { id: 'apply', label: 'Apply for Jobs', icon: Briefcase, color: 'blue' },
        { id: 'skill', label: 'Learn New Skills', icon: GraduationCap, color: 'green' },
        { id: 'network', label: 'Expand Network', icon: Users, color: 'purple' },
        { id: 'gig', label: 'Find Gig Work', icon: Zap, color: 'orange' }
      ]
    };
    return actions[userType] || actions.founder;
  };

  // Role-based metrics cards
  const getMetricsCards = () => {
    const metrics = {
      founder: [
        { title: 'Monthly Revenue', value: '$2.4M', change: '+24%', icon: DollarSign, color: 'green' },
        { title: 'Active Users', value: '15.2K', change: '+12%', icon: Users, color: 'blue' },
        { title: 'Team Size', value: '28', change: '+3', icon: UserPlus, color: 'purple' },
        { title: 'Funding Raised', value: '$5.8M', change: '+$2M', icon: TrendingUp, color: 'orange' }
      ],
      employee: [
        { title: 'Active Projects', value: '12', change: '+2', icon: FolderOpen, color: 'blue' },
        { title: 'Performance Score', value: '4.8/5', change: '+0.2', icon: Star, color: 'green' },
        { title: 'Skills Mastered', value: '8', change: '+1', icon: Award, color: 'purple' },
        { title: 'Years Experience', value: '5', change: '+1', icon: Clock, color: 'orange' }
      ],
      investor: [
        { title: 'Portfolio Companies', value: '45', change: '+3', icon: Building, color: 'blue' },
        { title: 'Total Investments', value: '$12.5M', change: '+$2.1M', icon: DollarSign, color: 'green' },
        { title: 'Successful Exits', value: '8', change: '+1', icon: TrendingUp, color: 'purple' },
        { title: 'Average Returns', value: '3.2x', change: '+0.3x', icon: BarChart3, color: 'orange' }
      ],
      unemployed: [
        { title: 'Job Applications', value: '47', change: '+8', icon: Briefcase, color: 'blue' },
        { title: 'Interviews Scheduled', value: '8', change: '+2', icon: Calendar, color: 'green' },
        { title: 'Skills Learned', value: '12', change: '+3', icon: GraduationCap, color: 'purple' },
        { title: 'Network Connections', value: '156', change: '+12', icon: Users, color: 'orange' }
      ]
    };
    return metrics[userType] || metrics.founder;
  };

  const currentUser = mockData[userType];
  const navigationTabs = getNavigationTabs();
  const quickActions = getQuickActions();
  const metricsCards = getMetricsCards();

  // Founder Dashboard - Comprehensive Overview
  const renderStartupManagement = () => (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Founder Dashboard</h2>
          <div className="flex items-center space-x-2">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2">
              <Settings className="w-4 h-4" />
              <span>Customize KPIs</span>
            </button>
            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center space-x-2">
              <RefreshCw className="w-4 h-4" />
              <span>Refresh Data</span>
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
            <div className="flex items-center justify-between mb-2">
              <DollarSign className="w-8 h-8 text-blue-600" />
              <span className="text-green-600 text-sm font-medium">+24%</span>
            </div>
            <div className="text-3xl font-bold text-blue-900 mb-1">$2.4M</div>
            <div className="text-sm text-blue-700">Monthly Revenue</div>
            <div className="text-xs text-gray-600 mt-1">vs $1.9M last month</div>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
            <div className="flex items-center justify-between mb-2">
              <Clock className="w-8 h-8 text-green-600" />
              <span className="text-green-600 text-sm font-medium">18 months</span>
            </div>
            <div className="text-3xl font-bold text-green-900 mb-1">$1.2M</div>
            <div className="text-sm text-green-700">Runway</div>
            <div className="text-xs text-gray-600 mt-1">at current burn rate</div>
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200">
            <div className="flex items-center justify-between mb-2">
              <Target className="w-8 h-8 text-purple-600" />
              <span className="text-red-600 text-sm font-medium">+15%</span>
            </div>
            <div className="text-3xl font-bold text-purple-900 mb-1">$45</div>
            <div className="text-sm text-purple-700">CAC</div>
            <div className="text-xs text-gray-600 mt-1">Customer Acquisition Cost</div>
          </div>
          
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl border border-orange-200">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="w-8 h-8 text-orange-600" />
              <span className="text-green-600 text-sm font-medium">+8%</span>
            </div>
            <div className="text-3xl font-bold text-orange-900 mb-1">$1,200</div>
            <div className="text-sm text-orange-700">LTV</div>
            <div className="text-xs text-gray-600 mt-1">Lifetime Value</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-6 rounded-xl border border-indigo-200">
            <div className="flex items-center justify-between mb-2">
              <Users className="w-8 h-8 text-indigo-600" />
              <span className="text-green-600 text-sm font-medium">+12%</span>
            </div>
            <div className="text-3xl font-bold text-indigo-900 mb-1">15.2K</div>
            <div className="text-sm text-indigo-700">Active Users</div>
            <div className="text-xs text-gray-600 mt-1">+1.6K this month</div>
          </div>
          
          <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-6 rounded-xl border border-pink-200">
            <div className="flex items-center justify-between mb-2">
              <Star className="w-8 h-8 text-pink-600" />
              <span className="text-green-600 text-sm font-medium">+2</span>
            </div>
            <div className="text-3xl font-bold text-pink-900 mb-1">72</div>
            <div className="text-sm text-pink-700">NPS Score</div>
            <div className="text-xs text-gray-600 mt-1">Net Promoter Score</div>
          </div>
          
          <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-xl border border-red-200">
            <div className="flex items-center justify-between mb-2">
              <Zap className="w-8 h-8 text-red-600" />
              <span className="text-red-600 text-sm font-medium">+5%</span>
            </div>
            <div className="text-3xl font-bold text-red-900 mb-1">$85K</div>
            <div className="text-sm text-red-700">Burn Rate</div>
            <div className="text-xs text-gray-600 mt-1">Monthly burn</div>
          </div>
          
          <div className="bg-gradient-to-br from-teal-50 to-teal-100 p-6 rounded-xl border border-teal-200">
            <div className="flex items-center justify-between mb-2">
              <Activity className="w-8 h-8 text-teal-600" />
              <span className="text-green-600 text-sm font-medium">-2%</span>
            </div>
            <div className="text-3xl font-bold text-teal-900 mb-1">3.2%</div>
            <div className="text-sm text-teal-700">Churn Rate</div>
            <div className="text-xs text-gray-600 mt-1">Monthly churn</div>
          </div>
        </div>
      </div>

      {/* Milestone Tracker */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Milestone Tracker</h3>
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
          <div className="space-y-6">
            {[
              { 
                title: "Series A Closed", 
                date: "Dec 2024", 
                status: "completed", 
                description: "$2M raised from Sequoia Capital",
                icon: CheckCircle,
                color: "green"
              },
              { 
                title: "Product Launch", 
                date: "Jan 2025", 
                status: "upcoming", 
                description: "Public launch with 10K+ users",
                icon: Rocket,
                color: "blue"
              },
              { 
                title: "International Expansion", 
                date: "Mar 2025", 
                status: "planned", 
                description: "Launch in European markets",
                icon: Globe,
                color: "purple"
              },
              { 
                title: "Series B Fundraising", 
                date: "Jun 2025", 
                status: "planned", 
                description: "Target $10M Series B round",
                icon: DollarSign,
                color: "orange"
              }
            ].map((milestone, index) => (
              <div key={index} className="relative flex items-start space-x-4">
                <div className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center ${
                  milestone.status === 'completed' ? 'bg-green-500' : 
                  milestone.status === 'upcoming' ? 'bg-blue-500' : 'bg-gray-300'
                }`}>
                  <milestone.icon className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-lg font-semibold text-gray-900">{milestone.title}</h4>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      milestone.status === 'completed' ? 'bg-green-100 text-green-800' :
                      milestone.status === 'upcoming' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {milestone.status}
                    </span>
                  </div>
                  <p className="text-gray-600 mt-1">{milestone.description}</p>
                  <p className="text-sm text-gray-500 mt-1">{milestone.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Custom KPIs & Signals */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Custom KPIs</h3>
          <div className="space-y-4">
            {[
              { name: "Monthly Active Users", current: "15.2K", target: "20K", progress: 76 },
              { name: "Revenue Growth", current: "24%", target: "30%", progress: 80 },
              { name: "Customer Satisfaction", current: "4.8/5", target: "4.9/5", progress: 98 },
              { name: "Team Productivity", current: "85%", target: "90%", progress: 94 }
            ].map((kpi, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-900">{kpi.name}</span>
                  <span className="text-sm text-gray-600">{kpi.current} / {kpi.target}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{width: `${kpi.progress}%`}}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Alerts & Signals</h3>
          <div className="space-y-3">
            <div className="flex items-start space-x-3 p-4 bg-red-50 border border-red-200 rounded-lg">
              <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
              <div>
                <div className="font-medium text-red-900">Cash Runway Alert</div>
                  <div className="text-sm text-red-700">Runway &lt; 6 months. Consider fundraising.</div>
                <div className="text-xs text-red-600 mt-1">2 days ago</div>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
              <div>
                <div className="font-medium text-yellow-900">Churn Rate Warning</div>
                <div className="text-sm text-yellow-700">Churn increased to 3.2% this month.</div>
                <div className="text-xs text-yellow-600 mt-1">1 week ago</div>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-4 bg-green-50 border border-green-200 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
              <div>
                <div className="font-medium text-green-900">Goal Achieved</div>
                <div className="text-sm text-green-700">Monthly revenue target exceeded by 15%.</div>
                <div className="text-xs text-green-600 mt-1">3 days ago</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Integrations */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Connected Integrations</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: "Stripe", status: "connected", icon: "💳" },
            { name: "Google Analytics", status: "connected", icon: "📊" },
            { name: "Zoho CRM", status: "connected", icon: "🔗" },
            { name: "HubSpot", status: "disconnected", icon: "📈" }
          ].map((integration, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg text-center">
              <div className="text-2xl mb-2">{integration.icon}</div>
              <div className="font-medium text-gray-900">{integration.name}</div>
              <div className={`text-xs mt-1 ${
                integration.status === 'connected' ? 'text-green-600' : 'text-red-600'
              }`}>
                {integration.status}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderInvestorRelations = () => (
    <div className="space-y-6">
      {/* Updates Stream */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Investor Updates Stream</h2>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Send Update</span>
          </button>
        </div>
        
        <div className="space-y-4">
          {[
            {
              title: "December 2024 Investor Update",
              date: "Dec 1, 2024",
              recipients: "All Investors",
              status: "sent",
              metrics: {
                revenue: "$2.4M (+24%)",
                users: "15.2K (+12%)",
                runway: "18 months"
              },
              highlights: [
                "Exceeded revenue target by 15%",
                "Launched new AI features",
                "Expanded to 3 new markets"
              ]
            },
            {
              title: "Q4 Board Meeting Summary",
              date: "Nov 15, 2024",
              recipients: "Board Members",
              status: "sent",
              metrics: {
                revenue: "$2.1M (+18%)",
                users: "13.8K (+8%)",
                runway: "20 months"
              },
              highlights: [
                "Series A funding secured",
                "Key hires completed",
                "Product roadmap approved"
              ]
            }
          ].map((update, index) => (
            <div key={index} className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{update.title}</h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                    <span>📅 {update.date}</span>
                    <span>👥 {update.recipients}</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      update.status === 'sent' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {update.status}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-blue-600">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-blue-600">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-lg font-bold text-blue-900">{update.metrics.revenue}</div>
                  <div className="text-sm text-blue-700">Revenue</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-lg font-bold text-green-900">{update.metrics.users}</div>
                  <div className="text-sm text-green-700">Active Users</div>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-lg">
                  <div className="text-lg font-bold text-purple-900">{update.metrics.runway}</div>
                  <div className="text-sm text-purple-700">Runway</div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Key Highlights</h4>
                <ul className="space-y-1">
                  {update.highlights.map((highlight, hIndex) => (
                    <li key={hIndex} className="flex items-center space-x-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Investor Access Controls */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Investor Access Controls</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Current Investors</h4>
            <div className="space-y-3">
              {[
                { 
                  name: 'Sequoia Capital', 
                  contact: 'John Smith', 
                  access: 'Full Access', 
                  lastActive: '2 days ago',
                  permissions: ['Financial Data', 'Product Roadmap', 'Team Updates', 'Board Materials']
                },
                { 
                  name: 'Andreessen Horowitz', 
                  contact: 'Sarah Johnson', 
                  access: 'Limited Access', 
                  lastActive: '1 week ago',
                  permissions: ['Financial Summary', 'Product Updates']
                },
                { 
                  name: 'Y Combinator', 
                  contact: 'Mike Chen', 
                  access: 'Basic Access', 
                  lastActive: '2 weeks ago',
                  permissions: ['Monthly Updates', 'Key Metrics']
                }
              ].map((investor, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h5 className="font-medium text-gray-900">{investor.name}</h5>
                      <p className="text-sm text-gray-600">{investor.contact}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      investor.access === 'Full Access' ? 'bg-green-100 text-green-800' :
                      investor.access === 'Limited Access' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {investor.access}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 mb-2">Last active: {investor.lastActive}</div>
                  <div className="flex flex-wrap gap-1">
                    {investor.permissions.map((permission, pIndex) => (
                      <span key={pIndex} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                        {permission}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Access Templates</h4>
            <div className="space-y-3">
              {[
                { name: "Lead Investor", permissions: ["All Data", "Board Access", "Direct Communication"] },
                { name: "Co-Investor", permissions: ["Financial Data", "Product Updates", "Monthly Reports"] },
                { name: "Advisor", permissions: ["Key Metrics", "Strategic Updates", "Quarterly Reports"] }
              ].map((template, index) => (
                <div key={index} className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <h5 className="font-medium text-gray-900">{template.name}</h5>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {template.permissions.map((permission, pIndex) => (
                      <span key={pIndex} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                        {permission}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Fundraising CRM */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Fundraising CRM</h3>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {[
            { stage: "Contacted", count: 12, color: "blue", investors: [
              { name: "Accel Partners", contact: "Jane Doe", lastContact: "3 days ago", status: "Follow-up needed" },
              { name: "Index Ventures", contact: "Bob Smith", lastContact: "1 week ago", status: "Meeting scheduled" }
            ]},
            { stage: "Follow-up", count: 8, color: "yellow", investors: [
              { name: "Bessemer Venture Partners", contact: "Alice Johnson", lastContact: "2 days ago", status: "Term sheet pending" },
              { name: "General Catalyst", contact: "David Wilson", lastContact: "4 days ago", status: "Due diligence" }
            ]},
            { stage: "Meeting", count: 5, color: "purple", investors: [
              { name: "Kleiner Perkins", contact: "Carol Brown", lastContact: "1 day ago", status: "Pitch completed" },
              { name: "Greylock Partners", contact: "Tom Davis", lastContact: "2 days ago", status: "Next meeting scheduled" }
            ]},
            { stage: "LOI", count: 2, color: "green", investors: [
              { name: "Sequoia Capital", contact: "John Smith", lastContact: "1 week ago", status: "LOI signed" },
              { name: "Andreessen Horowitz", contact: "Sarah Johnson", lastContact: "3 days ago", status: "LOI pending" }
            ]}
          ].map((stage, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-gray-900">{stage.stage}</h4>
                <span className={`px-2 py-1 text-xs rounded-full bg-${stage.color}-100 text-${stage.color}-800`}>
                  {stage.count}
                </span>
              </div>
              <div className="space-y-3">
                {stage.investors.map((investor, iIndex) => (
                  <div key={iIndex} className="bg-white p-3 rounded-lg border border-gray-200">
                    <h5 className="font-medium text-gray-900 text-sm">{investor.name}</h5>
                    <p className="text-xs text-gray-600">{investor.contact}</p>
                    <p className="text-xs text-gray-500 mt-1">{investor.lastContact}</p>
                    <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded mt-1">
                      {investor.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Investor FAQ */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Investor FAQ</h3>
        <div className="space-y-4">
          {[
            {
              question: "What is our current burn rate and runway?",
              answer: "Our current monthly burn rate is $85K, giving us approximately 18 months of runway at current spending levels.",
              category: "Financial",
              lastUpdated: "2 days ago"
            },
            {
              question: "What are our key growth metrics?",
              answer: "We're tracking 15.2K active users (+12% MoM), $2.4M monthly revenue (+24% MoM), and 3.2% monthly churn rate.",
              category: "Growth",
              lastUpdated: "1 week ago"
            },
            {
              question: "What is our go-to-market strategy?",
              answer: "We focus on product-led growth through freemium model, content marketing, and strategic partnerships in the B2B SaaS space.",
              category: "Strategy",
              lastUpdated: "3 days ago"
            }
          ].map((faq, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-medium text-gray-900">{faq.question}</h4>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                  {faq.category}
                </span>
              </div>
              <p className="text-gray-600 mb-2">{faq.answer}</p>
              <div className="text-xs text-gray-500">Last updated: {faq.lastUpdated}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderTeamCollaboration = () => (
    <div className="space-y-6">
      {/* Company Feed */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Company Feed</h2>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Post Update</span>
          </button>
        </div>
        
        <div className="space-y-4">
          {[
            {
              author: "Sarah Johnson",
              role: "CTO",
              avatar: "SJ",
              time: "2 hours ago",
              type: "announcement",
              title: "Q4 Product Roadmap Released",
              content: "We've finalized our Q4 product roadmap. Key focus areas include AI integration, mobile app improvements, and international expansion.",
              reactions: { likes: 12, comments: 5, shares: 3 },
              attachments: ["Q4_Roadmap.pdf"]
            },
            {
              author: "Mike Chen",
              role: "Head of Marketing",
              avatar: "MC",
              time: "4 hours ago",
              type: "celebration",
              title: "🎉 We hit 15K users!",
              content: "Amazing milestone! Thanks to the entire team for their hard work. Let's keep the momentum going!",
              reactions: { likes: 28, comments: 8, shares: 12 },
              attachments: []
            },
            {
              author: "Emma Davis",
              role: "Head of Sales",
              avatar: "ED",
              time: "6 hours ago",
              type: "update",
              title: "Sales Team Update",
              content: "Closed 3 major deals this week worth $150K in ARR. Great work team!",
              reactions: { likes: 15, comments: 3, shares: 2 },
              attachments: ["Sales_Report_Q4.pdf"]
            }
          ].map((post, index) => (
            <div key={index} className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                  {post.avatar}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="font-semibold text-gray-900">{post.author}</h3>
                    <span className="text-sm text-gray-500">{post.role}</span>
                    <span className="text-sm text-gray-400">•</span>
                    <span className="text-sm text-gray-400">{post.time}</span>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      post.type === 'announcement' ? 'bg-blue-100 text-blue-800' :
                      post.type === 'celebration' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {post.type}
                    </span>
                  </div>
                  <h4 className="text-lg font-medium text-gray-900 mb-2">{post.title}</h4>
                  <p className="text-gray-600 mb-4">{post.content}</p>
                  
                  {post.attachments.length > 0 && (
                    <div className="flex items-center space-x-2 mb-4">
                      <FileText className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer">
                        {post.attachments[0]}
                      </span>
                    </div>
                  )}
                  
                  <div className="flex items-center space-x-6">
                    <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600">
                      <Heart className="w-4 h-4" />
                      <span className="text-sm">{post.reactions.likes}</span>
                    </button>
                    <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600">
                      <MessageSquare className="w-4 h-4" />
                      <span className="text-sm">{post.reactions.comments}</span>
                    </button>
                    <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600">
                      <Share className="w-4 h-4" />
                      <span className="text-sm">{post.reactions.shares}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Task Boards */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">Task Boards</h3>
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>New Task</span>
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "To Do", color: "blue", tasks: [
              { name: "Design new landing page", assignee: "Sarah", priority: "high", due: "Dec 20" },
              { name: "Update API documentation", assignee: "Mike", priority: "medium", due: "Dec 22" },
              { name: "Prepare investor presentation", assignee: "Emma", priority: "high", due: "Dec 25" }
            ]},
            { title: "In Progress", color: "yellow", tasks: [
              { name: "Implement user authentication", assignee: "Alex", priority: "high", due: "Dec 18" },
              { name: "Write marketing copy", assignee: "Mike", priority: "medium", due: "Dec 19" }
            ]},
            { title: "Done", color: "green", tasks: [
              { name: "Setup CI/CD pipeline", assignee: "Sarah", priority: "high", due: "Dec 15" },
              { name: "Create brand guidelines", assignee: "Emma", priority: "medium", due: "Dec 16" }
            ]}
          ].map((column, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-gray-900">{column.title}</h4>
                <span className={`px-2 py-1 text-xs rounded-full bg-${column.color}-100 text-${column.color}-800`}>
                  {column.tasks.length}
                </span>
              </div>
              <div className="space-y-3">
                {column.tasks.map((task, taskIndex) => (
                  <div key={taskIndex} className="bg-white p-3 rounded-lg border border-gray-200 hover:shadow-sm transition-shadow">
                    <div className="flex items-start justify-between mb-2">
                      <h5 className="font-medium text-gray-900 text-sm">{task.name}</h5>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        task.priority === 'high' ? 'bg-red-100 text-red-800' :
                        task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {task.priority}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>@{task.assignee}</span>
                      <span>{task.due}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Internal Chat */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Internal Chat</h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="border border-gray-200 rounded-lg h-64 overflow-y-auto p-4 space-y-3">
              {[
                { author: "Sarah", message: "Great work on the beta launch everyone! 🚀", time: "2:30 PM", type: "general" },
                { author: "Mike", message: "Thanks! The marketing campaign really paid off", time: "2:32 PM", type: "general" },
                { author: "Emma", message: "I'll share the sales numbers in the #sales channel", time: "2:35 PM", type: "general" },
                { author: "Alex", message: "The new feature is ready for testing", time: "2:40 PM", type: "engineering" }
              ].map((msg, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                    {msg.author[0]}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-medium text-gray-900">{msg.author}</span>
                      <span className="text-xs text-gray-500">{msg.time}</span>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        msg.type === 'general' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                      }`}>
                        #{msg.type}
                      </span>
                    </div>
                    <p className="text-gray-700">{msg.message}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center space-x-2">
              <input 
                type="text" 
                placeholder="Type a message..." 
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Channels</h4>
            <div className="space-y-2">
              {[
                { name: "#general", unread: 3, active: true },
                { name: "#engineering", unread: 1, active: false },
                { name: "#marketing", unread: 0, active: false },
                { name: "#sales", unread: 2, active: false }
              ].map((channel, index) => (
                <div key={index} className={`flex items-center justify-between p-2 rounded-lg cursor-pointer ${
                  channel.active ? 'bg-blue-50' : 'hover:bg-gray-50'
                }`}>
                  <span className="text-sm font-medium text-gray-900">{channel.name}</span>
                  {channel.unread > 0 && (
                    <span className="px-2 py-1 bg-blue-600 text-white text-xs rounded-full">
                      {channel.unread}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Idea Hub */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">Idea Hub</h3>
          <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Submit Idea</span>
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              title: "AI-powered customer support",
              author: "Sarah Johnson",
              description: "Implement AI chatbot to handle common customer queries 24/7",
              votes: 15,
              status: "under_review",
              category: "Product"
            },
            {
              title: "Mobile app dark mode",
              author: "Mike Chen",
              description: "Add dark mode option to improve user experience during night usage",
              votes: 23,
              status: "in_progress",
              category: "UI/UX"
            },
            {
              title: "Integration with Slack",
              author: "Emma Davis",
              description: "Allow users to receive notifications directly in their Slack workspace",
              votes: 8,
              status: "submitted",
              category: "Integration"
            }
          ].map((idea, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <h4 className="font-medium text-gray-900">{idea.title}</h4>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  idea.status === 'in_progress' ? 'bg-green-100 text-green-800' :
                  idea.status === 'under_review' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {idea.status.replace('_', ' ')}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-3">{idea.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button className="flex items-center space-x-1 text-gray-600 hover:text-blue-600">
                    <ThumbsUp className="w-4 h-4" />
                    <span className="text-sm">{idea.votes}</span>
                  </button>
                  <span className="text-xs text-gray-500">by {idea.author}</span>
                </div>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                  {idea.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Culture Wall */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Culture Wall</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              type: "shoutout",
              author: "Sarah Johnson",
              recipient: "Mike Chen",
              message: "Amazing work on the marketing campaign! The results exceeded our expectations.",
              emoji: "🎉"
            },
            {
              type: "win",
              author: "Emma Davis",
              recipient: "Sales Team",
              message: "Closed our biggest deal yet - $50K ARR! 🚀",
              emoji: "🏆"
            },
            {
              type: "celebration",
              author: "Alex Wilson",
              recipient: "Engineering Team",
              message: "Successfully launched the new feature with zero bugs!",
              emoji: "🎊"
            }
          ].map((post, index) => (
            <div key={index} className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg border border-blue-200">
              <div className="flex items-center space-x-2 mb-3">
                <span className="text-2xl">{post.emoji}</span>
                <span className="text-sm font-medium text-gray-700 capitalize">{post.type}</span>
              </div>
              <p className="text-gray-800 mb-3">{post.message}</p>
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>by {post.author}</span>
                <span>to {post.recipient}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderFundraising = () => (
    <div className="space-y-6">
      {/* AI Pitch Deck Builder */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">AI Pitch Deck Builder</h2>
          <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center space-x-2">
            <Zap className="w-4 h-4" />
            <span>Generate Deck</span>
          </button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Pitch Deck</h3>
            <div className="space-y-3">
              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-900">Series A Pitch Deck</span>
                  <span className="text-xs text-gray-500">v2.1</span>
                </div>
                <div className="text-sm text-gray-600 mb-3">Updated 2 days ago • 15 slides</div>
                <div className="flex items-center space-x-2">
                  <button className="px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700">
                    View Deck
                  </button>
                  <button className="px-3 py-2 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50">
                    Edit
                  </button>
                </div>
              </div>
              
              <div className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200">
                <h4 className="font-medium text-gray-900 mb-2">AI-Generated Sections</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Problem & Solution (Auto-generated from user data)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Market Size (Updated with latest data)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Financial Projections (Based on current metrics)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Deck Templates</h3>
            <div className="space-y-3">
              {[
                { name: "Series A Template", slides: 12, updated: "2 days ago", ai: true },
                { name: "Demo Day Template", slides: 8, updated: "1 week ago", ai: false },
                { name: "Seed Round Template", slides: 10, updated: "3 days ago", ai: true },
                { name: "Corporate Presentation", slides: 20, updated: "1 week ago", ai: false }
              ].map((template, index) => (
                <div key={index} className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">{template.name}</span>
                    {template.ai && (
                      <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">
                        AI-Powered
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-gray-600">
                    {template.slides} slides • Updated {template.updated}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Valuation Simulator */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Valuation Simulator</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Input Parameters</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Revenue</label>
                <input 
                  type="number" 
                  value="2400000" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Growth Rate (%)</label>
                <input 
                  type="number" 
                  value="24" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Industry Multiples</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="saas">SaaS (8-12x)</option>
                  <option value="fintech">FinTech (6-10x)</option>
                  <option value="ai">AI/ML (10-15x)</option>
                  <option value="ecommerce">E-commerce (3-6x)</option>
                </select>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Valuation Range</h4>
            <div className="space-y-4">
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-900">$19.2M - $28.8M</div>
                <div className="text-sm text-green-700">Conservative Estimate</div>
                <div className="text-xs text-gray-600 mt-1">Based on 8x revenue multiple</div>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-900">$28.8M - $43.2M</div>
                <div className="text-sm text-blue-700">Optimistic Estimate</div>
                <div className="text-xs text-gray-600 mt-1">Based on 12x revenue multiple</div>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-900">$36M</div>
                <div className="text-sm text-purple-700">Median Valuation</div>
                <div className="text-xs text-gray-600 mt-1">Based on 15x revenue multiple</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Data Room */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Data Room</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { 
              category: "Financial Documents", 
              count: 12, 
              color: "green",
              documents: ["Financial Statements", "Audit Reports", "Tax Returns", "Cap Table"]
            },
            { 
              category: "Legal Documents", 
              count: 8, 
              color: "blue",
              documents: ["Articles of Incorporation", "Operating Agreement", "IP Assignments", "Contracts"]
            },
            { 
              category: "Product & Technology", 
              count: 15, 
              color: "purple",
              documents: ["Product Roadmap", "Technical Architecture", "Security Audit", "API Documentation"]
            },
            { 
              category: "HR & Operations", 
              count: 6, 
              color: "orange",
              documents: ["Employee Handbook", "Org Chart", "Insurance Policies", "Office Lease"]
            },
            { 
              category: "Marketing & Sales", 
              count: 10, 
              color: "pink",
              documents: ["Marketing Materials", "Sales Deck", "Customer Case Studies", "Market Research"]
            },
            { 
              category: "Compliance", 
              count: 4, 
              color: "red",
              documents: ["Privacy Policy", "Terms of Service", "GDPR Compliance", "SOC 2 Report"]
            }
          ].map((category, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-gray-900">{category.category}</h4>
                <span className={`px-2 py-1 text-xs rounded-full bg-${category.color}-100 text-${category.color}-800`}>
                  {category.count} docs
                </span>
              </div>
              <div className="space-y-1">
                {category.documents.map((doc, docIndex) => (
                  <div key={docIndex} className="flex items-center space-x-2 text-sm text-gray-600">
                    <FileText className="w-3 h-3" />
                    <span>{doc}</span>
                  </div>
                ))}
              </div>
              <button className="w-full mt-3 px-3 py-2 bg-gray-100 text-gray-700 text-sm rounded-lg hover:bg-gray-200">
                View All Documents
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Deal Tracker */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Deal Tracker</h3>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {[
            { 
              stage: "Soft Circles", 
              count: 5, 
              color: "blue",
              deals: [
                { investor: "Accel Partners", amount: "$500K", status: "Committed", date: "Dec 15" },
                { investor: "Index Ventures", amount: "$300K", status: "Interested", date: "Dec 20" }
              ]
            },
            { 
              stage: "Commitments", 
              count: 3, 
              color: "yellow",
              deals: [
                { investor: "Sequoia Capital", amount: "$2M", status: "Signed", date: "Dec 10" },
                { investor: "Andreessen Horowitz", amount: "$1M", status: "Signed", date: "Dec 12" }
              ]
            },
            { 
              stage: "Term Sheets", 
              count: 2, 
              color: "purple",
              deals: [
                { investor: "Kleiner Perkins", amount: "$750K", status: "Pending", date: "Dec 18" }
              ]
            },
            { 
              stage: "Closed", 
              count: 1, 
              color: "green",
              deals: [
                { investor: "Y Combinator", amount: "$500K", status: "Completed", date: "Nov 30" }
              ]
            }
          ].map((stage, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-gray-900">{stage.stage}</h4>
                <span className={`px-2 py-1 text-xs rounded-full bg-${stage.color}-100 text-${stage.color}-800`}>
                  {stage.count}
                </span>
              </div>
              <div className="space-y-3">
                {stage.deals.map((deal, dealIndex) => (
                  <div key={dealIndex} className="bg-white p-3 rounded-lg border border-gray-200">
                    <h5 className="font-medium text-gray-900 text-sm">{deal.investor}</h5>
                    <div className="text-lg font-bold text-gray-900">{deal.amount}</div>
                    <div className="flex items-center justify-between text-xs text-gray-500 mt-1">
                      <span className={`px-2 py-1 rounded ${
                        deal.status === 'Completed' ? 'bg-green-100 text-green-800' :
                        deal.status === 'Signed' ? 'bg-blue-100 text-blue-800' :
                        deal.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {deal.status}
                      </span>
                      <span>{deal.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderMarketResearch = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Market Research & Insights</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Industry Analysis</h3>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="font-medium text-gray-900">Market Size</div>
                <div className="text-2xl font-bold text-blue-900">$45.2B</div>
                <div className="text-sm text-blue-700">Global market size (2024)</div>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="font-medium text-gray-900">Growth Rate</div>
                <div className="text-2xl font-bold text-green-900">12.5%</div>
                <div className="text-sm text-green-700">Annual growth rate</div>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Competitor Analysis</h3>
            <div className="space-y-3">
              {[
                { name: 'Competitor A', marketShare: '25%', funding: '$50M', status: 'Strong' },
                { name: 'Competitor B', marketShare: '18%', funding: '$30M', status: 'Growing' },
                { name: 'Competitor C', marketShare: '12%', funding: '$20M', status: 'Stable' }
              ].map((competitor, index) => (
                <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900">{competitor.name}</div>
                    <div className="text-sm text-gray-600">{competitor.marketShare} market share</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">{competitor.funding}</div>
                    <div className="text-xs text-gray-600">{competitor.status}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderLegalCompliance = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Legal & Compliance</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Compliance Status</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <span className="font-medium text-gray-900">Data Protection (GDPR)</span>
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <span className="font-medium text-gray-900">Terms of Service</span>
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <span className="font-medium text-gray-900">Privacy Policy</span>
                <AlertCircle className="w-5 h-5 text-yellow-600" />
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Legal Documents</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <span className="font-medium text-gray-900">Articles of Incorporation</span>
                </div>
                <button className="text-blue-600 hover:text-blue-800">
                  <Download className="w-4 h-4" />
                </button>
              </div>
              <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <span className="font-medium text-gray-900">Operating Agreement</span>
                </div>
                <button className="text-blue-600 hover:text-blue-800">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderMarketingPR = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Marketing & PR</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Campaign Performance</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-900">2.4M</div>
                <div className="text-sm text-blue-700">Impressions</div>
                <div className="text-xs text-green-600">+15% this month</div>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-900">12.5%</div>
                <div className="text-sm text-green-700">Click-through Rate</div>
                <div className="text-xs text-green-600">+3% this month</div>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-900">8.2K</div>
                <div className="text-sm text-purple-700">New Leads</div>
                <div className="text-xs text-green-600">+22% this month</div>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-900">$45</div>
                <div className="text-sm text-orange-700">Cost per Lead</div>
                <div className="text-xs text-red-600">+5% this month</div>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Press</h3>
            <div className="space-y-3">
              <div className="p-3 border border-gray-200 rounded-lg">
                <div className="font-medium text-gray-900">TechCrunch Feature</div>
                <div className="text-sm text-gray-600">"Startup raises $2M Series A"</div>
                <div className="text-xs text-gray-500 mt-1">2 days ago</div>
              </div>
              <div className="p-3 border border-gray-200 rounded-lg">
                <div className="font-medium text-gray-900">Forbes Mention</div>
                <div className="text-sm text-gray-600">"Innovative approach to AI"</div>
                <div className="text-xs text-gray-500 mt-1">1 week ago</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Employee Sections
  const renderCareerDevelopment = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Career Development</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Career Goals</h3>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-900">Become Senior Developer</span>
                  <span className="text-blue-600 font-bold">75%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{width: '75%'}}></div>
                </div>
                <div className="text-sm text-gray-600 mt-1">Complete 3 more projects</div>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-900">Learn React Native</span>
                  <span className="text-green-600 font-bold">40%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{width: '40%'}}></div>
                </div>
                <div className="text-sm text-gray-600 mt-1">Complete online course</div>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Achievements</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                <Award className="w-5 h-5 text-green-600" />
                <div>
                  <div className="font-medium text-gray-900">React Certification</div>
                  <div className="text-sm text-gray-600">Completed 2 days ago</div>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                <Star className="w-5 h-5 text-blue-600" />
                <div>
                  <div className="font-medium text-gray-900">Performance Review</div>
                  <div className="text-sm text-gray-600">4.8/5 rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderMyProjects = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">My Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { name: 'E-commerce Platform', status: 'In Progress', progress: 65, dueDate: 'Dec 20, 2024', priority: 'High' },
            { name: 'Mobile App Redesign', status: 'Planning', progress: 20, dueDate: 'Jan 15, 2025', priority: 'Medium' },
            { name: 'API Integration', status: 'Completed', progress: 100, dueDate: 'Nov 30, 2024', priority: 'High' },
            { name: 'Database Optimization', status: 'In Progress', progress: 40, dueDate: 'Dec 25, 2024', priority: 'Low' }
          ].map((project, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium text-gray-900">{project.name}</h3>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  project.priority === 'High' ? 'bg-red-100 text-red-800' :
                  project.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {project.priority}
                </span>
              </div>
              <div className="mb-3">
                <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                  <span>Progress</span>
                  <span>{project.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className={`h-2 rounded-full ${
                    project.status === 'Completed' ? 'bg-green-600' : 'bg-blue-600'
                  }`} style={{width: `${project.progress}%`}}></div>
                </div>
              </div>
              <div className="text-sm text-gray-600">
                <div>Due: {project.dueDate}</div>
                <div className="mt-1">Status: {project.status}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderCompanyHub = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Company Hub</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Company Announcements</h3>
            <div className="space-y-3">
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="font-medium text-gray-900">Q4 All-Hands Meeting</div>
                <div className="text-sm text-gray-600">Dec 15, 2024 • 2:00 PM</div>
                <div className="text-xs text-blue-600 mt-1">Conference Room A</div>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="font-medium text-gray-900">New Employee Onboarding</div>
                <div className="text-sm text-gray-600">Welcome 5 new team members</div>
                <div className="text-xs text-green-600 mt-1">This week</div>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Team Directory</h3>
            <div className="space-y-3">
              {[
                { name: 'John Smith', role: 'CEO', department: 'Executive' },
                { name: 'Sarah Johnson', role: 'CTO', department: 'Engineering' },
                { name: 'Mike Chen', role: 'Head of Marketing', department: 'Marketing' }
              ].map((person, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                    {person.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{person.name}</div>
                    <div className="text-sm text-gray-600">{person.role} • {person.department}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderHRServices = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">HR Services</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Leave Management</h3>
            <div className="space-y-3">
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="font-medium text-gray-900">Vacation Days</div>
                <div className="text-2xl font-bold text-blue-900">12</div>
                <div className="text-sm text-blue-700">days remaining</div>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="font-medium text-gray-900">Sick Leave</div>
                <div className="text-2xl font-bold text-green-900">5</div>
                <div className="text-sm text-green-700">days remaining</div>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50">
                <div className="font-medium text-gray-900">Apply for Leave</div>
                <div className="text-sm text-gray-600">Request time off</div>
              </button>
              <button className="w-full p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50">
                <div className="font-medium text-gray-900">View Payroll</div>
                <div className="text-sm text-gray-600">Salary and benefits</div>
              </button>
              <button className="w-full p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50">
                <div className="font-medium text-gray-900">Performance Review</div>
                <div className="text-sm text-gray-600">View your ratings</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderLearningSkills = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Learning & Skills</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Courses</h3>
            <div className="space-y-3">
              {[
                { name: 'Advanced React', progress: 75, instructor: 'John Doe', duration: '8 weeks' },
                { name: 'Node.js Backend', progress: 40, instructor: 'Jane Smith', duration: '6 weeks' },
                { name: 'AWS Certification', progress: 20, instructor: 'Mike Johnson', duration: '12 weeks' }
              ].map((course, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">{course.name}</span>
                    <span className="text-sm text-gray-600">{course.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{width: `${course.progress}%`}}></div>
                  </div>
                  <div className="text-sm text-gray-600">
                    <div>Instructor: {course.instructor}</div>
                    <div>Duration: {course.duration}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Skill Assessment</h3>
            <div className="space-y-3">
              {[
                { skill: 'JavaScript', level: 85, color: 'blue' },
                { skill: 'React', level: 78, color: 'green' },
                { skill: 'Node.js', level: 65, color: 'purple' },
                { skill: 'Python', level: 45, color: 'orange' }
              ].map((skill, index) => (
                <div key={index} className="p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-gray-900">{skill.skill}</span>
                    <span className="text-sm text-gray-600">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className={`bg-${skill.color}-600 h-2 rounded-full`} style={{width: `${skill.level}%`}}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNetworking = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Professional Networking</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Connections</h3>
            <div className="space-y-3">
              {[
                { name: 'Alex Chen', role: 'Senior Developer', company: 'Google', mutual: 5 },
                { name: 'Sarah Wilson', role: 'Product Manager', company: 'Microsoft', mutual: 3 },
                { name: 'Mike Davis', role: 'Tech Lead', company: 'Amazon', mutual: 8 }
              ].map((connection, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                    {connection.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{connection.name}</div>
                    <div className="text-sm text-gray-600">{connection.role} at {connection.company}</div>
                    <div className="text-xs text-blue-600">{connection.mutual} mutual connections</div>
                  </div>
                  <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700">
                    Connect
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Industry Events</h3>
            <div className="space-y-3">
              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="font-medium text-gray-900">React Conference 2024</div>
                <div className="text-sm text-gray-600">Dec 20, 2024 • San Francisco</div>
                <div className="text-xs text-blue-600 mt-1">Register now</div>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="font-medium text-gray-900">Tech Meetup</div>
                <div className="text-sm text-gray-600">Dec 25, 2024 • Virtual</div>
                <div className="text-xs text-blue-600 mt-1">Free event</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPerformance = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Performance Management</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Performance</h3>
            <div className="space-y-4">
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="font-medium text-gray-900">Overall Rating</div>
                <div className="text-3xl font-bold text-green-900">4.8/5</div>
                <div className="text-sm text-green-700">Excellent performance</div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-blue-50 rounded-lg text-center">
                  <div className="text-2xl font-bold text-blue-900">12</div>
                  <div className="text-sm text-blue-700">Projects Completed</div>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg text-center">
                  <div className="text-2xl font-bold text-purple-900">95%</div>
                  <div className="text-sm text-purple-700">On-time Delivery</div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Goals & Objectives</h3>
            <div className="space-y-3">
              {[
                { goal: 'Complete 3 major projects', progress: 100, status: 'Completed' },
                { goal: 'Improve code quality', progress: 80, status: 'In Progress' },
                { goal: 'Mentor junior developers', progress: 60, status: 'In Progress' }
              ].map((goal, index) => (
                <div key={index} className="p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">{goal.goal}</span>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      goal.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {goal.status}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{width: `${goal.progress}%`}}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Investor Sections
  const renderDealFlow = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Deal Flow Management</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Active Deals</h3>
            <div className="space-y-3">
              {[
                { company: 'TechFlow AI', stage: 'Due Diligence', amount: '$2M', sector: 'AI/ML', days: 15 },
                { company: 'DataVault', stage: 'Term Sheet', amount: '$5M', sector: 'Cybersecurity', days: 8 },
                { company: 'CloudScale', stage: 'Initial Review', amount: '$3M', sector: 'Cloud', days: 3 }
              ].map((deal, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{deal.company}</h4>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">{deal.stage}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm text-gray-600">
                    <div>Amount: {deal.amount}</div>
                    <div>Sector: {deal.sector}</div>
                    <div>Days in pipeline: {deal.days}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Pipeline Summary</h3>
            <div className="space-y-3">
              <div className="p-3 bg-blue-50 rounded-lg text-center">
                <div className="text-2xl font-bold text-blue-900">23</div>
                <div className="text-sm text-blue-700">Active Deals</div>
              </div>
              <div className="p-3 bg-green-50 rounded-lg text-center">
                <div className="text-2xl font-bold text-green-900">8</div>
                <div className="text-sm text-green-700">Due Diligence</div>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg text-center">
                <div className="text-2xl font-bold text-purple-900">5</div>
                <div className="text-sm text-purple-700">Term Sheets</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPortfolioManagement = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Portfolio Management</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Portfolio Companies</h3>
            <div className="space-y-3">
              {[
                { name: 'AI Solutions Inc.', stage: 'Series B', valuation: '$50M', performance: '+120%' },
                { name: 'DataTech Corp', stage: 'Series A', valuation: '$25M', performance: '+85%' },
                { name: 'CloudScale Ltd', stage: 'Seed', valuation: '$8M', performance: '+45%' }
              ].map((company, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{company.name}</h4>
                    <span className="text-green-600 font-bold">{company.performance}</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    <div>{company.stage} • Valuation: {company.valuation}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Metrics</h3>
            <div className="space-y-4">
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="font-medium text-gray-900">Total Portfolio Value</div>
                <div className="text-2xl font-bold text-green-900">$12.5M</div>
                <div className="text-sm text-green-700">+15% this quarter</div>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="font-medium text-gray-900">Average Return</div>
                <div className="text-2xl font-bold text-blue-900">3.2x</div>
                <div className="text-sm text-blue-700">Multiple on invested capital</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderInvestmentResearch = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Investment Research</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Market Analysis</h3>
            <div className="space-y-3">
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="font-medium text-gray-900">AI/ML Sector</div>
                <div className="text-sm text-gray-600">Market size: $45B • Growth: 25% YoY</div>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="font-medium text-gray-900">Cybersecurity</div>
                <div className="text-sm text-gray-600">Market size: $180B • Growth: 12% YoY</div>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Research Reports</h3>
            <div className="space-y-3">
              <div className="p-3 border border-gray-200 rounded-lg">
                <div className="font-medium text-gray-900">Q4 2024 Market Outlook</div>
                <div className="text-sm text-gray-600">Published 2 days ago</div>
              </div>
              <div className="p-3 border border-gray-200 rounded-lg">
                <div className="font-medium text-gray-900">AI Investment Trends</div>
                <div className="text-sm text-gray-600">Published 1 week ago</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderEventsConferences = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Events & Conferences</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { name: 'TechCrunch Disrupt', date: 'Dec 20, 2024', location: 'San Francisco', type: 'Conference' },
            { name: 'AI Investment Summit', date: 'Jan 15, 2025', location: 'New York', type: 'Summit' },
            { name: 'Startup Pitch Night', date: 'Dec 30, 2024', location: 'Virtual', type: 'Pitch Event' }
          ].map((event, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-2">{event.name}</h3>
              <div className="text-sm text-gray-600 space-y-1">
                <div>📅 {event.date}</div>
                <div>📍 {event.location}</div>
                <div>🏷️ {event.type}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderReportsAnalytics = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Reports & Analytics</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Reports</h3>
            <div className="space-y-3">
              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="font-medium text-gray-900">Q4 2024 Portfolio Report</div>
                <div className="text-sm text-gray-600">Generated 2 days ago</div>
                <button className="mt-2 px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700">
                  Download PDF
                </button>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="font-medium text-gray-900">Deal Flow Analysis</div>
                <div className="text-sm text-gray-600">Generated 1 week ago</div>
                <button className="mt-2 px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700">
                  Download PDF
                </button>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Metrics</h3>
            <div className="space-y-4">
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="font-medium text-gray-900">IRR</div>
                <div className="text-2xl font-bold text-green-900">18.5%</div>
                <div className="text-sm text-green-700">Internal Rate of Return</div>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="font-medium text-gray-900">DPI</div>
                <div className="text-2xl font-bold text-blue-900">1.8x</div>
                <div className="text-sm text-blue-700">Distributions to Paid-in</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCompliance = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Compliance & Regulatory</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Compliance Status</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <span className="font-medium text-gray-900">SEC Registration</span>
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <span className="font-medium text-gray-900">Anti-Money Laundering</span>
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <span className="font-medium text-gray-900">Tax Reporting</span>
                <AlertCircle className="w-5 h-5 text-yellow-600" />
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Deadlines</h3>
            <div className="space-y-3">
              <div className="p-3 border border-gray-200 rounded-lg">
                <div className="font-medium text-gray-900">Q4 Tax Filing</div>
                <div className="text-sm text-gray-600">Due: Jan 31, 2025</div>
                <div className="text-xs text-red-600 mt-1">30 days remaining</div>
              </div>
              <div className="p-3 border border-gray-200 rounded-lg">
                <div className="font-medium text-gray-900">Annual Report</div>
                <div className="text-sm text-gray-600">Due: Mar 15, 2025</div>
                <div className="text-xs text-blue-600 mt-1">75 days remaining</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Unemployed Sections
  const renderJobOpportunities = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Job Opportunities</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: 'Senior React Developer', company: 'TechCorp', location: 'San Francisco', salary: '$120k-150k', type: 'Full-time', posted: '2 days ago' },
            { title: 'Full Stack Engineer', company: 'StartupXYZ', location: 'Remote', salary: '$100k-130k', type: 'Full-time', posted: '1 week ago' },
            { title: 'Frontend Developer', company: 'DesignCo', location: 'New York', salary: '$90k-120k', type: 'Full-time', posted: '3 days ago' },
            { title: 'JavaScript Developer', company: 'WebAgency', location: 'Austin', salary: '$80k-110k', type: 'Contract', posted: '5 days ago' }
          ].map((job, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-medium text-gray-900">{job.title}</h3>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  job.type === 'Full-time' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                }`}>
                  {job.type}
                </span>
              </div>
              <div className="text-sm text-gray-600 space-y-1 mb-3">
                <div>🏢 {job.company}</div>
                <div>📍 {job.location}</div>
                <div>💰 {job.salary}</div>
                <div>📅 {job.posted}</div>
              </div>
              <div className="flex space-x-2">
                <button className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700">
                  Apply Now
                </button>
                <button className="px-3 py-2 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50">
                  Save
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderGigEconomy = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Gig Economy</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: 'Website Redesign', client: 'Small Business Co', budget: '$2,500', duration: '2 weeks', skills: ['React', 'UI/UX'] },
            { title: 'Mobile App Development', client: 'Startup Inc', budget: '$5,000', duration: '1 month', skills: ['React Native', 'Node.js'] },
            { title: 'E-commerce Setup', client: 'Retail Store', budget: '$1,800', duration: '1 week', skills: ['Shopify', 'JavaScript'] },
            { title: 'API Integration', client: 'Tech Company', budget: '$1,200', duration: '5 days', skills: ['Node.js', 'MongoDB'] }
          ].map((gig, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <h3 className="font-medium text-gray-900 mb-2">{gig.title}</h3>
              <div className="text-sm text-gray-600 space-y-1 mb-3">
                <div>👤 {gig.client}</div>
                <div>💰 {gig.budget}</div>
                <div>⏱️ {gig.duration}</div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {gig.skills.map((skill, skillIndex) => (
                    <span key={skillIndex} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="flex-1 px-3 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700">
                  Apply
                </button>
                <button className="px-3 py-2 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50">
                  Save
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderEntrepreneurship = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Entrepreneurship Resources</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Startup Resources</h3>
            <div className="space-y-3">
              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="font-medium text-gray-900">Business Plan Template</div>
                <div className="text-sm text-gray-600">Complete guide to writing a business plan</div>
                <button className="mt-2 text-blue-600 hover:text-blue-800 text-sm">Download</button>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="font-medium text-gray-900">Pitch Deck Examples</div>
                <div className="text-sm text-gray-600">Successful pitch deck templates</div>
                <button className="mt-2 text-blue-600 hover:text-blue-800 text-sm">View Examples</button>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Mentorship Programs</h3>
            <div className="space-y-3">
              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="font-medium text-gray-900">Startup Accelerator</div>
                <div className="text-sm text-gray-600">12-week intensive program</div>
                <div className="text-xs text-blue-600 mt-1">Applications open</div>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="font-medium text-gray-900">Mentor Matching</div>
                <div className="text-sm text-gray-600">Connect with experienced entrepreneurs</div>
                <div className="text-xs text-blue-600 mt-1">Free service</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderResources = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Career Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: 'Resume Builder', description: 'Create professional resumes', icon: FileText, color: 'blue' },
            { title: 'Interview Prep', description: 'Practice interview questions', icon: MessageSquare, color: 'green' },
            { title: 'Skill Assessment', description: 'Test your technical skills', icon: Target, color: 'purple' },
            { title: 'Career Coaching', description: '1-on-1 career guidance', icon: Users, color: 'orange' },
            { title: 'Networking Events', description: 'Connect with professionals', icon: Globe, color: 'pink' },
            { title: 'Job Alerts', description: 'Get notified of new opportunities', icon: Bell, color: 'indigo' }
          ].map((resource, index) => (
            <div key={index} className={`p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow bg-${resource.color}-50`}>
              <div className="flex items-center space-x-3 mb-3">
                <resource.icon className={`w-6 h-6 text-${resource.color}-600`} />
                <h3 className="font-medium text-gray-900">{resource.title}</h3>
              </div>
              <p className="text-sm text-gray-600 mb-3">{resource.description}</p>
              <button className={`w-full px-3 py-2 bg-${resource.color}-600 text-white text-sm rounded-lg hover:bg-${resource.color}-700`}>
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Financial Dashboard
  const renderFinancialDashboard = () => (
    <div className="space-y-6">
      {/* Live Metrics */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Financial Dashboard</h2>
          <div className="flex items-center space-x-2">
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center space-x-2">
              <RefreshCw className="w-4 h-4" />
              <span>Sync Data</span>
            </button>
            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
            <div className="flex items-center justify-between mb-2">
              <DollarSign className="w-8 h-8 text-green-600" />
              <span className="text-green-600 text-sm font-medium">+24%</span>
            </div>
            <div className="text-3xl font-bold text-green-900 mb-1">$2.4M</div>
            <div className="text-sm text-green-700">Monthly Revenue</div>
            <div className="text-xs text-gray-600 mt-1">vs $1.9M last month</div>
          </div>
          
          <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-xl border border-red-200">
            <div className="flex items-center justify-between mb-2">
              <TrendingDown className="w-8 h-8 text-red-600" />
              <span className="text-red-600 text-sm font-medium">+5%</span>
            </div>
            <div className="text-3xl font-bold text-red-900 mb-1">$85K</div>
            <div className="text-sm text-red-700">Monthly Burn</div>
            <div className="text-xs text-gray-600 mt-1">vs $81K last month</div>
          </div>
          
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
            <div className="flex items-center justify-between mb-2">
              <Percent className="w-8 h-8 text-blue-600" />
              <span className="text-green-600 text-sm font-medium">+2%</span>
            </div>
            <div className="text-3xl font-bold text-blue-900 mb-1">68%</div>
            <div className="text-sm text-blue-700">Gross Margin</div>
            <div className="text-xs text-gray-600 mt-1">vs 66% last month</div>
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200">
            <div className="flex items-center justify-between mb-2">
              <Clock className="w-8 h-8 text-purple-600" />
              <span className="text-green-600 text-sm font-medium">+2 months</span>
            </div>
            <div className="text-3xl font-bold text-purple-900 mb-1">18</div>
            <div className="text-sm text-purple-700">Months Runway</div>
            <div className="text-xs text-gray-600 mt-1">at current burn rate</div>
          </div>
        </div>
      </div>

      {/* Cash Flow Timeline */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Cash Flow Timeline</h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">30 Days</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900">Inflows</div>
                  <div className="text-sm text-gray-600">Customer payments, grants</div>
                </div>
                <div className="text-lg font-bold text-green-900">+$2.4M</div>
              </div>
              <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900">Outflows</div>
                  <div className="text-sm text-gray-600">Salaries, operations, marketing</div>
                </div>
                <div className="text-lg font-bold text-red-900">-$85K</div>
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900">Net Cash Flow</div>
                  <div className="text-sm text-gray-600">Monthly change</div>
                </div>
                <div className="text-lg font-bold text-blue-900">+$2.3M</div>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">60 Days</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900">Projected Inflows</div>
                  <div className="text-sm text-gray-600">Based on current pipeline</div>
                </div>
                <div className="text-lg font-bold text-green-900">+$2.6M</div>
              </div>
              <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900">Projected Outflows</div>
                  <div className="text-sm text-gray-600">Including planned hires</div>
                </div>
                <div className="text-lg font-bold text-red-900">-$95K</div>
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900">Projected Net</div>
                  <div className="text-sm text-gray-600">Expected change</div>
                </div>
                <div className="text-lg font-bold text-blue-900">+$2.5M</div>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">90 Days</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900">Expected Inflows</div>
                  <div className="text-sm text-gray-600">Q1 projections</div>
                </div>
                <div className="text-lg font-bold text-green-900">+$2.8M</div>
              </div>
              <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900">Expected Outflows</div>
                  <div className="text-sm text-gray-600">Full team expansion</div>
                </div>
                <div className="text-lg font-bold text-red-900">-$110K</div>
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900">Expected Net</div>
                  <div className="text-sm text-gray-600">Q1 forecast</div>
                </div>
                <div className="text-lg font-bold text-blue-900">+$2.7M</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Forecasting */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Financial Forecasting</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Scenario Planning</h4>
            <div className="space-y-4">
              {[
                { 
                  scenario: "Conservative", 
                  revenue: "$2.1M", 
                  burn: "$85K", 
                  runway: "15 months",
                  color: "red"
                },
                { 
                  scenario: "Current Growth", 
                  revenue: "$2.4M", 
                  burn: "$85K", 
                  runway: "18 months",
                  color: "blue"
                },
                { 
                  scenario: "Optimistic", 
                  revenue: "$2.8M", 
                  burn: "$95K", 
                  runway: "22 months",
                  color: "green"
                }
              ].map((scenario, index) => (
                <div key={index} className={`p-4 border border-gray-200 rounded-lg bg-${scenario.color}-50`}>
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-medium text-gray-900">{scenario.scenario}</h5>
                    <span className={`px-2 py-1 text-xs rounded-full bg-${scenario.color}-100 text-${scenario.color}-800`}>
                      {scenario.runway}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Revenue:</span>
                      <span className="font-medium ml-2">{scenario.revenue}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Burn:</span>
                      <span className="font-medium ml-2">{scenario.burn}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Multi-Currency Support</h4>
            <div className="space-y-3">
              {[
                { currency: "USD", amount: "$2.4M", rate: "1.00", primary: true },
                { currency: "EUR", amount: "€2.2M", rate: "0.92", primary: false },
                { currency: "GBP", amount: "£1.9M", rate: "0.79", primary: false },
                { currency: "INR", amount: "₹200M", rate: "83.33", primary: false }
              ].map((currency, index) => (
                <div key={index} className={`p-3 border border-gray-200 rounded-lg ${currency.primary ? 'bg-blue-50 border-blue-200' : 'hover:bg-gray-50'}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-900">{currency.currency}</div>
                      <div className="text-sm text-gray-600">Rate: {currency.rate}</div>
                    </div>
                    <div className="text-lg font-bold text-gray-900">{currency.amount}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Integrations */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Connected Integrations</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: "QuickBooks", status: "connected", icon: "📊", lastSync: "2 min ago" },
            { name: "Stripe", status: "connected", icon: "💳", lastSync: "1 min ago" },
            { name: "Xero", status: "disconnected", icon: "📈", lastSync: "Never" },
            { name: "Zoho Books", status: "connected", icon: "📋", lastSync: "5 min ago" },
            { name: "Tally", status: "disconnected", icon: "🧮", lastSync: "Never" },
            { name: "Razorpay", status: "connected", icon: "💸", lastSync: "3 min ago" },
            { name: "PayPal", status: "connected", icon: "🅿️", lastSync: "1 min ago" },
            { name: "Deel", status: "connected", icon: "🌍", lastSync: "10 min ago" }
          ].map((integration, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg text-center hover:shadow-md transition-shadow">
              <div className="text-2xl mb-2">{integration.icon}</div>
              <div className="font-medium text-gray-900">{integration.name}</div>
              <div className={`text-xs mt-1 ${
                integration.status === 'connected' ? 'text-green-600' : 'text-red-600'
              }`}>
                {integration.status}
              </div>
              <div className="text-xs text-gray-500 mt-1">{integration.lastSync}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Hiring & Talent Management
  const renderHiringTalent = () => (
    <div className="space-y-6">
      {/* Job Board */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Job Board</h2>
          <div className="flex items-center space-x-2">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>Post Job</span>
            </button>
            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center space-x-2">
              <Globe className="w-4 h-4" />
              <span>Public View</span>
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "Senior Full Stack Developer",
              department: "Engineering",
              type: "Full-time",
              location: "San Francisco, CA",
              salary: "$120k - $160k",
              applicants: 24,
              status: "Active",
              posted: "2 days ago",
              priority: "high"
            },
            {
              title: "Product Marketing Manager",
              department: "Marketing",
              type: "Full-time",
              location: "Remote",
              salary: "$90k - $120k",
              applicants: 18,
              status: "Active",
              posted: "1 week ago",
              priority: "medium"
            },
            {
              title: "Customer Success Specialist",
              department: "Customer Success",
              type: "Full-time",
              location: "New York, NY",
              salary: "$60k - $80k",
              applicants: 32,
              status: "Active",
              posted: "3 days ago",
              priority: "high"
            },
            {
              title: "DevOps Engineer",
              department: "Engineering",
              type: "Contract",
              location: "Austin, TX",
              salary: "$100k - $130k",
              applicants: 12,
              status: "Paused",
              posted: "2 weeks ago",
              priority: "low"
            },
            {
              title: "Sales Development Rep",
              department: "Sales",
              type: "Full-time",
              location: "Chicago, IL",
              salary: "$50k - $70k + Commission",
              applicants: 45,
              status: "Active",
              posted: "5 days ago",
              priority: "high"
            },
            {
              title: "UX/UI Designer",
              department: "Design",
              type: "Full-time",
              location: "Seattle, WA",
              salary: "$80k - $110k",
              applicants: 28,
              status: "Active",
              posted: "1 week ago",
              priority: "medium"
            }
          ].map((job, index) => (
            <div key={index} className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{job.title}</h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                    <span>🏢 {job.department}</span>
                    <span>📍 {job.location}</span>
                    <span>💰 {job.salary}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    job.priority === 'high' ? 'bg-red-100 text-red-800' :
                    job.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {job.priority}
                  </span>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    job.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {job.status}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span>👥 {job.applicants} applicants</span>
                  <span>📅 {job.posted}</span>
                </div>
                <span className="text-sm font-medium text-gray-900">{job.type}</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <button className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700">
                  View Applicants
                </button>
                <button className="px-3 py-2 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50">
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Applicant Tracker */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Applicant Tracker</h3>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {[
            { 
              stage: "Applied", 
              count: 12, 
              color: "blue",
              applicants: [
                { name: "Sarah Johnson", role: "Senior Developer", experience: "5 years", score: 85, applied: "2 hours ago" },
                { name: "Mike Chen", role: "Full Stack Dev", experience: "3 years", score: 78, applied: "4 hours ago" }
              ]
            },
            { 
              stage: "Screening", 
              count: 8, 
              color: "yellow",
              applicants: [
                { name: "Emma Davis", role: "Product Manager", experience: "4 years", score: 92, applied: "1 day ago" },
                { name: "Alex Wilson", role: "UX Designer", experience: "6 years", score: 88, applied: "2 days ago" }
              ]
            },
            { 
              stage: "Interview", 
              count: 5, 
              color: "purple",
              applicants: [
                { name: "David Brown", role: "DevOps Engineer", experience: "7 years", score: 95, applied: "3 days ago" }
              ]
            },
            { 
              stage: "Offer", 
              count: 2, 
              color: "green",
              applicants: [
                { name: "Lisa Garcia", role: "Marketing Manager", experience: "5 years", score: 90, applied: "1 week ago" }
              ]
            }
          ].map((stage, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-gray-900">{stage.stage}</h4>
                <span className={`px-2 py-1 text-xs rounded-full bg-${stage.color}-100 text-${stage.color}-800`}>
                  {stage.count}
                </span>
              </div>
              <div className="space-y-3">
                {stage.applicants.map((applicant, aIndex) => (
                  <div key={aIndex} className="bg-white p-3 rounded-lg border border-gray-200 hover:shadow-sm transition-shadow">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-medium text-gray-900 text-sm">{applicant.name}</h5>
                      <span className="text-xs font-medium text-gray-600">{applicant.score}/100</span>
                    </div>
                    <div className="text-xs text-gray-600 mb-2">
                      <div>{applicant.role} • {applicant.experience}</div>
                      <div>Applied {applicant.applied}</div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="flex-1 px-2 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700">
                        View
                      </button>
                      <button className="px-2 py-1 border border-gray-300 text-gray-700 text-xs rounded hover:bg-gray-50">
                        Move
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Employee Profiles */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Employee Profiles</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              name: "Sarah Johnson",
              role: "CTO",
              department: "Engineering",
              avatar: "SJ",
              joinDate: "Jan 2023",
              skills: ["React", "Node.js", "AWS", "Leadership"],
              performance: 4.8,
              projects: 12,
              status: "Active"
            },
            {
              name: "Mike Chen",
              role: "Head of Marketing",
              department: "Marketing",
              avatar: "MC",
              joinDate: "Mar 2023",
              skills: ["Growth Marketing", "SEO", "Analytics", "Branding"],
              performance: 4.6,
              projects: 8,
              status: "Active"
            },
            {
              name: "Emma Davis",
              role: "Head of Sales",
              department: "Sales",
              avatar: "ED",
              joinDate: "Feb 2023",
              skills: ["Sales Strategy", "CRM", "Negotiation", "Team Building"],
              performance: 4.9,
              projects: 15,
              status: "Active"
            },
            {
              name: "Alex Wilson",
              role: "Product Manager",
              department: "Product",
              avatar: "AW",
              joinDate: "Apr 2023",
              skills: ["Product Strategy", "User Research", "Agile", "Data Analysis"],
              performance: 4.7,
              projects: 10,
              status: "Active"
            },
            {
              name: "Lisa Garcia",
              role: "UX Designer",
              department: "Design",
              avatar: "LG",
              joinDate: "May 2023",
              skills: ["UI/UX Design", "Figma", "User Testing", "Prototyping"],
              performance: 4.5,
              projects: 6,
              status: "Active"
            },
            {
              name: "David Brown",
              role: "DevOps Engineer",
              department: "Engineering",
              avatar: "DB",
              joinDate: "Jun 2023",
              skills: ["Docker", "Kubernetes", "CI/CD", "Monitoring"],
              performance: 4.8,
              projects: 9,
              status: "Active"
            }
          ].map((employee, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="flex items-start space-x-3 mb-4">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                  {employee.avatar}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{employee.name}</h4>
                  <p className="text-sm text-gray-600">{employee.role} • {employee.department}</p>
                  <p className="text-xs text-gray-500">Joined {employee.joinDate}</p>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  employee.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {employee.status}
                </span>
              </div>
              
              <div className="mb-4">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-gray-600">Performance</span>
                  <span className="font-medium">{employee.performance}/5.0</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{width: `${(employee.performance / 5) * 100}%`}}></div>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="text-sm text-gray-600 mb-2">Skills</div>
                <div className="flex flex-wrap gap-1">
                  {employee.skills.map((skill, skillIndex) => (
                    <span key={skillIndex} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>📁 {employee.projects} projects</span>
                <button className="text-blue-600 hover:text-blue-800 font-medium">
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Referrals Hub */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Referrals Hub</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Active Referrals</h4>
            <div className="space-y-3">
              {[
                {
                  referrer: "Sarah Johnson",
                  candidate: "John Smith",
                  role: "Senior Developer",
                  status: "Interview Scheduled",
                  reward: "$2,000",
                  date: "2 days ago"
                },
                {
                  referrer: "Mike Chen",
                  candidate: "Jane Doe",
                  role: "Marketing Manager",
                  status: "Under Review",
                  reward: "$1,500",
                  date: "1 week ago"
                },
                {
                  referrer: "Emma Davis",
                  candidate: "Bob Wilson",
                  role: "Sales Rep",
                  status: "Hired",
                  reward: "$1,000",
                  date: "2 weeks ago"
                }
              ].map((referral, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-medium text-gray-900">{referral.candidate}</h5>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      referral.status === 'Hired' ? 'bg-green-100 text-green-800' :
                      referral.status === 'Interview Scheduled' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {referral.status}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 mb-2">
                    <div>Role: {referral.role}</div>
                    <div>Referred by: {referral.referrer}</div>
                    <div>Date: {referral.date}</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-green-600">Reward: {referral.reward}</span>
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Referral Program</h4>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h5 className="font-medium text-gray-900 mb-2">Current Rewards</h5>
                <div className="space-y-2 text-sm text-gray-600">
                  <div>• Engineering roles: $2,000</div>
                  <div>• Marketing roles: $1,500</div>
                  <div>• Sales roles: $1,000</div>
                  <div>• Other roles: $500</div>
                </div>
              </div>
              
              <div className="p-4 bg-green-50 rounded-lg">
                <h5 className="font-medium text-gray-900 mb-2">Program Stats</h5>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-2xl font-bold text-green-900">12</div>
                    <div className="text-green-700">Total Referrals</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-900">3</div>
                    <div className="text-green-700">Successful Hires</div>
                  </div>
                </div>
              </div>
              
              <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Share Referral Link
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Growth Strategy & Insights
  const renderGrowthStrategy = () => (
    <div className="space-y-6">
      {/* Market Dashboard */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Market Dashboard</h2>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2">
            <RefreshCw className="w-4 h-4" />
            <span>Update Data</span>
          </button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Competitor Benchmarks</h3>
            <div className="space-y-3">
              {[
                { name: "Competitor A", marketShare: "25%", funding: "$50M", growth: "+15%", status: "Strong" },
                { name: "Competitor B", marketShare: "18%", funding: "$30M", growth: "+8%", status: "Growing" },
                { name: "Competitor C", marketShare: "12%", funding: "$20M", growth: "+5%", status: "Stable" },
                { name: "Your Startup", marketShare: "8%", funding: "$5.8M", growth: "+24%", status: "Rising" }
              ].map((competitor, index) => (
                <div key={index} className={`p-4 border border-gray-200 rounded-lg ${
                  competitor.name === 'Your Startup' ? 'bg-blue-50 border-blue-200' : 'hover:bg-gray-50'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{competitor.name}</h4>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      competitor.status === 'Strong' ? 'bg-green-100 text-green-800' :
                      competitor.status === 'Growing' ? 'bg-blue-100 text-blue-800' :
                      competitor.status === 'Rising' ? 'bg-purple-100 text-purple-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {competitor.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm text-gray-600">
                    <div>Share: {competitor.marketShare}</div>
                    <div>Funding: {competitor.funding}</div>
                    <div>Growth: {competitor.growth}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Funding Rounds</h3>
            <div className="space-y-3">
              {[
                { company: "TechFlow AI", amount: "$15M", stage: "Series A", date: "2 days ago", sector: "AI" },
                { company: "DataVault", amount: "$8M", stage: "Seed", date: "1 week ago", sector: "Cybersecurity" },
                { company: "CloudScale", amount: "$25M", stage: "Series B", date: "2 weeks ago", sector: "Cloud" },
                { company: "GreenTech", amount: "$12M", stage: "Series A", date: "3 weeks ago", sector: "CleanTech" }
              ].map((round, index) => (
                <div key={index} className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <div className="flex items-center justify-between mb-1">
                    <h5 className="font-medium text-gray-900">{round.company}</h5>
                    <span className="text-sm font-bold text-green-600">{round.amount}</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    {round.stage} • {round.sector} • {round.date}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Customer Feedback Hub */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Customer Feedback Hub</h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">NPS Score</h4>
            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
              <div className="text-4xl font-bold text-green-900 mb-2">72</div>
              <div className="text-sm text-green-700">Net Promoter Score</div>
              <div className="text-xs text-gray-600 mt-1">+2 from last month</div>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Customer Satisfaction</h4>
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
              <div className="text-4xl font-bold text-blue-900 mb-2">4.8/5</div>
              <div className="text-sm text-blue-700">Average Rating</div>
              <div className="text-xs text-gray-600 mt-1">Based on 1,247 reviews</div>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Response Rate</h4>
            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
              <div className="text-4xl font-bold text-purple-900 mb-2">68%</div>
              <div className="text-sm text-purple-700">Survey Response</div>
              <div className="text-xs text-gray-600 mt-1">Last 30 days</div>
            </div>
          </div>
        </div>
        
        <div className="mt-6">
          <h4 className="font-semibold text-gray-900 mb-4">Recent Testimonials</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                name: "Sarah Johnson",
                company: "TechCorp",
                role: "CTO",
                rating: 5,
                comment: "StartupOS has revolutionized how we manage our startup operations. The all-in-one platform is exactly what we needed.",
                date: "2 days ago"
              },
              {
                name: "Mike Chen",
                company: "InnovateLab",
                role: "Founder",
                rating: 5,
                comment: "The investor relations tools are incredible. We've streamlined our fundraising process significantly.",
                date: "1 week ago"
              },
              {
                name: "Emma Davis",
                company: "GrowthCo",
                role: "CEO",
                rating: 4,
                comment: "Great platform overall. The team collaboration features are particularly useful for remote teams.",
                date: "2 weeks ago"
              },
              {
                name: "Alex Wilson",
                company: "ScaleUp",
                role: "COO",
                rating: 5,
                comment: "The financial dashboard gives us real-time insights into our business performance. Highly recommended!",
                date: "3 weeks ago"
              }
            ].map((testimonial, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">{testimonial.date}</span>
                </div>
                <p className="text-gray-700 mb-3">"{testimonial.comment}"</p>
                <div className="text-sm text-gray-600">
                  <div className="font-medium">{testimonial.name}</div>
                  <div>{testimonial.role} at {testimonial.company}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Insights */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-6">AI Insights</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Performance Insights</h4>
            <div className="space-y-4">
              {[
                {
                  insight: "Your CAC rose 15% last month",
                  recommendation: "Optimize ad spend and focus on organic growth channels",
                  priority: "high",
                  impact: "Could save $12K/month"
                },
                {
                  insight: "Customer churn decreased by 8%",
                  recommendation: "Continue current retention strategies",
                  priority: "low",
                  impact: "Positive trend"
                },
                {
                  insight: "Revenue growth rate is 2x industry average",
                  recommendation: "Consider expanding to new markets",
                  priority: "medium",
                  impact: "Potential 40% growth"
                }
              ].map((insight, index) => (
                <div key={index} className={`p-4 border border-gray-200 rounded-lg ${
                  insight.priority === 'high' ? 'bg-red-50 border-red-200' :
                  insight.priority === 'medium' ? 'bg-yellow-50 border-yellow-200' :
                  'bg-green-50 border-green-200'
                }`}>
                  <div className="flex items-start justify-between mb-2">
                    <h5 className="font-medium text-gray-900">{insight.insight}</h5>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      insight.priority === 'high' ? 'bg-red-100 text-red-800' :
                      insight.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {insight.priority}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{insight.recommendation}</p>
                  <div className="text-xs text-gray-500">Impact: {insight.impact}</div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Growth Opportunities</h4>
            <div className="space-y-4">
              {[
                {
                  opportunity: "Expand to European markets",
                  potential: "High",
                  effort: "Medium",
                  timeline: "6 months",
                  revenue: "+$2M ARR"
                },
                {
                  opportunity: "Launch mobile app",
                  potential: "Medium",
                  effort: "High",
                  timeline: "4 months",
                  revenue: "+$800K ARR"
                },
                {
                  opportunity: "Enterprise sales program",
                  potential: "High",
                  effort: "High",
                  timeline: "8 months",
                  revenue: "+$5M ARR"
                }
              ].map((opportunity, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <h5 className="font-medium text-gray-900 mb-2">{opportunity.opportunity}</h5>
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-2">
                    <div>Potential: <span className="font-medium">{opportunity.potential}</span></div>
                    <div>Effort: <span className="font-medium">{opportunity.effort}</span></div>
                    <div>Timeline: <span className="font-medium">{opportunity.timeline}</span></div>
                    <div>Revenue: <span className="font-medium text-green-600">{opportunity.revenue}</span></div>
                  </div>
                  <button className="w-full px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700">
                    Explore Opportunity
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Playbooks Library */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Playbooks Library</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "SaaS Growth Playbook",
              category: "Growth",
              description: "Complete guide to scaling SaaS businesses from $0 to $10M ARR",
              downloads: 1.2,
              rating: 4.8,
              tags: ["SaaS", "Growth", "Scaling"]
            },
            {
              title: "B2B Sales Framework",
              category: "Sales",
              description: "Proven methodology for B2B sales success and pipeline management",
              downloads: 856,
              rating: 4.6,
              tags: ["Sales", "B2B", "Framework"]
            },
            {
              title: "Product-Led Growth Guide",
              category: "Marketing",
              description: "How to build products that sell themselves through user experience",
              downloads: 2.1,
              rating: 4.9,
              tags: ["PLG", "Marketing", "Product"]
            },
            {
              title: "Fundraising Masterclass",
              category: "Fundraising",
              description: "Step-by-step guide to raising venture capital and scaling your startup",
              downloads: 3.4,
              rating: 4.7,
              tags: ["Fundraising", "VC", "Pitching"]
            },
            {
              title: "Remote Team Management",
              category: "Operations",
              description: "Best practices for managing distributed teams and maintaining culture",
              downloads: 1.8,
              rating: 4.5,
              tags: ["Remote", "Management", "Culture"]
            },
            {
              title: "Customer Success Playbook",
              category: "Customer Success",
              description: "Strategies for reducing churn and increasing customer lifetime value",
              downloads: 1.5,
              rating: 4.8,
              tags: ["CS", "Retention", "LTV"]
            }
          ].map((playbook, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <h4 className="font-medium text-gray-900">{playbook.title}</h4>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                  {playbook.category}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-3">{playbook.description}</p>
              <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                <span>📥 {playbook.downloads}K downloads</span>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span>{playbook.rating}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-1 mb-3">
                {playbook.tags.map((tag, tagIndex) => (
                  <span key={tagIndex} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                    {tag}
                  </span>
                ))}
              </div>
              <button className="w-full px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700">
                Download Playbook
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Compliance & Legal
  const renderComplianceLegal = () => (
    <div className="space-y-6">
      {/* Compliance Checklist */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Compliance Checklist</h2>
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center space-x-2">
            <CheckCircle className="w-4 h-4" />
            <span>Mark Complete</span>
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              category: "Tax & Financial",
              items: [
                { name: "Q4 Tax Filing", status: "completed", dueDate: "Dec 31, 2024", priority: "high" },
                { name: "VAT Registration", status: "pending", dueDate: "Jan 15, 2025", priority: "medium" },
                { name: "Payroll Tax Filing", status: "completed", dueDate: "Dec 15, 2024", priority: "high" },
                { name: "Annual Financial Audit", status: "in_progress", dueDate: "Mar 31, 2025", priority: "medium" }
              ]
            },
            {
              category: "Legal & Corporate",
              items: [
                { name: "Annual Report Filing", status: "pending", dueDate: "Feb 28, 2025", priority: "high" },
                { name: "Board Meeting Minutes", status: "completed", dueDate: "Dec 1, 2024", priority: "medium" },
                { name: "IP Protection Review", status: "pending", dueDate: "Jan 30, 2025", priority: "medium" },
                { name: "Contract Renewals", status: "in_progress", dueDate: "Dec 20, 2024", priority: "high" }
              ]
            },
            {
              category: "HR & Employment",
              items: [
                { name: "Employee Handbook Update", status: "completed", dueDate: "Nov 30, 2024", priority: "low" },
                { name: "OSHA Compliance Review", status: "pending", dueDate: "Jan 15, 2025", priority: "medium" },
                { name: "Benefits Enrollment", status: "completed", dueDate: "Dec 1, 2024", priority: "high" },
                { name: "Background Check Renewals", status: "pending", dueDate: "Feb 1, 2025", priority: "low" }
              ]
            }
          ].map((category, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-4">{category.category}</h3>
              <div className="space-y-3">
                {category.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-4 h-4 rounded-full border-2 ${
                        item.status === 'completed' ? 'bg-green-500 border-green-500' :
                        item.status === 'in_progress' ? 'bg-yellow-500 border-yellow-500' :
                        'bg-white border-gray-300'
                      }`}>
                        {item.status === 'completed' && <CheckCircle className="w-4 h-4 text-white" />}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 text-sm">{item.name}</div>
                        <div className="text-xs text-gray-600">Due: {item.dueDate}</div>
                      </div>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      item.priority === 'high' ? 'bg-red-100 text-red-800' :
                      item.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {item.priority}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Document Templates */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Document Templates</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "Employment Agreement",
              category: "HR",
              description: "Standard employment contract template with all necessary clauses",
              lastUpdated: "2 weeks ago",
              downloads: 24,
              status: "Active"
            },
            {
              title: "NDA Template",
              category: "Legal",
              description: "Non-disclosure agreement for employees, contractors, and partners",
              lastUpdated: "1 month ago",
              downloads: 45,
              status: "Active"
            },
            {
              title: "ESOP Agreement",
              category: "Legal",
              description: "Employee Stock Option Plan documentation and agreements",
              lastUpdated: "3 weeks ago",
              downloads: 12,
              status: "Active"
            },
            {
              title: "Service Agreement",
              category: "Legal",
              description: "Template for client service agreements and contracts",
              lastUpdated: "1 week ago",
              downloads: 18,
              status: "Active"
            },
            {
              title: "Privacy Policy",
              category: "Compliance",
              description: "GDPR-compliant privacy policy template",
              lastUpdated: "2 months ago",
              downloads: 32,
              status: "Needs Update"
            },
            {
              title: "Terms of Service",
              category: "Compliance",
              description: "Website terms of service and user agreement",
              lastUpdated: "1 month ago",
              downloads: 28,
              status: "Active"
            }
          ].map((template, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <h4 className="font-medium text-gray-900">{template.title}</h4>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  template.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {template.status}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-3">{template.description}</p>
              <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                <span>📥 {template.downloads} downloads</span>
                <span>Updated {template.lastUpdated}</span>
              </div>
              <div className="flex items-center space-x-2">
                <button className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700">
                  Download
                </button>
                <button className="px-3 py-2 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50">
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Deadline Reminders */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Upcoming Deadlines</h3>
        <div className="space-y-4">
          {[
            {
              title: "VAT Filing Due",
              description: "Quarterly VAT return submission",
              dueDate: "Jan 15, 2025",
              daysLeft: 7,
              priority: "high",
              category: "Tax"
            },
            {
              title: "Annual Report Filing",
              description: "Corporate annual report submission to state",
              dueDate: "Feb 28, 2025",
              daysLeft: 51,
              priority: "medium",
              category: "Legal"
            },
            {
              title: "Employee Handbook Review",
              description: "Annual review and update of employee handbook",
              dueDate: "Mar 15, 2025",
              daysLeft: 66,
              priority: "low",
              category: "HR"
            },
            {
              title: "IP Protection Review",
              description: "Annual review of intellectual property portfolio",
              dueDate: "Jan 30, 2025",
              daysLeft: 22,
              priority: "medium",
              category: "Legal"
            }
          ].map((deadline, index) => (
            <div key={index} className={`p-4 border border-gray-200 rounded-lg ${
              deadline.priority === 'high' ? 'bg-red-50 border-red-200' :
              deadline.priority === 'medium' ? 'bg-yellow-50 border-yellow-200' :
              'bg-green-50 border-green-200'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-900">{deadline.title}</h4>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    deadline.priority === 'high' ? 'bg-red-100 text-red-800' :
                    deadline.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {deadline.priority}
                  </span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                    {deadline.category}
                  </span>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-2">{deadline.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Due: {deadline.dueDate}</span>
                <span className={`text-sm font-medium ${
                  deadline.daysLeft <= 7 ? 'text-red-600' :
                  deadline.daysLeft <= 30 ? 'text-yellow-600' :
                  'text-green-600'
                }`}>
                  {deadline.daysLeft} days left
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cap Table Management */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Cap Table Management</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Equity Distribution</h4>
            <div className="space-y-3">
              {[
                { name: "Founders", percentage: 60, shares: "6,000,000", value: "$3.6M" },
                { name: "Employees (ESOP)", percentage: 15, shares: "1,500,000", value: "$900K" },
                { name: "Investors", percentage: 20, shares: "2,000,000", value: "$1.2M" },
                { name: "Advisors", percentage: 3, shares: "300,000", value: "$180K" },
                { name: "Reserve", percentage: 2, shares: "200,000", value: "$120K" }
              ].map((holder, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900">{holder.name}</div>
                    <div className="text-sm text-gray-600">{holder.shares} shares</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-gray-900">{holder.percentage}%</div>
                    <div className="text-sm text-gray-600">{holder.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Recent Transactions</h4>
            <div className="space-y-3">
              {[
                {
                  type: "Stock Grant",
                  recipient: "Sarah Johnson",
                  shares: "50,000",
                  price: "$0.60",
                  date: "Dec 1, 2024",
                  status: "Completed"
                },
                {
                  type: "Investment",
                  recipient: "Sequoia Capital",
                  shares: "2,000,000",
                  price: "$0.60",
                  date: "Nov 15, 2024",
                  status: "Completed"
                },
                {
                  type: "Stock Grant",
                  recipient: "Mike Chen",
                  shares: "25,000",
                  price: "$0.60",
                  date: "Nov 1, 2024",
                  status: "Pending"
                }
              ].map((transaction, index) => (
                <div key={index} className="p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-medium text-gray-900">{transaction.type}</h5>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      transaction.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {transaction.status}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 mb-1">
                    <div>Recipient: {transaction.recipient}</div>
                    <div>Shares: {transaction.shares} @ {transaction.price}</div>
                    <div>Date: {transaction.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Community & Mentorship
  const renderCommunityMentorship = () => (
    <div className="space-y-6">
      {/* Founder Circles */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Founder Circles</h2>
          <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Join Circle</span>
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              name: "SaaS Founders Circle",
              description: "Exclusive group for B2B SaaS founders sharing growth strategies and challenges",
              members: 12,
              nextMeeting: "Dec 20, 2024",
              focus: "Growth & Scaling",
              privacy: "Private"
            },
            {
              name: "AI Startup Circle",
              description: "Community of AI startup founders discussing technology trends and market opportunities",
              members: 8,
              nextMeeting: "Dec 25, 2024",
              focus: "AI & Technology",
              privacy: "Private"
            },
            {
              name: "Female Founders Network",
              description: "Supportive community for women entrepreneurs to share experiences and resources",
              members: 15,
              nextMeeting: "Dec 18, 2024",
              focus: "Diversity & Inclusion",
              privacy: "Private"
            },
            {
              name: "Early Stage Founders",
              description: "Group for pre-seed and seed stage founders navigating early startup challenges",
              members: 20,
              nextMeeting: "Dec 22, 2024",
              focus: "Early Stage",
              privacy: "Private"
            },
            {
              name: "FinTech Circle",
              description: "Specialized group for financial technology startup founders and executives",
              members: 10,
              nextMeeting: "Dec 28, 2024",
              focus: "FinTech",
              privacy: "Private"
            },
            {
              name: "International Founders",
              description: "Global community of founders building startups across different markets",
              members: 25,
              nextMeeting: "Dec 30, 2024",
              focus: "Global Expansion",
              privacy: "Private"
            }
          ].map((circle, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold text-gray-900">{circle.name}</h3>
                <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">
                  {circle.privacy}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-3">{circle.description}</p>
              <div className="space-y-2 text-sm text-gray-600 mb-3">
                <div>👥 {circle.members} members</div>
                <div>📅 Next meeting: {circle.nextMeeting}</div>
                <div>🎯 Focus: {circle.focus}</div>
              </div>
              <button className="w-full px-3 py-2 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700">
                Join Circle
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Mentor Marketplace */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Mentor Marketplace</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              name: "Sarah Johnson",
              title: "Former VP of Growth at Stripe",
              expertise: ["Growth Marketing", "SaaS Scaling", "Team Building"],
              experience: "10+ years",
              rating: 4.9,
              sessions: 150,
              price: "$500/hour",
              availability: "Available",
              specialties: ["B2B SaaS", "Growth", "Leadership"]
            },
            {
              name: "Mike Chen",
              title: "Ex-CTO at Airbnb",
              expertise: ["Technical Leadership", "Product Strategy", "Engineering"],
              experience: "15+ years",
              rating: 4.8,
              sessions: 200,
              price: "$600/hour",
              availability: "Limited",
              specialties: ["Product", "Engineering", "Scale"]
            },
            {
              name: "Emma Davis",
              title: "Former Partner at Andreessen Horowitz",
              expertise: ["Fundraising", "Venture Capital", "Strategy"],
              experience: "12+ years",
              rating: 4.9,
              sessions: 180,
              price: "$800/hour",
              availability: "Available",
              specialties: ["Fundraising", "VC", "Strategy"]
            },
            {
              name: "Alex Wilson",
              title: "Ex-CFO at Uber",
              expertise: ["Financial Planning", "Operations", "M&A"],
              experience: "8+ years",
              rating: 4.7,
              sessions: 120,
              price: "$700/hour",
              availability: "Busy",
              specialties: ["Finance", "Operations", "M&A"]
            },
            {
              name: "Lisa Garcia",
              title: "Former Head of Sales at Salesforce",
              expertise: ["Sales Strategy", "Revenue Operations", "Customer Success"],
              experience: "10+ years",
              rating: 4.8,
              sessions: 160,
              price: "$550/hour",
              availability: "Available",
              specialties: ["Sales", "Revenue", "Customer Success"]
            },
            {
              name: "David Brown",
              title: "Ex-CEO at Dropbox",
              expertise: ["Leadership", "Company Culture", "Scaling"],
              experience: "20+ years",
              rating: 4.9,
              sessions: 300,
              price: "$1000/hour",
              availability: "Limited",
              specialties: ["Leadership", "Culture", "Scale"]
            }
          ].map((mentor, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="flex items-start space-x-3 mb-3">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                  {mentor.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{mentor.name}</h4>
                  <p className="text-sm text-gray-600">{mentor.title}</p>
                  <p className="text-xs text-gray-500">{mentor.experience}</p>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  mentor.availability === 'Available' ? 'bg-green-100 text-green-800' :
                  mentor.availability === 'Limited' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {mentor.availability}
                </span>
              </div>
              
              <div className="mb-3">
                <div className="text-sm text-gray-600 mb-2">Expertise:</div>
                <div className="flex flex-wrap gap-1">
                  {mentor.expertise.map((skill, skillIndex) => (
                    <span key={skillIndex} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span>{mentor.rating}</span>
                  <span>({mentor.sessions} sessions)</span>
                </div>
                <span className="font-medium text-gray-900">{mentor.price}</span>
              </div>
              
              <button className="w-full px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700">
                Book Session
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Events Calendar */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Events Calendar</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Upcoming Events</h4>
            <div className="space-y-3">
              {[
                {
                  title: "Startup Pitch Day",
                  date: "Dec 20, 2024",
                  time: "2:00 PM - 6:00 PM",
                  location: "San Francisco, CA",
                  type: "Pitch Event",
                  attendees: 150,
                  status: "Open"
                },
                {
                  title: "AI in Business Workshop",
                  date: "Dec 25, 2024",
                  time: "10:00 AM - 4:00 PM",
                  location: "Virtual",
                  type: "Workshop",
                  attendees: 75,
                  status: "Open"
                },
                {
                  title: "Founder Networking Mixer",
                  date: "Dec 28, 2024",
                  time: "6:00 PM - 9:00 PM",
                  location: "New York, NY",
                  type: "Networking",
                  attendees: 200,
                  status: "Waitlist"
                },
                {
                  title: "Fundraising Masterclass",
                  date: "Jan 5, 2025",
                  time: "9:00 AM - 5:00 PM",
                  location: "Virtual",
                  type: "Masterclass",
                  attendees: 100,
                  status: "Open"
                }
              ].map((event, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <div className="flex items-start justify-between mb-2">
                    <h5 className="font-medium text-gray-900">{event.title}</h5>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      event.status === 'Open' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {event.status}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 mb-2">
                    <div>📅 {event.date} • {event.time}</div>
                    <div>📍 {event.location}</div>
                    <div>👥 {event.attendees} attendees</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                      {event.type}
                    </span>
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      Register
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Ecosystem Feed</h4>
            <div className="space-y-4">
              {[
                {
                  type: "funding",
                  title: "TechFlow AI raises $15M Series A",
                  description: "AI startup secures funding led by Sequoia Capital",
                  time: "2 hours ago",
                  likes: 24,
                  comments: 8
                },
                {
                  type: "launch",
                  title: "DataVault launches new security platform",
                  description: "Cybersecurity startup announces breakthrough in data protection",
                  time: "4 hours ago",
                  likes: 18,
                  comments: 5
                },
                {
                  type: "partnership",
                  title: "CloudScale partners with Microsoft",
                  description: "Strategic partnership to accelerate cloud adoption",
                  time: "6 hours ago",
                  likes: 32,
                  comments: 12
                },
                {
                  type: "achievement",
                  title: "GreenTech reaches 1M users",
                  description: "CleanTech startup celebrates major milestone",
                  time: "1 day ago",
                  likes: 45,
                  comments: 15
                }
              ].map((post, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <div className="flex items-start space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm ${
                      post.type === 'funding' ? 'bg-green-500' :
                      post.type === 'launch' ? 'bg-blue-500' :
                      post.type === 'partnership' ? 'bg-purple-500' :
                      'bg-orange-500'
                    }`}>
                      {post.type === 'funding' ? '💰' :
                       post.type === 'launch' ? '🚀' :
                       post.type === 'partnership' ? '🤝' : '🏆'}
                    </div>
                    <div className="flex-1">
                      <h5 className="font-medium text-gray-900">{post.title}</h5>
                      <p className="text-sm text-gray-600 mb-2">{post.description}</p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <span>{post.time}</span>
                        <span>👍 {post.likes}</span>
                        <span>💬 {post.comments}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Sequoia Capital-style Investor Functions
  const renderDealPipeline = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Deal Pipeline</h2>
          <div className="flex items-center space-x-3">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Plus size={16} className="inline mr-2" />
              Add Deal
            </button>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
              <Filter size={16} className="inline mr-2" />
              Filter
            </button>
          </div>
        </div>
        
        {/* Pipeline Stages */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { stage: 'Sourcing', count: 12, color: 'blue', deals: ['AI Healthcare Startup', 'Fintech Platform', 'SaaS Tool'] },
            { stage: 'Initial Review', count: 8, color: 'yellow', deals: ['E-commerce Platform', 'EdTech Solution', 'IoT Device'] },
            { stage: 'Due Diligence', count: 5, color: 'orange', deals: ['Blockchain Platform', 'Cybersecurity Tool'] },
            { stage: 'Term Sheet', count: 3, color: 'green', deals: ['AI/ML Platform'] }
          ].map((stage, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900">{stage.stage}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold bg-${stage.color}-100 text-${stage.color}-700`}>
                  {stage.count}
                </span>
              </div>
              <div className="space-y-2">
                {stage.deals.map((deal, dealIndex) => (
                  <div key={dealIndex} className="bg-white rounded-lg p-3 border border-gray-200">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900">{deal}</span>
                      <ChevronRight size={16} className="text-gray-400" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderDealSourcing = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Deal Sourcing</h2>
        
        {/* Sourcing Channels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            { channel: 'Founder Network', deals: 8, description: 'Direct referrals from portfolio founders' },
            { channel: 'Co-Investor Network', deals: 5, description: 'Deals from other VCs and angels' },
            { channel: 'Cold Outreach', deals: 3, description: 'Proactive sourcing and research' }
          ].map((channel, index) => (
            <div key={index} className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-6 border border-blue-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{channel.channel}</h3>
              <p className="text-sm text-gray-600 mb-4">{channel.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-blue-600">{channel.deals}</span>
                <span className="text-sm text-gray-500">active deals</span>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Sourcing Activity */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Sourcing Activity</h3>
          <div className="space-y-3">
            {[
              { company: 'TechCorp AI', source: 'Portfolio Founder', stage: 'Initial Review', date: '2 hours ago' },
              { company: 'DataFlow Inc', source: 'Co-Investor', stage: 'Sourcing', date: '1 day ago' },
              { company: 'CloudScale', source: 'Cold Outreach', stage: 'Due Diligence', date: '3 days ago' }
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Building size={20} className="text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{activity.company}</h4>
                    <p className="text-sm text-gray-500">Source: {activity.source}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-sm font-medium text-gray-900">{activity.stage}</span>
                  <p className="text-xs text-gray-500">{activity.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderDueDiligence = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Due Diligence</h2>
        
        {/* DD Checklist */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { category: 'Financial', items: ['Financial Statements', 'Unit Economics', 'Revenue Model', 'Burn Rate'], completed: 3, total: 4 },
            { category: 'Technical', items: ['Product Demo', 'Code Review', 'Security Audit', 'Scalability'], completed: 2, total: 4 },
            { category: 'Market', items: ['Market Size', 'Competition', 'Customer Interviews', 'Go-to-Market'], completed: 4, total: 4 },
            { category: 'Legal', items: ['IP Review', 'Contracts', 'Compliance', 'Regulatory'], completed: 1, total: 4 }
          ].map((category, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{category.category}</h3>
                <span className="text-sm text-gray-500">{category.completed}/{category.total}</span>
              </div>
              <div className="space-y-2">
                {category.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      itemIndex < category.completed ? 'bg-green-500 border-green-500' : 'border-gray-300'
                    }`}>
                      {itemIndex < category.completed && <CheckCircle size={12} className="text-white" />}
                    </div>
                    <span className={`text-sm ${
                      itemIndex < category.completed ? 'text-gray-900' : 'text-gray-500'
                    }`}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderTermSheets = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Term Sheets</h2>
        
        {/* Active Term Sheets */}
        <div className="space-y-4">
          {[
            { company: 'AI HealthTech', amount: '$5M', valuation: '$25M', stage: 'Draft', date: '2 days ago' },
            { company: 'FinTech Platform', amount: '$8M', valuation: '$40M', stage: 'Review', date: '1 week ago' },
            { company: 'SaaS Tool', amount: '$3M', valuation: '$15M', stage: 'Signed', date: '2 weeks ago' }
          ].map((sheet, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{sheet.company}</h3>
                  <p className="text-sm text-gray-500">Investment: {sheet.amount} • Valuation: {sheet.valuation}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    sheet.stage === 'Signed' ? 'bg-green-100 text-green-700' :
                    sheet.stage === 'Review' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {sheet.stage}
                  </span>
                  <button className="p-2 text-gray-400 hover:text-gray-600">
                    <MoreVertical size={16} />
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>Created: {sheet.date}</span>
                <div className="flex items-center space-x-4">
                  <button className="text-blue-600 hover:text-blue-700">View</button>
                  <button className="text-gray-600 hover:text-gray-700">Edit</button>
                  <button className="text-gray-600 hover:text-gray-700">Download</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderBoardManagement = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Board Management</h2>
        
        {/* Board Meetings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {[
            { company: 'TechStart Inc', nextMeeting: 'Dec 15, 2024', status: 'Scheduled', boardMembers: 5 },
            { company: 'DataFlow Corp', nextMeeting: 'Dec 20, 2024', status: 'Scheduled', boardMembers: 4 },
            { company: 'CloudScale Ltd', nextMeeting: 'Dec 10, 2024', status: 'Completed', boardMembers: 6 }
          ].map((board, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{board.company}</h3>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  board.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                }`}>
                  {board.status}
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Next Meeting:</span>
                  <span className="font-medium">{board.nextMeeting}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Board Members:</span>
                  <span className="font-medium">{board.boardMembers}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderValueCreation = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Value Creation</h2>
        
        {/* Value Creation Initiatives */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { initiative: 'Hiring Support', companies: 8, impact: 'High', description: 'Helping portfolio companies hire key executives' },
            { initiative: 'Strategic Partnerships', companies: 5, impact: 'Medium', description: 'Connecting portfolio companies with strategic partners' },
            { initiative: 'Product Development', companies: 3, impact: 'High', description: 'Providing product strategy and development guidance' }
          ].map((initiative, index) => (
            <div key={index} className="bg-gradient-to-br from-green-50 to-blue-50 rounded-lg p-6 border border-green-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{initiative.initiative}</h3>
              <p className="text-sm text-gray-600 mb-4">{initiative.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-green-600">{initiative.companies}</span>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  initiative.impact === 'High' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {initiative.impact} Impact
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderLPRelations = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">LP Relations</h2>
        
        {/* LP Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { metric: 'Total LPs', value: '45', change: '+3' },
            { metric: 'Fund Size', value: '$2.1B', change: '+$200M' },
            { metric: 'Commitments', value: '$1.8B', change: '+$150M' },
            { metric: 'IRR', value: '28.5%', change: '+2.1%' }
          ].map((metric, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-sm font-medium text-gray-500 mb-2">{metric.metric}</h3>
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-gray-900">{metric.value}</span>
                <span className="text-sm text-green-600 font-medium">{metric.change}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Recent LP Communications */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent LP Communications</h3>
          <div className="space-y-3">
            {[
              { lp: 'Pension Fund A', type: 'Quarterly Report', date: 'Dec 1, 2024', status: 'Sent' },
              { lp: 'Endowment B', type: 'Annual Meeting', date: 'Nov 28, 2024', status: 'Scheduled' },
              { lp: 'Family Office C', type: 'Portfolio Update', date: 'Nov 25, 2024', status: 'Sent' }
            ].map((communication, index) => (
              <div key={index} className="flex items-center justify-between bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Users size={20} className="text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{communication.lp}</h4>
                    <p className="text-sm text-gray-500">{communication.type}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    communication.status === 'Sent' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {communication.status}
                  </span>
                  <p className="text-xs text-gray-500 mt-1">{communication.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderFundManagement = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Fund Management</h2>
        
        {/* Fund Performance */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-6 border border-blue-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Fund Performance</h3>
            <div className="space-y-3">
              {[
                { fund: 'Fund V (2020)', size: '$500M', irr: '32.1%', tvpi: '2.4x' },
                { fund: 'Fund IV (2017)', size: '$300M', irr: '28.7%', tvpi: '2.1x' },
                { fund: 'Fund III (2014)', size: '$200M', irr: '25.3%', tvpi: '1.8x' }
              ].map((fund, index) => (
                <div key={index} className="flex items-center justify-between bg-white rounded-lg p-4 border border-gray-200">
                  <div>
                    <h4 className="font-medium text-gray-900">{fund.fund}</h4>
                    <p className="text-sm text-gray-500">Size: {fund.size}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-600">{fund.irr}</div>
                    <div className="text-sm text-gray-500">TVPI: {fund.tvpi}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-lg p-6 border border-green-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Capital Deployment</h3>
            <div className="space-y-3">
              {[
                { stage: 'Seed', deployed: '$45M', remaining: '$55M', percentage: 45 },
                { stage: 'Series A', deployed: '$120M', remaining: '$80M', percentage: 60 },
                { stage: 'Series B+', deployed: '$200M', remaining: '$100M', percentage: 67 }
              ].map((stage, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900">{stage.stage}</span>
                    <span className="text-sm text-gray-500">{stage.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${stage.percentage}%` }}
                    ></div>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Deployed: {stage.deployed}</span>
                    <span>Remaining: {stage.remaining}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderLPReporting = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">LP Reporting</h2>
        
        {/* Report Templates */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { type: 'Quarterly Report', lastSent: 'Dec 1, 2024', recipients: 45, status: 'Sent' },
            { type: 'Annual Report', lastSent: 'Jan 15, 2024', recipients: 45, status: 'Draft' },
            { type: 'Portfolio Update', lastSent: 'Nov 15, 2024', recipients: 45, status: 'Sent' }
          ].map((report, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{report.type}</h3>
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Last Sent:</span>
                  <span className="font-medium">{report.lastSent}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Recipients:</span>
                  <span className="font-medium">{report.recipients}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  report.status === 'Sent' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {report.status}
                </span>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  {report.status === 'Sent' ? 'View' : 'Edit'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderTrendAnalysis = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Trend Analysis</h2>
        
        {/* Market Trends */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { trend: 'AI/ML Adoption', growth: '+45%', description: 'Enterprise AI adoption accelerating', impact: 'High' },
            { trend: 'Climate Tech', growth: '+32%', description: 'Green technology investments surging', impact: 'Medium' },
            { trend: 'Web3 Infrastructure', growth: '+28%', description: 'Blockchain infrastructure maturing', impact: 'Medium' },
            { trend: 'Healthcare Tech', growth: '+38%', description: 'Digital health solutions expanding', impact: 'High' }
          ].map((trend, index) => (
            <div key={index} className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg p-6 border border-purple-200">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-900">{trend.trend}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  trend.impact === 'High' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {trend.impact} Impact
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-3">{trend.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-purple-600">{trend.growth}</span>
                <span className="text-sm text-gray-500">YoY Growth</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderCompetitiveIntel = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Competitive Intelligence</h2>
        
        {/* Competitor Analysis */}
        <div className="space-y-4">
          {[
            { competitor: 'Andreessen Horowitz', focus: 'Crypto, AI', recentDeals: 12, avgCheck: '$15M' },
            { competitor: 'Sequoia Capital', focus: 'Enterprise, Consumer', recentDeals: 8, avgCheck: '$20M' },
            { competitor: 'Accel Partners', focus: 'SaaS, Fintech', recentDeals: 15, avgCheck: '$12M' }
          ].map((competitor, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{competitor.competitor}</h3>
                  <p className="text-sm text-gray-500">Focus: {competitor.focus}</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-blue-600">{competitor.recentDeals}</div>
                  <div className="text-sm text-gray-500">Recent Deals</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-gray-500">Average Check Size:</span>
                  <div className="font-medium">{competitor.avgCheck}</div>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Market Share:</span>
                  <div className="font-medium">12.5%</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderFounderNetwork = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Founder Network</h2>
        
        {/* Portfolio Founders */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { name: 'Sarah Chen', company: 'AI HealthTech', stage: 'Series A', status: 'Active' },
            { name: 'Michael Rodriguez', company: 'FinTech Platform', stage: 'Series B', status: 'Active' },
            { name: 'Emily Watson', company: 'SaaS Tool', stage: 'Seed', status: 'Active' },
            { name: 'David Kim', company: 'Blockchain Platform', stage: 'Series A', status: 'Exited' },
            { name: 'Lisa Zhang', company: 'EdTech Solution', stage: 'Series B', status: 'Active' },
            { name: 'James Wilson', company: 'IoT Device', stage: 'Series A', status: 'Active' }
          ].map((founder, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <User size={24} className="text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{founder.name}</h3>
                  <p className="text-sm text-gray-500">{founder.company}</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Stage:</span>
                  <span className="font-medium">{founder.stage}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Status:</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    founder.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                  }`}>
                    {founder.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderCoInvestors = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Co-Investors</h2>
        
        {/* Co-Investor Network */}
        <div className="space-y-4">
          {[
            { firm: 'Andreessen Horowitz', deals: 8, relationship: 'Strong', focus: 'AI, Crypto' },
            { firm: 'Accel Partners', deals: 5, relationship: 'Good', focus: 'SaaS, Enterprise' },
            { firm: 'General Catalyst', deals: 3, relationship: 'Developing', focus: 'Consumer, Health' },
            { firm: 'Bessemer Venture Partners', deals: 2, relationship: 'Good', focus: 'Enterprise, Security' }
          ].map((investor, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{investor.firm}</h3>
                  <p className="text-sm text-gray-500">Focus: {investor.focus}</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-blue-600">{investor.deals}</div>
                  <div className="text-sm text-gray-500">Co-investments</div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Relationship:</span>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  investor.relationship === 'Strong' ? 'bg-green-100 text-green-700' :
                  investor.relationship === 'Good' ? 'bg-blue-100 text-blue-700' :
                  'bg-yellow-100 text-yellow-700'
                }`}>
                  {investor.relationship}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAnalyticsReports = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Analytics & Reports</h2>
        
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { metric: 'Portfolio IRR', value: '28.5%', change: '+2.1%', trend: 'up' },
            { metric: 'TVPI', value: '2.4x', change: '+0.3x', trend: 'up' },
            { metric: 'DPI', value: '1.2x', change: '+0.1x', trend: 'up' },
            { metric: 'Active Deals', value: '47', change: '+5', trend: 'up' }
          ].map((metric, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-sm font-medium text-gray-500 mb-2">{metric.metric}</h3>
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-gray-900">{metric.value}</span>
                <span className="text-sm text-green-600 font-medium">{metric.change}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Report Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-6 border border-blue-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Portfolio Performance</h3>
            <div className="space-y-3">
              {[
                { company: 'TechStart Inc', valuation: '$50M', multiple: '5.2x', status: 'Active' },
                { company: 'DataFlow Corp', valuation: '$120M', multiple: '3.8x', status: 'Active' },
                { company: 'CloudScale Ltd', valuation: '$80M', multiple: '4.1x', status: 'Active' }
              ].map((company, index) => (
                <div key={index} className="flex items-center justify-between bg-white rounded-lg p-4 border border-gray-200">
                  <div>
                    <h4 className="font-medium text-gray-900">{company.company}</h4>
                    <p className="text-sm text-gray-500">Valuation: {company.valuation}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-600">{company.multiple}</div>
                    <div className="text-sm text-gray-500">Multiple</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-lg p-6 border border-green-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Deal Flow Analysis</h3>
            <div className="space-y-3">
              {[
                { stage: 'Sourcing', deals: 12, conversion: '15%' },
                { stage: 'Initial Review', deals: 8, conversion: '25%' },
                { stage: 'Due Diligence', deals: 5, conversion: '40%' },
                { stage: 'Term Sheet', deals: 3, conversion: '60%' }
              ].map((stage, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900">{stage.stage}</span>
                  <div className="flex items-center space-x-3">
                    <span className="text-sm text-gray-500">{stage.deals} deals</span>
                    <span className="text-sm font-medium text-blue-600">{stage.conversion}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTeamManagement = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Team Management</h2>
        
        {/* Team Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            { role: 'Partners', count: 8, active: 6 },
            { role: 'Principals', count: 12, active: 10 },
            { role: 'Associates', count: 15, active: 12 }
          ].map((role, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{role.role}</h3>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-blue-600">{role.active}</span>
                <span className="text-sm text-gray-500">of {role.count}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Team Members */}
        <div className="space-y-4">
          {[
            { name: 'John Smith', role: 'Managing Partner', focus: 'Enterprise, AI', deals: 15 },
            { name: 'Sarah Johnson', role: 'Partner', focus: 'Consumer, Fintech', deals: 12 },
            { name: 'Mike Chen', role: 'Principal', focus: 'Healthcare, SaaS', deals: 8 },
            { name: 'Emily Davis', role: 'Associate', focus: 'Climate Tech, Web3', deals: 5 }
          ].map((member, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <User size={24} className="text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                    <p className="text-sm text-gray-500">{member.role} • {member.focus}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-blue-600">{member.deals}</div>
                  <div className="text-sm text-gray-500">Deals</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img 
              src={currentUser.avatar} 
              alt={currentUser.name}
              className="w-16 h-16 rounded-full object-cover border-4 border-white/20"
            />
            <div>
              <h1 className="text-2xl font-bold">Welcome back, {currentUser.name}!</h1>
              <p className="text-blue-100">{currentUser.role} at {currentUser.company}</p>
              <p className="text-blue-200 text-sm">Last active: 2 hours ago</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">{currentUser.metrics.revenue || currentUser.metrics.projects || currentUser.metrics.portfolio || currentUser.metrics.applications}</div>
            <div className="text-blue-200 text-sm">
              {userType === 'founder' && 'Monthly Revenue'}
              {userType === 'employee' && 'Active Projects'}
              {userType === 'investor' && 'Portfolio Companies'}
              {userType === 'unemployed' && 'Job Applications'}
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metricsCards.map((metric, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg bg-${metric.color}-100`}>
                <metric.icon className={`w-6 h-6 text-${metric.color}-600`} />
              </div>
              <span className={`text-sm font-medium text-${metric.color}-600`}>
                {metric.change}
              </span>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</h3>
              <p className="text-gray-600 text-sm">{metric.title}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <motion.button
              key={action.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`p-4 rounded-lg bg-${action.color}-50 hover:bg-${action.color}-100 transition-colors text-left`}
            >
              <action.icon className={`w-6 h-6 text-${action.color}-600 mb-2`} />
              <p className="font-medium text-gray-900">{action.label}</p>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activities</h2>
        <div className="space-y-4">
          {currentUser.recentActivities.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className={`w-2 h-2 rounded-full ${
                activity.status === 'success' ? 'bg-green-500' :
                activity.status === 'info' ? 'bg-blue-500' :
                'bg-yellow-500'
              }`} />
              <div className="flex-1">
                <p className="font-medium text-gray-900">{activity.title}</p>
                <p className="text-sm text-gray-500">{activity.time}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );

  // Render different sections based on user type and active tab
  const renderTabContent = () => {
    // Handle grouped tabs
    if (activeSubTab) {
      switch (activeSubTab) {
        // Founder sub-tabs
        case 'startup':
          return renderStartupManagement();
        case 'financial':
          return renderFinancialDashboard();
        case 'legal':
          return renderLegalCompliance();
        case 'growth':
          return renderGrowthStrategy();
        case 'marketing':
          return renderMarketingPR();
        case 'market':
          return renderMarketResearch();
        case 'fundraising':
          return renderFundraising();
        case 'investors':
          return renderInvestorRelations();
        case 'team':
          return renderTeamCollaboration();
        case 'hiring':
          return renderHiringTalent();
        
        // Employee sub-tabs
        case 'projects':
          return renderMyProjects();
        case 'company':
          return renderCompanyHub();
        case 'career':
          return renderCareerDevelopment();
        case 'learning':
          return renderLearningSkills();
        case 'performance':
          return renderPerformance();
        case 'hr':
          return renderHRServices();
        case 'networking':
          return renderNetworking();
        
        // Investor sub-tabs
        case 'pipeline':
          return renderDealPipeline();
        case 'sourcing':
          return renderDealSourcing();
        case 'due-diligence':
          return renderDueDiligence();
        case 'term-sheets':
          return renderTermSheets();
        case 'portfolio':
          return renderPortfolioManagement();
        case 'board-management':
          return renderBoardManagement();
        case 'value-creation':
          return renderValueCreation();
        case 'lp-relations':
          return renderLPRelations();
        case 'fund-management':
          return renderFundManagement();
        case 'reporting':
          return renderLPReporting();
        case 'research':
          return renderMarketResearch();
        case 'trends':
          return renderTrendAnalysis();
        case 'competition':
          return renderCompetitiveIntel();
        case 'founder-network':
          return renderFounderNetwork();
        case 'co-investors':
          return renderCoInvestors();
        case 'events':
          return renderEventsConferences();
        case 'analytics':
          return renderAnalyticsReports();
        case 'compliance':
          return renderCompliance();
        case 'team':
          return renderTeamManagement();
        
        // Unemployed sub-tabs
        case 'jobs':
          return renderJobOpportunities();
        case 'gigs':
          return renderGigEconomy();
        case 'skills':
          return renderSkillsLearning();
        case 'entrepreneurship':
          return renderEntrepreneurship();
        
        default:
          return renderOverview();
      }
    }
    
    // Handle main tabs
    switch (activeTab) {
      case 'overview':
        return renderOverview();
      
      // Grouped tabs - show first sub-tab content
      case 'business':
        return renderStartupManagement();
      case 'growth-marketing':
        return renderGrowthStrategy();
      case 'funding-investment':
        return renderFundraising();
      case 'team-people':
        return renderTeamCollaboration();
      case 'work-projects':
        return renderMyProjects();
      case 'career-development':
        return renderCareerDevelopment();
      case 'people-networking':
        return renderHRServices();
      case 'deal-sourcing':
        return renderDealPipeline();
      case 'portfolio-management':
        return renderPortfolioManagement();
      case 'lp-fund-management':
        return renderLPRelations();
      case 'market-intelligence':
        return renderMarketResearch();
      case 'network-ecosystem':
        return renderFounderNetwork();
      case 'operations':
        return renderAnalyticsReports();
      case 'job-opportunities':
        return renderJobOpportunities();
      case 'networking-entrepreneurship':
        return renderNetworking();
      
      // Single tabs
      case 'community':
        return renderCommunityMentorship();
      case 'resources':
        return renderResources();
      
      default:
        return renderOverview();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">WorkHub</h1>
              <p className="text-gray-600 mt-1">
                Your personalized workspace for {userType === 'founder' ? 'startup management' : 
                userType === 'employee' ? 'career development' :
                userType === 'investor' ? 'investment management' : 'job search and career growth'}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              {/* User Type Selector */}
              <select
                value={userType}
                onChange={(e) => actions.setUserType(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="founder">Founder</option>
                <option value="employee">Employee</option>
                <option value="investor">Investor</option>
                <option value="unemployed">Job Seeker</option>
              </select>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Plus className="w-4 h-4 mr-2" />
                New
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="bg-white rounded-xl border border-gray-200 p-2 shadow-sm">
            <nav className="flex space-x-2 overflow-x-auto">
              {navigationTabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                const isGroup = tab.type === 'group';
                
                return (
                  <div key={tab.id} className="relative">
                    <button
                      onClick={() => {
                        setActiveTab(tab.id);
                        if (isGroup && tab.subtabs && tab.subtabs.length > 0) {
                          setActiveSubTab(tab.subtabs[0].id);
                        } else {
                          setActiveSubTab(null);
                        }
                      }}
                      className={`flex items-center space-x-2 px-4 py-3 rounded-lg font-medium text-sm transition-all duration-200 whitespace-nowrap ${
                        isActive
                          ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      }`}
                    >
                      <Icon size={16} />
                      <span>{tab.label}</span>
                      {tab.count && (
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          isActive
                            ? 'bg-white/20 text-white'
                            : 'bg-gray-200 text-gray-600'
                        }`}>
                          {tab.count}
                        </span>
                      )}
                      {isGroup && (
                        <ChevronDown size={14} className="ml-1" />
                      )}
                    </button>
                    
                    {/* Sub-tabs dropdown for grouped tabs */}
                    {isActive && isGroup && tab.subtabs && (
                      <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                        <div className="p-2">
                          {tab.subtabs.map((subTab) => {
                            const SubIcon = subTab.icon;
                            return (
                              <button
                                key={subTab.id}
                                onClick={() => setActiveSubTab(subTab.id)}
                                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                                  activeSubTab === subTab.id
                                    ? 'bg-blue-50 text-blue-700'
                                    : 'text-gray-700 hover:bg-gray-50'
                                }`}
                              >
                                <SubIcon size={16} />
                                <span className="flex-1 text-left">{subTab.label}</span>
                                {subTab.count && (
                                  <span className="px-2 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-600">
                                    {subTab.count}
                                  </span>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {renderTabContent()}
        </motion.div>
      </div>
    </div>
  );
};

export default EnhancedWorkHub;
