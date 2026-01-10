"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, HelpCircle, AlertTriangle, Zap } from "lucide-react"
import { useState } from "react"
import { ComercialHelpDialog } from "./comercial-help-dialog"
import type { AlertasCriticos as AlertasCriticosType } from "@/lib/types/comercial"

// ============================================================================
// INTERFACE
// ============================================================================

interface ComercialTopBarProps {
  titulo?: string
  badges?: Array<{
    label: string
    value: string
    variant?: "default" | "secondary" | "destructive" | "outline"
  }>
  alertasCriticos?: AlertasCriticosType
}

// ============================================================================
// COMPONENT
// ============================================================================

export function ComercialTopBar({ titulo = "Comercial", badges = [], alertasCriticos }: ComercialTopBarProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [helpOpen, setHelpOpen] = useState(false)
  const [alertasOpen, setAlertasOpen] = useState(false)

  const temAlertas = alertasCriticos && alertasCriticos.total > 0

  return (
    <>
      <div className="sticky top-0 z-10 bg-background border-b border-border h-16">
        <div className="h-full px-4 flex items-center gap-4">
          {/* Título e Badges */}
          <div className="flex items-center gap-3">
            <h1 className="text-lg font-semibold">{titulo}</h1>
            {badges.map((badge, index) => (
              <Badge key={index} variant={badge.variant || "outline"} className="text-xs">
                {badge.label}: {badge.value}
              </Badge>
            ))}
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Alertas Críticos (Compacto e Marcante) */}
          {temAlertas && (
            <Button
              variant="destructive"
              size="sm"
              className="gap-2 animate-pulse hover:animate-none"
              onClick={() => setAlertasOpen(!alertasOpen)}
            >
              <AlertTriangle className="w-4 h-4" />
              <span className="font-bold">{alertasCriticos.total}</span>
              <span className="text-xs">ALERTAS CRÍTICOS</span>
              <Zap className="w-3 h-3" />
            </Button>
          )}

          {/* Busca */}
          <div className="relative w-64">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Buscar cliente, proposta..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 h-8 text-xs"
            />
          </div>

          {/* Ajuda */}
          <Button variant="ghost" size="sm" onClick={() => setHelpOpen(true)}>
            <HelpCircle className="w-4 h-4" />
          </Button>

          {/* Nova Proposta */}
          <Button size="sm" className="gap-1.5">
            <Plus className="w-4 h-4" />
            Nova Proposta
          </Button>
        </div>
      </div>

      {/* Painel de Alertas (Dropdown Expandido) */}
      {alertasOpen && temAlertas && (
        <div className="relative z-20">
          <div className="absolute top-0 right-4 w-96 bg-background border border-border rounded-lg shadow-2xl p-4 space-y-3 animate-in slide-in-from-top-2">
            {/* Header */}
            <div className="flex items-center justify-between border-b pb-2">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-600" />
                <h3 className="font-bold text-sm">ALERTAS CRÍTICOS</h3>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setAlertasOpen(false)}>
                ✕
              </Button>
            </div>

            {/* Total */}
            <div className="flex items-center justify-between p-2 rounded bg-red-50 border border-red-200">
              <span className="text-xs text-red-900 font-medium">Total de alertas:</span>
              <span className="text-lg font-bold text-red-600">{alertasCriticos.total}</span>
            </div>

            {/* Separação por Severidade */}
            <div className="grid grid-cols-2 gap-2">
              <div className="text-center p-2 rounded bg-red-100 border border-red-300">
                <p className="text-xs text-red-700">Críticos</p>
                <p className="text-xl font-bold text-red-600">{alertasCriticos.criticos}</p>
              </div>
              <div className="text-center p-2 rounded bg-amber-100 border border-amber-300">
                <p className="text-xs text-amber-700">Atenção</p>
                <p className="text-xl font-bold text-amber-600">{alertasCriticos.atencao}</p>
              </div>
            </div>

            {/* Lista de Alertas */}
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {alertasCriticos.alertas.slice(0, 5).map((alerta) => (
                <div
                  key={alerta.id}
                  className={`p-2 rounded border cursor-pointer hover:shadow-md transition-all ${
                    alerta.severidade === "critico"
                      ? "bg-red-50 border-red-300"
                      : "bg-amber-50 border-amber-300"
                  }`}
                  onClick={() => {
                    // Navegar para a ação
                    console.log("Navegar para:", alerta.link)
                  }}
                >
                  <div className="flex items-start gap-2">
                    {alerta.severidade === "critico" ? (
                      <Zap className="w-3 h-3 text-red-600 mt-0.5 flex-shrink-0" />
                    ) : (
                      <AlertTriangle className="w-3 h-3 text-amber-600 mt-0.5 flex-shrink-0" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className={`text-xs font-medium ${
                        alerta.severidade === "critico" ? "text-red-900" : "text-amber-900"
                      }`}>
                        {alerta.mensagem}
                      </p>
                      {alerta.valor && (
                        <p className={`text-[10px] mt-0.5 ${
                          alerta.severidade === "critico" ? "text-red-700" : "text-amber-700"
                        }`}>
                          Valor: R$ {(alerta.valor / 1000000).toFixed(0)}Mi
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <Button
              variant="outline"
              size="sm"
              className="w-full text-xs"
              onClick={() => setAlertasOpen(false)}
            >
              Resolver todos os alertas
            </Button>
          </div>
        </div>
      )}

      {/* Help Dialog */}
      <ComercialHelpDialog open={helpOpen} onOpenChange={setHelpOpen} />
    </>
  )
}
