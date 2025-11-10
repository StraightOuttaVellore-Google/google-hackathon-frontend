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
              Community Grove
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: 'Google Sans, Arial, Helvetica, sans-serif' }}>
              Share your journey anonymously in our AI-moderated safe community
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Connect with others from around the world in country-specific Reddit-style communities. Share experiences, find support, and build meaningful connections in a safe, moderated space.
            </p>
          </div>

          {/* Article Content */}
          <div className="prose prose-invert max-w-none">
            <div className="grid md:grid-cols-2 gap-12 mb-16">
              {/* Left Column - Features */}
              <div>
                <h2 className="text-2xl font-bold mb-6 text-white">Community Features</h2>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm font-bold">1</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Country-Specific Communities</h3>
                      <p className="text-gray-300">Join communities from 12 countries including US, India, UK, Canada, Australia, Germany, France, Japan, Brazil, China, Mexico, and Italy. Connect with people who share your cultural context.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm font-bold">2</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Reddit-Style Interactions</h3>
                      <p className="text-gray-300">Create posts, comment on discussions, and engage with upvote/downvote system. Sort content by Hot, New, or Top to find what matters most to you.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm font-bold">3</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">AI-Moderated Safety</h3>
                      <p className="text-gray-300">Our AI moderation system ensures a safe, supportive environment. Content is automatically reviewed to maintain community guidelines and protect all members.</p>
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
                    <span className="text-gray-300">Anonymous sharing and support</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-gray-300">12 country-specific communities</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-gray-300">Media attachments support</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-gray-300">Subscribe to multiple countries</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-gray-300">User activity tracking</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-gray-300">3D globe navigation interface</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Countries Section */}
            <div className="bg-gray-900/50 rounded-2xl p-8 mb-16">
              <h2 className="text-2xl font-bold mb-6 text-white">Available Countries</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {['🇺🇸 US', '🇮🇳 India', '🇬🇧 UK', '🇨🇦 Canada', '🇦🇺 Australia', '🇩🇪 Germany', 
                  '🇫🇷 France', '🇯🇵 Japan', '🇧🇷 Brazil', '🇨🇳 China', '🇲🇽 Mexico', '🇮🇹 Italy'].map((country, idx) => (
                  <div key={idx} className="p-3 bg-black/30 rounded-lg text-center text-gray-300">
                    {country}
                  </div>
                ))}
              </div>
            </div>

            {/* How It Works */}
            <div className="bg-gray-900/50 rounded-2xl p-8 mb-16">
              <h2 className="text-2xl font-bold mb-6 text-white">How Community Grove Works</h2>
              <div className="space-y-4 text-gray-300">
                <p>1. <strong className="text-white">Access via 3D Globe:</strong> Navigate to Wellness Mode and click on the interactive 3D globe to explore country-specific communities.</p>
                <p>2. <strong className="text-white">Join Communities:</strong> Subscribe to countries you're interested in to see their posts in your feed.</p>
                <p>3. <strong className="text-white">Create & Share:</strong> Post your thoughts, experiences, or questions. Share images and media to enrich your posts.</p>
                <p>4. <strong className="text-white">Engage & Support:</strong> Comment on posts, upvote helpful content, and build connections with others on similar journeys.</p>
                <p>5. <strong className="text-white">Stay Safe:</strong> Our AI moderation ensures all content follows community guidelines, creating a supportive environment for everyone.</p>
              </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gray-900/50 rounded-2xl p-8 text-center">
              <h2 className="text-2xl font-bold mb-4 text-white">Join the Community Today</h2>
              <p className="text-gray-300 mb-6">Connect with others, share your journey, and find support in our global wellness community.</p>
              <button
                onClick={() => navigate('/app')}
                className="bg-green-600 hover:bg-green-700 text-white font-medium px-8 py-3 rounded-full transition-colors duration-300"
              >
                Explore Community Grove
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
