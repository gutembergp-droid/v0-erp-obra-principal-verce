"use client"

import { useState, Suspense } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import {
  FileText,
  Search,
  Filter,
  Download,
  Eye,
  Upload,
  FolderOpen,
  Clock,
  CheckCircle,
  AlertTriangle,
  XCircle,
  FileImage,
  File,
  ChevronRight,
  History,
  User,
  Calendar,
  Tag,
  Layers,
} from "lucide-react"

// Dados mockados
const kpis = {
  total: 248,
  aprovados: 189,
  emAnalise: 34,
  pendentes: 18,
  rejeitados: 7,
}

const documentos = [
  {
    id: "DOC-001",
    codigo: "PR-EST-001",
    titulo: "Projeto Estrutural - Bloco A",
    tipo: "Projeto",
    disciplina: "Estrutura",
    revisao: "R03",
    status: "Aprovado",
    responsavel: "Eng. Carlos Silva",
    dataEmissao: "12/12/2025",
    dataAprovacao: "15/12/2025",
    formato: "DWG",
    tamanho: "2.4 MB",
  },
  {
    id: "DOC-002",
    codigo: "PR-HID-015",
    titulo: "Projeto Hidraulico - Pavimento Tipo",
    tipo: "Projeto",
    disciplina: "Hidraulica",
    revisao: "R02",
    status: "Em Analise",
    responsavel: "Eng. Maria Santos",
    dataEmissao: "18/12/2025",
    dataAprovacao: null,
    formato: "DWG",
    tamanho: "1.8 MB",
  },
  {
    id: "DOC-003",
    codigo: "ET-MAT-008",
    titulo: "Especificacao Tecnica - Concreto Estrutural",
    tipo: "Especificacao",
    disciplina: "Materiais",
    revisao: "R01",
    status: "Aprovado",
    responsavel: "Eng. Roberto Lima",
    dataEmissao: "05/11/2025",
    dataAprovacao: "08/11/2025",
    formato: "PDF",
    tamanho: "856 KB",
  },
  {
    id: "DOC-004",
    codigo: "PR-ELE-022",
    titulo: "Projeto Eletrico - Subestacao",
    tipo: "Projeto",
    disciplina: "Eletrica",
    revisao: "R04",
    status: "Pendente",
    responsavel: "Eng. Ana Costa",
    dataEmissao: "20/12/2025",
    dataAprovacao: null,
    formato: "DWG",
    tamanho: "3.1 MB",
  },
  {
    id: "DOC-005",
    codigo: "AB-EST-003",
    titulo: "As-Built - Fundacoes Bloco B",
    tipo: "As-Built",
    disciplina: "Estrutura",
    revisao: "R00",
    status: "Aprovado",
    responsavel: "Eng. Carlos Silva",
    dataEmissao: "10/12/2025",
    dataAprovacao: "12/12/2025",
    formato: "DWG",
    tamanho: "4.2 MB",
  },
  {
    id: "DOC-006",
    codigo: "PR-ARQ-018",
    titulo: "Projeto Arquitetonico - Fachada Principal",
    tipo: "Projeto",
    disciplina: "Arquitetura",
    revisao: "R05",
    status: "Rejeitado",
    responsavel: "Arq. Paula Mendes",
    dataEmissao: "15/12/2025",
    dataAprovacao: null,
    formato: "DWG",
    tamanho: "5.6 MB",
  },
]

const historicoRevisoes = [
  { revisao: "R03", data: "12/12/2025", autor: "Eng. Carlos Silva", motivo: "Ajuste de armacao conforme RNC" },
  { revisao: "R02", data: "28/11/2025", autor: "Eng. Carlos Silva", motivo: "Correcao de cotas" },
  { revisao: "R01", data: "15/11/2025", autor: "Eng. Carlos Silva", motivo: "Inclusao de detalhes construtivos" },
  { revisao: "R00", data: "01/11/2025", autor: "Eng. Carlos Silva", motivo: "Emissao inicial" },
]

function DocumentosContent() {
  const [filtroTipo, setFiltroTipo] = useState("todos")
  const [filtroDisciplina, setFiltroDisciplina] = useState("todas")
  const [filtroStatus, setFiltroStatus] = useState("todos")
  const [busca, setBusca] = useState("")
  const [documentoSelecionado, setDocumentoSelecionado] = useState<(typeof documentos)[0] | null>(null)
  const [painelAberto, setPainelAberto] = useState(false)

  const documentosFiltrados = documentos.filter((doc) => {
    const matchTipo = filtroTipo === "todos" || doc.tipo === filtroTipo
    const matchDisciplina = filtroDisciplina === "todas" || doc.disciplina === filtroDisciplina
    const matchStatus = filtroStatus === "todos" || doc.status === filtroStatus
    const matchBusca =
      busca === "" ||
      doc.titulo.toLowerCase().includes(busca.toLowerCase()) ||
      doc.codigo.toLowerCase().includes(busca.toLowerCase())
    return matchTipo && matchDisciplina && matchStatus && matchBusca
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Aprovado":
        return "bg-primary/10 text-primary"
      case "Em Analise":
        return "bg-accent/20 text-accent-foreground"
      case "Pendente":
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
      case "Pendente":
        return <AlertTriangle className="w-4 h-4" />
      case "Rejeitado":
        return <XCircle className="w-4 h-4" />
      default:
        return <FileText className="w-4 h-4" />
    }
  }

  const getFormatoIcon = (formato: string) => {
    switch (formato) {
      case "DWG":
        return <Layers className="w-4 h-4 text-primary" />
      case "PDF":
        return <FileText className="w-4 h-4 text-destructive" />
      case "IMG":
        return <FileImage className="w-4 h-4 text-primary" />
      default:
        return <File className="w-4 h-4" />
    }
  }

  const abrirDetalhe = (doc: (typeof documentos)[0]) => {
    setDocumentoSelecionado(doc)
    setPainelAberto(true)
  }

  return (
    <div className="overflow-auto h-full">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-foreground">Documentos Tecnicos</h1>
              <Badge variant="outline" className="text-xs">
                EN-03
              </Badge>
            </div>
            <p className="text-muted-foreground text-sm mt-1">Gestao de projetos, especificacoes e As-Built</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </Button>
            <Button size="sm" className="bg-primary text-primary-foreground">
              <Upload className="w-4 h-4 mr-2" />
              Upload
            </Button>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-5 gap-4">
          <Card className="bg-card border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Total Documentos</p>
                  <p className="text-2xl font-bold text-foreground">{kpis.total}</p>
                </div>
                <div className="p-2 rounded-lg bg-primary/10">
                  <FolderOpen className="w-5 h-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Aprovados</p>
                  <p className="text-2xl font-bold text-foreground">{kpis.aprovados}</p>
                  <p className="text-xs text-primary">{((kpis.aprovados / kpis.total) * 100).toFixed(0)}%</p>
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
                  <p className="text-xs text-muted-foreground">Em Analise</p>
                  <p className="text-2xl font-bold text-foreground">{kpis.emAnalise}</p>
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
                  <p className="text-xs text-muted-foreground">Pendentes</p>
                  <p className="text-2xl font-bold text-foreground">{kpis.pendentes}</p>
                </div>
                <div className="p-2 rounded-lg bg-muted">
                  <AlertTriangle className="w-5 h-5 text-muted-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Rejeitados</p>
                  <p className="text-2xl font-bold text-foreground">{kpis.rejeitados}</p>
                </div>
                <div className="p-2 rounded-lg bg-destructive/10">
                  <XCircle className="w-5 h-5 text-destructive" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Alerta de Governanca */}
        {kpis.pendentes > 10 && (
          <Card className="border-l-4 border-l-destructive bg-destructive/5">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-destructive" />
                <div>
                  <p className="font-medium text-foreground">Documentos pendentes acima do limite</p>
                  <p className="text-sm text-muted-foreground">
                    {kpis.pendentes} documentos aguardando aprovacao. Risco de atraso na liberacao de frentes.
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

              <Select value={filtroTipo} onValueChange={setFiltroTipo}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os tipos</SelectItem>
                  <SelectItem value="Projeto">Projeto</SelectItem>
                  <SelectItem value="Especificacao">Especificacao</SelectItem>
                  <SelectItem value="As-Built">As-Built</SelectItem>
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

              <Select value={filtroStatus} onValueChange={setFiltroStatus}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="Aprovado">Aprovado</SelectItem>
                  <SelectItem value="Em Analise">Em Analise</SelectItem>
                  <SelectItem value="Pendente">Pendente</SelectItem>
                  <SelectItem value="Rejeitado">Rejeitado</SelectItem>
                </SelectContent>
              </Select>

              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por titulo ou codigo..."
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabela de Documentos */}
        <Card className="bg-card border">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <FileText className="w-4 h-4 text-primary" />
              Lista de Documentos
              <Badge variant="secondary" className="ml-2">
                {documentosFiltrados.length}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr className="text-left text-xs text-muted-foreground">
                    <th className="p-3 font-medium">Codigo</th>
                    <th className="p-3 font-medium">Titulo</th>
                    <th className="p-3 font-medium">Tipo</th>
                    <th className="p-3 font-medium">Disciplina</th>
                    <th className="p-3 font-medium">Revisao</th>
                    <th className="p-3 font-medium">Status</th>
                    <th className="p-3 font-medium">Responsavel</th>
                    <th className="p-3 font-medium">Data</th>
                    <th className="p-3 font-medium">Acoes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {documentosFiltrados.map((doc) => (
                    <tr
                      key={doc.id}
                      className="hover:bg-muted/30 cursor-pointer transition-colors"
                      onClick={() => abrirDetalhe(doc)}
                    >
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          {getFormatoIcon(doc.formato)}
                          <span className="font-mono text-sm text-foreground">{doc.codigo}</span>
                        </div>
                      </td>
                      <td className="p-3">
                        <span className="text-sm text-foreground">{doc.titulo}</span>
                      </td>
                      <td className="p-3">
                        <Badge variant="outline" className="text-xs">
                          {doc.tipo}
                        </Badge>
                      </td>
                      <td className="p-3">
                        <span className="text-sm text-muted-foreground">{doc.disciplina}</span>
                      </td>
                      <td className="p-3">
                        <Badge variant="secondary" className="text-xs font-mono">
                          {doc.revisao}
                        </Badge>
                      </td>
                      <td className="p-3">
                        <Badge className={`text-xs ${getStatusColor(doc.status)}`}>
                          <span className="flex items-center gap-1">
                            {getStatusIcon(doc.status)}
                            {doc.status}
                          </span>
                        </Badge>
                      </td>
                      <td className="p-3">
                        <span className="text-sm text-muted-foreground">{doc.responsavel}</span>
                      </td>
                      <td className="p-3">
                        <span className="text-sm text-muted-foreground">{doc.dataEmissao}</span>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={(e) => e.stopPropagation()}>
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={(e) => e.stopPropagation()}>
                            <Download className="w-4 h-4" />
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
                <FileText className="w-5 h-5 text-primary" />
                Detalhe do Documento
              </SheetTitle>
            </SheetHeader>

            {documentoSelecionado && (
              <div className="mt-6 space-y-6">
                {/* Info Principal */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="font-mono">
                      {documentoSelecionado.codigo}
                    </Badge>
                    <Badge className={getStatusColor(documentoSelecionado.status)}>
                      {getStatusIcon(documentoSelecionado.status)}
                      <span className="ml-1">{documentoSelecionado.status}</span>
                    </Badge>
                  </div>

                  <h3 className="text-lg font-semibold text-foreground">{documentoSelecionado.titulo}</h3>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Tag className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Tipo:</span>
                      <span className="text-foreground">{documentoSelecionado.tipo}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Layers className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Disciplina:</span>
                      <span className="text-foreground">{documentoSelecionado.disciplina}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <User className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Responsavel:</span>
                      <span className="text-foreground">{documentoSelecionado.responsavel}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Emissao:</span>
                      <span className="text-foreground">{documentoSelecionado.dataEmissao}</span>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Arquivo */}
                <div className="space-y-3">
                  <h4 className="font-medium text-foreground flex items-center gap-2">
                    <File className="w-4 h-4 text-primary" />
                    Arquivo
                  </h4>
                  <Card className="bg-muted/30">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {getFormatoIcon(documentoSelecionado.formato)}
                          <div>
                            <p className="text-sm font-medium text-foreground">
                              {documentoSelecionado.codigo}.{documentoSelecionado.formato.toLowerCase()}
                            </p>
                            <p className="text-xs text-muted-foreground">{documentoSelecionado.tamanho}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 mr-1" />
                            Ver
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="w-4 h-4 mr-1" />
                            Baixar
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Separator />

                {/* Historico de Revisoes */}
                <div className="space-y-3">
                  <h4 className="font-medium text-foreground flex items-center gap-2">
                    <History className="w-4 h-4 text-primary" />
                    Historico de Revisoes
                  </h4>
                  <div className="space-y-2">
                    {historicoRevisoes.map((rev, index) => (
                      <Card key={index} className={index === 0 ? "border-primary/50 bg-primary/5" : "bg-muted/30"}>
                        <CardContent className="p-3">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-2">
                              <Badge variant={index === 0 ? "default" : "secondary"} className="text-xs font-mono">
                                {rev.revisao}
                              </Badge>
                              {index === 0 && <Badge className="text-xs bg-primary/10 text-primary">Atual</Badge>}
                            </div>
                            <span className="text-xs text-muted-foreground">{rev.data}</span>
                          </div>
                          <p className="text-sm text-foreground mt-2">{rev.motivo}</p>
                          <p className="text-xs text-muted-foreground mt-1">Por: {rev.autor}</p>
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
                  <Button variant="outline" className="flex-1 bg-transparent">
                    <Upload className="w-4 h-4 mr-2" />
                    Nova Revisao
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

export default function DocumentosTecnicosPage() {
  return (
    <Suspense fallback={null}>
      <DocumentosContent />
    </Suspense>
  )
}
