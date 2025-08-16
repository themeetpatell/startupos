import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Plus, 
  Star, 
  Download, 
  Eye, 
  Code, 
  Store, 
  Users, 
  TrendingUp,
  MessageCircle,
  Brain,
  Zap,
  Target,
  BarChart3,
  Lightbulb,
  Rocket,
  Shield,
  Globe,
  Cpu,
  Palette,
  Database,
  FileText,
  Calendar,
  MapPin,
  Clock,
  CheckCircle,
  ExternalLink,
  Settings,
  Trash2,
  Edit,
  Play,
  Pause,
  MoreVertical,
  Grid,
  List,
  Share2,
  Award,
  DollarSign,
  Building,
  BookmarkPlus,
  Bookmark,
  ThumbsUp,
  X,
  AlertCircle,
  Info,
  AlertTriangle,
  Copy,
  Grid3X3
} from 'lucide-react';
import ToolDetail from './ToolDetail';
import ToolBuilder from './ToolBuilder';
import ToolUsage from './ToolUsage';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ScrollArea } from './ui/scroll-area';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { cn } from '../lib/utils';
import '../App.css';

const AICoBuilder = () => {
  const [activeTab, setActiveTab] = useState('marketplace');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popular');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedTool, setSelectedTool] = useState(null);
  const [showToolBuilder, setShowToolBuilder] = useState(false);
  const [showToolUsage, setShowToolUsage] = useState(false);
  const [selectedToolForUsage, setSelectedToolForUsage] = useState(null);
  const [favorites, setFavorites] = useState(new Set());
  const [filteredTools, setFilteredTools] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [categoryScrollRef, setCategoryScrollRef] = useState(null);

  // My tools state
  const [myTools, setMyTools] = useState([
    {
      id: 101,
      name: 'My Custom Analytics Tool',
      description: 'A personalized analytics dashboard for tracking startup metrics',
      category: 'analytics',
      status: 'published',
      downloads: 45,
      rating: 4.2,
      reviews: 12,
      lastUpdated: '1 week ago',
      tags: ['analytics', 'dashboard', 'metrics'],
      features: ['Real-time data', 'Custom reports', 'Export functionality']
    },
    {
      id: 102,
      name: 'Startup Growth Tracker',
      description: 'Track and visualize your startup growth metrics over time',
      category: 'growth',
      status: 'draft',
      downloads: 23,
      rating: 4.5,
      reviews: 8,
      lastUpdated: '3 days ago',
      tags: ['growth', 'tracking', 'visualization'],
      features: ['Growth charts', 'Goal setting', 'Progress tracking']
    }
  ]);

  // Enhanced mouse wheel support for categories
  const handleCategoryWheel = useCallback((e) => {
    if (categoryScrollRef) {
      e.preventDefault();
      const scrollAmount = e.deltaY > 0 ? 100 : -100;
      categoryScrollRef.scrollLeft += scrollAmount;
    }
  }, [categoryScrollRef]);

  // Enhanced search with debouncing
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Enhanced filtering and sorting
  useEffect(() => {
    let filtered = [...marketplaceTools];
    
    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(tool => tool.category === selectedCategory);
    }
    
    // Filter by search query
    if (debouncedSearchQuery.trim()) {
      const query = debouncedSearchQuery.toLowerCase();
      filtered = filtered.filter(tool => 
        tool.name.toLowerCase().includes(query) ||
        tool.description.toLowerCase().includes(query) ||
        tool.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    // Sort tools
    switch (sortBy) {
      case 'popular':
        filtered.sort((a, b) => b.downloads - a.downloads);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated));
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }
    
    setFilteredTools(filtered);
  }, [debouncedSearchQuery, selectedCategory, sortBy]);

  // Tool interaction functions
  const toggleFavorite = (toolId) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(toolId)) {
        newFavorites.delete(toolId);
      } else {
        newFavorites.add(toolId);
      }
      return newFavorites;
    });
  };

  const downloadTool = (tool) => {
    // Simulate download
    const updatedTools = marketplaceTools.map(t => 
      t.id === tool.id ? { ...t, downloads: t.downloads + 1 } : t
    );
    // In a real app, this would update the backend
    console.log(`Downloading ${tool.name}`);
    
    // Show success message
    alert(`Successfully downloaded ${tool.name}!`);
  };

  const rateTool = (toolId, rating) => {
    // In a real app, this would update the backend
    console.log(`Rated tool ${toolId} with ${rating} stars`);
  };

  const shareTool = (tool) => {
    if (navigator.share) {
      navigator.share({
        title: tool.name,
        text: tool.description,
        url: window.location.href
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(`${tool.name}: ${tool.description}`);
      alert('Tool link copied to clipboard!');
    }
  };

  // Category-specific co-builders
  const getCategorySpecificBuilder = (category) => {
    const builders = {
      finance: {
        title: "Finance AI Tool Builder",
        description: "Create AI-powered financial tools for startups",
        icon: DollarSign,
        color: "from-green-500 to-emerald-600",
        fields: [
          { name: 'financialModel', label: 'Financial Model Type', type: 'select', options: ['Valuation', 'Forecasting', 'Budgeting', 'Investment Analysis', 'Risk Assessment'] },
          { name: 'compliance', label: 'Compliance Features', type: 'multiselect', options: ['SEC', 'GAAP', 'IFRS', 'Tax Compliance', 'Audit Ready'] },
          { name: 'dataSources', label: 'Data Sources', type: 'multiselect', options: ['Market Data', 'Company Financials', 'Economic Indicators', 'Real-time Feeds'] }
        ],
        templates: [
          { name: 'Valuation Calculator', description: 'AI-powered startup valuation tool', category: 'finance' },
          { name: 'Cash Flow Predictor', description: 'Predict cash flow with ML algorithms', category: 'finance' },
          { name: 'Investment Tracker', description: 'Track and analyze investment performance', category: 'finance' }
        ]
      },
      marketing: {
        title: "Marketing AI Tool Builder",
        description: "Build AI-driven marketing automation tools",
        icon: Target,
        color: "from-purple-500 to-pink-600",
        fields: [
          { name: 'campaignType', label: 'Campaign Type', type: 'select', options: ['Email Marketing', 'Social Media', 'Content Marketing', 'SEO', 'PPC'] },
          { name: 'audienceTargeting', label: 'Audience Targeting', type: 'multiselect', options: ['Demographics', 'Behavioral', 'Geographic', 'Psychographic', 'Custom Segments'] },
          { name: 'analytics', label: 'Analytics Features', type: 'multiselect', options: ['ROI Tracking', 'A/B Testing', 'Conversion Funnel', 'Customer Journey'] }
        ],
        templates: [
          { name: 'Content Optimizer', description: 'AI-powered content optimization tool', category: 'marketing' },
          { name: 'Campaign Manager', description: 'Automated campaign management', category: 'marketing' },
          { name: 'Social Media Scheduler', description: 'Intelligent social media scheduling', category: 'marketing' }
        ]
      },
      product: {
        title: "Product AI Tool Builder",
        description: "Create AI tools for product development and management",
        icon: Lightbulb,
        color: "from-blue-500 to-cyan-600",
        fields: [
          { name: 'productPhase', label: 'Product Phase', type: 'select', options: ['Ideation', 'Design', 'Development', 'Launch', 'Growth'] },
          { name: 'userResearch', label: 'User Research', type: 'multiselect', options: ['Surveys', 'Interviews', 'Analytics', 'A/B Testing', 'Heatmaps'] },
          { name: 'roadmap', label: 'Roadmap Features', type: 'multiselect', options: ['Feature Prioritization', 'Timeline Planning', 'Resource Allocation', 'Milestone Tracking'] }
        ],
        templates: [
          { name: 'Feature Prioritizer', description: 'AI-powered feature prioritization', category: 'product' },
          { name: 'User Feedback Analyzer', description: 'Analyze user feedback with NLP', category: 'product' },
          { name: 'Product Roadmap Generator', description: 'Generate intelligent product roadmaps', category: 'product' }
        ]
      },
      analytics: {
        title: "Analytics AI Tool Builder",
        description: "Build AI-powered data analysis and visualization tools",
        icon: BarChart3,
        color: "from-indigo-500 to-purple-600",
        fields: [
          { name: 'dataType', label: 'Data Type', type: 'select', options: ['Structured', 'Unstructured', 'Time Series', 'Geospatial', 'Real-time'] },
          { name: 'analysisType', label: 'Analysis Type', type: 'multiselect', options: ['Descriptive', 'Predictive', 'Prescriptive', 'Diagnostic', 'Exploratory'] },
          { name: 'visualization', label: 'Visualization', type: 'multiselect', options: ['Charts', 'Dashboards', 'Maps', 'Interactive', 'Real-time'] }
        ],
        templates: [
          { name: 'Data Dashboard', description: 'AI-powered analytics dashboard', category: 'analytics' },
          { name: 'Predictive Model', description: 'ML-based prediction tool', category: 'analytics' },
          { name: 'Report Generator', description: 'Automated report generation', category: 'analytics' }
        ]
      },
      hr: {
        title: "HR AI Tool Builder",
        description: "Create AI tools for human resources and hiring",
        icon: Users,
        color: "from-pink-500 to-rose-600",
        fields: [
          { name: 'hrFunction', label: 'HR Function', type: 'select', options: ['Recruitment', 'Performance Management', 'Training', 'Employee Engagement', 'Compliance'] },
          { name: 'aiFeatures', label: 'AI Features', type: 'multiselect', options: ['Resume Screening', 'Interview Scheduling', 'Skill Assessment', 'Performance Analytics'] },
          { name: 'integration', label: 'Integrations', type: 'multiselect', options: ['ATS', 'HRIS', 'Learning Platforms', 'Communication Tools'] }
        ],
        templates: [
          { name: 'Resume Screener', description: 'AI-powered resume screening tool', category: 'hr' },
          { name: 'Interview Scheduler', description: 'Intelligent interview scheduling', category: 'hr' },
          { name: 'Performance Tracker', description: 'AI-driven performance analytics', category: 'hr' }
        ]
      },
      sales: {
        title: "Sales AI Tool Builder",
        description: "Build AI tools for sales optimization and forecasting",
        icon: TrendingUp,
        color: "from-teal-500 to-cyan-600",
        fields: [
          { name: 'salesProcess', label: 'Sales Process', type: 'select', options: ['Lead Generation', 'Qualification', 'Prospecting', 'Closing', 'Retention'] },
          { name: 'automation', label: 'Automation Features', type: 'multiselect', options: ['Lead Scoring', 'Email Sequences', 'Follow-up Reminders', 'Pipeline Management'] },
          { name: 'forecasting', label: 'Forecasting', type: 'multiselect', options: ['Revenue Prediction', 'Lead Conversion', 'Sales Cycle', 'Territory Planning'] }
        ],
        templates: [
          { name: 'Lead Scorer', description: 'AI-powered lead scoring tool', category: 'sales' },
          { name: 'Sales Forecaster', description: 'Predict sales with ML algorithms', category: 'sales' },
          { name: 'Pipeline Optimizer', description: 'Optimize sales pipeline efficiency', category: 'sales' }
        ]
      },
      development: {
        title: "Development AI Tool Builder",
        description: "Create AI tools for software development",
        icon: Code,
        color: "from-gray-500 to-slate-600",
        fields: [
          { name: 'devPhase', label: 'Development Phase', type: 'select', options: ['Planning', 'Design', 'Development', 'Testing', 'Deployment'] },
          { name: 'codeQuality', label: 'Code Quality', type: 'multiselect', options: ['Code Review', 'Testing', 'Documentation', 'Performance', 'Security'] },
          { name: 'automation', label: 'Automation', type: 'multiselect', options: ['CI/CD', 'Testing', 'Deployment', 'Monitoring', 'Debugging'] }
        ],
        templates: [
          { name: 'Code Reviewer', description: 'AI-powered code review tool', category: 'development' },
          { name: 'Test Generator', description: 'Automated test case generation', category: 'development' },
          { name: 'Bug Predictor', description: 'Predict potential bugs with ML', category: 'development' }
        ]
      },
      design: {
        title: "Design AI Tool Builder",
        description: "Build AI tools for design and creative work",
        icon: Palette,
        color: "from-orange-500 to-red-600",
        fields: [
          { name: 'designType', label: 'Design Type', type: 'select', options: ['UI/UX', 'Graphic Design', 'Web Design', 'Mobile Design', 'Brand Design'] },
          { name: 'aiFeatures', label: 'AI Features', type: 'multiselect', options: ['Layout Generation', 'Color Schemes', 'Typography', 'Icon Generation', 'Style Transfer'] },
          { name: 'export', label: 'Export Formats', type: 'multiselect', options: ['PNG', 'SVG', 'PDF', 'Figma', 'Sketch'] }
        ],
        templates: [
          { name: 'Layout Generator', description: 'AI-powered layout generation', category: 'design' },
          { name: 'Color Palette Creator', description: 'Intelligent color scheme generation', category: 'design' },
          { name: 'Icon Generator', description: 'AI-driven icon creation tool', category: 'design' }
        ]
      },
      legal: {
        title: "Legal AI Tool Builder",
        description: "Create AI tools for legal compliance and document review",
        icon: Shield,
        color: "from-red-500 to-pink-600",
        fields: [
          { name: 'legalArea', label: 'Legal Area', type: 'select', options: ['Contracts', 'Compliance', 'IP', 'Employment', 'Corporate'] },
          { name: 'documentType', label: 'Document Type', type: 'multiselect', options: ['Contracts', 'NDAs', 'Terms of Service', 'Privacy Policies', 'Employment Agreements'] },
          { name: 'compliance', label: 'Compliance', type: 'multiselect', options: ['GDPR', 'CCPA', 'SOX', 'HIPAA', 'Industry Specific'] }
        ],
        templates: [
          { name: 'Contract Analyzer', description: 'AI-powered contract review tool', category: 'legal' },
          { name: 'Compliance Checker', description: 'Automated compliance verification', category: 'legal' },
          { name: 'Document Generator', description: 'Generate legal documents with AI', category: 'legal' }
        ]
      },
      operations: {
        title: "Operations AI Tool Builder",
        description: "Build AI tools for business operations and efficiency",
        icon: Building,
        color: "from-orange-500 to-yellow-600",
        fields: [
          { name: 'operationType', label: 'Operation Type', type: 'select', options: ['Process Automation', 'Supply Chain', 'Quality Control', 'Resource Management', 'Performance Monitoring'] },
          { name: 'automation', label: 'Automation Level', type: 'multiselect', options: ['Task Automation', 'Process Optimization', 'Decision Support', 'Predictive Maintenance'] },
          { name: 'integration', label: 'System Integration', type: 'multiselect', options: ['ERP', 'CRM', 'SCM', 'WMS', 'Custom Systems'] }
        ],
        templates: [
          { name: 'Process Optimizer', description: 'AI-powered process optimization', category: 'operations' },
          { name: 'Supply Chain Tracker', description: 'Intelligent supply chain management', category: 'operations' },
          { name: 'Performance Monitor', description: 'Real-time performance tracking', category: 'operations' }
        ]
      },
      'customer-support': {
        title: "Customer Support AI Tool Builder",
        description: "Create AI tools for customer service and support",
        icon: MessageCircle,
        color: "from-blue-500 to-indigo-600",
        fields: [
          { name: 'supportType', label: 'Support Type', type: 'select', options: ['Chatbot', 'Ticket Management', 'Knowledge Base', 'Live Chat', 'Self-Service'] },
          { name: 'aiFeatures', label: 'AI Features', type: 'multiselect', options: ['Natural Language Processing', 'Sentiment Analysis', 'Auto-Response', 'Escalation', 'Learning'] },
          { name: 'channels', label: 'Support Channels', type: 'multiselect', options: ['Email', 'Chat', 'Phone', 'Social Media', 'Help Center'] }
        ],
        templates: [
          { name: 'Smart Chatbot', description: 'AI-powered customer support chatbot', category: 'customer-support' },
          { name: 'Ticket Router', description: 'Intelligent ticket routing system', category: 'customer-support' },
          { name: 'Knowledge Base', description: 'AI-driven knowledge management', category: 'customer-support' }
        ]
      }
    };
    
    return builders[category] || builders['product']; // Default to product if category not found
  };

  // Enhanced button actions with better feedback
  const handleToolAction = (tool, action) => {
    switch (action) {
      case 'favorite':
        toggleFavorite(tool.id);
        // Show toast notification
        showToast(`Tool ${favorites.has(tool.id) ? 'removed from' : 'added to'} favorites`, 'success');
        break;
      case 'download':
        downloadTool(tool);
        break;
      case 'share':
        shareTool(tool);
        break;
      case 'rate':
        openRatingModal(tool);
        break;
      case 'use':
        setSelectedToolForUsage(tool);
        setShowToolUsage(true);
        break;
      case 'edit':
        editMyTool(tool);
        break;
      case 'delete':
        deleteMyTool(tool.id);
        break;
      case 'duplicate':
        duplicateTool(tool);
        break;
      case 'export':
        exportTool(tool);
        break;
      case 'integrate':
        integrateTool(tool);
        break;
      default:
        break;
    }
  };

  // New action functions
  const duplicateTool = (tool) => {
    const duplicatedTool = {
      ...tool,
      id: Date.now(),
      name: `${tool.name} (Copy)`,
      downloads: 0,
      rating: 0,
      reviews: 0,
      lastUpdated: 'Just now',
      isNew: true
    };
    setMyTools(prev => [...prev, duplicatedTool]);
    showToast('Tool duplicated successfully!', 'success');
  };

  const exportTool = (tool) => {
    const toolData = JSON.stringify(tool, null, 2);
    const blob = new Blob([toolData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${tool.name.replace(/\s+/g, '_')}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('Tool exported successfully!', 'success');
  };

  const integrateTool = (tool) => {
    // Simulate integration process
    showToast('Starting integration process...', 'info');
    setTimeout(() => {
      showToast('Tool integrated successfully!', 'success');
    }, 2000);
  };

  // Toast notification system
  const [toasts, setToasts] = useState([]);
  
  const showToast = (message, type = 'info') => {
    const id = Date.now();
    const toast = { id, message, type };
    setToasts(prev => [...prev, toast]);
    
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  };

  // Category-specific tool creation
  const createCategorySpecificTool = (category) => {
    const builder = getCategorySpecificBuilder(category);
    setSelectedCategory(category);
    setShowToolBuilder(true);
    // Pre-populate with category-specific data
    setToolBuilderData({
      category: category,
      title: builder.title,
      description: builder.description,
      fields: builder.fields,
      templates: builder.templates
    });
  };

  const [toolBuilderData, setToolBuilderData] = useState(null);

  const createNewTool = (toolData) => {
    const newTool = {
      id: Date.now(),
      ...toolData,
      downloads: 0,
      rating: 0,
      reviews: 0,
      lastUpdated: 'Just now',
      isVerified: false,
      isFeatured: false,
      isNew: true
    };
    
    // Add to my tools
    setMyTools(prev => [...prev, newTool]);
    
    setShowToolBuilder(false);
    alert('Tool created successfully!');
  };

  const deleteMyTool = (toolId) => {
    if (confirm('Are you sure you want to delete this tool?')) {
      // Remove from my tools
      setMyTools(prev => prev.filter(t => t.id !== toolId));
      // In a real app, this would update the backend
      console.log(`Deleted tool ${toolId}`);
    }
  };

  const editMyTool = (tool) => {
    setSelectedTool(tool);
    setShowToolBuilder(true);
  };

  const categories = [
    { id: 'all', name: 'All Tools', icon: Grid, count: 156 },
    { id: 'finance', name: 'Finance', icon: DollarSign, count: 23 },
    { id: 'marketing', name: 'Marketing', icon: Target, count: 34 },
    { id: 'product', name: 'Product', icon: Lightbulb, count: 28 },
    { id: 'operations', name: 'Operations', icon: Building, count: 19 },
    { id: 'analytics', name: 'Analytics', icon: BarChart3, count: 31 },
    { id: 'legal', name: 'Legal', icon: Shield, count: 12 },
    { id: 'hr', name: 'HR & Hiring', icon: Users, count: 15 },
    { id: 'sales', name: 'Sales', icon: TrendingUp, count: 22 },
    { id: 'development', name: 'Development', icon: Code, count: 18 },
    { id: 'design', name: 'Design', icon: Palette, count: 25 },
    { id: 'customer-support', name: 'Support', icon: MessageCircle, count: 14 }
  ];

  const marketplaceTools = [
    {
      id: 1,
      name: 'Funding Strategy AI',
      description: 'AI-powered fundraising strategy generator with personalized recommendations',
      creator: 'Sarah Chen',
      creatorAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      category: 'finance',
      rating: 4.8,
      reviews: 127,
      downloads: 2340,
      price: 'Free',
      tags: ['fundraising', 'strategy', 'financial modeling'],
      features: ['Pitch deck generation', 'Investor matching', 'Valuation analysis'],
      lastUpdated: '2 days ago',
      isVerified: true,
      isFeatured: true,
      isNew: false
    },
    {
      id: 2,
      name: 'Market Analysis Pro',
      description: 'Comprehensive market research and competitive analysis tool',
      creator: 'Alex Rodriguez',
      creatorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      category: 'analytics',
      rating: 4.9,
      reviews: 89,
      downloads: 1890,
      price: '$29/month',
      tags: ['market research', 'competition', 'trends'],
      features: ['Competitive analysis', 'Market sizing', 'Trend prediction'],
      lastUpdated: '1 week ago',
      isVerified: true,
      isFeatured: false,
      isNew: true
    },
    {
      id: 3,
      name: 'Hiring Intelligence',
      description: 'AI-driven candidate screening and job description optimizer',
      creator: 'Maria Garcia',
      creatorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      category: 'hr',
      rating: 4.7,
      reviews: 156,
      downloads: 3120,
      price: 'Free',
      tags: ['hiring', 'recruitment', 'candidate screening'],
      features: ['Job description AI', 'Candidate matching', 'Interview prep'],
      lastUpdated: '3 days ago',
      isVerified: true,
      isFeatured: true,
      isNew: false
    },
    {
      id: 4,
      name: 'Customer Journey Mapper',
      description: 'Visualize and optimize customer touchpoints with AI insights',
      creator: 'David Kim',
      creatorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      category: 'marketing',
      rating: 4.6,
      reviews: 203,
      downloads: 4560,
      price: '$19/month',
      tags: ['customer journey', 'mapping', 'optimization'],
      features: ['Journey visualization', 'Pain point analysis', 'Optimization suggestions'],
      lastUpdated: '5 days ago',
      isVerified: false,
      isFeatured: false,
      isNew: false
    },
    {
      id: 5,
      name: 'Legal Contract Analyzer',
      description: 'AI-powered contract review and risk assessment tool',
      creator: 'Jennifer Law',
      creatorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
      category: 'legal',
      rating: 4.9,
      reviews: 67,
      downloads: 890,
      price: '$49/month',
      tags: ['legal', 'contracts', 'compliance'],
      features: ['Contract review', 'Risk assessment', 'Compliance check'],
      lastUpdated: '1 week ago',
      isVerified: true,
      isFeatured: false,
      isNew: false
    },
    {
      id: 6,
      name: 'Product Roadmap AI',
      description: 'Intelligent product planning and feature prioritization',
      creator: 'Mike Thompson',
      creatorAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face',
      category: 'product',
      rating: 4.8,
      reviews: 134,
      downloads: 2780,
      price: '$39/month',
      tags: ['product management', 'roadmap', 'prioritization'],
      features: ['Feature prioritization', 'Timeline planning', 'Resource allocation'],
      lastUpdated: '4 days ago',
      isVerified: true,
      isFeatured: true,
      isNew: false
    },
    {
      id: 7,
      name: 'Sales Pipeline Optimizer',
      description: 'AI-powered sales forecasting and pipeline management',
      creator: 'Lisa Wang',
      creatorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
      category: 'sales',
      rating: 4.7,
      reviews: 98,
      downloads: 1650,
      price: '$25/month',
      tags: ['sales', 'forecasting', 'pipeline'],
      features: ['Lead scoring', 'Conversion prediction', 'Revenue forecasting'],
      lastUpdated: '6 days ago',
      isVerified: true,
      isFeatured: false,
      isNew: false
    },
    {
      id: 8,
      name: 'Design System Generator',
      description: 'Automated design system creation and component library management',
      creator: 'Chris Johnson',
      creatorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      category: 'design',
      rating: 4.6,
      reviews: 76,
      downloads: 980,
      price: '$35/month',
      tags: ['design', 'UI/UX', 'components'],
      features: ['Component generation', 'Style guide creation', 'Design tokens'],
      lastUpdated: '1 week ago',
      isVerified: false,
      isFeatured: false,
      isNew: true
    },
    {
      id: 9,
      name: 'Code Review Assistant',
      description: 'AI-powered code review and quality assurance tool',
      creator: 'Sam Developer',
      creatorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      category: 'development',
      rating: 4.8,
      reviews: 112,
      downloads: 2100,
      price: 'Free',
      tags: ['development', 'code review', 'quality'],
      features: ['Automated review', 'Bug detection', 'Best practices'],
      lastUpdated: '3 days ago',
      isVerified: true,
      isFeatured: false,
      isNew: false
    }
  ];

  const handleFavoriteToggle = useCallback((toolId) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(toolId)) {
        newFavorites.delete(toolId);
      } else {
        newFavorites.add(toolId);
      }
      return newFavorites;
    });
  }, []);

  // Enhanced category selection with smooth scrolling
  const handleCategorySelect = useCallback((categoryId) => {
    setSelectedCategory(categoryId);
    
    // Smooth scroll to show the selected category if it's not visible
    if (categoryScrollRef) {
      const categoryElement = categoryScrollRef.querySelector(`[data-category="${categoryId}"]`);
      if (categoryElement) {
        categoryElement.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }
    }
  }, [categoryScrollRef]);

  // Category-specific builder selection
  const handleCategoryBuilderSelect = useCallback((categoryId) => {
    if (categoryId === 'all') {
      setShowToolBuilder(true);
      setToolBuilderData(null);
    } else {
      createCategorySpecificTool(categoryId);
    }
  }, []);

  // Keyboard navigation support
  const handleKeyDown = useCallback((e, tool, action) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleToolAction(tool, action);
    }
  }, [handleToolAction]);

  // Enhanced search with suggestions
  const searchSuggestions = useMemo(() => {
    if (!searchQuery.trim()) return [];
    
    const suggestions = new Set();
    marketplaceTools.forEach(tool => {
      if (tool.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        suggestions.add(tool.name);
      }
      tool.tags.forEach(tag => {
        if (tag.toLowerCase().includes(searchQuery.toLowerCase())) {
          suggestions.add(tag);
        }
      });
    });
    
    return Array.from(suggestions).slice(0, 5);
  }, [searchQuery, marketplaceTools]);

  // Enhanced search with autocomplete
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const searchRef = useRef(null);

  // Community features
  const [showCommunity, setShowCommunity] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [selectedToolForRating, setSelectedToolForRating] = useState(null);
  const [ratingValue, setRatingValue] = useState(5);
  const [ratingComment, setRatingComment] = useState('');
  const [communityComments, setCommunityComments] = useState([
    {
      id: 1,
      user: 'Alex Johnson',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      comment: 'The Funding Strategy AI tool helped me secure my Series A! Incredible insights.',
      rating: 5,
      tool: 'Funding Strategy AI',
      date: '2 days ago'
    },
    {
      id: 2,
      user: 'Maria Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      comment: 'Market Analysis Pro is a game-changer for competitive research.',
      rating: 5,
      tool: 'Market Analysis Pro',
      date: '1 week ago'
    },
    {
      id: 3,
      user: 'David Kim',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      comment: 'Customer Insights Hub gave me the data I needed to pivot successfully.',
      rating: 4,
      tool: 'Customer Insights Hub',
      date: '3 days ago'
    }
  ]);

  const [newComment, setNewComment] = useState('');
  const [selectedToolForComment, setSelectedToolForComment] = useState('');

  // Tool analytics data
  const toolAnalytics = {
    totalUsage: 1247,
    monthlyGrowth: 23.5,
    topTools: [
      { name: 'Funding Strategy AI', usage: 342, growth: 15.2 },
      { name: 'Market Analysis Pro', usage: 298, growth: 28.7 },
      { name: 'Customer Insights Hub', usage: 187, growth: 12.4 }
    ],
    categories: [
      { name: 'Finance', count: 8, usage: 45 },
      { name: 'Marketing', count: 12, usage: 32 },
      { name: 'Operations', count: 6, usage: 23 }
    ]
  };

  const addComment = () => {
    if (!newComment.trim() || !selectedToolForComment) return;
    
    const comment = {
      id: Date.now(),
      user: 'You',
      avatar: 'https://images.unshed.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      comment: newComment,
      rating: 5,
      tool: selectedToolForComment,
      date: 'Just now'
    };
    
    setCommunityComments(prev => [comment, ...prev]);
    setNewComment('');
    setSelectedToolForComment('');
    setShowCommunity(false);
  };

  const submitRating = () => {
    if (!selectedToolForRating) return;
    
    // Add to community comments
    const comment = {
      id: Date.now(),
      user: 'You',
      avatar: 'https://images.unshed.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      comment: `Rated ${selectedToolForRating.name} with ${ratingValue} stars`,
      rating: ratingValue,
      tool: selectedToolForRating.name,
      date: 'Just now'
    };
    
    setCommunityComments(prev => [comment, ...prev]);
    setShowRatingModal(false);
    setSelectedToolForRating(null);
    setRatingValue(5);
    
    alert(`Thank you for rating ${selectedToolForRating.name}!`);
  };

  const openRatingModal = (tool) => {
    setSelectedToolForRating(tool);
    setShowRatingModal(true);
  };

  const handleSearchFocus = () => {
    setSearchFocused(true);
    if (searchQuery.trim()) {
      setShowSearchSuggestions(true);
    }
  };

  const handleSearchBlur = () => {
    setTimeout(() => {
      setSearchFocused(false);
      setShowSearchSuggestions(false);
    }, 200);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    setShowSearchSuggestions(false);
  };

  // Performance optimization: memoize filtered tools
  const memoizedFilteredTools = useMemo(() => {
    if (isLoading) return [];
    return filteredTools;
  }, [filteredTools, isLoading]);

  // Initialize filtered tools on mount
  useEffect(() => {
    try {
      setFilteredTools(marketplaceTools);
      setError(null);
    } catch (err) {
      setError('Failed to load tools');
      console.error('Error loading tools:', err);
    }
  }, []);

  const renderToolCard = (tool) => (
    <motion.div
      key={tool.id}
      className="tool-card group bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden relative"
      whileHover={{ y: -4, scale: 1.02 }}
      onClick={() => setSelectedTool(tool)}
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={cn(
              "w-12 h-12 rounded-lg flex items-center justify-center",
              tool.isNew ? "bg-gradient-to-r from-green-500 to-emerald-600" : "bg-gradient-to-r from-blue-500 to-purple-600"
            )}>
              {tool.isNew ? <Rocket className="text-white" size={24} /> : <Brain className="text-white" size={24} />}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                {tool.name}
              </h3>
              <p className="text-sm text-gray-600">{tool.creator}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {tool.isVerified && (
              <Badge variant="secondary" className="bg-green-100 text-green-700 border-green-200">
                <CheckCircle size={12} className="mr-1" />
                Verified
              </Badge>
            )}
            {tool.isNew && (
              <Badge variant="secondary" className="bg-blue-100 text-blue-700 border-blue-200">
                New
              </Badge>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-700 mb-4 line-clamp-2">{tool.description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {tool.tags.slice(0, 3).map((tag, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
          {tool.tags.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{tool.tags.length - 3} more
            </Badge>
          )}
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Star className="text-yellow-400" size={14} />
              <span>{tool.rating.toFixed(1)}</span>
              <span className="text-gray-400">({tool.reviews})</span>
            </div>
            <div className="flex items-center space-x-1">
              <Download className="text-blue-500" size={14} />
              <span>{tool.downloads.toLocaleString()}</span>
            </div>
          </div>
          <span className="text-gray-400">{tool.lastUpdated}</span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                handleToolAction(tool, 'use');
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Play size={14} className="mr-1" />
              Try Now
            </Button>
            
            <Button
              size="sm"
              variant="outline"
              onClick={(e) => {
                e.stopPropagation();
                handleToolAction(tool, 'download');
              }}
              className="border-gray-300 hover:bg-gray-50"
            >
              <Download size={14} className="mr-1" />
              Download
            </Button>

            <Button
              size="sm"
              variant="outline"
              onClick={(e) => {
                e.stopPropagation();
                openRatingModal(tool);
              }}
              className="border-yellow-300 hover:bg-yellow-50 text-yellow-700"
            >
              <Star size={14} className="mr-1" />
              Rate
            </Button>
          </div>
          
          <div className="flex items-center space-x-1">
            <Button
              size="sm"
              variant="ghost"
              onClick={(e) => {
                e.stopPropagation();
                handleToolAction(tool, 'favorite');
              }}
              className={cn(
                "w-8 h-8 p-0 hover:bg-red-50",
                favorites.has(tool.id) ? "text-red-500" : "text-gray-400"
              )}
            >
              <Bookmark size={16} />
            </Button>
            
            <Button
              size="sm"
              variant="ghost"
              onClick={(e) => {
                e.stopPropagation();
                handleToolAction(tool, 'share');
              }}
              className="w-8 h-8 p-0 hover:bg-blue-50 text-gray-400"
            >
              <Share2 size={16} />
            </Button>

            <Button
              size="sm"
              variant="ghost"
              onClick={(e) => {
                e.stopPropagation();
                handleToolAction(tool, 'duplicate');
              }}
              className="w-8 h-8 p-0 hover:bg-green-50 text-gray-400"
              title="Duplicate Tool"
            >
              <Copy size={16} />
            </Button>

            <Button
              size="sm"
              variant="ghost"
              onClick={(e) => {
                e.stopPropagation();
                handleToolAction(tool, 'export');
              }}
              className="w-8 h-8 p-0 hover:bg-purple-50 text-gray-400"
              title="Export Tool"
            >
              <Download size={16} />
            </Button>

            <Button
              size="sm"
              variant="ghost"
              onClick={(e) => {
                e.stopPropagation();
                handleToolAction(tool, 'integrate');
              }}
              className="w-8 h-8 p-0 hover:bg-orange-50 text-gray-400"
              title="Integrate Tool"
            >
              <Zap size={16} />
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const renderToolListItem = (tool) => (
    <motion.div
      key={tool.id}
      className="tool-list-item group bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 cursor-pointer overflow-hidden"
      whileHover={{ x: 4 }}
      onClick={() => setSelectedTool(tool)}
    >
      <div className="p-4">
        <div className="flex items-center space-x-4">
          <div className={cn(
            "w-16 h-16 rounded-lg flex items-center justify-center flex-shrink-0",
            tool.isNew ? "bg-gradient-to-r from-green-500 to-emerald-600" : "bg-gradient-to-r from-blue-500 to-purple-600"
          )}>
            {tool.isNew ? <Rocket className="text-white" size={28} /> : <Brain className="text-white" size={28} />}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <h3 className="font-semibold text-gray-900 truncate">{tool.name}</h3>
              {tool.isVerified && (
                <Badge variant="secondary" className="bg-green-100 text-green-700 border-green-200 text-xs">
                  <CheckCircle size={10} className="mr-1" />
                  Verified
                </Badge>
              )}
              {tool.isNew && (
                <Badge variant="secondary" className="bg-blue-100 text-blue-700 border-blue-200 text-xs">
                  New
                </Badge>
              )}
            </div>
            <p className="text-sm text-gray-600 line-clamp-2 mb-2">{tool.description}</p>
            
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span className="flex items-center space-x-1">
                <Star className="text-yellow-400" size={14} />
                <span>{tool.rating.toFixed(1)} ({tool.reviews})</span>
              </span>
              <span className="flex items-center space-x-1">
                <Download className="text-blue-500" size={14} />
                <span>{tool.downloads.toLocaleString()}</span>
              </span>
              <span>{tool.creator}</span>
              <span>{tool.lastUpdated}</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 flex-shrink-0">
            <Button
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                handleToolAction(tool, 'use');
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Play size={14} className="mr-1" />
              Try
            </Button>
            
            <Button
              size="sm"
              variant="outline"
              onClick={(e) => {
                e.stopPropagation();
                handleToolAction(tool, 'download');
              }}
              className="border-gray-300 hover:bg-gray-50"
            >
              <Download size={14} className="mr-1" />
              Download
            </Button>
            
            <Button
              size="sm"
              variant="ghost"
              onClick={(e) => {
                e.stopPropagation();
                handleToolAction(tool, 'favorite');
              }}
              className={cn(
                "w-8 h-8 p-0 hover:bg-red-50",
                favorites.has(tool.id) ? "text-red-500" : "text-gray-400"
              )}
            >
              <Bookmark size={16} />
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const renderCreateToolModal = () => (
    <AnimatePresence>
      {showCreateModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setShowCreateModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-xl shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Create New AI Tool</h2>
              <p className="text-gray-600 mt-1">Build and publish your own AI tool for the community</p>
            </div>
            
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tool Name</label>
                <Input
                  type="text"
                  placeholder="Enter your tool name"
                  className="w-full"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Describe what your tool does"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.slice(1).map(category => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Pricing</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select pricing" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="free">Free</SelectItem>
                    <SelectItem value="9">$9/month</SelectItem>
                    <SelectItem value="19">$19/month</SelectItem>
                    <SelectItem value="29">$29/month</SelectItem>
                    <SelectItem value="custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowCreateModal(false)}
              >
                Cancel
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700">
                Create Tool
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // If tool usage is active, show the usage interface
  if (showToolUsage && selectedToolForUsage) {
    return (
      <ToolUsage 
        tool={selectedToolForUsage} 
        onBack={() => {
          setShowToolUsage(false);
          setSelectedToolForUsage(null);
        }} 
      />
    );
  }

  // If tool builder is active, show the builder
  if (showToolBuilder) {
    return (
      <ToolBuilder 
        onBack={() => setShowToolBuilder(false)}
        onSave={(toolData) => {
          console.log('Saving tool:', toolData);
          setShowToolBuilder(false);
          // Here you would typically save to backend
        }}
      />
    );
  }

  // If a tool is selected, show the detail view
  if (selectedTool) {
    return (
      <ToolDetail 
        tool={selectedTool} 
        onBack={() => setSelectedTool(null)} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI CoBuilder
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover, create, and share AI-powered tools built by the startup community
          </p>
          
          <div className="mt-6">
            <Button
              onClick={() => setShowToolBuilder(true)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Plus size={20} className="mr-2" />
              Create New Tool
            </Button>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-8">
          <button
            onClick={() => setActiveTab('marketplace')}
            className={cn(
              'flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200',
              activeTab === 'marketplace'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            )}
          >
            Marketplace
          </button>
          <button
            onClick={() => setActiveTab('my-tools')}
            className={cn(
              'flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200',
              activeTab === 'my-tools'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            )}
          >
            My Tools
          </button>
          <button
            onClick={() => setActiveTab('community')}
            className={cn(
              'flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200',
              activeTab === 'community'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            )}
          >
            Community
          </button>
        </div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="search-filter-container rounded-xl p-6 mb-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            {/* Search */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <Input
                  type="text"
                  placeholder="Search AI tools..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={handleSearchFocus}
                  onBlur={handleSearchBlur}
                  className="search-input w-full pl-10"
                />
                {showSearchSuggestions && searchFocused && (
                  <div className="absolute z-10 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {searchSuggestions.map((suggestion, index) => (
                      <div
                        key={index}
                        className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                        onClick={() => handleSuggestionClick(suggestion)}
                      >
                        {suggestion}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Filters */}
            <div className="flex items-center space-x-4">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="recent">Recently Added</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="downloads">Most Downloaded</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="w-8 h-8 p-0"
                >
                  <Grid size={18} />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="w-8 h-8 p-0"
                >
                  <List size={18} />
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <ScrollArea 
            className="w-full ai-cobuilder-categories" 
            onWheel={handleCategoryWheel}
            ref={setCategoryScrollRef}
          >
            <div className="flex items-center space-x-4 pb-4">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <motion.button
                    key={category.id}
                    onClick={() => handleCategorySelect(category.id)}
                    data-category={category.id}
                    className={cn(
                      "category-button flex items-center space-x-2 px-4 py-2 rounded-lg border transition-all duration-200 whitespace-nowrap flex-shrink-0",
                      selectedCategory === category.id
                        ? "active"
                        : "bg-white text-gray-600 border-gray-200 hover:border-blue-300 hover:bg-blue-50"
                    )}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Icon size={16} />
                    <span className="font-medium">{category.name}</span>
                    <Badge variant="secondary" className="text-xs">
                      {category.count}
                    </Badge>
                  </motion.button>
                );
              })}
            </div>
            
            {/* Category-specific builder buttons */}
            <div className="flex items-center space-x-4 pt-4 border-t border-gray-200">
              <span className="text-sm font-medium text-gray-700">Quick Build:</span>
              {categories.slice(1).map((category) => {
                const Icon = category.icon;
                const builder = getCategorySpecificBuilder(category.id);
                return (
                  <motion.button
                    key={`builder-${category.id}`}
                    onClick={() => handleCategoryBuilderSelect(category.id)}
                    className={cn(
                      "flex items-center space-x-2 px-3 py-2 rounded-lg border transition-all duration-200 whitespace-nowrap flex-shrink-0 text-sm",
                      `bg-gradient-to-r ${builder.color} text-white border-transparent hover:scale-105`
                    )}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    title={`Build ${category.name} AI Tool`}
                  >
                    <Icon size={14} />
                    <span className="font-medium">Build {category.name}</span>
                  </motion.button>
                );
              })}
            </div>
          </ScrollArea>
        </motion.div>

        {/* Error Display */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg"
          >
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 bg-red-100 rounded-full flex items-center justify-center">
                <span className="text-red-600 text-sm">!</span>
              </div>
              <p className="text-red-800">{error}</p>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setError(null)}
                className="text-red-600 hover:text-red-800"
              >
                Dismiss
              </Button>
            </div>
          </motion.div>
        )}

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {activeTab === 'marketplace' && (
            <>
              {/* Marketplace Insights */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mb-8"
              >
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="bg-white rounded-xl p-6 border border-gray-200">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <TrendingUp className="text-blue-600" size={20} />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Total Tools</p>
                        <p className="text-2xl font-bold text-gray-900">{marketplaceTools.length}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl p-6 border border-gray-200">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <Users className="text-green-600" size={20} />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Active Users</p>
                        <p className="text-2xl font-bold text-gray-900">12.5k</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl p-6 border border-gray-200">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Download className="text-purple-600" size={20} />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Downloads</p>
                        <p className="text-2xl font-bold text-gray-900">45.2k</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl p-6 border border-gray-200">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                        <Star className="text-orange-600" size={20} />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Avg Rating</p>
                        <p className="text-2xl font-bold text-gray-900">4.7</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Featured Tools */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mb-8"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Featured Tools</h2>
                  <Button variant="outline" className="text-blue-600 border-blue-200 hover:bg-blue-50">
                    View All Featured
                  </Button>
                </div>
                <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
                  {marketplaceTools.filter(tool => tool.isFeatured).slice(0, 3).map(renderToolCard)}
                </div>
              </motion.div>

              {/* New Tools */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="mb-8"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Recently Added</h2>
                  <Button variant="outline" className="text-green-600 border-green-200 hover:bg-green-50">
                    View All New
                  </Button>
                </div>
                <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
                  {marketplaceTools.filter(tool => tool.isNew).slice(0, 3).map(renderToolCard)}
                </div>
              </motion.div>

              {/* Trending Tools */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="mb-8"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Trending Now</h2>
                  <Button variant="outline" className="text-orange-600 border-orange-200 hover:bg-orange-50">
                    View All Trending
                  </Button>
                </div>
                <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
                  {marketplaceTools
                    .sort((a, b) => (b.downloads + b.rating * 10) - (a.downloads + a.rating * 10))
                    .slice(0, 3)
                    .map(renderToolCard)}
                </div>
              </motion.div>

              {/* Loading State */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-8"
                >
                  <div className="text-center py-12">
                    <div className="inline-flex items-center space-x-2">
                      <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                      <span className="text-gray-600">Loading tools...</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Category-based Tools */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="mb-8"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {selectedCategory === 'all' ? 'All Tools' : `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Tools`}
                  </h2>
                  <div className="flex items-center space-x-2">
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="popular">Popular</SelectItem>
                        <SelectItem value="rating">Top Rated</SelectItem>
                        <SelectItem value="newest">Newest</SelectItem>
                        <SelectItem value="name">Name A-Z</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      variant={viewMode === 'grid' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setViewMode('grid')}
                      className="p-2"
                    >
                      <Grid size={16} />
                    </Button>
                    <Button
                      variant={viewMode === 'list' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setViewMode('list')}
                      className="p-2"
                    >
                      <List size={16} />
                    </Button>
                  </div>
                </div>
                
                {!isLoading && filteredTools.length === 0 ? (
                  <div className="text-center py-12">
                    <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No tools found</h3>
                    <p className="text-gray-600 mb-4">
                      {searchQuery.trim() || selectedCategory !== 'all' 
                        ? "Try adjusting your search or filters" 
                        : "No tools available in this category yet"
                      }
                    </p>
                    {(searchQuery.trim() || selectedCategory !== 'all') && (
                      <Button
                        onClick={() => {
                          setSearchQuery('');
                          setSelectedCategory('all');
                        }}
                        variant="outline"
                      >
                        Clear Filters
                      </Button>
                    )}
                  </div>
                ) : !isLoading && (
                  <>
                    <div className="flex items-center justify-between mb-6">
                      <p className="text-sm text-gray-600">
                        Showing {filteredTools.length} of {marketplaceTools.length} tools
                      </p>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <span>Sort by:</span>
                        <span className="font-medium capitalize">{sortBy}</span>
                      </div>
                    </div>
                    <div className={cn(
                      "gap-6",
                      viewMode === 'grid' 
                        ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                        : "space-y-4"
                    )}>
                      {viewMode === 'grid' 
                        ? filteredTools.map(renderToolCard)
                        : filteredTools.map(renderToolListItem)
                      }
                    </div>
                  </>
                )}
              </motion.div>


            </>
          )}

          {activeTab === 'my-tools' && (
            <div className="space-y-6">
              {/* Analytics Dashboard */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200"
              >
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Tool Analytics</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <BarChart3 className="text-blue-600" size={20} />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Total Usage</p>
                        <p className="text-2xl font-bold text-gray-900">{toolAnalytics.totalUsage}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <TrendingUp className="text-green-600" size={20} />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Monthly Growth</p>
                        <p className="text-2xl font-bold text-gray-900">+{toolAnalytics.monthlyGrowth}%</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Users className="text-purple-600" size={20} />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Active Users</p>
                        <p className="text-2xl font-bold text-gray-900">156</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Top Tools */}
                <div className="mt-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Top Performing Tools</h3>
                  <div className="space-y-3">
                    {toolAnalytics.topTools.map((tool, index) => (
                      <div key={tool.name} className="flex items-center justify-between bg-white rounded-lg p-3 border border-gray-200">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-sm font-medium text-blue-600">
                            {index + 1}
                          </div>
                          <span className="font-medium text-gray-900">{tool.name}</span>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">{tool.usage} uses</p>
                          <p className="text-xs text-green-600">+{tool.growth}%</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* My Tools Grid */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">My AI Tools</h2>
                <Button
                  onClick={() => setShowToolBuilder(true)}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Plus size={18} className="mr-2" />
                  Create New Tool
                </Button>
              </div>
              
              {myTools.length === 0 ? (
                <div className="text-center py-12">
                  <Code className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No tools created yet</h3>
                  <p className="text-gray-600 mb-4">Start building your first AI tool to help the community</p>
                  <Button
                    onClick={() => setShowToolBuilder(true)}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Plus size={18} className="mr-2" />
                    Create Your First Tool
                  </Button>
                </div>
              ) : (
                <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                  {myTools.map(tool => (
                    <Card key={tool.id} className="hover:shadow-md transition-shadow duration-200">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-gray-900">{tool.name}</h3>
                            <p className="text-sm text-gray-600 mt-1">{tool.description}</p>
                          </div>
                          <Badge variant={tool.status === 'published' ? 'default' : 'secondary'}>
                            {tool.status}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                          <span>{tool.downloads} downloads</span>
                          <span>{tool.rating} ⭐ ({tool.reviews})</span>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-400">{tool.lastUpdated}</span>
                          <div className="flex items-center space-x-2">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="p-2 hover:bg-blue-50"
                              onClick={() => editMyTool(tool)}
                              title="Edit Tool"
                            >
                              <Edit size={16} />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="p-2 hover:bg-green-50"
                              onClick={() => handleToolAction(tool, 'use')}
                              title="Test Tool"
                            >
                              <Play size={16} />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="p-2 hover:bg-blue-50"
                              onClick={() => handleToolAction(tool, 'share')}
                              title="Share Tool"
                            >
                              <Share2 size={16} />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="p-2 hover:bg-green-50"
                              onClick={() => handleToolAction(tool, 'duplicate')}
                              title="Duplicate Tool"
                            >
                              <Copy size={16} />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="p-2 hover:bg-purple-50"
                              onClick={() => handleToolAction(tool, 'export')}
                              title="Export Tool"
                            >
                              <Download size={16} />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="p-2 hover:bg-orange-50"
                              onClick={() => handleToolAction(tool, 'integrate')}
                              title="Integrate Tool"
                            >
                              <Zap size={16} />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="p-2 hover:bg-red-50"
                              onClick={() => handleToolAction(tool, 'delete')}
                              title="Delete Tool"
                            >
                              <Trash2 size={16} />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'community' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Community Insights</h2>
                <div className="flex items-center space-x-3">
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="recent">Most Recent</SelectItem>
                      <SelectItem value="rating">Highest Rated</SelectItem>
                      <SelectItem value="tool">By Tool</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    onClick={() => setShowCommunity(true)}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Plus size={18} className="mr-2" />
                    Add Your Review
                  </Button>
                </div>
              </div>
              
              {/* Community Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <MessageCircle className="text-blue-600" size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Total Reviews</p>
                      <p className="text-2xl font-bold text-gray-900">{communityComments.length}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <Users className="text-green-600" size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Active Reviewers</p>
                      <p className="text-2xl font-bold text-gray-900">24</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Star className="text-purple-600" size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Avg Rating</p>
                      <p className="text-2xl font-bold text-gray-900">4.6</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {communityComments.length === 0 ? (
                <div className="text-center py-12">
                  <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No community reviews yet</h3>
                  <p className="text-gray-600 mb-4">Be the first to share your experience with AI tools!</p>
                  <Button
                    onClick={() => setShowCommunity(true)}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Plus size={18} className="mr-2" />
                    Add Your Review
                  </Button>
                </div>
              ) : (
                <div className="grid gap-6">
                  {communityComments.map(comment => (
                    <Card key={comment.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                      <div className="flex items-center space-x-3 mb-3">
                        <img 
                          src={comment.avatar} 
                          alt={comment.user}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <h4 className="font-semibold text-gray-900">{comment.user}</h4>
                          <div className="flex items-center text-sm text-gray-500">
                            <Star className="text-yellow-400" size={14} />
                            <span>{comment.rating}/5</span>
                            <span className="mx-2">•</span>
                            <span>{comment.tool}</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-700">{comment.comment}</p>
                      <div className="flex items-center justify-between mt-3">
                        <p className="text-xs text-gray-500">{comment.date}</p>
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-xs text-gray-500 hover:text-blue-600"
                          >
                            <MessageCircle size={14} className="mr-1" />
                            Reply
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-xs text-gray-500 hover:text-green-600"
                          >
                            <ThumbsUp size={14} className="mr-1" />
                            Helpful
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}
        </motion.div>
      </div>

      {/* Create Tool Modal */}
      {renderCreateToolModal()}

      {/* Community Modal */}
      <Dialog open={showCommunity} onOpenChange={setShowCommunity}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Share Your Experience</DialogTitle>
            <DialogDescription>
              Help other founders by sharing your experience with AI tools
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="tool-select">Select Tool</Label>
              <Select value={selectedToolForComment} onValueChange={setSelectedToolForComment}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a tool to review" />
                </SelectTrigger>
                <SelectContent>
                  {marketplaceTools.map(tool => (
                    <SelectItem key={tool.id} value={tool.name}>
                      {tool.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="comment">Your Review</Label>
              <Textarea
                id="comment"
                placeholder="Share your experience with this tool..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                rows={4}
              />
            </div>
            
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowCommunity(false)}>
                Cancel
              </Button>
              <Button onClick={addComment} disabled={!newComment.trim() || !selectedToolForComment}>
                Submit Review
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Rating Modal */}
      <Dialog open={showRatingModal} onOpenChange={setShowRatingModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Rate {selectedToolForRating?.name}</DialogTitle>
            <DialogDescription>
              How would you rate this AI tool?
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex justify-center space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRatingValue(star)}
                  className={cn(
                    "w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-200",
                    star <= ratingValue
                      ? "bg-yellow-100 text-yellow-600 scale-110"
                      : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                  )}
                >
                  <Star size={24} fill={star <= ratingValue ? "currentColor" : "none"} />
                </button>
              ))}
            </div>
            
            <div>
              <Label htmlFor="rating-comment">Additional Comments (Optional)</Label>
              <Textarea
                id="rating-comment"
                placeholder="Share your thoughts about this tool..."
                value={ratingComment}
                onChange={(e) => setRatingComment(e.target.value)}
                rows={3}
              />
            </div>
            
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowRatingModal(false)}>
                Cancel
              </Button>
              <Button onClick={submitRating} disabled={!ratingValue}>
                Submit Rating
              </Button>
            </div>
            
            <div className="text-center">
              <p className="text-sm text-gray-600">
                {ratingValue === 5 && "Excellent! This tool is amazing!"}
                {ratingValue === 4 && "Very good! This tool is quite useful!"}
                {ratingValue === 3 && "Good! This tool meets expectations."}
                {ratingValue === 2 && "Fair. This tool has some issues."}
                {ratingValue === 1 && "Poor. This tool needs improvement."}
              </p>
            </div>
            
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowRatingModal(false)}>
                Cancel
              </Button>
              <Button onClick={submitRating} className="bg-yellow-600 hover:bg-yellow-700">
                Submit Rating
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Tool Builder Modal */}
      {showToolBuilder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {toolBuilderData ? toolBuilderData.title : 'Create New AI Tool'}
                  </h2>
                  <p className="text-gray-600 mt-1">
                    {toolBuilderData ? toolBuilderData.description : 'Build and publish your own AI tool for the community'}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowToolBuilder(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={20} />
                </Button>
              </div>
            </div>
            
            <div className="p-6">
              {toolBuilderData ? (
                <div className="space-y-6">
                  {/* Category-specific fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {toolBuilderData.fields.map((field, index) => (
                      <div key={index}>
                        <Label className="text-sm font-medium text-gray-700 mb-2">
                          {field.label}
                        </Label>
                        {field.type === 'select' ? (
                          <Select onValueChange={(value) => console.log(`${field.name}:`, value)}>
                            <SelectTrigger>
                              <SelectValue placeholder={`Select ${field.label.toLowerCase()}`} />
                            </SelectTrigger>
                            <SelectContent>
                              {field.options.map((option) => (
                                <SelectItem key={option} value={option}>
                                  {option}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        ) : field.type === 'multiselect' ? (
                          <div className="space-y-2">
                            {field.options.map((option) => (
                              <div key={option} className="flex items-center space-x-2">
                                <input
                                  type="checkbox"
                                  id={`${field.name}-${option}`}
                                  className="rounded border-gray-300"
                                />
                                <Label htmlFor={`${field.name}-${option}`} className="text-sm text-gray-600">
                                  {option}
                                </Label>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <Input placeholder={`Enter ${field.label.toLowerCase()}`} />
                        )}
                      </div>
                    ))}
                  </div>
                  
                  {/* Templates */}
                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-3 block">
                      Choose a Template
                    </Label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {toolBuilderData.templates.map((template, index) => (
                        <div
                          key={index}
                          className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 cursor-pointer transition-colors"
                        >
                          <h4 className="font-medium text-gray-900 mb-1">{template.name}</h4>
                          <p className="text-sm text-gray-600">{template.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Action buttons */}
                  <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                    <Button variant="outline" onClick={() => setShowToolBuilder(false)}>
                      Cancel
                    </Button>
                    <Button onClick={() => {
                      showToast('Tool created successfully!', 'success');
                      setShowToolBuilder(false);
                    }}>
                      Create Tool
                    </Button>
                  </div>
                </div>
              ) : (
                <ToolBuilder
                  onBack={() => setShowToolBuilder(false)}
                  onSave={(toolData) => {
                    createNewTool(toolData);
                    setShowToolBuilder(false);
                  }}
                />
              )}
            </div>
          </div>
        </div>
      )}

      {/* Toast Notifications */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            className={cn(
              "p-4 rounded-lg shadow-lg border max-w-sm",
              toast.type === 'success' && "bg-green-50 border-green-200 text-green-800",
              toast.type === 'error' && "bg-red-50 border-red-200 text-red-800",
              toast.type === 'info' && "bg-blue-50 border-blue-200 text-blue-800",
              toast.type === 'warning' && "bg-yellow-50 border-yellow-200 text-yellow-800"
            )}
          >
            <div className="flex items-center space-x-2">
              {toast.type === 'success' && <CheckCircle size={16} className="text-green-600" />}
              {toast.type === 'error' && <AlertCircle size={16} className="text-red-600" />}
              {toast.type === 'info' && <Info size={16} className="text-blue-600" />}
              {toast.type === 'warning' && <AlertTriangle size={16} className="text-yellow-600" />}
              <span className="text-sm font-medium">{toast.message}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AICoBuilder; 