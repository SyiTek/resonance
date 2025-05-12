"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { User, loginUser, registerUser, logoutUser, getCurrentUser, UserProfile } from "@/lib/auth";

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, username: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  userProfile: null,
  isLoading: true,
  isAuthenticated: false,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check for stored user data on mount
    const checkAuth = () => {
      const currentUser = getCurrentUser();
      if (currentUser) {
        setUser(currentUser);
        setUserProfile({
          username: currentUser.username || 'Agent',
          avatar: `https://api.dicebear.com/7.x/avatars/svg?seed=${currentUser.username || 'agent'}`,
          role: 'Agent'
        });
      }
      setIsLoading(false);
    };
    
    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const { user, error } = await loginUser(email, password);
      
      if (error) {
        toast.error("Login failed", {
          description: error
        });
        throw new Error(error);
      }
      
      if (user) {
        setUser(user);
        setUserProfile({
          username: user.username || 'Agent',
          avatar: `https://api.dicebear.com/7.x/avatars/svg?seed=${user.username || 'agent'}`,
          role: 'Agent'
        });
        toast.success("Welcome back!", {
          description: "Successfully logged in to Guild 00:00"
        });
        
        // Don't redirect here, let the component handle redirection
      }
      return user;
    } catch (error: any) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, username: string) => {
    setIsLoading(true);
    try {
      const { user, error } = await registerUser(email, password, username);
      
      if (error) {
        toast.error("Registration failed", {
          description: error
        });
        throw new Error(error);
      }
      
      if (user) {
        toast.success("Account created successfully!");
        router.push('/login');
      }
      return user;
    } catch (error: any) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      const { success, error } = await logoutUser();
      
      if (error) {
        toast.error("Logout failed", {
          description: error
        });
        throw new Error(error);
      }
      
      if (success) {
        setUser(null);
        setUserProfile(null);
        toast.success("Logged out successfully", {
          description: "You have been securely logged out"
        });
        router.push('/');
      }
      return success;
    } catch (error: any) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userProfile,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);