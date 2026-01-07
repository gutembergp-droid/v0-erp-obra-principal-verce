"use client"

import { useState, Suspense } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  ArrowLeft,
  Search,
  Eye,
  Printer,
  FileText,
  Calendar,
  CheckCircle,
  Clock,
  TrendingUp,
  Filter,
} from "lucide-react"
import Link from "next/link"

// Mock de historico de fechamentos
const historicoFechamentos = [
  {
    id: "RGM-2025-12",
    competencia: "Dezembro/2025",
    status: "consolidado" as const,
    dataFechamento: "05/01/2026",
    resultado: 816590,
    margem: 6.52,
    fcd: 1.18,
    crco: 0.98,
    gerente: "Carlos Silva",
  },
  {
    id: "RGM-2025-11",
    competencia: "Novembro/2025",
    status: "consolidado" as const,
    dataFechamento: "03/12/2025",
    resultado: 920340,
    margem: 7.1,
    fcd: 1.22,
    crco: 0.95,
    gerente: "Carlos Silva",
  },
  {
    id: "RGM-2025-10",
    competencia: "Outubro/2025",
    status: "consolidado" as const,
    dataFechamento: "04/11/2025",
    resultado: 780120,
    margem: 5.98,
    fcd: 1.15,
    crco: 1.02,
    gerente: "Carlos Silva",
  },
  {
    id: "RGM-2025-09",
    competencia: "Setembro/2025",
    status: "consolidado" as const,
    dataFechamento: "02/10/2025",
    resultado: 650000,
    margem: 5.2,
    fcd: 1.08,
    crco: 1.05,
    gerente: "Carlos Silva",
  },
  {
    id: "RGM-2025-08",
    competencia: "Agosto/2025",
    status: "consolidado" as const,
    dataFechamento: "03/09/2025",
    resultado: 890450,
    margem: 6.8,
    fcd: 1.2,
    crco: 0.97,
    gerente: "Carlos Silva",
  },
  {
    id: "RGM-2025-07",
    competencia: "Julho/2025",
    status: "consolidado" as const,
    dataFechamento: "04/08/2025",
    resultado: 720300,
    margem: 5.6,
    fcd: 1.12,
    crco: 1.01,
    gerente: "Carlos Silva",
  },
  {
    id: "PRV-2025-06",
    competencia: "Junho/2025",
    status: "previa" as const,
    dataFechamento: "-",
    resultado: 580000,
    margem: 4.5,
    fcd: 1.05,
    crco: 1.08,
    gerente: "Carlos Silva",
  },
]

function formatCurrency(value: number): string {
  if (value === undefined || value === null) return "R$ 0"
  if (Math.abs(value) >= 1000000) {
    return `R$ ${(value / 1000000).toFixed(2).replace(".", ",")} Mi`
  }
  if (Math.abs(value) >= 1000) {
    return `R$ ${(value / 1000).toFixed(0)} mil`
  }
  return `R$ ${value.toLocaleString("pt-BR")}`
}

function RepositorioContent() {
  const [filtroAno, setFiltroAno] = useState("2025")
  const [filtroStatus, setFiltroStatus] = useState("todos")
  const [busca, setBusca] = useState("")
  const [selectedFechamento, setSelectedFechamento] = useState<(typeof historicoFechamentos)[0] | null>(null)
  const [showPreview, setShowPreview] = useState(false)

  // Filtrar fechamentos
  const fechamentosFiltrados = historicoFechamentos.filter((f) => {
    const matchAno = filtroAno === "todos" || f.competencia.includes(filtroAno)
    const matchStatus = filtroStatus === "todos" || f.status === filtroStatus
    const matchBusca =
      busca === "" ||
      f.competencia.toLowerCase().includes(busca.toLowerCase()) ||
      f.id.toLowerCase().includes(busca.toLowerCase())
    return matchAno && matchStatus && matchBusca
  })

  // Estatisticas
  const totalConsolidados = historicoFechamentos.filter((f) => f.status === "consolidado").length
  const totalPrevias = historicoFechamentos.filter((f) => f.status === "previa").length
  const mediaMargemConsolidados =
    historicoFechamentos.filter((f) => f.status === "consolidado").reduce((acc, f) => acc + f.margem, 0) /
      totalConsolidados || 0

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/obra/gerencial/encerramento">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <div>
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-600" />
                  <h1 className="text-lg font-bold">REPOSITORIO DE FECHAMENTOS</h1>
                </div>
                <p className="text-sm text-gray-500">Contrato: BR-101 LOTE 2</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Cards de Resumo */}
        <div className="grid grid-cols-4 gap-3">
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{totalConsolidados}</p>
                <p className="text-xs text-gray-500">Consolidados</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                <Clock className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{totalPrevias}</p>
                <p className="text-xs text-gray-500">Previas</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{mediaMargemConsolidados.toFixed(1)}%</p>
                <p className="text-xs text-gray-500">Margem Media</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                <Calendar className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{historicoFechamentos.length}</p>
                <p className="text-xs text-gray-500">Total Periodos</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Filtros */}
        <Card className="p-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium">Filtros:</span>
            </div>
            <Select value={filtroAno} onValueChange={setFiltroAno}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Ano" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os Anos</SelectItem>
                <SelectItem value="2025">2025</SelectItem>
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2023">2023</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filtroStatus} onValueChange={setFiltroStatus}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="consolidado">Consolidados</SelectItem>
                <SelectItem value="previa">Previas</SelectItem>
              </SelectContent>
            </Select>
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar por competencia ou numero..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
        </Card>

        {/* Tabela de Fechamentos */}
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-32">Numero</TableHead>
                <TableHead>Competencia</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-center">Data Fechamento</TableHead>
                <TableHead className="text-right">Resultado</TableHead>
                <TableHead className="text-center">Margem</TableHead>
                <TableHead className="text-center">F/CD</TableHead>
                <TableHead className="text-center">CR/CO</TableHead>
                <TableHead className="text-right">Acoes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {fechamentosFiltrados.map((fechamento) => (
                <TableRow key={fechamento.id} className="hover:bg-gray-50">
                  <TableCell className="font-mono font-semibold text-sm">{fechamento.id}</TableCell>
                  <TableCell className="font-medium">{fechamento.competencia}</TableCell>
                  <TableCell className="text-center">
                    {fechamento.status === "consolidado" ? (
                      <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Consolidado
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="border-amber-300 text-amber-700">
                        <Clock className="h-3 w-3 mr-1" />
                        Previa
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-center text-sm text-gray-600">{fechamento.dataFechamento}</TableCell>
                  <TableCell className="text-right font-semibold text-emerald-600">
                    {formatCurrency(fechamento.resultado)}
                  </TableCell>
                  <TableCell className="text-center">
                    <span
                      className={`font-semibold ${fechamento.margem >= 6 ? "text-emerald-600" : fechamento.margem >= 5 ? "text-amber-600" : "text-red-600"}`}
                    >
                      {fechamento.margem.toFixed(2)}%
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    <span className={`font-semibold ${fechamento.fcd >= 1 ? "text-emerald-600" : "text-red-600"}`}>
                      {fechamento.fcd.toFixed(2)}
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    <span className={`font-semibold ${fechamento.crco <= 1 ? "text-emerald-600" : "text-red-600"}`}>
                      {fechamento.crco.toFixed(2)}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedFechamento(fechamento)
                          setShowPreview(true)
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Printer className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>

        {/* Dialog de Visualizacao */}
        <Dialog open={showPreview} onOpenChange={setShowPreview}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Relatorio Gerencial - {selectedFechamento?.competencia}
              </DialogTitle>
            </DialogHeader>
            {selectedFechamento && (
              <div className="space-y-4">
                {/* Status Badge */}
                <div
                  className={`p-3 rounded-lg text-center ${selectedFechamento.status === "consolidado" ? "bg-emerald-600" : "bg-amber-500"}`}
                >
                  <p className="text-white font-bold tracking-widest">
                    {selectedFechamento.status === "consolidado" ? "OFICIAL - CONSOLIDADO" : "PREVIA - NAO CONSOLIDADO"}
                  </p>
                </div>

                {/* Cabecalho */}
                <div className="flex justify-between items-start border-b pb-4">
                  <div>
                    <h2 className="text-xl font-bold">RELATORIO GERENCIAL MENSAL</h2>
                    <p className="text-gray-600">Contrato: BR-101 LOTE 2</p>
                    <p className="text-gray-600">
                      Competencia: <span className="font-semibold">{selectedFechamento.competencia}</span>
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono font-bold text-lg">{selectedFechamento.id}</p>
                    <p className="text-sm text-gray-500">Fechamento: {selectedFechamento.dataFechamento}</p>
                    <p className="text-sm text-gray-500">Gerente: {selectedFechamento.gerente}</p>
                  </div>
                </div>

                {/* KPIs Resumo */}
                <div className="grid grid-cols-4 gap-3">
                  <Card className="p-4 text-center bg-emerald-50">
                    <p className="text-sm text-gray-600">Resultado</p>
                    <p className="text-xl font-bold text-emerald-600">{formatCurrency(selectedFechamento.resultado)}</p>
                  </Card>
                  <Card className="p-4 text-center">
                    <p className="text-sm text-gray-600">Margem</p>
                    <p className="text-xl font-bold">{selectedFechamento.margem.toFixed(2)}%</p>
                  </Card>
                  <Card className="p-4 text-center">
                    <p className="text-sm text-gray-600">F/CD</p>
                    <p
                      className={`text-xl font-bold ${selectedFechamento.fcd >= 1 ? "text-emerald-600" : "text-red-600"}`}
                    >
                      {selectedFechamento.fcd.toFixed(2)}
                    </p>
                  </Card>
                  <Card className="p-4 text-center">
                    <p className="text-sm text-gray-600">CR/CO</p>
                    <p
                      className={`text-xl font-bold ${selectedFechamento.crco <= 1 ? "text-emerald-600" : "text-red-600"}`}
                    >
                      {selectedFechamento.crco.toFixed(2)}
                    </p>
                  </Card>
                </div>

                {/* Acoes */}
                <div className="flex justify-end gap-2 pt-4 border-t">
                  <Button variant="outline" onClick={() => window.print()}>
                    <Printer className="h-4 w-4 mr-2" />
                    Imprimir
                  </Button>
                  <Button variant="default">
                    <FileText className="h-4 w-4 mr-2" />
                    Ver Relatorio Completo
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

export default function RepositorioFechamentosPage() {
  return (
    <Suspense fallback={null}>
      <RepositorioContent />
    </Suspense>
  )
}
