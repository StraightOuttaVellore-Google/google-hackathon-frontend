import { useState, useEffect } from 'react'
import { useTheme } from '../contexts/ThemeContext'

// Study Emoji mapping based on backend enum
const STUDY_EMOJIS = {
  RELAXED: "😌",     // almost no study, chilled day
  BALANCED: "🙂",    // light productive day, some balance
  FOCUSED: "📚",     // good study flow, but healthy
  INTENSE: "🔥",     // long study sessions, high energy
  OVERWHELMED: "😵", // studied a lot, but mentally drained
  BURNT_OUT: "💀"    // extreme overload, unhealthy
}

export default function MonthlyCalendar({ onDayClick }) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [dailyData, setDailyData] = useState({})
  const [selectedDay, setSelectedDay] = useState(null)
  const { theme } = useTheme()

  // Mock data for demonstration - will be replaced with API calls
  useEffect(() => {
    // Simulate some daily data
    const mockData = {
      '2025-9-1': { emoji: 'FOCUSED', summary: 'Great study session on React components' },
      '2025-9-3': { emoji: 'BALANCED', summary: 'Light study day, reviewed notes' },
      '2025-9-5': { emoji: 'INTENSE', summary: 'Marathon coding session, built calendar component' },
      '2025-9-7': { emoji: 'OVERWHELMED', summary: 'Too much studying, feeling drained' },
      '2025-9-10': { emoji: 'RELAXED', summary: 'Rest day, minimal studying' },
      '2025-9-12': { emoji: 'BURNT_OUT', summary: 'Overworked, need to take a break' },
      '2025-9-15': { emoji: 'FOCUSED', summary: 'Back on track, productive day' },
      '2025-9-22': { emoji: 'FOCUSED', summary: 'Back on track, productive day' },
      '2025-9-29': { emoji: 'FOCUSED', summary: 'Back on track, productive day' }
    }
    setDailyData(mockData)
  }, [])

  const today = new Date()
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  // Get first day of month and number of days
  const firstDayOfMonth = new Date(year, month, 1)
  const lastDayOfMonth = new Date(year, month + 1, 0)
  const daysInMonth = lastDayOfMonth.getDate()
  const startingDayOfWeek = firstDayOfMonth.getDay()

  // Get month name
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]

  // Create calendar grid
  const calendarDays = []
  
  // Empty cells for days before first day of month
  for (let i = 0; i < startingDayOfWeek; i++) {
    calendarDays.push(null)
  }
  
  // Days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day)
  }

  const handleDayClick = (day) => {
    if (!day) return
    
    setSelectedDay(day)
    const dateKey = `${year}-${month + 1}-${day}`
    const dayData = dailyData[dateKey]
    
    // Always call onDayClick for any day, with or without existing data
    if (onDayClick) {
      onDayClick({
        day,
        month: month + 1,
        year,
        emoji: dayData?.emoji || 'BALANCED',
        summary: dayData?.summary || ''
      })
    }
  }

  const navigateMonth = (direction) => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate)
      newDate.setMonth(prevDate.getMonth() + direction)
      return newDate
    })
  }

  const getDayEmoji = (day) => {
    const dateKey = `${year}-${month + 1}-${day}`
    const dayData = dailyData[dateKey]
    return dayData ? STUDY_EMOJIS[dayData.emoji] : null
  }

  const isToday = (day) => {
    return day && 
           today.getDate() === day && 
           today.getMonth() === month && 
           today.getFullYear() === year
  }

  const hasData = (day) => {
    const dateKey = `${year}-${month + 1}-${day}`
    return dailyData[dateKey] ? true : false
  }

  return (
    <div className="w-full h-auto md:h-72 flex flex-col">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-2">
        <button
          onClick={() => navigateMonth(-1)}
          className="p-2 md:p-1 min-h-[44px] min-w-[44px] md:min-h-0 md:min-w-0 hover:bg-gray-100 dark:hover:bg-gray-700 light:hover:bg-white/20 rounded transition-colors"
        >
          <span className="text-gray-600 dark:text-gray-400 light:text-black/60 text-base md:text-sm">←</span>
        </button>
        
        <h2 className="text-base md:text-sm font-semibold text-gray-800 dark:text-gray-200 light:text-black">
          {monthNames[month]} {year}
        </h2>
        
        <button
          onClick={() => navigateMonth(1)}
          className="p-2 md:p-1 min-h-[44px] min-w-[44px] md:min-h-0 md:min-w-0 hover:bg-gray-100 dark:hover:bg-gray-700 light:hover:bg-white/20 rounded transition-colors"
        >
          <span className="text-gray-600 dark:text-gray-400 light:text-black/60 text-base md:text-sm">→</span>
        </button>
      </div>

      {/* Days of week header */}
      <div className="grid grid-cols-7 gap-1 md:gap-0.5 mb-1">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
          <div key={day} className="text-center text-xs font-medium text-gray-500 dark:text-gray-400 light:text-black/50 py-1">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1 md:gap-0.5 flex-1 min-h-0">
        {calendarDays.map((day, index) => {
          if (!day) {
            return <div key={index} className="min-h-0 h-full" />
          }

          // Determine button class based on state
          let buttonClass = 'neumorphic-calendar-button'
          if (isToday(day)) {
            buttonClass = 'neumorphic-calendar-button-today'
          } else if (selectedDay === day) {
            buttonClass = 'neumorphic-calendar-button-selected'
          } else if (hasData(day)) {
            buttonClass = 'neumorphic-calendar-button-data'
          }

          return (
            <button
              key={index}
              onClick={() => handleDayClick(day)}
              className={`${buttonClass} w-full h-full min-h-[36px] md:min-h-0`}
            >
              <span className="text-sm md:text-xs leading-none">
                {day}
              </span>
              {getDayEmoji(day) && (
                <span className="text-base md:text-sm leading-none mt-0.5">{getDayEmoji(day)}</span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}