import React, { useEffect, useState, createContext, useContext } from "react";
import axios from "axios";

type UserType = "doctor" | "patient" | null;

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
  register: (
    name: string,
    email: string,
    password: string,
    userType: UserType
  ) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Load user from localStorage if exists
    const storedUser = localStorage.getItem("userData");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  // **LOGIN FUNCTION WITH API**
  const login = async (
    email: string,
    password: string,
    userType: UserType
  ): Promise<void> => {
    try {
      const response = await axios.post("http://localhost:4000/api/login", {
        email,
        password,
        userType,
      });

      console.log("Login response:", response.data);

      const userData = response.data.data.user;
      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem("userData", JSON.stringify(userData)); // Store user in localStorage
    } catch (error: any) {
      console.error("Login failed:", error.response?.data?.message || error);
      throw new Error(
        error.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  // **REGISTER FUNCTION WITH API**
  const register = async (
    name: string,
    email: string,
    password: string,
    userType: UserType
  ): Promise<void> => {
    try {
      const response = await axios.post("http://localhost:4000/api/register", {
        name,
        email,
        password,
        userType,
      });

      const userData: User = response.data.user;
      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem("userData", JSON.stringify(userData)); // Store user in localStorage
    } catch (error: any) {
      console.error(
        "Registration failed:",
        error.response?.data?.message || error
      );
      throw new Error(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
    }
  };

  // **LOGOUT FUNCTION**
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("nafsi_user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        userType: user?.userType || null,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use authentication
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
