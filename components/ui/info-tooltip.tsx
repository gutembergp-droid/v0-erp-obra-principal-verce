"use client"

import type React from "react"

import { Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface InfoTooltipProps {
  title: string
  description: string
  icon?: React.ReactNode
}

export function InfoTooltip({ title, description, icon }: InfoTooltipProps) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={200}>
        <TooltipTrigger asChild>
          <button className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary/15 hover:bg-primary/25 text-primary hover:text-primary transition-colors border border-primary/20">
            <Info className="w-4 h-4" />
          </button>
        </TooltipTrigger>
        <TooltipContent side="bottom" align="start" className="max-w-sm p-4 bg-card border border-border shadow-lg">
          <div className="flex items-start gap-3">
            {icon && <div className="p-2 rounded-lg bg-primary/15 text-primary shrink-0">{icon}</div>}
            <div>
              <h4 className="font-semibold text-sm text-foreground">{title}</h4>
              <p className="text-xs text-foreground/80 mt-1 leading-relaxed">{description}</p>
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
