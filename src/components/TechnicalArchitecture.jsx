import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import ArchitectureCard from './ArchitectureCard'

const TechnicalArchitecture = () => {
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleExpand = (e) => {
    e.preventDefault()
    e.stopPropagation()
    console.log('Toggle clicked, current state:', isExpanded)
    setIsExpanded(prev => {
      console.log('Setting state to:', !prev)
      return !prev
    })
  }

  return (
    <section id="architecture-section" className="py-12 md:py-20" style={{ background: '#000000' }}>
      {/* Section Header */}
      <div className="container mx-auto max-w-6xl px-3 md:px-6 mb-8 md:mb-12">
        <div className="text-center">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-8" style={{ 
            fontFamily: 'Google Sans, Arial, Helvetica, sans-serif',
            textShadow: '0 0 15px rgba(255, 255, 255, 0.4)',
            filter: 'brightness(1.15)',
            WebkitFontSmoothing: 'antialiased'
          }}>
            Technical Architecture
          </h2>
          <p className="text-base md:text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto font-medium px-4" style={{ 
            fontFamily: 'Google Sans, Arial, Helvetica, sans-serif',
            textShadow: '0 0 10px rgba(255, 255, 255, 0.25)',
            filter: 'brightness(1.1)',
            WebkitFontSmoothing: 'antialiased'
          }}>
            Built on a robust, scalable infrastructure designed for privacy and performance
          </p>
        </div>
      </div>

      {/* Collapsible Architecture Card */}
      <div className="w-full max-w-7xl mx-auto px-3 md:px-6">
        <div 
          className="rounded-2xl md:rounded-3xl transition-all duration-500 ease-in-out overflow-hidden"
          style={{
            background: '#000000',
            borderRadius: '24px',
            border: '1px solid rgba(255,255,255,0.3)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.border = '1px solid rgba(66, 133, 244, 0.6)'
            e.currentTarget.style.boxShadow = '0 0 20px rgba(66, 133, 244, 0.3), 0 0 40px rgba(66, 133, 244, 0.15)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.border = '1px solid rgba(255,255,255,0.3)'
            e.currentTarget.style.boxShadow = 'none'
          }}
        >
          {/* Overview Section - Always Visible */}
          <div className="p-6 md:p-8">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2 md:mb-3" style={{ 
                  fontFamily: 'Google Sans, Arial, Helvetica, sans-serif',
                  textShadow: '0 0 10px rgba(255, 255, 255, 0.3)',
                  filter: 'brightness(1.2)',
                  WebkitFontSmoothing: 'antialiased'
                }}>
                  Architecture Overview
                </h3>
                <p className="text-sm md:text-base text-gray-300 leading-relaxed" style={{ 
                  fontFamily: 'Google Sans, Arial, Helvetica, sans-serif'
                }}>
                  Our platform is built on a modern, scalable architecture with six core layers: Frontend Applications, Backend API Services, AI & ML Services, Database & Storage, Cloud Infrastructure, and Security & Authentication. Each layer is designed for performance, privacy, and seamless integration.
                </p>
              </div>
              
              {/* Expand/Collapse Button */}
              <button
                type="button"
                onClick={toggleExpand}
                className="ml-4 md:ml-6 flex-shrink-0 p-3 md:p-4 rounded-full transition-all duration-300 hover:bg-white/10 flex items-center justify-center cursor-pointer relative z-10"
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  minWidth: '48px',
                  minHeight: '48px',
                  cursor: 'pointer',
                  zIndex: 10,
                  pointerEvents: 'auto',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(66, 133, 244, 0.2)'
                  e.currentTarget.style.border = '1px solid rgba(66, 133, 244, 0.5)'
                  e.currentTarget.style.transform = 'scale(1.05)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.08)'
                  e.currentTarget.style.border = '1px solid rgba(255,255,255,0.15)'
                  e.currentTarget.style.transform = 'scale(1)'
                }}
                aria-label={isExpanded ? 'Collapse architecture details' : 'Expand architecture details'}
              >
                {isExpanded ? (
                  <ChevronUp className="w-5 h-5 md:w-6 md:h-6 text-white" />
                ) : (
                  <ChevronDown className="w-5 h-5 md:w-6 md:h-6 text-white" />
                )}
              </button>
            </div>
          </div>

          {/* Detailed Architecture - Collapsible */}
          <div 
            className="transition-all duration-500 ease-in-out overflow-hidden"
            style={{
              maxHeight: isExpanded ? '5000px' : '0',
              opacity: isExpanded ? 1 : 0,
              transition: 'max-height 0.5s ease-in-out, opacity 0.5s ease-in-out',
            }}
          >
            <div className="px-6 md:px-8 pb-6 md:pb-8 border-t border-white/20">
              <ArchitectureCard />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TechnicalArchitecture
