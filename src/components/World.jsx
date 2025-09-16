import { useState } from 'react'
import { Globe, MapPin, Users, Award } from 'lucide-react'

export default function World() {
  const [selectedRegion, setSelectedRegion] = useState('global')

  // Sample global wellness data
  const globalStats = {
    global: {
      totalUsers: '2.3M',
      activeToday: '156K',
      activitiesCompleted: '1.2M',
      topActivity: 'Meditation'
    },
    northAmerica: {
      totalUsers: '850K',
      activeToday: '45K',
      activitiesCompleted: '420K',
      topActivity: 'Yoga'
    },
    europe: {
      totalUsers: '680K',
      activeToday: '38K',
      activitiesCompleted: '350K',
      topActivity: 'Mindfulness'
    },
    asia: {
      totalUsers: '520K',
      activeToday: '42K',
      activitiesCompleted: '280K',
      topActivity: 'Tai Chi'
    }
  }

  const regions = [
    { id: 'global', name: 'Global', flag: '🌍', color: 'bg-blue-500' },
    { id: 'northAmerica', name: 'North America', flag: '🇺🇸', color: 'bg-red-500' },
    { id: 'europe', name: 'Europe', flag: '🇪🇺', color: 'bg-green-500' },
    { id: 'asia', name: 'Asia', flag: '🇨🇳', color: 'bg-yellow-500' }
  ]

  const currentStats = globalStats[selectedRegion]

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="text-center mb-1 flex-shrink-0">
        <div className="flex items-center justify-center gap-1 mb-0.5">
          <Globe className="w-3 h-3 text-teal-600 dark:text-teal-400" />
          <h3 className="text-sm font-semibold text-gray-800 dark:text-white">
            Global Wellness
          </h3>
        </div>
        <p className="text-xs text-gray-600 dark:text-gray-400">
          Worldwide wellness community
        </p>
      </div>

      {/* Region Selector */}
      <div className="mb-1 flex-shrink-0">
        <div className="grid grid-cols-2 gap-0.5">
          {regions.map(region => (
            <button
              key={region.id}
              onClick={() => setSelectedRegion(region.id)}
              className={`p-0.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                selectedRegion === region.id
                  ? 'bg-teal-500 text-white shadow-md'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              <div className="flex items-center gap-0.5">
                <span className="text-xs">{region.flag}</span>
                <span className="truncate text-xs">{region.name}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Stats Display */}
      <div className="flex-1 space-y-0.5 overflow-y-auto">
        {/* Total Users */}
        <div className="bg-white/50 dark:bg-gray-700/50 rounded-lg p-1">
          <div className="flex items-center gap-0.5 mb-0.5">
            <Users className="w-2.5 h-2.5 text-blue-500" />
            <h4 className="font-semibold text-gray-800 dark:text-white text-xs">Total Users</h4>
          </div>
          <div className="text-xs font-bold text-blue-600 dark:text-blue-400">
            {currentStats.totalUsers}
          </div>
        </div>

        {/* Active Today */}
        <div className="bg-white/50 dark:bg-gray-700/50 rounded-lg p-1">
          <div className="flex items-center gap-0.5 mb-0.5">
            <MapPin className="w-2.5 h-2.5 text-green-500" />
            <h4 className="font-semibold text-gray-800 dark:text-white text-xs">Active Today</h4>
          </div>
          <div className="text-xs font-bold text-green-600 dark:text-green-400">
            {currentStats.activeToday}
          </div>
        </div>

        {/* Activities Completed */}
        <div className="bg-white/50 dark:bg-gray-700/50 rounded-lg p-1">
          <div className="flex items-center gap-0.5 mb-0.5">
            <Award className="w-2.5 h-2.5 text-purple-500" />
            <h4 className="font-semibold text-gray-800 dark:text-white text-xs">Activities</h4>
          </div>
          <div className="text-xs font-bold text-purple-600 dark:text-purple-400">
            {currentStats.activitiesCompleted}
          </div>
        </div>

        {/* Top Activity */}
        <div className="bg-white/50 dark:bg-gray-700/50 rounded-lg p-1">
          <div className="text-center">
            <h4 className="font-semibold text-gray-800 dark:text-white text-xs mb-0.5">Top Activity</h4>
            <div className="text-xs font-bold text-teal-600 dark:text-teal-400">
              {currentStats.topActivity}
            </div>
          </div>
        </div>
      </div>

      {/* Global Map Visualization */}
      <div className="mt-0.5 bg-white/50 dark:bg-gray-700/50 rounded-lg p-1 flex-shrink-0">
        <div className="text-center">
          <h4 className="font-semibold text-gray-800 dark:text-white text-xs mb-0.5">Live Activity</h4>
          <div className="relative">
            <div className="w-full h-6 bg-gradient-to-r from-teal-100 to-blue-100 dark:from-teal-900/30 dark:to-blue-900/30 rounded-lg flex items-center justify-center">
              <div className="text-xs">🌍</div>
            </div>
            <div className="absolute top-0.5 right-0.5 w-1 h-1 bg-green-500 rounded-full animate-pulse"></div>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            Real-time global wellness activity
          </p>
        </div>
      </div>
    </div>
  )
}
