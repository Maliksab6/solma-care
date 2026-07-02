import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'
import siteConfig from '@/lib/config'

export const metadata = {
  title: 'Terms & Disclaimer',
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
            Terms &amp; Disclaimer
          </h1>
          <div className="w-12 h-0.5 bg-brand-400 mt-8 mb-10"></div>

          <div className="space-y-6 text-gray-500 text-lg leading-relaxed">
            <p>
              Welcome to <strong className="text-ink">{siteConfig.name}</strong>. Please read the following
              carefully before using this site. By using {siteConfig.url}, you agree to the terms below.
            </p>

            <h2 className="text-xl font-semibold text-ink pt-4">Educational Purpose Only</h2>
            <p>
              The content published on {siteConfig.name} is intended for general educational and
              informational purposes only. Nothing on this site constitutes medical advice or a
              diagnosis for your specific situation. Always consult with a qualified healthcare
              professional before making decisions based on the content found here.
            </p>

            <h2 className="text-xl font-semibold text-ink pt-4">No Doctor-Patient Relationship</h2>
            <p>
              Reading this site, submitting a question through the Contact page, or receiving a reply
              from {siteConfig.author} does not create a doctor-patient relationship between you and
              {siteConfig.author}. Any general information shared through this site, including personal
              replies to reader questions, is educational in nature.
            </p>

            <h2 className="text-xl font-semibold text-ink pt-4">Accuracy and Updates</h2>
            <p>
              While every effort is made to ensure content is accurate and reflects current medical
              understanding at the time of publication, {siteConfig.name} makes no guarantee that all
              information remains current, complete, or applicable to your specific situation. Medical
              knowledge evolves — always verify critical decisions with your healthcare provider.
            </p>

            <h2 className="text-xl font-semibold text-ink pt-4">Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, {siteConfig.name} and {siteConfig.author} disclaim
              all liability for any loss, injury, or damage arising from the use of, reliance on, or
              inability to access this site or its content. Use of this site is at your own risk and
              constitutes acceptance of these terms.
            </p>

            <h2 className="text-xl font-semibold text-ink pt-4">Indemnification</h2>
            <p>
              By using this site, you agree to hold {siteConfig.name} and {siteConfig.author} harmless
              from any claims, damages, or expenses (including legal fees) arising from your use of the
              site, your reliance on its content, or your violation of these terms.
            </p>

            <h2 className="text-xl font-semibold text-ink pt-4">External Links</h2>
            <p>
              This site may contain links to external websites. {siteConfig.name} has no control over
              and assumes no responsibility for the content, privacy policies, or practices of any
              third-party sites.
            </p>

            <h2 className="text-xl font-semibold text-ink pt-4">Changes to These Terms</h2>
            <p>
              These terms may be updated from time to time to reflect changes in the site, applicable
              law, or how {siteConfig.name} operates. Continued use of the site after changes are
              posted constitutes acceptance of the revised terms.
            </p>

            <h2 className="text-xl font-semibold text-ink pt-4">Contact</h2>
            <p>
              For questions, collaborations, or general inquiries, use the{' '}
              <a href="/contact" className="text-brand-600 hover:text-brand-700 underline underline-offset-2">
                Contact page
              </a>.
            </p>
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}
