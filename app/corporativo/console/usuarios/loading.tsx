import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="flex h-screen bg-muted/30">
      <aside className="w-64 bg-background border-r p-4">
        <Skeleton className="h-8 w-32 mb-6" />
        <div className="space-y-2">
          {Array.from({ length: 11 }).map((_, i) => (
            <Skeleton key={i} className="h-9 w-full" />
          ))}
        </div>
      </aside>
      <div className="flex-1 p-6">
        <Skeleton className="h-10 w-64 mb-6" />
        <div className="grid grid-cols-4 gap-4 mb-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-24" />
          ))}
        </div>
        <Skeleton className="h-12 w-full mb-4" />
        <Skeleton className="h-[400px] w-full" />
      </div>
    </div>
  )
}
