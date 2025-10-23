// API utilities for authentication/login management
// This file handles communication with the backend authentication endpoints

import { apiRequest, handleApiError, ApiError } from './utilApi';

/**
 * Authentication API
 * Provides methods for user login and registration
 * 
 * Backend Endpoints:
 * - POST /auth/login: Login with username & password, returns {access_token, token_type}
 * - POST /auth/signup: Register new user with username, email & password
 */
export const loginApi = {
  /**
   * Login user with credentials
   * 
   * @param {string} username - User username (not email)
   * @param {string} password - User password
   * @returns {Promise<{access_token: string, token_type: string}>} - JWT token and type
   * @throws {ApiError} - If login fails (invalid credentials, server error, etc.)
   */
  async login(username, password) {
    try {
      // Backend expects username and password in form format for OAuth2PasswordRequestForm
      const formData = new URLSearchParams();
      formData.append('username', username);
      formData.append('password', password);

      return await apiRequest('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString(),
      });
    } catch (error) {
      throw error;
    }
  },

  /**
   * Register new user
   * 
   * @param {Object} userData - User registration data
   * @param {string} userData.username - User username (unique, required)
   * @param {string} userData.email - User email (unique, must be valid email, required)
   * @param {string} userData.password - User password (required)
   * @returns {Promise<Object>} - Success response from backend
   * @throws {ApiError} - If registration fails (duplicate username/email, invalid data, etc.)
   */
  async register(userData) {
    try {
      // Validate required fields
      if (!userData.username || !userData.email || !userData.password) {
        throw new ApiError('Username, email, and password are required', 422);
      }

      return await apiRequest('/signup', {
        method: 'POST',
        body: JSON.stringify({
          username: userData.username,
          email: userData.email,
          password: userData.password,
        }),
      });
    } catch (error) {
      throw error;
    }
  },
};

// Re-export error handling utilities for convenience
export { handleApiError, ApiError };
