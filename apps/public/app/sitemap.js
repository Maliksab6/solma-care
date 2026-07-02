import { createClient } from '@/lib/supabaseServer'

export const dynamic = 'force-dynamic'

export default async function Sitemap() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  const staticPages = [
    { url: siteUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: `${siteUrl}/articles`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${siteUrl}/topics`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${siteUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${siteUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${siteUrl}/terms`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.4 },
    { url: `${siteUrl}/newsletter`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  ]

  try {
    const supabase = createClient()
    const { data: posts } = await supabase.from('posts').select('slug, updated_at, published_at').eq('status', 'published')
    const { data: categories } = await supabase.from('categories').select('slug, updated_at')

    const postPages = (posts || []).map((p) => ({
      url: `${siteUrl}/articles/${p.slug}`,
      lastModified: new Date(p.updated_at || p.published_at),
      changeFrequency: 'weekly',
      priority: 0.7,
    }))

    const categoryPages = (categories || []).map((c) => ({
      url: `${siteUrl}/topics/${c.slug}`,
      lastModified: new Date(c.updated_at || new Date()),
      changeFrequency: 'weekly',
      priority: 0.6,
    }))

    return [...staticPages, ...postPages, ...categoryPages]
  } catch (err) {
    console.error('Sitemap error:', err)
    return staticPages
  }
}
