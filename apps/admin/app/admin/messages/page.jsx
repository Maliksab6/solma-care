'use client'

import { useEffect, useState } from 'react'
import AdminLayout from '@/components/admin/layout/AdminLayout'
import { createClient } from '@/lib/supabase'
import { Trash2, Mail, MailOpen } from 'lucide-react'
import toast from 'react-hot-toast'
import { formatDate } from '@/lib/utils'

export default function MessagesPage() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => { loadMessages() }, [])

  async function loadMessages() {
    try {
      const res = await fetch('/api/admin/messages')
      const json = await res.json()
      setMessages(json.data || [])
    } catch { toast.error('Failed to load') } finally { setLoading(false) }
  }

  async function markRead(id) {
    await fetch('/api/admin/messages', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, is_read: true }) })
    loadMessages()
  }

  async function deleteMessage(id) {
    if (!confirm('Delete?')) return
    await fetch('/api/admin/messages', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) })
    toast.success('Deleted')
    loadMessages()
  }

  return (
    <AdminLayout>
      <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Messages</h1>
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          {loading ? (
            <div className="p-12 text-center"><div className="animate-spin w-8 h-8 border-4 border-plum border-t-transparent rounded-full mx-auto" /></div>
          ) : messages.length === 0 ? (
            <div className="p-12 text-center text-gray-500">No messages yet</div>
          ) : (
            <div className="divide-y divide-gray-50">
              {messages.map(m => (
                <div key={m.id} className={`p-4 sm:p-5 ${!m.is_read ? 'bg-plum/5' : ''}`}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-gray-900 text-sm">{m.full_name}</span>
                        <span className="text-xs text-gray-400">{m.email}</span>
                        {!m.is_read && <span className="w-2 h-2 bg-plum rounded-full" />}
                      </div>
                      {m.subject && <p className="text-xs font-medium text-gray-500 mb-1">Re: {m.subject}</p>}
                      <p className="text-sm text-gray-600">{m.message}</p>
                      <p className="text-xs text-gray-400 mt-2">{formatDate(m.created_at)}</p>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      {!m.is_read && <button onClick={() => markRead(m.id)} className="p-2 text-gray-400 hover:text-plum hover:bg-plum/5 rounded-lg" title="Mark read"><MailOpen size={16} /></button>}
                      <button onClick={() => deleteMessage(m.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg" title="Delete"><Trash2 size={16} /></button>
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
