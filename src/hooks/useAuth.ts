import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import apiAxios from '../utils/apiAxios';
import {setTokens, clearTokens, getAccessToken} from '../utils/authService';

// Types
interface LoginData {
  username: string;
  password: string;
}

interface RegisterData {
  username: string;
  password: string;
}

interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

// API functions
const authApi = {
  login: async (data: LoginData): Promise<AuthResponse> => {
    const response = await apiAxios.post('/api/login', data);
    return response.data;
  },

  register: async (data: RegisterData): Promise<AuthResponse> => {
    const response = await apiAxios.post('/api/register', data);
    return response.data;
  },

  logout: async (): Promise<void> => {
    await apiAxios.post('/api/logout');
  },

  getCurrentUser: async (): Promise<User> => {
    const response = await apiAxios.get('/api/me');
    return response.data;
  },
};

// Main auth hook - simplified and self-contained
export const useAuth = () => {
  const queryClient = useQueryClient();
  const token = getAccessToken();

  // Get current user
  const {
    data: user,
    isLoading: isUserLoading,
    error: userError,
  } = useQuery({
    queryKey: ['user'],
    queryFn: authApi.getCurrentUser,
    enabled: !!token,
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      setTokens(data.accessToken, data.refreshToken);
      queryClient.invalidateQueries({queryKey: ['user']});
    },
    onError: (error) => {
      console.error('Login failed:', error);
    },
  });

  // Register mutation
  const registerMutation = useMutation({
    mutationFn: authApi.register,
    onSuccess: (data) => {
      setTokens(data.accessToken, data.refreshToken);
      queryClient.invalidateQueries({queryKey: ['user']});
    },
    onError: (error) => {
      console.error('Registration failed:', error);
    },
  });

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      clearTokens();
      queryClient.clear();
    },
    onError: (error) => {
      console.error('Logout failed:', error);
      clearTokens();
      queryClient.clear();
    },
  });

  const isAuthenticated = !!user && !userError;
  const isLoading = isUserLoading || loginMutation.isPending || registerMutation.isPending;

  return {
    // State
    user,
    isAuthenticated,
    isLoading,

    // Actions
    login: loginMutation.mutateAsync,
    register: registerMutation.mutateAsync,
    logout: logoutMutation.mutateAsync,

    // Mutation states
    isLoggingIn: loginMutation.isPending,
    isRegistering: registerMutation.isPending,
    isLoggingOut: logoutMutation.isPending,

    // Errors
    loginError: loginMutation.error,
    registerError: registerMutation.error,
    logoutError: logoutMutation.error,
  };
};
