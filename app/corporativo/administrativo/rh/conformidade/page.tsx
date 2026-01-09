"use client"

import { useState, Suspense } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { RHNav } from "@/components/rh/rh-nav"
import { Download, CheckCircle2, Scale, Search, AlertTriangle, Eye, ChevronRight, Lock } from "lucide-react"

// ============================================
// DADOS MOCKADOS - CONFORMIDADE CORPORATIVO
// ============================================

const conformidadeMock = [
  {
    id: 1,
    colaborador: "Ana Paula Ribeiro",
    matricula: "CLT-C001",
    tipo: "Documento",
    item: "RG",
    obrigatorio: true,
    validade: null,
    status: "valido",
    impacto: null,
    riscoJuridico: false,
  },
  {
    id: 2,
    colaborador: "Ricardo Mendes",
    matricula: "CLT-C002",
    tipo: "ASO",
    item: "Periodico",
    obrigatorio: true,
    validade: "2026-08-15",
    status: "valido",
    impacto: null,
    riscoJuridico: false,
  },
  {
    id: 3,
    colaborador: "Fernanda Costa",
    matricula: "CLT-C003",
    tipo: "ASO",
    item: "Periodico",
    obrigatorio: true,
    validade: "2026-01-10",
    status: "vencendo",
    impacto: "bloqueio_efetivacao",
    riscoJuridico: true,
  },
  {
    id: 4,
    colaborador: "Fernanda Costa",
    matricula: "CLT-C003",
    tipo: "Documento",
    item: "Comprovante Endereco",
    obrigatorio: true,
    validade: null,
    status: "pendente",
    impacto: "bloqueio_efetivacao",
    riscoJuridico: false,
  },
]

function ConformidadeContent() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filtroTipo, setFiltroTipo] = useState("todos")
  const [filtroStatus, setFiltroStatus] = useState("todos")
  const [selectedItem, setSelectedItem] = useState<any>(null)

  const conformidadeFiltrada = conformidadeMock.filter((c) => {
    const matchSearch =
      c.colaborador.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.matricula.toLowerCase().includes(searchTerm.toLowerCase())
    const matchTipo = filtroTipo === "todos" || c.tipo === filtroTipo
    const matchStatus = filtroStatus === "todos" || c.status === filtroStatus
    return matchSearch && matchTipo && matchStatus
  })

  const totalValidos = conformidadeMock.filter((c) => c.status === "valido").length
  const totalPendentes = conformidadeMock.filter((c) => c.status === "pendente" || c.status === "vencendo").length
  const totalRisco = conformidadeMock.filter((c) => c.riscoJuridico).length

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "valido":
        return <Badge className="bg-green-100 text-green-800">Valido</Badge>
      case "vencendo":
        return <Badge className="bg-amber-100 text-amber-800">Vencendo</Badge>
      case "pendente":
        return <Badge className="bg-red-100 text-red-800">Pendente</Badge>
      case "vencido":
        return <Badge variant="destructive">Vencido</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Em Conformidade</p>
                <p className="text-2xl font-bold text-green-600">{totalValidos}</p>
              </div>
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pendencias</p>
                <p className="text-2xl font-bold text-amber-600">{totalPendentes}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-amber-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Risco Juridico</p>
                <p className="text-2xl font-bold text-red-600">{totalRisco}</p>
              </div>
              <Scale className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Bloqueios Ativos</p>
                <p className="text-2xl font-bold text-red-600">{conformidadeMock.filter((c) => c.impacto).length}</p>
              </div>
              <Lock className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <div className="flex gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar colaborador..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={filtroTipo} onValueChange={setFiltroTipo}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos</SelectItem>
            <SelectItem value="Documento">Documento</SelectItem>
            <SelectItem value="ASO">ASO</SelectItem>
            <SelectItem value="NR">NR</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filtroStatus} onValueChange={setFiltroStatus}>
          <SelectTrigger className="w-[150px]">
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
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Exportar
        </Button>
      </div>

      {/* Tabela */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Colaborador</TableHead>
                <TableHead>Matricula</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Item</TableHead>
                <TableHead>Validade</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Impacto</TableHead>
                <TableHead className="text-right">Acoes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {conformidadeFiltrada.map((item) => (
                <TableRow key={item.id} className={item.riscoJuridico ? "bg-red-50" : ""}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {item.colaborador}
                      {item.riscoJuridico && (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <Scale className="h-4 w-4 text-red-500" />
                            </TooltipTrigger>
                            <TooltipContent>Risco juridico</TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-sm">{item.matricula}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{item.tipo}</Badge>
                  </TableCell>
                  <TableCell>{item.item}</TableCell>
                  <TableCell>{item.validade || "-"}</TableCell>
                  <TableCell>{getStatusBadge(item.status)}</TableCell>
                  <TableCell>
                    {item.impacto ? (
                      <Badge variant="destructive" className="text-xs">
                        {item.impacto.replace(/_/g, " ")}
                      </Badge>
                    ) : (
                      "-"
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => setSelectedItem(item)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Sheet Detalhe */}
      <Sheet open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Detalhe de Conformidade</SheetTitle>
            <SheetDescription>
              {selectedItem?.colaborador} - {selectedItem?.item}
            </SheetDescription>
          </SheetHeader>
          {selectedItem && (
            <div className="mt-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Tipo</p>
                  <p className="font-medium">{selectedItem.tipo}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  {getStatusBadge(selectedItem.status)}
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Validade</p>
                  <p className="font-medium">{selectedItem.validade || "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Obrigatorio</p>
                  <p className="font-medium">{selectedItem.obrigatorio ? "Sim" : "Nao"}</p>
                </div>
              </div>
              {selectedItem.impacto && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-600" />
                    <span className="text-sm font-medium text-red-800">
                      Impacto: {selectedItem.impacto.replace(/_/g, " ")}
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default function ConformidadeCorporativoPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <RHNav modulo="corporativo" />
      <main className="flex-1 container py-6">
        <div className="mb-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <Link href="/corporativo" className="hover:text-foreground">
              Corporativo
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/corporativo/administrativo" className="hover:text-foreground">
              Administrativo
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/corporativo/administrativo/rh" className="hover:text-foreground">
              RH
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">Conformidade</span>
          </div>
          <h1 className="text-2xl font-bold">Conformidade - Corporativo</h1>
          <p className="text-muted-foreground">Documentos, ASOs e treinamentos do escritorio central</p>
        </div>
        <Suspense fallback={<div>Carregando...</div>}>
          <ConformidadeContent />
        </Suspense>
      </main>
    </div>
  )
}
