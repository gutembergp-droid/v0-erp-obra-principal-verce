"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle } from "lucide-react"
import type { AnaliseRisco, ClassificacaoRisco } from "@/lib/types/proposta"

// ============================================================================
// COMPONENT - MATRIZ DE RISCO
// ============================================================================

interface MatrizRiscoProps {
  analise: AnaliseRisco
}

export function MatrizRisco({ analise }: MatrizRiscoProps) {
  // Configuração da matriz 5x5
  const probabilidades = [5, 4, 3, 2, 1] // Alto para Baixo (top to bottom)
  const impactos = [1, 2, 3, 4, 5] // Baixo para Alto (left to right)

  // Função para determinar cor da célula
  const getCorCelula = (prob: number, imp: number): string => {
    const score = prob * imp
    if (score <= 6) return "bg-green-100 border-green-300 hover:bg-green-200"
    if (score <= 12) return "bg-yellow-100 border-yellow-300 hover:bg-yellow-200"
    if (score <= 20) return "bg-orange-100 border-orange-300 hover:bg-orange-200"
    return "bg-red-100 border-red-300 hover:bg-red-200"
  }

  // Contar riscos por célula
  const contarRiscos = (prob: number, imp: number): number => {
    return analise.riscos.filter(r => r.probabilidade === prob && r.impacto === imp).length
  }

  // Configuração de badges
  const badgeConfig: Record<ClassificacaoRisco, { cor: string; label: string }> = {
    baixo: { cor: "bg-green-600", label: "Baixo" },
    medio: { cor: "bg-yellow-600", label: "Médio" },
    alto: { cor: "bg-orange-600", label: "Alto" },
    critico: { cor: "bg-red-600", label: "Crítico" },
  }

  return (
    <Card className="border">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-bold">MATRIZ DE RISCO</CardTitle>
          <div className="flex items-center gap-2">
            {analise.matrizResumo.critico > 0 && (
              <Badge variant="destructive" className="animate-pulse">
                {analise.matrizResumo.critico} CRÍTICO
              </Badge>
            )}
            <Badge variant="outline" className="text-xs">
              {analise.riscos.length} risco(s)
            </Badge>
          </div>
        </div>
        <p className="text-xs text-muted-foreground">
          Probabilidade x Impacto • Classificação automática
        </p>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Resumo por Classificação */}
        <div className="grid grid-cols-4 gap-2">
          {(Object.entries(badgeConfig) as [ClassificacaoRisco, typeof badgeConfig[ClassificacaoRisco]][]).map(([tipo, config]) => {
            const count = analise.matrizResumo[tipo]
            return (
              <div key={tipo} className="text-center p-2 rounded border bg-muted/30">
                <p className="text-lg font-bold">{count}</p>
                <p className="text-[10px] font-medium">{config.label}</p>
              </div>
            )
          })}
        </div>

        {/* Matriz Visual 5x5 */}
        <div className="overflow-x-auto">
          <div className="min-w-[500px] space-y-1">
            {/* Header - Impacto */}
            <div className="flex items-center gap-1">
              <div className="w-24 text-center">
                <p className="text-[9px] font-bold text-muted-foreground">PROBABILIDADE ↓</p>
              </div>
              <div className="flex-1 grid grid-cols-5 gap-1">
                {impactos.map(imp => (
                  <div key={imp} className="text-center">
                    <p className="text-[9px] font-bold text-muted-foreground">{imp}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Células da Matriz */}
            {probabilidades.map(prob => (
              <div key={prob} className="flex items-center gap-1">
                {/* Label Probabilidade */}
                <div className="w-24 text-center">
                  <p className="text-[10px] font-bold">{prob}</p>
                </div>

                {/* Células */}
                <div className="flex-1 grid grid-cols-5 gap-1">
                  {impactos.map(imp => {
                    const count = contarRiscos(prob, imp)
                    const score = prob * imp
                    return (
                      <div
                        key={`${prob}-${imp}`}
                        className={`aspect-square flex items-center justify-center border-2 rounded transition-all cursor-pointer ${getCorCelula(prob, imp)}`}
                        title={`Prob: ${prob} x Imp: ${imp} = ${score}`}
                      >
                        {count > 0 && (
                          <div className="text-center">
                            <p className="text-sm font-bold">{count}</p>
                            {count > 1 && (
                              <p className="text-[8px]">riscos</p>
                            )}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}

            {/* Footer - Impacto Label */}
            <div className="flex items-center gap-1 pt-1">
              <div className="w-24" />
              <div className="flex-1 text-center">
                <p className="text-[9px] font-bold text-muted-foreground">IMPACTO →</p>
              </div>
            </div>
          </div>
        </div>

        {/* Legenda */}
        <div className="flex items-center justify-center gap-3 p-2 rounded bg-muted/30">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-green-100 border-2 border-green-300" />
            <span className="text-[9px] font-medium">Baixo (1-6)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-yellow-100 border-2 border-yellow-300" />
            <span className="text-[9px] font-medium">Médio (7-12)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-orange-100 border-2 border-orange-300" />
            <span className="text-[9px] font-medium">Alto (13-20)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-red-100 border-2 border-red-300" />
            <span className="text-[9px] font-medium">Crítico (21-25)</span>
          </div>
        </div>

        {/* Alerta Crítico */}
        {analise.matrizResumo.critico > 0 && (
          <div className="p-3 rounded-lg border-2 border-red-400 bg-red-50 animate-pulse">
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs font-bold text-red-900">
                  {analise.matrizResumo.critico} RISCO(S) CRÍTICO(S) IDENTIFICADO(S)
                </p>
                <p className="text-[10px] text-red-700 mt-1">
                  Liberação para funil bloqueada. Solicite exceção ou mitigue os riscos.
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
