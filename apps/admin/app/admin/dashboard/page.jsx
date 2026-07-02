'use client'

import { useEffect, useState } from 'react'
import AdminLayout from '@/components/admin/layout/AdminLayout'
import { FileText, MessageSquare, FolderOpen, Users, Mail, Bell } from 'lucide-react'
import Link from 'next/link'

export default function Dashboard() {
  const [stats, setStats] = useState({ posts: 0, comments: 0, categories: 0, subscribers: 0, unseenMessages: 0, pendingComments: 0 })
  const [loading, setLoading] = useState(true)

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
          unseenMessages: data.unseenMessages || 0,
          pendingComments: data.pendingComments || 0,
        })
      } catch (err) { console.error(err) }
      finally { setLoading(false) }
    }
    load()
  }, [])

  const cards = [
    { label: 'Posts', value: stats.posts, icon: FileText, href: '/admin/posts', color: 'bg-plum/10 text-plum' },
    { label: 'Comments', value: stats.comments, icon: MessageSquare, href: '/admin/comments', color: 'bg-terracotta/10 text-terracotta', badge: stats.pendingComments },
    { label: 'Categories', value: stats.categories, icon: FolderOpen, href: '/admin/categories', color: 'bg-sage/10 text-sage' },
    { label: 'Subscribers', value: stats.subscribers, icon: Users, href: '/admin/site-settings', color: 'bg-gold/10 text-gold' },
  ]

  return (
    <AdminLayout>
      <div className="p-8 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-500 mb-8">Welcome back to Solma Care admin.</p>

        {(stats.unseenMessages > 0 || stats.pendingComments > 0) && (
          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            {stats.unseenMessages > 0 && (
              <Link href="/admin/messages" className="flex items-center gap-4 bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-plum/10 flex items-center justify-center shrink-0">
                  <Mail size={22} className="text-plum" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-500">Unread Messages</p>
                  <p className="text-2xl font-bold text-plum">{stats.unseenMessages}</p>
                </div>
                <span className="px-3 py-1 bg-plum text-white text-xs font-semibold rounded-full">{stats.unseenMessages} new</span>
              </Link>
            )}
            {stats.pendingComments > 0 && (
              <Link href="/admin/comments" className="flex items-center gap-4 bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center shrink-0">
                  <Bell size={22} className="text-amber-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-500">Pending Comments</p>
                  <p className="text-2xl font-bold text-amber-600">{stats.pendingComments}</p>
                </div>
                <span className="px-3 py-1 bg-amber-500 text-white text-xs font-semibold rounded-full">{stats.pendingComments} new</span>
              </Link>
            )}
          </div>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {cards.map(({ label, value, icon: Icon, href, color, badge }) => (
            <Link key={label} href={href} className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-md transition-shadow relative">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${color}`}>
                <Icon size={20} />
              </div>
              <p className="text-2xl font-bold text-gray-900">{loading ? '—' : value}</p>
              <p className="text-sm text-gray-500">{label}</p>
              {badge > 0 && (
                <span className="absolute top-4 right-4 min-w-[20px] h-5 flex items-center justify-center bg-red-500 text-white text-[10px] font-bold rounded-full px-1.5">
                  {badge}
                </span>
              )}
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
