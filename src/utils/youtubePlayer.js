/**
 * YouTube IFrame Player API Utility
 * Handles YouTube video playback
 */

let youtubePlayer = null;
let playerReady = false;
let onPlayerReadyCallback = null;

/**
 * Initialize YouTube IFrame Player API
 */
export function loadYouTubePlayerAPI() {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      reject(new Error('Window object not available'));
      return;
    }

    // Check if API is already loaded
    if (window.YT && window.YT.Player) {
      resolve();
      return;
    }

    // Check if API is loading
    if (window.onYouTubeIframeAPIReady) {
      const originalCallback = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        originalCallback();
        resolve();
      };
      return;
    }

    // Set up callback for when API loads
    window.onYouTubeIframeAPIReady = () => {
      console.log('[YouTube Player] API loaded');
      resolve();
    };

    // If script hasn't loaded yet, wait a bit
    setTimeout(() => {
      if (window.YT && window.YT.Player) {
        resolve();
      } else {
        reject(new Error('YouTube IFrame API failed to load'));
      }
    }, 2000);
  });
}

/**
 * Create YouTube player instance
 */
export function createPlayer(containerId, videoId, options = {}) {
  return new Promise((resolve, reject) => {
    loadYouTubePlayerAPI().then(() => {
      if (!window.YT || !window.YT.Player) {
        reject(new Error('YouTube IFrame API not available'));
        return;
      }

      const defaultOptions = {
        height: '100%',
        width: '100%',
        videoId: videoId,
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          enablejsapi: 1,
          fs: 0,
          iv_load_policy: 3,
          modestbranding: 1,
          playsinline: 1,
          rel: 0,
          showinfo: 0,
          loop: 1,
          playlist: videoId // Required for loop to work
        },
        events: {
          onReady: (event) => {
            console.log('[YouTube Player] Player ready');
            playerReady = true;
            youtubePlayer = event.target;
            if (onPlayerReadyCallback) {
              onPlayerReadyCallback();
            }
            resolve(event.target);
          },
          onError: (event) => {
            console.error('[YouTube Player] Error:', event.data);
            reject(new Error(`YouTube player error: ${event.data}`));
          },
          onStateChange: (event) => {
            // Handle state changes if needed
            if (event.data === window.YT.PlayerState.ENDED) {
              // Video ended, restart if looping
              if (options.loop) {
                event.target.playVideo();
              }
            }
          }
        }
      };

      const playerOptions = { ...defaultOptions, ...options };
      youtubePlayer = new window.YT.Player(containerId, playerOptions);
    }).catch(reject);
  });
}

/**
 * Play video
 */
export function playVideo() {
  if (youtubePlayer && playerReady) {
    youtubePlayer.playVideo();
  } else {
    console.warn('[YouTube Player] Player not ready');
  }
}

/**
 * Pause video
 */
export function pauseVideo() {
  if (youtubePlayer && playerReady) {
    youtubePlayer.pauseVideo();
  } else {
    console.warn('[YouTube Player] Player not ready');
  }
}

/**
 * Load video by ID
 */
export function loadVideo(videoId) {
  if (youtubePlayer && playerReady) {
    youtubePlayer.loadVideoById({
      videoId: videoId,
      startSeconds: 0
    });
  } else {
    console.warn('[YouTube Player] Player not ready');
  }
}

/**
 * Get current video ID
 */
export function getCurrentVideoId() {
  if (youtubePlayer && playerReady) {
    return youtubePlayer.getVideoData().video_id;
  }
  return null;
}

/**
 * Get player state
 */
export function getPlayerState() {
  if (youtubePlayer && playerReady) {
    return youtubePlayer.getPlayerState();
  }
  return null;
}

/**
 * Check if video is playing
 */
export function isPlaying() {
  const state = getPlayerState();
  return state === window.YT?.PlayerState?.PLAYING;
}

/**
 * Set volume (0-100)
 */
export function setVolume(volume) {
  if (youtubePlayer && playerReady) {
    youtubePlayer.setVolume(volume);
  }
}

/**
 * Get volume
 */
export function getVolume() {
  if (youtubePlayer && playerReady) {
    return youtubePlayer.getVolume();
  }
  return 50;
}

/**
 * Destroy player instance
 */
export function destroyPlayer() {
  if (youtubePlayer) {
    try {
      youtubePlayer.destroy();
    } catch (error) {
      console.warn('[YouTube Player] Error destroying player:', error);
    }
    youtubePlayer = null;
    playerReady = false;
  }
}

/**
 * Set callback for when player is ready
 */
export function setOnPlayerReady(callback) {
  onPlayerReadyCallback = callback;
  if (playerReady && youtubePlayer) {
    callback();
  }
}

