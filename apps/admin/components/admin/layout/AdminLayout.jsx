'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Sidebar from './Sidebar'
import { createClient } from '@/lib/supabase'
import { Menu } from 'lucide-react'
import siteConfig from '@/lib/config'

export default function AdminLayout({ children }) {
  const router = useRouter()
  const [authorized, setAuthorized] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const supabase = createClient()
    let cancelled = false

    async function checkAuth() {
      const { data: { user } } = await supabase.auth.getUser()
      if (cancelled) return
      if (!user) { router.replace('/admin/login'); return }
      setAuthorized(true)
    }

    checkAuth()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (cancelled) return
      if (!session?.user) { setAuthorized(false); router.replace('/admin/login') }
      else { setAuthorized(true) }
    })

    return () => { cancelled = true; subscription.unsubscribe() }
  }, [router])

  if (!authorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin w-10 h-10 border-4 border-plum border-t-transparent rounded-full" />
          <p className="text-gray-500 text-sm">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-gray-50/50">
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="relative z-10 h-full">
            <Sidebar onNavigate={() => setMobileOpen(false)} />
          </div>
        </div>
      )}

      <main className="flex-1 overflow-auto min-w-0">
        <div className="lg:hidden sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 py-3 flex items-center gap-3">
          <button onClick={() => setMobileOpen(true)} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
            <Menu size={20} className="text-gray-700" />
          </button>
          <span className="font-bold text-gray-900 text-sm">{siteConfig.admin.name}</span>
        </div>

        <div className="animate-in fade-in duration-300">
          {children}
        </div>
      </main>
    </div>
  )
}
