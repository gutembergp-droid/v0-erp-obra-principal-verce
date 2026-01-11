"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import {
  Search,
  Download,
  XCircle,
  Eye,
  Calendar,
  TrendingUp,
  Phone,
  Mail,
  AlertTriangle,
} from "lucide-react"
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip as RechartsTooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts"
import { FinanceiroNavbar } from "../_components/financeiro-navbar"

// Resumo CAR
const resumoCAR = {
  total: 89500000,
  vencido: 4500000,
  aVencer: 85000000,
  recebidoMes: 28600000,
  previstoMes: 32000000,
  inadimplencia: 5.03,
}

// CAR por Status
const carPorStatus = [
  { status: "Vencido", valor: 4500000, cor: "hsl(0, 70%, 50%)" },
  { status: "Vence em 7 dias", valor: 12800000, cor: "hsl(45, 100%, 50%)" },
  { status: "Vence em 30 dias", valor: 28500000, cor: "hsl(210, 70%, 50%)" },
  { status: "Vence > 30 dias", valor: 43700000, cor: "hsl(var(--muted-foreground))" },
]

// CAR por Cliente
const carPorCliente = [
  { cliente: "DNIT", total: 45200000, vencido: 2800000, percentual: 50.5 },
  { cliente: "SABESP", total: 22100000, vencido: 1200000, percentual: 24.7 },
  { cliente: "Furnas", total: 15800000, vencido: 500000, percentual: 17.7 },
  { cliente: "DERSA", total: 6400000, vencido: 0, percentual: 7.1 },
]

// Lista de titulos
const titulosCAR = [
  {
    id: "CAR-001",
    cliente: "DNIT",
    descricao: "Medicao #12 - Dezembro/2025",
    obra: "BR-101 Lote 3",
    valor: 4500000,
    vencimento: "2026-01-05",
    diasAtraso: 4,
    status: "vencido",
    nf: "NF-E-001234",
    medicao: "MED-012",
    contato: "Carlos Silva",
    telefone: "(61) 3333-4444",
    email: "carlos.silva@dnit.gov.br",
  },
  {
    id: "CAR-002",
    cliente: "SABESP",
    descricao: "Medicao #08 - Janeiro/2026",
    obra: "SES Metro Sul",
    valor: 3850000,
    vencimento: "2026-01-15",
    diasParaVencer: 6,
    status: "proximo",
    nf: "NF-E-001235",
    medicao: "MED-008",
    contato: "Ana Paula",
    telefone: "(11) 2222-3333",
    email: "ana.paula@sabesp.com.br",
  },
  {
    id: "CAR-003",
    cliente: "Furnas",
    descricao: "Medicao #15 - Janeiro/2026",
    obra: "UHE Belo Monte",
    valor: 8200000,
    vencimento: "2026-01-20",
    diasParaVencer: 11,
    status: "normal",
    nf: "NF-E-001236",
    medicao: "MED-015",
    contato: "Roberto Lima",
    telefone: "(21) 4444-5555",
    email: "roberto.lima@furnas.com.br",
  },
  {
    id: "CAR-004",
    cliente: "DERSA",
    descricao: "Medicao #03 - Janeiro/2026",
    obra: "Restauro SP-330",
    valor: 2100000,
    vencimento: "2026-01-25",
    diasParaVencer: 16,
    status: "normal",
    nf: "NF-E-001237",
    medicao: "MED-003",
    contato: "Marcia Souza",
    telefone: "(11) 5555-6666",
    email: "marcia.souza@dersa.sp.gov.br",
  },
  {
    id: "CAR-005",
    cliente: "DNIT",
    descricao: "Reajuste Contratual - 2025",
    obra: "BR-101 Lote 3",
    valor: 1500000,
    vencimento: "2026-01-08",
    diasAtraso: 1,
    status: "vencido",
    nf: "NF-E-001230",
    medicao: null,
    contato: "Carlos Silva",
    telefone: "(61) 3333-4444",
    email: "carlos.silva@dnit.gov.br",
  },
  {
    id: "CAR-006",
    cliente: "SABESP",
    descricao: "Aditivo #02 - Servicos Extras",
    obra: "SES Metro Sul",
    valor: 980000,
    vencimento: "2026-02-05",
    diasParaVencer: 27,
    status: "normal",
    nf: "NF-E-001238",
    medicao: "ADT-002",
    contato: "Ana Paula",
    telefone: "(11) 2222-3333",
    email: "ana.paula@sabesp.com.br",
  },
]

// Historico de recebimentos
const historicoRecebimentos = [
  { mes: "Ago", previsto: 24500000, recebido: 23800000 },
  { mes: "Set", previsto: 26800000, recebido: 26200000 },
  { mes: "Out", previsto: 27200000, recebido: 25900000 },
  { mes: "Nov", previsto: 28100000, recebido: 27500000 },
  { mes: "Dez", previsto: 30500000, recebido: 29800000 },
  { mes: "Jan", previsto: 32000000, recebido: 28600000 },
]

export default function CARPage() {
  const pathname = usePathname()
  const [searchTerm, setSearchTerm] = useState("")
  const [filtroCliente, setFiltroCliente] = useState("todos")
  const [filtroStatus, setFiltroStatus] = useState("todos")
  const [tituloDetalhe, setTituloDetalhe] = useState<(typeof titulosCAR)[0] | null>(null)

  const formatCurrency = (value: number) => {
    if (value >= 1000000) return `R$ ${(value / 1000000).toFixed(2)} Mi`
    if (value >= 1000) return `R$ ${(value / 1000).toFixed(0)} K`
    return `R$ ${value.toLocaleString("pt-BR")}`
  }

  const titulosFiltrados = titulosCAR.filter((t) => {
    if (filtroCliente !== "todos" && t.cliente !== filtroCliente) return false
    if (filtroStatus !== "todos" && t.status !== filtroStatus) return false
    if (searchTerm && !t.cliente.toLowerCase().includes(searchTerm.toLowerCase())) return false
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
                  placeholder="Buscar cliente..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-64 pl-7 h-8 text-xs"
                />
              </div>
              <Select value={filtroCliente} onValueChange={setFiltroCliente}>
                <SelectTrigger className="w-40 h-8 text-xs">
                  <SelectValue placeholder="Todos os clientes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos" className="text-xs">
                    Todos os clientes
                  </SelectItem>
                  {carPorCliente.map((c) => (
                    <SelectItem key={c.cliente} value={c.cliente} className="text-xs">
                    {c.cliente}
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
            <Button variant="outline" size="sm" className="h-7 text-xs gap-1 bg-transparent">
              <Download className="w-3.5 h-3.5" />
              Exportar
            </Button>
          </div>
        </header>

        {/* Conteudo */}
        <main className="flex-1 overflow-auto p-4">
          <div className="max-w-[1600px] mx-auto space-y-4">
            {/* Resumo */}
            <div className="grid grid-cols-6 gap-3">
              <Card className="p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-lg font-bold text-blue-600">{formatCurrency(resumoCAR.total)}</p>
                    <p className="text-[10px] text-muted-foreground">Total CAR</p>
                  </div>
                  <Receipt className="w-5 h-5 text-blue-600" />
                </div>
              </Card>
              <Card className="p-3 border-red-200 bg-red-50/50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-lg font-bold text-red-600">{formatCurrency(resumoCAR.vencido)}</p>
                    <p className="text-[10px] text-red-600/70">Vencido</p>
                  </div>
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                </div>
              </Card>
              <Card className="p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-lg font-bold">{formatCurrency(resumoCAR.aVencer)}</p>
                    <p className="text-[10px] text-muted-foreground">A Vencer</p>
                  </div>
                  <Calendar className="w-5 h-5 text-blue-600" />
                </div>
              </Card>
              <Card className="p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-lg font-bold text-emerald-600">{formatCurrency(resumoCAR.recebidoMes)}</p>
                    <p className="text-[10px] text-muted-foreground">Recebido no Mes</p>
                  </div>
                  <TrendingUp className="w-5 h-5 text-emerald-600" />
                </div>
              </Card>
              <Card className="p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-lg font-bold">{formatCurrency(resumoCAR.previstoMes)}</p>
                    <p className="text-[10px] text-muted-foreground">Previsto no Mes</p>
                  </div>
                  <Wallet className="w-5 h-5 text-purple-600" />
                </div>
              </Card>
              <Card className="p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-lg font-bold text-amber-600">{resumoCAR.inadimplencia}%</p>
                    <p className="text-[10px] text-muted-foreground">Inadimplencia</p>
                  </div>
                  <AlertTriangle className="w-5 h-5 text-amber-600" />
                </div>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
              {/* Grafico por Status */}
              <Card>
                <CardHeader className="py-3 px-4">
                  <CardTitle className="text-sm font-medium">CAR por Vencimento</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="h-[140px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={carPorStatus}
                          cx="50%"
                          cy="50%"
                          innerRadius={35}
                          outerRadius={55}
                          dataKey="valor"
                          nameKey="status"
                        >
                          {carPorStatus.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.cor} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value: number) => formatCurrency(value)} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="space-y-1.5 mt-2">
                    {carPorStatus.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.cor }} />
                          <span className="text-[10px]">{item.status}</span>
                        </div>
                        <span className="text-[10px] font-medium">{formatCurrency(item.valor)}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Lista de Titulos */}
              <Card className="lg:col-span-3">
                <CardHeader className="py-3 px-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium">Titulos a Receber</CardTitle>
                    <Badge variant="outline" className="text-[10px]">
                      {titulosFiltrados.length} titulos
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <ScrollArea className="h-[320px]">
                    <Table>
                      <TableHeader>
                        <TableRow className="hover:bg-transparent">
                          <TableHead className="text-[10px] h-8">Cliente</TableHead>
                          <TableHead className="text-[10px] h-8">Obra</TableHead>
                          <TableHead className="text-[10px] h-8">Medicao</TableHead>
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
                            className="cursor-pointer hover:bg-muted/50"
                            onClick={() => setTituloDetalhe(titulo)}
                          >
                            <TableCell className="py-2">
                              <div>
                                <p className="text-xs font-medium">{titulo.cliente}</p>
                                <p className="text-[10px] text-muted-foreground truncate max-w-[180px]">
                                  {titulo.descricao}
                                </p>
                              </div>
                            </TableCell>
                            <TableCell className="py-2 text-xs">{titulo.obra}</TableCell>
                            <TableCell className="py-2">
                              <Badge variant="outline" className="text-[9px]">
                                {titulo.medicao || "-"}
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
                              {titulo.status === "proximo" && (
                                <Badge className="text-[9px] bg-amber-500">{titulo.diasParaVencer}d</Badge>
                              )}
                              {titulo.status === "normal" && (
                                <Badge variant="outline" className="text-[9px]">
                                  {titulo.diasParaVencer}d
                                </Badge>
                              )}
                            </TableCell>
                            <TableCell className="py-2 text-xs text-right font-bold text-blue-600">
                              {formatCurrency(titulo.valor)}
                            </TableCell>
                            <TableCell className="py-2">
                              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                <Eye className="w-3.5 h-3.5" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>

            {/* CAR por Cliente + Historico */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* CAR por Cliente */}
              <Card>
                <CardHeader className="py-3 px-4">
                  <CardTitle className="text-sm font-medium">Contas a Receber por Cliente</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow className="hover:bg-transparent">
                        <TableHead className="text-[10px] h-8">Cliente</TableHead>
                        <TableHead className="text-[10px] h-8 text-right">Total CAR</TableHead>
                        <TableHead className="text-[10px] h-8 text-right">Vencido</TableHead>
                        <TableHead className="text-[10px] h-8 w-[120px]">Distribuicao</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {carPorCliente.map((cliente) => (
                        <TableRow key={cliente.cliente}>
                          <TableCell className="py-2">
                            <div className="flex items-center gap-2">
                              <Building2 className="w-3.5 h-3.5 text-muted-foreground" />
                              <span className="text-xs font-medium">{cliente.cliente}</span>
                            </div>
                          </TableCell>
                          <TableCell className="py-2 text-xs text-right font-medium">
                            {formatCurrency(cliente.total)}
                          </TableCell>
                          <TableCell className="py-2 text-xs text-right text-red-600">
                            {cliente.vencido > 0 ? formatCurrency(cliente.vencido) : "-"}
                          </TableCell>
                          <TableCell className="py-2">
                            <div className="flex items-center gap-2">
                              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-blue-500 rounded-full"
                                  style={{ width: `${cliente.percentual}%` }}
                                />
                              </div>
                              <span className="text-[10px] text-muted-foreground w-8">{cliente.percentual}%</span>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* Historico de Recebimentos */}
              <Card>
                <CardHeader className="py-3 px-4">
                  <CardTitle className="text-sm font-medium">Historico de Recebimentos</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={historicoRecebimentos} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                        <XAxis dataKey="mes" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                        <YAxis
                          tick={{ fontSize: 10 }}
                          axisLine={false}
                          tickLine={false}
                          tickFormatter={(v) => `${(v / 1000000).toFixed(0)}M`}
                        />
                        <Tooltip formatter={(value: number) => formatCurrency(value)} />
                        <Bar
                          dataKey="previsto"
                          fill="hsl(var(--muted-foreground))"
                          radius={[4, 4, 0, 0]}
                          name="Previsto"
                        />
                        <Bar dataKey="recebido" fill="hsl(210, 100%, 50%)" radius={[4, 4, 0, 0]} name="Recebido" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
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
                <p className="text-[10px] text-muted-foreground mb-1">Cliente</p>
                <p className="text-xs font-medium">{tituloDetalhe.cliente}</p>
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
                  <p className="text-[10px] text-muted-foreground mb-1">Medicao</p>
                  <Badge variant="outline" className="text-[9px]">
                    {tituloDetalhe.medicao || "-"}
                  </Badge>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-[10px] text-muted-foreground mb-1">Vencimento</p>
                  <p className="text-xs">{new Date(tituloDetalhe.vencimento).toLocaleDateString("pt-BR")}</p>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground mb-1">NF-e</p>
                  <p className="text-xs">{tituloDetalhe.nf}</p>
                </div>
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground mb-1">Valor</p>
                <p className="text-lg font-bold text-blue-600">{formatCurrency(tituloDetalhe.valor)}</p>
              </div>

              <div className="pt-2 border-t">
                <p className="text-[10px] text-muted-foreground mb-2">Contato do Cliente</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Avatar className="w-6 h-6">
                      <AvatarFallback className="text-[9px]">
                        {tituloDetalhe.contato
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-xs font-medium">{tituloDetalhe.contato}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Phone className="w-3 h-3" />
                    <span>{tituloDetalhe.telefone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Mail className="w-3 h-3" />
                    <span className="truncate">{tituloDetalhe.email}</span>
                  </div>
                </div>
              </div>

              {tituloDetalhe.status === "vencido" && (
                <div className="pt-2">
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="w-4 h-4 text-red-600" />
                      <span className="text-xs font-medium text-red-700">Titulo Vencido</span>
                    </div>
                    <p className="text-[10px] text-red-600">{tituloDetalhe.diasAtraso} dias de atraso</p>
                  </div>
                </div>
              )}

              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1 text-xs bg-transparent">
                  <Eye className="w-3.5 h-3.5 mr-1" />
                  Ver NF-e
                </Button>
                <Button size="sm" className="flex-1 text-xs bg-blue-600 hover:bg-blue-700">
                  <Phone className="w-3.5 h-3.5 mr-1" />
                  Cobrar
                </Button>
              </div>
            </div>
          </ScrollArea>
        </aside>
      )}
      </div>
      </main>
      </div>
    </div>
  )
}
