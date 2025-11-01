import { useState } from 'react'
import { Send, X } from 'lucide-react'
import { redditApi } from '../../utils/redditApi'

export default function CommentForm({ postId, parentId, onCommentCreated, onCancel }) {
  const [content, setContent] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!content.trim()) {
      setError('Comment cannot be empty')
      return
    }

    try {
      setSubmitting(true)
      setError(null)
      
      await redditApi.createComment(postId, {
        content: content.trim(),
        parent_id: parentId || null,
      })
      
      setContent('')
      
      if (onCommentCreated) {
        onCommentCreated()
      }
    } catch (err) {
      console.error('Error creating comment:', err)
      setError('Failed to create comment. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="neuro-surface-inset rounded-xl p-4 mb-3">
      {error && (
        <div className="mb-3 p-2 neuro-surface-inset border border-red-500/30 rounded-xl text-red-400 text-xs">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="flex gap-3">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={parentId ? "Write a reply..." : "Write a comment..."}
            rows={3}
            className="flex-1 neuro-input px-4 py-3 rounded-xl text-sm resize-none"
            required
          />
          <div className="flex flex-col gap-2">
            <button
              type="submit"
              disabled={submitting || !content.trim()}
              className="neuro-button-primary px-4 py-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {submitting ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <Send className="w-4 h-4" />
              )}
            </button>
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                disabled={submitting}
                className="neuro-button px-4 py-3 rounded-xl disabled:opacity-50"
              >
                <X className="w-4 h-4 neuro-text-primary" />
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  )
}
