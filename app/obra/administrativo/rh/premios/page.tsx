"use client"

import { Suspense } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { RHNav } from "@/components/rh/rh-nav"
import { Award, Plus, Download, Clock, CheckCircle2, Scale } from "lucide-react"

// ============================================
// DADOS MOCKADOS
// ============================================

const premiosMock = [
  {
    id: 1,
    colaborador: "Jose Silva Santos",
    tipo: "Produtividade",
    valor: 1500,
    motivo: "Meta atingida - Escavacao",
    status: "Aprovado",
    dataAprovacao: "2026-01-05",
    riscoJuridico: false,
  },
  {
    id: 2,
    colaborador: "Maria Aparecida Costa",
    tipo: "Desempenho",
    valor: 3000,
    motivo: "Entrega antecipada do projeto",
    status: "Aprovado",
    dataAprovacao: "2026-01-03",
    riscoJuridico: false,
  },
  {
    id: 3,
    colaborador: "Paulo Mendes",
    tipo: "Seguranca",
    valor: 800,
    motivo: "Zero acidentes no trimestre",
    status: "Pendente",
    dataAprovacao: null,
    riscoJuridico: false,
  },
  {
    id: 4,
    colaborador: "Carlos Eduardo Lima",
    tipo: "Produtividade",
    valor: 2000,
    motivo: "Reducao de custos",
    status: "Pendente",
    dataAprovacao: null,
    riscoJuridico: true,
  },
  {
    id: 5,
    colaborador: "Juliana Santos",
    tipo: "Assiduidade",
    valor: 500,
    motivo: "100% de presenca no semestre",
    status: "Aprovado",
    dataAprovacao: "2026-01-02",
    riscoJuridico: false,
  },
]

// ============================================
// COMPONENTE PRINCIPAL
// ============================================

function PremiosContent() {
  const premiosConcedidos = premiosMock.filter((p) => p.status === "Aprovado").length
  const valorTotal = premiosMock.filter((p) => p.status === "Aprovado").reduce((acc, p) => acc + p.valor, 0)
  const pendentesAprovacao = premiosMock.filter((p) => p.status === "Pendente").length

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
              <Award className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Premios & Bonificacoes</h1>
              <p className="text-sm text-muted-foreground">Gestao de premios e bonificacoes</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Exportar
            </Button>
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Novo Premio
            </Button>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-card/50">
            <CardContent className="p-4 text-center">
              <Award className="h-5 w-5 mx-auto mb-1 text-green-500" />
              <p className="text-2xl font-bold">{premiosConcedidos}</p>
              <p className="text-xs text-muted-foreground">Premios Concedidos</p>
            </CardContent>
          </Card>
          <Card className="bg-green-500/10 border-green-500/30">
            <CardContent className="p-4 text-center">
              <CheckCircle2 className="h-5 w-5 mx-auto mb-1 text-green-500" />
              <p className="text-2xl font-bold text-green-500">{formatCurrency(valorTotal)}</p>
              <p className="text-xs text-green-400">Valor Total</p>
            </CardContent>
          </Card>
          <Card className="bg-yellow-500/10 border-yellow-500/30">
            <CardContent className="p-4 text-center">
              <Clock className="h-5 w-5 mx-auto mb-1 text-yellow-500" />
              <p className="text-2xl font-bold text-yellow-500">{pendentesAprovacao}</p>
              <p className="text-xs text-yellow-400">Pend. Aprovacao</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabela */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-medium">Lista de Premios</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Colaborador</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Motivo</TableHead>
                  <TableHead className="text-right">Valor</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-center">Juridico</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {premiosMock.map((premio) => (
                  <TableRow key={premio.id}>
                    <TableCell className="font-medium">{premio.colaborador}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{premio.tipo}</Badge>
                    </TableCell>
                    <TableCell className="max-w-[200px] truncate">{premio.motivo}</TableCell>
                    <TableCell className="text-right font-medium">{formatCurrency(premio.valor)}</TableCell>
                    <TableCell>
                      {premio.status === "Aprovado" ? (
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Aprovado</Badge>
                      ) : (
                        <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Pendente</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      {premio.riscoJuridico && <Scale className="h-4 w-4 text-orange-500 mx-auto" />}
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

export default function PremiosPage() {
  return (
    <Suspense fallback={null}>
      <PremiosContent />
    </Suspense>
  )
}
