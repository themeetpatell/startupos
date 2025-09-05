import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Filter, Plus, Star, Users, CheckCircle, 
  Brain, Zap, Shield, Target, Clock, DollarSign,
  MessageCircle, Play, Pause, MoreHorizontal
} from 'lucide-react';
import { 
  AppleCard, 
  AppleButton, 
  AppleBadge, 
  AppleInput,
  AppleModal,
  ApplePageHeader,
  AppleTabs,
  AppleList,
  AppleListItem,
  AppleEmptyState
} from './AppleDesignSystem';

const AppleAICoBuilder = () => {
  const [activeTab, setActiveTab] = useState('marketplace');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showHireModal, setShowHireModal] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [currentMessage, setCurrentMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const categories = [
    { id: 'all', name: 'All', count: 24 },
    { id: 'marketing', name: 'Marketing', count: 8 },
    { id: 'sales', name: 'Sales', count: 6 },
    { id: 'engineering', name: 'Engineering', count: 5 },
    { id: 'design', name: 'Design', count: 3 },
    { id: 'support', name: 'Support', count: 2 }
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
      tasksCompleted: 150,
      isActive: false,
      capabilities: [
        'Social media strategy development',
        'Content calendar management',
        'Campaign performance analysis',
        'Brand voice optimization'
      ],
      lastActive: '2024-01-15T10:30:00Z',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
    },
    {
      id: 2,
      name: 'Sarah AI',
      role: 'Data Analyst',
      department: 'Engineering',
      description: 'Specializes in data analysis, machine learning, and business intelligence. Helps startups make data-driven decisions.',
      skills: ['Python', 'SQL', 'Machine Learning', 'Statistics'],
      hourlyRate: 35,
      rating: 4.8,
      tasksCompleted: 89,
      isActive: false,
      capabilities: [
        'Data visualization',
        'Predictive modeling',
        'A/B testing analysis',
        'KPI tracking'
      ],
      lastActive: '2024-01-14T15:45:00Z',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face'
    },
    {
      id: 3,
      name: 'Mike AI',
      role: 'Customer Success Manager',
      department: 'Support',
      description: 'Dedicated to customer satisfaction and retention. Expert in customer journey optimization and support automation.',
      skills: ['Customer Service', 'CRM', 'Automation', 'Communication'],
      hourlyRate: 20,
      rating: 4.7,
      tasksCompleted: 203,
      isActive: false,
      capabilities: [
        'Customer onboarding',
        'Support ticket management',
        'Retention strategies',
        'Feedback analysis'
      ],
      lastActive: '2024-01-15T09:15:00Z',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
    },
    {
      id: 4,
      name: 'Emma AI',
      role: 'UI/UX Designer',
      department: 'Design',
      description: 'Creative designer focused on user experience and interface design. Creates beautiful, functional designs that users love.',
      skills: ['Figma', 'Sketch', 'Prototyping', 'User Research'],
      hourlyRate: 30,
      rating: 4.9,
      tasksCompleted: 67,
      isActive: false,
      capabilities: [
        'Wireframing',
        'Prototype creation',
        'User testing',
        'Design systems'
      ],
      lastActive: '2024-01-15T11:20:00Z',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face'
    }
  ];

  const myEmployees = [
    {
      id: 1,
      name: 'Alex AI',
      role: 'Marketing Specialist',
      department: 'Marketing',
      hiredAt: '2024-01-01T00:00:00Z',
      tasksCompleted: 45,
      rating: 4.9,
      isActive: true,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
    }
  ];

  const tabs = [
    { id: 'marketplace', label: 'Marketplace' },
    { id: 'my-employees', label: 'My Employees' },
    { id: 'community', label: 'Community' }
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

  const handleHireEmployee = (employee) => {
    setSelectedEmployee(employee);
    setShowHireModal(true);
  };

  const handleUseEmployee = (employee) => {
    setSelectedEmployee(employee);
    setShowChatModal(true);
    setChatHistory([{
      id: 1,
      role: 'assistant',
      content: `Hello! I'm ${employee.name}, your ${employee.role}. How can I help you today?`,
      timestamp: new Date().toISOString()
    }]);
  };

  const handleSendMessage = async () => {
    if (!currentMessage.trim()) return;
    
    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: currentMessage,
      timestamp: new Date().toISOString()
    };
    
    setChatHistory(prev => [...prev, userMessage]);
    setCurrentMessage('');
    setIsProcessing(true);
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        role: 'assistant',
        content: `I understand you need help with "${currentMessage}". Let me analyze this and provide you with a comprehensive solution. Based on my expertise in ${selectedEmployee?.department}, I can help you with this task effectively.`,
        timestamp: new Date().toISOString()
      };
      setChatHistory(prev => [...prev, aiResponse]);
      setIsProcessing(false);
    }, 2000);
  };

  const renderEmployeeCard = (employee) => (
    <motion.div
      key={employee.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="group"
    >
      <AppleCard className="p-6 h-full group-hover:apple-card-elevated">
        <div className="flex items-start space-x-4 mb-4">
          <img
            src={employee.avatar}
            alt={employee.name}
            className="w-12 h-12 rounded-full"
          />
          <div className="flex-1 min-w-0">
            <h3 className="apple-text-headline text-gray-900 font-medium">
              {employee.name}
            </h3>
            <p className="apple-text-callout text-gray-600">
              {employee.role}
            </p>
            <div className="flex items-center mt-1 space-x-2">
              <AppleBadge variant="gray" size="small">
                {employee.department}
              </AppleBadge>
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="apple-text-caption-1 text-gray-600">
                  {employee.rating}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <p className="apple-text-body text-gray-600 mb-4 line-clamp-2">
          {employee.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {employee.skills.slice(0, 3).map((skill, index) => (
            <AppleBadge key={index} variant="primary" size="small">
              {skill}
            </AppleBadge>
          ))}
          {employee.skills.length > 3 && (
            <AppleBadge variant="gray" size="small">
              +{employee.skills.length - 3} more
            </AppleBadge>
          )}
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <div className="apple-text-callout text-gray-900 font-medium">
                {employee.tasksCompleted}
              </div>
              <div className="apple-text-caption-2 text-gray-500">
                tasks
              </div>
            </div>
            <div className="text-center">
              <div className="apple-text-callout text-gray-900 font-medium">
                ${employee.hourlyRate}/hr
              </div>
              <div className="apple-text-caption-2 text-gray-500">
                rate
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <AppleButton
            size="small"
            className="flex-1"
            onClick={() => handleHireEmployee(employee)}
            icon={<Plus size={16} />}
          >
            Hire
          </AppleButton>
          <AppleButton
            variant="secondary"
            size="small"
            className="flex-1"
            onClick={() => handleUseEmployee(employee)}
            icon={<MessageCircle size={16} />}
          >
            Use Now
          </AppleButton>
        </div>
      </AppleCard>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <ApplePageHeader
          title="AI Co-Builder"
          subtitle="Discover, hire, and manage AI employees for every startup function"
          action={
            <AppleButton size="medium" icon={<Plus size={20} />}>
              Create AI Employee
            </AppleButton>
          }
        />

        {/* Tabs */}
        <div className="mb-8">
          <AppleTabs 
            tabs={tabs} 
            activeTab={activeTab} 
            onTabChange={setActiveTab}
          />
        </div>

        {/* Search and Filters */}
        <AppleCard className="p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <AppleInput
                  type="text"
                  placeholder="Search AI employees..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-full md:w-64"
                />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="apple-input px-3 py-2"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name} ({category.count})
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center space-x-4">
              <span className="apple-text-callout text-gray-600">
                {filteredEmployees.length} AI employees found
              </span>
            </div>
          </div>
        </AppleCard>

        {/* Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'marketplace' && (
            <motion.div
              key="marketplace"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {filteredEmployees.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredEmployees.map(renderEmployeeCard)}
                </div>
              ) : (
                <AppleEmptyState
                  icon={<Brain className="w-16 h-16 text-gray-400" />}
                  title="No AI employees found"
                  description="Try adjusting your search criteria or browse different categories."
                  action={
                    <AppleButton onClick={() => setSearchQuery('')}>
                      Clear Search
                    </AppleButton>
                  }
                />
              )}
            </motion.div>
          )}

          {activeTab === 'my-employees' && (
            <motion.div
              key="my-employees"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {myEmployees.length > 0 ? (
                <AppleList>
                  {myEmployees.map((employee) => (
                    <AppleListItem key={employee.id} className="p-6">
                      <div className="flex items-center space-x-4">
                        <img
                          src={employee.avatar}
                          alt={employee.name}
                          className="w-12 h-12 rounded-full"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="apple-text-headline text-gray-900 font-medium">
                            {employee.name}
                          </h3>
                          <p className="apple-text-callout text-gray-600">
                            {employee.role} • {employee.department}
                          </p>
                          <div className="flex items-center mt-2 space-x-4">
                            <AppleBadge 
                              variant={employee.isActive ? 'success' : 'gray'} 
                              size="small"
                            >
                              {employee.isActive ? 'Active' : 'Idle'}
                            </AppleBadge>
                            <span className="apple-text-caption-1 text-gray-500">
                              {employee.tasksCompleted} tasks completed
                            </span>
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <span className="apple-text-caption-1 text-gray-600">
                                {employee.rating}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <AppleButton
                            size="small"
                            variant="secondary"
                            onClick={() => handleUseEmployee(employee)}
                            icon={<MessageCircle size={16} />}
                          >
                            Chat
                          </AppleButton>
                          <AppleButton
                            size="small"
                            variant="tertiary"
                            icon={<MoreHorizontal size={16} />}
                          />
                        </div>
                      </div>
                    </AppleListItem>
                  ))}
                </AppleList>
              ) : (
                <AppleEmptyState
                  icon={<Users className="w-16 h-16 text-gray-400" />}
                  title="No AI employees hired yet"
                  description="Browse the marketplace to find and hire AI employees for your startup."
                  action={
                    <AppleButton onClick={() => setActiveTab('marketplace')}>
                      Browse Marketplace
                    </AppleButton>
                  }
                />
              )}
            </motion.div>
          )}

          {activeTab === 'community' && (
            <motion.div
              key="community"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <AppleEmptyState
                icon={<Users className="w-16 h-16 text-gray-400" />}
                title="Community Coming Soon"
                description="Connect with other founders, share experiences, and learn from the community."
                action={
                  <AppleButton disabled>
                    Coming Soon
                  </AppleButton>
                }
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hire Modal */}
        <AppleModal
          isOpen={showHireModal}
          onClose={() => setShowHireModal(false)}
          title="Hire AI Employee"
          size="medium"
        >
          {selectedEmployee && (
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <img
                  src={selectedEmployee.avatar}
                  alt={selectedEmployee.name}
                  className="w-16 h-16 rounded-full"
                />
                <div>
                  <h3 className="apple-text-title-3 text-gray-900">
                    {selectedEmployee.name}
                  </h3>
                  <p className="apple-text-callout text-gray-600">
                    {selectedEmployee.role} • {selectedEmployee.department}
                  </p>
                  <div className="flex items-center mt-1 space-x-2">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="apple-text-caption-1 text-gray-600">
                      {selectedEmployee.rating} • {selectedEmployee.tasksCompleted} tasks completed
                    </span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="apple-text-headline text-gray-900 mb-2">Capabilities</h4>
                <ul className="space-y-1">
                  {selectedEmployee.capabilities.map((capability, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="apple-text-body text-gray-600">{capability}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <div className="apple-text-callout text-gray-900 font-medium">
                    ${selectedEmployee.hourlyRate}/hour
                  </div>
                  <div className="apple-text-caption-1 text-gray-600">
                    Billed monthly
                  </div>
                </div>
                <AppleButton onClick={() => setShowHireModal(false)}>
                  Confirm Hire
                </AppleButton>
              </div>
            </div>
          )}
        </AppleModal>

        {/* Chat Modal */}
        <AppleModal
          isOpen={showChatModal}
          onClose={() => setShowChatModal(false)}
          title={selectedEmployee ? `Chat with ${selectedEmployee.name}` : 'AI Chat'}
          size="large"
        >
          {selectedEmployee && (
            <div className="space-y-4">
              <div className="h-96 overflow-y-auto space-y-4">
                {chatHistory.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.role === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <p className="apple-text-body">{message.content}</p>
                    </div>
                  </div>
                ))}
                {isProcessing && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 text-gray-900 px-4 py-2 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <div className="apple-spinner w-4 h-4" />
                        <span className="apple-text-body">Thinking...</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex space-x-2">
                <AppleInput
                  placeholder="Type your message..."
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1"
                />
                <AppleButton
                  onClick={handleSendMessage}
                  disabled={!currentMessage.trim() || isProcessing}
                  icon={<MessageCircle size={16} />}
                >
                  Send
                </AppleButton>
              </div>
            </div>
          )}
        </AppleModal>
      </div>
    </div>
  );
};

export default AppleAICoBuilder;
