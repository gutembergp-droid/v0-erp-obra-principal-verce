"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"
import { Users, DollarSign, UserPlus, Building2, ChevronRight, AlertCircle } from "lucide-react"
import type { DadosProspeccao } from "@/lib/types/comercial"

// ============================================================================
// INTERFACE
// ============================================================================

interface CardProspeccaoProps {
  dados: DadosProspeccao
}

// ============================================================================
// COMPONENT
// ============================================================================

export function CardProspeccao({ dados }: CardProspeccaoProps) {
  const router = useRouter()

  const formatCurrency = (value: number) => {
    if (value >= 1000000000) return `R$ ${(value / 1000000000).toFixed(1)}Bi`
    if (value >= 1000000) return `R$ ${(value / 1000000).toFixed(0)}Mi`
    return `R$ ${value.toLocaleString("pt-BR")}`
  }

  return (
    <Card className="border hover:border-primary/50 transition-colors cursor-pointer" onClick={() => router.push("/corporativo/comercial/clientes")}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold">Prospecção</CardTitle>
          <Users className="w-4 h-4 text-muted-foreground" />
        </div>
        <p className="text-xs text-muted-foreground">Futuro da receita • Novos negócios</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* KPIs */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-1">
              <Users className="w-3 h-3 text-blue-600" />
              <p className="text-xs text-muted-foreground">Prospecções Ativas</p>
            </div>
            <p className="text-xl font-bold">{dados.prospeccoesAtivas}</p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-1">
              <DollarSign className="w-3 h-3 text-emerald-600" />
              <p className="text-xs text-muted-foreground">Valor Potencial</p>
            </div>
            <p className="text-xl font-bold text-emerald-600">{formatCurrency(dados.valorPotencial)}</p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-1">
              <UserPlus className="w-3 h-3 text-purple-600" />
              <p className="text-xs text-muted-foreground">Clientes Novos</p>
            </div>
            <p className="text-xl font-bold">{dados.clientesNovos}</p>
            <p className="text-[10px] text-muted-foreground">Últimos 30 dias</p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-1">
              <Building2 className="w-3 h-3 text-amber-600" />
              <p className="text-xs text-muted-foreground">Distribuição</p>
            </div>
            <div className="flex items-center gap-1.5 text-xs">
              <span className="font-medium">{dados.distribuicao.publico}% Público</span>
              <span className="text-muted-foreground">•</span>
              <span className="font-medium">{dados.distribuicao.privado}% Privado</span>
            </div>
          </div>
        </div>

        {/* Gráfico Simulado de Distribuição */}
        <div className="space-y-1.5">
          <p className="text-xs font-medium">Distribuição por Tipo</p>
          <div className="flex h-2 rounded-full overflow-hidden bg-muted">
            <div className="bg-blue-500" style={{ width: `${dados.distribuicao.publico}%` }} />
            <div className="bg-purple-500" style={{ width: `${dados.distribuicao.privado}%` }} />
          </div>
          <div className="flex items-center justify-between text-[10px] text-muted-foreground">
            <span>Público {dados.distribuicao.publico}%</span>
            <span>Privado {dados.distribuicao.privado}%</span>
          </div>
        </div>

        {/* Alertas */}
        {dados.alertas.length > 0 && (
          <div className="pt-3 border-t space-y-2">
            <div className="flex items-center gap-1.5">
              <AlertCircle className="w-3 h-3 text-amber-600" />
              <p className="text-xs font-medium">Alertas de Prospecção</p>
            </div>
            {dados.alertas.slice(0, 2).map((alerta) => (
              <div key={alerta.id} className="flex items-start gap-2 p-2 rounded bg-amber-50 border border-amber-200">
                <AlertCircle className="w-3 h-3 text-amber-600 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-amber-900">{alerta.mensagem}</p>
              </div>
            ))}
            {dados.alertas.length > 2 && (
              <p className="text-[10px] text-muted-foreground">
                +{dados.alertas.length - 2} alertas adicionais
              </p>
            )}
          </div>
        )}

        {/* Botão de Ação */}
        <Button variant="outline" size="sm" className="w-full text-xs gap-1.5" onClick={() => router.push("/corporativo/comercial/clientes")}>
          Ver CRM Completo
          <ChevronRight className="w-3 h-3" />
        </Button>
      </CardContent>
    </Card>
  )
}
