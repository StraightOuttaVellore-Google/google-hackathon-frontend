import { useState, useRef, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { useTheme } from '../contexts/ThemeContext'
import { VoiceService } from '../services/voiceService'
import { AudioService } from '../services/audioService'
import { logger } from '../services/loggingService'

export default function VoiceAIOverlay({ isOpen, onClose }) {
  const { isDarkMode } = useTheme()
  const [isListening, setIsListening] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [conversation, setConversation] = useState([])
  const [showSummary, setShowSummary] = useState(false)
  const [summaries, setSummaries] = useState([])
  const [isConnected, setIsConnected] = useState(false)
  const [isInitializing, setIsInitializing] = useState(false)
  const [vadStatus, setVadStatus] = useState({ isSpeech: false, confidence: 0 })
  
  const voiceServiceRef = useRef(null)
  const audioServiceRef = useRef(null)
  const recognitionRef = useRef(null)
  
  // Audio queue management for accurate transcript recording
  const audioQueueRef = useRef([])
  const isPlayingRef = useRef(false)

  // Audio queue management functions
  const addToAudioQueue = useCallback((audioData, mimeType, audioId) => {
    const audioItem = {
      id: audioId,
      data: audioData,
      mimeType: mimeType,
      timestamp: Date.now(),
      played: false
    }
    audioQueueRef.current.push(audioItem)
    logger.info('Added audio to queue', { audioId, queueSize: audioQueueRef.current.length }, 'VoiceAIOverlay')
    
    // Process queue if not currently playing
    if (!isPlayingRef.current) {
      processAudioQueue()
    }
  }, [])

  const processAudioQueue = useCallback(async () => {
    if (isPlayingRef.current || audioQueueRef.current.length === 0) {
      return
    }

    const audioItem = audioQueueRef.current.shift()
    if (!audioItem) return

    isPlayingRef.current = true
    logger.info('Processing audio from queue', { audioId: audioItem.id }, 'VoiceAIOverlay')

    try {
      if (audioServiceRef.current) {
        await audioServiceRef.current.playAudio(audioItem.data, audioItem.mimeType)
        audioItem.played = true
        
        // Send playback confirmation to backend
        if (voiceServiceRef.current) {
          voiceServiceRef.current.send({
            type: 'audio_played',
            audioId: audioItem.id
          })
          logger.info('Sent audio playback confirmation', { audioId: audioItem.id }, 'VoiceAIOverlay')
        }
      }
    } catch (error) {
      logger.error('Error playing audio from queue', { error, audioId: audioItem.id }, 'VoiceAIOverlay')
    } finally {
      isPlayingRef.current = false
      
      // Process next item in queue immediately for faster response
      setTimeout(() => {
        processAudioQueue()
      }, 50)  // Reduced from 100ms to 50ms
    }
  }, [])

  // Voice message handler
  const handleVoiceMessage = useCallback((message) => {
    logger.debug('Received voice message', { type: message.type, status: message.status }, 'VoiceAIOverlay')
    switch (message.type) {
      case 'audio':
        logger.info('Audio message received', { 
          dataLength: message.data?.length, 
          mimeType: message.mimeType,
          audioId: message.audioId
        }, 'VoiceAIOverlay')
        if (message.data && message.audioId) {
          // Add to audio queue instead of playing immediately
          addToAudioQueue(message.data, message.mimeType || 'audio/pcm;rate=24000', message.audioId)
        } else {
          logger.warn('Cannot queue audio - missing data or audioId', {}, 'VoiceAIOverlay')
        }
        break
      case 'text':
        logger.info('Text response received', { text: message.text }, 'VoiceAIOverlay')
        // Add AI response to conversation
        const aiResponse = {
          type: 'ai',
          text: message.text,
          timestamp: new Date()
        }
        setConversation(prev => [...prev, aiResponse])
        break
      case 'status':
        const statusValue = message.status || 'idle'
        setIsProcessing(statusValue === 'thinking' || statusValue === 'speaking')
        setIsListening(statusValue === 'listening')
        
        // Handle specific status messages
        if (statusValue === 'connected') {
          logger.info('Connected to AI service', { text: message.text }, 'VoiceAIOverlay')
        } else if (statusValue === 'config_received') {
          logger.info('Configuration received', { text: message.text }, 'VoiceAIOverlay')
        }
        break
      case 'error':
        logger.error('Voice service error', { text: message.text }, 'VoiceAIOverlay')
        break
    }
  }, [])

  const handleStatusChange = useCallback((newStatus) => {
    setIsProcessing(newStatus === 'thinking' || newStatus === 'speaking')
    setIsListening(newStatus === 'listening')
  }, [])

  const handleError = useCallback((error) => {
    logger.error('Voice service error', { error }, 'VoiceAIOverlay')
    setIsConnected(false)
    setIsProcessing(false)
    setIsListening(false)
  }, [])

  useEffect(() => {
    if (isOpen) {
      // Load saved summaries from localStorage
      const savedSummaries = JSON.parse(localStorage.getItem('voiceAISummaries') || '[]')
      setSummaries(savedSummaries)
      
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden'
    } else {
      // Restore body scroll when modal is closed
      document.body.style.overflow = 'unset'
      
      // Cleanup voice services when closing
      if (audioServiceRef.current) {
        audioServiceRef.current.stopRecording()
        audioServiceRef.current.stopPlayback()
        audioServiceRef.current.cleanup()
      }
      
      if (voiceServiceRef.current) {
        voiceServiceRef.current.disconnect()
      }
      
      setIsConnected(false)
      setIsProcessing(false)
      setIsListening(false)
    }
    
    // Handle escape key
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
    }
    
    // Cleanup function
    return () => {
      document.body.style.overflow = 'unset'
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  const handleConnect = async () => {
    if (isInitializing) return
    
    setIsInitializing(true)
    
    try {
      logger.info('Starting connection process', {}, 'VoiceAIOverlay')
      
      // Initialize audio service
      logger.debug('Creating AudioService instance', {}, 'VoiceAIOverlay')
      audioServiceRef.current = new AudioService({
        onAudioData: (audioData, sampleRate) => {
          logger.debug('Audio callback received', { 
            dataLength: audioData.length, 
            sampleRate, 
            muted: false
          }, 'VoiceAIOverlay')
          if (voiceServiceRef.current) {
            // Send audio at 16kHz (will be converted to 24kHz in backend)
            voiceServiceRef.current.sendAudio(audioData, sampleRate)
          } else {
            logger.debug("Not sending audio - service not ready", {}, 'VoiceAIOverlay')
          }
        },
        onError: handleError,
        onVADStatus: (isSpeech, confidence) => {
          setVadStatus({ isSpeech, confidence })
        }
      })

      logger.debug('Calling audioService.initialize()', {}, 'VoiceAIOverlay')
      await audioServiceRef.current.initialize()
      logger.info('Audio service initialized successfully', {}, 'VoiceAIOverlay')

      // Initialize voice service
      logger.debug('Creating VoiceService instance', {}, 'VoiceAIOverlay')
      voiceServiceRef.current = new VoiceService(
        handleVoiceMessage,
        handleStatusChange,
        handleError
      )

      // Create configuration for wellness mode
      const config = {
        systemPrompt: "", // System prompts are now handled by the backend
        voice: "Puck",
        allowInterruptions: true,
        mode: "wellness",
        vad_enabled: true
      }

      logger.debug('Connecting to voice service', { config }, 'VoiceAIOverlay')
      await voiceServiceRef.current.connect(config)
      logger.info('Voice service connected successfully', {}, 'VoiceAIOverlay')
      
      setIsConnected(true)
      setIsListening(true)
      
      // Start continuous recording
      logger.debug('Starting audio recording', {}, 'VoiceAIOverlay')
      audioServiceRef.current.startRecording()
      logger.info('Audio recording started', {}, 'VoiceAIOverlay')

    } catch (error) {
      logger.error('Connection error', { error: error.message, stack: error.stack, name: error.name }, 'VoiceAIOverlay')
      handleError('Failed to connect to voice service')
    } finally {
      setIsInitializing(false)
    }
  }

  const handleEndCall = () => {
    if (audioServiceRef.current) {
      audioServiceRef.current.stopRecording()
      audioServiceRef.current.stopPlayback()
      audioServiceRef.current.cleanup()
    }
    
    if (voiceServiceRef.current) {
      voiceServiceRef.current.disconnect()
    }
    
    setIsConnected(false)
    setIsProcessing(false)
    setIsListening(false)
  }

  const clearConversation = () => {
    setConversation([])
    setTranscript('')
  }

  const clearHistory = () => {
    setSummaries([])
    localStorage.removeItem('voiceAISummaries')
  }

  const deleteSummary = (id) => {
    const updated = summaries.filter(s => s.id !== id)
    setSummaries(updated)
    localStorage.setItem('voiceAISummaries', JSON.stringify(updated))
  }

  const mockSummaries = [
    {
      id: 1,
      date: '2024-01-15',
      time: '14:30',
      title: 'Study Session Planning',
      summary: 'Discussed upcoming exam schedule and created a study plan for mathematics and physics. Set up 3 study sessions per week.',
      duration: '5 min'
    },
    {
      id: 2,
      date: '2024-01-14',
      time: '10:15',
      title: 'Wellness Check-in',
      summary: 'Talked about stress management techniques and breathing exercises. Planned a meditation routine for the next week.',
      duration: '8 min'
    },
    {
      id: 3,
      date: '2024-01-13',
      time: '16:45',
      title: 'Task Prioritization',
      summary: 'Used Eisenhower Matrix to organize pending tasks. Identified urgent vs important activities and created action items.',
      duration: '12 min'
    },
    {
      id: 4,
      date: '2024-01-12',
      time: '09:20',
      title: 'Goal Setting',
      summary: 'Defined short-term and long-term academic goals. Discussed strategies for maintaining focus and motivation.',
      duration: '7 min'
    }
  ]

  const displaySummaries = summaries.length > 0 ? summaries : mockSummaries

  if (!isOpen) return null

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      
      {/* Modal */}
      <div className="neumorphic-timer-card w-full max-w-4xl max-h-[90vh] rounded-2xl overflow-hidden">
        {/* Stars Background */}
        {[...Array(20)].map((_, i) => (
          <div
            key={`overlay-star-${i}`}
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

        {/* Header */}
        <div className="relative z-10 flex items-center justify-between p-6 border-b border-white/20">
          <div className="flex items-center gap-4">
            <img
              src="images/38dc7c1a-2e26-44b6-9c9b-97ca9ff38a60.png"
              alt="Voice Agent"
              className="w-12 h-12 object-cover rounded-lg"
              style={{
                filter: 'drop-shadow(0 0 8px rgba(60, 90, 150, 0.7)) drop-shadow(0 0 16px rgba(40, 70, 120, 0.5)) drop-shadow(0 0 24px rgba(30, 50, 100, 0.4)) drop-shadow(0 0 32px rgba(20, 40, 80, 0.3))',
                borderRadius: '0.5rem'
              }}
            />
            <h2 className="text-2xl font-bold text-white dark:text-white light:text-black">
              <span style={{ fontFamily: 'Samarkan' }}>आवाज़</span>AI
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowSummary(!showSummary)}
              className="neumorphic-matrix-button flex items-center gap-2"
            >
              <span className="text-lg">📚</span>
              <span>{showSummary ? 'Hide' : 'Show'} Summary</span>
            </button>
            <button
              onClick={onClose}
              className="neumorphic-matrix-close-button"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex h-[calc(90vh-140px)]">
          {/* Voice Interface */}
          <div className="relative z-10 flex-1 p-6 border-r border-white/20">
            {/* Voice Control Panel */}
            <div className="text-center mb-6">
              {/* Voice Agent Image */}
              <div className="relative mb-6 flex justify-center">
                <div className="relative">
                  <img
                    src="images/38dc7c1a-2e26-44b6-9c9b-97ca9ff38a60.png"
                    alt="Voice Agent"
                    className={`w-48 h-48 object-cover rounded-lg transition-all duration-700 ${
                      isListening 
                        ? 'animate-pulse' 
                        : 'hover:scale-105'
                    }`}
                    style={{
                      filter: isListening 
                        ? 'drop-shadow(0 0 15px rgba(100, 150, 255, 0.8)) drop-shadow(0 0 30px rgba(100, 150, 255, 0.6)) drop-shadow(0 0 45px rgba(100, 150, 255, 0.4)) drop-shadow(0 0 60px rgba(100, 150, 255, 0.2))'
                        : 'drop-shadow(0 0 8px rgba(60, 90, 150, 0.7)) drop-shadow(0 0 16px rgba(40, 70, 120, 0.5)) drop-shadow(0 0 24px rgba(30, 50, 100, 0.4)) drop-shadow(0 0 32px rgba(20, 40, 80, 0.3))',
                      borderRadius: '0.5rem'
                    }}
                  />
                  
                  {/* Recording Glow Animation */}
                  {isListening && (
                    <div 
                      className="absolute inset-0 rounded-lg animate-pulse"
                      style={{
                        background: 'radial-gradient(circle, rgba(100, 150, 255, 0.3) 0%, transparent 70%)',
                        animation: 'pulse 1.5s ease-in-out infinite'
                      }}
                    ></div>
                  )}
                  
                  {/* Processing Overlay */}
                  {isProcessing && (
                    <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                      <div className="text-white dark:text-white light:text-black text-2xl animate-spin">🧠</div>
                    </div>
                  )}
                </div>
              </div>


              {/* Status */}
              <div className="mb-4">
                {isListening && (
                  <p className="text-white dark:text-white light:text-black font-medium animate-pulse">
                    🎙️ Listening...
                  </p>
                )}
                {isProcessing && (
                  <p className="text-white dark:text-white light:text-black font-medium">
                    🧠 Processing...
                  </p>
                )}
                {!isConnected && !isInitializing && (
                  <p className="text-white/70 dark:text-white/70 light:text-black/70">
                    Click "Start Conversation" to begin talking with the AI agent
                  </p>
                )}
                {isInitializing && (
                  <p className="text-white dark:text-white light:text-black font-medium">
                    🔗 Connecting to AI service...
                  </p>
                )}
                {isConnected && !isListening && !isProcessing && (
                  <p className="text-white/70 dark:text-white/70 light:text-black/70">
                    Ready to listen
                  </p>
                )}
              </div>

              {/* VAD Status Indicator */}
              {isConnected && (
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <div className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    vadStatus.isSpeech 
                      ? 'bg-green-500 animate-pulse' 
                      : 'bg-gray-400'
                  }`} />
                  <span className="text-xs text-white/70 dark:text-white/70 light:text-black/70">
                    {vadStatus.isSpeech ? 'Speech detected' : 'Listening...'}
                    {vadStatus.confidence > 0 && (
                      <span className="ml-1">({Math.round(vadStatus.confidence * 100)}%)</span>
                    )}
                  </span>
                </div>
              )}

              {/* Connection Controls */}
              <div className="mb-4">
                {!isConnected ? (
                  <button
                    onClick={handleConnect}
                    disabled={isInitializing}
                    className="neumorphic-matrix-button px-6 py-3 text-base font-medium transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isInitializing ? "Connecting..." : "Start Conversation"}
                  </button>
                ) : (
                  <button
                    onClick={handleEndCall}
                    className="neumorphic-matrix-close-button px-6 py-3 text-base font-medium transition-all duration-200 hover:scale-105"
                  >
                    End Call
                  </button>
                )}
              </div>

            </div>

            {/* Conversation History */}
            <div className="neumorphic-timer-card rounded-xl p-4 h-64 overflow-y-auto neumorphic-scrollbar">
              <h3 className="text-lg font-semibold text-white dark:text-white light:text-black mb-3">
                💬 Conversation
              </h3>
              
              <div className="space-y-3">
                {conversation.length === 0 ? (
                  <p className="text-white/70 dark:text-white/70 light:text-black/70 text-center py-8">
                    No conversation yet. Start by clicking the AI agent!
                  </p>
                ) : (
                  conversation.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs px-3 py-2 rounded-2xl ${
                          message.type === 'user'
                            ? 'neumorphic-matrix-card'
                            : 'neumorphic-timer-card'
                        }`}
                      >
                        <p className="text-sm text-white dark:text-white light:text-black">{message.text}</p>
                        <p className="text-xs text-white/70 dark:text-white/70 light:text-black/70 mt-1">
                          {message.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Summary Panel */}
          {showSummary && (
            <div className="relative z-10 w-96 p-6 neumorphic-timer-card border-l border-white/20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white dark:text-white light:text-black">
                  📚 Conversation History
                </h3>
                <button
                  onClick={clearHistory}
                  disabled={displaySummaries.length === 0}
                  className="px-3 py-1 text-white/70 dark:text-white/70 light:text-black/70 hover:text-white dark:hover:text-white light:hover:text-black disabled:text-white/40 dark:disabled:text-white/40 light:disabled:text-black/40 disabled:cursor-not-allowed hover:bg-white/20 dark:hover:bg-white/20 light:hover:bg-black/10 rounded transition-colors text-sm backdrop-blur-sm border border-white/20 dark:border-white/20 light:border-black/20"
                >
                  🗑️ Clear All
                </button>
              </div>
              
              <div className="space-y-3 max-h-96 overflow-y-auto neumorphic-scrollbar">
                {displaySummaries.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-white/70 dark:text-white/70 light:text-black/70 text-sm mb-2">
                      📝 No conversation history yet
                    </p>
                    <p className="text-white/50 dark:text-white/50 light:text-black/50 text-xs">
                      Start talking with the Voice AI agent to see summaries here
                    </p>
                  </div>
                ) : (
                  displaySummaries.map((summary) => (
                    <div
                      key={summary.id}
                      className="neumorphic-matrix-card rounded-lg p-3 hover:opacity-80 transition-all duration-200"
                    >
                      {/* Header */}
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold text-white dark:text-white light:text-black text-sm">
                            {summary.title}
                          </h4>
                          <div className="flex items-center gap-2 text-xs text-white/70 dark:text-white/70 light:text-black/70 mt-1">
                            <span>📅 {summary.date}</span>
                            <span>🕐 {summary.time}</span>
                            <span>⏱️ {summary.duration}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => deleteSummary(summary.id)}
                          className="p-1 text-white/70 dark:text-white/70 light:text-black/70 hover:text-white dark:hover:text-white light:hover:text-black hover:bg-white/20 dark:hover:bg-white/20 light:hover:bg-black/10 rounded transition-colors text-xs"
                          title="Delete summary"
                        >
                          🗑️
                        </button>
                      </div>

                      {/* Summary */}
                      <p className="text-white/80 dark:text-white/80 light:text-black/80 text-xs leading-relaxed">
                        {summary.summary}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>,
    document.body
  )
}
