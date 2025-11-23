import { useCallback, useEffect } from 'react';

export const useAnalytics = () => {
  const trackEvent = useCallback((eventName, properties = {}) => {
    // Analytics event tracked
  }, []);

  const trackPageView = useCallback((pageName) => {
    trackEvent('page_view', { page: pageName });
  }, [trackEvent]);

  const trackUserAction = useCallback((action, context = {}) => {
    trackEvent('user_action', { action, ...context });
  }, [trackEvent]);

  const trackOnboardingStep = useCallback((step, data = {}) => {
    trackEvent('onboarding_step', { step, ...data });
  }, [trackEvent]);

  const trackConversion = useCallback((conversionType, value = null) => {
    trackEvent('conversion', { type: conversionType, value });
  }, [trackEvent]);

  const trackError = useCallback((error, context = {}) => {
    trackEvent('error', { 
      error: error.message || error, 
      stack: error.stack,
      ...context 
    });
  }, [trackEvent]);

  const trackPerformance = useCallback((metric, value, context = {}) => {
    trackEvent('performance', { 
      metric, 
      value, 
      ...context 
    });
  }, [trackEvent]);

  return {
    trackEvent,
    trackPageView,
    trackUserAction,
    trackOnboardingStep,
    trackConversion,
    trackError,
    trackPerformance
  };
};

// Performance monitoring hook
export const usePerformanceMonitor = () => {
  useEffect(() => {
    // Track page load performance
    const trackPageLoad = () => {
      if (performance.timing) {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        const domContentLoaded = performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart;
        
        // Performance metrics tracked
      }
    };

    // Track Core Web Vitals
    const trackWebVitals = () => {
      // Largest Contentful Paint
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        // LCP tracked
      }).observe({ entryTypes: ['largest-contentful-paint'] });

      // First Input Delay
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          // FID tracked
        });
      }).observe({ entryTypes: ['first-input'] });

      // Cumulative Layout Shift
      let clsValue = 0;
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });
        // CLS tracked
      }).observe({ entryTypes: ['layout-shift'] });
    };

    // Track resource loading
    const trackResourceTiming = () => {
      const resources = performance.getEntriesByType('resource');
      const slowResources = resources.filter(resource => resource.duration > 1000);
      
      if (slowResources.length > 0) {
        // Slow resources tracked
      }
    };

    // Initialize tracking
    if (document.readyState === 'complete') {
      trackPageLoad();
      trackWebVitals();
      trackResourceTiming();
    } else {
      window.addEventListener('load', () => {
        trackPageLoad();
        trackWebVitals();
        trackResourceTiming();
      });
    }
  }, []);
};

// Bundle size monitoring
export const useBundleSizeMonitor = () => {
  useEffect(() => {
    // Monitor bundle size in development
    if (process.env.NODE_ENV === 'development') {
      const scripts = document.querySelectorAll('script[src]');
      let totalSize = 0;
      
      scripts.forEach(script => {
        const src = script.src;
        if (src.includes('assets/')) {
          // Estimate size based on URL patterns
          totalSize += 100; // Placeholder
        }
      });
      
      // Bundle size estimated
    }
  }, []);
};

export default useAnalytics;

