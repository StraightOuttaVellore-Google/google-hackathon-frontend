import React, { useState } from 'react';
import { Mic, MicOff, Play } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card, CardContent } from '../ui/Card';

const VoiceAgentCard = ({ className }) => {
  const [isListening, setIsListening] = useState(false);
  const [isSessionActive, setIsSessionActive] = useState(false);

  const handleStartSession = () => {
    setIsSessionActive(true);
    setIsListening(true);
    // TODO: Implement actual voice agent functionality
    console.log('Voice agent session started');
  };

  const handleStopSession = () => {
    setIsSessionActive(false);
    setIsListening(false);
    // TODO: Implement stop voice agent functionality
    console.log('Voice agent session stopped');
  };

  const handleToggleListening = () => {
    setIsListening(!isListening);
    // TODO: Implement toggle listening functionality
    console.log('Listening toggled:', !isListening);
  };

  return (
    <Card className={`h-full ${className}`}>
      <CardContent className="h-full flex flex-col justify-center items-center p-6">
        {/* Microphone Icon */}
        <div className="w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-4">
          {isListening ? (
            <Mic className="w-8 h-8 text-purple-600 dark:text-purple-400 animate-pulse" />
          ) : (
            <MicOff className="w-8 h-8 text-purple-600 dark:text-purple-400" />
          )}
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2 text-center">
          Voice Agent
        </h3>

        {/* Subtitle */}
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 text-center">
          {isListening ? 'Listening Mode' : 'Ready to Assist'}
        </p>

        {/* Start Session Button */}
        {!isSessionActive ? (
          <Button
            onClick={handleStartSession}
            className="w-full flex items-center justify-center space-x-2"
            size="lg"
          >
            <Play className="w-5 h-5" />
            <span>Start Session</span>
          </Button>
        ) : (
          <div className="w-full space-y-3">
            {/* Session Active Indicator */}
            <div className="flex items-center justify-center space-x-2 text-sm text-green-600 dark:text-green-400">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Session Active</span>
            </div>

            {/* Toggle Listening Button */}
            <Button
              onClick={handleToggleListening}
              variant={isListening ? "default" : "outline"}
              className="w-full"
            >
              {isListening ? (
                <>
                  <Mic className="w-4 h-4 mr-2" />
                  Listening...
                </>
              ) : (
                <>
                  <MicOff className="w-4 h-4 mr-2" />
                  Start Listening
                </>
              )}
            </Button>

            {/* Stop Session Button */}
            <Button
              onClick={handleStopSession}
              variant="outline"
              className="w-full"
            >
              Stop Session
            </Button>
          </div>
        )}

        {/* Status Text */}
        {isSessionActive && (
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-4 text-center">
            {isListening 
              ? 'Speak naturally to interact with your study assistant'
              : 'Click "Start Listening" to begin voice interaction'
            }
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default VoiceAgentCard;
