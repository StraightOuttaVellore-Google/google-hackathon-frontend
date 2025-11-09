/**
 * YouTube Data API v3 Client
 * Handles all YouTube API calls
 */

const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const API_BASE_URL = 'https://www.googleapis.com/youtube/v3';

/**
 * Get access token for authenticated requests
 */
async function getAccessToken() {
  const { getAccessToken } = await import('./youtubeAuth.js');
  return getAccessToken();
}

/**
 * Make authenticated API request
 */
async function makeAuthenticatedRequest(endpoint, params = {}) {
  const token = await getAccessToken();
  if (!token) {
    throw new Error('Not authenticated. Please connect your YouTube account.');
  }

  const queryParams = new URLSearchParams({
    ...params,
    access_token: token
  });

  const response = await fetch(`${API_BASE_URL}${endpoint}?${queryParams}`);
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: { message: 'Unknown error' } }));
    throw new Error(error.error?.message || 'API request failed');
  }

  return response.json();
}

/**
 * Make unauthenticated API request (public data)
 */
async function makePublicRequest(endpoint, params = {}) {
  const queryParams = new URLSearchParams({
    ...params,
    key: YOUTUBE_API_KEY
  });

  const response = await fetch(`${API_BASE_URL}${endpoint}?${queryParams}`);
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: { message: 'Unknown error' } }));
    throw new Error(error.error?.message || 'API request failed');
  }

  return response.json();
}

/**
 * Get user's YouTube playlists
 */
export async function getUserPlaylists(maxResults = 50) {
  try {
    const response = await makeAuthenticatedRequest('/playlists', {
      part: 'snippet,contentDetails',
      mine: 'true',
      maxResults: maxResults.toString()
    });
    
    return response.items || [];
  } catch (error) {
    console.error('[YouTube API] Error fetching playlists:', error);
    throw error;
  }
}

/**
 * Get videos from a playlist
 */
export async function getPlaylistVideos(playlistId, maxResults = 50) {
  try {
    const response = await makeAuthenticatedRequest('/playlistItems', {
      part: 'snippet,contentDetails',
      playlistId: playlistId,
      maxResults: maxResults.toString()
    });
    
    return response.items || [];
  } catch (error) {
    console.error('[YouTube API] Error fetching playlist videos:', error);
    throw error;
  }
}

/**
 * Search YouTube videos
 */
export async function searchVideos(query, maxResults = 10, type = 'video') {
  try {
    const response = await makePublicRequest('/search', {
      part: 'snippet',
      q: query,
      type: type,
      maxResults: maxResults.toString(),
      videoCategoryId: '10' // Music category - good for ambient/focus sounds
    });
    
    return response.items || [];
  } catch (error) {
    console.error('[YouTube API] Error searching videos:', error);
    throw error;
  }
}

/**
 * Get video details
 */
export async function getVideoDetails(videoId) {
  try {
    const response = await makePublicRequest('/videos', {
      part: 'snippet,contentDetails,statistics',
      id: videoId
    });
    
    return response.items?.[0] || null;
  } catch (error) {
    console.error('[YouTube API] Error fetching video details:', error);
    throw error;
  }
}

/**
 * Search videos specifically for ambient/focus music
 */
export async function searchAmbientMusic(query = 'ambient music focus study', maxResults = 20) {
  const searchQueries = [
    `${query} lofi`,
    `${query} instrumental`,
    `${query} background music`,
    `${query} study music`
  ];
  
  const allResults = [];
  
  for (const searchQuery of searchQueries) {
    try {
      const results = await searchVideos(searchQuery, Math.ceil(maxResults / searchQueries.length));
      allResults.push(...results);
    } catch (error) {
      console.warn(`[YouTube API] Error searching for "${searchQuery}":`, error);
    }
  }
  
  // Remove duplicates based on video ID
  const uniqueResults = allResults.reduce((acc, video) => {
    const videoId = video.id.videoId;
    if (!acc.find(v => v.id.videoId === videoId)) {
      acc.push(video);
    }
    return acc;
  }, []);
  
  return uniqueResults.slice(0, maxResults);
}

