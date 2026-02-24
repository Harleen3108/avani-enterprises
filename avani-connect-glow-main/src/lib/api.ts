/**
 * Centralized API utility for determining the backend URL.
 * This ensures that all components hit the same server and handles environment fallbacks.
 */

export const getBackendUrl = (): string => {
  // 1. Try VITE_BACKEND_URL (primary environment variable)
  let baseUrl = import.meta.env.VITE_BACKEND_URL;

  // 2. Try VITE_API_URL (secondary environment variable)
  if (!baseUrl) {
    baseUrl = import.meta.env.VITE_API_URL;
  }

  // 3. Fallback to production URL if in production mode
  if (!baseUrl && import.meta.env.PROD) {
    baseUrl = 'https://avani-enterprises-backend-1.onrender.com';
  }

  // 4. Final fallback to localhost for development
  if (!baseUrl) {
    baseUrl = 'http://localhost:5000';
  }

  // Clean trailing slashes
  return baseUrl.replace(/\/$/, '');
};
