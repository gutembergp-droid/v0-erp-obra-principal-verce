"use client"

import { Suspense, useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { RHNav } from "@/components/rh/rh-nav"
import { PageContent, KPIGrid, Grid2 } from "@/components/layout/page-content"
import { ObraAdministrativoNavbar } from "../../_components/obra-administrativo-navbar"
import {
  Users,
  UserCheck,
  Briefcase,
  HardHat,
  AlertTriangle,
  AlertCircle,
  ChevronRight,
  TrendingUp,
  TrendingDown,
  Clock,
  FileWarning,
  ShieldAlert,
  DollarSign,
  Wallet,
  Calculator,
  Timer,
  Gavel,
  FileText,
  Calendar,
  Stethoscope,
  Gift,
  GraduationCap,
  UserPlus,
  Info,
  BarChart3,
} from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Line,
  ComposedChart,
  Legend,
} from "recharts"

// ============================================
// DADOS MOCKADOS - VISAO GERAL
// ============================================

const indicadoresHeader = {
  juridico: 3,
  atencao: 8,
  informativo: 5,
}

const efetivoMovimento = {
  efetivoAtual: 300,
  previsto: 320,
  gap: -20,
  admissoesMes: 18,
  demissoesMes: 10,
  turnoverMensal: 3.3,
  diretos: 240,
  indiretos: 60,
  tendencia: "up" as const, // up, stable, down
}

// Faixa 1 - Card 2 - Composicao
const composicaoEfetivo = {
  clt: { qtd: 210, percentual: 70 },
  pj: { qtd: 20, percentual: 7 },
  terceirizados: { qtd: 70, percentual: 23 },
}

// Faixa 1 - Card 3 - Status Operacional detalhado
const statusOperacional = {
  ativos: { qtd: 285, percentual: 95 },
  afastados: {
    total: 9,
    percentual: 3,
    medico: 6,
    acidente: 3,
  },
  bloqueados: {
    total: 6,
    percentual: 2,
    documentos: 4,
    juridico: 2,
  },
}

// Faixa 1 - Card 4 - Pendencias & Risco
const pendenciasRisco = {
  pendenciasCriticas: 12,
  detalhePendencias: {
    pessoas: 4,
    conformidade: 5,
    ponto: 3,
  },
  riscosJuridicos: 3,
  percentualEfetivo: 4,
}

// FAIXA 2 - Custo & Jornada
const custoJornada = {
  custoMO: {
    clt: { qtd: 210, valor: 980000, percentual: 78 },
    pj: { qtd: 20, valor: 150000, percentual: 12 },
    terceiros: { qtd: 70, valor: 120000, percentual: 10 },
    totalGeral: 1250000,
  },
  composicaoFolha: {
    folhaBase: { valor: 980000, percentual: 68 },
    horasExtras: { valor: 120000, percentual: 8 },
    encargos: { valor: 320000, percentual: 22 },
    bonificacoes: { valor: 30000, percentual: 2 },
    totalFolha: 1450000,
  },
  proporcaoCustos: {
    direto: { valor: 850000, percentual: 68 },
    indireto: { valor: 280000, percentual: 22 },
    terceiros: { valor: 120000, percentual: 10 },
  },
  jornadaImpacto: {
    horasNormais: 980000,
    horasExtras: 120000,
    totalHE: 1240,
    tetoHE: 1000,
    estouro: 240,
    colaboradoresAcimaLimite: 5,
    tendencia: "up" as const,
    status: "medio" as const,
  },
}

const dadosGrafico = [
  { mes: "Ago", horasExtras: 980, valorHE: 95000, turnover: 2.8, efetivo: 285 },
  { mes: "Set", horasExtras: 1050, valorHE: 102000, turnover: 3.1, efetivo: 290 },
  { mes: "Out", horasExtras: 1120, valorHE: 108000, turnover: 2.5, efetivo: 295 },
  { mes: "Nov", horasExtras: 1180, valorHE: 115000, turnover: 3.5, efetivo: 298 },
  { mes: "Dez", horasExtras: 1200, valorHE: 118000, turnover: 4.0, efetivo: 295 },
  { mes: "Jan", horasExtras: 1240, valorHE: 120000, turnover: 3.3, efetivo: 300 },
]

// Faixa 4 - Alertas e Temas
const alertasImportantes = [
  {
    tipo: "critico",
    categoria: "SST",
    msg: "5 ASOs vencendo nos proximos 7 dias",
    qtd: 5,
    link: "/obra/administrativo/rh/conformidade",
  },
  {
    tipo: "critico",
    categoria: "SST",
    msg: "3 colaboradores com NRs pendentes",
    qtd: 3,
    link: "/obra/administrativo/rh/conformidade",
  },
  {
    tipo: "atencao",
    categoria: "Documentos",
    msg: "12 documentos aguardando validacao",
    qtd: 12,
    link: "/obra/administrativo/rh/conformidade",
  },
  {
    tipo: "atencao",
    categoria: "Ponto",
    msg: "Banco de horas: 5 colaboradores acima do limite",
    qtd: 5,
    link: "/obra/administrativo/rh/ponto",
  },
  {
    tipo: "info",
    categoria: "Ferias",
    msg: "8 ferias programadas para este mes",
    qtd: 8,
    link: "/obra/administrativo/rh/pessoas",
  },
]

const temasComPendencia = [
  { label: "Pessoas", pendencias: 6, href: "/obra/administrativo/rh/pessoas", icon: Users },
  { label: "Conformidade", pendencias: 15, href: "/obra/administrativo/rh/conformidade", icon: ShieldAlert },
  { label: "Ponto", pendencias: 5, href: "/obra/administrativo/rh/ponto", icon: Clock },
  { label: "Premios", pendencias: 2, href: "/obra/administrativo/rh/premios", icon: Gift },
]

const agendaRH = [
  { tipo: "aniversario", label: "Aniversariantes", qtd: 4, icon: Gift },
  { tipo: "treinamento", label: "Treinamentos", qtd: 2, icon: GraduationCap },
  { tipo: "avaliacao", label: "Avaliacoes", qtd: 3, icon: FileText },
  { tipo: "onboarding", label: "Integracoes", qtd: 1, icon: UserPlus },
]

// RODAPE - Indicadores Juridicos
const indicadoresJuridicos = {
  riscoTrabalhista: { nivel: "medio", descricao: "2 situacoes em monitoramento" },
  passivoPotencial: { valor: 45000, tendencia: "down" },
  processosAtivos: { quantidade: 1, status: "Em andamento" },
}

// ============================================
// COMPONENTE PRINCIPAL
// ============================================

function VisaoGeralContent() {
  const [graficoTipo, setGraficoTipo] = useState<"horasExtras" | "valorHE" | "turnover" | "efetivo" | "hibrido">(
    "horasExtras",
  )

  useEffect(() => {
    console.log("[v0] RH Visao Geral - Componente montado com sucesso")
  }, [])

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const getRiscoColor = (nivel: string) => {
    switch (nivel) {
      case "baixo":
        return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
      case "medio":
        return "bg-amber-500/20 text-amber-400 border-amber-500/30"
      case "alto":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <div className="flex flex-col h-screen bg-muted/30 overflow-hidden">
      <div className="flex-shrink-0 z-40 mt-0">
        <ObraAdministrativoNavbar />
      </div>
      <main className="flex-1 bg-background overflow-hidden p-6">
        <div 
          className="h-full border-0 bg-background overflow-y-auto overflow-x-hidden scrollbar-hide p-6" 
          style={{ 
            borderRadius: '25px', 
            boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.13), 0 2px 8px rgba(0, 0, 0, 0.05)',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
      <RHNav modulo="obra" />

      <PageContent className="flex-1">
        {/* ============================================ */}
        {/* HEADER COM INDICADORES RESUMIDOS */}
        {/* ============================================ */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Users className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Visao Geral do RH</h1>
              <p className="text-sm text-muted-foreground">BR-101 LOTE 2 - Janeiro/2026</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Link href="#alertas">
              <Badge className="bg-red-500/20 text-red-400 border-red-500/30 cursor-pointer hover:bg-red-500/30 transition-colors px-3 py-1">
                <Gavel className="h-3 w-3 mr-1" />
                Juridico ({indicadoresHeader.juridico})
              </Badge>
            </Link>
            <Link href="#alertas">
              <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 cursor-pointer hover:bg-amber-500/30 transition-colors px-3 py-1">
                <AlertTriangle className="h-3 w-3 mr-1" />
                Atencao ({indicadoresHeader.atencao})
              </Badge>
            </Link>
            <Link href="#alertas">
              <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 cursor-pointer hover:bg-blue-500/30 transition-colors px-3 py-1">
                <Info className="h-3 w-3 mr-1" />
                Info ({indicadoresHeader.informativo})
              </Badge>
            </Link>
          </div>
        </div>

        {/* ============================================ */}
        {/* FAIXA 1 - PANORAMA GERAL DE PESSOAS */}
        {/* ============================================ */}
        <div>
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
            Panorama Geral de Pessoas
          </h2>
          <KPIGrid>
            <Card className="bg-card/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <Users className="h-5 w-5 text-blue-500" />
                  <Badge variant="outline" className="text-xs">
                    Efetivo & Movimento
                  </Badge>
                </div>
                <div className="space-y-1">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs text-muted-foreground">Efetivo Atual</span>
                    <span className="text-2xl font-bold">{efetivoMovimento.efetivoAtual}</span>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs text-muted-foreground">Previsto</span>
                    <span className="text-sm">{efetivoMovimento.previsto}</span>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs text-muted-foreground">Gap</span>
                    <span
                      className={`text-sm font-medium ${efetivoMovimento.gap < 0 ? "text-red-500" : "text-emerald-500"}`}
                    >
                      {efetivoMovimento.gap}
                    </span>
                  </div>
                  <div className="border-t pt-2 mt-2 space-y-1">
                    <div className="flex items-baseline justify-between">
                      <span className="text-xs text-muted-foreground">Admissoes</span>
                      <span className="text-xs text-emerald-500">+{efetivoMovimento.admissoesMes}</span>
                    </div>
                    <div className="flex items-baseline justify-between">
                      <span className="text-xs text-muted-foreground">Demissoes</span>
                      <span className="text-xs text-red-500">-{efetivoMovimento.demissoesMes}</span>
                    </div>
                    <div className="flex items-baseline justify-between">
                      <span className="text-xs text-muted-foreground">Turnover</span>
                      <span className="text-xs">{efetivoMovimento.turnoverMensal}%</span>
                    </div>
                    <div className="flex items-baseline justify-between">
                      <span className="text-xs text-muted-foreground">Diretos | Indiretos</span>
                      <span className="text-xs">
                        {efetivoMovimento.diretos} | {efetivoMovimento.indiretos}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-end pt-1">
                    {efetivoMovimento.tendencia === "up" && <TrendingUp className="h-4 w-4 text-emerald-500" />}
                    {efetivoMovimento.tendencia === "down" && <TrendingDown className="h-4 w-4 text-red-500" />}
                    {efetivoMovimento.tendencia === "stable" && <span className="text-muted-foreground">→</span>}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex gap-1">
                    <UserCheck className="h-5 w-5 text-emerald-500" />
                    <Briefcase className="h-5 w-5 text-purple-500" />
                    <HardHat className="h-5 w-5 text-orange-500" />
                  </div>
                  <Badge variant="outline" className="text-xs">
                    Composicao
                  </Badge>
                </div>
                {/* Mini donut visual */}
                <div className="flex items-center gap-4 mb-3">
                  <div className="relative h-16 w-16">
                    <svg viewBox="0 0 36 36" className="h-full w-full -rotate-90">
                      <circle
                        cx="18"
                        cy="18"
                        r="15.9"
                        fill="none"
                        stroke="currentColor"
                        className="text-muted/30"
                        strokeWidth="3"
                      />
                      <circle
                        cx="18"
                        cy="18"
                        r="15.9"
                        fill="none"
                        stroke="currentColor"
                        className="text-emerald-500"
                        strokeWidth="3"
                        strokeDasharray={`${composicaoEfetivo.clt.percentual} ${100 - composicaoEfetivo.clt.percentual}`}
                      />
                      <circle
                        cx="18"
                        cy="18"
                        r="15.9"
                        fill="none"
                        stroke="currentColor"
                        className="text-purple-500"
                        strokeWidth="3"
                        strokeDasharray={`${composicaoEfetivo.pj.percentual} ${100 - composicaoEfetivo.pj.percentual}`}
                        strokeDashoffset={`-${composicaoEfetivo.clt.percentual}`}
                      />
                      <circle
                        cx="18"
                        cy="18"
                        r="15.9"
                        fill="none"
                        stroke="currentColor"
                        className="text-orange-500"
                        strokeWidth="3"
                        strokeDasharray={`${composicaoEfetivo.terceirizados.percentual} ${100 - composicaoEfetivo.terceirizados.percentual}`}
                        strokeDashoffset={`-${composicaoEfetivo.clt.percentual + composicaoEfetivo.pj.percentual}`}
                      />
                    </svg>
                  </div>
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span className="text-xs text-muted-foreground">CLT</span>
                      </div>
                      <span className="text-sm font-bold text-emerald-500">
                        {composicaoEfetivo.clt.qtd} ({composicaoEfetivo.clt.percentual}%)
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-purple-500" />
                        <span className="text-xs text-muted-foreground">PJ</span>
                      </div>
                      <span className="text-sm text-purple-500">
                        {composicaoEfetivo.pj.qtd} ({composicaoEfetivo.pj.percentual}%)
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-orange-500" />
                        <span className="text-xs text-muted-foreground">Terc.</span>
                      </div>
                      <span className="text-sm text-orange-500">
                        {composicaoEfetivo.terceirizados.qtd} ({composicaoEfetivo.terceirizados.percentual}%)
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <AlertCircle className="h-5 w-5 text-amber-500" />
                  <Badge variant="outline" className="text-xs">
                    Status Operacional
                  </Badge>
                </div>
                <div className="space-y-1">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs text-muted-foreground">Ativos</span>
                    <span className="text-lg font-bold text-emerald-500">
                      {statusOperacional.ativos.qtd} ({statusOperacional.ativos.percentual}%)
                    </span>
                  </div>
                  <div className="border-t pt-2 mt-2">
                    <div className="flex items-baseline justify-between">
                      <span className="text-xs text-muted-foreground">Afastados</span>
                      <span className="text-sm text-amber-500">
                        {statusOperacional.afastados.total} ({statusOperacional.afastados.percentual}%)
                      </span>
                    </div>
                    <div className="pl-3 space-y-0.5 mt-1">
                      <div className="flex items-baseline justify-between">
                        <span className="text-[10px] text-muted-foreground">• Medico</span>
                        <span className="text-[10px]">{statusOperacional.afastados.medico}</span>
                      </div>
                      <div className="flex items-baseline justify-between">
                        <span className="text-[10px] text-muted-foreground">• Acidente</span>
                        <span className="text-[10px]">{statusOperacional.afastados.acidente}</span>
                      </div>
                    </div>
                  </div>
                  <div className="border-t pt-2 mt-2">
                    <div className="flex items-baseline justify-between">
                      <span className="text-xs text-muted-foreground">Bloqueados</span>
                      <span className="text-sm text-red-500">
                        {statusOperacional.bloqueados.total} ({statusOperacional.bloqueados.percentual}%)
                      </span>
                    </div>
                    <div className="pl-3 space-y-0.5 mt-1">
                      <div className="flex items-baseline justify-between">
                        <span className="text-[10px] text-muted-foreground">• Documentos</span>
                        <span className="text-[10px]">{statusOperacional.bloqueados.documentos}</span>
                      </div>
                      <div className="flex items-baseline justify-between">
                        <span className="text-[10px] text-muted-foreground">• Juridico</span>
                        <span className="text-[10px]">{statusOperacional.bloqueados.juridico}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-red-500/5 border-red-500/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  <Badge className="bg-red-500/20 text-red-400 border-red-500/30 text-xs">Pendencias & Risco</Badge>
                </div>
                <div className="space-y-1">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs text-muted-foreground">Pendencias Criticas</span>
                    <span className="text-lg font-bold text-red-500">{pendenciasRisco.pendenciasCriticas}</span>
                  </div>
                  <div className="pl-3 space-y-0.5">
                    <div className="flex items-baseline justify-between">
                      <span className="text-[10px] text-muted-foreground">• Pessoas</span>
                      <span className="text-[10px]">{pendenciasRisco.detalhePendencias.pessoas}</span>
                    </div>
                    <div className="flex items-baseline justify-between">
                      <span className="text-[10px] text-muted-foreground">• Conformidade</span>
                      <span className="text-[10px]">{pendenciasRisco.detalhePendencias.conformidade}</span>
                    </div>
                    <div className="flex items-baseline justify-between">
                      <span className="text-[10px] text-muted-foreground">• Ponto</span>
                      <span className="text-[10px]">{pendenciasRisco.detalhePendencias.ponto}</span>
                    </div>
                  </div>
                  <div className="border-t pt-2 mt-2">
                    <div className="flex items-baseline justify-between">
                      <span className="text-xs text-muted-foreground">Riscos Juridicos</span>
                      <span className="text-sm text-orange-500">{pendenciasRisco.riscosJuridicos}</span>
                    </div>
                    <div className="flex items-baseline justify-between">
                      <span className="text-xs text-muted-foreground">% sobre Efetivo</span>
                      <span className="text-xs">{pendenciasRisco.percentualEfetivo}%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  <Badge className="bg-red-500/20 text-red-400 border-red-500/30 text-xs">Pendencias & Risco</Badge>
                </div>
                <div className="space-y-1">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs text-muted-foreground">Pendencias Criticas</span>
                    <span className="text-lg font-bold text-red-500">{pendenciasRisco.pendenciasCriticas}</span>
                  </div>
                  <div className="pl-3 space-y-0.5">
                    <div className="flex items-baseline justify-between">
                      <span className="text-[10px] text-muted-foreground">• Pessoas</span>
                      <span className="text-[10px]">{pendenciasRisco.detalhePendencias.pessoas}</span>
                    </div>
                    <div className="flex items-baseline justify-between">
                      <span className="text-[10px] text-muted-foreground">• Conformidade</span>
                      <span className="text-[10px]">{pendenciasRisco.detalhePendencias.conformidade}</span>
                    </div>
                    <div className="flex items-baseline justify-between">
                      <span className="text-[10px] text-muted-foreground">• Ponto</span>
                      <span className="text-[10px]">{pendenciasRisco.detalhePendencias.ponto}</span>
                    </div>
                  </div>
                  <div className="border-t pt-2 mt-2">
                    <div className="flex items-baseline justify-between">
                      <span className="text-xs text-muted-foreground">Riscos Juridicos</span>
                      <span className="text-sm text-orange-500">{pendenciasRisco.riscosJuridicos}</span>
                    </div>
                    <div className="flex items-baseline justify-between">
                      <span className="text-xs text-muted-foreground">% sobre Efetivo</span>
                      <span className="text-xs">{pendenciasRisco.percentualEfetivo}%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </KPIGrid>
        </div>

        {/* ============================================ */}
        {/* FAIXA 2 - CUSTO & JORNADA (CAMADA FINANCEIRA) */}
        {/* ============================================ */}
        <div>
          <div className="mb-3">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              Custo & Jornada (Camada Financeira)
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">Panorama financeiro da mao de obra</p>
          </div>
          {/* Usando Grid2 padronizado */}
          <Grid2>
            {/* Card 5 - Custo Total de Mao de Obra */}
            <Card className="bg-card/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <DollarSign className="h-5 w-5 text-emerald-500" />
                  <Badge variant="outline" className="text-xs">
                    Custo MO
                  </Badge>
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">CLT ({custoJornada.custoMO.clt.qtd})</span>
                    <div className="text-right">
                      <span className="text-sm">{formatCurrency(custoJornada.custoMO.clt.valor)}</span>
                      <span className="text-[10px] text-muted-foreground ml-1">
                        {custoJornada.custoMO.clt.percentual}%
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">PJ ({custoJornada.custoMO.pj.qtd})</span>
                    <div className="text-right">
                      <span className="text-sm">{formatCurrency(custoJornada.custoMO.pj.valor)}</span>
                      <span className="text-[10px] text-muted-foreground ml-1">
                        {custoJornada.custoMO.pj.percentual}%
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      Terceiros ({custoJornada.custoMO.terceiros.qtd})
                    </span>
                    <div className="text-right">
                      <span className="text-sm">{formatCurrency(custoJornada.custoMO.terceiros.valor)}</span>
                      <span className="text-[10px] text-muted-foreground ml-1">
                        {custoJornada.custoMO.terceiros.percentual}%
                      </span>
                    </div>
                  </div>
                </div>
                <div className="border-t mt-3 pt-3">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs font-semibold text-muted-foreground">TOTAL GERAL</span>
                    <span className="text-xl font-bold text-emerald-500">
                      {formatCurrency(custoJornada.custoMO.totalGeral)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Card 6 - Composicao da Folha */}
            <Card className="bg-card/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <Wallet className="h-5 w-5 text-blue-500" />
                  <Badge variant="outline" className="text-xs">
                    Composicao Folha
                  </Badge>
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Folha Base</span>
                    <div className="text-right">
                      <span className="text-sm">{formatCurrency(custoJornada.composicaoFolha.folhaBase.valor)}</span>
                      <span className="text-[10px] text-muted-foreground ml-1">
                        {custoJornada.composicaoFolha.folhaBase.percentual}%
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Horas Extras</span>
                    <div className="text-right">
                      <span className="text-sm">{formatCurrency(custoJornada.composicaoFolha.horasExtras.valor)}</span>
                      <span className="text-[10px] text-muted-foreground ml-1">
                        {custoJornada.composicaoFolha.horasExtras.percentual}%
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Encargos</span>
                    <div className="text-right">
                      <span className="text-sm">{formatCurrency(custoJornada.composicaoFolha.encargos.valor)}</span>
                      <span className="text-[10px] text-muted-foreground ml-1">
                        {custoJornada.composicaoFolha.encargos.percentual}%
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Bonificacoes</span>
                    <div className="text-right">
                      <span className="text-sm">{formatCurrency(custoJornada.composicaoFolha.bonificacoes.valor)}</span>
                      <span className="text-[10px] text-muted-foreground ml-1">
                        {custoJornada.composicaoFolha.bonificacoes.percentual}%
                      </span>
                    </div>
                  </div>
                </div>
                <div className="border-t mt-3 pt-3">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs font-semibold text-muted-foreground">TOTAL FOLHA</span>
                    <span className="text-xl font-bold text-blue-500">
                      {formatCurrency(custoJornada.composicaoFolha.totalFolha)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Card 7 - Proporcao de Custos */}
            <Card className="bg-card/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <Calculator className="h-5 w-5 text-purple-500" />
                  <Badge variant="outline" className="text-xs">
                    Proporcao
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-muted-foreground">Direto</span>
                      <span className="text-xs font-medium">{custoJornada.proporcaoCustos.direto.percentual}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-500 rounded-full"
                        style={{ width: `${custoJornada.proporcaoCustos.direto.percentual}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-muted-foreground">
                      {formatCurrency(custoJornada.proporcaoCustos.direto.valor)}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-muted-foreground">Indireto</span>
                      <span className="text-xs font-medium">{custoJornada.proporcaoCustos.indireto.percentual}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500 rounded-full"
                        style={{ width: `${custoJornada.proporcaoCustos.indireto.percentual}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-muted-foreground">
                      {formatCurrency(custoJornada.proporcaoCustos.indireto.valor)}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-muted-foreground">Terceiros</span>
                      <span className="text-xs font-medium">{custoJornada.proporcaoCustos.terceiros.percentual}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-orange-500 rounded-full"
                        style={{ width: `${custoJornada.proporcaoCustos.terceiros.percentual}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-muted-foreground">
                      {formatCurrency(custoJornada.proporcaoCustos.terceiros.valor)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Card 8 - Jornada & Impacto Financeiro */}
            <Card
              className={`${custoJornada.jornadaImpacto.status !== "baixo" ? "bg-amber-500/5 border-amber-500/20" : "bg-card/50"}`}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <Timer className="h-5 w-5 text-amber-500" />
                  <Badge className={getRiscoColor(custoJornada.jornadaImpacto.status)}>
                    Risco {custoJornada.jornadaImpacto.status}
                  </Badge>
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs text-muted-foreground">Horas Normais</span>
                    <span className="text-sm">{formatCurrency(custoJornada.jornadaImpacto.horasNormais)}</span>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs text-muted-foreground">Horas Extras</span>
                    <span className="text-sm text-amber-500">
                      {formatCurrency(custoJornada.jornadaImpacto.horasExtras)}
                    </span>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs text-muted-foreground">Total HE</span>
                    <span className="text-sm font-medium">{custoJornada.jornadaImpacto.totalHE}h</span>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs text-muted-foreground">Teto HE</span>
                    <span className="text-sm">{custoJornada.jornadaImpacto.tetoHE}h</span>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs text-muted-foreground">Estouro</span>
                    <span className="text-sm text-red-500">+{custoJornada.jornadaImpacto.estouro}h</span>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs text-muted-foreground">Acima limite</span>
                    <span className="text-sm text-red-500">
                      {custoJornada.jornadaImpacto.colaboradoresAcimaLimite} colab.
                    </span>
                  </div>
                </div>
                <div className="border-t mt-3 pt-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Tendencia</span>
                    <div className="flex items-center gap-1">
                      {custoJornada.jornadaImpacto.tendencia === "up" && (
                        <TrendingUp className="h-4 w-4 text-red-500" />
                      )}
                      {custoJornada.jornadaImpacto.tendencia === "down" && (
                        <TrendingDown className="h-4 w-4 text-emerald-500" />
                      )}
                      <span
                        className={`text-xs font-medium ${custoJornada.jornadaImpacto.tendencia === "up" ? "text-red-500" : "text-emerald-500"}`}
                      >
                        {custoJornada.jornadaImpacto.tendencia === "up" ? "Aumentando" : "Diminuindo"}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Grid2>
        </div>

        {/* ============================================ */}
        {/* ============================================ */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-medium flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-primary" />
                Evolucao Operacional & Financeira
              </CardTitle>
              <div className="flex gap-1">
                <Button
                  variant={graficoTipo === "horasExtras" ? "default" : "outline"}
                  size="sm"
                  className="text-xs h-7"
                  onClick={() => setGraficoTipo("horasExtras")}
                >
                  HE (horas)
                </Button>
                <Button
                  variant={graficoTipo === "valorHE" ? "default" : "outline"}
                  size="sm"
                  className="text-xs h-7"
                  onClick={() => setGraficoTipo("valorHE")}
                >
                  HE (R$)
                </Button>
                <Button
                  variant={graficoTipo === "turnover" ? "default" : "outline"}
                  size="sm"
                  className="text-xs h-7"
                  onClick={() => setGraficoTipo("turnover")}
                >
                  Turnover
                </Button>
                <Button
                  variant={graficoTipo === "efetivo" ? "default" : "outline"}
                  size="sm"
                  className="text-xs h-7"
                  onClick={() => setGraficoTipo("efetivo")}
                >
                  Efetivo
                </Button>
                <Button
                  variant={graficoTipo === "hibrido" ? "default" : "outline"}
                  size="sm"
                  className="text-xs h-7"
                  onClick={() => setGraficoTipo("hibrido")}
                >
                  Hibrido
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                {graficoTipo === "hibrido" ? (
                  <ComposedChart data={dadosGrafico}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="mes" tick={{ fontSize: 12 }} className="text-muted-foreground" />
                    <YAxis yAxisId="left" tick={{ fontSize: 12 }} className="text-muted-foreground" />
                    <YAxis
                      yAxisId="right"
                      orientation="right"
                      tick={{ fontSize: 12 }}
                      className="text-muted-foreground"
                    />
                    <Tooltip
                      contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }}
                    />
                    <Legend />
                    <Bar
                      yAxisId="left"
                      dataKey="horasExtras"
                      name="Horas Extras"
                      fill="hsl(var(--primary))"
                      radius={[4, 4, 0, 0]}
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="efetivo"
                      name="Efetivo"
                      stroke="#10b981"
                      strokeWidth={2}
                      dot={{ fill: "#10b981" }}
                    />
                  </ComposedChart>
                ) : (
                  <BarChart data={dadosGrafico}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="mes" tick={{ fontSize: 12 }} className="text-muted-foreground" />
                    <YAxis tick={{ fontSize: 12 }} className="text-muted-foreground" />
                    <Tooltip
                      contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }}
                      formatter={(value: number) =>
                        graficoTipo === "valorHE"
                          ? formatCurrency(value)
                          : graficoTipo === "turnover"
                            ? `${value}%`
                            : value
                      }
                    />
                    <Bar
                      dataKey={
                        graficoTipo === "valorHE"
                          ? "valorHE"
                          : graficoTipo === "turnover"
                            ? "turnover"
                            : graficoTipo === "efetivo"
                              ? "efetivo"
                              : "horasExtras"
                      }
                      name={
                        graficoTipo === "valorHE"
                          ? "Valor HE (R$)"
                          : graficoTipo === "turnover"
                            ? "Turnover (%)"
                            : graficoTipo === "efetivo"
                              ? "Efetivo"
                              : "Horas Extras"
                      }
                      fill="hsl(var(--primary))"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                )}
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* ============================================ */}
        {/* ============================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" id="alertas">
          {/* Alertas Importantes */}
          <Card className="lg:col-span-2">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-medium flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-amber-500" />
                Alertas Importantes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="criticos">
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-red-500" />
                      <span className="text-sm font-medium">Criticos</span>
                      <Badge className="bg-red-500/20 text-red-400 border-red-500/30 text-xs ml-2">
                        {alertasImportantes.filter((a) => a.tipo === "critico").length}
                      </Badge>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2 pt-2">
                      {alertasImportantes
                        .filter((a) => a.tipo === "critico")
                        .map((alerta, idx) => (
                          <Link key={idx} href={alerta.link}>
                            <div className="flex items-center gap-3 p-3 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 cursor-pointer transition-colors">
                              {alerta.categoria === "SST" ? (
                                <Stethoscope className="h-4 w-4 text-red-500 shrink-0" />
                              ) : (
                                <FileText className="h-4 w-4 text-red-500 shrink-0" />
                              )}
                              <span className="text-sm flex-1">{alerta.msg}</span>
                              <Badge variant="outline" className="text-xs">
                                {alerta.qtd}
                              </Badge>
                              <ChevronRight className="h-4 w-4 text-muted-foreground" />
                            </div>
                          </Link>
                        ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="atencao">
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-amber-500" />
                      <span className="text-sm font-medium">Atencao</span>
                      <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 text-xs ml-2">
                        {alertasImportantes.filter((a) => a.tipo === "atencao").length}
                      </Badge>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2 pt-2">
                      {alertasImportantes
                        .filter((a) => a.tipo === "atencao")
                        .map((alerta, idx) => (
                          <Link key={idx} href={alerta.link}>
                            <div className="flex items-center gap-3 p-3 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 cursor-pointer transition-colors">
                              {alerta.categoria === "Ponto" ? (
                                <Clock className="h-4 w-4 text-amber-500 shrink-0" />
                              ) : (
                                <FileWarning className="h-4 w-4 text-amber-500 shrink-0" />
                              )}
                              <span className="text-sm flex-1">{alerta.msg}</span>
                              <Badge variant="outline" className="text-xs">
                                {alerta.qtd}
                              </Badge>
                              <ChevronRight className="h-4 w-4 text-muted-foreground" />
                            </div>
                          </Link>
                        ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="info">
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-blue-500" />
                      <span className="text-sm font-medium">Informativos</span>
                      <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs ml-2">
                        {alertasImportantes.filter((a) => a.tipo === "info").length}
                      </Badge>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2 pt-2">
                      {alertasImportantes
                        .filter((a) => a.tipo === "info")
                        .map((alerta, idx) => (
                          <Link key={idx} href={alerta.link}>
                            <div className="flex items-center gap-3 p-3 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 cursor-pointer transition-colors">
                              <Calendar className="h-4 w-4 text-blue-500 shrink-0" />
                              <span className="text-sm flex-1">{alerta.msg}</span>
                              <Badge variant="outline" className="text-xs">
                                {alerta.qtd}
                              </Badge>
                              <ChevronRight className="h-4 w-4 text-muted-foreground" />
                            </div>
                          </Link>
                        ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          {/* Temas & Agenda */}
          <div className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-medium">Temas com Pendencia</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {temasComPendencia.map((item) => (
                  <Link key={item.href} href={item.href}>
                    <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer group">
                      <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/10">
                        <item.icon className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{item.label}</p>
                      </div>
                      <Badge variant="destructive" className="text-xs">
                        {item.pendencias}
                      </Badge>
                      <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  </Link>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-medium flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  Agenda RH
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {agendaRH.map((item) => (
                  <div key={item.tipo} className="flex items-center gap-3 p-2 rounded-lg bg-muted/30">
                    <item.icon className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm flex-1">{item.label}</span>
                    <Badge variant="outline" className="text-xs">
                      {item.qtd}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* ============================================ */}
        {/* RODAPE - INDICADORES JURIDICOS */}
        {/* ============================================ */}
        <Card className="border-orange-500/20 bg-orange-500/5">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-medium flex items-center gap-2">
              <Gavel className="h-4 w-4 text-orange-500" />
              Indicadores Juridicos (Transversal)
              <Badge variant="outline" className="text-xs ml-2">
                Somente Leitura
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center justify-between p-4 rounded-lg bg-background/50">
                <div>
                  <p className="text-sm text-muted-foreground">Risco Trabalhista</p>
                  <p className="text-sm mt-1">{indicadoresJuridicos.riscoTrabalhista.descricao}</p>
                </div>
                <Badge className={getRiscoColor(indicadoresJuridicos.riscoTrabalhista.nivel)}>
                  {indicadoresJuridicos.riscoTrabalhista.nivel}
                </Badge>
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg bg-background/50">
                <div>
                  <p className="text-sm text-muted-foreground">Passivo Potencial</p>
                  <p className="text-xl font-bold">{formatCurrency(indicadoresJuridicos.passivoPotencial.valor)}</p>
                </div>
                <div className="flex items-center gap-2">
                  {indicadoresJuridicos.passivoPotencial.tendencia === "down" ? (
                    <TrendingDown className="h-5 w-5 text-emerald-500" />
                  ) : (
                    <TrendingUp className="h-5 w-5 text-red-500" />
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg bg-background/50">
                <div>
                  <p className="text-sm text-muted-foreground">Processos Ativos</p>
                  <p className="text-xl font-bold">{indicadoresJuridicos.processosAtivos.quantidade}</p>
                </div>
                <Badge variant="outline" className="text-xs">
                  {indicadoresJuridicos.processosAtivos.status}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </PageContent>
        </div>
      </main>
    </div>
  )
}

export default function RHVisaoGeralPage() {
  console.log("[v0] RH Visao Geral Page - Renderizando...")

  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        </div>
      }
    >
      <VisaoGeralContent />
    </Suspense>
  )
}
