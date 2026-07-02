'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'
import { createClient } from '@/lib/supabase'

export default function CommentSection({ postId }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    if (!name.trim() || !email.trim() || !content.trim()) {
      toast.error('Please fill in all fields')
      return
    }
    setLoading(true)
    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ post_id: postId, author_name: name, author_email: email, content }),
      })
      if (res.ok) {
        toast.success('Comment submitted! It will appear after review.')
        setName('')
        setEmail('')
        setContent('')
      } else {
        const data = await res.json()
        toast.error(data.error || 'Failed to submit comment')
      }
    } catch {
      toast.error('Something went wrong')
    }
    setLoading(false)
  }

  return (
    <div className="mt-12 border-t border-ink/10 pt-10">
      <h3 className="font-serif text-2xl text-plum mb-6">Leave a Comment</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="comment-name" className="block text-sm font-medium text-ink mb-1">Name *</label>
            <input
              id="comment-name"
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              className="w-full px-4 py-2.5 rounded-xl border border-ink/15 bg-white text-sm focus:ring-2 focus:ring-plum focus:border-plum outline-none transition-all"
            />
          </div>
          <div>
            <label htmlFor="comment-email" className="block text-sm font-medium text-ink mb-1">Email *</label>
            <input
              id="comment-email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2.5 rounded-xl border border-ink/15 bg-white text-sm focus:ring-2 focus:ring-plum focus:border-plum outline-none transition-all"
            />
          </div>
        </div>
        <div>
          <label htmlFor="comment-content" className="block text-sm font-medium text-ink mb-1">Comment *</label>
          <textarea
            id="comment-content"
            value={content}
            onChange={e => setContent(e.target.value)}
            required
            rows={4}
            className="w-full px-4 py-2.5 rounded-xl border border-ink/15 bg-white text-sm focus:ring-2 focus:ring-plum focus:border-plum outline-none resize-none transition-all"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-plum text-ivory px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-terracotta transition-colors disabled:opacity-50"
        >
          {loading ? 'Submitting...' : 'Submit Comment'}
        </button>
        <p className="text-xs text-ink2">Comments are moderated and will appear after review.</p>
      </form>
    </div>
  )
}
