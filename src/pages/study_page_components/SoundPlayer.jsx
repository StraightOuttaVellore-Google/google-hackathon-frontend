import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, ChevronLeft, ChevronRight } from 'lucide-react';

// Sound type enums matching your backend
const NOISES = {
  WHITE: 'white',
  PINK: 'pink',
  BROWN: 'brown'
};

const AMBIENT = {
  FOREST: 'forest',
  RAIN: 'rain',
  CITY: 'city', 
  OCEAN: 'ocean',
  CAFE_CHATTER: 'cafe_chatter'
};

// Convert enums to arrays for slider navigation
const NOISE_ARRAY = Object.values(NOISES);
const AMBIENT_ARRAY = Object.values(AMBIENT);

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
  const [soundTypeIndex, setSoundTypeIndex] = useState(0); // 0 = ambient, 1 = noise
  const [soundIndex, setSoundIndex] = useState(0); // Index within the current sound array
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // Get current sound type and array
  const isAmbient = soundTypeIndex === 0;
  const currentSoundArray = isAmbient ? AMBIENT_ARRAY : NOISE_ARRAY;
  const selectedSound = currentSoundArray[soundIndex];

  // Handle sound type navigation
  const navigateSoundType = (direction) => {
    const wasPlaying = isPlaying;
    const newIndex = direction === 'next' ? 1 : 0;
    setSoundTypeIndex(newIndex);
    setSoundIndex(0); // Reset to first sound of new type
    if (wasPlaying) {
      // Keep playing state but audio will switch in useEffect
      setIsPlaying(true);
    }
  };

  // Handle specific sound navigation
  const navigateSound = (direction) => {
    const wasPlaying = isPlaying;
    if (direction === 'next') {
      setSoundIndex((prev) => (prev + 1) % currentSoundArray.length);
    } else {
      setSoundIndex((prev) => (prev - 1 + currentSoundArray.length) % currentSoundArray.length);
    }
    if (wasPlaying) {
      // Keep playing state but audio will switch in useEffect
      setIsPlaying(true);
    }
  };

  // Toggle play/pause
  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
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

  const currentTint = SOUND_TINTS[selectedSound] || SOUND_TINTS.forest;

  return (
    <div className="h-full rounded-2xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm relative overflow-hidden">
      {/* Subtle tint overlay */}
      <div className={`absolute inset-0 rounded-2xl transition-all duration-700 ${currentTint}`}></div>
      
      {/* Content */}
      <div className="relative z-10 h-full p-6">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="text-center mb-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
            Ambient & Focus
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Choose your focus sound
          </p>
        </div>

        {/* Sound Type Navigation */}
        <div className="mb-6">
          <div className="flex items-center justify-between bg-white/20 dark:bg-black/20 rounded-lg p-3 backdrop-blur-sm">
            <button 
              onClick={() => navigateSoundType('prev')}
              className={`p-2 rounded-full transition-all duration-300 ${
                soundTypeIndex === 0 
                  ? 'bg-white/50 dark:bg-gray-700/50 text-gray-400 cursor-not-allowed' 
                  : 'bg-white/80 dark:bg-gray-700/80 text-gray-700 dark:text-gray-200 hover:bg-white dark:hover:bg-gray-600 hover:scale-110'
              }`}
              disabled={soundTypeIndex === 0}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            
            <div className="text-center flex-1">
              <p className="text-lg font-semibold text-gray-800 dark:text-white">
                {isAmbient ? 'Ambient' : 'Noise'}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {isAmbient ? 'Natural Sounds' : 'Colored Noise'}
              </p>
            </div>
            
            <button 
              onClick={() => navigateSoundType('next')}
              className={`p-2 rounded-full transition-all duration-300 ${
                soundTypeIndex === 1 
                  ? 'bg-white/50 dark:bg-gray-700/50 text-gray-400 cursor-not-allowed' 
                  : 'bg-white/80 dark:bg-gray-700/80 text-gray-700 dark:text-gray-200 hover:bg-white dark:hover:bg-gray-600 hover:scale-110'
              }`}
              disabled={soundTypeIndex === 1}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Specific Sound Navigation */}
        <div className="mb-6 flex-1">
          <div className="flex items-center justify-between bg-white/20 dark:bg-black/20 rounded-lg p-3 backdrop-blur-sm">
            <button 
              onClick={() => navigateSound('prev')}
              className="p-2 rounded-full transition-all duration-300 bg-white/80 dark:bg-gray-700/80 text-gray-700 dark:text-gray-200 hover:bg-white dark:hover:bg-gray-600 hover:scale-110"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            
            <div className="text-center flex-1">
              <p className="text-lg font-semibold text-gray-800 dark:text-white">
                {SOUND_LABELS[selectedSound]}
              </p>
              <div className="flex justify-center mt-2 space-x-1">
                {currentSoundArray.map((_, index) => (
                  <div 
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      soundIndex === index ? 'bg-white shadow-lg scale-125' : 'bg-white/50'
                    }`}
                  ></div>
                ))}
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                {soundIndex + 1} of {currentSoundArray.length}
              </p>
            </div>
            
            <button 
              onClick={() => navigateSound('next')}
              className="p-2 rounded-full transition-all duration-300 bg-white/80 dark:bg-gray-700/80 text-gray-700 dark:text-gray-200 hover:bg-white dark:hover:bg-gray-600 hover:scale-110"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Play/Pause Button */}
        <div className="text-center">
          <button
            onClick={togglePlayPause}
            className="bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-700 text-gray-800 dark:text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white/30"
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
  );
}