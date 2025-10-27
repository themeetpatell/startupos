// SEO Configuration for StartupOS Platform

export const seoConfig = {
  // Site Information
  siteName: "StartupOS",
  siteUrl: "https://startupos.com",
  siteDescription: "The Complete Operating System for Startups with AI copilots, fractional CXO services, and expert networks",
  
  // Default Meta Tags
  defaultTitle: "StartupOS - The Complete Operating System for Startups",
  defaultDescription: "Transform your startup with StartupOS - the all-in-one platform featuring AI copilots, fractional CXO services, process automation, and expert networks.",
  defaultKeywords: "startup platform, AI copilot, fractional CXO, startup operations, process automation, startup tools, business automation, startup growth",
  
  // Social Media
  social: {
    twitter: "@startupos",
    facebook: "startupos",
    linkedin: "startupos",
    instagram: "startupos"
  },
  
  // Images
  images: {
    default: "https://startupos.com/og-image.jpg",
    logo: "https://startupos.com/logo.png",
    favicon: "https://startupos.com/favicon.ico"
  },
  
  // Page-specific configurations
  pages: {
    home: {
      title: "StartupOS - The Complete Operating System for Startups | AI-Powered Growth Platform",
      description: "Transform your startup with StartupOS - the all-in-one platform featuring AI copilots, fractional CXO services, process automation, and expert networks. Scale from idea to IPO with intelligent tools and proven frameworks.",
      keywords: "startup platform, AI copilot, fractional CXO, startup operations, process automation, startup tools, business automation, startup growth, venture capital, startup ecosystem, business intelligence, startup analytics, M&A tools, startup community",
      priority: 1.0,
      changefreq: "daily"
    },
    dashboard: {
      title: "StartupOS Dashboard | AI-Powered Startup Management",
      description: "Access your comprehensive startup dashboard with AI-powered insights, real-time analytics, and intelligent recommendations to accelerate your business growth.",
      keywords: "startup dashboard, business analytics, growth metrics, AI insights, startup management",
      priority: 0.9,
      changefreq: "daily"
    },
    'ai-cobuilder': {
      title: "AI Copilot Builder | Intelligent Business Automation Tools",
      description: "Build custom AI copilots for your startup operations. Automate processes, generate insights, and scale your business with intelligent automation tools.",
      keywords: "AI copilot, business automation, intelligent tools, process automation, AI builder",
      priority: 0.8,
      changefreq: "weekly"
    },
    community: {
      title: "Startup Community Hub | Connect with Entrepreneurs & Experts",
      description: "Connect with fellow entrepreneurs, investors, and industry experts in our vibrant startup community. Share knowledge, find mentors, and grow together.",
      keywords: "startup community, networking, mentorship, collaboration, entrepreneur network",
      priority: 0.8,
      changefreq: "weekly"
    },
    analytics: {
      title: "Advanced Analytics | Business Intelligence Dashboard",
      description: "Unlock powerful business intelligence with advanced analytics, custom dashboards, and AI-driven insights to make data-driven decisions.",
      keywords: "business analytics, data visualization, KPI tracking, business intelligence, startup metrics",
      priority: 0.8,
      changefreq: "weekly"
    },
    ecosystem: {
      title: "Ecosystem Hub | Startup Network & Resources",
      description: "Explore our curated startup ecosystem with access to investors, accelerators, service providers, and strategic partners for your growth journey.",
      keywords: "startup ecosystem, investors, accelerators, partnerships, startup resources",
      priority: 0.8,
      changefreq: "weekly"
    },
    ma: {
      title: "M&A Tools | Merger & Acquisition Resources",
      description: "Access comprehensive M&A tools, valuation calculators, due diligence checklists, and expert guidance for successful mergers and acquisitions.",
      keywords: "M&A tools, mergers acquisitions, business valuation, due diligence, M&A resources",
      priority: 0.7,
      changefreq: "weekly"
    },
    workhub: {
      title: "Work Hub | Digital Headquarters for Teams",
      description: "Your digital headquarters for team collaboration, project management, and remote work. Streamline operations and boost productivity.",
      keywords: "team collaboration, project management, remote work, digital headquarters, productivity tools",
      priority: 0.7,
      changefreq: "weekly"
    },
    people: {
      title: "People Management | HR & Team Operations",
      description: "Manage your team effectively with HR tools, performance tracking, talent acquisition, and organizational development resources.",
      keywords: "HR management, talent acquisition, team building, people operations, human resources",
      priority: 0.7,
      changefreq: "weekly"
    },
    billing: {
      title: "Billing & Subscription Management",
      description: "Manage your subscription, billing, and payment preferences. View usage analytics and upgrade your plan as you scale.",
      keywords: "subscription management, billing, payment processing, usage analytics, pricing plans",
      priority: 0.6,
      changefreq: "monthly"
    },
    support: {
      title: "Help & Support Center",
      description: "Get help when you need it. Access documentation, tutorials, and connect with our support team for technical assistance.",
      keywords: "customer support, help center, documentation, technical assistance, tutorials",
      priority: 0.6,
      changefreq: "weekly"
    },
    profile: {
      title: "User Profile & Settings",
      description: "Manage your account settings, preferences, and personal information. Customize your StartupOS experience.",
      keywords: "user profile, account settings, personalization, user preferences",
      priority: 0.5,
      changefreq: "monthly"
    },
    roadmap: {
      title: "Startup Roadmap | Growth Planning Tools",
      description: "Plan your startup's growth journey with our comprehensive roadmap tools, milestone tracking, and strategic planning resources.",
      keywords: "startup roadmap, growth planning, milestone tracking, strategic planning, business planning",
      priority: 0.7,
      changefreq: "weekly"
    },
    gamification: {
      title: "Gamification Dashboard | Achievement Tracking",
      description: "Track your achievements, earn badges, and stay motivated with our gamification system designed for entrepreneurs.",
      keywords: "achievement tracking, motivation, progress monitoring, gamification, entrepreneur rewards",
      priority: 0.6,
      changefreq: "weekly"
    },
    login: {
      title: "Sign In | Access Your Startup Platform",
      description: "Sign in to your StartupOS account and access all the tools you need to grow your startup from idea to scale.",
      keywords: "user authentication, secure login, account access, startup platform login",
      priority: 0.7,
      changefreq: "monthly"
    },
    signup: {
      title: "Sign Up | Start Your Startup Journey",
      description: "Join thousands of entrepreneurs using StartupOS to build, scale, and succeed. Start your free trial today.",
      keywords: "user registration, free trial, account creation, startup platform signup",
      priority: 0.8,
      changefreq: "monthly"
    },
    'forgot-password': {
      title: "Reset Password | Account Recovery",
      description: "Reset your StartupOS password securely. Follow the instructions to regain access to your account.",
      keywords: "password reset, account recovery, security, password recovery",
      priority: 0.5,
      changefreq: "monthly"
    }
  },
  
  // Structured Data Templates
  structuredData: {
    organization: {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "StartupOS",
      "url": "https://startupos.com",
      "logo": "https://startupos.com/logo.png",
      "description": "The Complete Operating System for Startups",
      "foundingDate": "2024",
      "sameAs": [
        "https://twitter.com/startupos",
        "https://linkedin.com/company/startupos",
        "https://facebook.com/startupos"
      ]
    },
    softwareApplication: {
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
      }
    }
  }
};

export default seoConfig;
