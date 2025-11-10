import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Search, Play, Pause, Loader2, ChevronLeft, ChevronRight } from 'lucide-react';
import { searchAmbientMusic } from '../utils/youtubeApi';
import { createPlayer, playVideo, pauseVideo, loadVideo, destroyPlayer, isPlaying } from '../utils/youtubePlayer';

const SOUND_LABELS = {
  white: 'White Noise',
  pink: 'Pink Noise', 
  brown: 'Brown Noise',
  forest: 'Forest',
  rain: 'Rain',
  city: 'City',
  ocean: 'Ocean',
  cafe_chatter: 'Café Chatter'
};

const YouTubeIntegrationOverlay = ({ 
  isOpen, 
  onClose, 
  onVideoSelect,
  // Sound selection props
  currentSound,
  selectedSound,
  soundIndex,
  currentSoundArray,
  isAmbient,
  onNavigateSoundType,
  onNavigateSound,
  onTogglePlayPause,
  isPlaying,
  // YouTube state props
  currentYouTubeVideo,
  isUsingYouTube,
  onUsingYouTubeChange,
  onPlayingChange
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [currentVideoId, setCurrentVideoId] = useState(null);
  const [playerReady, setPlayerReady] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);

  // Don't destroy player on unmount - let it persist for main card control


  // Search YouTube videos
  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setSearching(true);
    try {
      // Search for ambient/focus music
      const results = await searchAmbientMusic(searchQuery, 20);
      setSearchResults(results);
    } catch (error) {
      console.error('[YouTube] Search error:', error);
      alert('Failed to search videos. Please try again.');
    } finally {
      setSearching(false);
    }
  };

  // Handle video selection
  const handleVideoSelect = async (video) => {
    const videoId = video.id?.videoId || video.contentDetails?.videoId || video.snippet?.resourceId?.videoId;
    if (!videoId) return;

    // Always use main container (hidden in main component) for persistence
    const containerId = 'youtube-player-container';
    
    // Check if player already exists
    const { getPlayerState, getCurrentVideoId } = await import('../utils/youtubePlayer');
    const existingState = getPlayerState();
    const existingVideoId = getCurrentVideoId();
    
    // Create player if not exists
    if (existingState === null || !existingVideoId) {
      try {
        // Wait a bit for main component container to be available
        await new Promise(resolve => setTimeout(resolve, 100));
        
        const player = await createPlayer(containerId, videoId, { loop: true });
        setPlayerReady(true);
        setCurrentVideoId(videoId);
        // Auto-play the video
        setTimeout(() => {
          playVideo();
          setVideoPlaying(true);
        }, 500);
      } catch (error) {
        console.error('[YouTube] Error creating player:', error);
        alert('Failed to load video player.');
        return;
      }
    } else {
      // Player exists, just load new video
      setPlayerReady(true);
      loadVideo(videoId);
      setCurrentVideoId(videoId);
      // Auto-play the video
      setTimeout(() => {
        playVideo();
        setVideoPlaying(true);
      }, 300);
    }

    // Notify parent component
    if (onVideoSelect) {
      onVideoSelect({
        videoId,
        title: video.snippet?.title,
        thumbnail: video.snippet?.thumbnails?.default?.url,
        channelTitle: video.snippet?.channelTitle
      });
    }
    
    // Update parent state
    if (onUsingYouTubeChange) {
      onUsingYouTubeChange(true);
    }
    // Set playing state after a short delay to ensure video starts
    setTimeout(() => {
      if (onPlayingChange) {
        onPlayingChange(true);
      }
    }, 500);
  };

  // Toggle play/pause for YouTube video
  const toggleYouTubePlayPause = () => {
    if (videoPlaying) {
      pauseVideo();
      setVideoPlaying(false);
      if (onPlayingChange) {
        onPlayingChange(false);
      }
    } else {
      playVideo();
      setVideoPlaying(true);
      if (onPlayingChange) {
        onPlayingChange(true);
      }
    }
  };
  
  // Handle default sound play/pause from overlay
  const handleDefaultSoundToggle = async () => {
    // Stop YouTube if playing
    if (currentVideoId && videoPlaying) {
      pauseVideo();
      setVideoPlaying(false);
      setCurrentVideoId(null);
      if (onUsingYouTubeChange) {
        onUsingYouTubeChange(false);
      }
    }
    
    // Call parent's toggle function (this will handle starting default sound)
    if (onTogglePlayPause) {
      await onTogglePlayPause();
    }
  };

  // Check player state periodically and sync with parent
  useEffect(() => {
    if (!playerReady || !currentVideoId) return;

    const interval = setInterval(() => {
      const playing = isPlaying();
      setVideoPlaying(playing);
      // Sync with parent component
      if (onPlayingChange && playing !== isPlaying) {
        onPlayingChange(playing);
      }
    }, 500);

    return () => clearInterval(interval);
  }, [playerReady, currentVideoId, isPlaying, onPlayingChange]);

  // Sync player state when overlay opens and detect existing player
  useEffect(() => {
    if (isOpen && currentYouTubeVideo) {
      // Check if player already exists
      const checkPlayer = async () => {
        const { getPlayerState, isPlaying: ytIsPlaying, getCurrentVideoId } = await import('../utils/youtubePlayer');
        const state = getPlayerState();
        const existingVideoId = getCurrentVideoId();
        
        if (state !== null && existingVideoId) {
          // Player already exists, mark as ready
          setPlayerReady(true);
          if (existingVideoId !== currentVideoId) {
            setCurrentVideoId(existingVideoId);
          }
          
          // Sync playing state
          const playing = ytIsPlaying();
          setVideoPlaying(playing);
          if (onPlayingChange) {
            onPlayingChange(playing);
          }
        }
      };
      checkPlayer();
    }
  }, [isOpen, currentYouTubeVideo, onPlayingChange]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 bg-black/50 flex items-start justify-center z-50 px-3 pt-20 pb-3 md:p-4 md:items-center">
      <div 
        className="neumorphic-timer-card-container w-full max-w-[95%] md:max-w-4xl h-[calc(100vh-6rem)] md:h-[80vh] overflow-hidden rounded-lg md:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-white/20 dark:border-white/20 light:border-[rgba(116,200,163,0.3)] bg-black/20 dark:bg-black/20 light:bg-[rgba(116,200,163,0.15)]">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-white dark:text-white light:text-black">
              YouTube Music
            </h2>
            <p className="text-sm md:text-base text-white/80 dark:text-white/80 light:text-black/70">
              Search and play YouTube videos for focus and ambient sounds
            </p>
          </div>
          <button
            onClick={onClose}
            className="neumorphic-matrix-close-button min-h-[44px] min-w-[44px] md:min-h-0 md:min-w-0"
          >
            <X className="w-5 h-5 md:w-4 md:h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 md:p-6 h-[calc(100vh-6rem-120px)] md:max-h-[calc(80vh-120px)] overflow-y-auto neumorphic-scrollbar">
          {/* Sound Selection Section */}
          {currentSound && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-white dark:text-white light:text-black mb-4">
                Default Sound Options
              </h3>
              
              {/* Sound Type Navigation */}
              <div className="mb-4">
                <div className="flex items-center justify-between bg-black/20 dark:bg-black/20 light:bg-[rgba(116,200,163,0.1)] rounded-lg p-3 backdrop-blur-sm">
                  <button 
                    onClick={async () => {
                      // Stop YouTube if playing
                      if (currentVideoId && videoPlaying) {
                        pauseVideo();
                        setVideoPlaying(false);
                        setCurrentVideoId(null);
                        if (onUsingYouTubeChange) {
                          onUsingYouTubeChange(false);
                        }
                        if (onPlayingChange) {
                          onPlayingChange(false);
                        }
                      }
                      onNavigateSoundType('prev');
                    }}
                    className={`neumorphic-sound-button min-h-[44px] min-w-[44px] md:min-h-0 md:min-w-0 ${
                      isAmbient ? 'opacity-50' : ''
                    }`}
                    disabled={isAmbient}
                  >
                    <ChevronLeft className="w-5 h-5 md:w-4 md:h-4" />
                  </button>
                  
                  <div className="text-center flex-1">
                    <p className="text-base md:text-lg font-semibold text-white dark:text-white light:text-black">
                      {isAmbient ? 'Ambient' : 'Noise'}
                    </p>
                    <p className="text-xs text-white/60 dark:text-white/60 light:text-black/60">
                      {isAmbient ? 'Natural Sounds' : 'Colored Noise'}
                    </p>
                  </div>
                  
                  <button 
                    onClick={async () => {
                      // Stop YouTube if playing
                      if (currentVideoId && videoPlaying) {
                        pauseVideo();
                        setVideoPlaying(false);
                        setCurrentVideoId(null);
                        if (onUsingYouTubeChange) {
                          onUsingYouTubeChange(false);
                        }
                        if (onPlayingChange) {
                          onPlayingChange(false);
                        }
                      }
                      onNavigateSoundType('next');
                    }}
                    className={`neumorphic-sound-button min-h-[44px] min-w-[44px] md:min-h-0 md:min-w-0 ${
                      !isAmbient ? 'opacity-50' : ''
                    }`}
                    disabled={!isAmbient}
                  >
                    <ChevronRight className="w-5 h-5 md:w-4 md:h-4" />
                  </button>
                </div>
              </div>

              {/* Specific Sound Navigation */}
              <div className="mb-4">
                <div className="flex items-center justify-between bg-black/20 dark:bg-black/20 light:bg-[rgba(116,200,163,0.1)] rounded-lg p-3 backdrop-blur-sm">
                  <button 
                    onClick={async () => {
                      // Stop YouTube if playing
                      if (currentVideoId && videoPlaying) {
                        pauseVideo();
                        setVideoPlaying(false);
                        setCurrentVideoId(null);
                        if (onUsingYouTubeChange) {
                          onUsingYouTubeChange(false);
                        }
                        if (onPlayingChange) {
                          onPlayingChange(false);
                        }
                      }
                      onNavigateSound('prev');
                    }}
                    className="neumorphic-sound-button min-h-[44px] min-w-[44px] md:min-h-0 md:min-w-0"
                  >
                    <ChevronLeft className="w-5 h-5 md:w-4 md:h-4" />
                  </button>
                  
                  <div className="text-center flex-1">
                    <p className="text-base md:text-lg font-semibold text-white dark:text-white light:text-black">
                      {SOUND_LABELS[selectedSound] || selectedSound}
                    </p>
                    <div className="flex justify-center mt-2 space-x-1">
                      {currentSoundArray.map((_, index) => (
                        <div 
                          key={index}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            soundIndex === index ? 'bg-white dark:bg-white light:bg-[#DDE7E0] shadow-lg scale-125' : 'bg-white/50 dark:bg-white/50 light:bg-black/50'
                          }`}
                        ></div>
                      ))}
                    </div>
                    <p className="text-xs text-white/60 dark:text-white/60 light:text-black/60 mt-1">
                      {soundIndex + 1} of {currentSoundArray.length}
                    </p>
                  </div>
                  
                  <button 
                    onClick={async () => {
                      // Stop YouTube if playing
                      if (currentVideoId && videoPlaying) {
                        pauseVideo();
                        setVideoPlaying(false);
                        setCurrentVideoId(null);
                        if (onUsingYouTubeChange) {
                          onUsingYouTubeChange(false);
                        }
                        if (onPlayingChange) {
                          onPlayingChange(false);
                        }
                      }
                      onNavigateSound('next');
                    }}
                    className="neumorphic-sound-button min-h-[44px] min-w-[44px] md:min-h-0 md:min-w-0"
                  >
                    <ChevronRight className="w-5 h-5 md:w-4 md:h-4" />
                  </button>
                </div>
              </div>

              {/* Play/Pause Button for Default Sound */}
              <div className="flex justify-center items-center mb-4">
                <button
                  onClick={handleDefaultSoundToggle}
                  className="neumorphic-play-button min-h-[56px] min-w-[56px] md:min-h-0 md:min-w-0"
                >
                  {isPlaying && !isUsingYouTube ? (
                    <Pause className="w-7 h-7 md:w-6 md:h-6" />
                  ) : (
                    <Play className="w-7 h-7 md:w-6 md:h-6 ml-1" />
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Divider */}
          <div className="border-t border-white/10 dark:border-white/10 light:border-black/10 mb-6"></div>

          {/* YouTube Player Container - Shows player from main container */}
          {currentYouTubeVideo && currentVideoId && (
            <div className="mb-6 p-4 bg-black/20 dark:bg-black/20 light:bg-[rgba(116,200,163,0.1)] rounded-lg">
              <h3 className="text-lg font-semibold text-white dark:text-white light:text-black mb-3">
                Now Playing
              </h3>
              <div className="aspect-video bg-black rounded-lg mb-3 relative">
                {/* Display the player from main container - clone it or show it here */}
                <div id="youtube-player-container-overlay" className="w-full h-full">
                  {/* Player is in main container, this is just for display in overlay */}
                  <div className="w-full h-full flex items-center justify-center text-white/60">
                    <p className="text-sm">Video playing in background</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={toggleYouTubePlayPause}
                  className="neumorphic-play-button min-h-[44px] min-w-[44px]"
                >
                  {videoPlaying ? (
                    <Pause className="w-5 h-5" />
                  ) : (
                    <Play className="w-5 h-5 ml-1" />
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Search YouTube */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-white dark:text-white light:text-black mb-4">
              Search YouTube
            </h3>
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="Search for ambient music, focus sounds..."
                className="neumorphic-input flex-1"
              />
              <button
                onClick={handleSearch}
                disabled={searching || !searchQuery.trim()}
                className="neumorphic-matrix-button px-4 py-2 flex items-center gap-2"
              >
                {searching ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Search className="w-4 h-4" />
                )}
                Search
              </button>
            </div>

            {/* Search Results */}
            {searchResults.length > 0 && (
              <div className="space-y-2 max-h-96 overflow-y-auto neumorphic-scrollbar">
                {searchResults.map((video) => {
                  const videoId = video.id?.videoId;
                  if (!videoId) return null;

                  return (
                    <div
                      key={videoId}
                      className="p-3 bg-black/20 dark:bg-black/20 light:bg-[rgba(116,200,163,0.1)] rounded-lg cursor-pointer hover:bg-black/30 dark:hover:bg-black/30 light:hover:bg-[rgba(116,200,163,0.2)] transition-colors flex items-center gap-3"
                      onClick={() => handleVideoSelect(video)}
                    >
                      <img
                        src={video.snippet?.thumbnails?.default?.url || ''}
                        alt={video.snippet?.title}
                        className="w-16 h-12 object-cover rounded flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-white dark:text-white light:text-black text-sm truncate">
                          {video.snippet?.title}
                        </p>
                        <p className="text-xs text-white/60 dark:text-white/60 light:text-black/60">
                          {video.snippet?.channelTitle}
                        </p>
                      </div>
                      <button className="neumorphic-sound-button min-h-[32px] min-w-[32px]">
                        <Play className="w-4 h-4" />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default YouTubeIntegrationOverlay;

