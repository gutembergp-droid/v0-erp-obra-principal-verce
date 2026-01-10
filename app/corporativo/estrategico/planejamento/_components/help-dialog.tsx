"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, Target, TrendingUp, Calendar, Users, Lightbulb } from "lucide-react"

interface HelpDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function HelpDialog({ open, onOpenChange }: HelpDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            Guia Completo: Planejamento Estratégico com OKRs
          </DialogTitle>
          <DialogDescription>
            Aprenda a criar e gerenciar OKRs de forma eficaz
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="oque" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="oque">O que é OKR?</TabsTrigger>
            <TabsTrigger value="como">Como criar</TabsTrigger>
            <TabsTrigger value="exemplos">Exemplos</TabsTrigger>
            <TabsTrigger value="dicas">Boas Práticas</TabsTrigger>
          </TabsList>

          {/* TAB: O que é OKR */}
          <TabsContent value="oque" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>O que são OKRs?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  <strong>OKR</strong> significa <strong>Objectives and Key Results</strong> (Objetivos e Resultados-Chave). 
                  É um framework de gestão usado por empresas como Google, Intel e LinkedIn para definir e acompanhar metas.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg border border-border bg-muted/30">
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="w-5 h-5 text-primary" />
                      <h4 className="font-semibold">Objetivo (O)</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      É a meta que você quer atingir. Deve ser <strong>claro, inspirador e ambicioso</strong>.
                    </p>
                    <div className="mt-3 p-2 rounded bg-background border border-border">
                      <p className="text-xs italic text-foreground">
                        "Aumentar receita consolidada em 25%"
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg border border-border bg-muted/30">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-5 h-5 text-green-500" />
                      <h4 className="font-semibold">Key Results (KR)</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      São resultados <strong>mensuráveis</strong> que indicam se você atingiu o objetivo.
                    </p>
                    <div className="mt-3 p-2 rounded bg-background border border-border space-y-1">
                      <p className="text-xs text-foreground">• Fechar 3 contratos &gt; R$ 500M</p>
                      <p className="text-xs text-foreground">• Aumentar receita recorrente em 15%</p>
                      <p className="text-xs text-foreground">• Expandir para 2 novas regiões</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Estrutura de um OKR</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Badge className="mt-1">1</Badge>
                    <div>
                      <p className="font-medium text-sm">Objetivo</p>
                      <p className="text-xs text-muted-foreground">O que você quer alcançar</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Badge className="mt-1">2-5</Badge>
                    <div>
                      <p className="font-medium text-sm">Key Results</p>
                      <p className="text-xs text-muted-foreground">Como você vai medir se atingiu o objetivo</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 mt-1 text-muted-foreground" />
                    <div>
                      <p className="font-medium text-sm">Prazo</p>
                      <p className="text-xs text-muted-foreground">Período definido (trimestre, semestre, ano)</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Users className="w-5 h-5 mt-1 text-muted-foreground" />
                    <div>
                      <p className="font-medium text-sm">Responsável</p>
                      <p className="text-xs text-muted-foreground">Quem vai liderar o alcance deste OKR</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* TAB: Como criar */}
          <TabsContent value="como" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Passo a Passo para Criar um OKR</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  {[
                    {
                      step: "1",
                      title: "Defina o Objetivo",
                      desc: "Pergunte-se: O que eu quero alcançar? Seja ambicioso mas realista.",
                      example: "Aumentar receita consolidada em 25% até Q2/2026"
                    },
                    {
                      step: "2",
                      title: "Escolha o Período",
                      desc: "Normalmente trimestral (Q1, Q2) ou anual. Evite prazos muito longos.",
                      example: "Q1-Q2 2026 ou 2026 (anual)"
                    },
                    {
                      step: "3",
                      title: "Defina o Tipo",
                      desc: "Corporativo (toda empresa), Departamental (uma área) ou Obra (projeto específico).",
                      example: "Corporativo"
                    },
                    {
                      step: "4",
                      title: "Atribua um Responsável",
                      desc: "Quem será o líder deste OKR? Uma pessoa ou time específico.",
                      example: "Diretoria Executiva"
                    },
                    {
                      step: "5",
                      title: "Crie os Key Results",
                      desc: "2 a 5 resultados mensuráveis. Cada um deve ter: meta, unidade e valor atual.",
                      example: "KR1: Fechar 3 novos contratos acima de R$ 500M"
                    },
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-4 p-3 rounded-lg border border-border bg-muted/30">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold shrink-0">
                        {item.step}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm mb-1">{item.title}</h4>
                        <p className="text-xs text-muted-foreground mb-2">{item.desc}</p>
                        <div className="p-2 rounded bg-background border border-border">
                          <p className="text-xs italic text-foreground">{item.example}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* TAB: Exemplos */}
          <TabsContent value="exemplos" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Exemplos Práticos de OKRs</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  {
                    tipo: "Corporativo",
                    objetivo: "Aumentar receita consolidada em 25% até Q2/2026",
                    krs: [
                      "Fechar 3 novos contratos acima de R$ 500M",
                      "Aumentar receita recorrente em 15%",
                      "Expandir para 2 novas regiões"
                    ]
                  },
                  {
                    tipo: "Departamental",
                    objetivo: "Melhorar eficiência operacional do departamento",
                    krs: [
                      "Reduzir tempo médio de aprovação de 5 para 3 dias",
                      "Automatizar 80% dos processos manuais",
                      "Aumentar satisfação interna para 4.5/5"
                    ]
                  },
                  {
                    tipo: "Obra",
                    objetivo: "Concluir BR-101 dentro do prazo e orçamento",
                    krs: [
                      "Manter IDP acima de 1.0 durante todo o trimestre",
                      "Reduzir desvio de custo para menos de 5%",
                      "Zero acidentes com afastamento"
                    ]
                  }
                ].map((okr, idx) => (
                  <div key={idx} className="p-4 rounded-lg border border-border bg-muted/30">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge>{okr.tipo}</Badge>
                      <h4 className="font-semibold text-sm">{okr.objetivo}</h4>
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs font-medium text-muted-foreground">Key Results:</p>
                      {okr.krs.map((kr, i) => (
                        <div key={i} className="flex items-start gap-2 p-2 rounded bg-background border border-border">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                          <p className="text-xs text-foreground">{kr}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* TAB: Boas Práticas */}
          <TabsContent value="dicas" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-yellow-500" />
                  Boas Práticas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                      <div>
                        <p className="font-medium text-sm text-foreground mb-1">Use o método SMART</p>
                        <p className="text-xs text-muted-foreground">
                          <strong>S</strong>pecífico, <strong>M</strong>ensurável, <strong>A</strong>tingível, 
                          <strong>R</strong>elevante, <strong>T</strong>emporal
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                      <div>
                        <p className="font-medium text-sm text-foreground mb-1">Menos é mais</p>
                        <p className="text-xs text-muted-foreground">
                          3-5 OKRs por período. Cada OKR com 2-5 Key Results. Foco é essencial.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                      <div>
                        <p className="font-medium text-sm text-foreground mb-1">Revise regularmente</p>
                        <p className="text-xs text-muted-foreground">
                          Check-ins semanais ou quinzenais. Review completo ao final do período.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                      <div>
                        <p className="font-medium text-sm text-foreground mb-1">Seja ambicioso</p>
                        <p className="text-xs text-muted-foreground">
                          70-80% de conclusão já é um sucesso. Se atingir 100% sempre, não está sendo ambicioso o suficiente.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-destructive">
                  <XCircle className="w-5 h-5" />
                  Erros Comuns a Evitar
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                  <div className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-medium text-sm text-foreground mb-1">Objetivos vagos</p>
                      <p className="text-xs text-muted-foreground">
                        ❌ "Melhorar as coisas" → ✅ "Aumentar satisfação do cliente para 4.5/5"
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                  <div className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-medium text-sm text-foreground mb-1">KRs não mensuráveis</p>
                      <p className="text-xs text-muted-foreground">
                        ❌ "Melhorar vendas" → ✅ "Aumentar vendas em 25% (de R$ 10M para R$ 12.5M)"
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                  <div className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-medium text-sm text-foreground mb-1">Muitos OKRs</p>
                      <p className="text-xs text-muted-foreground">
                        Ter 10+ OKRs por período dispersa o foco. Priorize os 3-5 mais importantes.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                  <div className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-medium text-sm text-foreground mb-1">Criar e esquecer</p>
                      <p className="text-xs text-muted-foreground">
                        OKRs precisam de acompanhamento constante. Atualize o progresso regularmente.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
