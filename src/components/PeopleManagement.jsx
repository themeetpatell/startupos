import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  UserPlus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Edit3, 
  Trash2, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Clock, 
  Star, 
  Award, 
  Briefcase, 
  GraduationCap, 
  Globe, 
  Linkedin, 
  Twitter, 
  Github, 
  ExternalLink, 
  MessageSquare, 
  Video, 
  Settings, 
  Shield, 
  Key, 
  Eye, 
  EyeOff, 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  Plus, 
  Minus, 
  Upload, 
  Download, 
  Share2, 
  Copy, 
  Send, 
  Bell, 
  BellOff, 
  Lock, 
  Unlock, 
  UserCheck, 
  UserX, 
  Crown, 
  Zap, 
  Target, 
  TrendingUp, 
  Activity, 
  BarChart3, 
  PieChart, 
  Calendar as CalendarIcon,
  FileText,
  Folder,
  Tag,
  Hash,
  AtSign
} from 'lucide-react';

const PeopleManagement = () => {
  const [activeTab, setActiveTab] = useState('team');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedMember, setSelectedMember] = useState(null);
  const [showInviteModal, setShowInviteModal] = useState(false);

  const tabs = [
    { id: 'team', label: 'Team Members', icon: Users, count: 24 },
    { id: 'roles', label: 'Roles & Permissions', icon: Shield, count: 8 },
    { id: 'departments', label: 'Departments', icon: Briefcase, count: 5 },
    { id: 'analytics', label: 'Team Analytics', icon: BarChart3, count: null }
  ];

  const teamMembers = [
    {
      id: 1,
      name: 'Sarah Chen',
      email: 'sarah@techflow.ai',
      role: 'CEO & Co-founder',
      department: 'Leadership',
      avatar: '👩‍💼',
      status: 'active',
      joinDate: '2023-01-01',
      lastActive: '2 minutes ago',
      location: 'San Francisco, CA',
      phone: '+1 (555) 123-4567',
      bio: 'Former Google PM with 10+ years in AI/ML. Stanford CS graduate passionate about building the future of work.',
      skills: ['Product Management', 'AI/ML', 'Strategy', 'Leadership'],
              projects: ['AI Automation Engine', 'Mobile App Launch'],
      permissions: ['admin', 'all_access'],
      social: {
        linkedin: 'https://linkedin.com/in/sarahchen',
        twitter: 'https://twitter.com/sarahchen',
        github: 'https://github.com/sarahchen'
      },
      performance: {
        rating: 4.9,
        completedTasks: 156,
        onTimeDelivery: 98
      }
    },
    {
      id: 2,
      name: 'Marcus Rodriguez',
      email: 'marcus@techflow.ai',
      role: 'CTO & Co-founder',
      department: 'Engineering',
      avatar: '👨‍💻',
      status: 'active',
      joinDate: '2023-01-01',
      lastActive: '5 minutes ago',
      location: 'Austin, TX',
      phone: '+1 (555) 234-5678',
      bio: 'Ex-Tesla engineer specializing in AI infrastructure and scalable systems. MIT graduate with expertise in distributed computing.',
      skills: ['System Architecture', 'AI/ML', 'DevOps', 'Team Leadership'],
              projects: ['AI Automation Engine', 'Infrastructure Scaling'],
      permissions: ['admin', 'engineering_lead'],
      social: {
        linkedin: 'https://linkedin.com/in/marcusrodriguez',
        github: 'https://github.com/marcusrodriguez'
      },
      performance: {
        rating: 4.8,
        completedTasks: 142,
        onTimeDelivery: 95
      }
    },
    {
      id: 3,
      name: 'Emily Watson',
      email: 'emily@techflow.ai',
      role: 'Head of Product',
      department: 'Product',
      avatar: '👩‍🎨',
      status: 'active',
      joinDate: '2023-03-15',
      lastActive: '1 hour ago',
      location: 'New York, NY',
      phone: '+1 (555) 345-6789',
      bio: 'Product leader from Airbnb with expertise in user experience and growth. Berkeley graduate focused on user-centric design.',
      skills: ['Product Strategy', 'UX Design', 'Growth', 'Analytics'],
      projects: ['Mobile App Launch', 'Customer Onboarding'],
      permissions: ['product_lead', 'analytics_access'],
      social: {
        linkedin: 'https://linkedin.com/in/emilywatson',
        twitter: 'https://twitter.com/emilywatson'
      },
      performance: {
        rating: 4.7,
        completedTasks: 98,
        onTimeDelivery: 92
      }
    },
    {
      id: 4,
      name: 'David Kim',
      email: 'david@techflow.ai',
      role: 'Head of Engineering',
      department: 'Engineering',
      avatar: '👨‍🔬',
      status: 'active',
      joinDate: '2023-02-01',
      lastActive: '30 minutes ago',
      location: 'Seattle, WA',
      phone: '+1 (555) 456-7890',
      bio: 'Senior engineer from Meta with deep expertise in distributed systems and machine learning infrastructure.',
      skills: ['Backend Development', 'Machine Learning', 'System Design', 'Mentoring'],
              projects: ['AI Automation Engine', 'API Development'],
      permissions: ['engineering_lead', 'deployment_access'],
      social: {
        linkedin: 'https://linkedin.com/in/davidkim',
        github: 'https://github.com/davidkim'
      },
      performance: {
        rating: 4.8,
        completedTasks: 134,
        onTimeDelivery: 96
      }
    },
    {
      id: 5,
      name: 'Lisa Park',
      email: 'lisa@techflow.ai',
      role: 'Marketing Manager',
      department: 'Marketing',
      avatar: '👩‍💼',
      status: 'active',
      joinDate: '2023-04-10',
      lastActive: '2 hours ago',
      location: 'Los Angeles, CA',
      phone: '+1 (555) 567-8901',
      bio: 'Growth marketing expert from Stripe with experience scaling B2B SaaS companies from startup to IPO.',
      skills: ['Growth Marketing', 'Content Strategy', 'SEO', 'Analytics'],
      projects: ['Brand Launch', 'Content Marketing'],
      permissions: ['marketing_lead', 'content_access'],
      social: {
        linkedin: 'https://linkedin.com/in/lisapark',
        twitter: 'https://twitter.com/lisapark'
      },
      performance: {
        rating: 4.6,
        completedTasks: 87,
        onTimeDelivery: 89
      }
    },
    {
      id: 6,
      name: 'Alex Thompson',
      email: 'alex@techflow.ai',
      role: 'Senior Developer',
      department: 'Engineering',
      avatar: '👨‍💻',
      status: 'away',
      joinDate: '2023-05-20',
      lastActive: '1 day ago',
      location: 'Denver, CO',
      phone: '+1 (555) 678-9012',
      bio: 'Full-stack developer with expertise in React, Node.js, and cloud infrastructure. Passionate about clean code and user experience.',
      skills: ['Frontend Development', 'React', 'Node.js', 'AWS'],
      projects: ['Mobile App Launch', 'Web Platform'],
      permissions: ['developer', 'code_access'],
      social: {
        linkedin: 'https://linkedin.com/in/alexthompson',
        github: 'https://github.com/alexthompson'
      },
      performance: {
        rating: 4.5,
        completedTasks: 76,
        onTimeDelivery: 88
      }
    }
  ];

  const roles = [
    {
      id: 1,
      name: 'Admin',
      description: 'Full access to all platform features and settings',
      permissions: ['all_access', 'user_management', 'billing', 'settings'],
      members: 2,
      color: 'red'
    },
    {
      id: 2,
      name: 'Engineering Lead',
      description: 'Lead engineering team with deployment and code access',
      permissions: ['engineering_lead', 'deployment_access', 'code_access'],
      members: 2,
      color: 'blue'
    },
    {
      id: 3,
      name: 'Product Lead',
      description: 'Manage product strategy and analytics',
      permissions: ['product_lead', 'analytics_access', 'user_research'],
      members: 1,
      color: 'purple'
    },
    {
      id: 4,
      name: 'Marketing Lead',
      description: 'Manage marketing campaigns and content',
      permissions: ['marketing_lead', 'content_access', 'analytics_access'],
      members: 1,
      color: 'green'
    },
    {
      id: 5,
      name: 'Developer',
      description: 'Code access and development permissions',
      permissions: ['developer', 'code_access', 'testing_access'],
      members: 8,
      color: 'indigo'
    },
    {
      id: 6,
      name: 'Designer',
      description: 'Design and creative asset permissions',
      permissions: ['designer', 'design_access', 'asset_management'],
      members: 3,
      color: 'pink'
    },
    {
      id: 7,
      name: 'Analyst',
      description: 'Data analysis and reporting permissions',
      permissions: ['analyst', 'analytics_access', 'reporting'],
      members: 2,
      color: 'orange'
    },
    {
      id: 8,
      name: 'Viewer',
      description: 'Read-only access to basic features',
      permissions: ['viewer', 'read_only'],
      members: 5,
      color: 'gray'
    }
  ];

  const departments = [
    {
      id: 1,
      name: 'Leadership',
      description: 'Executive team and company leadership',
      members: 2,
      head: 'Sarah Chen',
      budget: '$500K',
      color: 'red'
    },
    {
      id: 2,
      name: 'Engineering',
      description: 'Software development and technical infrastructure',
      members: 12,
      head: 'Marcus Rodriguez',
      budget: '$2.1M',
      color: 'blue'
    },
    {
      id: 3,
      name: 'Product',
      description: 'Product strategy, design, and user experience',
      members: 5,
      head: 'Emily Watson',
      budget: '$800K',
      color: 'purple'
    },
    {
      id: 4,
      name: 'Marketing',
      description: 'Growth, marketing, and customer acquisition',
      members: 3,
      head: 'Lisa Park',
      budget: '$600K',
      color: 'green'
    },
    {
      id: 5,
      name: 'Operations',
      description: 'Business operations, HR, and administration',
      members: 2,
      head: 'TBD',
      budget: '$400K',
      color: 'orange'
    }
  ];

  const filteredMembers = teamMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'all' || member.role.toLowerCase().includes(selectedRole.toLowerCase());
    const matchesDepartment = selectedDepartment === 'all' || member.department === selectedDepartment;
    return matchesSearch && matchesRole && matchesDepartment;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-blue-600 bg-blue-600 border-gray-200';
      case 'away': return 'text-blue-600 bg-blue-600 border-gray-200';
      case 'offline': return 'text-gray-600 bg-gray-50 border-gray-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getRoleColor = (color) => {
    const colors = {
      red: 'bg-blue-600 text-white border-gray-200',
      blue: 'bg-blue-50 text-blue-600 border-blue-200',
      purple: 'bg-blue-600 text-blue-600 border-gray-200',
      green: 'bg-blue-600 text-blue-600 border-gray-200',
      indigo: 'bg-blue-600 text-blue-600 border-gray-200',
      pink: 'bg-blue-600 text-blue-600 border-gray-200',
      orange: 'bg-blue-600 text-blue-600 border-gray-200',
      gray: 'bg-gray-50 text-gray-600 border-gray-200'
    };
    return colors[color] || colors.gray;
  };

  const renderTeamMembers = () => (
    <div className="space-y-6">
      {/* Filters and Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
            <div className="relative">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search team members..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full md:w-64"
              />
            </div>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Roles</option>
              <option value="founder">Founder</option>
              <option value="head">Head</option>
              <option value="manager">Manager</option>
              <option value="developer">Developer</option>
            </select>
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Departments</option>
              {departments.map(dept => (
                <option key={dept.id} value={dept.name}>{dept.name}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-white shadow-sm' : 'text-gray-500'}`}
              >
                <Users size={16} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors ${viewMode === 'list' ? 'bg-white shadow-sm' : 'text-gray-500'}`}
              >
                <FileText size={16} />
              </button>
            </div>
            <motion.button
              onClick={() => setShowInviteModal(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:shadow-lg transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <UserPlus size={16} />
              <span>Invite Member</span>
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Team Members Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover-lift cursor-pointer"
              onClick={() => setSelectedMember(member)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-xl">
                    {member.avatar}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{member.name}</h3>
                    <p className="text-blue-600 text-sm font-medium">{member.role}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(member.status)}`}>
                  {member.status}
                </span>
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Mail size={14} />
                  <span>{member.email}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <MapPin size={14} />
                  <span>{member.location}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Clock size={14} />
                  <span>Last active: {member.lastActive}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  <Star size={14} className="text-blue-600 fill-current" />
                  <span className="text-sm font-medium">{member.performance.rating}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <motion.button
                    className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <MessageSquare size={14} />
                  </motion.button>
                  <motion.button
                    className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Mail size={14} />
                  </motion.button>
                  <motion.button
                    className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <MoreHorizontal size={14} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Member</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Role</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Department</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Status</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Performance</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredMembers.map((member, index) => (
                  <motion.tr
                    key={member.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-lg">
                          {member.avatar}
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{member.name}</h4>
                          <p className="text-sm text-gray-500">{member.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-sm font-medium text-gray-900">{member.role}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-sm text-gray-600">{member.department}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(member.status)}`}>
                        {member.status}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <Star size={14} className="text-blue-600 fill-current" />
                        <span className="text-sm font-medium">{member.performance.rating}</span>
                        <span className="text-sm text-gray-500">({member.performance.completedTasks} tasks)</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <motion.button
                          className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Eye size={14} />
                        </motion.button>
                        <motion.button
                          className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Edit3 size={14} />
                        </motion.button>
                        <motion.button
                          className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <MoreHorizontal size={14} />
                        </motion.button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}
    </div>
  );

  const renderRoles = () => (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Roles & Permissions</h2>
          <p className="text-gray-600 mt-1">Manage team roles and access permissions</p>
        </div>
        <motion.button
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:shadow-lg transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Plus size={16} />
          <span>Create Role</span>
        </motion.button>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {roles.map((role, index) => (
          <motion.div
            key={role.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover-lift"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getRoleColor(role.color)}`}>
                  <Shield size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{role.name}</h3>
                  <p className="text-sm text-gray-600">{role.members} members</p>
                </div>
              </div>
              <motion.button
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <MoreHorizontal size={16} />
              </motion.button>
            </div>
            
            <p className="text-gray-600 text-sm mb-4">{role.description}</p>
            
            <div className="space-y-2 mb-4">
              <h4 className="text-sm font-medium text-gray-900">Permissions:</h4>
              <div className="flex flex-wrap gap-1">
                {role.permissions.slice(0, 3).map((permission, permIndex) => (
                  <span
                    key={permIndex}
                    className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                  >
                    {permission.replace('_', ' ')}
                  </span>
                ))}
                {role.permissions.length > 3 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                    +{role.permissions.length - 3} more
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <motion.button
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Details
              </motion.button>
              <motion.button
                className="flex items-center space-x-1 px-3 py-1 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Edit3 size={14} />
                <span>Edit</span>
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderDepartments = () => (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Departments</h2>
          <p className="text-gray-600 mt-1">Organize your team by departments and functions</p>
        </div>
        <motion.button
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:shadow-lg transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Plus size={16} />
          <span>Add Department</span>
        </motion.button>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {departments.map((dept, index) => (
          <motion.div
            key={dept.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover-lift"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getRoleColor(dept.color)}`}>
                  <Briefcase size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{dept.name}</h3>
                  <p className="text-sm text-gray-600">{dept.members} members</p>
                </div>
              </div>
              <motion.button
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <MoreHorizontal size={16} />
              </motion.button>
            </div>
            
            <p className="text-gray-600 text-sm mb-4">{dept.description}</p>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Department Head:</span>
                <span className="font-medium text-gray-900">{dept.head}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Annual Budget:</span>
                <span className="font-medium text-gray-900">{dept.budget}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Team Size:</span>
                <span className="font-medium text-gray-900">{dept.members} members</span>
              </div>
            </div>

            <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
              <motion.button
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Team
              </motion.button>
              <motion.button
                className="flex items-center space-x-1 px-3 py-1 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Edit3 size={14} />
                <span>Edit</span>
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-12"
      >
        <BarChart3 size={48} className="text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Team Analytics Coming Soon</h3>
        <p className="text-gray-600">
          Comprehensive team performance analytics and insights will be available here.
        </p>
      </motion.div>
    </div>
  );

  const renderCurrentTab = () => {
    switch (activeTab) {
      case 'team': return renderTeamMembers();
      case 'roles': return renderRoles();
      case 'departments': return renderDepartments();
      case 'analytics': return renderAnalytics();
      default: return renderTeamMembers();
    }
  };

  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
              <Users className="text-white" size={20} />
            </div>
            <h1 className="text-3xl font-bold text-black">People Management</h1>
          </div>
          <p className="text-gray-600">
            Manage your team, roles, and collaboration across your startup
          </p>
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-2 mb-8"
        >
          <div className="flex space-x-2 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-blue-50 text-blue-600 border border-blue-200'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon size={18} />
                  <span>{tab.label}</span>
                  {tab.count && (
                    <span className={`px-2 py-0.5 text-xs rounded-full ${
                      activeTab === tab.id
                        ? 'bg-blue-100 text-blue-600'
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {tab.count}
                    </span>
                  )}
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            {renderCurrentTab()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PeopleManagement;

