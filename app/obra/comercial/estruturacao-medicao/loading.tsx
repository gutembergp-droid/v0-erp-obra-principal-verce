import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="h-full flex flex-col bg-background">
      <div className="border-b border-border bg-muted/30 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Skeleton className="h-8 w-20" />
            <div>
              <Skeleton className="h-6 w-64" />
              <Skeleton className="h-4 w-48 mt-1" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-8 w-36" />
          </div>
        </div>
      </div>
      <div className="flex-1 p-6 space-y-6">
        <Skeleton className="h-[400px] w-full" />
        <div className="grid grid-cols-3 gap-6">
          <Skeleton className="h-48" />
          <Skeleton className="h-48" />
          <Skeleton className="h-48" />
        </div>
      </div>
    </div>
  )
}
