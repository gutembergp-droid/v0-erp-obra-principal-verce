"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { ObraComercialNavbar } from "../_components/obra-comercial-navbar"
import {
  CheckCircle2,
  Clock,
  FileText,
  Send,
  Eye,
  ArrowUpRight,
  ArrowDownRight,
  Receipt,
  PlusCircle,
} from "lucide-react"

// Dados mockados de Medicoes
const medicoesMock = [
  {
    id: "MED-001",
    competencia: "Janeiro/2026",
    tipo: "MP",
    valorBruto: 3200000,
    retencoes: 160000,
    valorLiquido: 3040000,
    status: "fechada",
    dataFechamento: "2026-01-31",
  },
  {
    id: "MED-002",
    competencia: "Janeiro/2026",
    tipo: "MC",
    valorBruto: 3079500,
    retencoes: 153975,
    valorLiquido: 2925525,
    status: "aprovada",
    dataFechamento: "2026-02-02",
  },
  {
    id: "MED-003",
    competencia: "Fevereiro/2026",
    tipo: "MP",
    valorBruto: 0,
    retencoes: 0,
    valorLiquido: 0,
    status: "aberta",
    dataFechamento: null,
  },
]

// Dados mockados de Aditivos
const aditivosMock = [
  {
    id: "AT-001",
    descricao: "Obras complementares ponte - Fundacao adicional",
    tipo: "acrescimo",
    valor: 35000000,
    status: "aprovado",
    dataAprovacao: "2026-01-15",
    impactoBaseline: "+7.8%",
  },
  {
    id: "AT-002",
    descricao: "Reducao de escopo - Trecho km 142-145",
    tipo: "supressao",
    valor: -12000000,
    status: "em_analise",
    dataAprovacao: null,
    impactoBaseline: "-2.7%",
  },
]

// Dados mockados de Faturamento
const faturamentoMock = [
  {
    id: "NF-001",
    medicao: "MED-002",
    competencia: "Janeiro/2026",
    valor: 2925525,
    dataEmissao: "2026-02-05",
    dataVencimento: "2026-03-05",
    status: "emitida",
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

export default function ReceitaPage() {
  const [tab, setTab] = useState("medicoes")

  const valorContrato = 450000000
  const valorAditivos = aditivosMock.filter((a) => a.status === "aprovado").reduce((acc, a) => acc + a.valor, 0)
  const valorAtual = valorContrato + valorAditivos
  const valorFaturado = faturamentoMock.reduce((acc, f) => acc + f.valor, 0)
  const percentualFaturado = (valorFaturado / valorAtual) * 100

  return (
    <div className="flex flex-col h-screen bg-muted/30 overflow-hidden">
      <div className="flex-shrink-0 z-40 mt-0">
        <ObraComercialNavbar />
      </div>

      <main className="flex-1 bg-background overflow-hidden p-6">
        <div className="h-full border-0 bg-background overflow-y-auto overflow-x-hidden scrollbar-hide p-6" style={{ borderRadius: '25px', boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.13), 0 2px 8px rgba(0, 0, 0, 0.05)', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <div className="space-y-6">
        {/* Metricas */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Valor Contrato</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(valorContrato)}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Aditivos Aprovados</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${valorAditivos >= 0 ? "text-green-500" : "text-red-500"}`}>
                {valorAditivos >= 0 ? "+" : ""}
                {formatCurrency(valorAditivos)}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Valor Atual</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{formatCurrency(valorAtual)}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Faturado</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">{formatCurrency(valorFaturado)}</div>
              <Progress value={percentualFaturado} className="mt-2 h-2" />
              <p className="text-xs text-muted-foreground mt-1">{percentualFaturado.toFixed(1)}% do contrato</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">A Faturar</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-500">{formatCurrency(valorAtual - valorFaturado)}</div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="medicoes">
              <FileText className="w-4 h-4 mr-2" />
              Medicoes
            </TabsTrigger>
            <TabsTrigger value="aditivos">
              <PlusCircle className="w-4 h-4 mr-2" />
              Aditivos
            </TabsTrigger>
            <TabsTrigger value="faturamento">
              <Receipt className="w-4 h-4 mr-2" />
              Faturamento
            </TabsTrigger>
          </TabsList>

          {/* Medicoes */}
          <TabsContent value="medicoes">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <CardTitle className="text-base">Medicoes</CardTitle>
                    <CardDescription>MP (Producao) e MC (Cliente) por competencia</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline">
                      <Eye className="w-4 h-4 mr-2" />
                      Comparativo MP x MC
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Competencia</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead className="text-right">Valor Bruto</TableHead>
                      <TableHead className="text-right">Retencoes</TableHead>
                      <TableHead className="text-right">Valor Liquido</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {medicoesMock.map((med) => (
                      <TableRow key={med.id}>
                        <TableCell className="font-mono font-bold">{med.id}</TableCell>
                        <TableCell>{med.competencia}</TableCell>
                        <TableCell>
                          <Badge variant={med.tipo === "MP" ? "default" : "secondary"}>{med.tipo}</Badge>
                        </TableCell>
                        <TableCell className="text-right font-mono">{formatCurrency(med.valorBruto)}</TableCell>
                        <TableCell className="text-right font-mono text-red-500">
                          -{formatCurrency(med.retencoes)}
                        </TableCell>
                        <TableCell className="text-right font-mono font-bold text-green-600">
                          {formatCurrency(med.valorLiquido)}
                        </TableCell>
                        <TableCell>
                          {med.status === "fechada" && (
                            <Badge className="bg-green-500">
                              <CheckCircle2 className="w-3 h-3 mr-1" />
                              Fechada
                            </Badge>
                          )}
                          {med.status === "aprovada" && (
                            <Badge className="bg-blue-500">
                              <CheckCircle2 className="w-3 h-3 mr-1" />
                              Aprovada
                            </Badge>
                          )}
                          {med.status === "aberta" && (
                            <Badge variant="outline" className="text-amber-500">
                              <Clock className="w-3 h-3 mr-1" />
                              Aberta
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Aditivos */}
          <TabsContent value="aditivos">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <CardTitle className="text-base">Gestao de Aditivos</CardTitle>
                    <CardDescription>Acrescimos e supressoes contratuais</CardDescription>
                  </div>
                  <Button>
                    <PlusCircle className="w-4 h-4 mr-2" />
                    Novo Aditivo
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Descricao</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead className="text-right">Valor</TableHead>
                      <TableHead>Impacto Baseline</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {aditivosMock.map((adt) => (
                      <TableRow key={adt.id}>
                        <TableCell className="font-mono font-bold">{adt.id}</TableCell>
                        <TableCell>{adt.descricao}</TableCell>
                        <TableCell>
                          {adt.tipo === "acrescimo" ? (
                            <Badge className="bg-green-500">
                              <ArrowUpRight className="w-3 h-3 mr-1" />
                              Acrescimo
                            </Badge>
                          ) : (
                            <Badge variant="destructive">
                              <ArrowDownRight className="w-3 h-3 mr-1" />
                              Supressao
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell
                          className={`text-right font-mono font-bold ${adt.valor >= 0 ? "text-green-600" : "text-red-600"}`}
                        >
                          {adt.valor >= 0 ? "+" : ""}
                          {formatCurrency(adt.valor)}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{adt.impactoBaseline}</Badge>
                        </TableCell>
                        <TableCell>
                          {adt.status === "aprovado" && (
                            <Badge className="bg-green-500">
                              <CheckCircle2 className="w-3 h-3 mr-1" />
                              Aprovado
                            </Badge>
                          )}
                          {adt.status === "em_analise" && (
                            <Badge variant="outline" className="text-amber-500">
                              <Clock className="w-3 h-3 mr-1" />
                              Em Analise
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Faturamento */}
          <TabsContent value="faturamento">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <CardTitle className="text-base">Faturamento</CardTitle>
                    <CardDescription>Notas fiscais emitidas</CardDescription>
                  </div>
                  <Button>
                    <Send className="w-4 h-4 mr-2" />
                    Emitir NF
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>NF</TableHead>
                      <TableHead>Medicao</TableHead>
                      <TableHead>Competencia</TableHead>
                      <TableHead className="text-right">Valor</TableHead>
                      <TableHead>Emissao</TableHead>
                      <TableHead>Vencimento</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {faturamentoMock.map((fat) => (
                      <TableRow key={fat.id}>
                        <TableCell className="font-mono font-bold">{fat.id}</TableCell>
                        <TableCell className="font-mono">{fat.medicao}</TableCell>
                        <TableCell>{fat.competencia}</TableCell>
                        <TableCell className="text-right font-mono font-bold text-green-600">
                          {formatCurrency(fat.valor)}
                        </TableCell>
                        <TableCell>{new Date(fat.dataEmissao).toLocaleDateString("pt-BR")}</TableCell>
                        <TableCell>{new Date(fat.dataVencimento).toLocaleDateString("pt-BR")}</TableCell>
                        <TableCell>
                          <Badge className="bg-green-500">
                            <CheckCircle2 className="w-3 h-3 mr-1" />
                            Emitida
                          </Badge>
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
        </div>
      </main>
    </div>
  )
}
