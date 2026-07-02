export function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .trim()
}

export function extractHeadings(html) {
  const headings = []
  const regex = /<h([1-3])[^>]*>(.*?)<\/h\1>/gi
  let match
  while ((match = regex.exec(html)) !== null) {
    const level = parseInt(match[1])
    const text = match[2].replace(/<[^>]+>/g, '').trim()
    if (text) {
      headings.push({ id: slugify(text), text, level })
    }
  }
  return headings
}

export function addHeadingIds(html) {
  return html.replace(/<h([1-3])([^>]*)>([\s\S]*?)<\/h\1>/gi, (match, level, attrs, content) => {
    if (/id="/.test(attrs)) return match
    const text = content.replace(/<[^>]+>/g, '').trim()
    const id = slugify(text)
    return `<h${level}${attrs} id="${id}">${content}</h${level}>`
  })
}
