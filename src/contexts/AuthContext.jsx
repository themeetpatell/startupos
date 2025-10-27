import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const savedUser = localStorage.getItem('startupos_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    if (email && password) {
      const userData = {
        id: '1',
        email,
        name: 'John Doe',
        role: 'founder',
        company: 'StartupOS Demo',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
      };
      setUser(userData);
      localStorage.setItem('startupos_user', JSON.stringify(userData));
      return userData;
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const signup = async (userData) => {
    if (userData.email && userData.password) {
      const newUser = {
        id: '1',
        email: userData.email,
        name: `${userData.firstName} ${userData.lastName}`,
        role: userData.role,
        company: userData.companyName || 'My Startup',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
      };
      setUser(newUser);
      localStorage.setItem('startupos_user', JSON.stringify(newUser));
      return newUser;
    } else {
      throw new Error('Invalid user data');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('startupos_user');
  };

  const value = {
    user,
    login,
    signup,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 