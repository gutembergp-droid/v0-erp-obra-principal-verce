"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PageContent } from "@/components/layout/page-content"
import {
  Users,
  UserCheck,
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
  CheckCircle2,
  XCircle,
  Send,
  Banknote,
  FileCheck,
  ClipboardCheck,
} from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

// Dados mockados
const rhInternoCorporativo = {
  efetivo: { total: 15, clt: 12, pj: 3 },
  status: { ativos: 14, afastados: 1, bloqueados: 0 },
  pendencias: { docs: 1, aso: 1, total: 2 },
  custoMensal: 283425,
}

const panoramaPessoas = {
  efetivoAtual: { total: 1000, previsto: 1050, gap: -50 },
  composicao: { clt: 700, pj: 100, terceirizados: 200 },
  statusOperacional: { ativos: 960, afastados: 28, bloqueados: 12 },
  riscoPendencias: { pendenciasCriticas: 35, riscosJuridicos: 8 },
}

const custoJornada = {
  custoMO: { total: 4500000, clt: 3500000, pjTerceiros: 1000000 },
  folhaEncargos: { folhaBase: 3500000, encargos: 1150000, totalGeral: 4650000 },
  mediaSalarial: { geral: 4500, diretos: 3600, indiretos: 6800 },
  jornadaBH: { horasExtras: 4200, acimaLimite: 18, riscoJuridico: "medio" },
}

const statusFechamentoObras = [
  {
    id: 1,
    nome: "BR-101 Duplicacao - Lote 2",
    pontoFechado: true,
    folhaConsolidada: true,
    enviadoCustos: true,
    aprovadoGerencia: true,
    enviadoFinanceiro: true,
    status: "concluido",
    valorFolha: 1850000,
  },
  {
    id: 2,
    nome: "Rodovia SC-401 - Trecho Norte",
    pontoFechado: true,
    folhaConsolidada: true,
    enviadoCustos: true,
    aprovadoGerencia: false,
    enviadoFinanceiro: false,
    status: "em_aprovacao",
    valorFolha: 1200000,
  },
  {
    id: 3,
    nome: "Ponte Rio-Niteroi - Manutencao",
    pontoFechado: true,
    folhaConsolidada: false,
    enviadoCustos: false,
    aprovadoGerencia: false,
    enviadoFinanceiro: false,
    status: "pendente",
    valorFolha: 850000,
  },
  {
    id: 4,
    nome: "Sede Corporativa",
    pontoFechado: true,
    folhaConsolidada: true,
    enviadoCustos: false,
    aprovadoGerencia: false,
    enviadoFinanceiro: false,
    status: "em_aprovacao",
    valorFolha: 283425,
  },
]

const consolidacaoPagamento = {
  totalObras: 4,
  obrasFinalizadas: 1,
  obrasPendentes: 3,
  totalAPagar: 4183425,
  totalAprovado: 1850000,
  totalPendente: 2333425,
  dataPagamento: "05/02/2026",
  statusBanco: "aguardando_aprovacoes",
}

const indicadoresJuridicos = {
  riscoTrabalhista: { nivel: "medio", descricao: "8 situacoes em monitoramento" },
  passivoPotencial: { valor: 180000, tendencia: "up" },
  processosAtivos: { quantidade: 4, status: "Em andamento" },
}

const temasComPendencia = [
  { label: "Pessoas", pendencias: 18, href: "#", icon: Users },
  { label: "Conformidade", pendencias: 42, href: "#", icon: ShieldAlert },
  { label: "Ponto", pendencias: 15, href: "#", icon: Clock },
]

export default function VisaoGeralContent() {
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
      case "concluido":
        return <Badge className="bg-emerald-500/20 text-emerald-600">Concluido</Badge>
      case "em_aprovacao":
        return <Badge className="bg-blue-500/20 text-blue-600">Em Aprovacao</Badge>
      case "pendente":
        return <Badge className="bg-amber-500/20 text-amber-600">Pendente</Badge>
      default:
        return <Badge variant="outline">-</Badge>
    }
  }

  const progressoPagamento = (consolidacaoPagamento.obrasFinalizadas / consolidacaoPagamento.totalObras) * 100

  return (
    <PageContent className="flex-1">
      {/* HEADER */}
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          <Building2 className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Visao Geral do RH</h1>
          <p className="text-sm text-muted-foreground">Visao Global da Empresa - Janeiro/2026</p>
        </div>
      </div>

      {/* BLOCO 1 - RH INTERNO CORPORATIVO */}
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-medium flex items-center gap-2">
            <Building2 className="h-4 w-4 text-primary" />
            RH Interno - Escritorio Central
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-3 rounded-lg bg-background/50">
              <p className="text-xs text-muted-foreground">Efetivo</p>
              <p className="text-xl font-bold">{rhInternoCorporativo.efetivo.total}</p>
              <p className="text-xs text-muted-foreground">
                CLT: {rhInternoCorporativo.efetivo.clt} | PJ: {rhInternoCorporativo.efetivo.pj}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-background/50">
              <p className="text-xs text-muted-foreground">Status</p>
              <p className="text-xl font-bold text-emerald-600">{rhInternoCorporativo.status.ativos} ativos</p>
              <p className="text-xs text-muted-foreground">
                Afastados: {rhInternoCorporativo.status.afastados} | Bloq: {rhInternoCorporativo.status.bloqueados}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-background/50">
              <p className="text-xs text-muted-foreground">Pendencias</p>
              <p className="text-xl font-bold text-amber-600">{rhInternoCorporativo.pendencias.total}</p>
              <p className="text-xs text-muted-foreground">
                Docs: {rhInternoCorporativo.pendencias.docs} | ASO: {rhInternoCorporativo.pendencias.aso}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-background/50">
              <p className="text-xs text-muted-foreground">Custo Mensal</p>
              <p className="text-xl font-bold">{formatCurrency(rhInternoCorporativo.custoMensal)}</p>
              <p className="text-xs text-muted-foreground">Folha + Encargos + Beneficios</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* BLOCO 2 - STATUS DE FECHAMENTO DAS OBRAS */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-medium flex items-center gap-2">
            <ClipboardCheck className="h-4 w-4" />
            Status de Fechamento - Todas as Obras
            <Badge variant="outline" className="ml-2">
              Janeiro/2026
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Obra</TableHead>
                  <TableHead className="text-center">Ponto</TableHead>
                  <TableHead className="text-center">Folha</TableHead>
                  <TableHead className="text-center">Custos</TableHead>
                  <TableHead className="text-center">Gerencia</TableHead>
                  <TableHead className="text-center">Financeiro</TableHead>
                  <TableHead className="text-right">Valor</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {statusFechamentoObras.map((obra) => (
                  <TableRow key={obra.id}>
                    <TableCell className="font-medium">{obra.nome}</TableCell>
                    <TableCell className="text-center">
                      {obra.pontoFechado ? (
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 mx-auto" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-500 mx-auto" />
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      {obra.folhaConsolidada ? (
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 mx-auto" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-500 mx-auto" />
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      {obra.enviadoCustos ? (
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 mx-auto" />
                      ) : (
                        <Clock className="h-4 w-4 text-amber-500 mx-auto" />
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      {obra.aprovadoGerencia ? (
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 mx-auto" />
                      ) : (
                        <Clock className="h-4 w-4 text-amber-500 mx-auto" />
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      {obra.enviadoFinanceiro ? (
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 mx-auto" />
                      ) : (
                        <Clock className="h-4 w-4 text-muted-foreground mx-auto" />
                      )}
                    </TableCell>
                    <TableCell className="text-right font-medium">{formatCurrency(obra.valorFolha)}</TableCell>
                    <TableCell className="text-center">{getStatusBadge(obra.status)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* BLOCO 3 - CONSOLIDACAO / PAGAMENTO */}
      <Card className="border-emerald-500/20 bg-emerald-500/5">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-medium flex items-center gap-2">
            <Banknote className="h-4 w-4 text-emerald-600" />
            Consolidacao de Pagamento - Janeiro/2026
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Progresso de Fechamento</span>
              <span className="font-medium">
                {consolidacaoPagamento.obrasFinalizadas} de {consolidacaoPagamento.totalObras} obras
              </span>
            </div>
            <Progress value={progressoPagamento} className="h-2" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-3 rounded-lg bg-background/50">
              <p className="text-xs text-muted-foreground">Total a Pagar</p>
              <p className="text-xl font-bold">{formatCurrency(consolidacaoPagamento.totalAPagar)}</p>
            </div>
            <div className="p-3 rounded-lg bg-background/50">
              <p className="text-xs text-muted-foreground">Aprovado</p>
              <p className="text-xl font-bold text-emerald-600">{formatCurrency(consolidacaoPagamento.totalAprovado)}</p>
            </div>
            <div className="p-3 rounded-lg bg-background/50">
              <p className="text-xs text-muted-foreground">Pendente Aprovacao</p>
              <p className="text-xl font-bold text-amber-600">{formatCurrency(consolidacaoPagamento.totalPendente)}</p>
            </div>
            <div className="p-3 rounded-lg bg-background/50">
              <p className="text-xs text-muted-foreground">Data Pagamento</p>
              <p className="text-xl font-bold">{consolidacaoPagamento.dataPagamento}</p>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg bg-background/50 border">
            <div className="flex items-center gap-2">
              <FileCheck className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-sm font-medium">Status do Pagamento</p>
                <p className="text-xs text-muted-foreground">Arquivo de pagamento para o banco</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-amber-500/20 text-amber-600">Aguardando Aprovacoes</Badge>
              <Button size="sm" disabled>
                <Send className="h-4 w-4 mr-2" />
                Gerar Arquivo Banco
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* FAIXA - PANORAMA CONSOLIDADO */}
      <div>
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
          Panorama Consolidado - Todas as Obras
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
                  <span className="text-lg font-bold text-emerald-500">{panoramaPessoas.statusOperacional.ativos}</span>
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
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* TEMAS COM PENDENCIA */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-medium">Temas com Pendencia</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            {temasComPendencia.map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-3 p-4 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer group"
              >
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
            ))}
          </div>
        </CardContent>
      </Card>

      {/* RODAPE - INDICADORES JURIDICOS */}
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
  )
}
