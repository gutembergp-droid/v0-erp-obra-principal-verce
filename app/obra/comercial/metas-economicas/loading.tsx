export default function Loading() {
  return (
    <div className="flex-1 overflow-auto p-4 md:p-6">
      <div className="animate-pulse space-y-6">
        <div className="h-8 bg-muted rounded w-1/3" />
        <div className="grid grid-cols-5 gap-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-24 bg-muted rounded" />
          ))}
        </div>
        <div className="h-96 bg-muted rounded" />
      </div>
    </div>
  )
}
