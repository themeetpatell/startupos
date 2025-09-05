import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, Play, Star, CheckCircle, Users, Rocket, 
  TrendingUp, Zap, Shield, Globe, Award, ChevronRight,
  ChevronLeft, Quote, ArrowUpRight, Sparkles
} from 'lucide-react';

const Home = () => {
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
      color: "from-blue-500 to-purple-600"
    },
    {
      title: "Scale Without Limits",
      subtitle: "Growth that matters",
      description: "Break through growth plateaus with data-driven insights, automated processes, and expert guidance at every step.",
      stats: { users: "10M+", revenue: "$50M+", team: "200+" },
      color: "from-emerald-500 to-blue-600"
    },
    {
      title: "Exit Strategy",
      subtitle: "Maximum value creation",
      description: "Position your startup for successful exits through strategic planning, market positioning, and investor relations.",
      stats: { valuation: "$500M+", offers: "15+", timeline: "18 months" },
      color: "from-purple-500 to-pink-600"
    }
  ];

  const features = [
    {
      icon: Rocket,
      title: "AI Copilot",
      description: "Intelligent assistance for every aspect of your startup journey",
      benefits: ["24/7 guidance", "Predictive analytics", "Custom strategies"],
      color: "blue"
    },
    {
      icon: Zap,
      title: "Process Automation",
      description: "Streamline operations with powerful automation tools",
      benefits: ["Save 40+ hours/week", "Reduce errors by 90%", "Scale effortlessly"],
      color: "emerald"
    },
    {
      icon: Users,
      title: "Expert Network",
      description: "Connect with fractional CXOs and industry experts",
      benefits: ["500+ experts", "Instant access", "Proven track record"],
      color: "purple"
    },
    {
      icon: TrendingUp,
      title: "Advanced Analytics",
      description: "Data-driven insights to accelerate your growth",
      benefits: ["Real-time metrics", "Predictive modeling", "Actionable insights"],
      color: "orange"
    },
    {
      icon: Shield,
      title: "Rapid Execution",
      description: "Turn ideas into reality faster than ever before",
      benefits: ["10x faster", "Risk mitigation", "Quality assurance"],
      color: "red"
    },
    {
      icon: Globe,
      title: "Team Collaboration",
      description: "Built for teams to work together seamlessly",
      benefits: ["Real-time sync", "Role-based access", "Performance tracking"],
      color: "indigo"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Founder & CEO",
      company: "TechFlow",
      quote: "StartupOS transformed our startup from a struggling idea to a $50M company in just 18 months. The AI copilot is like having a genius co-founder.",
      rating: 5,
      avatar: "SC",
      color: "from-blue-500 to-purple-600"
    },
    {
      name: "Marcus Rodriguez",
      role: "CTO",
      company: "DataVault",
      quote: "The process automation tools saved us 60 hours per week. We scaled from 5 to 50 employees without breaking a sweat.",
      rating: 5,
      avatar: "MR",
      color: "from-emerald-500 to-blue-600"
    },
    {
      name: "Priya Patel",
      role: "Founder",
      company: "EcoSmart",
      quote: "The expert network connected us with the perfect CMO who helped us pivot and secure $10M in funding within 6 months.",
      rating: 5,
      avatar: "PP",
      color: "from-purple-500 to-pink-600"
    }
  ];

  const stats = [
    { number: "10,000+", label: "Startups Launched", icon: Rocket },
    { number: "$2.5B+", label: "Total Funding Raised", icon: TrendingUp },
    { number: "94%", label: "Success Rate", icon: CheckCircle },
    { number: "500+", label: "Expert Network", icon: Users }
  ];

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentStory((prev) => (prev + 1) % stories.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isPlaying, stories.length]);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    
    const x = (clientX / innerWidth - 0.5) * 20;
    const y = (clientY / innerHeight - 0.5) * 20;
    
    e.currentTarget.style.transform = `translate(${x}px, ${y}px)`;
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          y: [0, 20, 0],
          rotate: [0, -5, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        className="absolute top-40 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          y: [0, -15, 0],
          rotate: [0, 3, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4
        }}
        className="absolute bottom-20 left-1/3 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl"
      />

      {/* Hero Section with Story Navigation */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Story Navigation */}
          <div className="flex justify-center mb-16">
            <div className="flex space-x-2 bg-slate-800/80 backdrop-blur-sm rounded-2xl p-2 border border-slate-700/50">
              {stories.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentStory(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentStory 
                      ? 'bg-blue-400 scale-125' 
                      : 'bg-slate-600 hover:bg-slate-500'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Story Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <motion.h2 
                className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8, type: "spring" }}
              >
                {stories[currentStory].title}
              </motion.h2>
              <motion.p 
                className="text-2xl md:text-3xl text-slate-300 mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {stories[currentStory].subtitle}
              </motion.p>
              <motion.p 
                className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {stories[currentStory].description}
              </motion.p>
            </motion.div>
          </AnimatePresence>

          {/* Story Navigation Controls */}
          <div className="flex justify-center items-center space-x-6 mb-16">
            <button
              onClick={() => setCurrentStory((prev) => (prev - 1 + stories.length) % stories.length)}
              className="p-4 bg-slate-800/80 backdrop-blur-sm rounded-2xl text-slate-300 hover:text-blue-400 border border-slate-700/50 hover:border-blue-400 transition-all duration-300"
            >
              <ChevronLeft size={24} />
            </button>
            
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`p-6 rounded-2xl transition-all duration-300 ${
                isPlaying 
                  ? 'bg-red-500/20 text-red-400 border border-red-500/30' 
                  : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
              }`}
            >
              {isPlaying ? <ChevronRight size={32} /> : <Play size={32} />}
            </button>
            
            <button
              onClick={() => setCurrentStory((prev) => (prev + 1) % stories.length)}
              className="p-4 bg-slate-800/80 backdrop-blur-sm rounded-2xl text-slate-300 hover:text-blue-400 border border-slate-700/50 hover:border-blue-400 transition-all duration-300"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Main Hero Content */}
          <motion.div 
            style={{ y, opacity, scale }}
            className="text-center mb-20"
          >
            <motion.h1 
              className="text-7xl md:text-9xl font-black mb-8 bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent leading-tight"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, type: "spring" }}
            >
              The Complete
              <br />
              Operating System
              <br />
              for Startups
            </motion.h1>
            
            <motion.p 
              className="text-2xl md:text-3xl text-slate-300 mb-12 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              Give your startup unstoppable momentum from idea to scale with AI copilots, 
              execution systems, and expert networks.
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              <button className="group relative px-12 py-6 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 rounded-2xl text-white text-xl font-bold hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105">
                Start Building
                <ArrowRight className="inline-block ml-3 group-hover:translate-x-2 transition-transform duration-300" size={24} />
              </button>
              
              <button className="px-12 py-6 bg-slate-800/90 backdrop-blur-sm rounded-2xl text-slate-200 text-xl font-bold border border-slate-600/50 hover:border-blue-400 transition-all duration-300">
                Sign In
              </button>
            </motion.div>
          </motion.div>

          {/* Interactive Stats */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center group cursor-pointer"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:from-blue-500/30 group-hover:to-purple-500/30 transition-all duration-300">
                  <stat.icon size={32} className="text-blue-400" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-slate-300">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div 
            className="text-center"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="text-slate-400 text-sm mb-2">Scroll to explore</div>
            <div className="w-px h-8 bg-gradient-to-b from-slate-400 to-transparent mx-auto"></div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Everything You Need to
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> Scale</span>
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Powerful tools and systems designed specifically for startup growth and success
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="group cursor-pointer"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, y: -5 }}
                onMouseEnter={() => setActiveFeature(index)}
              >
                <div className="bg-slate-800/80 backdrop-blur-sm rounded-3xl p-8 border border-slate-700/50 group-hover:border-blue-400 transition-all duration-300 h-full">
                  <div className={`w-16 h-16 bg-gradient-to-r from-${feature.color}-500/20 to-${feature.color}-600/20 rounded-2xl flex items-center justify-center mb-6 group-hover:from-${feature.color}-500/30 group-hover:to-${feature.color}-600/30 transition-all duration-300`}>
                    <feature.icon size={32} className={`text-${feature.color}-400`} />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  
                  <p className="text-slate-300 mb-6 leading-relaxed">
                    {feature.description}
                  </p>
                  
                  <div className="space-y-3">
                    {feature.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-center space-x-3">
                        <CheckCircle size={20} className="text-emerald-400 flex-shrink-0" />
                        <span className="text-slate-300 text-sm">{benefit}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 flex items-center justify-between">
                    <div className="text-sm text-slate-400 bg-slate-700/50 px-3 py-1 rounded-full">
                      {feature.color} feature
                    </div>
                    <ArrowUpRight size={20} className="text-slate-400 group-hover:text-blue-400 transition-colors duration-300" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Trusted by
              <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent"> Founders</span>
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Join thousands of successful entrepreneurs who've transformed their startups with StartupOS
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="group cursor-pointer"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className="bg-slate-800/80 backdrop-blur-sm rounded-3xl p-8 border border-slate-700/50 group-hover:border-blue-400 transition-all duration-300 h-full">
                  <div className="flex items-center mb-6">
                    <div className={`w-12 h-12 bg-gradient-to-r ${testimonial.color} rounded-2xl flex items-center justify-center text-white font-bold text-lg mr-4`}>
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-bold text-white">{testimonial.name}</div>
                      <div className="text-sm text-slate-300">{testimonial.role} @ {testimonial.company}</div>
                    </div>
                  </div>
                  
                  <blockquote className="text-slate-200 mb-6 leading-relaxed italic">
                    "{testimonial.quote}"
                  </blockquote>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} size={20} className="text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <Quote size={20} className="text-slate-400" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Ready to Build Your
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent"> Empire</span>?
            </h2>
            
            <p className="text-xl text-slate-300 mb-12 max-w-3xl mx-auto">
              Join the elite community of founders who are building the future. 
              Start your journey today with StartupOS.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button className="group relative px-12 py-6 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 rounded-2xl text-white text-xl font-bold hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105">
                <Sparkles className="inline-block mr-3 group-hover:rotate-12 transition-transform duration-300" size={24} />
                Get Started Free
                <ArrowRight className="inline-block ml-3 group-hover:translate-x-2 transition-transform duration-300" size={24} />
              </button>
              
              <button className="px-12 py-6 bg-slate-800/90 backdrop-blur-sm rounded-2xl text-slate-200 text-xl font-bold border border-slate-600/50 hover:border-blue-400 transition-all duration-300">
                Schedule Demo
              </button>
            </div>

            <div className="mt-8 text-slate-400 text-sm">
              No credit card required • 14-day free trial • Cancel anytime
            </div>
          </motion.div>
        </div>
      </section>

      {/* Floating Action Button */}
      <motion.button
        className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full shadow-2xl shadow-blue-500/25 flex items-center justify-center text-white hover:scale-110 transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onMouseMove={handleMouseMove}
      >
        <Rocket size={24} />
      </motion.button>
    </div>
  );
};

export default Home;
