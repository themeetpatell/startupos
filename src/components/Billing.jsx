import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CreditCard, 
  CheckCircle, 
  AlertCircle, 
  Download, 
  Calendar, 
  DollarSign, 
  TrendingUp, 
  Shield, 
  Star, 
  Zap, 
  Crown, 
  Building, 
  Users, 
  BarChart3,
  ArrowRight,
  Plus,
  Edit,
  Trash2,
  Eye,
  Clock,
  FileText,
  Settings,
  Bell,
  HelpCircle,
  ExternalLink
} from 'lucide-react';

const Billing = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const [billingInfo, setBillingInfo] = useState({
    currentPlan: 'Pro',
    status: 'active',
    nextBilling: '2024-02-15',
    amount: '$99.00',
    paymentMethod: '•••• •••• •••• 4242',
    billingEmail: 'billing@startupos.com',
    billingAddress: {
      name: 'StartupOS Inc.',
      street: '123 Innovation Drive',
      city: 'San Francisco',
      state: 'CA',
      zip: '94105',
      country: 'United States'
    }
  });

  const [invoices, setInvoices] = useState([
    {
      id: 'INV-2024-001',
      date: '2024-01-15',
      amount: '$99.00',
      status: 'paid',
      description: 'Pro Plan - Monthly',
      downloadUrl: '#'
    },
    {
      id: 'INV-2023-012',
      date: '2023-12-15',
      amount: '$99.00',
      status: 'paid',
      description: 'Pro Plan - Monthly',
      downloadUrl: '#'
    },
    {
      id: 'INV-2023-011',
      date: '2023-11-15',
      amount: '$99.00',
      status: 'paid',
      description: 'Pro Plan - Monthly',
      downloadUrl: '#'
    }
  ]);

  const [usage, setUsage] = useState({
    teamMembers: { used: 8, limit: 25, percentage: 32 },
    projects: { used: 12, limit: 50, percentage: 24 },
    storage: { used: 2.4, limit: 100, percentage: 2.4 },
    apiCalls: { used: 15420, limit: 100000, percentage: 15.42 }
  });

  const plans = [
    {
      id: 'starter',
      name: 'Starter',
      price: '$29',
      period: '/month',
      description: 'Perfect for small teams getting started',
      features: [
        'Up to 5 team members',
        '10 projects',
        '10GB storage',
        'Basic analytics',
        'Email support',
        'Standard templates'
      ],
      current: false,
      popular: false
    },
    {
      id: 'pro',
      name: 'Pro',
      price: '$99',
      period: '/month',
      description: 'Best for growing startups and teams',
      features: [
        'Up to 25 team members',
        '50 projects',
        '100GB storage',
        'Advanced analytics',
        'Priority support',
        'All templates',
        'API access',
        'Custom integrations'
      ],
      current: true,
      popular: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: '$299',
      period: '/month',
      description: 'For large organizations with advanced needs',
      features: [
        'Unlimited team members',
        'Unlimited projects',
        '1TB storage',
        'Custom analytics',
        '24/7 phone support',
        'Custom templates',
        'Full API access',
        'White-label options',
        'Dedicated account manager'
      ],
      current: false,
      popular: false
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'plans', label: 'Plans', icon: Crown },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'usage', label: 'Usage', icon: TrendingUp },
    { id: 'invoices', label: 'Invoices', icon: FileText }
  ];

  const renderOverview = () => (
    <div className="space-y-8">
      {/* Current Plan Status */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Pro Plan</h2>
            <p className="text-blue-100">Your current subscription is active</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">$99.00</div>
            <div className="text-blue-100">per month</div>
          </div>
        </div>
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5" />
            <span>Next billing: Feb 15, 2024</span>
          </div>
          <div className="flex items-center space-x-2">
            <Shield className="w-5 h-5" />
            <span>Auto-renewal enabled</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="bg-white rounded-xl border border-gray-200 p-6 text-left hover:shadow-lg transition-all duration-300"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <CreditCard className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold">Update Payment</h3>
          </div>
          <p className="text-gray-600 text-sm">Update your payment method or billing information</p>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="bg-white rounded-xl border border-gray-200 p-6 text-left hover:shadow-lg transition-all duration-300"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <Download className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold">Download Invoice</h3>
          </div>
          <p className="text-gray-600 text-sm">Get your latest invoice or billing history</p>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="bg-white rounded-xl border border-gray-200 p-6 text-left hover:shadow-lg transition-all duration-300"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-purple-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold">View Usage</h3>
          </div>
          <p className="text-gray-600 text-sm">Monitor your current usage and limits</p>
        </motion.button>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Recent Billing Activity</h3>
        <div className="space-y-4">
          {[
            { action: 'Payment received for Pro Plan', amount: '$99.00', date: 'Jan 15, 2024', status: 'success' },
            { action: 'Payment method updated', amount: '', date: 'Jan 10, 2024', status: 'info' },
            { action: 'Invoice generated', amount: '$99.00', date: 'Jan 15, 2024', status: 'info' }
          ].map((activity, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`w-2 h-2 rounded-full ${
                  activity.status === 'success' ? 'bg-green-500' : 'bg-blue-500'
                }`}></div>
                <div>
                  <p className="font-medium text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-500">{activity.date}</p>
                </div>
              </div>
              {activity.amount && (
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{activity.amount}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderPlans = () => (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Plan</h2>
        <p className="text-gray-600 text-lg">Select the perfect plan for your startup's needs</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`relative rounded-2xl border-2 p-8 ${
              plan.popular 
                ? 'border-blue-500 bg-blue-50' 
                : plan.current
                ? 'border-green-500 bg-green-50'
                : 'border-gray-200 bg-white'
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </span>
              </div>
            )}
            {plan.current && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-green-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Current Plan
                </span>
              </div>
            )}

            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
              <div className="flex items-baseline justify-center">
                <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                <span className="text-gray-600 ml-1">{plan.period}</span>
              </div>
              <p className="text-gray-600 mt-2">{plan.description}</p>
            </div>

            <ul className="space-y-3 mb-8">
              {plan.features.map((feature, featureIndex) => (
                <li key={featureIndex} className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>

            <button
              className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-300 ${
                plan.current
                  ? 'bg-green-500 text-white hover:bg-green-600'
                  : plan.popular
                  ? 'bg-blue-500 text-white hover:bg-blue-600'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              disabled={plan.current}
            >
              {plan.current ? 'Current Plan' : 'Upgrade Plan'}
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderBilling = () => (
    <div className="space-y-8">
      {/* Billing Information */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Billing Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Billing Email</label>
            <input
              type="email"
              value={billingInfo.billingEmail}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
            <div className="flex items-center space-x-3">
              <CreditCard className="w-6 h-6 text-gray-400" />
              <span className="text-gray-700">{billingInfo.paymentMethod}</span>
              <button className="text-blue-600 hover:text-blue-700 font-medium">Update</button>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h4 className="text-md font-semibold text-gray-900 mb-4">Billing Address</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
              <input
                type="text"
                value={billingInfo.billingAddress.name}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Street Address</label>
              <input
                type="text"
                value={billingInfo.billingAddress.street}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
              <input
                type="text"
                value={billingInfo.billingAddress.city}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
              <input
                type="text"
                value={billingInfo.billingAddress.state}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">ZIP Code</label>
              <input
                type="text"
                value={billingInfo.billingAddress.zip}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
              <input
                type="text"
                value={billingInfo.billingAddress.country}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );

  const renderUsage = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Object.entries(usage).map(([key, data]) => (
          <div key={key} className="bg-white rounded-2xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 capitalize">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </h3>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">
                  {typeof data.used === 'number' && data.used < 1000 
                    ? data.used 
                    : data.used.toLocaleString()
                  }
                </div>
                <div className="text-sm text-gray-500">
                  of {typeof data.limit === 'number' && data.limit < 1000 
                    ? data.limit 
                    : data.limit.toLocaleString()
                  }
                </div>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className={`h-3 rounded-full transition-all duration-300 ${
                  data.percentage > 80 ? 'bg-red-500' :
                  data.percentage > 60 ? 'bg-yellow-500' :
                  'bg-green-500'
                }`}
                style={{ width: `${Math.min(data.percentage, 100)}%` }}
              ></div>
            </div>
            <div className="mt-2 text-sm text-gray-600">
              {data.percentage.toFixed(1)}% used
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Usage History</h3>
        <div className="space-y-4">
          {[
            { month: 'January 2024', teamMembers: 8, projects: 12, storage: 2.4, apiCalls: 15420 },
            { month: 'December 2023', teamMembers: 7, projects: 10, storage: 2.1, apiCalls: 12850 },
            { month: 'November 2023', teamMembers: 6, projects: 8, storage: 1.8, apiCalls: 11200 }
          ].map((month, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="font-medium text-gray-900">{month.month}</div>
              <div className="flex items-center space-x-6 text-sm text-gray-600">
                <span>{month.teamMembers} members</span>
                <span>{month.projects} projects</span>
                <span>{month.storage}GB storage</span>
                <span>{month.apiCalls.toLocaleString()} API calls</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderInvoices = () => (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Invoices</h2>
        <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Download className="w-5 h-5" />
          <span>Download All</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Invoice</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Date</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Amount</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Status</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {invoices.map((invoice, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{invoice.id}</div>
                    <div className="text-sm text-gray-500">{invoice.description}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {new Date(invoice.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {invoice.amount}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      invoice.status === 'paid' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {invoice.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button className="text-blue-600 hover:text-blue-700">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-700">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview': return renderOverview();
      case 'plans': return renderPlans();
      case 'billing': return renderBilling();
      case 'usage': return renderUsage();
      case 'invoices': return renderInvoices();
      default: return renderOverview();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Billing & Subscription</h1>
          <p className="text-gray-600">Manage your subscription, billing, and payment information</p>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-white rounded-2xl border border-gray-200 p-2 mb-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-xl transition-all duration-300 ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content */}
        {renderTabContent()}
      </div>
    </div>
  );
};

export default Billing;
