"use client"

import { useState } from "react"
import { AppLayout } from "@/components/layout/app-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { InfoTooltip } from "@/components/ui/info-tooltip"
import {
  Plus,
  CheckCircle2,
  Clock,
  AlertTriangle,
  TrendingUp,
  Lightbulb,
  Target,
  DollarSign,
  BarChart3,
  FileCheck,
  Scale,
} from "lucide-react"

// Dados mockados de Validacao de Custos
const validacaoCustosMock = [
  {
    id: "VAL-001",
    nf: "NF-45678",
    fornecedor: "Petrobras Distribuidora",
    descricao: "Diesel S10 - Janeiro",
    itemEAP: "1.1 - Escavacao",
    valorNF: 93000,
    valorOrcado: 97500,
    variacao: -4.6,
    status: "validada",
    validadoPor: "Ana Costa",
  },
  {
    id: "VAL-002",
    nf: "NF-45892",
    fornecedor: "Gerdau Acos",
    descricao: "Aco CA-50 nervurado",
    itemEAP: "3.1 - Ponte Fundacoes",
    valorNF: 696000,
    valorOrcado: 720000,
    variacao: -3.3,
    status: "validada",
    validadoPor: "Carlos Silva",
  },
  {
    id: "VAL-003",
    nf: "NF-46001",
    fornecedor: "Concreteira Norte",
    descricao: "Concreto Usinado FCK 30",
    itemEAP: "3.2 - Ponte Superestrutura",
    valorNF: 185000,
    valorOrcado: 175000,
    variacao: 5.7,
    status: "pendente",
    validadoPor: null,
  },
]

// Dados mockados de Performance CRCO
const performanceCRCOMock = [
  {
    itemEAP: "1.0 - TERRAPLENAGEM",
    custoOrcado: 45000000,
    custoReal: 42500000,
    avancoFisico: 85,
    cpi: 1.06,
    variacao: 2500000,
    status: "positivo",
  },
  {
    itemEAP: "2.0 - PAVIMENTACAO",
    custoOrcado: 180000000,
    custoReal: 45000000,
    avancoFisico: 25,
    cpi: 1.0,
    variacao: 0,
    status: "neutro",
  },
  {
    itemEAP: "3.0 - OBRAS DE ARTE",
    custoOrcado: 225000000,
    custoReal: 68000000,
    avancoFisico: 30,
    cpi: 0.99,
    variacao: -680000,
    status: "atencao",
  },
]

// Dados mockados de Otimizacao
const otimizacoesMock = [
  {
    id: "OPT-001",
    itemEAP: "1.1 - Escavacao 1a categoria",
    metodoOriginal: "Escavadeira CAT 320",
    metodoOtimizado: "Escavadeira CAT 336 + Caminhao articulado",
    custoBaseline: 10625000,
    custoTarget: 9800000,
    economiaEstimada: 825000,
    percentual: 7.8,
    status: "aprovada",
    responsavel: "Eng. Roberto Lima",
  },
  {
    id: "OPT-002",
    itemEAP: "2.3 - CBUQ",
    metodoOriginal: "CBUQ convencional",
    metodoOtimizado: "CBUQ com RAP 20%",
    custoBaseline: 32300000,
    custoTarget: 29800000,
    economiaEstimada: 2500000,
    percentual: 7.7,
    status: "em_analise",
    responsavel: "Eng. Patricia Souza",
  },
]

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

export default function EngenhariaValorPage() {
  const [tab, setTab] = useState("validacao")

  const totalEconomiaPotencial = otimizacoesMock.reduce((acc, o) => acc + o.economiaEstimada, 0)
  const cpiMedio = performanceCRCOMock.reduce((acc, p) => acc + p.cpi, 0) / performanceCRCOMock.length

  return (
    <AppLayout>
      <div className="px-6 pt-6 pb-2">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold">Engenharia de Valor</h1>
          <InfoTooltip
            title="Setor de Engenharia de Valor"
            description="Responsavel por Validacao de Custos (auditoria de NFs e medicoes), Performance CRCO (Custo Real vs Custo Orcado) e Otimizacao (engenharia de valor para maximizar resultado)."
            icon={<Target className="w-4 h-4" />}
          />
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          Validacao de Custos, Performance CRCO e Otimizacao - Busca do Lucro Extra
        </p>
      </div>

      <div className="p-6 space-y-6">
        {/* Metricas */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <FileCheck className="w-4 h-4" />
                NFs Validadas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">
                {validacaoCustosMock.filter((v) => v.status === "validada").length}
              </div>
              <p className="text-xs text-amber-500">
                {validacaoCustosMock.filter((v) => v.status === "pendente").length} pendentes
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Scale className="w-4 h-4" />
                CPI Medio
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${cpiMedio >= 1 ? "text-green-500" : "text-red-500"}`}>
                {cpiMedio.toFixed(2)}
              </div>
              <p className="text-xs text-muted-foreground">
                {cpiMedio >= 1 ? "Dentro do orcamento" : "Acima do orcamento"}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Lightbulb className="w-4 h-4" />
                Otimizacoes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{otimizacoesMock.length}</div>
              <p className="text-xs text-muted-foreground">propostas ativas</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Economia Potencial
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">{formatCurrency(totalEconomiaPotencial)}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Lucro Extra
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-emerald-500">+2.1%</div>
              <p className="text-xs text-muted-foreground">vs margem baseline</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="validacao">
              <FileCheck className="w-4 h-4 mr-2" />
              Validacao de Custos
            </TabsTrigger>
            <TabsTrigger value="crco">
              <BarChart3 className="w-4 h-4 mr-2" />
              Performance CRCO
            </TabsTrigger>
            <TabsTrigger value="otimizacao">
              <Lightbulb className="w-4 h-4 mr-2" />
              Otimizacao
            </TabsTrigger>
          </TabsList>

          {/* Validacao de Custos */}
          <TabsContent value="validacao">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <CardTitle className="text-base">Validacao de Custos</CardTitle>
                    <CardDescription>Auditoria de NFs e medicoes antes do fechamento</CardDescription>
                  </div>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Nova Validacao
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>NF</TableHead>
                      <TableHead>Fornecedor</TableHead>
                      <TableHead>Item EAP</TableHead>
                      <TableHead className="text-right">Valor NF</TableHead>
                      <TableHead className="text-right">Valor Orcado</TableHead>
                      <TableHead className="text-right">Variacao</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {validacaoCustosMock.map((val) => (
                      <TableRow key={val.id}>
                        <TableCell className="font-mono font-bold">{val.id}</TableCell>
                        <TableCell className="font-mono">{val.nf}</TableCell>
                        <TableCell>{val.fornecedor}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">{val.itemEAP}</TableCell>
                        <TableCell className="text-right font-mono">{formatCurrency(val.valorNF)}</TableCell>
                        <TableCell className="text-right font-mono text-muted-foreground">
                          {formatCurrency(val.valorOrcado)}
                        </TableCell>
                        <TableCell className="text-right">
                          <span
                            className={`font-mono font-bold ${val.variacao <= 0 ? "text-green-500" : "text-red-500"}`}
                          >
                            {val.variacao > 0 ? "+" : ""}
                            {val.variacao.toFixed(1)}%
                          </span>
                        </TableCell>
                        <TableCell>
                          {val.status === "validada" && (
                            <Badge className="bg-green-500">
                              <CheckCircle2 className="w-3 h-3 mr-1" />
                              Validada
                            </Badge>
                          )}
                          {val.status === "pendente" && (
                            <Badge variant="outline" className="text-amber-500">
                              <Clock className="w-3 h-3 mr-1" />
                              Pendente
                            </Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Performance CRCO */}
          <TabsContent value="crco">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Performance CRCO - Custo Real vs Custo Orcado</CardTitle>
                <CardDescription>Analise automatica de performance por item da EAP</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Item EAP</TableHead>
                      <TableHead className="text-right">Custo Orcado</TableHead>
                      <TableHead className="text-right">Custo Real</TableHead>
                      <TableHead className="text-center">Avanco Fisico</TableHead>
                      <TableHead className="text-center">CPI</TableHead>
                      <TableHead className="text-right">Variacao</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {performanceCRCOMock.map((perf, idx) => (
                      <TableRow key={idx}>
                        <TableCell className="font-semibold">{perf.itemEAP}</TableCell>
                        <TableCell className="text-right font-mono text-muted-foreground">
                          {formatCurrency(perf.custoOrcado)}
                        </TableCell>
                        <TableCell className="text-right font-mono">{formatCurrency(perf.custoReal)}</TableCell>
                        <TableCell className="text-center">
                          <div className="flex items-center gap-2">
                            <Progress value={perf.avancoFisico} className="w-16 h-2" />
                            <span className="text-sm font-mono">{perf.avancoFisico}%</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge
                            variant={perf.cpi >= 1 ? "default" : "destructive"}
                            className={perf.cpi >= 1 ? "bg-green-500" : ""}
                          >
                            {perf.cpi.toFixed(2)}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <span
                            className={`font-mono font-bold ${perf.variacao >= 0 ? "text-green-500" : "text-red-500"}`}
                          >
                            {perf.variacao >= 0 ? "+" : ""}
                            {formatCurrency(perf.variacao)}
                          </span>
                        </TableCell>
                        <TableCell>
                          {perf.status === "positivo" && (
                            <Badge className="bg-green-500">
                              <TrendingUp className="w-3 h-3 mr-1" />
                              Positivo
                            </Badge>
                          )}
                          {perf.status === "neutro" && <Badge variant="secondary">Neutro</Badge>}
                          {perf.status === "atencao" && (
                            <Badge variant="outline" className="text-amber-500">
                              <AlertTriangle className="w-3 h-3 mr-1" />
                              Atencao
                            </Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Otimizacao */}
          <TabsContent value="otimizacao">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <CardTitle className="text-base">Otimizacao de Performance</CardTitle>
                    <CardDescription>Propostas de engenharia de valor para maximizar resultado</CardDescription>
                  </div>
                  <Button>
                    <Lightbulb className="w-4 h-4 mr-2" />
                    Propor Otimizacao
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Item EAP</TableHead>
                      <TableHead>Metodo Original</TableHead>
                      <TableHead>Metodo Otimizado</TableHead>
                      <TableHead className="text-right">Baseline</TableHead>
                      <TableHead className="text-right">Target Cost</TableHead>
                      <TableHead className="text-right">Economia</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {otimizacoesMock.map((opt) => (
                      <TableRow key={opt.id}>
                        <TableCell className="font-mono font-bold">{opt.id}</TableCell>
                        <TableCell className="text-sm">{opt.itemEAP}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">{opt.metodoOriginal}</TableCell>
                        <TableCell className="text-sm font-medium text-emerald-600">{opt.metodoOtimizado}</TableCell>
                        <TableCell className="text-right font-mono text-muted-foreground">
                          {formatCurrency(opt.custoBaseline)}
                        </TableCell>
                        <TableCell className="text-right font-mono font-bold text-emerald-600">
                          {formatCurrency(opt.custoTarget)}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex flex-col items-end">
                            <span className="font-mono font-bold text-green-500">
                              {formatCurrency(opt.economiaEstimada)}
                            </span>
                            <span className="text-xs text-green-500">-{opt.percentual}%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          {opt.status === "aprovada" && (
                            <Badge className="bg-green-500">
                              <CheckCircle2 className="w-3 h-3 mr-1" />
                              Aprovada
                            </Badge>
                          )}
                          {opt.status === "em_analise" && (
                            <Badge variant="outline" className="text-blue-500">
                              <Clock className="w-3 h-3 mr-1" />
                              Em Analise
                            </Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  )
}
