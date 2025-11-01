// API utilities for Reddit feature
// This file handles communication with the backend Reddit endpoints

import { apiRequest, handleApiError, ApiError } from './utilApi';

/**
 * Reddit API
 * Provides methods for Reddit-like features: countries, posts, comments, votes
 */
export const redditApi = {
  /**
   * Get all active countries
   * @returns {Promise<Array>} - List of countries
   */
  async getCountries() {
    try {
      return await apiRequest('/reddit/countries', {
        method: 'GET',
      });
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get country by ISO code
   * @param {string} isoCode - Country ISO code (e.g., 'US', 'IN')
   * @returns {Promise<Object>} - Country data
   */
  async getCountry(isoCode) {
    try {
      return await apiRequest(`/reddit/countries/${isoCode}`, {
        method: 'GET',
      });
    } catch (error) {
      throw error;
    }
  },

  /**
   * Subscribe to a country
   * @param {string} isoCode - Country ISO code
   * @returns {Promise<Object>} - Subscription status
   */
  async subscribeToCountry(isoCode) {
    try {
      return await apiRequest(`/reddit/countries/${isoCode}/subscribe`, {
        method: 'POST',
      });
    } catch (error) {
      throw error;
    }
  },

  /**
   * Unsubscribe from a country
   * @param {string} isoCode - Country ISO code
   * @returns {Promise<Object>} - Unsubscription status
   */
  async unsubscribeFromCountry(isoCode) {
    try {
      return await apiRequest(`/reddit/countries/${isoCode}/subscribe`, {
        method: 'DELETE',
      });
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get posts for a country
   * @param {string} isoCode - Country ISO code
   * @param {Object} options - Query options
   * @param {number} options.skip - Number of posts to skip (pagination)
   * @param {number} options.limit - Number of posts to return
   * @param {string} options.sort - Sort order: 'hot', 'new', or 'top'
   * @returns {Promise<Array>} - List of posts
   */
  async getPosts(isoCode, options = {}) {
    try {
      const { skip = 0, limit = 20, sort = 'hot' } = options;
      const params = new URLSearchParams({
        skip: skip.toString(),
        limit: limit.toString(),
        sort,
      });
      return await apiRequest(`/reddit/countries/${isoCode}/posts?${params}`, {
        method: 'GET',
      });
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get a single post by ID
   * @param {string} postId - Post ID
   * @returns {Promise<Object>} - Post data
   */
  async getPost(postId) {
    try {
      return await apiRequest(`/reddit/posts/${postId}`, {
        method: 'GET',
      });
    } catch (error) {
      throw error;
    }
  },

  /**
   * Create a new post
   * @param {string} isoCode - Country ISO code
   * @param {Object} postData - Post data
   * @param {string} postData.title - Post title
   * @param {string} postData.content - Post content
   * @param {Object} postData.media_urls - Optional media URLs
   * @returns {Promise<Object>} - Created post
   */
  async createPost(isoCode, postData) {
    try {
      return await apiRequest(`/reddit/countries/${isoCode}/posts`, {
        method: 'POST',
        body: JSON.stringify(postData),
      });
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get comments for a post
   * @param {string} postId - Post ID
   * @returns {Promise<Array>} - List of comments
   */
  async getComments(postId) {
    try {
      return await apiRequest(`/reddit/posts/${postId}/comments`, {
        method: 'GET',
      });
    } catch (error) {
      throw error;
    }
  },

  /**
   * Create a comment on a post
   * @param {string} postId - Post ID
   * @param {Object} commentData - Comment data
   * @param {string} commentData.content - Comment content
   * @param {string} commentData.parent_id - Optional parent comment ID for replies
   * @returns {Promise<Object>} - Created comment
   */
  async createComment(postId, commentData) {
    try {
      return await apiRequest(`/reddit/posts/${postId}/comments`, {
        method: 'POST',
        body: JSON.stringify(commentData),
      });
    } catch (error) {
      throw error;
    }
  },

  /**
   * Vote on a post
   * @param {string} postId - Post ID
   * @param {number} voteType - 1 for upvote, -1 for downvote
   * @returns {Promise<Object>} - Vote result
   */
  async voteOnPost(postId, voteType) {
    try {
      return await apiRequest(`/reddit/posts/${postId}/vote`, {
        method: 'POST',
        body: JSON.stringify({ vote_type: voteType }),
      });
    } catch (error) {
      throw error;
    }
  },

  /**
   * Vote on a comment
   * @param {string} commentId - Comment ID
   * @param {number} voteType - 1 for upvote, -1 for downvote
   * @returns {Promise<Object>} - Vote result
   */
  async voteOnComment(commentId, voteType) {
    try {
      return await apiRequest(`/reddit/comments/${commentId}/vote`, {
        method: 'POST',
        body: JSON.stringify({ vote_type: voteType }),
      });
    } catch (error) {
      throw error;
    }
  },

  /**
   * Remove vote on a post
   * @param {string} postId - Post ID
   * @returns {Promise<Object>} - Result
   */
  async removePostVote(postId) {
    try {
      return await apiRequest(`/reddit/posts/${postId}/vote`, {
        method: 'DELETE',
      });
    } catch (error) {
      throw error;
    }
  },

  /**
   * Remove vote on a comment
   * @param {string} commentId - Comment ID
   * @returns {Promise<Object>} - Result
   */
  async removeCommentVote(commentId) {
    try {
      return await apiRequest(`/reddit/comments/${commentId}/vote`, {
        method: 'DELETE',
      });
    } catch (error) {
      throw error;
    }
  },

  /**
   * Report a post
   * @param {string} postId - Post ID
   * @param {Object} reportData - Report data
   * @param {string} reportData.reason - Report reason
   * @param {string} reportData.description - Optional description
   * @returns {Promise<Object>} - Report result
   */
  async reportPost(postId, reportData) {
    try {
      return await apiRequest(`/reddit/posts/${postId}/report`, {
        method: 'POST',
        body: JSON.stringify(reportData),
      });
    } catch (error) {
      throw error;
    }
  },

  /**
   * Report a comment
   * @param {string} commentId - Comment ID
   * @param {Object} reportData - Report data
   * @param {string} reportData.reason - Report reason
   * @param {string} reportData.description - Optional description
   * @returns {Promise<Object>} - Report result
   */
  async reportComment(commentId, reportData) {
    try {
      return await apiRequest(`/reddit/comments/${commentId}/report`, {
        method: 'POST',
        body: JSON.stringify(reportData),
      });
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get all posts by a specific user
   * @param {string} userId - User ID
   * @param {Object} options - Query options
   * @param {number} options.skip - Number of posts to skip
   * @param {number} options.limit - Number of posts to return
   * @returns {Promise<Array>} - List of posts
   */
  async getUserPosts(userId, options = {}) {
    try {
      const { skip = 0, limit = 20 } = options;
      const params = new URLSearchParams({
        skip: skip.toString(),
        limit: limit.toString(),
      });
      return await apiRequest(`/reddit/users/${userId}/posts?${params}`, {
        method: 'GET',
      });
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get all comments by a specific user
   * @param {string} userId - User ID
   * @param {Object} options - Query options
   * @param {number} options.skip - Number of comments to skip
   * @param {number} options.limit - Number of comments to return
   * @returns {Promise<Array>} - List of comments
   */
  async getUserComments(userId, options = {}) {
    try {
      const { skip = 0, limit = 20 } = options;
      const params = new URLSearchParams({
        skip: skip.toString(),
        limit: limit.toString(),
      });
      return await apiRequest(`/reddit/users/${userId}/comments?${params}`, {
        method: 'GET',
      });
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get all posts by the current authenticated user
   * @param {Object} options - Query options
   * @param {number} options.skip - Number of posts to skip
   * @param {number} options.limit - Number of posts to return
   * @returns {Promise<Array>} - List of posts
   */
  async getMyPosts(options = {}) {
    try {
      const { skip = 0, limit = 20 } = options;
      const params = new URLSearchParams({
        skip: skip.toString(),
        limit: limit.toString(),
      });
      return await apiRequest(`/reddit/users/me/posts?${params}`, {
        method: 'GET',
      });
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get all comments by the current authenticated user
   * @param {Object} options - Query options
   * @param {number} options.skip - Number of comments to skip
   * @param {number} options.limit - Number of comments to return
   * @returns {Promise<Array>} - List of comments
   */
  async getMyComments(options = {}) {
    try {
      const { skip = 0, limit = 20 } = options;
      const params = new URLSearchParams({
        skip: skip.toString(),
        limit: limit.toString(),
      });
      return await apiRequest(`/reddit/users/me/comments?${params}`, {
        method: 'GET',
      });
    } catch (error) {
      throw error;
    }
  },
};

// Re-export error handling utilities
export { handleApiError, ApiError };

