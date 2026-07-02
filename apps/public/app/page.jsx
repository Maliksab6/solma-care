import Link from 'next/link'
import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'
import PostCard from '@/components/blog/PostCard'
import { JsonLd } from '@/components/common/JsonLd'
import { createClient as createServerClient } from '@/lib/supabaseServer'
import siteConfig from '@/lib/config'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const supabase = createServerClient()

  const posts = supabase
    ? (await supabase.from('posts').select('*, category:categories(*)').eq('status', 'published').order('created_at', { ascending: false }).limit(6)).data || []
    : []

  const categories = supabase
    ? (await supabase.from('categories').select('*').order('created_at', { ascending: true })).data || []
    : []

  const pillars = [
    { n: '01', title: 'PCOS & Hormonal Health', desc: 'The entry point — and the most underserved category relative to demand.', color: 'text-terracotta', border: 'hover:border-t-terracotta', href: '/topics/pcos' },
    { n: '02', title: 'Metabolic Health', desc: 'Higher visceral fat at lower BMI. Earlier risk. Reference ranges built for someone else.', color: 'text-plum', border: 'hover:border-t-plum', href: '/topics/metabolic-health' },
    { n: '03', title: 'Fertility & Postpartum', desc: 'Through a South Asian cultural lens — including the conversations at family dinners.', color: 'text-sage', border: 'hover:border-t-sage', href: '/topics/fertility' },
    { n: '04', title: 'Commonly Missed Conditions', desc: 'Anemia, thyroid, vitamin D — common in South Asian women, dismissed in clinic.', color: 'text-gold', border: 'hover:border-t-gold', href: '/topics/missed-conditions' },
    { n: '05', title: 'Living With It', desc: 'Family pressure, stigma, food at gatherings. Lived cultural fluency, not just medicine.', color: 'text-violet', border: 'hover:border-t-violet', href: '/topics/living-with-it' },
  ]

  return (
    <>
      <Header />
      <main>
        {/* HERO */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-14 sm:pt-20 pb-16 grid md:grid-cols-2 gap-12 items-start">
          <div>
            <p className="text-xs uppercase tracking-widest text-terracotta font-sans mb-4">
              For South Asian women
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl leading-[1.1] text-plum">
              Your results were &ldquo;normal.&rdquo; Your body disagreed.
            </h1>
            <div className="gap-line" aria-hidden="true">
              <span>Here is why</span>
            </div>
            <p className="text-ink2 leading-relaxed mb-8">
              South Asian women with PCOS, insulin resistance, and thyroid
              conditions are routinely told their results are fine — because
              the reference ranges were built on someone else&rsquo;s body.
              Solma Care exists to close that gap: clinician-reviewed hormonal
              health information written through the lens of who you actually
              are.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/articles"
                className="bg-plum text-ivory px-6 py-3 rounded-full text-sm hover:bg-terracotta transition-colors"
              >
                Start reading
              </Link>
              <Link
                href="/about"
                className="border border-plum text-plum px-6 py-3 rounded-full text-sm hover:bg-plum hover:text-ivory transition-colors"
              >
                Our approach →
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-4 overflow-x-auto sm:overflow-visible">
            <div className="border-l-4 border-terracotta bg-ivory2 rounded-r-lg p-5 min-w-[260px]">
              <p className="font-serif text-3xl text-plum mb-1">1.87%</p>
              <p className="text-sm text-ink2">
                Average annual rise in PCOS prevalence across South Asia,
                1990–2021.
              </p>
            </div>
            <div className="border-l-4 border-plum bg-ivory2 rounded-r-lg p-5 min-w-[260px]">
              <p className="font-serif text-3xl text-plum mb-1">&ldquo;Normal&rdquo;</p>
              <p className="text-sm text-ink2">
                South Asian women frequently show insulin resistance despite
                levels within standard reference ranges — built for a
                different population.
              </p>
            </div>
            <div className="border-l-4 border-sage bg-ivory2 rounded-r-lg p-5 min-w-[260px]">
              <p className="font-serif text-3xl text-plum mb-1">45.7%</p>
              <p className="text-sm text-ink2">
                Of South Asian women with PCOS also meet criteria for
                Metabolic Syndrome.
              </p>
            </div>
            <div className="border-l-2 border-gold pl-4 text-xs text-ink2">
              Every clinical claim on this site is sourced from PubMed, ACOG,
              NIH, or StatPearls and reviewed by a licensed physician before
              publication.
            </div>
          </div>
        </section>

        {/* TRUST BAR */}
        <section className="bg-plum text-ivory">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 flex flex-wrap justify-center gap-x-10 gap-y-3 text-xs sm:text-sm">
            {[
              "Physician-reviewed, every article",
              "Sources: PubMed · ACOG · NIH · StatPearls",
              "South Asian cultural context, not borrowed advice",
              "No brand sponsorships or paid placements",
              "Free, always",
            ].map((item) => (
              <span key={item} className="flex items-center gap-2">
                <span className="text-gold">✓</span> {item}
              </span>
            ))}
          </div>
        </section>

        {/* PILLARS */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
          <div className="flex items-center gap-4 mb-10">
            <p className="text-xs uppercase tracking-widest text-sage whitespace-nowrap">
              What we cover
            </p>
            <div className="h-px flex-1 bg-ink/10" />
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-5 border border-ink/10 divide-y divide-ink/10 md:divide-y-0 md:divide-x">
            {pillars.map((p) => (
              <Link
                key={p.n}
                href={p.href}
                className={`p-6 border-t-2 border-t-transparent transition-colors ${p.border} group`}
              >
                <p className={`font-serif text-3xl mb-4 text-ink/20 group-hover:${p.color} transition-colors`}>
                  {p.n}
                </p>
                <p className="font-serif text-lg text-ink mb-2">{p.title}</p>
                <p className="text-sm text-ink2">{p.desc}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* ARTICLES */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
          <div className="flex items-center gap-4 mb-10">
            <p className="text-xs uppercase tracking-widest text-sage whitespace-nowrap">
              Recently published
            </p>
            <div className="h-px flex-1 bg-ink/10" />
            <Link href="/articles" className="text-sm text-terracotta font-medium hover:underline whitespace-nowrap">
              View all →
            </Link>
          </div>
          {posts.length === 0 ? (
            <div className="text-center py-20 bg-ivory2 rounded-2xl border border-ink/10">
              <h3 className="text-xl font-serif font-semibold text-plum">No posts yet</h3>
              <p className="text-ink2 mt-2">Create your first post from the admin panel!</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post, i) => (
                <PostCard key={post.id} post={post} index={i} />
              ))}
            </div>
          )}
        </section>

        {/* EDITORIAL STRIP */}
        <section className="bg-ivory2">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-ink/10">
            {[
              { label: "Why this exists", line: "The research was there. Nobody had translated it for us." },
              { label: "How we review", line: "Every clinical claim checked before it reaches you." },
              { label: "What this is not", line: "A diagnosis. A prescription. A substitute for your doctor." },
            ].map((item) => (
              <div key={item.label} className="px-0 md:px-8 py-6 md:py-0 first:pl-0">
                <p className="text-xs uppercase tracking-widest text-sage mb-3">{item.label}</p>
                <p className="font-serif italic text-xl text-plum mb-2">{item.line}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA STRIP */}
        <section className="bg-plum text-ivory text-center">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 py-20">
            <p className="text-xs uppercase tracking-widest text-gold mb-4">Ask anything</p>
            <h2 className="font-serif text-3xl sm:text-4xl mb-4">
              Have a question your doctor hasn&rsquo;t answered properly?
            </h2>
            <p className="text-ivory/75 mb-8">
              Every question submitted here is read personally. The best ones
              become the next article.
            </p>
            <Link
              href="/contact"
              className="inline-block border border-gold text-gold px-7 py-3 rounded-full text-sm hover:bg-gold hover:text-plum transition-colors"
            >
              Submit your question
            </Link>
          </div>
        </section>

        {/* NEWSLETTER */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="font-serif text-3xl text-plum mb-3">
              Slow, careful, worth the wait.
            </h2>
            <p className="text-ink2 mb-4 max-w-md">
              No content mill. No daily emails. Just well-researched articles,
              sent when there&rsquo;s something worth reading.
            </p>
            <span className="inline-block bg-sage/15 text-sage text-xs px-3 py-1 rounded-full">
              Physician-reviewed content only
            </span>
          </div>
          <form className="flex flex-col sm:flex-row gap-3" action="/api/newsletter" method="POST">
            <label htmlFor="newsletter-email-home" className="sr-only">Email address</label>
            <input
              id="newsletter-email-home"
              type="email"
              required
              placeholder="you@email.com"
              className="flex-1 rounded-full border border-ink/15 bg-white px-5 py-3 text-sm focus:border-plum outline-none"
            />
            <button
              type="submit"
              className="bg-plum text-ivory px-6 py-3 rounded-full text-sm hover:bg-terracotta transition-colors"
            >
              Subscribe
            </button>
          </form>
        </section>
      </main>
      <Footer />
    </>
  )
}
