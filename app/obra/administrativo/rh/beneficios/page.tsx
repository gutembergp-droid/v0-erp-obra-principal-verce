"use client"

import { Suspense } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { RHNav } from "@/components/rh/rh-nav"
import { Gift, Plus, Download, CheckCircle2, AlertCircle } from "lucide-react"

// ============================================
// DADOS MOCKADOS
// ============================================

const beneficiosMock = [
  {
    id: 1,
    nome: "Vale Refeicao",
    tipo: "Obrigatorio",
    valor: 30,
    unidade: "dia",
    elegibilidade: "CLT",
    ativos: 210,
    custo: 138600,
  },
  {
    id: 2,
    nome: "Vale Transporte",
    tipo: "Obrigatorio",
    valor: 6,
    unidade: "%",
    elegibilidade: "CLT",
    ativos: 180,
    custo: 45000,
  },
  {
    id: 3,
    nome: "Plano de Saude",
    tipo: "Opcional",
    valor: 450,
    unidade: "mes",
    elegibilidade: "CLT + PJ",
    ativos: 150,
    custo: 67500,
  },
  {
    id: 4,
    nome: "Seguro de Vida",
    tipo: "Obrigatorio",
    valor: 25,
    unidade: "mes",
    elegibilidade: "Todos",
    ativos: 300,
    custo: 7500,
  },
  {
    id: 5,
    nome: "Cesta Basica",
    tipo: "Convencao",
    valor: 180,
    unidade: "mes",
    elegibilidade: "CLT",
    ativos: 210,
    custo: 37800,
  },
]

// ============================================
// COMPONENTE PRINCIPAL
// ============================================

function BeneficiosContent() {
  const beneficiosAtivos = beneficiosMock.length
  const beneficiosObrigatorios = beneficiosMock.filter((b) => b.tipo === "Obrigatorio" || b.tipo === "Convencao").length
  const excecoes = 3

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value)
  }

  return (
    <div className="flex-1 flex flex-col">
      <RHNav modulo="obra" />

      <div className="flex-1 space-y-6 p-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Gift className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Beneficios</h1>
              <p className="text-sm text-muted-foreground">Gestao de beneficios dos colaboradores</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Exportar
            </Button>
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Novo Beneficio
            </Button>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-card/50">
            <CardContent className="p-4 text-center">
              <Gift className="h-5 w-5 mx-auto mb-1 text-muted-foreground" />
              <p className="text-2xl font-bold">{beneficiosAtivos}</p>
              <p className="text-xs text-muted-foreground">Beneficios Ativos</p>
            </CardContent>
          </Card>
          <Card className="bg-blue-500/10 border-blue-500/30">
            <CardContent className="p-4 text-center">
              <CheckCircle2 className="h-5 w-5 mx-auto mb-1 text-blue-500" />
              <p className="text-2xl font-bold text-blue-500">{beneficiosObrigatorios}</p>
              <p className="text-xs text-blue-400">Obrigatorios</p>
            </CardContent>
          </Card>
          <Card className="bg-yellow-500/10 border-yellow-500/30">
            <CardContent className="p-4 text-center">
              <AlertCircle className="h-5 w-5 mx-auto mb-1 text-yellow-500" />
              <p className="text-2xl font-bold text-yellow-500">{excecoes}</p>
              <p className="text-xs text-yellow-400">Excecoes</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabela */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-medium">Lista de Beneficios</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Beneficio</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead className="text-right">Valor</TableHead>
                  <TableHead>Elegibilidade</TableHead>
                  <TableHead className="text-center">Ativos</TableHead>
                  <TableHead className="text-right">Custo Mensal</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {beneficiosMock.map((ben) => (
                  <TableRow key={ben.id}>
                    <TableCell className="font-medium">{ben.nome}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          ben.tipo === "Obrigatorio" ? "default" : ben.tipo === "Convencao" ? "secondary" : "outline"
                        }
                      >
                        {ben.tipo}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      {ben.unidade === "%" ? `${ben.valor}%` : formatCurrency(ben.valor)}/{ben.unidade}
                    </TableCell>
                    <TableCell>{ben.elegibilidade}</TableCell>
                    <TableCell className="text-center">{ben.ativos}</TableCell>
                    <TableCell className="text-right font-medium">{formatCurrency(ben.custo)}</TableCell>
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

export default function BeneficiosPage() {
  return (
    <Suspense fallback={null}>
      <BeneficiosContent />
    </Suspense>
  )
}
