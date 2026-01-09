import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-8 w-32" />
      </div>
      <Skeleton className="h-48 rounded-lg" />
      <div className="grid grid-cols-12 gap-6">
        <Skeleton className="col-span-7 h-64 rounded-lg" />
        <Skeleton className="col-span-5 h-64 rounded-lg" />
      </div>
    </div>
  )
}
