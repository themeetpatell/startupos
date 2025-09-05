import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, X, Home, Brain, Users, BarChart3, Globe, Bell,
  Search, User, ChevronDown, Building, Settings, LogOut,
  CreditCard, HelpCircle, Map, Trophy, Plus, ArrowUpRight,
  MessageCircle, Send, Users as UsersIcon
} from 'lucide-react';

const Navigation = ({ currentView, setCurrentView, user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showChat, setShowChat] = useState(false);
  
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

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, color: 'emerald' },
    { id: 'ai-cobuilder', label: 'AI Co-Builder', icon: Brain, color: 'purple', badge: 'New' },
    { id: 'community', label: 'Community', icon: Users, color: 'blue' },
    { id: 'network', label: 'Network', icon: UsersIcon, color: 'teal' },
    { id: 'ma', label: 'M&A', icon: Building, color: 'orange' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, color: 'red' },
    { id: 'ecosystem', label: 'Ecosystem', icon: Globe, color: 'indigo' }
  ];

  const notifications = [
    { id: 1, title: 'AI Copilot Suggestion', message: 'New funding strategy recommendation', time: '2m ago', read: false },
    { id: 2, title: 'Expert Match Found', message: 'Perfect CTO candidate for your startup', time: '1h ago', read: false },
    { id: 3, title: 'Community Update', message: 'New member joined: David Kim', time: '3h ago', read: true }
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  const getColorClasses = (color, isActive = false) => {
    const colors = {
      emerald: isActive ? 'bg-emerald-500 text-white' : 'text-emerald-400 hover:bg-emerald-50',
      purple: isActive ? 'bg-purple-500 text-white' : 'text-purple-400 hover:bg-purple-50',
      blue: isActive ? 'bg-blue-500 text-white' : 'text-blue-400 hover:bg-blue-50',
      teal: isActive ? 'bg-teal-500 text-white' : 'text-teal-400 hover:bg-teal-50',
      orange: isActive ? 'bg-orange-500 text-white' : 'text-orange-400 hover:bg-orange-50',
      red: isActive ? 'bg-red-500 text-white' : 'text-red-400 hover:bg-red-50',
      indigo: isActive ? 'bg-indigo-500 text-white' : 'text-indigo-400 hover:bg-indigo-50'
    };
    return colors[color] || colors.blue;
  };

  return (
    <>
      {/* Clean Floating Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-1000 ${
          isScrolled ? 'top-4' : 'top-6'
        }`}
      >
        {/* Navigation Container */}
        <div className="relative">
          {/* Apple Glass Background */}
          <div className="absolute inset-0 apple-glass rounded-3xl"></div>
          
          {/* Navigation Content */}
          <div className="relative px-8 py-6">
            <div className="flex items-center space-x-8">
              
              {/* Logo */}
              <motion.div className="flex items-center space-x-4" whileHover={{ scale: 1.02 }}>
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 via-blue-400 to-purple-400 rounded-2xl flex items-center justify-center shadow-lg">
                    <img src="/src/assets/logo.png" alt="StartupOS" className="w-8 h-8" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-400 rounded-full"></div>
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-bold text-gray-800">StartupOS</span>
                  <span className="text-xs text-gray-500 font-medium">Next Gen Platform</span>
                </div>
              </motion.div>

              {/* Navigation Items */}
              <div className="hidden lg:flex items-center space-x-2">
                {navigationItems.map((item, index) => {
                  const Icon = item.icon;
                  const isActive = currentView === item.id;
                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index, duration: 0.6 }}
                      className="relative group"
                      whileHover={{ y: -2 }}
                    >
                      <motion.button
                        onClick={() => setCurrentView(item.id)}
                        className={`apple-nav-item flex items-center space-x-3 px-6 py-3 rounded-2xl transition-all duration-300 font-medium ${
                          isActive 
                            ? 'apple-nav-item active'
                            : 'text-gray-600 hover:text-gray-900'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.96 }}
                      >
                        <Icon size={18} />
                        <span className="text-sm">{item.label}</span>
                        {item.badge && (
                          <span className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                            {item.badge}
                          </span>
                        )}
                      </motion.button>
                    </motion.div>
                  );
                })}
              </div>

              {/* Right Actions */}
              <div className="flex items-center space-x-4">
                
                {/* Search */}
                <div className="relative" ref={searchRef}>
                  <motion.button
                    onClick={() => setShowSearch(!showSearch)}
                    className="p-3 text-gray-600 hover:text-emerald-500 hover:bg-emerald-50 rounded-2xl transition-all duration-300"
                    whileHover={{ scale: 1.05, y: -1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Search size={20} />
                  </motion.button>
                </div>

                {/* Notifications */}
                <div className="relative" ref={notificationRef}>
                  <motion.button
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="p-3 text-gray-600 hover:text-purple-500 hover:bg-purple-50 rounded-2xl transition-all duration-300 relative"
                    whileHover={{ scale: 1.05, y: -1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Bell size={20} />
                    {unreadCount > 0 && (
                      <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
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
                        className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden z-50"
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
                                <div className="w-10 h-10 bg-blue-100 rounded-2xl flex items-center justify-center">
                                  <Brain size={20} className="text-blue-600" />
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
                    className="flex items-center space-x-3 p-3 text-gray-600 hover:text-blue-500 hover:bg-blue-50 rounded-2xl transition-all duration-300"
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center">
                      {user?.avatar ? (
                        <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full object-cover" />
                      ) : (
                        <User size={18} className="text-white" />
                      )}
                    </div>
                    <ChevronDown size={16} className={`transition-transform duration-300 ${showProfile ? 'rotate-180' : ''}`} />
                  </motion.button>

                  {/* Profile Dropdown */}
                  <AnimatePresence>
                    {showProfile && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-3 w-72 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden z-50"
                      >
                        <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-purple-50">
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-400 rounded-2xl flex items-center justify-center">
                              {user?.avatar ? (
                                <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-2xl object-cover" />
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
                           <button
                             onClick={() => {
                               setCurrentView('profile');
                               setShowProfile(false);
                             }}
                             className="w-full flex items-center space-x-3 px-3 py-3 text-left hover:bg-blue-50 rounded-2xl transition-colors"
                           >
                             <div className="w-10 h-10 bg-blue-100 rounded-2xl flex items-center justify-center">
                               <User size={20} className="text-blue-600" />
                             </div>
                             <div>
                               <div className="font-medium text-gray-800">My Profile</div>
                               <div className="text-sm text-gray-500">Manage your account</div>
                             </div>
                           </button>

                           <button
                             onClick={() => {
                               setCurrentView('startup-profile');
                               setShowProfile(false);
                             }}
                             className="w-full flex items-center space-x-3 px-3 py-3 text-left hover:bg-green-50 rounded-2xl transition-colors"
                           >
                             <div className="w-10 h-10 bg-green-100 rounded-2xl flex items-center justify-center">
                               <Building size={20} className="text-green-600" />
                             </div>
                             <div>
                               <div className="font-medium text-gray-800">Startup Hub</div>
                               <div className="text-sm text-gray-500">Your startup dashboard</div>
                             </div>
                           </button>

                           <button
                             onClick={() => {
                               setCurrentView('digital-hq');
                               setShowProfile(false);
                             }}
                             className="w-full flex items-center space-x-3 px-3 py-3 text-left hover:bg-purple-50 rounded-2xl transition-colors"
                           >
                             <div className="w-10 h-10 bg-purple-100 rounded-2xl flex items-center justify-center">
                               <Home size={20} className="text-purple-600" />
                             </div>
                             <div>
                               <div className="font-medium text-gray-800">Digital HQ</div>
                               <div className="text-sm text-gray-500">Central command center</div>
                             </div>
                           </button>

                           <button
                             onClick={() => {
                               setCurrentView('roadmap');
                               setShowProfile(false);
                             }}
                             className="w-full flex items-center space-x-3 px-3 py-3 text-left hover:bg-orange-50 rounded-2xl transition-colors"
                           >
                             <div className="w-10 h-10 bg-orange-100 rounded-2xl flex items-center justify-center">
                               <Map size={20} className="text-orange-600" />
                             </div>
                             <div>
                               <div className="font-medium text-gray-800">My Roadmap</div>
                               <div className="text-sm text-gray-500">Track your progress</div>
                             </div>
                           </button>

                           <button
                             onClick={() => {
                               setCurrentView('gamification');
                               setShowProfile(false);
                             }}
                             className="w-full flex items-center space-x-3 px-3 py-3 text-left hover:bg-pink-50 rounded-2xl transition-colors"
                           >
                             <div className="w-10 h-10 bg-pink-100 rounded-2xl flex items-center justify-center">
                               <Trophy size={20} className="text-pink-600" />
                             </div>
                             <div>
                               <div className="font-medium text-gray-800">Gamification</div>
                               <div className="text-sm text-gray-500">Earn rewards & badges</div>
                             </div>
                           </button>

                           <div className="border-t border-gray-100 my-2"></div>

                           <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 py-2">
                             Account
                           </div>

                           <button
                             onClick={() => setShowProfile(false)}
                             className="w-full flex items-center space-x-3 px-3 py-3 text-left hover:bg-orange-50 rounded-2xl transition-colors"
                           >
                             <div className="w-10 h-10 bg-orange-100 rounded-2xl flex items-center justify-center">
                               <CreditCard size={20} className="text-orange-600" />
                             </div>
                             <div>
                               <div className="font-medium text-gray-800">Billing</div>
                               <div className="text-sm text-gray-500">Manage subscription</div>
                             </div>
                           </button>

                           <button
                             onClick={() => setShowProfile(false)}
                             className="w-full flex items-center space-x-3 px-3 py-3 text-left hover:bg-indigo-50 rounded-2xl transition-colors"
                           >
                             <div className="w-10 h-10 bg-indigo-100 rounded-2xl flex items-center justify-center">
                               <HelpCircle size={20} className="text-indigo-600" />
                             </div>
                             <div>
                               <div className="font-medium text-gray-800">Help & Support</div>
                               <div className="text-sm text-gray-500">Get assistance</div>
                             </div>
                           </button>

                           <div className="border-t border-gray-100 my-2"></div>

                           <button
                             onClick={() => {
                               onLogout();
                               setShowProfile(false);
                             }}
                             className="w-full flex items-center space-x-3 px-3 py-3 text-left hover:bg-red-50 rounded-2xl transition-colors"
                           >
                             <div className="w-10 h-10 bg-red-100 rounded-2xl flex items-center justify-center">
                               <LogOut size={20} className="text-red-600" />
                             </div>
                             <div>
                               <div className="font-medium text-red-600">Sign Out</div>
                               <div className="text-sm text-red-500">Logout from StartupOS</div>
                             </div>
                           </button>
                         </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Mobile Menu */}
                <motion.button
                  onClick={() => setIsOpen(!isOpen)}
                  className="lg:hidden p-3 text-gray-600 hover:text-emerald-500 hover:bg-emerald-50 rounded-2xl transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
                    {isOpen ? <X size={20} /> : <Menu size={20} />}
                  </motion.div>
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="mt-4 relative"
            >
              <div className="absolute inset-0 bg-white/90 backdrop-blur-xl rounded-3xl border border-gray-200 shadow-2xl"></div>
              
              <div className="relative p-6">
                <div className="mb-6">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      placeholder="Search StartupOS..."
                      className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {navigationItems.map((item, index) => {
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
                        className={`flex flex-col items-center space-y-3 p-4 rounded-2xl transition-all duration-300 ${
                          isActive
                            ? getColorClasses(item.color, true) + ' shadow-lg'
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Icon size={24} />
                        <span className="text-sm font-medium">{item.label}</span>
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
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Spacer to prevent navbar overlap with content */}
      <div className="h-32"></div>

      {/* Startup Network Chat */}
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
            className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-full shadow-2xl flex items-center justify-center text-white hover:shadow-emerald-500/40 transition-all duration-300 cursor-pointer"
          >
            <Users size={24} />
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
                className="absolute bottom-20 right-0 w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden"
              >
                <div className="p-4 bg-gradient-to-r from-emerald-500 to-blue-600 text-white">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Users size={20} />
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
    </>
  );
};

export default Navigation;
