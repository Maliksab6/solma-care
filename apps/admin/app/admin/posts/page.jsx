'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import AdminLayout from '@/components/admin/layout/AdminLayout'
import { createClient } from '@/lib/supabase'
import { Plus, Edit, Trash2, Eye, Calendar, CheckCircle2, XCircle, Search } from 'lucide-react'
import toast from 'react-hot-toast'
import { formatDate } from '@/lib/utils'

export default function AdminPosts() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const supabase = createClient()

  useEffect(() => { loadPosts() }, [])

  async function loadPosts() {
    try {
      const res = await fetch('/api/admin/posts')
      const json = await res.json()
      setPosts(json.data || [])
    } catch (err) { toast.error('Failed to load posts') } finally { setLoading(false) }
  }

  const deletePost = async (id) => {
    if (!confirm('Delete this post? This cannot be undone.')) return
    try {
      const res = await fetch(`/api/admin/posts/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Failed')
      toast.success('Post deleted')
      loadPosts()
    } catch (err) { toast.error('Failed to delete') }
  }

  const togglePublish = async (post) => {
    try {
      const newStatus = post.status === 'published' ? 'draft' : 'published'
      const res = await fetch(`/api/admin/posts/${post.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus, published_at: newStatus === 'published' ? new Date().toISOString() : null })
      })
      if (!res.ok) throw new Error('Failed')
      toast.success(`Post ${newStatus === 'published' ? 'published' : 'unpublished'}`)
      loadPosts()
    } catch (err) { toast.error('Failed to update') }
  }

  const filtered = posts.filter(p => p.title?.toLowerCase().includes(search.toLowerCase()))

  return (
    <AdminLayout>
      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Posts</h1>
            <p className="text-gray-500 text-sm mt-0.5">{posts.length} total posts</p>
          </div>
          <Link href="/admin/posts/new" className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-plum text-ivory rounded-xl font-semibold hover:bg-plum/90 transition-all text-sm">
            <Plus size={18} /> New Post
          </Link>
        </div>

        <div className="mb-4">
          <div className="relative max-w-sm">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search posts..." className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-plum focus:border-transparent outline-none transition-all" />
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          {loading ? (
            <div className="p-12 text-center">
              <div className="animate-spin w-8 h-8 border-4 border-plum border-t-transparent rounded-full mx-auto mb-3" />
              <p className="text-gray-500 text-sm">Loading posts...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="p-12 text-center">
              <h3 className="text-lg font-semibold text-gray-700 mb-1">{search ? 'No matching posts' : 'No posts yet'}</h3>
              <p className="text-gray-500 text-sm mb-5">{search ? 'Try a different search' : 'Create your first post!'}</p>
              {!search && (
                <Link href="/admin/posts/new" className="inline-flex items-center gap-2 px-5 py-2.5 bg-plum text-ivory rounded-xl font-semibold hover:bg-plum/90 transition-all text-sm">
                  <Plus size={18} /> Create First Post
                </Link>
              )}
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {filtered.map((post) => (
                <div key={post.id} className="p-4 sm:p-5 hover:bg-gray-50/50 transition-colors">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2.5 mb-1.5 flex-wrap">
                        <h3 className="text-base font-semibold text-gray-900 truncate">{post.title}</h3>
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium ${
                          post.status === 'published' ? 'bg-emerald-50 text-emerald-700' :
                          post.status === 'scheduled' ? 'bg-blue-50 text-blue-700' :
                          'bg-gray-100 text-gray-600'
                        }`}>
                          {post.status === 'published' ? <CheckCircle2 size={10} /> : <XCircle size={10} />}
                          {post.status}
                        </span>
                      </div>
                      {post.excerpt && <p className="text-gray-500 text-sm line-clamp-1 mb-2">{post.excerpt}</p>}
                      <div className="flex items-center gap-3 text-xs text-gray-400">
                        {post.category && <span className="text-gray-500">{post.category.name}</span>}
                        <span className="flex items-center gap-1"><Calendar size={11} /> {formatDate(post.created_at)}</span>
                        {post.view_count > 0 && <span>{post.view_count} views</span>}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <Link href={`/articles/${post.slug}`} target="_blank" className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all" title="View"><Eye size={16} /></Link>
                      <Link href={`/admin/posts/${post.id}`} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all" title="Edit"><Edit size={16} /></Link>
                      <button onClick={() => togglePublish(post)} className={`p-2 rounded-lg transition-all ${post.status === 'published' ? 'text-amber-500 hover:bg-amber-50' : 'text-emerald-500 hover:bg-emerald-50'}`} title={post.status === 'published' ? 'Unpublish' : 'Publish'}>
                        {post.status === 'published' ? <XCircle size={16} /> : <CheckCircle2 size={16} />}
                      </button>
                      <button onClick={() => deletePost(post.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all" title="Delete"><Trash2 size={16} /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  )
}
