"use client"

import { AppLayout } from "@/components/layout/app-layout"
import { Header } from "@/components/layout/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText } from "lucide-react"

// Dados mockados de aditivos
const aditivosMock = [
  {
    id: 1,
    numero: "AT-001",
    descricao: "Obras complementares ponte Rio Paraíba",
    tipo: "acrescimo",
    valorOriginal: 450000000,
    valorAditivo: 35000000,
    percentual: 7.78,
    dataAprovacao: "2026-01-05",
    status: "aprovado",
    impactoBaseline: "v2",
  },
  {
    id: 2,
    numero: "AT-002",
    descricao: "Extensão do prazo contratual - 6 meses",
    tipo: "prazo",
    valorOriginal: 485000000,
    valorAditivo: 0,
    percentual: 0,
    dataAprovacao: null,
    status: "em_analise",
    impactoBaseline: null,
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

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("pt-BR")
}

export default function AditivosPage() {
  const totalAditivos = aditivosMock.filter((a) => a.status === "aprovado").reduce((acc, a) => acc + a.valorAditivo, 0)

  return (
    <AppLayout>
      <Header
        title="Aditivos Contratuais"
        description="Gestão de aditivos - Aditivos geram nova versão de baseline"
      />

      <div className="p-6 space-y-6">
        {/* Info */}
        <Card className="border-blue-500/20 bg-blue-500/5">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-blue-500/10">
                <FileText className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <h3 className="font-semibold">Aditivos Contratuais</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Aditivos geram <strong>nova versão de baseline</strong>. Podem ser de acréscimo de valor, supressão ou
                  prazo. Impactam diretamente a EAP e as medições.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Métricas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Valor Original</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(450000000)}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Aditivos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">+{formatCurrency(totalAditivos)}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Valor Atualizado</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{formatCurrency(450000000 + totalAditivos)}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Em Análise</Car\
