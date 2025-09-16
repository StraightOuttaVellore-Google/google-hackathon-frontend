// API utilities for study data management
// This file handles communication with the backend API

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

class StudyApiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = 'StudyApiError';
    this.status = status;
  }
}

// Generic API request handler
async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const config = { ...defaultOptions, ...options };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new StudyApiError(
        `API request failed: ${response.statusText}`,
        response.status
      );
    }

    return await response.json();
  } catch (error) {
    if (error instanceof StudyApiError) {
      throw error;
    }
    throw new StudyApiError(`Network error: ${error.message}`, 0);
  }
}

// Study Data API
export const studyDataApi = {
  // Get all study data
  async getStudyData() {
    return apiRequest('/api/study-data');
  },

  // Update study data
  async updateStudyData(data) {
    return apiRequest('/api/study-data', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  // Update pomodoro timer settings
  async updatePomodoroTimer(timerData) {
    return apiRequest('/api/study-data/pomodoro-timer', {
      method: 'PATCH',
      body: JSON.stringify(timerData),
    });
  },

  // Update sound preferences
  async updateSoundPreferences(soundData) {
    return apiRequest('/api/study-data/sound', {
      method: 'PATCH',
      body: JSON.stringify(soundData),
    });
  },

  // Task management
  async getTasks() {
    return apiRequest('/api/study-data/tasks');
  },

  async createTask(taskData) {
    return apiRequest('/api/study-data/tasks', {
      method: 'POST',
      body: JSON.stringify(taskData),
    });
  },

  async updateTask(taskId, taskData) {
    return apiRequest(`/api/study-data/tasks/${taskId}`, {
      method: 'PATCH',
      body: JSON.stringify(taskData),
    });
  },

  async deleteTask(taskId) {
    return apiRequest(`/api/study-data/tasks/${taskId}`, {
      method: 'DELETE',
    });
  },

  // Daily data management
  async getDailyData() {
    return apiRequest('/api/study-data/daily-data');
  },

  async createDailyData(dailyData) {
    return apiRequest('/api/study-data/daily-data', {
      method: 'POST',
      body: JSON.stringify(dailyData),
    });
  },

  async updateDailyData(day, month, year, dailyData) {
    return apiRequest(`/api/study-data/daily-data/${year}/${month}/${day}`, {
      method: 'PATCH',
      body: JSON.stringify(dailyData),
    });
  },
};

// Error handling utilities
export const handleApiError = (error) => {
  if (error instanceof StudyApiError) {
    switch (error.status) {
      case 401:
        return 'Authentication required. Please log in.';
      case 403:
        return 'You do not have permission to perform this action.';
      case 404:
        return 'The requested resource was not found.';
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

export { StudyApiError };
