"use client"

import { useState, Suspense } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { RHNav } from "@/components/rh/rh-nav"
import { Briefcase, Search, TrendingUp, AlertTriangle, Scale, Plus, Download } from "lucide-react"

// ============================================
// DADOS MOCKADOS
// ============================================

const cargosMock = [
  {
    id: 1,
    cargo: "Operador de Escavadeira",
    cbo: "7151-15",
    nivel: "Operacional",
    faixaMin: 3500,
    faixaMax: 5500,
    praticado: 4200,
    pessoas: 25,
    desvio: false,
  },
  {
    id: 2,
    cargo: "Engenheiro Civil",
    cbo: "2142-05",
    nivel: "Tecnico",
    faixaMin: 12000,
    faixaMax: 18000,
    praticado: 15000,
    pessoas: 8,
    desvio: false,
  },
  {
    id: 3,
    cargo: "Pedreiro",
    cbo: "7152-10",
    nivel: "Operacional",
    faixaMin: 2800,
    faixaMax: 4000,
    praticado: 4500,
    pessoas: 45,
    desvio: true,
  },
  {
    id: 4,
    cargo: "Motorista",
    cbo: "7823-05",
    nivel: "Operacional",
    faixaMin: 3000,
    faixaMax: 4500,
    praticado: 3800,
    pessoas: 15,
    desvio: false,
  },
  {
    id: 5,
    cargo: "Tecnico de Seguranca",
    cbo: "3516-05",
    nivel: "Tecnico",
    faixaMin: 4500,
    faixaMax: 7000,
    praticado: 5500,
    pessoas: 6,
    desvio: false,
  },
  {
    id: 6,
    cargo: "Almoxarife",
    cbo: "4141-05",
    nivel: "Administrativo",
    faixaMin: 2500,
    faixaMax: 3800,
    praticado: 3000,
    pessoas: 4,
    desvio: false,
  },
]

// ============================================
// COMPONENTE PRINCIPAL
// ============================================

function CargosSalariosContent() {
  const [searchTerm, setSearchTerm] = useState("")

  const totalCargos = cargosMock.length
  const cargosComDesvio = cargosMock.filter((c) => c.desvio).length
  const promocoesPeriodo = 3

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value)
  }

  const cargosFiltrados = cargosMock.filter((c) => c.cargo.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="flex-1 flex flex-col">
      <RHNav modulo="obra" />

      <div className="flex-1 space-y-6 p-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Briefcase className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Cargos & Salarios</h1>
              <p className="text-sm text-muted-foreground">Estrutura de cargos e faixas salariais</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Exportar
            </Button>
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Novo Cargo
            </Button>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-card/50">
            <CardContent className="p-4 text-center">
              <Briefcase className="h-5 w-5 mx-auto mb-1 text-muted-foreground" />
              <p className="text-2xl font-bold">{totalCargos}</p>
              <p className="text-xs text-muted-foreground">Total de Cargos</p>
            </CardContent>
          </Card>
          <Card className="bg-red-500/10 border-red-500/30">
            <CardContent className="p-4 text-center">
              <AlertTriangle className="h-5 w-5 mx-auto mb-1 text-red-500" />
              <p className="text-2xl font-bold text-red-500">{cargosComDesvio}</p>
              <p className="text-xs text-red-400">Cargos com Desvio</p>
            </CardContent>
          </Card>
          <Card className="bg-green-500/10 border-green-500/30">
            <CardContent className="p-4 text-center">
              <TrendingUp className="h-5 w-5 mx-auto mb-1 text-green-500" />
              <p className="text-2xl font-bold text-green-500">{promocoesPeriodo}</p>
              <p className="text-xs text-green-400">Promocoes no Periodo</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabela */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <CardTitle className="text-base font-medium">Estrutura de Cargos</CardTitle>
              <div className="relative w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar cargo..."
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Cargo</TableHead>
                  <TableHead>CBO</TableHead>
                  <TableHead>Nivel</TableHead>
                  <TableHead className="text-right">Faixa Min</TableHead>
                  <TableHead className="text-right">Faixa Max</TableHead>
                  <TableHead className="text-right">Praticado</TableHead>
                  <TableHead className="text-center">Pessoas</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cargosFiltrados.map((cargo) => (
                  <TableRow key={cargo.id} className={cargo.desvio ? "bg-red-500/5" : ""}>
                    <TableCell className="font-medium">{cargo.cargo}</TableCell>
                    <TableCell className="text-muted-foreground">{cargo.cbo}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{cargo.nivel}</Badge>
                    </TableCell>
                    <TableCell className="text-right">{formatCurrency(cargo.faixaMin)}</TableCell>
                    <TableCell className="text-right">{formatCurrency(cargo.faixaMax)}</TableCell>
                    <TableCell className="text-right font-medium">{formatCurrency(cargo.praticado)}</TableCell>
                    <TableCell className="text-center">{cargo.pessoas}</TableCell>
                    <TableCell className="text-center">
                      {cargo.desvio ? (
                        <div className="flex items-center justify-center gap-1">
                          <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Desvio</Badge>
                          <Scale className="h-4 w-4 text-orange-500" />
                        </div>
                      ) : (
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/30">OK</Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function CargosSalariosPage() {
  return (
    <Suspense fallback={null}>
      <CargosSalariosContent />
    </Suspense>
  )
}
