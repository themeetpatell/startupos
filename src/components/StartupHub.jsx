import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, 
  Users, 
  Briefcase, 
  FolderOpen, 
  FileText, 
  Settings, 
  Plus, 
  Search, 
  Filter, 
  Grid, 
  List, 
  Eye, 
  Edit, 
  Trash2, 
  Download, 
  Upload, 
  Calendar, 
  MapPin, 
  Globe, 
  Mail, 
  Phone, 
  Star, 
  Award, 
  TrendingUp, 
  DollarSign,
  Clock,
  CheckCircle,
  AlertCircle,
  UserPlus,
  Target,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react';

const StartupHub = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);

  // Mock data
  const [companyProfile, setCompanyProfile] = useState({
    name: "TechFlow Solutions",
    tagline: "Revolutionizing AI-powered workflow automation",
    industry: "SaaS",
    stage: "Series A",
    founded: "2020",
    employees: 45,
    location: "San Francisco, CA",
    website: "www.techflow.com",
    email: "hello@techflow.com",
    phone: "+1 (555) 123-4567",
    description: "We build intelligent automation tools that help businesses streamline their operations and increase productivity through AI-driven insights.",
    mission: "To democratize AI automation for businesses of all sizes",
    vision: "A world where every business can leverage AI to achieve their goals",
    values: ["Innovation", "Transparency", "Customer Success", "Collaboration"],
    funding: {
      total: "$12.5M",
      lastRound: "Series A - $8M",
      investors: ["Sequoia Capital", "Andreessen Horowitz", "Y Combinator"]
    },
    metrics: {
      revenue: "$2.1M ARR",
      growth: "+340% YoY",
      customers: 150,
      satisfaction: "4.8/5"
    }
  });

  const [teamMembers] = useState([
    {
      id: 1,
      name: "Sarah Chen",
      role: "CEO & Co-Founder",
      department: "Leadership",
      email: "sarah@techflow.com",
      phone: "+1 (555) 123-4568",
      bio: "Former Google PM with 8 years experience in AI/ML products",
      skills: ["Product Strategy", "AI/ML", "Leadership", "Growth"],
      experience: "8 years",
      education: "Stanford CS, MBA",
      achievements: ["Built 3 successful products", "Forbes 30 Under 30"],
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      status: "active",
      joinDate: "2020-01-15"
    },
    {
      id: 2,
      name: "Marcus Rodriguez",
      role: "CTO & Co-Founder",
      department: "Engineering",
      email: "marcus@techflow.com",
      phone: "+1 (555) 123-4569",
      bio: "Ex-Facebook engineer specializing in distributed systems and AI",
      skills: ["Backend Development", "AI/ML", "System Architecture", "DevOps"],
      experience: "10 years",
      education: "MIT CS, PhD",
      achievements: ["Open source contributor", "Tech conference speaker"],
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      status: "active",
      joinDate: "2020-01-15"
    },
    {
      id: 3,
      name: "Emily Watson",
      role: "Head of Marketing",
      department: "Marketing",
      email: "emily@techflow.com",
      phone: "+1 (555) 123-4570",
      bio: "Growth marketing expert with track record of scaling SaaS companies",
      skills: ["Growth Marketing", "Content Strategy", "Brand Management", "Analytics"],
      experience: "6 years",
      education: "UC Berkeley Marketing",
      achievements: ["2x company growth", "Award-winning campaigns"],
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      status: "active",
      joinDate: "2020-06-01"
    }
  ]);

  const [jobPostings] = useState([
    {
      id: 1,
      title: "Senior Full Stack Engineer",
      department: "Engineering",
      type: "Full-time",
      location: "San Francisco, CA",
      remote: "Hybrid",
      salary: "$120k - $160k",
      experience: "5+ years",
      posted: "2024-01-15",
      status: "active",
      description: "We're looking for a senior full-stack engineer to join our core platform team. You'll work on building scalable APIs, user interfaces, and integrating AI capabilities.",
      requirements: [
        "5+ years of full-stack development experience",
        "Strong experience with React, Node.js, and Python",
        "Experience with cloud platforms (AWS, GCP, or Azure)",
        "Knowledge of AI/ML integration",
        "Strong problem-solving and communication skills"
      ],
      benefits: [
        "Competitive salary and equity",
        "Health, dental, and vision insurance",
        "Flexible work arrangements",
        "Professional development budget",
        "Stock options"
      ],
      applicants: 24,
      views: 156
    },
    {
      id: 2,
      title: "Product Marketing Manager",
      department: "Marketing",
      type: "Full-time",
      location: "Remote",
      remote: "Fully Remote",
      salary: "$90k - $120k",
      experience: "3+ years",
      posted: "2024-01-10",
      status: "active",
      description: "Join our marketing team to drive product positioning, go-to-market strategies, and customer acquisition for our AI automation platform.",
      requirements: [
        "3+ years in product marketing for B2B SaaS",
        "Experience with AI/ML products preferred",
        "Strong analytical and communication skills",
        "Experience with marketing automation tools",
        "Bachelor's degree in Marketing or related field"
      ],
      benefits: [
        "Competitive salary and equity",
        "Health, dental, and vision insurance",
        "Remote work flexibility",
        "Professional development opportunities",
        "Stock options"
      ],
      applicants: 18,
      views: 98
    }
  ]);

  const [projectPostings] = useState([
    {
      id: 1,
      title: "AI Workflow Integration Project",
      department: "Engineering",
      priority: "High",
      status: "In Progress",
      startDate: "2024-01-01",
      endDate: "2024-03-31",
      budget: "$50,000",
      team: ["Marcus Rodriguez", "Sarah Chen"],
      description: "Develop and integrate AI-powered workflow automation features into our core platform. This project involves building machine learning models for process optimization and creating intuitive user interfaces for workflow configuration.",
      deliverables: [
        "AI workflow engine implementation",
        "User interface for workflow builder",
        "Integration with existing platform APIs",
        "Comprehensive testing suite",
        "Documentation and training materials"
      ],
      progress: 65,
      milestones: [
        { name: "Research & Planning", completed: true, date: "2024-01-15" },
        { name: "Core Engine Development", completed: true, date: "2024-02-15" },
        { name: "UI Implementation", completed: false, date: "2024-03-01" },
        { name: "Testing & Integration", completed: false, date: "2024-03-15" },
        { name: "Launch & Documentation", completed: false, date: "2024-03-31" }
      ]
    },
    {
      id: 2,
      title: "Brand Identity Refresh",
      department: "Marketing",
      priority: "Medium",
      status: "Planning",
      startDate: "2024-02-01",
      endDate: "2024-04-30",
      budget: "$25,000",
      team: ["Emily Watson"],
      description: "Complete brand identity refresh including new logo, color palette, typography, and brand guidelines. This project aims to modernize our visual identity and better reflect our AI-first positioning.",
      deliverables: [
        "New logo and brand mark",
        "Updated color palette and typography",
        "Brand guidelines document",
        "Marketing materials templates",
        "Website design updates"
      ],
      progress: 15,
      milestones: [
        { name: "Brand Audit & Research", completed: true, date: "2024-02-15" },
        { name: "Concept Development", completed: false, date: "2024-03-01" },
        { name: "Design Iterations", completed: false, date: "2024-03-15" },
        { name: "Final Brand Package", completed: false, date: "2024-04-01" },
        { name: "Implementation", completed: false, date: "2024-04-30" }
      ]
    }
  ]);

  const [documents] = useState([
    {
      id: 1,
      name: "Company Handbook 2024",
      type: "PDF",
      size: "2.4 MB",
      category: "HR",
      lastModified: "2024-01-10",
      author: "Sarah Chen",
      description: "Complete employee handbook with policies, procedures, and company culture guidelines."
    },
    {
      id: 2,
      name: "Q4 Financial Report",
      type: "Excel",
      size: "1.8 MB",
      category: "Finance",
      lastModified: "2024-01-05",
      author: "Finance Team",
      description: "Detailed financial analysis and performance metrics for Q4 2023."
    },
    {
      id: 3,
      name: "Product Roadmap 2024",
      type: "PowerPoint",
      size: "3.2 MB",
      category: "Product",
      lastModified: "2024-01-08",
      author: "Sarah Chen",
      description: "Strategic product roadmap outlining key features and milestones for 2024."
    }
  ]);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Building2 },
    { id: 'team', label: 'Team', icon: Users },
    { id: 'jobs', label: 'Job Postings', icon: Briefcase },
    { id: 'projects', label: 'Projects', icon: FolderOpen },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const categories = {
    team: ['All', 'Leadership', 'Engineering', 'Marketing', 'Sales', 'Operations'],
    jobs: ['All', 'Engineering', 'Marketing', 'Sales', 'Operations', 'Design'],
    projects: ['All', 'Engineering', 'Marketing', 'Product', 'Operations'],
    documents: ['All', 'HR', 'Finance', 'Product', 'Legal', 'Marketing']
  };

  const getCurrentData = () => {
    switch (activeTab) {
      case 'team': return teamMembers;
      case 'jobs': return jobPostings;
      case 'projects': return projectPostings;
      case 'documents': return documents;
      default: return [];
    }
  };

  const filteredData = getCurrentData().filter(item => {
    const matchesSearch = 
      item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.role?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || 
      item.department?.toLowerCase() === selectedCategory.toLowerCase() ||
      item.category?.toLowerCase() === selectedCategory.toLowerCase();
    
    return matchesSearch && matchesCategory;
  });

  const handleEditProfile = () => {
    setModalType('edit-profile');
    setShowModal(true);
  };

  const handleAddJob = () => {
    setModalType('add-job');
    setShowModal(true);
  };

  const handleAddProject = () => {
    setModalType('add-project');
    setShowModal(true);
  };

  const handleViewDetails = (item) => {
    setSelectedItem(item);
    setModalType('view-details');
    setShowModal(true);
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Company Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="enterprise-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Employees</p>
              <p className="text-3xl font-bold text-gray-900">{companyProfile.employees}</p>
            </div>
            <Users className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        
        <div className="enterprise-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Jobs</p>
              <p className="text-3xl font-bold text-gray-900">{jobPostings.filter(job => job.status === 'active').length}</p>
            </div>
            <Briefcase className="h-8 w-8 text-green-600" />
          </div>
        </div>
        
        <div className="enterprise-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Projects</p>
              <p className="text-3xl font-bold text-gray-900">{projectPostings.filter(project => project.status === 'In Progress').length}</p>
            </div>
            <FolderOpen className="h-8 w-8 text-purple-600" />
          </div>
        </div>
        
        <div className="enterprise-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Documents</p>
              <p className="text-3xl font-bold text-gray-900">{documents.length}</p>
            </div>
            <FileText className="h-8 w-8 text-orange-600" />
          </div>
        </div>
      </div>

      {/* Company Profile Summary */}
      <div className="enterprise-card p-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold text-gray-900">{companyProfile.name}</h3>
            <p className="text-lg text-gray-600">{companyProfile.tagline}</p>
          </div>
          <button
            onClick={handleEditProfile}
            className="enterprise-button-primary flex items-center space-x-2"
          >
            <Edit className="h-4 w-4" />
            <span>Edit Profile</span>
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Company Info</h4>
            <div className="space-y-2 text-sm text-gray-600">
              <p><span className="font-medium">Industry:</span> {companyProfile.industry}</p>
              <p><span className="font-medium">Stage:</span> {companyProfile.stage}</p>
              <p><span className="font-medium">Founded:</span> {companyProfile.founded}</p>
              <p><span className="font-medium">Location:</span> {companyProfile.location}</p>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Key Metrics</h4>
            <div className="space-y-2 text-sm text-gray-600">
              <p><span className="font-medium">Revenue:</span> {companyProfile.metrics.revenue}</p>
              <p><span className="font-medium">Growth:</span> {companyProfile.metrics.growth}</p>
              <p><span className="font-medium">Customers:</span> {companyProfile.metrics.customers}</p>
              <p><span className="font-medium">Satisfaction:</span> {companyProfile.metrics.satisfaction}</p>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Contact</h4>
            <div className="space-y-2 text-sm text-gray-600">
              <p><span className="font-medium">Website:</span> {companyProfile.website}</p>
              <p><span className="font-medium">Email:</span> {companyProfile.email}</p>
              <p><span className="font-medium">Phone:</span> {companyProfile.phone}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="enterprise-card p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <p className="text-sm text-gray-600">New job posting: Senior Full Stack Engineer</p>
            <span className="text-xs text-gray-400">2 hours ago</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <p className="text-sm text-gray-600">AI Workflow Integration Project - 65% complete</p>
            <span className="text-xs text-gray-400">1 day ago</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <p className="text-sm text-gray-600">Company Handbook 2024 updated</p>
            <span className="text-xs text-gray-400">3 days ago</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTeam = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Team Members</h2>
        <button className="enterprise-button-primary flex items-center space-x-2">
          <UserPlus className="h-4 w-4" />
          <span>Add Member</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredData.map((member) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="enterprise-card p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start space-x-4 mb-4">
              <img
                src={member.avatar}
                alt={member.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                <p className="text-sm text-gray-600">{member.role}</p>
                <p className="text-xs text-gray-500">{member.department}</p>
              </div>
            </div>
            
            <p className="text-sm text-gray-600 mb-4">{member.bio}</p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {member.skills.slice(0, 3).map((skill, index) => (
                <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                  {skill}
                </span>
              ))}
            </div>
            
            <div className="flex justify-between items-center">
              <div className="text-xs text-gray-500">
                <p>Experience: {member.experience}</p>
                <p>Joined: {new Date(member.joinDate).toLocaleDateString()}</p>
              </div>
              <button
                onClick={() => handleViewDetails(member)}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                View Details
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderJobs = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Job Postings</h2>
        <button
          onClick={handleAddJob}
          className="enterprise-button-primary flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Post Job</span>
        </button>
      </div>

      <div className="space-y-4">
        {filteredData.map((job) => (
          <motion.div
            key={job.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="enterprise-card p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
                <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                  <span className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {job.location}
                  </span>
                  <span className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {job.type}
                  </span>
                  <span className="flex items-center">
                    <DollarSign className="h-4 w-4 mr-1" />
                    {job.salary}
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 text-xs rounded-full ${
                  job.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {job.status}
                </span>
                <button
                  onClick={() => handleViewDetails(job)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <Eye className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            <p className="text-gray-600 mb-4">{job.description}</p>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span>{job.applicants} applicants</span>
                <span>{job.views} views</span>
                <span>Posted {new Date(job.posted).toLocaleDateString()}</span>
              </div>
              <div className="flex space-x-2">
                <button className="text-gray-600 hover:text-gray-800">
                  <Edit className="h-4 w-4" />
                </button>
                <button className="text-red-600 hover:text-red-800">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderProjects = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Projects</h2>
        <button
          onClick={handleAddProject}
          className="enterprise-button-primary flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>New Project</span>
        </button>
      </div>

      <div className="space-y-4">
        {filteredData.map((project) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="enterprise-card p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{project.title}</h3>
                <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                  <span className="flex items-center">
                    <Target className="h-4 w-4 mr-1" />
                    {project.department}
                  </span>
                  <span className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {new Date(project.startDate).toLocaleDateString()} - {new Date(project.endDate).toLocaleDateString()}
                  </span>
                  <span className="flex items-center">
                    <DollarSign className="h-4 w-4 mr-1" />
                    {project.budget}
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 text-xs rounded-full ${
                  project.priority === 'High' ? 'bg-red-100 text-red-800' :
                  project.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {project.priority}
                </span>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  project.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                  project.status === 'Planning' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {project.status}
                </span>
              </div>
            </div>
            
            <p className="text-gray-600 mb-4">{project.description}</p>
            
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Progress</span>
                <span className="text-sm text-gray-600">{project.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${project.progress}%` }}
                ></div>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-500">
                <p>Team: {project.team.join(', ')}</p>
              </div>
              <button
                onClick={() => handleViewDetails(project)}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                View Details
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderDocuments = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Documents</h2>
        <button className="enterprise-button-primary flex items-center space-x-2">
          <Upload className="h-4 w-4" />
          <span>Upload Document</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredData.map((doc) => (
          <motion.div
            key={doc.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="enterprise-card p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start space-x-4 mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">{doc.name}</h3>
                <p className="text-sm text-gray-600">{doc.type} • {doc.size}</p>
                <p className="text-xs text-gray-500">{doc.category}</p>
              </div>
            </div>
            
            <p className="text-sm text-gray-600 mb-4">{doc.description}</p>
            
            <div className="flex justify-between items-center">
              <div className="text-xs text-gray-500">
                <p>By {doc.author}</p>
                <p>{new Date(doc.lastModified).toLocaleDateString()}</p>
              </div>
              <div className="flex space-x-2">
                <button className="text-blue-600 hover:text-blue-800">
                  <Download className="h-4 w-4" />
                </button>
                <button className="text-gray-600 hover:text-gray-800">
                  <Eye className="h-4 w-4" />
                </button>
                <button className="text-red-600 hover:text-red-800">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview': return renderOverview();
      case 'team': return renderTeam();
      case 'jobs': return renderJobs();
      case 'projects': return renderProjects();
      case 'documents': return renderDocuments();
      default: return renderOverview();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">StartupHub</h1>
          <p className="text-xl text-gray-600">Your complete startup management center</p>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="h-5 w-5" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Search and Filters */}
        {activeTab !== 'overview' && (
          <div className="mb-6 flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder={`Search ${activeTab}...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="flex space-x-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories[activeTab]?.map((category) => (
                  <option key={category} value={category.toLowerCase()}>
                    {category}
                  </option>
                ))}
              </select>
              
              <div className="flex border border-gray-300 rounded-lg">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-500'}`}
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-500'}`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderTabContent()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default StartupHub;
