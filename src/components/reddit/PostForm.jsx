import { useState } from 'react'
import { X, Send } from 'lucide-react'
import { redditApi } from '../../utils/redditApi'

export default function PostForm({ isoCode, countryName, onPostCreated, onCancel }) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!title.trim() || !content.trim()) {
      setError('Title and content are required')
      return
    }

    try {
      setSubmitting(true)
      setError(null)
      
      await redditApi.createPost(isoCode, {
        title: title.trim(),
        content: content.trim(),
      })
      
      setTitle('')
      setContent('')
      
      if (onPostCreated) {
        onPostCreated()
      }
    } catch (err) {
      console.error('Error creating post:', err)
      setError('Failed to create post. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="neuro-surface-inset rounded-xl overflow-hidden">
      <div className="p-4 border-b border-white/10 flex items-center justify-between">
        <h3 className="text-lg font-semibold neuro-text-primary">
          Create Post in r/{countryName}
        </h3>
        {onCancel && (
          <button
            onClick={onCancel}
            className="neuro-button p-2 rounded-xl"
          >
            <X className="w-5 h-5 neuro-text-primary" />
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="p-6">
        {error && (
          <div className="mb-4 p-3 neuro-surface-inset border border-red-500/30 rounded-xl text-red-400 text-sm">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium neuro-text-secondary mb-2">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Post title..."
            maxLength={300}
            className="neuro-input w-full px-4 py-3 rounded-xl"
            required
          />
          <p className="mt-2 text-xs neuro-text-tertiary">
            {title.length}/300 characters
          </p>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium neuro-text-secondary mb-2">
            Content
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your post content here..."
            rows={6}
            className="neuro-input w-full px-4 py-3 rounded-xl resize-none"
            required
          />
        </div>

        <div className="flex items-center justify-end gap-3">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              disabled={submitting}
              className="neuro-button px-6 py-2 rounded-xl disabled:opacity-50"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            disabled={submitting || !title.trim() || !content.trim()}
            className="neuro-button-primary flex items-center gap-2 px-6 py-2 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Posting...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Post
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
