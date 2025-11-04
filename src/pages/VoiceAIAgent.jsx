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
  const [waveformHeights] = useState(() => 
    Array.from({ length: 7 }, () => 15 + Math.random() * 25)
  )

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
    <div className={`${isDarkMode ? 'dark' : ''} min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 dark:from-indigo-950 dark:to-purple-950 flex items-center justify-center`}>
      <div className="container mx-auto px-4 py-8 w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-3">
            🎙️ Voice AI Agent
          </h1>
          <p className="text-base text-gray-600 dark:text-gray-300 mb-6">
            {getModeDescription()}
          </p>

          {/* Mode Toggle - Neumorphic */}
          <div className="flex justify-center mb-12">
            <div className="neumorphic-card p-1 flex gap-1">
              <button
                onClick={() => setMode('wellness')}
                className={`neumorphic-button px-5 py-2.5 text-sm font-medium transition-all ${
                  mode === 'wellness'
                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/30'
                    : ''
                }`}
              >
                🌱 Wellness
              </button>
              <button
                onClick={() => setMode('study')}
                className={`neumorphic-button px-5 py-2.5 text-sm font-medium transition-all ${
                  mode === 'study'
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/30'
                    : ''
                }`}
              >
                📚 Study
              </button>
            </div>
          </div>
        </div>

        {/* Main Voice Interface - Centered and Spaced */}
        <div className="flex flex-col items-center justify-center">
          {/* Voice Control Panel - Neumorphic */}
          <div className="neumorphic-card p-12 w-full mb-10">
            <div className="flex flex-col items-center justify-center">
              {/* Large Centered Microphone Icon - Maximized */}
              <div className="relative mb-10">
                {!isConnected ? (
                  <button
                    onClick={handleConnect}
                    disabled={isInitializing}
                    className="neumorphic-matrix-button relative w-48 h-48 rounded-full mx-auto disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105 flex items-center justify-center"
                  >
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 opacity-90 rounded-full"></div>
                    <div className="relative z-10 text-white text-8xl flex items-center justify-center">🎤</div>
                  </button>
                ) : (
                  <div className="relative w-44 h-44 mx-auto flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-gray-500 to-gray-600 opacity-60"></div>
                    <div className="relative z-10 text-gray-300 text-7xl flex items-center justify-center">🎙️</div>
                    {status === 'listening' && (
                      <div className="absolute inset-0 rounded-full border-4 border-green-400 animate-ping"></div>
                    )}
                    {/* Mute button */}
                    <button
                      onClick={toggleMute}
                      className={`absolute -bottom-3 -right-3 w-12 h-12 rounded-full neumorphic-button text-base ${
                        isMuted ? 'bg-red-500 text-white' : ''
                      }`}
                      title={isMuted ? 'Unmute' : 'Mute'}
                    >
                      {isMuted ? '🔇' : '🎤'}
                    </button>
                  </div>
                )}
              </div>

              {/* Status - Larger and Centered */}
              <div className="mb-10 w-full">
                {isInitializing && (
                  <div className="text-center">
                    <p className="text-indigo-500 font-semibold text-lg animate-pulse mb-3">
                      🔄 Connecting...
                    </p>
                    <div className="flex justify-center gap-2">
                      <div className="w-3 h-3 bg-indigo-500 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                      <div className="w-3 h-3 bg-indigo-500 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                      <div className="w-3 h-3 bg-indigo-500 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
                    </div>
                  </div>
                )}
                {isConnected && status === 'listening' && (
                  <div className="text-center">
                    <p className="text-green-500 font-semibold text-2xl animate-pulse mb-5">
                      🎙️ Listening...
                    </p>
                    <div className="flex items-center justify-center gap-3 h-14">
                      {Array.from({ length: 5 }, (_, i) => {
                        const heights = [32, 40, 28, 48, 36]
                        const delays = [0, 150, 300, 450, 600]
                        const durations = [600, 700, 500, 800, 650]
                        return (
                          <div
                            key={i}
                            className="w-3 bg-green-500 rounded-full animate-pulse"
                            style={{
                              height: `${heights[i]}px`,
                              animationDelay: `${delays[i]}ms`,
                              animationDuration: `${durations[i]}ms`
                            }}
                          ></div>
                        )
                      })}
                    </div>
                  </div>
                )}
                {isConnected && status === 'thinking' && (
                  <div className="text-center">
                    <p className="text-yellow-500 font-semibold text-lg mb-3">
                      🧠 Thinking...
                    </p>
                    <div className="flex justify-center gap-2">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full animate-bounce" style={{animationDelay: '200ms'}}></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full animate-bounce" style={{animationDelay: '400ms'}}></div>
                    </div>
                  </div>
                )}
                {isConnected && status === 'speaking' && (
                  <div className="text-center">
                    <p className="text-blue-500 font-semibold text-lg mb-4">
                      🔊 Speaking...
                    </p>
                    <div className="flex items-center justify-center gap-2 h-10">
                      {waveformHeights.slice(0, 5).map((height, i) => {
                        const delays = [0, 80, 160, 240, 320]
                        const durations = [500, 550, 450, 600, 480]
                        return (
                          <div
                            key={i}
                            className="w-2 bg-blue-500 rounded-full animate-pulse"
                            style={{
                              height: `${height * 0.8}px`,
                              animationDelay: `${delays[i]}ms`,
                              animationDuration: `${durations[i]}ms`
                            }}
                          ></div>
                        )
                      })}
                    </div>
                  </div>
                )}
                {!isConnected && !isInitializing && (
                  <p className="text-gray-600 dark:text-gray-300 text-lg font-medium text-center">
                    Ready to listen
                  </p>
                )}
              </div>

              {/* VAD Status - Larger */}
              {isConnected && (
                <div className="flex items-center justify-center space-x-3 mb-10">
                  <div className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    vadStatus.isSpeech 
                      ? 'bg-green-500 animate-pulse shadow-lg shadow-green-500/50' 
                      : 'bg-gray-400'
                  }`} />
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    {vadStatus.isSpeech ? 'Speech detected' : 'Listening...'}
                    {vadStatus.confidence > 0 && (
                      <span className="ml-2 text-xs">({Math.round(vadStatus.confidence * 100)}%)</span>
                    )}
                  </span>
                </div>
              )}

              {/* Large Centered Button - Maximized */}
              {isConnected ? (
                <div className="w-full max-w-lg">
                  <button
                    onClick={handleEndCall}
                    className="neumorphic-matrix-close-button w-full py-5 px-10 text-xl font-bold"
                  >
                    <span className="text-3xl">📞</span>
                    <span className="ml-4">End Call</span>
                  </button>
                </div>
              ) : (
                <div className="w-full max-w-lg">
                  <button
                    onClick={handleConnect}
                    disabled={isInitializing}
                    className="neumorphic-matrix-button w-full py-5 px-10 text-xl font-bold disabled:opacity-50"
                  >
                    <span className="text-3xl">🎤</span>
                    <span className="ml-4">Start Conversation</span>
                  </button>
                </div>
              )}

              {/* Greeting - Larger */}
              {!isConnected && (
                <div className="neumorphic-card p-6 mt-8 w-full">
                  <p className="text-gray-800 dark:text-gray-200 text-base leading-relaxed text-center">
                    {getGreeting()}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Tips/Info Cards - Always visible, Neumorphic */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
            <div className="neumorphic-card p-5 text-center">
              <div className="text-3xl mb-2">💭</div>
              <p className="text-sm text-gray-700 dark:text-gray-300 font-medium mb-1">Share freely</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Your thoughts are safe</p>
            </div>
            <div className="neumorphic-card p-5 text-center">
              <div className="text-3xl mb-2">🎯</div>
              <p className="text-sm text-gray-700 dark:text-gray-300 font-medium mb-1">Natural flow</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Speak naturally</p>
            </div>
            <div className="neumorphic-card p-5 text-center">
              <div className="text-3xl mb-2">✨</div>
              <p className="text-sm text-gray-700 dark:text-gray-300 font-medium mb-1">AI insights</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Get helpful analysis</p>
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