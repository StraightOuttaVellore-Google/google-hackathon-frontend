import { useState, useEffect } from 'react'
import VoiceAICard from '../components/VoiceAICard'
import MonthlyCalendar from '../components/MonthlyCalendar'
import WellnessStats from '../components/WellnessStats'
import NeumorphicCard from '../components/NeumorphicCard'
import CalendarOverlay from '../components/CalendarOverlay'
import useStudyStore from '../stores/studyStore'

export default function WellnessMoodBoardWidget() {
  const [calendarOverlayOpen, setCalendarOverlayOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState(null)
  const { fetchStudyData } = useStudyStore()

  useEffect(() => {
    // Initialize store with data from API
    fetchStudyData()
  }, [fetchStudyData])

  const handleCalendarDayClick = (dayData) => {
    // Convert dayData object to Date object for CalendarOverlay
    const date = new Date(dayData.year, dayData.month - 1, dayData.day)
    setSelectedDate(date)
    setCalendarOverlayOpen(true)
  }

  return (
    <div className="pt-0 pb-1 px-3 md:px-6">
      <div 
        className="neumorphic-card-with-stars neumorphic-wellness flex p-4 md:p-6"
        style={{
          width: '100%'
        }}
      >
        <div className="flex flex-col md:flex-row gap-4 md:gap-8 w-full">
          <div className="w-full md:w-1/4">
        <VoiceAICard mode="wellness" />
          </div>
          <div className="w-full md:w-1/3">
          <MonthlyCalendar onDayClick={handleCalendarDayClick} />
          </div>
          <div className="w-full md:w-5/12">
        <WellnessStats />
          </div>
        </div>
      </div>

      {/* Calendar Overlay for Tasks */}
      <CalendarOverlay 
        isOpen={calendarOverlayOpen}
        onClose={() => setCalendarOverlayOpen(false)}
        selectedDate={selectedDate}
      />
    </div>
  )
}