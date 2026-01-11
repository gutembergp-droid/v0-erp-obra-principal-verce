"use client"

import { useState, Suspense } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { ObraEngenhariaNavbar } from "../../_components/obra-engenharia-navbar"
import {
  GitBranch,
  Search,
  Filter,
  Clock,
  CheckCircle,
  AlertTriangle,
  XCircle,
  FileText,
  User,
  Calendar,
  ArrowRight,
  History,
  MessageSquare,
  Eye,
  ChevronRight,
  RefreshCw,
  TrendingUp,
} from "lucide-react"

// Dados mockados
const kpis = {
  totalRevisoes: 156,
  pendentesAprovacao: 12,
  aprovadasMes: 34,
  tempoMedioAprovacao: "3.2 dias",
  taxaAprovacao: 89,
}

const revisoes = [
  {
    id: "REV-001",
    documento: "PR-EST-001",
    titulo: "Projeto Estrutural - Bloco A",
    revisaoAnterior: "R02",
    revisaoNova: "R03",
    status: "Pendente Aprovacao",
    autor: "Eng. Carlos Silva",
    aprovador: "Coord. Roberto Lima",
    dataSubmissao: "02/01/2026",
    dataAprovacao: null,
    motivo: "Ajuste de armacao conforme RNC #045",
    impacto: "Medio",
    disciplina: "Estrutura",
  },
  {
    id: "REV-002",
    documento: "PR-HID-015",
    titulo: "Projeto Hidraulico - Pavimento Tipo",
    revisaoAnterior: "R01",
    revisaoNova: "R02",
    status: "Aprovado",
    autor: "Eng. Maria Santos",
    aprovador: "Coord. Roberto Lima",
    dataSubmissao: "28/12/2025",
    dataAprovacao: "30/12/2025",
    motivo: "Alteracao de diametro conforme especificacao",
    impacto: "Baixo",
    disciplina: "Hidraulica",
  },
  {
    id: "REV-003",
    documento: "PR-ELE-022",
    titulo: "Projeto Eletrico - Subestacao",
    revisaoAnterior: "R03",
    revisaoNova: "R04",
    status: "Em Analise",
    autor: "Eng. Ana Costa",
    aprovador: "Coord. Paulo Mendes",
    dataSubmissao: "03/01/2026",
    dataAprovacao: null,
    motivo: "Redimensionamento de cabos alimentadores",
    impacto: "Alto",
    disciplina: "Eletrica",
  },
  {
    id: "REV-004",
    documento: "PR-ARQ-018",
    titulo: "Projeto Arquitetonico - Fachada Principal",
    revisaoAnterior: "R04",
    revisaoNova: "R05",
    status: "Rejeitado",
    autor: "Arq. Paula Mendes",
    aprovador: "Coord. Roberto Lima",
    dataSubmissao: "01/01/2026",
    dataAprovacao: null,
    motivo: "Alteracao de revestimento",
    impacto: "Medio",
    disciplina: "Arquitetura",
  },
  {
    id: "REV-005",
    documento: "ET-MAT-008",
    titulo: "Especificacao Tecnica - Concreto Estrutural",
    revisaoAnterior: "R00",
    revisaoNova: "R01",
    status: "Aprovado",
    autor: "Eng. Roberto Lima",
    aprovador: "Coord. Carlos Silva",
    dataSubmissao: "05/11/2025",
    dataAprovacao: "08/11/2025",
    motivo: "Inclusao de fck 40 MPa",
    impacto: "Baixo",
    disciplina: "Materiais",
  },
]

const comentarios = [
  {
    autor: "Coord. Roberto Lima",
    data: "03/01/2026 14:30",
    texto: "Verificar compatibilidade com projeto estrutural.",
  },
  { autor: "Eng. Carlos Silva", data: "03/01/2026 15:45", texto: "Compatibilizado. Sem interferencias." },
  { autor: "Coord. Roberto Lima", data: "03/01/2026 16:00", texto: "Ok. Aguardando validacao do cliente." },
]

function RevisoesContent() {
  const [filtroStatus, setFiltroStatus] = useState("todos")
  const [filtroDisciplina, setFiltroDisciplina] = useState("todas")
  const [filtroImpacto, setFiltroImpacto] = useState("todos")
  const [busca, setBusca] = useState("")
  const [revisaoSelecionada, setRevisaoSelecionada] = useState<(typeof revisoes)[0] | null>(null)
  const [painelAberto, setPainelAberto] = useState(false)

  const revisoesFiltradas = revisoes.filter((rev) => {
    const matchStatus = filtroStatus === "todos" || rev.status === filtroStatus
    const matchDisciplina = filtroDisciplina === "todas" || rev.disciplina === filtroDisciplina
    const matchImpacto = filtroImpacto === "todos" || rev.impacto === filtroImpacto
    const matchBusca =
      busca === "" ||
      rev.titulo.toLowerCase().includes(busca.toLowerCase()) ||
      rev.documento.toLowerCase().includes(busca.toLowerCase())
    return matchStatus && matchDisciplina && matchImpacto && matchBusca
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Aprovado":
        return "bg-primary/10 text-primary"
      case "Em Analise":
        return "bg-accent/20 text-accent-foreground"
      case "Pendente Aprovacao":
        return "bg-muted text-muted-foreground"
      case "Rejeitado":
        return "bg-destructive/10 text-destructive"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Aprovado":
        return <CheckCircle className="w-4 h-4" />
      case "Em Analise":
        return <Clock className="w-4 h-4" />
      case "Pendente Aprovacao":
        return <AlertTriangle className="w-4 h-4" />
      case "Rejeitado":
        return <XCircle className="w-4 h-4" />
      default:
        return <GitBranch className="w-4 h-4" />
    }
  }

  const getImpactoColor = (impacto: string) => {
    switch (impacto) {
      case "Alto":
        return "bg-destructive/10 text-destructive"
      case "Medio":
        return "bg-accent/20 text-accent-foreground"
      case "Baixo":
        return "bg-primary/10 text-primary"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const abrirDetalhe = (rev: (typeof revisoes)[0]) => {
    setRevisaoSelecionada(rev)
    setPainelAberto(true)
  }

  return (
    <div className="overflow-auto h-full">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-foreground">Controle de Revisoes</h1>
              <Badge variant="outline" className="text-xs">
                EN-04
              </Badge>
            </div>
            <p className="text-muted-foreground text-sm mt-1">Versionamento e aprovacao de documentos tecnicos</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <History className="w-4 h-4 mr-2" />
              Historico
            </Button>
            <Button size="sm" className="bg-primary text-primary-foreground">
              <RefreshCw className="w-4 h-4 mr-2" />
              Nova Revisao
            </Button>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-5 gap-4">
          <Card className="bg-card border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Total Revisoes</p>
                  <p className="text-2xl font-bold text-foreground">{kpis.totalRevisoes}</p>
                </div>
                <div className="p-2 rounded-lg bg-primary/10">
                  <GitBranch className="w-5 h-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Pendentes</p>
                  <p className="text-2xl font-bold text-foreground">{kpis.pendentesAprovacao}</p>
                </div>
                <div className="p-2 rounded-lg bg-accent/20">
                  <Clock className="w-5 h-5 text-accent-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Aprovadas no Mes</p>
                  <p className="text-2xl font-bold text-foreground">{kpis.aprovadasMes}</p>
                </div>
                <div className="p-2 rounded-lg bg-primary/10">
                  <CheckCircle className="w-5 h-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Tempo Medio</p>
                  <p className="text-2xl font-bold text-foreground">{kpis.tempoMedioAprovacao}</p>
                </div>
                <div className="p-2 rounded-lg bg-muted">
                  <TrendingUp className="w-5 h-5 text-muted-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Taxa Aprovacao</p>
                  <p className="text-2xl font-bold text-foreground">{kpis.taxaAprovacao}%</p>
                </div>
                <div className="p-2 rounded-lg bg-primary/10">
                  <CheckCircle className="w-5 h-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Alerta de Governanca */}
        {kpis.pendentesAprovacao > 10 && (
          <Card className="border-l-4 border-l-destructive bg-destructive/5">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-destructive" />
                <div>
                  <p className="font-medium text-foreground">Revisoes pendentes acumuladas</p>
                  <p className="text-sm text-muted-foreground">
                    {kpis.pendentesAprovacao} revisoes aguardando aprovacao. Verificar gargalo no fluxo.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Filtros */}
        <Card className="bg-card border">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Filter className="w-4 h-4" />
                <span className="text-sm font-medium">Filtros:</span>
              </div>

              <Select value={filtroStatus} onValueChange={setFiltroStatus}>
                <SelectTrigger className="w-44">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="Pendente Aprovacao">Pendente</SelectItem>
                  <SelectItem value="Em Analise">Em Analise</SelectItem>
                  <SelectItem value="Aprovado">Aprovado</SelectItem>
                  <SelectItem value="Rejeitado">Rejeitado</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filtroDisciplina} onValueChange={setFiltroDisciplina}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Disciplina" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todas">Todas</SelectItem>
                  <SelectItem value="Estrutura">Estrutura</SelectItem>
                  <SelectItem value="Arquitetura">Arquitetura</SelectItem>
                  <SelectItem value="Hidraulica">Hidraulica</SelectItem>
                  <SelectItem value="Eletrica">Eletrica</SelectItem>
                  <SelectItem value="Materiais">Materiais</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filtroImpacto} onValueChange={setFiltroImpacto}>
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="Impacto" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="Alto">Alto</SelectItem>
                  <SelectItem value="Medio">Medio</SelectItem>
                  <SelectItem value="Baixo">Baixo</SelectItem>
                </SelectContent>
              </Select>

              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por documento ou titulo..."
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabela de Revisoes */}
        <Card className="bg-card border">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <GitBranch className="w-4 h-4 text-primary" />
              Controle de Revisoes
              <Badge variant="secondary" className="ml-2">
                {revisoesFiltradas.length}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr className="text-left text-xs text-muted-foreground">
                    <th className="p-3 font-medium">Documento</th>
                    <th className="p-3 font-medium">Titulo</th>
                    <th className="p-3 font-medium">Versao</th>
                    <th className="p-3 font-medium">Status</th>
                    <th className="p-3 font-medium">Impacto</th>
                    <th className="p-3 font-medium">Autor</th>
                    <th className="p-3 font-medium">Data</th>
                    <th className="p-3 font-medium">Acoes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {revisoesFiltradas.map((rev) => (
                    <tr
                      key={rev.id}
                      className="hover:bg-muted/30 cursor-pointer transition-colors"
                      onClick={() => abrirDetalhe(rev)}
                    >
                      <td className="p-3">
                        <span className="font-mono text-sm text-foreground">{rev.documento}</span>
                      </td>
                      <td className="p-3">
                        <span className="text-sm text-foreground">{rev.titulo}</span>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center gap-1">
                          <Badge variant="secondary" className="text-xs font-mono">
                            {rev.revisaoAnterior}
                          </Badge>
                          <ArrowRight className="w-3 h-3 text-muted-foreground" />
                          <Badge variant="default" className="text-xs font-mono bg-primary text-primary-foreground">
                            {rev.revisaoNova}
                          </Badge>
                        </div>
                      </td>
                      <td className="p-3">
                        <Badge className={`text-xs ${getStatusColor(rev.status)}`}>
                          <span className="flex items-center gap-1">
                            {getStatusIcon(rev.status)}
                            {rev.status}
                          </span>
                        </Badge>
                      </td>
                      <td className="p-3">
                        <Badge className={`text-xs ${getImpactoColor(rev.impacto)}`}>{rev.impacto}</Badge>
                      </td>
                      <td className="p-3">
                        <span className="text-sm text-muted-foreground">{rev.autor}</span>
                      </td>
                      <td className="p-3">
                        <span className="text-sm text-muted-foreground">{rev.dataSubmissao}</span>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={(e) => e.stopPropagation()}>
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={(e) => e.stopPropagation()}>
                            <ChevronRight className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Painel Lateral */}
        <Sheet open={painelAberto} onOpenChange={setPainelAberto}>
          <SheetContent className="w-[500px] sm:max-w-[500px] overflow-y-auto">
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2">
                <GitBranch className="w-5 h-5 text-primary" />
                Detalhe da Revisao
              </SheetTitle>
            </SheetHeader>

            {revisaoSelecionada && (
              <div className="mt-6 space-y-6">
                {/* Info Principal */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="font-mono">
                      {revisaoSelecionada.id}
                    </Badge>
                    <Badge className={getStatusColor(revisaoSelecionada.status)}>
                      {getStatusIcon(revisaoSelecionada.status)}
                      <span className="ml-1">{revisaoSelecionada.status}</span>
                    </Badge>
                  </div>

                  <h3 className="text-lg font-semibold text-foreground">{revisaoSelecionada.titulo}</h3>

                  <Card className="bg-muted/30">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-center gap-4">
                        <div className="text-center">
                          <p className="text-xs text-muted-foreground">Versao Anterior</p>
                          <Badge variant="secondary" className="text-lg font-mono mt-1">
                            {revisaoSelecionada.revisaoAnterior}
                          </Badge>
                        </div>
                        <ArrowRight className="w-6 h-6 text-primary" />
                        <div className="text-center">
                          <p className="text-xs text-muted-foreground">Nova Versao</p>
                          <Badge className="text-lg font-mono mt-1 bg-primary text-primary-foreground">
                            {revisaoSelecionada.revisaoNova}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Separator />

                {/* Detalhes */}
                <div className="space-y-3">
                  <h4 className="font-medium text-foreground">Informacoes</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-2 text-sm">
                      <FileText className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Documento:</span>
                      <span className="text-foreground font-mono">{revisaoSelecionada.documento}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <User className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Autor:</span>
                      <span className="text-foreground">{revisaoSelecionada.autor}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <User className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Aprovador:</span>
                      <span className="text-foreground">{revisaoSelecionada.aprovador}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Submissao:</span>
                      <span className="text-foreground">{revisaoSelecionada.dataSubmissao}</span>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Motivo */}
                <div className="space-y-3">
                  <h4 className="font-medium text-foreground">Motivo da Revisao</h4>
                  <Card className="bg-muted/30">
                    <CardContent className="p-3">
                      <p className="text-sm text-foreground">{revisaoSelecionada.motivo}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs text-muted-foreground">Impacto:</span>
                        <Badge className={`text-xs ${getImpactoColor(revisaoSelecionada.impacto)}`}>
                          {revisaoSelecionada.impacto}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Separator />

                {/* Comentarios */}
                <div className="space-y-3">
                  <h4 className="font-medium text-foreground flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-primary" />
                    Comentarios
                  </h4>
                  <div className="space-y-2">
                    {comentarios.map((com, index) => (
                      <Card key={index} className="bg-muted/30">
                        <CardContent className="p-3">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium text-foreground">{com.autor}</span>
                            <span className="text-xs text-muted-foreground">{com.data}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">{com.texto}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Acoes */}
                <div className="flex gap-2">
                  <Button className="flex-1 bg-primary text-primary-foreground">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Aprovar
                  </Button>
                  <Button variant="destructive" className="flex-1">
                    <XCircle className="w-4 h-4 mr-2" />
                    Rejeitar
                  </Button>
                </div>
              </div>
            )}
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}

export default function ControleRevisoesPage() {
  return (
    <Suspense fallback={null}>
      <RevisoesContent />
    </Suspense>
  )
}
