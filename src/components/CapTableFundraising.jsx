import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  DollarSign, PieChart, Users, TrendingUp, FileText, Target,
  Plus, Edit, Trash2, Download, Share, Eye, Lock, Unlock,
  Calendar, Clock, Check, X, AlertTriangle, Lightbulb, Brain,
  Building, Mail, Phone, Linkedin, Award, Star, ChevronRight,
  BarChart3, Activity, Zap, Shield, Heart, ThumbsUp, Send
} from 'lucide-react';

const CapTableFundraising = () => {
  const [activeTab, setActiveTab] = useState('captable');

  const tabs = [
    { id: 'captable', label: 'Cap Table', icon: PieChart, description: 'Equity management' },
    { id: 'fundraising', label: 'Fundraising', icon: Target, description: 'Investor pipeline' },
    { id: 'investors', label: 'Investor Network', icon: Users, description: 'Find investors' },
    { id: 'dataroom', label: 'Data Room', icon: Lock, description: 'Secure documents' },
    { id: 'intelligence', label: 'AI Advisor', icon: Brain, description: 'Recommendations' }
  ];

  const capTable = [
    { name: 'John Doe (Founder)', shares: 6000000, percentage: 60, type: 'Common', vesting: '4yr, 1yr cliff' },
    { name: 'Jane Smith (Co-Founder)', shares: 3000000, percentage: 30, type: 'Common', vesting: '4yr, 1yr cliff' },
    { name: 'Employee Option Pool', shares: 1000000, percentage: 10, type: 'Options', vesting: 'Various' }
  ];

  const investors = [
    {
      id: 1,
      name: 'Sequoia Capital',
      stage: 'Target',
      type: 'VC',
      focus: 'B2B SaaS',
      checkSize: '$2M - $10M',
      location: 'SF',
      match: 92,
      status: 'researching',
      contact: 'partner@sequoia.com'
    },
    {
      id: 2,
      name: 'Sarah Chen',
      stage: 'In Talks',
      type: 'Angel',
      focus: 'AI/ML',
      checkSize: '$50K - $250K',
      location: 'SF',
      match: 88,
      status: 'pitch-scheduled',
      contact: 'sarah@angellist.com',
      meetings: 2,
      lastContact: '2 days ago'
    },
    {
      id: 3,
      name: 'Y Combinator',
      stage: 'Applied',
      type: 'Accelerator',
      focus: 'All sectors',
      checkSize: '$500K',
      location: 'SF',
      match: 85,
      status: 'application-submitted',
      contact: 'apply@ycombinator.com'
    }
  ];

  const dataRoom = [
    { name: 'Pitch Deck v3.2', type: 'pdf', size: '4.2 MB', views: 12, lastViewed: '2 hours ago', status: 'active' },
    { name: 'Financial Model 2025', type: 'xlsx', size: '1.8 MB', views: 8, lastViewed: '1 day ago', status: 'active' },
    { name: 'Product Demo Video', type: 'mp4', size: '45 MB', views: 15, lastViewed: '3 hours ago', status: 'active' },
    { name: 'Customer References', type: 'pdf', size: '890 KB', views: 5, lastViewed: '2 days ago', status: 'active' }
  ];

  const fundraiseProgress = {
    target: 2000000,
    raised: 750000,
    percentage: 37.5,
    investors: 4,
    meetings: 18,
    term: 'Seed Round'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                <DollarSign className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Cap Table & Fundraising</h1>
                <p className="text-gray-600">Manage equity and raise capital</p>
              </div>
            </div>
            
            <button className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl hover:shadow-lg transition-all">
              <Plus size={20} />
              <span>Add Investor</span>
            </button>
          </div>

          {/* Fundraise Progress */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900">{fundraiseProgress.term} Progress</h3>
                <p className="text-gray-600">Target: ${(fundraiseProgress.target / 1000000).toFixed(1)}M</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-green-600">
                  ${(fundraiseProgress.raised / 1000000).toFixed(1)}M
                </div>
                <div className="text-sm text-gray-600">{fundraiseProgress.percentage}% raised</div>
              </div>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
              <div 
                className="bg-gradient-to-r from-green-500 to-emerald-500 h-4 rounded-full transition-all" 
                style={{ width: `${fundraiseProgress.percentage}%` }}
              ></div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">{fundraiseProgress.investors}</div>
                <div className="text-sm text-gray-600">Committed Investors</div>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">{fundraiseProgress.meetings}</div>
                <div className="text-sm text-gray-600">Investor Meetings</div>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">8</div>
                <div className="text-sm text-gray-600">Term Sheets</div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6 p-2">
          <div className="flex space-x-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-all flex-1 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-md'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon size={18} />
                  <div className="text-left">
                    <div className="font-medium text-sm">{tab.label}</div>
                    <div className={`text-xs ${activeTab === tab.id ? 'text-white/80' : 'text-gray-500'}`}>
                      {tab.description}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'captable' && (
            <motion.div
              key="captable"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Equity Distribution</h3>
                <div className="space-y-4">
                  {capTable.map((holder, index) => (
                    <div key={index} className="border-b border-gray-100 pb-4 last:border-0">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <div className="font-medium text-gray-900">{holder.name}</div>
                          <div className="text-sm text-gray-600">{holder.type} • {holder.vesting}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold text-green-600">{holder.percentage}%</div>
                          <div className="text-sm text-gray-600">{holder.shares.toLocaleString()} shares</div>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full" 
                          style={{ width: `${holder.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Valuation</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Pre-money</span>
                      <span className="font-bold text-gray-900">$8.0M</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Investment</span>
                      <span className="font-bold text-green-600">+$2.0M</span>
                    </div>
                    <div className="flex justify-between pt-3 border-t border-gray-200">
                      <span className="font-bold text-gray-900">Post-money</span>
                      <span className="font-bold text-gray-900">$10.0M</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Dilution Impact</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Current ownership</span>
                      <span className="font-bold text-gray-900">60%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Post-round</span>
                      <span className="font-bold text-orange-600">48%</span>
                    </div>
                    <div className="flex justify-between pt-3 border-t border-gray-200">
                      <span className="font-bold text-gray-900">Dilution</span>
                      <span className="font-bold text-red-600">-12%</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'investors' && (
            <motion.div
              key="investors"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="space-y-4">
                {investors.map((investor, index) => (
                  <motion.div
                    key={investor.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-400 rounded-full flex items-center justify-center text-white font-bold">
                          {investor.name.substring(0, 2)}
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">{investor.name}</h3>
                          <div className="flex items-center space-x-3 mt-1">
                            <span className={`px-2 py-1 text-xs font-medium rounded ${
                              investor.stage === 'Target' ? 'bg-blue-100 text-blue-700' :
                              investor.stage === 'In Talks' ? 'bg-purple-100 text-purple-700' :
                              'bg-green-100 text-green-700'
                            }`}>
                              {investor.stage}
                            </span>
                            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded">
                              {investor.type}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="flex items-center space-x-2">
                          <Star className="text-yellow-500" size={16} />
                          <span className="text-lg font-bold text-green-600">{investor.match}%</span>
                        </div>
                        <div className="text-xs text-gray-600">Match Score</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div>
                        <div className="text-xs text-gray-600 mb-1">Focus</div>
                        <div className="font-medium text-gray-900">{investor.focus}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-600 mb-1">Check Size</div>
                        <div className="font-medium text-gray-900">{investor.checkSize}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-600 mb-1">Location</div>
                        <div className="font-medium text-gray-900">{investor.location}</div>
                      </div>
                    </div>

                    {investor.meetings && (
                      <div className="bg-purple-50 p-3 rounded-lg mb-4">
                        <div className="text-sm font-medium text-gray-900">
                          {investor.meetings} meetings • Last contact: {investor.lastContact}
                        </div>
                      </div>
                    )}

                    <div className="flex items-center space-x-3">
                      <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-medium">
                        <Mail size={16} />
                        <span>Send Email</span>
                      </button>
                      <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm font-medium">
                        <Eye size={16} />
                        <span>View Profile</span>
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'dataroom' && (
            <motion.div
              key="dataroom"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="space-y-4">
                {dataRoom.map((doc, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                          <FileText size={20} className="text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900">{doc.name}</h3>
                          <div className="flex items-center space-x-3 mt-1">
                            <span className="text-sm text-gray-600">{doc.type.toUpperCase()}</span>
                            <span className="text-sm text-gray-600">• {doc.size}</span>
                            <span className="text-sm text-gray-600">• {doc.views} views</span>
                            <span className="text-sm text-gray-500">• Last viewed {doc.lastViewed}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <button className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg">
                          <Download size={18} />
                        </button>
                        <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg">
                          <Share size={18} />
                        </button>
                        <button className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg">
                          <Lock size={18} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'intelligence' && (
            <motion.div
              key="intelligence"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center space-x-3 mb-6">
                  <Brain className="text-green-600" size={32} />
                  <h2 className="text-2xl font-bold text-gray-900">AI Fundraising Advisor</h2>
                </div>

                <div className="space-y-6">
                  <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
                    <h3 className="text-lg font-bold text-gray-900 mb-3">✅ Optimal Time to Raise</h3>
                    <p className="text-gray-700 mb-4">
                      Based on your metrics and 14-month runway, the optimal time to close a round is in 3 months. Here's why:
                    </p>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex items-start space-x-2">
                        <Check size={16} className="text-green-600 mt-0.5" />
                        <span>Your MRR will be $55K (vs $35K now) = 40% better metrics</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <Check size={16} className="text-green-600 mt-0.5" />
                        <span>Gives you 3 months to build investor relationships</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <Check size={16} className="text-green-600 mt-0.5" />
                        <span>Still have 11 months runway when you close (comfortable buffer)</span>
                      </li>
                    </ul>
                  </div>

                  <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
                    <h3 className="text-lg font-bold text-gray-900 mb-3">💰 Recommended Raise Amount</h3>
                    <p className="text-gray-700 mb-4">
                      Raise $2.0M - $2.5M at a $8M - $10M pre-money valuation
                    </p>
                    <div className="bg-white p-4 rounded-lg">
                      <div className="font-semibold text-gray-900 mb-2">Reasoning:</div>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li>• 18-24 months runway to hit Series A metrics</li>
                        <li>• Reasonable dilution: 20-25% (vs 30%+ if raising now)</li>
                        <li>• Enough to hire 3-5 key people</li>
                        <li>• Budget for scaling marketing</li>
                      </ul>
                    </div>
                  </div>

                  <div className="p-6 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl">
                    <h3 className="text-lg font-bold text-gray-900 mb-3">🎯 Top Investor Matches</h3>
                    <p className="text-gray-700 mb-4">
                      Based on your sector (B2B SaaS), stage (Seed), and location (SF), these investors are best fit:
                    </p>
                    <div className="space-y-2">
                      {['Sequoia Capital', 'Accel Partners', 'First Round Capital'].map((inv, idx) => (
                        <div key={idx} className="flex items-center justify-between bg-white p-3 rounded-lg">
                          <span className="font-medium text-gray-900">{inv}</span>
                          <span className="text-sm text-green-600 font-medium">92% match</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CapTableFundraising;

