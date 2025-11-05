import { useState, useRef, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useTheme } from '../contexts/ThemeContext'
import ProfileOverlay from './ProfileOverlay'

export default function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const dropdownRef = useRef(null)
  const navigate = useNavigate()
  const location = useLocation()
  const { user, signOut } = useAuth()
  const { isDarkMode } = useTheme()
  
  // Check if we're on landing page
  const isLandingPage = location.pathname === '/' || location.pathname === '/landing'
  
  // Get user initial - prefer username, fallback to email
  const getUserInitial = () => {
    if (!user) return 'U'
    if (user.username) return user.username.charAt(0).toUpperCase()
    if (user.email) return user.email.charAt(0).toUpperCase()
    if (user.name) return user.name.charAt(0).toUpperCase()
    return 'U'
  }
  
  // Determine text color based on theme and page
  const getTextColor = () => {
    if (isLandingPage || isDarkMode) {
      return 'text-white'
    }
    // Light mode - black text
    return 'text-black'
  }
  
  // Determine avatar background based on theme
  const getAvatarBg = () => {
    if (isLandingPage || isDarkMode) {
      return 'bg-black border border-white/30'
    }
    // Light mode - aurora green
    return 'bg-[#74C8A3] border border-[#74C8A3]/30'
  }
  
  // Determine dropdown menu background and text colors
  const getDropdownStyles = () => {
    if (isLandingPage || isDarkMode) {
      return {
        background: '#000000',
        textColor: 'text-white',
        borderColor: 'border-white/20',
        hoverBg: 'hover:bg-white/10',
        dividerColor: 'border-gray-700'
      }
    }
    // Light mode - aurora green background with black text
    return {
      background: '#74C8A3',
      textColor: 'text-black',
      borderColor: 'border-[#74C8A3]/40',
      hoverBg: 'hover:bg-[#74C8A3]/80',
      dividerColor: 'border-black/20'
    }
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSignOut = async () => {
    try {
      await signOut()
      navigate('/')
      setIsOpen(false)
    } catch (error) {
      console.error('Sign out error:', error)
    }
  }

  const handleProfile = () => {
    setIsOpen(false)
    setIsProfileOpen(true)
  }

  const handleSettings = () => {
    // Navigate to settings page or show settings modal
    console.log('Settings clicked')
    setIsOpen(false)
  }

  // Don't return null - show sign in options when not authenticated

  return (
    <div className="relative" ref={dropdownRef}>
      {/* User Avatar Button - Theme-aware */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center space-x-1 md:space-x-2 p-1 md:p-2 rounded-full hover:bg-white/10 transition-all duration-300 ${getTextColor()}`}
      >
        {user ? (
          <div className={`w-7 h-7 md:w-8 md:h-8 ${getAvatarBg()} rounded-full flex items-center justify-center font-medium text-xs md:text-sm ${getTextColor()}`}>
            {getUserInitial()}
          </div>
        ) : (
          <div className={`w-7 h-7 md:w-8 md:h-8 ${isLandingPage || isDarkMode ? 'bg-gray-600' : 'bg-[#74C8A3]/20'} rounded-full flex items-center justify-center border ${isLandingPage || isDarkMode ? 'border-white/30' : 'border-[#74C8A3]/30'}`}>
            <svg className={`w-3.5 h-3.5 md:w-4 md:h-4 ${isLandingPage || isDarkMode ? 'text-white' : 'text-black'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        )}
        <svg
          className={`w-3.5 h-3.5 md:w-4 md:h-4 text-white transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu - Theme-aware */}
      {isOpen && (() => {
        const dropdownStyles = getDropdownStyles()
        return (
          <div 
            className={`absolute right-0 mt-2 w-64 rounded-lg shadow-xl border ${dropdownStyles.borderColor} z-50 overflow-hidden`}
            style={{ background: dropdownStyles.background }}
          >
            {user ? (
              // Authenticated User Menu
              <>
                {/* User Info Header */}
                <div className={`px-4 py-3 border-b ${dropdownStyles.dividerColor}`}>
                  <p className={`text-sm font-medium ${dropdownStyles.textColor}`}>
                    {user.username || user.email || 'User'}
                  </p>
                  <p className={`text-xs ${isLandingPage || isDarkMode ? 'text-gray-400' : 'text-black/70'}`}>
                    Free Plan
                  </p>
                </div>

                {/* Menu Items */}
                <div className="py-2">
                  <button
                    onClick={handleProfile}
                    className={`w-full flex items-center px-4 py-2 text-sm ${dropdownStyles.textColor} ${dropdownStyles.textColor === 'text-white' ? 'hover:text-white hover:bg-white/10' : 'hover:text-black hover:bg-black/10'} transition-all duration-300`}
                  >
                    <svg className={`w-4 h-4 mr-3 ${dropdownStyles.textColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Profile
                  </button>

                  <button
                    onClick={handleSettings}
                    className={`w-full flex items-center px-4 py-2 text-sm ${dropdownStyles.textColor} ${dropdownStyles.textColor === 'text-white' ? 'hover:text-white hover:bg-white/10' : 'hover:text-black hover:bg-black/10'} transition-all duration-300`}
                  >
                    <svg className={`w-4 h-4 mr-3 ${dropdownStyles.textColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Settings
                  </button>

                  {/* Divider */}
                  <div className={`my-1 border-t ${dropdownStyles.dividerColor}`}></div>

                  {/* Sign Out Section */}
                  <button
                    onClick={handleSignOut}
                    className={`w-full flex items-center px-4 py-2 text-sm ${isLandingPage || isDarkMode ? 'text-red-400 hover:text-red-300 hover:bg-red-900/20' : 'text-red-600 hover:text-red-700 hover:bg-red-100/50'} transition-all duration-300`}
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
                  onClick={() => {
                    navigate('/login')
                    setIsOpen(false)
                  }}
                  className={`w-full flex items-center px-4 py-2 text-sm ${dropdownStyles.textColor} ${dropdownStyles.textColor === 'text-white' ? 'hover:text-white hover:bg-white/10' : 'hover:text-black hover:bg-black/10'} transition-all duration-300`}
                >
                  <svg className={`w-4 h-4 mr-3 ${dropdownStyles.textColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  Sign In
                </button>

                <button
                  onClick={() => {
                    navigate('/login')
                    setIsOpen(false)
                  }}
                  className={`w-full flex items-center px-4 py-2 text-sm ${dropdownStyles.textColor} ${dropdownStyles.textColor === 'text-white' ? 'hover:text-white hover:bg-white/10' : 'hover:text-black hover:bg-black/10'} transition-all duration-300`}
                >
                  <svg className={`w-4 h-4 mr-3 ${dropdownStyles.textColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                  Sign Up
                </button>
              </div>
            )}
          </div>
        )
      })()}

      {/* Profile Overlay */}
      <ProfileOverlay
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        user={user}
      />
    </div>
  )
}