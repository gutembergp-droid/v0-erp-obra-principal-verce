"use client"

import { useState } from "react"
import { AppLayout } from "@/components/layout/app-layout"
import { Header } from "@/components/layout/header"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Search, Factory, CheckCircle2, Clock, FileSpreadsheet, ArrowRight } from "lucide-react"

// Dados mockados de Medição de Produção
const medicaoProducaoMock = [
  {
    id: 1,
    codigo: "1.1",
    descricao: "Escavação de material de 1ª categoria",
    unidade: "m³",
    quantidadeBaseline: 850000,
    acumuladoAnterior: 320000,
    medicaoMes: 45000,
    acumuladoAtual: 365000,
    percentualAcumulado: 42.9,
    status: "medido",
  },
  {
    id: 2,
    codigo: "1.2",
    descricao: "Escavação de material de 2ª categoria",
    unidade: "m³",
    quantidadeBaseline: 320000,
    acumuladoAnterior: 180000,
    medicaoMes: 22000,
    acumuladoAtual: 202000,
    percentualAcumulado: 63.1,
    status: "medido",
  },
  {
    id: 3,
    codigo: "1.3",
    descricao: "Escavação de material de 3ª categoria",
    unidade: "m³",
    quantidadeBaseline: 180000,
    acumuladoAnterior: 45000,
    medicaoMes: 8500,
    acumuladoAtual: 53500,
    percentualAcumulado: 29.7,
    status: "medido",
  },
  {
    id: 4,
    codigo: "2.1",
    descricao: "Sub-base granular",
    unidade: "m³",
    quantidadeBaseline: 125000,
    acumuladoAnterior: 28000,
    medicaoMes: 0,
    acumuladoAtual: 28000,
    percentualAcumulado: 22.4,
    status: "pendente",
  },
  {
    id: 5,
    codigo: "2.3",
    descricao: "CBUQ",
    unidade: "ton",
    quantidadeBaseline: 85000,
    acumuladoAnterior: 12000,
    medicaoMes: 3500,
    acumuladoAtual: 15500,
    percentualAcumulado: 18.2,
    status: "medido",
  },
]

function formatNumber(value: number) {
  return new Intl.NumberFormat("pt-BR").format(value)
}

export default function MedicaoProducaoPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [competencia, setCompetencia] = useState("jan-2026")

  const totalMedicaoMes = medicaoProducaoMock.reduce((acc, item) => {
    const valorUnitario = 50 // simplificação
    return acc + item.medicaoMes * valorUnitario
  }, 0)

  const itensMedidos = medicaoProducaoMock.filter((i) => i.status === "medido").length
  const itensPendentes = medicaoProducaoMock.filter((i) => i.status === "pendente").length

  return (
    <AppLayout>
      <Header
        title="Medição de Produção (MP)"
        description="O que foi REALMENTE EXECUTADO - Base para apropriação de custos e análise de desempenho"
      />

      <div className="p-6 space-y-6">
        {/* Info */}
        <Card className="border-green-500/20 bg-green-500/5">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-green-500/10">
                <Factory className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <h3 className="font-semibold">Medição de Produção (MP)</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Origem: Produção lança apontamentos diários → Comercial consolida em MP mensal. Base para apropriação
                  de custos e análise de desempenho.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Competência e Métricas */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Competência</CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={competencia} onValueChange={setCompetencia}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="jan-2026">Janeiro/2026</SelectItem>
                  <SelectItem value="dez-2025">Dezembro/2025</SelectItem>
                  <SelectItem value="nov-2025">Novembro/2025</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Itens Medidos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">{itensMedidos}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Itens Pendentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-500">{itensPendentes}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Status Gate 2</CardTitle>
            </CardHeader>
            <CardContent>
              {itensPendentes === 0 ? (
                <Badge className="bg-green-500">Aprovado</Badge>
              ) : (
                <Badge variant="outline" className="text-amber-500">
                  Pendente
                </Badge>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Progresso</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {((itensMedidos / medicaoProducaoMock.length) * 100).toFixed(0)}%
              </div>
              <Progress value={(itensMedidos / medicaoProducaoMock.length) * 100} className="mt-2 h-2" />
            </CardContent>
          </Card>
        </div>

        {/* Tabela */}
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <CardTitle className="text-base">Medição do Período</CardTitle>
                <CardDescription>Quantidades executadas no mês</CardDescription>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar item..."
                    className="pl-9 w-48"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button variant="outline">
                  <FileSpreadsheet className="w-4 h-4 mr-2" />
                  Importar Apontamentos
                </Button>
                <Button>
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Fechar Medição
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Código</TableHead>
                  <TableHead>Descrição</TableHead>
                  <TableHead className="text-center">Un</TableHead>
                  <TableHead className="text-right">Baseline</TableHead>
                  <TableHead className="text-right">Acum. Ant.</TableHead>
                  <TableHead className="text-right">Medição Mês</TableHead>
                  <TableHead className="text-right">Acum. Atual</TableHead>
                  <TableHead className="text-right">%</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {medicaoProducaoMock.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-mono">{item.codigo}</TableCell>
                    <TableCell>{item.descricao}</TableCell>
                    <TableCell className="text-center">
                      <Badge variant="outline">{item.unidade}</Badge>
                    </TableCell>
                    <TableCell className="text-right font-mono">{formatNumber(item.quantidadeBaseline)}</TableCell>
                    <TableCell className="text-right font-mono text-muted-foreground">
                      {formatNumber(item.acumuladoAnterior)}
                    </TableCell>
                    <TableCell className="text-right font-mono font-bold text-primary">
                      {item.medicaoMes > 0 ? `+${formatNumber(item.medicaoMes)}` : "-"}
                    </TableCell>
                    <TableCell className="text-right font-mono">{formatNumber(item.acumuladoAtual)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Progress value={item.percentualAcumulado} className="w-16 h-2" />
                        <span className="text-sm font-mono w-12">{item.percentualAcumulado.toFixed(1)}%</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      {item.status === "medido" ? (
                        <Badge className="bg-green-500">
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          Medido
                        </Badge>
                      ) : (
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

        {/* Ação */}
        <div className="flex justify-end">
          <Button>
            Ir para Medição Cliente (MC)
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </AppLayout>
  )
}
