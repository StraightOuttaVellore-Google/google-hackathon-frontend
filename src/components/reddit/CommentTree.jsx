import { useState } from 'react'
import { ThumbsUp, ThumbsDown, Reply, Clock, User } from 'lucide-react'
import { redditApi } from '../../utils/redditApi'
import CommentForm from './CommentForm'

export default function CommentTree({ postId, comments, onCommentCreated }) {
  const [replyTo, setReplyTo] = useState(null)
  const [voteLoading, setVoteLoading] = useState({})

  const handleVote = async (commentId, voteType, currentVote) => {
    if (voteLoading[commentId]) return
    
    try {
      setVoteLoading({ ...voteLoading, [commentId]: true })
      
      // If already voted with same type, remove vote
      if (currentVote === voteType) {
        await redditApi.removeCommentVote(commentId)
      } else {
        await redditApi.voteOnComment(commentId, voteType)
      }
      
      if (onCommentCreated) {
        onCommentCreated()
      }
    } catch (error) {
      console.error('Error voting:', error)
    } finally {
      setVoteLoading({ ...voteLoading, [commentId]: false })
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

  // Build comment tree structure
  const buildCommentTree = (comments) => {
    const commentMap = new Map()
    const rootComments = []

    // First pass: create map of all comments
    comments.forEach(comment => {
      commentMap.set(comment.id, { ...comment, replies: [] })
    })

    // Second pass: build tree structure
    comments.forEach(comment => {
      const commentNode = commentMap.get(comment.id)
      if (comment.parent_id) {
        const parent = commentMap.get(comment.parent_id)
        if (parent) {
          parent.replies.push(commentNode)
        } else {
          rootComments.push(commentNode)
        }
      } else {
        rootComments.push(commentNode)
      }
    })

    return rootComments
  }

  const renderComment = (comment, depth = 0) => {
    const isReply = depth > 0
    const maxDepth = 5
    const shouldContinue = depth < maxDepth

    return (
      <div key={comment.id} className={isReply ? 'ml-6 border-l-2 border-white/10 dark:border-white/10 light:border-black/10 pl-4' : ''}>
        <div className="neuro-surface-inset rounded-xl p-4 mb-3">
          <div className="flex items-start gap-3">
            {/* Vote Section */}
            <div className="flex flex-col items-center gap-1">
              <button
                onClick={() => handleVote(comment.id, 1, comment.user_vote)}
                disabled={voteLoading[comment.id]}
                className={`neuro-button p-1.5 rounded-xl transition-all ${
                  comment.user_vote === 1
                    ? 'text-blue-400'
                    : 'neuro-text-tertiary'
                }`}
              >
                <ThumbsUp className="w-4 h-4" />
              </button>
              <span className={`text-xs font-semibold neuro-text-primary ${
                comment.score > 0 ? 'text-blue-400' : comment.score < 0 ? 'text-red-400' : 'neuro-text-secondary'
              }`}>
                {comment.score}
              </span>
              <button
                onClick={() => handleVote(comment.id, -1, comment.user_vote)}
                disabled={voteLoading[comment.id]}
                className={`neuro-button p-1.5 rounded-xl transition-all ${
                  comment.user_vote === -1
                    ? 'text-red-400'
                    : 'neuro-text-tertiary'
                }`}
              >
                <ThumbsDown className="w-4 h-4" />
              </button>
            </div>

            {/* Comment Content */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center gap-1 text-xs neuro-text-secondary">
                  <User className="w-3 h-3" />
                  <span>u/{comment.username}</span>
                </div>
                <span className="neuro-text-tertiary">•</span>
                <div className="flex items-center gap-1 text-xs neuro-text-secondary">
                  <Clock className="w-3 h-3" />
                  <span>{formatDate(comment.created_at)}</span>
                </div>
              </div>

              <div className="neuro-text-secondary mb-3 whitespace-pre-wrap leading-relaxed">
                {comment.content}
              </div>

              {shouldContinue && (
                <button
                  onClick={() => setReplyTo(comment.id)}
                  className="neuro-button flex items-center gap-1 text-xs neuro-text-secondary hover:text-blue-400 transition-colors px-3 py-1.5 rounded-xl"
                >
                  <Reply className="w-3 h-3" />
                  Reply
                </button>
              )}

              {/* Reply Form */}
              {replyTo === comment.id && (
                <div className="mt-3">
                  <CommentForm
                    postId={postId}
                    parentId={comment.id}
                    onCommentCreated={() => {
                      setReplyTo(null)
                      if (onCommentCreated) {
                        onCommentCreated()
                      }
                    }}
                    onCancel={() => setReplyTo(null)}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Render Replies */}
        {comment.replies && comment.replies.length > 0 && (
          <div className="ml-4">
            {comment.replies.map(reply => renderComment(reply, depth + 1))}
          </div>
        )}
      </div>
    )
  }

  const commentTree = buildCommentTree(comments)

  return (
    <div>
      {/* Top-level comment form */}
      <div className="mb-4">
        <CommentForm
          postId={postId}
          onCommentCreated={() => {
            if (onCommentCreated) {
              onCommentCreated()
            }
          }}
        />
      </div>

      {/* Comments */}
      {commentTree.length === 0 ? (
        <p className="neuro-text-tertiary text-sm text-center py-4">
          No comments yet. Be the first to comment!
        </p>
      ) : (
        <div className="space-y-2">
          {commentTree.map(comment => renderComment(comment))}
        </div>
      )}
    </div>
  )
}
