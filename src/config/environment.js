// Environment configuration
export const config = {
  app: {
    name: import.meta.env.VITE_APP_NAME || 'StartupOS',
    version: import.meta.env.VITE_APP_VERSION || '1.0.0',
    environment: import.meta.env.VITE_APP_ENVIRONMENT || 'development'
  },
  
  api: {
    baseUrl: import.meta.env.VITE_API_BASE_URL || 'https://api.startupos.com',
    timeout: parseInt(import.meta.env.VITE_API_TIMEOUT) || 30000
  },
  
  analytics: {
    enabled: import.meta.env.VITE_ANALYTICS_ENABLED === 'true',
    id: import.meta.env.VITE_ANALYTICS_ID
  },
  
  features: {
    aiCobuilder: import.meta.env.VITE_FEATURE_AI_COBUILDER === 'true',
    gamification: import.meta.env.VITE_FEATURE_GAMIFICATION === 'true',
    analytics: import.meta.env.VITE_FEATURE_ANALYTICS === 'true'
  },
  
  security: {
    cspNonce: import.meta.env.VITE_CSP_NONCE,
    sentryDsn: import.meta.env.VITE_SENTRY_DSN
  },
  
  performance: {
    monitoring: import.meta.env.VITE_ENABLE_PERFORMANCE_MONITORING === 'true',
    bundleAnalyzer: import.meta.env.VITE_BUNDLE_ANALYZER === 'true'
  }
};

// Validate required environment variables
export const validateConfig = () => {
  const required = ['VITE_APP_NAME'];
  const missing = required.filter(key => !import.meta.env[key]);
  
  if (missing.length > 0) {
    console.warn('Missing required environment variables:', missing);
  }
  
  return missing.length === 0;
};

export default config;
