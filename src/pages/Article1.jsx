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
      <main className="pt-20 px-6 pb-16">
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
              Talk it out with Sahay AI - Private voice journaling and guided reflections
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Express your thoughts naturally through voice. Our AI-powered companion understands context, provides gentle guidance, and helps you reflect on your emotional journey with complete privacy and confidentiality.
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
                      <h3 className="text-lg font-semibold text-white mb-2">Real-Time Voice Conversation</h3>
                      <p className="text-gray-300">Start a conversation with Sahay AI using Google Gemini Live API. Speak naturally in Hindi or English, and our AI listens in real-time with low latency (&lt;500ms) for natural dialogue flow.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm font-bold">2</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">AI-Powered Analysis</h3>
                      <p className="text-gray-300">After your session, our specialized wellness agents analyze your conversation. Using Hybrid RAG (Retrieval Augmented Generation), we provide personalized insights and recommendations based on your emotional patterns.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm font-bold">3</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Proactive Check-ins</h3>
                      <p className="text-gray-300">Receive timely reminders and support before stressful moments like exams or important events. Our system tracks your wellness patterns and proactively offers support when you need it most.</p>
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
                    <span className="text-gray-300">Real-time voice transcription</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-gray-300">Personalized wellness recommendations</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-gray-300">Session summaries and insights</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-gray-300">Integration with mood tracking</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Technical Features Section */}
            <div className="bg-gray-900/50 rounded-2xl p-8 mb-16">
              <h2 className="text-2xl font-bold mb-6 text-white">Advanced Features</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Google Gemini Live API</h3>
                  <p className="text-gray-300 mb-4">Powered by Google's advanced AI, our voice journaling uses Gemini Live API for natural, empathetic conversations with multi-turn context retention and emotion-aware responses.</p>
                  <ul className="text-gray-300 space-y-2 text-sm">
                    <li>• 24kHz audio quality for natural voice</li>
                    <li>• Real-time streaming with low latency</li>
                    <li>• Interruption handling for natural dialogue</li>
                    <li>• Multi-turn conversation support</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Wellness & Study Modes</h3>
                  <p className="text-gray-300 mb-4">Choose between Wellness Mode for general emotional support or Study Mode for academic-focused mental health support and study recommendations.</p>
                  <ul className="text-gray-300 space-y-2 text-sm">
                    <li>• Wellness Mode: General emotional support</li>
                    <li>• Study Mode: Academic-focused wellness</li>
                    <li>• Specialized AI agents for each mode</li>
                    <li>• Context-aware recommendations</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* How It Works Section */}
            <div className="bg-gray-900/50 rounded-2xl p-8 mb-16">
              <h2 className="text-2xl font-bold mb-6 text-white">How It Works</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">1. Start a Voice Session</h3>
                  <p className="text-gray-300 mb-3">Click the "Aawaaz Journal" button in Wellness or Study mode. Our system connects to Google Gemini Live API and starts listening to your voice in real-time.</p>
                  <ul className="text-gray-300 space-y-2 text-sm ml-4">
                    <li>• Voice Activity Detection (VAD) for seamless conversation</li>
                    <li>• Real-time transcription as you speak</li>
                    <li>• Natural interruption handling</li>
                    <li>• Background noise filtering</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">2. AI-Powered Conversation</h3>
                  <p className="text-gray-300 mb-3">Have a natural conversation with Sahay AI. The AI understands context, provides empathetic responses, and guides you through reflection using CBT-based therapeutic approaches.</p>
                  <ul className="text-gray-300 space-y-2 text-sm ml-4">
                    <li>• Context-aware responses based on your history</li>
                    <li>• Emotion-aware dialogue tailored to your mood</li>
                    <li>• Guided reflection questions</li>
                    <li>• Supportive and non-judgmental responses</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">3. Session Analysis & Insights</h3>
                  <p className="text-gray-300 mb-3">After your session, our specialized wellness agents analyze your conversation using Hybrid RAG to retrieve relevant knowledge and provide personalized insights.</p>
                  <ul className="text-gray-300 space-y-2 text-sm ml-4">
                    <li>• Emotional pattern analysis</li>
                    <li>• Personalized wellness recommendations</li>
                    <li>• Session summaries for easy review</li>
                    <li>• Integration with mood tracking dashboard</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Privacy Section */}
            <div className="bg-blue-900/20 rounded-2xl p-8 mb-16 border border-blue-500/30">
              <h2 className="text-2xl font-bold mb-4 text-white">Privacy & Security</h2>
              <p className="text-gray-300 mb-4">
                Your voice journaling sessions are completely private and secure:
              </p>
              <ul className="text-gray-300 space-y-2">
                <li>• All voice data is encrypted using industry-standard AES-256 encryption</li>
                <li>• Transcripts are stored securely in Firebase Firestore</li>
                <li>• Your data is never shared with third parties</li>
                <li>• You have complete control over your session history</li>
                <li>• GDPR and HIPAA compliance-ready architecture</li>
                <li>• Zero-knowledge architecture for sensitive data</li>
              </ul>
            </div>

            {/* CTA Section */}
            <div className="bg-gray-900/50 rounded-2xl p-8 text-center">
              <h2 className="text-2xl font-bold mb-4 text-white">Ready to Start Your Voice Journey?</h2>
              <p className="text-gray-300 mb-6">Begin your private voice journaling experience with Sahay AI today. Express yourself naturally and receive personalized support for your mental wellness journey.</p>
              <button
                onClick={() => navigate('/app')}
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
