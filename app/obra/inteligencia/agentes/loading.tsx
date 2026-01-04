import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="p-6 space-y-6">
      <Skeleton className="h-12 w-96" />
      <Skeleton className="h-[500px]" />
    </div>
  )
}
