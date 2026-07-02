'use client'

import { useEffect, useState } from 'react'
import AdminLayout from '@/components/admin/layout/AdminLayout'
import { createClient } from '@/lib/supabase'
import { Plus, Trash2, Edit, Save, X } from 'lucide-react'
import toast from 'react-hot-toast'
import { makeSlug } from '@/lib/utils'

export default function CategoriesPage() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null)
  const [newCat, setNewCat] = useState({ name: '', description: '', color: '#C4622D' })
  const supabase = createClient()

  useEffect(() => { loadCategories() }, [])

  async function loadCategories() {
    try { const res = await fetch('/api/admin/categories'); const json = await res.json(); setCategories(json.data || []) } catch { toast.error('Failed to load') } finally { setLoading(false) }
  }

  async function addCategory() {
    if (!newCat.name.trim()) { toast.error('Name required'); return }
    try {
      const res = await fetch('/api/admin/categories', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: newCat.name, slug: makeSlug(newCat.name), description: newCat.description, color: newCat.color }) })
      if (!res.ok) { const err = await res.json(); throw new Error(err.error) }
      toast.success('Category added')
      setNewCat({ name: '', description: '', color: '#C4622D' })
      loadCategories()
    } catch (err) { toast.error(err.message) }
  }

  async function updateCategory(id, updates) {
    try {
      const res = await fetch(`/api/admin/categories/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(updates) })
      if (!res.ok) { const err = await res.json(); throw new Error(err.error) }
      toast.success('Updated')
      setEditing(null)
      loadCategories()
    } catch (err) { toast.error(err.message) }
  }

  async function deleteCategory(id) {
    if (!confirm('Delete this category?')) return
    try {
      const res = await fetch(`/api/admin/categories/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Failed')
      toast.success('Deleted')
      loadCategories()
    } catch (err) { toast.error(err.message) }
  }

  return (
    <AdminLayout>
      <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Categories</h1>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-8">
          <h2 className="font-semibold text-gray-900 mb-4 text-sm">Add New Category</h2>
          <div className="flex flex-col sm:flex-row gap-3">
            <input type="text" value={newCat.name} onChange={e => setNewCat(p => ({ ...p, name: e.target.value }))} placeholder="Category name" className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-plum focus:border-plum outline-none text-sm" />
            <input type="text" value={newCat.description} onChange={e => setNewCat(p => ({ ...p, description: e.target.value }))} placeholder="Description (optional)" className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-plum focus:border-plum outline-none text-sm" />
            <input type="color" value={newCat.color} onChange={e => setNewCat(p => ({ ...p, color: e.target.value }))} className="w-12 h-10 rounded-lg border border-gray-200 cursor-pointer" />
            <button onClick={addCategory} className="bg-plum text-ivory px-5 py-2.5 rounded-xl font-semibold hover:bg-plum/90 transition-colors text-sm flex items-center gap-2">
              <Plus size={16} /> Add
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          {loading ? (
            <div className="p-12 text-center"><div className="animate-spin w-8 h-8 border-4 border-plum border-t-transparent rounded-full mx-auto" /></div>
          ) : categories.length === 0 ? (
            <div className="p-12 text-center text-gray-500">No categories yet</div>
          ) : (
            <div className="divide-y divide-gray-50">
              {categories.map(cat => (
                <div key={cat.id} className="p-4 flex items-center gap-4">
                  {editing === cat.id ? (
                    <>
                      <input type="text" defaultValue={cat.name} id={`name-${cat.id}`} className="flex-1 px-3 py-2 rounded-lg border border-gray-200 text-sm" />
                      <input type="text" defaultValue={cat.description || ''} id={`desc-${cat.id}`} className="flex-1 px-3 py-2 rounded-lg border border-gray-200 text-sm" />
                      <button onClick={() => updateCategory(cat.id, { name: document.getElementById(`name-${cat.id}`).value, slug: makeSlug(document.getElementById(`name-${cat.id}`).value), description: document.getElementById(`desc-${cat.id}`).value })} className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg"><Save size={16} /></button>
                      <button onClick={() => setEditing(null)} className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg"><X size={16} /></button>
                    </>
                  ) : (
                    <>
                      <div className="w-4 h-4 rounded-full shrink-0" style={{ backgroundColor: cat.color }} />
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 text-sm">{cat.name}</p>
                        {cat.description && <p className="text-xs text-gray-500">{cat.description}</p>}
                      </div>
                      <span className="text-xs text-gray-400">{cat.slug}</span>
                      <button onClick={() => setEditing(cat.id)} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg"><Edit size={16} /></button>
                      <button onClick={() => deleteCategory(cat.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"><Trash2 size={16} /></button>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  )
}
