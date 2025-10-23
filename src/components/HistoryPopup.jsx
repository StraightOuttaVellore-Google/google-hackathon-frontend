import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useTheme } from '../contexts/ThemeContext'

export default function HistoryPopup({ isOpen, onClose }) {
  const { isDarkMode } = useTheme()
  const [summaries, setSummaries] = useState([])

  useEffect(() => {
    if (isOpen) {
      // Load saved summaries from localStorage or API
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
    
    // Cleanup function to restore scroll and remove event listener on unmount
    return () => {
      document.body.style.overflow = 'unset'
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

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

  const clearHistory = () => {
    setSummaries([])
    localStorage.removeItem('voiceAISummaries')
  }

  const deleteSummary = (id) => {
    const updated = summaries.filter(s => s.id !== id)
    setSummaries(updated)
    localStorage.setItem('voiceAISummaries', JSON.stringify(updated))
  }

  if (!isOpen) return null

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      
      {/* Modal */}
      <div className={`${isDarkMode ? 'dark' : ''} relative w-full max-w-2xl max-h-[80vh] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden`}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
            📚 Conversation History
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            ✖️
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-96 overflow-y-auto">
          {displaySummaries.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 dark:text-gray-400 text-lg mb-4">
                📝 No conversation history yet
              </p>
              <p className="text-gray-400 dark:text-gray-500 text-sm">
                Start talking with the Voice AI agent to see summaries here
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {displaySummaries.map((summary) => (
                <div
                  key={summary.id}
                  className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 border border-gray-200 dark:border-gray-600 hover:shadow-lg transition-shadow duration-200"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-800 dark:text-white text-lg">
                        {summary.title}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mt-1">
                        <span>📅 {summary.date}</span>
                        <span>🕐 {summary.time}</span>
                        <span>⏱️ {summary.duration}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => deleteSummary(summary.id)}
                      className="p-1 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
                      title="Delete summary"
                    >
                      🗑️
                    </button>
                  </div>

                  {/* Summary */}
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {summary.summary}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-750">
          <button
            onClick={clearHistory}
            disabled={displaySummaries.length === 0}
            className="px-4 py-2 text-red-600 hover:text-red-700 disabled:text-gray-400 disabled:cursor-not-allowed hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
          >
            🗑️ Clear All History
          </button>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}
