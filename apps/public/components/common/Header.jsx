'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import siteConfig from '@/lib/config'

export default function Header() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [scrolled, setScrolled] = useState(false)
  const searchRef = useRef(null)
  const supabase = createClient()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!searchQuery.trim()) { setSuggestions([]); return }
    const timeout = setTimeout(async () => {
      if (!supabase) { setSuggestions([]); return }
      const { data } = await supabase
        .from('posts')
        .select('id, title, slug, category:categories(name)')
        .eq('status', 'published')
        .ilike('title', `%${searchQuery}%`)
        .limit(5)
      setSuggestions(data || [])
    }, 300)
    return () => clearTimeout(timeout)
  }, [searchQuery])

  useEffect(() => {
    function handleClickOutside(e) {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchOpen(false)
        setSuggestions([])
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  function handleSearch(e) {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/blog?q=${encodeURIComponent(searchQuery)}`
      setSearchOpen(false)
      setSearchQuery('')
    }
  }

  const navLinks = [
    { href: '/articles', label: 'Articles' },
    { href: '/topics', label: 'Topics' },
    { href: '/about', label: 'About' },
    { href: '/newsletter', label: 'Newsletter' },
  ]

  return (
    <>
      <div className="bg-ink text-white text-center text-xs sm:text-sm py-2 px-4">
        <Link href="/articles" className="hover:underline">
          New: Why your PCOS looks different from the textbook — the South
          Asian phenotype, explained →
        </Link>
      </div>

      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md border-b border-surface-border shadow-sm'
            : 'bg-white/95 backdrop-blur border-b border-surface-border'
        }`}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 sm:px-6 py-4">
          <Link href="/" className="text-lg font-bold text-brand-600 hover:text-brand-700 transition-colors">
            Solma Care
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm text-gray-500">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`hover:text-brand-700 transition-colors ${
                  pathname.startsWith(href) ? 'text-brand-700 font-medium' : ''
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="relative hidden md:block" ref={searchRef}>
              <div
                className={`flex items-center gap-2 transition-all duration-300 overflow-hidden ${
                  searchOpen
                    ? 'w-52 bg-surface-muted border border-surface-border rounded-lg px-4 py-1.5 shadow-sm'
                    : 'w-9'
                }`}
              >
                {searchOpen && (
                  <form onSubmit={handleSearch} className="flex-1 flex items-center gap-2">
                    <input
                      autoFocus
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      onKeyDown={e => e.key === 'Escape' && setSearchOpen(false)}
                      placeholder="Search articles..."
                      className="flex-1 bg-transparent text-sm text-ink placeholder-gray-400 outline-none"
                    />
                  </form>
                )}
                <button
                  onClick={() => { setSearchOpen(v => !v); setSearchQuery(''); setSuggestions([]) }}
                  className="w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-brand-700 hover:bg-brand-50 transition-colors shrink-0"
                  aria-label="Toggle search"
                >
                  {searchOpen ? (
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  ) : (
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                      <circle cx="11" cy="11" r="7" />
                      <path d="M21 21l-4.35-4.35" />
                    </svg>
                  )}
                </button>
              </div>
              {searchOpen && suggestions.length > 0 && (
                <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-xl shadow-xl border border-surface-border overflow-hidden z-50">
                  <ul className="divide-y divide-surface-border">
                    {suggestions.map(p => (
                      <li key={p.id}>
                        <Link href={`/articles/${p.slug}`} onClick={() => { setSearchOpen(false); setSearchQuery(''); setSuggestions([]) }} className="flex flex-col px-4 py-2.5 hover:bg-surface-muted transition-colors">
                          <span className="text-sm font-medium text-ink">{p.title}</span>
                          {p.category && <span className="text-xs text-accent">{p.category.name}</span>}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <Link
              href="/contact"
              className="rounded-full bg-brand-600 text-white text-xs sm:text-sm px-3 sm:px-5 py-1.5 sm:py-2 hover:bg-brand-700 transition-colors whitespace-nowrap"
            >
              Ask a question
            </Link>

            <button
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-md text-ink hover:bg-surface-muted transition-colors"
              onClick={() => setMobileOpen(v => !v)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                  <path d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden border-t border-surface-border bg-white px-4 pt-3 pb-5">
            <div className="flex flex-col gap-1">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    pathname.startsWith(href)
                      ? 'bg-brand-600 text-white'
                      : 'text-gray-600 hover:bg-brand-50 hover:text-brand-700'
                  }`}
                >
                  {label}
                </Link>
              ))}
              <div className="mt-3 pt-3 border-t border-surface-border">
                <form onSubmit={handleSearch} className="flex items-center gap-2">
                  <input
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Search articles..."
                    className="flex-1 bg-surface-muted border border-surface-border rounded-lg px-4 py-2 text-sm text-ink placeholder-gray-400 outline-none focus:border-brand-500"
                  />
                  <button type="submit" className="p-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition-colors shrink-0" aria-label="Search">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  )
}
