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
import { Search, Users, CheckCircle2, Clock, FileSpreadsheet, AlertTriangle, ArrowRight, Send } from "lucide-react"

// Dados mockados de Medição do Cliente
const medicaoClienteMock = [
  {
    id: 1,
    codigo: "1.1",
    descricao: "Escavação de material de 1ª categoria",
    unidade: "m³",
    precoUnitario: 12.5,
    quantidadeMP: 45000,
    quantidadeMC: 42000,
    valorMC: 525000,
    divergencia: -3000,
    status: "aprovado",
  },
  {
    id: 2,
    codigo: "1.2",
    descricao: "Escavação de material de 2ª categoria",
    unidade: "m³",
    precoUnitario: 28.0,
    quantidadeMP: 22000,
    quantidadeMC: 22000,
    valorMC: 616000,
    divergencia: 0,
    status: "aprovado",
  },
  {
    id: 3,
    codigo: "1.3",
    descricao: "Escavação de material de 3ª categoria",
    unidade: "m³",
    precoUnitario: 85.0,
    quantidadeMP: 8500,
    quantidadeMC: 8500,
    valorMC: 722500,
    divergencia: 0,
    status: "aprovado",
  },
  {
    id: 4,
    codigo: "2.3",
    descricao: "CBUQ",
    unidade: "ton",
    precoUnitario: 380.0,
    quantidadeMP: 3500,
    quantidadeMC: 3200,
    valorMC: 1216000,
    divergencia: -300,
    status: "pendente",
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

function formatNumber(value: number) {
  return new Intl.NumberFormat("pt-BR").format(value)
}

export default function MedicaoClientePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [competencia, setCompetencia] = useState("jan-2026")

  const valorTotalMC = medicaoClienteMock.reduce((acc, item) => acc + item.valorMC, 0)
  const itensAprovados = medicaoClienteMock.filter((i) => i.status === "aprovado").length
  const itensDivergentes = medicaoClienteMock.filter((i) => i.divergencia !== 0).length

  return (
    <AppLayout>
      <Header
        title="Medição do Cliente (MC)"
        description="O que será FATURADO ao cliente - Pode divergir da MP, base para faturamento"
      />

      <div className="p-6 space-y-6">
        {/* Info */}
        <Card className="border-purple-500/20 bg-purple-500/5">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-purple-500/10">
                <Users className="w-6 h-6 text-purple-500" />
              </div>
              <div>
                <h3 className="font-semibold">Medição do Cliente (MC)</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Representa o que será <strong>FATURADO</strong> ao cliente. Pode divergir da MP (Medição de Produção).
                  Requer aprovação antes do faturamento.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Métricas */}
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
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Valor Total MC</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">{formatCurrency(valorTotalMC)}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Itens Aprovados</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">{itensAprovados}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Com Divergência</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-500">{itensDivergentes}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Status Gate 4</CardTitle>
            </CardHeader>
            <CardContent>
              <Badge variant="outline" className="text-amber-500">
                Pendente
              </Badge>
            </CardContent>
          </Card>
        </div>

        {/* Tabela */}
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <CardTitle className="text-base">Medição para Faturamento</CardTitle>
                <CardDescription>Quantidades e valores a faturar ao cliente</CardDescription>
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
                  Exportar
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
                  <TableHead className="text-right">P. Unit.</TableHead>
                  <TableHead className="text-right">Qtd MP</TableHead>
                  <TableHead className="text-right">Qtd MC</TableHead>
                  <TableHead className="text-right">Divergência</TableHead>
                  <TableHead className="text-right">Valor MC</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {medicaoClienteMock.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-mono">{item.codigo}</TableCell>
                    <TableCell>{item.descricao}</TableCell>
                    <TableCell className="text-center">
                      <Badge variant="outline">{item.unidade}</Badge>
                    </TableCell>
                    <TableCell className="text-right font-mono">{formatCurrency(item.precoUnitario)}</TableCell>
                    <TableCell className="text-right font-mono text-muted-foreground">
                      {formatNumber(item.quantidadeMP)}
                    </TableCell>
                    <TableCell className="text-right font-mono font-bold">{formatNumber(item.quantidadeMC)}</TableCell>
                    <TableCell className="text-right">
                      {item.divergencia !== 0 ? (
                        <span className="text-amber-500 font-mono flex items-center justify-end gap-1">
                          <AlertTriangle className="w-3 h-3" />
                          {formatNumber(item.divergencia)}
                        </span>
                      ) : (
                        <span className="text-green-500">-</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right font-mono font-bold text-green-600">
                      {formatCurrency(item.valorMC)}
                    </TableCell>
                    <TableCell className="text-center">
                      {item.status === "aprovado" ? (
                        <Badge className="bg-green-500">
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          Aprovado
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

        {/* Ações */}
        <div className="flex justify-between">
          <Button variant="outline">
            <ArrowRight className="w-4 h-4 mr-2" />
            Ver Comparativo MP x MC
          </Button>
          <div className="flex gap-2">
            <Button variant="outline">
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Aprovar Medição
            </Button>
            <Button>
              <Send className="w-4 h-4 mr-2" />
              Enviar para Faturamento
            </Button>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
