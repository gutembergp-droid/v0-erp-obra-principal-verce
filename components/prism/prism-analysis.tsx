"use client"

import { useState } from "react"
import type { PrismResult, FaceResult } from "@/lib/prism/types"
import { PrismOverlayBar } from "./prism-overlay-bar"
import { PrismChipsRow } from "./prism-chips-row"
import { PrismDetailDrawer } from "./prism-detail-drawer"
import { cn } from "@/lib/utils"

interface PrismAnalysisProps {
  result: PrismResult | null
  enabled?: boolean
  title?: string
  showChips?: boolean
  className?: string
}

export function PrismAnalysis({ result, enabled = true, title, showChips = true, className }: PrismAnalysisProps) {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [selectedFace, setSelectedFace] = useState<FaceResult | null>(null)

  // Se desabilitado ou sem resultado, nao renderiza nada
  if (!enabled || !result) {
    return null
  }

  const handleFaceClick = (face: FaceResult) => {
    setSelectedFace(face)
    setDrawerOpen(true)
  }

  return (
    <div className={cn("space-y-2", className)}>
      <PrismOverlayBar result={result} onDetailClick={() => setDrawerOpen(true)} />

      {showChips && <PrismChipsRow faces={result.faces} onFaceClick={handleFaceClick} />}

      <PrismDetailDrawer open={drawerOpen} onOpenChange={setDrawerOpen} result={result} title={title} />
    </div>
  )
}
