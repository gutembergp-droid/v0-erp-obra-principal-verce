import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-none border-b border-border bg-card px-6 py-4">
        <Skeleton className="h-8 w-64" />
      </div>
      <div className="p-6 space-y-6">
        <Skeleton className="h-96 w-full" />
        <Skeleton className="h-64 w-full" />
        <Skeleton className="h-48 w-full" />
      </div>
    </div>
  )
}
