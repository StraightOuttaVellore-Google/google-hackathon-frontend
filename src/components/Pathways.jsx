import { useState, useEffect } from 'react'
import { Star, Trophy, Target, Zap, Heart, Brain, Shield, Flame } from 'lucide-react'
import { getUserPathways } from '../utils/voiceJournalApi'
import { useTheme } from '../contexts/ThemeContext'

export default function Pathways() {
  const { theme } = useTheme()
  const [registeredPathways, setRegisteredPathways] = useState([])
  const [selectedPathIndex, setSelectedPathIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  // Icon mapping for pathway types
  const iconMap = {
    'mindfulness': Brain,
    'stress_management': Shield,
    'self_care': Heart,
    'study_techniques': Target,
    'time_management': Zap,
    'fitness': Flame,
    'default': Star
  }

  // Color mapping for pathway types
  const colorMap = {
    'mindfulness': { color: 'from-purple-500 to-pink-500', hue: '#a855f7' },
    'stress_management': { color: 'from-sky-500 to-cyan-500', hue: '#0ea5e9' },
    'self_care': { color: 'from-green-500 to-teal-500', hue: '#22c55e' },
    'study_techniques': { color: 'from-indigo-500 to-purple-500', hue: '#6366f1' },
    'time_management': { color: 'from-orange-500 to-red-500', hue: '#f97316' },
    'fitness': { color: 'from-fuchsia-500 to-rose-500', hue: '#d946ef' },
    'default': { color: 'from-purple-500 to-pink-500', hue: '#a855f7' }
  }

  // Mock pathways - always available for demo
  const mockPathways = [
    {
      pathway_id: 'mock-mindfulness',
      name: 'Mindfulness Journey',
      pathway_name: 'Mindfulness Journey',
      pathway_type: 'mindfulness',
      description: 'Daily mindfulness practices for mental clarity',
      duration_days: 21,
      status: 'IN_PROGRESS',
      progress_percentage: 45,
      icon: iconMap.mindfulness,
      ...colorMap.mindfulness,
      level: 3,
      steps: 6,
      isMock: true
    },
    {
      pathway_id: 'mock-stress',
      name: 'Stress Management',
      pathway_name: 'Stress Management',
      pathway_type: 'stress_management',
      description: 'Learn effective techniques to manage daily stress',
      duration_days: 14,
      status: 'REGISTERED',
      progress_percentage: 15,
      icon: iconMap.stress_management,
      ...colorMap.stress_management,
      level: 1,
      steps: 6,
      isMock: true
    }
  ]

  // Fetch registered pathways
  useEffect(() => {
    const fetchPathways = async () => {
      try {
        setIsLoading(true)
        const response = await getUserPathways()
        const paths = response.pathways || []
        
        // Filter for REGISTERED or IN_PROGRESS pathways
        const activePathways = paths.filter(p => 
          p.status === 'REGISTERED' || p.status === 'IN_PROGRESS'
        )
        
        // Map to include icon and color
        const mappedPathways = activePathways.map(p => ({
          ...p,
          name: p.pathway_name,
          icon: iconMap[p.pathway_type] || iconMap.default,
          ...(colorMap[p.pathway_type] || colorMap.default),
          progress: p.progress_percentage || 0,
          level: Math.floor((p.progress_percentage || 0) / 17) + 1, // 6 levels
          steps: 6
        }))
        
        // Combine mock pathways with real ones (mock first for demo)
        const allPathways = [...mockPathways, ...mappedPathways]
        setRegisteredPathways(allPathways)
      } catch (error) {
        console.error('Failed to fetch pathways:', error)
        // On error, just show mock pathways
        setRegisteredPathways(mockPathways)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPathways()
  }, [])

  // Show loading state
  if (isLoading) {
    return (
      <div className="h-full flex flex-col items-center justify-center">
        <div className="neumorphic-card rounded-2xl p-6 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-4 border-purple-500/20 border-t-purple-500 mx-auto mb-3"></div>
          <p className="text-sm dark:text-gray-400 light:text-gray-600">Loading pathways...</p>
        </div>
      </div>
    )
  }

  // Function to remove emojis from text
  const removeEmojis = (text) => {
    if (!text) return text
    // Remove emojis using regex
    return text.replace(/[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu, '').trim()
  }

  // Get current pathway
  const currentPath = registeredPathways[selectedPathIndex]
  const Icon = currentPath.icon
  const totalSteps = currentPath.steps || 6
  const clampedLevel = Math.min(Math.max(currentPath.level || 1, 1), totalSteps)
  const levelPercent = ((clampedLevel - 1) / (totalSteps - 1)) * 100

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="text-center mb-1 flex-shrink-0">
        <div className="flex items-center justify-center gap-1 mb-0.5">
          <Trophy className="w-3 h-3 text-teal-600 dark:text-teal-400" />
          <h3 className="text-sm font-semibold text-gray-800 dark:text-white">
            Wellness Pathways
          </h3>
        </div>
        <p className="text-xs text-gray-600 dark:text-gray-400">
          {registeredPathways.length} active pathway{registeredPathways.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Pathway Buttons (Neumorphic) */}
      {registeredPathways.length > 1 && (
        <div className="mb-2 flex-shrink-0">
          <div className="grid grid-cols-3 gap-1">
            {registeredPathways.slice(0, 6).map((path, idx) => {
              const PathIcon = path.icon
              const selected = selectedPathIndex === idx
              return (
                <button
                  key={path.pathway_id || idx}
                  onClick={() => setSelectedPathIndex(idx)}
                  className={`neuro-surface-inset rounded-2xl p-2.5 text-xs transition-all duration-200 border ${
                    selected
                      ? 'border-white/20 shadow-[inset_2px_2px_4px_rgba(0,0,0,0.6),inset_-2px_-2px_4px_rgba(255,255,255,0.06)]'
                      : 'border-white/10 hover:shadow-[inset_1px_1px_2px_rgba(0,0,0,0.6),inset_-1px_-1px_2px_rgba(255,255,255,0.06)]'
                  }`}
                >
                  <div className="flex items-center gap-1">
                    <div className={`w-5 h-5 rounded-lg bg-gradient-to-r ${theme === 'light' ? 'from-[#74C8A3] to-[#38B2A3]' : path.color} flex items-center justify-center text-white`}>
                      <PathIcon className="w-3 h-3" />
                    </div>
                    <span className="truncate text-[11px] font-medium">{removeEmojis(path.name)}</span>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* Tube Progress with Level Marker */}
      <div className="relative flex-1 min-h-0 flex items-center justify-center">
        <div className="w-full px-2">
          <div className="relative h-4 rounded-full bg-black/30 dark:bg-black/30 light:bg-[rgba(116,200,163,0.15)] border border-white/10 dark:border-white/10 light:border-[rgba(116,200,163,0.3)] shadow-inner">
            {/* Tube fill */}
            <div
              className={`absolute left-0 top-0 h-full rounded-full bg-gradient-to-r ${theme === 'light' ? 'from-[#74C8A3] to-[#38B2A3]' : currentPath.color}`}
              style={{ 
                width: `${levelPercent}%`,
                ...(theme === 'light' && {
                  background: 'linear-gradient(90deg, #74C8A3 0%, #38B2A3 50%, #5FA88E 100%)',
                  boxShadow: '0 0 8px rgba(116, 200, 163, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                })
              }}
            />

            {/* Step markers */}
            <div className="absolute inset-0 flex items-center justify-between px-1">
              {Array.from({ length: totalSteps }).map((_, idx) => {
                const isActive = idx + 1 <= clampedLevel
                const isCurrent = idx + 1 === clampedLevel
                return (
                  <div key={idx} className="relative">
                    <div
                      className={`w-3 h-3 rounded-full border ${
                        isActive
                          ? 'bg-white/90 dark:bg-white/90 light:bg-[#74C8A3] border-white/80 dark:border-white/80 light:border-[#38B2A3]'
                          : 'bg-white/20 dark:bg-white/20 light:bg-[rgba(116,200,163,0.3)] border-white/30 dark:border-white/30 light:border-[rgba(116,200,163,0.5)]'
                      }`}
                    />
                    {isCurrent && (
                      <div className="absolute -inset-1 rounded-full ring-2 ring-cyan-400/60 dark:ring-cyan-400/60 light:ring-[#74C8A3]/70 animate-pulse" />
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          <div className="mt-2 text-center text-[11px] text-gray-400 dark:text-gray-400 light:text-gray-600">
            <div className="inline-flex items-center gap-1">
              <div className={`w-4 h-4 rounded-md bg-gradient-to-r ${theme === 'light' ? 'from-[#74C8A3] to-[#38B2A3]' : currentPath.color} flex items-center justify-center text-white`}>
                <Icon className="w-3 h-3" />
              </div>
              <span className="font-medium text-gray-200 dark:text-gray-200 light:text-[#25323B]">Level {clampedLevel}</span>
              <span className="text-gray-400 dark:text-gray-400 light:text-gray-500">/ {totalSteps}</span>
            </div>
            <div className="text-[10px] text-gray-500 dark:text-gray-500 light:text-gray-600 mt-1">
              {removeEmojis(currentPath.name)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
