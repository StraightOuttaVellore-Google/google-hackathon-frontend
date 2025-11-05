/**
 * Voice Journal API
 * Handles voice journal session completion and wellness analysis
 */

import { getAuthToken } from './loginApi';
import { API_BASE_URL } from '../config/apiConfig';

/**
 * Complete a voice journal session and trigger wellness analysis
 * @param {Object} sessionData - { mode: 'study'|'wellness', transcript: string, duration_seconds: number }
 * @returns {Promise<Object>} - { session_id, mode, analysis_status, message }
 */
export async function completeVoiceJournalSession(sessionData) {
  const token = getAuthToken();
  
  // Check if user is authenticated
  if (!token) {
    throw new Error('You must be logged in to save voice journal sessions. Please login and try again.');
  }
  
  const response = await fetch(`${API_BASE_URL}/voice_journal/complete`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(sessionData)
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Authentication failed. Please login again.');
    }
    const error = await response.json().catch(() => ({ detail: 'Unknown error' }));
    throw new Error(error.detail || 'Failed to complete voice journal session');
  }

  return response.json();
}

/**
 * Get wellness analysis results for a session
 * @param {string} sessionId - Session UUID
 * @returns {Promise<Object>} - Analysis results or status
 */
export async function getSessionAnalysis(sessionId) {
  const token = getAuthToken();
  
  const response = await fetch(`${API_BASE_URL}/voice_journal/analysis/${sessionId}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Failed to fetch analysis');
  }

  return response.json();
}

/**
 * Get user's voice journal sessions
 * @param {number} limit - Number of sessions to fetch
 * @returns {Promise<Object>} - { sessions: [] }
 */
export async function getUserSessions(limit = 10) {
  const token = getAuthToken();
  
  const response = await fetch(`${API_BASE_URL}/voice_journal/sessions?limit=${limit}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Failed to fetch sessions');
  }

  return response.json();
}

/**
 * Get user's voice journal summaries with AI analysis
 * @param {number} limit - Number of summaries to fetch
 * @returns {Promise<Object>} - { summaries: [] }
 */
export async function getVoiceJournalSummaries(limit = 20) {
  const token = getAuthToken();
  
  if (!token) {
    return { summaries: [] };
  }
  
  const response = await fetch(`${API_BASE_URL}/voice_journal/summaries?limit=${limit}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Failed to fetch summaries' }));
    throw new Error(error.detail || 'Failed to fetch summaries');
  }

  return response.json();
}

/**
 * Add recommended task to Eisenhower Matrix
 * @param {Object} taskData - { task_title, task_description, quadrant, due_days_from_now }
 * @returns {Promise<Object>}
 */
export async function addRecommendedTask(taskData) {
  const token = getAuthToken();
  
  const response = await fetch(`${API_BASE_URL}/wellness/tasks/add-from-recommendation`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(taskData)
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Failed to add task');
  }

  return response.json();
}

/**
 * Register user for a wellness pathway
 * @param {Object} pathwayData - { pathway_name, pathway_type, description, duration_days }
 * @returns {Promise<Object>}
 */
export async function registerWellnessPathway(pathwayData) {
  const token = getAuthToken();
  
  const response = await fetch(`${API_BASE_URL}/wellness/pathways/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(pathwayData)
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Failed to register pathway');
  }

  return response.json();
}

/**
 * Get user's registered wellness pathways
 * @returns {Promise<Object>} - { pathways: [] }
 */
export async function getUserPathways() {
  const token = getAuthToken();
  
  const response = await fetch(`${API_BASE_URL}/wellness/pathways`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Failed to fetch pathways');
  }

  return response.json();
}

/**
 * Update pathway progress
 * @param {string} pathwayId - Pathway UUID
 * @param {number} progress - Progress percentage (0-100)
 * @returns {Promise<Object>}
 */
export async function updatePathwayProgress(pathwayId, progress) {
  const token = getAuthToken();
  
  const response = await fetch(`${API_BASE_URL}/wellness/pathways/${pathwayId}/progress?progress=${progress}`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Failed to update progress');
  }

  return response.json();
}

/**
 * Get recommended tasks
 * @returns {Promise<Object>} - { tasks: [] }
 */
export async function getRecommendedTasks() {
  const token = getAuthToken();
  
  const response = await fetch(`${API_BASE_URL}/wellness/tasks/recommended`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Failed to fetch recommended tasks');
  }

  return response.json();
}

/**
 * Map priority classification to Eisenhower quadrant
 * @param {string} priority - urgent_important, important_not_urgent, etc.
 * @returns {string} - Quadrant enum value
 */
export function mapPriorityToQuadrant(priority) {
  const mapping = {
    'urgent_important': 'high_imp_high_urg',
    'important_not_urgent': 'high_imp_low_urg',
    'urgent_not_important': 'low_imp_high_urg',
    'neither_urgent_nor_important': 'low_imp_low_urg'
  };
  return mapping[priority] || 'high_imp_low_urg'; // Default to Q2
}

/**
 * Calculate due date from days from now
 * @param {number} days - Days from now
 * @returns {string} - Formatted date string
 */
export function calculateDueDate(days) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}


