import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-background">
      <div className="h-14 border-b flex items-center justify-between px-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-8 w-64" />
      </div>
      <div className="grid grid-cols-6 gap-3 p-4 border-b">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-20 rounded-lg" />
        ))}
      </div>
      <div className="flex-1 flex">
        <div className="w-72 border-r p-3">
          <Skeleton className="h-9 w-full mb-3" />
          <div className="space-y-2">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-8 w-full" />
            ))}
          </div>
        </div>
        <div className="flex-1 p-4">
          <Skeleton className="h-64 w-full" />
        </div>
        <div className="w-72 border-l p-3">
          <Skeleton className="h-8 w-full mb-3" />
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
