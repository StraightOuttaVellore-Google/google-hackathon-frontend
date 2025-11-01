import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useTheme } from '../contexts/ThemeContext'
import ProfileOverlay from './ProfileOverlay'

export default function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const dropdownRef = useRef(null)
  const navigate = useNavigate()
  const { user, signOut } = useAuth()
  const { isDarkMode } = useTheme()

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
      {/* User Avatar Button - Gemini Style */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 p-2 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300"
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

      {/* Dropdown Menu - Gemini Style */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-[#1a1a1a] rounded-lg shadow-xl border border-gradient-to-r from-[#4285f4] to-[#a142f4] z-50 overflow-hidden">
          {user ? (
            // Authenticated User Menu - Gemini Style
            <>
              {/* User Info Header */}
              <div className="px-4 py-3 border-b border-gray-700">
                <p className="text-sm font-medium text-white">
                  {user.email}
                </p>
                <p className="text-xs text-gray-400">
                  Free Plan
                </p>
              </div>

              {/* Menu Items */}
              <div className="py-2">
                <button
                  onClick={handleProfile}
                  className="w-full flex items-center px-4 py-2 text-sm text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300"
                >
                  <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Profile
                </button>

                <button
                  onClick={handleSettings}
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
                  onClick={handleSignOut}
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
            // Unauthenticated User Menu - Gemini Style
            <div className="py-2">
              <button
                onClick={() => {
                  navigate('/login')
                  setIsOpen(false)
                }}
                className="w-full flex items-center px-4 py-2 text-sm text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300"
              >
                <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                Sign In
              </button>

              <button
                onClick={() => {
                  navigate('/login')
                  setIsOpen(false)
                }}
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

      {/* Profile Overlay */}
      <ProfileOverlay
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        user={user}
      />
    </div>
  )
}