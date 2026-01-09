"use client"

import type React from "react"
import { Suspense, useState } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Label } from "@/components/ui/label"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { RHNav } from "@/components/rh/rh-nav"
import {
  Save,
  History,
  AlertTriangle,
  FileText,
  Upload,
  Download,
  Eye,
  User,
  Briefcase,
  Shield,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Scale,
  Award,
  Gavel,
  TrendingUp,
  Building2,
  Phone,
  Mail,
  MapPin,
  HardHat,
  Gift,
  Printer,
  ChevronRight,
  Info,
  Plus,
} from "lucide-react"
import Link from "next/link"

// ===========================================
// DADOS MOCKADOS COMPLETOS
// ===========================================

const colaboradorMock = {
  id: "COL-001",
  matricula: "CLT-0847",
  nome: "João Carlos da Silva",
  cpf: "123.456.789-00",
  rg: "12.345.678-9",
  dataNascimento: "1985-03-15",
  idade: 39,
  telefone: "(11) 98765-4321",
  telefoneEmergencia: "(11) 91234-5678",
  email: "joao.silva@email.com",
  endereco: "Rua das Flores, 123 - Jardim América",
  cidade: "São Paulo",
  estado: "SP",
  cep: "01234-567",
  estadoCivil: "Casado",
  genero: "Masculino",
  escolaridade: "Ensino Médio Completo",
  pis: "123.45678.90-1",
  ctps: "12345678",
  serieCtps: "001-SP",
  tituloEleitor: "1234 5678 9012",
  reservista: "123456789012",
  cnh: "12345678901",
  categoriaCnh: "B",
  validadeCnh: "2027-03-15",
  banco: "Bradesco",
  agencia: "1234",
  conta: "12345-6",
  tipoConta: "Corrente",
  pix: "123.456.789-00",

  // Vínculo
  vinculo: "CLT",
  dataAdmissao: "2024-02-15",
  tempoCasa: "11 meses",
  cargo: "Armador",
  cargoId: "CARGO-012",
  nivel: "Pleno",
  cbo: "7153-05",
  classificacao: "Direto",
  natureza: "Operacional",
  setor: "Produção",
  centroCusto: "CC-001",
  obra: "BR-101-LOTE 2",
  obraNome: "Duplicação Rodovia BR-101",
  gestorImediato: "Carlos Pereira",

  // Salário e condições
  salarioBase: 3200,
  salarioReferencia: 2900,
  convencao: "SINTRACON-SP",
  jornada: "44h semanais",
  escala: "5x2",
  horarioEntrada: "07:00",
  horarioSaida: "17:00",
  intervalo: "1h",

  // Status
  statusGeral: "Ativo",
  statusOperacional: "Liberado",
  statusDocumental: "Regular",
  statusSST: "Pendente",
  statusFinanceiro: "Regular",
  bloqueado: false,
  motivoBloqueio: null,

  // Risco Jurídico
  riscoJuridico: "Medio",
  alertasJuridicos: 2,
  processos: 0,
  passivoPotencial: 0,
}

const resumoMock = {
  pendencias: [
    { tipo: "SST", descricao: "ASO Periódico vencendo em 15 dias", criticidade: "atencao" },
    { tipo: "Documento", descricao: "Comprovante de residência vencido", criticidade: "medio" },
  ],
  alertas: [
    { tipo: "juridico", descricao: "HE recorrente - 3 meses consecutivos acima de 20h", data: "2025-01-05" },
    { tipo: "atencao", descricao: "Banco de horas próximo do limite (85%)", data: "2025-01-06" },
  ],
  ultimosEventos: [
    { data: "2025-01-06", evento: "Apontamento de HE autorizado", usuario: "Carlos Pereira" },
    { data: "2025-01-05", evento: "ASO periódico agendado", usuario: "Maria Santos" },
    { data: "2025-01-03", evento: "Férias programadas para março", usuario: "Sistema" },
  ],
}

const dadosCadastraisMock = {
  dependentes: [
    {
      nome: "Maria Silva",
      parentesco: "Cônjuge",
      dataNascimento: "1987-05-20",
      cpf: "987.654.321-00",
      irrf: true,
      salarioFamilia: false,
    },
    {
      nome: "Pedro Silva",
      parentesco: "Filho",
      dataNascimento: "2015-08-10",
      cpf: "456.789.123-00",
      irrf: true,
      salarioFamilia: true,
    },
  ],
  contatos: [{ tipo: "Emergência", nome: "Maria Silva", telefone: "(11) 91234-5678", parentesco: "Cônjuge" }],
  historicoCadastral: [
    { data: "2024-02-15", campo: "Cadastro criado", valorAnterior: "-", valorNovo: "Admissão", usuario: "RH" },
    {
      data: "2024-06-10",
      campo: "Endereço",
      valorAnterior: "Rua A, 100",
      valorNovo: "Rua das Flores, 123",
      usuario: "Colaborador",
    },
    {
      data: "2024-09-01",
      campo: "Telefone",
      valorAnterior: "(11) 99999-0000",
      valorNovo: "(11) 98765-4321",
      usuario: "Colaborador",
    },
  ],
}

const vinculoCargoMock = {
  historicoPromocoes: [
    {
      data: "2024-02-15",
      cargoAnterior: "-",
      cargoNovo: "Armador Júnior",
      salarioAnterior: 0,
      salarioNovo: 2500,
      motivo: "Admissão",
    },
    {
      data: "2024-08-01",
      cargoAnterior: "Armador Júnior",
      cargoNovo: "Armador Pleno",
      salarioAnterior: 2500,
      salarioNovo: 3200,
      motivo: "Promoção por mérito",
    },
  ],
  desvioSalarial: {
    existe: true,
    valor: 300,
    percentual: 10.3,
    justificativa: "Profissional com certificação adicional em NR-35",
    aprovadoPor: "Gerente de Contrato",
    dataAprovacao: "2024-08-01",
  },
}

const jornadaPontoMock = {
  resumoMes: {
    diasTrabalhados: 20,
    horasNormais: 176,
    horasExtras: 24,
    valorHE: 872.73,
    faltas: 0,
    atrasos: 2,
    minutosAtraso: 35,
  },
  bancoHoras: {
    saldo: 42.5,
    limite: 50,
    percentual: 85,
    creditos: 65,
    debitos: 22.5,
    vencimento: "2025-03-31",
  },
  heRecorrente: {
    meses: 3,
    mediaHoras: 22,
    alertaJuridico: true,
  },
  ultimosPontos: [
    {
      data: "2025-01-06",
      entrada: "07:02",
      saidaAlmoco: "12:00",
      retornoAlmoco: "13:00",
      saida: "17:15",
      he: "0:15",
      status: "Regular",
    },
    {
      data: "2025-01-05",
      entrada: "07:00",
      saidaAlmoco: "12:00",
      retornoAlmoco: "13:00",
      saida: "19:00",
      he: "2:00",
      status: "HE Autorizada",
    },
    {
      data: "2025-01-04",
      entrada: "07:10",
      saidaAlmoco: "12:00",
      retornoAlmoco: "13:00",
      saida: "17:00",
      he: "0:00",
      status: "Atraso",
    },
  ],
}

const conformidadeSSTMock = {
  documentos: [
    { tipo: "RG", obrigatorio: true, arquivo: "rg_joao.pdf", validade: null, status: "ok", dataEnvio: "2024-02-15" },
    { tipo: "CPF", obrigatorio: true, arquivo: "cpf_joao.pdf", validade: null, status: "ok", dataEnvio: "2024-02-15" },
    {
      tipo: "CTPS",
      obrigatorio: true,
      arquivo: "ctps_joao.pdf",
      validade: null,
      status: "ok",
      dataEnvio: "2024-02-15",
    },
    {
      tipo: "Comprovante Residência",
      obrigatorio: true,
      arquivo: "comp_res.pdf",
      validade: "2024-12-01",
      status: "vencido",
      dataEnvio: "2024-06-10",
    },
    { tipo: "Foto 3x4", obrigatorio: true, arquivo: "foto.jpg", validade: null, status: "ok", dataEnvio: "2024-02-15" },
  ],
  aso: [
    {
      tipo: "Admissional",
      data: "2024-02-10",
      validade: "2025-02-10",
      status: "ok",
      medico: "Dr. Carlos",
      crm: "12345-SP",
    },
    {
      tipo: "Periódico",
      data: "2024-08-15",
      validade: "2025-01-20",
      status: "vencendo",
      medico: "Dr. Carlos",
      crm: "12345-SP",
    },
  ],
  nrs: [
    { codigo: "NR-06", descricao: "EPI", validade: "2025-12-01", status: "ok", cargaHoraria: 8 },
    { codigo: "NR-18", descricao: "Construção Civil", validade: "2025-08-15", status: "ok", cargaHoraria: 16 },
    { codigo: "NR-35", descricao: "Trabalho em Altura", validade: "2025-03-20", status: "vencendo", cargaHoraria: 8 },
  ],
  epis: [
    { item: "Capacete", ca: "12345", dataEntrega: "2024-02-15", validade: "2025-02-15", status: "ok" },
    { item: "Luvas", ca: "23456", dataEntrega: "2024-11-01", validade: "2025-05-01", status: "ok" },
    { item: "Botina", ca: "34567", dataEntrega: "2024-02-15", validade: "2025-02-15", status: "vencendo" },
  ],
}

const beneficiosMock = {
  beneficiosAtivos: [
    { tipo: "Vale Transporte", valor: "6% desconto", origem: "CLT", ativo: true },
    { tipo: "Vale Alimentação", valor: "R$ 28,00/dia", origem: "Convenção", ativo: true },
    { tipo: "Cesta Básica", valor: "R$ 180,00/mês", origem: "Convenção", ativo: true },
    { tipo: "Seguro de Vida", valor: "Incluso", origem: "Convenção", ativo: true },
    { tipo: "Plano de Saúde", valor: "R$ 350,00/mês", origem: "Empresa", ativo: true },
  ],
  historicoAlteracoes: [
    { data: "2024-06-01", beneficio: "Plano de Saúde", acao: "Inclusão", motivo: "Solicitação do colaborador" },
    { data: "2024-02-15", beneficio: "VT/VA/Cesta/Seguro", acao: "Inclusão", motivo: "Admissão" },
  ],
}

const premiosMock = {
  premiosRecebidos: [
    {
      data: "2024-12-20",
      tipo: "Bônus Produtividade",
      valor: 500,
      natureza: "Eventual",
      status: "Pago",
      justificativa: "Meta de produção atingida",
    },
    {
      data: "2024-06-15",
      tipo: "Bônus Assiduidade",
      valor: 200,
      natureza: "Eventual",
      status: "Pago",
      justificativa: "Sem faltas no trimestre",
    },
  ],
  totalAno: 700,
  alertaJuridico: false,
}

const ocorrenciasMock = {
  ocorrencias: [
    {
      data: "2024-10-15",
      tipo: "Advertência Verbal",
      motivo: "Uso inadequado de EPI",
      aplicadoPor: "Encarregado",
      testemunhas: "José Santos",
      status: "Aplicada",
    },
  ],
  elogios: [
    { data: "2024-11-20", tipo: "Elogio", motivo: "Destaque em segurança do trabalho", registradoPor: "SSMA" },
    {
      data: "2024-09-10",
      tipo: "Reconhecimento",
      motivo: "Colaboração em treinamento de novos funcionários",
      registradoPor: "RH",
    },
  ],
  afastamentos: [
    { inicio: "2024-07-10", fim: "2024-07-12", tipo: "Atestado Médico", dias: 3, cid: "J11", motivo: "Gripe" },
  ],
  ferias: {
    saldoDias: 20,
    periodoAquisitivo: "2024-02-15 a 2025-02-14",
    programadas: { inicio: "2025-03-01", fim: "2025-03-15", dias: 15, status: "Aprovada" },
  },
}

const historicoFinanceiroMock = {
  ultimosContraCheques: [
    { competencia: "12/2024", bruto: 4072.73, descontos: 652.44, liquido: 3420.29, dataDeposito: "2025-01-05" },
    { competencia: "11/2024", bruto: 3845.45, descontos: 615.27, liquido: 3230.18, dataDeposito: "2024-12-05" },
    { competencia: "10/2024", bruto: 3650.0, descontos: 584.0, liquido: 3066.0, dataDeposito: "2024-11-05" },
  ],
  composicaoUltimaFolha: {
    salarioBase: 3200,
    horasExtras: 872.73,
    adicionalNoturno: 0,
    descontosINSS: 380.44,
    descontosIRRF: 120.0,
    descontosVT: 192.0,
    outrosDescontos: 0,
  },
  custoTotal: {
    salario: 3200,
    encargos: 1152, // 36%
    beneficios: 720,
    total: 5072,
  },
}

const juridicoMock = {
  riscoGeral: "Medio",
  indicadores: [
    {
      item: "HE Recorrente",
      status: "atencao",
      descricao: "3 meses consecutivos com HE > 20h",
      impacto: "Risco de caracterização de jornada",
    },
    {
      item: "Banco de Horas",
      status: "atencao",
      descricao: "Saldo em 85% do limite",
      impacto: "Necessário compensar ou pagar",
    },
    {
      item: "Documentação",
      status: "pendente",
      descricao: "1 documento vencido",
      impacto: "Regularizar em até 30 dias",
    },
    { item: "SST", status: "atencao", descricao: "ASO vencendo em 15 dias", impacto: "Agendar exame" },
  ],
  processos: [],
  passivoPotencial: 0,
  historicoJuridico: [
    { data: "2024-10-15", evento: "Advertência aplicada", detalhes: "Uso inadequado de EPI - sem contestação" },
  ],
}

const historicoCompletoMock = [
  {
    data: "2025-01-06 09:15",
    categoria: "Ponto",
    acao: "HE autorizada",
    usuario: "Carlos Pereira",
    detalhes: "2h extra autorizadas para finalização de armação",
  },
  {
    data: "2025-01-05 14:30",
    categoria: "SST",
    acao: "ASO agendado",
    usuario: "Maria Santos",
    detalhes: "Exame periódico agendado para 18/01",
  },
  {
    data: "2025-01-03 11:00",
    categoria: "Férias",
    acao: "Férias programadas",
    usuario: "Sistema",
    detalhes: "15 dias a partir de 01/03/2025",
  },
  {
    data: "2024-12-20 16:00",
    categoria: "Prêmio",
    acao: "Bônus concedido",
    usuario: "Gerente",
    detalhes: "Bônus produtividade R$ 500",
  },
  {
    data: "2024-11-20 10:00",
    categoria: "Ocorrência",
    acao: "Elogio registrado",
    usuario: "SSMA",
    detalhes: "Destaque em segurança",
  },
  {
    data: "2024-10-15 08:30",
    categoria: "Ocorrência",
    acao: "Advertência aplicada",
    usuario: "Encarregado",
    detalhes: "Uso inadequado de EPI",
  },
  {
    data: "2024-08-01 09:00",
    categoria: "Cargo",
    acao: "Promoção",
    usuario: "RH",
    detalhes: "Armador Júnior → Armador Pleno",
  },
  {
    data: "2024-02-15 08:00",
    categoria: "Admissão",
    acao: "Cadastro criado",
    usuario: "RH",
    detalhes: "Admissão como Armador Júnior",
  },
]

// ===========================================
// COMPONENTES AUXILIARES
// ===========================================

function StatusBadge({ status }: { status: string }) {
  const config: Record<string, { className: string; label: string }> = {
    ok: { className: "bg-green-500/10 text-green-600 border-green-500/20", label: "OK" },
    regular: { className: "bg-green-500/10 text-green-600 border-green-500/20", label: "Regular" },
    ativo: { className: "bg-green-500/10 text-green-600 border-green-500/20", label: "Ativo" },
    liberado: { className: "bg-green-500/10 text-green-600 border-green-500/20", label: "Liberado" },
    pendente: { className: "bg-amber-500/10 text-amber-600 border-amber-500/20", label: "Pendente" },
    vencendo: { className: "bg-amber-500/10 text-amber-600 border-amber-500/20", label: "Vencendo" },
    atencao: { className: "bg-amber-500/10 text-amber-600 border-amber-500/20", label: "Atenção" },
    vencido: { className: "bg-red-500/10 text-red-600 border-red-500/20", label: "Vencido" },
    critico: { className: "bg-red-500/10 text-red-600 border-red-500/20", label: "Crítico" },
    bloqueado: { className: "bg-red-500/10 text-red-600 border-red-500/20", label: "Bloqueado" },
  }
  const c = config[status.toLowerCase()] || { className: "bg-muted", label: status }
  return (
    <Badge variant="outline" className={c.className}>
      {c.label}
    </Badge>
  )
}

function RiscoIndicador({ nivel }: { nivel: string }) {
  const config: Record<string, { color: string; icon: React.ReactNode }> = {
    baixo: { color: "text-green-600", icon: <CheckCircle2 className="h-4 w-4" /> },
    medio: { color: "text-amber-600", icon: <AlertCircle className="h-4 w-4" /> },
    alto: { color: "text-red-600", icon: <AlertTriangle className="h-4 w-4" /> },
  }
  const c = config[nivel.toLowerCase()] || config.baixo
  return (
    <div className={`flex items-center gap-1 ${c.color}`}>
      {c.icon}
      <span className="text-sm font-medium capitalize">{nivel}</span>
    </div>
  )
}

// ===========================================
// COMPONENTE PRINCIPAL
// ===========================================

function ProntuarioContent() {
  const params = useParams()
  const [activeTab, setActiveTab] = useState("visao-geral")
  const colaborador = colaboradorMock

  return (
    <div className="space-y-4">
      {/* Navegação Superior */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/obra/administrativo/rh" className="hover:text-foreground">
          RH
        </Link>
        <ChevronRight className="h-4 w-4" />
        <Link href="/obra/administrativo/rh/pessoas" className="hover:text-foreground">
          Pessoas
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground font-medium">Prontuário</span>
      </div>

      {/* RHNav */}
      <RHNav modulo="obra" />

      {/* ================================================ */}
      {/* CABEÇALHO FIXO DO COLABORADOR */}
      {/* ================================================ */}
      <Card className="sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <CardContent className="py-4">
          <div className="flex items-start justify-between">
            {/* Info Principal */}
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-8 w-8 text-primary" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <h1 className="text-xl font-bold">{colaborador.nome}</h1>
                  <Badge variant="outline" className="font-mono">
                    {colaborador.matricula}
                  </Badge>
                  <Badge
                    className={
                      colaborador.vinculo === "CLT"
                        ? "bg-blue-500"
                        : colaborador.vinculo === "PJ"
                          ? "bg-purple-500"
                          : "bg-orange-500"
                    }
                  >
                    {colaborador.vinculo}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Briefcase className="h-4 w-4" />
                    {colaborador.cargo} - {colaborador.nivel}
                  </span>
                  <span className="flex items-center gap-1">
                    <Building2 className="h-4 w-4" />
                    {colaborador.obraNome}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <StatusBadge status={colaborador.statusGeral} />
                  <StatusBadge status={colaborador.statusOperacional} />
                  {colaborador.bloqueado && <Badge variant="destructive">Bloqueado</Badge>}
                </div>
              </div>
            </div>

            {/* Indicador Jurídico + Ações */}
            <div className="flex items-start gap-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex flex-col items-center gap-1 px-4 py-2 rounded-lg border bg-muted/50">
                      <Scale
                        className={`h-5 w-5 ${colaborador.riscoJuridico === "Baixo" ? "text-green-600" : colaborador.riscoJuridico === "Medio" ? "text-amber-600" : "text-red-600"}`}
                      />
                      <span className="text-xs font-medium">Risco {colaborador.riscoJuridico}</span>
                      {colaborador.alertasJuridicos > 0 && (
                        <Badge variant="destructive" className="text-[10px] px-1.5 py-0">
                          {colaborador.alertasJuridicos} alertas
                        </Badge>
                      )}
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Indicador de risco trabalhista baseado em conformidade, jornada e histórico</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Printer className="h-4 w-4 mr-2" />
                  Imprimir
                </Button>
                <Button variant="outline" size="sm">
                  <History className="h-4 w-4 mr-2" />
                  Histórico
                </Button>
                <Button size="sm">
                  <Save className="h-4 w-4 mr-2" />
                  Salvar
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ================================================ */}
      {/* ABAS DO PRONTUÁRIO - 10 ABAS */}
      {/* ================================================ */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-10 h-auto">
          <TabsTrigger value="visao-geral" className="text-xs py-2 px-1">
            Visão Geral
          </TabsTrigger>
          <TabsTrigger value="dados-cadastrais" className="text-xs py-2 px-1">
            Dados Cadastrais
          </TabsTrigger>
          <TabsTrigger value="vinculo-cargo" className="text-xs py-2 px-1">
            Vínculo & Cargo
          </TabsTrigger>
          <TabsTrigger value="jornada-ponto" className="text-xs py-2 px-1">
            Jornada & Ponto
          </TabsTrigger>
          <TabsTrigger value="conformidade-sst" className="text-xs py-2 px-1">
            Conformidade
          </TabsTrigger>
          <TabsTrigger value="beneficios" className="text-xs py-2 px-1">
            Benefícios
          </TabsTrigger>
          <TabsTrigger value="premios" className="text-xs py-2 px-1">
            Prêmios
          </TabsTrigger>
          <TabsTrigger value="ocorrencias" className="text-xs py-2 px-1">
            Ocorrências
          </TabsTrigger>
          <TabsTrigger value="historico-financeiro" className="text-xs py-2 px-1">
            Financeiro
          </TabsTrigger>
          <TabsTrigger value="juridico" className="text-xs py-2 px-1">
            Jurídico
          </TabsTrigger>
        </TabsList>

        {/* ================================================ */}
        {/* ABA 1 - VISÃO GERAL */}
        {/* ================================================ */}
        <TabsContent value="visao-geral" className="space-y-4">
          {/* Resumo Status */}
          <div className="grid grid-cols-5 gap-4">
            <Card>
              <CardContent className="pt-4">
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Status Geral</p>
                    <StatusBadge status={colaborador.statusGeral} />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <div className="flex items-center gap-2">
                  <HardHat className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Operacional</p>
                    <StatusBadge status={colaborador.statusOperacional} />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Documental</p>
                    <StatusBadge status={colaborador.statusDocumental} />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">SST</p>
                    <StatusBadge status={colaborador.statusSST} />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <div className="flex items-center gap-2">
                  <Scale className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Risco Jurídico</p>
                    <RiscoIndicador nivel={colaborador.riscoJuridico} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Pendências e Alertas */}
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-amber-500" />
                  Pendências ({resumoMock.pendencias.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {resumoMock.pendencias.map((p, i) => (
                    <div key={i} className="flex items-start justify-between p-2 rounded bg-muted/50">
                      <div>
                        <Badge variant="outline" className="text-xs mb-1">
                          {p.tipo}
                        </Badge>
                        <p className="text-sm">{p.descricao}</p>
                      </div>
                      <StatusBadge status={p.criticidade} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-500" />
                  Alertas Ativos ({resumoMock.alertas.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {resumoMock.alertas.map((a, i) => (
                    <div key={i} className="flex items-start justify-between p-2 rounded bg-muted/50">
                      <div>
                        <Badge variant={a.tipo === "juridico" ? "destructive" : "outline"} className="text-xs mb-1">
                          {a.tipo === "juridico" ? "Jurídico" : "Atenção"}
                        </Badge>
                        <p className="text-sm">{a.descricao}</p>
                      </div>
                      <span className="text-xs text-muted-foreground">{a.data}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Últimos Eventos */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Últimos Eventos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {resumoMock.ultimosEventos.map((e, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b last:border-0">
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-muted-foreground w-20">{e.data}</span>
                      <span className="text-sm">{e.evento}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{e.usuario}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Informações Rápidas */}
          <div className="grid grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Informações de Contato</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  {colaborador.telefone}
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  {colaborador.email}
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  {colaborador.cidade}/{colaborador.estado}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Vínculo Atual</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Admissão:</span>
                  <span>{colaborador.dataAdmissao}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tempo:</span>
                  <span>{colaborador.tempoCasa}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Salário:</span>
                  <span>R$ {colaborador.salarioBase.toLocaleString("pt-BR")}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Férias</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Saldo:</span>
                  <span>{ocorrenciasMock.ferias.saldoDias} dias</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Próximas:</span>
                  <span>{ocorrenciasMock.ferias.programadas.inicio}</span>
                </div>
                <StatusBadge status={ocorrenciasMock.ferias.programadas.status} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* ================================================ */}
        {/* ABA 2 - DADOS CADASTRAIS */}
        {/* ================================================ */}
        <TabsContent value="dados-cadastrais" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {/* Dados Pessoais */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Dados Pessoais</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs text-muted-foreground">Nome Completo</Label>
                    <p className="text-sm font-medium">{colaborador.nome}</p>
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">CPF</Label>
                    <p className="text-sm font-medium">{colaborador.cpf}</p>
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">RG</Label>
                    <p className="text-sm font-medium">{colaborador.rg}</p>
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">Data Nascimento</Label>
                    <p className="text-sm font-medium">
                      {colaborador.dataNascimento} ({colaborador.idade} anos)
                    </p>
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">Gênero</Label>
                    <p className="text-sm font-medium">{colaborador.genero}</p>
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">Estado Civil</Label>
                    <p className="text-sm font-medium">{colaborador.estadoCivil}</p>
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">Escolaridade</Label>
                    <p className="text-sm font-medium">{colaborador.escolaridade}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Documentos */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Documentos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs text-muted-foreground">PIS</Label>
                    <p className="text-sm font-medium">{colaborador.pis}</p>
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">CTPS</Label>
                    <p className="text-sm font-medium">
                      {colaborador.ctps} / {colaborador.serieCtps}
                    </p>
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">Título de Eleitor</Label>
                    <p className="text-sm font-medium">{colaborador.tituloEleitor}</p>
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">Reservista</Label>
                    <p className="text-sm font-medium">{colaborador.reservista}</p>
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">CNH</Label>
                    <p className="text-sm font-medium">
                      {colaborador.cnh} - Cat. {colaborador.categoriaCnh}
                    </p>
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">Validade CNH</Label>
                    <p className="text-sm font-medium">{colaborador.validadeCnh}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Endereço */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Endereço</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-4">
                <div className="col-span-2">
                  <Label className="text-xs text-muted-foreground">Logradouro</Label>
                  <p className="text-sm font-medium">{colaborador.endereco}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Cidade/UF</Label>
                  <p className="text-sm font-medium">
                    {colaborador.cidade}/{colaborador.estado}
                  </p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">CEP</Label>
                  <p className="text-sm font-medium">{colaborador.cep}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Dados Bancários */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Dados Bancários</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-5 gap-4">
                <div>
                  <Label className="text-xs text-muted-foreground">Banco</Label>
                  <p className="text-sm font-medium">{colaborador.banco}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Agência</Label>
                  <p className="text-sm font-medium">{colaborador.agencia}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Conta</Label>
                  <p className="text-sm font-medium">{colaborador.conta}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Tipo</Label>
                  <p className="text-sm font-medium">{colaborador.tipoConta}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">PIX</Label>
                  <p className="text-sm font-medium">{colaborador.pix}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Dependentes */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-sm">Dependentes</CardTitle>
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Adicionar
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Parentesco</TableHead>
                    <TableHead>Data Nasc.</TableHead>
                    <TableHead>CPF</TableHead>
                    <TableHead>IRRF</TableHead>
                    <TableHead>Sal. Família</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dadosCadastraisMock.dependentes.map((d, i) => (
                    <TableRow key={i}>
                      <TableCell>{d.nome}</TableCell>
                      <TableCell>{d.parentesco}</TableCell>
                      <TableCell>{d.dataNascimento}</TableCell>
                      <TableCell className="font-mono text-xs">{d.cpf}</TableCell>
                      <TableCell>
                        {d.irrf ? (
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                        ) : (
                          <XCircle className="h-4 w-4 text-muted-foreground" />
                        )}
                      </TableCell>
                      <TableCell>
                        {d.salarioFamilia ? (
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                        ) : (
                          <XCircle className="h-4 w-4 text-muted-foreground" />
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Histórico Cadastral */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <History className="h-4 w-4" />
                Histórico de Alterações Cadastrais
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Data</TableHead>
                    <TableHead>Campo</TableHead>
                    <TableHead>Valor Anterior</TableHead>
                    <TableHead>Valor Novo</TableHead>
                    <TableHead>Usuário</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dadosCadastraisMock.historicoCadastral.map((h, i) => (
                    <TableRow key={i}>
                      <TableCell className="text-xs">{h.data}</TableCell>
                      <TableCell>{h.campo}</TableCell>
                      <TableCell className="text-muted-foreground">{h.valorAnterior}</TableCell>
                      <TableCell>{h.valorNovo}</TableCell>
                      <TableCell className="text-xs">{h.usuario}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ================================================ */}
        {/* ABA 3 - VÍNCULO & CARGO */}
        {/* ================================================ */}
        <TabsContent value="vinculo-cargo" className="space-y-4">
          {/* Informações Atuais */}
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Vínculo Atual</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs text-muted-foreground">Tipo de Vínculo</Label>
                    <p className="text-sm font-medium">{colaborador.vinculo}</p>
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">Data Admissão</Label>
                    <p className="text-sm font-medium">{colaborador.dataAdmissao}</p>
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">Convenção</Label>
                    <p className="text-sm font-medium">{colaborador.convencao}</p>
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">Centro de Custo</Label>
                    <p className="text-sm font-medium">{colaborador.centroCusto}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Cargo Atual</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs text-muted-foreground">Cargo</Label>
                    <p className="text-sm font-medium">{colaborador.cargo}</p>
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">Nível</Label>
                    <p className="text-sm font-medium">{colaborador.nivel}</p>
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">CBO</Label>
                    <p className="text-sm font-medium font-mono">{colaborador.cbo}</p>
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">Classificação</Label>
                    <p className="text-sm font-medium">
                      {colaborador.classificacao} / {colaborador.natureza}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Remuneração */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Remuneração</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-4 gap-4">
                <div>
                  <Label className="text-xs text-muted-foreground">Salário Base</Label>
                  <p className="text-lg font-bold">R$ {colaborador.salarioBase.toLocaleString("pt-BR")}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Referência Orçada</Label>
                  <p className="text-lg font-medium text-muted-foreground">
                    R$ {colaborador.salarioReferencia.toLocaleString("pt-BR")}
                  </p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Desvio</Label>
                  {vinculoCargoMock.desvioSalarial.existe ? (
                    <p className="text-lg font-bold text-amber-600">
                      +R$ {vinculoCargoMock.desvioSalarial.valor} (+{vinculoCargoMock.desvioSalarial.percentual}%)
                    </p>
                  ) : (
                    <p className="text-lg font-medium text-green-600">Sem desvio</p>
                  )}
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Status</Label>
                  {vinculoCargoMock.desvioSalarial.existe ? (
                    <Badge className="bg-green-500">Aprovado</Badge>
                  ) : (
                    <Badge variant="outline">N/A</Badge>
                  )}
                </div>
              </div>

              {vinculoCargoMock.desvioSalarial.existe && (
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertTitle>Justificativa do Desvio</AlertTitle>
                  <AlertDescription>
                    {vinculoCargoMock.desvioSalarial.justificativa}
                    <br />
                    <span className="text-xs text-muted-foreground">
                      Aprovado por {vinculoCargoMock.desvioSalarial.aprovadoPor} em{" "}
                      {vinculoCargoMock.desvioSalarial.dataAprovacao}
                    </span>
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>

          {/* Histórico de Promoções */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Histórico de Promoções e Alterações
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Data</TableHead>
                    <TableHead>Cargo Anterior</TableHead>
                    <TableHead>Cargo Novo</TableHead>
                    <TableHead>Salário Anterior</TableHead>
                    <TableHead>Salário Novo</TableHead>
                    <TableHead>Motivo</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {vinculoCargoMock.historicoPromocoes.map((p, i) => (
                    <TableRow key={i}>
                      <TableCell>{p.data}</TableCell>
                      <TableCell>{p.cargoAnterior || "-"}</TableCell>
                      <TableCell className="font-medium">{p.cargoNovo}</TableCell>
                      <TableCell>
                        {p.salarioAnterior ? `R$ ${p.salarioAnterior.toLocaleString("pt-BR")}` : "-"}
                      </TableCell>
                      <TableCell className="font-medium">R$ {p.salarioNovo.toLocaleString("pt-BR")}</TableCell>
                      <TableCell>{p.motivo}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ================================================ */}
        {/* ABA 4 - JORNADA & PONTO */}
        {/* ================================================ */}
        <TabsContent value="jornada-ponto" className="space-y-4">
          {/* Cards Resumo */}
          <div className="grid grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">Horas Normais</p>
                    <p className="text-2xl font-bold">{jornadaPontoMock.resumoMes.horasNormais}h</p>
                    <p className="text-xs text-muted-foreground">{jornadaPontoMock.resumoMes.diasTrabalhados} dias</p>
                  </div>
                  <Clock className="h-8 w-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
            <Card className={jornadaPontoMock.heRecorrente.alertaJuridico ? "border-amber-500" : ""}>
              <CardContent className="pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">Horas Extras</p>
                    <p className="text-2xl font-bold">{jornadaPontoMock.resumoMes.horasExtras}h</p>
                    <p className="text-xs text-muted-foreground">
                      R$ {jornadaPontoMock.resumoMes.valorHE.toLocaleString("pt-BR")}
                    </p>
                  </div>
                  {jornadaPontoMock.heRecorrente.alertaJuridico && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <AlertTriangle className="h-8 w-8 text-amber-500" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>HE recorrente há {jornadaPontoMock.heRecorrente.meses} meses</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                </div>
              </CardContent>
            </Card>
            <Card className={jornadaPontoMock.bancoHoras.percentual >= 80 ? "border-amber-500" : ""}>
              <CardContent className="pt-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-muted-foreground">Banco de Horas</p>
                    <span className="text-xs text-muted-foreground">{jornadaPontoMock.bancoHoras.percentual}%</span>
                  </div>
                  <p className="text-2xl font-bold">{jornadaPontoMock.bancoHoras.saldo}h</p>
                  <Progress value={jornadaPontoMock.bancoHoras.percentual} className="h-2" />
                  <p className="text-xs text-muted-foreground">Limite: {jornadaPontoMock.bancoHoras.limite}h</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">Ocorrências</p>
                    <p className="text-2xl font-bold">{jornadaPontoMock.resumoMes.atrasos}</p>
                    <p className="text-xs text-muted-foreground">
                      {jornadaPontoMock.resumoMes.minutosAtraso} min atraso
                    </p>
                  </div>
                  <AlertCircle className="h-8 w-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Jornada Contratual */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Jornada Contratual</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-5 gap-4">
                <div>
                  <Label className="text-xs text-muted-foreground">Carga Horária</Label>
                  <p className="text-sm font-medium">{colaborador.jornada}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Escala</Label>
                  <p className="text-sm font-medium">{colaborador.escala}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Entrada</Label>
                  <p className="text-sm font-medium">{colaborador.horarioEntrada}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Saída</Label>
                  <p className="text-sm font-medium">{colaborador.horarioSaida}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Intervalo</Label>
                  <p className="text-sm font-medium">{colaborador.intervalo}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Últimos Registros */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Últimos Registros de Ponto</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Data</TableHead>
                    <TableHead>Entrada</TableHead>
                    <TableHead>Saída Almoço</TableHead>
                    <TableHead>Retorno</TableHead>
                    <TableHead>Saída</TableHead>
                    <TableHead>HE</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {jornadaPontoMock.ultimosPontos.map((p, i) => (
                    <TableRow key={i}>
                      <TableCell>{p.data}</TableCell>
                      <TableCell>{p.entrada}</TableCell>
                      <TableCell>{p.saidaAlmoco}</TableCell>
                      <TableCell>{p.retornoAlmoco}</TableCell>
                      <TableCell>{p.saida}</TableCell>
                      <TableCell className={p.he !== "0:00" ? "font-medium text-amber-600" : ""}>{p.he}</TableCell>
                      <TableCell>
                        <StatusBadge
                          status={p.status === "Regular" ? "ok" : p.status === "HE Autorizada" ? "ok" : "atencao"}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ================================================ */}
        {/* ABA 5 - CONFORMIDADE & SST */}
        {/* ================================================ */}
        <TabsContent value="conformidade-sst" className="space-y-4">
          {/* Documentos */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-sm">Documentos</CardTitle>
              <Button variant="outline" size="sm">
                <Upload className="h-4 w-4 mr-2" />
                Upload
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Documento</TableHead>
                    <TableHead>Obrigatório</TableHead>
                    <TableHead>Arquivo</TableHead>
                    <TableHead>Validade</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {conformidadeSSTMock.documentos.map((d, i) => (
                    <TableRow key={i} className={d.status === "vencido" ? "bg-red-500/5" : ""}>
                      <TableCell>{d.tipo}</TableCell>
                      <TableCell>{d.obrigatorio ? "Sim" : "Não"}</TableCell>
                      <TableCell>
                        {d.arquivo ? (
                          <Button variant="ghost" size="sm">
                            <FileText className="h-4 w-4 mr-1" />
                            {d.arquivo}
                          </Button>
                        ) : (
                          "-"
                        )}
                      </TableCell>
                      <TableCell>{d.validade || "N/A"}</TableCell>
                      <TableCell>
                        <StatusBadge status={d.status} />
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          {d.arquivo && (
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                            </Button>
                          )}
                          {d.arquivo && (
                            <Button variant="ghost" size="icon">
                              <Download className="h-4 w-4" />
                            </Button>
                          )}
                          <Button variant="ghost" size="icon">
                            <Upload className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* ASO */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-sm">Exames Médicos (ASO)</CardTitle>
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Agendar
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Validade</TableHead>
                    <TableHead>Médico</TableHead>
                    <TableHead>CRM</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {conformidadeSSTMock.aso.map((a, i) => (
                    <TableRow key={i} className={a.status === "vencendo" ? "bg-amber-500/5" : ""}>
                      <TableCell>{a.tipo}</TableCell>
                      <TableCell>{a.data}</TableCell>
                      <TableCell>{a.validade}</TableCell>
                      <TableCell>{a.medico}</TableCell>
                      <TableCell className="font-mono text-xs">{a.crm}</TableCell>
                      <TableCell>
                        <StatusBadge status={a.status} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* NRs */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-sm">Treinamentos (NRs)</CardTitle>
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Registrar
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>NR</TableHead>
                    <TableHead>Descrição</TableHead>
                    <TableHead>Carga Horária</TableHead>
                    <TableHead>Validade</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {conformidadeSSTMock.nrs.map((n, i) => (
                    <TableRow key={i} className={n.status === "vencendo" ? "bg-amber-500/5" : ""}>
                      <TableCell className="font-medium">{n.codigo}</TableCell>
                      <TableCell>{n.descricao}</TableCell>
                      <TableCell>{n.cargaHoraria}h</TableCell>
                      <TableCell>{n.validade}</TableCell>
                      <TableCell>
                        <StatusBadge status={n.status} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* EPIs */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-sm">EPIs Entregues</CardTitle>
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Registrar Entrega
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item</TableHead>
                    <TableHead>CA</TableHead>
                    <TableHead>Data Entrega</TableHead>
                    <TableHead>Validade</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {conformidadeSSTMock.epis.map((e, i) => (
                    <TableRow key={i} className={e.status === "vencendo" ? "bg-amber-500/5" : ""}>
                      <TableCell>{e.item}</TableCell>
                      <TableCell className="font-mono text-xs">{e.ca}</TableCell>
                      <TableCell>{e.dataEntrega}</TableCell>
                      <TableCell>{e.validade}</TableCell>
                      <TableCell>
                        <StatusBadge status={e.status} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ================================================ */}
        {/* ABA 6 - BENEFÍCIOS */}
        {/* ================================================ */}
        <TabsContent value="beneficios" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Benefícios Ativos</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Benefício</TableHead>
                    <TableHead>Valor/Condição</TableHead>
                    <TableHead>Origem</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {beneficiosMock.beneficiosAtivos.map((b, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium">{b.tipo}</TableCell>
                      <TableCell>{b.valor}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{b.origem}</Badge>
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={b.ativo ? "ativo" : "pendente"} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <History className="h-4 w-4" />
                Histórico de Alterações
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Data</TableHead>
                    <TableHead>Benefício</TableHead>
                    <TableHead>Ação</TableHead>
                    <TableHead>Motivo</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {beneficiosMock.historicoAlteracoes.map((h, i) => (
                    <TableRow key={i}>
                      <TableCell>{h.data}</TableCell>
                      <TableCell>{h.beneficio}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{h.acao}</Badge>
                      </TableCell>
                      <TableCell>{h.motivo}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ================================================ */}
        {/* ABA 7 - PRÊMIOS & BONIFICAÇÕES */}
        {/* ================================================ */}
        <TabsContent value="premios" className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">Total no Ano</p>
                    <p className="text-2xl font-bold">R$ {premiosMock.totalAno.toLocaleString("pt-BR")}</p>
                  </div>
                  <Award className="h-8 w-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">Qtd. Prêmios</p>
                    <p className="text-2xl font-bold">{premiosMock.premiosRecebidos.length}</p>
                  </div>
                  <Gift className="h-8 w-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">Risco Jurídico</p>
                    <RiscoIndicador nivel={premiosMock.alertaJuridico ? "medio" : "baixo"} />
                  </div>
                  <Scale className="h-8 w-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Prêmios Recebidos</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Data</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Natureza</TableHead>
                    <TableHead>Justificativa</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {premiosMock.premiosRecebidos.map((p, i) => (
                    <TableRow key={i}>
                      <TableCell>{p.data}</TableCell>
                      <TableCell className="font-medium">{p.tipo}</TableCell>
                      <TableCell>R$ {p.valor.toLocaleString("pt-BR")}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{p.natureza}</Badge>
                      </TableCell>
                      <TableCell className="max-w-xs truncate">{p.justificativa}</TableCell>
                      <TableCell>
                        <StatusBadge status={p.status === "Pago" ? "ok" : "pendente"} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ================================================ */}
        {/* ABA 8 - OCORRÊNCIAS & ADVERTÊNCIAS */}
        {/* ================================================ */}
        <TabsContent value="ocorrencias" className="space-y-4">
          {/* Férias */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Férias</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-4">
                <div>
                  <Label className="text-xs text-muted-foreground">Saldo</Label>
                  <p className="text-lg font-bold">{ocorrenciasMock.ferias.saldoDias} dias</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Período Aquisitivo</Label>
                  <p className="text-sm">{ocorrenciasMock.ferias.periodoAquisitivo}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Próximas Férias</Label>
                  <p className="text-sm">
                    {ocorrenciasMock.ferias.programadas.inicio} a {ocorrenciasMock.ferias.programadas.fim}
                  </p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Status</Label>
                  <StatusBadge status={ocorrenciasMock.ferias.programadas.status === "Aprovada" ? "ok" : "pendente"} />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Afastamentos */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-sm">Afastamentos</CardTitle>
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Registrar
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Início</TableHead>
                    <TableHead>Fim</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Dias</TableHead>
                    <TableHead>CID</TableHead>
                    <TableHead>Motivo</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ocorrenciasMock.afastamentos.map((a, i) => (
                    <TableRow key={i}>
                      <TableCell>{a.inicio}</TableCell>
                      <TableCell>{a.fim}</TableCell>
                      <TableCell>{a.tipo}</TableCell>
                      <TableCell>{a.dias}</TableCell>
                      <TableCell className="font-mono">{a.cid}</TableCell>
                      <TableCell>{a.motivo}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Ocorrências Disciplinares */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-sm">Ocorrências Disciplinares</CardTitle>
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Registrar
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Data</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Motivo</TableHead>
                    <TableHead>Aplicado Por</TableHead>
                    <TableHead>Testemunhas</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ocorrenciasMock.ocorrencias.map((o, i) => (
                    <TableRow key={i}>
                      <TableCell>{o.data}</TableCell>
                      <TableCell>
                        <Badge variant="destructive">{o.tipo}</Badge>
                      </TableCell>
                      <TableCell>{o.motivo}</TableCell>
                      <TableCell>{o.aplicadoPor}</TableCell>
                      <TableCell>{o.testemunhas}</TableCell>
                      <TableCell>
                        <StatusBadge status={o.status === "Aplicada" ? "ok" : "pendente"} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Elogios */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Elogios e Reconhecimentos</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Data</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Motivo</TableHead>
                    <TableHead>Registrado Por</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ocorrenciasMock.elogios.map((e, i) => (
                    <TableRow key={i}>
                      <TableCell>{e.data}</TableCell>
                      <TableCell>
                        <Badge className="bg-green-500">{e.tipo}</Badge>
                      </TableCell>
                      <TableCell>{e.motivo}</TableCell>
                      <TableCell>{e.registradoPor}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ================================================ */}
        {/* ABA 9 - HISTÓRICO FINANCEIRO */}
        {/* ================================================ */}
        <TabsContent value="historico-financeiro" className="space-y-4">
          <Alert>
            <Info className="h-4 w-4" />
            <AlertTitle>Informação de Leitura</AlertTitle>
            <AlertDescription>
              Esta aba exibe informações financeiras apenas para consulta. Alterações são realizadas pelo departamento
              de Custos/Financeiro.
            </AlertDescription>
          </Alert>

          {/* Custo Total */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Custo Total do Colaborador</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-4">
                <div>
                  <Label className="text-xs text-muted-foreground">Salário</Label>
                  <p className="text-lg font-bold">
                    R$ {historicoFinanceiroMock.custoTotal.salario.toLocaleString("pt-BR")}
                  </p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Encargos (36%)</Label>
                  <p className="text-lg font-medium">
                    R$ {historicoFinanceiroMock.custoTotal.encargos.toLocaleString("pt-BR")}
                  </p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Benefícios</Label>
                  <p className="text-lg font-medium">
                    R$ {historicoFinanceiroMock.custoTotal.beneficios.toLocaleString("pt-BR")}
                  </p>
                </div>
                <div className="bg-primary/5 p-3 rounded-lg">
                  <Label className="text-xs text-muted-foreground">Total Mensal</Label>
                  <p className="text-xl font-bold text-primary">
                    R$ {historicoFinanceiroMock.custoTotal.total.toLocaleString("pt-BR")}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Últimos Contracheques */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Últimos Contracheques</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Competência</TableHead>
                    <TableHead>Bruto</TableHead>
                    <TableHead>Descontos</TableHead>
                    <TableHead>Líquido</TableHead>
                    <TableHead>Data Depósito</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {historicoFinanceiroMock.ultimosContraCheques.map((c, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium">{c.competencia}</TableCell>
                      <TableCell>R$ {c.bruto.toLocaleString("pt-BR")}</TableCell>
                      <TableCell className="text-red-600">-R$ {c.descontos.toLocaleString("pt-BR")}</TableCell>
                      <TableCell className="font-bold">R$ {c.liquido.toLocaleString("pt-BR")}</TableCell>
                      <TableCell>{c.dataDeposito}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          Ver
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Composição Última Folha */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Composição da Última Folha (12/2024)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h4 className="text-sm font-medium mb-3 text-green-600">Proventos</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Salário Base</span>
                      <span className="text-sm font-medium">
                        R$ {historicoFinanceiroMock.composicaoUltimaFolha.salarioBase.toLocaleString("pt-BR")}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Horas Extras</span>
                      <span className="text-sm font-medium">
                        R$ {historicoFinanceiroMock.composicaoUltimaFolha.horasExtras.toLocaleString("pt-BR")}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Adicional Noturno</span>
                      <span className="text-sm font-medium">
                        R$ {historicoFinanceiroMock.composicaoUltimaFolha.adicionalNoturno.toLocaleString("pt-BR")}
                      </span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-bold">
                      <span>Total Proventos</span>
                      <span className="text-green-600">
                        R${" "}
                        {(
                          historicoFinanceiroMock.composicaoUltimaFolha.salarioBase +
                          historicoFinanceiroMock.composicaoUltimaFolha.horasExtras
                        ).toLocaleString("pt-BR")}
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-3 text-red-600">Descontos</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">INSS</span>
                      <span className="text-sm font-medium">
                        R$ {historicoFinanceiroMock.composicaoUltimaFolha.descontosINSS.toLocaleString("pt-BR")}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">IRRF</span>
                      <span className="text-sm font-medium">
                        R$ {historicoFinanceiroMock.composicaoUltimaFolha.descontosIRRF.toLocaleString("pt-BR")}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Vale Transporte</span>
                      <span className="text-sm font-medium">
                        R$ {historicoFinanceiroMock.composicaoUltimaFolha.descontosVT.toLocaleString("pt-BR")}
                      </span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-bold">
                      <span>Total Descontos</span>
                      <span className="text-red-600">
                        R${" "}
                        {(
                          historicoFinanceiroMock.composicaoUltimaFolha.descontosINSS +
                          historicoFinanceiroMock.composicaoUltimaFolha.descontosIRRF +
                          historicoFinanceiroMock.composicaoUltimaFolha.descontosVT
                        ).toLocaleString("pt-BR")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ================================================ */}
        {/* ABA 10 - JURÍDICO */}
        {/* ================================================ */}
        <TabsContent value="juridico" className="space-y-4">
          {/* Risco Geral */}
          <Card
            className={
              juridicoMock.riscoGeral === "Alto"
                ? "border-red-500"
                : juridicoMock.riscoGeral === "Medio"
                  ? "border-amber-500"
                  : ""
            }
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Scale className="h-5 w-5" />
                  Análise de Risco Trabalhista
                </CardTitle>
                <RiscoIndicador nivel={juridicoMock.riscoGeral} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center p-4 rounded-lg bg-muted/50">
                  <p className="text-xs text-muted-foreground">Processos Ativos</p>
                  <p className="text-2xl font-bold">{juridicoMock.processos.length}</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-muted/50">
                  <p className="text-xs text-muted-foreground">Passivo Potencial</p>
                  <p className="text-2xl font-bold">R$ {juridicoMock.passivoPotencial.toLocaleString("pt-BR")}</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-muted/50">
                  <p className="text-xs text-muted-foreground">Alertas</p>
                  <p className="text-2xl font-bold text-amber-600">
                    {juridicoMock.indicadores.filter((i) => i.status !== "ok").length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Indicadores */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Indicadores de Conformidade</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Descrição</TableHead>
                    <TableHead>Impacto</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {juridicoMock.indicadores.map((i, idx) => (
                    <TableRow
                      key={idx}
                      className={
                        i.status === "atencao" ? "bg-amber-500/5" : i.status === "pendente" ? "bg-red-500/5" : ""
                      }
                    >
                      <TableCell className="font-medium">{i.item}</TableCell>
                      <TableCell>
                        <StatusBadge status={i.status} />
                      </TableCell>
                      <TableCell>{i.descricao}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{i.impacto}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Histórico Jurídico */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <History className="h-4 w-4" />
                Histórico Jurídico
              </CardTitle>
            </CardHeader>
            <CardContent>
              {juridicoMock.historicoJuridico.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Data</TableHead>
                      <TableHead>Evento</TableHead>
                      <TableHead>Detalhes</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {juridicoMock.historicoJuridico.map((h, i) => (
                      <TableRow key={i}>
                        <TableCell>{h.data}</TableCell>
                        <TableCell className="font-medium">{h.evento}</TableCell>
                        <TableCell>{h.detalhes}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">Nenhum evento jurídico registrado</p>
              )}
            </CardContent>
          </Card>

          {/* Alerta Importante */}
          <Alert variant="destructive" className="bg-red-500/5 border-red-500/20">
            <Gavel className="h-4 w-4" />
            <AlertTitle>Atenção Jurídica</AlertTitle>
            <AlertDescription>
              Os dados desta aba são monitorados para compliance trabalhista. Situações de HE recorrente, banco de horas
              próximo do limite e documentação irregular podem gerar passivos trabalhistas futuros.
            </AlertDescription>
          </Alert>
        </TabsContent>
      </Tabs>

      {/* ================================================ */}
      {/* HISTÓRICO COMPLETO (RODAPÉ) */}
      {/* ================================================ */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm flex items-center gap-2">
            <History className="h-4 w-4" />
            Histórico Completo (Auditoria)
          </CardTitle>
          <CardDescription>Registro permanente e imutável de todas as alterações</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-64">
            <div className="space-y-2">
              {historicoCompletoMock.map((h, i) => (
                <div key={i} className="flex items-start gap-4 py-2 border-b last:border-0">
                  <span className="text-xs text-muted-foreground w-32 shrink-0">{h.data}</span>
                  <Badge variant="outline" className="shrink-0">
                    {h.categoria}
                  </Badge>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{h.acao}</p>
                    <p className="text-xs text-muted-foreground">{h.detalhes}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{h.usuario}</span>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}

export default function ProntuarioColaboradorPage() {
  return (
    <Suspense fallback={null}>
      <ProntuarioContent />
    </Suspense>
  )
}
