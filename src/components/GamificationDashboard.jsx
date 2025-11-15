import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trophy, Star, Target, TrendingUp, Users, Calendar, 
  Award, Gift, Zap, Crown, Medal, Flag, CheckCircle,
  Clock, DollarSign, Rocket, Lightbulb, Network,
  BarChart3, PieChart, Activity, ArrowUp, ArrowDown,
  Plus, Minus, RefreshCw, Share, Download, Settings,
  Bell, MessageCircle, Heart, ThumbsUp, Share2,
  ChevronRight, ChevronLeft, Play, Pause, Square,
  RotateCcw, Save, Edit, Trash2, Eye, EyeOff,
  Filter, Search, SortAsc, SortDesc, MoreVertical,
  X, Check, XCircle, AlertCircle, Info, HelpCircle
} from 'lucide-react';
import { useGamification } from '../contexts/GamificationContext';

const GamificationDashboard = () => {
  const {
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
  } = useGamification();

  const [activeTab, setActiveTab] = useState('overview');
  const [showAchievementModal, setShowAchievementModal] = useState(false);
  const [showRewardModal, setShowRewardModal] = useState(false);
  const [selectedAchievement, setSelectedAchievement] = useState(null);
  const [selectedReward, setSelectedReward] = useState(null);
  const [weeklyGoals, setWeeklyGoals] = useState(getWeeklyGoals());
  const [leaderboard, setLeaderboard] = useState(getLeaderboardData());
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'achievements', label: 'Achievements', icon: Trophy },
    { id: 'milestones', label: 'Milestones', icon: Flag },
    { id: 'rewards', label: 'Rewards', icon: Gift },
    { id: 'leaderboard', label: 'Leaderboard', icon: Crown },
    { id: 'goals', label: 'Weekly Goals', icon: Target }
  ];

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      // Check for new achievements
      checkForNewAchievements();
      // Update streak
      updateStreak();
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, []);

  const checkForNewAchievements = () => {
    // Simulate achievement checking based on user progress
    const newAchievements = achievements.filter(achievement => 
      !achievement.unlocked && checkAchievementRequirements(achievement)
    );

    newAchievements.forEach(achievement => {
      unlockAchievement(achievement.id);
      showNotification(`Achievement Unlocked: ${achievement.title}!`, 'success');
    });
  };

  const checkAchievementRequirements = (achievement) => {
    // This would check actual user progress against achievement requirements
    // For demo purposes, we'll use random chance
    return Math.random() < 0.1; // 10% chance per check
  };

  const showNotification = (message, type = 'info') => {
    const notification = {
      id: Date.now(),
      message,
      type,
      timestamp: new Date()
    };
    setNotifications(prev => [notification, ...prev.slice(0, 4)]);
    setShowNotifications(true);
    
    setTimeout(() => {
      setShowNotifications(false);
    }, 3000);
  };

  const handleAchievementClick = (achievement) => {
    setSelectedAchievement(achievement);
    setShowAchievementModal(true);
  };

  const handleRewardClick = (reward) => {
    setSelectedReward(reward);
    setShowRewardModal(true);
  };

  const handleRedeemReward = (rewardId) => {
    if (redeemReward(rewardId)) {
      showNotification('Reward redeemed successfully!', 'success');
      setShowRewardModal(false);
    } else {
      showNotification('Not enough points to redeem this reward', 'error');
    }
  };

  const handleGoalUpdate = (goalId, progress) => {
    setWeeklyGoals(prev => 
      prev.map(goal => 
        goal.id === goalId 
          ? { ...goal, progress: Math.min(progress, goal.target) }
          : goal
      )
    );
    updateWeeklyGoal(goalId, progress);
    
    // Add experience for goal progress
    addExperience(10);
    showNotification('Goal progress updated!', 'success');
  };

  const getAchievementIcon = (iconName) => {
    const icons = {
      Star, Users, Rocket, DollarSign, Crown, Calendar, Network, Lightbulb
    };
    return icons[iconName] || Star;
  };

  const getCategoryColor = (category) => {
    const colors = {
      onboarding: 'blue',
      validation: 'green',
      development: 'purple',
      business: 'orange',
      growth: 'indigo',
      funding: 'red',
      scale: 'yellow',
      habits: 'teal',
      networking: 'pink',
      innovation: 'cyan'
    };
    return colors[category] || 'gray';
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200 p-5 shadow-sm hover:shadow-md transition-all"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="p-2.5 bg-blue-600 rounded-lg shadow-sm">
              <Trophy className="w-5 h-5 text-white" />
            </div>
            <span className="text-xs font-semibold text-blue-700 bg-blue-200 px-2 py-1 rounded-full">
              Level {userProgress.level}
            </span>
          </div>
          <div>
            <p className="text-sm font-medium text-blue-700 mb-1">Current Level</p>
            <p className="text-3xl font-bold text-blue-900">{userProgress.level}</p>
          </div>
          <div className="mt-3">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-blue-700 font-medium">Level {userProgress.level + 1}</span>
              <span className="font-bold text-blue-900">{Math.round(getLevelProgress())}%</span>
            </div>
            <div className="w-full bg-blue-200 rounded-full h-2 overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${getLevelProgress()}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="bg-gradient-to-r from-blue-600 to-blue-500 h-2 rounded-full shadow-sm"
              ></motion.div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl border border-amber-200 p-5 shadow-sm hover:shadow-md transition-all"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="p-2.5 bg-amber-500 rounded-lg shadow-sm">
              <Star className="w-5 h-5 text-white" />
            </div>
            <TrendingUp className="w-4 h-4 text-amber-700" />
          </div>
          <div>
            <p className="text-sm font-medium text-amber-700 mb-1">Total Points</p>
            <p className="text-3xl font-bold text-amber-900">{userProgress.points.toLocaleString()}</p>
          </div>
          <div className="mt-3">
            <p className="text-xs text-amber-700 font-medium">
              {getNextLevelExperience()} to next level
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200 p-5 shadow-sm hover:shadow-md transition-all"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="p-2.5 bg-green-600 rounded-lg shadow-sm">
              <Award className="w-5 h-5 text-white" />
            </div>
            <CheckCircle className="w-4 h-4 text-green-700" />
          </div>
          <div>
            <p className="text-sm font-medium text-green-700 mb-1">Achievements</p>
            <p className="text-3xl font-bold text-green-900">
              {achievements.filter(a => a.unlocked).length}<span className="text-lg text-green-700">/{achievements.length}</span>
            </p>
          </div>
          <div className="mt-3">
            <div className="flex items-center space-x-2">
              <div className="flex-1 bg-green-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-green-600 to-green-500 h-2 rounded-full"
                  style={{ width: `${(achievements.filter(a => a.unlocked).length / achievements.length) * 100}%` }}
                ></div>
              </div>
              <span className="text-xs font-bold text-green-900">
                {Math.round((achievements.filter(a => a.unlocked).length / achievements.length) * 100)}%
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl border border-orange-200 p-5 shadow-sm hover:shadow-md transition-all relative overflow-hidden"
        >
          {userProgress.streak >= 7 && (
            <div className="absolute top-0 right-0 w-20 h-20 bg-orange-300/30 rounded-full blur-2xl"></div>
          )}
          <div className="flex items-center justify-between mb-3 relative z-10">
            <div className="p-2.5 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg shadow-sm">
              <Zap className="w-5 h-5 text-white" />
            </div>
            {userProgress.streak >= 7 && (
              <span className="text-xs font-bold text-orange-700 bg-orange-200 px-2 py-1 rounded-full animate-pulse">
                🔥 On Fire!
              </span>
            )}
          </div>
          <div className="relative z-10">
            <p className="text-sm font-medium text-orange-700 mb-1">Streak</p>
            <p className="text-3xl font-bold text-orange-900">{userProgress.streak} <span className="text-lg">days</span></p>
          </div>
          <div className="mt-3 relative z-10">
            <p className="text-xs text-orange-700 font-medium">
              {userProgress.streak < 7 ? `${7 - userProgress.streak} days to 🔥` : 'Keep it going!'}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900">Recent Activity</h3>
          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">View All</button>
        </div>
        <div className="space-y-3">
          {[
            { action: 'Completed customer interview', points: 25, time: '2 hours ago', color: 'blue', icon: CheckCircle },
            { action: 'Updated MVP features', points: 50, time: '1 day ago', color: 'green', icon: Rocket },
            { action: 'Connected with 3 professionals', points: 15, time: '2 days ago', color: 'purple', icon: Users },
            { action: 'Achieved weekly goal', points: 100, time: '3 days ago', color: 'amber', icon: Target }
          ].map((activity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`flex items-center justify-between p-3.5 bg-gradient-to-r from-${activity.color}-50 to-transparent rounded-lg border border-${activity.color}-100 hover:shadow-sm transition-all`}
            >
              <div className="flex items-center space-x-3">
                <div className={`p-2 bg-${activity.color}-600 rounded-lg shadow-sm`}>
                  <activity.icon className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{activity.action}</p>
                  <p className="text-xs text-gray-600">{activity.time}</p>
                </div>
              </div>
              <div className={`flex items-center space-x-1.5 bg-${activity.color}-100 px-2.5 py-1 rounded-full`}>
                <Star className={`w-3.5 h-3.5 text-${activity.color}-600`} />
                <span className={`font-bold text-sm text-${activity.color}-700`}>+{activity.points}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions <span className="text-sm font-normal text-gray-500">- Earn points instantly</span></h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: 'Add Team Member', icon: Users, action: () => addExperience(25), points: 25, color: 'blue' },
            { label: 'Complete Project', icon: Target, action: () => addExperience(50), points: 50, color: 'green' },
            { label: 'Update OKRs', icon: BarChart3, action: () => addExperience(30), points: 30, color: 'purple' },
            { label: 'Network Connect', icon: Network, action: () => addExperience(15), points: 15, color: 'orange' }
          ].map((action, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={action.action}
              className={`relative flex flex-col items-center space-y-2 p-4 bg-gradient-to-br from-${action.color}-50 to-${action.color}-100 rounded-xl border border-${action.color}-200 hover:shadow-md transition-all group`}
            >
              <div className={`p-2 bg-${action.color}-600 rounded-lg shadow-sm group-hover:scale-110 transition-transform`}>
                <action.icon className="w-5 h-5 text-white" />
              </div>
              <span className="text-sm font-semibold text-gray-900 text-center leading-tight">{action.label}</span>
              <span className={`text-xs font-bold text-${action.color}-700 bg-${action.color}-200 px-2 py-0.5 rounded-full`}>
                +{action.points} pts
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAchievements = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Achievements</h2>
          <p className="text-sm text-gray-600 mt-1">Unlock badges and earn rewards</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-blue-600">
            {achievements.filter(a => a.unlocked).length}<span className="text-lg text-gray-400">/{achievements.length}</span>
          </div>
          <div className="text-xs text-gray-600 font-medium">
            {Math.round((achievements.filter(a => a.unlocked).length / achievements.length) * 100)}% Complete
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {achievements.map((achievement) => {
          const Icon = getAchievementIcon(achievement.icon);
          const isUnlocked = achievement.unlocked;
          
          return (
            <motion.div
              key={achievement.id}
              whileHover={{ y: -3, scale: 1.01 }}
              className={`relative rounded-xl border-2 p-5 cursor-pointer transition-all duration-300 shadow-sm hover:shadow-md ${
                isUnlocked
                  ? 'border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100'
                  : 'border-gray-200 bg-white hover:border-gray-300 opacity-75'
              }`}
              onClick={() => handleAchievementClick(achievement)}
            >
              {isUnlocked && (
                <div className="absolute -top-2 -right-2 p-1 bg-green-500 rounded-full shadow-lg">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
              )}
              
              <div className="flex items-start space-x-3">
                <div className={`p-2.5 rounded-lg shadow-sm ${
                  isUnlocked ? 'bg-blue-600' : 'bg-gray-200'
                }`}>
                  <Icon className={`w-6 h-6 ${
                    isUnlocked ? 'text-white' : 'text-gray-400'
                  }`} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className={`text-base font-bold ${
                    isUnlocked ? 'text-gray-900' : 'text-gray-500'
                  }`}>
                    {achievement.title}
                  </h3>
                  <p className={`text-xs mt-1 leading-tight ${
                    isUnlocked ? 'text-gray-700' : 'text-gray-500'
                  }`}>
                    {achievement.description}
                  </p>
                  
                  <div className="flex items-center justify-between mt-3">
                    <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                      isUnlocked 
                        ? 'bg-blue-200 text-blue-700' 
                        : 'bg-gray-200 text-gray-600'
                    }`}>
                      {achievement.category}
                    </span>
                    
                    <div className={`flex items-center space-x-1 px-2 py-0.5 rounded-full ${
                      isUnlocked ? 'bg-amber-100' : 'bg-gray-100'
                    }`}>
                      <Star className={`w-3.5 h-3.5 ${isUnlocked ? 'text-amber-500' : 'text-gray-400'}`} />
                      <span className={`font-bold text-xs ${isUnlocked ? 'text-amber-700' : 'text-gray-600'}`}>
                        {achievement.points}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );

  const renderMilestones = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Milestones</h2>
        <p className="text-sm text-gray-600 mt-1">Track your journey from idea to scale</p>
      </div>
      
      <div className="space-y-4">
        {milestones.map((milestone, index) => {
          const isCompleted = userProgress.milestones.includes(milestone.id);
          const isCurrent = index === userProgress.level - 1;
          
          return (
            <motion.div
              key={milestone.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative rounded-xl border-2 p-5 shadow-sm ${
                isCompleted
                  ? 'border-green-200 bg-gradient-to-br from-green-50 to-green-100'
                  : isCurrent
                  ? 'border-blue-300 bg-gradient-to-br from-blue-50 to-blue-100 shadow-md'
                  : 'border-gray-200 bg-white'
              }`}
            >
              <div className="flex items-start space-x-4">
                <div className={`p-2.5 rounded-lg shadow-sm ${
                  isCompleted
                    ? 'bg-green-600'
                    : isCurrent
                    ? 'bg-blue-600'
                    : 'bg-gray-200'
                }`}>
                  {isCompleted ? (
                    <CheckCircle className="w-6 h-6 text-white" />
                  ) : isCurrent ? (
                    <Flag className="w-6 h-6 text-white animate-pulse" />
                  ) : (
                    <Flag className="w-6 h-6 text-gray-400" />
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className={`text-lg font-bold ${
                      isCompleted ? 'text-green-900' : isCurrent ? 'text-blue-900' : 'text-gray-700'
                    }`}>
                      Level {milestone.level}: {milestone.title}
                    </h3>
                    {isCurrent && (
                      <span className="px-2 py-0.5 bg-blue-600 text-white text-xs font-bold rounded-full animate-pulse">
                        Active
                      </span>
                    )}
                    {isCompleted && (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    )}
                  </div>
                  
                  <p className={`text-sm mb-4 ${
                    isCompleted ? 'text-green-700' : isCurrent ? 'text-blue-800' : 'text-gray-600'
                  }`}>
                    {milestone.description}
                  </p>
                  
                  <div className="space-y-2">
                    <p className="text-xs font-bold text-gray-900 uppercase tracking-wide">Requirements:</p>
                    <ul className="space-y-1.5">
                      {milestone.requirements.map((req, reqIndex) => (
                        <li key={reqIndex} className="flex items-center space-x-2 text-sm">
                          <div className={`w-1.5 h-1.5 rounded-full ${
                            isCompleted ? 'bg-green-500' : isCurrent ? 'bg-blue-500' : 'bg-gray-300'
                          }`} />
                          <span className={isCompleted ? 'text-green-700 line-through' : isCurrent ? 'text-gray-900 font-medium' : 'text-gray-600'}>
                            {req}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mt-4">
                    <p className="text-xs font-bold text-gray-900 uppercase tracking-wide mb-2">Rewards:</p>
                    <div className="flex flex-wrap gap-2">
                      {milestone.rewards.map((reward, rewardIndex) => (
                        <span
                          key={rewardIndex}
                          className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                            isCompleted ? 'bg-green-200 text-green-800' : isCurrent ? 'bg-blue-200 text-blue-800' : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {reward}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );

  const renderRewards = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Rewards Shop</h2>
          <p className="text-sm text-gray-600 mt-1">Redeem your points for exclusive perks</p>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-600">Your Balance</div>
          <div className="flex items-center space-x-1.5">
            <Star className="w-5 h-5 text-amber-500" />
            <span className="text-2xl font-bold text-gray-900">{userProgress.points.toLocaleString()}</span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {rewards.map((reward) => {
          const canAfford = userProgress.points >= reward.points;
          
          return (
            <motion.div
              key={reward.id}
              whileHover={{ y: -3, scale: 1.01 }}
              className={`relative rounded-xl border-2 p-5 cursor-pointer transition-all duration-300 shadow-sm hover:shadow-md ${
                canAfford
                  ? 'border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100'
                  : 'border-gray-200 bg-white opacity-75'
              }`}
              onClick={() => handleRewardClick(reward)}
            >
              {canAfford && (
                <div className="absolute -top-2 -right-2 px-2 py-0.5 bg-green-500 text-white text-xs font-bold rounded-full shadow-lg">
                  Available
                </div>
              )}
              
              <div className="flex items-start space-x-3">
                <div className={`p-2.5 rounded-lg shadow-sm ${
                  canAfford ? 'bg-purple-600' : 'bg-gray-200'
                }`}>
                  <Gift className={`w-6 h-6 ${
                    canAfford ? 'text-white' : 'text-gray-400'
                  }`} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className={`text-base font-bold ${
                    canAfford ? 'text-gray-900' : 'text-gray-500'
                  }`}>
                    {reward.title}
                  </h3>
                  <p className={`text-xs mt-1 leading-tight ${
                    canAfford ? 'text-gray-700' : 'text-gray-500'
                  }`}>
                    {reward.description}
                  </p>
                  
                  <div className="flex items-center justify-between mt-3">
                    <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                      canAfford
                        ? 'bg-purple-200 text-purple-700'
                        : 'bg-gray-200 text-gray-600'
                    }`}>
                      {reward.category}
                    </span>
                    
                    <div className={`flex items-center space-x-1 px-2 py-0.5 rounded-full ${
                      canAfford ? 'bg-amber-100' : 'bg-gray-100'
                    }`}>
                      <Star className={`w-3.5 h-3.5 ${canAfford ? 'text-amber-500' : 'text-gray-400'}`} />
                      <span className={`font-bold text-xs ${canAfford ? 'text-amber-700' : 'text-gray-600'}`}>
                        {reward.points}
                      </span>
                    </div>
                  </div>
                  
                  {!canAfford && (
                    <div className="mt-2 text-xs font-medium text-red-600">
                      Need {(reward.points - userProgress.points).toLocaleString()} more points
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );

  const renderLeaderboard = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Leaderboard</h2>
          <p className="text-sm text-gray-600 mt-1">See how you stack up against other founders</p>
        </div>
        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">This Month</button>
      </div>
      
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        <div className="p-5 bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-gray-900">Top Performers</h3>
            <RefreshCw className="w-4 h-4 text-gray-500 hover:rotate-180 transition-transform duration-500 cursor-pointer" />
          </div>
        </div>
        
        <div className="divide-y divide-gray-100">
          {leaderboard.map((user, index) => (
            <motion.div
              key={user.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 hover:bg-gray-50 transition-colors ${
                index < 3 ? 'bg-gradient-to-r from-transparent to-blue-50/30' : ''
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  {index < 3 ? (
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-sm ${
                      index === 0 ? 'bg-gradient-to-br from-amber-400 to-amber-500' :
                      index === 1 ? 'bg-gradient-to-br from-gray-300 to-gray-400' :
                      'bg-gradient-to-br from-orange-400 to-orange-500'
                    }`}>
                      {index === 0 ? <Crown className="w-5 h-5 text-white" /> :
                       <Medal className="w-5 h-5 text-white" />}
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                      <span className="text-sm font-bold text-gray-600">#{index + 1}</span>
                    </div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <h4 className="text-base font-bold text-gray-900">{user.name}</h4>
                  <p className="text-xs text-gray-600">{user.company}</p>
                </div>
                
                <div className="text-right">
                  <div className="flex items-center space-x-1.5 mb-1">
                    <Trophy className="w-4 h-4 text-blue-600" />
                    <span className="text-base font-bold text-gray-900">Lvl {user.level}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-3 h-3 text-amber-500" />
                    <span className="text-xs font-medium text-gray-600">{user.points.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Your Ranking */}
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border-2 border-blue-200 p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-blue-700 mb-1">Your Ranking</p>
            <p className="text-3xl font-bold text-blue-900">#4</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-blue-700 mb-1">Next rank in</p>
            <p className="text-lg font-bold text-blue-900">350 pts</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderWeeklyGoals = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Weekly Goals</h2>
        <p className="text-sm text-gray-600 mt-1">Complete these goals to earn bonus points</p>
      </div>
      
      <div className="space-y-4">
        {weeklyGoals.map((goal, index) => {
          const progress = (goal.progress / goal.target) * 100;
          const isCompleted = goal.progress >= goal.target;
          
          return (
            <motion.div
              key={goal.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-white rounded-xl border-2 p-5 shadow-sm ${
                isCompleted ? 'border-green-200 bg-gradient-to-br from-green-50 to-green-100' : 'border-gray-200'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${
                    isCompleted ? 'bg-green-600' : 'bg-blue-600'
                  }`}>
                    {isCompleted ? (
                      <CheckCircle className="w-5 h-5 text-white" />
                    ) : (
                      <Target className="w-5 h-5 text-white" />
                    )}
                  </div>
                  <h3 className="text-base font-bold text-gray-900">{goal.title}</h3>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-bold text-gray-900">
                    {goal.progress}<span className="text-gray-500">/{goal.target}</span>
                  </span>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-gray-600 font-medium">Progress</span>
                  <span className={`font-bold ${isCompleted ? 'text-green-700' : 'text-blue-700'}`}>
                    {Math.round(progress)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(progress, 100)}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className={`h-2.5 rounded-full ${
                      isCompleted 
                        ? 'bg-gradient-to-r from-green-600 to-green-500' 
                        : 'bg-gradient-to-r from-blue-600 to-blue-500'
                    }`}
                  ></motion.div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleGoalUpdate(goal.id, goal.progress + 1)}
                  disabled={goal.progress >= goal.target}
                  className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
                >
                  +1
                </button>
                <button
                  onClick={() => handleGoalUpdate(goal.id, Math.max(0, goal.progress - 1))}
                  disabled={goal.progress <= 0}
                  className="px-4 py-2 bg-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  -1
                </button>
                <button
                  onClick={() => handleGoalUpdate(goal.id, goal.target)}
                  disabled={goal.progress >= goal.target}
                  className="flex-1 px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
                >
                  Mark Complete
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview': return renderOverview();
      case 'achievements': return renderAchievements();
      case 'milestones': return renderMilestones();
      case 'rewards': return renderRewards();
      case 'leaderboard': return renderLeaderboard();
      case 'goals': return renderWeeklyGoals();
      default: return renderOverview();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30">
      <div className="max-w-7xl mx-auto">
        {/* Combined Header with Tabs */}
        <div className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40">
          <div className="flex items-center justify-between px-6 py-3">
            {/* Tabs on left */}
            <div className="flex space-x-1 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg transition-all duration-200 whitespace-nowrap ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <Icon size={18} />
                  <span className="font-semibold text-sm">{tab.label}</span>
                </button>
              );
            })}
            </div>
            {/* Icons on right */}
            <div className="flex items-center space-x-2 ml-4">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2.5 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Bell size={20} />
                {notifications.length > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                    {notifications.length}
                  </span>
                )}
              </button>
              <button className="p-2.5 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
                <Settings size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {renderTabContent()}
        </div>

        {/* Achievement Modal */}
        <AnimatePresence>
          {showAchievementModal && selectedAchievement && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
              onClick={() => setShowAchievementModal(false)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="bg-white rounded-2xl max-w-md w-full p-8 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="text-center">
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg"
                  >
                    <Trophy className="w-10 h-10 text-white" />
                  </motion.div>
                  <motion.h2 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-2xl font-bold text-gray-900 mb-2"
                  >
                    {selectedAchievement.title}
                  </motion.h2>
                  <p className="text-gray-600 mb-6">
                    {selectedAchievement.description}
                  </p>
                  <div className="flex items-center justify-center space-x-2 mb-6 bg-amber-50 py-3 px-4 rounded-lg">
                    <Star className="w-6 h-6 text-amber-500" />
                    <span className="text-xl font-bold text-amber-700">
                      +{selectedAchievement.points} points
                    </span>
                  </div>
                  <button
                    onClick={() => setShowAchievementModal(false)}
                    className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
                  >
                    Awesome!
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Reward Modal */}
        <AnimatePresence>
          {showRewardModal && selectedReward && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
              onClick={() => setShowRewardModal(false)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="bg-white rounded-2xl max-w-md w-full p-8 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Gift className="w-10 h-10 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {selectedReward.title}
                  </h2>
                  <p className="text-gray-600 mb-4">
                    {selectedReward.description}
                  </p>
                  <div className="flex items-center justify-center space-x-2 mb-6 bg-amber-50 py-3 px-4 rounded-lg">
                    <Star className="w-6 h-6 text-amber-500" />
                    <span className="text-xl font-bold text-amber-700">
                      {selectedReward.points} points
                    </span>
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => setShowRewardModal(false)}
                      className="flex-1 px-4 py-3 text-gray-700 bg-gray-100 font-semibold rounded-xl hover:bg-gray-200 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleRedeemReward(selectedReward.id)}
                      disabled={userProgress.points < selectedReward.points}
                      className="flex-1 px-4 py-3 bg-purple-600 text-white font-semibold rounded-xl hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-md"
                    >
                      Redeem
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Notifications */}
        <AnimatePresence>
          {showNotifications && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="fixed top-20 right-4 z-50 space-y-2 max-w-sm"
            >
              {notifications.map((notification) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  className={`p-4 rounded-xl shadow-lg backdrop-blur-sm ${
                    notification.type === 'success' ? 'bg-green-500 text-white' :
                    notification.type === 'error' ? 'bg-red-500 text-white' :
                    'bg-blue-500 text-white'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    {notification.type === 'success' ? (
                      <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    ) : notification.type === 'error' ? (
                      <XCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    ) : (
                      <Info className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <span className="font-semibold text-sm">{notification.message}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default GamificationDashboard;