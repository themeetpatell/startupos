# StartupOS Development Guide

## 🚀 Overview

StartupOS is a comprehensive platform for startup management, featuring AI-powered tools, employee marketplace, and ecosystem management. This guide covers development setup, architecture, and best practices.

## 📋 Table of Contents

- [Getting Started](#getting-started)
- [Architecture](#architecture)
- [Design System](#design-system)
- [State Management](#state-management)
- [Performance](#performance)
- [Accessibility](#accessibility)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)

## 🛠 Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm 8+
- Git

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd startupos-platform

# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Run tests
pnpm test

# Run linting
pnpm lint
```

### Environment Setup

Create a `.env.local` file in the root directory:

```env
VITE_APP_NAME=StartupOS
VITE_APP_VERSION=1.0.0
VITE_API_BASE_URL=http://localhost:3000/api
VITE_WS_URL=ws://localhost:3000/ws
VITE_ANALYTICS_ID=your-analytics-id
VITE_SENTRY_DSN=your-sentry-dsn
```

## 🏗 Architecture

### Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # Reusable UI components
│   ├── auth/           # Authentication components
│   └── ...
├── contexts/           # React contexts
│   ├── AuthContext.jsx
│   ├── AppStateContext.jsx
│   └── ...
├── hooks/              # Custom hooks
│   ├── usePerformance.js
│   ├── useAccessibility.js
│   └── ...
├── styles/             # Global styles
│   └── design-system.css
├── utils/              # Utility functions
│   ├── testUtils.jsx
│   └── ...
└── App.jsx             # Main app component
```

### Key Technologies

- **React 18** - UI framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Router** - Routing
- **Radix UI** - Accessible components
- **Zustand** - State management (planned)

## 🎨 Design System

### Color Palette

```css
/* Primary Colors */
--primary-50: #eff6ff;
--primary-500: #3b82f6;
--primary-900: #1e3a8a;

/* Secondary Colors */
--secondary-50: #f0f9ff;
--secondary-500: #0ea5e9;
--secondary-900: #0c4a6e;

/* Accent Colors */
--accent-purple: #8b5cf6;
--accent-pink: #ec4899;
--accent-emerald: #10b981;
```

### Typography

- **Font Family**: Inter (primary), JetBrains Mono (monospace)
- **Scale**: 12px, 14px, 16px, 18px, 20px, 24px, 30px, 36px, 48px
- **Weights**: 300, 400, 500, 600, 700, 800

### Components

All components follow the design system patterns:

```jsx
import { Button, Card, Input, Badge } from './components/DesignSystem';

// Usage
<Button variant="primary" size="md" loading={false}>
  Click me
</Button>

<Card variant="elevated" hover={true}>
  <h3>Card Title</h3>
  <p>Card content</p>
</Card>
```

## 🔄 State Management

### App State Context

The app uses a centralized state management system:

```jsx
import { useAppState, useAppActions } from './contexts/AppStateContext';

function MyComponent() {
  const { state } = useAppState();
  const { setCurrentView, addNotification } = useAppActions();
  
  // Use state and actions
}
```

### State Structure

```javascript
{
  ui: {
    sidebarOpen: false,
    theme: 'light',
    notifications: [],
    modals: [],
    loading: false,
    error: null
  },
  user: {
    profile: null,
    preferences: {},
    onboardingComplete: false
  },
  data: {
    aiEmployees: [],
    myEmployees: [],
    tasks: [],
    conversations: []
  }
}
```

## ⚡ Performance

### Optimization Strategies

1. **Code Splitting**
   ```jsx
   const LazyComponent = lazy(() => import('./LazyComponent'));
   ```

2. **Memoization**
   ```jsx
   const MemoizedComponent = memo(Component);
   const memoizedValue = useMemo(() => expensiveCalculation(), [deps]);
   ```

3. **Virtual Scrolling**
   ```jsx
   import { useVirtualScroll } from './hooks/usePerformance';
   ```

4. **Image Optimization**
   ```jsx
   import { useImageOptimization } from './hooks/usePerformance';
   ```

### Performance Monitoring

```jsx
import { usePerformance } from './hooks/usePerformance';

function App() {
  const { renderTime, memoryUsage, isSlowConnection } = usePerformance();
  
  // Monitor performance metrics
}
```

## ♿ Accessibility

### ARIA Support

All components include proper ARIA attributes:

```jsx
<button
  aria-label="Close modal"
  aria-expanded={isOpen}
  aria-controls="modal-content"
>
  Close
</button>
```

### Keyboard Navigation

```jsx
import { useKeyboardNavigation } from './hooks/useAccessibility';

function Menu({ items, onSelect }) {
  const { activeIndex, containerRef } = useKeyboardNavigation(items, onSelect);
  
  return (
    <div ref={containerRef} role="menu">
      {items.map((item, index) => (
        <div
          key={item.id}
          role="menuitem"
          tabIndex={activeIndex === index ? 0 : -1}
        >
          {item.label}
        </div>
      ))}
    </div>
  );
}
```

### Screen Reader Support

```jsx
import { useScreenReader } from './hooks/useAccessibility';

function MyComponent() {
  const { announce } = useScreenReader();
  
  const handleAction = () => {
    // Perform action
    announce('Action completed successfully');
  };
}
```

## 🧪 Testing

### Test Setup

```jsx
import { render, screen, fireEvent } from './utils/testUtils';
import { mockUser, mockAIEmployee } from './utils/testUtils';

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent user={mockUser} />);
    expect(screen.getByText('Welcome')).toBeInTheDocument();
  });
  
  it('handles user interaction', () => {
    render(<MyComponent />);
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByText('Clicked!')).toBeInTheDocument();
  });
});
```

### Test Utilities

- `render()` - Custom render with all providers
- `mockUser` - Mock user data
- `mockAIEmployee` - Mock AI employee data
- `testUtils` - Collection of test helpers

### Testing Best Practices

1. **Test user interactions, not implementation details**
2. **Use semantic queries (getByRole, getByLabelText)**
3. **Test accessibility features**
4. **Mock external dependencies**
5. **Test error states and edge cases**

## 🚀 Deployment

### Build Process

```bash
# Production build
pnpm build

# Preview build
pnpm preview

# Analyze bundle
pnpm build --analyze
```

### Environment Variables

- `VITE_APP_NAME` - Application name
- `VITE_API_BASE_URL` - API base URL
- `VITE_WS_URL` - WebSocket URL
- `VITE_ANALYTICS_ID` - Analytics tracking ID

### Deployment Checklist

- [ ] Environment variables configured
- [ ] Build optimization enabled
- [ ] Error tracking configured
- [ ] Performance monitoring enabled
- [ ] Accessibility audit passed
- [ ] Cross-browser testing completed

## 🤝 Contributing

### Development Workflow

1. **Fork the repository**
2. **Create a feature branch**
3. **Make your changes**
4. **Write tests**
5. **Run linting and tests**
6. **Submit a pull request**

### Code Standards

- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Conventional Commits** - Commit messages
- **TypeScript** - Type safety (planned)

### Pull Request Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tests pass
- [ ] New tests added
- [ ] Manual testing completed

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No breaking changes
```

## 📚 Additional Resources

- [React Documentation](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Radix UI](https://www.radix-ui.com/)
- [Testing Library](https://testing-library.com/)

## 🐛 Troubleshooting

### Common Issues

1. **Build fails**
   - Check Node.js version
   - Clear node_modules and reinstall
   - Check for TypeScript errors

2. **Tests fail**
   - Check test environment setup
   - Verify mock data
   - Check for async operations

3. **Performance issues**
   - Use React DevTools Profiler
   - Check for unnecessary re-renders
   - Optimize images and assets

### Getting Help

- Check existing issues
- Create a new issue with detailed description
- Join our Discord community
- Contact the development team

---

**Happy coding! 🚀**
