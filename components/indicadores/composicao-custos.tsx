"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Layers,
  Table,
  BarChart2,
  ArrowUpRight,
  ArrowDownRight,
  Package,
  Users,
  Truck,
  Wrench,
  Building2,
  HardHat,
  Shield,
  FileText,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

interface ItemCusto {
  nome: string
  orcado: number
  real: number
  icone?: LucideIcon
}

interface CategoriaCusto {
  nome: string
  descricao: string
  total: number
  orcado: number
  itens?: ItemCusto[]
  composicao?: ItemCusto[]
  percentualFaturamento?: number
}

interface ComposicaoCustosProps {
  custoDireto?: CategoriaCusto
  custoIndireto?: CategoriaCusto
  dag?: CategoriaCusto
  onItemClick?: (item: any) => void
}

const iconesPadrao: Record<string, LucideIcon> = {
  Materiais: Package,
  "Mão de Obra Produtiva": Users,
  Equipamentos: Truck,
  "Serviços/Subempreiteiros": Wrench,
  "Administração da Obra": Building2,
  "Manutenção de Canteiro": HardHat,
  "Estrutura de Apoio": Wrench,
  "Seguros e Licenças": Shield,
}

const defaultCategoria: CategoriaCusto = {
  nome: "",
  descricao: "",
  total: 0,
  orcado: 1,
  itens: [],
  composicao: [],
  percentualFaturamento: 0,
}

export function ComposicaoCustos({
  custoDireto = defaultCategoria,
  custoIndireto = defaultCategoria,
  dag = defaultCategoria,
  onItemClick,
}: ComposicaoCustosProps) {
  const [visao, setVisao] = useState<"grafico" | "tabela">("grafico")

  const formatarMoeda = (valor: number) => {
    if (valor >= 1000000) return `R$ ${(valor / 1000000).toFixed(1)}M`
    if (valor >= 1000) return `R$ ${(valor / 1000).toFixed(0)}k`
    return `R$ ${valor.toFixed(0)}`
  }

  const calcularDesvio = (real: number, orcado: number) => {
    if (orcado === 0) return 0
    return ((real - orcado) / orcado) * 100
  }

  const getStatusDesvio = (real: number, orcado: number) => {
    const desvio = calcularDesvio(real, orcado)
    if (desvio <= 0) return { cor: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-500", label: "Economia" }
    if (desvio <= 5) return { cor: "text-amber-600 dark:text-amber-400", bg: "bg-amber-500", label: "Atenção" }
    return { cor: "text-destructive", bg: "bg-destructive", label: "Estouro" }
  }

  const getIcone = (item: ItemCusto): LucideIcon => {
    if (item.icone) return item.icone
    return iconesPadrao[item.nome] || FileText
  }

  const cdTotal = custoDireto?.total ?? 0
  const cdOrcado = custoDireto?.orcado ?? 1
  const ciTotal = custoIndireto?.total ?? 0
  const ciOrcado = custoIndireto?.orcado ?? 1
  const dagTotal = dag?.total ?? 0
  const dagOrcado = dag?.orcado ?? 1

  const totalGeral = cdTotal + ciTotal + dagTotal
  const totalOrcado = cdOrcado + ciOrcado + dagOrcado

  const itensCustoDireto = custoDireto?.itens ?? custoDireto?.composicao ?? []
  const itensCustoIndireto = custoIndireto?.itens ?? custoIndireto?.composicao ?? []

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Layers className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-base font-semibold">Composição de Custos</CardTitle>
              <p className="text-xs text-muted-foreground">Conforme Manual ERP-GNESIS</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className={getStatusDesvio(totalGeral, totalOrcado).cor}>
              Desvio: {calcularDesvio(totalGeral, totalOrcado).toFixed(1)}%
            </Badge>
            <div className="flex items-center border rounded-md">
              <Button
                variant={visao === "grafico" ? "secondary" : "ghost"}
                size="sm"
                className="h-8 px-2"
                onClick={() => setVisao("grafico")}
              >
                <BarChart2 className="h-4 w-4" />
              </Button>
              <Button
                variant={visao === "tabela" ? "secondary" : "ghost"}
                size="sm"
                className="h-8 px-2"
                onClick={() => setVisao("tabela")}
              >
                <Table className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        {visao === "grafico" ? (
          <div className="space-y-4">
            {/* Resumo Geral */}
            <div className="grid grid-cols-4 gap-3">
              {/* Custo Direto */}
              <div
                className="p-3 rounded-lg border bg-card hover:shadow-sm cursor-pointer"
                onClick={() => onItemClick?.({ tipo: "CD", ...custoDireto })}
              >
                <p className="text-xs text-muted-foreground mb-1">Custo Direto (CD)</p>
                <div className="flex items-end justify-between mb-2">
                  <span className={`text-xl font-bold ${getStatusDesvio(cdTotal, cdOrcado).cor}`}>
                    {formatarMoeda(cdTotal)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-muted-foreground">Orçado: {formatarMoeda(cdOrcado)}</span>
                  <span className={getStatusDesvio(cdTotal, cdOrcado).cor}>
                    {calcularDesvio(cdTotal, cdOrcado) <= 0 ? "" : "+"}
                    {calcularDesvio(cdTotal, cdOrcado).toFixed(1)}%
                  </span>
                </div>
                <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                  <div
                    className={`h-full rounded-full ${getStatusDesvio(cdTotal, cdOrcado).bg}`}
                    style={{ width: `${Math.min(100, (cdTotal / cdOrcado) * 100)}%` }}
                  />
                </div>
              </div>

              {/* Custo Indireto */}
              <div
                className="p-3 rounded-lg border bg-card hover:shadow-sm cursor-pointer"
                onClick={() => onItemClick?.({ tipo: "CI", ...custoIndireto })}
              >
                <p className="text-xs text-muted-foreground mb-1">Custo Indireto (CI)</p>
                <div className="flex items-end justify-between mb-2">
                  <span className={`text-xl font-bold ${getStatusDesvio(ciTotal, ciOrcado).cor}`}>
                    {formatarMoeda(ciTotal)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-muted-foreground">Orçado: {formatarMoeda(ciOrcado)}</span>
                  <span className={getStatusDesvio(ciTotal, ciOrcado).cor}>
                    {calcularDesvio(ciTotal, ciOrcado) <= 0 ? "" : "+"}
                    {calcularDesvio(ciTotal, ciOrcado).toFixed(1)}%
                  </span>
                </div>
                <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                  <div
                    className={`h-full rounded-full ${getStatusDesvio(ciTotal, ciOrcado).bg}`}
                    style={{ width: `${Math.min(100, (ciTotal / ciOrcado) * 100)}%` }}
                  />
                </div>
              </div>

              {/* DAG */}
              <div
                className="p-3 rounded-lg border bg-card hover:shadow-sm cursor-pointer"
                onClick={() => onItemClick?.({ tipo: "DAG", ...dag })}
              >
                <p className="text-xs text-muted-foreground mb-1">DAG</p>
                <div className="flex items-end justify-between mb-2">
                  <span className={`text-xl font-bold ${getStatusDesvio(dagTotal, dagOrcado).cor}`}>
                    {formatarMoeda(dagTotal)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-muted-foreground">{dag?.percentualFaturamento ?? 0}% Faturamento</span>
                  <span className={getStatusDesvio(dagTotal, dagOrcado).cor}>
                    {calcularDesvio(dagTotal, dagOrcado) <= 0 ? "" : "+"}
                    {calcularDesvio(dagTotal, dagOrcado).toFixed(1)}%
                  </span>
                </div>
                <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                  <div
                    className={`h-full rounded-full ${getStatusDesvio(dagTotal, dagOrcado).bg}`}
                    style={{ width: `${Math.min(100, (dagTotal / dagOrcado) * 100)}%` }}
                  />
                </div>
              </div>

              {/* Total Geral */}
              <div className="p-3 rounded-lg border-2 border-primary/30 bg-primary/5">
                <p className="text-xs text-muted-foreground mb-1">Custo Total</p>
                <div className="flex items-end justify-between mb-2">
                  <span className={`text-xl font-bold ${getStatusDesvio(totalGeral, totalOrcado).cor}`}>
                    {formatarMoeda(totalGeral)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-muted-foreground">Orçado: {formatarMoeda(totalOrcado)}</span>
                  <span className={getStatusDesvio(totalGeral, totalOrcado).cor}>
                    {calcularDesvio(totalGeral, totalOrcado) <= 0 ? "" : "+"}
                    {calcularDesvio(totalGeral, totalOrcado).toFixed(1)}%
                  </span>
                </div>
                <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                  <div
                    className={`h-full rounded-full ${getStatusDesvio(totalGeral, totalOrcado).bg}`}
                    style={{ width: `${Math.min(100, (totalGeral / totalOrcado) * 100)}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Detalhamento CD e CI */}
            <div className="grid grid-cols-2 gap-4">
              {/* Custo Direto Composição */}
              <div className="p-3 rounded-lg border bg-muted/30">
                <p className="text-xs font-medium mb-3">Composição CD</p>
                <div className="space-y-2">
                  {itensCustoDireto.map((item, i) => {
                    const Icone = getIcone(item)
                    const status = getStatusDesvio(item.real, item.orcado)
                    return (
                      <div
                        key={i}
                        className="flex items-center justify-between p-2 rounded bg-card cursor-pointer hover:bg-muted/50"
                        onClick={() => onItemClick?.(item)}
                      >
                        <div className="flex items-center gap-2">
                          <Icone className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{item.nome}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`text-sm font-semibold ${status.cor}`}>{formatarMoeda(item.real)}</span>
                          {calcularDesvio(item.real, item.orcado) <= 0 ? (
                            <ArrowDownRight className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                          ) : (
                            <ArrowUpRight className="h-3 w-3 text-destructive" />
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Custo Indireto Composição */}
              <div className="p-3 rounded-lg border bg-muted/30">
                <p className="text-xs font-medium mb-3">Composição CI</p>
                <div className="space-y-2">
                  {itensCustoIndireto.map((item, i) => {
                    const Icone = getIcone(item)
                    const status = getStatusDesvio(item.real, item.orcado)
                    return (
                      <div
                        key={i}
                        className="flex items-center justify-between p-2 rounded bg-card cursor-pointer hover:bg-muted/50"
                        onClick={() => onItemClick?.(item)}
                      >
                        <div className="flex items-center gap-2">
                          <Icone className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{item.nome}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`text-sm font-semibold ${status.cor}`}>{formatarMoeda(item.real)}</span>
                          {calcularDesvio(item.real, item.orcado) <= 0 ? (
                            <ArrowDownRight className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                          ) : (
                            <ArrowUpRight className="h-3 w-3 text-destructive" />
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Modo Tabela */
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-2 font-medium text-muted-foreground">Tipo</th>
                  <th className="text-right py-2 px-2 font-medium text-muted-foreground">Orçado</th>
                  <th className="text-right py-2 px-2 font-medium text-muted-foreground">Realizado</th>
                  <th className="text-right py-2 px-2 font-medium text-muted-foreground">Desvio</th>
                  <th className="text-right py-2 px-2 font-medium text-muted-foreground">%</th>
                  <th className="text-center py-2 px-2 font-medium text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {itensCustoDireto.map((item, i) => {
                  const Icone = getIcone(item)
                  const status = getStatusDesvio(item.real, item.orcado)
                  const desvio = item.real - item.orcado
                  return (
                    <tr
                      key={`cd-${i}`}
                      className="border-b hover:bg-muted/50 cursor-pointer"
                      onClick={() => onItemClick?.(item)}
                    >
                      <td className="py-2 px-2">
                        <div className="flex items-center gap-2">
                          <Icone className="h-4 w-4 text-muted-foreground" />
                          {item.nome}
                        </div>
                      </td>
                      <td className="text-right py-2 px-2">{formatarMoeda(item.orcado)}</td>
                      <td className={`text-right py-2 px-2 font-semibold ${status.cor}`}>{formatarMoeda(item.real)}</td>
                      <td className={`text-right py-2 px-2 ${status.cor}`}>
                        {desvio <= 0 ? "" : "+"}
                        {formatarMoeda(Math.abs(desvio))}
                      </td>
                      <td className={`text-right py-2 px-2 ${status.cor}`}>
                        {calcularDesvio(item.real, item.orcado).toFixed(1)}%
                      </td>
                      <td className="text-center py-2 px-2">
                        <Badge variant="outline" className={status.cor}>
                          {status.label}
                        </Badge>
                      </td>
                    </tr>
                  )
                })}
                <tr className="border-b bg-muted/30 font-semibold">
                  <td className="py-2 px-2">Total CD</td>
                  <td className="text-right py-2 px-2">{formatarMoeda(cdOrcado)}</td>
                  <td className={`text-right py-2 px-2 ${getStatusDesvio(cdTotal, cdOrcado).cor}`}>
                    {formatarMoeda(cdTotal)}
                  </td>
                  <td className={`text-right py-2 px-2 ${getStatusDesvio(cdTotal, cdOrcado).cor}`}>
                    {formatarMoeda(Math.abs(cdTotal - cdOrcado))}
                  </td>
                  <td className={`text-right py-2 px-2 ${getStatusDesvio(cdTotal, cdOrcado).cor}`}>
                    {calcularDesvio(cdTotal, cdOrcado).toFixed(1)}%
                  </td>
                  <td></td>
                </tr>
                {itensCustoIndireto.map((item, i) => {
                  const Icone = getIcone(item)
                  const status = getStatusDesvio(item.real, item.orcado)
                  const desvio = item.real - item.orcado
                  return (
                    <tr
                      key={`ci-${i}`}
                      className="border-b hover:bg-muted/50 cursor-pointer"
                      onClick={() => onItemClick?.(item)}
                    >
                      <td className="py-2 px-2">
                        <div className="flex items-center gap-2">
                          <Icone className="h-4 w-4 text-muted-foreground" />
                          {item.nome}
                        </div>
                      </td>
                      <td className="text-right py-2 px-2">{formatarMoeda(item.orcado)}</td>
                      <td className={`text-right py-2 px-2 font-semibold ${status.cor}`}>{formatarMoeda(item.real)}</td>
                      <td className={`text-right py-2 px-2 ${status.cor}`}>
                        {desvio <= 0 ? "" : "+"}
                        {formatarMoeda(Math.abs(desvio))}
                      </td>
                      <td className={`text-right py-2 px-2 ${status.cor}`}>
                        {calcularDesvio(item.real, item.orcado).toFixed(1)}%
                      </td>
                      <td className="text-center py-2 px-2">
                        <Badge variant="outline" className={status.cor}>
                          {status.label}
                        </Badge>
                      </td>
                    </tr>
                  )
                })}
                <tr className="border-b bg-muted/30 font-semibold">
                  <td className="py-2 px-2">Total CI</td>
                  <td className="text-right py-2 px-2">{formatarMoeda(ciOrcado)}</td>
                  <td className={`text-right py-2 px-2 ${getStatusDesvio(ciTotal, ciOrcado).cor}`}>
                    {formatarMoeda(ciTotal)}
                  </td>
                  <td className={`text-right py-2 px-2 ${getStatusDesvio(ciTotal, ciOrcado).cor}`}>
                    {formatarMoeda(Math.abs(ciTotal - ciOrcado))}
                  </td>
                  <td className={`text-right py-2 px-2 ${getStatusDesvio(ciTotal, ciOrcado).cor}`}>
                    {calcularDesvio(ciTotal, ciOrcado).toFixed(1)}%
                  </td>
                  <td></td>
                </tr>
                <tr className="border-b hover:bg-muted/50">
                  <td className="py-2 px-2">DAG ({dag?.percentualFaturamento ?? 0}%)</td>
                  <td className="text-right py-2 px-2">{formatarMoeda(dagOrcado)}</td>
                  <td className={`text-right py-2 px-2 font-semibold ${getStatusDesvio(dagTotal, dagOrcado).cor}`}>
                    {formatarMoeda(dagTotal)}
                  </td>
                  <td className={`text-right py-2 px-2 ${getStatusDesvio(dagTotal, dagOrcado).cor}`}>
                    {formatarMoeda(Math.abs(dagTotal - dagOrcado))}
                  </td>
                  <td className={`text-right py-2 px-2 ${getStatusDesvio(dagTotal, dagOrcado).cor}`}>
                    {calcularDesvio(dagTotal, dagOrcado).toFixed(1)}%
                  </td>
                  <td className="text-center py-2 px-2">
                    <Badge variant="outline" className={getStatusDesvio(dagTotal, dagOrcado).cor}>
                      {getStatusDesvio(dagTotal, dagOrcado).label}
                    </Badge>
                  </td>
                </tr>
                <tr className="bg-primary/10 font-bold">
                  <td className="py-2 px-2">CUSTO TOTAL</td>
                  <td className="text-right py-2 px-2">{formatarMoeda(totalOrcado)}</td>
                  <td className={`text-right py-2 px-2 ${getStatusDesvio(totalGeral, totalOrcado).cor}`}>
                    {formatarMoeda(totalGeral)}
                  </td>
                  <td className={`text-right py-2 px-2 ${getStatusDesvio(totalGeral, totalOrcado).cor}`}>
                    {formatarMoeda(Math.abs(totalGeral - totalOrcado))}
                  </td>
                  <td className={`text-right py-2 px-2 ${getStatusDesvio(totalGeral, totalOrcado).cor}`}>
                    {calcularDesvio(totalGeral, totalOrcado).toFixed(1)}%
                  </td>
                  <td className="text-center py-2 px-2">
                    <Badge variant="outline" className={getStatusDesvio(totalGeral, totalOrcado).cor}>
                      {getStatusDesvio(totalGeral, totalOrcado).label}
                    </Badge>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
