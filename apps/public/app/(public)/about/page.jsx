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
            About {siteConfig.name}
          </h1>
          <div className="w-12 h-0.5 bg-brand-400 mt-8 mb-10"></div>

          <div className="space-y-6 text-gray-500 text-lg leading-relaxed">
            <p>
              Hi, I&rsquo;m Salma.
            </p>
            <p>
              For most of my thirties, I was the woman who held everything together. The household. The children.
              The family obligations. The constant, invisible labour of being the one everyone else relied on.
            </p>
            <p>
              What I was not doing was paying attention to myself.
            </p>
            <p>
              The tiredness I dismissed as being a working mother. The weight gathering around my middle despite
              eating carefully — I assumed that was just getting older. The periods that became unpredictable,
              sometimes arriving heavy and relentless, sometimes disappearing for months at a time — I told myself
              it was stress. The anxiety that sat in my chest without a clear reason — I assumed that was just life.
            </p>
            <p>
              I was in my early forties before I finally stopped dismissing and started asking questions.
            </p>
          </div>

          <div className="mt-16">
            <h2 className="text-2xl font-semibold text-ink mb-6">What I Found — And What Nobody Had Told Me</h2>
            <div className="space-y-6 text-gray-500 text-lg leading-relaxed">
              <p>
                When I began researching properly, I discovered something that changed everything.
              </p>
              <p>
                The symptoms I had been living with for years were not random. They were connected. And they had
                names. PCOS. Insulin resistance. Hormonal imbalance. Subclinical hypothyroidism. Vitamin D
                deficiency so severe it was affecting my mood, my energy, and my immune function.
              </p>
              <p>
                None of these were things my doctors had proactively looked for. When I raised them, I was often
                told my results were normal — that I was within range, that I should manage my stress, that these
                things happened to women my age.
              </p>
              <p>
                What I eventually learned — after months of reading research papers, clinical guidelines, and studies
                I had to teach myself to interpret — was that &ldquo;normal&rdquo; is complicated. Many of the
                reference ranges used in standard blood tests were established on populations that did not include
                South Asian women. Our bodies respond differently to insulin. Our risk profiles for certain
                conditions are higher. Our presentation of PCOS, thyroid dysfunction, and metabolic disease often
                looks different from what the textbooks describe.
              </p>
              <p className="font-medium text-ink">
                We were being measured against a ruler that was never built for us.
              </p>
            </div>
          </div>

          <div className="mt-16">
            <h2 className="text-2xl font-semibold text-ink mb-6">Why I Built This</h2>
            <div className="space-y-6 text-gray-500 text-lg leading-relaxed">
              <p>
                I am not a doctor. I want to be completely clear about that.
              </p>
              <p>
                I am a South Asian woman who spent two years reading everything I could find — PubMed studies,
                clinical guidelines from ACOG and NIH, research specifically on South Asian women&rsquo;s health —
                and slowly piecing together an understanding of my own body that no single doctor&rsquo;s appointment
                had ever given me.
              </p>
              <p>
                Every article on {siteConfig.name} is written by me, researched from primary medical sources, and
                reviewed by a licensed physician before it is published. The goal is not to replace your doctor. It
                is to give you the knowledge to have a better conversation with your doctor — to walk in knowing what
                questions to ask, what tests to request, and what &ldquo;within normal range&rdquo; actually means
                for a body like yours.
              </p>
              <p>
                I also wanted to build something that understood the full context of being a South Asian woman
                navigating health.
              </p>
              <p>
                Not just the clinical picture — but the reality of being told by your mother that irregular periods
                are normal because she had them too. The difficulty of explaining hormonal weight gain to a family
                that sees it as a discipline problem. The particular loneliness of sitting in a doctor&rsquo;s office
                describing symptoms and being sent home with advice to reduce stress and lose weight. The shame that
                has been built around women&rsquo;s bodies in our communities, and how that shame delays diagnosis
                by years.
              </p>
              <p>
                {siteConfig.name} is built for all of that. The clinical and the cultural together, because you
                cannot separate them.
              </p>
            </div>
          </div>

          <div className="mt-16">
            <h2 className="text-2xl font-semibold text-ink mb-6">What You Will Find Here</h2>
            <div className="space-y-6 text-gray-500 text-lg leading-relaxed">
              <p>
                Every topic on this site starts with a real question — one I had, or one that came from a woman in
                a situation I recognised.
              </p>
              <p>
                The research behind each article comes from peer-reviewed medical literature. The language is plain
                enough that you do not need a medical degree to understand it. And the cultural context is written
                by someone who grew up eating the same food, navigating the same family dynamics, and hearing the
                same things from the same aunties.
              </p>
              <p>
                You will find articles on PCOS and what it actually looks like in South Asian women. On insulin
                resistance that does not show up on a standard fasting glucose test. On thyroid conditions that are
                dismissed because TSH sits within a reference range that may not apply to you. On the vitamin and
                mineral deficiencies that are so common in our community they have become almost invisible. And on
                the parts of women&rsquo;s health that are harder to talk about — fertility pressure, the grief of
                hormonal loss, the conversations you have to have with people who do not understand what you are
                going through.
              </p>
            </div>
          </div>

          <div className="mt-16 bg-surface-muted border border-surface-border rounded-2xl p-8">
            <h2 className="text-xl font-semibold text-ink mb-4">A Note on Medical Review</h2>
            <p className="text-gray-500 leading-relaxed mb-4">
              Every article on {siteConfig.name} is reviewed by a licensed physician before publication. Clinical
              claims are sourced from PubMed, ACOG guidelines, NIH publications, and StatPearls.
            </p>
            <p className="text-gray-500 leading-relaxed">
              This site does not provide medical diagnoses or treatment recommendations for your individual
              situation. It provides information — the kind of thorough, properly sourced, culturally relevant
              information that helps you become a more informed participant in your own healthcare.
            </p>
            <p className="text-gray-500 leading-relaxed mt-4">
              If something you read here prompts a question, take it to your doctor. That is exactly what it is
              meant to do.
            </p>
          </div>

          <div className="mt-16 space-y-6 text-gray-500 text-lg leading-relaxed">
            <h2 className="text-2xl font-semibold text-ink mb-6">Because You Deserve Answers</h2>
            <p>
              Not vague reassurance. Not &ldquo;this is normal for your age.&rdquo; Not advice built on research
              that never included a woman who looks like you.
            </p>
            <p className="font-medium text-ink">
              Real answers. Properly sourced. Written for you specifically.
            </p>
            <p>
              That is what {siteConfig.name} is here for.
            </p>
            <p className="text-sm text-gray-400 mt-8">
              — Salma, founder of {siteConfig.name}
            </p>
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
