import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import UserDropdown from '../components/UserDropdown'
import { motion, AnimatePresence } from 'framer-motion'


// Card Component for better organization
const Card = ({ card, isActive, isNext, onClick }) => {
  let transform = '';
  let opacity = 0;
  let zIndex = 0;
  let pointerEvents = 'none';
  
  if (isActive) {
    transform = 'translateX(-50%) scale(1.1)';
    opacity = 1;
    zIndex = 2;
    pointerEvents = 'auto';
  } else if (isNext) {
    transform = 'translateX(-50%) scaleX(0.65) scaleY(0.85) translateY(45px)';
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
        height: '180px', // Reduced height to match Gemini proportions
      }}
      onClick={onClick}
    >
      <div 
        className="gemini-action-card gemini-action-card--flat w-full h-full transition-all duration-300 hover:transform hover:-translate-y-1 relative"
        style={{
          background: 'var(--surfaces-surface-container-bright)',
          border: '1px solid hsla(0,0%,100%,.15)',
          borderRadius: '24px',
          padding: '32px',
          display: 'flex',
          alignItems: 'center',
          gap: '24px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
        }}
      >
        {/* Media Container - Left Side */}
        <div 
          className="card-asset flex-shrink-0 overflow-hidden rounded-[24px]"
          style={{
            width: '220px',
            aspectRatio: 'var(--card-asset-ratio)',
          }}
        >
          <img 
            src={card.image} 
            alt={card.title}
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Content - Right Side */}
        <div className="flex-1 flex flex-col justify-center">
          {/* Eyebrow Text */}
          <div 
            className="uppercase text-xs font-medium tracking-wide mb-2"
            style={{ color: '#9aa0a6' }}
          >
            {card.category}
          </div>
          
          {/* Title */}
          <div 
            className="font-bold text-white"
            style={{ 
              fontFamily: 'Google Sans, Inter, sans-serif',
              fontSize: 'clamp(1rem, 1.2vw, 1.25rem)',
              lineHeight: '1.3'
            }}
          >
            {card.title}
          </div>
        </div>
        
        {/* External Link Icon - Bottom Right Corner */}
        <div 
          className="external-link-icon absolute bottom-0 right-0 transition-colors duration-300"
          style={{ 
            color: '#87ceeb',
            padding: '16px'
          }}
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [visibleLines, setVisibleLines] = useState([])
  const [showStickyNav, setShowStickyNav] = useState(false)
  const [activeSection, setActiveSection] = useState('features-section')
  const [isHeaderVisible, setIsHeaderVisible] = useState(true)
  const navigationCardRef = useRef(null)

  // Card carousel data
  const cards = [
    {
      category: 'VOICE JOURNALING',
      title: 'Talk it out with Sahay AI - Private voice journaling and guided reflections',
      image: '/images/ChatGPT Image Sep 12, 2025, 11_21_11 PM.png'
    },
    {
      category: 'MOOD DASHBOARD',
      title: 'Track your mood patterns and set daily Sankalp wellness goals',
      image: '/images/img1.png'
    },
    {
      category: 'COMMUNITY GROVE',
      title: 'Share your journey anonymously in our AI-moderated safe community',
      image: '/images/ChatGPT Image Sep 12, 2025, 11_21_11 PM.png'
    },
    {
      category: 'KINSHIP CIRCLES',
      title: 'Connect privately with peers who truly understand your journey',
      image: '/images/img2.png'
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

  // Scroll detection for header and sticky navigation (Gemini-style)
  useEffect(() => {
    let originalPosition = 0
    let isInitialized = false
    
    const handleScroll = () => {
      const scrollY = window.scrollY
      const windowHeight = window.innerHeight
      
      // Find the vision section (Sahayata empowers youth...)
      const visionSection = document.querySelector('[data-vision-section]')
      const visionSectionTop = visionSection ? visionSection.offsetTop : windowHeight * 0.8
      
      // Header visibility logic
      // Hide header when we reach the vision section
      const shouldHideHeader = scrollY > visionSectionTop - 100
      setIsHeaderVisible(!shouldHideHeader)
      
      // Sticky navigation logic
      let shouldShowSticky = false
      if (navigationCardRef.current) {
        // Get original position from dataset
        const storedPosition = navigationCardRef.current.dataset.originalPosition
        if (storedPosition) {
          originalPosition = parseInt(storedPosition)
        }
        
        // Show sticky when we've scrolled past the original position
        shouldShowSticky = scrollY > originalPosition - 50
      }
      setShowStickyNav(shouldShowSticky)

      // Update active section based on scroll position
      const sections = ['features-section', 'research-section', 'safety-section', 'architecture-section', 'pricing-section']
      let current = 'features-section'
      
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100) {
            current = sectionId
          }
        }
      }
      
      setActiveSection(current)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Initialize original position on mount
  useEffect(() => {
    if (navigationCardRef.current) {
      const originalPosition = navigationCardRef.current.offsetTop
      // Store it in a way that persists across re-renders
      navigationCardRef.current.dataset.originalPosition = originalPosition
    }
  }, [])

  // Handle section click
  const handleSectionClick = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }


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
    <div className="min-h-screen text-white overflow-x-hidden relative" style={{ background: 'linear-gradient(135deg, #000000 0%, #000000 30%, #060606 70%, #000000 100%)' }}>

      {/* Gemini-style Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/15 via-blue-950/10 to-black"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-blue-400/8 via-transparent to-transparent"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center_top,_var(--tw-gradient-stops))] from-blue-500/5 via-transparent to-transparent"></div>
      
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

      {/* Header - Gemini Style */}
      <header 
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ease-in-out ${
          isHeaderVisible 
            ? 'opacity-100 transform translateY(0)' 
            : 'opacity-0 transform -translate-y-full pointer-events-none'
        }`} 
        id="header" 
        style={{ 
          height: '88px', 
          background: 'linear-gradient(135deg, #000000 0%, #000000 30%, #060606 70%, #000000 100%)', 
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          transform: isHeaderVisible ? 'translateY(0)' : 'translateY(-100%)',
          opacity: isHeaderVisible ? 1 : 0
        }}
      >
        <div className="flex justify-between items-center pl-20 pr-6 h-full">
          {/* Left Section - Logo + Inline Nav */}
          <div className="flex items-center gap-32">
            {/* Logo */}
            <span className="text-white font-medium text-2xl tracking-wide" style={{ fontFamily: 'Google Sans, Arial, Helvetica, sans-serif' }}>Sahayata आवाज़AI</span>
            
            {/* Inline Navigation */}
            <nav className="hidden md:flex items-center gap-12">
              <button className="text-white/80 hover:text-white font-medium text-xl transition-all duration-300 relative group">
                Models
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#4285f4] to-[#a142f4] group-hover:w-full transition-all duration-300"></span>
              </button>
              <button className="text-white/80 hover:text-white font-medium text-xl transition-all duration-300 relative group">
                Research
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#4285f4] to-[#a142f4] group-hover:w-full transition-all duration-300"></span>
              </button>
              <button className="text-white/80 hover:text-white font-medium text-xl transition-all duration-300 relative group">
                Science
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#4285f4] to-[#a142f4] group-hover:w-full transition-all duration-300"></span>
              </button>
              <button className="text-white/80 hover:text-white font-medium text-xl transition-all duration-300 relative group">
                About
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#4285f4] to-[#a142f4] group-hover:w-full transition-all duration-300"></span>
              </button>
            </nav>
          </div>

          {/* Right Section - Three Items */}
          <div className="flex items-center gap-6">
            {/* Try Voice Journal Button - Gemini Card Style */}
            <button 
              onClick={handleTryJournal}
              className="text-white font-medium text-xl transition-all duration-300 hover:bg-white/10 group"
              style={{
                background: 'rgba(255,255,255,0.08)',
                borderRadius: '24px',
                padding: '10px 24px',
                fontWeight: '500',
                border: '1px solid transparent',
                boxShadow: '0 0 0 1px transparent'
              }}
              onMouseEnter={(e) => {
                e.target.style.boxShadow = '0 0 0 1px rgba(59, 107, 255, 0.6), 0 0 10px rgba(59, 107, 255, 0.3)'
              }}
              onMouseLeave={(e) => {
                e.target.style.boxShadow = '0 0 0 1px transparent'
              }}
            >
              Try Voice Journal
            </button>

            {/* Search Icon - Gemini Card Style */}
            <button 
              className="text-white/80 hover:text-white transition-all duration-300 hover:bg-white/10 flex items-center justify-center"
              style={{
                background: 'rgba(255,255,255,0.08)',
                borderRadius: '24px',
                padding: '10px',
                width: '52px',
                height: '52px'
              }}
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* User Avatar Dropdown */}
            <UserDropdown />
          </div>

          {/* Mobile Hamburger Menu */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white/80 hover:text-white transition-colors p-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-[#060606] border-t border-gray-800/50 pl-20 pr-6 py-4">
            <nav className="flex flex-col space-y-6">
              <button className="text-white/80 hover:text-white font-medium text-xl transition-colors text-left">
                Models
              </button>
              <button className="text-white/80 hover:text-white font-medium text-xl transition-colors text-left">
                Research
              </button>
              <button className="text-white/80 hover:text-white font-medium text-xl transition-colors text-left">
                Science
              </button>
              <button className="text-white/80 hover:text-white font-medium text-xl transition-colors text-left">
                About
              </button>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section - Gemini Style */}
      <div style={{ background: 'linear-gradient(135deg, #000000 0%, #000000 30%, #060606 70%, #000000 100%)' }}>
        <section
          className="px-6 relative overflow-hidden"
          style={{
            marginTop: '88px',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            paddingTop: '200px',
            background: 'transparent'
          }}
        >
        {/* Gradient Spotlight Effect - Darker Start */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 120% 80% at 50% 20%, rgba(0, 0, 0, 0.8) 0%, rgba(0, 51, 102, 0.1) 30%, rgba(26, 115, 232, 0.08) 60%, transparent 100%)',
            filter: 'blur(1px)'
          }}
        />
        
        {/* Cosmic Stars */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Large Stars */}
          {[...Array(15)].map((_, i) => (
            <div
              key={`large-${i}`}
              className="absolute animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: '2px',
                height: '2px',
                background: 'rgba(255, 255, 255, 0.9)',
                borderRadius: '50%',
                boxShadow: '0 0 8px rgba(66, 133, 244, 0.8), 0 0 16px rgba(26, 115, 232, 0.6), 0 0 24px rgba(66, 133, 244, 0.3)',
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
          
          {/* Medium Stars */}
          {[...Array(30)].map((_, i) => (
            <div
              key={`medium-${i}`}
              className="absolute animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: '1px',
                height: '1px',
                background: 'rgba(255, 255, 255, 0.7)',
                borderRadius: '50%',
                boxShadow: '0 0 6px rgba(66, 133, 244, 0.6), 0 0 12px rgba(26, 115, 232, 0.4)',
                animationDelay: `${Math.random() * 4}s`,
                animationDuration: `${1.5 + Math.random() * 2}s`
              }}
            />
          ))}
          
          {/* Small Stars */}
          {[...Array(50)].map((_, i) => (
            <div
              key={`small-${i}`}
              className="absolute animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: '0.5px',
                height: '0.5px',
                background: 'rgba(255, 255, 255, 0.5)',
                borderRadius: '50%',
                boxShadow: '0 0 4px rgba(66, 133, 244, 0.5), 0 0 8px rgba(26, 115, 232, 0.3)',
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${1 + Math.random() * 3}s`
              }}
            />
          ))}
          
          {/* Tiny Stars */}
          {[...Array(40)].map((_, i) => (
            <div
              key={`tiny-${i}`}
              className="absolute animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: '0.3px',
                height: '0.3px',
                background: 'rgba(255, 255, 255, 0.4)',
                borderRadius: '50%',
                boxShadow: '0 0 2px rgba(66, 133, 244, 0.4), 0 0 4px rgba(26, 115, 232, 0.2)',
                animationDelay: `${Math.random() * 6}s`,
                animationDuration: `${0.8 + Math.random() * 4}s`
              }}
            />
          ))}
        </div>
        <div 
          className="container mx-auto max-w-4xl text-center relative z-10"
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
              marginBottom: 'clamp(128px, 20vw, 224px)'
            }}
          >
            {/* Primary Button - Chat with Gemini Style */}
            <button
              onClick={(e) => {
                e.preventDefault()
                console.log('Button clicked!')
                handleGetStarted()
              }}
              className="px-5 py-5 rounded-full font-medium text-white text-xl
                         shadow-lg hover:shadow-blue-500/50 
                         transition-all duration-300 flex items-center gap-2
                         min-w-[240px] justify-center cursor-pointer
                         hover:shadow-xl hover:shadow-blue-500/40"
              style={{
                background: 'linear-gradient(90deg, #3b6bff, #2e96ff 65%, #acb7ff)'
              }}
            >
              <span style={{ fontFamily: 'Google Sans, Arial, Helvetica, sans-serif' }}>{user ? 'Go to App' : 'Start Your Journey'}</span>
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
              className="px-5 py-5 rounded-full font-medium text-white text-xl
                         border border-blue-400 
                         hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/30 
                         transition-all duration-300 flex items-center gap-2
                         min-w-[240px] justify-center cursor-pointer"
            >
              <span style={{ fontFamily: 'Google Sans, Arial, Helvetica, sans-serif' }}>{user ? 'Go to App' : 'Try Voice Agent'}</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 5l7 7-7 7"/>
              </svg>
            </button>
          </div>

          {/* Card Carousel - Inside Hero Section */}
          <div className="w-full max-w-4xl mx-auto">
            {/* Card Stack Container */}
            <div 
              className="relative w-full max-w-[720px] h-[240px] mx-auto overflow-visible"
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
                    onClick={() => {
                      const articleRoutes = ['/article/article1', '/article/article2', '/article/article3', '/article/article4']
                      navigate(articleRoutes[index])
                    }}
                  />
                );
              })}
            </div>
            
            {/* Navigation Dots - Gemini Style */}
            <div className="gemini-loader-container mt-1">
              {cards.map((_, index) => {
                const isActive = index === currentCardIndex;
                return (
                  <button
                    key={`${index}-${currentCardIndex}`} // Force re-render for animation reset
                    onClick={() => {
                      setCurrentCardIndex(index) // Just change the card, don't navigate
                    }}
                    className={`gemini-loader-dot ${
                      isActive
                        ? 'gemini-loader-dot--active'
                        : 'gemini-loader-dot--inactive'
                    }`}
                    style={{}}
                  />
                );
              })}
            </div>
          </div>

        </div>
        </section>

         {/* Vision Section */}
         <section className="py-20 px-6" style={{ background: 'linear-gradient(135deg, #000000 0%, #000000 40%, #020202 80%, #000000 100%)' }} data-vision-section>
        {/* Vision Text */}
        <div className="text-center mb-16 max-w-5xl mx-auto">
          <div className="text-4xl md:text-6xl font-semibold tracking-tight text-center text-blue-400">
            {[
              "Sahayata empowers youth with",
              "a trusted, voice-powered companion",
              "for reflection, resilience, and safe",
              "community support."
            ].map((line, lineIndex) => (
              <motion.div
                key={lineIndex}
                className="mb-4"
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ 
                  opacity: 1, 
                  x: 0,
                  transition: { 
                    duration: 0.8, 
                    ease: "easeOut",
                    delay: lineIndex * 0.2
                  }
                }}
                viewport={{ once: false, amount: 0.1 }}
                onViewportEnter={() => {
                  setVisibleLines(prev => [...prev, lineIndex])
                }}
                onViewportLeave={() => {
                  setVisibleLines(prev => prev.filter(index => index !== lineIndex))
                }}
              >
                {line.split(' ').map((word, wordIndex) => (
                  <motion.span
                    key={wordIndex}
                    className="inline-block mr-2"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ 
                      opacity: visibleLines.includes(lineIndex) ? 1 : 0,
                      x: visibleLines.includes(lineIndex) ? 0 : 30
                    }}
                    transition={{ 
                      delay: wordIndex * 0.08,
                      duration: 0.5,
                      ease: "easeOut"
                    }}
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.div>
            ))}
          </div>
        </div>

         {/* Navigation Card - Transitions from normal to sticky */}
         <div 
           ref={navigationCardRef}
           className={`px-6 py-4 max-w-2xl mx-auto transition-all duration-300 ${
             showStickyNav 
               ? 'fixed top-0 left-0 right-0 z-40 backdrop-blur-lg border border-gray-800/30 rounded-full' 
               : 'relative backdrop-blur-lg border border-gray-800/30 rounded-full'
           }`}
           style={{
             background: 'linear-gradient(135deg, #000000 0%, #000000 30%, #060606 70%, #000000 100%)'
           }}
         >
           <div className="flex flex-wrap justify-center gap-6">
             {[
               { name: 'Features', target: 'features-section' },
               { name: 'Research', target: 'research-section' },
               { name: 'Safety', target: 'safety-section' },
               { name: 'Architecture', target: 'architecture-section' },
               { name: 'Pricing', target: 'pricing-section' }
               ].map((item, index) => (
                 <button
                   key={item.name}
                   className={`px-4 py-2 rounded-full text-lg font-medium transition-all duration-300 ${
                     activeSection === item.target
                       ? 'text-white font-medium border border-gray-400/60 rounded-full bg-gray-800'
                       : 'text-gray-400 hover:text-white hover:bg-gray-800/30'
                   }`}
                   style={{ fontFamily: 'Arial, sans-serif' }}
                   onClick={() => {
                     const element = document.getElementById(item.target);
                     if (element) {
                       element.scrollIntoView({ behavior: 'smooth' });
                     }
                   }}
                 >
                   {item.name}
                 </button>
               ))}
           </div>
         </div>

         {/* Placeholder div to maintain layout when navigation becomes sticky */}
         {showStickyNav && <div className="h-20"></div>}
        </section>
      </div>

      {/* All Content Sections - Unified Background */}
      <div style={{ background: 'linear-gradient(135deg, #000000 0%, #000000 30%, #060606 70%, #000000 100%)' }}>
        {/* Features Section */}
      <section id="features-section" className="py-20 px-6" style={{ background: 'transparent' }}>
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-100 mb-8" style={{ fontFamily: 'Google Sans, Arial, Helvetica, sans-serif' }}>
              Core Features
            </h2>
            <p className="text-2xl text-gray-400 max-w-3xl mx-auto" style={{ fontFamily: 'Google Sans, Arial, Helvetica, sans-serif' }}>
              Everything you need for a comprehensive<br />
              mental wellness journey
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {/* Voice Journaling */}
            <div 
              className="relative transition-all duration-300 hover:scale-105 cursor-pointer group"
              style={{
                background: 'var(--surfaces-surface-container-bright, #1a1a1a)',
                borderRadius: '24px',
                border: '1px solid rgba(255,255,255,0.15)',
                minHeight: '600px',
                padding: '24px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.border = '1px solid rgba(66, 133, 244, 0.5)';
                e.currentTarget.style.boxShadow = '0 0 20px rgba(66, 133, 244, 0.2), 0 0 40px rgba(66, 133, 244, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.border = '1px solid rgba(255,255,255,0.15)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div className="flex flex-col items-center text-center h-full justify-center">
                <div className="w-64 h-64 mb-4 flex items-center justify-center" style={{ padding: '0px' }}>
                  <img 
                    src="/images/img6.png" 
                    alt="Voice Journaling" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="text-xs uppercase tracking-wider text-gray-400 mb-3 font-medium">
                  GENERAL AVAILABILITY
                </div>
                <h3 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: 'Google Sans, Arial, Helvetica, sans-serif' }}>
                  Voice Journaling
                </h3>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  Express your thoughts naturally through voice.<br />
                  Our AI understands context and provides gentle guidance.
                </p>
                <div className="mt-auto">
                  <a 
                    href="/article/article1" 
                    className="text-blue-400 hover:text-blue-300 hover:underline transition-colors duration-200"
                    style={{ color: '#4285f4' }}
                  >
                    Learn more →
                  </a>
                </div>
              </div>
            </div>

            {/* Mood Dashboard */}
            <div 
              className="relative transition-all duration-300 hover:scale-105 cursor-pointer group"
              style={{
                background: 'var(--surfaces-surface-container-bright, #1a1a1a)',
                borderRadius: '24px',
                border: '1px solid rgba(255,255,255,0.15)',
                minHeight: '600px',
                padding: '24px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.border = '1px solid rgba(66, 133, 244, 0.5)';
                e.currentTarget.style.boxShadow = '0 0 20px rgba(66, 133, 244, 0.2), 0 0 40px rgba(66, 133, 244, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.border = '1px solid rgba(255,255,255,0.15)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div className="flex flex-col items-center text-center h-full justify-center">
                <div className="w-64 h-64 mb-4 flex items-center justify-center" style={{ padding: '0px' }}>
                  <img 
                    src="/images/img6.png" 
                    alt="Mood Dashboard" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="text-xs uppercase tracking-wider text-gray-400 mb-3 font-medium">
                  GENERAL AVAILABILITY
                </div>
                <h3 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: 'Google Sans, Arial, Helvetica, sans-serif' }}>
                  Mood Dashboard
                </h3>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  Track patterns, set goals, and understand your<br />
                  emotional landscape with beautiful visualizations.
                </p>
                <div className="mt-auto">
                  <a 
                    href="/article/article2" 
                    className="text-blue-400 hover:text-blue-300 hover:underline transition-colors duration-200"
                    style={{ color: '#4285f4' }}
                  >
                    Learn more →
                  </a>
                </div>
              </div>
            </div>

            {/* Study Matrix */}
            <div 
              className="relative transition-all duration-300 hover:scale-105 cursor-pointer group sm:col-span-2 lg:col-span-1"
              style={{
                background: 'var(--surfaces-surface-container-bright, #1a1a1a)',
                borderRadius: '24px',
                border: '1px solid rgba(255,255,255,0.15)',
                minHeight: '600px',
                padding: '24px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.border = '1px solid rgba(66, 133, 244, 0.5)';
                e.currentTarget.style.boxShadow = '0 0 20px rgba(66, 133, 244, 0.2), 0 0 40px rgba(66, 133, 244, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.border = '1px solid rgba(255,255,255,0.15)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div className="flex flex-col items-center text-center h-full justify-center">
                <div className="w-64 h-64 mb-4 flex items-center justify-center" style={{ padding: '0px' }}>
                  <img 
                    src="/images/img6.png" 
                    alt="Study Matrix" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="text-xs uppercase tracking-wider text-gray-400 mb-3 font-medium">
                  GENERAL AVAILABILITY
                </div>
                <h3 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: 'Google Sans, Arial, Helvetica, sans-serif' }}>
                  Study Matrix
                </h3>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  Organize your learning journey with AI-powered<br />
                  study plans and progress tracking tools.
                </p>
                <div className="mt-auto">
                  <a 
                    href="/article/article3" 
                    className="text-blue-400 hover:text-blue-300 hover:underline transition-colors duration-200"
                    style={{ color: '#4285f4' }}
                  >
                    Learn more →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Research Section */}
      <section id="research-section" className="py-20 px-6" style={{ background: 'transparent' }}>
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-100 mb-8">
              Research & Science
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Built on evidence-based practices and cutting-edge AI research
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-white mb-6">Evidence-Based Approach</h3>
              <p className="text-lg text-gray-400 mb-8">
                Our platform is built on proven psychological frameworks including Cognitive Behavioral Therapy (CBT), 
                mindfulness-based interventions, and positive psychology principles.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center mr-4 mt-1">
                    <span className="text-blue-400 font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2">CBT Integration</h4>
                    <p className="text-gray-400">Cognitive restructuring techniques help identify and challenge negative thought patterns.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center mr-4 mt-1">
                    <span className="text-green-400 font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2">Mindfulness Practices</h4>
                    <p className="text-gray-400">Guided meditation and awareness exercises promote emotional regulation and stress reduction.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center mr-4 mt-1">
                    <span className="text-purple-400 font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2">Positive Psychology</h4>
                    <p className="text-gray-400">Strengths-based approach focusing on building resilience and well-being.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-900/50 rounded-2xl p-8 border border-gray-800">
              <h4 className="text-2xl font-bold text-white mb-6">Research Partners</h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-gray-800">
                  <span className="text-gray-300">Stanford University</span>
                  <span className="text-blue-400 text-sm">AI & Mental Health</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-800">
                  <span className="text-gray-300">MIT Media Lab</span>
                  <span className="text-green-400 text-sm">Human-Computer Interaction</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-800">
                  <span className="text-gray-300">Harvard Medical School</span>
                  <span className="text-purple-400 text-sm">Digital Therapeutics</span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <span className="text-gray-300">NIMH</span>
                  <span className="text-orange-400 text-sm">Clinical Validation</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Safety Section */}
      <section id="safety-section" className="py-20 px-6" style={{ background: 'transparent' }}>
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-100 mb-8">
              Safety & Privacy
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Your mental health data deserves the highest level of protection and care
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Data Protection */}
            <div className="bg-gray-900/50 rounded-2xl p-8 border border-gray-800 text-center">
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🔒</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">End-to-End Encryption</h3>
              <p className="text-gray-400 mb-6">
                All voice data and personal information is encrypted using industry-standard AES-256 encryption.
              </p>
              <ul className="text-sm text-gray-300 space-y-2">
                <li>• Zero-knowledge architecture</li>
                <li>• Local data processing</li>
                <li>• Secure key management</li>
              </ul>
            </div>

            {/* Privacy Controls */}
            <div className="bg-gray-900/50 rounded-2xl p-8 border border-gray-800 text-center">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">👤</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Privacy Controls</h3>
              <p className="text-gray-400 mb-6">
                You have complete control over your data. Delete, export, or modify your information anytime.
              </p>
              <ul className="text-sm text-gray-300 space-y-2">
                <li>• Data portability</li>
                <li>• Right to deletion</li>
                <li>• Granular permissions</li>
              </ul>
            </div>

            {/* Compliance */}
            <div className="bg-gray-900/50 rounded-2xl p-8 border border-gray-800 text-center">
              <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">✅</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Compliance & Standards</h3>
              <p className="text-gray-400 mb-6">
                We meet the highest international standards for data protection and healthcare privacy.
              </p>
              <ul className="text-sm text-gray-300 space-y-2">
                <li>• GDPR compliant</li>
                <li>• HIPAA ready</li>
                <li>• SOC 2 Type II</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Architecture Section */}
      <section id="architecture-section" className="py-20 px-6" style={{ background: 'transparent' }}>
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-100 mb-8">
              Technical Architecture
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Built on a robust, scalable infrastructure designed for privacy and performance
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-3xl font-bold text-white mb-6">System Overview</h3>
              <p className="text-lg text-gray-400 mb-8">
                Our architecture is designed with privacy-first principles, ensuring your data never leaves 
                your device without explicit consent and proper encryption.
              </p>
              
              <div className="space-y-6">
                <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-800">
                  <h4 className="text-xl font-bold text-white mb-3">Edge Computing</h4>
                  <p className="text-gray-400">Voice processing happens locally on your device, minimizing data transmission.</p>
                </div>
                
                <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-800">
                  <h4 className="text-xl font-bold text-white mb-3">Federated Learning</h4>
                  <p className="text-gray-400">AI models improve without accessing individual user data through privacy-preserving techniques.</p>
                </div>
                
                <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-800">
                  <h4 className="text-xl font-bold text-white mb-3">Microservices</h4>
                  <p className="text-gray-400">Modular architecture ensures reliability, scalability, and easy maintenance.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-900/50 rounded-2xl p-8 border border-gray-800">
              <h4 className="text-2xl font-bold text-white mb-6">Technology Stack</h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-gray-800">
                  <span className="text-gray-300">Frontend</span>
                  <span className="text-blue-400 text-sm">React, TypeScript</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-800">
                  <span className="text-gray-300">Backend</span>
                  <span className="text-green-400 text-sm">Node.js, Python</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-800">
                  <span className="text-gray-300">AI/ML</span>
                  <span className="text-purple-400 text-sm">TensorFlow, PyTorch</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-800">
                  <span className="text-gray-300">Database</span>
                  <span className="text-orange-400 text-sm">PostgreSQL, Redis</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-800">
                  <span className="text-gray-300">Infrastructure</span>
                  <span className="text-cyan-400 text-sm">AWS, Docker</span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <span className="text-gray-300">Security</span>
                  <span className="text-red-400 text-sm">AES-256, OAuth 2.0</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing-section" className="py-16 px-6" style={{ background: 'transparent' }}>
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-100 mb-8">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Choose the plan that fits your wellness journey. All plans include our core features with no hidden fees.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free Plan */}
            <div className="bg-gray-900/50 rounded-2xl p-8 border border-gray-800">
              <h3 className="text-2xl font-bold text-white mb-4">Free</h3>
              <div className="text-4xl font-bold text-white mb-6">$0<span className="text-lg text-gray-400">/month</span></div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-gray-300">
                  <span className="text-green-400 mr-3">✓</span>
                  Basic voice journaling
                </li>
                <li className="flex items-center text-gray-300">
                  <span className="text-green-400 mr-3">✓</span>
                  Mood tracking
                </li>
                <li className="flex items-center text-gray-300">
                  <span className="text-green-400 mr-3">✓</span>
                  Community access
                </li>
              </ul>
              <button className="w-full bg-gray-800 text-white py-3 rounded-lg hover:bg-gray-700 transition-colors">
                Get Started
              </button>
            </div>

            {/* Pro Plan */}
            <div className="bg-blue-900/20 rounded-2xl p-8 border-2 border-blue-500 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">Most Popular</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Pro</h3>
              <div className="text-4xl font-bold text-white mb-6">$9.99<span className="text-lg text-gray-400">/month</span></div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-gray-300">
                  <span className="text-green-400 mr-3">✓</span>
                  Everything in Free
                </li>
                <li className="flex items-center text-gray-300">
                  <span className="text-green-400 mr-3">✓</span>
                  Advanced AI insights
                </li>
                <li className="flex items-center text-gray-300">
                  <span className="text-green-400 mr-3">✓</span>
                  Kinship Circles
                </li>
                <li className="flex items-center text-gray-300">
                  <span className="text-green-400 mr-3">✓</span>
                  Priority support
                </li>
              </ul>
              <button className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors">
                Start Free Trial
              </button>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-gray-900/50 rounded-2xl p-8 border border-gray-800">
              <h3 className="text-2xl font-bold text-white mb-4">Enterprise</h3>
              <div className="text-4xl font-bold text-white mb-6">Custom</div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-gray-300">
                  <span className="text-green-400 mr-3">✓</span>
                  Everything in Pro
                </li>
                <li className="flex items-center text-gray-300">
                  <span className="text-green-400 mr-3">✓</span>
                  Custom integrations
                </li>
                <li className="flex items-center text-gray-300">
                  <span className="text-green-400 mr-3">✓</span>
                  Dedicated support
                </li>
                <li className="flex items-center text-gray-300">
                  <span className="text-green-400 mr-3">✓</span>
                  Advanced analytics
                </li>
              </ul>
              <button className="w-full bg-gray-800 text-white py-3 rounded-lg hover:bg-gray-700 transition-colors">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>
      </div>

      <footer className="py-8 px-6 border-t border-gray-800" style={{ background: 'linear-gradient(135deg, #000000 0%, #000000 30%, #060606 70%, #000000 100%)' }}>
        <div className="container mx-auto max-w-6xl text-center">
          <p className="text-gray-400">
            Built with ❤️ for your mental wellness journey
          </p>
        </div>
      </footer>
    </div>
  )
}