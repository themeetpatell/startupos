import React, { createContext, useContext, useState, useEffect } from 'react';

const GamificationContext = createContext();

export const useGamification = () => {
  const context = useContext(GamificationContext);
  if (!context) {
    throw new Error('useGamification must be used within a GamificationProvider');
  }
  return context;
};

export const GamificationProvider = ({ children }) => {
  // Load from localStorage or use defaults
  const [userProgress, setUserProgress] = useState(() => {
    const saved = localStorage.getItem('gamificationProgress');
    return saved ? JSON.parse(saved) : {
      level: 1,
      experience: 0,
      points: 0,
      achievements: [],
      milestones: [],
      streak: 0,
      lastActivity: null
    };
  });

  const [achievements, setAchievements] = useState([
    {
      id: 'first-steps',
      title: 'First Steps',
      description: 'Complete your startup profile',
      icon: 'Star',
      points: 50,
      unlocked: false,
      category: 'onboarding'
    },
    {
      id: 'customer-focus',
      title: 'Customer Focus',
      description: 'Interview 25+ potential customers',
      icon: 'Users',
      points: 100,
      unlocked: false,
      category: 'validation'
    },
    {
      id: 'mvp-builder',
      title: 'MVP Builder',
      description: 'Launch your first MVP',
      icon: 'Rocket',
      points: 200,
      unlocked: false,
      category: 'development'
    },
    {
      id: 'revenue-generator',
      title: 'Revenue Generator',
      description: 'Generate your first $1K in revenue',
      icon: 'DollarSign',
      points: 300,
      unlocked: false,
      category: 'business'
    },
    {
      id: 'team-builder',
      title: 'Team Builder',
      description: 'Hire your first team member',
      icon: 'UserPlus',
      points: 150,
      unlocked: false,
      category: 'growth'
    },
    {
      id: 'fundraiser',
      title: 'Fundraiser',
      description: 'Raise your first round of funding',
      icon: 'TrendingUp',
      points: 500,
      unlocked: false,
      category: 'funding'
    },
    {
      id: 'market-leader',
      title: 'Market Leader',
      description: 'Achieve 10% market share in your segment',
      icon: 'Crown',
      points: 1000,
      unlocked: false,
      category: 'scale'
    },
    {
      id: 'consistency',
      title: 'Consistency',
      description: 'Complete 7 days of consecutive activity',
      icon: 'Calendar',
      points: 75,
      unlocked: false,
      category: 'habits'
    },
    {
      id: 'networker',
      title: 'Networker',
      description: 'Connect with 50+ industry professionals',
      icon: 'Network',
      points: 125,
      unlocked: false,
      category: 'networking'
    },
    {
      id: 'innovator',
      title: 'Innovator',
      description: 'File your first patent or trademark',
      icon: 'Lightbulb',
      points: 250,
      unlocked: false,
      category: 'innovation'
    }
  ]);

  const [milestones, setMilestones] = useState([
    {
      id: 'level-1',
      title: 'Founder',
      description: 'Complete basic startup setup',
      level: 1,
      requirements: ['Complete profile', 'Set OKRs'],
      rewards: ['Access to basic resources', 'Community access']
    },
    {
      id: 'level-2',
      title: 'Validator',
      description: 'Validate your idea with customers',
      level: 2,
      requirements: ['Interview 25 customers', 'Complete market research'],
      rewards: ['Advanced analytics', 'Expert consultations']
    },
    {
      id: 'level-3',
      title: 'Builder',
      description: 'Build and launch your MVP',
      level: 3,
      requirements: ['Launch MVP', 'Get 100 beta users'],
      rewards: ['Technical resources', 'Development tools']
    },
    {
      id: 'level-4',
      title: 'Trader',
      description: 'Generate your first revenue',
      level: 4,
      requirements: ['First paying customer', 'Revenue model validated'],
      rewards: ['Business tools', 'Financial planning']
    },
    {
      id: 'level-5',
      title: 'Scaler',
      description: 'Scale your business operations',
      level: 5,
      requirements: ['Team of 5+', 'Processes established'],
      rewards: ['HR tools', 'Operations management']
    },
    {
      id: 'level-6',
      title: 'Fundraiser',
      description: 'Raise significant funding',
      level: 6,
      requirements: ['Series A funding', 'Investor network'],
      rewards: ['Investor connections', 'Financial modeling']
    },
    {
      id: 'level-7',
      title: 'Leader',
      description: 'Become a market leader',
      level: 7,
      requirements: ['Market leadership', 'Industry recognition'],
      rewards: ['Industry partnerships', 'Thought leadership']
    },
    {
      id: 'level-8',
      title: 'Exiter',
      description: 'Prepare for exit opportunities',
      level: 8,
      requirements: ['Exit strategy', 'M&A readiness'],
      rewards: ['Exit planning', 'M&A advisors']
    }
  ]);

  const [rewards, setRewards] = useState([
    {
      id: 'expert-consultation',
      title: 'Expert Consultation',
      description: '30-minute session with industry expert',
      points: 200,
      category: 'consultation'
    },
    {
      id: 'resource-access',
      title: 'Premium Resources',
      description: 'Access to exclusive templates and tools',
      points: 150,
      category: 'resources'
    },
    {
      id: 'networking-event',
      title: 'Networking Event',
      description: 'Invitation to exclusive startup event',
      points: 300,
      category: 'networking'
    },
    {
      id: 'mentorship',
      title: 'Mentorship Session',
      description: '1-hour mentorship with successful founder',
      points: 500,
      category: 'mentorship'
    },
    {
      id: 'workshop',
      title: 'Workshop Access',
      description: 'Access to specialized startup workshop',
      points: 250,
      category: 'education'
    }
  ]);

  // Load progress from localStorage on mount
  useEffect(() => {
    const savedProgress = localStorage.getItem('startupos-gamification');
    if (savedProgress) {
      setUserProgress(JSON.parse(savedProgress));
    }
  }, []);

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('startupos-gamification', JSON.stringify(userProgress));
  }, [userProgress]);

  const addExperience = (amount) => {
    setUserProgress(prev => {
      const newExperience = prev.experience + amount;
      const newLevel = Math.floor(newExperience / 100) + 1;
      
      return {
        ...prev,
        experience: newExperience,
        level: newLevel,
        lastActivity: new Date().toISOString()
      };
    });
  };

  const addPoints = (amount) => {
    setUserProgress(prev => ({
      ...prev,
      points: prev.points + amount
    }));
  };

  const unlockAchievement = (achievementId) => {
    setAchievements(prev => 
      prev.map(achievement => 
        achievement.id === achievementId 
          ? { ...achievement, unlocked: true }
          : achievement
      )
    );

    setUserProgress(prev => ({
      ...prev,
      achievements: [...prev.achievements, achievementId]
    }));

    // Add points for achievement
    const achievement = achievements.find(a => a.id === achievementId);
    if (achievement) {
      addPoints(achievement.points);
      addExperience(achievement.points);
    }
  };

  const completeMilestone = (milestoneId) => {
    setUserProgress(prev => ({
      ...prev,
      milestones: [...prev.milestones, milestoneId]
    }));
  };

  const updateStreak = () => {
    const today = new Date().toDateString();
    const lastActivity = userProgress.lastActivity 
      ? new Date(userProgress.lastActivity).toDateString()
      : null;

    if (lastActivity === today) {
      return; // Already updated today
    }

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayString = yesterday.toDateString();

    setUserProgress(prev => ({
      ...prev,
      streak: lastActivity === yesterdayString ? prev.streak + 1 : 1,
      lastActivity: new Date().toISOString()
    }));
  };

  const getLevelProgress = () => {
    const experienceInLevel = userProgress.experience % 100;
    return (experienceInLevel / 100) * 100;
  };

  const getNextLevelExperience = () => {
    return 100 - (userProgress.experience % 100);
  };

  const getAvailableRewards = () => {
    return rewards.filter(reward => reward.points <= userProgress.points);
  };

  const redeemReward = (rewardId) => {
    const reward = rewards.find(r => r.id === rewardId);
    if (reward && userProgress.points >= reward.points) {
      setUserProgress(prev => ({
        ...prev,
        points: prev.points - reward.points
      }));
      return true;
    }
    return false;
  };

  const getLeaderboardData = () => {
    // This would typically come from your backend
    return [
      { name: 'Sarah Chen', company: 'TechFlow', level: 8, points: 2500 },
      { name: 'Alex Rodriguez', company: 'DataViz', level: 7, points: 2100 },
      { name: 'Emma Thompson', company: 'GreenTech', level: 6, points: 1800 },
      { name: 'Marcus Johnson', company: 'HealthAI', level: 6, points: 1750 },
      { name: 'Lisa Wang', company: 'EduTech', level: 5, points: 1400 }
    ];
  };

  const getWeeklyGoals = () => {
    return [
      { id: 'customer-interviews', title: 'Conduct 5 customer interviews', progress: 0, target: 5 },
      { id: 'mvp-features', title: 'Add 2 new MVP features', progress: 0, target: 2 },
      { id: 'network-connections', title: 'Connect with 10 new professionals', progress: 0, target: 10 },
      { id: 'revenue-goal', title: 'Generate $500 in revenue', progress: 0, target: 500 }
    ];
  };

  const updateWeeklyGoal = (goalId, progress) => {
    // Weekly goal progress updated
  };

  const value = {
    userProgress,
    achievements,
    milestones,
    rewards,
    addExperience,
    addPoints,
    unlockAchievement,
    completeMilestone,
    updateStreak,
    getLevelProgress,
    getNextLevelExperience,
    getAvailableRewards,
    redeemReward,
    getLeaderboardData,
    getWeeklyGoals,
    updateWeeklyGoal
  };

  return (
    <GamificationContext.Provider value={value}>
      {children}
    </GamificationContext.Provider>
  );
}; 