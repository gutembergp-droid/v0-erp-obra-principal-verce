"use client"

import { useState, Suspense } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { RHNav } from "@/components/rh/rh-nav"
import {
  ShieldCheck,
  FileText,
  Stethoscope,
  GraduationCap,
  Download,
  CheckCircle2,
  Scale,
  Search,
  RefreshCw,
  AlertTriangle,
  Lock,
  Eye,
  Upload,
  Gavel,
  Info,
  History,
  ShieldAlert,
  Ban,
} from "lucide-react"

// ============================================
// DADOS MOCKADOS - CONFORMIDADE UNIFICADA
// ============================================

const conformidadeMock = [
  {
    id: 1,
    colaborador: "Jose Silva Santos",
    matricula: "1001",
    tipo: "Documento",
    item: "CNH",
    obrigatorio: true,
    validade: "2026-01-15",
    status: "vencendo",
    impacto: "bloqueio_operacao",
    riscoJuridico: true,
  },
  {
    id: 2,
    colaborador: "Jose Silva Santos",
    matricula: "1001",
    tipo: "ASO",
    item: "Periodico",
    obrigatorio: true,
    validade: "2026-07-15",
    status: "valido",
    impacto: null,
    riscoJuridico: false,
  },
  {
    id: 3,
    colaborador: "Jose Silva Santos",
    matricula: "1001",
    tipo: "NR",
    item: "NR-35 Trabalho em Altura",
    obrigatorio: true,
    validade: "2026-06-15",
    status: "valido",
    impacto: null,
    riscoJuridico: false,
  },
  {
    id: 4,
    colaborador: "Maria Aparecida Costa",
    matricula: "1002",
    tipo: "Documento",
    item: "CREA",
    obrigatorio: true,
    validade: "2027-06-20",
    status: "valido",
    impacto: null,
    riscoJuridico: false,
  },
  {
    id: 5,
    colaborador: "Roberto Alves Souza",
    matricula: "1003",
    tipo: "ASO",
    item: "Admissional",
    obrigatorio: true,
    validade: null,
    status: "pendente",
    impacto: "bloqueio_efetivacao",
    riscoJuridico: true,
  },
  {
    id: 6,
    colaborador: "Roberto Alves Souza",
    matricula: "1003",
    tipo: "NR",
    item: "NR-35 Trabalho em Altura",
    obrigatorio: true,
    validade: null,
    status: "pendente",
    impacto: "bloqueio_operacao",
    riscoJuridico: true,
  },
  {
    id: 7,
    colaborador: "Paulo Mendes Junior",
    matricula: "1005",
    tipo: "ASO",
    item: "Periodico",
    obrigatorio: true,
    validade: "2026-01-10",
    status: "vencendo",
    impacto: "bloqueio_operacao",
    riscoJuridico: true,
  },
  {
    id: 8,
    colaborador: "Paulo Mendes Junior",
    matricula: "1005",
    tipo: "NR",
    item: "NR-10 Eletricidade",
    obrigatorio: true,
    validade: "2026-02-01",
    status: "vencendo",
    impacto: "bloqueio_operacao",
    riscoJuridico: true,
  },
  {
    id: 9,
    colaborador: "Ana Paula Lima",
    matricula: "1004",
    tipo: "Treinamento",
    item: "Integracao SSMA",
    obrigatorio: true,
    validade: "2027-01-05",
    status: "valido",
    impacto: null,
    riscoJuridico: false,
  },
  {
    id: 10,
    colaborador: "Carlos Eduardo Lima",
    matricula: "1006",
    tipo: "Documento",
    item: "Contrato PJ",
    obrigatorio: true,
    validade: "2025-12-31",
    status: "vencido",
    impacto: "bloqueio_pagamento",
    riscoJuridico: true,
  },
]

// Historico de conformidade
const historicoConformidadeMock = [
  { data: "2025-12-20", evento: "Documento vencido", item: "Contrato PJ", acao: "Bloqueio de pagamento ativado" },
  { data: "2025-12-15", evento: "Alerta de vencimento", item: "CNH", acao: "Notificacao enviada ao colaborador" },
  { data: "2025-11-01", evento: "ASO realizado", item: "Periodico", acao: "Documento anexado ao prontuario" },
]

// ============================================
// COMPONENTE PRINCIPAL
// ============================================

function ConformidadeContent() {
  const [busca, setBusca] = useState("")
  const [filtroTipo, setFiltroTipo] = useState("todos")
  const [filtroStatus, setFiltroStatus] = useState("todos")
  const [detalheAberto, setDetalheAberto] = useState(false)
  const [itemSelecionado, setItemSelecionado] = useState<(typeof conformidadeMock)[0] | null>(null)

  // Contadores
  const totalColaboradores = new Set(conformidadeMock.map((c) => c.matricula)).size
  const emConformidade = conformidadeMock.filter((c) => c.status === "valido").length
  const pendencias = conformidadeMock.filter(
    (c) => c.status === "pendente" || c.status === "vencendo" || c.status === "vencido",
  ).length
  const sstPendente = conformidadeMock.filter(
    (c) => (c.tipo === "ASO" || c.tipo === "NR") && c.status !== "valido",
  ).length
  const riscoJuridico = conformidadeMock.filter((c) => c.riscoJuridico).length
  const bloqueios = conformidadeMock.filter((c) => c.impacto).length

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "valido":
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Valido</Badge>
      case "vencendo":
        return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Vencendo</Badge>
      case "pendente":
        return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Pendente</Badge>
      case "vencido":
        return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Vencido</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getImpactoBadge = (impacto: string | null) => {
    if (!impacto) return null
    switch (impacto) {
      case "bloqueio_efetivacao":
        return (
          <Badge variant="outline" className="text-xs border-red-500/50 text-red-400">
            <Lock className="h-3 w-3 mr-1" />
            Bloqueia Efetivacao
          </Badge>
        )
      case "bloqueio_operacao":
        return (
          <Badge variant="outline" className="text-xs border-orange-500/50 text-orange-400">
            <Ban className="h-3 w-3 mr-1" />
            Bloqueia Operacao
          </Badge>
        )
      case "bloqueio_pagamento":
        return (
          <Badge variant="outline" className="text-xs border-purple-500/50 text-purple-400">
            <Lock className="h-3 w-3 mr-1" />
            Bloqueia Pagamento
          </Badge>
        )
      default:
        return null
    }
  }

  const getTipoBadge = (tipo: string) => {
    switch (tipo) {
      case "Documento":
        return (
          <Badge variant="outline" className="text-xs">
            <FileText className="h-3 w-3 mr-1" />
            Documento
          </Badge>
        )
      case "ASO":
        return (
          <Badge variant="outline" className="text-xs">
            <Stethoscope className="h-3 w-3 mr-1" />
            ASO
          </Badge>
        )
      case "NR":
        return (
          <Badge variant="outline" className="text-xs">
            <GraduationCap className="h-3 w-3 mr-1" />
            NR
          </Badge>
        )
      case "Treinamento":
        return (
          <Badge variant="outline" className="text-xs">
            <GraduationCap className="h-3 w-3 mr-1" />
            Treinamento
          </Badge>
        )
      default:
        return (
          <Badge variant="outline" className="text-xs">
            {tipo}
          </Badge>
        )
    }
  }

  const dadosFiltrados = conformidadeMock.filter((c) => {
    const matchBusca =
      c.colaborador.toLowerCase().includes(busca.toLowerCase()) ||
      c.matricula.includes(busca) ||
      c.item.toLowerCase().includes(busca.toLowerCase())
    const matchTipo = filtroTipo === "todos" || c.tipo.toLowerCase() === filtroTipo.toLowerCase()
    const matchStatus = filtroStatus === "todos" || c.status === filtroStatus
    return matchBusca && matchTipo && matchStatus
  })

  const abrirDetalhe = (item: (typeof conformidadeMock)[0]) => {
    setItemSelecionado(item)
    setDetalheAberto(true)
  }

  return (
    <div className="flex-1 flex flex-col">
      <RHNav modulo="obra" />

      <div className="flex-1 space-y-6 p-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <ShieldCheck className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Conformidade</h1>
              <p className="text-sm text-muted-foreground">
                Documentos, ASO, NRs e Treinamentos - Base para defesa juridica
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Relatorio Diligencia
            </Button>
          </div>
        </div>

        {/* Cards de Visao */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <Card className="bg-green-500/10 border-green-500/30">
            <CardContent className="p-4 text-center">
              <CheckCircle2 className="h-5 w-5 mx-auto mb-1 text-green-500" />
              <p className="text-2xl font-bold text-green-500">{emConformidade}</p>
              <p className="text-xs text-green-400">Em Conformidade</p>
            </CardContent>
          </Card>
          <Card
            className="bg-yellow-500/10 border-yellow-500/30 cursor-pointer"
            onClick={() => setFiltroStatus("pendente")}
          >
            <CardContent className="p-4 text-center">
              <FileText className="h-5 w-5 mx-auto mb-1 text-yellow-500" />
              <p className="text-2xl font-bold text-yellow-500">{pendencias}</p>
              <p className="text-xs text-yellow-400">Pendencias</p>
            </CardContent>
          </Card>
          <Card className="bg-orange-500/10 border-orange-500/30 cursor-pointer" onClick={() => setFiltroTipo("aso")}>
            <CardContent className="p-4 text-center">
              <Stethoscope className="h-5 w-5 mx-auto mb-1 text-orange-500" />
              <p className="text-2xl font-bold text-orange-500">{sstPendente}</p>
              <p className="text-xs text-orange-400">SST Pendente</p>
            </CardContent>
          </Card>
          <Card className="bg-red-500/10 border-red-500/30">
            <CardContent className="p-4 text-center">
              <Scale className="h-5 w-5 mx-auto mb-1 text-red-500" />
              <p className="text-2xl font-bold text-red-500">{riscoJuridico}</p>
              <p className="text-xs text-red-400">Risco Juridico</p>
            </CardContent>
          </Card>
          <Card className="bg-purple-500/10 border-purple-500/30">
            <CardContent className="p-4 text-center">
              <Lock className="h-5 w-5 mx-auto mb-1 text-purple-500" />
              <p className="text-2xl font-bold text-purple-500">{bloqueios}</p>
              <p className="text-xs text-purple-400">Bloqueios Ativos</p>
            </CardContent>
          </Card>
        </div>

        {/* Alerta Juridico */}
        {riscoJuridico > 0 && (
          <Alert className="border-orange-500/50 bg-orange-500/10">
            <Gavel className="h-4 w-4 text-orange-500" />
            <AlertDescription className="text-orange-300">
              <strong>{riscoJuridico} item(ns)</strong> com risco juridico identificado. Documentos vencidos ou ausentes
              podem gerar passivo trabalhista e multas.
            </AlertDescription>
          </Alert>
        )}

        {/* Tabela Principal */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">Tabela de Conformidade</CardTitle>
                <CardDescription>Visao unificada de todos os requisitos</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar..."
                    className="pl-10"
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                  />
                </div>
                <Select value={filtroTipo} onValueChange={setFiltroTipo}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos</SelectItem>
                    <SelectItem value="documento">Documento</SelectItem>
                    <SelectItem value="aso">ASO</SelectItem>
                    <SelectItem value="nr">NR</SelectItem>
                    <SelectItem value="treinamento">Treinamento</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filtroStatus} onValueChange={setFiltroStatus}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos</SelectItem>
                    <SelectItem value="valido">Valido</SelectItem>
                    <SelectItem value="vencendo">Vencendo</SelectItem>
                    <SelectItem value="pendente">Pendente</SelectItem>
                    <SelectItem value="vencido">Vencido</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setBusca("")
                    setFiltroTipo("todos")
                    setFiltroStatus("todos")
                  }}
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Colaborador</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Item</TableHead>
                  <TableHead className="text-center">Obrigatorio</TableHead>
                  <TableHead>Validade</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Impacto</TableHead>
                  <TableHead className="text-center">Juridico</TableHead>
                  <TableHead className="text-right">Acao</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dadosFiltrados.map((c) => (
                  <TableRow
                    key={c.id}
                    className={c.status === "vencido" || c.status === "pendente" ? "bg-red-500/5" : ""}
                  >
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{c.colaborador}</span>
                        {c.riscoJuridico && <Scale className="h-4 w-4 text-red-500" />}
                      </div>
                      <span className="text-xs text-muted-foreground">{c.matricula}</span>
                    </TableCell>
                    <TableCell>{getTipoBadge(c.tipo)}</TableCell>
                    <TableCell className="font-medium">{c.item}</TableCell>
                    <TableCell className="text-center">
                      {c.obrigatorio ? (
                        <CheckCircle2 className="h-4 w-4 text-green-500 mx-auto" />
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell>{c.validade || <span className="text-muted-foreground">-</span>}</TableCell>
                    <TableCell>{getStatusBadge(c.status)}</TableCell>
                    <TableCell>{getImpactoBadge(c.impacto)}</TableCell>
                    <TableCell className="text-center">
                      {c.riscoJuridico && <AlertTriangle className="h-4 w-4 text-orange-500 mx-auto" />}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => abrirDetalhe(c)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        {(c.status === "pendente" || c.status === "vencido") && (
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Upload className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Card Informativo - Regras */}
        <Card className="border-muted">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div className="space-y-1 text-sm text-muted-foreground">
                <p>
                  <strong>Regras de Bloqueio:</strong> Documento vencido = alerta juridico. Documento obrigatorio
                  ausente = bloqueio automatico.
                </p>
                <p>
                  <strong>Rastreabilidade:</strong> Historico nunca e apagado. Tudo e versionado e auditavel para fins
                  de defesa trabalhista.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sheet de Detalhe */}
      <Sheet open={detalheAberto} onOpenChange={setDetalheAberto}>
        <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              {itemSelecionado?.item}
              {itemSelecionado?.riscoJuridico && <Scale className="h-5 w-5 text-red-500" />}
            </SheetTitle>
            <SheetDescription>
              {itemSelecionado?.colaborador} - Mat. {itemSelecionado?.matricula}
            </SheetDescription>
          </SheetHeader>

          <Tabs defaultValue="detalhes" className="mt-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="detalhes">Detalhes</TabsTrigger>
              <TabsTrigger value="historico">Historico</TabsTrigger>
            </TabsList>

            <TabsContent value="detalhes" className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <p className="text-xs text-muted-foreground">Tipo</p>
                    <div className="mt-1">{getTipoBadge(itemSelecionado?.tipo || "")}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <p className="text-xs text-muted-foreground">Status</p>
                    <div className="mt-1">{getStatusBadge(itemSelecionado?.status || "")}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <p className="text-xs text-muted-foreground">Validade</p>
                    <p className="font-medium mt-1">{itemSelecionado?.validade || "Nao informada"}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <p className="text-xs text-muted-foreground">Obrigatorio</p>
                    <p className="font-medium mt-1">{itemSelecionado?.obrigatorio ? "Sim" : "Nao"}</p>
                  </CardContent>
                </Card>
              </div>

              {itemSelecionado?.impacto && (
                <Alert className="border-red-500/50 bg-red-500/10">
                  <Lock className="h-4 w-4 text-red-500" />
                  <AlertDescription className="text-red-300">
                    <strong>Bloqueio ativo:</strong>{" "}
                    {itemSelecionado.impacto.replace("bloqueio_", "").replace("_", " ")}
                  </AlertDescription>
                </Alert>
              )}

              {itemSelecionado?.riscoJuridico && (
                <Card className="border-orange-500/30">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <ShieldAlert className="h-4 w-4 text-orange-500" />
                      Risco Juridico Identificado
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    Este item pode gerar passivo trabalhista. Regularize o mais rapido possivel.
                  </CardContent>
                </Card>
              )}

              <div className="flex gap-2">
                <Button className="flex-1">
                  <Upload className="h-4 w-4 mr-2" />
                  Anexar Documento
                </Button>
                <Button variant="outline" className="flex-1 bg-transparent">
                  <Download className="h-4 w-4 mr-2" />
                  Exportar
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="historico" className="mt-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <History className="h-4 w-4" />
                    Trilha de Auditoria
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {historicoConformidadeMock.map((h, i) => (
                      <div key={i} className="flex gap-3 pb-3 border-b last:border-0">
                        <div className="flex-shrink-0 w-2 h-2 rounded-full bg-primary mt-2" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">{h.data}</span>
                            <Badge variant="outline" className="text-xs">
                              {h.evento}
                            </Badge>
                          </div>
                          <p className="text-sm mt-1">{h.item}</p>
                          <p className="text-xs text-muted-foreground mt-1">Acao: {h.acao}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default function ConformidadePage() {
  return (
    <Suspense fallback={null}>
      <ConformidadeContent />
    </Suspense>
  )
}
