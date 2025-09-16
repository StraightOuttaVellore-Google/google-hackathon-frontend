import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function WellnessCalendar({ onDayClick }) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [wellnessData, setWellnessData] = useState({})

  // Sample wellness data - in production this would come from API
  useEffect(() => {
    const sampleData = {
      '2025-01-15': {
        emoji: 'ENERGIZED',
        summary: 'Great day! Started with morning meditation, had an energizing workout, and reflected in my journal. Feeling balanced and motivated.',
        month: 1,
        day: 15,
        year: 2025
      },
      '2025-01-16': {
        emoji: 'RELAXED',
        summary: 'Peaceful day with gentle yoga session and some reading. Perfect for recharging.',
        month: 1,
        day: 16,
        year: 2025
      },
      '2025-01-17': {
        emoji: 'STRESSED',
        summary: 'Challenging day but managed stress with breathing exercises. Room for improvement.',
        month: 1,
        day: 17,
        year: 2025
      },
      '2025-01-18': {
        emoji: 'MOTIVATED',
        summary: 'Highly productive day! Set new wellness goals and felt very motivated throughout.',
        month: 1,
        day: 18,
        year: 2025
      }
    }
    setWellnessData(sampleData)
  }, [])

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const getMonthName = (date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  }

  const getMoodEmoji = (emoji) => {
    const moodEmojis = {
      'ENERGIZED': '⚡',
      'BALANCED': '😌',
      'RELAXED': '🧘',
      'STRESSED': '😰',
      'MOTIVATED': '💪',
      'TIRED': '😴'
    }
    return moodEmojis[emoji] || '😐'
  }

  const getMoodColor = (emoji) => {
    const moodColors = {
      'ENERGIZED': 'bg-yellow-100 border-yellow-300 text-yellow-700 dark:bg-yellow-900/30 dark:border-yellow-600 dark:text-yellow-300',
      'BALANCED': 'bg-green-100 border-green-300 text-green-700 dark:bg-green-900/30 dark:border-green-600 dark:text-green-300',
      'RELAXED': 'bg-blue-100 border-blue-300 text-blue-700 dark:bg-blue-900/30 dark:border-blue-600 dark:text-blue-300',
      'STRESSED': 'bg-red-100 border-red-300 text-red-700 dark:bg-red-900/30 dark:border-red-600 dark:text-red-300',
      'MOTIVATED': 'bg-purple-100 border-purple-300 text-purple-700 dark:bg-purple-900/30 dark:border-purple-600 dark:text-purple-300',
      'TIRED': 'bg-gray-100 border-gray-300 text-gray-700 dark:bg-gray-900/30 dark:border-gray-600 dark:text-gray-300'
    }
    return moodColors[emoji] || 'bg-gray-100 border-gray-300 text-gray-700 dark:bg-gray-900/30 dark:border-gray-600 dark:text-gray-300'
  }

  const navigateMonth = (direction) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev)
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
  }

  const handleDayClick = (day) => {
    const dateKey = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    const dayData = wellnessData[dateKey]
    
    if (dayData) {
      onDayClick(dayData)
    }
  }

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate)
    const firstDay = getFirstDayOfMonth(currentDate)
    const days = []

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-8"></div>)
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateKey = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
      const dayData = wellnessData[dateKey]
      const isToday = new Date().toDateString() === new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toDateString()

      days.push(
        <div
          key={day}
          onClick={() => handleDayClick(day)}
          className={`h-8 w-8 flex items-center justify-center text-sm rounded-lg cursor-pointer transition-all duration-200 hover:scale-110 ${
            dayData 
              ? `${getMoodColor(dayData.emoji)} hover:shadow-md` 
              : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400'
          } ${isToday ? 'ring-2 ring-teal-400 dark:ring-teal-500' : ''}`}
        >
          {dayData ? (
            <span className="text-lg" title={dayData.emoji}>
              {getMoodEmoji(dayData.emoji)}
            </span>
          ) : (
            <span className={isToday ? 'font-bold text-teal-600 dark:text-teal-400' : ''}>{day}</span>
          )}
        </div>
      )
    }

    return days
  }

  return (
    <div className="w-1/3">
      <div className="bg-white/50 dark:bg-gray-700/50 rounded-xl p-4">
        {/* Calendar Header */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => navigateMonth('prev')}
            className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
          
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white">
            {getMonthName(currentDate)}
          </h4>
          
          <button
            onClick={() => navigateMonth('next')}
            className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="h-6 flex items-center justify-center text-xs font-medium text-gray-500 dark:text-gray-400">
              {day}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 gap-1">
          {renderCalendar()}
        </div>

        {/* Legend */}
        <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-600">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Mood Legend:</p>
          <div className="flex flex-wrap gap-1">
            <span className="text-xs">⚡ Energized</span>
            <span className="text-xs">😌 Balanced</span>
            <span className="text-xs">🧘 Relaxed</span>
            <span className="text-xs">💪 Motivated</span>
          </div>
        </div>
      </div>
    </div>
  )
}
