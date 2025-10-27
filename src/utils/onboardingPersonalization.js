// Utility functions to personalize the platform based on onboarding data

export const getPersonalizedDashboard = (onboardingData) => {
  if (!onboardingData) return null;
  
  const { role, profile } = onboardingData;
  
  // Role-specific dashboard configuration
  const roleConfigs = {
    founder: {
      widgets: ['revenue', 'users', 'goals', 'team', 'ai'],
      kpis: {
        revenue: {
          current: '$0',
          target: '$10K',
          enabled: true
        },
        users: {
          current: '0',
          target: '100',
          enabled: true
        },
        goals: {
          primary: profile?.goals || [],
          enabled: true
        }
      },
      teamInsights: {
        enabled: true,
        showHiring: true
      },
      aiRecommendations: {
        industry: profile?.industry || '',
        enabled: true
      }
    },
    investor: {
      widgets: ['portfolio', 'deals', 'analytics', 'network'],
      kpis: {
        portfolio: {
          current: '0',
          target: '10',
          enabled: true
        },
        deals: {
          current: '0',
          target: '5',
          enabled: true
        }
      },
      teamInsights: {
        enabled: false
      },
      aiRecommendations: {
        investmentFocus: profile?.investmentFocus || '',
        enabled: true
      }
    },
    builder: {
      widgets: ['projects', 'code', 'collaboration', 'ai'],
      kpis: {
        projects: {
          current: '0',
          target: '5',
          enabled: true
        },
        commits: {
          current: '0',
          target: '100',
          enabled: true
        }
      },
      teamInsights: {
        enabled: false
      },
      aiRecommendations: {
        primaryTech: profile?.primaryTech || '',
        experience: profile?.experience || '',
        enabled: true
      }
    }
  };
  
  return roleConfigs[role] || roleConfigs.founder;
};

export const getPersonalizedFeatures = (onboardingData) => {
  if (!onboardingData) return [];
  
  const { role, profile } = onboardingData;
  
  // Role-specific feature recommendations
  const roleFeatures = {
    founder: [
      {
        id: 'ai-cobuilder',
        name: 'AI Co-Builder',
        description: 'Leverage AI to build and scale your startup',
        priority: 'high',
        icon: 'Brain'
      },
      {
        id: 'analytics',
        name: 'Growth Analytics',
        description: 'Track revenue, users, and key metrics',
        priority: 'high',
        icon: 'BarChart3'
      },
      {
        id: 'community',
        name: 'Founder Network',
        description: 'Connect with other entrepreneurs and investors',
        priority: 'high',
        icon: 'MessageSquare'
      },
      {
        id: 'ma',
        name: 'M&A Tools',
        description: 'Tools for partnerships and acquisitions',
        priority: 'medium',
        icon: 'TrendingUp'
      }
    ],
    investor: [
      {
        id: 'portfolio',
        name: 'Portfolio Management',
        description: 'Track and manage your investments',
        priority: 'high',
        icon: 'TrendingUp'
      },
      {
        id: 'deals',
        name: 'Deal Flow',
        description: 'Discover and evaluate investment opportunities',
        priority: 'high',
        icon: 'Target'
      },
      {
        id: 'analytics',
        name: 'Investment Analytics',
        description: 'Analyze portfolio performance and trends',
        priority: 'high',
        icon: 'BarChart3'
      },
      {
        id: 'network',
        name: 'Investor Network',
        description: 'Connect with other investors and founders',
        priority: 'medium',
        icon: 'Users'
      }
    ],
    builder: [
      {
        id: 'projects',
        name: 'Project Management',
        description: 'Manage development projects and tasks',
        priority: 'high',
        icon: 'Briefcase'
      },
      {
        id: 'code',
        name: 'Code Collaboration',
        description: 'Collaborate on code with AI assistance',
        priority: 'high',
        icon: 'Code'
      },
      {
        id: 'ai-tools',
        name: 'AI Development Tools',
        description: 'AI-powered coding and development assistance',
        priority: 'high',
        icon: 'Brain'
      },
      {
        id: 'integrations',
        name: 'Integration Hub',
        description: 'Connect and manage development tools',
        priority: 'medium',
        icon: 'Settings'
      }
    ]
  };
  
  return roleFeatures[role] || roleFeatures.founder;
};

export const getPersonalizedNotifications = (onboardingData) => {
  if (!onboardingData) return [];
  
  const { preferences, goals, company } = onboardingData;
  
  const notificationTypes = {
    'email': {
      name: 'Email Notifications',
      description: 'Receive updates via email',
      enabled: preferences?.notifications?.includes('email')
    },
    'push': {
      name: 'Push Notifications',
      description: 'Get real-time updates on your device',
      enabled: preferences?.notifications?.includes('push')
    },
    'dashboard': {
      name: 'Dashboard Alerts',
      description: 'See important updates on your dashboard',
      enabled: preferences?.notifications?.includes('dashboard')
    }
  };
  
  return Object.entries(notificationTypes)
    .filter(([_, config]) => config.enabled)
    .map(([type, config]) => ({ type, ...config }));
};

export const getPersonalizedAIEmployees = (onboardingData) => {
  if (!onboardingData) return [];
  
  const { team, company, goals } = onboardingData;
  
  const aiEmployeeTemplates = {
    'CEO/Founder': {
      name: 'AI Strategy Advisor',
      role: 'Strategic Planning',
      description: 'Helps with business strategy and decision making',
      skills: ['Strategy', 'Leadership', 'Business Development'],
      priority: 'high'
    },
    'CTO': {
      name: 'AI Technical Lead',
      role: 'Technology',
      description: 'Assists with technical architecture and development',
      skills: ['Software Architecture', 'Technology Stack', 'Development'],
      priority: team?.currentRoles?.includes('CTO') ? 'high' : 'medium'
    },
    'CMO': {
      name: 'AI Marketing Specialist',
      role: 'Marketing',
      description: 'Helps with marketing strategy and campaigns',
      skills: ['Digital Marketing', 'Content Strategy', 'Growth'],
      priority: goals?.primary?.includes('Grow User Base') ? 'high' : 'medium'
    },
    'CFO': {
      name: 'AI Financial Analyst',
      role: 'Finance',
      description: 'Assists with financial planning and analysis',
      skills: ['Financial Modeling', 'Budgeting', 'Investor Relations'],
      priority: goals?.primary?.includes('Raise Funding') ? 'high' : 'medium'
    }
  };
  
  // Return AI employees based on current roles and goals
  const recommendedEmployees = [];
  
  team?.currentRoles?.forEach(role => {
    if (aiEmployeeTemplates[role]) {
      recommendedEmployees.push(aiEmployeeTemplates[role]);
    }
  });
  
  // Add additional recommendations based on goals
  if (goals?.primary?.includes('Raise Funding') && !recommendedEmployees.find(emp => emp.role === 'Finance')) {
    recommendedEmployees.push(aiEmployeeTemplates['CFO']);
  }
  
  if (goals?.primary?.includes('Grow User Base') && !recommendedEmployees.find(emp => emp.role === 'Marketing')) {
    recommendedEmployees.push(aiEmployeeTemplates['CMO']);
  }
  
  return recommendedEmployees;
};

export const getPersonalizedWorkflows = (onboardingData) => {
  if (!onboardingData) return [];
  
  const { company, goals, team, technology } = onboardingData;
  
  const workflows = [];
  
  // Revenue tracking workflow
  if (goals?.primary?.includes('Increase Revenue')) {
    workflows.push({
      name: 'Revenue Tracking',
      description: 'Automatically track and analyze revenue metrics',
      triggers: ['New Sale', 'Subscription Renewal', 'Payment Received'],
      actions: ['Update Dashboard', 'Send Notification', 'Generate Report'],
      enabled: true
    });
  }
  
  // User growth workflow
  if (goals?.primary?.includes('Grow User Base')) {
    workflows.push({
      name: 'User Growth Tracking',
      description: 'Monitor user acquisition and engagement',
      triggers: ['New User Signup', 'User Activity', 'Churn Risk'],
      actions: ['Update Analytics', 'Send Alert', 'Trigger Campaign'],
      enabled: true
    });
  }
  
  // Team management workflow
  if (team?.hiringNeeds?.length > 0) {
    workflows.push({
      name: 'Hiring Pipeline',
      description: 'Manage recruitment and hiring process',
      triggers: ['Job Application', 'Interview Scheduled', 'Offer Made'],
      actions: ['Update Pipeline', 'Notify Team', 'Schedule Follow-up'],
      enabled: true
    });
  }
  
  // Technology integration workflow
  if (technology?.integrations?.length > 0) {
    workflows.push({
      name: 'Integration Monitoring',
      description: 'Monitor and manage tool integrations',
      triggers: ['Integration Error', 'Data Sync', 'API Limit'],
      actions: ['Send Alert', 'Retry Sync', 'Escalate Issue'],
      enabled: true
    });
  }
  
  return workflows;
};

export const getPersonalizedAnalytics = (onboardingData) => {
  if (!onboardingData) return null;
  
  const { company, goals, team } = onboardingData;
  
  return {
    // Industry-specific metrics
    industryMetrics: {
      industry: company?.industry || '',
      benchmarks: getIndustryBenchmarks(company?.industry),
      competitors: getIndustryCompetitors(company?.industry)
    },
    
    // Stage-specific KPIs
    stageKPIs: {
      stage: company?.stage || '',
      recommended: getStageKPIs(company?.stage),
      timeline: goals?.timeline || ''
    },
    
    // Team-specific insights
    teamAnalytics: {
      size: company?.teamSize || '',
      roles: team?.currentRoles || [],
      hiring: team?.hiringNeeds || [],
      experience: team?.experience || ''
    }
  };
};

// Helper functions
const getIndustryBenchmarks = (industry) => {
  const benchmarks = {
    'SaaS': {
      churnRate: '5-7%',
      growthRate: '20-30%',
      ltvCac: '3:1',
      mrrGrowth: '15-20%'
    },
    'E-commerce': {
      conversionRate: '2-3%',
      averageOrderValue: '$50-100',
      cartAbandonment: '70%',
      returnRate: '20-30%'
    },
    'FinTech': {
      complianceScore: '95%+',
      securityScore: '98%+',
      uptime: '99.9%',
      transactionVolume: 'High'
    }
  };
  
  return benchmarks[industry] || {};
};

const getIndustryCompetitors = (industry) => {
  const competitors = {
    'SaaS': ['Salesforce', 'HubSpot', 'Slack', 'Zoom'],
    'E-commerce': ['Shopify', 'WooCommerce', 'Magento', 'BigCommerce'],
    'FinTech': ['Stripe', 'PayPal', 'Square', 'Plaid']
  };
  
  return competitors[industry] || [];
};

const getStageKPIs = (stage) => {
  const stageKPIs = {
    'Idea Stage': ['Market Research', 'User Interviews', 'MVP Development'],
    'MVP Development': ['User Testing', 'Feature Usage', 'Feedback Score'],
    'Early Stage': ['User Acquisition', 'Retention Rate', 'Product-Market Fit'],
    'Growth Stage': ['Revenue Growth', 'Customer Acquisition Cost', 'Lifetime Value'],
    'Scale Stage': ['Market Share', 'Operational Efficiency', 'International Expansion']
  };
  
  return stageKPIs[stage] || [];
};

export const initializePersonalizedPlatform = (onboardingData) => {
  return {
    dashboard: getPersonalizedDashboard(onboardingData),
    features: getPersonalizedFeatures(onboardingData),
    notifications: getPersonalizedNotifications(onboardingData),
    aiEmployees: getPersonalizedAIEmployees(onboardingData),
    workflows: getPersonalizedWorkflows(onboardingData),
    analytics: getPersonalizedAnalytics(onboardingData)
  };
};
