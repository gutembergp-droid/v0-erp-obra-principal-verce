"use client"

import type React from "react"
import { Suspense, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { CockpitTabsNavbar } from "../../_components/cockpit-tabs-navbar"
import {
  Gauge,
  AlertTriangle,
  ArrowUp,
  ArrowDown,
  TrendingUp,
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  Receipt,
  CreditCard,
  PiggyBank,
  Building2,
  Banknote,
  CheckCircle2,
  AlertCircle,
  BarChart3,
  CircleDollarSign,
  Calculator,
  Target,
  FileText,
} from "lucide-react"
import { InfoTooltip } from "@/components/ui/info-tooltip"

// ============================================================================
// DADOS MOCKADOS - VISAO 100% FINANCEIRO
// ============================================================================

const saldos = {
  contaCorrente: 1850000,
  aplicacoes: 3200000,
  caixaObra: 450000,
  saldoTotal: 5500000,
  variacaoMes: 8.2,
}

const fluxoCaixaMensal = {
  entradas: 12800000,
  saidas: 11950000,
  saldo: 850000,
  previstoEntradas: 13500000,
  previstoSaidas: 12200000,
}

const fluxoCaixaHistorico = [
  { mes: "Ago", entrada: 11200000, saida: 10800000, saldo: 400000 },
  { mes: "Set", entrada: 12500000, saida: 11900000, saldo: 600000 },
  { mes: "Out", entrada: 11800000, saida: 12100000, saldo: -300000 },
  { mes: "Nov", entrada: 13200000, saida: 12400000, saldo: 800000 },
  { mes: "Dez", entrada: 12100000, saida: 11600000, saldo: 500000 },
  { mes: "Jan", entrada: 12800000, saida: 11950000, saldo: 850000 },
]

const contasPagar = {
  vencidas: 1250000,
  vencerHoje: 380000,
  vencer7Dias: 2100000,
  vencer30Dias: 4800000,
  total: 8530000,
  qtdTitulos: 156,
}

const contasReceber = {
  vencidas: 890000,
  vencerHoje: 0,
  vencer7Dias: 2300000,
  vencer30Dias: 8500000,
  total: 11690000,
  qtdTitulos: 23,
}

const indicadoresFinanceiros = [
  { nome: "Liquidez Corrente", valor: 1.37, meta: 1.2, unidade: "", status: "ok" },
  { nome: "Indice de Cobertura", valor: 2.1, meta: 1.5, unidade: "x", status: "ok" },
  { nome: "Ciclo Financeiro", valor: 45, meta: 30, unidade: " dias", status: "atencao" },
  { nome: "PMR", valor: 28, meta: 30, unidade: " dias", status: "ok" },
  { nome: "PMP", valor: 35, meta: 30, unidade: " dias", status: "atencao" },
  { nome: "Capital de Giro", valor: 3200000, meta: 2500000, unidade: "", status: "ok" },
]

const recebimentosPendentes = [
  { id: 1, cliente: "DNIT", nf: "NF-2024/089", valor: 2300000, vencimento: "25/01/2025", status: "a_vencer" },
  { id: 2, cliente: "DNIT", nf: "NF-2024/085", valor: 890000, vencimento: "10/01/2025", status: "vencida" },
  { id: 3, cliente: "DNIT", nf: "NF-2024/091", valor: 1850000, vencimento: "05/02/2025", status: "a_vencer" },
  { id: 4, cliente: "DNIT", nf: "NF-2024/093", valor: 3200000, vencimento: "15/02/2025", status: "a_vencer" },
]

const pagamentosPendentes = [
  { id: 1, fornecedor: "Gerdau", titulo: "DUP-45678", valor: 580000, vencimento: "05/01/2025", status: "vencida" },
  { id: 2, fornecedor: "Votorantim", titulo: "NF-98765", valor: 380000, vencimento: "15/01/2025", status: "hoje" },
  { id: 3, fornecedor: "Mills", titulo: "FAT-12345", valor: 420000, vencimento: "20/01/2025", status: "a_vencer" },
  { id: 4, fornecedor: "Engeform", titulo: "NF-54321", valor: 850000, vencimento: "22/01/2025", status: "a_vencer" },
  { id: 5, fornecedor: "Sodexo", titulo: "FAT-87654", valor: 290000, vencimento: "25/01/2025", status: "a_vencer" },
]

const projecaoFluxo = [
  { mes: "Fev", entrada: 13500000, saida: 12800000, saldoProjetado: 700000 },
  { mes: "Mar", entrada: 14200000, saida: 13100000, saldoProjetado: 1100000 },
  { mes: "Abr", entrada: 13800000, saida: 13500000, saldoProjetado: 300000 },
]

const bancosContas = [
  { banco: "Banco do Brasil", conta: "12345-6", saldo: 1850000, tipo: "Conta Corrente" },
  { banco: "Itau", conta: "98765-4", saldo: 2100000, tipo: "Aplicacao CDB" },
  { banco: "Bradesco", conta: "55555-0", saldo: 1100000, tipo: "Aplicacao LCA" },
  { banco: "Caixa Obra", conta: "-", saldo: 450000, tipo: "Caixa Fisico" },
]

const alertasFinanceiros = [
  { id: 1, tipo: "critico", titulo: "3 titulos vencidos a pagar", valor: "R$ 1.25 Mi", acao: "Regularizar" },
  { id: 2, tipo: "critico", titulo: "1 NF vencida a receber", valor: "R$ 890 mil", acao: "Cobrar" },
  { id: 3, tipo: "atencao", titulo: "Ciclo financeiro acima da meta", valor: "45 dias", acao: "Analisar" },
  { id: 4, tipo: "atencao", titulo: "Pagamentos vencem hoje", valor: "R$ 380 mil", acao: "Aprovar" },
  { id: 5, tipo: "info", titulo: "Liquidez corrente saudavel", valor: "1.37", acao: "Manter" },
]

// ============================================================================
// FUNCOES UTILITARIAS
// ============================================================================

function formatarMoeda(valor: number): string {
  if (Math.abs(valor) >= 1000000) return `R$ ${(valor / 1000000).toFixed(1)} Mi`
  if (Math.abs(valor) >= 1000) return `R$ ${(valor / 1000).toFixed(0)} mil`
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 })
}

function formatarMoedaCompacta(valor: number): string {
  if (Math.abs(valor) >= 1000000) return `${(valor / 1000000).toFixed(1)}M`
  if (Math.abs(valor) >= 1000) return `${(valor / 1000).toFixed(0)}K`
  return valor.toString()
}

// ============================================================================
// COMPONENTES
// ============================================================================

interface CardSaldoProps {
  titulo: string
  valor: number
  icone: React.ReactNode
  variacao?: number
  subtitulo?: string
  destaque?: boolean
}

function CardSaldo({ titulo, valor, icone, variacao, subtitulo, destaque = false }: CardSaldoProps) {
  return (
    <div className={`p-3 rounded-lg border ${destaque ? "border-primary/50 bg-primary/5" : "border-border bg-card"}`}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className={`${destaque ? "text-primary" : "text-muted-foreground"}`}>{icone}</div>
          <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">{titulo}</span>
        </div>
        {variacao !== undefined && (
          <div
            className={`flex items-center gap-0.5 text-[10px] font-semibold ${variacao >= 0 ? "text-primary" : "text-destructive"}`}
          >
            {variacao >= 0 ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
            {variacao > 0 ? "+" : ""}
            {variacao.toFixed(1)}%
          </div>
        )}
      </div>
      <div className={`text-xl font-bold tabular-nums ${destaque ? "text-primary" : "text-foreground"}`}>
        {formatarMoeda(valor)}
      </div>
      {subtitulo && <span className="text-[10px] text-muted-foreground">{subtitulo}</span>}
    </div>
  )
}

interface CardContasProps {
  titulo: string
  total: number
  vencidas: number
  vencerHoje: number
  vencer7Dias: number
  vencer30Dias: number
  qtdTitulos: number
  icone: React.ReactNode
  tipo: "pagar" | "receber"
  onClick?: () => void
}

function CardContas({
  titulo,
  total,
  vencidas,
  vencerHoje,
  vencer7Dias,
  vencer30Dias,
  qtdTitulos,
  icone,
  tipo,
  onClick,
}: CardContasProps) {
  const corTipo = tipo === "pagar" ? "destructive" : "primary"

  return (
    <div
      className="p-3 rounded-lg border border-border bg-card cursor-pointer hover:border-primary/40 transition-colors"
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="text-muted-foreground">{icone}</div>
          <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">{titulo}</span>
        </div>
        <Badge variant="outline" className="text-[9px] h-5">
          {qtdTitulos} titulos
        </Badge>
      </div>

      <div className="text-xl font-bold tabular-nums text-foreground mb-3">{formatarMoeda(total)}</div>

      <div className="space-y-1.5">
        {vencidas > 0 && (
          <div className="flex items-center justify-between text-[10px]">
            <span className="text-destructive font-medium">Vencidas</span>
            <span className="font-semibold text-destructive">{formatarMoeda(vencidas)}</span>
          </div>
        )}
        {vencerHoje > 0 && (
          <div className="flex items-center justify-between text-[10px]">
            <span className="text-amber-500 font-medium">Vence Hoje</span>
            <span className="font-semibold text-amber-500">{formatarMoeda(vencerHoje)}</span>
          </div>
        )}
        <div className="flex items-center justify-between text-[10px]">
          <span className="text-muted-foreground">Proximos 7 dias</span>
          <span className="font-medium text-foreground">{formatarMoeda(vencer7Dias)}</span>
        </div>
        <div className="flex items-center justify-between text-[10px]">
          <span className="text-muted-foreground">Proximos 30 dias</span>
          <span className="font-medium text-foreground">{formatarMoeda(vencer30Dias)}</span>
        </div>
      </div>
    </div>
  )
}

function GraficoFluxoCaixa({ onClick }: { onClick?: () => void }) {
  const maxValor = Math.max(...fluxoCaixaHistorico.flatMap((m) => [m.entrada, m.saida]))

  return (
    <div
      className="p-3 rounded-lg border border-border bg-card cursor-pointer hover:border-primary/40 transition-colors h-full"
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-muted-foreground" />
          <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">
            Fluxo de Caixa - Ultimos 6 Meses
          </span>
        </div>
        <div className="flex items-center gap-3 text-[9px]">
          <span className="flex items-center gap-1">
            <div className="w-2 h-2 bg-primary rounded-sm" /> Entradas
          </span>
          <span className="flex items-center gap-1">
            <div className="w-2 h-2 bg-destructive/70 rounded-sm" /> Saidas
          </span>
        </div>
      </div>

      <div className="flex items-end justify-between gap-3 h-28 mb-2">
        {fluxoCaixaHistorico.map((m, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-1">
            <div className="flex items-end gap-1 h-20 w-full">
              <div
                className="flex-1 bg-primary rounded-t transition-all"
                style={{ height: `${(m.entrada / maxValor) * 100}%` }}
              />
              <div
                className="flex-1 bg-destructive/70 rounded-t transition-all"
                style={{ height: `${(m.saida / maxValor) * 100}%` }}
              />
            </div>
            <span className="text-[9px] text-muted-foreground">{m.mes}</span>
            <span className={`text-[8px] font-semibold ${m.saldo >= 0 ? "text-primary" : "text-destructive"}`}>
              {m.saldo >= 0 ? "+" : ""}
              {formatarMoedaCompacta(m.saldo)}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function ProjecaoFluxo() {
  const maxValor = Math.max(...projecaoFluxo.flatMap((m) => [m.entrada, m.saida]))

  return (
    <div className="p-3 rounded-lg border border-border bg-card h-full">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-muted-foreground" />
          <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">
            Projecao Proximos 3 Meses
          </span>
        </div>
        <Badge variant="outline" className="text-[9px] h-5 border-primary/50 text-primary">
          Forecast
        </Badge>
      </div>

      <div className="space-y-2">
        {projecaoFluxo.map((m, i) => (
          <div key={i} className="p-2 rounded border border-border/50 bg-muted/20">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-semibold">{m.mes}/2025</span>
              <span className={`text-[10px] font-bold ${m.saldoProjetado >= 0 ? "text-primary" : "text-destructive"}`}>
                Saldo: {m.saldoProjetado >= 0 ? "+" : ""}
                {formatarMoeda(m.saldoProjetado)}
              </span>
            </div>
            <div className="flex items-center gap-2 text-[9px]">
              <span className="flex items-center gap-1">
                <ArrowUpRight className="w-3 h-3 text-primary" />
                {formatarMoeda(m.entrada)}
              </span>
              <span className="flex items-center gap-1">
                <ArrowDownRight className="w-3 h-3 text-destructive" />
                {formatarMoeda(m.saida)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function TabelaBancos() {
  return (
    <div className="p-3 rounded-lg border border-border bg-card">
      <div className="flex items-center gap-2 mb-3">
        <Building2 className="w-4 h-4 text-muted-foreground" />
        <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">Posicao Bancaria</span>
      </div>

      <div className="space-y-1.5">
        {bancosContas.map((b, i) => (
          <div key={i} className="flex items-center justify-between py-1.5 border-b border-border/50 last:border-0">
            <div className="flex flex-col">
              <span className="text-[11px] font-medium">{b.banco}</span>
              <span className="text-[9px] text-muted-foreground">{b.tipo}</span>
            </div>
            <span className="text-[11px] font-semibold tabular-nums">{formatarMoeda(b.saldo)}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function IndicadoresFinanceiros() {
  return (
    <div className="p-3 rounded-lg border border-border bg-card">
      <div className="flex items-center gap-2 mb-3">
        <Calculator className="w-4 h-4 text-muted-foreground" />
        <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">
          Indicadores Financeiros
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {indicadoresFinanceiros.map((ind, i) => {
          const percentualMeta =
            typeof ind.valor === "number" && typeof ind.meta === "number" ? (ind.valor / ind.meta) * 100 : 100

          return (
            <div key={i} className="p-2 rounded border border-border/50 bg-muted/20">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[9px] text-muted-foreground">{ind.nome}</span>
                <div
                  className={`w-2 h-2 rounded-full ${
                    ind.status === "ok" ? "bg-primary" : ind.status === "atencao" ? "bg-amber-500" : "bg-destructive"
                  }`}
                />
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-sm font-bold tabular-nums">
                  {typeof ind.valor === "number" && ind.valor >= 10000 ? formatarMoeda(ind.valor) : ind.valor}
                  {ind.unidade}
                </span>
                <span className="text-[9px] text-muted-foreground">
                  meta: {typeof ind.meta === "number" && ind.meta >= 10000 ? formatarMoeda(ind.meta) : ind.meta}
                  {ind.unidade}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ============================================================================
// COMPONENTE PRINCIPAL - VISAO FINANCEIRO
// ============================================================================

function VisaoFinanceiroContent() {
  const router = useRouter()
  const [painelAberto, setPainelAberto] = useState(false)
  const [painelTipo, setPainelTipo] = useState<"pagar" | "receber" | "fluxo" | null>(null)

  const abrirPainel = (tipo: "pagar" | "receber" | "fluxo") => {
    setPainelTipo(tipo)
    setPainelAberto(true)
  }

  return (
    <div className="flex flex-col h-screen bg-muted/30 overflow-hidden">
      {/* Topbar Secundário */}
      <div className="flex-shrink-0 z-40 mt-0">
        <CockpitTabsNavbar />
      </div>

      {/* Conteúdo com moldura */}
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
        {/* HEADER */}
        <div className="flex items-center justify-between mb-4 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-9 h-9 rounded-lg border border-border">
              <Gauge className="w-4 h-4 text-muted-foreground" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-foreground">Cockpit de Governanca</h1>
                <InfoTooltip
                  title="Visao Financeiro"
                  description="Fluxo de caixa, contas a pagar/receber e indicadores financeiros"
                />
                <Badge variant="outline" className="text-[9px] h-5 border-primary/50 text-primary bg-primary/10">
                  FINANCEIRO
                </Badge>
              </div>
              <p className="text-[11px] text-muted-foreground">BR-101 LOTE 2 | Compor 90</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-[10px] h-6 px-2">
              Janeiro 2025
            </Badge>
            <Button variant="outline" size="sm" className="h-8 w-8 p-0 bg-transparent" title="Gerar Relatorio">
              <FileText className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* ================================================================== */}
        {/* BLOCO: SALDOS E DISPONIBILIDADES                                   */}
        {/* ================================================================== */}
        <div className="mb-4 flex-shrink-0">
          <div className="flex items-center gap-2 mb-3">
            <Wallet className="w-4 h-4 text-muted-foreground" />
            <h2 className="text-xs font-semibold uppercase tracking-wide text-foreground">Saldos e Disponibilidades</h2>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div className="grid grid-cols-4 gap-2">
            <CardSaldo
              titulo="Saldo Total"
              valor={saldos.saldoTotal}
              icone={<CircleDollarSign className="w-4 h-4" />}
              variacao={saldos.variacaoMes}
              destaque
            />
            <CardSaldo
              titulo="Conta Corrente"
              valor={saldos.contaCorrente}
              icone={<Building2 className="w-4 h-4" />}
              subtitulo="Banco do Brasil"
            />
            <CardSaldo
              titulo="Aplicacoes"
              valor={saldos.aplicacoes}
              icone={<PiggyBank className="w-4 h-4" />}
              subtitulo="CDB + LCA"
            />
            <CardSaldo
              titulo="Caixa Obra"
              valor={saldos.caixaObra}
              icone={<Banknote className="w-4 h-4" />}
              subtitulo="Fundo fixo"
            />
          </div>
        </div>

        {/* ================================================================== */}
        {/* BLOCO: FLUXO DE CAIXA DO MES                                       */}
        {/* ================================================================== */}
        <div className="mb-4 flex-shrink-0">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-4 h-4 text-muted-foreground" />
            <h2 className="text-xs font-semibold uppercase tracking-wide text-foreground">
              Fluxo de Caixa - Janeiro/2025
            </h2>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div className="grid grid-cols-5 gap-2">
            <div className="p-3 rounded-lg border border-border bg-card">
              <div className="flex items-center gap-2 mb-2">
                <ArrowUpRight className="w-4 h-4 text-primary" />
                <span className="text-[10px] text-muted-foreground uppercase">Entradas</span>
              </div>
              <div className="text-xl font-bold text-primary tabular-nums">
                {formatarMoeda(fluxoCaixaMensal.entradas)}
              </div>
              <div className="text-[9px] text-muted-foreground mt-1">
                Prev: {formatarMoeda(fluxoCaixaMensal.previstoEntradas)}
              </div>
              <Progress
                value={(fluxoCaixaMensal.entradas / fluxoCaixaMensal.previstoEntradas) * 100}
                className="h-1 mt-1.5"
              />
            </div>

            <div className="p-3 rounded-lg border border-border bg-card">
              <div className="flex items-center gap-2 mb-2">
                <ArrowDownRight className="w-4 h-4 text-destructive" />
                <span className="text-[10px] text-muted-foreground uppercase">Saidas</span>
              </div>
              <div className="text-xl font-bold text-destructive tabular-nums">
                {formatarMoeda(fluxoCaixaMensal.saidas)}
              </div>
              <div className="text-[9px] text-muted-foreground mt-1">
                Prev: {formatarMoeda(fluxoCaixaMensal.previstoSaidas)}
              </div>
              <Progress
                value={(fluxoCaixaMensal.saidas / fluxoCaixaMensal.previstoSaidas) * 100}
                className="h-1 mt-1.5"
              />
            </div>

            <div className="p-3 rounded-lg border border-primary/50 bg-primary/5">
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-4 h-4 text-primary" />
                <span className="text-[10px] text-muted-foreground uppercase">Saldo Mes</span>
              </div>
              <div className="text-xl font-bold text-primary tabular-nums">
                +{formatarMoeda(fluxoCaixaMensal.saldo)}
              </div>
              <div className="text-[9px] text-primary mt-1">Fluxo positivo</div>
            </div>

            <CardContas
              titulo="Contas a Pagar"
              total={contasPagar.total}
              vencidas={contasPagar.vencidas}
              vencerHoje={contasPagar.vencerHoje}
              vencer7Dias={contasPagar.vencer7Dias}
              vencer30Dias={contasPagar.vencer30Dias}
              qtdTitulos={contasPagar.qtdTitulos}
              icone={<CreditCard className="w-4 h-4" />}
              tipo="pagar"
              onClick={() => abrirPainel("pagar")}
            />

            <CardContas
              titulo="Contas a Receber"
              total={contasReceber.total}
              vencidas={contasReceber.vencidas}
              vencerHoje={contasReceber.vencerHoje}
              vencer7Dias={contasReceber.vencer7Dias}
              vencer30Dias={contasReceber.vencer30Dias}
              qtdTitulos={contasReceber.qtdTitulos}
              icone={<Receipt className="w-4 h-4" />}
              tipo="receber"
              onClick={() => abrirPainel("receber")}
            />
          </div>
        </div>

        {/* ================================================================== */}
        {/* BLOCO: GRAFICOS E DETALHES                                         */}
        {/* ================================================================== */}
        <div className="flex-1 min-h-0">
          <div className="grid grid-cols-12 gap-2 h-full">
            {/* Grafico Fluxo de Caixa */}
            <div className="col-span-5">
              <GraficoFluxoCaixa onClick={() => abrirPainel("fluxo")} />
            </div>

            {/* Projecao */}
            <div className="col-span-2">
              <ProjecaoFluxo />
            </div>

            {/* Posicao Bancaria */}
            <div className="col-span-2">
              <TabelaBancos />
            </div>

            {/* Indicadores Financeiros */}
            <div className="col-span-3">
              <IndicadoresFinanceiros />
            </div>
          </div>
        </div>

        {/* ================================================================== */}
        {/* BLOCO: ALERTAS FINANCEIROS                                         */}
        {/* ================================================================== */}
        <div className="mt-3 flex-shrink-0">
          <div className="p-3 rounded-lg border border-border bg-card">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-muted-foreground" />
              <span className="text-[10px] font-semibold uppercase tracking-wide">Alertas Financeiros</span>
              <Badge variant="destructive" className="text-[9px] h-4 px-1.5">
                {alertasFinanceiros.filter((a) => a.tipo === "critico").length} criticos
              </Badge>
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {alertasFinanceiros.map((alerta) => (
                <div
                  key={alerta.id}
                  className={`flex-shrink-0 p-2 rounded border ${
                    alerta.tipo === "critico"
                      ? "border-destructive/50 bg-destructive/5"
                      : alerta.tipo === "atencao"
                        ? "border-amber-500/50 bg-amber-500/5"
                        : "border-primary/50 bg-primary/5"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {alerta.tipo === "critico" ? (
                      <AlertCircle className="w-3 h-3 text-destructive" />
                    ) : alerta.tipo === "atencao" ? (
                      <AlertTriangle className="w-3 h-3 text-amber-500" />
                    ) : (
                      <CheckCircle2 className="w-3 h-3 text-primary" />
                    )}
                    <div>
                      <span className="text-[10px] font-medium block">{alerta.titulo}</span>
                      <span className="text-[9px] text-muted-foreground">{alerta.valor}</span>
                    </div>
                    <Button variant="ghost" size="sm" className="h-5 px-2 text-[9px] ml-2">
                      {alerta.acao}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ================================================================== */}
        {/* PAINEL LATERAL (DRILL-DOWN)                                        */}
        {/* ================================================================== */}
        <Sheet open={painelAberto} onOpenChange={setPainelAberto}>
          <SheetContent className="w-[400px] sm:w-[500px]">
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2">
                {painelTipo === "pagar" && (
                  <>
                    <CreditCard className="w-5 h-5" /> Contas a Pagar
                  </>
                )}
                {painelTipo === "receber" && (
                  <>
                    <Receipt className="w-5 h-5" /> Contas a Receber
                  </>
                )}
                {painelTipo === "fluxo" && (
                  <>
                    <BarChart3 className="w-5 h-5" /> Detalhamento Fluxo de Caixa
                  </>
                )}
              </SheetTitle>
            </SheetHeader>
            <ScrollArea className="h-[calc(100vh-100px)] mt-4">
              {painelTipo === "pagar" && (
                <div className="space-y-3">
                  <div className="p-3 rounded-lg bg-muted/30">
                    <span className="text-xs font-semibold">Resumo</span>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <div className="text-center p-2 rounded bg-destructive/10">
                        <span className="text-lg font-bold text-destructive">
                          {formatarMoeda(contasPagar.vencidas)}
                        </span>
                        <span className="text-[10px] block text-muted-foreground">Vencidas</span>
                      </div>
                      <div className="text-center p-2 rounded bg-muted/50">
                        <span className="text-lg font-bold">{formatarMoeda(contasPagar.total)}</span>
                        <span className="text-[10px] block text-muted-foreground">Total</span>
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-semibold">Titulos Pendentes</span>
                  {pagamentosPendentes.map((p) => (
                    <div
                      key={p.id}
                      className={`p-3 rounded-lg border ${
                        p.status === "vencida"
                          ? "border-destructive/50 bg-destructive/5"
                          : p.status === "hoje"
                            ? "border-amber-500/50 bg-amber-500/5"
                            : "border-border bg-card"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">{p.fornecedor}</span>
                        <Badge
                          variant={
                            p.status === "vencida" ? "destructive" : p.status === "hoje" ? "outline" : "secondary"
                          }
                          className="text-[9px]"
                        >
                          {p.status === "vencida" ? "Vencida" : p.status === "hoje" ? "Vence Hoje" : "A Vencer"}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-muted-foreground">{p.titulo}</span>
                        <span className="font-semibold">{formatarMoeda(p.valor)}</span>
                      </div>
                      <div className="text-[10px] text-muted-foreground mt-1">Vencimento: {p.vencimento}</div>
                    </div>
                  ))}
                </div>
              )}
              {painelTipo === "receber" && (
                <div className="space-y-3">
                  <div className="p-3 rounded-lg bg-muted/30">
                    <span className="text-xs font-semibold">Resumo</span>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <div className="text-center p-2 rounded bg-destructive/10">
                        <span className="text-lg font-bold text-destructive">
                          {formatarMoeda(contasReceber.vencidas)}
                        </span>
                        <span className="text-[10px] block text-muted-foreground">Vencidas</span>
                      </div>
                      <div className="text-center p-2 rounded bg-primary/10">
                        <span className="text-lg font-bold text-primary">{formatarMoeda(contasReceber.total)}</span>
                        <span className="text-[10px] block text-muted-foreground">Total</span>
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-semibold">Titulos Pendentes</span>
                  {recebimentosPendentes.map((r) => (
                    <div
                      key={r.id}
                      className={`p-3 rounded-lg border ${
                        r.status === "vencida" ? "border-destructive/50 bg-destructive/5" : "border-border bg-card"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">{r.cliente}</span>
                        <Badge variant={r.status === "vencida" ? "destructive" : "secondary"} className="text-[9px]">
                          {r.status === "vencida" ? "Vencida" : "A Vencer"}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-muted-foreground">{r.nf}</span>
                        <span className="font-semibold text-primary">{formatarMoeda(r.valor)}</span>
                      </div>
                      <div className="text-[10px] text-muted-foreground mt-1">Vencimento: {r.vencimento}</div>
                    </div>
                  ))}
                </div>
              )}
              {painelTipo === "fluxo" && (
                <div className="space-y-3">
                  <div className="p-3 rounded-lg bg-muted/30">
                    <span className="text-xs font-semibold">Fluxo do Mes Atual</span>
                    <div className="grid grid-cols-3 gap-2 mt-2">
                      <div className="text-center p-2 rounded bg-primary/10">
                        <span className="text-lg font-bold text-primary">
                          {formatarMoeda(fluxoCaixaMensal.entradas)}
                        </span>
                        <span className="text-[10px] block text-muted-foreground">Entradas</span>
                      </div>
                      <div className="text-center p-2 rounded bg-destructive/10">
                        <span className="text-lg font-bold text-destructive">
                          {formatarMoeda(fluxoCaixaMensal.saidas)}
                        </span>
                        <span className="text-[10px] block text-muted-foreground">Saidas</span>
                      </div>
                      <div className="text-center p-2 rounded bg-muted/50">
                        <span className="text-lg font-bold">+{formatarMoeda(fluxoCaixaMensal.saldo)}</span>
                        <span className="text-[10px] block text-muted-foreground">Saldo</span>
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-semibold">Historico Mensal</span>
                  {fluxoCaixaHistorico.map((m, i) => (
                    <div key={i} className="p-3 rounded-lg border border-border bg-card">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">{m.mes}/2024</span>
                        <span className={`text-sm font-bold ${m.saldo >= 0 ? "text-primary" : "text-destructive"}`}>
                          {m.saldo >= 0 ? "+" : ""}
                          {formatarMoeda(m.saldo)}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-[11px]">
                        <span className="flex items-center gap-1">
                          <ArrowUpRight className="w-3 h-3 text-primary" />
                          {formatarMoeda(m.entrada)}
                        </span>
                        <span className="flex items-center gap-1">
                          <ArrowDownRight className="w-3 h-3 text-destructive" />
                          {formatarMoeda(m.saida)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </SheetContent>
        </Sheet>
        </div>
      </main>
    </div>
  )
}

export default function VisaoFinanceiroPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        </div>
      }
    >
      <VisaoFinanceiroContent />
    </Suspense>
  )
}
