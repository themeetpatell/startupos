import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft,
  Save,
  Play,
  Eye,
  Code,
  Settings,
  Plus,
  Trash2,
  Copy,
  Download,
  Upload,
  Brain,
  MessageSquare,
  BarChart3,
  Target,
  DollarSign,
  Users,
  Shield,
  Zap,
  CheckCircle,
  AlertCircle,
  Clock,
  Star,
  TrendingUp,
  FileText
} from 'lucide-react';
import '../App.css';

const ToolBuilder = ({ onBack, onSave }) => {
  const [activeStep, setActiveStep] = useState(1);
  const [toolData, setToolData] = useState({
    name: '',
    description: '',
    category: '',
    pricing: 'free',
    features: [],
    prompts: [],
    integrations: [],
    isPublic: true
  });
  const [previewMode, setPreviewMode] = useState(false);

  const categories = [
    { id: 'finance', name: 'Finance', icon: DollarSign, color: 'green' },
    { id: 'marketing', name: 'Marketing', icon: Target, color: 'purple' },
    { id: 'product', name: 'Product', icon: Brain, color: 'blue' },
    { id: 'operations', name: 'Operations', icon: Users, color: 'orange' },
    { id: 'analytics', name: 'Analytics', icon: BarChart3, color: 'indigo' },
    { id: 'legal', name: 'Legal', icon: Shield, color: 'red' },
    { id: 'hr', name: 'HR & Hiring', icon: Users, color: 'pink' },
    { id: 'sales', name: 'Sales', icon: TrendingUp, color: 'teal' },
    { id: 'development', name: 'Development', icon: Code, color: 'gray' }
  ];

  const pricingOptions = [
    { id: 'free', name: 'Free', description: 'Available to everyone' },
    { id: 'freemium', name: 'Freemium', description: 'Basic free, premium paid' },
    { id: 'paid', name: 'Paid', description: 'Subscription or one-time payment' },
    { id: 'enterprise', name: 'Enterprise', description: 'Custom pricing for large teams' }
  ];

  const steps = [
    { id: 1, name: 'Basic Info', icon: Brain },
    { id: 2, name: 'Features', icon: Settings },
    { id: 3, name: 'AI Prompts', icon: MessageSquare },
    { id: 4, name: 'Integrations', icon: Zap },
    { id: 5, name: 'Preview', icon: Eye }
  ];

  const handleInputChange = (field, value) => {
    setToolData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addFeature = () => {
    setToolData(prev => ({
      ...prev,
      features: [...prev.features, { id: Date.now(), name: '', description: '' }]
    }));
  };

  const updateFeature = (id, field, value) => {
    setToolData(prev => ({
      ...prev,
      features: prev.features.map(f => 
        f.id === id ? { ...f, [field]: value } : f
      )
    }));
  };

  const removeFeature = (id) => {
    setToolData(prev => ({
      ...prev,
      features: prev.features.filter(f => f.id !== id)
    }));
  };

  const addPrompt = () => {
    setToolData(prev => ({
      ...prev,
      prompts: [...prev.prompts, { id: Date.now(), name: '', prompt: '', type: 'input' }]
    }));
  };

  const updatePrompt = (id, field, value) => {
    setToolData(prev => ({
      ...prev,
      prompts: prev.prompts.map(p => 
        p.id === id ? { ...p, [field]: value } : p
      )
    }));
  };

  const removePrompt = (id) => {
    setToolData(prev => ({
      ...prev,
      prompts: prev.prompts.filter(p => p.id !== id)
    }));
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tool Name</label>
              <input
                type="text"
                value={toolData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Enter your tool name"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                rows={4}
                value={toolData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Describe what your tool does and how it helps users"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <div className="grid grid-cols-3 gap-3">
                {categories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <motion.button
                      key={category.id}
                      onClick={() => handleInputChange('category', category.id)}
                      className={`p-4 border rounded-lg text-center transition-all ${
                        toolData.category === category.id
                          ? 'border-blue-500 bg-blue-50 text-blue-600'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Icon className={`mx-auto mb-2 text-${category.color}-500`} size={24} />
                      <span className="text-sm font-medium">{category.name}</span>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Pricing Model</label>
              <div className="space-y-3">
                {pricingOptions.map((option) => (
                  <motion.button
                    key={option.id}
                    onClick={() => handleInputChange('pricing', option.id)}
                    className={`w-full p-4 border rounded-lg text-left transition-all ${
                      toolData.pricing === option.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">{option.name}</h4>
                        <p className="text-sm text-gray-600">{option.description}</p>
                      </div>
                      {toolData.pricing === option.id && (
                        <CheckCircle className="text-blue-500" size={20} />
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Tool Features</h3>
              <motion.button
                onClick={addFeature}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Plus size={18} />
                <span>Add Feature</span>
              </motion.button>
            </div>

            <div className="space-y-4">
              {toolData.features.map((feature) => (
                <motion.div
                  key={feature.id}
                  className="bg-white border border-gray-200 rounded-lg p-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-1 space-y-3">
                      <input
                        type="text"
                        value={feature.name}
                        onChange={(e) => updateFeature(feature.id, 'name', e.target.value)}
                        placeholder="Feature name"
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <textarea
                        rows={2}
                        value={feature.description}
                        onChange={(e) => updateFeature(feature.id, 'description', e.target.value)}
                        placeholder="Describe what this feature does"
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <motion.button
                      onClick={() => removeFeature(feature.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Trash2 size={18} />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">AI Prompts</h3>
              <motion.button
                onClick={addPrompt}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Plus size={18} />
                <span>Add Prompt</span>
              </motion.button>
            </div>

            <div className="space-y-4">
              {toolData.prompts.map((prompt) => (
                <motion.div
                  key={prompt.id}
                  className="bg-white border border-gray-200 rounded-lg p-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <input
                        type="text"
                        value={prompt.name}
                        onChange={(e) => updatePrompt(prompt.id, 'name', e.target.value)}
                        placeholder="Prompt name"
                        className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <select
                        value={prompt.type}
                        onChange={(e) => updatePrompt(prompt.id, 'type', e.target.value)}
                        className="ml-3 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="input">Input</option>
                        <option value="output">Output</option>
                        <option value="system">System</option>
                      </select>
                      <motion.button
                        onClick={() => removePrompt(prompt.id)}
                        className="ml-3 p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Trash2 size={18} />
                      </motion.button>
                    </div>
                    <textarea
                      rows={4}
                      value={prompt.prompt}
                      onChange={(e) => updatePrompt(prompt.id, 'prompt', e.target.value)}
                      placeholder="Enter your AI prompt here..."
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Integrations</h3>
              <p className="text-gray-700 mb-6">
                Connect your AI tool with other platforms and services to enhance its functionality.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { name: 'Slack', icon: MessageSquare, color: 'purple' },
                  { name: 'Zapier', icon: Zap, color: 'orange' },
                  { name: 'Google Sheets', icon: BarChart3, color: 'green' },
                  { name: 'Notion', icon: FileText, color: 'gray' },
                  { name: 'HubSpot', icon: Target, color: 'blue' },
                  { name: 'Salesforce', icon: TrendingUp, color: 'indigo' },
                  { name: 'Stripe', icon: DollarSign, color: 'emerald' },
                  { name: 'Custom API', icon: Code, color: 'red' }
                ].map((integration) => {
                  const Icon = integration.icon;
                  return (
                    <motion.button
                      key={integration.name}
                      className="p-4 border border-gray-200 rounded-lg text-center hover:border-blue-300 hover:bg-blue-50 transition-all"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Icon className={`mx-auto mb-2 text-${integration.color}-500`} size={24} />
                      <span className="text-sm font-medium">{integration.name}</span>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Preview Your Tool</h3>
              <div className="flex items-center space-x-3">
                <motion.button
                  onClick={() => setPreviewMode(!previewMode)}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Eye size={18} />
                  <span>{previewMode ? 'Edit' : 'Preview'}</span>
                </motion.button>
                <motion.button
                  onClick={() => onSave(toolData)}
                  className="flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Save size={18} />
                  <span>Publish Tool</span>
                </motion.button>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-start space-x-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Brain className="text-white" size={24} />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900">{toolData.name || 'Your Tool Name'}</h2>
                  <p className="text-gray-600 mt-2">{toolData.description || 'Tool description will appear here'}</p>
                  <div className="flex items-center space-x-4 mt-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
                      {categories.find(c => c.id === toolData.category)?.name || 'Category'}
                    </span>
                    <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm font-medium">
                      {pricingOptions.find(p => p.id === toolData.pricing)?.name || 'Pricing'}
                    </span>
                  </div>
                </div>
              </div>

              {toolData.features.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Features</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {toolData.features.map((feature) => (
                      <div key={feature.id} className="flex items-center space-x-2">
                        <CheckCircle className="text-green-500" size={16} />
                        <span className="text-gray-700">{feature.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {toolData.prompts.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">AI Prompts</h3>
                  <div className="space-y-2">
                    {toolData.prompts.map((prompt) => (
                      <div key={prompt.id} className="bg-gray-50 rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-gray-900">{prompt.name}</span>
                          <span className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded">
                            {prompt.type}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 font-mono">{prompt.prompt}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center space-x-4 mb-6">
            <motion.button
              onClick={onBack}
              className="p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ArrowLeft size={20} />
            </motion.button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Create AI Tool</h1>
              <p className="text-gray-600">Build and customize your own AI tool</p>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.id} className="flex items-center">
                  <motion.div
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                      activeStep >= step.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                    whileHover={{ scale: activeStep >= step.id ? 1.05 : 1 }}
                    whileTap={{ scale: activeStep >= step.id ? 0.95 : 1 }}
                  >
                    <Icon size={18} />
                    <span className="font-medium">{step.name}</span>
                  </motion.div>
                  {index < steps.length - 1 && (
                    <div className={`w-8 h-0.5 mx-2 ${
                      activeStep > step.id ? 'bg-blue-600' : 'bg-gray-300'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Step Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-8"
        >
          {renderStepContent()}
        </motion.div>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-between mt-8"
        >
          <motion.button
            onClick={() => setActiveStep(Math.max(1, activeStep - 1))}
            disabled={activeStep === 1}
            className={`flex items-center space-x-2 px-6 py-2 rounded-lg transition-colors ${
              activeStep === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-600 text-white hover:bg-gray-700'
            }`}
            whileHover={{ scale: activeStep !== 1 ? 1.05 : 1 }}
            whileTap={{ scale: activeStep !== 1 ? 0.95 : 1 }}
          >
            <ArrowLeft size={18} />
            <span>Previous</span>
          </motion.button>

          <motion.button
            onClick={() => setActiveStep(Math.min(5, activeStep + 1))}
            disabled={activeStep === 5}
            className={`flex items-center space-x-2 px-6 py-2 rounded-lg transition-colors ${
              activeStep === 5
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
            whileHover={{ scale: activeStep !== 5 ? 1.05 : 1 }}
            whileTap={{ scale: activeStep !== 5 ? 0.95 : 1 }}
          >
            <span>Next</span>
            <ArrowLeft size={18} className="rotate-180" />
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default ToolBuilder; 