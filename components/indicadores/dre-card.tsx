"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calculator, BarChart3, CalendarIcon, PieChart, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

interface DREItemProps {
  codigo: string
  nome: string
  valor: number
  previsto: number
  meta?: number
  icone: React.ElementType
  cor: string
  tipo: "receita" | "custo" | "resultado"
}

interface DRECardProps {
  titulo?: string
  itens: DREItemProps[]
  onItemClick?: (item: DREItemProps) => void
}

// Formata valores monetarios
const formatarMoeda = (valor: number) => {
  if (valor >= 1000000000) return `R$ ${(valor / 1000000000).toFixed(1)} Bi`
  if (valor >= 1000000) return `R$ ${(valor / 1000000).toFixed(1)} Mi`
  if (valor >= 1000) return `R$ ${(valor / 1000).toFixed(1)} mil`
  return `R$ ${valor.toFixed(0)}`
}

// Card individual do DRE
function DREItemCard({ item, onOpenPopup }: { item: DREItemProps; onOpenPopup: () => void }) {
  const realizado = item.valor
  const previsto = item.previsto
  const percentualConsumido = (realizado / previsto) * 100
  const desvio = realizado - previsto
  const desvioPercentual = ((realizado - previsto) / previsto) * 100

  // Para receita: acima do previsto e bom. Para custo: abaixo do previsto e bom
  const isPositivo = item.tipo === "receita" ? desvio >= 0 : desvio <= 0

  const Icone = item.icone

  return (
    <Card
      className="p-4 cursor-pointer hover:shadow-md transition-shadow border-l-4"
      style={{ borderLeftColor: item.cor }}
      onClick={onOpenPopup}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg" style={{ backgroundColor: `${item.cor}15` }}>
            <Icone className="h-4 w-4" style={{ color: item.cor }} />
          </div>
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{item.nome}</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="h-6 w-6 p-0"
          onClick={(e) => {
            e.stopPropagation()
            onOpenPopup()
          }}
        >
          <BarChart3 className="h-4 w-4 text-muted-foreground" />
        </Button>
      </div>

      {/* Valor Principal */}
      <div className="mb-3">
        <div className="text-2xl font-bold text-foreground">{formatarMoeda(realizado)}</div>
      </div>

      {/* Previsto vs Realizado */}
      <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
        <div className="bg-muted/50 rounded p-2">
          <div className="text-muted-foreground">Previsto</div>
          <div className="font-semibold">{formatarMoeda(previsto)}</div>
        </div>
        <div className="bg-muted/50 rounded p-2">
          <div className="text-muted-foreground">Realizado</div>
          <div className="font-semibold">{formatarMoeda(realizado)}</div>
        </div>
      </div>

      {/* Barra de Progresso */}
      <div className="mb-3">
        <div className="flex justify-between text-xs mb-1">
          <span className="text-muted-foreground">Consumido</span>
          <span className={cn("font-medium", isPositivo ? "text-emerald-600" : "text-red-600")}>
            {percentualConsumido.toFixed(1)}%
          </span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all"
            style={{
              width: `${Math.min(percentualConsumido, 100)}%`,
              backgroundColor: isPositivo ? "#10b981" : percentualConsumido > 100 ? "#ef4444" : item.cor,
            }}
          />
        </div>
      </div>

      {/* Desvio */}
      <div
        className={cn(
          "flex items-center justify-between text-xs p-2 rounded",
          isPositivo ? "bg-emerald-50 dark:bg-emerald-900/20" : "bg-red-50 dark:bg-red-900/20",
        )}
      >
        <span className="text-muted-foreground">Desvio:</span>
        <div className="flex items-center gap-1">
          {isPositivo ? (
            <ArrowUpRight className="h-3 w-3 text-emerald-600" />
          ) : (
            <ArrowDownRight className="h-3 w-3 text-red-600" />
          )}
          <span className={cn("font-medium", isPositivo ? "text-emerald-600" : "text-red-600")}>
            {desvio >= 0 ? "+" : ""}
            {formatarMoeda(Math.abs(desvio))} ({desvioPercentual >= 0 ? "+" : ""}
            {desvioPercentual.toFixed(1)}%)
          </span>
        </div>
      </div>
    </Card>
  )
}

// Popup com graficos
function DREPopup({
  item,
  allItens,
  open,
  onClose,
}: {
  item: DREItemProps | null
  allItens: DREItemProps[]
  open: boolean
  onClose: () => void
}) {
  const [tipoGrafico, setTipoGrafico] = useState<"ranking" | "pizza">("ranking")
  const [periodo, setPeriodo] = useState<"mes" | "trimestre" | "ano">("mes")
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: new Date(2024, 0, 1),
    to: new Date(2025, 0, 31),
  })

  if (!item) return null

  // Dados para grafico de ranking
  const dadosRanking = allItens
    .filter((i) => i.tipo === "custo" || i.tipo === "receita")
    .sort((a, b) => b.valor - a.valor)

  const maxValor = Math.max(...dadosRanking.map((i) => i.valor))

  // Dados para grafico de pizza (composicao percentual)
  const totalCustos = allItens.filter((i) => i.tipo === "custo").reduce((acc, i) => acc + i.valor, 0)
  const dadosPizza = allItens
    .filter((i) => i.tipo === "custo")
    .map((i) => ({
      ...i,
      percentual: (i.valor / totalCustos) * 100,
    }))

  // Historico mensal mockado
  const historicoMensal = [
    { mes: "Jul/24", previsto: item.previsto * 0.1, realizado: item.valor * 0.09 },
    { mes: "Ago/24", previsto: item.previsto * 0.12, realizado: item.valor * 0.11 },
    { mes: "Set/24", previsto: item.previsto * 0.14, realizado: item.valor * 0.15 },
    { mes: "Out/24", previsto: item.previsto * 0.16, realizado: item.valor * 0.17 },
    { mes: "Nov/24", previsto: item.previsto * 0.18, realizado: item.valor * 0.18 },
    { mes: "Dez/24", previsto: item.previsto * 0.15, realizado: item.valor * 0.14 },
    { mes: "Jan/25", previsto: item.previsto * 0.15, realizado: item.valor * 0.16 },
  ]

  const maxHistorico = Math.max(...historicoMensal.flatMap((h) => [h.previsto, h.realizado]))

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="p-2 rounded-lg" style={{ backgroundColor: `${item.cor}15` }}>
              <item.icone className="h-5 w-5" style={{ color: item.cor }} />
            </div>
            <div>
              <div className="text-lg">{item.nome} - Analise Detalhada</div>
              <div className="text-sm font-normal text-muted-foreground">{item.codigo}</div>
            </div>
          </DialogTitle>
        </DialogHeader>

        {/* Filtros */}
        <div className="flex flex-wrap items-center gap-3 p-3 bg-muted/30 rounded-lg mb-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                <CalendarIcon className="h-4 w-4" />
                {format(dateRange.from, "MMM/yy", { locale: ptBR })} -{" "}
                {format(dateRange.to, "MMM/yy", { locale: ptBR })}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="range"
                selected={{ from: dateRange.from, to: dateRange.to }}
                onSelect={(range) => {
                  if (range?.from && range?.to) {
                    setDateRange({ from: range.from, to: range.to })
                  }
                }}
                locale={ptBR}
              />
            </PopoverContent>
          </Popover>

          <Select value={periodo} onValueChange={(v) => setPeriodo(v as any)}>
            <SelectTrigger className="w-[130px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mes">Mensal</SelectItem>
              <SelectItem value="trimestre">Trimestral</SelectItem>
              <SelectItem value="ano">Anual</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex gap-1 ml-auto">
            <Button
              variant={tipoGrafico === "ranking" ? "default" : "outline"}
              size="sm"
              onClick={() => setTipoGrafico("ranking")}
            >
              <BarChart3 className="h-4 w-4 mr-1" />
              Ranking
            </Button>
            <Button
              variant={tipoGrafico === "pizza" ? "default" : "outline"}
              size="sm"
              onClick={() => setTipoGrafico("pizza")}
            >
              <PieChart className="h-4 w-4 mr-1" />
              Composicao
            </Button>
          </div>
        </div>

        <Tabs defaultValue="comparativo" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="comparativo">Previsto vs Realizado</TabsTrigger>
            <TabsTrigger value="ranking">Ranking</TabsTrigger>
            <TabsTrigger value="composicao">Composicao</TabsTrigger>
          </TabsList>

          {/* Aba Comparativo */}
          <TabsContent value="comparativo" className="space-y-4">
            <Card className="p-4">
              <h4 className="font-medium mb-4">Evolucao Mensal - Previsto vs Realizado</h4>
              <div className="space-y-3">
                {historicoMensal.map((h, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="font-medium">{h.mes}</span>
                      <span className="text-muted-foreground">
                        Prev: {formatarMoeda(h.previsto)} | Real: {formatarMoeda(h.realizado)}
                      </span>
                    </div>
                    <div className="flex gap-1 h-6">
                      <div
                        className="bg-gray-300 dark:bg-gray-600 rounded-sm flex items-center justify-end pr-2"
                        style={{ width: `${(h.previsto / maxHistorico) * 50}%` }}
                      >
                        <span className="text-[10px] text-gray-600 dark:text-gray-300">Prev</span>
                      </div>
                      <div
                        className="rounded-sm flex items-center pl-2"
                        style={{
                          width: `${(h.realizado / maxHistorico) * 50}%`,
                          backgroundColor: item.cor,
                        }}
                      >
                        <span className="text-[10px] text-white">Real</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Tabela Resumo */}
            <Card className="p-4">
              <h4 className="font-medium mb-3">Resumo do Periodo</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Periodo</th>
                      <th className="text-right py-2">Previsto</th>
                      <th className="text-right py-2">Realizado</th>
                      <th className="text-right py-2">Desvio</th>
                      <th className="text-right py-2">%</th>
                    </tr>
                  </thead>
                  <tbody>
                    {historicoMensal.map((h, idx) => {
                      const desvio = h.realizado - h.previsto
                      const desvioPerc = ((h.realizado - h.previsto) / h.previsto) * 100
                      return (
                        <tr key={idx} className="border-b">
                          <td className="py-2">{h.mes}</td>
                          <td className="text-right py-2">{formatarMoeda(h.previsto)}</td>
                          <td className="text-right py-2">{formatarMoeda(h.realizado)}</td>
                          <td className={cn("text-right py-2", desvio >= 0 ? "text-emerald-600" : "text-red-600")}>
                            {desvio >= 0 ? "+" : ""}
                            {formatarMoeda(Math.abs(desvio))}
                          </td>
                          <td className={cn("text-right py-2", desvio >= 0 ? "text-emerald-600" : "text-red-600")}>
                            {desvioPerc >= 0 ? "+" : ""}
                            {desvioPerc.toFixed(1)}%
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                  <tfoot>
                    <tr className="font-medium bg-muted/50">
                      <td className="py-2">TOTAL</td>
                      <td className="text-right py-2">{formatarMoeda(item.previsto)}</td>
                      <td className="text-right py-2">{formatarMoeda(item.valor)}</td>
                      <td
                        className={cn(
                          "text-right py-2",
                          item.valor - item.previsto >= 0 ? "text-emerald-600" : "text-red-600",
                        )}
                      >
                        {item.valor - item.previsto >= 0 ? "+" : ""}
                        {formatarMoeda(Math.abs(item.valor - item.previsto))}
                      </td>
                      <td
                        className={cn(
                          "text-right py-2",
                          item.valor - item.previsto >= 0 ? "text-emerald-600" : "text-red-600",
                        )}
                      >
                        {(((item.valor - item.previsto) / item.previsto) * 100).toFixed(1)}%
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </Card>
          </TabsContent>

          {/* Aba Ranking */}
          <TabsContent value="ranking" className="space-y-4">
            <Card className="p-4">
              <h4 className="font-medium mb-4">Ranking - Maiores Valores</h4>
              <div className="space-y-3">
                {dadosRanking.map((d, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs font-bold">
                          {idx + 1}
                        </span>
                        <span className="font-medium">{d.nome}</span>
                      </div>
                      <span className="font-semibold">{formatarMoeda(d.valor)}</span>
                    </div>
                    <div className="h-8 bg-muted rounded-lg overflow-hidden">
                      <div
                        className="h-full rounded-lg flex items-center pl-3"
                        style={{
                          width: `${(d.valor / maxValor) * 100}%`,
                          backgroundColor: d.cor,
                        }}
                      >
                        <span className="text-xs text-white font-medium">
                          {((d.valor / maxValor) * 100).toFixed(0)}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Aba Composicao (Pizza) */}
          <TabsContent value="composicao" className="space-y-4">
            <Card className="p-4">
              <h4 className="font-medium mb-4">Composicao de Custos</h4>

              {/* Grafico de Pizza Simulado */}
              <div className="flex items-center gap-8 mb-6">
                <div className="relative w-48 h-48">
                  <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                    {(() => {
                      let acumulado = 0
                      return dadosPizza.map((d, idx) => {
                        const percentual = d.percentual
                        const inicio = acumulado
                        acumulado += percentual
                        const raio = 40
                        const circunferencia = 2 * Math.PI * raio
                        const offset = (inicio / 100) * circunferencia
                        const tamanho = (percentual / 100) * circunferencia

                        return (
                          <circle
                            key={idx}
                            cx="50"
                            cy="50"
                            r={raio}
                            fill="none"
                            stroke={d.cor}
                            strokeWidth="20"
                            strokeDasharray={`${tamanho} ${circunferencia - tamanho}`}
                            strokeDashoffset={-offset}
                          />
                        )
                      })
                    })()}
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-xs text-muted-foreground">Total</div>
                      <div className="text-lg font-bold">{formatarMoeda(totalCustos)}</div>
                    </div>
                  </div>
                </div>

                <div className="flex-1 space-y-2">
                  {dadosPizza.map((d, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded" style={{ backgroundColor: d.cor }} />
                      <div className="flex-1">
                        <div className="text-sm font-medium">{d.nome}</div>
                        <div className="text-xs text-muted-foreground">{formatarMoeda(d.valor)}</div>
                      </div>
                      <div className="text-sm font-semibold">{d.percentual.toFixed(1)}%</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tabela detalhada */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Categoria</th>
                      <th className="text-right py-2">Valor</th>
                      <th className="text-right py-2">% do Total</th>
                      <th className="text-right py-2">% do Faturamento</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dadosPizza.map((d, idx) => {
                      const faturamento = allItens.find((i) => i.tipo === "receita")?.valor || 1
                      return (
                        <tr key={idx} className="border-b">
                          <td className="py-2 flex items-center gap-2">
                            <div className="w-3 h-3 rounded" style={{ backgroundColor: d.cor }} />
                            {d.nome}
                          </td>
                          <td className="text-right py-2">{formatarMoeda(d.valor)}</td>
                          <td className="text-right py-2">{d.percentual.toFixed(1)}%</td>
                          <td className="text-right py-2">{((d.valor / faturamento) * 100).toFixed(1)}%</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

// Componente Principal
export function DRECard({ titulo = "RESULTADO ECONOMICO (DRE)", itens, onItemClick }: DRECardProps) {
  const [selectedItem, setSelectedItem] = useState<DREItemProps | null>(null)
  const [popupOpen, setPopupOpen] = useState(false)

  const handleOpenPopup = (item: DREItemProps) => {
    setSelectedItem(item)
    setPopupOpen(true)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Calculator className="h-5 w-5 text-muted-foreground" />
        <h3 className="font-semibold text-foreground">{titulo}</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {itens.map((item, idx) => (
          <DREItemCard key={idx} item={item} onOpenPopup={() => handleOpenPopup(item)} />
        ))}
      </div>

      <DREPopup item={selectedItem} allItens={itens} open={popupOpen} onClose={() => setPopupOpen(false)} />
    </div>
  )
}

export default DRECard
