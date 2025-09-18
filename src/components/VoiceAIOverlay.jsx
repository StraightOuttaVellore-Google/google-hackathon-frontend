import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useTheme } from '../contexts/ThemeContext'

export default function VoiceAIOverlay({ isOpen, onClose }) {
  const { isDarkMode } = useTheme()
  const [isListening, setIsListening] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [conversation, setConversation] = useState([])
  const [showSummary, setShowSummary] = useState(false)
  const [summaries, setSummaries] = useState([])
  const recognitionRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      // Initialize speech recognition if available
      if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
        recognitionRef.current = new SpeechRecognition()
        recognitionRef.current.continuous = false
        recognitionRef.current.interimResults = true
        recognitionRef.current.lang = 'en-US'

        recognitionRef.current.onresult = (event) => {
          const result = event.results[event.results.length - 1]
          setTranscript(result[0].transcript)
          
          if (result.isFinal) {
            handleVoiceInput(result[0].transcript)
          }
        }

        recognitionRef.current.onend = () => {
          setIsListening(false)
        }

        recognitionRef.current.onerror = (event) => {
          console.error('Speech recognition error:', event.error)
          setIsListening(false)
        }
      }

      // Load saved summaries from localStorage
      const savedSummaries = JSON.parse(localStorage.getItem('voiceAISummaries') || '[]')
      setSummaries(savedSummaries)
      
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden'
    } else {
      // Restore body scroll when modal is closed
      document.body.style.overflow = 'unset'
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
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
    }
  }, [isOpen, onClose])

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setIsListening(true)
      setTranscript('')
      recognitionRef.current.start()
    }
  }

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop()
      setIsListening(false)
    }
  }

  const handleVoiceInput = async (text) => {
    if (!text.trim()) return

    setIsProcessing(true)
    
    // Add user message to conversation
    const userMessage = { type: 'user', text: text.trim(), timestamp: new Date() }
    setConversation(prev => [...prev, userMessage])

    // Simulate AI response (replace with actual API call)
    setTimeout(() => {
      const aiResponse = {
        type: 'ai',
        text: `I heard you say: "${text}". This is a simulated response. In a real implementation, this would connect to your AI backend.`,
        timestamp: new Date()
      }
      setConversation(prev => [...prev, aiResponse])
      setIsProcessing(false)
      
      // Speak the response
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(aiResponse.text)
        utterance.rate = 0.8
        utterance.pitch = 1
        window.speechSynthesis.speak(utterance)
      }
    }, 1500)

    setTranscript('')
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
      <div className={`${isDarkMode ? 'dark' : ''} relative w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-2xl overflow-hidden backdrop-blur-lg`}
        style={{
          background: 'rgba(0, 0, 0, 0.2)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.08), 0 0 20px rgba(100, 150, 255, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
        }}
      >
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
            <h2 className="text-2xl font-bold text-white">
              🎙️ Voice AI Assistant
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowSummary(!showSummary)}
              className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors duration-200 flex items-center gap-2 backdrop-blur-sm border border-white/20"
            >
              <span className="text-lg">📚</span>
              <span>{showSummary ? 'Hide' : 'Show'} Summary</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-white/70 hover:text-white hover:bg-white/20 rounded-lg transition-colors"
            >
              ✖️
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex h-[calc(90vh-140px)]">
          {/* Voice Interface */}
          <div className="relative z-10 flex-1 p-6 border-r border-white/20">
            {/* Voice Control Panel */}
            <div className="text-center mb-6">
              {/* Voice Agent Image as Recording Button */}
              <div className="relative mb-6 flex justify-center">
                <button
                  onClick={isListening ? stopListening : startListening}
                  disabled={isProcessing}
                  className="relative transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
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
                      <div className="text-white text-2xl animate-spin">🧠</div>
                    </div>
                  )}
                </button>
              </div>

              {/* Status */}
              <div className="mb-4">
                {isListening && (
                  <p className="text-white font-medium animate-pulse">
                    🎙️ Listening...
                  </p>
                )}
                {isProcessing && (
                  <p className="text-white font-medium">
                    🧠 Processing...
                  </p>
                )}
                {!isListening && !isProcessing && (
                  <p className="text-white/70">
                    Click the AI agent to start talking
                  </p>
                )}
              </div>

              {/* Live Transcript */}
              {transcript && (
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-4 border border-white/20">
                  <p className="text-white italic">
                    "{transcript}"
                  </p>
                </div>
              )}

            </div>

            {/* Conversation History */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 h-64 overflow-y-auto border border-white/20">
              <h3 className="text-lg font-semibold text-white mb-3">
                💬 Conversation
              </h3>
              
              <div className="space-y-3">
                {conversation.length === 0 ? (
                  <p className="text-white/70 text-center py-8">
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
                            ? 'bg-white/20 text-white backdrop-blur-sm border border-white/30'
                            : 'bg-white/10 text-white backdrop-blur-sm border border-white/20'
                        }`}
                      >
                        <p className="text-sm">{message.text}</p>
                        <p className="text-xs opacity-70 mt-1">
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
            <div className="relative z-10 w-96 p-6 bg-white/10 backdrop-blur-sm border-l border-white/20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">
                  📚 Conversation History
                </h3>
                <button
                  onClick={clearHistory}
                  disabled={displaySummaries.length === 0}
                  className="px-3 py-1 text-white/70 hover:text-white disabled:text-white/40 disabled:cursor-not-allowed hover:bg-white/20 rounded transition-colors text-sm backdrop-blur-sm border border-white/20"
                >
                  🗑️ Clear All
                </button>
              </div>
              
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {displaySummaries.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-white/70 text-sm mb-2">
                      📝 No conversation history yet
                    </p>
                    <p className="text-white/50 text-xs">
                      Start talking with the Voice AI agent to see summaries here
                    </p>
                  </div>
                ) : (
                  displaySummaries.map((summary) => (
                    <div
                      key={summary.id}
                      className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20 hover:bg-white/20 transition-all duration-200"
                    >
                      {/* Header */}
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold text-white text-sm">
                            {summary.title}
                          </h4>
                          <div className="flex items-center gap-2 text-xs text-white/70 mt-1">
                            <span>📅 {summary.date}</span>
                            <span>🕐 {summary.time}</span>
                            <span>⏱️ {summary.duration}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => deleteSummary(summary.id)}
                          className="p-1 text-white/70 hover:text-white hover:bg-white/20 rounded transition-colors text-xs"
                          title="Delete summary"
                        >
                          🗑️
                        </button>
                      </div>

                      {/* Summary */}
                      <p className="text-white/80 text-xs leading-relaxed">
                        {summary.summary}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Speech Recognition Support Check */}
        {!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) && (
          <div className="absolute bottom-4 right-4 bg-yellow-500 text-white p-3 rounded-lg shadow-lg">
            <p className="text-sm">
              ⚠️ Speech recognition not supported in this browser
            </p>
          </div>
        )}
      </div>
    </div>,
    document.body
  )
}
