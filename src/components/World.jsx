import { useState } from 'react'
import { createPortal } from 'react-dom'
import { Globe as GlobeIcon, MapPin, Users, Award, Maximize2, X } from 'lucide-react'
import GlobalWellnessGlobe from './GlobalWellnessGlobe'

export default function World() {
  const [selectedRegion, setSelectedRegion] = useState('Global')
  const [showOverlay, setShowOverlay] = useState(false)
  const [hovering, setHovering] = useState(false)

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
          className="fixed inset-0 flex items-center justify-center animate-fadeIn"
          style={{ 
            background: '#000000',
            zIndex: 999999,
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            position: 'fixed'
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowOverlay(false)
          }}
        >
          <div className="relative w-[85vw] h-[85vh] max-w-5xl neumorphic-overlay-card p-6" style={{ zIndex: 1000000 }}>
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold neuro-text-primary mb-1">Global Wellness Network</h2>
                <p className="text-sm neuro-text-tertiary">
                  {selectedRegion ? `Selected: ${selectedRegion}` : 'Select a region to explore'}
                </p>
              </div>
              <button
                onClick={() => setShowOverlay(false)}
                className="neumorphic-close-button"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Region Pills */}
            <div className="flex flex-wrap gap-2 mb-6">
              {regions.map((region) => (
                <button
                  key={region.name}
                  onClick={() => setSelectedRegion(region.name)}
                  className={`px-4 py-2 text-xs font-medium transition-all duration-500 flex items-center gap-2 ${
                    selectedRegion === region.name
                      ? 'neumorphic-button-selected'
                      : 'neumorphic-button'
                  }`}
                >
                  <span className="text-base">{region.icon}</span>
                  {region.name}
                </button>
              ))}
            </div>

            {/* Large Interactive Globe */}
            <div className="flex items-center justify-center mb-6">
              <GlobalWellnessGlobe 
                isOverlay={true}
                selectedRegion={selectedRegion}
                onRegionChange={setSelectedRegion}
              />
            </div>

            {/* Stats for selected region */}
            <div className="grid grid-cols-3 gap-4">
              <div className="neuro-surface-inset rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-4 h-4 text-blue-400" />
                  <h4 className="font-semibold neuro-text-primary text-sm">Total Users</h4>
                </div>
                <div className="text-xl font-bold text-blue-400">
                  {currentStats.totalUsers}
                </div>
              </div>
              <div className="neuro-surface-inset rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-green-400" />
                  <h4 className="font-semibold neuro-text-primary text-sm">Active Today</h4>
                </div>
                <div className="text-xl font-bold text-green-400">
                  {currentStats.activeToday}
                </div>
              </div>
              <div className="neuro-surface-inset rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="w-4 h-4 text-cyan-400" />
                  <h4 className="font-semibold neuro-text-primary text-sm">Top Activity</h4>
                </div>
                <div className="text-xl font-bold text-cyan-400">
                  {currentStats.topActivity}
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
