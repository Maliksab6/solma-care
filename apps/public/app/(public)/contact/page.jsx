'use client'

import { useState } from 'react'
import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'
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
      <main className="min-h-screen bg-white">
        <div className="max-w-2xl mx-auto px-6 py-16 md:py-24">
          <p className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-4">Contact</p>
          <h1 className="text-3xl md:text-5xl font-semibold text-ink tracking-tight leading-tight">
            Ask a Question
          </h1>
          <p className="text-gray-500 mt-4 text-lg leading-relaxed">
            We read every message. If we can&rsquo;t help, we&rsquo;ll point you to someone who can.
          </p>
          <div className="w-12 h-0.5 bg-brand-400 mt-8 mb-10"></div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="contact-name" className="block text-sm font-medium text-ink mb-2">Your name *</label>
              <input id="contact-name" type="text" value={formData.full_name} onChange={e => setFormData(p => ({ ...p, full_name: e.target.value }))} required placeholder="Full name" className="w-full bg-surface-muted border border-surface-border rounded-lg px-4 py-3 text-sm text-ink placeholder-gray-400 focus:outline-none focus:border-brand-500 transition-colors" />
            </div>
            <div>
              <label htmlFor="contact-email" className="block text-sm font-medium text-ink mb-2">Email *</label>
              <input id="contact-email" type="email" value={formData.email} onChange={e => setFormData(p => ({ ...p, email: e.target.value }))} required placeholder="you@example.com" className="w-full bg-surface-muted border border-surface-border rounded-lg px-4 py-3 text-sm text-ink placeholder-gray-400 focus:outline-none focus:border-brand-500 transition-colors" />
            </div>
            <div>
              <label htmlFor="contact-subject" className="block text-sm font-medium text-ink mb-2">Subject</label>
              <input id="contact-subject" type="text" value={formData.subject} onChange={e => setFormData(p => ({ ...p, subject: e.target.value }))} placeholder="What is this about?" className="w-full bg-surface-muted border border-surface-border rounded-lg px-4 py-3 text-sm text-ink placeholder-gray-400 focus:outline-none focus:border-brand-500 transition-colors" />
            </div>
            <div>
              <label htmlFor="contact-message" className="block text-sm font-medium text-ink mb-2">Message *</label>
              <textarea id="contact-message" value={formData.message} onChange={e => setFormData(p => ({ ...p, message: e.target.value }))} required rows={5} placeholder="Tell us what's on your mind..." className="w-full bg-surface-muted border border-surface-border rounded-lg px-4 py-3 text-sm text-ink placeholder-gray-400 focus:outline-none focus:border-brand-500 transition-colors resize-none" />
            </div>
            <button type="submit" disabled={loading} className="w-full bg-brand-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-brand-700 transition-colors disabled:opacity-50">
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>

          <div className="mt-12 grid sm:grid-cols-2 gap-4">
            <div className="bg-surface-muted border border-surface-border rounded-xl p-5">
              <h3 className="font-semibold text-ink text-sm mb-1">Not medical advice</h3>
              <p className="text-xs text-gray-500 leading-relaxed">We provide educational information only. Always consult your doctor for personal health decisions.</p>
            </div>
            <div className="bg-surface-muted border border-surface-border rounded-xl p-5">
              <h3 className="font-semibold text-ink text-sm mb-1">Response time</h3>
              <p className="text-xs text-gray-500 leading-relaxed">We typically respond within 48 hours. For emergencies, contact your healthcare provider.</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
