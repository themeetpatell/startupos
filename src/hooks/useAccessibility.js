import { useState, useEffect, useCallback, useRef } from 'react';

// Keyboard navigation hook
export const useKeyboardNavigation = (items, onSelect) => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef(null);

  const handleKeyDown = useCallback((event) => {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        setActiveIndex(prev => 
          prev < items.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        event.preventDefault();
        setActiveIndex(prev => 
          prev > 0 ? prev - 1 : items.length - 1
        );
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        if (activeIndex >= 0 && items[activeIndex]) {
          onSelect(items[activeIndex], activeIndex);
        }
        break;
      case 'Escape':
        setActiveIndex(-1);
        break;
    }
  }, [items, activeIndex, onSelect]);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('keydown', handleKeyDown);
      return () => container.removeEventListener('keydown', handleKeyDown);
    }
  }, [handleKeyDown]);

  return {
    activeIndex,
    setActiveIndex,
    containerRef
  };
};

// Focus management hook
export const useFocusManagement = () => {
  const [focusHistory, setFocusHistory] = useState([]);
  const previousFocusRef = useRef(null);

  const saveFocus = useCallback(() => {
    const activeElement = document.activeElement;
    if (activeElement && activeElement !== document.body) {
      previousFocusRef.current = activeElement;
      setFocusHistory(prev => [...prev, activeElement]);
    }
  }, []);

  const restoreFocus = useCallback(() => {
    if (previousFocusRef.current) {
      previousFocusRef.current.focus();
    }
  }, []);

  const trapFocus = useCallback((containerRef) => {
    const container = containerRef.current;
    if (!container) return;

    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTabKey = (e) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    container.addEventListener('keydown', handleTabKey);
    firstElement?.focus();

    return () => {
      container.removeEventListener('keydown', handleTabKey);
    };
  }, []);

  return {
    saveFocus,
    restoreFocus,
    trapFocus,
    focusHistory
  };
};

// Screen reader announcements hook
export const useScreenReader = () => {
  const [announcements, setAnnouncements] = useState([]);

  const announce = useCallback((message, priority = 'polite') => {
    const announcement = {
      id: Date.now(),
      message,
      priority
    };
    
    setAnnouncements(prev => [...prev, announcement]);
    
    // Remove announcement after 5 seconds
    setTimeout(() => {
      setAnnouncements(prev => prev.filter(a => a.id !== announcement.id));
    }, 5000);
  }, []);

  return {
    announcements,
    announce
  };
};

// High contrast mode detection
export const useHighContrast = () => {
  const [isHighContrast, setIsHighContrast] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-contrast: high)');
    setIsHighContrast(mediaQuery.matches);

    const handleChange = (e) => setIsHighContrast(e.matches);
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return isHighContrast;
};

// Reduced motion detection
export const useReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersReducedMotion;
};

// Color scheme detection
export const useColorScheme = () => {
  const [colorScheme, setColorScheme] = useState('light');

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setColorScheme(mediaQuery.matches ? 'dark' : 'light');

    const handleChange = (e) => setColorScheme(e.matches ? 'dark' : 'light');
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return colorScheme;
};

// ARIA live region hook
export const useAriaLiveRegion = () => {
  const [liveRegion, setLiveRegion] = useState('');

  const announce = useCallback((message) => {
    setLiveRegion(message);
    // Clear the message after a short delay to allow re-announcement
    setTimeout(() => setLiveRegion(''), 100);
  }, []);

  return {
    liveRegion,
    announce
  };
};

// Skip links hook
export const useSkipLinks = () => {
  const [skipLinks, setSkipLinks] = useState([]);

  const addSkipLink = useCallback((id, label, targetId) => {
    setSkipLinks(prev => [...prev, { id, label, targetId }]);
  }, []);

  const removeSkipLink = useCallback((id) => {
    setSkipLinks(prev => prev.filter(link => link.id !== id));
  }, []);

  return {
    skipLinks,
    addSkipLink,
    removeSkipLink
  };
};
