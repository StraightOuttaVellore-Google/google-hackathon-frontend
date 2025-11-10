import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Article4() {
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
              Kinship Circles
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: 'Google Sans, Arial, Helvetica, sans-serif' }}>
              Connect privately with peers who truly understand your journey
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Join private Discord-style channels where you can connect with peers who share similar experiences. Our private set intersection technology ensures you only connect with people who truly understand your journey, while maintaining complete privacy.
            </p>
          </div>

          {/* Article Content */}
          <div className="prose prose-invert max-w-none">
            <div className="grid md:grid-cols-2 gap-12 mb-16">
              {/* Left Column - Features */}
              <div>
                <h2 className="text-2xl font-bold mb-6 text-white">Privacy-First Connection</h2>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm font-bold">1</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Private Set Intersection</h3>
                      <p className="text-gray-300">Our advanced privacy-preserving technology uses private set intersection to match you with peers who share similar wellness journeys, without revealing sensitive information.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm font-bold">2</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Discord-Style Channels</h3>
                      <p className="text-gray-300">Create and join private servers with text channels for focused discussions. Real-time messaging, typing indicators, and seamless communication with your kinship circle.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm font-bold">3</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Secure Matching</h3>
                      <p className="text-gray-300">Connect with peers based on shared wellness experiences, goals, or challenges. Our matching algorithm ensures meaningful connections while protecting your privacy.</p>
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
                    <span className="text-gray-300">Privacy-preserving matching technology</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-gray-300">Real-time WebSocket messaging</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-gray-300">Private server and channel creation</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-gray-300">Role-based access control</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-gray-300">Typing indicators and presence</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-gray-300">End-to-end encrypted communications</span>
                  </div>
                </div>
              </div>
            </div>

            {/* How It Works */}
            <div className="bg-gray-900/50 rounded-2xl p-8 mb-16">
              <h2 className="text-2xl font-bold mb-6 text-white">How Kinship Circles Work</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">1. Private Set Intersection Matching</h3>
                  <p className="text-gray-300 mb-3">Our system uses cryptographic private set intersection (PSI) to match you with peers who share similar wellness attributes, experiences, or goals. This happens without revealing your specific information to anyone, including the platform.</p>
                  <ul className="text-gray-300 space-y-2 text-sm ml-4">
                    <li>• Your wellness profile is encrypted and anonymized</li>
                    <li>• PSI protocol finds commonalities without data exposure</li>
                    <li>• Matches are suggested based on shared experiences</li>
                    <li>• You choose whether to connect with suggested peers</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">2. Private Server Creation</h3>
                  <p className="text-gray-300 mb-3">Once matched, you can create or join private Discord-style servers. These servers have multiple text channels for different topics, allowing focused discussions within your kinship circle.</p>
                  <ul className="text-gray-300 space-y-2 text-sm ml-4">
                    <li>• Create custom servers for your kinship circle</li>
                    <li>• Organize discussions with multiple channels</li>
                    <li>• Set roles and permissions for members</li>
                    <li>• Invite matched peers to join your server</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">3. Real-Time Communication</h3>
                  <p className="text-gray-300 mb-3">Communicate with your kinship circle through real-time messaging. Our WebSocket-based system ensures instant message delivery, typing indicators, and seamless conversation flow.</p>
                  <ul className="text-gray-300 space-y-2 text-sm ml-4">
                    <li>• Instant message delivery via WebSockets</li>
                    <li>• See when others are typing</li>
                    <li>• Message history and persistence</li>
                    <li>• Secure, encrypted message transmission</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Privacy Section */}
            <div className="bg-indigo-900/20 rounded-2xl p-8 mb-16 border border-indigo-500/30">
              <h2 className="text-2xl font-bold mb-4 text-white">Privacy & Security</h2>
              <p className="text-gray-300 mb-4">
                Kinship Circles is built with privacy at its core. Our private set intersection technology ensures that:
              </p>
              <ul className="text-gray-300 space-y-2">
                <li>• Your wellness data is never exposed during matching</li>
                <li>• Only you see your full profile and attributes</li>
                <li>• Matches are based on encrypted, anonymized data</li>
                <li>• All communications are end-to-end encrypted</li>
                <li>• You have complete control over who you connect with</li>
                <li>• You can leave or delete servers at any time</li>
              </ul>
            </div>

            {/* CTA Section */}
            <div className="bg-gray-900/50 rounded-2xl p-8 text-center">
              <h2 className="text-2xl font-bold mb-4 text-white">Find Your Kinship Circle</h2>
              <p className="text-gray-300 mb-6">Connect with peers who truly understand your journey, all while maintaining complete privacy and security.</p>
              <button
                onClick={() => navigate('/app')}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-8 py-3 rounded-full transition-colors duration-300"
              >
                Explore Kinship Circles
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
