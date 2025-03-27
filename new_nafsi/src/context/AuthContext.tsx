import React, { useEffect, useState, createContext, useContext } from 'react';
type UserType = 'doctor' | 'patient' | null;
interface User {
  id: string;
  name: string;
  email: string;
  userType: UserType;
}
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  userType: UserType;
  login: (email: string, password: string, userType: UserType) => Promise<void>;
  register: (name: string, email: string, password: string, userType: UserType) => Promise<void>;
  logout: () => void;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const AuthProvider: React.FC<{
  children: React.ReactNode;
}> = ({
  children
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    // Check if user is already logged in
    const storedUser = localStorage.getItem('nafsi_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);
  const login = async (email: string, password: string, userType: UserType): Promise<void> => {
    // Simulate API call
    try {
      // In a real app, this would be an API call
      // For demo purposes, we'll simulate successful login
      // Simulate fetching user data
      const mockUsers = {
        'doctor@example.com': {
          id: 'd1',
          name: 'Dr. Sarah Johnson',
          email: 'doctor@example.com',
          userType: 'doctor' as UserType
        },
        'patient@example.com': {
          id: 'p1',
          name: 'Alex Smith',
          email: 'patient@example.com',
          userType: 'patient' as UserType
        }
      };
      // Check if email exists in our mock data
      if (!mockUsers[email as keyof typeof mockUsers]) {
        throw new Error('Invalid credentials');
      }
      const userData = mockUsers[email as keyof typeof mockUsers];
      // Verify the user type matches
      if (userData.userType !== userType) {
        throw new Error('Invalid user type');
      }
      // Set the authenticated user
      setUser(userData);
      setIsAuthenticated(true);
      // Store in localStorage
      localStorage.setItem('nafsi_user', JSON.stringify(userData));
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };
  const register = async (name: string, email: string, password: string, userType: UserType): Promise<void> => {
    // Simulate API call
    try {
      // In a real app, this would be an API call
      // For demo purposes, we'll simulate successful registration
      const newUser = {
        id: `${userType[0]}${Math.floor(Math.random() * 1000)}`,
        name,
        email,
        userType
      };
      // Set the authenticated user
      setUser(newUser);
      setIsAuthenticated(true);
      // Store in localStorage
      localStorage.setItem('nafsi_user', JSON.stringify(newUser));
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  };
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('nafsi_user');
  };
  return <AuthContext.Provider value={{
    user,
    isAuthenticated,
    userType: user?.userType || null,
    login,
    register,
    logout
  }}>
      {children}
    </AuthContext.Provider>;
};
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};