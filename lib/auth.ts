import { toast } from "sonner";

// Types
export interface User {
  id: string;
  email: string;
  username: string;
}

export interface UserProfile {
  username: string;
  avatar: string;
  role: string;
}

interface AuthResponse {
  user: User | null;
  error: string | null;
}

// Mock user database
const USERS_KEY = 'guild_users';
const CURRENT_USER_KEY = 'guild_current_user';

// Helper functions
const generateId = () => Math.random().toString(36).substr(2, 9);

const getUsers = (): User[] => {
  if (typeof window === 'undefined') return [];
  const users = localStorage.getItem(USERS_KEY);
  return users ? JSON.parse(users) : [
    {
      id: 'default-agent',
      email: 'test@resonance.com',
      username: 'Jun Minamitake'
    }
  ];
};

const saveUsers = (users: User[]) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

// Auth functions
export const loginUser = async (email: string, password: string): Promise<AuthResponse> => {
  try {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Special case for test user
    if (email === 'test@resonance.com' && password === 'test123') {
      const testUser = {
        id: 'test-agent',
        email: 'test@resonance.com',
        username: 'Jun Minamitake'
      };
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(testUser));
      return { user: testUser, error: null };
    }
    
    const users = getUsers();
    const user = users.find(u => u.email === email);
    
    if (!user) {
      return { user: null, error: "User not found" };
    }
    
    // In a real app, we'd hash the password and compare hashes
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    return { user, error: null };
  } catch (error: any) {
    return { user: null, error: error.message };
  }
};

export const registerUser = async (email: string, password: string, username: string): Promise<AuthResponse> => {
  try {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const users = getUsers();
    
    // Check if user already exists
    if (users.some(u => u.email === email)) {
      return { user: null, error: "User already exists" };
    }
    
    const newUser: User = {
      id: generateId(),
      email,
      username,
    };
    
    users.push(newUser);
    saveUsers(users);
    
    return { user: newUser, error: null };
  } catch (error: any) {
    return { user: null, error: error.message };
  }
};

export const logoutUser = async (): Promise<{ success: boolean; error: string | null }> => {
  try {
    localStorage.removeItem(CURRENT_USER_KEY);
    return { success: true, error: null };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const getCurrentUser = (): User | null => {
  if (typeof window === 'undefined') return null;
  const user = localStorage.getItem(CURRENT_USER_KEY);
  return user ? JSON.parse(user) : null;
};