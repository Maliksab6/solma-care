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

  const categoryColors = {
    'pcos': { border: 'border-terracotta', text: 'text-terracotta', bg: 'bg-terracotta/10' },
    'metabolic-health': { border: 'border-plum', text: 'text-plum', bg: 'bg-plum/10' },
    'fertility': { border: 'border-sage', text: 'text-sage', bg: 'bg-sage/10' },
    'missed-conditions': { border: 'border-gold', text: 'text-gold', bg: 'bg-gold/10' },
    'living-with-it': { border: 'border-violet', text: 'text-violet', bg: 'bg-violet/10' },
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-ivory">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-12 pb-20">
          <p className="text-xs uppercase tracking-widest text-terracotta mb-3">Topics</p>
          <h1 className="font-serif text-4xl sm:text-5xl text-plum mb-4">What We Cover</h1>
          <p className="text-ink2 max-w-2xl mb-12">
            Physician-reviewed information organized by the conditions and
            experiences most relevant to South Asian women.
          </p>

          {!categories || categories.length === 0 ? (
            <div className="text-center py-20 bg-ivory2 rounded-2xl border border-ink/10">
              <h3 className="text-xl font-serif font-semibold text-plum">No topics yet</h3>
              <p className="text-ink2 mt-2">Categories will appear here once created in the admin panel.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((cat) => {
                const colors = categoryColors[cat.slug] || { border: 'border-terracotta', text: 'text-terracotta', bg: 'bg-terracotta/10' }
                return (
                  <Link
                    key={cat.id}
                    href={`/topics/${cat.slug}`}
                    className={`block p-6 bg-ivory2/60 hover:bg-ivory2 border-l-2 ${colors.border} rounded-r-lg transition-all hover:shadow-md group`}
                  >
                    <h2 className="font-serif text-xl text-ink mb-2 group-hover:text-plum transition-colors">
                      {cat.name}
                    </h2>
                    {cat.description && (
                      <p className="text-sm text-ink2">{cat.description}</p>
                    )}
                    <span className={`inline-block mt-4 text-xs font-medium ${colors.text}`}>
                      Browse articles →
                    </span>
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
