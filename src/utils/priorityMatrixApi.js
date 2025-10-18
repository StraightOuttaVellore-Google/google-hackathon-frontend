// API utilities for priority matrix management
// This file handles communication with the backend priority matrix endpoints

import { apiRequest, handleApiError, ApiError } from './utilApi';

// Priority Matrix API
export const priorityMatrixApi = {
  // Get all tasks or tasks for a specific day
  async getTasks(day = null) {
    const params = day ? `?day=${day}` : '';
    return apiRequest(`/priority_matrix${params}`);
  },

  // Create a new task
  async createTask(taskData) {
    console.log('Creating task with data:', taskData);
    return apiRequest('/priority_matrix', {
      method: 'POST',
      body: JSON.stringify(taskData),
    });
  },

  // Update an existing task
  async updateTask(taskData) {
    console.log('Updating task with data:', taskData);
    return apiRequest('/priority_matrix', {
      method: 'PATCH',
      body: JSON.stringify(taskData),
    });
  },

  // Delete a task
  async deleteTask(taskId) {
    return apiRequest('/priority_matrix', {
      method: 'DELETE',
      body: JSON.stringify({ id: taskId }),
    });
  },
};

// Re-export error handling utilities for convenience
export { handleApiError, ApiError };
