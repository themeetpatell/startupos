import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { 
  Check, 
  Star, 
  Zap, 
  Crown, 
  Rocket, 
  Shield,
  ArrowRight,
  Sparkles,
  Users,
  BarChart3,
  Globe,
  Brain,
  Phone,
  Mail,
  MessageCircle,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import '../App.css';

const UltraPremiumPricing = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [billingCycle, setBillingCycle] = useState('annual');
  const [expandedFaq, setExpandedFaq] = useState(null);

  const plans = [
    {
      name: "Seedling",
      subtitle: "Perfect for early-stage startups and solo founders",
      icon: Rocket,
      gradient: "from-green-400 to-emerald-500",
      monthlyPrice: 39,
      annualPrice: 468,
      popular: false,
      features: [
        "AI Copilot (Basic)",
        "Stage-aware dashboard", 
        "Basic analytics",
        "Community access",
        "Email support",
        "Up to 5 team members",
        "Basic integrations",
        "Mobile app access",
        "Limited AI queries (100/month)",
        "Basic templates only",
        "Standard support response"
      ],
      limitations: [
        "Limited AI capabilities",
        "Basic analytics only",
        "Standard support"
      ]
    },
    {
      name: "Sprinter",
      subtitle: "For growing startups ready to scale",
      icon: Zap,
      gradient: "from-blue-400 to-cyan-500",
      monthlyPrice: 119,
      annualPrice: 1428,
      popular: true,
      features: [
        "AI Copilot (Advanced)",
        "Full execution system",
        "Advanced analytics & insights",
        "Fractional CXO matching",
        "Priority support",
        "Up to 25 team members",
        "All integrations",
        "Custom workflows",
        "Performance tracking",
        "Goal management",
        "Team collaboration tools",
        "Advanced AI queries (1000/month)",
        "Premium templates",
        "24/7 chat support"
      ],
      limitations: []
    },
    {
      name: "Scaler",
      subtitle: "For established startups and scale-ups",
      icon: Crown,
      gradient: "from-purple-400 to-pink-500",
      monthlyPrice: 279,
      annualPrice: 3348,
      popular: false,
      features: [
        "AI Copilot (Enterprise)",
        "Full platform access",
        "Real-time intelligence",
        "Dedicated CXO network",
        "White-glove support",
        "Unlimited team members",
        "Custom integrations",
        "Advanced security",
        "Multi-workspace support",
        "Custom reporting",
        "API access",
        "Dedicated success manager",
        "Unlimited AI queries",
        "Custom templates",
        "Phone & video support"
      ],
      limitations: []
    },
    {
      name: "Enterprise",
      subtitle: "Custom solutions for large organizations",
      icon: Shield,
      gradient: "from-gray-400 to-slate-500",
      monthlyPrice: null,
      annualPrice: null,
      popular: false,
      features: [
        "Everything in Scaler",
        "Custom AI training",
        "On-premise deployment",
        "Custom integrations",
        "Dedicated infrastructure",
        "SLA guarantees",
        "24/7 phone support",
        "Custom onboarding",
        "Compliance certifications",
        "Advanced security controls",
        "Custom development",
        "Executive training"
      ],
      limitations: []
    }
  ];

  const addOns = [
    {
      name: "Premium AI Training",
      description: "Custom AI model training on your startup's data",
      price: 299,
      icon: Brain
    },
    {
      name: "Dedicated Success Manager",
      description: "Personal success manager for strategic guidance",
      price: 499,
      icon: Users
    },
    {
      name: "Advanced Analytics Suite",
      description: "Deep insights and predictive analytics",
      price: 199,
      icon: BarChart3
    },
    {
      name: "White-Label Solution",
      description: "Fully branded platform for your organization",
      price: 999,
      icon: Globe
    }
  ];

  const faqs = [
    {
      question: "How does the AI Copilot actually work?",
      answer: "Our AI Copilots are domain-specific AI agents trained on startup best practices and your company data. They don't just provide suggestions—they execute tasks like financial modeling, hiring workflows, and go-to-market strategies. Each copilot integrates directly into your workflows and learns from your team's patterns."
    },
    {
      question: "What makes StartupOS different from other startup tools?",
      answer: "StartupOS is the only platform that grows with your startup. Unlike static tools, we unlock new features and capabilities as you hit growth milestones. Our AI copilots execute tasks rather than just providing advice, and our fractional CXO network provides expert leadership on-demand."
    },
    {
      question: "How does the fractional CXO matching work?",
      answer: "Our AI analyzes your startup's stage, industry, goals, and culture to match you with the perfect fractional executives. All CXOs in our network are vetted and have proven track records. You work with them on outcome-based contracts with clear deliverables and timelines."
    },
    {
      question: "Can I upgrade or downgrade my plan anytime?",
      answer: "Yes, you can change your plan at any time. Upgrades take effect immediately, while downgrades take effect at your next billing cycle. We'll prorate any charges and ensure a smooth transition without losing your data or progress."
    },
    {
      question: "What kind of support do you provide?",
      answer: "Support varies by plan: Seedling gets email support, Sprinter gets priority chat support, Scaler gets white-glove support with a dedicated success manager, and Enterprise gets 24/7 phone support with SLA guarantees. All plans include our comprehensive knowledge base and community forums."
    },
    {
      question: "Is my startup data secure?",
      answer: "Absolutely. We maintain SOC 2 Type II compliance, use end-to-end encryption, and follow enterprise-grade security practices. Your data is never shared with other startups or third parties. Enterprise plans include additional security controls and compliance certifications."
    }
  ];

  const getPrice = (plan) => {
    if (!plan.monthlyPrice) return "Custom";
    return billingCycle === 'monthly' ? plan.monthlyPrice : Math.round(plan.annualPrice / 12);
  };

  const getSavings = (plan) => {
    if (!plan.monthlyPrice) return 0;
    return Math.round(((plan.monthlyPrice * 12 - plan.annualPrice) / (plan.monthlyPrice * 12)) * 100);
  };

  return (
    <section ref={containerRef} id="pricing" className="py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-purple-900/20 to-slate-900" />
      
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl" />
      </div>

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
            <span className="text-blue-400 font-medium">Simple, Transparent Pricing</span>
          </motion.div>

          <h2 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="ultra-text-gradient">Simple, Transparent</span>
            <br />
            <span className="text-white">Pricing</span>
          </h2>

          <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed mb-12">
            Choose the plan that fits your startup's stage and scale. All plans include 
            our core features with no hidden fees.
          </p>

          {/* Billing Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex items-center justify-center space-x-4"
          >
            <span className={`font-medium ${billingCycle === 'monthly' ? 'text-white' : 'text-white/60'}`}>
              Monthly
            </span>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
              className={`relative w-16 h-8 rounded-full transition-colors duration-300 ${
                billingCycle === 'annual' ? 'bg-blue-500' : 'bg-white/20'
              }`}
            >
              <motion.div
                animate={{ x: billingCycle === 'annual' ? 32 : 4 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="absolute top-1 w-6 h-6 bg-white rounded-full"
              />
            </motion.button>
            <span className={`font-medium ${billingCycle === 'annual' ? 'text-white' : 'text-white/60'}`}>
              Annual
            </span>
            {billingCycle === 'annual' && (
              <motion.span
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-green-500 text-white text-sm font-medium px-3 py-1 rounded-full"
              >
                Save 20%
              </motion.span>
            )}
          </motion.div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className={`ultra-card relative ${plan.popular ? 'ring-2 ring-blue-400/50' : ''}`}
            >
              {plan.popular && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute -top-4 left-1/2 transform -translate-x-1/2"
                >
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-medium px-4 py-2 rounded-full">
                    Most Popular
                  </div>
                </motion.div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-8">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${plan.gradient} flex items-center justify-center`}>
                  <plan.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-white/60 text-sm mb-6">{plan.subtitle}</p>
                
                <div className="mb-6">
                  {plan.monthlyPrice ? (
                    <>
                      <div className="flex items-baseline justify-center">
                        <span className="text-4xl font-bold text-white">${getPrice(plan)}</span>
                        <span className="text-white/60 ml-1">/month</span>
                      </div>
                      {billingCycle === 'annual' && (
                        <p className="text-white/60 text-sm mt-2">
                          Billed annually (${plan.annualPrice}/year)
                        </p>
                      )}
                      {billingCycle === 'annual' && getSavings(plan) > 0 && (
                        <p className="text-green-400 text-sm font-medium">
                          Save {getSavings(plan)}% annually
                        </p>
                      )}
                    </>
                  ) : (
                    <div className="text-3xl font-bold text-white">Custom Pricing</div>
                  )}
                </div>
              </div>

              {/* Features List */}
              <div className="space-y-3 mb-8">
                {plan.features.slice(0, 8).map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-white/80 text-sm">{feature}</span>
                  </div>
                ))}
                {plan.features.length > 8 && (
                  <div className="text-white/60 text-sm">
                    +{plan.features.length - 8} more features
                  </div>
                )}
              </div>

              {/* CTA Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-4 rounded-full font-medium transition-all duration-200 ${
                  plan.popular
                    ? 'ultra-button'
                    : 'border border-white/20 text-white hover:bg-white/10'
                }`}
              >
                {plan.monthlyPrice ? 'Start Free Trial' : 'Contact Sales'}
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* Add-ons Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">Premium Add-ons</h3>
            <p className="text-white/70 max-w-2xl mx-auto">
              Enhance your StartupOS experience with these premium add-ons available for all plans.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {addOns.map((addon, index) => (
              <motion.div
                key={addon.name}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                whileHover={{ y: -5 }}
                className="ultra-glass p-6 rounded-xl text-center"
              >
                <addon.icon className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                <h4 className="text-lg font-bold text-white mb-2">{addon.name}</h4>
                <p className="text-white/60 text-sm mb-4">{addon.description}</p>
                <div className="text-2xl font-bold text-white">${addon.price}/mo</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">Frequently Asked Questions</h3>
            <p className="text-white/70 max-w-2xl mx-auto">
              Everything you need to know about StartupOS pricing and features.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 1.0 + index * 0.1 }}
                className="ultra-glass rounded-xl overflow-hidden"
              >
                <motion.button
                  whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full p-6 text-left flex items-center justify-between"
                >
                  <span className="text-white font-medium">{faq.question}</span>
                  {expandedFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-white/60" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-white/60" />
                  )}
                </motion.button>
                
                <AnimatePresence>
                  {expandedFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 text-white/70 leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-center"
        >
          <div className="ultra-glass rounded-3xl p-12">
            <h3 className="text-3xl font-bold text-white mb-4">
              Still have questions?
            </h3>
            <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
              Our team is here to help you choose the perfect plan for your startup's needs.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="ultra-button flex items-center space-x-2"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Chat with Sales</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 px-8 py-4 border border-white/20 rounded-full text-white hover:bg-white/10 transition-colors duration-200 font-medium"
              >
                <Phone className="w-5 h-5" />
                <span>Schedule Call</span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default UltraPremiumPricing;

