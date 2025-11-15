import React, { useState, useEffect } from 'react';
import { 
  Rocket, Target, TrendingUp, Users, Lightbulb, ArrowRight, 
  Plus, Edit2, Trash2, X, CheckCircle, AlertCircle, Flame,
  Zap, BarChart3, Compass, Star, Award, Brain, Sparkles,
  Link, TrendingDown, Activity, Signal, Eye, Save, EyeOff,
  RefreshCw, Clock, ChevronDown, ChevronUp
} from 'lucide-react';

const IMPACTSSystem = () => {
  const [impacts, setImpacts] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(null);
  const [viewMode, setViewMode] = useState('all');
  const [expandedImpacts, setExpandedImpacts] = useState(new Set());

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    intent: '',
    category: 'product',
    status: 'active'
  });

  useEffect(() => {
    const mockImpacts = [
      {
        id: 1,
        title: "Achieve Product-Market Fit",
        category: "product",
        status: "active",
        priority: "high",
        timeframe: "12 weeks",
        lastUpdated: "2025-01-18",
        
        // INTENT - The Why
        intent: "Prove our core value proposition resonates with early adopters and validates our market positioning.",
        
        // MILESTONE - Measurable targets
        milestones: [
          { id: 1, description: "Reach 1,000 active users", target: 1000, current: 650, deadline: "2025-02-15", status: "on-track" },
          { id: 2, description: "Achieve 40% weekly activation rate", target: 40, current: 32, deadline: "2025-02-20", status: "on-track" },
          { id: 3, description: "Get NPS score above 50", target: 50, current: 47, deadline: "2025-02-28", status: "at-risk" }
        ],
        
        // PROGRESS - Real-time tracking
        progress: {
          overall: 68,
          velocity: 85,
          confidence: "high",
          trend: "accelerating",
          lastWeekChange: 15
        },
        
        // ALIGNMENT - Strategic connection
        alignment: {
          links: ["Revenue Goal", "Team Hiring", "Market Expansion"],
          connectsWith: ["Support Product Launch", "Enables Series A", "Validates Pricing Model"],
          strategicValue: 9.5
        },
        
        // COMPOUNDING - Leveraging existing assets
        compounding: {
          leverage: [
            { asset: "Existing user base", multiplier: 2.3, impact: "high" },
            { asset: "Brand recognition", multiplier: 1.8, impact: "medium" },
            { asset: "Team expertise", multiplier: 2.1, impact: "high" }
          ],
          compoundsWith: ["SEO efforts", "Community growth", "Partnership pipeline"]
        },
        
        // TRACTION - Momentum indicators
        traction: {
          momentum: 85,
          direction: "up",
          velocity: "fast",
          signals: [
            { metric: "User growth", value: "+45%", trend: "up" },
            { metric: "Engagement", value: "+28%", trend: "up" },
            { metric: "Retention", value: "+12%", trend: "up" }
          ]
        },
        
        // SIGNAL - Data-driven insights
        signals: [
          { type: "positive", source: "User Research", insight: "3 out of 5 users would pay $49/mo for this", impact: "high", date: "2025-01-15" },
          { type: "positive", source: "Analytics", insight: "Activation rate increased 15% after onboarding simplification", impact: "high", date: "2025-01-12" },
          { type: "warning", source: "Support", insight: "Ticket volume increased 20% due to feature confusion", impact: "medium", date: "2025-01-10" }
        ],
        
        // OWNER
        owner: "Product Team",
        contributors: ["Sarah (PM)", "John (Engineer)", "Emma (Design)"]
      },
      {
        id: 2,
        title: "Scale Revenue to $50K MRR",
        category: "revenue",
        status: "active",
        priority: "critical",
        timeframe: "16 weeks",
        lastUpdated: "2025-01-18",
        
        intent: "Establish sustainable revenue foundation that supports team growth and proves business model viability.",
        
        milestones: [
          { id: 4, description: "Close 50 enterprise deals", target: 50, current: 18, deadline: "2025-03-01", status: "on-track" },
          { id: 5, description: "Achieve $50K monthly recurring revenue", target: 50000, current: 12000, deadline: "2025-03-15", status: "at-risk" },
          { id: 6, description: "Maintain <5% churn rate", target: 5, current: 6.2, deadline: "2025-03-30", status: "at-risk" }
        ],
        
        progress: {
          overall: 42,
          velocity: 68,
          confidence: "medium",
          trend: "stable",
          lastWeekChange: 3
        },
        
        alignment: {
          links: ["Product-Market Fit Goal", "Hiring Plan", "Marketing Strategy"],
          connectsWith: ["Enables Series A", "Funds Engineering Team", "Validates Pricing"],
          strategicValue: 10
        },
        
        compounding: {
          leverage: [
            { asset: "Existing customer base", multiplier: 3.2, impact: "critical" },
            { asset: "Sales process maturity", multiplier: 2.5, impact: "high" },
            { asset: "Brand reputation", multiplier: 1.6, impact: "medium" }
          ],
          compoundsWith: ["Product improvements", "Customer success", "Referral program"]
        },
        
        traction: {
          momentum: 68,
          direction: "up",
          velocity: "moderate",
          signals: [
            { metric: "Pipeline value", value: "+120%", trend: "up" },
            { metric: "Close rate", value: "+8%", trend: "up" },
            { metric: "Deal size", value: "+15%", trend: "up" }
          ]
        },
        
        signals: [
          { type: "positive", source: "Sales Call", insight: "Enterprise buyers want 12-month contracts", impact: "high", date: "2025-01-17" },
          { type: "warning", source: "Analytics", insight: "Sales cycle averaging 8 weeks instead of 6", impact: "high", date: "2025-01-14" },
          { type: "positive", source: "Customer", insight: "Customer advocacy score increased to 8.5/10", impact: "medium", date: "2025-01-12" }
        ],
        
        owner: "Growth Team",
        contributors: ["Mike (Sales)", "Lisa (Marketing)", "Tom (Customer Success)"]
      },
      {
        id: 3,
        title: "Build High-Performance Team of 10",
        category: "people",
        status: "active",
        priority: "high",
        timeframe: "20 weeks",
        lastUpdated: "2025-01-15",
        
        intent: "Assemble world-class team that accelerates execution and establishes winning culture for scale.",
        
        milestones: [
          { id: 7, description: "Hire 5 senior engineers", target: 5, current: 2, deadline: "2025-04-01", status: "at-risk" },
          { id: 8, description: "Build leadership team of 3", target: 3, current: 1, deadline: "2025-04-15", status: "at-risk" },
          { id: 9, description: "Achieve 4.5+ Glassdoor rating", target: 4.5, current: 4.2, deadline: "2025-05-01", status: "on-track" }
        ],
        
        progress: {
          overall: 35,
          velocity: 52,
          confidence: "low",
          trend: "decelerating",
          lastWeekChange: -5
        },
        
        alignment: {
          links: ["Product Goals", "Revenue Targets", "Culture Building"],
          connectsWith: ["Enables Product Velocity", "Supports Sales Scale", "Builds Long-term Value"],
          strategicValue: 9
        },
        
        compounding: {
          leverage: [
            { asset: "Company equity", multiplier: 4.2, impact: "critical" },
            { asset: "Mission-driven work", multiplier: 3.1, impact: "high" },
            { asset: "Growth opportunity", multiplier: 2.8, impact: "high" }
          ],
          compoundsWith: ["Remote-first policy", "Learning budget", "Equity participation"]
        },
        
        traction: {
          momentum: 52,
          direction: "down",
          velocity: "slow",
          signals: [
            { metric: "Time-to-fill", value: "-10 days", trend: "up" },
            { metric: "Offer acceptance", value: "+5%", trend: "down" },
            { metric: "Candidate quality", value: "+12%", trend: "up" }
          ]
        },
        
        signals: [
          { type: "negative", source: "Recruiting", insight: "Top candidates choosing FAANG over startups due to market volatility", impact: "critical", date: "2025-01-13" },
          { type: "positive", source: "Interview", insight: "Remote-first culture is biggest differentiator", impact: "high", date: "2025-01-10" },
          { type: "warning", source: "HR", insight: "Need better interview process - losing candidates in final rounds", impact: "high", date: "2025-01-08" }
        ],
        
        owner: "People Ops",
        contributors: ["Rachel (Recruiting)", "David (Founder)", "Sophie (People)"]
      }
    ];
    setImpacts(mockImpacts);
  }, []);

  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'paused': return 'bg-gray-50 text-gray-700 border-gray-200';
      case 'completed': return 'bg-green-50 text-green-700 border-green-200';
      case 'blocked': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getMilestoneStatusIcon = (status) => {
    switch(status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'on-track': return <Activity className="h-4 w-4 text-blue-600" />;
      case 'at-risk': return <AlertCircle className="h-4 w-4 text-orange-600" />;
      default: return <Target className="h-4 w-4 text-gray-600" />;
    }
  };

  const getSignalTypeColor = (type) => {
    switch(type) {
      case 'positive': return 'bg-green-50 text-green-700 border-green-200';
      case 'negative': return 'bg-red-50 text-red-700 border-red-200';
      case 'warning': return 'bg-orange-50 text-orange-700 border-orange-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const toggleImpact = (id) => {
    const newExpanded = new Set(expandedImpacts);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedImpacts(newExpanded);
  };

  const filteredImpacts = viewMode === 'all' 
    ? impacts 
    : impacts.filter(i => i.category === viewMode);

  const overallImpacts = impacts.length;
  const activeImpacts = impacts.filter(i => i.status === 'active').length;
  const overallProgress = impacts.length > 0 
    ? Math.round(impacts.reduce((sum, i) => sum + i.progress.overall, 0) / impacts.length)
    : 0;
  const overallMomentum = impacts.length > 0
    ? Math.round(impacts.reduce((sum, i) => sum + i.traction.momentum, 0) / impacts.length)
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-1">IMPACTS</h1>
              <p className="text-gray-600 text-sm">Intent • Milestone • Progress • Alignment • Compounding • Traction • Signal</p>
            </div>
            <button 
              onClick={() => setShowCreateModal(true)}
              className="bg-blue-600 text-white px-5 py-2.5 rounded-xl hover:bg-blue-700 flex items-center space-x-2 font-medium transition-all shadow-sm hover:shadow"
            >
              <Plus className="h-5 w-5" />
              <span>New Impact</span>
            </button>
          </div>
        </div>

        {/* KPI Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
            <p className="text-sm font-medium text-gray-600 mb-2">Total Impacts</p>
            <span className="text-2xl font-bold text-gray-900">{overallImpacts}</span>
            <p className="text-xs text-blue-600 mt-1">{activeImpacts} active</p>
          </div>

          <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
            <p className="text-sm font-medium text-gray-600 mb-2">Overall Progress</p>
            <span className="text-2xl font-bold text-gray-900">{overallProgress}%</span>
            <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${overallProgress}%` }} />
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
            <p className="text-sm font-medium text-gray-600 mb-2">Overall Momentum</p>
            <span className="text-2xl font-bold text-gray-900">{overallMomentum}</span>
            <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${overallMomentum}%` }} />
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
            <p className="text-sm font-medium text-gray-600 mb-2">Milestones Hit</p>
            <span className="text-2xl font-bold text-gray-900">
              {impacts.reduce((sum, i) => sum + i.milestones.filter(m => m.status === 'completed').length, 0)}
            </span>
            <p className="text-xs text-blue-600 mt-1">Across all impacts</p>
          </div>
        </div>

        {/* Category Filter */}
        <div className="bg-white rounded-xl border border-gray-200 p-1.5 inline-flex shadow-sm">
          <button
            onClick={() => setViewMode('all')}
            className={`px-4 py-2.5 rounded-lg transition-all font-medium ${viewMode === 'all' ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-700 hover:bg-gray-50'}`}
          >
            All
          </button>
          <button
            onClick={() => setViewMode('product')}
            className={`px-4 py-2.5 rounded-lg transition-all font-medium ${viewMode === 'product' ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-700 hover:bg-gray-50'}`}
          >
            Product
          </button>
          <button
            onClick={() => setViewMode('revenue')}
            className={`px-4 py-2.5 rounded-lg transition-all font-medium ${viewMode === 'revenue' ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-700 hover:bg-gray-50'}`}
          >
            Revenue
          </button>
          <button
            onClick={() => setViewMode('people')}
            className={`px-4 py-2.5 rounded-lg transition-all font-medium ${viewMode === 'people' ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-700 hover:bg-gray-50'}`}
          >
            People
          </button>
        </div>

        {/* Impacts List */}
        <div className="space-y-4">
          {filteredImpacts.map((impact) => (
            <div key={impact.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-sm transition-all shadow-sm">
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-3 flex-wrap gap-2">
                      <div className={`px-3 py-1 rounded-lg border flex items-center space-x-1.5 text-xs font-semibold ${getStatusColor(impact.status)}`}>
                        <Activity className="h-3.5 w-3.5" />
                        <span className="capitalize">{impact.status}</span>
                      </div>
                      <div className="px-2.5 py-1 rounded-lg bg-gray-50 text-gray-700 text-xs font-semibold capitalize border border-gray-200">
                        {impact.category}
                      </div>
                      <div className="px-2.5 py-1 rounded-lg bg-gray-50 text-gray-700 text-xs font-semibold capitalize border border-gray-200">
                        {impact.priority} priority
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{impact.title}</h3>
                    
                    {/* INTENT - The Why */}
                    <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500 mb-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <Lightbulb className="h-4 w-4 text-blue-600" />
                        <span className="font-semibold text-sm text-gray-900">Intent</span>
                      </div>
                      <p className="text-sm text-gray-700">{impact.intent}</p>
                    </div>

                    {/* PROGRESS & TRACTION */}
                    <div className="grid grid-cols-3 gap-3 mb-4">
                      <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                        <p className="text-xs font-semibold text-gray-600 mb-1">Progress</p>
                        <p className="text-2xl font-bold text-gray-900">{impact.progress.overall}%</p>
                        <div className="flex items-center space-x-1 mt-1">
                          {impact.progress.trend === 'accelerating' && <TrendingUp className="h-3 w-3 text-green-600" />}
                          {impact.progress.trend === 'decelerating' && <TrendingDown className="h-3 w-3 text-red-600" />}
                          {impact.progress.trend === 'stable' && <Activity className="h-3 w-3 text-blue-600" />}
                          <span className="text-xs text-gray-600 capitalize">{impact.progress.trend}</span>
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <p className="text-xs font-semibold text-gray-600 mb-1">Momentum</p>
                        <p className="text-2xl font-bold text-gray-900">{impact.traction.momentum}</p>
                        <div className="flex items-center space-x-1 mt-1">
                          {impact.traction.direction === 'up' && <TrendingUp className="h-3 w-3 text-green-600" />}
                          {impact.traction.direction === 'down' && <TrendingDown className="h-3 w-3 text-red-600" />}
                          <span className="text-xs text-gray-600 capitalize">{impact.traction.velocity}</span>
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <p className="text-xs font-semibold text-gray-600 mb-1">Strategic Value</p>
                        <p className="text-2xl font-bold text-gray-900">{impact.alignment.strategicValue}</p>
                        <p className="text-xs text-gray-600 mt-1">out of 10</p>
                      </div>
                    </div>

                    {/* MILESTONES */}
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                        <Target className="h-4 w-4" />
                        <span>Milestones</span>
                      </h4>
                      <div className="space-y-2">
                        {impact.milestones.map((milestone) => (
                          <div key={milestone.id} className="border border-gray-200 rounded-lg p-3">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium text-gray-900">{milestone.description}</span>
                              {getMilestoneStatusIcon(milestone.status)}
                            </div>
                            <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
                              <span>{milestone.current} / {milestone.target}</span>
                              <span className="text-blue-600">Due: {milestone.deadline}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-1.5">
                              <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${Math.min(100, (milestone.current / milestone.target) * 100)}%` }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Expanded Section */}
                    {expandedImpacts.has(impact.id) && (
                      <>
                        {/* TRACTION SIGNALS */}
                        <div className="mb-4">
                          <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                            <Flame className="h-4 w-4" />
                            <span>Traction Signals</span>
                          </h4>
                          <div className="grid grid-cols-3 gap-3">
                            {impact.traction.signals.map((signal, idx) => (
                              <div key={idx} className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                                <p className="text-xs text-gray-600 mb-1">{signal.metric}</p>
                                <div className="flex items-center space-x-2">
                                  <span className="text-sm font-bold text-gray-900">{signal.value}</span>
                                  {signal.trend === 'up' && <TrendingUp className="h-3 w-3 text-blue-600" />}
                                  {signal.trend === 'down' && <TrendingDown className="h-3 w-3 text-black" />}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* COMPOUNDING - Leverage */}
                        <div className="mb-4">
                          <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                            <Zap className="h-4 w-4" />
                            <span>Compounding Leverage</span>
                          </h4>
                          <div className="space-y-2">
                            {impact.compounding.leverage.map((item, idx) => (
                              <div key={idx} className="border border-gray-200 rounded-lg p-3 bg-gray-50">
                                <div className="flex items-center justify-between">
                                  <div>
                                    <p className="text-sm font-medium text-gray-900">{item.asset}</p>
                                    <p className="text-xs text-gray-600 capitalize">{item.impact} impact</p>
                                  </div>
                                  <div className="text-right">
                                    <p className="text-lg font-bold text-blue-600">{item.multiplier}x</p>
                                    <p className="text-xs text-gray-600">leverage</p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* SIGNALS - Data Insights */}
                        <div className="mb-4">
                          <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                            <Signal className="h-4 w-4" />
                            <span>Latest Signals</span>
                          </h4>
                          <div className="space-y-2">
                            {impact.signals.slice(0, 3).map((signal, idx) => (
                              <div key={idx} className={`border rounded-lg p-3 ${getSignalTypeColor(signal.type)}`}>
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-xs font-semibold text-gray-900">{signal.source}</span>
                                  <span className="text-xs text-gray-600">{signal.date}</span>
                                </div>
                                <p className="text-sm text-gray-700 mb-2">{signal.insight}</p>
                                <span className={`text-xs px-2 py-0.5 rounded inline-block font-semibold ${
                                  signal.impact === 'critical' ? 'bg-red-100 text-red-700' : 
                                  signal.impact === 'high' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'
                                }`}>
                                  {signal.impact} impact
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* ALIGNMENT */}
                        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200 mb-4">
                          <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                            <Link className="h-4 w-4 text-blue-600" />
                            <span>Strategic Alignment</span>
                          </h4>
                          <div className="space-y-2">
                            <div>
                              <p className="text-xs font-medium text-gray-600 mb-2">Connects With:</p>
                              <div className="flex flex-wrap gap-2">
                                {impact.alignment.connectsWith.map((link, idx) => (
                                  <span key={idx} className="px-2.5 py-1 bg-white rounded-lg text-xs border border-blue-200 text-gray-700 font-medium">
                                    {link}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    )}

                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span className="flex items-center space-x-1">
                          <Users className="h-4 w-4" />
                          <span>{impact.owner}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{impact.timeframe}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <RefreshCw className="h-4 w-4" />
                          <span>Updated {impact.lastUpdated}</span>
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => setShowDetailsModal(impact)}
                          className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center space-x-1"
                        >
                          <Eye className="h-4 w-4" />
                          <span>View All</span>
                        </button>
                        <button 
                          onClick={() => toggleImpact(impact.id)}
                          className="p-2 hover:bg-gray-50 rounded-lg transition-colors"
                        >
                          {expandedImpacts.has(impact.id) ? (
                            <ChevronUp className="h-4 w-4 text-gray-600" />
                          ) : (
                            <ChevronDown className="h-4 w-4 text-gray-600" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredImpacts.length === 0 && (
          <div className="bg-white rounded-xl border-2 border-dashed border-gray-300 p-12 text-center">
            <Rocket className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">No impacts found</h3>
            <p className="text-gray-600 mb-6">Create your first IMPACT to drive strategic execution</p>
            <button 
              onClick={() => setShowCreateModal(true)}
              className="bg-blue-600 text-white px-5 py-2.5 rounded-xl hover:bg-blue-700 font-medium transition-all shadow-sm hover:shadow"
            >
              Create New Impact
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default IMPACTSSystem;
