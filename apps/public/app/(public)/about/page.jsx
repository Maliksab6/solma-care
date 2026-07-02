import Link from 'next/link'
import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'
import { JsonLd } from '@/components/common/JsonLd'
import siteConfig from '@/lib/config'

export const metadata = {
  title: 'About Solma Care — Who We Are',
  description: 'Solma Care was founded by Salma Tabbsum to help South Asian women in Pakistan and India get accurate, evidence-based health information about PCOS, thyroid conditions, and metabolic health.',
  alternates: { canonical: `${siteConfig.url}/about` },
}

export default function AboutPage() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Salma Tabbsum",
    "description": "Founder of Solma Care — evidence-based health resource for South Asian women.",
    "url": `${siteConfig.url}/about`,
    "sameAs": [
      "https://instagram.com/solmacare",
      "https://tiktok.com/@solmacare",
      "https://pinterest.com/solmacare",
    ],
  }

  return (
    <>
      <JsonLd data={personSchema} />
      <Header />
      <main className="min-h-screen bg-white">
        <article className="max-w-3xl mx-auto px-6 py-16 md:py-24">
          <p className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-4">About</p>
          <h1 className="text-3xl md:text-5xl font-semibold text-ink tracking-tight leading-tight">
            About Solma Care
          </h1>
          <div className="w-12 h-0.5 bg-brand-400 mt-8 mb-10"></div>

          <div className="space-y-6 text-gray-500 text-lg leading-relaxed">
            <p>
              <strong className="text-ink">Solma Care</strong> is an evidence-based health resource 
              built specifically for South Asian women dealing with PCOS, insulin resistance, 
              thyroid conditions, and other commonly missed diagnoses.
            </p>
            <p>
              Founded by <strong className="text-ink">Salma Tabbsum</strong>, Solma Care was created 
              because the standard health advice available online doesn&rsquo;t account for how South Asian 
              women&rsquo;s bodies work — from genetic predispositions to dietary patterns to the cultural 
              context of seeking care.
            </p>
            <p>
              Our mission is simple: provide accurate, culturally-aware health information for 
              women in <strong className="text-ink">Pakistan and India</strong> who&rsquo;ve been told 
              their results are &ldquo;normal&rdquo; while their bodies tell a different story.
            </p>
          </div>

          <div className="mt-16">
            <h2 className="text-xl font-semibold text-ink mb-6">What We Cover</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { num: '01', title: 'PCOS & Hormonal Health', desc: 'Symptoms, diagnosis gaps, and why standard advice fails South Asian women.' },
                { num: '02', title: 'Metabolic Health & Insulin Resistance', desc: 'Insulin resistance, prediabetes, and metabolic syndrome.' },
                { num: '03', title: 'Thyroid & Commonly Missed Conditions', desc: "Hypothyroidism, vague symptoms, and diagnoses dismissed as 'just stress.'" },
                { num: '04', title: 'Fertility, Pregnancy & Postpartum', desc: 'Fertility challenges and postpartum recovery specific to our bodies.' },
                { num: '05', title: 'Living With It', desc: 'Daily management, mental health, and family conversations.' },
              ].map((item) => (
                <div key={item.num} className="bg-surface-muted border border-surface-border rounded-xl p-5">
                  <p className="text-xs font-medium text-accent mb-1">{item.num}</p>
                  <h3 className="font-semibold text-ink text-sm">{item.title}</h3>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 bg-surface-muted border border-surface-border rounded-2xl p-8 text-center">
            <h2 className="text-xl font-semibold text-ink">Have a question?</h2>
            <p className="text-gray-500 mt-2">We read every message. If we can&rsquo;t help, we&rsquo;ll point you to someone who can.</p>
            <Link href="/contact" className="inline-block mt-6 bg-brand-600 text-white px-6 py-3 rounded-lg font-medium text-sm hover:bg-brand-700 transition-colors">
              Contact Us
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}
