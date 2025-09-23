import {getAccessToken, getRefreshToken, setTokens, clearTokens} from '../../utils/authService';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

// Mock window and localStorage for Node.js environment
Object.defineProperty(global, 'window', {
  value: {
    localStorage: localStorageMock,
  },
  writable: true,
});

Object.defineProperty(global, 'localStorage', {
  value: localStorageMock,
  writable: true,
});

describe('authService', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('getAccessToken', () => {
    it('should return access token from localStorage', () => {
      const token = 'test-access-token';
      localStorage.setItem('accessToken', token);

      expect(getAccessToken()).toBe(token);
    });

    it('should return null when no access token exists', () => {
      expect(getAccessToken()).toBeNull();
    });
  });

  describe('getRefreshToken', () => {
    it('should return refresh token from localStorage', () => {
      const token = 'test-refresh-token';
      localStorage.setItem('refreshToken', token);

      expect(getRefreshToken()).toBe(token);
    });

    it('should return null when no refresh token exists', () => {
      expect(getRefreshToken()).toBeNull();
    });
  });

  describe('setTokens', () => {
    it('should set both access and refresh tokens in localStorage', () => {
      const accessToken = 'new-access-token';
      const refreshToken = 'new-refresh-token';

      setTokens(accessToken, refreshToken);

      expect(localStorage.getItem('accessToken')).toBe(accessToken);
      expect(localStorage.getItem('refreshToken')).toBe(refreshToken);
    });

    it('should overwrite existing tokens', () => {
      // Set initial tokens
      localStorage.setItem('accessToken', 'old-access');
      localStorage.setItem('refreshToken', 'old-refresh');

      const newAccessToken = 'new-access-token';
      const newRefreshToken = 'new-refresh-token';

      setTokens(newAccessToken, newRefreshToken);

      expect(localStorage.getItem('accessToken')).toBe(newAccessToken);
      expect(localStorage.getItem('refreshToken')).toBe(newRefreshToken);
    });
  });

  describe('clearTokens', () => {
    it('should remove both tokens from localStorage', () => {
      // Set tokens first
      localStorage.setItem('accessToken', 'test-access');
      localStorage.setItem('refreshToken', 'test-refresh');

      clearTokens();

      expect(localStorage.getItem('accessToken')).toBeNull();
      expect(localStorage.getItem('refreshToken')).toBeNull();
    });

    it('should not throw error when tokens do not exist', () => {
      expect(() => clearTokens()).not.toThrow();
    });

    it('should clear only token keys, not other localStorage items', () => {
      localStorage.setItem('accessToken', 'test-access');
      localStorage.setItem('refreshToken', 'test-refresh');
      localStorage.setItem('otherKey', 'other-value');

      clearTokens();

      expect(localStorage.getItem('accessToken')).toBeNull();
      expect(localStorage.getItem('refreshToken')).toBeNull();
      expect(localStorage.getItem('otherKey')).toBe('other-value');
    });
  });

  describe('integration', () => {
    it('should work with complete authentication flow', () => {
      // Initial state - no tokens
      expect(getAccessToken()).toBeNull();
      expect(getRefreshToken()).toBeNull();

      // Set tokens
      const accessToken = 'access-123';
      const refreshToken = 'refresh-456';
      setTokens(accessToken, refreshToken);

      // Verify tokens are set
      expect(getAccessToken()).toBe(accessToken);
      expect(getRefreshToken()).toBe(refreshToken);

      // Clear tokens
      clearTokens();

      // Verify tokens are cleared
      expect(getAccessToken()).toBeNull();
      expect(getRefreshToken()).toBeNull();
    });
  });
});
