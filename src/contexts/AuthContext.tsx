import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/lib/types';
import { mockDb } from '@/lib/mockDatabase';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (data: { email: string; password: string; name: string }) => Promise<boolean>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const session = localStorage.getItem('agri-session');
    if (session) {
      try {
        const userData = JSON.parse(session);
        setUser(userData);
      } catch (e) {
        localStorage.removeItem('agri-session');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const foundUser = mockDb.getUser(email);
    if (foundUser) {
      // In a real app, verify password hash
      setUser(foundUser);
      localStorage.setItem('agri-session', JSON.stringify(foundUser));
      return true;
    }
    return false;
  };

  const signup = async (data: { email: string; password: string; name: string }): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Check if user exists
    if (mockDb.getUser(data.email)) {
      return false;
    }
    
    const newUser: User = {
      id: `user_${Date.now()}`,
      email: data.email,
      name: data.name,
      language: 'en',
      subscription: 'free',
      createdAt: new Date().toISOString(),
    };
    
    mockDb.addUser(newUser);
    setUser(newUser);
    localStorage.setItem('agri-session', JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('agri-session');
  };

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('agri-session', JSON.stringify(updatedUser));
      mockDb.updateUser(updatedUser);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
