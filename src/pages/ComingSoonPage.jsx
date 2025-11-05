import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Smartphone, Globe, Download } from 'lucide-react'
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
              App Coming Soon
            </h1>
            <p 
              className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed relative z-10 mb-8"
              style={{ fontFamily: 'Google Sans, Arial, Helvetica, sans-serif' }}
            >
              We're working hard to bring you the Sahayata mobile app. 
              <br />
              <span className="text-blue-400 font-semibold">Enjoy our mobile-optimized web experience on your phone till then!</span>
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {/* Mobile Web Experience */}
            <div className="bg-black rounded-2xl p-8 border border-white/10 hover:border-blue-400/60 transition-all duration-300">
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center">
                  <Smartphone className="w-8 h-8 text-blue-400" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 text-center" style={{ fontFamily: 'Google Sans, Arial, Helvetica, sans-serif' }}>
                Mobile Web Experience
              </h3>
              <p className="text-gray-300 text-center leading-relaxed">
                Our web app is fully optimized for mobile devices. Access all features seamlessly on your smartphone browser.
              </p>
            </div>

            {/* Coming Soon */}
            <div className="bg-black rounded-2xl p-8 border border-white/10 hover:border-blue-400/60 transition-all duration-300">
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center">
                  <Download className="w-8 h-8 text-blue-400" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 text-center" style={{ fontFamily: 'Google Sans, Arial, Helvetica, sans-serif' }}>
                Native App Coming Soon
              </h3>
              <p className="text-gray-300 text-center leading-relaxed">
                We're developing a native mobile app with enhanced features and offline capabilities. Stay tuned!
              </p>
            </div>

            {/* Full Features */}
            <div className="bg-black rounded-2xl p-8 border border-white/10 hover:border-blue-400/60 transition-all duration-300">
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center">
                  <Globe className="w-8 h-8 text-blue-400" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 text-center" style={{ fontFamily: 'Google Sans, Arial, Helvetica, sans-serif' }}>
                Full Feature Access
              </h3>
              <p className="text-gray-300 text-center leading-relaxed">
                All features are available on the mobile web version. Voice journaling, mood tracking, and more!
              </p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <div className="bg-black rounded-2xl p-8 md:p-12 border border-white/10 max-w-3xl mx-auto">
              <h2 
                className="text-3xl md:text-4xl font-bold text-white mb-6"
                style={{ fontFamily: 'Google Sans, Arial, Helvetica, sans-serif' }}
              >
                Get Started Today
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto" style={{ fontFamily: 'Google Sans, Arial, Helvetica, sans-serif' }}>
                Access Sahayata on your mobile browser right now. No app download needed!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => navigate('/app')}
                  className="px-6 py-4 rounded-full font-medium text-white text-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/50"
                  style={{
                    background: 'linear-gradient(90deg, #3b6bff, #2e96ff 65%, #acb7ff)',
                    fontFamily: 'Google Sans, Arial, Helvetica, sans-serif'
                  }}
                >
                  Go to Web App
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
