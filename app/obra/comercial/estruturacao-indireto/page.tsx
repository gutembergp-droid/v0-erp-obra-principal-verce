"use client"

import { useState } from "react"
import { AppLayout } from "@/components/layout/app-layout"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { InfoTooltip } from "@/components/ui/info-tooltip"
import {
  FileText,
  Send,
  CheckCircle2,
  AlertCircle,
  Building2,
  Users,
  Shield,
  Car,
  Monitor,
  Briefcase,
  Home,
  Wrench,
  ChevronLeft,
  Lock,
} from "lucide-react"
import Link from "next/link"

// Dados mockados - Categorias de Indireto
const categoriasIndireto = [
  {
    codigo: "IND-001",
    categoria: "Administração da Obra",
    descricao: "Gestão administrativa e diretoria local",
    tipo: "Administrativo",
    status: "Ativo",
  },
  {
    codigo: "IND-002",
    categoria: "Engenharia e Planejamento",
    descricao: "Equipe técnica de engenharia e planejamento",
    tipo: "Gestão",
    status: "Ativo",
  },
  {
    codigo: "IND-003",
    categoria: "Segurança do Trabalho",
    descricao: "SESMT, EPIs, treinamentos obrigatórios",
    tipo: "Apoio",
    status: "Ativo",
  },
  {
    codigo: "IND-004",
    categoria: "Alojamento e Canteiro",
    descricao: "Manutenção de alojamentos e instalações",
    tipo: "Apoio",
    status: "Ativo",
  },
  {
    codigo: "IND-005",
    categoria: "TI e Comunicação",
    descricao: "Infraestrutura de TI, internet, telefonia",
    tipo: "Apoio",
    status: "Ativo",
  },
  {
    codigo: "IND-006",
    categoria: "Veículos Administrativos",
    descricao: "Frota administrativa, combustível, manutenção",
    tipo: "Administrativo",
    status: "Ativo",
  },
  {
    codigo: "IND-007",
    categoria: "Custos Gerais",
    descricao: "Despesas diversas não classificadas",
    tipo: "Outros",
    status: "Ativo",
  },
  {
    codigo: "IND-008",
    categoria: "Meio Ambiente",
    descricao: "Licenças, monitoramento, compensações",
    tipo: "Gestão",
    status: "Ativo",
  },
  {
    codigo: "IND-009",
    categoria: "Qualidade",
    descricao: "Laboratório, ensaios, certificações",
    tipo: "Gestão",
    status: "Pendente",
  },
  {
    codigo: "IND-010",
    categoria: "Jurídico e Compliance",
    descricao: "Assessoria jurídica, compliance, auditorias",
    tipo: "Administrativo",
    status: "Pendente",
  },
]

// Dados mockados - Centros de Custo Indireto
const centrosCusto = [
  {
    centro: "CC-IND-001",
    categoria: "Administração da Obra",
    responsavel: "Carlos Silva",
    criterio: "Valor fixo mensal",
    status: "Configurado",
  },
  {
    centro: "CC-IND-002",
    categoria: "Engenharia e Planejamento",
    responsavel: "Ana Santos",
    criterio: "Headcount",
    status: "Configurado",
  },
  {
    centro: "CC-IND-003",
    categoria: "Segurança do Trabalho",
    responsavel: "Roberto Lima",
    criterio: "% sobre folha",
    status: "Configurado",
  },
  {
    centro: "CC-IND-004",
    categoria: "Alojamento e Canteiro",
    responsavel: "Maria Costa",
    criterio: "Ocupação real",
    status: "Configurado",
  },
  {
    centro: "CC-IND-005",
    categoria: "TI e Comunicação",
    responsavel: "Pedro Souza",
    criterio: "Valor fixo mensal",
    status: "Configurado",
  },
  {
    centro: "CC-IND-006",
    categoria: "Veículos Administrativos",
    responsavel: "José Oliveira",
    criterio: "Km rodado + fixo",
    status: "Pendente",
  },
  {
    centro: "CC-IND-007",
    categoria: "Custos Gerais",
    responsavel: "Carlos Silva",
    criterio: "Rateio geral",
    status: "Pendente",
  },
  {
    centro: "CC-IND-008",
    categoria: "Meio Ambiente",
    responsavel: "Lucia Ferreira",
    criterio: "Valor fixo mensal",
    status: "Configurado",
  },
]

// Dados mockados - Parâmetros de Controle
const parametrosControle = [
  {
    parametro: "Forma de apropriação",
    valor: "Mensal por centro de custo",
    observacao: "Fechamento até o 5º dia útil",
  },
  { parametro: "Periodicidade de acompanhamento", valor: "Semanal", observacao: "Relatório toda segunda-feira" },
  {
    parametro: "Critério de rateio",
    valor: "Proporcional à receita",
    observacao: "Aplicado para custos compartilhados",
  },
  { parametro: "Indicador principal", valor: "% Indireto / Receita Líquida", observacao: "Meta: máximo 12%" },
  { parametro: "Indicador secundário", valor: "Indireto / Custo Total", observacao: "Meta: máximo 15%" },
  { parametro: "Limite de tolerância", valor: "± 5% do orçado", observacao: "Desvios acima exigem justificativa" },
  { parametro: "Critério de fechamento", valor: "Aprovação do GC", observacao: "Validação obrigatória mensal" },
]

// Validações
const validacoes = [
  { item: "Categorias de indireto definidas", status: true },
  { item: "Centros de custo vinculados", status: true },
  { item: "Responsáveis designados", status: true },
  { item: "Parâmetros de controle definidos", status: true },
  { item: "Critérios de rateio configurados", status: true },
  { item: "Indicadores de acompanhamento definidos", status: true },
  { item: "Limites de tolerância estabelecidos", status: true },
  { item: "Critérios de fechamento mensal definidos", status: false },
]

export default function EstruturacaoIndiretoPage() {
  const [status] = useState<"nao_iniciado" | "em_estruturacao" | "revisado" | "homologado">("em_estruturacao")

  const getStatusBadge = () => {
    switch (status) {
      case "nao_iniciado":
        return (
          <Badge variant="outline" className="text-muted-foreground">
            Não iniciado
          </Badge>
        )
      case "em_estruturacao":
        return <Badge className="bg-amber-500/10 text-amber-600 border-amber-500/20">Em estruturação</Badge>
      case "revisado":
        return <Badge className="bg-blue-500/10 text-blue-600 border-blue-500/20">Revisado</Badge>
      case "homologado":
        return <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">Homologado</Badge>
    }
  }

  const getTipoBadge = (tipo: string) => {
    switch (tipo) {
      case "Administrativo":
        return (
          <Badge variant="outline" className="text-blue-600 border-blue-500/30 text-[10px]">
            {tipo}
          </Badge>
        )
      case "Gestão":
        return (
          <Badge variant="outline" className="text-purple-600 border-purple-500/30 text-[10px]">
            {tipo}
          </Badge>
        )
      case "Apoio":
        return (
          <Badge variant="outline" className="text-amber-600 border-amber-500/30 text-[10px]">
            {tipo}
          </Badge>
        )
      default:
        return (
          <Badge variant="outline" className="text-muted-foreground text-[10px]">
            {tipo}
          </Badge>
        )
    }
  }

  const getCategoriaIcon = (categoria: string) => {
    if (categoria.includes("Administração")) return <Building2 className="h-3.5 w-3.5 text-blue-500" />
    if (categoria.includes("Engenharia")) return <Briefcase className="h-3.5 w-3.5 text-purple-500" />
    if (categoria.includes("Segurança")) return <Shield className="h-3.5 w-3.5 text-red-500" />
    if (categoria.includes("Alojamento")) return <Home className="h-3.5 w-3.5 text-amber-500" />
    if (categoria.includes("TI")) return <Monitor className="h-3.5 w-3.5 text-cyan-500" />
    if (categoria.includes("Veículos")) return <Car className="h-3.5 w-3.5 text-emerald-500" />
    if (categoria.includes("Meio Ambiente")) return <Shield className="h-3.5 w-3.5 text-green-500" />
    if (categoria.includes("Qualidade")) return <CheckCircle2 className="h-3.5 w-3.5 text-blue-500" />
    if (categoria.includes("Jurídico")) return <FileText className="h-3.5 w-3.5 text-slate-500" />
    return <Wrench className="h-3.5 w-3.5 text-muted-foreground" />
  }

  const validacoesAprovadas = validacoes.filter((v) => v.status).length
  const totalValidacoes = validacoes.length
  const prontoParaControle = validacoesAprovadas === totalValidacoes

  return (
    <AppLayout>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex-shrink-0 border-b bg-card/50">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Link href="/obra/comercial/estruturacao-geral">
                  <Button variant="ghost" size="sm" className="gap-1.5 text-muted-foreground hover:text-foreground">
                    <ChevronLeft className="h-4 w-4" />
                    Voltar
                  </Button>
                </Link>
                <Separator orientation="vertical" className="h-6" />
                <div>
                  <div className="flex items-center gap-3">
                    <h1 className="text-xl font-semibold tracking-tight">Estruturação do Indireto</h1>
                    <Badge variant="outline" className="text-[10px] font-mono">
                      EST-05
                    </Badge>
                    {getStatusBadge()}
                  </div>
                  <p className="text-sm text-muted-foreground mt-0.5">Gestão e governança do custo indireto</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="gap-1.5 bg-transparent">
                  <Send className="h-3.5 w-3.5" />
                  Enviar para Revisão
                </Button>
                <Button size="sm" className="gap-1.5" disabled={!prontoParaControle}>
                  <Lock className="h-3.5 w-3.5" />
                  Homologar Estrutura
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <ScrollArea className="flex-1">
          <div className="p-6 space-y-6">
            {/* Bloco 1 - Categorias de Indireto */}
            <section>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
                  1. Categorias de Indireto
                </span>
                <InfoTooltip content="Categorias que compõem o custo indireto da obra. Não geram avanço físico." />
              </div>
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-muted/50 border-b">
                      <th className="text-left px-4 py-2.5 font-medium text-[10px] uppercase tracking-wider text-muted-foreground">
                        Código
                      </th>
                      <th className="text-left px-4 py-2.5 font-medium text-[10px] uppercase tracking-wider text-muted-foreground">
                        Categoria
                      </th>
                      <th className="text-left px-4 py-2.5 font-medium text-[10px] uppercase tracking-wider text-muted-foreground">
                        Descrição
                      </th>
                      <th className="text-left px-4 py-2.5 font-medium text-[10px] uppercase tracking-wider text-muted-foreground">
                        Tipo
                      </th>
                      <th className="text-center px-4 py-2.5 font-medium text-[10px] uppercase tracking-wider text-muted-foreground">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {categoriasIndireto.map((item, idx) => (
                      <tr
                        key={item.codigo}
                        className={`border-b last:border-0 hover:bg-muted/30 transition-colors ${idx % 2 === 0 ? "bg-background" : "bg-muted/20"}`}
                      >
                        <td className="px-4 py-2.5 font-mono text-xs text-muted-foreground">{item.codigo}</td>
                        <td className="px-4 py-2.5">
                          <div className="flex items-center gap-2">
                            {getCategoriaIcon(item.categoria)}
                            <span className="font-medium text-xs">{item.categoria}</span>
                          </div>
                        </td>
                        <td className="px-4 py-2.5 text-xs text-muted-foreground">{item.descricao}</td>
                        <td className="px-4 py-2.5">{getTipoBadge(item.tipo)}</td>
                        <td className="px-4 py-2.5 text-center">
                          {item.status === "Ativo" ? (
                            <Badge
                              variant="outline"
                              className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 text-[10px]"
                            >
                              Ativo
                            </Badge>
                          ) : (
                            <Badge
                              variant="outline"
                              className="bg-amber-500/10 text-amber-600 border-amber-500/20 text-[10px]"
                            >
                              Pendente
                            </Badge>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <Separator />

            {/* Bloco 2 - Centros de Custo Indireto */}
            <section>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
                  2. Centros de Custo Indireto
                </span>
                <InfoTooltip content="Rastreabilidade e responsabilização do custo indireto por centro de custo." />
              </div>
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-muted/50 border-b">
                      <th className="text-left px-4 py-2.5 font-medium text-[10px] uppercase tracking-wider text-muted-foreground">
                        Centro de Custo
                      </th>
                      <th className="text-left px-4 py-2.5 font-medium text-[10px] uppercase tracking-wider text-muted-foreground">
                        Categoria Associada
                      </th>
                      <th className="text-left px-4 py-2.5 font-medium text-[10px] uppercase tracking-wider text-muted-foreground">
                        Responsável
                      </th>
                      <th className="text-left px-4 py-2.5 font-medium text-[10px] uppercase tracking-wider text-muted-foreground">
                        Critério de Controle
                      </th>
                      <th className="text-center px-4 py-2.5 font-medium text-[10px] uppercase tracking-wider text-muted-foreground">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {centrosCusto.map((item, idx) => (
                      <tr
                        key={item.centro}
                        className={`border-b last:border-0 hover:bg-muted/30 transition-colors ${idx % 2 === 0 ? "bg-background" : "bg-muted/20"}`}
                      >
                        <td className="px-4 py-2.5 font-mono text-xs">{item.centro}</td>
                        <td className="px-4 py-2.5">
                          <div className="flex items-center gap-2">
                            {getCategoriaIcon(item.categoria)}
                            <span className="text-xs">{item.categoria}</span>
                          </div>
                        </td>
                        <td className="px-4 py-2.5">
                          <div className="flex items-center gap-2">
                            <Users className="h-3.5 w-3.5 text-muted-foreground" />
                            <span className="text-xs">{item.responsavel}</span>
                          </div>
                        </td>
                        <td className="px-4 py-2.5 text-xs text-muted-foreground">{item.criterio}</td>
                        <td className="px-4 py-2.5 text-center">
                          {item.status === "Configurado" ? (
                            <Badge
                              variant="outline"
                              className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 text-[10px]"
                            >
                              Configurado
                            </Badge>
                          ) : (
                            <Badge
                              variant="outline"
                              className="bg-amber-500/10 text-amber-600 border-amber-500/20 text-[10px]"
                            >
                              Pendente
                            </Badge>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <Separator />

            {/* Grid: Parâmetros + Validações */}
            <div className="grid grid-cols-12 gap-6">
              {/* Bloco 3 - Parâmetros de Controle */}
              <section className="col-span-7">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
                    3. Parâmetros de Controle do Indireto
                  </span>
                  <InfoTooltip content="Critérios e indicadores para acompanhamento e fechamento do indireto." />
                </div>
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-muted/50 border-b">
                        <th className="text-left px-4 py-2.5 font-medium text-[10px] uppercase tracking-wider text-muted-foreground">
                          Parâmetro
                        </th>
                        <th className="text-left px-4 py-2.5 font-medium text-[10px] uppercase tracking-wider text-muted-foreground">
                          Valor Definido
                        </th>
                        <th className="text-left px-4 py-2.5 font-medium text-[10px] uppercase tracking-wider text-muted-foreground">
                          Observação
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {parametrosControle.map((item, idx) => (
                        <tr
                          key={item.parametro}
                          className={`border-b last:border-0 hover:bg-muted/30 transition-colors ${idx % 2 === 0 ? "bg-background" : "bg-muted/20"}`}
                        >
                          <td className="px-4 py-2.5 font-medium text-xs">{item.parametro}</td>
                          <td className="px-4 py-2.5 text-xs">{item.valor}</td>
                          <td className="px-4 py-2.5 text-xs text-muted-foreground">{item.observacao}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Bloco 4 - Validações */}
              <section className="col-span-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
                    4. Validações da Estrutura
                  </span>
                  <InfoTooltip content="Checklist de validação antes da homologação." />
                </div>
                <div className="border rounded-lg p-4 space-y-3">
                  {validacoes.map((item) => (
                    <div key={item.item} className="flex items-center gap-2">
                      {item.status ? (
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                      ) : (
                        <AlertCircle className="h-4 w-4 text-amber-500 flex-shrink-0" />
                      )}
                      <span className={`text-xs ${item.status ? "text-foreground" : "text-muted-foreground"}`}>
                        {item.item}
                      </span>
                    </div>
                  ))}

                  <Separator className="my-3" />

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-xs font-medium">Pronta para controle mensal?</span>
                    {prontoParaControle ? (
                      <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">Sim</Badge>
                    ) : (
                      <Badge className="bg-amber-500/10 text-amber-600 border-amber-500/20">
                        Não ({validacoesAprovadas}/{totalValidacoes})
                      </Badge>
                    )}
                  </div>
                </div>
              </section>
            </div>

            <Separator />

            {/* Bloco Final - Governança */}
            <section>
              <div className="border rounded-lg border-amber-500/30 bg-amber-500/5 p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-amber-700 dark:text-amber-400">
                      Governança do Custo Indireto
                    </p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Após homologação, a estrutura do indireto passa a ser apenas{" "}
                      <strong>acompanhada e fechada mensalmente</strong>. O indireto não compõe serviços, não gera
                      avanço físico, mas impacta diretamente o resultado econômico da obra. Qualquer alteração
                      estrutural exige nova revisão e homologação.
                    </p>
                    <div className="flex items-center gap-4 pt-2">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Lock className="h-3.5 w-3.5" />
                        <span>Controlado pelo Fechamento Gerencial (GC-03)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </ScrollArea>
      </div>
    </AppLayout>
  )
}
