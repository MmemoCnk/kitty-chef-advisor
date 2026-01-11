import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, CatProfile, SearchHistoryItem } from '@/types/cat';

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  register: (email: string, username: string, password: string) => boolean;
  updateCats: (cats: CatProfile[]) => void;
  addCat: (cat: CatProfile) => void;
  updateCat: (cat: CatProfile) => void;
  removeCat: (catId: string) => void;
  searchHistory: SearchHistoryItem[];
  addToHistory: (item: Omit<SearchHistoryItem, 'id' | 'timestamp'>) => void;
  clearHistory: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user storage
const mockUsers: { email: string; username: string; password: string; cats: CatProfile[] }[] = [];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [searchHistory, setSearchHistory] = useState<SearchHistoryItem[]>([]);

  const login = (username: string, password: string): boolean => {
    const foundUser = mockUsers.find(
      (u) => u.username === username && u.password === password
    );
    if (foundUser) {
      setUser({
        id: username,
        email: foundUser.email,
        username: foundUser.username,
        cats: foundUser.cats,
      });
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setSearchHistory([]);
  };

  const register = (email: string, username: string, password: string): boolean => {
    const exists = mockUsers.some((u) => u.username === username || u.email === email);
    if (exists) return false;

    mockUsers.push({ email, username, password, cats: [] });
    setUser({
      id: username,
      email,
      username,
      cats: [],
    });
    return true;
  };

  const updateCats = (cats: CatProfile[]) => {
    if (user) {
      setUser({ ...user, cats });
      const userIndex = mockUsers.findIndex((u) => u.username === user.username);
      if (userIndex !== -1) {
        mockUsers[userIndex].cats = cats;
      }
    }
  };

  const addCat = (cat: CatProfile) => {
    if (user) {
      const newCats = [...user.cats, cat];
      updateCats(newCats);
    }
  };

  const updateCat = (cat: CatProfile) => {
    if (user) {
      const newCats = user.cats.map((c) => (c.id === cat.id ? cat : c));
      updateCats(newCats);
    }
  };

  const removeCat = (catId: string) => {
    if (user) {
      const newCats = user.cats.filter((c) => c.id !== catId);
      updateCats(newCats);
    }
  };

  const addToHistory = (item: Omit<SearchHistoryItem, 'id' | 'timestamp'>) => {
    const newItem: SearchHistoryItem = {
      ...item,
      id: Math.random().toString(36).substring(2, 11),
      timestamp: new Date(),
    };
    setSearchHistory((prev) => [newItem, ...prev].slice(0, 50)); // Keep last 50
  };

  const clearHistory = () => {
    setSearchHistory([]);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        login,
        logout,
        register,
        updateCats,
        addCat,
        updateCat,
        removeCat,
        searchHistory,
        addToHistory,
        clearHistory,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
