import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Settings } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Button } from '../ui/Button';
import { Toggle } from '../ui/Toggle';
import { useStudyStore } from '../../store/studyStore';

const PomodoroCard = ({ className }) => {
  const { 
    pomodoroSession, 
    studyData, 
    startPomodoro, 
    pausePomodoro, 
    resetPomodoro, 
    setPomodoroPreset 
  } = useStudyStore();
  
  const [workMode, setWorkMode] = useState(true);
  const [timeDisplay, setTimeDisplay] = useState('25:00');

  // Format time in MM:SS format
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Timer effect
  useEffect(() => {
    let interval = null;
    
    if (pomodoroSession.isActive) {
      interval = setInterval(() => {
        setTimeDisplay(formatTime(pomodoroSession.timeRemaining));
        
        if (pomodoroSession.timeRemaining > 0) {
          // Update time remaining in store
          // This would be handled by the store in a real implementation
        } else {
          // Timer finished - handle break/work transition
          pausePomodoro();
        }
      }, 1000);
    } else {
      setTimeDisplay(formatTime(pomodoroSession.timeRemaining));
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [pomodoroSession.isActive, pomodoroSession.timeRemaining, pausePomodoro]);

  const handleStartPause = () => {
    if (pomodoroSession.isActive) {
      pausePomodoro();
    } else {
      startPomodoro();
    }
  };

  const handleReset = () => {
    resetPomodoro();
  };

  const handlePresetChange = (preset) => {
    setPomodoroPreset(preset);
  };

  const getPresetTime = (preset) => {
    if (!studyData?.pomodoro_timer) return '25:00';
    
    const timer = studyData.pomodoro_timer;
    let workTime = timer.work_time;
    
    if (preset === 1 && timer.work_time_preset1) {
      workTime = timer.work_time_preset1;
    } else if (preset === 2 && timer.work_time_preset2) {
      workTime = timer.work_time_preset2;
    } else if (preset === 3 && timer.work_time_preset3) {
      workTime = timer.work_time_preset3;
    }
    
    return formatTime(workTime * 60);
  };

  return (
    <Card className={`h-full ${className}`}>
      <CardHeader className="pb-4">
        <CardTitle className="text-lg">Pomodoro Timer</CardTitle>
      </CardHeader>

      <CardContent className="pt-0">
        {/* Timer Display */}
        <div className="text-center mb-6">
          <div className="text-4xl font-mono font-bold text-purple-600 dark:text-purple-400 mb-2">
            {timeDisplay}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {pomodoroSession.isBreak ? 'Break Time' : 'Work Time'} • 
            Session {pomodoroSession.currentIteration + 1} of {pomodoroSession.totalIterations}
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex justify-center space-x-3 mb-6">
          <Button
            onClick={handleStartPause}
            size="lg"
            className="flex items-center space-x-2"
          >
            {pomodoroSession.isActive ? (
              <>
                <Pause className="w-5 h-5" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-5 h-5" />
                <span>Start Session</span>
              </>
            )}
          </Button>
          
          <Button
            onClick={handleReset}
            variant="outline"
            size="lg"
            className="flex items-center space-x-2"
          >
            <RotateCcw className="w-5 h-5" />
            <span>Reset</span>
          </Button>
        </div>

        {/* Work Mode Toggle */}
        <div className="mb-6">
          <Toggle
            isOn={workMode}
            onToggle={setWorkMode}
            label="Work Mode"
          />
        </div>

        {/* Preset Buttons */}
        <div className="space-y-3">
          <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Quick Presets
          </div>
          
          <div className="grid grid-cols-3 gap-2">
            {[1, 2, 3].map((preset) => (
              <Button
                key={preset}
                variant="outline"
                size="sm"
                onClick={() => handlePresetChange(preset)}
                className="text-xs"
              >
                <div className="text-center">
                  <div className="font-semibold">Preset {preset}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {getPresetTime(preset)}
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="mt-6">
          <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-2">
            <span>Progress</span>
            <span>{Math.round((pomodoroSession.currentIteration / pomodoroSession.totalIterations) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-purple-600 h-2 rounded-full transition-all duration-300"
              style={{ 
                width: `${(pomodoroSession.currentIteration / pomodoroSession.totalIterations) * 100}%` 
              }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PomodoroCard;
