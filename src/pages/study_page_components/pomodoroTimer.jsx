import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import useStudyStore from "../../stores/studyStore";

export default function PomodoroTimer(){
    const { studyData, updatePomodoroTimer } = useStudyStore();
    const pomodoro = studyData.pomodoro_timer;
    
    const [currentTime, setCurrentTime] = useState(pomodoro.work_time * 60); // in seconds
    const [isRunning, setIsRunning] = useState(false);
    const [isBreak, setIsBreak] = useState(false);
    const [currentIteration, setCurrentIteration] = useState(1);
    const [selectedPreset, setSelectedPreset] = useState("none");
    const [isOverlayOpen, setIsOverlayOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    
    const intervalRef = useRef(null);
  
    const presets = {
      none: { 
        study: pomodoro.work_time, 
        break: pomodoro.break_time, 
        iterations: pomodoro.no_of_iterations 
      },
      preset1: { 
        study: pomodoro.work_time_preset1 || 45, 
        break: pomodoro.break_time_preset1 || 10, 
        iterations: pomodoro.no_of_iterations1 || 3 
      },
      preset2: { 
        study: pomodoro.work_time_preset2 || 15, 
        break: pomodoro.break_time_preset2 || 3, 
        iterations: pomodoro.no_of_iterations2 || 6 
      },
      preset3: { 
        study: pomodoro.work_time_preset3 || 90, 
        break: pomodoro.break_time_preset3 || 20, 
        iterations: pomodoro.no_of_iterations3 || 2 
      }
    };
  
    useEffect(() => {
      if (isRunning && currentTime > 0) {
        intervalRef.current = setInterval(() => {
          setCurrentTime(prev => prev - 1);
        }, 1000);
      } else if (currentTime === 0) {
        // Timer finished
        if (!isBreak) {
          // Study session finished, start break
          setIsBreak(true);
          setCurrentTime(pomodoro.break_time * 60);
        } else {
          // Break finished
          if (currentIteration < pomodoro.no_of_iterations) {
            // Start next iteration
            setIsBreak(false);
            setCurrentIteration(prev => prev + 1);
            setCurrentTime(pomodoro.work_time * 60);
          } else {
            // All iterations complete
            setIsRunning(false);
            setCurrentIteration(1);
            setIsBreak(false);
            setCurrentTime(pomodoro.work_time * 60);
          }
        }
      }
  
      return () => clearInterval(intervalRef.current);
    }, [isRunning, currentTime, isBreak, pomodoro.work_time, pomodoro.break_time, pomodoro.no_of_iterations, currentIteration]);
  
    const formatTime = (seconds) => {
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };
  
    const handlePresetChange = (preset) => {
      setSelectedPreset(preset);
      if (preset !== "none") {
        const config = presets[preset];
        updatePomodoroTimer({
          work_time: config.study,
          break_time: config.break,
          no_of_iterations: config.iterations
        });
        setCurrentTime(config.study * 60);
      }
      setIsRunning(false);
      setIsBreak(false);
      setCurrentIteration(1);
    };
  
    const handleStart = () => {
      setIsRunning(!isRunning);
    };
  
    const handleReset = () => {
      setIsRunning(false);
      setIsBreak(false);
      setCurrentIteration(1);
      setCurrentTime(pomodoro.work_time * 60);
    };
  
    const handleCustomTimeChange = (field, value) => {
      if (!isRunning) {
        updatePomodoroTimer({ [field]: value });
        setCurrentTime(pomodoro.work_time * 60);
        setSelectedPreset("none");
      }
    };

    const toggleOverlay = () => {
      setIsOverlayOpen(!isOverlayOpen);
    };

    const toggleDropdown = () => {
      setIsDropdownOpen(!isDropdownOpen);
    };

    const selectPreset = (preset) => {
      handlePresetChange(preset);
      setIsDropdownOpen(false);
    };
  
    return (
      <div className="h-full flex flex-col relative">
        {/* Stars Background */}
        {[...Array(8)].map((_, i) => (
          <div
            key={`pomodoro-star-${i}`}
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

        {/* Timer Display Card */}
        <div className="relative z-10 text-center mb-6">
          <div 
            className="neumorphic-timer-card p-8 min-h-[160px] flex flex-col justify-center"
            onClick={toggleOverlay}
          >
            <div className="text-5xl font-mono font-bold text-white mb-3">
              {formatTime(currentTime)}
            </div>
            <div className="text-xl font-medium text-white/80 mb-2">
              {isBreak ? 'Break' : 'Study'} {isBreak ? pomodoro.break_time : pomodoro.work_time} min
            </div>
            <div className="text-base text-white/60">
              Cycle {currentIteration} of {pomodoro.no_of_iterations}
            </div>
          </div>
        </div>

        {/* Control Buttons */}
        <div className="relative z-10 flex gap-3 mt-2">
          <button
            onClick={handleStart}
            className={`flex-1 ${isRunning ? 'neumorphic-pomodoro-button-pause' : 'neumorphic-pomodoro-button-start'}`}
          >
            {isRunning ? (
              <>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5.75 3a.75.75 0 00-.75.75v12.5c0 .414.336.75.75.75h1.5a.75.75 0 00.75-.75V3.75A.75.75 0 007.25 3h-1.5zM12.75 3a.75.75 0 00-.75.75v12.5c0 .414.336.75.75.75h1.5a.75.75 0 00.75-.75V3.75a.75.75 0 00-.75-.75h-1.5z"/>
                </svg>
                Pause
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"/>
                </svg>
                Start
              </>
            )}
          </button>
          <button
            onClick={handleReset}
            className="flex-1 neumorphic-pomodoro-button-reset"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd"/>
            </svg>
            Reset
          </button>
        </div>

        {/* Timer Overlay */}
        {isOverlayOpen && createPortal(
          <div 
            className="fixed inset-0 flex items-center justify-center p-2"
            onClick={toggleOverlay}
            style={{
              zIndex: 9999,
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0
            }}
          >
            <div 
              className="neumorphic-overlay-card p-6 w-full max-w-lg h-[52vh] overflow-y-auto relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button - Top Right */}
              <div className="absolute top-4 right-4 z-10">
                <button
                  onClick={toggleOverlay}
                  className="neumorphic-close-button"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Timer Display Card in Overlay */}
              <div className="text-center mb-6 mt-2">
                <div className="neumorphic-timer-card p-6 min-h-[140px] flex flex-col justify-center">
                  <div className="text-4xl font-mono font-bold text-white mb-2">
                    {formatTime(currentTime)}
                  </div>
                  <div className="text-lg font-medium text-white/80 mb-1">
                    {isBreak ? 'Break' : 'Study'} {isBreak ? pomodoro.break_time : pomodoro.work_time} min
                  </div>
                  <div className="text-sm text-white/60">
              Cycle {currentIteration} of {pomodoro.no_of_iterations}
            </div>
          </div>
        </div>
  
        {/* Preset Selection */}
              <div className="mb-6">
          <label className="block text-xs font-semibold text-white/80 mb-2 tracking-wide uppercase">
            Load Preset
          </label>
          <div className="relative">
                  <button
                    onClick={toggleDropdown}
                    className="neumorphic-dropdown-button"
                  >
                    <span>
                      {selectedPreset === "none" && "None"}
                      {selectedPreset === "preset1" && `Preset 1 (${pomodoro.work_time_preset1 || 45}/${pomodoro.break_time_preset1 || 10})`}
                      {selectedPreset === "preset2" && `Preset 2 (${pomodoro.work_time_preset2 || 15}/${pomodoro.break_time_preset2 || 3})`}
                      {selectedPreset === "preset3" && `Preset 3 (${pomodoro.work_time_preset3 || 90}/${pomodoro.break_time_preset3 || 20})`}
                    </span>
                    <svg 
                      className={`w-4 h-4 text-white/60 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
                  </button>
                  
                  {isDropdownOpen && (
                    <div className="neumorphic-dropdown-options">
                      <button
                        onClick={() => selectPreset("none")}
                        className="neumorphic-dropdown-option"
                      >
                        None
                      </button>
                      <button
                        onClick={() => selectPreset("preset1")}
                        className="neumorphic-dropdown-option"
                      >
                        Preset 1 ({pomodoro.work_time_preset1 || 45}/{pomodoro.break_time_preset1 || 10})
                      </button>
                      <button
                        onClick={() => selectPreset("preset2")}
                        className="neumorphic-dropdown-option"
                      >
                        Preset 2 ({pomodoro.work_time_preset2 || 15}/{pomodoro.break_time_preset2 || 3})
                      </button>
                      <button
                        onClick={() => selectPreset("preset3")}
                        className="neumorphic-dropdown-option"
                      >
                        Preset 3 ({pomodoro.work_time_preset3 || 90}/{pomodoro.break_time_preset3 || 20})
                      </button>
            </div>
                  )}
          </div>
        </div>
  
        {/* Custom Settings */}
              <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="group">
            <label className="block text-xs font-semibold text-white/80 mb-2">Study (min)</label>
            <div className="relative">
              <input
                type="number"
                value={pomodoro.work_time}
                onChange={(e) => {
                  handleCustomTimeChange('work_time', Number(e.target.value));
                }}
                min="1"
                max="120"
                      className="neumorphic-input"
                disabled={isRunning}
              />
            </div>
          </div>
          <div className="group">
            <label className="block text-xs font-semibold text-white/80 mb-2">Break (min)</label>
            <div className="relative">
              <input
                type="number"
                value={pomodoro.break_time}
                onChange={(e) => handleCustomTimeChange('break_time', Number(e.target.value))}
                min="1"
                max="60"
                      className="neumorphic-input"
                disabled={isRunning}
              />
            </div>
          </div>
          <div className="group">
            <label className="block text-xs font-semibold text-white/80 mb-2">Cycles (times)</label>
            <div className="relative">
              <input
                type="number"
                value={pomodoro.no_of_iterations}
                onChange={(e) => handleCustomTimeChange('no_of_iterations', Number(e.target.value))}
                min="1"
                max="10"
                      className="neumorphic-input"
                disabled={isRunning}
              />
            </div>
          </div>
        </div>
  
        {/* Control Buttons */}
              <div className="flex gap-3">
          <button
            onClick={handleStart}
                  className={`flex-1 neumorphic-pomodoro-button ${
                    isRunning ? 'neumorphic-pomodoro-button-pause' : 'neumorphic-pomodoro-button-start'
            }`}
          >
            {isRunning ? (
              <>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5.75 3a.75.75 0 00-.75.75v12.5c0 .414.336.75.75.75h1.5a.75.75 0 00.75-.75V3.75A.75.75 0 007.25 3h-1.5zM12.75 3a.75.75 0 00-.75.75v12.5c0 .414.336.75.75.75h1.5a.75.75 0 00.75-.75V3.75a.75.75 0 00-.75-.75h-1.5z"/>
                </svg>
                Pause
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"/>
                </svg>
                Start
              </>
            )}
          </button>
          <button
            onClick={handleReset}
                  className="flex-1 neumorphic-pomodoro-button-reset"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd"/>
            </svg>
            Reset
          </button>
        </div>
            </div>
          </div>,
          document.body
        )}
      </div>
    );
  };

