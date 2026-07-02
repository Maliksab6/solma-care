import Link from 'next/link'
import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'
import PostCard from '@/components/blog/PostCard'
import { JsonLd } from '@/components/common/JsonLd'
import { createClient as createServerClient } from '@/lib/supabaseServer'
import siteConfig from '@/lib/config'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function Home() {
  const supabase = createServerClient()

  const posts = supabase
    ? (await supabase.from('posts').select('*, category:categories(*)').eq('status', 'published').order('created_at', { ascending: false }).limit(4)).data || []
    : []

  const categories = supabase
    ? (await supabase.from('categories').select('*').order('created_at', { ascending: true })).data || []
    : []

  return (
    <>
      <Header />
      <main className="min-h-screen">

        {/* HERO — Dark */}
        <section className="bg-ink text-white relative">
          <div className="max-w-6xl mx-auto px-6 py-24 md:py-32">
            <p className="text-sm font-medium tracking-widest uppercase text-gray-400 mb-12">
              Solma Care
            </p>
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-6xl font-semibold leading-tight tracking-tight">
                Solma Care — Your results were{' '}
                <span className="text-brand-400">&lsquo;normal&rsquo;</span>.
                <br />
                Your body disagreed.
              </h1>
              <p className="mt-6 text-lg md:text-xl text-gray-400 max-w-xl leading-relaxed">
                Evidence-based health guidance for South Asian women dealing with 
                PCOS, insulin resistance, thyroid conditions, and the diagnoses 
                that get missed.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link href="/articles" className="inline-block bg-brand-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-brand-700 transition-colors">
                  Explore Topics
                </Link>
                <Link href="/about" className="inline-block border border-gray-500 text-gray-400 px-6 py-3 rounded-lg font-medium hover:border-white hover:text-white transition-colors">
                  About Solma Care
                </Link>
              </div>
            </div>
            <div className="mt-16 md:absolute md:right-12 md:top-1/2 md:-translate-y-1/2 flex md:flex-col gap-8 md:gap-10">
              <div>
                <p className="text-3xl font-bold text-brand-400">1.87%</p>
                <p className="text-sm text-gray-400 mt-1 max-w-[200px]">of South Asian women correctly diagnosed on first visit</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-accent">70%</p>
                <p className="text-sm text-gray-400 mt-1">with PCOS are undiagnosed</p>
              </div>
            </div>
          </div>
        </section>

        {/* CATEGORIES — Light */}
        <section className="bg-surface-muted border-y border-surface-border">
          <div className="max-w-6xl mx-auto px-6 py-16 md:py-20">
            <p className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-8">Topics</p>
            {categories.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">No topics yet. Create categories in the admin panel.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-px bg-surface-border rounded-xl overflow-hidden">
                {categories.map((cat) => (
                  <Link key={cat.id} href={`/topics/${cat.slug}`} className="bg-surface-muted p-6 hover:bg-white transition-colors group">
                    <p className="text-xs font-medium text-accent mb-2">{cat.slug}</p>
                    <h2 className="text-sm font-semibold text-ink group-hover:text-brand-700 transition-colors leading-snug">{cat.name}</h2>
                    {cat.description && <p className="text-xs text-gray-500 mt-2 leading-relaxed">{cat.description}</p>}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ABOUT — Medium */}
        <section className="bg-surface-raised">
          <div className="max-w-2xl mx-auto px-6 py-20 md:py-24 text-center">
            <h2 className="text-2xl md:text-3xl font-semibold text-ink tracking-tight">What is Solma Care?</h2>
            <div className="w-12 h-0.5 bg-brand-400 mx-auto mt-6 mb-8"></div>
            <p className="text-gray-500 leading-relaxed text-lg">
              Solma Care is an evidence-based health resource built specifically for 
              South Asian women dealing with PCOS, insulin resistance, thyroid conditions, 
              and other commonly missed diagnoses.
            </p>
            <p className="text-gray-500 leading-relaxed text-lg mt-4">
              If you&rsquo;ve been told your labs are &ldquo;normal&rdquo; but your body 
              tells a different story — you&rsquo;re in the right place.
            </p>
            <p className="text-gray-400 text-sm mt-8">By Salma Tabbsum</p>
          </div>
        </section>

        {/* ARTICLES — White */}
        <section className="bg-white">
          <div className="max-w-6xl mx-auto px-6 py-20 md:py-24">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-2">Latest</p>
                <h2 className="text-2xl md:text-3xl font-semibold text-ink tracking-tight">Recent Articles</h2>
              </div>
              <Link href="/articles" className="text-sm font-medium text-brand-700 hover:text-brand-800 transition-colors hidden md:block">View all →</Link>
            </div>
            {posts.length === 0 ? (
              <div className="text-center py-20 bg-surface-muted rounded-2xl border border-surface-border">
                <h3 className="text-xl font-semibold text-ink">No articles yet</h3>
                <p className="text-gray-500 mt-2">Create your first post from the admin panel!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {posts.map((post, i) => (
                  <PostCard key={post.id} post={post} index={i} />
                ))}
              </div>
            )}
            <div className="mt-8 text-center md:hidden">
              <Link href="/articles" className="text-sm font-medium text-brand-700">View all articles →</Link>
            </div>
          </div>
        </section>

        {/* NEWSLETTER */}
        <section className="bg-surface-muted border-t border-surface-border">
          <div className="max-w-2xl mx-auto px-6 py-16 md:py-20 text-center">
            <h2 className="text-2xl font-semibold text-ink tracking-tight">Stay informed</h2>
            <p className="text-gray-500 mt-3 text-lg">
              Physician-reviewed articles on hormonal health for South Asian women. No spam.
            </p>
            <form className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto" action="/api/newsletter" method="POST">
              <label htmlFor="newsletter-email-home" className="sr-only">Email address</label>
              <input
                id="newsletter-email-home"
                type="email"
                required
                placeholder="Your email"
                className="flex-1 bg-white border border-surface-border rounded-lg px-4 py-3 text-sm text-ink placeholder-gray-400 focus:outline-none focus:border-brand-500"
              />
              <button type="submit" className="bg-brand-600 text-white px-6 py-3 rounded-lg font-medium text-sm hover:bg-brand-700 transition-colors">
                Subscribe
              </button>
            </form>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
