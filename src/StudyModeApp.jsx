import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent, Button } from "ui-neumorphism";
import { useAuth } from "./contexts/AuthContext";

export default function StudyModeApp() {
  const [isStudyMode, setIsStudyMode] = useState(true);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { user, signOut } = useAuth();

  const toggleMode = () => {
    setIsStudyMode(!isStudyMode);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsUserDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      window.location.href = '/';
      setIsUserDropdownOpen(false);
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return (
    <div 
      className="text-white overflow-x-hidden relative min-h-screen"
      style={{
        background: '#000000'
      }}
    >
      {/* Galaxy Background Effects - Study Mode */}
      <>
        {/* Enhanced Dark Hues */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 80% 60% at 50% 50%, transparent 0%, rgba(30, 15, 50, 0.12) 30%, rgba(20, 10, 35, 0.08) 60%, transparent 100%)',
            filter: 'blur(3px)'
          }}
        />
        
        {/* Enhanced Hue */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 60% 40% at 30% 70%, transparent 0%, rgba(40, 20, 70, 0.10) 40%, transparent 80%)',
            filter: 'blur(4px)'
          }}
        />
        
        {/* Additional Accent */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 70% 50% at 60% 40%, transparent 0%, rgba(35, 15, 60, 0.08) 50%, transparent 100%)',
            filter: 'blur(5px)'
          }}
        />
        
        {/* Dark Accent */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 50% 30% at 70% 30%, transparent 0%, rgba(10, 20, 50, 0.05) 50%, transparent 100%)',
            filter: 'blur(5px)'
          }}
        />
        
        {/* Subtle Elliptical Pattern */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 60% 40% at 50% 50%, transparent 0%, rgba(50, 25, 80, 0.04) 20%, rgba(40, 20, 70, 0.06) 40%, rgba(30, 15, 60, 0.04) 60%, transparent 80%)',
            filter: 'blur(6px)'
          }}
        />
        
        {/* Star Cluster 1 - Top Left */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 15% 15% at 20% 25%, transparent 0%, rgba(30, 20, 60, 0.08) 40%, rgba(20, 15, 40, 0.04) 70%, transparent 100%)',
            filter: 'blur(2px)'
          }}
        />
        
        {/* Star Cluster 2 - Top Right */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 12% 18% at 80% 20%, transparent 0%, rgba(25, 30, 70, 0.06) 35%, rgba(15, 20, 50, 0.03) 65%, transparent 100%)',
            filter: 'blur(3px)'
          }}
        />
        
        {/* Star Cluster 3 - Bottom Left */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 18% 12% at 25% 75%, transparent 0%, rgba(35, 25, 80, 0.07) 45%, rgba(20, 15, 45, 0.04) 75%, transparent 100%)',
            filter: 'blur(2px)'
          }}
        />
        
        {/* Star Cluster 4 - Bottom Right */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 14% 16% at 75% 80%, transparent 0%, rgba(20, 35, 60, 0.05) 40%, rgba(10, 25, 40, 0.03) 70%, transparent 100%)',
            filter: 'blur(4px)'
          }}
        />
        
        {/* Star Cluster 5 - Center Left */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 10% 20% at 15% 50%, transparent 0%, rgba(40, 20, 70, 0.06) 50%, rgba(25, 15, 35, 0.03) 80%, transparent 100%)',
            filter: 'blur(3px)'
          }}
        />
        
        {/* Star Cluster 6 - Center Right */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 16% 10% at 85% 45%, transparent 0%, rgba(15, 40, 80, 0.05) 45%, rgba(10, 25, 50, 0.03) 75%, transparent 100%)',
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
                boxShadow: '0 0 8px rgba(200, 220, 255, 0.8), 0 0 16px rgba(150, 180, 255, 0.6), 0 0 24px rgba(100, 140, 255, 0.4)',
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
                background: 'rgba(255, 255, 255, 0.7)',
                borderRadius: '50%',
                boxShadow: '0 0 6px rgba(180, 200, 255, 0.6), 0 0 12px rgba(120, 160, 255, 0.4)',
                animationDelay: `${Math.random() * 4}s`,
                animationDuration: `${Math.random() * 3 + 2}s`
              }}
            />
          ))}
          
          {/* Small Stars - Subtle */}
          {[...Array(120)].map((_, i) => (
            <div
              key={`small-star-${i}`}
              className="absolute animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 1 + 0.5}px`,
                height: `${Math.random() * 1 + 0.5}px`,
                background: 'rgba(255, 255, 255, 0.5)',
                borderRadius: '50%',
                boxShadow: '0 0 4px rgba(150, 180, 255, 0.4)',
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${Math.random() * 4 + 3}s`
              }}
            />
          ))}
        </div>
      </>

      {/* Sticky Header - Mode Switch */}
      <div className="fixed top-0 left-0 right-0 z-50 p-6 flex justify-center items-center"
        style={{
          background: 'transparent'
        }}
      >
        <div className="flex items-center relative z-10">
          <Button
            dark
            rounded
            elevation={2}
            onClick={toggleMode}
            style={{
              background: isStudyMode 
                ? '#000000' 
                : '#000000',
              color: 'white',
              padding: '12px 24px',
              marginRight: '8px',
              borderRadius: '9999px',
              boxShadow: isStudyMode 
                ? '2px 2px 4px #000000, -2px -2px 4px #1a1a1a' 
                : 'inset 4px 4px 8px #000000, inset -4px -4px 8px #1a1a1a',
              transform: isStudyMode ? 'scale(1.05)' : 'scale(1)',
              transition: 'all 0.5s ease'
            }}
          >
            📚 Study
          </Button>
          <Button
            dark
            rounded
            elevation={2}
            onClick={toggleMode}
            style={{
              background: !isStudyMode 
                ? '#000000' 
                : '#000000',
              color: 'white',
              padding: '12px 24px',
              borderRadius: '9999px',
              boxShadow: !isStudyMode 
                ? '2px 2px 4px #000000, -2px -2px 4px #1a1a1a' 
                : 'inset 4px 4px 8px #000000, inset -4px -4px 8px #1a1a1a',
              transform: !isStudyMode ? 'scale(1.05)' : 'scale(1)',
              transition: 'all 0.5s ease'
            }}
          >
            🌿 Wellness
          </Button>
        </div>

        {/* User Dropdown - Top Right */}
        <div className="fixed top-6 right-6 z-50" ref={dropdownRef}>
          <UserDropdown 
            user={user}
            isOpen={isUserDropdownOpen}
            setIsOpen={setIsUserDropdownOpen}
            onSignOut={handleSignOut}
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 pt-24">
        {/* Button Card with same width as MoodBoardWidget */}
        <div className="px-6 pb-6 flex justify-center">
          <Button
            dark
            rounded
            elevation={2}
            style={{
              background: 'rgba(0, 0, 0, 0.5)',
              color: 'white',
              width: '1636px',
              height: '337px',
              padding: '24px',
              boxShadow: 'inset 4px 4px 8px #000000, inset -4px -4px 8px #1a1a1a',
              transform: 'scale(1)',
              transition: 'all 0.5s ease',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
              gap: '32px'
            }}
          >
            {/* First Card - Exact size from image */}
            <div style={{ width: '291.73px', height: '288px' }}>
              <Button
                dark
                rounded
                elevation={2}
                style={{
                  background: 'rgba(0, 0, 0, 0.3)',
                  color: 'white',
                  width: '100%',
                  height: '100%',
                  padding: '16px',
                  boxShadow: 'inset 2px 2px 4px #000000, inset -2px -2px 4px #1a1a1a',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <div className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg mb-3 mx-auto flex items-center justify-center">
                    <span className="text-3xl">🎤</span>
                  </div>
                  <h4 className="text-lg font-bold mb-1">Voice AI</h4>
                  <p className="text-sm text-white/70">Aawaaz Journal</p>
                </div>
              </Button>
            </div>

            {/* Second Card - Exact size from image, to the right of Voice AI */}
            <div style={{ width: '583.47px', height: '288px' }}>
              <Button
                dark
                rounded
                elevation={2}
                style={{
                  background: 'rgba(0, 0, 0, 0.3)',
                  color: 'white',
                  width: '100%',
                  height: '100%',
                  padding: '16px',
                  boxShadow: 'inset 2px 2px 4px #000000, inset -2px -2px 4px #1a1a1a',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <div className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg mb-3 mx-auto flex items-center justify-center">
                    <span className="text-3xl">📅</span>
                  </div>
                  <h4 className="text-lg font-bold mb-1">Calendar</h4>
                  <p className="text-sm text-white/70">Monthly View</p>
                </div>
              </Button>
            </div>

            {/* Third Card - Adjusted to fit */}
            <div style={{ width: '583.47px', height: '288px' }}>
              <Button
                dark
                rounded
                elevation={2}
                style={{
                  background: 'rgba(0, 0, 0, 0.3)',
                  color: 'white',
                  width: '100%',
                  height: '100%',
                  padding: '16px',
                  boxShadow: 'inset 2px 2px 4px #000000, inset -2px -2px 4px #1a1a1a',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <div className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg mb-3 mx-auto flex items-center justify-center">
                    <span className="text-3xl">📊</span>
                  </div>
                  <h4 className="text-lg font-bold mb-1">Stats</h4>
                  <p className="text-sm text-white/70">Monthly Stats</p>
                </div>
              </Button>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
}

// Neumorphic User Dropdown Component
function UserDropdown({ user, isOpen, setIsOpen, onSignOut }) {
  return (
    <div className="relative">
      {/* User Avatar Button - Exact Match to Original */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 p-2 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300"
        style={{
          background: 'transparent',
          border: 'none',
          outline: 'none'
        }}
      >
        {user ? (
          <div className="w-8 h-8 bg-gradient-to-br from-[#4285f4] to-[#a142f4] rounded-full flex items-center justify-center text-white font-medium text-sm">
            {user.email?.charAt(0).toUpperCase() || 'U'}
          </div>
        ) : (
          <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        )}
        <svg
          className={`w-4 h-4 text-white/80 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu - Exact Match to Original */}
      {isOpen && (
        <div 
          className="absolute right-0 mt-2 w-64 bg-[#1a1a1a] rounded-lg shadow-xl border border-gradient-to-r from-[#4285f4] to-[#a142f4] z-50 overflow-hidden"
          style={{
            position: 'absolute',
            right: 0,
            top: '100%',
            marginTop: '8px',
            width: '256px',
            background: '#1a1a1a',
            zIndex: 50,
            overflow: 'hidden'
          }}
        >
            {user ? (
              // Authenticated User Menu
              <>
                {/* User Info Header */}
                <div style={{ padding: '16px', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                  <p className="text-sm font-medium text-white">
                    {user.email}
                  </p>
                  <p className="text-xs text-white/60">
                    Free Plan
                  </p>
                </div>

                {/* Menu Items */}
                <div className="py-2">
                  <button
                    className="w-full flex items-center px-4 py-2 text-sm text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300"
                  >
                    <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Profile
                  </button>

                  <button
                    className="w-full flex items-center px-4 py-2 text-sm text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300"
                  >
                    <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Settings
                  </button>

                  {/* Divider */}
                  <div className="my-1 border-t border-gray-700"></div>

                  {/* Sign Out Section */}
                  <button
                    onClick={onSignOut}
                    className="w-full flex items-center px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-900/20 transition-all duration-300"
                  >
                    <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Logout
                  </button>
                </div>
              </>
            ) : (
              // Unauthenticated User Menu
              <div className="py-2">
                <button
                  onClick={() => window.location.href = '/login'}
                  className="w-full flex items-center px-4 py-2 text-sm text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300"
                >
                  <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  Sign In
                </button>

                <button
                  onClick={() => window.location.href = '/login'}
                  className="w-full flex items-center px-4 py-2 text-sm text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300"
                >
                  <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                  Sign Up
                </button>
              </div>
            )}
        </div>
      )}
    </div>
  );
}