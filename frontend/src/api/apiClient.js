/**
 * AgriNexus Centralized API Client
 * Wraps browser fetch with automatic JWT Bearer token authentication and uniform error handling.
 */

const BASE_URL = import.meta.env.VITE_API_URL || 'https://ksetravya.onrender.com/api';

export const getAuthToken = () => {
  try {
    return localStorage.getItem('agri_nexus_jwt_token') || null;
  } catch (e) {
    return null;
  }
};

export const setAuthToken = (token) => {
  try {
    if (token) {
      localStorage.setItem('agri_nexus_jwt_token', token);
    } else {
      localStorage.removeItem('agri_nexus_jwt_token');
    }
  } catch (e) {
    console.error('Failed to set auth token in localStorage', e);
  }
};

export const getStoredUser = () => {
  try {
    const data = localStorage.getItem('agri_nexus_user');
    return data ? JSON.parse(data) : null;
  } catch (e) {
    return null;
  }
};

export const setStoredUser = (user) => {
  try {
    if (user) {
      localStorage.setItem('agri_nexus_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('agri_nexus_user');
    }
  } catch (e) {
    console.error('Failed to set stored user in localStorage', e);
  }
};

async function request(endpoint, options = {}, retries = 3) {
  const url = endpoint.startsWith('http') ? endpoint : `${BASE_URL}${endpoint}`;
  
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  const token = getAuthToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    ...options,
    headers,
  };

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const response = await fetch(url, config);
      
      // Handle 204 No Content
      if (response.status === 204) {
        return { success: true };
      }

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        const errorMessage = data.message || data.error || `HTTP error ${response.status}`;
        const err = new Error(errorMessage);
        err.status = response.status;
        err.data = data;
        throw err;
      }

      return data;
    } catch (error) {
      const isNetworkError = error.name === 'TypeError' || (error.message && error.message.includes('Failed to fetch'));
      if (isNetworkError && attempt < retries) {
        console.warn(`[apiClient] Network request failed for ${endpoint} (Attempt ${attempt + 1}/${retries}). Retrying while server wakes up...`);
        await new Promise((resolve) => setTimeout(resolve, 3000));
        continue;
      }
      if (isNetworkError) {
        throw new Error('Backend server is waking up from sleep. Please try again in 5 seconds.');
      }
      console.error(`API Request Error [${endpoint}]:`, error);
      throw error;
    }
  }
}

export const apiClient = {
  get: (endpoint, options = {}) => request(endpoint, { ...options, method: 'GET' }),
  post: (endpoint, body, options = {}) =>
    request(endpoint, { ...options, method: 'POST', body: JSON.stringify(body) }),
  put: (endpoint, body, options = {}) =>
    request(endpoint, { ...options, method: 'PUT', body: JSON.stringify(body) }),
  patch: (endpoint, body, options = {}) =>
    request(endpoint, { ...options, method: 'PATCH', body: JSON.stringify(body) }),
  delete: (endpoint, options = {}) => request(endpoint, { ...options, method: 'DELETE' }),
};
