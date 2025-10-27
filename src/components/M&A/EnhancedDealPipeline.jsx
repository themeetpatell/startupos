import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Filter, Calendar, Clock, Users, FileText, 
  MessageSquare, Phone, Mail, ExternalLink, MoreVertical,
  ChevronDown, X, Target, BarChart3, CheckCircle, AlertCircle,
  TrendingUp, DollarSign, Building, MapPin, Star, Award,
  Zap, Bell, Bookmark, Heart, Share, Download, Upload,
  Eye, Edit, Trash2, Copy, Send, Archive, Flag, Plus,
  ArrowRight, ArrowLeft, User, UserCheck, Crown
} from 'lucide-react';

const EnhancedDealPipeline = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    stage: 'all',
    priority: 'all',
    value: 'all',
    dateRange: 'all'
  });
  const [showFilters, setShowFilters] = useState(false);
  const [selectedDeal, setSelectedDeal] = useState(null);
  const [activeStage, setActiveStage] = useState('all');
  const [showAddAction, setShowAddAction] = useState(false);
  const [showAddNote, setShowAddNote] = useState(false);
  const [showUpdateStage, setShowUpdateStage] = useState(false);
  const [showAddDocument, setShowAddDocument] = useState(false);
  const [newAction, setNewAction] = useState({ name: '', assigned: '', dueDate: '', priority: 'medium' });
  const [newNote, setNewNote] = useState('');
  const [deals, setDeals] = useState([
    {
      id: 1,
      name: 'TechFlow Solutions',
      stage: 'due-diligence',
      priority: 'high',
      value: '$45M',
      probability: 75,
      expectedClose: '2024-03-15',
      lastActivity: '2024-01-15',
      company: {
        name: 'TechFlow Solutions',
        logo: 'https://ui-avatars.com/api/?name=TechFlow&background=6366f1&color=fff',
        industry: 'AI/ML',
        location: 'San Francisco, CA',
        teamSize: 28,
        revenue: '$12.5M'
      },
      team: {
        assigned: [
          { name: 'John Smith', role: 'Lead', avatar: 'https://ui-avatars.com/api/?name=John+Smith&background=3b82f6&color=fff' },
          { name: 'Sarah Davis', role: 'Legal', avatar: 'https://ui-avatars.com/api/?name=Sarah+Davis&background=10b981&color=fff' },
          { name: 'Mike Johnson', role: 'Finance', avatar: 'https://ui-avatars.com/api/?name=Mike+Johnson&background=8b5cf6&color=fff' }
        ],
        monitored: [
          { name: 'Lisa Chen', role: 'Analyst', avatar: 'https://ui-avatars.com/api/?name=Lisa+Chen&background=ef4444&color=fff' }
        ],
        owner: { name: 'John Smith', role: 'Deal Owner', avatar: 'https://ui-avatars.com/api/?name=John+Smith&background=3b82f6&color=fff' }
      },
      nextAction: {
        name: 'Schedule management meeting',
        assigned: 'John Smith',
        dueDate: '2024-01-20',
        priority: 'high'
      },
      actions: [
        { id: 1, name: 'Schedule management meeting', assigned: 'John Smith', dueDate: '2024-01-20', priority: 'high', status: 'pending' },
        { id: 2, name: 'Review financial statements', assigned: 'Mike Johnson', dueDate: '2024-01-22', priority: 'medium', status: 'pending' },
        { id: 3, name: 'Complete IP audit', assigned: 'Sarah Davis', dueDate: '2024-01-25', priority: 'high', status: 'pending' }
      ],
      documents: {
        total: 3,
        completed: 1,
        list: [
          { id: 1, name: 'Financial Statements', status: 'completed', uploadedAt: '2024-01-10' },
          { id: 2, name: 'Legal Due Diligence', status: 'pending', uploadedAt: null },
          { id: 3, name: 'Technical Assessment', status: 'pending', uploadedAt: null }
        ]
      },
      notes: [
        { id: 1, content: 'Strong strategic fit with our AI portfolio. Management team is experienced and committed to the acquisition. Some concerns about IP protection and employee retention.', author: 'John Smith', timestamp: '2024-01-15T10:30:00Z' }
      ],
      tags: ['AI', 'Strategic', 'High Value'],
      progress: 75,
      aiNudges: [
        'Next action: Schedule term sheet call',
        'Consider reaching out to key stakeholders',
        'Review financial projections before next meeting'
      ]
    },
    {
      id: 2,
      name: 'DataViz Analytics',
      stage: 'negotiation',
      priority: 'medium',
      value: '$32M',
      probability: 60,
      expectedClose: '2024-02-28',
      lastActivity: '2024-01-14',
      company: {
        name: 'DataViz Analytics',
        logo: 'https://ui-avatars.com/api/?name=DataViz&background=10b981&color=fff',
        industry: 'Data & Analytics',
        location: 'New York, NY',
        teamSize: 45,
        revenue: '$8.2M'
      },
      team: {
        assigned: [
          { name: 'Lisa Wang', role: 'Lead', avatar: 'https://ui-avatars.com/api/?name=Lisa+Wang&background=06b6d4&color=fff' },
          { name: 'David Park', role: 'Legal', avatar: 'https://ui-avatars.com/api/?name=David+Park&background=ef4444&color=fff' }
        ],
        monitored: [],
        owner: { name: 'Lisa Wang', role: 'Deal Owner', avatar: 'https://ui-avatars.com/api/?name=Lisa+Wang&background=06b6d4&color=fff' }
      },
      nextAction: {
        name: 'Review term sheet',
        assigned: 'Lisa Wang',
        dueDate: '2024-01-18',
        priority: 'medium'
      },
      actions: [
        { id: 1, name: 'Review term sheet', assigned: 'Lisa Wang', dueDate: '2024-01-18', priority: 'medium', status: 'pending' },
        { id: 2, name: 'Schedule integration planning', assigned: 'Lisa Wang', dueDate: '2024-01-25', priority: 'low', status: 'pending' }
      ],
      documents: {
        total: 3,
        completed: 3,
        list: [
          { id: 1, name: 'Financial Statements', status: 'completed', uploadedAt: '2024-01-05' },
          { id: 2, name: 'Legal Due Diligence', status: 'completed', uploadedAt: '2024-01-08' },
          { id: 3, name: 'Technical Assessment', status: 'completed', uploadedAt: '2024-01-12' }
        ]
      },
      notes: [
        { id: 1, content: 'Good cultural fit and complementary technology. Some concerns about integration complexity.', author: 'Lisa Wang', timestamp: '2024-01-14T14:20:00Z' }
      ],
      tags: ['Data', 'Analytics', 'Medium Value'],
      progress: 60,
      aiNudges: [
        'Follow up on term sheet negotiations',
        'Schedule integration planning session'
      ]
    },
    {
      id: 3,
      name: 'GreenTech Innovations',
      stage: 'qualified',
      priority: 'low',
      value: '$18M',
      probability: 40,
      expectedClose: '2024-04-30',
      lastActivity: '2024-01-12',
      company: {
        name: 'GreenTech Innovations',
        logo: 'https://ui-avatars.com/api/?name=GreenTech&background=22c55e&color=fff',
        industry: 'CleanTech',
        location: 'Austin, TX',
        teamSize: 22,
        revenue: '$3.8M'
      },
      team: {
        assigned: [
          { name: 'Alex Kumar', role: 'Lead', avatar: 'https://ui-avatars.com/api/?name=Alex+Kumar&background=f59e0b&color=fff' }
        ],
        monitored: [],
        owner: { name: 'Alex Kumar', role: 'Deal Owner', avatar: 'https://ui-avatars.com/api/?name=Alex+Kumar&background=f59e0b&color=fff' }
      },
      nextAction: {
        name: 'Schedule initial call',
        assigned: 'Alex Kumar',
        dueDate: '2024-01-25',
        priority: 'low'
      },
      actions: [
        { id: 1, name: 'Schedule initial call', assigned: 'Alex Kumar', dueDate: '2024-01-25', priority: 'low', status: 'pending' },
        { id: 2, name: 'Request preliminary financial data', assigned: 'Alex Kumar', dueDate: '2024-01-30', priority: 'medium', status: 'pending' }
      ],
      documents: {
        total: 2,
        completed: 0,
        list: [
          { id: 1, name: 'Financial Statements', status: 'pending', uploadedAt: null },
          { id: 2, name: 'Legal Due Diligence', status: 'pending', uploadedAt: null }
        ]
      },
      notes: [
        { id: 1, content: 'Early stage company with promising technology. Requires significant due diligence.', author: 'Alex Kumar', timestamp: '2024-01-12T09:15:00Z' }
      ],
      tags: ['CleanTech', 'Early Stage', 'Low Value'],
      progress: 40,
      aiNudges: [
        'Schedule initial discovery call',
        'Request preliminary financial data'
      ]
    }
  ]);

  const stages = [
    { id: 'discovery', label: 'Discovery', color: 'gray', count: 12 },
    { id: 'contacted', label: 'Contacted', color: 'yellow', count: 8 },
    { id: 'qualified', label: 'Qualified', color: 'blue', count: 15 },
    { id: 'nda', label: 'NDA', color: 'purple', count: 6 },
    { id: 'due-diligence', label: 'Due Diligence', color: 'indigo', count: 4 },
    { id: 'negotiation', label: 'Negotiation', color: 'orange', count: 3 },
    { id: 'closing', label: 'Closing', color: 'green', count: 2 },
    { id: 'closed', label: 'Closed', color: 'emerald', count: 5 }
  ];


  const filteredDeals = useMemo(() => {
    let filtered = deals;

    // Search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(deal =>
        deal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        deal.company.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
        deal.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Stage filter
    if (activeStage !== 'all') {
      filtered = filtered.filter(deal => deal.stage === activeStage);
    }

    // Priority filter
    if (filters.priority !== 'all') {
      filtered = filtered.filter(deal => deal.priority === filters.priority);
    }

    // Value filter
    if (filters.value !== 'all') {
      filtered = filtered.filter(deal => {
        const value = parseInt(deal.value.replace('$', '').replace('M', ''));
        switch (filters.value) {
          case 'under-25m': return value < 25;
          case '25m-50m': return value >= 25 && value <= 50;
          case '50m-100m': return value > 50 && value <= 100;
          case 'over-100m': return value > 100;
          default: return true;
        }
      });
    }

    return filtered;
  }, [searchQuery, activeStage, filters]);

  const getStageColor = (stage) => {
    const stageConfig = stages.find(s => s.id === stage);
    return stageConfig ? stageConfig.color : 'gray';
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const handleMoveStage = (dealId, newStage) => {
    setDeals(prev => prev.map(deal => 
      deal.id === dealId 
        ? { ...deal, stage: newStage, lastActivity: new Date().toISOString().split('T')[0] }
        : deal
    ));
    setShowUpdateStage(false);
  };

  const handleAddDocument = (dealId, file) => {
    const newDocument = {
      id: Date.now(),
      name: file.name,
      status: 'completed',
      uploadedAt: new Date().toISOString()
    };
    
    setDeals(prev => prev.map(deal => 
      deal.id === dealId 
        ? { 
            ...deal, 
            documents: {
              ...deal.documents,
              list: [...deal.documents.list, newDocument],
              total: deal.documents.total + 1,
              completed: deal.documents.completed + 1
            }
          }
        : deal
    ));
    setShowAddDocument(false);
  };

  const handleAddAction = (dealId) => {
    if (!newAction.name.trim()) return;
    
    const action = {
      id: Date.now(),
      name: newAction.name,
      assigned: newAction.assigned,
      dueDate: newAction.dueDate,
      priority: newAction.priority,
      status: 'pending'
    };
    
    setDeals(prev => prev.map(deal => 
      deal.id === dealId 
        ? { 
            ...deal, 
            actions: [...deal.actions, action],
            nextAction: action // Set as next action
          }
        : deal
    ));
    
    setNewAction({ name: '', assigned: '', dueDate: '', priority: 'medium' });
    setShowAddAction(false);
  };

  const handleAddNotes = (dealId) => {
    if (!newNote.trim()) return;
    
    const note = {
      id: Date.now(),
      content: newNote,
      author: 'Current User',
      timestamp: new Date().toISOString()
    };
    
    setDeals(prev => prev.map(deal => 
      deal.id === dealId 
        ? { 
            ...deal, 
            notes: [...deal.notes, note]
          }
        : deal
    ));
    
    setNewNote('');
    setShowAddNote(false);
  };

  const handleConvertAIToAction = (dealId, suggestion) => {
    const action = {
      id: Date.now(),
      name: suggestion,
      assigned: 'Current User',
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 7 days from now
      priority: 'medium',
      status: 'pending'
    };
    
    setDeals(prev => prev.map(deal => 
      deal.id === dealId 
        ? { 
            ...deal, 
            actions: [...deal.actions, action]
          }
        : deal
    ));
  };

  const renderDealCard = (deal) => (
    <motion.div
      key={deal.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2, shadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
      className="bg-white rounded-lg border border-gray-200 p-3 hover:shadow-lg transition-all duration-300 cursor-pointer group"
      onClick={() => setSelectedDeal(deal)}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2">
          <img
            src={deal.company.logo}
            alt={deal.company.name}
            className="w-8 h-8 rounded-lg object-cover"
          />
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-gray-900 text-sm truncate">{deal.name}</h3>
            <p className="text-xs text-gray-600 truncate">{deal.company.industry}</p>
          </div>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(deal.priority)}`}>
          {deal.priority}
        </span>
      </div>

      {/* Deal Value & Probability */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="text-sm font-bold text-gray-900">{deal.value}</div>
          <div className="text-xs text-gray-600">Deal Value</div>
        </div>
        <div className="text-right">
          <div className="text-sm font-bold text-blue-600">{deal.probability}%</div>
          <div className="text-xs text-gray-600">Probability</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-3">
        <div className="flex items-center justify-between text-xs mb-1">
          <span className="text-gray-600">Progress</span>
          <span className="font-semibold text-gray-900">{deal.progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${deal.progress}%` }}
          ></div>
        </div>
      </div>

      {/* Team & Documents */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <div className="flex -space-x-1">
            {deal.team.assigned.slice(0, 3).map((member, index) => (
              <img
                key={index}
                src={member.avatar}
                alt={member.name}
                className="w-6 h-6 rounded-full border-2 border-white"
              />
            ))}
            {deal.team.assigned.length > 3 && (
              <div className="w-6 h-6 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-xs text-gray-600">
                +{deal.team.assigned.length - 3}
              </div>
            )}
          </div>
          <span className="text-xs text-gray-600">Team</span>
        </div>
        <div className="flex items-center space-x-1">
          <FileText size={12} className="text-gray-400" />
          <span className="text-xs font-semibold text-gray-900">
            {deal.documents.completed}/{deal.documents.total}
          </span>
        </div>
      </div>

      {/* Next Action */}
      <div className="mb-3">
        <div className="flex items-center space-x-1 mb-1">
          <Target size={12} className="text-gray-400" />
          <span className="text-xs text-gray-600">Next Action</span>
        </div>
        <p className="text-xs text-gray-900 font-medium mb-1 truncate">{deal.nextAction.name}</p>
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500 truncate">{deal.nextAction.assigned}</span>
          <span className="text-xs text-gray-500">{deal.nextAction.dueDate}</span>
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1">
        {deal.tags.slice(0, 2).map((tag, index) => (
          <span
            key={index}
            className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
          >
            {tag}
          </span>
        ))}
        {deal.tags.length > 2 && (
          <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
            +{deal.tags.length - 2}
          </span>
        )}
      </div>
    </motion.div>
  );

  const renderDetailedDeal = (deal) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={() => setSelectedDeal(null)}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-8">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-start space-x-6">
              <img
                src={deal.company.logo}
                alt={deal.company.name}
                className="w-20 h-20 rounded-2xl object-cover"
              />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{deal.name}</h1>
                <p className="text-xl text-gray-600 mt-1">{deal.company.industry}</p>
                <div className="flex items-center space-x-4 mt-4">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <MapPin size={16} />
                    <span>{deal.company.location}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Users size={16} />
                    <span>{deal.company.teamSize} employees</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <DollarSign size={16} />
                    <span>{deal.company.revenue} revenue</span>
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={() => setSelectedDeal(null)}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
            >
              <X size={24} />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* Deal Overview */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Deal Overview</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm text-gray-600">Deal Value</div>
                    <div className="text-2xl font-bold text-gray-900">{deal.value}</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm text-gray-600">Probability</div>
                    <div className="text-2xl font-bold text-blue-600">{deal.probability}%</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm text-gray-600">Expected Close</div>
                    <div className="text-lg font-bold text-gray-900">{deal.expectedClose}</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm text-gray-600">Last Activity</div>
                    <div className="text-lg font-bold text-gray-900">{deal.lastActivity}</div>
                  </div>
                </div>
              </div>

              {/* Team */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Team</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-700 mb-2">Assigned</h3>
                    <div className="space-y-2">
                      {deal.team.assigned.map((member, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <img src={member.avatar} alt={member.name} className="w-8 h-8 rounded-full" />
                          <div>
                            <div className="font-medium text-gray-900">{member.name}</div>
                            <div className="text-sm text-gray-600">{member.role}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  {deal.team.monitored.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-gray-700 mb-2">Monitored</h3>
                      <div className="space-y-2">
                        {deal.team.monitored.map((member, index) => (
                          <div key={index} className="flex items-center space-x-3">
                            <img src={member.avatar} alt={member.name} className="w-8 h-8 rounded-full" />
                            <div>
                              <div className="font-medium text-gray-900">{member.name}</div>
                              <div className="text-sm text-gray-600">{member.role}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  <div>
                    <h3 className="font-semibold text-gray-700 mb-2">Owner</h3>
                    <div className="flex items-center space-x-3">
                      <img src={deal.team.owner.avatar} alt={deal.team.owner.name} className="w-8 h-8 rounded-full" />
                      <div>
                        <div className="font-medium text-gray-900">{deal.team.owner.name}</div>
                        <div className="text-sm text-gray-600">{deal.team.owner.role}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Actions</h2>
                <div className="space-y-3">
                  {deal.actions.map((action, index) => (
                    <div key={action.id} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-gray-900">{action.name}</h3>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(action.priority)}`}>
                            {action.priority}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            action.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {action.status}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Assigned: {action.assigned}</span>
                        <span>Due: {action.dueDate}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Documents */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Documents</h2>
                <div className="space-y-2">
                  {deal.documents.list.map((doc, index) => (
                    <div key={doc.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <FileText size={16} className="text-gray-400" />
                        <div>
                          <span className="text-gray-900">{doc.name}</span>
                          {doc.uploadedAt && (
                            <p className="text-xs text-gray-500">Uploaded: {new Date(doc.uploadedAt).toLocaleDateString()}</p>
                          )}
                        </div>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        doc.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {doc.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Notes</h2>
                <div className="space-y-3">
                  {deal.notes.map((note, index) => (
                    <div key={note.id} className="bg-gray-50 rounded-lg p-4">
                      <p className="text-gray-900 mb-2">{note.content}</p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>By: {note.author}</span>
                        <span>{new Date(note.timestamp).toLocaleString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {/* Quick Actions */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowUpdateStage(true)}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <ArrowRight size={16} />
                    <span>Update Stage</span>
                  </motion.button>
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowAddDocument(true)}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <FileText size={16} />
                    <span>Add Document</span>
                  </motion.button>
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowAddAction(true)}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    <Target size={16} />
                    <span>Add Action</span>
                  </motion.button>
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowAddNote(true)}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                  >
                    <Edit size={16} />
                    <span>Add Notes</span>
                  </motion.button>
                </div>
              </div>

              {/* AI Nudges */}
              {deal.aiNudges.length > 0 && (
                <div className="bg-blue-50 rounded-xl p-6">
                  <h3 className="font-bold text-gray-900 mb-4">AI Suggestions</h3>
                  <div className="space-y-2">
                    {deal.aiNudges.map((nudge, index) => (
                      <div key={index} className="flex items-start justify-between space-x-2 text-sm text-blue-800">
                        <div className="flex items-start space-x-2">
                          <Zap size={16} className="text-blue-600 mt-0.5" />
                          <span>{nudge}</span>
                        </div>
                        <button
                          onClick={() => handleConvertAIToAction(deal.id, nudge)}
                          className="text-blue-600 hover:text-blue-800 text-xs font-medium"
                        >
                          Convert to Action
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search deals by name, sector, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
              />
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <Filter size={20} />
              <span>Filters</span>
              <ChevronDown size={16} className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>

        {/* Filters Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 pt-4 border-t border-gray-200"
            >
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                  <select
                    value={filters.priority}
                    onChange={(e) => setFilters(prev => ({ ...prev, priority: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="all">All Priorities</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Deal Value</label>
                  <select
                    value={filters.value}
                    onChange={(e) => setFilters(prev => ({ ...prev, value: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="all">All Values</option>
                    <option value="under-25m">Under $25M</option>
                    <option value="25m-50m">$25M - $50M</option>
                    <option value="50m-100m">$50M - $100M</option>
                    <option value="over-100m">Over $100M</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
                  <select
                    value={filters.dateRange}
                    onChange={(e) => setFilters(prev => ({ ...prev, dateRange: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="all">All Time</option>
                    <option value="last-7-days">Last 7 Days</option>
                    <option value="last-30-days">Last 30 Days</option>
                    <option value="last-90-days">Last 90 Days</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Stage Tabs */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="overflow-x-auto">
          <div className="flex gap-2 min-w-max">
            <button
              onClick={() => setActiveStage('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                activeStage === 'all'
                  ? 'bg-blue-100 text-blue-700 border border-blue-200'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              All Stages ({deals.length})
            </button>
            {stages.map((stage) => (
              <button
                key={stage.id}
                onClick={() => setActiveStage(stage.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                  activeStage === stage.id
                    ? 'bg-blue-100 text-blue-700 border border-blue-200'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {stage.label} ({stage.count})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="mb-4">
        <p className="text-gray-600">
          Showing {filteredDeals.length} deals out of {deals.length}
        </p>
      </div>

      {/* Kanban Board */}
      <div className="relative">
        <div className="overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          <div className="flex gap-6 min-w-max px-2">
            {stages.map((stage) => {
              const stageDeals = filteredDeals.filter(deal => deal.stage === stage.id);
              const stageColor = getStageColor(stage.id);
              return (
                <div key={stage.id} className="bg-gray-50 rounded-xl p-4 min-h-[600px] w-80 flex-shrink-0 border border-gray-200">
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-200">
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full bg-${stageColor}-500`}></div>
                      <h3 className="font-semibold text-gray-900">{stage.label}</h3>
                    </div>
                    <span className="text-sm text-gray-600 bg-white px-3 py-1 rounded-full border border-gray-200 font-medium">
                      {stageDeals.length}
                    </span>
                  </div>
                  <div className="space-y-3">
                    {stageDeals.map(renderDealCard)}
                    {stageDeals.length === 0 && (
                      <div className="text-center py-12 text-gray-500">
                        <div className="w-16 h-16 bg-gray-200 rounded-xl flex items-center justify-center mx-auto mb-3">
                          <Target size={24} className="text-gray-400" />
                        </div>
                        <p className="text-sm font-medium">No deals in this stage</p>
                        <p className="text-xs text-gray-400 mt-1">Deals will appear here when added</p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Scroll Indicators */}
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent pointer-events-none z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none z-10"></div>
      </div>

      {/* Empty State */}
      {filteredDeals.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search size={32} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No deals found</h3>
          <p className="text-gray-600">Try adjusting your search or filters</p>
        </div>
      )}

      {/* Detailed Deal Modal */}
      <AnimatePresence>
        {selectedDeal && renderDetailedDeal(selectedDeal)}
      </AnimatePresence>

      {/* Update Stage Modal */}
      <AnimatePresence>
        {showUpdateStage && selectedDeal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowUpdateStage(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-xl p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-bold text-gray-900 mb-4">Update Stage</h3>
              <div className="space-y-3">
                {stages.map((stage) => (
                  <button
                    key={stage.id}
                    onClick={() => handleMoveStage(selectedDeal.id, stage.id)}
                    className={`w-full text-left p-3 rounded-lg border transition-colors ${
                      selectedDeal.stage === stage.id
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full bg-${stage.color}-500`}></div>
                      <span className="font-medium">{stage.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Action Modal */}
      <AnimatePresence>
        {showAddAction && selectedDeal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowAddAction(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-xl p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-bold text-gray-900 mb-4">Add Action</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Action Name</label>
                  <input
                    type="text"
                    value={newAction.name}
                    onChange={(e) => setNewAction(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter action name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Assigned To</label>
                  <input
                    type="text"
                    value={newAction.assigned}
                    onChange={(e) => setNewAction(prev => ({ ...prev, assigned: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter assignee name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Due Date</label>
                  <input
                    type="date"
                    value={newAction.dueDate}
                    onChange={(e) => setNewAction(prev => ({ ...prev, dueDate: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                  <select
                    value={newAction.priority}
                    onChange={(e) => setNewAction(prev => ({ ...prev, priority: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowAddAction(false)}
                    className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleAddAction(selectedDeal.id)}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Add Action
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Note Modal */}
      <AnimatePresence>
        {showAddNote && selectedDeal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowAddNote(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-xl p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-bold text-gray-900 mb-4">Add Note</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Note</label>
                  <textarea
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-24"
                    placeholder="Enter your note..."
                  />
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowAddNote(false)}
                    className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleAddNotes(selectedDeal.id)}
                    className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
                  >
                    Add Note
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Document Modal */}
      <AnimatePresence>
        {showAddDocument && selectedDeal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowAddDocument(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-xl p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-bold text-gray-900 mb-4">Add Document</h3>
              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload size={32} className="text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600 mb-2">Drop files here or click to upload</p>
                  <input
                    type="file"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        handleAddDocument(selectedDeal.id, file);
                      }
                    }}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                  >
                    Choose File
                  </label>
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowAddDocument(false)}
                    className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EnhancedDealPipeline;