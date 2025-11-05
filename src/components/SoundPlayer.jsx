import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, ChevronLeft, ChevronRight } from 'lucide-react';
import useStudyStore from '../stores/studyStore';
import { TypeOfSound, Noises, Ambient } from '../types/studyTypes';
import { soundApi } from '../utils/soundApi';

// Import sounds
import brownSound from '../sounds/brown.mp3';
import cafeChatterSound from '../sounds/cafe_chatter.mp3';
import citySound from '../sounds/city.mp3';
import forestSound from '../sounds/forest.mp3';
import oceanSound from '../sounds/ocean.mp3';
import pinkSound from '../sounds/pink.mp3';
import rainSound from '../sounds/rain.mp3';
import whiteSound from '../sounds/white.mp3';

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
      audioRef.current.src = soundMap[selectedSound];
      audioRef.current.load();
      
      // If audio was playing, resume playing the new sound
      if (wasPlaying) {
        audioRef.current.play().catch(error => {
          console.error(`Error playing ${selectedSound} sound:`, error);
        });
      }
    }
  }, [selectedSound, isPlaying]);

  const currentTint = SOUND_TINTS[selectedSound] || SOUND_TINTS.forest;

  return (
    <div className="neuro-card relative overflow-hidden h-full">
      {/* Subtle ambient tint overlay */}
      <div className={`absolute inset-0 rounded-[20px] transition-opacity duration-300 ${currentTint}`}></div>

      {/* Content */}
      <div className="relative z-10 h-full p-6 flex flex-col">
        {/* Header */}
        <div className="text-center mb-6">
          <h3 className="text-xl font-semibold neuro-text-primary mb-2">
            Focus Sounds
          </h3>
          <p className="text-sm neuro-text-tertiary">
            Enhance your concentration with ambient audio
          </p>
        </div>

        {/* Sound Type Toggle */}
        <div className="mb-8">
          <div className="neuro-surface-flat p-1 rounded-2xl">
            <div className="flex">
              <button
                onClick={() => navigateSoundType('prev')}
                disabled={isAmbient}
                className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-300 ${
                  !isAmbient 
                    ? 'neuro-surface-elevated neuro-text-primary shadow-lg transform scale-[0.98]' 
                    : 'neuro-text-secondary hover:neuro-text-primary'
                }`}
              >
                <div className="text-center">
                  <div className="text-lg font-semibold">Noise</div>
                  <div className="text-xs opacity-75">Colored Noise</div>
                </div>
              </button>
              <button
                onClick={() => navigateSoundType('next')}
                disabled={!isAmbient}
                className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-300 ${
                  isAmbient 
                    ? 'neuro-surface-elevated neuro-text-primary shadow-lg transform scale-[0.98]' 
                    : 'neuro-text-secondary hover:neuro-text-primary'
                }`}
              >
                <div className="text-center">
                  <div className="text-lg font-semibold">Ambient</div>
                  <div className="text-xs opacity-75">Natural Sounds</div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Current Sound Display */}
        <div className="flex-1 mb-8">
          <div className="neuro-surface-elevated p-6 text-center h-full flex flex-col justify-center">
            {/* Sound visualization */}
            <div className="mb-4">
              <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center text-4xl mb-4 ${
                isPlaying ? 'animate-pulse' : ''
              } ${currentTint.replace('/10', '/20')}`}>
                <div className="w-8 h-8 rounded-full bg-white/20 dark:bg-white/20 light:bg-black/20"></div>
              </div>
            </div>

            {/* Sound name and description */}
            <h4 className="text-2xl font-bold neuro-text-primary mb-2">
              {SOUND_LABELS[selectedSound]}
            </h4>
            <p className="text-sm neuro-text-tertiary mb-4">
              {isAmbient ? 'Natural ambient sound' : 'Colored noise frequency'}
            </p>

            {/* Progress dots */}
            <div className="flex justify-center gap-2 mb-6">
              {currentSoundArray.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    const newSubClassification = currentSoundArray[index];
                    updateSound({ sub_classification: newSubClassification });
                  }}
                  className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-125 ${
                    soundIndex === index 
                      ? 'bg-blue-400 dark:bg-blue-500 scale-125 shadow-lg' 
                      : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                  }`}
                />
              ))}
            </div>

            {/* Navigation and status */}
            <div className="flex items-center justify-between mb-4">
              <button 
                onClick={() => navigateSound('prev')}
                className="neuro-button w-12 h-12 rounded-full flex items-center justify-center neuro-hover-lift"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              <div className="text-center">
                <div className="text-xs neuro-text-tertiary">
                  {soundIndex + 1} of {currentSoundArray.length}
                </div>
                {isPlaying && (
                  <div className="text-xs text-green-500 mt-1 flex items-center justify-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    Playing
                  </div>
                )}
              </div>
              
              <button 
                onClick={() => navigateSound('next')}
                className="neuro-button w-12 h-12 rounded-full flex items-center justify-center neuro-hover-lift"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Play/Pause Control */}
        <div className="text-center">
          <button 
            onClick={togglePlayPause} 
            className={`w-16 h-16 rounded-full font-semibold text-white shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 ${
              isPlaying 
                ? 'bg-gradient-to-br from-red-400 to-red-600 hover:from-red-500 hover:to-red-700'
                : 'bg-gradient-to-br from-green-400 to-green-600 hover:from-green-500 hover:to-green-700'
            }`}
            style={{
              boxShadow: isPlaying 
                ? '0 8px 32px rgba(239, 68, 68, 0.4), inset 0 2px 4px rgba(255, 255, 255, 0.2)'
                : '0 8px 32px rgba(34, 197, 94, 0.4), inset 0 2px 4px rgba(255, 255, 255, 0.2)'
            }}
          >
            {isPlaying ? (
              <Pause className="w-7 h-7" />
            ) : (
              <Play className="w-7 h-7 ml-1" />
            )}
          </button>
          <div className="mt-3 text-sm font-medium neuro-text-secondary">
            {isPlaying ? 'Tap to pause' : 'Tap to play'}
          </div>
        </div>

        {/* Hidden audio element */}
        <audio ref={audioRef} loop />
      </div>
    </div>
  );
}
