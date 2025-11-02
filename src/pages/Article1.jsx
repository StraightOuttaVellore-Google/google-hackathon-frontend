import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Article1() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-gray-800/50">
        <div className="flex justify-between items-center px-6 py-3" style={{ height: '64px' }}>
          {/* Logo */}
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

          {/* Back Button */}
          <button
            onClick={() => navigate('/')}
            className="text-white/80 hover:text-white transition-colors duration-300 px-4 py-2 rounded-lg hover:bg-white/10"
          >
            ← Back to Home
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Article Header */}
          <div className="mb-12">
            {/* Logo first */}
            <div className="mb-8 flex justify-center">
              <img 
                src="/images/16f6e1ea-b24f-4aa3-826c-1d847809b91a-removebg-preview.png" 
                alt="Sahayata Logo" 
                className="object-contain opacity-100"
                style={{ 
                  width: '200px',
                  height: '200px'
                }}
              />
            </div>
            <div className="text-blue-400 text-sm font-medium uppercase tracking-wide mb-4">
              Voice Journaling
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: 'Google Sans, Arial, Helvetica, sans-serif' }}>
              Talk it out with Sahay AI
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Private voice journaling, guided reflections, and proactive check-ins when you need them most.
            </p>
          </div>

          {/* Article Content */}
          <div className="prose prose-invert max-w-none">
            <div className="grid md:grid-cols-2 gap-12 mb-16">
              {/* Left Column - Features */}
              <div>
                <h2 className="text-2xl font-bold mb-6 text-white">How Voice Journaling Works</h2>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm font-bold">1</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Speak Your Mind</h3>
                      <p className="text-gray-300">Simply talk about your day, feelings, or thoughts. Our AI listens without judgment and provides gentle guidance.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm font-bold">2</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">AI-Powered Insights</h3>
                      <p className="text-gray-300">Get personalized reflections and mood analysis to better understand your emotional patterns.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm font-bold">3</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Proactive Check-ins</h3>
                      <p className="text-gray-300">Receive timely reminders and support before stressful moments like exams or important events.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Benefits */}
              <div>
                <h2 className="text-2xl font-bold mb-6 text-white">Key Benefits</h2>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-gray-300">CBT-based therapeutic approach</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-gray-300">Hindi and English language support</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-gray-300">Complete privacy and confidentiality</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-gray-300">24/7 availability for support</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-gray-300">Personalized mood tracking</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-gray-300">Proactive mental health monitoring</span>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gray-900/50 rounded-2xl p-8 text-center">
              <h2 className="text-2xl font-bold mb-4 text-white">Ready to Start Your Voice Journey?</h2>
              <p className="text-gray-300 mb-6">Begin your private voice journaling experience with Sahay AI today.</p>
              <button
                onClick={() => navigate('/wellness')}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3 rounded-full transition-colors duration-300"
              >
                Start Voice Journaling
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
