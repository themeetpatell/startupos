import React from 'react';
import { motion } from 'framer-motion';
import PageSEO from './PageSEO';

const SEOLandingPage = () => {
  const features = [
    {
      title: "AI Copilots",
      description: "Intelligent automation tools that learn from your business patterns and provide actionable insights.",
      keywords: "AI copilot, business automation, intelligent tools"
    },
    {
      title: "Fractional CXO Services",
      description: "Access experienced C-level executives on-demand for strategic guidance and execution.",
      keywords: "fractional CXO, executive services, strategic guidance"
    },
    {
      title: "Process Automation",
      description: "Streamline operations with automated workflows and intelligent process management.",
      keywords: "process automation, workflow management, operational efficiency"
    },
    {
      title: "Expert Network",
      description: "Connect with industry experts, mentors, and advisors in our curated network.",
      keywords: "expert network, mentorship, business advisors"
    },
    {
      title: "Advanced Analytics",
      description: "Make data-driven decisions with comprehensive business intelligence and reporting.",
      keywords: "business analytics, data visualization, KPI tracking"
    },
    {
      title: "M&A Tools",
      description: "Comprehensive resources for mergers, acquisitions, and strategic partnerships.",
      keywords: "M&A tools, mergers acquisitions, business valuation"
    }
  ];

  const faqData = [
    {
      question: "What is StartupOS?",
      answer: "StartupOS is a comprehensive operating system for startups that combines AI-powered tools, fractional executive services, and expert networks to help entrepreneurs scale their businesses from idea to IPO."
    },
    {
      question: "How does the AI copilot work?",
      answer: "Our AI copilots learn from your business data and patterns to provide intelligent recommendations, automate routine tasks, and offer strategic insights tailored to your specific industry and growth stage."
    },
    {
      question: "What are fractional CXO services?",
      answer: "Fractional CXO services provide access to experienced C-level executives (CTO, CFO, CMO, etc.) on a part-time basis, offering strategic guidance and execution support without the full-time cost."
    },
    {
      question: "Is StartupOS suitable for early-stage startups?",
      answer: "Yes, StartupOS is designed to support startups at every stage, from pre-seed to IPO. Our tools and services scale with your business needs and growth trajectory."
    },
    {
      question: "How much does StartupOS cost?",
      answer: "We offer flexible pricing plans starting with a free tier for early-stage startups. Premium plans include advanced features, priority support, and access to our expert network."
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "StartupOS",
    "description": "The Complete Operating System for Startups with AI copilots, fractional CXO services, and expert networks",
    "url": "https://startupos.com",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    },
    "creator": {
      "@type": "Organization",
      "name": "StartupOS Team",
      "url": "https://startupos.com"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "150"
    },
    "featureList": features.map(f => f.title)
  };

  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <>
      <PageSEO
        page="home"
        title="StartupOS - The Complete Operating System for Startups | AI-Powered Growth Platform"
        description="Transform your startup with StartupOS - the all-in-one platform featuring AI copilots, fractional CXO services, process automation, and expert networks. Scale from idea to IPO with intelligent tools and proven frameworks."
        keywords="startup platform, AI copilot, fractional CXO, startup operations, process automation, startup tools, business automation, startup growth, venture capital, startup ecosystem, business intelligence, startup analytics, M&A tools, startup community"
        additionalStructuredData={structuredData}
      />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Hero Section */}
        <section className="py-20 px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              The Complete Operating System for{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Startups
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Transform your startup with AI copilots, fractional CXO services, process automation, 
              and expert networks. Scale from idea to IPO with intelligent tools and proven frameworks.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Start Free Trial
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                Watch Demo
              </motion.button>
            </div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
              Everything You Need to Scale Your Startup
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
                >
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {faqData.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white p-6 rounded-lg shadow-md"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600">
                    {faq.answer}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Ready to Transform Your Startup?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Join thousands of entrepreneurs who are already using StartupOS to scale their businesses.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all"
            >
              Get Started Today
            </motion.button>
          </motion.div>
        </section>
      </div>

      {/* FAQ Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(faqStructuredData)}
      </script>
    </>
  );
};

export default SEOLandingPage;
