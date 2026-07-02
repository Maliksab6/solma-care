'use client'

import { useEffect, useState } from 'react'
import AdminLayout from '@/components/admin/layout/AdminLayout'
import { createClient } from '@/lib/supabase'
import { FileText, MessageSquare, FolderOpen, Users } from 'lucide-react'
import Link from 'next/link'

export default function Dashboard() {
  const [stats, setStats] = useState({ posts: 0, comments: 0, categories: 0, subscribers: 0 })
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/admin/stats')
        const data = await res.json()
        setStats({
          posts: data.totalPosts || 0,
          comments: data.totalComments || 0,
          categories: data.totalCategories || 0,
          subscribers: data.totalSubscribers || 0,
        })
      } catch (err) { console.error(err) }
      finally { setLoading(false) }
    }
    load()
  }, [])

  const cards = [
    { label: 'Posts', value: stats.posts, icon: FileText, href: '/admin/posts', color: 'bg-plum/10 text-plum' },
    { label: 'Comments', value: stats.comments, icon: MessageSquare, href: '/admin/comments', color: 'bg-terracotta/10 text-terracotta' },
    { label: 'Categories', value: stats.categories, icon: FolderOpen, href: '/admin/categories', color: 'bg-sage/10 text-sage' },
    { label: 'Subscribers', value: stats.subscribers, icon: Users, href: '/admin/site-settings', color: 'bg-gold/10 text-gold' },
  ]

  return (
    <AdminLayout>
      <div className="p-8 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-500 mb-8">Welcome back to Solma Care admin.</p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {cards.map(({ label, value, icon: Icon, href, color }) => (
            <Link key={label} href={href} className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-md transition-shadow">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${color}`}>
                <Icon size={20} />
              </div>
              <p className="text-2xl font-bold text-gray-900">{loading ? '—' : value}</p>
              <p className="text-sm text-gray-500">{label}</p>
            </Link>
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="flex flex-wrap gap-3">
            <Link href="/admin/posts/new" className="bg-plum text-ivory px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-plum/90 transition-colors">
              New Post
            </Link>
            <Link href="/admin/categories" className="bg-gray-100 text-gray-700 px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-200 transition-colors">
              Manage Categories
            </Link>
            <Link href="/" target="_blank" className="bg-gray-100 text-gray-700 px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-200 transition-colors">
              View Live Site
            </Link>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
