import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, Users, BarChart3, Target, Calendar, FileText, 
  Settings, Bell, Search, Plus, TrendingUp, Zap,
  CheckCircle, Clock, AlertCircle, Star, Award,
  MessageCircle, Phone, Mail, Globe, Linkedin,
  Twitter, Github, Building, User, DollarSign,
  Briefcase, GraduationCap, Lightbulb, Shield,
  ArrowRight, ArrowUp, ArrowDown, Filter,
  MoreVertical, Edit, Trash2, Eye, Share,
  Download, Upload, Copy, ExternalLink,
  Play, Pause, Square, RefreshCw, Save, X,
  Building2, FolderOpen, MapPin, PieChart,
  Activity, Flag, UserPlus
} from 'lucide-react';

const WorkHub = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showTeamModal, setShowTeamModal] = useState(false);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const [newTeamMember, setNewTeamMember] = useState({
    name: '',
    email: '',
    role: '',
    department: '',
    phone: '',
    bio: ''
  });
  
  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
    status: 'Planning',
    priority: 'Medium',
    startDate: '',
    dueDate: '',
    budget: '',
    team: []
  });

  const [teamMembers, setTeamMembers] = useState(() => {
    const saved = localStorage.getItem('teamMembers');
    return saved ? JSON.parse(saved) : [
      {
        id: 1,
        name: 'Sarah Chen',
        role: 'CEO & Co-Founder',
        department: 'Leadership',
        avatar: 'https://ui-avatars.com/api/?name=Sarah+Chen&background=6366f1&color=fff',
        email: 'sarah@startupos.com',
        phone: '+1 (555) 123-4567',
        status: 'online',
        lastActive: '2 minutes ago',
        skills: ['Leadership', 'Strategy', 'Product'],
        projects: 3,
        tasksCompleted: 47,
        performance: 95,
        joinDate: '2022-01-15',
        bio: 'Serial entrepreneur with 8+ years in tech. Led 2 successful exits and now building the future of startup operations.',
        social: {
          linkedin: 'https://linkedin.com/in/sarahchen',
          twitter: '@sarahchen_ai',
          github: 'sarahchen'
        }
      },
      {
        id: 2,
        name: 'Michael Rodriguez',
        role: 'CTO & Co-Founder',
        department: 'Engineering',
        avatar: 'https://ui-avatars.com/api/?name=Michael+Rodriguez&background=8b5cf6&color=fff',
        email: 'michael@startupos.com',
        phone: '+1 (555) 234-5678',
        status: 'away',
        lastActive: '1 hour ago',
        skills: ['Engineering', 'Architecture', 'AI/ML'],
        projects: 5,
        tasksCompleted: 89,
        performance: 98,
        joinDate: '2022-01-15',
        bio: 'Full-stack engineer with expertise in scalable systems and AI integration. Former Google and Stripe engineer.',
        social: {
          linkedin: 'https://linkedin.com/in/michaelrodriguez',
          twitter: '@mrodriguez',
          github: 'mrodriguez'
        }
      },
      {
        id: 3,
        name: 'Lisa Wang',
        role: 'Head of Design',
        department: 'Design',
        avatar: 'https://ui-avatars.com/api/?name=Lisa+Wang&background=10b981&color=fff',
        email: 'lisa@startupos.com',
        phone: '+1 (555) 345-6789',
        status: 'online',
        lastActive: '5 minutes ago',
        skills: ['UI/UX', 'Design Systems', 'Branding'],
        projects: 4,
        tasksCompleted: 62,
        performance: 92,
        joinDate: '2022-03-01',
        bio: 'Creative director with 6+ years designing user experiences for B2B SaaS products. Former Figma and Airbnb designer.',
        social: {
          linkedin: 'https://linkedin.com/in/lisawang',
          twitter: '@lisawang_design',
          behance: 'lisawang'
        }
      }
    ];
  });

  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem('projects');
    return saved ? JSON.parse(saved) : [
      {
        id: 1,
        name: 'AI Workflow Integration',
        description: 'Integrating AI capabilities across all platform features',
        status: 'In Progress',
        priority: 'High',
        progress: 65,
        startDate: '2024-01-15',
        dueDate: '2024-03-31',
        budget: '$50,000',
        spent: '$32,000',
        team: ['Sarah Chen', 'Michael Rodriguez', 'Lisa Wang'],
        tags: ['AI', 'Integration', 'Platform'],
        milestones: [
          { name: 'Research Phase', completed: true, date: '2024-01-30' },
          { name: 'Prototype Development', completed: true, date: '2024-02-15' },
          { name: 'Testing & QA', completed: false, date: '2024-03-15' },
          { name: 'Production Launch', completed: false, date: '2024-03-31' }
        ]
      },
      {
        id: 2,
        name: 'Mobile App Development',
        description: 'Building native mobile applications for iOS and Android',
        status: 'Planning',
        priority: 'Medium',
        progress: 30,
        startDate: '2024-02-01',
        dueDate: '2024-06-15',
        budget: '$75,000',
        spent: '$15,000',
        team: ['Michael Rodriguez', 'Lisa Wang'],
        tags: ['Mobile', 'iOS', 'Android'],
        milestones: [
          { name: 'Design System', completed: false, date: '2024-02-28' },
          { name: 'iOS Development', completed: false, date: '2024-04-15' },
          { name: 'Android Development', completed: false, date: '2024-05-15' },
          { name: 'App Store Launch', completed: false, date: '2024-06-15' }
        ]
      }
    ];
  });

  const resources = [
    {
      id: 1,
      name: 'Company Handbook',
      type: 'Document',
      category: 'HR',
      size: '2.4 MB',
      lastModified: '2024-01-15',
      author: 'Sarah Chen',
      description: 'Complete employee handbook with policies and procedures',
      url: '#',
      tags: ['HR', 'Policies', 'Onboarding']
    },
    {
      id: 2,
      name: 'Brand Guidelines',
      type: 'Design',
      category: 'Marketing',
      size: '15.7 MB',
      lastModified: '2024-01-10',
      author: 'Lisa Wang',
      description: 'Brand identity guidelines and design system documentation',
      url: '#',
      tags: ['Brand', 'Design', 'Guidelines']
    },
    {
      id: 3,
      name: 'Technical Architecture',
      type: 'Document',
      category: 'Engineering',
      size: '8.2 MB',
      lastModified: '2024-01-08',
      author: 'Michael Rodriguez',
      description: 'System architecture documentation and technical specifications',
      url: '#',
      tags: ['Architecture', 'Technical', 'Documentation']
    }
  ];

  const handleAddTeamMember = useCallback(() => {
    try {
      if (!newTeamMember.name?.trim()) {
        throw new Error('Name is required');
      }
      if (!newTeamMember.email?.trim()) {
        throw new Error('Email is required');
      }
      if (!newTeamMember.role?.trim()) {
        throw new Error('Role is required');
      }
      
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(newTeamMember.email)) {
        throw new Error('Please enter a valid email address');
      }
      
      const sanitizedMember = {
        name: newTeamMember.name.trim(),
        email: newTeamMember.email.trim().toLowerCase(),
        role: newTeamMember.role.trim(),
        department: newTeamMember.department?.trim() || '',
        phone: newTeamMember.phone?.trim() || '',
        bio: newTeamMember.bio?.trim() || ''
      };
      
      const member = {
        id: Date.now(),
        ...sanitizedMember,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(sanitizedMember.name)}&background=6366f1&color=fff`,
        status: 'online',
        lastActive: 'Just now',
        skills: [],
        projects: 0,
        tasksCompleted: 0,
        performance: 85,
        joinDate: new Date().toISOString().split('T')[0],
        social: {
          linkedin: '',
          twitter: '',
          github: ''
        }
      };
      
      setTeamMembers(prev => [...prev, member]);
      setNewTeamMember({
        name: '',
        email: '',
        role: '',
        department: '',
        phone: '',
        bio: ''
      });
      setShowTeamModal(false);
    } catch (error) {
      console.error('Error adding team member:', error);
      alert(`Error: ${error.message}`);
    }
  }, [newTeamMember, teamMembers.length]);

  const handleCreateProject = useCallback(() => {
    try {
      if (!newProject.name?.trim()) {
        throw new Error('Project name is required');
      }
      if (!newProject.description?.trim()) {
        throw new Error('Project description is required');
      }
      
      if (newProject.startDate && newProject.dueDate) {
        const startDate = new Date(newProject.startDate);
        const dueDate = new Date(newProject.dueDate);
        if (startDate >= dueDate) {
          throw new Error('Due date must be after start date');
        }
      }
      
      const sanitizedProject = {
        name: newProject.name.trim(),
        description: newProject.description.trim(),
        status: newProject.status,
        priority: newProject.priority,
        startDate: newProject.startDate || '',
        dueDate: newProject.dueDate || '',
        budget: newProject.budget?.trim() || '',
        team: Array.isArray(newProject.team) ? newProject.team : []
      };
      
      const project = {
        id: Date.now(),
        ...sanitizedProject,
        progress: 0,
        spent: '$0',
        tags: [],
        milestones: []
      };
      
      setProjects(prev => [...prev, project]);
      setNewProject({
        name: '',
        description: '',
        status: 'Planning',
        priority: 'Medium',
        startDate: '',
        dueDate: '',
        budget: '',
        team: []
      });
      setShowProjectModal(false);
    } catch (error) {
      console.error('Error creating project:', error);
      alert(`Error: ${error.message}`);
    }
  }, [newProject, projects.length]);

  const handleInviteTeamMember = (email) => {
    try {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new Error('Please enter a valid email address');
      }
      
      console.log('Sending invitation to:', email);
      alert(`Invitation sent to ${email}`);
    } catch (error) {
      console.error('Error sending invitation:', error);
      alert(`Error: ${error.message}`);
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Home, color: 'blue' },
    { id: 'team', label: 'Team', icon: Users, color: 'green' },
    { id: 'projects', label: 'Projects', icon: Target, color: 'purple' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, color: 'orange' },
    { id: 'resources', label: 'Resources', icon: FileText, color: 'indigo' },
    { id: 'settings', label: 'Settings', icon: Settings, color: 'gray' }
  ];

  useEffect(() => {
    localStorage.setItem('teamMembers', JSON.stringify(teamMembers));
  }, [teamMembers]);

  useEffect(() => {
    localStorage.setItem('projects', JSON.stringify(projects));
  }, [projects]);

  const analytics = useMemo(() => ({
    team: {
      totalMembers: teamMembers.length,
      activeMembers: teamMembers.filter(m => m.status === 'online').length,
      averagePerformance: teamMembers.length > 0 ? Math.round(teamMembers.reduce((sum, m) => sum + m.performance, 0) / teamMembers.length) : 0,
      tasksCompleted: teamMembers.reduce((sum, m) => sum + m.tasksCompleted, 0)
    },
    projects: {
      total: projects.length,
      inProgress: projects.filter(p => p.status === 'In Progress').length,
      completed: projects.filter(p => p.status === 'Completed').length,
      averageProgress: projects.length > 0 ? Math.round(projects.reduce((sum, p) => sum + p.progress, 0) / projects.length) : 0
    },
    resources: {
      total: resources.length,
      totalSize: '26.3 MB',
      lastUpdated: '2024-01-15'
    }
  }), [teamMembers, projects, resources.length]);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview': return renderOverview();
      case 'team': return renderTeam();
      case 'projects': return renderProjects();
      case 'analytics': return renderAnalytics();
      case 'resources': return renderResources();
      case 'settings': return renderSettings();
      default: return renderOverview();
    }
  };

  const renderOverview = () => (
    <div className="space-y-6 sm:space-y-8">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-600">Team Members</p>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900">{analytics.team.totalMembers}</p>
              <p className="text-xs sm:text-sm text-green-600">{analytics.team.activeMembers} online</p>
            </div>
            <div className="p-2 sm:p-3 bg-blue-100 rounded-xl">
              <Users className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-600">Active Projects</p>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900">{analytics.projects.inProgress}</p>
              <p className="text-xs sm:text-sm text-blue-600">{analytics.projects.averageProgress}% avg progress</p>
            </div>
            <div className="p-2 sm:p-3 bg-purple-100 rounded-xl">
              <Target className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-600">Tasks Completed</p>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900">{analytics.team.tasksCompleted}</p>
              <p className="text-xs sm:text-sm text-green-600">This month</p>
            </div>
            <div className="p-2 sm:p-3 bg-green-100 rounded-xl">
              <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-600">Resources</p>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900">{analytics.resources.total}</p>
              <p className="text-xs sm:text-sm text-gray-600">{analytics.resources.totalSize}</p>
            </div>
            <div className="p-2 sm:p-3 bg-indigo-100 rounded-xl">
              <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4 sm:mb-6">Recent Activity</h3>
        <div className="space-y-4">
          {[
            { action: 'Sarah Chen completed task "AI Integration Research"', time: '2 minutes ago', type: 'task' },
            { action: 'Michael Rodriguez uploaded "Technical Architecture v2.1"', time: '1 hour ago', type: 'upload' },
            { action: 'Lisa Wang updated project "Mobile App Development"', time: '3 hours ago', type: 'project' },
            { action: 'New team member David Kim joined', time: '1 day ago', type: 'team' }
          ].map((activity, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50">
              <div className={`w-2 h-2 rounded-full ${
                activity.type === 'task' ? 'bg-green-500' :
                activity.type === 'upload' ? 'bg-blue-500' :
                activity.type === 'project' ? 'bg-purple-500' :
                'bg-orange-500'
              }`}></div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">{activity.action}</p>
                <p className="text-xs text-gray-500">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4 sm:mb-6">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Add Team Member', icon: User, color: 'blue' },
            { label: 'Create Project', icon: Target, color: 'purple' },
            { label: 'Upload Resource', icon: Upload, color: 'green' },
            { label: 'Schedule Meeting', icon: Calendar, color: 'orange' }
          ].map((action, index) => (
            <button
              key={index}
              className="flex flex-col items-center space-y-2 p-4 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <div className={`p-3 rounded-xl ${
                action.color === 'blue' ? 'bg-blue-100' :
                action.color === 'purple' ? 'bg-purple-100' :
                action.color === 'green' ? 'bg-green-100' :
                'bg-orange-100'
              }`}>
                <action.icon className={`w-6 h-6 ${
                  action.color === 'blue' ? 'text-blue-600' :
                  action.color === 'purple' ? 'text-purple-600' :
                  action.color === 'green' ? 'text-green-600' :
                  'text-orange-600'
                }`} />
              </div>
              <span className="text-sm font-medium text-gray-700">{action.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  // Continue with other render methods...
  const renderTeam = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Team Members</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => setShowTeamModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus size={20} />
            <span>Add Member</span>
          </button>
          <button
            onClick={() => {
              const email = prompt('Enter email to invite:');
              if (email) handleInviteTeamMember(email);
            }}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Mail size={20} />
            <span>Invite</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teamMembers.map((member) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 cursor-pointer"
            onClick={() => setSelectedItem(member)}
          >
            <div className="flex items-start space-x-4">
              <div className="relative">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-16 h-16 rounded-xl object-cover"
                />
                <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white ${
                  member.status === 'online' ? 'bg-green-500' :
                  member.status === 'away' ? 'bg-yellow-500' :
                  'bg-gray-400'
                }`}></div>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-bold text-gray-900 truncate">{member.name}</h3>
                <p className="text-sm text-gray-600">{member.role}</p>
                <p className="text-xs text-gray-500">{member.department}</p>
                <div className="flex items-center space-x-4 mt-3 text-sm text-gray-500">
                  <span>{member.projects} projects</span>
                  <span>{member.tasksCompleted} tasks</span>
                </div>
                <div className="mt-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Performance</span>
                    <span className="font-medium">{member.performance}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${member.performance}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderProjects = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Projects</h2>
        <button
          onClick={() => setShowProjectModal(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          <Plus size={20} />
          <span>New Project</span>
        </button>
      </div>

      <div className="space-y-4">
        {projects.map((project) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -2 }}
            className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 cursor-pointer"
            onClick={() => setSelectedItem(project)}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900">{project.name}</h3>
                <p className="text-gray-600 mt-1">{project.description}</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-3 py-1 text-xs rounded-full ${
                  project.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                  project.status === 'Completed' ? 'bg-green-100 text-green-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {project.status}
                </span>
                <span className={`px-3 py-1 text-xs rounded-full ${
                  project.priority === 'High' ? 'bg-red-100 text-red-800' :
                  project.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {project.priority}
                </span>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-gray-600">Progress</span>
                <span className="font-medium">{project.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-purple-600 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${project.progress}%` }}
                ></div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Budget</p>
                <p className="font-medium">{project.budget}</p>
              </div>
              <div>
                <p className="text-gray-600">Spent</p>
                <p className="font-medium">{project.spent}</p>
              </div>
              <div>
                <p className="text-gray-600">Due Date</p>
                <p className="font-medium">{new Date(project.dueDate).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-gray-600">Team</p>
                <p className="font-medium">{project.team.length} members</p>
              </div>
            </div>

            <div className="mt-4">
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, index) => (
                  <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h2>
      
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Team Performance</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">{analytics.team.averagePerformance}%</div>
            <div className="text-sm text-gray-600">Average Performance</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">{analytics.team.tasksCompleted}</div>
            <div className="text-sm text-gray-600">Tasks Completed</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">{analytics.team.activeMembers}</div>
            <div className="text-sm text-gray-600">Active Members</div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Project Analytics</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600">{analytics.projects.total}</div>
            <div className="text-sm text-gray-600">Total Projects</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">{analytics.projects.inProgress}</div>
            <div className="text-sm text-gray-600">In Progress</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">{analytics.projects.averageProgress}%</div>
            <div className="text-sm text-gray-600">Average Progress</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderResources = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Resources</h2>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Upload size={20} />
          <span>Upload Resource</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((resource) => (
          <motion.div
            key={resource.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 cursor-pointer"
            onClick={() => setSelectedItem(resource)}
          >
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-indigo-100 rounded-xl">
                <FileText className="w-6 h-6 text-indigo-600" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-bold text-gray-900 truncate">{resource.name}</h3>
                <p className="text-sm text-gray-600">{resource.type} • {resource.category}</p>
                <p className="text-xs text-gray-500 mt-1">{resource.description}</p>
                <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
                  <span>{resource.size}</span>
                  <span>{resource.lastModified}</span>
                </div>
                <div className="flex flex-wrap gap-1 mt-3">
                  {resource.tags.map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
      
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-6">General Settings</h3>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
            <input
              type="text"
              defaultValue="StartupOS"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Company Description</label>
            <textarea
              rows={4}
              defaultValue="Next-generation platform for startup operations and growth"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
        </div>

        {/* Search Bar */}
        <div className="mb-6 sm:mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search WorkHub..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 sm:py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap sm:flex-nowrap space-x-1 bg-white rounded-2xl border border-gray-200 p-1 sm:p-2 mb-6 sm:mb-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-2 sm:py-3 rounded-xl transition-all duration-300 ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Icon size={16} className="sm:w-5 sm:h-5" />
                <span className="font-medium text-xs sm:text-sm">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content */}
        {renderTabContent()}
      </div>

      {/* Modals would go here - keeping it simple for now */}
    </div>
  );
};

export default WorkHub;
