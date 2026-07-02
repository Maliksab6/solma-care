import { createClient } from '@/lib/supabaseServer'
import siteConfig from '@/lib/config'

export const dynamic = 'force-dynamic'

export default async function sitemap() {
  const supabase = createClient()
  if (!supabase) {
    return new Response('<?xml version="1.0"?><rss version="2.0"><channel><title>Solma Care</title></channel></rss>', {
      headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
    })
  }

  const { data: posts } = await supabase
    .from('posts')
    .select('slug, title, excerpt, updated_at, published_at, featured_image, tags')
    .eq('status', 'published')
    .order('published_at', { ascending: false })

  const items = (posts || []).map((post) => {
    const pubDate = post.published_at || post.created_at
    const categories = post.tags?.map(t => `<category>${t}</category>`).join('\n') || ''
    return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${siteConfig.url}/articles/${post.slug}</link>
      <guid isPermaLink="true">${siteConfig.url}/articles/${post.slug}</guid>
      <description><![CDATA[${post.excerpt || ''}]]></description>
      <pubDate>${new Date(pubDate).toUTCString()}</pubDate>
      ${categories}
    </item>`
  }).join('')

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>${siteConfig.name}</title>
    <link>${siteConfig.url}</link>
    <description>${siteConfig.description}</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteConfig.url}/feed.xml" rel="self" type="application/rss+xml" />
    <image>
      <url>${siteConfig.url}/logo.png</url>
      <title>${siteConfig.name}</title>
      <link>${siteConfig.url}</link>
    </image>
    ${items}
  </channel>
</rss>`

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  })
}
