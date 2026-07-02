'use client'

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-ivory">
      <div className="text-center">
        <p className="font-serif text-6xl text-plum mb-4">404</p>
        <h1 className="text-2xl font-serif font-bold text-plum mb-2">Page not found</h1>
        <p className="text-ink2 mb-6">The page you are looking for does not exist.</p>
        <a href="/" className="bg-plum text-ivory px-6 py-3 rounded-full text-sm hover:bg-terracotta transition-colors inline-block">
          Go home
        </a>
      </div>
    </main>
  )
}
