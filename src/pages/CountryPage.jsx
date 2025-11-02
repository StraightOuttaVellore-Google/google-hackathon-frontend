import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, MessageSquare, TrendingUp, Clock, Flame, ThumbsUp, ThumbsDown, Plus, Send } from 'lucide-react'
import { redditApi } from '../utils/redditApi'
import PostCard from '../components/reddit/PostCard'
import PostForm from '../components/reddit/PostForm'

export default function CountryPage() {
  const { isoCode } = useParams()
  const navigate = useNavigate()
  const [country, setCountry] = useState(null)
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [sort, setSort] = useState('hot')
  const [showPostForm, setShowPostForm] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadCountryData()
  }, [isoCode, sort])

  const loadCountryData = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const [countryData, postsData] = await Promise.all([
        redditApi.getCountry(isoCode),
        redditApi.getPosts(isoCode, { sort, limit: 50 })
      ])
      
      setCountry(countryData)
      setPosts(postsData)
    } catch (err) {
      console.error('Error loading country data:', err)
      setError('Failed to load country data. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handlePostCreated = () => {
    setShowPostForm(false)
    loadCountryData()
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black dark:bg-black light:bg-[var(--bg)]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white dark:border-white light:border-black mx-auto mb-4"></div>
          <p className="neuro-text-secondary">Loading...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black dark:bg-black light:bg-[var(--bg)]">
        <div className="text-center neuro-surface-inset p-8 rounded-xl">
          <p className="neuro-text-primary mb-4 text-red-400 dark:text-red-400 light:text-red-600">{error}</p>
          <button
            onClick={() => navigate('/app')}
            className="neuro-button-primary px-6 py-2 rounded-xl"
          >
            Go Back
          </button>
        </div>
      </div>
    )
  }

  if (!country) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black dark:bg-black light:bg-[var(--bg)]">
        <div className="text-center neuro-surface-inset p-8 rounded-xl">
          <p className="neuro-text-secondary mb-4">Country not found</p>
          <button
            onClick={() => navigate('/app')}
            className="neuro-button-primary px-6 py-2 rounded-xl"
          >
            Go Back
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black dark:bg-black light:bg-[var(--bg)]">
      {/* Header */}
      <div className="neuro-surface-inset border-b border-white/10 dark:border-white/10 light:border-black/10 sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Logo */}
              <button
                onClick={() => navigate('/')}
                className="flex items-center gap-2 hover:opacity-80 transition-opacity"
              >
                <img 
                  src="/images/16f6e1ea-b24f-4aa3-826c-1d847809b91a-removebg-preview.png" 
                  alt="Sahayata Logo" 
                  className="h-12 w-12 object-contain"
                />
              </button>
              <button
                onClick={() => navigate('/app')}
                className="neuro-button p-2 rounded-xl"
              >
                <ArrowLeft className="w-5 h-5 neuro-text-primary" />
              </button>
              <div className="flex items-center gap-3">
                <span className="text-3xl">{country.flag_emoji || '🌍'}</span>
                <div>
                  <h1 className="text-xl font-bold neuro-text-primary">
                    r/{country.name}
                  </h1>
                  <p className="text-sm neuro-text-secondary">
                    {country.description || 'Country community'}
                  </p>
                </div>
              </div>
            </div>
            <button
              onClick={() => setShowPostForm(true)}
              className="neuro-button-primary flex items-center gap-2 px-6 py-2 rounded-xl"
            >
              <Plus className="w-4 h-4" />
              Create Post
            </button>
          </div>

          {/* Sort Options */}
          <div className="flex items-center gap-2 mt-4">
            <button
              onClick={() => setSort('hot')}
              className={`neuro-button px-4 py-2 rounded-xl text-sm transition-all ${
                sort === 'hot'
                  ? 'neuro-button-primary'
                  : ''
              }`}
            >
              <Flame className="w-4 h-4 inline mr-1" />
              Hot
            </button>
            <button
              onClick={() => setSort('new')}
              className={`neuro-button px-4 py-2 rounded-xl text-sm transition-all ${
                sort === 'new'
                  ? 'neuro-button-primary'
                  : ''
              }`}
            >
              <Clock className="w-4 h-4 inline mr-1" />
              New
            </button>
            <button
              onClick={() => setSort('top')}
              className={`neuro-button px-4 py-2 rounded-xl text-sm transition-all ${
                sort === 'top'
                  ? 'neuro-button-primary'
                  : ''
              }`}
            >
              <TrendingUp className="w-4 h-4 inline mr-1" />
              Top
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-6">
        {showPostForm && (
          <div className="mb-6">
            <PostForm
              isoCode={isoCode}
              countryName={country.name}
              onPostCreated={handlePostCreated}
              onCancel={() => setShowPostForm(false)}
            />
          </div>
        )}

        {posts.length === 0 ? (
          <div className="text-center py-12 neuro-surface-inset rounded-xl p-8">
            <MessageSquare className="w-12 h-12 neuro-text-tertiary mx-auto mb-4" />
            <p className="neuro-text-secondary mb-4">
              No posts yet. Be the first to post!
            </p>
            <button
              onClick={() => setShowPostForm(true)}
              className="neuro-button-primary px-6 py-2 rounded-xl"
            >
              Create First Post
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onUpdate={loadCountryData}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
