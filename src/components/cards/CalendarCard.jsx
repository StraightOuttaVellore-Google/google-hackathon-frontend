import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns';
import { useStudyStore } from '../../store/studyStore';
import { Button } from '../ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';

const CalendarCard = ({ className, onDateClick }) => {
  const { selectedDate, setSelectedDate, getCalendarDays } = useStudyStore();
  const [currentMonth, setCurrentMonth] = useState(selectedDate);

  const handlePreviousMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    if (onDateClick) {
      onDateClick(date);
    }
  };

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Get the first day of the month to calculate offset
  const firstDayOfMonth = monthStart.getDay();
  const emptyDays = Array.from({ length: firstDayOfMonth }, (_, i) => i);

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <Card className={`h-full ${className}`}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Calendar</CardTitle>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={handlePreviousMonth}
              className="h-8 w-8"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 min-w-[120px] text-center">
              {format(currentMonth, 'MMMM yyyy')}
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleNextMonth}
              className="h-8 w-8"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        {/* Week Days Header */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {weekDays.map((day) => (
            <div
              key={day}
              className="text-center text-xs font-medium text-gray-500 dark:text-gray-400 py-2"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1">
          {/* Empty days for alignment */}
          {emptyDays.map((_, index) => (
            <div key={`empty-${index}`} className="h-8" />
          ))}

          {/* Calendar days */}
          {days.map((day) => {
            const isToday = isSameDay(day, new Date());
            const isSelected = isSameDay(day, selectedDate);
            const isCurrentMonth = isSameMonth(day, currentMonth);

            return (
              <button
                key={day.toISOString()}
                onClick={() => handleDateClick(day)}
                className={`
                  h-8 w-8 text-xs rounded-lg transition-all duration-200 hover:bg-purple-100 dark:hover:bg-purple-900/30
                  ${isSelected 
                    ? 'bg-purple-600 text-white font-semibold' 
                    : isToday 
                    ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 font-semibold'
                    : isCurrentMonth
                    ? 'text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400'
                    : 'text-gray-400 dark:text-gray-600'
                  }
                `}
              >
                {format(day, 'd')}
              </button>
            );
          })}
        </div>

        {/* Selected Date Info */}
        <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Selected: <span className="font-medium text-gray-900 dark:text-gray-100">
              {format(selectedDate, 'EEEE, MMMM d, yyyy')}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CalendarCard;
