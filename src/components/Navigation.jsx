import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, X, Home, Brain, Users, BarChart3, Globe, Bell,
  Search, User, ChevronDown, Building, Settings, LogOut,
  CreditCard, HelpCircle, Map, Trophy, Plus, ArrowUpRight,
  MessageCircle, Send, Users as UsersIcon, Zap, Target,
  TrendingUp, Shield, Star, Calendar, FileText, Database
} from 'lucide-react';
// import SearchModal from './SearchModal';

const Navigation = ({ currentView, setCurrentView, user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showChat, setShowChat] = useState(false);
  // const [showSearchModal, setShowSearchModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const searchRef = useRef(null);
  const notificationRef = useRef(null);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) setShowSearch(false);
      if (notificationRef.current && !notificationRef.current.contains(event.target)) setShowNotifications(false);
      if (profileRef.current && !profileRef.current.contains(event.target)) setShowProfile(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Main navbar items - only core features
  const mainNavigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, color: 'emerald', description: 'Overview & Analytics' },
    { id: 'ai-cobuilder', label: 'AI Co-Builder', icon: Brain, color: 'purple', description: 'AI Employees & Tools' },
    { id: 'workhub', label: 'WorkHub', icon: Building, color: 'blue', description: 'Team & Project Management' },
    { id: 'ma', label: 'M&A', icon: TrendingUp, color: 'orange', description: 'Mergers & Acquisitions' },
    { id: 'ecosystem', label: 'Ecosystem', icon: Globe, color: 'indigo', description: 'Startups & Investors' }
  ];

  // Profile dropdown items
  const profileDropdownItems = [
    { id: 'profile', label: 'My Profile', icon: User, color: 'blue', description: 'Manage your account' },
    { id: 'community', label: 'Community', icon: Users, color: 'teal', description: 'Network & Connect' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, color: 'red', description: 'Data & Insights' },
    { id: 'roadmap', label: 'My Roadmap', icon: Map, color: 'orange', description: 'Track your progress' },
    { id: 'gamification', label: 'Gamification', icon: Trophy, color: 'yellow', description: 'Achievements & Rewards' },
    { id: 'credit-store', label: 'Credit Store', icon: Star, color: 'purple', description: 'Earn & Claim Credits' }
  ];

  // Account dropdown items
  const accountDropdownItems = [
    { id: 'billing', label: 'Billing', icon: CreditCard, color: 'green', description: 'Manage subscription' },
    { id: 'support', label: 'Help & Support', icon: HelpCircle, color: 'indigo', description: 'Get assistance' }
  ];

  const aiCoBuilderSubmenu = [
    { id: 'ai-cobuilder', label: 'Marketplace', icon: Globe, description: 'Discover & Buy AI Builders' },
    { id: 'ai-cobuilder-creator', label: 'Creator', icon: Plus, description: 'Build Your AI Assistant' },
    { id: 'ai-cobuilder-manager', label: 'Manager', icon: Settings, description: 'Manage Your Builders' }
  ];

  const notifications = [
    { id: 1, title: 'AI Copilot Suggestion', message: 'New funding strategy recommendation', time: '2m ago', read: false, type: 'ai' },
    { id: 2, title: 'Expert Match Found', message: 'Perfect CTO candidate for your startup', time: '1h ago', read: false, type: 'match' },
    { id: 3, title: 'Project Update', message: 'AI Workflow Integration is 65% complete', time: '3h ago', read: true, type: 'project' },
    { id: 4, title: 'Community Update', message: 'New member joined: David Kim', time: '5h ago', read: true, type: 'community' }
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  const getColorClasses = (color, isActive = false) => {
    const colors = {
      emerald: isActive ? 'bg-emerald-500 text-white shadow-emerald-200' : 'text-emerald-600 hover:bg-emerald-50',
      purple: isActive ? 'bg-purple-500 text-white shadow-purple-200' : 'text-purple-600 hover:bg-purple-50',
      blue: isActive ? 'bg-blue-500 text-white shadow-blue-200' : 'text-blue-600 hover:bg-blue-50',
      teal: isActive ? 'bg-teal-500 text-white shadow-teal-200' : 'text-teal-600 hover:bg-teal-50',
      orange: isActive ? 'bg-orange-500 text-white shadow-orange-200' : 'text-orange-600 hover:bg-orange-50',
      red: isActive ? 'bg-red-500 text-white shadow-red-200' : 'text-red-600 hover:bg-red-50',
      indigo: isActive ? 'bg-indigo-500 text-white shadow-indigo-200' : 'text-indigo-600 hover:bg-indigo-50'
    };
    return colors[color] || colors.blue;
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    // Implement search functionality
    console.log('Searching for:', query);
  };

  return (
    <>
      {/* Modern Responsive Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-xl border-b border-gray-200 shadow-lg' 
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo */}
            <motion.div 
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.02 }}
            >
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 via-blue-400 to-purple-400 rounded-xl flex items-center justify-center shadow-lg">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-400 rounded-full animate-pulse"></div>
              </div>
              <div className="hidden sm:block">
                <span className="text-xl font-bold text-gray-900">StartupOS</span>
                <span className="text-xs text-gray-500 ml-2 font-medium">Platform</span>
              </div>
            </motion.div>

            {/* Tablet Navigation - Show fewer items */}
            <div className="hidden lg:flex xl:hidden items-center space-x-1">
              {mainNavigationItems.slice(0, 4).map((item, index) => {
                const Icon = item.icon;
                const isActive = currentView === item.id;
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index, duration: 0.6 }}
                    className="relative group"
                  >
                    <motion.button
                      onClick={() => setCurrentView(item.id)}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-xl transition-all duration-300 font-medium text-sm ${
                        isActive 
                          ? getColorClasses(item.color, true) + ' shadow-lg'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                      whileHover={{ scale: 1.02, y: -1 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Icon size={18} />
                      <span className="hidden sm:inline">{item.label}</span>
                      {item.badge && (
                        <span className="px-2 py-0.5 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs rounded-full font-bold">
                          {item.badge}
                        </span>
                      )}
                    </motion.button>
                  </motion.div>
                );
              })}
            </div>

            {/* Desktop Navigation */}
            <div className="hidden xl:flex items-center space-x-1">
              {mainNavigationItems.map((item, index) => {
                const Icon = item.icon;
                const isActive = currentView === item.id;
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index, duration: 0.6 }}
                    className="relative group"
                  >
                    <motion.button
                      onClick={() => setCurrentView(item.id)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 font-medium text-sm ${
                        isActive 
                          ? getColorClasses(item.color, true) + ' shadow-lg'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                      whileHover={{ scale: 1.02, y: -1 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Icon size={18} />
                      <span>{item.label}</span>
                      {item.badge && (
                        <span className="px-2 py-0.5 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs rounded-full font-bold">
                          {item.badge}
                        </span>
                      )}
                    </motion.button>
                    
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                      {item.description}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Right Actions */}
            <div className="flex items-center space-x-2">
              
              {/* Search */}
              <div className="relative" ref={searchRef}>
                <motion.button
                  onClick={() => console.log('Search clicked')}
                  className="p-2 text-gray-600 hover:text-emerald-500 hover:bg-emerald-50 rounded-xl transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Search size={20} />
                </motion.button>

                {/* Search Dropdown */}
                <AnimatePresence>
                  {showSearch && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-50"
                    >
                      <div className="p-4 border-b border-gray-100">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                          <input
                            type="text"
                            placeholder="Search StartupOS..."
                            value={searchQuery}
                            onChange={(e) => handleSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300"
                            autoFocus
                          />
                        </div>
                      </div>
                      
                      <div className="max-h-96 overflow-y-auto">
                        {searchQuery ? (
                          <div className="p-4">
                            <p className="text-sm text-gray-500">Search results for "{searchQuery}"</p>
                            {/* Implement search results here */}
                          </div>
                        ) : (
                          <div className="p-4">
                            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Quick Actions</div>
                            <div className="space-y-2">
                              {mainNavigationItems.slice(0, 4).map((item) => {
                                const Icon = item.icon;
                                return (
                                  <button
                                    key={item.id}
                                    onClick={() => {
                                      setCurrentView(item.id);
                                      setShowSearch(false);
                                    }}
                                    className="w-full flex items-center space-x-3 px-3 py-2 text-left hover:bg-gray-50 rounded-lg transition-colors"
                                  >
                                    <Icon size={16} className="text-gray-400" />
                                    <div>
                                      <div className="text-sm font-medium text-gray-800">{item.label}</div>
                                      <div className="text-xs text-gray-500">{item.description}</div>
                                    </div>
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Notifications */}
              <div className="relative" ref={notificationRef}>
                <motion.button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-2 text-gray-600 hover:text-purple-500 hover:bg-purple-50 rounded-xl transition-all duration-300 relative"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Bell size={20} />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                      {unreadCount}
                    </span>
                  )}
                </motion.button>

                {/* Notifications Dropdown */}
                <AnimatePresence>
                  {showNotifications && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-50"
                    >
                      <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-purple-50 to-pink-50">
                        <div className="flex items-center justify-between">
                          <h3 className="font-bold text-gray-800">Notifications</h3>
                          <button className="text-sm text-purple-600 hover:text-purple-700 font-medium">
                            Mark all as read
                          </button>
                        </div>
                      </div>
                      
                      <div className="max-h-96 overflow-y-auto">
                        {notifications.map((notification) => (
                          <div
                            key={notification.id}
                            className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer ${
                              !notification.read ? 'bg-blue-50' : ''
                            }`}
                          >
                            <div className="flex items-start space-x-3">
                              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                                notification.type === 'ai' ? 'bg-blue-100' :
                                notification.type === 'match' ? 'bg-green-100' :
                                notification.type === 'project' ? 'bg-purple-100' :
                                'bg-gray-100'
                              }`}>
                                {notification.type === 'ai' ? <Brain size={16} className="text-blue-600" /> :
                                 notification.type === 'match' ? <Users size={16} className="text-green-600" /> :
                                 notification.type === 'project' ? <Target size={16} className="text-purple-600" /> :
                                 <MessageCircle size={16} className="text-gray-600" />}
                              </div>
                              <div className="flex-1">
                                <h4 className="font-semibold text-gray-800 text-sm">{notification.title}</h4>
                                <p className="text-gray-600 text-sm mt-1">{notification.message}</p>
                                <div className="flex items-center justify-between mt-2">
                                  <span className="text-gray-400 text-xs">{notification.time}</span>
                                  {!notification.read && (
                                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="p-4 border-t border-gray-100">
                        <button className="w-full text-center text-sm text-purple-600 hover:text-purple-700 font-medium">
                          View all notifications
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Profile */}
              <div className="relative" ref={profileRef}>
                <motion.button
                  onClick={() => setShowProfile(!showProfile)}
                  className="flex items-center space-x-2 p-2 text-gray-600 hover:text-blue-500 hover:bg-blue-50 rounded-xl transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-400 rounded-lg flex items-center justify-center">
                    {user?.avatar ? (
                      <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-lg object-cover" />
                    ) : (
                      <User size={16} className="text-white" />
                    )}
                  </div>
                  <ChevronDown size={14} className={`transition-transform duration-300 ${showProfile ? 'rotate-180' : ''}`} />
                </motion.button>

                {/* Profile Dropdown */}
                <AnimatePresence>
                  {showProfile && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-50"
                    >
                      <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-purple-50">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-400 rounded-xl flex items-center justify-center">
                            {user?.avatar ? (
                              <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-xl object-cover" />
                            ) : (
                              <User size={24} className="text-white" />
                            )}
                          </div>
                          <div>
                            <h3 className="font-bold text-gray-800 text-lg">{user?.name || 'User'}</h3>
                            <p className="text-sm text-gray-600">{user?.role || 'User'} @ {user?.company || 'Startup'}</p>
                            <div className="mt-2">
                              <span className="px-2 py-1 bg-gradient-to-r from-emerald-400 to-blue-400 text-white text-xs rounded-full font-medium">
                                Pro Member
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="p-2">
                        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 py-2">
                          Main Menu
                        </div>
                        
                        {profileDropdownItems.map((item, index) => {
                          const Icon = item.icon;
                          const isActive = currentView === item.id;
                          return (
                            <motion.button
                              key={item.id}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.1 * index, duration: 0.3 }}
                              onClick={() => {
                                setCurrentView(item.id);
                                setShowProfile(false);
                              }}
                              className={`w-full flex items-center space-x-3 px-3 py-3 text-left rounded-xl transition-all duration-300 ${
                                isActive 
                                  ? getColorClasses(item.color, true) + ' shadow-md'
                                  : `hover:bg-${item.color}-50`
                              }`}
                              whileHover={{ scale: 1.02, x: 4 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                                isActive 
                                  ? 'bg-white/20' 
                                  : `bg-${item.color}-100`
                              }`}>
                                <Icon size={20} className={`${
                                  isActive 
                                    ? 'text-white' 
                                    : `text-${item.color}-600`
                                }`} />
                              </div>
                              <div>
                                <div className={`font-medium ${
                                  isActive ? 'text-white' : 'text-gray-800'
                                }`}>{item.label}</div>
                                <div className={`text-sm ${
                                  isActive ? 'text-white/80' : 'text-gray-500'
                                }`}>{item.description}</div>
                              </div>
                            </motion.button>
                          );
                        })}

                        <div className="border-t border-gray-100 my-2"></div>

                        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 py-2">
                          Account
                        </div>

                        {accountDropdownItems.map((item, index) => {
                          const Icon = item.icon;
                          const isActive = currentView === item.id;
                          return (
                            <motion.button
                              key={item.id}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.1 * (index + 5), duration: 0.3 }}
                              onClick={() => {
                                setCurrentView(item.id);
                                setShowProfile(false);
                              }}
                              className={`w-full flex items-center space-x-3 px-3 py-3 text-left rounded-xl transition-all duration-300 ${
                                isActive 
                                  ? getColorClasses(item.color, true) + ' shadow-md'
                                  : `hover:bg-${item.color}-50`
                              }`}
                              whileHover={{ scale: 1.02, x: 4 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                                isActive 
                                  ? 'bg-white/20' 
                                  : `bg-${item.color}-100`
                              }`}>
                                <Icon size={20} className={`${
                                  isActive 
                                    ? 'text-white' 
                                    : `text-${item.color}-600`
                                }`} />
                              </div>
                              <div>
                                <div className={`font-medium ${
                                  isActive ? 'text-white' : 'text-gray-800'
                                }`}>{item.label}</div>
                                <div className={`text-sm ${
                                  isActive ? 'text-white/80' : 'text-gray-500'
                                }`}>{item.description}</div>
                              </div>
                            </motion.button>
                          );
                        })}

                        <div className="border-t border-gray-100 my-2"></div>

                        <motion.button
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 * 7, duration: 0.3 }}
                          onClick={() => {
                            onLogout();
                            setShowProfile(false);
                          }}
                          className="w-full flex items-center space-x-3 px-3 py-3 text-left hover:bg-red-50 rounded-xl transition-all duration-300"
                          whileHover={{ scale: 1.02, x: 4 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                            <LogOut size={20} className="text-red-600" />
                          </div>
                          <div>
                            <div className="font-medium text-red-600">Sign Out</div>
                            <div className="text-sm text-red-500">Logout from StartupOS</div>
                          </div>
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Mobile Menu */}
              <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden p-2 text-gray-600 hover:text-emerald-500 hover:bg-emerald-50 rounded-xl transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
                  {isOpen ? <X size={20} /> : <Menu size={20} />}
                </motion.div>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="lg:hidden bg-white border-t border-gray-200 shadow-lg"
            >
              <div className="px-4 py-6">
                <div className="mb-6">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="text"
                      placeholder="Search StartupOS..."
                      value={searchQuery}
                      onChange={(e) => handleSearch(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300"
                    />
                  </div>
                </div>

                {/* Main Navigation */}
                <div className="mb-6">
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-2">
                    Main Navigation
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {mainNavigationItems.map((item, index) => {
                      const Icon = item.icon;
                      const isActive = currentView === item.id;
                      return (
                        <motion.button
                          key={item.id}
                          initial={{ opacity: 0, scale: 0.8, y: 20 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          transition={{ delay: 0.1 * index, duration: 0.5 }}
                          onClick={() => {
                            setCurrentView(item.id);
                            setIsOpen(false);
                          }}
                          className={`relative flex flex-col items-center space-y-2 p-4 rounded-xl transition-all duration-300 ${
                            isActive
                              ? getColorClasses(item.color, true) + ' shadow-lg'
                              : 'text-gray-600 hover:bg-gray-50'
                          }`}
                          whileHover={{ scale: 1.02, y: -2 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Icon size={24} />
                          <div className="text-center">
                            <div className="text-sm font-medium">{item.label}</div>
                            <div className="text-xs opacity-75">{item.description}</div>
                          </div>
                          {item.badge && (
                            <span className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                              {item.badge}
                            </span>
                          )}
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                {/* Profile Menu */}
                <div className="mb-6">
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-2">
                    Profile & Settings
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {profileDropdownItems.map((item, index) => {
                      const Icon = item.icon;
                      const isActive = currentView === item.id;
                      return (
                        <motion.button
                          key={item.id}
                          initial={{ opacity: 0, scale: 0.8, y: 20 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          transition={{ delay: 0.1 * (index + 6), duration: 0.5 }}
                          onClick={() => {
                            setCurrentView(item.id);
                            setIsOpen(false);
                          }}
                          className={`flex flex-col items-center space-y-2 p-4 rounded-xl transition-all duration-300 ${
                            isActive
                              ? getColorClasses(item.color, true) + ' shadow-lg'
                              : 'text-gray-600 hover:bg-gray-50'
                          }`}
                          whileHover={{ scale: 1.02, y: -2 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Icon size={24} />
                          <div className="text-center">
                            <div className="text-sm font-medium">{item.label}</div>
                            <div className="text-xs opacity-75">{item.description}</div>
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                {/* Account Menu */}
                <div>
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-2">
                    Account
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {accountDropdownItems.map((item, index) => {
                      const Icon = item.icon;
                      const isActive = currentView === item.id;
                      return (
                        <motion.button
                          key={item.id}
                          initial={{ opacity: 0, scale: 0.8, y: 20 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          transition={{ delay: 0.1 * (index + 11), duration: 0.5 }}
                          onClick={() => {
                            setCurrentView(item.id);
                            setIsOpen(false);
                          }}
                          className={`flex flex-col items-center space-y-2 p-4 rounded-xl transition-all duration-300 ${
                            isActive
                              ? getColorClasses(item.color, true) + ' shadow-lg'
                              : 'text-gray-600 hover:bg-gray-50'
                          }`}
                          whileHover={{ scale: 1.02, y: -2 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Icon size={24} />
                          <div className="text-center">
                            <div className="text-sm font-medium">{item.label}</div>
                            <div className="text-xs opacity-75">{item.description}</div>
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Spacer to prevent navbar overlap with content */}
      <div className="h-16"></div>

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="relative"
        >
          <motion.button
            onClick={() => setShowChat(!showChat)}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="w-14 h-14 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-full shadow-2xl flex items-center justify-center text-white hover:shadow-emerald-500/40 transition-all duration-300 cursor-pointer"
          >
            <MessageCircle size={24} />
          </motion.button>

          <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-orange-400 to-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold border-2 border-white shadow-lg">
            5
          </div>

          <AnimatePresence>
            {showChat && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="absolute bottom-20 right-0 w-80 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden"
              >
                <div className="p-4 bg-gradient-to-r from-emerald-500 to-blue-600 text-white">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <MessageCircle size={20} />
                      <div>
                        <h3 className="font-bold">Startup Network</h3>
                        <p className="text-sm text-emerald-100">5 active connections</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowChat(false)}
                      className="p-1 hover:bg-white/20 rounded-full transition-colors"
                    >
                      <X size={20} />
                    </button>
                  </div>
                </div>

                <div className="p-4">
                  <div className="text-center text-gray-600">
                    <p className="text-sm">Connect with other startups</p>
                    <p className="text-xs mt-1">Share resources, find talent, collaborate</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Search Modal */}
      {/* <SearchModal
        isOpen={showSearchModal}
        onClose={() => setShowSearchModal(false)}
        onNavigate={(type, id) => {
          console.log('Navigate to:', type, id);
          // Handle navigation based on type and id
          setShowSearchModal(false);
        }}
      /> */}
    </>
  );
};

export default Navigation;