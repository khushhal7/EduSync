// src/services/authService.js
import axios from 'axios';

// Define the base URL for your backend API.
// This will depend on the port your ASP.NET Core backend is running on.
// Make sure this matches the URL (especially the port) your backend API uses when you run it.
// Common ports for ASP.NET Core are 5000 (HTTP) and 5001 (HTTPS), or 7xxx for newer versions.
// Check your backend's launchSettings.json if unsure.
const API_BASE_URL = 'https://localhost:7142'; // <<<< IMPORTANT: Update this port if necessary!

// Create an Axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Logs in a user.
 * @param {object} credentials - The user's credentials.
 * @param {string} credentials.email - The user's email.
 * @param {string} credentials.password - The user's password.
 * @returns {Promise<object>} The user data from the API on successful login.
 */
export const loginUser = async (credentials) => {
  try {
    const response = await apiClient.post('/api/auth/login', credentials);
    return response.data; // This should be the UserDto from your backend
  } catch (error) {
    // Handle errors (e.g., network error, 401 Unauthorized)
    // You might want to throw a more specific error or return a structured error object
    console.error('Login API call error:', error.response ? error.response.data : error.message);
    throw error.response ? error.response.data : new Error('Login failed. Please try again.');
  }
};

/**
 * Registers a new user.
 * @param {object} userData - The user's registration data.
 * @param {string} userData.name
 * @param {string} userData.email
 * @param {string} userData.password
 * @param {string} userData.role - "Student" or "Instructor"
 * @returns {Promise<object>} The registered user data from the API.
 */
export const registerUser = async (userData) => {
  try {
    const response = await apiClient.post('/api/auth/register', userData);
    return response.data; // This should be the UserDto from your backend
  } catch (error) {
    console.error('Register API call error:', error.response ? error.response.data : error.message);
    throw error.response ? error.response.data : new Error('Registration failed. Please try again.');
  }
};

// You can add other auth-related API calls here later (e.g., logout, forgot password)

export default {
  loginUser,
  registerUser,
};
