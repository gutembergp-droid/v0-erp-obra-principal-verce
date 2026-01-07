"use client"

import { useState } from "react"
import type { PrismResult, PrismStatus } from "@/lib/prism/types"

interface PrismNonagonProps {
  result: PrismResult
}

const FACE_LABELS = [
  { key: "orcamentario", label: "Orcamentario" },
  { key: "contratual", label: "Contratual" },
  { key: "executado", label: "Executado" },
  { key: "eac", label: "EAC" },
  { key: "tecnico", label: "Tecnico" },
  { key: "produtividade", label: "Produtiv." },
  { key: "prazo", label: "Prazo" },
  { key: "risco", label: "Risco" },
  { key: "alcada", label: "Alcada" },
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

export function PrismNonagon({ result }: PrismNonagonProps) {
  const [hoveredEdge, setHoveredEdge] = useState<number | null>(null)

  const centerX = 150
  const centerY = 150
  const radius = 110

  // Calcular vertices do nonagono
  const vertices = FACE_LABELS.map((_, i) => {
    const angle = (Math.PI * 2 * i) / 9 - Math.PI / 2
    return {
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle),
    }
  })

  // Criar arestas (lados do nonagono)
  const edges = FACE_LABELS.map((face, i) => {
    const faceResult = result.faces.find((f) => f.face.toLowerCase() === face.key)
    const status = faceResult?.status || "NEUTRAL"
    const start = vertices[i]
    const end = vertices[(i + 1) % 9]

    // Ponto medio para o label
    const midX = (start.x + end.x) / 2
    const midY = (start.y + end.y) / 2

    // Ponto externo para o label
    const angle = (Math.PI * 2 * (i + 0.5)) / 9 - Math.PI / 2
    const labelX = centerX + (radius + 25) * Math.cos(angle)
    const labelY = centerY + (radius + 25) * Math.sin(angle)

    return { face, start, end, status, midX, midY, labelX, labelY, faceResult }
  })

  // Poligono de fundo
  const polygonPoints = vertices.map((v) => `${v.x},${v.y}`).join(" ")

  return (
    <div className="flex flex-col items-center">
      <svg width="300" height="300" viewBox="0 0 300 300">
        {/* Preenchimento do nonagono */}
        <polygon points={polygonPoints} fill="hsl(var(--primary))" fillOpacity={0.1} stroke="none" />

        {/* Linhas do centro aos vertices */}
        {vertices.map((v, i) => (
          <line
            key={`spoke-${i}`}
            x1={centerX}
            y1={centerY}
            x2={v.x}
            y2={v.y}
            stroke="hsl(var(--border))"
            strokeWidth="1"
            strokeDasharray="3 3"
            opacity={0.3}
          />
        ))}

        {/* Arestas coloridas */}
        {edges.map((edge, i) => {
          const isHovered = hoveredEdge === i
          return (
            <line
              key={i}
              x1={edge.start.x}
              y1={edge.start.y}
              x2={edge.end.x}
              y2={edge.end.y}
              stroke={statusToColor(edge.status)}
              strokeWidth={isHovered ? 8 : 5}
              strokeLinecap="round"
              className="cursor-pointer transition-all"
              onMouseEnter={() => setHoveredEdge(i)}
              onMouseLeave={() => setHoveredEdge(null)}
            />
          )
        })}

        {/* Vertices (pontos) */}
        {vertices.map((v, i) => (
          <circle
            key={i}
            cx={v.x}
            cy={v.y}
            r={5}
            fill="hsl(var(--background))"
            stroke="hsl(var(--border))"
            strokeWidth="2"
          />
        ))}

        {/* Labels externos */}
        {edges.map((edge, i) => {
          const isHovered = hoveredEdge === i
          return (
            <text
              key={i}
              x={edge.labelX}
              y={edge.labelY}
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-[9px] font-medium pointer-events-none"
              style={{
                fill: isHovered ? statusToColor(edge.status) : "hsl(var(--foreground))",
                fontWeight: isHovered ? "bold" : "normal",
              }}
            >
              {edge.face.label}
            </text>
          )
        })}

        {/* Centro com resumo */}
        <circle cx={centerX} cy={centerY} r={35} fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="2" />
        <text x={centerX} y={centerY - 8} textAnchor="middle" className="text-[20px] font-bold fill-foreground">
          {result.summary.green}/{result.faces.length}
        </text>
        <text x={centerX} y={centerY + 10} textAnchor="middle" className="text-[9px] fill-muted-foreground">
          faces OK
        </text>
      </svg>

      {/* Tooltip */}
      {hoveredEdge !== null && (
        <div className="mt-2 px-3 py-1.5 bg-card border rounded-lg shadow-sm text-sm">
          {(() => {
            const edge = edges[hoveredEdge]
            return (
              <span>
                <strong>{edge.face.label}:</strong>{" "}
                <span style={{ color: statusToColor(edge.status) }}>{edge.status}</span>
                {edge.faceResult?.value !== undefined && ` (${(edge.faceResult.value * 100).toFixed(1)}%)`}
              </span>
            )
          })()}
        </div>
      )}
    </div>
  )
}
