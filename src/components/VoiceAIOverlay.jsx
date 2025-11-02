import { useState, useRef, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { useTheme } from '../contexts/ThemeContext'
import { useAuth } from '../contexts/AuthContext'
import { VoiceService } from '../services/voiceService'
import { AudioService } from '../services/audioService'
import { logger } from '../services/loggingService'
import { completeVoiceJournalSession, getVoiceJournalSummaries } from '../utils/voiceJournalApi'
import { useWellnessAnalysis } from '../hooks/useWellnessAnalysis'
import WellnessAnalysisResults from './WellnessAnalysisResults'
import useInsightsStore from '../stores/insightsStore'

export default function VoiceAIOverlay({ isOpen, onClose, mode = 'wellness' }) {
  const { user, token } = useAuth()
  const { isDarkMode } = useTheme()
  const { getAnalysis, markAsViewed } = useInsightsStore()
  const [isListening, setIsListening] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  
  // Conversation with full transcriptions
  const [conversation, setConversation] = useState([])
  const [currentTranscript, setCurrentTranscript] = useState({ user: '', assistant: '' })
  
  const [showSummary, setShowSummary] = useState(false)
  const [summaries, setSummaries] = useState([])
  const [isLoadingSummaries, setIsLoadingSummaries] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [isInitializing, setIsInitializing] = useState(false)
  const [vadStatus, setVadStatus] = useState({ isSpeech: false, confidence: 0 })
  const [sessionStartTime, setSessionStartTime] = useState(null)
  const [showAnalysis, setShowAnalysis] = useState(false)
  const [analysisSessionId, setAnalysisSessionId] = useState(null)
  const [selectedInsight, setSelectedInsight] = useState(null)
  
  const voiceServiceRef = useRef(null)
  const audioServiceRef = useRef(null)
  const conversationRef = useRef(null) // For auto-scroll

  // Speech recognition for user transcription
  const recognitionRef = useRef(null)
  const userTranscriptRef = useRef([])
  const shouldKeepRecognitionRunning = useRef(false)
  
  // Wellness analysis polling
  const { analysis, status: analysisStatus, error: analysisError, transcript: analysisTranscript, isCompleted } = useWellnessAnalysis(analysisSessionId)

  // Show analysis when completed
  useEffect(() => {
    if (isCompleted && analysis) {
      setShowAnalysis(true)
    }
  }, [isCompleted, analysis])

  // Fetch summaries when panel opens or when showSummary changes
  useEffect(() => {
    if (isOpen && showSummary && token) {
      fetchSummaries()
    }
  }, [isOpen, showSummary, token])

  const fetchSummaries = async () => {
    try {
      setIsLoadingSummaries(true)
      const data = await getVoiceJournalSummaries(20)
      setSummaries(data.summaries || [])
      logger.info('Fetched voice journal summaries', { count: data.summaries?.length }, 'VoiceAIOverlay')
    } catch (error) {
      logger.error('Failed to fetch summaries', { error }, 'VoiceAIOverlay')
      setSummaries([])
    } finally {
      setIsLoadingSummaries(false)
    }
  }

  // Voice message handler
  const handleVoiceMessage = useCallback((message) => {
    logger.debug('Received voice message', { type: message.type }, 'VoiceAIOverlay')
    
    switch (message.type) {
      case 'audio':
        if (message.data && audioServiceRef.current) {
          audioServiceRef.current.playAudio(message.data, message.mimeType || 'audio/pcm;rate=24000').catch(error => {
            logger.error('Error playing audio', { error }, 'VoiceAIOverlay')
          })
        }
        break
        
      case 'transcription':
        // Handle real-time transcription from backend
        const entry = {
          role: message.role,
          text: message.text,
          timestamp: message.timestamp || new Date().toISOString()
        }
        
        if (message.role === 'assistant') {
          setCurrentTranscript(prev => ({
            ...prev,
            assistant: prev.assistant + message.text
          }))
        }
        break
        
      case 'turn_complete':
        // Save complete turn to conversation
        const completeEntry = {
          role: message.role,
          text: message.text,
          timestamp: message.timestamp || new Date().toISOString()
        }
        
        setConversation(prev => [...prev, completeEntry])
        
        // Save user transcript if exists
        if (userTranscriptRef.current.length > 0) {
          const userText = userTranscriptRef.current.join(' ')
          setConversation(prev => [...prev, {
            role: 'user',
            text: userText,
            timestamp: new Date().toISOString()
          }])
          userTranscriptRef.current = []
        }
        
        // Clear current transcripts
        setCurrentTranscript({ user: '', assistant: '' })
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
        } else if (statusValue === 'listening') {
          // AI turn complete - send played audio chunks for transcription
          if (audioServiceRef.current && voiceServiceRef.current) {
            const playedChunks = audioServiceRef.current.getPlayedAudioChunks()
            if (playedChunks.length > 0) {
              logger.info(`🎬 Turn complete - sending ${playedChunks.length} PLAYED chunks for transcription`, {}, 'VoiceAIOverlay')
              
              // Send played chunks to backend for transcription
              voiceServiceRef.current.send({
                type: 'transcribe_played_audio',
                audioChunks: playedChunks,
                sampleRate: 24000,
                timestamp: new Date().toISOString()
              })
              
              // Clear played chunks after sending
              audioServiceRef.current.clearPlayedAudioChunks()
            } else {
              logger.debug('No played audio chunks to transcribe', {}, 'VoiceAIOverlay')
            }
          }
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

  // Initialize speech recognition
  useEffect(() => {
    if (!isOpen) return
    
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) {
      logger.warn('Speech Recognition API not available in this browser', {}, 'VoiceAIOverlay')
      return
    }

    if (recognitionRef.current) {
      logger.debug('Speech Recognition already initialized', {}, 'VoiceAIOverlay')
      return
    }

    logger.info('Initializing Speech Recognition - HINDI and ENGLISH ONLY', {}, 'VoiceAIOverlay')
    const recognition = new SpeechRecognition()
    recognition.continuous = true
    recognition.interimResults = true
    // Use Indian English for Hindi/English code-switching (NO Tamil/Telugu/etc)
    recognition.lang = 'en-IN'
    recognition.maxAlternatives = 3  // Get multiple alternatives for better accuracy

    recognition.onstart = () => {
      logger.info('✅ Speech recognition STARTED', {}, 'VoiceAIOverlay')
    }

    recognition.onresult = (event) => {
      let interimTranscript = ''
      let finalTranscript = ''

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript
        if (event.results[i].isFinal) {
          finalTranscript += transcript + ' '
          userTranscriptRef.current.push(transcript)
          
          logger.info('📝 Final user transcript captured', { text: transcript }, 'VoiceAIOverlay')
          
          // Send to backend for storage
          if (voiceServiceRef.current && voiceServiceRef.current.isConnected()) {
            logger.info('📤 Sending user transcription to backend', { text: transcript }, 'VoiceAIOverlay')
            voiceServiceRef.current.send({
              type: 'user_transcription',
              text: transcript,
              timestamp: new Date().toISOString()
            })
          } else {
            logger.warn('⚠️ Cannot send user transcription - voice service not connected', {}, 'VoiceAIOverlay')
          }
        } else {
          interimTranscript += transcript
        }
      }

      // Update current transcript display
      if (finalTranscript || interimTranscript) {
        setCurrentTranscript(prev => ({
          ...prev,
          user: finalTranscript || interimTranscript
        }))
      }
    }

    recognition.onerror = (event) => {
      logger.error('❌ Speech recognition error', { error: event.error }, 'VoiceAIOverlay')
      
      if (event.error === 'not-allowed') {
        logger.error('❌ Microphone permission DENIED for speech recognition', {}, 'VoiceAIOverlay')
      }
      
      // Don't restart on certain errors
      if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
        shouldKeepRecognitionRunning.current = false
      }
    }

    recognition.onend = () => {
      logger.warn('⚠️ Speech recognition ENDED', {}, 'VoiceAIOverlay')
      
      // Auto-restart if we should keep it running
      if (shouldKeepRecognitionRunning.current && recognitionRef.current) {
        logger.info('🔄 Restarting speech recognition automatically', {}, 'VoiceAIOverlay')
        try {
          recognitionRef.current.start()
        } catch (error) {
          logger.error('❌ Failed to restart speech recognition', { error: error.message }, 'VoiceAIOverlay')
          // If we get an error, wait a bit and try again
          setTimeout(() => {
            if (shouldKeepRecognitionRunning.current && recognitionRef.current) {
              try {
                recognitionRef.current.start()
                logger.info('✅ Speech recognition restarted after delay', {}, 'VoiceAIOverlay')
              } catch (retryError) {
                logger.error('❌ Failed to restart speech recognition after retry', { error: retryError.message }, 'VoiceAIOverlay')
              }
            }
          }, 1000)
        }
      } else {
        logger.info('ℹ️ Speech recognition ended and will not restart', {}, 'VoiceAIOverlay')
      }
    }

    recognitionRef.current = recognition
    logger.info('✅ Speech Recognition initialized and ready', {}, 'VoiceAIOverlay')

    return () => {
      if (recognitionRef.current) {
        try {
          shouldKeepRecognitionRunning.current = false
          recognitionRef.current.stop()
          recognitionRef.current = null
        } catch (error) {
          logger.debug('Error stopping speech recognition on cleanup', { error }, 'VoiceAIOverlay')
        }
      }
    }
  }, [isOpen])

  // Auto-scroll conversation
  useEffect(() => {
    if (conversationRef.current) {
      conversationRef.current.scrollTop = conversationRef.current.scrollHeight
    }
  }, [conversation, currentTranscript])

  useEffect(() => {
    if (isOpen) {
      // Load saved summaries from localStorage
      const savedSummaries = JSON.parse(localStorage.getItem('voiceAISummaries') || '[]')
      setSummaries(savedSummaries)
      
      // Set session start time
      setSessionStartTime(Date.now())
      
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden'
    } else {
      // Restore body scroll when modal is closed
      document.body.style.overflow = 'unset'
      
      // Stop auto-restart first
      shouldKeepRecognitionRunning.current = false
      
      // Cleanup voice services when closing
      if (audioServiceRef.current) {
        audioServiceRef.current.stopRecording()
        audioServiceRef.current.stopPlayback()
        audioServiceRef.current.cleanup()
      }
      
      if (voiceServiceRef.current) {
        voiceServiceRef.current.disconnect()
      }
      
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop()
        } catch (error) {
          logger.debug('Error stopping speech recognition on close', { error }, 'VoiceAIOverlay')
        }
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

      // Create configuration - mode passed from prop (study or wellness) - HINDI and ENGLISH ONLY
      const config = {
        systemPrompt: "", // System prompts are now handled by the backend
        voice: "Puck",
        allowInterruptions: true,
        mode: mode, // Use the mode prop (study or wellness)
        vad_enabled: true,
        language: "en-IN",  // Indian English - HINDI/ENGLISH code-switching ONLY
        alternativeLanguages: ["hi-IN", "en-US"]  // ONLY Hindi and US English (no other languages)
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
      
      // Start speech recognition
      if (recognitionRef.current) {
        try {
          shouldKeepRecognitionRunning.current = true
          recognitionRef.current.start()
          logger.info('Speech recognition started with auto-restart enabled', {}, 'VoiceAIOverlay')
        } catch (error) {
          logger.error('Failed to start speech recognition', { error }, 'VoiceAIOverlay')
          shouldKeepRecognitionRunning.current = false
        }
      }

    } catch (error) {
      logger.error('Connection error', { error: error.message, stack: error.stack, name: error.name }, 'VoiceAIOverlay')
      handleError('Failed to connect to voice service')
    } finally {
      setIsInitializing(false)
    }
  }

  const handleEndCall = async () => {
    logger.info('Ending call', { conversationLength: conversation.length }, 'VoiceAIOverlay')
    
    // Stop auto-restart first
    shouldKeepRecognitionRunning.current = false
    
    if (audioServiceRef.current) {
      audioServiceRef.current.stopRecording()
      audioServiceRef.current.stopPlayback()
      audioServiceRef.current.cleanup()
    }
    
    if (voiceServiceRef.current) {
      voiceServiceRef.current.disconnect()
    }
    
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop()
        logger.info('Speech recognition stopped', {}, 'VoiceAIOverlay')
      } catch (error) {
        logger.debug('Error stopping speech recognition', { error }, 'VoiceAIOverlay')
      }
    }
    
    setIsConnected(false)
    setIsProcessing(false)
    setIsListening(false)
    
    // Trigger wellness analysis if we have conversation
    if (conversation.length > 0) {
      // Check if user is authenticated
      if (!token) {
        logger.warn('User not authenticated, skipping analysis', {}, 'VoiceAIOverlay')
        alert('⚠️ You must be logged in to save your voice journal and get analysis. Please login and try again.')
        return
      }
      
      logger.info('Saving conversation & triggering analysis', { conversationLength: conversation.length }, 'VoiceAIOverlay')
      
      // Save to localStorage
      saveConversationSummary()
      
      // Trigger backend analysis
      const fullTranscript = conversation
        .map(c => `${c.role === 'user' ? 'User' : 'Assistant'}: ${c.text}`)
        .join('\n\n')
      
      const durationSeconds = sessionStartTime 
        ? Math.floor((Date.now() - sessionStartTime) / 1000)
        : null
      
      try {
        const response = await completeVoiceJournalSession({
          mode: mode,
          transcript: fullTranscript,
          duration_seconds: durationSeconds
        })
        
        logger.info('Analysis started', { sessionId: response.session_id }, 'VoiceAIOverlay')
        setAnalysisSessionId(response.session_id)
        
      } catch (error) {
        logger.error('Failed to trigger analysis', { error: error.message }, 'VoiceAIOverlay')
        // Show user-friendly error message
        if (error.message.includes('logged in') || error.message.includes('Authentication failed')) {
          alert('⚠️ ' + error.message + '\n\nPlease login to save your voice journal session.')
        } else {
          alert('❌ Failed to save voice journal: ' + error.message)
        }
      }
    } else {
      logger.warn('No conversation to save/analyze', {}, 'VoiceAIOverlay')
    }
  }

  const saveConversationSummary = () => {
    // No longer saves to localStorage - summaries come from backend
    logger.info('Session will be saved and analyzed after ending conversation', {}, 'VoiceAIOverlay')
  }

  const clearHistory = () => {
    // Clear local summaries (will refetch from backend)
    setSummaries([])
    logger.info('Cleared local summaries cache', {}, 'VoiceAIOverlay')
  }

  const deleteSummary = (id) => {
    // Note: This only removes from local state. Backend deletion not yet implemented.
    const updated = summaries.filter(s => s.id !== id)
    setSummaries(updated)
    logger.info('Removed summary from local view', { id }, 'VoiceAIOverlay')
  }

  if (!isOpen) return null

  // Show selected insight from history
  if (selectedInsight) {
    return <WellnessAnalysisResults
      transcript={selectedInsight.transcript}
      analysis={selectedInsight.analysis}
      mode={selectedInsight.mode}
      sessionId={selectedInsight.sessionId}
      onClose={() => {
        setSelectedInsight(null)
      }}
    />
  }

  // Show analysis results if completed
  if (showAnalysis && analysis) {
    return <WellnessAnalysisResults 
      transcript={analysisTranscript}
      analysis={analysis}
      mode={mode}
      sessionId={analysisSessionId}
      onClose={() => {
        setShowAnalysis(false)
        setAnalysisSessionId(null)
        setConversation([])
        onClose()
      }}
    />
  }

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

            {/* Debug Status Panel */}
            {isConnected && (
              <div className="neumorphic-timer-card rounded-xl p-3 mb-4">
                <h3 className="text-xs font-semibold text-white/50 mb-2">
                  🔧 Debug Status
                </h3>
                <div className="text-xs text-white/60 space-y-1">
                  <div>Speech Recognition: {recognitionRef.current ? '✅ Ready' : '❌ Not initialized'}</div>
                  <div>Voice Service: {voiceServiceRef.current?.isConnected() ? '✅ Connected' : '❌ Disconnected'}</div>
                  <div>Conversation Messages: {conversation.length}</div>
                  <div>User Transcripts: {userTranscriptRef.current.length}</div>
                </div>
              </div>
            )}

            {/* Live Transcription Display */}
            <div className="neumorphic-timer-card rounded-xl p-4 mb-4">
              <h3 className="text-sm font-semibold text-white/70 mb-2">
                🎙️ Live Transcription
              </h3>
              {currentTranscript.user && (
                <div className="mb-2">
                  <span className="text-xs text-blue-400">You: </span>
                  <span className="text-sm text-white">{currentTranscript.user}</span>
                </div>
              )}
              {currentTranscript.assistant && (
                <div>
                  <span className="text-xs text-green-400">AI: </span>
                  <span className="text-sm text-white">{currentTranscript.assistant}</span>
                </div>
              )}
              {!currentTranscript.user && !currentTranscript.assistant && (
                <p className="text-xs text-white/50">
                  {isConnected 
                    ? 'Listening... Speak to see transcription here'
                    : 'Click "Start Conversation" to begin'
                  }
                </p>
              )}
            </div>

            {/* Conversation History */}
            <div 
              ref={conversationRef}
              className="neumorphic-timer-card rounded-xl p-4 h-96 overflow-y-auto neumorphic-scrollbar"
            >
              <h3 className="text-lg font-semibold text-white dark:text-white light:text-black mb-3">
                💬 Conversation
              </h3>
              
              <div className="space-y-3">
                {conversation.length === 0 ? (
                  <p className="text-white/70 dark:text-white/70 light:text-black/70 text-center py-8">
                    No conversation yet. Start by clicking "Start Conversation"!
                  </p>
                ) : (
                  conversation.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-md px-4 py-3 rounded-2xl ${
                          message.role === 'user'
                            ? 'bg-blue-500/20 border border-blue-500/30'
                            : 'bg-green-500/20 border border-green-500/30'
                        }`}
                      >
                        <p className="text-xs text-white/60 mb-1">
                          {message.role === 'user' ? '👤 You' : '🤖 AI'}
                        </p>
                        <p className="text-sm text-white leading-relaxed">{message.text}</p>
                        <p className="text-xs text-white/50 mt-2">
                          {new Date(message.timestamp).toLocaleTimeString()}
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
            <div className="relative z-10 w-96 p-6 overflow-y-auto neumorphic-scrollbar">
              {/* Header */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold dark:text-white light:text-gray-900">
                    ✨ AI Insights
                  </h3>
                  <div className="flex gap-2">
                    <button
                      onClick={fetchSummaries}
                      className="p-2 rounded-lg neumorphic-button hover:scale-105 transition-transform"
                      title="Refresh summaries"
                    >
                      <svg className="w-4 h-4 dark:text-gray-300 light:text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    </button>
                    <button
                      onClick={clearHistory}
                      disabled={summaries.length === 0}
                      className="px-3 py-2 rounded-lg neumorphic-button text-xs font-medium
                               dark:text-gray-300 light:text-gray-700
                               disabled:opacity-40 disabled:cursor-not-allowed
                               hover:enabled:scale-105 transition-transform"
                      title="Clear all summaries"
                    >
                      🗑️ Clear
                    </button>
                  </div>
                </div>
                <p className="text-xs opacity-60 dark:text-gray-400 light:text-gray-600">
                  Your AI-powered journal insights
                </p>
              </div>
              
              {isLoadingSummaries ? (
                <div className="flex items-center justify-center py-12">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full border-4 border-purple-500/20 dark:border-purple-400/20"></div>
                    <div className="absolute top-0 left-0 w-12 h-12 rounded-full border-4 border-transparent border-t-purple-500 dark:border-t-purple-400 animate-spin"></div>
                  </div>
                </div>
              ) : summaries.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 px-4">
                  <div className="neumorphic-inset rounded-full w-20 h-20 flex items-center justify-center mb-4">
                    <span className="text-4xl">📝</span>
                  </div>
                  <p className="text-base font-medium mb-2 text-center dark:text-white light:text-gray-800">
                    No AI Insights Yet
                  </p>
                  <p className="text-sm text-center opacity-70 max-w-xs dark:text-gray-300 light:text-gray-600">
                    Complete a voice journal session to see your AI-generated insights and summaries here
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {summaries.map((summary) => (
                    <div 
                      key={summary.id} 
                      className="neumorphic-card rounded-xl p-4 transition-all duration-300 hover:scale-[1.02] cursor-pointer group"
                      onClick={() => {
                        // Load full analysis from insights store
                        const fullAnalysis = getAnalysis(summary.session_id)
                        if (fullAnalysis) {
                          setSelectedInsight(fullAnalysis)
                          markAsViewed(summary.session_id)
                        } else {
                          logger.warn('Analysis not found in insights store', { sessionId: summary.session_id }, 'VoiceAIOverlay')
                        }
                      }}
                    >
                      {/* Header */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          <span className="text-2xl flex-shrink-0">
                            {summary.mode === 'study' ? '📚' : '🧘'}
                          </span>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-semibold truncate dark:text-white light:text-gray-900">
                              {summary.title}
                            </h4>
                            <p className="text-xs opacity-60 dark:text-gray-400 light:text-gray-600">
                              {summary.date} • {summary.time}
                            </p>
                          </div>
                        </div>
                        <span className="text-xs px-2 py-1 rounded-lg neumorphic-inset dark:text-gray-300 light:text-gray-700 flex-shrink-0">
                          {summary.duration}
                        </span>
                      </div>

                      {/* AI Summary */}
                      <p className="text-sm mb-3 leading-relaxed dark:text-gray-200 light:text-gray-700 line-clamp-3">
                        {summary.summary}
                      </p>

                      {/* Tags Section */}
                      <div className="space-y-2">
                        {/* Emotions */}
                        {summary.emotions && summary.emotions.length > 0 && (
                          <div className="flex flex-wrap gap-1.5">
                            {summary.emotions.slice(0, 4).map((emotion, idx) => (
                              <span 
                                key={idx} 
                                className="text-xs px-2 py-1 rounded-lg neumorphic-inset-subtle
                                         bg-gradient-to-br from-blue-500/10 to-purple-500/10
                                         dark:text-blue-300 light:text-blue-700
                                         border border-blue-500/20"
                              >
                                😊 {emotion}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Focus Areas */}
                        {summary.focus_areas && summary.focus_areas.length > 0 && (
                          <div className="flex flex-wrap gap-1.5">
                            {summary.focus_areas.slice(0, 3).map((area, idx) => (
                              <span 
                                key={idx} 
                                className="text-xs px-2 py-1 rounded-lg neumorphic-inset-subtle
                                         bg-gradient-to-br from-green-500/10 to-emerald-500/10
                                         dark:text-green-300 light:text-green-700
                                         border border-green-500/20"
                              >
                                🎯 {area}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Stress Level */}
                        {summary.stress_level && summary.mode === 'study' && (
                          <div className="flex items-center gap-2">
                            <span className={`text-xs px-3 py-1 rounded-lg font-medium
                                          ${summary.stress_level === 'high' 
                                            ? 'bg-red-500/20 text-red-400 border border-red-500/30' 
                                            : summary.stress_level === 'medium'
                                            ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                                            : 'bg-green-500/20 text-green-400 border border-green-500/30'}`}
                            >
                              📊 Stress: {summary.stress_level.toUpperCase()}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Hover Actions */}
                      <div className="mt-3 pt-3 border-t border-gray-200/10 dark:border-gray-700/30 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            deleteSummary(summary.id)
                          }}
                          className="text-xs px-3 py-1.5 rounded-lg neumorphic-button
                                   dark:text-gray-300 light:text-gray-700
                                   hover:text-red-400 transition-colors"
                        >
                          🗑️ Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Analysis Status Footer */}
        {analysisSessionId && !showAnalysis && (
          <div className="relative z-10 p-4 border-t border-white/20 bg-gradient-to-r from-purple-900/50 to-blue-900/50">
            <div className="flex items-center justify-center gap-3">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-purple-400" />
              <p className="text-white font-medium">
                {analysisStatus === 'processing' ? '🧠 Analyzing your conversation...' : '⏳ Processing...'}
              </p>
            </div>
            {analysisError && (
              <p className="text-red-400 text-sm text-center mt-2">
                ⚠️ {analysisError}
              </p>
            )}
          </div>
        )}

      </div>
    </div>,
    document.body
  )
}
