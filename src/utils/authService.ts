const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

// Get current access token
export const getAccessToken = (): string | null => localStorage.getItem(ACCESS_TOKEN_KEY);

// Get current refresh token
export const getRefreshToken = (): string | null => localStorage.getItem(REFRESH_TOKEN_KEY);

// Set tokens in localStorage
export const setTokens = (access: string, refresh: string): void => {
  localStorage.setItem(ACCESS_TOKEN_KEY, access);
  localStorage.setItem(REFRESH_TOKEN_KEY, refresh);
};

// Clear tokens from localStorage
export const clearTokens = (): void => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
};
