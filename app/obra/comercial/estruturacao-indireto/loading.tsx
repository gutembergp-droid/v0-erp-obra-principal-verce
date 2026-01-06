import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-shrink-0 border-b bg-card/50 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-6 w-px" />
            <div>
              <Skeleton className="h-6 w-64 mb-1" />
              <Skeleton className="h-4 w-48" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-8 w-36" />
          </div>
        </div>
      </div>
      <div className="flex-1 p-6 space-y-6">
        <Skeleton className="h-64 w-full" />
        <Skeleton className="h-48 w-full" />
        <div className="grid grid-cols-12 gap-6">
          <Skeleton className="h-48 col-span-7" />
          <Skeleton className="h-48 col-span-5" />
        </div>
      </div>
    </div>
  )
}
