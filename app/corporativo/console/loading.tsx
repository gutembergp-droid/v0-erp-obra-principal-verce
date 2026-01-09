import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="flex h-screen bg-muted/30">
      <aside className="w-64 bg-background border-r p-4">
        <Skeleton className="h-10 w-full mb-4" />
        <div className="space-y-2">
          {Array.from({ length: 11 }).map((_, i) => (
            <Skeleton key={i} className="h-8 w-full" />
          ))}
        </div>
      </aside>
      <div className="flex-1 flex flex-col">
        <div className="h-14 border-b px-6 flex items-center">
          <Skeleton className="h-8 w-32 mr-4" />
          <Skeleton className="h-8 w-80" />
        </div>
        <div className="p-6 space-y-6">
          <Skeleton className="h-8 w-48" />
          <div className="grid grid-cols-8 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="h-24" />
            ))}
          </div>
          <div className="grid grid-cols-3 gap-6">
            <Skeleton className="h-[400px] col-span-2" />
            <Skeleton className="h-[400px]" />
          </div>
        </div>
      </div>
    </div>
  )
}
