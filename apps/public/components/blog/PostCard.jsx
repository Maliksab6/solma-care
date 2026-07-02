import Link from 'next/link'
import { formatDate } from '@/lib/utils'

const categoryColors = {
  'pcos': { border: 'border-terracotta', text: 'text-terracotta', bg: 'bg-terracotta/10' },
  'metabolic-health': { border: 'border-plum', text: 'text-plum', bg: 'bg-plum/10' },
  'fertility': { border: 'border-sage', text: 'text-sage', bg: 'bg-sage/10' },
  'missed-conditions': { border: 'border-gold', text: 'text-gold', bg: 'bg-gold/10' },
  'living-with-it': { border: 'border-violet', text: 'text-violet', bg: 'bg-violet/10' },
}

export default function PostCard({ post, index = 0 }) {
  const slug = post?.slug || ''
  const title = post?.title || 'Untitled'
  const excerpt = post?.excerpt || ''
  const featuredImage = post?.featured_image || ''
  const category = post?.category
  const publishedAt = post?.published_at || post?.created_at
  const readingTime = post?.reading_time || 1
  const colors = category?.slug ? (categoryColors[category.slug] || { border: 'border-terracotta', text: 'text-terracotta', bg: 'bg-terracotta/10' }) : { border: 'border-terracotta', text: 'text-terracotta', bg: 'bg-terracotta/10' }

  return (
    <Link
      href={`/articles/${slug}`}
      className={`group block bg-ivory2/60 hover:bg-ivory2 border-l-2 ${colors.border} rounded-r-lg overflow-hidden transition-all duration-200 hover:shadow-md`}
    >
      {featuredImage && (
        <div className="aspect-[16/9] overflow-hidden">
          <img
            src={featuredImage}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading={index < 3 ? 'eager' : 'lazy'}
          />
        </div>
      )}
      <div className="p-5">
        {category && (
          <span className={`inline-block text-xs uppercase tracking-wide font-medium ${colors.text} mb-2`}>
            {category.name}
          </span>
        )}
        <h3 className="font-serif text-lg text-ink mb-2 leading-snug group-hover:text-plum transition-colors">
          {title}
        </h3>
        {excerpt && (
          <p className="text-sm text-ink2 mb-3 line-clamp-2">{excerpt}</p>
        )}
        <div className="flex items-center justify-between text-xs text-ink2">
          <span>{formatDate(publishedAt)} · {readingTime} min read</span>
          <span className="text-terracotta font-medium group-hover:translate-x-1 transition-transform">Read →</span>
        </div>
      </div>
    </Link>
  )
}
