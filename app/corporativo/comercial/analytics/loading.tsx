export default function Loading() {
  return (
    <div className="flex h-screen bg-muted/30">
      <aside className="w-56 bg-background border-r animate-pulse">
        <div className="p-3 border-b">
          <div className="h-7 w-32 bg-muted rounded" />
        </div>
      </aside>
      <div className="flex-1 p-4">
        <div className="space-y-4">
          <div className="grid grid-cols-6 gap-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-24 bg-muted rounded animate-pulse" />
            ))}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="h-64 bg-muted rounded animate-pulse" />
            <div className="h-64 bg-muted rounded animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  )
}
