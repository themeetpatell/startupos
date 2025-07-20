import React, { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { 
  Brain, 
  Zap, 
  Users, 
  BarChart3, 
  Globe, 
  Shield, 
  ArrowRight,
  Sparkles,
  Target,
  Layers
} from 'lucide-react';
import aiImage from '../assets/ai-neural-network.jpg';
import ecosystemImage from '../assets/startup-ecosystem.jpg';
import growthImage from '../assets/growth-visualization.jpg';
import '../App.css';

const UltraFeatures = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["100px", "-100px"]);

  const features = [
    {
      icon: Brain,
      title: "AI Copilots",
      subtitle: "Intelligence that executes",
      description: "Domain-specific AI that executes—not just assists—across finance, GTM, hiring, and operations.",
      image: aiImage,
      gradient: "from-blue-500 to-cyan-500",
      details: [
        "Automated financial planning and forecasting",
        "Smart hiring and team optimization", 
        "Go-to-market strategy execution",
        "Real-time decision support"
      ]
    },
    {
      icon: Zap,
      title: "Stage-Aware Growth",
      subtitle: "Platform that evolves",
      description: "Platform evolves with your startup, unlocking new tools and features as you hit milestones.",
      image: growthImage,
      gradient: "from-purple-500 to-pink-500",
      details: [
        "Seedling: Idea validation and MVP tools",
        "Sprinter: Growth and scaling features",
        "Scaler: Enterprise and expansion tools", 
        "Dominator: IPO and acquisition support"
      ]
    },
    {
      icon: Users,
      title: "Fractional CXOs",
      subtitle: "Expert leadership on-demand",
      description: "Access expert fractional executives matched to your stage, goals, and company culture.",
      image: ecosystemImage,
      gradient: "from-green-500 to-emerald-500",
      details: [
        "Smart-matching to founders by need",
        "Scoped outcome-based contracts",
        "CXO dashboards and collaboration tools",
        "Performance tracking and optimization"
      ]
    },
    {
      icon: BarChart3,
      title: "Real-Time Analytics",
      subtitle: "Intelligence built-in",
      description: "Live metrics, outcome tracking, and progress visibility built into your operating system.",
      image: growthImage,
      gradient: "from-orange-500 to-red-500",
      details: [
        "For founders: KPI dashboards",
        "For VCs: Portfolio command center",
        "For communities: Member engagement data",
        "Execution insights feed AI copilots"
      ]
    },
    {
      icon: Globe,
      title: "Ecosystem Access",
      subtitle: "Connected startup world",
      description: "Connect with VCs, accelerators, communities, and tools through our integrated marketplace.",
      image: ecosystemImage,
      gradient: "from-indigo-500 to-purple-500",
      details: [
        "VC/Accelerator co-branded OS",
        "Template and tool marketplace",
        "Referral engines and partnerships",
        "Community white-labeling"
      ]
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      subtitle: "Bank-level protection",
      description: "Bank-level security with SOC 2 compliance, ensuring your startup data stays protected.",
      image: aiImage,
      gradient: "from-gray-500 to-slate-500",
      details: [
        "SOC 2 Type II compliance",
        "End-to-end encryption",
        "Advanced threat protection",
        "Regular security audits"
      ]
    }
  ];

  return (
    <section ref={containerRef} className="py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-purple-900/20 to-slate-900" />
      
      <motion.div
        style={{ y }}
        className="absolute inset-0 opacity-10"
      >
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl" />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full px-6 py-3 mb-8"
          >
            <Sparkles className="w-5 h-5 text-blue-400" />
            <span className="text-blue-400 font-medium">Revolutionary Features</span>
          </motion.div>

          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="ultra-text-gradient">Everything you need</span>
            <br />
            <span className="text-white">to scale</span>
          </h2>

          <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            From idea to IPO, StartupOS provides the tools, insights, and network you need 
            at every stage of your journey.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="ultra-card group cursor-pointer"
            >
              {/* Feature Header */}
              <div className="flex items-start space-x-4 mb-6">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-blue-400 font-medium">{feature.subtitle}</p>
                </div>
              </div>

              {/* Feature Image */}
              <div className="relative mb-6 rounded-xl overflow-hidden">
                <img 
                  src={feature.image} 
                  alt={feature.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>

              {/* Feature Description */}
              <p className="text-white/80 text-lg leading-relaxed mb-6">
                {feature.description}
              </p>

              {/* Feature Details */}
              <div className="space-y-3 mb-6">
                {feature.details.map((detail, detailIndex) => (
                  <motion.div
                    key={detailIndex}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: (index * 0.1) + (detailIndex * 0.1) }}
                    className="flex items-center space-x-3"
                  >
                    <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full" />
                    <span className="text-white/70">{detail}</span>
                  </motion.div>
                ))}
              </div>

              {/* Learn More Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors duration-200 font-medium group"
              >
                <span>Learn more</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20 text-center"
        >
          <div className="ultra-glass rounded-3xl p-12">
            <div className="flex items-center justify-center space-x-2 mb-6">
              <Target className="w-6 h-6 text-blue-400" />
              <span className="text-blue-400 font-medium">Ready to Transform?</span>
            </div>
            
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Experience the future of startup operations
            </h3>
            
            <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of startups already using StartupOS to accelerate their growth 
              and achieve their goals faster than ever before.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="ultra-button flex items-center space-x-2"
              >
                <Layers className="w-5 h-5" />
                <span>Start Free Trial</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border border-white/20 rounded-full text-white hover:bg-white/10 transition-colors duration-200 font-medium"
              >
                Schedule Demo
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default UltraFeatures;

