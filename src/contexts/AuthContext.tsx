import React, { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'job_seeker' | 'employer' | 'recruiter' | 'agency';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  company?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, name: string, role: UserRole, company?: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock login - in production, this would call an API
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Mock user based on email pattern
    const role: UserRole = email.includes('employer') ? 'employer' : 
                           email.includes('recruiter') ? 'recruiter' :
                           email.includes('agency') ? 'agency' : 'job_seeker';
    
    setUser({
      id: '1',
      email,
      name: email.split('@')[0],
      role,
      company: role === 'employer' ? 'TechCorp Inc.' : undefined,
    });
    return true;
  };

  const signup = async (email: string, password: string, name: string, role: UserRole, company?: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    setUser({
      id: Date.now().toString(),
      email,
      name,
      role,
      company,
    });
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
