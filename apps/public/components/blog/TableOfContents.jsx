'use client'

export default function TableOfContents({ headings = [] }) {
  if (headings.length === 0) return null

  return (
    <nav className="sticky top-24" aria-label="Table of contents">
      <p className="text-xs uppercase tracking-widest text-sage mb-4">On this page</p>
      <ul className="space-y-2 border-l border-ink/10">
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              className={`block text-sm text-ink2 hover:text-plum hover:border-l-2 hover:border-plum hover:pl-3 transition-all ${
                h.level === 2 ? 'pl-3' : h.level === 3 ? 'pl-6' : 'pl-3'
              }`}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export function MobileTableOfContents({ headings = [] }) {
  if (headings.length === 0) return null

  return (
    <details className="md:hidden mb-6 bg-ivory2 rounded-xl border border-ink/10 overflow-hidden">
      <summary className="px-5 py-3 cursor-pointer text-sm font-medium text-ink">
        Table of Contents
      </summary>
      <nav className="px-5 pb-4" aria-label="Table of contents">
        <ul className="space-y-2">
          {headings.map((h) => (
            <li key={h.id}>
              <a
                href={`#${h.id}`}
                className={`block text-sm text-ink2 hover:text-plum ${
                  h.level === 2 ? 'pl-0' : h.level === 3 ? 'pl-4' : 'pl-0'
                }`}
              >
                {h.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </details>
  )
}
