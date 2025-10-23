// API utilities for pomodoro session tracking
// This file handles communication with the backend pomodoro statistics endpoints

import { apiRequest, handleApiError, ApiError } from './utilApi';

// Pomodoro API
export const pomodoroApi = {
  // Start a new pomodoro session
  async startSession() {
    try {
      return await apiRequest('/stats/pomodoro/start', {
        method: 'POST',
        body: JSON.stringify({}),
      });
    } catch (error) {
      console.error('Failed to start pomodoro session:', error);
      throw error;
    }
  },

  // End an active pomodoro session
  async endSession(sessionId, cyclesCompleted = 0) {
    try {
      return await apiRequest(`/stats/pomodoro/${sessionId}/end?cycles_completed=${cyclesCompleted}`, {
        method: 'PATCH',
        body: JSON.stringify({}),
      });
    } catch (error) {
      console.error('Failed to end pomodoro session:', error);
      throw error;
    }
  },

  // Get pomodoro analytics for a specific month
  async getAnalytics(year, month) {
    try {
      return await apiRequest(`/stats/pomodoro-analytics/${year}/${month}`, {
        method: 'GET',
      });
    } catch (error) {
      console.error('Failed to fetch pomodoro analytics:', error);
      throw error;
    }
  },
};

// Re-export error handling utilities for convenience
export { handleApiError, ApiError };
