import VoiceAICard from '../components/VoiceAICard'
import MonthlyCalendar from '../components/MonthlyCalendar'
import MonthlyStats from '../components/MonthlyStats'
import NeumorphicCard from '../components/NeumorphicCard'

export default function MoodBoardWidget({ onCalendarDayClick, onHistoryClick, onMatrixClick }) {
  const handleDayClick = (dayData) => {
    // Trigger the overlay callback
    if (onCalendarDayClick) {
      onCalendarDayClick(new Date(dayData.year, dayData.month - 1, dayData.day))
    }
  }

  return (
    <div className="pt-0 pb-1 px-6">
      <div 
        className="neumorphic-card-with-stars neumorphic-study flex p-6"
        style={{
          width: '100%'
        }}
      >
        <div className="flex gap-8 w-full">
          <div className="w-1/4">
            <VoiceAICard mode="study" />
          </div>
          <div className="w-1/3">
            <MonthlyCalendar onDayClick={handleDayClick} />
          </div>
          <div className="w-5/12">
            <MonthlyStats onHistoryClick={onHistoryClick} />
          </div>
        </div>
      </div>
    </div>
  )
}
