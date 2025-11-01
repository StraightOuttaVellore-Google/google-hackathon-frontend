import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { X, User, Mail, Calendar, Crown, Award, Clock, Shield, CreditCard } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'

export default function ProfileOverlay({ isOpen, onClose, user }) {
  const { theme, isBlackMode, isDarkMode } = useTheme()
  const [lastLogin, setLastLogin] = useState(null)
  const [memberSince, setMemberSince] = useState(null)

  useEffect(() => {
    if (isOpen && user) {
      // Get last login from localStorage (previous session's last login)
      const storedLastLogin = localStorage.getItem('last_login')
      if (storedLastLogin) {
        setLastLogin(new Date(storedLastLogin))
      } else {
        // If no previous login, set to current time
        const now = new Date()
        setLastLogin(now)
        localStorage.setItem('last_login', now.toISOString())
      }

      // Get member since date or set current date (only set once)
      const storedMemberSince = localStorage.getItem('member_since')
      if (storedMemberSince) {
        setMemberSince(new Date(storedMemberSince))
      } else {
        const now = new Date()
        setMemberSince(now)
        localStorage.setItem('member_since', now.toISOString())
      }
    }
  }, [isOpen, user])

  // Update last login when overlay closes
  useEffect(() => {
    if (!isOpen && user) {
      const now = new Date()
      localStorage.setItem('last_login', now.toISOString())
    }
  }, [isOpen, user])

  const formatDate = (date) => {
    if (!date) return 'N/A'
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getDaysSince = (date) => {
    if (!date) return 0
    const diff = new Date() - new Date(date)
    return Math.floor(diff / (1000 * 60 * 60 * 24))
  }

  if (!isOpen) return null

  // Membership details - you can customize this
  const membershipTier = user?.membership_tier || 'Free'
  const membershipStatus = user?.membership_status || 'Active'
  const membershipExpiry = user?.membership_expiry || null

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return createPortal(
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 backdrop-blur-sm transition-all ${
          isBlackMode 
            ? 'bg-black/70' 
            : isDarkMode 
            ? 'bg-black/60' 
            : 'bg-black/40'
        }`}
      ></div>
      
      {/* Modal */}
      <div className={`relative w-full max-w-2xl max-h-[90vh] rounded-2xl overflow-hidden animate-fadeIn ${
        isBlackMode
          ? 'neumorphic-overlay-card'
          : isDarkMode
          ? 'neumorphic-overlay-card'
          : 'neuro-surface-elevated'
      }`}>
        {/* Stars Background for Dark/Black modes */}
        {(isDarkMode || isBlackMode) && (
          <>
            {[...Array(15)].map((_, i) => (
              <div
                key={`profile-star-${i}`}
                className="absolute animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${Math.random() * 1 + 0.5}px`,
                  height: `${Math.random() * 1 + 0.5}px`,
                  background: 'rgba(200, 220, 255, 0.6)',
                  borderRadius: '50%',
                  boxShadow: '0 0 3px rgba(150, 180, 255, 0.4)',
                  animationDelay: `${Math.random() * 4}s`,
                  animationDuration: `${Math.random() * 3 + 2}s`,
                  zIndex: 1
                }}
              />
            ))}
          </>
        )}

        {/* Header */}
        <div className={`relative z-10 flex items-center justify-between p-6 border-b ${
          isBlackMode || isDarkMode
            ? 'border-white/10'
            : 'border-black/10'
        }`}>
          <div>
            <h2 className={`text-2xl font-bold ${
              isBlackMode || isDarkMode
                ? 'neuro-text-primary'
                : 'text-black'
            }`}>
              Profile
            </h2>
            <p className={`text-sm mt-1 ${
              isBlackMode || isDarkMode
                ? 'neuro-text-secondary'
                : 'text-gray-600'
            }`}>
              Your account details and membership information
            </p>
          </div>
          <button
            onClick={onClose}
            className={`neumorphic-close-button ${
              isBlackMode || isDarkMode
                ? ''
                : 'light'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className={`relative z-10 p-6 overflow-y-auto neumorphic-scrollbar-compact max-h-[calc(90vh-120px)] ${
          isBlackMode || isDarkMode
            ? 'bg-transparent'
            : 'bg-transparent'
        }`}>
          {/* Profile Avatar & Basic Info */}
          <div className={`flex items-center gap-6 mb-8 pb-6 border-b ${
            isBlackMode || isDarkMode
              ? 'border-white/10'
              : 'border-black/10'
          }`}>
            <div className={`w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold ${
              isBlackMode || isDarkMode
                ? 'bg-gradient-to-br from-[#4285f4] to-[#a142f4] text-white'
                : 'bg-gradient-to-br from-[#4285f4] to-[#a142f4] text-white'
            }`}>
              {user?.username?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className="flex-1">
              <h3 className={`text-xl font-semibold mb-1 ${
                isBlackMode || isDarkMode
                  ? 'neuro-text-primary'
                  : 'text-black'
              }`}>
                {user?.username || 'User'}
              </h3>
              <div className={`flex items-center gap-2 text-sm ${
                isBlackMode || isDarkMode
                  ? 'neuro-text-secondary'
                  : 'text-gray-600'
              }`}>
                <Mail className="w-4 h-4" />
                <span>{user?.email || 'No email'}</span>
              </div>
            </div>
          </div>

          {/* Account Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* Last Login */}
            <div className={`neuro-surface-inset rounded-xl p-4 ${
              isBlackMode || isDarkMode
                ? ''
                : 'light'
            }`}>
              <div className="flex items-center gap-3 mb-2">
                <Clock className={`w-5 h-5 ${
                  isBlackMode || isDarkMode
                    ? 'neuro-text-tertiary'
                    : 'text-gray-500'
                }`} />
                <h4 className={`font-semibold ${
                  isBlackMode || isDarkMode
                    ? 'neuro-text-primary'
                    : 'text-black'
                }`}>
                  Last Login
                </h4>
              </div>
              <p className={`text-sm ${
                isBlackMode || isDarkMode
                  ? 'neuro-text-secondary'
                  : 'text-gray-700'
              }`}>
                {lastLogin ? formatDate(lastLogin) : 'N/A'}
              </p>
              {lastLogin && (
                <p className={`text-xs mt-1 ${
                  isBlackMode || isDarkMode
                    ? 'neuro-text-tertiary'
                    : 'text-gray-500'
                }`}>
                  {getDaysSince(lastLogin) === 0 ? 'Today' : `${getDaysSince(lastLogin)} days ago`}
                </p>
              )}
            </div>

            {/* Member Since */}
            <div className={`neuro-surface-inset rounded-xl p-4 ${
              isBlackMode || isDarkMode
                ? ''
                : 'light'
            }`}>
              <div className="flex items-center gap-3 mb-2">
                <Calendar className={`w-5 h-5 ${
                  isBlackMode || isDarkMode
                    ? 'neuro-text-tertiary'
                    : 'text-gray-500'
                }`} />
                <h4 className={`font-semibold ${
                  isBlackMode || isDarkMode
                    ? 'neuro-text-primary'
                    : 'text-black'
                }`}>
                  Member Since
                </h4>
              </div>
              <p className={`text-sm ${
                isBlackMode || isDarkMode
                  ? 'neuro-text-secondary'
                  : 'text-gray-700'
              }`}>
                {memberSince ? formatDate(memberSince) : 'N/A'}
              </p>
              {memberSince && (
                <p className={`text-xs mt-1 ${
                  isBlackMode || isDarkMode
                    ? 'neuro-text-tertiary'
                    : 'text-gray-500'
                }`}>
                  {getDaysSince(memberSince)} days ago
                </p>
              )}
            </div>
          </div>

          {/* Membership Section */}
          <div className={`neuro-surface-inset rounded-xl p-6 mb-6 ${
            isBlackMode || isDarkMode
              ? ''
              : 'light'
          }`}>
            <div className="flex items-center gap-3 mb-4">
              <Crown className={`w-6 h-6 ${
                membershipTier === 'Premium' || membershipTier === 'Pro'
                  ? 'text-yellow-400'
                  : isBlackMode || isDarkMode
                  ? 'neuro-text-tertiary'
                  : 'text-gray-500'
              }`} />
              <h4 className={`text-lg font-semibold ${
                isBlackMode || isDarkMode
                  ? 'neuro-text-primary'
                  : 'text-black'
              }`}>
                Membership Details
              </h4>
            </div>

            <div className="space-y-4">
              {/* Membership Tier */}
              <div className="flex items-center justify-between">
                <span className={`text-sm ${
                  isBlackMode || isDarkMode
                    ? 'neuro-text-secondary'
                    : 'text-gray-700'
                }`}>
                  Membership Tier
                </span>
                <span className={`px-3 py-1 rounded-lg text-sm font-semibold ${
                  membershipTier === 'Premium' || membershipTier === 'Pro'
                    ? 'bg-yellow-400/20 text-yellow-400'
                    : 'bg-blue-400/20 text-blue-400'
                }`}>
                  {membershipTier}
                </span>
              </div>

              {/* Membership Status */}
              <div className="flex items-center justify-between">
                <span className={`text-sm ${
                  isBlackMode || isDarkMode
                    ? 'neuro-text-secondary'
                    : 'text-gray-700'
                }`}>
                  Status
                </span>
                <span className={`px-3 py-1 rounded-lg text-sm font-semibold ${
                  membershipStatus === 'Active'
                    ? 'bg-green-400/20 text-green-400'
                    : 'bg-red-400/20 text-red-400'
                }`}>
                  {membershipStatus}
                </span>
              </div>

              {/* Membership Benefits */}
              <div className="mt-4 pt-4 border-t border-white/10">
                <p className={`text-xs mb-2 ${
                  isBlackMode || isDarkMode
                    ? 'neuro-text-tertiary'
                    : 'text-gray-500'
                }`}>
                  Membership Benefits:
                </p>
                <ul className={`space-y-2 text-sm ${
                  isBlackMode || isDarkMode
                    ? 'neuro-text-secondary'
                    : 'text-gray-700'
                }`}>
                  <li className="flex items-center gap-2">
                    <Award className="w-4 h-4" />
                    <span>Full access to all features</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    <span>Priority support</span>
                  </li>
                  {membershipTier === 'Premium' || membershipTier === 'Pro' ? (
                    <>
                      <li className="flex items-center gap-2">
                        <CreditCard className="w-4 h-4" />
                        <span>Advanced analytics</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Crown className="w-4 h-4 text-yellow-400" />
                        <span>Exclusive content access</span>
                      </li>
                    </>
                  ) : null}
                </ul>
              </div>
            </div>
          </div>

          {/* Account Statistics */}
          <div className={`neuro-surface-inset rounded-xl p-6 ${
            isBlackMode || isDarkMode
              ? ''
              : 'light'
          }`}>
            <h4 className={`text-lg font-semibold mb-4 ${
              isBlackMode || isDarkMode
                ? 'neuro-text-primary'
                : 'text-black'
            }`}>
              Account Statistics
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className={`text-xs mb-1 ${
                  isBlackMode || isDarkMode
                    ? 'neuro-text-tertiary'
                    : 'text-gray-500'
                }`}>
                  Total Activities
                </p>
                <p className={`text-2xl font-bold ${
                  isBlackMode || isDarkMode
                    ? 'neuro-text-primary'
                    : 'text-black'
                }`}>
                  {user?.total_activities || Math.floor(Math.random() * 100) + 10}
                </p>
              </div>
              <div>
                <p className={`text-xs mb-1 ${
                  isBlackMode || isDarkMode
                    ? 'neuro-text-tertiary'
                    : 'text-gray-500'
                }`}>
                  Account Age
                </p>
                <p className={`text-2xl font-bold ${
                  isBlackMode || isDarkMode
                    ? 'neuro-text-primary'
                    : 'text-black'
                }`}>
                  {memberSince ? `${getDaysSince(memberSince)}d` : '0d'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}

