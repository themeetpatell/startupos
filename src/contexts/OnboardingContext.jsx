import React, { createContext, useContext, useReducer, useCallback } from 'react';

// Initial onboarding state
const initialState = {
  currentStep: 0,
  isComplete: false,
  data: {
    // Step 1: Role Selection
    role: '',
    
    // Step 2: Profile Setup (role-specific)
    profile: {
      name: '',
      email: '',
      role: '',
      // Founder-specific
      companyName: '',
      industry: '',
      // Investor-specific
      organization: '',
      investmentFocus: '',
      // Builder-specific
      primaryTech: '',
      experience: '',
      // Common
      goals: []
    }
  },
  
  // UI State
  ui: {
    isLoading: false,
    errors: {},
    validation: {}
  }
};

// Action types
const ActionTypes = {
  SET_CURRENT_STEP: 'SET_CURRENT_STEP',
  NEXT_STEP: 'NEXT_STEP',
  PREV_STEP: 'PREV_STEP',
  UPDATE_DATA: 'UPDATE_DATA',
  SET_ERRORS: 'SET_ERRORS',
  CLEAR_ERRORS: 'CLEAR_ERRORS',
  SET_LOADING: 'SET_LOADING',
  COMPLETE_ONBOARDING: 'COMPLETE_ONBOARDING',
  RESET_ONBOARDING: 'RESET_ONBOARDING'
};

// Reducer
const onboardingReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.SET_CURRENT_STEP:
      return {
        ...state,
        currentStep: action.payload
      };
      
    case ActionTypes.NEXT_STEP:
      return {
        ...state,
        currentStep: Math.min(state.currentStep + 1, 4)
      };
      
    case ActionTypes.PREV_STEP:
      return {
        ...state,
        currentStep: Math.max(state.currentStep - 1, 0)
      };
      
    case ActionTypes.UPDATE_DATA:
      if (action.payload.section === 'role') {
        return {
          ...state,
          data: {
            ...state.data,
            role: action.payload.data
          }
        };
      }
      
      return {
        ...state,
        data: {
          ...state.data,
          [action.payload.section]: {
            ...state.data[action.payload.section],
            ...action.payload.data
          }
        }
      };
      
    case ActionTypes.SET_ERRORS:
      return {
        ...state,
        ui: {
          ...state.ui,
          errors: action.payload
        }
      };
      
    case ActionTypes.CLEAR_ERRORS:
      return {
        ...state,
        ui: {
          ...state.ui,
          errors: {}
        }
      };
      
    case ActionTypes.SET_LOADING:
      return {
        ...state,
        ui: {
          ...state.ui,
          isLoading: action.payload
        }
      };
      
    case ActionTypes.COMPLETE_ONBOARDING:
      return {
        ...state,
        isComplete: true,
        currentStep: 5
      };
      
    case ActionTypes.RESET_ONBOARDING:
      return initialState;
      
    default:
      return state;
  }
};

// Context
const OnboardingContext = createContext();

// Provider
export const OnboardingProvider = ({ children }) => {
  const [state, dispatch] = useReducer(onboardingReducer, initialState);

  // Action creators
  const actions = {
    setCurrentStep: useCallback((step) => {
      dispatch({ type: ActionTypes.SET_CURRENT_STEP, payload: step });
    }, []),
    
    nextStep: useCallback(() => {
      dispatch({ type: ActionTypes.NEXT_STEP });
    }, []),
    
    prevStep: useCallback(() => {
      dispatch({ type: ActionTypes.PREV_STEP });
    }, []),
    
    updateData: useCallback((section, data) => {
      dispatch({ type: ActionTypes.UPDATE_DATA, payload: { section, data } });
    }, []),
    
    setErrors: useCallback((errors) => {
      dispatch({ type: ActionTypes.SET_ERRORS, payload: errors });
    }, []),
    
    clearErrors: useCallback(() => {
      dispatch({ type: ActionTypes.CLEAR_ERRORS });
    }, []),
    
    setLoading: useCallback((loading) => {
      dispatch({ type: ActionTypes.SET_LOADING, payload: loading });
    }, []),
    
    completeOnboarding: useCallback(() => {
      dispatch({ type: ActionTypes.COMPLETE_ONBOARDING });
    }, []),
    
    resetOnboarding: useCallback(() => {
      dispatch({ type: ActionTypes.RESET_ONBOARDING });
    }, [])
  };

  return (
    <OnboardingContext.Provider value={{ state, actions }}>
      {children}
    </OnboardingContext.Provider>
  );
};

// Hook to use the context
export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
};

// Validation functions
export const validateStep = (step, data) => {
  const errors = {};
  
  switch (step) {
    case 0: // Step 1: Identify
      if (!data.role) errors.role = 'Please select a role';
      if (!data.profile?.stage) errors.stage = 'Please select your current stage';
      if (!data.profile?.country) errors.country = 'Please select your country';
      break;
      
    case 1: // Step 2: Craft - Role-specific validation
      if (data.role === 'founder') {
        if (!data.profile?.startupName) errors.startupName = 'Startup name is required';
        if (!data.profile?.industry) errors.industry = 'Industry is required';
        if (!data.profile?.startupDescription) errors.startupDescription = 'Startup description is required';
      } else if (data.role === 'investor') {
        if (!data.profile?.investorType) errors.investorType = 'Investor type is required';
        if (!data.profile?.investmentIndustries || data.profile.investmentIndustries.length === 0) {
          errors.investmentIndustries = 'Please select at least one industry of interest';
        }
        if (!data.profile?.engagementIntent || data.profile.engagementIntent.length === 0) {
          errors.engagementIntent = 'Please select at least one engagement intent';
        }
      } else if (data.role === 'builder') {
        if (!data.profile?.domain) errors.domain = 'Domain is required';
        if (!data.profile?.experienceLevel) errors.experienceLevel = 'Experience level is required';
        if (!data.profile?.availability) errors.availability = 'Availability is required';
        if (!data.profile?.skills || data.profile.skills.length === 0) {
          errors.skills = 'Please select at least one skill';
        }
        if (!data.profile?.builderEngagementIntent || data.profile.builderEngagementIntent.length === 0) {
          errors.builderEngagementIntent = 'Please select at least one engagement intent';
        }
      }
      break;
      
    case 2: // Step 3: Activate - No additional validation needed
      break;
  }
  
  return errors;
};

export default OnboardingContext;
