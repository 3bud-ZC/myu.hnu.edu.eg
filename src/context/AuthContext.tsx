import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthUser } from '../types/student';
import { DEMO_STUDENT } from '../data/student';

interface AuthContextType {
  user: AuthUser | null;
  login: (username: string, pass: string, remember: boolean) => { success: boolean; error?: string };
  logout: () => void;
  updatePasswordDemo: (oldPass: string, newPass: string) => { success: boolean; message: string };
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'hnu_demo_auth_session';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(() => {
    try {
      const saved = localStorage.getItem(AUTH_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore
    }
    return null;
  });

  const login = (username: string, pass: string, remember: boolean) => {
    // Demo validation
    if (username.trim() === '942250190' && pass === '942250190') {
      const authUser: AuthUser = {
        studentId: DEMO_STUDENT.id,
        username: DEMO_STUDENT.username,
        fullNameArabic: DEMO_STUDENT.fullNameArabic,
        isAuthenticated: true,
      };
      setUser(authUser);
      try {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authUser));
      } catch {
        // ignore
      }
      return { success: true };
    }
    return {
      success: false,
      error: 'Invalid credentials. Use demo username: 942250190 and password: 942250190',
    };
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  const updatePasswordDemo = (oldPass: string, newPass: string) => {
    if (oldPass !== '942250190') {
      return { success: false, message: 'Current password does not match demo password (942250190).' };
    }
    if (newPass.length < 6) {
      return { success: false, message: 'New password must be at least 6 characters.' };
    }
    return { success: true, message: 'Demo password updated successfully (session-local only).' };
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updatePasswordDemo }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
