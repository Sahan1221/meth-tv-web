import React, { createContext, useContext, useState, useEffect } from 'react';
import { AdminUser } from '../types';

interface AuthContextType {
  user: AdminUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, pass: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'methtv_admin_session_v1';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check existing session
    try {
      const stored = sessionStorage.getItem(AUTH_STORAGE_KEY);
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch {
      sessionStorage.removeItem(AUTH_STORAGE_KEY);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, pass: string): Promise<{ success: boolean; message?: string }> => {
    // Trim and normalize
    const cleanEmail = email.trim().toLowerCase();
    const cleanPass = pass.trim();

    // Verification for Prototype Mode
    // Production note: When Firebase is connected, this delegates to signInWithEmailAndPassword
    if (cleanEmail === 'admin@methtv.lk' && cleanPass === 'methadmin2026#') {
      const adminUser: AdminUser = {
        id: 'usr-admin-01',
        name: 'ප්‍රධාන පරිපාලක (Super Admin)',
        email: cleanEmail,
        role: 'super_admin',
      };
      setUser(adminUser);
      sessionStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(adminUser));
      return { success: true };
    }

    if (cleanEmail === 'editor@methtv.lk' && cleanPass === 'metheditor2026#') {
      const editorUser: AdminUser = {
        id: 'usr-editor-01',
        name: 'සංස්කාරක (Content Editor)',
        email: cleanEmail,
        role: 'editor',
      };
      setUser(editorUser);
      sessionStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(editorUser));
      return { success: true };
    }

    return { 
      success: false, 
      message: 'විද්‍යුත් තැපෑල හෝ මුරපදය වැරදිය. කරුණාකර නැවත උත්සාහ කරන්න.' 
    };
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem(AUTH_STORAGE_KEY);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: Boolean(user), isLoading, login, logout }}>
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
