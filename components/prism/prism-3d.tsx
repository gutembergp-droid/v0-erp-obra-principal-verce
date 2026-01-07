"use client"

import type React from "react"

import { useState, useRef } from "react"
import type { PrismResult, PrismStatus } from "@/lib/prism/types"

interface Prism3DProps {
  result: PrismResult
}

const FACES_3D = [
  { key: "orcamentario", label: "ORC", position: { x: 0, y: -1, z: 0 } },
  { key: "contratual", label: "CTR", position: { x: 1, y: -0.5, z: 0.5 } },
  { key: "executado", label: "EXE", position: { x: 1, y: 0.5, z: -0.5 } },
  { key: "eac", label: "EAC", position: { x: 0, y: 1, z: 0 } },
  { key: "tecnico", label: "TEC", position: { x: -1, y: 0.5, z: -0.5 } },
  { key: "produtividade", label: "PRO", position: { x: -1, y: -0.5, z: 0.5 } },
  { key: "prazo", label: "PRZ", position: { x: 0.5, y: 0, z: 1 } },
  { key: "risco", label: "RSC", position: { x: -0.5, y: 0, z: 1 } },
  { key: "alcada", label: "ALC", position: { x: 0, y: 0, z: -1 } },
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

export function Prism3D({ result }: Prism3DProps) {
  const [rotation, setRotation] = useState({ x: -20, y: 30 })
  const [isDragging, setIsDragging] = useState(false)
  const [hoveredFace, setHoveredFace] = useState<string | null>(null)
  const lastPos = useRef({ x: 0, y: 0 })

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    lastPos.current = { x: e.clientX, y: e.clientY }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    const deltaX = e.clientX - lastPos.current.x
    const deltaY = e.clientY - lastPos.current.y
    setRotation((prev) => ({
      x: prev.x + deltaY * 0.5,
      y: prev.y + deltaX * 0.5,
    }))
    lastPos.current = { x: e.clientX, y: e.clientY }
  }

  const handleMouseUp = () => setIsDragging(false)

  // Projeta ponto 3D para 2D com rotacao
  const project = (x: number, y: number, z: number) => {
    const radX = (rotation.x * Math.PI) / 180
    const radY = (rotation.y * Math.PI) / 180

    // Rotacao em Y
    const x1 = x * Math.cos(radY) - z * Math.sin(radY)
    const z1 = x * Math.sin(radY) + z * Math.cos(radY)

    // Rotacao em X
    const y1 = y * Math.cos(radX) - z1 * Math.sin(radX)
    const z2 = y * Math.sin(radX) + z1 * Math.cos(radX)

    // Projecao perspectiva
    const scale = 200 / (4 + z2)
    return {
      x: 150 + x1 * scale,
      y: 150 + y1 * scale,
      z: z2,
    }
  }

  // Ordenar faces por profundidade (z) para renderizar corretamente
  const projectedFaces = FACES_3D.map((face) => {
    const faceResult = result.faces.find((f) => f.face.toLowerCase() === face.key)
    const status = faceResult?.status || "NEUTRAL"
    const projected = project(face.position.x * 60, face.position.y * 60, face.position.z * 60)
    return { ...face, projected, status, faceResult }
  }).sort((a, b) => b.projected.z - a.projected.z)

  return (
    <div className="flex flex-col items-center">
      <svg
        width="300"
        height="300"
        viewBox="0 0 300 300"
        className="cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Linhas conectando centro aos vertices */}
        {projectedFaces.map((face, i) => (
          <line
            key={`line-${i}`}
            x1={150}
            y1={150}
            x2={face.projected.x}
            y2={face.projected.y}
            stroke="hsl(var(--border))"
            strokeWidth="1"
            opacity={0.3}
          />
        ))}

        {/* Faces do prisma */}
        {projectedFaces.map((face, i) => {
          const isHovered = hoveredFace === face.key
          const size = isHovered ? 28 : 22
          const opacity = 0.6 + (face.projected.z + 1) * 0.2

          return (
            <g key={i}>
              {/* Hexagono como face */}
              <polygon
                points={`
                  ${face.projected.x},${face.projected.y - size}
                  ${face.projected.x + size * 0.866},${face.projected.y - size * 0.5}
                  ${face.projected.x + size * 0.866},${face.projected.y + size * 0.5}
                  ${face.projected.x},${face.projected.y + size}
                  ${face.projected.x - size * 0.866},${face.projected.y + size * 0.5}
                  ${face.projected.x - size * 0.866},${face.projected.y - size * 0.5}
                `}
                fill={statusToColor(face.status)}
                fillOpacity={opacity}
                stroke="white"
                strokeWidth="2"
                className="cursor-pointer transition-all"
                onMouseEnter={() => setHoveredFace(face.key)}
                onMouseLeave={() => setHoveredFace(null)}
              />
              <text
                x={face.projected.x}
                y={face.projected.y}
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-[9px] font-bold fill-white pointer-events-none"
              >
                {face.label}
              </text>
            </g>
          )
        })}

        {/* Centro do prisma */}
        <circle cx={150} cy={150} r={12} fill="hsl(var(--primary))" opacity={0.8} />
        <text x={150} y={150} textAnchor="middle" dominantBaseline="middle" className="text-[8px] font-bold fill-white">
          {result.summary.green}/{result.faces.length}
        </text>
      </svg>

      <p className="text-xs text-muted-foreground mt-1">Arraste para rotacionar</p>

      {/* Tooltip */}
      {hoveredFace && (
        <div className="mt-2 px-3 py-1.5 bg-card border rounded-lg shadow-sm text-sm">
          {(() => {
            const face = projectedFaces.find((f) => f.key === hoveredFace)
            return (
              <span>
                <strong>{face?.key}:</strong>{" "}
                <span style={{ color: statusToColor(face?.status || "NEUTRAL") }}>{face?.status}</span>
                {face?.faceResult?.value !== undefined && ` (${(face.faceResult.value * 100).toFixed(1)}%)`}
              </span>
            )
          })()}
        </div>
      )}
    </div>
  )
}
