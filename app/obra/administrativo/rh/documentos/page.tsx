"use client"

import { Suspense, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { RHNav } from "@/components/rh/rh-nav"
import {
  FileText,
  Search,
  Filter,
  Upload,
  Download,
  AlertTriangle,
  CheckCircle2,
  Clock,
  XCircle,
  Eye,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  FileWarning,
  Send,
} from "lucide-react"

// Dados mockados
const documentosMock = [
  {
    id: "DOC-001",
    colaborador: "Carlos Silva",
    matricula: "1001",
    tipo: "RG",
    status: "valido",
    dataEntrega: "2024-01-15",
    dataVencimento: null,
    arquivo: true,
  },
  {
    id: "DOC-002",
    colaborador: "Carlos Silva",
    matricula: "1001",
    tipo: "CPF",
    status: "valido",
    dataEntrega: "2024-01-15",
    dataVencimento: null,
    arquivo: true,
  },
  {
    id: "DOC-003",
    colaborador: "Carlos Silva",
    matricula: "1001",
    tipo: "CTPS",
    status: "valido",
    dataEntrega: "2024-01-15",
    dataVencimento: null,
    arquivo: true,
  },
  {
    id: "DOC-004",
    colaborador: "Maria Santos",
    matricula: "1002",
    tipo: "RG",
    status: "valido",
    dataEntrega: "2024-02-10",
    dataVencimento: null,
    arquivo: true,
  },
  {
    id: "DOC-005",
    colaborador: "Maria Santos",
    matricula: "1002",
    tipo: "CNH",
    status: "vencendo",
    dataEntrega: "2024-02-10",
    dataVencimento: "2026-02-15",
    arquivo: true,
  },
  {
    id: "DOC-006",
    colaborador: "Jose Oliveira",
    matricula: "1003",
    tipo: "RG",
    status: "pendente",
    dataEntrega: null,
    dataVencimento: null,
    arquivo: false,
  },
  {
    id: "DOC-007",
    colaborador: "Jose Oliveira",
    matricula: "1003",
    tipo: "Certidao Nascimento",
    status: "pendente",
    dataEntrega: null,
    dataVencimento: null,
    arquivo: false,
  },
  {
    id: "DOC-008",
    colaborador: "Ana Costa",
    matricula: "1004",
    tipo: "CNH",
    status: "vencido",
    dataEntrega: "2023-06-20",
    dataVencimento: "2025-12-01",
    arquivo: true,
  },
  {
    id: "DOC-009",
    colaborador: "Pedro Lima",
    matricula: "1005",
    tipo: "Comprovante Residencia",
    status: "vencendo",
    dataEntrega: "2025-07-01",
    dataVencimento: "2026-01-15",
    arquivo: true,
  },
  {
    id: "DOC-010",
    colaborador: "Fernanda Souza",
    matricula: "1006",
    tipo: "Titulo Eleitor",
    status: "valido",
    dataEntrega: "2024-03-05",
    dataVencimento: null,
    arquivo: true,
  },
]

const tiposDocumento = [
  { tipo: "RG", obrigatorio: true, vencimento: false },
  { tipo: "CPF", obrigatorio: true, vencimento: false },
  { tipo: "CTPS", obrigatorio: true, vencimento: false },
  { tipo: "CNH", obrigatorio: false, vencimento: true },
  { tipo: "Titulo Eleitor", obrigatorio: true, vencimento: false },
  { tipo: "Certidao Nascimento", obrigatorio: true, vencimento: false },
  { tipo: "Certidao Casamento", obrigatorio: false, vencimento: false },
  { tipo: "Comprovante Residencia", obrigatorio: true, vencimento: true },
  { tipo: "Reservista", obrigatorio: false, vencimento: false },
  { tipo: "PIS/PASEP", obrigatorio: true, vencimento: false },
]

function DocumentosContent() {
  const [filtrosAbertos, setFiltrosAbertos] = useState(false)
  const [busca, setBusca] = useState("")
  const [filtroStatus, setFiltroStatus] = useState("todos")
  const [filtroTipo, setFiltroTipo] = useState("todos")
  const [documentoSelecionado, setDocumentoSelecionado] = useState<(typeof documentosMock)[0] | null>(null)
  const [sheetAberto, setSheetAberto] = useState(false)

  // Contadores
  const totalDocs = documentosMock.length
  const validos = documentosMock.filter((d) => d.status === "valido").length
  const pendentes = documentosMock.filter((d) => d.status === "pendente").length
  const vencendo = documentosMock.filter((d) => d.status === "vencendo").length
  const vencidos = documentosMock.filter((d) => d.status === "vencido").length
  const conformidade = Math.round((validos / totalDocs) * 100)

  // Filtros
  const documentosFiltrados = documentosMock.filter((doc) => {
    const matchBusca =
      doc.colaborador.toLowerCase().includes(busca.toLowerCase()) ||
      doc.matricula.includes(busca) ||
      doc.tipo.toLowerCase().includes(busca.toLowerCase())
    const matchStatus = filtroStatus === "todos" || doc.status === filtroStatus
    const matchTipo = filtroTipo === "todos" || doc.tipo === filtroTipo
    return matchBusca && matchStatus && matchTipo
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "valido":
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Válido</Badge>
      case "pendente":
        return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Pendente</Badge>
      case "vencendo":
        return <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">Vencendo</Badge>
      case "vencido":
        return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Vencido</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* RHNav */}
      <RHNav />

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <span>Obra</span> / <span>Administrativo</span> / <span>RH</span> /{" "}
            <span className="text-foreground">Documentos</span>
          </div>
          <h1 className="text-2xl font-bold flex items-center gap-3">
            <FileText className="h-6 w-6" />
            Central de Documentos
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
          <Button variant="outline" size="sm">
            <Send className="h-4 w-4 mr-2" />
            Solicitar em Lote
          </Button>
          <Button size="sm">
            <Upload className="h-4 w-4 mr-2" />
            Upload
          </Button>
        </div>
      </div>

      {/* Cards Indicadores */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card
          className="cursor-pointer hover:border-primary/50 transition-colors"
          onClick={() => setFiltroStatus("todos")}
        >
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <FileText className="h-4 w-4" />
              <span className="text-xs">Total</span>
            </div>
            <p className="text-2xl font-bold">{totalDocs}</p>
            <p className="text-xs text-muted-foreground">documentos</p>
          </CardContent>
        </Card>
        <Card
          className="cursor-pointer hover:border-green-500/50 transition-colors"
          onClick={() => setFiltroStatus("valido")}
        >
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-green-400 mb-1">
              <CheckCircle2 className="h-4 w-4" />
              <span className="text-xs">Válidos</span>
            </div>
            <p className="text-2xl font-bold text-green-400">{validos}</p>
            <p className="text-xs text-muted-foreground">em dia</p>
          </CardContent>
        </Card>
        <Card
          className="cursor-pointer hover:border-yellow-500/50 transition-colors"
          onClick={() => setFiltroStatus("pendente")}
        >
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-yellow-400 mb-1">
              <Clock className="h-4 w-4" />
              <span className="text-xs">Pendentes</span>
            </div>
            <p className="text-2xl font-bold text-yellow-400">{pendentes}</p>
            <p className="text-xs text-muted-foreground">aguardando</p>
          </CardContent>
        </Card>
        <Card
          className="cursor-pointer hover:border-orange-500/50 transition-colors"
          onClick={() => setFiltroStatus("vencendo")}
        >
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-orange-400 mb-1">
              <AlertTriangle className="h-4 w-4" />
              <span className="text-xs">Vencendo</span>
            </div>
            <p className="text-2xl font-bold text-orange-400">{vencendo}</p>
            <p className="text-xs text-muted-foreground">próx. 30 dias</p>
          </CardContent>
        </Card>
        <Card
          className="cursor-pointer hover:border-red-500/50 transition-colors"
          onClick={() => setFiltroStatus("vencido")}
        >
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-red-400 mb-1">
              <XCircle className="h-4 w-4" />
              <span className="text-xs">Vencidos</span>
            </div>
            <p className="text-2xl font-bold text-red-400">{vencidos}</p>
            <p className="text-xs text-muted-foreground">irregulares</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <FileWarning className="h-4 w-4" />
              <span className="text-xs">Conformidade</span>
            </div>
            <p className="text-2xl font-bold">{conformidade}%</p>
            <Progress value={conformidade} className="h-1 mt-1" />
          </CardContent>
        </Card>
      </div>

      {/* Barra de Busca e Filtros */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por colaborador, matrícula ou tipo de documento..."
                className="pl-10"
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
              />
            </div>
            <Button variant="outline" onClick={() => setFiltrosAbertos(!filtrosAbertos)} className="gap-2">
              <Filter className="h-4 w-4" />
              Filtros
              {filtrosAbertos ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setBusca("")
                setFiltroStatus("todos")
                setFiltroTipo("todos")
              }}
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>

          {filtrosAbertos && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 pt-4 border-t">
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Status</label>
                <Select value={filtroStatus} onValueChange={setFiltroStatus}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos</SelectItem>
                    <SelectItem value="valido">Válidos</SelectItem>
                    <SelectItem value="pendente">Pendentes</SelectItem>
                    <SelectItem value="vencendo">Vencendo</SelectItem>
                    <SelectItem value="vencido">Vencidos</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Tipo de Documento</label>
                <Select value={filtroTipo} onValueChange={setFiltroTipo}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos</SelectItem>
                    {tiposDocumento.map((t) => (
                      <SelectItem key={t.tipo} value={t.tipo}>
                        {t.tipo}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Tabela de Documentos */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-medium flex items-center justify-between">
            <span>Documentos ({documentosFiltrados.length})</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Colaborador</TableHead>
                <TableHead>Matrícula</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Data Entrega</TableHead>
                <TableHead>Vencimento</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Arquivo</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {documentosFiltrados.map((doc) => (
                <TableRow key={doc.id} className={doc.status === "vencido" ? "bg-red-500/5" : ""}>
                  <TableCell className="font-medium">{doc.colaborador}</TableCell>
                  <TableCell>{doc.matricula}</TableCell>
                  <TableCell>{doc.tipo}</TableCell>
                  <TableCell>{doc.dataEntrega || "-"}</TableCell>
                  <TableCell>{doc.dataVencimento || "-"}</TableCell>
                  <TableCell>{getStatusBadge(doc.status)}</TableCell>
                  <TableCell>
                    {doc.arquivo ? (
                      <CheckCircle2 className="h-4 w-4 text-green-400" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-400" />
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      {doc.arquivo && (
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Eye className="h-4 w-4" />
                        </Button>
                      )}
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Upload className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

export default function DocumentosPage() {
  return (
    <Suspense fallback={null}>
      <DocumentosContent />
    </Suspense>
  )
}
