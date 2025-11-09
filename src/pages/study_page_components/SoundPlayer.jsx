import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, ChevronLeft, ChevronRight } from 'lucide-react';
import useStudyStore from '../../stores/studyStore';
import { TypeOfSound, Noises, Ambient } from '../../types/studyTypes';
import { soundApi } from '../../utils/soundApi';
import YouTubeIntegrationOverlay from '../../components/YouTubeIntegrationOverlay';

// Import sounds
import brownSound from '../../sounds/brown.mp3';
import cafeChatterSound from '../../sounds/cafe_chatter.mp3';
import citySound from '../../sounds/city.mp3';
import forestSound from '../../sounds/forest.mp3';
import oceanSound from '../../sounds/ocean.mp3';
import pinkSound from '../../sounds/pink.mp3';
import rainSound from '../../sounds/rain.mp3';
import whiteSound from '../../sounds/white.mp3';

const soundMap = {
  brown: brownSound,
  cafe_chatter: cafeChatterSound,
  city: citySound,
  forest: forestSound,
  ocean: oceanSound,
  pink: pinkSound,
  rain: rainSound,
  white: whiteSound,
};


// Convert enums to arrays for slider navigation
const NOISE_ARRAY = Object.values(Noises);
const AMBIENT_ARRAY = Object.values(Ambient);

// Subtle tint overlays for different sound types
const SOUND_TINTS = {
  // Noise tints
  white: 'bg-gray-500/10',
  pink: 'bg-pink-500/10',
  brown: 'bg-amber-500/10',
  
  // Ambient tints
  forest: 'bg-green-500/10',
  rain: 'bg-blue-500/10',
  city: 'bg-gray-600/10',
  ocean: 'bg-cyan-500/10',
  cafe_chatter: 'bg-orange-500/10'
};

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

export default function SoundPlayer() {
  const { studyData, updateSound } = useStudyStore();
  const sound = studyData.sound;
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSessionId, setCurrentSessionId] = useState(null);
  const [isYouTubeOverlayOpen, setIsYouTubeOverlayOpen] = useState(false);
  const [currentYouTubeVideo, setCurrentYouTubeVideo] = useState(null);
  const [isUsingYouTube, setIsUsingYouTube] = useState(false);
  const audioRef = useRef(null);
  
  // Get current sound type and array
  const isAmbient = sound.class_of_noise === TypeOfSound.AMBIENT;
  const currentSoundArray = isAmbient ? AMBIENT_ARRAY : NOISE_ARRAY;
  const soundIndex = currentSoundArray.findIndex(s => s === sound.sub_classification);
  const selectedSound = currentSoundArray[soundIndex] || currentSoundArray[0];

  // Handle ending current session and optionally starting a new one
  const endCurrentSession = async (startNew = false, newSoundType = null, newSoundName = null) => {
    if (currentSessionId) {
      try {
        await soundApi.endSession(currentSessionId);
      } catch (error) {
        // Silently fail - don't disrupt user experience
        console.warn('Failed to end sound session:', error);
      }
      setCurrentSessionId(null);
    }

    if (startNew && newSoundType && newSoundName) {
      try {
        const response = await soundApi.startSession(newSoundType, newSoundName);
        setCurrentSessionId(response.session_id);
      } catch (error) {
        // Silently fail - don't disrupt user experience
        console.warn('Failed to start new sound session:', error);
      }
    }
  };

  // Handle sound type navigation
  const navigateSoundType = (direction) => {
    const wasPlaying = isPlaying;
    const newType = direction === 'next' ? TypeOfSound.NOISE : TypeOfSound.AMBIENT;
    const newArray = newType === TypeOfSound.AMBIENT ? AMBIENT_ARRAY : NOISE_ARRAY;
    const newSubClassification = newArray[0];
    
    // If playing, end current session and start new one
    if (wasPlaying) {
      endCurrentSession(true, newType, newSubClassification);
    } else {
      setCurrentSessionId(null);
    }
    
    updateSound({
      class_of_noise: newType,
      sub_classification: newSubClassification
    });
    
    if (wasPlaying) {
      setIsPlaying(true);
    }
  };

  // Handle specific sound navigation
  const navigateSound = (direction) => {
    const wasPlaying = isPlaying;
    let newIndex;
    if (direction === 'next') {
      newIndex = (soundIndex + 1) % currentSoundArray.length;
    } else {
      newIndex = (soundIndex - 1 + currentSoundArray.length) % currentSoundArray.length;
    }
    
    const newSubClassification = currentSoundArray[newIndex];
    
    // If playing, end current session and start new one
    if (wasPlaying) {
      endCurrentSession(true, sound.class_of_noise, newSubClassification);
    } else {
      setCurrentSessionId(null);
    }
    
    updateSound({
      sub_classification: newSubClassification
    });
    
    if (wasPlaying) {
      setIsPlaying(true);
    }
  };

  // Toggle play/pause - handles both default sounds and YouTube videos
  const togglePlayPause = async () => {
    if (isUsingYouTube && currentYouTubeVideo) {
      // Handle YouTube video play/pause
      const { playVideo, pauseVideo, isPlaying: ytIsPlaying } = await import('../../utils/youtubePlayer');
      if (ytIsPlaying()) {
        pauseVideo();
        setIsPlaying(false);
      } else {
        playVideo();
        setIsPlaying(true);
      }
    } else if (audioRef.current) {
      // Handle default sound play/pause
      if (isPlaying) {
        // Stopping playback
        audioRef.current.pause();
        await endCurrentSession(false);
        setIsPlaying(false);
      } else {
        // Stop YouTube if playing
        if (isUsingYouTube && currentYouTubeVideo) {
          const { pauseVideo, destroyPlayer } = await import('../../utils/youtubePlayer');
          pauseVideo();
          destroyPlayer();
          setCurrentYouTubeVideo(null);
          setIsUsingYouTube(false);
        }
        
        // Starting playback - create new session
        try {
          const response = await soundApi.startSession(sound.class_of_noise, sound.sub_classification);
          setCurrentSessionId(response.session_id);
        } catch (error) {
          console.warn('Failed to start session, continuing with playback:', error);
        }

        // Load and play the audio file
        audioRef.current.play().catch(error => {
          console.error(`Error playing ${selectedSound} sound:`, error);
        });
        console.log(`Playing ${selectedSound} sound`);
        setIsPlaying(true);
      }
    }
  };

  // Update audio source when selected sound changes
  useEffect(() => {
    if (audioRef.current && selectedSound && !isUsingYouTube) {
      const wasPlaying = isPlaying;
      audioRef.current.src = soundMap[selectedSound];
      audioRef.current.load();
      
      // If audio was playing, resume playing the new sound
      if (wasPlaying) {
        audioRef.current.play().catch(error => {
          console.error(`Error playing ${selectedSound} sound:`, error);
        });
      }
    }
  }, [selectedSound, isPlaying, isUsingYouTube]);

  // Sync YouTube player state with main card
  useEffect(() => {
    if (isUsingYouTube && currentYouTubeVideo) {
      const checkYouTubeState = async () => {
        const { isPlaying: ytIsPlaying } = await import('../../utils/youtubePlayer');
        const playing = ytIsPlaying();
        if (playing !== isPlaying) {
          setIsPlaying(playing);
        }
      };
      
      const interval = setInterval(checkYouTubeState, 500);
      return () => clearInterval(interval);
    }
  }, [isUsingYouTube, currentYouTubeVideo, isPlaying]);

  // Get the dynamic card class based on selected sound
  const getMusicCardClass = () => {
    const baseClass = 'neumorphic-music-card';
    const colorClass = `neumorphic-music-card-${selectedSound}`;
    return `${baseClass} ${colorClass}`;
  };

  return (
    <div className="h-full rounded-2xl relative overflow-hidden">
      {/* Neumorphic Music Card */}
      <div className={`h-full ${getMusicCardClass()}`}>
        {/* Content */}
        <div className="h-full p-6 flex flex-col">
          {/* Header */}
          <div className="text-center mb-4 md:mb-6 flex-shrink-0">
            <h3 className="text-base md:text-lg font-semibold text-white dark:text-white light:text-black mb-2">
              Ambient & Focus
            </h3>
            <p className="text-xs md:text-sm text-white/80 dark:text-white/80 light:text-black/70">
              {isUsingYouTube ? 'YouTube Video' : 'Choose your focus sound'}
            </p>
            {isUsingYouTube && currentYouTubeVideo && (
              <p className="text-xs text-white/60 dark:text-white/60 light:text-black/60 mt-1 truncate px-8">
                {currentYouTubeVideo.title}
              </p>
            )}
          </div>

          {/* Small Card with Current Sound and Play/Pause */}
          <div 
            onClick={() => setIsYouTubeOverlayOpen(true)}
            className="neumorphic-button-selected p-4 mb-2 mt-4 cursor-pointer flex items-center justify-between gap-4 flex-shrink-0"
          >
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white dark:text-white light:text-black truncate">
                {isUsingYouTube && currentYouTubeVideo 
                  ? currentYouTubeVideo.title 
                  : SOUND_LABELS[selectedSound]}
              </p>
              <p className="text-xs text-white/60 dark:text-white/60 light:text-black/60 mt-1">
                {isUsingYouTube 
                  ? 'YouTube Music' 
                  : `${isAmbient ? 'Ambient' : 'Noise'} • ${soundIndex + 1} of ${currentSoundArray.length}`}
              </p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                togglePlayPause();
              }}
              className="neumorphic-play-button min-h-[40px] min-w-[40px] flex-shrink-0"
            >
              {isPlaying && ((isUsingYouTube && currentYouTubeVideo) || (!isUsingYouTube && audioRef.current)) ? (
                <Pause className="w-4 h-4" />
              ) : (
                <Play className="w-4 h-4 ml-0.5" />
              )}
            </button>
          </div>

          {/* Open YouTube Music Button */}
          <div className="flex-shrink-0 mt-4">
            <button
              onClick={() => setIsYouTubeOverlayOpen(true)}
              className="w-full neumorphic-button-selected py-3 px-4 text-sm font-medium transition-all duration-500 flex items-center justify-center gap-2 min-h-[44px]"
            >
              Open Youtube Music
            </button>
          </div>

          {/* Hidden audio element */}
          <audio ref={audioRef} loop />
          
          {/* Hidden YouTube Player Container - always present, persists even when overlay is closed */}
          <div id="youtube-player-container" className="hidden fixed -z-10" style={{ width: '1px', height: '1px' }}></div>
        </div>
      </div>

      {/* YouTube Integration Overlay */}
      <YouTubeIntegrationOverlay
        isOpen={isYouTubeOverlayOpen}
        onClose={() => setIsYouTubeOverlayOpen(false)}
        onVideoSelect={async (video) => {
          // Stop default sound if playing
          if (audioRef.current && isPlaying) {
            audioRef.current.pause();
            await endCurrentSession(false);
          }
          
          setCurrentYouTubeVideo(video);
          setIsUsingYouTube(true);
          setIsPlaying(true);
        }}
        currentYouTubeVideo={currentYouTubeVideo}
        isUsingYouTube={isUsingYouTube}
        onUsingYouTubeChange={setIsUsingYouTube}
        onPlayingChange={setIsPlaying}
        // Sound selection props
        currentSound={sound}
        selectedSound={selectedSound}
        soundIndex={soundIndex}
        currentSoundArray={currentSoundArray}
        isAmbient={isAmbient}
        onNavigateSoundType={navigateSoundType}
        onNavigateSound={navigateSound}
        onTogglePlayPause={togglePlayPause}
        isPlaying={isPlaying}
      />
    </div>
  );
}
