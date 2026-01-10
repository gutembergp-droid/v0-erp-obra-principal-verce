"use client"

import { cn } from "@/lib/utils"

interface RadialProgressProps {
  previsto: number
  realizado: number
  size?: number
  strokeWidth?: number
  className?: string
  showLabels?: boolean
}

export function RadialProgress({
  previsto,
  realizado,
  size = 120,
  strokeWidth = 12,
  className,
  showLabels = true,
}: RadialProgressProps) {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const center = size / 2

  // Calcular offsets para as barras
  const previstoOffset = circumference - (previsto / 100) * circumference
  const realizadoOffset = circumference - (realizado / 100) * circumference

  // Determinar cor baseado na comparação
  const getColor = () => {
    if (realizado >= previsto) return "text-green-600"
    if (realizado >= previsto * 0.8) return "text-blue-600"
    if (realizado >= previsto * 0.6) return "text-amber-600"
    return "text-red-600"
  }

  const colorClass = getColor()

  return (
    <div className={cn("relative inline-flex flex-col items-center", className)}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Círculo de fundo */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-muted opacity-20"
        />

        {/* Círculo Previsto (cinza claro) */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth - 2}
          strokeDasharray={circumference}
          strokeDashoffset={previstoOffset}
          strokeLinecap="round"
          className="text-gray-400 opacity-40"
        />

        {/* Círculo Realizado (colorido) */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={realizadoOffset}
          strokeLinecap="round"
          className={cn(colorClass, "transition-all duration-500")}
        />
      </svg>

      {/* Texto central com percentuais */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={cn("text-2xl font-bold", colorClass)}>{realizado}%</span>
        <span className="text-xs text-muted-foreground">realizado</span>
      </div>

      {/* Labels embaixo */}
      {showLabels && (
        <div className="flex items-center gap-3 mt-2 text-xs">
          <div className="flex items-center gap-1">
            <div className={cn("w-2 h-2 rounded-full", colorClass.replace("text-", "bg-"))} />
            <span className="text-muted-foreground">
              Realizado: <span className="font-semibold text-foreground">{realizado}%</span>
            </span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-gray-400 opacity-60" />
            <span className="text-muted-foreground">
              Previsto: <span className="font-semibold text-foreground">{previsto}%</span>
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
