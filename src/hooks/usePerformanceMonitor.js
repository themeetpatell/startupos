import { useEffect, useRef } from 'react';

export const usePerformanceMonitor = (componentName) => {
  const renderStartTime = useRef();
  const mountTime = useRef();

  useEffect(() => {
    // Track component mount time
    mountTime.current = performance.now();
    
    // Track render time
    renderStartTime.current = performance.now();
    
    // Log performance metrics in development
    if (process.env.NODE_ENV === 'development') {
      const renderTime = performance.now() - renderStartTime.current;
      console.log(`[Performance] ${componentName} render time: ${renderTime.toFixed(2)}ms`);
    }

    return () => {
      if (mountTime.current && process.env.NODE_ENV === 'development') {
        const totalTime = performance.now() - mountTime.current;
        console.log(`[Performance] ${componentName} total lifecycle: ${totalTime.toFixed(2)}ms`);
      }
    };
  });

  // Track re-renders
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Performance] ${componentName} re-rendered`);
    }
  });
};

export const useMemoryMonitor = (componentName) => {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development' && 'memory' in performance) {
      const memory = performance.memory;
      console.log(`[Memory] ${componentName}:`, {
        used: `${(memory.usedJSHeapSize / 1024 / 1024).toFixed(2)} MB`,
        total: `${(memory.totalJSHeapSize / 1024 / 1024).toFixed(2)} MB`,
        limit: `${(memory.jsHeapSizeLimit / 1024 / 1024).toFixed(2)} MB`
      });
    }
  });
};

export const useBundleAnalyzer = () => {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      // Track bundle size impact
      const scripts = document.querySelectorAll('script[src]');
      let totalSize = 0;
      
      scripts.forEach(script => {
        // This is a simplified approach - in production you'd use webpack-bundle-analyzer
        console.log(`[Bundle] Script loaded: ${script.src}`);
      });
    }
  }, []);
};
