// Auth service - Memory token management only
// API calls are handled by useAuth.ts with Axios + React Query

// Memory storage for tokens
let accessToken: string | null = null;
let refreshToken: string | null = null;

// Get current access token
export const getAccessToken = (): string | null => accessToken;

// Get current refresh token
export const getRefreshToken = (): string | null => refreshToken;

// Set tokens in memory
export const setTokens = (access: string, refresh: string): void => {
  accessToken = access;
  refreshToken = refresh;
};

// Clear tokens from memory
export const clearTokens = (): void => {
  accessToken = null;
  refreshToken = null;
};
