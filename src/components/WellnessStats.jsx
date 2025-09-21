import { useState, useEffect } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { 
    HeartIcon, 
    FireIcon, 
    ChartBarIcon, 
    FaceSmileIcon,
    SpeakerWaveIcon 
} from '@heroicons/react/24/solid'

export default function WellnessStats() {
  const [currentCard, setCurrentCard] = useState(0)
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  // Sample wellness stats - in production this would come from API
  useEffect(() => {
    const sampleStats = {
      wellnessOverview: {
        totalActivities: 24,
        wellnessStreak: 7,
        averageDailyActivities: 3.4,
        totalWellnessDays: 15
      },
      emotionalTrends: {
        dominantEmotion: 'BALANCED',
        emotionalScore: 8.2,
        emotionDistribution: {
          ENERGIZED: 5,
          BALANCED: 8,
          RELAXED: 6,
          STRESSED: 2,
          MOTIVATED: 3
        }
      },
      activityMetrics: {
        completionRate: 85,
        activitiesCompleted: 20,
        activitiesCreated: 24
      },
      wellnessInsights: {
        totalSessions: 15,
        averageSessionTime: 25,
        wellnessEfficiency: 90
      },
      environment: {
        mostUsedSound: 'forest',
        ambientPercentage: 75
      }
    }
    
    // Simulate loading
    setTimeout(() => {
      setStats(sampleStats)
      setLoading(false)
    }, 500)
  }, [])

  const statsCards = [
    {
      id: 'wellness-overview',
      title: 'Wellness Overview',
      icon: <HeartIcon className="w-6 h-6 text-pink-500" />,
      render: () => (
        <div className="space-y-3 w-full">
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center">
              <div className="text-xl font-bold text-pink-600 dark:text-pink-400">
                {stats?.wellnessOverview.totalActivities}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                Total Activities
              </div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-green-600 dark:text-green-400">
                {stats?.wellnessOverview.wellnessStreak}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                Day Streak
              </div>
            </div>
          </div>
          <div className="text-center">
            <div className="text-base font-semibold text-gray-700 dark:text-gray-300">
              {stats?.wellnessOverview.averageDailyActivities} avg/day
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Across {stats?.wellnessOverview.totalWellnessDays} active days
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'emotional-journey',
      title: 'Emotional Journey',
      icon: <FaceSmileIcon className="w-6 h-6 text-yellow-500" />,
      render: () => (
        <div className="space-y-3 w-full">
          <div className="text-center">
            <div className="text-2xl mb-1">
              {stats?.emotionalTrends.dominantEmotion === 'ENERGIZED' ? '⚡' : 
               stats?.emotionalTrends.dominantEmotion === 'BALANCED' ? '😌' : 
               stats?.emotionalTrends.dominantEmotion === 'RELAXED' ? '🧘' : 
               stats?.emotionalTrends.dominantEmotion === 'STRESSED' ? '😰' : 
               stats?.emotionalTrends.dominantEmotion === 'MOTIVATED' ? '💪' : '😴'}
            </div>
            <div className="text-base font-semibold text-gray-700 dark:text-gray-300">
              Mostly {stats?.emotionalTrends.dominantEmotion.toLowerCase()}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Emotional Score: {stats?.emotionalTrends.emotionalScore}/10
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div>
              <div className="text-base">⚡</div>
              <div className="text-gray-600 dark:text-gray-400">
                {stats?.emotionalTrends.emotionDistribution.ENERGIZED}
              </div>
            </div>
            <div>
              <div className="text-base">😌</div>
              <div className="text-gray-600 dark:text-gray-400">
                {stats?.emotionalTrends.emotionDistribution.BALANCED}
              </div>
            </div>
            <div>
              <div className="text-base">🧘</div>
              <div className="text-gray-600 dark:text-gray-400">
                {stats?.emotionalTrends.emotionDistribution.RELAXED}
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'activity-metrics',
      title: 'Activity Metrics',
      icon: <ChartBarIcon className="w-6 h-6 text-green-500" />,
      render: () => (
        <div className="space-y-3 w-full">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">
              {stats?.activityMetrics.completionRate}%
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              Activity Completion Rate
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 text-center">
            <div>
              <div className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                {stats?.activityMetrics.activitiesCompleted}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Completed
              </div>
            </div>
            <div>
              <div className="text-lg font-semibold text-gray-600 dark:text-gray-400">
                {stats?.activityMetrics.activitiesCreated}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Created
              </div>
            </div>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
            <div 
              className="bg-green-500 h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${stats?.activityMetrics.completionRate}%` }}
            ></div>
          </div>
        </div>
      )
    },
    {
      id: 'wellness-insights',
      title: 'Wellness Insights',
      icon: <FireIcon className="w-6 h-6 text-orange-500" />,
      render: () => (
        <div className="space-y-3 w-full">
          <div className="text-center">
            <div className="text-xl font-bold text-orange-600 dark:text-orange-400 mb-1">
              {stats?.wellnessInsights.totalSessions}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              Wellness Sessions
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 text-center">
            <div>
              <div className="text-base font-semibold text-gray-700 dark:text-gray-300">
                {stats?.wellnessInsights.averageSessionTime}m
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Avg Session Time
              </div>
            </div>
            <div>
              <div className="text-base font-semibold text-gray-700 dark:text-gray-300">
                {stats?.wellnessInsights.wellnessEfficiency}%
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Wellness Efficiency
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'environment',
      title: 'Environment',
      icon: <SpeakerWaveIcon className="w-6 h-6 text-purple-500" />,
      render: () => (
        <div className="space-y-3 w-full">
          <div className="text-center">
            <div className="text-xl mb-1">🌲</div>
            <div className="text-base font-semibold text-gray-700 dark:text-gray-300 capitalize">
              {stats?.environment.mostUsedSound.toLowerCase()}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Most Used Sound
            </div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
              {stats?.environment.ambientPercentage}%
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              Prefer Ambient Sounds
            </div>
          </div>
        </div>
      )
    }
  ]

  const nextCard = () => {
    setCurrentCard((prev) => (prev + 1) % statsCards.length)
  }

  const prevCard = () => {
    setCurrentCard((prev) => (prev - 1 + statsCards.length) % statsCards.length)
  }

  if (loading) {
    return (
      <div className="w-full h-72 flex flex-col">
        <h1 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">Wellness Stats</h1>
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-pulse text-gray-500 dark:text-gray-400">
            Loading statistics...
          </div>
        </div>
      </div>
    )
  }

  const currentCardData = statsCards[currentCard]

  return (
    <div className="w-full h-72 flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <h1 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Wellness Stats</h1>
        
        {/* Navigation */}
        <div className="flex items-center space-x-2">
          <button
            onClick={prevCard}
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Previous stat"
          >
            <ChevronLeftIcon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          </button>
          
          <div className="flex space-x-1">
            {statsCards.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentCard 
                    ? 'bg-teal-500' 
                    : 'bg-gray-300 dark:bg-gray-600'
                }`}
              />
            ))}
          </div>
          
          <button
            onClick={nextCard}
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Next stat"
          >
            <ChevronRightIcon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          </button>
        </div>
      </div>

      {/* Current Card Header */}
      <div className="flex items-center space-x-2 mb-4">
        {currentCardData.icon}
        <span className="font-semibold text-gray-800 dark:text-gray-200">
          {currentCardData.title}
        </span>
      </div>

      {/* Card Content */}
      <div className="flex-1 flex items-center justify-center">
        {currentCardData.render()}
      </div>
    </div>
  )
}