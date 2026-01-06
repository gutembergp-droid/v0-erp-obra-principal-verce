export default function Loading() {
  return (
    <div className="flex-1 overflow-auto p-4 md:p-6">
      <div className="animate-pulse space-y-6">
        <div className="h-8 bg-muted rounded w-1/3" />
        <div className="grid grid-cols-2 gap-4">
          <div className="h-32 bg-muted rounded" />
          <div className="h-32 bg-muted rounded" />
        </div>
        <div className="h-64 bg-muted rounded" />
        <div className="grid grid-cols-2 gap-4">
          <div className="h-48 bg-muted rounded" />
          <div className="h-48 bg-muted rounded" />
        </div>
      </div>
    </div>
  )
}
