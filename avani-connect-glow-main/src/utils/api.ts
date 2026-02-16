/**
 * Get the API base URL based on the environment
 * - In production: uses the deployed backend URL
 * - In development: uses localhost
 */
export const getApiBaseUrl = (): string => {
  // Check if we're in production (deployed website)
  const isProduction = window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1';
  
  if (isProduction) {
    // Production backend URL on Render
    return "https://avani-enterprises-backend-1.onrender.com";
  }
  
  // Development - use localhost
  return "http://localhost:5000";
};

export const API_BASE_URL = getApiBaseUrl();
