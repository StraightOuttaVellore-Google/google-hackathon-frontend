import React, { useState } from 'react';
import { Volume2, VolumeX, Heart, Music } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Button } from '../ui/Button';
import { useStudyStore } from '../../store/studyStore';
import { Ambient, TypeOfSound } from '../../types/study.js';

const AmbientCard = ({ className }) => {
  const { studyData } = useStudyStore();
  const [selectedSound, setSelectedSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [favorites, setFavorites] = useState([]);

  const ambientSounds = [
    { id: 'rain', name: 'Rain', icon: '🌧️', type: Ambient.RAIN },
    { id: 'forest', name: 'Forest', icon: '🌲', type: Ambient.FOREST },
    { id: 'coffee', name: 'Coffee Shop', icon: '☕', type: Ambient.CAFE_CHATTER },
    { id: 'waves', name: 'Waves', icon: '🌊', type: Ambient.OCEAN }
  ];

  const handleSoundSelect = (sound) => {
    setSelectedSound(sound);
    if (isPlaying) {
      // If already playing, just change the sound
      console.log('Switching to:', sound.name);
    }
  };

  const handlePlayPause = () => {
    if (selectedSound) {
      setIsPlaying(!isPlaying);
      console.log(isPlaying ? 'Paused' : 'Playing:', selectedSound.name);
    }
  };

  const handleToggleFavorite = (sound) => {
    setFavorites(prev => 
      prev.includes(sound.id) 
        ? prev.filter(id => id !== sound.id)
        : [...prev, sound.id]
    );
  };

  const getSoundIcon = (sound) => {
    return sound.icon;
  };

  return (
    <Card className={`h-full ${className}`}>
      <CardHeader className="pb-4">
        <CardTitle className="text-lg">Ambient Noises</CardTitle>
      </CardHeader>

      <CardContent className="pt-0">
        {/* Sound Selection Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {ambientSounds.map((sound) => (
            <button
              key={sound.id}
              onClick={() => handleSoundSelect(sound)}
              className={`
                p-3 rounded-lg border-2 transition-all duration-200 text-left
                ${selectedSound?.id === sound.id
                  ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                  : 'border-gray-200 dark:border-gray-600 hover:border-purple-300 dark:hover:border-purple-700'
                }
              `}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-lg">{getSoundIcon(sound)}</span>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {sound.name}
                  </span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleToggleFavorite(sound);
                  }}
                  className={`
                    p-1 rounded-full transition-colors
                    ${favorites.includes(sound.id)
                      ? 'text-red-500 hover:text-red-600'
                      : 'text-gray-400 hover:text-red-500'
                    }
                  `}
                >
                  <Heart 
                    className={`w-4 h-4 ${favorites.includes(sound.id) ? 'fill-current' : ''}`} 
                  />
                </button>
              </div>
            </button>
          ))}
        </div>

        {/* Play Button */}
        <Button
          onClick={handlePlayPause}
          disabled={!selectedSound}
          className="w-full flex items-center justify-center space-x-2 mb-4"
          size="lg"
        >
          {isPlaying ? (
            <>
              <VolumeX className="w-5 h-5" />
              <span>Stop Listening</span>
            </>
          ) : (
            <>
              <Volume2 className="w-5 h-5" />
              <span>Listen</span>
            </>
          )}
        </Button>

        {/* Selected Sound Info */}
        {selectedSound && (
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3 mb-4">
            <div className="flex items-center space-x-2">
              <span className="text-lg">{getSoundIcon(selectedSound)}</span>
              <div>
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {selectedSound.name}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {isPlaying ? 'Currently playing' : 'Selected'}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Favorites Section */}
        {favorites.length > 0 && (
          <div>
            <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Favorites
            </div>
            <div className="space-y-2">
              {favorites.map(favId => {
                const sound = ambientSounds.find(s => s.id === favId);
                return sound ? (
                  <div
                    key={favId}
                    className="flex items-center justify-between p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg"
                  >
                    <div className="flex items-center space-x-2">
                      <span className="text-sm">{getSoundIcon(sound)}</span>
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {sound.name}
                      </span>
                    </div>
                    <button
                      onClick={() => handleToggleFavorite(sound)}
                      className="text-red-500 hover:text-red-600 p-1"
                    >
                      <Heart className="w-4 h-4 fill-current" />
                    </button>
                  </div>
                ) : null;
              })}
            </div>
          </div>
        )}

        {/* Volume Control (if playing) */}
        {isPlaying && (
          <div className="mt-4">
            <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Volume
            </div>
            <input
              type="range"
              min="0"
              max="100"
              defaultValue="50"
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AmbientCard;
