import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Star, Gift, Zap, Crown, Coins, Award, 
  ArrowLeft, CheckCircle, Clock, Users,
  TrendingUp, Shield, Lightbulb, Target
} from 'lucide-react';

const CreditStore = () => {
  const [credits, setCredits] = useState([]);
  const [userCredits, setUserCredits] = useState(0);
  const [claimedCredits, setClaimedCredits] = useState(new Set());
  const [isLoading, setIsLoading] = useState(true);

  // Mock credit data
  const mockCredits = [
    {
      id: 'welcome-bonus',
      title: 'Welcome Bonus',
      description: 'Get started with your first credits',
      amount: 100,
      icon: Gift,
      color: 'blue',
      category: 'starter',
      requirements: 'Complete onboarding',
      claimed: false
    },
    {
      id: 'profile-complete',
      title: 'Profile Completion',
      description: 'Complete your profile setup',
      amount: 50,
      icon: User,
      color: 'green',
      category: 'profile',
      requirements: 'Fill all profile fields',
      claimed: false
    },
    {
      id: 'first-connection',
      title: 'First Connection',
      description: 'Make your first meaningful connection',
      amount: 75,
      icon: Users,
      color: 'purple',
      category: 'social',
      requirements: 'Connect with another user',
      claimed: false
    },
    {
      id: 'weekly-active',
      title: 'Weekly Active',
      description: 'Stay active for a full week',
      amount: 200,
      icon: TrendingUp,
      color: 'orange',
      category: 'engagement',
      requirements: 'Login 7 days in a row',
      claimed: false
    },
    {
      id: 'achievement-master',
      title: 'Achievement Master',
      description: 'Unlock 10 achievements',
      amount: 300,
      icon: Award,
      color: 'yellow',
      category: 'achievement',
      requirements: 'Complete 10 achievements',
      claimed: false
    },
    {
      id: 'premium-upgrade',
      title: 'Premium Upgrade',
      description: 'Upgrade to premium membership',
      amount: 500,
      icon: Crown,
      color: 'gold',
      category: 'premium',
      requirements: 'Subscribe to premium',
      claimed: false
    },
    {
      id: 'referral-bonus',
      title: 'Referral Bonus',
      description: 'Invite friends to join StartupOS',
      amount: 150,
      icon: Users,
      color: 'teal',
      category: 'referral',
      requirements: 'Refer 3 friends',
      claimed: false
    },
    {
      id: 'content-creator',
      title: 'Content Creator',
      description: 'Share valuable content',
      amount: 100,
      icon: Lightbulb,
      color: 'pink',
      category: 'content',
      requirements: 'Post 5 helpful articles',
      claimed: false
    }
  ];

  useEffect(() => {
    // Simulate loading credits
    setTimeout(() => {
      setCredits(mockCredits);
      setUserCredits(250); // Mock user's current credits
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleClaimCredit = async (creditId) => {
    const credit = credits.find(c => c.id === creditId);
    if (!credit || claimedCredits.has(creditId)) return;

    // Simulate API call
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Update state
    setClaimedCredits(prev => new Set([...prev, creditId]));
    setUserCredits(prev => prev + credit.amount);
    
    // Update credit as claimed
    setCredits(prev => prev.map(c => 
      c.id === creditId ? { ...c, claimed: true } : c
    ));
    
    setIsLoading(false);
  };

  const getCategoryColor = (category) => {
    const colors = {
      starter: 'bg-blue-100 text-blue-800',
      profile: 'bg-green-100 text-green-800',
      social: 'bg-purple-100 text-purple-800',
      engagement: 'bg-orange-100 text-orange-800',
      achievement: 'bg-yellow-100 text-yellow-800',
      premium: 'bg-yellow-100 text-yellow-800',
      referral: 'bg-teal-100 text-teal-800',
      content: 'bg-pink-100 text-pink-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const getIconColor = (color) => {
    const colors = {
      blue: 'text-blue-600',
      green: 'text-green-600',
      purple: 'text-purple-600',
      orange: 'text-orange-600',
      yellow: 'text-yellow-600',
      gold: 'text-yellow-600',
      teal: 'text-teal-600',
      pink: 'text-pink-600'
    };
    return colors[color] || 'text-gray-600';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading credits...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => window.history.back()}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 mb-4"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back</span>
          </button>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Credit Store</h1>
              <p className="text-xl text-gray-600">Earn credits by completing tasks and achievements</p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center space-x-3">
                <Coins className="h-8 w-8 text-yellow-600" />
                <div>
                  <p className="text-sm text-gray-600">Your Credits</p>
                  <p className="text-2xl font-bold text-gray-900">{userCredits}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Credits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence>
            {credits.map((credit, index) => (
              <motion.div
                key={credit.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all ${
                  credit.claimed ? 'opacity-75' : ''
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-lg bg-gray-50`}>
                    <credit.icon className={`h-6 w-6 ${getIconColor(credit.color)}`} />
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(credit.category)}`}>
                    {credit.category}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2">{credit.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{credit.description}</p>
                
                <div className="mb-4">
                  <p className="text-xs text-gray-500 mb-1">Requirements:</p>
                  <p className="text-sm text-gray-700">{credit.requirements}</p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Coins className="h-5 w-5 text-yellow-600" />
                    <span className="text-lg font-bold text-gray-900">+{credit.amount}</span>
                  </div>
                  
                  {credit.claimed ? (
                    <div className="flex items-center space-x-2 text-green-600">
                      <CheckCircle className="h-5 w-5" />
                      <span className="text-sm font-medium">Claimed</span>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleClaimCredit(credit.id)}
                      disabled={isLoading}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
                    >
                      Claim
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Credit Usage Info */}
        <div className="mt-12 bg-white rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">How to Use Credits</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Boost Visibility</h3>
              <p className="text-gray-600">Use credits to increase your profile visibility and get more connections</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Premium Features</h3>
              <p className="text-gray-600">Unlock premium features and tools to accelerate your startup journey</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Priority Support</h3>
              <p className="text-gray-600">Get priority access to support and exclusive resources</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditStore;
