'use client'

import { useState } from 'react'
import Link from 'next/link'
import toast from 'react-hot-toast'
import siteConfig from '@/lib/config'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  async function subscribe(e) {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (res.ok) {
        toast.success("You're subscribed!")
        setEmail('')
      } else {
        toast.error(data.error || 'Failed to subscribe')
      }
    } catch {
      toast.error('Something went wrong')
    }
    setLoading(false)
  }

  return (
    <footer className="bg-ink text-white">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <p className="text-lg font-semibold">Solma Care</p>
            <p className="text-sm text-gray-400 mt-1">
              South Asian women&rsquo;s metabolic &amp; hormonal health
            </p>
          </div>
          <div className="flex gap-6">
            {siteConfig.social.instagram && (
              <a href={siteConfig.social.instagram} className="text-sm text-gray-400 hover:text-white transition-colors">Instagram</a>
            )}
            <a href="https://tiktok.com/@solmacare" className="text-sm text-gray-400 hover:text-white transition-colors">TikTok</a>
            <Link href="/about" className="text-sm text-gray-400 hover:text-white transition-colors">About</Link>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
