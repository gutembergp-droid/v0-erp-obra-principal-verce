"use client"

import { Suspense, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RHNav } from "@/components/rh/rh-nav"
import {
  Gift,
  Search,
  Download,
  Plus,
  Eye,
  RefreshCw,
  Users,
  Utensils,
  Bus,
  Heart,
  DollarSign,
  Building2,
  Edit,
  Percent,
} from "lucide-react"

// Dados mockados - Benefícios
const beneficiosMock = [
  {
    codigo: "BEN-001",
    nome: "Vale Refeição",
    tipo: "Alimentação",
    fornecedor: "Alelo",
    valorFace: 35,
    diasMes: 22,
    custoMensal: 770,
    beneficiarios: 800,
    status: "ativo",
  },
  {
    codigo: "BEN-002",
    nome: "Vale Alimentação",
    tipo: "Alimentação",
    fornecedor: "Sodexo",
    valorFace: 450,
    diasMes: 1,
    custoMensal: 450,
    beneficiarios: 650,
    status: "ativo",
  },
  {
    codigo: "BEN-003",
    nome: "Vale Transporte",
    tipo: "Transporte",
    fornecedor: "VB",
    valorFace: 220,
    diasMes: 22,
    custoMensal: 220,
    beneficiarios: 500,
    status: "ativo",
  },
  {
    codigo: "BEN-004",
    nome: "Plano de Saúde",
    tipo: "Saúde",
    fornecedor: "Unimed",
    valorFace: 850,
    diasMes: 1,
    custoMensal: 850,
    beneficiarios: 450,
    status: "ativo",
  },
  {
    codigo: "BEN-005",
    nome: "Plano Odontológico",
    tipo: "Saúde",
    fornecedor: "OdontoPrev",
    valorFace: 45,
    diasMes: 1,
    custoMensal: 45,
    beneficiarios: 400,
    status: "ativo",
  },
  {
    codigo: "BEN-006",
    nome: "Seguro de Vida",
    tipo: "Seguro",
    fornecedor: "Porto Seguro",
    valorFace: 25,
    diasMes: 1,
    custoMensal: 25,
    beneficiarios: 1000,
    status: "ativo",
  },
  {
    codigo: "BEN-007",
    nome: "Auxílio Creche",
    tipo: "Assistência",
    fornecedor: "Interno",
    valorFace: 500,
    diasMes: 1,
    custoMensal: 500,
    beneficiarios: 45,
    status: "ativo",
  },
]

// Resumo por obra
const beneficiosObra = [
  { obra: "BR-101 LOTE 2", vr: 231000, va: 130500, vt: 44000, saude: 170000, outros: 25000, total: 600500 },
  { obra: "BR-116 LOTE 1", vr: 346500, va: 195750, vt: 66000, saude: 255000, outros: 37500, total: 900750 },
  { obra: "BR-040 LOTE 3", vr: 138600, va: 78300, vt: 26400, saude: 102000, outros: 15000, total: 360300 },
  { obra: "BR-153 LOTE 4", vr: 169400, va: 95700, vt: 32260, saude: 124700, outros: 18400, total: 440460 },
  { obra: "BR-381 LOTE 2", vr: 215600, va: 121800, vt: 41000, saude: 158800, outros: 23400, total: 560600 },
]

function BeneficiosContent() {
  const [abaAtiva, setAbaAtiva] = useState("tipos")
  const [busca, setBusca] = useState("")
  const [filtroTipo, setFiltroTipo] = useState("todos")

  // Totais
  const totalBeneficios = beneficiosMock.length
  const totalBeneficiarios = beneficiosMock.reduce((acc, b) => acc + b.beneficiarios, 0)
  const custoTotal = beneficiosMock.reduce((acc, b) => acc + b.custoMensal * b.beneficiarios, 0)
  const tipos = [...new Set(beneficiosMock.map((b) => b.tipo))]

  const beneficiosFiltrados = beneficiosMock.filter((b) => {
    const matchBusca =
      b.nome.toLowerCase().includes(busca.toLowerCase()) || b.codigo.toLowerCase().includes(busca.toLowerCase())
    const matchTipo = filtroTipo === "todos" || b.tipo === filtroTipo
    return matchBusca && matchTipo
  })

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case "Alimentação":
        return <Utensils className="h-4 w-4 text-orange-400" />
      case "Transporte":
        return <Bus className="h-4 w-4 text-blue-400" />
      case "Saúde":
        return <Heart className="h-4 w-4 text-red-400" />
      default:
        return <Gift className="h-4 w-4 text-purple-400" />
    }
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* RHNav */}
      <RHNav modulo="corporativo" />

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <span>Corporativo</span> / <span>Administrativo</span> / <span>RH</span> /{" "}
            <span className="text-foreground">Benefícios</span>
          </div>
          <h1 className="text-2xl font-bold flex items-center gap-3">
            <Gift className="h-6 w-6" />
            Gestão de Benefícios
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Novo Benefício
          </Button>
        </div>
      </div>

      {/* Cards Resumo */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Gift className="h-4 w-4" />
              <span className="text-xs">Benefícios</span>
            </div>
            <p className="text-2xl font-bold">{totalBeneficios}</p>
            <p className="text-xs text-muted-foreground">tipos cadastrados</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Users className="h-4 w-4" />
              <span className="text-xs">Beneficiários</span>
            </div>
            <p className="text-2xl font-bold">{totalBeneficiarios.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-green-400 mb-1">
              <DollarSign className="h-4 w-4" />
              <span className="text-xs">Custo Mensal</span>
            </div>
            <p className="text-xl font-bold text-green-400">{formatCurrency(custoTotal)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Percent className="h-4 w-4" />
              <span className="text-xs">Custo p/ Colaborador</span>
            </div>
            <p className="text-xl font-bold">{formatCurrency(custoTotal / totalBeneficiarios)}</p>
          </CardContent>
        </Card>
      </div>

      {/* Abas */}
      <Tabs value={abaAtiva} onValueChange={setAbaAtiva}>
        <TabsList>
          <TabsTrigger value="tipos" className="gap-2">
            <Gift className="h-4 w-4" />
            Tipos de Benefícios
          </TabsTrigger>
          <TabsTrigger value="obras" className="gap-2">
            <Building2 className="h-4 w-4" />
            Por Obra
          </TabsTrigger>
        </TabsList>

        <TabsContent value="tipos" className="mt-4 space-y-4">
          {/* Filtros */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar por nome ou código..."
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
                    {tipos.map((t) => (
                      <SelectItem key={t} value={t}>
                        {t}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setBusca("")
                    setFiltroTipo("todos")
                  }}
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Tabela de Benefícios */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-medium">Benefícios ({beneficiosFiltrados.length})</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Código</TableHead>
                    <TableHead>Benefício</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Fornecedor</TableHead>
                    <TableHead className="text-right">Valor Face</TableHead>
                    <TableHead className="text-right">Custo Unit.</TableHead>
                    <TableHead className="text-center">Beneficiários</TableHead>
                    <TableHead className="text-right">Custo Total</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {beneficiosFiltrados.map((b) => (
                    <TableRow key={b.codigo}>
                      <TableCell className="font-mono text-xs">{b.codigo}</TableCell>
                      <TableCell className="font-medium">{b.nome}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getTipoIcon(b.tipo)}
                          {b.tipo}
                        </div>
                      </TableCell>
                      <TableCell>{b.fornecedor}</TableCell>
                      <TableCell className="text-right">{formatCurrency(b.valorFace)}</TableCell>
                      <TableCell className="text-right">{formatCurrency(b.custoMensal)}</TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline">{b.beneficiarios}</Badge>
                      </TableCell>
                      <TableCell className="text-right font-medium text-green-400">
                        {formatCurrency(b.custoMensal * b.beneficiarios)}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="obras" className="mt-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-medium">Custo de Benefícios por Obra</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Obra</TableHead>
                    <TableHead className="text-right">VR</TableHead>
                    <TableHead className="text-right">VA</TableHead>
                    <TableHead className="text-right">VT</TableHead>
                    <TableHead className="text-right">Saúde</TableHead>
                    <TableHead className="text-right">Outros</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {beneficiosObra.map((b, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium">{b.obra}</TableCell>
                      <TableCell className="text-right">{formatCurrency(b.vr)}</TableCell>
                      <TableCell className="text-right">{formatCurrency(b.va)}</TableCell>
                      <TableCell className="text-right">{formatCurrency(b.vt)}</TableCell>
                      <TableCell className="text-right">{formatCurrency(b.saude)}</TableCell>
                      <TableCell className="text-right">{formatCurrency(b.outros)}</TableCell>
                      <TableCell className="text-right font-medium text-green-400">{formatCurrency(b.total)}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow className="bg-muted/30 font-medium">
                    <TableCell>TOTAL</TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(beneficiosObra.reduce((acc, b) => acc + b.vr, 0))}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(beneficiosObra.reduce((acc, b) => acc + b.va, 0))}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(beneficiosObra.reduce((acc, b) => acc + b.vt, 0))}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(beneficiosObra.reduce((acc, b) => acc + b.saude, 0))}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(beneficiosObra.reduce((acc, b) => acc + b.outros, 0))}
                    </TableCell>
                    <TableCell className="text-right text-green-400">
                      {formatCurrency(beneficiosObra.reduce((acc, b) => acc + b.total, 0))}
                    </TableCell>
                    <TableCell />
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
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
