"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import {
  Search,
  DollarSign,
  Wallet,
  CreditCard,
  AlertTriangle,
  Download,
  CheckCircle2,
  Clock,
  XCircle,
  Eye,
  Send,
  FileCheck,
  Calendar,
  Building2,
} from "lucide-react"
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Cell } from "recharts"
import { FinanceiroNavbar } from "../_components/financeiro-navbar"

// Resumo CAP
const resumoCAP = {
  total: 45800000,
  vencido: 2300000,
  venceHoje: 850000,
  vence7d: 12500000,
  vence30d: 18650000,
  aVencer: 11500000,
  pendentesAprovacao: 8,
  titulosSelecionados: 0,
  valorSelecionado: 0,
}

// Vencimentos por periodo
const vencimentosPeriodo = [
  { periodo: "Vencido", valor: 2300000, cor: "hsl(0, 70%, 50%)" },
  { periodo: "Hoje", valor: 850000, cor: "hsl(25, 100%, 50%)" },
  { periodo: "1-7 dias", valor: 12500000, cor: "hsl(45, 100%, 50%)" },
  { periodo: "8-15 dias", valor: 9200000, cor: "hsl(150, 60%, 45%)" },
  { periodo: "16-30 dias", valor: 9450000, cor: "hsl(210, 70%, 50%)" },
  { periodo: "> 30 dias", valor: 11500000, cor: "hsl(var(--muted-foreground))" },
]

// CAP por Obra
const capPorObra = [
  { obra: "BR-101 Lote 3", total: 18500000, vencido: 950000, percentual: 40.4 },
  { obra: "SES Metro Sul", total: 12800000, vencido: 620000, percentual: 27.9 },
  { obra: "UHE Belo Monte", total: 9200000, vencido: 480000, percentual: 20.1 },
  { obra: "Restauro SP-330", total: 5300000, vencido: 250000, percentual: 11.6 },
]

// Lista de titulos
const titulosCAP = [
  {
    id: "CAP-001",
    fornecedor: "ConstruMat Ltda",
    descricao: "Cimento Portland CP-II - Lote 45",
    obra: "BR-101 Lote 3",
    valor: 485000,
    vencimento: "2026-01-05",
    diasAtraso: 4,
    status: "vencido",
    natureza: "Materiais",
    nf: "NF-045678",
    aprovador: "Gerente Obra",
    aprovado: true,
  },
  {
    id: "CAP-002",
    fornecedor: "AcoForte Industria",
    descricao: "Vergalhoes CA-50 16mm",
    obra: "SES Metro Sul",
    valor: 320000,
    vencimento: "2026-01-09",
    diasParaVencer: 0,
    status: "hoje",
    natureza: "Materiais",
    nf: "NF-078901",
    aprovador: "Gerente Obra",
    aprovado: true,
  },
  {
    id: "CAP-003",
    fornecedor: "Terraplan Alpha",
    descricao: "Locacao Escavadeira CAT 320 - Janeiro",
    obra: "BR-101 Lote 3",
    valor: 185000,
    vencimento: "2026-01-12",
    diasParaVencer: 3,
    status: "proximo",
    natureza: "Equipamentos",
    nf: "NF-012345",
    aprovador: null,
    aprovado: false,
  },
  {
    id: "CAP-004",
    fornecedor: "Seguradora Confianca",
    descricao: "Seguro Performance - Parcela 4/12",
    obra: "UHE Belo Monte",
    valor: 95000,
    vencimento: "2026-01-15",
    diasParaVencer: 6,
    status: "proximo",
    natureza: "Seguros",
    nf: "NF-034567",
    aprovador: "Diretor",
    aprovado: true,
  },
  {
    id: "CAP-005",
    fornecedor: "TransLog Express",
    descricao: "Frete Materiais - Dezembro",
    obra: "Restauro SP-330",
    valor: 42000,
    vencimento: "2026-01-18",
    diasParaVencer: 9,
    status: "normal",
    natureza: "Servicos",
    nf: "NF-056789",
    aprovador: "Custo/Meta",
    aprovado: true,
  },
  {
    id: "CAP-006",
    fornecedor: "Eletrica Total",
    descricao: "Materiais Eletricos - Quadros e Cabos",
    obra: "SES Metro Sul",
    valor: 128000,
    vencimento: "2026-01-20",
    diasParaVencer: 11,
    status: "normal",
    natureza: "Materiais",
    nf: "NF-067890",
    aprovador: null,
    aprovado: false,
  },
  {
    id: "CAP-007",
    fornecedor: "Concreteira Uniao",
    descricao: "Concreto Usinado FCK 35 - Lote 12",
    obra: "BR-101 Lote 3",
    valor: 275000,
    vencimento: "2026-01-25",
    diasParaVencer: 16,
    status: "normal",
    natureza: "Materiais",
    nf: "NF-078901",
    aprovador: "Gerente Obra",
    aprovado: true,
  },
  {
    id: "CAP-008",
    fornecedor: "Folha de Pagamento",
    descricao: "Folha Janeiro/2026 - Todas as Obras",
    obra: "Corporativo",
    valor: 4850000,
    vencimento: "2026-01-30",
    diasParaVencer: 21,
    status: "normal",
    natureza: "Folha",
    nf: null,
    aprovador: "RH",
    aprovado: true,
  },
]

export default function CAPPage() {
  const pathname = usePathname()
  const [searchTerm, setSearchTerm] = useState("")
  const [filtroObra, setFiltroObra] = useState("todas")
  const [filtroStatus, setFiltroStatus] = useState("todos")
  const [titulosSelecionados, setTitulosSelecionados] = useState<string[]>([])
  const [tituloDetalhe, setTituloDetalhe] = useState<(typeof titulosCAP)[0] | null>(null)

  const formatCurrency = (value: number) => {
    if (value >= 1000000) return `R$ ${(value / 1000000).toFixed(2)} Mi`
    if (value >= 1000) return `R$ ${(value / 1000).toFixed(0)} K`
    return `R$ ${value.toLocaleString("pt-BR")}`
  }

  const toggleTitulo = (id: string) => {
    setTitulosSelecionados((prev) => (prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]))
  }

  const valorSelecionado = titulosCAP
    .filter((t) => titulosSelecionados.includes(t.id))
    .reduce((acc, t) => acc + t.valor, 0)

  const titulosFiltrados = titulosCAP.filter((t) => {
    if (filtroObra !== "todas" && t.obra !== filtroObra) return false
    if (filtroStatus !== "todos" && t.status !== filtroStatus) return false
    if (searchTerm && !t.fornecedor.toLowerCase().includes(searchTerm.toLowerCase())) return false
    return true
  })

  return (
    <div className="flex flex-col h-screen bg-muted/30 overflow-hidden">
      {/* Topbar Secundário */}
      <div className="flex-shrink-0 z-40 mt-0">
        <FinanceiroNavbar />
      </div>

      {/* Conteúdo com moldura */}
      <main className="flex-1 bg-background overflow-hidden p-6">
        <div 
          className="h-full border-0 bg-background overflow-y-auto overflow-x-hidden scrollbar-hide p-6" 
          style={{ 
            borderRadius: '25px', 
            boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.13), 0 2px 8px rgba(0, 0, 0, 0.05)',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
          {/* Busca e Filtros */}
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                <Input
                  placeholder="Buscar fornecedor..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-64 pl-7 h-8 text-xs"
                />
              </div>
              <Select value={filtroObra} onValueChange={setFiltroObra}>
                <SelectTrigger className="w-40 h-8 text-xs">
                  <SelectValue placeholder="Todas as obras" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todas" className="text-xs">
                    Todas as obras
                  </SelectItem>
                  {capPorObra.map((o) => (
                    <SelectItem key={o.obra} value={o.obra} className="text-xs">
                      {o.obra}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={filtroStatus} onValueChange={setFiltroStatus}>
                <SelectTrigger className="w-32 h-8 text-xs">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos" className="text-xs">
                    Todos
                  </SelectItem>
                  <SelectItem value="vencido" className="text-xs">
                    Vencidos
                  </SelectItem>
                  <SelectItem value="hoje" className="text-xs">
                    Vence Hoje
                  </SelectItem>
                  <SelectItem value="proximo" className="text-xs">
                    Proximos 7 dias
                  </SelectItem>
                  <SelectItem value="normal" className="text-xs">
                    A vencer
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-1.5">
              {titulosSelecionados.length > 0 && (
                <div className="flex items-center gap-2 mr-2 px-3 py-1 bg-emerald-50 rounded-lg border border-emerald-200">
                  <span className="text-xs text-emerald-700">
                    {titulosSelecionados.length} selecionados:{" "}
                    <span className="font-bold">{formatCurrency(valorSelecionado)}</span>
                  </span>
                </div>
              )}
              <Button variant="outline" size="sm" className="h-7 text-xs gap-1 bg-transparent">
                <Download className="w-3.5 h-3.5" />
                Exportar
              </Button>
              {titulosSelecionados.length > 0 && (
                <Button size="sm" className="h-7 text-xs gap-1 bg-emerald-600 hover:bg-emerald-700">
                  <Send className="w-3.5 h-3.5" />
                  Gerar Bordero
                </Button>
              )}
            </div>
          </div>
          <div className="max-w-[1600px] mx-auto space-y-4">
            {/* Resumo */}
            <div className="grid grid-cols-6 gap-3">
              <Card className="p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-lg font-bold">{formatCurrency(resumoCAP.total)}</p>
                    <p className="text-[10px] text-muted-foreground">Total CAP</p>
                  </div>
                  <Wallet className="w-5 h-5 text-amber-600" />
                </div>
              </Card>
              <Card className="p-3 border-red-200 bg-red-50/50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-lg font-bold text-red-600">{formatCurrency(resumoCAP.vencido)}</p>
                    <p className="text-[10px] text-red-600/70">Vencido</p>
                  </div>
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                </div>
              </Card>
              <Card className="p-3 border-orange-200 bg-orange-50/50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-lg font-bold text-orange-600">{formatCurrency(resumoCAP.venceHoje)}</p>
                    <p className="text-[10px] text-orange-600/70">Vence Hoje</p>
                  </div>
                  <Clock className="w-5 h-5 text-orange-600" />
                </div>
              </Card>
              <Card className="p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-lg font-bold text-amber-600">{formatCurrency(resumoCAP.vence7d)}</p>
                    <p className="text-[10px] text-muted-foreground">Proximos 7 dias</p>
                  </div>
                  <Calendar className="w-5 h-5 text-amber-600" />
                </div>
              </Card>
              <Card className="p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-lg font-bold">{formatCurrency(resumoCAP.vence30d)}</p>
                    <p className="text-[10px] text-muted-foreground">Proximos 30 dias</p>
                  </div>
                  <Calendar className="w-5 h-5 text-blue-600" />
                </div>
              </Card>
              <Card className="p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-lg font-bold">{resumoCAP.pendentesAprovacao}</p>
                    <p className="text-[10px] text-muted-foreground">Pend. Aprovacao</p>
                  </div>
                  <FileCheck className="w-5 h-5 text-purple-600" />
                </div>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
              {/* Grafico Vencimentos */}
              <Card>
                <CardHeader className="py-3 px-4">
                  <CardTitle className="text-sm font-medium">Vencimentos por Periodo</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="h-[180px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={vencimentosPeriodo} layout="vertical" margin={{ left: 0, right: 10 }}>
                        <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                        <XAxis
                          type="number"
                          tick={{ fontSize: 9 }}
                          tickFormatter={(v) => `${(v / 1000000).toFixed(0)}M`}
                        />
                        <YAxis type="category" dataKey="periodo" tick={{ fontSize: 9 }} width={60} />
                        <Tooltip formatter={(value: number) => formatCurrency(value)} />
                        <Bar dataKey="valor" radius={[0, 4, 4, 0]}>
                          {vencimentosPeriodo.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.cor} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Lista de Titulos */}
              <Card className="lg:col-span-3">
                <CardHeader className="py-3 px-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium">Titulos a Pagar</CardTitle>
                    <Badge variant="outline" className="text-[10px]">
                      {titulosFiltrados.length} titulos
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <ScrollArea className="h-[400px]">
                    <Table>
                      <TableHeader>
                        <TableRow className="hover:bg-transparent">
                          <TableHead className="text-[10px] h-8 w-8"></TableHead>
                          <TableHead className="text-[10px] h-8">Fornecedor</TableHead>
                          <TableHead className="text-[10px] h-8">Obra</TableHead>
                          <TableHead className="text-[10px] h-8">Natureza</TableHead>
                          <TableHead className="text-[10px] h-8 text-center">Vencimento</TableHead>
                          <TableHead className="text-[10px] h-8 text-center">Status</TableHead>
                          <TableHead className="text-[10px] h-8 text-right">Valor</TableHead>
                          <TableHead className="text-[10px] h-8 w-8"></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {titulosFiltrados.map((titulo) => (
                          <TableRow
                            key={titulo.id}
                            className={cn("cursor-pointer", titulosSelecionados.includes(titulo.id) && "bg-emerald-50")}
                            onClick={() => setTituloDetalhe(titulo)}
                          >
                            <TableCell className="py-2" onClick={(e) => e.stopPropagation()}>
                              <Checkbox
                                checked={titulosSelecionados.includes(titulo.id)}
                                onCheckedChange={() => toggleTitulo(titulo.id)}
                                disabled={!titulo.aprovado}
                              />
                            </TableCell>
                            <TableCell className="py-2">
                              <div>
                                <p className="text-xs font-medium">{titulo.fornecedor}</p>
                                <p className="text-[10px] text-muted-foreground truncate max-w-[200px]">
                                  {titulo.descricao}
                                </p>
                              </div>
                            </TableCell>
                            <TableCell className="py-2 text-xs">{titulo.obra}</TableCell>
                            <TableCell className="py-2">
                              <Badge variant="outline" className="text-[9px]">
                                {titulo.natureza}
                              </Badge>
                            </TableCell>
                            <TableCell className="py-2 text-xs text-center">
                              {new Date(titulo.vencimento).toLocaleDateString("pt-BR")}
                            </TableCell>
                            <TableCell className="py-2 text-center">
                              {titulo.status === "vencido" && (
                                <Badge variant="destructive" className="text-[9px]">
                                  {titulo.diasAtraso}d atraso
                                </Badge>
                              )}
                              {titulo.status === "hoje" && <Badge className="text-[9px] bg-orange-500">Hoje</Badge>}
                              {titulo.status === "proximo" && (
                                <Badge variant="secondary" className="text-[9px]">
                                  {titulo.diasParaVencer}d
                                </Badge>
                              )}
                              {titulo.status === "normal" && (
                                <Badge variant="outline" className="text-[9px]">
                                  {titulo.diasParaVencer}d
                                </Badge>
                              )}
                            </TableCell>
                            <TableCell className="py-2 text-xs text-right font-bold">
                              {formatCurrency(titulo.valor)}
                            </TableCell>
                            <TableCell className="py-2">
                              {titulo.aprovado ? (
                                <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                              ) : (
                                <Clock className="w-3.5 h-3.5 text-amber-500" />
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>

            {/* CAP por Obra */}
            <Card>
              <CardHeader className="py-3 px-4">
                <CardTitle className="text-sm font-medium">Contas a Pagar por Obra</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="text-[10px] h-8">Obra</TableHead>
                      <TableHead className="text-[10px] h-8 text-right">Total CAP</TableHead>
                      <TableHead className="text-[10px] h-8 text-right">Vencido</TableHead>
                      <TableHead className="text-[10px] h-8 text-right">% do Total</TableHead>
                      <TableHead className="text-[10px] h-8 w-[200px]">Distribuicao</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {capPorObra.map((obra) => (
                      <TableRow key={obra.obra}>
                        <TableCell className="py-2">
                          <div className="flex items-center gap-2">
                            <Building2 className="w-3.5 h-3.5 text-muted-foreground" />
                            <span className="text-xs font-medium">{obra.obra}</span>
                          </div>
                        </TableCell>
                        <TableCell className="py-2 text-xs text-right font-medium">
                          {formatCurrency(obra.total)}
                        </TableCell>
                        <TableCell className="py-2 text-xs text-right text-red-600">
                          {formatCurrency(obra.vencido)}
                        </TableCell>
                        <TableCell className="py-2 text-xs text-right">{obra.percentual}%</TableCell>
                        <TableCell className="py-2">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                              <div
                                className="h-full bg-amber-500 rounded-full"
                                style={{ width: `${obra.percentual}%` }}
                              />
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Painel de Detalhes */}
      {tituloDetalhe && (
        <aside className="w-80 bg-background border-l flex flex-col">
          <div className="p-3 border-b flex items-center justify-between">
            <span className="text-xs font-medium">Detalhes do Titulo</span>
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => setTituloDetalhe(null)}>
              <XCircle className="w-4 h-4" />
            </Button>
          </div>
          <ScrollArea className="flex-1">
            <div className="p-4 space-y-4">
              <div>
                <p className="text-[10px] text-muted-foreground mb-1">Codigo</p>
                <p className="text-xs font-medium">{tituloDetalhe.id}</p>
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground mb-1">Fornecedor</p>
                <p className="text-xs font-medium">{tituloDetalhe.fornecedor}</p>
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground mb-1">Descricao</p>
                <p className="text-xs">{tituloDetalhe.descricao}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-[10px] text-muted-foreground mb-1">Obra</p>
                  <p className="text-xs font-medium">{tituloDetalhe.obra}</p>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground mb-1">Natureza</p>
                  <Badge variant="outline" className="text-[9px]">
                    {tituloDetalhe.natureza}
                  </Badge>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-[10px] text-muted-foreground mb-1">Vencimento</p>
                  <p className="text-xs">{new Date(tituloDetalhe.vencimento).toLocaleDateString("pt-BR")}</p>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground mb-1">NF</p>
                  <p className="text-xs">{tituloDetalhe.nf || "-"}</p>
                </div>
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground mb-1">Valor</p>
                <p className="text-lg font-bold text-amber-600">{formatCurrency(tituloDetalhe.valor)}</p>
              </div>
              <div className="pt-2 border-t">
                <p className="text-[10px] text-muted-foreground mb-2">Status de Aprovacao</p>
                {tituloDetalhe.aprovado ? (
                  <div className="flex items-center gap-2 p-2 bg-green-50 rounded-lg">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <div>
                      <p className="text-xs font-medium text-green-700">Aprovado</p>
                      <p className="text-[10px] text-green-600">por {tituloDetalhe.aprovador}</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 p-2 bg-amber-50 rounded-lg">
                    <Clock className="w-4 h-4 text-amber-600" />
                    <div>
                      <p className="text-xs font-medium text-amber-700">Aguardando Aprovacao</p>
                      <p className="text-[10px] text-amber-600">
                        Responsavel: {tituloDetalhe.aprovador || "Nao definido"}
                      </p>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1 text-xs bg-transparent">
                  <Eye className="w-3.5 h-3.5 mr-1" />
                  Ver NF
                </Button>
                {!tituloDetalhe.aprovado && (
                  <Button size="sm" className="flex-1 text-xs bg-emerald-600 hover:bg-emerald-700">
                    <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                    Aprovar
                  </Button>
                )}
              </div>
            </div>
          </ScrollArea>
        </aside>
      )}
    </div>
  )
}
