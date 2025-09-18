import { useState, useEffect, useRef } from "react";
import useStudyStore from "../../stores/studyStore";

export default function PomodoroTimer(){
    const { studyData, updatePomodoroTimer } = useStudyStore();
    const pomodoro = studyData.pomodoro_timer;
    
    const [currentTime, setCurrentTime] = useState(pomodoro.work_time * 60); // in seconds
    const [isRunning, setIsRunning] = useState(false);
    const [isBreak, setIsBreak] = useState(false);
    const [currentIteration, setCurrentIteration] = useState(1);
    const [selectedPreset, setSelectedPreset] = useState("none");
    
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

        {/* Timer Display - Now at Top */}
        <div className="relative z-10 text-center mb-1">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-2 mb-3 border border-white/20"
            style={{
              background: 'rgba(0, 0, 0, 0.2)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.08), 0 0 20px rgba(100, 150, 255, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
            }}
          >
            <div className="text-3xl font-mono font-bold text-white mb-1">
              {formatTime(currentTime)}
            </div>
            <div className="text-sm font-medium text-white/80">
              {isBreak ? 'Break' : 'Study'} {isBreak ? pomodoro.break_time : pomodoro.work_time} min
            </div>
            <div className="text-xs text-white/60 mt-1">
              Cycle {currentIteration} of {pomodoro.no_of_iterations}
            </div>
          </div>
        </div>
  
        {/* Preset Selection */}
        <div className="relative z-10 mb-4">
          <label className="block text-xs font-semibold text-white/80 mb-2 tracking-wide uppercase">
            Load Preset
          </label>
          <div className="relative">
            <select 
              value={selectedPreset}
              onChange={(e) => handlePresetChange(e.target.value)}
              className="w-full p-3 pr-8 rounded-xl text-white text-sm font-medium appearance-none cursor-pointer backdrop-blur-sm transition-all duration-200"
              style={{
                background: 'rgba(0, 0, 0, 0.2)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.08), 0 0 20px rgba(100, 150, 255, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
              }}
            >
              <option value="none" className="bg-gray-800 text-white">🎯 None</option>
              <option value="preset1" className="bg-gray-800 text-white">🎯 Preset 1 ({pomodoro.work_time_preset1 || 45}/{pomodoro.break_time_preset1 || 10})</option>
              <option value="preset2" className="bg-gray-800 text-white">⚡ Preset 2 ({pomodoro.work_time_preset2 || 15}/{pomodoro.break_time_preset2 || 3})</option>
              <option value="preset3" className="bg-gray-800 text-white">🧠 Preset 3 ({pomodoro.work_time_preset3 || 90}/{pomodoro.break_time_preset3 || 20})</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg className="w-4 h-4 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
  
        {/* Custom Settings */}
        <div className="relative z-10 grid grid-cols-3 gap-3 mb-6">
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
                className="w-full p-2 rounded-lg text-white text-sm font-medium text-center backdrop-blur-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  background: 'rgba(0, 0, 0, 0.2)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.08), 0 0 20px rgba(100, 150, 255, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                }}
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
                className="w-full p-2 rounded-lg text-white text-sm font-medium text-center backdrop-blur-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  background: 'rgba(0, 0, 0, 0.2)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.08), 0 0 20px rgba(100, 150, 255, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                }}
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
                className="w-full p-2 rounded-lg text-white text-sm font-medium text-center backdrop-blur-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  background: 'rgba(0, 0, 0, 0.2)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.08), 0 0 20px rgba(100, 150, 255, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                }}
                disabled={isRunning}
              />
            </div>
          </div>
        </div>
  
        {/* Control Buttons */}
        <div className="relative z-10 flex gap-3 mt-auto">
          <button
            onClick={handleStart}
            className={`flex-1 font-semibold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-105 active:scale-95 backdrop-blur-sm ${
              isRunning 
                ? 'bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white shadow-yellow-200 dark:shadow-yellow-900' 
                : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-green-200 dark:shadow-green-900'
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
            className="flex-1 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-105 active:scale-95 shadow-lg shadow-red-200 dark:shadow-red-900"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd"/>
            </svg>
            Reset
          </button>
        </div>
      </div>
    );
  };

