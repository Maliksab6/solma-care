import Link from 'next/link'
import { formatDate } from '@/lib/utils'

export default function PostCard({ post, index = 0 }) {
  const slug = post?.slug || ''
  const title = post?.title || 'Untitled'
  const excerpt = post?.excerpt || ''
  const featuredImage = post?.featured_image || ''
  const category = post?.category
  const publishedAt = post?.published_at || post?.created_at
  const readingTime = post?.reading_time || 1

  return (
    <Link
      href={`/articles/${slug}`}
      className="group block bg-white border border-surface-border rounded-xl overflow-hidden hover:shadow-lg hover:shadow-surface-border/50 hover:border-brand-200 transition-all duration-200"
    >
      {featuredImage ? (
        <div className="aspect-[16/9] overflow-hidden">
          <img
            src={featuredImage}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading={index < 3 ? 'eager' : 'lazy'}
          />
        </div>
      ) : (
        <div className="h-48 bg-surface-muted"></div>
      )}
      <div className="p-6">
        {category && (
          <p className="text-xs font-medium text-accent mb-2">{category.name}</p>
        )}
        <h3 className="text-lg font-semibold text-ink group-hover:text-brand-700 transition-colors leading-snug">
          {title}
        </h3>
        {excerpt && (
          <p className="text-sm text-gray-500 mt-2 line-clamp-2">{excerpt}</p>
        )}
        <div className="flex items-center gap-3 mt-4 text-xs text-gray-400">
          <span>{formatDate(publishedAt)}</span>
          <span>·</span>
          <span>{readingTime} min read</span>
        </div>
      </div>
    </Link>
  )
}
