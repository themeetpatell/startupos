import React, { useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { 
  Brain, 
  Zap, 
  Users, 
  BarChart3, 
  Globe, 
  Layers,
  ArrowRight,
  CheckCircle,
  Sparkles,
  Target,
  Rocket,
  TrendingUp,
  Shield,
  Code,
  Database,
  Network
} from 'lucide-react';
import innovationImage from '../assets/innovation-lab.jpg';
import '../App.css';

const RevolutionarySolutions = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [activeLayer, setActiveLayer] = useState(0);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["50px", "-50px"]);

  const layers = [
    {
      id: 1,
      title: "Copilot Layer",
      subtitle: "AI that executes—not just assists",
      icon: Brain,
      gradient: "from-blue-500 to-cyan-500",
      description: "Domain-specific copilots: Finance, GTM, Hiring, Ops, Fundraising",
      features: [
        "Embedded in workflows, triggered by context",
        "Used by Founders & CXOs alike", 
        "Real-time decision support and execution",
        "Automated task completion and optimization"
      ],
      details: {
        "Financial Copilot": "Automated budgeting, forecasting, and financial modeling",
        "GTM Copilot": "Market analysis, customer segmentation, and campaign optimization",
        "Hiring Copilot": "Candidate sourcing, interview scheduling, and team optimization",
        "Operations Copilot": "Process automation, workflow optimization, and efficiency tracking"
      }
    },
    {
      id: 2,
      title: "Execution System Layer",
      subtitle: "Structured operating workflows",
      icon: Zap,
      gradient: "from-purple-500 to-pink-500",
      description: "Stage-aware task flows (idea → seed → scale)",
      features: [
        "Playbooks, KPIs, OKRs, progress dashboards",
        "Gamified startup progression system",
        "Automated workflow optimization",
        "Real-time performance tracking"
      ],
      details: {
        "Stage Progression": "Unlock new tools and features as you hit milestones",
        "Smart Workflows": "AI-optimized processes that adapt to your startup's needs",
        "Performance Metrics": "Real-time KPI tracking and goal management",
        "Gamification": "Achievement system that motivates team progress"
      }
    },
    {
      id: 3,
      title: "Leadership Network Layer",
      subtitle: "Fractional CXOs, advisors, experts",
      icon: Users,
      gradient: "from-green-500 to-emerald-500",
      description: "Smart-matching to founders by need, stage, goals",
      features: [
        "Scoped outcome-based contracts",
        "CXO dashboards, project scopes, and collaboration tools",
        "Performance tracking and optimization",
        "Network of vetted executives"
      ],
      details: {
        "Smart Matching": "AI-powered matching based on industry, stage, and goals",
        "Outcome-Based": "Pay for results, not just time",
        "Collaboration Tools": "Dedicated dashboards and project management",
        "Quality Network": "Vetted executives with proven track records"
      }
    },
    {
      id: 4,
      title: "Insights & Intelligence Layer",
      subtitle: "Live metrics, outcome tracking, progress visibility",
      icon: BarChart3,
      gradient: "from-orange-500 to-red-500",
      description: "Built into the OS for founders, VCs, and communities",
      features: [
        "For founders: KPI dashboards",
        "For VCs: Portfolio command center",
        "For communities: Member activation & engagement data",
        "Execution Insights feed AI copilots + match engine"
      ],
      details: {
        "Founder Dashboard": "Real-time metrics, goal tracking, and performance insights",
        "VC Portal": "Portfolio overview, startup progress, and investment analytics",
        "Community Analytics": "Member engagement, growth metrics, and success tracking",
        "AI Integration": "Insights automatically improve AI recommendations"
      }
    },
    {
      id: 5,
      title: "Ecosystem Access Layer",
      subtitle: "A plug-and-play startup world",
      icon: Globe,
      gradient: "from-indigo-500 to-purple-500",
      description: "Connected, monetized, and branded ecosystem",
      features: [
        "VC/Accelerator co-branded OS",
        "Community white-labeling",
        "Template, playbook, and tool marketplace",
        "Referral engines, affiliate partnerships, and integrations"
      ],
      details: {
        "Co-Branding": "White-labeled platform for VCs and accelerators",
        "Marketplace": "Curated tools, templates, and resources",
        "Partnerships": "Revenue-sharing through referrals and integrations",
        "Community Features": "Custom branding and member management"
      }
    }
  ];

  const stakeholders = [
    {
      title: "Founders",
      icon: Rocket,
      gradient: "from-blue-500 to-purple-500",
      benefits: [
        "Scalable execution at any stage",
        "AI-powered strategic guidance",
        "Stage-aware tool recommendations",
        "Access to fractional CXO network",
        "Real-time performance insights"
      ]
    },
    {
      title: "CXOs",
      icon: TrendingUp,
      gradient: "from-purple-500 to-pink-500",
      benefits: [
        "Structure, speed, and momentum",
        "Outcome-based project matching",
        "Collaboration tools and dashboards",
        "Performance tracking and optimization",
        "Network of peer executives"
      ]
    },
    {
      title: "VCs",
      icon: Target,
      gradient: "from-green-500 to-blue-500",
      benefits: [
        "Plug talent gaps, drive outcomes",
        "Startup progress visibility",
        "Co-branded platform access",
        "Investment decision support",
        "Portfolio performance analytics"
      ]
    },
    {
      title: "Communities",
      icon: Network,
      gradient: "from-orange-500 to-red-500",
      benefits: [
        "Distribution, monetization, brand leverage",
        "White-labeled platform access",
        "Member engagement analytics",
        "Monetization opportunities",
        "Brand partnership programs"
      ]
    }
  ];

  return (
    <section ref={containerRef} id="solutions" className="py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 ultra-gradient-bg" />
      
      <motion.div
        style={{ y }}
        className="absolute inset-0 opacity-20"
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
            <Layers className="w-5 h-5 text-blue-400" />
            <span className="text-blue-400 font-medium">Complete Startup Operating System</span>
          </motion.div>

          <h2 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="ultra-text-gradient">Complete Startup</span>
            <br />
            <span className="text-white">Operating System</span>
          </h2>

          <p className="text-xl text-white/70 max-w-4xl mx-auto leading-relaxed">
            Five integrated layers that work together to give your startup 
            unstoppable momentum from idea to scale.
          </p>
        </motion.div>

        {/* Five-Layer Architecture */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-32"
        >
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-white mb-4">Five-Layer Architecture</h3>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Each layer serves a specific purpose while working seamlessly with others 
              to create a comprehensive startup ecosystem.
            </p>
          </div>

          {/* Interactive Layer Selector */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {layers.map((layer, index) => (
              <motion.button
                key={layer.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveLayer(index)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all duration-300 ${
                  activeLayer === index 
                    ? 'ultra-glass border-blue-400/50' 
                    : 'ultra-glass border-white/10 hover:border-white/20'
                }`}
              >
                <layer.icon className="w-5 h-5 text-blue-400" />
                <span className="text-white font-medium">Layer {layer.id}</span>
              </motion.button>
            ))}
          </div>

          {/* Active Layer Display */}
          <motion.div
            key={activeLayer}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="ultra-card max-w-4xl mx-auto"
          >
            <div className="flex items-start space-x-6 mb-8">
              <div className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${layers[activeLayer].gradient} flex items-center justify-center`}>
                {React.createElement(layers[activeLayer].icon, { className: "w-10 h-10 text-white" })}
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h4 className="text-3xl font-bold text-white">{layers[activeLayer].title}</h4>
                  <span className="text-blue-400 text-sm font-medium bg-blue-500/20 px-3 py-1 rounded-full">
                    Layer {layers[activeLayer].id} of 5
                  </span>
                </div>
                <p className="text-blue-400 text-lg font-medium mb-4">{layers[activeLayer].subtitle}</p>
                <p className="text-white/80 text-lg">{layers[activeLayer].description}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Features */}
              <div>
                <h5 className="text-xl font-bold text-white mb-4">Key Features</h5>
                <div className="space-y-3">
                  {layers[activeLayer].features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex items-start space-x-3"
                    >
                      <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-white/80">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Details */}
              <div>
                <h5 className="text-xl font-bold text-white mb-4">Detailed Capabilities</h5>
                <div className="space-y-4">
                  {Object.entries(layers[activeLayer].details).map(([key, value], index) => (
                    <motion.div
                      key={key}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="ultra-glass p-4 rounded-lg"
                    >
                      <h6 className="text-blue-400 font-medium mb-2">{key}</h6>
                      <p className="text-white/70 text-sm">{value}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Platform Growth Stages */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-32"
        >
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-white mb-4">Platform That Grows With You</h3>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Unlike static tools, StartupOS evolves with your startup, unlocking new features 
              and capabilities at each growth stage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { stage: "Seedling", description: "Idea validation and MVP development", emoji: "🌱", color: "from-green-400 to-emerald-500" },
              { stage: "Sprinter", description: "Product-market fit and early growth", emoji: "🚀", color: "from-blue-400 to-cyan-500" },
              { stage: "Scaler", description: "Scaling operations and expanding markets", emoji: "📈", color: "from-purple-400 to-pink-500" },
              { stage: "Dominator", description: "Market leadership and exit preparation", emoji: "👑", color: "from-orange-400 to-red-500" }
            ].map((item, index) => (
              <motion.div
                key={item.stage}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="ultra-card text-center"
              >
                <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${item.color} flex items-center justify-center text-2xl`}>
                  {item.emoji}
                </div>
                <h4 className="text-2xl font-bold text-white mb-3">{item.stage}</h4>
                <p className="text-white/70">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Built for Every Stakeholder */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mb-20"
        >
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-white mb-4">Built for Every Stakeholder</h3>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              StartupOS serves the entire startup ecosystem, creating value for founders, 
              executives, investors, and communities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {stakeholders.map((stakeholder, index) => (
              <motion.div
                key={stakeholder.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 1.0 + index * 0.1 }}
                whileHover={{ y: -5 }}
                className="ultra-card"
              >
                <div className="flex items-center space-x-4 mb-6">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${stakeholder.gradient} flex items-center justify-center`}>
                    <stakeholder.icon className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-2xl font-bold text-white">{stakeholder.title}</h4>
                </div>

                <div className="space-y-3">
                  {stakeholder.benefits.map((benefit, benefitIndex) => (
                    <div key={benefitIndex} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-white/80">{benefit}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-center"
        >
          <div className="ultra-glass rounded-3xl p-12">
            <div className="flex items-center justify-center space-x-2 mb-6">
              <Sparkles className="w-6 h-6 text-blue-400" />
              <span className="text-blue-400 font-medium">Ready to experience the future?</span>
            </div>
            
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Join thousands of startups already using StartupOS
            </h3>
            
            <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
              Accelerate your growth and achieve your goals faster with the most advanced 
              startup operating system ever created.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="ultra-button flex items-center space-x-2"
              >
                <Rocket className="w-5 h-5" />
                <span>Start Free Trial</span>
                <ArrowRight className="w-5 h-5" />
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

export default RevolutionarySolutions;

