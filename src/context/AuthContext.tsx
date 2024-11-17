import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  id: string;
  email: string;
  username: string;
  invitationCode: string;
  invitesRemaining: number;
  affiliateId?: string;
  level1Affiliates: string[];
  level2Affiliates: string[];
  level3Affiliates: string[];
  level4Affiliates: string[];
  level5Affiliates: string[];
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
  signupWithAffiliate: (email: string, password: string, affiliateCode: string) => boolean;
}

const DEMO_USER: User = {
  id: '1',
  email: 'demo@example.com',
  username: 'Demo User',
  invitationCode: 'DEMO123',
  invitesRemaining: 100,
  level1Affiliates: [],
  level2Affiliates: [],
  level3Affiliates: [],
  level4Affiliates: [],
  level5Affiliates: [],
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const navigate = useNavigate();

  const [users, setUsers] = useState<User[]>(() => {
    const savedUsers = localStorage.getItem('users');
    return savedUsers ? JSON.parse(savedUsers) : [DEMO_USER];
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  const login = (email: string, password: string) => {
    // Demo login credentials
    if (email === 'demo@example.com' && password === 'demo123') {
      setUser(DEMO_USER);
      navigate('/');
      return;
    }

    // Regular user login
    const foundUser = users.find(u => u.email === email);
    if (foundUser) {
      setUser(foundUser);
      navigate('/');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/');
  };

  const signupWithAffiliate = (email: string, password: string, affiliateCode: string): boolean => {
    // Check if user already exists
    if (users.some(u => u.email === email)) {
      return false;
    }

    // Find affiliate
    const affiliate = users.find(u => u.invitationCode === affiliateCode);
    if (!affiliate || affiliate.invitesRemaining <= 0) {
      return false;
    }

    // Create new user
    const newUser: User = {
      id: Date.now().toString(),
      email,
      username: email.split('@')[0],
      invitationCode: 'INV' + Math.random().toString(36).substring(2, 8).toUpperCase(),
      invitesRemaining: 100,
      affiliateId: affiliate.id,
      level1Affiliates: [],
      level2Affiliates: [],
      level3Affiliates: [],
      level4Affiliates: [],
      level5Affiliates: [],
    };

    // Update affiliate's remaining invites and add new user to their level 1
    const updatedUsers = users.map(u => {
      if (u.id === affiliate.id) {
        return {
          ...u,
          invitesRemaining: u.invitesRemaining - 1,
          level1Affiliates: [...u.level1Affiliates, newUser.id]
        };
      }
      return u;
    });

    // Add new user to the users list
    setUsers([...updatedUsers, newUser]);
    
    // Log in the new user
    setUser(newUser);
    navigate('/');
    return true;
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      isAuthenticated: !!user,
      signupWithAffiliate 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};