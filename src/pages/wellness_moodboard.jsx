import { useState } from 'react'
import VoiceAICard from '../components/VoiceAICard'
import MonthlyCalendar from '../components/MonthlyCalendar'
import WellnessStats from '../components/WellnessStats'
import NeumorphicCard from '../components/NeumorphicCard'

export default function WellnessMoodBoardWidget() {
  const [selectedDayData, setSelectedDayData] = useState(null)
  const [showDayDetails, setShowDayDetails] = useState(false)

  const handleDayClick = (dayData) => {
    // Convert study calendar data format to wellness format
    const wellnessData = {
      day: dayData.day,
      month: dayData.month,
      year: dayData.year,
      emoji: dayData.emoji || 'BALANCED',
      summary: dayData.summary || 'No wellness data for this day'
    }
    setSelectedDayData(wellnessData)
    setShowDayDetails(true)
  }

  const closeDayDetails = () => {
    setShowDayDetails(false)
    setSelectedDayData(null)
  }

  return (
    <div className="pt-0 pb-1 px-6">
      <div 
        className="neumorphic-card-with-stars neumorphic-wellness flex p-6"
        style={{
          background: 'rgba(0, 0, 0, 0.3)',
          borderRadius: '16px',
          boxShadow: 'inset 2px 2px 4px #000000, inset -2px -2px 4px #1a1a1a',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          width: '100%'
        }}
      >
        <div className="flex gap-8 w-full">
          <div className="w-1/4">
        <VoiceAICard />
          </div>
          <div className="w-1/3">
          <MonthlyCalendar onDayClick={handleDayClick} />
          </div>
          <div className="w-5/12">
        <WellnessStats />
          </div>
        </div>
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
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-4xl mb-2">
                  {selectedDayData.emoji === 'ENERGIZED' && '⚡'}
                  {selectedDayData.emoji === 'BALANCED' && '😌'}
                  {selectedDayData.emoji === 'RELAXED' && '🧘'}
                  {selectedDayData.emoji === 'STRESSED' && '😰'}
                  {selectedDayData.emoji === 'MOTIVATED' && '💪'}
                  {!['ENERGIZED', 'BALANCED', 'RELAXED', 'STRESSED', 'MOTIVATED'].includes(selectedDayData.emoji) && '😊'}
                </div>
                <h4 className="text-xl font-medium text-gray-800 dark:text-gray-200 mb-2">
                  {selectedDayData.emoji}
                </h4>
                <p className="text-gray-600 dark:text-gray-400">
                  {selectedDayData.summary}
                </p>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <h5 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Wellness Activities</h5>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    Morning meditation completed
                  </div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                    Exercise session logged
                  </div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                    Journal entry written
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}