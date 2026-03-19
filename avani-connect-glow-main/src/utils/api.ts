/**
 * Get the API base URL based on the environment
 * - In production: uses the deployed backend URL
 * - In development: uses localhost
 */
export const getApiBaseUrl = (): string => {
  // Use VITE_API_URL if provided
  const envUrl = import.meta.env.VITE_API_URL || import.meta.env.VITE_BACKEND_URL;
  if (envUrl) return envUrl;

  // Fallback for production
  if (import.meta.env.PROD) {
    return "https://avani-enterprises-backend-1.onrender.com";
  }

  // Fallback for local development
  return "http://localhost:5000";
};

export const API_BASE_URL = getApiBaseUrl();
