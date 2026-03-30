/**
 * Centralized API utility for determining the backend URL.
 * This ensures that all components hit the same server and handles environment fallbacks.
 */

export const getBackendUrl = (): string => {
  // 1. Robust production fallback - Use relative paths for monolithic deployment
  if (typeof window !== 'undefined') {
    const isLocal = window.location.hostname === 'localhost' || 
                   window.location.hostname === '127.0.0.1' || 
                   window.location.hostname.startsWith('192.168.');
    
    if (!isLocal) {
      return "https://avani-enterprises.onrender.com";
    }
  }

  // 2. Try environment variables
  let baseUrl = import.meta.env.VITE_BACKEND_URL || import.meta.env.VITE_API_URL;

  // 3. Final fallback to localhost
  if (!baseUrl) {
    baseUrl = 'http://localhost:5001';
  }

  return baseUrl.replace(/\/$/, '');
};
