import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AppStateProvider } from '../contexts/AppStateContext';
import { AuthProvider } from '../contexts/AuthContext';
import { GamificationProvider } from '../contexts/GamificationContext';
import { ToastProvider } from '../components/Toast';

// Mock framer-motion to avoid animation issues in tests
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    button: ({ children, ...props }) => <button {...props}>{children}</button>,
    span: ({ children, ...props }) => <span {...props}>{children}</span>,
    h1: ({ children, ...props }) => <h1 {...props}>{children}</h1>,
    h2: ({ children, ...props }) => <h2 {...props}>{children}</h2>,
    p: ({ children, ...props }) => <p {...props}>{children}</p>,
    input: ({ ...props }) => <input {...props} />,
    select: ({ children, ...props }) => <select {...props}>{children}</select>,
    option: ({ children, ...props }) => <option {...props}>{children}</option>,
    form: ({ children, ...props }) => <form {...props}>{children}</form>,
    label: ({ children, ...props }) => <label {...props}>{children}</label>,
    textarea: ({ ...props }) => <textarea {...props} />,
    img: ({ ...props }) => <img {...props} />,
    svg: ({ children, ...props }) => <svg {...props}>{children}</svg>,
    path: ({ ...props }) => <path {...props} />,
    circle: ({ ...props }) => <circle {...props} />,
    rect: ({ ...props }) => <rect {...props} />,
    g: ({ children, ...props }) => <g {...props}>{children}</g>,
    line: ({ ...props }) => <line {...props} />,
    polygon: ({ ...props }) => <polygon {...props} />,
    polyline: ({ ...props }) => <polyline {...props} />,
    ellipse: ({ ...props }) => <ellipse {...props} />,
    defs: ({ children, ...props }) => <defs {...props}>{children}</defs>,
    clipPath: ({ children, ...props }) => <clipPath {...props}>{children}</clipPath>,
    mask: ({ children, ...props }) => <mask {...props}>{children}</mask>,
    pattern: ({ children, ...props }) => <pattern {...props}>{children}</pattern>,
    linearGradient: ({ children, ...props }) => <linearGradient {...props}>{children}</linearGradient>,
    radialGradient: ({ children, ...props }) => <radialGradient {...props}>{children}</radialGradient>,
    stop: ({ ...props }) => <stop {...props} />,
    animate: ({ children, ...props }) => <div {...props}>{children}</div>,
    AnimatePresence: ({ children }) => <>{children}</>,
  },
  AnimatePresence: ({ children }) => <>{children}</>,
  useAnimation: () => ({
    start: jest.fn(),
    stop: jest.fn(),
    set: jest.fn(),
  }),
  useMotionValue: (value) => ({ current: value }),
  useTransform: (value, inputRange, outputRange) => value,
  useSpring: (value) => value,
  useScroll: () => ({ scrollYProgress: { current: 0 } }),
}));

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  Search: () => <div data-testid="search-icon" />,
  Filter: () => <div data-testid="filter-icon" />,
  Plus: () => <div data-testid="plus-icon" />,
  User: () => <div data-testid="user-icon" />,
  Settings: () => <div data-testid="settings-icon" />,
  LogOut: () => <div data-testid="logout-icon" />,
  Menu: () => <div data-testid="menu-icon" />,
  X: () => <div data-testid="close-icon" />,
  ChevronDown: () => <div data-testid="chevron-down-icon" />,
  ChevronUp: () => <div data-testid="chevron-up-icon" />,
  ChevronLeft: () => <div data-testid="chevron-left-icon" />,
  ChevronRight: () => <div data-testid="chevron-right-icon" />,
  ArrowRight: () => <div data-testid="arrow-right-icon" />,
  ArrowLeft: () => <div data-testid="arrow-left-icon" />,
  Check: () => <div data-testid="check-icon" />,
  XCircle: () => <div data-testid="x-circle-icon" />,
  AlertCircle: () => <div data-testid="alert-circle-icon" />,
  Info: () => <div data-testid="info-icon" />,
  CheckCircle: () => <div data-testid="check-circle-icon" />,
  Star: () => <div data-testid="star-icon" />,
  Users: () => <div data-testid="users-icon" />,
  Brain: () => <div data-testid="brain-icon" />,
  BarChart3: () => <div data-testid="bar-chart-icon" />,
  Building2: () => <div data-testid="building-icon" />,
  Globe: () => <div data-testid="globe-icon" />,
  Zap: () => <div data-testid="zap-icon" />,
  Shield: () => <div data-testid="shield-icon" />,
  Rocket: () => <div data-testid="rocket-icon" />,
  TrendingUp: () => <div data-testid="trending-up-icon" />,
  Award: () => <div data-testid="award-icon" />,
  Play: () => <div data-testid="play-icon" />,
  Quote: () => <div data-testid="quote-icon" />,
  ArrowUpRight: () => <div data-testid="arrow-up-right-icon" />,
  Sparkles: () => <div data-testid="sparkles-icon" />,
  Loader2: () => <div data-testid="loader-icon" />,
  AlertTriangle: () => <div data-testid="alert-triangle-icon" />,
  RefreshCw: () => <div data-testid="refresh-icon" />,
  Home: () => <div data-testid="home-icon" />,
}));

// Custom render function with all providers
const customRender = (ui, options = {}) => {
  const AllTheProviders = ({ children }) => {
    return (
      <BrowserRouter>
        <AuthProvider>
          <AppStateProvider>
            <GamificationProvider>
              <ToastProvider>
                {children}
              </ToastProvider>
            </GamificationProvider>
          </AppStateProvider>
        </AuthProvider>
      </BrowserRouter>
    );
  };

  return render(ui, { wrapper: AllTheProviders, ...options });
};

// Mock user data
export const mockUser = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'https://via.placeholder.com/40',
  role: 'startup_founder',
  preferences: {
    theme: 'light',
    notifications: true,
    language: 'en'
  }
};

// Mock AI employee data
export const mockAIEmployee = {
  id: '1',
  name: 'Alex AI',
  role: 'Marketing Specialist',
  department: 'Marketing',
  description: 'AI-powered marketing specialist with expertise in digital campaigns',
  skills: ['Digital Marketing', 'Content Creation', 'Analytics'],
  hourlyRate: 25,
  rating: 4.8,
  tasksCompleted: 150,
  isActive: false,
  capabilities: [
    'Social media management',
    'Content strategy',
    'Campaign optimization'
  ],
  lastActive: '2024-01-15T10:30:00Z'
};

// Mock task data
export const mockTask = {
  id: '1',
  title: 'Create social media campaign',
  description: 'Develop a comprehensive social media strategy for Q1',
  status: 'pending',
  priority: 'high',
  assignedTo: '1',
  createdAt: '2024-01-15T10:30:00Z',
  dueDate: '2024-01-20T17:00:00Z'
};

// Mock conversation data
export const mockConversation = {
  id: '1',
  employeeId: '1',
  messages: [
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I\'m Alex, your AI Marketing Specialist. How can I help you today?',
      timestamp: '2024-01-15T10:30:00Z'
    },
    {
      id: '2',
      role: 'user',
      content: 'I need help with our social media strategy',
      timestamp: '2024-01-15T10:31:00Z'
    }
  ],
  createdAt: '2024-01-15T10:30:00Z',
  updatedAt: '2024-01-15T10:31:00Z'
};

// Test utilities
export const testUtils = {
  // Wait for element to appear
  waitForElement: async (selector, timeout = 5000) => {
    return await waitFor(() => screen.getByTestId(selector), { timeout });
  },

  // Wait for text to appear
  waitForText: async (text, timeout = 5000) => {
    return await waitFor(() => screen.getByText(text), { timeout });
  },

  // Wait for element to disappear
  waitForElementToDisappear: async (selector, timeout = 5000) => {
    return await waitFor(() => {
      expect(screen.queryByTestId(selector)).not.toBeInTheDocument();
    }, { timeout });
  },

  // Simulate user typing
  typeInInput: (input, text) => {
    fireEvent.change(input, { target: { value: text } });
  },

  // Simulate button click
  clickButton: (button) => {
    fireEvent.click(button);
  },

  // Simulate form submission
  submitForm: (form) => {
    fireEvent.submit(form);
  },

  // Simulate keyboard navigation
  pressKey: (element, key) => {
    fireEvent.keyDown(element, { key });
  },

  // Simulate mouse hover
  hoverElement: (element) => {
    fireEvent.mouseOver(element);
  },

  // Simulate mouse leave
  leaveElement: (element) => {
    fireEvent.mouseOut(element);
  },

  // Simulate focus
  focusElement: (element) => {
    fireEvent.focus(element);
  },

  // Simulate blur
  blurElement: (element) => {
    fireEvent.blur(element);
  },

  // Simulate scroll
  scrollElement: (element, scrollTop) => {
    fireEvent.scroll(element, { target: { scrollTop } });
  },

  // Simulate resize
  resizeWindow: (width, height) => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: width,
    });
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: height,
    });
    fireEvent.resize(window);
  },

  // Mock API responses
  mockApiResponse: (data, delay = 0) => {
    return new Promise((resolve) => {
      setTimeout(() => resolve({ data }), delay);
    });
  },

  // Mock API error
  mockApiError: (message, delay = 0) => {
    return new Promise((_, reject) => {
      setTimeout(() => reject(new Error(message)), delay);
    });
  },

  // Mock localStorage
  mockLocalStorage: (data = {}) => {
    const store = { ...data };
    const localStorage = {
      getItem: jest.fn((key) => store[key] || null),
      setItem: jest.fn((key, value) => {
        store[key] = value;
      }),
      removeItem: jest.fn((key) => {
        delete store[key];
      }),
      clear: jest.fn(() => {
        Object.keys(store).forEach(key => delete store[key]);
      }),
    };
    Object.defineProperty(window, 'localStorage', {
      value: localStorage,
      writable: true,
    });
    return localStorage;
  },

  // Mock sessionStorage
  mockSessionStorage: (data = {}) => {
    const store = { ...data };
    const sessionStorage = {
      getItem: jest.fn((key) => store[key] || null),
      setItem: jest.fn((key, value) => {
        store[key] = value;
      }),
      removeItem: jest.fn((key) => {
        delete store[key];
      }),
      clear: jest.fn(() => {
        Object.keys(store).forEach(key => delete store[key]);
      }),
    };
    Object.defineProperty(window, 'sessionStorage', {
      value: sessionStorage,
      writable: true,
    });
    return sessionStorage;
  },

  // Mock fetch
  mockFetch: (response, shouldReject = false) => {
    const mockResponse = {
      ok: !shouldReject,
      status: shouldReject ? 400 : 200,
      json: () => Promise.resolve(response),
      text: () => Promise.resolve(JSON.stringify(response)),
    };
    global.fetch = jest.fn(() => Promise.resolve(mockResponse));
    return global.fetch;
  },

  // Mock IntersectionObserver
  mockIntersectionObserver: () => {
    const mockIntersectionObserver = jest.fn();
    mockIntersectionObserver.mockReturnValue({
      observe: () => null,
      unobserve: () => null,
      disconnect: () => null,
    });
    window.IntersectionObserver = mockIntersectionObserver;
    return mockIntersectionObserver;
  },

  // Mock ResizeObserver
  mockResizeObserver: () => {
    const mockResizeObserver = jest.fn();
    mockResizeObserver.mockReturnValue({
      observe: () => null,
      unobserve: () => null,
      disconnect: () => null,
    });
    window.ResizeObserver = mockResizeObserver;
    return mockResizeObserver;
  },

  // Mock matchMedia
  mockMatchMedia: (matches = true) => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  },

  // Mock performance
  mockPerformance: () => {
    Object.defineProperty(window, 'performance', {
      value: {
        now: jest.fn(() => Date.now()),
        mark: jest.fn(),
        measure: jest.fn(),
        getEntriesByType: jest.fn(() => []),
        getEntriesByName: jest.fn(() => []),
        memory: {
          usedJSHeapSize: 1000000,
          totalJSHeapSize: 2000000,
          jsHeapSizeLimit: 4000000,
        },
      },
      writable: true,
    });
  },

  // Mock navigator
  mockNavigator: (overrides = {}) => {
    Object.defineProperty(window, 'navigator', {
      value: {
        userAgent: 'Mozilla/5.0 (compatible; Test)',
        language: 'en-US',
        languages: ['en-US', 'en'],
        platform: 'Test',
        onLine: true,
        ...overrides,
      },
      writable: true,
    });
  },

  // Mock console methods
  mockConsole: () => {
    const originalConsole = { ...console };
    console.log = jest.fn();
    console.warn = jest.fn();
    console.error = jest.fn();
    console.info = jest.fn();
    console.debug = jest.fn();
    return originalConsole;
  },

  // Restore console methods
  restoreConsole: (originalConsole) => {
    Object.assign(console, originalConsole);
  },

  // Clean up after tests
  cleanup: () => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    jest.restoreAllMocks();
  },
};

// Re-export everything
export * from '@testing-library/react';
export { customRender as render };
export { screen, fireEvent, waitFor };
