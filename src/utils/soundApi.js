// API utilities for sound usage tracking
// This file handles communication with the backend sound statistics endpoints

import { apiRequest, handleApiError, ApiError } from './utilApi';

// Sound API
export const soundApi = {
  // Start a new sound session
  async startSession(soundType, soundName) {
    try {
      return await apiRequest('/stats/sound/start', {
        method: 'POST',
        body: JSON.stringify({
          sound_type: soundType,
          sound_name: soundName,
        }),
      });
    } catch (error) {
      console.error('Failed to start sound session:', error);
      throw error;
    }
  },

  // End an active sound session
  async endSession(sessionId) {
    try {
      return await apiRequest(`/stats/sound/${sessionId}/end`, {
        method: 'PATCH',
        body: JSON.stringify({}),
      });
    } catch (error) {
      console.error('Failed to end sound session:', error);
      throw error;
    }
  },
};

// Re-export error handling utilities for convenience
export { handleApiError, ApiError };
