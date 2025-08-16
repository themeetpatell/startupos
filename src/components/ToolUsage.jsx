import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft,
  Send,
  Mic,
  MicOff,
  Brain,
  Sparkles,
  Zap,
  Download,
  Share2,
  Settings,
  Play,
  Pause,
  RotateCcw,
  Save,
  Copy,
  CheckCircle,
  AlertCircle,
  Clock,
  Star,
  MessageCircle,
  TrendingUp,
  BarChart3,
  Target,
  DollarSign,
  Users,
  Lightbulb
} from 'lucide-react';
import '../App.css';

const ToolUsage = ({ tool, onBack }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: `Hello! I'm your ${tool.name} assistant. I'm here to help you with ${tool.description.toLowerCase()}. What would you like to work on today?`,
      timestamp: new Date(),
      suggestions: tool.features?.slice(0, 4) || [
        "Get started with basic analysis",
        "Explore advanced features",
        "View examples and templates",
        "Learn best practices"
      ]
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentMode, setCurrentMode] = useState('chat');
  const messagesEndRef = useRef(null);

  const modes = [
    { id: 'chat', name: 'Chat', icon: MessageCircle, description: 'Interactive conversation' },
    { id: 'analysis', name: 'Analysis', icon: BarChart3, description: 'Data analysis mode' },
    { id: 'strategy', name: 'Strategy', icon: Target, description: 'Strategic planning' },
    { id: 'templates', name: 'Templates', icon: Lightbulb, description: 'Pre-built templates' }
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);
    setIsProcessing(true);

    // Simulate AI processing based on tool type
    setTimeout(() => {
      const aiResponse = generateToolResponse(inputMessage, tool.category);
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
      setIsProcessing(false);
    }, 2000);
  };

  const generateToolResponse = (userInput, category) => {
    const responses = {
      finance: {
        content: `Based on your input about "${userInput}", here's my financial analysis:\n\n💰 **Key Insights:**\n• Revenue projection: $2.4M (Year 1)\n• Break-even point: Month 14\n• Recommended funding: $500K seed round\n\n📊 **Next Steps:**\n1. Prepare detailed financial model\n2. Identify target investors\n3. Create compelling pitch deck\n\nWould you like me to help you with any of these areas?`,
        suggestions: ["Generate financial model", "Create pitch deck", "Find investors", "Calculate valuation"]
      },
      marketing: {
        content: `Marketing analysis for "${userInput}":\n\n🎯 **Target Audience:**\n• Primary: Tech-savvy professionals (25-40)\n• Secondary: Small business owners\n\n📈 **Growth Strategy:**\n• Content marketing: 40% of leads\n• Social media: 30% of leads\n• Partnerships: 20% of leads\n• Direct: 10% of leads\n\n🚀 **Recommended Actions:**\n1. Launch content calendar\n2. Set up social media campaigns\n3. Identify partnership opportunities`,
        suggestions: ["Create content calendar", "Design social campaigns", "Find partners", "Set up analytics"]
      },
      analytics: {
        content: `Analytics insights for "${userInput}":\n\n📊 **Key Metrics:**\n• Conversion rate: 3.2% (industry avg: 2.1%)\n• Customer acquisition cost: $45\n• Lifetime value: $1,200\n• Churn rate: 5.4%\n\n📈 **Trends:**\n• 23% month-over-month growth\n• Mobile usage up 40%\n• Peak usage: Tuesday 2-4 PM\n\n💡 **Recommendations:**\n1. Optimize mobile experience\n2. Focus on Tuesday promotions\n3. Reduce churn with onboarding improvements`,
        suggestions: ["Optimize mobile", "Tuesday campaigns", "Improve onboarding", "A/B test features"]
      },
      default: {
        content: `I understand you're looking for guidance on "${userInput}". As your AI assistant, I can help you with:\n\n• **Strategic Planning**: Business model, market analysis, competitive positioning\n• **Implementation**: Step-by-step guidance, best practices, templates\n• **Optimization**: Performance tracking, improvement suggestions\n• **Growth**: Scaling strategies, resource allocation\n\nWhat specific aspect would you like to focus on?`,
        suggestions: ["Strategic planning", "Implementation guide", "Performance tracking", "Growth strategies"]
      }
    };

    const responseKey = category || 'default';
    return {
      id: Date.now(),
      type: 'ai',
      content: responses[responseKey].content,
      timestamp: new Date(),
      suggestions: responses[responseKey].suggestions
    };
  };

  const handleSuggestionClick = (suggestion) => {
    setInputMessage(suggestion);
  };

  const handleModeChange = (modeId) => {
    setCurrentMode(modeId);
    // Reset messages for new mode
    setMessages([
      {
        id: Date.now(),
        type: 'ai',
        content: `Switched to ${modes.find(m => m.id === modeId)?.name} mode. How can I help you with ${tool.name}?`,
        timestamp: new Date(),
        suggestions: ["Get started", "View examples", "Learn more", "Customize settings"]
      }
    ]);
  };

  const getCategoryIcon = (category) => {
    const icons = {
      finance: DollarSign,
      marketing: Target,
      analytics: BarChart3,
      product: Lightbulb,
      operations: Users,
      default: Brain
    };
    return icons[category] || icons.default;
  };

  const CategoryIcon = getCategoryIcon(tool.category);

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
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <CategoryIcon className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{tool.name}</h1>
                <p className="text-gray-600">AI Tool • {tool.category}</p>
              </div>
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
                <Clock className="text-green-500" size={20} />
                <span className="text-gray-600">Updated {tool.lastUpdated}</span>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <motion.button
                className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Settings size={20} />
              </motion.button>
              <motion.button
                className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Share2 size={20} />
              </motion.button>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar - Modes */}
          <div className="lg:col-span-1 space-y-6">
            {/* Tool Modes */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <h3 className="font-semibold text-gray-900 mb-4">Tool Modes</h3>
              <div className="space-y-2">
                {modes.map((mode) => {
                  const Icon = mode.icon;
                  return (
                    <motion.button
                      key={mode.id}
                      onClick={() => handleModeChange(mode.id)}
                      className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all ${
                        currentMode === mode.id
                          ? 'bg-blue-50 text-blue-600 border border-blue-200'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Icon size={18} />
                      <div className="text-left">
                        <span className="font-medium">{mode.name}</span>
                        <p className="text-xs text-gray-500">{mode.description}</p>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>

            {/* Tool Features */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <h3 className="font-semibold text-gray-900 mb-4">Features</h3>
              <div className="space-y-3">
                {tool.features?.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <CheckCircle className="text-green-500" size={16} />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <motion.button
                  className="w-full flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Play className="text-blue-600" size={18} />
                  <span className="text-sm font-medium">Run Analysis</span>
                </motion.button>
                <motion.button
                  className="w-full flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Save className="text-green-600" size={18} />
                  <span className="text-sm font-medium">Save Results</span>
                </motion.button>
                <motion.button
                  className="w-full flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Download className="text-purple-600" size={18} />
                  <span className="text-sm font-medium">Export Data</span>
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* Main Chat Area */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 h-[600px] flex flex-col"
            >
              {/* Chat Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 startupos-gradient rounded-full flex items-center justify-center">
                      <Sparkles className="text-white" size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{tool.name} Assistant</h3>
                      <p className="text-sm text-gray-600">
                        {isProcessing ? 'Processing...' : 'Online • Ready to help'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">Powered by</span>
                    <Zap size={16} className="text-yellow-500" />
                    <span className="text-sm font-medium text-gray-700">Advanced AI</span>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                <AnimatePresence>
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-3xl ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                        <div className={`p-4 rounded-2xl ${
                          message.type === 'user'
                            ? 'bg-blue-600 text-white ml-12'
                            : 'bg-gray-50 text-gray-900 mr-12'
                        }`}>
                          <p className="whitespace-pre-wrap">{message.content}</p>
                          <div className="flex items-center justify-between mt-2">
                            <span className={`text-xs ${
                              message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                            }`}>
                              {message.timestamp.toLocaleTimeString()}
                            </span>
                          </div>
                        </div>
                        
                        {/* AI Suggestions */}
                        {message.type === 'ai' && message.suggestions && (
                          <div className="mt-3 space-y-2">
                            {message.suggestions.map((suggestion, index) => (
                              <motion.button
                                key={index}
                                onClick={() => handleSuggestionClick(suggestion)}
                                className="block w-full text-left p-2 text-sm text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                              >
                                {suggestion}
                              </motion.button>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Typing Indicator */}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="bg-gray-50 p-4 rounded-2xl mr-12">
                      <div className="flex items-center space-x-2">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                        <span className="text-sm text-gray-500">AI is thinking...</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-6 border-t border-gray-200">
                <div className="flex items-end space-x-3">
                  <div className="flex-1">
                    <div className="relative">
                      <textarea
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage();
                          }
                        }}
                        placeholder={`Ask me anything about ${tool.name.toLowerCase()}...`}
                        className="w-full p-4 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                        rows="2"
                      />
                      <button
                        onClick={() => setIsListening(!isListening)}
                        className={`absolute right-3 top-3 p-2 rounded-lg transition-colors ${
                          isListening ? 'text-red-600 bg-red-50' : 'text-gray-400 hover:text-gray-600'
                        }`}
                      >
                        {isListening ? <MicOff size={20} /> : <Mic size={20} />}
                      </button>
                    </div>
                  </div>
                  <motion.button
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim() || isProcessing}
                    className="p-4 startupos-gradient text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Send size={20} />
                  </motion.button>
                </div>
                <p className="text-xs text-gray-500 mt-2 text-center">
                  Press Enter to send, Shift+Enter for new line. AI responses are generated for demonstration.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolUsage; 