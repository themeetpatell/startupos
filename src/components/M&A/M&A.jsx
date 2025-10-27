import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Target, 
  TrendingUp, 
  Shield, 
  Users, 
  Building,
  DollarSign,
  Calendar,
  MapPin,
  Star,
  Eye,
  Plus,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Lock,
  BarChart3,
  FileText,
  Briefcase,
  Globe,
  Zap,
  Search,
  Filter,
  Settings,
  Bell,
  Bookmark,
  Heart,
  MessageSquare,
  Phone,
  Mail,
  Clock,
  Award,
  Shield as ShieldIcon,
  Target as TargetIcon,
  TrendingUp as TrendingUpIcon,
  Users as UsersIcon,
  Building as BuildingIcon,
  DollarSign as DollarSignIcon,
  Calendar as CalendarIcon,
  MapPin as MapPinIcon,
  Star as StarIcon,
  Eye as EyeIcon,
  Plus as PlusIcon,
  ArrowRight as ArrowRightIcon,
  CheckCircle as CheckCircleIcon,
  AlertCircle as AlertCircleIcon,
  Lock as LockIcon,
  BarChart3 as BarChart3Icon,
  FileText as FileTextIcon,
  Briefcase as BriefcaseIcon,
  Globe as GlobeIcon,
  Zap as ZapIcon,
  Search as SearchIcon,
  Filter as FilterIcon,
  Settings as SettingsIcon,
  Bell as BellIcon,
  Bookmark as BookmarkIcon,
  Heart as HeartIcon,
  MessageSquare as MessageSquareIcon,
  Phone as PhoneIcon,
  Mail as MailIcon,
  Clock as ClockIcon,
  Award as AwardIcon
} from 'lucide-react';
import TargetDiscovery from './EnhancedTargetDiscovery';
import DealPipeline from './EnhancedDealPipeline';
import DueDiligence from './EnhancedDueDiligence';
import ReadinessAssessment from './ReadinessAssessment';
import Advisors from './Advisors';
import InvestmentOpportunities from './InvestmentOpportunities';

const MAndA = () => {
  const [activeTab, setActiveTab] = useState('discovery');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const tabs = [
    { 
      id: 'discovery', 
      label: 'Target Discovery', 
      icon: Target, 
      count: 2847,
      description: 'Find and evaluate potential acquisition targets',
      color: 'blue'
    },
    { 
      id: 'pipeline', 
      label: 'Deal Pipeline', 
      icon: TrendingUp, 
      count: 73,
      description: 'Track and manage your M&A deals',
      color: 'green'
    },
    { 
      id: 'investment', 
      label: 'Investment Opportunities', 
      icon: DollarSign, 
      count: 128,
      description: 'Discover and evaluate investment opportunities',
      color: 'emerald'
    },
    { 
      id: 'readiness', 
      label: 'Readiness Assessment', 
      icon: Shield, 
      count: 12,
      description: 'Evaluate your company\'s M&A readiness',
      color: 'purple'
    },
    { 
      id: 'due-diligence', 
      label: 'Due Diligence', 
      icon: FileText, 
      count: 45,
      description: 'Comprehensive due diligence processes and tools',
      color: 'indigo'
    },
    { 
      id: 'advisors', 
      label: 'M&A Advisors', 
      icon: Users, 
      count: 156,
      description: 'Connect with expert M&A advisors',
      color: 'orange'
    }
  ];

  const notifications = [
    { id: 1, title: 'New Target Match', message: 'TechFlow Solutions matches your criteria', time: '2m ago', type: 'target' },
    { id: 2, title: 'Deal Update', message: 'DataViz Analytics moved to Due Diligence', time: '1h ago', type: 'pipeline' },
    { id: 3, title: 'Advisor Available', message: 'Sarah Chen is now available for consultation', time: '3h ago', type: 'advisor' },
    { id: 4, title: 'Assessment Complete', message: 'Legal readiness assessment completed', time: '1d ago', type: 'readiness' }
  ];

  const stats = {
    discovery: { targets: 2847, contacted: 156, qualified: 73 },
    pipeline: { active: 28, closing: 8, closed: 12 },
    'due-diligence': { active: 15, completed: 8, pending: 7 },
    investment: { opportunities: 128, evaluated: 45, invested: 12 },
    readiness: { score: 78, categories: 6, items: 67 },
    advisors: { total: 156, available: 89, contacted: 23 }
  };

  const renderCurrentTab = () => {
    switch (activeTab) {
      case 'discovery':
        return <TargetDiscovery />;
      case 'pipeline':
        return <DealPipeline />;
      case 'investment':
        return <InvestmentOpportunities />;
      case 'readiness':
        return <ReadinessAssessment />;
      case 'due-diligence':
        return <DueDiligence />;
      case 'advisors':
        return <Advisors />;
      default:
        return <TargetDiscovery />;
    }
  };

  const getActiveTabData = () => {
    return tabs.find(tab => tab.id === activeTab);
  };

  const getActiveTabStats = () => {
    return stats[activeTab];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <motion.button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-colors relative"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Bell size={20} />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </motion.button>
              <motion.button
                onClick={() => setShowSettings(!showSettings)}
                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Settings size={20} />
              </motion.button>
            </div>
          </div>

          {/* Active Tab Stats */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    getActiveTabData()?.color === 'blue' ? 'bg-blue-100' :
                    getActiveTabData()?.color === 'green' ? 'bg-green-100' :
                    getActiveTabData()?.color === 'indigo' ? 'bg-indigo-100' :
                    getActiveTabData()?.color === 'emerald' ? 'bg-emerald-100' :
                    getActiveTabData()?.color === 'purple' ? 'bg-purple-100' :
                    getActiveTabData()?.color === 'orange' ? 'bg-orange-100' : 'bg-gray-100'
                  }`}>
                    {(() => {
                      const Icon = getActiveTabData()?.icon;
                      return Icon ? <Icon className={`${
                        getActiveTabData()?.color === 'blue' ? 'text-blue-600' :
                        getActiveTabData()?.color === 'green' ? 'text-green-600' :
                        getActiveTabData()?.color === 'indigo' ? 'text-indigo-600' :
                        getActiveTabData()?.color === 'emerald' ? 'text-emerald-600' :
                        getActiveTabData()?.color === 'purple' ? 'text-purple-600' :
                        getActiveTabData()?.color === 'orange' ? 'text-orange-600' : 'text-gray-600'
                      }`} size={24} /> : null;
                    })()}
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">{getActiveTabData()?.label}</h2>
                    <p className="text-gray-600">{getActiveTabData()?.description}</p>
                  </div>
                </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">{getActiveTabData()?.count}</div>
                <div className="text-sm text-gray-600">Total Items</div>
              </div>
            </div>

            {/* Tab-specific stats */}
            <div className="grid grid-cols-3 gap-4">
              {activeTab === 'discovery' && (
                <>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{getActiveTabStats()?.targets}</div>
                    <div className="text-sm text-gray-600">Targets</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-600">{getActiveTabStats()?.contacted}</div>
                    <div className="text-sm text-gray-600">Contacted</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{getActiveTabStats()?.qualified}</div>
                    <div className="text-sm text-gray-600">Qualified</div>
                  </div>
                </>
              )}
              {activeTab === 'pipeline' && (
                <>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{getActiveTabStats()?.active}</div>
                    <div className="text-sm text-gray-600">Active</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">{getActiveTabStats()?.closing}</div>
                    <div className="text-sm text-gray-600">Closing</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{getActiveTabStats()?.closed}</div>
                    <div className="text-sm text-gray-600">Closed</div>
                  </div>
                </>
              )}
              {activeTab === 'readiness' && (
                <>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">{getActiveTabStats()?.score}%</div>
                    <div className="text-sm text-gray-600">Score</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{getActiveTabStats()?.categories}</div>
                    <div className="text-sm text-gray-600">Categories</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{getActiveTabStats()?.items}</div>
                    <div className="text-sm text-gray-600">Items</div>
                  </div>
                </>
              )}
              {activeTab === 'due-diligence' && (
                <>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-indigo-600">{getActiveTabStats()?.active}</div>
                    <div className="text-sm text-gray-600">Active</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{getActiveTabStats()?.completed}</div>
                    <div className="text-sm text-gray-600">Completed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">{getActiveTabStats()?.pending}</div>
                    <div className="text-sm text-gray-600">Pending</div>
                  </div>
                </>
              )}
              {activeTab === 'investment' && (
                <>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-emerald-600">{getActiveTabStats()?.opportunities}</div>
                    <div className="text-sm text-gray-600">Opportunities</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{getActiveTabStats()?.evaluated}</div>
                    <div className="text-sm text-gray-600">Evaluated</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{getActiveTabStats()?.invested}</div>
                    <div className="text-sm text-gray-600">Invested</div>
                  </div>
                </>
              )}
              {activeTab === 'advisors' && (
                <>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">{getActiveTabStats()?.total}</div>
                    <div className="text-sm text-gray-600">Total</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{getActiveTabStats()?.available}</div>
                    <div className="text-sm text-gray-600">Available</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{getActiveTabStats()?.contacted}</div>
                    <div className="text-sm text-gray-600">Contacted</div>
                  </div>
                </>
              )}
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-4"
        >
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-2">
            <div className="flex space-x-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <motion.button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-lg transition-all duration-200 ${
                      activeTab === tab.id
                        ? `${
                            tab.color === 'blue' ? 'bg-blue-50 text-blue-600 border border-blue-200' :
                            tab.color === 'green' ? 'bg-green-50 text-green-600 border border-green-200' :
                            tab.color === 'indigo' ? 'bg-indigo-50 text-indigo-600 border border-indigo-200' :
                            tab.color === 'emerald' ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' :
                            tab.color === 'purple' ? 'bg-purple-50 text-purple-600 border border-purple-200' :
                            tab.color === 'orange' ? 'bg-orange-50 text-orange-600 border border-orange-200' :
                            'bg-gray-50 text-gray-600 border border-gray-200'
                          }`
                        : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Icon size={18} />
                    <span className="font-medium">{tab.label}</span>
                    <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
                      {tab.count}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </motion.div>

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

        {/* Notifications Modal */}
        <AnimatePresence>
          {showNotifications && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
              onClick={() => setShowNotifications(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-xl shadow-xl max-w-md w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
                    <motion.button
                      onClick={() => setShowNotifications(false)}
                      className="p-2 text-gray-400 hover:text-gray-600 rounded-lg transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <X size={20} />
                    </motion.button>
                  </div>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div key={notification.id} className="p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start space-x-3">
                        <div className={`w-2 h-2 rounded-full mt-2 ${
                          notification.type === 'target' ? 'bg-blue-500' :
                          notification.type === 'pipeline' ? 'bg-green-500' :
                          notification.type === 'advisor' ? 'bg-orange-500' : 'bg-purple-500'
                        }`}></div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 text-sm">{notification.title}</h4>
                          <p className="text-gray-600 text-sm mt-1">{notification.message}</p>
                          <span className="text-gray-400 text-xs mt-2 block">{notification.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MAndA; 