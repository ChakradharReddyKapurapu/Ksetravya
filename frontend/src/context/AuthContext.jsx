import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiClient, getAuthToken, setAuthToken, getStoredUser, setStoredUser } from '../api/apiClient';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getStoredUser());
  const [token, setTokenState] = useState(getAuthToken());
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'
  const [authError, setAuthError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // If token exists but user is null, try to load user profile
    if (token && !user) {
      apiClient
        .get('/users/profile')
        .then((userData) => {
          setUser(userData);
          setStoredUser(userData);
        })
        .catch(() => {
          logout();
        });
    }
  }, [token]);

  const login = async (email, password) => {
    setLoading(true);
    setAuthError(null);
    try {
      const response = await apiClient.post('/auth/login', { email, password });
      const authData = response.data || response;
      const tokenVal = authData.token || response.token;
      const u = authData.user || response.user || authData;

      const userObj = {
        id: u.id,
        name: u.fullName || `${u.firstName || ''} ${u.lastName || ''}`.trim() || u.email,
        email: u.email,
        role: u.role || 'FARMER',
        phoneNumber: u.phone,
      };

      setAuthToken(tokenVal);
      setTokenState(tokenVal);
      setUser(userObj);
      setStoredUser(userObj);

      setIsAuthModalOpen(false);
      setLoading(false);
      return { success: true, user: userObj };
    } catch (err) {
      setLoading(false);
      const msg = err.message || 'Login failed. Please check your credentials.';
      setAuthError(msg);
      return { success: false, error: msg };
    }
  };

  const register = async (userData) => {
    setLoading(true);
    setAuthError(null);
    try {
      const names = (userData.name || '').trim().split(' ');
      const firstName = names[0] || 'Agri';
      const lastName = names.slice(1).join(' ') || 'User';

      const payload = {
        firstName,
        lastName,
        email: userData.email,
        password: userData.password,
        phone: userData.phoneNumber || userData.phone,
        role: userData.role || 'FARMER',
      };

      await apiClient.post('/auth/register', payload);

      // Auto login after successful registration
      return await login(userData.email, userData.password);
    } catch (err) {
      setLoading(false);
      const msg = err.message || 'Registration failed. Please try again.';
      setAuthError(msg);
      return { success: false, error: msg };
    }
  };

  const logout = () => {
    setAuthToken(null);
    setStoredUser(null);
    setTokenState(null);
    setUser(null);
  };

  const openAuthModal = (mode = 'login') => {
    setAuthMode(mode);
    setAuthError(null);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
    setAuthError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token && !!user,
        role: user?.role || 'FARMER',
        isAuthModalOpen,
        authMode,
        authError,
        loading,
        login,
        register,
        logout,
        openAuthModal,
        closeAuthModal,
        setAuthMode,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
