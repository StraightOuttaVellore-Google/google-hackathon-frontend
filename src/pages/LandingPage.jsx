import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import UserDropdown from '../components/UserDropdown'

// Card Component for better organization
const Card = ({ card, isActive, isNext, onClick }) => {
  let transform = '';
  let opacity = 0;
  let zIndex = 0;
  let pointerEvents = 'none';
  
  if (isActive) {
    transform = 'translateX(-50%) scale(1)';
    opacity = 1;
    zIndex = 2;
    pointerEvents = 'auto';
  } else if (isNext) {
    transform = 'translateX(-50%) scaleX(0.75) scaleY(0.9) translateY(45px)';
    opacity = 0.8;
    zIndex = 1;
    pointerEvents = 'auto';
  } else {
    transform = 'translateX(-50%) scale(0.9)';
    opacity = 0;
    zIndex = 0;
    pointerEvents = 'none';
  }
  
  return (
    <div
      className="absolute top-0 left-1/2 transition-all duration-400 ease-in-out"
      style={{
        transform,
        opacity,
        zIndex,
        pointerEvents,
        width: '720px',
        height: '200px',
      }}
      onClick={onClick}
    >
      <div 
        className="w-full h-full rounded-[20px] flex items-center justify-between p-5 transition-all duration-300"
        style={{
          background: '#121212',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
        }}
      >
        {/* Image Container */}
        <div className="flex-shrink-0 w-[180px] h-[130px] rounded-[12px] overflow-hidden mr-6">
          <img 
            src={card.image} 
            alt={card.title}
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Content */}
        <div className="flex-1 flex flex-col justify-center">
          <div className="text-xs uppercase tracking-wider text-[#9ca3af] mb-1.5">
            {card.category}
          </div>
          <div className="text-xl font-bold text-white">
            {card.title}
          </div>
        </div>
        
        {/* External Link Icon */}
        <div className="flex-shrink-0 text-[#9ca3af] hover:text-white transition-colors duration-300" style={{ marginLeft: 'auto', padding: '8px' }}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default function LandingPage() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('Overview')
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  // Card carousel data
  const cards = [
    {
      category: 'UPDATES',
      title: 'Advanced voice recognition with Mindful Companion',
      image: '/images/ChatGPT Image Sep 12, 2025, 11_21_11 PM.png'
    },
    {
      category: 'INSIGHTS',
      title: 'How Journaling Helps Mental Clarity',
      image: '/images/image-5-12.png'
    },
    {
      category: 'AI FEATURES',
      title: 'New AI Mood Insights and Analysis',
      image: '/images/ChatGPT Image Sep 12, 2025, 11_21_11 PM.png'
    }
  ]

  // Auto-rotate cards with pause on hover
  useEffect(() => {
    if (isHovered) return; // Pause when hovered
    
    const interval = setInterval(() => {
      setCurrentCardIndex((prevIndex) => (prevIndex + 1) % cards.length);
    }, 4000); // Change card every 4 seconds
    
    return () => clearInterval(interval);
  }, [cards.length, isHovered]);

  // Debug log
  console.log('LandingPage component is rendering')

  const handleGetStarted = () => {
    console.log('handleGetStarted called, user:', user)
    if (user) {
      console.log('Navigating to /app')
      navigate('/app')
    } else {
      console.log('Navigating to /login')
      navigate('/login')
    }
  }

  const handleTryJournal = () => {
    console.log('handleTryJournal called, user:', user)
    if (user) {
      console.log('Navigating to /app')
      navigate('/app')
    } else {
      console.log('Navigating to /login')
      navigate('/login')
    }
  }

  const handleLearnMore = () => {
    // Scroll to features section or show more info
    document.getElementById('features-section')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden relative">
      {/* Gemini-style Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-blue-950/20 to-black"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-blue-400/15 via-transparent to-transparent"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center_top,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent"></div>
      
      {/* Floating Stars - More subtle like Gemini */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
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
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <span className="text-white font-semibold text-xl">Sahayata AI</span>
            {/* Dropdown */}
            <div className="relative ml-2">
              <button className="flex items-center space-x-1 text-white hover:text-gray-300 transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center space-x-6">
            <nav className="hidden md:flex items-center space-x-8">
              <button className="text-gray-300 hover:text-white transition-colors text-sm">Build with Companion</button>
              <button className="text-gray-300 hover:text-white transition-colors text-sm">Try Journal</button>
              <button className="text-gray-300 hover:text-white transition-colors flex items-center space-x-1 text-sm">
                <span>Search</span>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </button>
            </nav>
            
            {/* User Dropdown */}
            <UserDropdown />
          </div>
        </div>
      </header>

      {/* Hero Section - Gemini Style */}
      <section 
        className="px-6"
        style={{
          marginTop: 'calc(var(--header-height, 64px) + 50px)',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <div 
          className="container mx-auto max-w-4xl text-center"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'clamp(16px, 4vw, 24px)'
          }}
        >
          {/* Main Title - Bright White */}
          <h1 
            className="mx-auto"
            style={{
              fontFamily: '"Google Sans", Arial, Helvetica, sans-serif',
              fontSize: '124px',
              fontStyle: 'normal',
              fontWeight: '400',
              height: '128px',
              letterSpacing: '0.1px',
              lineHeight: '128px',
              maxWidth: '1069px',
              opacity: '1',
              textAlign: 'center',
              textRendering: 'optimizelegibility',
              textSizeAdjust: '100%',
              textWrapMode: 'wrap',
              textWrapStyle: 'balance',
              wordBreak: 'break-word',
              WebkitFontSmoothing: 'antialiased',
              transition: 'opacity 0.4s linear, transform 0.95s cubic-bezier(0.215, 0.61, 0.355, 1), translate 0s linear',
              display: 'block',
              color: '#ffffff',
              textShadow: '0 0 20px rgba(255, 255, 255, 0.4)',
              filter: 'brightness(1.2)'
            }}
          >
            Sahayata
          </h1>
          
          {/* Subtitle */}
          <p 
            className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto"
            style={{ marginBottom: 'clamp(24px, 5vw, 40px)' }}
          >
            Our most intelligent voice-powered journaling companion
          </p>
          
          {/* CTA Buttons - Exact Gemini Design */}
          <div 
            className="flex flex-col sm:flex-row gap-4 justify-center relative z-10"
            style={{
              marginBottom: 'clamp(160px, 25vw, 280px)'
            }}
          >
            {/* Primary Button - Chat with Gemini Style */}
            <button
              onClick={(e) => {
                e.preventDefault()
                console.log('Button clicked!')
                handleGetStarted()
              }}
              className="px-5 py-5 rounded-full font-medium text-white 
                         shadow-lg hover:shadow-blue-500/50 
                         transition-all duration-300 flex items-center gap-2
                         min-w-[240px] justify-center cursor-pointer
                         hover:shadow-xl hover:shadow-blue-500/40"
              style={{
                background: 'linear-gradient(90deg, #3b6bff, #2e96ff 65%, #acb7ff)'
              }}
            >
              <span>{user ? 'Go to App' : 'Start Your Journal'}</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 5l7 7-7 7"/>
              </svg>
            </button>
            
            {/* Secondary Button - Build with Gemini Style */}
            <button
              onClick={(e) => {
                e.preventDefault()
                console.log('Second button clicked!')
                handleTryJournal()
              }}
              className="px-5 py-5 rounded-full font-medium text-white 
                         border border-blue-400 
                         hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/30 
                         transition-all duration-300 flex items-center gap-2
                         min-w-[240px] justify-center cursor-pointer"
            >
              <span>{user ? 'Go to Sahayata AI' : 'Try Sahayata AI'}</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 5l7 7-7 7"/>
              </svg>
            </button>
          </div>

          {/* Card Carousel - Inside Hero Section */}
          <div className="w-full max-w-2xl mx-auto">
            {/* Card Stack Container */}
            <div 
              className="relative w-full max-w-[720px] h-[280px] mx-auto overflow-visible"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Show all cards with proper stacking */}
              {cards.map((card, index) => {
                const isActive = index === currentCardIndex;
                const isNext = index === (currentCardIndex + 1) % cards.length;
                
                return (
                  <Card
                    key={index}
                    card={card}
                    isActive={isActive}
                    isNext={isNext}
                    onClick={() => setCurrentCardIndex(index)}
                  />
                );
              })}
            </div>
            
            {/* Navigation Dots */}
            <div className="flex justify-center gap-2 mt-1">
              {cards.map((_, index) => {
                const isActive = index === currentCardIndex;
                return (
                  <button
                    key={index}
                    onClick={() => setCurrentCardIndex(index)}
                    className={`transition-all duration-400 ease-in-out ${
                      isActive
                        ? 'w-6 h-2 rounded-[12px]'
                        : 'w-2 h-2 rounded-full bg-[#444] hover:bg-[#666]'
                    }`}
                    style={isActive ? {
                      background: 'linear-gradient(90deg, #3b6bff, #2e96ff)'
                    } : {}}
                  />
                );
              })}
            </div>
          </div>

        </div>
      </section>


      {/* Features Section */}
      <section id="features-section" className="py-16 px-6 bg-gray-900/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-100 mb-8">
              Mindful Companion Features for a Balanced Life
            </h2>
            
            {/* Tabs */}
            <div className="flex flex-wrap justify-center gap-2 mb-12">
              {['Overview', 'Journaling', 'Mood', 'Safety', 'Build'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 rounded-3xl font-medium transition-colors ${
                    activeTab === tab
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Feature Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Personalized Insights */}
            <div className="bg-gray-800/20 border border-gray-700 rounded-2xl p-6 hover:bg-gray-800/30 transition-colors">
              <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-100 mb-3">Personalized Insights</h3>
              <p className="text-gray-400 mb-4">
                Understand your habits and patterns with AI-driven analysis to foster well-being.
              </p>
              <button className="text-blue-400 hover:text-blue-300 text-sm font-medium">
                Learn More
              </button>
            </div>

            {/* Guided Mindfulness */}
            <div className="bg-gray-800/20 border border-gray-700 rounded-2xl p-6 hover:bg-gray-800/30 transition-colors">
              <div className="w-16 h-16 bg-green-500/20 rounded-2xl flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-100 mb-3">Guided Mindfulness</h3>
              <p className="text-gray-400 mb-4">
                Access guided meditations and mindfulness exercises tailored to your needs.
              </p>
              <button className="text-green-400 hover:text-green-300 text-sm font-medium">
                Learn More
              </button>
            </div>

            {/* Sahayata AI */}
            <div className="bg-gray-800/20 border border-gray-700 rounded-2xl p-6 hover:bg-gray-800/30 transition-colors">
              <div className="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
                  <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-100 mb-3">Sahayata AI</h3>
              <p className="text-gray-400 mb-4">
                Express your thoughts naturally through voice-to-text journaling technology.
              </p>
              <button className="text-purple-400 hover:text-purple-300 text-sm font-medium">
                Learn More
              </button>
            </div>

            {/* Mood Tracking */}
            <div className="bg-gray-800/20 border border-gray-700 rounded-2xl p-6 hover:bg-gray-800/30 transition-colors">
              <div className="w-16 h-16 bg-orange-500/20 rounded-2xl flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-orange-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-100 mb-3">Mood Tracking</h3>
              <p className="text-gray-400 mb-4">
                Track your emotional patterns and receive insights for better mental health.
              </p>
              <button className="text-orange-400 hover:text-orange-300 text-sm font-medium">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-100 mb-8">
              How It Works
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Start your journey to better mental wellness in just three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-white">
                1
              </div>
              <h3 className="text-2xl font-bold text-gray-100 mb-4">Speak Your Mind</h3>
              <p className="text-gray-400 text-lg">
                Simply speak your thoughts, feelings, or experiences into your device. Our advanced voice recognition captures every word.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-white">
                2
              </div>
              <h3 className="text-2xl font-bold text-gray-100 mb-4">AI Analysis</h3>
              <p className="text-gray-400 text-lg">
                Our intelligent AI analyzes your words to understand patterns, emotions, and provide personalized insights.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-white">
                3
              </div>
              <h3 className="text-2xl font-bold text-gray-100 mb-4">Gain Insights</h3>
              <p className="text-gray-400 text-lg">
                Receive actionable insights, mood tracking, and personalized recommendations to improve your mental wellness.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Your Voice, Your Sanctuary Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-900/20 to-purple-900/20">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-100 mb-8">
            Your Voice, Your Sanctuary
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
            In a world full of noise, your voice matters. Sahayata AI provides a safe, private space where your thoughts can flow freely, and your mental wellness can flourish.
          </p>
          
          <div className="flex justify-center">
            <button
              onClick={handleTryJournal}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-3xl font-medium transition-colors shadow-lg flex items-center space-x-2 mx-auto"
            >
              <span>{user ? 'Go to Sahayata AI' : 'Try Sahayata AI'}</span>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-gray-800">
        <div className="container mx-auto max-w-6xl text-center">
          <p className="text-gray-400">
            Built with ❤️ for your mental wellness journey
          </p>
        </div>
      </footer>
    </div>
  )
}