import { useState } from 'react'
import VoiceAIOverlay from './VoiceAIOverlay'

export default function VoiceAICard() {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false)

  const handleTalkClick = () => {
    setIsOverlayOpen(true)
  }

  return (
    <>
      <div className="w-full h-72">
        {/* Voice Agent Image - Clickable */}
        <div className="mb-3 relative cursor-pointer" onClick={handleTalkClick}>
          <img
            src="images/38dc7c1a-2e26-44b6-9c9b-97ca9ff38a60.png"
            alt="Voice Agent"
            className="w-full h-48 object-contain rounded-lg transition-transform duration-200 hover:scale-105 voice-ai-image"
            style={{
              borderRadius: '0.5rem'
            }}
          />
          {/* Overlay effect on hover */}
          <div className="absolute inset-0 bg-black/0 hover:bg-black/10 dark:hover:bg-black/10 light:hover:bg-white/10 rounded-lg transition-colors duration-200 flex items-center justify-center">
            <div className="opacity-0 hover:opacity-100 transition-opacity duration-200">
              <div className="bg-white/90 dark:bg-gray-800/90 light:bg-white/90 rounded-full p-3 shadow-lg">
                <span className="text-2xl">🎤</span>
              </div>
            </div>
          </div>
        </div>

        {/* Single Talk Button */}
        <div className="flex justify-center mt-6">
          <button
            onClick={handleTalkClick}
            className="relative backdrop-blur-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden neumorphic-button"
            style={{
              width: 'fit-content',
              padding: '8px 16px'
            }}
          >
            {/* Button Stars */}
            {[...Array(6)].map((_, i) => (
              <div
                key={`button-star-${i}`}
                className="absolute animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${Math.random() * 1 + 0.5}px`,
                  height: `${Math.random() * 1 + 0.5}px`,
                  background: 'rgba(200, 220, 255, 0.6)',
                  borderRadius: '50%',
                  boxShadow: '0 0 3px rgba(150, 180, 255, 0.4)',
                  animationDelay: `${Math.random() * 4}s`,
                  animationDuration: `${Math.random() * 3 + 2}s`,
                  zIndex: 1
                }}
              />
            ))}
            <span className="relative z-10 font-medium text-sm text-white dark:text-white light:text-black">
              Aawaaz Journal
            </span>
          </button>
        </div>
      </div>

      {/* Voice AI Overlay */}
      <VoiceAIOverlay 
        isOpen={isOverlayOpen} 
        onClose={() => setIsOverlayOpen(false)} 
      />
    </>
  )
}
