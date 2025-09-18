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
    <div className="text-white overflow-x-hidden relative">
      {/* Content */}
      <div className="relative z-10">
        <MoodBoardWidget 
          onCalendarDayClick={handleCalendarDayClick}
          onHistoryClick={handleHistoryClick}
          onMatrixClick={handleMatrixClick}
        />
        <div className="px-6 pb-6 flex gap-6">
        <div 
          className="backdrop-blur-lg rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 w-1/5 h-96 relative overflow-hidden"
          style={{
            background: 'rgba(0, 0, 0, 0.2)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.08), 0 0 20px rgba(100, 150, 255, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
          }}
        >
          {/* Card Stars */}
          {[...Array(8)].map((_, i) => (
            <div
              key={`card-star-1-${i}`}
              className="absolute animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 1 + 0.5}px`,
                height: `${Math.random() * 1 + 0.5}px`,
                background: 'rgba(200, 220, 255, 0.6)',
                borderRadius: '50%',
                boxShadow: '0 0 3px rgba(150, 180, 255, 0.4)',
                animationDelay: `${Math.random() * 4}s`,
                animationDuration: `${Math.random() * 3 + 2}s`,
                zIndex: 1
              }}
            />
          ))}
          <div className="relative z-10">
            <PomodoroTimer />
          </div>
        </div>
        <div 
          className="backdrop-blur-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 w-1/5 h-96 relative overflow-hidden"
          style={{
            background: 'rgba(0, 0, 0, 0.2)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.08), 0 0 20px rgba(100, 150, 255, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
          }}
        >
          {/* Card Stars */}
          {[...Array(8)].map((_, i) => (
            <div
              key={`card-star-2-${i}`}
              className="absolute animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 1 + 0.5}px`,
                height: `${Math.random() * 1 + 0.5}px`,
                background: 'rgba(200, 220, 255, 0.6)',
                borderRadius: '50%',
                boxShadow: '0 0 3px rgba(150, 180, 255, 0.4)',
                animationDelay: `${Math.random() * 4}s`,
                animationDuration: `${Math.random() * 3 + 2}s`,
                zIndex: 1
              }}
            />
          ))}
          <div className="relative z-10">
            <SoundPlayer />
          </div>
        </div>
        <div 
          className="backdrop-blur-lg rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 w-3/5 h-96 cursor-pointer relative overflow-hidden"
          onClick={handleMatrixClick}
          style={{
            background: 'rgba(0, 0, 0, 0.2)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.08), 0 0 20px rgba(100, 150, 255, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
          }}
        >
          {/* Card Stars */}
          {[...Array(12)].map((_, i) => (
            <div
              key={`card-star-3-${i}`}
              className="absolute animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 1 + 0.5}px`,
                height: `${Math.random() * 1 + 0.5}px`,
                background: 'rgba(200, 220, 255, 0.6)',
                borderRadius: '50%',
                boxShadow: '0 0 3px rgba(150, 180, 255, 0.4)',
                animationDelay: `${Math.random() * 4}s`,
                animationDuration: `${Math.random() * 3 + 2}s`,
                zIndex: 1
              }}
            />
          ))}
          
          {/* Additional Stars - Top Part of Matrix */}
          {[...Array(6)].map((_, i) => (
            <div
              key={`matrix-top-star-${i}`}
              className="absolute animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 30}%`,
                width: `${Math.random() * 1.2 + 0.6}px`,
                height: `${Math.random() * 1.2 + 0.6}px`,
                background: 'rgba(180, 160, 220, 0.7)',
                borderRadius: '50%',
                boxShadow: '0 0 4px rgba(140, 120, 200, 0.5)',
                animationDelay: `${Math.random() * 3.5}s`,
                animationDuration: `${Math.random() * 2.5 + 2}s`,
                zIndex: 1
              }}
            />
          ))}
          
          <div className="relative z-10">
            <EisenhowerMatrix />
          </div>
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
    </div>
  );
}
