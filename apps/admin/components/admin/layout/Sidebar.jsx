'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard, FileText, MessageSquare, FolderOpen,
  BarChart2, Mail, LogOut, ExternalLink, Users,
  Settings, ChevronLeft, ChevronRight,
} from 'lucide-react'
import { createClient } from '@/lib/supabase'
import toast from 'react-hot-toast'
import { useState } from 'react'
import siteConfig from '@/lib/config'

const mainNav = [
  { href: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/admin/posts', icon: FileText, label: 'Posts' },
  { href: '/admin/comments', icon: MessageSquare, label: 'Comments' },
]

const contentNav = [
  { href: '/admin/categories', icon: FolderOpen, label: 'Categories' },
]

const systemNav = [
  { href: '/admin/users', icon: Users, label: 'Users' },
  { href: '/admin/analytics', icon: BarChart2, label: 'Analytics' },
  { href: '/admin/messages', icon: Mail, label: 'Messages' },
  { href: '/admin/site-settings', icon: Settings, label: 'Site Settings' },
]

function NavGroup({ label, items, pathname, collapsed, onNavigate }) {
  return (
    <div className="mb-1">
      {!collapsed && (
        <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-4 mb-1.5 mt-4">
          {label}
        </h3>
      )}
      <div className="space-y-0.5">
        {items.map(({ href, icon: Icon, label }) => {
          const active = href === '/admin/dashboard' ? pathname === '/admin/dashboard' : pathname.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              onClick={onNavigate}
              title={collapsed ? label : undefined}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-all duration-150 ${
                active
                  ? 'bg-plum/10 text-plum font-semibold shadow-sm'
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Icon size={18} className={`shrink-0 ${active ? 'text-plum' : ''}`} />
              {!collapsed && <span>{label}</span>}
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default function Sidebar({ onNavigate }) {
  const pathname = usePathname()
  const supabase = createClient()
  const [collapsed, setCollapsed] = useState(false)

  async function logout() {
    try {
      await supabase.auth.signOut()
      toast.success('Logged out')
      window.location.href = '/admin/login'
    } catch {
      toast.error('Failed to log out')
    }
  }

  return (
    <aside className={`${collapsed ? 'w-[68px]' : 'w-64'} shrink-0 bg-white border-r border-gray-200/80 h-screen flex flex-col transition-all duration-300 ease-in-out`}>
      <div className="px-4 py-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl overflow-hidden shrink-0 shadow-sm bg-plum flex items-center justify-center">
            <span className="text-ivory font-serif font-bold text-sm">S</span>
          </div>
          {!collapsed && (
            <div className="overflow-hidden">
              <div className="font-bold text-gray-900 text-sm leading-tight">
                <span className="text-plum">solma</span>
                <span className="text-terracotta">care</span>
              </div>
              <div className="text-gray-400 text-[11px]">{siteConfig.admin.name}</div>
            </div>
          )}
        </div>
      </div>

      <button
        onClick={() => setCollapsed(!collapsed)}
        className="hidden lg:flex absolute -right-3 top-[52px] w-6 h-6 bg-white border border-gray-200 rounded-full items-center justify-center text-gray-400 hover:text-gray-600 hover:border-gray-300 z-10 shadow-sm transition-colors"
      >
        {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </button>

      <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
        <NavGroup label="Main" items={mainNav} pathname={pathname} collapsed={collapsed} onNavigate={onNavigate} />
        <NavGroup label="Content" items={contentNav} pathname={pathname} collapsed={collapsed} onNavigate={onNavigate} />
        <NavGroup label="System" items={systemNav} pathname={pathname} collapsed={collapsed} onNavigate={onNavigate} />
      </nav>

      <div className="px-3 pb-3 space-y-1 border-t border-gray-100 pt-2">
        <Link
          href="/"
          target="_blank"
          onClick={onNavigate}
          className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-all"
        >
          <ExternalLink size={18} className="shrink-0" />
          {!collapsed && <span>View Live Site</span>}
        </Link>
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-red-500 hover:bg-red-50 hover:text-red-600 transition-all"
        >
          <LogOut size={18} className="shrink-0" />
          {!collapsed && <span>Sign Out</span>}
        </button>
      </div>
    </aside>
  )
}
