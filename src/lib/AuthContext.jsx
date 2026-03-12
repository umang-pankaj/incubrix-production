import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

const AuthContext = createContext(null);

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const isAuthenticated = !!user;
  const isLoadingAuth = loading;

  // Check authentication status on mount and handle OAuth redirects
  useEffect(() => {
    // Check for OAuth success/failure in URL
    const urlParams = new URLSearchParams(window.location.search);
    const authStatus = urlParams.get('auth');

    if (authStatus === 'success') {
      // Clear the auth param from URL
      window.history.replaceState({}, document.title, window.location.pathname);
      toast.success("Logged in successfully", {
        description: "Welcome back to IncuBrix!",
      });
      checkAuth();
    } else if (authStatus === 'failed') {
      const errorMsg = urlParams.get('error');
      setError(errorMsg ? `Authentication failed: ${errorMsg}` : 'Authentication failed. Please try again.');
      window.history.replaceState({}, document.title, window.location.pathname);
      setLoading(false);
    } else {
      checkAuth();
    }
  }, []);

  // Check if user is authenticated
  const checkAuth = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/auth/me`, {
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (err) {
      console.error('Auth check failed:', err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Login with Google OAuth
  const loginWithGoogle = () => {
    window.location.href = `${BACKEND_URL}/auth/google`;
  };

  // Login with LinkedIn OAuth
  const loginWithLinkedIn = () => {
    window.location.href = `${BACKEND_URL}/auth/linkedin`;
  };

  // Sign up with email and password
  const signup = async (email, password, name) => {
    setError(null);
    try {
      const response = await fetch(`${BACKEND_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password, name }),
      });

      const data = await response.json();

      if (response.ok) {
        return {
          success: true,
          message: data.message,
          requireOtp: data.requireOtp,
          email: data.email
        };
      } else {
        setError(data.message);
        return { success: false, message: data.message };
      }
    } catch (err) {
      const message = 'Failed to create account. Please try again.';
      setError(message);
      return { success: false, message };
    }
  };

  // Verify OTP
  const verifyOtp = async (email, otp) => {
    setError(null);
    try {
      const response = await fetch(`${BACKEND_URL}/auth/verify-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();

      if (response.ok) {
        return { success: true, message: data.message };
      } else {
        return { success: false, message: data.message };
      }
    } catch (err) {
      return { success: false, message: 'Failed to verify OTP. Please try again.' };
    }
  };

  // Login with email and password
  const login = async (email, password) => {
    setError(null);
    try {
      const response = await fetch(`${BACKEND_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data.user);
        return { success: true };
      } else {
        // Check if verification is required
        if (data.requireVerification) {
          return { success: false, message: data.message, requireVerification: true };
        }
        setError(data.message);
        return { success: false, message: data.message };
      }
    } catch (err) {
      const message = 'Failed to login. Please try again.';
      setError(message);
      return { success: false, message };
    }
  };

  // Logout
  const logout = async () => {
    try {
      await fetch(`${BACKEND_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });
      setUser(null);
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };


  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);

  // --- Global Theme ---
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'dark';
    }
    return 'dark';
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
    if (theme === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
  }, [theme]);

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');

  const value = {
    user,
    isAuthenticated,
    isLoadingAuth,
    loading,
    error,
    loginWithGoogle,
    loginWithLinkedIn,
    signup,
    verifyOtp,
    login,
    logout,
    checkAuth,
    authModalOpen,
    setAuthModalOpen,
    isAccountDropdownOpen,
    setIsAccountDropdownOpen,
    theme,
    setTheme,
    toggleTheme,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
