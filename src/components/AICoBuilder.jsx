import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Plus, 
  Star, 
  DollarSign, 
  Users, 
  Brain,
  CheckCircle,
  Play,
  Bookmark,
  X,
  Clock
} from 'lucide-react';
import '../App.css';

const AICoBuilder = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showHireModal, setShowHireModal] = useState(false);
  const [hiredEmployees, setHiredEmployees] = useState([]);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);
  const [currentTask, setCurrentTask] = useState('');
  const [currentMessage, setCurrentMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [taskHistory, setTaskHistory] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const categories = [
    { id: 'all', name: 'All AI Employees', count: 6 },
    { id: 'Finance', name: 'Finance', count: 1 },
    { id: 'Marketing', name: 'Marketing', count: 1 },
    { id: 'HR', name: 'HR', count: 1 },
    { id: 'Product', name: 'Product', count: 1 },
    { id: 'Legal', name: 'Legal', count: 1 },
    { id: 'Sales', name: 'Sales', count: 1 }
  ];

  const marketplaceEmployees = [
    {
      id: 1,
      name: 'Alex - Finance AI',
      role: 'Financial Analyst',
      department: 'Finance',
      description: 'AI-powered financial analyst specializing in startup funding and financial modeling',
      rating: 4.8,
      reviews: 127,
      tasksCompleted: 2340,
      hourlyRate: 45,
      skills: ['Financial Modeling', 'Fundraising', 'Valuation Analysis'],
      lastActive: '2 hours ago',
      isVerified: true,
      isFeatured: true,
      isNew: false,
      availability: '24/7'
    },
    {
      id: 2,
      name: 'Maya - Marketing AI',
      role: 'Marketing Specialist',
      department: 'Marketing',
      description: 'AI marketing specialist with expertise in content creation and campaign optimization',
      rating: 4.9,
      reviews: 89,
      tasksCompleted: 1890,
      hourlyRate: 35,
      skills: ['Content Creation', 'Social Media', 'Campaign Management'],
      lastActive: '30 minutes ago',
      isVerified: true,
      isFeatured: false,
      isNew: true,
      availability: 'Business hours'
    },
    {
      id: 3,
      name: 'Jordan - HR AI',
      role: 'HR Specialist',
      department: 'HR',
      description: 'AI HR specialist specializing in recruitment and candidate screening',
      rating: 4.7,
      reviews: 156,
      tasksCompleted: 3120,
      hourlyRate: 30,
      skills: ['Recruitment', 'Candidate Screening', 'Interview Coordination'],
      lastActive: '1 hour ago',
      isVerified: true,
      isFeatured: true,
      isNew: false,
      availability: '24/7'
    },
    {
      id: 4,
      name: 'Sam - Product AI',
      role: 'Product Manager',
      department: 'Product',
      description: 'AI product manager specializing in feature prioritization and user research',
      rating: 4.6,
      reviews: 203,
      tasksCompleted: 4560,
      hourlyRate: 40,
      skills: ['Product Strategy', 'User Research', 'Feature Prioritization'],
      lastActive: '2 hours ago',
      isVerified: false,
      isFeatured: false,
      isNew: false,
      availability: 'Business hours'
    },
    {
      id: 5,
      name: 'Emma - Legal AI',
      role: 'Legal Assistant',
      department: 'Legal',
      description: 'AI legal assistant specializing in contract review and compliance',
      rating: 4.9,
      reviews: 67,
      tasksCompleted: 890,
      hourlyRate: 55,
      skills: ['Contract Review', 'Compliance', 'Legal Research'],
      lastActive: '4 hours ago',
      isVerified: true,
      isFeatured: false,
      isNew: false,
      availability: 'Business hours'
    },
    {
      id: 6,
      name: 'Ryan - Sales AI',
      role: 'Sales Representative',
      department: 'Sales',
      description: 'AI sales rep specializing in lead generation and customer outreach',
      rating: 4.8,
      reviews: 134,
      tasksCompleted: 2780,
      hourlyRate: 30,
      skills: ['Lead Generation', 'Customer Outreach', 'Sales Analytics'],
      lastActive: '1 hour ago',
      isVerified: true,
      isFeatured: true,
      isNew: false,
      availability: '24/7'
    }
  ];

  const filteredEmployees = marketplaceEmployees.filter(employee => {
    const matchesCategory = selectedCategory === 'all' || employee.department === selectedCategory;
    const matchesSearch = employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         employee.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         employee.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleHireEmployee = (employee) => {
    setHiredEmployees(prev => [...prev, { ...employee, hiredAt: new Date().toISOString() }]);
    setShowHireModal(false);
    setSelectedEmployee(null);
    alert(`Successfully hired ${employee.name}! They're now available in your team.`);
  };

  const handleUseEmployee = (employee) => {
    // Create a more realistic AI interaction experience
    const aiResponse = generateAIResponse(employee);
    
    // Show AI interaction modal
    setSelectedEmployee({ ...employee, aiResponse, isActive: true });
  };

  const handleStartConversation = () => {
    setShowChatModal(true);
    setChatHistory([{
      id: 1,
      type: 'ai',
      message: selectedEmployee.aiResponse.greeting,
      timestamp: new Date().toISOString()
    }]);
  };

  const handleGiveTask = () => {
    setShowTaskModal(true);
  };

  const handleSendMessage = async () => {
    if (!currentMessage.trim()) return;
    
    const userMessage = {
      id: Date.now(),
      type: 'user',
      message: currentMessage,
      timestamp: new Date().toISOString()
    };
    
    setChatHistory(prev => [...prev, userMessage]);
    setCurrentMessage('');
    setIsProcessing(true);
    
    // Simulate AI processing
    setTimeout(() => {
      const aiResponse = generateChatResponse(currentMessage, selectedEmployee);
      const aiMessage = {
        id: Date.now() + 1,
        type: 'ai',
        message: aiResponse,
        timestamp: new Date().toISOString()
      };
      
      setChatHistory(prev => [...prev, aiMessage]);
      setIsProcessing(false);
    }, 1500);
  };

  const handleSubmitTask = async () => {
    if (!currentTask.trim()) return;
    
    const task = {
      id: Date.now(),
      task: currentTask,
      status: 'processing',
      employee: selectedEmployee.name,
      department: selectedEmployee.department,
      timestamp: new Date().toISOString()
    };
    
    setTaskHistory(prev => [...prev, task]);
    setCurrentTask('');
    setIsProcessing(true);
    
    // Simulate task processing
    setTimeout(() => {
      const result = generateTaskResult(currentTask, selectedEmployee);
      setTaskHistory(prev => prev.map(t => 
        t.id === task.id 
          ? { ...t, status: 'completed', result }
          : t
      ));
      setIsProcessing(false);
    }, 3000);
  };

  const generateChatResponse = (message, employee) => {
    const responses = {
      'Finance': [
        "Based on your question, I'd recommend analyzing your current burn rate first. Let me help you create a financial model for this scenario.",
        "That's a great question about fundraising. Based on your stage, I suggest preparing a detailed pitch deck with clear financial projections.",
        "For valuation analysis, I'll need to look at your revenue growth, market size, and comparable companies. Let me create a comprehensive analysis.",
        "I can help you optimize your financial structure. Let me generate some recommendations based on industry best practices."
      ],
      'Marketing': [
        "I'll help you create a comprehensive marketing strategy. Let me analyze your target audience and develop a campaign plan.",
        "For content creation, I suggest focusing on your unique value proposition. Let me draft some engaging content ideas.",
        "Social media strategy is crucial. I'll create a content calendar and engagement plan tailored to your audience.",
        "Let me analyze your current marketing performance and suggest improvements for better ROI."
      ],
      'HR': [
        "I'll help you streamline your recruitment process. Let me create a structured approach for finding the right candidates.",
        "For team management, I suggest implementing regular performance reviews and clear communication channels.",
        "I can help you develop an effective onboarding program that will improve employee retention.",
        "Let me create a comprehensive HR policy framework tailored to your startup's needs."
      ],
      'Product': [
        "I'll help you prioritize features based on user feedback and market demand. Let me create a data-driven roadmap.",
        "For user research, I suggest conducting surveys and interviews to understand your target audience better.",
        "I can help you develop user personas and journey maps to improve your product experience.",
        "Let me analyze your product metrics and suggest improvements for better user engagement."
      ],
      'Legal': [
        "I'll review your legal requirements and ensure compliance. Let me create a comprehensive legal framework.",
        "For contract review, I'll identify potential risks and suggest necessary modifications.",
        "I can help you draft essential legal documents and policies for your startup.",
        "Let me conduct a legal audit and provide recommendations for risk mitigation."
      ],
      'Sales': [
        "I'll help you develop a sales strategy and identify high-value prospects. Let me create a targeted approach.",
        "For lead generation, I suggest implementing a multi-channel approach with personalized outreach.",
        "I can help you optimize your sales funnel and improve conversion rates.",
        "Let me analyze your sales data and suggest strategies for revenue growth."
      ]
    };
    
    const departmentResponses = responses[employee.department] || responses['Finance'];
    return departmentResponses[Math.floor(Math.random() * departmentResponses.length)];
  };

  const generateTaskResult = (task, employee) => {
    const results = {
      'Finance': [
        "✅ Financial model created with 3-year projections\n📊 Revenue forecast: $2.5M by year 3\n💰 Break-even analysis: Month 18\n📈 Growth assumptions documented\n\nI've prepared a comprehensive financial model that includes P&L, cash flow, and balance sheet projections. The model shows your path to profitability and key financial milestones.",
        "✅ Fundraising deck prepared\n📋 15-slide presentation ready\n💰 Valuation range: $15-25M\n📊 Key metrics highlighted\n\nYour fundraising deck is ready with compelling financial projections, market analysis, and growth strategy. I've highlighted the key metrics investors care about most.",
        "✅ Burn rate analysis completed\n📊 Current burn: $45K/month\n⏰ Runway: 14 months\n💡 Cost optimization recommendations\n\nI've analyzed your current burn rate and identified opportunities to extend your runway. The analysis includes recommendations for cost optimization and revenue acceleration."
      ],
      'Marketing': [
        "✅ Content calendar created\n📅 30-day content plan ready\n📱 Multi-platform strategy\n📊 Engagement metrics tracked\n\nI've created a comprehensive content calendar with engaging posts for all your social media platforms. Each piece is designed to drive engagement and conversions.",
        "✅ Ad copy generated\n🎯 10 variations created\n📊 A/B testing setup\n💰 Budget recommendations\n\nI've written compelling ad copy for your product launch. The copy is optimized for different platforms and includes A/B testing variations to maximize performance.",
        "✅ Competitor analysis completed\n📊 5 key competitors analyzed\n💡 Competitive advantages identified\n📈 Market positioning strategy\n\nI've conducted a thorough competitor analysis and identified your unique positioning opportunities. The report includes actionable insights for market differentiation."
      ],
      'HR': [
        "✅ Job description created\n📋 Detailed requirements listed\n🎯 Skills matrix developed\n📊 Salary benchmarking included\n\nI've created a comprehensive job description for your Software Engineer position. It includes detailed requirements, skills matrix, and competitive salary benchmarking.",
        "✅ Interview questions prepared\n❓ 20 behavioral questions\n🎯 Technical assessment included\n📊 Evaluation criteria defined\n\nI've prepared a structured interview process with behavioral and technical questions. The evaluation criteria will help you identify the best candidates objectively.",
        "✅ Remote work policy drafted\n📋 Comprehensive guidelines\n⚖️ Legal compliance ensured\n📊 Performance metrics defined\n\nI've created a comprehensive remote work policy that ensures legal compliance and sets clear expectations for your distributed team."
      ],
      'Product': [
        "✅ Product roadmap created\n📅 Q2 roadmap with 12 features\n🎯 User stories prioritized\n📊 Resource allocation planned\n\nI've created a detailed product roadmap for Q2 with prioritized features based on user feedback and business impact. Each feature includes user stories and resource requirements.",
        "✅ User feedback analyzed\n📊 500+ responses processed\n💡 Key insights identified\n📈 Action items prioritized\n\nI've analyzed your user feedback and identified the most critical issues and opportunities. The analysis includes prioritized action items for immediate implementation.",
        "✅ User personas created\n👥 3 detailed personas developed\n🎯 Journey maps included\n📊 Targeting recommendations\n\nI've created detailed user personas based on your target audience research. Each persona includes journey maps and specific targeting recommendations for your product."
      ],
      'Legal': [
        "✅ Contract reviewed\n📋 Risk assessment completed\n⚖️ Compliance issues identified\n💡 Recommendations provided\n\nI've thoroughly reviewed your vendor contract and identified potential risks and compliance issues. The report includes specific recommendations for contract modifications.",
        "✅ Terms of Service drafted\n📋 Comprehensive terms created\n⚖️ Legal compliance ensured\n🛡️ Liability protections included\n\nI've drafted comprehensive Terms of Service for your app that ensure legal compliance and protect your business interests. The document covers all essential legal requirements.",
        "✅ Legal audit completed\n📊 Compliance status assessed\n⚖️ Risk areas identified\n💡 Action plan provided\n\nI've conducted a comprehensive legal audit of your startup and identified areas that need attention. The report includes a prioritized action plan for legal compliance."
      ],
      'Sales': [
        "✅ Lead generation completed\n📊 100 qualified leads identified\n🎯 Contact information verified\n📈 Quality score: 8.5/10\n\nI've generated 100 high-quality leads for your product. Each lead has been verified and scored based on fit and likelihood to convert. Contact information is ready for outreach.",
        "✅ Email sequences created\n📧 5-sequence campaign ready\n🎯 Personalization included\n📊 A/B testing setup\n\nI've created personalized email sequences for your cold outreach campaign. Each sequence is tailored to different prospect segments with A/B testing variations.",
        "✅ Sales funnel optimized\n📊 Conversion rates improved\n💡 Bottlenecks identified\n📈 Revenue projections updated\n\nI've analyzed your sales funnel and identified optimization opportunities. The improvements are projected to increase conversion rates by 25% and revenue by $150K."
      ]
    };
    
    const departmentResults = results[employee.department] || results['Finance'];
    return departmentResults[Math.floor(Math.random() * departmentResults.length)];
  };

  const generateAIResponse = (employee) => {
    const responses = {
      'Finance': {
        greeting: `Hello! I'm ${employee.name}, your AI Financial Analyst. I'm here to help with financial modeling, fundraising strategies, and valuation analysis.`,
        capabilities: [
          "Analyze your financial statements and provide insights",
          "Create financial models for different scenarios",
          "Help with fundraising pitch preparation",
          "Provide market valuation estimates",
          "Generate financial reports and dashboards"
        ],
        sampleTasks: [
          "Create a 3-year financial projection for your startup",
          "Analyze your burn rate and runway",
          "Prepare a Series A fundraising deck",
          "Evaluate different funding options"
        ]
      },
      'Marketing': {
        greeting: `Hi there! I'm ${employee.name}, your AI Marketing Specialist. I specialize in content creation, campaign optimization, and social media strategy.`,
        capabilities: [
          "Create engaging content for all platforms",
          "Develop marketing campaign strategies",
          "Analyze social media performance",
          "Generate SEO-optimized content",
          "Design email marketing campaigns"
        ],
        sampleTasks: [
          "Create a 30-day content calendar",
          "Write compelling ad copy for your product",
          "Analyze competitor marketing strategies",
          "Develop a social media growth plan"
        ]
      },
      'HR': {
        greeting: `Hello! I'm ${employee.name}, your AI HR Specialist. I can help with recruitment, candidate screening, and team management.`,
        capabilities: [
          "Screen and evaluate job candidates",
          "Create job descriptions and requirements",
          "Conduct initial candidate interviews",
          "Develop team performance metrics",
          "Create employee onboarding programs"
        ],
        sampleTasks: [
          "Screen resumes for a Software Engineer position",
          "Create interview questions for a Product Manager role",
          "Develop a remote work policy",
          "Analyze team performance data"
        ]
      },
      'Product': {
        greeting: `Hey! I'm ${employee.name}, your AI Product Manager. I focus on product strategy, user research, and feature prioritization.`,
        capabilities: [
          "Conduct user research and analysis",
          "Create product roadmaps and strategies",
          "Prioritize features based on data",
          "Analyze user feedback and metrics",
          "Develop go-to-market strategies"
        ],
        sampleTasks: [
          "Create a product roadmap for Q2",
          "Analyze user feedback from surveys",
          "Prioritize features for the next sprint",
          "Develop user personas and journey maps"
        ]
      },
      'Legal': {
        greeting: `Good day! I'm ${employee.name}, your AI Legal Assistant. I specialize in contract review, compliance, and legal research.`,
        capabilities: [
          "Review and analyze contracts",
          "Ensure compliance with regulations",
          "Research legal requirements",
          "Draft legal documents",
          "Provide legal risk assessments"
        ],
        sampleTasks: [
          "Review a vendor contract for compliance",
          "Draft terms of service for your app",
          "Research employment law requirements",
          "Analyze intellectual property risks"
        ]
      },
      'Sales': {
        greeting: `Hello! I'm ${employee.name}, your AI Sales Representative. I excel at lead generation, customer outreach, and sales analytics.`,
        capabilities: [
          "Generate and qualify leads",
          "Create personalized outreach campaigns",
          "Analyze sales performance data",
          "Develop sales strategies",
          "Manage customer relationships"
        ],
        sampleTasks: [
          "Generate 100 qualified leads for your product",
          "Create email sequences for cold outreach",
          "Analyze your sales funnel performance",
          "Develop a pricing strategy"
        ]
      }
    };

    return responses[employee.department] || responses['Finance'];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Employee Detail Modal */}
        {selectedEmployee && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-8">
        {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                      <Brain className="text-white" size={32} />
            </div>
            <div>
                      <h2 className="text-3xl font-bold text-gray-900">{selectedEmployee.name}</h2>
                      <p className="text-xl text-gray-600">{selectedEmployee.role}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        {selectedEmployee.isVerified && (
                          <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full">
                            ✓ Verified
                          </span>
                        )}
                        {selectedEmployee.isNew && (
                          <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
                            New
                          </span>
                        )}
                        <span className="px-3 py-1 bg-purple-100 text-purple-700 text-sm font-medium rounded-full">
                          {selectedEmployee.department}
                        </span>
          </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedEmployee(null)}
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X size={24} />
                  </button>
        </div>

        {/* Description */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">About</h3>
                  <p className="text-gray-700 leading-relaxed">{selectedEmployee.description}</p>
        </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center space-x-2">
                      <Star className="text-yellow-400" size={20} />
                      <div>
                        <p className="text-sm text-gray-600">Rating</p>
                        <p className="text-xl font-bold text-gray-900">{selectedEmployee.rating}</p>
                        <p className="text-xs text-gray-500">({selectedEmployee.reviews} reviews)</p>
            </div>
            </div>
          </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="text-green-500" size={20} />
                      <div>
                        <p className="text-sm text-gray-600">Tasks Completed</p>
                        <p className="text-xl font-bold text-gray-900">{selectedEmployee.tasksCompleted.toLocaleString()}</p>
        </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center space-x-2">
                      <DollarSign className="text-green-500" size={20} />
                      <div>
                        <p className="text-sm text-gray-600">Hourly Rate</p>
                        <p className="text-xl font-bold text-gray-900">${selectedEmployee.hourlyRate}/hr</p>
          </div>
          </div>
        </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center space-x-2">
                      <Clock className="text-blue-500" size={20} />
                      <div>
                        <p className="text-sm text-gray-600">Availability</p>
                        <p className="text-xl font-bold text-gray-900">{selectedEmployee.availability}</p>
      </div>
          </div>
            </div>
                </div>

                {/* Skills */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Skills & Capabilities</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedEmployee.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-2 bg-blue-100 text-blue-700 text-sm font-medium rounded-full"
                      >
                        {skill}
              </span>
                    ))}
            </div>
          </div>
          
                {/* AI Interaction Section */}
                {selectedEmployee.isActive && selectedEmployee.aiResponse ? (
                  <div className="mb-6 p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-200">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                        <Brain className="text-white" size={20} />
          </div>
                      <h3 className="text-xl font-bold text-gray-900">AI Assistant Active</h3>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-sm text-green-600 font-medium">Online</span>
        </div>
      </div>
                    
                    <div className="bg-white p-4 rounded-lg border border-green-200 mb-4">
                      <p className="text-gray-800 mb-4">{selectedEmployee.aiResponse.greeting}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                          <h4 className="font-semibold text-gray-900 mb-2">What I can do:</h4>
                          <ul className="space-y-1">
                            {selectedEmployee.aiResponse.capabilities.map((capability, index) => (
                              <li key={index} className="text-sm text-gray-600 flex items-start space-x-2">
                                <CheckCircle size={14} className="text-green-500 mt-0.5 flex-shrink-0" />
                                <span>{capability}</span>
                              </li>
                            ))}
                          </ul>
              </div>
              
              <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Sample tasks:</h4>
                          <ul className="space-y-1">
                            {selectedEmployee.aiResponse.sampleTasks.map((task, index) => (
                              <li key={index} className="text-sm text-gray-600 flex items-start space-x-2">
                                <Play size={14} className="text-blue-500 mt-0.5 flex-shrink-0" />
                                <span>{task}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
              </div>
              
                    <div className="flex items-center space-x-4">
                      <button 
                        onClick={handleStartConversation}
                        className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                      >
                        Start Conversation
                      </button>
                      <button 
                        onClick={handleGiveTask}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                      >
                        Give Task
                      </button>
                      <button 
                        onClick={() => setSelectedEmployee({ ...selectedEmployee, isActive: false, aiResponse: null })}
                        className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                      >
                        End Session
                      </button>
              </div>
            </div>
                ) : (
                  /* Action Buttons */
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={() => setShowHireModal(true)}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      <DollarSign size={20} className="inline mr-2" />
                      Hire for ${selectedEmployee.hourlyRate}/hr
                    </button>
                    <button
                      onClick={() => handleUseEmployee(selectedEmployee)}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      <Play size={20} className="inline mr-2" />
                      Use Now (Free Trial)
                    </button>
                  </div>
                )}
      </div>
    </motion.div>
          </div>
        )}

        {/* Hire Confirmation Modal */}
        {showHireModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl max-w-md w-full p-8"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="text-green-600" size={32} />
            </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Confirm Hire</h3>
                <p className="text-gray-600 mb-6">
                  Are you sure you want to hire this AI employee? You'll be charged ${selectedEmployee?.hourlyRate}/hour for their services.
                </p>
                <div className="flex space-x-4">
                  <button
                    onClick={() => setShowHireModal(false)}
                    className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
                  </button>
                  <button
                    onClick={() => selectedEmployee && handleHireEmployee(selectedEmployee)}
                    className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Confirm Hire
                  </button>
                </div>
            </div>
          </motion.div>
          </div>
        )}
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI Employee Marketplace
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover, hire, and create AI employees for every startup function
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="apple-card p-6 mb-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search AI employees..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="apple-input pl-10 pr-4 py-2 w-full md:w-64"
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
              <span className="text-sm text-gray-600">
                {filteredEmployees.length} AI employees found
              </span>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
                  <div className="bg-white rounded-xl p-6 border border-gray-200">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="text-blue-600" size={20} />
                      </div>
                      <div>
                <p className="text-sm text-gray-600">Total AI Employees</p>
                <p className="text-2xl font-bold text-gray-900">{marketplaceEmployees.length}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl p-6 border border-gray-200">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="text-green-600" size={20} />
                      </div>
                      <div>
                <p className="text-sm text-gray-600">Tasks Completed</p>
                <p className="text-2xl font-bold text-gray-900">45.2k</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl p-6 border border-gray-200">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Star className="text-purple-600" size={20} />
                      </div>
                      <div>
                <p className="text-sm text-gray-600">Avg Rating</p>
                <p className="text-2xl font-bold text-gray-900">4.7</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl p-6 border border-gray-200">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <DollarSign className="text-orange-600" size={20} />
                      </div>
                      <div>
                <p className="text-sm text-gray-600">Avg Rate</p>
                <p className="text-2xl font-bold text-gray-900">$38/hr</p>
                    </div>
                  </div>
                </div>
              </motion.div>

        {/* AI Employees Grid */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredEmployees.map((employee, index) => (
              <motion.div
              key={employee.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              onClick={() => setSelectedEmployee(employee)}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <Brain className="text-white" size={24} />
                </div>
                      <div>
                    <h3 className="font-semibold text-gray-900">{employee.name}</h3>
                    <p className="text-sm text-gray-600">{employee.role}</p>
                </div>
                  </div>
                  
                          <div className="flex items-center space-x-2">
                  {employee.isVerified && (
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                      ✓ Verified
                    </span>
                  )}
                  {employee.isNew && (
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                      New
                    </span>
                  )}
                </div>
                </div>
              
              <p className="text-gray-700 mb-4 text-sm line-clamp-2">{employee.description}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {employee.skills.slice(0, 3).map((skill, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                  >
                    {skill}
                  </span>
                ))}
                {employee.skills.length > 3 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                    +{employee.skills.length - 3} more
                  </span>
                )}
                    </div>

              <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Star className="text-yellow-400" size={14} />
                    <span>{employee.rating}</span>
                    <span className="text-gray-400">({employee.reviews})</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <CheckCircle className="text-blue-500" size={14} />
                    <span>{employee.tasksCompleted.toLocaleString()}</span>
            </div>
            </div>
                <span className="text-gray-400">{employee.lastActive}</span>
          </div>

              <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedEmployee(employee);
                      setShowHireModal(true);
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                  >
                    <Play size={14} className="inline mr-1" />
                    Hire Now
                </button>
                  
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUseEmployee(employee);
                    }}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                  >
                    <Play size={14} className="inline mr-1" />
                    Use Now
                  </button>
                  </div>
            
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">${employee.hourlyRate}/hr</span>
                  <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                    <Bookmark size={16} />
                  </button>
                </div>
                          </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredEmployees.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
                    <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No AI employees found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search or filter criteria</p>
            <button
                        onClick={() => {
                          setSearchQuery('');
                          setSelectedCategory('all');
                        }}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Clear Filters
            </button>
              </motion.div>
        )}

        {/* Chat Modal */}
        {showChatModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl max-w-4xl w-full max-h-[80vh] flex flex-col"
            >
              <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <Brain className="text-white" size={20} />
                      </div>
                      <div>
                      <h3 className="text-xl font-bold text-gray-900">Chat with {selectedEmployee?.name}</h3>
                      <p className="text-sm text-gray-600">{selectedEmployee?.role} • {selectedEmployee?.department}</p>
                      </div>
                    </div>
                  <button
                    onClick={() => setShowChatModal(false)}
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X size={24} />
                  </button>
                    </div>
                  </div>
                  
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {chatHistory.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-4 rounded-2xl ${
                        message.type === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{message.message}</p>
                      <p className="text-xs opacity-70 mt-2">
                        {new Date(message.timestamp).toLocaleTimeString()}
                      </p>
                </div>
                          </div>
                ))}
                {isProcessing && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 text-gray-900 p-4 rounded-2xl">
                          <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        <span className="ml-2 text-sm">AI is thinking...</span>
                          </div>
                        </div>
                </div>
              )}
            </div>

              <div className="p-6 border-t border-gray-200">
                <div className="flex items-center space-x-4">
                  <input
                    type="text"
                    value={currentMessage}
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={isProcessing}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!currentMessage.trim() || isProcessing}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                  >
                    Send
                  </button>
                </div>
              </div>
            </motion.div>
                    </div>
        )}

        {/* Task Modal */}
        {showTaskModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] flex flex-col"
            >
              <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-green-50 to-blue-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
                      <CheckCircle className="text-white" size={20} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">Give Task to {selectedEmployee?.name}</h3>
                      <p className="text-sm text-gray-600">{selectedEmployee?.role} • {selectedEmployee?.department}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowTaskModal(false)}
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>
      </div>

              <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-4">
            <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Describe the task you want {selectedEmployee?.name} to complete:
                    </label>
                    <textarea
                      value={currentTask}
                      onChange={(e) => setCurrentTask(e.target.value)}
                      placeholder="e.g., Create a financial model for our Series A fundraising round..."
                      className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>
            
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">💡 Suggested tasks for {selectedEmployee?.department}:</h4>
                    <div className="space-y-2">
                      {selectedEmployee?.aiResponse?.sampleTasks?.map((task, index) => (
                <button
                          key={index}
                          onClick={() => setCurrentTask(task)}
                          className="block w-full text-left text-sm text-blue-700 hover:text-blue-800 hover:bg-blue-100 p-2 rounded transition-colors"
                        >
                          • {task}
                </button>
              ))}
            </div>
            </div>
            </div>
            </div>
            
              <div className="p-6 border-t border-gray-200">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setShowTaskModal(false)}
                    className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                Cancel
                  </button>
                  <button
                    onClick={handleSubmitTask}
                    disabled={!currentTask.trim() || isProcessing}
                    className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                  >
                    {isProcessing ? 'Processing...' : 'Submit Task'}
                  </button>
              </div>
            </div>
            </motion.div>
                              </div>
        )}

        {/* Task History Modal */}
        {taskHistory.length > 0 && (
          <div className="fixed bottom-6 right-6 z-40">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-xl shadow-2xl border border-gray-200 max-w-sm w-full"
            >
              <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-green-50 to-blue-50">
                <h4 className="font-bold text-gray-900">Task History</h4>
                <p className="text-sm text-gray-600">{taskHistory.length} tasks completed</p>
                        </div>
              <div className="max-h-64 overflow-y-auto">
                {taskHistory.slice(-3).map((task) => (
                  <div key={task.id} className="p-4 border-b border-gray-100">
                    <div className="flex items-start justify-between mb-2">
                      <h5 className="font-medium text-gray-900 text-sm">{task.task}</h5>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        task.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {task.status}
                      </span>
                    </div>
                    {task.result && (
                      <div className="text-xs text-gray-600 bg-gray-50 p-2 rounded">
                        {task.result.split('\n')[0]}...
                  </div>
              )}
            </div>
                ))}
          </div>
            </motion.div>
        </div>
      )}
      </div>
    </div>
  );
};

export default AICoBuilder; 
