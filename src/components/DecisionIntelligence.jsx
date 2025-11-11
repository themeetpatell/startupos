import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, Send, Lightbulb, Target, TrendingUp, AlertTriangle,
  CheckCircle, X, Clock, Archive, Star, Bookmark, MoreVertical,
  ThumbsUp, ThumbsDown, Share, Download, ChevronDown, ChevronUp,
  Sparkles, Zap, Scale, GitBranch, RefreshCw, Plus, Search,
  Filter, Calendar, Users, BarChart3, DollarSign, Flag,
  Eye, Edit, Trash2, ArrowRight, BookOpen, Award, Shield
} from 'lucide-react';

const DecisionIntelligence = () => {
  const [activeTab, setActiveTab] = useState('advisor');
  const [decisions, setDecisions] = useState([]);
  const [chatMessages, setChatMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [selectedDecision, setSelectedDecision] = useState(null);
  const [showDecisionModal, setShowDecisionModal] = useState(false);
  const [editingDecision, setEditingDecision] = useState(null);
  const [selectedFramework, setSelectedFramework] = useState(null);
  const [showFrameworkModal, setShowFrameworkModal] = useState(false);
  const [decisionForm, setDecisionForm] = useState({
    title: '',
    description: '',
    category: 'product',
    urgency: 'medium',
    reversibility: 'reversible',
    stakeholders: [],
    options: ['', '']
  });
  const chatEndRef = useRef(null);

  useEffect(() => {
    const mockDecisions = [
      {
        id: 1,
        title: 'Hire first sales person',
        description: 'Should we hire a dedicated sales person now or wait until we hit $50K MRR?',
        category: 'hiring',
        status: 'pending',
        urgency: 'high',
        reversibility: 'difficult',
        createdAt: '2025-01-15',
        aiRecommendation: {
          decision: 'Wait until $40K MRR',
          confidence: 85,
          reasoning: [
            'Your CAC is $450 and LTV is $2,400 (5.3x ratio) - healthy',
            'Current founder-led sales closing at 35% - above average',
            'Runway is 14 months - comfortable but hire will reduce to 11 months',
            'Similar startups hired at $40-50K MRR with better success'
          ],
          risks: ['May slow growth', 'Founder burnout risk'],
          alternatives: ['Hire SDR first ($60K vs $120K)', 'Part-time consultant'],
          timeline: '2-3 months',
          impact: { revenue: '+15%', runway: '-3 months', team: '+1' }
        },
        outcome: null,
        qualityScore: null
      },
      {
        id: 2,
        title: 'Pivot to B2B from B2C',
        description: 'We\'re getting more interest from businesses than consumers. Should we pivot?',
        category: 'strategy',
        status: 'decided',
        urgency: 'high',
        reversibility: 'very difficult',
        createdAt: '2025-01-10',
        decidedAt: '2025-01-12',
        decision: 'Yes - Pivot to B2B',
        aiRecommendation: {
          decision: 'Yes - Pivot to B2B',
          confidence: 92,
          reasoning: [
            'B2B leads have 4.5x higher intent than B2C',
            'Average deal size: B2B $2,400/yr vs B2C $120/yr',
            'Your team has B2B experience (3/5 founders)',
            'TAM is $15B in B2B vs $2B in B2C for your space'
          ],
          risks: ['Learning curve', 'Longer sales cycles', 'Different messaging needed'],
          alternatives: ['Hybrid model', 'B2B2C approach'],
          timeline: '6-8 weeks to reposition',
          impact: { revenue: '+300%', runway: 'same', team: 'need 1 B2B sales' }
        },
        outcome: 'positive',
        qualityScore: 9.2,
        results: 'First B2B customer signed at $4,800/yr within 3 weeks. 5 qualified B2B leads in pipeline.'
      },
      {
        id: 3,
        title: 'Raise seed round now',
        description: 'We have 12 months runway. Should we raise now or wait for better metrics?',
        category: 'fundraising',
        status: 'monitoring',
        urgency: 'medium',
        reversibility: 'reversible',
        createdAt: '2025-01-08',
        decidedAt: '2025-01-14',
        decision: 'Wait 3 months',
        aiRecommendation: {
          decision: 'Wait 2-3 months',
          confidence: 78,
          reasoning: [
            '12 months runway is comfortable for raising',
            'MRR growth is 18%/month - accelerating',
            'In 3 months you\'ll have $75K MRR (vs $45K now) = better valuation',
            'Current metrics are slightly below seed benchmarks'
          ],
          risks: ['Market conditions may worsen', 'Could take longer than expected'],
          alternatives: ['Raise smaller bridge round', 'Approach strategic angels only'],
          timeline: 'Optimal in 2-3 months',
          impact: { valuation: '+40%', dilution: '-8%', runway: 'extends to 24mo' }
        },
        outcome: null,
        qualityScore: null
      }
    ];
    setDecisions(mockDecisions);

    const welcomeMessages = [
      {
        id: 1,
        type: 'ai',
        content: 'Hi! I\'m your AI Strategic Advisor. I can help you make better decisions by analyzing your data, showing patterns from successful startups, and identifying blind spots.',
        timestamp: new Date().toISOString()
      },
      {
        id: 2,
        type: 'ai',
        content: 'Try asking me questions like:\n• "Should I hire a sales person now?"\n• "What should I focus on this month?"\n• "Is it time to raise funding?"\n• "Should I pivot or persevere?"',
        timestamp: new Date().toISOString()
      }
    ];
    setChatMessages(welcomeMessages);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: chatMessages.length + 1,
      type: 'user',
      content: inputMessage,
      timestamp: new Date().toISOString()
    };

    setChatMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsThinking(true);

    setTimeout(() => {
      const aiResponse = generateAIResponse(inputMessage);
      setChatMessages(prev => [...prev, aiResponse]);
      setIsThinking(false);
    }, 2000);
  };

  const generateAIResponse = (question) => {
    const lowerQ = question.toLowerCase();
    
    let content = '';
    let suggestions = [];

    if (lowerQ.includes('hire') || lowerQ.includes('hiring')) {
      content = '**Should you hire a sales person now?**\n\nBased on your current metrics:\n\n✅ **Recommendation:** Wait 2-3 months\n\n**Analysis:**\n• Your MRR is $35K (target: $40-50K for first sales hire)\n• Current CAC is $425, sales hire adds $120K/year cost\n• Runway would drop from 14mo → 11mo\n• You\'re closing 35% of demos yourself (very strong)\n\n**What to do now:**\n1. Systemize your sales process (document what works)\n2. Hit $45K MRR (2-3 months at current growth)\n3. Then hire SDR first ($60K) before AE ($120K)\n\n**Risk:** If growth slows <10%/month, consider hiring sooner.';
      suggestions = ['Track sales metrics', 'Create sales playbook', 'Set hiring trigger at $45K MRR'];
    } else if (lowerQ.includes('focus') || lowerQ.includes('priority') || lowerQ.includes('priorities')) {
      content = '**What should you focus on this month?**\n\nBased on your IMPACTS and current stage:\n\n🎯 **Top 3 Priorities:**\n\n1. **Product-Market Fit (Critical)**\n   • Your retention is 65% (need 80%+ for PMF)\n   • Focus: Talk to churned customers this week\n   • Goal: Identify top 3 reasons for churn\n\n2. **Revenue Growth**\n   • Currently $35K MRR, growing 18%/mo\n   • Opportunity: 5 expansion candidates worth $12K ARR\n   • Action: Reach out this week\n\n3. **Fundraising Prep**\n   • Build relationships with 2-3 VCs now (for 3mo from now)\n   • Share monthly updates\n   • No pitch yet - just relationship building\n\n**Ignore for now:** Hiring, new features, international expansion';
      suggestions = ['Set up 5 churn interviews', 'Email expansion candidates', 'Research 3 relevant VCs'];
    } else if (lowerQ.includes('raise') || lowerQ.includes('funding') || lowerQ.includes('fundrais')) {
      content = '**Should you raise funding now?**\n\n✅ **Recommendation:** Wait 3 months\n\n**Why wait:**\n• You have 14 months runway (comfortable)\n• Your MRR will grow from $35K → $55K (57% increase)\n• Better metrics = 30-40% higher valuation\n• Less dilution and better terms\n\n**What to do now:**\n1. Build relationships with 3-5 VCs (no pitch yet)\n2. Send monthly updates showcasing growth\n3. Improve metrics (retention, revenue, engagement)\n4. Prepare pitch deck and financial model\n\n**Optimal timing:** Start active fundraising in 10-12 weeks';
      suggestions = ['Research target VCs', 'Prepare investor update template', 'Set metrics targets'];
    } else if (lowerQ.includes('pivot') || lowerQ.includes('change direction')) {
      content = '**Should you pivot?**\n\n⚠️ **Recommendation:** Not yet - keep iterating\n\n**Current situation:**\n• You have early traction ($35K MRR)\n• Growth rate is healthy (18%/mo)\n• Retention at 65% shows some product-market fit\n\n**When to pivot:**\n✗ Growth stalls for 3+ months\n✗ Retention drops below 40%\n✗ Multiple customer segments reject solution\n\n**What to do instead:**\n1. Double down on what\'s working\n2. Talk to your best customers (why do they love it?)\n3. Fix retention issues first\n4. Try different channels before changing product\n\nGive it 3-6 more months of focused iteration before considering pivot.';
      suggestions = ['Interview top 10 customers', 'Analyze churn reasons', 'Test new channels'];
    } else if (lowerQ.includes('price') || lowerQ.includes('pricing')) {
      content = '**Should you change your pricing?**\n\n✅ **Recommendation:** Test a new tier\n\n**Current pricing analysis:**\n• 8% conversion to paid (industry avg: 10-15%)\n• Potential revenue left on table\n\n**Try this:**\n1. **Add lower tier:** $29/mo (vs current $49)\n   • Target: Individual users\n   • Estimated lift: +5% conversion\n\n2. **Add higher tier:** $149/mo\n   • Target: Teams/companies\n   • Include: Priority support, advanced features\n   • Estimated: 20% of current paid users upgrade\n\n3. **A/B test for 30 days**\n\n**Expected impact:** +40% revenue from same traffic';
      suggestions = ['Create pricing comparison', 'Survey current users', 'Set up A/B test'];
    } else if (lowerQ.includes('feature') || lowerQ.includes('build')) {
      content = '**What feature should you build next?**\n\n✅ **Recommendation:** Focus on retention, not new features\n\n**Why:**\n• Your retention is 65% (need 80%+ for strong PMF)\n• Adding features won\'t help if users don\'t stick\n• Better to perfect core than add more\n\n**Instead of new features:**\n1. **Improve onboarding** (biggest retention driver)\n   • Add product tour\n   • Create "quick win" moments\n   • Email drip sequence\n\n2. **Enhance core features**\n   • What do power users love?\n   • Make that 10x better\n\n3. **Fix friction points**\n   • Interview churned users\n   • Remove obstacles\n\n**Rule:** Don\'t build new features until retention >75%';
      suggestions = ['Analyze churn reasons', 'Interview power users', 'Improve onboarding'];
    } else if (lowerQ.includes('market') || lowerQ.includes('customer') || lowerQ.includes('segment')) {
      content = '**Should you focus on a different customer segment?**\n\n✅ **Recommendation:** Double down on current winners\n\n**Your best customers:**\n• B2B companies, 10-50 people\n• Using product 5+ times/week\n• 95% retention rate\n• Paying $99+/month\n\n**What to do:**\n1. **Find more like them**\n   • What industry?\n   • What role?\n   • What problem drove them to you?\n\n2. **Build for them specifically**\n   • Their features > nice-to-haves\n   • Their use cases > edge cases\n\n3. **Market to them**\n   • Their channels\n   • Their language\n\n**Ignore:** Everyone else for now. Master one segment first.';
      suggestions = ['Create ICP profile', 'Interview top 10 customers', 'Adjust marketing'];
    } else {
      content = 'I can help you make better decisions! Based on your current data:\n\n**Your Current State:**\n• MRR: $35K (growing 18%/mo)\n• Runway: 14 months\n• Team: 5 people\n• Stage: Pre-seed\n• Retention: 65%\n\n**Critical Decisions Coming Up:**\n1. When to hire first sales person (2-3 months)\n2. Whether to raise seed round (optimal in 3 months)\n3. Product focus (improve retention first)\n\n**Key Insight:** You\'re in a strong position. Focus on retention before growth.\n\n**Try asking me:**\n• "Should I hire now?"\n• "What should I focus on?"\n• "Should I raise funding?"\n• "Should I pivot?"\n• "What feature should I build?"';
      suggestions = ['Should I hire?', 'What should I focus on?', 'Should I raise funding?'];
    }

    return {
      id: chatMessages.length + 2,
      type: 'ai',
      content: content,
      suggestions: suggestions,
      timestamp: new Date().toISOString()
    };
  };

  const categories = [
    { id: 'product', label: 'Product', icon: Lightbulb, color: 'purple' },
    { id: 'strategy', label: 'Strategy', icon: Target, color: 'blue' },
    { id: 'hiring', label: 'Hiring', icon: Users, color: 'green' },
    { id: 'fundraising', label: 'Fundraising', icon: DollarSign, color: 'emerald' },
    { id: 'marketing', label: 'Marketing', icon: TrendingUp, color: 'orange' }
  ];

  const frameworks = [
    {
      id: 1,
      name: 'Eisenhower Matrix',
      description: 'Prioritize by urgency and importance',
      icon: Target,
      color: 'blue'
    },
    {
      id: 2,
      name: 'RICE Scoring',
      description: 'Reach × Impact × Confidence ÷ Effort',
      icon: BarChart3,
      color: 'purple'
    },
    {
      id: 3,
      name: 'Reversibility Test',
      description: 'Type 1 (one-way) vs Type 2 (two-way) doors',
      icon: GitBranch,
      color: 'green'
    },
    {
      id: 4,
      name: 'Pre-Mortem',
      description: 'Imagine failure and work backwards',
      icon: AlertTriangle,
      color: 'red'
    }
  ];

  const tabs = [
    { id: 'advisor', label: 'AI Advisor', icon: Brain, description: 'Chat with AI' },
    { id: 'decisions', label: 'My Decisions', icon: BookOpen, description: 'Track decisions' },
    { id: 'frameworks', label: 'Frameworks', icon: Scale, description: 'Decision tools' },
    { id: 'insights', label: 'Insights', icon: Sparkles, description: 'Learn & improve' }
  ];

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'critical': return 'text-red-600 bg-red-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'decided': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'monitoring': return 'text-blue-600 bg-blue-100';
      case 'archived': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const handleSaveDecision = () => {
    if (!decisionForm.title.trim()) return;

    const newDecision = {
      id: editingDecision ? editingDecision.id : Date.now(),
      title: decisionForm.title,
      description: decisionForm.description,
      category: decisionForm.category,
      status: 'pending',
      urgency: decisionForm.urgency,
      reversibility: decisionForm.reversibility,
      createdAt: editingDecision ? editingDecision.createdAt : new Date().toISOString().split('T')[0],
      aiRecommendation: null,
      outcome: null,
      qualityScore: null
    };

    if (editingDecision) {
      setDecisions(decisions.map(d => d.id === editingDecision.id ? newDecision : d));
    } else {
      setDecisions([newDecision, ...decisions]);
    }

    setShowDecisionModal(false);
    setEditingDecision(null);
    setDecisionForm({
      title: '',
      description: '',
      category: 'product',
      urgency: 'medium',
      reversibility: 'reversible',
      stakeholders: [],
      options: ['', '']
    });
  };

  const handleDeleteDecision = (id) => {
    setDecisions(decisions.filter(d => d.id !== id));
  };

  const handleGetAIRecommendation = (decision) => {
    const aiRec = {
      decision: decision.category === 'hiring' ? 'Wait 2 months' : 
                decision.category === 'fundraising' ? 'Wait 3 months' :
                decision.category === 'strategy' ? 'Yes, proceed' : 'Evaluate further',
      confidence: Math.floor(Math.random() * 20) + 75,
      reasoning: [
        `Based on your current metrics and ${decision.category} focus`,
        'Similar successful startups made this choice at your stage',
        'Your runway and growth rate support this decision',
        'Risk level is manageable with current resources'
      ],
      risks: ['Timing could be off', 'Market conditions may change'],
      alternatives: ['Alternative approach 1', 'Alternative approach 2'],
      timeline: '2-3 months',
      impact: { revenue: '+20%', runway: '-2 months', team: '+1' }
    };

    setDecisions(decisions.map(d => 
      d.id === decision.id ? { ...d, aiRecommendation: aiRec } : d
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
                  <Brain className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Decision Intelligence</h1>
                  <p className="text-gray-600">Make better decisions, faster</p>
                </div>
              </div>
            </div>
            
            <button
              onClick={() => {
                setEditingDecision(null);
                setDecisionForm({
                  title: '',
                  description: '',
                  category: 'product',
                  urgency: 'medium',
                  reversibility: 'reversible',
                  stakeholders: [],
                  options: ['', '']
                });
                setShowDecisionModal(true);
              }}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl hover:shadow-lg transition-all"
            >
              <Plus size={20} />
              <span>Log Decision</span>
            </button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-4 gap-4 mt-6">
            {[
              { label: 'Decisions Made', value: '47', icon: CheckCircle, color: 'green' },
              { label: 'Avg Quality Score', value: '8.4/10', icon: Star, color: 'yellow' },
              { label: 'Pending', value: '3', icon: Clock, color: 'orange' },
              { label: 'Success Rate', value: '89%', icon: TrendingUp, color: 'blue' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-4 rounded-xl shadow-sm border border-gray-100"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className={`w-10 h-10 bg-${stat.color}-100 rounded-lg flex items-center justify-center mb-2`}>
                      <stat.icon size={20} className={`text-${stat.color}-600`} />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6 p-2">
          <div className="flex space-x-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-all flex-1 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-md'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon size={18} />
                  <div className="text-left">
                    <div className="font-medium">{tab.label}</div>
                    <div className={`text-xs ${activeTab === tab.id ? 'text-white/80' : 'text-gray-500'}`}>
                      {tab.description}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'advisor' && (
            <motion.div
              key="advisor"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden"
            >
              <div className="flex flex-col h-[600px]">
                {/* Chat Messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {chatMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-2xl ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                        {message.type === 'ai' && (
                          <div className="flex items-center space-x-2 mb-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                              <Brain size={16} className="text-white" />
                            </div>
                            <span className="text-sm font-medium text-gray-700">AI Strategic Advisor</span>
                          </div>
                        )}
                        <div
                          className={`px-4 py-3 rounded-2xl ${
                            message.type === 'user'
                              ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                              : 'bg-gray-100 text-gray-900'
                          }`}
                        >
                          <div className="whitespace-pre-wrap">{message.content}</div>
                        </div>
                        {message.suggestions && (
                          <div className="mt-2 flex flex-wrap gap-2">
                            {message.suggestions.map((suggestion, idx) => (
                              <button
                                key={idx}
                                onClick={() => setInputMessage(suggestion)}
                                className="text-xs px-3 py-1 bg-purple-100 text-purple-700 rounded-full hover:bg-purple-200 transition-colors"
                              >
                                {suggestion}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  {isThinking && (
                    <div className="flex justify-start">
                      <div className="flex items-center space-x-2 px-4 py-3 bg-gray-100 rounded-2xl">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                        <span className="text-sm text-gray-600">AI is thinking...</span>
                      </div>
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </div>

                {/* Input */}
                <div className="border-t border-gray-200 p-4 bg-gray-50">
                  <div className="flex items-end space-x-3">
                    <div className="flex-1">
                      <input
                        type="text"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleSendMessage();
                          }
                        }}
                        placeholder="Ask me anything... e.g., 'Should I raise funding now?'"
                        className="w-full h-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-900"
                      />
                    </div>
                    <button
                      onClick={handleSendMessage}
                      disabled={!inputMessage.trim()}
                      className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 font-medium whitespace-nowrap"
                    >
                      <Send size={20} />
                      <span>Send</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'decisions' && (
            <motion.div
              key="decisions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {decisions.length === 0 ? (
                <div className="bg-white p-12 rounded-xl shadow-sm border border-gray-200 text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BookOpen size={32} className="text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">No decisions logged yet</h3>
                  <p className="text-gray-600 mb-6">Start tracking your decisions to improve decision quality over time</p>
                  <button
                    onClick={() => {
                      setEditingDecision(null);
                      setDecisionForm({
                        title: '',
                        description: '',
                        category: 'product',
                        urgency: 'medium',
                        reversibility: 'reversible',
                        stakeholders: [],
                        options: ['', '']
                      });
                      setShowDecisionModal(true);
                    }}
                    className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl hover:shadow-lg transition-all inline-flex items-center space-x-2"
                  >
                    <Plus size={20} />
                    <span>Log Your First Decision</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {decisions.map((decision, index) => (
                  <motion.div
                    key={decision.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-bold text-gray-900">{decision.title}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(decision.status)}`}>
                            {decision.status}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getUrgencyColor(decision.urgency)}`}>
                            {decision.urgency}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-3">{decision.description}</p>
                      </div>
                      <div className="flex items-center space-x-2 ml-4">
                        <button
                          onClick={() => {
                            setEditingDecision(decision);
                            setDecisionForm({
                              title: decision.title,
                              description: decision.description,
                              category: decision.category,
                              urgency: decision.urgency,
                              reversibility: decision.reversibility,
                              stakeholders: [],
                              options: ['', '']
                            });
                            setShowDecisionModal(true);
                          }}
                          className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteDecision(decision.id)}
                          className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>

                    {!decision.aiRecommendation && decision.status === 'pending' && (
                      <button
                        onClick={() => handleGetAIRecommendation(decision)}
                        className="mb-4 flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:shadow-lg transition-all"
                      >
                        <Brain size={18} />
                        <span>Get AI Recommendation</span>
                      </button>
                    )}

                    {decision.aiRecommendation && (
                      <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg mb-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center space-x-2">
                            <Sparkles className="text-purple-600" size={20} />
                            <span className="font-semibold text-gray-900">AI Recommendation</span>
                          </div>
                          <span className="text-sm font-medium text-purple-600">
                            {decision.aiRecommendation.confidence}% confidence
                          </span>
                        </div>
                        <div className="text-lg font-bold text-gray-900 mb-2">
                          {decision.aiRecommendation.decision}
                        </div>
                        <div className="text-sm text-gray-600 space-y-1">
                          {decision.aiRecommendation.reasoning.slice(0, 2).map((reason, idx) => (
                            <div key={idx} className="flex items-start space-x-2">
                              <CheckCircle size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                              <span>{reason}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {decision.outcome && (
                      <div className="flex items-center space-x-4 pt-3 border-t border-gray-200">
                        <div className="flex items-center space-x-2">
                          <Award className="text-yellow-600" size={18} />
                          <span className="text-sm font-medium text-gray-700">
                            Quality Score: {decision.qualityScore}/10
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          {decision.outcome === 'positive' ? (
                            <ThumbsUp className="text-green-600" size={18} />
                          ) : (
                            <ThumbsDown className="text-red-600" size={18} />
                          )}
                          <span className="text-sm text-gray-600">{decision.results}</span>
                        </div>
                      </div>
                    )}
                  </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'frameworks' && (
            <motion.div
              key="frameworks"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="grid grid-cols-2 gap-6">
                {frameworks.map((framework, index) => {
                  const Icon = framework.icon;
                  return (
                      <motion.div
                      key={framework.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => {
                        setSelectedFramework(framework);
                        setShowFrameworkModal(true);
                      }}
                      className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all cursor-pointer"
                    >
                      <div className={`w-14 h-14 bg-${framework.color}-100 rounded-xl flex items-center justify-center mb-4`}>
                        <Icon size={28} className={`text-${framework.color}-600`} />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{framework.name}</h3>
                      <p className="text-gray-600 mb-4">{framework.description}</p>
                      <button className="flex items-center space-x-2 text-purple-600 font-medium hover:text-purple-700">
                        <span>Use Framework</span>
                        <ArrowRight size={16} />
                      </button>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {activeTab === 'insights' && (
            <motion.div
              key="insights"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white p-8 rounded-xl shadow-sm border border-gray-200"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Decision Intelligence</h2>
              
              <div className="space-y-6">
                <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
                  <div className="flex items-center space-x-3 mb-3">
                    <TrendingUp className="text-green-600" size={24} />
                    <h3 className="text-lg font-bold text-gray-900">Strengths</h3>
                  </div>
                  <ul className="space-y-2 text-gray-700">
                    <li>• You make reversible decisions quickly (avg 2 days)</li>
                    <li>• 92% of your strategic decisions align with AI recommendations</li>
                    <li>• Strong at gathering evidence before deciding</li>
                  </ul>
                </div>

                <div className="p-6 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl">
                  <div className="flex items-center space-x-3 mb-3">
                    <AlertTriangle className="text-orange-600" size={24} />
                    <h3 className="text-lg font-bold text-gray-900">Areas to Improve</h3>
                  </div>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Hiring decisions take 45 days on average (target: 30 days)</li>
                    <li>• Consider more alternatives before deciding (avg 1.8, target: 3+)</li>
                    <li>• Document decision rationale more consistently</li>
                  </ul>
                </div>

                <div className="p-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl">
                  <div className="flex items-center space-x-3 mb-3">
                    <Lightbulb className="text-purple-600" size={24} />
                    <h3 className="text-lg font-bold text-gray-900">Recommendations</h3>
                  </div>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Create a hiring decision framework to speed up process</li>
                    <li>• Use "Pre-Mortem" technique for high-stakes decisions</li>
                    <li>• Schedule monthly decision retrospectives</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Decision Modal */}
        <AnimatePresence>
          {showDecisionModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
              onClick={() => setShowDecisionModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              >
                <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white z-10">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {editingDecision ? 'Edit Decision' : 'Log New Decision'}
                  </h2>
                  <button
                    onClick={() => setShowDecisionModal(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="p-6 space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Decision Title *
                    </label>
                    <input
                      type="text"
                      value={decisionForm.title}
                      onChange={(e) => setDecisionForm({ ...decisionForm, title: e.target.value })}
                      placeholder="e.g., Should I hire a sales person?"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-900"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      value={decisionForm.description}
                      onChange={(e) => setDecisionForm({ ...decisionForm, description: e.target.value })}
                      placeholder="Provide context and details..."
                      rows="4"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 resize-none text-gray-900"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Category
                    </label>
                    <select
                      value={decisionForm.category}
                      onChange={(e) => setDecisionForm({ ...decisionForm, category: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white text-gray-900 font-medium"
                    >
                      <option value="product">Product</option>
                      <option value="strategy">Strategy</option>
                      <option value="hiring">Hiring</option>
                      <option value="fundraising">Fundraising</option>
                      <option value="marketing">Marketing</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Urgency
                    </label>
                    <select
                      value={decisionForm.urgency}
                      onChange={(e) => setDecisionForm({ ...decisionForm, urgency: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white text-gray-900 font-medium"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="critical">Critical</option>
                    </select>
                  </div>
                  </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Reversibility
                  </label>
                  <select
                    value={decisionForm.reversibility}
                    onChange={(e) => setDecisionForm({ ...decisionForm, reversibility: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white text-gray-900 font-medium"
                  >
                    <option value="reversible">Easily Reversible (Type 2 door)</option>
                    <option value="difficult">Difficult to Reverse</option>
                    <option value="irreversible">Irreversible (Type 1 door)</option>
                  </select>
                </div>
                </div>

                <div className="p-6 border-t border-gray-200 flex items-center justify-end space-x-3 sticky bottom-0 bg-white">
                  <button
                    onClick={() => setShowDecisionModal(false)}
                    className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveDecision}
                    disabled={!decisionForm.title.trim()}
                    className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                  >
                    {editingDecision ? 'Update Decision' : 'Save Decision'}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Framework Modal */}
        <AnimatePresence>
          {showFrameworkModal && selectedFramework && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
              onClick={() => {
                setShowFrameworkModal(false);
                setSelectedFramework(null);
              }}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
              >
                <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white z-10">
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 bg-${selectedFramework.color}-100 rounded-xl flex items-center justify-center`}>
                      <selectedFramework.icon size={24} className={`text-${selectedFramework.color}-600`} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">{selectedFramework.name}</h2>
                      <p className="text-gray-600">{selectedFramework.description}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setShowFrameworkModal(false);
                      setSelectedFramework(null);
                    }}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="p-6">
                  <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-xl mb-6">
                    <h3 className="font-bold text-gray-900 mb-3">How to use this framework:</h3>
                    <div className="text-gray-700 space-y-2">
                      {selectedFramework.id === 1 && (
                        <>
                          <p>1. Plot your decision on two axes: <strong>Urgency</strong> and <strong>Importance</strong></p>
                          <p>2. This creates 4 quadrants:</p>
                          <ul className="ml-6 space-y-1">
                            <li>• <strong>Urgent + Important:</strong> Do now</li>
                            <li>• <strong>Not Urgent + Important:</strong> Schedule</li>
                            <li>• <strong>Urgent + Not Important:</strong> Delegate</li>
                            <li>• <strong>Not Urgent + Not Important:</strong> Eliminate</li>
                          </ul>
                        </>
                      )}
                      {selectedFramework.id === 2 && (
                        <>
                          <p>1. Score your decision on these factors:</p>
                          <ul className="ml-6 space-y-1">
                            <li>• <strong>Reach:</strong> How many people will this impact?</li>
                            <li>• <strong>Impact:</strong> How much will it improve their experience?</li>
                            <li>• <strong>Confidence:</strong> How sure are you?</li>
                            <li>• <strong>Effort:</strong> How much work is required?</li>
                          </ul>
                          <p>2. Calculate: (Reach × Impact × Confidence) ÷ Effort</p>
                          <p>3. Higher score = higher priority</p>
                        </>
                      )}
                      {selectedFramework.id === 3 && (
                        <>
                          <p>1. Ask: <strong>"Is this decision easily reversible?"</strong></p>
                          <p>2. Two types of decisions:</p>
                          <ul className="ml-6 space-y-1">
                            <li>• <strong>Type 2 (Two-way doors):</strong> Easily reversible → Decide fast</li>
                            <li>• <strong>Type 1 (One-way doors):</strong> Hard to reverse → Decide slow and carefully</li>
                          </ul>
                          <p>3. Most decisions are Type 2 (reversible) but treated as Type 1</p>
                        </>
                      )}
                      {selectedFramework.id === 4 && (
                        <>
                          <p>1. Imagine it's 12 months from now and your decision failed spectacularly</p>
                          <p>2. Working backwards, list all the reasons why it failed</p>
                          <p>3. Now take action TODAY to prevent those failures</p>
                          <p>4. This surfaces blind spots and hidden risks</p>
                        </>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setShowFrameworkModal(false);
                      setSelectedFramework(null);
                      setShowDecisionModal(true);
                    }}
                    className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl hover:shadow-lg transition-all font-medium"
                  >
                    Use Framework
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DecisionIntelligence;

