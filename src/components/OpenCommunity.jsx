import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, MessageSquare, TrendingUp, Star, Heart, Share2, Bookmark, Flag, 
  Search, Plus, Globe, Crown, Zap, Award, Target, Lightbulb, Rocket, 
  Building, Code, Palette, BarChart3, Calendar, Clock, Eye, MessageCircle, 
  ArrowUp, Brain, Shield, Trophy, Video, FileText, Users2, Bell, CheckCircle
} from 'lucide-react';
import '../App.css';

const OpenCommunity = () => {
  const [activeTab, setActiveTab] = useState('trending');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('trending');
  const [selectedPost, setSelectedPost] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [userPosts, setUserPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState(new Set());
  const [bookmarkedPosts, setBookmarkedPosts] = useState(new Set());
  const [upvotedPosts, setUpvotedPosts] = useState(new Set());
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    category: 'startup',
    tags: [],
    type: 'discussion'
  });

  const [tagInput, setTagInput] = useState('');
  const [guidelinesAccepted, setGuidelinesAccepted] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [hasMorePosts, setHasMorePosts] = useState(true);

  const userProfile = {
    name: 'Meet Patel',
    avatar: '👨‍💼',
    role: 'Founder & CEO',
    company: 'StartupOS',
    reputation: 1250,
    level: 'Community Leader',
    badges: ['Community Leader', 'AI Pioneer', 'Startup Expert'],
    premium: true,
    verified: true
  };

  // Dynamic posts state instead of static
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: 'How we scaled from 0 to 100K users in 6 months with $0 marketing budget',
      content: 'Complete growth strategy breakdown focusing on product-led growth, community building, and viral mechanics. Key insights: 1) Product-market fit validation, 2) Referral program driving 40% growth, 3) Content marketing positioning, 4) Community engagement creating brand advocates.',
      author: {
        name: 'Sarah Chen',
        avatar: '👩‍💼',
        role: 'Growth Lead',
        company: 'TechFlow',
        reputation: 890,
        verified: true,
        premium: true
      },
      category: 'growth',
      tags: ['growth', 'scaling', 'product-led-growth'],
      stats: { views: 15420, likes: 342, comments: 89, shares: 156, upvotes: 567 },
      timestamp: '2 hours ago',
      trending: true,
      featured: true,
      premium: false,
      readTime: '8 min read',
      difficulty: 'intermediate',
      hasResources: true,
      resources: ['Growth Framework PDF', 'Referral Program Template']
    },
    {
      id: 2,
      title: 'The AI tools that saved our startup $50K this year - Complete implementation guide',
      content: 'AI implementation strategy: 1) Customer support automation with GPT-4 (60% ticket reduction), 2) AI-powered lead scoring (35% conversion improvement), 3) Content generator saving 20 hours/week. Includes exact prompts, tools, and ROI calculations.',
      author: {
        name: 'Alex Rodriguez',
        avatar: '👨‍💻',
        role: 'CTO',
        company: 'AI Startup',
        reputation: 567,
        verified: true,
        premium: true
      },
      category: 'ai',
      tags: ['ai', 'automation', 'cost-savings', 'gpt-4'],
      stats: { views: 8920, likes: 234, comments: 67, shares: 89, upvotes: 234 },
      timestamp: '5 hours ago',
      trending: true,
      featured: false,
      premium: true,
      readTime: '12 min read',
      difficulty: 'advanced',
      hasVideo: true,
      hasResources: true,
      resources: ['AI Implementation Checklist', 'GPT-4 Prompt Library']
    }
  ]);

  // Dynamic categories with real-time post counts
  const [categories, setCategories] = useState([
    { id: 'all', name: 'All Topics', icon: Globe, color: 'blue', count: 0 },
    { id: 'startup', name: 'Startup Life', icon: Rocket, color: 'green', count: 0 },
    { id: 'ai', name: 'AI & Tech', icon: Zap, color: 'purple', count: 0 },
    { id: 'funding', name: 'Funding', icon: Target, color: 'orange', count: 0 },
    { id: 'growth', name: 'Growth', icon: TrendingUp, color: 'red', count: 0 }
  ]);

  // Update category counts based on posts
  useEffect(() => {
    setCategories(prevCategories => 
      prevCategories.map(category => ({
        ...category,
        count: category.id === 'all' ? posts.length : posts.filter(post => post.category === category.id).length
      }))
    );
  }, [posts]);

  const [communityStats, setCommunityStats] = useState({
    totalMembers: 125000,
    activeMembers: 89000,
    totalPosts: 45600,
    totalDiscussions: 23400,
    totalResources: 8900,
    totalEvents: 156
  });

  const handleStatClick = (statType) => {
    switch (statType) {
      case 'members':
        setSearchQuery('members');
        addNotification('Searching for community members', 'info');
        break;
      case 'posts':
        setSearchQuery('');
        addNotification('Showing all posts', 'info');
        break;
      case 'discussions':
        setSearchQuery('discussion');
        addNotification('Filtering by discussions', 'info');
        break;
      case 'resources':
        setSearchQuery('resource');
        addNotification('Searching for resources', 'info');
        break;
      case 'events':
        setSearchQuery('event');
        addNotification('Searching for events', 'info');
        break;
    }
  };

  const [trendingTopics, setTrendingTopics] = useState([
    { id: 1, name: 'AI & Automation', count: 234, trending: true },
    { id: 2, name: 'Startup Funding', count: 189, trending: true },
    { id: 3, name: 'Product Growth', count: 156, trending: false },
    { id: 4, name: 'Team Building', count: 134, trending: false },
    { id: 5, name: 'Market Strategy', count: 98, trending: false }
  ]);

  const handleTopicClick = (topic) => {
    setSearchQuery(topic.name);
    setCategoryFilter('all');
    addNotification(`Searching for: ${topic.name}`, 'info');
  };

  const handleTopicFollow = (topicId) => {
    setTrendingTopics(prev => 
      prev.map(topic => 
        topic.id === topicId 
          ? { ...topic, following: !topic.following }
          : topic
      )
    );
    
    const topic = trendingTopics.find(t => t.id === topicId);
    if (topic) {
      addNotification(
        topic.following ? `Unfollowed ${topic.name}` : `Following ${topic.name}`,
        'info'
      );
    }
  };

  const upcomingEvents = [
    { title: 'AI Startup Pitch Competition', date: 'Tomorrow, 2:00 PM', attendees: 156, featured: true },
    { title: 'Founder Networking Mixer', date: 'Friday, 6:00 PM', attendees: 89, featured: false },
    { title: 'Growth Marketing Workshop', date: 'Next Monday, 10:00 AM', attendees: 234, featured: true }
  ];

  const expertMentors = [
    { name: 'Dr. Sarah Chen', expertise: 'AI & Machine Learning', company: 'Stanford AI Lab', rating: 4.9, hourlyRate: '$500' },
    { name: 'Mark Johnson', expertise: 'Startup Funding', company: 'Sequoia Capital', rating: 4.8, hourlyRate: '$800' },
    { name: 'Lisa Rodriguez', expertise: 'Product Strategy', company: 'Product Hunt', rating: 4.9, hourlyRate: '$400' }
  ];

  const [recentMembers, setRecentMembers] = useState([
    { id: 1, name: 'David Kim', avatar: '👨‍💼', role: 'Founder', company: 'TechFlow', joined: '2 hours ago', online: true },
    { id: 2, name: 'Sarah Chen', avatar: '👩‍💼', role: 'CTO', company: 'AI Startup', joined: '4 hours ago', online: true },
    { id: 3, name: 'Alex Rodriguez', avatar: '👨‍💻', role: 'Product Manager', company: 'GrowthCo', joined: '6 hours ago', online: false },
    { id: 4, name: 'Emma Wilson', avatar: '👩‍💻', role: 'Designer', company: 'DesignLab', joined: '8 hours ago', online: false }
  ]);

  const handleMemberClick = (member) => {
    setSearchQuery(member.name);
    addNotification(`Searching for posts by ${member.name}`, 'info');
  };

  const handleFollowMember = (memberId) => {
    setRecentMembers(prev => 
      prev.map(member => 
        member.id === memberId 
          ? { ...member, following: !member.following }
          : member
      )
    );
    
    const member = recentMembers.find(m => m.id === memberId);
    if (member) {
      addNotification(
        member.following ? `Unfollowed ${member.name}` : `Following ${member.name}`,
        'info'
      );
    }
  };

  // Filter and sort posts
  const filteredPosts = posts.filter(post => {
    const matchesSearch = searchQuery === '' || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = categoryFilter === 'all' || post.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    switch (sortBy) {
      case 'trending':
        return (b.stats.likes + b.stats.upvotes) - (a.stats.likes + a.stats.upvotes);
      case 'latest':
        return new Date(b.timestamp) - new Date(a.timestamp);
      case 'most-liked':
        return b.stats.likes - a.stats.likes;
      case 'most-upvoted':
        return b.stats.upvotes - a.stats.upvotes;
      default:
        return 0;
    }
  });

  // Calculate pagination
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentPosts = sortedPosts.slice(0, endIndex);

  const loadMorePosts = () => {
    if (endIndex < sortedPosts.length) {
      setCurrentPage(prev => prev + 1);
    } else {
      setHasMorePosts(false);
    }
  };

  const resetPagination = () => {
    setCurrentPage(1);
    setHasMorePosts(true);
  };

  // Reset pagination when filters change
  useEffect(() => {
    resetPagination();
  }, [searchQuery, categoryFilter, sortBy]);

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  // Interactive Functions
  const handleLikePost = (postId) => {
    setPosts(prevPosts => 
      prevPosts.map(post => 
        post.id === postId 
          ? { ...post, stats: { ...post.stats, likes: post.stats.likes + (likedPosts.has(postId) ? -1 : 1) } }
          : post
      )
    );
    
    if (likedPosts.has(postId)) {
      setLikedPosts(prev => new Set([...prev].filter(id => id !== postId)));
      addNotification('Post unliked', 'info');
    } else {
      setLikedPosts(prev => new Set([...prev, postId]));
      addNotification('Post liked!', 'success');
    }
  };

  const handleBookmarkPost = (postId) => {
    if (bookmarkedPosts.has(postId)) {
      setBookmarkedPosts(prev => new Set([...prev].filter(id => id !== postId)));
      addNotification('Post removed from bookmarks', 'info');
    } else {
      setBookmarkedPosts(prev => new Set([...prev, postId]));
      addNotification('Post bookmarked!', 'success');
    }
  };

  const handleUpvotePost = (postId) => {
    setPosts(prevPosts => 
      prevPosts.map(post => 
        post.id === postId 
          ? { ...post, stats: { ...post.stats, upvotes: post.stats.upvotes + (upvotedPosts.has(postId) ? -1 : 1) } }
          : post
      )
    );
    
    if (upvotedPosts.has(postId)) {
      setUpvotedPosts(prev => new Set([...prev].filter(id => id !== postId)));
      addNotification('Upvote removed', 'info');
    } else {
      setUpvotedPosts(prev => new Set([...prev, postId]));
      addNotification('Post upvoted!', 'success');
    }
  };

  const handleSharePost = (postId) => {
    setPosts(prevPosts => 
      prevPosts.map(post => 
        post.id === postId 
          ? { ...post, stats: { ...post.stats, shares: post.stats.shares + 1 } }
          : post
      )
    );
    
    // Simulate share functionality
    if (navigator.share) {
      const post = posts.find(p => p.id === postId);
      navigator.share({
        title: post.title,
        text: post.content.substring(0, 100) + '...',
        url: window.location.href
      });
    } else {
      // Fallback: copy to clipboard
      const post = posts.find(p => p.id === postId);
      navigator.clipboard.writeText(`${post.title}\n${window.location.href}`);
      addNotification('Post link copied to clipboard!', 'success');
    }
  };

  const handleCommentPost = (postId) => {
    const comment = prompt('Add your comment:');
    if (comment && comment.trim()) {
      setPosts(prevPosts => 
        prevPosts.map(post => 
          post.id === postId 
            ? { ...post, stats: { ...post.stats, comments: post.stats.comments + 1 } }
            : post
        )
      );
      addNotification('Comment added successfully!', 'success');
    }
  };

  const handleFindEvent = () => {
    addNotification('Opening events calendar...', 'info');
    // Simulate opening events
    setActiveTab('events');
  };

  const handleFindMentor = () => {
    addNotification('Opening mentor directory...', 'info');
    // Simulate opening mentors
    setActiveTab('mentors');
  };

  const handleJoinEvent = (eventIndex) => {
    const event = upcomingEvents[eventIndex];
    if (!event.joined) {
      setUpcomingEvents(prev => 
        prev.map((e, idx) => 
          idx === eventIndex 
            ? { ...e, attendees: e.attendees + 1, joined: true }
            : e
        )
      );
      addNotification('Successfully joined event!', 'success');
    } else {
      addNotification('You have already joined this event.', 'info');
    }
  };

  const handleConnectMentor = (mentorIndex) => {
    const mentor = expertMentors[mentorIndex];
    if (!mentor.connected) {
      setExpertMentors(prev => 
        prev.map((m, idx) => 
          idx === mentorIndex 
            ? { ...m, connected: true }
            : m
        )
      );
      addNotification('Connection request sent to mentor!', 'success');
    } else {
      addNotification('You are already connected to this mentor.', 'info');
    }
  };

  const handleCategoryClick = (categoryId) => {
    setCategoryFilter(categoryId);
    setSearchQuery('');
    addNotification(`Filtered by ${categories.find(c => c.id === categoryId)?.name}`, 'info');
  };

  const handleSortChange = (sortType) => {
    setSortBy(sortType);
    addNotification(`Sorted by ${sortType}`, 'info');
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      addNotification(`Searching for: ${searchQuery}`, 'info');
    }
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    addNotification(`Switched to ${tabId} tab`, 'info');
  };

  const addNotification = (message, type = 'info') => {
    const notification = {
      id: Date.now(),
      message,
      type,
      timestamp: new Date()
    };
    setNotifications(prev => [notification, ...prev.slice(0, 9)]);
    
    // Auto-remove notification after 5 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== notification.id));
    }, 5000);
  };

  const handleCreatePost = async () => {
    if (!newPost.title.trim() || !newPost.content.trim()) {
      addNotification('Please fill in all required fields', 'error');
      return;
    }

    if (newPost.title.length < 10) {
      addNotification('Title must be at least 10 characters long', 'error');
      return;
    }

    if (newPost.content.length < 50) {
      addNotification('Content must be at least 50 characters long', 'error');
      return;
    }

    if (newPost.tags.length > 10) {
      addNotification('Maximum 10 tags allowed', 'error');
      return;
    }

    setIsCreatingPost(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const post = {
        id: Date.now(),
        title: newPost.title.trim(),
        content: newPost.content.trim(),
        author: userProfile,
        category: newPost.category,
        tags: newPost.tags,
        stats: { views: 0, likes: 0, comments: 0, shares: 0, upvotes: 0 },
        timestamp: 'Just now',
        trending: false,
        featured: false,
        premium: false,
        readTime: `${Math.ceil(newPost.content.length / 200)} min read`,
        difficulty: 'beginner',
        hasVideo: false,
        hasResources: false
      };

      setPosts(prevPosts => [post, ...prevPosts]);
      setUserPosts(prev => [post, ...prev]);
      setNewPost({ title: '', content: '', category: 'startup', tags: [], type: 'discussion' });
      setShowCreatePost(false);
      setIsCreatingPost(false);
      addNotification('Post created successfully!', 'success');
    } catch (error) {
      setIsCreatingPost(false);
      addNotification('Failed to create post. Please try again.', 'error');
    }
  };

  const handleAddTag = (tag) => {
    if (tag.trim() && !newPost.tags.includes(tag.trim())) {
      setNewPost(prev => ({ ...prev, tags: [...prev.tags, tag.trim()] }));
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setNewPost(prev => ({ ...prev, tags: prev.tags.filter(tag => tag !== tagToRemove) }));
  };

  const handleTagInputChange = (value) => {
    setTagInput(value);
  };

  const handleTagInputKeyPress = (e) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      handleAddTag(tagInput);
      setTagInput('');
    }
  };

  const handleTagInputSubmit = () => {
    if (tagInput.trim()) {
      handleAddTag(tagInput);
      setTagInput('');
    }
  };

  const handlePostClick = (post) => {
    setSelectedPost(post);
    // Increment view count
    setPosts(prevPosts => 
      prevPosts.map(p => 
        p.id === post.id 
          ? { ...p, stats: { ...p.stats, views: p.stats.views + 1 } }
          : p
      )
    );
  };

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setPosts(prevPosts => 
        prevPosts.map(post => ({
          ...post,
          stats: {
            ...post.stats,
            views: post.stats.views + Math.floor(Math.random() * 5)
          }
        }))
      );
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  // Add sample notifications
  useEffect(() => {
    const sampleNotifications = [
      { id: 1, message: 'New member joined: David Kim', type: 'info', timestamp: new Date(Date.now() - 300000) },
      { id: 2, message: 'Your post got 5 new likes!', type: 'success', timestamp: new Date(Date.now() - 600000) },
      { id: 3, message: 'Event reminder: AI Startup Pitch Competition tomorrow', type: 'warning', timestamp: new Date(Date.now() - 900000) }
    ];
    setNotifications(sampleNotifications);
  }, []);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 'k':
            e.preventDefault();
            document.querySelector('input[placeholder="Search posts, topics, or members..."]')?.focus();
            break;
          case 'n':
            e.preventDefault();
            setShowCreatePost(true);
            break;
          case 'Escape':
            setShowCreatePost(false);
            setSelectedPost(null);
            break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, []);

  const handleAcceptGuidelines = () => {
    setGuidelinesAccepted(true);
    addNotification('Community guidelines accepted! Welcome to the community!', 'success');
  };

  const renderCommunityHeader = () => (
    <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700">
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.15'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-300/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-blue-300/10 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          {/* Enhanced Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-black text-white mb-8 leading-tight tracking-tight"
          >
            The world's most powerful{' '}
            <span className="bg-gradient-to-r from-yellow-300 via-orange-300 to-red-400 bg-clip-text text-transparent drop-shadow-lg">
              startup community
            </span>
          </motion.h1>
          
          {/* Enhanced Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-blue-100 mb-12 max-w-4xl mx-auto leading-relaxed font-medium"
          >
            Connect with founders, experts, and innovators building the future of business.
          </motion.p>
          
          {/* Enhanced User Welcome */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white/15 backdrop-blur-md rounded-3xl p-8 mb-12 inline-block border border-white/20 shadow-2xl"
          >
            <div className="flex items-center justify-center space-x-6">
              <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 via-orange-400 to-red-400 rounded-full flex items-center justify-center text-3xl shadow-lg">
                {userProfile.avatar}
              </div>
              <div className="text-left">
                <h3 className="text-2xl font-bold text-white mb-2">Welcome back, {userProfile.name}!</h3>
                <div className="flex items-center space-x-6 text-blue-100">
                  <span className="flex items-center space-x-3">
                    <Star size={18} className="text-yellow-300" />
                    <span className="font-semibold">{userProfile.reputation} reputation</span>
                  </span>
                  <span className="flex items-center space-x-3">
                    <Crown size={18} className="text-yellow-300" />
                    <span className="font-semibold">{userProfile.level}</span>
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Enhanced Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowCreatePost(true)}
              className="group bg-white text-blue-600 px-10 py-5 rounded-2xl font-bold hover:bg-gray-50 transition-all duration-300 shadow-2xl hover:shadow-3xl transform text-lg"
            >
              <span className="flex items-center space-x-3">
                <Plus size={22} className="group-hover:rotate-90 transition-transform duration-300" />
                <span>Create Post</span>
              </span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleFindEvent}
              className="group bg-white/15 backdrop-blur-md text-white px-10 py-5 rounded-2xl font-bold hover:bg-white/25 transition-all duration-300 border-2 border-white/40 hover:border-white/60 shadow-2xl hover:shadow-3xl transform text-lg"
            >
              <span className="flex items-center space-x-3">
                <Calendar size={22} className="group-hover:scale-110 transition-transform duration-300" />
                <span>Join Events</span>
              </span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleFindMentor}
              className="group bg-white/15 backdrop-blur-md text-white px-10 py-5 rounded-2xl font-bold hover:bg-white/25 transition-all duration-300 border-2 border-white/40 hover:border-white/60 shadow-2xl hover:shadow-3xl transform text-lg"
            >
              <span className="flex items-center space-x-3">
                <Users2 size={22} className="group-hover:scale-110 transition-transform duration-300" />
                <span>Find Mentors</span>
              </span>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );

  const renderCommunityStats = () => (
    <div className="bg-gradient-to-br from-white/90 to-blue-50/50 backdrop-blur-md border-b border-gray-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Community Overview</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">Real-time metrics from our thriving startup ecosystem</p>
        </motion.div>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            whileHover={{ scale: 1.08, y: -8 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleStatClick('members')}
            className="group bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 rounded-3xl p-8 text-center cursor-pointer hover:shadow-2xl transition-all duration-500 border-2 border-blue-200 hover:border-blue-400 transform hover:rotate-1"
          >
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 shadow-lg">
              <Users size={32} className="text-white" />
            </div>
            <div className="text-4xl font-black text-gray-900 mb-3 group-hover:text-blue-700 transition-colors duration-300">{formatNumber(communityStats.totalMembers)}</div>
            <div className="text-base text-gray-700 font-semibold group-hover:text-blue-800 transition-colors duration-300">Total Members</div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ scale: 1.08, y: -8 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleStatClick('posts')}
            className="group bg-gradient-to-br from-green-50 via-green-100 to-green-200 rounded-3xl p-8 text-center cursor-pointer hover:shadow-2xl transition-all duration-500 border-2 border-green-200 hover:border-green-400 transform hover:-rotate-1"
          >
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 via-green-600 to-green-700 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-125 group-hover:-rotate-12 transition-all duration-500 shadow-lg">
              <MessageSquare size={32} className="text-white" />
            </div>
            <div className="text-4xl font-black text-gray-900 mb-3 group-hover:text-green-700 transition-colors duration-300">{formatNumber(communityStats.totalPosts)}</div>
            <div className="text-base text-gray-700 font-semibold group-hover:text-green-800 transition-colors duration-300">Total Posts</div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{ scale: 1.08, y: -8 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleStatClick('discussions')}
            className="group bg-gradient-to-br from-purple-50 via-purple-100 to-purple-200 rounded-3xl p-8 text-center cursor-pointer hover:shadow-2xl transition-all duration-500 border-2 border-purple-200 hover:border-purple-400 transform hover:rotate-1"
          >
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 via-purple-600 to-purple-700 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 shadow-lg">
              <MessageSquare size={32} className="text-white" />
            </div>
            <div className="text-4xl font-black text-gray-900 mb-3 group-hover:text-purple-700 transition-colors duration-300">{formatNumber(communityStats.totalDiscussions)}</div>
            <div className="text-base text-gray-700 font-semibold group-hover:text-purple-800 transition-colors duration-300">Discussions</div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ scale: 1.08, y: -8 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleStatClick('resources')}
            className="group bg-gradient-to-br from-orange-50 via-orange-100 to-orange-200 rounded-3xl p-8 text-center cursor-pointer hover:shadow-2xl transition-all duration-500 border-2 border-orange-200 hover:border-orange-400 transform hover:-rotate-1"
          >
            <div className="w-20 h-20 bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-125 group-hover:-rotate-12 transition-all duration-500 shadow-lg">
              <FileText size={32} className="text-white" />
            </div>
            <div className="text-4xl font-black text-gray-900 mb-3 group-hover:text-orange-700 transition-colors duration-300">{formatNumber(communityStats.totalResources)}</div>
            <div className="text-base text-gray-700 font-semibold group-hover:text-orange-800 transition-colors duration-300">Resources</div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            whileHover={{ scale: 1.08, y: -8 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleStatClick('events')}
            className="group bg-gradient-to-br from-red-50 via-red-100 to-red-200 rounded-3xl p-8 text-center cursor-pointer hover:shadow-2xl transition-all duration-500 border-2 border-red-200 hover:border-red-400 transform hover:rotate-1"
          >
            <div className="w-20 h-20 bg-gradient-to-br from-red-500 via-red-600 to-red-700 rounded-3xl p-3 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 shadow-lg">
              <Calendar size={32} className="text-white" />
            </div>
            <div className="text-4xl font-black text-gray-900 mb-3 group-hover:text-red-700 transition-colors duration-300">{formatNumber(communityStats.totalEvents)}</div>
            <div className="text-base text-gray-700 font-semibold group-hover:text-red-800 transition-colors duration-300">Events</div>
          </motion.div>
        </div>
      </div>
    </div>
  );

  const renderFilters = () => (
    <div className="bg-white/95 backdrop-blur-md border-b border-gray-200/50 sticky top-16 z-10 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-6 lg:space-y-0">
          {/* Enhanced Search Bar */}
          <div className="relative flex-1 max-w-lg">
            <form onSubmit={handleSearchSubmit}>
              <div className="relative">
                <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400" size={22} />
                <input
                  type="text"
                  placeholder="Search posts, topics, or members..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-14 pr-24 py-5 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-white/90 backdrop-blur-sm text-lg shadow-md hover:shadow-lg"
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center space-x-3">
                  {searchQuery && (
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="p-2 text-gray-400 hover:text-gray-600 transition-colors bg-gray-100 rounded-full hover:bg-gray-200"
                    >
                      ×
                    </motion.button>
                  )}
                  <kbd className="hidden sm:inline-flex items-center px-3 py-2 text-sm font-mono text-gray-600 bg-gray-100 rounded-xl border-2 border-gray-200 font-semibold">
                    ⌘K
                  </kbd>
                </div>
              </div>
            </form>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
            {/* Enhanced Category Filter */}
            <div className="relative">
              <select
                value={categoryFilter}
                onChange={(e) => handleCategoryClick(e.target.value)}
                className="w-full sm:w-auto border-2 border-gray-200 rounded-2xl px-6 py-5 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-white/90 backdrop-blur-sm min-w-[180px] text-lg font-medium shadow-md hover:shadow-lg appearance-none cursor-pointer"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name} ({category.count})
                  </option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Enhanced Sort Options */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
                className="w-full sm:w-auto border-2 border-gray-200 rounded-2xl px-6 py-5 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-white/90 backdrop-blur-sm min-w-[160px] text-lg font-medium shadow-md hover:shadow-lg appearance-none cursor-pointer"
              >
                <option value="trending">🔥 Trending</option>
                <option value="latest">🕒 Latest</option>
                <option value="most-liked">❤️ Most Liked</option>
                <option value="most-upvoted">⬆️ Most Upvoted</option>
              </select>
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Enhanced Create Post Button */}
            <motion.button
              onClick={() => setShowCreatePost(true)}
              className="group bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white px-10 py-5 rounded-2xl hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 transition-all duration-300 flex items-center justify-center space-x-3 font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 text-lg min-w-[180px]"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              <Plus size={22} className="group-hover:rotate-90 transition-transform duration-300" />
              <span>Create Post</span>
              <kbd className="hidden sm:inline-flex items-center px-2 py-1 text-sm font-mono text-white/80 bg-white/20 rounded-lg border ml-2 font-semibold">
                ⌘N
              </kbd>
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAdvancedSidebar = () => (
    <div className="lg:col-span-1 space-y-8">
      {/* Trending Topics */}
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
            <TrendingUp size={20} className="text-white" />
          </div>
          <span>Trending Topics</span>
        </h3>
        <div className="space-y-4">
          {trendingTopics.map((topic, index) => (
            <motion.div
              key={topic.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group flex items-center justify-between p-4 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 rounded-xl cursor-pointer transition-all duration-300 border border-transparent hover:border-blue-200"
              onClick={() => handleTopicClick(topic)}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold transition-all duration-300 group-hover:scale-110 ${
                  topic.trending ? 'bg-gradient-to-br from-yellow-400 to-orange-400 text-white' : 'bg-gradient-to-br from-blue-400 to-blue-500 text-white'
                }`}>
                  {topic.id}
                </div>
                <span className="text-sm text-gray-700 group-hover:text-blue-600 font-medium">{topic.name}</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="text-xs text-green-600 font-medium">{topic.trending ? '🔥' : ''}</div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleTopicFollow(topic.id);
                  }}
                  className="p-2 text-gray-400 hover:text-blue-500 rounded-lg transition-all duration-300 hover:bg-blue-50"
                  title={topic.following ? 'Unfollow topic' : 'Follow topic'}
                >
                  {topic.following ? '✓' : '+' }
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
            <Calendar size={20} className="text-white" />
          </div>
          <span>Upcoming Events</span>
        </h3>
        <div className="space-y-4">
          {upcomingEvents.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 rounded-xl cursor-pointer transition-all duration-300 border ${
                event.featured 
                  ? 'bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200 shadow-lg' 
                  : 'hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50 border-transparent hover:border-blue-200'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-gray-900 text-sm">{event.title}</h4>
                {event.featured && <Star size={16} className="text-yellow-500" />}
              </div>
              <div className="flex items-center justify-between text-xs text-gray-600 mb-3">
                <span className="flex items-center space-x-2">
                  <Calendar size={12} />
                  <span>{event.date}</span>
                </span>
                <span className="flex items-center space-x-2">
                  <Users size={12} />
                  <span>{event.attendees}</span>
                </span>
              </div>
              <button
                onClick={() => handleJoinEvent(index)}
                disabled={event.joined}
                className={`w-full text-xs px-4 py-2 rounded-lg transition-all duration-300 font-medium ${
                  event.joined 
                    ? 'bg-green-100 text-green-700 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600 shadow-md hover:shadow-lg'
                }`}
              >
                {event.joined ? '✓ Joined' : 'Join Event'}
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Expert Mentors */}
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
            <Award size={20} className="text-white" />
          </div>
          <span>Expert Mentors</span>
        </h3>
        <div className="space-y-4">
          {expertMentors.map((mentor, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group p-4 hover:bg-gradient-to-r hover:from-green-50 hover:to-blue-50 rounded-xl cursor-pointer transition-all duration-300 border border-transparent hover:border-green-200"
            >
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold group-hover:scale-110 transition-transform duration-300">
                  {mentor.avatar || '👨‍💼'}
                </div>
                <div>
                  <div className="font-medium text-gray-900 text-sm">{mentor.name}</div>
                  <div className="text-xs text-gray-600">{mentor.expertise}</div>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs text-gray-600 mb-3">
                <span className="flex items-center space-x-2">
                  <Star size={12} className="text-yellow-500" />
                  <span>{mentor.rating}</span>
                </span>
                <span className="text-green-600 font-medium">{mentor.hourlyRate}</span>
              </div>
              <button
                onClick={() => handleConnectMentor(index)}
                disabled={mentor.connected}
                className={`w-full text-xs px-4 py-2 rounded-lg transition-all duration-300 font-medium ${
                  mentor.connected 
                    ? 'bg-green-100 text-green-700 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-green-500 to-blue-500 text-white hover:from-green-600 hover:to-blue-600 shadow-md hover:shadow-lg'
                }`}
              >
                {mentor.connected ? '✓ Connected' : 'Connect'}
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Recent Members */}
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center">
            <Users2 size={20} className="text-white" />
          </div>
          <span>Recent Members</span>
        </h3>
        <div className="space-y-4">
          {recentMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group flex items-center space-x-3 p-4 rounded-xl hover:bg-gradient-to-r hover:from-indigo-50 hover:to-blue-50 transition-all duration-300 cursor-pointer border border-transparent hover:border-indigo-200"
              onClick={() => handleMemberClick(member)}
            >
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-gray-400 to-gray-500 rounded-xl flex items-center justify-center text-lg group-hover:scale-110 transition-transform duration-300">
                  {member.avatar}
                </div>
                <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white transition-all duration-300 ${
                  member.online ? 'bg-green-500' : 'bg-gray-400'
                }`}></div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <h4 className="text-sm font-medium text-gray-900 truncate">{member.name}</h4>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleFollowMember(member.id);
                    }}
                    className="p-1 text-gray-400 hover:text-blue-500 rounded-lg transition-all duration-300 hover:bg-blue-50"
                    title={member.following ? 'Unfollow' : 'Follow'}
                  >
                    {member.following ? '✓' : '+' }
                  </button>
                </div>
                <p className="text-xs text-gray-600 truncate">{member.role} at {member.company}</p>
                <p className="text-xs text-gray-500">{member.joined}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Community Guidelines */}
      <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl border border-green-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
            <Lightbulb size={20} className="text-white" />
          </div>
          <span>Community Guidelines</span>
        </h3>
        <div className="space-y-3 text-sm text-gray-700 mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Be respectful and constructive</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Share valuable insights and experiences</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Help others grow and succeed</span>
          </div>
        </div>
        <button
          onClick={handleAcceptGuidelines}
          disabled={guidelinesAccepted}
          className={`w-full px-4 py-3 rounded-xl transition-all duration-300 font-medium ${
            guidelinesAccepted 
              ? 'bg-green-100 text-green-700 cursor-not-allowed' 
              : 'bg-gradient-to-r from-green-500 to-blue-500 text-white hover:from-green-600 hover:to-blue-600 shadow-md hover:shadow-lg'
          }`}
        >
          {guidelinesAccepted ? '✓ Guidelines Accepted' : 'Accept Guidelines'}
        </button>
      </div>
    </div>
  );

  const renderAdvancedPost = (post) => (
    <motion.div
      key={post.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-3xl shadow-lg border border-gray-200/50 p-8 hover:shadow-2xl transition-all duration-500 cursor-pointer group hover:border-blue-200/50"
      onClick={() => handlePostClick(post)}
    >
      {/* Enhanced Post Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg group-hover:scale-110 transition-transform duration-300">
            {post.author.avatar}
          </div>
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <span className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">{post.author.name}</span>
              {post.author.verified && (
                <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-md">
                  <span className="text-white text-sm font-bold">✓</span>
                </div>
              )}
              {post.author.premium && (
                <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center shadow-md">
                  <span className="text-white text-sm font-bold">👑</span>
                </div>
              )}
            </div>
            <div className="text-base text-gray-600 font-medium">
              {post.author.role} at {post.author.company}
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="px-4 py-2 rounded-2xl text-sm font-semibold bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 flex items-center space-x-2 shadow-md">
            <Rocket size={16} />
            <span>{categories.find(c => c.id === post.category)?.name}</span>
          </div>
          {post.featured && (
            <div className="px-4 py-2 bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-700 rounded-2xl text-sm font-semibold flex items-center space-x-2 shadow-md">
              <Star size={16} />
              <span>Featured</span>
            </div>
          )}
          {post.premium && (
            <div className="px-4 py-2 bg-gradient-to-r from-purple-100 to-purple-200 text-purple-700 rounded-2xl text-sm font-semibold flex items-center space-x-2 shadow-md">
              <Crown size={16} />
              <span>Premium</span>
            </div>
          )}
        </div>
      </div>

      {/* Enhanced Post Content */}
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300 leading-tight">
          {post.title}
        </h3>
        <p className="text-gray-600 text-lg leading-relaxed line-clamp-3">{post.content}</p>
      </div>

      {/* Enhanced Post Metadata */}
      <div className="flex flex-wrap items-center gap-6 mb-6 text-base text-gray-500">
        <span className="flex items-center space-x-2">
          <Clock size={16} className="text-blue-500" />
          <span className="font-medium">{post.timestamp}</span>
        </span>
        <span className="flex items-center space-x-2">
          <Eye size={16} className="text-green-500" />
          <span className="font-medium">{post.readTime}</span>
        </span>
        <span className="flex items-center space-x-2">
          <Target size={16} className="text-purple-500" />
          <span className="font-medium">{post.difficulty}</span>
        </span>
        {post.hasVideo && (
          <span className="flex items-center space-x-2 text-blue-600 font-medium">
            <Video size={16} />
            <span>Video</span>
          </span>
        )}
        {post.hasResources && (
          <span className="flex items-center space-x-2 text-green-600 font-medium">
            <FileText size={16} />
            <span>Resources</span>
          </span>
        )}
      </div>

      {/* Enhanced Tags */}
      <div className="flex flex-wrap gap-3 mb-6">
        {post.tags.map((tag, index) => (
          <span
            key={index}
            className="px-4 py-2 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-2xl text-sm font-medium hover:from-blue-100 hover:to-blue-200 hover:text-blue-700 transition-all duration-300 cursor-pointer"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Enhanced Post Stats */}
      <div className="flex items-center justify-between text-base text-gray-500 mb-6 p-4 bg-gray-50 rounded-2xl">
        <span className="font-medium">{post.timestamp}</span>
        <div className="flex items-center space-x-6">
          <span className="flex items-center space-x-2">
            <Eye size={16} className="text-blue-500" />
            <span className="font-semibold">{formatNumber(post.stats.views)} views</span>
          </span>
          <span className="flex items-center space-x-2">
            <Heart size={16} className="text-red-500" />
            <span className="font-semibold">{formatNumber(post.stats.likes)} likes</span>
          </span>
          <span className="flex items-center space-x-2">
            <MessageCircle size={16} className="text-blue-500" />
            <span className="font-semibold">{formatNumber(post.stats.comments)} comments</span>
          </span>
          <span className="flex items-center space-x-2">
            <ArrowUp size={16} className="text-yellow-500" />
            <span className="font-semibold">{formatNumber(post.stats.upvotes)} upvotes</span>
          </span>
        </div>
      </div>

      {/* Enhanced Action Buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <div className="flex items-center space-x-6">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => { e.stopPropagation(); handleLikePost(post.id); }}
            className={`flex items-center space-x-3 p-3 rounded-2xl transition-all duration-300 ${
              likedPosts.has(post.id) 
                ? 'text-red-500 bg-red-50 border-2 border-red-200' 
                : 'text-gray-500 hover:text-red-500 hover:bg-red-50 hover:border-2 hover:border-red-200'
            }`}
          >
            <Heart size={18} className={likedPosts.has(post.id) ? 'fill-current' : ''} />
            <span className="font-semibold">{formatNumber(post.stats.likes)}</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => { e.stopPropagation(); handleCommentPost(post.id); }}
            className="flex items-center space-x-3 p-3 rounded-2xl text-gray-500 hover:text-blue-500 hover:bg-blue-50 hover:border-2 hover:border-blue-200 transition-all duration-300"
          >
            <MessageCircle size={18} />
            <span className="font-semibold">{formatNumber(post.stats.comments)}</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => { e.stopPropagation(); handleSharePost(post.id); }}
            className="flex items-center space-x-3 p-3 rounded-2xl text-gray-500 hover:text-green-500 hover:bg-green-50 hover:border-2 hover:border-green-200 transition-all duration-300"
          >
            <Share2 size={18} />
            <span className="font-semibold">{formatNumber(post.stats.shares)}</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => { e.stopPropagation(); handleUpvotePost(post.id); }}
            className={`flex items-center space-x-3 p-3 rounded-2xl transition-all duration-300 ${
              upvotedPosts.has(post.id) 
                ? 'text-yellow-500 bg-yellow-50 border-2 border-yellow-200' 
                : 'text-gray-500 hover:text-yellow-500 hover:bg-yellow-50 hover:border-2 hover:border-yellow-200'
            }`}
          >
            <ArrowUp size={18} className={upvotedPosts.has(post.id) ? 'fill-current' : ''} />
            <span className="font-semibold">{formatNumber(post.stats.upvotes)}</span>
          </motion.button>
        </div>
        
        <div className="flex items-center space-x-3">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => { e.stopPropagation(); handleBookmarkPost(post.id); }}
            className={`p-3 rounded-2xl transition-all duration-300 ${
              bookmarkedPosts.has(post.id) 
                ? 'text-yellow-500 bg-yellow-50 border-2 border-yellow-200' 
                : 'text-gray-400 hover:text-yellow-500 hover:bg-yellow-50 hover:border-2 hover:border-yellow-200'
            }`}
            title="Bookmark"
          >
            <Bookmark size={18} className={bookmarkedPosts.has(post.id) ? 'fill-current' : ''} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-3 text-gray-400 hover:text-red-500 hover:bg-red-50 hover:border-2 hover:border-red-200 rounded-2xl transition-all duration-300"
            title="Report"
            onClick={(e) => { e.stopPropagation(); addNotification('Post reported. Thank you for helping keep our community safe.', 'info'); }}
          >
            <Flag size={18} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );

  const renderAdvancedMainContent = () => (
    <div className="lg:col-span-3 space-y-8">
      {/* Enhanced Tab Navigation */}
      <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-xl border border-gray-200/50 overflow-hidden">
        <div className="flex flex-wrap space-x-1 p-3 bg-gradient-to-r from-gray-50 via-blue-50 to-purple-50">
          {[
            { id: 'trending', label: '🔥 Trending', icon: TrendingUp, badge: null },
            { id: 'latest', label: '🕒 Latest', icon: Clock, badge: null },
            { id: 'questions', label: '❓ Questions', icon: MessageSquare, badge: null },
            { id: 'resources', label: '📚 Resources', icon: Bookmark, badge: null },
            { id: 'events', label: '📅 Events', icon: Calendar, badge: '17' },
            { id: 'mentors', label: '👨‍🏫 Mentors', icon: Award, badge: null }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <motion.button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`flex-1 min-w-[120px] flex items-center justify-center space-x-3 px-6 py-5 rounded-2xl font-semibold transition-all duration-300 relative group ${
                  activeTab === tab.id
                    ? 'bg-white text-blue-600 shadow-xl border-2 border-blue-200 transform scale-105'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-white/80 hover:shadow-lg'
                }`}
              >
                <Icon size={20} className={`group-hover:scale-110 transition-transform duration-300 ${
                  activeTab === tab.id ? 'text-blue-600' : 'text-gray-500'
                }`} />
                <span className="hidden sm:inline">{tab.label}</span>
                {tab.badge && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-3 -right-3 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs px-3 py-1 rounded-full font-bold shadow-lg"
                  >
                    {tab.badge}
                  </motion.span>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Enhanced Posts Grid */}
      <div className="space-y-8">
        {currentPosts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
          >
            {renderAdvancedPost(post)}
          </motion.div>
        ))}
      </div>

      {/* Enhanced Load More */}
      <div className="text-center py-16">
        <motion.button
          whileHover={{ scale: 1.05, y: -3 }}
          whileTap={{ scale: 0.95 }}
          className="group bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white px-16 py-6 rounded-3xl hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 transition-all duration-300 font-bold shadow-2xl hover:shadow-3xl transform disabled:opacity-50 disabled:cursor-not-allowed text-lg"
          onClick={loadMorePosts}
          disabled={!hasMorePosts}
        >
          <span className="flex items-center space-x-4">
            {hasMorePosts ? (
              <>
                <span>Load More Posts</span>
                <ArrowUp size={24} className="group-hover:-translate-y-2 transition-transform duration-300" />
              </>
            ) : (
              <>
                <span>No more posts</span>
                <CheckCircle size={24} />
              </>
            )}
          </span>
        </motion.button>
      </div>
    </div>
  );

  const renderAdvancedPostModal = () => (
    <AnimatePresence>
      {selectedPost && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-gray-900">{selectedPost.title}</h2>
                <button
                  onClick={() => setSelectedPost(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  ×
                </button>
              </div>
            </div>
            
            <div className="p-6">
              {/* Post Content */}
              <div className="prose max-w-none mb-6">
                <p className="text-gray-700 leading-relaxed">{selectedPost.content}</p>
              </div>
              
              {/* Post Metadata */}
              <div className="border-t border-gray-200 pt-6">
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span>{selectedPost.timestamp}</span>
                  <div className="flex items-center space-x-4">
                    <span>{formatNumber(selectedPost.stats.views)} views</span>
                    <span>{formatNumber(selectedPost.stats.likes)} likes</span>
                    <span>{formatNumber(selectedPost.stats.comments)} comments</span>
                    <span>{formatNumber(selectedPost.stats.upvotes)} upvotes</span>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleLikePost(selectedPost.id)}
                      className={`flex items-center space-x-2 transition-colors ${
                        likedPosts.has(selectedPost.id) ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
                      }`}
                    >
                      <Heart size={16} className={likedPosts.has(selectedPost.id) ? 'fill-current' : ''} />
                      <span>{formatNumber(selectedPost.stats.likes)}</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleCommentPost(selectedPost.id)}
                      className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors"
                    >
                      <MessageCircle size={16} />
                      <span>{formatNumber(selectedPost.stats.comments)}</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleSharePost(selectedPost.id)}
                      className="flex items-center space-x-2 text-gray-500 hover:text-green-500 transition-colors"
                    >
                      <Share2 size={16} />
                      <span>{formatNumber(selectedPost.stats.shares)}</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleUpvotePost(selectedPost.id)}
                      className={`flex items-center space-x-2 transition-colors ${
                        upvotedPosts.has(selectedPost.id) ? 'text-yellow-500' : 'text-gray-500 hover:text-yellow-500'
                      }`}
                    >
                      <ArrowUp size={16} className={upvotedPosts.has(selectedPost.id) ? 'fill-current' : ''} />
                      <span>{formatNumber(selectedPost.stats.upvotes)}</span>
                    </motion.button>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleBookmarkPost(selectedPost.id)}
                      className={`p-2 transition-colors ${
                        bookmarkedPosts.has(selectedPost.id) ? 'text-yellow-500' : 'text-gray-400 hover:text-yellow-500'
                      }`}
                      title="Bookmark"
                    >
                      <Bookmark size={16} className={bookmarkedPosts.has(selectedPost.id) ? 'fill-current' : ''} />
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // Main return statement
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-indigo-200/20 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>
      
      {renderCommunityHeader()}
      {renderCommunityStats()}
      {renderFilters()}
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          {renderAdvancedSidebar()}
          {renderAdvancedMainContent()}
        </div>
      </div>

      {renderAdvancedPostModal()}

      {/* Enhanced Post Creation Modal */}
      <AnimatePresence>
        {showCreatePost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-gray-200/50"
            >
              <div className="p-8 border-b border-gray-200/50 bg-gradient-to-r from-gray-50 to-blue-50/30">
                <div className="flex items-center justify-between">
                  <h2 className="text-3xl font-bold text-gray-900">Create New Post</h2>
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowCreatePost(false)}
                    className="p-3 hover:bg-gray-100 rounded-2xl transition-all duration-300 text-2xl"
                  >
                    ×
                  </motion.button>
                </div>
              </div>
              
              <div className="p-8">
                <div className="space-y-6">
                  {/* Enhanced Title */}
                  <div>
                    <label className="block text-lg font-semibold text-gray-700 mb-3">Title *</label>
                    <input
                      type="text"
                      value={newPost.title}
                      onChange={(e) => setNewPost(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Enter your post title..."
                      className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-lg"
                    />
                  </div>

                  {/* Enhanced Content */}
                  <div>
                    <label className="block text-lg font-semibold text-gray-700 mb-3">Content *</label>
                    <textarea
                      value={newPost.content}
                      onChange={(e) => setNewPost(prev => ({ ...prev, content: e.target.value }))}
                      placeholder="Share your insights, experiences, or questions..."
                      rows={8}
                      className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-lg resize-none"
                    />
                  </div>

                  {/* Enhanced Category */}
                  <div>
                    <label className="block text-lg font-semibold text-gray-700 mb-3">Category</label>
                    <select
                      value={newPost.category}
                      onChange={(e) => setNewPost(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-lg appearance-none cursor-pointer bg-white"
                    >
                      {categories.filter(cat => cat.id !== 'all').map(category => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Enhanced Tags */}
                  <div>
                    <label className="block text-lg font-semibold text-gray-700 mb-3">Tags</label>
                    <div className="flex flex-wrap gap-3 mb-4">
                      {newPost.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-4 py-2 bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 rounded-2xl text-sm font-semibold flex items-center space-x-2"
                        >
                          <span>#{tag}</span>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleRemoveTag(tag)}
                            className="hover:text-blue-900 transition-colors"
                          >
                            ×
                          </motion.button>
                        </span>
                      ))}
                    </div>
                    <div className="flex space-x-3">
                      <input
                        type="text"
                        placeholder="Add a tag..."
                        value={tagInput}
                        onChange={handleTagInputChange}
                        onKeyPress={handleTagInputKeyPress}
                        className="flex-1 px-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-lg"
                      />
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleTagInputSubmit}
                        className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl"
                      >
                        Add
                      </motion.button>
                    </div>
                  </div>
                </div>

                {/* Enhanced Action Buttons */}
                <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-gray-200/50">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowCreatePost(false)}
                    className="px-8 py-4 text-gray-600 hover:text-gray-800 transition-colors font-semibold text-lg"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleCreatePost}
                    disabled={isCreatingPost || !newPost.title.trim() || !newPost.content.trim()}
                    className="px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-bold text-lg shadow-xl hover:shadow-2xl flex items-center space-x-3"
                  >
                    {isCreatingPost ? (
                      <>
                        <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Creating...</span>
                      </>
                    ) : (
                      <>
                        <Plus size={24} />
                        <span>Create Post</span>
                      </>
                    )}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced Notifications */}
      <div className="fixed top-24 right-6 z-50 space-y-4">
        {notifications.slice(0, 3).map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: 300, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 300, scale: 0.8 }}
            className={`p-6 rounded-2xl shadow-2xl max-w-sm border-l-4 ${
              notification.type === 'success' ? 'bg-gradient-to-r from-green-500 to-green-600 text-white border-green-400' :
              notification.type === 'error' ? 'bg-gradient-to-r from-red-500 to-red-600 text-white border-red-400' :
              notification.type === 'warning' ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-white border-yellow-400' :
              'bg-gradient-to-r from-blue-500 to-blue-600 text-white border-blue-400'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-base font-medium">{notification.message}</span>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setNotifications(prev => prev.filter(n => n.id !== notification.id))}
                className="ml-3 text-white/80 hover:text-white text-xl font-bold transition-colors"
              >
                ×
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default OpenCommunity;
