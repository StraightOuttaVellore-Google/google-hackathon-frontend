import React, { useState, useEffect } from "react";
import MoodBoardWidget from "./moodboard";
import PomodoroTimer from "./study_page_components/pomodoroTimer";
import SoundPlayer from "./study_page_components/SoundPlayer";
import EisenhowerMatrix from "../components/EisenhowerMatrix";
import CalendarOverlay from "../components/CalendarOverlay";
import HistoryOverlay from "../components/HistoryOverlay";
import MatrixOverlay from "../components/MatrixOverlay";
import NeumorphicCard from "../components/NeumorphicCard";
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
    <div className="text-white overflow-x-hidden relative">
      {/* Content */}
      <div className="relative z-10">
        <MoodBoardWidget 
          onCalendarDayClick={handleCalendarDayClick}
          onHistoryClick={handleHistoryClick}
          onMatrixClick={handleMatrixClick}
        />
        <div className="px-6 pb-6 flex gap-6 mt-8">
         <NeumorphicCard 
           className="w-1/5 h-96 p-6"
           mode="study"
           starCount={8}
         >
           <PomodoroTimer />
         </NeumorphicCard>
         <NeumorphicCard 
           className="w-1/5 h-96"
           mode="study"
           starCount={8}
         >
           <SoundPlayer />
         </NeumorphicCard>
         <NeumorphicCard 
           className="w-3/5 h-96 cursor-pointer"
           onClick={handleMatrixClick}
           mode="study"
           starCount={18}
         >
           <div className="p-6">
             <EisenhowerMatrix />
           </div>
         </NeumorphicCard>
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
    </div>
  );
}
