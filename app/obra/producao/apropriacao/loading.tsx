import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="min-h-screen bg-background p-6">
      <Skeleton className="h-10 w-64 mb-6" />
      <div className="grid grid-cols-5 gap-4 mb-6">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-24" />
        ))}
      </div>
      <Skeleton className="h-[500px]" />
    </div>
  )
}
