export default function Loading() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-ivory">
      <div className="flex flex-col items-center gap-3">
        <div className="animate-spin w-10 h-10 border-4 border-plum border-t-transparent rounded-full" />
        <p className="text-ink2 text-sm">Loading...</p>
      </div>
    </main>
  )
}
