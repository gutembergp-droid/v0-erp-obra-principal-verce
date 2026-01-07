"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Package,
  FolderTree,
  Boxes,
  Wrench,
  Calendar,
  BarChart3,
  TableIcon,
  TrendingUp,
  TrendingDown,
  ChevronRight,
} from "lucide-react"

type VisaoTipo = "suprimentos" | "wbs" | "pbs" | "servico"

interface ItemCusto {
  id: string
  nome: string
  meta: number
  real: number
  desvio: number
  crco?: number
  fcd?: number
}

// Dados mock por visao
const dadosPorVisao: Record<VisaoTipo, ItemCusto[]> = {
  suprimentos: [
    { id: "1", nome: "Mao de Obra", meta: 58000000, real: 59200000, desvio: 1200000, crco: 1.02 },
    { id: "2", nome: "Materiais", meta: 50400000, real: 49800000, desvio: -600000, crco: 0.99 },
    { id: "3", nome: "Equipamentos", meta: 26600000, real: 26100000, desvio: -500000, crco: 0.98 },
    { id: "4", nome: "Terceiros", meta: 19620000, real: 19600000, desvio: -20000, crco: 1.0 },
    { id: "5", nome: "Indiretos", meta: 6200000, real: 6000000, desvio: -200000, crco: 0.97 },
  ],
  wbs: [
    { id: "1", nome: "1.0 - Terraplenagem", meta: 45000000, real: 44200000, desvio: -800000, crco: 0.98, fcd: 1.15 },
    { id: "2", nome: "2.0 - Pavimentacao", meta: 38000000, real: 39500000, desvio: 1500000, crco: 1.04, fcd: 1.08 },
    { id: "3", nome: "3.0 - Drenagem", meta: 28000000, real: 27800000, desvio: -200000, crco: 0.99, fcd: 1.12 },
    { id: "4", nome: "4.0 - OAE", meta: 32000000, real: 31500000, desvio: -500000, crco: 0.98, fcd: 1.18 },
    { id: "5", nome: "5.0 - Sinalizacao", meta: 17820000, real: 17700000, desvio: -120000, crco: 0.99, fcd: 1.05 },
  ],
  pbs: [
    { id: "1", nome: "Rodovia Principal", meta: 85000000, real: 84500000, desvio: -500000, crco: 0.99 },
    { id: "2", nome: "Acessos", meta: 32000000, real: 33200000, desvio: 1200000, crco: 1.04 },
    { id: "3", nome: "Pontes e Viadutos", meta: 28000000, real: 27100000, desvio: -900000, crco: 0.97 },
    { id: "4", nome: "Tuneis", meta: 15820000, real: 15900000, desvio: 80000, crco: 1.01 },
  ],
  servico: [
    {
      id: "1",
      nome: "Fornec. Aplic. Concreto",
      meta: 22000000,
      real: 21500000,
      desvio: -500000,
      crco: 0.98,
      fcd: 1.12,
    },
    { id: "2", nome: "Armacao Estrutural", meta: 18000000, real: 18500000, desvio: 500000, crco: 1.03, fcd: 1.08 },
    { id: "3", nome: "Escavacao Mecanica", meta: 15000000, real: 14200000, desvio: -800000, crco: 0.95, fcd: 1.15 },
    { id: "4", nome: "Compactacao de Solo", meta: 12000000, real: 12100000, desvio: 100000, crco: 1.01, fcd: 1.05 },
    { id: "5", nome: "Assentamento de Tubos", meta: 8000000, real: 7800000, desvio: -200000, crco: 0.98, fcd: 1.1 },
    { id: "6", nome: "Pintura de Faixas", meta: 5820000, real: 6100000, desvio: 280000, crco: 1.05, fcd: 0.98 },
  ],
}

const periodos = [
  { value: "jan-2025", label: "Janeiro 2025" },
  { value: "dez-2024", label: "Dezembro 2024" },
  { value: "nov-2024", label: "Novembro 2024" },
  { value: "q4-2024", label: "Q4 2024" },
  { value: "q3-2024", label: "Q3 2024" },
  { value: "2024", label: "Ano 2024" },
]

const visaoConfig: Record<VisaoTipo, { label: string; icon: typeof Package }> = {
  suprimentos: { label: "SUPRIMENTOS", icon: Package },
  wbs: { label: "WBS/EAP", icon: FolderTree },
  pbs: { label: "PBS", icon: Boxes },
  servico: { label: "SERVICO", icon: Wrench },
}

function formatarMoeda(valor: number): string {
  const abs = Math.abs(valor)
  if (abs >= 1000000) {
    return `R$ ${(valor / 1000000).toFixed(1)} Mi`
  } else if (abs >= 1000) {
    return `R$ ${(valor / 1000).toFixed(0)} mil`
  }
  return `R$ ${valor.toFixed(0)}`
}

function formatarDesvio(valor: number): string {
  const prefix = valor >= 0 ? "+" : ""
  const abs = Math.abs(valor)
  if (abs >= 1000000) {
    return `${prefix}R$ ${(valor / 1000000).toFixed(1)} Mi`
  } else if (abs >= 1000) {
    return `${prefix}R$ ${(valor / 1000).toFixed(0)} mil`
  }
  return `${prefix}R$ ${valor.toFixed(0)}`
}

const visaoTemFCD = (v: VisaoTipo) => v === "servico" || v === "wbs"

export function CustoPorCategoriaCard() {
  const [visao, setVisao] = useState<VisaoTipo>("suprimentos")
  const [periodo, setPeriodo] = useState("jan-2025")
  const [modoVisualizacao, setModoVisualizacao] = useState<"grafico" | "tabela">("grafico")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [itemSelecionado, setItemSelecionado] = useState<ItemCusto | null>(null)

  const dados = dadosPorVisao[visao]
  const totalMeta = dados.reduce((sum, item) => sum + item.meta, 0)
  const totalReal = dados.reduce((sum, item) => sum + item.real, 0)
  const totalDesvio = totalReal - totalMeta
  const maxValor = Math.max(...dados.map((d) => Math.max(d.meta, d.real)))

  const handleItemClick = (item: ItemCusto) => {
    setItemSelecionado(item)
    setDialogOpen(true)
  }

  const VisaoIcon = visaoConfig[visao].icon

  return (
    <>
      <Card className="p-4 h-full">
        {/* Header com seletores */}
        <div className="flex flex-col gap-3 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <VisaoIcon className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-semibold text-foreground">CUSTO POR CATEGORIA</h3>
            </div>
            <div className="flex gap-2 text-[9px]">
              <span className="flex items-center gap-1">
                <div className="h-2 w-2 rounded-full bg-muted-foreground/40" /> Meta
              </span>
              <span className="flex items-center gap-1">
                <div className="h-2 w-2 rounded-full bg-foreground" /> Real
              </span>
            </div>
          </div>

          {/* Seletores de Visao, Periodo e Modo */}
          <div className="flex flex-wrap gap-2">
            {/* Tabs de Visao */}
            <div className="flex gap-1 p-0.5 rounded-md bg-muted/50">
              {(Object.keys(visaoConfig) as VisaoTipo[]).map((v) => {
                const config = visaoConfig[v]
                const Icon = config.icon
                return (
                  <Button
                    key={v}
                    variant={visao === v ? "default" : "ghost"}
                    size="sm"
                    className={`h-7 px-2 text-[10px] gap-1 ${visao === v ? "" : "hover:bg-muted"}`}
                    onClick={() => setVisao(v)}
                  >
                    <Icon className="h-3 w-3" />
                    <span className="hidden sm:inline">{config.label}</span>
                  </Button>
                )
              })}
            </div>

            {/* Seletor de Periodo */}
            <Select value={periodo} onValueChange={setPeriodo}>
              <SelectTrigger className="h-7 w-[130px] text-[10px]">
                <Calendar className="h-3 w-3 mr-1" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {periodos.map((p) => (
                  <SelectItem key={p.value} value={p.value} className="text-xs">
                    {p.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Toggle Grafico/Tabela */}
            <div className="flex gap-1 p-0.5 rounded-md bg-muted/50 ml-auto">
              <Button
                variant={modoVisualizacao === "grafico" ? "default" : "ghost"}
                size="sm"
                className="h-7 px-2"
                onClick={() => setModoVisualizacao("grafico")}
              >
                <BarChart3 className="h-3 w-3" />
              </Button>
              <Button
                variant={modoVisualizacao === "tabela" ? "default" : "ghost"}
                size="sm"
                className="h-7 px-2"
                onClick={() => setModoVisualizacao("tabela")}
              >
                <TableIcon className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>

        {/* Conteudo: Grafico ou Tabela */}
        {modoVisualizacao === "grafico" ? (
          <div className="space-y-3">
            {dados.map((item) => (
              <div
                key={item.id}
                className="space-y-1 cursor-pointer hover:bg-muted/30 p-1 rounded transition-colors"
                onClick={() => handleItemClick(item)}
              >
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground flex items-center gap-1">
                    {item.nome}
                    <ChevronRight className="h-3 w-3 opacity-50" />
                  </span>
                  <div className="flex gap-3">
                    <span className="text-foreground font-medium">{formatarMoeda(item.real)}</span>
                    <span
                      className={`font-medium ${item.desvio <= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-destructive"}`}
                    >
                      {formatarDesvio(item.desvio)}
                    </span>
                  </div>
                </div>
                <div className="relative h-3 bg-muted rounded-full overflow-hidden">
                  {/* Barra Meta (fundo) */}
                  <div
                    className="absolute h-full bg-muted-foreground/30 rounded-full"
                    style={{ width: `${(item.meta / maxValor) * 100}%` }}
                  />
                  {/* Barra Real (frente) */}
                  <div
                    className={`absolute h-full rounded-full ${item.desvio <= 0 ? "bg-foreground" : "bg-destructive"}`}
                    style={{ width: `${(item.real / maxValor) * 100}%` }}
                  />
                </div>
                {/* Indicadores CR/CO e F/CD para Servico e WBS */}
                {(visao === "servico" || visao === "wbs") && item.fcd && (
                  <div className="flex gap-3 mt-1">
                    <Badge variant="outline" className="text-[9px] h-4 px-1.5">
                      CR/CO: {item.crco?.toFixed(2)}
                    </Badge>
                    <Badge
                      variant="outline"
                      className={`text-[9px] h-4 px-1.5 ${
                        (item.fcd || 0) >= 1
                          ? "border-emerald-500 text-emerald-600 dark:text-emerald-400"
                          : "border-destructive text-destructive"
                      }`}
                    >
                      F/CD: {item.fcd?.toFixed(2)}
                    </Badge>
                  </div>
                )}
              </div>
            ))}

            {/* Total */}
            <div className="pt-3 border-t border-border">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-foreground">TOTAL</span>
                <div className="flex gap-3">
                  <span className="text-foreground">{formatarMoeda(totalReal)}</span>
                  <span className={totalDesvio <= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-destructive"}>
                    {formatarDesvio(totalDesvio)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Modo Tabela */
          <div className="overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-[10px]">Item</TableHead>
                  <TableHead className="text-[10px] text-right">Meta</TableHead>
                  <TableHead className="text-[10px] text-right">Real</TableHead>
                  <TableHead className="text-[10px] text-right">Desvio</TableHead>
                  <TableHead className="text-[10px] text-right">CR/CO</TableHead>
                  {visaoTemFCD(visao) && <TableHead className="text-[10px] text-right">F/CD</TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {dados.map((item) => (
                  <TableRow
                    key={item.id}
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => handleItemClick(item)}
                  >
                    <TableCell className="text-[10px] font-medium">{item.nome}</TableCell>
                    <TableCell className="text-[10px] text-right">{formatarMoeda(item.meta)}</TableCell>
                    <TableCell className="text-[10px] text-right">{formatarMoeda(item.real)}</TableCell>
                    <TableCell
                      className={`text-[10px] text-right font-medium ${
                        item.desvio <= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-destructive"
                      }`}
                    >
                      {formatarDesvio(item.desvio)}
                    </TableCell>
                    <TableCell className="text-[10px] text-right">
                      <Badge
                        variant="outline"
                        className={`text-[9px] ${
                          (item.crco || 0) <= 1
                            ? "border-emerald-500 text-emerald-600"
                            : "border-destructive text-destructive"
                        }`}
                      >
                        {item.crco?.toFixed(2)}
                      </Badge>
                    </TableCell>
                    {visaoTemFCD(visao) && (
                      <TableCell className="text-[10px] text-right">
                        {item.fcd ? (
                          <Badge
                            variant="outline"
                            className={`text-[9px] ${
                              (item.fcd || 0) >= 1
                                ? "border-emerald-500 text-emerald-600"
                                : "border-destructive text-destructive"
                            }`}
                          >
                            {item.fcd?.toFixed(2)}
                          </Badge>
                        ) : (
                          "-"
                        )}
                      </TableCell>
                    )}
                  </TableRow>
                ))}
                {/* Total */}
                <TableRow className="font-semibold border-t-2">
                  <TableCell className="text-[10px]">TOTAL</TableCell>
                  <TableCell className="text-[10px] text-right">{formatarMoeda(totalMeta)}</TableCell>
                  <TableCell className="text-[10px] text-right">{formatarMoeda(totalReal)}</TableCell>
                  <TableCell
                    className={`text-[10px] text-right ${
                      totalDesvio <= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-destructive"
                    }`}
                  >
                    {formatarDesvio(totalDesvio)}
                  </TableCell>
                  <TableCell className="text-[10px] text-right">-</TableCell>
                  {visaoTemFCD(visao) && <TableCell className="text-[10px] text-right">-</TableCell>}
                </TableRow>
              </TableBody>
            </Table>
          </div>
        )}
      </Card>

      {/* Dialog de Detalhes do Item */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <VisaoIcon className="h-5 w-5 text-primary" />
              {itemSelecionado?.nome} - Analise Detalhada
            </DialogTitle>
          </DialogHeader>

          {itemSelecionado && (
            <div className="space-y-4">
              {/* Cards de Resumo */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <Card className="p-3 text-center">
                  <div className="text-[10px] text-muted-foreground">Meta</div>
                  <div className="text-lg font-bold">{formatarMoeda(itemSelecionado.meta)}</div>
                </Card>
                <Card className="p-3 text-center">
                  <div className="text-[10px] text-muted-foreground">Realizado</div>
                  <div className="text-lg font-bold">{formatarMoeda(itemSelecionado.real)}</div>
                </Card>
                <Card className="p-3 text-center">
                  <div className="text-[10px] text-muted-foreground">Desvio</div>
                  <div
                    className={`text-lg font-bold flex items-center justify-center gap-1 ${
                      itemSelecionado.desvio <= 0 ? "text-emerald-600" : "text-destructive"
                    }`}
                  >
                    {itemSelecionado.desvio <= 0 ? (
                      <TrendingDown className="h-4 w-4" />
                    ) : (
                      <TrendingUp className="h-4 w-4" />
                    )}
                    {formatarDesvio(itemSelecionado.desvio)}
                  </div>
                </Card>
                <Card className="p-3 text-center">
                  <div className="text-[10px] text-muted-foreground">CR/CO</div>
                  <div
                    className={`text-lg font-bold ${
                      (itemSelecionado.crco || 0) <= 1 ? "text-emerald-600" : "text-destructive"
                    }`}
                  >
                    {itemSelecionado.crco?.toFixed(2)}
                  </div>
                </Card>
                {visaoTemFCD(visao) && (
                  <Card className="p-3 text-center">
                    <div className="text-[10px] text-muted-foreground">F/CD</div>
                    <div
                      className={`text-lg font-bold ${
                        (itemSelecionado.fcd || 0) >= 1 ? "text-emerald-600" : "text-destructive"
                      }`}
                    >
                      {itemSelecionado.fcd?.toFixed(2)}
                    </div>
                  </Card>
                )}
              </div>

              {/* Grafico de Evolucao */}
              <Card className="p-4">
                <h4 className="text-xs font-semibold mb-3">Evolucao Mensal - Meta vs Real</h4>
                <div className="h-40 flex items-end justify-between gap-2">
                  {["Set", "Out", "Nov", "Dez", "Jan"].map((mes, i) => {
                    const metaH = 40 + Math.random() * 40
                    const realH = metaH + (Math.random() - 0.5) * 20
                    return (
                      <div key={mes} className="flex-1 flex flex-col items-center gap-1">
                        <div className="flex gap-1 h-32 items-end w-full">
                          <div className="flex-1 bg-muted-foreground/30 rounded-t" style={{ height: `${metaH}%` }} />
                          <div
                            className={`flex-1 rounded-t ${realH > metaH ? "bg-destructive" : "bg-foreground"}`}
                            style={{ height: `${realH}%` }}
                          />
                        </div>
                        <span className="text-[9px] text-muted-foreground">{mes}</span>
                      </div>
                    )
                  })}
                </div>
                <div className="flex justify-center gap-4 mt-2 text-[9px]">
                  <span className="flex items-center gap-1">
                    <div className="h-2 w-2 rounded bg-muted-foreground/30" /> Meta
                  </span>
                  <span className="flex items-center gap-1">
                    <div className="h-2 w-2 rounded bg-foreground" /> Real
                  </span>
                </div>
              </Card>

              {(visao === "servico" || visao === "wbs") && itemSelecionado.fcd && (
                <Card className="p-4">
                  <h4 className="text-xs font-semibold mb-3">Performance de Receita (F/CD)</h4>
                  <div className="flex items-center gap-4">
                    <div
                      className={`text-3xl font-bold ${
                        itemSelecionado.fcd >= 1 ? "text-emerald-600" : "text-destructive"
                      }`}
                    >
                      {itemSelecionado.fcd.toFixed(2)}
                    </div>
                    <div className="flex-1">
                      <div className="h-4 bg-muted rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            itemSelecionado.fcd >= 1 ? "bg-emerald-500" : "bg-destructive"
                          }`}
                          style={{ width: `${Math.min(itemSelecionado.fcd * 50, 100)}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-[9px] text-muted-foreground mt-1">
                        <span>0.00</span>
                        <span>1.00 (meta)</span>
                        <span>2.00</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-2">
                    {itemSelecionado.fcd >= 1
                      ? "O servico esta gerando receita acima do custo direto."
                      : "Atencao: O servico esta com receita abaixo do custo direto."}
                  </p>
                </Card>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
