import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-none border-b border-border bg-card/50 px-6 py-4">
        <div className="flex items-center gap-4">
          <Skeleton className="h-8 w-8 rounded" />
          <div>
            <Skeleton className="h-5 w-48" />
            <Skeleton className="h-3 w-32 mt-1" />
          </div>
        </div>
      </div>
      <div className="flex-1 p-6 space-y-6">
        <Skeleton className="h-[400px] w-full rounded-lg" />
        <div className="grid grid-cols-2 gap-6">
          <Skeleton className="h-[200px] rounded-lg" />
          <Skeleton className="h-[200px] rounded-lg" />
        </div>
      </div>
    </div>
  )
}
