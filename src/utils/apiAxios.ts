import axios, {AxiosInstance, InternalAxiosRequestConfig, AxiosResponse} from 'axios';
import {getAccessToken, getRefreshToken, setTokens, clearTokens} from './authService';

//TODO  On real project, this should be an environment variable
const API_BASE_URL = 'http://localhost:3001';

// Create axios instance
const apiAxios: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - add auth token
apiAxios.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - handle token refresh
apiAxios.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error) => {
    const originalRequest = error.config;

    // If 401 and not already retried
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Try to refresh token via API
        const refreshToken = getRefreshToken();
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

        const refreshResponse = await axios.post(`${API_BASE_URL}/api/refresh-token`, {
          refreshToken,
        });

        // Update tokens in memory
        const {accessToken: newAccessToken, refreshToken: newRefreshToken} = refreshResponse.data;
        setTokens(newAccessToken, newRefreshToken);

        // Retry original request with new token
        if (newAccessToken && originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        }

        return apiAxios(originalRequest);
      } catch (refreshError) {
        // Refresh failed, clear tokens and redirect to login
        clearTokens();
        window.location.href = '/login';
        return Promise.reject(new Error('Session expired. Please login again.'));
      }
    }

    return Promise.reject(error);
  }
);

export default apiAxios;
