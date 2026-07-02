import Link from 'next/link'
import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'
import PostCard from '@/components/blog/PostCard'
import CommentSection from '@/components/blog/CommentSection'
import TableOfContents, { MobileTableOfContents } from '@/components/blog/TableOfContents'
import { extractHeadings, addHeadingIds } from '@/lib/headings'
import { JsonLd } from '@/components/common/JsonLd'
import { createClient as createServerClient } from '@/lib/supabaseServer'
import { formatDate } from '@/lib/utils'
import siteConfig from '@/lib/config'
import { Calendar, Clock, Tag, ArrowLeft } from 'lucide-react'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function generateMetadata({ params }) {
  const supabase = createServerClient()
  if (!supabase) return { title: 'Article' }
  const { data: post } = await supabase
    .from('posts')
    .select('*, category:categories(*)')
    .eq('slug', params.slug)
    .eq('status', 'published')
    .single()

  if (!post) return { title: 'Post Not Found' }

  const postUrl = `${siteConfig.url}/articles/${post.slug}`

  return {
    title: post.seo_title || post.title,
    description: post.meta_description || post.excerpt,
    alternates: { canonical: postUrl },
    openGraph: {
      title: post.seo_title || post.title,
      description: post.meta_description || post.excerpt,
      url: postUrl,
      siteName: siteConfig.name,
      images: post.featured_image
        ? [{ url: post.featured_image, width: 1200, height: 630, alt: post.title }]
        : [],
      locale: 'en_US',
      type: 'article',
      publishedTime: post.created_at,
      modifiedTime: post.updated_at || post.created_at,
      authors: [siteConfig.author],
      tags: post.tags || [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.seo_title || post.title,
      description: post.meta_description || post.excerpt,
      images: post.featured_image ? [post.featured_image] : [],
    },
  }
}

function getReadingTime(content) {
  if (!content) return 1
  const wordCount = content.replace(/<[^>]*>/g, '').split(/\s+/).length
  return Math.max(1, Math.ceil(wordCount / 200))
}

function cleanContent(content) {
  if (!content) return '<p>No content yet.</p>'
  let cleaned = content.trim()

  cleaned = cleaned.replace(/<\/?html[^>]*>/gi, '')
  cleaned = cleaned.replace(/<\/?body[^>]*>/gi, '')
  cleaned = cleaned.replace(/<head[\s\S]*?<\/head>/gi, '')
  cleaned = cleaned.replace(/<\/?o:[^>]*>/gi, '')
  cleaned = cleaned.replace(/<\/?v:[^>]*>/gi, '')
  cleaned = cleaned.replace(/<\/?w:[^>]*>/gi, '')

  const preserved = []
  cleaned = cleaned.replace(/<table[\s\S]*?<\/table>/gi, (match) => {
    preserved.push(match)
    return `%%PRESERVED_${preserved.length - 1}%%`
  })

  cleaned = cleaned.replace(/<p[^>]*>(?:\s|&nbsp;)*<strong>([^<]{3,80})<\/strong>(?:\s|&nbsp;)*(?:<\/p>|<br\s*\/?>)/gi, (match, title) => {
    const t = title.trim()
    if (!t || t.endsWith(':') || t.endsWith('.') || t.length > 70) return match
    return `<h2>${t}</h2>`
  })
  cleaned = cleaned.replace(/<p[^>]*>(?:\s|&nbsp;)*<em><strong>([^<]{3,80})<\/strong><\/em>(?:\s|&nbsp;)*(?:<\/p>|<br\s*\/?>)/gi, (match, title) => {
    const t = title.trim()
    if (!t || t.endsWith(':') || t.length > 70) return match
    return `<h2>${t}</h2>`
  })

  cleaned = cleaned.replace(/%%PRESERVED_(\d+)%%/gi, (_, i) => preserved[parseInt(i)])

  const firstTagMatch = cleaned.match(/^\s*<(h[1-3]|img)[^>]*>/i)
  if (firstTagMatch && firstTagMatch[1].toLowerCase().startsWith('h')) {
    cleaned = cleaned.replace(/^\s*<h[1-3][^>]*>[\s\S]*?<\/h[1-3]>\s*/i, '')
    cleaned = cleaned.replace(/^\s*<p[^>]*>([^.<]{1,99})<\/p>\s*/i, '')
  }

  cleaned = addHeadingIds(cleaned)

  cleaned = cleaned.replace(/<img([^>]*?)>/gi, (match, attrs) => {
    const hasClass = attrs.toLowerCase().includes('class=')
    if (hasClass) {
      return match.replace(/class="([^"]*)"/i, (cMatch, cContent) => `class="w-full h-auto rounded-xl ${cContent}"`)
    } else {
      return `<img class="w-full h-auto rounded-xl" ${attrs}>`
    }
  })

  cleaned = cleaned.replace(/<p[^>]*>\s*<\/p>/gi, '')
  cleaned = cleaned.replace(/ {2,}/g, ' ')
  cleaned = cleaned.replace(/>\s*\n\s*</g, '><')
  cleaned = cleaned.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
  cleaned = cleaned.replace(/<iframe[^>]*>[\s\S]*?<\/iframe>/gi, '')
  cleaned = cleaned.replace(/ on\w+="[^"]*"/gi, '')
  cleaned = cleaned.replace(/javascript:/gi, '')

  return cleaned || '<p>No content yet.</p>'
}

export default async function PostPage({ params }) {
  const supabase = createServerClient()

  if (!supabase) {
    return (
      <>
        <Header />
        <main className="min-h-screen flex items-center justify-center bg-ivory">
          <div className="text-center">
            <p className="text-ink2">Connecting to database…</p>
            <Link href="/articles" className="text-terracotta hover:underline mt-4 inline-block">Back to Articles</Link>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  const { data: post } = await supabase
    .from('posts')
    .select('*, category:categories(*)')
    .eq('slug', params.slug)
    .eq('status', 'published')
    .single()

  if (!post) {
    return (
      <>
        <Header />
        <main className="min-h-screen flex items-center justify-center bg-ivory">
          <div className="text-center">
            <h1 className="text-2xl font-serif font-bold text-plum">Post not found</h1>
            <Link href="/articles" className="text-terracotta hover:underline mt-4 inline-block">
              Back to Articles
            </Link>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  const { data: related } = await supabase
    .from('posts')
    .select('*, category:categories(*)')
    .eq('status', 'published')
    .neq('id', post.id)
    .order('created_at', { ascending: false })
    .limit(3)

  const postUrl = `${siteConfig.url}/articles/${post.slug}`
  const readingTime = getReadingTime(post.content)

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.seo_title || post.title,
    "description": post.meta_description || post.excerpt,
    "image": post.featured_image || `${siteConfig.url}/og-image.jpg`,
    "datePublished": post.created_at,
    "dateModified": post.updated_at || post.created_at,
    "url": postUrl,
    "author": {
      "@type": "Person",
      "name": siteConfig.author,
      "url": `${siteConfig.url}/about`
    },
    "publisher": {
      "@type": "Organization",
      "name": siteConfig.name,
      "url": siteConfig.url,
      "logo": { "@type": "ImageObject", "url": `${siteConfig.url}/logo.png` }
    },
    "mainEntityOfPage": { "@type": "WebPage", "@id": postUrl },
    ...(post.category && { "articleSection": post.category.name })
  }

  const faqSchema = post.faqs && post.faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": post.faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": { "@type": "Answer", "text": faq.answer }
    }))
  } : null

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": siteConfig.url },
      { "@type": "ListItem", "position": 2, "name": "Articles", "item": `${siteConfig.url}/articles` },
      { "@type": "ListItem", "position": 3, "name": post.title, "item": postUrl }
    ]
  }

  const rawContent = post.content || ''
  const processedContent = cleanContent(rawContent)
  const headings = extractHeadings(processedContent)

  const categoryColors = {
    'pcos': 'bg-terracotta/10 text-terracotta',
    'metabolic-health': 'bg-plum/10 text-plum',
    'fertility': 'bg-sage/10 text-sage',
    'missed-conditions': 'bg-gold/10 text-gold',
    'living-with-it': 'bg-violet/10 text-violet',
  }
  const catColor = post.category?.slug ? (categoryColors[post.category.slug] || 'bg-terracotta/10 text-terracotta') : 'bg-terracotta/10 text-terracotta'

  return (
    <>
      <JsonLd data={articleSchema} />
      {faqSchema && <JsonLd data={faqSchema} />}
      <JsonLd data={breadcrumbSchema} />
      <Header />
      <article className="min-h-screen bg-ivory pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-8">
          <nav className="text-sm text-ink2 flex items-center gap-2" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-plum">Home</Link>
            <span>/</span>
            <Link href="/articles" className="hover:text-plum">Articles</Link>
            <span>/</span>
            {post.category && (
              <>
                <Link href={`/topics/${post.category.slug}`} className="hover:text-plum">{post.category.name}</Link>
                <span>/</span>
              </>
            )}
            <span className="text-ink truncate max-w-xs">{post.title}</span>
          </nav>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
          <Link href="/articles" className="inline-flex items-center gap-2 text-terracotta font-medium mb-4 hover:underline text-sm">
            <ArrowLeft size={14} /> Back to Articles
          </Link>

          {post.category && (
            <div className="mb-4">
              <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${catColor}`}>
                <Tag size={12} />
                {post.category.name}
              </span>
            </div>
          )}

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-plum leading-tight mb-6">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-ink2 mb-8 pb-8 border-b border-ink/10">
            <div className="flex items-center gap-1.5">
              <Calendar size={14} />
              {formatDate(post.published_at || post.created_at)}
            </div>
            <span className="text-ink/20">|</span>
            <div className="flex items-center gap-1.5">
              <Clock size={14} />
              {readingTime} min read
            </div>
            {post.view_count > 0 && (
              <>
                <span className="text-ink/20">|</span>
                <span>{post.view_count} views</span>
              </>
            )}
          </div>

          {post.featured_image && (
            <div className="mb-10 rounded-2xl overflow-hidden shadow-lg">
              <img
                src={post.featured_image}
                alt={post.title}
                className="w-full h-64 sm:h-80 object-cover"
                loading="eager"
                width="1200"
                height="630"
              />
            </div>
          )}

          {post.excerpt && (
            <div className="mb-8 p-5 rounded-xl border-l-4 border-terracotta bg-terracotta/5">
              <p className="text-ink text-lg leading-relaxed font-medium italic font-serif">
                {post.excerpt}
              </p>
            </div>
          )}

          <MobileTableOfContents headings={headings} />

          <div className="flex gap-6 lg:gap-14">
            <div className="flex-1 min-w-0 overflow-hidden">
              <div
                className="blog-content text-left"
                dangerouslySetInnerHTML={{ __html: processedContent }}
              />
            </div>
            <div className="hidden md:block w-64 shrink-0">
              <TableOfContents headings={headings} />
            </div>
          </div>

          <div className="mt-12 p-6 rounded-2xl border border-gold/30 bg-gold/5">
            <h4 className="font-bold mb-2 text-plum">Medical Disclaimer</h4>
            <p className="text-sm leading-relaxed text-ink2">
              This article is written for general educational purposes only.
              It does not constitute medical advice or a diagnosis for your
              specific situation. Always consult your doctor before making
              health decisions. If you are experiencing a medical emergency,
              contact your healthcare provider or emergency services immediately.
            </p>
          </div>

          {post.faqs && post.faqs.length > 0 && (
            <div className="mt-10">
              <h2 className="font-serif text-2xl text-plum mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {post.faqs.map((faq, i) => (
                  <details key={i} className="group bg-ivory2 rounded-xl border border-ink/10 overflow-hidden">
                    <summary className="flex items-center justify-between px-6 py-4 cursor-pointer font-semibold text-ink hover:bg-ivory2/80 transition-colors">
                      <span>{faq.question}</span>
                      <span className="ml-4 shrink-0 text-ink2 group-open:rotate-180 transition-transform">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
                      </span>
                    </summary>
                    <div className="px-6 pb-4 text-ink2 leading-relaxed border-t border-ink/10 pt-4">
                      {faq.answer}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          )}

          <div className="mt-12 border-t border-ink/10 pt-8">
            <CommentSection postId={post.id} />
          </div>
        </div>

        {related && related.length > 0 && (
          <section className="max-w-6xl mx-auto px-4 sm:px-6 py-14 border-t border-ink/10">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-serif text-2xl text-plum">More to Read</h2>
              <Link href="/articles" className="text-terracotta font-semibold hover:underline text-sm">View All</Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((p, i) => (
                <PostCard key={p.id} post={p} index={i} />
              ))}
            </div>
          </section>
        )}
      </article>
      <Footer />
    </>
  )
}
