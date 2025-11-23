import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Target, TrendingUp, Zap, Brain, AlertTriangle, CheckCircle,
  Clock, Calendar, Users, Plus, Edit, Trash2, X, Save, ChevronRight,
  Activity, BarChart3, Lightbulb, Flag, Rocket, Award, PlayCircle,
  PauseCircle, RefreshCw, ArrowRight, ChevronDown, ChevronUp, Eye,
  Settings, Filter, Search, Download, Share2, Copy, Link as LinkIcon,
  GitBranch, Layers, Shield, Wind, Flame, Droplet, Gauge, TrendingDown,
  UserPlus, MessageSquare, FileText, DollarSign, Briefcase, Box, Sparkles
} from 'lucide-react';

const Impacts = () => {
  const [activeTab, setActiveTab] = useState('strategy');
  const [objectives, setObjectives] = useState([]);
  const [selectedObjective, setSelectedObjective] = useState(null);
  const [showObjectiveModal, setShowObjectiveModal] = useState(false);
  const [showInitiativeModal, setShowInitiativeModal] = useState(false);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showRecalibrationModal, setShowRecalibrationModal] = useState(false);
  const [showKPIModal, setShowKPIModal] = useState(false);
  const [showKeyResultModal, setShowKeyResultModal] = useState(false);
  const [showTeamAssignModal, setShowTeamAssignModal] = useState(false);
  const [showMilestoneModal, setShowMilestoneModal] = useState(false);
  const [selectedInitiative, setSelectedInitiative] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedKPI, setSelectedKPI] = useState(null);
  const [selectedKeyResult, setSelectedKeyResult] = useState(null);
  const [aiRecommendations, setAiRecommendations] = useState([]);
  const [lastRecalibration, setLastRecalibration] = useState(new Date());
  const [recalibrationMode, setRecalibrationMode] = useState('weekly');
  const [editMode, setEditMode] = useState(false);
  const [currentObjectiveId, setCurrentObjectiveId] = useState(null);
  const [currentInitiativeId, setCurrentInitiativeId] = useState(null);
  
  // Form states
  const [objectiveForm, setObjectiveForm] = useState({
    title: '',
    description: '',
    timeline: '12',
    priority: 'high',
    metrics: { target: '', current: '' }
  });

  const [initiativeForm, setInitiativeForm] = useState({
    title: '',
    description: '',
    effort: 'medium',
    impact: 'high',
    timeline: 6
  });

  const [projectForm, setProjectForm] = useState({
    title: '',
    startDate: new Date().toISOString().split('T')[0],
    dueDate: '',
    assignees: []
  });

  const [kpiForm, setKPIForm] = useState({
    name: '',
    type: 'leading',
    target: '',
    current: ''
  });

  const [keyResultForm, setKeyResultForm] = useState({
    title: '',
    target: '',
    current: ''
  });

  const [milestoneForm, setMilestoneForm] = useState({
    title: '',
    date: '',
    description: ''
  });

  const [teamMembers] = useState([
    { id: 1, name: 'Sarah Chen', role: 'CEO', avatar: 'SC', available: true },
    { id: 2, name: 'Mike Johnson', role: 'CTO', avatar: 'MJ', available: true },
    { id: 3, name: 'Emma Davis', role: 'Head of Sales', avatar: 'ED', available: true },
    { id: 4, name: 'Alex Kumar', role: 'Product Lead', avatar: 'AK', available: false },
    { id: 5, name: 'Lisa Wang', role: 'Marketing', avatar: 'LW', available: true },
    { id: 6, name: 'Tom Rodriguez', role: 'Engineer', avatar: 'TR', available: true },
    { id: 7, name: 'Nina Patel', role: 'Designer', avatar: 'NP', available: true },
    { id: 8, name: 'James Kim', role: 'Customer Success', avatar: 'JK', available: true }
  ]);

  useEffect(() => {
    // Only load mock data on initial mount
    if (objectives.length === 0) {
      const mockObjectives = [
        {
          id: 1,
          title: 'Reach $1M ARR',
          description: 'Scale revenue to $1M annual recurring revenue',
          timeline: 12,
          priority: 'high',
          status: 'active',
          health: 72,
          progress: 45,
          metrics: { target: '$1,000,000', current: '$450,000' },
          createdAt: '2025-01-15',
        initiatives: [
          {
            id: 1,
            title: 'Enterprise Sales Motion',
            description: 'Build dedicated enterprise sales team and process',
            effort: 'high',
            impact: 'high',
            timeline: 9,
            probability: 75,
            status: 'in_progress',
            aiGenerated: true,
            dependencies: [],
            resources: { team: 3, budget: '$120K' },
            projects: [
              {
                id: 1,
                title: 'Hire & Onboard Sales Team',
                keyResults: [
                  { id: 1, title: 'Hire 1 Account Executive', progress: 80, target: '1 hire', current: 'Offer sent', weight: 0.4 },
                  { id: 2, title: 'Hire 2 SDRs', progress: 40, target: '2 hires', current: '3 interviews', weight: 0.3 },
                  { id: 3, title: 'Setup CRM & Tools', progress: 100, target: 'Complete', current: 'Done', weight: 0.3 }
                ],
                kpis: [
                  { id: 1, name: 'Demos Booked', type: 'leading', target: 40, current: 28, trend: 'up', health: 'warning', unit: 'count' },
                  { id: 2, name: 'Pipeline Value', type: 'leading', target: 500000, current: 320000, trend: 'up', health: 'good', unit: 'currency' },
                  { id: 3, name: 'Deals Closed', type: 'lagging', target: 5, current: 2, trend: 'neutral', health: 'good', unit: 'count' },
                  { id: 4, name: 'Win Rate', type: 'lagging', target: 25, current: 22, trend: 'up', health: 'good', unit: 'percent' }
                ],
                assignees: [1, 3],
                status: 'in_progress',
                progress: 73,
                startDate: '2025-01-15',
                dueDate: '2025-04-15',
                milestones: [
                  { id: 1, title: 'Team Hired', date: '2025-03-01', completed: false, description: 'All sales positions filled' },
                  { id: 2, title: 'First Enterprise Deal', date: '2025-03-15', completed: false, description: 'Close first $50K+ deal' },
                  { id: 3, title: 'Process Documented', date: '2025-04-01', completed: false, description: 'Sales playbook complete' }
                ]
              }
            ]
          },
          {
            id: 2,
            title: 'Product-Led Growth Motion',
            description: 'Enable self-service signup and viral loops',
            effort: 'medium',
            impact: 'high',
            timeline: 6,
            probability: 85,
            status: 'selected',
            aiGenerated: true,
            dependencies: [],
            resources: { team: 2, budget: '$60K' },
            projects: []
          },
          {
            id: 3,
            title: 'Strategic Partnerships',
            description: 'Partner with 3 complementary platforms',
            effort: 'medium',
            impact: 'medium',
            timeline: 8,
            probability: 60,
            status: 'suggested',
            aiGenerated: true,
            dependencies: [],
            resources: { team: 1, budget: '$30K' },
            projects: []
          }
        ],
        aiInsights: [
          {
            id: 1,
            type: 'warning',
            severity: 'medium',
            title: 'Pipeline Growth Slowing',
            message: 'Demo booking rate is 30% below target for 3 weeks. At current rate, you will miss Q2 revenue target by $180K.',
            recommendation: 'Increase marketing spend by $15K/month OR extend timeline by 2 months',
            confidence: 82,
            impact: 'high',
            autoAdjust: true,
            date: '2025-11-14',
            data: { currentRate: 28, targetRate: 40, deficit: 12 }
          }
        ]
      },
      {
        id: 2,
        title: 'Achieve Product-Market Fit',
        description: 'Reach PMF score of 85+ with clear ICP',
        timeline: 9,
        priority: 'critical',
        status: 'active',
        health: 68,
        progress: 52,
        metrics: { target: '85 PMF Score', current: '68 Score' },
        createdAt: '2025-01-20',
        initiatives: [
          {
            id: 4,
            title: 'Deep Customer Research',
            description: 'Conduct 50 customer interviews',
            effort: 'high',
            impact: 'high',
            timeline: 4,
            probability: 90,
            status: 'in_progress',
            aiGenerated: true,
            dependencies: [],
            resources: { team: 2, budget: '$20K' },
            projects: []
          }
        ],
        aiInsights: [
          {
            id: 3,
            type: 'alert',
            severity: 'high',
            title: 'Churn Rate Increasing',
            message: 'Churn increased from 4% to 7% this month. Top reason: Missing feature X.',
            recommendation: 'Pause new features, focus 2 engineers on retention for 4 weeks',
            confidence: 88,
            impact: 'critical',
            autoAdjust: true,
            date: '2025-11-13',
            data: { previousChurn: 4, currentChurn: 7, topReason: 'Feature X' }
          }
        ]
      }
      ];
      setObjectives(mockObjectives);

      const mockRecommendations = [
        {
          id: 1,
          type: 'adjustment',
          objectiveId: 1,
          title: 'Timeline Extension Recommended',
          description: 'Based on current burn rate and pipeline velocity, extending timeline by 2 months increases success probability from 65% to 82%.',
          action: 'Extend timeline from 12 to 14 months',
          impact: { timeline: '+2 months', probability: '+17%', risk: '-25%' },
          accepted: false,
          confidence: 85
        },
        {
          id: 2,
          type: 'resource',
          objectiveId: 1,
          title: 'Resource Reallocation Suggested',
          description: 'PLG initiative showing 40% better ROI than enterprise. Consider reallocating 1 team member.',
          action: 'Move 1 person from Enterprise to PLG for 8 weeks',
          impact: { revenue: '+$85K', efficiency: '+28%', timeline: 'neutral' },
          accepted: false,
          confidence: 78
        }
      ];
      setAiRecommendations(mockRecommendations);
    }
  }, []);

  // Setup weekly recalibration check
  useEffect(() => {
    const recalibrationInterval = setInterval(() => {
      if (recalibrationMode === 'weekly') {
        const daysSinceLastRecalibration = Math.floor((new Date() - lastRecalibration) / (1000 * 60 * 60 * 24));
        if (daysSinceLastRecalibration >= 7) {
          performRecalibration();
        }
      }
    }, 1000 * 60 * 60); // Check every hour

    return () => clearInterval(recalibrationInterval);
  }, [recalibrationMode, lastRecalibration]);

  const getColorClasses = (color) => {
    const colorMap = {
      purple: { bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-200' },
      blue: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200' },
      green: { bg: 'bg-green-50', text: 'text-green-600', border: 'border-green-200' },
      orange: { bg: 'bg-orange-50', text: 'text-orange-600', border: 'border-orange-200' },
      red: { bg: 'bg-red-50', text: 'text-red-600', border: 'border-red-200' },
      yellow: { bg: 'bg-yellow-50', text: 'text-yellow-600', border: 'border-yellow-200' },
      indigo: { bg: 'bg-indigo-50', text: 'text-indigo-600', border: 'border-indigo-200' },
      emerald: { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-200' },
      gray: { bg: 'bg-gray-50', text: 'text-gray-600', border: 'border-gray-200' }
    };
    return colorMap[color] || colorMap.gray;
  };

  const calculateHealth = useCallback((objective) => {
    let healthScore = 0;
    let factors = 0;

    // Factor 1: Progress vs Timeline (40% weight)
    const expectedProgress = ((new Date() - new Date(objective.createdAt)) / (objective.timeline * 30 * 24 * 60 * 60 * 1000)) * 100;
    const progressDelta = objective.progress - expectedProgress;
    healthScore += Math.max(0, Math.min(40, 40 + progressDelta * 0.4));
    factors += 40;

    // Factor 2: KPI Health (30% weight)
    const allKPIs = objective.initiatives.flatMap(init => init.projects.flatMap(proj => proj.kpis || []));
    if (allKPIs.length > 0) {
      const kpiHealthScore = allKPIs.reduce((sum, kpi) => {
        const healthValue = kpi.health === 'good' ? 100 : kpi.health === 'warning' ? 60 : 30;
        return sum + healthValue;
      }, 0) / allKPIs.length;
      healthScore += (kpiHealthScore / 100) * 30;
      factors += 30;
    }

    // Factor 3: AI Insights Severity (20% weight)
    if (objective.aiInsights && objective.aiInsights.length > 0) {
      const avgSeverity = objective.aiInsights.reduce((sum, insight) => {
        const severityValue = insight.severity === 'high' ? 0 : insight.severity === 'medium' ? 50 : 80;
        return sum + severityValue;
      }, 0) / objective.aiInsights.length;
      healthScore += (avgSeverity / 100) * 20;
      factors += 20;
    } else {
      healthScore += 20;
      factors += 20;
    }

    // Factor 4: Team Availability (10% weight)
    const assignedMembers = objective.initiatives.flatMap(init =>
      init.projects.flatMap(proj => proj.assignees || [])
    );
    const availabilityScore = assignedMembers.reduce((sum, memberId) => {
      const member = teamMembers.find(m => m.id === memberId);
      return sum + (member?.available ? 1 : 0);
    }, 0) / Math.max(assignedMembers.length, 1);
    healthScore += availabilityScore * 10;
    factors += 10;

    return Math.round(healthScore);
  }, [teamMembers]);

  const calculateProjectProgress = useCallback((project) => {
    if (!project.keyResults || project.keyResults.length === 0) return 0;
    
    const weightedProgress = project.keyResults.reduce((sum, kr) => {
      return sum + (kr.progress * (kr.weight || 1));
    }, 0);
    
    const totalWeight = project.keyResults.reduce((sum, kr) => sum + (kr.weight || 1), 0);
    
    return Math.round(weightedProgress / totalWeight);
  }, []);

  const getHealthStatus = (health) => {
    if (health >= 80) return { label: 'Excellent', color: 'green', icon: CheckCircle };
    if (health >= 60) return { label: 'Good', color: 'blue', icon: Activity };
    if (health >= 40) return { label: 'At Risk', color: 'orange', icon: AlertTriangle };
    return { label: 'Critical', color: 'red', icon: AlertTriangle };
  };

  const getPriorityColor = (priority) => {
    const priorityMap = {
      critical: 'red',
      high: 'orange',
      medium: 'yellow',
      low: 'blue'
    };
    return priorityMap[priority] || 'gray';
  };

  const generateAIInitiatives = useCallback((objective) => {
    // Advanced AI initiative generation based on objective type and metrics
    const initiativeTemplates = {
      revenue: [
        { title: 'Enterprise Sales Motion', effort: 'high', impact: 'high', timeline: 9, probability: 75 },
        { title: 'Product-Led Growth', effort: 'medium', impact: 'high', timeline: 6, probability: 85 },
        { title: 'Strategic Partnerships', effort: 'medium', impact: 'medium', timeline: 8, probability: 60 },
        { title: 'Expansion Revenue', effort: 'low', impact: 'medium', timeline: 4, probability: 70 }
      ],
      pmf: [
        { title: 'Deep Customer Research', effort: 'high', impact: 'high', timeline: 4, probability: 90 },
        { title: 'Feature Iteration Sprint', effort: 'high', impact: 'high', timeline: 3, probability: 80 },
        { title: 'ICP Refinement', effort: 'medium', impact: 'high', timeline: 2, probability: 85 },
        { title: 'Retention Program', effort: 'medium', impact: 'medium', timeline: 5, probability: 75 }
      ],
      team: [
        { title: 'Strategic Hiring Plan', effort: 'high', impact: 'high', timeline: 6, probability: 70 },
        { title: 'Culture Building', effort: 'medium', impact: 'high', timeline: 12, probability: 80 },
        { title: 'Performance Systems', effort: 'medium', impact: 'medium', timeline: 3, probability: 90 },
        { title: 'Leadership Development', effort: 'low', impact: 'medium', timeline: 6, probability: 75 }
      ],
      fundraising: [
        { title: 'Investor Pipeline', effort: 'high', impact: 'high', timeline: 6, probability: 65 },
        { title: 'Pitch Deck & Materials', effort: 'medium', impact: 'high', timeline: 2, probability: 95 },
        { title: 'Financial Modeling', effort: 'high', impact: 'high', timeline: 3, probability: 90 },
        { title: 'Warm Introductions', effort: 'medium', impact: 'medium', timeline: 4, probability: 70 }
      ]
    };

    // Determine objective category
    let category = 'revenue';
    const titleLower = objective.title.toLowerCase();
    if (titleLower.includes('pmf') || titleLower.includes('fit')) category = 'pmf';
    else if (titleLower.includes('team') || titleLower.includes('hire')) category = 'team';
    else if (titleLower.includes('fund') || titleLower.includes('raise')) category = 'fundraising';

    const templates = initiativeTemplates[category];
    const selectedInitiatives = templates.slice(0, 3).map((template, index) => ({
      id: Date.now() + index,
      ...template,
      description: `AI-generated initiative to achieve: ${objective.title}`,
      status: 'suggested',
      aiGenerated: true,
      dependencies: [],
      resources: {
        team: template.effort === 'high' ? 3 : template.effort === 'medium' ? 2 : 1,
        budget: `$${template.effort === 'high' ? '120K' : template.effort === 'medium' ? '60K' : '30K'}`
      },
      projects: []
    }));

    return selectedInitiatives;
  }, []);

  const performRecalibration = useCallback(() => {
    setShowRecalibrationModal(true);
    
    setTimeout(() => {
      setObjectives(prevObjectives => {
        const updatedObjectives = prevObjectives.map(obj => {
          // Recalculate health
          const newHealth = calculateHealth(obj);
          
          // Recalculate progress based on projects
          const totalProjects = obj.initiatives.reduce((sum, init) => sum + init.projects.length, 0);
          const completedProgress = obj.initiatives.reduce((sum, init) =>
            sum + init.projects.reduce((pSum, proj) => pSum + proj.progress, 0), 0
          );
          const newProgress = totalProjects > 0 ? Math.round(completedProgress / totalProjects) : obj.progress;

          // Generate new AI insights
          const newInsights = [];
          
          // Check for timeline risk
          const timeElapsed = (new Date() - new Date(obj.createdAt)) / (1000 * 60 * 60 * 24 * 30);
          const expectedProgress = (timeElapsed / obj.timeline) * 100;
          if (newProgress < expectedProgress - 15) {
            newInsights.push({
              id: Date.now() + Math.random(),
              type: 'warning',
              severity: 'medium',
              title: 'Behind Schedule',
              message: `You're ${Math.round(expectedProgress - newProgress)}% behind expected progress. Timeline may need adjustment.`,
              recommendation: 'Add resources OR extend timeline OR descope features',
              confidence: 85,
              impact: 'high',
              autoAdjust: true,
              date: new Date().toISOString().split('T')[0]
            });
          }

          // Check KPI health
          const allKPIs = obj.initiatives.flatMap(init => init.projects.flatMap(proj => proj.kpis || []));
          const criticalKPIs = allKPIs.filter(kpi => kpi.health === 'critical' || kpi.health === 'warning');
          if (criticalKPIs.length > 0) {
            newInsights.push({
              id: Date.now() + Math.random() + 1,
              type: 'alert',
              severity: 'high',
              title: 'KPIs Need Attention',
              message: `${criticalKPIs.length} KPI(s) are underperforming. This may impact objective success.`,
              recommendation: `Focus on improving: ${criticalKPIs.slice(0, 2).map(k => k.name).join(', ')}`,
              confidence: 90,
              impact: 'critical',
              autoAdjust: false,
              date: new Date().toISOString().split('T')[0]
            });
          }

          return {
            ...obj,
            health: newHealth,
            progress: newProgress,
            aiInsights: [...(obj.aiInsights || []), ...newInsights].slice(-5)
          };
        });

        // Generate new recommendations based on updated objectives
        const newRecommendations = [];
        updatedObjectives.forEach(obj => {
          const initiatives = obj.initiatives.filter(init => init.status === 'in_progress' || init.status === 'selected');
          if (initiatives.length > 3) {
            newRecommendations.push({
              id: Date.now() + Math.random(),
              type: 'resource',
              objectiveId: obj.id,
              title: 'Too Many Parallel Initiatives',
              description: `Running ${initiatives.length} initiatives simultaneously may dilute focus.`,
              action: 'Prioritize top 2-3 initiatives',
              impact: { focus: '+40%', timeline: '-2 months', efficiency: '+35%' },
              accepted: false,
              confidence: 82
            });
          }

          if (obj.health < 60) {
            newRecommendations.push({
              id: Date.now() + Math.random() + 1,
              type: 'adjustment',
              objectiveId: obj.id,
              title: 'Health Score Declining',
              description: `Objective health at ${obj.health}%. Timeline extension may be needed.`,
              action: 'Extend timeline by 3 months OR add 2 team members',
              impact: { probability: '+20%', timeline: '+3 months', cost: '+$45K' },
              accepted: false,
              confidence: 88
            });
          }
        });

        if (newRecommendations.length > 0) {
          setAiRecommendations(prev => [...prev, ...newRecommendations].slice(-10));
        }

        return updatedObjectives;
      });

      setLastRecalibration(new Date());
      setTimeout(() => setShowRecalibrationModal(false), 2000);
    }, 2000);
  }, [calculateHealth]);

  const handleCreateObjective = () => {
    if (!objectiveForm.title) {
      alert('Please enter an objective title');
      return;
    }

    const newObjective = {
      id: Date.now(),
      title: objectiveForm.title,
      description: objectiveForm.description,
      timeline: parseInt(objectiveForm.timeline) || 12,
      priority: objectiveForm.priority,
      metrics: objectiveForm.metrics,
      status: 'active',
      health: 100,
      progress: 0,
      createdAt: new Date().toISOString().split('T')[0],
      initiatives: [],
      aiInsights: []
    };
    
    setObjectives(prev => [...prev, newObjective]);
    setShowObjectiveModal(false);
    setObjectiveForm({ title: '', description: '', timeline: '12', priority: 'high', metrics: { target: '', current: '' } });
    
    // Generate AI initiatives after short delay
    setTimeout(() => {
      const generatedInitiatives = generateAIInitiatives(newObjective);
      setObjectives(prev => prev.map(obj =>
        obj.id === newObjective.id
          ? { ...obj, initiatives: generatedInitiatives }
          : obj
      ));
    }, 1000);
  };

  const handleEditObjective = (objective) => {
    setEditMode(true);
    setCurrentObjectiveId(objective.id);
    setObjectiveForm({
      title: objective.title,
      description: objective.description,
      timeline: objective.timeline.toString(),
      priority: objective.priority,
      metrics: objective.metrics
    });
    setShowObjectiveModal(true);
  };

  const handleUpdateObjective = () => {
    setObjectives(prev => prev.map(obj =>
      obj.id === currentObjectiveId
        ? { 
            ...obj,
            title: objectiveForm.title,
            description: objectiveForm.description,
            timeline: parseInt(objectiveForm.timeline) || obj.timeline,
            priority: objectiveForm.priority,
            metrics: objectiveForm.metrics
          }
        : obj
    ));
    setShowObjectiveModal(false);
    setEditMode(false);
    setCurrentObjectiveId(null);
    setObjectiveForm({ title: '', description: '', timeline: '12', priority: 'high', metrics: { target: '', current: '' } });
  };

  const handleDeleteObjective = (objectiveId) => {
    if (window.confirm('Are you sure you want to delete this objective? This will remove all associated initiatives and projects.')) {
      setObjectives(prev => prev.filter(obj => obj.id !== objectiveId));
    }
  };

  const handleConvertToProject = (initiative, objectiveId) => {
    const mockProject = {
      id: Date.now(),
      title: `Project: ${initiative.title}`,
      keyResults: [
        { id: 1, title: 'Key Result 1', progress: 0, target: 'Define target', current: 'Not started', weight: 0.4 },
        { id: 2, title: 'Key Result 2', progress: 0, target: 'Define target', current: 'Not started', weight: 0.3 },
        { id: 3, title: 'Key Result 3', progress: 0, target: 'Define target', current: 'Not started', weight: 0.3 }
      ],
      kpis: [
        { id: 1, name: 'Leading KPI 1', type: 'leading', target: 100, current: 0, trend: 'neutral', health: 'good', unit: 'count' },
        { id: 2, name: 'Lagging KPI 1', type: 'lagging', target: 100, current: 0, trend: 'neutral', health: 'good', unit: 'count' }
      ],
      assignees: [],
      status: 'planning',
      progress: 0,
      startDate: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + initiative.timeline * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      milestones: [
        { id: 1, title: 'Milestone 1', date: '', completed: false, description: 'Define first milestone' }
      ]
    };

    setObjectives(prev => prev.map(obj =>
      obj.id === objectiveId
        ? {
            ...obj,
            initiatives: obj.initiatives.map(init =>
              init.id === initiative.id
                ? { ...init, status: 'in_progress', projects: [...init.projects, mockProject] }
                : init
            )
          }
        : obj
    ));
  };

  const handleAddKeyResult = (projectId, objectiveId, initiativeId) => {
    if (!keyResultForm.title) {
      alert('Please enter a key result title');
      return;
    }

    const newKeyResult = {
      id: Date.now(),
      title: keyResultForm.title,
      target: keyResultForm.target,
      current: keyResultForm.current,
      progress: 0,
      weight: 0.25
    };

    setObjectives(prev => prev.map(obj =>
      obj.id === objectiveId
        ? {
            ...obj,
            initiatives: obj.initiatives.map(init =>
              init.id === initiativeId
                ? {
                    ...init,
                    projects: init.projects.map(proj =>
                      proj.id === projectId
                        ? { ...proj, keyResults: [...proj.keyResults, newKeyResult] }
                        : proj
                    )
                  }
                : init
            )
          }
        : obj
    ));

    setShowKeyResultModal(false);
    setKeyResultForm({ title: '', target: '', current: '' });
  };

  const handleUpdateKeyResultProgress = (objectiveId, initiativeId, projectId, keyResultId, newProgress) => {
    setObjectives(prev => prev.map(obj =>
      obj.id === objectiveId
        ? {
            ...obj,
            initiatives: obj.initiatives.map(init =>
              init.id === initiativeId
                ? {
                    ...init,
                    projects: init.projects.map(proj => {
                      if (proj.id === projectId) {
                        const updatedKRs = proj.keyResults.map(kr =>
                          kr.id === keyResultId ? { ...kr, progress: Math.min(100, Math.max(0, newProgress)) } : kr
                        );
                        const newProjectProgress = calculateProjectProgress({ ...proj, keyResults: updatedKRs });
                        return { ...proj, keyResults: updatedKRs, progress: newProjectProgress };
                      }
                      return proj;
                    })
                  }
                : init
            )
          }
        : obj
    ));
  };

  const handleAddKPI = (projectId, objectiveId, initiativeId) => {
    if (!kpiForm.name) {
      alert('Please enter a KPI name');
      return;
    }

    const newKPI = {
      id: Date.now(),
      name: kpiForm.name,
      type: kpiForm.type,
      target: parseFloat(kpiForm.target) || 0,
      current: parseFloat(kpiForm.current) || 0,
      trend: 'neutral',
      health: 'good',
      unit: 'count'
    };

    setObjectives(prev => prev.map(obj =>
      obj.id === objectiveId
        ? {
            ...obj,
            initiatives: obj.initiatives.map(init =>
              init.id === initiativeId
                ? {
                    ...init,
                    projects: init.projects.map(proj =>
                      proj.id === projectId
                        ? { ...proj, kpis: [...proj.kpis, newKPI] }
                        : proj
                    )
                  }
                : init
            )
          }
        : obj
    ));

    setShowKPIModal(false);
    setKPIForm({ name: '', type: 'leading', target: '', current: '' });
  };

  const handleUpdateKPI = (objectiveId, initiativeId, projectId, kpiId, newCurrent) => {
    setObjectives(prev => prev.map(obj =>
      obj.id === objectiveId
        ? {
            ...obj,
            initiatives: obj.initiatives.map(init =>
              init.id === initiativeId
                ? {
                    ...init,
                    projects: init.projects.map(proj =>
                      proj.id === projectId
                        ? {
                            ...proj,
                            kpis: proj.kpis.map(kpi => {
                              if (kpi.id === kpiId) {
                                const previousCurrent = kpi.current;
                                const trend = newCurrent > previousCurrent ? 'up' : newCurrent < previousCurrent ? 'down' : 'neutral';
                                const progressPercent = (newCurrent / kpi.target) * 100;
                                const health = progressPercent >= 80 ? 'good' : progressPercent >= 50 ? 'warning' : 'critical';
                                return { ...kpi, current: newCurrent, trend, health };
                              }
                              return kpi;
                            })
                          }
                        : proj
                    )
                  }
                : init
            )
          }
        : obj
    ));
  };

  const handleAssignTeamMember = (projectId, objectiveId, initiativeId, memberId) => {
    setObjectives(prev => prev.map(obj =>
      obj.id === objectiveId
        ? {
            ...obj,
            initiatives: obj.initiatives.map(init =>
              init.id === initiativeId
                ? {
                    ...init,
                    projects: init.projects.map(proj =>
                      proj.id === projectId
                        ? {
                            ...proj,
                            assignees: proj.assignees.includes(memberId)
                              ? proj.assignees.filter(id => id !== memberId)
                              : [...proj.assignees, memberId]
                          }
                        : proj
                    )
                  }
                : init
            )
          }
        : obj
    ));
  };

  const handleAddMilestone = (projectId, objectiveId, initiativeId) => {
    if (!milestoneForm.title || !milestoneForm.date) {
      alert('Please enter milestone title and date');
      return;
    }

    const newMilestone = {
      id: Date.now(),
      title: milestoneForm.title,
      date: milestoneForm.date,
      description: milestoneForm.description,
      completed: false
    };

    setObjectives(prev => prev.map(obj =>
      obj.id === objectiveId
        ? {
            ...obj,
            initiatives: obj.initiatives.map(init =>
              init.id === initiativeId
                ? {
                    ...init,
                    projects: init.projects.map(proj =>
                      proj.id === projectId
                        ? { ...proj, milestones: [...proj.milestones, newMilestone] }
                        : proj
                    )
                  }
                : init
            )
          }
        : obj
    ));

    setShowMilestoneModal(false);
    setMilestoneForm({ title: '', date: '', description: '' });
  };

  const handleToggleMilestone = (objectiveId, initiativeId, projectId, milestoneId) => {
    setObjectives(prev => prev.map(obj =>
      obj.id === objectiveId
        ? {
            ...obj,
            initiatives: obj.initiatives.map(init =>
              init.id === initiativeId
                ? {
                    ...init,
                    projects: init.projects.map(proj =>
                      proj.id === projectId
                        ? {
                            ...proj,
                            milestones: proj.milestones.map(m =>
                              m.id === milestoneId ? { ...m, completed: !m.completed } : m
                            )
                          }
                        : proj
                    )
                  }
                : init
            )
          }
        : obj
    ));
  };

  const handleAcceptRecommendation = (recommendation) => {
    setAiRecommendations(prev => prev.map(rec =>
      rec.id === recommendation.id ? { ...rec, accepted: true } : rec
    ));
    
    // Apply the recommendation
    if (recommendation.type === 'adjustment') {
      setObjectives(prev => prev.map(obj =>
        obj.id === recommendation.objectiveId
          ? { ...obj, timeline: obj.timeline + 2, health: Math.min(100, obj.health + 10) }
          : obj
      ));
    }
  };

  const handleDismissRecommendation = (recommendationId) => {
    setAiRecommendations(prev => prev.filter(rec => rec.id !== recommendationId));
  };

  const tabs = [
    { id: 'strategy', label: 'Strategy Map', icon: Layers, description: 'Goal hierarchy' },
    { id: 'initiatives', label: 'Initiatives', icon: Rocket, description: 'AI-generated' },
    { id: 'projects', label: 'Active Projects', icon: Box, description: 'In execution' },
    { id: 'intelligence', label: 'AI Intelligence', icon: Brain, description: 'Recommendations' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, description: 'Performance' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-1">IMPACTS</h1>
            <p className="text-gray-600 text-sm">Intelligent Adaptive OKRs • Recalibrates Weekly</p>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="text-right mr-4">
              <div className="text-xs text-gray-600">Last Recalibration</div>
              <div className="text-sm font-medium text-gray-900">
                {lastRecalibration.toLocaleDateString()}
              </div>
              <div className="text-xs text-gray-500">
                Next: {new Date(lastRecalibration.getTime() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}
              </div>
            </div>
            
            <button
              onClick={performRecalibration}
              className="flex items-center space-x-2 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all font-medium border border-gray-200"
            >
              <RefreshCw size={18} />
              <span>Recalibrate Now</span>
            </button>

            <button
              onClick={() => {
                setEditMode(false);
                setShowObjectiveModal(true);
              }}
              className="flex items-center space-x-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all font-medium shadow-sm hover:shadow"
            >
              <Plus size={18} />
              <span>New Objective</span>
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-5 gap-4">
          {[
            { label: 'Active Objectives', value: objectives.filter(o => o.status === 'active').length },
            { label: 'Initiatives', value: objectives.reduce((sum, o) => sum + o.initiatives.length, 0) },
            { label: 'Active Projects', value: objectives.reduce((sum, o) => sum + o.initiatives.reduce((s, i) => s + i.projects.length, 0), 0) },
            { label: 'AI Recommendations', value: aiRecommendations.filter(r => !r.accepted).length },
            { label: 'Avg Health Score', value: objectives.length > 0 ? `${Math.round(objectives.reduce((sum, o) => sum + o.health, 0) / objectives.length)}%` : '0%' }
          ].map((stat, index) => {
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-5 rounded-xl shadow-sm border border-gray-200"
              >
                <div className="text-sm font-medium text-gray-600 mb-2">{stat.label}</div>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6 p-1.5">
        <div className="flex space-x-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg transition-all flex-1 font-medium ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Icon size={18} />
                <span className="text-sm">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content - I'll continue in the next part due to length */}
      <AnimatePresence mode="wait">
        {activeTab === 'strategy' && (
          <motion.div
            key="strategy"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {objectives.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm border-2 border-dashed border-gray-300 p-12 text-center">
                <Sparkles className="mx-auto text-blue-600 mb-4" size={48} />
                <h3 className="text-xl font-bold text-gray-900 mb-2">No Objectives Yet</h3>
                <p className="text-gray-600 mb-6">Create your first objective and let AI generate strategic initiatives</p>
                <button
                  onClick={() => setShowObjectiveModal(true)}
                  className="px-5 py-2.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-all shadow-sm hover:shadow"
                >
                  Create First Objective
                </button>
              </div>
            ) : (
              objectives.map((objective, index) => {
                const healthStatus = getHealthStatus(objective.health);
                const HealthIcon = healthStatus.icon;
                const priorityColors = getColorClasses(getPriorityColor(objective.priority));
                
                return (
                  <motion.div
                    key={objective.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
                  >
                    {/* Objective Header */}
                    <div className="p-6 border-b border-gray-200 bg-white">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h2 className="text-xl font-bold text-gray-900">{objective.title}</h2>
                            <span className={`px-2.5 py-1 text-xs font-semibold rounded-lg uppercase border ${
                              objective.priority === 'critical' ? 'bg-red-100 text-red-700 border-red-200' :
                              objective.priority === 'high' ? 'bg-red-100 text-red-700 border-red-200' :
                              objective.priority === 'medium' ? 'bg-yellow-100 text-yellow-700 border-yellow-200' :
                              'bg-gray-100 text-gray-700 border-gray-200'
                            }`}>
                              {objective.priority === 'critical' || objective.priority === 'high' ? 'CRITICAL' : objective.priority.toUpperCase()}
                            </span>
                          </div>
                          <p className="text-gray-600 text-sm">{objective.description}</p>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                          <div className="text-right mr-4">
                            <div className="text-sm text-gray-600">Health Score</div>
                            <div className={`text-2xl font-bold ${getColorClasses(healthStatus.color).text} flex items-center space-x-2`}>
                              <HealthIcon size={20} />
                              <span>{objective.health}%</span>
                            </div>
                            <div className={`text-xs ${getColorClasses(healthStatus.color).text}`}>
                              {healthStatus.label}
                            </div>
                          </div>
                          
                          <div className="flex flex-col space-y-2">
                            <button
                              onClick={() => handleEditObjective(objective)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Edit objective"
                            >
                              <Edit size={18} />
                            </button>
                            <button
                              onClick={() => handleDeleteObjective(objective.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Delete objective"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-4 gap-4">
                        <div>
                          <div className="text-xs text-gray-600 mb-1">Timeline</div>
                          <div className="font-semibold text-gray-900">{objective.timeline} months</div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-600 mb-1">Progress</div>
                          <div className="font-semibold text-gray-900">{objective.progress}%</div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-600 mb-1">Current</div>
                          <div className="font-semibold text-gray-900">{objective.metrics.current}</div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-600 mb-1">Target</div>
                          <div className="font-semibold text-gray-900">{objective.metrics.target}</div>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all"
                          style={{ width: `${objective.progress}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* AI Insights */}
                    {objective.aiInsights && objective.aiInsights.length > 0 && (
                      <div className="px-6 py-4 bg-blue-50 border-b border-blue-200">
                        {objective.aiInsights.map((insight) => {
                          const isAlert = insight.type === 'alert';
                          const isWarning = insight.type === 'warning';
                          
                          const bgColor = isAlert ? 'bg-blue-50' : isWarning ? 'bg-blue-50' : 'bg-blue-50';
                          const borderColor = isAlert ? 'border-blue-200' : isWarning ? 'border-blue-200' : 'border-blue-200';
                          const iconColor = isAlert ? 'text-blue-600' : isWarning ? 'text-blue-600' : 'text-blue-600';
                          
                          return (
                            <div key={insight.id} className={`p-4 rounded-xl border ${borderColor} ${bgColor} mb-3 last:mb-0`}>
                              <div className="flex items-start justify-between">
                                <div className="flex items-start space-x-3 flex-1">
                                  <Brain className={iconColor} size={20} />
                                  <div className="flex-1">
                                    <div className="flex items-center space-x-2 mb-1">
                                      <h4 className="font-bold text-gray-900">{insight.title}</h4>
                                      <span className={`px-2 py-0.5 text-xs font-semibold rounded border ${
                                        isAlert ? 'bg-yellow-100 text-yellow-700 border-yellow-200' : 
                                        isWarning ? 'bg-orange-100 text-orange-700 border-orange-200' :
                                        'bg-blue-100 text-blue-700 border-blue-200'
                                      }`}>
                                        {isAlert ? 'alert' : isWarning ? 'warning' : insight.type}
                                      </span>
                                      <span className="text-xs text-gray-500">{insight.confidence}% confidence</span>
                                    </div>
                                    <p className="text-sm text-gray-700 mb-2">{insight.message}</p>
                                    <div className="flex items-center space-x-2 text-sm">
                                      <Lightbulb size={14} className="text-blue-600" />
                                      <span className="font-medium text-blue-600">{insight.recommendation}</span>
                                    </div>
                                  </div>
                                </div>
                                
                                {insight.autoAdjust && (
                                  <button className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-all shadow-sm hover:shadow">
                                    Auto-Adjust
                                  </button>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* Initiatives */}
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center space-x-2">
                        <Rocket size={20} className="text-blue-600" />
                        <span>Initiatives ({objective.initiatives.length})</span>
                      </h3>
                      
                      {objective.initiatives.length === 0 ? (
                        <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
                          <Brain className="mx-auto text-blue-600 mb-3" size={32} />
                          <p className="text-gray-600 mb-4">AI is generating initiatives for this objective...</p>
                          <div className="w-16 h-1 bg-blue-600 rounded-full mx-auto animate-pulse"></div>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {objective.initiatives.map((initiative) => {
                            const effortColors = {
                              high: 'blue',
                              medium: 'blue',
                              low: 'blue'
                            };
                            const impactColors = {
                              high: 'blue',
                              medium: 'blue',
                              low: 'gray'
                            };
                            
                            return (
                              <div key={initiative.id} className="border-2 border-gray-200 rounded-xl p-4 hover:border-gray-200 transition-all">
                                <div className="flex items-start justify-between mb-3">
                                  <div className="flex-1">
                                    <div className="flex items-center space-x-2 mb-2">
                                      <h4 className="font-bold text-gray-900">{initiative.title}</h4>
                                      {initiative.aiGenerated && (
                                        <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-semibold rounded border border-blue-200 flex items-center space-x-1">
                                          <Brain size={12} />
                                          <span>NEW</span>
                                        </span>
                                      )}
                                      <span className={`px-2 py-0.5 text-xs font-semibold rounded border ${
                                        initiative.status === 'in_progress' ? 'bg-blue-100 text-blue-700 border-blue-200' :
                                        initiative.status === 'selected' ? 'bg-purple-100 text-purple-700 border-purple-200' :
                                        initiative.status === 'suggested' ? 'bg-orange-100 text-orange-700 border-orange-200' :
                                        'bg-gray-100 text-gray-700 border-gray-200'
                                      }`}>
                                        {initiative.status.replace('_', ' ')}
                                      </span>
                                    </div>
                                    <p className="text-sm text-gray-600 mb-3">{initiative.description}</p>
                                    
                                    <div className="grid grid-cols-5 gap-4 text-sm">
                                      <div>
                                        <div className="text-xs text-gray-500 mb-1">Effort</div>
                                        <span className={`px-2 py-1 ${getColorClasses(effortColors[initiative.effort]).bg} ${getColorClasses(effortColors[initiative.effort]).text} rounded font-medium text-xs`}>
                                          {initiative.effort}
                                        </span>
                                      </div>
                                      <div>
                                        <div className="text-xs text-gray-500 mb-1">Impact</div>
                                        <span className={`px-2 py-1 ${getColorClasses(impactColors[initiative.impact]).bg} ${getColorClasses(impactColors[initiative.impact]).text} rounded font-medium text-xs`}>
                                          {initiative.impact}
                                        </span>
                                      </div>
                                      <div>
                                        <div className="text-xs text-gray-500 mb-1">Timeline</div>
                                        <div className="font-medium text-gray-900">{initiative.timeline}m</div>
                                      </div>
                                      <div>
                                        <div className="text-xs text-gray-500 mb-1">Success</div>
                                        <div className="font-medium text-gray-900">{initiative.probability}%</div>
                                      </div>
                                      <div>
                                        <div className="text-xs text-gray-500 mb-1">Resources</div>
                                        <div className="font-medium text-gray-900">{initiative.resources.team} team</div>
                                      </div>
                                    </div>
                                  </div>
                                  
                                  <div className="ml-4 flex flex-col space-y-2">
                                    {initiative.status === 'suggested' && (
                                      <button
                                        onClick={() => handleConvertToProject(initiative, objective.id)}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-all whitespace-nowrap shadow-sm"
                                      >
                                        Convert to Project
                                      </button>
                                    )}
                                    {initiative.projects.length > 0 && (
                                      <button className="px-4 py-2 bg-blue-50 text-blue-600 border border-blue-200 rounded-lg text-sm font-medium hover:bg-blue-100 transition-all">
                                        View Projects ({initiative.projects.length})
                                      </button>
                                    )}
                                  </div>
                                </div>

                                {/* Projects under initiative */}
                                {initiative.projects.length > 0 && (
                                  <div className="mt-4 pt-4 border-t border-gray-200">
                                    <div className="text-sm font-semibold text-gray-700 mb-3">Active Projects:</div>
                                    {initiative.projects.map((project) => (
                                      <div key={project.id} className="bg-gray-50 rounded-lg p-3 mb-2">
                                        <div className="flex items-center justify-between mb-2">
                                          <div className="font-medium text-gray-900">{project.title}</div>
                                          <div className="flex items-center space-x-2">
                                            <div className="text-sm font-medium text-gray-700">{project.progress}%</div>
                                            <div className="flex -space-x-2">
                                              {project.assignees.map((assigneeId) => {
                                                const member = teamMembers.find(m => m.id === assigneeId);
                                                return member ? (
                                                  <div
                                                    key={member.id}
                                                    className="w-6 h-6 rounded-full bg-blue-600 border-2 border-white flex items-center justify-center text-white text-xs font-bold"
                                                    title={member.name}
                                                  >
                                                    {member.avatar}
                                                  </div>
                                                ) : null;
                                              })}
                                            </div>
                                          </div>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                                          <div 
                                            className="bg-blue-600 h-1.5 rounded-full"
                                            style={{ width: `${project.progress}%` }}
                                          ></div>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })
            )}
          </motion.div>
        )}

        {activeTab === 'initiatives' && (
          <motion.div
            key="initiatives"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {objectives.length === 0 || objectives.every(obj => obj.initiatives.length === 0) ? (
              <div className="bg-white rounded-2xl shadow-lg border-2 border-dashed border-gray-300 p-12 text-center">
                <Rocket className="mx-auto text-blue-600 mb-4" size={48} />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">No Initiatives Yet</h3>
                <p className="text-gray-600">Create an objective and AI will generate strategic initiatives</p>
              </div>
            ) : (
              objectives.map((objective) => (
                objective.initiatives.length > 0 && (
                  <div key={objective.id} className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <div className="flex items-center space-x-3 mb-2">
                          <Target className="text-blue-600" size={20} />
                          <h3 className="text-xl font-bold text-gray-900">{objective.title}</h3>
                        </div>
                        <p className="text-sm text-gray-600">{objective.initiatives.length} initiative(s) • {objective.health}% health score</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {objective.initiatives.map((initiative) => {
                        const effortColors = { high: 'blue', medium: 'blue', low: 'blue' };
                        const impactColors = { high: 'blue', medium: 'blue', low: 'gray' };
                        
                        return (
                          <div key={initiative.id} className="border-2 border-gray-200 rounded-xl p-5 hover:border-blue-300 transition-all">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-2">
                                  <h4 className="font-bold text-gray-900">{initiative.title}</h4>
                                  {initiative.aiGenerated && (
                                    <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-semibold rounded border border-blue-200 flex items-center space-x-1">
                                      <Brain size={12} />
                                      <span>NEW</span>
                                    </span>
                                  )}
                                </div>
                                <p className="text-sm text-gray-600 mb-4">{initiative.description}</p>
                                
                                <div className="space-y-2 mb-4">
                                  <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-600">Effort</span>
                                    <span className={`px-2 py-0.5 ${getColorClasses(effortColors[initiative.effort]).bg} ${getColorClasses(effortColors[initiative.effort]).text} rounded font-medium text-xs`}>
                                      {initiative.effort}
                                    </span>
                                  </div>
                                  <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-600">Impact</span>
                                    <span className={`px-2 py-0.5 ${getColorClasses(impactColors[initiative.impact]).bg} ${getColorClasses(impactColors[initiative.impact]).text} rounded font-medium text-xs`}>
                                      {initiative.impact}
                                    </span>
                                  </div>
                                  <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-600">Timeline</span>
                                    <span className="font-medium text-gray-900">{initiative.timeline} months</span>
                                  </div>
                                  <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-600">Success Probability</span>
                                    <span className="font-medium text-gray-900">{initiative.probability}%</span>
                                  </div>
                                  <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-600">Resources</span>
                                    <span className="font-medium text-gray-900">{initiative.resources.team} team • {initiative.resources.budget}</span>
                                  </div>
                                </div>

                                <div className="pt-4 border-t border-gray-200">
                                  <div className="text-xs text-gray-600 mb-2">Status</div>
                                  <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${
                                    initiative.status === 'in_progress' ? 'bg-blue-100 text-blue-700 border-blue-200' :
                                    initiative.status === 'selected' ? 'bg-purple-100 text-purple-700 border-purple-200' :
                                    initiative.status === 'suggested' ? 'bg-orange-100 text-orange-700 border-orange-200' :
                                    'bg-gray-100 text-gray-700 border-gray-200'
                                  }`}>
                                    {initiative.status.replace('_', ' ')}
                                  </span>
                                  
                                  {initiative.projects.length > 0 && (
                                    <div className="mt-3 text-sm text-gray-600">
                                      {initiative.projects.length} active project(s)
                                    </div>
                                  )}
                                </div>

                                {initiative.status === 'suggested' && (
                                  <button
                                    onClick={() => handleConvertToProject(initiative, objective.id)}
                                    className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-all flex items-center justify-center space-x-2 shadow-sm"
                                  >
                                    <PlayCircle size={16} />
                                    <span>Convert to Project</span>
                                  </button>
                                )}

                                {initiative.status === 'in_progress' && (
                                  <button
                                    onClick={() => setActiveTab('projects')}
                                    className="mt-4 w-full px-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-100 transition-all flex items-center justify-center space-x-2"
                                  >
                                    <Eye size={16} />
                                    <span>View Projects ({initiative.projects.length})</span>
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )
              ))
            )}
          </motion.div>
        )}

        {activeTab === 'projects' && (
          <motion.div
            key="projects"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {objectives.flatMap(obj =>
              obj.initiatives.flatMap(init =>
                init.projects.map(project => ({ project, init, obj }))
              )
            ).length === 0 ? (
              <div className="bg-white rounded-2xl shadow-lg border-2 border-dashed border-gray-300 p-12 text-center">
                <Box className="mx-auto text-blue-600 mb-4" size={48} />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">No Active Projects</h3>
                <p className="text-gray-600">Convert initiatives to projects to start tracking execution</p>
              </div>
            ) : (
              objectives.flatMap((obj) =>
                obj.initiatives.flatMap((init) =>
                  init.projects.map((project) => (
                    <div key={project.id} className="bg-white rounded-2xl shadow-lg border-2 border-gray-200 p-6">
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <Box className="text-blue-600" size={24} />
                            <input
                              type="text"
                              value={project.title}
                              onChange={(e) => {
                                const newValue = e.target.value;
                                setObjectives(prev => prev.map(o =>
                                  o.id === obj.id ? {
                                    ...o,
                                    initiatives: o.initiatives.map(i =>
                                      i.id === init.id ? {
                                        ...i,
                                        projects: i.projects.map(p =>
                                          p.id === project.id ? { ...p, title: newValue } : p
                                        )
                                      } : i
                                    )
                                  } : o
                                ));
                              }}
                              className="text-2xl font-bold text-gray-900 border-b-2 border-transparent focus:border-gray-200 outline-none px-1"
                              placeholder="Project title"
                            />
                            <select
                              value={project.status}
                              onChange={(e) => {
                                const newValue = e.target.value;
                                setObjectives(prev => prev.map(o =>
                                  o.id === obj.id ? {
                                    ...o,
                                    initiatives: o.initiatives.map(i =>
                                      i.id === init.id ? {
                                        ...i,
                                        projects: i.projects.map(p =>
                                          p.id === project.id ? { ...p, status: newValue } : p
                                        )
                                      } : i
                                    )
                                  } : o
                                ));
                              }}
                              className={`px-3 py-1 text-xs font-semibold rounded-full outline-none cursor-pointer border ${
                                project.status === 'in_progress' ? 'bg-blue-100 text-blue-700 border-blue-200' :
                                project.status === 'planning' ? 'bg-orange-100 text-orange-700 border-orange-200' :
                                project.status === 'completed' ? 'bg-green-100 text-green-700 border-green-200' :
                                'bg-gray-100 text-gray-700 border-gray-200'
                              }`}
                            >
                              <option value="planning">planning</option>
                              <option value="in_progress">in progress</option>
                              <option value="completed">completed</option>
                            </select>
                          </div>
                          <div className="text-sm text-gray-600">
                            Initiative: {init.title} → Objective: {obj.title}
                          </div>
                        </div>

                        <div className="flex items-center space-x-4">
                          <div className="text-right mr-4">
                            <div className="text-xs text-gray-600">Progress</div>
                            <div className="text-2xl font-bold text-blue-600">{project.progress}%</div>
                          </div>
                          <div className="flex -space-x-2">
                            {project.assignees.map((assigneeId) => {
                              const member = teamMembers.find(m => m.id === assigneeId);
                              return member ? (
                                <div
                                  key={member.id}
                                  className="w-10 h-10 rounded-full bg-blue-600 border-2 border-white flex items-center justify-center text-white text-sm font-bold cursor-pointer hover:scale-110 transition-transform"
                                  title={member.name}
                                  onClick={() => {
                                    setSelectedProject({ project, objId: obj.id, initId: init.id });
                                    setShowTeamAssignModal(true);
                                  }}
                                >
                                  {member.avatar}
                                </div>
                              ) : null;
                            })}
                            <button
                              onClick={() => {
                                setSelectedProject({ project, objId: obj.id, initId: init.id });
                                setShowTeamAssignModal(true);
                              }}
                              className="w-10 h-10 rounded-full border-2 border-dashed border-gray-300 bg-white flex items-center justify-center text-gray-400 hover:text-gray-600 hover:border-gray-400 transition-all"
                            >
                              <UserPlus size={18} />
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
                        <div 
                          className="bg-blue-600 h-3 rounded-full transition-all"
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>

                      <div className="grid grid-cols-2 gap-6 mb-6">
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-bold text-gray-900 flex items-center space-x-2">
                              <Target size={18} className="text-blue-600" />
                              <span>Key Results</span>
                            </h4>
                            <button
                              onClick={() => {
                                setSelectedProject({ project, objId: obj.id, initId: init.id });
                                setShowKeyResultModal(true);
                              }}
                              className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                          <div className="space-y-3">
                            {project.keyResults.map((kr) => (
                              <div key={kr.id} className="border border-gray-200 rounded-lg p-3 group">
                                <div className="flex items-center justify-between mb-2">
                                  <div className="font-medium text-gray-900 text-sm flex-1">{kr.title}</div>
                                  <div className="flex items-center space-x-2">
                                    <input
                                      type="number"
                                      value={kr.progress}
                                      onChange={(e) => handleUpdateKeyResultProgress(obj.id, init.id, project.id, kr.id, parseInt(e.target.value))}
                                      className="w-16 px-2 py-1 border border-gray-300 rounded text-sm font-bold text-blue-600 text-right"
                                      min="0"
                                      max="100"
                                      title="Update progress"
                                    />
                                    <span className="text-xs text-gray-600">%</span>
                                  </div>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-1.5 mb-2">
                                  <div 
                                    className="bg-blue-600 h-1.5 rounded-full transition-all"
                                    style={{ width: `${kr.progress}%` }}
                                  ></div>
                                </div>
                                <div className="flex justify-between items-center text-xs">
                                  <div>
                                    <span className="text-gray-600">Current: </span>
                                    <input
                                      type="text"
                                      value={kr.current}
                                      onChange={(e) => {
                                        const newValue = e.target.value;
                                        setObjectives(prev => prev.map(o =>
                                          o.id === obj.id ? {
                                            ...o,
                                            initiatives: o.initiatives.map(i =>
                                              i.id === init.id ? {
                                                ...i,
                                                projects: i.projects.map(p =>
                                                  p.id === project.id ? {
                                                    ...p,
                                                    keyResults: p.keyResults.map(k =>
                                                      k.id === kr.id ? { ...k, current: newValue } : k
                                                    )
                                                  } : p
                                                )
                                              } : i
                                            )
                                          } : o
                                        ));
                                      }}
                                      className="w-24 px-1 py-0.5 border border-gray-200 rounded text-xs"
                                      placeholder="Current"
                                    />
                                  </div>
                                  <div>
                                    <span className="text-gray-600">Target: </span>
                                    <input
                                      type="text"
                                      value={kr.target}
                                      onChange={(e) => {
                                        const newValue = e.target.value;
                                        setObjectives(prev => prev.map(o =>
                                          o.id === obj.id ? {
                                            ...o,
                                            initiatives: o.initiatives.map(i =>
                                              i.id === init.id ? {
                                                ...i,
                                                projects: i.projects.map(p =>
                                                  p.id === project.id ? {
                                                    ...p,
                                                    keyResults: p.keyResults.map(k =>
                                                      k.id === kr.id ? { ...k, target: newValue } : k
                                                    )
                                                  } : p
                                                )
                                              } : i
                                            )
                                          } : o
                                        ));
                                      }}
                                      className="w-24 px-1 py-0.5 border border-gray-200 rounded text-xs"
                                      placeholder="Target"
                                    />
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-bold text-gray-900 flex items-center space-x-2">
                              <Activity size={18} className="text-blue-600" />
                              <span>KPIs</span>
                            </h4>
                            <button
                              onClick={() => {
                                setSelectedProject({ project, objId: obj.id, initId: init.id });
                                setShowKPIModal(true);
                              }}
                              className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                          <div className="space-y-3">
                            {project.kpis.map((kpi) => {
                              const healthColors = {
                                good: 'green',
                                warning: 'yellow',
                                critical: 'red'
                              };
                              const trendIcons = {
                                up: <TrendingUp size={14} className="text-blue-600" />,
                                down: <TrendingDown size={14} className="text-black" />,
                                neutral: <Activity size={14} className="text-gray-600" />
                              };
                              
                              return (
                                <div key={kpi.id} className="border border-gray-200 rounded-lg p-3">
                                  <div className="flex items-center justify-between mb-1">
                                    <input
                                      type="text"
                                      value={kpi.name}
                                      onChange={(e) => {
                                        const newValue = e.target.value;
                                        setObjectives(prev => prev.map(o =>
                                          o.id === obj.id ? {
                                            ...o,
                                            initiatives: o.initiatives.map(i =>
                                              i.id === init.id ? {
                                                ...i,
                                                projects: i.projects.map(p =>
                                                  p.id === project.id ? {
                                                    ...p,
                                                    kpis: p.kpis.map(k =>
                                                      k.id === kpi.id ? { ...k, name: newValue } : k
                                                    )
                                                  } : p
                                                )
                                              } : i
                                            )
                                          } : o
                                        ));
                                      }}
                                      className="font-medium text-gray-900 text-sm flex-1 border-b border-transparent focus:border-blue-300 outline-none px-1"
                                      placeholder="KPI name"
                                    />
                                    <div className="flex items-center space-x-2">
                                      {trendIcons[kpi.trend]}
                                      <span className={`px-2 py-0.5 ${getColorClasses(healthColors[kpi.health]).bg} ${getColorClasses(healthColors[kpi.health]).text} text-xs font-medium rounded`}>
                                        {kpi.health}
                                      </span>
                                    </div>
                                  </div>
                                  <span className={`inline-block px-2 py-0.5 text-xs font-semibold rounded border mb-2 ${
                                    kpi.type === 'leading' ? 'bg-purple-100 text-purple-700 border-purple-200' : 'bg-indigo-100 text-indigo-700 border-indigo-200'
                                  }`}>
                                    {kpi.type} indicator
                                  </span>
                                  <div className="flex items-center justify-between text-sm mb-1">
                                    <input
                                      type="number"
                                      value={kpi.current}
                                      onChange={(e) => handleUpdateKPI(obj.id, init.id, project.id, kpi.id, parseFloat(e.target.value))}
                                      className="w-20 px-2 py-1 border border-gray-300 rounded font-medium text-gray-900"
                                      title="Current value"
                                    />
                                    <span className="text-gray-600">/ </span>
                                    <input
                                      type="number"
                                      value={kpi.target}
                                      onChange={(e) => {
                                        const newValue = parseFloat(e.target.value);
                                        setObjectives(prev => prev.map(o =>
                                          o.id === obj.id ? {
                                            ...o,
                                            initiatives: o.initiatives.map(i =>
                                              i.id === init.id ? {
                                                ...i,
                                                projects: i.projects.map(p =>
                                                  p.id === project.id ? {
                                                    ...p,
                                                    kpis: p.kpis.map(k =>
                                                      k.id === kpi.id ? { ...k, target: newValue } : k
                                                    )
                                                  } : p
                                                )
                                              } : i
                                            )
                                          } : o
                                        ));
                                      }}
                                      className="w-20 px-2 py-1 border border-gray-300 rounded font-medium text-gray-600"
                                      title="Target value"
                                    />
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-gray-200 pt-6">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-bold text-gray-900 flex items-center space-x-2">
                            <Flag size={18} className="text-blue-600" />
                            <span>Milestones</span>
                          </h4>
                          <button
                            onClick={() => {
                              setSelectedProject({ project, objId: obj.id, initId: init.id });
                              setShowMilestoneModal(true);
                            }}
                            className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm font-medium"
                          >
                            Add Milestone
                          </button>
                        </div>
                        <div className="space-y-2">
                          {project.milestones.map((milestone) => (
                            <div 
                              key={milestone.id}
                              className={`flex items-center justify-between p-3 rounded-lg border ${
                                milestone.completed ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
                              }`}
                            >
                              <div className="flex items-center space-x-3 flex-1">
                                <button
                                  onClick={() => handleToggleMilestone(obj.id, init.id, project.id, milestone.id)}
                                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                                    milestone.completed
                                      ? 'bg-green-600 border-green-600'
                                      : 'border-gray-300 hover:border-blue-400'
                                  }`}
                                >
                                  {milestone.completed && <CheckCircle size={16} className="text-white" />}
                                </button>
                                <div className="flex-1">
                                  <input
                                    type="text"
                                    value={milestone.title}
                                    onChange={(e) => {
                                      const newValue = e.target.value;
                                      setObjectives(prev => prev.map(o =>
                                        o.id === obj.id ? {
                                          ...o,
                                          initiatives: o.initiatives.map(i =>
                                            i.id === init.id ? {
                                              ...i,
                                              projects: i.projects.map(p =>
                                                p.id === project.id ? {
                                                  ...p,
                                                  milestones: p.milestones.map(m =>
                                                    m.id === milestone.id ? { ...m, title: newValue } : m
                                                  )
                                                } : p
                                              )
                                            } : i
                                          )
                                        } : o
                                      ));
                                    }}
                                    className={`font-medium ${milestone.completed ? 'text-blue-600 line-through' : 'text-gray-900'} border-b border-transparent focus:border-gray-200 outline-none px-1 w-full`}
                                    placeholder="Milestone title"
                                  />
                                  {milestone.description && (
                                    <textarea
                                      value={milestone.description}
                                      onChange={(e) => {
                                        const newValue = e.target.value;
                                        setObjectives(prev => prev.map(o =>
                                          o.id === obj.id ? {
                                            ...o,
                                            initiatives: o.initiatives.map(i =>
                                              i.id === init.id ? {
                                                ...i,
                                                projects: i.projects.map(p =>
                                                  p.id === project.id ? {
                                                    ...p,
                                                    milestones: p.milestones.map(m =>
                                                      m.id === milestone.id ? { ...m, description: newValue } : m
                                                    )
                                                  } : p
                                                )
                                              } : i
                                            )
                                          } : o
                                        ));
                                      }}
                                      className="text-xs text-gray-600 border-b border-transparent focus:border-gray-200 outline-none px-1 w-full resize-none"
                                      rows="1"
                                      placeholder="Description"
                                    />
                                  )}
                                </div>
                              </div>
                              <input
                                type="date"
                                value={milestone.date || ''}
                                onChange={(e) => {
                                  const newValue = e.target.value;
                                  setObjectives(prev => prev.map(o =>
                                    o.id === obj.id ? {
                                      ...o,
                                      initiatives: o.initiatives.map(i =>
                                        i.id === init.id ? {
                                          ...i,
                                          projects: i.projects.map(p =>
                                            p.id === project.id ? {
                                              ...p,
                                              milestones: p.milestones.map(m =>
                                                m.id === milestone.id ? { ...m, date: newValue } : m
                                              )
                                            } : p
                                          )
                                        } : i
                                      )
                                    } : o
                                  ));
                                }}
                                className="text-sm text-gray-600 px-2 py-1 border border-gray-200 rounded"
                              />
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mt-6 pt-6 border-t border-gray-200">
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center space-x-2">
                            <span className="text-gray-600">Start: </span>
                            <input
                              type="date"
                              value={project.startDate}
                              onChange={(e) => {
                                const newValue = e.target.value;
                                setObjectives(prev => prev.map(o =>
                                  o.id === obj.id ? {
                                    ...o,
                                    initiatives: o.initiatives.map(i =>
                                      i.id === init.id ? {
                                        ...i,
                                        projects: i.projects.map(p =>
                                          p.id === project.id ? { ...p, startDate: newValue } : p
                                        )
                                      } : i
                                    )
                                  } : o
                                ));
                              }}
                              className="font-medium text-gray-900 px-2 py-1 border border-gray-200 rounded"
                            />
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-gray-600">Due: </span>
                            <input
                              type="date"
                              value={project.dueDate}
                              onChange={(e) => {
                                const newValue = e.target.value;
                                setObjectives(prev => prev.map(o =>
                                  o.id === obj.id ? {
                                    ...o,
                                    initiatives: o.initiatives.map(i =>
                                      i.id === init.id ? {
                                        ...i,
                                        projects: i.projects.map(p =>
                                          p.id === project.id ? { ...p, dueDate: newValue } : p
                                        )
                                      } : i
                                    )
                                  } : o
                                ));
                              }}
                              className="font-medium text-gray-900 px-2 py-1 border border-gray-200 rounded"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )
              )
            )}
          </motion.div>
        )}

        {activeTab === 'intelligence' && (
          <motion.div
            key="intelligence"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-3">
                <Brain className="text-blue-600" size={28} />
                <span>AI Intelligence & Recommendations</span>
              </h2>

              {aiRecommendations.length === 0 ? (
                <div className="text-center py-12">
                  <CheckCircle className="mx-auto text-blue-600 mb-4" size={48} />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">All Clear!</h3>
                  <p className="text-gray-600">No recommendations at the moment. Your strategy is on track.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {aiRecommendations.map((rec) => {
                    const objective = objectives.find(o => o.id === rec.objectiveId);
                    const typeColors = {
                      adjustment: 'blue',
                      resource: 'green',
                      risk: 'orange',
                      opportunity: 'purple'
                    };
                    const colors = getColorClasses(typeColors[rec.type]);
                    
                    return (
                      <motion.div
                        key={rec.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`border-2 ${rec.accepted ? 'border-gray-200 bg-blue-600' : colors.border} rounded-xl p-5`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <Lightbulb className={colors.text} size={20} />
                              <h3 className="font-bold text-gray-900">{rec.title}</h3>
                              <span className={`px-2 py-1 ${colors.bg} ${colors.text} text-xs font-medium rounded`}>
                                {rec.type}
                              </span>
                              <span className="text-xs text-gray-500">{rec.confidence}% confidence</span>
                              {rec.accepted && (
                                <span className="px-2 py-1 bg-blue-600 text-blue-600 text-xs font-medium rounded flex items-center space-x-1">
                                  <CheckCircle size={12} />
                                  <span>Applied</span>
                                </span>
                              )}
                            </div>
                            
                            {objective && (
                              <div className="text-xs text-gray-600 mb-3">
                                For objective: <span className="font-medium">{objective.title}</span>
                              </div>
                            )}
                            
                            <p className="text-gray-700 mb-3">{rec.description}</p>
                            
                            <div className="bg-white rounded-lg p-3 mb-3">
                              <div className="text-sm font-medium text-gray-900 mb-1">Recommended Action:</div>
                              <div className="text-sm text-blue-600">{rec.action}</div>
                            </div>
                            
                            <div className="flex items-center space-x-6 text-sm">
                              {Object.entries(rec.impact).map(([key, value]) => (
                                <div key={key}>
                                  <span className="text-gray-600 capitalize">{key}: </span>
                                  <span className="font-medium text-gray-900">{value}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          {!rec.accepted && (
                            <div className="ml-4 flex flex-col space-y-2">
                              <button
                                onClick={() => handleAcceptRecommendation(rec)}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all whitespace-nowrap"
                              >
                                Accept & Apply
                              </button>
                              <button
                                onClick={() => handleDismissRecommendation(rec.id)}
                                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-all"
                              >
                                Dismiss
                              </button>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>
          </motion.div>
        )}

        {activeTab === 'analytics' && (
          <motion.div
            key="analytics"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Overall Progress</h3>
                <div className="space-y-4">
                  {objectives.map((obj) => {
                    const healthStatus = getHealthStatus(obj.health);
                    const colors = getColorClasses(healthStatus.color);
                    return (
                      <div key={obj.id}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-900">{obj.title}</span>
                          <span className={`text-sm font-bold ${colors.text}`}>{obj.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="h-2 rounded-full bg-blue-600"
                            style={{ width: `${obj.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Health Scores</h3>
                <div className="space-y-4">
                  {objectives.map((obj) => {
                    const healthStatus = getHealthStatus(obj.health);
                    const HealthIcon = healthStatus.icon;
                    const colors = getColorClasses(healthStatus.color);
                    return (
                      <div key={obj.id} className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-900">{obj.title}</span>
                        <div className="flex items-center space-x-2">
                          <HealthIcon size={16} className={colors.text} />
                          <span className={`font-bold ${colors.text}`}>{obj.health}%</span>
                          <span className={`text-xs ${colors.text}`}>{healthStatus.label}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Team Utilization</h3>
              <div className="space-y-3">
                {teamMembers.map((member) => {
                  const assignedProjects = objectives.reduce((count, obj) =>
                    count + obj.initiatives.reduce((sum, init) =>
                      sum + init.projects.filter(p => p.assignees.includes(member.id)).length, 0
                    ), 0
                  );
                  const utilization = assignedProjects * 25;
                  
                  return (
                    <div key={member.id} className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-bold">
                        {member.avatar}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <div>
                            <div className="font-medium text-gray-900">{member.name}</div>
                            <div className="text-xs text-gray-600">{member.role}</div>
                          </div>
                          <div className="text-sm font-medium text-gray-900">{assignedProjects} projects</div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              utilization > 100 ? 'bg-blue-600' :
                              utilization > 75 ? 'bg-blue-600' :
                              'bg-blue-600'
                            }`}
                            style={{ width: `${Math.min(utilization, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Create/Edit Objective Modal */}
      <AnimatePresence>
        {showObjectiveModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => {
              setShowObjectiveModal(false);
              setEditMode(false);
              setCurrentObjectiveId(null);
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {editMode ? 'Edit Objective' : 'Create New Objective'}
                  </h2>
                  <button
                    onClick={() => {
                      setShowObjectiveModal(false);
                      setEditMode(false);
                      setCurrentObjectiveId(null);
                    }}
                    className="w-10 h-10 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Objective Title *
                  </label>
                  <input
                    type="text"
                    value={objectiveForm.title}
                    onChange={(e) => setObjectiveForm({ ...objectiveForm, title: e.target.value })}
                    placeholder="e.g., Reach $1M ARR"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-gray-200 focus:ring-0 font-medium text-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Description
                  </label>
                  <textarea
                    value={objectiveForm.description}
                    onChange={(e) => setObjectiveForm({ ...objectiveForm, description: e.target.value })}
                    placeholder="Describe your objective..."
                    rows={3}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-gray-200 focus:ring-0 font-medium text-gray-900"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Timeline (months)
                    </label>
                    <input
                      type="number"
                      value={objectiveForm.timeline}
                      onChange={(e) => setObjectiveForm({ ...objectiveForm, timeline: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-gray-200 focus:ring-0 font-medium text-gray-900"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Priority
                    </label>
                    <select
                      value={objectiveForm.priority}
                      onChange={(e) => setObjectiveForm({ ...objectiveForm, priority: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-gray-200 focus:ring-0 font-medium text-gray-900"
                    >
                      <option value="critical">Critical</option>
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Target Metric
                    </label>
                    <input
                      type="text"
                      value={objectiveForm.metrics.target}
                      onChange={(e) => setObjectiveForm({ ...objectiveForm, metrics: { ...objectiveForm.metrics, target: e.target.value } })}
                      placeholder="e.g., $1,000,000"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-gray-200 focus:ring-0 font-medium text-gray-900"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Current Metric
                    </label>
                    <input
                      type="text"
                      value={objectiveForm.metrics.current}
                      onChange={(e) => setObjectiveForm({ ...objectiveForm, metrics: { ...objectiveForm.metrics, current: e.target.value } })}
                      placeholder="e.g., $250,000"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-gray-200 focus:ring-0 font-medium text-gray-900"
                    />
                  </div>
                </div>

                {!editMode && (
                  <div className="bg-white rounded-xl p-4">
                    <div className="flex items-start space-x-3">
                      <Brain className="text-blue-600 mt-0.5" size={20} />
                      <div className="text-sm text-gray-700">
                        <span className="font-medium">AI will generate 3-4 strategic initiatives</span> based on your objective, analyzing industry benchmarks and best practices.
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-6 border-t border-gray-200 flex justify-end space-x-3 sticky bottom-0 bg-white">
                <button
                  onClick={() => {
                    setShowObjectiveModal(false);
                    setEditMode(false);
                    setCurrentObjectiveId(null);
                  }}
                  className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={editMode ? handleUpdateObjective : handleCreateObjective}
                  disabled={!objectiveForm.title}
                  className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {editMode ? 'Update Objective' : 'Create Objective'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add KPI Modal */}
      <AnimatePresence>
        {showKPIModal && selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowKPIModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full"
            >
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">Add KPI</h2>
              </div>

              <div className="p-6 space-y-4">
                <input
                  type="text"
                  placeholder="KPI Name"
                  value={kpiForm.name}
                  onChange={(e) => setKPIForm({ ...kpiForm, name: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-0"
                />

                <select
                  value={kpiForm.type}
                  onChange={(e) => setKPIForm({ ...kpiForm, type: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-0"
                >
                  <option value="leading">Leading Indicator</option>
                  <option value="lagging">Lagging Indicator</option>
                </select>

                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="number"
                    placeholder="Target"
                    value={kpiForm.target}
                    onChange={(e) => setKPIForm({ ...kpiForm, target: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-0"
                  />
                  <input
                    type="number"
                    placeholder="Current"
                    value={kpiForm.current}
                    onChange={(e) => setKPIForm({ ...kpiForm, current: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-0"
                  />
                </div>
              </div>

              <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
                <button
                  onClick={() => setShowKPIModal(false)}
                  className="px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleAddKPI(selectedProject.project.id, selectedProject.objId, selectedProject.initId)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
                >
                  Add KPI
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Key Result Modal */}
      <AnimatePresence>
        {showKeyResultModal && selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowKeyResultModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full"
            >
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">Add Key Result</h2>
              </div>

              <div className="p-6 space-y-4">
                <input
                  type="text"
                  placeholder="Key Result Title"
                  value={keyResultForm.title}
                  onChange={(e) => setKeyResultForm({ ...keyResultForm, title: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-gray-200 focus:ring-0"
                />

                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Target"
                    value={keyResultForm.target}
                    onChange={(e) => setKeyResultForm({ ...keyResultForm, target: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-gray-200 focus:ring-0"
                  />
                  <input
                    type="text"
                    placeholder="Current Status"
                    value={keyResultForm.current}
                    onChange={(e) => setKeyResultForm({ ...keyResultForm, current: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-gray-200 focus:ring-0"
                  />
                </div>
              </div>

              <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
                <button
                  onClick={() => setShowKeyResultModal(false)}
                  className="px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleAddKeyResult(selectedProject.project.id, selectedProject.objId, selectedProject.initId)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-600"
                >
                  Add Key Result
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Team Assignment Modal */}
      <AnimatePresence>
        {showTeamAssignModal && selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowTeamAssignModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full"
            >
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">Assign Team Members</h2>
                <p className="text-sm text-gray-600 mt-1">Click to toggle assignment</p>
              </div>

              <div className="p-6 max-h-96 overflow-y-auto">
                <div className="space-y-2">
                  {teamMembers.map((member) => {
                    const isAssigned = selectedProject.project.assignees.includes(member.id);
                    return (
                      <button
                        key={member.id}
                        onClick={() => handleAssignTeamMember(selectedProject.project.id, selectedProject.objId, selectedProject.initId, member.id)}
                        className={`w-full flex items-center space-x-3 p-3 rounded-xl border-2 transition-all ${
                          isAssigned
                            ? 'border-gray-200 bg-blue-600'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                          isAssigned ? 'bg-blue-600' : 'bg-gray-400'
                        }`}>
                          {member.avatar}
                        </div>
                        <div className="flex-1 text-left">
                          <div className="font-medium text-gray-900">{member.name}</div>
                          <div className="text-sm text-gray-600">{member.role}</div>
                        </div>
                        {isAssigned && <CheckCircle size={20} className="text-blue-600" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="p-6 border-t border-gray-200">
                <button
                  onClick={() => setShowTeamAssignModal(false)}
                  className="w-full px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-600 font-medium"
                >
                  Done
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Milestone Modal */}
      <AnimatePresence>
        {showMilestoneModal && selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowMilestoneModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full"
            >
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">Add Milestone</h2>
              </div>

              <div className="p-6 space-y-4">
                <input
                  type="text"
                  placeholder="Milestone Title"
                  value={milestoneForm.title}
                  onChange={(e) => setMilestoneForm({ ...milestoneForm, title: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-gray-200 focus:ring-0"
                />

                <input
                  type="date"
                  value={milestoneForm.date}
                  onChange={(e) => setMilestoneForm({ ...milestoneForm, date: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-gray-200 focus:ring-0"
                />

                <textarea
                  placeholder="Description (optional)"
                  value={milestoneForm.description}
                  onChange={(e) => setMilestoneForm({ ...milestoneForm, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-gray-200 focus:ring-0"
                />
              </div>

              <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
                <button
                  onClick={() => setShowMilestoneModal(false)}
                  className="px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleAddMilestone(selectedProject.project.id, selectedProject.objId, selectedProject.initId)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-600"
                >
                  Add Milestone
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Recalibration Modal */}
      <AnimatePresence>
        {showRecalibrationModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center"
            >
              <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <RefreshCw size={40} className="text-white animate-spin" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Recalibrating Strategy...</h2>
              <p className="text-gray-600">
                AI is analyzing KPIs, market signals, team velocity, and progress metrics to update your objectives.
              </p>
              <div className="mt-6 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Analyzing health scores</span>
                  <CheckCircle size={16} className="text-blue-600" />
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Checking timelines</span>
                  <div className="w-4 h-4 border-2 border-gray-200 border-t-transparent rounded-full animate-spin"></div>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <span>Generating recommendations</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Impacts;
