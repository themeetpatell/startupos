import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield,
  CheckCircle,
  AlertCircle,
  XCircle,
  Clock,
  Star,
  TrendingUp,
  BarChart3,
  FileText,
  Users,
  Building,
  DollarSign,
  Lock,
  Award,
  Target,
  Zap,
  Settings,
  Download,
  Share2,
  Plus,
  Edit,
  Eye,
  X,
  ArrowRight
} from 'lucide-react';
import '../../App.css';

const ReadinessAssessment = () => {
  const [activeCategory, setActiveCategory] = useState('overview');
  const [selectedAssessment, setSelectedAssessment] = useState(null);
  const [showAssessmentModal, setShowAssessmentModal] = useState(false);
  const [assessmentData, setAssessmentData] = useState({
    overallScore: 78,
    categories: {
      financial: { score: 85, status: 'good', items: 12, completed: 10 },
      legal: { score: 72, status: 'warning', items: 8, completed: 6 },
      operational: { score: 91, status: 'excellent', items: 15, completed: 14 },
      technical: { score: 68, status: 'warning', items: 10, completed: 7 },
      compliance: { score: 95, status: 'excellent', items: 6, completed: 6 },
      humanResources: { score: 79, status: 'good', items: 9, completed: 7 }
    }
  });

  const categories = [
    { id: 'overview', name: 'Overview', icon: BarChart3, color: 'blue' },
    { id: 'financial', name: 'Financial', icon: DollarSign, color: 'green' },
    { id: 'legal', name: 'Legal', icon: Shield, color: 'purple' },
    { id: 'operational', name: 'Operational', icon: Building, color: 'orange' },
    { id: 'technical', name: 'Technical', icon: Zap, color: 'indigo' },
    { id: 'compliance', name: 'Compliance', icon: Award, color: 'red' },
    { id: 'humanResources', name: 'HR', icon: Users, color: 'pink' }
  ];

  const assessmentItems = {
    financial: [
      { id: 1, name: 'Financial Audits', status: 'completed', priority: 'high', description: 'Annual financial audits completed and up to date' },
      { id: 2, name: 'Financial Models', status: 'completed', priority: 'high', description: 'Detailed financial models and projections' },
      { id: 3, name: 'Revenue Recognition', status: 'completed', priority: 'medium', description: 'Proper revenue recognition policies in place' },
      { id: 4, name: 'Cost Structure', status: 'completed', priority: 'medium', description: 'Clear cost structure and allocation methods' },
      { id: 5, name: 'Cash Flow Management', status: 'completed', priority: 'high', description: 'Robust cash flow management systems' },
      { id: 6, name: 'Budgeting Process', status: 'completed', priority: 'medium', description: 'Comprehensive budgeting and forecasting process' },
      { id: 7, name: 'Financial Controls', status: 'completed', priority: 'high', description: 'Internal financial controls and procedures' },
      { id: 8, name: 'Tax Compliance', status: 'completed', priority: 'high', description: 'Tax compliance and documentation' },
      { id: 9, name: 'Debt Management', status: 'completed', priority: 'medium', description: 'Debt structure and management' },
      { id: 10, name: 'Asset Valuation', status: 'completed', priority: 'medium', description: 'Asset valuation and depreciation schedules' },
      { id: 11, name: 'Financial Reporting', status: 'in-progress', priority: 'high', description: 'Monthly financial reporting process' },
      { id: 12, name: 'Investor Relations', status: 'pending', priority: 'low', description: 'Investor relations and communication' }
    ],
    legal: [
      { id: 1, name: 'Corporate Structure', status: 'completed', priority: 'high', description: 'Proper corporate structure and governance' },
      { id: 2, name: 'IP Protection', status: 'completed', priority: 'high', description: 'Intellectual property protection and registration' },
      { id: 3, name: 'Contract Management', status: 'completed', priority: 'high', description: 'Customer and vendor contract management' },
      { id: 4, name: 'Employment Agreements', status: 'completed', priority: 'medium', description: 'Employee agreements and policies' },
      { id: 5, name: 'Regulatory Compliance', status: 'in-progress', priority: 'high', description: 'Industry-specific regulatory compliance' },
      { id: 6, name: 'Litigation History', status: 'completed', priority: 'medium', description: 'Litigation history and risk assessment' },
      { id: 7, name: 'Data Privacy', status: 'pending', priority: 'high', description: 'Data privacy and protection policies' },
      { id: 8, name: 'Environmental Compliance', status: 'pending', priority: 'low', description: 'Environmental compliance and permits' }
    ],
    operational: [
      { id: 1, name: 'Business Processes', status: 'completed', priority: 'high', description: 'Documented business processes and procedures' },
      { id: 2, name: 'Customer Contracts', status: 'completed', priority: 'high', description: 'Customer contract management system' },
      { id: 3, name: 'Vendor Management', status: 'completed', priority: 'medium', description: 'Vendor and supplier management' },
      { id: 4, name: 'Inventory Management', status: 'completed', priority: 'medium', description: 'Inventory and supply chain management' },
      { id: 5, name: 'Quality Control', status: 'completed', priority: 'high', description: 'Quality control and assurance processes' },
      { id: 6, name: 'Performance Metrics', status: 'completed', priority: 'medium', description: 'Key performance indicators and metrics' },
      { id: 7, name: 'Risk Management', status: 'completed', priority: 'high', description: 'Risk management framework and processes' },
      { id: 8, name: 'Change Management', status: 'completed', priority: 'medium', description: 'Change management and communication' },
      { id: 9, name: 'Project Management', status: 'completed', priority: 'medium', description: 'Project management methodologies' },
      { id: 10, name: 'Resource Planning', status: 'completed', priority: 'medium', description: 'Resource planning and allocation' },
      { id: 11, name: 'Capacity Planning', status: 'completed', priority: 'medium', description: 'Capacity planning and scalability' },
      { id: 12, name: 'Continuity Planning', status: 'completed', priority: 'high', description: 'Business continuity and disaster recovery' },
      { id: 13, name: 'Performance Reviews', status: 'completed', priority: 'medium', description: 'Regular performance reviews and feedback' },
      { id: 14, name: 'Training Programs', status: 'completed', priority: 'low', description: 'Employee training and development programs' },
      { id: 15, name: 'Succession Planning', status: 'in-progress', priority: 'low', description: 'Succession planning and leadership development' }
    ],
    technical: [
      { id: 1, name: 'IT Infrastructure', status: 'completed', priority: 'high', description: 'Robust IT infrastructure and systems' },
      { id: 2, name: 'Data Security', status: 'completed', priority: 'high', description: 'Data security and protection measures' },
      { id: 3, name: 'System Integration', status: 'completed', priority: 'medium', description: 'System integration and APIs' },
      { id: 4, name: 'Cloud Migration', status: 'in-progress', priority: 'medium', description: 'Cloud migration and optimization' },
      { id: 5, name: 'Backup Systems', status: 'completed', priority: 'high', description: 'Backup and recovery systems' },
      { id: 6, name: 'Network Security', status: 'in-progress', priority: 'high', description: 'Network security and monitoring' },
      { id: 7, name: 'Software Licenses', status: 'completed', priority: 'medium', description: 'Software licensing and compliance' },
      { id: 8, name: 'Hardware Inventory', status: 'completed', priority: 'low', description: 'Hardware inventory and asset management' },
      { id: 9, name: 'Technical Documentation', status: 'pending', priority: 'medium', description: 'Technical documentation and procedures' },
      { id: 10, name: 'Vendor Support', status: 'pending', priority: 'low', description: 'Vendor support and maintenance contracts' }
    ],
    compliance: [
      { id: 1, name: 'SOC 2 Compliance', status: 'completed', priority: 'high', description: 'SOC 2 Type II compliance certification' },
      { id: 2, name: 'GDPR Compliance', status: 'completed', priority: 'high', description: 'GDPR and data privacy compliance' },
      { id: 3, name: 'Industry Standards', status: 'completed', priority: 'high', description: 'Industry-specific compliance standards' },
      { id: 4, name: 'Audit Trail', status: 'completed', priority: 'medium', description: 'Comprehensive audit trail and logging' },
      { id: 5, name: 'Policy Documentation', status: 'completed', priority: 'medium', description: 'Comprehensive policy documentation' },
      { id: 6, name: 'Training Compliance', status: 'completed', priority: 'low', description: 'Compliance training and awareness' }
    ],
    humanResources: [
      { id: 1, name: 'Employee Handbook', status: 'completed', priority: 'high', description: 'Comprehensive employee handbook' },
      { id: 2, name: 'Employment Agreements', status: 'completed', priority: 'high', description: 'Standard employment agreements' },
      { id: 3, name: 'Benefits Package', status: 'completed', priority: 'medium', description: 'Competitive benefits package' },
      { id: 4, name: 'Performance Management', status: 'completed', priority: 'medium', description: 'Performance management system' },
      { id: 5, name: 'Compensation Structure', status: 'completed', priority: 'medium', description: 'Clear compensation structure' },
      { id: 6, name: 'Employee Development', status: 'in-progress', priority: 'low', description: 'Employee development programs' },
      { id: 7, name: 'Diversity & Inclusion', status: 'completed', priority: 'low', description: 'Diversity and inclusion policies' },
      { id: 8, name: 'Workplace Safety', status: 'completed', priority: 'medium', description: 'Workplace safety and health' },
      { id: 9, name: 'Employee Relations', status: 'pending', priority: 'low', description: 'Employee relations and communication' }
    ]
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-50';
      case 'in-progress': return 'text-yellow-600 bg-yellow-50';
      case 'pending': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle size={16} />;
      case 'in-progress': return <Clock size={16} />;
      case 'pending': return <AlertCircle size={16} />;
      default: return <XCircle size={16} />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Overall Score */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">Overall Readiness Score</h3>
            <p className="text-gray-600">Your company's M&A readiness assessment</p>
          </div>
          <motion.button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Generate Report
          </motion.button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="relative w-32 h-32 mx-auto mb-4">
              <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
                <circle
                  cx="60"
                  cy="60"
                  r="54"
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="8"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="54"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="8"
                  strokeDasharray={`${(assessmentData.overallScore / 100) * 339.292} 339.292`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-gray-900">{assessmentData.overallScore}%</span>
              </div>
            </div>
            <p className="text-lg font-semibold text-gray-900">Overall Score</p>
            <p className="text-sm text-gray-600">M&A Readiness</p>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Category Breakdown</h4>
            {Object.entries(assessmentData.categories).map(([key, category]) => (
              <div key={key} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    category.status === 'excellent' ? 'bg-green-500' : 
                    category.status === 'good' ? 'bg-blue-500' : 
                    category.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                  }`}></div>
                  <span className="text-sm font-medium capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-16 bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        category.status === 'excellent' ? 'bg-green-500' :
                        category.status === 'good' ? 'bg-blue-500' :
                        category.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${category.score}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">{category.score}%</span>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Recommendations</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <AlertCircle className="text-yellow-500 mt-1" size={16} />
                <div>
                  <p className="text-sm font-medium">Legal Documentation</p>
                  <p className="text-xs text-gray-600">Complete IP protection and data privacy policies</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <AlertCircle className="text-yellow-500 mt-1" size={16} />
                <div>
                  <p className="text-sm font-medium">Technical Infrastructure</p>
                  <p className="text-xs text-gray-600">Improve network security and technical documentation</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="text-green-500 mt-1" size={16} />
                <div>
                  <p className="text-sm font-medium">Financial Readiness</p>
                  <p className="text-xs text-gray-600">Strong financial foundation and controls</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 cursor-pointer"
          whileHover={{ y: -2, scale: 1.02 }}
          onClick={() => setActiveCategory('legal')}
        >
          <div className="flex items-center space-x-3 mb-4">
            <Shield className="text-purple-600" size={24} />
            <h4 className="font-semibold text-gray-900">Legal Review</h4>
          </div>
          <p className="text-sm text-gray-600 mb-4">Review legal documentation and compliance requirements</p>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">{assessmentData.categories.legal.completed}/{assessmentData.categories.legal.items} items</span>
            <ArrowRight size={16} className="text-gray-400" />
          </div>
        </motion.div>

        <motion.div
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 cursor-pointer"
          whileHover={{ y: -2, scale: 1.02 }}
          onClick={() => setActiveCategory('technical')}
        >
          <div className="flex items-center space-x-3 mb-4">
            <Zap className="text-indigo-600" size={24} />
            <h4 className="font-semibold text-gray-900">Technical Assessment</h4>
          </div>
          <p className="text-sm text-gray-600 mb-4">Evaluate technical infrastructure and security</p>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">{assessmentData.categories.technical.completed}/{assessmentData.categories.technical.items} items</span>
            <ArrowRight size={16} className="text-gray-400" />
          </div>
        </motion.div>

        <motion.div
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 cursor-pointer"
          whileHover={{ y: -2, scale: 1.02 }}
          onClick={() => setActiveCategory('financial')}
        >
          <div className="flex items-center space-x-3 mb-4">
            <DollarSign className="text-green-600" size={24} />
            <h4 className="font-semibold text-gray-900">Financial Review</h4>
          </div>
          <p className="text-sm text-gray-600 mb-4">Review financial statements and projections</p>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">{assessmentData.categories.financial.completed}/{assessmentData.categories.financial.items} items</span>
            <ArrowRight size={16} className="text-gray-400" />
          </div>
        </motion.div>
      </div>
    </div>
  );

  const renderCategoryDetails = (categoryId) => {
    const category = categories.find(c => c.id === categoryId);
    const items = assessmentItems[categoryId];
    const categoryData = assessmentData.categories[categoryId];

    return (
      <div className="space-y-6">
        {/* Category Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                category?.color === 'blue' ? 'bg-blue-100' :
                category?.color === 'green' ? 'bg-green-100' :
                category?.color === 'purple' ? 'bg-purple-100' :
                category?.color === 'orange' ? 'bg-orange-100' : 'bg-gray-100'
              }`}>
                {(() => {
                  const Icon = category?.icon;
                  return Icon ? <Icon className={`${
                    category?.color === 'blue' ? 'text-blue-600' :
                    category?.color === 'green' ? 'text-green-600' :
                    category?.color === 'purple' ? 'text-purple-600' :
                    category?.color === 'orange' ? 'text-orange-600' : 'text-gray-600'
                  }`} size={24} /> : null;
                })()}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{category?.name} Assessment</h3>
                <p className="text-gray-600">Review and update {category?.name.toLowerCase()} readiness items</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">{categoryData?.score}%</div>
              <div className="text-sm text-gray-600">Completion Rate</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{categoryData?.completed}</div>
              <div className="text-sm text-gray-600">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{categoryData?.items - categoryData?.completed}</div>
              <div className="text-sm text-gray-600">Remaining</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{categoryData?.items}</div>
              <div className="text-sm text-gray-600">Total Items</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{Math.round((categoryData?.completed / categoryData?.items) * 100)}%</div>
              <div className="text-sm text-gray-600">Progress</div>
            </div>
          </div>
        </div>

        {/* Assessment Items */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-lg font-semibold text-gray-900">Assessment Items</h4>
            <motion.button
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Add Item
            </motion.button>
          </div>

          <div className="space-y-4">
            {items?.map((item) => (
              <motion.div
                key={item.id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all cursor-pointer"
                whileHover={{ y: -1 }}
                onClick={() => {
                  setSelectedAssessment(item);
                  setShowAssessmentModal(true);
                }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      {getStatusIcon(item.status)}
                      <h5 className="font-medium text-gray-900">{item.name}</h5>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                        {item.status}
                      </span>
                      <span className={`text-xs font-medium ${getPriorityColor(item.priority)}`}>
                        {item.priority} priority
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <motion.button
                      className="p-1 text-gray-400 hover:text-blue-600"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Edit size={16} />
                    </motion.button>
                    <motion.button
                      className="p-1 text-gray-400 hover:text-green-600"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Eye size={16} />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderAssessmentModal = () => (
    <AnimatePresence>
      {showAssessmentModal && selectedAssessment && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowAssessmentModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-xl shadow-xl max-w-2xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{selectedAssessment.name}</h3>
                  <p className="text-gray-600">Assessment item details</p>
                </div>
                <motion.button
                  onClick={() => setShowAssessmentModal(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-lg transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X size={20} />
                </motion.button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="completed">Completed</option>
                  <option value="in-progress">In Progress</option>
                  <option value="pending">Pending</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  defaultValue={selectedAssessment.description}
                />
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                <motion.button
                  onClick={() => setShowAssessmentModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cancel
                </motion.button>
                <motion.button
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Save Changes
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="space-y-6">
      {/* Category Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-2">
        <div className="flex space-x-1 overflow-x-auto">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <motion.button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-all whitespace-nowrap ${
                  activeCategory === category.id
                    ? `${
                        category.color === 'blue' ? 'bg-blue-50 text-blue-600' :
                        category.color === 'green' ? 'bg-green-50 text-green-600' :
                        category.color === 'purple' ? 'bg-purple-50 text-purple-600' :
                        category.color === 'orange' ? 'bg-orange-50 text-orange-600' :
                        'bg-gray-50 text-gray-600'
                      }`
                    : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Icon size={18} />
                <span className="font-medium">{category.name}</span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {activeCategory === 'overview' ? renderOverview() : renderCategoryDetails(activeCategory)}
        </motion.div>
      </AnimatePresence>

      {/* Assessment Modal */}
      {renderAssessmentModal()}
    </div>
  );
};

export default ReadinessAssessment; 