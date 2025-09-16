import { useState } from 'react'
import VoiceAICard from '../components/VoiceAICard'
import WellnessCalendar from '../components/WellnessCalendar'
import WellnessStats from '../components/WellnessStats'

export default function WellnessMoodBoardWidget() {
  const [selectedDayData, setSelectedDayData] = useState(null)
  const [showDayDetails, setShowDayDetails] = useState(false)

  const handleDayClick = (dayData) => {
    setSelectedDayData(dayData)
    setShowDayDetails(true)
  }

  const closeDayDetails = () => {
    setShowDayDetails(false)
    setSelectedDayData(null)
  }

  return (
    <div className="pt-0 pb-2 px-6">
      <div className="flex bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-teal-200 dark:border-gray-600 hover:shadow-xl transition-all duration-300 gap-16">
        <VoiceAICard />
        <WellnessCalendar onDayClick={handleDayClick} />
        <WellnessStats />
      </div>

      {/* Day Details Modal */}
      {showDayDetails && selectedDayData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={closeDayDetails}>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                {selectedDayData.month}/{selectedDayData.day}/{selectedDayData.year}
              </h3>
              <button
                onClick={closeDayDetails}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-xl"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              {/* Emoji Display */}
              <div className="flex items-center gap-3">
                <span className="text-3xl">
                  {selectedDayData.emoji === 'ENERGIZED' && '⚡'}
                  {selectedDayData.emoji === 'BALANCED' && '😌'}
                  {selectedDayData.emoji === 'RELAXED' && '🧘'}
                  {selectedDayData.emoji === 'STRESSED' && '😰'}
                  {selectedDayData.emoji === 'MOTIVATED' && '💪'}
                  {selectedDayData.emoji === 'TIRED' && '😴'}
                </span>
                <div>
                  <p className="font-medium text-gray-800 dark:text-gray-200 capitalize">
                    {selectedDayData.emoji.toLowerCase().replace('_', ' ')}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Wellness mood for this day
                  </p>
                </div>
              </div>

              {/* Summary */}
              <div>
                <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Summary</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  {selectedDayData.summary}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={closeDayDetails}
                  className="flex-1 py-2 px-4 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors duration-200"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    // Future: Navigate to detailed view or edit
                    console.log('Edit day data:', selectedDayData)
                  }}
                  className="flex-1 py-2 px-4 bg-teal-500 hover:bg-teal-600 text-white rounded-lg transition-colors duration-200"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
