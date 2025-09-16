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
      bgColor: 'bg-purple-100 dark:bg-purple-900/30',
      borderColor: 'border-purple-300 dark:border-purple-600',
      progress: 75,
      level: 3,
      xp: 750,
      nextLevelXp: 1000,
      achievements: [
        { id: 1, name: 'First Meditation', description: 'Complete your first meditation session', completed: true, xp: 50 },
        { id: 2, name: '7-Day Streak', description: 'Meditate for 7 consecutive days', completed: true, xp: 100 },
        { id: 3, name: 'Mindful Moments', description: 'Practice mindfulness 50 times', completed: true, xp: 150 },
        { id: 4, name: 'Zen Master', description: 'Complete 100 meditation sessions', completed: false, xp: 200 },
        { id: 5, name: 'Deep Focus', description: 'Complete a 60-minute meditation', completed: false, xp: 250 }
      ]
    },
    fitness: {
      name: 'Fitness Warrior',
      icon: Zap,
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-100 dark:bg-orange-900/30',
      borderColor: 'border-orange-300 dark:border-orange-600',
      progress: 60,
      level: 2,
      xp: 600,
      nextLevelXp: 800,
      achievements: [
        { id: 1, name: 'First Workout', description: 'Complete your first workout', completed: true, xp: 50 },
        { id: 2, name: 'Cardio King', description: 'Complete 20 cardio sessions', completed: true, xp: 100 },
        { id: 3, name: 'Strength Builder', description: 'Complete 30 strength training sessions', completed: false, xp: 150 },
        { id: 4, name: 'Marathon Runner', description: 'Run 100 miles total', completed: false, xp: 200 },
        { id: 5, name: 'Iron Warrior', description: 'Complete 100 workouts', completed: false, xp: 250 }
      ]
    },
    nutrition: {
      name: 'Nutrition Ninja',
      icon: Heart,
      color: 'from-green-500 to-teal-500',
      bgColor: 'bg-green-100 dark:bg-green-900/30',
      borderColor: 'border-green-300 dark:border-green-600',
      progress: 40,
      level: 2,
      xp: 400,
      nextLevelXp: 600,
      achievements: [
        { id: 1, name: 'Healthy Start', description: 'Log meals for 7 days', completed: true, xp: 50 },
        { id: 2, name: 'Hydration Hero', description: 'Drink 8 glasses of water for 14 days', completed: true, xp: 100 },
        { id: 3, name: 'Veggie Lover', description: 'Eat 5 servings of vegetables for 30 days', completed: false, xp: 150 },
        { id: 4, name: 'Meal Prep Master', description: 'Meal prep for 4 weeks', completed: false, xp: 200 },
        { id: 5, name: 'Nutrition Expert', description: 'Maintain healthy eating for 90 days', completed: false, xp: 250 }
      ]
    },
    sleep: {
      name: 'Sleep Sage',
      icon: Shield,
      color: 'from-indigo-500 to-purple-500',
      bgColor: 'bg-indigo-100 dark:bg-indigo-900/30',
      borderColor: 'border-indigo-300 dark:border-indigo-600',
      progress: 85,
      level: 4,
      xp: 850,
      nextLevelXp: 1000,
      achievements: [
        { id: 1, name: 'Early Bird', description: 'Wake up before 7 AM for 7 days', completed: true, xp: 50 },
        { id: 2, name: 'Sleep Schedule', description: 'Maintain consistent sleep schedule for 14 days', completed: true, xp: 100 },
        { id: 3, name: 'Deep Sleep', description: 'Get 8+ hours of sleep for 30 days', completed: true, xp: 150 },
        { id: 4, name: 'Sleep Ritual', description: 'Follow bedtime routine for 60 days', completed: true, xp: 200 },
        { id: 5, name: 'Sleep Master', description: 'Perfect sleep score for 90 days', completed: false, xp: 250 }
      ]
    }
  }

  const currentPath = pathways[selectedPath]
  const Icon = currentPath.icon

  const getLevelColor = (level) => {
    if (level >= 5) return 'text-yellow-500'
    if (level >= 3) return 'text-purple-500'
    if (level >= 2) return 'text-blue-500'
    return 'text-gray-500'
  }

  const getLevelIcon = (level) => {
    if (level >= 5) return '👑'
    if (level >= 3) return '🏆'
    if (level >= 2) return '⭐'
    return '🌟'
  }

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

      {/* Pathway Selector */}
      <div className="mb-1 flex-shrink-0">
        <div className="grid grid-cols-2 gap-0.5">
          {Object.entries(pathways).map(([key, path]) => {
            const PathIcon = path.icon
            return (
              <button
                key={key}
                onClick={() => setSelectedPath(key)}
                className={`p-1 rounded-lg text-xs font-medium transition-all duration-200 ${
                  selectedPath === key
                    ? `${path.bgColor} ${path.borderColor} border-2 shadow-md`
                    : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                <div className="flex items-center gap-0.5">
                  <PathIcon className="w-2.5 h-2.5" />
                  <span className="truncate text-xs">{path.name}</span>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Current Pathway Progress */}
      <div className={`${currentPath.bgColor} ${currentPath.borderColor} border-2 rounded-lg p-1.5 mb-1 flex-shrink-0`}>
        <div className="flex items-center gap-1 mb-0.5">
          <div className={`p-0.5 bg-gradient-to-r ${currentPath.color} rounded-lg`}>
            <Icon className="w-2.5 h-2.5 text-white" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-gray-800 dark:text-white text-xs">
              {currentPath.name}
            </h4>
            <div className="flex items-center gap-0.5">
              <span className="text-xs text-gray-600 dark:text-gray-400">
                Level {currentPath.level}
              </span>
              <span className={`text-xs ${getLevelColor(currentPath.level)}`}>
                {getLevelIcon(currentPath.level)}
              </span>
            </div>
          </div>
        </div>

        {/* XP Progress */}
        <div className="mb-0.5">
          <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-0.5">
            <span>{currentPath.xp} XP</span>
            <span>{currentPath.nextLevelXp} XP</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-0.5">
            <div
              className={`h-0.5 bg-gradient-to-r ${currentPath.color} rounded-full transition-all duration-500`}
              style={{ width: `${(currentPath.xp / currentPath.nextLevelXp) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Progress Percentage */}
        <div className="text-center">
          <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
            {currentPath.progress}% Complete
          </span>
        </div>
      </div>

      {/* Achievements */}
      <div className="flex-1 overflow-y-auto">
        <h5 className="font-semibold text-gray-800 dark:text-white text-xs mb-0.5">
          Achievements
        </h5>
        <div className="space-y-0.5">
          {currentPath.achievements.slice(0, 3).map(achievement => (
            <div
              key={achievement.id}
              className={`p-1 rounded-lg border transition-all duration-200 ${
                achievement.completed
                  ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700'
                  : 'bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600'
              }`}
            >
              <div className="flex items-center gap-1">
                <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                  achievement.completed
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400'
                }`}>
                  {achievement.completed ? '✓' : '○'}
                </div>
                <div className="flex-1 min-w-0">
                  <h6 className={`font-medium text-xs ${
                    achievement.completed
                      ? 'text-green-800 dark:text-green-200'
                      : 'text-gray-700 dark:text-gray-300'
                  }`}>
                    {achievement.name}
                  </h6>
                  <p className={`text-xs ${
                    achievement.completed
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-gray-500 dark:text-gray-400'
                  }`}>
                    {achievement.description}
                  </p>
                </div>
                <div className="text-xs font-semibold text-teal-600 dark:text-teal-400">
                  +{achievement.xp}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
