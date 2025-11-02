import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ThumbsUp, ThumbsDown, MessageSquare, Clock, User, Flag } from 'lucide-react'
import { redditApi } from '../../utils/redditApi'
import CommentTree from './CommentTree'

export default function PostCard({ post, onUpdate }) {
  const navigate = useNavigate()
  const [showComments, setShowComments] = useState(false)
  const [comments, setComments] = useState([])
  const [loadingComments, setLoadingComments] = useState(false)
  const [voteLoading, setVoteLoading] = useState(false)

  const handleVote = async (voteType) => {
    if (voteLoading) return
    
    try {
      setVoteLoading(true)
      
      // If already voted with same type, remove vote
      if (post.user_vote === voteType) {
        await redditApi.removePostVote(post.id)
      } else {
        await redditApi.voteOnPost(post.id, voteType)
      }
      
      if (onUpdate) {
        onUpdate()
      }
    } catch (error) {
      console.error('Error voting:', error)
    } finally {
      setVoteLoading(false)
    }
  }

  const loadComments = async () => {
    if (comments.length > 0) {
      setShowComments(!showComments)
      return
    }

    try {
      setLoadingComments(true)
      const commentsData = await redditApi.getComments(post.id)
      setComments(commentsData)
      setShowComments(true)
    } catch (error) {
      console.error('Error loading comments:', error)
    } finally {
      setLoadingComments(false)
    }
  }

  const handleCommentCreated = () => {
    loadComments()
    if (onUpdate) {
      onUpdate()
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diff = now - date
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)

    if (minutes < 1) return 'just now'
    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    if (days < 7) return `${days}d ago`
    return date.toLocaleDateString()
  }

  return (
    <div className="neuro-surface-inset rounded-xl overflow-hidden">
      {/* Post Content */}
      <div className="p-6">
        <div className="flex items-start gap-4">
          {/* Vote Section */}
          <div className="flex flex-col items-center gap-2">
            <button
              onClick={() => handleVote(1)}
              disabled={voteLoading}
              className={`neuro-button p-2 rounded-xl transition-all ${
                post.user_vote === 1
                  ? 'text-blue-400'
                  : 'neuro-text-tertiary'
              }`}
            >
              <ThumbsUp className="w-5 h-5" />
            </button>
            <span className={`text-sm font-semibold neuro-text-primary ${
              post.score > 0 ? 'text-blue-400' : post.score < 0 ? 'text-red-400' : 'neuro-text-secondary'
            }`}>
              {post.score}
            </span>
            <button
              onClick={() => handleVote(-1)}
              disabled={voteLoading}
              className={`neuro-button p-2 rounded-xl transition-all ${
                post.user_vote === -1
                  ? 'text-red-400'
                  : 'neuro-text-tertiary'
              }`}
            >
              <ThumbsDown className="w-5 h-5" />
            </button>
          </div>

          {/* Post Details */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <span className="text-xs font-semibold text-blue-400">
                r/{post.country_name}
              </span>
              <span className="neuro-text-tertiary">•</span>
              <div className="flex items-center gap-1 text-xs neuro-text-secondary">
                <User className="w-3 h-3" />
                <span>u/{post.username}</span>
              </div>
              <span className="neuro-text-tertiary">•</span>
              <div className="flex items-center gap-1 text-xs neuro-text-secondary">
                <Clock className="w-3 h-3" />
                <span>{formatDate(post.created_at)}</span>
              </div>
            </div>

            <h2 className="text-xl font-semibold neuro-text-primary mb-3">
              {post.title}
            </h2>

            <div className="neuro-text-secondary mb-4 whitespace-pre-wrap leading-relaxed">
              {post.content}
            </div>

            {/* Media */}
            {post.media_urls && Array.isArray(post.media_urls) && post.media_urls.length > 0 && (
              <div className="mb-4">
                <div className="grid grid-cols-2 gap-2">
                  {post.media_urls.map((url, idx) => (
                    <img
                      key={idx}
                      src={url}
                      alt={`Media ${idx + 1}`}
                      className="rounded-xl max-w-full h-auto neuro-surface-inset"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center gap-4">
              <button
                onClick={loadComments}
                disabled={loadingComments}
                className="neuro-button flex items-center gap-2 px-4 py-2 rounded-xl text-sm neuro-text-secondary transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                <span>{post.comment_count} comments</span>
                {loadingComments && (
                  <div className="ml-2 w-4 h-4 border-2 border-white border-t-blue-400 rounded-full animate-spin"></div>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="border-t border-white/10 dark:border-white/10 light:border-black/10 neuro-surface-inset p-6">
          <CommentTree
            postId={post.id}
            comments={comments}
            onCommentCreated={handleCommentCreated}
          />
        </div>
      )}
    </div>
  )
}
