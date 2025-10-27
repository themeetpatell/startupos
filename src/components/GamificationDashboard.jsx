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
    { id: 'overview', label: 'Overview', icon: BarChart3, color: 'blue' },
    { id: 'achievements', label: 'Achievements', icon: Trophy, color: 'yellow' },
    { id: 'milestones', label: 'Milestones', icon: Flag, color: 'green' },
    { id: 'rewards', label: 'Rewards', icon: Gift, color: 'purple' },
    { id: 'leaderboard', label: 'Leaderboard', icon: Crown, color: 'orange' },
    { id: 'goals', label: 'Weekly Goals', icon: Target, color: 'indigo' }
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Current Level</p>
              <p className="text-3xl font-bold text-gray-900">{userProgress.level}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-xl">
              <Trophy className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-gray-600">Progress to Level {userProgress.level + 1}</span>
              <span className="font-medium">{Math.round(getLevelProgress())}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${getLevelProgress()}%` }}
              ></div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Points</p>
              <p className="text-3xl font-bold text-gray-900">{userProgress.points}</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-xl">
              <Star className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-600">
              {getNextLevelExperience()} points to next level
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Achievements</p>
              <p className="text-3xl font-bold text-gray-900">
                {achievements.filter(a => a.unlocked).length}/{achievements.length}
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-xl">
              <Award className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-600">
              {Math.round((achievements.filter(a => a.unlocked).length / achievements.length) * 100)}% complete
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Streak</p>
              <p className="text-3xl font-bold text-gray-900">{userProgress.streak}</p>
            </div>
            <div className="p-3 bg-orange-100 rounded-xl">
              <Zap className="w-6 h-6 text-orange-600" />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-600">Days in a row</p>
          </div>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {[
            { action: 'Completed customer interview', points: 25, time: '2 hours ago' },
            { action: 'Updated MVP features', points: 50, time: '1 day ago' },
            { action: 'Connected with 3 professionals', points: 15, time: '2 days ago' },
            { action: 'Achieved weekly goal', points: 100, time: '3 days ago' }
          ].map((activity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-600">{activity.time}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4 text-yellow-500" />
                <span className="font-medium text-gray-900">+{activity.points}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Add Team Member', icon: Users, action: () => addExperience(25) },
            { label: 'Complete Project', icon: Target, action: () => addExperience(50) },
            { label: 'Update OKRs', icon: BarChart3, action: () => addExperience(30) },
            { label: 'Network Connect', icon: Network, action: () => addExperience(15) }
          ].map((action, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={action.action}
              className="flex flex-col items-center space-y-2 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <action.icon className="w-6 h-6 text-gray-600" />
              <span className="text-sm font-medium text-gray-900">{action.label}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAchievements = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Achievements</h2>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">
            {achievements.filter(a => a.unlocked).length} of {achievements.length} unlocked
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {achievements.map((achievement) => {
          const Icon = getAchievementIcon(achievement.icon);
          const isUnlocked = achievement.unlocked;
          const categoryColor = getCategoryColor(achievement.category);
          
          return (
            <motion.div
              key={achievement.id}
              whileHover={{ y: -5 }}
              className={`relative rounded-2xl border-2 p-6 cursor-pointer transition-all duration-300 ${
                isUnlocked
                  ? 'border-green-500 bg-green-50 shadow-lg'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
              onClick={() => handleAchievementClick(achievement)}
            >
              {isUnlocked && (
                <div className="absolute -top-2 -right-2 p-1 bg-green-500 rounded-full">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
              )}
              
              <div className="flex items-start space-x-4">
                <div className={`p-3 rounded-xl ${
                  isUnlocked ? 'bg-green-100' : 'bg-gray-100'
                }`}>
                  <Icon className={`w-6 h-6 ${
                    isUnlocked ? 'text-green-600' : 'text-gray-400'
                  }`} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className={`text-lg font-bold ${
                    isUnlocked ? 'text-green-900' : 'text-gray-900'
                  }`}>
                    {achievement.title}
                  </h3>
                  <p className={`text-sm mt-1 ${
                    isUnlocked ? 'text-green-700' : 'text-gray-600'
                  }`}>
                    {achievement.description}
                  </p>
                  
                  <div className="flex items-center justify-between mt-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      isUnlocked 
                        ? 'bg-green-200 text-green-800' 
                        : 'bg-gray-200 text-gray-600'
                    }`}>
                      {achievement.category}
                    </span>
                    
                    <div className="flex items-center space-x-2">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="font-medium text-gray-900">{achievement.points}</span>
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
      <h2 className="text-2xl font-bold text-gray-900">Milestones</h2>
      
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
              className={`relative rounded-2xl border-2 p-6 ${
                isCompleted
                  ? 'border-green-500 bg-green-50'
                  : isCurrent
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 bg-white'
              }`}
            >
              <div className="flex items-start space-x-4">
                <div className={`p-3 rounded-xl ${
                  isCompleted
                    ? 'bg-green-100'
                    : isCurrent
                    ? 'bg-blue-100'
                    : 'bg-gray-100'
                }`}>
                  {isCompleted ? (
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  ) : isCurrent ? (
                    <Flag className="w-6 h-6 text-blue-600" />
                  ) : (
                    <Flag className="w-6 h-6 text-gray-400" />
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className={`text-lg font-bold ${
                      isCompleted ? 'text-green-900' : 'text-gray-900'
                    }`}>
                      Level {milestone.level}: {milestone.title}
                    </h3>
                    {isCurrent && (
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        Current
                      </span>
                    )}
                  </div>
                  
                  <p className={`text-sm mb-4 ${
                    isCompleted ? 'text-green-700' : 'text-gray-600'
                  }`}>
                    {milestone.description}
                  </p>
                  
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-700">Requirements:</p>
                    <ul className="space-y-1">
                      {milestone.requirements.map((req, reqIndex) => (
                        <li key={reqIndex} className="flex items-center space-x-2 text-sm text-gray-600">
                          <div className={`w-2 h-2 rounded-full ${
                            isCompleted ? 'bg-green-500' : 'bg-gray-300'
                          }`} />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mt-4">
                    <p className="text-sm font-medium text-gray-700">Rewards:</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {milestone.rewards.map((reward, rewardIndex) => (
                        <span
                          key={rewardIndex}
                          className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
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
      <h2 className="text-2xl font-bold text-gray-900">Rewards Shop</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rewards.map((reward) => {
          const canAfford = userProgress.points >= reward.points;
          
          return (
            <motion.div
              key={reward.id}
              whileHover={{ y: -5 }}
              className={`rounded-2xl border-2 p-6 cursor-pointer transition-all duration-300 ${
                canAfford
                  ? 'border-purple-500 bg-purple-50 hover:shadow-lg'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
              onClick={() => handleRewardClick(reward)}
            >
              <div className="flex items-start space-x-4">
                <div className={`p-3 rounded-xl ${
                  canAfford ? 'bg-purple-100' : 'bg-gray-100'
                }`}>
                  <Gift className={`w-6 h-6 ${
                    canAfford ? 'text-purple-600' : 'text-gray-400'
                  }`} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className={`text-lg font-bold ${
                    canAfford ? 'text-purple-900' : 'text-gray-900'
                  }`}>
                    {reward.title}
                  </h3>
                  <p className={`text-sm mt-1 ${
                    canAfford ? 'text-purple-700' : 'text-gray-600'
                  }`}>
                    {reward.description}
                  </p>
                  
                  <div className="flex items-center justify-between mt-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      canAfford
                        ? 'bg-purple-200 text-purple-800'
                        : 'bg-gray-200 text-gray-600'
                    }`}>
                      {reward.category}
                    </span>
                    
                    <div className="flex items-center space-x-2">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className={`font-medium ${
                        canAfford ? 'text-purple-900' : 'text-gray-900'
                      }`}>
                        {reward.points}
                      </span>
                    </div>
                  </div>
                  
                  {!canAfford && (
                    <div className="mt-2 text-sm text-gray-500">
                      Need {reward.points - userProgress.points} more points
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
      <h2 className="text-2xl font-bold text-gray-900">Leaderboard</h2>
      
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-900">Top Performers</h3>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">This Month</span>
              <RefreshCw className="w-4 h-4 text-gray-400" />
            </div>
          </div>
        </div>
        
        <div className="divide-y divide-gray-200">
          {leaderboard.map((user, index) => (
            <motion.div
              key={user.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-6 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  {index < 3 ? (
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      index === 0 ? 'bg-yellow-100' :
                      index === 1 ? 'bg-gray-100' :
                      'bg-orange-100'
                    }`}>
                      {index === 0 ? <Crown className="w-5 h-5 text-yellow-600" /> :
                       index === 1 ? <Medal className="w-5 h-5 text-gray-600" /> :
                       <Medal className="w-5 h-5 text-orange-600" />}
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                      <span className="text-sm font-bold text-gray-600">#{index + 1}</span>
                    </div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <h4 className="text-lg font-bold text-gray-900">{user.name}</h4>
                  <p className="text-sm text-gray-600">{user.company}</p>
                </div>
                
                <div className="text-right">
                  <div className="text-lg font-bold text-gray-900">Level {user.level}</div>
                  <div className="text-sm text-gray-600">{user.points} points</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderWeeklyGoals = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Weekly Goals</h2>
      
      <div className="space-y-4">
        {weeklyGoals.map((goal, index) => {
          const progress = (goal.progress / goal.target) * 100;
          
          return (
            <motion.div
              key={goal.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl border border-gray-200 p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">{goal.title}</h3>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">
                    {goal.progress}/{goal.target}
                  </span>
                  <span className="text-sm font-medium text-gray-900">
                    {Math.round(progress)}%
                  </span>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-indigo-600 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleGoalUpdate(goal.id, goal.progress + 1)}
                  disabled={goal.progress >= goal.target}
                  className="px-3 py-1 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  +1
                </button>
                <button
                  onClick={() => handleGoalUpdate(goal.id, Math.max(0, goal.progress - 1))}
                  disabled={goal.progress <= 0}
                  className="px-3 py-1 bg-gray-600 text-white text-sm rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  -1
                </button>
                <button
                  onClick={() => handleGoalUpdate(goal.id, goal.target)}
                  disabled={goal.progress >= goal.target}
                  className="px-3 py-1 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Complete
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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Combined Header with Tabs */}
        <div className="bg-white border-b border-gray-200 px-4 py-2">
          <div className="flex items-center justify-between">
            {/* Tabs on left */}
            <div className="flex space-x-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-t-lg transition-all duration-300 ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-lg'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{tab.label}</span>
                </button>
              );
            })}
            </div>
            {/* Icons on right */}
            <div className="flex items-center space-x-2 ml-4">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
              >
                <Bell size={20} />
                {notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {notifications.length}
                  </span>
                )}
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
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
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
              onClick={() => setShowAchievementModal(false)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-2xl max-w-md w-full p-6"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Trophy className="w-8 h-8 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {selectedAchievement.title}
                  </h2>
                  <p className="text-gray-600 mb-4">
                    {selectedAchievement.description}
                  </p>
                  <div className="flex items-center justify-center space-x-2 mb-6">
                    <Star className="w-5 h-5 text-yellow-500" />
                    <span className="text-lg font-bold text-gray-900">
                      +{selectedAchievement.points} points
                    </span>
                  </div>
                  <button
                    onClick={() => setShowAchievementModal(false)}
                    className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
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
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
              onClick={() => setShowRewardModal(false)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-2xl max-w-md w-full p-6"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Gift className="w-8 h-8 text-purple-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {selectedReward.title}
                  </h2>
                  <p className="text-gray-600 mb-4">
                    {selectedReward.description}
                  </p>
                  <div className="flex items-center justify-center space-x-2 mb-6">
                    <Star className="w-5 h-5 text-yellow-500" />
                    <span className="text-lg font-bold text-gray-900">
                      {selectedReward.points} points
                    </span>
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => setShowRewardModal(false)}
                      className="flex-1 px-4 py-3 text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleRedeemReward(selectedReward.id)}
                      disabled={userProgress.points < selectedReward.points}
                      className="flex-1 px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
              className="fixed top-4 right-4 z-50 space-y-2"
            >
              {notifications.map((notification) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className={`p-4 rounded-lg shadow-lg max-w-sm ${
                    notification.type === 'success' ? 'bg-green-100 text-green-800' :
                    notification.type === 'error' ? 'bg-red-100 text-red-800' :
                    'bg-blue-100 text-blue-800'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    {notification.type === 'success' ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : notification.type === 'error' ? (
                      <XCircle className="w-5 h-5" />
                    ) : (
                      <Info className="w-5 h-5" />
                    )}
                    <span className="font-medium">{notification.message}</span>
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