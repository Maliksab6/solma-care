'use client'

import { useEffect, useState } from 'react'
import AdminLayout from '@/components/admin/layout/AdminLayout'
import { createClient } from '@/lib/supabase'
import { Save } from 'lucide-react'
import toast from 'react-hot-toast'

export default function SiteSettingsPage() {
  const [settings, setSettings] = useState({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const supabase = createClient()

  useEffect(() => { loadSettings() }, [])

  async function loadSettings() {
    try {
      const res = await fetch('/api/admin/settings')
      const json = await res.json()
      const map = {}
      json.data?.forEach(s => { map[s.key] = s.value || '' })
      setSettings(map)
    } catch { toast.error('Failed to load') } finally { setLoading(false) }
  }

  async function saveSettings() {
    setSaving(true)
    try {
      for (const [key, value] of Object.entries(settings)) {
        await fetch('/api/admin/settings', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ key, value }) })
      }
      toast.success('Settings saved!')
    } catch (err) { toast.error(err.message) } finally { setSaving(false) }
  }

  const fields = [
    { key: 'hero_badge', label: 'Hero Badge', placeholder: 'For South Asian women' },
    { key: 'hero_title', label: 'Hero Title', placeholder: 'Your results were "normal."' },
    { key: 'hero_description', label: 'Hero Description', type: 'textarea' },
    { key: 'hero_photo', label: 'Hero Photo URL', placeholder: '/hero.jpg' },
  ]

  return (
    <AdminLayout>
      <div className="p-4 sm:p-6 lg:p-8 max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Site Settings</h1>
          <button onClick={saveSettings} disabled={saving} className="bg-plum text-ivory px-5 py-2.5 rounded-xl font-semibold hover:bg-plum/90 transition-colors text-sm flex items-center gap-2 disabled:opacity-50">
            <Save size={16} /> {saving ? 'Saving...' : 'Save'}
          </button>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
          {loading ? (
            <div className="p-12 text-center"><div className="animate-spin w-8 h-8 border-4 border-plum border-t-transparent rounded-full mx-auto" /></div>
          ) : fields.map(f => (
            <div key={f.key}>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">{f.label}</label>
              {f.type === 'textarea' ? (
                <textarea
                  value={settings[f.key] || ''}
                  onChange={e => setSettings(p => ({ ...p, [f.key]: e.target.value }))}
                  rows={3}
                  placeholder={f.placeholder}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-plum focus:border-plum outline-none text-sm resize-none transition-all"
                />
              ) : (
                <input
                  type="text"
                  value={settings[f.key] || ''}
                  onChange={e => setSettings(p => ({ ...p, [f.key]: e.target.value }))}
                  placeholder={f.placeholder}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-plum focus:border-plum outline-none text-sm transition-all"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  )
}
