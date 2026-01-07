"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Card } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  CheckCircle,
  Clock,
  Lock,
  Download,
  Printer,
  AlertTriangle,
  TrendingUp,
  XCircle,
  Shield,
  Target,
  AlertCircle,
  ShieldAlert,
  BarChart3,
  Package,
  HardHat,
  Briefcase,
  ClipboardList,
  Gauge,
  Activity,
  PieChart,
  Save,
  Users,
  Wallet,
  Calendar,
  FileCheck,
  Receipt,
  AlertOctagon,
  ListChecks,
  FileText,
  FolderOpen,
} from "lucide-react"
import Link from "next/link"
import { RelatorioGerencial } from "@/components/encerramento/relatorio-gerencial"

// ============================================================================
// ESTRUTURA: DEPARTAMENTOS → SETORES
// ============================================================================
const estruturaDepartamentos = {
  comercial: {
    titulo: "COMERCIAL",
    icone: Briefcase,
    cor: "bg-blue-500",
    setores: {
      suprimentos: {
        titulo: "Suprimentos",
        icone: Package,
        kpis: [
          { nome: "Saving", valor: 3.2, meta: 5.0, unidade: "%", status: "atencao" },
          { nome: "Lead Time", valor: 12, meta: 10, unidade: "dias", status: "atencao" },
          { nome: "OTIF", valor: 89, meta: 95, unidade: "%", status: "atencao" },
        ],
        itens: [
          { descricao: "Pedidos Emitidos", previsto: 85, realizado: 82, unidade: "un", status: "ok" },
          { descricao: "NFs Conferidas", previsto: 78, realizado: 75, unidade: "un", status: "alerta" },
          { descricao: "Entregas no Prazo", previsto: 80, realizado: 71, unidade: "un", status: "atencao" },
          { descricao: "Devolucoes", previsto: 0, realizado: 3, unidade: "un", status: "critico" },
        ],
        pendencias: [
          { tipo: "critico", descricao: "3 NFs pendentes de conferencia (R$ 450.000)" },
          { tipo: "alerta", descricao: "Lead time medio acima da meta" },
        ],
      },
      custo: {
        titulo: "Custo",
        icone: BarChart3,
        kpis: [
          { nome: "CR/CO", valor: 0.98, meta: 1.0, unidade: "", status: "ok" },
          { nome: "CPI", valor: 1.02, meta: 1.0, unidade: "", status: "ok" },
          { nome: "Desvio Custo", valor: -2.1, meta: 0, unidade: "%", status: "ok" },
        ],
        itens: [
          { descricao: "Mao de Obra", previsto: 3400000, realizado: 3200000, unidade: "R$", status: "ok" },
          { descricao: "Materiais", previsto: 4000000, realizado: 4100000, unidade: "R$", status: "atencao" },
          { descricao: "Equipamentos", previsto: 1900000, realizado: 1850000, unidade: "R$", status: "ok" },
          { descricao: "Subcontratados", previsto: 2200000, realizado: 2100000, unidade: "R$", status: "ok" },
        ],
        pendencias: [{ tipo: "alerta", descricao: "Materiais 2.5% acima do previsto" }],
      },
      meta: {
        titulo: "Meta/Orcamento",
        icone: Target,
        kpis: [
          { nome: "Orcado Total", valor: 160700000, meta: 160700000, unidade: "R$", status: "ok" },
          { nome: "Realizado Acum", valor: 142500000, meta: 145000000, unidade: "R$", status: "atencao" },
          { nome: "Desvio Orc.", valor: -1.7, meta: 0, unidade: "%", status: "ok" },
        ],
        itens: [
          { descricao: "Budget Anual", previsto: 160700000, realizado: 160700000, unidade: "R$", status: "ok" },
          { descricao: "Forecast", previsto: 158000000, realizado: 155000000, unidade: "R$", status: "ok" },
          { descricao: "Curva S Fisico", previsto: 88, realizado: 85, unidade: "%", status: "atencao" },
          { descricao: "Curva S Financeiro", previsto: 90, realizado: 88.5, unidade: "%", status: "atencao" },
        ],
        pendencias: [{ tipo: "alerta", descricao: "Curva S Fisico 3pp abaixo do previsto" }],
      },
      indireto: {
        titulo: "Custos Indiretos",
        icone: Receipt,
        kpis: [
          { nome: "CI Total", valor: 453000, meta: 480000, unidade: "R$", status: "ok" },
          { nome: "CI/CD", valor: 4.02, meta: 5.0, unidade: "%", status: "ok" },
          { nome: "Desvio CI", valor: -5.6, meta: 0, unidade: "%", status: "ok" },
        ],
        itens: [
          { descricao: "Mao de Obra Indireta", previsto: 180000, realizado: 175000, unidade: "R$", status: "ok" },
          { descricao: "Canteiro de Obras", previsto: 45000, realizado: 48000, unidade: "R$", status: "atencao" },
          { descricao: "Estrutura de TI", previsto: 28000, realizado: 26500, unidade: "R$", status: "ok" },
          { descricao: "Materiais de Limpeza", previsto: 8000, realizado: 7200, unidade: "R$", status: "ok" },
          { descricao: "Alugueis", previsto: 65000, realizado: 65000, unidade: "R$", status: "ok" },
          { descricao: "Locacao de Veiculos", previsto: 42000, realizado: 45000, unidade: "R$", status: "atencao" },
          { descricao: "Licencas e Softwares", previsto: 18000, realizado: 17500, unidade: "R$", status: "ok" },
          { descricao: "Seguranca Patrimonial", previsto: 35000, realizado: 33000, unidade: "R$", status: "ok" },
          { descricao: "Utilidades (Agua/Luz)", previsto: 22000, realizado: 24800, unidade: "R$", status: "atencao" },
          { descricao: "Comunicacao/Telefonia", previsto: 12000, realizado: 11000, unidade: "R$", status: "ok" },
        ],
        pendencias: [
          { tipo: "alerta", descricao: "Canteiro de obras 6.7% acima do previsto" },
          { tipo: "alerta", descricao: "Locacao de veiculos 7.1% acima do orcado" },
        ],
        despesasPorSetor: [
          { setor: "Gerencia", previsto: 95000, realizado: 92000, desvio: -3.2 },
          { setor: "Engenharia", previsto: 78000, realizado: 76500, desvio: -1.9 },
          { setor: "Producao", previsto: 85000, realizado: 88000, desvio: 3.5 },
          { setor: "Comercial", previsto: 62000, realizado: 60000, desvio: -3.2 },
          { setor: "Administrativo", previsto: 68000, realizado: 72000, desvio: 5.9 },
          { setor: "QSMS", previsto: 45000, realizado: 43500, desvio: -3.3 },
          { setor: "Controladoria", previsto: 20000, realizado: 21000, desvio: 5.0 },
        ],
        despesasPorTipo: [
          { tipo: "Pessoal", previsto: 180000, realizado: 175000, percentual: 38.6 },
          { tipo: "Infraestrutura", previsto: 110000, realizado: 113000, percentual: 24.9 },
          { tipo: "Veiculos", previsto: 42000, realizado: 45000, percentual: 9.9 },
          { tipo: "TI e Software", previsto: 46000, realizado: 44000, percentual: 9.7 },
          { tipo: "Utilidades", previsto: 34000, realizado: 35800, percentual: 7.9 },
          { tipo: "Seguranca", previsto: 35000, realizado: 33000, percentual: 7.3 },
          { tipo: "Outros", previsto: 8000, realizado: 7200, percentual: 1.6 },
        ],
      },
    },
  },
  engenharia: {
    titulo: "ENGENHARIA",
    icone: HardHat,
    cor: "bg-orange-500",
    setores: {
      planejamento: {
        titulo: "Planejamento",
        icone: Calendar,
        kpis: [
          { nome: "SPI", valor: 0.95, meta: 1.0, unidade: "", status: "atencao" },
          { nome: "Atraso Medio", valor: 5, meta: 0, unidade: "dias", status: "atencao" },
          { nome: "Cronograma", valor: 87, meta: 90, unidade: "%", status: "atencao" },
        ],
        itens: [
          { descricao: "Tarefas Previstas", previsto: 45, realizado: 42, unidade: "un", status: "atencao" },
          { descricao: "Tarefas Concluidas", previsto: 45, realizado: 40, unidade: "un", status: "atencao" },
          { descricao: "Caminho Critico", previsto: 0, realizado: 2, unidade: "atrasos", status: "critico" },
          { descricao: "Replanejamentos", previsto: 1, realizado: 2, unidade: "un", status: "alerta" },
        ],
        pendencias: [
          { tipo: "critico", descricao: "2 atividades criticas com atraso" },
          { tipo: "alerta", descricao: "SPI abaixo de 1.0" },
        ],
      },
      projeto: {
        titulo: "Projeto",
        icone: FileText,
        kpis: [
          { nome: "Projetos Entregues", valor: 12, meta: 14, unidade: "un", status: "atencao" },
          { nome: "Taxa Entrega", valor: 85.7, meta: 100, unidade: "%", status: "atencao" },
          { nome: "Revisoes", valor: 3, meta: 5, unidade: "un", status: "ok" },
        ],
        itens: [
          { descricao: "Proj. Terraplenagem", previsto: 4, realizado: 4, unidade: "un", status: "ok" },
          { descricao: "Proj. Pavimentacao", previsto: 3, realizado: 3, unidade: "un", status: "ok" },
          { descricao: "Proj. Drenagem", previsto: 4, realizado: 3, unidade: "un", status: "atencao" },
          { descricao: "Proj. OAE", previsto: 3, realizado: 2, unidade: "un", status: "atencao" },
        ],
        pendencias: [{ tipo: "alerta", descricao: "2 projetos pendentes de entrega (Drenagem e OAE)" }],
      },
    },
  },
  producao: {
    titulo: "PRODUCAO",
    icone: Activity,
    cor: "bg-green-500",
    setores: {
      performance: {
        titulo: "Performance",
        icone: Gauge,
        kpis: [
          { nome: "IDP", valor: 0.97, meta: 1.0, unidade: "", status: "atencao" },
          { nome: "Eficiencia", valor: 94, meta: 95, unidade: "%", status: "atencao" },
          { nome: "Disponibilidade", valor: 98, meta: 95, unidade: "%", status: "ok" },
        ],
        itens: [
          { descricao: "Horas Produtivas", previsto: 8800, realizado: 8520, unidade: "h", status: "atencao" },
          { descricao: "Horas Improdutivas", previsto: 400, realizado: 480, unidade: "h", status: "atencao" },
          { descricao: "Setup Time", previsto: 200, realizado: 180, unidade: "h", status: "ok" },
          { descricao: "OEE", previsto: 85, realizado: 82, unidade: "%", status: "atencao" },
        ],
        pendencias: [{ tipo: "alerta", descricao: "Horas improdutivas 20% acima do previsto" }],
      },
      produtividade: {
        titulo: "Produtividade",
        icone: TrendingUp,
        kpis: [
          { nome: "Prod. M.O.", valor: 1.15, meta: 1.2, unidade: "m³/Hh", status: "atencao" },
          { nome: "Prod. Equip.", valor: 85, meta: 90, unidade: "m³/h", status: "atencao" },
          { nome: "Custo Unitario", valor: 45.5, meta: 48, unidade: "R$/m³", status: "ok" },
        ],
        itens: [
          { descricao: "Concreto", previsto: 1.5, realizado: 1.4, unidade: "m³/Hh", status: "atencao" },
          { descricao: "Escavacao", previsto: 2.8, realizado: 2.9, unidade: "m³/Hh", status: "ok" },
          { descricao: "Pavimentacao", previsto: 0.8, realizado: 0.75, unidade: "m²/Hh", status: "atencao" },
          { descricao: "Armacao", previsto: 25, realizado: 27, unidade: "kg/Hh", status: "ok" },
        ],
        pendencias: [{ tipo: "alerta", descricao: "Produtividade de concreto 6.7% abaixo" }],
      },
      tarefas: {
        titulo: "Tarefas",
        icone: ListChecks,
        kpis: [
          { nome: "Concluidas", valor: 42, meta: 45, unidade: "un", status: "atencao" },
          { nome: "Em Andamento", valor: 8, meta: 5, unidade: "un", status: "alerta" },
          { nome: "Atrasadas", valor: 3, meta: 0, unidade: "un", status: "critico" },
        ],
        itens: [
          { descricao: "Frente 1 - Terraplenagem", previsto: 100, realizado: 94, unidade: "%", status: "atencao" },
          { descricao: "Frente 2 - Drenagem", previsto: 100, realizado: 91, unidade: "%", status: "atencao" },
          { descricao: "Frente 3 - Pavimentacao", previsto: 100, realizado: 107, unidade: "%", status: "ok" },
          { descricao: "Frente 4 - OAE", previsto: 100, realizado: 88, unidade: "%", status: "critico" },
        ],
        pendencias: [
          { tipo: "critico", descricao: "Frente 4 OAE com 12% de atraso" },
          { tipo: "alerta", descricao: "3 tarefas com atraso no mes" },
        ],
      },
    },
  },
  qualidade: {
    titulo: "QUALIDADE",
    icone: Shield,
    cor: "bg-purple-500",
    setores: {
      naoConformidades: {
        titulo: "Nao Conformidades",
        icone: AlertOctagon,
        kpis: [
          { nome: "NCs Abertas", valor: 7, meta: 5, unidade: "un", status: "atencao" },
          { nome: "NCs Fechadas", valor: 12, meta: 10, unidade: "un", status: "ok" },
          { nome: "Tempo Medio", valor: 8, meta: 7, unidade: "dias", status: "atencao" },
        ],
        itens: [
          { descricao: "NC Criticas", previsto: 0, realizado: 1, unidade: "un", status: "critico" },
          { descricao: "NC Maiores", previsto: 2, realizado: 3, unidade: "un", status: "atencao" },
          { descricao: "NC Menores", previsto: 3, realizado: 3, unidade: "un", status: "ok" },
          { descricao: "NC Observacao", previsto: 5, realizado: 5, unidade: "un", status: "ok" },
        ],
        pendencias: [
          { tipo: "critico", descricao: "1 NC critica aberta ha 15 dias" },
          { tipo: "alerta", descricao: "7 NCs abertas - 2 acima da meta" },
        ],
      },
      inspecoes: {
        titulo: "Inspecoes",
        icone: FileCheck,
        kpis: [
          { nome: "Realizadas", valor: 22, meta: 24, unidade: "un", status: "atencao" },
          { nome: "Aprovadas", valor: 20, meta: 22, unidade: "un", status: "atencao" },
          { nome: "Conformidade", valor: 93.5, meta: 95, unidade: "%", status: "atencao" },
        ],
        itens: [
          { descricao: "Insp. Concreto", previsto: 8, realizado: 8, unidade: "un", status: "ok" },
          { descricao: "Insp. Solo", previsto: 6, realizado: 5, unidade: "un", status: "atencao" },
          { descricao: "Insp. Asfalto", previsto: 6, realizado: 6, unidade: "un", status: "ok" },
          { descricao: "Insp. Estrutura", previsto: 4, realizado: 3, unidade: "un", status: "atencao" },
        ],
        pendencias: [{ tipo: "alerta", descricao: "2 inspecoes pendentes no mes" }],
      },
      ssma: {
        titulo: "SSMA",
        icone: ShieldAlert,
        kpis: [
          { nome: "Taxa Frequencia", valor: 0.8, meta: 1.0, unidade: "", status: "ok" },
          { nome: "Dias s/ Acidente", valor: 127, meta: 100, unidade: "dias", status: "ok" },
          { nome: "DDS Realizados", valor: 22, meta: 22, unidade: "un", status: "ok" },
        ],
        itens: [
          { descricao: "Acidentes CPT", previsto: 0, realizado: 0, unidade: "un", status: "ok" },
          { descricao: "Acidentes SPT", previsto: 0, realizado: 1, unidade: "un", status: "alerta" },
          { descricao: "Incidentes", previsto: 2, realizado: 3, unidade: "un", status: "atencao" },
          { descricao: "Treinamentos", previsto: 8, realizado: 10, unidade: "un", status: "ok" },
        ],
        pendencias: [{ tipo: "alerta", descricao: "1 acidente SPT registrado" }],
      },
    },
  },
  administrativo: {
    titulo: "ADMINISTRATIVO",
    icone: ClipboardList,
    cor: "bg-slate-500",
    setores: {
      rh: {
        titulo: "RH",
        icone: Users,
        kpis: [
          { nome: "Efetivo", valor: 342, meta: 350, unidade: "col", status: "atencao" },
          { nome: "Turnover", valor: 3.2, meta: 5, unidade: "%", status: "ok" },
          { nome: "Absenteismo", valor: 2.8, meta: 3, unidade: "%", status: "ok" },
        ],
        itens: [
          { descricao: "Proprios", previsto: 260, realizado: 257, unidade: "col", status: "ok" },
          { descricao: "Terceiros", previsto: 90, realizado: 85, unidade: "col", status: "atencao" },
          { descricao: "Admissoes", previsto: 15, realizado: 12, unidade: "col", status: "atencao" },
          { descricao: "Demissoes", previsto: 8, realizado: 11, unidade: "col", status: "atencao" },
        ],
        pendencias: [{ tipo: "alerta", descricao: "Efetivo 8 colaboradores abaixo do planejado" }],
      },
      financeiro: {
        titulo: "Financeiro",
        icone: Wallet,
        kpis: [
          { nome: "Fluxo Caixa", valor: 2450000, meta: 2000000, unidade: "R$", status: "ok" },
          { nome: "Geracao Caixa", valor: 1850000, meta: 1500000, unidade: "R$", status: "ok" },
          { nome: "Inadimplencia", valor: 0, meta: 0, unidade: "%", status: "ok" },
        ],
        itens: [
          { descricao: "Entradas", previsto: 12000000, realizado: 11800000, unidade: "R$", status: "atencao" },
          { descricao: "Saidas", previsto: 10000000, realizado: 9350000, unidade: "R$", status: "ok" },
          { descricao: "Saldo Inicial", previsto: 2000000, realizado: 2000000, unidade: "R$", status: "ok" },
          { descricao: "Saldo Final", previsto: 4000000, realizado: 4450000, unidade: "R$", status: "ok" },
        ],
        pendencias: [],
      },
      despesas: {
        titulo: "Despesas",
        icone: Receipt,
        kpis: [
          { nome: "DAG Total", valor: 453000, meta: 500000, unidade: "R$", status: "ok" },
          { nome: "DAG/Receita", valor: 3.62, meta: 4.0, unidade: "%", status: "ok" },
          { nome: "Desvio DAG", valor: -9.4, meta: 0, unidade: "%", status: "ok" },
        ],
        itens: [
          { descricao: "Administrativo", previsto: 400000, realizado: 380000, unidade: "R$", status: "ok" },
          { descricao: "Financeiro", previsto: 50000, realizado: 45000, unidade: "R$", status: "ok" },
          { descricao: "Comercial", previsto: 30000, realizado: 28000, unidade: "R$", status: "ok" },
          { descricao: "TI/Infra", previsto: 20000, realizado: 18000, unidade: "R$", status: "ok" },
        ],
        pendencias: [],
      },
    },
  },
}

// ============================================================================
// DADOS DRE CONSOLIDADO
// ============================================================================
const dreMensal = {
  receita: { medicaoAprovada: 12450000, medicaoPendente: 890000, totalReceita: 13340000 },
  deducoes: { pis: 86710, cofins: 400200, iss: 333500, totalDeducoes: 820410 },
  receitaLiquida: 12519590,
  custos: {
    maoDeObra: 3200000,
    materiais: 4100000,
    equipamentos: 1850000,
    subcontratados: 2100000,
    totalCustoDireto: 11250000,
  },
  margemContribuicao: 1269590,
  dag: { administrativo: 380000, financeiro: 45000, comercial: 28000, totalDAG: 453000 },
  resultadoOperacional: 816590,
  indicadores: { margemBruta: 10.14, margemLiquida: 6.52 },
}

// ============================================================================
// DADOS CONSOLIDADOS PARA RELATORIO
// ============================================================================
const dadosConsolidadosRelatorio = {
  administrativoFinanceiro: {
    dre: {
      receitaBruta: 13340000,
      deducoes: 820410,
      receitaLiquida: 12519590,
      custoDireto: 11250000,
      margemContribuicao: 1269590,
      dag: 453000,
      resultadoOperacional: 816590,
      margemOperacional: 6.52,
    },
    fluxoCaixa: {
      saldoInicial: 2500000,
      entradas: 12450000,
      saidas: 11800000,
      saldoFinal: 3150000,
      geracaoCaixa: 650000,
    },
    rh: {
      efetivo: 245,
      admissoes: 12,
      demissoes: 8,
      horasExtras: 1250,
      absenteismo: 3.2,
    },
  },
  engenharia: {
    spi: 0.98,
    avanco: 67.5,
    projetos: {
      entregues: 12,
      pendentes: 3,
      total: 15,
    },
    desviosCronograma: 5,
  },
  producaoComercial: {
    fcd: 1.18,
    crco: 0.98,
    cicd: 0.036,
    medicaoAprovada: 12450000,
    medicaoPendente: 890000,
    produtividade: 92,
  },
  qsms: {
    ncsAbertas: 5,
    ncsFechadas: 18,
    acidentes: 0,
    diasSemAcidentes: 127,
    treinamentos: 45,
    auditorias: 3,
  },
  parecerGerente: "",
  planosAcao: [
    { descricao: "Reduzir lead time de suprimentos", status: "Em andamento", responsavel: "Joao Souza" },
    { descricao: "Fechar NCs pendentes de qualidade", status: "Em andamento", responsavel: "Maria Santos" },
    { descricao: "Ajustar cronograma de terraplenagem", status: "Concluido", responsavel: "Pedro Lima" },
  ],
}

// ============================================================================
// HELPERS
// ============================================================================
const formatCurrency = (value: number | undefined | null) => {
  if (value === undefined || value === null) return "R$ 0"
  if (value >= 1000000) return `R$ ${(value / 1000000).toFixed(1)} Mi`
  if (value >= 1000) return `R$ ${(value / 1000).toFixed(0)} mil`
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 0 }).format(value)
}

const formatValue = (value: number | undefined | null, unidade: string) => {
  if (value === undefined || value === null) return `0 ${unidade}`
  if (unidade === "R$") return formatCurrency(value)
  return `${value.toLocaleString("pt-BR")} ${unidade}`
}

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================
export default function EncerramentoPage() {
  const [departamentoAtual, setDepartamentoAtual] = useState<string>("comercial")
  const [setorAtual, setSetorAtual] = useState<string>("suprimentos")
  const [setoresValidados, setSetoresValidados] = useState<Record<string, boolean>>({})
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [parecerGerente, setParecerGerente] = useState("")
  const [checklistFinal, setChecklistFinal] = useState({
    reviseiDados: false,
    cienteDesvios: false,
    planosRegistrados: false,
    houveGovernanca: false,
    assumoResponsabilidade: false,
  })
  const [previaSalva, setPreviaSalva] = useState(false)
  const [mesFechado, setMesFechado] = useState(false)

  const departamentos = Object.entries(estruturaDepartamentos)
  const isConsolidado = departamentoAtual === "consolidado"

  const depData = !isConsolidado
    ? estruturaDepartamentos[departamentoAtual as keyof typeof estruturaDepartamentos]
    : null
  const setores = depData ? Object.entries(depData.setores) : []
  const setorData = depData && setorAtual ? depData.setores[setorAtual as keyof typeof depData.setores] : null

  // Contagem de setores validados
  const totalSetores = Object.values(estruturaDepartamentos).reduce(
    (acc, dep) => acc + Object.keys(dep.setores).length,
    0,
  )
  const setoresOK = Object.values(setoresValidados).filter(Boolean).length
  const progressoGeral = Math.round((setoresOK / totalSetores) * 100)

  const getStatusDepartamento = (depKey: string) => {
    const dep = estruturaDepartamentos[depKey as keyof typeof estruturaDepartamentos]
    const setoresDep = Object.keys(dep.setores)
    const validados = setoresDep.filter((s) => setoresValidados[`${depKey}_${s}`]).length
    if (validados === setoresDep.length) return "completo"
    if (validados > 0) return "parcial"
    return "pendente"
  }

  const handleSalvarSetor = () => {
    if (setorAtual) {
      const chave = `${departamentoAtual}_${setorAtual}`
      setSetoresValidados((prev) => ({ ...prev, [chave]: true }))
    }
  }

  const handleSalvarPrevia = () => {
    setPreviaSalva(true)
  }

  const todosChecksFinalMarcados = Object.values(checklistFinal).every(Boolean)
  const podeConsolidar = progressoGeral === 100 && todosChecksFinalMarcados && parecerGerente.length > 50

  const handleConsolidar = () => {
    setShowConfirmDialog(false)
    setMesFechado(true)
  }

  // Ao trocar departamento, selecionar primeiro setor
  const handleTrocarDepartamento = (depKey: string) => {
    setDepartamentoAtual(depKey)
    if (depKey !== "consolidado") {
      const dep = estruturaDepartamentos[depKey as keyof typeof estruturaDepartamentos]
      const primeiroSetor = Object.keys(dep.setores)[0]
      setSetorAtual(primeiroSetor)
    }
  }

  const renderWorkflowVisual = () => {
    const etapas = [
      ...departamentos.map(([key, dep]) => ({
        key,
        titulo: dep.titulo,
        icone: dep.icone,
        cor: dep.cor,
        status: getStatusDepartamento(key),
      })),
      {
        key: "consolidado",
        titulo: "CONSOLIDADO",
        icone: PieChart,
        cor: "bg-primary",
        status: progressoGeral === 100 ? (mesFechado ? "completo" : "pronto") : "bloqueado",
      },
    ]

    return (
      <div className="mb-6">
        {/* Workflow visual com linha conectora */}
        <div className="relative">
          {/* Linha de conexao */}
          <div className="absolute top-6 left-0 right-0 h-0.5 bg-muted-foreground/20 z-0" />
          <div
            className="absolute top-6 left-0 h-0.5 bg-green-500 z-0 transition-all duration-500"
            style={{ width: `${(setoresOK / totalSetores) * 100}%` }}
          />

          {/* Etapas */}
          <div className="relative z-10 flex justify-between">
            {etapas.map((etapa) => {
              const Icone = etapa.icone
              const isAtivo = departamentoAtual === etapa.key
              const isCompleto = etapa.status === "completo"
              const isParcial = etapa.status === "parcial"
              const isPronto = etapa.status === "pronto"
              const isBloqueado = etapa.status === "bloqueado"

              return (
                <button
                  key={etapa.key}
                  onClick={() => handleTrocarDepartamento(etapa.key)}
                  className={`flex flex-col items-center gap-1.5 transition-all ${
                    isBloqueado && etapa.key === "consolidado" ? "opacity-50" : "cursor-pointer hover:scale-105"
                  }`}
                  disabled={isBloqueado && etapa.key === "consolidado"}
                >
                  {/* Circulo com icone */}
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all ${
                      isCompleto
                        ? "bg-green-500 border-green-500 text-white"
                        : isParcial
                          ? "bg-yellow-500 border-yellow-500 text-white"
                          : isPronto
                            ? "bg-blue-500 border-blue-500 text-white animate-pulse"
                            : isAtivo
                              ? `${etapa.cor} border-primary text-white`
                              : "bg-background border-muted-foreground/30 text-muted-foreground"
                    }`}
                  >
                    {isCompleto ? <CheckCircle className="w-5 h-5" /> : <Icone className="w-5 h-5" />}
                  </div>

                  {/* Label */}
                  <span
                    className={`text-[10px] font-medium text-center max-w-[70px] leading-tight ${
                      isAtivo ? "text-foreground font-bold" : "text-muted-foreground"
                    }`}
                  >
                    {etapa.titulo}
                  </span>

                  {/* Indicador de status */}
                  {isCompleto && <Badge className="bg-green-500 text-[8px] px-1 py-0 h-4">OK</Badge>}
                  {isParcial && <Badge className="bg-yellow-500 text-[8px] px-1 py-0 h-4">Parcial</Badge>}
                  {isPronto && !mesFechado && <Badge className="bg-blue-500 text-[8px] px-1 py-0 h-4">Pronto</Badge>}
                  {mesFechado && etapa.key === "consolidado" && (
                    <Badge className="bg-red-500 text-[8px] px-1 py-0 h-4">
                      <Lock className="w-2 h-2 mr-0.5" />
                      Travado
                    </Badge>
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* Barra de progresso */}
        <div className="mt-4 flex items-center gap-3">
          <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-green-500 to-emerald-400 transition-all duration-500"
              style={{ width: `${progressoGeral}%` }}
            />
          </div>
          <span className="text-xs font-medium text-muted-foreground min-w-[80px]">{progressoGeral}% concluido</span>
        </div>
      </div>
    )
  }

  // ============================================================================
  // RENDER - PAINEL DO SETOR
  // ============================================================================
  const renderPainelSetor = () => {
    if (!setorData) return null
    const IconeSetor = setorData.icone
    const chaveSetor = `${departamentoAtual}_${setorAtual}`
    const jaValidado = setoresValidados[chaveSetor]

    // Handle specific rendering for the 'indireto' sector
    if (departamentoAtual === "comercial" && setorAtual === "indireto") {
      const indiretoData = setorData as typeof estruturaDepartamentos.comercial.setores.indireto
      return (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-primary/10">
                <IconeSetor className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">{setorData.titulo}</h3>
                <p className="text-xs text-muted-foreground">Dados consolidados do setor</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge
                variant="outline"
                className={jaValidado ? "bg-green-500/10 text-green-600 border-green-500/30" : ""}
              >
                {jaValidado ? (
                  <>
                    <CheckCircle className="w-3 h-3 mr-1" /> OK
                  </>
                ) : (
                  <>
                    <Clock className="w-3 h-3 mr-1" /> Pendente
                  </>
                )}
              </Badge>
              <Button
                onClick={handleSalvarSetor}
                disabled={jaValidado || mesFechado}
                size="sm"
                className={jaValidado ? "bg-green-600" : "bg-primary"}
              >
                {jaValidado ? (
                  <>
                    <CheckCircle className="w-4 h-4 mr-1" /> Salvo
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-1" /> Salvar OK
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* KPIs do Setor (Indireto) */}
          <Card className="p-3">
            <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">Indicadores</h4>
            <div className="grid grid-cols-3 gap-2">
              {indiretoData.kpis.map((kpi) => (
                <div
                  key={kpi.nome}
                  className={`p-3 rounded-lg border ${
                    kpi.status === "ok"
                      ? "bg-green-500/5 border-green-500/30"
                      : kpi.status === "atencao"
                        ? "bg-yellow-500/5 border-yellow-500/30"
                        : "bg-red-500/5 border-red-500/30"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-medium text-muted-foreground uppercase">{kpi.nome}</span>
                    {kpi.status === "ok" ? (
                      <CheckCircle className="w-3 h-3 text-green-600" />
                    ) : kpi.status === "atencao" ? (
                      <AlertCircle className="w-3 h-3 text-yellow-600" />
                    ) : (
                      <XCircle className="w-3 h-3 text-red-600" />
                    )}
                  </div>
                  <p className="text-xl font-bold font-mono">
                    {kpi.unidade === "R$" ? formatCurrency(kpi.valor) : `${kpi.valor}${kpi.unidade}`}
                  </p>
                  <p className="text-[10px] text-muted-foreground">
                    Meta: {kpi.unidade === "R$" ? formatCurrency(kpi.meta) : `${kpi.meta}${kpi.unidade}`}
                  </p>
                </div>
              ))}
            </div>
          </Card>

          {/* Itens Detalhados (Indireto) */}
          <Card className="p-3">
            <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
              Despesas por Tipo
            </h4>
            <div className="space-y-1.5">
              {indiretoData.despesasPorTipo.map((item, i) => (
                <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-muted/30 hover:bg-muted/50">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{item.tipo}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-muted-foreground">Prev: {formatValue(item.previsto, "R$")}</span>
                    <span className="font-medium">Real: {formatValue(item.realizado, "R$")}</span>
                    <span className="font-mono text-xs px-1.5 py-0.5 rounded bg-gray-200">
                      {item.percentual.toFixed(1)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Despesas por Setor (Indireto) */}
          <Card className="p-3">
            <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
              Despesas por Setor
            </h4>
            <div className="space-y-1.5">
              {indiretoData.despesasPorSetor.map((item, i) => (
                <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-muted/30 hover:bg-muted/50">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{item.setor}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-muted-foreground">Prev: {formatValue(item.previsto, "R$")}</span>
                    <span className="font-medium">Real: {formatValue(item.realizado, "R$")}</span>
                    <span
                      className={`font-mono text-xs px-1.5 py-0.5 rounded ${
                        item.desvio > 0
                          ? "bg-red-500/10 text-red-600"
                          : item.desvio < 0
                            ? "bg-green-500/10 text-green-600"
                            : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {item.desvio > 0 ? "+" : ""}
                      {item.desvio.toFixed(1)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Pendencias (Indireto) */}
          {indiretoData.pendencias.length > 0 && (
            <Card className="p-3 border-yellow-500/30 bg-yellow-500/5">
              <h4 className="text-xs font-semibold uppercase tracking-wide text-yellow-700 mb-2">
                Pendencias / Alertas
              </h4>
              <div className="space-y-1.5">
                {indiretoData.pendencias.map((pend, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm">
                    {pend.tipo === "critico" ? (
                      <XCircle className="w-4 h-4 text-red-600 mt-0.5" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-yellow-600 mt-0.5" />
                    )}
                    <span className={pend.tipo === "critico" ? "text-red-700" : "text-yellow-700"}>
                      {pend.descricao}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      )
    }

    // Default rendering for other sectors
    return (
      <div className="space-y-4">
        {/* Header do Setor */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-primary/10">
              <IconeSetor className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">{setorData.titulo}</h3>
              <p className="text-xs text-muted-foreground">Dados consolidados do setor</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className={jaValidado ? "bg-green-500/10 text-green-600 border-green-500/30" : ""}>
              {jaValidado ? (
                <>
                  <CheckCircle className="w-3 h-3 mr-1" /> OK
                </>
              ) : (
                <>
                  <Clock className="w-3 h-3 mr-1" /> Pendente
                </>
              )}
            </Badge>
            <Button
              onClick={handleSalvarSetor}
              disabled={jaValidado || mesFechado}
              size="sm"
              className={jaValidado ? "bg-green-600" : "bg-primary"}
            >
              {jaValidado ? (
                <>
                  <CheckCircle className="w-4 h-4 mr-1" /> Salvo
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-1" /> Salvar OK
                </>
              )}
            </Button>
          </div>
        </div>

        {/* KPIs do Setor */}
        <Card className="p-3">
          <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">Indicadores</h4>
          <div className="grid grid-cols-3 gap-2">
            {setorData.kpis.map((kpi) => (
              <div
                key={kpi.nome}
                className={`p-3 rounded-lg border ${
                  kpi.status === "ok"
                    ? "bg-green-500/5 border-green-500/30"
                    : kpi.status === "atencao"
                      ? "bg-yellow-500/5 border-yellow-500/30"
                      : "bg-red-500/5 border-red-500/30"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-medium text-muted-foreground uppercase">{kpi.nome}</span>
                  {kpi.status === "ok" ? (
                    <CheckCircle className="w-3 h-3 text-green-600" />
                  ) : kpi.status === "atencao" ? (
                    <AlertCircle className="w-3 h-3 text-yellow-600" />
                  ) : (
                    <XCircle className="w-3 h-3 text-red-600" />
                  )}
                </div>
                <p className="text-xl font-bold font-mono">
                  {kpi.unidade === "R$" ? formatCurrency(kpi.valor) : `${kpi.valor}${kpi.unidade}`}
                </p>
                <p className="text-[10px] text-muted-foreground">
                  Meta: {kpi.unidade === "R$" ? formatCurrency(kpi.meta) : `${kpi.meta}${kpi.unidade}`}
                </p>
              </div>
            ))}
          </div>
        </Card>

        {/* Itens Detalhados */}
        <Card className="p-3">
          <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">Detalhamento</h4>
          <div className="space-y-1.5">
            {setorData.itens.map((item, i) => {
              const desvio = item.previsto > 0 ? ((item.realizado - item.previsto) / item.previsto) * 100 : 0
              return (
                <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-muted/30 hover:bg-muted/50">
                  <div className="flex items-center gap-2">
                    {item.status === "ok" ? (
                      <CheckCircle className="w-3.5 h-3.5 text-green-600" />
                    ) : item.status === "atencao" ? (
                      <AlertCircle className="w-3.5 h-3.5 text-yellow-600" />
                    ) : item.status === "alerta" ? (
                      <AlertTriangle className="w-3.5 h-3.5 text-orange-600" />
                    ) : (
                      <XCircle className="w-3.5 h-3.5 text-red-600" />
                    )}
                    <span className="text-sm">{item.descricao}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-muted-foreground">Prev: {formatValue(item.previsto, item.unidade)}</span>
                    <span className="font-medium">Real: {formatValue(item.realizado, item.unidade)}</span>
                    <span
                      className={`font-mono text-xs px-1.5 py-0.5 rounded ${
                        desvio > 0
                          ? "bg-red-500/10 text-red-600"
                          : desvio < 0
                            ? "bg-green-500/10 text-green-600"
                            : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {desvio > 0 ? "+" : ""}
                      {desvio.toFixed(1)}%
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </Card>

        {/* Pendencias */}
        {setorData.pendencias.length > 0 && (
          <Card className="p-3 border-yellow-500/30 bg-yellow-500/5">
            <h4 className="text-xs font-semibold uppercase tracking-wide text-yellow-700 mb-2">Pendencias / Alertas</h4>
            <div className="space-y-1.5">
              {setorData.pendencias.map((pend, i) => (
                <div key={i} className="flex items-start gap-2 text-sm">
                  {pend.tipo === "critico" ? (
                    <XCircle className="w-4 h-4 text-red-600 mt-0.5" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-yellow-600 mt-0.5" />
                  )}
                  <span className={pend.tipo === "critico" ? "text-red-700" : "text-yellow-700"}>{pend.descricao}</span>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    )
  }

  // ============================================================================
  // RENDER - CONSOLIDADO FINAL
  // ============================================================================
  const renderConsolidado = () => (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-primary/10">
            <PieChart className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Consolidado Final</h3>
            <p className="text-xs text-muted-foreground">Extrato da saude do contrato</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className={previaSalva ? "bg-blue-500/10 text-blue-600 border-blue-500/30" : ""}>
            {previaSalva ? "Previa Salva" : "Rascunho"}
          </Badge>
          <Button onClick={handleSalvarPrevia} variant="outline" size="sm" disabled={mesFechado}>
            <Save className="w-4 h-4 mr-1" /> Salvar Previa
          </Button>
          <RelatorioGerencial
            competencia="Dezembro/2025"
            contrato="BR-101 LOTE 2"
            status={mesFechado ? "consolidado" : "previa"}
            dadosConsolidados={{
              ...dadosConsolidadosRelatorio,
              parecerGerente: parecerGerente,
            }}
            gerenteNome="Carlos Silva"
          />
          <Link href="/obra/gerencial/encerramento/repositorio">
            <Button variant="outline" size="sm">
              <FolderOpen className="w-4 h-4 mr-1" /> Repositorio
            </Button>
          </Link>
        </div>
      </div>

      {/* Progresso de Validacao */}
      <Card className="p-3">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Progresso de Validacao
          </h4>
          <span className="text-sm font-bold">
            {setoresOK}/{totalSetores} setores
          </span>
        </div>
        <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
          <div
            className={`h-full transition-all ${progressoGeral === 100 ? "bg-green-500" : "bg-primary"}`}
            style={{ width: `${progressoGeral}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          {progressoGeral === 100
            ? "Todas as validacoes concluidas"
            : `${100 - progressoGeral}% restante para liberacao`}
        </p>
      </Card>

      {/* KPIs Consolidados */}
      <Card className="p-3">
        <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">KPIs Consolidados</h4>
        <div className="grid grid-cols-6 gap-2">
          {[
            { nome: "F/CD", valor: "1.18", meta: "1.25", status: "atencao" },
            { nome: "CR/CO", valor: "0.98", meta: "1.00", status: "ok" },
            { nome: "CI/CD", valor: "3.62%", meta: "4.0%", status: "ok" },
            { nome: "MO", valor: "6.52%", meta: "7.0%", status: "atencao" },
            { nome: "SPI", valor: "0.95", meta: "1.00", status: "atencao" },
            { nome: "CPI", valor: "1.02", meta: "1.00", status: "ok" },
          ].map((kpi) => (
            <div
              key={kpi.nome}
              className={`p-2 rounded-lg border text-center ${
                kpi.status === "ok" ? "bg-green-500/5 border-green-500/30" : "bg-yellow-500/5 border-yellow-500/30"
              }`}
            >
              <span className="text-[10px] font-medium text-muted-foreground block">{kpi.nome}</span>
              <span className="text-lg font-bold font-mono">{kpi.valor}</span>
              <span className="text-[10px] text-muted-foreground block">Meta: {kpi.meta}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* DRE Resumido */}
      <Card className="p-3">
        <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">DRE Resumido</h4>
        <div className="space-y-1 text-sm">
          <div className="flex justify-between p-1.5 bg-emerald-500/5 rounded">
            <span className="font-medium text-emerald-700">RECEITA BRUTA</span>
            <span className="font-bold text-emerald-700">{formatCurrency(dreMensal.receita.totalReceita)}</span>
          </div>
          <div className="flex justify-between p-1.5">
            <span className="text-muted-foreground">(-) Deducoes</span>
            <span className="text-red-600">({formatCurrency(dreMensal.deducoes.totalDeducoes)})</span>
          </div>
          <div className="flex justify-between p-1.5 bg-muted/50 rounded">
            <span className="font-medium">(=) Receita Liquida</span>
            <span className="font-bold">{formatCurrency(dreMensal.receitaLiquida)}</span>
          </div>
          <div className="flex justify-between p-1.5">
            <span className="text-muted-foreground">(-) Custo Direto</span>
            <span className="text-red-600">({formatCurrency(dreMensal.custos.totalCustoDireto)})</span>
          </div>
          <div className="flex justify-between p-1.5 bg-emerald-500/5 rounded">
            <span className="font-medium text-emerald-700">(=) Margem Contribuicao</span>
            <span className="font-bold text-emerald-700">{formatCurrency(dreMensal.margemContribuicao)}</span>
          </div>
          <div className="flex justify-between p-1.5">
            <span className="text-muted-foreground">(-) DAG</span>
            <span className="text-red-600">({formatCurrency(dreMensal.dag.totalDAG)})</span>
          </div>
          <div className="flex justify-between p-1.5 bg-primary/10 rounded">
            <span className="font-semibold text-primary">(=) RESULTADO OPERACIONAL</span>
            <span className="font-bold text-primary text-lg">{formatCurrency(dreMensal.resultadoOperacional)}</span>
          </div>
        </div>
      </Card>

      {/* Parecer do Gerente */}
      <Card className="p-3">
        <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">Parecer do Gerente</h4>
        <Textarea
          placeholder="Registre sua analise final do periodo, justificativas para desvios e estrategia para o proximo mes... (minimo 50 caracteres)"
          value={parecerGerente}
          onChange={(e) => setParecerGerente(e.target.value)}
          className="min-h-[80px] text-sm"
          disabled={mesFechado}
        />
        <p className="text-xs text-muted-foreground mt-1">{parecerGerente.length}/50 caracteres minimos</p>
      </Card>

      {/* Checklist de Responsabilidade */}
      <Card className="p-3 border-primary/30">
        <h4 className="text-xs font-semibold uppercase tracking-wide text-primary mb-2">
          Declaracao de Responsabilidade
        </h4>
        <div className="space-y-2">
          {[
            { key: "reviseiDados", label: "Revisei todos os dados e indicadores do periodo" },
            { key: "cienteDesvios", label: "Estou ciente de todos os desvios e alertas apresentados" },
            { key: "planosRegistrados", label: "Confirmo que os planos de acao estao registrados" },
            { key: "houveGovernanca", label: "Confirmo que houve governanca no periodo" },
            { key: "assumoResponsabilidade", label: "ASSUMO RESPONSABILIDADE INTEGRAL por este fechamento" },
          ].map((item) => (
            <div key={item.key} className="flex items-center gap-2">
              <Checkbox
                id={item.key}
                checked={checklistFinal[item.key as keyof typeof checklistFinal]}
                onCheckedChange={(checked) => setChecklistFinal((prev) => ({ ...prev, [item.key]: !!checked }))}
                disabled={mesFechado}
              />
              <label
                htmlFor={item.key}
                className={`text-sm cursor-pointer ${item.key === "assumoResponsabilidade" ? "font-bold text-primary" : ""}`}
              >
                {item.label}
              </label>
            </div>
          ))}
        </div>
      </Card>

      {/* Botao Consolidar */}
      <Button
        onClick={() => setShowConfirmDialog(true)}
        disabled={!podeConsolidar || mesFechado}
        className="w-full h-12 text-lg bg-red-600 hover:bg-red-700"
      >
        <Lock className="w-5 h-5 mr-2" />
        {mesFechado ? "MES CONSOLIDADO E TRAVADO" : "CONSOLIDAR MES - PACTO DEFINITIVO"}
      </Button>

      {!podeConsolidar && !mesFechado && (
        <p className="text-xs text-center text-muted-foreground">
          {progressoGeral < 100
            ? `Faltam ${totalSetores - setoresOK} setores para validar`
            : !todosChecksFinalMarcados
              ? "Complete todas as declaracoes de responsabilidade"
              : "Escreva o parecer com pelo menos 50 caracteres"}
        </p>
      )}
    </div>
  )

  // ============================================================================
  // RENDER PRINCIPAL
  // ============================================================================
  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="text-xs">
            GC-03
          </Badge>
          <h1 className="text-xl font-bold">FECHAMENTO GERENCIAL MENSAL</h1>
          {mesFechado && (
            <Badge className="bg-red-600">
              <Lock className="w-3 h-3 mr-1" /> TRAVADO
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className={progressoGeral === 100 ? "bg-green-500/10 text-green-600 border-green-500/30" : ""}
          >
            <Clock className="w-3 h-3 mr-1" /> {setoresOK}/{totalSetores} Setores
          </Badge>
          <Link href="/obra/gerencial/encerramento/repositorio">
            <Button variant="outline" size="sm">
              <FolderOpen className="w-4 h-4 mr-1" /> Repositorio
            </Button>
          </Link>
          <Button variant="outline" size="sm">
            <Printer className="w-4 h-4 mr-1" /> Imprimir
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-1" /> Exportar
          </Button>
        </div>
      </div>

      <p className="text-sm text-muted-foreground mb-4">
        Competencia: <strong>Dezembro/2025</strong> | Contrato: <strong>BR-101 LOTE 2</strong>
      </p>

      {renderWorkflowVisual()}

      {/* Sub-barra de Setores */}
      {!isConsolidado && setores.length > 0 && (
        <div className="flex gap-1 mb-4 bg-muted/30 p-1.5 rounded-lg">
          {setores.map(([key, setor]) => {
            const chave = `${departamentoAtual}_${key}`
            const jaValidado = setoresValidados[chave]
            const IconeSetor = setor.icone
            return (
              <Button
                key={key}
                variant={setorAtual === key ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setSetorAtual(key)}
                className={`flex items-center gap-1.5 ${jaValidado ? "text-green-600" : ""}`}
              >
                <IconeSetor className="w-4 h-4" />
                <span>{setor.titulo}</span>
                {jaValidado && <CheckCircle className="w-3 h-3 text-green-500" />}
              </Button>
            )
          })}
        </div>
      )}

      {/* Conteudo Principal */}
      <ScrollArea className="h-[calc(100vh-320px)]">
        {isConsolidado ? renderConsolidado() : renderPainelSetor()}
      </ScrollArea>

      {/* Dialog de Confirmacao */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-red-600 flex items-center gap-2">
              <AlertOctagon className="w-5 h-5" />
              CONFIRMACAO DE FECHAMENTO
            </DialogTitle>
            <DialogDescription className="space-y-3 pt-2">
              <p className="font-semibold">Esta acao e IRREVERSIVEL!</p>
              <ul className="text-sm space-y-1 list-disc list-inside">
                <li>O sistema sera TRAVADO para lancamentos</li>
                <li>Nao havera possibilidade de edicao</li>
                <li>Seu nome sera registrado como responsavel</li>
                <li>O parecer e indicadores serao permanentes</li>
              </ul>
              <p className="text-primary font-medium">
                Ao confirmar, voce assume TOTAL RESPONSABILIDADE pelo fechamento de Dezembro/2025.
              </p>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setShowConfirmDialog(false)}>
              Cancelar
            </Button>
            <Button className="bg-red-600 hover:bg-red-700" onClick={handleConsolidar}>
              <Lock className="w-4 h-4 mr-2" />
              CONFIRMAR E TRAVAR
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
