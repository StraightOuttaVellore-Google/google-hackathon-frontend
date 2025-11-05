// Generic API utilities for all backend API calls
// This file provides reusable functions and classes for API communication

import { API_BASE_URL } from '../config/apiConfig';

/**
 * Custom error class for API errors
 * @extends Error
 */
export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

/**
 * Generic API request handler with improvements
 * - Proper header merging
 * - Authentication support with credentials
 * - 30-second timeout handling with AbortController
 * - Empty response handling (204 No Content)
 * 
 * @param {string} endpoint - API endpoint (e.g., '/priority_matrix')
 * @param {Object} options - Fetch options (method, body, headers, etc.)
 * @returns {Promise<any>} - Parsed JSON response or null for empty responses
 * @throws {ApiError} - Throws ApiError with status code
 */
export async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  console.log(`[API] Making request to: ${url}`);
  console.log(`[API] Method: ${options.method || 'GET'}`);
  console.log(`[API] Headers:`, options.headers || {});
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include', // For authenticated requests
  };

  // Add authorization token if available (for protected endpoints)
  const token = localStorage.getItem('access_token');
  if (token) {
    defaultOptions.headers['Authorization'] = `Bearer ${token}`;
  }

  // Properly merge headers instead of overwriting
  const config = { 
    ...defaultOptions, 
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...(options.headers || {}),
    },
  };

  // Add timeout handling
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 60000); // 60s timeout
  config.signal = controller.signal;

  try {
    console.log(`[API] Sending fetch request to: ${url}`);
    const response = await fetch(url, config);
    clearTimeout(timeoutId);
    console.log(`[API] Response received: ${response.status} ${response.statusText}`);
    
    if (!response.ok) {
      // Try to get detailed error message from response body
      let errorDetail = response.statusText;
      try {
        const errorData = await response.json();
        console.error('API Error Details:', errorData);
        errorDetail = JSON.stringify(errorData, null, 2);
      } catch (e) {
        // If response body is not JSON, use statusText
      }
      
      throw new ApiError(
        `API request failed: ${errorDetail}`,
        response.status
      );
    }

    // Handle empty responses (e.g., 204 No Content)
    if (response.status === 204 || !response.headers.get('content-length')) {
      return null;
    }

    return await response.json();
  } catch (error) {
    clearTimeout(timeoutId);
    console.error(`[API] Request failed:`, error);
    console.error(`[API] Error name:`, error.name);
    console.error(`[API] Error message:`, error.message);
    
    if (error instanceof ApiError) {
      throw error;
    }
    if (error.name === 'AbortError') {
      console.error(`[API] Request timed out after 60 seconds`);
      throw new ApiError('Request timeout', 408);
    }
    
    // Provide more helpful error messages for connection issues
    if (error.message.includes('Failed to fetch') || error.message.includes('ERR_CONNECTION_REFUSED')) {
      throw new ApiError(
        `Cannot connect to backend server. Please ensure the backend is running on ${API_BASE_URL}. ` +
        `Start it with: uvicorn main:app --host 0.0.0.0 --port 8000 --reload`,
        0
      );
    }
    
    throw new ApiError(`Network error: ${error.message}`, 0);
  }
}

/**
 * Generic error handler for API errors
 * Converts ApiError objects to user-friendly messages
 * 
 * @param {Error} error - Error object from API call
 * @returns {string} - User-friendly error message
 */
export const handleApiError = (error) => {
  if (error instanceof ApiError) {
    switch (error.status) {
      case 0:
        // Connection errors (status 0 means network error)
        return error.message.includes('Cannot connect to backend')
          ? error.message
          : 'Cannot connect to server. Please check if the backend is running.';
      case 400:
        return 'Bad request. Please check your input.';
      case 401:
        return 'Authentication required. Please log in.';
      case 403:
        return 'You do not have permission to perform this action.';
      case 404:
        return 'The requested resource was not found.';
      case 408:
        return 'Request timeout. Please try again.';
      case 422:
        return 'Invalid data provided. Please check your input.';
      case 500:
        return 'Server error. Please try again later.';
      default:
        return error.message;
    }
  }
  return 'An unexpected error occurred. Please try again.';
};
