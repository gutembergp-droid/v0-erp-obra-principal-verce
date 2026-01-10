"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"
import { AlertTriangle, Clock, ChevronRight } from "lucide-react"
import type { AlertasCriticos as AlertasCriticosType } from "@/lib/types/comercial"

// ============================================================================
// INTERFACE
// ============================================================================

interface AlertasCriticosProps {
  dados: AlertasCriticosType
}

// ============================================================================
// COMPONENT
// ============================================================================

export function AlertasCriticos({ dados }: AlertasCriticosProps) {
  const router = useRouter()

  const handleAlertaClick = (alerta: any) => {
    // Redireciona para a entidade correspondente
    if (alerta.entidadeTipo === "proposta") {
      router.push("/corporativo/comercial/propostas")
    } else if (alerta.entidadeTipo === "cliente") {
      router.push("/corporativo/comercial/clientes")
    } else if (alerta.entidadeTipo === "contrato") {
      router.push("/corporativo/comercial/contratos")
    }
  }

  const totalAlertas = dados.criticos.length + dados.atencao.length

  if (totalAlertas === 0) {
    return (
      <Card className="border">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="text-base font-semibold">Alertas Críticos</h3>
              <Badge variant="outline" className="text-[10px] bg-green-50 text-green-700 border-green-200">
                0 alertas
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-3">
              <Clock className="w-6 h-6 text-green-600" />
            </div>
            <p className="text-sm font-medium text-green-900">Nenhum alerta crítico no momento</p>
            <p className="text-xs text-muted-foreground mt-1">Todas as atividades estão dentro do prazo</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-semibold">Alertas Críticos</h3>
            <Badge variant="destructive" className="text-[10px]">
              {totalAlertas} total
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            {dados.criticos.length > 0 && (
              <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-100 border border-red-200">
                <div className="w-1.5 h-1.5 rounded-full bg-red-600" />
                <span className="text-[10px] font-medium text-red-900">
                  {dados.criticos.length} Crítico{dados.criticos.length > 1 ? "s" : ""}
                </span>
              </div>
            )}
            {dados.atencao.length > 0 && (
              <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100 border border-amber-200">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-600" />
                <span className="text-[10px] font-medium text-amber-900">
                  {dados.atencao.length} Atenção
                </span>
              </div>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        {/* Alertas Críticos */}
        {dados.criticos.slice(0, 3).map((alerta) => (
          <div
            key={alerta.id}
            className="flex items-start gap-3 p-3 rounded border border-red-200 bg-red-50 cursor-pointer hover:bg-red-100 transition-colors"
            onClick={() => handleAlertaClick(alerta)}
          >
            <div className="flex-shrink-0 mt-0.5">
              <div className="w-6 h-6 rounded-full bg-red-100 border border-red-300 flex items-center justify-center">
                <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm font-medium text-red-900">{alerta.mensagem}</p>
                <ChevronRight className="w-4 h-4 text-red-600 flex-shrink-0" />
              </div>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="destructive" className="text-[9px] px-1.5 py-0">
                  {alerta.tipo}
                </Badge>
                <span className="text-[10px] text-red-600">
                  {new Date(alerta.data).toLocaleDateString("pt-BR")}
                </span>
              </div>
            </div>
          </div>
        ))}

        {/* Alertas de Atenção */}
        {dados.atencao.slice(0, 2).map((alerta) => (
          <div
            key={alerta.id}
            className="flex items-start gap-3 p-3 rounded border border-amber-200 bg-amber-50 cursor-pointer hover:bg-amber-100 transition-colors"
            onClick={() => handleAlertaClick(alerta)}
          >
            <div className="flex-shrink-0 mt-0.5">
              <div className="w-6 h-6 rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center">
                <Clock className="w-3.5 h-3.5 text-amber-600" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm font-medium text-amber-900">{alerta.mensagem}</p>
                <ChevronRight className="w-4 h-4 text-amber-600 flex-shrink-0" />
              </div>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline" className="text-[9px] px-1.5 py-0 bg-amber-100 text-amber-900 border-amber-300">
                  {alerta.tipo}
                </Badge>
                <span className="text-[10px] text-amber-600">
                  {new Date(alerta.data).toLocaleDateString("pt-BR")}
                </span>
              </div>
            </div>
          </div>
        ))}

        {/* Ver Todos */}
        {totalAlertas > 5 && (
          <Button variant="ghost" size="sm" className="w-full text-xs text-muted-foreground hover:text-foreground">
            Ver todos os {totalAlertas} alertas
            <ChevronRight className="w-3 h-3 ml-1" />
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
