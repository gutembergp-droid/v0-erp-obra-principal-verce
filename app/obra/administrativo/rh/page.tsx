"use client"

import { Suspense } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RHNav } from "@/components/rh/rh-nav"
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
} from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

// ============================================
// DADOS MOCKADOS - VISAO GERAL
// ============================================

// FAIXA 1 - Panorama Geral de Pessoas
const panoramaPessoas = {
  efetivoAtual: {
    total: 300,
    previsto: 320,
    gap: -20,
  },
  composicao: {
    clt: 210,
    pj: 20,
    terceirizados: 70,
  },
  statusOperacional: {
    ativos: 285,
    afastados: 9,
    bloqueados: 6,
  },
  riscoPendencias: {
    pendenciasCriticas: 12,
    riscosJuridicos: 3,
  },
}

// FAIXA 2 - Custo & Jornada
const custoJornada = {
  // Card 1 - Custo Total de Mao de Obra
  custoMO: {
    clt: 980000,
    pj: 150000,
    terceiros: 120000, // apenas quando o custo e nosso
    totalGeral: 1250000,
  },
  // Card 2 - Composicao da Folha
  composicaoFolha: {
    folhaBase: 980000,
    horasExtras: 120000,
    encargos: 320000,
    bonificacoes: 30000,
    totalFolha: 1450000,
  },
  // Card 3 - Proporcao de Custos
  proporcaoCustos: {
    direto: { valor: 850000, percentual: 68 },
    indireto: { valor: 280000, percentual: 22 },
    terceiros: { valor: 120000, percentual: 10 },
  },
  // Card 4 - Jornada & Impacto Financeiro
  jornadaImpacto: {
    horasNormais: 980000,
    horasExtras: 120000,
    totalHE: 1240,
    colaboradoresAcimaLimite: 5,
    tendencia: "up" as const, // up, stable, down
    status: "medio" as const, // baixo, medio, alto
  },
}

// FAIXA 3 - Alertas
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
  { label: "Premios", pendencias: 2, href: "/obra/administrativo/rh/premios", icon: TrendingUp },
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
    <div className="flex-1 flex flex-col min-h-screen">
      <RHNav modulo="obra" />

      <div className="flex-1 space-y-6 p-6">
        {/* ============================================ */}
        {/* HEADER */}
        {/* ============================================ */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <Users className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Visao Geral do RH</h1>
            <p className="text-sm text-muted-foreground">BR-101 LOTE 2 - Janeiro/2026</p>
          </div>
        </div>

        {/* ============================================ */}
        {/* FAIXA 1 - PANORAMA GERAL DE PESSOAS */}
        {/* ============================================ */}
        <div>
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
            Panorama Geral de Pessoas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Card 1 - Efetivo Atual */}
            <Card className="bg-card/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <Users className="h-5 w-5 text-blue-500" />
                  <Badge variant="outline" className="text-xs">
                    Efetivo
                  </Badge>
                </div>
                <div className="space-y-1">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs text-muted-foreground">Total</span>
                    <span className="text-2xl font-bold">{panoramaPessoas.efetivoAtual.total}</span>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs text-muted-foreground">Previsto</span>
                    <span className="text-sm">{panoramaPessoas.efetivoAtual.previsto}</span>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs text-muted-foreground">Gap</span>
                    <span
                      className={`text-sm font-medium ${panoramaPessoas.efetivoAtual.gap < 0 ? "text-red-500" : "text-emerald-500"}`}
                    >
                      {panoramaPessoas.efetivoAtual.gap}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Card 2 - Composicao */}
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
                <div className="space-y-1">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs text-muted-foreground">CLT</span>
                    <span className="text-lg font-bold text-emerald-500">{panoramaPessoas.composicao.clt}</span>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs text-muted-foreground">PJ</span>
                    <span className="text-sm text-purple-500">{panoramaPessoas.composicao.pj}</span>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs text-muted-foreground">Terceirizados</span>
                    <span className="text-sm text-orange-500">{panoramaPessoas.composicao.terceirizados}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Card 3 - Status Operacional */}
            <Card className="bg-card/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <AlertCircle className="h-5 w-5 text-amber-500" />
                  <Badge variant="outline" className="text-xs">
                    Status
                  </Badge>
                </div>
                <div className="space-y-1">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs text-muted-foreground">Ativos</span>
                    <span className="text-lg font-bold text-emerald-500">
                      {panoramaPessoas.statusOperacional.ativos}
                    </span>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs text-muted-foreground">Afastados</span>
                    <span className="text-sm text-amber-500">{panoramaPessoas.statusOperacional.afastados}</span>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs text-muted-foreground">Bloqueados</span>
                    <span className="text-sm text-red-500">{panoramaPessoas.statusOperacional.bloqueados}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Card 4 - Risco & Pendencias */}
            <Card className="bg-red-500/5 border-red-500/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  <Badge className="bg-red-500/20 text-red-400 border-red-500/30 text-xs">Risco</Badge>
                </div>
                <div className="space-y-1">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs text-muted-foreground">Pendencias Criticas</span>
                    <span className="text-lg font-bold text-red-500">
                      {panoramaPessoas.riscoPendencias.pendenciasCriticas}
                    </span>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs text-muted-foreground">Riscos Juridicos</span>
                    <span className="text-sm text-orange-500">{panoramaPessoas.riscoPendencias.riscosJuridicos}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Card 1 - Custo Total de Mao de Obra */}
            <Card className="bg-card/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <DollarSign className="h-5 w-5 text-emerald-500" />
                  <Badge variant="outline" className="text-xs">
                    Custo MO
                  </Badge>
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs text-muted-foreground">CLT</span>
                    <span className="text-sm">{formatCurrency(custoJornada.custoMO.clt)}</span>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs text-muted-foreground">PJ</span>
                    <span className="text-sm">{formatCurrency(custoJornada.custoMO.pj)}</span>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs text-muted-foreground">Terceiros</span>
                    <span className="text-sm">{formatCurrency(custoJornada.custoMO.terceiros)}</span>
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

            {/* Card 2 - Composicao da Folha */}
            <Card className="bg-card/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <Wallet className="h-5 w-5 text-blue-500" />
                  <Badge variant="outline" className="text-xs">
                    Composicao
                  </Badge>
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs text-muted-foreground">Folha Base</span>
                    <span className="text-sm">{formatCurrency(custoJornada.composicaoFolha.folhaBase)}</span>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs text-muted-foreground">Horas Extras</span>
                    <span className="text-sm">{formatCurrency(custoJornada.composicaoFolha.horasExtras)}</span>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs text-muted-foreground">Encargos</span>
                    <span className="text-sm">{formatCurrency(custoJornada.composicaoFolha.encargos)}</span>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs text-muted-foreground">Bonificacoes</span>
                    <span className="text-sm">{formatCurrency(custoJornada.composicaoFolha.bonificacoes)}</span>
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

            {/* Card 3 - Proporcao de Custos */}
            <Card className="bg-card/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <Calculator className="h-5 w-5 text-purple-500" />
                  <Badge variant="outline" className="text-xs">
                    Proporcao
                  </Badge>
                </div>
                <div className="space-y-2">
                  {/* Grafico de barras horizontal simplificado */}
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
                        <span className="text-xs font-medium">
                          {custoJornada.proporcaoCustos.terceiros.percentual}%
                        </span>
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
                </div>
              </CardContent>
            </Card>

            {/* Card 4 - Jornada & Impacto Financeiro */}
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
                    <span className="text-xs text-muted-foreground">Total HE (horas)</span>
                    <span className="text-sm font-medium">{custoJornada.jornadaImpacto.totalHE}h</span>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs text-muted-foreground">Acima do limite</span>
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
                      {custoJornada.jornadaImpacto.tendencia === "stable" && (
                        <span className="text-muted-foreground">→</span>
                      )}
                      <span
                        className={`text-xs font-medium ${
                          custoJornada.jornadaImpacto.tendencia === "up"
                            ? "text-red-500"
                            : custoJornada.jornadaImpacto.tendencia === "down"
                              ? "text-emerald-500"
                              : "text-muted-foreground"
                        }`}
                      >
                        {custoJornada.jornadaImpacto.tendencia === "up"
                          ? "Aumentando"
                          : custoJornada.jornadaImpacto.tendencia === "down"
                            ? "Diminuindo"
                            : "Estavel"}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* ============================================ */}
        {/* FAIXA 3 - ALERTAS & DIRECIONAMENTO */}
        {/* ============================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
                {/* Criticos */}
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

                {/* Atencao */}
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

                {/* Informativos */}
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

          {/* Temas com Pendencia */}
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
              {/* Risco Trabalhista */}
              <div className="flex items-center justify-between p-4 rounded-lg bg-background/50">
                <div>
                  <p className="text-sm text-muted-foreground">Risco Trabalhista</p>
                  <p className="text-sm mt-1">{indicadoresJuridicos.riscoTrabalhista.descricao}</p>
                </div>
                <Badge className={getRiscoColor(indicadoresJuridicos.riscoTrabalhista.nivel)}>
                  {indicadoresJuridicos.riscoTrabalhista.nivel}
                </Badge>
              </div>

              {/* Passivo Potencial */}
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

              {/* Processos Ativos */}
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
      </div>
    </div>
  )
}

export default function RHObraPage() {
  return (
    <Suspense fallback={null}>
      <VisaoGeralContent />
    </Suspense>
  )
}
