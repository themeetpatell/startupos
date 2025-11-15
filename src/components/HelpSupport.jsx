import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HelpCircle, 
  Search, 
  MessageCircle, 
  Phone, 
  Mail, 
  BookOpen, 
  Video, 
  FileText, 
  ExternalLink, 
  ChevronRight, 
  ChevronDown,
  Star,
  Clock,
  CheckCircle,
  AlertCircle,
  Users,
  Settings,
  Zap,
  Shield,
  Globe,
  Download,
  Send,
  ThumbsUp,
  ThumbsDown,
  Plus,
  Edit,
  Trash2,
  Filter,
  SortAsc,
  SortDesc
} from 'lucide-react';

const HelpSupport = () => {
  const [activeTab, setActiveTab] = useState('help');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [showContactForm, setShowContactForm] = useState(false);

  const [faqs, setFaqs] = useState([
    {
      id: 1,
      category: 'Getting Started',
      question: 'How do I set up my first project?',
      answer: 'To set up your first project, navigate to the WorkHub section and click "Create Project". Fill in the project details including name, description, and team members. You can also choose from our pre-built templates to get started quickly.',
      helpful: 24,
      notHelpful: 2
    },
    {
      id: 2,
      category: 'Getting Started',
      question: 'How do I invite team members?',
      answer: 'You can invite team members by going to the Team section in WorkHub. Click "Add Member" and enter their email address. They will receive an invitation email with instructions to join your workspace.',
      helpful: 18,
      notHelpful: 1
    },
    {
      id: 3,
      category: 'Billing',
      question: 'How do I update my payment method?',
      answer: 'To update your payment method, go to the Billing section and click on "Update Payment Method". You can add a new card, update billing information, or change your subscription plan.',
      helpful: 15,
      notHelpful: 0
    },
    {
      id: 4,
      category: 'Technical',
      question: 'What browsers are supported?',
      answer: 'StartupOS supports all modern browsers including Chrome, Firefox, Safari, and Edge. We recommend using the latest version of your preferred browser for the best experience.',
      helpful: 12,
      notHelpful: 1
    },
    {
      id: 5,
      category: 'Technical',
      question: 'How do I export my data?',
      answer: 'You can export your data by going to Settings > Data & Privacy > Export Data. This will generate a ZIP file containing all your projects, team data, and resources. The export process may take a few minutes for large datasets.',
      helpful: 8,
      notHelpful: 0
    },
    {
      id: 6,
      category: 'Account',
      question: 'How do I change my password?',
      answer: 'To change your password, go to your Profile settings and click on "Security". Enter your current password and then your new password. Make sure to use a strong password with at least 8 characters.',
      helpful: 20,
      notHelpful: 1
    }
  ]);

  const [articles, setArticles] = useState([
    {
      id: 1,
      title: 'Complete Guide to Project Management',
      category: 'Project Management',
      readTime: '8 min read',
      lastUpdated: '2024-01-15',
      description: 'Learn how to effectively manage projects using StartupOS features including task tracking, team collaboration, and progress monitoring.',
      helpful: 156,
      tags: ['project', 'management', 'collaboration']
    },
    {
      id: 2,
      title: 'Setting Up Team Workflows',
      category: 'Team Management',
      readTime: '5 min read',
      lastUpdated: '2024-01-10',
      description: 'Discover best practices for setting up efficient team workflows and communication channels within your startup.',
      helpful: 89,
      tags: ['team', 'workflow', 'communication']
    },
    {
      id: 3,
      title: 'Analytics and Reporting Guide',
      category: 'Analytics',
      readTime: '6 min read',
      lastUpdated: '2024-01-08',
      description: 'Understand how to use analytics and reporting features to track your startup\'s performance and make data-driven decisions.',
      helpful: 67,
      tags: ['analytics', 'reporting', 'metrics']
    },
    {
      id: 4,
      title: 'API Integration Tutorial',
      category: 'Technical',
      readTime: '12 min read',
      lastUpdated: '2024-01-05',
      description: 'Step-by-step guide to integrating StartupOS with your existing tools and systems using our comprehensive API.',
      helpful: 45,
      tags: ['api', 'integration', 'technical']
    }
  ]);

  const categories = ['all', 'Getting Started', 'Billing', 'Technical', 'Account', 'Project Management', 'Team Management', 'Analytics'];

  const tabs = [
    { id: 'help', label: 'Help Center', icon: HelpCircle },
    { id: 'articles', label: 'Knowledge Base', icon: BookOpen },
    { id: 'contact', label: 'Contact Us', icon: Phone }
  ];

  const filteredFaqs = faqs.filter(faq => 
    (selectedCategory === 'all' || faq.category === selectedCategory) &&
    (searchQuery === '' || 
     faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
     faq.answer.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const filteredArticles = articles.filter(article =>
    (selectedCategory === 'all' || article.category === selectedCategory) &&
    (searchQuery === '' ||
     article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
     article.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const renderHelp = () => (
    <div className="space-y-8">
      {/* Search */}
      <div className="bg-white rounded-2xl border border-gray-200 p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">How can we help you?</h2>
          <p className="text-gray-600 text-lg">Search our knowledge base or browse common questions</p>
        </div>
        
        <div className="relative max-w-2xl mx-auto">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search for help articles, FAQs, or topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
          />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="bg-white rounded-xl border border-gray-200 p-6 text-left hover:shadow-lg transition-all duration-300"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <MessageCircle className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold">Contact Support</h3>
          </div>
          <p className="text-gray-600 text-sm">Get help from our support team via chat, email, or phone</p>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="bg-white rounded-xl border border-gray-200 p-6 text-left hover:shadow-lg transition-all duration-300"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-white rounded-lg">
              <Video className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold">Video Tutorials</h3>
          </div>
          <p className="text-gray-600 text-sm">Watch step-by-step video guides for all features</p>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="bg-white rounded-xl border border-gray-200 p-6 text-left hover:shadow-lg transition-all duration-300"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-white rounded-lg">
              <BookOpen className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold">Documentation</h3>
          </div>
          <p className="text-gray-600 text-sm">Browse our comprehensive documentation and guides</p>
        </motion.button>
      </div>

      {/* Categories */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Browse by Category</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* FAQs */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Frequently Asked Questions</h3>
        <div className="space-y-4">
          {filteredFaqs.map((faq) => (
            <div key={faq.id} className="border border-gray-200 rounded-lg">
              <button
                onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div>
                  <h4 className="font-medium text-gray-900">{faq.question}</h4>
                  <p className="text-sm text-gray-500 mt-1">{faq.category}</p>
                </div>
                {expandedFaq === faq.id ? (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                )}
              </button>
              
              <AnimatePresence>
                {expandedFaq === faq.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="px-6 pb-4"
                  >
                    <p className="text-gray-700 mb-4">{faq.answer}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <ThumbsUp className="w-4 h-4" />
                        <span>{faq.helpful} helpful</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <ThumbsDown className="w-4 h-4" />
                        <span>{faq.notHelpful} not helpful</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderArticles = () => (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Knowledge Base</h2>
        <div className="flex items-center space-x-4">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.map((article) => (
          <motion.div
            key={article.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 cursor-pointer"
          >
            <div className="flex items-start justify-between mb-4">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                {article.category}
              </span>
              <span className="text-sm text-gray-500">{article.readTime}</span>
            </div>
            
            <h3 className="text-lg font-bold text-gray-900 mb-3">{article.title}</h3>
            <p className="text-gray-600 text-sm mb-4">{article.description}</p>
            
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>Updated {new Date(article.lastUpdated).toLocaleDateString()}</span>
              <div className="flex items-center space-x-1">
                <ThumbsUp className="w-4 h-4" />
                <span>{article.helpful}</span>
              </div>
            </div>
            
            <div className="mt-4 flex flex-wrap gap-2">
              {article.tags.map((tag, index) => (
                <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderContact = () => (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Contact Support</h2>
        <p className="text-gray-600 text-lg">Get in touch with our support team</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white rounded-2xl border border-gray-200 p-8 text-center hover:shadow-lg transition-all duration-300"
        >
          <div className="p-4 bg-blue-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <MessageCircle className="w-8 h-8 text-blue-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Live Chat</h3>
          <p className="text-gray-600 mb-4">Get instant help from our support team</p>
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Start Chat
          </button>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white rounded-2xl border border-gray-200 p-8 text-center hover:shadow-lg transition-all duration-300"
        >
          <div className="p-4 bg-white rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <Mail className="w-8 h-8 text-blue-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Email Support</h3>
          <p className="text-gray-600 mb-4">Send us an email and we'll respond within 24 hours</p>
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-600 transition-colors">
            Send Email
          </button>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white rounded-2xl border border-gray-200 p-8 text-center hover:shadow-lg transition-all duration-300"
        >
          <div className="p-4 bg-white rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <Phone className="w-8 h-8 text-blue-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Phone Support</h3>
          <p className="text-gray-600 mb-4">Call us for urgent issues and complex problems</p>
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-600 transition-colors">
            Call Now
          </button>
        </motion.div>
      </div>

      {/* Contact Form */}
      <div className="bg-white rounded-2xl border border-gray-200 p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Send us a message</h3>
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
            <input
              type="text"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Brief description of your issue"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
            <textarea
              rows={6}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Please provide as much detail as possible about your issue or question"
            />
          </div>
          
          <div className="flex justify-end">
            <button
              type="submit"
              className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Send className="w-5 h-5" />
              <span>Send Message</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'help': return renderHelp();
      case 'articles': return renderArticles();
      case 'contact': return renderContact();
      default: return renderHelp();
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Tabs */}
        <div className="flex space-x-1 bg-white rounded-2xl border border-gray-200 p-2 mb-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-xl transition-all duration-300 ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content */}
        {renderTabContent()}
      </div>
    </div>
  );
};

export default HelpSupport;
