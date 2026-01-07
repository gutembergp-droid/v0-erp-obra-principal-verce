"use client"

import { cn } from "@/lib/utils"
import { type FaceResult, type PrismStatus, FACE_LABELS } from "@/lib/prism/types"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface PrismChipsRowProps {
  faces: FaceResult[]
  onFaceClick?: (face: FaceResult) => void
  className?: string
}

const chipConfig: Record<
  PrismStatus,
  {
    bgClass: string
    textClass: string
    borderClass: string
  }
> = {
  GREEN: {
    bgClass: "bg-emerald-100 dark:bg-emerald-950/50",
    textClass: "text-emerald-700 dark:text-emerald-400",
    borderClass: "border-emerald-200 dark:border-emerald-800",
  },
  YELLOW: {
    bgClass: "bg-amber-100 dark:bg-amber-950/50",
    textClass: "text-amber-700 dark:text-amber-400",
    borderClass: "border-amber-200 dark:border-amber-800",
  },
  RED: {
    bgClass: "bg-red-100 dark:bg-red-950/50",
    textClass: "text-red-700 dark:text-red-400",
    borderClass: "border-red-200 dark:border-red-800",
  },
  NEUTRAL: {
    bgClass: "bg-muted/50",
    textClass: "text-muted-foreground",
    borderClass: "border-muted",
  },
}

export function PrismChipsRow({ faces, onFaceClick, className }: PrismChipsRowProps) {
  return (
    <TooltipProvider>
      <div className={cn("flex flex-wrap gap-1.5", className)}>
        {faces.map((face) => {
          const config = chipConfig[face.status]

          return (
            <Tooltip key={face.face}>
              <TooltipTrigger asChild>
                <button
                  onClick={() => onFaceClick?.(face)}
                  className={cn(
                    "px-2 py-0.5 text-xs font-medium rounded border transition-colors",
                    "hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1",
                    config.bgClass,
                    config.textClass,
                    config.borderClass,
                  )}
                >
                  {FACE_LABELS[face.face]}
                </button>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="max-w-xs">
                <div className="text-xs">
                  <p className="font-medium">{FACE_LABELS[face.face]}</p>
                  {face.metricLabel && <p className="text-muted-foreground">{face.metricLabel}</p>}
                  {face.reasonDetail && <p className="mt-1 text-muted-foreground italic">{face.reasonDetail}</p>}
                </div>
              </TooltipContent>
            </Tooltip>
          )
        })}
      </div>
    </TooltipProvider>
  )
}
