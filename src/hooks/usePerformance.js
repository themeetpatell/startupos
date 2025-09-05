import { useState, useEffect, useCallback, useMemo } from 'react';

// Performance monitoring hook
export const usePerformance = () => {
  const [metrics, setMetrics] = useState({
    renderTime: 0,
    memoryUsage: 0,
    isSlowConnection: false
  });

  useEffect(() => {
    // Monitor render performance
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        if (entry.entryType === 'measure') {
          setMetrics(prev => ({
            ...prev,
            renderTime: entry.duration
          }));
        }
      });
    });

    observer.observe({ entryTypes: ['measure'] });

    // Monitor memory usage
    if ('memory' in performance) {
      const updateMemory = () => {
        setMetrics(prev => ({
          ...prev,
          memoryUsage: performance.memory.usedJSHeapSize / 1024 / 1024 // MB
        }));
      };

      updateMemory();
      const interval = setInterval(updateMemory, 5000);
      return () => clearInterval(interval);
    }

    return () => observer.disconnect();
  }, []);

  // Check connection speed
  useEffect(() => {
    if ('connection' in navigator) {
      const connection = navigator.connection;
      setMetrics(prev => ({
        ...prev,
        isSlowConnection: connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g'
      }));
    }
  }, []);

  return metrics;
};

// Debounce hook for performance
export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// Throttle hook for performance
export const useThrottle = (callback, delay) => {
  const [isThrottled, setIsThrottled] = useState(false);

  const throttledCallback = useCallback((...args) => {
    if (!isThrottled) {
      callback(...args);
      setIsThrottled(true);
      setTimeout(() => setIsThrottled(false), delay);
    }
  }, [callback, delay, isThrottled]);

  return throttledCallback;
};

// Virtual scrolling hook
export const useVirtualScroll = (items, itemHeight, containerHeight) => {
  const [scrollTop, setScrollTop] = useState(0);

  const visibleItems = useMemo(() => {
    const startIndex = Math.floor(scrollTop / itemHeight);
    const endIndex = Math.min(
      startIndex + Math.ceil(containerHeight / itemHeight) + 1,
      items.length
    );

    return items.slice(startIndex, endIndex).map((item, index) => ({
      ...item,
      index: startIndex + index,
      top: (startIndex + index) * itemHeight
    }));
  }, [items, itemHeight, containerHeight, scrollTop]);

  const totalHeight = items.length * itemHeight;

  return {
    visibleItems,
    totalHeight,
    setScrollTop
  };
};

// Lazy loading hook
export const useLazyLoad = (threshold = 0.1) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const ref = useCallback((node) => {
    if (node) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !hasLoaded) {
            setIsIntersecting(true);
            setHasLoaded(true);
          }
        },
        { threshold }
      );
      observer.observe(node);
    }
  }, [threshold, hasLoaded]);

  return { ref, isIntersecting, hasLoaded };
};

// Image optimization hook
export const useImageOptimization = (src, options = {}) => {
  const [imageState, setImageState] = useState({
    src: null,
    loading: true,
    error: false
  });

  const {
    quality = 80,
    format = 'webp',
    width,
    height,
    lazy = true
  } = options;

  useEffect(() => {
    if (!src) return;

    const img = new Image();
    
    img.onload = () => {
      setImageState({
        src: img.src,
        loading: false,
        error: false
      });
    };

    img.onerror = () => {
      setImageState({
        src: null,
        loading: false,
        error: true
      });
    };

    // Simulate optimized image URL (in real app, use a service like Cloudinary)
    const optimizedSrc = `${src}?q=${quality}&f=${format}${width ? `&w=${width}` : ''}${height ? `&h=${height}` : ''}`;
    img.src = optimizedSrc;
  }, [src, quality, format, width, height]);

  return imageState;
};
