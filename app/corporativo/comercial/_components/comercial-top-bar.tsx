"use client"

import type React from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ComercialHelpDialog } from "./comercial-help-dialog"
import { Search, Building2 } from "lucide-react"

// ============================================================================
// INTERFACE
// ============================================================================

interface ComercialTopBarProps {
  titulo: string
  searchPlaceholder?: string
  searchValue?: string
  onSearchChange?: (value: string) => void
  actions?: React.ReactNode
  badges?: Array<{
    label: string
    value: string | number
    variant?: "default" | "secondary" | "outline" | "destructive"
  }>
}

// ============================================================================
// COMPONENT
// ============================================================================

export function ComercialTopBar({
  titulo,
  searchPlaceholder = "Buscar...",
  searchValue,
  onSearchChange,
  actions,
  badges,
}: ComercialTopBarProps) {
  return (
    <header className="h-16 bg-background border-b flex items-center justify-between px-4 sticky top-0 z-10">
      <div className="flex items-center gap-3">
        {/* Badge Corporativo */}
        <div className="flex items-center gap-1.5 px-2 py-1 bg-muted rounded text-xs">
          <Building2 className="w-3.5 h-3.5 text-muted-foreground" />
          <span className="font-medium">Corporativo</span>
        </div>

        {/* Título */}
        <div className="flex items-center gap-2">
          <h1 className="text-sm font-semibold">{titulo}</h1>
          {badges && badges.length > 0 && (
            <div className="flex items-center gap-1.5">
              {badges.map((badge, index) => (
                <Badge key={index} variant={badge.variant || "outline"} className="text-[10px]">
                  {badge.label}: {badge.value}
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Busca */}
        {onSearchChange && (
          <div className="relative">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
            <Input
              placeholder={searchPlaceholder}
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-64 pl-7 h-8 text-xs"
            />
          </div>
        )}
      </div>

      {/* Ações */}
      <div className="flex items-center gap-1.5">
        <ComercialHelpDialog />
        {actions}
      </div>
    </header>
  )
}
