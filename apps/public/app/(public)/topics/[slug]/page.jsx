import Link from 'next/link'
import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'
import PostCard from '@/components/blog/PostCard'
import { createClient as createServerClient } from '@/lib/supabaseServer'
import siteConfig from '@/lib/config'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }) {
  const supabase = createServerClient()
  if (!supabase) return { title: 'Topic' }
  const { data: category } = await supabase
    .from('categories')
    .select('name, description')
    .eq('slug', params.slug)
    .single()

  if (!category) return { title: 'Topic Not Found' }

  return {
    title: category.name,
    description: category.description || `Articles about ${category.name} for South Asian women.`,
    alternates: { canonical: `${siteConfig.url}/topics/${params.slug}` },
  }
}

export default async function TopicPage({ params }) {
  const supabase = createServerClient()

  if (!supabase) {
    return (
      <>
        <Header />
        <main className="min-h-screen flex items-center justify-center bg-ivory">
          <div className="text-center">
            <p className="text-ink2">Connecting to database…</p>
            <Link href="/topics" className="text-terracotta hover:underline mt-4 inline-block">Back to Topics</Link>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  const { data: category } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', params.slug)
    .single()

  if (!category) {
    return (
      <>
        <Header />
        <main className="min-h-screen flex items-center justify-center bg-ivory">
          <div className="text-center">
            <h1 className="text-2xl font-serif font-bold text-plum">Topic not found</h1>
            <Link href="/topics" className="text-terracotta hover:underline mt-4 inline-block">Back to Topics</Link>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  const { data: posts } = await supabase
    .from('posts')
    .select('*, category:categories(*)')
    .eq('status', 'published')
    .eq('category_id', category?.id)
    .order('created_at', { ascending: false })

  return (
    <>
      <Header />
      <main className="min-h-screen bg-ivory">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-12 pb-20">
          <nav className="text-sm text-ink2 flex items-center gap-2 mb-6">
            <Link href="/" className="hover:text-plum">Home</Link>
            <span>/</span>
            <Link href="/topics" className="hover:text-plum">Topics</Link>
            <span>/</span>
            <span className="text-ink">{category.name}</span>
          </nav>

          <p className="text-xs uppercase tracking-widest text-terracotta mb-3">Topic</p>
          <h1 className="font-serif text-4xl sm:text-5xl text-plum mb-4">{category.name}</h1>
          {category.description && (
            <p className="text-ink2 max-w-2xl mb-12">{category.description}</p>
          )}

          {!posts || posts.length === 0 ? (
            <div className="text-center py-20 bg-ivory2 rounded-2xl border border-ink/10">
              <h3 className="text-xl font-serif font-semibold text-plum">No articles yet</h3>
              <p className="text-ink2 mt-2">Check back soon for articles on this topic.</p>
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
