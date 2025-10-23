// API utilities for daily journal management
// This file handles communication with the backend daily journal endpoints

import { apiRequest, handleApiError, ApiError } from './utilApi';

// Daily Journal API
export const dailyJournalApi = {
  // Get all daily journal entries
  async getAllEntries() {
    return apiRequest('/daily_journal');
  },

  // Get daily journal entry by date (YYYY-MM-DD format)
  async getEntryByDate(date) {
    return apiRequest(`/daily_journal/${date}`);
  },

  // Create or update a daily journal entry
  async createEntry(entryData) {
    return apiRequest('/daily_journal', {
      method: 'POST',
      body: JSON.stringify(entryData),
    });
  },

  // Update an existing daily journal entry by date
  async updateEntry(date, entryData) {
    return apiRequest(`/daily_journal/${date}`, {
      method: 'PATCH',
      body: JSON.stringify(entryData),
    });
  },

  // Delete a daily journal entry by date
  async deleteEntry(date) {
    return apiRequest(`/daily_journal/${date}`, {
      method: 'DELETE',
    });
  },
};

// Re-export error handling utilities for convenience
export { handleApiError, ApiError };

