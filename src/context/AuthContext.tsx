import React, { createContext, useState, ReactNode, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

type User = {
  role: 'student' | 'instructor' | 'admin';
  username: string; 
  id: string;
  name: string;
  // add other properties as needed
};

type AuthContextType = {
  user: User | null;
  login: (role: 'student' | 'instructor' | 'admin', username: string, id: string, name: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const login = (role: 'student' | 'instructor' | 'admin', username: string, id: string, name: string) => { 
    const user = { role, username, id, name };
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };
  
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
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

export function withAuth<P extends object>(Component: React.ComponentType<P>): React.FC<P> {
  return function WrappedComponent(props) {
    const { user } = useAuth();
    const navigate = useNavigate();

    if (!user) {
      navigate('/login');
      return null;
    }

    return <Component {...props as P} />;
  };
}