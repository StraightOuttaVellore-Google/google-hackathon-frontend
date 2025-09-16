import { useState, useRef, useEffect } from 'react'
import { useTheme } from '../contexts/ThemeContext'

export default function VoiceAIAgent() {
  const { isDarkMode } = useTheme()
  const [isListening, setIsListening] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [conversation, setConversation] = useState([])
  const recognitionRef = useRef(null)

  useEffect(() => {
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

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
    }
  }, [])

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

  return (
    <div className={`${isDarkMode ? 'dark' : ''} min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 dark:from-indigo-950 dark:to-purple-950`}>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
            🎙️ Voice AI Agent
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Speak naturally and I'll help you with your tasks
          </p>
        </div>

        {/* Main Voice Interface */}
        <div className="max-w-4xl mx-auto">
          {/* Voice Control Panel */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20 dark:border-gray-700/20 mb-6">
            <div className="text-center">
              {/* Microphone Button */}
              <div className="relative mb-6">
                <button
                  onClick={isListening ? stopListening : startListening}
                  disabled={isProcessing}
                  className={`relative w-32 h-32 rounded-full transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed ${
                    isListening
                      ? 'bg-red-500 hover:bg-red-600 shadow-red-500/30'
                      : 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 shadow-indigo-500/30'
                  } shadow-2xl`}
                >
                  <div className="absolute inset-0 rounded-full animate-pulse bg-white/20"></div>
                  <div className="relative z-10 text-white text-4xl">
                    {isListening ? '🔴' : '🎤'}
                  </div>
                </button>
                
                {/* Pulse animation when listening */}
                {isListening && (
                  <div className="absolute inset-0 rounded-full border-4 border-red-400 animate-ping"></div>
                )}
              </div>

              {/* Status */}
              <div className="mb-4">
                {isListening && (
                  <p className="text-red-500 font-medium animate-pulse">
                    🎙️ Listening...
                  </p>
                )}
                {isProcessing && (
                  <p className="text-indigo-500 font-medium">
                    🧠 Processing...
                  </p>
                )}
                {!isListening && !isProcessing && (
                  <p className="text-gray-500 dark:text-gray-400">
                    Click the microphone to start talking
                  </p>
                )}
              </div>

              {/* Live Transcript */}
              {transcript && (
                <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 mb-4">
                  <p className="text-gray-800 dark:text-gray-200 italic">
                    "{transcript}"
                  </p>
                </div>
              )}

              {/* Controls */}
              <div className="flex justify-center gap-4">
                <button
                  onClick={clearConversation}
                  className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors duration-200"
                >
                  🗑️ Clear Chat
                </button>
                <button
                  onClick={() => window.close()}
                  className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors duration-200"
                >
                  ✖️ Close
                </button>
              </div>
            </div>
          </div>

          {/* Conversation History */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/20 dark:border-gray-700/20">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              💬 Conversation
            </h3>
            
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {conversation.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                  No conversation yet. Start by clicking the microphone!
                </p>
              ) : (
                conversation.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                        message.type === 'user'
                          ? 'bg-indigo-500 text-white'
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
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
