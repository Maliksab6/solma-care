'use client'

export default function Error({ error, reset }) {
  return (
    <main className="min-h-screen flex items-center justify-center bg-ivory">
      <div className="text-center">
        <h1 className="text-2xl font-serif font-bold text-plum mb-2">Something went wrong</h1>
        <p className="text-ink2 mb-6">An unexpected error occurred.</p>
        <button
          onClick={reset}
          className="bg-plum text-ivory px-6 py-3 rounded-full text-sm hover:bg-terracotta transition-colors"
        >
          Try again
        </button>
      </div>
    </main>
  )
}
