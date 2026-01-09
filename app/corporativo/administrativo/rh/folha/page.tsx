"use client"

import { Suspense, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { RHNav } from "@/components/rh/rh-nav"
import {
  Wallet,
  Download,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Building2,
  Users,
  Calculator,
  FileCheck,
  Send,
  Eye,
  BarChart3,
  Table2,
} from "lucide-react"

// Dados mockados
const folhaPorObra = [
  {
    obra: "BR-101 LOTE 2",
    status: "aguardando_rh",
    totalColaboradores: 300,
    salarioBase: 1250000,
    encargos: 437500,
    beneficios: 180000,
    descontos: 125000,
    liquido: 1742500,
    prazoRH: "2026-01-10",
    prazoCustos: "2026-01-12",
    prazoGerencia: "2026-01-14",
    prazoFinanceiro: "2026-01-16",
  },
  {
    obra: "BR-116 LOTE 1",
    status: "em_custos",
    totalColaboradores: 450,
    salarioBase: 1875000,
    encargos: 656250,
    beneficios: 270000,
    descontos: 187500,
    liquido: 2613750,
    prazoRH: "2026-01-10",
    prazoCustos: "2026-01-12",
    prazoGerencia: "2026-01-14",
    prazoFinanceiro: "2026-01-16",
  },
  {
    obra: "BR-040 LOTE 3",
    status: "em_gerencia",
    totalColaboradores: 180,
    salarioBase: 720000,
    encargos: 252000,
    beneficios: 108000,
    descontos: 72000,
    liquido: 1008000,
    prazoRH: "2026-01-10",
    prazoCustos: "2026-01-12",
    prazoGerencia: "2026-01-14",
    prazoFinanceiro: "2026-01-16",
  },
  {
    obra: "BR-153 LOTE 4",
    status: "aprovado",
    totalColaboradores: 220,
    salarioBase: 880000,
    encargos: 308000,
    beneficios: 132000,
    descontos: 88000,
    liquido: 1232000,
    prazoRH: "2026-01-10",
    prazoCustos: "2026-01-12",
    prazoGerencia: "2026-01-14",
    prazoFinanceiro: "2026-01-16",
  },
  {
    obra: "BR-381 LOTE 2",
    status: "pago",
    totalColaboradores: 280,
    salarioBase: 1120000,
    encargos: 392000,
    beneficios: 168000,
    descontos: 112000,
    liquido: 1568000,
    prazoRH: "2026-01-10",
    prazoCustos: "2026-01-12",
    prazoGerencia: "2026-01-14",
    prazoFinanceiro: "2026-01-16",
  },
]

const periodos = ["Janeiro/2026", "Dezembro/2025", "Novembro/2025", "Outubro/2025"]

function FolhaContent() {
  const [periodo, setPeriodo] = useState("Janeiro/2026")
  const [viewMode, setViewMode] = useState<"grafico" | "tabela">("tabela")

  // Totais
  const totalColaboradores = folhaPorObra.reduce((acc, f) => acc + f.totalColaboradores, 0)
  const totalBruto = folhaPorObra.reduce((acc, f) => acc + f.salarioBase + f.encargos + f.beneficios, 0)
  const totalLiquido = folhaPorObra.reduce((acc, f) => acc + f.liquido, 0)
  const aguardandoRH = folhaPorObra.filter((f) => f.status === "aguardando_rh").length
  const emProcessamento = folhaPorObra.filter((f) => ["em_custos", "em_gerencia"].includes(f.status)).length
  const aprovadas = folhaPorObra.filter((f) => f.status === "aprovado").length
  const pagas = folhaPorObra.filter((f) => f.status === "pago").length

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "aguardando_rh":
        return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Aguardando RH</Badge>
      case "em_custos":
        return <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">Em Custos</Badge>
      case "em_gerencia":
        return <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">Em Gerência</Badge>
      case "aprovado":
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Aprovado</Badge>
      case "pago":
        return <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">Pago</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getProgressoWorkflow = (status: string) => {
    switch (status) {
      case "aguardando_rh":
        return 25
      case "em_custos":
        return 50
      case "em_gerencia":
        return 75
      case "aprovado":
        return 90
      case "pago":
        return 100
      default:
        return 0
    }
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <span>Corporativo</span> / <span>Administrativo</span> / <span>RH</span> /{" "}
            <span className="text-foreground">Folha de Pagamento</span>
          </div>
          <h1 className="text-2xl font-bold flex items-center gap-3">
            <Wallet className="h-6 w-6" />
            Folha de Pagamento Consolidada
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Select value={periodo} onValueChange={setPeriodo}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {periodos.map((p) => (
                <SelectItem key={p} value={p}>
                  {p}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      {/* RHNav */}
      <RHNav modulo="corporativo" />

      {/* Cards Resumo */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Users className="h-4 w-4" />
              <span className="text-xs">Colaboradores</span>
            </div>
            <p className="text-2xl font-bold">{totalColaboradores.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Calculator className="h-4 w-4" />
              <span className="text-xs">Total Bruto</span>
            </div>
            <p className="text-xl font-bold">{formatCurrency(totalBruto)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-green-400 mb-1">
              <Wallet className="h-4 w-4" />
              <span className="text-xs">Total Líquido</span>
            </div>
            <p className="text-xl font-bold text-green-400">{formatCurrency(totalLiquido)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-yellow-400 mb-1">
              <Clock className="h-4 w-4" />
              <span className="text-xs">Aguardando RH</span>
            </div>
            <p className="text-2xl font-bold text-yellow-400">{aguardandoRH}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-blue-400 mb-1">
              <AlertTriangle className="h-4 w-4" />
              <span className="text-xs">Em Processamento</span>
            </div>
            <p className="text-2xl font-bold text-blue-400">{emProcessamento}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-green-400 mb-1">
              <CheckCircle2 className="h-4 w-4" />
              <span className="text-xs">Aprovadas</span>
            </div>
            <p className="text-2xl font-bold text-green-400">{aprovadas}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-emerald-400 mb-1">
              <FileCheck className="h-4 w-4" />
              <span className="text-xs">Pagas</span>
            </div>
            <p className="text-2xl font-bold text-emerald-400">{pagas}</p>
          </CardContent>
        </Card>
      </div>

      {/* Workflow Visual */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-medium">Fluxo de Aprovação - {periodo}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1 text-center">
              <div
                className={`h-12 w-12 rounded-full mx-auto flex items-center justify-center ${aguardandoRH > 0 ? "bg-yellow-500/20 text-yellow-400" : "bg-muted text-muted-foreground"}`}
              >
                <Users className="h-5 w-5" />
              </div>
              <p className="text-sm mt-2">RH</p>
              <p className="text-xs text-muted-foreground">{aguardandoRH} obras</p>
            </div>
            <div className="h-0.5 flex-1 bg-muted" />
            <div className="flex-1 text-center">
              <div
                className={`h-12 w-12 rounded-full mx-auto flex items-center justify-center ${folhaPorObra.filter((f) => f.status === "em_custos").length > 0 ? "bg-blue-500/20 text-blue-400" : "bg-muted text-muted-foreground"}`}
              >
                <Calculator className="h-5 w-5" />
              </div>
              <p className="text-sm mt-2">Custos</p>
              <p className="text-xs text-muted-foreground">
                {folhaPorObra.filter((f) => f.status === "em_custos").length} obras
              </p>
            </div>
            <div className="h-0.5 flex-1 bg-muted" />
            <div className="flex-1 text-center">
              <div
                className={`h-12 w-12 rounded-full mx-auto flex items-center justify-center ${folhaPorObra.filter((f) => f.status === "em_gerencia").length > 0 ? "bg-purple-500/20 text-purple-400" : "bg-muted text-muted-foreground"}`}
              >
                <Building2 className="h-5 w-5" />
              </div>
              <p className="text-sm mt-2">Gerência</p>
              <p className="text-xs text-muted-foreground">
                {folhaPorObra.filter((f) => f.status === "em_gerencia").length} obras
              </p>
            </div>
            <div className="h-0.5 flex-1 bg-muted" />
            <div className="flex-1 text-center">
              <div
                className={`h-12 w-12 rounded-full mx-auto flex items-center justify-center ${aprovadas > 0 ? "bg-green-500/20 text-green-400" : "bg-muted text-muted-foreground"}`}
              >
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <p className="text-sm mt-2">Aprovado</p>
              <p className="text-xs text-muted-foreground">{aprovadas} obras</p>
            </div>
            <div className="h-0.5 flex-1 bg-muted" />
            <div className="flex-1 text-center">
              <div
                className={`h-12 w-12 rounded-full mx-auto flex items-center justify-center ${pagas > 0 ? "bg-emerald-500/20 text-emerald-400" : "bg-muted text-muted-foreground"}`}
              >
                <Wallet className="h-5 w-5" />
              </div>
              <p className="text-sm mt-2">Pago</p>
              <p className="text-xs text-muted-foreground">{pagas} obras</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabela de Folhas por Obra */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-medium">Folha por Obra ({folhaPorObra.length})</CardTitle>
            <div className="flex items-center gap-1 bg-muted rounded-md p-1">
              <Button
                variant={viewMode === "grafico" ? "secondary" : "ghost"}
                size="sm"
                className="h-7 px-2"
                onClick={() => setViewMode("grafico")}
              >
                <BarChart3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "tabela" ? "secondary" : "ghost"}
                size="sm"
                className="h-7 px-2"
                onClick={() => setViewMode("tabela")}
              >
                <Table2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Obra</TableHead>
                <TableHead className="text-center">Colaboradores</TableHead>
                <TableHead className="text-right">Salário Base</TableHead>
                <TableHead className="text-right">Encargos</TableHead>
                <TableHead className="text-right">Benefícios</TableHead>
                <TableHead className="text-right">Descontos</TableHead>
                <TableHead className="text-right">Líquido</TableHead>
                <TableHead>Progresso</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {folhaPorObra.map((f, i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium">{f.obra}</TableCell>
                  <TableCell className="text-center">{f.totalColaboradores}</TableCell>
                  <TableCell className="text-right">{formatCurrency(f.salarioBase)}</TableCell>
                  <TableCell className="text-right">{formatCurrency(f.encargos)}</TableCell>
                  <TableCell className="text-right">{formatCurrency(f.beneficios)}</TableCell>
                  <TableCell className="text-right text-red-400">-{formatCurrency(f.descontos)}</TableCell>
                  <TableCell className="text-right font-medium text-green-400">{formatCurrency(f.liquido)}</TableCell>
                  <TableCell>
                    <div className="w-20">
                      <Progress value={getProgressoWorkflow(f.status)} className="h-2" />
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(f.status)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Eye className="h-4 w-4" />
                      </Button>
                      {f.status === "aguardando_rh" && (
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Send className="h-4 w-4" />
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
    </div>
  )
}

export default function FolhaPage() {
  return (
    <Suspense fallback={null}>
      <FolhaContent />
    </Suspense>
  )
}
