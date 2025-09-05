import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, Play, Star, CheckCircle, Users, Rocket, 
  TrendingUp, Zap, Shield, Globe, Award, ChevronRight,
  Brain, BarChart3, Building2, Target, Lightbulb, Sparkles,
  ArrowUpRight, ExternalLink, Menu, X
} from 'lucide-react';

const EnterpriseLanding = () => {
  const [currentStory, setCurrentStory] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const stories = [
    {
      title: "From Idea to $100M Valuation",
      subtitle: "In just 18 months",
      description: "Transform your startup idea into a unicorn with our AI-powered ideation, rapid prototyping, and growth acceleration tools.",
      stats: { time: "18 months", valuation: "$100M+", funding: "$25M" },
      icon: Rocket,
      color: "from-blue-600 to-purple-600"
    },
    {
      title: "Scale to Global Markets",
      subtitle: "Break through every ceiling",
      description: "Expand internationally with data-driven insights, automated processes, and expert guidance at every growth stage.",
      stats: { users: "50M+", revenue: "$500M+", countries: "50+" },
      icon: TrendingUp,
      color: "from-green-600 to-blue-600"
    },
    {
      title: "Exit Strategy Mastery",
      subtitle: "Maximum value creation",
      description: "Position your startup for successful exits through strategic planning, market positioning, and investor relations.",
      stats: { valuation: "$1B+", offers: "25+", timeline: "24 months" },
      icon: Target,
      color: "from-purple-600 to-pink-600"
    }
  ];

  const features = [
    {
      icon: Brain,
      title: "AI Co-Builder",
      description: "Hire and manage AI employees across all startup functions with enterprise-grade security",
      color: "blue",
      stats: "1000+ AI Employees",
      gradient: "from-blue-600 to-blue-700"
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Real-time insights and performance tracking with predictive analytics",
      color: "green",
      stats: "Real-time Metrics",
      gradient: "from-green-600 to-green-700"
    },
    {
      icon: Users,
      title: "Expert Network",
      description: "Connect with industry experts, mentors, and advisors worldwide",
      color: "purple",
      stats: "50,000+ Experts",
      gradient: "from-purple-600 to-purple-700"
    },
    {
      icon: Building2,
      title: "Ecosystem Hub",
      description: "Access to investors, partners, and enterprise resources",
      color: "orange",
      stats: "5,000+ Partners",
      gradient: "from-orange-600 to-orange-700"
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-grade security with SOC 2 compliance and data protection",
      color: "gray",
      stats: "SOC 2 Certified",
      gradient: "from-gray-600 to-gray-700"
    },
    {
      icon: Zap,
      title: "Automation Engine",
      description: "Automate workflows and processes with intelligent automation",
      color: "yellow",
      stats: "90% Automation",
      gradient: "from-yellow-600 to-yellow-700"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Founder & CEO, TechFlow",
      content: "StartupOS transformed our entire operation. We went from idea to $100M ARR in 18 months. The AI employees are game-changing.",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      rating: 5,
      company: "TechFlow",
      valuation: "$500M"
    },
    {
      name: "Marcus Johnson",
      role: "CTO, InnovateLab",
      content: "The AI employees are working 24/7. We have a full marketing team, data analysts, and customer support - all AI-powered.",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      rating: 5,
      company: "InnovateLab",
      valuation: "$200M"
    },
    {
      name: "Elena Rodriguez",
      role: "Founder, DataVault",
      content: "The analytics and insights helped us optimize our product-market fit perfectly. We're now expanding to 15 countries.",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      rating: 5,
      company: "DataVault",
      valuation: "$300M"
    }
  ];

  const stats = [
    { label: "Active Startups", value: "50,000+", change: "+25%" },
    { label: "AI Employees", value: "100,000+", change: "+40%" },
    { label: "Success Rate", value: "94%", change: "+12%" },
    { label: "Time Saved", value: "90%", change: "+15%" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStory((prev) => (prev + 1) % stories.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [stories.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="enterprise-nav">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="enterprise-text-h6 text-slate-900 font-bold">StartupOS</h1>
                  <p className="enterprise-text-caption text-slate-600">Enterprise Platform</p>
                </div>
              </div>
              
              <div className="hidden md:flex items-center space-x-1">
                {['Dashboard', 'AI Co-Builder', 'Analytics', 'Network', 'Ecosystem'].map((item) => (
                  <a
                    key={item}
                    href="#"
                    className={`enterprise-nav-item ${
                      item === 'Dashboard' ? 'active' : ''
                    }`}
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="enterprise-button-ghost enterprise-button-sm">
                Sign In
              </button>
              <button className="enterprise-button-primary enterprise-button-sm">
                Get Started
              </button>
              
              <button
                className="md:hidden p-2 rounded-lg hover:bg-slate-100"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-600/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-8">
              <Sparkles className="w-4 h-4 mr-2" />
              Now Available - Enterprise Edition
            </div>
            
            <h1 className="enterprise-text-display text-slate-900 mb-6 max-w-5xl mx-auto">
              The Complete Operating System for
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Modern Startups</span>
            </h1>
            
            <p className="enterprise-text-body-lg text-slate-600 mb-12 max-w-3xl mx-auto">
              Everything you need to build, scale, and exit your startup. From AI employees to expert networks, 
              advanced analytics to automation tools. Trusted by 50,000+ startups worldwide.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <button className="enterprise-button-primary enterprise-button-xl px-8 py-4">
                <Rocket className="w-5 h-5" />
                Start Building Free
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="enterprise-button-secondary enterprise-button-xl px-8 py-4">
                <Play className="w-5 h-5" />
                Watch Demo
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="enterprise-text-h3 text-slate-900 font-bold mb-1">{stat.value}</div>
                  <div className="enterprise-text-body-sm text-slate-600 mb-1">{stat.label}</div>
                  <div className="enterprise-text-caption text-green-600 font-medium">{stat.change}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="enterprise-text-h2 text-slate-900 mb-4">Success Stories</h2>
            <p className="enterprise-text-body-lg text-slate-600 max-w-3xl mx-auto">
              See how startups are transforming their operations and achieving unprecedented growth with StartupOS
            </p>
          </motion.div>

          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStory}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <div className="enterprise-card-elevated p-16 max-w-5xl mx-auto">
                  <div className="flex items-center justify-center mb-8">
                    <div className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${stories[currentStory].color} flex items-center justify-center`}>
                      {React.createElement(stories[currentStory].icon, { className: "w-10 h-10 text-white" })}
                    </div>
                  </div>
                  
                  <h3 className="enterprise-text-h3 text-slate-900 mb-2">{stories[currentStory].title}</h3>
                  <p className="enterprise-text-h5 text-blue-600 mb-8">{stories[currentStory].subtitle}</p>
                  <p className="enterprise-text-body-lg text-slate-600 mb-12 max-w-3xl mx-auto">
                    {stories[currentStory].description}
                  </p>
                  
                  <div className="flex justify-center space-x-12">
                    {Object.entries(stories[currentStory].stats).map(([key, value], index) => (
                      <div key={index} className="text-center">
                        <div className="enterprise-text-h4 text-slate-900 font-bold">{value}</div>
                        <div className="enterprise-text-caption text-slate-600 capitalize">{key}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Story Navigation */}
            <div className="flex justify-center mt-8 space-x-2">
              {stories.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentStory(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentStory ? 'bg-blue-600' : 'bg-slate-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="enterprise-text-h2 text-slate-900 mb-4">Everything You Need</h2>
            <p className="enterprise-text-body-lg text-slate-600 max-w-3xl mx-auto">
              A comprehensive suite of enterprise-grade tools and services to power your startup journey
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group"
              >
                <div className="enterprise-card-interactive p-8 h-full">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    {React.createElement(feature.icon, { className: "w-8 h-8 text-white" })}
                  </div>
                  
                  <h3 className="enterprise-text-h5 text-slate-900 mb-3">{feature.title}</h3>
                  <p className="enterprise-text-body text-slate-600 mb-6">{feature.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <span className="enterprise-badge-primary">{feature.stats}</span>
                    <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-blue-600 transition-colors" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="enterprise-text-h2 text-slate-900 mb-4">What Founders Say</h2>
            <p className="enterprise-text-body-lg text-slate-600 max-w-3xl mx-auto">
              Join thousands of successful founders who trust StartupOS to power their growth
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <div className="enterprise-card-elevated p-8 h-full">
                  <div className="flex items-center mb-6">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-14 h-14 rounded-full mr-4"
                    />
                    <div>
                      <h4 className="enterprise-text-h6 text-slate-900 font-medium">
                        {testimonial.name}
                      </h4>
                      <p className="enterprise-text-body-sm text-slate-600">{testimonial.role}</p>
                      <p className="enterprise-text-caption text-blue-600 font-medium">{testimonial.valuation}</p>
                    </div>
                  </div>
                  
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  
                  <blockquote className="enterprise-text-body text-slate-600 italic mb-6">
                    "{testimonial.content}"
                  </blockquote>
                  
                  <div className="flex items-center justify-between">
                    <span className="enterprise-badge-gray">{testimonial.company}</span>
                    <ExternalLink className="w-4 h-4 text-slate-400" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="enterprise-text-h2 text-white mb-4">
              Ready to Transform Your Startup?
            </h2>
            <p className="enterprise-text-body-lg text-blue-100 mb-12 max-w-3xl mx-auto">
              Join 50,000+ founders who are already building the future with StartupOS. 
              Start your free trial today and see results in 24 hours.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <button className="enterprise-button-secondary enterprise-button-xl px-8 py-4 bg-white text-blue-600 hover:bg-blue-50">
                <Rocket className="w-5 h-5" />
                Start Free Trial
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="enterprise-button-ghost enterprise-button-xl px-8 py-4 border-white text-white hover:bg-white hover:text-blue-600">
                <Users className="w-5 h-5" />
                Schedule Demo
              </button>
            </div>
            
            <div className="flex items-center justify-center space-x-8 text-blue-100">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5" />
                <span className="enterprise-text-body-sm">No credit card required</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5" />
                <span className="enterprise-text-body-sm">14-day free trial</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5" />
                <span className="enterprise-text-body-sm">Cancel anytime</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="enterprise-text-h6 text-white">StartupOS</h3>
                  <p className="enterprise-text-caption text-slate-400">Enterprise Platform</p>
                </div>
              </div>
              <p className="enterprise-text-body-sm text-slate-400 mb-4">
                The complete operating system for modern startups. Trusted by 50,000+ founders worldwide.
              </p>
            </div>
            
            <div>
              <h4 className="enterprise-text-h6 text-white mb-4">Product</h4>
              <ul className="space-y-2">
                {['AI Co-Builder', 'Analytics', 'Network', 'Automation', 'Security'].map((item) => (
                  <li key={item}>
                    <a href="#" className="enterprise-text-body-sm text-slate-400 hover:text-white transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="enterprise-text-h6 text-white mb-4">Company</h4>
              <ul className="space-y-2">
                {['About', 'Careers', 'Press', 'Contact', 'Blog'].map((item) => (
                  <li key={item}>
                    <a href="#" className="enterprise-text-body-sm text-slate-400 hover:text-white transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="enterprise-text-h6 text-white mb-4">Support</h4>
              <ul className="space-y-2">
                {['Help Center', 'Documentation', 'Community', 'Status', 'API'].map((item) => (
                  <li key={item}>
                    <a href="#" className="enterprise-text-body-sm text-slate-400 hover:text-white transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="enterprise-text-body-sm text-slate-400">
              © 2024 StartupOS. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <a href="#" className="enterprise-text-body-sm text-slate-400 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="enterprise-text-body-sm text-slate-400 hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="enterprise-text-body-sm text-slate-400 hover:text-white transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default EnterpriseLanding;
