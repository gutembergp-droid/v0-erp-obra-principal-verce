"use client"

import type React from "react"
import { HelpCircle, CheckCircle, XCircle, Lightbulb } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface HelpTooltipProps {
  title: string
  description: string
  example?: string
  goodExample?: string
  badExample?: string
  tip?: string
  side?: "top" | "right" | "bottom" | "left"
}

export function HelpTooltip({ 
  title, 
  description, 
  example, 
  goodExample, 
  badExample, 
  tip,
  side = "right" 
}: HelpTooltipProps) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={200}>
        <TooltipTrigger asChild>
          <button 
            type="button"
            className="inline-flex items-center justify-center w-5 h-5 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
          >
            <HelpCircle className="w-4 h-4" />
          </button>
        </TooltipTrigger>
        <TooltipContent 
          side={side} 
          align="start" 
          className="max-w-sm p-4 bg-popover border border-border shadow-lg"
        >
          <div className="space-y-3">
            {/* Título */}
            <div>
              <h4 className="font-semibold text-sm text-foreground mb-1">{title}</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
            </div>

            {/* Exemplo simples */}
            {example && (
              <div className="p-2 rounded-md bg-muted/50 border border-border">
                <p className="text-xs font-medium text-foreground mb-1">Exemplo:</p>
                <p className="text-xs text-foreground/80 italic">"{example}"</p>
              </div>
            )}

            {/* Bom exemplo */}
            {goodExample && (
              <div className="p-2 rounded-md bg-green-500/10 border border-green-500/20">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-3 h-3 text-green-500 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs font-medium text-green-700 dark:text-green-400 mb-1">Bom exemplo:</p>
                    <p className="text-xs text-foreground/80 italic">"{goodExample}"</p>
                  </div>
                </div>
              </div>
            )}

            {/* Mau exemplo */}
            {badExample && (
              <div className="p-2 rounded-md bg-red-500/10 border border-red-500/20">
                <div className="flex items-start gap-2">
                  <XCircle className="w-3 h-3 text-red-500 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs font-medium text-red-700 dark:text-red-400 mb-1">Evite:</p>
                    <p className="text-xs text-foreground/80 italic">"{badExample}"</p>
                  </div>
                </div>
              </div>
            )}

            {/* Dica */}
            {tip && (
              <div className="p-2 rounded-md bg-blue-500/10 border border-blue-500/20">
                <div className="flex items-start gap-2">
                  <Lightbulb className="w-3 h-3 text-blue-500 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs font-medium text-blue-700 dark:text-blue-400 mb-1">Dica:</p>
                    <p className="text-xs text-foreground/80">{tip}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
