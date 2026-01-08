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
  ShieldAlert,
  DollarSign,
  Wallet,
  Calculator,
  Timer,
  Gavel,
  Building2,
  Factory,
  ExternalLink,
} from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"

// ============================================
// DADOS MOCKADOS - VISAO GERAL CORPORATIVO
// ============================================

// FAIXA 1 - Panorama Geral de Pessoas (Consolidado)
const panoramaPessoas = {
  efetivoAtual: {
    total: 1000,
    previsto: 1050,
    gap: -50,
  },
  composicao: {
    clt: 700,
    pj: 100,
    terceirizados: 200,
  },
  statusOperacional: {
    ativos: 960,
    afastados: 28,
    bloqueados: 12,
  },
  riscoPendencias: {
    pendenciasCriticas: 35,
    riscosJuridicos: 8,
  },
}

// FAIXA 2 - Custo & Jornada (Consolidado)
const custoJornada = {
  custoMO: {
    total: 4500000,
    clt: 3500000,
    pjTerceiros: 1000000,
  },
  folhaEncargos: {
    folhaBase: 3500000,
    encargos: 1150000,
    totalGeral: 4650000,
  },
  mediaSalarial: {
    geral: 4500,
    diretos: 3600,
    indiretos: 6800,
  },
  jornadaBH: {
    horasExtras: 4200,
    acimaLimite: 18,
    riscoJuridico: "medio",
  },
}

// Obras / Centros de Custo
const obrasCentroCusto = [
  {
    id: 1,
    nome: "BR-101 Duplicacao - Lote 2",
    tipo: "Obra",
    total: 450,
    clt: 310,
    pj: 50,
    terc: 90,
    status: "ok",
    alertas: 0,
  },
  {
    id: 2,
    nome: "Rodovia SC-401 - Trecho Norte",
    tipo: "Obra",
    total: 300,
    clt: 210,
    pj: 20,
    terc: 70,
    status: "atencao",
    alertas: 2,
  },
  {
    id: 3,
    nome: "Ponte Rio-Niteroi - Manutencao",
    tipo: "Obra",
    total: 200,
    clt: 130,
    pj: 30,
    terc: 40,
    status: "critico",
    alertas: 5,
  },
  { id: 4, nome: "Sede Corporativa", tipo: "Corp", total: 50, clt: 50, pj: 0, terc: 0, status: "ok", alertas: 0 },
]

// Indicadores Juridicos
const indicadoresJuridicos = {
  riscoTrabalhista: { nivel: "medio", descricao: "8 situacoes em monitoramento" },
  passivoPotencial: { valor: 180000, tendencia: "up" },
  processosAtivos: { quantidade: 4, status: "Em andamento" },
}

// Temas com Pendencia
const temasComPendencia = [
  { label: "Pessoas", pendencias: 18, href: "/corporativo/administrativo/rh/pessoas", icon: Users },
  { label: "Conformidade", pendencias: 42, href: "/corporativo/administrativo/rh/conformidade", icon: ShieldAlert },
  { label: "Ponto", pendencias: 15, href: "/corporativo/administrativo/rh/ponto", icon: Clock },
  { label: "Premios", pendencias: 6, href: "/corporativo/administrativo/rh/premios", icon: TrendingUp },
]

// ============================================
// COMPONENTE PRINCIPAL
// ============================================

function VisaoGeralCorporativoContent() {
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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ok":
        return <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">OK</Badge>
      case "atencao":
        return <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">Atencao</Badge>
      case "critico":
        return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Critico</Badge>
      default:
        return <Badge variant="outline">-</Badge>
    }
  }

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <RHNav modulo="corporativo" />

      <div className="flex-1 space-y-6 p-6">
        {/* ============================================ */}
        {/* HEADER */}
        {/* ============================================ */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <Building2 className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Visao Geral do RH</h1>
            <p className="text-sm text-muted-foreground">Visao Global da Empresa - Janeiro/2026</p>
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
                    <span className="text-2xl font-bold">{panoramaPessoas.efetivoAtual.total.toLocaleString()}</span>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs text-muted-foreground">Previsto</span>
                    <span className="text-sm">{panoramaPessoas.efetivoAtual.previsto.toLocaleString()}</span>
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
        {/* FAIXA 2 - CUSTO & JORNADA */}
        {/* ============================================ */}
        <div>
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
            Custo & Jornada (Camada Financeira)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Card 5 - Custo de MO */}
            <Card className="bg-card/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <DollarSign className="h-5 w-5 text-emerald-500" />
                  <Badge variant="outline" className="text-xs">
                    Custo MO
                  </Badge>
                </div>
                <div className="space-y-1">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs text-muted-foreground">Total</span>
                    <span className="text-lg font-bold">{formatCurrency(custoJornada.custoMO.total)}</span>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs text-muted-foreground">CLT</span>
                    <span className="text-sm">{formatCurrency(custoJornada.custoMO.clt)}</span>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs text-muted-foreground">PJ / Terceiros</span>
                    <span className="text-sm">{formatCurrency(custoJornada.custoMO.pjTerceiros)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Card 6 - Folha & Encargos */}
            <Card className="bg-card/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <Wallet className="h-5 w-5 text-blue-500" />
                  <Badge variant="outline" className="text-xs">
                    Folha
                  </Badge>
                </div>
                <div className="space-y-1">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs text-muted-foreground">Folha Base</span>
                    <span className="text-sm">{formatCurrency(custoJornada.folhaEncargos.folhaBase)}</span>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs text-muted-foreground">Encargos</span>
                    <span className="text-sm">{formatCurrency(custoJornada.folhaEncargos.encargos)}</span>
                  </div>
                  <div className="flex items-baseline justify-between border-t pt-1 mt-1">
                    <span className="text-xs text-muted-foreground font-medium">Total Geral</span>
                    <span className="text-lg font-bold">{formatCurrency(custoJornada.folhaEncargos.totalGeral)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Card 7 - Media Salarial */}
            <Card className="bg-card/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <Calculator className="h-5 w-5 text-purple-500" />
                  <Badge variant="outline" className="text-xs">
                    Media
                  </Badge>
                </div>
                <div className="space-y-1">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs text-muted-foreground">Media Geral</span>
                    <span className="text-lg font-bold">{formatCurrency(custoJornada.mediaSalarial.geral)}</span>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs text-muted-foreground">Diretos</span>
                    <span className="text-sm">{formatCurrency(custoJornada.mediaSalarial.diretos)}</span>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs text-muted-foreground">Indiretos</span>
                    <span className="text-sm">{formatCurrency(custoJornada.mediaSalarial.indiretos)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Card 8 - Jornada & BH */}
            <Card
              className={`${custoJornada.jornadaBH.riscoJuridico !== "baixo" ? "bg-amber-500/5 border-amber-500/20" : "bg-card/50"}`}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <Timer className="h-5 w-5 text-amber-500" />
                  <Badge className={getRiscoColor(custoJornada.jornadaBH.riscoJuridico)}>
                    {custoJornada.jornadaBH.riscoJuridico}
                  </Badge>
                </div>
                <div className="space-y-1">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs text-muted-foreground">HE no mes</span>
                    <span className="text-lg font-bold">{custoJornada.jornadaBH.horasExtras.toLocaleString()}h</span>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs text-muted-foreground">Acima do limite</span>
                    <span className="text-sm text-amber-500">{custoJornada.jornadaBH.acimaLimite} colab.</span>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs text-muted-foreground">Risco Juridico</span>
                    <span className="text-sm capitalize">{custoJornada.jornadaBH.riscoJuridico}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* ============================================ */}
        {/* TABELA DE OBRAS */}
        {/* ============================================ */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-medium flex items-center gap-2">
              <Factory className="h-4 w-4" />
              Distribuicao por Obra / Centro de Custo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead className="text-center">Tipo</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                    <TableHead className="text-right">CLT</TableHead>
                    <TableHead className="text-right">PJ</TableHead>
                    <TableHead className="text-right">Terc.</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                    <TableHead className="text-center">Acao</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {obrasCentroCusto.map((obra) => (
                    <TableRow key={obra.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          {obra.nome}
                          {obra.alertas > 0 && (
                            <Badge variant="destructive" className="text-xs">
                              {obra.alertas}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline">{obra.tipo}</Badge>
                      </TableCell>
                      <TableCell className="text-right font-semibold">{obra.total}</TableCell>
                      <TableCell className="text-right">{obra.clt}</TableCell>
                      <TableCell className="text-right">{obra.pj}</TableCell>
                      <TableCell className="text-right">{obra.terc}</TableCell>
                      <TableCell className="text-center">{getStatusBadge(obra.status)}</TableCell>
                      <TableCell className="text-center">
                        <Button variant="ghost" size="sm" asChild>
                          <Link href="/obra/administrativo/rh">
                            <ExternalLink className="h-3 w-3 mr-1" />
                            Acessar
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* ============================================ */}
        {/* FAIXA 3 - TEMAS COM PENDENCIA */}
        {/* ============================================ */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-medium">Temas com Pendencia</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {temasComPendencia.map((item) => (
                <Link key={item.href} href={item.href}>
                  <div className="flex items-center gap-3 p-4 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer group">
                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{item.label}</p>
                      <Badge variant="destructive" className="text-xs mt-1">
                        {item.pendencias} pendencias
                      </Badge>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

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

export default function RHCorporativoPage() {
  return (
    <Suspense fallback={null}>
      <VisaoGeralCorporativoContent />
    </Suspense>
  )
}
