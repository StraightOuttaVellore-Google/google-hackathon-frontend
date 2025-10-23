// API utilities for moodboard management
// This file handles communication with the backend moodboard endpoints

import { apiRequest, handleApiError, ApiError } from './utilApi';

// Moodboard API
export const moodboardApi = {
  // Get moodboard data for current user
  async getMoodboardData() {
    return apiRequest('/moodboard');
  },

  // Create new moodboard data
  async createMoodboardData(moodboardData) {
    return apiRequest('/moodboard', {
      method: 'POST',
      body: JSON.stringify(moodboardData),
    });
  },

  // Update existing moodboard data
  async updateMoodboardData(moodboardData) {
    return apiRequest('/moodboard', {
      method: 'PATCH',
      body: JSON.stringify(moodboardData),
    });
  },
};

// Re-export error handling utilities for convenience
export { handleApiError, ApiError };

