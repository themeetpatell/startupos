import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Apple Design System Components

const AppleButton = ({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  disabled = false, 
  loading = false,
  icon,
  iconPosition = 'left',
  className = '',
  onClick,
  type = 'button',
  ...props 
}) => {
  const baseClasses = 'apple-button focus-visible:apple-focus';
  const variantClasses = {
    primary: 'apple-button-primary',
    secondary: 'apple-button-secondary',
    tertiary: 'apple-button-tertiary',
    destructive: 'apple-button-destructive'
  };
  const sizeClasses = {
    small: 'apple-button-small',
    medium: 'apple-button-medium',
    large: 'apple-button-large'
  };

  return (
    <motion.button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.96 }}
      transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
      {...props}
    >
      {loading && (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="apple-spinner mr-2"
        />
      )}
      {icon && iconPosition === 'left' && (
        <span className="mr-2">{icon}</span>
      )}
      {children}
      {icon && iconPosition === 'right' && (
        <span className="ml-2">{icon}</span>
      )}
    </motion.button>
  );
};

const AppleCard = ({ 
  children, 
  variant = 'default',
  hover = true,
  className = '',
  onClick,
  ...props 
}) => {
  const baseClasses = 'apple-card';
  const variantClasses = {
    default: '',
    elevated: 'apple-card-elevated',
    glass: 'apple-glass'
  };

  return (
    <motion.div
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      onClick={onClick}
      whileHover={hover ? { y: -2 } : {}}
      transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

const AppleInput = ({ 
  label,
  error,
  helperText,
  icon,
  iconPosition = 'left',
  className = '',
  ...props 
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="apple-text-callout font-medium text-gray-700 mb-2 block">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && iconPosition === 'left' && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
        <input
          className={`apple-input ${icon && iconPosition === 'left' ? 'pl-10' : ''} ${icon && iconPosition === 'right' ? 'pr-10' : ''} ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''} ${className}`}
          {...props}
        />
        {icon && iconPosition === 'right' && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
      </div>
      {error && (
        <p className="apple-text-caption-1 text-red-500 mt-1">{error}</p>
      )}
      {helperText && !error && (
        <p className="apple-text-caption-1 text-gray-500 mt-1">{helperText}</p>
      )}
    </div>
  );
};

const AppleBadge = ({ 
  children, 
  variant = 'primary',
  size = 'medium',
  className = '',
  ...props 
}) => {
  const baseClasses = 'apple-badge';
  const variantClasses = {
    primary: 'apple-badge-primary',
    success: 'apple-badge-success',
    warning: 'apple-badge-warning',
    error: 'apple-badge-error',
    gray: 'apple-badge-gray'
  };
  const sizeClasses = {
    small: 'text-xs px-2 py-1',
    medium: 'text-xs px-3 py-1',
    large: 'text-sm px-3 py-1'
  };

  return (
    <span className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`} {...props}>
      {children}
    </span>
  );
};

const AppleModal = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  size = 'medium',
  className = '',
  ...props 
}) => {
  if (!isOpen) return null;

  const sizeClasses = {
    small: 'max-w-md',
    medium: 'max-w-2xl',
    large: 'max-w-4xl',
    xl: 'max-w-6xl'
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="apple-modal-backdrop"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className={`apple-modal w-full ${sizeClasses[size]} ${className}`}
          onClick={(e) => e.stopPropagation()}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          {...props}
        >
          {title && (
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="apple-text-title-3 text-gray-900">{title}</h2>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-lg hover:bg-gray-100"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          )}
          <div className="p-6">
            {children}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const AppleLoadingSpinner = ({ 
  size = 'medium',
  text,
  className = '',
  ...props 
}) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-6 h-6',
    large: 'w-8 h-8',
    xl: 'w-12 h-12'
  };

  return (
    <div className={`flex flex-col items-center justify-center space-y-3 ${className}`} {...props}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className={`${sizeClasses[size]} apple-spinner`}
      />
      {text && (
        <p className="apple-text-callout text-gray-600">{text}</p>
      )}
    </div>
  );
};

const AppleEmptyState = ({ 
  icon,
  title,
  description,
  action,
  className = '',
  ...props 
}) => {
  return (
    <div className={`text-center py-16 ${className}`} {...props}>
      {icon && (
        <div className="w-20 h-20 mx-auto mb-6 text-gray-400">
          {icon}
        </div>
      )}
      <h3 className="apple-text-title-2 text-gray-900 mb-3">{title}</h3>
      <p className="apple-text-body text-gray-600 mb-8 max-w-md mx-auto">{description}</p>
      {action && action}
    </div>
  );
};

const ApplePageHeader = ({ 
  title,
  subtitle,
  action,
  breadcrumbs,
  className = '',
  ...props 
}) => {
  return (
    <div className={`mb-8 ${className}`} {...props}>
      {breadcrumbs && (
        <nav className="flex mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            {breadcrumbs.map((crumb, index) => (
              <li key={index} className="flex items-center">
                {index > 0 && (
                  <svg className="w-4 h-4 text-gray-400 mx-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                )}
                {crumb.href ? (
                  <a href={crumb.href} className="apple-text-callout text-gray-500 hover:text-gray-700 transition-colors">
                    {crumb.label}
                  </a>
                ) : (
                  <span className="apple-text-callout text-gray-900 font-medium">{crumb.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>
      )}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="apple-text-large-title text-gray-900">{title}</h1>
          {subtitle && (
            <p className="apple-text-body text-gray-600 mt-2">{subtitle}</p>
          )}
        </div>
        {action && (
          <div className="flex-shrink-0">
            {action}
          </div>
        )}
      </div>
    </div>
  );
};

const AppleStatsCard = ({ 
  title,
  value,
  change,
  changeType = 'positive',
  icon,
  className = '',
  ...props 
}) => {
  const changeColors = {
    positive: 'text-green-600',
    negative: 'text-red-600',
    neutral: 'text-gray-600'
  };

  return (
    <AppleCard className={`p-6 ${className}`} {...props}>
      <div className="flex items-center justify-between">
        <div>
          <p className="apple-text-callout text-gray-600 mb-1">{title}</p>
          <p className="apple-text-title-1 text-gray-900">{value}</p>
          {change && (
            <p className={`apple-text-caption-1 ${changeColors[changeType]} mt-1`}>
              {change}
            </p>
          )}
        </div>
        {icon && (
          <div className="w-12 h-12 text-gray-400">
            {icon}
          </div>
        )}
      </div>
    </AppleCard>
  );
};

const AppleList = ({ 
  children, 
  className = '',
  ...props 
}) => {
  return (
    <div className={`apple-list ${className}`} {...props}>
      {children}
    </div>
  );
};

const AppleListItem = ({ 
  children, 
  onClick,
  className = '',
  ...props 
}) => {
  return (
    <div 
      className={`apple-list-item ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
};

const AppleTabs = ({ 
  tabs, 
  activeTab, 
  onTabChange,
  className = '',
  ...props 
}) => {
  return (
    <div className={`apple-tabs ${className}`} {...props}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`apple-tab ${activeTab === tab.id ? 'active' : ''}`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

const AppleProgressBar = ({ 
  progress, 
  className = '',
  ...props 
}) => {
  return (
    <div className={`apple-progress ${className}`} {...props}>
      <div 
        className="apple-progress-bar"
        style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
      />
    </div>
  );
};

const AppleToast = ({ 
  message, 
  type = 'info',
  isVisible,
  onClose,
  className = '',
  ...props 
}) => {
  if (!isVisible) return null;

  const typeColors = {
    info: 'border-blue-200 bg-blue-50',
    success: 'border-green-200 bg-green-50',
    warning: 'border-yellow-200 bg-yellow-50',
    error: 'border-red-200 bg-red-50'
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      className={`apple-toast ${typeColors[type]} ${className}`}
      {...props}
    >
      <div className="flex items-center justify-between">
        <p className="apple-text-callout text-gray-900">{message}</p>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors ml-4"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </motion.div>
  );
};

// Export all components
export {
  AppleButton as default,
  AppleCard,
  AppleInput,
  AppleBadge,
  AppleModal,
  AppleLoadingSpinner,
  AppleEmptyState,
  ApplePageHeader,
  AppleStatsCard,
  AppleList,
  AppleListItem,
  AppleTabs,
  AppleProgressBar,
  AppleToast
};
