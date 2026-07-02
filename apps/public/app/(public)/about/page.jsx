import Link from 'next/link'
import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'
import { JsonLd } from '@/components/common/JsonLd'
import siteConfig from '@/lib/config'

export const metadata = {
  title: 'About Solma Care',
  description: 'Why Solma Care exists, who writes it, and how every article is reviewed by a licensed physician before publication.',
  alternates: { canonical: `${siteConfig.url}/about` },
}

export default function AboutPage() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": siteConfig.author,
    "description": siteConfig.authorBio,
    "url": `${siteConfig.url}/about`,
    "sameAs": Object.values(siteConfig.social).filter(Boolean),
  }

  return (
    <>
      <JsonLd data={personSchema} />
      <Header />
      <main className="min-h-screen bg-ivory">
        <article className="max-w-prose mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <p className="text-xs uppercase tracking-widest text-terracotta mb-4">About Solma Care</p>
          <h1 className="font-serif text-4xl text-plum leading-tight mb-8">
            I started reading the research myself. This is what I found.
          </h1>

          <div className="flex items-center gap-4 mb-10 pb-10 border-b border-ink/10">
            <div className="w-16 h-16 rounded-full bg-ivory2 border border-ink/10 shrink-0 overflow-hidden">
              <img src="/profile.png" alt={siteConfig.author} className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="font-serif text-lg text-ink">{siteConfig.author}</p>
              <p className="text-xs uppercase tracking-wide text-terracotta">
                Researcher · Writer · South Asian woman who has been there
              </p>
            </div>
          </div>

          <div className="space-y-6 text-ink leading-relaxed">
            <p>
              I was forty-three when I finally understood what had been
              happening in my body for two decades. Not because my doctor
              explained it. Because I started reading the research myself —
              PubMed papers, clinical guidelines, studies most people never see
              because they&rsquo;re written for other clinicians, not for
              patients.
            </p>
            <p>
              What I found, over and over, was the same gap. Reference ranges
              for insulin, thyroid, and hormone panels were built on Western
              populations. South Asian women can sit comfortably inside those
              ranges while already showing insulin resistance, PCOS symptoms, or
              thyroid dysfunction that a South-Asian-calibrated range would have
              flagged years earlier. We are told we are &ldquo;normal.&rdquo;
              Our bodies disagree.
            </p>
            <p>
              Solma Care is my attempt to close that gap for other women going
              through the same thing — not with opinions, but with the same
              research I went looking for myself, translated into something
              readable.
            </p>

            <h2 className="font-serif text-2xl text-plum pt-6">
              A note on who I am — and who I am not
            </h2>
            <p>
              I am a researcher and a writer. I am not a doctor, and I am not
              claiming to be one. My role on this site is to find the evidence,
              explain it clearly, and write from lived experience as a South
              Asian woman who has navigated these conditions herself. Nothing
              here is a diagnosis or a prescription.
            </p>

            <h2 id="medical-review-policy" className="font-serif text-2xl text-plum pt-6">
              Our medical review policy
            </h2>
            <p>
              Every article on Solma Care is reviewed by a licensed physician
              before it is published. For privacy reasons, our reviewing
              physician is not named publicly on the site — this is a deliberate
              choice, not an oversight, and it does not change the rigor of the
              review. What it means in practice:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Every clinical claim is sourced from primary literature — PubMed, ACOG, NIH, or StatPearls — not from other blogs or secondary summaries.</li>
              <li>A licensed physician reviews each article for medical accuracy before it goes live.</li>
              <li>Articles are updated when new research materially changes the picture.</li>
              <li>Nothing on this site replaces an in-person evaluation by your own doctor.</li>
            </ul>

            <h2 className="font-serif text-2xl text-plum pt-6">Our mission</h2>
            <p>
              To give South Asian women the information they need to advocate
              for themselves in the exam room — clearly, without jargon, and
              without pretending a blog post can replace a doctor.
            </p>
          </div>

          <div className="mt-14 pt-8 border-t border-ink/10 flex flex-wrap gap-4">
            <Link href="/articles" className="bg-plum text-ivory px-6 py-3 rounded-full text-sm hover:bg-terracotta transition-colors">
              Start reading
            </Link>
            <Link href="/contact" className="border border-plum text-plum px-6 py-3 rounded-full text-sm hover:bg-plum hover:text-ivory transition-colors">
              Ask a question →
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}
