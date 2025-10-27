// SEO utility functions for dynamic meta tag generation

export const generatePageTitle = (page, baseTitle = "StartupOS") => {
  const pageTitles = {
    dashboard: `${baseTitle} - Dashboard | AI-Powered Startup Management`,
    'ai-cobuilder': `${baseTitle} - AI Copilot Builder | Intelligent Business Automation`,
    community: `${baseTitle} - Community Hub | Connect with Startup Ecosystem`,
    ma: `${baseTitle} - M&A Tools | Merger & Acquisition Resources`,
    analytics: `${baseTitle} - Advanced Analytics | Business Intelligence Dashboard`,
    ecosystem: `${baseTitle} - Ecosystem Hub | Startup Network & Resources`,
    workhub: `${baseTitle} - Work Hub | Digital Headquarters for Teams`,
    people: `${baseTitle} - People Management | HR & Team Operations`,
    billing: `${baseTitle} - Billing & Subscription Management`,
    support: `${baseTitle} - Help & Support Center`,
    profile: `${baseTitle} - User Profile & Settings`,
    roadmap: `${baseTitle} - Startup Roadmap | Growth Planning Tools`,
    gamification: `${baseTitle} - Gamification Dashboard | Achievement Tracking`,
    login: `${baseTitle} - Sign In | Access Your Startup Platform`,
    signup: `${baseTitle} - Sign Up | Start Your Startup Journey`,
    'forgot-password': `${baseTitle} - Reset Password | Account Recovery`
  };
  
  return pageTitles[page] || `${baseTitle} - ${page.charAt(0).toUpperCase() + page.slice(1)}`;
};

export const generatePageDescription = (page) => {
  const descriptions = {
    dashboard: "Access your comprehensive startup dashboard with AI-powered insights, real-time analytics, and intelligent recommendations to accelerate your business growth.",
    'ai-cobuilder': "Build custom AI copilots for your startup operations. Automate processes, generate insights, and scale your business with intelligent automation tools.",
    community: "Connect with fellow entrepreneurs, investors, and industry experts in our vibrant startup community. Share knowledge, find mentors, and grow together.",
    ma: "Access comprehensive M&A tools, valuation calculators, due diligence checklists, and expert guidance for successful mergers and acquisitions.",
    analytics: "Unlock powerful business intelligence with advanced analytics, custom dashboards, and AI-driven insights to make data-driven decisions.",
    ecosystem: "Explore our curated startup ecosystem with access to investors, accelerators, service providers, and strategic partners for your growth journey.",
    workhub: "Your digital headquarters for team collaboration, project management, and remote work. Streamline operations and boost productivity.",
    people: "Manage your team effectively with HR tools, performance tracking, talent acquisition, and organizational development resources.",
    billing: "Manage your subscription, billing, and payment preferences. View usage analytics and upgrade your plan as you scale.",
    support: "Get help when you need it. Access documentation, tutorials, and connect with our support team for technical assistance.",
    profile: "Manage your account settings, preferences, and personal information. Customize your StartupOS experience.",
    roadmap: "Plan your startup's growth journey with our comprehensive roadmap tools, milestone tracking, and strategic planning resources.",
    gamification: "Track your achievements, earn badges, and stay motivated with our gamification system designed for entrepreneurs.",
    login: "Sign in to your StartupOS account and access all the tools you need to grow your startup from idea to scale.",
    signup: "Join thousands of entrepreneurs using StartupOS to build, scale, and succeed. Start your free trial today.",
    'forgot-password': "Reset your StartupOS password securely. Follow the instructions to regain access to your account."
  };
  
  return descriptions[page] || "Access powerful tools and resources to accelerate your startup's growth with StartupOS.";
};

export const generatePageKeywords = (page) => {
  const baseKeywords = "startup platform, business automation, AI tools, entrepreneurship";
  
  const pageKeywords = {
    dashboard: `${baseKeywords}, startup dashboard, business analytics, growth metrics`,
    'ai-cobuilder': `${baseKeywords}, AI copilot, automation tools, business intelligence`,
    community: `${baseKeywords}, startup community, networking, mentorship, collaboration`,
    ma: `${baseKeywords}, M&A tools, mergers acquisitions, business valuation, due diligence`,
    analytics: `${baseKeywords}, business analytics, data visualization, KPI tracking`,
    ecosystem: `${baseKeywords}, startup ecosystem, investors, accelerators, partnerships`,
    workhub: `${baseKeywords}, team collaboration, project management, remote work`,
    people: `${baseKeywords}, HR management, talent acquisition, team building`,
    billing: `${baseKeywords}, subscription management, billing, payment processing`,
    support: `${baseKeywords}, customer support, help center, documentation`,
    profile: `${baseKeywords}, user profile, account settings, personalization`,
    roadmap: `${baseKeywords}, startup roadmap, growth planning, milestone tracking`,
    gamification: `${baseKeywords}, achievement tracking, motivation, progress monitoring`,
    login: `${baseKeywords}, user authentication, secure login, account access`,
    signup: `${baseKeywords}, user registration, free trial, account creation`,
    'forgot-password': `${baseKeywords}, password reset, account recovery, security`
  };
  
  return pageKeywords[page] || baseKeywords;
};

export const generateStructuredData = (page, additionalData = {}) => {
  const baseStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "StartupOS",
    "description": generatePageDescription(page),
    "url": `https://startupos.com/${page}`,
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
    }
  };

  // Add page-specific structured data
  if (page === 'community') {
    baseStructuredData["@type"] = "WebPage";
    baseStructuredData.about = {
      "@type": "Thing",
      "name": "Startup Community",
      "description": "A platform for entrepreneurs to connect, collaborate, and grow together"
    };
  }

  return { ...baseStructuredData, ...additionalData };
};

export const generateBreadcrumbStructuredData = (breadcrumbs) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": crumb.url
    }))
  };
};

export const generateFAQStructuredData = (faqs) => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
};

// Performance and SEO monitoring
export const trackPagePerformance = (pageName) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'page_view', {
      page_title: generatePageTitle(pageName),
      page_location: window.location.href,
      page_path: window.location.pathname
    });
  }
};

export const trackSEOMetrics = (metrics) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'seo_metrics', {
      event_category: 'SEO',
      event_label: metrics.label,
      value: metrics.value
    });
  }
};
