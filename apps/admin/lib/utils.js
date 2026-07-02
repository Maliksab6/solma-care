import slugify from 'slugify'

export function makeSlug(text) {
  return slugify(text, { lower: true, strict: true, trim: true })
}

export function calcReadingTime(content) {
  const wordsPerMinute = 200
  const wordCount = content?.replace(/<[^>]+>/g, '').split(/\s+/).length || 0
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute))
}

export function formatDate(date) {
  if (!date) return ''
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function truncate(str, n = 150) {
  return str?.length > n ? str.slice(0, n).trim() + '...' : str
}
