'use client'

import { useEffect, useState } from 'react'
import AdminLayout from '@/components/admin/layout/AdminLayout'
import { createClient } from '@/lib/supabase'
import { BarChart2 } from 'lucide-react'

export default function AnalyticsPage() {
  const [stats, setStats] = useState({ totalViews: 0, totalPosts: 0, publishedPosts: 0 })
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    async function load() {
      try {
        const [views, total, published] = await Promise.all([
          supabase.from('page_views').select('id', { count: 'exact', head: true }),
          supabase.from('posts').select('id', { count: 'exact', head: true }),
          supabase.from('posts').select('id', { count: 'exact', head: true }).eq('status', 'published'),
        ])
        setStats({ totalViews: views.count || 0, totalPosts: total.count || 0, publishedPosts: published.count || 0 })
      } catch {} finally { setLoading(false) }
    }
    load()
  }, [])

  return (
    <AdminLayout>
      <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Analytics</h1>
        <div className="grid sm:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <p className="text-sm text-gray-500 mb-1">Total Page Views</p>
            <p className="text-3xl font-bold text-gray-900">{loading ? '—' : stats.totalViews}</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <p className="text-sm text-gray-500 mb-1">Total Posts</p>
            <p className="text-3xl font-bold text-gray-900">{loading ? '—' : stats.totalPosts}</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <p className="text-sm text-gray-500 mb-1">Published</p>
            <p className="text-3xl font-bold text-gray-900">{loading ? '—' : stats.publishedPosts}</p>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
