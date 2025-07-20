import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  MessageCircle, 
  Calendar, 
  Users, 
  Zap, 
  Globe,
  Send,
  CheckCircle,
  Clock,
  Star
} from 'lucide-react';
import '../App.css';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    stage: '',
    message: '',
    contactMethod: 'email'
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactMethods = [
    {
      icon: Mail,
      title: "Email Us",
      description: "Get in touch via email for detailed inquiries",
      contact: "hello@startupos.com",
      action: "Send Email",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Phone,
      title: "Call Us",
      description: "Speak directly with our team",
      contact: "+1 (555) 123-4567",
      action: "Call Now",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Get instant support via live chat",
      contact: "Available 24/7",
      action: "Start Chat",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: Calendar,
      title: "Book a Demo",
      description: "Schedule a personalized demo",
      contact: "30-minute sessions",
      action: "Schedule Now",
      gradient: "from-orange-500 to-red-500"
    }
  ];

  const offices = [
    {
      city: "San Francisco",
      address: "123 Innovation Drive, Suite 400",
      country: "United States",
      timezone: "PST",
      phone: "+1 (555) 123-4567"
    },
    {
      city: "London",
      address: "456 Tech Square, Floor 12",
      country: "United Kingdom", 
      timezone: "GMT",
      phone: "+44 20 7123 4567"
    },
    {
      city: "Singapore",
      address: "789 Startup Boulevard, Level 25",
      country: "Singapore",
      timezone: "SGT",
      phone: "+65 6123 4567"
    }
  ];

  const faqs = [
    {
      question: "How quickly can I get started with StartupOS?",
      answer: "You can get started immediately with our free trial. Full onboarding typically takes 24-48 hours with dedicated support."
    },
    {
      question: "Do you offer custom enterprise solutions?",
      answer: "Yes, we provide fully customized solutions for enterprise clients with dedicated support, custom integrations, and white-labeling options."
    },
    {
      question: "What kind of support do you provide?",
      answer: "We offer 24/7 support via chat, email, and phone, plus dedicated customer success managers for premium plans."
    },
    {
      question: "Can I integrate StartupOS with existing tools?",
      answer: "Absolutely! We have 500+ integrations and a robust API for custom connections with your existing tech stack."
    }
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
              <span className="ultra-text-gradient">Get in Touch</span>
              <br />
              <span className="text-white">Let's Build Together</span>
            </motion.h1>
            <motion.p 
              className="text-2xl text-white/70 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.4 }}
            >
              Ready to transform your startup journey? Our team is here to help you 
              unlock your potential and accelerate your growth.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Choose Your <span className="ultra-text-gradient">Preferred Method</span>
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              We're available through multiple channels to provide you with the best support experience.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactMethods.map((method, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="ultra-glass p-8 rounded-2xl text-center group cursor-pointer"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${method.gradient} flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <method.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{method.title}</h3>
                <p className="text-white/70 mb-4">{method.description}</p>
                <p className="text-blue-400 font-medium mb-6">{method.contact}</p>
                <button className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300">
                  {method.action}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="ultra-glass p-8 md:p-12 rounded-3xl"
            >
              <h2 className="text-4xl font-bold text-white mb-8">
                Send us a <span className="ultra-text-gradient">Message</span>
              </h2>
              
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-6" />
                  <h3 className="text-2xl font-bold text-white mb-4">Message Sent!</h3>
                  <p className="text-white/70">We'll get back to you within 24 hours.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-white font-medium mb-2">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:border-blue-400 focus:outline-none transition-colors"
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-white font-medium mb-2">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:border-blue-400 focus:outline-none transition-colors"
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-white font-medium mb-2">Company</label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:border-blue-400 focus:outline-none transition-colors"
                        placeholder="Your company name"
                      />
                    </div>
                    <div>
                      <label className="block text-white font-medium mb-2">Startup Stage</label>
                      <select
                        name="stage"
                        value={formData.stage}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:border-blue-400 focus:outline-none transition-colors"
                      >
                        <option value="">Select stage</option>
                        <option value="idea">Idea Stage</option>
                        <option value="mvp">MVP Development</option>
                        <option value="early">Early Stage</option>
                        <option value="growth">Growth Stage</option>
                        <option value="scale">Scale Stage</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={6}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:border-blue-400 focus:outline-none transition-colors resize-none"
                      placeholder="Tell us about your startup and how we can help..."
                      required
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full ultra-button flex items-center justify-center space-x-2 text-lg py-4"
                  >
                    <Send className="w-5 h-5" />
                    <span>Send Message</span>
                  </button>
                </form>
              )}
            </motion.div>

            {/* Contact Info & Offices */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* Response Time */}
              <div className="ultra-glass p-8 rounded-2xl">
                <Clock className="w-12 h-12 text-blue-400 mb-4" />
                <h3 className="text-2xl font-bold text-white mb-4">Quick Response</h3>
                <p className="text-white/70 mb-4">
                  We typically respond within 2 hours during business hours and within 24 hours on weekends.
                </p>
                <div className="flex items-center space-x-2 text-green-400">
                  <Star className="w-5 h-5" />
                  <span className="font-medium">Average response: 1.5 hours</span>
                </div>
              </div>

              {/* Global Offices */}
              <div className="ultra-glass p-8 rounded-2xl">
                <Globe className="w-12 h-12 text-purple-400 mb-4" />
                <h3 className="text-2xl font-bold text-white mb-6">Global Offices</h3>
                <div className="space-y-6">
                  {offices.map((office, index) => (
                    <div key={index} className="border-l-4 border-blue-400 pl-6">
                      <h4 className="text-xl font-bold text-white">{office.city}</h4>
                      <p className="text-white/70">{office.address}</p>
                      <p className="text-white/70">{office.country}</p>
                      <div className="flex items-center space-x-4 mt-2 text-sm">
                        <span className="text-blue-400">{office.timezone}</span>
                        <span className="text-white/70">{office.phone}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Support Hours */}
              <div className="ultra-glass p-8 rounded-2xl">
                <Users className="w-12 h-12 text-green-400 mb-4" />
                <h3 className="text-2xl font-bold text-white mb-4">Support Hours</h3>
                <div className="space-y-3 text-white/70">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span className="text-green-400">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span className="text-yellow-400">10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span className="text-red-400">Emergency only</span>
                  </div>
                  <div className="mt-4 p-3 bg-blue-500/20 rounded-lg">
                    <p className="text-blue-400 text-sm">
                      <Zap className="w-4 h-4 inline mr-2" />
                      Premium customers get 24/7 priority support
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Frequently Asked <span className="ultra-text-gradient">Questions</span>
            </h2>
            <p className="text-xl text-white/70">
              Quick answers to common questions about StartupOS.
            </p>
          </motion.div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="ultra-glass p-8 rounded-2xl"
              >
                <h3 className="text-xl font-bold text-white mb-4">{faq.question}</h3>
                <p className="text-white/70 leading-relaxed">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;

