import React, { createContext, useContext, useReducer, useCallback } from 'react';

// Initial state
const initialState = {
  // UI State
  ui: {
    sidebarOpen: false,
    theme: 'light',
    notifications: [],
    modals: [],
    loading: false,
    error: null
  },
  
  // User State
  user: {
    profile: null,
    preferences: {},
    onboardingComplete: false,
    lastActive: null
  },
  
  // App Data
  data: {
    aiEmployees: [],
    myEmployees: [],
    tasks: [],
    conversations: [],
    notifications: [],
    searchHistory: []
  },
  
  // Performance
  performance: {
    renderTime: 0,
    memoryUsage: 0,
    isSlowConnection: false
  },
  
  // Navigation
  navigation: {
    currentView: 'dashboard',
    history: ['dashboard'],
    breadcrumbs: []
  }
};

// Action types
const ActionTypes = {
  // UI Actions
  SET_SIDEBAR_OPEN: 'SET_SIDEBAR_OPEN',
  SET_THEME: 'SET_THEME',
  ADD_NOTIFICATION: 'ADD_NOTIFICATION',
  REMOVE_NOTIFICATION: 'REMOVE_NOTIFICATION',
  OPEN_MODAL: 'OPEN_MODAL',
  CLOSE_MODAL: 'CLOSE_MODAL',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR',
  
  // User Actions
  SET_USER_PROFILE: 'SET_USER_PROFILE',
  UPDATE_USER_PREFERENCES: 'UPDATE_USER_PREFERENCES',
  SET_ONBOARDING_COMPLETE: 'SET_ONBOARDING_COMPLETE',
  UPDATE_LAST_ACTIVE: 'UPDATE_LAST_ACTIVE',
  
  // Data Actions
  SET_AI_EMPLOYEES: 'SET_AI_EMPLOYEES',
  ADD_AI_EMPLOYEE: 'ADD_AI_EMPLOYEE',
  UPDATE_AI_EMPLOYEE: 'UPDATE_AI_EMPLOYEE',
  REMOVE_AI_EMPLOYEE: 'REMOVE_AI_EMPLOYEE',
  SET_MY_EMPLOYEES: 'SET_MY_EMPLOYEES',
  HIRE_AI_EMPLOYEE: 'HIRE_AI_EMPLOYEE',
  FIRE_AI_EMPLOYEE: 'FIRE_AI_EMPLOYEE',
  ADD_TASK: 'ADD_TASK',
  UPDATE_TASK: 'UPDATE_TASK',
  COMPLETE_TASK: 'COMPLETE_TASK',
  ADD_CONVERSATION: 'ADD_CONVERSATION',
  UPDATE_CONVERSATION: 'UPDATE_CONVERSATION',
  ADD_SEARCH_HISTORY: 'ADD_SEARCH_HISTORY',
  CLEAR_SEARCH_HISTORY: 'CLEAR_SEARCH_HISTORY',
  
  // Performance Actions
  UPDATE_PERFORMANCE_METRICS: 'UPDATE_PERFORMANCE_METRICS',
  
  // Navigation Actions
  SET_CURRENT_VIEW: 'SET_CURRENT_VIEW',
  NAVIGATE_TO: 'NAVIGATE_TO',
  GO_BACK: 'GO_BACK',
  UPDATE_BREADCRUMBS: 'UPDATE_BREADCRUMBS'
};

// Reducer
const appReducer = (state, action) => {
  switch (action.type) {
    // UI Actions
    case ActionTypes.SET_SIDEBAR_OPEN:
      return {
        ...state,
        ui: { ...state.ui, sidebarOpen: action.payload }
      };
      
    case ActionTypes.SET_THEME:
      return {
        ...state,
        ui: { ...state.ui, theme: action.payload }
      };
      
    case ActionTypes.ADD_NOTIFICATION:
      return {
        ...state,
        ui: {
          ...state.ui,
          notifications: [...state.ui.notifications, {
            id: Date.now(),
            ...action.payload
          }]
        }
      };
      
    case ActionTypes.REMOVE_NOTIFICATION:
      return {
        ...state,
        ui: {
          ...state.ui,
          notifications: state.ui.notifications.filter(n => n.id !== action.payload)
        }
      };
      
    case ActionTypes.OPEN_MODAL:
      return {
        ...state,
        ui: {
          ...state.ui,
          modals: [...state.ui.modals, action.payload]
        }
      };
      
    case ActionTypes.CLOSE_MODAL:
      return {
        ...state,
        ui: {
          ...state.ui,
          modals: state.ui.modals.filter(m => m.id !== action.payload)
        }
      };
      
    case ActionTypes.SET_LOADING:
      return {
        ...state,
        ui: { ...state.ui, loading: action.payload }
      };
      
    case ActionTypes.SET_ERROR:
      return {
        ...state,
        ui: { ...state.ui, error: action.payload }
      };
      
    case ActionTypes.CLEAR_ERROR:
      return {
        ...state,
        ui: { ...state.ui, error: null }
      };
      
    // User Actions
    case ActionTypes.SET_USER_PROFILE:
      return {
        ...state,
        user: { ...state.user, profile: action.payload }
      };
      
    case ActionTypes.UPDATE_USER_PREFERENCES:
      return {
        ...state,
        user: {
          ...state.user,
          preferences: { ...state.user.preferences, ...action.payload }
        }
      };
      
    case ActionTypes.SET_ONBOARDING_COMPLETE:
      return {
        ...state,
        user: { ...state.user, onboardingComplete: action.payload }
      };
      
    case ActionTypes.UPDATE_LAST_ACTIVE:
      return {
        ...state,
        user: { ...state.user, lastActive: action.payload }
      };
      
    // Data Actions
    case ActionTypes.SET_AI_EMPLOYEES:
      return {
        ...state,
        data: { ...state.data, aiEmployees: action.payload }
      };
      
    case ActionTypes.ADD_AI_EMPLOYEE:
      return {
        ...state,
        data: {
          ...state.data,
          aiEmployees: [...state.data.aiEmployees, action.payload]
        }
      };
      
    case ActionTypes.UPDATE_AI_EMPLOYEE:
      return {
        ...state,
        data: {
          ...state.data,
          aiEmployees: state.data.aiEmployees.map(emp =>
            emp.id === action.payload.id ? { ...emp, ...action.payload.updates } : emp
          )
        }
      };
      
    case ActionTypes.REMOVE_AI_EMPLOYEE:
      return {
        ...state,
        data: {
          ...state.data,
          aiEmployees: state.data.aiEmployees.filter(emp => emp.id !== action.payload)
        }
      };
      
    case ActionTypes.SET_MY_EMPLOYEES:
      return {
        ...state,
        data: { ...state.data, myEmployees: action.payload }
      };
      
    case ActionTypes.HIRE_AI_EMPLOYEE:
      const employeeToHire = state.data.aiEmployees.find(emp => emp.id === action.payload);
      if (employeeToHire) {
        return {
          ...state,
          data: {
            ...state.data,
            myEmployees: [...state.data.myEmployees, { ...employeeToHire, hiredAt: Date.now() }]
          }
        };
      }
      return state;
      
    case ActionTypes.FIRE_AI_EMPLOYEE:
      return {
        ...state,
        data: {
          ...state.data,
          myEmployees: state.data.myEmployees.filter(emp => emp.id !== action.payload)
        }
      };
      
    case ActionTypes.ADD_TASK:
      return {
        ...state,
        data: {
          ...state.data,
          tasks: [...state.data.tasks, { ...action.payload, id: Date.now() }]
        }
      };
      
    case ActionTypes.UPDATE_TASK:
      return {
        ...state,
        data: {
          ...state.data,
          tasks: state.data.tasks.map(task =>
            task.id === action.payload.id ? { ...task, ...action.payload.updates } : task
          )
        }
      };
      
    case ActionTypes.COMPLETE_TASK:
      return {
        ...state,
        data: {
          ...state.data,
          tasks: state.data.tasks.map(task =>
            task.id === action.payload ? { ...task, completed: true, completedAt: Date.now() } : task
          )
        }
      };
      
    case ActionTypes.ADD_CONVERSATION:
      return {
        ...state,
        data: {
          ...state.data,
          conversations: [...state.data.conversations, action.payload]
        }
      };
      
    case ActionTypes.UPDATE_CONVERSATION:
      return {
        ...state,
        data: {
          ...state.data,
          conversations: state.data.conversations.map(conv =>
            conv.id === action.payload.id ? { ...conv, ...action.payload.updates } : conv
          )
        }
      };
      
    case ActionTypes.ADD_SEARCH_HISTORY:
      return {
        ...state,
        data: {
          ...state.data,
          searchHistory: [action.payload, ...state.data.searchHistory.slice(0, 9)]
        }
      };
      
    case ActionTypes.CLEAR_SEARCH_HISTORY:
      return {
        ...state,
        data: { ...state.data, searchHistory: [] }
      };
      
    // Performance Actions
    case ActionTypes.UPDATE_PERFORMANCE_METRICS:
      return {
        ...state,
        performance: { ...state.performance, ...action.payload }
      };
      
    // Navigation Actions
    case ActionTypes.SET_CURRENT_VIEW:
      return {
        ...state,
        navigation: { ...state.navigation, currentView: action.payload }
      };
      
    case ActionTypes.NAVIGATE_TO:
      const newHistory = [...state.navigation.history, action.payload];
      return {
        ...state,
        navigation: {
          ...state.navigation,
          currentView: action.payload,
          history: newHistory
        }
      };
      
    case ActionTypes.GO_BACK:
      const history = state.navigation.history;
      if (history.length > 1) {
        const newHistory = history.slice(0, -1);
        return {
          ...state,
          navigation: {
            ...state.navigation,
            currentView: newHistory[newHistory.length - 1],
            history: newHistory
          }
        };
      }
      return state;
      
    case ActionTypes.UPDATE_BREADCRUMBS:
      return {
        ...state,
        navigation: { ...state.navigation, breadcrumbs: action.payload }
      };
      
    default:
      return state;
  }
};

// Context
const AppStateContext = createContext();

// Provider
export const AppStateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Action creators
  const actions = {
    // UI Actions
    setSidebarOpen: useCallback((open) => {
      dispatch({ type: ActionTypes.SET_SIDEBAR_OPEN, payload: open });
    }, []),
    
    setTheme: useCallback((theme) => {
      dispatch({ type: ActionTypes.SET_THEME, payload: theme });
    }, []),
    
    addNotification: useCallback((notification) => {
      dispatch({ type: ActionTypes.ADD_NOTIFICATION, payload: notification });
    }, []),
    
    removeNotification: useCallback((id) => {
      dispatch({ type: ActionTypes.REMOVE_NOTIFICATION, payload: id });
    }, []),
    
    openModal: useCallback((modal) => {
      dispatch({ type: ActionTypes.OPEN_MODAL, payload: modal });
    }, []),
    
    closeModal: useCallback((id) => {
      dispatch({ type: ActionTypes.CLOSE_MODAL, payload: id });
    }, []),
    
    setLoading: useCallback((loading) => {
      dispatch({ type: ActionTypes.SET_LOADING, payload: loading });
    }, []),
    
    setError: useCallback((error) => {
      dispatch({ type: ActionTypes.SET_ERROR, payload: error });
    }, []),
    
    clearError: useCallback(() => {
      dispatch({ type: ActionTypes.CLEAR_ERROR });
    }, []),
    
    // User Actions
    setUserProfile: useCallback((profile) => {
      dispatch({ type: ActionTypes.SET_USER_PROFILE, payload: profile });
    }, []),
    
    updateUserPreferences: useCallback((preferences) => {
      dispatch({ type: ActionTypes.UPDATE_USER_PREFERENCES, payload: preferences });
    }, []),
    
    setOnboardingComplete: useCallback((complete) => {
      dispatch({ type: ActionTypes.SET_ONBOARDING_COMPLETE, payload: complete });
    }, []),
    
    updateLastActive: useCallback(() => {
      dispatch({ type: ActionTypes.UPDATE_LAST_ACTIVE, payload: Date.now() });
    }, []),
    
    // Data Actions
    setAIEmployees: useCallback((employees) => {
      dispatch({ type: ActionTypes.SET_AI_EMPLOYEES, payload: employees });
    }, []),
    
    addAIEmployee: useCallback((employee) => {
      dispatch({ type: ActionTypes.ADD_AI_EMPLOYEE, payload: employee });
    }, []),
    
    updateAIEmployee: useCallback((id, updates) => {
      dispatch({ type: ActionTypes.UPDATE_AI_EMPLOYEE, payload: { id, updates } });
    }, []),
    
    removeAIEmployee: useCallback((id) => {
      dispatch({ type: ActionTypes.REMOVE_AI_EMPLOYEE, payload: id });
    }, []),
    
    setMyEmployees: useCallback((employees) => {
      dispatch({ type: ActionTypes.SET_MY_EMPLOYEES, payload: employees });
    }, []),
    
    hireAIEmployee: useCallback((id) => {
      dispatch({ type: ActionTypes.HIRE_AI_EMPLOYEE, payload: id });
    }, []),
    
    fireAIEmployee: useCallback((id) => {
      dispatch({ type: ActionTypes.FIRE_AI_EMPLOYEE, payload: id });
    }, []),
    
    addTask: useCallback((task) => {
      dispatch({ type: ActionTypes.ADD_TASK, payload: task });
    }, []),
    
    updateTask: useCallback((id, updates) => {
      dispatch({ type: ActionTypes.UPDATE_TASK, payload: { id, updates } });
    }, []),
    
    completeTask: useCallback((id) => {
      dispatch({ type: ActionTypes.COMPLETE_TASK, payload: id });
    }, []),
    
    addConversation: useCallback((conversation) => {
      dispatch({ type: ActionTypes.ADD_CONVERSATION, payload: conversation });
    }, []),
    
    updateConversation: useCallback((id, updates) => {
      dispatch({ type: ActionTypes.UPDATE_CONVERSATION, payload: { id, updates } });
    }, []),
    
    addSearchHistory: useCallback((query) => {
      dispatch({ type: ActionTypes.ADD_SEARCH_HISTORY, payload: query });
    }, []),
    
    clearSearchHistory: useCallback(() => {
      dispatch({ type: ActionTypes.CLEAR_SEARCH_HISTORY });
    }, []),
    
    // Performance Actions
    updatePerformanceMetrics: useCallback((metrics) => {
      dispatch({ type: ActionTypes.UPDATE_PERFORMANCE_METRICS, payload: metrics });
    }, []),
    
    // Navigation Actions
    setCurrentView: useCallback((view) => {
      dispatch({ type: ActionTypes.SET_CURRENT_VIEW, payload: view });
    }, []),
    
    navigateTo: useCallback((view) => {
      dispatch({ type: ActionTypes.NAVIGATE_TO, payload: view });
    }, []),
    
    goBack: useCallback(() => {
      dispatch({ type: ActionTypes.GO_BACK });
    }, []),
    
    updateBreadcrumbs: useCallback((breadcrumbs) => {
      dispatch({ type: ActionTypes.UPDATE_BREADCRUMBS, payload: breadcrumbs });
    }, [])
  };

  return (
    <AppStateContext.Provider value={{ state, actions }}>
      {children}
    </AppStateContext.Provider>
  );
};

// Hook to use the context
export const useAppState = () => {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error('useAppState must be used within an AppStateProvider');
  }
  return context;
};

// Selector hook for specific state slices
export const useAppSelector = (selector) => {
  const { state } = useAppState();
  return selector(state);
};

// Action hook
export const useAppActions = () => {
  const { actions } = useAppState();
  return actions;
};
