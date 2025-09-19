import React, { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { User, AuthContextType } from "../types";
import toast from "react-hot-toast";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const login = async (abhaToken: string): Promise<boolean> => {
    setIsLoading(true);

    try {
      // fake API delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      const newUser: User = {
        abhaToken: abhaToken,
        isAuthenticated: true,
      };
      setUser(newUser);
      toast.success("Welcome to MediDiagnosis! Testing mode enabled.");
      return true;
    } catch (error) {
      toast.error("Login failed. Please try again.");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    toast.success("Logged out successfully.");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};