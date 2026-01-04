"use client"

import { AppLayout } from "@/components/layout/app-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { CalendarCheck, CheckCircle, Clock, FileText, Lock, ChevronRight, Download } from "lucide-react"
import { InfoTooltip } from "@/components/ui/info-tooltip"

const etapasEncerramento = [
  { id: 1, nome: "Fechamento Producao", status: "concluido", responsavel: "Producao", prazo: "01/01/2026" },
  { id: 2, nome: "Validacao Apontamentos", status: "concluido", responsavel: "Engenharia", prazo: "02/01/2026" },
  { id: 3, nome: "Fechamento Custo", status: "em-andamento", responsavel: "Comercial", prazo: "03/01/2026" },
  { id: 4, nome: "Conciliacao Estoque", status: "pendente", responsavel: "Suprimentos", prazo: "04/01/2026" },
  { id: 5, nome: "Medicao Subcontratados", status: "pendente", responsavel: "Comercial", prazo: "05/01/2026" },
  { id: 6, nome: "Validacao QSMS", status: "pendente", responsavel: "QSMS", prazo: "06/01/2026" },
  { id: 7, nome: "Fechamento Financeiro", status: "pendente", responsavel: "Financeiro", prazo: "07/01/2026" },
  { id: 8, nome: "Geracao DRE Obra", status: "pendente", responsavel: "Controladoria", prazo: "08/01/2026" },
]

const documentosMensais = [
  { id: 1, nome: "Relatorio de Producao", status: "aprovado", data: "01/01/2026" },
  { id: 2, nome: "Boletim de Medicao #23", status: "aprovado", data: "02/01/2026" },
  { id: 3, nome: "Mapa de Custo", status: "em-revisao", data: "03/01/2026" },
  { id: 4, nome: "Conciliacao Bancaria", status: "pendente", data: "-" },
  { id: 5, nome: "DRE Mensal", status: "pendente", data: "-" },
]

const metricas = [
  { label: "Etapas Concluidas", valor: "2/8", progresso: 25 },
  { label: "Documentos Aprovados", valor: "2/5", progresso: 40 },
  { label: "Dias para Fechamento", valor: "4", progresso: 80 },
]

export default function EncerramentoPage() {
  return (
    <AppLayout>
      <div className="flex flex-col h-[calc(100vh-80px)] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-green-500/20 to-green-500/5 border border-green-500/20">
              <CalendarCheck className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-foreground">Encerramento Mensal</h1>
                <InfoTooltip
                  title="Encerramento Mensal"
                  description="Fluxo de fechamento mensal do contrato. Acompanhe cada etapa do encerramento, documentos pendentes e prazos."
                />
              </div>
              <p className="text-sm text-muted-foreground">Dezembro/2025 - BR-101 LOTE 2</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">
              <Clock className="w-3 h-3 mr-1" />
              Em Andamento
            </Badge>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </Button>
            <Button>
              <Lock className="w-4 h-4 mr-2" />
              Fechar Mes
            </Button>
          </div>
        </div>

        {/* Progress Cards */}
        <div className="grid grid-cols-3 gap-4 mb-6 flex-shrink-0">
          {metricas.map((metrica) => (
            <Card key={metrica.label} className="border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-muted-foreground">{metrica.label}</p>
                  <p className="text-xl font-bold">{metrica.valor}</p>
                </div>
                <Progress value={metrica.progresso} className="h-2" />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Conteudo */}
        <div className="flex-1 min-h-0 grid grid-cols-2 gap-6">
          {/* Fluxo de Encerramento */}
          <Card className="flex flex-col border-border/50 min-h-0">
            <CardHeader className="py-3 flex-shrink-0">
              <CardTitle className="text-base">Fluxo de Encerramento</CardTitle>
              <CardDescription>8 etapas para conclusao</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 min-h-0">
              <ScrollArea className="h-full">
                <div className="space-y-2">
                  {etapasEncerramento.map((etapa, index) => (
                    <div
                      key={etapa.id}
                      className={`flex items-center gap-3 p-3 rounded-lg border ${
                        etapa.status === "concluido"
                          ? "border-green-500/30 bg-green-500/5"
                          : etapa.status === "em-andamento"
                            ? "border-yellow-500/30 bg-yellow-500/5"
                            : "border-border/50"
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          etapa.status === "concluido"
                            ? "bg-green-500 text-white"
                            : etapa.status === "em-andamento"
                              ? "bg-yellow-500 text-white"
                              : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {etapa.status === "concluido" ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : etapa.status === "em-andamento" ? (
                          <Clock className="w-4 h-4" />
                        ) : (
                          <span className="text-sm font-medium">{index + 1}</span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium">{etapa.nome}</p>
                        <p className="text-xs text-muted-foreground">{etapa.responsavel}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">{etapa.prazo}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Documentos do Mes */}
          <Card className="flex flex-col border-border/50 min-h-0">
            <CardHeader className="py-3 flex-shrink-0">
              <CardTitle className="text-base">Documentos do Mes</CardTitle>
              <CardDescription>Documentos para fechamento</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 min-h-0">
              <ScrollArea className="h-full">
                <div className="space-y-2">
                  {documentosMensais.map((doc) => (
                    <div
                      key={doc.id}
                      className="flex items-center justify-between p-3 rounded-lg border border-border/50 hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                          <FileText className="w-5 h-5 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{doc.nome}</p>
                          <p className="text-xs text-muted-foreground">{doc.data}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={
                            doc.status === "aprovado"
                              ? "default"
                              : doc.status === "em-revisao"
                                ? "secondary"
                                : "outline"
                          }
                          className="text-xs"
                        >
                          {doc.status}
                        </Badge>
                        <Button size="icon" variant="ghost" className="h-8 w-8">
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  )
}
