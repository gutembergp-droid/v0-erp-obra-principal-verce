"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Zap, Target, TrendingUp, AlertCircle, ChevronRight } from "lucide-react"

// ============================================================================
// COMPONENT - SIDEBAR DE INSIGHTS E RECOMENDAÇÕES
// ============================================================================

export function SidebarInsights() {
  return (
    <div className="w-[360px] border-l border-border bg-muted/30 flex flex-col h-full">
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-5">
          {/* PRÓXIMAS AÇÕES RECOMENDADAS */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b">
              <Zap className="w-4 h-4 text-primary" />
              <h3 className="font-bold text-sm">PRÓXIMAS AÇÕES</h3>
              <Badge variant="destructive" className="ml-auto text-xs">
                3 urgentes
              </Badge>
            </div>

            {/* Ação 1 - Crítica */}
            <div className="group p-3 rounded-lg border-2 border-red-300 bg-red-50 hover:shadow-lg transition-all cursor-pointer">
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 rounded-full bg-red-600 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                  1
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-red-900 mb-1">
                    Follow-up UHE Belo Monte
                  </p>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5">
                      <Target className="w-3 h-3 text-red-600" />
                      <span className="text-[10px] text-red-700 font-semibold">
                        R$ 890Mi
                      </span>
                    </div>
                    <p className="text-[10px] text-red-700">
                      Vence <span className="font-bold">AMANHÃ</span>
                    </p>
                    <p className="text-[10px] text-red-700">
                      Contato: Roberto Fernandes
                    </p>
                  </div>
                  <Button 
                    size="sm" 
                    variant="destructive" 
                    className="w-full mt-2 h-7 text-xs"
                  >
                    <Zap className="w-3 h-3 mr-1" />
                    Ligar AGORA
                  </Button>
                </div>
              </div>
            </div>

            {/* Ação 2 - Alta Prioridade */}
            <div className="group p-3 rounded-lg border-2 border-amber-300 bg-amber-50 hover:shadow-lg transition-all cursor-pointer">
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 rounded-full bg-amber-600 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                  2
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-amber-900 mb-1">
                    Destravar Orçamento
                  </p>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5">
                      <Target className="w-3 h-3 text-amber-600" />
                      <span className="text-[10px] text-amber-700 font-semibold">
                        R$ 280Mi
                      </span>
                    </div>
                    <p className="text-[10px] text-amber-700">
                      Parado há <span className="font-bold">20 dias</span>
                    </p>
                    <p className="text-[10px] text-amber-700">
                      Responsável: Pedro Alves
                    </p>
                  </div>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="w-full mt-2 h-7 text-xs border-amber-300 hover:bg-amber-100"
                  >
                    Escalar para Diretoria
                  </Button>
                </div>
              </div>
            </div>

            {/* Ação 3 - Importante */}
            <div className="group p-3 rounded-lg border-2 border-blue-300 bg-blue-50 hover:shadow-lg transition-all cursor-pointer">
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                  3
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-blue-900 mb-1">
                    Acelerar Prospecção
                  </p>
                  <div className="space-y-1">
                    <p className="text-[10px] text-blue-700">
                      Faltam <span className="font-bold">8 clientes</span> este mês
                    </p>
                    <p className="text-[10px] text-blue-700">
                      Meta mensal: 20 prospecções
                    </p>
                    <p className="text-[10px] text-blue-700">
                      Impacto: Pipeline em 60 dias
                    </p>
                  </div>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="w-full mt-2 h-7 text-xs border-blue-300 hover:bg-blue-100"
                  >
                    Ver oportunidades
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* PERFORMANCE vs META ANUAL */}
          <div className="space-y-3 pt-4 border-t">
            <div className="flex items-center gap-2 pb-2 border-b">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              <h3 className="font-bold text-sm">PERFORMANCE ANUAL</h3>
            </div>

            {/* Meta 1: Receita */}
            <div className="p-3 rounded-lg border bg-card space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium">Receita Anual</span>
                <Badge variant="default" className="text-xs bg-emerald-600">
                  100%
                </Badge>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div className="h-full bg-emerald-500 transition-all" style={{ width: "100%" }} />
              </div>
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-muted-foreground">R$ 800Mi</span>
                <span className="text-emerald-600 font-bold">✓ META ALCANÇADA</span>
              </div>
            </div>

            {/* Meta 2: Conversão */}
            <div className="p-3 rounded-lg border bg-card space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium">Taxa Conversão</span>
                <Badge variant="destructive" className="text-xs">
                  0% vs 20%
                </Badge>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div className="h-full bg-red-500 transition-all" style={{ width: "0%" }} />
              </div>
              <div className="flex items-start gap-1 text-[10px]">
                <AlertCircle className="w-3 h-3 text-red-600 mt-0.5 flex-shrink-0" />
                <span className="text-red-600 font-medium">
                  URGENTE: Destravar funil Q1
                </span>
              </div>
            </div>

            {/* Meta 3: Prospecção */}
            <div className="p-3 rounded-lg border bg-card space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium">Prospecção Mensal</span>
                <Badge variant="secondary" className="text-xs">
                  60%
                </Badge>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div className="h-full bg-amber-500 transition-all" style={{ width: "60%" }} />
              </div>
              <div className="flex items-start gap-1 text-[10px]">
                <AlertCircle className="w-3 h-3 text-amber-600 mt-0.5 flex-shrink-0" />
                <span className="text-amber-600 font-medium">
                  Captar 8 clientes para manter ritmo
                </span>
              </div>
            </div>
          </div>

          {/* INDICADORES RÁPIDOS */}
          <div className="space-y-3 pt-4 border-t">
            <div className="flex items-center gap-2 pb-2 border-b">
              <Target className="w-4 h-4 text-purple-600" />
              <h3 className="font-bold text-sm">INDICADORES</h3>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="p-2 rounded border bg-card text-center">
                <p className="text-lg font-bold">87d</p>
                <p className="text-[9px] text-muted-foreground">Tempo Funil</p>
              </div>
              <div className="p-2 rounded border bg-card text-center">
                <p className="text-lg font-bold">18.5%</p>
                <p className="text-[9px] text-muted-foreground">Margem</p>
              </div>
              <div className="p-2 rounded border bg-card text-center">
                <p className="text-lg font-bold text-emerald-600">R$ 45Mi</p>
                <p className="text-[9px] text-muted-foreground">Ticket Médio</p>
              </div>
              <div className="p-2 rounded border bg-card text-center">
                <p className="text-lg font-bold text-red-600">3</p>
                <p className="text-[9px] text-muted-foreground">Paradas</p>
              </div>
            </div>
          </div>

        </div>
      </ScrollArea>

      {/* Footer da Sidebar */}
      <div className="p-3 border-t bg-background">
        <Button variant="outline" size="sm" className="w-full text-xs gap-1.5">
          Ver todas recomendações
          <ChevronRight className="w-3 h-3" />
        </Button>
      </div>
    </div>
  )
}
