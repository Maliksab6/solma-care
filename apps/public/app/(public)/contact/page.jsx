'use client'

import { useState } from 'react'
import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'
import { JsonLd } from '@/components/common/JsonLd'
import siteConfig from '@/lib/config'
import toast from 'react-hot-toast'

export default function ContactPage() {
  const [formData, setFormData] = useState({ full_name: '', email: '', subject: '', message: '' })
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    if (!formData.full_name || !formData.email || !formData.message) {
      toast.error('Please fill in all required fields')
      return
    }
    setLoading(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (res.ok) {
        toast.success('Message sent! We will get back to you.')
        setFormData({ full_name: '', email: '', subject: '', message: '' })
      } else {
        const data = await res.json()
        toast.error(data.error || 'Failed to send')
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
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <p className="text-xs uppercase tracking-widest text-terracotta mb-4">Contact</p>
          <h1 className="font-serif text-4xl text-plum leading-tight mb-4">
            Have a question your doctor hasn&rsquo;t answered?
          </h1>
          <p className="text-ink2 mb-10 max-w-lg">
            Every question submitted here is read personally. The best ones
            become the next article. We cannot provide medical advice — but
            we can point you to the research.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="contact-name" className="block text-sm font-medium text-ink mb-1.5">Name *</label>
                <input
                  id="contact-name"
                  type="text"
                  value={formData.full_name}
                  onChange={e => setFormData(p => ({ ...p, full_name: e.target.value }))}
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-ink/15 bg-white text-sm focus:ring-2 focus:ring-plum focus:border-plum outline-none transition-all"
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="block text-sm font-medium text-ink mb-1.5">Email *</label>
                <input
                  id="contact-email"
                  type="email"
                  value={formData.email}
                  onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-ink/15 bg-white text-sm focus:ring-2 focus:ring-plum focus:border-plum outline-none transition-all"
                />
              </div>
            </div>
            <div>
              <label htmlFor="contact-subject" className="block text-sm font-medium text-ink mb-1.5">Subject</label>
              <input
                id="contact-subject"
                type="text"
                value={formData.subject}
                onChange={e => setFormData(p => ({ ...p, subject: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-xl border border-ink/15 bg-white text-sm focus:ring-2 focus:ring-plum focus:border-plum outline-none transition-all"
              />
            </div>
            <div>
              <label htmlFor="contact-message" className="block text-sm font-medium text-ink mb-1.5">Message *</label>
              <textarea
                id="contact-message"
                value={formData.message}
                onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                required
                rows={6}
                className="w-full px-4 py-2.5 rounded-xl border border-ink/15 bg-white text-sm focus:ring-2 focus:ring-plum focus:border-plum outline-none resize-none transition-all"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-plum text-ivory px-8 py-3 rounded-full text-sm font-semibold hover:bg-terracotta transition-colors disabled:opacity-50"
            >
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </>
  )
}
