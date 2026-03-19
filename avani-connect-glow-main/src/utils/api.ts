/**
 * Get the API base URL based on the environment
 * - In production: uses the deployed backend URL
 * - In development: uses localhost
 */
export const getApiBaseUrl = (): string => {
  // 1. Check if we are in development (localhost)
  if (typeof window !== 'undefined') {
    const isLocal = window.location.hostname === 'localhost' || 
                   window.location.hostname === '127.0.0.1' || 
                   window.location.hostname.startsWith('192.168.');
    
    // In production (live site), use relative paths to hit the same monolithic service
    if (!isLocal) {
      return ""; 
    }
  }

  // 2. Try VITE environment variables if they exist
  const envUrl = import.meta.env.VITE_API_URL || import.meta.env.VITE_BACKEND_URL;
  if (envUrl) return envUrl.replace(/\/$/, '');

  // 3. Final default for local development
  return "http://localhost:5000";
};

export const API_BASE_URL = getApiBaseUrl();
