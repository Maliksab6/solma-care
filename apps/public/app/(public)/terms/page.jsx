import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'
import siteConfig from '@/lib/config'

export const metadata = {
  title: 'Terms of Use, Privacy & Medical Disclaimer',
  description: "Solma Care's terms of use, privacy policy, medical disclaimer, and affiliate disclosure.",
  alternates: { canonical: `${siteConfig.url}/terms` },
}

const lastUpdated = 'July 2, 2026'

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-ivory">
        <article className="max-w-prose mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <p className="text-xs uppercase tracking-widest text-terracotta mb-4">Legal</p>
          <h1 className="font-serif text-4xl text-plum leading-tight mb-3">Terms of Use &amp; Policies</h1>
          <p className="text-sm text-ink2 mb-10">Last updated: {lastUpdated}</p>

          <nav className="flex flex-wrap gap-3 mb-12 pb-8 border-b border-ink/10 text-sm">
            <a href="#terms-of-use" className="text-terracotta hover:underline">Terms of Use</a>
            <span className="text-ink/20">·</span>
            <a href="#medical-disclaimer" className="text-terracotta hover:underline">Medical Disclaimer</a>
            <span className="text-ink/20">·</span>
            <a href="#privacy" className="text-terracotta hover:underline">Privacy Policy</a>
            <span className="text-ink/20">·</span>
            <a href="#affiliate" className="text-terracotta hover:underline">Affiliate Disclosure</a>
          </nav>

          <div className="space-y-16 text-ink leading-relaxed">
            <section id="terms-of-use" className="scroll-mt-24">
              <h2 className="font-serif text-2xl text-plum mb-4">Terms of Use</h2>
              <div className="space-y-4">
                <p>By using Solma Care (&ldquo;the site&rdquo;), you agree to these terms. If you do not agree, please do not use the site.</p>
                <p><strong>Content ownership.</strong> All articles, graphics, and original content on this site are owned by Solma Care unless otherwise credited. You may share links and short excerpts with attribution, but you may not republish full articles without written permission.</p>
                <p><strong>No professional relationship.</strong> Using this site, submitting a question through our contact form, or subscribing to our newsletter does not create a doctor-patient or any other professional relationship between you and Solma Care or its contributors.</p>
                <p><strong>Changes.</strong> We may update these terms from time to time. Continued use of the site after changes are posted means you accept the updated terms.</p>
              </div>
            </section>

            <section id="medical-disclaimer" className="scroll-mt-24">
              <h2 className="font-serif text-2xl text-plum mb-4">Medical Disclaimer</h2>
              <div className="bg-ivory2 border-l-2 border-gold rounded-r-lg p-5 space-y-4">
                <p>The content on Solma Care is for educational and informational purposes only. It is not intended to be, and should not be taken as, medical advice, diagnosis, or treatment.</p>
                <p>Every article is reviewed by a licensed physician for medical accuracy before publication. That review confirms the information reflects current evidence — it does not make the content a substitute for individualized care from your own doctor, who knows your history, your labs, and your body.</p>
                <p>Always talk to a qualified healthcare provider before making any decisions about your health, starting or stopping any treatment or supplement, or acting on anything you read here. If you think you may be experiencing a medical emergency, call your local emergency number immediately.</p>
              </div>
            </section>

            <section id="privacy" className="scroll-mt-24">
              <h2 className="font-serif text-2xl text-plum mb-4">Privacy Policy</h2>
              <div className="space-y-4">
                <p>We respect your privacy. This section explains what information we collect and how we use it.</p>
                <p><strong>What we collect.</strong> If you subscribe to our newsletter, we collect your email address. If you submit a question through our contact form, we collect your name, email, and message. We also collect standard analytics data (pages visited, general location, device type) to understand how the site is used.</p>
                <p><strong>How we use it.</strong> We use your email to send the newsletter you signed up for and to respond to questions you submit. We do not sell your personal information to third parties.</p>
                <p><strong>Cookies.</strong> This site may use cookies for basic analytics and functionality. You can disable cookies in your browser settings; some features may not work as intended if you do.</p>
                <p><strong>Your choices.</strong> You can unsubscribe from the newsletter at any time using the link in any email. To request deletion of your data, contact us through our <a href="/contact" className="text-terracotta hover:underline">contact page</a>.</p>
              </div>
            </section>

            <section id="affiliate" className="scroll-mt-24">
              <h2 className="font-serif text-2xl text-plum mb-4">Affiliate Disclosure</h2>
              <div className="space-y-4">
                <p>Some links on Solma Care are affiliate links. If you click one and make a purchase, we may earn a small commission at no additional cost to you.</p>
                <p>We only link to products we believe are genuinely worth considering based on the evidence discussed in the article. Affiliate relationships never influence what our physician reviewer confirms as medically accurate.</p>
                <p>Solma Care does not accept brand sponsorships or paid placements — this is a standing commitment to our readers, not a claim we make lightly.</p>
              </div>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}
