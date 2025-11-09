/**
 * YouTube OAuth 2.0 Authentication Utility
 * Handles client-side OAuth flow for YouTube API access
 */

const YOUTUBE_CLIENT_ID = import.meta.env.VITE_YOUTUBE_CLIENT_ID;

// Get redirect URI dynamically based on current environment
function getRedirectURI() {
  if (typeof window === 'undefined') {
    return 'http://localhost:5173/youtube-callback';
  }
  
  // Check if explicit redirect URI is set
  const envRedirect = import.meta.env.VITE_YOUTUBE_REDIRECT_URI;
  if (envRedirect) {
    return envRedirect;
  }
  
  // Auto-detect based on current origin
  return `${window.location.origin}/youtube-callback`;
}

const YOUTUBE_REDIRECT_URI = getRedirectURI();

const SCOPES = 'https://www.googleapis.com/auth/youtube.readonly';
const STORAGE_KEY = 'youtube_access_token';
const STORAGE_KEY_EXPIRY = 'youtube_token_expiry';

/**
 * Initialize Google API Client
 */
export async function initYouTubeAPI() {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.gapi) {
      reject(new Error('Google API not loaded'));
      return;
    }

    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
        apiKey: import.meta.env.VITE_YOUTUBE_API_KEY,
        clientId: YOUTUBE_CLIENT_ID,
        discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest'],
        scope: SCOPES
      }).then(() => {
        console.log('[YouTube Auth] Google API initialized');
        resolve();
      }).catch(reject);
    });
  });
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated() {
  if (typeof window === 'undefined') return false;
  
  const token = localStorage.getItem(STORAGE_KEY);
  const expiry = localStorage.getItem(STORAGE_KEY_EXPIRY);
  
  if (!token || !expiry) return false;
  
  // Check if token is expired
  const expiryTime = parseInt(expiry, 10);
  if (Date.now() >= expiryTime) {
    // Token expired, clear it
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(STORAGE_KEY_EXPIRY);
    return false;
  }
  
  return true;
}

/**
 * Get stored access token
 */
export function getAccessToken() {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(STORAGE_KEY);
}

/**
 * Authenticate user using Google Identity Services (GIS)
 */
export async function authenticateUser() {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.google) {
      reject(new Error('Google Identity Services not loaded'));
      return;
    }

    try {
      window.google.accounts.oauth2.initTokenClient({
        client_id: YOUTUBE_CLIENT_ID,
        scope: SCOPES,
        callback: (response) => {
          if (response.error) {
            reject(new Error(response.error));
            return;
          }
          
          // Store token and expiry
          const expiryTime = Date.now() + (response.expires_in * 1000);
          localStorage.setItem(STORAGE_KEY, response.access_token);
          localStorage.setItem(STORAGE_KEY_EXPIRY, expiryTime.toString());
          
          console.log('[YouTube Auth] Authentication successful');
          resolve(response.access_token);
        },
      }).requestAccessToken();
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * Disconnect user account
 */
export function disconnectAccount() {
  if (typeof window === 'undefined') return;
  
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(STORAGE_KEY_EXPIRY);
  
  // Revoke token if gapi is available
  if (window.gapi && window.gapi.auth2) {
    const authInstance = window.gapi.auth2.getAuthInstance();
    if (authInstance && authInstance.isSignedIn.get()) {
      authInstance.signOut();
    }
  }
  
  console.log('[YouTube Auth] Account disconnected');
}

/**
 * Refresh access token if needed
 */
export async function refreshTokenIfNeeded() {
  if (isAuthenticated()) {
    return getAccessToken();
  }
  
  // Token expired or doesn't exist, need to re-authenticate
  return null;
}

