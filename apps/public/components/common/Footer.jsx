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
    <footer className="bg-plum text-ivory/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 grid grid-cols-2 md:grid-cols-4 gap-10">
        <div className="col-span-2 md:col-span-1">
          <div className="font-serif text-xl mb-3">
            <span className="text-ivory">solma</span>
            <span className="text-terracotta">care</span>
          </div>
          <p className="text-sm mb-4">
            Hormonal health for South Asian women — explained properly.
          </p>
          <p className="text-xs italic text-ivory/60">
            Educational content only. Not a substitute for in-person
            medical care.
          </p>
          <div className="mt-4">
            <p className="text-xs font-medium uppercase tracking-widest text-gold mb-3">
              Stay in the loop
            </p>
            <form onSubmit={subscribe} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Your email"
                required
                className="flex-1 min-w-0 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm text-ivory placeholder-ivory/40 focus:outline-none focus:border-gold transition-all"
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-gold hover:bg-gold/90 text-plum font-semibold text-sm px-3 py-2 rounded-lg transition-colors shrink-0 disabled:opacity-60"
              >
                {loading ? '...' : '→'}
              </button>
            </form>
          </div>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-gold mb-3">
            Topics
          </p>
          <ul className="space-y-2 text-sm">
            <li><Link href="/topics/pcos" className="hover:text-ivory">PCOS &amp; Hormonal Health</Link></li>
            <li><Link href="/topics/metabolic-health" className="hover:text-ivory">Metabolic Health</Link></li>
            <li><Link href="/topics/fertility" className="hover:text-ivory">Fertility &amp; Postpartum</Link></li>
            <li><Link href="/topics/missed-conditions" className="hover:text-ivory">Commonly Missed Conditions</Link></li>
            <li><Link href="/topics/living-with-it" className="hover:text-ivory">Living With It</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-gold mb-3">
            Site
          </p>
          <ul className="space-y-2 text-sm">
            <li><Link href="/articles" className="hover:text-ivory">Articles</Link></li>
            <li><Link href="/about" className="hover:text-ivory">About</Link></li>
            <li><Link href="/contact" className="hover:text-ivory">Contact</Link></li>
            <li><Link href="/newsletter" className="hover:text-ivory">Newsletter</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-gold mb-3">
            Legal
          </p>
          <ul className="space-y-2 text-sm">
            <li><Link href="/terms" className="hover:text-ivory">Terms of Use</Link></li>
            <li><Link href="/terms#privacy" className="hover:text-ivory">Privacy Policy</Link></li>
            <li><Link href="/terms#medical-disclaimer" className="hover:text-ivory">Medical Disclaimer</Link></li>
            <li><Link href="/terms#affiliate" className="hover:text-ivory">Affiliate Disclosure</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-ivory/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-ivory/60">
          <p>&copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <div className="flex gap-4">
            {siteConfig.social.instagram && <a href={siteConfig.social.instagram} className="hover:text-ivory">Instagram</a>}
            {siteConfig.social.pinterest && <a href={siteConfig.social.pinterest} className="hover:text-ivory">Pinterest</a>}
            {siteConfig.social.substack && <a href={siteConfig.social.substack} className="hover:text-ivory">Substack</a>}
          </div>
        </div>
      </div>
    </footer>
  )
}
