import { useState } from 'react'
import { Star, Trophy, Target, Zap, Heart, Brain, Shield, Flame } from 'lucide-react'

export default function Pathways() {
  const [selectedPath, setSelectedPath] = useState('mindfulness')

  // Sample pathways data
  const pathways = {
    mindfulness: {
      name: 'Mindfulness Master',
      icon: Brain,
      color: 'from-purple-500 to-pink-500',
      hue: '#a855f7',
      progress: 75,
      level: 3,
      steps: 6,
    },
    fitness: {
      name: 'Fitness Warrior',
      icon: Zap,
      color: 'from-orange-500 to-red-500',
      hue: '#f97316',
      progress: 60,
      level: 2,
      steps: 6,
    },
    nutrition: {
      name: 'Nutrition Ninja',
      icon: Heart,
      color: 'from-green-500 to-teal-500',
      hue: '#22c55e',
      progress: 40,
      level: 2,
      steps: 6,
    },
    sleep: {
      name: 'Sleep Sage',
      icon: Shield,
      color: 'from-indigo-500 to-purple-500',
      hue: '#6366f1',
      progress: 85,
      level: 4,
      steps: 6,
    },
    resilience: {
      name: 'Resilience Ranger',
      icon: Shield,
      color: 'from-sky-500 to-cyan-500',
      hue: '#0ea5e9',
      progress: 30,
      level: 1,
      steps: 6,
    },
    creativity: {
      name: 'Creativity Spark',
      icon: Star,
      color: 'from-fuchsia-500 to-rose-500',
      hue: '#d946ef',
      progress: 50,
      level: 2,
      steps: 6,
    },
  }

  const currentPath = pathways[selectedPath]
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
          Gamified wellness journey
        </p>
      </div>

      {/* Pathway Buttons (Neumorphic) */}
      <div className="mb-2 flex-shrink-0">
        <div className="grid grid-cols-3 gap-1">
          {Object.entries(pathways).map(([key, path]) => {
            const PathIcon = path.icon
            const selected = selectedPath === key
            return (
              <button
                key={key}
                onClick={() => setSelectedPath(key)}
                className={`neuro-surface-inset rounded-2xl p-2.5 text-xs transition-all duration-200 border ${
                  selected
                    ? 'border-white/20 shadow-[inset_2px_2px_4px_rgba(0,0,0,0.6),inset_-2px_-2px_4px_rgba(255,255,255,0.06)]'
                    : 'border-white/10 hover:shadow-[inset_1px_1px_2px_rgba(0,0,0,0.6),inset_-1px_-1px_2px_rgba(255,255,255,0.06)]'
                }`}
              >
                <div className="flex items-center gap-1">
                  <div className={`w-5 h-5 rounded-lg bg-gradient-to-r ${path.color} flex items-center justify-center text-white`}>
                    <PathIcon className="w-3 h-3" />
                  </div>
                  <span className="truncate text-[11px] font-medium">{path.name}</span>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Tube Progress with Level Marker */}
      <div className="relative flex-1 min-h-0 flex items-center justify-center">
        <div className="w-full px-2">
          <div className="relative h-4 rounded-full bg-black/30 border border-white/10 shadow-inner">
            {/* Tube fill */}
            <div
              className={`absolute left-0 top-0 h-full rounded-full bg-gradient-to-r ${currentPath.color}`}
              style={{ width: `${levelPercent}%` }}
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
                          ? 'bg-white/90 border-white/80'
                          : 'bg-white/20 border-white/30'
                      }`}
                    />
                    {isCurrent && (
                      <div className="absolute -inset-1 rounded-full ring-2 ring-cyan-400/60 animate-pulse" />
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          <div className="mt-2 text-center text-[11px] text-gray-400">
            <div className="inline-flex items-center gap-1">
              <div className={`w-4 h-4 rounded-md bg-gradient-to-r ${currentPath.color} flex items-center justify-center text-white`}>
                <Icon className="w-3 h-3" />
              </div>
              <span className="font-medium text-gray-200">Level {clampedLevel}</span>
              <span className="text-gray-400">/ {totalSteps}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
