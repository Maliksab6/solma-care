'use client'

import { useEffect, useState } from 'react'
import AdminLayout from '@/components/admin/layout/AdminLayout'
import { createClient } from '@/lib/supabase'
import { CheckCircle2, XCircle, Trash2, Mail } from 'lucide-react'
import toast from 'react-hot-toast'
import { formatDate } from '@/lib/utils'

export default function CommentsPage() {
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => { loadComments() }, [])

  async function loadComments() {
    try {
      const { data } = await supabase.from('comments').select('*, post:posts(title, slug)').order('created_at', { ascending: false })
      setComments(data || [])
    } catch { toast.error('Failed to load') } finally { setLoading(false) }
  }

  async function updateStatus(id, status) {
    try {
      const { error } = await supabase.from('comments').update({ status }).eq('id', id)
      if (error) throw error
      toast.success(`Comment ${status}`)
      loadComments()
    } catch (err) { toast.error(err.message) }
  }

  async function deleteComment(id) {
    if (!confirm('Delete this comment?')) return
    try {
      const { error } = await supabase.from('comments').delete().eq('id', id)
      if (error) throw error
      toast.success('Deleted')
      loadComments()
    } catch (err) { toast.error(err.message) }
  }

  return (
    <AdminLayout>
      <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Comments</h1>
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          {loading ? (
            <div className="p-12 text-center"><div className="animate-spin w-8 h-8 border-4 border-plum border-t-transparent rounded-full mx-auto" /></div>
          ) : comments.length === 0 ? (
            <div className="p-12 text-center text-gray-500">No comments yet</div>
          ) : (
            <div className="divide-y divide-gray-50">
              {comments.map(c => (
                <div key={c.id} className="p-4 sm:p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-gray-900 text-sm">{c.author_name}</span>
                        <span className="text-xs text-gray-400">{c.author_email}</span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                          c.status === 'approved' ? 'bg-emerald-50 text-emerald-700' :
                          c.status === 'rejected' ? 'bg-red-50 text-red-700' :
                          'bg-gray-100 text-gray-600'
                        }`}>{c.status}</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{c.content}</p>
                      {c.post && <p className="text-xs text-gray-400">On: {c.post.title}</p>}
                      <p className="text-xs text-gray-400 mt-1">{formatDate(c.created_at)}</p>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      {c.status !== 'approved' && <button onClick={() => updateStatus(c.id, 'approved')} className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg" title="Approve"><CheckCircle2 size={16} /></button>}
                      {c.status !== 'rejected' && <button onClick={() => updateStatus(c.id, 'rejected')} className="p-2 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg" title="Reject"><XCircle size={16} /></button>}
                      <button onClick={() => deleteComment(c.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg" title="Delete"><Trash2 size={16} /></button>
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
