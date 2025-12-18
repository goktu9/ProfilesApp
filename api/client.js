import axios from 'axios';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

export const api = axios.create({
  baseURL: API_BASE_URL,
  // +++ 10 second timeout.
  timeout: 10000, 
});

// +++ Add response interceptor for global error handling.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      // +++ Network error or timeout.
      throw new Error('Network error. Check your connection.');
    }
    if (error.response.status === 404) {
      // +++ Resource not found.
      throw new Error('Resource not found');
    }
    if (error.response.status >= 500) {
      // +++ Server error.
      throw new Error('Server error. Please try again later.');
    }
    throw error;
  }
);