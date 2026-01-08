"use client"

import { Suspense } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RHNav } from "@/components/rh/rh-nav"
import {
  Users,
  UserCheck,
  AlertTriangle,
  AlertCircle,
  Ban,
  Hourglass,
  Scale,
  ChevronRight,
  TrendingUp,
  TrendingDown,
  Clock,
  FileWarning,
  ShieldAlert,
} from "lucide-react"

// ============================================
// DADOS MOCKADOS - VISAO GERAL
// ============================================

const resumoGeral = {
  totalPessoas: 300,
  clt: 210,
  pj: 20,
  terceirizados: 70,
  ativos: 285,
  afastados: 9,
  bloqueados: 6,
  pendenciasCriticas: 12,
  riscoJuridico: 3,
}

const alertasImportantes = [
  { tipo: "critico", msg: "5 ASOs vencendo nos proximos 7 dias", link: "/obra/administrativo/rh/conformidade" },
  { tipo: "critico", msg: "3 colaboradores com NRs pendentes", link: "/obra/administrativo/rh/conformidade" },
  { tipo: "atencao", msg: "12 documentos aguardando validacao", link: "/obra/administrativo/rh/conformidade" },
  { tipo: "atencao", msg: "Banco de horas: 5 colaboradores acima do limite", link: "/obra/administrativo/rh/ponto" },
  { tipo: "info", msg: "8 ferias programadas para este mes", link: "/obra/administrativo/rh/pessoas" },
]

const atalhosComPendencias = [
  { label: "Pessoas", pendencias: 6, href: "/obra/administrativo/rh/pessoas", icon: Users },
  { label: "Conformidade", pendencias: 15, href: "/obra/administrativo/rh/conformidade", icon: ShieldAlert },
  { label: "Ponto", pendencias: 5, href: "/obra/administrativo/rh/ponto", icon: Clock },
  { label: "Premios", pendencias: 2, href: "/obra/administrativo/rh/premios", icon: TrendingUp },
]

const indicadoresJuridicos = [
  { label: "Risco Trabalhista", valor: 2, nivel: "medio", trend: "up" },
  { label: "Passivo Potencial", valor: "R$ 45.000", nivel: "baixo", trend: "down" },
  { label: "Processos Ativos", valor: 1, nivel: "baixo", trend: "stable" },
]

// ============================================
// COMPONENTE PRINCIPAL
// ============================================

function VisaoGeralContent() {
  return (
    <div className="flex-1 flex flex-col">
      <RHNav modulo="obra" />

      <div className="flex-1 space-y-6 p-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <Users className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Visão Geral do RH</h1>
            <p className="text-sm text-muted-foreground">BR-101 LOTE 2 - Janeiro/2026</p>
          </div>
        </div>

        {/* Cards Principais */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          <Card className="bg-card/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <Users className="h-5 w-5 text-muted-foreground" />
                <Badge variant="outline" className="text-xs">
                  Total
                </Badge>
              </div>
              <p className="text-3xl font-bold mt-2">{resumoGeral.totalPessoas}</p>
              <p className="text-xs text-muted-foreground">Pessoas</p>
            </CardContent>
          </Card>

          <Card className="bg-card/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <UserCheck className="h-5 w-5 text-blue-500" />
                <span className="text-xs text-muted-foreground">CLT</span>
              </div>
              <p className="text-3xl font-bold mt-2">{resumoGeral.clt}</p>
              <div className="flex gap-2 mt-1">
                <Badge variant="outline" className="text-xs">
                  PJ: {resumoGeral.pj}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  Terc: {resumoGeral.terceirizados}
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex gap-1">
                  <Hourglass className="h-5 w-5 text-yellow-500" />
                  <Ban className="h-5 w-5 text-red-500" />
                </div>
              </div>
              <div className="flex gap-4 mt-2">
                <div>
                  <p className="text-2xl font-bold">{resumoGeral.afastados}</p>
                  <p className="text-xs text-muted-foreground">Afastados</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-red-500">{resumoGeral.bloqueados}</p>
                  <p className="text-xs text-muted-foreground">Bloqueados</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-red-500/10 border-red-500/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                <Badge className="bg-red-500/20 text-red-400 border-red-500/30 text-xs">Critico</Badge>
              </div>
              <p className="text-3xl font-bold mt-2 text-red-500">{resumoGeral.pendenciasCriticas}</p>
              <p className="text-xs text-red-400">Pendencias Criticas</p>
            </CardContent>
          </Card>

          <Card className="bg-orange-500/10 border-orange-500/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <Scale className="h-5 w-5 text-orange-500" />
                <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30 text-xs">Juridico</Badge>
              </div>
              <p className="text-3xl font-bold mt-2 text-orange-500">{resumoGeral.riscoJuridico}</p>
              <p className="text-xs text-orange-400">Riscos Identificados</p>
            </CardContent>
          </Card>
        </div>

        {/* Alertas + Atalhos + Juridico */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Alertas Importantes */}
          <Card className="lg:col-span-2">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-medium flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-yellow-500" />
                Alertas Importantes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {alertasImportantes.map((alerta, idx) => (
                <Link key={idx} href={alerta.link}>
                  <div
                    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                      alerta.tipo === "critico"
                        ? "bg-red-500/10 hover:bg-red-500/20 border border-red-500/30"
                        : alerta.tipo === "atencao"
                          ? "bg-yellow-500/10 hover:bg-yellow-500/20 border border-yellow-500/30"
                          : "bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30"
                    }`}
                  >
                    {alerta.tipo === "critico" ? (
                      <AlertTriangle className="h-4 w-4 text-red-500 shrink-0" />
                    ) : alerta.tipo === "atencao" ? (
                      <AlertCircle className="h-4 w-4 text-yellow-500 shrink-0" />
                    ) : (
                      <FileWarning className="h-4 w-4 text-blue-500 shrink-0" />
                    )}
                    <span className="text-sm flex-1">{alerta.msg}</span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </Link>
              ))}
            </CardContent>
          </Card>

          {/* Atalhos com Pendencias */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-medium">Temas com Pendencias</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {atalhosComPendencias.map((item) => (
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

        {/* Indicadores Juridicos Transversais */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-medium flex items-center gap-2">
              <Scale className="h-4 w-4 text-orange-500" />
              Indicadores Juridicos (Transversal)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {indicadoresJuridicos.map((ind) => (
                <div key={ind.label} className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                  <div>
                    <p className="text-sm text-muted-foreground">{ind.label}</p>
                    <p className="text-xl font-bold">{ind.valor}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      className={`text-xs ${
                        ind.nivel === "baixo"
                          ? "bg-green-500/20 text-green-400"
                          : ind.nivel === "medio"
                            ? "bg-yellow-500/20 text-yellow-400"
                            : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {ind.nivel}
                    </Badge>
                    {ind.trend === "up" ? (
                      <TrendingUp className="h-4 w-4 text-red-500" />
                    ) : ind.trend === "down" ? (
                      <TrendingDown className="h-4 w-4 text-green-500" />
                    ) : null}
                  </div>
                </div>
              ))}
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
