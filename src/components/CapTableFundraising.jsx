import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  DollarSign, PieChart, Users, TrendingUp, FileText, Target,
  Plus, Edit, Trash2, Download, Share, Eye, Lock, Unlock,
  Calendar, Clock, Check, X, AlertTriangle, Lightbulb, Brain,
  Building, Mail, Phone, Linkedin, Award, Star, ChevronRight,
  BarChart3, Activity, Zap, Shield, Heart, ThumbsUp, Send,
  Upload, Folder, MessageSquare, Calculator, TrendingDown
} from 'lucide-react';

const CapTableFundraising = () => {
  const [activeTab, setActiveTab] = useState('captable');
  
  // Cap Table State
  const [shareholders, setShareholders] = useState([]);
  const [showShareholderModal, setShowShareholderModal] = useState(false);
  const [editingShareholder, setEditingShareholder] = useState(null);
  const [shareholderForm, setShareholderForm] = useState({
    name: '',
    shares: '',
    type: 'Common',
    vestingYears: '4',
    cliffYears: '1'
  });

  // Fundraising State
  const [fundraisingRounds, setFundraisingRounds] = useState([]);
  const [currentRound, setCurrentRound] = useState(null);
  const [showRoundModal, setShowRoundModal] = useState(false);
  const [roundForm, setRoundForm] = useState({
    name: '',
    target: '',
    raised: '',
    valuation: '',
    investors: []
  });

  // Investor State
  const [investors, setInvestors] = useState([]);
  const [showInvestorModal, setShowInvestorModal] = useState(false);
  const [selectedInvestor, setSelectedInvestor] = useState(null);
  const [investorForm, setInvestorForm] = useState({
    name: '',
    type: 'VC',
    focus: '',
    checkSize: '',
    location: '',
    contact: '',
    stage: 'Target'
  });
  const [showCommunicationModal, setShowCommunicationModal] = useState(false);
  const [communicationForm, setCommunicationForm] = useState({
    type: 'email',
    date: '',
    notes: '',
    nextAction: ''
  });

  // Data Room State
  const [documents, setDocuments] = useState([]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadForm, setUploadForm] = useState({
    name: '',
    type: 'pdf',
    category: 'Financial'
  });

  // Valuation Calculator State
  const [showValuationModal, setShowValuationModal] = useState(false);
  const [valuationForm, setValuationForm] = useState({
    preMoneyValuation: '',
    investment: '',
    optionPool: '0'
  });

  // Scenario State
  const [showScenarioModal, setShowScenarioModal] = useState(false);
  const [scenarios, setScenarios] = useState([]);

  const tabs = [
    { id: 'captable', label: 'Cap Table', icon: PieChart, description: 'Equity management' },
    { id: 'fundraising', label: 'Fundraising', icon: Target, description: 'Investor pipeline' },
    { id: 'investors', label: 'Investor Network', icon: Users, description: 'Find investors' },
    { id: 'dataroom', label: 'Data Room', icon: Lock, description: 'Secure documents' },
    { id: 'intelligence', label: 'AI Advisor', icon: Brain, description: 'Recommendations' }
  ];

  // Initialize mock data
  useEffect(() => {
    if (shareholders.length === 0) {
      setShareholders([
        { id: 1, name: 'John Doe (Founder)', shares: 6000000, type: 'Common', vestingYears: 4, cliffYears: 1 },
        { id: 2, name: 'Jane Smith (Co-Founder)', shares: 3000000, type: 'Common', vestingYears: 4, cliffYears: 1 },
        { id: 3, name: 'Employee Option Pool', shares: 1000000, type: 'Options', vestingYears: 4, cliffYears: 0 }
      ]);
    }

    if (investors.length === 0) {
      setInvestors([
        {
          id: 1,
          name: 'Sequoia Capital',
          stage: 'Target',
          type: 'VC',
          focus: 'B2B SaaS',
          checkSize: '$2M - $10M',
          location: 'SF',
          match: 92,
          contact: 'partner@sequoia.com',
          communications: []
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
          contact: 'sarah@angellist.com',
          communications: [
            { id: 1, type: 'email', date: '2025-11-13', notes: 'Initial intro email sent', nextAction: 'Follow up in 3 days' },
            { id: 2, type: 'call', date: '2025-11-10', notes: '30 min intro call, very interested', nextAction: 'Send pitch deck' }
          ]
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
          contact: 'apply@ycombinator.com',
          communications: []
        }
      ]);
    }

    if (documents.length === 0) {
      setDocuments([
        { id: 1, name: 'Pitch Deck v3.2', type: 'pdf', category: 'Marketing', size: '4.2 MB', views: 12, lastViewed: '2 hours ago' },
        { id: 2, name: 'Financial Model 2025', type: 'xlsx', category: 'Financial', size: '1.8 MB', views: 8, lastViewed: '1 day ago' },
        { id: 3, name: 'Product Demo Video', type: 'mp4', category: 'Product', size: '45 MB', views: 15, lastViewed: '3 hours ago' },
        { id: 4, name: 'Customer References', type: 'pdf', category: 'Marketing', size: '890 KB', views: 5, lastViewed: '2 days ago' }
      ]);
    }

    if (!currentRound) {
      setCurrentRound({
        id: 1,
        name: 'Seed Round',
        target: 2000000,
        raised: 750000,
        valuation: 8000000,
        investors: ['Angel Investors', 'Y Combinator', 'Sequoia Capital (target)'],
        startDate: '2025-09-01',
        closeDate: '2026-03-01'
      });
    }
  }, []);

  // Calculate total shares and percentages
  const calculateOwnership = () => {
    const totalShares = shareholders.reduce((sum, sh) => sum + sh.shares, 0);
    return shareholders.map(sh => ({
      ...sh,
      percentage: totalShares > 0 ? ((sh.shares / totalShares) * 100).toFixed(2) : 0
    }));
  };

  const shareholdersWithOwnership = calculateOwnership();

  // Shareholder Handlers
  const handleAddShareholder = () => {
    if (!shareholderForm.name || !shareholderForm.shares) return;

    const newShareholder = {
      id: Date.now(),
      name: shareholderForm.name,
      shares: parseInt(shareholderForm.shares),
      type: shareholderForm.type,
      vestingYears: parseInt(shareholderForm.vestingYears),
      cliffYears: parseInt(shareholderForm.cliffYears)
    };

    setShareholders(prev => [...prev, newShareholder]);
    setShareholderForm({ name: '', shares: '', type: 'Common', vestingYears: '4', cliffYears: '1' });
    setShowShareholderModal(false);
  };

  const handleEditShareholder = (shareholder) => {
    setEditingShareholder(shareholder);
    setShareholderForm({
      name: shareholder.name,
      shares: shareholder.shares.toString(),
      type: shareholder.type,
      vestingYears: shareholder.vestingYears.toString(),
      cliffYears: shareholder.cliffYears.toString()
    });
    setShowShareholderModal(true);
  };

  const handleUpdateShareholder = () => {
    setShareholders(prev => prev.map(sh => 
      sh.id === editingShareholder.id
        ? {
            ...sh,
            name: shareholderForm.name,
            shares: parseInt(shareholderForm.shares),
            type: shareholderForm.type,
            vestingYears: parseInt(shareholderForm.vestingYears),
            cliffYears: parseInt(shareholderForm.cliffYears)
          }
        : sh
    ));
    setEditingShareholder(null);
    setShareholderForm({ name: '', shares: '', type: 'Common', vestingYears: '4', cliffYears: '1' });
    setShowShareholderModal(false);
  };

  const handleDeleteShareholder = (id) => {
    setShareholders(prev => prev.filter(sh => sh.id !== id));
  };

  // Investor Handlers
  const handleAddInvestor = () => {
    if (!investorForm.name) return;

    const newInvestor = {
      id: Date.now(),
      ...investorForm,
      match: Math.floor(Math.random() * 20) + 80,
      communications: []
    };

    setInvestors(prev => [...prev, newInvestor]);
    setInvestorForm({ name: '', type: 'VC', focus: '', checkSize: '', location: '', contact: '', stage: 'Target' });
    setShowInvestorModal(false);
  };

  const handleUpdateInvestorStage = (investorId, newStage) => {
    setInvestors(prev => prev.map(inv => 
      inv.id === investorId ? { ...inv, stage: newStage } : inv
    ));
  };

  const handleAddCommunication = () => {
    if (!selectedInvestor || !communicationForm.date || !communicationForm.notes) return;

    const newComm = {
      id: Date.now(),
      ...communicationForm
    };

    setInvestors(prev => prev.map(inv => 
      inv.id === selectedInvestor.id
        ? { ...inv, communications: [newComm, ...(inv.communications || [])] }
        : inv
    ));

    setCommunicationForm({ type: 'email', date: '', notes: '', nextAction: '' });
    setShowCommunicationModal(false);
  };

  const handleDeleteInvestor = (id) => {
    setInvestors(prev => prev.filter(inv => inv.id !== id));
  };

  // Document Handlers
  const handleUploadDocument = () => {
    if (!uploadForm.name) return;

    const newDoc = {
      id: Date.now(),
      ...uploadForm,
      size: `${(Math.random() * 10 + 0.5).toFixed(1)} MB`,
      views: 0,
      lastViewed: 'Never'
    };

    setDocuments(prev => [...prev, newDoc]);
    setUploadForm({ name: '', type: 'pdf', category: 'Financial' });
    setShowUploadModal(false);
  };

  const handleDeleteDocument = (id) => {
    setDocuments(prev => prev.filter(doc => doc.id !== id));
  };

  // Valuation Calculator
  const calculateDilution = () => {
    if (!valuationForm.preMoneyValuation || !valuationForm.investment) return null;

    const preMoney = parseFloat(valuationForm.preMoneyValuation);
    const investment = parseFloat(valuationForm.investment);
    const optionPool = parseFloat(valuationForm.optionPool) || 0;

    const postMoney = preMoney + investment;
    const newInvestorOwnership = (investment / postMoney) * 100;
    const optionPoolPercentage = (optionPool / 100) * 100;
    const founderOwnership = 100 - newInvestorOwnership - optionPoolPercentage;

    return {
      preMoney,
      investment,
      postMoney,
      newInvestorOwnership: newInvestorOwnership.toFixed(2),
      optionPoolPercentage: optionPoolPercentage.toFixed(2),
      founderOwnership: founderOwnership.toFixed(2)
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Cap Table & Fundraising</h1>
                <p className="text-gray-600 text-sm">Manage equity and raise capital</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              {activeTab === 'captable' && (
                <button 
                  onClick={() => {
                    setShowValuationModal(true);
                  }}
                  className="flex items-center space-x-2 px-4 py-2.5 bg-white text-gray-700 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all font-medium shadow-sm"
                >
                  <Calculator size={18} />
                  <span>Dilution Calculator</span>
                </button>
              )}
              <button 
                onClick={() => {
                  if (activeTab === 'captable') {
                    setEditingShareholder(null);
                    setShareholderForm({ name: '', shares: '', type: 'Common', vestingYears: '4', cliffYears: '1' });
                    setShowShareholderModal(true);
                  } else if (activeTab === 'investors') {
                    setInvestorForm({ name: '', type: 'VC', focus: '', checkSize: '', location: '', contact: '', stage: 'Target' });
                    setShowInvestorModal(true);
                  } else if (activeTab === 'dataroom') {
                    setUploadForm({ name: '', type: 'pdf', category: 'Financial' });
                    setShowUploadModal(true);
                  }
                }}
                className="flex items-center space-x-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all font-medium shadow-sm hover:shadow"
              >
                <Plus size={18} />
                <span>
                  {activeTab === 'captable' ? 'Add Shareholder' : 
                   activeTab === 'investors' ? 'Add Investor' : 
                   activeTab === 'dataroom' ? 'Upload Document' : 'Add'}
                </span>
              </button>
            </div>
          </div>

          {/* Fundraise Progress */}
          {currentRound && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base font-bold text-gray-900">{currentRound.name} Progress</h3>
                  <p className="text-gray-600 text-sm">Target: ${(currentRound.target / 1000000).toFixed(1)}M</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-blue-600">
                    ${(currentRound.raised / 1000000).toFixed(1)}M
                  </div>
                  <div className="text-sm text-blue-600 font-semibold">{((currentRound.raised / currentRound.target) * 100).toFixed(1)}% raised</div>
                </div>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-3 mb-4 overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${(currentRound.raised / currentRound.target) * 100}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="bg-blue-600 h-3 rounded-full"
                ></motion.div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="text-center p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="flex items-center justify-center mb-2">
                    <Users className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{currentRound.investors?.length || 0}</div>
                  <div className="text-sm text-gray-600 font-medium">Committed Investors</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="flex items-center justify-center mb-2">
                    <MessageSquare className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{investors.filter(inv => inv.communications?.length > 0).length}</div>
                  <div className="text-sm text-gray-600 font-medium">Active Conversations</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="flex items-center justify-center mb-2">
                    <TrendingUp className="w-5 h-5 text-orange-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{investors.filter(inv => inv.stage === 'In Talks').length}</div>
                  <div className="text-sm text-gray-600 font-medium">In Negotiation</div>
                </div>
              </div>
            </motion.div>
          )}
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
                  className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg transition-all flex-1 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon size={18} />
                  <span>{tab.label}</span>
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
                  {shareholdersWithOwnership.map((holder) => (
                    <div key={holder.id} className="border-b border-gray-100 pb-4 last:border-0">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex-1">
                          <div className="font-medium text-gray-900">{holder.name}</div>
                          <div className="text-sm text-gray-600">
                            {holder.type} • {holder.vestingYears}yr vesting, {holder.cliffYears}yr cliff
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <div className="text-xl font-bold text-blue-600">{holder.percentage}%</div>
                            <div className="text-sm text-gray-600">{holder.shares.toLocaleString()} shares</div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleEditShareholder(holder)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            >
                              <Edit size={18} />
                            </button>
                            <button
                              onClick={() => handleDeleteShareholder(holder.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all" 
                          style={{ width: `${holder.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Current Valuation</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Pre-money</span>
                      <span className="font-bold text-gray-900">${currentRound ? (currentRound.valuation / 1000000).toFixed(1) : '0'}M</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Target raise</span>
                      <span className="font-bold text-blue-600">+${currentRound ? (currentRound.target / 1000000).toFixed(1) : '0'}M</span>
                    </div>
                    <div className="flex justify-between pt-3 border-t border-gray-200">
                      <span className="font-bold text-gray-900">Post-money</span>
                      <span className="font-bold text-gray-900">${currentRound ? ((currentRound.valuation + currentRound.target) / 1000000).toFixed(1) : '0'}M</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Total Shares</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total shares issued</span>
                      <span className="font-bold text-gray-900">{shareholders.reduce((sum, sh) => sum + sh.shares, 0).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total shareholders</span>
                      <span className="font-bold text-gray-900">{shareholders.length}</span>
                    </div>
                    <div className="flex justify-between pt-3 border-t border-gray-200">
                      <span className="font-bold text-gray-900">Fully diluted</span>
                      <span className="font-bold text-gray-900">{shareholders.reduce((sum, sh) => sum + sh.shares, 0).toLocaleString()}</span>
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
                        <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                          {investor.name.substring(0, 2)}
                        </div>
                                  <div>
                                    <h3 className="text-lg font-bold text-gray-900">{investor.name}</h3>
                                    <div className="flex items-center space-x-3 mt-1">
                                      <select
                                        value={investor.stage}
                                        onChange={(e) => handleUpdateInvestorStage(investor.id, e.target.value)}
                                        className={`px-2.5 py-1 text-xs font-semibold rounded-lg border cursor-pointer ${
                                          investor.stage === 'Target' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                                          investor.stage === 'In Talks' ? 'bg-orange-50 text-orange-700 border-orange-200' :
                                          investor.stage === 'Applied' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                                          investor.stage === 'Committed' ? 'bg-green-50 text-green-700 border-green-200' :
                                          'bg-gray-50 text-gray-700 border-gray-200'
                                        }`}
                                      >
                                        <option value="Target">Target</option>
                                        <option value="In Talks">In Talks</option>
                                        <option value="Applied">Applied</option>
                                        <option value="Committed">Committed</option>
                                        <option value="Passed">Passed</option>
                                      </select>
                                      <span className="px-2.5 py-1 bg-gray-50 text-gray-700 text-xs font-semibold rounded-lg border border-gray-200">
                                        {investor.type}
                                      </span>
                                    </div>
                                  </div>
                                </div>

                                <div className="flex items-center space-x-3">
                                  <div className="text-right">
                                    <div className="flex items-center space-x-2">
                                      <Star className="text-blue-600" size={16} />
                                      <span className="text-lg font-bold text-blue-600">{investor.match}%</span>
                                    </div>
                                    <div className="text-xs text-gray-600">Match Score</div>
                                  </div>
                                  <button
                                    onClick={() => handleDeleteInvestor(investor.id)}
                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                  >
                                    <Trash2 size={18} />
                                  </button>
                                </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div>
                        <div className="text-xs text-gray-600 mb-1">Focus</div>
                        <div className="font-medium text-gray-900">{investor.focus || 'Not specified'}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-600 mb-1">Check Size</div>
                        <div className="font-medium text-gray-900">{investor.checkSize || 'Not specified'}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-600 mb-1">Location</div>
                        <div className="font-medium text-gray-900">{investor.location || 'Not specified'}</div>
                      </div>
                    </div>

                    {investor.communications && investor.communications.length > 0 && (
                      <div className="bg-white p-4 rounded-lg mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="text-sm font-bold text-gray-900">Communication History</div>
                          <div className="text-xs text-gray-600">{investor.communications.length} interactions</div>
                        </div>
                        <div className="space-y-2">
                          {investor.communications.slice(0, 2).map(comm => (
                            <div key={comm.id} className="bg-white p-3 rounded-lg">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-xs font-medium text-gray-900 uppercase">{comm.type}</span>
                                <span className="text-xs text-gray-600">{comm.date}</span>
                              </div>
                              <div className="text-sm text-gray-700 mb-1">{comm.notes}</div>
                              {comm.nextAction && (
                                <div className="text-xs text-blue-600 font-medium">Next: {comm.nextAction}</div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex items-center space-x-3">
                      <button 
                        onClick={() => {
                          setSelectedInvestor(investor);
                          setCommunicationForm({ type: 'email', date: new Date().toISOString().split('T')[0], notes: '', nextAction: '' });
                          setShowCommunicationModal(true);
                        }}
                        className="flex items-center space-x-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 text-sm font-medium transition-all shadow-sm hover:shadow"
                      >
                        <MessageSquare size={16} />
                        <span>Log Communication</span>
                      </button>
                      <a 
                        href={`mailto:${investor.contact}`}
                        className="flex items-center space-x-2 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 text-sm font-medium transition-all"
                      >
                        <Mail size={16} />
                        <span>Send Email</span>
                      </a>
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
              <div className="grid grid-cols-5 gap-3 mb-6">
                {[
                  { name: 'All', count: documents.length, color: 'blue' },
                  { name: 'Financial', count: documents.filter(d => d.category === 'Financial').length, color: 'green' },
                  { name: 'Marketing', count: documents.filter(d => d.category === 'Marketing').length, color: 'purple' },
                  { name: 'Legal', count: documents.filter(d => d.category === 'Legal').length, color: 'amber' },
                  { name: 'Product', count: documents.filter(d => d.category === 'Product').length, color: 'orange' }
                ].map(cat => (
                  <button
                    key={cat.name}
                    className={`px-4 py-3 rounded-xl hover:shadow-md font-semibold transition-all border-2 ${
                      cat.color === 'blue' ? 'bg-blue-50 border-blue-300 text-blue-900' :
                      cat.color === 'green' ? 'bg-green-50 border-green-300 text-green-900' :
                      cat.color === 'purple' ? 'bg-purple-50 border-purple-300 text-purple-900' :
                      cat.color === 'amber' ? 'bg-amber-50 border-amber-300 text-amber-900' :
                      'bg-orange-50 border-orange-300 text-orange-900'
                    }`}
                  >
                    <div className="text-lg">{cat.name}</div>
                    <div className={`text-sm ${
                      cat.color === 'blue' ? 'text-blue-700' :
                      cat.color === 'green' ? 'text-green-700' :
                      cat.color === 'purple' ? 'text-purple-700' :
                      cat.color === 'amber' ? 'text-amber-700' :
                      'text-orange-700'
                    }`}>({cat.count})</div>
                  </button>
                ))}
              </div>

              <div className="space-y-3">
                {documents.map((doc, index) => {
                  const getCategoryStyles = (category) => {
                    const styles = {
                      'Financial': {
                        bg: 'bg-green-50',
                        border: 'border-green-200',
                        iconBg: 'bg-green-600',
                        badgeBg: 'bg-green-100',
                        badgeText: 'text-green-700'
                      },
                      'Marketing': {
                        bg: 'bg-purple-50',
                        border: 'border-purple-200',
                        iconBg: 'bg-purple-600',
                        badgeBg: 'bg-purple-100',
                        badgeText: 'text-purple-700'
                      },
                      'Product': {
                        bg: 'bg-blue-50',
                        border: 'border-blue-200',
                        iconBg: 'bg-blue-600',
                        badgeBg: 'bg-blue-100',
                        badgeText: 'text-blue-700'
                      },
                      'Legal': {
                        bg: 'bg-amber-50',
                        border: 'border-amber-200',
                        iconBg: 'bg-amber-600',
                        badgeBg: 'bg-amber-100',
                        badgeText: 'text-amber-700'
                      }
                    };
                    return styles[category] || {
                      bg: 'bg-gray-50',
                      border: 'border-gray-200',
                      iconBg: 'bg-gray-600',
                      badgeBg: 'bg-gray-100',
                      badgeText: 'text-gray-700'
                    };
                  };

                  const styles = getCategoryStyles(doc.category);
                  
                  return (
                    <motion.div
                      key={doc.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`${styles.bg} p-5 rounded-xl shadow-sm border-2 ${styles.border} hover:shadow-md transition-all`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className={`w-12 h-12 ${styles.iconBg} rounded-xl flex items-center justify-center shadow-sm`}>
                            <FileText size={20} className="text-white" />
                          </div>
                          <div>
                            <h3 className="font-bold text-gray-900">{doc.name}</h3>
                            <div className="flex items-center space-x-3 mt-1">
                              <span className={`px-2.5 py-1 ${styles.badgeBg} ${styles.badgeText} text-xs font-semibold rounded border ${styles.border}`}>{doc.category}</span>
                              <span className="text-sm text-gray-700 font-medium">{doc.type.toUpperCase()}</span>
                              <span className="text-sm text-gray-600">• {doc.size}</span>
                              <span className="text-sm text-gray-600">• {doc.views} views</span>
                              <span className="text-sm text-gray-500">• Last viewed {doc.lastViewed}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <button 
                            className="p-2.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Download"
                          >
                            <Download size={18} />
                          </button>
                          <button 
                            className="p-2.5 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                            title="Share"
                          >
                            <Share size={18} />
                          </button>
                          <button 
                            onClick={() => handleDeleteDocument(doc.id)}
                            className="p-2.5 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {activeTab === 'fundraising' && (
            <motion.div
              key="fundraising"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {currentRound && (
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-gray-900">Current Round: {currentRound.name}</h3>
                    <button className="flex items-center space-x-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-medium shadow-sm hover:shadow transition-all">
                      <Edit size={16} />
                      <span>Edit Round</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                      <div className="flex items-center space-x-2 mb-2">
                        <Target className="w-4 h-4 text-blue-600" />
                        <div className="text-sm text-gray-600 font-medium">Target Amount</div>
                      </div>
                      <div className="text-2xl font-bold text-gray-900">${(currentRound.target / 1000000).toFixed(1)}M</div>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-xl border border-purple-200">
                      <div className="flex items-center space-x-2 mb-2">
                        <TrendingUp className="w-4 h-4 text-purple-600" />
                        <div className="text-sm text-gray-600 font-medium">Valuation</div>
                      </div>
                      <div className="text-2xl font-bold text-gray-900">${(currentRound.valuation / 1000000).toFixed(1)}M</div>
                    </div>
                    <div className="bg-green-50 p-4 rounded-xl border border-green-200">
                      <div className="flex items-center space-x-2 mb-2">
                        <Calendar className="w-4 h-4 text-green-600" />
                        <div className="text-sm text-gray-600 font-medium">Expected Close</div>
                      </div>
                      <div className="text-2xl font-bold text-gray-900">{currentRound.closeDate}</div>
                    </div>
                  </div>

                  <div>
                    <div className="text-sm font-bold text-gray-900 mb-3">Committed Investors:</div>
                    <div className="flex flex-wrap gap-2">
                      {currentRound.investors?.map((inv, idx) => (
                        <span key={idx} className="px-3 py-1.5 bg-blue-100 text-blue-700 border border-blue-200 rounded-lg text-sm font-semibold">
                          {inv}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Fundraising Pipeline</h3>
                <div className="space-y-4">
                  {['Target', 'In Talks', 'Committed'].map(stage => {
                    const stageInvestors = investors.filter(inv => inv.stage === stage);
                    return (
                      <div key={stage} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-bold text-gray-900">{stage}</h4>
                          <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                            {stageInvestors.length} investors
                          </span>
                        </div>
                        <div className="space-y-2">
                          {stageInvestors.length > 0 ? (
                            stageInvestors.map(inv => (
                              <div key={inv.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div className="flex items-center space-x-3">
                                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                                    {inv.name.substring(0, 2)}
                                  </div>
                                  <div>
                                    <div className="font-medium text-gray-900">{inv.name}</div>
                                    <div className="text-xs text-gray-600">{inv.type} • {inv.checkSize}</div>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Star className="text-blue-600" size={14} />
                                  <span className="text-sm font-medium text-gray-700">{inv.match}%</span>
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="text-center py-4 text-gray-500 text-sm">No investors in this stage</div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
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
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-xl shadow-sm border-2 border-blue-200">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-3 bg-blue-600 rounded-xl shadow-sm">
                    <Brain className="text-white" size={32} />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">AI Fundraising Advisor</h2>
                </div>

                <div className="space-y-4">
                  <div className="p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border-2 border-green-200 shadow-sm">
                    <div className="flex items-center space-x-2 mb-3">
                      <Check size={24} className="text-green-600" />
                      <h3 className="text-lg font-bold text-green-900">Optimal Time to Raise</h3>
                    </div>
                    <p className="text-green-800 mb-4 font-medium">
                      Based on your metrics and 14-month runway, the optimal time to close a round is in 3 months. Here's why:
                    </p>
                    <ul className="space-y-2.5 text-sm text-green-900">
                      <li className="flex items-start space-x-2">
                        <Check size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="font-medium">Your MRR will be $55K (vs $35K now) = 40% better metrics</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <Check size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="font-medium">Gives you 3 months to build investor relationships</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <Check size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="font-medium">Still have 11 months runway when you close (comfortable buffer)</span>
                      </li>
                    </ul>
                  </div>

                  <div className="p-6 bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl border-2 border-amber-200 shadow-sm">
                    <div className="flex items-center space-x-2 mb-3">
                      <DollarSign size={24} className="text-amber-600" />
                      <h3 className="text-lg font-bold text-amber-900">Recommended Raise Amount</h3>
                    </div>
                    <p className="text-amber-900 mb-4 font-bold text-lg">
                      Raise $2.0M - $2.5M at a $8M - $10M pre-money valuation
                    </p>
                    <div className="bg-white/80 p-4 rounded-lg border border-amber-200">
                      <div className="font-bold text-amber-900 mb-3">Reasoning:</div>
                      <ul className="space-y-2 text-sm text-gray-800">
                        <li className="flex items-start space-x-2">
                          <span className="text-amber-600">•</span>
                          <span className="font-medium">18-24 months runway to hit Series A metrics</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <span className="text-amber-600">•</span>
                          <span className="font-medium">Reasonable dilution: 20-25% (vs 30%+ if raising now)</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <span className="text-amber-600">•</span>
                          <span className="font-medium">Enough to hire 3-5 key people</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border-2 border-purple-200 shadow-sm">
                    <div className="flex items-center space-x-2 mb-3">
                      <Target size={24} className="text-purple-600" />
                      <h3 className="text-lg font-bold text-purple-900">Top Investor Matches</h3>
                    </div>
                    <p className="text-purple-800 mb-4 font-medium">
                      Based on your sector (B2B SaaS), stage (Seed), and location (SF), these investors are best fit:
                    </p>
                    <div className="space-y-2">
                      {['Sequoia Capital', 'Accel Partners', 'First Round Capital'].map((inv, idx) => (
                        <div key={idx} className="flex items-center justify-between bg-white p-4 rounded-lg border border-purple-200 shadow-sm">
                          <span className="font-bold text-gray-900">{inv}</span>
                          <div className="flex items-center space-x-2 bg-purple-100 px-3 py-1 rounded-full">
                            <Star className="w-4 h-4 text-purple-600" />
                            <span className="text-sm text-purple-700 font-bold">92% match</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Shareholder Modal */}
        {showShareholderModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl p-8 max-w-md w-full"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                {editingShareholder ? 'Edit Shareholder' : 'Add Shareholder'}
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    value={shareholderForm.name}
                    onChange={(e) => setShareholderForm({ ...shareholderForm, name: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-gray-200 focus:outline-none"
                    placeholder="e.g. John Doe (Founder)"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Shares</label>
                  <input
                    type="number"
                    value={shareholderForm.shares}
                    onChange={(e) => setShareholderForm({ ...shareholderForm, shares: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-gray-200 focus:outline-none"
                    placeholder="e.g. 1000000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                  <select
                    value={shareholderForm.type}
                    onChange={(e) => setShareholderForm({ ...shareholderForm, type: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-gray-200 focus:outline-none"
                  >
                    <option value="Common">Common</option>
                    <option value="Preferred">Preferred</option>
                    <option value="Options">Options</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Vesting (years)</label>
                    <input
                      type="number"
                      value={shareholderForm.vestingYears}
                      onChange={(e) => setShareholderForm({ ...shareholderForm, vestingYears: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-gray-200 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Cliff (years)</label>
                    <input
                      type="number"
                      value={shareholderForm.cliffYears}
                      onChange={(e) => setShareholderForm({ ...shareholderForm, cliffYears: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-gray-200 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
              <div className="flex space-x-3 mt-6">
                <button
                  onClick={() => {
                    setShowShareholderModal(false);
                    setEditingShareholder(null);
                  }}
                  className="flex-1 px-6 py-3 border border-gray-300 rounded-xl font-medium hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={editingShareholder ? handleUpdateShareholder : handleAddShareholder}
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-all shadow-sm hover:shadow"
                >
                  {editingShareholder ? 'Update' : 'Add'} Shareholder
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Investor Modal */}
        {showInvestorModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl p-8 max-w-md w-full"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Add Investor</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    value={investorForm.name}
                    onChange={(e) => setInvestorForm({ ...investorForm, name: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-gray-200 focus:outline-none"
                    placeholder="e.g. Sequoia Capital"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                  <select
                    value={investorForm.type}
                    onChange={(e) => setInvestorForm({ ...investorForm, type: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-gray-200 focus:outline-none"
                  >
                    <option value="VC">VC</option>
                    <option value="Angel">Angel</option>
                    <option value="Accelerator">Accelerator</option>
                    <option value="Corporate">Corporate</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Focus</label>
                  <input
                    type="text"
                    value={investorForm.focus}
                    onChange={(e) => setInvestorForm({ ...investorForm, focus: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-gray-200 focus:outline-none"
                    placeholder="e.g. B2B SaaS"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Check Size</label>
                  <input
                    type="text"
                    value={investorForm.checkSize}
                    onChange={(e) => setInvestorForm({ ...investorForm, checkSize: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-gray-200 focus:outline-none"
                    placeholder="e.g. $1M - $5M"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <input
                    type="text"
                    value={investorForm.location}
                    onChange={(e) => setInvestorForm({ ...investorForm, location: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-gray-200 focus:outline-none"
                    placeholder="e.g. San Francisco"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Contact Email</label>
                  <input
                    type="email"
                    value={investorForm.contact}
                    onChange={(e) => setInvestorForm({ ...investorForm, contact: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-gray-200 focus:outline-none"
                    placeholder="e.g. partner@sequoia.com"
                  />
                </div>
              </div>
              <div className="flex space-x-3 mt-6">
                <button
                  onClick={() => setShowInvestorModal(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 rounded-xl font-medium hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddInvestor}
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-all shadow-sm hover:shadow"
                >
                  Add Investor
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Communication Modal */}
        {showCommunicationModal && selectedInvestor && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl p-8 max-w-md w-full"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Log Communication</h3>
              <p className="text-gray-600 mb-6">with {selectedInvestor.name}</p>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                  <select
                    value={communicationForm.type}
                    onChange={(e) => setCommunicationForm({ ...communicationForm, type: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-gray-200 focus:outline-none"
                  >
                    <option value="email">Email</option>
                    <option value="call">Call</option>
                    <option value="meeting">Meeting</option>
                    <option value="demo">Demo</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                  <input
                    type="date"
                    value={communicationForm.date}
                    onChange={(e) => setCommunicationForm({ ...communicationForm, date: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-gray-200 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                  <textarea
                    value={communicationForm.notes}
                    onChange={(e) => setCommunicationForm({ ...communicationForm, notes: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-gray-200 focus:outline-none"
                    rows="3"
                    placeholder="What was discussed?"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Next Action</label>
                  <input
                    type="text"
                    value={communicationForm.nextAction}
                    onChange={(e) => setCommunicationForm({ ...communicationForm, nextAction: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-gray-200 focus:outline-none"
                    placeholder="e.g. Follow up in 3 days"
                  />
                </div>
              </div>
              <div className="flex space-x-3 mt-6">
                <button
                  onClick={() => setShowCommunicationModal(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 rounded-xl font-medium hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddCommunication}
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-all shadow-sm hover:shadow"
                >
                  Log Communication
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Upload Document Modal */}
        {showUploadModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl p-8 max-w-md w-full"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Upload Document</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Document Name</label>
                  <input
                    type="text"
                    value={uploadForm.name}
                    onChange={(e) => setUploadForm({ ...uploadForm, name: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-gray-200 focus:outline-none"
                    placeholder="e.g. Pitch Deck v3.0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={uploadForm.category}
                    onChange={(e) => setUploadForm({ ...uploadForm, category: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-gray-200 focus:outline-none"
                  >
                    <option value="Financial">Financial</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Legal">Legal</option>
                    <option value="Product">Product</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">File Type</label>
                  <select
                    value={uploadForm.type}
                    onChange={(e) => setUploadForm({ ...uploadForm, type: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-gray-200 focus:outline-none"
                  >
                    <option value="pdf">PDF</option>
                    <option value="xlsx">Excel</option>
                    <option value="pptx">PowerPoint</option>
                    <option value="mp4">Video</option>
                  </select>
                </div>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
                  <Upload className="mx-auto text-gray-400 mb-3" size={32} />
                  <p className="text-gray-600 text-sm">Click to upload or drag and drop</p>
                  <p className="text-gray-400 text-xs mt-1">Max file size: 50MB</p>
                </div>
              </div>
              <div className="flex space-x-3 mt-6">
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 rounded-xl font-medium hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUploadDocument}
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-all shadow-sm hover:shadow"
                >
                  Upload
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Valuation Calculator Modal */}
        {showValuationModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl p-8 max-w-lg w-full"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Dilution Calculator</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Pre-Money Valuation ($M)</label>
                  <input
                    type="number"
                    value={valuationForm.preMoneyValuation}
                    onChange={(e) => setValuationForm({ ...valuationForm, preMoneyValuation: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-gray-200 focus:outline-none"
                    placeholder="e.g. 8"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Investment Amount ($M)</label>
                  <input
                    type="number"
                    value={valuationForm.investment}
                    onChange={(e) => setValuationForm({ ...valuationForm, investment: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-gray-200 focus:outline-none"
                    placeholder="e.g. 2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Option Pool (%)</label>
                  <input
                    type="number"
                    value={valuationForm.optionPool}
                    onChange={(e) => setValuationForm({ ...valuationForm, optionPool: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-gray-200 focus:outline-none"
                    placeholder="e.g. 10"
                  />
                </div>

                {calculateDilution() && (
                  <div className="bg-gray-50 rounded-xl p-6 mt-6">
                    <h4 className="font-bold text-gray-900 mb-4">Results</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Pre-Money Valuation</span>
                        <span className="font-bold text-gray-900">${calculateDilution().preMoney}M</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Investment</span>
                        <span className="font-bold text-blue-600">+${calculateDilution().investment}M</span>
                      </div>
                      <div className="flex justify-between pt-3 border-t border-gray-200">
                        <span className="font-bold text-gray-900">Post-Money Valuation</span>
                        <span className="font-bold text-gray-900">${calculateDilution().postMoney}M</span>
                      </div>
                      <div className="pt-3 border-t border-gray-200">
                        <div className="flex justify-between mb-2">
                          <span className="text-gray-600">New Investor Ownership</span>
                          <span className="font-bold text-blue-600">{calculateDilution().newInvestorOwnership}%</span>
                        </div>
                        <div className="flex justify-between mb-2">
                          <span className="text-gray-600">Option Pool</span>
                          <span className="font-bold text-gray-900">{calculateDilution().optionPoolPercentage}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Founder Ownership (post)</span>
                          <span className="font-bold text-blue-600">{calculateDilution().founderOwnership}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex space-x-3 mt-6">
                <button
                  onClick={() => setShowValuationModal(false)}
                  className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-all"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CapTableFundraising;

