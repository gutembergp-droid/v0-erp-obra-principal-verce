"use client"

import { Suspense, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { RHNav } from "@/components/rh/rh-nav"
import {
  AlertOctagon,
  Search,
  Download,
  AlertTriangle,
  CheckCircle2,
  Plus,
  Eye,
  RefreshCw,
  FileText,
  Clock,
  XCircle,
  Info,
} from "lucide-react"

// Dados mockados
const ocorrenciasMock = [
  {
    id: "OC-001",
    colaborador: "Carlos Silva",
    matricula: "1001",
    tipo: "Advertencia",
    motivo: "Atraso reiterado",
    data: "2026-01-05",
    registradoPor: "Maria Coord.",
    status: "aplicada",
    observacao: "Terceira ocorrência de atraso no mês",
  },
  {
    id: "OC-002",
    colaborador: "Jose Oliveira",
    matricula: "1003",
    tipo: "Suspensao",
    motivo: "Falta injustificada",
    data: "2026-01-03",
    registradoPor: "Maria Coord.",
    status: "aplicada",
    observacao: "Faltou sem justificativa em dia de produção crítica",
  },
  {
    id: "OC-003",
    colaborador: "Pedro Lima",
    matricula: "1005",
    tipo: "Advertencia",
    motivo: "Uso indevido de EPI",
    data: "2025-12-20",
    registradoPor: "João SSMA",
    status: "aplicada",
    observacao: "Flagrado sem capacete na área de risco",
  },
  {
    id: "OC-004",
    colaborador: "Ana Costa",
    matricula: "1004",
    tipo: "Elogio",
    motivo: "Desempenho excepcional",
    data: "2025-12-15",
    registradoPor: "Carlos Eng.",
    status: "registrada",
    observacao: "Entregou relatório técnico antes do prazo com qualidade exemplar",
  },
  {
    id: "OC-005",
    colaborador: "Fernanda Souza",
    matricula: "1006",
    tipo: "Observacao",
    motivo: "Comportamento inadequado",
    data: "2026-01-07",
    registradoPor: "Maria Coord.",
    status: "pendente",
    observacao: "Discussão com colega de trabalho",
  },
]

const tiposOcorrencia = [
  { tipo: "Advertencia", icone: AlertTriangle, cor: "text-yellow-400", bgCor: "bg-yellow-500/20" },
  { tipo: "Suspensao", icone: XCircle, cor: "text-red-400", bgCor: "bg-red-500/20" },
  { tipo: "Elogio", icone: CheckCircle2, cor: "text-green-400", bgCor: "bg-green-500/20" },
  { tipo: "Observacao", icone: Info, cor: "text-blue-400", bgCor: "bg-blue-500/20" },
]

function OcorrenciasContent() {
  const [busca, setBusca] = useState("")
  const [filtroTipo, setFiltroTipo] = useState("todos")
  const [filtroStatus, setFiltroStatus] = useState("todos")
  const [dialogNova, setDialogNova] = useState(false)

  // Contadores
  const total = ocorrenciasMock.length
  const advertencias = ocorrenciasMock.filter((o) => o.tipo === "Advertencia").length
  const suspensoes = ocorrenciasMock.filter((o) => o.tipo === "Suspensao").length
  const elogios = ocorrenciasMock.filter((o) => o.tipo === "Elogio").length
  const pendentes = ocorrenciasMock.filter((o) => o.status === "pendente").length

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "aplicada":
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Aplicada</Badge>
      case "pendente":
        return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Pendente</Badge>
      case "registrada":
        return <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">Registrada</Badge>
      case "cancelada":
        return <Badge className="bg-gray-500/20 text-gray-400 border-gray-500/30">Cancelada</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getTipoBadge = (tipo: string) => {
    const config = tiposOcorrencia.find((t) => t.tipo === tipo)
    if (!config) return <Badge variant="outline">{tipo}</Badge>
    const Icon = config.icone
    return (
      <Badge className={`${config.bgCor} ${config.cor} border-0 gap-1`}>
        <Icon className="h-3 w-3" />
        {tipo}
      </Badge>
    )
  }

  const ocorrenciasFiltradas = ocorrenciasMock.filter((o) => {
    const matchBusca = o.colaborador.toLowerCase().includes(busca.toLowerCase()) || o.matricula.includes(busca)
    const matchTipo = filtroTipo === "todos" || o.tipo === filtroTipo
    const matchStatus = filtroStatus === "todos" || o.status === filtroStatus
    return matchBusca && matchTipo && matchStatus
  })

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Navigation */}
      <RHNav />

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <span>Obra</span> / <span>Administrativo</span> / <span>RH</span> /{" "}
            <span className="text-foreground">Ocorrências</span>
          </div>
          <h1 className="text-2xl font-bold flex items-center gap-3">
            <AlertOctagon className="h-6 w-6" />
            Registro de Ocorrências
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
          <Button size="sm" onClick={() => setDialogNova(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Nova Ocorrência
          </Button>
        </div>
      </div>

      {/* Cards Indicadores */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card className="cursor-pointer hover:border-primary/50" onClick={() => setFiltroTipo("todos")}>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <FileText className="h-4 w-4" />
              <span className="text-xs">Total</span>
            </div>
            <p className="text-2xl font-bold">{total}</p>
            <p className="text-xs text-muted-foreground">registros</p>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:border-yellow-500/50" onClick={() => setFiltroTipo("Advertencia")}>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-yellow-400 mb-1">
              <AlertTriangle className="h-4 w-4" />
              <span className="text-xs">Advertências</span>
            </div>
            <p className="text-2xl font-bold text-yellow-400">{advertencias}</p>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:border-red-500/50" onClick={() => setFiltroTipo("Suspensao")}>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-red-400 mb-1">
              <XCircle className="h-4 w-4" />
              <span className="text-xs">Suspensões</span>
            </div>
            <p className="text-2xl font-bold text-red-400">{suspensoes}</p>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:border-green-500/50" onClick={() => setFiltroTipo("Elogio")}>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-green-400 mb-1">
              <CheckCircle2 className="h-4 w-4" />
              <span className="text-xs">Elogios</span>
            </div>
            <p className="text-2xl font-bold text-green-400">{elogios}</p>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:border-orange-500/50" onClick={() => setFiltroStatus("pendente")}>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-orange-400 mb-1">
              <Clock className="h-4 w-4" />
              <span className="text-xs">Pendentes</span>
            </div>
            <p className="text-2xl font-bold text-orange-400">{pendentes}</p>
          </CardContent>
        </Card>
      </div>

      {/* Busca e Filtros */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por colaborador ou matrícula..."
                className="pl-10"
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
              />
            </div>
            <Select value={filtroTipo} onValueChange={setFiltroTipo}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                {tiposOcorrencia.map((t) => (
                  <SelectItem key={t.tipo} value={t.tipo}>
                    {t.tipo}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filtroStatus} onValueChange={setFiltroStatus}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="aplicada">Aplicada</SelectItem>
                <SelectItem value="pendente">Pendente</SelectItem>
                <SelectItem value="registrada">Registrada</SelectItem>
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
        </CardContent>
      </Card>

      {/* Tabela de Ocorrências */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-medium">Ocorrências ({ocorrenciasFiltradas.length})</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Colaborador</TableHead>
                <TableHead>Matrícula</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Motivo</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Registrado Por</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ocorrenciasFiltradas.map((o) => (
                <TableRow key={o.id}>
                  <TableCell className="font-mono text-xs">{o.id}</TableCell>
                  <TableCell className="font-medium">{o.colaborador}</TableCell>
                  <TableCell>{o.matricula}</TableCell>
                  <TableCell>{getTipoBadge(o.tipo)}</TableCell>
                  <TableCell className="max-w-[200px] truncate">{o.motivo}</TableCell>
                  <TableCell>{o.data}</TableCell>
                  <TableCell>{o.registradoPor}</TableCell>
                  <TableCell>{getStatusBadge(o.status)}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Dialog Nova Ocorrência */}
      <Dialog open={dialogNova} onOpenChange={setDialogNova}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Nova Ocorrência</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground">Colaborador</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o colaborador" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1001">Carlos Silva - 1001</SelectItem>
                  <SelectItem value="1002">Maria Santos - 1002</SelectItem>
                  <SelectItem value="1003">Jose Oliveira - 1003</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Tipo</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  {tiposOcorrencia.map((t) => (
                    <SelectItem key={t.tipo} value={t.tipo}>
                      {t.tipo}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Motivo</label>
              <Input placeholder="Descreva o motivo da ocorrência" />
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Observações</label>
              <Textarea placeholder="Detalhes adicionais..." rows={3} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogNova(false)}>
              Cancelar
            </Button>
            <Button onClick={() => setDialogNova(false)}>Registrar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default function OcorrenciasPage() {
  return (
    <Suspense fallback={null}>
      <OcorrenciasContent />
    </Suspense>
  )
}
