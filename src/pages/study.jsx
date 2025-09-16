import React, { useState, useEffect } from "react";
import MoodBoardWidget from "./moodboard";
import PomodoroTimer from "./study_page_components/pomodoroTimer";
import SoundPlayer from "./study_page_components/SoundPlayer";
import EisenhowerMatrix from "../components/EisenhowerMatrix";
import CalendarOverlay from "../components/CalendarOverlay";
import HistoryOverlay from "../components/HistoryOverlay";
import MatrixOverlay from "../components/MatrixOverlay";
import useStudyStore from "../stores/studyStore";

export default function StudyPage() {
  const { fetchStudyData } = useStudyStore();
  const [calendarOverlayOpen, setCalendarOverlayOpen] = useState(false);
  const [historyOverlayOpen, setHistoryOverlayOpen] = useState(false);
  const [matrixOverlayOpen, setMatrixOverlayOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    // Initialize store with data from API
    fetchStudyData();
  }, [fetchStudyData]);

  const handleCalendarDayClick = (date) => {
    setSelectedDate(date);
    setCalendarOverlayOpen(true);
  };

  const handleHistoryClick = () => {
    setHistoryOverlayOpen(true);
  };

  const handleMatrixClick = () => {
    setMatrixOverlayOpen(true);
  };

  return (
    <div>
      <MoodBoardWidget 
        onCalendarDayClick={handleCalendarDayClick}
        onHistoryClick={handleHistoryClick}
        onMatrixClick={handleMatrixClick}
      />
      <div className="px-6 py-3 flex gap-6">
        <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-sky-200 dark:border-gray-600 hover:shadow-xl transition-all duration-300 w-1/5 h-96">
          <PomodoroTimer />
        </div>
        <div className="rounded-2xl shadow-lg border border-sky-200 dark:border-gray-600 hover:shadow-xl transition-all duration-300 w-1/5 h-96">
          <SoundPlayer />
        </div>
        <div 
          className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-sky-200 dark:border-gray-600 hover:shadow-xl transition-all duration-300 w-3/5 h-96 cursor-pointer"
          onClick={handleMatrixClick}
        >
          <EisenhowerMatrix />
        </div>
      </div>

      {/* Overlays */}
      <CalendarOverlay 
        isOpen={calendarOverlayOpen}
        onClose={() => setCalendarOverlayOpen(false)}
        selectedDate={selectedDate}
      />
      
      <HistoryOverlay 
        isOpen={historyOverlayOpen}
        onClose={() => setHistoryOverlayOpen(false)}
      />
      
      <MatrixOverlay 
        isOpen={matrixOverlayOpen}
        onClose={() => setMatrixOverlayOpen(false)}
      />
    </div>
  );
}
