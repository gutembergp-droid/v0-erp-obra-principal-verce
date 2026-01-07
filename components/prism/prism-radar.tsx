"use client"

import { useState } from "react"
import type { PrismResult, PrismStatus } from "@/lib/prism/types"

interface PrismRadarProps {
  result: PrismResult
}

const FACE_LABELS = [
  { key: "orcamentario", label: "Orcamentario" },
  { key: "contratual", label: "Contratual" },
  { key: "executado", label: "Executado" },
  { key: "eac", label: "EAC" },
  { key: "tecnico", label: "Tecnico" },
  { key: "produtividade", label: "Produtividade" },
  { key: "prazo", label: "Prazo" },
  { key: "risco", label: "Risco" },
  { key: "alcada", label: "Alcada" },
]

const statusToValue = (status: PrismStatus): number => {
  switch (status) {
    case "GREEN":
      return 100
    case "YELLOW":
      return 65
    case "RED":
      return 30
    case "NEUTRAL":
      return 50
    default:
      return 50
  }
}

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

export function PrismRadar({ result }: PrismRadarProps) {
  const [hoveredFace, setHoveredFace] = useState<string | null>(null)

  const centerX = 150
  const centerY = 150
  const maxRadius = 120
  const levels = 4

  // Calcular pontos do poligono
  const getPoint = (index: number, value: number) => {
    const angle = (Math.PI * 2 * index) / 9 - Math.PI / 2
    const radius = (value / 100) * maxRadius
    return {
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle),
    }
  }

  // Pontos para a area preenchida
  const areaPoints = FACE_LABELS.map((face, i) => {
    const faceResult = result.faces.find((f) => f.face.toLowerCase() === face.key)
    const value = faceResult ? statusToValue(faceResult.status) : 50
    return getPoint(i, value)
  })

  const areaPath = areaPoints.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ") + " Z"

  // Pontos para os eixos
  const axisPoints = FACE_LABELS.map((_, i) => getPoint(i, 100))

  // Pontos para os niveis (circulos concentricos)
  const levelPolygons = Array.from({ length: levels }, (_, levelIndex) => {
    const levelValue = ((levelIndex + 1) / levels) * 100
    return FACE_LABELS.map((_, i) => getPoint(i, levelValue))
  })

  return (
    <div className="flex flex-col items-center">
      <svg width="300" height="300" viewBox="0 0 300 300">
        {/* Niveis de fundo */}
        {levelPolygons.map((points, levelIndex) => (
          <polygon
            key={levelIndex}
            points={points.map((p) => `${p.x},${p.y}`).join(" ")}
            fill="none"
            stroke="hsl(var(--border))"
            strokeWidth="1"
            opacity={0.3}
          />
        ))}

        {/* Eixos */}
        {axisPoints.map((point, i) => (
          <line
            key={i}
            x1={centerX}
            y1={centerY}
            x2={point.x}
            y2={point.y}
            stroke="hsl(var(--border))"
            strokeWidth="1"
            opacity={0.5}
          />
        ))}

        {/* Area preenchida com gradiente */}
        <defs>
          <linearGradient id="radarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0.4" />
          </linearGradient>
        </defs>
        <path d={areaPath} fill="url(#radarGradient)" stroke="#3b82f6" strokeWidth="2" />

        {/* Pontos nos vertices */}
        {areaPoints.map((point, i) => {
          const face = FACE_LABELS[i]
          const faceResult = result.faces.find((f) => f.face.toLowerCase() === face.key)
          const status = faceResult?.status || "NEUTRAL"
          const isHovered = hoveredFace === face.key

          return (
            <circle
              key={i}
              cx={point.x}
              cy={point.y}
              r={isHovered ? 8 : 6}
              fill={statusToColor(status)}
              stroke="white"
              strokeWidth="2"
              className="cursor-pointer transition-all"
              onMouseEnter={() => setHoveredFace(face.key)}
              onMouseLeave={() => setHoveredFace(null)}
            />
          )
        })}

        {/* Labels */}
        {FACE_LABELS.map((face, i) => {
          const labelPoint = getPoint(i, 115)
          const faceResult = result.faces.find((f) => f.face.toLowerCase() === face.key)
          const status = faceResult?.status || "NEUTRAL"

          return (
            <text
              key={i}
              x={labelPoint.x}
              y={labelPoint.y}
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-[10px] font-medium fill-foreground"
              style={{ fill: hoveredFace === face.key ? statusToColor(status) : undefined }}
            >
              {face.label}
            </text>
          )
        })}
      </svg>

      {/* Tooltip */}
      {hoveredFace && (
        <div className="mt-2 px-3 py-1.5 bg-card border rounded-lg shadow-sm text-sm">
          {(() => {
            const face = FACE_LABELS.find((f) => f.key === hoveredFace)
            const faceResult = result.faces.find((f) => f.face.toLowerCase() === hoveredFace)
            return (
              <span>
                <strong>{face?.label}:</strong>{" "}
                <span style={{ color: statusToColor(faceResult?.status || "NEUTRAL") }}>
                  {faceResult?.status || "N/A"}
                </span>
                {faceResult?.value !== undefined && ` (${(faceResult.value * 100).toFixed(1)}%)`}
              </span>
            )
          })()}
        </div>
      )}
    </div>
  )
}
