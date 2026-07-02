'use client'

import { useEffect, useState } from 'react'
import AdminLayout from '@/components/admin/layout/AdminLayout'
import { createClient } from '@/lib/supabase'
import { Trash2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { formatDate } from '@/lib/utils'

export default function UsersPage() {
  const [roles, setRoles] = useState([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => { loadRoles() }, [])

  async function loadRoles() {
    try {
      const { data } = await supabase.from('user_roles').select('*').order('created_at', { ascending: false })
      setRoles(data || [])
    } catch { toast.error('Failed to load') } finally { setLoading(false) }
  }

  return (
    <AdminLayout>
      <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Users</h1>
        <p className="text-gray-500 text-sm mb-6">Manage admin roles. Add users via Supabase SQL.</p>
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          {loading ? (
            <div className="p-12 text-center"><div className="animate-spin w-8 h-8 border-4 border-plum border-t-transparent rounded-full mx-auto" /></div>
          ) : roles.length === 0 ? (
            <div className="p-12 text-center text-gray-500">No user roles configured</div>
          ) : (
            <div className="divide-y divide-gray-50">
              {roles.map(r => (
                <div key={r.id} className="p-4 flex items-center gap-4">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 text-sm font-mono">{r.user_id}</p>
                    <p className="text-xs text-gray-400">{formatDate(r.created_at)}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${r.role === 'admin' ? 'bg-plum/10 text-plum' : 'bg-gray-100 text-gray-600'}`}>
                    {r.role}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  )
}
