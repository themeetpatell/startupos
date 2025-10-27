import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Filter, Plus, Star, Users, CheckCircle, 
  Brain, Zap, Shield, Target, Clock, DollarSign,
  MessageCircle, Play, Pause, MoreHorizontal, Settings,
  Send, Bot, Code, Palette, Database, BarChart3,
  ArrowRight, Sparkles, Crown, TrendingUp, Award,
  X, FileText, RefreshCw, Globe, Heart, Bookmark
} from 'lucide-react';

const EnhancedAICoBuilder = () => {
  const [activeTab, setActiveTab] = useState('marketplace');
  const [trendsCategory, setTrendsCategory] = useState('trending');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showHireModal, setShowHireModal] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);
  const [showBuilderModal, setShowBuilderModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showInlineDetails, setShowInlineDetails] = useState(false);
  const [currentOKRIndex, setCurrentOKRIndex] = useState(0);
  const [currentMessage, setCurrentMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [builderConfig, setBuilderConfig] = useState({
    name: '',
    role: '',
    department: '',
    skills: [],
    personality: 'professional',
    experience: 'intermediate',
    description: '',
    instructions: '',
    knowledge: [],
    capabilities: [],
    communicationStyle: 'professional',
    workHours: '24/7',
    timezone: 'UTC',
    languages: ['English'],
    specializations: [],
    goals: [],
    constraints: [],
    examples: []
  });
  const [builderStep, setBuilderStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);

  // Department-specific knowledge areas and capabilities
  const departmentKnowledgeAreas = {
    'Marketing': [
      'Digital Marketing', 'Content Strategy', 'Social Media Marketing', 'SEO/SEM',
      'Email Marketing', 'Brand Management', 'Market Research', 'Customer Analytics',
      'Campaign Planning', 'Performance Metrics', 'Competitor Analysis', 'Lead Generation'
    ],
    'Sales': [
      'Sales Strategy', 'Lead Qualification', 'CRM Management', 'Sales Forecasting',
      'Customer Relationship Management', 'Negotiation', 'Sales Analytics', 'Pipeline Management',
      'Cold Outreach', 'Sales Training', 'Revenue Optimization', 'Customer Retention'
    ],
    'Engineering': [
      'Software Development', 'System Architecture', 'Code Review', 'Technical Documentation',
      'API Development', 'Database Design', 'Security Best Practices', 'Performance Optimization',
      'Version Control', 'Testing Strategies', 'DevOps', 'Cloud Computing'
    ],
    'Design': [
      'UI/UX Design', 'User Research', 'Prototyping', 'Visual Design',
      'Design Systems', 'Accessibility', 'Design Thinking', 'Brand Identity',
      'Wireframing', 'User Testing', 'Design Tools', 'Creative Strategy'
    ],
    'Data & Analytics': [
      'Data Analysis', 'Statistical Modeling', 'Machine Learning', 'Data Visualization',
      'Business Intelligence', 'Predictive Analytics', 'A/B Testing', 'Data Mining',
      'Database Management', 'Reporting', 'Data Quality', 'Performance Metrics'
    ],
    'Support': [
      'Customer Service', 'Technical Support', 'Product Knowledge', 'Issue Resolution',
      'Communication', 'Documentation', 'Training', 'Quality Assurance',
      'Process Improvement', 'Customer Satisfaction', 'Escalation Management', 'Knowledge Base'
    ],
    'Operations': [
      'Process Optimization', 'Project Management', 'Resource Planning', 'Quality Control',
      'Supply Chain', 'Vendor Management', 'Compliance', 'Risk Management',
      'Performance Monitoring', 'Cost Optimization', 'Workflow Design', 'Change Management'
    ],
    'Finance': [
      'Financial Analysis', 'Budgeting', 'Financial Reporting', 'Risk Assessment',
      'Investment Analysis', 'Cost Management', 'Tax Planning', 'Audit Preparation',
      'Financial Modeling', 'Compliance', 'Cash Flow Management', 'Financial Planning'
    ],
    'HR': [
      'Talent Acquisition', 'Employee Relations', 'Performance Management', 'Training & Development',
      'Compensation & Benefits', 'HR Policies', 'Workplace Culture', 'Recruitment',
      'Employee Engagement', 'HR Analytics', 'Compliance', 'Succession Planning'
    ]
  };

  const departmentCoreCapabilities = {
    'Marketing': [
      'Content Creation', 'Social Media Management', 'Email Campaigns', 'SEO Optimization',
      'Analytics & Reporting', 'Campaign Management', 'Brand Development', 'Lead Generation',
      'Market Research', 'Customer Segmentation', 'A/B Testing', 'Performance Tracking'
    ],
    'Sales': [
      'Lead Generation', 'Sales Prospecting', 'CRM Management', 'Sales Forecasting',
      'Customer Outreach', 'Deal Closing', 'Relationship Building', 'Sales Analytics',
      'Pipeline Management', 'Follow-up Automation', 'Proposal Creation', 'Negotiation'
    ],
    'Engineering': [
      'Code Development', 'System Design', 'API Integration', 'Database Management',
      'Testing & QA', 'Performance Optimization', 'Security Implementation', 'Code Review',
      'Technical Documentation', 'DevOps Automation', 'Cloud Deployment', 'Bug Fixing'
    ],
    'Design': [
      'UI/UX Design', 'Prototyping', 'User Research', 'Visual Design',
      'Design Systems', 'Wireframing', 'User Testing', 'Brand Design',
      'Design Tools', 'Creative Direction', 'Accessibility Design', 'Design Documentation'
    ],
    'Data & Analytics': [
      'Data Analysis', 'Statistical Modeling', 'Data Visualization', 'Machine Learning',
      'Business Intelligence', 'Predictive Analytics', 'A/B Testing', 'Data Mining',
      'Report Generation', 'Dashboard Creation', 'Data Cleaning', 'Insight Generation'
    ],
    'Support': [
      'Customer Service', 'Technical Support', 'Issue Resolution', 'Knowledge Base Management',
      'Live Chat', 'Email Support', 'Ticket Management', 'Customer Training',
      'Documentation', 'Escalation Handling', 'Quality Assurance', 'Process Improvement'
    ],
    'Operations': [
      'Process Optimization', 'Project Management', 'Resource Allocation', 'Quality Control',
      'Vendor Management', 'Compliance Monitoring', 'Risk Assessment', 'Performance Tracking',
      'Workflow Automation', 'Cost Optimization', 'Change Management', 'Strategic Planning'
    ],
    'Finance': [
      'Financial Analysis', 'Budget Management', 'Financial Reporting', 'Risk Assessment',
      'Investment Analysis', 'Cost Control', 'Audit Support', 'Financial Modeling',
      'Cash Flow Management', 'Compliance', 'Tax Planning', 'Financial Forecasting'
    ],
    'HR': [
      'Talent Acquisition', 'Employee Relations', 'Performance Management', 'Training Programs',
      'Recruitment', 'Employee Engagement', 'HR Analytics', 'Policy Development',
      'Benefits Administration', 'Compliance', 'Succession Planning', 'Culture Development'
    ]
  };

  const okrs = [
    {
      id: 1,
      title: "Increase Monthly Active Users by 40%",
      description: "Focus on user acquisition, engagement, and retention strategies",
      recommendations: [
        "Marketing specialists for user acquisition",
        "Data analysts for engagement insights", 
        "Product managers for retention strategies"
      ],
      recommendedEmployees: [1, 2, 6] // Alex AI, Sarah AI, Lisa AI
    },
    {
      id: 2,
      title: "Reduce Customer Churn Rate to <5%",
      description: "Improve customer success and support processes",
      recommendations: [
        "Customer success specialists for retention",
        "Data analysts for churn prediction",
        "Product managers for user experience improvements"
      ],
      recommendedEmployees: [3, 2, 6] // Mike AI, Sarah AI, Lisa AI
    },
    {
      id: 3,
      title: "Launch 3 New Product Features",
      description: "Accelerate product development and innovation",
      recommendations: [
        "Product managers for feature planning",
        "UI/UX designers for user experience",
        "Developers for technical implementation"
      ],
      recommendedEmployees: [6, 4, 1] // Lisa AI, Emma AI, Alex AI
    },
    {
      id: 4,
      title: "Increase Revenue by 60%",
      description: "Focus on sales growth and revenue optimization",
      recommendations: [
        "Sales specialists for revenue growth",
        "Marketing specialists for lead generation",
        "Data analysts for revenue insights"
      ],
      recommendedEmployees: [1, 2, 5] // Alex AI, Sarah AI, David AI
    },
    {
      id: 5,
      title: "Improve Team Productivity by 30%",
      description: "Optimize internal processes and team efficiency",
      recommendations: [
        "Project managers for process optimization",
        "DevOps engineers for automation",
        "Data analysts for performance metrics"
      ],
      recommendedEmployees: [5, 2, 6] // David AI, Sarah AI, Lisa AI
    }
  ];

  const trendsData = {
    trending: [
      { id: 1, name: 'Alex AI', role: 'Marketing Specialist', department: 'Marketing', rating: 4.9, users: 1250, trend: '+25%', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face' },
      { id: 2, name: 'Sarah AI', role: 'Data Analyst', department: 'Data & Analytics', rating: 4.8, users: 980, trend: '+18%', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face' },
      { id: 6, name: 'Lisa AI', role: 'Product Manager', department: 'Product', rating: 4.9, users: 1200, trend: '+32%', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face' }
    ],
    popular: [
      { id: 3, name: 'Mike AI', role: 'Customer Support', department: 'Support', rating: 4.7, users: 2100, trend: '+12%', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face' },
      { id: 4, name: 'Emma AI', role: 'UI/UX Designer', department: 'Design', rating: 4.6, users: 1650, trend: '+8%', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face' },
      { id: 5, name: 'David AI', role: 'DevOps Engineer', department: 'Engineering', rating: 4.8, users: 1800, trend: '+15%', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face' }
    ],
    mutualConnections: [
      { id: 1, name: 'Alex AI', role: 'Marketing Specialist', department: 'Marketing', rating: 4.9, users: 1250, mutualCount: 12, avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face' },
      { id: 2, name: 'Sarah AI', role: 'Data Analyst', department: 'Data & Analytics', rating: 4.8, users: 980, mutualCount: 8, avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face' },
      { id: 6, name: 'Lisa AI', role: 'Product Manager', department: 'Product', rating: 4.9, users: 1200, mutualCount: 15, avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face' }
    ],
    similarIndustries: [
      { id: 1, name: 'Alex AI', role: 'Marketing Specialist', department: 'Marketing', rating: 4.9, users: 1250, industry: 'SaaS', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face' },
      { id: 2, name: 'Sarah AI', role: 'Data Analyst', department: 'Data & Analytics', rating: 4.8, users: 980, industry: 'FinTech', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face' },
      { id: 3, name: 'Mike AI', role: 'Customer Support', department: 'Support', rating: 4.7, users: 2100, industry: 'E-commerce', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face' }
    ],
    newReleases: [
      { id: 7, name: 'Sophia AI', role: 'AI Researcher', department: 'Research', rating: 4.9, users: 450, trend: 'NEW', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face' },
      { id: 8, name: 'James AI', role: 'Blockchain Developer', department: 'Engineering', rating: 4.7, users: 320, trend: 'NEW', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face' },
      { id: 9, name: 'Maria AI', role: 'Cybersecurity Expert', department: 'Security', rating: 4.8, users: 280, trend: 'NEW', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face' }
    ],
    topRated: [
      { id: 1, name: 'Alex AI', role: 'Marketing Specialist', department: 'Marketing', rating: 4.9, users: 1250, trend: 'TOP', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face' },
      { id: 6, name: 'Lisa AI', role: 'Product Manager', department: 'Product', rating: 4.9, users: 1200, trend: 'TOP', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face' },
      { id: 2, name: 'Sarah AI', role: 'Data Analyst', department: 'Data & Analytics', rating: 4.8, users: 980, trend: 'TOP', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face' }
    ]
  };

  const [marketplaceEmployees, setMarketplaceEmployees] = useState([
    {
      id: 1,
      name: 'Alex AI',
      role: 'Marketing Specialist',
      department: 'Marketing',
      description: 'Expert in digital marketing, content creation, and social media management. Proven track record of increasing engagement by 300%.',
      intro: 'I can help you create compelling marketing campaigns, optimize your social media presence, and drive measurable growth for your business.',
      skills: ['Digital Marketing', 'Content Creation', 'Social Media', 'Analytics', 'SEO', 'PPC'],
      hourlyRate: 25,
      rating: 4.9,
      reviews: 127,
      lovers: 89,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      isActive: false,
      tasksCompleted: 0,
      specialties: ['SEO', 'PPC', 'Email Marketing'],
      languages: ['English', 'Spanish', 'French'],
      availability: '24/7',
      responseTime: '< 1 min',
      badge: 'Popular',
      badgeColor: 'green',
      successRate: 98,
      projectsCompleted: 156,
      avgRating: 4.9,
      priceRange: '$20-30/hour',
      experience: '5+ years',
      verified: true,
      creator: {
        name: 'AI Solutions Inc.',
        type: 'Company',
        description: 'Leading AI development company specializing in custom AI solutions for businesses.',
        location: 'San Francisco, CA',
        teamSize: '50+ employees'
      },
      pricing: {
        hourly: 25,
        daily: 180,
        weekly: 1000,
        monthly: 3500
      }
    },
    {
      id: 2,
      name: 'Sarah AI',
      role: 'Data Analyst',
      department: 'Data & Analytics',
      description: 'Advanced analytics and data visualization expert. Specializes in business intelligence and predictive modeling.',
      intro: 'I can help you transform raw data into actionable insights, build predictive models, and create stunning visualizations that drive business decisions.',
      skills: ['Python', 'SQL', 'Tableau', 'Machine Learning', 'R', 'Power BI'],
      hourlyRate: 35,
      rating: 4.8,
      reviews: 89,
      lovers: 76,
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
      isActive: false,
      tasksCompleted: 0,
      specialties: ['Predictive Analytics', 'Data Visualization', 'A/B Testing'],
      languages: ['English', 'German'],
      availability: '24/7',
      responseTime: '< 2 min',
      badge: 'Expert',
      badgeColor: 'blue',
      successRate: 96,
      projectsCompleted: 89,
      avgRating: 4.8,
      priceRange: '$30-40/hour',
      experience: '7+ years',
      verified: true,
      creator: {
        name: 'DataTech Solutions',
        type: 'Company',
        description: 'Specialized in AI-powered data analytics and business intelligence solutions.',
        location: 'New York, NY',
        teamSize: '25+ employees'
      },
      pricing: {
        hourly: 35,
        daily: 250,
        weekly: 1400,
        monthly: 5000
      }
    },
    {
      id: 3,
      name: 'Mike AI',
      role: 'Customer Support',
      department: 'Support',
      description: 'Multilingual customer support specialist with expertise in technical troubleshooting and customer satisfaction.',
      intro: 'I can help you provide exceptional customer support, resolve technical issues quickly, and ensure your customers are always satisfied.',
      skills: ['Customer Service', 'Technical Support', 'CRM', 'Communication', 'Zendesk', 'Live Chat'],
      hourlyRate: 20,
      rating: 4.7,
      reviews: 156,
      lovers: 134,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      isActive: false,
      tasksCompleted: 0,
      specialties: ['Live Chat', 'Email Support', 'Technical Troubleshooting'],
      languages: ['English', 'Spanish', 'Portuguese', 'Italian'],
      availability: '24/7',
      responseTime: '< 30 sec',
      badge: 'Fast Response',
      badgeColor: 'orange',
      successRate: 94,
      projectsCompleted: 203,
      avgRating: 4.7,
      priceRange: '$15-25/hour',
      experience: '4+ years',
      verified: true,
      creator: {
        name: 'John Smith',
        type: 'Individual',
        description: 'Independent AI developer with 8+ years of experience in customer service automation.',
        location: 'Austin, TX',
        teamSize: 'Solo developer'
      },
      pricing: {
        hourly: 20,
        daily: 140,
        weekly: 800,
        monthly: 2800
      }
    },
    {
      id: 4,
      name: 'Emma AI',
      role: 'UI/UX Designer',
      department: 'Design',
      description: 'Creative designer specializing in user experience and interface design. Expert in Figma, Adobe Creative Suite.',
      intro: 'I can help you design beautiful, user-friendly interfaces that your customers will love, from wireframes to final prototypes.',
      skills: ['UI/UX Design', 'Figma', 'Adobe Creative Suite', 'Prototyping', 'User Research', 'Wireframing'],
      hourlyRate: 30,
      rating: 4.9,
      reviews: 98,
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      isActive: false,
      tasksCompleted: 0,
      specialties: ['Mobile Design', 'Web Design', 'Brand Identity'],
      languages: ['English', 'French'],
      availability: 'Business Hours',
      responseTime: '< 1 hour',
      badge: 'Creative',
      badgeColor: 'purple',
      successRate: 97,
      projectsCompleted: 134,
      avgRating: 4.9,
      priceRange: '$25-35/hour',
      experience: '6+ years',
      verified: true
    },
    {
      id: 5,
      name: 'David AI',
      role: 'Sales Representative',
      department: 'Sales',
      description: 'High-performing sales AI with expertise in B2B sales, lead generation, and customer relationship management.',
      intro: 'I can help you close more deals, generate qualified leads, and build strong relationships with your prospects and customers.',
      skills: ['B2B Sales', 'Lead Generation', 'CRM', 'Cold Calling', 'Negotiation', 'Salesforce'],
      hourlyRate: 28,
      rating: 4.6,
      reviews: 112,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
      isActive: false,
      tasksCompleted: 0,
      specialties: ['Enterprise Sales', 'Lead Qualification', 'Deal Closing'],
      languages: ['English', 'Spanish', 'Mandarin'],
      availability: 'Business Hours',
      responseTime: '< 2 hours',
      badge: 'Top Performer',
      badgeColor: 'red',
      successRate: 92,
      projectsCompleted: 187,
      avgRating: 4.6,
      priceRange: '$25-35/hour',
      experience: '5+ years',
      verified: true
    },
    {
      id: 6,
      name: 'Lisa AI',
      role: 'Content Writer',
      department: 'Marketing',
      description: 'Versatile content writer specializing in blog posts, social media content, and technical documentation.',
      intro: 'I can help you create engaging content that resonates with your audience, from blog posts to social media campaigns.',
      skills: ['Content Writing', 'Blog Writing', 'Social Media', 'SEO Writing', 'Technical Writing', 'Copywriting'],
      hourlyRate: 22,
      rating: 4.8,
      reviews: 145,
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face',
      isActive: false,
      tasksCompleted: 0,
      specialties: ['Blog Writing', 'Social Media Content', 'Technical Documentation'],
      languages: ['English', 'Spanish', 'Portuguese'],
      availability: '24/7',
      responseTime: '< 1 hour',
      badge: 'Versatile',
      badgeColor: 'teal',
      successRate: 95,
      projectsCompleted: 298,
      avgRating: 4.8,
      priceRange: '$18-28/hour',
      experience: '4+ years',
      verified: true
    }
  ]);

  const [myTeamEmployees, setMyTeamEmployees] = useState([
    {
      id: 101,
      name: 'My Marketing AI',
      role: 'Marketing Assistant',
      department: 'Marketing',
      description: 'Your personal marketing AI assistant, trained on your brand guidelines and preferences.',
      skills: ['Content Creation', 'Social Media', 'Email Marketing', 'Analytics'],
      hourlyRate: 0,
      rating: 4.9,
      reviews: 0,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      isActive: true,
      tasksCompleted: 45,
      specialties: ['Brand Management', 'Campaign Planning'],
      languages: ['English'],
      availability: '24/7',
      responseTime: '< 1 min',
      badge: 'Your Team',
      badgeColor: 'blue',
      successRate: 98,
      projectsCompleted: 12,
      avgRating: 4.9,
      priceRange: 'Free',
      experience: 'Custom',
      verified: true
    },
    {
      id: 102,
      name: 'My Data Analyst',
      role: 'Data Specialist',
      department: 'Data & Analytics',
      description: 'Your dedicated data analysis AI, configured for your specific business metrics.',
      skills: ['Python', 'SQL', 'Data Visualization', 'Reporting'],
      hourlyRate: 0,
      rating: 4.8,
      reviews: 0,
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
      isActive: true,
      tasksCompleted: 23,
      specialties: ['Business Intelligence', 'Custom Reports'],
      languages: ['English'],
      availability: '24/7',
      responseTime: '< 2 min',
      badge: 'Your Team',
      badgeColor: 'blue',
      successRate: 96,
      projectsCompleted: 8,
      avgRating: 4.8,
      priceRange: 'Free',
      experience: 'Custom',
      verified: true
    },
    {
      id: 103,
      name: 'My Support Bot',
      role: 'Customer Support',
      department: 'Support',
      description: 'Your customer support AI, trained on your product knowledge and support procedures.',
      skills: ['Customer Service', 'Product Knowledge', 'Troubleshooting', 'CRM'],
      hourlyRate: 0,
      rating: 4.7,
      reviews: 0,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      isActive: true,
      tasksCompleted: 156,
      specialties: ['Live Chat', 'Ticket Resolution'],
      languages: ['English', 'Spanish'],
      availability: '24/7',
      responseTime: '< 30 sec',
      badge: 'Your Team',
      badgeColor: 'blue',
      successRate: 94,
      projectsCompleted: 25,
      avgRating: 4.7,
      priceRange: 'Free',
      experience: 'Custom',
      verified: true
    }
  ]);

  // Filtering logic
  const filteredEmployees = useMemo(() => {
    let employees = [];
    
    if (activeTab === 'marketplace') {
      employees = marketplaceEmployees;
    } else if (activeTab === 'my-team') {
      employees = myTeamEmployees;
    } else if (activeTab === 'trends') {
      employees = trendsData[trendsCategory] || [];
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      employees = employees.filter(emp => emp.department?.toLowerCase() === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      employees = employees.filter(emp => 
        emp.name.toLowerCase().includes(query) ||
        emp.role.toLowerCase().includes(query) ||
        emp.skills?.some(skill => skill.toLowerCase().includes(query)) ||
        emp.description?.toLowerCase().includes(query)
      );
    }

    return employees;
  }, [activeTab, selectedCategory, searchQuery]);

  const categories = useMemo(() => {
    const allEmployees = [...marketplaceEmployees, ...myTeamEmployees];
    const categoryCounts = allEmployees.reduce((acc, emp) => {
      const dept = emp.department?.toLowerCase() || 'other';
      acc[dept] = (acc[dept] || 0) + 1;
      return acc;
    }, {});

    return [
      { id: 'all', name: 'All', count: allEmployees.length, icon: Brain },
      { id: 'marketing', name: 'Marketing', count: categoryCounts.marketing || 0, icon: Target },
      { id: 'sales', name: 'Sales', count: categoryCounts.sales || 0, icon: TrendingUp },
      { id: 'engineering', name: 'Engineering', count: categoryCounts.engineering || 0, icon: Code },
      { id: 'design', name: 'Design', count: categoryCounts.design || 0, icon: Palette },
      { id: 'data & analytics', name: 'Data & Analytics', count: categoryCounts['data & analytics'] || 0, icon: BarChart3 },
      { id: 'support', name: 'Support', count: categoryCounts.support || 0, icon: Users },
      { id: 'leadership', name: 'Leadership', count: categoryCounts.leadership || 0, icon: Crown }
    ];
  }, []);

  const handleCreateEmployee = useCallback(() => {
    // Generate a unique ID for the new employee
    const newId = Math.max(...marketplaceEmployees.map(emp => emp.id), ...myTeamEmployees.map(emp => emp.id)) + 1;
    
    // Generate avatar URL based on department
    const avatarUrls = {
      'Marketing': 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      'Sales': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      'Engineering': 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
      'Design': 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      'Data & Analytics': 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
      'Support': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      'Operations': 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      'Finance': 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
      'HR': 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face'
    };

    // Create the new AI employee object
    const newEmployee = {
      id: newId,
      name: builderConfig.name,
      role: builderConfig.role,
      department: builderConfig.department,
      description: builderConfig.description || `AI ${builderConfig.role} specialized in ${builderConfig.department}`,
      intro: `I can help you with ${builderConfig.role.toLowerCase()} tasks and provide expert guidance in ${builderConfig.department}.`,
      skills: builderConfig.skills,
      hourlyRate: 0, // Free for created employees
      rating: 4.8, // Default high rating
      reviews: 0,
      lovers: 0,
      avatar: avatarUrls[builderConfig.department] || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      isActive: true, // Active in my team
      tasksCompleted: 0,
      specialties: builderConfig.capabilities.slice(0, 3), // Top 3 capabilities as specialties
      languages: builderConfig.languages,
      availability: builderConfig.workHours,
      responseTime: '< 1 min',
      badge: 'Your Team',
      badgeColor: 'blue',
      successRate: 95,
      projectsCompleted: 0,
      avgRating: 4.8,
      priceRange: 'Free',
      experience: builderConfig.experience,
      verified: true,
      creator: {
        name: 'You',
        type: 'Individual',
        description: 'Custom AI employee created by you',
        location: 'Your Organization',
        teamSize: 'Custom'
      },
      pricing: {
        hourly: 0,
        daily: 0,
        weekly: 0,
        monthly: 0
      },
      // Additional fields from builder config
      knowledge: builderConfig.knowledge,
      capabilities: builderConfig.capabilities,
      communicationStyle: builderConfig.communicationStyle,
      timezone: builderConfig.timezone,
      specializations: builderConfig.specializations,
      goals: builderConfig.goals,
      constraints: builderConfig.constraints,
      examples: builderConfig.examples,
      instructions: builderConfig.instructions
    };

    // Add to marketplace
    setMarketplaceEmployees(prev => [...prev, newEmployee]);
    
    // Add to my team
    setMyTeamEmployees(prev => [...prev, newEmployee]);

    console.log('Created AI Employee:', newEmployee);
    setShowBuilderModal(false);
  }, [builderConfig, marketplaceEmployees, myTeamEmployees]);

  const renderBuilderModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Create AI Employee</h2>
              <p className="text-blue-100">Build a custom AI team member tailored to your needs</p>
            </div>
            <button
              onClick={() => {
                setShowBuilderModal(false);
                setBuilderStep(1);
                setBuilderConfig({
                  name: '',
                  role: '',
                  department: '',
                  skills: [],
                  personality: 'professional',
                  experience: 'intermediate',
                  description: '',
                  instructions: '',
                  knowledge: [],
                  capabilities: [],
                  communicationStyle: 'professional',
                  workHours: '24/7',
                  timezone: 'UTC',
                  languages: ['English'],
                  specializations: [],
                  goals: [],
                  constraints: [],
                  examples: []
                });
              }}
              className="text-white hover:text-blue-200 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          {/* Progress Steps */}
          <div className="mt-6">
            <div className="flex items-center space-x-4">
              {[1, 2, 3, 4, 5].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step <= builderStep 
                      ? 'bg-white text-blue-600' 
                      : 'bg-blue-500 text-white'
                  }`}>
                    {step}
                  </div>
                  {step < 5 && (
                    <div className={`w-12 h-1 ml-2 ${
                      step < builderStep ? 'bg-white' : 'bg-blue-500'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-sm text-blue-100">
              <span>Basic Info</span>
              <span>Instructions</span>
              <span>Capabilities</span>
              <span>Personality</span>
              <span>Review</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <AnimatePresence mode="wait">
            {builderStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center mb-8">
                  <Brain className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Basic Information</h3>
                  <p className="text-gray-600">Let's start with the fundamental details about your AI employee</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., Alex AI"
                      value={builderConfig.name}
                      onChange={(e) => setBuilderConfig(prev => ({ ...prev, name: e.target.value }))}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Role <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., Marketing Specialist"
                      value={builderConfig.role}
                      onChange={(e) => setBuilderConfig(prev => ({ ...prev, role: e.target.value }))}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Department <span className="text-red-500">*</span>
                    </label>
                    <select
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={builderConfig.department}
                      onChange={(e) => {
                        const newDepartment = e.target.value;
                        setBuilderConfig(prev => ({ 
                          ...prev, 
                          department: newDepartment,
                          knowledge: [], // Reset knowledge areas when department changes
                          capabilities: [] // Reset capabilities when department changes
                        }));
                      }}
                    >
                      <option value="">Select Department</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Sales">Sales</option>
                      <option value="Engineering">Engineering</option>
                      <option value="Design">Design</option>
                      <option value="Data & Analytics">Data & Analytics</option>
                      <option value="Support">Support</option>
                      <option value="Operations">Operations</option>
                      <option value="Finance">Finance</option>
                      <option value="HR">Human Resources</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Experience Level
                    </label>
                    <select
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={builderConfig.experience}
                      onChange={(e) => setBuilderConfig(prev => ({ ...prev, experience: e.target.value }))}
                    >
                      <option value="beginner">Beginner (0-2 years)</option>
                      <option value="intermediate">Intermediate (2-5 years)</option>
                      <option value="advanced">Advanced (5-10 years)</option>
                      <option value="expert">Expert (10+ years)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Describe what this AI employee will do and their main responsibilities..."
                    value={builderConfig.description}
                    onChange={(e) => setBuilderConfig(prev => ({ ...prev, description: e.target.value }))}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Skills
                  </label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {builderConfig.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                      >
                        {skill}
                        <button
                          onClick={() => setBuilderConfig(prev => ({
                            ...prev,
                            skills: prev.skills.filter((_, i) => i !== index)
                          }))}
                          className="ml-2 text-blue-600 hover:text-blue-800"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Type a skill and press Enter to add it"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        const skill = e.target.value.trim();
                        if (skill && !builderConfig.skills.includes(skill)) {
                          setBuilderConfig(prev => ({
                            ...prev,
                            skills: [...prev.skills, skill]
                          }));
                          e.target.value = '';
                        }
                      }
                    }}
                  />
                </div>
              </motion.div>
            )}

            {builderStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center mb-8">
                  <FileText className="w-16 h-16 text-purple-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Instructions & Knowledge</h3>
                  <p className="text-gray-600">Define how your AI employee should behave and what they should know</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Instructions <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Provide detailed instructions on how this AI employee should behave, what tasks they should prioritize, and how they should interact with team members..."
                    value={builderConfig.instructions}
                    onChange={(e) => setBuilderConfig(prev => ({ ...prev, instructions: e.target.value }))}
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Be specific about the AI's role, decision-making process, and communication style.
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Knowledge Areas
                    {builderConfig.department && (
                      <span className="text-blue-600 text-sm ml-2">
                        (Filtered for {builderConfig.department})
                      </span>
                    )}
                  </label>
                  {!builderConfig.department ? (
                    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <p className="text-yellow-800 text-sm">
                        Please select a department first to see relevant knowledge areas.
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {(departmentKnowledgeAreas[builderConfig.department] || []).map((knowledge) => (
                        <label key={knowledge} className="flex items-center space-x-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={builderConfig.knowledge.includes(knowledge)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setBuilderConfig(prev => ({
                                  ...prev,
                                  knowledge: [...prev.knowledge, knowledge]
                                }));
                              } else {
                                setBuilderConfig(prev => ({
                                  ...prev,
                                  knowledge: prev.knowledge.filter(k => k !== knowledge)
                                }));
                              }
                            }}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-700">{knowledge}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {builderStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center mb-8">
                  <Zap className="w-16 h-16 text-green-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Capabilities & Tools</h3>
                  <p className="text-gray-600">Define what your AI employee can do and what tools they have access to</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Core Capabilities
                    {builderConfig.department && (
                      <span className="text-blue-600 text-sm ml-2">
                        (Filtered for {builderConfig.department})
                      </span>
                    )}
                  </label>
                  {!builderConfig.department ? (
                    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <p className="text-yellow-800 text-sm">
                        Please select a department first to see relevant core capabilities.
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {(departmentCoreCapabilities[builderConfig.department] || []).map((capability) => (
                        <label key={capability} className="flex items-center space-x-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={builderConfig.capabilities.includes(capability)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setBuilderConfig(prev => ({
                                  ...prev,
                                  capabilities: [...prev.capabilities, capability]
                                }));
                              } else {
                                setBuilderConfig(prev => ({
                                  ...prev,
                                  capabilities: prev.capabilities.filter(c => c !== capability)
                                }));
                              }
                            }}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-700">{capability}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {builderStep === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center mb-8">
                  <Users className="w-16 h-16 text-orange-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Personality & Communication</h3>
                  <p className="text-gray-600">Define how your AI employee should interact and communicate</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Communication Style
                    </label>
                    <select
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={builderConfig.communicationStyle}
                      onChange={(e) => setBuilderConfig(prev => ({ ...prev, communicationStyle: e.target.value }))}
                    >
                      <option value="professional">Professional & Formal</option>
                      <option value="friendly">Friendly & Casual</option>
                      <option value="analytical">Analytical & Data-driven</option>
                      <option value="creative">Creative & Inspiring</option>
                      <option value="supportive">Supportive & Encouraging</option>
                      <option value="direct">Direct & Straightforward</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Work Hours
                    </label>
                    <select
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={builderConfig.workHours}
                      onChange={(e) => setBuilderConfig(prev => ({ ...prev, workHours: e.target.value }))}
                    >
                      <option value="24/7">24/7 Available</option>
                      <option value="business">Business Hours (9-5)</option>
                      <option value="extended">Extended Hours (7-7)</option>
                      <option value="weekdays">Weekdays Only</option>
                      <option value="custom">Custom Schedule</option>
                    </select>
                  </div>
                </div>
              </motion.div>
            )}

            {builderStep === 5 && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center mb-8">
                  <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Review & Create</h3>
                  <p className="text-gray-600">Review your AI employee configuration and create them</p>
                </div>

                <div className="bg-gray-50 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">AI Employee Summary</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="font-medium text-gray-700 mb-2">Basic Information</h5>
                      <div className="space-y-1 text-sm text-gray-600">
                        <p><strong>Name:</strong> {builderConfig.name || 'Not specified'}</p>
                        <p><strong>Role:</strong> {builderConfig.role || 'Not specified'}</p>
                        <p><strong>Department:</strong> {builderConfig.department || 'Not specified'}</p>
                        <p><strong>Experience:</strong> {builderConfig.experience}</p>
                      </div>
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-700 mb-2">Capabilities</h5>
                      <div className="space-y-1 text-sm text-gray-600">
                        <p><strong>Skills:</strong> {builderConfig.skills.length} selected</p>
                        <p><strong>Capabilities:</strong> {builderConfig.capabilities.length} selected</p>
                        <p><strong>Languages:</strong> {builderConfig.languages.join(', ')}</p>
                        <p><strong>Work Hours:</strong> {builderConfig.workHours}</p>
                      </div>
                    </div>
                  </div>
                  
                  {builderConfig.description && (
                    <div className="mt-4">
                      <h5 className="font-medium text-gray-700 mb-2">Description</h5>
                      <p className="text-sm text-gray-600">{builderConfig.description}</p>
                    </div>
                  )}
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <div className="flex items-start space-x-3">
                    <Sparkles className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <h5 className="font-medium text-blue-900">AI Generation in Progress</h5>
                      <p className="text-sm text-blue-700 mt-1">
                        Your AI employee is being created with advanced machine learning models. 
                        This process typically takes 2-5 minutes.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {builderStep > 1 && (
              <button
                onClick={() => setBuilderStep(prev => prev - 1)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
              >
                ← Previous
              </button>
            )}
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={() => {
                setShowBuilderModal(false);
                setBuilderStep(1);
              }}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
            >
              Cancel
            </button>
            
            {builderStep < 5 ? (
              <button
                onClick={() => setBuilderStep(prev => prev + 1)}
                disabled={!builderConfig.name || !builderConfig.role || !builderConfig.department}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                Next →
              </button>
            ) : (
              <button
                onClick={() => {
                  setIsGenerating(true);
                  setTimeout(() => {
                    handleCreateEmployee();
                    setBuilderStep(1);
                    setIsGenerating(false);
                    setBuilderConfig({
                      name: '',
                      role: '',
                      department: '',
                      skills: [],
                      personality: 'professional',
                      experience: 'intermediate',
                      description: '',
                      instructions: '',
                      knowledge: [],
                      capabilities: [],
                      communicationStyle: 'professional',
                      workHours: '24/7',
                      timezone: 'UTC',
                      languages: ['English'],
                      specializations: [],
                      goals: [],
                      constraints: [],
                      examples: []
                    });
                  }, 3000);
                }}
                disabled={isGenerating}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium flex items-center space-x-2"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Creating...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Create AI Employee</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Header with Tabs */}
        <div className="mb-6">
          <div className="bg-white rounded-xl border border-gray-200 p-2 shadow-sm">
            <nav className="flex space-x-2">
              <button
                onClick={() => setShowBuilderModal(true)}
                className="flex items-center space-x-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors mr-2"
              >
                <Plus className="w-5 h-5" />
                <span>Create AI Employee</span>
              </button>
              {[
                { id: 'marketplace', label: 'Marketplace', count: marketplaceEmployees.length, icon: Globe },
                { id: 'my-team', label: 'My Team', count: myTeamEmployees.length, icon: Users },
                { id: 'trends', label: 'Trends', count: Object.values(trendsData).flat().length, icon: TrendingUp }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 px-4 py-3 rounded-lg font-medium text-sm transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <Icon size={16} />
                    <span>{tab.label}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      activeTab === tab.id
                        ? 'bg-white/20 text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}>
                      {tab.count}
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Search and Filters */}
        {!showInlineDetails && activeTab === 'marketplace' && (
          <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search AI employees by name, role, or skills..."
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <select
                className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name} ({category.count})
                  </option>
                ))}
              </select>
              <button className="px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                <Filter className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-4 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Total AI Employees</p>
                  <p className="text-2xl font-bold">24</p>
                </div>
                <Users className="w-8 h-8 text-blue-200" />
              </div>
            </div>
            <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-4 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">Available Now</p>
                  <p className="text-2xl font-bold">18</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-200" />
              </div>
            </div>
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-4 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">Avg. Rating</p>
                  <p className="text-2xl font-bold">4.8</p>
                </div>
                <Star className="w-8 h-8 text-purple-200" />
              </div>
            </div>
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-4 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm">Success Rate</p>
                  <p className="text-2xl font-bold">96%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-orange-200" />
              </div>
            </div>
          </div>
        </div>
        )}

        {/* Search and Filters for Trends */}
        {!showInlineDetails && activeTab === 'trends' && (
          <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search trending AI employees..."
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <select
                className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={trendsCategory}
                onChange={(e) => setTrendsCategory(e.target.value)}
              >
                <option value="trending">🔥 Trending</option>
                <option value="popular">⭐ Popular</option>
                <option value="mutualConnections">🤝 Mutual Connections</option>
                <option value="similarIndustries">🏢 Similar Industries</option>
                <option value="newReleases">🆕 New Releases</option>
                <option value="topRated">🏆 Top Rated</option>
              </select>
              <button className="px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                <Filter className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
        )}

        {/* Search and Filters for My Team */}
        {!showInlineDetails && activeTab === 'my-team' && (
          <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search your AI team..."
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <select
                className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name} ({category.count})
                  </option>
                ))}
              </select>
              <button className="px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                <Filter className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
        )}

        {/* AI Recommendation */}
        {!showInlineDetails && activeTab === 'marketplace' && (
          <div className="mb-8">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <Brain className="w-6 h-6" />
                  <h3 className="text-lg font-semibold">AI Recommendation for Your Business</h3>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setCurrentOKRIndex(Math.max(0, currentOKRIndex - 1))}
                    disabled={currentOKRIndex === 0}
                    className="p-2 rounded-lg bg-white/20 hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ArrowRight className="w-4 h-4 rotate-180" />
                  </button>
                  <span className="text-sm font-medium">
                    {currentOKRIndex + 1} of {okrs.length}
                  </span>
                  <button
                    onClick={() => setCurrentOKRIndex(Math.min(okrs.length - 1, currentOKRIndex + 1))}
                    disabled={currentOKRIndex === okrs.length - 1}
                    className="p-2 rounded-lg bg-white/20 hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* OKR Progress Dots */}
              <div className="flex justify-center space-x-2 mb-6">
                {okrs.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentOKRIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === currentOKRIndex 
                        ? 'bg-white scale-125' 
                        : 'bg-white/50 hover:bg-white/70'
                    }`}
                  />
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-2">Based on your OKR: "{okrs[currentOKRIndex].title}"</h4>
                  <p className="text-purple-100 text-sm mb-3">
                    {okrs[currentOKRIndex].description}
                  </p>
                  <div className="space-y-2">
                    {okrs[currentOKRIndex].recommendations.map((rec, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-300" />
                        <span className="text-sm">{rec}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Recommended AI Employees</h4>
                  <div className="space-y-2">
                    {okrs[currentOKRIndex].recommendedEmployees.map((empId, index) => {
                      const emp = marketplaceEmployees.find(e => e.id === empId);
                      if (!emp) return null;
                      return (
                        <div 
                          key={index} 
                          onClick={() => {
                            setSelectedEmployee(emp);
                            setShowInlineDetails(true);
                          }}
                          className="flex items-center space-x-3 p-2 bg-white/20 rounded-lg hover:bg-white/30 cursor-pointer transition-colors"
                        >
                          <img src={emp.avatar} alt={emp.name} className="w-8 h-8 rounded-full" />
                          <div className="flex-1">
                            <div className="text-sm font-medium">{emp.name}</div>
                            <div className="text-xs text-purple-200">{emp.role}</div>
                          </div>
                          <div className="text-xs">
                            <div className="flex items-center space-x-1">
                              <Star className="w-3 h-3 text-yellow-400 fill-current" />
                              <span>{emp.rating}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Content */}
        {!showInlineDetails ? (
          activeTab === 'trends' ? (
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {trendsCategory === 'trending' && '🔥 Trending AI Employees'}
                  {trendsCategory === 'popular' && '⭐ Popular AI Employees'}
                  {trendsCategory === 'mutualConnections' && '🤝 Mutual Connections Are Using'}
                  {trendsCategory === 'similarIndustries' && '🏢 Similar Industries Are Using'}
                  {trendsCategory === 'newReleases' && '🆕 New Releases'}
                  {trendsCategory === 'topRated' && '🏆 Top Rated AI Employees'}
                </h2>
                <p className="text-gray-600">
                  {trendsCategory === 'trending' && 'AI employees gaining momentum and popularity'}
                  {trendsCategory === 'popular' && 'Most used and trusted AI employees'}
                  {trendsCategory === 'mutualConnections' && 'AI employees your network is using'}
                  {trendsCategory === 'similarIndustries' && 'AI employees popular in your industry'}
                  {trendsCategory === 'newReleases' && 'Fresh AI employees just added to the platform'}
                  {trendsCategory === 'topRated' && 'Highest rated AI employees by users'}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEmployees.map((employee) => (
                  <motion.div
                    key={employee.id}
                    whileHover={{ y: -4, scale: 1.02 }}
                    onClick={() => {
                      setSelectedEmployee(employee);
                      setShowInlineDetails(true);
                    }}
                    className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer"
                  >
                    {/* Header with Badge */}
                    <div className="relative p-6">
                      <div className="absolute top-3 right-3 z-10">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          employee.trend === 'NEW' ? 'bg-green-100 text-green-800' :
                          employee.trend === 'TOP' ? 'bg-yellow-100 text-yellow-800' :
                          employee.trend?.includes('+') ? 'bg-red-100 text-red-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {employee.trend || 'TRENDING'}
                        </span>
                      </div>
                      
                      {/* Profile Logo and Basic Info */}
                      <div className="flex items-start space-x-3 mb-3">
                        <img 
                          src={employee.avatar} 
                          alt={employee.name}
                          className="w-12 h-12 rounded-full object-cover border-2 border-gray-100"
                        />
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-gray-900 mb-1">{employee.name}</h3>
                          <p className="text-sm text-gray-600">{employee.role}</p>
                        </div>
                      </div>

                      {/* Rating and Stats */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-sm font-bold text-gray-900">{employee.rating}</span>
                            <span className="text-xs text-gray-500">({employee.users} users)</span>
                          </div>
                        </div>
                        {employee.mutualCount && (
                          <div className="flex items-center space-x-1 text-blue-500">
                            <Users className="w-3 h-3" />
                            <span className="text-xs font-medium">{employee.mutualCount} mutual</span>
                          </div>
                        )}
                        {employee.industry && (
                          <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                            {employee.industry}
                          </div>
                        )}
                      </div>

                      {/* Price and Quick Actions */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div>
                          <p className="text-lg font-bold text-gray-900">${employee.hourlyRate || 25}</p>
                          <p className="text-xs text-gray-500">per hour</p>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedEmployee(employee);
                              setShowHireModal(true);
                            }}
                            className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                          >
                            Hire
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              console.log(`Loving ${employee.name}`);
                            }}
                            className="px-4 py-2 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            Love
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEmployees.map((employee) => (
                <motion.div
                  key={employee.id}
                  whileHover={{ y: -4, scale: 1.02 }}
                  onClick={() => {
                    setSelectedEmployee(employee);
                    setShowInlineDetails(true);
                  }}
                  className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer"
                >
              {/* Header with Badge */}
              <div className="relative p-6">
                <div className="absolute top-3 right-3 z-10">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    employee.badgeColor === 'green' ? 'bg-green-100 text-green-800' :
                    employee.badgeColor === 'blue' ? 'bg-blue-100 text-blue-800' :
                    employee.badgeColor === 'orange' ? 'bg-orange-100 text-orange-800' :
                    employee.badgeColor === 'purple' ? 'bg-purple-100 text-purple-800' :
                    employee.badgeColor === 'red' ? 'bg-red-100 text-red-800' :
                    'bg-teal-100 text-teal-800'
                  }`}>
                    {employee.badge}
                  </span>
                </div>
                
                {/* Profile Logo and Basic Info */}
                <div className="flex items-start space-x-3 mb-3">
                  <img 
                    src={employee.avatar} 
                    alt={employee.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-gray-100"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{employee.name}</h3>
                    <p className="text-sm text-gray-600">{employee.role}</p>
                  </div>
                </div>

                {/* Rating and Stats */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-bold text-gray-900">{employee.rating}</span>
                      <span className="text-xs text-gray-500">({employee.reviews})</span>
                    </div>
                    <div className="flex items-center space-x-1 text-green-600">
                      <CheckCircle className="w-3 h-3" />
                      <span className="text-xs font-medium">{employee.successRate}%</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1 text-red-500">
                    <Heart className="w-4 h-4" />
                    <span className="text-xs font-medium">{employee.lovers || 0}</span>
                  </div>
                </div>

                {/* Intro Line */}
                <div className="mb-3">
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {employee.intro || `I can help you with ${employee.role.toLowerCase()} tasks and provide expert guidance in your field.`}
                  </p>
                </div>

                {/* Developed by */}
                <div className="mb-3">
                  <p className="text-xs text-gray-500">Developed by</p>
                  <p className="text-sm font-medium text-gray-900">{employee.creator?.name || 'Unknown'}</p>
                </div>

                {/* Price and Quick Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div>
                    <p className="text-lg font-bold text-gray-900">${employee.hourlyRate}</p>
                    <p className="text-xs text-gray-500">per hour</p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedEmployee(employee);
                        setShowHireModal(true);
                      }}
                      className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Hire
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        // Handle love action
                        console.log(`Loving ${employee.name}`);
                      }}
                      className="px-4 py-2 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Love
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
            </div>
          )
        ) : (
          /* Inline Details View */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden"
          >
            {/* Header with Back Button */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setShowInlineDetails(false)}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <ArrowRight className="w-5 h-5 rotate-180" />
                  </button>
                  <img
                    src={selectedEmployee.avatar}
                    alt={selectedEmployee.name}
                    className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                  <div>
                    <h2 className="text-2xl font-bold">{selectedEmployee.name}</h2>
                    <p className="text-blue-100">{selectedEmployee.role} • {selectedEmployee.department}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="font-medium">{selectedEmployee.rating}</span>
                        <span className="text-blue-200">({selectedEmployee.reviews} reviews)</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4 text-blue-200" />
                        <span className="text-blue-200">{selectedEmployee.users || 0} users</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors">
                    <Heart className="w-4 h-4 mr-2" />
                    Love
                  </button>
                  <button className="px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors">
                    <Star className="w-4 h-4 mr-2" />
                    Review
                  </button>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="space-y-6">
                  {/* Overview */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Overview</h3>
                    <p className="text-gray-700 leading-relaxed">{selectedEmployee.description}</p>
                  </div>

                  {/* What I can do for you */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">What I can do for you</h3>
                    <p className="text-gray-700 leading-relaxed">{selectedEmployee.intro}</p>
                  </div>

                  {/* Skills & Expertise */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Skills & Expertise</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedEmployee.skills?.map((skill, index) => (
                        <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Creator Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Creator Information</h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                          {selectedEmployee.creator?.name?.charAt(0) || 'U'}
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{selectedEmployee.creator?.name || 'Unknown'}</h4>
                          <p className="text-sm text-gray-600">{selectedEmployee.creator?.type || 'Individual'}</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-700 mb-2">{selectedEmployee.creator?.description || 'No description available'}</p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <span>📍 {selectedEmployee.creator?.location || 'Unknown'}</span>
                        <span>👥 {selectedEmployee.creator?.teamSize || 'N/A'}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  {/* Performance Status */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Performance Status</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-green-50 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-green-900">{selectedEmployee.projectsCompleted || 0}</div>
                        <div className="text-sm text-green-700">Projects Completed</div>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-blue-900">{selectedEmployee.avgRating || selectedEmployee.rating}</div>
                        <div className="text-sm text-blue-700">Average Rating</div>
                      </div>
                      <div className="bg-purple-50 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-purple-900">{selectedEmployee.responseTime || '< 1 min'}</div>
                        <div className="text-sm text-purple-700">Response Time</div>
                      </div>
                      <div className="bg-orange-50 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-orange-900">{selectedEmployee.availability || '24/7'}</div>
                        <div className="text-sm text-orange-700">Availability</div>
                      </div>
                    </div>
                  </div>

                  {/* Pricing Options */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Pricing Options</h3>
                    <div className="space-y-3">
                      {selectedEmployee.pricing ? (
                        <>
                          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <span className="font-medium">Hourly</span>
                            <span className="text-lg font-bold text-gray-900">${selectedEmployee.pricing.hourly}</span>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <span className="font-medium">Daily</span>
                            <span className="text-lg font-bold text-gray-900">${selectedEmployee.pricing.daily}</span>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <span className="font-medium">Weekly</span>
                            <span className="text-lg font-bold text-gray-900">${selectedEmployee.pricing.weekly}</span>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <span className="font-medium">Monthly</span>
                            <span className="text-lg font-bold text-gray-900">${selectedEmployee.pricing.monthly}</span>
                          </div>
                        </>
                      ) : (
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <span className="font-medium">Hourly Rate</span>
                          <span className="text-lg font-bold text-gray-900">${selectedEmployee.hourlyRate}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <button className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                      Hire Now
                    </button>
                    <button className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium">
                      Buy Now
                    </button>
                    <div className="flex space-x-2">
                      <button className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                        <Heart className="w-4 h-4 mr-2 inline" />
                        Love
                      </button>
                      <button className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                        <Star className="w-4 h-4 mr-2 inline" />
                        Review
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Builder Modal */}
        {showBuilderModal && renderBuilderModal()}

        {/* Detail Modal */}
        {showDetailModal && selectedEmployee && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <img
                      src={selectedEmployee.avatar}
                      alt={selectedEmployee.name}
                      className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg"
                    />
                    <div>
                      <h2 className="text-2xl font-bold">{selectedEmployee.name}</h2>
                      <p className="text-blue-100">{selectedEmployee.role} • {selectedEmployee.department}</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="font-medium">{selectedEmployee.rating}</span>
                          <span className="text-blue-200">({selectedEmployee.reviews} reviews)</span>
                        </div>
                        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                          selectedEmployee.badgeColor === 'green' ? 'bg-green-100 text-green-800' :
                          selectedEmployee.badgeColor === 'blue' ? 'bg-blue-100 text-blue-800' :
                          selectedEmployee.badgeColor === 'orange' ? 'bg-orange-100 text-orange-800' :
                          selectedEmployee.badgeColor === 'purple' ? 'bg-purple-100 text-purple-800' :
                          selectedEmployee.badgeColor === 'red' ? 'bg-red-100 text-red-800' :
                          'bg-teal-100 text-teal-800'
                        }`}>
                          {selectedEmployee.badge}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowDetailModal(false)}
                    className="text-white hover:text-blue-200 transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 overflow-y-auto max-h-[60vh]">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Overview */}
                  <div className="lg:col-span-2 space-y-6">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Overview</h3>
                      <p className="text-gray-600 leading-relaxed mb-4">{selectedEmployee.description || 'No description available'}</p>
                      
                      {/* One-liner Intro */}
                      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                        <h4 className="font-semibold text-blue-900 mb-2">What I can do for you:</h4>
                        <p className="text-blue-800 italic">
                          {selectedEmployee.intro || `I can help you with ${selectedEmployee.role?.toLowerCase() || 'AI'} tasks and provide expert guidance in your field.`}
                        </p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Skills & Expertise</h3>
                      <div className="flex flex-wrap gap-2">
                        {(selectedEmployee.skills || []).map((skill, index) => (
                          <span
                            key={index}
                            className="px-3 py-2 bg-blue-50 text-blue-700 text-sm font-medium rounded-lg border border-blue-200"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Creator Information</h3>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                            {selectedEmployee.creator?.name?.charAt(0) || 'A'}
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">{selectedEmployee.creator?.name || 'AI Solutions Inc.'}</h4>
                            <p className="text-sm text-gray-600">{selectedEmployee.creator?.type || 'Company'}</p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600">
                          {selectedEmployee.creator?.description || 'Leading AI development company specializing in custom AI solutions for businesses.'}
                        </p>
                        <div className="flex items-center space-x-4 mt-3 text-sm text-gray-500">
                          <span>📍 {selectedEmployee.creator?.location || 'San Francisco, CA'}</span>
                          <span>👥 {selectedEmployee.creator?.teamSize || '50+ employees'}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Languages</h3>
                      <div className="flex flex-wrap gap-2">
                        {(selectedEmployee.languages || []).map((lang, index) => (
                          <span
                            key={index}
                            className="px-3 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg"
                          >
                            {lang}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Sidebar */}
                  <div className="space-y-6">
                    {/* Stats */}
                    <div className="bg-gray-50 rounded-xl p-4">
                      <h3 className="text-lg font-bold text-gray-900 mb-4">Performance Stats</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Success Rate</span>
                          <span className="font-bold text-green-600">{selectedEmployee.successRate || 'N/A'}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Projects Completed</span>
                          <span className="font-bold text-gray-900">{selectedEmployee.projectsCompleted || 'N/A'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Experience</span>
                          <span className="font-bold text-gray-900">{selectedEmployee.experience || 'N/A'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Response Time</span>
                          <span className="font-bold text-green-600">{selectedEmployee.responseTime || 'N/A'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Availability</span>
                          <span className="font-bold text-blue-600">{selectedEmployee.availability || 'N/A'}</span>
                        </div>
                      </div>
                    </div>

                    {/* Pricing */}
                    <div className="bg-blue-50 rounded-xl p-4">
                      <h3 className="text-lg font-bold text-gray-900 mb-4">Pricing Options</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Hourly Rate</span>
                          <span className="text-2xl font-bold text-gray-900">${selectedEmployee.hourlyRate || 'N/A'}</span>
                        </div>
                        <div className="text-sm text-gray-500">
                          Range: {selectedEmployee.priceRange || 'N/A'}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="bg-gray-50 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => {
                      // Handle love action
                      console.log(`Loving ${selectedEmployee.name}`);
                    }}
                    className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Heart className="w-4 h-4" />
                    <span>Love</span>
                  </button>
                  <button 
                    onClick={() => {
                      // Handle save action
                      console.log(`Saving ${selectedEmployee.name}`);
                    }}
                    className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Bookmark className="w-4 h-4" />
                    <span>Save</span>
                  </button>
                </div>
                
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setShowDetailModal(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      setShowDetailModal(false);
                      setShowHireModal(true);
                    }}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center space-x-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Hire Now</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnhancedAICoBuilder;
