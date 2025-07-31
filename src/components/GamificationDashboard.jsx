import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGamification } from '../contexts/GamificationContext';
import { 
  Star, 
  Trophy, 
  TrendingUp, 
  Users, 
  BookOpen, 
  Lightbulb, 
  CheckCircle, 
  Clock, 
  Award,
  Zap,
  Heart,
  Shield,
  Rocket,
  Globe,
  DollarSign,
  Building,
  UserCheck,
  Calendar,
  Target,
  Crown,
  UserPlus,
  Network,
  Gift,
  Flame,
  Medal,
  ChevronRight,
  Play,
  Pause,
  RotateCcw
} from 'lucide-react';

const GamificationDashboard = () => {
  const {
    userProgress,
    achievements,
    milestones,
    rewards,
    getLevelProgress,
    getNextLevelExperience,
    getAvailableRewards,
    redeemReward,
    getLeaderboardData,
    getWeeklyGoals,
    updateWeeklyGoal,
    updateStreak
  } = useGamification();

  const [activeTab, setActiveTab] = useState('overview');
  const [showRewardModal, setShowRewardModal] = useState(false);
  const [selectedReward, setSelectedReward] = useState(null);
  const [weeklyGoals, setWeeklyGoals] = useState(getWeeklyGoals());

  useEffect(() => {
    updateStreak();
  }, []);

  const handleGoalUpdate = (goalId, newProgress) => {
    setWeeklyGoals(prev => 
      prev.map(goal => 
        goal.id === goalId 
          ? { ...goal, progress: Math.min(newProgress, goal.target) }
          : goal
      )
    );
    updateWeeklyGoal(goalId, newProgress);
  };

  const handleRedeemReward = (reward) => {
    setSelectedReward(reward);
    setShowRewardModal(true);
  };

  const confirmRedeemReward = () => {
    if (selectedReward) {
      // This would typically call the redeemReward function
      console.log(`Redeemed reward: ${selectedReward.title}`);
      setShowRewardModal(false);
      setSelectedReward(null);
    }
  };

  const getAchievementIcon = (iconName) => {
    const iconMap = {
      Star, Trophy, TrendingUp, Users, BookOpen, Lightbulb, 
      CheckCircle, Clock, Award, Zap, Heart, Shield, Rocket, 
      Globe, DollarSign, Building, UserCheck, Calendar, Target, 
      Crown, UserPlus, Network
    };
    return iconMap[iconName] || Star;
  };

  const unlockedAchievements = achievements.filter(a => a.unlocked);
  const lockedAchievements = achievements.filter(a => !a.unlocked);
  const availableRewards = getAvailableRewards();
  const leaderboardData = getLeaderboardData();

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Target },
    { id: 'achievements', label: 'Achievements', icon: Trophy },
    { id: 'rewards', label: 'Rewards', icon: Gift },
    { id: 'leaderboard', label: 'Leaderboard', icon: Crown },
    { id: 'goals', label: 'Weekly Goals', icon: Calendar }
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Level Progress */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-900">Level Progress</h3>
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-600">Level {userProgress.level}</div>
            <div className="text-sm text-gray-500">Founder</div>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span>Experience</span>
            <span>{userProgress.experience} / {userProgress.experience + getNextLevelExperience()}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <motion.div
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${getLevelProgress()}%` }}
              transition={{ duration: 1 }}
            />
          </div>
          <div className="text-sm text-gray-500">
            {getNextLevelExperience()} XP to next level
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <Trophy className="w-6 h-6 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{userProgress.points}</div>
          <div className="text-sm text-gray-500">Total Points</div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <Award className="w-6 h-6 text-green-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{unlockedAchievements.length}</div>
          <div className="text-sm text-gray-500">Achievements</div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <Flame className="w-6 h-6 text-purple-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{userProgress.streak}</div>
          <div className="text-sm text-gray-500">Day Streak</div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <Target className="w-6 h-6 text-orange-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{userProgress.milestones.length}</div>
          <div className="text-sm text-gray-500">Milestones</div>
        </div>
      </div>

      {/* Recent Achievements */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Recent Achievements</h3>
        <div className="space-y-3">
          {unlockedAchievements.slice(0, 3).map((achievement) => {
            const Icon = getAchievementIcon(achievement.icon);
            return (
              <div key={achievement.id} className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                <Icon className="w-5 h-5 text-green-600" />
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{achievement.title}</div>
                  <div className="text-sm text-gray-600">{achievement.description}</div>
                </div>
                <div className="text-sm font-medium text-green-600">+{achievement.points}</div>
              </div>
            );
          })}
          {unlockedAchievements.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Trophy className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>No achievements unlocked yet. Keep working towards your goals!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderAchievements = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">All Achievements</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map((achievement) => {
            const Icon = getAchievementIcon(achievement.icon);
            return (
              <motion.div
                key={achievement.id}
                className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                  achievement.unlocked
                    ? 'border-green-200 bg-green-50'
                    : 'border-gray-200 bg-gray-50'
                }`}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    achievement.unlocked ? 'bg-green-100' : 'bg-gray-100'
                  }`}>
                    <Icon className={`w-5 h-5 ${
                      achievement.unlocked ? 'text-green-600' : 'text-gray-400'
                    }`} />
                  </div>
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
                  <div className="text-right">
                    <div className={`text-sm font-medium ${
                      achievement.unlocked ? 'text-green-600' : 'text-gray-400'
                    }`}>
                      +{achievement.points}
                    </div>
                    {achievement.unlocked && (
                      <CheckCircle className="w-4 h-4 text-green-600 mt-1" />
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderRewards = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Available Rewards</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {availableRewards.map((reward) => (
            <motion.div
              key={reward.id}
              className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
              whileHover={{ scale: 1.02 }}
              onClick={() => handleRedeemReward(reward)}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Gift className="w-5 h-5 text-blue-600" />
                </div>
                <div className="text-sm font-medium text-blue-600">{reward.points} pts</div>
              </div>
              <div>
                <div className="font-medium text-gray-900 mb-1">{reward.title}</div>
                <div className="text-sm text-gray-600">{reward.description}</div>
              </div>
            </motion.div>
          ))}
        </div>
        {availableRewards.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Gift className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p>No rewards available. Earn more points to unlock rewards!</p>
          </div>
        )}
      </div>
    </div>
  );

  const renderLeaderboard = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Leaderboard</h3>
        <div className="space-y-3">
          {leaderboardData.map((user, index) => (
            <div key={user.name} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50">
              <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                {index + 1}
              </div>
              <div className="flex-1">
                <div className="font-medium text-gray-900">{user.name}</div>
                <div className="text-sm text-gray-500">{user.company}</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-gray-900">Level {user.level}</div>
                <div className="text-xs text-gray-500">{user.points} pts</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderWeeklyGoals = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Weekly Goals</h3>
        <div className="space-y-4">
          {weeklyGoals.map((goal) => (
            <div key={goal.id} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="font-medium text-gray-900">{goal.title}</div>
                <div className="text-sm text-gray-500">
                  {goal.progress} / {goal.target}
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(goal.progress / goal.target) * 100}%` }}
                />
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleGoalUpdate(goal.id, Math.max(0, goal.progress - 1))}
                  className="px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded hover:bg-gray-200"
                >
                  -
                </button>
                <button
                  onClick={() => handleGoalUpdate(goal.id, Math.min(goal.target, goal.progress + 1))}
                  className="px-3 py-1 text-sm bg-blue-100 text-blue-600 rounded hover:bg-blue-200"
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderCurrentTab = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview();
      case 'achievements':
        return renderAchievements();
      case 'rewards':
        return renderRewards();
      case 'leaderboard':
        return renderLeaderboard();
      case 'goals':
        return renderWeeklyGoals();
      default:
        return renderOverview();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Gamification Dashboard</h1>
              <p className="text-gray-600 mt-2">Track your progress and earn rewards</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">Level {userProgress.level}</div>
                <div className="text-sm text-gray-500">Current Level</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{userProgress.points}</div>
                <div className="text-sm text-gray-500">Total Points</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{userProgress.streak}</div>
                <div className="text-sm text-gray-500">Day Streak</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex space-x-1">
            {tabs.map((tab) => {
              const TabIcon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  <TabIcon size={18} />
                  <span className="font-medium">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderCurrentTab()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Reward Modal */}
      <AnimatePresence>
        {showRewardModal && selectedReward && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-xl p-6 max-w-md w-full mx-4"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Gift className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Redeem Reward
                </h3>
                <p className="text-gray-600 mb-4">
                  Are you sure you want to redeem "{selectedReward.title}" for {selectedReward.points} points?
                </p>
                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowRewardModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmRedeemReward}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Redeem
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GamificationDashboard; 