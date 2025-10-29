import { useState, useRef, useEffect, useCallback } from 'react'
import { useTheme } from '../contexts/ThemeContext'
import { VoiceService } from '../services/voiceService'
import { AudioService } from '../services/audioService'
import { logger } from '../services/loggingService'

export default function VoiceAIAgent() {
  const { isDarkMode } = useTheme()
  const [status, setStatus] = useState('idle') // 'idle', 'listening', 'thinking', 'speaking', 'connected'
  const [isConnected, setIsConnected] = useState(false)
  const [isInitializing, setIsInitializing] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [mode, setMode] = useState('wellness') // 'wellness' or 'study'
  const [vadStatus, setVadStatus] = useState({ isSpeech: false, confidence: 0 })

  const voiceServiceRef = useRef(null)
  const audioServiceRef = useRef(null)

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (voiceServiceRef.current) {
        voiceServiceRef.current.disconnect()
      }
      if (audioServiceRef.current) {
        audioServiceRef.current.cleanup()
      }
    }
  }, [])

  const handleVoiceMessage = useCallback((message) => {
    logger.debug('Received voice message', { type: message.type, status: message.status }, 'VoiceAIAgent')
    switch (message.type) {
      case 'audio':
        logger.info('Audio message received', { dataLength: message.data?.length, mimeType: message.mimeType }, 'VoiceAIAgent')
        if (message.data && audioServiceRef.current) {
          logger.debug('Attempting to play audio', { mimeType: message.mimeType }, 'VoiceAIAgent')
          audioServiceRef.current.playAudio(message.data, message.mimeType || 'audio/pcm;rate=24000').catch(error => {
            logger.error('Error playing audio', { error }, 'VoiceAIAgent')
          })
        } else {
          logger.warn('Cannot play audio - no data or service not ready', {}, 'VoiceAIAgent')
        }
        break
      case 'text':
        logger.info('Text response received', { text: message.text }, 'VoiceAIAgent')
        break
      case 'status':
        const statusValue = message.status || 'idle'
        setStatus(statusValue)
        
        // Handle specific status messages
        if (statusValue === 'connected') {
          logger.info('Connected to AI service', { text: message.text }, 'VoiceAIAgent')
        } else if (statusValue === 'config_received') {
          logger.info('Configuration received', { text: message.text }, 'VoiceAIAgent')
        }
        break
      case 'error':
        logger.error('Voice service error', { text: message.text }, 'VoiceAIAgent')
        break
    }
  }, [])

  const handleStatusChange = useCallback((newStatus) => {
    setStatus(newStatus)
  }, [])

  const handleError = useCallback((error) => {
    logger.error('Connection Error', { error }, 'VoiceAIAgent')
    setIsConnected(false)
    setStatus('idle')
  }, [])

  const handleConnect = async () => {
    if (isInitializing) return
    
    logger.info('Starting connection process', { mode, status }, 'VoiceAIAgent')
    
    setIsInitializing(true)
    
    try {
      logger.info('Initializing audio service', {}, 'VoiceAIAgent')
      // Initialize audio service
      audioServiceRef.current = new AudioService({
        onAudioData: (audioData, sampleRate) => {
          logger.debug('Audio callback received', { dataLength: audioData.length, sampleRate, muted: isMuted }, 'VoiceAIAgent')
          setDebugInfo(prev => ({
            ...prev,
            audioChunksSent: prev.audioChunksSent + 1,
            lastAudioTime: new Date()
          }))
          if (voiceServiceRef.current && !isMuted) {
            logger.debug('Sending audio to voice service', {}, 'VoiceAIAgent')
            voiceServiceRef.current.sendAudio(audioData, sampleRate)
          } else {
            logger.debug('Not sending audio - service not ready or muted', {}, 'VoiceAIAgent')
          }
        },
        onError: (error) => {
          logger.error('Audio service error', { error }, 'VoiceAIAgent')
          handleError(error)
        },
        onVADStatus: (isSpeech, confidence) => {
          logger.debug('VAD status', { isSpeech, confidence }, 'VoiceAIAgent')
          setVadStatus({ isSpeech, confidence })
        }
      })

      logger.info('Audio service initialized successfully', {}, 'VoiceAIAgent')

      logger.info('Initializing voice service', {}, 'VoiceAIAgent')
      // Initialize voice service
      voiceServiceRef.current = new VoiceService(
        handleVoiceMessage,
        handleStatusChange,
        handleError
      )

      // Create configuration based on mode
      const config = {
        systemPrompt: "", // System prompts are now handled by the backend
        voice: "Puck",
        allowInterruptions: true,
        mode: mode,
        vad_enabled: true
      }

      logger.info('Connecting to voice service', { config }, 'VoiceAIAgent')
      await voiceServiceRef.current.connect(config)
      logger.info('Voice service connected successfully', {}, 'VoiceAIAgent')
      
      setIsConnected(true)
      setStatus("listening")
      
      logger.info('Starting continuous recording', {}, 'VoiceAIAgent')
      // Start continuous recording
      audioServiceRef.current.startRecording()
      logger.info('Recording started', {}, 'VoiceAIAgent')

      logger.info(`Connected to ${mode === 'wellness' ? 'Wellness Journal' : 'Study Journal'}`, {}, 'VoiceAIAgent')

    } catch (error) {
      logger.error('Connection error', { error }, 'VoiceAIAgent')
      handleError('Failed to connect to voice service: ' + error.message)
    } finally {
      logger.info('Connection process finished', {}, 'VoiceAIAgent')
      setIsInitializing(false)
    }
  }

  const handleEndCall = () => {
    if (audioServiceRef.current) {
      audioServiceRef.current.stopRecording()
      audioServiceRef.current.stopPlayback() // Stop any ongoing playback and clear queue
      audioServiceRef.current.cleanup()
    }
    
    if (voiceServiceRef.current) {
      voiceServiceRef.current.disconnect()
    }
    
    setIsConnected(false)
    setStatus("idle")
    logger.info('Session ended', {}, 'VoiceAIAgent')
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
    logger.info(isMuted ? 'Microphone enabled' : 'Microphone muted', {}, 'VoiceAIAgent')
  }

  const getGreeting = () => {
    if (mode === "wellness") {
      return "Hi there! I'm Sahay, your wellness journal companion. I'm here to listen and help you process your daily experiences. How are you feeling today?"
    }
    return "Hello! I'm Sahay, your study journal companion. I'm here to listen and help you reflect on your academic journey. What's on your mind about your studies?"
  }

  const getModeDescription = () => {
    if (mode === "wellness") {
      return "A safe space for voice journalling about your daily experiences, emotions, and wellbeing. Share your thoughts and feelings as I listen and help you process them."
    }
    return "A supportive space for voice journalling about your academic experiences, challenges, and learning journey. Reflect on your studies as I listen and help you understand your patterns."
  }

  return (
    <div className={`${isDarkMode ? 'dark' : ''} min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 dark:from-indigo-950 dark:to-purple-950`}>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
            🎙️ Voice AI Agent
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {getModeDescription()}
          </p>
        </div>

        {/* Mode Toggle */}
        <div className="flex justify-center mb-6">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg p-2 border border-white/20 dark:border-gray-700/20">
            <button
              onClick={() => setMode('wellness')}
              className={`px-4 py-2 rounded-md transition-colors ${
                mode === 'wellness'
                  ? 'bg-green-500 text-white'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              🌱 Wellness
            </button>
            <button
              onClick={() => setMode('study')}
              className={`px-4 py-2 rounded-md transition-colors ${
                mode === 'study'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              📚 Study
            </button>
          </div>
        </div>

        {/* Main Voice Interface */}
        <div className="max-w-4xl mx-auto">
          {/* Voice Control Panel */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20 dark:border-gray-700/20 mb-6">
            <div className="text-center">
              {/* Microphone Button */}
              <div className="relative mb-6">
                <button
                  onClick={isConnected ? handleEndCall : handleConnect}
                  disabled={isInitializing}
                  className={`relative w-32 h-32 rounded-full transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed ${
                    isConnected
                      ? 'bg-red-500 hover:bg-red-600 shadow-red-500/30'
                      : 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 shadow-indigo-500/30'
                  } shadow-2xl`}
                >
                  <div className="absolute inset-0 rounded-full animate-pulse bg-white/20"></div>
                  <div className="relative z-10 text-white text-4xl">
                    {isConnected ? '🔴' : '🎤'}
                  </div>
                </button>
                
                {/* Pulse animation when listening */}
                {isConnected && status === 'listening' && (
                  <div className="absolute inset-0 rounded-full border-4 border-red-400 animate-ping"></div>
                )}

                {/* Mute button overlay */}
                {isConnected && (
                  <div className="absolute -bottom-3 -right-3">
                    <button
                      onClick={toggleMute}
                      className={`rounded-full w-10 h-10 p-0 border-2 ${
                        isMuted 
                          ? 'bg-red-500 text-white border-red-500' 
                          : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600'
                      }`}
                    >
                      {isMuted ? '🔇' : '🎤'}
                    </button>
                  </div>
                )}
              </div>

              {/* Status */}
              <div className="mb-4">
                {isInitializing && (
                  <p className="text-indigo-500 font-medium animate-pulse">
                    🔄 Connecting...
                  </p>
                )}
                {isConnected && status === 'listening' && (
                  <p className="text-green-500 font-medium animate-pulse">
                    🎙️ Listening...
                  </p>
                )}
                {isConnected && status === 'thinking' && (
                  <p className="text-yellow-500 font-medium">
                    🧠 Thinking...
                  </p>
                )}
                {isConnected && status === 'speaking' && (
                  <p className="text-blue-500 font-medium">
                    🔊 Speaking...
                  </p>
                )}
                {!isConnected && !isInitializing && (
                  <p className="text-gray-500 dark:text-gray-400">
                    Click the microphone to start conversation
                  </p>
                )}
              </div>

              {/* VAD Status */}
              {isConnected && (
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <div className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    vadStatus.isSpeech 
                      ? 'bg-green-500 animate-pulse' 
                      : 'bg-gray-400'
                  }`} />
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {vadStatus.isSpeech ? 'Speech detected' : 'Listening...'}
                    {vadStatus.confidence > 0 && (
                      <span className="ml-1">({Math.round(vadStatus.confidence * 100)}%)</span>
                    )}
                  </span>
                </div>
              )}

              {/* Greeting */}
              {!isConnected && (
                <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 mb-4">
                  <p className="text-gray-800 dark:text-gray-200 italic">
                    {getGreeting()}
                  </p>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Speech Recognition Support Check */}
        {!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) && (
          <div className="fixed bottom-4 right-4 bg-yellow-500 text-white p-4 rounded-lg shadow-lg">
            <p className="text-sm">
              ⚠️ Speech recognition not supported in this browser
            </p>
          </div>
        )}
      </div>
    </div>
  )
}