import { useState } from 'react'
import VoiceAICard from '../components/VoiceAICard'
import MonthlyCalendar from '../components/MonthlyCalendar'
import WellnessStats from '../components/WellnessStats'

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
        className="flex backdrop-blur-lg rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 gap-16 relative overflow-hidden"
        style={{
          background: 'rgba(0, 0, 0, 0.2)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.08), 0 0 20px rgba(100, 200, 100, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
        }}
      >
        {/* Card Star Clusters */}
        {/* Cluster 1 - Top Left */}
        {[...Array(4)].map((_, i) => (
          <div
            key={`cluster1-${i}`}
            className="absolute animate-pulse"
            style={{
              left: `${15 + Math.random() * 15}%`,
              top: `${20 + Math.random() * 15}%`,
              width: `${Math.random() * 1.2 + 0.6}px`,
              height: `${Math.random() * 1.2 + 0.6}px`,
              background: 'rgba(100, 200, 100, 0.7)',
              borderRadius: '50%',
              boxShadow: '0 0 3px rgba(80, 150, 80, 0.5)',
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${Math.random() * 2 + 1.5}s`,
              zIndex: 1
            }}
          />
        ))}
        
        {/* Cluster 2 - Top Right */}
        {[...Array(3)].map((_, i) => (
          <div
            key={`cluster2-${i}`}
            className="absolute animate-pulse"
            style={{
              left: `${70 + Math.random() * 15}%`,
              top: `${15 + Math.random() * 15}%`,
              width: `${Math.random() * 1.0 + 0.5}px`,
              height: `${Math.random() * 1.0 + 0.5}px`,
              background: 'rgba(80, 180, 80, 0.6)',
              borderRadius: '50%',
              boxShadow: '0 0 2px rgba(60, 140, 60, 0.4)',
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${Math.random() * 3 + 2}s`,
              zIndex: 1
            }}
          />
        ))}
        
        {/* Cluster 3 - Bottom Left */}
        {[...Array(4)].map((_, i) => (
          <div
            key={`cluster3-${i}`}
            className="absolute animate-pulse"
            style={{
              left: `${20 + Math.random() * 20}%`,
              top: `${70 + Math.random() * 15}%`,
              width: `${Math.random() * 1.4 + 0.6}px`,
              height: `${Math.random() * 1.4 + 0.6}px`,
              background: 'rgba(120, 200, 120, 0.7)',
              borderRadius: '50%',
              boxShadow: '0 0 4px rgba(80, 160, 80, 0.5)',
              animationDelay: `${Math.random() * 3.5}s`,
              animationDuration: `${Math.random() * 2.5 + 1.8}s`,
              zIndex: 1
            }}
          />
        ))}
        
        {/* Cluster 4 - Bottom Right */}
        {[...Array(3)].map((_, i) => (
          <div
            key={`cluster4-${i}`}
            className="absolute animate-pulse"
            style={{
              left: `${70 + Math.random() * 15}%`,
              top: `${75 + Math.random() * 15}%`,
              width: `${Math.random() * 1.1 + 0.4}px`,
              height: `${Math.random() * 1.1 + 0.4}px`,
              background: 'rgba(90, 190, 90, 0.6)',
              borderRadius: '50%',
              boxShadow: '0 0 3px rgba(70, 150, 70, 0.4)',
              animationDelay: `${Math.random() * 4.5}s`,
              animationDuration: `${Math.random() * 3.5 + 2.2}s`,
              zIndex: 1
            }}
          />
        ))}
        
        {/* Cluster 5 - Center Left */}
        {[...Array(2)].map((_, i) => (
          <div
            key={`cluster5-${i}`}
            className="absolute animate-pulse"
            style={{
              left: `${10 + Math.random() * 10}%`,
              top: `${45 + Math.random() * 10}%`,
              width: `${Math.random() * 0.8 + 0.4}px`,
              height: `${Math.random() * 0.8 + 0.4}px`,
              background: 'rgba(80, 150, 80, 0.5)',
              borderRadius: '50%',
              boxShadow: '0 0 2px rgba(60, 120, 60, 0.3)',
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 4 + 3}s`,
              zIndex: 1
            }}
          />
        ))}
        
        {/* Cluster 6 - Center Right */}
        {[...Array(3)].map((_, i) => (
          <div
            key={`cluster6-${i}`}
            className="absolute animate-pulse"
            style={{
              left: `${80 + Math.random() * 15}%`,
              top: `${40 + Math.random() * 10}%`,
              width: `${Math.random() * 1.2 + 0.6}px`,
              height: `${Math.random() * 1.2 + 0.6}px`,
              background: 'rgba(100, 180, 100, 0.6)',
              borderRadius: '50%',
              boxShadow: '0 0 3px rgba(80, 140, 80, 0.4)',
              animationDelay: `${Math.random() * 4.2}s`,
              animationDuration: `${Math.random() * 3.2 + 2.5}s`,
              zIndex: 1
            }}
          />
        ))}
        
        {/* Green Hue Background - Behind WellnessStats */}
        <div 
          className="absolute pointer-events-none"
          style={{
            left: '70%',
            top: '20%',
            width: '30%',
            height: '60%',
            background: 'radial-gradient(ellipse 80% 100% at 50% 50%, transparent 0%, rgba(20, 40, 20, 0.10) 40%, rgba(15, 30, 15, 0.08) 70%, transparent 100%)',
            filter: 'blur(8px)',
            zIndex: 0
          }}
        />
        
        {/* Cluster 7 - Behind WellnessStats (Right side) */}
        {[...Array(5)].map((_, i) => (
          <div
            key={`wellness-stats-cluster-${i}`}
            className="absolute animate-pulse"
            style={{
              left: `${75 + Math.random() * 20}%`,
              top: `${30 + Math.random() * 40}%`,
              width: `${Math.random() * 1.5 + 0.8}px`,
              height: `${Math.random() * 1.5 + 0.8}px`,
              background: 'rgba(100, 180, 100, 0.8)',
              borderRadius: '50%',
              boxShadow: '0 0 4px rgba(80, 140, 80, 0.6), 0 0 8px rgba(60, 120, 60, 0.3)',
              animationDelay: `${Math.random() * 3.8}s`,
              animationDuration: `${Math.random() * 2.8 + 2.2}s`,
              zIndex: 1
            }}
          />
        ))}
        
        <div className="relative z-10 flex gap-16 w-full">
        <VoiceAICard />
          <MonthlyCalendar onDayClick={handleDayClick} />
        <WellnessStats />
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
                  {selectedDayData.emoji === 'FOCUSED' && '📚'}
                  {selectedDayData.emoji === 'INTENSE' && '🔥'}
                  {selectedDayData.emoji === 'OVERWHELMED' && '😵'}
                  {selectedDayData.emoji === 'BURNT_OUT' && '💀'}
                </span>
                <div>
                  <p className="font-medium text-gray-800 dark:text-gray-200 capitalize">
                    {selectedDayData.emoji.toLowerCase().replace('_', ' ')}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {selectedDayData.emoji === 'FOCUSED' || selectedDayData.emoji === 'INTENSE' || selectedDayData.emoji === 'OVERWHELMED' || selectedDayData.emoji === 'BURNT_OUT' || selectedDayData.emoji === 'RELAXED' || selectedDayData.emoji === 'BALANCED'
                      ? 'Study mood for this day'
                      : 'Wellness mood for this day'
                    }
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
