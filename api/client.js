import axios from 'axios';

// +++ Get the base URL from environment variables.
const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

// +++ Create an axios instance with the base URL.
export const api = axios.create({
  baseURL: API_BASE_URL,
});