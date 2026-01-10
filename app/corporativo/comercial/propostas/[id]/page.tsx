"use client"

import { use } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, FileText, CheckCircle2, AlertCircle, Send } from "lucide-react"
import { useState } from "react"
import { ComercialSidebar } from "../../_components/comercial-sidebar"
import { ComercialTopBar } from "../../_components/comercial-top-bar"
import { RadarViabilidade } from "../_components/radar-viabilidade"
import { MatrizRisco } from "../_components/matriz-risco"

// ============================================================================
// INTERFACES
// ============================================================================

interface Proposta {
  id: string
  cliente: string
  obra: string
  valor: number
  status: string
  progresso: number
}

// ============================================================================
// COMPONENT
// ============================================================================

export default function PropostaDetalhesPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const router = useRouter()

  // Mock data da proposta
  const proposta: Proposta = {
    id: id,
    cliente: "Construtora ABC",
    obra: "Ponte Rio Grande",
    valor: 450000000,
    status: "em_analise",
    progresso: 65
  }

  const formatCurrency = (value: number) => {
    if (value >= 1000000000) return `R$ ${(value / 1000000000).toFixed(1)}Bi`
    if (value >= 1000000) return `R$ ${(value / 1000000).toFixed(0)}Mi`
    return `R$ ${value.toLocaleString("pt-BR")}`
  }

  return (
    <div className="flex h-screen bg-muted/30">
      <ComercialSidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <ComercialTopBar titulo={`Proposta ${id}`} hideNovaPropostaButton={true} />

        <main className="flex-1 overflow-auto">
          <div className="max-w-[1600px] mx-auto p-6 space-y-6">
            {/* Header Compacto */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm" onClick={() => router.back()}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Voltar
                </Button>
                <div className="h-6 w-px bg-border" />
                <div>
                  <h1 className="text-2xl font-bold">{proposta.id}</h1>
                  <p className="text-sm text-muted-foreground">{proposta.cliente} • {proposta.obra}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="text-sm px-3 py-1">
                  Em Análise
                </Badge>
                <Button variant="outline" size="sm">
                  <FileText className="w-4 h-4 mr-2" />
                  Exportar PDF
                </Button>
              </div>
            </div>

            {/* Barra de Progresso */}
            <Card>
              <CardContent className="py-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Progresso da Análise</span>
                  <span className="text-sm font-bold text-primary">{proposta.progresso}%</span>
                </div>
                <Progress value={proposta.progresso} className="h-2" />
                <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                  <span>4 de 6 etapas concluídas</span>
                  <span>Estimativa: 2 dias restantes</span>
                </div>
              </CardContent>
            </Card>

            {/* Tabs Principais */}
            <Tabs defaultValue="analise" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="analise">Análise Corporativa</TabsTrigger>
                <TabsTrigger value="documentos">Documentos</TabsTrigger>
                <TabsTrigger value="decisao">Decisão</TabsTrigger>
              </TabsList>

              {/* TAB: ANÁLISE CORPORATIVA */}
              <TabsContent value="analise" className="space-y-6 mt-6">
                {/* Resumo Executivo */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Resumo Executivo</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-4 gap-4">
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Valor</p>
                        <p className="text-lg font-bold">{formatCurrency(proposta.valor)}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Margem Estimada</p>
                        <p className="text-lg font-bold text-emerald-600">12,5%</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Prazo</p>
                        <p className="text-lg font-bold">18 meses</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Viabilidade</p>
                        <p className="text-lg font-bold text-emerald-600">Viável</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Layout em 2 Colunas */}
                <div className="grid grid-cols-2 gap-6">
                  {/* Coluna Esquerda: Radar */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Análise de Viabilidade (6 Pilares)</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <RadarViabilidade 
                        analise={{
                          pilares: {
                            tecnica: { score: 8, comentario: "Capacidade técnica comprovada" },
                            operacional: { score: 7, comentario: "Equipe disponível" },
                            financeira: { score: 9, comentario: "Capital adequado" },
                            economica: { score: 6, comentario: "Margem aceitável" },
                            juridica: { score: 8, comentario: "Sem restrições" },
                            risco: { score: 7, comentario: "Riscos gerenciáveis" },
                          },
                          conclusao: "viavel",
                          observacoes: "Projeto estratégico alinhado"
                        }}
                      />
                      <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span className="text-sm font-medium text-emerald-900">
                            Projeto estratégico alinhado
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Coluna Direita: Análise Jurídica + Matriz de Risco */}
                  <div className="space-y-6">
                    {/* Análise Jurídica */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Análise Jurídica</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Exigências Conformes</span>
                          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Licenças OK</span>
                          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Cláusulas Atípicas</span>
                          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Risco Regulatório</span>
                          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                        </div>
                        <div className="pt-3 border-t">
                          <p className="text-xs text-muted-foreground mb-1">Parecer:</p>
                          <p className="text-sm font-medium">Contrato dentro dos padrões</p>
                        </div>
                        <Badge variant="outline" className="w-full justify-center bg-emerald-50 text-emerald-700 border-emerald-300">
                          Status: Seguro
                        </Badge>
                      </CardContent>
                    </Card>

                    {/* Resumo de Riscos */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Resumo de Riscos</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-4 gap-2 mb-4">
                          <div className="text-center p-2 bg-emerald-50 border border-emerald-200 rounded">
                            <p className="text-2xl font-bold text-emerald-600">0</p>
                            <p className="text-xs text-emerald-700">Baixo</p>
                          </div>
                          <div className="text-center p-2 bg-amber-50 border border-amber-200 rounded">
                            <p className="text-2xl font-bold text-amber-600">1</p>
                            <p className="text-xs text-amber-700">Médio</p>
                          </div>
                          <div className="text-center p-2 bg-orange-50 border border-orange-200 rounded">
                            <p className="text-2xl font-bold text-orange-600">0</p>
                            <p className="text-xs text-orange-700">Alto</p>
                          </div>
                          <div className="text-center p-2 bg-red-50 border border-red-200 rounded">
                            <p className="text-2xl font-bold text-red-600">0</p>
                            <p className="text-xs text-red-700">Crítico</p>
                          </div>
                        </div>
                        <div className="p-3 bg-muted rounded border">
                          <p className="text-xs font-medium mb-1">Risco Identificado:</p>
                          <p className="text-sm">Atraso em licenças ambientais</p>
                          <p className="text-xs text-muted-foreground mt-1">Mitigação: Antecipar processos</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Matriz de Risco (Full Width) */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Matriz de Risco (5x5)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <MatrizRisco 
                      riscos={[
                        {
                          id: "R1",
                          descricao: "Atraso em licenças ambientais",
                          categoria: "juridico",
                          probabilidade: 3,
                          impacto: 4,
                          classificacao: "medio",
                          mitigacao: "Antecipar processos",
                        },
                      ]}
                    />
                  </CardContent>
                </Card>
              </TabsContent>

              {/* TAB: DOCUMENTOS */}
              <TabsContent value="documentos" className="space-y-6 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Documentação da Proposta</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12 text-muted-foreground">
                      <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p>Documentos serão listados aqui</p>
                      <p className="text-sm mt-1">Editais, memoriais, projetos, etc.</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* TAB: DECISÃO */}
              <TabsContent value="decisao" className="space-y-6 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Decisão Corporativa</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-3 gap-4">
                      <Button size="lg" className="h-24 flex-col gap-2">
                        <CheckCircle2 className="w-6 h-6" />
                        <span>Aprovar para Disputa</span>
                      </Button>
                      <Button size="lg" variant="outline" className="h-24 flex-col gap-2">
                        <AlertCircle className="w-6 h-6" />
                        <span>Aprovar com Ressalvas</span>
                      </Button>
                      <Button size="lg" variant="destructive" className="h-24 flex-col gap-2">
                        <AlertCircle className="w-6 h-6" />
                        <span>Reprovar/Arquivar</span>
                      </Button>
                    </div>

                    <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
                        <div>
                          <p className="font-medium text-sm text-amber-900">Pré-requisitos para Liberação</p>
                          <ul className="text-sm text-amber-800 mt-2 space-y-1">
                            <li>✓ Cadastro completo</li>
                            <li>✓ Documentos mínimos OK</li>
                            <li>✓ 6 pilares preenchidos</li>
                            <li>✓ Status jurídico seguro</li>
                            <li>✓ Matriz de risco preenchida</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-center pt-4">
                      <Button size="lg" className="gap-2">
                        <Send className="w-5 h-5" />
                        Liberar para Funil Competitivo
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}
