import Link from 'next/link'
import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'
import PostCard from '@/components/blog/PostCard'
import { JsonLd } from '@/components/common/JsonLd'
import { createClient as createServerClient } from '@/lib/supabaseServer'
import siteConfig from '@/lib/config'

export const dynamic = 'force-dynamic'

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
      <main className="min-h-screen bg-ivory">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-12 pb-20">
          <div className="mb-10">
            <p className="text-xs uppercase tracking-widest text-terracotta mb-3">Articles</p>
            <h1 className="font-serif text-4xl sm:text-5xl text-plum mb-4">
              {q ? `Search: "${q}"` : 'All Articles'}
            </h1>
            <p className="text-ink2 max-w-2xl">
              Physician-reviewed articles on PCOS, insulin resistance, thyroid,
              fertility, and the conditions doctors keep calling normal.
            </p>
          </div>

          {categories && categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-10">
              <Link
                href="/articles"
                className={`px-4 py-1.5 rounded-full border text-sm transition-colors ${
                  !q ? 'border-plum text-plum bg-plum/5' : 'border-ink/15 text-ink2 hover:border-plum hover:text-plum'
                }`}
              >
                All
              </Link>
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/topics/${cat.slug}`}
                  className="px-4 py-1.5 rounded-full border border-ink/15 text-sm text-ink2 hover:border-plum hover:text-plum transition-colors"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          )}

          {!posts || posts.length === 0 ? (
            <div className="text-center py-20 bg-ivory2 rounded-2xl border border-ink/10">
              <h3 className="text-xl font-serif font-semibold text-plum">
                {q ? 'No articles found' : 'No articles yet'}
              </h3>
              <p className="text-ink2 mt-2">
                {q ? 'Try a different search term.' : 'Check back soon — we publish physician-reviewed content regularly.'}
              </p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post, i) => (
                <PostCard key={post.id} post={post} index={i} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
