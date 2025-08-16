import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft,
  Star,
  Download,
  MessageCircle,
  Share2,
  Heart,
  Play,
  Code,
  Settings,
  Users,
  Calendar,
  Tag,
  Award,
  Shield,
  Zap,
  CheckCircle,
  Clock,
  DollarSign,
  TrendingUp,
  BarChart3,
  Target,
  Lightbulb,
  Building
} from 'lucide-react';
import '../App.css';

const ToolDetail = ({ tool, onBack }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isLiked, setIsLiked] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'features', label: 'Features', icon: CheckCircle },
    { id: 'reviews', label: 'Reviews', icon: MessageCircle },
    { id: 'creator', label: 'Creator', icon: Users },
    { id: 'pricing', label: 'Pricing', icon: DollarSign }
  ];

  const reviews = [
    {
      id: 1,
      user: 'John Smith',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      rating: 5,
      date: '2 days ago',
      comment: 'This tool completely transformed our fundraising strategy. The AI insights were spot-on and helped us secure our Series A funding.'
    },
    {
      id: 2,
      user: 'Emily Chen',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      rating: 4,
      date: '1 week ago',
      comment: 'Great tool for market analysis. The competitive insights were invaluable for our product positioning.'
    },
    {
      id: 3,
      user: 'Mike Johnson',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      rating: 5,
      date: '2 weeks ago',
      comment: 'The pitch deck generation feature saved us hours of work. Highly recommend for any startup fundraising.'
    }
  ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        className={i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
      />
    ));
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">What this tool does</h3>
              <p className="text-gray-700 leading-relaxed">
                {tool.description} This AI-powered solution helps startups navigate the complex world of fundraising 
                by providing personalized strategies, investor matching, and comprehensive financial modeling. 
                Whether you're preparing for your first seed round or planning a Series A, this tool provides 
                the insights and guidance you need to succeed.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="text-blue-600" size={20} />
                  </div>
                  <h4 className="font-semibold text-gray-900">Success Rate</h4>
                </div>
                <p className="text-3xl font-bold text-blue-600">87%</p>
                <p className="text-sm text-gray-600 mt-1">of users secured funding</p>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Clock className="text-green-600" size={20} />
                  </div>
                  <h4 className="font-semibold text-gray-900">Time Saved</h4>
                </div>
                <p className="text-3xl font-bold text-green-600">40hrs</p>
                <p className="text-sm text-gray-600 mt-1">average per project</p>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Users className="text-purple-600" size={20} />
                  </div>
                  <h4 className="font-semibold text-gray-900">Active Users</h4>
                </div>
                <p className="text-3xl font-bold text-purple-600">2.3k</p>
                <p className="text-sm text-gray-600 mt-1">monthly active users</p>
              </div>
            </div>
          </div>
        );

      case 'features':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tool.features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-xl p-6 border border-gray-200"
                  whileHover={{ y: -2, scale: 1.02 }}
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <CheckCircle className="text-green-500" size={20} />
                    <h4 className="font-semibold text-gray-900">{feature}</h4>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Advanced AI algorithms analyze your business data and market conditions to provide 
                    personalized recommendations and strategies.
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">How it works</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Input Your Data</h4>
                    <p className="text-gray-600 text-sm">Upload your business metrics, financials, and goals</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">AI Analysis</h4>
                    <p className="text-gray-600 text-sm">Our AI analyzes market trends and investor preferences</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Get Results</h4>
                    <p className="text-gray-600 text-sm">Receive personalized strategy and actionable insights</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'reviews':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">User Reviews</h3>
                <p className="text-gray-600">What others are saying about this tool</p>
              </div>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Write Review
              </button>
            </div>

            <div className="space-y-6">
              {reviews.map((review) => (
                <motion.div
                  key={review.id}
                  className="bg-white rounded-xl p-6 border border-gray-200"
                  whileHover={{ y: -2 }}
                >
                  <div className="flex items-start space-x-4">
                    <img
                      src={review.avatar}
                      alt={review.user}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-900">{review.user}</h4>
                        <span className="text-sm text-gray-500">{review.date}</span>
                      </div>
                      <div className="flex items-center space-x-1 mb-3">
                        {renderStars(review.rating)}
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );

      case 'creator':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-center space-x-4 mb-6">
                <img
                  src={tool.creatorAvatar}
                  alt={tool.creator}
                  className="w-20 h-20 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{tool.creator}</h3>
                  <p className="text-gray-600">AI Tool Creator & Startup Advisor</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <div className="flex items-center space-x-1">
                      <Award className="text-blue-500" size={16} />
                      <span className="text-sm text-gray-600">Verified Creator</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="text-green-500" size={16} />
                      <span className="text-sm text-gray-600">5 tools published</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">15.2k</p>
                  <p className="text-sm text-gray-600">Total Downloads</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">4.8</p>
                  <p className="text-sm text-gray-600">Average Rating</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-600">3</p>
                  <p className="text-sm text-gray-600">Years Experience</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
              <h4 className="font-semibold text-gray-900 mb-4">About the Creator</h4>
              <p className="text-gray-700 leading-relaxed">
                Sarah is a seasoned startup advisor with over 10 years of experience in fundraising, 
                business strategy, and AI implementation. She has helped over 200 startups secure 
                funding and scale their operations. Her expertise in financial modeling and investor 
                relations makes her tools highly valuable for the startup community.
              </p>
            </div>
          </div>
        );

      case 'pricing':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">{tool.price}</h3>
                <p className="text-gray-600">No setup fees • Cancel anytime</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <span className="font-medium text-gray-900">Unlimited Access</span>
                  <CheckCircle className="text-green-500" size={20} />
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <span className="font-medium text-gray-900">AI-Powered Insights</span>
                  <CheckCircle className="text-green-500" size={20} />
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <span className="font-medium text-gray-900">Priority Support</span>
                  <CheckCircle className="text-green-500" size={20} />
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <span className="font-medium text-gray-900">Regular Updates</span>
                  <CheckCircle className="text-green-500" size={20} />
                </div>
              </div>

              <motion.button
                className="w-full mt-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Get Started Now
              </motion.button>
            </div>
          </div>
        );

      default:
        return null;
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
          <div className="flex items-center space-x-4 mb-6">
            <motion.button
              onClick={onBack}
              className="p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ArrowLeft size={20} />
            </motion.button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{tool.name}</h1>
              <p className="text-gray-600">AI Tool • {tool.category}</p>
            </div>
          </div>

          {/* Tool Stats */}
          <div className="flex items-center justify-between bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Star className="text-yellow-400" size={20} />
                <span className="font-semibold">{tool.rating}</span>
                <span className="text-gray-600">({tool.reviews} reviews)</span>
              </div>
              <div className="flex items-center space-x-2">
                <Download className="text-blue-500" size={20} />
                <span className="font-semibold">{tool.downloads.toLocaleString()}</span>
                <span className="text-gray-600">downloads</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="text-green-500" size={20} />
                <span className="text-gray-600">Updated {tool.lastUpdated}</span>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <motion.button
                onClick={() => setIsLiked(!isLiked)}
                className={`p-2 rounded-lg transition-colors ${
                  isLiked ? 'text-red-500 bg-red-50' : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Heart size={20} className={isLiked ? 'fill-current' : ''} />
              </motion.button>
              <motion.button
                onClick={() => setShowShareModal(true)}
                className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Share2 size={20} />
              </motion.button>
              <motion.button
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Try Now
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex items-center space-x-1 bg-white rounded-xl shadow-sm border border-gray-200 p-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white shadow-sm'
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
        </motion.div>

        {/* Tab Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {renderTabContent()}
        </motion.div>
      </div>
    </div>
  );
};

export default ToolDetail; 