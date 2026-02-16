/**
 * Get the API base URL based on the environment
 * - In production: uses the deployed backend URL
 * - In development: uses localhost
 */
export const getApiBaseUrl = (): string => {
  // Use VITE_API_URL if provided, otherwise fallback for local development
  return import.meta.env.VITE_API_URL || "http://localhost:5000";
};

export const API_BASE_URL = getApiBaseUrl();
