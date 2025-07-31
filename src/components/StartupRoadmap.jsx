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
  Circle
} from 'lucide-react';

const StartupRoadmap = () => {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [progress, setProgress] = useState(0);
  const [activePhase, setActivePhase] = useState('ideation');
  const [showOKRModal, setShowOKRModal] = useState(false);
  const [showResourceModal, setShowResourceModal] = useState(false);
  const [selectedMilestone, setSelectedMilestone] = useState(null);

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
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'in-progress':
        return <Clock className="w-5 h-5 text-blue-500" />;
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Startup Roadmap</h1>
              <p className="text-gray-600 mt-2">Your personalized journey to startup success</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">Level {currentLevel}</div>
                <div className="text-sm text-gray-500">Current Level</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{progress}%</div>
                <div className="text-sm text-gray-500">Overall Progress</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">1,250</div>
                <div className="text-sm text-gray-500">Points Earned</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Roadmap */}
          <div className="lg:col-span-2 space-y-6">
            {/* Phase Progress */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Journey</h2>
              <div className="space-y-4">
                {Object.entries(phases).map(([phaseKey, phase]) => (
                  <div key={phaseKey} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-900">{phase.name}</h3>
                        <p className="text-sm text-gray-600">{phase.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-blue-600">
                          {getPhaseProgress(phase)}%
                        </div>
                        <div className="text-xs text-gray-500">Complete</div>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${getPhaseProgress(phase)}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Current Phase Milestones */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                {phases[activePhase].name} - Milestones
              </h2>
              <div className="space-y-4">
                {phases[activePhase].milestones.map((milestone) => (
                  <div 
                    key={milestone.id}
                    className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => handleMilestoneClick(milestone)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {getStatusIcon(milestone.status)}
                        <div>
                          <h3 className="font-semibold text-gray-900">{milestone.title}</h3>
                          <p className="text-sm text-gray-600">{milestone.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-purple-600">{milestone.points}</div>
                        <div className="text-xs text-gray-500">Points</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* OKRs */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Your OKRs</h3>
                <button 
                  onClick={() => setShowOKRModal(true)}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  Edit
                </button>
              </div>
              <div className="space-y-4">
                {userOKRs.map((okr) => (
                  <div key={okr.id} className="border rounded-lg p-3">
                    <h4 className="font-medium text-gray-900 mb-2">{okr.objective}</h4>
                    <div className="space-y-1 mb-3">
                      {okr.keyResults.map((kr, index) => (
                        <div key={index} className="text-sm text-gray-600 flex items-center">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                          {kr}
                        </div>
                      ))}
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${okr.progress}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{okr.progress}% Complete</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Achievements</h3>
              <div className="space-y-3">
                {achievements.map((achievement) => (
                  <div 
                    key={achievement.id} 
                    className={`flex items-center space-x-3 p-3 rounded-lg ${
                      achievement.unlocked ? 'bg-green-50 border border-green-200' : 'bg-gray-50 border border-gray-200'
                    }`}
                  >
                    <achievement.icon className={`w-5 h-5 ${
                      achievement.unlocked ? 'text-green-600' : 'text-gray-400'
                    }`} />
                    <div className="flex-1">
                      <div className={`font-medium ${
                        achievement.unlocked ? 'text-green-900' : 'text-gray-500'
                      }`}>
                        {achievement.title}
                      </div>
                      <div className={`text-sm ${
                        achievement.unlocked ? 'text-green-700' : 'text-gray-400'
                      }`}>
                        {achievement.description}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Smart Recommendations</h3>
              <div className="space-y-4">
                {recommendations.map((rec) => (
                  <div key={rec.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{rec.title}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        rec.priority === 'high' ? 'bg-red-100 text-red-800' :
                        rec.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {rec.priority}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{rec.description}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>⏱️ {rec.estimatedTime}</span>
                      <span>🎯 {rec.impact}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Resource Modal */}
      {showResourceModal && selectedMilestone && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-900">{selectedMilestone.title}</h3>
              <button 
                onClick={() => setShowResourceModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            <p className="text-gray-600 mb-6">{selectedMilestone.description}</p>
            
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Resources to Help You</h4>
              {selectedMilestone.resources.map((resource, index) => (
                <div key={index} className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <resource.icon className="w-5 h-5 text-blue-600" />
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{resource.name}</div>
                      <div className="text-sm text-gray-500 capitalize">{resource.type}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-lg font-bold text-purple-600">{selectedMilestone.points} Points</div>
                  <div className="text-sm text-gray-500">Complete to earn points</div>
                </div>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                  Mark Complete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StartupRoadmap; 