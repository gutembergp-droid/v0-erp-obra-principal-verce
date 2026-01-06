"use client"

import type React from "react"
import { Suspense, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import {
  AlertTriangle,
  Clock,
  DollarSign,
  Calendar,
  ArrowUp,
  ArrowDown,
  FileCheck,
  Scale,
  Receipt,
  CheckCircle2,
  Gavel,
  FileText,
  ClipboardList,
  HandshakeIcon,
  Target,
  Milestone,
  CircleDollarSign,
  Banknote,
  CreditCard,
  Timer,
  FileQuestion,
  FileMinus,
  FilePlus,
  ShieldAlert,
  Gauge,
} from "lucide-react"
import { InfoTooltip } from "@/components/ui/info-tooltip"

// ============================================================================
// DADOS MOCKADOS - 100% CONTRATO COM CLIENTE
// ============================================================================

const contratoGeral = {
  numero: "CT-2024-00234",
  cliente: "DNIT - Departamento Nacional de Infraestrutura de Transportes",
  objeto: "Obras de Duplicacao da BR-101/SC - Lote 2",
  modalidade: "Concorrencia Publica",
  regime: "Empreitada por Preco Unitario",
  dataAssinatura: "15/02/2024",
  dataOrdemServico: "01/03/2024",
  prazoOriginal: 36,
  prazoVigente: 40,
  dataTerminoOriginal: "28/02/2027",
  dataTerminoVigente: "30/06/2027",
}

const receitaContratual = {
  valorOriginal: 245000000,
  valorAditivos: 9300000,
  valorVigente: 254300000,
  medidoAcumulado: 176000000,
  aprovadoCliente: 168500000,
  emAnalise: 7500000,
  saldoMedir: 78300000,
  percentualMedido: 69.2,
  percentualAprovado: 66.3,
  previstoMes: 72.0,
}

const faturamento = {
  faturadoAcumulado: 165200000,
  recebidoAcumulado: 141700000,
  aReceber: 23500000,
  aFaturar: 12300000,
  diasMedioRecebimento: 42,
  inadimplencia: 0,
  retencaoContratual: 8260000,
  retencaoLiberada: 3100000,
}

const cronogramaContratual = {
  dataInicio: "01/03/2024",
  dataTermino: "30/06/2027",
  diasTotais: 1218,
  diasDecorridos: 676,
  diasRestantes: 542,
  percentualTempoPrevisto: 55.5,
  percentualFisicoPrevisto: 55.5,
  percentualFisicoRealizado: 52.8,
  atrasoFisico: -2.7,
  spiContratual: 0.95,
}

const marcosContratuais = [
  {
    id: 1,
    descricao: "Mobilizacao e Instalacoes",
    previsao: "01/04/2024",
    realizacao: "28/03/2024",
    status: "concluido",
  },
  { id: 2, descricao: "Terraplenagem Trecho 1", previsao: "30/06/2024", realizacao: "15/07/2024", status: "concluido" },
  { id: 3, descricao: "Pavimentacao Trecho 1", previsao: "30/11/2024", realizacao: "20/12/2024", status: "concluido" },
  { id: 4, descricao: "OAEs - Pontes e Viadutos", previsao: "28/02/2025", realizacao: null, status: "andamento" },
  { id: 5, descricao: "Terraplenagem Trecho 2", previsao: "30/04/2025", realizacao: null, status: "pendente" },
  { id: 6, descricao: "Pavimentacao Trecho 2", previsao: "30/09/2025", realizacao: null, status: "pendente" },
]

const medicoes = {
  ultimaMedicao: {
    numero: 23,
    periodo: "Dezembro/2024",
    valorBruto: 8500000,
    valorLiquido: 8075000,
    status: "em_analise",
    dataEnvio: "05/01/2025",
    diasAnalise: 8,
  },
  historicoRecente: [
    { mes: "Dez/24", valor: 8500000, status: "em_analise" },
    { mes: "Nov/24", valor: 7800000, status: "aprovada" },
    { mes: "Out/24", valor: 9200000, status: "aprovada" },
    { mes: "Set/24", valor: 8100000, status: "aprovada" },
    { mes: "Ago/24", valor: 7500000, status: "aprovada" },
  ],
  totalMedicoes: 23,
  medicoesAprovadas: 22,
  medicoesPendentes: 1,
}

const changeControl = {
  aditivos: [
    { id: 1, tipo: "Prazo", valor: 0, status: "aprovado", descricao: "Extensao de 4 meses" },
    { id: 2, tipo: "Valor", valor: 5200000, status: "aprovado", descricao: "Servicos adicionais Trecho 1" },
    { id: 3, tipo: "Valor", valor: 4100000, status: "aprovado", descricao: "Reequilibrio economico" },
    { id: 4, tipo: "Valor", valor: 1800000, status: "analise", descricao: "Obras complementares OAEs" },
  ],
  smes: [
    { id: 1, descricao: "Alteracao projeto drenagem", valor: 320000, status: "aprovada" },
    { id: 2, descricao: "Reforco estrutural ponte", valor: 580000, status: "analise" },
    { id: 3, descricao: "Desvio de trafego adicional", valor: 145000, status: "analise" },
  ],
  pleitos: [
    { id: 1, descricao: "Recomposicao custos materiais", valor: 2100000, status: "negociacao", probabilidade: 70 },
  ],
  claims: [
    { id: 1, descricao: "Paralisacao por chuvas atipicas", valor: 450000, status: "documentacao", probabilidade: 85 },
  ],
}

const glosas = {
  totalGlosado: 1250000,
  glosasAceitas: 420000,
  glosasContestadas: 830000,
  glosasRevertidas: 180000,
  itens: [
    { id: 1, medicao: 21, descricao: "Quantidade terraplenagem", valor: 320000, status: "contestada" },
    { id: 2, medicao: 22, descricao: "Preco unitario concreto", valor: 280000, status: "contestada" },
    { id: 3, medicao: 22, descricao: "Medicao duplicada", valor: 230000, status: "aceita" },
    { id: 4, medicao: 20, descricao: "Servico nao autorizado", valor: 420000, status: "revertida" },
  ],
}

const documentacaoContratual = {
  pendenciasCliente: 3,
  pendenciasContratada: 5,
  documentos: [
    { tipo: "ART", status: "regular", vencimento: null },
    { tipo: "Seguro Garantia", status: "regular", vencimento: "30/06/2027" },
    { tipo: "Seguro RC", status: "atencao", vencimento: "15/02/2025" },
    { tipo: "Licenca Ambiental", status: "regular", vencimento: "01/03/2026" },
    { tipo: "CND Federal", status: "regular", vencimento: "28/02/2025" },
  ],
}

const alertasContrato = [
  { id: 1, tipo: "critico", titulo: "Medicao #23 ha 8 dias em analise", categoria: "Medicao", valor: "R$ 8.5 Mi" },
  { id: 2, tipo: "critico", titulo: "Glosas contestadas aguardando resposta", categoria: "Glosa", valor: "R$ 830 mil" },
  { id: 3, tipo: "atencao", titulo: "Aditivo #4 pendente aprovacao", categoria: "Aditivo", valor: "R$ 1.8 Mi" },
  { id: 4, tipo: "atencao", titulo: "Seguro RC vence em 30 dias", categoria: "Documento", valor: "-" },
  { id: 5, tipo: "atencao", titulo: "2 SMEs aguardando analise cliente", categoria: "SME", valor: "R$ 725 mil" },
  { id: 6, tipo: "info", titulo: "Pleito em negociacao com cliente", categoria: "Pleito", valor: "R$ 2.1 Mi" },
  { id: 7, tipo: "info", titulo: "Claim em fase de documentacao", categoria: "Claim", valor: "R$ 450 mil" },
]

const relacionamentoCliente = {
  fiscalizacao: "Consorcio Supervisor BR-101",
  gerenteDNIT: "Eng. Carlos Eduardo Silva",
  ultimaReuniao: "08/01/2025",
  proximaReuniao: "15/01/2025",
  pendenciasReuniao: 4,
  satisfacaoCliente: 8.2,
}

// ============================================================================
// FUNCOES UTILITARIAS
// ============================================================================

function formatarMoeda(valor: number): string {
  if (Math.abs(valor) >= 1000000) return `R$ ${(valor / 1000000).toFixed(1)} Mi`
  if (Math.abs(valor) >= 1000) return `R$ ${(valor / 1000).toFixed(0)} mil`
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 })
}

function formatarData(data: string): string {
  return data
}

// ============================================================================
// COMPONENTES
// ============================================================================

interface CardFinanceiroProps {
  titulo: string
  valor: number
  percentual: number
  previstoPercentual: number
  icone: React.ReactNode
  subtitulo?: string
  onClick?: () => void
}

function CardFinanceiroHibrido({
  titulo,
  valor,
  percentual,
  previstoPercentual,
  icone,
  subtitulo,
  onClick,
}: CardFinanceiroProps) {
  const desvio = percentual - previstoPercentual
  const maxPercentual = Math.max(percentual, previstoPercentual, 100)

  return (
    <div
      className="p-3 rounded-lg border border-border bg-card cursor-pointer hover:border-primary/40 transition-colors"
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="text-muted-foreground">{icone}</div>
          <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">{titulo}</span>
        </div>
        {previstoPercentual > 0 && (
          <div
            className={`flex items-center gap-0.5 text-[10px] font-semibold ${desvio >= 0 ? "text-primary" : "text-destructive"}`}
          >
            {desvio >= 0 ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
            {desvio > 0 ? "+" : ""}
            {desvio.toFixed(1)}%
          </div>
        )}
      </div>
      <div className="mb-2">
        <span className="text-xl font-bold tabular-nums text-foreground">{formatarMoeda(valor)}</span>
        {subtitulo && <span className="text-[10px] text-muted-foreground ml-1.5">{subtitulo}</span>}
      </div>
      {previstoPercentual > 0 && (
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[9px] text-muted-foreground w-14">Previsto</span>
            <div className="flex-1 h-2 bg-muted/30 rounded overflow-hidden">
              <div
                className="h-full bg-muted-foreground/40 rounded"
                style={{ width: `${(previstoPercentual / maxPercentual) * 100}%` }}
              />
            </div>
            <span className="text-[9px] tabular-nums text-muted-foreground w-10 text-right">{previstoPercentual}%</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[9px] text-muted-foreground w-14">Realizado</span>
            <div className="flex-1 h-2 bg-muted/30 rounded overflow-hidden">
              <div
                className={`h-full rounded ${percentual >= previstoPercentual ? "bg-primary" : "bg-destructive/70"}`}
                style={{ width: `${(percentual / maxPercentual) * 100}%` }}
              />
            </div>
            <span className="text-[9px] tabular-nums font-medium text-foreground w-10 text-right">{percentual}%</span>
          </div>
        </div>
      )}
    </div>
  )
}

function CardValorSimples({
  titulo,
  valor,
  icone,
  destaque = false,
  onClick,
}: {
  titulo: string
  valor: number
  icone: React.ReactNode
  destaque?: boolean
  onClick?: () => void
}) {
  return (
    <div
      className={`p-3 rounded-lg border bg-card cursor-pointer hover:border-primary/40 transition-colors ${destaque ? "border-primary/30 bg-primary/5" : "border-border"}`}
      onClick={onClick}
    >
      <div className="flex items-center gap-2 mb-1">
        <div className="text-muted-foreground">{icone}</div>
        <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">{titulo}</span>
      </div>
      <span className={`text-lg font-bold tabular-nums ${destaque ? "text-primary" : "text-foreground"}`}>
        {formatarMoeda(valor)}
      </span>
    </div>
  )
}

// ============================================================================
// COMPONENTE PRINCIPAL - VISAO CONTRATO
// ============================================================================

function VisaoContratoContent() {
  const router = useRouter()
  const [painelAberto, setPainelAberto] = useState(false)
  const [painelTipo, setPainelTipo] = useState<string | null>(null)
  const [painelDados, setPainelDados] = useState<any>(null)

  const abrirPainel = (tipo: string, dados?: any) => {
    setPainelTipo(tipo)
    setPainelDados(dados)
    setPainelAberto(true)
  }

  return (
    <div className="overflow-auto h-full">
      <div className="flex flex-col h-full p-4">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-4 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-9 h-9 rounded-lg border border-border bg-muted/30">
              <Gauge className="w-4 h-4 text-muted-foreground" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-foreground">Cockpit de Governanca</h1>
                <InfoTooltip title="Visao Contrato" description="100% focada na relacao com o cliente" />
                <Badge
                  variant="outline"
                  className="text-[9px] h-5 px-2 border-foreground/30 text-foreground font-medium"
                >
                  CONTRATO
                </Badge>
              </div>
              <p className="text-[11px] text-muted-foreground">BR-101 LOTE 2 | Compor 90</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {/* Navegacao sem container - botoes individuais */}
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-4 text-xs text-muted-foreground hover:text-foreground hover:bg-muted/50"
                onClick={() => router.push("/obra/gerencial/cockpit")}
              >
                Geral
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-8 px-4 text-xs bg-muted/50 border-foreground/20 text-foreground font-medium"
                disabled
              >
                Contrato
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-4 text-xs text-muted-foreground hover:text-foreground hover:bg-muted/50"
                onClick={() => router.push("/obra/gerencial/cockpit/visao-performance")}
              >
                Performance
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-4 text-xs text-muted-foreground hover:text-foreground hover:bg-muted/50"
                onClick={() => router.push("/obra/gerencial/cockpit/visao-financeiro")}
              >
                Financeiro
              </Button>
            </div>
            <Badge variant="outline" className="text-[10px] h-8 px-3 border-foreground/20 font-medium">
              Janeiro 2025
            </Badge>
            <Button
              variant="outline"
              size="sm"
              className="h-8 w-8 p-0 border-foreground/20 bg-transparent"
              title="Gerar Relatorio"
            >
              <FileText className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* ================================================================== */}
        {/* SECAO 1: DADOS DO CONTRATO                                         */}
        {/* ================================================================== */}
        <div className="mb-3 flex-shrink-0">
          <div className="p-3 rounded-lg border border-border bg-card">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="w-4 h-4 text-muted-foreground" />
              <span className="text-[10px] font-semibold uppercase tracking-wide">Dados do Contrato</span>
            </div>
            <div className="grid grid-cols-6 gap-4 text-[11px]">
              <div>
                <span className="text-muted-foreground block">Objeto</span>
                <span className="font-medium text-foreground">{contratoGeral.objeto}</span>
              </div>
              <div>
                <span className="text-muted-foreground block">Modalidade</span>
                <span className="font-medium text-foreground">{contratoGeral.modalidade}</span>
              </div>
              <div>
                <span className="text-muted-foreground block">Regime</span>
                <span className="font-medium text-foreground">{contratoGeral.regime}</span>
              </div>
              <div>
                <span className="text-muted-foreground block">Assinatura</span>
                <span className="font-medium text-foreground">{contratoGeral.dataAssinatura}</span>
              </div>
              <div>
                <span className="text-muted-foreground block">Prazo Vigente</span>
                <span className="font-medium text-foreground">{contratoGeral.prazoVigente} meses</span>
              </div>
              <div>
                <span className="text-muted-foreground block">Termino Vigente</span>
                <span className="font-medium text-foreground">{contratoGeral.dataTerminoVigente}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ================================================================== */}
        {/* SECAO 2: RECEITA CONTRATUAL                                        */}
        {/* ================================================================== */}
        <div className="mb-3 flex-shrink-0">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-4 h-4 text-muted-foreground" />
            <h2 className="text-xs font-semibold uppercase tracking-wide text-foreground">Receita Contratual</h2>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div className="grid grid-cols-5 gap-2">
            <CardFinanceiroHibrido
              titulo="Valor Contratado"
              valor={receitaContratual.valorVigente}
              percentual={100}
              previstoPercentual={0}
              icone={<CircleDollarSign className="w-4 h-4" />}
              subtitulo="vigente"
              onClick={() => abrirPainel("receita")}
            />
            <CardFinanceiroHibrido
              titulo="Medido Acumulado"
              valor={receitaContratual.medidoAcumulado}
              percentual={receitaContratual.percentualMedido}
              previstoPercentual={receitaContratual.previstoMes}
              icone={<FileCheck className="w-4 h-4" />}
              subtitulo={`${receitaContratual.percentualMedido}%`}
              onClick={() => abrirPainel("medicao")}
            />
            <CardFinanceiroHibrido
              titulo="Aprovado Cliente"
              valor={receitaContratual.aprovadoCliente}
              percentual={receitaContratual.percentualAprovado}
              previstoPercentual={receitaContratual.percentualMedido}
              icone={<CheckCircle2 className="w-4 h-4" />}
              subtitulo={`${receitaContratual.percentualAprovado}%`}
              onClick={() => abrirPainel("medicao")}
            />
            <CardValorSimples
              titulo="Em Analise"
              valor={receitaContratual.emAnalise}
              icone={<Clock className="w-4 h-4" />}
              destaque
              onClick={() => abrirPainel("medicao")}
            />
            <CardValorSimples
              titulo="Saldo a Medir"
              valor={receitaContratual.saldoMedir}
              icone={<Target className="w-4 h-4" />}
              onClick={() => abrirPainel("receita")}
            />
          </div>
        </div>

        {/* ================================================================== */}
        {/* SECAO 3: FATURAMENTO E RECEBIMENTO                                 */}
        {/* ================================================================== */}
        <div className="mb-3 flex-shrink-0">
          <div className="flex items-center gap-2 mb-2">
            <Receipt className="w-4 h-4 text-muted-foreground" />
            <h2 className="text-xs font-semibold uppercase tracking-wide text-foreground">Faturamento e Recebimento</h2>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div className="grid grid-cols-6 gap-2">
            <CardValorSimples
              titulo="Faturado"
              valor={faturamento.faturadoAcumulado}
              icone={<Receipt className="w-4 h-4" />}
              onClick={() => abrirPainel("faturamento")}
            />
            <CardValorSimples
              titulo="Recebido"
              valor={faturamento.recebidoAcumulado}
              icone={<Banknote className="w-4 h-4" />}
              onClick={() => abrirPainel("faturamento")}
            />
            <CardValorSimples
              titulo="A Receber"
              valor={faturamento.aReceber}
              icone={<Clock className="w-4 h-4" />}
              destaque
              onClick={() => abrirPainel("faturamento")}
            />
            <CardValorSimples
              titulo="A Faturar"
              valor={faturamento.aFaturar}
              icone={<CreditCard className="w-4 h-4" />}
              onClick={() => abrirPainel("faturamento")}
            />
            <CardValorSimples
              titulo="Retencao Contratual"
              valor={faturamento.retencaoContratual}
              icone={<ShieldAlert className="w-4 h-4" />}
              onClick={() => abrirPainel("faturamento")}
            />
            <div className="p-3 rounded-lg border border-border bg-card">
              <div className="flex items-center gap-2 mb-1">
                <Timer className="w-4 h-4 text-muted-foreground" />
                <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">
                  Prazo Medio
                </span>
              </div>
              <span className="text-lg font-bold tabular-nums text-foreground">
                {faturamento.diasMedioRecebimento} dias
              </span>
            </div>
          </div>
        </div>

        {/* ================================================================== */}
        {/* SECAO 4: CRONOGRAMA E MARCOS + CHANGE CONTROL                      */}
        {/* ================================================================== */}
        <div className="grid grid-cols-12 gap-2 mb-3 flex-shrink-0">
          {/* Cronograma Contratual */}
          <div className="col-span-5 p-3 rounded-lg border border-border bg-card">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span className="text-[10px] font-semibold uppercase tracking-wide">Cronograma Contratual</span>
              </div>
              <Badge variant="outline" className="text-[9px] h-5">
                SPI: {cronogramaContratual.spiContratual.toFixed(2)}
              </Badge>
            </div>
            <div className="grid grid-cols-4 gap-2 mb-2 text-[10px]">
              <div className="text-center p-1.5 rounded bg-muted/30">
                <span className="text-muted-foreground block">Inicio</span>
                <span className="font-semibold">{cronogramaContratual.dataInicio}</span>
              </div>
              <div className="text-center p-1.5 rounded bg-muted/30">
                <span className="text-muted-foreground block">Termino</span>
                <span className="font-semibold">{cronogramaContratual.dataTermino}</span>
              </div>
              <div className="text-center p-1.5 rounded bg-muted/30">
                <span className="text-muted-foreground block">Decorridos</span>
                <span className="font-semibold">{cronogramaContratual.diasDecorridos} dias</span>
              </div>
              <div className="text-center p-1.5 rounded bg-muted/30">
                <span className="text-muted-foreground block">Restantes</span>
                <span className="font-semibold">{cronogramaContratual.diasRestantes} dias</span>
              </div>
            </div>
            <div className="relative h-5 bg-muted/30 rounded overflow-hidden mb-1.5">
              <div
                className="absolute top-0 left-0 h-2.5 bg-muted-foreground/40"
                style={{ width: `${cronogramaContratual.percentualFisicoPrevisto}%` }}
              />
              <div
                className="absolute top-2.5 left-0 h-2.5 bg-primary/70"
                style={{ width: `${cronogramaContratual.percentualFisicoRealizado}%` }}
              />
              <div
                className="absolute top-0 bottom-0 w-0.5 bg-foreground"
                style={{ left: `${cronogramaContratual.percentualTempoPrevisto}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-[9px]">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <div className="w-2.5 h-1.5 bg-muted-foreground/40 rounded-sm" />
                  Previsto: {cronogramaContratual.percentualFisicoPrevisto}%
                </span>
                <span className="flex items-center gap-1">
                  <div className="w-2.5 h-1.5 bg-primary/70 rounded-sm" />
                  Realizado: {cronogramaContratual.percentualFisicoRealizado}%
                </span>
              </div>
              <span
                className={`font-semibold ${cronogramaContratual.atrasoFisico >= 0 ? "text-primary" : "text-destructive"}`}
              >
                Desvio: {cronogramaContratual.atrasoFisico > 0 ? "+" : ""}
                {cronogramaContratual.atrasoFisico}%
              </span>
            </div>
          </div>

          {/* Marcos Contratuais */}
          <div className="col-span-4 p-3 rounded-lg border border-border bg-card">
            <div className="flex items-center gap-2 mb-2">
              <Milestone className="w-4 h-4 text-muted-foreground" />
              <span className="text-[10px] font-semibold uppercase tracking-wide">Marcos Contratuais</span>
            </div>
            <ScrollArea className="h-[100px]">
              <div className="space-y-1.5">
                {marcosContratuais.map((marco) => (
                  <div
                    key={marco.id}
                    className="flex items-center justify-between text-[10px] p-1.5 rounded bg-muted/20"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          marco.status === "concluido"
                            ? "bg-primary"
                            : marco.status === "andamento"
                              ? "bg-amber-500"
                              : "bg-muted-foreground/40"
                        }`}
                      />
                      <span className="truncate max-w-[140px]">{marco.descricao}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">{marco.previsao}</span>
                      {marco.realizacao && (
                        <Badge variant="outline" className="text-[8px] h-4 px-1">
                          {marco.realizacao}
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Ultima Medicao */}
          <div className="col-span-3 p-3 rounded-lg border border-border bg-card">
            <div className="flex items-center gap-2 mb-2">
              <ClipboardList className="w-4 h-4 text-muted-foreground" />
              <span className="text-[10px] font-semibold uppercase tracking-wide">Ultima Medicao</span>
              <Badge
                variant="outline"
                className={`text-[8px] h-4 ml-auto ${
                  medicoes.ultimaMedicao.status === "aprovada"
                    ? "border-primary/50 text-primary"
                    : "border-amber-500/50 text-amber-600"
                }`}
              >
                #{medicoes.ultimaMedicao.numero}
              </Badge>
            </div>
            <div className="space-y-2">
              <div className="text-center p-2 rounded bg-muted/30">
                <span className="text-xl font-bold text-foreground">
                  {formatarMoeda(medicoes.ultimaMedicao.valorBruto)}
                </span>
                <span className="text-[9px] text-muted-foreground block">{medicoes.ultimaMedicao.periodo}</span>
              </div>
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-muted-foreground">Status</span>
                <Badge variant="outline" className="text-[8px] h-4 border-amber-500/50 text-amber-600">
                  Em Analise
                </Badge>
              </div>
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-muted-foreground">Dias em analise</span>
                <span className="font-semibold text-amber-600">{medicoes.ultimaMedicao.diasAnalise} dias</span>
              </div>
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-muted-foreground">Total medicoes</span>
                <span className="font-medium">{medicoes.totalMedicoes}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ================================================================== */}
        {/* SECAO 5: CHANGE CONTROL + GLOSAS + ALERTAS                         */}
        {/* ================================================================== */}
        <div className="grid grid-cols-12 gap-2 flex-shrink-0">
          {/* Change Control */}
          <div className="col-span-4 p-3 rounded-lg border border-border bg-card">
            <div className="flex items-center gap-2 mb-2">
              <Scale className="w-4 h-4 text-muted-foreground" />
              <span className="text-[10px] font-semibold uppercase tracking-wide">Change Control</span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[11px] p-1.5 rounded bg-muted/20">
                <div className="flex items-center gap-2">
                  <FilePlus className="w-3.5 h-3.5 text-muted-foreground" />
                  <span>Aditivos</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-[8px] h-4 px-1">
                    {changeControl.aditivos.filter((a) => a.status === "aprovado").length} aprov.
                  </Badge>
                  <Badge variant="outline" className="text-[8px] h-4 px-1 border-amber-500/50 text-amber-600">
                    {changeControl.aditivos.filter((a) => a.status === "analise").length} pend.
                  </Badge>
                </div>
              </div>
              <div className="flex items-center justify-between text-[11px] p-1.5 rounded bg-muted/20">
                <div className="flex items-center gap-2">
                  <FileQuestion className="w-3.5 h-3.5 text-muted-foreground" />
                  <span>SMEs</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-[8px] h-4 px-1">
                    {changeControl.smes.filter((s) => s.status === "aprovada").length} aprov.
                  </Badge>
                  <Badge variant="outline" className="text-[8px] h-4 px-1 border-amber-500/50 text-amber-600">
                    {changeControl.smes.filter((s) => s.status === "analise").length} pend.
                  </Badge>
                </div>
              </div>
              <div className="flex items-center justify-between text-[11px] p-1.5 rounded bg-muted/20">
                <div className="flex items-center gap-2">
                  <HandshakeIcon className="w-3.5 h-3.5 text-muted-foreground" />
                  <span>Pleitos</span>
                </div>
                <Badge variant="outline" className="text-[8px] h-4 px-1 border-primary/50 text-primary">
                  {changeControl.pleitos.length} ativo
                </Badge>
              </div>
              <div className="flex items-center justify-between text-[11px] p-1.5 rounded bg-muted/20">
                <div className="flex items-center gap-2">
                  <Gavel className="w-3.5 h-3.5 text-muted-foreground" />
                  <span>Claims</span>
                </div>
                <Badge variant="outline" className="text-[8px] h-4 px-1">
                  {changeControl.claims.length} ativo
                </Badge>
              </div>
              <div className="pt-2 border-t border-border">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-muted-foreground">Valor em Negociacao</span>
                  <span className="font-bold text-primary">
                    {formatarMoeda(
                      changeControl.aditivos
                        .filter((a) => a.status === "analise")
                        .reduce((acc, a) => acc + a.valor, 0) +
                        changeControl.smes.filter((s) => s.status === "analise").reduce((acc, s) => acc + s.valor, 0) +
                        changeControl.pleitos.reduce((acc, p) => acc + p.valor, 0) +
                        changeControl.claims.reduce((acc, c) => acc + c.valor, 0),
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Glosas */}
          <div className="col-span-3 p-3 rounded-lg border border-border bg-card">
            <div className="flex items-center gap-2 mb-2">
              <FileMinus className="w-4 h-4 text-muted-foreground" />
              <span className="text-[10px] font-semibold uppercase tracking-wide">Glosas</span>
            </div>
            <div className="space-y-2">
              <div className="text-center p-2 rounded bg-destructive/10 border border-destructive/20">
                <span className="text-lg font-bold text-destructive">{formatarMoeda(glosas.totalGlosado)}</span>
                <span className="text-[9px] text-muted-foreground block">Total Glosado</span>
              </div>
              <div className="grid grid-cols-2 gap-1.5 text-[10px]">
                <div className="p-1.5 rounded bg-muted/30 text-center">
                  <span className="font-semibold block">{formatarMoeda(glosas.glosasContestadas)}</span>
                  <span className="text-muted-foreground">Contestadas</span>
                </div>
                <div className="p-1.5 rounded bg-muted/30 text-center">
                  <span className="font-semibold block">{formatarMoeda(glosas.glosasAceitas)}</span>
                  <span className="text-muted-foreground">Aceitas</span>
                </div>
              </div>
              <div className="flex items-center justify-between text-[10px] p-1.5 rounded bg-primary/10">
                <span className="text-muted-foreground">Revertidas</span>
                <span className="font-semibold text-primary">{formatarMoeda(glosas.glosasRevertidas)}</span>
              </div>
            </div>
          </div>

          {/* Documentacao */}
          <div className="col-span-2 p-3 rounded-lg border border-border bg-card">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="w-4 h-4 text-muted-foreground" />
              <span className="text-[10px] font-semibold uppercase tracking-wide">Documentos</span>
            </div>
            <div className="space-y-1.5">
              {documentacaoContratual.documentos.slice(0, 4).map((doc, idx) => (
                <div key={idx} className="flex items-center justify-between text-[10px]">
                  <span className="text-muted-foreground">{doc.tipo}</span>
                  <div className={`w-2 h-2 rounded-full ${doc.status === "regular" ? "bg-primary" : "bg-amber-500"}`} />
                </div>
              ))}
              <div className="pt-1.5 border-t border-border text-[10px]">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Pendencias</span>
                  <Badge variant="outline" className="text-[8px] h-4">
                    {documentacaoContratual.pendenciasContratada}
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Alertas Contrato */}
          <div className="col-span-3 p-3 rounded-lg border border-border bg-card">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-muted-foreground" />
              <span className="text-[10px] font-semibold uppercase tracking-wide">Alertas do Contrato</span>
              <Badge variant="outline" className="text-[8px] h-4 ml-auto border-destructive/50 text-destructive">
                {alertasContrato.filter((a) => a.tipo === "critico").length} criticos
              </Badge>
            </div>
            <ScrollArea className="h-[130px]">
              <div className="space-y-1.5">
                {alertasContrato.map((alerta) => (
                  <div
                    key={alerta.id}
                    className={`p-2 rounded text-[10px] cursor-pointer hover:opacity-80 transition-opacity ${
                      alerta.tipo === "critico"
                        ? "bg-destructive/10 border border-destructive/20"
                        : alerta.tipo === "atencao"
                          ? "bg-amber-500/10 border border-amber-500/20"
                          : "bg-muted/30 border border-border"
                    }`}
                    onClick={() => abrirPainel("alerta", alerta)}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium truncate max-w-[160px]">{alerta.titulo}</span>
                      <Badge variant="outline" className="text-[8px] h-4 px-1">
                        {alerta.categoria}
                      </Badge>
                    </div>
                    {alerta.valor !== "-" && <span className="text-muted-foreground">{alerta.valor}</span>}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>

        {/* ================================================================== */}
        {/* PAINEL LATERAL                                                     */}
        {/* ================================================================== */}
        <Sheet open={painelAberto} onOpenChange={setPainelAberto}>
          <SheetContent className="w-[400px] sm:w-[500px]">
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2">
                {painelTipo === "receita" && (
                  <>
                    <DollarSign className="w-5 h-5" /> Detalhes da Receita
                  </>
                )}
                {painelTipo === "medicao" && (
                  <>
                    <ClipboardList className="w-5 h-5" /> Detalhes da Medicao
                  </>
                )}
                {painelTipo === "faturamento" && (
                  <>
                    <Receipt className="w-5 h-5" /> Detalhes do Faturamento
                  </>
                )}
                {painelTipo === "alerta" && (
                  <>
                    <AlertTriangle className="w-5 h-5" /> Detalhes do Alerta
                  </>
                )}
              </SheetTitle>
            </SheetHeader>
            <ScrollArea className="h-[calc(100vh-100px)] mt-4">
              {painelTipo === "receita" && (
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-muted/30">
                    <h4 className="text-sm font-semibold mb-3">Composicao da Receita</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Valor Original</span>
                        <span className="font-medium">{formatarMoeda(receitaContratual.valorOriginal)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Aditivos Aprovados</span>
                        <span className="font-medium text-primary">
                          +{formatarMoeda(receitaContratual.valorAditivos)}
                        </span>
                      </div>
                      <div className="flex justify-between pt-2 border-t">
                        <span className="font-semibold">Valor Vigente</span>
                        <span className="font-bold">{formatarMoeda(receitaContratual.valorVigente)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/30">
                    <h4 className="text-sm font-semibold mb-3">Evolucao da Medicao</h4>
                    <div className="space-y-2">
                      {medicoes.historicoRecente.map((m, idx) => (
                        <div key={idx} className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">{m.mes}</span>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{formatarMoeda(m.valor)}</span>
                            <div
                              className={`w-2 h-2 rounded-full ${m.status === "aprovada" ? "bg-primary" : "bg-amber-500"}`}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              {painelTipo === "alerta" && painelDados && (
                <div className="space-y-4">
                  <div
                    className={`p-4 rounded-lg ${
                      painelDados.tipo === "critico"
                        ? "bg-destructive/10"
                        : painelDados.tipo === "atencao"
                          ? "bg-amber-500/10"
                          : "bg-muted/30"
                    }`}
                  >
                    <h4 className="text-sm font-semibold mb-2">{painelDados.titulo}</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Categoria</span>
                        <Badge variant="outline">{painelDados.categoria}</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Valor</span>
                        <span className="font-medium">{painelDados.valor}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Prioridade</span>
                        <Badge variant={painelDados.tipo === "critico" ? "destructive" : "outline"}>
                          {painelDados.tipo === "critico"
                            ? "Critico"
                            : painelDados.tipo === "atencao"
                              ? "Atencao"
                              : "Informativo"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </ScrollArea>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}

// ============================================================================
// EXPORT COM SUSPENSE
// ============================================================================

export default function VisaoContratoPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        </div>
      }
    >
      <VisaoContratoContent />
    </Suspense>
  )
}
