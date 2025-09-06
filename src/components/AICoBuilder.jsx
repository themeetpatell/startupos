import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Filter, Plus, Star, Users, CheckCircle, 
  Brain, Zap, Shield, Target, Clock, DollarSign,
  MessageCircle, Play, Pause, MoreHorizontal, Settings,
  Send, Bot, Code, Palette, Database, BarChart3,
  ArrowRight, Sparkles, Crown, TrendingUp, Award
} from 'lucide-react';

const AICoBuilder = () => {
  const [activeTab, setActiveTab] = useState('marketplace');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showHireModal, setShowHireModal] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);
  const [showBuilderModal, setShowBuilderModal] = useState(false);
  const [currentMessage, setCurrentMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [builderConfig, setBuilderConfig] = useState({
    name: '',
    role: '',
    department: '',
    skills: [],
    personality: 'professional',
    experience: 'intermediate'
  });

  const categories = [
    { id: 'all', name: 'All', count: 24, icon: Brain },
    { id: 'marketing', name: 'Marketing', count: 8, icon: Target },
    { id: 'sales', name: 'Sales', count: 6, icon: TrendingUp },
    { id: 'engineering', name: 'Engineering', count: 5, icon: Code },
    { id: 'design', name: 'Design', count: 3, icon: Palette },
    { id: 'data', name: 'Data & Analytics', count: 2, icon: BarChart3 }
  ];

  const marketplaceEmployees = [
    {
      id: 1,
      name: 'Alex AI',
      role: 'Marketing Specialist',
      department: 'Marketing',
      description: 'Expert in digital marketing, content creation, and social media management. Proven track record of increasing engagement by 300%.',
      skills: ['Digital Marketing', 'Content Creation', 'Social Media', 'Analytics'],
      hourlyRate: 25,
      rating: 4.9,
      reviews: 127,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      isActive: false,
      tasksCompleted: 0,
      specialties: ['SEO', 'PPC', 'Email Marketing'],
      languages: ['English', 'Spanish', 'French'],
      availability: '24/7',
      responseTime: '< 1 min'
    },
    {
      id: 2,
      name: 'Sarah AI',
      role: 'Data Analyst',
      department: 'Data & Analytics',
      description: 'Advanced analytics and data visualization expert. Specializes in business intelligence and predictive modeling.',
      skills: ['Python', 'SQL', 'Tableau', 'Machine Learning'],
      hourlyRate: 35,
      rating: 4.8,
      reviews: 89,
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
      isActive: false,
      tasksCompleted: 0,
      specialties: ['Predictive Analytics', 'Data Visualization', 'A/B Testing'],
      languages: ['English', 'German'],
      availability: '24/7',
      responseTime: '< 2 min'
    },
    {
      id: 3,
      name: 'Mike AI',
      role: 'Customer Support',
      department: 'Support',
      description: 'Multilingual customer support specialist with expertise in technical troubleshooting and customer satisfaction.',
      skills: ['Customer Service', 'Technical Support', 'CRM', 'Communication'],
      hourlyRate: 20,
      rating: 4.7,
      reviews: 156,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      isActive: false,
      tasksCompleted: 0,
      specialties: ['Live Chat', 'Email Support', 'Technical Troubleshooting'],
      languages: ['English', 'Spanish', 'Portuguese', 'Italian'],
      availability: '24/7',
      responseTime: '< 30 sec'
    },
    {
      id: 4,
      name: 'Emma AI',
      role: 'UI/UX Designer',
      department: 'Design',
      description: 'Creative designer specializing in user experience and interface design. Expert in Figma, Adobe Creative Suite.',
      skills: ['Figma', 'Adobe XD', 'Sketch', 'Prototyping'],
      hourlyRate: 30,
      rating: 4.9,
      reviews: 98,
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      isActive: false,
      tasksCompleted: 0,
      specialties: ['Mobile Design', 'Web Design', 'User Research'],
      languages: ['English', 'French'],
      availability: '24/7',
      responseTime: '< 1 min'
    },
    {
      id: 5,
      name: 'David AI',
      role: 'Sales Representative',
      department: 'Sales',
      description: 'High-performing sales professional with expertise in B2B sales, lead generation, and customer relationship management.',
      skills: ['Sales', 'CRM', 'Lead Generation', 'Negotiation'],
      hourlyRate: 28,
      rating: 4.6,
      reviews: 73,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
      isActive: false,
      tasksCompleted: 0,
      specialties: ['B2B Sales', 'Cold Calling', 'Account Management'],
      languages: ['English', 'Spanish', 'Mandarin'],
      availability: '24/7',
      responseTime: '< 1 min'
    },
    {
      id: 6,
      name: 'Lisa AI',
      role: 'Full Stack Developer',
      department: 'Engineering',
      description: 'Experienced developer specializing in React, Node.js, and cloud technologies. Expert in building scalable applications.',
      skills: ['React', 'Node.js', 'Python', 'AWS'],
      hourlyRate: 40,
      rating: 4.8,
      reviews: 112,
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face',
      isActive: false,
      tasksCompleted: 0,
      specialties: ['Web Development', 'API Development', 'Cloud Architecture'],
      languages: ['English', 'Japanese'],
      availability: '24/7',
      responseTime: '< 2 min'
    }
  ];

  const myEmployees = [
    {
      id: 1,
      name: 'Alex AI',
      role: 'Marketing Specialist',
      department: 'Marketing',
      isActive: true,
      tasksCompleted: 45,
      rating: 4.9,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      lastActive: '2 minutes ago',
      currentTask: 'Creating Q1 social media strategy'
    },
    {
      id: 2,
      name: 'Sarah AI',
      role: 'Data Analyst',
      department: 'Data & Analytics',
      isActive: true,
      tasksCompleted: 32,
      rating: 4.8,
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
      lastActive: '5 minutes ago',
      currentTask: 'Analyzing user engagement metrics'
    }
  ];

  const tabs = [
    { id: 'marketplace', label: 'Marketplace', icon: Brain },
    { id: 'my-employees', label: 'My Employees', icon: Users },
    { id: 'builder', label: 'AI Builder', icon: Settings }
  ];

  const filteredEmployees = useMemo(() => {
    return marketplaceEmployees.filter(employee => {
      const matchesSearch = employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           employee.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           employee.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = selectedCategory === 'all' || employee.department.toLowerCase() === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const handleHireEmployee = useCallback((employee) => {
    setSelectedEmployee(employee);
    setShowHireModal(true);
  }, []);

  const handleUseEmployee = useCallback((employee) => {
    setSelectedEmployee(employee);
    setShowChatModal(true);
  }, []);

  const handleStartBuilder = useCallback(() => {
    setShowBuilderModal(true);
  }, []);

  const handleSendMessage = useCallback(async () => {
    if (!currentMessage.trim() || isProcessing) return;
    
    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: currentMessage,
      timestamp: new Date()
    };
    
    setChatHistory(prev => [...prev, userMessage]);
    setCurrentMessage('');
    setIsProcessing(true);
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        type: 'ai',
        content: `I understand you need help with "${currentMessage}". Let me assist you with that. I can help you with ${selectedEmployee?.skills.join(', ')} and provide insights based on my experience in ${selectedEmployee?.department}.`,
        timestamp: new Date()
      };
      setChatHistory(prev => [...prev, aiResponse]);
      setIsProcessing(false);
    }, 2000);
  }, [currentMessage, selectedEmployee, isProcessing]);

  const handleCreateEmployee = useCallback(() => {
    // Simulate creating a new AI employee
    console.log('Creating AI employee with config:', builderConfig);
    setShowBuilderModal(false);
    setBuilderConfig({
      name: '',
      role: '',
      department: '',
      skills: [],
      personality: 'professional',
      experience: 'intermediate'
    });
  }, [builderConfig]);

  const renderEmployeeCard = (employee) => (
    <motion.div
      key={employee.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="group"
    >
      <div className="enterprise-card p-6 h-full group-hover:enterprise-card-elevated">
        <div className="flex items-start space-x-4 mb-4">
          <img
            src={employee.avatar}
            alt={employee.name}
            className="w-12 h-12 rounded-full"
          />
          <div className="flex-1">
            <h3 className="enterprise-text-h6 text-slate-900 font-semibold">
              {employee.name}
              </h3>
            <p className="enterprise-text-body-sm text-slate-600">
              {employee.role}
            </p>
            <div className="flex items-center mt-1 space-x-2">
              <span className="enterprise-badge enterprise-badge-gray">
                {employee.department}
              </span>
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="enterprise-text-caption text-slate-600">
                  {employee.rating}
                </span>
            </div>
          </div>
          </div>
        </div>

        <p className="enterprise-text-body-sm text-slate-600 mb-4">
          {employee.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {employee.skills.slice(0, 3).map((skill, index) => (
            <span key={index} className="enterprise-badge enterprise-badge-primary">
              {skill}
            </span>
          ))}
          {employee.skills.length > 3 && (
            <span className="enterprise-badge enterprise-badge-gray">
              +{employee.skills.length - 3} more
            </span>
          )}
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <div className="enterprise-text-h6 text-slate-900 font-bold">
                ${employee.hourlyRate}/hr
            </div>
              <div className="enterprise-text-caption text-slate-500">
                Hourly Rate
            </div>
          </div>
            <div className="text-center">
              <div className="enterprise-text-h6 text-slate-900 font-bold">
                {employee.reviews}
        </div>
              <div className="enterprise-text-caption text-slate-500">
                Reviews
          </div>
          </div>
        </div>
      </div>
        
        <div className="flex space-x-2">
          <button 
            className="enterprise-button-primary enterprise-button-sm flex-1"
            onClick={() => handleHireEmployee(employee)}
          >
            <Plus size={16} />
            Hire Now
          </button>
          <button 
            className="enterprise-button-secondary enterprise-button-sm flex-1"
            onClick={() => handleUseEmployee(employee)}
          >
            <MessageCircle size={16} />
            Chat Now
          </button>
        </div>
      </div>
    </motion.div>
  );

    return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="enterprise-page-header">
          <h1 className="enterprise-page-header-title">AI Co-Builder</h1>
          <p className="enterprise-page-header-subtitle">Discover, hire, and manage AI employees for every startup function</p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mt-4">
            <button 
              className="enterprise-button-primary enterprise-button-md flex items-center gap-2"
              onClick={handleStartBuilder}
            >
              <Settings size={20} />
              Create AI Employee
            </button>
            <div className="flex items-center gap-2 text-slate-600">
              <Crown className="w-5 h-5 text-yellow-500" />
              <span className="enterprise-text-body-sm">Premium AI Employees Available</span>
          </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="enterprise-tabs overflow-x-auto">
            {tabs.map((tab) => (
          <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`enterprise-tab whitespace-nowrap flex items-center gap-2 ${activeTab === tab.id ? 'active' : ''}`}
              >
                <tab.icon size={16} />
                {tab.label}
          </button>
            ))}
          </div>
        </div>

        {/* Search and Filters */}
        <div className="enterprise-card p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input 
                  className="enterprise-input pl-10 w-full md:w-64"
                  type="text"
                  placeholder="Search AI employees..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                      </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="enterprise-input px-3 py-2"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name} ({category.count})
                  </option>
                ))}
              </select>
                  </div>
            <div className="flex items-center space-x-2">
              <span className="enterprise-text-body-sm text-slate-600">
                {filteredEmployees.length} AI employees found
              </span>
              </div>
            </div>
              </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'marketplace' && (
              <motion.div
              key="marketplace"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredEmployees.map(renderEmployeeCard)}
              </motion.div>
          )}

          {activeTab === 'my-employees' && (
              <motion.div
              key="my-employees"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="enterprise-card p-6">
                <h3 className="enterprise-text-h5 text-slate-900 mb-6">My AI Team</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {myEmployees.map((employee) => (
                    <div key={employee.id} className="flex items-center space-x-4 p-4 rounded-lg border border-slate-200 hover:border-slate-300 transition-colors">
                      <img
                        src={employee.avatar}
                        alt={employee.name}
                        className="w-12 h-12 rounded-full"
                      />
                      <div className="flex-1">
                        <h4 className="enterprise-text-body font-semibold text-slate-900">
                          {employee.name}
                        </h4>
                        <p className="enterprise-text-body-sm text-slate-600">
                          {employee.role} • {employee.department}
                        </p>
                        <div className="flex items-center mt-2 space-x-4">
                          <span className={`enterprise-badge ${
                            employee.isActive ? 'enterprise-badge-success' : 'enterprise-badge-gray'
                          }`}>
                            {employee.isActive ? 'Active' : 'Idle'}
                          </span>
                          <span className="enterprise-text-caption text-slate-500">
                            {employee.tasksCompleted} tasks completed
                          </span>
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="enterprise-text-body-sm text-slate-600">
                              {employee.rating}
                            </span>
                </div>
                </div>
                        {employee.currentTask && (
                          <p className="enterprise-text-caption text-slate-500 mt-1">
                            Currently: {employee.currentTask}
                          </p>
                        )}
                </div>
                      <button 
                        className="enterprise-button-secondary enterprise-button-sm"
                        onClick={() => handleUseEmployee(employee)}
                      >
                        <MessageCircle size={16} />
                        Chat
                      </button>
                </div>
                  ))}
                    </div>
                  </div>
                </motion.div>
              )}

          {activeTab === 'builder' && (
              <motion.div
              key="builder"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="enterprise-card p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Settings className="w-8 h-8 text-white" />
                  </div>
                <h3 className="enterprise-text-h4 text-slate-900 mb-4">AI Employee Builder</h3>
                <p className="enterprise-text-body text-slate-600 mb-8 max-w-2xl mx-auto">
                  Create custom AI employees tailored to your specific needs. Define their skills, personality, and expertise to build the perfect team member.
                </p>
                <button 
                  className="enterprise-button-primary enterprise-button-lg"
                  onClick={handleStartBuilder}
                >
                  <Settings size={20} />
                  Start Building
                </button>
                  </div>
              </motion.div>
          )}
        </AnimatePresence>

        {/* Hire Modal */}
        {showHireModal && selectedEmployee && (
          <div className="enterprise-modal-backdrop">
            <div className="enterprise-modal max-w-2xl">
              <div className="p-6">
                <div className="flex items-center space-x-4 mb-6">
                  <img
                    src={selectedEmployee.avatar}
                    alt={selectedEmployee.name}
                    className="w-16 h-16 rounded-full"
                  />
                      <div>
                    <h3 className="enterprise-text-h5 text-slate-900">
                      Hire {selectedEmployee.name}
                    </h3>
                    <p className="enterprise-text-body-sm text-slate-600">
                      {selectedEmployee.role} • ${selectedEmployee.hourlyRate}/hour
                    </p>
                    </div>
                  </div>
                  
                <div className="space-y-4 mb-6">
                      <div>
                    <label className="enterprise-text-body-sm font-medium text-slate-700 mb-2 block">
                      Contract Duration
                    </label>
                    <select className="enterprise-input w-full">
                      <option>1 month</option>
                      <option>3 months</option>
                      <option>6 months</option>
                      <option>1 year</option>
                    </select>
                  </div>
                  
                      <div>
                    <label className="enterprise-text-body-sm font-medium text-slate-700 mb-2 block">
                      Hours per Week
                    </label>
                    <select className="enterprise-input w-full">
                      <option>10 hours</option>
                      <option>20 hours</option>
                      <option>40 hours</option>
                      <option>60+ hours</option>
                    </select>
                </div>
                
                          <div>
                    <label className="enterprise-text-body-sm font-medium text-slate-700 mb-2 block">
                      Special Instructions
                    </label>
                    <textarea 
                      className="enterprise-input w-full h-24"
                      placeholder="Any specific requirements or preferences..."
                    />
                          </div>
                        </div>
                        
                <div className="flex justify-end space-x-3">
                  <button 
                    className="enterprise-button-secondary enterprise-button-md"
                    onClick={() => setShowHireModal(false)}
                  >
                    Cancel
                  </button>
                  <button 
                    className="enterprise-button-primary enterprise-button-md"
                    onClick={() => {
                      setShowHireModal(false);
                      // Add to my employees
                    }}
                  >
                    <Crown size={16} />
                    Hire Now
                  </button>
                          </div>
                        </div>
                </div>
            </div>
          )}

        {/* Chat Modal */}
        {showChatModal && selectedEmployee && (
          <div className="enterprise-modal-backdrop">
            <div className="enterprise-modal max-w-4xl h-[600px] flex flex-col">
              <div className="p-6 border-b border-slate-200">
                <div className="flex items-center space-x-4">
                  <img
                    src={selectedEmployee.avatar}
                    alt={selectedEmployee.name}
                    className="w-10 h-10 rounded-full"
                  />
                    <div>
                    <h3 className="enterprise-text-h6 text-slate-900">
                      Chat with {selectedEmployee.name}
                    </h3>
                    <p className="enterprise-text-caption text-slate-500">
                      {selectedEmployee.role} • {selectedEmployee.responseTime} response time
                    </p>
                    </div>
                  </div>
                </div>
                
              <div className="flex-1 p-6 overflow-y-auto">
                <div className="space-y-4">
                  {chatHistory.map((message) => (
                    <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.type === 'user' 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-slate-100 text-slate-900'
                      }`}>
                        <p className="enterprise-text-body-sm">{message.content}</p>
                        <p className={`enterprise-text-caption mt-1 ${
                          message.type === 'user' ? 'text-blue-100' : 'text-slate-500'
                        }`}>
                          {message.timestamp.toLocaleTimeString()}
                        </p>
                    </div>
                    </div>
                  ))}
                  {isProcessing && (
                    <div className="flex justify-start">
                      <div className="bg-slate-100 text-slate-900 px-4 py-2 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <div className="enterprise-spinner w-4 h-4"></div>
                          <span className="enterprise-text-body-sm">Thinking...</span>
                  </div>
                </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="p-6 border-t border-slate-200">
                <div className="flex space-x-2">
                  <input 
                    className="enterprise-input flex-1"
                    placeholder="Type your message..."
                    value={currentMessage}
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <button 
                    className="enterprise-button-primary enterprise-button-md"
                    onClick={handleSendMessage}
                    disabled={!currentMessage.trim() || isProcessing}
                  >
                    <Send size={16} />
                  </button>
                        </div>
                      </div>
                </div>
            </div>
          )}

        {/* Builder Modal */}
        {showBuilderModal && (
          <div className="enterprise-modal-backdrop">
            <div className="enterprise-modal max-w-3xl">
              <div className="p-6">
                <h3 className="enterprise-text-h5 text-slate-900 mb-6">Create AI Employee</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                    <label className="enterprise-text-body-sm font-medium text-slate-700 mb-2 block">
                      Name
                    </label>
                    <input 
                      className="enterprise-input w-full"
                      placeholder="e.g., Alex AI"
                      value={builderConfig.name}
                      onChange={(e) => setBuilderConfig(prev => ({ ...prev, name: e.target.value }))}
                    />
            </div>
            
            <div>
                    <label className="enterprise-text-body-sm font-medium text-slate-700 mb-2 block">
                      Role
                    </label>
                    <input 
                      className="enterprise-input w-full"
                      placeholder="e.g., Marketing Specialist"
                      value={builderConfig.role}
                      onChange={(e) => setBuilderConfig(prev => ({ ...prev, role: e.target.value }))}
              />
            </div>
            
                  <div>
                    <label className="enterprise-text-body-sm font-medium text-slate-700 mb-2 block">
                      Department
                    </label>
                    <select 
                      className="enterprise-input w-full"
                      value={builderConfig.department}
                      onChange={(e) => setBuilderConfig(prev => ({ ...prev, department: e.target.value }))}
                    >
                      <option value="">Select Department</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Sales">Sales</option>
                      <option value="Engineering">Engineering</option>
                      <option value="Design">Design</option>
                      <option value="Data & Analytics">Data & Analytics</option>
                      <option value="Support">Support</option>
                    </select>
            </div>
            
            <div>
                    <label className="enterprise-text-body-sm font-medium text-slate-700 mb-2 block">
                      Experience Level
                    </label>
                    <select 
                      className="enterprise-input w-full"
                      value={builderConfig.experience}
                      onChange={(e) => setBuilderConfig(prev => ({ ...prev, experience: e.target.value }))}
                    >
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                      <option value="expert">Expert</option>
                    </select>
            </div>
            
                <div>
                    <label className="enterprise-text-body-sm font-medium text-slate-700 mb-2 block">
                      Personality
                    </label>
                    <select 
                      className="enterprise-input w-full"
                      value={builderConfig.personality}
                      onChange={(e) => setBuilderConfig(prev => ({ ...prev, personality: e.target.value }))}
                    >
                      <option value="professional">Professional</option>
                      <option value="friendly">Friendly</option>
                      <option value="analytical">Analytical</option>
                      <option value="creative">Creative</option>
                    </select>
            </div>
            
                  <div>
                    <label className="enterprise-text-body-sm font-medium text-slate-700 mb-2 block">
                      Skills (comma-separated)
                    </label>
                                <input
                      className="enterprise-input w-full"
                      placeholder="e.g., Python, SQL, Data Analysis"
                      value={builderConfig.skills.join(', ')}
                      onChange={(e) => setBuilderConfig(prev => ({ 
                        ...prev, 
                        skills: e.target.value.split(',').map(s => s.trim()).filter(s => s)
                      }))}
                    />
                              </div>
                  </div>
                  
                <div className="flex justify-end space-x-3 mt-8">
                  <button 
                    className="enterprise-button-secondary enterprise-button-md"
                    onClick={() => setShowBuilderModal(false)}
                  >
                      Cancel
                  </button>
                  <button 
                    className="enterprise-button-primary enterprise-button-md"
                    onClick={handleCreateEmployee}
                  >
                    <Sparkles size={16} />
                    Create AI Employee
                  </button>
                  </div>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default AICoBuilder; 