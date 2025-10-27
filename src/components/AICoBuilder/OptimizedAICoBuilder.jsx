import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Filter, Plus, Star, Users, CheckCircle, 
  Brain, Zap, Shield, Target, Clock, DollarSign,
  MessageCircle, Play, Pause, MoreHorizontal, Settings,
  Send, Bot, Code, Palette, Database, BarChart3,
  ArrowRight, Sparkles, Crown, TrendingUp, Award,
  X, FileText, RefreshCw, Globe, Heart, Bookmark
} from 'lucide-react';

// Import optimized sub-components
import AICoBuilderMarketplace from './AICoBuilderMarketplace';
import AICoBuilderTrends from './AICoBuilderTrends';
import AICoBuilderMyTeam from './AICoBuilderMyTeam';

const OptimizedAICoBuilder = () => {
  const [activeTab, setActiveTab] = useState('marketplace');
  const [trendsCategory, setTrendsCategory] = useState('trending');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showInlineDetails, setShowInlineDetails] = useState(false);

  // Mock data - in production, this would come from API
  const marketplaceEmployees = [
    {
      id: 1,
      name: 'Alex AI',
      role: 'Marketing Specialist',
      department: 'Marketing',
      description: 'Expert in digital marketing strategies and campaign optimization.',
      skills: ['Digital Marketing', 'SEO', 'Content Strategy', 'Analytics'],
      hourlyRate: 45,
      rating: 4.9,
      reviews: 125,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      isActive: true,
      tasksCompleted: 89,
      badge: 'Pro',
      badgeColor: 'blue',
      successRate: 98,
      users: 1250
    },
    {
      id: 2,
      name: 'Sarah AI',
      role: 'Data Analyst',
      department: 'Data & Analytics',
      description: 'Specializes in data analysis and business intelligence.',
      skills: ['Data Analysis', 'Python', 'SQL', 'Machine Learning'],
      hourlyRate: 50,
      rating: 4.8,
      reviews: 98,
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
      isActive: true,
      tasksCompleted: 76,
      badge: 'Expert',
      badgeColor: 'purple',
      successRate: 95,
      users: 980
    }
  ];

  const myTeamEmployees = [
    {
      id: 101,
      name: 'My Marketing AI',
      role: 'Marketing Assistant',
      department: 'Marketing',
      description: 'Your personal marketing assistant.',
      skills: ['Content Creation', 'Social Media', 'Email Marketing'],
      hourlyRate: 0,
      rating: 4.7,
      reviews: 0,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      isActive: true,
      tasksCompleted: 45,
      badge: 'My Team',
      badgeColor: 'green',
      successRate: 92,
      users: 1
    }
  ];

  const trendsData = {
    trending: [
      { id: 1, name: 'Alex AI', role: 'Marketing Specialist', department: 'Marketing', rating: 4.9, users: 1250, trend: '+25%', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face' },
      { id: 2, name: 'Sarah AI', role: 'Data Analyst', department: 'Data & Analytics', rating: 4.8, users: 980, trend: '+18%', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face' }
    ],
    popular: [
      { id: 3, name: 'Mike AI', role: 'Customer Support', department: 'Support', rating: 4.7, users: 2100, trend: '+12%', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face' }
    ],
    mutualConnections: [
      { id: 1, name: 'Alex AI', role: 'Marketing Specialist', department: 'Marketing', rating: 4.9, users: 1250, mutualCount: 12, avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face' }
    ],
    similarIndustries: [
      { id: 1, name: 'Alex AI', role: 'Marketing Specialist', department: 'Marketing', rating: 4.9, users: 1250, industry: 'SaaS', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face' }
    ],
    newReleases: [
      { id: 7, name: 'Sophia AI', role: 'AI Researcher', department: 'Research', rating: 4.9, users: 450, trend: 'NEW', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face' }
    ],
    topRated: [
      { id: 1, name: 'Alex AI', role: 'Marketing Specialist', department: 'Marketing', rating: 4.9, users: 1250, trend: 'TOP', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face' }
    ]
  };

  const categories = useMemo(() => {
    const allEmployees = [...marketplaceEmployees, ...myTeamEmployees];
    const categoryCounts = allEmployees.reduce((acc, emp) => {
      const dept = emp.department?.toLowerCase() || 'other';
      acc[dept] = (acc[dept] || 0) + 1;
      return acc;
    }, {});

    return [
      { id: 'all', name: 'All', count: allEmployees.length, icon: Brain },
      { id: 'marketing', name: 'Marketing', count: categoryCounts.marketing || 0, icon: Target },
      { id: 'data & analytics', name: 'Data & Analytics', count: categoryCounts['data & analytics'] || 0, icon: BarChart3 },
      { id: 'support', name: 'Support', count: categoryCounts.support || 0, icon: Users }
    ];
  }, []);

  const handleEmployeeClick = useCallback((employee) => {
    setSelectedEmployee(employee);
    setShowInlineDetails(true);
  }, []);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'marketplace':
        return (
          <AICoBuilderMarketplace
            employees={marketplaceEmployees}
            categories={categories}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            onEmployeeClick={handleEmployeeClick}
          />
        );
      case 'trends':
        return (
          <AICoBuilderTrends
            trendsData={trendsData}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            trendsCategory={trendsCategory}
            setTrendsCategory={setTrendsCategory}
            onEmployeeClick={handleEmployeeClick}
          />
        );
      case 'my-team':
        return (
          <AICoBuilderMyTeam
            employees={myTeamEmployees}
            categories={categories}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            onEmployeeClick={handleEmployeeClick}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">AI Co-Builder</h1>
              <p className="text-gray-600 mt-2">Build, manage, and deploy AI employees for your startup</p>
            </div>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors flex items-center space-x-2">
              <Plus className="w-5 h-5" />
              <span>Create AI Employee</span>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="bg-white rounded-xl border border-gray-200 p-2 shadow-sm">
            <nav className="flex space-x-2">
              {[
                { id: 'marketplace', label: 'Marketplace', count: marketplaceEmployees.length, icon: Globe },
                { id: 'my-team', label: 'My Team', count: myTeamEmployees.length, icon: Users },
                { id: 'trends', label: 'Trends', count: Object.values(trendsData).flat().length, icon: TrendingUp }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all ${
                      activeTab === tab.id
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{tab.label}</span>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      activeTab === tab.id
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}>
                      {tab.count}
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {!showInlineDetails ? (
              renderTabContent()
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden"
              >
                {/* Header with Back Button */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => setShowInlineDetails(false)}
                        className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                      >
                        <ArrowRight className="w-5 h-5 rotate-180" />
                      </button>
                      <img
                        src={selectedEmployee?.avatar}
                        alt={selectedEmployee?.name}
                        className="w-16 h-16 rounded-full border-4 border-white/20"
                      />
                      <div>
                        <h2 className="text-2xl font-bold">{selectedEmployee?.name}</h2>
                        <p className="text-blue-100">{selectedEmployee?.role}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Overview</h3>
                        <p className="text-gray-600 leading-relaxed mb-4">
                          {selectedEmployee?.description || 'No description available'}
                        </p>
                      </div>

                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Skills & Expertise</h3>
                        <div className="flex flex-wrap gap-2">
                          {(selectedEmployee?.skills || []).map((skill, index) => (
                            <span
                              key={index}
                              className="px-3 py-2 bg-blue-50 text-blue-700 text-sm font-medium rounded-lg border border-blue-200"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 mb-3">Quick Actions</h4>
                        <div className="space-y-2">
                          <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                            Hire Now
                          </button>
                          <button className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                            Add to Favorites
                          </button>
                          <button className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                            Start Chat
                          </button>
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 mb-3">Details</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Rating:</span>
                            <span className="font-medium">{selectedEmployee?.rating}/5</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Hourly Rate:</span>
                            <span className="font-medium">${selectedEmployee?.hourlyRate}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Success Rate:</span>
                            <span className="font-medium">{selectedEmployee?.successRate}%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default OptimizedAICoBuilder;
