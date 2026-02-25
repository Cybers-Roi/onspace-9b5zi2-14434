import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthState {
  isAuthenticated: boolean;
  hasOnboarded: boolean;
  hasSplashed: boolean;
  user: UserData | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  registerOrg: (data: OrgRegisterData) => Promise<boolean>;
  logout: () => void;
  completeSplash: () => void;
  completeOnboarding: () => void;
}

interface UserData {
  id: string;
  name: string;
  email: string;
  handle: string;
  playerNumber: string;
  role: 'participant' | 'organizer';
}

interface RegisterData {
  fullName: string;
  email: string;
  password: string;
  handle: string;
  wilaya: string;
  isStudent: boolean;
  university?: string;
  skills: string[];
}

interface OrgRegisterData {
  orgName: string;
  orgType: string;
  email: string;
  regNumber: string;
  description: string;
}

const AuthContext = createContext<AuthState>({
  isAuthenticated: false,
  hasOnboarded: false,
  hasSplashed: false,
  user: null,
  login: async () => false,
  register: async () => false,
  registerOrg: async () => false,
  logout: () => {},
  completeSplash: () => {},
  completeOnboarding: () => {},
});

const MOCK_USER: UserData = {
  id: '4821',
  name: 'AHMED BENALI',
  email: 'test@example.com',
  handle: '@ahmed_dev',
  playerNumber: '#4821',
  role: 'participant',
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasOnboarded, setHasOnboarded] = useState(false);
  const [hasSplashed, setHasSplashed] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadAuth = async () => {
      try {
        const [authData, onboardData, splashData] = await Promise.all([
          AsyncStorage.getItem('auth_user'),
          AsyncStorage.getItem('has_onboarded'),
          AsyncStorage.getItem('has_splashed'),
        ]);
        if (authData) {
          setUser(JSON.parse(authData));
          setIsAuthenticated(true);
        }
        if (onboardData === 'true') setHasOnboarded(true);
        if (splashData === 'true') setHasSplashed(true);
      } catch (e) {
        // silent
      } finally {
        setIsLoading(false);
      }
    };
    loadAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock login: accept test@example.com / 123456 or any non-empty credentials
    if (!email || !password) return false;
    if (password.length < 4) return false;
    const userData = { ...MOCK_USER, email };
    setUser(userData);
    setIsAuthenticated(true);
    await AsyncStorage.setItem('auth_user', JSON.stringify(userData));
    return true;
  };

  const register = async (data: RegisterData): Promise<boolean> => {
    if (!data.fullName || !data.email || !data.password) return false;
    const playerNum = `#${Math.floor(1000 + Math.random() * 9000)}`;
    const userData: UserData = {
      id: playerNum.replace('#', ''),
      name: data.fullName.toUpperCase(),
      email: data.email,
      handle: data.handle || `@${data.fullName.toLowerCase().replace(/\s/g, '_')}`,
      playerNumber: playerNum,
      role: 'participant',
    };
    setUser(userData);
    setIsAuthenticated(true);
    await AsyncStorage.setItem('auth_user', JSON.stringify(userData));
    return true;
  };

  const registerOrg = async (data: OrgRegisterData): Promise<boolean> => {
    if (!data.orgName || !data.email) return false;
    const userData: UserData = {
      id: 'ORG-001',
      name: data.orgName.toUpperCase(),
      email: data.email,
      handle: `@${data.orgName.toLowerCase().replace(/\s/g, '_')}`,
      playerNumber: '#ORG',
      role: 'organizer',
    };
    setUser(userData);
    setIsAuthenticated(true);
    await AsyncStorage.setItem('auth_user', JSON.stringify(userData));
    return true;
  };

  const logout = async () => {
    setUser(null);
    setIsAuthenticated(false);
    setHasOnboarded(false);
    setHasSplashed(false);
    await AsyncStorage.multiRemove(['auth_user', 'has_onboarded', 'has_splashed']);
  };

  const completeSplash = async () => {
    setHasSplashed(true);
    await AsyncStorage.setItem('has_splashed', 'true');
  };

  const completeOnboarding = async () => {
    setHasOnboarded(true);
    await AsyncStorage.setItem('has_onboarded', 'true');
  };

  if (isLoading) return null;

  return (
    <AuthContext.Provider value={{
      isAuthenticated, hasOnboarded, hasSplashed, user,
      login, register, registerOrg, logout, completeSplash, completeOnboarding,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
