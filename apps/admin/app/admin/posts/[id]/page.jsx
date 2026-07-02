'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import AdminLayout from '@/components/admin/layout/AdminLayout'
import RichTextEditor from '@/components/admin/features/RichTextEditor'
import { createClient } from '@/lib/supabase'
import { makeSlug, calcReadingTime } from '@/lib/utils'
import { ArrowLeft, Save, Upload, X, FileCode } from 'lucide-react'
import toast from 'react-hot-toast'

function cleanImportedHtml(html) {
  let cleaned = html
  cleaned = cleaned.replace(/<\/?html[^>]*>/gi, '')
  cleaned = cleaned.replace(/<\/?body[^>]*>/gi, '')
  cleaned = cleaned.replace(/<head[\s\S]*?<\/head>/gi, '')
  cleaned = cleaned.replace(/<!DOCTYPE[^>]*>/gi, '')
  cleaned = cleaned.replace(/<!--[\s\S]*?-->/g, '')
  cleaned = cleaned.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
  cleaned = cleaned.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
  cleaned = cleaned.replace(/<iframe[^>]*>[\s\S]*?<\/iframe>/gi, '')
  cleaned = cleaned.replace(/<object[^>]*>[\s\S]*?<\/object>/gi, '')
  cleaned = cleaned.replace(/<embed[^>]*>/gi, '')
  cleaned = cleaned.replace(/<form[^>]*>[\s\S]*?<\/form>/gi, '')
  cleaned = cleaned.replace(/<svg[^>]*>[\s\S]*?<\/svg>/gi, '')
  cleaned = cleaned.replace(/<meta[^>]*>/gi, '')
  cleaned = cleaned.replace(/<link[^>]*>/gi, '')
  cleaned = cleaned.replace(/<title[^>]*>[\s\S]*?<\/title>/gi, '')
  cleaned = cleaned.replace(/<h1([^>]*)>/gi, '<h2$1>')
  cleaned = cleaned.replace(/<\/h1>/gi, '</h2>')
  cleaned = cleaned.replace(/<\/?h[4-6][^>]*>/gi, '<h3>')
  cleaned = cleaned.replace(/<b([^>]*)>/gi, '<strong$1>')
  cleaned = cleaned.replace(/<\/b>/gi, '</strong>')
  cleaned = cleaned.replace(/<i([^>]*)>/gi, '<em$1>')
  cleaned = cleaned.replace(/<\/i>/gi, '</em>')
  cleaned = cleaned.replace(/<div([^>]*)>/gi, '')
  cleaned = cleaned.replace(/<\/div>/gi, '')
  cleaned = cleaned.replace(/ class="[^"]*"/gi, '')
  cleaned = cleaned.replace(/ style="[^"]*"/gi, '')
  cleaned = cleaned.replace(/ id="[^"]*"/gi, '')
  cleaned = cleaned.replace(/ align="[^"]*"/gi, '')
  cleaned = cleaned.replace(/ on\w+="[^"]*"/gi, '')
  cleaned = cleaned.replace(/javascript:/gi, '')
  cleaned = cleaned.replace(/<p[^>]*>\s*<\/p>/gi, '')
  cleaned = cleaned.replace(/ {2,}/g, ' ')
  return cleaned.trim()
}

export default function EditPost() {
  const router = useRouter()
  const params = useParams()
  const postId = params.id
  const [formData, setFormData] = useState({ title: '', slug: '', excerpt: '', content: '', featured_image: '', category_id: '', status: 'draft', tags: [], seo_title: '', meta_description: '', faqs: [] })
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const supabase = createClient()

  useEffect(() => { loadPost(); loadCategories() }, [postId])

  async function loadPost() {
    try {
      const res = await fetch(`/api/admin/posts/${postId}`)
      const json = await res.json()
      if (!res.ok || !json.data) { toast.error('Post not found'); router.push('/admin/posts'); return }
      const data = json.data
      setFormData({
        title: data.title || '', slug: data.slug || '', excerpt: data.excerpt || '',
        content: data.content || '', featured_image: data.featured_image || '',
        category_id: data.category_id || '', status: data.status || 'draft',
        tags: data.tags || [], seo_title: data.seo_title || '', meta_description: data.meta_description || '',
        faqs: data.faqs || []
      })
    } catch (err) { toast.error('Failed to load post') } finally { setLoading(false) }
  }

  async function loadCategories() {
    try { const res = await fetch('/api/admin/categories'); const json = await res.json(); setCategories(json.data || []) } catch (err) { console.error(err) }
  }

  const handleContentChange = (content) => { setFormData(prev => ({ ...prev, content, reading_time: calcReadingTime(content) })) }

  const handleHtmlImport = (event) => {
    const file = event.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (e) => {
      const cleaned = cleanImportedHtml(e.target.result)
      setFormData(prev => ({ ...prev, content: prev.content + cleaned }))
      toast.success('HTML imported!')
    }
    reader.readAsText(file)
    event.target.value = ''
  }

  const handleFaqJsonImport = (event) => {
    const file = event.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const parsed = JSON.parse(e.target.result)
        if (!Array.isArray(parsed) || !parsed.every(f => f.question && f.answer)) {
          toast.error('Invalid format. Expected: [{"question":"...","answer":"..."}]')
          return
        }
        setFormData(prev => ({ ...prev, faqs: [...(prev.faqs || []), ...parsed] }))
        toast.success(`${parsed.length} FAQs imported!`)
      } catch { toast.error('Invalid JSON file') }
    }
    reader.readAsText(file)
    event.target.value = ''
  }

  const handleImageUpload = async (event) => {
    try {
      setUploading(true)
      const file = event.target.files?.[0]
      if (!file) return
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
      const filePath = `posts/${fileName}`
      const { error: uploadError } = await supabase.storage.from('images').upload(filePath, file)
      if (uploadError) throw uploadError
      const { data: { publicUrl } } = supabase.storage.from('images').getPublicUrl(filePath)
      setFormData(prev => ({ ...prev, featured_image: publicUrl }))
      toast.success('Image uploaded!')
    } catch (err) { toast.error('Failed to upload image') } finally { setUploading(false) }
  }

  const handleSave = async (publishNow = false) => {
    if (!formData.title) { toast.error('Please enter a post title'); return }
    setSaving(true)
    try {
      const postData = {
        title: formData.title, slug: formData.slug, excerpt: formData.excerpt || null,
        content: formData.content, featured_image: formData.featured_image || null,
        category_id: formData.category_id || null,
        status: publishNow ? 'published' : formData.status,
        published_at: publishNow ? new Date().toISOString() : (formData.status === 'published' ? new Date().toISOString() : null),
        reading_time: calcReadingTime(formData.content), tags: formData.tags || [],
        seo_title: formData.seo_title || null,
        meta_description: formData.meta_description || null,
        faqs: (formData.faqs || []).filter(f => f.question?.trim() && f.answer?.trim())
      }
      const res = await fetch(`/api/admin/posts/${postId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData)
      })
      if (!res.ok) { const err = await res.json(); toast.error(`Error: ${err.error}`); throw new Error(err.error) }
      toast.success('Post updated!')
      router.push('/admin/posts')
    } catch (err) { toast.error(`Failed: ${err.message}`) } finally { setSaving(false) }
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="p-8 max-w-5xl mx-auto flex items-center justify-center min-h-[50vh]">
          <div className="animate-spin w-8 h-8 border-4 border-plum border-t-transparent rounded-full" />
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="p-8 max-w-5xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <button onClick={() => router.back()} className="p-2.5 hover:bg-gray-100 rounded-xl transition-colors"><ArrowLeft size={20} /></button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Edit Post</h1>
            <p className="text-gray-500 mt-1">Update your blog post</p>
          </div>
        </div>
        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Post Title</label>
              <input type="text" value={formData.title} onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value, slug: makeSlug(e.target.value) }))} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-plum focus:border-plum outline-none text-lg" placeholder="Enter a catchy post title..." />
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Content</label>
              <RichTextEditor content={formData.content} onChange={handleContentChange} />
            </div>
          </div>
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-3 text-sm">Publishing</h3>
              <div className="space-y-3">
                <button onClick={() => handleSave(false)} disabled={saving} className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors disabled:opacity-50 text-sm">Save Changes</button>
                <button onClick={() => handleSave(true)} disabled={saving} className="w-full px-4 py-2 bg-plum text-ivory rounded-xl font-semibold hover:bg-plum/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2 text-sm">
                  <Save size={16} /> {saving ? 'Saving...' : 'Publish Post'}
                </button>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-100">
                <label className="flex items-center justify-center gap-2 w-full px-3 py-2 border-2 border-dashed border-gray-200 rounded-lg text-sm text-gray-500 hover:border-blue-400 hover:text-blue-500 transition-colors cursor-pointer">
                  <FileCode size={14} /> Import HTML
                  <input type="file" className="hidden" accept=".html,.htm" onChange={handleHtmlImport} />
                </label>
              </div>
            </div>
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-2 text-sm">Slug</h3>
              <input type="text" value={formData.slug} onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))} className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-plum focus:border-plum outline-none text-sm" />
            </div>
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-2 text-sm">Excerpt</h3>
              <textarea value={formData.excerpt} onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))} rows={3} className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-plum focus:border-plum outline-none resize-none text-sm" />
            </div>
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-2 text-sm">SEO Title</h3>
              <input type="text" value={formData.seo_title} onChange={(e) => setFormData(prev => ({ ...prev, seo_title: e.target.value }))} className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-plum focus:border-plum outline-none text-sm" />
            </div>
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-2 text-sm">Meta Description</h3>
              <textarea value={formData.meta_description} onChange={(e) => setFormData(prev => ({ ...prev, meta_description: e.target.value }))} rows={2} className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-plum focus:border-plum outline-none resize-none text-sm" />
            </div>
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-2 text-sm">Category</h3>
              <select value={formData.category_id} onChange={(e) => setFormData(prev => ({ ...prev, category_id: e.target.value }))} className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-plum focus:border-plum outline-none text-sm">
                <option value="">Select a category</option>
                {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
              </select>
            </div>
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900 text-sm">FAQs</h3>
                <label className="text-xs text-gray-400 hover:text-blue-500 cursor-pointer transition-colors">
                  Import JSON
                  <input type="file" className="hidden" accept=".json" onChange={handleFaqJsonImport} />
                </label>
              </div>
              <div className="space-y-3">
                {(formData.faqs || []).map((faq, i) => (
                  <div key={i} className="bg-gray-50 rounded-lg p-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-gray-500">FAQ {i + 1}</span>
                      <button type="button" onClick={() => setFormData(prev => ({ ...prev, faqs: prev.faqs.filter((_, j) => j !== i) }))} className="text-red-500 hover:text-red-700 text-xs">Remove</button>
                    </div>
                    <input type="text" value={faq.question} onChange={(e) => { const faqs = [...(formData.faqs || [])]; faqs[i] = { ...faqs[i], question: e.target.value }; setFormData(prev => ({ ...prev, faqs })) }} className="w-full px-3 py-1.5 rounded-lg border border-gray-200 text-sm" placeholder="Question?" />
                    <textarea value={faq.answer} onChange={(e) => { const faqs = [...(formData.faqs || [])]; faqs[i] = { ...faqs[i], answer: e.target.value }; setFormData(prev => ({ ...prev, faqs })) }} rows={2} className="w-full px-3 py-1.5 rounded-lg border border-gray-200 text-sm resize-none" placeholder="Answer..." />
                  </div>
                ))}
                <button type="button" onClick={() => setFormData(prev => ({ ...prev, faqs: [...(prev.faqs || []), { question: '', answer: '' }] }))} className="w-full px-3 py-2 border-2 border-dashed border-gray-200 rounded-lg text-sm text-gray-500 hover:border-plum hover:text-plum transition-colors">
                  + Add FAQ
                </button>
              </div>
            </div>
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-2 text-sm">Featured Image</h3>
              {formData.featured_image ? (
                <div className="space-y-3">
                  <div className="aspect-[16/9] bg-gray-100 rounded-xl overflow-hidden relative">
                    <img src={formData.featured_image} alt="Featured" className="w-full h-full object-cover" />
                    <button onClick={() => setFormData(prev => ({ ...prev, featured_image: '' }))} className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600"><X size={14} /></button>
                  </div>
                  <input type="url" value={formData.featured_image} onChange={(e) => setFormData(prev => ({ ...prev, featured_image: e.target.value }))} className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-plum outline-none text-xs" placeholder="Or paste image URL..." />
                </div>
              ) : (
                <div className="space-y-3">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-plum transition-colors">
                    <Upload size={24} className="text-gray-400 mb-2" />
                    <p className="text-xs text-gray-500">{uploading ? 'Uploading...' : 'Click or drag image'}</p>
                    <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} disabled={uploading} />
                  </label>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
