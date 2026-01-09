import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, CatProfile } from '@/types/cat';

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  register: (username: string, password: string, cats: CatProfile[]) => boolean;
  updateCats: (cats: CatProfile[]) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user storage
const mockUsers: { username: string; password: string; cats: CatProfile[] }[] = [];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (username: string, password: string): boolean => {
    const foundUser = mockUsers.find(
      (u) => u.username === username && u.password === password
    );
    if (foundUser) {
      setUser({
        id: username,
        username: foundUser.username,
        cats: foundUser.cats,
      });
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const register = (username: string, password: string, cats: CatProfile[]): boolean => {
    const exists = mockUsers.some((u) => u.username === username);
    if (exists) return false;

    mockUsers.push({ username, password, cats });
    setUser({
      id: username,
      username,
      cats,
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

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        login,
        logout,
        register,
        updateCats,
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
