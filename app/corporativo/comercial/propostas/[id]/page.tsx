"use client"

import { use } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, CheckCircle2, Clock, Lock, Save, Send, ChevronLeft, ChevronDown, ChevronUp } from "lucide-react"
import { useState } from "react"
import { ComercialSidebar } from "../../_components/comercial-sidebar"
import { ComercialTopBar } from "../../_components/comercial-top-bar"
import { RadarViabilidade } from "../_components/radar-viabilidade"
import { MatrizRisco } from "../_components/matriz-risco"
import type { PropostaCompleta, StatusBloco } from "@/lib/types/proposta"
import { podeLiberarParaFunil } from "@/lib/types/proposta"

// ============================================================================
// COMPONENT - DETALHES DA PROPOSTA (ANÁLISE CORPORATIVA)
// ============================================================================

export default function PropostaDetalhesPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const router = useRouter()
  
  const [expandido, setExpandido] = useState<Record<string, boolean>>({
    cadastro: true,
    juridica: false,
  })

  // Mock data (em produção viria do contexto/API baseado no ID)
  const [proposta] = useState<PropostaCompleta>({
    id: id,
    status: "em_analise",
    statusBlocos: {
      cadastro: "completo",
      documentos: "em_andamento",
      analiseViabilidade: "completo",
      analiseJuridica: "completo",
      analiseRisco: "completo",
      decisao: "pendente",
    },
    cadastro: {
      clienteId: "CLI-001",
      clienteNome: "Construtora ABC",
      nomeObra: "Ponte Rio Grande",
      tipoObra: "infraestrutura",
      localizacao: { cidade: "São Paulo", estado: "SP", regiao: "Sudeste" },
      origem: "prospeccao",
      valorPublico: true,
      valor: 450000000,
      regimeContratual: "Empreitada por preço global",
    },
    documentos: [],
    analiseViabilidade: {
      pilares: {
        tecnica: { score: 8, comentario: "Capacidade técnica comprovada" },
        operacional: { score: 7, comentario: "Equipe disponível" },
        financeira: { score: 9, comentario: "Capital de giro adequado" },
        economica: { score: 6, comentario: "Margem aceitável" },
        juridica: { score: 8, comentario: "Sem restrições" },
        risco: { score: 7, comentario: "Riscos gerenciáveis" },
      },
      conclusao: "viavel",
      observacoes: "Projeto estratégico alinhado",
    },
    analiseJuridica: {
      exigenciasConformes: true,
      licencasOk: true,
      clausulasAtipicas: false,
      riscoRegulatorio: false,
      parecer: "Contrato dentro dos padrões",
      status: "seguro",
    },
    analiseRisco: {
      riscos: [
        {
          id: "R1",
          descricao: "Atraso em licenças ambientais",
          categoria: "juridico",
          probabilidade: 3,
          impacto: 4,
          classificacao: "medio",
          mitigacao: "Antecipar processos",
        },
      ],
      matrizResumo: { baixo: 0, medio: 1, alto: 0, critico: 0 },
    },
    criadoPor: "João Silva",
    criadoEm: "2026-01-10T10:00:00Z",
    modificadoEm: "2026-01-10T14:30:00Z",
  })

  const blocos = Object.values(proposta.statusBlocos)
  const completos = blocos.filter(b => b === "completo").length
  const progresso = (completos / blocos.length) * 100

  const { pode: podeLiberar, motivos } = podeLiberarParaFunil(proposta)

  const statusConfig: Record<StatusBloco, { icone: any; cor: string; bg: string; label: string }> = {
    pendente: { icone: Clock, cor: "text-gray-500", bg: "bg-gray-100", label: "Pendente" },
    em_andamento: { icone: Clock, cor: "text-blue-600", bg: "bg-blue-100", label: "Em Andamento" },
    completo: { icone: CheckCircle2, cor: "text-emerald-600", bg: "bg-emerald-100", label: "Completo" },
    bloqueado: { icone: Lock, cor: "text-red-600", bg: "bg-red-100", label: "Bloqueado" },
  }

  const toggleBloco = (bloco: string) => {
    setExpandido(prev => ({ ...prev, [bloco]: !prev[bloco] }))
  }

  return (
    <div className="flex h-screen bg-muted/30">
      <ComercialSidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <ComercialTopBar titulo="Análise de Proposta" />

        {/* HEADER FIXO */}
        <div className="sticky top-0 z-20 bg-background border-b shadow-sm">
          <div className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => router.push("/corporativo/comercial/propostas")}
                  className="gap-1.5"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Voltar
                </Button>
                <h2 className="text-xl font-bold">{proposta.id}</h2>
                <Badge variant="outline">{proposta.cadastro.nomeObra}</Badge>
                <Badge variant="secondary">{proposta.cadastro.clienteNome}</Badge>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="gap-1.5">
                  <Save className="w-3 h-3" />
                  Salvar
                </Button>
                <Button 
                  variant={podeLiberar ? "default" : "secondary"} 
                  size="sm" 
                  disabled={!podeLiberar}
                  className="gap-1.5"
                >
                  <Send className="w-3 h-3" />
                  Liberar para Funil
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-medium">Progresso</span>
                  <span className="font-bold">{completos}/6 blocos</span>
                </div>
                <Progress value={progresso} className="h-1.5" />
              </div>
              {!podeLiberar && (
                <Badge variant="destructive" className="text-xs">
                  {motivos.length} pendência(s)
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* CONTEÚDO */}
        <main className="flex-1 overflow-auto">
          <Tabs defaultValue="analise" className="h-full">
            <div className="sticky top-0 z-10 bg-background border-b px-4">
              <TabsList className="h-12">
                <TabsTrigger value="analise">Análise Corporativa</TabsTrigger>
                <TabsTrigger value="documentos">Documentos</TabsTrigger>
                <TabsTrigger value="decisao">Decisão</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="analise" className="p-4 space-y-4 m-0">
              <div className="max-w-[1400px] mx-auto grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <Card className="border">
                    <CardHeader 
                      className="pb-3 cursor-pointer hover:bg-muted/50 transition-colors"
                      onClick={() => toggleBloco('cadastro')}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {(() => {
                            const config = statusConfig[proposta.statusBlocos.cadastro]
                            const Icon = config.icone
                            return (
                              <>
                                <div className={`p-1.5 rounded ${config.bg}`}>
                                  <Icon className={`w-4 h-4 ${config.cor}`} />
                                </div>
                                <CardTitle className="text-sm font-bold">CADASTRO</CardTitle>
                              </>
                            )
                          })()}
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {statusConfig[proposta.statusBlocos.cadastro].label}
                          </Badge>
                          {expandido.cadastro ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </div>
                      </div>
                    </CardHeader>
                    {expandido.cadastro && (
                      <CardContent className="pt-0 space-y-2">
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div>
                            <span className="text-muted-foreground">Cliente:</span>
                            <p className="font-medium">{proposta.cadastro.clienteNome}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Obra:</span>
                            <p className="font-medium">{proposta.cadastro.nomeObra}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Tipo:</span>
                            <p className="font-medium capitalize">{proposta.cadastro.tipoObra}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Valor:</span>
                            <p className="font-medium">R$ {(proposta.cadastro.valor! / 1000000).toFixed(0)}Mi</p>
                          </div>
                        </div>
                      </CardContent>
                    )}
                  </Card>

                  <Card className="border">
                    <CardHeader 
                      className="pb-3 cursor-pointer hover:bg-muted/50 transition-colors"
                      onClick={() => toggleBloco('juridica')}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {(() => {
                            const config = statusConfig[proposta.statusBlocos.analiseJuridica]
                            const Icon = config.icone
                            return (
                              <>
                                <div className={`p-1.5 rounded ${config.bg}`}>
                                  <Icon className={`w-4 h-4 ${config.cor}`} />
                                </div>
                                <CardTitle className="text-sm font-bold">ANÁLISE JURÍDICA</CardTitle>
                              </>
                            )
                          })()}
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge 
                            variant={proposta.analiseJuridica.status === "seguro" ? "default" : "destructive"}
                            className={`text-xs ${proposta.analiseJuridica.status === "seguro" ? "bg-emerald-600" : ""}`}
                          >
                            {proposta.analiseJuridica.status.toUpperCase()}
                          </Badge>
                          {expandido.juridica ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </div>
                      </div>
                    </CardHeader>
                    {expandido.juridica && (
                      <CardContent className="pt-0">
                        <p className="text-xs text-muted-foreground">
                          {proposta.analiseJuridica.parecer}
                        </p>
                      </CardContent>
                    )}
                  </Card>
                </div>

                <div className="space-y-4">
                  <RadarViabilidade analise={proposta.analiseViabilidade} />
                </div>
              </div>

              <div className="max-w-[1400px] mx-auto">
                <MatrizRisco analise={proposta.analiseRisco} />
              </div>
            </TabsContent>

            <TabsContent value="documentos" className="p-6 m-0">
              <div className="max-w-[1400px] mx-auto">
                <Card>
                  <CardHeader>
                    <CardTitle>Documentos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="p-12 border-2 border-dashed rounded-lg text-center">
                      <p className="text-sm text-muted-foreground">Documentos carregados aparecerão aqui</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="decisao" className="p-6 m-0">
              <div className="max-w-[1000px] mx-auto">
                <Card>
                  <CardHeader>
                    <CardTitle>Decisão Corporativa</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {!podeLiberar && (
                      <div className="p-3 rounded-lg bg-amber-50 border border-amber-300">
                        <div className="flex items-start gap-2">
                          <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5" />
                          <div>
                            <p className="text-xs font-bold text-amber-900">Pendências:</p>
                            <ul className="text-xs text-amber-700 mt-1">
                              {motivos.map((m, i) => <li key={i}>• {m}</li>)}
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-3">
                      <Button 
                        variant="default" 
                        className="h-20 bg-emerald-600 hover:bg-emerald-700"
                        disabled={!podeLiberar}
                      >
                        <div className="text-center">
                          <p className="font-bold text-base">Aprovar</p>
                          <p className="text-xs opacity-90">Disputar obra</p>
                        </div>
                      </Button>
                      <Button variant="outline" className="h-20" disabled={!podeLiberar}>
                        <div className="text-center">
                          <p className="font-bold text-base">Aprovar com Ressalvas</p>
                          <p className="text-xs">Exige mitigação</p>
                        </div>
                      </Button>
                      <Button variant="destructive" className="h-20">
                        <div className="text-center">
                          <p className="font-bold text-base">Reprovar</p>
                          <p className="text-xs opacity-90">Não disputar</p>
                        </div>
                      </Button>
                      <Button variant="secondary" className="h-20">
                        <div className="text-center">
                          <p className="font-bold text-base">Solicitar Exceção</p>
                          <p className="text-xs">Escalar</p>
                        </div>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
