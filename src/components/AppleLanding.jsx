import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, Play, Star, CheckCircle, Users, Rocket, 
  TrendingUp, Zap, Shield, Globe, Award, ChevronRight,
  ChevronLeft, Quote, ArrowUpRight, Sparkles, Brain,
  BarChart3, Building2, Target, Lightbulb
} from 'lucide-react';
import { AppleButton, AppleCard, AppleBadge } from './AppleDesignSystem';

const AppleLanding = () => {
  const [currentStory, setCurrentStory] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -1000]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  const stories = [
    {
      title: "From Idea to Launch",
      subtitle: "In just 30 days",
      description: "Transform your startup idea into a fully functional MVP with our AI-powered ideation and rapid prototyping tools.",
      stats: { time: "30 days", success: "94%", funding: "$2.1M" },
      color: "from-blue-500 to-purple-600",
      icon: Rocket
    },
    {
      title: "Scale Without Limits",
      subtitle: "Growth that matters",
      description: "Break through growth plateaus with data-driven insights, automated processes, and expert guidance at every step.",
      stats: { users: "10M+", revenue: "$50M+", team: "200+" },
      color: "from-emerald-500 to-blue-600",
      icon: TrendingUp
    },
    {
      title: "Exit Strategy",
      subtitle: "Maximum value creation",
      description: "Position your startup for successful exits through strategic planning, market positioning, and investor relations.",
      stats: { valuation: "$500M+", offers: "15+", timeline: "18 months" },
      color: "from-purple-500 to-pink-600",
      icon: Target
    }
  ];

  const features = [
    {
      icon: Brain,
      title: "AI Co-Builder",
      description: "Hire and manage AI employees across all startup functions",
      color: "purple",
      stats: "500+ AI Employees"
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Data-driven insights and performance tracking",
      color: "blue",
      stats: "Real-time Metrics"
    },
    {
      icon: Users,
      title: "Expert Network",
      description: "Connect with industry experts and mentors",
      color: "green",
      stats: "10,000+ Experts"
    },
    {
      icon: Building2,
      title: "Ecosystem Hub",
      description: "Access to investors, partners, and resources",
      color: "orange",
      stats: "1,000+ Partners"
    },
    {
      icon: Zap,
      title: "Automation Tools",
      description: "Streamline operations with smart automation",
      color: "yellow",
      stats: "90% Time Saved"
    },
    {
      icon: Shield,
      title: "Security & Compliance",
      description: "Enterprise-grade security and compliance",
      color: "red",
      stats: "SOC 2 Certified"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Founder, TechFlow",
      company: "Series A Startup",
      content: "StartupOS transformed our entire operation. We went from idea to $10M ARR in 18 months.",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      rating: 5
    },
    {
      name: "Marcus Johnson",
      role: "CEO, InnovateLab",
      company: "Seed Stage",
      content: "The AI employees are game-changing. We have a full marketing team working 24/7.",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      rating: 5
    },
    {
      name: "Elena Rodriguez",
      role: "CTO, DataVault",
      company: "Series B Startup",
      content: "The analytics and insights helped us optimize our product-market fit perfectly.",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      rating: 5
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStory((prev) => (prev + 1) % stories.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [stories.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '4s' }}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <AppleBadge variant="primary" className="mb-6">
              🚀 Now Available
            </AppleBadge>
            
            <h1 className="apple-text-large-title text-gray-900 mb-6 max-w-4xl mx-auto">
              The Complete Operating System for
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Modern Startups</span>
            </h1>
            
            <p className="apple-text-body text-gray-600 mb-8 max-w-3xl mx-auto">
              Everything you need to build, scale, and exit your startup. From AI employees to expert networks, 
              advanced analytics to automation tools.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <AppleButton 
                size="large" 
                className="px-8 py-4"
                icon={<Rocket size={20} />}
                iconPosition="left"
              >
                Start Building
              </AppleButton>
              <AppleButton 
                variant="secondary" 
                size="large"
                className="px-8 py-4"
                icon={<Play size={20} />}
                iconPosition="left"
              >
                Watch Demo
              </AppleButton>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {[
                { label: "Active Startups", value: "10,000+" },
                { label: "AI Employees", value: "500+" },
                { label: "Success Rate", value: "94%" },
                { label: "Time Saved", value: "90%" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="apple-text-title-1 text-gray-900 font-bold">{stat.value}</div>
                  <div className="apple-text-callout text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="apple-text-title-1 text-gray-900 mb-4">Success Stories</h2>
            <p className="apple-text-body text-gray-600 max-w-2xl mx-auto">
              See how startups are transforming their operations with StartupOS
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
                <AppleCard className="p-12 max-w-4xl mx-auto">
                  <div className="flex items-center justify-center mb-8">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${stories[currentStory].color} flex items-center justify-center`}>
                      {React.createElement(stories[currentStory].icon, { className: "w-8 h-8 text-white" })}
                    </div>
                  </div>
                  
                  <h3 className="apple-text-title-2 text-gray-900 mb-2">{stories[currentStory].title}</h3>
                  <p className="apple-text-callout text-blue-600 mb-6">{stories[currentStory].subtitle}</p>
                  <p className="apple-text-body text-gray-600 mb-8 max-w-2xl mx-auto">
                    {stories[currentStory].description}
                  </p>
                  
                  <div className="flex justify-center space-x-8">
                    {Object.entries(stories[currentStory].stats).map(([key, value], index) => (
                      <div key={index} className="text-center">
                        <div className="apple-text-title-3 text-gray-900 font-bold">{value}</div>
                        <div className="apple-text-caption-1 text-gray-600 capitalize">{key}</div>
                      </div>
                    ))}
                  </div>
                </AppleCard>
              </motion.div>
            </AnimatePresence>

            {/* Story Navigation */}
            <div className="flex justify-center mt-8 space-x-2">
              {stories.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentStory(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentStory ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="apple-text-title-1 text-gray-900 mb-4">Everything You Need</h2>
            <p className="apple-text-body text-gray-600 max-w-2xl mx-auto">
              A comprehensive suite of tools and services to power your startup journey
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <AppleCard className="p-8 h-full group-hover:apple-card-elevated">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${
                    feature.color === 'purple' ? 'from-purple-500 to-purple-600' :
                    feature.color === 'blue' ? 'from-blue-500 to-blue-600' :
                    feature.color === 'green' ? 'from-green-500 to-green-600' :
                    feature.color === 'orange' ? 'from-orange-500 to-orange-600' :
                    feature.color === 'yellow' ? 'from-yellow-500 to-yellow-600' :
                    'from-red-500 to-red-600'
                  } flex items-center justify-center mb-6`}>
                    {React.createElement(feature.icon, { className: "w-6 h-6 text-white" })}
                  </div>
                  
                  <h3 className="apple-text-headline text-gray-900 mb-3">{feature.title}</h3>
                  <p className="apple-text-body text-gray-600 mb-4">{feature.description}</p>
                  <AppleBadge variant="gray" size="small">{feature.stats}</AppleBadge>
                </AppleCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="apple-text-title-1 text-gray-900 mb-4">What Founders Say</h2>
            <p className="apple-text-body text-gray-600 max-w-2xl mx-auto">
              Join thousands of successful founders who trust StartupOS
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <AppleCard className="p-8 h-full">
                  <div className="flex items-center mb-6">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <h4 className="apple-text-headline text-gray-900">{testimonial.name}</h4>
                      <p className="apple-text-caption-1 text-gray-600">{testimonial.role}</p>
                      <p className="apple-text-caption-2 text-gray-500">{testimonial.company}</p>
                    </div>
                  </div>
                  
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  
                  <blockquote className="apple-text-body text-gray-600 italic">
                    "{testimonial.content}"
                  </blockquote>
                </AppleCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="apple-text-title-1 text-white mb-4">
              Ready to Transform Your Startup?
            </h2>
            <p className="apple-text-body text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of founders who are already building the future with StartupOS
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <AppleButton 
                size="large" 
                className="px-8 py-4 bg-white text-blue-600 hover:bg-gray-50"
                icon={<Rocket size={20} />}
                iconPosition="left"
              >
                Get Started Free
              </AppleButton>
              <AppleButton 
                variant="secondary" 
                size="large"
                className="px-8 py-4 border-white text-white hover:bg-white hover:text-blue-600"
                icon={<Users size={20} />}
                iconPosition="left"
              >
                Schedule Demo
              </AppleButton>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="apple-text-headline text-white mb-4">StartupOS</h3>
              <p className="apple-text-body text-gray-400 mb-4">
                The complete operating system for modern startups.
              </p>
            </div>
            
            <div>
              <h4 className="apple-text-callout text-white mb-4">Product</h4>
              <ul className="space-y-2">
                {['AI Co-Builder', 'Analytics', 'Network', 'Automation'].map((item) => (
                  <li key={item}>
                    <a href="#" className="apple-text-body text-gray-400 hover:text-white transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="apple-text-callout text-white mb-4">Company</h4>
              <ul className="space-y-2">
                {['About', 'Careers', 'Press', 'Contact'].map((item) => (
                  <li key={item}>
                    <a href="#" className="apple-text-body text-gray-400 hover:text-white transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="apple-text-callout text-white mb-4">Support</h4>
              <ul className="space-y-2">
                {['Help Center', 'Documentation', 'Community', 'Status'].map((item) => (
                  <li key={item}>
                    <a href="#" className="apple-text-body text-gray-400 hover:text-white transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="apple-text-caption-1 text-gray-400">
              © 2024 StartupOS. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AppleLanding;
