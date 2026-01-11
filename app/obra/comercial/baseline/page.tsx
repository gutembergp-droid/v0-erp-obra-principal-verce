"use client"

import { Header } from "@/components/layout/header"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ObraComercialNavbar } from "../_components/obra-comercial-navbar"
import {
  CheckCircle2,
  Clock,
  FileText,
  Send,
  Eye,
  History,
  Lock,
  DollarSign,
  TrendingUp,
  AlertTriangle,
} from "lucide-react"

// Histórico de baselines
const baselinesMock = [
  {
    versao: "v1",
    status: "homologada",
    dataProposicao: "2024-01-20",
    dataHomologacao: "2024-01-25",
    valorTotal: 450000000,
    descricao: "Baseline inicial aprovada",
    autor: "João Silva",
    homologadoPor: "Diretor Corporativo",
  },
  {
    versao: "v2",
    status: "proposta",
    dataProposicao: "2026-01-10",
    dataHomologacao: null,
    valorTotal: 485000000,
    descricao: "Inclusão de aditivo AT-001 - Obras complementares ponte",
    autor: "Maria Santos",
    homologadoPor: null,
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

export default function BaselinePage() {
  const baselineAtiva = baselinesMock.find((b) => b.status === "homologada")
  const baselinePendente = baselinesMock.find((b) => b.status === "proposta")

  return (
    <div className="flex flex-col h-screen bg-muted/30 overflow-hidden">
      <div className="flex-shrink-0 z-40 mt-0">
        <ObraComercialNavbar />
      </div>

      <main className="flex-1 bg-background overflow-hidden p-6">
        <div className="h-full border-0 bg-background overflow-y-auto overflow-x-hidden scrollbar-hide p-6" style={{ borderRadius: '25px', boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.13), 0 2px 8px rgba(0, 0, 0, 0.05)', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <div className="space-y-6">
        {/* Conceito */}
        <Card className="border-cyan-500/20 bg-cyan-500/5">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-cyan-500/10">
                <CheckCircle2 className="w-6 h-6 text-cyan-500" />
              </div>
              <div>
                <h3 className="font-semibold">Conceito de Baseline</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  A Baseline Comercial representa a <strong>VERDADE ECONÔMICA OFICIAL</strong> da obra. É versionada,
                  auditável e imutável após homologação. A obra propõe, o corporativo homologa.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Métricas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Baseline Ativa</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">{baselineAtiva?.versao}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Homologada em {formatDate(baselineAtiva?.dataHomologacao || "")}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Valor Baseline Ativa</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(baselineAtiva?.valorTotal || 0)}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Proposta Pendente</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-500">
                {baselinePendente ? baselinePendente.versao : "-"}
              </div>
              {baselinePendente && (
                <p className="text-xs text-muted-foreground mt-1">Aguardando homologação corporativa</p>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Variação Proposta</CardTitle>
            </CardHeader>
            <CardContent>
              {baselinePendente && baselineAtiva ? (
                <>
                  <div className="text-2xl font-bold text-amber-500">
                    +{((baselinePendente.valorTotal / baselineAtiva.valorTotal - 1) * 100).toFixed(1)}%
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {formatCurrency(baselinePendente.valorTotal - baselineAtiva.valorTotal)}
                  </p>
                </>
              ) : (
                <div className="text-2xl font-bold">-</div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Baseline Pendente */}
        {baselinePendente && (
          <Card className="border-amber-500/30">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-500" />
                  <div>
                    <CardTitle className="text-base">Baseline Proposta Aguardando Homologação</CardTitle>
                    <CardDescription>{baselinePendente.descricao}</CardDescription>
                  </div>
                </div>
                <Badge variant="outline" className="text-amber-500 border-amber-500">
                  <Clock className="w-3 h-3 mr-1" />
                  Pendente
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-sm text-muted-foreground">Versão</p>
                  <p className="font-semibold">{baselinePendente.versao}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Valor Proposto</p>
                  <p className="font-semibold text-green-600">{formatCurrency(baselinePendente.valorTotal)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Data da Proposta</p>
                  <p className="font-semibold">{formatDate(baselinePendente.dataProposicao)}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Eye className="w-4 h-4 mr-2" />
                  Ver Detalhes
                </Button>
                <Button variant="outline">
                  <FileText className="w-4 h-4 mr-2" />
                  Comparar com v1
                </Button>
                <Button>
                  <Send className="w-4 h-4 mr-2" />
                  Reenviar para Homologação
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Histórico de Baselines */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <History className="w-5 h-5 text-muted-foreground" />
              <CardTitle className="text-base">Histórico de Baselines</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Versão</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Valor Total</TableHead>
                  <TableHead>Descrição</TableHead>
                  <TableHead>Proposta em</TableHead>
                  <TableHead>Homologada em</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {baselinesMock.map((baseline) => (
                  <TableRow key={baseline.versao}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {baseline.status === "homologada" && <Lock className="w-4 h-4 text-green-500" />}
                        <span className="font-mono font-bold">{baseline.versao}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {baseline.status === "homologada" ? (
                        <Badge className="bg-green-500">
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          Homologada
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-amber-500 border-amber-500">
                          <Clock className="w-3 h-3 mr-1" />
                          Proposta
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="font-mono">{formatCurrency(baseline.valorTotal)}</TableCell>
                    <TableCell className="max-w-[200px]">
                      <span className="line-clamp-1">{baseline.descricao}</span>
                    </TableCell>
                    <TableCell>{formatDate(baseline.dataProposicao)}</TableCell>
                    <TableCell>{baseline.dataHomologacao ? formatDate(baseline.dataHomologacao) : "-"}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4 mr-1" />
                        Ver
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Ações */}
        <div className="flex gap-3">
          <Button variant="outline">
            <TrendingUp className="w-4 h-4 mr-2" />
            Análise de Variações
          </Button>
          <Button>
            <DollarSign className="w-4 h-4 mr-2" />
            Propor Nova Baseline
          </Button>
        </div>
      </div>
    </>
  )
}
