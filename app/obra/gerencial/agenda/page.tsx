"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ObraGerencialNavbar } from "../../_components/obra-gerencial-navbar"
import { Label } from "@/components/ui/label"
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Building2,
  FileText,
  AlertTriangle,
  CheckCircle2,
  Circle,
  X,
  MessageSquare,
  Paperclip,
  History,
  Plus,
  Calendar,
  Users,
  TrendingUp,
  TrendingDown,
  Link2,
  Target,
  Gauge,
  FileCheck,
  Shield,
  BarChart3,
  ExternalLink,
  List,
  PieChart,
  Play,
  Sun,
  Cloud,
  Wind,
  Thermometer,
  HardHat,
  Camera,
  ClipboardList,
  AlertCircle,
  Send,
  Eye,
  FileImage,
  FilePlus,
  Info,
  ChevronDown,
} from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip" // Added Tooltip components
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip, // Renamed Tooltip to avoid conflict
  Legend,
  LineChart,
  Line,
} from "recharts"

const CircularProgress = ({
  value,
  size = 36,
  strokeWidth = 4,
  className = "",
}: { value: number; size?: number; strokeWidth?: number; className?: string }) => {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (value / 100) * circumference

  const getColorClass = () => {
    if (value >= 80) return "stroke-success"
    if (value >= 50) return "stroke-info"
    if (value >= 30) return "stroke-warning"
    return "stroke-destructive"
  }

  const getBgClass = () => {
    if (value >= 80) return "text-success"
    if (value >= 50) return "text-info"
    if (value >= 30) return "text-warning"
    return "text-destructive"
  }

  return (
    <div
      className={`relative inline-flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="transform -rotate-90 drop-shadow-sm">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          className="stroke-muted/20"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className={`${getColorClass()} transition-all duration-500 ease-out`}
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center">
        <span className={`text-sm font-bold ${getBgClass()}`}>{value}%</span>
      </div>
    </div>
  )
}

type Tipo = "reuniao" | "cobranca" | "aprovacao" | "auditoria" | "comunicacao" | "planejamento" | "financeiro"
type Origem = "contrato" | "obra" | "corporativo" | "auditoria"
type Status = "pendente" | "em_andamento" | "concluido" | "atrasado"
type Prioridade = "critica" | "alta" | "media" | "baixa"

interface OrigemNeural {
  tipo: "kpi" | "medicao" | "change_control" | "qsms" | "governanca" | "financeiro"
  label: string
  link: string
}

interface ChecklistItem {
  id: string
  texto: string
  concluido: boolean
}

interface Comentario {
  id: string
  usuario: string
  data: string
  texto: string
}

interface AcaoGerencial {
  id: string
  titulo: string
  descricao: string
  tipo: Tipo
  origem: Origem
  status: Status
  prioridade: Prioridade
  responsavel: string
  prazo: string
  dataCriacao: string
  historico: { data: string; acao: string; usuario: string }[]
  anexos: number
  comentarios: Comentario[]
  checklist: ChecklistItem[]
  origemNeural?: OrigemNeural
}

interface AtividadeExecucao {
  id: string
  nome: string
  frente: string
  progresso: number
  efetivo: number
  ritmo: "adiantado" | "normal" | "atrasado" | "paralisado"
  previsaoTermino: string
  diasRestantes: number
  responsavel: string
  ultimaAtualizacao: string
}

interface OcorrenciaDia {
  id: string
  hora: string
  tipo: "parada" | "alerta" | "info"
  descricao: string
  frente: string
  duracao?: string
}

interface NCDia {
  id: string
  descricao: string
  tipo: string
  status: "aberta" | "em_tratamento" | "fechada"
  responsavel: string
}

interface EvidenciaDia {
  id: string
  tipo: "foto" | "documento" | "rdo"
  nome: string
  data: string
  hora: string
}

interface DemandaGerada {
  id: string
  departamento: string
  assunto: string
  status: "pendente" | "concluida"
  data: string
}

const atividadesExecucao: AtividadeExecucao[] = [
  {
    id: "AT-001",
    nome: "Fundacao Bloco B",
    frente: "Obras de Arte",
    progresso: 65,
    efetivo: 32,
    ritmo: "atrasado",
    previsaoTermino: "15/01/2026",
    diasRestantes: 8,
    responsavel: "Eng. Carlos Lima",
    ultimaAtualizacao: "07/01/2026 08:30",
  },
  {
    id: "AT-002",
    nome: "Terraplenagem Norte",
    frente: "Terraplenagem",
    progresso: 92,
    efetivo: 85,
    ritmo: "adiantado",
    previsaoTermino: "09/01/2026",
    diasRestantes: 2,
    responsavel: "Eng. Pedro Costa",
    ultimaAtualizacao: "07/01/2026 09:15",
  },
  {
    id: "AT-003",
    nome: "Concretagem Pilar P12",
    frente: "Obras de Arte",
    progresso: 30,
    efetivo: 18,
    ritmo: "atrasado",
    previsaoTermino: "20/01/2026",
    diasRestantes: 13,
    responsavel: "Eng. Ana Silva",
    ultimaAtualizacao: "07/01/2026 07:45",
  },
  {
    id: "AT-004",
    nome: "Pavimentacao KM 45-48",
    frente: "Pavimentacao",
    progresso: 80,
    efetivo: 40,
    ritmo: "normal",
    previsaoTermino: "10/01/2026",
    diasRestantes: 3,
    responsavel: "Eng. Roberto Alves",
    ultimaAtualizacao: "07/01/2026 08:00",
  },
  {
    id: "AT-005",
    nome: "Drenagem Trecho Sul",
    frente: "Drenagem",
    progresso: 55,
    efetivo: 22,
    ritmo: "normal",
    previsaoTermino: "18/01/2026",
    diasRestantes: 11,
    responsavel: "Eng. Maria Santos",
    ultimaAtualizacao: "07/01/2026 09:00",
  },
]

const ocorrenciasDia: OcorrenciaDia[] = [
  {
    id: "OC-001",
    hora: "14:32",
    tipo: "parada",
    descricao: "Parada por chuva forte",
    frente: "Terraplenagem Sul",
    duracao: "45min",
  },
  {
    id: "OC-002",
    hora: "10:15",
    tipo: "alerta",
    descricao: "Equipamento CAT320 em manutencao preventiva",
    frente: "Terraplenagem Norte",
  },
]

const ncsDia: NCDia[] = [
  {
    id: "NC-089",
    descricao: "Concreto fora de especificacao - Lote 234",
    tipo: "Material",
    status: "em_tratamento",
    responsavel: "Eng. Qualidade",
  },
]

const evidenciasMock: EvidenciaDia[] = [
  { id: "EV-001", tipo: "foto", nome: "Avanco Fundacao 07-01", data: "07/01/2026", hora: "09:32" },
  { id: "EV-002", tipo: "foto", nome: "Equipe Terraplenagem", data: "07/01/2026", hora: "08:15" },
  { id: "EV-003", tipo: "rdo", nome: "RDO 06/01/2026", data: "06/01/2026", hora: "18:00" },
]

const demandasMock: DemandaGerada[] = [
  {
    id: "DM-1234",
    departamento: "Comercial",
    assunto: "Custo atualizado Fundacao B",
    status: "pendente",
    data: "06/01/2026",
  },
  {
    id: "DM-1230",
    departamento: "Planejamento",
    assunto: "Reprojetar cronograma OAE",
    status: "concluida",
    data: "05/01/2026",
  },
]

const acoes: AcaoGerencial[] = [
  {
    id: "AG-001",
    titulo: "Aprovar BM-12 para faturamento",
    descricao: "Boletim de Medicao 12 aguardando aprovacao final do GC para envio ao cliente. Valor: R$ 2.450.000,00",
    tipo: "aprovacao",
    origem: "contrato",
    status: "pendente",
    prioridade: "critica",
    responsavel: "Gerente Contrato",
    prazo: "06/01/2026",
    dataCriacao: "03/01/2026",
    historico: [
      { data: "03/01/2026", acao: "Criado pelo setor Comercial", usuario: "Ana Silva" },
      { data: "04/01/2026", acao: "Documentacao anexada", usuario: "Carlos Lima" },
    ],
    anexos: 3,
    comentarios: [
      { id: "c1", usuario: "Ana Silva", data: "04/01/2026", texto: "Documentos conferidos e OK" },
      { id: "c2", usuario: "Carlos Lima", data: "05/01/2026", texto: "Aguardando aprovacao do GC" },
    ],
    checklist: [
      { id: "ck1", texto: "Conferir valores da medicao", concluido: true },
      { id: "ck2", texto: "Validar documentacao", concluido: true },
      { id: "ck3", texto: "Aprovar faturamento", concluido: false },
    ],
    origemNeural: { tipo: "medicao", label: "BM-12 / Dez-2025", link: "/obra/comercial/medicao" },
  },
  {
    id: "AG-002",
    titulo: "Reuniao de alinhamento com Cliente DNIT",
    descricao: "Reuniao mensal de acompanhamento com representantes do DNIT. Pauta: Cronograma e Terraplenagem",
    tipo: "reuniao",
    origem: "corporativo",
    status: "pendente",
    prioridade: "alta",
    responsavel: "Gerente Contrato",
    prazo: "07/01/2026",
    dataCriacao: "02/01/2026",
    historico: [{ data: "02/01/2026", acao: "Agendada pela Diretoria", usuario: "Diretor Operacoes" }],
    anexos: 1,
    comentarios: [
      {
        id: "c1",
        usuario: "Diretor Operacoes",
        data: "02/01/2026",
        texto: "Confirmar presenca de todos os envolvidos",
      },
    ],
    checklist: [
      { id: "ck1", texto: "Preparar apresentacao", concluido: false },
      { id: "ck2", texto: "Confirmar sala", concluido: true },
      { id: "ck3", texto: "Enviar convite", concluido: true },
    ],
    origemNeural: { tipo: "governanca", label: "Reuniao Mensal Cliente", link: "/obra/gerencial/cockpit" },
  },
  {
    id: "AG-003",
    titulo: "Validar NC-2024-089 (Concreto fora de especificacao)",
    descricao: "Nao conformidade em lote de concreto do fornecedor XYZ - aguardando parecer tecnico e plano de acao",
    tipo: "auditoria",
    origem: "auditoria",
    status: "atrasado",
    prioridade: "critica",
    responsavel: "Eng. Qualidade",
    prazo: "04/01/2026",
    dataCriacao: "28/12/2025",
    historico: [
      { data: "28/12/2025", acao: "NC registrada pela Qualidade", usuario: "Maria Santos" },
      { data: "02/01/2026", acao: "Solicitado laudo laboratorio", usuario: "Joao Pereira" },
    ],
    anexos: 4,
    comentarios: [
      { id: "c1", usuario: "Maria Santos", data: "28/12/2025", texto: "Lote bloqueado para uso" },
      { id: "c2", usuario: "Joao Pereira", data: "02/01/2026", texto: "Laudo solicitado ao Lab Central" },
    ],
    checklist: [
      { id: "ck1", texto: "Registrar NC", concluido: true },
      { id: "ck2", texto: "Bloquear lote", concluido: true },
      { id: "ck3", texto: "Solicitar laudo", concluido: true },
      { id: "ck4", texto: "Elaborar plano de acao", concluido: false },
      { id: "ck5", texto: "Fechar NC", concluido: false },
    ],
    origemNeural: { tipo: "qsms", label: "NC-2024-089", link: "/obra/qsms/nao-conformidades" },
  },
  {
    id: "AG-004",
    titulo: "Liberar requisicao de pessoal RP-0234",
    descricao: "Requisicao de 5 armadores para frente de servico OAE-03. Urgente para nao atrasar cronograma.",
    tipo: "aprovacao",
    origem: "obra",
    status: "pendente",
    prioridade: "alta",
    responsavel: "Gerente Contrato",
    prazo: "08/01/2026",
    dataCriacao: "05/01/2026",
    historico: [{ data: "05/01/2026", acao: "Solicitado pelo Eng. Producao", usuario: "Pedro Costa" }],
    anexos: 1,
    comentarios: [],
    checklist: [
      { id: "ck1", texto: "Verificar disponibilidade orcamentaria", concluido: false },
      { id: "ck2", texto: "Aprovar requisicao", concluido: false },
    ],
    origemNeural: { tipo: "governanca", label: "OAE-03 / Armacao", link: "/obra/engenharia/planejamento" },
  },
  {
    id: "AG-005",
    titulo: "Revisar projecao de fluxo de caixa Q1/2026",
    descricao: "Atualizar projecao financeira para os proximos 3 meses considerando novos aditivos",
    tipo: "financeiro",
    origem: "corporativo",
    status: "em_andamento",
    prioridade: "media",
    responsavel: "Controller",
    prazo: "10/01/2026",
    dataCriacao: "04/01/2026",
    historico: [{ data: "04/01/2026", acao: "Iniciada analise", usuario: "Fernanda Lima" }],
    anexos: 2,
    comentarios: [{ id: "c1", usuario: "Fernanda Lima", data: "05/01/2026", texto: "Em elaboracao, 60% concluido" }],
    checklist: [
      { id: "ck1", texto: "Coletar dados de receita", concluido: true },
      { id: "ck2", texto: "Coletar dados de despesa", concluido: true },
      { id: "ck3", texto: "Projetar fluxo", concluido: false },
      { id: "ck4", texto: "Validar com Diretoria", concluido: false },
    ],
    origemNeural: {
      tipo: "financeiro",
      label: "Fluxo de Caixa Q1/2026",
      link: "/obra/gerencial/cockpit/visao-financeiro",
    },
  },
  {
    id: "AG-006",
    titulo: "Responder oficio DNIT 0234/2026",
    descricao: "Oficio solicitando esclarecimentos sobre cronograma de terraplenagem - Prazo legal: 5 dias uteis",
    tipo: "comunicacao",
    origem: "contrato",
    status: "pendente",
    prioridade: "alta",
    responsavel: "Gerente Contrato",
    prazo: "09/01/2026",
    dataCriacao: "05/01/2026",
    historico: [{ data: "05/01/2026", acao: "Recebido e protocolado", usuario: "Secretaria" }],
    anexos: 1,
    comentarios: [],
    checklist: [
      { id: "ck1", texto: "Analisar demanda", concluido: false },
      { id: "ck2", texto: "Elaborar resposta", concluido: false },
      { id: "ck3", texto: "Aprovar resposta", concluido: false },
      { id: "ck4", texto: "Protocolar envio", concluido: false },
    ],
  },
  {
    id: "AG-007",
    titulo: "Aprovar pedido de compra PC-1247 (Aco CA-50)",
    descricao: "Pedido de compra de aco CA-50 para OAE - Valor: R$ 847.000,00 - 3 cotacoes anexas",
    tipo: "aprovacao",
    origem: "obra",
    status: "concluido",
    prioridade: "alta",
    responsavel: "Gerente Contrato",
    prazo: "05/01/2026",
    dataCriacao: "03/01/2026",
    historico: [
      { data: "03/01/2026", acao: "Criado por Suprimentos", usuario: "Lucas Oliveira" },
      { data: "04/01/2026", acao: "Cotacoes anexadas", usuario: "Lucas Oliveira" },
      { data: "05/01/2026", acao: "Aprovado pelo GC", usuario: "Gerente Contrato" },
    ],
    anexos: 5,
    comentarios: [
      { id: "c1", usuario: "Lucas Oliveira", data: "04/01/2026", texto: "Melhor preco: Gerdau - R$ 847k" },
      { id: "c2", usuario: "Gerente Contrato", data: "05/01/2026", texto: "Aprovado. Pode prosseguir." },
    ],
    checklist: [
      { id: "ck1", texto: "Coletar cotacoes", concluido: true },
      { id: "ck2", texto: "Analisar propostas", concluido: true },
      { id: "ck3", texto: "Aprovar compra", concluido: true },
    ],
  },
  {
    id: "AG-008",
    titulo: "Atualizar cronograma executivo - Revisao 12",
    descricao: "Incorporar impactos das chuvas de dezembro e reprogramar atividades criticas de janeiro",
    tipo: "planejamento",
    origem: "obra",
    status: "em_andamento",
    prioridade: "alta",
    responsavel: "Eng. Planejamento",
    prazo: "08/01/2026",
    dataCriacao: "02/01/2026",
    historico: [
      { data: "02/01/2026", acao: "Iniciada revisao", usuario: "Roberto Alves" },
      { data: "04/01/2026", acao: "Coletados dados de campo", usuario: "Roberto Alves" },
    ],
    anexos: 2,
    comentarios: [],
    checklist: [
      { id: "ck1", texto: "Coletar dados de producao", concluido: true },
      { id: "ck2", texto: "Analisar desvios", concluido: true },
      { id: "ck3", texto: "Reprogramar atividades", concluido: false },
      { id: "ck4", texto: "Validar com producao", concluido: false },
    ],
    origemNeural: { tipo: "kpi", label: "SPI: 0.92 / CPI: 0.98", link: "/obra/gerencial/indicadores" },
  },
  {
    id: "AG-009",
    titulo: "Cobranca medicao pendente - Nov/2025",
    descricao: "Medicao de novembro ainda nao paga pelo cliente. Valor: R$ 1.890.000,00 - Vencida ha 15 dias",
    tipo: "cobranca",
    origem: "contrato",
    status: "atrasado",
    prioridade: "critica",
    responsavel: "Gerente Contrato",
    prazo: "20/12/2025",
    dataCriacao: "15/12/2025",
    historico: [
      { data: "15/12/2025", acao: "Enviada cobranca inicial", usuario: "Financeiro" },
      { data: "28/12/2025", acao: "Segunda cobranca enviada", usuario: "Financeiro" },
      { data: "03/01/2026", acao: "Escalado para GC", usuario: "Controller" },
    ],
    anexos: 3,
    comentarios: [
      {
        id: "c1",
        usuario: "Controller",
        data: "03/01/2026",
        texto: "Cliente alega problema de fluxo. Negociar prazo.",
      },
    ],
    checklist: [
      { id: "ck1", texto: "Enviar cobranca", concluido: true },
      { id: "ck2", texto: "Contatar cliente", concluido: true },
      { id: "ck3", texto: "Negociar pagamento", concluido: false },
      { id: "ck4", texto: "Receber valores", concluido: false },
    ],
    origemNeural: { tipo: "financeiro", label: "Contas a Receber", link: "/obra/gerencial/cockpit/visao-financeiro" },
  },
  {
    id: "AG-010",
    titulo: "Auditoria interna de seguranca - Janeiro",
    descricao: "Auditoria programada de SSMA para verificacao de conformidade com NRs e procedimentos internos",
    tipo: "auditoria",
    origem: "auditoria",
    status: "pendente",
    prioridade: "media",
    responsavel: "Eng. Seguranca",
    prazo: "15/01/2026",
    dataCriacao: "02/01/2026",
    historico: [{ data: "02/01/2026", acao: "Auditoria programada", usuario: "QSMS" }],
    anexos: 1,
    comentarios: [],
    checklist: [
      { id: "ck1", texto: "Preparar documentacao", concluido: false },
      { id: "ck2", texto: "Realizar auditoria", concluido: false },
      { id: "ck3", texto: "Elaborar relatorio", concluido: false },
    ],
    origemNeural: { tipo: "qsms", label: "Auditoria SSMA Jan/26", link: "/obra/qsms/auditorias" },
  },
]

const tipoConfig: Record<Tipo, { label: string; color: string }> = {
  reuniao: { label: "Reuniao", color: "bg-info/10 text-info border-info/20" },
  cobranca: { label: "Cobranca", color: "bg-warning/10 text-warning border-warning/20" },
  aprovacao: { label: "Aprovacao", color: "bg-success/10 text-success border-success/20" },
  auditoria: { label: "Auditoria", color: "bg-destructive/10 text-destructive border-destructive/20" },
  comunicacao: { label: "Comunicacao", color: "bg-primary/10 text-primary border-primary/20" },
  planejamento: { label: "Planejamento", color: "bg-accent text-accent-foreground border-accent" },
  financeiro: { label: "Financeiro", color: "bg-warning/10 text-warning border-warning/20" },
}

const origemConfig: Record<Origem, { label: string; color: string; icon: typeof FileText }> = {
  contrato: { label: "Contrato", color: "bg-info/10 text-info border-info/20", icon: FileText },
  obra: { label: "Obra", color: "bg-warning/10 text-warning border-warning/20", icon: Building2 },
  corporativo: { label: "Corporativo", color: "bg-primary/10 text-primary border-primary/20", icon: Users },
  auditoria: {
    label: "Auditoria",
    color: "bg-destructive/10 text-destructive border-destructive/20",
    icon: AlertTriangle,
  },
}

const statusConfig: Record<Status, { label: string; color: string; icon: typeof Circle }> = {
  pendente: { label: "Pendente", color: "text-warning bg-warning/10", icon: Circle },
  em_andamento: { label: "Em Andamento", color: "text-info bg-info/10", icon: Clock },
  concluido: { label: "Concluido", color: "text-success bg-success/10", icon: CheckCircle2 },
  atrasado: { label: "Atrasado", color: "text-destructive bg-destructive/10", icon: AlertTriangle },
}

const prioridadeConfig: Record<Prioridade, { label: string; color: string }> = {
  critica: { label: "Critica", color: "bg-destructive text-destructive-foreground border-destructive" },
  alta: { label: "Alta", color: "bg-warning/10 text-warning border-warning/30" },
  media: { label: "Media", color: "bg-muted text-muted-foreground border-muted" },
  baixa: { label: "Baixa", color: "bg-secondary text-secondary-foreground border-secondary" },
}

const origemNeuralConfig: Record<string, { icon: typeof Gauge; color: string }> = {
  kpi: { icon: Gauge, color: "text-info" },
  medicao: { icon: FileCheck, color: "text-success" },
  change_control: { icon: FileText, color: "text-primary" },
  qsms: { icon: Shield, color: "text-destructive" },
  governanca: { icon: Target, color: "text-warning" },
  financeiro: { icon: BarChart3, color: "text-warning" },
}

export default function AgendaGerencialPage() {
  const [selectedAcao, setSelectedAcao] = useState<AcaoGerencial | null>(null)
  const [visaoTemporal, setVisaoTemporal] = useState<"dia" | "semana" | "mes">("semana")
  const [filtroOrigem, setFiltroOrigem] = useState<Origem | "todos">("todos")
  const [filtroStatus, setFiltroStatus] = useState<Status | "todos">("todos")
  const [novoComentario, setNovoComentario] = useState("")
  const [modoVisualizacao, setModoVisualizacao] = useState<"lista" | "calendario" | "graficos" | "painel">("lista")
  const [selectedDay, setSelectedDay] = useState<number | null>(null)
  const [mesCalendario, setMesCalendario] = useState({ mes: 0, ano: 2026 })
  const [dataAtual, setDataAtual] = useState(new Date()) // Added dataAtual

  const [dataPainel, setDataPainel] = useState("07/01/2026")
  const [selectedAtividade, setSelectedAtividade] = useState<AtividadeExecucao | null>(null)
  const [showDemandaDialog, setShowDemandaDialog] = useState(false)
  const [showEvidenciaDialog, setShowEvidenciaDialog] = useState(false)
  const [showPADialog, setShowPADialog] = useState(false)
  const [showNCDialog, setShowNCDialog] = useState(false)
  const [demandaDepartamento, setDemandaDepartamento] = useState("")
  const [demandaAssunto, setDemandaAssunto] = useState("")
  // const [searchTerm, setSearchTerm] = useState("") // Added searchTerm and setSearchTerm - REMOVED
  const [showCalendarOptions, setShowCalendarOptions] = useState(false) // Added showCalendarOptions

  const acoesFiltradas = acoes.filter((acao) => {
    if (filtroOrigem !== "todos" && acao.origem !== filtroOrigem) return false
    if (filtroStatus !== "todos" && acao.status !== filtroStatus) return false
    // Add search term filtering
    // if (searchTerm && !acao.titulo.toLowerCase().includes(searchTerm.toLowerCase())) return false // REMOVED
    return true
  })

  const contadores = {
    pendentes: acoes.filter((a) => a.status === "pendente").length,
    atrasadas: acoes.filter((a) => a.status === "atrasado").length,
    criticas: acoes.filter((a) => a.prioridade === "critica").length,
    semResponsavel: acoes.filter((a) => !a.responsavel || a.responsavel === "").length,
    eventosHoje: acoes.filter((a) => a.prazo === "07/01/2026").length,
    emAndamento: acoes.filter((a) => a.status === "em_andamento").length,
    concluidas: acoes.filter((a) => a.status === "concluido").length,
    naoIniciadas: acoes.filter((a) => a.status === "pendente" && a.checklist.every((c) => !c.concluido)).length,
    total: acoes.length,
  }

  const tendencias = {
    pendentes: -12,
    atrasadas: +8,
    criticas: +2,
  }

  const contadoresPainel = {
    efetivo: atividadesExecucao.reduce((acc, a) => acc + a.efetivo, 0),
    atividades: atividadesExecucao.length,
    atrasadas: atividadesExecucao.filter((a) => a.ritmo === "atrasado").length,
    ocorrencias: ocorrenciasDia.length,
    ncs: ncsDia.filter((nc) => nc.status !== "fechada").length,
  }

  const getDiasNoMes = (mes: number, ano: number) => {
    return new Date(ano, mes + 1, 0).getDate()
  }

  const getPrimeiroDiaSemana = (mes: number, ano: number) => {
    return new Date(ano, mes, 1).getDay()
  }

  const diasSemana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"]
  const mesesNomes = [
    "Janeiro",
    "Fevereiro",
    "Marco",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ]

  const getAcoesPorDia = (dia: number) => {
    const diaStr = dia.toString().padStart(2, "0")
    const mesStr = (mesCalendario.mes + 1).toString().padStart(2, "0")
    const dataStr = `${diaStr}/${mesStr}/${mesCalendario.ano}`
    return acoes.filter((a) => a.prazo === dataStr)
  }

  const renderCalendario = () => {
    const diasNoMes = getDiasNoMes(mesCalendario.mes, mesCalendario.ano)
    const primeiroDia = getPrimeiroDiaSemana(mesCalendario.mes, mesCalendario.ano)
    const dias = []

    for (let i = 0; i < primeiroDia; i++) {
      dias.push(<div key={`empty-${i}`} className="h-24 bg-muted/20 rounded" />)
    }

    for (let dia = 1; dia <= diasNoMes; dia++) {
      const acoesDia = getAcoesPorDia(dia)
      const isHoje =
        dia === dataAtual.getDate() &&
        mesCalendario.mes === dataAtual.getMonth() &&
        mesCalendario.ano === dataAtual.getFullYear() // Updated isHoje check
      const isSelected = selectedDay === dia

      dias.push(
        <div
          key={dia}
          onClick={() => setSelectedDay(dia === selectedDay ? null : dia)}
          className={`h-24 p-1.5 rounded border cursor-pointer transition-all ${
            isHoje ? "border-primary bg-primary/5" : "border-border/30 hover:border-border"
          } ${isSelected ? "ring-2 ring-primary" : ""}`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className={`text-xs font-medium ${isHoje ? "text-primary" : "text-muted-foreground"}`}>{dia}</span>
            {acoesDia.length > 0 && (
              <Badge variant="secondary" className="text-[9px] h-4 px-1">
                {acoesDia.length}
              </Badge>
            )}
          </div>
          <div className="space-y-0.5 overflow-hidden">
            {acoesDia.slice(0, 3).map((acao) => (
              <div
                key={acao.id}
                className={`text-[9px] px-1 py-0.5 rounded truncate ${
                  acao.status === "atrasado"
                    ? "bg-red-500/20 text-red-700"
                    : acao.status === "concluido"
                      ? "bg-green-500/20 text-green-700"
                      : acao.status === "em_andamento"
                        ? "bg-blue-500/20 text-blue-700"
                        : "bg-yellow-500/20 text-yellow-700"
                }`}
              >
                {acao.titulo.substring(0, 18)}...
              </div>
            ))}
            {acoesDia.length > 3 && (
              <span className="text-[9px] text-muted-foreground">+{acoesDia.length - 3} mais</span>
            )}
          </div>
        </div>,
      )
    }

    return dias
  }

  const dadosStatusPizza = [
    { name: "Pendentes", value: contadores.pendentes, color: "var(--warning)" },
    { name: "Em Andamento", value: contadores.emAndamento, color: "var(--info)" },
    { name: "Atrasadas", value: contadores.atrasadas, color: "var(--destructive)" },
    { name: "Concluidas", value: contadores.concluidas, color: "var(--success)" },
  ]

  const dadosPorResponsavel = [
    { name: "Gerente Contrato", total: 5, concluidas: 1, pendentes: 3, atrasadas: 1 },
    { name: "Eng. Qualidade", total: 1, concluidas: 0, pendentes: 0, atrasadas: 1 },
    { name: "Controller", total: 1, concluidas: 0, pendentes: 1, atrasadas: 0 },
    { name: "Eng. Planejamento", total: 1, concluidas: 0, pendentes: 1, atrasadas: 0 },
    { name: "Eng. Seguranca", total: 1, concluidas: 0, pendentes: 1, atrasadas: 0 },
  ]

  const dadosEvolucaoSemanal = [
    { semana: "Sem 1", criadas: 8, concluidas: 3, atrasadas: 1 },
    { semana: "Sem 2", criadas: 5, concluidas: 4, atrasadas: 2 },
    { semana: "Sem 3", criadas: 7, concluidas: 5, atrasadas: 1 },
    { semana: "Sem 4", criadas: 10, concluidas: 6, atrasadas: 2 },
  ]

  const dadosPorTipo = [
    { tipo: "Aprovacao", qtd: 3 },
    { tipo: "Reuniao", qtd: 1 },
    { tipo: "Auditoria", qtd: 2 },
    { tipo: "Cobranca", qtd: 1 },
    { tipo: "Financeiro", qtd: 1 },
    { tipo: "Planejamento", qtd: 1 },
    { tipo: "Comunicacao", qtd: 1 },
  ]

  const renderPainelDia = () => (
    <div className="flex-1 flex flex-col gap-4 overflow-auto">
      {/* Condicoes Climaticas */}
      <Card className="flex-shrink-0">
        <CardContent className="p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Sun className="h-6 w-6 text-yellow-500" />
                <div>
                  <span className="text-sm font-medium">Ensolarado</span>
                  <p className="text-[10px] text-muted-foreground">Parcialmente nublado a tarde</p>
                </div>
              </div>
              <div className="h-8 w-px bg-border/50" />
              <div className="flex items-center gap-1">
                <Thermometer className="h-4 w-4 text-orange-500" />
                <span className="text-sm font-medium">28°C</span>
              </div>
              <div className="flex items-center gap-1">
                <Wind className="h-4 w-4 text-blue-500" />
                <span className="text-sm">12 km/h</span>
              </div>
              <div className="flex items-center gap-1">
                <Cloud className="h-4 w-4 text-gray-500" />
                <span className="text-sm">Umidade: 65%</span>
              </div>
            </div>
            <Badge variant="outline" className="text-green-600 border-green-500/30 bg-green-500/10">
              Impacto: Nenhum
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Cards de Resumo do Dia */}
      <div className="grid grid-cols-5 gap-3 flex-shrink-0">
        <Card className="border-info/30 bg-info/5">
          <CardContent className="p-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Efetivo</span>
              <HardHat className="h-4 w-4 text-info" />
            </div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-bold text-info">{contadoresPainel.efetivo}</span>
              <span className="text-xs text-muted-foreground">colaboradores</span>
            </div>
            <div className="flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3 text-success" />
              <span className="text-[10px] text-success">+5% vs ontem</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-success/30 bg-success/5">
          <CardContent className="p-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Atividades</span>
              <Play className="h-4 w-4 text-success" />
            </div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-bold text-success">{contadoresPainel.atividades}</span>
              <span className="text-xs text-muted-foreground">em execucao</span>
            </div>
            <div className="text-[10px] text-muted-foreground mt-1">3 proximas de concluir</div>
          </CardContent>
        </Card>

        <Card className="border-destructive/30 bg-destructive/5">
          <CardContent className="p-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Atrasadas</span>
              <AlertTriangle className="h-4 w-4 text-destructive" />
            </div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-bold text-destructive">{contadoresPainel.atrasadas}</span>
              <span className="text-xs text-muted-foreground">atividades</span>
            </div>
            <div className="text-[10px] text-destructive mt-1">Requer atencao</div>
          </CardContent>
        </Card>

        <Card className="border-warning/30 bg-warning/5">
          <CardContent className="p-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Ocorrencias</span>
              <AlertCircle className="h-4 w-4 text-warning" />
            </div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-bold text-warning">{contadoresPainel.ocorrencias}</span>
              <span className="text-xs text-muted-foreground">hoje</span>
            </div>
            <div className="text-[10px] text-muted-foreground mt-1">1 parada registrada</div>
          </CardContent>
        </Card>

        <Card className="border-warning/30 bg-warning/5">
          <CardContent className="p-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">NCs Abertas</span>
              <Shield className="h-4 w-4 text-warning" />
            </div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-bold text-warning">{contadoresPainel.ncs}</span>
              <span className="text-xs text-muted-foreground">pendentes</span>
            </div>
            <div className="text-[10px] text-muted-foreground mt-1">1 em tratamento</div>
          </CardContent>
        </Card>
      </div>

      {/* Atividades em Execucao e Painel Lateral */}
      <div className="flex-1 flex gap-4 min-h-0">
        <div className="flex-1 flex flex-col min-h-0">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold flex items-center gap-2">
              <Play className="h-4 w-4 text-primary" />
              Atividades em Execucao
            </h3>
            <Button variant="outline" size="sm" className="h-7 text-xs bg-transparent" asChild>
              <a href="/obra/producao/rdo" target="_blank" rel="noreferrer">
                <ExternalLink className="h-3 w-3 mr-1" />
                Ver RDO Completo
              </a>
            </Button>
          </div>

          <ScrollArea className="flex-1">
            <div className="grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2 pr-2">
              {atividadesExecucao.map((atividade) => (
                <Card
                  key={atividade.id}
                  onClick={() => setSelectedAtividade(atividade.id === selectedAtividade?.id ? null : atividade)}
                  className={`cursor-pointer transition-all hover:border-primary/50 hover:shadow-lg hover:scale-[1.02] ${
                    selectedAtividade?.id === atividade.id ? "ring-2 ring-primary border-primary bg-primary/5" : ""
                  } ${atividade.ritmo === "atrasado" ? "border-destructive/40" : ""} ${atividade.ritmo === "paralisado" ? "border-warning/40" : ""}`}
                >
                  <CardContent className="p-2">
                    {/* Grafico Circular em Destaque Total */}
                    <div className="flex justify-center py-2">
                      <CircularProgress value={atividade.progresso} size={72} strokeWidth={6} />
                    </div>

                    {/* Nome da Atividade - Compacto */}
                    <h4 className="text-xs font-semibold text-center truncate mb-1.5" title={atividade.nome}>
                      {atividade.nome}
                    </h4>

                    {/* Status Badge Centralizado */}
                    <div className="flex justify-center mb-1.5">
                      <Badge
                        variant="outline"
                        className={`text-[8px] px-1.5 py-0 h-4 ${
                          atividade.ritmo === "adiantado"
                            ? "text-success border-success/50 bg-success/10"
                            : atividade.ritmo === "atrasado"
                              ? "text-destructive border-destructive/50 bg-destructive/10"
                              : atividade.ritmo === "paralisado"
                                ? "text-warning border-warning/50 bg-warning/10"
                                : "text-info border-info/50 bg-info/10"
                        }`}
                      >
                        {atividade.ritmo === "adiantado"
                          ? "Adiantado"
                          : atividade.ritmo === "atrasado"
                            ? "Atrasado"
                            : atividade.ritmo === "paralisado"
                              ? "Paralisado"
                              : "No Prazo"}
                      </Badge>
                    </div>

                    {/* Info Compacta - Icones + Dados */}
                    <div className="flex items-center justify-center gap-3 text-[9px] text-muted-foreground border-t pt-1.5">
                      <div className="flex items-center gap-0.5" title="Colaboradores">
                        <HardHat className="h-2.5 w-2.5" />
                        <span className="font-medium">{atividade.efetivo}</span>
                      </div>
                      <div className="flex items-center gap-0.5" title={`Termino: ${atividade.previsaoTermino}`}>
                        <Clock className="h-2.5 w-2.5" />
                        <span className="font-medium">{atividade.diasRestantes}d</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Painel Lateral - Detalhes da Atividade */}
        {selectedAtividade && (
          <Card className="w-[380px] flex-shrink-0 flex flex-col">
            <CardHeader className="p-3 pb-2 border-b border-border/50">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-semibold">{selectedAtividade.nome}</CardTitle>
                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setSelectedAtividade(null)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline" className="text-[10px]">
                  {selectedAtividade.frente}
                </Badge>
                <Badge variant="outline" className="text-[10px]">
                  {selectedAtividade.id}
                </Badge>
              </div>
            </CardHeader>

            <ScrollArea className="flex-1">
              <CardContent className="p-3 space-y-4">
                {/* Informacoes */}
                <div className="space-y-2">
                  <h4 className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">Informacoes</h4>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2 bg-muted/30 rounded">
                      <span className="text-muted-foreground">Progresso</span>
                      <p className="font-medium">{selectedAtividade.progresso}%</p>
                    </div>
                    <div className="p-2 bg-muted/30 rounded">
                      <span className="text-muted-foreground">Efetivo</span>
                      <p className="font-medium">{selectedAtividade.efetivo} pessoas</p>
                    </div>
                    <div className="p-2 bg-muted/30 rounded">
                      <span className="text-muted-foreground">Previsao Termino</span>
                      <p className="font-medium">{selectedAtividade.previsaoTermino}</p>
                    </div>
                    <div className="p-2 bg-muted/30 rounded">
                      <span className="text-muted-foreground">Dias Restantes</span>
                      <p className="font-medium">{selectedAtividade.diasRestantes} dias</p>
                    </div>
                  </div>
                  <div className="p-2 bg-muted/30 rounded text-xs">
                    <span className="text-muted-foreground">Responsavel</span>
                    <p className="font-medium">{selectedAtividade.responsavel}</p>
                  </div>
                </div>

                {/* Acoes Disponiveis */}
                <div className="space-y-2">
                  <h4 className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">
                    Acoes Disponiveis
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 text-xs justify-start bg-transparent"
                      onClick={() => setShowEvidenciaDialog(true)}
                    >
                      <Camera className="h-3 w-3 mr-1.5" />
                      Solicitar Evidencias
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 text-xs justify-start bg-transparent"
                      onClick={() => setShowPADialog(true)}
                    >
                      <ClipboardList className="h-3 w-3 mr-1.5" />
                      Abrir Plano de Acao
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 text-xs justify-start bg-transparent"
                      onClick={() => setShowDemandaDialog(true)}
                    >
                      <Send className="h-3 w-3 mr-1.5" />
                      Gerar Demanda
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 text-xs justify-start text-destructive bg-transparent"
                      onClick={() => setShowNCDialog(true)}
                    >
                      <AlertTriangle className="h-3 w-3 mr-1.5" />
                      Registrar NC
                    </Button>
                  </div>
                </div>

                {/* Evidencias Existentes */}
                <div className="space-y-2">
                  <h4 className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">
                    Evidencias Existentes
                  </h4>
                  <div className="space-y-1">
                    {evidenciasMock.map((ev) => (
                      <div
                        key={ev.id}
                        className="flex items-center justify-between p-2 bg-muted/30 rounded text-xs hover:bg-muted/50 cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          {ev.tipo === "foto" ? (
                            <FileImage className="h-3.5 w-3.5 text-info" />
                          ) : ev.tipo === "rdo" ? (
                            <FileText className="h-3.5 w-3.5 text-warning" />
                          ) : (
                            <FileText className="h-3.5 w-3.5 text-muted-foreground" />
                          )}
                          <span>{ev.nome}</span>
                        </div>
                        <span className="text-[10px] text-muted-foreground">{ev.hora}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Demandas Geradas */}
                <div className="space-y-2">
                  <h4 className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">
                    Demandas Geradas
                  </h4>
                  <div className="space-y-1">
                    {demandasMock.map((dm) => (
                      <div key={dm.id} className="flex items-center justify-between p-2 bg-muted/30 rounded text-xs">
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="outline"
                            className={`text-[9px] ${dm.status === "concluida" ? "text-success border-success/30" : "text-warning border-warning/30"}`}
                          >
                            {dm.status === "concluida" ? "Concluida" : "Pendente"}
                          </Badge>
                          <span className="font-medium">{dm.departamento}</span>
                        </div>
                        <span className="text-[10px] text-muted-foreground">{dm.id}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </ScrollArea>
          </Card>
        )}
      </div>

      {/* Ocorrencias e NCs */}
      <div className="grid grid-cols-2 gap-4 flex-shrink-0">
        <Card>
          <CardHeader className="p-3 pb-2">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-warning" />
              Ocorrencias do Dia
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 pt-0">
            {ocorrenciasDia.length === 0 ? (
              <p className="text-xs text-muted-foreground">Nenhuma ocorrencia registrada hoje.</p>
            ) : (
              <div className="space-y-2">
                {ocorrenciasDia.map((oc) => (
                  <div
                    key={oc.id}
                    className={`p-2 rounded border text-xs ${
                      oc.tipo === "parada"
                        ? "border-destructive/30 bg-destructive/5"
                        : oc.tipo === "alerta"
                          ? "border-warning/30 bg-warning/5"
                          : "border-info/30 bg-info/5"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium">{oc.hora}</span>
                      <Badge variant="outline" className="text-[9px]">
                        {oc.frente}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground">{oc.descricao}</p>
                    {oc.duracao && <p className="text-[10px] mt-1">Duracao: {oc.duracao}</p>}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="p-3 pb-2">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <Shield className="h-4 w-4 text-warning" />
              NCs Abertas
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 pt-0">
            {ncsDia.length === 0 ? (
              <p className="text-xs text-muted-foreground">Nenhuma NC aberta.</p>
            ) : (
              <div className="space-y-2">
                {ncsDia.map((nc) => (
                  <div key={nc.id} className="p-2 rounded border border-warning/30 bg-warning/5 text-xs">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium">{nc.id}</span>
                      <Badge
                        variant="outline"
                        className={`text-[9px] ${nc.status === "em_tratamento" ? "text-warning border-warning/30" : "text-destructive border-destructive/30"}`}
                      >
                        {nc.status === "em_tratamento" ? "Em Tratamento" : "Aberta"}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground">{nc.descricao}</p>
                    <p className="text-[10px] mt-1">Responsavel: {nc.responsavel}</p>
                  </div>
                ))}
              </div>
            )}
            <Button variant="outline" size="sm" className="w-full mt-2 h-7 text-xs bg-transparent">
              <Plus className="h-3 w-3 mr-1" />
              Registrar NC
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Dialog Gerar Demanda */}
      <Dialog open={showDemandaDialog} onOpenChange={setShowDemandaDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Gerar Demanda</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Departamento</Label>
              <Select value={demandaDepartamento} onValueChange={setDemandaDepartamento}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o departamento" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="comercial">Comercial - Quanto ja custou?</SelectItem>
                  <SelectItem value="planejamento">Planejamento - Previsao de termino?</SelectItem>
                  <SelectItem value="producao">Producao - Por que esta improdutivo?</SelectItem>
                  <SelectItem value="qsms">QSMS - Verificar condicoes de seguranca</SelectItem>
                  <SelectItem value="engenharia">Engenharia - Suporte tecnico</SelectItem>
                  <SelectItem value="administrativo">Administrativo - Recursos/RH</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Assunto / Solicitacao</Label>
              <Textarea
                placeholder="Descreva sua solicitacao..."
                value={demandaAssunto}
                onChange={(e) => setDemandaAssunto(e.target.value)}
              />
            </div>
            <div className="p-3 bg-muted/30 rounded text-xs">
              <p className="font-medium mb-1">Atividade vinculada:</p>
              <p className="text-muted-foreground">{selectedAtividade?.nome}</p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDemandaDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={() => setShowDemandaDialog(false)}>
              <Send className="h-4 w-4 mr-1" />
              Enviar Demanda
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog Solicitar Evidencias */}
      <Dialog open={showEvidenciaDialog} onOpenChange={setShowEvidenciaDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Solicitar Evidencias</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Tipo de Evidencia</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="foto">Fotos do local</SelectItem>
                  <SelectItem value="video">Video da execucao</SelectItem>
                  <SelectItem value="documento">Documento/Relatorio</SelectItem>
                  <SelectItem value="medicao">Registro de medicao</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Descricao da solicitacao</Label>
              <Textarea placeholder="Descreva o que precisa ser registrado..." />
            </div>
            <div className="space-y-2">
              <Label>Responsavel</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o responsavel" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="encarregado">Encarregado da frente</SelectItem>
                  <SelectItem value="engenheiro">Engenheiro responsavel</SelectItem>
                  <SelectItem value="qualidade">Equipe de Qualidade</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEvidenciaDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={() => setShowEvidenciaDialog(false)}>
              <Camera className="h-4 w-4 mr-1" />
              Solicitar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog Abrir PA */}
      <Dialog open={showPADialog} onOpenChange={setShowPADialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Abrir Plano de Acao</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Titulo do Plano de Acao</Label>
              <Input placeholder="Ex: Recuperar atraso na Fundacao Bloco B" />
            </div>
            <div className="space-y-2">
              <Label>Descricao do problema</Label>
              <Textarea placeholder="Descreva o problema identificado..." />
            </div>
            <div className="space-y-2">
              <Label>Responsavel pela execucao</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o responsavel" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="producao">Eng. Producao</SelectItem>
                  <SelectItem value="planejamento">Eng. Planejamento</SelectItem>
                  <SelectItem value="qualidade">Eng. Qualidade</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Prazo para conclusao</Label>
              <Input type="date" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPADialog(false)}>
              Cancelar
            </Button>
            <Button onClick={() => setShowPADialog(false)}>
              <FilePlus className="h-4 w-4 mr-1" />
              Criar Plano de Acao
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog Registrar NC */}
      <Dialog open={showNCDialog} onOpenChange={setShowNCDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Registrar Nao Conformidade</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Tipo de NC</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="material">Material fora de especificacao</SelectItem>
                  <SelectItem value="execucao">Execucao inadequada</SelectItem>
                  <SelectItem value="seguranca">Desvio de seguranca</SelectItem>
                  <SelectItem value="processo">Processo nao seguido</SelectItem>
                  <SelectItem value="documentacao">Documentacao incorreta</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Descricao da NC</Label>
              <Textarea placeholder="Descreva a nao conformidade identificada..." />
            </div>
            <div className="space-y-2">
              <Label>Local/Frente</Label>
              <Input placeholder="Ex: Fundacao Bloco B" defaultValue={selectedAtividade?.nome} />
            </div>
            <div className="space-y-2">
              <Label>Responsavel pelo tratamento</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o responsavel" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="qualidade">Eng. Qualidade</SelectItem>
                  <SelectItem value="producao">Eng. Producao</SelectItem>
                  <SelectItem value="seguranca">Tec. Seguranca</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNCDialog(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={() => setShowNCDialog(false)}>
              <AlertTriangle className="h-4 w-4 mr-1" />
              Registrar NC
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )

  const getDataLabel = () => {
    if (modoVisualizacao === "calendario" || visaoTemporal === "mes") {
      return `${mesesNomes[mesCalendario.mes]} ${mesCalendario.ano}`
    }
    if (modoVisualizacao === "painel") {
      return dataPainel
    }
    // Lista e Graficos
    if (visaoTemporal === "dia") {
      const dia = dataAtual.getDate().toString().padStart(2, "0")
      const mes = mesesNomes[dataAtual.getMonth()]
      const ano = dataAtual.getFullYear()
      return `${dia} ${mes} ${ano}`
    }
    if (visaoTemporal === "semana") {
      const startOfWeek = new Date(dataAtual)
      startOfWeek.setDate(dataAtual.getDay()) // Sunday
      const endOfWeek = new Date(dataAtual)
      endOfWeek.setDate(dataAtual.getDate() + (6 - dataAtual.getDay())) // Saturday

      const formatDay = (date: Date) => date.getDate().toString().padStart(2, "0")
      const formatMonth = (date: Date) => mesesNomes[date.getMonth()]

      return `${formatDay(startOfWeek)} ${formatMonth(startOfWeek)} - ${formatDay(endOfWeek)} ${formatMonth(endOfWeek)}`
    }
    return `${mesesNomes[mesCalendario.mes]} ${mesCalendario.ano}`
  }

  const navegarData = (direcao: "anterior" | "proximo") => {
    if (modoVisualizacao === "calendario" || visaoTemporal === "mes") {
      setMesCalendario((prev) => {
        if (direcao === "anterior") {
          return { mes: prev.mes === 0 ? 11 : prev.mes - 1, ano: prev.mes === 0 ? prev.ano - 1 : prev.ano }
        }
        return { mes: prev.mes === 11 ? 0 : prev.mes + 1, ano: prev.mes === 11 ? prev.ano + 1 : prev.ano }
      })
    } else if (visaoTemporal === "dia" || visaoTemporal === "semana") {
      setDataAtual((prevDate) => {
        const newDate = new Date(prevDate)
        if (direcao === "anterior") {
          newDate.setDate(newDate.getDate() - (visaoTemporal === "dia" ? 1 : 7))
        } else {
          newDate.setDate(newDate.getDate() + (visaoTemporal === "dia" ? 1 : 7))
        }
        return newDate
      })
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border/50 bg-card">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            <h1 className="text-lg font-semibold">Agenda Gerencial</h1>
            <Badge variant="outline" className="text-xs">
              GC-02
            </Badge>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs text-xs">
                    Centraliza todas as acoes gerenciais: reunioes, cobrancas, aprovacoes, auditorias, comunicacoes,
                    planejamento e financeiro. Inclui Painel do Dia para visao em tempo real da obra.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="h-4 w-px bg-border/50" />
          <span className="text-sm text-muted-foreground">BR-101 LOTE 2</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center border border-border/50 rounded-lg p-1">
            <Button
              variant={modoVisualizacao === "lista" ? "secondary" : "ghost"}
              size="sm"
              className="h-7 text-xs gap-1"
              onClick={() => setModoVisualizacao("lista")}
            >
              <List className="h-3.5 w-3.5" />
              Lista
            </Button>
            <Button
              variant={modoVisualizacao === "calendario" ? "secondary" : "ghost"}
              size="sm"
              className="h-7 text-xs gap-1"
              onClick={() => setModoVisualizacao("calendario")}
            >
              <Calendar className="h-3.5 w-3.5" />
              Calendario
            </Button>
            <Button
              variant={modoVisualizacao === "graficos" ? "secondary" : "ghost"}
              size="sm"
              className="h-7 text-xs gap-1"
              onClick={() => setModoVisualizacao("graficos")}
            >
              <PieChart className="h-3.5 w-3.5" />
              Graficos
            </Button>
            <Button
              variant={modoVisualizacao === "painel" ? "secondary" : "ghost"}
              size="sm"
              className="h-7 text-xs gap-1"
              onClick={() => setModoVisualizacao("painel")}
            >
              <Eye className="h-3.5 w-3.5" />
              Painel do Dia
            </Button>
          </div>

          <div className="relative">
            <Button
              variant="outline"
              size="sm"
              className="h-8 text-xs gap-1.5 px-2 bg-transparent"
              onClick={() => setShowCalendarOptions(!showCalendarOptions)}
            >
              <ChevronLeft
                className="h-3.5 w-3.5 cursor-pointer hover:text-primary"
                onClick={(e) => {
                  e.stopPropagation()
                  navegarData("anterior")
                }}
              />
              <span className="font-medium min-w-[70px] text-center">{getDataLabel()}</span>
              <ChevronRight
                className="h-3.5 w-3.5 cursor-pointer hover:text-primary"
                onClick={(e) => {
                  e.stopPropagation()
                  navegarData("proximo")
                }}
              />
              <ChevronDown className={`h-3 w-3 ml-1 transition-transform ${showCalendarOptions ? "rotate-180" : ""}`} />
            </Button>

            {showCalendarOptions && (
              <div className="absolute top-full right-0 mt-1 bg-card border border-border rounded-lg shadow-lg p-2 z-50 min-w-[140px]">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] text-muted-foreground px-2 pb-1 border-b border-border/50">
                    Visualizar por
                  </span>
                  <Button
                    variant={visaoTemporal === "dia" ? "secondary" : "ghost"}
                    size="sm"
                    className="h-7 text-xs justify-start"
                    onClick={() => {
                      setVisaoTemporal("dia")
                      setShowCalendarOptions(false)
                    }}
                  >
                    Dia
                  </Button>
                  <Button
                    variant={visaoTemporal === "semana" ? "secondary" : "ghost"}
                    size="sm"
                    className="h-7 text-xs justify-start"
                    onClick={() => {
                      setVisaoTemporal("semana")
                      setShowCalendarOptions(false)
                    }}
                  >
                    Semana
                  </Button>
                  <Button
                    variant={visaoTemporal === "mes" ? "secondary" : "ghost"}
                    size="sm"
                    className="h-7 text-xs justify-start"
                    onClick={() => {
                      setVisaoTemporal("mes")
                      setShowCalendarOptions(false)
                    }}
                  >
                    Mes
                  </Button>
                  <div className="border-t border-border/50 pt-1 mt-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 text-xs justify-start w-full"
                      onClick={() => {
                        setDataAtual(new Date())
                        setMesCalendario({ mes: new Date().getMonth(), ano: new Date().getFullYear() })
                        setShowCalendarOptions(false)
                      }}
                    >
                      Hoje
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* Fim card calendario compacto */}

          <Button size="sm" className="h-8 text-xs gap-1">
            <Plus className="h-3.5 w-3.5" />
            Criar Acao
          </Button>
        </div>
      </div>

      {/* Conteudo principal */}
      {modoVisualizacao === "painel" ? (
        <div className="flex-1 mt-4 overflow-hidden">{renderPainelDia()}</div>
      ) : (
        <>
          {/* Cards de resumo - mostrar para lista, calendario e graficos */}
          <div className="grid grid-cols-5 gap-3 py-4 flex-shrink-0">
            <Card className="border-warning/30 bg-warning/5">
              <CardContent className="p-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Pendentes</span>
                  <Circle className="h-4 w-4 text-warning fill-warning" />
                </div>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-2xl font-bold text-warning">{contadores.pendentes}</span>
                  <span className="text-xs text-muted-foreground">acoes</span>
                </div>
                <div className="flex items-center gap-1 mt-1">
                  {tendencias.pendentes < 0 ? (
                    <TrendingDown className="h-3 w-3 text-success" />
                  ) : (
                    <TrendingUp className="h-3 w-3 text-destructive" />
                  )}
                  <span className={`text-[10px] ${tendencias.pendentes < 0 ? "text-success" : "text-destructive"}`}>
                    {tendencias.pendentes > 0 ? "+" : ""}
                    {tendencias.pendentes}% vs sem. ant.
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-destructive/30 bg-destructive/5">
              <CardContent className="p-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Atrasadas</span>
                  <AlertTriangle className="h-4 w-4 text-destructive" />
                </div>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-2xl font-bold text-destructive">{contadores.atrasadas}</span>
                  <span className="text-xs text-muted-foreground">acoes</span>
                </div>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-destructive" />
                  <span className="text-[10px] text-destructive">+{tendencias.atrasadas}% vs sem. ant.</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-destructive/30 bg-destructive/5">
              <CardContent className="p-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Criticas</span>
                  <AlertTriangle className="h-4 w-4 text-destructive fill-destructive" />
                </div>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-2xl font-bold text-destructive">{contadores.criticas}</span>
                  <span className="text-xs text-muted-foreground">risco</span>
                </div>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-destructive" />
                  <span className="text-[10px] text-destructive">+{tendencias.criticas} esta semana</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-muted">
              <CardContent className="p-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Sem Responsavel</span>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-2xl font-bold text-muted-foreground">{contadores.semResponsavel}</span>
                  <span className="text-xs text-muted-foreground">acoes</span>
                </div>
                <div className="text-[10px] text-muted-foreground mt-1">Necessitam atribuicao</div>
              </CardContent>
            </Card>

            <Card className="border-info/30 bg-info/5">
              <CardContent className="p-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Eventos Hoje</span>
                  <Calendar className="h-4 w-4 text-info" />
                </div>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-2xl font-bold text-info">{contadores.eventosHoje}</span>
                  <span className="text-xs text-muted-foreground">agendados</span>
                </div>
                <div className="text-[10px] text-info mt-1">07 de Janeiro</div>
              </CardContent>
            </Card>
          </div>

          {/* Filtros de origem - apenas para lista */}
          {modoVisualizacao === "lista" && (
            <div className="flex items-center gap-2 pb-3 border-b border-border/30 flex-shrink-0">
              <span className="text-[10px] text-muted-foreground uppercase tracking-wide">Origem:</span>
              <button
                onClick={() => setFiltroOrigem("todos")}
                className={`text-xs px-2 py-1 rounded ${filtroOrigem === "todos" ? "bg-muted font-medium" : ""}`}
              >
                Todos
              </button>
              {(Object.keys(origemConfig) as Origem[]).map((origem) => (
                <button
                  key={origem}
                  onClick={() => setFiltroOrigem(origem)}
                  className={`text-xs px-2 py-1 rounded ${filtroOrigem === origem ? origemConfig[origem].color : ""}`}
                >
                  {origemConfig[origem].label}
                </button>
              ))}
              <div className="flex-1" />
              <span className="text-[10px] text-muted-foreground uppercase tracking-wide">Status:</span>
              <button
                onClick={() => setFiltroStatus("todos")}
                className={`text-xs px-2 py-1 rounded ${filtroStatus === "todos" ? "bg-muted font-medium" : ""}`}
              >
                Todos
              </button>
              {(Object.keys(statusConfig) as Status[]).map((status) => {
                const StatusIcon = statusConfig[status].icon
                return (
                  <button
                    key={status}
                    onClick={() => setFiltroStatus(status)}
                    className={`flex items-center gap-1 text-xs px-2 py-1 rounded ${filtroStatus === status ? statusConfig[status].color : ""}`}
                  >
                    <StatusIcon className="h-3 w-3" />
                    {statusConfig[status].label}
                  </button>
                )
              })}
            </div>
          )}

          {/* Conteudo baseado no modo de visualizacao */}
          {modoVisualizacao === "lista" && (
            <div className="flex-1 flex gap-0 min-h-0 mt-3">
              {/* Tabela de Acoes */}
              <div className={`flex-1 flex flex-col min-h-0 ${selectedAcao ? "pr-4" : ""}`}>
                <ScrollArea className="flex-1">
                  <table className="w-full text-sm">
                    <thead className="sticky top-0 bg-background z-10">
                      <tr className="border-b border-border/50">
                        <th className="text-left py-2 px-2 text-[10px] font-medium text-muted-foreground uppercase tracking-wide w-[70px]">
                          ID
                        </th>
                        <th className="text-left py-2 px-2 text-[10px] font-medium text-muted-foreground uppercase tracking-wide w-[80px]">
                          Prazo
                        </th>
                        <th className="text-left py-2 px-2 text-[10px] font-medium text-muted-foreground uppercase tracking-wide w-[90px]">
                          Tipo
                        </th>
                        <th className="text-left py-2 px-2 text-[10px] font-medium text-muted-foreground uppercase tracking-wide w-[85px]">
                          Origem
                        </th>
                        <th className="text-left py-2 px-2 text-[10px] font-medium text-muted-foreground uppercase tracking-wide">
                          Assunto
                        </th>
                        <th className="text-left py-2 px-2 text-[10px] font-medium text-muted-foreground uppercase tracking-wide w-[120px]">
                          Responsavel
                        </th>
                        <th className="text-left py-2 px-2 text-[10px] font-medium text-muted-foreground uppercase tracking-wide w-[100px]">
                          Status
                        </th>
                        <th className="text-left py-2 px-2 text-[10px] font-medium text-muted-foreground uppercase tracking-wide w-[60px]">
                          Prior.
                        </th>
                        <th className="text-center py-2 px-2 text-[10px] font-medium text-muted-foreground uppercase tracking-wide w-[70px]">
                          Links
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {acoesFiltradas.map((acao) => {
                        const StatusIcon = statusConfig[acao.status].icon
                        return (
                          <tr
                            key={acao.id}
                            onClick={() => setSelectedAcao(acao)}
                            className={`border-b border-border/30 hover:bg-muted/30 cursor-pointer transition-colors ${selectedAcao?.id === acao.id ? "bg-muted/50" : ""} ${acao.status === "atrasado" ? "bg-destructive/5" : ""}`}
                          >
                            <td className="py-2 px-2 font-mono text-xs text-muted-foreground">{acao.id}</td>
                            <td className="py-2 px-2">
                              <span
                                className={`text-xs font-medium tabular-nums ${acao.status === "atrasado" ? "text-destructive" : ""}`}
                              >
                                {acao.prazo}
                              </span>
                            </td>
                            <td className="py-2 px-2">
                              <span
                                className={`inline-flex text-[10px] px-1.5 py-0.5 rounded border ${tipoConfig[acao.tipo].color}`}
                              >
                                {tipoConfig[acao.tipo].label}
                              </span>
                            </td>
                            <td className="py-2 px-2">
                              <span
                                className={`inline-flex text-[10px] px-1.5 py-0.5 rounded border ${origemConfig[acao.origem].color}`}
                              >
                                {origemConfig[acao.origem].label}
                              </span>
                            </td>
                            <td className="py-2 px-2">
                              <div className="font-medium text-foreground text-xs">{acao.titulo}</div>
                            </td>
                            <td className="py-2 px-2 text-xs text-muted-foreground">{acao.responsavel}</td>
                            <td className="py-2 px-2">
                              <span
                                className={`inline-flex items-center gap-1 text-xs px-1.5 py-0.5 rounded ${statusConfig[acao.status].color}`}
                              >
                                <StatusIcon className="h-3 w-3" />
                                {statusConfig[acao.status].label}
                              </span>
                            </td>
                            <td className="py-2 px-2">
                              <span
                                className={`text-[10px] px-1.5 py-0.5 rounded border ${prioridadeConfig[acao.prioridade].color}`}
                              >
                                {prioridadeConfig[acao.prioridade].label}
                              </span>
                            </td>
                            <td className="py-2 px-2 text-center">
                              <div className="flex items-center justify-center gap-1.5 text-muted-foreground">
                                {acao.origemNeural && <Link2 className="h-3.5 w-3.5" />}
                                {acao.anexos > 0 && <Paperclip className="h-3.5 w-3.5" />}
                                {acao.comentarios.length > 0 && <MessageSquare className="h-3.5 w-3.5" />}
                              </div>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </ScrollArea>
              </div>

              {/* Painel lateral de detalhes */}
              {selectedAcao && (
                <Card className="w-[380px] flex-shrink-0 border-l border-border/50 rounded-l-none flex flex-col">
                  <CardHeader className="p-3 pb-2 border-b border-border/50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-[10px] font-mono">
                          {selectedAcao.id}
                        </Badge>
                        <Badge className={`text-[10px] ${prioridadeConfig[selectedAcao.prioridade].color}`}>
                          {prioridadeConfig[selectedAcao.prioridade].label}
                        </Badge>
                      </div>
                      <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setSelectedAcao(null)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <CardTitle className="text-sm font-semibold mt-2">{selectedAcao.titulo}</CardTitle>
                    <p className="text-xs text-muted-foreground mt-1">{selectedAcao.descricao}</p>
                  </CardHeader>

                  <ScrollArea className="flex-1">
                    <CardContent className="p-3 space-y-4">
                      {/* Origem Neural */}
                      {selectedAcao.origemNeural && (
                        <div className="p-2 bg-muted/30 rounded-lg border border-border/50">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">
                              Origem Neural
                            </span>
                          </div>
                          <a
                            href={selectedAcao.origemNeural.link}
                            className="flex items-center gap-2 text-primary hover:underline"
                          >
                            {(() => {
                              const config = origemNeuralConfig[selectedAcao.origemNeural.tipo]
                              const Icon = config?.icon || Target
                              return <Icon className={`h-4 w-4 ${config?.color || "text-primary"}`} />
                            })()}
                            {selectedAcao.origemNeural.label}
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </div>
                      )}

                      {/* Checklist */}
                      <div>
                        <h4 className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide mb-2">
                          Checklist
                        </h4>
                        <div className="space-y-1.5">
                          {selectedAcao.checklist.map((item) => (
                            <div key={item.id} className="flex items-center gap-2">
                              <Checkbox checked={item.concluido} className="h-4 w-4" />
                              <span className={`text-xs ${item.concluido ? "line-through text-muted-foreground" : ""}`}>
                                {item.texto}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Comentarios */}
                      <div>
                        <h4 className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide mb-2">
                          Comentarios ({selectedAcao.comentarios.length})
                        </h4>
                        <div className="space-y-2">
                          {selectedAcao.comentarios.map((com) => (
                            <div key={com.id} className="p-2 bg-muted/30 rounded text-xs">
                              <div className="flex items-center justify-between mb-1">
                                <span className="font-medium">{com.usuario}</span>
                                <span className="text-muted-foreground text-[10px]">{com.data}</span>
                              </div>
                              <p className="text-muted-foreground">{com.texto}</p>
                            </div>
                          ))}
                        </div>
                        <div className="mt-2 flex gap-2">
                          <Input
                            placeholder="Adicionar comentario..."
                            className="h-8 text-xs"
                            value={novoComentario}
                            onChange={(e) => setNovoComentario(e.target.value)}
                          />
                          <Button size="sm" className="h-8 px-3">
                            <MessageSquare className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </div>

                      {/* Historico */}
                      <div>
                        <h4 className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide mb-2">
                          Historico
                        </h4>
                        <div className="space-y-1.5">
                          {selectedAcao.historico.map((h, i) => (
                            <div key={i} className="flex items-start gap-2 text-[10px]">
                              <History className="h-3 w-3 mt-0.5 text-muted-foreground" />
                              <div>
                                <span className="text-muted-foreground">{h.data}</span>
                                <span className="mx-1">-</span>
                                <span>{h.acao}</span>
                                <span className="text-muted-foreground ml-1">({h.usuario})</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </ScrollArea>
                </Card>
              )}
            </div>
          )}

          {modoVisualizacao === "calendario" && (
            <div className="flex-1 flex gap-4 min-h-0 mt-3">
              <div className="flex-1">
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {diasSemana.map((dia) => (
                    <div key={dia} className="text-center text-xs font-medium text-muted-foreground py-2">
                      {dia}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1">{renderCalendario()}</div>
              </div>

              {/* Painel do dia selecionado */}
              {selectedDay && (
                <Card className="w-[300px] flex-shrink-0">
                  <CardHeader className="p-3 pb-2">
                    <CardTitle className="text-sm font-semibold">
                      {selectedDay} de {mesesNomes[mesCalendario.mes]}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-3 pt-0">
                    <ScrollArea className="h-[400px]">
                      <div className="space-y-2">
                        {getAcoesPorDia(selectedDay).length === 0 ? (
                          <p className="text-xs text-muted-foreground">Nenhuma acao para este dia.</p>
                        ) : (
                          getAcoesPorDia(selectedDay).map((acao) => (
                            <div
                              key={acao.id}
                              onClick={() => setSelectedAcao(acao)}
                              className={`p-2 rounded border cursor-pointer hover:border-primary/50 ${
                                acao.status === "atrasado"
                                  ? "border-destructive/30 bg-destructive/5"
                                  : "border-border/50"
                              }`}
                            >
                              <div className="flex items-center justify-between mb-1">
                                <Badge variant="outline" className="text-[9px]">
                                  {acao.id}
                                </Badge>
                                <Badge className={`text-[9px] ${prioridadeConfig[acao.prioridade].color}`}>
                                  {prioridadeConfig[acao.prioridade].label}
                                </Badge>
                              </div>
                              <p className="text-xs font-medium">{acao.titulo}</p>
                              <p className="text-[10px] text-muted-foreground mt-1">{acao.responsavel}</p>
                            </div>
                          ))
                        )}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {modoVisualizacao === "graficos" && (
            <div className="flex-1 mt-3 overflow-auto">
              {/* KPIs de resumo */}
              <div className="grid grid-cols-5 gap-3 mb-4">
                <Card>
                  <CardContent className="p-3 text-center">
                    <span className="text-2xl font-bold text-primary">{contadores.total}</span>
                    <p className="text-xs text-muted-foreground">Total de Acoes</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-3 text-center">
                    <span className="text-2xl font-bold text-info">{contadores.emAndamento}</span>
                    <p className="text-xs text-muted-foreground">Em Andamento</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-3 text-center">
                    <span className="text-2xl font-bold text-destructive">{contadores.atrasadas}</span>
                    <p className="text-xs text-muted-foreground">Atrasadas</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-3 text-center">
                    <span className="text-2xl font-bold text-success">{contadores.concluidas}</span>
                    <p className="text-xs text-muted-foreground">Concluidas</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-3 text-center">
                    <span className="text-2xl font-bold text-warning">{contadores.pendentes}</span>
                    <p className="text-xs text-muted-foreground">Pendentes</p>
                  </CardContent>
                </Card>
              </div>

              {/* Graficos */}
              <div className="grid grid-cols-2 gap-4">
                {/* Pizza de Status */}
                <Card>
                  <CardHeader className="p-3 pb-0">
                    <CardTitle className="text-sm font-semibold">Distribuicao por Status</CardTitle>
                  </CardHeader>
                  <CardContent className="p-3">
                    <div className="h-[200px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsPieChart>
                          <Pie
                            data={dadosStatusPizza}
                            cx="50%"
                            cy="50%"
                            innerRadius={50}
                            outerRadius={80}
                            paddingAngle={2}
                            dataKey="value"
                          >
                            {dadosStatusPizza.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <RechartsTooltip />
                          <Legend
                            verticalAlign="bottom"
                            height={36}
                            formatter={(value) => <span className="text-xs">{value}</span>}
                          />
                        </RechartsPieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* Barras por Responsavel */}
                <Card>
                  <CardHeader className="p-3 pb-0">
                    <CardTitle className="text-sm font-semibold">Acoes por Responsavel</CardTitle>
                  </CardHeader>
                  <CardContent className="p-3">
                    <div className="h-[200px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={dadosPorResponsavel} layout="vertical">
                          <XAxis tick={{ fontSize: 10 }} />
                          <YAxis dataKey="name" type="category" width={100} tick={{ fontSize: 10 }} />
                          <RechartsTooltip />
                          <Bar dataKey="pendentes" stackId="a" fill="var(--warning)" name="Pendentes" />
                          <Bar dataKey="concluidas" stackId="a" fill="var(--success)" name="Concluidas" />
                          <Bar dataKey="atrasadas" stackId="a" fill="var(--destructive)" name="Atrasadas" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* Evolucao Semanal */}
                <Card>
                  <CardHeader className="p-3 pb-0">
                    <CardTitle className="text-sm font-semibold">Evolucao Semanal</CardTitle>
                  </CardHeader>
                  <CardContent className="p-3">
                    <div className="h-[200px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={dadosEvolucaoSemanal}>
                          <XAxis dataKey="semana" tick={{ fontSize: 10 }} />
                          <YAxis tick={{ fontSize: 10 }} />
                          <RechartsTooltip />
                          <Legend formatter={(value) => <span className="text-xs">{value}</span>} />
                          <Line type="monotone" dataKey="criadas" stroke="var(--info)" name="Criadas" strokeWidth={2} />
                          <Line
                            type="monotone"
                            dataKey="concluidas"
                            stroke="var(--success)"
                            name="Concluidas"
                            strokeWidth={2}
                          />
                          <Line
                            type="monotone"
                            dataKey="atrasadas"
                            stroke="var(--destructive)"
                            name="Atrasadas"
                            strokeWidth={2}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* Por Tipo */}
                <Card>
                  <CardHeader className="p-3 pb-0">
                    <CardTitle className="text-sm font-semibold">Acoes por Tipo</CardTitle>
                  </CardHeader>
                  <CardContent className="p-3">
                    <div className="h-[200px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={dadosPorTipo}>
                          <XAxis dataKey="tipo" tick={{ fontSize: 10 }} />
                          <YAxis tick={{ fontSize: 10 }} />
                          <RechartsTooltip />
                          <Bar dataKey="qtd" fill="var(--primary)" name="Quantidade" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
