import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, 
  Send, 
  Mic, 
  MicOff, 
  Sparkles, 
  TrendingUp, 
  DollarSign, 
  Users, 
  Target,
  Lightbulb,
  AlertCircle,
  CheckCircle,
  Clock,
  ArrowRight,
  BarChart3,
  FileText,
  Zap
} from 'lucide-react';
import '../App.css';

const AICopilot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: "Hello! I'm your AI Copilot. I'm here to help you navigate every aspect of your startup journey. What would you like to work on today?",
      timestamp: new Date(),
      suggestions: [
        "Help me create a fundraising strategy",
        "Review my business model",
        "Analyze market opportunities",
        "Optimize our hiring process"
      ]
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [selectedCopilot, setSelectedCopilot] = useState('general');
  const messagesEndRef = useRef(null);

  const copilotTypes = [
    { id: 'general', name: 'General', icon: Brain, color: 'blue' },
    { id: 'finance', name: 'Finance', icon: DollarSign, color: 'green' },
    { id: 'marketing', name: 'Marketing', icon: Target, color: 'purple' },
    { id: 'operations', name: 'Operations', icon: Users, color: 'orange' },
    { id: 'product', name: 'Product', icon: Lightbulb, color: 'yellow' },
  ];

  const quickActions = [
    { id: 'funding', title: 'Funding Strategy', description: 'Get personalized fundraising guidance', icon: TrendingUp },
    { id: 'market', title: 'Market Analysis', description: 'Analyze your target market and competition', icon: BarChart3 },
    { id: 'hiring', title: 'Hiring Plan', description: 'Create strategic hiring roadmap', icon: Users },
    { id: 'metrics', title: 'Key Metrics', description: 'Define and track important KPIs', icon: Target },
  ];

  const insights = [
    {
      id: 1,
      type: 'opportunity',
      title: 'Funding Opportunity',
      description: 'Based on your metrics, you might be ready for Series A',
      priority: 'high',
      action: 'Review funding readiness'
    },
    {
      id: 2,
      type: 'warning',
      title: 'Burn Rate Alert',
      description: 'Current burn rate suggests 8 months runway remaining',
      priority: 'medium',
      action: 'Optimize expenses'
    },
    {
      id: 3,
      type: 'suggestion',
      title: 'Hiring Recommendation',
      description: 'Consider hiring a senior developer based on workload analysis',
      priority: 'low',
      action: 'View candidates'
    }
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

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputMessage);
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (userInput) => {
    const responses = {
      funding: {
        content: "Based on your current metrics and growth trajectory, here's a comprehensive fundraising strategy:\n\n1. **Timing**: Your 40% month-over-month growth and $50K MRR suggest you're ready for Series A\n2. **Amount**: Target $3-5M based on 18-month runway and growth plans\n3. **Investors**: Focus on VCs with SaaS experience in your vertical\n4. **Preparation**: Update your pitch deck, financial model, and data room\n\nWould you like me to help you prepare any of these materials?",
        suggestions: ["Create pitch deck outline", "Build financial model", "Research target investors", "Prepare data room checklist"]
      },
      market: {
        content: "I've analyzed your market positioning and here are key insights:\n\n**Market Size**: Your TAM is $12B with 15% CAGR\n**Competition**: 3 direct competitors, but you have unique AI advantage\n**Opportunity**: Underserved SMB segment with 60% market gap\n**Positioning**: Focus on 'AI-first' messaging to differentiate\n\nRecommended next steps to capture market share:",
        suggestions: ["Develop competitive analysis", "Create market entry strategy", "Design customer acquisition plan", "Build brand positioning"]
      },
      default: {
        content: "I understand you're looking for guidance. As your AI Copilot, I can help you with:\n\n• **Strategic Planning**: Business model, market analysis, competitive positioning\n• **Financial Management**: Fundraising, budgeting, financial modeling\n• **Operations**: Hiring, processes, process optimization\n• **Growth**: Marketing strategies, customer acquisition, scaling\n\nWhat specific area would you like to focus on?",
        suggestions: ["Strategic planning help", "Financial guidance", "Operations optimization", "Growth strategies"]
      }
    };

    const responseKey = userInput.toLowerCase().includes('fund') ? 'funding' :
                      userInput.toLowerCase().includes('market') ? 'market' : 'default';

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

  const handleQuickAction = (action) => {
    const actionMessages = {
      funding: "Help me create a comprehensive fundraising strategy for my startup",
      market: "I need a detailed market analysis for my business",
      hiring: "Create a strategic hiring plan for the next 6 months",
      metrics: "Help me define and track the most important KPIs for my startup"
    };
    
    setInputMessage(actionMessages[action.id]);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-blue-600 bg-blue-50 border-blue-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getPriorityIcon = (type) => {
    switch (type) {
      case 'opportunity': return <TrendingUp size={16} />;
      case 'warning': return <AlertCircle size={16} />;
      case 'suggestion': return <Lightbulb size={16} />;
      default: return <CheckCircle size={16} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 startupos-gradient rounded-xl flex items-center justify-center">
              <Brain className="text-white" size={24} />
            </div>
            <h1 className="text-3xl font-bold startupos-gradient-text">AI Copilot</h1>
          </div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Your intelligent business advisor powered by advanced AI. Get personalized guidance, strategic insights, and actionable recommendations.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar - Copilot Types & Quick Actions */}
          <div className="lg:col-span-1 space-y-6">
            {/* Copilot Types */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <h3 className="font-semibold text-gray-900 mb-4">Specialized Copilots</h3>
              <div className="space-y-2">
                {copilotTypes.map((copilot) => {
                  const Icon = copilot.icon;
                  return (
                    <motion.button
                      key={copilot.id}
                      onClick={() => setSelectedCopilot(copilot.id)}
                      className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all ${
                        selectedCopilot === copilot.id
                          ? 'bg-blue-50 text-blue-600 border border-blue-200'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Icon size={18} />
                      <span className="font-medium">{copilot.name}</span>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                {quickActions.map((action) => {
                  const Icon = action.icon;
                  return (
                    <motion.button
                      key={action.id}
                      onClick={() => handleQuickAction(action)}
                      className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all group"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-start space-x-3">
                        <Icon size={18} className="text-gray-600 group-hover:text-blue-600 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-gray-900 group-hover:text-blue-600">{action.title}</h4>
                          <p className="text-sm text-gray-600 mt-1">{action.description}</p>
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>

            {/* AI Insights */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <h3 className="font-semibold text-gray-900 mb-4">AI Insights</h3>
              <div className="space-y-3">
                {insights.map((insight) => (
                  <motion.div
                    key={insight.id}
                    className={`p-3 rounded-lg border ${getPriorityColor(insight.priority)}`}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-start space-x-2">
                      {getPriorityIcon(insight.type)}
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{insight.title}</h4>
                        <p className="text-xs mt-1 opacity-80">{insight.description}</p>
                        <button className="text-xs font-medium mt-2 flex items-center space-x-1 hover:underline">
                          <span>{insight.action}</span>
                          <ArrowRight size={12} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
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
                      <h3 className="font-semibold text-gray-900">AI Copilot Assistant</h3>
                      <p className="text-sm text-gray-600">Online • Ready to help</p>
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
                        placeholder="Ask me anything about your startup..."
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
                    disabled={!inputMessage.trim()}
                    className="p-4 startupos-gradient text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Send size={20} />
                  </motion.button>
                </div>
                <p className="text-xs text-gray-500 mt-2 text-center">
                  AI responses are generated for demonstration. Press Enter to send, Shift+Enter for new line.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AICopilot;

