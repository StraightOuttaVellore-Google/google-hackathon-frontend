import { useState } from 'react'
import { Users, MessageCircle, Heart, Share2 } from 'lucide-react'

export default function Community() {
  const [activeTab, setActiveTab] = useState('feed')

  // Sample community data
  const communityPosts = [
    {
      id: 1,
      user: 'Sarah M.',
      avatar: '👩‍🦰',
      time: '2h ago',
      content: 'Just completed a 30-minute meditation session! Feeling so much more centered and focused. 🧘‍♀️',
      likes: 12,
      comments: 3,
      type: 'achievement'
    },
    {
      id: 2,
      user: 'Mike R.',
      avatar: '👨‍💼',
      time: '4h ago',
      content: 'Morning yoga flow was exactly what I needed. Starting the day with intention and gratitude. 🙏',
      likes: 8,
      comments: 1,
      type: 'activity'
    },
    {
      id: 3,
      user: 'Emma L.',
      avatar: '👩‍🎨',
      time: '6h ago',
      content: 'Sharing my wellness journey progress - 2 weeks of consistent morning routines! 💪',
      likes: 15,
      comments: 5,
      type: 'milestone'
    }
  ]

  const getTypeColor = (type) => {
    const colors = {
      achievement: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
      activity: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
      milestone: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300'
    }
    return colors[type] || 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300'
  }

  const getTypeIcon = (type) => {
    const icons = {
      achievement: '🏆',
      activity: '🏃‍♀️',
      milestone: '🎯'
    }
    return icons[type] || '📝'
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="text-center mb-1 flex-shrink-0">
        <div className="flex items-center justify-center gap-1 mb-0.5">
          <Users className="w-3 h-3 text-teal-600 dark:text-teal-400" />
          <h3 className="text-sm font-semibold text-gray-800 dark:text-white">
            Community
          </h3>
        </div>
        <p className="text-xs text-gray-600 dark:text-gray-400">
          Connect with wellness enthusiasts
        </p>
      </div>

      {/* Tabs */}
      <div className="flex mb-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-0.5 flex-shrink-0">
        <button
          onClick={() => setActiveTab('feed')}
          className={`flex-1 py-0.5 px-1 text-xs font-medium rounded-md transition-all duration-200 ${
            activeTab === 'feed'
              ? 'bg-white dark:bg-gray-600 text-teal-600 dark:text-teal-400 shadow-sm'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
          }`}
        >
          Feed
        </button>
        <button
          onClick={() => setActiveTab('challenges')}
          className={`flex-1 py-0.5 px-1 text-xs font-medium rounded-md transition-all duration-200 ${
            activeTab === 'challenges'
              ? 'bg-white dark:bg-gray-600 text-teal-600 dark:text-teal-400 shadow-sm'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
          }`}
        >
          Challenges
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'feed' ? (
          <div className="space-y-0.5">
            {communityPosts.slice(0, 4).map(post => (
              <div key={post.id} className="bg-white/50 dark:bg-gray-700/50 rounded-lg p-1.5 hover:shadow-md transition-all duration-200">
                {/* Post Header */}
                <div className="flex items-center gap-1 mb-0.5">
                  <div className="w-4 h-4 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center text-white text-xs">
                    {post.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-800 dark:text-white truncate text-xs">
                      {post.user}
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {post.time}
                    </p>
                  </div>
                  <span className={`px-1 py-0.5 rounded-full text-xs font-medium ${getTypeColor(post.type)}`}>
                    {getTypeIcon(post.type)}
                  </span>
                </div>

                {/* Post Content */}
                <p className="text-gray-700 dark:text-gray-300 text-xs mb-0.5 leading-relaxed line-clamp-1">
                  {post.content}
                </p>

                {/* Post Actions */}
                <div className="flex items-center gap-1">
                  <button className="flex items-center gap-0.5 text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 transition-colors">
                    <Heart className="w-2.5 h-2.5" />
                    <span className="text-xs">{post.likes}</span>
                  </button>
                  <button className="flex items-center gap-0.5 text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400 transition-colors">
                    <MessageCircle className="w-2.5 h-2.5" />
                    <span className="text-xs">{post.comments}</span>
                  </button>
                  <button className="flex items-center gap-0.5 text-gray-500 hover:text-green-500 dark:text-gray-400 dark:hover:text-green-400 transition-colors">
                    <Share2 className="w-2.5 h-2.5" />
                    <span className="text-xs">Share</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-0.5">
            <div className="bg-white/50 dark:bg-gray-700/50 rounded-lg p-1.5 text-center">
              <div className="text-sm mb-0.5">🏆</div>
              <h4 className="font-semibold text-gray-800 dark:text-white mb-0.5 text-xs">
                7-Day Wellness Challenge
              </h4>
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-0.5">
                Complete daily wellness activities for 7 days
              </p>
              <button className="w-full py-0.5 px-1 bg-teal-500 hover:bg-teal-600 text-white rounded-lg transition-colors text-xs">
                Join Challenge
              </button>
            </div>

            <div className="bg-white/50 dark:bg-gray-700/50 rounded-lg p-1.5 text-center">
              <div className="text-sm mb-0.5">🧘‍♀️</div>
              <h4 className="font-semibold text-gray-800 dark:text-white mb-0.5 text-xs">
                Meditation Mastery
              </h4>
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-0.5">
                Build a consistent meditation practice
              </p>
              <button className="w-full py-0.5 px-1 bg-teal-500 hover:bg-teal-600 text-white rounded-lg transition-colors text-xs">
                Join Challenge
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
