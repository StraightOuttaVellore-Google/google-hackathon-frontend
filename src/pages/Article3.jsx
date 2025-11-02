import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Article3() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-gray-800/50">
        <div className="flex justify-between items-center px-6 py-3" style={{ height: '64px' }}>
          <div
            className="text-white font-normal cursor-pointer flex items-center gap-2"
            style={{ 
              fontFamily: 'Google Sans, Arial, Helvetica, sans-serif',
              fontSize: '20px'
            }}
            onClick={() => navigate('/')}
          >
            <img 
              src="/images/16f6e1ea-b24f-4aa3-826c-1d847809b91a-removebg-preview.png" 
              alt="Sahayata Logo" 
              className="h-12 w-12 object-contain"
            />
            <span>Sahayata</span>
          </div>
          <button
            onClick={() => navigate('/')}
            className="text-white/80 hover:text-white transition-colors duration-300 px-4 py-2 rounded-lg hover:bg-white/10"
          >
            ← Back to Home
          </button>
        </div>
      </header>

      <main className="pt-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Community Grove</h1>
          <p className="text-xl text-gray-300">Coming Soon - Article 3</p>
        </div>
      </main>
    </div>
  )
}
