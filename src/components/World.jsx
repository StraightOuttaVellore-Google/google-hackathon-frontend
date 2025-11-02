import { useState } from 'react'
import { createPortal } from 'react-dom'
import { useNavigate } from 'react-router-dom'
import { Globe as GlobeIcon, MapPin, Users, Award, Maximize2, X, MessageSquare } from 'lucide-react'
import GlobalWellnessGlobe from './GlobalWellnessGlobe'

export default function World() {
  const navigate = useNavigate()
  const [selectedRegion, setSelectedRegion] = useState('Global')
  const [showOverlay, setShowOverlay] = useState(false)
  const [hovering, setHovering] = useState(false)

  // Popular countries for Reddit navigation
  const countries = [
    { isoCode: 'US', name: 'United States', flag: '🇺🇸' },
    { isoCode: 'IN', name: 'India', flag: '🇮🇳' },
    { isoCode: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
    { isoCode: 'CA', name: 'Canada', flag: '🇨🇦' },
    { isoCode: 'AU', name: 'Australia', flag: '🇦🇺' },
    { isoCode: 'DE', name: 'Germany', flag: '🇩🇪' },
    { isoCode: 'FR', name: 'France', flag: '🇫🇷' },
    { isoCode: 'JP', name: 'Japan', flag: '🇯🇵' },
    { isoCode: 'BR', name: 'Brazil', flag: '🇧🇷' },
    { isoCode: 'CN', name: 'China', flag: '🇨🇳' },
    { isoCode: 'MX', name: 'Mexico', flag: '🇲🇽' },
    { isoCode: 'IT', name: 'Italy', flag: '🇮🇹' },
  ]

  const handleCountryClick = (isoCode) => {
    navigate(`/reddit/${isoCode}`)
    setShowOverlay(false)
  }

  // Sample global wellness data
  const globalStats = {
    'Global': {
      totalUsers: '2.3M',
      activeToday: '156K',
      topActivity: 'Meditation'
    },
    'North America': {
      totalUsers: '850K',
      activeToday: '45K',
      topActivity: 'Yoga'
    },
    'Europe': {
      totalUsers: '680K',
      activeToday: '38K',
      topActivity: 'Mindfulness'
    },
    'Asia': {
      totalUsers: '520K',
      activeToday: '42K',
      topActivity: 'Tai Chi'
    },
    'Africa': {
      totalUsers: '280K',
      activeToday: '18K',
      topActivity: 'Dance'
    },
    'Oceania': {
      totalUsers: '120K',
      activeToday: '8K',
      topActivity: 'Surfing'
    }
  }

  const currentStats = globalStats[selectedRegion] || globalStats['Global']

  // Map country names to ISO codes for globe interaction
  const countryNameToIso = {
    'United States of America': 'US',
    'United States': 'US',
    'India': 'IN',
    'United Kingdom': 'GB',
    'Canada': 'CA',
    'Australia': 'AU',
    'Germany': 'DE',
    'France': 'FR',
    'Japan': 'JP',
    'Brazil': 'BR',
    'China': 'CN',
    'Mexico': 'MX',
    'Italy': 'IT'
  }
  
  const regions = [
    { name: 'Global', icon: '🌍' },
    { name: 'North America', icon: '🌎' },
    { name: 'Europe', icon: '🌍' },
    { name: 'Asia', icon: '🌏' },
    { name: 'Africa', icon: '🌍' },
    { name: 'Oceania', icon: '🌏' }
  ]

  return (
    <>
      <div className="h-full flex flex-col relative overflow-hidden" style={{ background: 'transparent', boxShadow: 'none', border: 'none', padding: 0 }}>
      {/* Header */}
        <div className="text-center mb-3 flex-shrink-0 px-4 pt-2">
          <div className="flex items-center justify-center gap-2 mb-1">
            <GlobeIcon className="w-4 h-4 neuro-text-primary" />
            <h3 className="text-sm font-semibold neuro-text-primary">
            Global Wellness
          </h3>
        </div>
          <p className="text-xs neuro-text-tertiary">
            {selectedRegion}
        </p>
      </div>

        {/* Rotating Globe */}
        <div 
          className="relative flex-shrink-0 mx-auto mb-3"
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
        >
          <div onClick={() => setShowOverlay(true)}>
            <GlobalWellnessGlobe 
              isOverlay={false}
              selectedRegion={selectedRegion}
              onRegionChange={setSelectedRegion}
            />
          </div>
          
          {/* Expand button overlay */}
          {hovering && (
            <div 
              className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 bg-black/40 rounded-full animate-fadeIn z-10 pointer-events-none"
            >
              <div className="neumorphic-button-selected p-3 rounded-full">
                <Maximize2 className="w-5 h-5 text-white" />
              </div>
            </div>
          )}
        </div>

      {/* Stats Display */}
        <div className="flex-1 overflow-y-auto px-4 pb-2 space-y-2">
        {/* Total Users */}
          <div className="neuro-surface-inset rounded-xl p-2.5">
            <div className="flex items-center gap-1.5 mb-1">
              <Users className="w-3.5 h-3.5 text-blue-400" />
              <h4 className="font-semibold neuro-text-primary text-xs">Total Users</h4>
          </div>
            <div className="text-sm font-bold text-blue-400">
            {currentStats.totalUsers}
          </div>
        </div>

        {/* Active Today */}
          <div className="neuro-surface-inset rounded-xl p-2.5">
            <div className="flex items-center gap-1.5 mb-1">
              <MapPin className="w-3.5 h-3.5 text-green-400" />
              <h4 className="font-semibold neuro-text-primary text-xs">Active Today</h4>
          </div>
            <div className="text-sm font-bold text-green-400">
            {currentStats.activeToday}
          </div>
        </div>

          {/* Top Activity */}
          <div className="neuro-surface-inset rounded-xl p-2.5">
            <div className="flex items-center gap-1.5 mb-1">
              <Award className="w-3.5 h-3.5 text-cyan-400" />
              <h4 className="font-semibold neuro-text-primary text-xs">Top Activity</h4>
          </div>
            <div className="text-sm font-bold text-cyan-400">
              {currentStats.topActivity}
            </div>
          </div>
        </div>

        {/* Footer - Live indicator */}
        <div className="flex-shrink-0 px-4 pb-2 pt-2">
          <div className="neuro-surface-inset rounded-lg p-2 flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-xs neuro-text-tertiary">Live Activity</span>
          </div>
        </div>
      </div>

      {/* Interactive Globe Overlay - Using Portal */}
      {showOverlay && createPortal(
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fadeIn"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowOverlay(false)
          }}
        >
          <div 
            className="neumorphic-timer-card-container max-w-5xl w-full h-[85vh] overflow-hidden rounded-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Fixed Header */}
            <div className="flex-shrink-0 flex items-center justify-between p-6 bg-black/20 calendar-header">
              <div>
                <h2 className="text-2xl font-bold text-white dark:text-white light:text-black mb-1">
                  Global Wellness Network
                </h2>
                <p className="text-white/80 dark:text-white/80 light:text-black/80 text-sm">
                  {selectedRegion ? `Selected: ${selectedRegion}` : 'Select a region to explore'}
                </p>
              </div>
              <button
                onClick={() => setShowOverlay(false)}
                className="neumorphic-matrix-close-button"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 min-h-0 overflow-y-auto p-6 neumorphic-scrollbar">
              {/* Country Pills - Replace region buttons with country buttons */}
              <div className="flex flex-wrap gap-2 mb-6">
                {countries.map((country) => (
                  <button
                    key={country.isoCode}
                    onClick={() => handleCountryClick(country.isoCode)}
                    className="neumorphic-button px-4 py-2 text-xs font-medium transition-all duration-500 flex items-center gap-2 hover:neumorphic-button-selected"
                  >
                    <span className="text-base">{country.flag}</span>
                    {country.name}
                  </button>
                ))}
              </div>

              {/* Large Interactive Globe */}
              <div className="flex items-center justify-center mb-6">
                <GlobalWellnessGlobe 
                  isOverlay={true}
                  selectedRegion={selectedRegion}
                  onRegionChange={setSelectedRegion}
                  countries={countries}
                  countryNameToIso={countryNameToIso}
                  onCountryClick={handleCountryClick}
                />
              </div>

              {/* Stats for selected region */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="neumorphic-matrix-card rounded-xl p-4 task-item">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-4 h-4 text-blue-400 dark:text-blue-400 light:text-blue-600" />
                    <h4 className="font-semibold text-white dark:text-white light:text-black text-sm">Total Users</h4>
                  </div>
                  <div className="text-xl font-bold text-blue-400 dark:text-blue-400 light:text-blue-600">
                    {currentStats.totalUsers}
                  </div>
                </div>
                <div className="neumorphic-matrix-card rounded-xl p-4 task-item">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-4 h-4 text-green-400 dark:text-green-400 light:text-green-600" />
                    <h4 className="font-semibold text-white dark:text-white light:text-black text-sm">Active Today</h4>
                  </div>
                  <div className="text-xl font-bold text-green-400 dark:text-green-400 light:text-green-600">
                    {currentStats.activeToday}
                  </div>
                </div>
                <div className="neumorphic-matrix-card rounded-xl p-4 task-item">
                  <div className="flex items-center gap-2 mb-2">
                    <Award className="w-4 h-4 text-cyan-400 dark:text-cyan-400 light:text-cyan-600" />
                    <h4 className="font-semibold text-white dark:text-white light:text-black text-sm">Top Activity</h4>
                  </div>
                  <div className="text-xl font-bold text-cyan-400 dark:text-cyan-400 light:text-cyan-600">
                    {currentStats.topActivity}
                  </div>
                </div>
              </div>

              {/* Country Reddit Communities */}
              <div className="border-t border-white/10 dark:border-white/10 light:border-black/10 pt-6 pb-4">
                <div className="flex items-center gap-2 mb-4">
                  <MessageSquare className="w-5 h-5 text-white dark:text-white light:text-black" />
                  <h3 className="text-lg font-semibold text-white dark:text-white light:text-black">
                    Country Communities
                  </h3>
                </div>
                <p className="text-sm text-white/80 dark:text-white/80 light:text-black/80 mb-4">
                  Click on a country to open its Reddit community page
                </p>
                <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                  {countries.map((country) => (
                    <button
                      key={country.isoCode}
                      onClick={() => handleCountryClick(country.isoCode)}
                      className="neumorphic-matrix-card flex flex-col items-center gap-2 p-3 rounded-xl hover:neumorphic-matrix-card-blue transition-all duration-200 group task-item"
                    >
                      <span className="text-3xl group-hover:scale-110 transition-transform">
                        {country.flag}
                      </span>
                      <span className="text-xs font-medium text-white dark:text-white light:text-black text-center">
                        {country.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  )
}
