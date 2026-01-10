"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertCircle, CheckCircle2, Clock, Lock, ChevronRight, Save, Send } from "lucide-react"
import { RadarViabilidade } from "../_components/radar-viabilidade"
import { MatrizRisco } from "../_components/matriz-risco"
import type { PropostaCompleta, StatusBloco } from "@/lib/types/proposta"
import { podeLiberarParaFunil } from "@/lib/types/proposta"

// ============================================================================
// COMPONENT - NOVA PROPOSTA (ANÁLISE CORPORATIVA COMPLETA)
// ============================================================================

export default function NovaPropostaPage() {
  const router = useRouter()

  // Estado da proposta (mock - em produção vem do contexto/API)
  const [proposta, setProposta] = useState<PropostaCompleta>({
    id: "PROP-2026-001",
    status: "em_cadastro",
    statusBlocos: {
      cadastro: "em_andamento",
      documentos: "pendente",
      analiseViabilidade: "pendente",
      analiseJuridica: "pendente",
      analiseRisco: "pendente",
      decisao: "pendente",
    },
    cadastro: {
      clienteId: "",
      clienteNome: "",
      nomeObra: "",
      tipoObra: "infraestrutura",
      localizacao: { cidade: "", estado: "", regiao: "" },
      origem: "prospeccao",
      valorPublico: true,
      regimeContratual: "",
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
      observacoes: "Projeto alinhado com estratégia corporativa",
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
          descricao: "Atraso na liberação de licenças ambientais",
          categoria: "juridico",
          probabilidade: 3,
          impacto: 4,
          classificacao: "medio",
          mitigacao: "Iniciar processos com antecedência de 6 meses",
        },
        {
          id: "R2",
          descricao: "Variação cambial acima de 10%",
          categoria: "financeiro",
          probabilidade: 2,
          impacto: 3,
          classificacao: "baixo",
          mitigacao: "Hedge cambial para insumos importados",
        },
      ],
      matrizResumo: {
        baixo: 1,
        medio: 1,
        alto: 0,
        critico: 0,
      },
    },
    criadoPor: "João Silva",
    criadoEm: "2026-01-10T10:00:00Z",
    modificadoEm: "2026-01-10T14:30:00Z",
  })

  // Calcular progresso geral
  const blocos = Object.values(proposta.statusBlocos)
  const completosOuBloqueados = blocos.filter(b => b === "completo" || b === "bloqueado").length
  const progresso = (completosOuBloqueados / blocos.length) * 100

  // Verificar se pode liberar
  const { pode: podeLiberear, motivos } = podeLiberarParaFunil(proposta)

  // Config de status dos blocos
  const statusConfig: Record<StatusBloco, { icone: any; cor: string; label: string }> = {
    pendente: { icone: Clock, cor: "text-gray-400", label: "Pendente" },
    em_andamento: { icone: Clock, cor: "text-blue-600", label: "Em Andamento" },
    completo: { icone: CheckCircle2, cor: "text-emerald-600", label: "Completo" },
    bloqueado: { icone: Lock, cor: "text-red-600", label: "Bloqueado" },
  }

  return (
    <div className="flex h-screen bg-muted/30">
      {/* Conteúdo Principal */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* TOPO STICKY - Identidade da Proposta */}
        <div className="sticky top-0 z-10 bg-background border-b border-border">
          <div className="p-4 space-y-3">
            {/* Linha 1: ID + Status */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <h1 className="text-xl font-bold">{proposta.id}</h1>
                <Badge variant="outline" className="text-xs">
                  {proposta.status.replace(/_/g, " ").toUpperCase()}
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="gap-1.5">
                  <Save className="w-3 h-3" />
                  Salvar Rascunho
                </Button>
                <Button 
                  variant={podeLiberear ? "default" : "secondary"} 
                  size="sm" 
                  className="gap-1.5"
                  disabled={!podeLiberear}
                >
                  <Send className="w-3 h-3" />
                  Liberar para Funil
                </Button>
              </div>
            </div>

            {/* Linha 2: Obra + Cliente */}
            <div className="flex items-center gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Obra:</span>
                <span className="ml-2 font-medium">{proposta.cadastro.nomeObra || "Sem nome"}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Cliente:</span>
                <span className="ml-2 font-medium">{proposta.cadastro.clienteNome || "Não definido"}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Tipo:</span>
                <span className="ml-2 font-medium capitalize">{proposta.cadastro.tipoObra.replace(/_/g, " ")}</span>
              </div>
            </div>

            {/* Linha 3: Progress Bar */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Progresso Geral</span>
                <span className="font-bold">{progresso.toFixed(0)}%</span>
              </div>
              <Progress value={progresso} className="h-2" />
            </div>

            {/* Alertas de Bloqueio */}
            {!podeLiberear && (
              <div className="p-2 rounded bg-amber-50 border border-amber-300">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-xs font-bold text-amber-900">Pendências para liberar:</p>
                    <ul className="text-[10px] text-amber-700 mt-1 space-y-0.5">
                      {motivos.map((m, i) => (
                        <li key={i}>• {m}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* CONTEÚDO SCROLLÁVEL */}
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-[1400px] mx-auto space-y-6">
            {/* BLOCO 1: CADASTRO */}
            <Card className="border-l-4 border-l-blue-600">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {(() => {
                      const StatusIcon = statusConfig[proposta.statusBlocos.cadastro].icone
                      return <StatusIcon className={`w-4 h-4 ${statusConfig[proposta.statusBlocos.cadastro].cor}`} />
                    })()}
                    <CardTitle className="text-base font-bold">1. CADASTRO DA PROPOSTA</CardTitle>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {statusConfig[proposta.statusBlocos.cadastro].label}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cliente">Cliente *</Label>
                    <Input id="cliente" placeholder="Selecione ou crie novo" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nomeObra">Nome da Obra *</Label>
                    <Input id="nomeObra" placeholder="Ex: Ponte Rio Grande" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tipoObra">Tipo de Obra *</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="infraestrutura">Infraestrutura</SelectItem>
                        <SelectItem value="edificacao">Edificação</SelectItem>
                        <SelectItem value="industrial">Industrial</SelectItem>
                        <SelectItem value="energia">Energia</SelectItem>
                        <SelectItem value="saneamento">Saneamento</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="localizacao">Localização *</Label>
                    <Input id="localizacao" placeholder="Cidade, Estado" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* BLOCO 2: DOCUMENTOS */}
            <Card className="border-l-4 border-l-purple-600">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {(() => {
                      const StatusIcon = statusConfig[proposta.statusBlocos.documentos].icone
                      return <StatusIcon className={`w-4 h-4 ${statusConfig[proposta.statusBlocos.documentos].cor}`} />
                    })()}
                    <CardTitle className="text-base font-bold">2. DOCUMENTOS</CardTitle>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {proposta.documentos.length} documento(s)
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="p-8 border-2 border-dashed rounded-lg text-center">
                  <p className="text-sm text-muted-foreground">
                    Arraste arquivos ou clique para fazer upload
                  </p>
                  <Button variant="outline" size="sm" className="mt-2">
                    Selecionar Arquivos
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* BLOCO 3: ANÁLISE DE VIABILIDADE */}
            <div className="border-l-4 border-l-emerald-600 rounded-lg overflow-hidden">
              <div className="bg-emerald-50 p-3 border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {(() => {
                      const StatusIcon = statusConfig[proposta.statusBlocos.analiseViabilidade].icone
                      return <StatusIcon className={`w-4 h-4 ${statusConfig[proposta.statusBlocos.analiseViabilidade].cor}`} />
                    })()}
                    <h3 className="font-bold">3. ANÁLISE DE VIABILIDADE</h3>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <RadarViabilidade analise={proposta.analiseViabilidade} />
              </div>
            </div>

            {/* BLOCO 4: ANÁLISE JURÍDICA */}
            <Card className="border-l-4 border-l-amber-600">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {(() => {
                      const StatusIcon = statusConfig[proposta.statusBlocos.analiseJuridica].icone
                      return <StatusIcon className={`w-4 h-4 ${statusConfig[proposta.statusBlocos.analiseJuridica].cor}`} />
                    })()}
                    <CardTitle className="text-base font-bold">4. ANÁLISE JURÍDICA</CardTitle>
                  </div>
                  <Badge 
                    variant={proposta.analiseJuridica.status === "seguro" ? "default" : "destructive"}
                    className={proposta.analiseJuridica.status === "seguro" ? "bg-emerald-600" : ""}
                  >
                    {proposta.analiseJuridica.status.toUpperCase()}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <Label>Parecer Jurídico</Label>
                  <Textarea 
                    placeholder="Análise de conformidade, licenças, cláusulas..."
                    rows={3}
                    defaultValue={proposta.analiseJuridica.parecer}
                  />
                </div>
              </CardContent>
            </Card>

            {/* BLOCO 5: ANÁLISE DE RISCO */}
            <div className="border-l-4 border-l-red-600 rounded-lg overflow-hidden">
              <div className="bg-red-50 p-3 border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {(() => {
                      const StatusIcon = statusConfig[proposta.statusBlocos.analiseRisco].icone
                      return <StatusIcon className={`w-4 h-4 ${statusConfig[proposta.statusBlocos.analiseRisco].cor}`} />
                    })()}
                    <h3 className="font-bold">5. ANÁLISE DE RISCO</h3>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <MatrizRisco analise={proposta.analiseRisco} />
              </div>
            </div>

            {/* BLOCO 6: DECISÃO */}
            <Card className="border-l-4 border-l-indigo-600">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {(() => {
                      const StatusIcon = statusConfig[proposta.statusBlocos.decisao].icone
                      return <StatusIcon className={`w-4 h-4 ${statusConfig[proposta.statusBlocos.decisao].cor}`} />
                    })()}
                    <CardTitle className="text-base font-bold">6. DECISÃO CORPORATIVA</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="default" className="h-16 bg-emerald-600 hover:bg-emerald-700">
                    <div className="text-center">
                      <p className="font-bold">Aprovar</p>
                      <p className="text-xs opacity-90">Disputar esta obra</p>
                    </div>
                  </Button>
                  <Button variant="outline" className="h-16">
                    <div className="text-center">
                      <p className="font-bold">Aprovar com Ressalvas</p>
                      <p className="text-xs">Exige mitigação</p>
                    </div>
                  </Button>
                  <Button variant="destructive" className="h-16">
                    <div className="text-center">
                      <p className="font-bold">Reprovar</p>
                      <p className="text-xs opacity-90">Não disputar</p>
                    </div>
                  </Button>
                  <Button variant="secondary" className="h-16">
                    <div className="text-center">
                      <p className="font-bold">Solicitar Exceção</p>
                      <p className="text-xs">Escalar decisão</p>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
