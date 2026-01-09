import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="flex-1 flex flex-col h-full">
      <div className="border-b bg-card px-6 py-4">
        <Skeleton className="h-6 w-64 mb-2" />
        <Skeleton className="h-4 w-96" />
      </div>
      <div className="flex-1 p-6">
        <div className="grid grid-cols-5 gap-3 mb-4">
          {[...Array(5)].map((_, i) => (
            <Card key={i} className="p-3">
              <Skeleton className="h-8 w-12 mb-1" />
              <Skeleton className="h-3 w-16" />
            </Card>
          ))}
        </div>
        <Card>
          <CardHeader>
            <Skeleton className="h-10 w-full" />
          </CardHeader>
          <CardContent>
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-12 w-full mb-2" />
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
