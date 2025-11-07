import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Smartphone, Globe, Download, ExternalLink, Mic, Heart, Brain, Shield, Zap, Link as LinkIcon } from 'lucide-react'
import UserDropdown from '../components/UserDropdown'

export default function ComingSoonPage() {
  const navigate = useNavigate()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <div 
      className="min-h-screen text-white overflow-x-hidden relative" 
      style={{ background: 'linear-gradient(135deg, #000000 0%, #000000 30%, #060606 70%, #000000 100%)' }}
    >
      {/* Gemini-style Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/15 via-blue-950/10 to-black"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-blue-400/8 via-transparent to-transparent"></div>
      
      {/* Floating Stars */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-0.5 bg-white rounded-full opacity-40 pointer-events-none"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `twinkle 3s infinite ${Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Header */}
      <header 
        className="fixed top-0 left-0 right-0 z-40 transition-all duration-500"
        style={{ 
          height: '88px', 
          background: 'linear-gradient(135deg, #000000 0%, #000000 30%, #060606 70%, #000000 100%)', 
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
        }}
      >
        <div className="flex justify-between items-center pl-3 md:pl-20 pr-3 md:pr-6 h-full relative">
          {/* Left Section - Mobile Hamburger Menu */}
          <div className="flex items-center">
            {/* Mobile Hamburger Menu - Left Side */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-white/80 hover:text-white transition-colors p-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            
            {/* Desktop Navigation - Hidden on Mobile */}
            <div className="hidden lg:flex items-center gap-8">
              <button
                onClick={() => navigate('/')}
                className="flex items-center gap-2 text-white/80 hover:text-white transition-all duration-300"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="font-medium text-xl" style={{ fontFamily: 'Google Sans, Arial, Helvetica, sans-serif' }}>
                  Back to Home
                </span>
              </button>
              <button 
                onClick={() => navigate('/')}
                className="flex items-center gap-2 hover:opacity-80 transition-opacity"
              >
                <img 
                  src="/images/16f6e1ea-b24f-4aa3-826c-1d847809b91a-removebg-preview.png" 
                  alt="Sahayata Logo" 
                  className="h-12 w-12 object-contain"
                />
                <span className="text-white font-medium text-2xl tracking-wide" style={{ fontFamily: 'Google Sans, Arial, Helvetica, sans-serif' }}>
                  Sahayata
                </span>
              </button>
            </div>
          </div>

          {/* Center - Logo (Mobile Only) */}
          <button 
            onClick={() => navigate('/')}
            className="absolute left-1/2 transform -translate-x-1/2 lg:hidden hover:opacity-80 transition-opacity"
          >
            <img 
              src="/images/16f6e1ea-b24f-4aa3-826c-1d847809b91a-removebg-preview.png" 
              alt="Sahayata Logo" 
              className="h-8 w-8 object-contain"
            />
          </button>

          {/* Right Section - Desktop: Dashboard Button, Mobile: User Dropdown Only */}
          <div className="flex items-center gap-2 md:gap-6">
            {/* Go to Dashboard Button - Desktop Only */}
            <button
              onClick={() => navigate('/app')}
              className="px-5 py-2 rounded-full font-medium text-white text-lg transition-all duration-300 hover:bg-white/10 hidden md:block"
              style={{
                background: 'rgba(255,255,255,0.08)',
                borderRadius: '24px',
                fontWeight: '500',
                fontFamily: 'Google Sans, Arial, Helvetica, sans-serif'
              }}
            >
              Go to Dashboard
            </button>

            {/* User Avatar Dropdown - Right Side */}
            <UserDropdown />
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-[#060606] border-t border-gray-800/50 pl-4 pr-3 py-4">
            <nav className="flex flex-col space-y-4">
              <button 
                onClick={() => {
                  navigate('/')
                  setIsMobileMenuOpen(false)
                }}
                className="flex items-center gap-2 text-white/80 hover:text-white transition-all duration-300 text-left"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="font-medium" style={{ fontFamily: 'Google Sans, Arial, Helvetica, sans-serif' }}>
                  Back to Home
                </span>
              </button>
              <button 
                onClick={() => {
                  navigate('/app')
                  setIsMobileMenuOpen(false)
                }}
                className="px-4 py-2 rounded-full font-medium text-white transition-all duration-300 hover:bg-white/10 text-left"
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  borderRadius: '24px',
                  fontWeight: '500',
                  fontFamily: 'Google Sans, Arial, Helvetica, sans-serif'
                }}
              >
                Go to Dashboard
              </button>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section
        className="px-6 relative overflow-hidden"
        style={{
          marginTop: '88px',
          paddingTop: '120px',
          paddingBottom: '80px',
          background: 'transparent'
        }}
      >
        <div className="container mx-auto max-w-7xl">
          {/* Hero */}
          <div className="text-center mb-20">
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
            <h1 
              className="text-6xl md:text-7xl font-bold mb-6"
              style={{ 
                fontFamily: 'Google Sans, Arial, Helvetica, sans-serif',
                textShadow: '0 0 20px rgba(255, 255, 255, 0.4)',
                filter: 'brightness(1.2)'
              }}
            >
              Sahayata App is Here
            </h1>
            <p 
              className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed relative z-10 mb-8"
              style={{ fontFamily: 'Google Sans, Arial, Helvetica, sans-serif' }}
            >
              Experience the power of AI-driven mental wellness in the palm of your hand. 
              <br />
              <span className="text-blue-400 font-semibold">Download now and take your wellness journey anywhere.</span>
            </p>
            
            {/* Download Button */}
            <div className="mt-8">
              <a
                href="https://drive.google.com/drive/folders/196kAG3SR_JZJdXmtmpvn3QjwlyFL9Et0?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-5 rounded-full font-medium text-white text-xl transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/50 hover:scale-105"
                style={{
                  background: 'linear-gradient(90deg, #3b6bff, #2e96ff 65%, #acb7ff)',
                  fontFamily: 'Google Sans, Arial, Helvetica, sans-serif'
                }}
              >
                <Download className="w-6 h-6" />
                <span>Download Sahayata App</span>
                <ExternalLink className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* App Features Section */}
          <div className="mb-20">
            <h2 
              className="text-4xl md:text-5xl font-bold text-white mb-12 text-center"
              style={{ fontFamily: 'Google Sans, Arial, Helvetica, sans-serif' }}
            >
              Powerful Features at Your Fingertips
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {/* Voice Journaling */}
            <div className="bg-black rounded-2xl p-8 border border-white/10 hover:border-blue-400/60 transition-all duration-300">
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center">
                    <Mic className="w-8 h-8 text-blue-400" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 text-center" style={{ fontFamily: 'Google Sans, Arial, Helvetica, sans-serif' }}>
                  Voice Journaling
                </h3>
                <p className="text-gray-300 text-center leading-relaxed">
                  Express your thoughts naturally through voice. Our AI-powered companion listens, understands, and provides personalized insights.
                </p>
              </div>

              {/* Mood Tracking */}
              <div className="bg-black rounded-2xl p-8 border border-white/10 hover:border-blue-400/60 transition-all duration-300">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center">
                    <Heart className="w-8 h-8 text-blue-400" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 text-center" style={{ fontFamily: 'Google Sans, Arial, Helvetica, sans-serif' }}>
                  Mood Tracking
              </h3>
              <p className="text-gray-300 text-center leading-relaxed">
                  Track your emotional patterns over time with intelligent mood analysis and personalized wellness recommendations.
              </p>
            </div>

              {/* AI-Powered Insights */}
            <div className="bg-black rounded-2xl p-8 border border-white/10 hover:border-blue-400/60 transition-all duration-300">
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center">
                    <Brain className="w-8 h-8 text-blue-400" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 text-center" style={{ fontFamily: 'Google Sans, Arial, Helvetica, sans-serif' }}>
                  AI-Powered Insights
                </h3>
                <p className="text-gray-300 text-center leading-relaxed">
                  Leverage cutting-edge voice-based depression recognition technology with 96.5% accuracy for early detection.
                </p>
              </div>

              {/* Privacy & Security */}
              <div className="bg-black rounded-2xl p-8 border border-white/10 hover:border-blue-400/60 transition-all duration-300">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center">
                    <Shield className="w-8 h-8 text-blue-400" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 text-center" style={{ fontFamily: 'Google Sans, Arial, Helvetica, sans-serif' }}>
                  Privacy & Security
              </h3>
              <p className="text-gray-300 text-center leading-relaxed">
                  Your data is encrypted with AES-256 encryption. All voice recordings and personal information remain completely private.
              </p>
            </div>

              {/* Study & Wellness Modes */}
            <div className="bg-black rounded-2xl p-8 border border-white/10 hover:border-blue-400/60 transition-all duration-300">
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center">
                    <Zap className="w-8 h-8 text-blue-400" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 text-center" style={{ fontFamily: 'Google Sans, Arial, Helvetica, sans-serif' }}>
                  Study & Wellness Modes
                </h3>
                <p className="text-gray-300 text-center leading-relaxed">
                  Switch between study-focused journaling and wellness pathways. Tailored experiences for every aspect of your life.
                </p>
              </div>

              {/* Offline Capabilities */}
              <div className="bg-black rounded-2xl p-8 border border-white/10 hover:border-blue-400/60 transition-all duration-300">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center">
                    <Smartphone className="w-8 h-8 text-blue-400" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 text-center" style={{ fontFamily: 'Google Sans, Arial, Helvetica, sans-serif' }}>
                  Native App Experience
              </h3>
              <p className="text-gray-300 text-center leading-relaxed">
                  Faster performance, smoother animations, and better integration with your device. Experience Sahayata like never before.
                </p>
              </div>
            </div>
          </div>

          {/* Benefits of Native App */}
          <div className="mb-20">
            <div className="bg-gradient-to-br from-blue-900/20 to-black rounded-3xl p-8 md:p-12 border border-blue-400/30">
              <h2 
                className="text-3xl md:text-4xl font-bold text-white mb-8 text-center"
                style={{ fontFamily: 'Google Sans, Arial, Helvetica, sans-serif' }}
              >
                Why Choose the Native App?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Zap className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: 'Google Sans, Arial, Helvetica, sans-serif' }}>
                      Lightning Fast Performance
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      Native app architecture ensures instant loading, smooth animations, and responsive interactions that feel natural on your device.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Smartphone className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: 'Google Sans, Arial, Helvetica, sans-serif' }}>
                      Optimized Mobile Experience
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      Built specifically for mobile devices with touch-optimized controls, gesture support, and seamless integration with your phone's capabilities.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: 'Google Sans, Arial, Helvetica, sans-serif' }}>
                      Enhanced Security
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      Benefit from device-level security features, secure local storage, and advanced encryption protocols for maximum data protection.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Globe className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: 'Google Sans, Arial, Helvetica, sans-serif' }}>
                      Always Accessible
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      Access your wellness journey anytime, anywhere. The app icon on your home screen makes it just one tap away whenever you need support.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Future MCP Integration */}
          <div className="mb-20">
            <div className="bg-black rounded-3xl p-8 md:p-12 border border-white/10">
              <div className="flex items-center justify-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-full flex items-center justify-center">
                  <LinkIcon className="w-10 h-10 text-blue-400" />
                </div>
              </div>
              <h2 
                className="text-3xl md:text-4xl font-bold text-white mb-6 text-center"
                style={{ fontFamily: 'Google Sans, Arial, Helvetica, sans-serif' }}
              >
                Coming Soon: MCP Server Integration
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto text-center leading-relaxed" style={{ fontFamily: 'Google Sans, Arial, Helvetica, sans-serif' }}>
                We're revolutionizing how you interact with AI assistants. Soon, you'll be able to connect your MCP (Model Context Protocol) server directly to your Gemini CLI, creating a seamless bridge between your AI tools and your wellness journey.
              </p>
              
              <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-2xl p-6 md:p-8 border border-blue-400/20 max-w-3xl mx-auto">
                <h3 className="text-2xl font-bold text-white mb-4 text-center" style={{ fontFamily: 'Google Sans, Arial, Helvetica, sans-serif' }}>
                  How It Works
                </h3>
                <div className="space-y-4 text-gray-300">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm font-bold">1</span>
                    </div>
                    <p className="leading-relaxed">
                      <strong className="text-white">Connect Your MCP Server:</strong> Our MCP server infrastructure is already operational and ready. Simply link it to your Gemini CLI environment.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm font-bold">2</span>
                    </div>
                    <p className="leading-relaxed">
                      <strong className="text-white">Seamless Task Integration:</strong> When you create tasks or reminders through Gemini CLI, they automatically sync to your Sahayata app.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm font-bold">3</span>
                    </div>
                    <p className="leading-relaxed">
                      <strong className="text-white">Unified Experience:</strong> Manage your wellness tasks, journal entries, and AI interactions all in one place. Your Gemini CLI becomes an extension of your wellness journey.
                    </p>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-blue-500/10 rounded-xl border border-blue-400/30">
                  <p className="text-blue-300 text-center" style={{ fontFamily: 'Google Sans, Arial, Helvetica, sans-serif' }}>
                    <strong>Status:</strong> MCP server is fully operational. Gemini CLI integration coming soon!
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <div className="bg-gradient-to-br from-blue-900/20 to-black rounded-2xl p-8 md:p-12 border border-blue-400/30 max-w-3xl mx-auto">
              <h2 
                className="text-3xl md:text-4xl font-bold text-white mb-6"
                style={{ fontFamily: 'Google Sans, Arial, Helvetica, sans-serif' }}
              >
                Start Your Wellness Journey Today
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto" style={{ fontFamily: 'Google Sans, Arial, Helvetica, sans-serif' }}>
                Download the Sahayata app now and experience the future of AI-powered mental wellness. Available for Android devices.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://drive.google.com/drive/folders/196kAG3SR_JZJdXmtmpvn3QjwlyFL9Et0?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full font-medium text-white text-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/50 hover:scale-105"
                  style={{
                    background: 'linear-gradient(90deg, #3b6bff, #2e96ff 65%, #acb7ff)',
                    fontFamily: 'Google Sans, Arial, Helvetica, sans-serif'
                  }}
                >
                  <Download className="w-5 h-5" />
                  <span>Download App</span>
                  <ExternalLink className="w-5 h-5" />
                </a>
                <button
                  onClick={() => navigate('/app')}
                  className="px-6 py-4 rounded-full font-medium text-white text-lg transition-all duration-300 hover:bg-white/10 border border-blue-400"
                  style={{
                    background: 'rgba(255,255,255,0.08)',
                    fontFamily: 'Google Sans, Arial, Helvetica, sans-serif'
                  }}
                >
                  Try Web App
                </button>
                <button
                  onClick={() => navigate('/')}
                  className="px-6 py-4 rounded-full font-medium text-white text-lg transition-all duration-300 hover:bg-white/10 border border-blue-400"
                  style={{
                    background: 'rgba(255,255,255,0.08)',
                    fontFamily: 'Google Sans, Arial, Helvetica, sans-serif'
                  }}
                >
                  Back to Home
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
