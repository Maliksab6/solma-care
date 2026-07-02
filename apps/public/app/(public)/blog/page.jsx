import Link from 'next/link'
import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'
import PostCard from '@/components/blog/PostCard'
import { createClient as createServerClient } from '@/lib/supabaseServer'
import siteConfig from '@/lib/config'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function generateMetadata({ searchParams }) {
  const q = searchParams?.q || ''
  const title = q ? `Search: "${q}"` : 'All Articles'
  return {
    title,
    description: q
      ? `Search results for "${q}" on ${siteConfig.name}`
      : `Browse all physician-reviewed articles on hormonal health for South Asian women.`,
    alternates: { canonical: `${siteConfig.url}/blog` },
  }
}

export default async function BlogPage({ searchParams }) {
  const supabase = createServerClient()
  const q = searchParams?.q || ''

  let posts = []
  let categories = []

  if (supabase) {
    let query = supabase
      .from('posts')
      .select('*, category:categories(*)')
      .eq('status', 'published')
      .order('created_at', { ascending: false })

    if (q) {
      query = query.ilike('title', `%${q}%`)
    }

    const [postsResult, categoriesResult] = await Promise.all([
      query,
      supabase.from('categories').select('*').order('created_at', { ascending: true }),
    ])

    posts = postsResult.data || []
    categories = categoriesResult.data || []
  }

  return (
    <>
      <Header />
      <main className="min-h-screen">
        <section className="bg-surface-muted border-b border-surface-border">
          <div className="max-w-6xl mx-auto px-6 py-8 md:py-10">
            <p className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-3">Articles</p>
            <h1 className="text-3xl md:text-4xl font-semibold text-ink tracking-tight">
              {q ? `Search: "${q}"` : 'All Articles'}
            </h1>
            <p className="text-gray-500 mt-2 max-w-2xl text-base">
              Physician-reviewed articles on PCOS, insulin resistance, thyroid,
              fertility, and the conditions doctors keep calling normal.
            </p>
          </div>
        </section>

        {categories.length > 0 && (
          <section className="bg-white border-b border-surface-border">
            <div className="max-w-6xl mx-auto px-6 py-4">
              <div className="flex flex-wrap gap-2">
                <Link href="/articles" className={`px-4 py-1.5 rounded-full text-sm font-medium ${!q ? 'bg-ink text-white' : 'text-gray-500 border border-surface-border hover:border-brand-500 hover:text-brand-700'} transition-colors`}>All</Link>
                {categories.map((cat) => (
                  <Link key={cat.id} href={`/topics/${cat.slug}`} className="px-4 py-1.5 rounded-full text-sm font-medium text-gray-500 border border-surface-border hover:border-brand-500 hover:text-brand-700 transition-colors">{cat.name}</Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="bg-white">
          <div className="max-w-6xl mx-auto px-6 py-12 md:py-16">
            {posts.length === 0 ? (
              <div className="text-center py-20 bg-surface-muted rounded-2xl border border-surface-border">
                <h3 className="text-xl font-semibold text-ink">{q ? 'No articles found' : 'No articles yet'}</h3>
                <p className="text-gray-500 mt-2">{q ? 'Try a different search term.' : 'Check back soon — we publish physician-reviewed content regularly.'}</p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post, i) => (
                  <PostCard key={post.id} post={post} index={i} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
