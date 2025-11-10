import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Article2() {
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

      {/* Main Content */}
      <main className="pt-20 px-6 pb-16">
        <div className="max-w-4xl mx-auto">
          {/* Article Header */}
          <div className="mb-12">
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
              Mood Dashboard
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: 'Google Sans, Arial, Helvetica, sans-serif' }}>
              Track your mood patterns and set daily Sankalp wellness goals
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Visualize your emotional journey, understand patterns, and set meaningful wellness goals with our comprehensive mood tracking dashboard.
            </p>
          </div>

          {/* Article Content */}
          <div className="prose prose-invert max-w-none">
            <div className="grid md:grid-cols-2 gap-12 mb-16">
              {/* Left Column - Features */}
              <div>
                <h2 className="text-2xl font-bold mb-6 text-white">Mood Tracking Features</h2>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm font-bold">1</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Daily Mood Logging</h3>
                      <p className="text-gray-300">Record your mood throughout the day with emoji-based tracking. Choose from a wide range of emotions to accurately capture how you're feeling.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm font-bold">2</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Visual Mood Calendar</h3>
                      <p className="text-gray-300">See your mood patterns over time with our interactive calendar view. Identify trends, triggers, and cycles in your emotional well-being.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm font-bold">3</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Sankalp Wellness Goals</h3>
                      <p className="text-gray-300">Set daily wellness intentions (Sankalp) aligned with your mood patterns. Track progress and celebrate achievements in your mental health journey.</p>
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
                    <span className="text-gray-300">Pattern recognition and insights</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-gray-300">Monthly and yearly mood analytics</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-gray-300">Wellness pathway recommendations</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-gray-300">AI-powered mood analysis</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-gray-300">Goal tracking and achievements</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-gray-300">Integration with voice journaling</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Features Section */}
            <div className="bg-gray-900/50 rounded-2xl p-8 mb-16">
              <h2 className="text-2xl font-bold mb-6 text-white">Advanced Analytics</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Mood Trends</h3>
                  <p className="text-gray-300 mb-4">Identify long-term patterns in your emotional well-being. See how your mood changes over weeks, months, and seasons.</p>
                  <ul className="text-gray-300 space-y-2 text-sm">
                    <li>• Weekly mood averages</li>
                    <li>• Monthly trend analysis</li>
                    <li>• Seasonal pattern detection</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Wellness Insights</h3>
                  <p className="text-gray-300 mb-4">Get personalized recommendations based on your mood data. Our AI analyzes your patterns to suggest wellness activities.</p>
                  <ul className="text-gray-300 space-y-2 text-sm">
                    <li>• Personalized wellness pathways</li>
                    <li>• Activity recommendations</li>
                    <li>• Proactive mental health support</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gray-900/50 rounded-2xl p-8 text-center">
              <h2 className="text-2xl font-bold mb-4 text-white">Start Tracking Your Mood Today</h2>
              <p className="text-gray-300 mb-6">Begin your wellness journey with comprehensive mood tracking and meaningful goal setting.</p>
              <button
                onClick={() => navigate('/app')}
                className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-8 py-3 rounded-full transition-colors duration-300"
              >
                Open Mood Dashboard
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
