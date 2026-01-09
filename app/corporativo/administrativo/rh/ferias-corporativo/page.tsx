"use client"

import { Suspense, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { RHNav } from "@/components/rh/rh-nav"
import { Palmtree, Download, AlertTriangle, CheckCircle2, Clock, Users, Building2, Eye, Ban } from "lucide-react"

// Dados mockados
const feriasObras = [
  {
    obra: "BR-101 LOTE 2",
    total: 300,
    programadas: 45,
    vencendo: 12,
    vencidas: 3,
    emGozo: 8,
    conformidade: 95,
  },
  {
    obra: "BR-116 LOTE 1",
    total: 450,
    programadas: 60,
    vencendo: 25,
    vencidas: 8,
    emGozo: 12,
    conformidade: 88,
  },
  {
    obra: "BR-040 LOTE 3",
    total: 180,
    programadas: 20,
    vencendo: 8,
    vencidas: 2,
    emGozo: 4,
    conformidade: 94,
  },
  {
    obra: "BR-153 LOTE 4",
    total: 220,
    programadas: 35,
    vencendo: 15,
    vencidas: 5,
    emGozo: 6,
    conformidade: 85,
  },
  {
    obra: "BR-381 LOTE 2",
    total: 280,
    programadas: 40,
    vencendo: 10,
    vencidas: 1,
    emGozo: 7,
    conformidade: 97,
  },
]

function FeriasCorporativoContent() {
  const [periodo, setPeriodo] = useState("2026")

  // Totais
  const totalColaboradores = feriasObras.reduce((acc, f) => acc + f.total, 0)
  const totalProgramadas = feriasObras.reduce((acc, f) => acc + f.programadas, 0)
  const totalVencendo = feriasObras.reduce((acc, f) => acc + f.vencendo, 0)
  const totalVencidas = feriasObras.reduce((acc, f) => acc + f.vencidas, 0)
  const totalEmGozo = feriasObras.reduce((acc, f) => acc + f.emGozo, 0)
  const conformidadeMedia = Math.round(feriasObras.reduce((acc, f) => acc + f.conformidade, 0) / feriasObras.length)

  const getConformidadeBadge = (valor: number) => {
    if (valor >= 95)
      return (
        <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
          <CheckCircle2 className="h-3 w-3 mr-1" />
          {valor}%
        </Badge>
      )
    if (valor >= 85)
      return (
        <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
          <AlertTriangle className="h-3 w-3 mr-1" />
          {valor}%
        </Badge>
      )
    return (
      <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
        <Ban className="h-3 w-3 mr-1" />
        {valor}%
      </Badge>
    )
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <RHNav modulo="corporativo" />
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <span>Corporativo</span> / <span>Administrativo</span> / <span>RH</span> /{" "}
            <span className="text-foreground">Férias Consolidado</span>
          </div>
          <h1 className="text-2xl font-bold flex items-center gap-3">
            <Palmtree className="h-6 w-6" />
            Gestão de Férias - Visão Corporativa
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Select value={periodo} onValueChange={setPeriodo}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2026">2026</SelectItem>
              <SelectItem value="2025">2025</SelectItem>
              <SelectItem value="2024">2024</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Cards Resumo */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Users className="h-4 w-4" />
              <span className="text-xs">Total</span>
            </div>
            <p className="text-2xl font-bold">{totalColaboradores.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">colaboradores</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-blue-400 mb-1">
              <CheckCircle2 className="h-4 w-4" />
              <span className="text-xs">Programadas</span>
            </div>
            <p className="text-2xl font-bold text-blue-400">{totalProgramadas}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-cyan-400 mb-1">
              <Palmtree className="h-4 w-4" />
              <span className="text-xs">Em Gozo</span>
            </div>
            <p className="text-2xl font-bold text-cyan-400">{totalEmGozo}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-orange-400 mb-1">
              <Clock className="h-4 w-4" />
              <span className="text-xs">Vencendo</span>
            </div>
            <p className="text-2xl font-bold text-orange-400">{totalVencendo}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-red-400 mb-1">
              <AlertTriangle className="h-4 w-4" />
              <span className="text-xs">Vencidas</span>
            </div>
            <p className="text-2xl font-bold text-red-400">{totalVencidas}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <CheckCircle2 className="h-4 w-4" />
              <span className="text-xs">Conformidade</span>
            </div>
            <p className="text-2xl font-bold">{conformidadeMedia}%</p>
            <Progress value={conformidadeMedia} className="h-1 mt-1" />
          </CardContent>
        </Card>
      </div>

      {/* Tabela de Férias por Obra */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-medium flex items-center gap-2">
            <Building2 className="h-4 w-4" />
            Férias por Obra ({feriasObras.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Obra</TableHead>
                <TableHead className="text-center">Total</TableHead>
                <TableHead className="text-center">Programadas</TableHead>
                <TableHead className="text-center">Em Gozo</TableHead>
                <TableHead className="text-center">Vencendo</TableHead>
                <TableHead className="text-center">Vencidas</TableHead>
                <TableHead className="text-center">Conformidade</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {feriasObras.map((f, i) => (
                <TableRow key={i} className={f.conformidade < 90 ? "bg-yellow-500/5" : ""}>
                  <TableCell className="font-medium">{f.obra}</TableCell>
                  <TableCell className="text-center">{f.total}</TableCell>
                  <TableCell className="text-center text-blue-400">{f.programadas}</TableCell>
                  <TableCell className="text-center text-cyan-400">{f.emGozo}</TableCell>
                  <TableCell className="text-center text-orange-400">{f.vencendo}</TableCell>
                  <TableCell className="text-center text-red-400">{f.vencidas}</TableCell>
                  <TableCell className="text-center">{getConformidadeBadge(f.conformidade)}</TableCell>
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
    </div>
  )
}

export default function FeriasCorporativoPage() {
  return (
    <Suspense fallback={null}>
      <FeriasCorporativoContent />
    </Suspense>
  )
}
