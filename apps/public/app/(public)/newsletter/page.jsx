'use client'

import { useState } from 'react'
import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'
import toast from 'react-hot-toast'

export default function NewsletterPage() {
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
    <>
      <Header />
      <main className="min-h-screen bg-ivory">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16 sm:py-20 text-center">
          <p className="text-xs uppercase tracking-widest text-terracotta mb-4">Newsletter</p>
          <h1 className="font-serif text-4xl sm:text-5xl text-plum mb-6">
            Slow, careful, worth the wait.
          </h1>
          <p className="text-ink2 mb-8 max-w-lg mx-auto">
            No content mill. No daily emails. Just well-researched articles,
            sent when there&rsquo;s something worth reading. Every piece is
            reviewed by a licensed physician before it reaches your inbox.
          </p>

          <form onSubmit={subscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-6">
            <label htmlFor="nl-email" className="sr-only">Email address</label>
            <input
              id="nl-email"
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@email.com"
              className="flex-1 rounded-full border border-ink/15 bg-white px-5 py-3 text-sm focus:border-plum outline-none"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-plum text-ivory px-6 py-3 rounded-full text-sm font-semibold hover:bg-terracotta transition-colors disabled:opacity-50"
            >
              {loading ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>

          <span className="inline-block bg-sage/15 text-sage text-xs px-3 py-1 rounded-full">
            Physician-reviewed content only
          </span>

          <div className="mt-16 text-left space-y-6">
            <div className="bg-ivory2 rounded-xl p-6 border border-ink/10">
              <h3 className="font-serif text-lg text-plum mb-2">What you&rsquo;ll get</h3>
              <ul className="space-y-2 text-sm text-ink2">
                <li className="flex items-start gap-2"><span className="text-sage mt-0.5">✓</span> In-depth articles on PCOS, insulin resistance, thyroid, and fertility</li>
                <li className="flex items-start gap-2"><span className="text-sage mt-0.5">✓</span> Research-backed information written for South Asian women</li>
                <li className="flex items-start gap-2"><span className="text-sage mt-0.5">✓</span> No spam — only published when there&rsquo;s something worth reading</li>
                <li className="flex items-start gap-2"><span className="text-sage mt-0.5">✓</span> One-click unsubscribe anytime</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
