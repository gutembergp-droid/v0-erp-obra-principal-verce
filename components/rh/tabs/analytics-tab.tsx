"use client"

import { Suspense } from "react"
import { AnalyticsContent } from "@/app/corporativo/administrativo/rh/_components/analytics-content"

export function AnalyticsTab() {
  return (
    <Suspense fallback={<div>Carregando Analytics...</div>}>
      <AnalyticsContent />
    </Suspense>
  )
}
