import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'
import siteConfig from '@/lib/config'

export const metadata = {
  title: 'Terms & Conditions',
  description: `Terms, disclaimer, and conditions for using ${siteConfig.name}. Please read carefully before using this site.`,
  alternates: { canonical: `${siteConfig.url}/terms` },
}

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <article className="max-w-3xl mx-auto px-6 py-16 md:py-24">
          <p className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-4">Legal</p>
          <h1 className="text-3xl md:text-5xl font-semibold text-ink tracking-tight leading-tight">
            Terms &amp; Conditions
          </h1>
          <div className="w-12 h-0.5 bg-brand-400 mt-8 mb-4"></div>
          <p className="text-sm text-gray-400 mb-10">Effective date: July 2026 &middot; Website: {siteConfig.name} ({siteConfig.url}) &middot; Operated by: Salma, founder of {siteConfig.name}</p>

          <div className="space-y-8 text-gray-500 text-base leading-relaxed">

            <section>
              <h2 className="text-xl font-semibold text-ink mb-3">1. This Is Educational Information, Not Medical Advice</h2>
              <p className="mb-3">
                Everything published on {siteConfig.name} — every article, guide, FAQ, newsletter, and piece of
                content in any format — is written for general educational and informational purposes only.
              </p>
              <p className="mb-3">
                Nothing on this site constitutes medical advice, a clinical diagnosis, or a treatment recommendation
                for your individual situation. Reading an article on {siteConfig.name} is not equivalent to a
                consultation with a licensed physician, gynaecologist, endocrinologist, or any other medical professional.
              </p>
              <p>
                Your health is individual. Your history, your medications, your test results, your family background,
                and dozens of other factors affect what is appropriate for you specifically. Content written for a
                general audience cannot account for that specificity. It is not designed to.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-ink mb-3">2. Always Consult a Licensed Medical Professional</h2>
              <p className="mb-3">
                Nothing you read on this site should replace, delay, or cause you to disregard advice from a
                qualified healthcare provider who knows your individual medical history.
              </p>
              <p className="mb-3">
                If you are experiencing symptoms that concern you — irregular periods, unexplained weight changes,
                fatigue, pain, mood changes, or anything else — please consult a licensed doctor. Do not use this
                website as a substitute for that consultation.
              </p>
              <p>
                If you are experiencing a medical emergency, contact your local emergency services immediately. Do
                not search the internet. Do not read health articles. Call for help.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-ink mb-3">3. Our Medical Review Process</h2>
              <p className="mb-3">
                {siteConfig.name} articles are reviewed by a licensed physician before publication. This review is
                conducted to check clinical accuracy against current published medical literature — primarily
                PubMed-indexed research, ACOG guidelines, NIH publications, and StatPearls.
              </p>
              <p className="mb-3">
                This review process does not constitute a doctor-patient relationship between you and the reviewing
                physician. The reviewer does not know your individual circumstances, has not examined you, and is
                not responsible for any decisions you make based on content published on this site.
              </p>
              <p>
                The existence of physician review means our content is checked for clinical accuracy. It does not
                mean our content is tailored to your specific health situation.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-ink mb-3">4. South Asian Health Context</h2>
              <p className="mb-3">
                {siteConfig.name} publishes content specifically contextualised for South Asian women. This includes
                references to South Asian-specific research, dietary patterns, cultural practices, and health risk
                profiles.
              </p>
              <p>
                This contextualisation is provided for educational purposes. It does not mean that every piece of
                content applies equally to every South Asian woman, or that content not specifically contextualised
                for South Asian women is inapplicable to you. Health is individual regardless of ethnicity or background.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-ink mb-3">5. Affiliate Disclosure</h2>
              <p className="mb-3">
                {siteConfig.name} participates in affiliate marketing programmes. This means that some links on this
                site may earn a small commission if you make a purchase through them, at no additional cost to you.
              </p>
              <p className="mb-3">
                Affiliate relationships do not influence what is recommended on this site. Products and resources are
                referenced based on their relevance and quality relative to the topic being discussed, not based on
                commercial incentive. We do not accept paid placements or sponsored content that presents advertising
                as editorial content.
              </p>
              <p>
                When affiliate links are present, this will be disclosed clearly at the point of use.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-ink mb-3">6. No Brand Sponsorships or Paid Placements</h2>
              <p>
                {siteConfig.name} does not accept payment from brands, pharmaceutical companies, supplement
                manufacturers, or any other commercial entity in exchange for editorial coverage, product
                recommendations, or positive mentions in articles. This is a stated commitment of this publication
                and a core part of what we believe our readers deserve.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-ink mb-3">7. Accuracy and Currency of Information</h2>
              <p>
                Medical knowledge evolves. Research is updated. Guidelines change. While every effort is made to
                ensure that content on {siteConfig.name} is accurate and current at the time of publication, we
                cannot guarantee that all information remains up to date after publication. If you are making any
                health decision based on information you have read here, please verify that information is current
                with your healthcare provider before acting on it.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-ink mb-3">8. External Links</h2>
              <p>
                {siteConfig.name} may link to external websites, research papers, or resources for reference
                purposes. These links are provided for convenience and do not constitute endorsement of the
                content, accuracy, or practices of those external sites. We have no control over external content
                and accept no responsibility for it.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-ink mb-3">9. Limitation of Liability</h2>
              <p>
                To the fullest extent permitted by applicable law, {siteConfig.name} and its founder, contributors,
                and physician reviewers accept no liability for any loss, harm, or negative outcome — physical,
                psychological, financial, or otherwise — arising from decisions made based on content published on
                this site. By using this website you acknowledge that you are doing so voluntarily, that you have
                read and understood this disclaimer, and that you accept responsibility for how you use the
                information provided.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-ink mb-3">10. Privacy</h2>
              <p>
                {siteConfig.name} collects email addresses for newsletter subscription purposes. We do not sell,
                share, or transfer your personal information to third parties for commercial purposes. Email
                subscribers can unsubscribe at any time with a single click. A full Privacy Policy is available
                separately on this site.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-ink mb-3">11. Intellectual Property</h2>
              <p>
                All original content on {siteConfig.name} — including articles, graphics, design elements, and
                written copy — is the intellectual property of {siteConfig.name} and its founder. You may share
                links to articles and quote brief excerpts for non-commercial purposes with clear attribution.
                You may not reproduce full articles, copy content to other websites, or use {siteConfig.name}
                content for commercial purposes without written permission.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-ink mb-3">12. Changes to These Terms</h2>
              <p>
                These terms may be updated periodically. The effective date at the top of this page reflects the
                most recent revision. Continued use of this site after any update constitutes acceptance of the
                revised terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-ink mb-3">13. Contact</h2>
              <p className="mb-3">
                If you have questions about these terms, the content on this site, or our medical review process,
                please use the contact form on our{' '}
                <a href="/contact" className="text-brand-600 hover:text-brand-700 underline underline-offset-2">
                  Ask {siteConfig.name} page
                </a>.
              </p>
              <p>
                For medical questions about your own health, please consult a licensed healthcare provider — not
                this website.
              </p>
            </section>

            <div className="pt-6 border-t border-surface-border text-sm text-gray-400">
              <p>{siteConfig.name} &middot; {siteConfig.url} &middot; Educational content only</p>
            </div>

          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}
