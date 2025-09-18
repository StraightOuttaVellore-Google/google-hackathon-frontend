
import { useState } from 'react'
import { useTheme } from './contexts/ThemeContext'
import StudyPage from './pages/study'
import WellnessPage from './pages/wellness'
import DarkModeToggle from './components/DarkModeToggle'
import UserDropdown from './components/UserDropdown'

export default function App() {
  const { isDarkMode } = useTheme()
  const [isStudyMode, setIsStudyMode] = useState(true)

  const toggleMode = () => {
    setIsStudyMode(!isStudyMode)
  }

  return (
    <div 
      className={`${isDarkMode ? 'dark' : ''} min-h-screen transition-all duration-500`}
      style={{
        background: '#000000'
      }}
    >
      {/* Galaxy Background Effects */}
      {(
        <>
          {/* Enhanced Dark Hues */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: isStudyMode 
                ? 'radial-gradient(ellipse 80% 60% at 50% 50%, transparent 0%, rgba(30, 15, 50, 0.12) 30%, rgba(20, 10, 35, 0.08) 60%, transparent 100%)'
                : 'radial-gradient(ellipse 80% 60% at 50% 50%, transparent 0%, rgba(15, 30, 20, 0.12) 30%, rgba(10, 20, 15, 0.08) 60%, transparent 100%)',
              filter: 'blur(3px)'
            }}
          />
          
          {/* Enhanced Hue */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: isStudyMode 
                ? 'radial-gradient(ellipse 60% 40% at 30% 70%, transparent 0%, rgba(40, 20, 70, 0.10) 40%, transparent 80%)'
                : 'radial-gradient(ellipse 60% 40% at 30% 70%, transparent 0%, rgba(20, 40, 30, 0.10) 40%, transparent 80%)',
              filter: 'blur(4px)'
            }}
          />
          
          {/* Additional Accent */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: isStudyMode 
                ? 'radial-gradient(ellipse 70% 50% at 60% 40%, transparent 0%, rgba(35, 15, 60, 0.08) 50%, transparent 100%)'
                : 'radial-gradient(ellipse 70% 50% at 60% 40%, transparent 0%, rgba(15, 35, 25, 0.08) 50%, transparent 100%)',
              filter: 'blur(5px)'
            }}
          />
          
          {/* Dark Accent */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: isStudyMode 
                ? 'radial-gradient(ellipse 50% 30% at 70% 30%, transparent 0%, rgba(10, 20, 50, 0.05) 50%, transparent 100%)'
                : 'radial-gradient(ellipse 50% 30% at 70% 30%, transparent 0%, rgba(10, 30, 20, 0.05) 50%, transparent 100%)',
              filter: 'blur(5px)'
            }}
          />
          
          {/* Subtle Elliptical Pattern */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: isStudyMode 
                ? 'radial-gradient(ellipse 60% 40% at 50% 50%, transparent 0%, rgba(50, 25, 80, 0.04) 20%, rgba(40, 20, 70, 0.06) 40%, rgba(30, 15, 60, 0.04) 60%, transparent 80%)'
                : 'radial-gradient(ellipse 60% 40% at 50% 50%, transparent 0%, rgba(25, 50, 30, 0.04) 20%, rgba(20, 40, 25, 0.06) 40%, rgba(15, 30, 20, 0.04) 60%, transparent 80%)',
              filter: 'blur(6px)'
            }}
          />
          
          {/* Star Cluster 1 - Top Left */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: isStudyMode 
                ? 'radial-gradient(ellipse 15% 15% at 20% 25%, transparent 0%, rgba(30, 20, 60, 0.08) 40%, rgba(20, 15, 40, 0.04) 70%, transparent 100%)'
                : 'radial-gradient(ellipse 15% 15% at 20% 25%, transparent 0%, rgba(20, 30, 25, 0.08) 40%, rgba(15, 20, 15, 0.04) 70%, transparent 100%)',
              filter: 'blur(2px)'
            }}
          />
          
          {/* Star Cluster 2 - Top Right */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: isStudyMode 
                ? 'radial-gradient(ellipse 12% 18% at 80% 20%, transparent 0%, rgba(25, 30, 70, 0.06) 35%, rgba(15, 20, 50, 0.03) 65%, transparent 100%)'
                : 'radial-gradient(ellipse 12% 18% at 80% 20%, transparent 0%, rgba(25, 30, 25, 0.06) 35%, rgba(15, 20, 15, 0.03) 65%, transparent 100%)',
              filter: 'blur(3px)'
            }}
          />
          
          {/* Star Cluster 3 - Bottom Left */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: isStudyMode 
                ? 'radial-gradient(ellipse 18% 12% at 25% 75%, transparent 0%, rgba(35, 25, 80, 0.07) 45%, rgba(20, 15, 45, 0.04) 75%, transparent 100%)'
                : 'radial-gradient(ellipse 18% 12% at 25% 75%, transparent 0%, rgba(25, 35, 30, 0.07) 45%, rgba(15, 20, 15, 0.04) 75%, transparent 100%)',
              filter: 'blur(2px)'
            }}
          />
          
          {/* Star Cluster 4 - Bottom Right */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: isStudyMode 
                ? 'radial-gradient(ellipse 14% 16% at 75% 80%, transparent 0%, rgba(20, 35, 60, 0.05) 40%, rgba(10, 25, 40, 0.03) 70%, transparent 100%)'
                : 'radial-gradient(ellipse 14% 16% at 75% 80%, transparent 0%, rgba(20, 35, 25, 0.05) 40%, rgba(10, 25, 15, 0.03) 70%, transparent 100%)',
              filter: 'blur(4px)'
            }}
          />
          
          {/* Star Cluster 5 - Center Left */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: isStudyMode 
                ? 'radial-gradient(ellipse 10% 20% at 15% 50%, transparent 0%, rgba(40, 20, 70, 0.06) 50%, rgba(25, 15, 35, 0.03) 80%, transparent 100%)'
                : 'radial-gradient(ellipse 10% 20% at 15% 50%, transparent 0%, rgba(20, 40, 30, 0.06) 50%, rgba(15, 25, 20, 0.03) 80%, transparent 100%)',
              filter: 'blur(3px)'
            }}
          />
          
          {/* Star Cluster 6 - Center Right */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: isStudyMode 
                ? 'radial-gradient(ellipse 16% 10% at 85% 45%, transparent 0%, rgba(15, 40, 80, 0.05) 45%, rgba(10, 25, 50, 0.03) 75%, transparent 100%)'
                : 'radial-gradient(ellipse 16% 10% at 85% 45%, transparent 0%, rgba(15, 40, 25, 0.05) 45%, rgba(10, 25, 15, 0.03) 75%, transparent 100%)',
              filter: 'blur(2px)'
            }}
          />
          
          {/* Prominent Star Field */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Bright Stars - Very Prominent */}
            {[...Array(50)].map((_, i) => (
              <div
                key={`bright-star-${i}`}
                className="absolute animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${Math.random() * 3 + 2}px`,
                  height: `${Math.random() * 3 + 2}px`,
                  background: 'rgba(255, 255, 255, 0.9)',
                  borderRadius: '50%',
                  boxShadow: isStudyMode 
                    ? '0 0 8px rgba(200, 220, 255, 0.8), 0 0 16px rgba(150, 180, 255, 0.6), 0 0 24px rgba(100, 140, 255, 0.4)'
                    : '0 0 8px rgba(100, 200, 100, 0.8), 0 0 16px rgba(80, 180, 80, 0.6), 0 0 24px rgba(60, 160, 60, 0.4)',
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${Math.random() * 2 + 1.5}s`
                }}
              />
            ))}
            
            {/* Medium Stars - Prominent */}
            {[...Array(80)].map((_, i) => (
              <div
                key={`medium-star-${i}`}
                className="absolute animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${Math.random() * 2 + 1}px`,
                  height: `${Math.random() * 2 + 1}px`,
                  background: isStudyMode 
                    ? 'rgba(200, 220, 255, 0.8)'
                    : 'rgba(100, 200, 100, 0.8)',
                  borderRadius: '50%',
                  boxShadow: isStudyMode 
                    ? '0 0 6px rgba(150, 180, 255, 0.7), 0 0 12px rgba(100, 140, 255, 0.5)'
                    : '0 0 6px rgba(80, 180, 80, 0.7), 0 0 12px rgba(60, 160, 60, 0.5)',
                  animationDelay: `${Math.random() * 4}s`,
                  animationDuration: `${Math.random() * 3 + 2}s`
                }}
              />
            ))}
            
            {/* Colored Stars */}
            {[...Array(60)].map((_, i) => (
              <div
                key={`colored-star-${i}`}
                className="absolute animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${Math.random() * 1.5 + 0.8}px`,
                  height: `${Math.random() * 1.5 + 0.8}px`,
                  background: isStudyMode 
                    ? 'rgba(150, 120, 200, 0.7)'
                    : 'rgba(80, 150, 100, 0.7)',
                  borderRadius: '50%',
                  boxShadow: isStudyMode 
                    ? '0 0 5px rgba(120, 100, 180, 0.6), 0 0 10px rgba(80, 60, 160, 0.4)'
                    : '0 0 5px rgba(60, 120, 80, 0.6), 0 0 10px rgba(40, 100, 60, 0.4)',
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${Math.random() * 4 + 3}s`
                }}
              />
            ))}
            
            {/* Distant Stars - More Visible */}
            {[...Array(120)].map((_, i) => (
              <div
                key={`distant-star-${i}`}
                className="absolute animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: '1px',
                  height: '1px',
                  background: isStudyMode 
                    ? 'rgba(180, 200, 255, 0.6)'
                    : 'rgba(120, 200, 120, 0.6)',
                  borderRadius: '50%',
                  boxShadow: isStudyMode 
                    ? '0 0 3px rgba(120, 150, 255, 0.5)'
                    : '0 0 3px rgba(80, 150, 80, 0.5)',
                  animationDelay: `${Math.random() * 6}s`,
                  animationDuration: `${Math.random() * 5 + 4}s`
                }}
              />
            ))}
            
            {/* Tiny Stars - Fill the Sky */}
            {[...Array(200)].map((_, i) => (
              <div
                key={`tiny-star-${i}`}
                className="absolute animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: '0.5px',
                  height: '0.5px',
                  background: isStudyMode 
                    ? 'rgba(200, 220, 255, 0.4)'
                    : 'rgba(100, 200, 100, 0.4)',
                  borderRadius: '50%',
                  boxShadow: isStudyMode 
                    ? '0 0 2px rgba(150, 180, 255, 0.3)'
                    : '0 0 2px rgba(80, 150, 80, 0.3)',
                  animationDelay: `${Math.random() * 8}s`,
                  animationDuration: `${Math.random() * 6 + 5}s`
                }}
              />
            ))}
            
            {/* Star Cluster 1 - Top Left Dense Stars */}
            {[...Array(15)].map((_, i) => (
              <div
                key={`cluster1-star-${i}`}
                className="absolute animate-pulse"
                style={{
                  left: `${15 + Math.random() * 15}%`,
                  top: `${20 + Math.random() * 15}%`,
                  width: `${Math.random() * 1.5 + 0.8}px`,
                  height: `${Math.random() * 1.5 + 0.8}px`,
                  background: isStudyMode 
                    ? 'rgba(180, 140, 220, 0.8)'
                    : 'rgba(120, 200, 120, 0.8)',
                  borderRadius: '50%',
                  boxShadow: isStudyMode 
                    ? '0 0 4px rgba(140, 100, 200, 0.6), 0 0 8px rgba(100, 80, 180, 0.4)'
                    : '0 0 4px rgba(80, 160, 80, 0.6), 0 0 8px rgba(60, 140, 60, 0.4)',
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${Math.random() * 2 + 1.5}s`
                }}
              />
            ))}
            
            {/* Star Cluster 2 - Top Right Dense Stars */}
            {[...Array(12)].map((_, i) => (
              <div
                key={`cluster2-star-${i}`}
                className="absolute animate-pulse"
                style={{
                  left: `${75 + Math.random() * 15}%`,
                  top: `${15 + Math.random() * 15}%`,
                  width: `${Math.random() * 1.2 + 0.6}px`,
                  height: `${Math.random() * 1.2 + 0.6}px`,
                  background: isStudyMode 
                    ? 'rgba(140, 160, 220, 0.7)'
                    : 'rgba(100, 180, 100, 0.7)',
                  borderRadius: '50%',
                  boxShadow: isStudyMode 
                    ? '0 0 3px rgba(100, 120, 200, 0.5), 0 0 6px rgba(80, 100, 180, 0.3)'
                    : '0 0 3px rgba(80, 140, 80, 0.5), 0 0 6px rgba(60, 120, 60, 0.3)',
                  animationDelay: `${Math.random() * 4}s`,
                  animationDuration: `${Math.random() * 3 + 2}s`
                }}
              />
            ))}
            
            {/* Star Cluster 3 - Bottom Left Dense Stars */}
            {[...Array(18)].map((_, i) => (
              <div
                key={`cluster3-star-${i}`}
                className="absolute animate-pulse"
                style={{
                  left: `${20 + Math.random() * 20}%`,
                  top: `${70 + Math.random() * 15}%`,
                  width: `${Math.random() * 1.8 + 0.7}px`,
                  height: `${Math.random() * 1.8 + 0.7}px`,
                  background: isStudyMode 
                    ? 'rgba(200, 120, 240, 0.8)'
                    : 'rgba(140, 200, 140, 0.8)',
                  borderRadius: '50%',
                  boxShadow: isStudyMode 
                    ? '0 0 5px rgba(160, 80, 220, 0.6), 0 0 10px rgba(120, 60, 200, 0.4)'
                    : '0 0 5px rgba(100, 160, 100, 0.6), 0 0 10px rgba(80, 140, 80, 0.4)',
                  animationDelay: `${Math.random() * 3.5}s`,
                  animationDuration: `${Math.random() * 2.5 + 1.8}s`
                }}
              />
            ))}
            
            {/* Star Cluster 4 - Bottom Right Dense Stars */}
            {[...Array(14)].map((_, i) => (
              <div
                key={`cluster4-star-${i}`}
                className="absolute animate-pulse"
                style={{
                  left: `${70 + Math.random() * 15}%`,
                  top: `${75 + Math.random() * 15}%`,
                  width: `${Math.random() * 1.3 + 0.5}px`,
                  height: `${Math.random() * 1.3 + 0.5}px`,
                  background: isStudyMode 
                    ? 'rgba(120, 180, 240, 0.7)'
                    : 'rgba(110, 190, 110, 0.7)',
                  borderRadius: '50%',
                  boxShadow: isStudyMode 
                    ? '0 0 4px rgba(80, 140, 220, 0.5), 0 0 8px rgba(60, 120, 200, 0.3)'
                    : '0 0 4px rgba(90, 150, 90, 0.5), 0 0 8px rgba(70, 130, 70, 0.3)',
                  animationDelay: `${Math.random() * 4.5}s`,
                  animationDuration: `${Math.random() * 3.5 + 2.2}s`
                }}
              />
            ))}
            
            {/* Star Cluster 5 - Center Left Dense Stars */}
            {[...Array(10)].map((_, i) => (
              <div
                key={`cluster5-star-${i}`}
                className="absolute animate-pulse"
                style={{
                  left: `${10 + Math.random() * 10}%`,
                  top: `${45 + Math.random() * 10}%`,
                  width: `${Math.random() * 1.0 + 0.6}px`,
                  height: `${Math.random() * 1.0 + 0.6}px`,
                  background: isStudyMode 
                    ? 'rgba(160, 100, 200, 0.6)'
                    : 'rgba(90, 170, 90, 0.6)',
                  borderRadius: '50%',
                  boxShadow: isStudyMode 
                    ? '0 0 3px rgba(120, 80, 180, 0.4), 0 0 6px rgba(100, 60, 160, 0.2)'
                    : '0 0 3px rgba(70, 140, 70, 0.4), 0 0 6px rgba(50, 120, 50, 0.2)',
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${Math.random() * 4 + 3}s`
                }}
              />
            ))}
            
            {/* Star Cluster 6 - Center Right Dense Stars */}
            {[...Array(16)].map((_, i) => (
              <div
                key={`cluster6-star-${i}`}
                className="absolute animate-pulse"
                style={{
                  left: `${80 + Math.random() * 15}%`,
                  top: `${40 + Math.random() * 10}%`,
                  width: `${Math.random() * 1.4 + 0.7}px`,
                  height: `${Math.random() * 1.4 + 0.7}px`,
                  background: isStudyMode 
                    ? 'rgba(100, 140, 220, 0.7)'
                    : 'rgba(130, 210, 130, 0.8)',
                  borderRadius: '50%',
                  boxShadow: isStudyMode 
                    ? '0 0 4px rgba(60, 100, 200, 0.5), 0 0 8px rgba(40, 80, 180, 0.3)'
                    : '0 0 6px rgba(100, 170, 100, 0.6), 0 0 12px rgba(80, 150, 80, 0.4)',
                  animationDelay: `${Math.random() * 4.2}s`,
                  animationDuration: `${Math.random() * 3.2 + 2.5}s`
                }}
              />
            ))}
          </div>
        </>
      )}

      {/* Dark Mode Toggle - Top Left */}
      <div className="fixed top-6 left-6 z-50">
        <DarkModeToggle />
      </div>

      {/* User Dropdown - Top Right */}
      <div className="fixed top-6 right-6 z-50">
        <UserDropdown />
      </div>

      {/* Floating Toggle Switch */}
      <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
        <div 
          className="backdrop-blur-lg rounded-full p-1 shadow-xl relative overflow-hidden"
          style={{
            background: 'rgba(0, 0, 0, 0.2)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            boxShadow: isStudyMode 
              ? '0 8px 32px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.08), 0 0 20px rgba(100, 150, 255, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
              : '0 8px 32px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.08), 0 0 20px rgba(100, 200, 100, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
          }}
        >
          {/* Toggle Stars */}
          {[...Array(8)].map((_, i) => (
            <div
              key={`toggle-star-${i}`}
              className="absolute animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 0.8 + 0.4}px`,
                height: `${Math.random() * 0.8 + 0.4}px`,
                background: isStudyMode 
                  ? 'rgba(200, 220, 255, 0.6)'
                  : 'rgba(100, 200, 100, 0.6)',
                borderRadius: '50%',
                boxShadow: isStudyMode 
                  ? '0 0 3px rgba(150, 180, 255, 0.4)'
                  : '0 0 3px rgba(80, 150, 80, 0.4)',
                animationDelay: `${Math.random() * 4}s`,
                animationDuration: `${Math.random() * 3 + 2}s`,
                zIndex: 1
              }}
            />
          ))}
          
          <div className="flex items-center relative z-10">
            <button
              onClick={toggleMode}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-500 transform ${
                isStudyMode 
                  ? 'bg-gradient-to-r from-sky-500 to-sky-600 text-white shadow-lg scale-105' 
                  : 'text-white/70 hover:text-white hover:bg-white/20'
              }`}
            >
              📚 Study
            </button>
            <button
              onClick={toggleMode}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-500 transform ${
                !isStudyMode 
                  ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg scale-105' 
                  : 'text-white/70 hover:text-white hover:bg-white/20'
              }`}
            >
              🌿 Wellness
            </button>
          </div>
        </div>
      </div>

      {/* Page Content */}
      <div className="pt-24">
        {isStudyMode ? <StudyPage /> : <WellnessPage />}
      </div>
    </div>
  )
}
