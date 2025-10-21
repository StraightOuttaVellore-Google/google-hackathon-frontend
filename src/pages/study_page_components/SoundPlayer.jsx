import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, ChevronLeft, ChevronRight } from 'lucide-react';
import useStudyStore from '../../stores/studyStore';
import { TypeOfSound, Noises, Ambient } from '../../types/studyTypes';
import { soundApi } from '../../utils/soundApi';

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

  // Toggle play/pause
  const togglePlayPause = async () => {
    if (audioRef.current) {
      if (isPlaying) {
        // Stopping playback
        audioRef.current.pause();
        await endCurrentSession(false);
      } else {
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
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Update audio source when selected sound changes
  useEffect(() => {
    if (audioRef.current && selectedSound) {
      const wasPlaying = isPlaying;
      audioRef.current.src = `/src/sounds/${selectedSound}.mp3`;
      audioRef.current.load();
      
      // If audio was playing, resume playing the new sound
      if (wasPlaying) {
        audioRef.current.play().catch(error => {
          console.error(`Error playing ${selectedSound} sound:`, error);
        });
      }
    }
  }, [selectedSound, isPlaying]);

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
        <div className="h-full p-6">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="text-center mb-6">
          <h3 className="text-lg font-semibold text-white dark:text-white light:text-black mb-2">
            Ambient & Focus
          </h3>
          <p className="text-sm text-white/80 dark:text-white/80 light:text-black/70">
            Choose your focus sound
          </p>
        </div>

        {/* Sound Type Navigation */}
        <div className="mb-6">
          <div className="flex items-center justify-between bg-black/20 dark:bg-black/20 light:bg-white/20 rounded-lg p-3 backdrop-blur-sm">
            <button 
              onClick={() => navigateSoundType('prev')}
              className={`neumorphic-sound-button ${
                isAmbient ? 'opacity-50' : ''
              }`}
              disabled={isAmbient}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            
            <div className="text-center flex-1">
              <p className="text-lg font-semibold text-white dark:text-white light:text-black">
                {isAmbient ? 'Ambient' : 'Noise'}
              </p>
              <p className="text-xs text-white/60 dark:text-white/60 light:text-black/60">
                {isAmbient ? 'Natural Sounds' : 'Colored Noise'}
              </p>
            </div>
            
            <button 
              onClick={() => navigateSoundType('next')}
              className={`neumorphic-sound-button ${
                !isAmbient ? 'opacity-50' : ''
              }`}
              disabled={!isAmbient}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Specific Sound Navigation */}
        <div className="mb-6 flex-1">
          <div className="flex items-center justify-between bg-black/20 dark:bg-black/20 light:bg-white/20 rounded-lg p-3 backdrop-blur-sm">
            <button 
              onClick={() => navigateSound('prev')}
              className="neumorphic-sound-button"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            
            <div className="text-center flex-1">
              <p className="text-lg font-semibold text-white dark:text-white light:text-black">
                {SOUND_LABELS[selectedSound]}
              </p>
              <div className="flex justify-center mt-2 space-x-1">
                {currentSoundArray.map((_, index) => (
                  <div 
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      soundIndex === index ? 'bg-white dark:bg-white light:bg-black shadow-lg scale-125' : 'bg-white/50 dark:bg-white/50 light:bg-black/50'
                    }`}
                  ></div>
                ))}
              </div>
              <p className="text-xs text-white/60 dark:text-white/60 light:text-black/60 mt-1">
                {soundIndex + 1} of {currentSoundArray.length}
              </p>
            </div>
            
            <button 
              onClick={() => navigateSound('next')}
              className="neumorphic-sound-button"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Play/Pause Button */}
        <div className="flex justify-center items-center flex-1">
          <button
            onClick={togglePlayPause}
            className="neumorphic-play-button"
          >
            {isPlaying ? (
              <Pause className="w-6 h-6" />
            ) : (
              <Play className="w-6 h-6 ml-1" />
            )}
          </button>
        </div>

        {/* Hidden audio element */}
        <audio ref={audioRef} loop />
        </div>
        </div>
      </div>
    </div>
  );
}