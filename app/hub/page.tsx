import { Suspense } from "react"
import { HubContent } from "@/components/hub/hub-content"

export default function HubPage() {
  return (
    <Suspense fallback={null}>
      <HubContent />
    </Suspense>
  )
}
