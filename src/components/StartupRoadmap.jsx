import React, { useState, useEffect } from 'react';
import { 
  Target, 
  Trophy, 
  TrendingUp, 
  Users, 
  BookOpen, 
  Lightbulb, 
  CheckCircle, 
  Clock, 
  Star,
  ArrowRight,
  Play,
  Pause,
  RotateCcw,
  Calendar,
  Award,
  Zap,
  Heart,
  Shield,
  Rocket,
  Globe,
  DollarSign,
  Building,
  UserCheck,
  FileText,
  Video,
  ExternalLink,
  Lock,
  Circle,
  Flame,
  TrendingDown,
  Brain,
  BarChart3,
  LineChart,
  PieChart,
  Activity,
  MessageSquare,
  Share2,
  Bell,
  Filter,
  Download,
  Upload,
  Plus,
  Minus,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  Edit3,
  Trash2,
  Check,
  X,
  Info,
  AlertCircle,
  Timer,
  MapPin,
  Link2,
  Sparkles,
  PartyPopper
} from 'lucide-react';

const StartupRoadmap = () => {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [progress, setProgress] = useState(33.33);
  const [activePhase, setActivePhase] = useState('ideation');
  const [showOKRModal, setShowOKRModal] = useState(false);
  const [showResourceModal, setShowResourceModal] = useState(false);
  const [selectedMilestone, setSelectedMilestone] = useState(null);
  const [viewMode, setViewMode] = useState('roadmap');
  const [showCelebration, setShowCelebration] = useState(false);
  const [streak, setStreak] = useState(12);
  const [showAIInsights, setShowAIInsights] = useState(false);
  const [expandedPhase, setExpandedPhase] = useState('ideation');
  const [timelineView, setTimelineView] = useState(false);

  // Startup phases with milestones
  const phases = {
    ideation: {
      name: 'Ideation & Validation',
      description: 'Validate your idea and find product-market fit',
      level: 1,
      milestones: [
        {
          id: 'idea-validation',
          title: 'Idea Validation',
          description: 'Test your core hypothesis with potential customers',
          status: 'completed',
          points: 100,
          resources: [
            { type: 'template', name: 'Customer Interview Guide', icon: FileText },
            { type: 'video', name: 'How to Validate Ideas', icon: Video },
            { type: 'expert', name: 'Connect with Product Strategist', icon: UserCheck }
          ]
        },
        {
          id: 'market-research',
          title: 'Market Research',
          description: 'Analyze market size, competition, and opportunities',
          status: 'in-progress',
          points: 150,
          resources: [
            { type: 'template', name: 'Market Analysis Framework', icon: FileText },
            { type: 'tool', name: 'Competitive Analysis Tool', icon: ExternalLink },
            { type: 'expert', name: 'Market Research Specialist', icon: UserCheck }
          ]
        },
        {
          id: 'mvp-planning',
          title: 'MVP Planning',
          description: 'Define your minimum viable product features',
          status: 'locked',
          points: 200,
          resources: [
            { type: 'template', name: 'MVP Feature Prioritization', icon: FileText },
            { type: 'video', name: 'Building Your First MVP', icon: Video },
            { type: 'expert', name: 'Product Development Coach', icon: UserCheck }
          ]
        }
      ]
    },
    mvp: {
      name: 'MVP Development',
      description: 'Build and launch your minimum viable product',
      level: 2,
      milestones: [
        {
          id: 'prototype',
          title: 'Create Prototype',
          description: 'Build a working prototype of your core features',
          status: 'locked',
          points: 250,
          resources: [
            { type: 'template', name: 'Prototype Checklist', icon: FileText },
            { type: 'tool', name: 'Design System Kit', icon: ExternalLink },
            { type: 'expert', name: 'UX/UI Designer', icon: UserCheck }
          ]
        },
        {
          id: 'beta-testing',
          title: 'Beta Testing',
          description: 'Test with a small group of early users',
          status: 'locked',
          points: 300,
          resources: [
            { type: 'template', name: 'Beta Testing Plan', icon: FileText },
            { type: 'tool', name: 'User Feedback Collection', icon: ExternalLink },
            { type: 'expert', name: 'User Research Expert', icon: UserCheck }
          ]
        },
        {
          id: 'mvp-launch',
          title: 'MVP Launch',
          description: 'Launch your MVP to the public',
          status: 'locked',
          points: 400,
          resources: [
            { type: 'template', name: 'Launch Checklist', icon: FileText },
            { type: 'video', name: 'Launch Strategy Guide', icon: Video },
            { type: 'expert', name: 'Growth Marketing Expert', icon: UserCheck }
          ]
        }
      ]
    },
    growth: {
      name: 'Growth & Scale',
      description: 'Scale your business and optimize for growth',
      level: 3,
      milestones: [
        {
          id: 'user-acquisition',
          title: 'User Acquisition',
          description: 'Implement scalable user acquisition strategies',
          status: 'locked',
          points: 500,
          resources: [
            { type: 'template', name: 'Growth Marketing Plan', icon: FileText },
            { type: 'tool', name: 'Marketing Analytics Dashboard', icon: ExternalLink },
            { type: 'expert', name: 'Growth Marketing Specialist', icon: UserCheck }
          ]
        },
        {
          id: 'revenue-optimization',
          title: 'Revenue Optimization',
          description: 'Optimize pricing and revenue streams',
          status: 'locked',
          points: 600,
          resources: [
            { type: 'template', name: 'Revenue Model Canvas', icon: FileText },
            { type: 'video', name: 'Pricing Strategy Masterclass', icon: Video },
            { type: 'expert', name: 'Revenue Optimization Expert', icon: UserCheck }
          ]
        },
        {
          id: 'team-building',
          title: 'Team Building',
          description: 'Build and scale your team effectively',
          status: 'locked',
          points: 700,
          resources: [
            { type: 'template', name: 'Hiring Playbook', icon: FileText },
            { type: 'tool', name: 'Team Performance Tracker', icon: ExternalLink },
            { type: 'expert', name: 'HR & Culture Specialist', icon: UserCheck }
          ]
        }
      ]
    },
    scale: {
      name: 'Scale & Exit',
      description: 'Prepare for major scaling or exit opportunities',
      level: 4,
      milestones: [
        {
          id: 'fundraising',
          title: 'Fundraising Preparation',
          description: 'Prepare for Series A and beyond',
          status: 'locked',
          points: 800,
          resources: [
            { type: 'template', name: 'Pitch Deck Template', icon: FileText },
            { type: 'video', name: 'Fundraising Masterclass', icon: Video },
            { type: 'expert', name: 'Investment Banking Expert', icon: UserCheck }
          ]
        },
        {
          id: 'international-expansion',
          title: 'International Expansion',
          description: 'Expand to new markets globally',
          status: 'locked',
          points: 900,
          resources: [
            { type: 'template', name: 'Market Entry Strategy', icon: FileText },
            { type: 'tool', name: 'Global Market Research', icon: ExternalLink },
            { type: 'expert', name: 'International Business Expert', icon: UserCheck }
          ]
        },
        {
          id: 'exit-strategy',
          title: 'Exit Strategy Planning',
          description: 'Plan for IPO, acquisition, or other exits',
          status: 'locked',
          points: 1000,
          resources: [
            { type: 'template', name: 'Exit Strategy Framework', icon: FileText },
            { type: 'video', name: 'Exit Planning Guide', icon: Video },
            { type: 'expert', name: 'M&A Specialist', icon: UserCheck }
          ]
        }
      ]
    }
  };

  const [userOKRs, setUserOKRs] = useState([
    { id: 1, objective: 'Validate product-market fit', keyResults: ['Interview 50 potential customers', 'Achieve 70% positive feedback'], progress: 60 },
    { id: 2, objective: 'Launch MVP', keyResults: ['Complete prototype', 'Get 100 beta users'], progress: 30 },
    { id: 3, objective: 'Generate first revenue', keyResults: ['Implement pricing strategy', 'Close 10 paying customers'], progress: 0 }
  ]);

  const [achievements, setAchievements] = useState([
    { id: 1, title: 'First Steps', description: 'Completed idea validation', icon: Star, unlocked: true, date: '2024-01-15' },
    { id: 2, title: 'Customer Focus', description: 'Interviewed 25+ customers', icon: Users, unlocked: true, date: '2024-01-20' },
    { id: 3, title: 'Market Researcher', description: 'Completed market analysis', icon: Globe, unlocked: false },
    { id: 4, title: 'MVP Builder', description: 'Launched first MVP', icon: Rocket, unlocked: false },
    { id: 5, title: 'Revenue Generator', description: 'Generated first $1K revenue', icon: DollarSign, unlocked: false }
  ]);

  const [recommendations, setRecommendations] = useState([
    {
      id: 1,
      title: 'Complete Market Research',
      description: 'Based on your current progress, focus on completing market analysis',
      priority: 'high',
      estimatedTime: '2-3 weeks',
      impact: 'High impact on reducing failure risk'
    },
    {
      id: 2,
      title: 'Connect with Product Strategist',
      description: 'Get expert guidance on your MVP planning',
      priority: 'medium',
      estimatedTime: '1 week',
      impact: 'Medium impact on development speed'
    },
    {
      id: 3,
      title: 'Start Beta Testing Plan',
      description: 'Prepare for user testing phase',
      priority: 'low',
      estimatedTime: '1-2 weeks',
      impact: 'Low impact but good preparation'
    }
  ]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'in-progress':
        return <Clock className="w-5 h-5 text-blue-600" />;
      case 'locked':
        return <Lock className="w-5 h-5 text-gray-400" />;
      default:
        return <Circle className="w-5 h-5 text-gray-300" />;
    }
  };

  const getPhaseProgress = (phase) => {
    const completed = phase.milestones.filter(m => m.status === 'completed').length;
    return (completed / phase.milestones.length) * 100;
  };

  const handleMilestoneClick = (milestone) => {
    setSelectedMilestone(milestone);
    setShowResourceModal(true);
  };

  const handleOKRUpdate = (okrId, newProgress) => {
    setUserOKRs(prev => prev.map(okr => 
      okr.id === okrId ? { ...okr, progress: newProgress } : okr
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Enhanced Header with Stats */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-200">
          <div className="relative">
            <div className="flex items-center justify-between mb-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-1">
                    My Startup Roadmap
                  </h1>
                <p className="text-gray-600">Your personalized journey to startup success</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setViewMode('roadmap')}
                  className={`px-4 py-2.5 rounded-xl font-medium transition-all ${
                    viewMode === 'roadmap' ? 'bg-blue-600 text-white shadow-sm' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Roadmap
                </button>
                <button
                  onClick={() => setViewMode('analytics')}
                  className={`px-4 py-2.5 rounded-xl font-medium transition-all ${
                    viewMode === 'analytics' ? 'bg-blue-600 text-white shadow-sm' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Analytics
                </button>
                <button
                  onClick={() => setTimelineView(!timelineView)}
                  className="p-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 transition-all"
                >
                  <Calendar className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-5 gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-5 border border-blue-200 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-medium text-blue-700">Current Level</div>
                  <Rocket className="w-4 h-4 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-blue-900">Level {currentLevel}</div>
                </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-5 border border-purple-200 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-medium text-purple-700">Overall Progress</div>
                  <TrendingUp className="w-4 h-4 text-purple-600" />
                </div>
                <div className="text-2xl font-bold text-purple-900">{progress.toFixed(1)}%</div>
              </div>
              <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-5 border border-amber-200 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-medium text-amber-700">Points Earned</div>
                  <Star className="w-4 h-4 text-amber-600" />
                </div>
                <div className="text-2xl font-bold text-amber-900">1,250</div>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-5 border border-orange-200 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-medium text-orange-700">Day Streak</div>
                  <Flame className="w-4 h-4 text-orange-600" />
                </div>
                <div className="text-2xl font-bold text-orange-900">{streak}</div>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-5 border border-green-200 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-medium text-green-700">Completed</div>
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
                <div className="text-2xl font-bold text-green-900">8</div>
              </div>
            </div>
          </div>
        </div>

        {/* AI Insights Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">AI-Powered Insights</h3>
              <p className="text-sm text-gray-600">You're 2 weeks ahead of schedule! Keep the momentum going.</p>
            </div>
            <button 
              onClick={() => setShowAIInsights(!showAIInsights)}
              className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-blue-700 transition-all shadow-sm hover:shadow"
            >
              View Insights
            </button>
              </div>
              </div>

        {/* Analytics View */}
        {viewMode === 'analytics' && (
          <div className="space-y-6 mb-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Progress Over Time Chart */}
              <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                    <LineChart className="w-6 h-6 text-blue-600" />
                    Progress Over Time
                  </h3>
                  <select className="px-4 py-2 border-2 border-gray-200 rounded-xl font-medium text-gray-700 hover:border-blue-500 transition-all">
                    <option>Last 30 days</option>
                    <option>Last 90 days</option>
                    <option>All time</option>
                  </select>
              </div>
                  <div className="relative h-64 flex items-end justify-between gap-2">
                  {[20, 35, 45, 52, 60, 70, 75, 82, 88, 95, 98, 100].map((value, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center gap-2">
                      <div className="w-full bg-blue-600 rounded-t-lg relative group hover:bg-blue-700 transition-all cursor-pointer" style={{ height: `${value}%` }}>
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-2 py-1 rounded text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          {value}%
            </div>
                      </div>
                      <span className="text-xs text-gray-500 font-medium">W{index + 1}</span>
                    </div>
                  ))}
          </div>
        </div>

              {/* Key Metrics */}
              <div className="space-y-4">
                <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-xl p-6 text-white">
                <div className="flex items-center justify-between mb-2">
                    <TrendingUp className="w-8 h-8" />
                    <span className="text-sm font-semibold bg-white/20 px-3 py-1 rounded-full">+12%</span>
                </div>
                  <div className="text-3xl font-bold mb-1">24</div>
                  <div className="text-sm opacity-90">Tasks Completed</div>
              </div>
                <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-xl p-6 text-white">
                <div className="flex items-center justify-between mb-2">
                    <Clock className="w-8 h-8" />
                    <span className="text-sm font-semibold bg-white/20 px-3 py-1 rounded-full">-8%</span>
                </div>
                  <div className="text-3xl font-bold mb-1">4.2h</div>
                  <div className="text-sm opacity-90">Avg. Time/Task</div>
              </div>
                <div className="bg-blue-600 rounded-2xl shadow-xl p-6 text-white">
                <div className="flex items-center justify-between mb-2">
                    <Target className="w-8 h-8" />
                    <span className="text-sm font-semibold bg-white/20 px-3 py-1 rounded-full">85%</span>
                </div>
                  <div className="text-3xl font-bold mb-1">17/20</div>
                  <div className="text-sm opacity-90">Goals Hit Rate</div>
              </div>
              </div>
            </div>

            {/* Phase Distribution & Activity Heatmap */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <PieChart className="w-6 h-6 text-blue-600" />
                  Phase Distribution
                </h3>
                <div className="space-y-4">
                  {Object.entries(phases).map(([key, phase], index) => {
                    const colors = ['blue', 'purple', 'pink', 'amber'];
                    const color = colors[index];
                    const phaseProgress = getPhaseProgress(phase);
                    return (
                      <div key={key}>
                <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className={`w-3 h-3 rounded-full bg-${color}-500`}></div>
                            <span className="font-medium text-gray-900">{phase.name}</span>
                </div>
                          <span className="text-sm font-bold text-gray-700">{phaseProgress.toFixed(0)}%</span>
              </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className={`bg-${color}-500 h-2 rounded-full transition-all`} style={{ width: `${phaseProgress}%` }}></div>
            </div>
                      </div>
                    );
                  })}
          </div>
        </div>

              <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Activity className="w-6 h-6 text-blue-600" />
                  Activity Heatmap
                </h3>
                <div className="space-y-2">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, dayIndex) => (
                    <div key={day} className="flex items-center gap-2">
                      <span className="text-xs font-medium text-gray-600 w-8">{day}</span>
                      <div className="flex gap-1 flex-1">
                        {Array.from({ length: 12 }).map((_, weekIndex) => {
                          const intensity = Math.random();
                          return (
                            <div
                              key={weekIndex}
                              className={`flex-1 aspect-square rounded ${
                                intensity > 0.7 ? 'bg-blue-600' :
                                intensity > 0.4 ? 'bg-blue-400' :
                                intensity > 0.2 ? 'bg-blue-200' :
                                'bg-gray-100'
                              } hover:scale-110 transition-transform cursor-pointer`}
                              title={`${day} Week ${weekIndex + 1}`}
                            />
                          );
                        })}
          </div>
              </div>
                  ))}
              </div>
                <div className="flex items-center justify-between mt-4 text-xs text-gray-500">
                  <span>Less</span>
                  <div className="flex gap-1">
                    <div className="w-3 h-3 bg-gray-100 rounded"></div>
                    <div className="w-3 h-3 bg-blue-200 rounded"></div>
                    <div className="w-3 h-3 bg-blue-400 rounded"></div>
                    <div className="w-3 h-3 bg-blue-600 rounded"></div>
            </div>
                  <span>More</span>
                </div>
          </div>
        </div>

            {/* Leaderboard & Comparison */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Trophy className="w-6 h-6 text-blue-600" />
                  Community Leaderboard
                </h3>
                <div className="space-y-3">
                  {[
                    { name: 'Sarah Chen', points: 3250, rank: 1 },
                    { name: 'Mike Johnson', points: 2890, rank: 2 },
                    { name: 'You', points: 1250, rank: 3, isYou: true },
                    { name: 'Emma Davis', points: 1120, rank: 4 },
                    { name: 'Alex Kumar', points: 980, rank: 5 }
                  ].map((user) => (
                    <div key={user.rank} className={`flex items-center gap-4 p-4 rounded-xl border-2 ${
                      user.isYou ? 'border-blue-300 bg-blue-50' : 'border-gray-100 bg-white'
                    }`}>
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg ${
                        user.rank <= 3 ? 'bg-blue-600 text-white' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        {user.rank}
                      </div>
                      <div className="flex-1">
                        <div className={`font-bold ${user.isYou ? 'text-blue-600' : 'text-gray-900'}`}>
                          {user.name}
                        </div>
                        <div className="text-sm text-gray-600">{user.points} points</div>
                      </div>
                      {user.isYou && <span className="text-xs font-bold text-blue-600 px-2 py-1 bg-blue-100 rounded-full">YOU</span>}
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <BarChart3 className="w-6 h-6 text-blue-600" />
                  You vs Average
                </h3>
                <div className="space-y-6">
                  {[
                    { metric: 'Tasks Completed', you: 24, avg: 18 },
                    { metric: 'Points Earned', you: 1250, avg: 980 },
                    { metric: 'Streak Days', you: 12, avg: 8 },
                    { metric: 'Resources Used', you: 15, avg: 12 }
                  ].map((item) => (
                    <div key={item.metric}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900">{item.metric}</span>
                        <span className="text-sm font-bold text-green-600">+{Math.round((item.you / item.avg - 1) * 100)}%</span>
                      </div>
                      <div className="relative h-8 bg-gray-100 rounded-lg overflow-hidden">
                        <div className="absolute h-full bg-blue-200 rounded-lg" style={{ width: `${(item.avg / item.you) * 100}%` }}></div>
                        <div className="absolute h-full bg-blue-600 rounded-lg" style={{ width: `${(item.you / item.you) * 100}%` }}></div>
                        <div className="absolute inset-0 flex items-center justify-between px-3">
                          <span className="text-xs font-bold text-white">You: {item.you}</span>
                          <span className="text-xs font-medium text-gray-600">Avg: {item.avg}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Roadmap */}
          <div className={`${viewMode === 'analytics' ? 'lg:col-span-3' : 'lg:col-span-2'} space-y-6`}>
            {/* Interactive Timeline */}
            {timelineView && (
              <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <MapPin className="w-6 h-6 text-blue-600" />
                  Timeline View
                </h2>
                <div className="relative">
                  <div className="absolute left-8 top-0 bottom-0 w-1 bg-blue-600"></div>
                  {Object.entries(phases).map(([phaseKey, phase], index) => {
                    const phaseProgress = getPhaseProgress(phase);
                    const isActive = phaseProgress > 0 && phaseProgress < 100;
                    const isCompleted = phaseProgress === 100;
                    return (
                      <div key={phaseKey} className="relative pl-20 pb-12">
                        <div className={`absolute left-5 w-8 h-8 rounded-full border-4 border-white ${
                          isCompleted ? 'bg-blue-600' : isActive ? 'bg-blue-600 animate-pulse' : 'bg-gray-300'
                        } shadow-lg`}>
                          {isCompleted && <CheckCircle className="w-4 h-4 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />}
                        </div>
                        <div className="bg-white border-2 border-gray-100 rounded-xl p-4 hover:shadow-lg transition-all cursor-pointer">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-bold text-lg text-gray-900">{phase.name}</h3>
                            <span className="text-sm font-semibold px-3 py-1 rounded-full bg-blue-100 text-blue-600">
                              {phaseProgress}%
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">{phase.description}</p>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <Calendar className="w-4 h-4" />
                            <span>Est. {2 + index * 3} weeks</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Enhanced Phase Progress */}
            {!timelineView && (
              <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                    <Rocket className="w-6 h-6 text-blue-600" />
                    Your Journey
                  </h2>
                  <button 
                    onClick={() => setTimelineView(true)}
                    className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1"
                  >
                    <MapPin className="w-4 h-4" />
                    Timeline View
                  </button>
                </div>
              <div className="space-y-4">
                  {Object.entries(phases).map(([phaseKey, phase]) => {
                    const phaseProgress = getPhaseProgress(phase);
                    const isExpanded = expandedPhase === phaseKey;
                    const isCompleted = phaseProgress === 100;
                    const isActive = phaseProgress > 0 && phaseProgress < 100;
                    const isLocked = phaseProgress === 0;
                    
                    return (
                      <div key={phaseKey} className={`border-2 rounded-xl p-5 hover:shadow-lg transition-all ${
                        isCompleted ? 'border-green-200 bg-gradient-to-br from-green-50 to-green-100' :
                        isActive ? 'border-blue-300 bg-gradient-to-br from-blue-50 to-blue-100' :
                        'border-gray-200 bg-gradient-to-br from-gray-50 to-gray-100'
                      }`}>
                        <div 
                          className="flex items-center justify-between mb-3 cursor-pointer"
                          onClick={() => setExpandedPhase(isExpanded ? null : phaseKey)}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-lg ${
                              isCompleted ? 'bg-green-600' :
                              isActive ? 'bg-blue-600 animate-pulse' :
                              'bg-gray-400'
                            }`}>
                              {isCompleted ? (
                                <CheckCircle className="w-6 h-6 text-white" />
                              ) : isActive ? (
                                <Activity className="w-6 h-6 text-white" />
                              ) : (
                                <Lock className="w-6 h-6 text-gray-200" />
                              )}
                            </div>
                      <div>
                              <div className="flex items-center gap-2">
                                <h3 className={`font-bold text-lg ${
                                  isCompleted ? 'text-green-900' :
                                  isActive ? 'text-blue-900' :
                                  'text-gray-600'
                                }`}>{phase.name}</h3>
                                {isActive && (
                                  <span className="px-2 py-0.5 bg-blue-600 text-white text-xs font-bold rounded-full animate-pulse">
                                    Active
                                  </span>
                                )}
                              </div>
                        <p className={`text-sm ${
                          isCompleted ? 'text-green-700' :
                          isActive ? 'text-blue-700' :
                          'text-gray-500'
                        }`}>{phase.description}</p>
                      </div>
                          </div>
                          <div className="flex items-center gap-4">
                      <div className="text-right">
                              <div className={`text-2xl font-bold ${
                                isCompleted ? 'text-green-600' :
                                isActive ? 'text-blue-600' :
                                'text-gray-400'
                              }`}>
                                {phaseProgress.toFixed(0)}%
                        </div>
                        <div className="text-xs text-gray-600 font-medium">Complete</div>
                      </div>
                            {isExpanded ? <ChevronUp className="w-5 h-5 text-gray-600" /> : <ChevronDown className="w-5 h-5 text-gray-600" />}
                    </div>
                    </div>
                        <div className="w-full bg-gray-200 rounded-full h-3 mb-3 overflow-hidden">
                          <div 
                            className={`h-3 rounded-full transition-all duration-500 ${
                              isCompleted ? 'bg-gradient-to-r from-green-600 to-green-500' :
                              isActive ? 'bg-gradient-to-r from-blue-600 to-blue-500' :
                              'bg-gray-300'
                            }`}
                            style={{ width: `${phaseProgress}%` }}
                          >
                    </div>
                        </div>
                        {isExpanded && (
                          <div className="mt-4 space-y-2 animate-in slide-in-from-top">
                            {phase.milestones.map((milestone) => (
                              <div key={milestone.id} className={`flex items-center gap-2 p-2 rounded-lg transition-colors ${
                                milestone.status === 'completed' ? 'bg-green-50 hover:bg-green-100' :
                                milestone.status === 'in-progress' ? 'bg-blue-50 hover:bg-blue-100' :
                                'bg-gray-50 hover:bg-gray-100'
                              }`}>
                                {getStatusIcon(milestone.status)}
                                <span className={`text-sm font-medium ${
                                  milestone.status === 'completed' ? 'text-green-900' :
                                  milestone.status === 'in-progress' ? 'text-blue-900' :
                                  'text-gray-600'
                                }`}>{milestone.title}</span>
                                <span className="ml-auto text-xs font-bold text-amber-600 bg-amber-100 px-2 py-1 rounded-full">{milestone.points} pts</span>
                  </div>
                ))}
              </div>
                        )}
            </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Current Phase Milestones - Enhanced */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <Target className="w-6 h-6 text-blue-600" />
                {phases[activePhase].name} - Milestones
              </h2>
                <select 
                  value={activePhase}
                  onChange={(e) => setActivePhase(e.target.value)}
                  className="px-4 py-2 border-2 border-gray-200 rounded-xl font-medium text-gray-700 hover:border-blue-500 transition-all"
                >
                  {Object.entries(phases).map(([key, phase]) => (
                    <option key={key} value={key}>{phase.name}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-4">
                {phases[activePhase].milestones.map((milestone, index) => (
                  <div 
                    key={milestone.id}
                    className={`border-2 rounded-xl p-5 hover:shadow-xl transition-all cursor-pointer group ${
                      milestone.status === 'completed' ? 'border-green-200 bg-gradient-to-br from-green-50 to-white hover:border-green-300' :
                      milestone.status === 'in-progress' ? 'border-blue-300 bg-gradient-to-br from-blue-50 to-white hover:border-blue-400' :
                      'border-gray-200 bg-gradient-to-br from-gray-50 to-white hover:border-gray-300'
                    }`}
                    onClick={() => handleMilestoneClick(milestone)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <div className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform ${
                          milestone.status === 'completed' ? 'bg-green-600' :
                          milestone.status === 'in-progress' ? 'bg-blue-600 animate-pulse' :
                          'bg-gray-300'
                        }`}>
                        {milestone.status === 'completed' ? (
                          <CheckCircle className="w-7 h-7 text-white" />
                        ) : milestone.status === 'in-progress' ? (
                          <Clock className="w-7 h-7 text-white" />
                        ) : (
                          <Lock className="w-7 h-7 text-gray-100" />
                        )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className={`font-bold text-lg ${
                              milestone.status === 'completed' ? 'text-green-900' :
                              milestone.status === 'in-progress' ? 'text-blue-900' :
                              'text-gray-600'
                            }`}>{milestone.title}</h3>
                            {milestone.status === 'completed' && (
                              <span className="px-2.5 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                                ✓ Complete
                              </span>
                            )}
                            {milestone.status === 'in-progress' && (
                              <span className="px-2.5 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">
                                In Progress
                              </span>
                            )}
                            {milestone.status === 'locked' && (
                              <span className="px-2.5 py-1 bg-gray-200 text-gray-600 text-xs font-bold rounded-full">
                                🔒 Locked
                              </span>
                            )}
                      </div>
                          <p className={`text-sm mb-3 ${
                            milestone.status === 'completed' ? 'text-green-700' :
                            milestone.status === 'in-progress' ? 'text-blue-700' :
                            'text-gray-500'
                          }`}>{milestone.description}</p>
                          <div className="flex items-center gap-4 flex-wrap">
                            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-amber-100 rounded-full">
                              <Star className="w-4 h-4 text-amber-600" />
                              <span className="font-bold text-sm text-amber-700">{milestone.points} pts</span>
                      </div>
                            <div className="flex items-center gap-1.5 text-sm text-gray-600">
                              <BookOpen className="w-4 h-4" />
                              <span className="font-medium">{milestone.resources.length} resources</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-sm text-gray-600">
                              <Timer className="w-4 h-4" />
                              <span className="font-medium">~{1 + index} weeks</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <ArrowRight className={`w-5 h-5 transition-all ${
                        milestone.status === 'completed' ? 'text-green-400 group-hover:text-green-600' :
                        milestone.status === 'in-progress' ? 'text-blue-400 group-hover:text-blue-600' :
                        'text-gray-300 group-hover:text-gray-400'
                      } group-hover:translate-x-1`} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar - Hidden in analytics mode */}
          {viewMode === 'roadmap' && (
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <h3 className="text-lg font-bold mb-4 text-gray-900">
                Quick Actions
              </h3>
              <div className="space-y-2">
                <button className="w-full bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl p-3 text-left font-medium transition-all flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Add New OKR
                </button>
                <button className="w-full bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-xl p-3 text-left font-medium transition-all flex items-center gap-2">
                  <Share2 className="w-4 h-4" />
                  Share Progress
                </button>
                <button className="w-full bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-xl p-3 text-left font-medium transition-all flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Export Roadmap
                </button>
              </div>
            </div>

            {/* Enhanced OKRs */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Target className="w-5 h-5 text-blue-600" />
                  Your OKRs
                </h3>
                <button 
                  onClick={() => setShowOKRModal(true)}
                  className="text-blue-600 hover:text-blue-700 text-sm font-semibold flex items-center gap-1"
                >
                  <Edit3 className="w-4 h-4" />
                  Edit
                </button>
              </div>
              <div className="space-y-4">
                {userOKRs.map((okr) => (
                  <div key={okr.id} className="border-2 border-gray-100 rounded-xl p-4 hover:shadow-lg transition-all bg-gradient-to-br from-white to-gray-50">
                    <h4 className="font-bold text-gray-900 mb-3">{okr.objective}</h4>
                    <div className="space-y-2 mb-4">
                      {okr.keyResults.map((kr, index) => (
                        <div key={index} className="text-sm text-gray-700 flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                          <span>{kr}</span>
                        </div>
                      ))}
                    </div>
                    <div className="relative">
                      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div 
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500 relative"
                        style={{ width: `${okr.progress}%` }}
                        >
                          <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                    </div>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs font-semibold text-gray-600">{okr.progress}% Complete</span>
                        {okr.progress >= 70 && (
                          <span className="text-xs font-semibold text-green-600 flex items-center gap-1">
                            <TrendingUp className="w-3 h-3" />
                            On Track
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Enhanced Achievements */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Award className="w-5 h-5 text-blue-600" />
                  Achievements
                </h3>
                <span className="text-sm font-semibold text-gray-500">
                  {achievements.filter(a => a.unlocked).length}/{achievements.length}
                </span>
              </div>
              <div className="space-y-3">
                {achievements.map((achievement) => (
                  <div 
                    key={achievement.id} 
                    className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all cursor-pointer ${
                      achievement.unlocked 
                        ? 'bg-blue-50 border-blue-200 hover:shadow-lg' 
                        : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      achievement.unlocked ? 'bg-blue-600' : 'bg-gray-300'
                    } shadow-lg`}>
                      <achievement.icon className={`w-6 h-6 ${
                        achievement.unlocked ? 'text-white' : 'text-gray-500'
                    }`} />
                    </div>
                    <div className="flex-1">
                      <div className={`font-bold text-sm ${
                        achievement.unlocked ? 'text-gray-900' : 'text-gray-500'
                      }`}>
                        {achievement.title}
                      </div>
                      <div className={`text-xs mt-0.5 ${
                        achievement.unlocked ? 'text-gray-600' : 'text-gray-400'
                      }`}>
                        {achievement.description}
                      </div>
                      {achievement.unlocked && achievement.date && (
                        <div className="text-xs text-blue-600 mt-1 font-medium">
                          Unlocked {achievement.date}
                    </div>
                      )}
                    </div>
                    {achievement.unlocked && (
                      <Sparkles className="w-5 h-5 text-blue-600 animate-pulse" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Enhanced Recommendations */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-blue-600" />
                  Smart Recommendations
                </h3>
                <Brain className="w-5 h-5 text-blue-600" />
              </div>
              <div className="space-y-3">
                {recommendations.map((rec) => (
                  <div key={rec.id} className="border-2 border-gray-100 rounded-xl p-4 hover:shadow-lg transition-all bg-gradient-to-br from-white to-gray-50 cursor-pointer group">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{rec.title}</h4>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-sm ${
                        rec.priority === 'high' ? 'bg-blue-600 text-white' :
                        rec.priority === 'medium' ? 'bg-blue-100 text-blue-600' :
                        'bg-gray-100 text-black'
                      }`}>
                        {rec.priority.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{rec.description}</p>
                    <div className="flex items-center gap-3 text-xs">
                      <div className="flex items-center gap-1 text-gray-500">
                        <Timer className="w-3 h-3" />
                        <span>{rec.estimatedTime}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-500">
                        <TrendingUp className="w-3 h-3" />
                        <span>{rec.impact.replace('impact', '').trim()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mentorship Section */}
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-xl p-6 text-white">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6" />
          </div>
                <div>
                  <h3 className="font-bold text-lg">Need Help?</h3>
                  <p className="text-sm opacity-90">Connect with a mentor</p>
                </div>
              </div>
              <button className="w-full bg-white text-green-600 font-bold py-3 px-4 rounded-xl hover:bg-gray-50 transition-all shadow-lg">
                Find a Mentor
              </button>
            </div>
          </div>
          )}
        </div>
      </div>

      {/* Enhanced Resource Modal */}
      {showResourceModal && selectedMilestone && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl p-8 max-w-3xl w-full mx-4 max-h-[85vh] overflow-y-auto shadow-2xl border border-gray-100">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
                  selectedMilestone.status === 'completed' ? 'bg-green-500' :
                  selectedMilestone.status === 'in-progress' ? 'bg-blue-500' :
                  'bg-gray-300'
                } shadow-lg`}>
                  {getStatusIcon(selectedMilestone.status)}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{selectedMilestone.title}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm text-gray-500 capitalize">{selectedMilestone.status.replace('-', ' ')}</span>
                    <span className="text-gray-300">•</span>
                    <span className="text-sm font-semibold text-blue-600">{selectedMilestone.points} points</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setShowResourceModal(false)}
                className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-all"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            
            <p className="text-gray-700 mb-8 text-lg">{selectedMilestone.description}</p>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                  Resources to Help You
                </h4>
                <span className="text-sm text-gray-500">{selectedMilestone.resources.length} available</span>
              </div>
              <div className="grid grid-cols-1 gap-3">
              {selectedMilestone.resources.map((resource, index) => (
                  <div key={index} className="border-2 border-gray-100 rounded-xl p-5 hover:shadow-lg hover:border-blue-300 transition-all cursor-pointer group bg-gradient-to-br from-white to-gray-50">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <resource.icon className="w-7 h-7 text-white" />
                      </div>
                    <div className="flex-1">
                        <div className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors text-lg">{resource.name}</div>
                        <div className="text-sm text-gray-600 capitalize flex items-center gap-2 mt-1">
                          <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                            {resource.type}
                          </span>
                          <span className="text-xs text-gray-500">• Click to access</span>
                    </div>
                      </div>
                      <ArrowRight className="w-6 h-6 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t-2 border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">{selectedMilestone.points}</div>
                    <div className="text-sm text-gray-500 font-medium">Points</div>
                </div>
                  <div className="h-12 w-px bg-gray-300"></div>
                  <div className="text-sm text-gray-600">
                    <div className="font-semibold text-gray-900">Complete this milestone to:</div>
                    <ul className="mt-1 space-y-0.5">
                      <li className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-amber-500" />
                        <span>Earn {selectedMilestone.points} XP</span>
                      </li>
                      <li className="flex items-center gap-1">
                        <Trophy className="w-3 h-3 text-amber-500" />
                        <span>Unlock next milestone</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button 
                    onClick={() => setShowResourceModal(false)}
                    className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-all"
                  >
                    Close
                  </button>
                  <button 
                    onClick={() => {
                      setShowCelebration(true);
                      setTimeout(() => setShowCelebration(false), 3000);
                    }}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:shadow-xl transition-all flex items-center gap-2"
                  >
                    <CheckCircle className="w-5 h-5" />
                  Mark Complete
                </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Celebration Modal */}
      {showCelebration && (
        <div className="fixed inset-0 bg-gradient-to-br from-blue-600/90 via-purple-600/90 to-pink-600/90 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-300">
          <div className="text-center text-white p-12 animate-in zoom-in duration-500">
            <div className="mb-6 animate-bounce">
              <PartyPopper className="w-32 h-32 mx-auto" />
            </div>
            <h2 className="text-6xl font-bold mb-4">Congratulations!</h2>
            <p className="text-2xl mb-6">You've completed a milestone! 🎉</p>
            <div className="flex items-center justify-center gap-8 text-xl">
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6">
                <div className="text-4xl font-bold">+{selectedMilestone?.points}</div>
                <div className="text-sm opacity-90">Points Earned</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6">
                <div className="text-4xl font-bold">🔥</div>
                <div className="text-sm opacity-90">Keep Going!</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AI Insights Modal */}
      {showAIInsights && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl p-8 max-w-4xl w-full mx-4 max-h-[85vh] overflow-y-auto shadow-2xl border border-gray-100">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">AI-Powered Insights</h3>
                  <p className="text-gray-600">Personalized recommendations based on your progress</p>
                </div>
              </div>
              <button 
                onClick={() => setShowAIInsights(false)}
                className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-all"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Performance Analysis */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-green-500 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900">Outstanding Performance! 🎉</h4>
                </div>
                <p className="text-gray-700 mb-3">You're progressing 35% faster than similar founders at your stage. Keep up the great work!</p>
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-white rounded-xl p-3 text-center">
                    <div className="text-2xl font-bold text-green-600">+35%</div>
                    <div className="text-xs text-gray-600">Faster</div>
                  </div>
                  <div className="bg-white rounded-xl p-3 text-center">
                    <div className="text-2xl font-bold text-blue-600">12</div>
                    <div className="text-xs text-gray-600">Day Streak</div>
                  </div>
                  <div className="bg-white rounded-xl p-3 text-center">
                    <div className="text-2xl font-bold text-purple-600">95%</div>
                    <div className="text-xs text-gray-600">On Time</div>
                  </div>
                </div>
              </div>

              {/* Smart Recommendations */}
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-4">Priority Actions</h4>
                <div className="space-y-3">
                  {[
                    {
                      title: 'Complete Market Research',
                      priority: 'High',
                      reason: 'This will unlock 3 new milestones and give you 150 bonus points',
                      color: 'red'
                    },
                    {
                      title: 'Connect with Sarah Chen',
                      priority: 'Medium',
                      reason: 'She completed similar milestones and can provide valuable insights',
                      color: 'amber'
                    },
                    {
                      title: 'Schedule MVP Review',
                      priority: 'Low',
                      reason: 'Plan ahead for your next phase transition',
                      color: 'green'
                    }
                  ].map((action, index) => (
                    <div key={index} className="border-2 border-gray-100 rounded-xl p-4 hover:shadow-lg transition-all">
                      <div className="flex items-start justify-between mb-2">
                        <h5 className="font-bold text-gray-900">{action.title}</h5>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          action.color === 'red' ? 'bg-red-100 text-red-700' :
                          action.color === 'amber' ? 'bg-amber-100 text-amber-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {action.priority}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{action.reason}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Predictive Analytics */}
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 border-2 border-blue-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900">Predictions & Forecasts</h4>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Estimated MVP Launch</div>
                    <div className="text-2xl font-bold text-blue-600">6 weeks</div>
                    <div className="text-xs text-green-600 font-medium mt-1">2 weeks ahead of average</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Next Level Up</div>
                    <div className="text-2xl font-bold text-purple-600">5 days</div>
                    <div className="text-xs text-gray-500 font-medium mt-1">Complete 2 more tasks</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t-2 border-gray-100 flex justify-end">
              <button 
                onClick={() => setShowAIInsights(false)}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:shadow-xl transition-all"
              >
                Got it, thanks!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StartupRoadmap;
