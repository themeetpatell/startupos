import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Users, Target, Zap, Globe, Award, Heart, Brain, Rocket } from 'lucide-react';
import '../App.css';

const AboutPage = () => {
  const [activeFounder, setActiveFounder] = useState(0);
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });

  const founders = [
    {
      name: "Alex Chen",
      role: "CEO & Co-Founder",
      bio: "Former VP of Engineering at Stripe. Built 3 successful startups. Stanford CS, MIT MBA. Passionate about democratizing startup success.",
      image: "/api/placeholder/400/400",
      achievements: ["$2.5B in startup value created", "500+ startups mentored", "Forbes 30 Under 30"],
      quote: "Every great startup deserves the tools to become extraordinary."
    },
    {
      name: "Sarah Rodriguez",
      role: "CTO & Co-Founder", 
      bio: "Ex-Google AI Research. PhD in Machine Learning from MIT. Led engineering teams at Uber and Airbnb. Expert in scalable systems.",
      image: "/api/placeholder/400/400",
      achievements: ["20+ AI patents", "TechCrunch Disruptor Award", "MIT Technology Review Innovator"],
      quote: "AI should amplify human potential, not replace it."
    },
    {
      name: "Marcus Thompson",
      role: "CPO & Co-Founder",
      bio: "Former Head of Product at Notion. 15 years in product design. Created products used by 100M+ users. Design thinking evangelist.",
      image: "/api/placeholder/400/400", 
      achievements: ["100M+ users impacted", "Design Excellence Award", "Product Hunt Maker of the Year"],
      quote: "Great products feel like magic, but are built with science."
    }
  ];

  const values = [
    {
      icon: Rocket,
      title: "Build with Boldness",
      description: "We take calculated risks and push boundaries to create breakthrough solutions.",
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: Heart,
      title: "Fulfill with Fun",
      description: "We believe work should be joyful and that spirited fun drives innovation.",
      gradient: "from-pink-500 to-purple-500"
    },
    {
      icon: Zap,
      title: "Move with Momentum",
      description: "We act with urgency while taking care of each other and our community.",
      gradient: "from-yellow-500 to-orange-500"
    },
    {
      icon: Target,
      title: "Obsessed with Outcomes",
      description: "We think like customers and measure success by the value we create.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Award,
      title: "Outperform with Ownership",
      description: "We take full responsibility and maintain integrity in everything we do.",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: Globe,
      title: "Scale with Speed",
      description: "We move quickly but thoughtfully, ensuring quality at every step.",
      gradient: "from-indigo-500 to-purple-500"
    }
  ];

  const stats = [
    { number: "10K+", label: "Startups Powered", icon: Rocket },
    { number: "$2.5B+", label: "Capital Raised", icon: Target },
    { number: "95%", label: "Success Rate", icon: Award },
    { number: "150+", label: "Countries", icon: Globe }
  ];

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-b from-slate-900 via-purple-900/20 to-slate-900">
      {/* Floating Particles Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="floating-particles"></div>
      </div>

      {/* Hero Section */}
      <section ref={heroRef} className="py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-center mb-20"
          >
            <motion.h1 
              className="text-6xl md:text-8xl font-bold mb-8"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isHeroInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1.2, delay: 0.2 }}
            >
              <span className="ultra-text-gradient">Revolutionizing</span>
              <br />
              <span className="text-white">Startup Success</span>
            </motion.h1>
            <motion.p 
              className="text-2xl text-white/70 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.4 }}
            >
              We exist to give startups unstoppable momentum from idea to scale. 
              Our mission is to democratize startup success through intelligent automation, 
              expert networks, and revolutionary tools.
            </motion.p>
          </motion.div>

          {/* Stats Grid */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
            initial={{ opacity: 0, y: 50 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.6 }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="ultra-glass text-center p-8 rounded-2xl"
                whileHover={{ scale: 1.05, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <stat.icon className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                <div className="text-4xl font-bold ultra-text-gradient mb-2">{stat.number}</div>
                <div className="text-white/70 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="ultra-glass p-12 rounded-3xl"
            >
              <Target className="w-16 h-16 text-blue-400 mb-6" />
              <h2 className="text-4xl font-bold text-white mb-6">Our Mission</h2>
              <p className="text-xl text-white/70 leading-relaxed">
                To give every startup unstoppable momentum from idea to scale by providing 
                AI-powered tools, expert networks, and intelligent systems that eliminate 
                barriers to success.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="ultra-glass p-12 rounded-3xl"
            >
              <Brain className="w-16 h-16 text-purple-400 mb-6" />
              <h2 className="text-4xl font-bold text-white mb-6">Our Vision</h2>
              <p className="text-xl text-white/70 leading-relaxed">
                A world where every great idea has the opportunity to become a successful 
                startup, regardless of background, location, or initial resources.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl font-bold text-white mb-6">
              Our <span className="ultra-text-gradient">Core Values</span>
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              These principles guide everything we do and shape how we build the future of startup success.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="ultra-glass p-8 rounded-2xl group cursor-pointer"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${value.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{value.title}</h3>
                <p className="text-white/70 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Founders Section */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl font-bold text-white mb-6">
              Meet the <span className="ultra-text-gradient">Visionaries</span>
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Our founding team combines decades of startup experience with cutting-edge technical expertise.
            </p>
          </motion.div>

          <div className="ultra-glass rounded-3xl p-8 md:p-12">
            {/* Founder Selector */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {founders.map((founder, index) => (
                <button
                  key={index}
                  onClick={() => setActiveFounder(index)}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    activeFounder === index
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                      : 'bg-white/10 text-white/70 hover:bg-white/20'
                  }`}
                >
                  {founder.name}
                </button>
              ))}
            </div>

            {/* Active Founder Display */}
            <motion.div
              key={activeFounder}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="grid md:grid-cols-2 gap-12 items-center"
            >
              <div className="text-center md:text-left">
                <h3 className="text-4xl font-bold text-white mb-2">
                  {founders[activeFounder].name}
                </h3>
                <p className="text-xl text-blue-400 mb-6">{founders[activeFounder].role}</p>
                <p className="text-lg text-white/70 mb-8 leading-relaxed">
                  {founders[activeFounder].bio}
                </p>
                
                <div className="mb-8">
                  <h4 className="text-xl font-bold text-white mb-4">Key Achievements</h4>
                  <ul className="space-y-2">
                    {founders[activeFounder].achievements.map((achievement, index) => (
                      <li key={index} className="text-white/70 flex items-center">
                        <Award className="w-5 h-5 text-yellow-400 mr-3" />
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>

                <blockquote className="text-xl italic text-white/80 border-l-4 border-blue-400 pl-6">
                  "{founders[activeFounder].quote}"
                </blockquote>
              </div>

              <div className="relative">
                <div className="w-80 h-80 mx-auto rounded-3xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                  <Users className="w-32 h-32 text-white/30" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="ultra-glass rounded-3xl p-12"
          >
            <h2 className="text-5xl font-bold text-white mb-6">
              Ready to Join the <span className="ultra-text-gradient">Revolution</span>?
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto mb-8">
              Be part of the movement that's transforming how startups are built, scaled, and succeed.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="ultra-button flex items-center space-x-2 text-lg px-8 py-4">
                <Rocket className="w-6 h-6" />
                <span>Start Your Journey</span>
              </button>
              <button className="px-8 py-4 border border-white/20 rounded-full text-white hover:bg-white/10 transition-colors duration-200 font-medium">
                Learn More
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;

