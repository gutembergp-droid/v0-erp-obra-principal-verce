import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-background">
      <div className="h-14 border-b flex items-center justify-between px-4 bg-card">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-8 w-32" />
      </div>
      <div className="grid grid-cols-6 gap-3 p-4 border-b">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-20" />
        ))}
      </div>
      <div className="flex-1 flex">
        <div className="w-56 border-r p-4">
          <Skeleton className="h-full" />
        </div>
        <div className="flex-1 p-4">
          <Skeleton className="h-full" />
        </div>
      </div>
    </div>
  )
}
