"use client"

import { Suspense, useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { RHNav } from "@/components/rh/rh-nav"
import { Clock, Search, Download, AlertTriangle, Eye, Scale, ChevronRight, Timer, Wallet } from "lucide-react"

// ============================================
// DADOS MOCKADOS - PONTO CORPORATIVO
// ============================================

const pontoMock = [
  {
    id: 1,
    colaborador: "Ana Paula Ribeiro",
    matricula: "CLT-C001",
    cargo: "Analista de RH",
    setor: "RH",
    jornadaPrevista: "176h",
    horasTrabalhadas: "176h",
    horasExtras: "0h",
    valorHE: 0,
    bancoHoras: "+8h",
    statusLegal: "ok",
    heRecorrente: false,
  },
  {
    id: 2,
    colaborador: "Ricardo Mendes",
    matricula: "CLT-C002",
    cargo: "Gerente Financeiro",
    setor: "Financeiro",
    jornadaPrevista: "176h",
    horasTrabalhadas: "190h",
    horasExtras: "14h",
    valorHE: 1260.0,
    bancoHoras: "+22h",
    statusLegal: "atencao",
    heRecorrente: true,
  },
  {
    id: 3,
    colaborador: "Fernanda Costa",
    matricula: "CLT-C003",
    cargo: "Assistente Administrativo",
    setor: "Administrativo",
    jornadaPrevista: "176h",
    horasTrabalhadas: "176h",
    horasExtras: "0h",
    valorHE: 0,
    bancoHoras: "+4h",
    statusLegal: "ok",
    heRecorrente: false,
  },
  {
    id: 4,
    colaborador: "Patricia Almeida",
    matricula: "CLT-C004",
    cargo: "Diretora Administrativa",
    setor: "Diretoria",
    jornadaPrevista: "176h",
    horasTrabalhadas: "200h",
    horasExtras: "24h",
    valorHE: 4800.0,
    bancoHoras: "+40h",
    statusLegal: "critico",
    heRecorrente: true,
  },
]

function PontoContent() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filtroStatus, setFiltroStatus] = useState("todos")
  const [selectedColaborador, setSelectedColaborador] = useState<any>(null)

  const pontoFiltrado = pontoMock.filter((p) => {
    const matchSearch =
      p.colaborador.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.matricula.toLowerCase().includes(searchTerm.toLowerCase())
    const matchStatus = filtroStatus === "todos" || p.statusLegal === filtroStatus
    return matchSearch && matchStatus
  })

  const totalHE = pontoMock.reduce((acc, p) => acc + Number.parseFloat(p.horasExtras), 0)
  const totalValorHE = pontoMock.reduce((acc, p) => acc + p.valorHE, 0)
  const totalRecorrentes = pontoMock.filter((p) => p.heRecorrente).length
  const totalCriticos = pontoMock.filter((p) => p.statusLegal === "critico").length

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ok":
        return <Badge className="bg-green-100 text-green-800">OK</Badge>
      case "atencao":
        return <Badge className="bg-amber-100 text-amber-800">Atencao</Badge>
      case "critico":
        return <Badge variant="destructive">Critico</Badge>
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
                <p className="text-sm text-muted-foreground">HE no Periodo</p>
                <p className="text-2xl font-bold">{totalHE}h</p>
                <p className="text-xs text-muted-foreground">R$ {totalValorHE.toLocaleString()}</p>
              </div>
              <Clock className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card className={totalRecorrentes > 0 ? "border-amber-200" : ""}>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">HE Recorrente</p>
                <p className="text-2xl font-bold text-amber-600">{totalRecorrentes}</p>
                <p className="text-xs text-muted-foreground">colaboradores</p>
              </div>
              <Timer className="h-8 w-8 text-amber-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Banco de Horas</p>
                <p className="text-2xl font-bold">+74h</p>
                <p className="text-xs text-muted-foreground">saldo total</p>
              </div>
              <Wallet className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card className={totalCriticos > 0 ? "border-red-200" : ""}>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Risco Juridico</p>
                <p className="text-2xl font-bold text-red-600">{totalCriticos}</p>
                <p className="text-xs text-muted-foreground">colaboradores</p>
              </div>
              <Scale className="h-8 w-8 text-red-600" />
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
        <Select value={filtroStatus} onValueChange={setFiltroStatus}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos</SelectItem>
            <SelectItem value="ok">OK</SelectItem>
            <SelectItem value="atencao">Atencao</SelectItem>
            <SelectItem value="critico">Critico</SelectItem>
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
                <TableHead>Cargo</TableHead>
                <TableHead>Jornada</TableHead>
                <TableHead>HE</TableHead>
                <TableHead>Valor HE</TableHead>
                <TableHead>Banco</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Acoes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pontoFiltrado.map((item) => (
                <TableRow key={item.id} className={item.statusLegal === "critico" ? "bg-red-50" : ""}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {item.colaborador}
                      {item.heRecorrente && (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <AlertTriangle className="h-4 w-4 text-amber-500" />
                            </TooltipTrigger>
                            <TooltipContent>HE recorrente - risco juridico</TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-sm">{item.matricula}</TableCell>
                  <TableCell>{item.cargo}</TableCell>
                  <TableCell>{item.horasTrabalhadas}</TableCell>
                  <TableCell>{item.horasExtras}</TableCell>
                  <TableCell>R$ {item.valorHE.toLocaleString()}</TableCell>
                  <TableCell>{item.bancoHoras}</TableCell>
                  <TableCell>{getStatusBadge(item.statusLegal)}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => setSelectedColaborador(item)}>
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
      <Sheet open={!!selectedColaborador} onOpenChange={() => setSelectedColaborador(null)}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Detalhe de Jornada</SheetTitle>
            <SheetDescription>{selectedColaborador?.colaborador}</SheetDescription>
          </SheetHeader>
          {selectedColaborador && (
            <div className="mt-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Jornada Prevista</p>
                  <p className="font-medium">{selectedColaborador.jornadaPrevista}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Trabalhadas</p>
                  <p className="font-medium">{selectedColaborador.horasTrabalhadas}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Horas Extras</p>
                  <p className="font-medium">{selectedColaborador.horasExtras}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Valor HE</p>
                  <p className="font-medium">R$ {selectedColaborador.valorHE.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Banco de Horas</p>
                  <p className="font-medium">{selectedColaborador.bancoHoras}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  {getStatusBadge(selectedColaborador.statusLegal)}
                </div>
              </div>
              {selectedColaborador.heRecorrente && (
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-amber-600" />
                    <span className="text-sm font-medium text-amber-800">
                      Atencao: HE recorrente identificada - risco trabalhista
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

export default function PontoCorporativoPage() {
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
            <span className="text-foreground">Ponto</span>
          </div>
          <h1 className="text-2xl font-bold">Ponto & Banco de Horas - Corporativo</h1>
          <p className="text-muted-foreground">Controle de jornada do escritorio central</p>
        </div>
        <Suspense fallback={<div>Carregando...</div>}>
          <PontoContent />
        </Suspense>
      </main>
    </div>
  )
}
