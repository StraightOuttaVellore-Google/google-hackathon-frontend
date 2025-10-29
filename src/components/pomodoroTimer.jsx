import { useState, useEffect, useRef } from "react";
import useStudyStore from "../stores/studyStore";

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
      <div className="h-full flex flex-col p-6 neuro-card">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-xl font-semibold neuro-text-primary mb-2">
            Pomodoro Timer
          </h2>
          <p className="text-sm neuro-text-tertiary">
            Stay focused with structured breaks
          </p>
        </div>

        {/* Timer Display */}
        <div className="text-center mb-6">
          <div className="neuro-surface-elevated p-6 mb-4">
            <div className="text-4xl md:text-5xl font-mono font-bold neuro-text-primary mb-3">
              {formatTime(currentTime)}
            </div>
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className={`w-3 h-3 rounded-full ${isBreak ? 'bg-green-400' : 'bg-blue-400'} animate-pulse`}></div>
              <span className="text-lg font-medium neuro-text-secondary">
                {isBreak ? 'Break Time' : 'Focus Time'}
              </span>
            </div>
            <div className="text-sm neuro-text-tertiary">
              {isBreak ? pomodoro.break_time : pomodoro.work_time} minutes • Cycle {currentIteration} of {pomodoro.no_of_iterations}
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="flex justify-center gap-2 mb-4">
            {Array.from({ length: pomodoro.no_of_iterations }, (_, index) => (
              <div 
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index < currentIteration ? 'bg-green-400 scale-110' : 
                  index === currentIteration - 1 ? 'bg-blue-400 scale-110' : 
                  'bg-gray-300 dark:bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Preset Selection */}
        <div className="mb-6">
          <label className="block text-sm font-semibold neuro-text-primary mb-3">
            Quick Presets
          </label>
          <div className="relative">
            <select 
              value={selectedPreset}
              onChange={(e) => handlePresetChange(e.target.value)}
              className="neuro-select w-full pr-10 text-sm font-medium"
            >
              <option value="none">🎯 Custom Settings</option>
              <option value="preset1">🎯 Classic ({pomodoro.work_time_preset1 || 45}m/{pomodoro.break_time_preset1 || 10}m)</option>
              <option value="preset2">⚡ Quick Sprint ({pomodoro.work_time_preset2 || 15}m/{pomodoro.break_time_preset2 || 3}m)</option>
              <option value="preset3">🧠 Deep Focus ({pomodoro.work_time_preset3 || 90}m/{pomodoro.break_time_preset3 || 20}m)</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
              <svg className="w-4 h-4 neuro-text-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Custom Settings */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="space-y-2">
            <label className="block text-sm font-medium neuro-text-secondary">Study</label>
            <div className="neuro-surface-inset p-3 text-center">
              <input
                type="number"
                value={pomodoro.work_time}
                onChange={(e) => {
                  handleCustomTimeChange('work_time', Number(e.target.value));
                }}
                min="1"
                max="120"
                className="w-full bg-transparent border-none text-center text-lg font-semibold neuro-text-primary focus:outline-none disabled:opacity-50"
                disabled={isRunning}
              />
              <div className="text-xs neuro-text-tertiary mt-1">minutes</div>
            </div>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium neuro-text-secondary">Break</label>
            <div className="neuro-surface-inset p-3 text-center">
              <input
                type="number"
                value={pomodoro.break_time}
                onChange={(e) => handleCustomTimeChange('break_time', Number(e.target.value))}
                min="1"
                max="60"
                className="w-full bg-transparent border-none text-center text-lg font-semibold neuro-text-primary focus:outline-none disabled:opacity-50"
                disabled={isRunning}
              />
              <div className="text-xs neuro-text-tertiary mt-1">minutes</div>
            </div>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium neuro-text-secondary">Cycles</label>
            <div className="neuro-surface-inset p-3 text-center">
              <input
                type="number"
                value={pomodoro.no_of_iterations}
                onChange={(e) => handleCustomTimeChange('no_of_iterations', Number(e.target.value))}
                min="1"
                max="10"
                className="w-full bg-transparent border-none text-center text-lg font-semibold neuro-text-primary focus:outline-none disabled:opacity-50"
                disabled={isRunning}
              />
              <div className="text-xs neuro-text-tertiary mt-1">rounds</div>
            </div>
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex gap-4 mt-auto">
          <button
            onClick={handleStart}
            className={`flex-1 py-4 px-6 rounded-xl font-semibold flex items-center justify-center gap-3 transition-all duration-300 ${
              isRunning 
                ? 'neuro-button bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 hover:bg-yellow-200 dark:hover:bg-yellow-900/50' 
                : 'neuro-button-primary text-white'
            }`}
          >
            {isRunning ? (
              <>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5.75 3a.75.75 0 00-.75.75v12.5c0 .414.336.75.75.75h1.5a.75.75 0 00.75-.75V3.75A.75.75 0 007.25 3h-1.5zM12.75 3a.75.75 0 00-.75.75v12.5c0 .414.336.75.75.75h1.5a.75.75 0 00.75-.75V3.75a.75.75 0 00-.75-.75h-1.5z"/>
                </svg>
                Pause
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"/>
                </svg>
                Start Focus
              </>
            )}
          </button>
          <button
            onClick={handleReset}
            className="px-6 py-4 neuro-button neuro-text-secondary hover:neuro-text-primary rounded-xl font-medium flex items-center justify-center gap-3"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd"/>
            </svg>
            Reset
          </button>
        </div>
      </div>
    );
  };

