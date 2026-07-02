import Link from 'next/link'
import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'
import { createClient as createServerClient } from '@/lib/supabaseServer'
import siteConfig from '@/lib/config'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Topics',
  description: 'Browse articles by topic — PCOS, metabolic health, fertility, thyroid, and living with hormonal conditions as a South Asian woman.',
  alternates: { canonical: `${siteConfig.url}/topics` },
}

export default async function TopicsPage() {
  const supabase = createServerClient()
  const categories = supabase
    ? (await supabase.from('categories').select('*').order('created_at', { ascending: true })).data || []
    : []

  return (
    <>
      <Header />
      <main className="min-h-screen bg-surface-muted border-b border-surface-border">
        <div className="max-w-6xl mx-auto px-6 py-8 md:py-10">
          <p className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-3">Topics</p>
          <h1 className="text-3xl md:text-4xl font-semibold text-ink tracking-tight">What We Cover</h1>
          <p className="text-gray-500 mt-2 max-w-2xl text-base">
            Physician-reviewed information organized by the conditions and 
            experiences most relevant to South Asian women.
          </p>
        </div>
      </main>

      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-6 py-12 md:py-16">
          {categories.length === 0 ? (
            <div className="text-center py-20 bg-surface-muted rounded-2xl border border-surface-border">
              <h3 className="text-xl font-semibold text-ink">No topics yet</h3>
              <p className="text-gray-500 mt-2">Categories will appear here once created in the admin panel.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((cat) => (
                <Link key={cat.id} href={`/topics/${cat.slug}`} className="group block bg-surface-muted border border-surface-border rounded-xl p-6 hover:border-accent hover:bg-white transition-all duration-200">
                  <p className="text-xs font-medium text-accent mb-2">{cat.slug}</p>
                  <h2 className="text-lg font-semibold text-ink group-hover:text-brand-700 transition-colors">{cat.name}</h2>
                  {cat.description && <p className="text-sm text-gray-500 mt-2 leading-relaxed">{cat.description}</p>}
                  <p className="text-xs text-brand-700 font-medium mt-4">Browse articles →</p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
      <Footer />
    </>
  )
}
