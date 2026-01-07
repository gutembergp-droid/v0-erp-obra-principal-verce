"use client"

import { useState } from "react"
import type { PrismResult, PrismStatus } from "@/lib/prism/types"

interface PrismDonutProps {
  result: PrismResult
}

const FACE_LABELS = [
  { key: "orcamentario", label: "ORC" },
  { key: "contratual", label: "CTR" },
  { key: "executado", label: "EXE" },
  { key: "eac", label: "EAC" },
  { key: "tecnico", label: "TEC" },
  { key: "produtividade", label: "PRO" },
  { key: "prazo", label: "PRZ" },
  { key: "risco", label: "RSC" },
  { key: "alcada", label: "ALC" },
]

const statusToColor = (status: PrismStatus): string => {
  switch (status) {
    case "GREEN":
      return "#10b981"
    case "YELLOW":
      return "#f59e0b"
    case "RED":
      return "#ef4444"
    case "NEUTRAL":
      return "#6b7280"
    default:
      return "#6b7280"
  }
}

const statusToLabel = (status: PrismStatus): string => {
  switch (status) {
    case "GREEN":
      return "OK"
    case "YELLOW":
      return "Atencao"
    case "RED":
      return "Critico"
    case "NEUTRAL":
      return "N/A"
    default:
      return "N/A"
  }
}

export function PrismDonut({ result }: PrismDonutProps) {
  const [hoveredSegment, setHoveredSegment] = useState<number | null>(null)

  const centerX = 150
  const centerY = 150
  const outerRadius = 120
  const innerRadius = 70
  const segmentCount = 9
  const gapAngle = 2 // graus

  const segments = FACE_LABELS.map((face, index) => {
    const faceResult = result.faces.find((f) => f.face.toLowerCase() === face.key)
    const status = faceResult?.status || "NEUTRAL"

    const startAngle = (index * 360) / segmentCount - 90 + gapAngle / 2
    const endAngle = ((index + 1) * 360) / segmentCount - 90 - gapAngle / 2

    const startRad = (startAngle * Math.PI) / 180
    const endRad = (endAngle * Math.PI) / 180

    const x1Outer = centerX + outerRadius * Math.cos(startRad)
    const y1Outer = centerY + outerRadius * Math.sin(startRad)
    const x2Outer = centerX + outerRadius * Math.cos(endRad)
    const y2Outer = centerY + outerRadius * Math.sin(endRad)

    const x1Inner = centerX + innerRadius * Math.cos(startRad)
    const y1Inner = centerY + innerRadius * Math.sin(startRad)
    const x2Inner = centerX + innerRadius * Math.cos(endRad)
    const y2Inner = centerY + innerRadius * Math.sin(endRad)

    const largeArc = endAngle - startAngle > 180 ? 1 : 0

    const path = `
      M ${x1Outer} ${y1Outer}
      A ${outerRadius} ${outerRadius} 0 ${largeArc} 1 ${x2Outer} ${y2Outer}
      L ${x2Inner} ${y2Inner}
      A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${x1Inner} ${y1Inner}
      Z
    `

    // Posicao do label (no meio do arco)
    const midAngle = (((startAngle + endAngle) / 2) * Math.PI) / 180
    const labelRadius = (outerRadius + innerRadius) / 2
    const labelX = centerX + labelRadius * Math.cos(midAngle)
    const labelY = centerY + labelRadius * Math.sin(midAngle)

    return { face, path, status, labelX, labelY, faceResult, index }
  })

  return (
    <div className="flex flex-col items-center">
      <svg width="300" height="300" viewBox="0 0 300 300">
        {/* Segmentos */}
        {segments.map((seg, i) => {
          const isHovered = hoveredSegment === i
          return (
            <g key={i}>
              <path
                d={seg.path}
                fill={statusToColor(seg.status)}
                fillOpacity={isHovered ? 1 : 0.75}
                stroke="white"
                strokeWidth="2"
                className="cursor-pointer transition-all"
                style={{
                  transform: isHovered ? `scale(1.03)` : "scale(1)",
                  transformOrigin: `${centerX}px ${centerY}px`,
                }}
                onMouseEnter={() => setHoveredSegment(i)}
                onMouseLeave={() => setHoveredSegment(null)}
              />
              <text
                x={seg.labelX}
                y={seg.labelY}
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-[10px] font-bold fill-white pointer-events-none"
              >
                {seg.face.label}
              </text>
            </g>
          )
        })}

        {/* Centro */}
        <circle cx={centerX} cy={centerY} r={innerRadius - 5} fill="hsl(var(--card))" />
        <text x={centerX} y={centerY - 12} textAnchor="middle" className="text-[28px] font-bold fill-foreground">
          {result.summary.green}/{result.faces.length}
        </text>
        <text x={centerX} y={centerY + 12} textAnchor="middle" className="text-[11px] fill-muted-foreground">
          {result.decision === "AUTO_APPROVED"
            ? "Aprovado"
            : result.decision === "BLOCKED_ESCALATE"
              ? "Bloqueado"
              : "Atencao"}
        </text>
      </svg>

      {/* Tooltip */}
      {hoveredSegment !== null && (
        <div className="mt-2 px-3 py-1.5 bg-card border rounded-lg shadow-sm text-sm">
          {(() => {
            const seg = segments[hoveredSegment]
            return (
              <span>
                <strong>{seg.face.label}:</strong>{" "}
                <span style={{ color: statusToColor(seg.status) }}>{statusToLabel(seg.status)}</span>
                {seg.faceResult?.value !== undefined && ` (${(seg.faceResult.value * 100).toFixed(1)}%)`}
              </span>
            )
          })()}
        </div>
      )}
    </div>
  )
}
