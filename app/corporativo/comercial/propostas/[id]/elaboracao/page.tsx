"use client"

import { use, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useTopbar } from "@/contexts/topbar-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { 
  ArrowLeft, 
  DollarSign, 
  Wrench, 
  Truck, 
  AlertTriangle, 
  CheckCircle2,
  TrendingUp,
  Calculator,
  Save,
  Send,
  Upload,
  BarChart3,
  GitCompare,
  Lightbulb,
  FileSpreadsheet,
  AlertCircle,
  FileText,
  Calendar,
  Clock,
  User,
  Plus,
  X,
  Building,
  BrickWall,
  HardHat,
  LayoutDashboard,
  Building2,
  FolderKanban,
  Briefcase as Portfolio,
  Target,
  PieChart as PieChartIcon,
} from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer } from 'recharts'
import { toast } from "sonner"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { ComercialNavbar } from "../../../_components/comercial-navbar"
import { PropostaTabsNavbar } from "../../_components/proposta-tabs-navbar"

// ============================================================================
// COMPONENT
// ============================================================================

export default function PropostaElaboracaoPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const router = useRouter()
  const pathname = usePathname()
  const { setTopbarConfig, resetTopbar } = useTopbar()
  const [activeTab, setActiveTab] = useState("resumo")
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [categoriasExpanded, setCategoriasExpanded] = useState<string[]>([])
  const [modoVisualizacao, setModoVisualizacao] = useState<'tabela' | 'grafico'>('tabela')
  const [rankingTipo, setRankingTipo] = useState<'servicos' | 'materiais' | 'maoObra' | 'equipamentos'>('servicos')
  
  // Estados para gestão de documentos
  const [documentosCliente, setDocumentosCliente] = useState([
    { id: 1, nome: "Edital Completo", versao: "v3.2", responsavel: "Maria Santos", data: "05/01/2026", status: "recebido" },
    { id: 2, nome: "Memorial Descritivo do Cliente", versao: "v2.0", responsavel: "Pedro Alves", data: "06/01/2026", status: "recebido" },
    { id: 3, nome: "Planilha Orçamentária Base", versao: "v1.5", responsavel: "Maria Santos", data: "05/01/2026", status: "recebido" },
    { id: 4, nome: "Cronograma Referência", versao: "v1.0", responsavel: "Carlos Silva", data: "07/01/2026", status: "recebido" },
  ])
  
  const [documentosProposta, setDocumentosProposta] = useState([
    { id: 1, nome: "Proposta Técnica", versao: "v2.1", responsavel: "João Oliveira", data: "10/01/2026", status: "enviado" },
    { id: 2, nome: "Planilha Orçamentária Final", versao: "v3.0", responsavel: "Maria Santos", data: "11/01/2026", status: "rascunho" },
    { id: 3, nome: "Memorial de Cálculo", versao: "v1.0", responsavel: "Pedro Alves", data: "09/01/2026", status: "pendente" },
    { id: 4, nome: "Cronograma Executivo", versao: "v1.2", responsavel: "Ana Costa", data: "10/01/2026", status: "rascunho" },
  ])
  
  const [dialogUploadCliente, setDialogUploadCliente] = useState(false)
  const [dialogUploadProposta, setDialogUploadProposta] = useState(false)
  const [arquivoSelecionado, setArquivoSelecionado] = useState<File | null>(null)

  // ============================================================================
  // ESTADO - CENÁRIO ECONÔMICO
  // ============================================================================
  
  // Custos Diretos - PREENCHIDOS COM DADOS SIMULADOS
  const [material, setMaterial] = useState("176400000") // R$ 176.4Mi
  const [maoObra, setMaoObra] = useState("138600000") // R$ 138.6Mi
  const [equipamentos, setEquipamentos] = useState("63000000") // R$ 63Mi
  const [servTerceiros, setServTerceiros] = useState("42000000") // R$ 42Mi

  // Custos Indiretos
  const [administracaoObra, setAdministracaoObra] = useState("18900000") // R$ 18.9Mi
  const [mobilizacao, setMobilizacao] = useState("6300000") // R$ 6.3Mi
  const [canteiro, setCanteiro] = useState("8400000") // R$ 8.4Mi
  const [engenharia, setEngenharia] = useState("4200000") // R$ 4.2Mi

  // Impostos e Despesas
  const [impostos, setImpostos] = useState("5.93") // % típico
  const [dag, setDag] = useState("3") // % Despesas Administrativas Gerais
  const [margem, setMargem] = useState("15") // % Margem desejada (conforme plano)

  // ============================================================================
  // ESTADO - NOVAS TABS (IMPORTAÇÃO E ANÁLISE)
  // ============================================================================
  
  const [planilhaCliente, setPlanilhaCliente] = useState<File | null>(null)
  const [planilhaEmpresa, setPlanilhaEmpresa] = useState<File | null>(null)
  const [dadosImportados, setDadosImportados] = useState(true) // SIMULADO: já importado
  const [dialogImportacaoAberto, setDialogImportacaoAberto] = useState(false)
  const [dialogNovaTarefaAberto, setDialogNovaTarefaAberto] = useState(false)
  const [tarefas, setTarefas] = useState([
    { id: 1, titulo: "Revisar Memorial Descritivo", data: "18/01/2026", responsavel: "Maria Santos", concluida: false },
    { id: 2, titulo: "Aprovar Planilha Orçamentária", data: "22/01/2026", responsavel: "João Silva", concluida: false },
    { id: 3, titulo: "Upload Edital Completo", data: "05/01/2026", responsavel: "Pedro Alves", concluida: true },
  ])
  
  // ============================================================================
  // DADOS SIMULADOS - PROPOSTA COMPLETA R$ 450Mi
  // ============================================================================
  
  const dadosSimulados = {
    valores: {
      cliente: 450000000,
      empresa: 420000000,
      delta: -6.7,
      margemBruta: 30000000,
      margemPercentual: 7.1
    },
    categorias: [
      { 
        nome: "Fundações", 
        cliente: { material: 18000000, maoObra: 15000000, equipamentos: 8000000, terceiros: 4000000, total: 45000000 },
        empresa: { material: 16500000, maoObra: 13500000, equipamentos: 7500000, terceiros: 3800000, total: 41300000 },
        delta: -8.2,
        distorcao: false
      },
      { 
        nome: "Estrutura de Concreto", 
        cliente: { material: 90000000, maoObra: 54000000, equipamentos: 27000000, terceiros: 9000000, total: 180000000 },
        empresa: { material: 84000000, maoObra: 50400000, equipamentos: 25200000, terceiros: 8400000, total: 168000000 },
        delta: -6.7,
        distorcao: false
      },
      { 
        nome: "Alvenaria e Vedações", 
        cliente: { material: 18000000, maoObra: 12600000, equipamentos: 1800000, terceiros: 3600000, total: 36000000 },
        empresa: { material: 16800000, maoObra: 11760000, equipamentos: 1680000, terceiros: 3360000, total: 33600000 },
        delta: -6.7,
        distorcao: false
      },
      { 
        nome: "Instalações Hidráulicas", 
        cliente: { material: 9000000, maoObra: 8100000, equipamentos: 2700000, terceiros: 7200000, total: 27000000 },
        empresa: { material: 8400000, maoObra: 7560000, equipamentos: 2520000, terceiros: 6720000, total: 25200000 },
        delta: -6.7,
        distorcao: false
      },
      { 
        nome: "Instalações Elétricas", 
        cliente: { material: 12600000, maoObra: 9450000, equipamentos: 3150000, terceiros: 6300000, total: 31500000 },
        empresa: { material: 11760000, maoObra: 8820000, equipamentos: 2940000, terceiros: 5880000, total: 29400000 },
        delta: -6.7,
        distorcao: false
      },
      { 
        nome: "Revestimentos", 
        cliente: { material: 22500000, maoObra: 13500000, equipamentos: 4500000, terceiros: 4500000, total: 45000000 },
        empresa: { material: 23400000, maoObra: 14040000, equipamentos: 4680000, terceiros: 4680000, total: 46800000 },
        delta: +4.0,
        distorcao: true
      },
      { 
        nome: "Esquadrias", 
        cliente: { material: 13500000, maoObra: 4500000, equipamentos: 900000, terceiros: 3600000, total: 22500000 },
        empresa: { material: 12600000, maoObra: 4200000, equipamentos: 840000, terceiros: 3360000, total: 21000000 },
        delta: -6.7,
        distorcao: false
      },
      { 
        nome: "Pinturas", 
        cliente: { material: 6750000, maoObra: 4050000, equipamentos: 1350000, terceiros: 1350000, total: 13500000 },
        empresa: { material: 6300000, maoObra: 3780000, equipamentos: 1260000, terceiros: 1260000, total: 12600000 },
        delta: -6.7,
        distorcao: false
      },
      { 
        nome: "Pisos", 
        cliente: { material: 13500000, maoObra: 8100000, equipamentos: 2700000, terceiros: 2700000, total: 27000000 },
        empresa: { material: 12600000, maoObra: 7560000, equipamentos: 2520000, terceiros: 2520000, total: 25200000 },
        delta: -6.7,
        distorcao: false
      },
      { 
        nome: "Cobertura", 
        cliente: { material: 11250000, maoObra: 6750000, equipamentos: 2250000, terceiros: 2250000, total: 22500000 },
        empresa: { material: 10500000, maoObra: 6300000, equipamentos: 2100000, terceiros: 2100000, total: 21000000 },
        delta: -6.7,
        distorcao: false
      }
    ],
    curvaABC: [
      { classe: "A", nome: "Estrutura de Concreto", valor: 168000000, percentual: 40, acumulado: 40 },
      { classe: "A", nome: "Fundações", valor: 42000000, percentual: 10, acumulado: 50 },
      { classe: "A", nome: "Revestimentos", valor: 42000000, percentual: 10, acumulado: 60 },
      { classe: "B", nome: "Alvenaria e Vedações", valor: 33600000, percentual: 8, acumulado: 68 },
      { classe: "B", nome: "Instalações Elétricas", valor: 29400000, percentual: 7, acumulado: 75 },
      { classe: "B", nome: "Pisos", valor: 25200000, percentual: 6, acumulado: 81 },
      { classe: "C", nome: "Instalações Hidráulicas", valor: 25200000, percentual: 6, acumulado: 87 },
      { classe: "C", nome: "Esquadrias", valor: 21000000, percentual: 5, acumulado: 92 },
      { classe: "C", nome: "Cobertura", valor: 21000000, percentual: 5, acumulado: 97 },
      { classe: "C", nome: "Pinturas", valor: 12600000, percentual: 3, acumulado: 100 }
    ],
    recursos: {
      material: { percentual: 42, valor: 176400000 },
      maoObra: { percentual: 33, valor: 138600000 },
      equipamentos: { percentual: 15, valor: 63000000 },
      terceiros: { percentual: 10, valor: 42000000 }
    },
    materiais: [
      { nome: "Concreto FCK 30", unidade: "m³", quantidade: 85000, valor: 68000000, percentual: 38.5 },
      { nome: "Aço CA-50", unidade: "ton", quantidade: 5100, valor: 45900000, percentual: 26 },
      { nome: "Blocos Cerâmicos", unidade: "mil un", quantidade: 2800, valor: 16800000, percentual: 9.5 },
      { nome: "Argamassa AC-III", unidade: "m³", quantidade: 12000, valor: 14400000, percentual: 8.2 },
      { nome: "Cerâmica 60x60", unidade: "m²", quantidade: 180000, valor: 10800000, percentual: 6.1 },
      { nome: "Outros", unidade: "-", quantidade: 0, valor: 20500000, percentual: 11.7 }
    ],
    maoObra: [
      { funcao: "Pedreiro", quantidade: 280, horas: 504000, valor: 55440000, percentual: 40 },
      { funcao: "Servente", quantidade: 350, horas: 630000, valor: 44352000, percentual: 32 },
      { funcao: "Carpinteiro", quantidade: 120, horas: 216000, valor: 19404000, percentual: 14 },
      { funcao: "Armador", quantidade: 90, horas: 162000, valor: 13888000, percentual: 10 },
      { funcao: "Eletricista", quantidade: 45, horas: 81000, valor: 5516000, percentual: 4 }
    ],
    alternativas: [
      {
        titulo: "Otimização de Estrutura com Concreto de Alta Performance",
        economia: 12000000,
        descricao: "Uso de concreto FCK 40 reduz seção de pilares e volume total em 14%",
        impacto: "Redução de 11.900m³ de concreto"
      },
      {
        titulo: "Substituição de Fornecedor de Aço",
        economia: 8500000,
        descricao: "Parceria estratégica com usina regional garante melhor preço",
        impacto: "18.5% de desconto no aço CA-50"
      },
      {
        titulo: "Pré-fabricação de Lajes",
        economia: 0,
        reducaoPrazo: 3,
        descricao: "Uso de lajes alveolares acelera cronograma",
        impacto: "Redução de 3 meses no prazo total"
      },
      {
        titulo: "Central de Argamassa On-site",
        economia: 3200000,
        descricao: "Produção própria de argamassa elimina custos de transporte",
        impacto: "22% de economia em argamassas"
      },
      {
        titulo: "Sistema de Gestão BIM Integrado",
        economia: 0,
        reducaoPerda: 8,
        descricao: "Redução de perdas e retrabalhos com planejamento 4D",
        impacto: "8% de redução em desperdícios"
      }
    ]
  }

  // ============================================================================
  // DADOS DE RANKING COMPARATIVO
  // ============================================================================
  
  const rankingServicos = [
    { nome: 'Estrutura de Concreto', cliente: 180000000, nossa: 168000000, delta: -6.7 },
    { nome: 'Revestimentos', cliente: 45000000, nossa: 46800000, delta: +4.0 },
    { nome: 'Fundações', cliente: 45000000, nossa: 41300000, delta: -8.2 },
    { nome: 'Alvenaria e Vedações', cliente: 36000000, nossa: 33600000, delta: -6.7 },
    { nome: 'Instalações Elétricas', cliente: 31500000, nossa: 29400000, delta: -6.7 },
    { nome: 'Instalações Hidráulicas', cliente: 27000000, nossa: 25200000, delta: -6.7 },
    { nome: 'Pisos', cliente: 27000000, nossa: 25200000, delta: -6.7 },
    { nome: 'Cobertura', cliente: 22500000, nossa: 21000000, delta: -6.7 },
    { nome: 'Esquadrias', cliente: 22500000, nossa: 21000000, delta: -6.7 },
    { nome: 'Pinturas', cliente: 13500000, nossa: 12600000, delta: -6.7 }
  ]

  const rankingMateriais = [
    { nome: 'Concreto FCK 30', cliente: 72000000, nossa: 68000000, delta: -5.6 },
    { nome: 'Aço CA-50', cliente: 49000000, nossa: 45900000, delta: -6.3 },
    { nome: 'Blocos Cerâmicos', cliente: 18000000, nossa: 16800000, delta: -6.7 },
    { nome: 'Argamassa AC-III', cliente: 15500000, nossa: 14400000, delta: -7.1 },
    { nome: 'Cerâmica 60x60', cliente: 11600000, nossa: 10800000, delta: -6.9 },
    { nome: 'Fios e Cabos', cliente: 9800000, nossa: 9200000, delta: -6.1 },
    { nome: 'Tubulações PVC', cliente: 7200000, nossa: 6800000, delta: -5.6 },
    { nome: 'Esquadrias Alumínio', cliente: 8500000, nossa: 7900000, delta: -7.1 },
    { nome: 'Tinta Acrílica', cliente: 5400000, nossa: 5100000, delta: -5.6 },
    { nome: 'Impermeabilizantes', cliente: 4800000, nossa: 4500000, delta: -6.3 }
  ]

  const rankingMaoObra = [
    { nome: 'Pedreiro', cliente: 59000000, nossa: 55440000, delta: -6.0 },
    { nome: 'Servente', cliente: 47500000, nossa: 44352000, delta: -6.6 },
    { nome: 'Carpinteiro', cliente: 20800000, nossa: 19404000, delta: -6.7 },
    { nome: 'Armador', cliente: 14900000, nossa: 13888000, delta: -6.8 },
    { nome: 'Eletricista', cliente: 5900000, nossa: 5516000, delta: -6.5 },
    { nome: 'Encanador', cliente: 5200000, nossa: 4850000, delta: -6.7 },
    { nome: 'Azulejista', cliente: 4100000, nossa: 3800000, delta: -7.3 },
    { nome: 'Pintor', cliente: 3800000, nossa: 3500000, delta: -7.9 },
    { nome: 'Gesseiro', cliente: 2900000, nossa: 2700000, delta: -6.9 },
    { nome: 'Serralheiro', cliente: 2400000, nossa: 2250000, delta: -6.3 }
  ]

  const rankingEquipamentos = [
    { nome: 'Guindaste 60T', cliente: 14000000, nossa: 12600000, delta: -10.0 },
    { nome: 'Betoneira Industrial', cliente: 9500000, nossa: 8900000, delta: -6.3 },
    { nome: 'Vibrador de Concreto', cliente: 6800000, nossa: 6400000, delta: -5.9 },
    { nome: 'Plataforma Elevatória', cliente: 5200000, nossa: 4850000, delta: -6.7 },
    { nome: 'Serra Circular', cliente: 4100000, nossa: 3850000, delta: -6.1 },
    { nome: 'Compactador de Solo', cliente: 3800000, nossa: 3500000, delta: -7.9 },
    { nome: 'Furadeira Industrial', cliente: 2900000, nossa: 2700000, delta: -6.9 },
    { nome: 'Andaimes Metálicos', cliente: 4500000, nossa: 4200000, delta: -6.7 },
    { nome: 'Bomba de Concreto', cliente: 8200000, nossa: 7650000, delta: -6.7 },
    { nome: 'Escavadeira Hidráulica', cliente: 7500000, nossa: 6950000, delta: -7.3 }
  ]

  const getRankingAtual = () => {
    switch (rankingTipo) {
      case 'servicos': return rankingServicos
      case 'materiais': return rankingMateriais
      case 'maoObra': return rankingMaoObra
      case 'equipamentos': return rankingEquipamentos
      default: return rankingServicos
    }
  }

  const getInsightRanking = () => {
    switch (rankingTipo) {
      case 'servicos': 
        return 'Somos 6.7% mais competitivos na maioria dos serviços. Destaque negativo: Revestimentos (+4%), onde precisamos revisar custos.'
      case 'materiais':
        return 'Nossa proposta é competitiva em todos os materiais, com média de -6.5%. Melhor performance: Aço CA-50 (-6.3%).'
      case 'maoObra':
        return 'Conseguimos otimização média de 6.7% na mão de obra. Destaque: Pintor (-7.9%) e Azulejista (-7.3%) com maior eficiência.'
      case 'equipamentos':
        return 'Equipamentos 7% mais competitivos em média. Destaque: Guindaste 60T (-10%) devido a negociação estratégica de locação.'
      default:
        return ''
    }
  }

  // ============================================================================
  // CÁLCULOS AUTOMÁTICOS
  // ============================================================================

  const parseNumber = (value: string) => parseFloat(value.replace(/[^\d.-]/g, '')) || 0

  const custoDireto = parseNumber(material) + parseNumber(maoObra) + parseNumber(equipamentos) + parseNumber(servTerceiros)
  const custoIndireto = parseNumber(administracaoObra) + parseNumber(mobilizacao) + parseNumber(canteiro) + parseNumber(engenharia)
  const custoTotal = custoDireto + custoIndireto
  
  const valorImpostos = custoTotal * (parseNumber(impostos) / 100)
  const valorDAG = custoTotal * (parseNumber(dag) / 100)
  const valorMargem = custoTotal * (parseNumber(margem) / 100)
  
  const valorProposta = custoTotal + valorImpostos + valorDAG + valorMargem
  const bdi = ((valorImpostos + valorDAG + valorMargem) / custoTotal) * 100

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }

  const formatPercent = (value: number) => {
    return `${value.toFixed(2)}%`
  }

  // ============================================================================
  // HANDLERS
  // ============================================================================

  const handleUploadCliente = (file: File) => {
    setPlanilhaCliente(file)
    toast.success(`Planilha do cliente "${file.name}" carregada`)
  }

  const handleUploadEmpresa = (file: File) => {
    setPlanilhaEmpresa(file)
    toast.success(`Estudo comercial "${file.name}" carregado`)
  }

  const processarImportacao = () => {
    if (!planilhaCliente || !planilhaEmpresa) {
      toast.error("Carregue ambas as planilhas antes de processar")
      return
    }
    // Simular processamento
    setTimeout(() => {
      setDadosImportados(true)
      toast.success("Dados importados e processados com sucesso!")
    }, 1500)
  }

  const salvarRascunho = () => {
    toast.success("Elaboração salva como rascunho")
  }

  const finalizarElaboracao = () => {
    toast.success("Elaboração finalizada! Proposta pronta para decisão.")
    router.push(`/corporativo/comercial/propostas/${id}`)
  }

  // Configurar Topbar customizado (apenas título, mantém ações rápidas)
  useEffect(() => {
    setTopbarConfig({
      title: "Elaboração e Análise de Proposta",
      subtitle: `${id} • Construtora ABC - Ponte Rio Grande`,
      showQuickActions: true, // Mantém as ações rápidas no centro
    })

    return () => {
      resetTopbar()
    }
  }, [id, setTopbarConfig, resetTopbar])

  // Handler para mudança de tab com animação
  const handleTabChange = (value: string) => {
    setIsTransitioning(true)
    setTimeout(() => {
      setActiveTab(value)
      setIsTransitioning(false)
    }, 150)
  }

  // Mapear tabs para indicador de progresso
  const tabs = [
    { id: "resumo", name: "Resumo", icon: "📄" },
    { id: "comparativo", name: "Comparativo", icon: "📊" },
    { id: "analise", name: "Análise ABC", icon: "📈" },
    { id: "plano", name: "Plano Vendas", icon: "💡" },
    { id: "economico", name: "Cenário Econômico", icon: "💰" },
    { id: "tecnico", name: "Técnica", icon: "🔧" },
    { id: "operacional", name: "Operacional", icon: "🚛" },
    { id: "riscos", name: "Riscos", icon: "⚠️" },
    { id: "sintese", name: "Síntese", icon: "✅" },
  ]
  
  const currentTabIndex = tabs.findIndex(t => t.id === activeTab)
  const currentTabInfo = tabs[currentTabIndex]

  // Função para toggle de expansão de categorias
  const toggleCategoria = (nome: string) => {
    setCategoriasExpanded(prev =>
      prev.includes(nome)
        ? prev.filter(n => n !== nome)
        : [...prev, nome]
    )
  }

  // Função para upload de documentos do cliente
  const handleUploadDocumentoCliente = () => {
    if (!arquivoSelecionado) {
      toast.error("Por favor, selecione um arquivo!")
      return
    }

    const novoDoc = {
      id: documentosCliente.length + 1,
      nome: arquivoSelecionado.name,
      versao: "v1.0",
      responsavel: "Administrador",
      data: new Date().toLocaleDateString('pt-BR'),
      status: "recebido"
    }

    setDocumentosCliente([...documentosCliente, novoDoc])
    setDialogUploadCliente(false)
    setArquivoSelecionado(null)
    toast.success(`Documento "${arquivoSelecionado.name}" importado com sucesso!`)
  }

  // Função para upload de documentos da proposta
  const handleUploadDocumentoProposta = () => {
    if (!arquivoSelecionado) {
      toast.error("Por favor, selecione um arquivo!")
      return
    }

    const novoDoc = {
      id: documentosProposta.length + 1,
      nome: arquivoSelecionado.name,
      versao: "v1.0",
      responsavel: "Administrador",
      data: new Date().toLocaleDateString('pt-BR'),
      status: "rascunho"
    }

    setDocumentosProposta([...documentosProposta, novoDoc])
    setDialogUploadProposta(false)
    setArquivoSelecionado(null)
    toast.success(`Documento "${arquivoSelecionado.name}" importado com sucesso!`)
  }

  // Função para selecionar arquivo
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validar tipo de arquivo
      const allowedTypes = [
        'application/pdf',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/msword',
        'application/vnd.ms-excel',
      ]
      
      if (!allowedTypes.includes(file.type)) {
        toast.error("Tipo de arquivo não permitido! Use PDF, Word ou Excel.")
        return
      }

      // Validar tamanho (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast.error("Arquivo muito grande! Tamanho máximo: 10MB")
        return
      }

      setArquivoSelecionado(file)
      toast.success(`Arquivo "${file.name}" selecionado!`)
    }
  }

  return (
    <div className="flex flex-col h-screen bg-muted/30 overflow-hidden">
      {/* TOPBAR SECUNDÁRIO - Aparece quando solicitado */}
      <div className="flex-shrink-0 z-50">
        <ComercialNavbar />
      </div>

      {/* TOPBAR TERCIÁRIO - Aparece quando solicitado */}
      <div className="flex-shrink-0 z-40 mt-3">
        <PropostaTabsNavbar activeTab={activeTab} onTabChange={handleTabChange} />
      </div>

      {/* Conteúdo Principal - SEM SCROLL (scroll fica na moldura) */}
      <div className="flex-1 bg-background overflow-hidden">
        <div className="w-full h-full p-6">
          <div className="grid grid-cols-[1fr_320px] gap-6 h-full">
            {/* CONTEÚDO PRINCIPAL (ESQUERDA) */}
            <div className="h-full flex flex-col">

            {/* Tabs Principais */}
            <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full h-full flex flex-col overflow-hidden">

              {/* ================================================================
                  TAB 0: RESUMO DA PROPOSTA
              ================================================================ */}
              <TabsContent 
                value="resumo" 
                className={`h-full transition-all duration-300 ${
                  isTransitioning ? 'opacity-0 translate-x-2' : 'opacity-100 translate-x-0'
                }`}
              >
                {/* MOLDURA - Padrão fixo com scroll interno */}
                <Card className="h-full border-0 bg-background overflow-y-auto overflow-x-hidden scrollbar-hide" style={{ borderRadius: '25px', boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.35), 0 2px 8px rgba(0, 0, 0, 0.05)', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                  <CardContent className="p-[25px] space-y-6">
                    {/* Cabeçalho Simplificado da Proposta */}
                    <Card className="border border-primary/20">
                      <CardContent className="p-4">
                    {/* Linha 1: Identificação e Status */}
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h2 className="text-xl font-bold">{id}</h2>
                          <Badge className="bg-amber-500 text-white">
                            Em Elaboração
                          </Badge>
                        </div>
                        <h3 className="text-base font-semibold text-primary">Construtora ABC • Ponte Rio Grande</h3>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">Prazo para Entrega</p>
                        <p className="text-lg font-bold">15/03/2026</p>
                        <Badge variant="outline" className="mt-1 bg-amber-50 text-amber-700 border-amber-300 text-xs">
                          18 dias restantes
                        </Badge>
                      </div>
                    </div>

                    {/* Linha 2: Valores Principais */}
                    <div className="grid grid-cols-4 gap-4">
                      <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                        <p className="text-xs text-muted-foreground mb-1">Valor Total da Proposta</p>
                        <p className="text-2xl font-bold text-primary">R$ 450Mi</p>
                      </div>
                      <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <p className="text-xs text-muted-foreground mb-1">Custos Diretos</p>
                        <p className="text-2xl font-bold text-blue-600">R$ 360Mi</p>
                      </div>
                      <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                        <p className="text-xs text-muted-foreground mb-1">Custos Indiretos</p>
                        <p className="text-2xl font-bold text-purple-600">R$ 37.8Mi</p>
                      </div>
                      <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                        <p className="text-xs text-muted-foreground mb-1">BDI</p>
                        <p className="text-2xl font-bold text-amber-600">24,8%</p>
                      </div>
                    </div>
                      </CardContent>
                    </Card>

                    {/* Gestão de Documentos - 2 Tabelas Lado a Lado */}
                    <div className="grid grid-cols-2 gap-4">
                  {/* CARD ESQUERDO: Documentos do Cliente */}
                  <Card className="border border-blue-200">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-base flex items-center gap-2">
                            <FileText className="w-4 h-4 text-blue-600" />
                            Documentos do Cliente
                          </CardTitle>
                          <CardDescription className="text-xs">Documentação recebida do cliente</CardDescription>
                        </div>
                        <div className="flex items-center gap-3">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setDialogUploadCliente(true)}
                            className="h-8 gap-1.5 border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300"
                          >
                            <Upload className="w-3.5 h-3.5" />
                            Importar
                          </Button>
                          <div className="text-right">
                            <p className="text-xs text-muted-foreground">Progresso</p>
                            <p className="text-xl font-bold text-blue-600">
                              {Math.round((documentosCliente.length / 4) * 100)}%
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="mb-3">
                        <Progress value={(documentosCliente.length / 4) * 100} className="h-2" />
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-muted-foreground">
                            {documentosCliente.length} de 4 documentos recebidos
                          </span>
                          <Badge className={documentosCliente.length >= 4 ? "bg-emerald-600" : "bg-amber-500"}>
                            {documentosCliente.length >= 4 ? "Completo" : "Em Progresso"}
                          </Badge>
                        </div>
                      </div>

                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-[40%]">Documento</TableHead>
                            <TableHead className="w-[15%]">Versão</TableHead>
                            <TableHead className="w-[20%]">Responsável</TableHead>
                            <TableHead className="w-[15%]">Data</TableHead>
                            <TableHead className="w-[10%]">Ações</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {documentosCliente.map((doc) => (
                            <TableRow key={doc.id} className="hover:bg-emerald-50/50">
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                  <span className="font-medium text-xs">{doc.nome}</span>
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                                  {doc.versao}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-xs">{doc.responsavel}</TableCell>
                              <TableCell className="text-xs text-muted-foreground">{doc.data}</TableCell>
                              <TableCell>
                                <Button variant="ghost" size="sm" className="h-6 text-[11px] px-2">
                                  Ver
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>

                  {/* CARD DIREITO: Nossa Proposta */}
                  <Card className="border border-emerald-200">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-base flex items-center gap-2">
                            <Send className="w-4 h-4 text-emerald-600" />
                            Nossa Proposta
                          </CardTitle>
                          <CardDescription className="text-xs">Documentação que enviamos ao cliente</CardDescription>
                        </div>
                        <div className="flex items-center gap-3">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setDialogUploadProposta(true)}
                            className="h-8 gap-1.5 border-emerald-200 text-emerald-600 hover:bg-emerald-50 hover:border-emerald-300"
                          >
                            <Upload className="w-3.5 h-3.5" />
                            Importar
                          </Button>
                          <div className="text-right">
                            <p className="text-xs text-muted-foreground">Progresso</p>
                            <p className="text-xl font-bold text-emerald-600">
                              {Math.round((documentosProposta.filter(d => d.status === 'enviado').length / 4) * 100)}%
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="mb-3">
                        <Progress value={(documentosProposta.filter(d => d.status === 'enviado').length / 4) * 100} className="h-2" />
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-muted-foreground">
                            {documentosProposta.filter(d => d.status === 'enviado').length} de 4 documentos enviados
                          </span>
                          <Badge className={
                            documentosProposta.filter(d => d.status === 'enviado').length >= 4 
                              ? "bg-emerald-600" 
                              : "bg-amber-500"
                          }>
                            {documentosProposta.filter(d => d.status === 'enviado').length >= 4 ? "Completo" : "Em Elaboração"}
                          </Badge>
                        </div>
                      </div>

                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-[40%]">Documento</TableHead>
                            <TableHead className="w-[15%]">Status</TableHead>
                            <TableHead className="w-[20%]">Responsável</TableHead>
                            <TableHead className="w-[15%]">Data</TableHead>
                            <TableHead className="w-[10%]">Ações</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {documentosProposta.map((doc) => {
                            const statusConfigMap = {
                              enviado: { icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-200", text: "text-emerald-700", label: "Enviado" },
                              rascunho: { icon: AlertCircle, color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-200", text: "text-amber-700", label: "Rascunho" },
                              pendente: { icon: AlertTriangle, color: "text-red-600", bg: "bg-red-50", border: "border-red-200", text: "text-red-700", label: "Pendente" },
                            }
                            const statusConfig = statusConfigMap[doc.status as keyof typeof statusConfigMap] || statusConfigMap.pendente
                            
                            const Icon = statusConfig.icon
                            
                            return (
                              <TableRow key={doc.id} className={`hover:${statusConfig.bg}/50`}>
                                <TableCell>
                                  <div className="flex items-center gap-2">
                                    <Icon className={`w-4 h-4 ${statusConfig.color}`} />
                                    <span className="font-medium text-xs">{doc.nome}</span>
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <Badge variant="outline" className={`${statusConfig.bg} ${statusConfig.text} ${statusConfig.border}`}>
                                    {doc.versao}
                                  </Badge>
                                </TableCell>
                                <TableCell className="text-xs">{doc.responsavel}</TableCell>
                                <TableCell className="text-xs text-muted-foreground">{doc.data}</TableCell>
                                <TableCell>
                                  <Button variant="ghost" size="sm" className="h-6 text-[11px] px-2">
                                    Ver
                                  </Button>
                                </TableCell>
                              </TableRow>
                            )
                          })}
                        </TableBody>
                      </Table>
                      </CardContent>
                    </Card>
                    </div>

                    {/* Análise Jurídica - Full Width */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Análise Jurídica</CardTitle>
                        <CardDescription>Avaliação de conformidade legal e regulatória</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 gap-6">
                          <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 border rounded hover:bg-muted/50">
                              <span className="text-sm font-medium">Exigências Conformes</span>
                              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                            </div>
                            <div className="flex items-center justify-between p-3 border rounded hover:bg-muted/50">
                              <span className="text-sm font-medium">Licenças OK</span>
                              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                            </div>
                            <div className="flex items-center justify-between p-3 border rounded hover:bg-muted/50">
                              <span className="text-sm font-medium">Cláusulas Atípicas</span>
                              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                            </div>
                            <div className="flex items-center justify-between p-3 border rounded hover:bg-muted/50">
                              <span className="text-sm font-medium">Risco Regulatório</span>
                              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                            </div>
                          </div>
                          <div className="space-y-4">
                            <div className="p-4 border rounded bg-muted/30">
                              <p className="text-xs text-muted-foreground mb-2">Parecer Jurídico:</p>
                              <p className="text-base font-medium">Contrato dentro dos padrões estabelecidos</p>
                              <p className="text-sm text-muted-foreground mt-2">
                                Todas as cláusulas foram revisadas e não apresentam riscos significativos.
                              </p>
                            </div>
                            <Badge variant="outline" className="w-full justify-center py-3 bg-emerald-50 text-emerald-700 border-emerald-300">
                              Status: Seguro para Prosseguir
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* ================================================================
                  TAB 1: PAINEL COMPARATIVO GERENCIAL - REDESENHADO
              ================================================================ */}
              <TabsContent 
                value="comparativo" 
                className={`h-full transition-all duration-300 ${
                  isTransitioning ? 'opacity-0 translate-x-2' : 'opacity-100 translate-x-0'
                }`}
              >
                {/* MOLDURA - Padrão fixo com scroll interno */}
                <Card className="h-full border-0 bg-background overflow-y-auto overflow-x-hidden scrollbar-hide" style={{ borderRadius: '25px', boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.35), 0 2px 8px rgba(0, 0, 0, 0.05)', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                  <CardContent className="p-[25px] space-y-6">
                {!dadosImportados ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <FileSpreadsheet className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>Importe os dados primeiro na aba "Importação"</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* ===== DASHBOARD EXECUTIVO - KPI CARDS ===== */}
                    <div className="grid grid-cols-5 gap-3">
                      <Card className="border-blue-200 bg-blue-50/50">
                        <CardContent className="p-4">
                          <div className="text-xs font-medium text-blue-700 mb-1">Valor Cliente</div>
                          <div className="text-2xl font-bold text-blue-900">
                            R$ {(dadosSimulados.valores.cliente / 1000000).toFixed(0)}Mi
                          </div>
                          <div className="text-xs text-blue-600 mt-1">Orçamento Base</div>
                        </CardContent>
                      </Card>
                      
                      <Card className="border-emerald-200 bg-emerald-50/50">
                        <CardContent className="p-4">
                          <div className="text-xs font-medium text-emerald-700 mb-1">Nossa Proposta</div>
                          <div className="text-2xl font-bold text-emerald-900">
                            R$ {(dadosSimulados.valores.empresa / 1000000).toFixed(0)}Mi
                          </div>
                          <div className="text-xs text-emerald-600 mt-1">Valor Estimado</div>
                        </CardContent>
                      </Card>
                      
                      <Card className={`border-2 ${dadosSimulados.valores.delta < 0 ? 'border-emerald-500 bg-emerald-50' : 'border-red-500 bg-red-50'}`}>
                        <CardContent className="p-4">
                          <div className="text-xs font-medium text-muted-foreground mb-1">Delta Global</div>
                          <div className={`text-2xl font-bold flex items-center gap-1 ${dadosSimulados.valores.delta < 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                            {dadosSimulados.valores.delta}%
                            {dadosSimulados.valores.delta < 0 ? '✅' : '⚠️'}
                          </div>
                          <div className={`text-xs mt-1 ${dadosSimulados.valores.delta < 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                            {dadosSimulados.valores.delta < 0 ? 'Economia' : 'Acréscimo'}
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card className="border-purple-200 bg-purple-50/50">
                        <CardContent className="p-4">
                          <div className="text-xs font-medium text-purple-700 mb-1">Margem Bruta</div>
                          <div className="text-2xl font-bold text-purple-900">
                            R$ {(dadosSimulados.valores.margemBruta / 1000000).toFixed(0)}Mi
                          </div>
                          <div className="text-xs text-purple-600 mt-1">{dadosSimulados.valores.margemPercentual}%</div>
                        </CardContent>
                      </Card>
                      
                      <Card className="border-primary bg-primary/10">
                        <CardContent className="p-4">
                          <div className="text-xs font-medium text-primary mb-1">Competitividade</div>
                          <div className="text-2xl font-bold text-primary flex items-center gap-1">
                            Alta 🟢
                          </div>
                          <div className="text-xs text-primary mt-1">Posição Favorável</div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* ===== TABELA COMPARATIVA DETALHADA - EXPANDÍVEL + GRÁFICOS ===== */}
                    <Card>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="flex items-center gap-2">
                              <GitCompare className="w-5 h-5" />
                              Análise Comparativa Detalhada por Categoria
                            </CardTitle>
                            <CardDescription>
                              {modoVisualizacao === 'tabela' 
                                ? 'Breakdown completo: Material, Mão de Obra, Equipamentos e Terceiros | Click para expandir'
                                : 'Visualização gráfica com múltiplas opções de análise'
                              }
                            </CardDescription>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              variant={modoVisualizacao === 'tabela' ? 'default' : 'outline'}
                              onClick={() => setModoVisualizacao('tabela')}
                              className="h-8 gap-1.5"
                            >
                              <FileText className="w-3.5 h-3.5" />
                              Tabela
                            </Button>
                            <Button
                              size="sm"
                              variant={modoVisualizacao === 'grafico' ? 'default' : 'outline'}
                              onClick={() => setModoVisualizacao('grafico')}
                              className="h-8 gap-1.5"
                            >
                              <BarChart3 className="w-3.5 h-3.5" />
                              Gráficos
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        {modoVisualizacao === 'tabela' ? (
                          <div className="space-y-1 overflow-x-auto">
                          {/* Header da Tabela */}
                          <div className="grid grid-cols-[200px_repeat(8,1fr)_80px] gap-2 text-xs font-bold pb-2 border-b-2 bg-muted/50 p-2 rounded-t min-w-[1200px]">
                            <div>Categoria</div>
                            <div className="text-center text-blue-700">Mat (C)</div>
                            <div className="text-center text-blue-700">MO (C)</div>
                            <div className="text-center text-blue-700">Eq (C)</div>
                            <div className="text-center text-blue-700">Ter (C)</div>
                            <div className="text-center text-emerald-700">Mat (N)</div>
                            <div className="text-center text-emerald-700">MO (N)</div>
                            <div className="text-center text-emerald-700">Eq (N)</div>
                            <div className="text-center text-emerald-700">Ter (N)</div>
                            <div className="text-center">Delta</div>
                          </div>
                          
                          {/* Linhas da Tabela */}
                          {dadosSimulados.categorias.map((cat, idx) => (
                            <div key={idx} className="min-w-[1200px]">
                              <div 
                                className={`grid grid-cols-[200px_repeat(8,1fr)_80px] gap-2 text-xs py-3 border-b hover:bg-muted/50 cursor-pointer transition-colors ${
                                  cat.distorcao ? 'bg-amber-50/30' : ''
                                }`}
                                onClick={() => toggleCategoria(cat.nome)}
                              >
                                <div className="font-semibold flex items-center gap-2">
                                  {categoriasExpanded.includes(cat.nome) ? '▼' : '▶'} 
                                  {cat.nome}
                                  {cat.distorcao && <span className="text-amber-600">⚠️</span>}
                                </div>
                                <div className="text-center text-blue-600">{(cat.cliente.material / 1000000).toFixed(1)}M</div>
                                <div className="text-center text-blue-600">{(cat.cliente.maoObra / 1000000).toFixed(1)}M</div>
                                <div className="text-center text-blue-600">{(cat.cliente.equipamentos / 1000000).toFixed(1)}M</div>
                                <div className="text-center text-blue-600">{(cat.cliente.terceiros / 1000000).toFixed(1)}M</div>
                                <div className="text-center text-emerald-600 font-medium">{(cat.empresa.material / 1000000).toFixed(1)}M</div>
                                <div className="text-center text-emerald-600 font-medium">{(cat.empresa.maoObra / 1000000).toFixed(1)}M</div>
                                <div className="text-center text-emerald-600 font-medium">{(cat.empresa.equipamentos / 1000000).toFixed(1)}M</div>
                                <div className="text-center text-emerald-600 font-medium">{(cat.empresa.terceiros / 1000000).toFixed(1)}M</div>
                                <div className={`text-center font-bold ${cat.delta < 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                                  {cat.delta > 0 ? '+' : ''}{cat.delta}%
                                </div>
                              </div>
                              
                              {/* Conteúdo Expandido */}
                              {categoriasExpanded.includes(cat.nome) && (
                                <div className="bg-muted/20 p-4 border-l-4 border-primary ml-4 space-y-2">
                                  <div className="text-xs font-semibold mb-2">Totais por Origem:</div>
                                  <div className="grid grid-cols-2 gap-4">
                                    <div className="p-3 bg-blue-50 rounded border border-blue-200">
                                      <div className="text-xs font-medium text-blue-700 mb-2">Cliente (Orçamento Base)</div>
                                      <div className="space-y-1 text-xs">
                                        <div className="flex justify-between"><span>Material:</span><span className="font-bold">R$ {(cat.cliente.material / 1000000).toFixed(2)}Mi</span></div>
                                        <div className="flex justify-between"><span>Mão de Obra:</span><span className="font-bold">R$ {(cat.cliente.maoObra / 1000000).toFixed(2)}Mi</span></div>
                                        <div className="flex justify-between"><span>Equipamentos:</span><span className="font-bold">R$ {(cat.cliente.equipamentos / 1000000).toFixed(2)}Mi</span></div>
                                        <div className="flex justify-between"><span>Terceiros:</span><span className="font-bold">R$ {(cat.cliente.terceiros / 1000000).toFixed(2)}Mi</span></div>
                                        <div className="flex justify-between pt-1 border-t border-blue-300 font-bold"><span>TOTAL:</span><span>R$ {(cat.cliente.total / 1000000).toFixed(2)}Mi</span></div>
                                      </div>
                                    </div>
                                    
                                    <div className="p-3 bg-emerald-50 rounded border border-emerald-200">
                                      <div className="text-xs font-medium text-emerald-700 mb-2">Nossa Proposta (Estimativa)</div>
                                      <div className="space-y-1 text-xs">
                                        <div className="flex justify-between"><span>Material:</span><span className="font-bold">R$ {(cat.empresa.material / 1000000).toFixed(2)}Mi</span></div>
                                        <div className="flex justify-between"><span>Mão de Obra:</span><span className="font-bold">R$ {(cat.empresa.maoObra / 1000000).toFixed(2)}Mi</span></div>
                                        <div className="flex justify-between"><span>Equipamentos:</span><span className="font-bold">R$ {(cat.empresa.equipamentos / 1000000).toFixed(2)}Mi</span></div>
                                        <div className="flex justify-between"><span>Terceiros:</span><span className="font-bold">R$ {(cat.empresa.terceiros / 1000000).toFixed(2)}Mi</span></div>
                                        <div className="flex justify-between pt-1 border-t border-emerald-300 font-bold"><span>TOTAL:</span><span>R$ {(cat.empresa.total / 1000000).toFixed(2)}Mi</span></div>
                                      </div>
                                    </div>
                                  </div>
                                  
                                  <div className="flex items-center gap-2 text-xs mt-2 p-2 bg-white rounded">
                                    <span className="font-medium">Análise:</span>
                                    <span className={cat.delta < 0 ? 'text-emerald-600' : 'text-red-600'}>
                                      {cat.delta < 0 
                                        ? `Economia de R$ ${((cat.cliente.total - cat.empresa.total) / 1000000).toFixed(2)}Mi identificada`
                                        : `Acréscimo de R$ ${((cat.empresa.total - cat.cliente.total) / 1000000).toFixed(2)}Mi - requer análise`
                                      }
                                    </span>
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                          
                          {/* Total Geral */}
                          <div className="grid grid-cols-[200px_repeat(8,1fr)_80px] gap-2 text-xs py-3 border-t-2 font-bold bg-primary/5 p-2 rounded-b min-w-[1200px]">
                            <div>TOTAL GERAL</div>
                            <div className="text-center">-</div>
                            <div className="text-center">-</div>
                            <div className="text-center">-</div>
                            <div className="text-center text-blue-700">450Mi</div>
                            <div className="text-center">-</div>
                            <div className="text-center">-</div>
                            <div className="text-center">-</div>
                            <div className="text-center text-emerald-700">420Mi</div>
                            <div className="text-center text-emerald-600">{dadosSimulados.valores.delta}%</div>
                          </div>
                        </div>
                        ) : (
                          /* MODO GRÁFICO */
                          <div className="space-y-4">
                            {/* Controles + Insight Integrado */}
                            <div className="flex items-center gap-4 p-3 bg-muted/30 rounded-lg">
                              {/* Seletor de Ranking */}
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium">Ranking:</span>
                                <div className="flex gap-1">
                                  <TooltipProvider>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <Button
                                          size="sm"
                                          variant={rankingTipo === 'servicos' ? 'default' : 'outline'}
                                          onClick={() => setRankingTipo('servicos')}
                                          className="h-8 w-8 p-0"
                                        >
                                          <Building className="w-4 h-4" />
                                        </Button>
                                      </TooltipTrigger>
                                      <TooltipContent>Serviços</TooltipContent>
                                    </Tooltip>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <Button
                                          size="sm"
                                          variant={rankingTipo === 'materiais' ? 'default' : 'outline'}
                                          onClick={() => setRankingTipo('materiais')}
                                          className="h-8 w-8 p-0"
                                        >
                                          <BrickWall className="w-4 h-4" />
                                        </Button>
                                      </TooltipTrigger>
                                      <TooltipContent>Materiais</TooltipContent>
                                    </Tooltip>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <Button
                                          size="sm"
                                          variant={rankingTipo === 'maoObra' ? 'default' : 'outline'}
                                          onClick={() => setRankingTipo('maoObra')}
                                          className="h-8 w-8 p-0"
                                        >
                                          <HardHat className="w-4 h-4" />
                                        </Button>
                                      </TooltipTrigger>
                                      <TooltipContent>Mão de Obra</TooltipContent>
                                    </Tooltip>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <Button
                                          size="sm"
                                          variant={rankingTipo === 'equipamentos' ? 'default' : 'outline'}
                                          onClick={() => setRankingTipo('equipamentos')}
                                          className="h-8 w-8 p-0"
                                        >
                                          <Truck className="w-4 h-4" />
                                        </Button>
                                      </TooltipTrigger>
                                      <TooltipContent>Equipamentos</TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                </div>
                              </div>

                              {/* Divisor */}
                              <div className="h-8 w-px bg-border" />

                              {/* Card de Insight Integrado */}
                              <div className="flex-1 p-2 bg-primary/5 border border-primary/20 rounded">
                                <div className="flex items-start gap-2">
                                  <div className="flex-1 space-y-0.5">
                                    <div className="font-semibold text-primary text-xs">
                                      📊 Ranking Comparativo - Top 10 {rankingTipo === 'servicos' ? 'Serviços' : rankingTipo === 'materiais' ? 'Materiais' : rankingTipo === 'maoObra' ? 'Mão de Obra' : 'Equipamentos'}
                                    </div>
                                    <div className="text-muted-foreground text-xs leading-relaxed">
                                      {getInsightRanking()}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Layout com 2 Colunas: Gráfico + Insights */}
                            <div className="grid grid-cols-[1fr_360px] gap-4">
                              {/* COLUNA ESQUERDA: Gráfico de Ranking */}
                              <div className="h-[580px] w-full bg-gradient-to-br from-white to-muted/20 rounded-lg border border-border/50 shadow-sm p-5">
                                <ResponsiveContainer width="100%" height="100%">
                                  <BarChart
                                  data={getRankingAtual().map(item => ({
                                    nome: item.nome,
                                    Cliente: item.cliente / 1000000,
                                    'Nossa Proposta': item.nossa / 1000000,
                                    delta: item.delta
                                  }))}
                                  layout="vertical"
                                  margin={{ top: 15, right: 100, left: 160, bottom: 20 }}
                                >
                                  <defs>
                                    <linearGradient id="colorCliente" x1="0" y1="0" x2="1" y2="0">
                                      <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.8}/>
                                      <stop offset="100%" stopColor="#3B82F6" stopOpacity={1}/>
                                    </linearGradient>
                                    <linearGradient id="colorNossa" x1="0" y1="0" x2="1" y2="0">
                                      <stop offset="0%" stopColor="#10B981" stopOpacity={0.8}/>
                                      <stop offset="100%" stopColor="#10B981" stopOpacity={1}/>
                                    </linearGradient>
                                  </defs>
                                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.6} />
                                  <XAxis 
                                    type="number" 
                                    tick={{ fontSize: 12, fill: '#6b7280' }} 
                                    label={{ value: 'Valor (R$ Milhões)', position: 'bottom', offset: 0, style: { fontSize: 12, fill: '#374151', fontWeight: 600 } }}
                                    stroke="#9ca3af"
                                  />
                                  <YAxis 
                                    type="category" 
                                    dataKey="nome" 
                                    width={150} 
                                    tick={{ fontSize: 11, fill: '#374151' }}
                                    stroke="#9ca3af"
                                  />
                                  <RechartsTooltip 
                                    contentStyle={{ 
                                      fontSize: 12, 
                                      backgroundColor: 'rgba(255,255,255,0.98)', 
                                      border: '1px solid #d1d5db', 
                                      borderRadius: '8px', 
                                      padding: '10px 12px',
                                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                                    }}
                                    formatter={(value: any, name: string, props: any) => {
                                      const delta = props.payload.delta
                                      if (name === 'Cliente') return [`R$ ${value.toFixed(2)}Mi`, 'Cliente']
                                      if (name === 'Nossa Proposta') return [
                                        <>R$ {value.toFixed(2)}Mi <span style={{ color: delta < 0 ? '#10B981' : '#EF4444', fontWeight: 'bold', marginLeft: '6px' }}>({delta > 0 ? '+' : ''}{delta}%)</span></>,
                                        'Nossa Proposta'
                                      ]
                                      return [value, name]
                                    }}
                                  />
                                  <Legend 
                                    wrapperStyle={{ fontSize: 12, paddingTop: '15px', fontWeight: 500 }}
                                    iconType="circle"
                                  />
                                  <Bar dataKey="Cliente" fill="url(#colorCliente)" radius={[0, 6, 6, 0]} maxBarSize={28} />
                                  <Bar dataKey="Nossa Proposta" fill="url(#colorNossa)" radius={[0, 6, 6, 0]} maxBarSize={28} />
                                </BarChart>
                                </ResponsiveContainer>
                              </div>

                              {/* COLUNA DIREITA: Painel de Insights */}
                              <div className="h-[580px] overflow-y-auto">
                                <div className="p-4 bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-lg shadow-sm">
                                  <div className="flex items-center gap-2 mb-3">
                                    <Lightbulb className="w-5 h-5 text-primary" />
                                    <h4 className="font-semibold text-sm">Análise Detalhada</h4>
                                  </div>
                                  
                                  {/* Top 3 */}
                                  <div className="space-y-2 mb-4">
                                    <div className="text-xs font-medium text-muted-foreground mb-2">🏆 Top 3 Itens</div>
                                    {getRankingAtual().slice(0, 3).map((item, idx) => (
                                      <div key={idx} className="p-2 bg-white/80 rounded border border-border/50">
                                        <div className="flex items-start justify-between gap-2 mb-1">
                                          <span className="text-xs font-medium leading-tight">{idx + 1}. {item.nome}</span>
                                          <Badge variant={item.delta < 0 ? 'default' : 'destructive'} className="text-[10px] h-5">
                                            {item.delta > 0 ? '+' : ''}{item.delta}%
                                          </Badge>
                                        </div>
                                        <div className="grid grid-cols-2 gap-2 text-[10px]">
                                          <div>
                                            <span className="text-muted-foreground">Cliente:</span>
                                            <div className="font-semibold text-blue-600">R$ {(item.cliente / 1000000).toFixed(2)}Mi</div>
                                          </div>
                                          <div>
                                            <span className="text-muted-foreground">Nossa:</span>
                                            <div className="font-semibold text-emerald-600">R$ {(item.nossa / 1000000).toFixed(2)}Mi</div>
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                  </div>

                                  {/* Métricas Consolidadas */}
                                  <div className="p-3 bg-white/80 rounded border border-border/50 space-y-2">
                                    <div className="text-xs font-medium text-muted-foreground mb-2">📊 Métricas Consolidadas</div>
                                    
                                    <div className="flex items-center justify-between text-xs">
                                      <span className="text-muted-foreground">Total Cliente:</span>
                                      <span className="font-semibold text-blue-600">
                                        R$ {(getRankingAtual().reduce((sum, item) => sum + item.cliente, 0) / 1000000).toFixed(1)}Mi
                                      </span>
                                    </div>
                                    
                                    <div className="flex items-center justify-between text-xs">
                                      <span className="text-muted-foreground">Total Nossa Proposta:</span>
                                      <span className="font-semibold text-emerald-600">
                                        R$ {(getRankingAtual().reduce((sum, item) => sum + item.nossa, 0) / 1000000).toFixed(1)}Mi
                                      </span>
                                    </div>

                                    <div className="h-px bg-border my-2" />
                                    
                                    <div className="flex items-center justify-between text-xs">
                                      <span className="font-medium">Economia Total:</span>
                                      <span className="font-bold text-emerald-600">
                                        R$ {((getRankingAtual().reduce((sum, item) => sum + item.cliente, 0) - getRankingAtual().reduce((sum, item) => sum + item.nossa, 0)) / 1000000).toFixed(1)}Mi
                                      </span>
                                    </div>

                                    <div className="flex items-center justify-between text-xs">
                                      <span className="font-medium">Delta Médio:</span>
                                      <Badge variant="default" className="text-[10px]">
                                        {(getRankingAtual().reduce((sum, item) => sum + item.delta, 0) / getRankingAtual().length).toFixed(1)}%
                                      </Badge>
                                    </div>
                                  </div>

                                  {/* Destaques */}
                                  <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded">
                                    <div className="flex items-start gap-2">
                                      <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                                      <div className="text-xs space-y-1">
                                        <div className="font-semibold text-amber-900">Pontos de Atenção:</div>
                                        <ul className="text-amber-700 space-y-0.5 list-disc list-inside">
                                          {getRankingAtual().filter(item => item.delta > 0).length > 0 && (
                                            <li>{getRankingAtual().filter(item => item.delta > 0).length} {getRankingAtual().filter(item => item.delta > 0).length === 1 ? 'item está' : 'itens estão'} acima do cliente</li>
                                          )}
                                          {getRankingAtual().filter(item => item.delta < -5).length > 0 && (
                                            <li>{getRankingAtual().filter(item => item.delta < -5).length} {getRankingAtual().filter(item => item.delta < -5).length === 1 ? 'item apresenta' : 'itens apresentam'} economia {'>'} 5%</li>
                                          )}
                                          <li>Análise técnica recomendada para validação</li>
                                        </ul>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Recomendação Estratégica */}
                                  <div className="mt-3 p-3 bg-primary/10 border border-primary/30 rounded">
                                    <div className="flex items-start gap-2">
                                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                                      <div className="text-xs">
                                        <div className="font-semibold text-primary mb-1">Recomendação:</div>
                                        <p className="text-muted-foreground leading-relaxed">
                                          {getRankingAtual().reduce((sum, item) => sum + item.delta, 0) / getRankingAtual().length < 0 
                                            ? "Proposta competitiva com boa margem de economia. Revisar itens com economia excessiva para garantir viabilidade técnica."
                                            : "Proposta acima do cliente em alguns itens. Avaliar necessidade de otimização para aumentar competitividade."}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>

                  </div>
                )}
                  </CardContent>
                </Card>
              </TabsContent>
              {/* ================================================================
                  TAB 3: ANÁLISE DETALHADA - CURVA ABC
              ================================================================ */}
              <TabsContent 
                value="analise" 
                className={`h-full transition-all duration-300 ${
                  isTransitioning ? 'opacity-0 translate-x-2' : 'opacity-100 translate-x-0'
                }`}
              >
                {/* MOLDURA - Padrão fixo com scroll interno */}
                <Card className="h-full border-0 bg-background overflow-y-auto overflow-x-hidden scrollbar-hide" style={{ borderRadius: '25px', boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.35), 0 2px 8px rgba(0, 0, 0, 0.05)', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                  <CardContent className="p-[25px] space-y-6">
                    <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="w-5 h-5" />
                      Análise Detalhada - Curva ABC
                    </CardTitle>
                    <CardDescription>
                      Identificação dos serviços e recursos principais
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {!dadosImportados ? (
                      <div className="text-center py-12 text-muted-foreground">
                        <BarChart3 className="w-12 h-12 mx-auto mb-3 opacity-50" />
                        <p>Importe os dados primeiro na aba "Importação"</p>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {/* Curva ABC dos Serviços COMPLETA */}
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">Curva ABC dos Serviços</CardTitle>
                            <CardDescription>
                              Classe A: 60% do valor | Classe B: 21% do valor | Classe C: 19% do valor
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-1">
                              {dadosSimulados.curvaABC.map((item, idx) => (
                                <div 
                                  key={idx} 
                                  className={`flex items-center gap-3 p-3 rounded border hover:bg-muted/50 ${
                                    item.classe === 'A' ? 'bg-red-50/30 border-red-200' :
                                    item.classe === 'B' ? 'bg-amber-50/30 border-amber-200' :
                                    'bg-emerald-50/30 border-emerald-200'
                                  }`}
                                >
                                  <Badge className={
                                    item.classe === 'A' ? 'bg-red-500' :
                                    item.classe === 'B' ? 'bg-amber-500' :
                                    'bg-emerald-500'
                                  }>
                                    {item.classe}
                                  </Badge>
                                  <div className="flex-1">
                                    <p className="text-sm font-medium">{item.nome}</p>
                                    <p className="text-xs text-muted-foreground">
                                      {item.percentual}% do valor | Acumulado: {item.acumulado}%
                                    </p>
                                  </div>
                                  <span className="text-base font-bold">
                                    R$ {(item.valor / 1000000).toFixed(1)}Mi
                                  </span>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>

                        {/* Principais Recursos */}
                        <div className="grid grid-cols-2 gap-4">
                          <Card>
                            <CardHeader>
                              <CardTitle className="text-base">Distribuição de Recursos</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-3">
                                <div>
                                  <div className="flex justify-between text-sm mb-1">
                                    <span>Material</span>
                                    <span className="font-bold">{dadosSimulados.recursos.material.percentual}%</span>
                                  </div>
                                  <Progress value={dadosSimulados.recursos.material.percentual} className="h-2" />
                                </div>
                                <div>
                                  <div className="flex justify-between text-sm mb-1">
                                    <span>Mão de Obra</span>
                                    <span className="font-bold">{dadosSimulados.recursos.maoObra.percentual}%</span>
                                  </div>
                                  <Progress value={dadosSimulados.recursos.maoObra.percentual} className="h-2" />
                                </div>
                                <div>
                                  <div className="flex justify-between text-sm mb-1">
                                    <span>Equipamentos</span>
                                    <span className="font-bold">{dadosSimulados.recursos.equipamentos.percentual}%</span>
                                  </div>
                                  <Progress value={dadosSimulados.recursos.equipamentos.percentual} className="h-2" />
                                </div>
                                <div>
                                  <div className="flex justify-between text-sm mb-1">
                                    <span>Terceiros</span>
                                    <span className="font-bold">{dadosSimulados.recursos.terceiros.percentual}%</span>
                                  </div>
                                  <Progress value={dadosSimulados.recursos.terceiros.percentual} className="h-2" />
                                </div>
                              </div>
                            </CardContent>
                          </Card>

                          <Card>
                            <CardHeader>
                              <CardTitle className="text-base">Análise de Mão de Obra</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-2">
                                {dadosSimulados.maoObra.slice(0, 3).map((mo, idx) => (
                                  <div key={idx} className="p-2 border rounded">
                                    <div className="flex justify-between items-start">
                                      <div>
                                        <p className="text-sm font-medium">{mo.funcao}</p>
                                        <p className="text-xs text-muted-foreground">
                                          {mo.quantidade} profissionais | {mo.horas.toLocaleString('pt-BR')}h
                                        </p>
                                      </div>
                                      <Badge variant="outline">{mo.percentual}%</Badge>
                                    </div>
                                    <p className="text-xs font-semibold mt-1">
                                      R$ {(mo.valor / 1000000).toFixed(2)}Mi
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </CardContent>
                          </Card>
                        </div>

                        {/* Materiais Principais */}
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">Análise de Materiais Principais</CardTitle>
                            <CardDescription>Total de R$ {(dadosSimulados.recursos.material.valor / 1000000).toFixed(1)}Mi em materiais</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-2">
                              {dadosSimulados.materiais.map((mat, idx) => (
                                <div key={idx} className={`p-3 border rounded ${
                                  idx === 0 ? 'bg-primary/5 border-primary' : ''
                                }`}>
                                  <div className="flex items-center justify-between">
                                    <div className="flex-1">
                                      <p className="text-sm font-medium">{mat.nome}</p>
                                      <p className="text-xs text-muted-foreground">
                                        {mat.quantidade > 0 
                                          ? `${mat.quantidade.toLocaleString('pt-BR')} ${mat.unidade}`
                                          : 'Diversos'
                                        }
                                      </p>
                                    </div>
                                    <div className="text-right">
                                      <p className="text-base font-bold">
                                        R$ {(mat.valor / 1000000).toFixed(1)}Mi
                                      </p>
                                      <p className="text-xs text-muted-foreground">
                                        {mat.percentual}% do total
                                      </p>
                                    </div>
                                  </div>
                                  <Progress value={mat.percentual} className="h-1 mt-2" />
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    )}
                  </CardContent>
                </Card>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* ================================================================
                  TAB 4: PLANO DE VENDAS
              ================================================================ */}
              <TabsContent 
                value="plano" 
                className={`h-full transition-all duration-300 ${
                  isTransitioning ? 'opacity-0 translate-x-2' : 'opacity-100 translate-x-0'
                }`}
              >
                {/* MOLDURA - Padrão fixo com scroll interno */}
                <Card className="h-full border-0 bg-background overflow-y-auto overflow-x-hidden scrollbar-hide" style={{ borderRadius: '25px', boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.35), 0 2px 8px rgba(0, 0, 0, 0.05)', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                  <CardContent className="p-[25px] space-y-6">
                    <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Lightbulb className="w-5 h-5" />
                      Plano de Vendas
                    </CardTitle>
                    <CardDescription>
                      Alternativas, otimizações e estratégia comercial
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {!dadosImportados ? (
                      <div className="text-center py-12 text-muted-foreground">
                        <Lightbulb className="w-12 h-12 mx-auto mb-3 opacity-50" />
                        <p>Importe os dados e faça a análise primeiro</p>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {/* Resumo de Oportunidades */}
                        <div className="grid grid-cols-3 gap-4">
                          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded text-center">
                            <p className="text-xs text-emerald-700 mb-1">Economia Total Possível</p>
                            <p className="text-2xl font-bold text-emerald-900">
                              R$ {(
                                dadosSimulados.alternativas
                                  .filter(a => a.economia)
                                  .reduce((sum, a) => sum + (a.economia || 0), 0) / 1000000
                              ).toFixed(1)}Mi
                            </p>
                          </div>
                          <div className="p-4 bg-blue-50 border border-blue-200 rounded text-center">
                            <p className="text-xs text-blue-700 mb-1">Redução de Prazo</p>
                            <p className="text-2xl font-bold text-blue-900">
                              {dadosSimulados.alternativas
                                .filter(a => a.reducaoPrazo)
                                .reduce((sum, a) => sum + (a.reducaoPrazo || 0), 0)} meses
                            </p>
                          </div>
                          <div className="p-4 bg-purple-50 border border-purple-200 rounded text-center">
                            <p className="text-xs text-purple-700 mb-1">Alternativas</p>
                            <p className="text-2xl font-bold text-purple-900">
                              {dadosSimulados.alternativas.length}
                            </p>
                          </div>
                        </div>

                        {/* Alternativas Detalhadas */}
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">Alternativas Identificadas</CardTitle>
                            <CardDescription>Oportunidades de otimização técnica e comercial</CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            {dadosSimulados.alternativas.map((alt, idx) => (
                              <div key={idx} className="p-4 border rounded-lg hover:border-primary transition-colors">
                                <div className="flex items-start justify-between mb-2">
                                  <h4 className="font-medium text-base">{alt.titulo}</h4>
                                  <div className="flex gap-2">
                                    {alt.economia > 0 && (
                                      <Badge className="bg-emerald-500">
                                        💰 R$ {(alt.economia / 1000000).toFixed(1)}Mi
                                      </Badge>
                                    )}
                                    {alt.reducaoPrazo && (
                                      <Badge className="bg-blue-500">
                                        ⏱️ -{alt.reducaoPrazo} meses
                                      </Badge>
                                    )}
                                    {alt.reducaoPerda && (
                                      <Badge className="bg-amber-500">
                                        📉 -{alt.reducaoPerda}% perdas
                                      </Badge>
                                    )}
                                  </div>
                                </div>
                                <p className="text-sm text-muted-foreground mb-2">
                                  {alt.descricao}
                                </p>
                                <p className="text-xs text-primary font-medium">
                                  📊 {alt.impacto}
                                </p>
                              </div>
                            ))}
                          </CardContent>
                        </Card>

                        {/* Estratégia Comercial */}
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">Estratégia Comercial</CardTitle>
                            <CardDescription>Defina a abordagem de vendas e negociação</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              <div>
                                <Label>Proposta de Valor Principal</Label>
                                <Input 
                                  placeholder="Ex: Menor prazo com qualidade garantida..." 
                                  defaultValue="Redução de 3 meses no prazo com economia de R$ 23.7Mi mantendo padrão de qualidade"
                                />
                              </div>
                              <div>
                                <Label>Diferenciais Competitivos</Label>
                                <Input 
                                  placeholder="Ex: Experiência em obras similares..." 
                                  defaultValue="Experiência de 8 obras similares + Tecnologia BIM + Parceiros estratégicos"
                                />
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label>Margem Mínima Aceitável</Label>
                                  <Input type="number" defaultValue="10" />
                                </div>
                                <div>
                                  <Label>Margem Desejada</Label>
                                  <Input type="number" defaultValue="15" />
                                </div>
                              </div>
                              <div>
                                <Label>Condições Comerciais Especiais</Label>
                                <Input 
                                  placeholder="Ex: Pagamento em 60 dias..." 
                                  defaultValue="Desconto de 2% para pagamento antecipado | Garantia estendida de 5 anos"
                                />
                              </div>
                              <div>
                                <Label>Riscos Comerciais</Label>
                                <Input 
                                  placeholder="Ex: Concorrência acirrada..." 
                                  defaultValue="Concorrente X com preço 8% menor | Prazo apertado do cliente"
                                />
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        {/* Análise de Competitividade */}
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">Análise de Competitividade</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              <div className="flex items-center justify-between p-3 border rounded">
                                <span className="text-sm">Preço vs. Mercado</span>
                                <Badge className="bg-emerald-500">Competitivo (-6.7%)</Badge>
                              </div>
                              <div className="flex items-center justify-between p-3 border rounded">
                                <span className="text-sm">Prazo de Execução</span>
                                <Badge className="bg-blue-500">Otimizado (-15%)</Badge>
                              </div>
                              <div className="flex items-center justify-between p-3 border rounded">
                                <span className="text-sm">Qualidade Técnica</span>
                                <Badge className="bg-purple-500">Superior</Badge>
                              </div>
                              <div className="flex items-center justify-between p-3 border rounded">
                                <span className="text-sm">Capacidade Financeira</span>
                                <Badge className="bg-green-500">Adequada</Badge>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    )}
                  </CardContent>
                </Card>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* ================================================================
                  TAB 5: CENÁRIO ECONÔMICO
              ================================================================ */}
              <TabsContent 
                value="economico" 
                className={`h-full transition-all duration-300 ${
                  isTransitioning ? 'opacity-0 translate-x-2' : 'opacity-100 translate-x-0'
                }`}
              >
                {/* MOLDURA - Padrão fixo com scroll interno */}
                <Card className="h-full border-0 bg-background overflow-y-auto overflow-x-hidden scrollbar-hide" style={{ borderRadius: '25px', boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.35), 0 2px 8px rgba(0, 0, 0, 0.05)', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                  <CardContent className="p-[25px] space-y-6">
                    {/* Resumo Rápido */}
                    <Card className="border-2 border-primary">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calculator className="w-5 h-5" />
                      Resumo Econômico
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-5 gap-4">
                      <div className="text-center p-3 bg-blue-50 border border-blue-200 rounded">
                        <p className="text-xs text-blue-700 mb-1">Custo Total</p>
                        <p className="text-lg font-bold text-blue-900">{formatCurrency(custoTotal)}</p>
                      </div>
                      <div className="text-center p-3 bg-amber-50 border border-amber-200 rounded">
                        <p className="text-xs text-amber-700 mb-1">Impostos</p>
                        <p className="text-lg font-bold text-amber-900">{formatCurrency(valorImpostos)}</p>
                      </div>
                      <div className="text-center p-3 bg-purple-50 border border-purple-200 rounded">
                        <p className="text-xs text-purple-700 mb-1">DAG</p>
                        <p className="text-lg font-bold text-purple-900">{formatCurrency(valorDAG)}</p>
                      </div>
                      <div className="text-center p-3 bg-emerald-50 border border-emerald-200 rounded">
                        <p className="text-xs text-emerald-700 mb-1">Margem</p>
                        <p className="text-lg font-bold text-emerald-900">{formatCurrency(valorMargem)}</p>
                      </div>
                      <div className="text-center p-3 bg-primary/10 border-2 border-primary rounded">
                        <p className="text-xs text-primary mb-1">Valor Proposta</p>
                        <p className="text-xl font-black text-primary">{formatCurrency(valorProposta)}</p>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center justify-center gap-6 text-sm">
                      <div>
                        <span className="text-muted-foreground">BDI Calculado: </span>
                        <span className="font-bold text-lg">{formatPercent(bdi)}</span>
                      </div>
                      <div className="h-4 w-px bg-border" />
                      <div>
                        <span className="text-muted-foreground">Margem Líquida: </span>
                        <span className="font-bold text-lg text-emerald-600">{margem}%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-2 gap-6">
                  {/* Custos Diretos */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Custos Diretos</CardTitle>
                      <CardDescription>Custos diretamente relacionados à execução</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="material">Material</Label>
                        <Input
                          id="material"
                          type="text"
                          placeholder="R$ 0,00"
                          value={material}
                          onChange={(e) => setMaterial(e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="mao-obra">Mão de Obra</Label>
                        <Input
                          id="mao-obra"
                          type="text"
                          placeholder="R$ 0,00"
                          value={maoObra}
                          onChange={(e) => setMaoObra(e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="equipamentos">Equipamentos</Label>
                        <Input
                          id="equipamentos"
                          type="text"
                          placeholder="R$ 0,00"
                          value={equipamentos}
                          onChange={(e) => setEquipamentos(e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="terceiros">Serviços de Terceiros</Label>
                        <Input
                          id="terceiros"
                          type="text"
                          placeholder="R$ 0,00"
                          value={servTerceiros}
                          onChange={(e) => setServTerceiros(e.target.value)}
                        />
                      </div>
                      <div className="pt-3 border-t">
                        <div className="flex justify-between items-center">
                          <span className="font-semibold">Subtotal Direto:</span>
                          <span className="text-xl font-bold text-blue-600">{formatCurrency(custoDireto)}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Custos Indiretos */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Custos Indiretos</CardTitle>
                      <CardDescription>Custos de apoio e estrutura</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="adm-obra">Administração da Obra</Label>
                        <Input
                          id="adm-obra"
                          type="text"
                          placeholder="R$ 0,00"
                          value={administracaoObra}
                          onChange={(e) => setAdministracaoObra(e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="mobilizacao">Mobilização/Desmobilização</Label>
                        <Input
                          id="mobilizacao"
                          type="text"
                          placeholder="R$ 0,00"
                          value={mobilizacao}
                          onChange={(e) => setMobilizacao(e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="canteiro">Canteiro de Obras</Label>
                        <Input
                          id="canteiro"
                          type="text"
                          placeholder="R$ 0,00"
                          value={canteiro}
                          onChange={(e) => setCanteiro(e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="engenharia">Engenharia/Gestão</Label>
                        <Input
                          id="engenharia"
                          type="text"
                          placeholder="R$ 0,00"
                          value={engenharia}
                          onChange={(e) => setEngenharia(e.target.value)}
                        />
                      </div>
                      <div className="pt-3 border-t">
                        <div className="flex justify-between items-center">
                          <span className="font-semibold">Subtotal Indireto:</span>
                          <span className="text-xl font-bold text-amber-600">{formatCurrency(custoIndireto)}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Impostos e Margem */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Impostos, DAG e Margem</CardTitle>
                    <CardDescription>Percentuais aplicados sobre o custo total</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-6">
                      <div>
                        <Label htmlFor="impostos">Impostos (%)</Label>
                        <Input
                          id="impostos"
                          type="text"
                          placeholder="5.93"
                          value={impostos}
                          onChange={(e) => setImpostos(e.target.value)}
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          Valor: {formatCurrency(valorImpostos)}
                        </p>
                      </div>
                      <div>
                        <Label htmlFor="dag">DAG - Despesas Administrativas (%)</Label>
                        <Input
                          id="dag"
                          type="text"
                          placeholder="3"
                          value={dag}
                          onChange={(e) => setDag(e.target.value)}
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          Valor: {formatCurrency(valorDAG)}
                        </p>
                      </div>
                      <div>
                        <Label htmlFor="margem">Margem Desejada (%)</Label>
                        <Input
                          id="margem"
                          type="text"
                          placeholder="12"
                          value={margem}
                          onChange={(e) => setMargem(e.target.value)}
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          Valor: {formatCurrency(valorMargem)}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Indicadores de Performance */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <TrendingUp className="w-5 h-5" />
                      Indicadores de Performance
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-4 gap-4">
                      <div className="p-4 border rounded-lg">
                        <p className="text-sm text-muted-foreground mb-1">% Custo Direto</p>
                        <p className="text-2xl font-bold">{custoTotal > 0 ? formatPercent((custoDireto / custoTotal) * 100) : '0%'}</p>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <p className="text-sm text-muted-foreground mb-1">% Custo Indireto</p>
                        <p className="text-2xl font-bold">{custoTotal > 0 ? formatPercent((custoIndireto / custoTotal) * 100) : '0%'}</p>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <p className="text-sm text-muted-foreground mb-1">BDI Total</p>
                        <p className="text-2xl font-bold text-primary">{formatPercent(bdi)}</p>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <p className="text-sm text-muted-foreground mb-1">Margem Líquida</p>
                        <p className="text-2xl font-bold text-emerald-600">{margem}%</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Análise de Viabilidade (6 Pilares) - MOVIDO DO RESUMO */}
                <Card className="border-2 border-emerald-200">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center justify-between">
                      Análise de Viabilidade (6 Pilares)
                      <Badge className="bg-emerald-500">VIÁVEL</Badge>
                    </CardTitle>
                    <CardDescription>Avaliação Corporativa - Média: 7.5/10</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Scores dos Pilares */}
                      <div className="grid grid-cols-3 gap-3">
                        <div className="flex items-center justify-between p-4 border rounded-lg bg-blue-50/50">
                          <span className="text-sm font-medium">Técnica</span>
                          <span className="text-2xl font-bold text-blue-600">8.0</span>
                        </div>
                        <div className="flex items-center justify-between p-4 border rounded-lg bg-emerald-50/50">
                          <span className="text-sm font-medium">Operacional</span>
                          <span className="text-2xl font-bold text-emerald-600">7.0</span>
                        </div>
                        <div className="flex items-center justify-between p-4 border rounded-lg bg-green-50/50">
                          <span className="text-sm font-medium">Financeira</span>
                          <span className="text-2xl font-bold text-green-600">9.0</span>
                        </div>
                        <div className="flex items-center justify-between p-4 border rounded-lg bg-amber-50/50">
                          <span className="text-sm font-medium">Econômica</span>
                          <span className="text-2xl font-bold text-amber-600">6.0</span>
                        </div>
                        <div className="flex items-center justify-between p-4 border rounded-lg bg-purple-50/50">
                          <span className="text-sm font-medium">Jurídica</span>
                          <span className="text-2xl font-bold text-purple-600">8.0</span>
                        </div>
                        <div className="flex items-center justify-between p-4 border rounded-lg bg-orange-50/50">
                          <span className="text-sm font-medium">Risco</span>
                          <span className="text-2xl font-bold text-orange-600">7.0</span>
                        </div>
                      </div>

                      <div className="mt-4 p-4 bg-emerald-50 border-2 border-emerald-300 rounded-lg">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                          <span className="text-base font-semibold text-emerald-900">
                            Projeto estratégico alinhado com objetivos corporativos
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* ================================================================
                  TAB 6: ANÁLISE TÉCNICA
              ================================================================ */}
              <TabsContent 
                value="tecnico" 
                className={`h-full transition-all duration-300 ${
                  isTransitioning ? 'opacity-0 translate-x-2' : 'opacity-100 translate-x-0'
                }`}
              >
                {/* MOLDURA - Padrão fixo com scroll interno */}
                <Card className="h-full border-0 bg-background overflow-y-auto overflow-x-hidden scrollbar-hide" style={{ borderRadius: '25px', boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.35), 0 2px 8px rgba(0, 0, 0, 0.05)', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                  <CardContent className="p-[25px] space-y-6">
                    <Card>
                  <CardHeader>
                    <CardTitle>Análise Técnica</CardTitle>
                    <CardDescription>Capacidade técnica e recursos necessários</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h4 className="font-semibold">Capacidade Técnica</h4>
                        <div>
                          <Label>Equipe Técnica Necessária</Label>
                          <Input placeholder="Ex: 2 Engenheiros, 5 Técnicos..." />
                        </div>
                        <div>
                          <Label>Tecnologia/Metodologia</Label>
                          <Input placeholder="Ex: Concreto protendido, Método executivo..." />
                        </div>
                        <div>
                          <Label>Equipamentos Especiais</Label>
                          <Input placeholder="Ex: Guindaste 100t, Bate-estaca..." />
                        </div>
                      </div>
                      <div className="space-y-4">
                        <h4 className="font-semibold">Prazo e Cronograma</h4>
                        <div>
                          <Label>Prazo Técnico Estimado</Label>
                          <Input type="number" placeholder="Meses" />
                        </div>
                        <div>
                          <Label>Prazo Contratual</Label>
                          <Input type="number" placeholder="Meses" />
                        </div>
                        <div>
                          <Label>Folga/Contingência</Label>
                          <Input type="number" placeholder="%" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* ================================================================
                  TAB 7: ANÁLISE OPERACIONAL
              ================================================================ */}
              <TabsContent 
                value="operacional" 
                className={`h-full transition-all duration-300 ${
                  isTransitioning ? 'opacity-0 translate-x-2' : 'opacity-100 translate-x-0'
                }`}
              >
                {/* MOLDURA - Padrão fixo com scroll interno */}
                <Card className="h-full border-0 bg-background overflow-y-auto overflow-x-hidden scrollbar-hide" style={{ borderRadius: '25px', boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.35), 0 2px 8px rgba(0, 0, 0, 0.05)', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                  <CardContent className="p-[25px] space-y-6">
                    <Card>
                  <CardHeader>
                    <CardTitle>Análise Operacional</CardTitle>
                    <CardDescription>Logística, fornecedores e execução</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h4 className="font-semibold">Logística</h4>
                        <div>
                          <Label>Acesso ao Local</Label>
                          <Input placeholder="Condições de acesso..." />
                        </div>
                        <div>
                          <Label>Transporte de Materiais</Label>
                          <Input placeholder="Distância, modalidade..." />
                        </div>
                      </div>
                      <div className="space-y-4">
                        <h4 className="font-semibold">Fornecedores</h4>
                        <div>
                          <Label>Fornecedores Principais</Label>
                          <Input placeholder="Principais fornecedores..." />
                        </div>
                        <div>
                          <Label>Alternativas</Label>
                          <Input placeholder="Fornecedores alternativos..." />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* ================================================================
                  TAB 8: ANÁLISE DE RISCOS
              ================================================================ */}
              <TabsContent 
                value="riscos" 
                className={`h-full transition-all duration-300 ${
                  isTransitioning ? 'opacity-0 translate-x-2' : 'opacity-100 translate-x-0'
                }`}
              >
                {/* MOLDURA - Padrão fixo com scroll interno */}
                <Card className="h-full border-0 bg-background overflow-y-auto overflow-x-hidden scrollbar-hide" style={{ borderRadius: '25px', boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.35), 0 2px 8px rgba(0, 0, 0, 0.05)', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                  <CardContent className="p-[25px] space-y-6">
                    {/* Resumo de Riscos - MOVIDO DO RESUMO */}
                    <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Resumo de Riscos</CardTitle>
                    <CardDescription>Classificação e quantificação dos riscos identificados</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-4 gap-4 mb-6">
                      <div className="text-center p-4 bg-emerald-50 border-2 border-emerald-200 rounded-lg">
                        <p className="text-4xl font-bold text-emerald-600">0</p>
                        <p className="text-sm font-medium text-emerald-700 mt-1">Baixo</p>
                      </div>
                      <div className="text-center p-4 bg-amber-50 border-2 border-amber-200 rounded-lg">
                        <p className="text-4xl font-bold text-amber-600">1</p>
                        <p className="text-sm font-medium text-amber-700 mt-1">Médio</p>
                      </div>
                      <div className="text-center p-4 bg-orange-50 border-2 border-orange-200 rounded-lg">
                        <p className="text-4xl font-bold text-orange-600">0</p>
                        <p className="text-sm font-medium text-orange-700 mt-1">Alto</p>
                      </div>
                      <div className="text-center p-4 bg-red-50 border-2 border-red-200 rounded-lg">
                        <p className="text-4xl font-bold text-red-600">0</p>
                        <p className="text-sm font-medium text-red-700 mt-1">Crítico</p>
                      </div>
                    </div>
                    <div className="p-4 bg-amber-50 border-2 border-amber-300 rounded-lg">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5" />
                        <div className="flex-1">
                          <p className="text-sm font-bold text-amber-900 mb-2">Risco Identificado:</p>
                          <p className="text-base font-medium text-amber-900">Atraso em licenças ambientais</p>
                          <p className="text-sm text-amber-800 mt-2">
                            <span className="font-medium">Mitigação:</span> Antecipar processos de licenciamento com 90 dias de antecedência
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Riscos Detalhados */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Riscos Detalhados por Categoria</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="p-4 border-2 border-amber-200 rounded-lg bg-amber-50/30">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <Badge className="bg-amber-500 mb-2">Médio</Badge>
                            <p className="font-semibold text-base">Licenciamento Ambiental</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-muted-foreground">Probabilidade</p>
                            <p className="text-lg font-bold text-amber-600">3/5</p>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          Possível atraso na obtenção de licenças ambientais devido à complexidade do projeto
                        </p>
                        <div className="mt-3 p-2 bg-white rounded border">
                          <p className="text-xs font-medium">Ação de Mitigação:</p>
                          <p className="text-sm">Iniciar processos com 90 dias de antecedência e manter contato direto com órgãos ambientais</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* ================================================================
                  TAB 9: SÍNTESE & DECISÃO
              ================================================================ */}
              <TabsContent 
                value="sintese" 
                className={`h-full transition-all duration-300 ${
                  isTransitioning ? 'opacity-0 translate-x-2' : 'opacity-100 translate-x-0'
                }`}
              >
                {/* MOLDURA - Padrão fixo com scroll interno */}
                <Card className="h-full border-0 bg-background overflow-y-auto overflow-x-hidden scrollbar-hide" style={{ borderRadius: '25px', boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.35), 0 2px 8px rgba(0, 0, 0, 0.05)', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                  <CardContent className="p-[25px] space-y-6">
                    <Card className="border-2 border-primary">
                  <CardHeader>
                    <CardTitle className="text-xl">Síntese da Proposta</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Dashboard Consolidado */}
                    <div className="grid grid-cols-3 gap-4">
                      <div className="p-6 bg-blue-50 border-2 border-blue-200 rounded-lg text-center">
                        <p className="text-sm text-blue-700 mb-2">Valor da Proposta</p>
                        <p className="text-3xl font-black text-blue-900">{formatCurrency(valorProposta)}</p>
                      </div>
                      <div className="p-6 bg-emerald-50 border-2 border-emerald-200 rounded-lg text-center">
                        <p className="text-sm text-emerald-700 mb-2">Margem Líquida</p>
                        <p className="text-3xl font-black text-emerald-900">{margem}%</p>
                      </div>
                      <div className="p-6 bg-amber-50 border-2 border-amber-200 rounded-lg text-center">
                        <p className="text-sm text-amber-700 mb-2">BDI</p>
                        <p className="text-3xl font-black text-amber-900">{formatPercent(bdi)}</p>
                      </div>
                    </div>

                    {/* Recomendação */}
                    <div className="p-6 bg-emerald-50 border-2 border-emerald-300 rounded-lg">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-emerald-600 mt-1" />
                        <div>
                          <h4 className="font-bold text-emerald-900 mb-2">Recomendação</h4>
                          <p className="text-sm text-emerald-800">
                            Com base na análise econômica, técnica e operacional, a proposta apresenta 
                            viabilidade positiva com margem adequada e riscos gerenciáveis.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Decisão Final */}
                    <div className="pt-6 border-t">
                      <h4 className="font-bold mb-4 text-center text-lg">Decisão Final</h4>
                      <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
                        <Button 
                          size="lg" 
                          className="h-20 text-lg"
                          onClick={() => {
                            toast.success("Decisão registrada: IR para a proposta!")
                            router.push(`/corporativo/comercial/propostas/${id}`)
                          }}
                        >
                          <CheckCircle2 className="w-6 h-6 mr-2" />
                          IR - Participar da Proposta
                        </Button>
                        <Button 
                          size="lg" 
                          variant="destructive"
                          className="h-20 text-lg"
                          onClick={() => {
                            toast.info("Decisão registrada: NÃO IR")
                            router.push("/corporativo/comercial/propostas")
                          }}
                        >
                          <AlertTriangle className="w-6 h-6 mr-2" />
                          NÃO IR - Declinar
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
            </div>

            {/* SIDEBAR CALENDÁRIO - FIXO À DIREITA */}
            <div>
              {/* Calendário */}
              <Card className="sticky top-4">
                <CardHeader className="p-3 pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Calendário e Tarefas
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-3 pt-0 space-y-3">
                  {/* Mini Calendário */}
                  <div className="p-2 bg-muted/30 rounded-lg">
                    <div className="text-center mb-1.5">
                      <p className="text-xs font-semibold">Janeiro 2026</p>
                    </div>
                    <div className="grid grid-cols-7 gap-0.5 text-[10px] text-center">
                      <div className="text-muted-foreground font-medium">D</div>
                      <div className="text-muted-foreground font-medium">S</div>
                      <div className="text-muted-foreground font-medium">T</div>
                      <div className="text-muted-foreground font-medium">Q</div>
                      <div className="text-muted-foreground font-medium">Q</div>
                      <div className="text-muted-foreground font-medium">S</div>
                      <div className="text-muted-foreground font-medium">S</div>
                      
                      <div className="p-1"></div>
                      <div className="p-1"></div>
                      <div className="p-1"></div>
                      <div className="p-1">1</div>
                      <div className="p-1">2</div>
                      <div className="p-1">3</div>
                      <div className="p-1">4</div>
                      
                      <div className="p-1 bg-blue-100 text-blue-700 rounded font-medium">5</div>
                      <div className="p-1">6</div>
                      <div className="p-1">7</div>
                      <div className="p-1">8</div>
                      <div className="p-1 bg-primary text-white rounded font-bold">9</div>
                      <div className="p-1">10</div>
                      <div className="p-1">11</div>
                      
                      <div className="p-1">12</div>
                      <div className="p-1">13</div>
                      <div className="p-1">14</div>
                      <div className="p-1 bg-amber-100 text-amber-700 rounded font-medium">15</div>
                      <div className="p-1">16</div>
                      <div className="p-1">17</div>
                      <div className="p-1 bg-blue-100 text-blue-700 rounded font-medium">18</div>
                      
                      <div className="p-1">19</div>
                      <div className="p-1 bg-amber-100 text-amber-700 rounded font-medium">20</div>
                      <div className="p-1">21</div>
                      <div className="p-1 bg-red-100 text-red-700 rounded font-medium">22</div>
                      <div className="p-1">23</div>
                      <div className="p-1">24</div>
                      <div className="p-1 bg-amber-100 text-amber-700 rounded font-medium">25</div>
                      
                      <div className="p-1">26</div>
                      <div className="p-1">27</div>
                      <div className="p-1">28</div>
                      <div className="p-1">29</div>
                      <div className="p-1">30</div>
                      <div className="p-1">31</div>
                    </div>
                  </div>

                  {/* Eventos Próximos */}
                  <div>
                    <h4 className="text-xs font-semibold mb-1.5 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      Eventos Próximos
                    </h4>
                    <div className="space-y-1">
                      <div className="p-1.5 bg-blue-50 border border-blue-200 rounded text-[11px]">
                        <div className="flex items-center justify-between mb-0.5">
                          <span className="font-medium text-blue-900">Entrega Edital</span>
                          <Badge className="bg-blue-500 text-[9px] h-3.5 px-1.5">05/01</Badge>
                        </div>
                        <p className="text-blue-700 text-[10px]">Documento recebido ✓</p>
                      </div>

                      <div className="p-1.5 bg-amber-50 border border-amber-200 rounded text-[11px]">
                        <div className="flex items-center justify-between mb-0.5">
                          <span className="font-medium text-amber-900">Visita Técnica</span>
                          <Badge className="bg-amber-500 text-[9px] h-3.5 px-1.5">20/01</Badge>
                        </div>
                        <p className="text-amber-700 text-[10px]">14h • Canteiro da Obra</p>
                      </div>

                      <div className="p-1.5 bg-red-50 border border-red-200 rounded text-[11px]">
                        <div className="flex items-center justify-between mb-0.5">
                          <span className="font-medium text-red-900">Envio Proposta</span>
                          <Badge className="bg-red-500 text-[9px] h-3.5 px-1.5">15/03</Badge>
                        </div>
                        <p className="text-red-700 text-[10px]">Prazo final do cliente</p>
                      </div>
                    </div>
                  </div>

                  {/* Tarefas */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <h4 className="text-xs font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        Tarefas ({tarefas.filter(t => !t.concluida).length})
                      </h4>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="h-5 w-5 p-0"
                        onClick={() => setDialogNovaTarefaAberto(true)}
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>
                    <div className="space-y-1.5 max-h-[280px] overflow-y-auto">
                      {tarefas.map((tarefa) => (
                        <div 
                          key={tarefa.id}
                          className={`p-1.5 border rounded text-[11px] ${
                            tarefa.concluida 
                              ? 'bg-emerald-50 border-emerald-200 opacity-60' 
                              : 'bg-white border-border'
                          }`}
                        >
                          <div className="flex items-start gap-1.5">
                            <input 
                              type="checkbox" 
                              checked={tarefa.concluida}
                              onChange={() => {
                                setTarefas(tarefas.map(t => 
                                  t.id === tarefa.id ? { ...t, concluida: !t.concluida } : t
                                ))
                              }}
                              className="mt-0.5 w-3 h-3"
                            />
                            <div className="flex-1">
                              <p className={`font-medium ${tarefa.concluida ? 'line-through' : ''}`}>
                                {tarefa.titulo}
                              </p>
                              <div className="flex items-center gap-1.5 mt-0.5 text-[9px] text-muted-foreground">
                                <span className="flex items-center gap-0.5">
                                  <Calendar className="w-2.5 h-2.5" />
                                  {tarefa.data}
                                </span>
                                <span className="flex items-center gap-0.5">
                                  <User className="w-2.5 h-2.5" />
                                  {tarefa.responsavel}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Botão Nova Tarefa */}
                  <Button 
                    size="sm" 
                    className="w-full gap-2"
                    onClick={() => setDialogNovaTarefaAberto(true)}
                  >
                    <Plus className="w-4 h-4" />
                    Nova Tarefa
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* ================================================================
          DIALOG DE IMPORTAÇÃO
      ================================================================ */}
      <Dialog open={dialogImportacaoAberto} onOpenChange={setDialogImportacaoAberto}>
        <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Upload className="w-5 h-5" />
              Importação e Processamento de Dados
            </DialogTitle>
            <DialogDescription>
              Importe a planilha do cliente e o estudo comercial da empresa para análise
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 mt-4">
            <div className="grid grid-cols-2 gap-8">
              {/* Upload Planilha Cliente */}
              <Card className="border-2 border-dashed border-blue-300">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <FileSpreadsheet className="w-5 h-5 text-blue-600" />
                    Planilha do Cliente
                  </CardTitle>
                  <CardDescription>Edital, orçamento base, especificações</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border-2 border-dashed rounded-lg p-12 text-center bg-blue-50/50">
                      <input
                        type="file"
                        id="upload-cliente-dialog"
                        className="hidden"
                        accept=".xlsx,.xls,.csv"
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) handleUploadCliente(file)
                        }}
                      />
                      <FileSpreadsheet className="w-20 h-20 mx-auto text-blue-500 mb-4" />
                      <p className="text-base font-medium mb-2">Arraste o arquivo ou</p>
                      <Button 
                        variant="outline" 
                        size="lg"
                        onClick={() => document.getElementById('upload-cliente-dialog')?.click()}
                        className="gap-2"
                      >
                        <Upload className="w-4 h-4" />
                        Selecionar Arquivo
                      </Button>
                      <p className="text-xs text-muted-foreground mt-3">
                        Formatos aceitos: Excel (.xlsx, .xls), CSV
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Tamanho máximo: 10MB
                      </p>
                    </div>
                    {planilhaCliente && (
                      <div className="p-4 bg-blue-50 border-2 border-blue-200 rounded-lg flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <CheckCircle2 className="w-5 h-5 text-blue-600" />
                          <div>
                            <p className="text-sm font-semibold">{planilhaCliente.name}</p>
                            <p className="text-xs text-muted-foreground">Arquivo carregado com sucesso</p>
                          </div>
                        </div>
                        <Badge className="bg-blue-600">
                          ✓ OK
                        </Badge>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Upload Estudo Empresa */}
              <Card className="border-2 border-dashed border-emerald-300">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <FileSpreadsheet className="w-5 h-5 text-emerald-600" />
                    Estudo Comercial da Empresa
                  </CardTitle>
                  <CardDescription>Nossa análise inicial, levantamento prévio</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border-2 border-dashed rounded-lg p-12 text-center bg-emerald-50/50">
                      <input
                        type="file"
                        id="upload-empresa-dialog"
                        className="hidden"
                        accept=".xlsx,.xls,.csv"
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) handleUploadEmpresa(file)
                        }}
                      />
                      <FileSpreadsheet className="w-20 h-20 mx-auto text-emerald-500 mb-4" />
                      <p className="text-base font-medium mb-2">Arraste o arquivo ou</p>
                      <Button 
                        variant="outline" 
                        size="lg"
                        onClick={() => document.getElementById('upload-empresa-dialog')?.click()}
                        className="gap-2"
                      >
                        <Upload className="w-4 h-4" />
                        Selecionar Arquivo
                      </Button>
                      <p className="text-xs text-muted-foreground mt-3">
                        Formatos aceitos: Excel (.xlsx, .xls), CSV
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Tamanho máximo: 10MB
                      </p>
                    </div>
                    {planilhaEmpresa && (
                      <div className="p-4 bg-emerald-50 border-2 border-emerald-200 rounded-lg flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                          <div>
                            <p className="text-sm font-semibold">{planilhaEmpresa.name}</p>
                            <p className="text-xs text-muted-foreground">Arquivo carregado com sucesso</p>
                          </div>
                        </div>
                        <Badge className="bg-emerald-600">
                          ✓ OK
                        </Badge>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Botão Processar */}
            <div className="flex justify-center pt-6">
              <Button 
                size="lg" 
                onClick={() => {
                  processarImportacao()
                  setTimeout(() => setDialogImportacaoAberto(false), 2000)
                }}
                disabled={!planilhaCliente || !planilhaEmpresa || dadosImportados}
                className="gap-2 h-14 px-8 text-base"
              >
                {dadosImportados ? (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    Dados Importados com Sucesso
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Processar e Importar Dados
                  </>
                )}
              </Button>
            </div>

            {dadosImportados && (
              <div className="p-5 bg-emerald-50 border-2 border-emerald-300 rounded-lg text-center">
                <CheckCircle2 className="w-8 h-8 mx-auto text-emerald-600 mb-2" />
                <p className="text-base font-semibold text-emerald-900">
                  Dados processados e prontos para análise comparativa
                </p>
                <p className="text-sm text-emerald-700 mt-1">
                  O dialog será fechado automaticamente...
                </p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* ================================================================
          DIALOG DE NOVA TAREFA/EVENTO
      ================================================================ */}
      <Dialog open={dialogNovaTarefaAberto} onOpenChange={setDialogNovaTarefaAberto}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Nova Tarefa
            </DialogTitle>
            <DialogDescription>
              Crie uma nova tarefa ou evento para esta proposta
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            <div>
              <Label htmlFor="tipo-tarefa">Tipo</Label>
              <select 
                id="tipo-tarefa"
                className="w-full mt-1 p-2 border rounded-md"
              >
                <option value="tarefa">Tarefa</option>
                <option value="evento">Evento</option>
                <option value="marco">Marco/Deadline</option>
              </select>
            </div>

            <div>
              <Label htmlFor="titulo-tarefa">Título</Label>
              <Input 
                id="titulo-tarefa"
                placeholder="Ex: Revisar planilha orçamentária"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="data-tarefa">Data</Label>
              <Input 
                id="data-tarefa"
                type="date"
                defaultValue="2026-01-15"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="responsavel-tarefa">Responsável</Label>
              <select 
                id="responsavel-tarefa"
                className="w-full mt-1 p-2 border rounded-md"
              >
                <option value="">Selecione...</option>
                <option value="joao">João Silva</option>
                <option value="maria">Maria Santos</option>
                <option value="pedro">Pedro Alves</option>
                <option value="ana">Ana Costa</option>
              </select>
            </div>

            <div>
              <Label htmlFor="descricao-tarefa">Descrição (opcional)</Label>
              <Input 
                id="descricao-tarefa"
                placeholder="Detalhes adicionais..."
                className="mt-1"
              />
            </div>

            <div className="flex gap-2 pt-4">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => setDialogNovaTarefaAberto(false)}
              >
                Cancelar
              </Button>
              <Button 
                className="flex-1"
                onClick={() => {
                  toast.success("Tarefa criada com sucesso!")
                  setDialogNovaTarefaAberto(false)
                }}
              >
                Criar Tarefa
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Dialog Upload Documento Cliente */}
      <Dialog open={dialogUploadCliente} onOpenChange={setDialogUploadCliente}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Upload className="w-5 h-5 text-blue-600" />
              Importar Documento do Cliente
            </DialogTitle>
            <DialogDescription>
              Faça upload de documentos recebidos do cliente (PDF, Word, Excel)
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            <div className="border-2 border-dashed border-blue-300 rounded-lg p-8 text-center bg-blue-50/30">
              <input
                type="file"
                id="upload-doc-cliente"
                className="hidden"
                accept=".pdf,.doc,.docx,.xls,.xlsx"
                onChange={handleFileSelect}
              />
              <FileText className="w-16 h-16 mx-auto text-blue-500 mb-3" />
              <p className="text-sm font-medium mb-2">
                {arquivoSelecionado ? arquivoSelecionado.name : "Selecione um arquivo"}
              </p>
              <Button 
                variant="outline" 
                onClick={() => document.getElementById('upload-doc-cliente')?.click()}
                className="gap-2 border-blue-200 text-blue-600 hover:bg-blue-50"
              >
                <Upload className="w-4 h-4" />
                Escolher Arquivo
              </Button>
              <p className="text-xs text-muted-foreground mt-3">
                PDF, Word, Excel • Máximo 10MB
              </p>
            </div>

            <div className="flex gap-2">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => {
                  setDialogUploadCliente(false)
                  setArquivoSelecionado(null)
                }}
              >
                Cancelar
              </Button>
              <Button 
                className="flex-1 bg-blue-600 hover:bg-blue-700"
                onClick={handleUploadDocumentoCliente}
                disabled={!arquivoSelecionado}
              >
                <Upload className="w-4 h-4 mr-2" />
                Importar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Dialog Upload Documento Proposta */}
      <Dialog open={dialogUploadProposta} onOpenChange={setDialogUploadProposta}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Upload className="w-5 h-5 text-emerald-600" />
              Importar Documento da Proposta
            </DialogTitle>
            <DialogDescription>
              Faça upload de documentos da nossa proposta (PDF, Word, Excel)
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            <div className="border-2 border-dashed border-emerald-300 rounded-lg p-8 text-center bg-emerald-50/30">
              <input
                type="file"
                id="upload-doc-proposta"
                className="hidden"
                accept=".pdf,.doc,.docx,.xls,.xlsx"
                onChange={handleFileSelect}
              />
              <FileText className="w-16 h-16 mx-auto text-emerald-500 mb-3" />
              <p className="text-sm font-medium mb-2">
                {arquivoSelecionado ? arquivoSelecionado.name : "Selecione um arquivo"}
              </p>
              <Button 
                variant="outline" 
                onClick={() => document.getElementById('upload-doc-proposta')?.click()}
                className="gap-2 border-emerald-200 text-emerald-600 hover:bg-emerald-50"
              >
                <Upload className="w-4 h-4" />
                Escolher Arquivo
              </Button>
              <p className="text-xs text-muted-foreground mt-3">
                PDF, Word, Excel • Máximo 10MB
              </p>
            </div>

            <div className="flex gap-2">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => {
                  setDialogUploadProposta(false)
                  setArquivoSelecionado(null)
                }}
              >
                Cancelar
              </Button>
              <Button 
                className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                onClick={handleUploadDocumentoProposta}
                disabled={!arquivoSelecionado}
              >
                <Upload className="w-4 h-4 mr-2" />
                Importar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* CSS Global para esconder scrollbars */}
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  )
}
