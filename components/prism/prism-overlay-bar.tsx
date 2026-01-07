"use client"

import { cn } from "@/lib/utils"
import { type PrismResult, type PrismStatus, STATUS_LABELS, DECISION_LABELS } from "@/lib/prism/types"
import { ChevronRight, ShieldAlert, ShieldCheck, ShieldQuestion } from "lucide-react"

interface PrismOverlayBarProps {
  result: PrismResult
  onDetailClick?: () => void
  className?: string
}

const statusConfig: Record<
  PrismStatus,
  {
    icon: typeof ShieldCheck
    bgClass: string
    textClass: string
    dotClass: string
  }
> = {
  GREEN: {
    icon: ShieldCheck,
    bgClass: "bg-emerald-50 dark:bg-emerald-950/30",
    textClass: "text-emerald-700 dark:text-emerald-400",
    dotClass: "bg-emerald-500",
  },
  YELLOW: {
    icon: ShieldAlert,
    bgClass: "bg-amber-50 dark:bg-amber-950/30",
    textClass: "text-amber-700 dark:text-amber-400",
    dotClass: "bg-amber-500",
  },
  RED: {
    icon: ShieldAlert,
    bgClass: "bg-red-50 dark:bg-red-950/30",
    textClass: "text-red-700 dark:text-red-400",
    dotClass: "bg-red-500",
  },
  NEUTRAL: {
    icon: ShieldQuestion,
    bgClass: "bg-muted/50",
    textClass: "text-muted-foreground",
    dotClass: "bg-muted-foreground",
  },
}

export function PrismOverlayBar({ result, onDetailClick, className }: PrismOverlayBarProps) {
  const config = statusConfig[result.globalStatus]
  const Icon = config.icon

  return (
    <div
      className={cn(
        "flex items-center justify-between gap-3 px-3 py-2 rounded-md border",
        config.bgClass,
        "border-transparent",
        className,
      )}
    >
      <div className="flex items-center gap-2 min-w-0">
        <div className={cn("w-2 h-2 rounded-full shrink-0", config.dotClass)} />
        <Icon className={cn("w-4 h-4 shrink-0", config.textClass)} />
        <span className={cn("text-sm font-medium", config.textClass)}>
          Prisma: {STATUS_LABELS[result.globalStatus]}
        </span>
        <span className="text-xs text-muted-foreground hidden sm:inline">
          ({DECISION_LABELS[result.decisionState]})
        </span>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-xs text-muted-foreground">{result.pressureText}</span>

        {onDetailClick && (
          <button
            onClick={onDetailClick}
            className={cn("flex items-center gap-1 text-xs font-medium hover:underline", config.textClass)}
          >
            Detalhar
            <ChevronRight className="w-3 h-3" />
          </button>
        )}
      </div>
    </div>
  )
}
