import { useState } from 'react'
import HistoryPopup from './HistoryPopup'

export default function VoiceAICard() {
  const [isHistoryOpen, setIsHistoryOpen] = useState(false)

  const handleTalkClick = () => {
    // Open Voice AI in a new tab
    window.open('/voice-ai', '_blank')
  }

  const handleHistoryClick = () => {
    setIsHistoryOpen(true)
  }

  return (
    <>
      
          <div className="w-1/5 h-72">
            {/* Voice Agent Image */}
            <div className="mb-3">
              <img
                src="images/voice_ai_agent.png"
                alt="Voice Agent"
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>

            {/* Title */}
            
            {/* Description */}
            <h3 className="text-lg text-gray-600 dark:text-gray-400 text-center mb-2">
                Voice AI Assistant
            </h3>

            {/* Action Buttons */}
            <div className="flex gap-3">
              {/* Talk Button */}
              <button
                onClick={handleTalkClick}
                className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors duration-200 border border-gray-200 dark:border-gray-600"
              >
                <span className="text-lg">🎤</span>
                <span>Talk</span>
              </button>

              {/* History Button */}
              <button
                onClick={handleHistoryClick}
                className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors duration-200 border border-gray-200 dark:border-gray-600"
              >
                <span className="text-lg">📚</span>
                <span>History</span>
              </button>
            </div>
          </div>

      {/* History Popup */}
      <HistoryPopup 
        isOpen={isHistoryOpen} 
        onClose={() => setIsHistoryOpen(false)} 
      />
    </>
  )
}
